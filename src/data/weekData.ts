// ─── Pregnancy Week Data ───────────────────────────────────────────────────
// Structured content for each week of pregnancy.
// Used by the WeekPage template at /pregnancy/week/:week

export interface WeekSymptom {
  name: string;
  why: string;
  when?: string;
  feelLike?: string;
}

export interface WeekWhatItem {
  what: string;
  why: string;
  means: string;
}

export interface WeekSection {
  baby: WeekWhatItem & { size: string };
  body: WeekWhatItem;
  emotional: WeekWhatItem;
}

export interface WeekFocusPoint {
  action: string;
  reason: string;
}

export interface WeekData {
  week: number;
  trimester: 1 | 2 | 3;
  trimesterLabel: string;
  trimesterPath: string;
  title: string;
  heroSubtitle: string;
  reassurance: string;
  keyFocus: string;
  atAGlance: string;
  what: WeekSection;
  symptoms: WeekSymptom[];
  humanTruth: string[];          // "How this week can feel", the real lived experience
  whatThisMeans: string;         // Interpretation layer: variation is normal
  normal: string[];
  seekSupport: string[];
  disclaimer: string;
  focusPoints: WeekFocusPoint[];
  normalRightNow: string[];
  gentleReminder: string;
  reflectionPrompt: string;
  reflectionContext: string;     // Why reflection matters
  nextWeekPreview?: string;      // "Next week, you may notice…"
  aiContextPrompt: string;       // Personalised AI opener
  aiPrompts: string[];
  captureIntro: string;
}

// ─── Helper to get trimester info ─────────────────────────────────────────
export const getTrimesterForWeek = (
  week: number
): { trimester: 1 | 2 | 3; label: string; path: string } => {
  if (week <= 12) return { trimester: 1, label: "First Trimester", path: "/pregnancy/first-trimester" };
  if (week <= 27) return { trimester: 2, label: "Second Trimester", path: "/pregnancy/second-trimester" };
  return { trimester: 3, label: "Third Trimester", path: "/pregnancy/third-trimester" };
};

// Total supported pregnancy weeks (including post-due-date weeks 41-42)
export const MAX_PREGNANCY_WEEK = 42;

// ─── Week-specific data ────────────────────────────────────────────────────

