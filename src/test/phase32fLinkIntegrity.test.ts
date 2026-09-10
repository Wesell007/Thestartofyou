import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Phase 32F — internal link integrity.
 *
 * Guards the link work done in Phase 32F: every internal href in the runtime
 * source must resolve to a real public URL (or a known private/app route),
 * never to a redirect source and never to an unpublished draft.
 */

const SITEMAP = readFileSync(resolve("public/sitemap.xml"), "utf8");
const PUBLIC_URLS = new Set(
  [...SITEMAP.matchAll(/<loc>https:\/\/thestartofyou\.com([^<]*)<\/loc>/g)].map((m) => m[1]),
);

const LEGACY_SLUGS = new Set(
  [...readFileSync(resolve("src/data/articleData.ts"), "utf8").matchAll(
    /^\s{4}slug:\s*"([^"]+)"/gm,
  )].map((m) => m[1]),
);

// Authenticated / setup / utility routes that are intentionally not indexed.
const PRIVATE_PREFIXES = [
  "/account",
  "/ask",
  "/my-",
  "/pregnancy-toolkit",
  "/setup/",
  "/privacy",
  "/terms",
  "/product",
];

// Routes that exist only as redirects — nothing should link to them.
const REDIRECT_SOURCES = ["/postpartum", "/trying-to-conceive/ovulation-calculator"];

const sourceFiles: string[] = [];
const walk = (dir: string) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = `${dir}/${entry.name}`;
    if (entry.isDirectory()) walk(p);
    else if (/\.(ts|tsx)$/.test(p) && !/\.test\./.test(p)) sourceFiles.push(p);
  }
};
walk(resolve("src"));

type Link = { href: string; file: string };
const links: Link[] = [];
for (const file of sourceFiles) {
  const text = readFileSync(file, "utf8");
  for (const m of text.matchAll(/(?:href|to):\s*"(\/[^"?#]*)/g)) {
    links.push({ href: m[1].replace(/\/$/, "") || "/", file });
  }
}

describe("Phase 32F link integrity", () => {
  it("finds internal links to check", () => {
    expect(links.length).toBeGreaterThan(200);
  });

  it("resolves every internal link to a public or known private route", () => {
    const broken = links.filter(({ href }) => {
      if (PUBLIC_URLS.has(href)) return false;
      if (href.startsWith("/articles/") && LEGACY_SLUGS.has(href.slice("/articles/".length)))
        return false;
      return !PRIVATE_PREFIXES.some((prefix) => href.startsWith(prefix));
    });
    expect(broken.map((b) => `${b.href} (${b.file})`)).toEqual([]);
  });

  it("never links at a redirect source", () => {
    const offenders = links.filter(({ href, file }) =>
      REDIRECT_SOURCES.includes(href) && !file.endsWith("App.tsx"),
    );
    expect(offenders.map((o) => `${o.href} (${o.file})`)).toEqual([]);
  });

  it("never links at an unpublished First Year, Toddler or Family draft", () => {
    const drafts: string[] = [];
    for (const [file, base] of [
      ["src/data/firstYearArticleData.ts", "/first-year"],
      ["src/data/toddlerArticleData.ts", "/toddler"],
      ["src/data/familyArticleData.ts", "/family"],
    ] as const) {
      const text = readFileSync(resolve(file), "utf8");
      for (const m of text.matchAll(
        /\{\s*slug:\s*"([^"]+)"[\s\S]*?topic:\s*"([^"]+)"[\s\S]*?status:\s*"(ready|draft)"/g,
      )) {
        if (m[3] === "draft") drafts.push(`${base}/${m[2]}/${m[1]}`);
      }
    }
    const offenders = links.filter(({ href }) => drafts.includes(href));
    expect(offenders.map((o) => `${o.href} (${o.file})`)).toEqual([]);
  });
});
