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
        title="The Start of You | TTC, Pregnancy & First Year"
        description="Personalised guidance, journalling and a companion for trying to conceive, pregnancy and your baby's first year."
        canonical="https://thestartofyou.com/"
        ogTitle="The Start of You | TTC, Pregnancy & First Year"
        ogDescription="Personalised guidance, journalling and a companion for trying to conceive, pregnancy and your baby's first year."
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
