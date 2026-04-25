import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NewHeroSection from "@/components/home/NewHeroSection";
import ValueProofSection from "@/components/home/ValueProofSection";
import JourneyBrandedSection from "@/components/home/JourneyBrandedSection";
import DashboardGlimpse from "@/components/home/DashboardGlimpse";
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
      <Navbar />
      <main>
        <NewHeroSection />
        <ValueProofSection />
        <JourneyBrandedSection />
        <DashboardGlimpse />
        <LifecycleEcosystemSection />
        <JournalMoment />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
