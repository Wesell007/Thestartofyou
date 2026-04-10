import { useParams, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { getArticle, getRelatedArticles } from "@/data/articleData";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ArticleHero from "@/components/article/ArticleHero";
import ArticleQuickAnswer from "@/components/article/ArticleQuickAnswer";
import ArticleTrustBar from "@/components/article/ArticleTrustBar";
import ArticleInThisGuide from "@/components/article/ArticleInThisGuide";
import ArticleHowThisFeels from "@/components/article/ArticleHowThisFeels";
import ArticleWhatHappening from "@/components/article/ArticleWhatHappening";
import ArticleTiming from "@/components/article/ArticleTiming";
import ArticleRealExperience from "@/components/article/ArticleRealExperience";
import ArticleInterpretation from "@/components/article/ArticleInterpretation";
import ArticleNormal from "@/components/article/ArticleNormal";
import ArticleAction from "@/components/article/ArticleAction";
import ArticleCompare from "@/components/article/ArticleCompare";
import ArticleFAQ from "@/components/article/ArticleFAQ";
import ArticleWhatNext from "@/components/article/ArticleWhatNext";
import ArticleRelatedStage from "@/components/article/ArticleRelatedStage";
import ArticleAISupport from "@/components/article/ArticleAISupport";
import JournalPromotion from "@/components/shared/JournalPromotion";
import ArticleJourneyCTA from "@/components/article/ArticleJourneyCTA";
import ArticleKeyTakeaways from "@/components/article/ArticleKeyTakeaways";
import ArticleJumpNav from "@/components/article/ArticleJumpNav";
import ArticleSources from "@/components/article/ArticleSources";
import ArticleRelatedReads from "@/components/article/ArticleRelatedReads";
import ArticleFullGuide from "@/components/article/ArticleFullGuide";
import ArticleEditorialContent from "@/components/article/ArticleEditorialContent";
import ArticleDeepIntro from "@/components/article/ArticleDeepIntro";

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const data = getArticle(slug ?? "");

  // ─── SEO: Set document title and meta description ───
  useEffect(() => {
    if (data) {
      document.title = data.metaTitle || data.title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", data.metaDescription);
      } else {
        const meta = document.createElement("meta");
        meta.name = "description";
        meta.content = data.metaDescription;
        document.head.appendChild(meta);
      }
    }
  }, [data]);

  if (!data) {
    return <Navigate to="/explore" replace />;
  }

  const relatedArticles = getRelatedArticles(data.slug, 3);
  const isDeep = data.isCornerstone;
  const hasEditorial = isDeep && data.editorialSections && data.editorialSections.length > 0;

  const promoLevel = data.productPromotion ?? "none";
  const showJournal = promoLevel === "strong" || promoLevel === "light";

  const hasEmotionalLayer = data.howThisFeels?.length > 0;
  const hasTiming = !!(data.timing?.whenStarts);
  const hasRealExperience = data.whatItFeelsLike?.length > 0;
  const hasActions = data.whatYouCanDo?.length > 0;
  const hasCompare = !!data.compare;
  const hasFAQ = data.faq && data.faq.length > 0;

  // ─────────────────────────────────────────────────────────────────────
  // LAYER 2: Deep Article (Cornerstone / SEO)
  // Template order per editorial system blueprint
  // ─────────────────────────────────────────────────────────────────────
  if (isDeep) {
    return (
      <div className="min-h-screen bg-parchment">
        <Navbar />

        {/* 1. Hero */}
        <ArticleHero data={data} />

        {/* 2. Quick answer — "At a glance" */}
        <ArticleQuickAnswer data={data} />

        {/* 3. Key takeaways */}
        {data.keyTakeaways && <ArticleKeyTakeaways data={data} />}

        {/* 4. Jump navigation */}
        {data.inThisArticle && <ArticleJumpNav data={data} />}

        {/* 5. Deep intro — reading context */}
        <ArticleDeepIntro data={data} />

        {/* 6. Editorial prose sections */}
        {hasEditorial && (
          <ArticleEditorialContent sections={data.editorialSections!} />
        )}

        {/* 7. Normal vs seek support */}
        <ArticleNormal data={data} />

        {/* 8. Compare */}
        {hasCompare && <ArticleCompare data={data} />}

        {/* 9. Full FAQ with JSON-LD */}
        {hasFAQ && <ArticleFAQ data={data} />}

        {/* 10. Sources */}
        {data.sources && <ArticleSources data={data} />}

        {/* 11. What next */}
        <ArticleWhatNext data={data} />

        {/* ── Conversion sequence (Tier 3 → 2 → 1) ── */}
        {/* 12. AI support — Tier 3 */}
        <ArticleAISupport data={data} />

        {/* 13. Stage links — Tier 2 */}
        <ArticleRelatedStage data={data} />

        {/* 14. Journey CTA — Tier 1 (dominant action) */}
        <ArticleJourneyCTA data={data} />

        {/* ── Post-CTA: soft modules & browse ── */}
        {/* 15. Journal — soft commercial, never competes with Tier 1 */}
        {showJournal && (
          <JournalPromotion
            contextCopy="Capture your experiences alongside your weekly guidance. Keep a thoughtful, private record of your journey."
          />
        )}

        {/* 16. Related reads — browse last (max 3) */}
        {relatedArticles.length > 0 && (
          <ArticleRelatedReads articles={relatedArticles} isDeep />
        )}

        <Footer />
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────
  // LAYER 1: Short Article (Instant Value / Brand)
  // Template order per editorial system blueprint
  // ─────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />

      {/* 1. Hero */}
      <ArticleHero data={data} />

      {/* 2. Quick answer */}
      <ArticleQuickAnswer data={data} />

      {/* 3. In this guide — anchor navigation */}
      <ArticleInThisGuide data={data} />

      {/* 4. Emotional recognition */}
      {hasEmotionalLayer && <ArticleHowThisFeels data={data} />}

      {/* 5. What's happening */}
      <ArticleWhatHappening data={data} />

      {/* 6. Timing */}
      {hasTiming && <ArticleTiming data={data} />}

      {/* 7. What this means */}
      <ArticleInterpretation data={data} />

      {/* 8. Normal vs seek support */}
      <ArticleNormal data={data} />

      {/* 9. What you can do */}
      {hasActions && <ArticleAction data={data} />}

      {/* 10. Real experience */}
      {hasRealExperience && <ArticleRealExperience data={data} />}

      {/* 11. Compare */}
      {hasCompare && <ArticleCompare data={data} />}

      {/* 12. FAQ with JSON-LD */}
      {hasFAQ && <ArticleFAQ data={data} />}

      {/* 13. Bridge to deep guide */}
      {data.cornerstoneSlug && <ArticleFullGuide data={data} />}

      {/* ── Conversion sequence (Tier 3 → 2 → 1) ── */}
      {/* 14. AI support — Tier 3 */}
      <ArticleAISupport data={data} />

      {/* 15. Stage links — Tier 2 */}
      <ArticleRelatedStage data={data} />

      {/* 16. Journey CTA — Tier 1 (dominant action) */}
      <ArticleJourneyCTA data={data} />

      {/* ── Post-CTA: soft modules & browse ── */}
      {/* 17. Journal — soft commercial, never competes with Tier 1 */}
      {showJournal && (
        <JournalPromotion
          contextCopy={
            promoLevel === "strong"
              ? "Capture your experiences alongside your weekly guidance. Keep a thoughtful, private record of your journey."
              : "Keep a record of what this stage feels like, alongside the guidance you're reading."
          }
        />
      )}

      {/* 18. Related reads — browse last (max 3) */}
      {relatedArticles.length > 0 && (
        <ArticleRelatedReads articles={relatedArticles} />
      )}

      <Footer />
    </div>
  );
};

export default ArticlePage;
