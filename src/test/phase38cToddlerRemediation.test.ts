import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { toddlerArticles } from "@/data/toddlerArticleData";
import { articleInventory } from "@/data/articleInventory";
import { AI_SOURCE_ROUTING_VERSION } from "../../supabase/functions/_shared/aiVersions";

// 38C CURRENT POST-REMEDIATION STATE.
const get = (slug: string) => {
  const a = toddlerArticles.find((x) => x.slug === slug);
  if (!a) throw new Error(slug);
  return a;
};
const section = (slug: string, heading: string) =>
  get(slug).sections?.find((s) => s.heading === heading);
const hasSource = (slug: string, url: string) =>
  (get(slug).sources ?? []).some((s) => s.url === url);

describe("Phase 38C Toddler remediation (current state)", () => {
  it("keeps 16 ready articles with no new articles", () => {
    expect(toddlerArticles).toHaveLength(16);
    expect(toddlerArticles.every((a) => a.status === "ready")).toBe(true);
  });

  it("resolves TAN hitting and biting with a verified NHS source", () => {
    const s = section("understanding-toddler-tantrums", "Hitting and biting");
    expect(s?.body.join(" ")).toMatch(/health visitor or GP/);
    expect(s?.body.join(" ")).not.toMatch(/naughty|aggressive child/i);
    expect(hasSource("understanding-toddler-tantrums", "https://www.nhs.uk/conditions/baby/babys-development/behaviour/temper-tantrums/")).toBe(true);
  });

  it("resolves PTP withholding with a verified NHS source", () => {
    const s = section("potty-training-without-pressure", "When your child holds on to poo or wee");
    expect(s?.body.join(" ")).toMatch(/constipat/);
    expect(s?.body.join(" ")).toMatch(/GP/);
    expect(hasSource("potty-training-without-pressure", "https://www.nhs.uk/conditions/baby/health/constipation-in-children/")).toBe(true);
  });

  it("resolves HOM food choking by routing emergency steps to NHS", () => {
    const text = section("toddler-home-safety", "Food and choking")?.body.join(" ") ?? "";
    expect(text).toMatch(/quarters/);
    expect(text).toMatch(/999/);
    expect(text).not.toMatch(/back blows|thrusts/i);
    expect(hasSource("toddler-home-safety", "https://www.nhs.uk/conditions/baby/first-aid-and-safety/first-aid/how-to-stop-a-child-from-choking/")).toBe(true);
  });

  it("has all 16 inventory rows consistent with ready articles", () => {
    const rows = articleInventory.filter((r) => r.id.startsWith("toddler:"));
    expect(rows).toHaveLength(16);
    for (const a of toddlerArticles) {
      const r = rows.find((x) => x.slug === a.slug);
      expect(r, a.slug).toBeDefined();
      expect([r!.currentStatus, r!.contentState, r!.recommendedAction]).toEqual(["live", "final", "keep"]);
      expect(r!.route).toBe(`/toddler/${a.topic}/${a.slug}`);
    }
  });

  it("carries no reviewer metadata without provenance", () => {
    expect(toddlerArticles.filter((a) => a.medicallyReviewed || a.reviewedBy)).toHaveLength(0);
    const src = readFileSync("src/data/toddlerArticleData.ts", "utf8");
    expect(src).not.toMatch(/Jenny Joines/);
  });

  it("keeps routes, sitemap and discovery intact", () => {
    const sitemap = readFileSync("public/sitemap.xml", "utf8");
    const locs = [...sitemap.matchAll(/<loc>https:\/\/thestartofyou\.com(\/toddler[^<]*)<\/loc>/g)].map((m) => m[1]);
    expect(locs).toHaveLength(30);
    expect(new Set(locs).size).toBe(30);
    const slugs = new Set(toddlerArticles.map((a) => a.slug));
    const inbound = new Map<string, number>();
    for (const a of toddlerArticles) {
      expect(locs).toContain(`/toddler/${a.topic}/${a.slug}`);
      for (const r of a.relatedSlugs ?? []) {
        expect(slugs.has(r)).toBe(true);
        inbound.set(r, (inbound.get(r) ?? 0) + 1);
      }
    }
    for (const s of slugs) expect(inbound.get(s) ?? 0).toBeGreaterThan(0);
  });

  it("leaves grounding and the 38A.1 hub order unchanged", () => {
    expect(AI_SOURCE_ROUTING_VERSION).toBe("30B-source-routing-v1");
    const reg = readFileSync("src/lib/grounding/articleGroundingRegistry.ts", "utf8");
    for (const slug of ["understanding-toddler-tantrums", "potty-training-without-pressure", "toddler-home-safety"]) {
      expect(reg).toMatch(new RegExp(`slug: "${slug}".*approvalStatus: "blocked_draft"`));
    }
    const hub = readFileSync("src/pages/Toddler.tsx", "utf8");
    const order = ["<ToddlerHero", "<ToddlerAgeNav", "<ToddlerToolsResources", "<ToddlerTopicClusters", "<ToddlerCommonQuestions", "<ToddlerAISupport", "<ToddlerPathways"].map((t) => hub.indexOf(t));
    expect(order.every((i) => i >= 0)).toBe(true);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
  });
});
