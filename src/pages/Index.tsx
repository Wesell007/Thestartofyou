import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NewHeroSection from "@/components/home/NewHeroSection";
import LightJourneyEntry from "@/components/home/LightJourneyEntry";
import ValueProofSection from "@/components/home/ValueProofSection";
import JournalMoment from "@/components/home/JournalMoment";

const Index = () => {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main>
        <NewHeroSection />
        <LightJourneyEntry />
        <ValueProofSection />
        <JournalMoment />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
