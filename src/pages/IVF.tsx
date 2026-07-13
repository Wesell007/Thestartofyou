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
import SeoHead from "@/components/seo/SeoHead";

// IVF hub — premium pass.
// Hero → pathway position → orientation → editorial voice → fast help →
// 3 stage routes → hub-wide common questions → quiet reflection → final CTA.
const IVF = () => {
  return (
    <div className="min-h-screen font-sans">
      <SeoHead
        title="IVF Guide | Treatment, Transfer, Two-Week Wait & Support"
        description="Calm, practical IVF guidance for treatment timelines, embryo transfer, the two-week wait, early pregnancy after IVF and emotional support."
        canonical="https://thestartofyou.com/ivf"
      />
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
