import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TrimesterHero from "@/components/trimester/TrimesterHero";
import TrimesterAbout from "@/components/trimester/TrimesterAbout";
import TrimesterExpect from "@/components/trimester/TrimesterExpect";
import TrimesterDifficulties from "@/components/trimester/TrimesterDifficulties";
import TrimesterNormal from "@/components/trimester/TrimesterNormal";
import TrimesterFocus from "@/components/trimester/TrimesterFocus";
import TrimesterWeeks from "@/components/trimester/TrimesterWeeks";
import TrimesterQuestions from "@/components/trimester/TrimesterQuestions";
import TrimesterEmotional from "@/components/trimester/TrimesterEmotional";
import TrimesterAISupport from "@/components/trimester/TrimesterAISupport";
import JournalPromotion from "@/components/shared/JournalPromotion";
import TrimesterFinalCTA from "@/components/trimester/TrimesterFinalCTA";
import { thirdTrimester } from "@/data/trimesterData";

const ThirdTrimester = () => {
  const data = thirdTrimester;
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main>
        {/* 1. Hero */}
        <TrimesterHero data={data} />

        {/* 2. What this stage is */}
        <TrimesterAbout data={data} bg="bg-lavender-section" />

        {/* 3. What to expect */}
        <TrimesterExpect data={data} bg="bg-parchment" />

        {/* 4. What can feel difficult */}
        <TrimesterDifficulties data={data} bg="bg-lavender-section" />

        {/* 5. What's normal */}
        <TrimesterNormal data={data} bg="bg-parchment" />

        {/* 6. What to focus on */}
        <TrimesterFocus data={data} bg="bg-lavender-section" />

        {/* 7. Week-by-week navigation */}
        <TrimesterWeeks data={data} bg="bg-parchment-dark" />

        {/* 8. Common questions */}
        <TrimesterQuestions data={data} bg="bg-lavender-section" />

        {/* 9. AI support */}
        <TrimesterAISupport data={data} bg="bg-parchment" />

        {/* 10. Emotional moment */}
        <TrimesterEmotional data={data} bg="bg-lavender-section" />

        {/* 11. Journal companion */}
        <JournalPromotion />

        {/* 12. Final CTA */}
        <TrimesterFinalCTA data={data} />
      </main>
      <Footer />
    </div>
  );
};

export default ThirdTrimester;
