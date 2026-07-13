import { useEffect } from "react";
import SeoHead from "@/components/seo/SeoHead";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NewHeroSection from "@/components/home/NewHeroSection";
import ValueProofSection from "@/components/home/ValueProofSection";
import JourneyBrandedSection from "@/components/home/JourneyBrandedSection";
import JourneyPreviewSection from "@/components/home/JourneyPreviewSection";
import LifecycleEcosystemSection from "@/components/home/LifecycleEcosystemSection";
import JournalMoment from "@/components/home/JournalMoment";
import { trackEvent } from "@/lib/analytics";
import { EVENTS } from "@/lib/analyticsEvents";

const Index = () => {
  useEffect(() => {
    trackEvent(EVENTS.HOME_VIEWED);
  }, []);
  return (
    <div className="min-h-screen font-sans">
      <SeoHead
        title="The Start of You | Calm Guidance for Pregnancy and Parenthood"
        description="A calm companion for trying to conceive, pregnancy, baby's first year, toddlerhood and family life, with practical guidance and gentle support."
        canonical="https://thestartofyou.com/"
      />
      <Navbar />
      <main>
        <NewHeroSection />
        <ValueProofSection />
        <JourneyBrandedSection />
        <JourneyPreviewSection />
        <LifecycleEcosystemSection />
        <JournalMoment />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
