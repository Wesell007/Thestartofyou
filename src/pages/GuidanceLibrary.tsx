import { useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GuidanceHero from "@/components/guidance/GuidanceHero";
import GuidanceFeaturedGuides from "@/components/guidance/GuidanceFeaturedGuides";
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
        <GuidanceHero />
        <GuidanceFeaturedGuides articles={cornerstones} />
        <GuidanceTopicSections />
        <GuidancePopularQuestions />
        <GuidanceCompareGuides />
        <GuidanceBrowseAll />
        <GuidanceAIBridge />
        <GuidanceJourneyPathways />
      </main>

      <Footer />
    </div>
  );
};

export default GuidanceLibrary;
