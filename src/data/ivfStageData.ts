import { type StageData } from "@/data/stageData";

const ivfBase: Omit<
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
  journeyLabel: "IVF",
  normalItems: [
    "Mixed emotions throughout treatment",
    "Waiting periods feeling intense",
    "Needing to adjust expectations from week to week",
    "Confidence changing across different stages",
  ],
  seekSupportItems: [
    "Physical symptoms your clinic advises reviewing urgently",
    "Persistent emotional distress affecting daily life",
    "Questions about medication timing or protocol changes",
  ],
  includeJournal: true,
  journalContext: "Capture each IVF step and how it felt, so your journey stays clear and personal.",
  finalCtaTitle: "Continue your journey",
  finalCtaSub: "One stage at a time is still forward movement.",
};

const makeIVFStage = (
  stage: Pick<StageData, "stageIndicator" | "title" | "subtitle">,
  content: Omit<
    StageData,
    | "journeyLabel"
    | "normalItems"
    | "seekSupportItems"
    | "includeJournal"
    | "journalContext"
    | "finalCtaTitle"
    | "finalCtaSub"
    | "stageIndicator"
    | "title"
    | "subtitle"
  >
): StageData => ({
  ...ivfBase,
  ...stage,
  ...content,
});

export const ivfStages: Record<string, StageData> = {
  "before-transfer": makeIVFStage(
    {
      stageIndicator: "Stage 1 of 3",
      title: "Before transfer",
      subtitle:
        "Preparation, medication, and understanding your protocol as you get ready physically and mentally.",
    },
    {
      whatThisIs: [
        "This stage is about preparation and consistency before transfer.",
        "You may be managing appointments, medication timing, and many details at once.",
        "Clarity and routine matter more than trying to feel perfectly calm.",
      ],
      focusItems: [
        "Following protocol step by step",
        "Reducing avoidable decision fatigue",
        "Preparing mentally for uncertainty",
        "Building a practical support plan",
      ],
      actionItems: [
        "Keep medication schedule visible and simple",
        "Confirm key dates and next checkpoints with your clinic",
        "Prepare practical support around transfer day",
        "Use one reliable source for treatment guidance",
      ],
      reassuranceBehaviours: [
        "followed your protocol consistently",
        "kept appointments and asked clarifying questions",
        "prepared for transfer in realistic ways",
      ],
      reassuranceClose: "you are doing what this stage asks of you.",
      overthinkItems: [
        "Not feeling emotionally 'ready' every day",
        "Small routine changes during prep",
        "Needing reminders and structure",
      ],
      overthinkMeaning:
        "Preparation is about consistency, not perfection. Structure helps because this phase carries a lot.",
      expectSections: [
        {
          tag: "Treatment",
          title: "Your schedule may feel full and specific.",
          bullets: [
            "Medication timing can feel strict",
            "Clinic check-ins may cluster around key dates",
            "Plans can shift based on monitoring",
          ],
          meaning: "Protocol adjustments are common and part of careful care.",
        },
        {
          tag: "Emotionally",
          title: "You may feel focused and stretched at once.",
          bullets: [
            "High attention to details",
            "Anticipation building toward transfer",
            "Periods of mental fatigue",
          ],
          meaning: "Feeling both hopeful and pressured is normal in this stage.",
        },
      ],
      difficultItems: [
        "Protocol complexity",
        "Pressure to get every detail right",
        "Managing practical logistics",
        "Carrying uncertainty before transfer",
      ],
      interpretation: [
        "Before transfer is a preparation phase, not a performance phase.",
        "If you're staying consistent and informed, you're already on track.",
      ],
      questions: [
        { q: "How strict does timing need to be?", sub: "Understanding what's essential" },
        { q: "What should I prepare before transfer day?", sub: "Practical readiness" },
        { q: "How do I manage the stress of protocols?", sub: "Reducing mental load" },
      ],
      aiPrompts: [
        "What matters most before transfer?",
        "How do I stay organised this week?",
        "What can I let go of right now?",
      ],
      aiInputPlaceholder: "What's been most challenging before transfer?",
      emotionalTitle: "Preparation can feel intense, that's understandable.",
      emotionalBody: "You're carrying a lot, and consistency is already meaningful progress.",
      reflectionPrompt: "What has helped you stay grounded in this prep phase?",
      pathways: [
        {
          label: "Next Stage",
          title: "After transfer",
          sub: "The waiting period and uncertainty",
          href: "/ivf/after-transfer",
        },
        {
          label: "Hub",
          title: "IVF hub",
          sub: "Return to your IVF overview",
          href: "/ivf",
        },
        {
          label: "Support",
          title: "Support guidance",
          sub: "Help for hard moments",
          href: "/support",
        },
      ],
    }
  ),
  "after-transfer": makeIVFStage(
    {
      stageIndicator: "Stage 2 of 3",
      title: "After transfer",
      subtitle:
        "The waiting period, often the most uncertain stage, where questions and emotions can feel heightened.",
    },
    {
      whatThisIs: [
        "This stage is defined by waiting more than action.",
        "You may notice yourself looking for signs while trying to stay grounded.",
        "Uncertainty here is normal and expected.",
      ],
      focusItems: [
        "Keeping daily structure simple",
        "Reducing symptom-checking loops",
        "Following post-transfer clinic guidance",
        "Protecting emotional bandwidth",
      ],
      actionItems: [
        "Decide your test plan based on clinic advice",
        "Limit repeated searching and comparison",
        "Stay with stable routines where possible",
        "Use support proactively during the wait",
      ],
      reassuranceBehaviours: [
        "completed transfer and followed guidance",
        "made space for recovery and rest",
        "stayed engaged with your care team",
      ],
      reassuranceClose: "you are doing what can be done in this stage.",
      overthinkItems: [
        "No clear symptoms",
        "Symptoms changing day to day",
        "Wanting certainty before testing",
      ],
      overthinkMeaning:
        "This stage rarely offers clear signals. Not knowing yet is part of the process.",
      expectSections: [
        {
          tag: "Body",
          title: "Physical sensations can be subtle or inconsistent.",
          bullets: [
            "Mild changes that are hard to interpret",
            "Days that feel different from each other",
            "No symptoms at all for some people",
          ],
          meaning: "Symptoms are not a reliable verdict in this phase.",
        },
        {
          tag: "Emotionally",
          title: "The wait can feel mentally heavy.",
          bullets: [
            "Hope and fear shifting together",
            "Heightened focus on small details",
            "Difficulty staying present",
          ],
          meaning: "Emotional intensity in the wait is common and valid.",
        },
      ],
      difficultItems: [
        "Lack of immediate answers",
        "Constant mental checking",
        "Pressure around outcome",
        "Managing uncertainty day by day",
      ],
      interpretation: [
        "After transfer is about waiting with care, not control.",
        "If this feels hard, that reflects the stage, not your strength.",
      ],
      questions: [
        { q: "Is this symptom meaningful?", sub: "How to interpret changes cautiously" },
        { q: "When should I test?", sub: "Timing based on guidance" },
        { q: "How do I get through the wait?", sub: "Practical support strategies" },
      ],
      aiPrompts: [
        "Is this normal right now?",
        "How do I manage the waiting period?",
        "What should I focus on today?",
      ],
      aiInputPlaceholder: "What's been on your mind during the wait?",
      emotionalTitle: "The wait can feel harder than expected.",
      emotionalBody: "You're not doing anything wrong by finding this stage difficult.",
      reflectionPrompt: "What feels most present for you right now?",
      pathways: [
        {
          label: "Previous",
          title: "Before transfer",
          sub: "Preparation and protocol",
          href: "/ivf/before-transfer",
        },
        {
          label: "Next Stage",
          title: "Early pregnancy",
          sub: "Monitoring and cautious progress",
          href: "/ivf/early-pregnancy",
        },
        {
          label: "Hub",
          title: "IVF hub",
          sub: "Return to your IVF overview",
          href: "/ivf",
        },
      ],
    }
  ),
  "early-pregnancy": makeIVFStage(
    {
      stageIndicator: "Stage 3 of 3",
      title: "Early pregnancy",
      subtitle: "Monitoring, early scans, and cautious progress as things begin to develop.",
    },
    {
      whatThisIs: [
        "This stage often brings relief and new uncertainty at the same time.",
        "You may be moving through monitoring and early milestones with cautious hope.",
        "Progress can feel meaningful while still emotionally fragile.",
      ],
      focusItems: [
        "Taking one milestone at a time",
        "Following medical guidance closely",
        "Protecting emotional steadiness",
        "Allowing mixed emotions without judgement",
      ],
      actionItems: [
        "Track appointments and key medical updates",
        "Prepare simple questions before each check-in",
        "Keep routines supportive and manageable",
        "Stay connected with trusted support",
      ],
      reassuranceBehaviours: [
        "continued care and monitoring",
        "stayed engaged with each checkpoint",
        "supported yourself through uncertainty",
      ],
      reassuranceClose: "you are navigating this stage with care and strength.",
      overthinkItems: [
        "Not feeling reassured all the time",
        "Fluctuating confidence between appointments",
        "Wanting certainty immediately",
      ],
      overthinkMeaning:
        "Cautious emotions in early pregnancy after IVF are common and understandable.",
      expectSections: [
        {
          tag: "Monitoring",
          title: "Progress is often tracked in small checkpoints.",
          bullets: [
            "Early scans and follow-up appointments",
            "Step-by-step reassurance",
            "Questions evolving with each result",
          ],
          meaning: "Progress usually feels incremental, not instant.",
        },
        {
          tag: "Emotionally",
          title: "Hope and caution can coexist.",
          bullets: [
            "Relief around milestones",
            "Anxiety between appointments",
            "Difficulty fully relaxing yet",
          ],
          meaning: "Mixed emotions are a normal response in this phase.",
        },
      ],
      difficultItems: [
        "Waiting between appointments",
        "Managing ongoing uncertainty",
        "Balancing hope with caution",
        "Feeling pressure to feel only positive",
      ],
      interpretation: [
        "Early pregnancy after IVF is often experienced in steps, not one big shift.",
        "Needing reassurance along the way is normal.",
      ],
      questions: [
        { q: "Is it normal to still feel anxious?", sub: "Understanding cautious confidence" },
        { q: "What should I expect between scans?", sub: "What this period often feels like" },
        { q: "How do I stay grounded now?", sub: "Practical emotional support" },
      ],
      aiPrompts: [
        "How do I handle anxiety between scans?",
        "What's normal in this early stage?",
        "What should I focus on this week?",
      ],
      aiInputPlaceholder: "What feels most uncertain right now?",
      emotionalTitle: "It's okay to feel hopeful and cautious together.",
      emotionalBody: "You don't need to force certainty to move forward in this stage.",
      reflectionPrompt: "What has helped you feel steady between milestones?",
      pathways: [
        {
          label: "Hub",
          title: "IVF hub",
          sub: "Return to your IVF overview",
          href: "/ivf",
        },
        {
          label: "Next Journey",
          title: "Pregnancy hub",
          sub: "Continue into pregnancy guidance",
          href: "/pregnancy",
        },
        {
          label: "Previous",
          title: "After transfer",
          sub: "The waiting period",
          href: "/ivf/after-transfer",
        },
      ],
    }
  ),
};