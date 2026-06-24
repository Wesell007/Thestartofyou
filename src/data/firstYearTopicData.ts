// ─── First Year Topic Landing Data ────────────────────────────────────────
// Eight topic configs (4 baby + 4 recovery) consumed by FirstYearTopicPage.
// Lives between /first-year and individual guidance answers/articles.

import firstyearStage03 from "@/assets/firstyear-stage-0-3.jpg";
import firstyearStage36 from "@/assets/firstyear-stage-3-6.jpg";
import firstyearStage69 from "@/assets/firstyear-stage-6-9.jpg";
import firstyearStage912 from "@/assets/firstyear-stage-9-12.jpg";
import guidanceFirstyear from "@/assets/guidance-firstyear.jpg";
import babyEarly from "@/assets/myweek-baby-early.png";
import babyMid from "@/assets/myweek-baby-mid.png";
import babyLate from "@/assets/myweek-baby-late.png";
import secondSleep from "@/assets/article-hero-second-sleep.jpg";
import thirdSleep from "@/assets/article-hero-third-sleep.jpg";

import postpartumScene from "@/assets/postpartum-scene.jpg";
import postpartumJourney from "@/assets/postpartum-journey.jpg";
import postpartumAdjustment from "@/assets/postpartum-stage-adjustment.jpg";
import postpartumEarlyDays from "@/assets/postpartum-stage-early-days.jpg";
import postpartumEarlyWeeks from "@/assets/postpartum-stage-early-weeks.jpg";
import guidancePostpartum from "@/assets/guidance-postpartum.jpg";

export type FirstYearTopicSlug =
  | "feeding"
  | "sleep"
  | "development"
  | "care-and-safety"
  | "postpartum-recovery"
  | "emotional-wellbeing"
  | "body-and-hormones"
  | "checkups-and-warning-signs";

export interface FirstYearTopicConfig {
  slug: FirstYearTopicSlug;
  side: "baby" | "recovery";
  eyebrow: string;
  title: string;
  intro: string;
  heroImage: string;
  medicallyReviewed?: boolean;
  whatThisCovers: {
    lead: string;
    bullets: string[];
  };
  featured: {
    title: string;
    why: string;
    image: string;
  }[];
  aiPrompts: string[];
  related: {
    sameSide: FirstYearTopicSlug[];
    crossSide: FirstYearTopicSlug[];
  };
}

// Public registry — used by related-topics row and hub wiring to render labels
// for any slug without needing to import each full config.
export const FIRST_YEAR_TOPIC_INDEX: Record<
  FirstYearTopicSlug,
  { title: string; side: "baby" | "recovery"; short: string }
> = {
  feeding: { title: "Feeding in the first year", side: "baby", short: "Feeding" },
  sleep: { title: "Baby sleep in the first year", side: "baby", short: "Sleep" },
  development: { title: "Development and milestones", side: "baby", short: "Development" },
  "care-and-safety": { title: "Baby care and safety", side: "baby", short: "Care & safety" },
  "postpartum-recovery": { title: "Postpartum recovery", side: "recovery", short: "Postpartum recovery" },
  "emotional-wellbeing": { title: "Emotional wellbeing after birth", side: "recovery", short: "Emotional wellbeing" },
  "body-and-hormones": { title: "Body and hormones after birth", side: "recovery", short: "Body & hormones" },
  "checkups-and-warning-signs": { title: "Check-ups and warning signs", side: "recovery", short: "Check-ups & warning signs" },
};

