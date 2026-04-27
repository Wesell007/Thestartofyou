import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TrimesterHero from "@/components/trimester/TrimesterHero";
import TrimesterHeroImage from "@/components/trimester/TrimesterHeroImage";
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

// Curated, first-trimester-relevant article cards (image-led, editorial).
import imgEarlySymptoms from "@/assets/article-hero-early-symptoms.jpg";
import imgNausea from "@/assets/article-hero-nausea.jpg";
import imgFatigue from "@/assets/article-hero-fatigue.jpg";
import imgImplantation from "@/assets/article-hero-implantation-bleeding.jpg";
import imgEmotional from "@/assets/article-hero-emotional-first-tri.jpg";
import imgScans from "@/assets/article-hero-tests-scans.jpg";
import imgFood from "@/assets/article-hero-food-aversions.jpg";

const firstTrimesterRelatedArticles = [
  {
    title: "Early pregnancy symptoms explained",
    href: "/articles/early-pregnancy-symptoms-explained",
    why: "What the earliest signs actually feel like, and why they vary so much from person to person.",
    tag: "Symptoms",
    image: imgEarlySymptoms,
  },
  {
    title: "Complete guide to morning sickness",
    href: "/articles/complete-guide-to-morning-sickness",
    why: "Why nausea hits in the first trimester, what helps in real life, and when to seek support.",
    tag: "Nausea",
    image: imgNausea,
  },
  {
    title: "Fatigue in early pregnancy",
    href: "/articles/fatigue-in-early-pregnancy",
    why: "On the disproportionate tiredness of the early weeks, and how to look after yourself when you can't say why.",
    tag: "Wellbeing",
    image: imgFatigue,
  },
  {
    title: "Implantation bleeding",
    href: "/articles/implantation-bleeding",
    why: "What it can look like, when it tends to happen, and how to tell it apart from other early bleeding.",
    tag: "Reassurance",
    image: imgImplantation,
  },
  {
    title: "The first trimester, emotionally",
    href: "/articles/the-first-trimester-emotionally",
    why: "The quieter inner experience, holding a secret, sitting with uncertainty, the strangeness of waiting.",
    tag: "Emotional health",
    image: imgEmotional,
  },
  {
    title: "Tests and scans in pregnancy",
    href: "/articles/tests-and-scans-in-pregnancy",
    why: "What to expect at booking, screening, and the 12-week dating scan, and what each one is for.",
    tag: "Care & scans",
    image: imgScans,
  },
];

// Article-led next-steps — small, quiet icon row.
// These point to specific stages/topics most relevant to a first-trimester reader,
// not the broad pregnancy topic landing pages.
const firstTrimesterDeeperLinks = [
  {
    label: "Trying to conceive",
    href: "/trying-to-conceive",
    icon: "trying" as const,
  },
  {
    label: "Fertility & IVF",
    href: "/ivf",
    icon: "fertility" as const,
  },
  {
    label: "Nutrition",
    href: "/articles/when-you-cant-face-food-in-pregnancy",
    icon: "movement" as const,
  },
  {
    label: "Exercise & movement",
    href: "/pregnancy/diet-and-exercise",
    icon: "movement" as const,
  },
  {
    label: "Mental health",
    href: "/articles/anxiety-in-pregnancy",
    icon: "mental" as const,
  },
  {
    label: "Partner support",
    href: "/pregnancy/feelings",
    icon: "partner" as const,
  },
  {
    label: "Back to work",
    href: "/articles/working-through-pregnancy",
    icon: "back" as const,
  },
  {
    label: "Postpartum",
    href: "/postpartum",
    icon: "postpartum" as const,
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

        {/* 1b. On this page (calm scan strip, sits directly below hero) */}
        <TrimesterOnThisPage bg="bg-parchment" />

        {/* 1c. Editorial hero image with overlaid quote — gives sense of occasion */}
        <TrimesterHeroImage
          number={1}
          quote="This is the beginning of everything."
          caption="You are not alone."
          alt="The quiet beginning of the first trimester"
          bg="bg-parchment"
        />

        {/* 2. What this stage is */}
        <div id="about">
          <TrimesterAbout data={data} bg="bg-parchment" hideImage />
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

        {/* 7. Week-by-week navigation (green band moment) */}
        <TrimesterWeeks data={data} bg="bg-sage-bg/30" />

        {/* 7b. Curated, image-led related guidance — premium card grid */}
        <TrimesterRelatedGuidance
          eyebrow="Guidance"
          title="Helpful guidance for the first trimester"
          intro="A curated set of deeper reads for what tends to come up most in these early weeks — chosen, not generated."
          items={firstTrimesterRelatedArticles}
          viewAllHref="/guidance"
          viewAllLabel="View all articles"
          bg="bg-parchment"
        />

        {/* 7c. Quiet article-led "where to go deeper" row */}
        <TrimesterTopicConnection
          title="Where to go deeper"
          topics={firstTrimesterDeeperLinks}
          bg="bg-parchment"
        />

        {/* 8. Common questions */}
        <div id="questions">
          <TrimesterQuestions data={data} bg="bg-parchment-dark" />
        </div>

        {/* 9. AI support — "still have questions" */}
        <TrimesterAISupport data={data} bg="bg-parchment" />

        {/* 10. Emotional moment — green quote band */}
        <TrimesterEmotional data={data} bg="bg-sage-bg/40" />

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
