import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FamilyHero from "@/components/family/FamilyHero";
import FamilyQuickNav from "@/components/family/FamilyQuickNav";
import FamilyAISupport from "@/components/family/FamilyAISupport";
import FamilyToolsResources from "@/components/family/FamilyToolsResources";
import FamilyTopicClusters from "@/components/family/FamilyTopicClusters";
import FamilyCommonQuestions from "@/components/family/FamilyCommonQuestions";
import FamilySupportNote from "@/components/family/FamilySupportNote";
import FamilyPathways from "@/components/family/FamilyPathways";
import SeoHead from "@/components/seo/SeoHead";


const Family = () => {
  return (
    <div className="min-h-screen bg-parchment">
      <SeoHead
        title="Family life guidance for growing families | The Start of You"
        description="Calm, practical guidance for family routines, relationships, safety, travel, play and growing together."
        canonical="https://thestartofyou.com/family"
      />
      <Navbar />
      <main>
        <FamilyHero />
        <FamilyQuickNav />
        <FamilyAISupport />
        <FamilyToolsResources />
        <FamilyTopicClusters />
        <FamilyCommonQuestions />
        <FamilySupportNote />
        <FamilyPathways />
        <FamilyFinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Family;
