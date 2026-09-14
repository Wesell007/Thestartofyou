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
  intro?: string;
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

export interface IVFFeatured {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  hrefLabel: string;
}

export interface IVFNormalVsSupport {
  normal: string[];
  seek: string[];
}

export interface IVFJournalNote {
  line: string;
  cta: string;
  href: string;
}

export interface IVFProtocolWeek {
  title: string;
  intro?: string;
  items: { day: string; body: string }[];
}

export interface IVFHandoverNote {
  title: string;
  when: string;
  signals: string[];
  who: string;
  href: string;
  hrefLabel: string;
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
  featured: IVFFeatured;
  normalVsSupport: IVFNormalVsSupport;
  protocolWeek?: IVFProtocolWeek;
  handoverNote?: IVFHandoverNote;
  groups: IVFGroup[];
  curationNote?: string;
  emotionalNote: IVFEmotionalNote;
  journalNote: IVFJournalNote;
  commonQuestions: string[];
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
  // Track-your-timeline CTAs land on the IVF hub, where the calculator
  // accepts a transfer date. The bare /ivf-timeline route only renders a
  // result and is otherwise a dead end.
  timeline: "/ivf",
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
  twins: "/articles/twins-and-multiples-in-pregnancy",
  
};

// IVF-framed AI destination. The question is decoded into router state by the
// page, so potentially sensitive text is never placed in browser history.
// Used where no IVF-native article exists yet — these read as IVF-owned
// guidance routes (the same /ask pattern used by IVFAISupport and
// IVFCommonQuestions), never as TTC.
// IVF-origin AI routes carry `journey=ivf` so AskPage can render with the
// IVF lilac identity and IVF-aware return links instead of the default sage.
const askIVF = (q: string) => `ask:${encodeURIComponent(q)}`;

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
    featured: {
      eyebrow: "Anchor read",
      title: "IVF timeline, what to expect",
      body: "A clear, calm overview of every stage — protocol, scans, egg collection, transfer — so the unknown shrinks before you reach it.",
      href: LINKS.ivfTimeline,
      hrefLabel: "Read the timeline",
    },
    normalVsSupport: {
      normal: [
        "Bloating, mood shifts, and tiredness as stimulation builds",
        "Sore injection sites and feeling emotionally raw on heavier days",
        "Light cramping or spotting around egg collection",
        "Mental fatigue from holding so much logistical detail",
      ],
      seek: [
        "Severe abdominal pain, rapid bloating, or breathlessness (possible OHSS)",
        "Heavy bleeding before or after egg collection",
        "A fever, or signs of infection at an injection site",
        "Distress that feels unmanageable — your clinic and our support team are there",
      ],
    },
    protocolWeek: {
      title: "What your protocol week might look like",
      intro: "A simplified example. Your real protocol will be set by your clinic — use this only to picture the shape.",
      items: [
        { day: "Day 1", body: "Period arrives. Baseline scan and bloods booked. Stimulation injections begin." },
        { day: "Day 3", body: "Settling into daily injections. Mild bloating and tiredness are common." },
        { day: "Day 6", body: "First monitoring scan. Bloods check oestrogen. Doses may be adjusted." },
        { day: "Trigger", body: "Trigger injection at a precise time. Egg collection is usually 36 hours later." },
        { day: "Transfer day", body: "Embryo transfer in clinic. A short procedure, then the wait begins." },
      ],
    },
    groups: [
      {
        label: "Understanding IVF",
        description: "Start here.",
        intro: "If IVF still feels like a wall of acronyms, these reads give you the shape of the process and what to expect before you go deeper into your protocol.",
        links: [
          { label: "IVF timeline, what to expect", href: LINKS.ivfTimeline },
          { label: "What does my IVF protocol actually involve?", href: askIVF("What does my IVF protocol actually involve?") },
        ],
      },
      {
        label: "Medication, monitoring & appointments",
        description: "Following your protocol with less mental load.",
        intro: "Injections, scans, and bloods can become their own full-time job. These help you hold the logistics and know what each appointment is actually checking.",
        links: [
          { label: "IVF injections explained, what to expect day by day", href: askIVF("IVF injections explained — what to expect day by day") },
          { label: "What does a baseline scan check before IVF?", href: askIVF("What does a baseline scan check before IVF?") },
          { label: "What does each monitoring scan look for during stimulation?", href: askIVF("What does each monitoring scan look for during stimulation?") },
          { label: "What are the blood tests during IVF actually checking?", href: askIVF("What are the blood tests during IVF actually checking?") },
        ],
      },
      {
        label: "Procedures & preparation",
        description: "Egg collection, embryo transfer, and the days around them.",
        intro: "What to expect on the two clinic days that matter most — and how to look after yourself in the hours either side.",
        links: [
          { label: "Egg collection, what actually happens on the day", href: askIVF("Egg collection — what actually happens on the day") },
          { label: "Embryo transfer, what to expect on transfer day", href: askIVF("Embryo transfer — what to expect on transfer day") },
          { label: "How should I prepare for transfer day, practically?", href: askIVF("How should I prepare for transfer day, practically?") },
          { label: "Embryo freezing and storage, the rules are set by the HFEA", href: askIVF("What happens to embryos that are frozen and stored, and what are the HFEA storage rules?") },
          { label: "Track your transfer day", href: LINKS.timeline },
        ],
      },
      {
        label: "Preparing emotionally",
        description: "Steadiness before active treatment begins.",
        intro: "The weeks before treatment are quietly heavy. These reads are about steadiness — not optimism — and what to do as the emotional load builds before the cycle begins.",
        links: [
          { label: "The emotional impact of IVF", href: LINKS.emotionalIVF },
          { label: "How do I steady myself through the lead-up to transfer?", href: askIVF("How do I steady myself through the lead-up to transfer?") },
          { label: "Protecting your relationship through IVF", href: askIVF("How do I protect my relationship through IVF?") },
          { label: "What helps when a hard IVF moment hits?", href: askIVF("What helps when a hard IVF moment hits?") },
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
    journalNote: {
      line: "Appointments, doses, side effects, the questions that arrive at 2am — keeping them somewhere quiet takes the weight off your head.",
      cta: "Hold your prep notes",
      href: "/journal",
    },
    commonQuestions: [
      "How strict does medication timing need to be?",
      "What does a normal monitoring scan show?",
      "How should I prepare for egg collection?",
      "What helps in the days before transfer?",
    ],
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
        "What usually happens in the days straight after transfer",
        "What early symptoms might mean — and not mean",
        "Continuing the medication your clinic has prescribed",
        "Rest, activity, and the myths about lying still",
        "When and how to test, and how to read the result",
        "Implantation, faint lines, and bleeding interpretation",
        "When to contact your clinic rather than wait",
        "Waiting emotionally without losing yourself in it",
      ],
    },
    startHere: [
      {
        title: "IVF timeline, what to expect",
        why: "Where the wait sits in the cycle, and what the test at the end of it actually measures.",
        href: LINKS.ivfTimeline,
      },
      {
        title: "The emotional impact of IVF",
        why: "Why this fortnight so often feels heavier than the treatment itself.",
        href: LINKS.emotionalIVF,
      },
      {
        title: "Track your IVF timeline",
        why: "Add your transfer date and follow the days without counting them in your head.",
        href: LINKS.timeline,
      },
    ],
    protocolWeek: {
      title: "What the wait after transfer often looks like",
      intro: "A general shape only. Your clinic sets your medication, your test date, and what to do if anything changes.",
      items: [
        { day: "Transfer day", body: "A short procedure, then home. Mild cramping or a little spotting afterwards is common. Progesterone or other support usually continues exactly as prescribed." },
        { day: "Days 1 to 4", body: "Ordinary life resumes. There is no evidence that strict bed rest improves the outcome; most clinics suggest gentle normal activity rather than lying still." },
        { day: "Days 5 to 9", body: "Symptoms, or the absence of them, tell you very little at this point. Progesterone can cause bloating, tenderness and tiredness whether or not a pregnancy is developing." },
        { day: "Days 10 to 14", body: "The hardest stretch for many people. Home tests taken before your clinic's date can still be reading the trigger injection rather than a pregnancy." },
        { day: "Test day", body: "A blood test measures hCG as a number. Clinics often repeat it around 48 hours later to see how it is changing." },
      ],
    },
    featured: {
      eyebrow: "Anchor read · after transfer",
      title: "The emotional impact of IVF",
      body: "The waiting period after transfer can bring the emotional weight of the whole cycle to the surface. A steady read on why this stretch hits so hard, and how to hold yourself gently through it.",
      href: LINKS.emotionalIVF,
      hrefLabel: "Read the emotional impact of IVF",
    },
    normalVsSupport: {
      normal: [
        "Symptoms that come and go, including some that mimic your period",
        "Mild cramping, light spotting, or breast tenderness",
        "Feeling more anxious or tearful than usual",
        "A faint line on an early test before your test date",
      ],
      seek: [
        "Heavy bleeding with clots, especially with strong pain",
        "Severe one-sided abdominal pain or shoulder-tip pain",
        "Signs of OHSS — rapid bloating, breathlessness, reduced urination",
        "Mental health that feels unsafe to sit with alone — please reach out",
      ],
    },
    groups: [
      {
        label: "The two-week wait",
        description: "Holding yourself through the longest short stretch.",
        intro: "Why this fortnight feels disproportionately heavy after IVF, what's actually happening day by day, and how to keep yourself anchored when the days slow down.",
        links: [
          { label: "The IVF two-week wait, what's actually happening", href: askIVF("The IVF two-week wait — what's actually happening") },
          { label: "When can I test after embryo transfer?", href: askIVF("When can I test after embryo transfer?") },
        ],
      },
      {
        label: "Medication, rest & daily life",
        description: "What to keep doing, and what you can let go of.",
        intro: "Medication support usually continues after transfer exactly as your clinic prescribed it. Beyond that, ordinary gentle activity is fine — strict bed rest is not shown to change the outcome.",
        links: [
          { label: "Why does medication continue after transfer?", href: askIVF("Why does medication continue after embryo transfer?") },
          { label: "Do I need to rest after embryo transfer?", href: askIVF("Do I need to rest after embryo transfer?") },
          { label: "What can I safely do in the two weeks after transfer?", href: askIVF("What can I safely do in the two weeks after transfer?") },
          { label: "When should I contact the clinic after transfer?", href: askIVF("When should I contact the clinic after transfer?") },
        ],
      },
      {
        label: "Symptoms, signals & testing",
        description: "Interpreting your body without spiralling.",
        intro: "Honest framing on what symptoms after embryo transfer can and cannot tell you, when to test, and how to read a faint line without letting it run your day.",
        links: [
          { label: "Symptoms after embryo transfer, what they can and can't tell you", href: askIVF("Symptoms after embryo transfer — what they can and can't tell you") },
          { label: "Faint positive after IVF, what it means", href: askIVF("Faint positive after IVF — what it means") },
          { label: "When should I call the clinic after transfer?", href: askIVF("When should I call the clinic after transfer?") },
        ],
      },
      {
        label: "Coping with uncertainty",
        description: "Steadiness when nothing is confirmed yet.",
        intro: "Tools and reads for the days where there is nothing to do but wait — including how to tell normal anxiety apart from something that needs more support.",
        links: [
          { label: "The emotional impact of IVF", href: LINKS.emotionalIVF },
          { label: "How do I cope with the IVF wait without spiralling?", href: askIVF("How do I cope with the IVF wait without spiralling?") },
          { label: "How do I stop over-reading every twinge after transfer?", href: askIVF("How do I stop over-reading every twinge after transfer?") },
          { label: "Perinatal anxiety", href: LINKS.perinatalAnxiety },
          { label: "Find support for hard moments", href: LINKS.support },
        ],
      },
      {
        label: "If results bring difficult news",
        description: "Held honestly. Stays within IVF and support.",
        intro: "If the result is not what you hoped for, these are the reads we'd hand you first. They stay inside IVF and our support library — never bouncing you back to start again.",
        links: [
          { label: "If my IVF cycle didn't work, what now?", href: askIVF("If my IVF cycle didn't work — what now?") },
          { label: "Chemical pregnancy after IVF, what now?", href: askIVF("Chemical pregnancy after IVF — what now?") },
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
    journalNote: {
      line: "If the waiting is loud in your head, putting it somewhere private can quiet it a little. A few honest lines a day, no performance.",
      cta: "Hold the wait somewhere gentle",
      href: "/journal",
    },
    commonQuestions: [
      "Is this symptom meaningful?",
      "When should I test?",
      "What does a faint line mean?",
      "How do I cope if the result is hard?",
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
        title: "Beta hCG after IVF, what the numbers mean",
        why: "How to read your first numbers without over-reading them.",
        href: askIVF("Beta hCG after IVF — what the numbers mean"),
      },
      {
        title: "Early IVF scans, what each scan is checking",
        why: "What viability, dating and reassurance scans actually look at.",
        href: askIVF("Early IVF scans — what each scan is checking"),
      },
      {
        title: "How do I hold cautious progress without forcing certainty?",
        why: "Steadiness for the days between beta results and the first scan.",
        href: askIVF("How do I hold cautious progress without forcing certainty?"),
      },
    ],
    featured: {
      eyebrow: "Anchor read · early pregnancy after IVF",
      title: "Early pregnancy after IVF, cautious progress one checkpoint at a time",
      body: "The most defining read for this stage — what the days between beta hCG, early scans and handover actually feel like, and how to hold hope and caution together without forcing certainty.",
      href: askIVF("Early pregnancy after IVF — what to expect between scans"),
      hrefLabel: "Open the IVF early pregnancy guide",
    },
    normalVsSupport: {
      normal: [
        "Symptoms that come and go in the early weeks",
        "Mild cramping or pulling as things grow",
        "Light spotting, especially around when a period would have been due",
        "Relief and worry showing up in the same hour",
      ],
      seek: [
        "Heavy bleeding, especially with strong cramping",
        "Severe one-sided pain, or shoulder-tip pain",
        "A sudden, complete loss of symptoms that worries you",
        "Mental health that feels unsafe — your clinic and our support team are there",
      ],
    },
    handoverNote: {
      title: "When does handover happen?",
      when: "Most IVF clinics hand care over to your maternity team between around 8 and 12 weeks — usually after a reassurance scan confirms a heartbeat and steady growth.",
      signals: [
        "A discharge scan or appointment with your IVF clinic",
        "A referral letter, or a prompt to self-refer to your midwife or maternity service",
        "Your booking appointment with a midwife, usually before 10 weeks",
        "Routine pregnancy care taking over from IVF-specific monitoring",
      ],
      who: "Your maternity team — midwives and obstetricians — pick up regular care. Our pregnancy hub is set up to meet you there.",
      href: LINKS.pregnancy,
      hrefLabel: "Open the pregnancy hub",
    },
    groups: [
      {
        label: "Monitoring & early scans",
        description: "Small checkpoints, one at a time.",
        intro: "Beta hCG, viability scans, dating scans — what each one is actually checking, what happens in the days between, and how to hold yourself through each checkpoint without over-reading it.",
        links: [
          { label: "Beta hCG after IVF, what the numbers mean", href: askIVF("Beta hCG after IVF — what the numbers mean") },
          { label: "What should rising beta hCG look like after IVF?", href: askIVF("What should rising beta hCG look like after IVF?") },
          { label: "Early IVF scans, what each scan is checking", href: askIVF("Early IVF scans — what each scan is checking") },
          { label: "What happens between bloods and scans after IVF?", href: askIVF("What happens between bloods and scans after IVF?") },
          { label: "How do I read early checkpoints without over-reading them?", href: askIVF("How do I read early IVF checkpoints without over-reading them?") },
          { label: "Tests and scans in pregnancy", href: LINKS.testsScans },
          { label: "Twins and multiples in pregnancy", href: LINKS.twins },
        ],
      },
      {
        label: "Symptoms in early IVF pregnancy",
        description: "What's common, what's reassuring, what to flag.",
        intro: "IVF-framed reads first — what symptoms actually mean after a positive, what's reassuring, and when something deserves a call. Generic pregnancy reads sit below as support, not as the main answer.",
        links: [
          { label: "Symptoms in early IVF pregnancy, what's common", href: askIVF("Symptoms in early IVF pregnancy — what's common") },
          { label: "Spotting and bleeding in early IVF pregnancy, what's reassuring, what to flag", href: askIVF("Spotting and bleeding in early IVF pregnancy — what's reassuring, what to flag") },
          { label: "Are my symptoms reassuring or worth a call after IVF?", href: askIVF("Are my symptoms reassuring or worth a call after IVF?") },
          { label: "Why do my symptoms feel stronger or weaker than I expected after IVF?", href: askIVF("Why do my symptoms feel stronger or weaker than I expected after IVF?") },
          { label: "Bleeding in early pregnancy", href: LINKS.bleedingEarly },
        ],
      },
      {
        label: "Holding cautious progress",
        description: "Hope and caution can coexist here.",
        intro: "Early pregnancy after IVF rarely feels like the relief you expected. These reads are for the days where hope and worry refuse to take turns — and for the gap between a beta result and the next scan.",
        links: [
          { label: "How do I hold cautious progress without forcing certainty?", href: askIVF("How do I hold cautious progress without forcing certainty?") },
          { label: "Why doesn't reassurance feel reassuring after IVF?", href: askIVF("Why doesn't reassurance feel reassuring after IVF?") },
          { label: "The emotional gap between beta results and the first scan", href: askIVF("The emotional gap between beta results and the first scan after IVF") },
          { label: "How do I trust early progress after everything IVF took?", href: askIVF("How do I trust early progress after everything IVF took?") },
          { label: "The emotional impact of IVF", href: LINKS.emotionalIVF },
          { label: "Perinatal anxiety", href: LINKS.perinatalAnxiety },
        ],
      },
      {
        label: "Handover into pregnancy care",
        description: "When IVF care gently steps back.",
        intro: "The transition point — when your IVF clinic discharges you, who picks up your care, what your first maternity appointments look like, and where to land once the handover happens. The handover card above sets the timing; these reads carry you across it.",
        links: [
          { label: "When does my IVF clinic hand care over to the midwife?", href: askIVF("When does my IVF clinic hand care over to the midwife?") },
          { label: "Who takes over my care after IVF discharge?", href: askIVF("Who takes over my care after IVF discharge?") },
          { label: "What happens at the midwife booking appointment after IVF?", href: askIVF("What happens at the midwife booking appointment after IVF?") },
          { label: "What comes next once IVF care steps back?", href: askIVF("What comes next once IVF care steps back?") },
          { label: "Pregnancy hub", href: LINKS.pregnancy },
          { label: "Tests and scans in pregnancy", href: LINKS.testsScans },
        ],
      },
      {
        label: "If things do not progress",
        description: "Held honestly, kept inside IVF and support.",
        intro: "If something stops, these are the reads we'd hand you first — kept inside IVF and our support library, never bouncing you backwards.",
        links: [
          { label: "If things do not progress in early IVF pregnancy, what now?", href: askIVF("If things do not progress in early IVF pregnancy — what now?") },
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
    journalNote: {
      line: "Marking cautious milestones somewhere private — a scan, a number, a quiet good morning — lets you notice progress without forcing certainty.",
      cta: "Mark a quiet milestone",
      href: "/journal",
    },
    commonQuestions: [
      "What should rising beta hCG look like?",
      "What does spotting in early pregnancy usually mean?",
      "When does my IVF clinic hand care over?",
      "How do I stay grounded between scans?",
    ],
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
