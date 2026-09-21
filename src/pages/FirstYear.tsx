import SeoHead from "@/components/seo/SeoHead";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FYHero from "@/components/firstyear/new/FYHero";
import FYWhatThisCovers from "@/components/firstyear/new/FYWhatThisCovers";
import FYTwoTrackEntry from "@/components/firstyear/new/FYTwoTrackEntry";
import FYAISupport from "@/components/firstyear/new/FYAISupport";
import FYPhaseNav from "@/components/firstyear/new/FYPhaseNav";
import FYMonthMap from "@/components/firstyear/new/FYMonthMap";
import FYTopicsParallel from "@/components/firstyear/new/FYTopicClusters";
import FYCommonQuestions from "@/components/firstyear/new/FYCommonQuestions";
import FYReflection from "@/components/firstyear/new/FYReflection";
import FYPathways from "@/components/firstyear/new/FYPathways";
import FYFinalCTA from "@/components/firstyear/new/FYFinalCTA";

/**
 * /first-year — unified First Year ecosystem hub.
 *
 * LOCKED section order: hero, orientation, two pathways, phases, month map,
 * topics, editorial questions, one Companion, quiet continuation, final action.
 *
 * No legacy FirstYear* components render on this route.
 */
const FirstYear = () => {
  return (
    <>
      <SeoHead
        title="First Year Baby Guide | Feeding, Sleep, Development & Recovery"
        description="Calm, practical guidance for your baby's first year, from feeding and sleep to development, care, postnatal recovery and emotional wellbeing."
        canonical="https://thestartofyou.com/first-year"
      />
      <div className="min-h-screen font-sans">
      <Navbar />
      <main>
        <FYHero />
        <FYWhatThisCovers />
        <FYTwoTrackEntry />
        <FYPhaseNav />
        <FYMonthMap />
        <FYTopicsParallel />
        <FYCommonQuestions />
        <FYAISupport />
        <FYReflection />
        <FYPathways />
        <FYFinalCTA />
      </main>
      <Footer />
    </div>
    </>
  );
};

export default FirstYear;
