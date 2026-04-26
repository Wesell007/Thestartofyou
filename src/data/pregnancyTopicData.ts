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
export const LIVE_TOPIC_SLUGS: PregnancyTopicSlug[] = ["body", "baby"];

export const pregnancyTopicConfigs: Record<PregnancyTopicSlug, PregnancyTopicPageConfig | null> = {
  body: {
    slug: "body",
    eyebrow: "Your body",
    title: "Your body in pregnancy",
    intro:
      "Pregnancy reshapes your body in stages — sometimes loudly, sometimes so quietly you almost miss it. This is a steady place to understand what's changing, what's usually normal, and what's worth a closer look.",

    whatThisCovers: {
      lead: "What this topic covers:",
      bullets: [
        "The earliest signs, from the days before a missed period through the first weeks.",
        "Morning sickness, nausea, and the symptoms most people meet at some point.",
        "How energy, sleep, and stamina shift as pregnancy settles in.",
        "The way your body changes across the first, second, and third trimesters.",
        "Signs that are common — and signs worth checking — without overstating either.",
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
        label: "The first signs",
        links: [
          { label: "Early pregnancy symptoms explained", href: "/articles/early-pregnancy-symptoms-explained" },
          { label: "Implantation bleeding", href: "/articles/implantation-bleeding" },
          { label: "When pregnancy symptoms stop", href: "/articles/symptoms-stopping-early-pregnancy" },
        ],
      },
      {
        label: "Nausea, fatigue & the early weeks",
        description: "The symptoms that tend to define the first trimester.",
        links: [
          { label: "Complete guide to morning sickness", href: "/articles/complete-guide-morning-sickness" },
          { label: "Nausea in early pregnancy", href: "/articles/nausea-in-early-pregnancy" },
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
  baby: {
    slug: "baby",
    eyebrow: "Your baby",
    title: "Your baby in pregnancy",
    intro:
      "From a cluster of cells to a small person who turns toward your voice — your baby's growth across pregnancy is quieter and more astonishing than most week-by-week summaries let on. This is a steady place to follow what's developing, when the big shifts happen, and what you might start to feel along the way.",

    whatThisCovers: {
      lead: "What this topic covers:",
      bullets: [
        "How your baby develops from the earliest weeks onward.",
        "The major shifts that tend to define each trimester.",
        "When movement begins, and how it changes as pregnancy goes on.",
        "The broader picture of growth, rather than a chase of weekly milestones.",
      ],
    },

    startHere: [
      {
        title: "First trimester: complete guide",
        href: "/articles/first-trimester-complete-guide",
        why: "Where the foundations are laid, often before you can feel anything at all.",
      },
      {
        title: "Second trimester: complete guide",
        href: "/articles/second-trimester-complete-guide",
        why: "The window where movement, growth, and the sense of a real person tend to arrive.",
      },
      {
        title: "Third trimester: complete guide",
        href: "/articles/third-trimester-complete-guide",
        why: "How your baby finishes growing, settles, and prepares for birth.",
      },
    ],

    groups: [
      {
        label: "Early development",
        links: [
          { label: "First trimester: complete guide", href: "/articles/first-trimester-complete-guide" },
        ],
      },
      {
        label: "Growing and moving",
        description: "How your baby unfolds across the middle and later weeks.",
        links: [
          { label: "Second trimester: complete guide", href: "/articles/second-trimester-complete-guide" },
          { label: "Third trimester: complete guide", href: "/articles/third-trimester-complete-guide" },
        ],
      },
    ],

    weekBridge: {
      line: "Your baby grows in steady, sometimes startling jumps.",
      href: "/pregnancy#week-by-week",
      label: "See the week-by-week view",
    },

    showSiblings: true,
    showAI: false,
  },
  feelings: null,
  "health-and-safety": null,
  "diet-and-exercise": null,
  "preparing-for-baby": null,
};

// ─── Topic Map Cards ──────────────────────────────────────────────────────
// Single source of truth for the PregnancyTopicMap on /pregnancy.
// Labels match the approved benchmark coverage map. Destinations are honest:
// either a live topic landing page, or — for not-yet-built landings — the
// strongest live cornerstone article. No legacy /guidance?... bridges.

export interface TopicMapArticleLink {
  label: string;
  href: string;
}

export interface TopicMapEntry {
  slug: PregnancyTopicSlug;
  label: string;
  supportLine: string;
  mainHref: string;
  mainLabel: string;
  /** True if mainHref points to a live topic landing page. */
  hasLanding: boolean;
  articles: TopicMapArticleLink[];
}

export const topicMapEntries: TopicMapEntry[] = [
  {
    slug: "body",
    label: "Your body",
    supportLine: "Symptoms, changes, and what may feel different week by week.",
    mainHref: "/pregnancy/body",
    mainLabel: "Explore your body in pregnancy",
    hasLanding: true,
    articles: [
      { label: "Early signs of pregnancy", href: "/articles/early-pregnancy-symptoms-explained" },
      { label: "Morning sickness", href: "/articles/complete-guide-morning-sickness" },
      { label: "Fatigue in pregnancy", href: "/articles/fatigue-in-early-pregnancy" },
      { label: "Implantation bleeding", href: "/articles/implantation-bleeding" },
    ],
  },
  {
    slug: "baby",
    label: "Your baby",
    supportLine: "How your baby grows and changes across pregnancy.",
    mainHref: "/pregnancy/baby",
    mainLabel: "Explore your baby in pregnancy",
    hasLanding: true,
    articles: [
      { label: "Early development", href: "/articles/first-trimester-complete-guide" },
      { label: "Growing and moving", href: "/articles/second-trimester-complete-guide" },
      { label: "Later development", href: "/articles/third-trimester-complete-guide" },
    ],
  },
  {
    slug: "feelings",
    label: "Your feelings",
    supportLine: "The emotional side of pregnancy, held with care.",
    mainHref: "/articles/emotional-wellbeing-pregnancy",
    mainLabel: "Start with emotional wellbeing",
    hasLanding: false,
    articles: [
      { label: "Emotional wellbeing in pregnancy", href: "/articles/emotional-wellbeing-pregnancy" },
      { label: "Pregnancy anxiety", href: "/articles/perinatal-anxiety" },
      { label: "When pregnancy symptoms stop", href: "/articles/symptoms-stopping-early-pregnancy" },
    ],
  },
  {
    slug: "health-and-safety",
    label: "Health & safety",
    supportLine: "Steady answers to the questions worth checking.",
    mainHref: "/articles/implantation-bleeding",
    mainLabel: "Start with health and safety",
    hasLanding: false,
    articles: [
      { label: "Implantation bleeding", href: "/articles/implantation-bleeding" },
      { label: "When pregnancy symptoms stop", href: "/articles/symptoms-stopping-early-pregnancy" },
    ],
  },
  {
    slug: "diet-and-exercise",
    label: "Diet & exercise",
    supportLine: "Eating well, moving safely, and caring for yourself day to day.",
    mainHref: "/pregnancy",
    mainLabel: "Coming soon",
    hasLanding: false,
    articles: [],
  },
  {
    slug: "preparing-for-baby",
    label: "Preparing for baby",
    supportLine: "Birth, baby essentials, and getting ready for what comes next.",
    mainHref: "/articles/preparing-for-baby-complete-guide",
    mainLabel: "Start with preparing for baby",
    hasLanding: false,
    articles: [
      { label: "Getting ready for baby", href: "/articles/preparing-for-baby-complete-guide" },
      { label: "Birth plan", href: "/articles/writing-a-birth-plan" },
      { label: "Later pregnancy", href: "/articles/third-trimester-complete-guide" },
    ],
  },
];

