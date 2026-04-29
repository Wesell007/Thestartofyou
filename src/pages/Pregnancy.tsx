import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PregnancyHero from "@/components/pregnancy/PregnancyHero";
import PregnancyTopicMap from "@/components/pregnancy/PregnancyTopicMap";
import PregnancyAIPanel from "@/components/pregnancy/PregnancyAIPanel";
import PregnancyTrimesterCards from "@/components/pregnancy/PregnancyTrimesterCards";
import WeekByWeek from "@/components/pregnancy/WeekByWeek";
import KeepYourJourney from "@/components/pregnancy/KeepYourJourney";

const Pregnancy = () => {
  return (
    <div className="min-h-screen font-sans bg-parchment">
      <Navbar />
      <main>
        {/* 1. Hero — editorial + due date card */}
        <PregnancyHero />

        {/* 2. The Pregnancy Guide — six topic cards */}
        <PregnancyTopicMap />

        {/* 3. AI support panel */}
        <PregnancyAIPanel />

        {/* 4. Trimester pathway cards */}
        <div data-section="trimesters">
          <PregnancyTrimesterCards />
        </div>

        {/* 5. Week-by-week pregnancy map (uses existing fruit illustrations) */}
        <WeekByWeek />

        {/* 6. Journal CTA */}
        <KeepYourJourney />
      </main>
      <Footer />
    </div>
  );
};

export default Pregnancy;
