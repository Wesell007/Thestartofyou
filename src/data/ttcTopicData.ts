// ─── TTC Topic + Subtopic Data ─────────────────────────────────────────────
// Mirrors the structure of pregnancyTopicData.ts but adapted for TTC.
// Pillars use the full TTCTopicPage template; subtopics use the lighter
// TTCSubtopicPage template. The hub also derives its card library from this.

export type TTCPillarSlug =
  | "ovulation"
  | "preconception-health"
  | "fertility"
  | "ivf-and-treatment"
  | "male-fertility"
  | "age-and-fertility";

export type TTCSubtopicSlug =
  | "cycle-tracking"
  | "pregnancy-tests"
  | "two-week-wait"
  | "conditions";

export type TTCTopicSlug = TTCPillarSlug | TTCSubtopicSlug;

export interface TTCLink {
  label: string;
  href: string;
  image?: string;
}

export interface TTCGroup {
  label: string;
  description?: string;
  links: TTCLink[];
}

export interface TTCStartHere {
  title: string;
  href: string;
  why: string;
  image?: string;
}

export interface TTCPageConfig {
  slug: TTCTopicSlug;
  kind: "pillar" | "subtopic";
  parent?: TTCPillarSlug;
  eyebrow: string;
  title: string;
  intro: string;
  heroImage?: string;
  /** Raw HSL accent (no `hsl()`) for per-topic theming. */
  accentHsl: string;
  /** Soft tint for washes (raw HSL). */
  tintHsl: string;

  whatThisCovers: {
    lead: string;
    bullets: string[];
  };

  startHere: TTCStartHere[];
  groups: TTCGroup[];
  /** Honest note shown when a topic is intentionally curated tightly. */
  curationNote?: string;

  aiPrompts?: string[];
}

// Order matters for sibling chips on pillar pages.
export const TTC_PILLAR_ORDER: TTCPillarSlug[] = [
  "ovulation",
  "preconception-health",
  "fertility",
  "ivf-and-treatment",
  "male-fertility",
  "age-and-fertility",
];

export const TTC_SUBTOPIC_ORDER: TTCSubtopicSlug[] = [
  "cycle-tracking",
  "pregnancy-tests",
  "two-week-wait",
  "conditions",
];

// ─── Live URLs only (audited against articleData.ts + App routes) ─────────
const LIVE = {
  hub: "/trying-to-conceive",
  ovulation: "/trying-to-conceive/ovulation",
  preconception: "/trying-to-conceive/preconception-health",
  fertility: "/trying-to-conceive/fertility",
  ivfTopic: "/trying-to-conceive/ivf-and-treatment",
  male: "/trying-to-conceive/male-fertility",
  age: "/trying-to-conceive/age-and-fertility",
  cycleTracking: "/trying-to-conceive/cycle-tracking",
  pregnancyTests: "/trying-to-conceive/pregnancy-tests",
  twoWeekWait: "/trying-to-conceive/two-week-wait",
  conditions: "/trying-to-conceive/conditions",
  calculator: "/trying-to-conceive/ovulation-calculator",
  ivfPage: "/ivf",
  ivfTimelinePage: "/ivf-timeline",
  ask: "/ask",

  // Articles (live)
  signsOfOvulation: "/articles/signs-of-ovulation",
  twoWeekWaitArticle: "/articles/two-week-wait",
  ttcExplained: "/articles/trying-to-conceive-explained",
  implantationBleeding: "/articles/implantation-bleeding",
  earlySymptoms: "/articles/early-pregnancy-symptoms-explained",
  symptomsStopping: "/articles/symptoms-stopping-early-pregnancy",
  pregnancyAfterLoss: "/articles/pregnancy-after-loss",
  ivfTimelineArticle: "/articles/ivf-timeline-what-to-expect",
  emotionalIVF: "/articles/emotional-impact-of-ivf",
  emotionalWellbeing: "/articles/emotional-wellbeing-pregnancy",
  perinatalAnxiety: "/articles/perinatal-anxiety",

  // Phase M
  ovulationSigns: "/articles/ovulation-signs",
  fertileWindow: "/articles/fertile-window",
  implantationTiming: "/articles/how-long-implantation-takes",
  whenToTest: "/articles/when-to-take-a-pregnancy-test",
  faintPositive: "/articles/faint-positive-pregnancy-test",
  chemicalPregnancy: "/articles/chemical-pregnancy",
  tryingAgain: "/articles/trying-again-after-miscarriage",
  pregnantOnPeriod: "/articles/can-you-get-pregnant-on-your-period",
};