export const firstYearTopicConfigs: Record<FirstYearTopicSlug, FirstYearTopicConfig> = {
  // ─── BABY SIDE ────────────────────────────────────────────────────────
  feeding: {
    slug: "feeding",
    side: "baby",
    eyebrow: "Baby's first year",
    title: "Feeding in the first year",
    intro:
      "Feeding shifts more than almost anything else this year. From the first latch to first foods, here is calm, practical guidance for the questions parents actually ask.",
    heroImage: firstyearStage03,
    whatThisCovers: {
      lead: "What you'll find inside this topic:",
      bullets: [
        "Breastfeeding, bottle feeding and mixed feeding without judgement.",
        "How feeding patterns shift through growth spurts and quieter weeks.",
        "Starting solids, first foods and weaning at your baby's pace.",
        "Common feeding worries: latch, wind, reflux, refusal, slow days.",
        "Signs feeding is going well, and signs that suggest extra support.",
      ],
    },
    featured: [
      {
        title: "How often should my baby feed in the early weeks?",
        why: "A grounded look at feeding rhythm in the newborn period, with realistic ranges.",
        image: firstyearStage03,
      },
      {
        title: "Starting solids: a calm guide to the first month of weaning",
        why: "What to offer, what to skip, and how to take the pressure out of first foods.",
        image: babyMid,
      },
      {
        title: "When feeding feels harder than expected",
        why: "Honest support for the days that don't go smoothly, and when to seek help.",
        image: guidanceFirstyear,
      },
    ],
    aiPrompts: [
      "Is my baby feeding enough?",
      "When should we start solids?",
      "Why is feeding suddenly harder?",
    ],
    related: {
      sameSide: ["sleep", "development", "care-and-safety"],
      crossSide: ["body-and-hormones", "postpartum-recovery"],
    },
  },

  sleep: {
    slug: "sleep",
    side: "baby",
    eyebrow: "Baby's first year",
    title: "Baby sleep in the first year",
    intro:
      "Sleep in the first year rarely runs in a straight line. This is a calm place to understand naps, night waking, safer sleep and the patterns that quietly shift month by month.",
    heroImage: firstyearStage36,
    whatThisCovers: {
      lead: "What you'll find inside this topic:",
      bullets: [
        "Newborn sleep, day-night confusion and the early weeks.",
        "Naps, wake windows and how rhythms evolve through the year.",
        "Night waking, regressions and the months that feel hardest.",
        "Safer sleep guidance for cots, swaddles and shared rooms.",
        "Gentle settling without one-size-fits-all sleep training rules.",
      ],
    },
    featured: [
      {
        title: "Safer sleep in the first year: the essentials",
        why: "A clear summary of current safer-sleep guidance, written for tired parents.",
        image: secondSleep,
      },
      {
        title: "Why is my baby suddenly waking again at night?",
        why: "What's usually behind a regression, and what tends to help it pass.",
        image: thirdSleep,
      },
      {
        title: "Wake windows and naps through the first year",
        why: "How daytime sleep changes month by month, without rigid schedules.",
        image: firstyearStage36,
      },
    ],
    aiPrompts: [
      "Is my baby's sleep normal?",
      "How do I handle night waking?",
      "What does safer sleep mean right now?",
    ],
    related: {
      sameSide: ["feeding", "development", "care-and-safety"],
      crossSide: ["emotional-wellbeing", "postpartum-recovery"],
    },
  },

  development: {
    slug: "development",
    side: "baby",
    eyebrow: "Baby's first year",
    title: "Development and milestones",
    intro:
      "Your baby will change quickly this year. This topic helps you understand what's unfolding, without turning every milestone into a checklist or a worry.",
    heroImage: firstyearStage69,
    whatThisCovers: {
      lead: "What you'll find inside this topic:",
      bullets: [
        "How babies grow, move and respond across the first year.",
        "Language, sounds and the early roots of communication.",
        "Rolling, sitting, crawling and the wide range of normal.",
        "Play, connection and how babies learn through everyday moments.",
        "When a milestone gap is worth raising with your health visitor or GP.",
      ],
    },
    featured: [
      {
        title: "Milestones in the first year: a gentle overview",
        why: "What tends to emerge when, and why the timing range matters more than the dates.",
        image: babyMid,
      },
      {
        title: "How babies learn through everyday play",
        why: "Small, ordinary moments that quietly do the most for development.",
        image: babyEarly,
      },
      {
        title: "When should I raise a development question?",
        why: "Calm guidance on what's worth a conversation, without slipping into panic.",
        image: firstyearStage69,
      },
    ],
    aiPrompts: [
      "Is this normal for my baby's age?",
      "How do babies learn to talk?",
      "Should I be worried about a milestone?",
    ],
    related: {
      sameSide: ["feeding", "sleep", "care-and-safety"],
      crossSide: ["emotional-wellbeing", "checkups-and-warning-signs"],
    },
  },

  "care-and-safety": {
    slug: "care-and-safety",
    side: "baby",
    eyebrow: "Baby's first year",
    title: "Baby care and safety",
    intro:
      "Everyday care covers more than you'd expect in the first year. This is a practical, calm place for the questions about bathing, illness, routines and keeping your baby safe as they grow.",
    heroImage: firstyearStage912,
    medicallyReviewed: true,
    whatThisCovers: {
      lead: "What you'll find inside this topic:",
      bullets: [
        "Everyday care: bathing, skin, nappies and routines.",
        "Safer sleep, car seats and baby-proofing as they start to move.",
        "Recognising signs of illness, and when to call for help.",
        "Feeding safety, choking awareness and starting solids.",
        "Travel, weather, and looking after a baby in everyday life.",
      ],
    },
    featured: [
      {
        title: "When should I call the GP about my baby?",
        why: "Clear guidance on signs that need a conversation and signs that need urgent care.",
        image: guidanceFirstyear,
      },
      {
        title: "Baby-proofing as your baby starts to move",
        why: "A calm walk-through of what to change at home through the second half of the year.",
        image: firstyearStage912,
      },
      {
        title: "Caring for baby skin in the first year",
        why: "What's usually normal, what helps, and when a skin change is worth checking.",
        image: babyLate,
      },
    ],
    aiPrompts: [
      "When should I call the GP?",
      "Is this rash something to worry about?",
      "How do I baby-proof at home?",
    ],
    related: {
      sameSide: ["feeding", "sleep", "development"],
      crossSide: ["checkups-and-warning-signs", "postpartum-recovery"],
    },
  },

  // ─── RECOVERY SIDE ────────────────────────────────────────────────────
  "postpartum-recovery": {
    slug: "postpartum-recovery",
    side: "recovery",
    eyebrow: "Postpartum recovery",
    title: "Postpartum recovery",
    intro:
      "Recovery after birth deserves real attention. This topic is a calm, honest place to understand healing, energy, common symptoms and the slow work of feeling like yourself again.",
    heroImage: postpartumScene,
    medicallyReviewed: true,
    whatThisCovers: {
      lead: "What you'll find inside this topic:",
      bullets: [
        "The first days after birth, vaginal and caesarean.",
        "Bleeding, stitches, pain and what's usually within normal.",
        "Pelvic floor, core and gradual return to movement.",
        "Sleep, energy and the realistic shape of early recovery.",
        "Signs that suggest your body needs more support or a check.",
      ],
    },
    featured: [
      {
        title: "The first six weeks after birth: what to expect",
        why: "A grounded overview of early recovery, written without rushing you.",
        image: postpartumEarlyDays,
      },
      {
        title: "Caesarean recovery: a gentle week-by-week guide",
        why: "What healing tends to look like, and what helps it along.",
        image: postpartumEarlyWeeks,
      },
      {
        title: "Pelvic floor in the months after birth",
        why: "Why it matters, what's normal, and when to ask for specialist support.",
        image: postpartumJourney,
      },
    ],
    aiPrompts: [
      "Is this normal six weeks after birth?",
      "When can I move my body again?",
      "Should this much bleeding be checked?",
    ],
    related: {
      sameSide: ["emotional-wellbeing", "body-and-hormones", "checkups-and-warning-signs"],
      crossSide: ["feeding", "sleep"],
    },
  },

  "emotional-wellbeing": {
    slug: "emotional-wellbeing",
    side: "recovery",
    eyebrow: "Postpartum recovery",
    title: "Emotional wellbeing after birth",
    intro:
      "Becoming a parent rearranges your inner world. This is a calm, honest space for mood, identity, overwhelm and the emotional weight that often goes unspoken.",
    heroImage: postpartumAdjustment,
    medicallyReviewed: true,
    whatThisCovers: {
      lead: "What you'll find inside this topic:",
      bullets: [
        "The baby blues, and how they differ from postnatal depression.",
        "Anxiety, intrusive thoughts and the harder feelings of new parenthood.",
        "Identity shifts, relationships and the weight of the mental load.",
        "Asking for help, and what good support can look like.",
        "Signs that suggest reaching out to your GP or midwife sooner.",
      ],
    },
    featured: [
      {
        title: "Baby blues, PND and the difference between them",
        why: "A calm explainer of what's common, what's not, and what to do about it.",
        image: postpartumAdjustment,
      },
      {
        title: "Intrusive thoughts in early parenthood",
        why: "Why they happen, how common they are, and when they need extra support.",
        image: postpartumJourney,
      },
      {
        title: "The mental load and the early months",
        why: "Naming the invisible work, and small ways to share or lighten it.",
        image: guidancePostpartum,
      },
    ],
    aiPrompts: [
      "Are these feelings normal right now?",
      "How do I tell baby blues from PND?",
      "Where can I get emotional support?",
    ],
    related: {
      sameSide: ["postpartum-recovery", "body-and-hormones", "checkups-and-warning-signs"],
      crossSide: ["sleep", "development"],
    },
  },

  "body-and-hormones": {
    slug: "body-and-hormones",
    side: "recovery",
    eyebrow: "Postpartum recovery",
    title: "Body and hormones after birth",
    intro:
      "Hormones keep shifting long after birth, and so does your body. This topic helps you understand the changes, the timelines and the things worth checking along the way.",
    heroImage: postpartumEarlyWeeks,
    medicallyReviewed: true,
    whatThisCovers: {
      lead: "What you'll find inside this topic:",
      bullets: [
        "Hormone shifts in the weeks and months after birth.",
        "Hair, skin and the changes that often surprise parents.",
        "Return of periods, contraception and fertility after birth.",
        "Weight, body image and a gentler way to think about both.",
        "Intimacy, energy and rebuilding a sense of self.",
      ],
    },
    featured: [
      {
        title: "Postnatal hair loss: what's happening and what helps",
        why: "Why it peaks around three to four months, and when it usually settles.",
        image: postpartumEarlyWeeks,
      },
      {
        title: "When do periods return after birth?",
        why: "How feeding, hormones and individual variation shape the timeline.",
        image: postpartumJourney,
      },
      {
        title: "Your body, six to twelve months on",
        why: "A calmer perspective on the longer arc of postnatal change.",
        image: guidancePostpartum,
      },
    ],
    aiPrompts: [
      "Why is my hair falling out?",
      "When will my periods return?",
      "Is this hormone change normal?",
    ],
    related: {
      sameSide: ["postpartum-recovery", "emotional-wellbeing", "checkups-and-warning-signs"],
      crossSide: ["feeding", "development"],
    },
  },

  "checkups-and-warning-signs": {
    slug: "checkups-and-warning-signs",
    side: "recovery",
    eyebrow: "Postpartum recovery",
    title: "Check-ups and warning signs",
    intro:
      "Most of the postnatal period unfolds quietly, but some symptoms deserve a closer look. This is a clear, calm guide to what's routine, what's worth raising and what shouldn't wait.",
    heroImage: postpartumEarlyDays,
    medicallyReviewed: true,
    whatThisCovers: {
      lead: "What you'll find inside this topic:",
      bullets: [
        "The six-to-eight week postnatal check, and what to bring to it.",
        "Symptoms that are common but still worth mentioning.",
        "Signs that suggest contacting your GP or midwife sooner.",
        "Red flags that need urgent care, without overstating risk.",
        "How to advocate for yourself in postnatal appointments.",
      ],
    },
    featured: [
      {
        title: "Your six-week postnatal check: what to expect",
        why: "What's usually covered, and what to make sure you raise yourself.",
        image: postpartumEarlyDays,
      },
      {
        title: "Postnatal red flags you shouldn't ignore",
        why: "A calm but clear list of symptoms that mean getting help quickly.",
        image: postpartumJourney,
      },
      {
        title: "Mental health symptoms worth raising early",
        why: "When low mood or anxiety has crossed into something that needs support.",
        image: guidancePostpartum,
      },
    ],
    aiPrompts: [
      "Is this symptom an emergency?",
      "What should I raise at my postnatal check?",
      "Should I see a GP about this?",
    ],
    related: {
      sameSide: ["postpartum-recovery", "emotional-wellbeing", "body-and-hormones"],
      crossSide: ["care-and-safety", "sleep"],
    },
  },
};
