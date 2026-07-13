import SeoHead from "@/components/seo/SeoHead";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PregnancyHero from "@/components/pregnancy/PregnancyHero";
import PregnancyWhatThisCovers from "@/components/pregnancy/PregnancyWhatThisCovers";
import PregnancyAIPanel from "@/components/pregnancy/PregnancyAIPanel";
import PregnancyTopicMap from "@/components/pregnancy/PregnancyTopicMap";
import PregnancyTrimesterCards from "@/components/pregnancy/PregnancyTrimesterCards";
import WeekByWeek from "@/components/pregnancy/WeekByWeek";
import KeepYourJourney from "@/components/pregnancy/KeepYourJourney";
import PregnancyIVFPathway from "@/components/pregnancy/PregnancyIVFPathway";
import PregnancyCommonQuestions from "@/components/pregnancy/PregnancyCommonQuestions";

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
    <>
      <SeoHead
        title="Pregnancy Guide | Weeks, Trimesters, Symptoms & Support"
        description="Calm, practical pregnancy guidance from early symptoms and week-by-week changes to trimesters, baby development, body changes and emotional support."
        canonical="https://thestartofyou.com/pregnancy"
      />
      <div className="min-h-screen font-sans bg-parchment">
        <Navbar />
      <main>
        {/* 1. Hero */}
        <PregnancyHero />

        {/* 2. What this hub covers */}
        <PregnancyWhatThisCovers />

        {/* 3. AI support */}
        <PregnancyAIPanel />

        <SoftDivider />

        {/* 4. Topic Map */}
        <PregnancyTopicMap />

        {/* 5. Trimester cards */}
        <div data-section="trimesters">
          <PregnancyTrimesterCards />
        </div>

        {/* 6. Week-by-week map */}
        <WeekByWeek />

        {/* 7. IVF connected pathway (optional for those pregnant after IVF) */}
        <PregnancyIVFPathway />

        {/* 8. Common questions */}
        <PregnancyCommonQuestions />

        {/* 9. Journal CTA */}
        <KeepYourJourney />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Pregnancy;

