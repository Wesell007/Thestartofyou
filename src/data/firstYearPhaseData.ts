// First Year phase configs — premium bridge pages, not full hubs.
// Calm, focused, scannable. Baby and parent recovery balanced.

export type PhaseSlug = "0-3-months" | "3-6-months" | "6-9-months" | "9-12-months";

export type PhaseBullet = { label: string; body: string };
export type PhaseArticleLink = { label: string; href: string };
export type PhaseQuestion = {
  q: string;
  a: string;
  readMore?: PhaseArticleLink;
  askTopic?: string;
};
export type PhaseGuidance = { title: string; description: string };
export type PhaseRelated = { label: string; href: string };
export type PhaseFeelsHard = { label: string; body: string };
export type PhaseWhatHelps = { label: string; body: string };
export type PhaseSupport = { label: string; body: string; when?: string };
export type PhaseSource = { label: string; publisher: string; href: string };

export type PhaseConfig = {
  slug: PhaseSlug;
  ageRange: string;
  title: string;
  intro: string;
  ages: string[];
  babyChanges: PhaseBullet[];
  parentRecovery: PhaseBullet[];
  commonQuestions: PhaseQuestion[];
  featuredGuidance: PhaseGuidance[];
  relatedTopics: PhaseRelated[];
  heroImage?: string;
  heroObjectPosition?: string;
  editorial?: string;
  feelsHard?: PhaseFeelsHard[];
  whatHelps?: PhaseWhatHelps[];
  support?: PhaseSupport[];
  sources?: PhaseSource[];
};

// UK trusted-source allow-list (hub URLs only, no fabricated deep links)
const SRC = {
  nhsBaby: { publisher: "NHS", label: "Baby guide", href: "https://www.nhs.uk/baby/" },
  nhsPostnatal: {
    publisher: "NHS",
    label: "Your body after the birth",
    href: "https://www.nhs.uk/pregnancy/labour-and-birth/after-the-birth/your-body/",
  },
  nhsFeeding: {
    publisher: "NHS",
    label: "Feeding your baby",
    href: "https://www.nhs.uk/start-for-life/baby/feeding-your-baby/",
  },
  nhsWeaning: {
    publisher: "NHS Start for Life",
    label: "Weaning and first foods",
    href: "https://www.nhs.uk/start-for-life/baby/weaning/",
  },
  nhsMentalHealth: {
    publisher: "NHS",
    label: "Mental health and wellbeing after birth",
    href: "https://www.nhs.uk/pregnancy/keeping-well/mental-health/",
  },
  unicef: {
    publisher: "UNICEF UK Baby Friendly",
    label: "Feeding support and guidance",
    href: "https://www.unicef.org.uk/babyfriendly/baby-friendly-resources/",
  },
  lullaby: {
    publisher: "The Lullaby Trust",
    label: "Safer sleep advice",
    href: "https://www.lullabytrust.org.uk/safer-sleep-advice/",
  },
  tommysMH: {
    publisher: "Tommy's",
    label: "Mental wellbeing after birth",
    href: "https://www.tommys.org/pregnancy-information/im-pregnant/mental-wellbeing",
  },
  nct: {
    publisher: "NCT",
    label: "Life as a parent",
    href: "https://www.nct.org.uk/life-parent",
  },
  nctReturn: {
    publisher: "NCT",
    label: "Returning to work",
    href: "https://www.nct.org.uk/life-parent/work-and-childcare",
  },
  niceNG194: {
    publisher: "NICE NG194",
    label: "Postnatal care",
    href: "https://www.nice.org.uk/guidance/ng194",
  },
};

