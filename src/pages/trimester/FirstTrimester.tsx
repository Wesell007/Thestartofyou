import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TrimesterHero from "@/components/trimester/TrimesterHero";
import TrimesterOnThisPage from "@/components/trimester/TrimesterOnThisPage";
import TrimesterAbout from "@/components/trimester/TrimesterAbout";
import TrimesterExpect from "@/components/trimester/TrimesterExpect";
import TrimesterBigChanges from "@/components/trimester/TrimesterBigChanges";
import TrimesterDifficulties from "@/components/trimester/TrimesterDifficulties";
import TrimesterNormal from "@/components/trimester/TrimesterNormal";
import TrimesterFocus from "@/components/trimester/TrimesterFocus";
import TrimesterWeeks from "@/components/trimester/TrimesterWeeks";
import TrimesterRelatedGuidance from "@/components/trimester/TrimesterRelatedGuidance";
import TrimesterTopicConnection from "@/components/trimester/TrimesterTopicConnection";
import TrimesterQuestions from "@/components/trimester/TrimesterQuestions";
import TrimesterEmotional from "@/components/trimester/TrimesterEmotional";
import TrimesterAISupport from "@/components/trimester/TrimesterAISupport";
import JournalPromotion from "@/components/shared/JournalPromotion";
import TrimesterFinalCTA from "@/components/trimester/TrimesterFinalCTA";
import { firstTrimester } from "@/data/trimesterData";

const firstTrimesterRelatedArticles = [
  {
    title: "Early pregnancy symptoms explained",
    href: "/articles/early-pregnancy-symptoms-explained",
    why: "What the earliest signs actually feel like, and why they vary so much from person to person.",
  },
  {
    title: "Complete guide to morning sickness",
    href: "/articles/complete-guide-morning-sickness",
    why: "Why nausea hits in the first trimester, what helps in real life, and when to seek support.",
  },
  {
    title: "Fatigue in early pregnancy",
    href: "/articles/fatigue-in-early-pregnancy",
    why: "On the disproportionate tiredness of the early weeks, and what to do when you can't say why.",
  },
  {
    title: "The first trimester, emotionally",
    href: "/articles/the-first-trimester-emotionally",
    why: "The quieter inner experience, holding a secret, sitting with uncertainty, the strangeness of waiting.",
  },
  {
    title: "Tests and scans in pregnancy",
    href: "/articles/tests-and-scans-in-pregnancy",
    why: "What to expect at booking, screening, and the 12-week dating scan, and what each one is for.",
  },
  {
    title: "When you can't face food in pregnancy",
    href: "/articles/when-you-cant-face-food-in-pregnancy",
    why: "Aversions, missed meals, and how to look after yourself when eating feels impossible.",
  },
];

const firstTrimesterTopics = [
  {
    label: "Your body",
    href: "/pregnancy/body",
    hint: "The physical changes of pregnancy, week to week and stage to stage.",
  },
  {
    label: "Your baby",
    href: "/pregnancy/baby",
    hint: "How your baby is developing, and what's happening beneath the surface.",
  },
  {
    label: "Your feelings",
    href: "/pregnancy/feelings",
    hint: "The emotional side, anxiety, ambivalence, and the inner shifts of early pregnancy.",
  },
  {
    label: "Health & safety",
    href: "/pregnancy/health-and-safety",
    hint: "What's worth knowing on tests, vaccinations, foods, medicines, and care.",
  },
];

const FirstTrimester = () => {
  const data = firstTrimester;
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main>
        {/* 1. Hero */}
        <TrimesterHero data={data} />

        {/* 1b. On this page (sticky-feeling scan strip) */}
        <TrimesterOnThisPage bg="bg-parchment" />

        {/* 2. What this stage is */}
        <div id="about">
          <TrimesterAbout data={data} bg="bg-parchment" />
        </div>

        {/* 3. What to expect */}
        <div id="expect">
          <TrimesterExpect data={data} bg="bg-lavender-section" />
        </div>

        {/* 3b. The big changes in this trimester (synthesis) */}
        <div id="big-changes">
          <TrimesterBigChanges data={data} bg="bg-parchment-dark" />
        </div>

        {/* 4. What can feel difficult */}
        <div id="difficulties">
          <TrimesterDifficulties data={data} bg="bg-parchment" />
        </div>

        {/* 5. What's normal */}
        <div id="normal">
          <TrimesterNormal data={data} bg="bg-parchment-dark" />
        </div>

        {/* 6. What to focus on */}
        <div id="focus">
          <TrimesterFocus data={data} bg="bg-parchment" />
        </div>

        {/* 7. Week-by-week navigation */}
        <TrimesterWeeks data={data} bg="bg-sage-bg/30" />

        {/* 7b. Related guidance — calm editorial list */}
        <TrimesterRelatedGuidance
          eyebrow="Continue reading"
          title="Helpful guidance for the first trimester"
          intro="A few of the most relevant deeper reads for this stage, chosen to follow naturally from the trimester overview."
          items={firstTrimesterRelatedArticles}
          bg="bg-parchment"
        />

        {/* 7c. Topic connection — quiet orientation block */}
        <TrimesterTopicConnection
          eyebrow="Explore by topic"
          title="Where to go deeper"
          intro="If something here resonated, these topic areas hold more on each thread."
          topics={firstTrimesterTopics}
          bg="bg-parchment-dark"
        />

        {/* 8. Common questions */}
        <div id="questions">
          <TrimesterQuestions data={data} bg="bg-parchment" />
        </div>

        {/* 9. AI support */}
        <TrimesterAISupport data={data} bg="bg-parchment-dark" />

        {/* 10. Emotional moment */}
        <TrimesterEmotional data={data} bg="bg-parchment" />

        {/* 11. Journal companion */}
        <JournalPromotion />

        {/* 12. Final CTA */}
        <TrimesterFinalCTA data={data} />
      </main>
      <Footer />
    </div>
  );
};

export default FirstTrimester;
