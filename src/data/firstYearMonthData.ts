// First Year month guide data — Phase 11.8a.1 rework.
// Only Newborn to 3 months are published. 4 to 12 months intentionally omitted
// so no dead links or placeholder pages leak into navigation, prev/next or sitemap.
//
// Structure is deliberately article-led. Each month leads with the baby (the
// reader's primary orientation) and weaves a strong parent thread alongside it.

export type MonthSlug =
  | "newborn"
  | "1-month"
  | "2-months"
  | "3-months"
  | "4-months"
  | "5-months"
  | "6-months"
  | "7-months"
  | "8-months"
  | "9-months"
  | "10-months"
  | "11-months"
  | "12-months";

export interface MonthQuestion {
  question: string;
  answer: string;
  readMore?: { label: string; href: string };
  askTopic: string;
}

export interface MonthSupportItem {
  when: string;
  body: string;
}

export interface MonthSource {
  label: string;
  publisher: string;
  url: string;
}

export interface MonthRelated {
  label: string;
  href: string;
  kicker: string;
}

export interface ShortVersion {
  baby: string;
  feeding: string;
  sleep: string;
  you: string;
  whenToAsk: string;
}

export interface EditorialSubsection {
  heading: string;
  body: string;
}

export interface EditorialSection {
  intro: string;
  subsections: EditorialSubsection[];
}

export interface FocusSection {
  intro: string;
  points: string[];
  whenToAsk: string;
  safeSleep?: string;
}

export interface MonthGuide {
  slug: MonthSlug;
  label: string;
  title: string;
  standfirst: string;
  phase: { label: string; href: string };
  shortVersion: ShortVersion;
  babyEditorial: EditorialSection;
  feedingSection: FocusSection;
  sleepSection: FocusSection;
  youEditorial: EditorialSection;
  feelsHardIntro: string;
  feelsHard: string[];
  whatHelpsIntro: string;
  whatHelps: string[];
  support: MonthSupportItem[];
  questions: MonthQuestion[];
  related: MonthRelated[];
  sources: MonthSource[];
  seo: { title: string; description: string };
}

// Ordered array of published slugs. Prev/next derive from this list only,
// so the chain closes cleanly on the first and last published month.
export const MONTH_ORDER: MonthSlug[] = [
  "newborn",
  "1-month",
  "2-months",
  "3-months",
  "4-months",
  "5-months",
  "6-months",
  "7-months",
  "8-months",
  "9-months",
  "10-months",
  "11-months",
  "12-months",
];

const PHASE_0_3 = { label: "0 to 3 months", href: "/first-year/0-3-months" };
const PHASE_3_6 = { label: "3 to 6 months", href: "/first-year/3-6-months" };
const PHASE_6_9 = { label: "6 to 9 months", href: "/first-year/6-9-months" };
const PHASE_9_12 = { label: "9 to 12 months", href: "/first-year/9-12-months" };

