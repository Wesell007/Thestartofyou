import { useParams, Navigate } from "react-router-dom";
import { getArticle, getRelatedArticles } from "@/data/articleData";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ArticleHero from "@/components/article/ArticleHero";
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

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const data = getArticle(slug ?? "");

  if (!data) {
    return <Navigate to="/explore" replace />;
  }

  const relatedArticles = getRelatedArticles(data.slug, 3);
  const isDeep = data.isCornerstone;

  // Product promotion logic
  const promoLevel = data.productPromotion ?? "none";
  const showJournal = promoLevel === "strong" || promoLevel === "light";

  // Conditional section flags for short guidance pages
  const hasEmotionalLayer = data.howThisFeels?.length > 0;
  const hasTiming = !!(data.timing?.whenStarts);
  const hasRealExperience = data.whatItFeelsLike?.length > 0;
  const hasActions = data.whatYouCanDo?.length > 0;
  const hasCompare = !!data.compare;
  const hasFAQ = data.faq && data.faq.length > 0;

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />
      <ArticleHero data={data} />

      {/* ── Deep article: jump nav ── */}
      {isDeep && data.inThisArticle && <ArticleJumpNav data={data} />}

      {/* ── Short article: lightweight "In this guide" ── */}
      {!isDeep && <ArticleInThisGuide data={data} />}

      {/* ── Key takeaways (both formats, data-driven) ── */}
      {data.keyTakeaways && <ArticleKeyTakeaways data={data} />}

      {/* ── CORE SECTIONS ── */}

      {/* Emotional bridge (conditional) */}
      {hasEmotionalLayer && <ArticleHowThisFeels data={data} />}

      {/* Core explanation (always present) */}
      <ArticleWhatHappening data={data} />

      {/* Timing (conditional: only when timing data exists meaningfully) */}
      {hasTiming && <ArticleTiming data={data} />}

      {/* Real experience / lived experience (conditional) */}
      {hasRealExperience && <ArticleRealExperience data={data} />}

      {/* Reassurance / "What this means" (always present for guidance) */}
      <ArticleInterpretation data={data} />

      {/* Normal vs Seek Support (always present: core trust layer) */}
      <ArticleNormal data={data} />

      {/* Practical actions (conditional) */}
      {hasActions && <ArticleAction data={data} />}

      {/* ── CONDITIONAL SECTIONS ── */}

      {/* Compare section for GEO (only when comparison intent exists) */}
      {hasCompare && <ArticleCompare data={data} />}

      {/* FAQ section for AEO (only when real questions exist) */}
      {hasFAQ && <ArticleFAQ data={data} />}

      {/* What happens next (always: provides forward motion) */}
      <ArticleWhatNext data={data} />

      {/* Related stage links */}
      <ArticleRelatedStage data={data} />

      {/* Sources for deep articles */}
      {isDeep && data.sources && <ArticleSources data={data} />}

      {/* AI support (always present: key product differentiator) */}
      <ArticleAISupport data={data} />

      {/* Context-aware journal promotion (product-level controlled) */}
      {showJournal && (
        <JournalPromotion
          contextCopy={
            promoLevel === "strong"
              ? "Capture your experiences alongside your weekly guidance. Keep a thoughtful, private record of your journey."
              : "Keep a record of what this stage feels like, alongside the guidance you're reading."
          }
        />
      )}

      {/* Related reads */}
      {relatedArticles.length > 0 && (
        <ArticleRelatedReads articles={relatedArticles} isDeep={isDeep} />
      )}

      <ArticleJourneyCTA data={data} />
      <Footer />
    </div>
  );
};

export default ArticlePage;
