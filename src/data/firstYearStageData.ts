import { type StageData } from "@/data/stageData";

const firstYearBase: Omit<
  StageData,
  | "stageIndicator"
  | "title"
  | "subtitle"
  | "whatThisIs"
  | "focusItems"
  | "actionItems"
  | "reassuranceBehaviours"
  | "reassuranceClose"
  | "overthinkItems"
  | "overthinkMeaning"
  | "expectSections"
  | "difficultItems"
  | "interpretation"
  | "questions"
  | "aiPrompts"
  | "aiInputPlaceholder"
  | "emotionalTitle"
  | "emotionalBody"
  | "reflectionPrompt"
  | "pathways"
> = {
  journeyLabel: "First Year",
  normalItems: [
    "Routines changing again after a stable period",
    "Sleep shifting in phases",
    "Confidence rising and falling",
    "Comparing your baby's progress to others",
  ],
  seekSupportItems: [
    "Concerns about development or responsiveness",
    "Persistent feeding or sleep issues affecting wellbeing",
    "Anything that feels worrying to you",
  ],
  includeJournal: false,
  finalCtaTitle: "Continue your journey",
  finalCtaSub: "The first year is full of change, your adaptation is progress.",
};

const makeFirstYearStage = (
  stage: Pick<StageData, "stageIndicator" | "title" | "subtitle">,
  content: Omit<
    StageData,
    | "journeyLabel"
    | "normalItems"
    | "seekSupportItems"
    | "includeJournal"
    | "finalCtaTitle"
    | "finalCtaSub"
    | "stageIndicator"
    | "title"
    | "subtitle"
  >
): StageData => ({
  ...firstYearBase,
  ...stage,
  ...content,
});

