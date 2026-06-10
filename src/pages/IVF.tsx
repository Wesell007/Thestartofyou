import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import IVFHero from "@/components/ivf/IVFHero";
import IVFWhatThisCovers from "@/components/ivf/IVFWhatThisCovers";
import IVFAISupport from "@/components/ivf/IVFAISupport";
import IVFStages from "@/components/ivf/IVFStages";
import IVFFinalCTA from "@/components/ivf/IVFFinalCTA";

// IVF hub is now a parent surface only:
// Hero → orientation → fast help → 3 stage routes → final CTA.
// Deeper editorial, normal/seek-support, capture, pathways, and
// common questions live on the stage topic pages where they belong.
const IVF = () => {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main>
        <IVFHero />
        <IVFWhatThisCovers />
        <IVFAISupport />
        <IVFStages />
        <IVFFinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default IVF;
