import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ExploreHero from "@/components/explore/ExploreHero";
import StageNavSection from "@/components/explore/StageNavSection";
import ContinueJourneySection from "@/components/explore/ContinueJourneySection";
import QuickActionsSection from "@/components/explore/QuickActionsSection";
import GuidanceSection from "@/components/explore/GuidanceSection";
import AIReassuranceSection from "@/components/explore/AIReassuranceSection";
import BrandPositioningSection from "@/components/explore/BrandPositioningSection";
import JournalPromotion from "@/components/shared/JournalPromotion";

// Temporarily simulate logged-out state, replace with real auth context when available
const isLoggedIn = false;

const Explore = () => {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main>
        {/* 1. Entry point, search + AI bar */}
        <ExploreHero />

        {/* 2. Core stage navigation, dominates the page */}
        <StageNavSection />

        {/* 3. Personalised continue block (only if logged in) */}
        <ContinueJourneySection
          isLoggedIn={isLoggedIn}
          currentStage="Week 12"
          stageDetail="You're in your first trimester. Your week-by-week guide is ready."
        />

        {/* 4. Utility tools strip */}
        <QuickActionsSection />

        {/* 5. Curated guidance, secondary, not a feed */}
        <GuidanceSection />

        {/* 6. AI reassurance nudge */}
        <AIReassuranceSection />

        {/* 7. Journal companion */}
        <JournalPromotion contextCopy="Keep a thoughtful, private record of your journey with The Start of You journal." />

        {/* 8. Brand positioning / trust */}
        <BrandPositioningSection />
      </main>
      <Footer />
    </div>
  );
};

export default Explore;
