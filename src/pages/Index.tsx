import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NewHeroSection from "@/components/home/NewHeroSection";
import ValueProofSection from "@/components/home/ValueProofSection";
import JourneyEntrySection from "@/components/home/JourneyEntrySection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main>
        <NewHeroSection />
        <ValueProofSection />
        <JourneyEntrySection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
