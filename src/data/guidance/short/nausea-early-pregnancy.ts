import type { ShortGuidanceData } from "../types";

export const nauseaEarlyPregnancy: ShortGuidanceData = {
  family: "short",
  slug: "nausea-in-early-pregnancy",
  title: "Nausea in Early Pregnancy",
  metaTitle: "Nausea in Early Pregnancy — What's Normal & What to Do",
  metaDescription:
    "Understand why nausea happens in early pregnancy, what's normal, when to seek support, and what may help. Calm, evidence-based guidance.",
  journey: "pregnancy",
  intent: "symptom",

  quickAnswer:
    "Nausea in early pregnancy is caused by rapidly rising hCG hormone levels. It can happen at any time of day, not just mornings. It typically begins around weeks 5–6 and eases by weeks 12–14. Both strong nausea and very little nausea are normal.",

  whatIsHappening:
    "Your body is producing human chorionic gonadotropin (hCG) at a rapid rate to maintain the pregnancy. This hormone directly affects the nausea centres in your brain. Progesterone, which slows digestion, adds to the sensation. The intensity often correlates with how quickly hCG is rising — which, for many people, is a sign of healthy progression.",

  whatThisMeans:
    "Nausea is one of the most common experiences in early pregnancy. It varies enormously between people and between pregnancies. Having severe nausea doesn't mean something is wrong. Having very little nausea doesn't mean something is wrong either. Variation is the norm, not the exception.",

  normalItems: [
    "Nausea at any time of day, not just mornings",
    "Waves of nausea that come and go unpredictably",
    "Days where it's worse and days where it eases",
    "Food aversions and heightened smell sensitivity",
    "Very mild nausea, or no nausea at all",
  ],

  seekSupport: [
    "You can't keep any fluids down for more than 24 hours",
    "You're losing weight or feeling faint",
    "Vomiting is severe and persistent (this may be hyperemesis gravidarum)",
    "You have any concern that isn't settling",
  ],

  disclaimer:
    "This is not medical advice. If you have any concerns, always consult your midwife, doctor, or healthcare provider.",

  whatYouCanDo: [
    "Eat small amounts frequently — an empty stomach often makes nausea worse",
    "Plain, cold, or dry foods tend to be easier to tolerate",
    "Stay hydrated with small sips throughout the day",
    "Rest when you can — fatigue worsens nausea",
    "Ginger and acupressure wristbands help some people",
    "Avoid strong smells where possible",
  ],

  nextBestRoute: {
    label: "First Trimester guide",
    href: "/pregnancy/first-trimester",
    description: "Understand what's happening across weeks 1–12",
  },

  stageLinks: [
    { label: "Week 6", href: "/pregnancy/week/6", description: "When nausea often peaks" },
    { label: "Week 8", href: "/pregnancy/week/8", description: "Symptoms at their most intense" },
    { label: "Week 12", href: "/pregnancy/week/12", description: "When nausea often begins to ease" },
  ],

  journeyCTA: {
    label: "Start your pregnancy journey",
    href: "/pregnancy",
    description: "Get week-by-week guidance tailored to your stage of pregnancy.",
  },

  ai: {
    context: "Early pregnancy nausea, first trimester",
    prompts: [
      "Is this level of nausea normal?",
      "When does morning sickness get better?",
      "What helps with pregnancy nausea?",
    ],
  },

  cornerstoneSlug: undefined, // no deep guide built yet
};
