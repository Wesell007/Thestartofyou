import { useParams, Navigate } from "react-router-dom";
import { getArticle, getRelatedArticles } from "@/data/articleData";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ArticleHero from "@/components/article/ArticleHero";
import ArticleQuickAnswer from "@/components/article/ArticleQuickAnswer";
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

  // ─── DEEP ARTICLE (Layer 2: SEO / Cornerstone) ───
  if (isDeep) {
    return (
      <div className="min-h-screen bg-parchment">
        <Navbar />

        {/* Hero with deep-article treatment */}
        <ArticleHero data={data} />
        <ArticleQuickAnswer data={data} />

        {/* Key takeaways for scanning */}
        {data.keyTakeaways && <ArticleKeyTakeaways data={data} />}

        {/* Structured jump navigation */}
        {data.inThisArticle && <ArticleJumpNav data={data} />}

        {/* Deep intro context */}
        <ArticleDeepIntro data={data} />

        {/* Editorial prose sections */}
        {hasEditorial && (
          <ArticleEditorialContent sections={data.editorialSections!} />
        )}

        {/* Shared interpretive + practical blocks */}
        <ArticleNormal data={data} />
        {hasCompare && <ArticleCompare data={data} />}
        {hasFAQ && <ArticleFAQ data={data} />}

        {/* Forward momentum */}
        <ArticleWhatNext data={data} />
        <ArticleRelatedStage data={data} />

        {/* Sources and trust */}
        {data.sources && <ArticleSources data={data} />}

        {/* Support + conversion */}
        <ArticleAISupport data={data} />

        {showJournal && (
          <JournalPromotion
            contextCopy="Capture your experiences alongside your weekly guidance. Keep a thoughtful, private record of your journey."
          />
        )}

        {relatedArticles.length > 0 && (
          <ArticleRelatedReads articles={relatedArticles} isDeep />
        )}

        <ArticleJourneyCTA data={data} />
        <Footer />
      </div>
    );
  }

  // ─── SHORT ARTICLE (Layer 1: Instant Value / Brand) ───
  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />

      {/* 1. Hero → Quick answer bridge */}
      <ArticleHero data={data} />
      <ArticleQuickAnswer data={data} />

      {/* 2. Anchor navigation */}
      <ArticleInThisGuide data={data} />

      {/* 3. Emotional recognition (brand differentiator) */}
      {hasEmotionalLayer && <ArticleHowThisFeels data={data} />}

      {/* 4. Core explanation */}
      <ArticleWhatHappening data={data} />

      {/* 5. Timing context */}
      {hasTiming && <ArticleTiming data={data} />}

      {/* 6. Interpretation (meaning layer) */}
      <ArticleInterpretation data={data} />

      {/* 7. Normal vs seek support */}
      <ArticleNormal data={data} />

      {/* 8. Practical actions */}
      {hasActions && <ArticleAction data={data} />}

      {/* 9. Real experience quotes */}
      {hasRealExperience && <ArticleRealExperience data={data} />}

      {/* 10. Comparison block */}
      {hasCompare && <ArticleCompare data={data} />}

      {/* 11. FAQ */}
      {hasFAQ && <ArticleFAQ data={data} />}

      {/* 12. BRIDGE TO DEEP GUIDE (key system connection) */}
      {data.cornerstoneSlug && <ArticleFullGuide data={data} />}

      {/* 13. Forward momentum */}
      <ArticleWhatNext data={data} />

      {/* 14. Stage navigation */}
      <ArticleRelatedStage data={data} />

      {/* 15. AI support */}
      <ArticleAISupport data={data} />

      {/* 16. Journal */}
      {showJournal && (
        <JournalPromotion
          contextCopy={
            promoLevel === "strong"
              ? "Capture your experiences alongside your weekly guidance. Keep a thoughtful, private record of your journey."
              : "Keep a record of what this stage feels like, alongside the guidance you're reading."
          }
        />
      )}

      {/* 17. Related reads */}
      {relatedArticles.length > 0 && (
        <ArticleRelatedReads articles={relatedArticles} />
      )}

      {/* 18. Journey CTA */}
      <ArticleJourneyCTA data={data} />
      <Footer />
    </div>
  );
};

export default ArticlePage;
