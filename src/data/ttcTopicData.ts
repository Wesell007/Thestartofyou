// ─── TTC Topic + Subtopic Data ─────────────────────────────────────────────
// Mirrors the structure of pregnancyTopicData.ts but adapted for TTC.
// Pillars use the full TTCTopicPage template; subtopics use the lighter
// TTCSubtopicPage template. The hub also derives its card library from this.

export type TTCPillarSlug =
  | "ovulation"
  | "preconception-health"
  | "fertility";

export type TTCSubtopicSlug =
  | "cycle-tracking"
  | "pregnancy-tests"
  | "two-week-wait"
  | "conditions"
  | "ivf-and-treatment"
  | "male-fertility"
  | "age-and-fertility";

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
];

export const TTC_SUBTOPIC_ORDER: TTCSubtopicSlug[] = [
  "cycle-tracking",
  "two-week-wait",
  "pregnancy-tests",
  "age-and-fertility",
  "male-fertility",
  "ivf-and-treatment",
  "conditions",
];

// ─── Live URLs only (audited against articleData.ts + App routes) ─────────
const LIVE = {
  hub: "/trying-to-conceive",
  ovulation: "/trying-to-conceive/ovulation",
  preconception: "/trying-to-conceive/preconception-health",
  fertility: "/trying-to-conceive/fertility",
  ivfTopic: "/ivf",
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

  // Phase N (TTC de-dup gap fillers)
  howLongToTry: "/articles/how-long-to-try-before-getting-help",
  pcosTTC: "/articles/pcos-and-trying-to-conceive",
  endoTTC: "/articles/endometriosis-and-trying-to-conceive",

  // Phase O (TTC fertility deepening cluster)
  irregularPeriodsTTC: "/articles/irregular-periods-and-trying-to-conceive",
  fertilityTestsWomen: "/articles/fertility-tests-for-women",
  fertilityTestsMen: "/articles/fertility-tests-for-men",
  fertilityAppointment: "/articles/what-happens-at-a-fertility-appointment",
  amhTest: "/articles/amh-test-explained",

  // Phase 9.12a (TTC ovulation P0)
  howToKnowOvulating: "/articles/how-to-know-when-you-are-ovulating",
  understandingFertileWindow: "/articles/understanding-your-fertile-window",
  usingOvulationTests: "/articles/using-ovulation-tests",
  cervicalMucus: "/articles/cervical-mucus-and-fertility",

  // Phase 9.12b (TTC ovulation P1)
  lateOvulation: "/articles/late-ovulation-and-ttc",
  hardToPredictOvulation: "/articles/when-ovulation-is-hard-to-predict",
  timingSexTTC: "/articles/timing-sex-when-trying-to-conceive",
  basalBodyTemperature: "/articles/basal-body-temperature-tracking",

  // Phase 9.13a (TTC preconception health foundations)
  whatToDoBeforeTTC: "/articles/what-to-do-before-trying-to-conceive",
  folicAcidBeforePregnancy: "/articles/folic-acid-before-pregnancy",
  preconceptionVitamins: "/articles/preconception-vitamins",
  preconceptionGPAppointment: "/articles/preconception-gp-appointment",
  stoppingContraceptionTTC: "/articles/stopping-contraception-when-ttc",

  // Phase 9.13b (TTC preconception health completion)
  medicationReviewBeforePregnancy: "/articles/medication-review-before-pregnancy",
  lifestyleBeforePregnancy: "/articles/lifestyle-before-pregnancy",
  mentalWellbeingBeforePregnancy: "/articles/mental-wellbeing-before-pregnancy",
  partnerHealthBeforePregnancy: "/articles/partner-health-before-pregnancy",
  spermHealthBasics: "/articles/sperm-health-basics",

  // Phase 9.14 (TTC fertility and support)
  whenToAskFertilityHelp: "/articles/when-to-ask-for-fertility-help",
  unexplainedFertilityConcerns: "/articles/unexplained-fertility-concerns",
  ageAndTryingToConceive: "/articles/age-and-trying-to-conceive",
  maleFertilityWhenTTC: "/articles/male-fertility-when-trying-to-conceive",
  movingFromTTCToIVF: "/articles/moving-from-ttc-to-ivf",

  // Phase 9.16 (TTC pregnancy tests + two week wait expansion)
  testingTooEarly: "/articles/testing-too-early",
  negativeTestNoPeriod: "/articles/negative-test-but-no-period",
  evaporationLineFaintPositive: "/articles/evaporation-line-or-faint-positive",
  twoWeekWaitSymptoms: "/articles/two-week-wait-symptoms",
  spottingTwoWeekWait: "/articles/spotting-during-the-two-week-wait",
  copingTwoWeekWait: "/articles/coping-with-the-two-week-wait",
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
        title: "Calculate your fertile window",
        href: LIVE.calculator,
        why: "A simple tool that uses your cycle dates to estimate your most fertile days.",
      },
    ],
    groups: [
      {
        label: "Understanding ovulation",
        description: "What ovulation is, when it happens, and what your body may show.",
        links: [
          { label: "How to know when you are ovulating", href: LIVE.howToKnowOvulating },
          { label: "Ovulation signs", href: LIVE.ovulationSigns },
          { label: "Understanding your fertile window", href: LIVE.understandingFertileWindow },
          { label: "The fertile window", href: LIVE.fertileWindow },
        ],
      },
      {
        label: "Tracking and timing",
        description: "Practical ways to notice your fertile window without pressure.",
        links: [
          { label: "How to use ovulation tests", href: LIVE.usingOvulationTests },
          { label: "Cervical mucus and fertility", href: LIVE.cervicalMucus },
          { label: "Basal body temperature tracking", href: LIVE.basalBodyTemperature },
          { label: "Cycle tracking", href: LIVE.cycleTracking },
          { label: "Ovulation calculator", href: LIVE.calculator },
        ],
      },
      {
        label: "When timing feels unclear",
        description: "Support for cycles, signs or timing that do not feel easy to read.",
        links: [
          { label: "Late ovulation and trying to conceive", href: LIVE.lateOvulation },
          { label: "When ovulation is hard to predict", href: LIVE.hardToPredictOvulation },
          { label: "Timing sex when trying to conceive", href: LIVE.timingSexTTC },
          { label: "Irregular periods and trying to conceive", href: LIVE.irregularPeriodsTTC },
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
        label: "Start with the basics",
        description: "The first steps that can help you prepare before trying to conceive.",
        links: [
          { label: "What to do before trying to conceive", href: LIVE.whatToDoBeforeTTC },
          { label: "Folic acid before pregnancy", href: LIVE.folicAcidBeforePregnancy },
          { label: "Vitamins before pregnancy", href: LIVE.preconceptionVitamins },
          { label: "Lifestyle before pregnancy", href: LIVE.lifestyleBeforePregnancy },
        ],
      },
      {
        label: "Health checks and planning",
        description: "When it may help to review your health, medicines or next steps with a professional.",
        links: [
          { label: "Preconception GP appointment", href: LIVE.preconceptionGPAppointment },
          { label: "Medication review before pregnancy", href: LIVE.medicationReviewBeforePregnancy },
          { label: "Stopping contraception when trying to conceive", href: LIVE.stoppingContraceptionTTC },
          { label: "Cycle tracking", href: LIVE.cycleTracking },
        ],
      },
      {
        label: "Everyday health and support",
        description: "Wider parts of preconception: mental wellbeing, partner health and sperm health basics.",
        links: [
          { label: "Mental wellbeing before pregnancy", href: LIVE.mentalWellbeingBeforePregnancy },
          { label: "Partner health before pregnancy", href: LIVE.partnerHealthBeforePregnancy },
          { label: "Sperm health basics", href: LIVE.spermHealthBasics },
        ],
      },
    ],
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
        title: "How long to try before getting help",
        href: LIVE.howLongToTry,
        why: "Honest UK guidance on when fertility help becomes a sensible next step.",
      },
    ],
    groups: [
      {
        label: "When to ask for support",
        description: "How to know when speaking to a GP or fertility clinic tends to help.",
        links: [
          { label: "How long to try before getting help", href: LIVE.howLongToTry },
          { label: "When to ask for fertility help", href: LIVE.whenToAskFertilityHelp },
          { label: "Preconception GP appointment", href: LIVE.preconceptionGPAppointment },
          { label: "When fertility feels unexplained", href: LIVE.unexplainedFertilityConcerns },
          { label: "Irregular periods and trying to conceive", href: LIVE.irregularPeriodsTTC },
        ],
      },
      {
        label: "Understanding fertility factors",
        description: "The parts of the picture worth understanding calmly, together.",
        links: [
          { label: "Age and trying to conceive", href: LIVE.ageAndTryingToConceive },
          { label: "Male fertility when trying to conceive", href: LIVE.maleFertilityWhenTTC },
          { label: "Sperm health basics", href: LIVE.spermHealthBasics },
          { label: "Fertility tests for men", href: LIVE.fertilityTestsMen },
          { label: "Fertility tests for women", href: LIVE.fertilityTestsWomen },
          { label: "AMH test explained", href: LIVE.amhTest },
        ],
      },
      {
        label: "Tests, treatment and next steps",
        description: "What investigations, treatment conversations and next steps can look like.",
        links: [
          { label: "What happens at a fertility appointment", href: LIVE.fertilityAppointment },
          { label: "Moving from TTC to IVF", href: LIVE.movingFromTTCToIVF },
          { label: "IVF and treatment", href: LIVE.ivfPage },
          { label: "Pregnancy after loss", href: LIVE.pregnancyAfterLoss },
          { label: "The two-week wait", href: LIVE.twoWeekWait },
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
    kind: "subtopic",
    parent: "fertility",
    eyebrow: "IVF and fertility treatment",
    title: "When IVF becomes the next step",
    accentHsl: "200 22% 44%",
    tintHsl: "200 30% 90%",
    intro:
      "If treatment is now part of your path, IVF can feel like a big shift in language, pace, and emotion. This page gives you a calm starting point, so you can understand what happens next without having to absorb everything at once.",
    whatThisCovers: {
      lead: "What this topic covers:",
      bullets: [
        "What IVF is and how treatment is usually structured",
        "Where to begin if this is your first cycle",
        "How the stages fit together without overwhelm",
        "Where to go for practical and emotional support",
      ],
    },
    startHere: [
      {
        title: "What IVF is",
        href: LIVE.ivfPage,
        why: "A clear overview of how treatment is structured, from protocol through to early pregnancy.",
      },
      {
        title: "IVF timeline: what to expect",
        href: LIVE.ivfTimelineArticle,
        why: "A walk-through of the stages of a typical cycle, so you know what to expect and when.",
      },
    ],
    groups: [
      {
        label: "If treatment is the next step",
        description: "A calm place to begin understanding IVF and what comes next.",
        links: [
          { label: "What IVF involves", href: LIVE.ivfPage },
          { label: "IVF timeline: what to expect", href: LIVE.ivfTimelineArticle },
          { label: "IVF timeline (interactive)", href: LIVE.ivfTimelinePage },
          { label: "The emotional impact of IVF", href: LIVE.emotionalIVF },
        ],
      },
    ],
    curationNote:
      "Take your time. When you are ready, the next step is just ahead.",
    aiPrompts: [
      "When is IVF usually considered?",
      "What does an IVF cycle involve?",
      "How do I cope emotionally with IVF?",
    ],
  },

  "male-fertility": {
    slug: "male-fertility",
    kind: "subtopic",
    parent: "fertility",
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
        title: "Male fertility when trying to conceive",
        href: LIVE.maleFertilityWhenTTC,
        why: "A calm overview of the male side of conception and what genuinely helps.",
      },
      {
        title: "Sperm health basics",
        href: LIVE.spermHealthBasics,
        why: "What sperm health means in practice and where lifestyle can help.",
      },
      {
        title: "Fertility tests for men",
        href: LIVE.fertilityTestsMen,
        why: "What semen analysis involves and when it tends to be considered.",
      },
    ],
    groups: [
      {
        label: "Health and support before pregnancy",
        links: [
          { label: "Partner health before pregnancy", href: LIVE.partnerHealthBeforePregnancy },
          { label: "Lifestyle before pregnancy", href: LIVE.lifestyleBeforePregnancy },
        ],
      },
      {
        label: "Tests and next steps",
        links: [
          { label: "What happens at a fertility appointment", href: LIVE.fertilityAppointment },
          { label: "Conditions that can affect TTC", href: LIVE.conditions },
          { label: "Ask a question", href: LIVE.ask },
        ],
      },
    ],
    aiPrompts: [
      "What affects sperm health?",
      "How does lifestyle affect male fertility?",
      "When should we get semen analysis?",
    ],
  },

  "age-and-fertility": {
    slug: "age-and-fertility",
    kind: "subtopic",
    parent: "fertility",
    eyebrow: "Age and fertility",
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
        title: "Age and trying to conceive",
        href: LIVE.ageAndTryingToConceive,
        why: "What the evidence actually says about age and fertility, without alarm.",
      },
      {
        title: "When to ask for fertility help",
        href: LIVE.whenToAskFertilityHelp,
        why: "Honest UK guidance on when it's reasonable to bring fertility into a GP conversation.",
      },
      {
        title: "Preconception GP appointment",
        href: LIVE.preconceptionGPAppointment,
        why: "What a preconception check-in with your GP can cover.",
      },
    ],
    groups: [
      {
        label: "Common questions",
        links: [
          { label: "How long to try before getting help", href: LIVE.howLongToTry },
          { label: "AMH test explained", href: LIVE.amhTest },
          { label: "What happens at a fertility appointment", href: LIVE.fertilityAppointment },
          { label: "What is IVF?", href: LIVE.ivfPage },
        ],
      },
    ],
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
        title: "Calculate your fertile window",
        href: LIVE.calculator,
        why: "Use your cycle dates to estimate your most fertile days.",
      },
      {
        title: "How to know when you are ovulating",
        href: LIVE.howToKnowOvulating,
        why: "The most reliable signals your body gives around ovulation.",
      },
      {
        title: "Understanding your fertile window",
        href: LIVE.understandingFertileWindow,
        why: "What the fertile window is and how tracking connects to it.",
      },
    ],
    groups: [
      {
        label: "Tracking your cycle",
        links: [
          { label: "Ovulation signs", href: LIVE.ovulationSigns },
          { label: "Cervical mucus and fertility", href: LIVE.cervicalMucus },
          { label: "Basal body temperature tracking", href: LIVE.basalBodyTemperature },
          { label: "Using ovulation tests", href: LIVE.usingOvulationTests },
        ],
      },
      {
        label: "When cycles are unclear",
        links: [
          { label: "Irregular periods and trying to conceive", href: LIVE.irregularPeriodsTTC },
          { label: "Late ovulation and TTC", href: LIVE.lateOvulation },
          { label: "When ovulation is hard to predict", href: LIVE.hardToPredictOvulation },
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
        title: "When to take a pregnancy test",
        href: LIVE.whenToTest,
        why: "Timing your test so the result is as reliable as possible.",
      },
      {
        title: "Implantation bleeding",
        href: LIVE.implantationBleeding,
        why: "What it is, what it isn't, and why it gets confused with a period.",
      },
      {
        title: "Faint positive pregnancy test",
        href: LIVE.faintPositive,
        why: "How to read a faint line without spiralling.",
      },
    ],
    groups: [
      {
        label: "Timing your test",
        links: [
          { label: "When to take a pregnancy test", href: LIVE.whenToTest },
          { label: "Testing too early", href: LIVE.testingTooEarly },
        ],
      },
      {
        label: "Reading what you see",
        description: "Interpreting unclear results, ambiguous symptoms, and testing when the moment feels heavy.",
        links: [
          { label: "Faint positive pregnancy test", href: LIVE.faintPositive },
          { label: "Evaporation line or faint positive", href: LIVE.evaporationLineFaintPositive },
          { label: "Implantation bleeding", href: LIVE.implantationBleeding },
          { label: "Negative test but no period", href: LIVE.negativeTestNoPeriod },
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
        why: "A calm walk-through of what's happening and how to move through it.",
      },
      {
        title: "Pregnancy testing in TTC",
        href: LIVE.pregnancyTests,
        why: "When to test, and how to read what you see.",
      },
      {
        title: "Implantation bleeding",
        href: LIVE.implantationBleeding,
        why: "Often the biggest source of two-week-wait confusion.",
      },
    ],
    groups: [
      {
        label: "Worries during the wait",
        description: "The emotional and physical questions that surface in these days, and how to hold them.",
        links: [
          { label: "Two week wait symptoms", href: LIVE.twoWeekWaitSymptoms },
          { label: "Spotting during the two week wait", href: LIVE.spottingTwoWeekWait },
          { label: "Coping with the two week wait", href: LIVE.copingTwoWeekWait },
          { label: "Early pregnancy symptoms explained", href: LIVE.earlySymptoms },
        ],
      },
      {
        label: "When you're ready to test",
        description: "Continue into the testing subtopic for timing and result reading.",
        links: [
          { label: "Pregnancy testing in TTC", href: LIVE.pregnancyTests },
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
        title: "PCOS and trying to conceive",
        href: LIVE.pcosTTC,
        why: "What PCOS means for ovulation and conception, and where to start.",
      },
      {
        title: "Irregular periods and trying to conceive",
        href: LIVE.irregularPeriodsTTC,
        why: "When cycle variation is worth investigating, and what tends to help.",
      },
      {
        title: "When to ask for fertility help",
        href: LIVE.whenToAskFertilityHelp,
        why: "Honest UK guidance on when to bring fertility into a GP conversation.",
      },
    ],
    groups: [
      {
        label: "Specific conditions",
        links: [
          { label: "PCOS and trying to conceive", href: LIVE.pcosTTC },
          { label: "Endometriosis and trying to conceive", href: LIVE.endoTTC },
          { label: "Irregular periods and trying to conceive", href: LIVE.irregularPeriodsTTC },
        ],
      },
      {
        label: "Knowing when to seek support",
        links: [
          { label: "How long to try before getting help", href: LIVE.howLongToTry },
          { label: "What happens at a fertility appointment", href: LIVE.fertilityAppointment },
          { label: "Fertility tests for women", href: LIVE.fertilityTestsWomen },
          { label: "Fertility tests for men", href: LIVE.fertilityTestsMen },
          { label: "Trying again after miscarriage", href: LIVE.tryingAgain },
        ],
      },
    ],
    curationNote:
      "Thyroid and fibroid-specific guidance is on the way. For anything specific, ask below or speak to your GP.",
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
  "ivf-and-treatment": "IVF and fertility treatment",
  "male-fertility": "Male fertility",
  "age-and-fertility": "Age and fertility",
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
