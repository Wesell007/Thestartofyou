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
  | "8-months";

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
export const MONTH_ORDER: MonthSlug[] = ["newborn", "1-month", "2-months", "3-months"];

const PHASE_0_3 = { label: "0 to 3 months", href: "/first-year/0-3-months" };

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
};

export function getMonthImagery(slug: MonthSlug): MonthImagery {
  return firstYearMonthImages[slug];
}

