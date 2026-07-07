import SeoHead from "@/components/seo/SeoHead";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FYHero from "@/components/firstyear/new/FYHero";
import FYStickyTrackNav from "@/components/firstyear/new/FYStickyTrackNav";
import FYWhatThisCovers from "@/components/firstyear/new/FYWhatThisCovers";
import FYAISupport from "@/components/firstyear/new/FYAISupport";
import FYPhaseNav from "@/components/firstyear/new/FYPhaseNav";
import FYTopicsParallel from "@/components/firstyear/new/FYTopicClusters";
import FYCommonQuestions from "@/components/firstyear/new/FYCommonQuestions";
import FYMedicallyReviewed from "@/components/firstyear/new/FYMedicallyReviewed";
import FYReflection from "@/components/firstyear/new/FYReflection";
import FYPathways from "@/components/firstyear/new/FYPathways";
import FYFinalCTA from "@/components/firstyear/new/FYFinalCTA";

/**
 * /first-year — unified First Year ecosystem hub.
 *
 * LOCKED section order (do not reorder without product sign-off):
 *   1.  FYHero               — dual-band hero
 *   2.  FYStickyTrackNav     — mobile-only Baby / Recovery anchors
 *   3.  FYTwoTrackEntry      — equal cards, promoted directly after hero
 *   4.  FYWhatThisCovers     — bridging strip (two short columns)
 *   5.  FYAISupport          — neutral parchment, dual-band header
 *   6.  FYPhaseNav           — dual-tint phase cards
 *   7.  FYTopicsParallel     — Baby + Recovery topics, side-by-side at md+
 *   8.  FYCommonQuestions    — per-row track tint
 *   9.  FYMedicallyReviewed  — quiet trust strip
 *   10. FYReflection         — slim italic beat
 *   11. FYPathways           — dual-tone gradient
 *   12. FYFinalCTA           — dual mini CTAs on dual-tone gradient
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
        <FYStickyTrackNav />
        <FYWhatThisCovers />
        <FYAISupport />
        <FYPhaseNav />
        <FYTopicsParallel />
        <FYCommonQuestions />
        <FYMedicallyReviewed />
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
