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
      "Calm, honest ways to prepare an older child for a new baby, and to support them through the mix of feelings that follow.",
    readTime: "6 min read",
    status: "ready",
    seoTitle: "Helping your child adjust to a new sibling",
    seoDescription:
      "A calm guide to helping an older child prepare for a new baby and settle into life as a sibling, without expecting constant excitement.",
    lastUpdated: "July 2026",
    intro:
      "A new baby is a big change for the whole family, and often the biggest change for your first child. They are being asked to share their people, their space and their rhythm, sometimes before they have the words for any of it. This piece is a gentle guide to preparing them, supporting them and sitting with the mixed feelings that come with becoming a sibling.",
    sections: [
      {
        heading: "Why a new sibling can feel big for a child",
        body: [
          "For a young child, a new baby is not just an addition to the family. It is a shift in almost everything they know. Who holds them, who sleeps where, how mornings run, how much of you is available at any moment.",
          "Even children who seem thrilled about the baby can feel wobbly once life actually changes. Regressions, clinginess, sudden anger or quiet withdrawal are all common. None of it means you have done something wrong, and none of it means they do not love their sibling.",
        ],
      },
      {
        heading: "Talk about the baby in simple, steady ways",
        body: [
          "Young children take in more from your tone than your words. Talking about the baby in a calm, matter-of-fact way tends to land better than big announcements or a lot of build-up.",
          "Keep the information age-appropriate. A toddler might just need to know that a baby is growing in your tummy and will come to live with you. An older child might have questions about hospitals, feeding or where the baby will sleep. Answer what they ask, and leave the rest for another day.",
        ],
      },
      {
        heading: "Keep some familiar routines where possible",
        body: [
          "In the weeks around the birth, familiar routines are a kind of anchor. The same bedtime book, the same walk to nursery, the same person doing bath time when they can.",
          "You do not need to protect every routine perfectly. What helps most is choosing one or two small ones that stay steady even when everything else is in flux.",
        ],
      },
      {
        heading: "Make space for mixed feelings",
        body: [
          "It is normal for an older child to love the baby and also feel jealous, sad, cross or left out. These feelings are not a problem to fix. They are part of adjusting to something big.",
          "You can gently name what you notice without judging it. Something like, \"It's hard when I'm feeding the baby and you want me too,\" is often enough. Feeling understood tends to soften the feeling itself.",
        ],
      },
      {
        heading: "Small ways to involve your child",
        body: [
          "Involvement works best when it is optional and low pressure. Fetching a nappy, choosing the baby's outfit, singing during nappy changes, or being the one who tells visitors the baby's name.",
          "Watch for signs they want a break from being the helper. Some children love the role, others need long stretches where they are simply the child again, not the big brother or big sister.",
        ],
      },
      {
        heading: "After the baby arrives",
        body: [
          "The first few weeks are often a period of adjustment for everyone. Try to protect small pockets of one-to-one time with your older child, even ten minutes on the sofa or a short walk. It does not need to be elaborate.",
          "Expect ups and downs. A child who seemed fine in the first week may struggle in the third, when the newness has worn off and the reality has settled in. Meeting that with warmth rather than worry usually helps most.",
        ],
      },
      {
        heading: "When it may help to ask for support",
        body: [
          "If your older child seems persistently withdrawn, very distressed for weeks, or their behaviour is worrying you, it can help to speak to your health visitor, GP or their nursery or school.",
          "Ask for support for yourself too. Looking after a new baby while holding space for an older child's feelings is genuinely hard, and you do not need to do it alone.",
        ],
      },
    ],
    keyTakeaways: [
      "A new sibling is a big adjustment, and mixed feelings are normal, not a sign of a problem.",
      "Calm, matter-of-fact conversations tend to help more than long build-ups.",
      "Protecting one or two familiar routines gives your older child a steady anchor.",
      "Naming feelings gently often softens them more than trying to fix them.",
      "Involvement should feel optional, not a new job to perform.",
      "Ask for support from your health visitor, GP or nursery if something feels stuck.",
    ],
    relatedSlugs: [
      "preparing-for-another-baby",
      "building-family-routines",
      "building-family-traditions",
    ],
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
