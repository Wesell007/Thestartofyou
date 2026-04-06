import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import IVFHero from "@/components/ivf/IVFHero";
import IVFWhatThisIs from "@/components/ivf/IVFWhatThisIs";
import IVFStages from "@/components/ivf/IVFStages";
import IVFFocus from "@/components/ivf/IVFFocus";
import IVFWhatToExpect from "@/components/ivf/IVFWhatToExpect";
import IVFWhatMakesDifferent from "@/components/ivf/IVFWhatMakesDifferent";
import IVFNormal from "@/components/ivf/IVFNormal";
import IVFCommonQuestions from "@/components/ivf/IVFCommonQuestions";
import IVFEmotionalReminder from "@/components/ivf/IVFEmotionalReminder";
import IVFReflection from "@/components/ivf/IVFReflection";
import IVFCapture from "@/components/ivf/IVFCapture";
import IVFPathways from "@/components/ivf/IVFPathways";
import IVFFinalCTA from "@/components/ivf/IVFFinalCTA";

const IVF = () => {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main>
        <IVFHero />
        <IVFWhatThisIs />
        <IVFStages />
        <IVFFocus />
        <IVFWhatToExpect />
        <IVFWhatMakesDifferent />
        <IVFNormal />
        <IVFCommonQuestions />
        <IVFEmotionalReminder />
        <IVFReflection />
        <IVFCapture />
        <IVFPathways />
        <IVFFinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default IVF;
