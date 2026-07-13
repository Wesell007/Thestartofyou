import SeoHead from "@/components/seo/SeoHead";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutHero from "@/components/about/AboutHero";
import AboutProblem from "@/components/about/AboutProblem";
import AboutApproach from "@/components/about/AboutApproach";
import AboutEcosystem from "@/components/about/AboutEcosystem";
import AboutAdaptive from "@/components/about/AboutAdaptive";
import AboutJournalConnection from "@/components/about/AboutJournalConnection";
import AboutDifferent from "@/components/about/AboutDifferent";
import AboutMission from "@/components/about/AboutMission";
import AboutCTA from "@/components/about/AboutCTA";

const About = () => {
  return (
    <div className="min-h-screen font-sans">
      <SeoHead
        title="About The Start of You | Calm Support for Parenthood"
        description="Learn about The Start of You, a calm digital companion for pregnancy, parenting, family life and the questions that come with each stage."
        canonical="https://thestartofyou.com/about"
      />
      <Navbar />
      <main>
        <AboutHero />
        <AboutProblem />
        <AboutApproach />
        <AboutEcosystem />
        <AboutAdaptive />
        <AboutJournalConnection />
        <AboutDifferent />
        <AboutMission />
        <AboutCTA />
      </main>
      <Footer />
    </div>
  );
};

export default About;
