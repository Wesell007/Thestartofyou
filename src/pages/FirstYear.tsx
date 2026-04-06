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
        <FirstYearHero />
        <FirstYearWhatThisIs />
        <FirstYearStages />
        <FirstYearFocus />
        <FirstYearWhatToExpect />
        <FirstYearChallenging />
        <FirstYearProgression />
        <FirstYearNormal />
        <FirstYearCommonQuestions />
        <FirstYearEmotionalReminder />
        <FirstYearReflection />
        <FirstYearCapture />
        <FirstYearPathways />
        <FirstYearFinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default FirstYear;
