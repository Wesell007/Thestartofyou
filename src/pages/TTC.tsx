import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TTCHero from "@/components/ttc/TTCHero";
import TTCWhatThisIs from "@/components/ttc/TTCWhatThisIs";
import TTCStages from "@/components/ttc/TTCStages";
import TTCFocus from "@/components/ttc/TTCFocus";
import TTCWhatToExpect from "@/components/ttc/TTCWhatToExpect";
import TTCWhatMakesDifferent from "@/components/ttc/TTCWhatMakesDifferent";
import TTCCommonQuestions from "@/components/ttc/TTCCommonQuestions";
import TTCAISupport from "@/components/ttc/TTCAISupport";
import TTCEmotionalReminder from "@/components/ttc/TTCEmotionalReminder";
import TTCReflection from "@/components/ttc/TTCReflection";

import TTCPathways from "@/components/ttc/TTCPathways";
import TTCFinalCTA from "@/components/ttc/TTCFinalCTA";

const TTC = () => {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main>
        {/* 1. Hero — orientation */}
        <TTCHero />

        {/* 2. What this journey is */}
        <TTCWhatThisIs />

        {/* 3. Stages of trying to conceive */}
        <TTCStages />

        {/* 4. What to focus on right now */}
        <TTCFocus />

        {/* 5. What to expect — body, timing, emotionally, waiting */}
        <TTCWhatToExpect />

        {/* 6. What makes this journey different */}
        <TTCWhatMakesDifferent />

        {/* 7. Common questions */}
        <TTCCommonQuestions />

        {/* 8. AI support */}
        <TTCAISupport />

        {/* 9. Emotional reminder */}
        <TTCEmotionalReminder />

        {/* 10. Reflection prompt */}
        <TTCReflection />


        {/* 12. Pathways — system connections */}
        <TTCPathways />

        {/* 13. Final CTA */}
        <TTCFinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default TTC;
