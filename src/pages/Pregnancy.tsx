import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PregnancyHero from "@/components/pregnancy/PregnancyHero";
import PregnancyTopicMap from "@/components/pregnancy/PregnancyTopicMap";
import PregnancyAIPanel from "@/components/pregnancy/PregnancyAIPanel";
import PregnancyTrimesterCards from "@/components/pregnancy/PregnancyTrimesterCards";
import WeekByWeek from "@/components/pregnancy/WeekByWeek";
import KeepYourJourney from "@/components/pregnancy/KeepYourJourney";

const SoftDivider = () => (
  <div aria-hidden="true" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
    <div
      className="h-px w-full"
      style={{
        background:
          'linear-gradient(90deg, transparent 0%, hsl(var(--stage-pregnancy-accent) / 0.18) 50%, transparent 100%)',
      }}
    />
  </div>
);

const Pregnancy = () => {
  return (
    <div className="min-h-screen font-sans bg-parchment">
      <Navbar />
      <main>
        {/* 1. Hero */}
        <PregnancyHero />

        {/* 2. Topic Map */}
        <PregnancyTopicMap />

        <SoftDivider />

        {/* 3. AI support */}
        <PregnancyAIPanel />

        <SoftDivider />

        {/* 4. Trimester cards */}
        <div data-section="trimesters">
          <PregnancyTrimesterCards />
        </div>

        {/* 5. Week-by-week map */}
        <WeekByWeek />

        {/* 6. Journal CTA */}
        <KeepYourJourney />
      </main>
      <Footer />
    </div>
  );
};

export default Pregnancy;