// ─── Pillar configs ───────────────────────────────────────────────────────

export const ttcPageConfigs: Record<TTCTopicSlug, TTCPageConfig> = {
  ovulation: {
    slug: "ovulation",
    kind: "pillar",
    eyebrow: "Ovulation",
    title: "Ovulation and your fertile window",
    accentHsl: "140 22% 42%",
    tintHsl: "145 28% 90%",
    intro:
      "Ovulation is the quiet, central event of a cycle. Knowing roughly when it happens, and what your body tends to show, makes trying to conceive feel less like guesswork and more like paying attention.",
    whatThisCovers: {
      lead: "What this topic covers:",
      bullets: [
        "How ovulation works and where it sits in your cycle.",
        "The signs your body may show around your fertile window.",
        "How to estimate your most fertile days.",
        "Why timing matters more than frequency.",
        "When irregular ovulation is worth raising with a clinician.",
      ],
    },
    startHere: [
      {
        title: "Signs of ovulation",
        href: LIVE.signsOfOvulation,
        why: "A grounded look at the body signs that often appear around the fertile window.",
      },
      {
        title: "Calculate your fertile window",
        href: LIVE.calculator,
        why: "A simple tool that uses your cycle dates to estimate your most fertile days.",
      },
      {
        title: "Trying to conceive, explained",
        href: LIVE.ttcExplained,
        why: "The wider picture — how cycles, ovulation, and timing fit together.",
      },
    ],
    groups: [
      {
        label: "Understanding ovulation",
        description: "What it is, when it happens, and why it matters.",
        links: [
          { label: "Signs of ovulation", href: LIVE.signsOfOvulation },
          { label: "Trying to conceive, explained", href: LIVE.ttcExplained },
        ],
      },
      {
        label: "Tracking and timing",
        description: "Practical ways to find your fertile days.",
        links: [
          { label: "Ovulation calculator", href: LIVE.calculator },
          { label: "Cycle tracking", href: LIVE.cycleTracking },
        ],
      },
    ],
    aiPrompts: [
      "When am I most fertile?",
      "How do I know I've ovulated?",
      "Is late ovulation normal?",
    ],
  },

  "preconception-health": {
    slug: "preconception-health",
    kind: "pillar",
    eyebrow: "Preconception health",
    title: "Preparing your body before pregnancy",
    accentHsl: "26 38% 52%",
    tintHsl: "30 45% 90%",
    intro:
      "Preconception health is less about perfection and more about giving your body a steady starting point — calmly, gradually, and without pressure.",
    whatThisCovers: {
      lead: "What this topic covers:",
      bullets: [
        "Small, steady steps that support fertility before pregnancy.",
        "Where folic acid and key nutrients fit in.",
        "Why calm, sustainable habits beat dramatic overhauls.",
        "When to think about a preconception conversation with a clinician.",
      ],
    },
    startHere: [
      {
        title: "Trying to conceive, explained",
        href: LIVE.ttcExplained,
        why: "A grounded overview of what to focus on before and as you start trying.",
      },
      {
        title: "Calculate your fertile window",
        href: LIVE.calculator,
        why: "Useful even before you start trying, to understand your cycle's shape.",
      },
      {
        title: "Ask a question",
        href: LIVE.ask,
        why: "Get a calm, evidence-aware answer to anything specific you're wondering about.",
      },
    ],
    groups: [
      {
        label: "Where to begin",
        description: "Foundational reading for the months before trying.",
        links: [
          { label: "Trying to conceive, explained", href: LIVE.ttcExplained },
          { label: "Cycle tracking", href: LIVE.cycleTracking },
        ],
      },
    ],
    curationNote:
      "More preconception guidance is on the way. For now, ask anything specific below or speak to your GP about a preconception check.",
    aiPrompts: [
      "What should I do before trying to conceive?",
      "When should I start taking folic acid?",
      "How long does it usually take to conceive?",
    ],
  },

  fertility: {
    slug: "fertility",
    kind: "pillar",
    eyebrow: "Fertility",
    title: "Fertility, conception, and getting support",
    accentHsl: "16 38% 52%",
    tintHsl: "20 45% 90%",
    intro:
      "Fertility is shaped by many things — age, health, cycle, timing, luck — and most of them are not about effort. This is a calm place to understand what affects conception and when extra support tends to help.",
    whatThisCovers: {
      lead: "What this topic covers:",
      bullets: [
        "What affects fertility and what to focus on first.",
        "How long it usually takes to conceive.",
        "When to think about seeking medical input.",
        "How testing, the two-week wait, and timing fit together.",
      ],
    },
    startHere: [
      {
        title: "Trying to conceive, explained",
        href: LIVE.ttcExplained,
        why: "The wider orientation — what fertility actually means month to month.",
      },
      {
        title: "The two-week wait",
        href: LIVE.twoWeekWaitArticle,
        why: "A grounded guide to the in-between time, where most TTC anxiety lives.",
      },
      {
        title: "Pregnancy testing in TTC",
        href: LIVE.pregnancyTests,
        why: "When to test, what early signs can mean, and how to read a result.",
      },
    ],
    groups: [
      {
        label: "Understanding fertility",
        links: [
          { label: "Trying to conceive, explained", href: LIVE.ttcExplained },
          { label: "Signs of ovulation", href: LIVE.signsOfOvulation },
        ],
      },
      {
        label: "When you're waiting and wondering",
        description: "The two-week wait, testing, and what early signs mean.",
        links: [
          { label: "The two-week wait", href: LIVE.twoWeekWaitArticle },
          { label: "Pregnancy testing in TTC", href: LIVE.pregnancyTests },
          { label: "Implantation bleeding", href: LIVE.implantationBleeding },
        ],
      },
      {
        label: "When to think about extra support",
        links: [
          { label: "Conditions that can affect TTC", href: LIVE.conditions },
          { label: "What is IVF?", href: LIVE.ivfPage },
        ],
      },
    ],
    aiPrompts: [
      "How long does it usually take to conceive?",
      "When should I see a doctor about fertility?",
      "What can affect fertility?",
    ],
  },

  "ivf-and-treatment": {
    slug: "ivf-and-treatment",
    kind: "pillar",
    eyebrow: "IVF & fertility treatment",
    title: "IVF and fertility treatment",
    accentHsl: "200 22% 44%",
    tintHsl: "200 30% 90%",
    intro:
      "Fertility treatment can feel like a different language. This is a calm starting point if you're exploring IVF or thinking about what assisted conception might involve.",
    whatThisCovers: {
      lead: "What this topic covers:",
      bullets: [
        "What IVF is and how a typical cycle is structured.",
        "What to expect emotionally as well as practically.",
        "When fertility treatment tends to be considered.",
        "Where to read more if you're at the start of this path.",
      ],
    },
    startHere: [
      {
        title: "What is IVF?",
        href: LIVE.ivfPage,
        why: "The grounded overview — what IVF involves and who it's usually for.",
      },
      {
        title: "IVF timeline: what to expect",
        href: LIVE.ivfTimelineArticle,
        why: "A clear walk-through of the stages of an IVF cycle.",
      },
      {
        title: "The emotional impact of IVF",
        href: LIVE.emotionalIVF,
        why: "Honest reading on the emotional side, which often gets sidelined.",
      },
    ],
    groups: [
      {
        label: "Starting points",
        links: [
          { label: "What is IVF?", href: LIVE.ivfPage },
          { label: "IVF timeline: what to expect", href: LIVE.ivfTimelineArticle },
          { label: "IVF timeline (interactive)", href: LIVE.ivfTimelinePage },
        ],
      },
      {
        label: "The emotional side",
        links: [
          { label: "The emotional impact of IVF", href: LIVE.emotionalIVF },
          { label: "Pregnancy after loss", href: LIVE.pregnancyAfterLoss },
        ],
      },
    ],
    aiPrompts: [
      "When is IVF usually considered?",
      "What does an IVF cycle involve?",
      "How do I cope emotionally with IVF?",
    ],
  },

  "male-fertility": {
    slug: "male-fertility",
    kind: "pillar",
    eyebrow: "Male fertility",
    title: "Male fertility",
    accentHsl: "150 18% 38%",
    tintHsl: "150 24% 90%",
    intro:
      "Conception is shared. This is a calm place to think about sperm health, lifestyle, and when male-side testing tends to be useful — without alarm and without the usual silence.",
    whatThisCovers: {
      lead: "What this topic covers:",
      bullets: [
        "Why male fertility matters as much as female fertility.",
        "Lifestyle factors that genuinely make a difference.",
        "When semen analysis tends to be considered.",
        "How to think about this side of things together.",
      ],
    },
    startHere: [
      {
        title: "Trying to conceive, explained",
        href: LIVE.ttcExplained,
        why: "The shared picture — how conception works and where male fertility sits.",
      },
      {
        title: "Ask a question",
        href: LIVE.ask,
        why: "Get a calm, evidence-aware answer to anything specific.",
      },
      {
        title: "Conditions that can affect TTC",
        href: LIVE.conditions,
        why: "An overview of health factors worth knowing about for both partners.",
      },
    ],
    groups: [
      {
        label: "Where to begin",
        links: [
          { label: "Trying to conceive, explained", href: LIVE.ttcExplained },
          { label: "Conditions that can affect TTC", href: LIVE.conditions },
        ],
      },
    ],
    curationNote:
      "Dedicated male-fertility guidance is on the way. For now, ask anything specific below — including about semen analysis or lifestyle.",
    aiPrompts: [
      "What affects sperm health?",
      "How does lifestyle affect male fertility?",
      "When should we get semen analysis?",
    ],
  },

  "age-and-fertility": {
    slug: "age-and-fertility",
    kind: "pillar",
    eyebrow: "Age & fertility",
    title: "Age and fertility",
    accentHsl: "342 28% 52%",
    tintHsl: "345 36% 92%",
    intro:
      "Age is one factor in fertility, not the whole story. This is a calm, sensitive place to understand what changes with time, and what tends to stay the same.",
    whatThisCovers: {
      lead: "What this topic covers:",
      bullets: [
        "What changes with age, and what doesn't.",
        "How to think about timing without panic.",
        "When age-related testing tends to be useful.",
        "Where extra support fits in.",
      ],
    },
    startHere: [
      {
        title: "Trying to conceive, explained",
        href: LIVE.ttcExplained,
        why: "The wider picture, including how age fits into conception.",
      },
      {
        title: "What is IVF?",
        href: LIVE.ivfPage,
        why: "Helpful background if you're thinking about timing and possible options.",
      },
      {
        title: "Ask a question",
        href: LIVE.ask,
        why: "For anything specific to your situation that doesn't have a tidy article.",
      },
    ],
    groups: [
      {
        label: "Reading to start with",
        links: [
          { label: "Trying to conceive, explained", href: LIVE.ttcExplained },
          { label: "What is IVF?", href: LIVE.ivfPage },
          { label: "Conditions that can affect TTC", href: LIVE.conditions },
        ],
      },
    ],
    curationNote:
      "More age-specific guidance is on the way. For now, ask anything specific below — your situation matters more than the average.",
    aiPrompts: [
      "How does age affect fertility?",
      "When should I think about getting tested?",
      "What is AMH testing?",
    ],
  },

  // ─── Subtopics ────────────────────────────────────────────────────────

  "cycle-tracking": {
    slug: "cycle-tracking",
    kind: "subtopic",
    parent: "ovulation",
    eyebrow: "Cycle tracking",
    title: "Cycle tracking",
    accentHsl: "140 22% 42%",
    tintHsl: "145 28% 90%",
    intro:
      "You don't need to track everything. A few honest signals — your dates, how you feel, what your body is doing — tend to tell you more than a dozen apps.",
    whatThisCovers: {
      lead: "What this subtopic covers:",
      bullets: [
        "What's worth tracking, and what isn't.",
        "How to think about cycle length and variation.",
        "How tracking connects to ovulation and the fertile window.",
      ],
    },
    startHere: [
      {
        title: "Signs of ovulation",
        href: LIVE.signsOfOvulation,
        why: "The body signs you can quietly notice without obsessing.",
      },
      {
        title: "Calculate your fertile window",
        href: LIVE.calculator,
        why: "Use your cycle dates to estimate your most fertile days.",
      },
      {
        title: "Trying to conceive, explained",
        href: LIVE.ttcExplained,
        why: "How cycles, ovulation, and timing fit together.",
      },
    ],
    groups: [
      {
        label: "Practical basics",
        links: [
          { label: "Signs of ovulation", href: LIVE.signsOfOvulation },
          { label: "Ovulation calculator", href: LIVE.calculator },
        ],
      },
      {
        label: "Going a little deeper",
        links: [
          { label: "Trying to conceive, explained", href: LIVE.ttcExplained },
        ],
      },
    ],
    aiPrompts: [
      "How do I track my cycle?",
      "Is an irregular cycle a problem?",
      "What's a normal cycle length?",
    ],
  },

  "pregnancy-tests": {
    slug: "pregnancy-tests",
    kind: "subtopic",
    parent: "fertility",
    eyebrow: "Pregnancy testing in TTC",
    title: "Pregnancy testing in TTC",
    accentHsl: "16 38% 52%",
    tintHsl: "20 45% 90%",
    intro:
      "When to test, what early signs can mean, and how to read a result without spiralling. This is testing held inside the trying-to-conceive picture, not confirmed-pregnancy content.",
    whatThisCovers: {
      lead: "What this subtopic covers:",
      bullets: [
        "When testing is most likely to give you a real answer.",
        "What early body signs can — and can't — tell you.",
        "How to think about a faint line, a negative, or implantation-style bleeding.",
      ],
    },
    startHere: [
      {
        title: "Implantation bleeding",
        href: LIVE.implantationBleeding,
        why: "What it is, what it isn't, and why it gets confused with a period.",
      },
      {
        title: "Early pregnancy symptoms explained",
        href: LIVE.earlySymptoms,
        why: "Grounded reading on the symptoms that often appear before a missed period.",
      },
      {
        title: "The two-week wait",
        href: LIVE.twoWeekWaitArticle,
        why: "Holds testing inside the wider waiting experience.",
      },
    ],
    groups: [
      {
        label: "Reading the signs",
        links: [
          { label: "Implantation bleeding", href: LIVE.implantationBleeding },
          { label: "Early pregnancy symptoms explained", href: LIVE.earlySymptoms },
        ],
      },
      {
        label: "When the result feels heavy",
        links: [
          { label: "The two-week wait", href: LIVE.twoWeekWaitArticle },
          { label: "When pregnancy symptoms stop", href: LIVE.symptomsStopping },
          { label: "Pregnancy after loss", href: LIVE.pregnancyAfterLoss },
        ],
      },
    ],
    aiPrompts: [
      "When should I take a pregnancy test?",
      "What does a faint line mean?",
      "Is it implantation bleeding or my period?",
    ],
  },

  "two-week-wait": {
    slug: "two-week-wait",
    kind: "subtopic",
    parent: "fertility",
    eyebrow: "The two-week wait",
    title: "The two-week wait",
    accentHsl: "16 38% 52%",
    tintHsl: "20 45% 90%",
    intro:
      "The days between ovulation and being able to test are where most of trying-to-conceive lives — emotionally. This is a calm space to move through it without pretending it's easy.",
    whatThisCovers: {
      lead: "What this subtopic covers:",
      bullets: [
        "What's actually happening in your body during the wait.",
        "Why symptoms in this window are so hard to read.",
        "How to keep your mind steady when the wait is loud.",
      ],
    },
    startHere: [
      {
        title: "The two-week wait",
        href: LIVE.twoWeekWaitArticle,
        why: "The cornerstone read for understanding what this stretch really is.",
      },
      {
        title: "Implantation bleeding",
        href: LIVE.implantationBleeding,
        why: "Often the biggest source of two-week-wait confusion.",
      },
      {
        title: "Pregnancy testing in TTC",
        href: LIVE.pregnancyTests,
        why: "When to test, and how to read what you see.",
      },
    ],
    groups: [
      {
        label: "Worries during the wait",
        description: "The questions that tend to surface in these days.",
        links: [
          { label: "When pregnancy symptoms stop", href: LIVE.symptomsStopping },
          { label: "Implantation bleeding", href: LIVE.implantationBleeding },
        ],
      },
      {
        label: "After a difficult cycle",
        links: [
          { label: "Pregnancy after loss", href: LIVE.pregnancyAfterLoss },
          { label: "The emotional impact of IVF", href: LIVE.emotionalIVF },
        ],
      },
    ],
    aiPrompts: [
      "How do I cope with the two-week wait?",
      "Why have my symptoms stopped?",
      "What if this cycle wasn't the one?",
    ],
  },

  conditions: {
    slug: "conditions",
    kind: "subtopic",
    parent: "fertility",
    eyebrow: "Conditions that can affect TTC",
    title: "Conditions that can affect TTC",
    accentHsl: "200 22% 44%",
    tintHsl: "200 30% 90%",
    intro:
      "Some health factors can shape how trying to conceive feels and unfolds. This is a calm overview, not a diagnosis — and a clear reminder that getting checked is a kind thing to do.",
    whatThisCovers: {
      lead: "What this subtopic covers:",
      bullets: [
        "Common health factors that can affect fertility.",
        "Why getting checked early is rarely the wrong move.",
        "When to bring something up with your GP or a clinician.",
      ],
    },
    startHere: [
      {
        title: "Trying to conceive, explained",
        href: LIVE.ttcExplained,
        why: "Background reading before going deeper into specific factors.",
      },
      {
        title: "What is IVF?",
        href: LIVE.ivfPage,
        why: "Useful context if conditions are part of why treatment is being discussed.",
      },
      {
        title: "Ask a question",
        href: LIVE.ask,
        why: "For anything specific to your health that doesn't have a tidy article.",
      },
    ],
    groups: [
      {
        label: "Where to start",
        links: [
          { label: "Trying to conceive, explained", href: LIVE.ttcExplained },
          { label: "What is IVF?", href: LIVE.ivfPage },
        ],
      },
    ],
    curationNote:
      "Condition-specific guidance (PCOS, endometriosis, thyroid, fibroids) is on the way. For now, ask anything specific below or speak to your GP.",
    aiPrompts: [
      "Could PCOS be affecting my chances?",
      "Does endometriosis affect fertility?",
      "When should I ask my GP about fertility tests?",
    ],
  },
};

