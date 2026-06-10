import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import IVFHero from "@/components/ivf/IVFHero";
import IVFWhatThisCovers from "@/components/ivf/IVFWhatThisCovers";
import IVFAISupport from "@/components/ivf/IVFAISupport";
import IVFWhatThisIs from "@/components/ivf/IVFWhatThisIs";
import IVFStages from "@/components/ivf/IVFStages";
import IVFWhatToExpect from "@/components/ivf/IVFWhatToExpect";
import IVFNormal from "@/components/ivf/IVFNormal";
import IVFCommonQuestions from "@/components/ivf/IVFCommonQuestions";
import IVFCapture from "@/components/ivf/IVFCapture";
import IVFPathways from "@/components/ivf/IVFPathways";
import IVFFinalCTA from "@/components/ivf/IVFFinalCTA";

const IVF = () => {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main>
        {/* 1. Hero */}
        <IVFHero />
        {/* 2. What this hub covers — high up */}
        <IVFWhatThisCovers />
        {/* 3. AI support — immediate help */}
        <IVFAISupport />
        {/* 4. Stages — the core routes, surfaced early */}
        <IVFStages />
        {/* 5. About this journey (merged: editorial + 4 expectation cards) */}
        <IVFWhatThisIs />
        <IVFWhatToExpect />
        {/* 6. Reassurance: what's normal / when to seek support */}
        <IVFNormal />
        {/* 7. Common questions */}
        <IVFCommonQuestions />
        {/* 8. Capture + where to next (compact end-cap) */}
        <IVFCapture />
        <IVFPathways />
        {/* 9. Final CTA */}
        <IVFFinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default IVF;
