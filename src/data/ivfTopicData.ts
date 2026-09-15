import ivfBeforeImg from "@/assets/ivf-stage-before.jpg";
import ivfAfterImg from "@/assets/ivf-stage-after.jpg";
import ivfEarlyImg from "@/assets/ivf-stage-early.jpg";

export type IVFTopicSlug = "before-transfer" | "after-transfer" | "early-pregnancy";
export type IVFDestinationKind = "article" | "tool" | "ai" | "stage" | "hub" | "support" | "journey";

export interface IVFDestination {
  label: string;
  href: string;
  kind: IVFDestinationKind;
  description?: string;
  featured?: boolean;
}

export interface IVFTopicConfig {
  slug: IVFTopicSlug;
  eyebrow: string;
  stageIndicator: string;
  title: string;
  intro: string;
  heroImage: string;
  whatThisCovers: { lead: string; bullets: string[] };
  guides: IVFDestination[];
  tool?: IVFDestination;
  supportAction?: IVFDestination;
  normalVsSupport: { normal: string[]; seek: string[] };
  protocolWeek?: { title: string; intro?: string; items: { day: string; body: string }[] };
  handoverNote?: {
    title: string;
    when: string;
    signals: string[];
    who: string;
    destination: IVFDestination;
  };
  emotionalNote: { eyebrow: string; quote: string; body: string };
  journalNote: { line: string; cta: string; destination: IVFDestination };
  aiPrompts: IVFDestination[];
  prevTopic?: IVFDestination;
  nextTopic?: IVFDestination;
}

export const IVF_TOPIC_ORDER: IVFTopicSlug[] = ["before-transfer", "after-transfer", "early-pregnancy"];

const article = (label: string, href: string, description: string, featured = false): IVFDestination => ({
  label, href, description, featured, kind: "article",
});
const ai = (label: string): IVFDestination => ({ label, href: `ask:${encodeURIComponent(label)}`, kind: "ai" });

const LINKS = {
  hub: "/ivf",
  before: "/ivf/before-transfer",
  after: "/ivf/after-transfer",
  early: "/ivf/early-pregnancy",
  pregnancy: "/pregnancy",
  support: "/support",
  timeline: "/ivf-timeline",
  ivfTimeline: "/articles/ivf-timeline-what-to-expect",
  emotionalIVF: "/articles/emotional-impact-of-ivf",
  whatIvf: "/articles/what-ivf-is-uk-guide",
  funding: "/articles/nhs-ivf-funding-and-eligibility",
  ohss: "/articles/ohss-and-ivf-side-effects",
  cycleNotWork: "/articles/when-an-ivf-cycle-does-not-work",
  freshFrozen: "/articles/fresh-vs-frozen-embryo-transfer",
  ivfVsIcsi: "/articles/ivf-vs-icsi",
  chemical: "/articles/chemical-pregnancy",
  afterLoss: "/articles/pregnancy-after-loss",
  perinatalAnxiety: "/articles/perinatal-anxiety",
  bleedingEarly: "/articles/bleeding-in-early-pregnancy",
  testsScans: "/articles/tests-and-scans-in-pregnancy",
  twins: "/articles/twins-and-multiples-in-pregnancy",
};

