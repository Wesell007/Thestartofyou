// ─── IVF Topic Data ───────────────────────────────────────────────────
// Three IVF stage topics that mirror TTC/Pregnancy topic-page depth.
//
// Ownership rules (this file enforces them):
//   • Before transfer  → IVF + light fertility prep (no TTC bounce)
//   • After transfer   → IVF-owned waiting, symptoms, testing, results
//   • Early pregnancy  → IVF-owned cautious progress, then gentle handover
//                        to Pregnancy. Never bounce back to TTC.
//
// Anything explicitly TTC-coded (e.g. "trying again after miscarriage") is
// intentionally NOT surfaced inside IVF stage groups. If a user needs that
// content they reach it through Support, not through an IVF stage.

import ivfBeforeImg from "@/assets/ivf-stage-before.jpg";
import ivfAfterImg from "@/assets/ivf-stage-after.jpg";
import ivfEarlyImg from "@/assets/ivf-stage-early.jpg";

export type IVFTopicSlug = "before-transfer" | "after-transfer" | "early-pregnancy";

export interface IVFLink {
  label: string;
  href: string;
}

export interface IVFGroup {
  label: string;
  description?: string;
  links: IVFLink[];
}

export interface IVFStartHere {
  title: string;
  why: string;
  href: string;
}

export interface IVFEmotionalNote {
  eyebrow: string;
  quote: string;
  body: string;
}

export interface IVFTopicConfig {
  slug: IVFTopicSlug;
  eyebrow: string;
  stageIndicator: string;
  title: string;
  intro: string;
  heroImage: string;

  whatThisCovers: { lead: string; bullets: string[] };
  startHere: IVFStartHere[];
  groups: IVFGroup[];
  curationNote?: string;
  emotionalNote: IVFEmotionalNote;
  aiPrompts: string[];

  prevTopic?: { label: string; href: string };
  nextTopic?: { label: string; href: string };
}

export const IVF_TOPIC_ORDER: IVFTopicSlug[] = [
  "before-transfer",
  "after-transfer",
  "early-pregnancy",
];

// Shared accent (lilac) for all three IVF topic pages.
export const IVF_ACCENT_HSL = "275 36% 56%";
export const IVF_TINT_HSL = "275 22% 94%";

const LINKS = {
  hub: "/ivf",
  before: "/ivf/before-transfer",
  after: "/ivf/after-transfer",
  early: "/ivf/early-pregnancy",
  timeline: "/ivf-timeline",
  pregnancy: "/pregnancy",
  support: "/support",
  ask: "/ask",
  // Live articles
  ivfTimeline: "/articles/ivf-timeline-what-to-expect",
  emotionalIVF: "/articles/emotional-impact-of-ivf",
  twoWeekWait: "/articles/two-week-wait",
  whenToTest: "/articles/when-to-take-a-pregnancy-test",
  faintPositive: "/articles/faint-positive-pregnancy-test",
  earlySymptoms: "/articles/early-pregnancy-symptoms-explained",
  symptomsStopping: "/articles/symptoms-stopping-early-pregnancy",
  implantation: "/articles/implantation-bleeding",
  howLongImplantation: "/articles/how-long-implantation-takes",
  chemical: "/articles/chemical-pregnancy",
  afterLoss: "/articles/pregnancy-after-loss",
  perinatalAnxiety: "/articles/perinatal-anxiety",
  emotionalWellbeing: "/articles/emotional-wellbeing-pregnancy",
  anxietyInPregnancy: "/articles/anxiety-in-pregnancy",
  bleedingEarly: "/articles/bleeding-in-early-pregnancy",
  fatigueEarly: "/articles/fatigue-in-early-pregnancy",
  nauseaEarly: "/articles/nausea-in-early-pregnancy",
  fertilityTestsWomen: "/articles/fertility-tests-for-women",
  fertilityTestsMen: "/articles/fertility-tests-for-men",
  fertilityAppt: "/articles/what-happens-at-a-fertility-appointment",
  testsScans: "/articles/tests-and-scans-in-pregnancy",
};

