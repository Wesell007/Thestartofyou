import babyHero from "@/assets/firstyear-journey.jpg";
import recoveryHero from "@/assets/postpartum-journey.jpg";
import { firstYearArticles, type FirstYearArticle, type FirstYearArticleTopic } from "@/data/firstYearArticleData";
import { FIRST_YEAR_TOPIC_INDEX, type FirstYearTopicSlug } from "@/data/firstYearTopicData";

export type FirstYearPathway = "baby" | "postpartum";

export type FirstYearPathwayConfig = {
  slug: FirstYearPathway;
  side: "baby" | "recovery";
  eyebrow: string;
  title: string;
  intro: string;
  heroImage: string;
  heroAlt: string;
  topics: FirstYearTopicSlug[];
  startHereSlugs: string[];
  companionTitle: string;
  companionSuggestions: string[];
  crossLink: { eyebrow: string; title: string; body: string; href: string; label: string };
};

const BABY_TOPICS: FirstYearTopicSlug[] = ["feeding", "sleep", "development", "care-and-safety"];
const RECOVERY_TOPICS: FirstYearTopicSlug[] = [
  "postpartum-recovery",
  "emotional-wellbeing",
  "body-and-hormones",
  "checkups-and-warning-signs",
];

export const firstYearPathways: Record<FirstYearPathway, FirstYearPathwayConfig> = {
  baby: {
    slug: "baby",
    side: "baby",
    eyebrow: "Baby's first year",
    title: "Your baby's first year",
    intro: "Explore feeding, sleep, development and everyday care through each month and phase of your baby's first year.",
    heroImage: babyHero,
    heroAlt: "A parent and baby playing together on the floor at home",
    topics: BABY_TOPICS,
    startHereSlugs: [
      "newborn-feeding-rhythms",
      "newborn-sleep-expectations",
      "baby-development-in-the-first-year",
      "safe-sleep-and-home-safety",
    ],
    companionTitle: "Ask about your baby's stage",
    companionSuggestions: [
      "What can I expect around this age?",
      "How might feeding and sleep change next?",
      "What could I ask my health visitor?",
    ],
    crossLink: {
      eyebrow: "For you",
      title: "Your recovery belongs here too",
      body: "Postpartum recovery continues alongside your baby's first year.",
      href: "/first-year/postpartum",
      label: "Explore postpartum recovery",
    },
  },
  postpartum: {
    slug: "postpartum",
    side: "recovery",
    eyebrow: "Postpartum recovery",
    title: "Your first year after birth",
    intro: "A clear place for physical recovery, emotional wellbeing, body changes, check-ups and the support available after birth.",
    heroImage: recoveryHero,
    heroAlt: "A parent holding their baby by a bright window at home",
    topics: RECOVERY_TOPICS,
    startHereSlugs: [
      "healing-after-birth",
      "when-parenthood-feels-heavy",
      "body-changes-after-birth",
      "postnatal-checks-and-appointments",
    ],
    companionTitle: "Ask about recovery after birth",
    companionSuggestions: [
      "What can recovery feel like at this stage?",
      "What could I raise at my next check-up?",
      "When should I ask for more support?",
    ],
    crossLink: {
      eyebrow: "For your baby",
      title: "Explore your baby's first year",
      body: "Find feeding, sleep, development and care guidance in one clear pathway.",
      href: "/first-year/baby",
      label: "Explore baby's first year",
    },
  },
};

export const getPathwayArticles = (config: FirstYearPathwayConfig): FirstYearArticle[] =>
  firstYearArticles.filter(
    (article) => article.status === "ready" && config.topics.includes(article.topic as FirstYearTopicSlug),
  );

export const getPathwayStartHere = (config: FirstYearPathwayConfig): FirstYearArticle[] =>
  config.startHereSlugs
    .map((slug) => getPathwayArticles(config).find((article) => article.slug === slug))
    .filter((article): article is FirstYearArticle => Boolean(article));

export const getPathwayGroupedArticles = (
  config: FirstYearPathwayConfig,
): { topic: FirstYearArticleTopic; title: string; articles: FirstYearArticle[] }[] =>
  config.topics.map((topic) => ({
    topic,
    title: FIRST_YEAR_TOPIC_INDEX[topic].short,
    articles: getPathwayArticles(config).filter(
      (article) => article.topic === topic && !config.startHereSlugs.includes(article.slug),
    ),
  }));