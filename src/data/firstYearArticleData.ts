export type FirstYearArticleTopic =
  | "feeding"
  | "sleep"
  | "development"
  | "care-and-safety"
  | "postpartum-recovery"
  | "emotional-wellbeing"
  | "body-and-hormones"
  | "checkups-and-warning-signs";

export interface FirstYearArticle {
  slug: string;
  topic: FirstYearArticleTopic;
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

export const firstYearArticles: FirstYearArticle[] = [
  // Feeding
  {
    slug: "newborn-feeding-rhythms",
    topic: "feeding",
    title: "Newborn feeding rhythms",
    description:
      "What feeding often looks like in the early weeks, from cluster feeds to quiet stretches, and how to read your baby's cues.",
    readTime: "5 min read",
    status: "draft",
  },
  {
    slug: "bottle-and-breastfeeding-questions",
    topic: "feeding",
    title: "Bottle and breastfeeding questions",
    description:
      "Gentle answers to the everyday questions that come up whether you're breastfeeding, bottle-feeding or doing both.",
    readTime: "6 min read",
    status: "draft",
  },

  // Sleep
  {
    slug: "newborn-sleep-expectations",
    topic: "sleep",
    title: "Newborn sleep expectations",
    description:
      "What newborn sleep is actually like, why it feels so unpredictable, and what quietly shifts across the first months.",
    readTime: "5 min read",
    status: "draft",
  },
  {
    slug: "helping-your-baby-settle",
    topic: "sleep",
    title: "Helping your baby settle",
    description:
      "Calm, low-pressure ways to help your baby drift off, without rigid routines or sleep-training pressure.",
    readTime: "5 min read",
    status: "draft",
  },

  // Development
  {
    slug: "baby-development-in-the-first-year",
    topic: "development",
    title: "Baby development in the first year",
    description:
      "A gentle map of what unfolds in the first year, without turning every week into a checklist.",
    readTime: "6 min read",
    status: "draft",
  },
  {
    slug: "when-milestones-feel-uneven",
    topic: "development",
    title: "When milestones feel uneven",
    description:
      "Why babies rarely develop in straight lines, and when a gentle chat with your health visitor can help.",
    readTime: "4 min read",
    status: "draft",
  },

  // Care and safety
  {
    slug: "baby-care-basics",
    topic: "care-and-safety",
    title: "Baby care basics",
    description:
      "Nappies, baths, cord care and the small everyday practicalities of looking after a new baby.",
    readTime: "5 min read",
    status: "draft",
  },
  {
    slug: "safe-sleep-and-home-safety",
    topic: "care-and-safety",
    title: "Safe sleep and home safety",
    description:
      "A calm summary of current UK safe-sleep guidance and small changes that make your home feel steadier.",
    readTime: "6 min read",
    medicallyReviewed: true,
    status: "draft",
  },

  // Postpartum recovery
  {
    slug: "healing-after-birth",
    topic: "postpartum-recovery",
    title: "Healing after birth",
    description:
      "What physical recovery can look like in the first weeks, whether you had a vaginal birth or a caesarean.",
    readTime: "6 min read",
    status: "draft",
  },
  {
    slug: "what-recovery-can-feel-like",
    topic: "postpartum-recovery",
    title: "What recovery can feel like",
    description:
      "The tender, tiring, quietly emotional side of the early weeks, and why it takes longer than the world lets on.",
    readTime: "5 min read",
    status: "draft",
  },

  // Emotional wellbeing
  {
    slug: "feeling-like-yourself-again",
    topic: "emotional-wellbeing",
    title: "Feeling like yourself again",
    description:
      "Why identity shifts so much after birth, and the small returns to yourself that quietly gather over time.",
    readTime: "5 min read",
    status: "draft",
  },
  {
    slug: "when-parenthood-feels-heavy",
    topic: "emotional-wellbeing",
    title: "When parenthood feels heavy",
    description:
      "The difference between baby blues, low mood and something that deserves support, without alarm.",
    readTime: "6 min read",
    status: "draft",
  },

  // Body and hormones
  {
    slug: "body-changes-after-birth",
    topic: "body-and-hormones",
    title: "Body changes after birth",
    description:
      "What's normal in the weeks and months after birth, from your bump softening to how your body carries itself.",
    readTime: "5 min read",
    status: "draft",
  },
  {
    slug: "hormones-sweat-and-hair-loss",
    topic: "body-and-hormones",
    title: "Hormones, sweat and hair loss",
    description:
      "The hormonal shifts that quietly steer the early months, and why hair loss and night sweats aren't a worry.",
    readTime: "4 min read",
    status: "draft",
  },

  // Check-ups and warning signs
  {
    slug: "postnatal-checks-and-appointments",
    topic: "checkups-and-warning-signs",
    title: "Postnatal checks and appointments",
    description:
      "What to expect from your six-week check, your baby's reviews and the appointments that quietly matter.",
    readTime: "5 min read",
    medicallyReviewed: true,
    status: "draft",
  },
  {
    slug: "when-to-ask-for-help-after-birth",
    topic: "checkups-and-warning-signs",
    title: "When to ask for help after birth",
    description:
      "Signs it's worth calling your GP, midwife or 111, and how to trust your instinct without second-guessing it.",
    readTime: "5 min read",
    medicallyReviewed: true,
    status: "draft",
  },
];

export function getFirstYearArticlesByTopic(topic: FirstYearArticleTopic) {
  return firstYearArticles.filter((article) => article.topic === topic);
}