const weekDatabase: Record<number, Omit<WeekData, "week" | "trimester" | "trimesterLabel" | "trimesterPath">> = {

  // ─── WEEK 1 ───────────────────────────────────────────────────────────────
  1: {
    title: "1 Week Pregnant",
    heroSubtitle: "What's happening this week, and how to navigate it.",
    reassurance: "Experiences can vary at this stage, both strong and mild symptoms can be normal.",
    keyFocus: "Preparation",
    atAGlance: "Technically, pregnancy is counted from the first day of your last period, before conception has even occurred. Your body is preparing the environment that will support new life. You may not know you're pregnant yet, and that is completely normal at this stage.",
    what: {
      baby: {
        what: "No embryo yet, conception hasn't happened",
        why: "Pregnancy is dated from the first day of your last menstrual period, not from conception. This week, your body is preparing for ovulation.",
        means: "The pregnancy countdown starts here, even though the pregnancy hasn't technically begun yet.",
        size: "Not yet present",
      },
      body: {
        what: "Your body is preparing for ovulation",
        why: "Hormones are rising to stimulate the development and release of a mature egg, a process that typically peaks around day 14 of your cycle.",
        means: "Even before pregnancy begins, your body is already working. The foundation is being laid.",
      },
      emotional: {
        what: "Many people feel nothing unusual this week",
        why: "If you're actively trying to conceive, there may be a mix of hope and quiet anticipation. If this is unexpected, this week may hold a different kind of awareness.",
        means: "There is no correct emotional response to this stage. Whatever you're feeling is valid.",
      },
    },
    symptoms: [
      {
        name: "Menstrual period",
        why: "Week 1 coincides with the end of your previous cycle.",
        when: "Days 1-5 of your cycle",
        feelLike: "Your usual period, cramping, bleeding, and the familiar patterns of your cycle.",
      },
      {
        name: "Mild cramping",
        why: "The uterus sheds its lining as part of the menstrual cycle.",
        when: "First few days of your period",
        feelLike: "Dull ache or sharp spasms in the lower abdomen, familiar and expected.",
      },
    ],
    humanTruth: [
      "Not knowing whether you're pregnant yet",
      "Feeling completely normal with no indication of what might be beginning",
      "Holding a quiet awareness if you're actively trying to conceive",
      "Uncertainty, or perhaps no particular feeling at all",
    ],
    whatThisMeans: "Week 1 is largely a calendar marker. Variation in how you feel is entirely expected, because physiologically, very little has changed yet. This stage is preparation, not action.",
    normal: ["Your period arriving as usual", "Mild to moderate cramping", "No pregnancy symptoms yet"],
    seekSupport: ["Unusually heavy bleeding", "Severe pain during your period that isn't typical for you"],
    disclaimer: "This is not medical advice. Always consult your midwife, doctor, or healthcare provider with any concerns.",
    focusPoints: [
      { action: "Take folic acid if you haven't already", reason: "400mcg daily is recommended before and during early pregnancy to support neural tube development" },
      { action: "Reduce alcohol and smoking if applicable", reason: "These have the most impact in the earliest stages of pregnancy" },
      { action: "No specific action needed this week", reason: "Rest and wait, the process has its own timeline" },
    ],
    normalRightNow: [
      "Not knowing you're pregnant yet",
      "Feeling completely normal",
      "Having your period as usual",
    ],
    gentleReminder: "Every pregnancy begins here, quietly, without fanfare. The process has started even before you know it.",
    reflectionPrompt: "How are you feeling about this stage of your journey?",
    reflectionContext: "Writing things down now, even briefly, creates a record of what this beginning felt like. It's easy to forget the quiet before everything begins.",
    nextWeekPreview: "Next week, your body continues to prepare. Ovulation will occur around day 14, and fertilisation, if it happens, will follow shortly after.",
    aiContextPrompt: "What's been on your mind this week?",
    aiPrompts: ["What happens in week 1 of pregnancy?", "When does conception typically occur?", "How should I prepare for pregnancy?"],
    captureIntro: "The beginning of a journey is often quiet. This is week one, before most of it has begun.",
  },

  // ─── WEEK 4 ───────────────────────────────────────────────────────────────
  4: {
    title: "4 Weeks Pregnant",
    heroSubtitle: "What's happening this week, and how to navigate it.",
    reassurance: "Experiences can vary at this stage, both strong and mild symptoms can be normal.",
    keyFocus: "Early confirmation",
    atAGlance: "Week 4 is often when a pregnancy test first turns positive. Implantation has occurred, and your body has begun producing pregnancy hormones. Symptoms may be minimal or absent, which is entirely normal at this stage.",
    what: {
      baby: {
        what: "Implantation has occurred, the embryo is establishing itself",
        why: "The fertilised egg has embedded into the uterine lining and begun dividing rapidly, forming layers that will eventually become organs, the placenta, and amniotic sac.",
        means: "The process is underway, even if nothing feels different yet. This is the very beginning.",
        size: "Poppy seed (~0.2mm)",
      },
      body: {
        what: "Rising hCG levels are beginning to signal changes throughout your body",
        why: "Human chorionic gonadotropin, the pregnancy hormone, begins increasing rapidly after implantation. This triggers progesterone production, which maintains the uterine lining and can cause early symptoms.",
        means: "The hormonal environment of pregnancy is being established. Symptoms at this stage can feel almost identical to pre-period changes, which is why many people aren't sure yet.",
      },
      emotional: {
        what: "The moment of a positive test is rarely simple",
        why: "A positive test triggers a complex range of responses, joy, disbelief, anxiety, or a profound sense of unreality. These often exist simultaneously.",
        means: "There is no correct emotional response to a positive test. Whatever you feel is real and valid.",
      },
    },
    symptoms: [
      {
        name: "Light spotting (implantation bleeding)",
        why: "As the embryo embeds into the uterine lining, some light spotting may occur.",
        when: "Around days 6-12 after ovulation",
        feelLike: "Much lighter than a period, sometimes just a pink or brown tint when wiping.",
      },
      {
        name: "Mild cramping",
        why: "The uterus is beginning to adjust to implantation.",
        when: "Often similar in feeling to pre-period cramping",
        feelLike: "A low, dull ache, familiar enough to be easily dismissed as PMS.",
      },
      {
        name: "Breast tenderness",
        why: "Rising progesterone and oestrogen levels increase blood flow to breast tissue.",
        when: "Can begin very early and intensify through the first trimester",
        feelLike: "Similar to pre-period tenderness, but sometimes more pronounced or sensitive to touch.",
      },
      {
        name: "Fatigue",
        why: "Your body is now directing significant energy toward establishing the pregnancy.",
        when: "Often begins this week and may intensify through weeks 6-9",
        feelLike: "A heaviness or tiredness that feels out of proportion to your activity level.",
      },
    ],
    humanTruth: [
      "Feeling not much different at all, and wondering if the test is real",
      "Symptoms that could easily be dismissed as pre-period signs",
      "Checking the test multiple times",
      "Feeling the weight of what this means, all at once",
      "The strange gap between a positive test and feeling pregnant",
    ],
    whatThisMeans: "At week 4, the absence of strong symptoms doesn't mean something is wrong. Most symptoms haven't arrived yet, hCG levels are still rising. Mild or no symptoms at this stage is not unusual and is not a sign of how the pregnancy is progressing.",
    normal: ["Experiencing no symptoms at all", "Light spotting or cramping", "A very faint positive test", "Symptoms that come and go"],
    seekSupport: ["Heavy bleeding significantly different from a period", "Severe one-sided pain", "Any concern that doesn't settle"],
    disclaimer: "This is not medical advice. Always consult your midwife, doctor, or healthcare provider with any concerns.",
    focusPoints: [
      { action: "Book a GP or midwife appointment", reason: "Early registration ensures you're in the system and supported from the start" },
      { action: "Begin taking folic acid, 400mcg daily", reason: "Critical in the earliest weeks for neural tube development" },
      { action: "Rest where possible", reason: "Your body is already doing significant work, even if it doesn't feel that way yet" },
      { action: "Avoid alcohol, smoking, and high-risk foods", reason: "These early weeks are when the foundations of development are being laid" },
    ],
    normalRightNow: [
      "Feeling not much different yet",
      "Having very few or no symptoms",
      "Feeling a mix of excitement and anxiety",
      "Wondering if the test is really positive",
    ],
    gentleReminder: "A positive test doesn't mean everything becomes clear immediately. It's okay to sit with the uncertainty of this week.",
    reflectionPrompt: "What has this week felt like for you, in ways you might not have expected?",
    reflectionContext: "Week 4 is often the first moment of knowing. Writing down how it felt, even just a few words, creates a record of a moment that can blur quickly.",
    nextWeekPreview: "Next week, hormone levels will continue to rise quickly. Some people begin to notice the first signs of nausea or stronger fatigue from week 5 onwards.",
    aiContextPrompt: "What's been on your mind this week?",
    aiPrompts: ["Is this normal at week 4?", "Why do I feel so tired already?", "What should I do after a positive test?"],
    captureIntro: "Week 4 is often the first moment of knowing. It can be overwhelming, quiet, joyful, or all of those at once.",
  },

  // ─── WEEK 5 ───────────────────────────────────────────────────────────────
  5: {
    title: "5 Weeks Pregnant",
    heroSubtitle: "What's happening this week, and how to navigate it.",
    reassurance: "Experiences can vary at this stage, both strong and mild symptoms can be normal.",
    keyFocus: "Symptoms & reassurance",
    atAGlance: "Week 5 often marks the beginning of noticeable symptoms. Hormone levels are rising quickly, and nausea, fatigue, and heightened senses are common. Some people feel very unwell, others feel relatively normal. Both are expected at this stage.",
    what: {
      baby: {
        what: "The embryo is developing its earliest structures",
        why: "The neural tube, which will become the brain and spinal cord, begins to form this week. The embryo has a basic head-to-tail axis and tiny folds that will become the heart.",
        means: "Even at this very early stage, the foundations of the most complex parts of development are being laid. The neural tube closing correctly is one of the reasons folic acid matters so much.",
        size: "Sesame seed (~1.5mm)",
      },
      body: {
        what: "hCG levels are roughly doubling every 48-72 hours",
        why: "This rapid hormone increase is responsible for most early symptoms. Progesterone is also rising, which slows digestion and can cause bloating, constipation, and nausea.",
        means: "The intensity of symptoms at week 5 is directly tied to how rapidly your hormones are rising, which, for many people, is actually a sign of healthy progression.",
      },
      emotional: {
        what: "Week 5 is often when it starts to feel real, in an often uncomfortable way",
        why: "The combination of physical symptoms and the growing awareness of what's happening can create a kind of low-level anxiety that's hard to name.",
        means: "Feeling overwhelmed, uncertain, or not entirely happy is not a sign of anything being wrong. Pregnancy is a significant adjustment, emotionally as much as physically.",
      },
    },
    symptoms: [
      {
        name: "Nausea",
        why: "Often caused by rising hCG levels. Not limited to mornings, it can occur at any time.",
        when: "Commonly begins around weeks 5-6 and may ease toward the end of the first trimester",
        feelLike: "Mild discomfort for some. For others, persistent waves that make eating and concentrating very difficult.",
      },
      {
        name: "Fatigue",
        why: "Your body is using a significant amount of energy to build the foundation of the pregnancy. Progesterone also has a sedative effect.",
        when: "Often strongest in weeks 5-9",
        feelLike: "A bone-deep tiredness that doesn't lift with rest. Many people describe needing significantly more sleep than usual.",
      },
      {
        name: "Breast tenderness",
        why: "Increased blood flow and hormonal changes cause sensitivity and sometimes swelling.",
        when: "Can feel similar to pre-period tenderness, but often more pronounced",
        feelLike: "Heightened sensitivity, sometimes just fabric touching skin can be uncomfortable.",
      },
      {
        name: "Heightened smell sensitivity",
        why: "Oestrogen amplifies your sense of smell, often before you notice other symptoms.",
        when: "Can be one of the earliest signs for some people",
        feelLike: "Smells that were previously neutral suddenly becoming overwhelming or nauseating.",
      },
      {
        name: "Increased urination",
        why: "Rising hCG increases blood flow to the kidneys, increasing urine production.",
        when: "Begins in early pregnancy and continues throughout",
        feelLike: "Needing to go more frequently, including during the night.",
      },
    ],
    humanTruth: [
      "Symptoms that don't follow any pattern from day to day",
      "Feeling worse than expected, and feeling guilty about that",
      "Feeling fine and worrying that means something is wrong",
      "Physical and emotional fatigue arriving at the same time",
      "Constantly second-guessing whether what you're experiencing is normal",
    ],
    whatThisMeans: "Variation is normal at week 5. The intensity of symptoms, or the absence of them, is not a reliable indicator of how the pregnancy is progressing. Both ends of the spectrum are common, and symptom patterns can change significantly from day to day.",
    normal: ["Nausea at any time of day, or no nausea at all", "Extreme tiredness, especially in the afternoon", "Symptoms that feel stronger or weaker day to day", "Feeling overwhelmed by the reality of being pregnant"],
    seekSupport: ["Severe vomiting preventing you from keeping fluids down", "Heavy bleeding", "Severe cramping or one-sided pain", "Any significant concern that isn't settling"],
    disclaimer: "This is not medical advice. Always consult your midwife, doctor, or healthcare provider with any concerns.",
    focusPoints: [
      { action: "Eat small, regular meals", reason: "Helps stabilise blood sugar and reduce nausea, an empty stomach often makes symptoms worse" },
      { action: "Rest where possible", reason: "Fatigue at this stage is significant and real, your body is doing enormous work" },
      { action: "Stay hydrated even when nausea is difficult", reason: "Small sips throughout the day can make a meaningful difference" },
      { action: "Avoid overthinking symptom changes", reason: "Variation day to day is normal and is not a sign of a problem" },
    ],
    normalRightNow: [
      "Feeling more tired than usual",
      "Symptoms changing unpredictably from day to day",
      "Feeling unsure or overwhelmed",
      "Wondering if everything is progressing normally",
    ],
    gentleReminder: "If this week feels harder than expected, you're not alone. Early pregnancy can feel intense, even when everything is progressing normally.",
    reflectionPrompt: "What has felt most surprising, reassuring, or uncertain so far?",
    reflectionContext: "These early weeks pass quickly, even when they feel slow. A few words about how you're actually feeling creates a record you might want to return to later.",
    nextWeekPreview: "Next week, hormone levels continue to rise. For many people, week 6 is when symptoms feel most intense, but it also often marks the beginning of a heartbeat.",
    aiContextPrompt: "What's been on your mind this week?",
    aiPrompts: ["Is this normal at week 5?", "Why do I feel so nauseous?", "What should I expect next week?"],
    captureIntro: "Week 5 is often when the reality of pregnancy starts to land. It can be intense, uncertain, and nothing like you expected.",
  },

  // ─── WEEK 6 ───────────────────────────────────────────────────────────────
  6: {
    title: "6 Weeks Pregnant",
    heroSubtitle: "What's happening this week, and how to navigate it.",
    reassurance: "Experiences can vary at this stage, both strong and mild symptoms can be normal.",
    keyFocus: "Early development",
    atAGlance: "Week 6 is a significant development milestone, a heartbeat is forming and may be visible on an early scan. Symptoms often feel at their most intense as hormone levels continue their rapid climb. Both experiencing significant symptoms and feeling relatively okay are common.",
    what: {
      baby: {
        what: "A heartbeat is forming, one of the earliest signs of life",
        why: "The embryo's heart, originally just two tubes, has begun to beat. The neural tube is closing, and small buds that will become arms and legs are appearing.",
        means: "A heartbeat at 6 weeks is a significant early milestone. It's why early scans at this stage can be so emotionally significant, it makes the pregnancy feel real in a new way.",
        size: "Lentil (~4-5mm)",
      },
      body: {
        what: "Hormone levels are at or near their peak rate of increase",
        why: "hCG typically reaches its highest rate of increase in weeks 6-8 before levelling off. This correlates with when many people feel their worst.",
        means: "Feeling unwell at week 6 is often directly tied to healthy hormone levels. That said, feeling relatively okay is also normal, symptoms vary significantly between people and pregnancies.",
      },
      emotional: {
        what: "Week 6 can bring a mix of anxiety and wonder",
        why: "If you're having an early scan, it can be a moment of profound relief, or unexpected complexity. Either response is valid.",
        means: "Whatever you feel at an early scan, or in the absence of one, is understandable. This is a stage of significant uncertainty for most people.",
      },
    },
    symptoms: [
      {
        name: "Nausea (often peaks this week)",
        why: "hCG levels are climbing fastest now, directly triggering nausea centres in the brain.",
        when: "Often worst in weeks 6-9",
        feelLike: "Constant queasiness for some, coming in waves, often worsened by smells, an empty stomach, or sudden movement.",
      },
      {
        name: "Fatigue",
        why: "Progesterone is high, and your body is working hard to maintain and build the pregnancy environment.",
        when: "May feel stronger than in previous weeks",
        feelLike: "A heaviness that doesn't respond to rest. Getting through a normal day can feel like running on nothing.",
      },
      {
        name: "Food aversions",
        why: "Hormonal changes alter taste and smell, making certain foods suddenly unappealing or nauseating.",
        when: "Can arrive suddenly and change frequently",
        feelLike: "Previously enjoyed foods becoming intolerable, sometimes the smell alone is enough to trigger nausea.",
      },
      {
        name: "Heightened emotions",
        why: "Rapid hormonal changes affect emotional regulation.",
        when: "Common throughout the first trimester",
        feelLike: "Crying without a clear reason, or reacting more intensely than feels proportionate. This is physiological.",
      },
      {
        name: "Bloating",
        why: "Progesterone slows the digestive system, causing gas and bloating.",
        when: "Often begins in early pregnancy and continues",
        feelLike: "A fullness or pressure in the abdomen, sometimes making waistbands uncomfortable before any visible bump appears.",
      },
    ],
    humanTruth: [
      "Feeling like you can't get through the day without lying down",
      "Managing work or daily life while feeling significantly unwell",
      "Nausea that doesn't follow any predictable pattern",
      "Feeling emotionally unstable without being able to explain why",
      "The exhaustion of keeping this all private while not feeling well",
    ],
    whatThisMeans: "Week 6 is often the hardest week of early pregnancy for many people. The intensity of symptoms here is largely hormonal, which means it's temporary and not a measure of anything going wrong. Both very strong symptoms and very mild symptoms fall within the range of normal.",
    normal: ["Very strong nausea, or very little nausea", "Feeling emotionally unstable without a clear trigger", "Extreme fatigue, needing significantly more sleep", "Food aversions to previously liked foods"],
    seekSupport: ["Inability to keep any fluids down for 24+ hours", "Fever", "Heavy bleeding or significant pain", "Any concern that feels serious"],
    disclaimer: "This is not medical advice. Always consult your midwife, doctor, or healthcare provider with any concerns.",
    focusPoints: [
      { action: "Eat whatever you can manage", reason: "Nutrition perfection is not the goal right now, getting something in is enough" },
      { action: "Rest as much as your life allows", reason: "Week 6 is demanding. If you can sleep more, do" },
      { action: "Accept help where it's available", reason: "This is a genuinely hard week, not a sign of weakness" },
      { action: "Remember that intense symptoms often mean active hormone levels", reason: "For many people, this is reassuring, but feeling awful is still allowed to feel awful" },
    ],
    normalRightNow: [
      "Feeling worse than last week",
      "Not wanting to eat or only managing bland foods",
      "Feeling tearful or emotionally unpredictable",
      "Needing to sleep significantly more than usual",
    ],
    gentleReminder: "If week 6 feels like the hardest yet, that's common. The intensity often relates directly to hormone activity, which, for many people, is a reassuring sign. But it's also okay to simply find it hard.",
    reflectionPrompt: "What has surprised you most about how this week has felt?",
    reflectionContext: "The first trimester is often invisible to others. Writing down what you're actually experiencing creates a record of something real and significant.",
    nextWeekPreview: "Next week, development continues rapidly. Symptoms may remain intense, but for many people, the worst begins to ease gradually from weeks 9-10.",
    aiContextPrompt: "What's been on your mind this week?",
    aiPrompts: ["Is strong nausea at week 6 normal?", "When does morning sickness get better?", "What does a 6-week scan show?"],
    captureIntro: "Week 6 can feel relentless. It's worth pausing to acknowledge how much your body is doing, even when it's uncomfortable.",
  },

  // ─── WEEK 8 ───────────────────────────────────────────────────────────────
  8: {
    title: "8 Weeks Pregnant",
    heroSubtitle: "What's happening this week, and how to navigate it.",
    reassurance: "Experiences can vary at this stage, both strong and mild symptoms can be normal.",
    keyFocus: "Symptoms & reassurance",
    atAGlance: "At 8 weeks, the embryo has all major organs beginning to form. Symptoms are often at their most intense, though many people also experience days where things ease slightly. Both are normal. The 12-week scan is approaching.",
    what: {
      baby: {
        what: "All major organ systems are beginning to form",
        why: "The embryo's facial features are becoming distinct, eyes, nose, and lips are developing. Fingers and toes are forming. The heart is beating and pumping blood.",
        means: "By week 8, the embryo has all the building blocks of a complete human body in early form. The next phase is growth and refinement, not new creation.",
        size: "Raspberry (~16mm)",
      },
      body: {
        what: "Your uterus has roughly doubled in size from pre-pregnancy",
        why: "Even without a visible bump, your uterus is growing significantly. Increased blood volume, heightened hormone levels, and expanding tissue all contribute to how your body is feeling.",
        means: "Feeling physically different, even without visible change, makes sense at week 8. Your body is doing significant structural work.",
      },
      emotional: {
        what: "Week 8 can feel like a long way in, yet still very early",
        why: "Anxiety and anticipation often coexist as the 12-week scan approaches. Many people describe a kind of low-level waiting state.",
        means: "The gap between how much has happened internally and how little feels visible or confirmed yet can create a sustained emotional tension. This is common and understandable.",
      },
    },
    symptoms: [
      {
        name: "Nausea",
        why: "Still driven by high hCG levels. This is often the peak for many people.",
        when: "Typically worst weeks 6-10, then gradually easing",
        feelLike: "Persistent queasiness that can make food, smells, and daily tasks difficult. May come in waves or be constant.",
      },
      {
        name: "Fatigue",
        why: "Your body is sustaining intensive development work. Blood volume is increasing. Rest is biologically necessary.",
        when: "Often intense through weeks 8-10 before improving",
        feelLike: "An exhaustion that doesn't respond to rest, making it hard to function at your usual level.",
      },
      {
        name: "Frequent urination",
        why: "Your kidneys are processing significantly more blood volume, and the growing uterus is beginning to press on the bladder.",
        when: "Throughout pregnancy",
        feelLike: "Needing to go more often, sometimes immediately after going.",
      },
      {
        name: "Mood changes",
        why: "Hormonal fluctuations directly affect emotional regulation. This is physiological, not a sign of weakness.",
        when: "Throughout the first trimester",
        feelLike: "Emotional reactions that feel disproportionate, crying at adverts, feeling irritable, or simply feeling raw.",
      },
      {
        name: "Constipation",
        why: "Progesterone slows digestion throughout the body.",
        when: "Common in the first trimester",
        feelLike: "Discomfort, pressure, and infrequent bowel movements that can be frustrating and uncomfortable.",
      },
    ],
    humanTruth: [
      "Nausea that varies significantly, some days manageable, some days very hard",
      "Feeling fine one day and completely depleted the next",
      "Anxiety about the 12-week scan building in the background",
      "Managing normal life while feeling significantly unwell",
      "Wondering if the inconsistency means something, it doesn't",
    ],
    whatThisMeans: "Symptom variation from day to day at week 8 is completely normal. A good day doesn't mean something has gone wrong, and a bad day doesn't mean anything has changed. Inconsistency is simply a feature of this stage.",
    normal: ["Nausea that varies significantly day to day", "Feeling fine one day and very unwell the next", "No visible bump but feeling physically different", "Anxiety about the 12-week scan"],
    seekSupport: ["Vomiting so severe you can't stay hydrated", "Heavy bleeding", "Severe abdominal pain", "Any concern that feels serious or is getting worse"],
    disclaimer: "This is not medical advice. Always consult your midwife, doctor, or healthcare provider with any concerns.",
    focusPoints: [
      { action: "Rest is productive", reason: "Your body is doing enormous work, rest is not laziness, it is necessary" },
      { action: "Eat small meals frequently", reason: "Helps manage nausea and stabilise energy" },
      { action: "Stay hydrated with whatever you can manage", reason: "Small sips count, hydration supports everything" },
      { action: "Avoid deep online symptom searching", reason: "It rarely provides reassurance and often increases anxiety" },
    ],
    normalRightNow: [
      "Feeling more tired than you've ever been",
      "Symptoms appearing, disappearing, then returning",
      "Feeling anxious about the 12-week scan",
      "Wondering if everything is okay",
    ],
    gentleReminder: "If this week feels hard, you're not imagining it. Week 8 is often one of the most physically demanding weeks of early pregnancy. You're not behind, you're doing exactly what you need to do.",
    reflectionPrompt: "What has felt most surprising or challenging this week?",
    reflectionContext: "The first trimester can feel like a secret you carry alone. Writing down what you're experiencing creates a real account of something that deserves to be remembered.",
    nextWeekPreview: "Next week, development continues rapidly. For many people, symptoms begin to plateau or ease slightly from weeks 9-10 as hCG levels start to stabilise.",
    aiContextPrompt: "What's been on your mind this week?",
    aiPrompts: ["Is this normal at week 8?", "Why do I feel so unwell?", "What should I expect next?"],
    captureIntro: "Week 8 is often when early pregnancy feels most real, and most intense. These are moments worth holding onto.",
  },

  // ─── WEEK 12 ──────────────────────────────────────────────────────────────
  12: {
    title: "12 Weeks Pregnant",
    heroSubtitle: "What's happening this week, and how to navigate it.",
    reassurance: "Reaching 12 weeks is a significant moment. Symptoms may begin to ease, but vary from person to person.",
    keyFocus: "12-week scan & transition",
    atAGlance: "Week 12 marks the end of the first trimester. The 12-week scan checks for early signs of chromosomal conditions, confirms dates, and, for many, provides significant reassurance. Symptoms may begin to ease from this point, though not always immediately.",
    what: {
      baby: {
        what: "The baby is fully formed in miniature",
        why: "By week 12, all major organs and structures are in place. The baby is now a foetus. Fingernails, genitals, and facial muscles are developing.",
        means: "The shift from 'embryo' to 'foetus' at week 12 reflects the fact that the foundational structure is complete, what follows is growth.",
        size: "Lime (~55mm)",
      },
      body: {
        what: "The placenta is taking over hormone production",
        why: "This transition from the corpus luteum to the placenta often coincides with a reduction in nausea. The body has also adapted to many of the changes of early pregnancy.",
        means: "The hormonal shift at week 12 is why many people begin to feel better around this point. It's biological, not a sign of reduced pregnancy intensity.",
      },
      emotional: {
        what: "The 12-week scan is emotionally complex",
        why: "It can bring relief, wonder, and renewed anxiety, sometimes within the same appointment. The wait for results, and the sight of the baby, can both feel overwhelming.",
        means: "Whatever you feel at the scan, including complicated or unexpected emotions, is valid. Relief and anxiety can coexist completely.",
      },
    },
    symptoms: [
      {
        name: "Reducing nausea (for many)",
        why: "As the placenta takes over hormone production, the sharp rise in hCG levels that caused nausea begins to stabilise.",
        when: "Often improves from weeks 12-14, though not for everyone",
        feelLike: "A gradual lightening, some days feel noticeably better. Not always a sudden shift.",
      },
      {
        name: "Continued fatigue",
        why: "Still present but often beginning to ease as the body adjusts to sustained pregnancy.",
        when: "Usually improves significantly in the second trimester",
        feelLike: "Still tiring, but often more manageable than the weeks before.",
      },
      {
        name: "Mild headaches",
        why: "Increased blood volume and changes in circulation can cause headaches, especially if hydration is low.",
        when: "Can appear throughout the first trimester",
        feelLike: "Dull, persistent aches, often responsive to rest and water.",
      },
      {
        name: "Round ligament discomfort",
        why: "As the uterus grows beyond the pelvis, the ligaments supporting it stretch and can cause brief sharp pains.",
        when: "Begins in the first trimester and continues into the second",
        feelLike: "Brief, sharp sensations, often on one side, that can be startling but pass quickly.",
      },
    ],
    humanTruth: [
      "Anxiety building before the scan, even if you feel physically better",
      "Relief and new anxiety arriving at the same moment",
      "The scan feeling much more emotional than anticipated",
      "Symptoms easing and not knowing whether to trust the improvement",
      "A sense of an invisible milestone being crossed",
    ],
    whatThisMeans: "The end of the first trimester is a real milestone, but it may not feel like one immediately. Relief is common. So is a quiet continuation of worry. Both are normal responses to a genuinely uncertain period coming to a close.",
    normal: ["Symptoms beginning to ease, or staying the same", "Anxiety before and after the scan", "Feeling emotionally different after seeing the scan", "A sense of things becoming more real"],
    seekSupport: ["Heavy bleeding or significant cramping at any point", "Fever or signs of infection", "Severe headaches that don't ease", "Any concern, always worth raising"],
    disclaimer: "This is not medical advice. Always consult your midwife, doctor, or healthcare provider with any concerns.",
    focusPoints: [
      { action: "Attend your 12-week scan", reason: "It checks key developmental markers and gives you important information about your pregnancy" },
      { action: "Allow yourself to feel whatever you feel after the scan", reason: "There is no correct response, relief, anxiety, and overwhelming emotion are all common" },
      { action: "Begin sharing your news if you feel ready", reason: "There is no rule about when, only what feels right for you" },
      { action: "Let the first trimester be behind you", reason: "You have navigated a genuinely demanding stage" },
    ],
    normalRightNow: [
      "Feeling anxious before the scan",
      "Feeling tearful or emotional after seeing the scan",
      "Symptoms improving, or not yet",
      "Wondering what comes next",
    ],
    gentleReminder: "The 12-week point is significant, and it's okay to let it feel that way. You've navigated a genuinely hard stage of pregnancy.",
    reflectionPrompt: "What do you want to remember about these first 12 weeks?",
    reflectionContext: "The first trimester passes, often in a blur. Before it does, it's worth noting what it actually felt like, not just medically, but personally.",
    nextWeekPreview: "Next week, many people begin to feel more like themselves again. The second trimester often brings more energy and a sense of settling.",
    aiContextPrompt: "What's been on your mind this week?",
    aiPrompts: ["What does the 12-week scan check for?", "Is it normal for symptoms to ease now?", "What happens in the second trimester?"],
    captureIntro: "The first trimester is nearly complete. It's been intense, quiet, and significant all at once, worth capturing before it passes.",
  },

  // ─── WEEK 16 ──────────────────────────────────────────────────────────────
  16: {
    title: "16 Weeks Pregnant",
    heroSubtitle: "What's happening this week, and how to navigate it.",
    reassurance: "Many people feel significantly better in the second trimester. If you still have symptoms, that's also normal.",
    keyFocus: "Growth & settling in",
    atAGlance: "Week 16 often marks a period of increased energy and wellbeing. The baby is actively developing and first movements, if not already felt, may begin in the coming weeks. This can feel like a gentler rhythm, though not always.",
    what: {
      baby: {
        what: "The baby is growing rapidly and developing unique features",
        why: "At week 16, facial muscles allow for expressions. Eyes are sensitive to light. Taste buds are forming. The baby may be making breathing movements with amniotic fluid.",
        means: "By week 16, the baby has individuality, movement, response, and developing senses. It's often the week that pregnancy shifts from abstract to tangible.",
        size: "Avocado (~116mm)",
      },
      body: {
        what: "Your bump may be becoming visible for the first time",
        why: "The uterus has risen out of the pelvis and is now visible above the pubic bone. Skin may begin to stretch as the body accommodates the growing pregnancy.",
        means: "The shift in appearance this week can feel significant, a visible sign of a pregnancy that's been invisible to the world for months.",
      },
      emotional: {
        what: "For many, week 16 brings a sense of settling",
        why: "Anxiety can still be present, particularly the anticipation of the 20-week scan, but many people feel more connected to the pregnancy by this point.",
        means: "Settling doesn't mean all uncertainty has gone. It means you've adjusted to a new reality. That's meaningful progress.",
      },
    },
    symptoms: [
      {
        name: "Reduced nausea",
        why: "hCG levels have stabilised and the placenta is now fully in control of hormone production.",
        when: "For most people, nausea has significantly reduced by week 16",
        feelLike: "Days without nausea can feel almost strange, a noticeable absence of something that was constant.",
      },
      {
        name: "Back pain",
        why: "As your uterus grows and your centre of gravity shifts, back muscles begin to compensate.",
        when: "Can increase throughout the second trimester",
        feelLike: "A dull ache, particularly in the lower back, often worsening toward the end of the day.",
      },
      {
        name: "Skin changes",
        why: "Increased oestrogen affects skin pigmentation and elasticity.",
        when: "Varies widely between individuals",
        feelLike: "Some people notice a glow. Others notice dryness, spots, or the beginning of stretch marks.",
      },
      {
        name: "Nasal congestion",
        why: "Increased blood flow and oestrogen can cause swelling in the nasal passages, pregnancy rhinitis.",
        when: "Common throughout pregnancy",
        feelLike: "Persistent stuffiness or a runny nose that doesn't resolve, unrelated to illness.",
      },
    ],
    humanTruth: [
      "A sense of finally being able to breathe, literally and metaphorically",
      "Anticipating first movements and wondering if every flutter is the baby",
      "The bump beginning to be visible, and adjusting to that",
      "Energy returning, but not always consistently",
      "A new kind of anxiety taking the place of the old one",
    ],
    whatThisMeans: "The second trimester shift is real, but it's gradual. Most people don't feel completely different overnight. Week 16 is often the beginning of a period of more stability, physically and emotionally, though variation continues to be normal.",
    normal: ["More energy than in the first trimester", "A visible bump beginning to show", "Back discomfort", "Feeling more emotionally settled (or not yet, both are valid)"],
    seekSupport: ["Severe headaches, swelling, or visual disturbances", "Heavy bleeding", "Reduced or absent movement once you've established a pattern", "Any concern worth raising"],
    disclaimer: "This is not medical advice. Always consult your midwife, doctor, or healthcare provider with any concerns.",
    focusPoints: [
      { action: "Prepare for the 20-week scan", reason: "Knowing what it checks for can reduce anxiety about the appointment" },
      { action: "Begin noticing movement patterns when they start", reason: "Establishing a baseline makes it easier to identify changes later" },
      { action: "Stay active in a way that feels manageable", reason: "Gentle movement supports circulation, mood, and energy" },
      { action: "Give yourself credit for reaching this point", reason: "The first trimester was demanding, reaching week 16 is worth acknowledging" },
    ],
    normalRightNow: [
      "More energy returning gradually",
      "Starting to show more visibly",
      "Anticipating first movements",
      "Feeling a new kind of connection to the pregnancy",
    ],
    gentleReminder: "The second trimester often brings a gentler rhythm, but it's okay if it doesn't feel entirely easy yet. Adjustment takes time.",
    reflectionPrompt: "How does pregnancy feel different now compared to the first trimester?",
    reflectionContext: "The shift from first to second trimester is subtle but real. Writing down how things feel now creates a comparison point you might find meaningful later.",
    nextWeekPreview: "Next week, development continues and the possibility of feeling first movements increases. Many people describe this as one of the most memorable moments of pregnancy.",
    aiContextPrompt: "What's been on your mind this week?",
    aiPrompts: ["When will I feel my baby move?", "What does a 16-week bump look like?", "What should I prepare for the 20-week scan?"],
    captureIntro: "Week 16 often marks a shift. Energy returns, things feel more real, and the journey continues.",
  },

  // ─── WEEK 20 ──────────────────────────────────────────────────────────────
  20: {
    title: "20 Weeks Pregnant",
    heroSubtitle: "What's happening this week, and how to navigate it.",
    reassurance: "The anatomy scan can feel emotionally intense. Feeling anxious about it is entirely normal.",
    keyFocus: "Anatomy scan milestone",
    atAGlance: "Week 20 marks the halfway point. The anatomy scan checks the baby's structure and development in detail, a significant milestone that often brings relief, but can also bring complex feelings.",
    what: {
      baby: {
        what: "The baby's anatomy can now be checked in detail",
        why: "At 20 weeks, the baby's organs, limbs, spine, and brain can all be assessed. The baby is swallowing amniotic fluid, and movement is regular.",
        means: "The 20-week scan is the most detailed view of the baby's development to date. Many people find it both reassuring and emotionally significant.",
        size: "Banana (~166mm)",
      },
      body: {
        what: "Your uterus now reaches your navel",
        why: "Blood volume has increased by around 45%. Most people are visibly pregnant by this point.",
        means: "The physical reality of the pregnancy is now undeniable, to you and to others. This can feel like a new kind of visibility.",
      },
      emotional: {
        what: "The 20-week scan is often anticipated with anxiety",
        why: "It checks for structural conditions, and many people find the wait for results genuinely hard. Feeling unsettled before and after is very common.",
        means: "Anxiety before a scan is not pessimism, it's a rational response to uncertainty. Most anatomy scans return reassuring results, but the anticipation is real.",
      },
    },
    symptoms: [
      {
        name: "Fetal movement (quickening)",
        why: "By week 20, most people have noticed first movements. These may feel like flutters, bubbles, or light taps.",
        when: "Often felt between weeks 16-22 for first pregnancies, earlier for subsequent ones",
        feelLike: "Often described as butterflies, gentle popping, or a feather-light flutter, easily mistaken for digestion at first.",
      },
      {
        name: "Back and hip pain",
        why: "The hormone relaxin is loosening joints and ligaments in preparation for birth, which can cause discomfort.",
        when: "Increases through the second and third trimesters",
        feelLike: "Achiness in the lower back and hips, often worse after standing or walking for long periods.",
      },
      {
        name: "Heartburn",
        why: "The growing uterus pushes stomach acid upward. Progesterone also relaxes the valve between stomach and oesophagus.",
        when: "Often begins in the second trimester and can intensify in the third",
        feelLike: "A burning sensation rising through the chest, often worse after eating or lying down.",
      },
      {
        name: "Swelling in feet and ankles",
        why: "Increased blood volume and pressure from the growing uterus can cause mild fluid retention.",
        when: "Often increases through the second and third trimesters",
        feelLike: "Puffiness in the lower legs and feet, often worse at the end of the day.",
      },
    ],
    humanTruth: [
      "Anxiety about the scan that can feel disproportionate, but isn't",
      "The strange pause of waiting for results",
      "Feeling movement and having it suddenly feel very real",
      "The emotional weight of being halfway",
      "Complex feelings about what 'halfway' means for your life",
    ],
    whatThisMeans: "The 20-week scan is one of the most significant appointments of pregnancy. The anxiety leading up to it is normal, as is a range of complex reactions afterward. Relief and continued worry can coexist, that doesn't mean something is wrong.",
    normal: ["Anxiety about the anatomy scan", "Feeling movement regularly, or just starting to feel it", "Mild swelling in extremities", "Complex emotional reactions to scan results"],
    seekSupport: ["Sudden severe swelling, especially with headaches or visual disturbances", "Reduced or absent movement", "Bleeding or significant pain", "Any concern from scan results you're unsure about"],
    disclaimer: "This is not medical advice. Always consult your midwife, doctor, or healthcare provider with any concerns.",
    focusPoints: [
      { action: "Prepare questions for the sonographer before your scan", reason: "You're allowed to ask questions, having them written down helps" },
      { action: "Allow yourself time to process the scan", reason: "Whatever the result, this is a significant appointment, give yourself space afterward" },
      { action: "Start noticing movement patterns", reason: "Establishing a baseline now becomes important in the coming weeks" },
      { action: "Take the rest of this week gently after the scan", reason: "Emotionally significant appointments take energy" },
    ],
    normalRightNow: [
      "Feeling anxious about the scan",
      "Not yet feeling regular movement",
      "Feeling overwhelmed by being halfway",
      "Wondering how your life will change",
    ],
    gentleReminder: "Halfway doesn't mean you need to have everything figured out. It means you've come further than you might have realised.",
    reflectionPrompt: "What feels different now that you're halfway through the pregnancy?",
    reflectionContext: "Halfway is a real marker, one that often passes quickly in the busyness of appointments and adjustment. Writing down how it feels creates a record of the middle of the journey.",
    nextWeekPreview: "Next week, movement often becomes more consistent and recognisable. Many people describe the second half of the second trimester as one of the more grounded periods of pregnancy.",
    aiContextPrompt: "What's been on your mind this week?",
    aiPrompts: ["What does the 20-week anatomy scan check for?", "Is reduced movement at week 20 normal?", "What happens in the second half of pregnancy?"],
    captureIntro: "Halfway. The scan, the movement, the growing reality, week 20 is worth pausing to mark.",
  },

  // ─── WEEK 28 ──────────────────────────────────────────────────────────────
  28: {
    title: "28 Weeks Pregnant",
    heroSubtitle: "What's happening this week, and how to navigate it.",
    reassurance: "Third trimester symptoms can be demanding. Taking things one week at a time is enough.",
    keyFocus: "Third trimester begins",
    atAGlance: "Week 28 marks the start of the third trimester. The baby is growing rapidly and preparing for birth. Your body is changing again, and the end, though weeks away, is now on the horizon.",
    what: {
      baby: {
        what: "The baby is beginning to practise for life outside the womb",
        why: "The brain is developing rapidly. Eyes can now open and close. The baby is practising breathing movements with amniotic fluid.",
        means: "Week 28 marks a significant developmental threshold, survival outside the womb is now possible with medical support. This is a meaningful milestone.",
        size: "Aubergine (~250mm)",
      },
      body: {
        what: "Third trimester physical changes are now significant",
        why: "The uterus is large enough to cause compression on the diaphragm, stomach, and bladder. Heartburn, breathlessness, and pelvic pressure are all common.",
        means: "The physical demands of the third trimester are real. What might have felt like mild discomfort in the second trimester can intensify as the pregnancy grows.",
      },
      emotional: {
        what: "Anticipation mixed with quiet intensity",
        why: "Birth is real now, close enough to think about, but still far enough to carry uncertainty.",
        means: "The emotional shift of the third trimester is toward the end of pregnancy and the beginning of what comes next. Anxiety about birth, readiness, and change often co-exist.",
      },
    },
    symptoms: [
      {
        name: "Breathlessness",
        why: "The growing uterus is pressing against the diaphragm, reducing lung capacity.",
        when: "Often improves briefly at the end of pregnancy when the baby drops",
        feelLike: "Feeling winded from minimal exertion, climbing stairs or walking quickly can feel surprisingly demanding.",
      },
      {
        name: "Braxton Hicks contractions",
        why: "Practice contractions that help prepare the uterus for labour. Usually irregular and painless.",
        when: "Can begin in the second trimester and become more noticeable in the third",
        feelLike: "A tightening across the abdomen, uncomfortable but not painful. Irregular and short.",
      },
      {
        name: "Pelvic pressure and discomfort",
        why: "The baby's weight is now significant and presses on the pelvic floor.",
        when: "Increases through the third trimester",
        feelLike: "A heaviness low in the pelvis, sometimes described as pressure or an aching sensation.",
      },
      {
        name: "Sleep difficulties",
        why: "Physical discomfort, frequent urination, and anxiety can all disrupt sleep.",
        when: "Often worsens through the third trimester",
        feelLike: "Difficulty finding a comfortable position, waking frequently, and feeling unrefreshed.",
      },
    ],
    humanTruth: [
      "The physical demands of third trimester arriving all at once",
      "Sleep becoming genuinely difficult for the first time",
      "Birth feeling closer, and more real",
      "A kind of sustained, quiet intensity that's hard to describe to others",
      "The mental load of preparing while still managing daily life",
    ],
    whatThisMeans: "The third trimester asks more of your body than the second. Increased discomfort, fatigue, and changed sleep are normal, not signs of a problem. One week at a time is a genuinely appropriate strategy here.",
    normal: ["Feeling more physically limited", "Waking frequently at night", "Braxton Hicks contractions", "Feeling more emotionally focused on birth"],
    seekSupport: ["Regular contractions before 37 weeks", "Reduced fetal movement", "Sudden severe headaches, visual disturbances, or significant swelling", "Any concern that feels urgent"],
    disclaimer: "This is not medical advice. Always consult your midwife, doctor, or healthcare provider with any concerns.",
    focusPoints: [
      { action: "Begin thinking about a birth plan", reason: "Not as a rigid plan, but as a set of preferences that helps you feel prepared" },
      { action: "Continue monitoring fetal movement", reason: "Knowing your baby's typical pattern makes it easier to identify changes" },
      { action: "Rest where possible", reason: "The third trimester is physically demanding, rest is not optional" },
      { action: "Connect with your midwife about what to expect next", reason: "Knowing what's ahead reduces the unknown" },
    ],
    normalRightNow: [
      "Feeling more tired again",
      "Physical discomfort increasing",
      "Thinking about birth more frequently",
      "Feeling a mix of readiness and fear",
    ],
    gentleReminder: "The third trimester is a long final stretch. It doesn't need to be powered through, it can be navigated one week at a time.",
    reflectionPrompt: "As the third trimester begins, what feels most present for you right now?",
    reflectionContext: "The third trimester has a particular quality, heavier, slower, more internal. Writing down how it feels creates a record of a stage that's genuinely different from everything before it.",
    nextWeekPreview: "Next week, third trimester patterns continue. Appointments will become more frequent as birth approaches.",
    aiContextPrompt: "What's been on your mind this week?",
    aiPrompts: ["What's normal in the third trimester?", "When do I need to worry about contractions?", "What should I prepare before birth?"],
    captureIntro: "The third trimester has a quality all its own, heavy, quiet, and full of waiting. These are weeks worth remembering.",
  },

  // ─── WEEK 36 ──────────────────────────────────────────────────────────────
  36: {
    title: "36 Weeks Pregnant",
    heroSubtitle: "What's happening this week, and how to navigate it.",
    reassurance: "Physical discomfort at this stage is significant. You are very close to the end.",
    keyFocus: "Final preparation",
    atAGlance: "Week 36 marks the final weeks of pregnancy. The baby is nearly full term, your body is preparing for labour, and the physical and emotional intensity of this stage is at its peak.",
    what: {
      baby: {
        what: "The baby is nearly ready for birth",
        why: "The baby's lungs are nearly mature. Fat layers are building for warmth and energy. The baby may move into a head-down position if not already.",
        means: "At 36 weeks, the baby could safely arrive at any time, and is fully formed, with only the final weeks of development remaining.",
        size: "Honeydew melon (~470mm)",
      },
      body: {
        what: "Your body is preparing for labour in ways you may begin to notice",
        why: "The cervix may begin to soften and efface. The baby dropping into the pelvis can relieve pressure on the diaphragm but increase pelvic discomfort.",
        means: "The physical preparation for birth is happening, even before labour begins. Changes you notice now are your body readying itself.",
      },
      emotional: {
        what: "Week 36 often brings a particular kind of intensity",
        why: "Anticipation, anxiety about birth, and a growing readiness that sits alongside uncertainty.",
        means: "Feeling ready and not ready at the same time is one of the most common experiences of the final weeks. Both parts of that are real.",
      },
    },
    symptoms: [
      {
        name: "Increased pelvic pressure",
        why: "As the baby descends into the pelvis, pressure on the pelvic floor and bladder increases significantly.",
        when: "Can occur weeks before labour or closer to the date",
        feelLike: "A heaviness low in the pelvis, sometimes described as feeling like the baby might fall out.",
      },
      {
        name: "Increased Braxton Hicks",
        why: "Practice contractions increase in frequency as the body prepares for labour.",
        when: "Irregular and without a building pattern, unlike true labour",
        feelLike: "Tightening across the abdomen, more frequent and sometimes stronger than before.",
      },
      {
        name: "Nesting urge",
        why: "A burst of energy and motivation to prepare the home. Not universal, but common.",
        when: "Often most noticeable in the final few weeks",
        feelLike: "A sudden urge to clean, organise, and prepare, sometimes arriving when overall energy is low.",
      },
      {
        name: "Difficulty sleeping",
        why: "Physical discomfort, frequent urination, and heightened anxiety about birth all contribute.",
        when: "Often peaks in the final weeks of pregnancy",
        feelLike: "Struggling to find a comfortable position, waking frequently, and a mind that won't switch off.",
      },
    ],
    humanTruth: [
      "Feeling physically exhausted and emotionally close to the surface",
      "Anxiety about birth that's hard to set aside",
      "A strange mix of wanting it to be over and not feeling ready",
      "The nesting urge arriving alongside complete exhaustion",
      "Every sensation becoming 'is this it?'",
    ],
    whatThisMeans: "Week 36 is genuinely intense, physically and emotionally. The discomfort is real, the uncertainty is real, and the anxiety is normal. You are very close to the end of a long journey.",
    normal: ["Feeling physically exhausted and ready", "Anxiety about labour and birth", "Increased frequency of Braxton Hicks", "Nesting urges, or feeling too tired to nest"],
    seekSupport: ["Regular contractions (every 5 minutes, lasting 1 minute, for 1 hour)", "Waters breaking", "Heavy bleeding", "Reduced fetal movement, always worth contacting your midwife"],
    disclaimer: "This is not medical advice. Always consult your midwife, doctor, or healthcare provider with any concerns.",
    focusPoints: [
      { action: "Know the signs of early labour", reason: "Knowing what to look for reduces the panic of not knowing when it's real" },
      { action: "Ensure your hospital bag is packed", reason: "Having it ready removes one source of anxiety" },
      { action: "Rest as much as you can", reason: "Labour requires energy, conserving it now matters" },
      { action: "Trust that your body has been preparing for this", reason: "Everything that's happening physically is preparing you for birth" },
    ],
    normalRightNow: [
      "Feeling ready and not ready simultaneously",
      "Physical discomfort at its most significant",
      "Thinking about birth every day",
      "Feeling emotionally close to the surface",
    ],
    gentleReminder: "You are very close. The uncertainty you're feeling is not a sign of unreadiness, it's simply what the end of pregnancy feels like.",
    reflectionPrompt: "What do you want to remember about these final weeks before birth?",
    reflectionContext: "The final weeks pass faster than they feel. Writing down what this stage is like, the discomfort, the anticipation, the quiet, creates a record of a genuinely unique moment.",
    nextWeekPreview: "Next week, you'll be at 37 weeks, technically full term. Birth can happen at any point from now.",
    aiContextPrompt: "What's been on your mind this week?",
    aiPrompts: ["What are the signs of early labour?", "How do I know if my waters have broken?", "What should I pack in my hospital bag?"],
    captureIntro: "These final weeks before birth have a quality unlike any other. They pass quickly, and are worth capturing.",
  },

  // ─── WEEK 40 ──────────────────────────────────────────────────────────────
  40: {
    title: "40 Weeks Pregnant",
    heroSubtitle: "What's happening this week, and how to navigate it.",
    reassurance: "Only around 5% of babies are born on their due date. Arriving before or after is common and normal.",
    keyFocus: "Due date & waiting",
    atAGlance: "Week 40 is the official due date. The baby is fully ready for birth, and birth can happen any day now. Waiting at this stage is normal, even when it feels hard.",
    what: {
      baby: {
        what: "The baby is fully developed and ready for birth",
        why: "The baby has well-developed lungs, a layer of vernix, and fully formed organs. The skull bones are slightly soft to ease passage through the birth canal.",
        means: "Your baby is ready. The timing is now simply a question of when, not of readiness.",
        size: "Small pumpkin (~510mm)",
      },
      body: {
        what: "Your body is fully prepared for labour",
        why: "The cervix is ripening and the body is producing high levels of oxytocin and prostaglandins. These hormones trigger labour, the exact timing varies and is not fully understood even by medical science.",
        means: "The unpredictability of the due date is not a failure of your body, it's the nature of the process. Bodies don't read calendars.",
      },
      emotional: {
        what: "The due date can feel anticlimactic if the baby hasn't arrived",
        why: "Anxiety, impatience, and a particular kind of suspended anticipation are all very common.",
        means: "Sitting with uncertainty at this level, when something enormous is about to happen but hasn't yet, is one of the harder emotional experiences of late pregnancy.",
      },
    },
    symptoms: [
      {
        name: "Loss of mucus plug",
        why: "The cervix begins to open, releasing the plug that sealed it during pregnancy.",
        when: "Can happen days or weeks before labour",
        feelLike: "A discharge, sometimes bloody, sometimes just thick and clear, that can be surprising when it appears.",
      },
      {
        name: "Increased pelvic pressure",
        why: "The baby is low in the pelvis.",
        when: "Ongoing and increasing as labour approaches",
        feelLike: "A constant heaviness and pressure, walking can feel uncomfortable.",
      },
      {
        name: "Irregular contractions",
        why: "Braxton Hicks or early labour contractions may increase.",
        when: "True labour contractions will be regular and increasing in intensity",
        feelLike: "Tightening, pressure, or cramping, the question of whether they're 'real' is one of the most common anxieties of this week.",
      },
      {
        name: "Emotional intensity",
        why: "Anticipation, anxiety about birth, and the approaching change in your life all converge.",
        when: "This week and in the days surrounding it",
        feelLike: "Everything feeling heightened, small things carrying unusual weight.",
      },
    ],
    humanTruth: [
      "Every sensation becoming 'is this it?' and often not being it",
      "The due date passing without anything happening",
      "A particular kind of suspended, breathless waiting",
      "Feeling physically at your limit while emotionally needing to hold on",
      "The strange experience of waiting for something that will change everything",
    ],
    whatThisMeans: "The due date is a statistical estimate, not a deadline. Most pregnancies end within two weeks either side of the due date. Waiting beyond it is not unusual, your body and baby have their own timeline.",
    normal: ["The baby not yet being born on the due date", "Feeling anxious or impatient", "Irregular contractions that don't progress", "Mixed emotions as the due date passes"],
    seekSupport: ["Reduced fetal movement, always contact your midwife", "Regular contractions every 5 minutes", "Waters breaking, clear, green, or brown fluid", "Any concern, your midwife will always want to hear from you"],
    disclaimer: "This is not medical advice. Always consult your midwife, doctor, or healthcare provider with any concerns.",
    focusPoints: [
      { action: "Stay in contact with your midwife", reason: "About induction options if you're approaching or past your due date" },
      { action: "Continue monitoring fetal movement", reason: "Movement is the most important thing to track in these final days" },
      { action: "Try to rest", reason: "Labour requires energy, protecting yours now matters" },
      { action: "Let people support you through the waiting", reason: "The due date brings its own emotional weight, you don't have to carry it alone" },
    ],
    normalRightNow: [
      "Due date passing without labour beginning",
      "Feeling a mix of readiness and fear",
      "Every sensation feeling like 'is this it?'",
      "Feeling physically and emotionally at capacity",
    ],
    gentleReminder: "Your due date is an estimate, not a deadline. Your baby will arrive. The waiting, as hard as it is, will end.",
    reflectionPrompt: "As you wait for birth, what do you most want to hold onto from this pregnancy?",
    reflectionContext: "These final days are unlike anything else. Before everything changes, it's worth capturing what this waiting feels like, and what this pregnancy has meant.",
    nextWeekPreview: "If you reach week 41, you'll be offered further monitoring and discussed induction options with your midwife.",
    aiContextPrompt: "What's been on your mind this week?",
    aiPrompts: ["What happens if I go past my due date?", "What are the signs of labour starting?", "What is induction and when is it offered?"],
    captureIntro: "The final days of pregnancy. Suspended, intense, and profoundly significant, even when nothing is happening.",
  },

  // ─── WEEK 41 ──────────────────────────────────────────────────────────────
  41: {
    title: "41 Weeks Pregnant",
    heroSubtitle: "What's happening this week, and how to navigate it.",
    reassurance: "Going past your due date is common. Around 1 in 5 pregnancies continue beyond 40 weeks, and most progress safely with monitoring.",
    keyFocus: "Monitoring & patience",
    atAGlance: "Week 41 means you've gone past your estimated due date. This is more common than most people expect. Your midwife will be monitoring you more closely, and conversations about induction may begin. Your baby is fully developed and continues to gain weight.",
    what: {
      baby: {
        what: "Fully developed and continuing to grow",
        why: "Your baby is adding weight, building fat reserves, and their brain is still maturing. Meconium (the first stool) is accumulating in the bowels. The vernix coating may be thinning.",
        means: "Your baby is ready. The additional time is not harmful in itself, but monitoring ensures everything remains on track.",
        size: "Small pumpkin (~520mm)",
      },
      body: {
        what: "Your body continues to prepare for labour",
        why: "The cervix may be softening and thinning (effacing). Hormone levels continue to shift, and your body is building toward spontaneous labour even when it doesn't feel that way.",
        means: "Going past your due date is not a failure of your body. Some pregnancies simply take longer, and that is a normal variation.",
      },
      emotional: {
        what: "The waiting can feel particularly intense after the due date passes",
        why: "Anticipation, frustration, and pressure from others asking 'any news yet?' can feel overwhelming. There's a unique emotional weight to waiting for something you expected to have happened already.",
        means: "Feeling impatient, frustrated, or anxious is completely understandable. These feelings don't need to be managed away, they need to be acknowledged.",
      },
    },
    symptoms: [
      { name: "Increased Braxton Hicks contractions", why: "The uterus continues to practice for labour.", when: "Can increase noticeably in the evenings", feelLike: "Tightening across the abdomen, sometimes stronger than previous weeks but still irregular." },
      { name: "Pelvic pressure and heaviness", why: "The baby is low in the pelvis.", when: "Constant, often worse when standing or walking", feelLike: "A heavy, pressing sensation low in the pelvis." },
      { name: "Difficulty sleeping", why: "Physical discomfort, frequent toilet trips, and emotional anticipation.", when: "Ongoing", feelLike: "Fragmented, uncomfortable sleep despite being exhausted." },
      { name: "Emotional intensity", why: "Waiting, physical discomfort, and external pressure.", when: "Ongoing", feelLike: "Frustration, tearfulness, impatience, and a particular kind of limbo." },
    ],
    humanTruth: [
      "The relentless 'any news?' messages from well-meaning people",
      "Feeling like your body should have done this by now",
      "The strange limbo of being past a date you built your expectations around",
      "Every twinge becoming a potential sign, and then not being one",
      "The particular frustration of having no control over when labour begins",
    ],
    whatThisMeans: "Week 41 is within the normal range of pregnancy duration. Your midwife will offer additional monitoring, typically including fetal heart rate checks and discussions about induction.",
    normal: ["Not being in labour yet", "Feeling frustrated or emotional", "Stronger Braxton Hicks", "Feeling physically at your limit", "Needing more rest than ever"],
    seekSupport: ["Reduced fetal movement", "Regular contractions (every 5 minutes for an hour)", "Waters breaking", "Any sudden changes in how you feel"],
    disclaimer: "This is not medical advice. Always consult your midwife, doctor, or healthcare provider with any concerns.",
    focusPoints: [
      { action: "Attend your post-dates monitoring appointments", reason: "Your midwife will check your baby's wellbeing and discuss your options" },
      { action: "Continue monitoring fetal movement", reason: "This remains the most important thing to track" },
      { action: "Discuss induction options with your midwife", reason: "Understanding what's available helps you make informed decisions" },
      { action: "Rest, and protect your energy", reason: "Labour could begin at any time" },
    ],
    normalRightNow: [
      "Feeling impatient and frustrated",
      "Wondering if something is wrong (it usually isn't)",
      "Wanting it to be over while also feeling nervous about what's next",
      "Being tired of waiting",
    ],
    gentleReminder: "Your due date was always an estimate. Your baby will arrive. The waiting is hard, but it does end.",
    reflectionPrompt: "What has this waiting taught you about patience, control, and letting go?",
    reflectionContext: "The days beyond a due date have a specific emotional texture worth capturing honestly.",
    nextWeekPreview: "If you reach week 42, your midwife will likely recommend induction. This is a conversation, not a directive.",
    aiContextPrompt: "What's been on your mind this week?",
    aiPrompts: ["What happens at week 41?", "What does post-dates monitoring involve?", "What are my options for induction?"],
    captureIntro: "Beyond the due date. The waiting has its own quality, and it's worth recording honestly.",
  },

  // ─── WEEK 42 ──────────────────────────────────────────────────────────────
  42: {
    title: "42 Weeks Pregnant",
    heroSubtitle: "What's happening this week, and how to navigate it.",
    reassurance: "Reaching week 42 is uncommon but it does happen. You will be closely monitored, and your midwife will guide you through the options available.",
    keyFocus: "Decision-making & support",
    atAGlance: "Week 42 marks the point at which most healthcare providers recommend induction if labour hasn't begun. Your baby is fully mature, and additional monitoring ensures their wellbeing. This is a stage that requires close communication with your midwife or consultant.",
    what: {
      baby: {
        what: "Fully mature and ready for birth",
        why: "Your baby continues to grow but the placenta may begin to work less efficiently. Amniotic fluid levels can decrease. This is why monitoring intensifies.",
        means: "Your baby is healthy and ready. The focus shifts to ensuring the environment remains optimal.",
        size: "Small pumpkin (~530mm)",
      },
      body: {
        what: "Your body is still working toward labour",
        why: "The hormonal cascade that triggers labour can happen at any point. Some people's bodies take longer to reach the tipping point, and that variation is part of normal biology.",
        means: "Reaching week 42 does not mean your body has failed. It means the timeline is slightly longer than average.",
      },
      emotional: {
        what: "The emotional experience at week 42 can be particularly complex",
        why: "Decisions about induction, pressure from others, exhaustion, and anxiety about the baby's wellbeing can all converge.",
        means: "Whatever you're feeling is valid. Being asked to make decisions when you're exhausted and anxious is genuinely hard.",
      },
    },
    symptoms: [
      { name: "Continued discomfort", why: "All the physical symptoms of late pregnancy continue and may intensify.", when: "Ongoing", feelLike: "Exhaustion, pelvic pressure, back pain." },
      { name: "Emotional exhaustion", why: "Two weeks past a due date creates sustained anticipatory stress.", when: "Ongoing and cumulative", feelLike: "Beyond impatience, a deeper weariness." },
      { name: "Possible early labour signs", why: "Many people at 42 weeks begin to show signs of labour starting.", when: "Can happen at any point", feelLike: "Show, irregular contractions, lower back pain, or a general sense that something is shifting." },
    ],
    humanTruth: [
      "Feeling like you're the only person who has ever been this pregnant",
      "Navigating induction conversations while exhausted",
      "The weight of making decisions that feel enormous",
      "Wanting someone to just tell you what to do, and also wanting autonomy",
      "A deep, bone-level readiness for this to be over",
    ],
    whatThisMeans: "Week 42 is the point at which most guidelines recommend induction, primarily because the placenta may become less efficient. This doesn't mean something is wrong, it means the balance of risks shifts.",
    normal: ["Feeling overwhelmed by the decisions ahead", "Physical exhaustion at its peak", "Emotional complexity about induction", "Still not being in spontaneous labour"],
    seekSupport: ["Reduced fetal movement at any point", "Any signs of labour", "Feeling unable to cope emotionally", "Any concern at all"],
    disclaimer: "This is not medical advice. Always consult your midwife, doctor, or healthcare provider with any concerns.",
    focusPoints: [
      { action: "Have a conversation with your midwife about induction", reason: "Understanding the process and your options helps you feel more in control" },
      { action: "Continue monitoring fetal movement closely", reason: "This remains the single most important thing" },
      { action: "Make sure your hospital bag is ready", reason: "Whether labour starts naturally or through induction, you'll want to be prepared" },
      { action: "Accept support from those around you", reason: "This stage is hard. You don't need to get through it alone" },
    ],
    normalRightNow: [
      "Feeling completely done with pregnancy",
      "Having mixed feelings about induction",
      "Feeling anxious about your baby's wellbeing",
      "Needing reassurance that this will end",
    ],
    gentleReminder: "You have navigated an entire pregnancy to get here. However your baby arrives, you have done something extraordinary.",
    reflectionPrompt: "What do you most want to remember about the way this pregnancy ended?",
    reflectionContext: "Week 42 is rare enough that few people write about it honestly. What you're experiencing now is worth capturing.",
    aiContextPrompt: "What's been on your mind this week?",
    aiPrompts: ["What happens at week 42?", "What does induction involve?", "Is my baby safe at 42 weeks?"],
    captureIntro: "Week 42. The longest wait. However this ends, what you've carried deserves to be honoured.",
  },
};

