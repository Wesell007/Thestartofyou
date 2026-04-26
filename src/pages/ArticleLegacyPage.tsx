import type { ArticleData } from "@/data/articleData";
import { getRelatedArticles } from "@/data/articleData";
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

interface Props {
  data: ArticleData;
}

// Legacy article render path. Preserved verbatim from the original ArticlePage
// while the catalogue is gradually migrated onto the unified deep template.
const ArticleLegacyPage = ({ data }: Props) => {
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

        <ArticleHero data={data} />
        <ArticleQuickAnswer data={data} />

        {data.keyTakeaways && <ArticleKeyTakeaways data={data} />}

        {data.inThisArticle && <ArticleJumpNav data={data} />}

        <ArticleDeepIntro data={data} />

        {hasEditorial && (
          <ArticleEditorialContent sections={data.editorialSections!} />
        )}

        <ArticleNormal data={data} />
        {hasCompare && <ArticleCompare data={data} />}
        {hasFAQ && <ArticleFAQ data={data} />}

        <ArticleWhatNext data={data} />
        <ArticleRelatedStage data={data} />

        {data.sources && <ArticleSources data={data} />}

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

      <ArticleHero data={data} />
      <ArticleQuickAnswer data={data} />

      <ArticleInThisGuide data={data} />

      {hasEmotionalLayer && <ArticleHowThisFeels data={data} />}

      <ArticleWhatHappening data={data} />

      {hasTiming && <ArticleTiming data={data} />}

      <ArticleInterpretation data={data} />

      <ArticleNormal data={data} />

      {hasActions && <ArticleAction data={data} />}

      {hasRealExperience && <ArticleRealExperience data={data} />}

      {hasCompare && <ArticleCompare data={data} />}

      {hasFAQ && <ArticleFAQ data={data} />}

      {data.cornerstoneSlug && <ArticleFullGuide data={data} />}

      <ArticleWhatNext data={data} />

      <ArticleRelatedStage data={data} />

      <ArticleAISupport data={data} />

      {showJournal && (
        <JournalPromotion
          contextCopy={
            promoLevel === "strong"
              ? "Capture your experiences alongside your weekly guidance. Keep a thoughtful, private record of your journey."
              : "Keep a record of what this stage feels like, alongside the guidance you're reading."
          }
        />
      )}

      {relatedArticles.length > 0 && (
        <ArticleRelatedReads articles={relatedArticles} />
      )}

      <ArticleJourneyCTA data={data} />
      <Footer />
    </div>
  );
};

export default ArticleLegacyPage;