const phases: Record<PhaseSlug, PhaseConfig> = {
  "0-3-months": {
    slug: "0-3-months",
    ageRange: "0–3 months",
    title: "The first three months",
    intro:
      "The early weeks are intense and tender. Your baby is learning to feed, sleep and feel safe in the world, and you are recovering from birth while adjusting to a completely new shape of life.",
    ages: ["Newborn", "1 month", "2 months", "3 months"],
    heroImage: "firstyear-stage-0-3.jpg",
    heroObjectPosition: "center 38%",
    editorial:
      "The first three months are less about routines and more about survival, healing and learning your baby. Feeding, sleep and comfort take almost all of the day, and your body is still doing the quiet work of recovering from birth. It is a phase to be held, not conquered.",
    babyChanges: [
      { label: "Feeding", body: "Feeding patterns settle slowly. Cues, cluster feeds and frequent waking are all normal early on." },
      { label: "Sleep", body: "Short wake windows, irregular naps and night waking are typical. Day and night rhythms only begin to emerge." },
      { label: "Bonding and comfort", body: "Skin to skin, gentle voice and close holding all help your baby feel safe and regulate their body." },
      { label: "Senses and interaction", body: "Eye contact, quiet cooing and clearer social smiles emerge. Your face is your baby's favourite thing." },
      { label: "Early movement", body: "Reflexes, small head lifts during tummy time and a stronger grasp appear across these weeks." },
    ],
    parentRecovery: [
      { label: "Healing and bleeding", body: "Bleeding gradually changes and tenderness eases. Anything that feels heavier, more painful or unusual is worth flagging with your midwife or GP." },
      { label: "Feeding support", body: "Whichever way you feed, ask for help early rather than push through pain or worry alone. A midwife, health visitor or infant feeding team can help." },
      { label: "Mood and emotions", body: "Tearfulness and overwhelm are common. Persistent low mood, anxiety or intrusive thoughts deserve a calm conversation with your GP or health visitor." },
      { label: "Rest and support", body: "Real rest matters more than a tidy house. Lean on people and accept the small offers." },
      { label: "Identity shift", body: "Feeling like a different person is normal. Nothing is wrong with you for missing your old life while loving your baby." },
    ],
    commonQuestions: [
      {
        q: "Is this much waking really normal?",
        a: "Frequent waking in the early weeks is normal. Patterns shift gradually rather than on a schedule.",
        askTopic: "newborn-waking",
        readMore: { label: "Newborn sleep expectations", href: "/first-year/sleep/newborn-sleep-expectations" },
      },
      {
        q: "How do I know my baby is feeding enough?",
        a: "Steady weight gain, regular wet and dirty nappies and a settled period after feeds are reassuring signs. Speak to a midwife or health visitor if you are unsure.",
        askTopic: "feeding-enough",
        readMore: { label: "Newborn feeding rhythms", href: "/first-year/feeding/newborn-feeding-rhythms" },
      },
      {
        q: "When should I ask for help with recovery?",
        a: "Sooner than you think. Heavy bleeding, severe pain, fever, or feelings that frighten you all deserve a call to your GP, midwife or 111.",
        askTopic: "recovery-help",
        readMore: { label: "Healing after birth", href: "/first-year/postpartum-recovery/healing-after-birth" },
      },
      {
        q: "Why do I feel so different emotionally?",
        a: "Hormones, sleep loss and a huge identity shift all stack up. Baby blues usually ease within a couple of weeks. Anything more lasting is worth talking through.",
        askTopic: "emotions-early-weeks",
        readMore: { label: "When parenthood feels heavy", href: "/first-year/emotional-wellbeing/when-parenthood-feels-heavy" },
      },
      {
        q: "How much should I be doing each day?",
        a: "Very little. The first weeks are for healing and learning your baby, not for proving anything.",
        askTopic: "doing-enough",
      },
    ],
    feelsHard: [
      { label: "Sleep in fragments", body: "Broken sleep is disorienting and hard to describe to anyone who has not lived it." },
      { label: "Feeding uncertainty", body: "Wondering if your baby has had enough, or if feeding should hurt this much, is exhausting." },
      { label: "Feeling touched out", body: "Constant holding and feeding can leave you longing for your body to feel like your own." },
      { label: "Isolation", body: "Days can feel long and quiet, especially before you find your people or leave the house easily." },
      { label: "Not feeling like yourself", body: "Grief for your old life can sit alongside deep love for your baby. Both are true." },
    ],
    whatHelps: [
      { label: "Lower the bar", body: "One small thing a day is enough. Healing, feeding and holding your baby already count." },
      { label: "Accept help", body: "Say yes to meals, laundry and short visits. Ask people to hold the baby so you can shower or eat warm food." },
      { label: "Feed where you are supported", body: "Whether breast, bottle or mixed, get real support early. Local infant feeding teams and peer supporters are there for this." },
      { label: "Protect sleep in small ways", body: "Rest when you can, even without sleeping. Share nights where possible." },
      { label: "Name your feelings", body: "Saying it out loud to a trusted person, or a midwife or GP, is often the first thing that eases the weight." },
    ],
    support: [
      { label: "Midwife", body: "Your midwife looks after you and your baby for around the first ten to fourteen days, and can visit at home if needed.", when: "First two weeks" },
      { label: "Health visitor", body: "Your health visitor takes over from around ten to fourteen days. They can visit, weigh your baby and talk through feeding, sleep and how you are doing." },
      { label: "GP", body: "Contact your GP for persistent bleeding, pain, fever, feeding pain that is not settling, or low mood, anxiety or intrusive thoughts." },
      { label: "Urgent help", body: "Call 111 for advice out of hours. Call 999 or go to A&E for heavy bleeding, breathing difficulty, chest pain, a baby who is very floppy, unresponsive or has a high fever under three months." },
    ],
    sources: [SRC.nhsBaby, SRC.nhsPostnatal, SRC.unicef, SRC.lullaby, SRC.tommysMH],
    featuredGuidance: [
      { title: "What is normal in the first two weeks", description: "Bleeding, soreness, swings in mood and the rhythm of newborn feeds." },
      { title: "When to call your midwife or GP", description: "Calm, clear signs that something needs a closer look." },
      { title: "Feeding in the early weeks", description: "Support for breastfeeding, bottle feeding or a mix, without judgement." },
    ],
    relatedTopics: [
      { label: "Feeding", href: "/first-year/feeding" },
      { label: "Baby sleep", href: "/first-year/sleep" },
      { label: "Postpartum recovery", href: "/first-year/postpartum-recovery" },
      { label: "Emotional wellbeing", href: "/first-year/emotional-wellbeing" },
    ],
  },

  "3-6-months": {
    slug: "3-6-months",
    ageRange: "3–6 months",
    title: "Finding new rhythms",
    intro:
      "Your baby becomes more alert, interactive and expressive in this phase. You may feel energy returning unevenly as your body keeps recovering and routines slowly start to take shape.",
    ages: ["4 months", "5 months", "6 months"],
    heroImage: "firstyear-stage-3-6.jpg",
    heroObjectPosition: "center 42%",
    editorial:
      "This phase often feels like the first exhale. Your baby is more of a little person, and days start to have a shape. Confidence usually grows quietly, then gets tested again by a sleep change or a hard week, which is part of the pattern rather than a step back.",
    babyChanges: [
      { label: "Interaction", body: "Smiles, sounds and clearer responses. Your baby is learning that you respond, which builds trust." },
      { label: "Movement", body: "Rolling signs, stronger neck control and reaching for things. Floor time matters more than gear." },
      { label: "Sleep shifts", body: "Naps may consolidate, then change again. Wake windows lengthen but regressions are common." },
      { label: "Communication", body: "Babbling, squeals and eye-contact conversations grow. Responding warmly matters more than teaching." },
      { label: "First foods nearby", body: "Around six months most babies show readiness signs. There is no need to rush before that." },
    ],
    parentRecovery: [
      { label: "Hormones and energy", body: "Energy can return in waves rather than a straight line. Iron levels, sleep and feeding all play a part." },
      { label: "Body recovery", body: "Core, pelvic floor and posture often need gentle attention now, not just in the early weeks." },
      { label: "Mood and identity", body: "It is normal to feel both more like yourself and quite different. Both can be true at once." },
      { label: "Partner and support", body: "Roles at home often need renegotiating around this point. Honest conversations help more than fixing every problem alone." },
      { label: "Return to work thoughts", body: "Even months away, thinking about work or childcare can feel loaded. Give it real space rather than pushing it down." },
    ],
    commonQuestions: [
      {
        q: "Why has sleep suddenly got harder again?",
        a: "Sleep often shifts around developmental leaps. Most regressions ease within a few weeks.",
        askTopic: "sleep-regression",
        readMore: { label: "Helping your baby settle", href: "/first-year/sleep/helping-your-baby-settle" },
      },
      {
        q: "Is my baby ready for solids?",
        a: "Stable head control, sitting with support and showing interest in food are the usual signs. Your health visitor can help you judge readiness.",
        askTopic: "solids-readiness",
      },
      {
        q: "Why do I still feel so tired months in?",
        a: "Broken sleep stacks up, hormones are still shifting and the mental load is heavy. This is worth taking seriously, not pushing through alone.",
        askTopic: "still-tired",
        readMore: { label: "What recovery can feel like", href: "/first-year/postpartum-recovery/what-recovery-can-feel-like" },
      },
      {
        q: "When should I think about pelvic floor or core recovery?",
        a: "Now is a sensible time to seek a women's health physiotherapist if anything feels off, heavy or uncomfortable.",
        askTopic: "pelvic-floor-recovery",
        readMore: { label: "Body changes after birth", href: "/first-year/body-and-hormones/body-changes-after-birth" },
      },
      {
        q: "How do I know my baby is developing well?",
        a: "Health visitor reviews are designed for this. Trust your instincts and ask when something feels off.",
        askTopic: "development-check",
        readMore: { label: "Baby development in the first year", href: "/first-year/development/baby-development-in-the-first-year" },
      },
    ],
    feelsHard: [
      { label: "The unpredictable middle", body: "Just as things feel settled, something shifts. That is the shape of this phase rather than a personal failure." },
      { label: "Comparison creeps in", body: "Seeing other babies rolling, sleeping or eating can quietly sting. Your baby has their own timing." },
      { label: "Body feeling unfamiliar", body: "Clothes, energy and shape can all still feel unfamiliar. This deserves patience rather than pressure." },
      { label: "Mental load", body: "Appointments, feeds, laundry and life logistics can be relentless, especially if it is all falling to you." },
    ],
    whatHelps: [
      { label: "Small anchors, not strict routines", body: "One or two predictable points in the day are usually enough to help both of you." },
      { label: "Notice more, track less", body: "Watching your baby often tells you more than an app. Save tracking for anything you want to raise with a professional." },
      { label: "Move your body kindly", body: "Gentle walks and postnatal-safe movement help mood, sleep and recovery." },
      { label: "Share the load out loud", body: "Naming who is doing what, at home and with family, often changes more than trying harder alone." },
    ],
    support: [
      { label: "Health visitor", body: "Health visitor reviews around this age are a good moment to raise anything about your baby or you." },
      { label: "GP", body: "Contact your GP if low mood or anxiety has lingered, or if you have persistent physical symptoms such as pain, heavy periods or leaking." },
      { label: "Feeding support", body: "Local infant feeding teams and peer supporters can help with a wobble in feeding or with starting solids calmly." },
      { label: "Women's health physio", body: "Ask your GP for a referral, or seek a self-pay session, if your pelvic floor or core still feels off." },
    ],
    sources: [SRC.nhsBaby, SRC.nhsWeaning, SRC.nhsPostnatal, SRC.tommysMH, SRC.nct],
    featuredGuidance: [
      { title: "The four month sleep shift", description: "What is changing for your baby and what gentle adjustments help." },
      { title: "Getting ready for first foods", description: "Calm, practical signs of readiness without pressure." },
      { title: "Pelvic floor recovery, months in", description: "Why it still matters and how to ask for the right support." },
    ],
    relatedTopics: [
      { label: "Development", href: "/first-year/development" },
      { label: "Feeding", href: "/first-year/feeding" },
      { label: "Body and hormones", href: "/first-year/body-and-hormones" },
      { label: "Baby sleep", href: "/first-year/sleep" },
    ],
  },

  "6-9-months": {
    slug: "6-9-months",
    ageRange: "6–9 months",
    title: "Movement, curiosity and change",
    intro:
      "Your baby becomes more mobile and more curious, and the world starts to feel bigger to them. For you, ongoing recovery and shifting routines often run alongside this new pace.",
    ages: ["7 months", "8 months", "9 months"],
    heroImage: "firstyear-stage-6-9.jpg",
    heroObjectPosition: "center 40%",
    editorial:
      "Curiosity is the big story of this phase. Your baby wants to reach, touch and taste the world, and they want you close while they do it. It is often the phase where separation awareness, new tiredness and a fuller inner life for your baby all arrive together.",
    babyChanges: [
      { label: "Sitting and crawling signs", body: "Sitting steadily, rolling both ways and early scooting or crawling. Every baby finds their own route." },
      { label: "Feeding confidence", body: "More variety, more mess and clearer preferences. Milk still leads, food is a learning experience." },
      { label: "Separation awareness", body: "Clinginess and stranger awareness often appear. This is a sign of secure attachment, not regression." },
      { label: "Communication", body: "Babbling gets tuneful, gestures like reaching up appear, and your baby understands more than they can say." },
      { label: "Sleep and curiosity", body: "Naps may drop or shift and night waking can change with new skills." },
    ],
    parentRecovery: [
      { label: "Ongoing tiredness", body: "Months of broken sleep are real. Energy dips are not weakness and may need checking, not powering through." },
      { label: "Pelvic floor and core", body: "Lifting a heavier, wrigglier baby asks more of your body. Targeted support helps now." },
      { label: "Mood and identity", body: "Confidence often grows and then gets tested again. New worries are normal as your baby becomes more independent." },
      { label: "Relationships and support", body: "This is a common point for tension at home. Kind, direct conversations usually help more than silence." },
      { label: "Routines and balance", body: "Your baby's day changes quickly. Routines need permission to change with them." },
    ],
    commonQuestions: [
      {
        q: "Is my baby falling behind if they are not crawling?",
        a: "Many babies skip crawling or find their own way of moving. Health visitor reviews can reassure you and flag anything worth looking at.",
        askTopic: "not-crawling",
        readMore: { label: "When milestones feel uneven", href: "/first-year/development/when-milestones-feel-uneven" },
      },
      {
        q: "Why is my baby suddenly clingy?",
        a: "Separation awareness peaks in this phase. Gentle consistency and short, calm goodbyes help.",
        askTopic: "separation-anxiety",
      },
      {
        q: "Is it okay to still be breastfeeding through the night?",
        a: "Yes. There is no single right answer, only what works for your family and your wellbeing.",
        askTopic: "night-feeding",
        readMore: { label: "Bottle and breastfeeding questions", href: "/first-year/feeding/bottle-and-breastfeeding-questions" },
      },
      {
        q: "Why do I still feel low some days?",
        a: "Postnatal mood can shift later than people expect. If low mood lingers, please speak to your GP or health visitor.",
        askTopic: "low-mood-later",
        readMore: { label: "Feeling like yourself again", href: "/first-year/emotional-wellbeing/feeling-like-yourself-again" },
      },
      {
        q: "How do I keep our home safe as they move more?",
        a: "A simple safety pass at floor level usually shows what needs adjusting first.",
        askTopic: "home-safety",
        readMore: { label: "Safe sleep and home safety", href: "/first-year/care-and-safety/safe-sleep-and-home-safety" },
      },
    ],
    feelsHard: [
      { label: "New tiredness", body: "A more active baby often means more physical tiredness on top of ongoing broken sleep." },
      { label: "Never being alone", body: "Separation awareness can feel intense, especially if you are also touched out." },
      { label: "Weaning worries", body: "Mess, gagging and refused foods can rattle even a calm parent. Most of it is normal learning." },
      { label: "Comparison and pressure", body: "Social media rarely shows the ordinary version of this age. Your baby is not behind." },
    ],
    whatHelps: [
      { label: "Floor time over gear", body: "Safe floor space usually helps movement more than jumpers, walkers or bouncers." },
      { label: "Small, calm goodbyes", body: "Short, honest goodbyes and a warm hello back help separation anxiety more than sneaking off." },
      { label: "Offer, do not push", body: "With food and sleep, offering calmly and stepping back protects your baby's own signals." },
      { label: "Protect your own recovery", body: "Book the physio session, take the walk, ask for the hour off. It is not indulgence, it is maintenance." },
    ],
    support: [
      { label: "Health visitor", body: "Ask about the six to twelve month review, feeding, sleep and anything that has changed since you last spoke." },
      { label: "GP", body: "Contact your GP for persistent low mood, anxiety, pelvic floor symptoms, joint pain or heavy periods that are affecting your life." },
      { label: "Feeding support", body: "Local weaning support or infant feeding teams can help if starting solids feels harder than expected." },
      { label: "Urgent help", body: "Call 111 for out-of-hours advice. Call 999 for a baby who is very unwell, floppy, having difficulty breathing or has a rash that does not fade under pressure." },
    ],
    sources: [SRC.nhsBaby, SRC.nhsWeaning, SRC.nhsMentalHealth, SRC.tommysMH, SRC.nct],
    featuredGuidance: [
      { title: "Separation anxiety, kindly explained", description: "Why it appears now and how to support your baby without panic." },
      { title: "Sleep when everything is changing", description: "Calm ways to ride out shifts without overhauling everything." },
      { title: "Looking after a tired body", description: "Recovery does not stop at six weeks. Practical, gentle steps." },
    ],
    relatedTopics: [
      { label: "Development", href: "/first-year/development" },
      { label: "Care and safety", href: "/first-year/care-and-safety" },
      { label: "Emotional wellbeing", href: "/first-year/emotional-wellbeing" },
      { label: "Feeding", href: "/first-year/feeding" },
    ],
  },

  "9-12-months": {
    slug: "9-12-months",
    ageRange: "9–12 months",
    title: "Growing independence",
    intro:
      "Your baby moves toward their first birthday with more mobility, personality and opinions. You are likely thinking about longer term recovery, changing routines and what the next year looks like.",
    ages: ["10 months", "11 months", "12 months"],
    heroImage: "firstyear-stage-9-12.jpg",
    heroObjectPosition: "center 40%",
    editorial:
      "This phase often carries a quiet identity shift. Your baby is becoming a small person with clear preferences, and you are looking back at a year that changed you. First birthdays can feel joyful and tender at the same time, and both feelings deserve room.",
    babyChanges: [
      { label: "Mobility and safety", body: "Cruising, pulling up and early walking signs. Safety at home matters more than ever." },
      { label: "Communication", body: "First sounds, gestures and clear preferences. Personality really starts to show." },
      { label: "Mealtimes", body: "More foods, more textures and stronger opinions. Routine helps, perfection does not." },
      { label: "Play and connection", body: "Simple games, cause and effect toys and copying you all become favourites." },
      { label: "Toward toddlerhood", body: "Sleep, naps and emotions shift as your baby moves toward toddler life." },
    ],
    parentRecovery: [
      { label: "Longer term recovery", body: "Some things may still feel different a year on. That deserves attention, not dismissal." },
      { label: "Cycles and intimacy", body: "Periods, contraception and intimacy can all feel different. There is no right timeline." },
      { label: "Return to work or change", body: "Whether you return to work or change shape, this is a real transition for the whole family." },
      { label: "Identity beyond baby", body: "Reconnecting with parts of yourself that were paused is slow work, and it counts." },
      { label: "Confidence into year two", body: "You have learned more than you can name. Trust that, and keep asking for support when you need it." },
    ],
    commonQuestions: [
      {
        q: "When should my baby start walking?",
        a: "Most babies walk between roughly nine and eighteen months. There is a wide range of normal.",
        askTopic: "walking-age",
        readMore: { label: "When milestones feel uneven", href: "/first-year/development/when-milestones-feel-uneven" },
      },
      {
        q: "How do I move toward more solid meals?",
        a: "Offering a calm shared mealtime usually matters more than precise quantities. A health visitor can help if you are worried.",
        askTopic: "family-meals",
      },
      {
        q: "Is it normal that my body still does not feel like mine?",
        a: "Yes, and it is worth taking seriously. Women's health physios and your GP can help with what is still bothering you.",
        askTopic: "body-year-on",
        readMore: { label: "Hormones, sweat and hair loss", href: "/first-year/body-and-hormones/hormones-sweat-and-hair-loss" },
      },
      {
        q: "When is the right time to think about another baby?",
        a: "There is no universal answer. Your own recovery, energy and life all matter as much as timing.",
        askTopic: "another-baby",
      },
      {
        q: "Should I worry about a 12 month sleep regression?",
        a: "Sleep often shifts again around big developmental change. Gentle consistency usually carries you through.",
        askTopic: "twelve-month-sleep",
        readMore: { label: "Helping your baby settle", href: "/first-year/sleep/helping-your-baby-settle" },
      },
    ],
    feelsHard: [
      { label: "First birthday feelings", body: "Reaching one can bring pride, grief and pressure all at once. Nothing is wrong with any of it." },
      { label: "Returning to work", body: "Handovers, guilt, logistics and grieving the slower pace can all sit on top of each other." },
      { label: "Body still off", body: "It is common to still not feel like your old self physically. That is a reason to seek help, not shrug it off." },
      { label: "Comparison at parties and groups", body: "Milestone talk can quietly hurt. Your baby is on their own timeline." },
    ],
    whatHelps: [
      { label: "One safety pass at floor level", body: "Fifteen minutes on the floor usually shows most of what needs adjusting before your baby finds it." },
      { label: "Say yes to help around transitions", body: "Return to work, childcare starts and moves are heavier than they look. Extra hands help." },
      { label: "Book what you have been putting off", body: "Smear test, contraception review, physio, dentist. Small things unclench a year of putting yourself last." },
      { label: "Mark the year in your own way", body: "Not the big party version, just a moment that acknowledges what you both came through." },
    ],
    support: [
      { label: "Health visitor", body: "The nine to twelve month review is a natural moment to raise development, sleep, feeding or your own wellbeing." },
      { label: "GP", body: "Contact your GP for contraception, low mood or anxiety, ongoing pelvic floor or continence symptoms, or heavy or painful periods." },
      { label: "Women's health physio", body: "A dedicated session is worth it if any bodily symptom is still limiting how you move, exercise or rest." },
      { label: "Urgent help", body: "Call 111 for out-of-hours advice. Call 999 for serious injury, difficulty breathing, or a rash that does not fade under pressure." },
    ],
    sources: [SRC.nhsBaby, SRC.nhsPostnatal, SRC.nhsMentalHealth, SRC.nctReturn, SRC.niceNG194],
    featuredGuidance: [
      { title: "Recovery a year on", description: "What is still common, what is worth checking and how to ask for help." },
      { title: "Cycles, contraception and intimacy", description: "Honest, calm guidance for this stage of recovery." },
      { title: "Easing into toddlerhood", description: "Small shifts that help the move from baby to toddler feel softer." },
    ],
    relatedTopics: [
      { label: "Care and safety", href: "/first-year/care-and-safety" },
      { label: "Development", href: "/first-year/development" },
      { label: "Body and hormones", href: "/first-year/body-and-hormones" },
      { label: "Check-ups and warning signs", href: "/first-year/checkups-and-warning-signs" },
    ],
  },
};

export const phaseData = phases;
export const phaseOrder: PhaseSlug[] = ["0-3-months", "3-6-months", "6-9-months", "9-12-months"];
