import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import DashboardPreviewSection from "@/components/home/DashboardPreviewSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import TimelineSection from "@/components/home/TimelineSection";
import JournalPromotion from "@/components/shared/JournalPromotion";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <DashboardPreviewSection />
        <FeaturesSection />
        <TimelineSection />
        <JournalPromotion />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
