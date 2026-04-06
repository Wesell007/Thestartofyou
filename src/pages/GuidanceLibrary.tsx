import { useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GuidanceHero from "@/components/guidance/GuidanceHero";
import GuidanceFeaturedGuides from "@/components/guidance/GuidanceFeaturedGuides";
import GuidanceEditorialBreak from "@/components/guidance/GuidanceEditorialBreak";
import GuidanceTopicSections from "@/components/guidance/GuidanceTopicSections";
import GuidancePopularQuestions from "@/components/guidance/GuidancePopularQuestions";
import GuidanceCompareGuides from "@/components/guidance/GuidanceCompareGuides";
import GuidanceBrowseAll from "@/components/guidance/GuidanceBrowseAll";
import GuidanceAIBridge from "@/components/guidance/GuidanceAIBridge";
import GuidanceJourneyPathways from "@/components/guidance/GuidanceJourneyPathways";
import { getCornerstoneArticles } from "@/data/articleData";

const GuidanceLibrary = () => {
  const cornerstones = useMemo(() => getCornerstoneArticles(), []);

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />

      <main>
        {/* 1. Cinematic hero with image */}
        <GuidanceHero />
        {/* 2. Featured cornerstone guides with images */}
        <GuidanceFeaturedGuides articles={cornerstones} />
        {/* 3. Editorial interstitial — warmth + voice */}
        <GuidanceEditorialBreak />
        {/* 4. Topic sections with alternating image/content cards */}
        <GuidanceTopicSections />
        {/* 5. Popular questions — split image + numbered list */}
        <GuidancePopularQuestions />
        {/* 6. Compare guides — visual accent cards */}
        <GuidanceCompareGuides />
        {/* 7. AI bridge — dark cinematic CTA */}
        <GuidanceAIBridge />
        {/* 8. Journey pathways — image grid */}
        <GuidanceJourneyPathways />
        {/* 9. Browse all — filterable article index */}
        <GuidanceBrowseAll />
      </main>

      <Footer />
    </div>
  );
};

export default GuidanceLibrary;
