export type ToddlerArticleTopic =
  | "development-milestones"
  | "behaviour-emotions"
  | "speech-language"
  | "sleep"
  | "food-feeding"
  | "potty-learning"
  | "health-safety"
  | "play-connection";

export interface ToddlerArticle {
  slug: string;
  topic: ToddlerArticleTopic;
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

const rawToddlerArticles: ToddlerArticle[] = [
  // Development and milestones
  {
    slug: "what-toddler-development-can-look-like",
    topic: "development-milestones",
    title: "What toddler development can look like",
    description:
      "A gentle map of the leaps, plateaus and quiet shifts that shape the toddler years.",
    readTime: "5 min read",
    status: "draft",
  },
  {
    slug: "when-milestones-feel-different",
    topic: "development-milestones",
    title: "When milestones feel different",
    description:
      "Why children rarely develop on the same timeline, and when a chat with your health visitor can help.",
    readTime: "4 min read",
    status: "draft",
  },

  // Behaviour and emotions
  {
    slug: "understanding-toddler-tantrums",
    topic: "behaviour-emotions",
    title: "Understanding toddler tantrums",
    description:
      "Why big feelings spill over so intensely at this age, and calm ways to stay steady beside them.",
    readTime: "5 min read",
    status: "draft",
  },
  {
    slug: "helping-your-toddler-with-big-feelings",
    topic: "behaviour-emotions",
    title: "Helping your toddler with big feelings",
    description:
      "Simple, low-pressure ways to help your child name and move through the emotions that overwhelm them.",
    readTime: "6 min read",
    status: "draft",
  },

  // Speech and language
  {
    slug: "supporting-toddler-speech-at-home",
    topic: "speech-language",
    title: "Supporting toddler speech at home",
    description:
      "Everyday ways to gently grow your toddler's language, without flashcards or pressure.",
    readTime: "5 min read",
    status: "draft",
  },
  {
    slug: "when-to-ask-about-speech-delay",
    topic: "speech-language",
    title: "When to ask about speech delay",
    description:
      "Signs it's worth a conversation with your health visitor or GP about your toddler's speech.",
    readTime: "5 min read",
    medicallyReviewed: true,
    status: "draft",
  },

  // Sleep
  {
    slug: "toddler-sleep-rhythms",
    topic: "sleep",
    title: "Toddler sleep rhythms",
    description:
      "How toddler sleep quietly shifts across the second and third year, and what's usually behind wobbly weeks.",
    readTime: "5 min read",
    status: "draft",
  },
  {
    slug: "bedtime-battles-and-night-waking",
    topic: "sleep",
    title: "Bedtime battles and night waking",
    description:
      "Calm approaches to bedtime resistance and night waking, without harsh sleep training.",
    readTime: "6 min read",
    status: "draft",
  },

  // Food and feeding
  {
    slug: "picky-eating-in-toddlers",
    topic: "food-feeding",
    title: "Picky eating in toddlers",
    description:
      "Why toddlers reject foods they used to love, and gentle ways to keep mealtimes low-pressure.",
    readTime: "5 min read",
    status: "draft",
  },
  {
    slug: "making-mealtimes-feel-calmer",
    topic: "food-feeding",
    title: "Making mealtimes feel calmer",
    description:
      "Small shifts in timing, portions and expectations that take the tension out of the table.",
    readTime: "4 min read",
    status: "draft",
  },

  // Potty learning
  {
    slug: "signs-your-child-may-be-ready-for-potty-training",
    topic: "potty-learning",
    title: "Signs your child may be ready for potty training",
    description:
      "The quiet cues that suggest your toddler might be ready, and why age is only part of the picture.",
    readTime: "5 min read",
    status: "draft",
  },
  {
    slug: "potty-training-without-pressure",
    topic: "potty-learning",
    title: "Potty training without pressure",
    description:
      "A calm, child-led approach to potty learning that leaves room for wobbles and starts.",
    readTime: "6 min read",
    status: "draft",
  },

  // Health and safety
  {
    slug: "toddler-home-safety",
    topic: "health-safety",
    title: "Toddler home safety",
    description:
      "Room-by-room ideas for reducing everyday risks as your toddler grows more curious and mobile.",
    readTime: "5 min read",
    medicallyReviewed: true,
    status: "draft",
  },
  {
    slug: "when-to-call-the-gp",
    topic: "health-safety",
    title: "When to call the GP",
    description:
      "Everyday illness signs, when to seek advice and how to trust your instinct without second-guessing it.",
    readTime: "5 min read",
    medicallyReviewed: true,
    status: "draft",
  },

  // Play and connection
  {
    slug: "simple-play-ideas-for-toddlers",
    topic: "play-connection",
    title: "Simple play ideas for toddlers",
    description:
      "Low-effort, high-connection play ideas that suit real life and short attention spans.",
    readTime: "4 min read",
    status: "draft",
  },
  {
    slug: "building-connection-through-everyday-play",
    topic: "play-connection",
    title: "Building connection through everyday play",
    description:
      "Why the smallest moments of play do the biggest work in your child's sense of safety and belonging.",
    readTime: "5 min read",
    status: "draft",
  },
];

export function getToddlerArticlesByTopic(topic: ToddlerArticleTopic) {
  return toddlerArticles.filter((article) => article.topic === topic);
}

// ─── Placeholder body injection ─────────────────────────────────────────
function withToddlerDefaults(
  article: ToddlerArticle,
  all: ToddlerArticle[]
): ToddlerArticle {
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
          `A calm, practical look at ${article.title.toLowerCase()} in the toddler years, written for real days rather than perfect ones.`,
          "This section is a placeholder while the full article is being written.",
        ],
      },
      {
        heading: "What often helps",
        body: [
          "Small, everyday shifts you can try without turning toddler life into a project.",
        ],
      },
      {
        heading: "When to seek support",
        body: [
          "Signs it may be worth a chat with your health visitor or GP.",
        ],
      },
    ],
    keyTakeaways: article.keyTakeaways ?? [
      "Toddlers rarely move in tidy, linear ways.",
      "Calm repetition tends to work better than sudden change.",
      "Ask for support early rather than second-guessing yourself.",
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

export const toddlerArticles: ToddlerArticle[] = rawToddlerArticles.map((a) =>
  withToddlerDefaults(a, rawToddlerArticles)
);