export const ivfTopicConfigs: Record<IVFTopicSlug, IVFTopicConfig> = {
  "before-transfer": {
    slug: "before-transfer",
    eyebrow: "Before transfer",
    stageIndicator: "Stage 1 of 3",
    title: "Before transfer",
    intro: "Preparation, medication, monitoring, and getting ready physically and mentally for transfer day.",
    heroImage: ivfBeforeImg,
    whatThisCovers: {
      lead: "Everything that helps you feel oriented and steady through the weeks of preparation, scans, injections, and decisions before transfer.",
      bullets: [
        "What IVF actually involves, step by step",
        "Medication, injections, and how to follow your protocol",
        "Scans, blood tests, and how to read your monitoring",
        "Egg collection, fertilisation, and how embryos develop towards the blastocyst stage",
        "Why embryos vary, and what grading language does and does not mean",
        "Fresh and frozen transfer routes, and how the timing differs",
        "Practical and physical preparation for transfer day",
        "Holding emotional steadiness through the prep weeks",
      ],
    },
    guides: [
      article("What IVF is: a UK guide", LINKS.whatIvf, "What treatment involves, when it may be considered, and how UK pathways differ.", true),
      article("IVF timeline, what to expect", LINKS.ivfTimeline, "A clear overview of protocol, scans, egg collection and transfer.", true),
      article("IVF versus ICSI", LINKS.ivfVsIcsi, "The practical difference at fertilisation and why a clinic may discuss ICSI."),
      article("Fresh versus frozen embryo transfer", LINKS.freshFrozen, "How the routes and timing differ, with freezing and storage context."),
      article("OHSS and IVF side effects", LINKS.ohss, "Common treatment effects and signs that mean you should ring your clinic."),
      article("NHS IVF funding and eligibility", LINKS.funding, "Why access differs across the UK and what to ask your GP."),
      article("The emotional impact of IVF", LINKS.emotionalIVF, "Why treatment can feel heavier than it looks, and what may help."),
    ],
    tool: { label: "Track your IVF timeline", href: LINKS.timeline, kind: "tool", description: "Add your transfer date and follow the days without counting them in your head." },
    normalVsSupport: {
      normal: ["Bloating, mood shifts, and tiredness as stimulation builds", "Sore injection sites and feeling emotionally raw on heavier days", "Light cramping or spotting around egg collection", "Mental fatigue from holding so much logistical detail"],
      seek: ["Severe abdominal pain, rapid bloating, or breathlessness (possible OHSS)", "Heavy bleeding before or after egg collection", "A fever, or signs of infection at an injection site", "Distress that feels unmanageable — your clinic and our support team are there"],
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
    emotionalNote: { eyebrow: "Holding the lead-up", quote: "Preparation is not a performance. Showing up is already the work.", body: "Before transfer asks a lot quietly. Consistency, patience, and small daily acts of care are doing more than they look like they are." },
    journalNote: { line: "Appointments, doses, side effects, the questions that arrive at 2am — keeping them somewhere quiet takes the weight off your head.", cta: "Hold your prep notes", destination: { label: "Hold your prep notes", href: "/journal", kind: "journey" } },
    aiPrompts: [ai("What matters most before transfer?"), ai("How strict does medication timing need to be?"), ai("How do I prepare for transfer day?"), ai("How do I manage the stress of protocols?")],
    nextTopic: { label: "After transfer", href: LINKS.after, kind: "stage" },
  },
  "after-transfer": {
    slug: "after-transfer",
    eyebrow: "After transfer",
    stageIndicator: "Stage 2 of 3",
    title: "After transfer",
    intro: "The waiting period — often the most uncertain stage, where questions and emotions can feel heightened.",
    heroImage: ivfAfterImg,
    whatThisCovers: {
      lead: "Guidance for the two-week wait, symptom-checking, testing, and the emotional weight of not yet knowing.",
      bullets: ["What usually happens in the days straight after transfer", "What early symptoms might mean — and not mean", "Continuing the medication your clinic has prescribed", "Rest, activity, and the myths about lying still", "When and how to test, and how to read the result", "Implantation, faint lines, and bleeding interpretation", "When to contact your clinic rather than wait", "Waiting emotionally without losing yourself in it"],
    },
    guides: [
      article("The emotional impact of IVF", LINKS.emotionalIVF, "Why this fortnight can feel heavier than the treatment itself.", true),
      article("When an IVF cycle doesn't work", LINKS.cycleNotWork, "The follow-up appointment, questions to ask, and how next decisions are approached.", true),
      article("Chemical pregnancy", LINKS.chemical, "Understanding an early loss and what may happen next."),
      article("Pregnancy after loss", LINKS.afterLoss, "Support for holding hope and uncertainty after a previous loss."),
      article("Perinatal anxiety", LINKS.perinatalAnxiety, "Recognising anxiety and finding the right support."),
    ],
    tool: { label: "Track your IVF timeline", href: LINKS.timeline, kind: "tool", description: "Use your transfer date to orient yourself through the wait." },
    supportAction: { label: "Find support for hard moments", href: LINKS.support, kind: "support", description: "Open calm, practical support when the result or waiting feels hard." },
    normalVsSupport: {
      normal: ["Symptoms that come and go, including some that mimic your period", "Mild cramping, light spotting, or breast tenderness", "Feeling more anxious or tearful than usual", "A faint line on an early test before your test date"],
      seek: ["Heavy bleeding with clots, especially with strong pain", "Severe one-sided abdominal pain or shoulder-tip pain", "Signs of OHSS — rapid bloating, breathlessness, reduced urination", "Mental health that feels unsafe to sit with alone — please reach out"],
    },
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
    emotionalNote: { eyebrow: "Holding the wait", quote: "Not knowing yet is part of the work, not a failure of nerve.", body: "Symptoms after transfer are rarely a verdict. Most of this stage is waiting with care, not control — and finding it hard reflects the stage, not your strength." },
    journalNote: { line: "If the waiting is loud in your head, putting it somewhere private can quiet it a little. A few honest lines a day, no performance.", cta: "Hold the wait somewhere gentle", destination: { label: "Hold the wait somewhere gentle", href: "/journal", kind: "journey" } },
    aiPrompts: [ai("Is this symptom meaningful?"), ai("When should I test?"), ai("How do I get through the wait?"), ai("What if my result isn't what I hoped?")],
    prevTopic: { label: "Before transfer", href: LINKS.before, kind: "stage" },
    nextTopic: { label: "Early pregnancy", href: LINKS.early, kind: "stage" },
  },
  "early-pregnancy": {
    slug: "early-pregnancy",
    eyebrow: "Early pregnancy",
    stageIndicator: "Stage 3 of 3",
    title: "Early pregnancy",
    intro: "Cautious progress, monitoring, early scans, and the slow handover from IVF care into pregnancy.",
    heroImage: ivfEarlyImg,
    whatThisCovers: {
      lead: "Holding hope and caution together as you move from IVF care into early pregnancy.",
      bullets: ["Beta hCG tracking and what rising numbers mean", "Early IVF scans, milestones, and what each one signals", "Common early symptoms — and ones to flag", "Holding cautious progress without forcing certainty", "Bleeding, spotting and what is and isn't worrying", "When and how IVF care hands over to pregnancy care"],
    },
    guides: [
      article("Tests and scans in pregnancy", LINKS.testsScans, "What is offered through pregnancy, when, and why.", true),
      article("The emotional impact of IVF", LINKS.emotionalIVF, "Support for the space between cautious progress and reassurance.", true),
      article("Bleeding in early pregnancy", LINKS.bleedingEarly, "What spotting and bleeding can mean, and when to seek help."),
      article("Twins and multiples in pregnancy", LINKS.twins, "How a multiple pregnancy may change monitoring and care."),
      article("Pregnancy after loss", LINKS.afterLoss, "Support for holding hope and uncertainty after a previous loss."),
      article("Perinatal anxiety", LINKS.perinatalAnxiety, "Recognising anxiety and finding the right support."),
    ],
    normalVsSupport: {
      normal: ["Symptoms that come and go in the early weeks", "Mild cramping or pulling as things grow", "Light spotting, especially around when a period would have been due", "Relief and worry showing up in the same hour"],
      seek: ["Heavy bleeding, especially with strong cramping", "Severe one-sided pain, or shoulder-tip pain", "A sudden, complete loss of symptoms that worries you", "Mental health that feels unsafe — your clinic and our support team are there"],
    },
    handoverNote: {
      title: "When does handover happen?",
      when: "Most IVF clinics hand care over to your maternity team between around 8 and 12 weeks — usually after a reassurance scan confirms a heartbeat and steady growth.",
      signals: ["A discharge scan or appointment with your IVF clinic", "A referral letter, or a prompt to self-refer to your midwife or maternity service", "Your booking appointment with a midwife, usually before 10 weeks", "Routine pregnancy care taking over from IVF-specific monitoring"],
      who: "Your maternity team — midwives and obstetricians — pick up regular care. Our pregnancy hub is set up to meet you there.",
      destination: { label: "Go to the pregnancy hub", href: LINKS.pregnancy, kind: "hub" },
    },
    supportAction: { label: "Find support for hard moments", href: LINKS.support, kind: "support", description: "Open support if cautious progress or difficult news feels too much to hold alone." },
    emotionalNote: { eyebrow: "Cautious progress", quote: "You don't have to feel certain to be moving forward.", body: "Early pregnancy after IVF rarely lands as one big shift. It arrives in small checkpoints — and needing reassurance between them is part of the stage, not a sign anything is wrong." },
    journalNote: { line: "Marking cautious milestones somewhere private — a scan, a number, a quiet good morning — lets you notice progress without forcing certainty.", cta: "Mark a quiet milestone", destination: { label: "Mark a quiet milestone", href: "/journal", kind: "journey" } },
    aiPrompts: [ai("Is it normal to still feel anxious?"), ai("What should I expect between scans?"), ai("How do I stay grounded right now?"), ai("When does IVF care hand over to pregnancy care?")],
    prevTopic: { label: "After transfer", href: LINKS.after, kind: "stage" },
    nextTopic: { label: "Pregnancy hub", href: LINKS.pregnancy, kind: "hub" },
  },
};