export const firstYearStages: Record<string, StageData> = {
  "0-3-months": makeFirstYearStage(
    {
      stageIndicator: "Stage 1 of 4",
      title: "0-3 months",
      subtitle: "Adjustment, early patterns, and moving out of survival mode.",
    },
    {
      whatThisIs: [
        "This stage is about early adaptation for both you and your baby.",
        "Daily life often revolves around feeding, sleep, and recovery.",
        "Progress may feel small day to day, but it builds over time.",
      ],
      focusItems: [
        "Responding to immediate needs",
        "Building simple repeatable anchors",
        "Protecting rest where possible",
        "Reducing pressure to do everything",
      ],
      actionItems: [
        "Keep routines light and flexible",
        "Track what's helping in feeding and sleep",
        "Accept practical support early and often",
        "Focus on consistency, not perfection",
      ],
      reassuranceBehaviours: [
        "responded to your baby's cues",
        "adapted as routines shifted",
        "kept showing up through hard days",
      ],
      reassuranceClose: "you are doing what matters most right now.",
      overthinkItems: [
        "Not having a fixed routine yet",
        "Frequent changes in sleep",
        "Needing to simplify daily expectations",
      ],
      overthinkMeaning:
        "Early infancy is naturally changeable. Structure usually builds gradually.",
      expectSections: [
        {
          tag: "Baby",
          title: "Early patterns may appear, then shift.",
          bullets: [
            "Feeding rhythm developing",
            "Sleep still variable",
            "Small signs of awareness increasing",
          ],
          meaning: "Pattern changes are expected in this stage.",
        },
        {
          tag: "Daily life",
          title: "Most days are built around immediate care.",
          bullets: [
            "Time feels fragmented",
            "Plans may stay minimal",
            "Progress often feels non-linear",
          ],
          meaning: "A simple, adaptive routine is often the best fit.",
        },
      ],
      difficultItems: [
        "Sleep deprivation",
        "Mental load of constant care",
        "Unpredictable routines",
        "Pressure to feel settled quickly",
      ],
      interpretation: [
        "This phase is about stabilising, not mastering.",
        "If things feel repetitive and intense, you're in the normal rhythm of early infancy.",
      ],
      questions: [
        { q: "Is this normal at this age?", sub: "What early infancy often looks like" },
        { q: "When do routines become easier?", sub: "How rhythm usually develops" },
        { q: "How do I reduce overwhelm?", sub: "Practical support ideas" },
      ],
      aiPrompts: [
        "Is this normal right now?",
        "What should I focus on this week?",
        "How do I keep routines manageable?",
      ],
      aiInputPlaceholder: "What's been most present for you lately?",
      emotionalTitle: "This stage asks a lot from you.",
      emotionalBody: "Doing it in small steps still counts as strong progress.",
      reflectionPrompt: "What has felt most noticeable in this stage?",
      pathways: [
        {
          label: "Next Stage",
          title: "3-6 months",
          sub: "More interaction and emerging routines",
          href: "/first-year/3-6-months",
        },
        {
          label: "Hub",
          title: "First year hub",
          sub: "View the full first-year pathway",
          href: "/first-year",
        },
        {
          label: "Support",
          title: "Support guidance",
          sub: "Get extra help when needed",
          href: "/support",
        },
      ],
    }
  ),
  "3-6-months": makeFirstYearStage(
    {
      stageIndicator: "Stage 2 of 4",
      title: "3-6 months",
      subtitle: "More awareness, interaction, and early routines beginning to form.",
    },
    {
      whatThisIs: [
        "This stage often brings more engagement and clearer day-to-day rhythm.",
        "You may notice more interaction while routines continue to evolve.",
        "Things can feel more familiar, but still not fully predictable.",
      ],
      focusItems: [
        "Supporting emerging routine without rigidity",
        "Following your baby's changing cues",
        "Protecting your own capacity",
        "Staying flexible as patterns shift",
      ],
      actionItems: [
        "Use routines as guides, not strict rules",
        "Adjust daily flow as feeding/sleep needs change",
        "Keep expectations realistic in busy weeks",
        "Notice what consistently helps your baby settle",
      ],
      reassuranceBehaviours: [
        "adapted routines as needed",
        "supported development without pressure",
        "stayed responsive through change",
      ],
      reassuranceClose: "you are doing the right work for this stage.",
      overthinkItems: [
        "Routines that stop working suddenly",
        "Comparing milestones",
        "Not feeling fully settled yet",
      ],
      overthinkMeaning:
        "Even with more rhythm, change remains normal in this phase.",
      expectSections: [
        {
          tag: "Baby",
          title: "Engagement and responsiveness often increase.",
          bullets: [
            "More interaction and social cues",
            "Growing awareness of surroundings",
            "Changing sleep and nap patterns",
          ],
          meaning: "Greater interaction often comes with routine shifts.",
        },
        {
          tag: "Emotionally",
          title: "Confidence may grow with occasional dips.",
          bullets: [
            "More familiarity in daily care",
            "New uncertainty as needs change",
            "Balancing progress with fatigue",
          ],
          meaning: "Confidence in this stage tends to build unevenly.",
        },
      ],
      difficultItems: [
        "Routine shifts just as things improve",
        "Ongoing tiredness",
        "Comparison with others",
        "Trying to stay flexible under pressure",
      ],
      interpretation: [
        "This stage is about responsive rhythm, not fixed outcomes.",
        "Adapting to change means you're aligned with what this phase requires.",
      ],
      questions: [
        { q: "Is this routine change normal?", sub: "Why patterns shift in this phase" },
        { q: "Should sleep be settled by now?", sub: "What variability can still look like" },
        { q: "How do I handle milestone pressure?", sub: "Staying grounded in your own journey" },
      ],
      aiPrompts: [
        "Why has routine changed again?",
        "What should I prioritise right now?",
        "Is this development pace normal?",
      ],
      aiInputPlaceholder: "What's felt most uncertain this week?",
      emotionalTitle: "More rhythm doesn't mean no more change.",
      emotionalBody: "You're adapting well by staying flexible.",
      reflectionPrompt: "What has become easier for you in this stage?",
      pathways: [
        {
          label: "Next Stage",
          title: "6-9 months",
          sub: "Movement, curiosity, and new patterns",
          href: "/first-year/6-9-months",
        },
        {
          label: "Previous",
          title: "0-3 months",
          sub: "Early adjustment",
          href: "/first-year/0-3-months",
        },
        {
          label: "Hub",
          title: "First year hub",
          sub: "Return to first-year overview",
          href: "/first-year",
        },
      ],
    }
  ),
  "6-9-months": makeFirstYearStage(
    {
      stageIndicator: "Stage 3 of 4",
      title: "6-9 months",
      subtitle:
        "A stage of movement, curiosity, and constant change, where your baby becomes more active and daily life shifts again.",
    },
    {
      whatThisIs: [
        "This stage often brings more interaction, movement, and visible development.",
        "Your baby may feel more engaged with the world while routines continue changing.",
        "It can feel exciting, but also tiring and less predictable than expected.",
      ],
      focusItems: [
        "Following your baby's changing rhythm",
        "Expecting routines to shift again",
        "Focusing on what matters in this stage",
        "Letting development unfold without over-comparison",
      ],
      actionItems: [
        "Keep routines flexible",
        "Support movement and exploration safely",
        "Notice patterns without assuming they stay fixed",
        "Use small, realistic rhythms in daily life",
        "Give yourself room to adapt as things change",
      ],
      reassuranceBehaviours: [
        "responded to your baby's current stage",
        "adjusted as things changed",
        "supported development without pressure",
      ],
      reassuranceClose: "you are already doing what matters most.",
      overthinkItems: [
        "Development happening at a slightly different pace",
        "Routines changing again",
        "Sleep disruption returning",
        "Not feeling fully settled",
      ],
      overthinkMeaning:
        "This stage is defined by change. Things shifting again is part of the process, not a failure.",
      expectSections: [
        {
          tag: "👶 Your baby",
          title: "You may notice",
          bullets: [
            "more movement",
            "stronger curiosity",
            "greater awareness of people and surroundings",
            "more interaction and responsiveness",
          ],
          meaning:
            "This stage often feels more active because your baby is becoming more engaged with the world.",
        },
        {
          tag: "🕰 Daily life",
          title: "You may notice",
          bullets: [
            "routines improving, then changing again",
            "naps or sleep shifting",
            "more movement affecting daily rhythm",
          ],
          meaning: "Just as things start to feel more familiar, they may need adjusting again.",
        },
        {
          tag: "🧠 Emotionally",
          title: "You may feel",
          bullets: [
            "more confident in some areas",
            "still unsure when new things begin",
            "proud, tired, and stretched at the same time",
          ],
          meaning: "Confidence in the first year tends to grow unevenly, not all at once.",
        },
        {
          tag: "🔄 Ongoing change",
          title: "You may notice",
          bullets: [
            "something starts working, then stops",
            "progress in one area creates change in another",
            "new challenges replacing old ones",
          ],
          meaning:
            "The first year is less about solving things permanently and more about adapting as your baby changes.",
        },
      ],
      difficultItems: [
        "Constant change",
        "Sleep shifts",
        "Feeling like nothing stays settled for long",
        "Comparing your baby's progress to others",
        "Trying to keep up with new phases",
      ],
      interpretation: [
        "This stage can feel busy because your baby is growing quickly and daily life is adjusting around that growth.",
        "Things changing again does not mean you've lost progress.",
        "It means you're moving into a new phase.",
      ],
      questions: [
        { q: "Is this normal at this age?", sub: "Typical variation in this stage" },
        { q: "Why has sleep changed again?", sub: "Why routine shifts return" },
        { q: "Should my baby be doing more by now?", sub: "How to frame milestone pressure" },
      ],
      aiPrompts: [
        "Is this normal at this age?",
        "Why has routine changed again?",
        "What should I focus on now?",
      ],
      aiInputPlaceholder: "What's been changing most for you lately?",
      emotionalTitle: "This stage often feels like constant adjustment.",
      emotionalBody:
        "That doesn't mean you're doing it wrong, it means your baby is growing and changing.",
      reflectionPrompt:
        "What has felt most noticeable in this stage, movement, change, exhaustion, or something else?",
      pathways: [
        {
          label: "Hub",
          title: "First year hub",
          sub: "Return to your first-year overview",
          href: "/first-year",
        },
        {
          label: "Next Stage",
          title: "9-12 months",
          sub: "Mobility, personality, and transition",
          href: "/first-year/9-12-months",
        },
        {
          label: "Guide",
          title: "Development articles",
          sub: "Practical guidance for this stage",
          href: "/articles/first-year-development",
        },
      ],
    }
  ),
  "9-12-months": makeFirstYearStage(
    {
      stageIndicator: "Stage 4 of 4",
      title: "9-12 months",
      subtitle: "Mobility, personality, and transition into the next stage.",
    },
    {
      whatThisIs: [
        "This stage often feels active, relational, and full of transitions.",
        "Your baby may show stronger preferences, movement, and communication cues.",
        "Daily life can feel fuller while routines continue evolving.",
      ],
      focusItems: [
        "Supporting mobility and exploration safely",
        "Keeping routines practical and flexible",
        "Responding to emerging personality and cues",
        "Preparing for transition beyond the first year",
      ],
      actionItems: [
        "Adjust home setup for increased movement",
        "Keep expectations realistic as routines shift",
        "Use repetition for daily anchors",
        "Focus on connection over perfect schedules",
      ],
      reassuranceBehaviours: [
        "supported development with responsiveness",
        "adapted to changing routines",
        "focused on what your baby needs now",
      ],
      reassuranceClose: "you are guiding this transition well.",
      overthinkItems: [
        "Differences in milestone timing",
        "Routine changes close to one year",
        "Not feeling fully 'figured out' yet",
      ],
      overthinkMeaning:
        "Approaching one year still includes significant variation and change.",
      expectSections: [
        {
          tag: "Baby",
          title: "Movement and interaction often intensify.",
          bullets: [
            "More mobility and curiosity",
            "Stronger social engagement",
            "Changing communication cues",
          ],
          meaning: "Greater activity often reshapes daily rhythm.",
        },
        {
          tag: "Daily life",
          title: "Routines may become clearer, then shift again.",
          bullets: [
            "Naps and sleep can still change",
            "Feeding patterns may evolve",
            "Planning often requires flexibility",
          ],
          meaning: "Change remains part of normal first-year development.",
        },
      ],
      difficultItems: [
        "Keeping up with increased activity",
        "Routine changes near one year",
        "Balancing confidence with new uncertainty",
        "Pressure around milestones",
      ],
      interpretation: [
        "This phase is a transition, not a finish line.",
        "Adapting as your baby changes is the core skill of this stage.",
      ],
      questions: [
        { q: "Is this pace of development okay?", sub: "Understanding natural variation" },
        { q: "Why are routines changing again?", sub: "Common transitions near one year" },
        { q: "How do I prepare for what's next?", sub: "Moving into the next phase" },
      ],
      aiPrompts: [
        "Is this normal at this age?",
        "What should I focus on before one year?",
        "How do I handle routine changes now?",
      ],
      aiInputPlaceholder: "What's most noticeable for you in this stage?",
      emotionalTitle: "You're not behind if it still feels changeable.",
      emotionalBody: "Near one year, adaptation is still the work.",
      reflectionPrompt: "What change has felt most meaningful in this stage?",
      pathways: [
        {
          label: "Hub",
          title: "First year hub",
          sub: "Return to first-year overview",
          href: "/first-year",
        },
        {
          label: "Previous",
          title: "6-9 months",
          sub: "Movement and curiosity",
          href: "/first-year/6-9-months",
        },
        {
          label: "Next Journey",
          title: "Support",
          sub: "Get ongoing support guidance",
          href: "/support",
        },
      ],
    }
  ),
};