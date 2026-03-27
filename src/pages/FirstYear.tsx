import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FirstYearHero from "@/components/firstyear/FirstYearHero";
import FirstYearWhatThisIs from "@/components/firstyear/FirstYearWhatThisIs";
import FirstYearStages from "@/components/firstyear/FirstYearStages";
import FirstYearFocus from "@/components/firstyear/FirstYearFocus";
import FirstYearWhatToExpect from "@/components/firstyear/FirstYearWhatToExpect";
import FirstYearChallenging from "@/components/firstyear/FirstYearChallenging";
import FirstYearProgression from "@/components/firstyear/FirstYearProgression";
import FirstYearNormal from "@/components/firstyear/FirstYearNormal";
import FirstYearCommonQuestions from "@/components/firstyear/FirstYearCommonQuestions";
import FirstYearAISupport from "@/components/firstyear/FirstYearAISupport";
import FirstYearEmotionalReminder from "@/components/firstyear/FirstYearEmotionalReminder";
import FirstYearReflection from "@/components/firstyear/FirstYearReflection";
import FirstYearCapture from "@/components/firstyear/FirstYearCapture";
import FirstYearPathways from "@/components/firstyear/FirstYearPathways";
import FirstYearFinalCTA from "@/components/firstyear/FirstYearFinalCTA";

const FirstYear = () => {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main>
        {/* 1. Hero */}
        <FirstYearHero />

        {/* 2. What this stage is */}
        <FirstYearWhatThisIs />

        {/* 3. Stages of the first year */}
        <FirstYearStages />

        {/* 4. What to focus on right now */}
        <FirstYearFocus />

        {/* 5. What to expect — baby, daily life, emotional, change */}
        <FirstYearWhatToExpect />

        {/* 6. What can feel challenging + mental load */}
        <FirstYearChallenging />

        {/* 7. How this stage evolves */}
        <FirstYearProgression />

        {/* 8. What's normal + when to seek support */}
        <FirstYearNormal />

        {/* 9. Common questions */}
        <FirstYearCommonQuestions />

        {/* 10. AI support */}
        <FirstYearAISupport />

        {/* 11. Emotional reminder */}
        <FirstYearEmotionalReminder />

        {/* 12. Reflection prompt */}
        <FirstYearReflection />


        {/* 14. Pathways */}
        <FirstYearPathways />

        {/* 15. Final CTA */}
        <FirstYearFinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default FirstYear;
