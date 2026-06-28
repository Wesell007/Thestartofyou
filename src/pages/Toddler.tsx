import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ToddlerHero from "@/components/toddler/ToddlerHero";
import ToddlerAgeNav from "@/components/toddler/ToddlerAgeNav";
import ToddlerWhatThisCovers from "@/components/toddler/ToddlerWhatThisCovers";
import ToddlerToolsResources from "@/components/toddler/ToddlerToolsResources";
import ToddlerTopicClusters from "@/components/toddler/ToddlerTopicClusters";
import ToddlerAISupport from "@/components/toddler/ToddlerAISupport";
import ToddlerCommonQuestions from "@/components/toddler/ToddlerCommonQuestions";
import ToddlerReflection from "@/components/toddler/ToddlerReflection";
import ToddlerPathways from "@/components/toddler/ToddlerPathways";
import ToddlerFinalCTA from "@/components/toddler/ToddlerFinalCTA";

const Toddler = () => {
  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />
      <main>
        <ToddlerHero />
        <ToddlerAgeNav />
        <ToddlerAISupport />
        <ToddlerWhatThisCovers />
        <ToddlerToolsResources />
        <ToddlerTopicClusters />
        <ToddlerCommonQuestions />
        <ToddlerReflection />
        <ToddlerPathways />
        <ToddlerFinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Toddler;
