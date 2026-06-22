import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import IVFHero from "@/components/ivf/IVFHero";
import IVFPathwayPosition from "@/components/ivf/IVFPathwayPosition";
import IVFWhatThisCovers from "@/components/ivf/IVFWhatThisCovers";
import IVFWhatMakesDifferent from "@/components/ivf/IVFWhatMakesDifferent";
import IVFAISupport from "@/components/ivf/IVFAISupport";
import IVFStages from "@/components/ivf/IVFStages";
import IVFCommonQuestions from "@/components/ivf/IVFCommonQuestions";
import IVFReflection from "@/components/ivf/IVFReflection";
import IVFFinalCTA from "@/components/ivf/IVFFinalCTA";

// IVF hub — premium pass.
// Hero → pathway position → orientation → editorial voice → fast help →
// 3 stage routes → hub-wide common questions → quiet reflection → final CTA.
const IVF = () => {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main>
        <IVFHero />
        <IVFPathwayPosition />
        <IVFWhatThisCovers />
        <IVFWhatMakesDifferent />
        <IVFAISupport />
        <IVFStages />
        <IVFCommonQuestions />
        <IVFReflection />
        <IVFFinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default IVF;