export const ivfTopicConfigs: Record<IVFTopicSlug, IVFTopicConfig> = {
  "before-transfer": {
    slug: "before-transfer",
    eyebrow: "Before transfer",
    stageIndicator: "Stage 1 of 3",
    title: "Before transfer",
    intro:
      "Preparation, medication, monitoring, and getting ready physically and mentally for transfer day.",
    heroImage: ivfBeforeImg,
    whatThisCovers: {
      lead:
        "Everything that helps you feel oriented and steady through the weeks of preparation, scans, injections, and decisions before transfer.",
      bullets: [
        "What IVF actually involves, step by step",
        "Medication, injections, and how to follow your protocol",
        "Scans, blood tests, and how to read your monitoring",
        "Egg collection, fertilisation, and embryo grading basics",
        "Practical and physical preparation for transfer day",
        "Holding emotional steadiness through the prep weeks",
      ],
    },
    startHere: [
      {
        title: "IVF timeline, what to expect",
        why: "A clear overview of the full process so the unknown feels less heavy.",
        href: LINKS.ivfTimeline,
      },
      {
        title: "The emotional impact of IVF",
        why: "Why this stage often feels heavier than it looks, and what helps.",
        href: LINKS.emotionalIVF,
      },
      {
        title: "Track your IVF timeline",
        why: "Add your transfer date and follow your personal milestones day by day.",
        href: LINKS.timeline,
      },
    ],
    groups: [
      {
        label: "Understanding IVF",
        description: "Orient yourself before going deeper into your protocol.",
        links: [
          { label: "IVF timeline, what to expect", href: LINKS.ivfTimeline },
          { label: "The emotional impact of IVF", href: LINKS.emotionalIVF },
          { label: "Fertility tests for women", href: LINKS.fertilityTestsWomen },
          { label: "Fertility tests for men", href: LINKS.fertilityTestsMen },
        ],
      },
      {
        label: "Medication, monitoring & appointments",
        description: "Following your protocol with less mental load.",
        links: [
          { label: "What happens at a fertility appointment", href: LINKS.fertilityAppt },
          { label: "Track your IVF timeline", href: LINKS.timeline },
          { label: "Ask about a medication or scan", href: LINKS.ask },
        ],
      },
      {
        label: "Procedures & preparation",
        description: "Egg collection, embryo transfer, and the days around them.",
        links: [
          { label: "IVF timeline, what to expect", href: LINKS.ivfTimeline },
          { label: "Track your transfer day", href: LINKS.timeline },
          { label: "Ask anything about transfer prep", href: LINKS.ask },
        ],
      },
      {
        label: "Preparing emotionally",
        description: "Looking after yourself through the lead-up.",
        links: [
          { label: "The emotional impact of IVF", href: LINKS.emotionalIVF },
          { label: "Perinatal anxiety", href: LINKS.perinatalAnxiety },
          { label: "Find support for hard moments", href: LINKS.support },
        ],
      },
    ],
    curationNote:
      "We keep IVF guidance tightly curated — fewer routes, written for the stage you are in right now.",
    emotionalNote: {
      eyebrow: "Holding the lead-up",
      quote: "Preparation is not a performance. Showing up is already the work.",
      body: "Before transfer asks a lot quietly. Consistency, patience, and small daily acts of care are doing more than they look like they are.",
    },
    aiPrompts: [
      "What matters most before transfer?",
      "How strict does medication timing need to be?",
      "How do I prepare for transfer day?",
      "How do I manage the stress of protocols?",
    ],
    nextTopic: { label: "After transfer", href: LINKS.after },
  },

  "after-transfer": {
    slug: "after-transfer",
    eyebrow: "After transfer",
    stageIndicator: "Stage 2 of 3",
    title: "After transfer",
    intro:
      "The waiting period — often the most uncertain stage, where questions and emotions can feel heightened.",
    heroImage: ivfAfterImg,
    whatThisCovers: {
      lead:
        "Guidance for the two-week wait, symptom-checking, testing, and the emotional weight of not yet knowing.",
      bullets: [
        "What the two-week wait actually feels like after IVF",
        "What early symptoms might mean — and not mean",
        "When and how to test, and how to read the result",
        "Implantation, faint lines, and bleeding interpretation",
        "Waiting emotionally without losing yourself in it",
        "Holding both outcomes gently before you know",
      ],
    },
    startHere: [
      {
        title: "The two-week wait",
        why: "Why this stage feels so loud after IVF, and how to move through it.",
        href: LINKS.twoWeekWait,
      },
      {
        title: "When to take a pregnancy test",
        why: "Timing that protects you from false reassurance and false worry.",
        href: LINKS.whenToTest,
      },
      {
        title: "Early pregnancy symptoms explained",
        why: "Honest framing on what symptoms can and cannot tell you yet.",
        href: LINKS.earlySymptoms,
      },
    ],
    groups: [
      {
        label: "The two-week wait",
        description: "Holding yourself through the longest short stretch.",
        links: [
          { label: "The two-week wait", href: LINKS.twoWeekWait },
          { label: "How long implantation takes", href: LINKS.howLongImplantation },
          { label: "Ask anything during the wait", href: LINKS.ask },
        ],
      },
      {
        label: "Symptoms, signals & testing",
        description: "Interpreting your body without spiralling.",
        links: [
          { label: "Early pregnancy symptoms explained", href: LINKS.earlySymptoms },
          { label: "When to take a pregnancy test", href: LINKS.whenToTest },
          { label: "Faint positive pregnancy test", href: LINKS.faintPositive },
          { label: "Implantation bleeding", href: LINKS.implantation },
          { label: "Symptoms stopping suddenly", href: LINKS.symptomsStopping },
        ],
      },
      {
        label: "Coping with uncertainty",
        description: "Steadiness when nothing is confirmed yet.",
        links: [
          { label: "The emotional impact of IVF", href: LINKS.emotionalIVF },
          { label: "Perinatal anxiety", href: LINKS.perinatalAnxiety },
          { label: "Anxiety in pregnancy", href: LINKS.anxietyInPregnancy },
          { label: "Find support for hard moments", href: LINKS.support },
        ],
      },
      {
        label: "If results bring difficult news",
        description: "Held honestly. Stays within IVF and support.",
        links: [
          { label: "Chemical pregnancy", href: LINKS.chemical },
          { label: "Pregnancy after loss", href: LINKS.afterLoss },
          { label: "Find support for hard moments", href: LINKS.support },
        ],
      },
    ],
    emotionalNote: {
      eyebrow: "Holding the wait",
      quote: "Not knowing yet is part of the work, not a failure of nerve.",
      body: "Symptoms after transfer are rarely a verdict. Most of this stage is waiting with care, not control — and finding it hard reflects the stage, not your strength.",
    },
    aiPrompts: [
      "Is this symptom meaningful?",
      "When should I test?",
      "How do I get through the wait?",
      "What if my result isn't what I hoped?",
    ],
    prevTopic: { label: "Before transfer", href: LINKS.before },
    nextTopic: { label: "Early pregnancy", href: LINKS.early },
  },

  "early-pregnancy": {
    slug: "early-pregnancy",
    eyebrow: "Early pregnancy",
    stageIndicator: "Stage 3 of 3",
    title: "Early pregnancy",
    intro:
      "Cautious progress, monitoring, early scans, and the slow handover from IVF care into pregnancy.",
    heroImage: ivfEarlyImg,
    whatThisCovers: {
      lead:
        "Holding hope and caution together as you move from IVF care into early pregnancy.",
      bullets: [
        "Beta hCG tracking and what rising numbers mean",
        "Early IVF scans, milestones, and what each one signals",
        "Common early symptoms — and ones to flag",
        "Holding cautious progress without forcing certainty",
        "Bleeding, spotting and what is and isn't worrying",
        "When and how IVF care hands over to pregnancy care",
      ],
    },
    startHere: [
      {
        title: "Early pregnancy symptoms explained",
        why: "An honest read on what your body may and may not show.",
        href: LINKS.earlySymptoms,
      },
      {
        title: "Emotional wellbeing in pregnancy",
        why: "Steadiness when relief and worry keep arriving together.",
        href: LINKS.emotionalWellbeing,
      },
      {
        title: "Bleeding in early pregnancy",
        why: "Clear, calm guidance on what spotting after IVF may mean.",
        href: LINKS.bleedingEarly,
      },
    ],
    groups: [
      {
        label: "Monitoring & early scans",
        description: "Small checkpoints, one at a time.",
        links: [
          { label: "Tests and scans in pregnancy", href: LINKS.testsScans },
          { label: "Early pregnancy symptoms explained", href: LINKS.earlySymptoms },
          { label: "Symptoms stopping in early pregnancy", href: LINKS.symptomsStopping },
          { label: "Ask about a scan or result", href: LINKS.ask },
        ],
      },
      {
        label: "Symptoms in early IVF pregnancy",
        description: "What's common, what's reassuring, what to flag.",
        links: [
          { label: "Nausea in early pregnancy", href: LINKS.nauseaEarly },
          { label: "Fatigue in early pregnancy", href: LINKS.fatigueEarly },
          { label: "Bleeding in early pregnancy", href: LINKS.bleedingEarly },
          { label: "Implantation bleeding", href: LINKS.implantation },
        ],
      },
      {
        label: "Holding cautious progress",
        description: "Hope and caution can coexist here.",
        links: [
          { label: "The emotional impact of IVF", href: LINKS.emotionalIVF },
          { label: "Perinatal anxiety", href: LINKS.perinatalAnxiety },
          { label: "Anxiety in pregnancy", href: LINKS.anxietyInPregnancy },
          { label: "Emotional wellbeing in pregnancy", href: LINKS.emotionalWellbeing },
        ],
      },
      {
        label: "Handover into pregnancy care",
        description: "When IVF care gently steps back.",
        links: [
          { label: "Pregnancy hub", href: LINKS.pregnancy },
          { label: "Tests and scans in pregnancy", href: LINKS.testsScans },
          { label: "Ask about handover timing", href: LINKS.ask },
        ],
      },
      {
        label: "If things do not progress",
        description: "Held honestly, kept inside IVF and support.",
        links: [
          { label: "Chemical pregnancy", href: LINKS.chemical },
          { label: "Pregnancy after loss", href: LINKS.afterLoss },
          { label: "Find support for hard moments", href: LINKS.support },
        ],
      },
    ],
    emotionalNote: {
      eyebrow: "Cautious progress",
      quote: "You don't have to feel certain to be moving forward.",
      body: "Early pregnancy after IVF rarely lands as one big shift. It arrives in small checkpoints — and needing reassurance between them is part of the stage, not a sign anything is wrong.",
    },
    aiPrompts: [
      "Is it normal to still feel anxious?",
      "What should I expect between scans?",
      "How do I stay grounded right now?",
      "When does IVF care hand over to pregnancy care?",
    ],
    prevTopic: { label: "After transfer", href: LINKS.after },
    nextTopic: { label: "Pregnancy hub", href: LINKS.pregnancy },
  },
};
