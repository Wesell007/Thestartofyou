// ─── IVF Topic Data ───────────────────────────────────────────────────
// Three IVF stage topics that mirror the structure of TTC/Pregnancy
// topic pages: orientation → start here → grouped supporting routes →
// AI bridge → siblings. Visual identity stays lilac/white.

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
  chemical: "/articles/chemical-pregnancy",
  afterLoss: "/articles/pregnancy-after-loss",
  tryingAgain: "/articles/trying-again-after-miscarriage",
  perinatalAnxiety: "/articles/perinatal-anxiety",
  emotionalWellbeing: "/articles/emotional-wellbeing-pregnancy",
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
      lead: "Everything that helps you feel oriented and steady through the lead-up to transfer.",
      bullets: [
        "What IVF actually involves, step by step",
        "Medication, injections, and monitoring",
        "Scans, appointments, and what to ask",
        "Egg collection and embryo transfer preparation",
        "Practical preparation for transfer day",
        "Holding emotional steadiness through prep",
      ],
    },
    startHere: [
      {
        title: "IVF timeline, what to expect",
        why: "A clear overview of the stages, so the process feels less unknown.",
        href: LINKS.ivfTimeline,
      },
      {
        title: "Track your IVF timeline",
        why: "Enter your transfer date and follow your personal milestones day by day.",
        href: LINKS.timeline,
      },
      {
        title: "The emotional impact of IVF",
        why: "What this stage often feels like, and why it can be heavier than it looks.",
        href: LINKS.emotionalIVF,
      },
    ],
    groups: [
      {
        label: "Understanding IVF",
        description: "Orient yourself before going deeper.",
        links: [
          { label: "IVF timeline, what to expect", href: LINKS.ivfTimeline },
          { label: "Back to the IVF hub", href: LINKS.hub },
        ],
      },
      {
        label: "Medication, monitoring & appointments",
        description: "Following your protocol with less mental load.",
        links: [
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
        ],
      },
      {
        label: "Preparing emotionally & practically",
        description: "Looking after yourself through the lead-up.",
        links: [
          { label: "The emotional impact of IVF", href: LINKS.emotionalIVF },
          { label: "Find support for hard moments", href: LINKS.support },
        ],
      },
    ],
    curationNote:
      "We keep IVF guidance tightly curated — fewer routes, written for the stage you are in.",
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
      lead: "Guidance for the two-week wait, symptom-checking, testing, and the emotional weight of not yet knowing.",
      bullets: [
        "What the two-week wait actually feels like",
        "What symptoms might mean — and not mean",
        "When and how to test",
        "What's normal, and when to seek support",
        "Waiting emotionally without losing yourself",
        "What may happen after results, either way",
      ],
    },
    startHere: [
      {
        title: "The two-week wait",
        why: "Why this stage feels so loud, and how to move through it.",
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
        ],
      },
      {
        label: "Coping with uncertainty",
        description: "Steadiness when nothing is confirmed yet.",
        links: [
          { label: "The emotional impact of IVF", href: LINKS.emotionalIVF },
          { label: "Perinatal anxiety", href: LINKS.perinatalAnxiety },
          { label: "Find support for hard moments", href: LINKS.support },
        ],
      },
      {
        label: "What happens after results",
        description: "Both outcomes, held honestly.",
        links: [
          { label: "Chemical pregnancy", href: LINKS.chemical },
          { label: "Pregnancy after loss", href: LINKS.afterLoss },
          { label: "Trying again after miscarriage", href: LINKS.tryingAgain },
        ],
      },
    ],
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
      "Monitoring, early scans, and cautious progress as things begin to develop after a positive result.",
    heroImage: ivfEarlyImg,
    whatThisCovers: {
      lead: "Holding hope and caution together as you move from IVF care into early pregnancy.",
      bullets: [
        "Early IVF pregnancy monitoring",
        "Scans, milestones, and what each one means",
        "What cautious progress can feel like",
        "Emotional support in early IVF pregnancy",
        "Transitioning into mainstream pregnancy care",
        "What happens if things do not progress as hoped",
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
        title: "Continue into the pregnancy hub",
        why: "When you're ready, your pregnancy guidance is here, stage by stage.",
        href: LINKS.pregnancy,
      },
    ],
    groups: [
      {
        label: "Monitoring & scans",
        description: "Small checkpoints, one at a time.",
        links: [
          { label: "Early pregnancy symptoms explained", href: LINKS.earlySymptoms },
          { label: "Symptoms stopping in early pregnancy", href: LINKS.symptomsStopping },
          { label: "Ask about a scan or result", href: LINKS.ask },
        ],
      },
      {
        label: "What cautious progress feels like",
        description: "Hope and caution can coexist here.",
        links: [
          { label: "The emotional impact of IVF", href: LINKS.emotionalIVF },
          { label: "Perinatal anxiety", href: LINKS.perinatalAnxiety },
          { label: "Emotional wellbeing in pregnancy", href: LINKS.emotionalWellbeing },
        ],
      },
      {
        label: "Moving into pregnancy care",
        description: "When IVF care gently hands over.",
        links: [
          { label: "Pregnancy hub", href: LINKS.pregnancy },
          { label: "Find support for hard moments", href: LINKS.support },
        ],
      },
      {
        label: "If things do not progress",
        description: "Honest guidance, held with care.",
        links: [
          { label: "Chemical pregnancy", href: LINKS.chemical },
          { label: "Pregnancy after loss", href: LINKS.afterLoss },
          { label: "Trying again after miscarriage", href: LINKS.tryingAgain },
        ],
      },
    ],
    aiPrompts: [
      "Is it normal to still feel anxious?",
      "What should I expect between scans?",
      "How do I stay grounded right now?",
      "When does IVF care hand over to pregnancy care?",
    ],
    prevTopic: { label: "After transfer", href: LINKS.after },
  },
};