// ─── Fallback generator for weeks without specific data ────────────────────
const generateWeekData = (week: number): Omit<WeekData, "week" | "trimester" | "trimesterLabel" | "trimesterPath"> => {
  const { trimester } = getTrimesterForWeek(week);

  const trimesterContexts = {
    1: {
      heroSubtitle: "What's happening this week, and how to navigate it.",
      keyFocus: "Early development",
      symptoms: [
        { name: "Nausea", why: "Rising hCG levels stimulate nausea centres in the brain.", when: "Can occur at any time of day", feelLike: "Varying from mild queasiness to persistent waves." },
        { name: "Fatigue", why: "Your body is directing significant energy toward establishing the pregnancy.", feelLike: "A deep tiredness that doesn't resolve with rest." },
        { name: "Breast tenderness", why: "Hormonal changes increase blood flow to breast tissue.", feelLike: "Sensitivity that can range from mild to significant." },
      ],
      focusPoints: [
        { action: "Rest where possible", reason: "Your body is doing significant work, rest supports it" },
        { action: "Take folic acid daily", reason: "Critical in early pregnancy for development" },
        { action: "Eat small, regular meals", reason: "Helps manage nausea and stabilise energy" },
        { action: "Avoid over-researching symptoms", reason: "Variation is normal and online searches rarely provide reassurance" },
      ],
      humanTruth: [
        "Symptoms that don't follow a predictable pattern",
        "Feeling well one day and unwell the next",
        "Wondering constantly whether what you're experiencing is normal",
        "Managing the invisible nature of early pregnancy",
      ],
      whatThisMeans: "Variation in symptoms at this stage is entirely normal. The absence of symptoms doesn't indicate a problem, and intense symptoms don't mean something is wrong. Inconsistency is expected.",
      gentleReminder: "The first trimester is often harder than it looks from the outside. You're doing more than you know.",
      captureIntro: `Week ${week} of pregnancy, a time of quiet but significant change.`,
      nextWeekPreview: `Next week continues the patterns of the first trimester. Development is ongoing.`,
      reflectionContext: "These early weeks can be intense and private. Writing down how you're feeling creates a record worth having.",
    },
    2: {
      heroSubtitle: "What's happening this week, and how to navigate it.",
      keyFocus: "Growth & development",
      symptoms: [
        { name: "Back pain", why: "Your centre of gravity is shifting as the baby grows.", feelLike: "A dull ache, particularly in the lower back." },
        { name: "Heartburn", why: "The growing uterus pushes stomach acid upward.", feelLike: "A burning sensation in the chest, often worse after eating." },
        { name: "Fetal movement", why: "The baby is active and growing, movements are becoming more regular.", feelLike: "Flutters, taps, or rolls that are becoming more distinct." },
      ],
      focusPoints: [
        { action: "Monitor fetal movement regularly", reason: "Knowing your baby's pattern helps you identify changes" },
        { action: "Stay gently active", reason: "Movement supports circulation and energy" },
        { action: "Attend scheduled appointments", reason: "The second trimester has key monitoring milestones" },
        { action: "Rest when needed", reason: "Pregnancy is physically demanding even when it feels more manageable" },
      ],
      humanTruth: [
        "A sense of settling into the reality of pregnancy",
        "New questions emerging as the pregnancy grows",
        "The bump becoming part of daily life",
        "A shifting sense of what feels normal",
      ],
      whatThisMeans: "The second trimester is often described as more comfortable, but it brings its own adjustments. Variation in energy, emotions, and symptoms continues to be normal.",
      gentleReminder: "The second trimester is a time of adjustment. It's okay if it doesn't feel like the 'easy' part.",
      captureIntro: `Week ${week}, the pregnancy is becoming more real, more visible, and more present.`,
      nextWeekPreview: `Next week, development continues. The baby is growing steadily.`,
      reflectionContext: "The second trimester moves quickly. Writing down what this week feels like creates a record of the middle of the journey.",
    },
    3: {
      heroSubtitle: "What's happening this week, and how to navigate it.",
      keyFocus: "Preparation & closeness",
      symptoms: [
        { name: "Pelvic pressure", why: "The baby's weight is pressing on the pelvic floor and bladder.", feelLike: "A heaviness low in the pelvis." },
        { name: "Sleep difficulties", why: "Physical discomfort and anticipation make sleep harder.", feelLike: "Struggling to find comfort, waking frequently." },
        { name: "Braxton Hicks contractions", why: "Practice contractions are preparing the uterus for labour.", feelLike: "Tightening across the abdomen, uncomfortable but not painful." },
      ],
      focusPoints: [
        { action: "Monitor fetal movement daily", reason: "Movement patterns become more important in the third trimester" },
        { action: "Rest as much as possible", reason: "The third trimester is physically demanding" },
        { action: "Prepare for birth at your own pace", reason: "There is no correct timeline, only what works for you" },
        { action: "Stay in contact with your midwife", reason: "The third trimester has more frequent check-ins for a reason" },
      ],
      humanTruth: [
        "Physical demands increasing week by week",
        "Birth feeling closer and more real",
        "Managing the mental load of preparation alongside daily life",
        "A sustained intensity that can be hard to explain to others",
      ],
      whatThisMeans: "The third trimester is demanding by nature. Increased discomfort, changed sleep, and emotional intensity are not signs of problems, they are features of this stage.",
      gentleReminder: "The third trimester is demanding. You are closer than it sometimes feels.",
      captureIntro: `Week ${week}, the end is closer now. These weeks have their own quality worth pausing to notice.`,
      nextWeekPreview: `Next week, you move one step closer. Birth is approaching.`,
      reflectionContext: "The final trimester has a particular quality. Writing down how this week feels creates a record of a stage that passes quickly.",
    },
  };

  const context = trimesterContexts[trimester];

  return {
    title: `${week} Weeks Pregnant`,
    heroSubtitle: context.heroSubtitle,
    reassurance: "Experiences can vary at this stage, both strong and mild symptoms can be normal.",
    keyFocus: context.keyFocus,
    atAGlance: `Week ${week} continues the patterns of this stage. Development is ongoing, and your body is continuing to adapt. The most important thing is that both you and your baby are moving through this together.`,
    what: {
      baby: {
        what: "Development is continuing week by week",
        why: "Your baby is growing and developing every day. Key milestones vary by week.",
        means: "Your midwife or healthcare provider is the best source of week-specific developmental information for your pregnancy.",
        size: "Growing every week",
      },
      body: {
        what: "Your body is continuing to adapt to the pregnancy",
        why: "Hormonal, physical, and structural changes are ongoing throughout pregnancy.",
        means: "These changes vary in intensity and type across different weeks and individuals, variation is expected.",
      },
      emotional: {
        what: "Emotional experience in pregnancy is highly individual",
        why: "It shifts from week to week, and from person to person.",
        means: "There is no correct emotional response at any stage. Whatever you're experiencing is valid.",
      },
    },
    symptoms: context.symptoms,
    humanTruth: context.humanTruth,
    whatThisMeans: context.whatThisMeans,
    normal: ["Symptoms varying from week to week", "Some days feeling better than others", "Physical changes continuing", "Emotional complexity alongside physical experience"],
    seekSupport: ["Heavy bleeding", "Severe pain", "Reduced fetal movement (second and third trimesters)", "Any concern that feels serious"],
    disclaimer: "This is not medical advice. Always consult your midwife, doctor, or healthcare provider with any concerns.",
    focusPoints: context.focusPoints,
    normalRightNow: ["Feeling the effects of this stage of pregnancy", "Symptoms varying day to day", "Wondering what's normal", "Taking things one day at a time"],
    gentleReminder: context.gentleReminder,
    reflectionPrompt: "What has this week felt like for you?",
    reflectionContext: context.reflectionContext,
    nextWeekPreview: context.nextWeekPreview,
    aiContextPrompt: "What's been on your mind this week?",
    aiPrompts: [`Is this normal at week ${week}?`, "What should I focus on this week?", "What comes next in my pregnancy?"],
    captureIntro: context.captureIntro,
  };
};

// ─── Public API ────────────────────────────────────────────────────────────
export const getWeekData = (week: number): WeekData => {
  const specific = weekDatabase[week];
  const { trimester, label, path } = getTrimesterForWeek(week);
  const base = specific ?? generateWeekData(week);
  return { week, trimester, trimesterLabel: label, trimesterPath: path, ...base };
};

export const getAdjacentWeeks = (week: number): { prev: number | null; next: number | null } => ({
  prev: week > 1 ? week - 1 : null,
  next: week < MAX_PREGNANCY_WEEK ? week + 1 : null,
});
