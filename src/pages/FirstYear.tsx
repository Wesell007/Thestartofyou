import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FYHero from "@/components/firstyear/new/FYHero";
import FYStickyTrackNav from "@/components/firstyear/new/FYStickyTrackNav";
import FYWhatThisCovers from "@/components/firstyear/new/FYWhatThisCovers";
import FYTwoTrackEntry from "@/components/firstyear/new/FYTwoTrackEntry";
import FYAISupport from "@/components/firstyear/new/FYAISupport";
import FYPhaseNav from "@/components/firstyear/new/FYPhaseNav";
import { FYBabyTopics, FYRecoveryTopics } from "@/components/firstyear/new/FYTopicClusters";
import FYCommonQuestions from "@/components/firstyear/new/FYCommonQuestions";
import FYMedicallyReviewed from "@/components/firstyear/new/FYMedicallyReviewed";
import FYReflection from "@/components/firstyear/new/FYReflection";
import FYPathways from "@/components/firstyear/new/FYPathways";
import FYFinalCTA from "@/components/firstyear/new/FYFinalCTA";

// Step 2: unified First Year ecosystem hub.
// Two equal tracks — Baby's first year + Your postpartum recovery — in one premium parent surface.
const FirstYear = () => {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main>
        <FYHero />
        <FYStickyTrackNav />
        <FYWhatThisCovers />
        <FYTwoTrackEntry />
        <FYAISupport />
        <FYPhaseNav />
        <FYBabyTopics />
        <FYRecoveryTopics />
        <FYCommonQuestions />
        <FYMedicallyReviewed />
        <FYReflection />
        <FYPathways />
        <FYFinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default FirstYear;
