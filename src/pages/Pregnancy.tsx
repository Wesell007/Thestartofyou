import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PregnancyHero from "@/components/pregnancy/PregnancyHero";
import WhatThisJourneyIs from "@/components/pregnancy/WhatThisJourneyIs";
import FocusRightNow from "@/components/pregnancy/FocusRightNow";
import WhatToExpect from "@/components/pregnancy/WhatToExpect";
import WhatMakesDifferent from "@/components/pregnancy/WhatMakesDifferent";
import PregnancyTimeline from "@/components/pregnancy/PregnancyTimeline";
import WeekByWeek from "@/components/pregnancy/WeekByWeek";
import CommonQuestions from "@/components/pregnancy/CommonQuestions";
import PregnancyAISupport from "@/components/pregnancy/PregnancyAISupport";
import EmotionalReminder from "@/components/pregnancy/EmotionalReminder";
import ReflectionSection from "@/components/pregnancy/ReflectionSection";
import JournalPromotion from "@/components/shared/JournalPromotion";
import PregnancyFinalCTA from "@/components/pregnancy/PregnancyFinalCTA";

const Pregnancy = () => {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main>
        {/* 1. Hero, orientation */}
        <PregnancyHero />

        {/* 2. What this journey is */}
        <WhatThisJourneyIs />

        {/* 3. What to focus on right now */}
        <FocusRightNow />

        {/* 4. What to expect, body, baby, emotions, uncertainty */}
        <WhatToExpect />

        {/* 5. What makes this journey different */}
        <WhatMakesDifferent />

        {/* 6. Pregnancy timeline, visual system */}
        <PregnancyTimeline />

        {/* 7. Week-by-week navigation */}
        <WeekByWeek />

        {/* 8. Common questions */}
        <CommonQuestions />

        {/* 9. AI support */}
        <PregnancyAISupport />

        {/* 10. Emotional reminder */}
        <EmotionalReminder />

        {/* 11. Reflection prompt */}
        <ReflectionSection />

        {/* 12. Journal companion */}
        <JournalPromotion />

        {/* 13. Final CTA */}
        <PregnancyFinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Pregnancy;
