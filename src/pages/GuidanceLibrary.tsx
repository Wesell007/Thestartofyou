import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GuidanceHero from "@/components/guidance/GuidanceHero";
import GuidanceStageCarousels from "@/components/guidance/GuidanceStageCarousels";
import GuidanceAIBridge from "@/components/guidance/GuidanceAIBridge";

const GuidanceLibrary = () => {
  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />

      <main>
        {/* 1. Cinematic hero — kept */}
        <GuidanceHero />
        {/* 2. Stage-grouped carousels with topic chips */}
        <GuidanceStageCarousels />
        {/* 3. AI bridge CTA */}
        <GuidanceAIBridge />
      </main>

      <Footer />
    </div>
  );
};

export default GuidanceLibrary;