// ─── Hub-card library (derived) ───────────────────────────────────────────
// Preserves the shape used by TTCHub.tsx so the hub keeps working.

export interface TTCArticleLink {
  label: string;
  href: string;
}
export interface TTCTopic {
  slug: TTCTopicSlug;
  kind: "pillar" | "subtopic";
  label: string;
  description: string;
  mainHref: string;
  articles: TTCArticleLink[];
  viewAllLabel: string;
}

const labelFor: Record<TTCTopicSlug, string> = {
  ovulation: "Ovulation",
  "preconception-health": "Preconception health",
  fertility: "Fertility",
  "ivf-and-treatment": "IVF & fertility treatment",
  "male-fertility": "Male fertility",
  "age-and-fertility": "Age & fertility",
  "cycle-tracking": "Cycle tracking",
  "pregnancy-tests": "Pregnancy testing in TTC",
  "two-week-wait": "The two-week wait",
  conditions: "Conditions that can affect TTC",
};

const descriptionFor: Record<TTCTopicSlug, string> = {
  ovulation: "Understand ovulation, your fertile window, and when to focus.",
  "preconception-health": "Small, steady steps to support your body before pregnancy.",
  fertility: "How conception works, what affects it, and when to ask for support.",
  "ivf-and-treatment": "Calm starting points if you're exploring assisted conception.",
  "male-fertility": "Sperm health, lifestyle, and the male side of conception.",
  "age-and-fertility": "Sensitive, practical guidance on fertility through the years.",
  "cycle-tracking": "Track what's useful — without becoming obsessed with apps.",
  "pregnancy-tests": "When to test, what early signs mean, how to read a result.",
  "two-week-wait": "Move through the wait between ovulation and testing.",
  conditions: "Health factors that can shape trying to conceive.",
};

export const ttcTopics: TTCTopic[] = ([...TTC_PILLAR_ORDER, ...TTC_SUBTOPIC_ORDER] as TTCTopicSlug[]).map(
  (slug) => {
    const cfg = ttcPageConfigs[slug];
    return {
      slug,
      kind: cfg.kind,
      label: labelFor[slug],
      description: descriptionFor[slug],
      mainHref: `/trying-to-conceive/${slug}`,
      viewAllLabel: `View all ${labelFor[slug].toLowerCase()}`,
      articles: cfg.startHere.slice(0, 4).map((s) => ({ label: s.title, href: s.href })),
    };
  }
);
