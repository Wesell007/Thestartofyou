/** Phase 39B — read-only Family audit assertions. Mutates nothing. */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { familyArticles } from "@/data/familyArticleData";
import { familyTopics } from "@/data/familyTopicData";
import { articleInventory } from "@/data/articleInventory";
import { ARTICLE_GROUNDING_REGISTRY } from "@/lib/grounding/articleGroundingRegistry";
import { isGroundingEligible } from "@/lib/grounding/articleGroundingEligibility";
import { hasReviewClaim, reviewSurfaceKey } from "@/lib/reviewClaims";
import { AI_SOURCE_ROUTING_VERSION } from "../../supabase/functions/_shared/aiVersions";

const read = (p: string) => readFileSync(resolve(p), "utf8");
const TOPICS = ["growing-families", "relationships", "family-basics", "health-safety", "travel-days-out", "play-connection"];

describe("Phase 39B repository truth", () => {
  it("has 6 topics and 18 ready articles, 3 per area", () => {
    expect(Object.keys(familyTopics).sort()).toEqual([...TOPICS].sort());
    expect(familyArticles).toHaveLength(18);
    expect(familyArticles.every((a) => a.status === "ready")).toBe(true);
    for (const t of TOPICS) expect(familyArticles.filter((a) => a.topic === t)).toHaveLength(3);
  });

  it("sitemap has exactly 25 unique Family URLs", () => {
    const urls = [...read("public/sitemap.xml").matchAll(/<loc>https:\/\/thestartofyou\.com(\/family[^<]*)<\/loc>/g)].map((m) => m[1]);
    expect(urls).toHaveLength(25);
    expect(new Set(urls).size).toBe(25);
    for (const a of familyArticles) expect(urls).toContain(`/family/${a.topic}/${a.slug}`);
  });

  it("all related slugs resolve (54) and sources are structured", () => {
    const slugs = new Set(familyArticles.map((a) => a.slug));
    const rel = familyArticles.flatMap((a) => a.relatedSlugs ?? []);
    expect(rel).toHaveLength(54);
    expect(rel.every((s) => slugs.has(s))).toBe(true);
    const sources = familyArticles.flatMap((a) => a.sources ?? []);
    expect(sources).toHaveLength(14);
    expect(sources.every((s) => /^https:\/\//.test(s.url))).toBe(true);
    expect(familyArticles.filter((a) => !a.sources?.length)).toHaveLength(14);
  });
});

describe("Phase 39B governance drift", () => {
  it("records 12 stale inventory rows and 6 missing rows", () => {
    const rows = articleInventory.filter((r) => r.hub === "family" && r.system === "hub-article");
    expect(rows).toHaveLength(12);
    expect(rows.filter((r) => r.currentStatus === "draft" && r.contentState === "placeholder" && r.recommendedAction === "publish")).toHaveLength(12);
    const rowSlugs = new Set(rows.map((r) => r.slug));
    expect(familyArticles.filter((a) => !rowSlugs.has(a.slug))).toHaveLength(6);
  });

  it("has 2 unsupported reviewer metadata records and 0 rendered claims", () => {
    expect(familyArticles.filter((a) => a.reviewedBy)).toHaveLength(2);
    for (const a of familyArticles) expect(hasReviewClaim(reviewSurfaceKey("article", a.slug))).toBe(false);
  });

  it("keeps grounding default deny", () => {
    const recs = ARTICLE_GROUNDING_REGISTRY.filter((r) => familyArticles.some((a) => a.slug === r.slug));
    expect(recs).toHaveLength(18);
    expect(recs.filter((r) => r.approvalStatus === "blocked_draft")).toHaveLength(12);
    expect(recs.filter((r) => r.approvalStatus === "blocked_missing_metadata")).toHaveLength(6);
    expect(recs.some((r) => isGroundingEligible(r))).toBe(false);
    expect(AI_SOURCE_ROUTING_VERSION).toBe("30B-source-routing-v1");
  });
});

describe("Phase 39B ledger arithmetic", () => {
  const rows = read("docs/content/phase39b-family-journey-gap-register.md")
    .split("\n").filter((l) => /^\| \d+ \|/.test(l)).map((l) => l.split("|").map((c) => c.trim()));
  const count = (i: number, v: string) => rows.filter((r) => r[i] === v).length;

  it("reconciles 58 moments by group and classification", () => {
    expect(rows).toHaveLength(58);
    expect(count(5, "COVERED")).toBe(30);
    expect(count(5, "PARTIALLY_COVERED")).toBe(16);
    expect(count(5, "UNCOVERED")).toBe(0);
    expect(count(5, "NOT_REQUIRED_STANDALONE")).toBe(5);
    expect(count(5, "BETTER_SERVED_ELSEWHERE")).toBe(7);
    expect(count(2, "RELATIONSHIPS") + count(2, "PRACTICAL FAMILY LIFE")).toBe(20);
  });

  it("reconciles priorities", () => {
    expect(count(10, "P1")).toBe(0);
    expect(count(10, "P2")).toBe(0);
    expect(count(10, "P3")).toBe(12);
    expect(count(10, "P4")).toBe(12);
    expect(count(10, "-")).toBe(34);
  });

  it("reconciles 18 article actions", () => {
    const inv = read("docs/content/phase39b-family-content-inventory.md").split("\n").filter((l) => /^\| \d+ \|/.test(l));
    expect(inv).toHaveLength(18);
    expect(inv.filter((l) => l.trim().endsWith("| KEEP |"))).toHaveLength(16);
    expect(inv.filter((l) => l.trim().endsWith("| INTERNAL_LINK_ONLY |"))).toHaveLength(2);
  });
});