export const firstYearMonths: Record<MonthSlug, MonthGuide> = {
  newborn: {
    slug: "newborn",
    label: "Newborn",
    title: "Your newborn: the first days and weeks",
    standfirst:
      "The newborn window is small, blurry and huge all at once. Feeding, sleeping and healing take up most of the day, and that is exactly what should be happening now. This guide walks you through what your baby is doing, what feeding and sleep may look like, and how to look after yourself while you learn each other.",
    phase: PHASE_0_3,
    shortVersion: {
      baby: "Sleepy, hungry, close to your body most of the time. Startles, hiccups and noisy breathing patterns are usually normal.",
      feeding: "Little and often, day and night. Cluster feeds in the evenings are common whether you are breast, bottle or mixed feeding.",
      sleep: "Short stretches with no rhythm yet. Always on the back, on a firm flat surface, in the same room as you.",
      you: "Healing, bleeding, sore. Big feelings can arrive in waves. Rest whenever you can, in whatever shape it comes.",
      whenToAsk: "A baby who is very hard to rouse, feeding much less than expected, or fewer wet nappies. For you: low mood you cannot shake, heavy bleeding or worsening pain.",
    },
    babyEditorial: {
      intro:
        "Newborn life is not a routine yet, and it is not meant to be. Most of what happens in the first weeks is your baby learning to feed, sleep, be warm and be held. Alongside that, tiny signs of who they are start to appear. There is no milestone pressure here. This is a wide, normal window.",
      subsections: [
        {
          heading: "Very sleepy, very new",
          body:
            "Newborns often sleep in short bursts around the clock and can be hard to keep awake for feeds in the first days. Skin to skin, a gentle nappy change or unwrapping can help rouse them for a feed. In quiet awake moments they usually only manage a few minutes of alertness before needing to close their eyes again.",
        },
        {
          heading: "Senses are switching on",
          body:
            "Vision is blurry and best focused at about the distance to your face when you hold them. They already know your voice from pregnancy and are soothed by heartbeat sounds, warmth and being held close. You do not need to entertain a newborn. Being near you is enough.",
        },
        {
          heading: "Feeding is learning",
          body:
            "Whether you are breast, bottle or mixed feeding, the first week or two is mostly practice for both of you. Frequent feeds, some awkward latches and cluster feeding in the evenings are all normal, and are not usually a sign that anything is wrong.",
        },
        {
          heading: "Nappies tell a story",
          body:
            "Regular wet and dirty nappies are one of the clearest signs that feeding is going well. Your midwife or health visitor can talk you through what to expect day by day in the first week, and what would prompt a same day check.",
        },
        {
          heading: "Crying without a reason",
          body:
            "Newborns often cry when nothing obvious is wrong. Holding, movement, feeding and quiet can all help. You are not spoiling them by responding, and you are not doing anything wrong when a cry does not have a clear cause.",
        },
        {
          heading: "Startles, jerks and noisy breathing",
          body:
            "Tiny arm flings, hiccups, snuffles and irregular breathing patterns are usually normal in a settled newborn. Persistent fast breathing, grunting with each breath, or a blue tinge to lips or tongue is not, and needs urgent review.",
        },
        {
          heading: "Comfort is the whole job",
          body:
            "In the newborn window your job is not to teach or shape. It is to feed, warm, hold and respond. Everything else can wait.",
        },
      ],
    },
    feedingSection: {
      intro:
        "Feeding takes up more time and headspace in the newborn weeks than almost anything else. However you are feeding, the early days are about learning together. There is no perfect way, and there is help if any of it feels stuck.",
      points: [
        "Feed on demand rather than by the clock. Newborns often want to feed 8 to 12 times or more in 24 hours.",
        "Cluster feeding, especially in the evening, is common and usually not a supply problem.",
        "Regular wet and dirty nappies and calm periods between feeds are reassuring signs.",
        "If you are breastfeeding, a deep latch matters more than a fast one. If it hurts consistently, ask for a review.",
        "If you are bottle feeding, paced bottle feeding can help your baby take feeds more calmly.",
        "Combination feeding is a valid choice and is not a failure of anything.",
      ],
      whenToAsk:
        "Ask your midwife, health visitor or a breastfeeding support line if feeding hurts every time, if your baby is very sleepy at feeds, if wet nappies drop off, or if weight loss has not started to reverse by around day 5.",
    },
    sleepSection: {
      intro:
        "Newborn sleep is scattered, short and often unpredictable. It is not a skill to be trained at this age. The goal in these weeks is safety and responsiveness, not a schedule.",
      points: [
        "Expect short stretches around the clock, often with several night wakes.",
        "Wake windows are very short, often only 45 to 60 minutes, and cues can be subtle.",
        "Contact naps and being held to sleep are developmentally normal now.",
        "Day and night confusion is common and usually settles gradually.",
      ],
      safeSleep:
        "Always on the back, on a firm flat surface with no loose bedding, pillows or bumpers. Sleep in the same room as your baby for the first six months, day and night. Keep the room comfortably cool and avoid overheating.",
      whenToAsk:
        "Ask for a review if your baby is very hard to wake for feeds, is unusually floppy, or has periods of fast or grunting breathing during sleep.",
    },
    youEditorial: {
      intro:
        "The newborn weeks ask an enormous amount of you. Your body is healing, your hormones are shifting, and your days are shaped by feeding and holding. This is not a time to be productive. It is a time to be looked after, as far as that is possible.",
      subsections: [
        {
          heading: "Your body is healing",
          body:
            "Bleeding, cramping and soreness are normal after any birth, vaginal or caesarean. Rest when you can, keep fluids close by and take pain relief as advised. Pain that is getting worse rather than better, or heavy bleeding that soaks a pad in an hour, needs urgent review.",
        },
        {
          heading: "Emotions in waves",
          body:
            "Tearfulness in the first two weeks is common as hormones shift. Low mood that does not lift, thoughts that frighten you, or a sense of being unable to cope are all worth naming out loud to your midwife, GP or health visitor. This is not weakness. It is a health issue like any other.",
        },
        {
          heading: "Sleep in whatever shape it comes",
          body:
            "You will not catch up on sleep in the usual sense right now. Lower the bar on anything that is not feeding, healing and holding your baby. A short rest in the day is not a failure. It is a strategy.",
        },
        {
          heading: "Support looks like small things",
          body:
            "Food dropped at the door, a walk with the pram, someone holding the baby while you shower. Say yes to help early, before you run out of reserves. Being cared for is part of newborn recovery.",
        },
      ],
    },
    feelsHardIntro:
      "The newborn weeks are not meant to feel easy. Naming what is hard is not complaining. It is how you start to ask for what you need.",
    feelsHard: [
      "The hours blur into each other and you lose track of time and days.",
      "Feeding takes longer than you expected and never quite feels finished.",
      "Well meaning advice from lots of people can leave you second guessing yourself.",
      "The night feels very long, even when the baby is calm.",
    ],
    whatHelpsIntro:
      "None of these are rules. They are small things that many parents find make the difference between a hard day and an impossible one.",
    whatHelps: [
      "One trusted person you can message at 3am, even just to say you are awake.",
      "A simple note of feeds, wet nappies and any worries to share at check-ins.",
      "Lowering the bar. Fed baby, held baby, resting parent is enough for now.",
      "Fresh air, even briefly, when you feel ready.",
    ],
    support: [
      {
        when: "Any time",
        body: "You feel very low, hopeless, or have thoughts that frighten you. Your midwife, health visitor or GP can help, and you deserve support now.",
      },
      {
        when: "Same day",
        body: "Your baby is very hard to wake for feeds, is feeding much less than usual, or has fewer wet nappies than expected. Contact your midwife, GP or NHS 111.",
      },
      {
        when: "Urgent",
        body: "Fast breathing, grunting with each breath, a blue or grey tinge, a very high or low temperature, or heavy bleeding for you that soaks a pad in an hour. Call 999 or go straight to A&E.",
      },
    ],
    questions: [
      {
        question: "Is it normal that my newborn feeds constantly?",
        answer:
          "Yes. In the early weeks, feeding little and often is expected, and cluster feeding in the evenings is very common. Frequent feeds help build supply if you are breastfeeding and are usually not a sign anything is wrong.",
        readMore: {
          label: "Read: newborn feeding rhythms",
          href: "/first-year/feeding/newborn-feeding-rhythms",
        },
        askTopic: "newborn-feeding",
      },
      {
        question: "How much sleep should a newborn get?",
        answer:
          "Newborn sleep is scattered across day and night in short stretches. There is no expected rhythm yet, and trying to force one this early usually is not helpful. Follow their cues and keep safe sleep basics in place.",
        readMore: {
          label: "Read: newborn sleep expectations",
          href: "/first-year/sleep/newborn-sleep-expectations",
        },
        askTopic: "newborn-sleep",
      },
      {
        question: "What are the safe sleep basics?",
        answer:
          "Always on the back, on a firm flat surface, in a clear space with no loose bedding, in the same room as you for the first six months. It does not need to be complicated to be safe.",
        readMore: {
          label: "Read: safe sleep and home safety",
          href: "/first-year/care-and-safety/safe-sleep-and-home-safety",
        },
        askTopic: "safe-sleep",
      },
      {
        question: "How do I know feeding is going well?",
        answer:
          "Regular wet and dirty nappies, calm periods between feeds and weight tracking that your midwife or health visitor is happy with are all reassuring signs. If anything worries you, ask early.",
        readMore: {
          label: "Read: bottle and breastfeeding questions",
          href: "/first-year/feeding/bottle-and-breastfeeding-questions",
        },
        askTopic: "feeding-going-well",
      },
      {
        question: "When should I ask for help for how I feel?",
        answer:
          "If low mood, anxiety or intrusive thoughts are getting in the way of your day, or you feel not yourself in a way that is not lifting, it is early enough to ask now. Your midwife, health visitor or GP can help.",
        readMore: {
          label: "Read: when to ask for help after birth",
          href: "/first-year/checkups-and-warning-signs/when-to-ask-for-help-after-birth",
        },
        askTopic: "postnatal-mood",
      },
    ],
    related: [
      { label: "Newborn feeding rhythms", kicker: "Feeding", href: "/first-year/feeding/newborn-feeding-rhythms" },
      { label: "Normal newborn quirks and reflexes", kicker: "Care and safety", href: "/first-year/care-and-safety/newborn-quirks-and-reflexes" },
      { label: "Newborn skin: spots, marks and dry patches", kicker: "Care and safety", href: "/first-year/care-and-safety/newborn-skin-spots-and-marks" },
      { label: "Safe sleep and home safety", kicker: "Care and safety", href: "/first-year/care-and-safety/safe-sleep-and-home-safety" },
      { label: "Healing after birth", kicker: "Recovery", href: "/first-year/postpartum-recovery/healing-after-birth" },
    ],
    sources: [
      { label: "Your baby's health and development reviews", publisher: "NHS", url: "https://www.nhs.uk/conditions/baby/babys-development/height-weight-and-reviews/baby-reviews/" },
      { label: "Newborn feeding guide", publisher: "NHS Start for Life", url: "https://www.nhs.uk/start-for-life/baby/feeding-your-baby/" },
      { label: "Safer sleep advice", publisher: "The Lullaby Trust", url: "https://www.lullabytrust.org.uk/safer-sleep-advice/" },
      { label: "Your body after birth", publisher: "NHS", url: "https://www.nhs.uk/conditions/baby/support-and-services/your-post-pregnancy-body/" },
      { label: "Responsive feeding", publisher: "UNICEF Baby Friendly", url: "https://www.unicef.org.uk/babyfriendly/baby-friendly-resources/relationship-building-resources/responsive-feeding-infosheet/" },
    ],
    seo: {
      title: "Newborn guide | The Start of You",
      description:
        "A calm, honest guide to the first days and weeks with your newborn. Feeding, sleep, nappies, safe sleep basics and looking after yourself while you heal.",
    },
  },

  "1-month": {
    slug: "1-month",
    label: "1 month",
    title: "1 month old: finding a rough rhythm",
    standfirst:
      "The very newest days start to soften. Feeds may still be frequent, evenings can be unsettled, and you are living somewhere between exhaustion and quiet moments of noticing your baby. This guide walks through what your one month old may be doing, feeding and sleep in more depth, and how to look after yourself as everything still feels new.",
    phase: PHASE_0_3,
    shortVersion: {
      baby: "More alert in short windows. Still no fixed routine. Growth spurts can shake things up again.",
      feeding: "Still frequent, often clustered in the evening. Cluster feeds and growth spurts are common.",
      sleep: "Short stretches with the occasional longer one by chance. No rhythm expected yet.",
      you: "Very tired. Emotions can still swing widely. Bleeding may be tailing off and soreness usually eases.",
      whenToAsk: "Feeding worries, weight concerns, low mood that will not lift, or pain that is worsening.",
    },
    babyEditorial: {
      intro:
        "By around one month, tiny things start to shift. Your baby may be a little more alert, feeds can feel a bit more familiar, and the shape of your days is beginning to appear, even if nothing is fixed. There is no routine to hit yet and no milestone to chase.",
      subsections: [
        {
          heading: "Alert windows begin",
          body:
            "You may see brief spells where your baby is quietly awake and watching. These often last only minutes and are enough. There is no need to entertain them beyond gentle talking, eye contact and being close.",
        },
        {
          heading: "Feeding starts to feel more familiar",
          body:
            "Latching, positioning or bottle rhythm may be easier than it was in week one. Cluster feeding in the evenings is still very common and is not a supply problem on its own. Growth spurts can bring bursts of frequent feeding for a few days.",
        },
        {
          heading: "Unsettled evenings are common",
          body:
            "Many babies get fussier from late afternoon into the evening. Movement, holding, feeding on demand and low light can help. It usually softens over the coming weeks.",
        },
        {
          heading: "Movement and body control are slowly building",
          body:
            "Head control is still very limited. Short spells of tummy time when your baby is awake and calm can help build strength gradually. Little and often is enough.",
        },
        {
          heading: "Connection is small but powerful",
          body:
            "Your baby is learning your face, voice and rhythm. Talking to them during nappy changes and feeds, and responding to their sounds, is early relationship building.",
        },
        {
          heading: "Weight checks",
          body:
            "Health visitors will weigh your baby at routine checks. Steady growth along their own line matters more than being on a particular centile.",
        },
      ],
    },
    feedingSection: {
      intro:
        "Feeding is still frequent at one month, but you may be starting to read your baby's cues more easily. This is often the month where questions about supply, weight and cluster feeding show up most.",
      points: [
        "Frequent feeding and cluster feeding, especially in the evening, are still normal.",
        "Growth spurts around 3 to 6 weeks can bring a burst of very frequent feeds for a few days.",
        "Regular wet and dirty nappies and steady weight tracking are more reassuring than time between feeds.",
        "If you are breastfeeding and something hurts every time, a latch review is worth asking for.",
        "If you are bottle or combination feeding, paced feeding can help your baby take feeds more calmly.",
        "You do not have to defend how you feed to anyone.",
      ],
      whenToAsk:
        "Ask your health visitor or a feeding support line if feeding hurts persistently, wet nappies drop off, weight gain stalls, or you feel very anxious about feeds. Support is available whether you are breast, bottle or mixed feeding.",
    },
    sleepSection: {
      intro:
        "Sleep at one month is still fragmented. By chance you may get one longer stretch, then several short ones. Try not to read too much into any single night either way.",
      points: [
        "Short stretches are still the norm, day and night.",
        "Day and night confusion is often starting to ease, but is not gone yet.",
        "Contact naps and being held to sleep are still developmentally normal.",
        "Sleep training approaches are not recommended at this age.",
      ],
      safeSleep:
        "Continue with back sleeping on a firm flat surface, in the same room as you day and night, with no loose bedding. Room sharing for the first six months is recommended.",
      whenToAsk:
        "Ask for a review if your baby is very hard to wake for feeds, is unusually floppy, has fast or grunting breathing, or is much sleepier than usual.",
    },
    youEditorial: {
      intro:
        "One month in, you are living with real sleep debt and a body that is still healing. Confidence can arrive one hour and leave the next. This is not you being fragile. It is a physiological load layered onto a huge life change.",
      subsections: [
        {
          heading: "Exhaustion is real",
          body:
            "Fragmented sleep for weeks changes how you feel in your body and mind. You may feel wired, forgetful, tearful, or numb. Any of this can be part of the picture. It is not a personality failure.",
        },
        {
          heading: "Body still healing",
          body:
            "Bleeding may be tailing off. Perineal or caesarean discomfort can still be there. If pain is getting worse rather than better, or bleeding gets heavier again, please ask.",
        },
        {
          heading: "Emotional weather",
          body:
            "Big feelings in the first weeks are common. Persistent low mood, anxiety or intrusive thoughts are not something to wait out alone. You do not need to be in crisis to talk to your GP or health visitor.",
        },
        {
          heading: "Reconnecting slowly",
          body:
            "Short walks, a favourite drink, a message to a friend. Small things count as you start to feel a little more like yourself.",
        },
      ],
    },
    feelsHardIntro:
      "One month in, the newness has not worn off but the initial adrenaline often has. It is a raw month for many families.",
    feelsHard: [
      "You have not slept properly in weeks and everyone keeps asking how you are.",
      "Evenings feel long, unsettled and lonely, even when you are not alone.",
      "You feel unsure whether feeding is going well and cannot always tell.",
      "It is hard to know what is a problem and what is normal newborn stuff.",
    ],
    whatHelpsIntro:
      "None of these fix a hard month. They are the small things that many parents find make the load a little more bearable.",
    whatHelps: [
      "Trusting your instincts on when something feels off and asking early.",
      "Sharing night wakes where possible, or a rest window in the day.",
      "A short, honest check in with your health visitor at the first review.",
      "Setting a very low bar for the day and calling it done.",
    ],
    support: [
      {
        when: "Any time",
        body: "Low mood, anxiety or intrusive thoughts that are affecting your day. You do not need to wait for the six week check to raise this.",
      },
      {
        when: "Same day",
        body: "A baby who seems very sleepy, is feeding much less than usual, or is not doing regular wet or dirty nappies. Contact your health visitor, GP or NHS 111.",
      },
      {
        when: "Urgent",
        body: "A high or very low temperature, fast breathing, a very unwell looking baby, or heavy bleeding for you that is getting worse. Call 999 or go straight to A&E.",
      },
    ],
    questions: [
      {
        question: "Should my baby be in a routine by now?",
        answer:
          "No. At one month there is usually no fixed routine, and trying to force one this early rarely helps. Rhythms tend to emerge on their own over the next couple of months.",
        readMore: {
          label: "Read: helping your baby settle",
          href: "/first-year/sleep/helping-your-baby-settle",
        },
        askTopic: "one-month-routine",
      },
      {
        question: "Why is my baby so unsettled in the evenings?",
        answer:
          "Evening fussiness is very common in the first couple of months. Holding, feeding, gentle movement and low stimulation can help. It usually eases with time and is rarely a sign of something wrong.",
        readMore: {
          label: "Read: newborn feeding rhythms",
          href: "/first-year/feeding/newborn-feeding-rhythms",
        },
        askTopic: "evening-fussiness",
      },
      {
        question: "Is it normal to still feel so tired and emotional?",
        answer:
          "Yes. Weeks of broken sleep and huge change take a real toll. If low mood or anxiety is not lifting, please talk to your GP or health visitor. You do not have to wait.",
        readMore: {
          label: "Read: feeling like yourself again",
          href: "/first-year/emotional-wellbeing/feeling-like-yourself-again",
        },
        askTopic: "one-month-mood",
      },
      {
        question: "How is my recovery meant to be going now?",
        answer:
          "Bleeding often eases through this month, and soreness gradually improves. Ongoing or worsening pain, heavy bleeding or fever should be checked.",
        readMore: {
          label: "Read: what recovery can feel like",
          href: "/first-year/postpartum-recovery/what-recovery-can-feel-like",
        },
        askTopic: "one-month-recovery",
      },
    ],
    related: [
      { label: "Helping your baby settle", kicker: "Sleep", href: "/first-year/sleep/helping-your-baby-settle" },
      { label: "Colic and evening crying", kicker: "Care and safety", href: "/first-year/care-and-safety/colic-and-evening-crying" },
      { label: "Breastfeeding problems and where to get help", kicker: "Feeding", href: "/first-year/feeding/breastfeeding-problems-and-where-to-get-help" },
      { label: "What recovery can feel like", kicker: "Recovery", href: "/first-year/postpartum-recovery/what-recovery-can-feel-like" },
      { label: "Feeling like yourself again", kicker: "Emotional wellbeing", href: "/first-year/emotional-wellbeing/feeling-like-yourself-again" },
    ],
    sources: [
      { label: "Your baby at 1 month", publisher: "NHS Start for Life", url: "https://www.nhs.uk/start-for-life/baby/baby-development/1-3-months/" },
      { label: "Breastfeeding help and support", publisher: "NHS", url: "https://www.nhs.uk/conditions/baby/breastfeeding-and-bottle-feeding/breastfeeding-help-and-support/" },
      { label: "Feelings and relationships after having a baby", publisher: "NHS", url: "https://www.nhs.uk/conditions/baby/support-and-services/feelings-relationships-mental-health/" },
      { label: "Safer sleep advice", publisher: "The Lullaby Trust", url: "https://www.lullabytrust.org.uk/safer-sleep-advice/" },
      { label: "Responsive feeding", publisher: "UNICEF Baby Friendly", url: "https://www.unicef.org.uk/babyfriendly/baby-friendly-resources/relationship-building-resources/responsive-feeding-infosheet/" },
    ],
    seo: {
      title: "1 month old baby guide | The Start of You",
      description:
        "A gentle guide to your baby at 1 month. Feeding rhythms, unsettled evenings, weight checks and looking after yourself while everything still feels new.",
    },
  },

  "2-months": {
    slug: "2-months",
    label: "2 months",
    title: "2 months old: more of them, more of you",
    standfirst:
      "Somewhere in this month, tiny things shift. Slightly longer awake windows, early smiles, and a first sense that you and your baby are starting to know each other. This guide covers what your two month old may be doing, feeding and sleep changes, the postnatal check, and how to keep looking after yourself.",
    phase: PHASE_0_3,
    shortVersion: {
      baby: "Longer alert windows. Early social smiles may appear. Vaccinations happen around 8 weeks.",
      feeding: "Feeds may space out slightly, or briefly speed up again during growth spurts.",
      sleep: "Still fragmented. Some babies find a longer night stretch. Both are within a wide range.",
      you: "Postnatal check window. Confidence starts to build unevenly. Delayed feelings can surface.",
      whenToAsk: "Ongoing pain, low mood, feeding worries or a very unhappy baby. Use your postnatal check.",
    },
    babyEditorial: {
      intro:
        "By two months, many babies feel a fraction more predictable. Awake windows may lengthen a little, and early social smiles often begin. There is still huge variation between babies. If yours is doing things differently, that is usually fine.",
      subsections: [
        {
          heading: "More alert, more of the time",
          body:
            "Awake windows may lengthen a little, but still tend to be short. Babies at this age often enjoy quiet, close interaction more than lots of stimulation. Being talked to, sung to and held is enough.",
        },
        {
          heading: "First real smiles",
          body:
            "Many babies start social smiling around 6 to 8 weeks. If you have not seen one yet, it is still an ordinary range. Every baby is on their own line.",
        },
        {
          heading: "Feeding may change shape",
          body:
            "Feeds can become faster, more efficient, or briefly more frequent again during growth spurts. That does not usually mean there is a supply problem or a feeding failure.",
        },
        {
          heading: "Sleep is still doing its own thing",
          body:
            "Some babies fall into a slightly longer night stretch, others do not. Both are within a wide range at this age, and neither is a sign of doing something right or wrong.",
        },
        {
          heading: "Movement is building slowly",
          body:
            "Head control is stronger. Short spells of tummy time when your baby is awake and calm continue to help. You do not need special equipment.",
        },
        {
          heading: "Vaccinations at around 8 weeks",
          body:
            "The first set of routine vaccinations happens around 8 weeks. Some babies are unsettled or sleepy for a day or two after. Your health visitor or GP can advise on comfort measures.",
        },
      ],
    },
    feedingSection: {
      intro:
        "Feeding at two months often feels a bit more familiar than in the newborn weeks, but growth spurts and changes in efficiency can shake your confidence. This is a common month to worry about supply.",
      points: [
        "Feeds may be quicker as your baby becomes more efficient. Shorter feeds are not a sign of a problem on their own.",
        "Growth spurts around 6 to 8 weeks can briefly bring cluster feeding back.",
        "If bottle feeding, watch your baby's cues rather than aiming to finish every bottle.",
        "Wet and dirty nappies and steady weight tracking remain more useful signals than time on the breast.",
        "Combination feeding continues to be a valid choice.",
      ],
      whenToAsk:
        "Ask your health visitor or a feeding support line if feeding is painful, wet nappies drop off, weight gain stalls or feeding is causing you significant distress.",
    },
    sleepSection: {
      intro:
        "Sleep at two months is still very variable. Some babies find a longer night stretch, some do not. Comparison is one of the hardest parts of this month.",
      points: [
        "Short stretches are still normal, with occasional longer ones for some babies.",
        "Contact naps and being held to sleep are still developmentally normal.",
        "Sleep training approaches are not recommended at this age.",
        "Try to avoid making big changes based on one hard or easy night.",
      ],
      safeSleep:
        "Continue with back sleeping on a firm flat surface, in the same room as you day and night. Keep the sleep space clear of loose bedding, pillows and toys.",
      whenToAsk:
        "Ask for a review if your baby is unusually sleepy, has fast or grunting breathing, is very hard to wake for feeds, or is much less interested in feeds than usual.",
    },
    youEditorial: {
      intro:
        "The two month mark is often when the outside world starts to expect you to be back to normal, and when the reality of the last two months finally lands. This is also the window for your postnatal check, which is for you as much as for your baby.",
      subsections: [
        {
          heading: "The postnatal check",
          body:
            "Around 6 to 8 weeks you should be offered a check for you. It is a chance to talk about mood, pain, bleeding, contraception, and how you actually are. If it feels rushed, it is fine to ask for another appointment.",
        },
        {
          heading: "Confidence in patches",
          body:
            "You may notice you can read your baby's cues more easily. That does not mean every day feels good, and it does not need to. Confidence usually builds unevenly.",
        },
        {
          heading: "Body still adjusting",
          body:
            "Aches, pelvic floor changes and tiredness are all normal at this stage. Persistent pain, incontinence or symptoms that worry you should be raised at your postnatal check.",
        },
        {
          heading: "Emotional shifts",
          body:
            "For some parents, this is when postnatal mood changes become clearer. If low mood, anxiety or feeling disconnected is present most days, please talk to your GP. Support works.",
        },
      ],
    },
    feelsHardIntro:
      "Two months in, the initial adrenaline has usually worn off and the finish line is not in sight. This is a common month for the reality to hit.",
    feelsHard: [
      "You feel like you should be enjoying it more than you are.",
      "You are not sure whether what you feel is normal tiredness or something more.",
      "Everyone else's baby seems to have a routine and yours does not.",
      "You still do not feel like your old self, and you are not sure who your new self is yet.",
    ],
    whatHelpsIntro:
      "These will not make comparison disappear. They can make the day feel a little more your own.",
    whatHelps: [
      "Using your postnatal check honestly, not just saying you are fine.",
      "Short predictable moments, like a morning walk, rather than a full routine.",
      "Talking to one person who really listens, in person or online.",
      "Naming the good moments, even quietly, when they happen.",
    ],
    support: [
      {
        when: "At your postnatal check",
        body: "Ongoing pain, heavy bleeding, incontinence, feeding worries or low mood. This appointment is for you as much as for your baby.",
      },
      {
        when: "Any time",
        body: "Thoughts of harming yourself or your baby, feeling unable to cope, or a sense that something is really not right. Please contact your GP or NHS 111 the same day.",
      },
      {
        when: "Same day",
        body: "A baby who seems very unwell, is much sleepier than usual, or is not feeding as expected.",
      },
    ],
    questions: [
      {
        question: "When will my baby smile at me?",
        answer:
          "Many babies begin true social smiles around 6 to 8 weeks, but the range is wide. Talking gently, holding them close and making eye contact is enough. Smiles come when they come.",
        readMore: {
          label: "Read: baby development in the first year",
          href: "/first-year/development/baby-development-in-the-first-year",
        },
        askTopic: "early-smiles",
      },
      {
        question: "What happens at the postnatal check?",
        answer:
          "It is a chance to talk about your body, mood, feeding, contraception and how you are coping. It is separate from your baby's check. If it feels rushed, it is fine to ask for another appointment.",
        readMore: {
          label: "Read: postnatal checks and appointments",
          href: "/first-year/checkups-and-warning-signs/postnatal-checks-and-appointments",
        },
        askTopic: "postnatal-check",
      },
      {
        question: "My baby is unsettled again after being calmer, is that normal?",
        answer:
          "Yes. Growth spurts, developmental leaps or simply a harder week can all shake things up. If your baby is otherwise well and feeding, it usually passes.",
        readMore: {
          label: "Read: helping your baby settle",
          href: "/first-year/sleep/helping-your-baby-settle",
        },
        askTopic: "unsettled-again",
      },
      {
        question: "Should I be worried I do not feel like myself?",
        answer:
          "Feeling changed after birth is very normal. Feeling low, numb, disconnected or anxious most of the time, week after week, is a reason to reach out to your GP or health visitor.",
        readMore: {
          label: "Read: when parenthood feels heavy",
          href: "/first-year/emotional-wellbeing/when-parenthood-feels-heavy",
        },
        askTopic: "two-month-mood",
      },
    ],
    related: [
      { label: "Postnatal checks and appointments", kicker: "Checkups", href: "/first-year/checkups-and-warning-signs/postnatal-checks-and-appointments" },
      { label: "Baby development in the first year", kicker: "Development", href: "/first-year/development/baby-development-in-the-first-year" },
      { label: "Colic and evening crying", kicker: "Care and safety", href: "/first-year/care-and-safety/colic-and-evening-crying" },
      { label: "When parenthood feels heavy", kicker: "Emotional wellbeing", href: "/first-year/emotional-wellbeing/when-parenthood-feels-heavy" },
    ],
    sources: [
      { label: "Your baby's health and development at 8 weeks", publisher: "NHS", url: "https://www.nhs.uk/conditions/baby/babys-development/height-weight-and-reviews/baby-reviews/" },
      { label: "6 to 8 week postnatal check for you", publisher: "NHS", url: "https://www.nhs.uk/conditions/baby/support-and-services/postnatal-check/" },
      { label: "8 week vaccinations", publisher: "NHS", url: "https://www.nhs.uk/vaccinations/8-in-1-vaccine/" },
      { label: "Postnatal depression", publisher: "NHS", url: "https://www.nhs.uk/mental-health/conditions/post-natal-depression/overview/" },
      { label: "Safer sleep advice", publisher: "The Lullaby Trust", url: "https://www.lullabytrust.org.uk/safer-sleep-advice/" },
    ],
    seo: {
      title: "2 month old baby guide | The Start of You",
      description:
        "A gentle guide to your baby at 2 months. Early smiles, feeding changes, the postnatal check and looking after your emotional wellbeing.",
    },
  },

  "3-months": {
    slug: "3-months",
    label: "3 months",
    title: "3 months old: quieter ground",
    standfirst:
      "By three months, many families feel a little more solid. Your baby may be more interactive, and you may have a rough sense of your own days, even if nothing is fixed. This guide covers what your three month old may be doing, feeding and sleep, and how you are meant to be feeling by now.",
    phase: PHASE_0_3,
    shortVersion: {
      baby: "More social and interactive. Head control is stronger. Loose patterns often begin to appear.",
      feeding: "Often faster, sometimes briefly disorganised again. Distraction at the breast or bottle is common.",
      sleep: "Some patterns emerge, though nights can still surprise you. Sleep is not a straight line.",
      you: "Confidence building unevenly. Some feelings only surface now. Recovery is still ongoing.",
      whenToAsk: "Ongoing pain, mood that is not lifting, feeding worries or feeling disconnected.",
    },
    babyEditorial: {
      intro:
        "Three months is often when the fog begins to lift a little. Your baby is likely more interactive, and you may have a rough sense of what a good day looks like. Nothing is fixed, and it does not need to be. This is still early.",
      subsections: [
        {
          heading: "Real interaction",
          body:
            "Smiles, coos, watching your face and being interested in what you are doing. This is early relationship building and it does not need any structured activity.",
        },
        {
          heading: "Stronger head control",
          body:
            "Many babies can hold their head steady for longer when upright and enjoy short spells of tummy time. Little and often is fine.",
        },
        {
          heading: "Feeding may look easier",
          body:
            "Feeds are often quicker and more efficient. Some babies briefly become distracted or fussy at the breast or bottle. That is usually a phase.",
        },
        {
          heading: "Sleep starts to shift",
          body:
            "Some babies begin longer night stretches, some do not. Neither is a sign of doing something right or wrong. Continue with safe sleep basics.",
        },
        {
          heading: "First routines by accident",
          body:
            "You may notice a loose shape to your days that works. Building on what already happens naturally is often easier than imposing a strict plan.",
        },
        {
          heading: "Curiosity is growing",
          body:
            "Your baby may look at their hands, follow you around the room with their eyes, and grow more interested in colours and voices. There is nothing to teach yet. Everyday life is the lesson.",
        },
      ],
    },
    feedingSection: {
      intro:
        "Feeding at three months often feels calmer, though many parents notice new patterns like distracted feeding, shorter feeds or brief fussiness at the breast or bottle. First foods are not needed yet.",
      points: [
        "Feeds are often quicker and more efficient. Watch cues, not the clock.",
        "Distracted feeding can begin around now. A calm, low stimulation space often helps.",
        "First foods are not recommended until around 6 months. Milk is still the main source of nutrition.",
        "Combination feeding continues to be a valid choice.",
        "If you are returning to work or thinking about it, feeding plans can be adjusted with support.",
      ],
      whenToAsk:
        "Ask your health visitor if feeding is painful, weight gain stalls, wet nappies drop off, or feeding worries are affecting your mood.",
    },
    sleepSection: {
      intro:
        "Sleep at three months is still variable. Some babies find a longer night stretch, some go through a period of shorter sleep again. Both are within a normal range.",
      points: [
        "Loose patterns may appear. A predictable evening can help without becoming a strict schedule.",
        "Sleep is rarely a straight line. Regressions or setbacks do not mean you have done something wrong.",
        "Contact naps and being held to sleep are still normal.",
        "Continue with safe sleep basics day and night.",
      ],
      safeSleep:
        "Back sleeping on a firm flat surface in a clear sleep space, in the same room as you until at least six months. Avoid overheating and loose bedding.",
      whenToAsk:
        "Ask for a review if your baby is much less interested in feeding, is unusually sleepy, has periods of fast or grunting breathing, or seems very unwell.",
    },
    youEditorial: {
      intro:
        "Three months in, others may assume you are through the worst of it. In truth, this is often when delayed feelings arrive, and when identity questions get louder. Both can be true alongside real moments of confidence and joy.",
      subsections: [
        {
          heading: "Feeling more capable",
          body:
            "You have learned an enormous amount in three months. It is fine to acknowledge that, even quietly. Confidence does not need to be loud to be real.",
        },
        {
          heading: "Delayed feelings",
          body:
            "For some parents, birth or newborn feelings only really land now, once the immediate intensity has passed. Talking about it, including birth reflections services where offered, can help.",
        },
        {
          heading: "Body in progress",
          body:
            "Recovery is not linear. Pelvic floor, core, sleep debt and hormones all continue to settle over the next few months. It is still early to be judging how you look or feel.",
        },
        {
          heading: "Thinking beyond the next feed",
          body:
            "You may start to have thoughts about work, relationships or your own identity again. Those thoughts are not selfish. They are part of coming back to yourself.",
        },
      ],
    },
    feelsHardIntro:
      "Three months is often quieter, and that can bring its own hard edges. Naming them is not ingratitude.",
    feelsHard: [
      "You feel like you should be enjoying this more now that things are calmer.",
      "Sleep changes can shake your confidence just as it was building.",
      "Feeding questions can feel confusing when everyone gives different advice.",
      "Big feelings about the birth or early weeks can arrive now.",
    ],
    whatHelpsIntro:
      "These are small acts of care for yourself, not a checklist to complete.",
    whatHelps: [
      "Naming what you are feeling with one trusted person.",
      "Loose predictable moments in the day, rather than a strict schedule.",
      "Short walks, gentle movement, and sunlight when you can.",
      "Reaching out for support before you are at your limit.",
    ],
    support: [
      {
        when: "Any time",
        body: "Low mood, anxiety, or intrusive thoughts that are not lifting. Please talk to your GP or health visitor. You do not have to be in crisis to ask.",
      },
      {
        when: "Same day",
        body: "A baby who is much less interested in feeding, is unusually sleepy, or seems very unwell. Contact your GP, health visitor or NHS 111.",
      },
      {
        when: "Ongoing concerns",
        body: "Persistent pain, incontinence, or symptoms that were dismissed earlier. It is fine to ask again.",
      },
    ],
    questions: [
      {
        question: "Should my baby have a proper routine by 3 months?",
        answer:
          "Not necessarily. Many babies fall into loose patterns around this age, but a fixed schedule is not required and not always possible. Follow your baby's cues and build gently on what already works.",
        readMore: {
          label: "Read: helping your baby settle",
          href: "/first-year/sleep/helping-your-baby-settle",
        },
        askTopic: "three-month-routine",
      },
      {
        question: "My baby seems distracted while feeding, is that normal?",
        answer:
          "Yes. Around this age, many babies become curious about the world and can be more easily distracted at the breast or bottle. A calm space and fewer distractions often help.",
        readMore: {
          label: "Read: bottle and breastfeeding questions",
          href: "/first-year/feeding/bottle-and-breastfeeding-questions",
        },
        askTopic: "distracted-feeding",
      },
      {
        question: "Why am I only now feeling emotional about the birth?",
        answer:
          "It is common for feelings about birth or the early weeks to surface once life feels a little calmer. Talking with your GP, midwife or a birth reflections service can help.",
        readMore: {
          label: "Read: when parenthood feels heavy",
          href: "/first-year/emotional-wellbeing/when-parenthood-feels-heavy",
        },
        askTopic: "delayed-birth-feelings",
      },
      {
        question: "Is it too early to think about my own body again?",
        answer:
          "No. Gentle movement, checking in with your pelvic floor, and asking about any ongoing concerns are all reasonable at 3 months. There is no need to rush and no need to wait.",
        readMore: {
          label: "Read: body changes after birth",
          href: "/first-year/body-and-hormones/body-changes-after-birth",
        },
        askTopic: "three-month-body",
      },
    ],
    related: [
      { label: "Baby development in the first year", kicker: "Development", href: "/first-year/development/baby-development-in-the-first-year" },
      { label: "Body changes after birth", kicker: "Body and hormones", href: "/first-year/body-and-hormones/body-changes-after-birth" },
      { label: "When to ask for help after birth", kicker: "Checkups", href: "/first-year/checkups-and-warning-signs/when-to-ask-for-help-after-birth" },
    ],
    sources: [
      { label: "Your baby at 3 to 4 months", publisher: "NHS Start for Life", url: "https://www.nhs.uk/start-for-life/baby/baby-development/1-3-months/" },
      { label: "Baby sleep tips", publisher: "NHS", url: "https://www.nhs.uk/conditions/baby/caring-for-a-newborn/helping-your-baby-to-sleep/" },
      { label: "Your body after birth", publisher: "NHS", url: "https://www.nhs.uk/conditions/baby/support-and-services/your-post-pregnancy-body/" },
      { label: "Feelings and relationships after having a baby", publisher: "NHS", url: "https://www.nhs.uk/conditions/baby/support-and-services/feelings-relationships-mental-health/" },
      { label: "Safer sleep advice", publisher: "The Lullaby Trust", url: "https://www.lullabytrust.org.uk/safer-sleep-advice/" },
    ],
    seo: {
      title: "3 month old baby guide | The Start of You",
      description:
        "A calm guide to your baby at 3 months. Interaction, head control, feeding changes, early routines and looking after yourself as things begin to settle.",
    },
  },

  "4-months": {
    slug: "4-months",
    label: "4 months",
    title: "4 months old: alert, curious and shifting",
    standfirst:
      "Around four months, many babies become much more socially engaged, and sleep can suddenly feel less predictable. This guide covers what your four month old may be doing, why sleep can wobble now, feeding as milk still leads, and how to look after yourself as the world starts expecting more of you.",
    phase: PHASE_3_6,
    shortVersion: {
      baby: "More social, more expressive, more distractible. Rolling may start. First hand play appears.",
      feeding: "Milk still leads. Feeds are quicker and often distracted. First foods are not needed yet.",
      sleep: "The four month sleep shift is common. Shorter naps and more night wakes are usually a phase, not regression of skill.",
      you: "Confidence and tiredness in equal measure. Others may expect you to be back to normal. You do not have to be.",
      whenToAsk: "Feeding worries, weight concerns, low mood that will not lift, or if your baby is unusually quiet or floppy.",
    },
    babyEditorial: {
      intro:
        "Four months is a lively, expressive age for many babies, and often the point where sleep and feeding both feel like they are shifting under you. The shift is developmental, not a step backwards. Everything you have been doing still matters.",
      subsections: [
        {
          heading: "Very social",
          body:
            "Smiles, laughs, watching your mouth as you talk. Many babies find their voice this month with squeals, gurgles and long conversations of coos.",
        },
        {
          heading: "Rolling may start",
          body:
            "Some babies roll from tummy to back or back to tummy around now. Keep changes and playtime on a safe low surface as movement becomes less predictable.",
        },
        {
          heading: "Hands find everything",
          body:
            "Fingers meet each other, meet the mouth, meet toys, meet your hair. Mouthing is normal exploration and not usually about teething alone.",
        },
        {
          heading: "Distractible feeding",
          body:
            "Feeds may become shorter and easily interrupted. A calm, low stimulation space often helps, especially in the day.",
        },
        {
          heading: "The four month sleep shift",
          body:
            "Around now many babies change how they cycle through sleep. Nights can feel harder for a stretch, and naps often shorten. It is usually a phase and rarely a sign you have done anything wrong.",
        },
        {
          heading: "First foods are not needed yet",
          body:
            "Solid foods are not recommended until around 6 months. Watching you eat and being curious is not a signal to start early on its own.",
        },
      ],
    },
    feedingSection: {
      intro:
        "Milk is still the main event at four months. Feeds may look different, and distractibility can shake your confidence, but this is usually a shape change rather than a supply problem.",
      points: [
        "Feeds are often faster and more efficient. Short feeds on their own are not a red flag.",
        "Distracted feeding is common. A quieter room or a slower pace often helps.",
        "First foods are not recommended before around 6 months for most babies.",
        "If you are combination feeding, expect the balance to shift as your baby grows.",
        "Growth spurts can still bring a few days of more frequent feeds.",
      ],
      whenToAsk:
        "Ask your health visitor or a feeding support line if feeds are consistently painful, wet nappies drop off, weight gain stalls, or feeding worries are affecting how you feel.",
    },
    sleepSection: {
      intro:
        "Sleep at four months is a common source of anxiety. Try to hold changes lightly and keep the basics steady while your baby moves through this shift.",
      points: [
        "Shorter naps and more night wakes can appear around now and usually settle over weeks.",
        "A calm, predictable wind down helps more than a strict schedule at this age.",
        "Contact naps and being held to sleep are still normal.",
        "Try to avoid making big changes based on one bad night, or one good one.",
      ],
      safeSleep:
        "Continue with back sleeping on a firm flat surface in a clear sleep space, in the same room as you until at least six months. Once your baby can roll independently, keep the sleep space clear and stop swaddling if you have been using one.",
      whenToAsk:
        "Ask for a review if your baby is much less interested in feeds, is unusually sleepy or floppy, or has periods of fast or grunting breathing.",
    },
    youEditorial: {
      intro:
        "Four months in, the world often assumes you should be sorted. In reality, your body is still adjusting, sleep is often getting harder before it gets easier, and you may be starting to think about work or your own life again. All of that at once is a lot.",
      subsections: [
        {
          heading: "The four month wall",
          body:
            "A stretch of harder nights can knock confidence just as it was building. It is not evidence that you have failed at anything.",
        },
        {
          heading: "Your body is still recovering",
          body:
            "Pelvic floor, core, hormones and sleep debt are all still settling. This is a good moment to ask about anything that has been ignored so far.",
        },
        {
          heading: "Thinking about work",
          body:
            "Return to work, childcare, or changes to how you split care may be on your mind now. There is no right answer and no obligation to know yet.",
        },
        {
          heading: "Small things count",
          body:
            "A walk, a short call with a friend, a proper meal. These are not indulgences at this stage. They are recovery.",
        },
      ],
    },
    feelsHardIntro:
      "Four months can be tender in a way that surprises people. Naming it is not complaining.",
    feelsHard: [
      "Sleep has got harder just as you were finding your feet.",
      "Everyone assumes you should be enjoying it more than you are.",
      "Feeds feel rushed and full of interruptions.",
      "Big decisions about work or childcare are starting to appear.",
    ],
    whatHelpsIntro:
      "None of these fix a difficult stretch. They can make it feel less lonely.",
    whatHelps: [
      "Keeping the sleep basics steady rather than trying new approaches every few nights.",
      "One trusted person you can be honest with about how it really is.",
      "Time outside, even briefly, most days.",
      "Naming one thing that went well before naming what did not.",
    ],
    support: [
      {
        when: "Any time",
        body: "Low mood, anxiety or intrusive thoughts that are affecting your day. You do not need to wait for a review to raise this with your GP or health visitor.",
      },
      {
        when: "Same day",
        body: "A baby who is unusually sleepy, is feeding much less than usual, or has fewer wet nappies than expected. Contact your health visitor, GP or NHS 111.",
      },
      {
        when: "Urgent",
        body: "Fast breathing, grunting with each breath, a blue or grey tinge, or a very high or low temperature. Call 999 or go straight to A&E.",
      },
    ],
    questions: [
      {
        question: "Is the four month sleep regression real?",
        answer:
          "Yes, in the sense that many babies change how they cycle through sleep around now, and nights often feel harder for a stretch. It is a shift in development rather than a lost skill. Keeping basics steady usually helps most.",
        readMore: {
          label: "Read: when your baby's sleep suddenly changes",
          href: "/first-year/sleep/when-sleep-suddenly-changes",
        },
        askTopic: "four-month-sleep",
      },
      {
        question: "Should I start solids now?",
        answer:
          "For most babies, first foods are not recommended until around 6 months. Watching you eat is curiosity, not a signal to start early on its own. Your health visitor can talk you through your baby's readiness.",
        readMore: {
          label: "Read: bottle and breastfeeding questions",
          href: "/first-year/feeding/bottle-and-breastfeeding-questions",
        },
        askTopic: "four-month-solids",
      },
      {
        question: "My baby is very distracted at feeds, is that normal?",
        answer:
          "Yes. Around this age, curiosity often gets in the way of feeding. A calm room, fewer people around and a slower pace usually help.",
        readMore: {
          label: "Read: helping your baby settle",
          href: "/first-year/sleep/helping-your-baby-settle",
        },
        askTopic: "distracted-feeding",
      },
      {
        question: "Should I be thinking about a routine yet?",
        answer:
          "A very loose shape to the day can help you plan around feeds and naps. A strict schedule is not necessary at this age and often causes more stress than it saves.",
        readMore: {
          label: "Read: baby development in the first year",
          href: "/first-year/development/baby-development-in-the-first-year",
        },
        askTopic: "four-month-routine",
      },
    ],
    related: [
      { label: "Helping your baby settle", kicker: "Sleep", href: "/first-year/sleep/helping-your-baby-settle" },
      { label: "Baby development in the first year", kicker: "Development", href: "/first-year/development/baby-development-in-the-first-year" },
      { label: "Feeling like yourself again", kicker: "Emotional wellbeing", href: "/first-year/emotional-wellbeing/feeling-like-yourself-again" },
      { label: "Teething", kicker: "Care and safety", href: "/first-year/care-and-safety/teething" },
    ],
    sources: [
      { label: "Your baby at 4 to 6 months", publisher: "NHS Start for Life", url: "https://www.nhs.uk/start-for-life/baby/baby-development/4-6-months/" },
      { label: "Baby sleep tips", publisher: "NHS", url: "https://www.nhs.uk/conditions/baby/caring-for-a-newborn/helping-your-baby-to-sleep/" },
      { label: "Your baby's first solid foods", publisher: "NHS", url: "https://www.nhs.uk/conditions/baby/weaning-and-feeding/babys-first-solid-foods/" },
      { label: "Safer sleep advice", publisher: "The Lullaby Trust", url: "https://www.lullabytrust.org.uk/safer-sleep-advice/" },
      { label: "Responsive feeding", publisher: "UNICEF Baby Friendly", url: "https://www.unicef.org.uk/babyfriendly/baby-friendly-resources/relationship-building-resources/responsive-feeding-infosheet/" },
    ],
    seo: {
      title: "4 month old baby guide | The Start of You",
      description:
        "A calm guide to your baby at 4 months. Social smiles, the four month sleep shift, distracted feeds and looking after yourself as expectations rise.",
    },
  },

  "5-months": {
    slug: "5-months",
    label: "5 months",
    title: "5 months old: getting ready, not there yet",
    standfirst:
      "By five months, many babies are stronger, more interactive and closer to real solids, though milk still leads. This guide covers what your five month old may be doing, feeding and sleep as things keep shifting, and how you may be feeling as identity questions start to grow.",
    phase: PHASE_3_6,
    shortVersion: {
      baby: "Stronger body control. Grabbing toys. Watching everything you do. Not usually ready for solids yet.",
      feeding: "Milk still leads. Feeds may be quick and interrupted. Watch for readiness signs, do not race them.",
      sleep: "Still variable. Some regressions ease, others linger. Nap length can be short and inconsistent.",
      you: "Sleep debt is real. Body still adjusting. Identity questions may get louder in quieter moments.",
      whenToAsk: "Feeding worries, mood that is not lifting, or a baby who is unusually quiet, floppy or less interested in feeds.",
    },
    babyEditorial: {
      intro:
        "Five months is a busy, hands-on stage for many babies. You may see stronger body control, real personality, and the first hints that solids are on the horizon. There is no race to the next milestone here.",
      subsections: [
        {
          heading: "Stronger body",
          body:
            "Head control is often solid. Some babies push up on their arms in tummy time, or start to hold their weight when supported to sit briefly.",
        },
        {
          heading: "Hands and mouths",
          body:
            "Everything goes in the mouth. Grabbing is more accurate, though not precise yet. This is exploration, and mostly not about teething.",
        },
        {
          heading: "Readiness for solids is building",
          body:
            "Signs of readiness include steady head and neck control, being able to sit supported, showing interest in food and no longer pushing food back out with the tongue. Most babies are not fully ready until closer to 6 months.",
        },
        {
          heading: "Feeding is still milk led",
          body:
            "Milk remains the main source of nutrition. First tastes are not needed yet, and starting too early does not usually help sleep or settling.",
        },
        {
          heading: "Sleep is still uneven",
          body:
            "Some babies find a longer night stretch this month, others go through more wakes. Both are within a wide range, and neither is a verdict on anything you are doing.",
        },
        {
          heading: "Real preferences appear",
          body:
            "You may notice your baby preferring certain toys, songs or people. Personality is starting to show more clearly.",
        },
      ],
    },
    feedingSection: {
      intro:
        "Feeding at five months is still milk led. Readiness for solids is worth understanding, but there is usually no rush to start.",
      points: [
        "Milk is still the primary source of nutrition.",
        "Look for readiness signs, not a fixed date, but do not start solids before around 6 months for most babies.",
        "Short, distracted feeds continue to be common.",
        "Growth spurts can bring more frequent feeds for a few days.",
        "If you are combination feeding, keep watching your baby's cues rather than the bottle.",
      ],
      whenToAsk:
        "Ask your health visitor if feeding is consistently painful, wet nappies drop off, weight gain stalls or you are unsure whether to start solids.",
    },
    sleepSection: {
      intro:
        "Sleep at five months is still very individual. It is a common month to feel stuck between the four month shift and hoped-for longer nights.",
      points: [
        "Short naps are still common. A predictable calm wind down often helps more than a rigid schedule.",
        "Contact naps and being held to sleep are still developmentally normal.",
        "Sleep training approaches vary widely and are a personal decision. There is no single right answer.",
        "Try to hold changes lightly and give any new approach a fair, gentle run.",
      ],
      safeSleep:
        "Continue with back sleeping on a firm flat surface, in the same room as you until at least six months. Keep the sleep space clear. Stop swaddling once your baby can roll independently.",
      whenToAsk:
        "Ask for a review if your baby is much less interested in feeds, is unusually sleepy or floppy, or has fast or grunting breathing.",
    },
    youEditorial: {
      intro:
        "Five months in, physical recovery is often steadier, but the mental and identity work of new parenthood can get louder. Quiet moments can bring big feelings, especially about how you have changed.",
      subsections: [
        {
          heading: "Sleep debt is cumulative",
          body:
            "Months of broken sleep add up. You may feel emotional, forgetful or physically drained. Small acts of rest and support genuinely help, even if they do not fix it.",
        },
        {
          heading: "Body still adjusting",
          body:
            "Pelvic floor, core and hormones continue to settle. Gentle movement, honest check ins and asking about anything that has been dismissed all matter.",
        },
        {
          heading: "Identity is shifting",
          body:
            "Thinking about who you are outside of parenting is not selfish. It is part of the long work of becoming a new version of yourself.",
        },
        {
          heading: "Support looks different now",
          body:
            "The offers of help may have quietened. It is fine to ask directly for what you need, and to keep asking.",
        },
      ],
    },
    feelsHardIntro:
      "Five months can look calm from the outside and feel very mixed from the inside.",
    feelsHard: [
      "You feel invisible under everyone's attention on the baby.",
      "You are unsure how you feel about your body or your life outside of parenting.",
      "Sleep has not improved as much as you hoped by now.",
      "You are tired of being asked how the baby sleeps.",
    ],
    whatHelpsIntro:
      "Little things, done kindly for yourself, help hold this stage together.",
    whatHelps: [
      "A short daily anchor that is just for you, even ten minutes.",
      "Honest conversations with one person you trust.",
      "Gentle movement, when it feels right, without any recovery pressure.",
      "Naming that you are still adjusting, not late to something.",
    ],
    support: [
      {
        when: "Any time",
        body: "Low mood, anxiety or intrusive thoughts that are not lifting. Please talk to your GP or health visitor.",
      },
      {
        when: "Same day",
        body: "A baby who is unusually sleepy, is feeding much less than usual, or has fewer wet nappies. Contact your GP, health visitor or NHS 111.",
      },
      {
        when: "Ongoing concerns",
        body: "Persistent pain, incontinence or symptoms that were dismissed earlier. It is fine to ask again.",
      },
    ],
    questions: [
      {
        question: "Can I start solids at 5 months?",
        answer:
          "For most babies, first foods are not recommended until around 6 months. Signs of readiness include steady head and neck control, being able to sit supported and no longer pushing food back out with the tongue. Your health visitor can advise.",
        readMore: {
          label: "Read: bottle and breastfeeding questions",
          href: "/first-year/feeding/bottle-and-breastfeeding-questions",
        },
        askTopic: "five-month-solids",
      },
      {
        question: "My baby's naps are still very short, is that a problem?",
        answer:
          "Not usually on its own. Nap length is very variable at this age. What matters more is that your baby is generally settled between sleeps and feeding well.",
        readMore: {
          label: "Read: helping your baby settle",
          href: "/first-year/sleep/helping-your-baby-settle",
        },
        askTopic: "short-naps",
      },
      {
        question: "Why do I still feel so tired, is this normal?",
        answer:
          "Months of broken sleep add up. Deep tiredness at 5 months is common. If you also feel low, anxious or hopeless, please speak to your GP or health visitor.",
        readMore: {
          label: "Read: feeling like yourself again",
          href: "/first-year/emotional-wellbeing/feeling-like-yourself-again",
        },
        askTopic: "five-month-tiredness",
      },
      {
        question: "Should I be doing developmental activities with my baby?",
        answer:
          "Everyday life, talking, holding, singing and being close is enough. Toys can be interesting but are not essential. Follow your baby's interest rather than a curriculum.",
        readMore: {
          label: "Read: baby development in the first year",
          href: "/first-year/development/baby-development-in-the-first-year",
        },
        askTopic: "five-month-play",
      },
    ],
    related: [
      { label: "Baby development in the first year", kicker: "Development", href: "/first-year/development/baby-development-in-the-first-year" },
      { label: "Helping your baby settle", kicker: "Sleep", href: "/first-year/sleep/helping-your-baby-settle" },
      { label: "Feeling like yourself again", kicker: "Emotional wellbeing", href: "/first-year/emotional-wellbeing/feeling-like-yourself-again" },
      { label: "Teething", kicker: "Care and safety", href: "/first-year/care-and-safety/teething" },
    ],
    sources: [
      { label: "Your baby at 4 to 6 months", publisher: "NHS Start for Life", url: "https://www.nhs.uk/start-for-life/baby/baby-development/4-6-months/" },
      { label: "Your baby's first solid foods", publisher: "NHS", url: "https://www.nhs.uk/conditions/baby/weaning-and-feeding/babys-first-solid-foods/" },
      { label: "Baby sleep tips", publisher: "NHS", url: "https://www.nhs.uk/conditions/baby/caring-for-a-newborn/helping-your-baby-to-sleep/" },
      { label: "Safer sleep advice", publisher: "The Lullaby Trust", url: "https://www.lullabytrust.org.uk/safer-sleep-advice/" },
      { label: "Feelings and relationships after having a baby", publisher: "NHS", url: "https://www.nhs.uk/conditions/baby/support-and-services/feelings-relationships-mental-health/" },
    ],
    seo: {
      title: "5 month old baby guide | The Start of You",
      description:
        "A calm guide to your baby at 5 months. Readiness for solids, feeding shifts, uneven sleep and how you may be feeling as identity questions grow.",
    },
  },

  "6-months": {
    slug: "6-months",
    label: "6 months",
    title: "6 months old: first foods and firmer sitting",
    standfirst:
      "Six months is often the month first foods begin, sitting becomes steadier and your baby feels visibly older. Milk still leads for a while yet. This guide covers first foods, feeding and sleep, and how you may be feeling as the first half of the year passes.",
    phase: PHASE_6_9,
    shortVersion: {
      baby: "First foods usually start now. Sitting steadier. Reaching, grabbing, and lots of mouthing.",
      feeding: "Milk is still the main source of nutrition. First foods are for exploration, not replacement.",
      sleep: "Still variable. Some longer stretches for some babies. New foods do not usually solve sleep.",
      you: "Half a year in. Recovery is deeper than visible. Feelings can arrive in quieter moments.",
      whenToAsk: "Slow weight gain, feeding worries, low mood that will not lift or a very unsettled baby.",
    },
    babyEditorial: {
      intro:
        "Six months is a real milestone month for many families. First foods usually begin, sitting becomes steadier and your baby may feel like a small person with clear opinions. Milk is still doing most of the nutritional work.",
      subsections: [
        {
          heading: "Ready for first tastes",
          body:
            "Signs of readiness include steady head and neck control, being able to sit supported, coordinating eyes, hands and mouth, and no longer pushing food back out with the tongue. Around 6 months is a good window for most babies.",
        },
        {
          heading: "Sitting is steadier",
          body:
            "Many babies sit briefly with support, or even independently for short spells. Falls are still common. A soft surface behind them helps.",
        },
        {
          heading: "Reaching and grabbing",
          body:
            "Hands are more accurate. Everything gets grabbed, mouthed, then dropped. This is normal exploration, not naughtiness.",
        },
        {
          heading: "Feeding is still milk led",
          body:
            "First foods are for tasting, learning textures and enjoying eating together. Milk continues to be the main source of nutrition for months yet.",
        },
        {
          heading: "Sleep is still doing its own thing",
          body:
            "Starting solids does not usually solve sleep. Some babies begin longer stretches around now, some do not. Both are within a wide range.",
        },
        {
          heading: "Big personality",
          body:
            "Laughs, squeals, protests and clear preferences all become more obvious. There is no need to correct feelings at this age, just to hold them.",
        },
      ],
    },
    feedingSection: {
      intro:
        "First foods are a milestone, but a gentle one. Milk is still the main event. The point of this month is exploration, not replacement.",
      points: [
        "Around 6 months is when first foods are usually introduced. Follow readiness signs, not a fixed date.",
        "Offer a wide range of tastes and textures gradually, including common allergens as guided.",
        "Milk continues to be the main source of nutrition for the rest of the first year.",
        "Choking looks different to gagging. Learn the basics of paediatric first aid if you can.",
        "Baby led weaning, purees, and a mix of both are all valid approaches.",
      ],
      whenToAsk:
        "Ask your health visitor if you are unsure about readiness, if weight gain stalls, if feeds are painful, or if your baby is very reluctant to try any food.",
    },
    sleepSection: {
      intro:
        "Sleep at six months is still very variable. First foods do not usually change nights on their own. The basics still matter most.",
      points: [
        "Some babies have longer stretches at night, some do not. Both are within a normal range.",
        "Contact naps and needing help to fall asleep are still common.",
        "A gentle, predictable wind down often helps more than sudden changes.",
        "Room sharing is still recommended until at least six months.",
      ],
      safeSleep:
        "Continue with back sleeping on a firm flat surface in a clear sleep space. Keep the room comfortably cool and avoid loose bedding. Once your baby can roll independently, they will find their own position, but always place them on their back to sleep.",
      whenToAsk:
        "Ask for a review if your baby is much less interested in feeds, is unusually sleepy, or has periods of fast or grunting breathing.",
    },
    youEditorial: {
      intro:
        "Half a year in is a strange milestone. On the outside, you may look like you are back to your life. On the inside, recovery is often still going on quietly, and feelings can arrive from nowhere.",
      subsections: [
        {
          heading: "Recovery is deeper than visible",
          body:
            "Pelvic floor, core, hormones and sleep debt continue to settle for months. There is still time and reason to ask about anything that has not felt right.",
        },
        {
          heading: "Delayed feelings",
          body:
            "For some parents, feelings about the birth or early weeks only really land now. Talking, journaling or a birth reflections service can help.",
        },
        {
          heading: "Identity keeps shifting",
          body:
            "Work, friendships, relationships and how you spend your time may all be in flux. There is no right pace to figure this out.",
        },
        {
          heading: "Support you can keep leaning on",
          body:
            "Ongoing help matters even now. It is fine to keep asking, and to change what you ask for as the shape of your life changes.",
        },
      ],
    },
    feelsHardIntro:
      "Six months can bring quiet, unexpected feelings alongside real satisfaction.",
    feelsHard: [
      "You feel like time has both crawled and flown past.",
      "You are unsure whether to celebrate a milestone or grieve how fast it moved.",
      "Feeding worries are back in a new shape.",
      "You still do not feel entirely like yourself.",
    ],
    whatHelpsIntro:
      "Small, honest acts of care go further than any big change.",
    whatHelps: [
      "Marking the six month point in a small way that feels real to you.",
      "Continuing to ask about anything in your body that has been ignored.",
      "One trusted person to be honest with about how you actually are.",
      "Time outside, sunlight, and gentle movement when it fits.",
    ],
    support: [
      {
        when: "Any time",
        body: "Low mood, anxiety or intrusive thoughts that are not lifting. Please talk to your GP or health visitor. This is a health issue, not a weakness.",
      },
      {
        when: "Same day",
        body: "A baby who is much less interested in feeds, is unusually sleepy, or seems very unwell. Contact your GP, health visitor or NHS 111.",
      },
      {
        when: "Urgent",
        body: "Choking that does not clear, a very high or low temperature, or a baby who is very difficult to rouse. Call 999 or go straight to A&E.",
      },
    ],
    questions: [
      {
        question: "How do I start solids safely?",
        answer:
          "Start with soft, easy shapes and offer a wide range of tastes and textures over time. Learn the difference between gagging and choking, and paediatric first aid basics if you can. Milk is still the main source of nutrition.",
        readMore: {
          label: "Read: bottle and breastfeeding questions",
          href: "/first-year/feeding/bottle-and-breastfeeding-questions",
        },
        askTopic: "first-foods",
      },
      {
        question: "Will starting solids help my baby sleep?",
        answer:
          "Usually not on its own. Starting solids is about learning to eat, not sleep. Nights often continue to be very variable regardless of what your baby is eating.",
        readMore: {
          label: "Read: helping your baby settle",
          href: "/first-year/sleep/helping-your-baby-settle",
        },
        askTopic: "solids-and-sleep",
      },
      {
        question: "What if my baby is not interested in food?",
        answer:
          "Some babies take a while to enjoy solids. Keep offering, keep it low pressure, and continue with milk feeds as usual. If it continues to worry you, speak to your health visitor.",
        readMore: {
          label: "Read: baby development in the first year",
          href: "/first-year/development/baby-development-in-the-first-year",
        },
        askTopic: "not-interested-in-food",
      },
      {
        question: "How am I meant to feel at six months?",
        answer:
          "However you feel is valid. Some parents feel more like themselves, others feel further from it. If low mood or anxiety is present most days, please talk to your GP or health visitor.",
        readMore: {
          label: "Read: when parenthood feels heavy",
          href: "/first-year/emotional-wellbeing/when-parenthood-feels-heavy",
        },
        askTopic: "six-month-feelings",
      },
    ],
    related: [
      { label: "Baby development in the first year", kicker: "Development", href: "/first-year/development/baby-development-in-the-first-year" },
      { label: "Bottle and breastfeeding questions", kicker: "Feeding", href: "/first-year/feeding/bottle-and-breastfeeding-questions" },
      { label: "When parenthood feels heavy", kicker: "Emotional wellbeing", href: "/first-year/emotional-wellbeing/when-parenthood-feels-heavy" },
    ],
    sources: [
      { label: "Your baby's first solid foods", publisher: "NHS", url: "https://www.nhs.uk/conditions/baby/weaning-and-feeding/babys-first-solid-foods/" },
      { label: "Your baby at 6 months", publisher: "NHS Start for Life", url: "https://www.nhs.uk/start-for-life/baby/baby-development/4-6-months/" },
      { label: "Baby sleep tips", publisher: "NHS", url: "https://www.nhs.uk/conditions/baby/caring-for-a-newborn/helping-your-baby-to-sleep/" },
      { label: "Safer sleep advice", publisher: "The Lullaby Trust", url: "https://www.lullabytrust.org.uk/safer-sleep-advice/" },
      { label: "Feelings and relationships after having a baby", publisher: "NHS", url: "https://www.nhs.uk/conditions/baby/support-and-services/feelings-relationships-mental-health/" },
    ],
    seo: {
      title: "6 month old baby guide | The Start of You",
      description:
        "A gentle guide to your baby at 6 months. First foods, steadier sitting, feeding and sleep shifts, and how you may be feeling at the half year mark.",
    },
  },

  "7-months": {
    slug: "7-months",
    label: "7 months",
    title: "7 months old: exploring, tasting, moving",
    standfirst:
      "By seven months, many babies are eating a wider range of foods, sitting more independently and starting to move in small ways. Milk still leads. This guide covers new textures, early movement, sleep changes and how you may be feeling as life reshapes around a busier baby.",
    phase: PHASE_6_9,
    shortVersion: {
      baby: "More textures at meals. Sitting more steadily. Early attempts at moving, rocking or shuffling.",
      feeding: "Milk still leads. Two or three small meals of solids are common. Textures widen gently.",
      sleep: "Some longer stretches for some babies. Sleep is still very individual. Regressions can happen.",
      you: "Life reshaping around a busier baby. Work and identity questions may be pressing.",
      whenToAsk: "Weight worries, feeding difficulty, mood that is not lifting or a baby who is unusually quiet or unwell.",
    },
    babyEditorial: {
      intro:
        "Seven months is often a bright, curious, hands-on stage. Meals get more interesting, sitting becomes steadier and small attempts at movement start to appear. There is a wide range of normal here.",
      subsections: [
        {
          heading: "Wider tastes",
          body:
            "Many babies enjoy exploring more textures now. Continuing to offer a range of tastes and textures, including common allergens as guided, helps them learn to eat.",
        },
        {
          heading: "Sitting more independently",
          body:
            "Some babies sit unsupported for longer spells. A cushioned surface behind them still helps. This changes how they see the world and often shifts their play.",
        },
        {
          heading: "First attempts to move",
          body:
            "Rocking on hands and knees, shuffling on their bottom, rolling to reach things or pushing back. Every baby finds their own path, and crawling in the classic sense is not a requirement.",
        },
        {
          heading: "Early sounds and babble",
          body:
            "Babbling with repeated sounds like 'ba ba' or 'da da' often begins around now. It does not mean specific words yet, but is important early language work.",
        },
        {
          heading: "Sleep can wobble again",
          body:
            "Developmental leaps, teeth and new movement can all shake sleep. A steady basic wind down and safe sleep basics matter more than any single technique.",
        },
        {
          heading: "Attention span",
          body:
            "Your baby may focus on one thing for slightly longer. Simple household objects are often more interesting than complex toys.",
        },
      ],
    },
    feedingSection: {
      intro:
        "Feeding at seven months is still milk led, with solids growing steadily. This is about learning to eat, not replacing feeds.",
      points: [
        "Two or three small meals of solids a day is common, plus usual milk feeds.",
        "Offer a range of textures and shapes as you feel confident, following your baby's lead.",
        "Common allergens should be introduced gradually as guided, not avoided without reason.",
        "Some babies eat enthusiastically, others take longer to enjoy solids. Both are normal.",
        "Milk continues to be the main source of nutrition.",
      ],
      whenToAsk:
        "Ask your health visitor if weight gain stalls, if your baby refuses all solids for weeks, or if feeding is causing significant worry.",
    },
    sleepSection: {
      intro:
        "Sleep at seven months is very individual. Wobbles caused by teeth, movement or developmental leaps are common and usually settle over weeks.",
      points: [
        "Nap patterns may shift as movement changes. Some babies drop a nap, most do not yet.",
        "Contact naps and needing help to settle are still common.",
        "Try to keep basics steady during wobbles rather than trying new approaches every night.",
        "Sleep training is a personal choice with no single right answer.",
      ],
      safeSleep:
        "Continue with back sleeping in a clear sleep space. Once your baby can roll and change position independently, always still place them on their back to sleep and let them settle in whatever position they choose.",
      whenToAsk:
        "Ask for a review if your baby is much less interested in feeds, is unusually sleepy, or has fast or grunting breathing.",
    },
    youEditorial: {
      intro:
        "Seven months in, the shape of your life is often visibly different. Work, childcare and how care is shared may all be shifting. This is a real transition, not just an emotional one.",
      subsections: [
        {
          heading: "Return to work questions",
          body:
            "Whether you are going back, changing hours, or staying at home for longer, this can bring big feelings. There is no morally correct answer.",
        },
        {
          heading: "Body still adjusting",
          body:
            "Pelvic floor, core, joints and hormones continue to settle. Gentle movement, honest reviews and asking about anything ongoing all matter.",
        },
        {
          heading: "Sharing care",
          body:
            "As your baby becomes more portable, care can start to look different between partners, family or childcare. It is fine to renegotiate.",
        },
        {
          heading: "Mental load",
          body:
            "The invisible planning, remembering and worrying often falls mostly to one person. Naming it aloud is often the first step to sharing it.",
        },
      ],
    },
    feelsHardIntro:
      "Seven months in, the enthusiasm and admin of daily life often collide.",
    feelsHard: [
      "You feel pulled between work, family and your own needs.",
      "Mealtimes can be messy, slow and exhausting.",
      "Sleep just as it was settling can wobble again.",
      "You feel invisible under the logistics of the week.",
    ],
    whatHelpsIntro:
      "None of these solve the load. They can shift how it sits on you.",
    whatHelps: [
      "Naming the mental load out loud with the people around you.",
      "One anchor in your week that is only for you.",
      "Keeping mealtimes low pressure, even if they are messy.",
      "Continuing to ask about anything that has not felt right.",
    ],
    support: [
      {
        when: "Any time",
        body: "Low mood, anxiety or intrusive thoughts that are not lifting. Please talk to your GP or health visitor.",
      },
      {
        when: "Same day",
        body: "A baby who is much less interested in feeds, is unusually sleepy, or has a very high or low temperature. Contact your GP, health visitor or NHS 111.",
      },
      {
        when: "Ongoing concerns",
        body: "Persistent pain, incontinence or symptoms that were dismissed earlier. It is fine to ask again.",
      },
    ],
    questions: [
      {
        question: "How much should my baby be eating at 7 months?",
        answer:
          "Amounts vary widely. Two or three small meals of solids plus usual milk feeds is common. Milk is still the main source of nutrition. Follow appetite rather than a chart.",
        readMore: {
          label: "Read: bottle and breastfeeding questions",
          href: "/first-year/feeding/bottle-and-breastfeeding-questions",
        },
        askTopic: "seven-month-eating",
      },
      {
        question: "My baby is not crawling yet, is that a problem?",
        answer:
          "Not on its own. Some babies never crawl in the classic way. What matters is that they are curious, moving in some way, and generally interested in the world.",
        readMore: {
          label: "Read: when milestones feel uneven",
          href: "/first-year/development/when-milestones-feel-uneven",
        },
        askTopic: "not-crawling",
      },
      {
        question: "Sleep has got worse again, why?",
        answer:
          "Teeth, developmental leaps and new movement can all shake sleep temporarily. Keeping the basics steady usually helps more than making big changes.",
        readMore: {
          label: "Read: helping your baby settle",
          href: "/first-year/sleep/helping-your-baby-settle",
        },
        askTopic: "sleep-wobble",
      },
      {
        question: "How do I share the load more fairly at home?",
        answer:
          "Naming the invisible planning and remembering, not just the visible tasks, is often the first step. It is a conversation, and it is fine to have it more than once.",
        readMore: {
          label: "Read: when parenthood feels heavy",
          href: "/first-year/emotional-wellbeing/when-parenthood-feels-heavy",
        },
        askTopic: "mental-load",
      },
    ],
    related: [
      { label: "When milestones feel uneven", kicker: "Development", href: "/first-year/development/when-milestones-feel-uneven" },
      { label: "Helping your baby settle", kicker: "Sleep", href: "/first-year/sleep/helping-your-baby-settle" },
      { label: "When parenthood feels heavy", kicker: "Emotional wellbeing", href: "/first-year/emotional-wellbeing/when-parenthood-feels-heavy" },
    ],
    sources: [
      { label: "Your baby's first solid foods", publisher: "NHS", url: "https://www.nhs.uk/conditions/baby/weaning-and-feeding/babys-first-solid-foods/" },
      { label: "Your baby at 7 to 9 months", publisher: "NHS Start for Life", url: "https://www.nhs.uk/start-for-life/baby/baby-development/7-9-months/" },
      { label: "Baby sleep tips", publisher: "NHS", url: "https://www.nhs.uk/conditions/baby/caring-for-a-newborn/helping-your-baby-to-sleep/" },
      { label: "Safer sleep advice", publisher: "The Lullaby Trust", url: "https://www.lullabytrust.org.uk/safer-sleep-advice/" },
      { label: "Feelings and relationships after having a baby", publisher: "NHS", url: "https://www.nhs.uk/conditions/baby/support-and-services/feelings-relationships-mental-health/" },
    ],
    seo: {
      title: "7 month old baby guide | The Start of You",
      description:
        "A calm guide to your baby at 7 months. Wider tastes at meals, early movement, sleep wobbles and the mental load as life reshapes around a busier baby.",
    },
  },

  "8-months": {
    slug: "8-months",
    label: "8 months",
    title: "8 months old: on the move and holding on",
    standfirst:
      "By eight months, many babies are moving in some way, know exactly who their people are and can suddenly seem more clingy. This guide covers early mobility, separation feelings, feeding and sleep, and how you may be feeling as connection deepens and time speeds up.",
    phase: PHASE_6_9,
    shortVersion: {
      baby: "Moving in some way. Pincer grasp emerging. Separation anxiety may begin. Clear preferences for people.",
      feeding: "Meals more substantial. Finger foods increasingly enjoyed. Milk still important.",
      sleep: "Often disrupted again around now. Separation feelings can affect settling.",
      you: "Connection deepens. Load stays real. Small acts of care for yourself continue to matter.",
      whenToAsk: "Feeding difficulty, mood that is not lifting, or a baby who is unusually quiet, floppy or very unwell.",
    },
    babyEditorial: {
      intro:
        "Eight months is often full of visible change. Moving, clinging, laughing and protesting. Your baby knows your face and your voice and is starting to have big feelings about being separated from you.",
      subsections: [
        {
          heading: "On the move",
          body:
            "Crawling, commando crawling, shuffling or rolling to get around. Some babies pull to stand. Small safety changes at home become more important now.",
        },
        {
          heading: "Pincer grasp",
          body:
            "Fingers become more precise. Picking up small pieces of food with thumb and finger is often possible. Choking safety with foods and toys matters more than ever.",
        },
        {
          heading: "Separation anxiety",
          body:
            "Many babies start to protest when you leave the room or when someone unfamiliar holds them. This is a sign of secure attachment, not a problem to fix.",
        },
        {
          heading: "Meals get more real",
          body:
            "Finger foods are often enjoyed. Meals can be a mix of self feeding and offered spoons. Milk continues to be important.",
        },
        {
          heading: "Sleep can shift again",
          body:
            "Separation feelings, new mobility and teeth can all disrupt sleep. A steady wind down and safe sleep basics still matter most.",
        },
        {
          heading: "Big laughs and clear preferences",
          body:
            "Your baby probably has clear favourites, songs, games and people. Enjoyment is not a distraction from development, it is development.",
        },
      ],
    },
    feedingSection: {
      intro:
        "Meals at eight months are often bigger, messier and more interactive. Milk still matters, but food is starting to make up a real part of the day.",
      points: [
        "Two or three meals of solids a day is common, with snacks appearing for some babies.",
        "Finger foods that are soft and easy to hold help skill building.",
        "Cut foods to reduce choking risk. Avoid whole nuts, grapes, cherry tomatoes and other high risk shapes.",
        "Milk continues to be an important part of the daily intake.",
        "Mess is part of learning. Bibs, wipes and low expectations help.",
      ],
      whenToAsk:
        "Ask your health visitor if weight gain stalls, if your baby refuses all solids for weeks, or if you are worried about swallowing.",
    },
    sleepSection: {
      intro:
        "Sleep at eight months can wobble as separation feelings grow. Basics still matter most.",
      points: [
        "Some babies need more help to settle again around now. Contact and reassurance are not spoiling.",
        "Naps often shift as movement changes. Some babies drop a nap, most do not yet.",
        "New skills like pulling to stand can bring extra wakes for a while.",
        "Try to hold changes lightly and give any new approach time.",
      ],
      safeSleep:
        "Continue with back sleeping in a clear sleep space. Once your baby is pulling to stand in the cot, lower the mattress and remove anything they could climb on. Room sharing until at least six months is recommended, and many families continue longer.",
      whenToAsk:
        "Ask for a review if your baby is much less interested in feeds, is unusually sleepy, or has fast or grunting breathing.",
    },
    youEditorial: {
      intro:
        "Eight months in, connection may be at a new depth just as your energy is running lower. Both can be true at once.",
      subsections: [
        {
          heading: "Loved and needed",
          body:
            "Being someone's whole world is beautiful and heavy. Wanting a little space is not a failure of love.",
        },
        {
          heading: "Recovery keeps going",
          body:
            "Pelvic floor, core, joints and hormones continue to settle. Ongoing niggles are still worth raising.",
        },
        {
          heading: "Rhythms of your own",
          body:
            "A short walk without the pram, a swim, a shower without a listener. These are not luxuries. They are how you keep being able to give.",
        },
        {
          heading: "Support that lasts",
          body:
            "This is a stage where ongoing help matters even if the crisis point has passed. Keep asking. Keep changing what you ask for as needs change.",
        },
      ],
    },
    feelsHardIntro:
      "Eight months in, connection is often deep and daily life is often full.",
    feelsHard: [
      "Your baby wants only you, and you sometimes want a few minutes to yourself.",
      "Sleep has wobbled again just as you thought it was settling.",
      "Meals are messy, slow and often thrown on the floor.",
      "You feel worn thin between everyone else's needs and your own.",
    ],
    whatHelpsIntro:
      "Small acts, done kindly for yourself, are not selfish. They are how you keep going.",
    whatHelps: [
      "A regular short window that is only for you, however small.",
      "Naming what is hard out loud to someone who really listens.",
      "Keeping mealtimes and bedtimes low pressure during wobbles.",
      "Continuing to ask about anything in your body or mind that has been ignored.",
    ],
    support: [
      {
        when: "Any time",
        body: "Low mood, anxiety or intrusive thoughts that are not lifting. Please talk to your GP or health visitor.",
      },
      {
        when: "Same day",
        body: "A baby who is much less interested in feeds, is unusually sleepy, or has a very high or low temperature. Contact your GP, health visitor or NHS 111.",
      },
      {
        when: "Urgent",
        body: "Choking that does not clear, a very unwell looking baby, or a very difficult to rouse baby. Call 999 or go straight to A&E.",
      },
    ],
    questions: [
      {
        question: "Why has my baby suddenly become clingy?",
        answer:
          "Separation anxiety often begins around this age and is a sign of secure attachment. Slow goodbyes, familiar comfort objects and warm reunions all help.",
        readMore: {
          label: "Read: baby development in the first year",
          href: "/first-year/development/baby-development-in-the-first-year",
        },
        askTopic: "separation-anxiety",
      },
      {
        question: "How do I keep finger foods safe?",
        answer:
          "Cut foods to reduce choking risk. Avoid whole nuts, whole grapes, cherry tomatoes and other high risk shapes. Stay with your baby during meals. Learning basic paediatric first aid is worth the time if you can.",
        readMore: {
          label: "Read: safe sleep and home safety",
          href: "/first-year/care-and-safety/safe-sleep-and-home-safety",
        },
        askTopic: "finger-food-safety",
      },
      {
        question: "Sleep has got harder again, what is going on?",
        answer:
          "Separation feelings, new mobility and teeth can all disrupt sleep in this window. Keeping basics steady and offering extra reassurance usually helps.",
        readMore: {
          label: "Read: helping your baby settle",
          href: "/first-year/sleep/helping-your-baby-settle",
        },
        askTopic: "eight-month-sleep",
      },
      {
        question: "Is it ok to want time to myself?",
        answer:
          "Yes. Wanting a short window that is just yours is not a failure of love. Small acts of care for yourself keep you able to keep giving.",
        readMore: {
          label: "Read: feeling like yourself again",
          href: "/first-year/emotional-wellbeing/feeling-like-yourself-again",
        },
        askTopic: "time-for-yourself",
      },
    ],
    related: [
      { label: "Baby development in the first year", kicker: "Development", href: "/first-year/development/baby-development-in-the-first-year" },
      { label: "Safe sleep and home safety", kicker: "Care and safety", href: "/first-year/care-and-safety/safe-sleep-and-home-safety" },
      { label: "Feeling like yourself again", kicker: "Emotional wellbeing", href: "/first-year/emotional-wellbeing/feeling-like-yourself-again" },
    ],
    sources: [
      { label: "Your baby at 7 to 9 months", publisher: "NHS Start for Life", url: "https://www.nhs.uk/start-for-life/baby/baby-development/7-9-months/" },
      { label: "Your baby's first solid foods", publisher: "NHS", url: "https://www.nhs.uk/conditions/baby/weaning-and-feeding/babys-first-solid-foods/" },
      { label: "Foods to avoid giving babies and young children", publisher: "NHS", url: "https://www.nhs.uk/conditions/baby/weaning-and-feeding/foods-to-avoid-giving-babies-and-young-children/" },
      { label: "Baby sleep tips", publisher: "NHS", url: "https://www.nhs.uk/conditions/baby/caring-for-a-newborn/helping-your-baby-to-sleep/" },
      { label: "Safer sleep advice", publisher: "The Lullaby Trust", url: "https://www.lullabytrust.org.uk/safer-sleep-advice/" },
    ],
    seo: {
      title: "8 month old baby guide | The Start of You",
      description:
        "A gentle guide to your baby at 8 months. Early movement, separation anxiety, finger foods and how you may be feeling as connection deepens.",
    },
  },

  "9-months": {
    slug: "9-months",
    label: "9 months",
    title: "9 months old: moving, watching, holding on",
    standfirst:
      "By nine months, many babies are moving in their own way, watching everything you do and asking to be near you when the world feels big. This guide covers early movement, growing communication, separation feelings, feeding and sleep, and how you may be feeling as fatigue and pride sit side by side.",
    phase: PHASE_9_12,
    shortVersion: {
      baby: "Moving in some way. Copying and watching closely. Clear preferences for people. Often noisier and more expressive.",
      feeding: "Three meals a day for many babies with milk still important. Wider range of textures usually going well.",
      sleep: "Often still disrupted. Separation feelings and new skills can affect nights and naps.",
      you: "Tiredness may feel deep. Small pockets of you time and honest conversations both help.",
      whenToAsk: "No movement of any kind, no response to sounds or their name, feeding refusal for days, or a baby who is unusually floppy or unwell.",
    },
    babyEditorial: {
      intro:
        "Nine months often feels like a step change. Your baby may be crawling, shuffling or rolling with purpose, and their world is widening. They are also holding on to you a little tighter as they realise how big everything is.",
      subsections: [
        {
          heading: "Moving in their own way",
          body:
            "Crawling, commando crawling, shuffling on their bottom or rolling with intent are all ways of getting around at this age. Some babies pull to stand at the sofa. All of these are typical, and there is no single right pattern.",
        },
        {
          heading: "Standing attempts",
          body:
            "Many babies try to pull up on low furniture, then look surprised at how tall the world feels. Steady, low surfaces and a clear floor space help. Sitting back down often comes later than getting up.",
        },
        {
          heading: "Stronger communication",
          body:
            "Babbling can sound more like conversation now. Some babies use gestures, point at things they want, or copy simple sounds. Responding calmly, even when you cannot tell what they mean, is doing plenty.",
        },
        {
          heading: "Separation anxiety",
          body:
            "Around this age, many babies protest when you leave the room or when someone unfamiliar holds them. This is a sign of secure attachment. Warm, short goodbyes and calm reunions usually help more than long explanations.",
        },
        {
          heading: "Food exploration",
          body:
            "Many babies enjoy trying new textures, tastes and finger foods at nine months. Some are fussier. Offering without pressure, and eating alongside your baby when you can, tends to help more than coaxing.",
        },
        {
          heading: "Sleep changes",
          body:
            "New skills, teeth and separation feelings can all wobble sleep for a while. Keeping the basics steady, and giving any new approach a couple of weeks, is often more useful than a sudden change.",
        },
        {
          heading: "Growing personality",
          body:
            "You may notice clear favourites, funny reactions and small games your baby wants to play again and again. Enjoyment is not a distraction from development. It is development.",
        },
      ],
    },
    feedingSection: {
      intro:
        "Meals at nine months often feel more established, though appetite can vary from day to day. Milk continues to be an important part of the daily intake.",
      points: [
        "Three meals a day works well for many babies now, sometimes with a small snack.",
        "A mix of soft finger foods and offered spoons lets your baby practise skills.",
        "Cut food to reduce choking risk. Avoid whole nuts, whole grapes, cherry tomatoes and hard raw pieces.",
        "Milk continues to be important. Breast, formula or a combination all fit here.",
        "It is normal for appetite to change from day to day. Trust the pattern over the week, not each meal.",
      ],
      whenToAsk:
        "Ask your health visitor or GP if your baby refuses all solids for weeks, is not gaining weight, or you are worried about swallowing.",
    },
    sleepSection: {
      intro:
        "Sleep at nine months can wobble as new skills and feelings arrive. Steady basics and gentle reassurance usually help most.",
      points: [
        "Practising new skills in the day, safely on the floor, can settle some of the night restlessness.",
        "Most babies still have two naps around now, though timings may be shifting.",
        "Reassurance during separation feelings is not a bad habit. It is what your baby needs from you.",
        "If you change your approach, give it a week or two before deciding whether it is helping.",
      ],
      safeSleep:
        "Continue back sleeping in a clear cot with a firm mattress and no cot bumpers, pillows or loose bedding. Once your baby can pull up in the cot, lower the mattress and remove anything they could climb on.",
      whenToAsk:
        "Ask for a review if your baby is much less interested in feeds, is unusually sleepy, or has fast or grunting breathing.",
    },
    youEditorial: {
      intro:
        "Nine months in, you may feel proud and worn out in the same breath. Both can be true, and neither cancels the other out.",
      subsections: [
        {
          heading: "The long tiredness",
          body:
            "This is not the sharp exhaustion of the newborn weeks. It is a slower kind of tired that can creep up on any given day. Naming it, even to yourself, matters.",
        },
        {
          heading: "Comparison pressure",
          body:
            "Other babies, other families and quick comments online can all leave a mark. Your baby is on their own path. What they need most is the person they already have.",
        },
        {
          heading: "Confidence growing",
          body:
            "After nine months of knowing your baby, you are almost certainly reading them better than any book. Trust that as data.",
        },
        {
          heading: "Small pockets of you",
          body:
            "A shower without a listener, a slow cup of tea, a short walk on your own. These small pockets keep you able to keep giving.",
        },
      ],
    },
    feelsHardIntro:
      "Nine months in, life is often full and love is heavy in the best and hardest ways.",
    feelsHard: [
      "Your baby wants only you and you are quietly running low.",
      "Every parent around you seems to be doing something different.",
      "Sleep has wobbled again just as you thought it was steadier.",
      "You are proud of your baby and tired of yourself at the same time.",
    ],
    whatHelpsIntro:
      "Small, kind moves for yourself and your baby are often enough here.",
    whatHelps: [
      "A regular short window that is only yours, however small.",
      "Slow goodbyes and calm reunions when you have to leave the room.",
      "Sharing what is hard with one person who really listens.",
      "Muting or unfollowing accounts that leave you comparing.",
    ],
    support: [
      {
        when: "Any time",
        body: "Low mood, anxiety or intrusive thoughts that are not lifting. Please talk to your GP or health visitor.",
      },
      {
        when: "Same day",
        body: "A baby who is much less interested in feeds, is unusually sleepy, or has a very high or low temperature. Contact your GP, health visitor or NHS 111.",
      },
      {
        when: "Urgent",
        body: "Choking that does not clear, a very unwell looking baby, or a very difficult to rouse baby. Call 999 or go straight to A&E.",
      },
    ],
    questions: [
      {
        question: "My baby is not crawling yet, should I worry?",
        answer:
          "Many babies find their own way of moving before or instead of crawling, and there is a wide typical range. Do speak to your health visitor if your baby is not moving in any way, or if you have wider concerns about their development.",
        readMore: {
          label: "Read: when milestones feel uneven",
          href: "/first-year/development/when-milestones-feel-uneven",
        },
        askTopic: "movement-at-nine-months",
      },
      {
        question: "Why is my baby suddenly clingy again?",
        answer:
          "Separation feelings often peak around this age and can come and go for months. It is a sign your baby feels most safe with you. Warm goodbyes, familiar comfort objects and calm reunions usually help.",
        readMore: {
          label: "Read: baby development in the first year",
          href: "/first-year/development/baby-development-in-the-first-year",
        },
        askTopic: "separation-anxiety",
      },
      {
        question: "How much milk should my baby be having now?",
        answer:
          "Most babies still need a good amount of milk at nine months alongside solid meals. Exact amounts vary. If you are worried about intake or weight gain, your health visitor can help you look at the whole picture.",
        readMore: {
          label: "Read: bottle and breastfeeding questions",
          href: "/first-year/feeding/bottle-and-breastfeeding-questions",
        },
        askTopic: "milk-at-nine-months",
      },
      {
        question: "How can I stop comparing my baby to others?",
        answer:
          "Comparison is normal and it is hard to switch off. Muting accounts that leave you feeling low, and remembering that development is uneven for almost every child, both help. Your baby is not behind for being themselves.",
        readMore: {
          label: "Read: when milestones feel uneven",
          href: "/first-year/development/when-milestones-feel-uneven",
        },
        askTopic: "comparison-pressure",
      },
      {
        question: "Is it ok that I am so tired all the time?",
        answer:
          "It is very common to feel a long, slow tiredness this deep into the year. Small pockets of rest, honest conversations with people close to you, and asking your GP or health visitor if it feels heavier than tiredness all matter.",
        readMore: {
          label: "Read: when parenthood feels heavy",
          href: "/first-year/emotional-wellbeing/when-parenthood-feels-heavy",
        },
        askTopic: "parent-fatigue",
      },
    ],
    related: [
      { label: "When milestones feel uneven", kicker: "Development", href: "/first-year/development/when-milestones-feel-uneven" },
      { label: "Baby development in the first year", kicker: "Development", href: "/first-year/development/baby-development-in-the-first-year" },
      { label: "Helping your baby settle", kicker: "Sleep", href: "/first-year/sleep/helping-your-baby-settle" },
    ],
    sources: [
      { label: "Your baby at 7 to 9 months", publisher: "NHS Start for Life", url: "https://www.nhs.uk/start-for-life/baby/baby-development/7-9-months/" },
      { label: "Your baby's first solid foods", publisher: "NHS", url: "https://www.nhs.uk/conditions/baby/weaning-and-feeding/babys-first-solid-foods/" },
      { label: "Baby sleep tips", publisher: "NHS", url: "https://www.nhs.uk/conditions/baby/caring-for-a-newborn/helping-your-baby-to-sleep/" },
      { label: "Safer sleep advice", publisher: "The Lullaby Trust", url: "https://www.lullabytrust.org.uk/safer-sleep-advice/" },
      { label: "Feelings and relationships after having a baby", publisher: "NHS", url: "https://www.nhs.uk/conditions/baby/support-and-services/feelings-relationships-mental-health/" },
    ],
    seo: {
      title: "9 month old baby guide | The Start of You",
      description:
        "A calm guide to your baby at 9 months. Early movement, separation anxiety, feeding, sleep and how you may be feeling as tiredness and pride sit side by side.",
    },
  },

  "10-months": {
    slug: "10-months",
    label: "10 months",
    title: "10 months old: pulling up and reaching further",
    standfirst:
      "By ten months, many babies are pulling up, cruising along low furniture and letting you know exactly what they want. This guide covers early cruising, finger foods, strong preferences, routines under pressure and the mental load of parenting as work or childcare often shift.",
    phase: PHASE_9_12,
    shortVersion: {
      baby: "Pulling up, cruising, exploring with intent. Clear preferences and reactions. Copying sounds and actions.",
      feeding: "Enjoying more finger foods, self feeding often preferred. Milk continues to matter.",
      sleep: "Often still uneven. New skills, teeth and change can affect nights.",
      you: "Mental load may feel heavier again. Sharing it and asking for what you need matters.",
      whenToAsk: "Persistent feeding refusal, no response to sounds or name, or a baby who is unusually floppy or unwell.",
    },
    babyEditorial: {
      intro:
        "Ten months often feels busier than nine. Your baby has an opinion about most things, moves with more purpose and probably has favourite people, songs and games.",
      subsections: [
        {
          heading: "Pulling up",
          body:
            "Low sofas, coffee tables and cot bars all become useful. Once your baby is pulling up, home safety is worth another look. Lower the cot mattress and check any furniture that could tip.",
        },
        {
          heading: "Early cruising",
          body:
            "Some babies start to step sideways while holding on to furniture. This is a normal step before independent walking. There is no rush. Cruising can go on for weeks or months.",
        },
        {
          heading: "Finger foods",
          body:
            "Many babies love feeding themselves at this age. Soft, easy to hold pieces work well. Cut food to reduce choking risk and stay with your baby during meals.",
        },
        {
          heading: "Strong preferences",
          body:
            "Favourite toys, songs and people are often clear. Objections are clear too. This is not defiance. It is your baby noticing what they like and telling you.",
        },
        {
          heading: "Routines under pressure",
          body:
            "Ten months can be when work, childcare or family visits reshape the day. Some flexibility helps, but a broadly steady rhythm of feeds, meals, naps and bedtime is a real anchor.",
        },
        {
          heading: "Copying you",
          body:
            "Waves, claps, splashes and little sounds may all be copied back. This is early communication as much as it is play.",
        },
        {
          heading: "Sleep is still uneven",
          body:
            "New skills and change often show up in sleep first. Reassurance, safe sleep basics and time usually help more than sudden overhauls.",
        },
      ],
    },
    feedingSection: {
      intro:
        "Meals at ten months are often bigger, more independent and less predictable in appetite. Milk still matters, and food is a real part of the day.",
      points: [
        "Three meals with a small snack works well for many babies now.",
        "Offer a mix of finger foods and family food adapted for babies. Watch salt, sugar and choking hazards.",
        "Let your baby have some control over what they pick up. It builds skill and interest.",
        "Milk feeds usually stay important. Some babies drop one feed around now, most do not yet.",
        "Refusing a food today does not mean forever. Keep offering without pressure.",
      ],
      whenToAsk:
        "Ask your health visitor if your baby refuses all solids for weeks, is not gaining weight, or if you are worried about swallowing or reactions to food.",
    },
    sleepSection: {
      intro:
        "Sleep at ten months can still be broken. New skills, big feelings and any change in routine often show up here first.",
      points: [
        "Two naps is common. Some babies start to hold on longer between them.",
        "Bedtimes benefit from a short, calm wind down, even ten minutes.",
        "New standing skills can lead to wakes. Practising sitting back down in the day can help.",
        "Try to hold changes lightly. Sleep almost always shifts again in the next month or two.",
      ],
      safeSleep:
        "Keep the cot clear and the mattress low if your baby is pulling to stand. Continue back sleeping. Remove anything they could climb on or pull into the cot.",
      whenToAsk:
        "Ask for a review if your baby is much less interested in feeds, is unusually sleepy, or has fast or grunting breathing.",
    },
    youEditorial: {
      intro:
        "Ten months in, life often shifts around you. Work, childcare and identity questions may all sit on top of the baby days.",
      subsections: [
        {
          heading: "The mental load",
          body:
            "The invisible planning, remembering and worrying can feel bigger now that everyone else is asking you to keep more plates spinning. Naming it out loud, even in a short conversation, is often the first step.",
        },
        {
          heading: "Returning to work or childcare",
          body:
            "Whether you are heading back to work, using childcare, or shifting how the days are shared at home, this can bring grief, relief and everything in between. All of it is allowed.",
        },
        {
          heading: "Home safety",
          body:
            "As your baby moves and climbs more, another slow lap of the house is worth it. Corners, hot drinks, stairs, cords and small choking hazards are usually the main areas to look at.",
        },
        {
          heading: "Small things for you",
          body:
            "Water, protein, a short walk, five minutes off your phone. These are not luxuries at ten months. They are how you keep going.",
        },
      ],
    },
    feelsHardIntro:
      "Ten months in, the load is often less obvious to others and just as real.",
    feelsHard: [
      "You are the invisible engine of everyone else's day.",
      "Returning to work or childcare stirs up feelings you did not expect.",
      "Your baby is on the move and the house feels less safe than it was.",
      "You have not felt fully rested in a long time.",
    ],
    whatHelpsIntro:
      "The right kind of help is specific. Naming it makes it easier to ask for.",
    whatHelps: [
      "One clear ask to your partner, family or friend this week.",
      "One thing on your list you consciously drop or delay.",
      "Ten minutes of low input time, off screens, most days.",
      "Talking to your GP or health visitor if the tiredness feels heavier than tiredness.",
    ],
    support: [
      {
        when: "Any time",
        body: "Low mood, anxiety, or feeling detached from your baby that is not lifting. Please talk to your GP or health visitor.",
      },
      {
        when: "Same day",
        body: "A baby who is much less interested in feeds, is unusually sleepy, or has a very high or low temperature. Contact your GP, health visitor or NHS 111.",
      },
      {
        when: "Urgent",
        body: "Choking that does not clear, a very unwell looking baby, a fall from height, or a very difficult to rouse baby. Call 999 or go straight to A&E.",
      },
    ],
    questions: [
      {
        question: "My baby is pulling up, do I need to change the cot?",
        answer:
          "Once your baby can pull to stand in the cot, it is time to lower the mattress and remove anything they could climb on. Keep the cot clear and the room set up for their new reach.",
        readMore: {
          label: "Read: safe sleep and home safety",
          href: "/first-year/care-and-safety/safe-sleep-and-home-safety",
        },
        askTopic: "cot-safety",
      },
      {
        question: "Is it ok that my baby is very fussy with food?",
        answer:
          "Strong preferences at this age are common. Keep offering a range of foods without pressure, eat with your baby when you can, and remember appetite varies a lot day to day.",
        readMore: {
          label: "Read: bottle and breastfeeding questions",
          href: "/first-year/feeding/bottle-and-breastfeeding-questions",
        },
        askTopic: "fussy-eating",
      },
      {
        question: "How can I make going back to work easier?",
        answer:
          "Gentle handovers, familiar comfort objects, and steady goodbyes and reunions all help. So does giving yourself permission to feel more than one thing about it. Your baby can be safe and loved in more than one pair of hands.",
        readMore: {
          label: "Read: when parenthood feels heavy",
          href: "/first-year/emotional-wellbeing/when-parenthood-feels-heavy",
        },
        askTopic: "returning-to-work",
      },
      {
        question: "Why does sleep still feel so hard at ten months?",
        answer:
          "Sleep at this age is often affected by new skills, change and separation feelings. Keeping basics steady and offering reassurance usually helps more than sudden overhauls.",
        readMore: {
          label: "Read: helping your baby settle",
          href: "/first-year/sleep/helping-your-baby-settle",
        },
        askTopic: "ten-month-sleep",
      },
      {
        question: "How do I ask for more help without feeling guilty?",
        answer:
          "Being specific helps. A named task, a set time, a clear ask. You are not a burden for having needs at ten months in. You are a person doing important work.",
        askTopic: "asking-for-help",
      },
    ],
    related: [
      { label: "Safe sleep and home safety", kicker: "Care and safety", href: "/first-year/care-and-safety/safe-sleep-and-home-safety" },
      { label: "Postpartum recovery in the later first year", kicker: "Recovery", href: "/first-year/postpartum-recovery/postpartum-recovery-in-the-later-first-year" },
      { label: "When parenthood feels heavy", kicker: "Emotional wellbeing", href: "/first-year/emotional-wellbeing/when-parenthood-feels-heavy" },
      { label: "Baby development in the first year", kicker: "Development", href: "/first-year/development/baby-development-in-the-first-year" },
    ],
    sources: [
      { label: "Your baby at 10 to 12 months", publisher: "NHS Start for Life", url: "https://www.nhs.uk/start-for-life/baby/baby-development/10-12-months/" },
      { label: "Your baby's first solid foods", publisher: "NHS", url: "https://www.nhs.uk/conditions/baby/weaning-and-feeding/babys-first-solid-foods/" },
      { label: "Baby safety in the home", publisher: "NHS", url: "https://www.nhs.uk/conditions/baby/babys-development/safety/baby-accidents-safety/" },
      { label: "Safer sleep advice", publisher: "The Lullaby Trust", url: "https://www.lullabytrust.org.uk/safer-sleep-advice/" },
    ],
    seo: {
      title: "10 month old baby guide | The Start of You",
      description:
        "A gentle guide to your baby at 10 months. Pulling up, cruising, finger foods, sleep changes and the mental load as life reshapes around a busier baby.",
    },
  },

  "11-months": {
    slug: "11-months",
    label: "11 months",
    title: "11 months old: nearly a year of you both",
    standfirst:
      "At eleven months, many babies are cruising, communicating in their own way and pushing gently at what independence feels like. This guide covers walking readiness, sleep and nap transitions, first birthday feelings and how to hold on to yourself as the year begins to close.",
    phase: PHASE_9_12,
    shortVersion: {
      baby: "Confident on the move in their own way. Copying, pointing and using early words or sounds for many.",
      feeding: "Fully into family food for most. Milk still matters. Preferences are strong.",
      sleep: "Often uneven. Nap transitions may begin. First-year sleep is rarely linear.",
      you: "Big feelings about the first year can arrive alongside the everyday load.",
      whenToAsk: "No response to sounds or name, no purposeful movement of any kind, or a baby who is unusually floppy or unwell.",
    },
    babyEditorial: {
      intro:
        "Eleven months is a bridge month. You can see the year behind you and the toddler days coming closer. Your baby is more themselves than ever, and still very much needing you.",
      subsections: [
        {
          heading: "More independence",
          body:
            "Some babies want to feed themselves, choose which book, decide when to be held. Small choices you can offer during the day, like which cup or which shoe, help their sense of agency.",
        },
        {
          heading: "Communication",
          body:
            "Babbling, pointing, waving and using early words or word-like sounds are all common. Responding as if they are talking to you, even when you cannot make out the meaning, is the right thing.",
        },
        {
          heading: "Frustration",
          body:
            "Wants outpacing skills often shows up as frustration. This is not bad behaviour. Naming what you think they want, staying close, and offering another way in usually helps more than a fix.",
        },
        {
          heading: "Walking readiness",
          body:
            "Some babies take first steps around now. Many do not walk until well into the second year. Both are fine. Barefoot time on safe floors supports foot strength.",
        },
        {
          heading: "Nap and sleep changes",
          body:
            "Some babies start to drop to one longer nap around now. Most do not yet. Night wakes are often part of the picture too. Watch your baby, not a chart.",
        },
        {
          heading: "First birthday planning",
          body:
            "Whatever you do or do not do for the first birthday is fine. Your baby will not remember it. Small, calm, familiar often works better than big, loud and lots.",
        },
      ],
    },
    feedingSection: {
      intro:
        "Meals at eleven months are often close to family food. Milk continues to matter, and appetite can vary a lot day to day.",
      points: [
        "Three meals a day with a snack works well for most babies.",
        "Adapting family meals with less salt and no added sugar is usually easier than separate cooking.",
        "Continue to avoid choking risks like whole nuts, whole grapes, cherry tomatoes and hard raw pieces.",
        "Milk feeds remain important. Cow's milk as a main drink is not usually recommended until twelve months.",
        "Refusal one week, love the next is very common. Keep offering.",
      ],
      whenToAsk:
        "Ask your health visitor or GP if your baby refuses all solids for weeks, is not gaining weight, or you are worried about swallowing or reactions to food.",
    },
    sleepSection: {
      intro:
        "Sleep at eleven months is rarely linear. New skills, teeth and nap changes can all show up here.",
      points: [
        "Some babies begin to drop to one nap. Most stay on two for now.",
        "Signs of a nap change include one nap getting shorter or bedtime shifting.",
        "Bedtime routines can stay short and simple. Predictability helps more than length.",
        "If you make a change, give it a couple of weeks before deciding whether it helped.",
      ],
      safeSleep:
        "Back sleeping, a clear cot with a firm mattress, and no loose bedding remain the basics. Once your baby is pulling to stand or cruising in the cot, keep the mattress low and the cot clear.",
      whenToAsk:
        "Ask for a review if your baby is much less interested in feeds, is unusually sleepy, or has fast or grunting breathing.",
    },
    youEditorial: {
      intro:
        "The first year has almost passed. It has been huge and quiet and hard and beautiful in turn. Your feelings about it deserve a little room.",
      subsections: [
        {
          heading: "Big feelings about the year",
          body:
            "Grief for the newborn you lost, pride at what you have grown into, and mixed feelings about what you have given up can all arrive at once. All of them are welcome here.",
        },
        {
          heading: "Not comparing timelines",
          body:
            "Other babies walking, talking or sleeping through the night is not a measure of you. Your baby is on their own timeline. So are you.",
        },
        {
          heading: "Parent emotion",
          body:
            "It is fine if you feel more today than you can hold. Small conversations, small walks, small honest sentences to someone safe all help.",
        },
        {
          heading: "Looking back a little",
          body:
            "It is fine to look back and be surprised at what you have carried. Recovery, feeding, sleep, work, relationships. It has all been happening at once.",
        },
      ],
    },
    feelsHardIntro:
      "Nearly a year in, tiredness and tenderness can both be at their peak.",
    feelsHard: [
      "Everyone is asking about the first birthday and you are not sure how to feel.",
      "Your baby is nearly not a baby and you are not sure who you are now.",
      "Sleep, feeding or moods have wobbled again.",
      "You have been quietly doing so much, for so long.",
    ],
    whatHelpsIntro:
      "Small, honest choices help more than trying to catch up with everyone else.",
    whatHelps: [
      "Talking to one person about how you actually feel about the year.",
      "Keeping the first birthday small and low pressure if that is what fits.",
      "Ten minutes on your own most days, in whatever shape you can find.",
      "Booking any of your own overdue checks or appointments.",
    ],
    support: [
      {
        when: "Any time",
        body: "Low mood, anxiety, or intrusive thoughts that are not lifting. Please talk to your GP or health visitor.",
      },
      {
        when: "Same day",
        body: "A baby who is much less interested in feeds, is unusually sleepy, or has a very high or low temperature. Contact your GP, health visitor or NHS 111.",
      },
      {
        when: "Urgent",
        body: "Choking that does not clear, a very unwell looking baby, a fall from height, or a very difficult to rouse baby. Call 999 or go straight to A&E.",
      },
    ],
    questions: [
      {
        question: "My baby is not walking yet, should I worry?",
        answer:
          "Many babies do not walk until well into the second year, and that is within the typical range. Do speak to your health visitor if your baby is not weight bearing at all or you have wider concerns about their movement.",
        readMore: {
          label: "Read: when milestones feel uneven",
          href: "/first-year/development/when-milestones-feel-uneven",
        },
        askTopic: "walking-readiness",
      },
      {
        question: "Should my baby be on one nap or two?",
        answer:
          "Most babies at eleven months are still on two naps, but some start to shift towards one longer nap. Watch your baby, not a chart. If one nap is getting shorter and bedtime is drifting, a change may be brewing.",
        readMore: {
          label: "Read: helping your baby settle",
          href: "/first-year/sleep/helping-your-baby-settle",
        },
        askTopic: "nap-transitions",
      },
      {
        question: "How should I handle the first birthday?",
        answer:
          "There is no right way. Small, quiet and familiar often works well for babies. Whatever fits your family is fine. Your baby will not remember the party, but they will feel the mood of the day.",
        askTopic: "first-birthday",
      },
      {
        question: "Why are my feelings so mixed right now?",
        answer:
          "The end of the first year can bring grief, pride, tiredness and love in the same afternoon. Mixed feelings are not a sign that something is wrong. They are honest.",
        readMore: {
          label: "Read: feeling like yourself again",
          href: "/first-year/emotional-wellbeing/feeling-like-yourself-again",
        },
        askTopic: "end-of-first-year",
      },
      {
        question: "When do I need to think about cow's milk?",
        answer:
          "Cow's milk as a main drink is not usually recommended until twelve months, though it can be used in cooking earlier. Ask your health visitor if you are unsure about your baby's specific situation.",
        askTopic: "cow-milk",
      },
    ],
    related: [
      { label: "Feeling like yourself again", kicker: "Emotional wellbeing", href: "/first-year/emotional-wellbeing/feeling-like-yourself-again" },
      { label: "When milestones feel uneven", kicker: "Development", href: "/first-year/development/when-milestones-feel-uneven" },
      { label: "Helping your baby settle", kicker: "Sleep", href: "/first-year/sleep/helping-your-baby-settle" },
    ],
    sources: [
      { label: "Your baby at 10 to 12 months", publisher: "NHS Start for Life", url: "https://www.nhs.uk/start-for-life/baby/baby-development/10-12-months/" },
      { label: "Drinks and cups for babies", publisher: "NHS", url: "https://www.nhs.uk/conditions/baby/weaning-and-feeding/drinks-and-cups-for-babies-and-young-children/" },
      { label: "Baby sleep tips", publisher: "NHS", url: "https://www.nhs.uk/conditions/baby/caring-for-a-newborn/helping-your-baby-to-sleep/" },
      { label: "Safer sleep advice", publisher: "The Lullaby Trust", url: "https://www.lullabytrust.org.uk/safer-sleep-advice/" },
    ],
    seo: {
      title: "11 month old baby guide | The Start of You",
      description:
        "A calm guide to your baby at 11 months. Walking readiness, nap transitions, first birthday feelings and how you may be feeling as the first year closes.",
    },
  },

  "12-months": {
    slug: "12-months",
    label: "12 months",
    title: "12 months old: the first birthday and beyond",
    standfirst:
      "A whole year. Your baby has grown, and so have you. This guide covers walking variation, feeding transitions, communication, safety and independence, and the identity shift of parenting a one year old while looking back on the first year.",
    phase: PHASE_9_12,
    shortVersion: {
      baby: "A year old and unmistakably themselves. Moving, communicating and exploring with real intent.",
      feeding: "Family food with adjustments. Cow's milk as a main drink can begin now for many babies. Milk feeds may change.",
      sleep: "Often still uneven. Nap changes and skill leaps continue.",
      you: "Identity shift is real. Looking back matters. So does looking after yourself.",
      whenToAsk: "No response to sounds or name, no purposeful movement of any kind, or a baby who is unusually floppy or unwell.",
    },
    babyEditorial: {
      intro:
        "Your baby is one. They may be walking, or nowhere near it. Chatting or quietly watching. Every path is normal. What matters most is who they are becoming, not what week they hit any single skill.",
      subsections: [
        {
          heading: "Walking variation",
          body:
            "Some one year olds take first steps around their birthday. Many do not walk until well into the second year. Both are within typical ranges. Barefoot time on safe floors supports development.",
        },
        {
          heading: "Feeding transition",
          body:
            "Family food with adjustments is usually the picture now. Cow's milk as a main drink can start around twelve months for many babies. Milk feeds may change or reduce, and that can bring feelings for both of you.",
        },
        {
          heading: "Sleep and routines",
          body:
            "Sleep is often still uneven at a year. Some babies are dropping to one nap. Steady routines, calm wind downs and reasonable expectations usually help more than sudden changes.",
        },
        {
          heading: "Communication",
          body:
            "Some one year olds have a few clear words, others babble expressively without recognisable words yet. Both are normal. Talking with your baby through the day supports language whatever the pace.",
        },
        {
          heading: "Safety and independence",
          body:
            "As your baby moves and reaches more, another sweep of the house is worth it. Stairs, hot drinks, cords, small choking hazards, sockets and heavy furniture are the usual areas to check again.",
        },
        {
          heading: "Big feelings",
          body:
            "Frustration, delight, joy and outrage can all appear in one hour. This is not you doing something wrong. It is your baby learning to have a mind of their own.",
        },
        {
          heading: "First health checks",
          body:
            "Many families have a health visitor review around now. It is a good time to raise anything that has felt off, from feeding to hearing to your own mood.",
        },
      ],
    },
    feedingSection: {
      intro:
        "At twelve months, most babies eat a version of family food, often three meals with snacks. Milk still plays a role, but the balance may be shifting.",
      points: [
        "Three meals with one or two small snacks a day suits many one year olds.",
        "Cow's milk as a main drink can usually start around this age. Continue breastfeeding for as long as it works for you both.",
        "Continue to watch salt, sugar and choking risks. Cut foods to reduce choking risk and stay with your baby during meals.",
        "Some babies want to feed themselves fully now. Slow, messy and imperfect is fine.",
        "Fluctuating appetite is very common. Trust the pattern over the week.",
      ],
      whenToAsk:
        "Ask your health visitor or GP if your baby refuses all solids for weeks, is not gaining weight, or you are worried about swallowing or reactions to food.",
    },
    sleepSection: {
      intro:
        "Sleep at twelve months is often steadier than a few months ago and can still wobble around skill leaps and change.",
      points: [
        "Some babies are on one long nap now. Most are still on two.",
        "A short, calm bedtime routine at a similar time each night helps most families.",
        "Night waking is still common. Reassurance is not spoiling.",
        "Any change works better slowly and consistently, not overnight.",
      ],
      safeSleep:
        "Back sleeping and a clear cot with a firm mattress remain the basics. If your baby is pulling up or climbing in the cot, keep the mattress low and the cot clear. Talk to your health visitor if you are considering moving to a different sleep space.",
      whenToAsk:
        "Ask for a review if your baby is much less interested in feeds, is unusually sleepy, or has fast or grunting breathing.",
    },
    youEditorial: {
      intro:
        "Being the parent of a one year old is a different chapter, even if the days still feel much like last week. It is worth pausing here.",
      subsections: [
        {
          heading: "Identity shift",
          body:
            "You have been a parent for a whole year. You are not the same person you were. Some of the changes are visible, most are not. Both count.",
        },
        {
          heading: "Looking back",
          body:
            "It is fine to look back at the first year with pride, grief, humour or all of them. Whatever you feel about the birth, feeding, sleep, work and your own body is allowed.",
        },
        {
          heading: "Your own care",
          body:
            "Any overdue checks, appointments, referrals or conversations are worth booking now. This includes your body, your mood and any ongoing pain, bleeding or leaking.",
        },
        {
          heading: "What next",
          body:
            "The toddler days do not start on the birthday. They ease in. Slow, kind pacing, for both of you, is still what fits.",
        },
      ],
    },
    feelsHardIntro:
      "The first year does not stop being big just because the calendar has turned.",
    feelsHard: [
      "You are proud of your baby and quietly grieving the newborn days.",
      "Milk feeding changes are stirring up more feelings than you expected.",
      "Everyone wants to celebrate and you feel closer to tears than cake.",
      "You still have not really been looked after this year.",
    ],
    whatHelpsIntro:
      "The most useful thing is often the smallest one you can actually do.",
    whatHelps: [
      "A conversation with someone who really listens about how the year has been.",
      "Booking any postnatal check, GP visit or referral you have put off.",
      "Keeping the first birthday small if that is what fits, without apology.",
      "Naming, quietly, what you are proud of in yourself this year.",
    ],
    support: [
      {
        when: "Any time",
        body: "Low mood, anxiety, or intrusive thoughts that are not lifting. Please talk to your GP or health visitor. It is not too late to raise something you have been carrying since birth.",
      },
      {
        when: "Same day",
        body: "A baby who is much less interested in feeds, is unusually sleepy, or has a very high or low temperature. Contact your GP, health visitor or NHS 111.",
      },
      {
        when: "Urgent",
        body: "Choking that does not clear, a very unwell looking baby, a fall from height, or a very difficult to rouse baby. Call 999 or go straight to A&E.",
      },
    ],
    questions: [
      {
        question: "My baby is a year and not walking, is this ok?",
        answer:
          "Many babies do not walk until well into the second year, and that is within the typical range. Do speak to your health visitor if your baby is not weight bearing at all or you have wider concerns about their movement.",
        readMore: {
          label: "Read: when milestones feel uneven",
          href: "/first-year/development/when-milestones-feel-uneven",
        },
        askTopic: "walking-at-twelve-months",
      },
      {
        question: "Can I stop breastfeeding or formula now?",
        answer:
          "You can begin to move to cow's milk as a main drink around this age if that fits your family. You can also carry on breastfeeding for as long as you both want to. There is no single right pattern.",
        readMore: {
          label: "Read: bottle and breastfeeding questions",
          href: "/first-year/feeding/bottle-and-breastfeeding-questions",
        },
        askTopic: "milk-transition",
      },
      {
        question: "Do I need to worry about how many words my baby has?",
        answer:
          "Language varies a lot at twelve months. Some babies have a few clear words, others none yet. Do speak to your health visitor if your baby is not babbling, responding to their name or turning to sounds.",
        readMore: {
          label: "Read: baby development in the first year",
          href: "/first-year/development/baby-development-in-the-first-year",
        },
        askTopic: "words-at-twelve-months",
      },
      {
        question: "The birthday feels heavier than I expected, is that normal?",
        answer:
          "Yes. The first birthday can bring up big feelings about the birth, the year and the person you have become. Mixed feelings are honest, not a warning sign.",
        readMore: {
          label: "Read: feeling like yourself again",
          href: "/first-year/emotional-wellbeing/feeling-like-yourself-again",
        },
        askTopic: "first-birthday-feelings",
      },
      {
        question: "Is it too late to raise something about my own recovery?",
        answer:
          "No. If something has been off since birth, from bleeding to leaking to mood, it is worth raising now. Your health matters as much as your baby's.",
        readMore: {
          label: "Read: body changes after birth",
          href: "/first-year/body-and-hormones/body-changes-after-birth",
        },
        askTopic: "own-recovery",
      },
    ],
    related: [
      { label: "Baby development in the first year", kicker: "Development", href: "/first-year/development/baby-development-in-the-first-year" },
      { label: "Body changes after birth", kicker: "Body and hormones", href: "/first-year/body-and-hormones/body-changes-after-birth" },
      { label: "Postpartum recovery in the later first year", kicker: "Recovery", href: "/first-year/postpartum-recovery/postpartum-recovery-in-the-later-first-year" },
      { label: "Feeling like yourself again", kicker: "Emotional wellbeing", href: "/first-year/emotional-wellbeing/feeling-like-yourself-again" },
    ],
    sources: [
      { label: "Your baby at 10 to 12 months", publisher: "NHS Start for Life", url: "https://www.nhs.uk/start-for-life/baby/baby-development/10-12-months/" },
      { label: "Drinks and cups for babies", publisher: "NHS", url: "https://www.nhs.uk/conditions/baby/weaning-and-feeding/drinks-and-cups-for-babies-and-young-children/" },
      { label: "Your baby's first solid foods", publisher: "NHS", url: "https://www.nhs.uk/conditions/baby/weaning-and-feeding/babys-first-solid-foods/" },
      { label: "Safer sleep advice", publisher: "The Lullaby Trust", url: "https://www.lullabytrust.org.uk/safer-sleep-advice/" },
      { label: "Feelings and relationships after having a baby", publisher: "NHS", url: "https://www.nhs.uk/conditions/baby/support-and-services/feelings-relationships-mental-health/" },
    ],
    seo: {
      title: "12 month old baby guide | The Start of You",
      description:
        "A gentle guide to your baby at 12 months. Walking variation, feeding transitions, first birthday feelings and the identity shift of parenting a one year old.",
    },
  },
};

