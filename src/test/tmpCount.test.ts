import { it } from "vitest";
import { familyArticles } from "@/data/familyArticleData";
import { firstYearArticles } from "@/data/firstYearArticleData";
import { toddlerArticles } from "@/data/toddlerArticleData";
import { getAllArticles } from "@/data/articleData";
it("counts", () => {
  const legacy = getAllArticles();
  const info = {
    family: familyArticles.length,
    familySources: familyArticles.filter(a => (a.sources?.length ?? 0) > 0).map(a => a.slug),
    familyReview: familyArticles.filter(a => a.medicallyReviewed && a.reviewedBy).map(a => a.slug),
    firstYear: firstYearArticles.length,
    fySources: firstYearArticles.filter(a => (a.sources?.length ?? 0) > 0).length,
    fyReview: firstYearArticles.filter(a => a.medicallyReviewed && a.reviewedBy).length,
    toddler: toddlerArticles.length,
    tdSources: toddlerArticles.filter(a => (a.sources?.length ?? 0) > 0).length,
    tdReview: toddlerArticles.filter(a => a.medicallyReviewed && a.reviewedBy).length,
    legacy: legacy.length,
    legacySources: legacy.filter(a => (a.sources?.length ?? 0) > 0).length,
    legacyReview: legacy.filter(a => a.reviewedBy).length,
    legacyReviewNames: Array.from(new Set(legacy.filter(a=>a.reviewedBy).map(a=>a.reviewedBy))),
  };
  console.log(JSON.stringify(info));
});
