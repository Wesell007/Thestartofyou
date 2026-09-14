import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { render, screen } from "@testing-library/react";
import MedicalReviewClaim from "@/components/shared/MedicalReviewClaim";
import {
  REVIEW_PROVENANCE_REGISTRY,
  getReviewClaim,
  hasReviewClaim,
  isValidReviewProvenance,
  reviewSurfaceKey,
  type ReviewProvenance,
} from "@/lib/reviewClaims";

const root = process.cwd();

const walk = (dir: string, out: string[] = []): string[] => {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(tsx|ts)$/.test(entry)) out.push(p);
  }
  return out;
};

const renderingFiles = [
  ...walk(join(root, "src/components")),
  ...walk(join(root, "src/pages")),
].filter((f) => !/\.(test|spec)\.tsx?$/.test(f));

describe("Phase 33.5 — reviewer claim governance", () => {
  it("keeps the production provenance registry empty", () => {
    expect(REVIEW_PROVENANCE_REGISTRY).toHaveLength(0);
  });

  it("returns no claim for any content surface in production", () => {
    for (const key of [
      reviewSurfaceKey("article", "hair-dye-and-beauty-treatments-in-pregnancy"),
      reviewSurfaceKey("article", "when-sleep-suddenly-changes"),
      reviewSurfaceKey("week", 24),
      reviewSurfaceKey("topic", "first-year/sleep"),
      reviewSurfaceKey("topic", "toddler/health"),
      reviewSurfaceKey("stage", "pregnancy"),
      reviewSurfaceKey("tool", "due-date"),
    ]) {
      expect(getReviewClaim(key)).toBeNull();
      expect(hasReviewClaim(key)).toBe(false);
    }
  });

  it("renders nothing when there is no provenance", () => {
    const { container } = render(
      <MedicalReviewClaim contentKey={reviewSurfaceKey("article", "any-article")} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders a claim when genuine provenance exists (isolated test registry)", () => {
    const testRegistry: ReviewProvenance[] = [
      {
        contentKey: reviewSurfaceKey("article", "test-only-article"),
        reviewer: "Test Reviewer",
        reviewState: "completed",
        reviewedOn: "2026-01-05",
      },
    ];
    render(
      <MedicalReviewClaim
        contentKey={reviewSurfaceKey("article", "test-only-article")}
        registry={testRegistry}
      />
    );
    expect(screen.getByText(/Medically reviewed by Test Reviewer/)).toBeTruthy();
  });

  it("enforces an exact surface match and complete provenance", () => {
    const testRegistry: ReviewProvenance[] = [
      {
        contentKey: reviewSurfaceKey("article", "test-only-article"),
        reviewer: "Test Reviewer",
        reviewState: "completed",
        reviewedOn: "2026-01-05",
      },
    ];
    // Wrong article does not inherit another article's review.
    expect(
      getReviewClaim(reviewSurfaceKey("article", "other-article"), testRegistry)
    ).toBeNull();
    // Incomplete records never satisfy the gate.
    expect(
      isValidReviewProvenance({
        contentKey: "article:x",
        reviewer: "Test Reviewer",
        reviewState: "completed",
      })
    ).toBe(false);
    expect(
      isValidReviewProvenance({
        contentKey: "article:x",
        reviewer: "",
        reviewState: "completed",
        reviewedOn: "2026-01-05",
      })
    ).toBe(false);
    expect(
      isValidReviewProvenance({
        contentKey: "article:x",
        reviewer: "Test Reviewer",
        reviewState: "pending" as ReviewProvenance["reviewState"],
        reviewedOn: "2026-01-05",
      })
    ).toBe(false);
  });

  it("contains no hardcoded reviewer identity in rendering code", () => {
    const offenders = renderingFiles.filter((f) =>
      readFileSync(f, "utf8").includes("Jenny Joines")
    );
    expect(offenders).toEqual([]);
  });

  it("renders no review wording outside the single gated component", () => {
    const pattern =
      /(Medically reviewed|Reviewed by|Reviewed for accuracy|Clinically reviewed|Clinically checked|Expert reviewed|Medically verified|Accuracy review)/;
    const allowed = new Set([
      join(root, "src/components/shared/MedicalReviewClaim.tsx"),
      // Disclaimers stating content is NOT individually reviewed.
      join(root, "src/pages/Terms.tsx"),
      join(root, "src/components/support/SupportAISupport.tsx"),
      // Badge-only chips already gated by hasReviewClaim().
      join(root, "src/components/family/article/FamilyArticleCard.tsx"),
      join(root, "src/components/family/article/FamilyArticleImageCard.tsx"),
      join(root, "src/components/firstyear/article/FirstYearArticleCard.tsx"),
      join(root, "src/components/toddler/article/ToddlerArticleCard.tsx"),
    ]);
    const offenders = renderingFiles.filter(
      (f) => !allowed.has(f) && pattern.test(readFileSync(f, "utf8"))
    );
    expect(offenders).toEqual([]);
  });

  it("gates every remaining review badge on the provenance lookup", () => {
    for (const f of [
      "src/components/family/article/FamilyArticleCard.tsx",
      "src/components/family/article/FamilyArticleImageCard.tsx",
      "src/components/firstyear/article/FirstYearArticleCard.tsx",
      "src/components/toddler/article/ToddlerArticleCard.tsx",
      "src/components/firstyear/topic/FirstYearTopicPage.tsx",
      "src/components/toddler/topic/ToddlerTopicPage.tsx",
    ]) {
      const src = readFileSync(join(root, f), "utf8");
      expect(src).toContain("hasReviewClaim(");
      expect(src).not.toContain("{article.medicallyReviewed && (");
      expect(src).not.toContain("{config.medicallyReviewed && (");
    }
  });

  it("never emits an unsupported reviewedBy in Article JSON-LD", () => {
    const src = readFileSync(join(root, "src/pages/ArticlePage.tsx"), "utf8");
    expect(src).not.toContain("data.reviewedBy");
    expect(src).toContain("getReviewClaim(reviewSurfaceKey(\"article\", data.slug))");
    expect(src).toContain("if (reviewClaim) {");
  });

  it("preserves historical reviewer metadata in the datasets", () => {
    const datasets = [
      "src/data/articleData.ts",
      "src/data/firstYearArticleData.ts",
      "src/data/toddlerArticleData.ts",
      "src/data/familyArticleData.ts",
      "src/data/ttcFlagshipOverrides.ts",
    ];
    const total = datasets.reduce((n, f) => {
      const matches = readFileSync(join(root, f), "utf8").match(/Jenny Joines/g);
      return n + (matches?.length ?? 0);
    }, 0);
    expect(total).toBeGreaterThanOrEqual(179);
  });
});
