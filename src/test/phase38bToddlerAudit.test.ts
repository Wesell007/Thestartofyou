import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { toddlerArticles } from "@/data/toddlerArticleData";
import { toddlerAgeConfigs } from "@/data/toddlerAgeData";
import { toddlerTopicConfigs } from "@/data/toddlerTopicData";

const sitemap = readFileSync("public/sitemap.xml", "utf8");
const locs = [...sitemap.matchAll(/<loc>https:\/\/thestartofyou\.com(\/toddler[^<]*)<\/loc>/g)].map((m) => m[1]);
const register = readFileSync("docs/content/phase38b-toddler-journey-gap-register.md", "utf8");
const rows = register
  .split("\n")
  .filter((l) => /^\| [A-ES]\d+ \|/.test(l))
  .map((l) => l.split("|").map((c) => c.trim()).slice(1, -1));

describe("Phase 38B Toddler audit (read-only)", () => {
  it("measures routes, articles and sitemap", () => {
    expect(Object.keys(toddlerAgeConfigs)).toHaveLength(5);
    expect(Object.keys(toddlerTopicConfigs)).toHaveLength(8);
    expect(toddlerArticles).toHaveLength(16);
    expect(toddlerArticles.every((a) => a.status === "ready")).toBe(true);
    expect(locs).toHaveLength(30);
    expect(new Set(locs).size).toBe(30);
    for (const a of toddlerArticles) expect(locs).toContain(`/toddler/${a.topic}/${a.slug}`);
  });

  it("has two articles per topic and valid related links", () => {
    const slugs = new Set(toddlerArticles.map((a) => a.slug));
    const per: Record<string, number> = {};
    toddlerArticles.forEach((a) => (per[a.topic] = (per[a.topic] ?? 0) + 1));
    expect(Object.values(per).every((n) => n === 2)).toBe(true);
    const inbound = new Map<string, number>();
    for (const a of toddlerArticles)
      for (const r of a.relatedSlugs ?? []) {
        expect(slugs.has(r)).toBe(true);
        inbound.set(r, (inbound.get(r) ?? 0) + 1);
      }
    for (const s of slugs) expect(inbound.get(s) ?? 0).toBeGreaterThan(0);
  });

  it("counts structured sources", () => {
    const all = toddlerArticles.flatMap((a) => a.sources ?? []);
    expect(all).toHaveLength(60);
    expect(all.every((s: { url?: string }) => /^https?:\/\//.test(s.url ?? ""))).toBe(true);
    expect(toddlerArticles.filter((a) => a.medicallyReviewed)).toHaveLength(3);
  });

  it("reconciles journey and priority arithmetic", () => {
    expect(rows).toHaveLength(55);
    const count = (i: number, v: string) => rows.filter((r) => r[i] === v).length;
    expect([count(5, "COVERED"), count(5, "PARTIALLY_COVERED"), count(5, "UNCOVERED"), count(5, "NOT_REQUIRED_STANDALONE"), count(5, "BETTER_SERVED_ELSEWHERE")]).toEqual([40, 9, 1, 2, 3]);
    expect([count(10, "P1"), count(10, "P2"), count(10, "P3"), count(10, "P4")]).toEqual([0, 3, 8, 4]);
    expect(rows.filter((r) => r[5] === "COVERED").every((r) => r[10] === "-")).toBe(true);
    const prio = rows.filter((r) => r[10] !== "-");
    const gaps = prio.filter((r) => ["PARTIALLY_COVERED", "UNCOVERED"].includes(r[5]));
    const handoff = prio.filter((r) => !gaps.includes(r) && r[8] === "HANDOFF GAP");
    expect([gaps.length, handoff.length, prio.length - gaps.length - handoff.length]).toEqual([10, 4, 1]);
    const c7 = rows.find((r) => r[0] === "C7")!;
    expect([c7[5], c7[6], c7[9], c7[10]]).toEqual(["UNCOVERED", "none", "EXPAND_EXISTING BED", "P3"]);
    expect(["12-17m", "18-23m", "2y", "30m", "3y", "shared"].map((a) => count(1, a))).toEqual([10, 9, 12, 8, 8, 8]);
  });

  it("reconciles the article-action ledger", () => {
    const inv = readFileSync("docs/content/phase38b-toddler-content-inventory.md", "utf8");
    const actions = inv.split("\n").filter((l) => /^\| \d+ \|/.test(l)).map((l) => l.split("|").slice(-2)[0].trim());
    expect(actions).toHaveLength(16);
    expect(actions.filter((a) => a === "KEEP")).toHaveLength(10);
    expect(actions.filter((a) => a.startsWith("EXPAND_EXISTING"))).toHaveLength(6);
  });
});
