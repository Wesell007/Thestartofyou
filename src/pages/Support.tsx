import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SupportHero from "@/components/support/SupportHero";
import SupportReassurance from "@/components/support/SupportReassurance";
import SupportWhatThisIs from "@/components/support/SupportWhatThisIs";
import SupportNoRightWords from "@/components/support/SupportNoRightWords";
import SupportHowThisFeels from "@/components/support/SupportHowThisFeels";
import SupportStartHere from "@/components/support/SupportStartHere";
import SupportWhatFeeling from "@/components/support/SupportWhatFeeling";
import SupportEnoughToAsk from "@/components/support/SupportEnoughToAsk";
import SupportWhatItLooksLike from "@/components/support/SupportWhatItLooksLike";
import SupportSeekMore from "@/components/support/SupportSeekMore";
import SupportAISupport from "@/components/support/SupportAISupport";
import SupportEmotionalReminder from "@/components/support/SupportEmotionalReminder";
import SupportReflection from "@/components/support/SupportReflection";
import SupportCapture from "@/components/support/SupportCapture";
import SupportPathways from "@/components/support/SupportPathways";
import SupportFinalCTA from "@/components/support/SupportFinalCTA";

const Support = () => {
  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />
      <SupportHero />
      <SupportReassurance />
      <SupportWhatThisIs />
      <SupportNoRightWords />
      <SupportHowThisFeels />
      <SupportStartHere />
      <SupportWhatFeeling />
      <SupportEnoughToAsk />
      <SupportWhatItLooksLike />
      <SupportSeekMore />
      <SupportAISupport />
      <SupportEmotionalReminder />
      <SupportReflection />
      <SupportCapture />
      <SupportPathways />
      <SupportFinalCTA />
      <Footer />
    </div>
  );
};

export default Support;
