import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutHero from "@/components/about/AboutHero";
import AboutProblem from "@/components/about/AboutProblem";
import AboutApproach from "@/components/about/AboutApproach";
import AboutEcosystem from "@/components/about/AboutEcosystem";
import AboutDifferent from "@/components/about/AboutDifferent";
import AboutAdaptive from "@/components/about/AboutAdaptive";
import AboutMission from "@/components/about/AboutMission";
import AboutCTA from "@/components/about/AboutCTA";

const About = () => {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main>
        <AboutHero />
        <AboutProblem />
        <AboutApproach />
        <AboutEcosystem />
        <AboutDifferent />
        <AboutAdaptive />
        <AboutMission />
        <AboutCTA />
      </main>
      <Footer />
    </div>
  );
};

export default About;
