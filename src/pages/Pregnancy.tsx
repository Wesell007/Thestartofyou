import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PregnancyHero from "@/components/pregnancy/PregnancyHero";
import WhatThisJourneyIs from "@/components/pregnancy/WhatThisJourneyIs";
import PregnancyTimeline from "@/components/pregnancy/PregnancyTimeline";
import WeekByWeek from "@/components/pregnancy/WeekByWeek";
import WhatToExpect from "@/components/pregnancy/WhatToExpect";
import GuidanceAndQuestions from "@/components/pregnancy/GuidanceAndQuestions";
import KeepYourJourney from "@/components/pregnancy/KeepYourJourney";
import PregnancyFinalCTA from "@/components/pregnancy/PregnancyFinalCTA";

const Pregnancy = () => {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main>
        {/* 1. Hero — orientation + due-date entry */}
        <PregnancyHero />

        {/* 2. What this journey is — single tightened orientation block */}
        <WhatThisJourneyIs />

        {/* 3. Pregnancy timeline — primary (trimesters) */}
        <div data-section="trimesters">
          <PregnancyTimeline />
        </div>

        {/* 4. Week-by-week — secondary deep navigation */}
        <WeekByWeek />

        {/* 5. What to expect */}
        <WhatToExpect />

        {/* 6. Guidance & questions — merged questions + AI */}
        <GuidanceAndQuestions />

        {/* 7. Keep your journey — merged reflection + journal */}
        <KeepYourJourney />

        {/* 8. Final CTA — restate due-date primary */}
        <PregnancyFinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Pregnancy;
