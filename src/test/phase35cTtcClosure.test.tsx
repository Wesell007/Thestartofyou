/**
 * Phase 35C — TTC final cleanup guards.
 *
 * Covers the retired legacy stage routes (client-side route redirects), the
 * TTC → Pregnancy editorial handoff, and the source / claim cleanup.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import { getAllArticles } from "@/data/articleData";
import { ttcFlagshipOverrides } from "@/data/ttcFlagshipOverrides";
import { ttcPageConfigs } from "@/data/ttcTopicData";

const read = (p: string) => readFileSync(resolve(p), "utf8");

const LEGACY_STAGE_ROUTES: Array<[string, string]> = [
  ["/trying-to-conceive/understanding-your-cycle", "/trying-to-conceive/ovulation"],
  ["/trying-to-conceive/timing-and-tracking", "/trying-to-conceive/cycle-tracking"],
  ["/trying-to-conceive/waiting-and-testing", "/trying-to-conceive/two-week-wait"],
];

describe("Phase 35C legacy TTC stage routes", () => {
  const app = read("src/App.tsx");
  const sitemap = read("scripts/generate-sitemap.ts");
  const stagePage = read("src/pages/StagePage.tsx");

  it.each(LEGACY_STAGE_ROUTES)(
    "redirects %s to its canonical topic page",
    (from, to) => {
      const pattern = new RegExp(
        `path="${from}"[\\s\\S]{0,160}Navigate to="${to}" replace`,
      );
      expect(app).toMatch(pattern);
    },
  );

  it("keeps the redirects above the generic stage route", () => {
    const generic = app.indexOf('path="/:journey/:stage"');
    for (const [from] of LEGACY_STAGE_ROUTES) {
      expect(app.indexOf(`path="${from}"`)).toBeGreaterThan(-1);
      expect(app.indexOf(`path="${from}"`)).toBeLessThan(generic);
    }
  });

  it("removes them from the sitemap and the stage allowlists", () => {
    for (const [from] of LEGACY_STAGE_ROUTES) {
      expect(sitemap).not.toContain(from);
      expect(stagePage).not.toContain(from.replace(/^\//, ""));
    }
    expect(stagePage).toContain("const breadcrumbStageAllowlist: string[] = [];");
  });

  it("never redirects a route onto itself", () => {
    for (const [from, to] of LEGACY_STAGE_ROUTES) expect(from).not.toBe(to);
  });
});

describe("Phase 35C TTC → Pregnancy editorial handoff", () => {
  it("adds exactly one handoff, on the pregnancy testing topic page", () => {
    const withHandoff = Object.values(ttcPageConfigs).filter((c) => c.handoff);
    expect(withHandoff.map((c) => c.slug)).toEqual(["pregnancy-tests"]);
  });

  it("points at the existing Pregnancy hub route", () => {
    expect(ttcPageConfigs["pregnancy-tests"].handoff?.href).toBe("/pregnancy");
    expect(ttcPageConfigs["pregnancy-tests"].handoff?.title).toMatch(/positive test/i);
  });

  it("renders the handoff in the shared subtopic template", () => {
    const tpl = read("src/components/ttc/TTCSubtopicPage.tsx");
    expect(tpl).toContain("config.handoff");
  });
});

describe("Phase 35C source and claim cleanup", () => {
  const all = getAllArticles() as unknown as Array<Record<string, unknown>>;
  const ttc = all.filter((a) =>
    JSON.stringify(a.journey ?? "").toLowerCase().includes("trying"),
  );

  it("normalises the NICE CG156 record wherever it is cited", () => {
    const data = read("src/data/articleData.ts") + read("src/data/ttcFlagshipOverrides.ts");
    expect(data).not.toContain('"NICE — Fertility problems: assessment and treatment (CG156)"');
    expect(data).toContain("https://www.nice.org.uk/guidance/cg156");
  });

  it("leaves no structured source without a URL", () => {
    for (const article of ttc) {
      for (const source of ((article.sources ?? []) as Array<unknown>)) {
        if (typeof source === "object" && source !== null) {
          expect((source as { url?: string }).url, String(article.slug)).toBeTruthy();
        }
      }
    }
  });

  it("removes the flagged unsupported figures from the flagged TTC articles", () => {
    const flagged = [
      "implantation-bleeding",
      "how-long-implantation-takes",
      "trying-to-conceive-explained",
      "fertile-window",
      "irregular-periods-and-trying-to-conceive",
      "faint-positive-pregnancy-test",
      "how-long-to-try-before-getting-help",
      "fertility-tests-for-men",
    ];
    const pattern =
      /6[–-]12 days|6 to 12 days|12[–-]24 hours|12 to 24 hours|80[–-]85%|10[–-]12 weeks|fairly fixed at around 12[–-]14 days|doubles every 48 hours/;

    for (const slug of flagged) {
      const blob = JSON.stringify([
        all.find((a) => a.slug === slug) ?? {},
        (ttcFlagshipOverrides as Record<string, unknown>)[slug] ?? {},
      ]);
      expect(pattern.test(blob), slug).toBe(false);
    }
  });
});
