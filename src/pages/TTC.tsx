import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SeoHead from "@/components/seo/SeoHead";
import TTCHero from "@/components/ttc/TTCHero";
import TTCWhatThisCovers from "@/components/ttc/TTCWhatThisCovers";
import TTCStages from "@/components/ttc/TTCStages";
import TTCFocus from "@/components/ttc/TTCFocus";
import TTCWhatMakesDifferent from "@/components/ttc/TTCWhatMakesDifferent";
import TTCCommonQuestions from "@/components/ttc/TTCCommonQuestions";
import TTCAISupport from "@/components/ttc/TTCAISupport";
import TTCEmotionalReminder from "@/components/ttc/TTCEmotionalReminder";
import TTCReflection from "@/components/ttc/TTCReflection";
import TTCCapture from "@/components/ttc/TTCCapture";
import TTCPathways from "@/components/ttc/TTCPathways";
import TTCFinalCTA from "@/components/ttc/TTCFinalCTA";

const TTC = () => {
  return (
    <div className="min-h-screen font-sans">
      {/* Retained legacy hub: kept for reference, never indexed, and no
          canonical so it cannot compete with /trying-to-conceive. */}
      <SeoHead
        title="Trying to conceive (legacy) | The Start of You"
        description="A retained earlier version of the trying to conceive hub from The Start of You."
        noindex
      />
      <Navbar />
      <main>

        {/* 1. Hero — tool-first with calculator + common questions */}
        <TTCHero />

        {/* 2. What this hub covers — premium single-card overview */}
        <TTCWhatThisCovers />

        {/* 3. Three stages — premium stage map with inline child links */}
        <TTCStages />

        {/* 4. What to focus on right now */}
        <TTCFocus />

        {/* 5. A different kind of guide — quiet italic interlude */}
        <TTCWhatMakesDifferent />

        {/* 6. AI support — calm, useful, centred */}
        <TTCAISupport />

        {/* 7. Common questions */}
        <TTCCommonQuestions />

        {/* 8. Emotional reminder */}
        <TTCEmotionalReminder />

        {/* 9. Reflection prompt */}
        <TTCReflection />

        {/* 10. Capture / journal companion */}
        <TTCCapture />

        {/* 11. Pathways */}
        <TTCPathways />

        {/* 12. Final CTA */}
        <TTCFinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default TTC;
