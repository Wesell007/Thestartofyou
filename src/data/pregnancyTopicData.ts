// ─── Pregnancy Topic Landing Data ─────────────────────────────────────────
// Per-topic config for the reusable PregnancyTopicPage template.
// Each topic sits between /pregnancy and individual /articles/* pages.

export type PregnancyTopicSlug =
  | "body"
  | "baby"
  | "feelings"
  | "health-and-safety"
  | "diet-and-exercise"
  | "preparing-for-baby";

export interface TopicLink {
  label: string;
  href: string;
}

export interface TopicGroup {
  label: string;
  description?: string;
  links: TopicLink[];
}

export interface TopicStartHere {
  title: string;
  href: string;
  why: string;
}

export interface PregnancyTopicPageConfig {
  slug: PregnancyTopicSlug;
  eyebrow: string;
  title: string;
  intro: string;

  whatThisCovers: {
    lead: string;
    bullets: string[];
  };

  startHere: TopicStartHere[];
  groups: TopicGroup[];

  weekBridge?: {
    line: string;
    href: string;
    label: string;
  };

  showSiblings?: boolean;
  showAI?: boolean;
  aiPrompts?: string[];
}

// All sibling routes — used for the lateral siblings row.
// Routes that don't yet exist render as quiet, non-link labels.
export const PREGNANCY_TOPICS: { slug: PregnancyTopicSlug; eyebrow: string }[] = [
  { slug: "body", eyebrow: "Your body" },
  { slug: "baby", eyebrow: "Your baby" },
  { slug: "feelings", eyebrow: "Your feelings" },
  { slug: "health-and-safety", eyebrow: "Health & safety" },
  { slug: "diet-and-exercise", eyebrow: "Diet & exercise" },
  { slug: "preparing-for-baby", eyebrow: "Preparing for baby" },
];

// Slugs that already have a built landing page. Keeps siblings honest.
export const LIVE_TOPIC_SLUGS: PregnancyTopicSlug[] = ["body"];

export const pregnancyTopicConfigs: Record<PregnancyTopicSlug, PregnancyTopicPageConfig | null> = {
  body: {
    slug: "body",
    eyebrow: "Your body",
    title: "Your body in pregnancy",
    intro:
      "Pregnancy moves through your body in waves — some weeks loud, some weeks quiet. This is a calm place to understand what's shifting, what tends to be normal, and when something might be worth checking.",

    whatThisCovers: {
      lead: "What you'll find in this topic:",
      bullets: [
        "The early signs that often appear before, around, or just after a missed period.",
        "Common symptoms and the body changes that show up across the trimesters.",
        "What tends to feel normal — and the everyday discomforts most people meet at some point.",
        "Energy, sleep, and the way pregnancy quietly resets your stamina.",
        "Signs that may need checking, without overstating the alarm.",
      ],
    },

    startHere: [
      {
        title: "Early pregnancy symptoms explained",
        href: "/articles/early-pregnancy-symptoms-explained",
        why: "A grounded overview of what tends to appear first, and what those early signals usually mean.",
      },
      {
        title: "Complete guide to morning sickness",
        href: "/articles/complete-guide-morning-sickness",
        why: "The fullest picture of nausea in pregnancy — why it happens, when it eases, and what helps.",
      },
      {
        title: "Fatigue in early pregnancy",
        href: "/articles/fatigue-in-early-pregnancy",
        why: "Why the tiredness can feel unlike anything before, and how to meet it gently.",
      },
    ],

    groups: [
      {
        label: "Early signs",
        links: [
          { label: "Early pregnancy symptoms explained", href: "/articles/early-pregnancy-symptoms-explained" },
          { label: "Implantation bleeding", href: "/articles/implantation-bleeding" },
          { label: "When pregnancy symptoms stop", href: "/articles/symptoms-stopping-early-pregnancy" },
        ],
      },
      {
        label: "Nausea & morning sickness",
        links: [
          { label: "Complete guide to morning sickness", href: "/articles/complete-guide-morning-sickness" },
          { label: "Nausea in early pregnancy", href: "/articles/nausea-in-early-pregnancy" },
        ],
      },
      {
        label: "Energy & sleep",
        links: [
          { label: "Fatigue in early pregnancy", href: "/articles/fatigue-in-early-pregnancy" },
        ],
      },
      {
        label: "Across the trimesters",
        description: "How your body tends to shift as pregnancy moves on.",
        links: [
          { label: "First trimester: complete guide", href: "/articles/first-trimester-complete-guide" },
          { label: "Second trimester: complete guide", href: "/articles/second-trimester-complete-guide" },
          { label: "Third trimester: complete guide", href: "/articles/third-trimester-complete-guide" },
        ],
      },
    ],

    weekBridge: {
      line: "Your body shifts week by week.",
      href: "/pregnancy#week-by-week",
      label: "See the week-by-week view",
    },

    showSiblings: true,
    showAI: false,
  },

  // Other topics not yet built.
  baby: null,
  feelings: null,
  "health-and-safety": null,
  "diet-and-exercise": null,
  "preparing-for-baby": null,
};
