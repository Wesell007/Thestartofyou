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
export const LIVE_TOPIC_SLUGS: PregnancyTopicSlug[] = ["body", "baby", "health-and-safety", "diet-and-exercise", "preparing-for-baby"];

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
        title: "How your baby develops in pregnancy",
        href: "/articles/how-your-baby-develops-in-pregnancy",
        why: "The cornerstone view — how growth unfolds across the whole pregnancy, without turning into a weekly chase.",
      },
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
    ],

    groups: [
      {
        label: "Development and growth",
        description: "How your baby unfolds across the whole of pregnancy.",
        links: [
          { label: "How your baby develops in pregnancy", href: "/articles/how-your-baby-develops-in-pregnancy" },
          { label: "First trimester: complete guide", href: "/articles/first-trimester-complete-guide" },
          { label: "Second trimester: complete guide", href: "/articles/second-trimester-complete-guide" },
          { label: "Third trimester: complete guide", href: "/articles/third-trimester-complete-guide" },
        ],
      },
      {
        label: "Twins and multiples",
        description: "What's a little different when you're carrying more than one.",
        links: [
          { label: "Twins and multiples in pregnancy", href: "/articles/twins-and-multiples-in-pregnancy" },
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
  "health-and-safety": {
    slug: "health-and-safety",
    eyebrow: "Health and safety",
    title: "Health and safety in pregnancy",
    intro:
      "Pregnancy brings a steady stream of small questions — about scans, vaccinations, medicines, and the moments that feel worth checking. This is a calm place to find clear, honest answers, the kind that help you feel steadier rather than more wary, and that support the conversations you'll have with your midwife or doctor.",

    whatThisCovers: {
      lead: "What this topic covers:",
      bullets: [
        "The tests and scans usually offered through pregnancy, and what they're for.",
        "Vaccinations recommended in pregnancy and the thinking behind them.",
        "Medicines in pregnancy, and how to make safer decisions about them.",
        "Staying well day to day — body changes, energy, and small habits that help.",
        "When something is worth raising with your midwife, GP, or maternity unit.",
      ],
    },

    startHere: [
      {
        title: "Tests and scans in pregnancy",
        href: "/articles/tests-and-scans-in-pregnancy",
        why: "A grounded overview of the appointments, screenings, and scans you're likely to be offered.",
      },
      {
        title: "Vaccinations in pregnancy",
        href: "/articles/vaccinations-in-pregnancy",
        why: "Why certain vaccinations are recommended, when they're given, and what to expect.",
      },
      {
        title: "Medicines in pregnancy",
        href: "/articles/medicines-in-pregnancy",
        why: "How to think about everyday medicines, and who to ask when you're not sure.",
      },
    ],

    groups: [
      {
        label: "Tests and scans",
        description: "What's usually offered, and what each one is looking for.",
        links: [
          { label: "Tests and scans in pregnancy", href: "/articles/tests-and-scans-in-pregnancy" },
        ],
      },
      {
        label: "Medicines and vaccinations",
        description: "Two of the most-asked questions, answered calmly.",
        links: [
          { label: "Medicines in pregnancy", href: "/articles/medicines-in-pregnancy" },
          { label: "Vaccinations in pregnancy", href: "/articles/vaccinations-in-pregnancy" },
        ],
      },
      {
        label: "Staying well and when to raise something",
        description: "Practical, trust-led guidance for the in-between days.",
        links: [
          { label: "Foods to avoid in pregnancy", href: "/articles/foods-to-avoid-in-pregnancy" },
          { label: "Implantation bleeding", href: "/articles/implantation-bleeding" },
          { label: "When pregnancy symptoms stop", href: "/articles/symptoms-stopping-early-pregnancy" },
        ],
      },
    ],

    showSiblings: true,
    showAI: false,
  },
  "diet-and-exercise": {
    slug: "diet-and-exercise",
    eyebrow: "Diet and exercise",
    title: "Diet and exercise in pregnancy",
    intro:
      "Eating, moving, and looking after your energy in pregnancy doesn't need to become another set of rules. This is a calm place to think about food and movement as part of daily care — useful, grounded, and shaped around the realities of how pregnancy actually feels rather than how it's often presented.",

    whatThisCovers: {
      lead: "What this topic covers:",
      bullets: [
        "Eating well in pregnancy without overcomplicating it.",
        "The nutrients that genuinely matter most, and where they come from.",
        "Moving your body in ways that feel realistic and supportive.",
        "Foods that are best avoided, and the much longer list that's still fine.",
        "The days when nausea, aversions, or low appetite make eating harder.",
      ],
    },

    startHere: [
      {
        title: "Foods to avoid in pregnancy",
        href: "/articles/foods-to-avoid-in-pregnancy",
        why: "The shorter-than-it-feels list, and what's still completely fine to eat.",
      },
      {
        title: "Eating well in pregnancy",
        href: "/articles/eating-well-in-pregnancy",
        why: "What good eating in pregnancy actually looks like — without rules, plans, or guilt.",
      },
      {
        title: "Moving your body in pregnancy",
        href: "/articles/moving-your-body-in-pregnancy",
        why: "Realistic, encouraging guidance on movement, with a clear word on what to adapt.",
      },
    ],

    groups: [
      {
        label: "Eating well",
        description: "Steady, practical food guidance for ordinary days.",
        links: [
          { label: "Eating well in pregnancy", href: "/articles/eating-well-in-pregnancy" },
          { label: "Foods to avoid in pregnancy", href: "/articles/foods-to-avoid-in-pregnancy" },
          { label: "Key nutrients in pregnancy", href: "/articles/key-nutrients-in-pregnancy" },
        ],
      },
      {
        label: "Movement and exercise",
        description: "What's usually safe, what to adapt, and what to leave for now.",
        links: [
          { label: "Moving your body in pregnancy", href: "/articles/moving-your-body-in-pregnancy" },
        ],
      },
      {
        label: "When food feels hard",
        description: "For the days nausea, aversions, or low appetite get in the way.",
        links: [
          { label: "When you can't face food in pregnancy", href: "/articles/when-you-cant-face-food-in-pregnancy" },
          { label: "Complete guide to morning sickness", href: "/articles/complete-guide-morning-sickness" },
        ],
      },
    ],

    showSiblings: true,
    showAI: false,
  },
  "preparing-for-baby": {
    slug: "preparing-for-baby",
    eyebrow: "Preparing for baby",
    title: "Preparing for baby",
    intro:
      "Getting ready for a baby doesn't need to become another long list. This is a calm place to think about birth, the home you'll bring your baby into, and the early days ahead — practical where it helps, gentle where it matters more, and clear about what can wait.",

    whatThisCovers: {
      lead: "What this topic covers:",
      bullets: [
        "Getting ready in practical ways, without turning preparation into pressure.",
        "Birth planning as a conversation, not a contract.",
        "What your baby actually needs in the first weeks — and what they really don't.",
        "The space your baby will come home to, kept simple.",
        "The early days after birth as something you can prepare for gently.",
      ],
    },

    startHere: [
      {
        title: "Preparing for baby: complete guide",
        href: "/preparing-for-baby",
        why: "The wider orientation hub — what to think about, when, and what can wait.",
      },
      {
        title: "Writing a birth plan",
        href: "/articles/writing-a-birth-plan",
        why: "How to think through preferences for birth without locking yourself in.",
      },
      {
        title: "The space your baby will come home to",
        href: "/articles/the-space-your-baby-will-come-home-to",
        why: "What actually matters about your home setup — and what doesn't.",
      },
    ],

    groups: [
      {
        label: "Getting ready",
        description: "The wider, calmer orientation to preparing for a baby.",
        links: [
          { label: "Preparing for baby: complete guide", href: "/preparing-for-baby" },
        ],
      },
      {
        label: "Birth planning",
        description: "Thinking through preferences without overplanning.",
        links: [
          { label: "Writing a birth plan", href: "/articles/writing-a-birth-plan" },
        ],
      },
      {
        label: "Home and early days",
        description: "What your baby needs at home, kept simple.",
        links: [
          { label: "The space your baby will come home to", href: "/articles/the-space-your-baby-will-come-home-to" },
          { label: "Third trimester: complete guide", href: "/articles/third-trimester-complete-guide" },
        ],
      },
    ],

    showSiblings: true,
    showAI: false,
  },
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
      { label: "How your baby develops in pregnancy", href: "/articles/how-your-baby-develops-in-pregnancy" },
      { label: "Twins and multiples in pregnancy", href: "/articles/twins-and-multiples-in-pregnancy" },
      { label: "First trimester", href: "/articles/first-trimester-complete-guide" },
      { label: "Second trimester", href: "/articles/second-trimester-complete-guide" },
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
    supportLine: "Tests, scans, medicines, and the questions worth raising.",
    mainHref: "/pregnancy/health-and-safety",
    mainLabel: "Explore health and safety in pregnancy",
    hasLanding: true,
    articles: [
      { label: "Tests and scans in pregnancy", href: "/articles/tests-and-scans-in-pregnancy" },
      { label: "Vaccinations in pregnancy", href: "/articles/vaccinations-in-pregnancy" },
      { label: "Medicines in pregnancy", href: "/articles/medicines-in-pregnancy" },
      { label: "Foods to avoid in pregnancy", href: "/articles/foods-to-avoid-in-pregnancy" },
    ],
  },
  {
    slug: "diet-and-exercise",
    label: "Diet & exercise",
    supportLine: "Eating well, moving safely, and caring for yourself day to day.",
    mainHref: "/pregnancy/diet-and-exercise",
    mainLabel: "Explore diet and exercise in pregnancy",
    hasLanding: true,
    articles: [
      { label: "Eating well in pregnancy", href: "/articles/eating-well-in-pregnancy" },
      { label: "Moving your body in pregnancy", href: "/articles/moving-your-body-in-pregnancy" },
      { label: "Key nutrients in pregnancy", href: "/articles/key-nutrients-in-pregnancy" },
      { label: "When you can't face food in pregnancy", href: "/articles/when-you-cant-face-food-in-pregnancy" },
    ],
  },
  {
    slug: "preparing-for-baby",
    label: "Preparing for baby",
    supportLine: "Birth, baby essentials, and getting ready for what comes next.",
    mainHref: "/pregnancy/preparing-for-baby",
    mainLabel: "Explore preparing for baby",
    hasLanding: true,
    articles: [
      { label: "Preparing for baby: complete guide", href: "/preparing-for-baby" },
      { label: "Writing a birth plan", href: "/articles/writing-a-birth-plan" },
      { label: "The space your baby will come home to", href: "/articles/the-space-your-baby-will-come-home-to" },
    ],
  },
];

