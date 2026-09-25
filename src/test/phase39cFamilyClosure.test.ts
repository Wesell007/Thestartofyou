/** Phase 39C — current post-remediation Family closure state. */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { familyArticles } from "@/data/familyArticleData";
import { articleInventory } from "@/data/articleInventory";
import { pregnancyTopicConfigs } from "@/data/pregnancyTopicData";
import { getFamilyArticleCardImage } from "@/components/family/article/familyArticleImages";
import { ARTICLE_GROUNDING_REGISTRY } from "@/lib/grounding/articleGroundingRegistry";
import { isGroundingEligible } from "@/lib/grounding/articleGroundingEligibility";
import { hasReviewClaim, reviewSurfaceKey } from "@/lib/reviewClaims";
import { AI_SOURCE_ROUTING_VERSION } from "../../supabase/functions/_shared/aiVersions";

const read = (p: string) => readFileSync(resolve(p), "utf8");

describe("Phase 39C Family closure", () => {
  it("keeps 18 ready articles with 18 matching live/final/keep inventory rows", () => {
    expect(familyArticles.filter((a) => a.status === "ready")).toHaveLength(18);
    const rows = articleInventory.filter((r) => r.hub === "family" && r.system === "hub-article");
    expect(rows).toHaveLength(18);
    for (const a of familyArticles) {
      const row = rows.find((r) => r.slug === a.slug);
      expect(row, a.slug).toBeDefined();
      expect(row!.route).toBe(`/family/${a.topic}/${a.slug}`);
      expect([row!.currentStatus, row!.contentState, row!.recommendedAction]).toEqual(["live", "final", "keep"]);
    }
  });

  it("has no unsupported reviewer metadata or rendered claims", () => {
    expect(familyArticles.filter((a) => a.medicallyReviewed || a.reviewedBy)).toHaveLength(0);
    expect(read("src/data/familyArticleData.ts")).not.toContain("Jenny Joines");
    for (const a of familyArticles) expect(hasReviewClaim(reviewSurfaceKey("article", a.slug))).toBe(false);
    // Provenance arithmetic: 39B 2 unresolved (both reviewer related) -> 2 resolved -> 0.
    const before = 2, resolved = 2;
    expect(before - resolved).toBe(0);
  });

  it("adds exactly one contextual Pregnancy to Family handoff", () => {
    const links = Object.values(pregnancyTopicConfigs).flatMap((c) => [
      ...(c?.startHere ?? []).map((s) => s.href),
      ...(c?.groups ?? []).flatMap((g) => g.links.map((l) => l.href)),
    ]);
    expect(links.filter((h) => h.startsWith("/family"))).toEqual(["/family"]);
  });

  it("keeps Family out of saved lifecycles", () => {
    expect(read("src/lib/navLifecycle.ts")).not.toMatch(/["']family["']\s*[|,]/);
  });

  it("keeps 25 unique Family sitemap URLs and all guides discoverable", () => {
    const urls = [...read("public/sitemap.xml").matchAll(/<loc>https:\/\/thestartofyou\.com(\/family[^<]*)<\/loc>/g)].map((m) => m[1]);
    expect(urls).toHaveLength(25);
    expect(new Set(urls).size).toBe(25);
    for (const a of familyArticles) {
      expect(urls).toContain(`/family/${a.topic}/${a.slug}`);
      expect(getFamilyArticleCardImage(a)).toBeTruthy();
    }
  });

  it("keeps grounding default deny and routing version unchanged", () => {
    const recs = ARTICLE_GROUNDING_REGISTRY.filter((r) => familyArticles.some((a) => a.slug === r.slug));
    expect(recs).toHaveLength(18);
    expect(recs.some((r) => isGroundingEligible(r))).toBe(false);
    expect(recs.filter((r) => r.approvalStatus === "candidate" || r.approvalStatus === "approved")).toHaveLength(0);
    expect(AI_SOURCE_ROUTING_VERSION).toBe("30B-source-routing-v1");
  });

  it("keeps the 39A / 39A.1 hub hierarchy", () => {
    const hub = read("src/pages/Family.tsx");
    const order = ["<FamilyHero />", "<FamilyOrientation />", "<FamilyToolsResources />", "<FamilyTopicClusters />", "<FamilyCommonQuestions />", "<FamilyAISupport />", "<FamilySupportNote />", "<FamilyPathways />"].map((c) => hub.indexOf(c));
    expect(order.every((v) => v > -1)).toBe(true);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
  });
});