export function getMonthGuide(slug: string): MonthGuide | undefined {
  return (firstYearMonths as Record<string, MonthGuide>)[slug];
}

export function getAdjacentMonths(slug: MonthSlug): {
  prev?: { slug: MonthSlug; label: string };
  next?: { slug: MonthSlug; label: string };
} {
  const idx = MONTH_ORDER.indexOf(slug);
  const prev = idx > 0 ? MONTH_ORDER[idx - 1] : undefined;
  const next = idx >= 0 && idx < MONTH_ORDER.length - 1 ? MONTH_ORDER[idx + 1] : undefined;
  return {
    prev: prev ? { slug: prev, label: firstYearMonths[prev].label } : undefined,
    next: next ? { slug: next, label: firstYearMonths[next].label } : undefined,
  };
}

// ---------------------------------------------------------------------------
// Month imagery (added in Phase 11.8a.2). Hosted on the Lovable CDN via asset
// pointers so the pages can load rich editorial photography without bloating
// the repo. Keeping this off the MonthGuide interface keeps the large content
// records untouched and lets us evolve imagery independently.
// ---------------------------------------------------------------------------
import newbornHero from "@/assets/first-year/months/first-year-newborn-hero.jpg.asset.json";
import newbornBaby from "@/assets/first-year/months/first-year-newborn-baby.jpg.asset.json";
import newbornParent from "@/assets/first-year/months/first-year-newborn-parent.jpg.asset.json";
import oneMonthHero from "@/assets/first-year/months/first-year-1-month-hero.jpg.asset.json";
import oneMonthBaby from "@/assets/first-year/months/first-year-1-month-baby.jpg.asset.json";
import oneMonthParent from "@/assets/first-year/months/first-year-1-month-parent.jpg.asset.json";
import twoMonthHero from "@/assets/first-year/months/first-year-2-month-hero.jpg.asset.json";
import twoMonthBaby from "@/assets/first-year/months/first-year-2-month-baby.jpg.asset.json";
import twoMonthParent from "@/assets/first-year/months/first-year-2-month-parent.jpg.asset.json";
import threeMonthHero from "@/assets/first-year/months/first-year-3-month-hero.jpg.asset.json";
import threeMonthBaby from "@/assets/first-year/months/first-year-3-month-baby.jpg.asset.json";
import threeMonthParent from "@/assets/first-year/months/first-year-3-month-parent.jpg.asset.json";
import fourMonthHero from "@/assets/first-year/months/first-year-4-month-hero.jpg.asset.json";
import fourMonthBaby from "@/assets/first-year/months/first-year-4-month-baby.jpg.asset.json";
import fourMonthParent from "@/assets/first-year/months/first-year-4-month-parent.jpg.asset.json";
import fiveMonthHero from "@/assets/first-year/months/first-year-5-month-hero.jpg.asset.json";
import fiveMonthBaby from "@/assets/first-year/months/first-year-5-month-baby.jpg.asset.json";
import fiveMonthParent from "@/assets/first-year/months/first-year-5-month-parent.jpg.asset.json";
import sixMonthHero from "@/assets/first-year/months/first-year-6-month-hero.jpg.asset.json";
import sixMonthBaby from "@/assets/first-year/months/first-year-6-month-baby.jpg.asset.json";
import sixMonthParent from "@/assets/first-year/months/first-year-6-month-parent.jpg.asset.json";
import sevenMonthHero from "@/assets/first-year/months/first-year-7-month-hero.jpg.asset.json";
import sevenMonthBaby from "@/assets/first-year/months/first-year-7-month-baby.jpg.asset.json";
import sevenMonthParent from "@/assets/first-year/months/first-year-7-month-parent.jpg.asset.json";
import eightMonthHero from "@/assets/first-year/months/first-year-8-month-hero.jpg.asset.json";
import eightMonthBaby from "@/assets/first-year/months/first-year-8-month-baby.jpg.asset.json";
import eightMonthParent from "@/assets/first-year/months/first-year-8-month-parent.jpg.asset.json";
import nineMonthHero from "@/assets/first-year/months/first-year-9-month-hero.jpg.asset.json";
import nineMonthBaby from "@/assets/first-year/months/first-year-9-month-baby.jpg.asset.json";
import nineMonthParent from "@/assets/first-year/months/first-year-9-month-parent.jpg.asset.json";
import tenMonthHero from "@/assets/first-year/months/first-year-10-month-hero.jpg.asset.json";
import tenMonthBaby from "@/assets/first-year/months/first-year-10-month-baby.jpg.asset.json";
import tenMonthParent from "@/assets/first-year/months/first-year-10-month-parent.jpg.asset.json";
import elevenMonthHero from "@/assets/first-year/months/first-year-11-month-hero.jpg.asset.json";
import elevenMonthBaby from "@/assets/first-year/months/first-year-11-month-baby.jpg.asset.json";
import elevenMonthParent from "@/assets/first-year/months/first-year-11-month-parent.jpg.asset.json";
import twelveMonthHero from "@/assets/first-year/months/first-year-12-month-hero.jpg.asset.json";
import twelveMonthBaby from "@/assets/first-year/months/first-year-12-month-baby.jpg.asset.json";
import twelveMonthParent from "@/assets/first-year/months/first-year-12-month-parent.jpg.asset.json";

