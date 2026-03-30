import { useParams, Navigate, Link } from "react-router-dom";
import { getArticle, getRelatedArticles } from "@/data/articleData";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ArticleHero from "@/components/article/ArticleHero";
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
import ArticleTrustBar from "@/components/article/ArticleTrustBar";
import ArticleSources from "@/components/article/ArticleSources";
import ArticleRelatedReads from "@/components/article/ArticleRelatedReads";

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const data = getArticle(slug ?? "");

  if (!data) {
    return <Navigate to="/explore" replace />;
  }

  const relatedArticles = getRelatedArticles(data.slug, 3);
  const showJournal = data.productPromotion !== "none" && data.productPromotion !== "minimal";
  const isDeep = data.isCornerstone;

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />
      <ArticleHero data={data} />

      {/* Trust bar for deep articles */}
      {isDeep && <ArticleTrustBar data={data} />}

      {/* Jump navigation for deep articles */}
      {isDeep && data.inThisArticle && <ArticleJumpNav data={data} />}

      {/* Key takeaways for deep articles */}
      {data.keyTakeaways && <ArticleKeyTakeaways data={data} />}

      <ArticleHowThisFeels data={data} />
      <ArticleWhatHappening data={data} />
      <ArticleTiming data={data} />
      <ArticleRealExperience data={data} />
      <ArticleInterpretation data={data} />
      <ArticleNormal data={data} />
      <ArticleAction data={data} />

      {/* Compare section for GEO */}
      <ArticleCompare data={data} />

      {/* FAQ section for AEO */}
      <ArticleFAQ data={data} />

      <ArticleWhatNext data={data} />
      <ArticleRelatedStage data={data} />

      {/* Sources for deep articles */}
      {isDeep && data.sources && <ArticleSources data={data} />}

      <ArticleAISupport data={data} />

      {/* Context-aware journal promotion */}
      {showJournal && (
        <JournalPromotion
          contextCopy={
            data.productPromotion === "strong"
              ? "Capture your experiences alongside your weekly guidance. Keep a thoughtful, private record of your journey."
              : "Keep a record of what this stage feels like, alongside the guidance you're reading."
          }
        />
      )}

      {/* Related reads */}
      {relatedArticles.length > 0 && <ArticleRelatedReads articles={relatedArticles} />}

      <ArticleJourneyCTA data={data} />
      <Footer />
    </div>
  );
};

export default ArticlePage;
