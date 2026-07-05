export type FamilyArticleTopic =
  | "growing-families"
  | "relationships"
  | "family-basics"
  | "health-safety"
  | "travel-days-out"
  | "play-connection";

export interface FamilyArticle {
  slug: string;
  topic: FamilyArticleTopic;
  title: string;
  description: string;
  readTime: string;
  medicallyReviewed?: boolean;
  status: "draft" | "ready";
  seoTitle?: string;
  seoDescription?: string;
  lastUpdated?: string;
  reviewedBy?: string;
  intro?: string;
  sections?: { heading: string; body: string[] }[];
  keyTakeaways?: string[];
  relatedSlugs?: string[];
}

const rawFamilyArticles: FamilyArticle[] = [
  // Growing families
  {
    slug: "preparing-for-another-baby",
    topic: "growing-families",
    title: "Preparing for another baby",
    description:
      "Quiet ways to ready your home, your body and your family for a second (or third) arrival.",
    readTime: "5 min read",
    status: "draft",
  },
  {
    slug: "helping-your-child-adjust-to-a-new-sibling",
    topic: "growing-families",
    title: "Helping your child adjust to a new sibling",
    description:
      "Gentle ideas to ease the change, honour your first child's feelings and build early connection.",
    readTime: "6 min read",
    status: "draft",
  },

  // Relationships
  {
    slug: "setting-boundaries-with-grandparents",
    topic: "relationships",
    title: "Setting boundaries with grandparents",
    description:
      "Warm, clear ways to hold your parenting choices while keeping close family relationships intact.",
    readTime: "5 min read",
    status: "draft",
  },
  {
    slug: "sharing-the-mental-load",
    topic: "relationships",
    title: "Sharing the mental load",
    description:
      "How to name the invisible work of family life and share it more evenly with your partner.",
    readTime: "6 min read",
    status: "draft",
  },

  // Family basics
  {
    slug: "building-family-routines",
    topic: "family-basics",
    title: "Building family routines that hold",
    description:
      "Rhythms for mornings, meals and bedtime that bring calm without becoming rigid.",
    readTime: "5 min read",
    status: "draft",
  },
  {
    slug: "managing-childcare-costs",
    topic: "family-basics",
    title: "Managing childcare costs",
    description:
      "A practical look at nursery, childminders, family help and the funded hours in the UK.",
    readTime: "6 min read",
    status: "draft",
  },

  // Health and safety
  {
    slug: "making-your-home-safer",
    topic: "health-safety",
    title: "Making your home safer",
    description:
      "Room-by-room ideas for reducing everyday risks as your child grows more curious and mobile.",
    readTime: "5 min read",
    medicallyReviewed: true,
    status: "draft",
  },
  {
    slug: "when-to-ask-for-help",
    topic: "health-safety",
    title: "When to ask for help",
    description:
      "Signs it's time to speak to your GP, health visitor or 111, and how to trust your instinct.",
    readTime: "4 min read",
    medicallyReviewed: true,
    status: "draft",
  },

  // Travel and days out
  {
    slug: "travelling-with-young-children",
    topic: "travel-days-out",
    title: "Travelling with young children",
    description:
      "Gentle preparation for flights, trains and longer trips, from packing to keeping little ones settled.",
    readTime: "6 min read",
    status: "draft",
  },
  {
    slug: "making-car-journeys-calmer",
    topic: "travel-days-out",
    title: "Making car journeys calmer",
    description:
      "Small comforts, timings and distractions that make everyday car journeys feel less fraught.",
    readTime: "4 min read",
    status: "draft",
  },

  // Play and connection
  {
    slug: "building-family-traditions",
    topic: "play-connection",
    title: "Building family traditions",
    description:
      "Simple rituals, weekly, seasonal, small, that give family life a shape your child will remember.",
    readTime: "5 min read",
    status: "draft",
  },
  {
    slug: "screen-time-as-a-family",
    topic: "play-connection",
    title: "Screen time as a family",
    description:
      "A calm, non-judgemental way to think about screens, boundaries and shared time together.",
    readTime: "5 min read",
    status: "draft",
  },
];

export function getFamilyArticlesByTopic(topic: FamilyArticleTopic) {
  return familyArticles.filter((article) => article.topic === topic);
}

// ─── Placeholder body injection ─────────────────────────────────────────
function withFamilyDefaults(article: FamilyArticle, all: FamilyArticle[]): FamilyArticle {
  const sibling = all.find(
    (a) => a.topic === article.topic && a.slug !== article.slug
  );
  return {
    ...article,
    intro:
      article.intro ??
      `This piece on ${article.title.toLowerCase()} is being prepared. The outline below is a placeholder while the full guidance is written and reviewed.`,
    sections: article.sections ?? [
      {
        heading: "What this will cover",
        body: [
          `A calm, practical look at ${article.title.toLowerCase()}, written for real family life rather than perfect conditions.`,
          "This section is a placeholder while the full article is being written.",
        ],
      },
      {
        heading: "What often helps",
        body: [
          "Small, everyday ideas you can try without turning family life into a project.",
        ],
      },
      {
        heading: "When to seek support",
        body: [
          "Signs it may be worth speaking to your GP, health visitor or another trusted source.",
        ],
      },
    ],
    keyTakeaways: article.keyTakeaways ?? [
      "You don't need to have this figured out perfectly.",
      "Small, quiet changes tend to hold better than big overhauls.",
      "Ask for support early rather than waiting until things feel heavy.",
    ],
    relatedSlugs:
      article.relatedSlugs ?? (sibling ? [sibling.slug] : undefined),
    lastUpdated:
      article.lastUpdated ?? (article.medicallyReviewed ? "2026-07" : undefined),
    reviewedBy:
      article.reviewedBy ??
      (article.medicallyReviewed ? "Jenny Joines" : undefined),
  };
}

export const familyArticles: FamilyArticle[] = rawFamilyArticles.map((a) =>
  withFamilyDefaults(a, rawFamilyArticles)
);
