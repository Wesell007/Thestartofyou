import { type StageData } from "@/data/stageData";

const postpartumBase: Omit<
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
  journeyLabel: "Postpartum",
  normalItems: [
    "Recovery that feels non-linear",
    "Sleep disruption and changing routines",
    "Mixed emotions in the same day",
    "Needing support while learning new rhythms",
  ],
  seekSupportItems: [
    "Heavy bleeding, severe pain, or physical symptoms that worry you",
    "Persistent low mood, anxiety, or feeling unable to cope",
    "Feeding concerns or anything that feels unsafe",
  ],
  includeJournal: false,
  finalCtaTitle: "Continue your journey",
  finalCtaSub: "You don't need to do this perfectly, just one step at a time.",
};

const makePostpartumStage = (
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
  ...postpartumBase,
  ...stage,
  ...content,
});

export const postpartumStages: Record<string, StageData> = {
  "early-days": makePostpartumStage(
    {
      stageIndicator: "Stage 1 of 3",
      title: "Early days",
      subtitle:
        "The first days after birth, where recovery, adjustment, and caring for your baby all happen at once.",
    },
    {
      whatThisIs: [
        "This stage begins immediately after birth and can feel both intense and disorienting.",
        "Your body is recovering while your baby adjusts to life outside the womb.",
        "There may be very little structure at first, just immediate needs and constant change.",
      ],
      focusItems: [
        "Recovery and rest where possible",
        "Feeding and hydration",
        "Simple routines that reduce pressure",
        "Asking for practical support early",
      ],
      actionItems: [
        "Keep expectations narrow and realistic day to day",
        "Prioritise physical recovery, nutrition, and hydration",
        "Accept support for meals, chores, and baby care",
        "Track anything concerning and raise it with your care team",
      ],
      reassuranceBehaviours: [
        "responded to your baby's immediate needs",
        "made space for your own recovery",
        "asked for help when needed",
      ],
      reassuranceClose: "you are already doing what matters most in this stage.",
      overthinkItems: [
        "Not having a fixed routine yet",
        "Feeling emotional or overwhelmed",
        "Not doing everything the same way each day",
      ],
      overthinkMeaning:
        "Early postpartum is naturally unstructured. Constant adjustment is expected, not a sign of failure.",
      expectSections: [
        {
          tag: "Body",
          title: "Recovery often feels uneven.",
          bullets: [
            "Bleeding and soreness can vary day to day",
            "Energy may feel very low",
            "Sleep loss can amplify physical strain",
          ],
          meaning: "Good and difficult days can happen side by side.",
        },
        {
          tag: "Daily life",
          title: "Most days revolve around immediate needs.",
          bullets: [
            "Feeding and settling cycles shape the day",
            "Time can feel fragmented",
            "Simple tasks may take longer than expected",
          ],
          meaning: "A minimal routine is often the most realistic approach.",
        },
        {
          tag: "Emotionally",
          title: "Feelings can shift quickly.",
          bullets: [
            "Relief and joy can coexist with stress",
            "Tears and overwhelm are common",
            "Confidence usually builds gradually",
          ],
          meaning: "Emotional variability in this period is common and understandable.",
        },
      ],
      difficultItems: [
        "Physical recovery while caring for a newborn",
        "Sleep disruption and exhaustion",
        "Lack of routine",
        "Feeling responsible for everything at once",
      ],
      interpretation: [
        "The early days are about stabilising, not mastering.",
        "If things feel intense, that reflects the stage, not your capability.",
      ],
      questions: [
        { q: "Is this level of exhaustion normal?", sub: "Understanding early postpartum load" },
        { q: "How do I know recovery is on track?", sub: "What changes to expect" },
        { q: "When should I ask for help?", sub: "Signs to seek support early" },
      ],
      aiPrompts: [
        "Is this normal in week one?",
        "What should I focus on today?",
        "How do I ask for help clearly?",
      ],
      aiInputPlaceholder: "What's feeling hardest right now?",
      emotionalTitle: "These early days are a lot.",
      emotionalBody: "Finding this intense does not mean you're doing it wrong.",
      reflectionPrompt: "What has felt most present for you in these first days?",
      pathways: [
        {
          label: "Next Stage",
          title: "Early weeks",
          sub: "From immediate recovery into new rhythms",
          href: "/first-year/postpartum-recovery/what-recovery-can-feel-like",
        },
        {
          label: "Hub",
          title: "Postpartum hub",
          sub: "See the full postpartum journey",
          href: "/first-year#recovery-topics",
        },
        {
          label: "Support",
          title: "Ask for support",
          sub: "Guidance for what to ask and when",
          href: "/support",
        },
      ],
    }
  ),
  "early-weeks": makePostpartumStage(
    {
      stageIndicator: "Stage 2 of 3",
      title: "Early weeks",
      subtitle: "Gradual healing, emotional shifts, and small routines beginning to form.",
    },
    {
      whatThisIs: [
        "This stage often brings a little more structure, but still requires constant adjustment.",
        "You may notice progress in recovery while new questions emerge around feeding, sleep, and confidence.",
        "Things can feel better in some areas and harder in others.",
      ],
      focusItems: [
        "Protecting rest and recovery",
        "Building simple repeatable routines",
        "Reducing comparison and outside pressure",
        "Checking in with your own wellbeing",
      ],
      actionItems: [
        "Keep routines flexible rather than rigid",
        "Share night and daytime load where possible",
        "Track symptoms or concerns before appointments",
        "Create one small daily anchor that supports you",
      ],
      reassuranceBehaviours: [
        "adapted as things changed",
        "maintained care for your baby and yourself",
        "kept going through uncertain days",
      ],
      reassuranceClose: "you are moving through this stage well.",
      overthinkItems: [
        "Routines changing week to week",
        "Needing more help than expected",
        "Not feeling fully settled yet",
      ],
      overthinkMeaning:
        "This stage is transitional. Change and inconsistency are part of normal adjustment.",
      expectSections: [
        {
          tag: "Recovery",
          title: "Healing continues in the background.",
          bullets: [
            "Physical strength may return gradually",
            "Symptoms may improve unevenly",
            "Sleep loss can still affect recovery",
          ],
          meaning: "Improvement is often gradual, not linear.",
        },
        {
          tag: "Baby",
          title: "Your baby's patterns may keep shifting.",
          bullets: [
            "Feeding rhythm can change",
            "Sleep may remain unpredictable",
            "Soothing needs may vary by day",
          ],
          meaning: "Changing patterns are expected in this phase.",
        },
        {
          tag: "Emotionally",
          title: "Confidence often grows unevenly.",
          bullets: [
            "Some moments feel easier",
            "New uncertainty can still appear",
            "Mental load may remain high",
          ],
          meaning: "Growing confidence while still feeling stretched is normal.",
        },
      ],
      difficultItems: [
        "Trying to create routine too quickly",
        "Balancing healing with daily demands",
        "Feeling like progress should be faster",
        "Managing ongoing sleep disruption",
      ],
      interpretation: [
        "This stage is about finding workable rhythm, not perfect rhythm.",
        "Needing continued adjustment means you're responding to real change.",
      ],
      questions: [
        { q: "When does this feel more settled?", sub: "What transition usually looks like" },
        { q: "Is it normal for routines to keep shifting?", sub: "Why change continues" },
        { q: "How do I protect my own recovery?", sub: "Simple ways to reduce strain" },
      ],
      aiPrompts: [
        "Why does this still feel so changeable?",
        "What should I prioritise this week?",
        "How can I reduce daily overwhelm?",
      ],
      aiInputPlaceholder: "What feels most uncertain in these weeks?",
      emotionalTitle: "You're still in a phase of adjustment.",
      emotionalBody: "Not feeling fully settled yet is common at this point.",
      reflectionPrompt: "What has become easier, and what still feels heavy?",
      pathways: [
        {
          label: "Next Stage",
          title: "Ongoing adjustment",
          sub: "Building confidence over time",
          href: "/first-year/emotional-wellbeing/feeling-like-yourself-again",
        },
        {
          label: "Previous",
          title: "Early days",
          sub: "Immediate recovery and transition",
          href: "/first-year/postpartum-recovery/healing-after-birth",
        },
        {
          label: "Hub",
          title: "Postpartum hub",
          sub: "Return to the full journey overview",
          href: "/first-year#recovery-topics",
        },
      ],
    }
  ),
  "ongoing-adjustment": makePostpartumStage(
    {
      stageIndicator: "Stage 3 of 3",
      title: "Ongoing adjustment",
      subtitle: "Building rhythm, confidence, and adapting to a new normal.",
    },
    {
      whatThisIs: [
        "This stage is less about immediate recovery and more about sustainable rhythm.",
        "You may feel more capable, while still navigating ongoing change.",
        "Progress here usually looks like adaptation, not full predictability.",
      ],
      focusItems: [
        "Strengthening routines that actually fit your life",
        "Protecting emotional wellbeing",
        "Setting boundaries around pressure and comparison",
        "Keeping support active, not delayed",
      ],
      actionItems: [
        "Review what is working and let go of what isn't",
        "Build repeatable routines around feeding, sleep, and recovery",
        "Ask for targeted support instead of carrying everything",
        "Keep expectations flexible as your baby continues to change",
      ],
      reassuranceBehaviours: [
        "kept adapting as needs changed",
        "stayed responsive to your baby and yourself",
        "built rhythm without forcing perfection",
      ],
      reassuranceClose: "you are creating a strong foundation for what comes next.",
      overthinkItems: [
        "Not feeling fully 'back to normal' yet",
        "Routines still shifting",
        "Confidence rising and falling",
      ],
      overthinkMeaning:
        "Postpartum adjustment continues over time. Change at this stage is still normal.",
      expectSections: [
        {
          tag: "Rhythm",
          title: "You may notice more consistency, with interruptions.",
          bullets: [
            "Some routines become easier to repeat",
            "New phases can disrupt what was working",
            "Daily rhythm may still require frequent tweaks",
          ],
          meaning: "Stability and change often coexist in this phase.",
        },
        {
          tag: "Confidence",
          title: "Confidence often grows in layers.",
          bullets: [
            "More trust in your decisions",
            "New questions when circumstances shift",
            "Greater clarity on what your family needs",
          ],
          meaning: "Confidence is built through repetition, not certainty.",
        },
        {
          tag: "Emotionally",
          title: "You may feel steadier but still stretched.",
          bullets: [
            "More grounded in daily care",
            "Ongoing fatigue in some periods",
            "A stronger sense of what support helps",
          ],
          meaning: "Feeling better and still tired can both be true.",
        },
      ],
      difficultItems: [
        "Trying to maintain consistency through constant changes",
        "Balancing your needs with ongoing care demands",
        "Feeling pressure to be fully settled",
        "Keeping support in place as life gets busier",
      ],
      interpretation: [
        "This stage is about adaptable stability, not perfect control.",
        "If you keep adjusting, you're doing exactly what this phase requires.",
      ],
      questions: [
        { q: "Should things feel easier by now?", sub: "What adjustment over time can look like" },
        { q: "Why do routines keep changing?", sub: "Understanding ongoing transitions" },
        { q: "How do I protect my own capacity?", sub: "Support and boundaries that help" },
      ],
      aiPrompts: [
        "How do I manage ongoing change?",
        "What routine shifts are normal now?",
        "How do I avoid burnout in this stage?",
      ],
      aiInputPlaceholder: "What's feeling most important right now?",
      emotionalTitle: "You're still adapting, and that's healthy.",
      emotionalBody: "Postpartum is a process, not a single moment to complete.",
      reflectionPrompt: "What has helped you feel more grounded in this stage?",
      pathways: [
        {
          label: "Hub",
          title: "Postpartum hub",
          sub: "Return to the full postpartum guide",
          href: "/first-year#recovery-topics",
        },
        {
          label: "Next Journey",
          title: "First year",
          sub: "From early infancy into new routines",
          href: "/first-year",
        },
        {
          label: "Support",
          title: "Support guidance",
          sub: "Get clarity on what to ask and when",
          href: "/support",
        },
      ],
    }
  ),
};