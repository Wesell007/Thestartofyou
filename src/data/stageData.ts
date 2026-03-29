export interface StageExpectSection {
  tag: string;
  title: string;
  bullets: string[];
  meaning: string;
}

export interface StageQuestion {
  q: string;
  sub: string;
}

export interface StagePathway {
  label: string;
  title: string;
  sub: string;
  href: string;
}

export interface StageData {
  /** Journey context for breadcrumbs/labels */
  journeyLabel: string;
  /** e.g. "Stage 3 of 3" */
  stageIndicator?: string;
  /** Hero title */
  title: string;
  /** Hero subtitle */
  subtitle: string;

  /** Section 2: What this stage is */
  whatThisIs: string[];

  /** Section 3: What to focus on right now */
  focusItems: string[];

  /** Section 4: What to do right now (action layer) */
  actionItems: string[];

  /** Section 5: Am I doing this right? (reassurance) */
  reassuranceBehaviours: string[];
  reassuranceClose: string;

  /** Section 6: What you don't need to overthink */
  overthinkItems: string[];
  overthinkMeaning: string;

  /** Section 7: What to expect */
  expectSections: StageExpectSection[];

  /** Section 8: What can feel difficult */
  difficultItems: string[];

  /** Section 9: What this means (interpretation) */
  interpretation: string[];

  /** Section 10: What's normal & when to seek support */
  normalItems: string[];
  seekSupportItems: string[];

  /** Section 11: Common questions */
  questions: StageQuestion[];

  /** Section 12: AI support */
  aiPrompts: string[];
  aiInputPlaceholder: string;

  /** Section 13: Emotional support */
  emotionalTitle: string;
  emotionalBody: string;

  /** Section 14: Reflection */
  reflectionPrompt: string;

  /** Section 15: Include journal promotion? */
  includeJournal: boolean;
  journalContext?: string;

  /** Section 16: Pathways */
  pathways: StagePathway[];

  /** Final CTA */
  finalCtaTitle: string;
  finalCtaSub: string;
}

// --- TTC STAGE DATA ---