export interface MonthImagery {
  hero: { src: string; alt: string };
  baby: { src: string; alt: string; caption: string };
  parent: { src: string; alt: string; caption: string };
}

export const firstYearMonthImages: Record<MonthSlug, MonthImagery> = {
  newborn: {
    hero: { src: newbornHero.url, alt: "A newborn wrapped in soft muslin, held gently in a parent's arms" },
    baby: { src: newbornBaby.url, alt: "A newborn's tiny hand reaching towards soft light", caption: "The world is new, and being near you is enough." },
    parent: { src: newbornParent.url, alt: "A warm mug of tea on a linen throw beside a folded muslin", caption: "Rest whenever you can, in whatever shape it comes." },
  },
  "1-month": {
    hero: { src: oneMonthHero.url, alt: "A parent holding a one month old baby close to their chest in soft home light" },
    baby: { src: oneMonthBaby.url, alt: "A one month old baby lying calmly on a cream blanket, gaze turned upward", caption: "Small moments of alert quiet begin to appear." },
    parent: { src: oneMonthParent.url, alt: "A parent sitting quietly with a muslin over their shoulder near a bright window", caption: "The days blur. Your feelings do too. Both are allowed." },
  },
  "2-months": {
    hero: { src: twoMonthHero.url, alt: "A two month old baby smiling softly on a play mat in a calm sunlit room" },
    baby: { src: twoMonthBaby.url, alt: "A baby on a soft mat, calm and settled during gentle tummy time", caption: "First real smiles arrive, quietly at first." },
    parent: { src: twoMonthParent.url, alt: "A parent resting near a Moses basket with a journal and warm drink", caption: "You are still recovering. That does not stop just because the days are longer." },
  },
  "3-months": {
    hero: { src: threeMonthHero.url, alt: "A three month old baby smiling up at a parent held gently upright in warm home light" },
    baby: { src: threeMonthBaby.url, alt: "A three month old baby holding a wooden ring toy during safe play", caption: "Head control steadies. Hands find toys. Days shape gently." },
    parent: { src: threeMonthParent.url, alt: "A parent preparing a pram cover, a small cardigan folded nearby", caption: "Getting out of the door counts as a full activity." },
  },
  "4-months": {
    hero: { src: fourMonthHero.url, alt: "A four month old baby smiling on a soft cream muslin in warm home light" },
    baby: { src: fourMonthBaby.url, alt: "A four month old baby reaching for a wooden ring during calm play", caption: "Hands find everything. The world is worth grabbing." },
    parent: { src: fourMonthParent.url, alt: "A parent's mug of tea and a folded muslin resting on a wooden kitchen counter", caption: "Rest counts, even when it looks like nothing." },
  },
  "5-months": {
    hero: { src: fiveMonthHero.url, alt: "A five month old baby held upright with steady head control in a bright, calm room" },
    baby: { src: fiveMonthBaby.url, alt: "A five month old baby grabbing a soft fabric toy during safe play", caption: "Stronger body, curious hands, a personality showing through." },
    parent: { src: fiveMonthParent.url, alt: "An open journal and a warm mug on a linen throw in soft daylight", caption: "Small rituals for yourself still matter now." },
  },
  "6-months": {
    hero: { src: sixMonthHero.url, alt: "A six month old baby sitting supported in a high chair with a small wooden spoon and cream bowl" },
    baby: { src: sixMonthBaby.url, alt: "A six month old baby exploring a soft vegetable stick on a wooden high chair tray", caption: "First tastes, tiny mouthfuls, a lot of learning." },
    parent: { src: sixMonthParent.url, alt: "A parent's water bottle, small notebook and folded muslin on a wooden kitchen counter", caption: "Half a year in, and you are still recovering." },
  },
  "7-months": {
    hero: { src: sevenMonthHero.url, alt: "A seven month old baby on hands and knees beginning to rock, a parent's steadying hand nearby" },
    baby: { src: sevenMonthBaby.url, alt: "A seven month old baby's hands exploring a small wooden block on a cream play mat", caption: "Every ordinary object is a lesson." },
    parent: { src: sevenMonthParent.url, alt: "An open journal, a phone face down and a warm mug on a linen throw in soft daylight", caption: "Naming the load is the first step to sharing it." },
  },
  "8-months": {
    hero: { src: eightMonthHero.url, alt: "An eight month old baby crawling on a cream rug in a bright living room while a parent watches nearby" },
    baby: { src: eightMonthBaby.url, alt: "An eight month old baby picking up a small piece of soft banana with a pincer grasp on a high chair tray", caption: "Small fingers, big skills, growing independence." },
    parent: { src: eightMonthParent.url, alt: "A parent's cardigan draped over the back of a chair with a small stack of baby books on a side table", caption: "Wanting a little space is not a failure of love." },
  },
  "9-months": {
    hero: { src: nineMonthHero.url, alt: "A nine month old baby crawling on a cream rug in a bright, calm home" },
    baby: { src: nineMonthBaby.url, alt: "A nine month old baby's small hand pushing up on a soft play mat", caption: "Moving in their own way, holding on to you." },
    parent: { src: nineMonthParent.url, alt: "A parent's soft cardigan on a chair with a warm mug and picture books nearby", caption: "Long tiredness is real. So is quiet pride." },
  },
  "10-months": {
    hero: { src: tenMonthHero.url, alt: "A ten month old baby pulling up to stand at a low sofa in a bright home" },
    baby: { src: tenMonthBaby.url, alt: "A ten month old baby cruising along a low wooden bench holding on with both hands", caption: "Standing, reaching, deciding." },
    parent: { src: tenMonthParent.url, alt: "A calm kitchen counter with a water bottle, notebook and folded muslin", caption: "Small, specific asks make room to keep going." },
  },
  "11-months": {
    hero: { src: elevenMonthHero.url, alt: "An eleven month old baby standing supported at a low wooden table in a sunlit room" },
    baby: { src: elevenMonthBaby.url, alt: "An eleven month old baby's hands holding a small wooden cup on a cream rug", caption: "Nearly a year of learning together." },
    parent: { src: elevenMonthParent.url, alt: "An open journal, warm mug and a small dried flower sprig on a linen throw", caption: "Big feelings about the year are welcome here." },
  },
  "12-months": {
    hero: { src: twelveMonthHero.url, alt: "A twelve month old baby taking a first tentative step while a parent's hand steadies gently" },
    baby: { src: twelveMonthBaby.url, alt: "A twelve month old baby's hands exploring a soft picture book on a cream rug", caption: "A whole year of you both." },
    parent: { src: twelveMonthParent.url, alt: "A folded linen shirt, warm cups of tea and a small photo album on a soft chair", caption: "Look back a little. It has been huge." },
  },
};

export function getMonthImagery(slug: MonthSlug): MonthImagery {
  return firstYearMonthImages[slug];
}
