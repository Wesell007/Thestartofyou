import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NewHeroSection from "@/components/home/NewHeroSection";
import ValueProofSection from "@/components/home/ValueProofSection";
import JourneyBrandedSection from "@/components/home/JourneyBrandedSection";
import DashboardGlimpse from "@/components/home/DashboardGlimpse";
import JournalMoment from "@/components/home/JournalMoment";

const Index = () => {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main>
        <NewHeroSection />
        <ValueProofSection />
        <JourneyBrandedSection />
        <DashboardGlimpse />
        <JournalMoment />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