export const ttcStages: Record<string, StageData> = {
  "understanding-your-cycle": {
    journeyLabel: "Trying to Conceive",
    stageIndicator: "Stage 1 of 3",
    title: "Understanding your cycle",
    subtitle: "Learning how your body works, including ovulation, timing, and the patterns that matter most.",

    whatThisIs: [
      "This stage is about building a foundation, understanding how your menstrual cycle works and what influences it.",
      "For many, this is the first time paying close attention to cycle patterns, and it can feel both empowering and overwhelming.",
      "There's no pressure to become an expert overnight. Familiarity builds naturally over time.",
    ],

    focusItems: [
      "Getting familiar with your typical cycle length",
      "Learning the basics of ovulation",
      "Not overcomplicating things too early",
      "Starting simple, you can refine later",
    ],

    actionItems: [
      "Start noting cycle start dates",
      "Learn what cervical mucus changes look like",
      "Download a simple tracking app if it feels helpful",
      "Read about ovulation basics once, then give yourself time to absorb",
    ],

    reassuranceBehaviours: [
      "started paying attention to your cycle",
      "looked into how ovulation works",
      "begun tracking in any way",
    ],
    reassuranceClose: "you are already doing what matters most at this stage.",

    overthinkItems: [
      "Not knowing your exact ovulation day yet",
      "Having irregular cycles",
      "Feeling unsure about what to track",
    ],
    overthinkMeaning: "Most people don't have perfect cycles or perfect knowledge, and that's completely normal at this stage.",

    expectSections: [
      {
        tag: "Your body",
        title: "Your cycle may not look the same every month.",
        bullets: [
          "Variations in cycle length are common",
          "Ovulation doesn't always happen on the same day",
          "Symptoms can vary from cycle to cycle",
        ],
        meaning: "A textbook 28-day cycle is less common than you might think.",
      },
      {
        tag: "Emotionally",
        title: "You might feel a mix of excitement and confusion.",
        bullets: [
          "Motivated to learn everything at once",
          "Overwhelmed by the amount of information",
          "Impatient to move to the next step",
        ],
        meaning: "It's normal to feel like you should already know more than you do.",
      },
    ],

    difficultItems: [
      "Information overload",
      "Feeling behind or uninformed",
      "Not knowing what's 'normal'",
      "Wanting certainty too early",
    ],

    interpretation: [
      "This stage is about learning, not perfecting.",
      "You don't need to understand everything right now, just enough to feel grounded.",
      "Progress here looks like growing familiarity, not flawless tracking.",
    ],

    normalItems: [
      "Irregular cycles",
      "Not knowing when you ovulate",
      "Feeling overwhelmed by information",
      "Cycle lengths that vary month to month",
    ],
    seekSupportItems: [
      "Cycles consistently shorter than 21 days or longer than 35 days",
      "No period for several months",
    ],

    questions: [
      { q: "What is a normal cycle length?", sub: "Understanding the range of normal" },
      { q: "How do I know when I'm ovulating?", sub: "Signs, symptoms, and tracking basics" },
      { q: "Do I need to track everything?", sub: "What's helpful vs what's unnecessary" },
    ],

    aiPrompts: ["What's a normal cycle?", "How do I track ovulation?", "Do I need supplements?"],
    aiInputPlaceholder: "What would you like to understand about your cycle?",

    emotionalTitle: "You don't need to have it all figured out yet.",
    emotionalBody: "Learning about your body is a process, not a test you need to pass.",

    reflectionPrompt: "What has felt most new or surprising to you about understanding your cycle?",

    includeJournal: false,

    pathways: [
      { label: "Next Stage", title: "Timing and tracking", sub: "Identifying your fertile window", href: "/trying-to-conceive/timing-and-tracking" },
      { label: "Guide", title: "Ovulation basics", sub: "How ovulation works", href: "/articles/ovulation-basics" },
      { label: "Hub", title: "TTC Hub", sub: "Your full TTC guide", href: "/trying-to-conceive" },
    ],

    finalCtaTitle: "Continue your journey",
    finalCtaSub: "Move at your own pace, there's no rush.",
  },

  "timing-and-tracking": {
    journeyLabel: "Trying to Conceive",
    stageIndicator: "Stage 2 of 3",
    title: "Timing and tracking",
    subtitle: "Identifying your fertile window and recognising the patterns that help.",

    whatThisIs: [
      "This stage is about putting your cycle knowledge into practice, learning when your fertile window opens and how to work with it.",
      "It can feel exciting and pressured at the same time. Timing matters, but it doesn't need to be perfect.",
      "The goal is awareness, not obsession.",
    ],

    focusItems: [
      "Identifying your fertile window each cycle",
      "Keeping tracking simple and consistent",
      "Not letting timing become a source of stress",
      "Remembering that timing helps, but doesn't guarantee outcomes",
    ],

    actionItems: [
      "Track ovulation signs for at least two cycles",
      "Use OPKs (ovulation predictor kits) if helpful",
      "Note patterns in cervical mucus and basal temperature",
      "Plan intimacy around your fertile window without over-scheduling",
    ],

    reassuranceBehaviours: [
      "identified roughly when you ovulate",
      "timed things within your fertile window",
      "tracked consistently for at least one cycle",
    ],
    reassuranceClose: "you are doing exactly what this stage asks of you.",

    overthinkItems: [
      "Missing a day of tracking",
      "Not having perfectly timed intercourse",
      "OPK results that seem unclear",
    ],
    overthinkMeaning: "Fertility is about patterns, not perfection. A missed day or unclear result doesn't mean you've missed your chance.",

    expectSections: [
      {
        tag: "Your body",
        title: "You'll start noticing more subtle signs.",
        bullets: [
          "Changes in cervical mucus consistency",
          "Mild ovulation discomfort",
          "Shifts in basal body temperature",
        ],
        meaning: "These signs confirm your body is doing what it should, even if they're subtle.",
      },
      {
        tag: "Emotionally",
        title: "Tracking can start to feel like pressure.",
        bullets: [
          "Feeling like you need to get timing 'right'",
          "Frustration if patterns aren't clear",
          "Pressure building with each cycle",
        ],
        meaning: "It's common for tracking to shift from exciting to stressful. That doesn't mean you're doing it wrong.",
      },
      {
        tag: "Patterns",
        title: "You may notice your body follows a rhythm.",
        bullets: [
          "Consistent cycle lengths emerging",
          "Recognisable ovulation signs",
          "A clearer picture of your fertile window",
        ],
        meaning: "The more cycles you observe, the more confident you'll feel.",
      },
    ],

    difficultItems: [
      "Feeling pressure around timing",
      "Intimacy feeling scheduled rather than natural",
      "Unclear or inconsistent tracking results",
      "Wanting faster answers",
    ],

    interpretation: [
      "This stage is about finding a sustainable rhythm, not creating a military schedule.",
      "Awareness of your fertile window significantly helps, but no single cycle carries all the weight.",
      "If tracking feels overwhelming, simplifying your method is a valid choice.",
    ],

    normalItems: [
      "Fertile windows that shift slightly each month",
      "Not getting a clear positive OPK every cycle",
      "Feeling stressed about timing",
      "Intimacy feeling different than usual",
    ],
    seekSupportItems: [
      "Never detecting ovulation signs after several months of tracking",
      "Significant emotional distress affecting daily life",
    ],

    questions: [
      { q: "When is my fertile window?", sub: "Understanding timing and duration" },
      { q: "How accurate are OPKs?", sub: "What they tell you and what they don't" },
      { q: "Does timing need to be exact?", sub: "How precise you really need to be" },
    ],

    aiPrompts: ["When is my fertile window?", "Are OPKs reliable?", "How precise does timing need to be?"],
    aiInputPlaceholder: "What's on your mind about timing and tracking?",

    emotionalTitle: "Timing is a tool, not a test.",
    emotionalBody: "You don't need to get every cycle perfect. You just need to be in the right area.",

    reflectionPrompt: "What has felt most challenging about tracking and timing so far?",

    includeJournal: false,

    pathways: [
      { label: "Previous", title: "Understanding your cycle", sub: "Cycle basics and patterns", href: "/trying-to-conceive/understanding-your-cycle" },
      { label: "Next Stage", title: "Waiting and testing", sub: "The most uncertain part", href: "/trying-to-conceive/waiting-and-testing" },
      { label: "Hub", title: "TTC Hub", sub: "Your full TTC guide", href: "/trying-to-conceive" },
    ],

    finalCtaTitle: "Continue your journey",
    finalCtaSub: "You're building understanding that will serve you well.",
  },

  "waiting-and-testing": {
    journeyLabel: "Trying to Conceive",
    stageIndicator: "Stage 3 of 3",
    title: "Waiting and testing",
    subtitle: "The time between ovulation and testing, often the most uncertain part of the journey.",

    whatThisIs: [
      "This stage begins after ovulation and continues until you test.",
      "It can feel like nothing is happening, while at the same time, everything feels important.",
      "There are fewer actions to take, but more time to think.",
    ],

    focusItems: [
      "Staying grounded in your current stage",
      "Avoiding constant symptom checking",
      "Keeping your routine as normal as possible",
      "Letting time pass without trying to control it",
    ],

    actionItems: [
      "Decide in advance when you will test",
      "Avoid repeated testing too early",
      "Limit how often you search for symptoms",
      "Keep your day structured and familiar",
    ],

    reassuranceBehaviours: [
      "tracked ovulation",
      "timed things consistently",
      "reached this stage",
    ],
    reassuranceClose: "you are already doing what matters most.",

    overthinkItems: [
      "Not feeling symptoms",
      "Feeling different than expected",
      "Minor timing variations",
    ],
    overthinkMeaning: "These differences are common and don't usually indicate a problem.",

    expectSections: [
      {
        tag: "Your body",
        title: "You may notice small, hard-to-interpret changes.",
        bullets: [
          "Small physical changes",
          "Sensations that are hard to interpret",
          "Symptoms that come and go",
        ],
        meaning: "Not every symptom has a clear meaning, and that's normal.",
      },
      {
        tag: "Emotionally",
        title: "Your emotions may shift throughout the wait.",
        bullets: [
          "Hopeful at times",
          "Uncertain at others",
          "Focused on small details",
          "Unsure how to interpret what you feel",
        ],
        meaning: "Emotional shifts are part of this stage.",
      },
      {
        tag: "The waiting",
        title: "This stage often feels longer than expected.",
        bullets: [
          "Checking how you feel repeatedly",
          "Counting days",
          "Thinking ahead to testing",
        ],
        meaning: "This stage is defined more by waiting than action.",
      },
    ],

    difficultItems: [
      "Not knowing what's happening",
      "Wanting clear signs or answers",
      "Feeling like you should 'know' something",
      "Managing expectations",
    ],

    interpretation: [
      "This stage is naturally uncertain.",
      "It doesn't mean something is wrong, it means you're in a part of the process where clarity comes later.",
    ],

    normalItems: [
      "No clear symptoms",
      "Changing feelings day to day",
      "Uncertainty",
      "Emotional ups and downs",
    ],
    seekSupportItems: [
      "Ongoing distress that affects daily life",
      "Physical symptoms that concern you",
    ],

    questions: [
      { q: "Is it normal not to feel anything?", sub: "What the absence of symptoms means" },
      { q: "When should I test?", sub: "Testing timing and accuracy" },
      { q: "Why does this feel so uncertain?", sub: "Understanding the waiting phase" },
    ],

    aiPrompts: ["Is this normal right now?", "When should I test?", "Should I be feeling something?"],
    aiInputPlaceholder: "What's been on your mind during the wait?",

    emotionalTitle: "This stage can feel harder than expected.",
    emotionalBody: "You're not doing anything wrong by finding it difficult.",

    reflectionPrompt: "What has felt most present for you during this wait?",

    includeJournal: false,

    pathways: [
      { label: "Previous", title: "Timing and tracking", sub: "Understanding your fertile window", href: "/trying-to-conceive/timing-and-tracking" },
      { label: "Guide", title: "When to test", sub: "Testing timing explained", href: "/articles/when-to-test" },
      { label: "Next Journey", title: "Early pregnancy", sub: "What happens after a positive test", href: "/pregnancy" },
    ],

    finalCtaTitle: "Continue your journey",
    finalCtaSub: "Whatever happens next, you've done everything you can at this stage.",
  },
};
