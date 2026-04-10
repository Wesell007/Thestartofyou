import type { ToolInterpretationData } from "../types";

export const dueDateMeaning: ToolInterpretationData = {
  family: "tool-interpretation",
  slug: "what-your-due-date-means",
  title: "What Your Due Date Means",
  metaTitle: "What Your Due Date Actually Means — Understanding Your EDD",
  metaDescription:
    "Your estimated due date is a guide, not a deadline. Understand what it means, how it's calculated, and what to focus on now.",
  journey: "pregnancy",
  toolName: "Due Date Calculator",

  whatThisMeans:
    "Your estimated due date (EDD) is calculated as 40 weeks from the first day of your last menstrual period. It's a clinical estimate — only about 4% of babies arrive on their exact due date. Most births occur within a two-week window either side. It's a useful anchor for tracking your pregnancy, but it's not a deadline.",

  keyPoints: [
    {
      label: "It's an estimate, not a prediction",
      explanation:
        "Due dates are calculated using a standard 40-week model. Your actual delivery date depends on many factors including cycle length, when conception occurred, and individual variation.",
    },
    {
      label: "Your dating scan may adjust it",
      explanation:
        "The 12-week dating scan often provides a more accurate estimate based on the baby's measurements. It's normal for your due date to shift by a few days after this scan.",
    },
    {
      label: "Full term is a range, not a date",
      explanation:
        "Pregnancies between 37 and 42 weeks are considered full term. Your baby is most likely to arrive somewhere within this window.",
    },
    {
      label: "It tells you where you are now",
      explanation:
        "Your due date helps calculate your current week of pregnancy, which trimester you're in, and what developmental stage your baby has reached.",
    },
  ],

  whatToExpectNow:
    "Now that you have your estimated due date, you can see where you are in your pregnancy. This gives you a starting point for understanding what's happening at your stage — what your body is doing, what your baby is developing, and what to focus on right now.",

  whatNotToWorry: [
    "A few days' difference between calculators — this is normal and expected",
    "Your date changing after the dating scan — it's being refined, not corrected",
    "Going past your due date — most first pregnancies do",
    "Not feeling 'far enough along' — every pregnancy has its own pace",
  ],

  stageLinks: [
    { label: "First Trimester", href: "/pregnancy/first-trimester", description: "Weeks 1–12" },
    { label: "Your current week", href: "/pregnancy/week/8", description: "Week-by-week guidance" },
    { label: "Due Date Calculator", href: "/due-date-calculator", description: "Recalculate if needed" },
  ],

  journeyCTA: {
    label: "Start your pregnancy journey",
    href: "/pregnancy",
    description: "Get personalised, week-by-week guidance based on your due date.",
  },

  ai: {
    context: "Due date interpretation, early pregnancy orientation",
    prompts: [
      "What week am I in?",
      "Is my due date likely to change?",
      "What should I focus on right now?",
    ],
  },
};
