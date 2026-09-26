import SeoHead from "@/components/seo/SeoHead";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  AboutHero,
  AboutWhy,
  AboutToday,
  AboutPhilosophy,
  AboutSystem,
  AboutFuture,
  AboutJournal,
  AboutLimits,
  AboutPromise,
  AboutFinalCTA,
} from "@/components/about/AboutStory";

const About = () => {
  return (
    <div className="min-h-screen font-sans">
      <SeoHead
        title="About The Start of You | Calm Support for Parenthood"
        description="Why The Start of You exists, what it offers today, and the calmer, more connected support for family life we are building toward."
        canonical="https://thestartofyou.com/about"
      />
      <Navbar />
      <main>
        <AboutHero />
        <AboutWhy />
        <AboutToday />
        <AboutPhilosophy />
        <AboutSystem />
        <AboutFuture />
        <AboutJournal />
        <AboutLimits />
        <AboutPromise />
        <AboutFinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default About;
