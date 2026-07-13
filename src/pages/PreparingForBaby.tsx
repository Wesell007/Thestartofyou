import SeoHead from "@/components/seo/SeoHead";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PreparingHero from "@/components/preparing/PreparingHero";
import PreparingWhatThisIs from "@/components/preparing/PreparingWhatThisIs";
import PreparingEssentials from "@/components/preparing/PreparingEssentials";
import PreparingOverwhelm from "@/components/preparing/PreparingOverwhelm";
import PreparingApproach from "@/components/preparing/PreparingApproach";
import PreparingCategories from "@/components/preparing/PreparingCategories";
import PreparingCanWait from "@/components/preparing/PreparingCanWait";
import PreparingFeelsLike from "@/components/preparing/PreparingFeelsLike";
import PreparingAISupport from "@/components/preparing/PreparingAISupport";
import PreparingEmotionalReminder from "@/components/preparing/PreparingEmotionalReminder";
import PreparingReflection from "@/components/preparing/PreparingReflection";
import PreparingCapture from "@/components/preparing/PreparingCapture";
import PreparingPathways from "@/components/preparing/PreparingPathways";
import PreparingFinalCTA from "@/components/preparing/PreparingFinalCTA";

const PreparingForBaby = () => {
  return (
    <div className="min-h-screen font-sans">
      <SeoHead
        title="Preparing for Baby | Birth, Home and Newborn Planning"
        description="Practical guidance for preparing for birth, setting up your home, packing a hospital bag and getting ready for your baby's arrival."
        canonical="https://thestartofyou.com/preparing-for-baby"
      />
      <Navbar />
      <main>
        <PreparingHero />
        <PreparingWhatThisIs />
        <PreparingEssentials />
        <PreparingOverwhelm />
        <PreparingApproach />
        <PreparingCategories />
        <PreparingCanWait />
        <PreparingFeelsLike />
        <PreparingAISupport />
        <PreparingEmotionalReminder />
        <PreparingReflection />
        <PreparingCapture />
        <PreparingPathways />
        <PreparingFinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default PreparingForBaby;
