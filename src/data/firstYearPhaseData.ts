// First Year phase configs — premium bridge pages, not full hubs.
// Calm, focused, scannable. Baby and parent recovery balanced.

export type PhaseSlug = "0-3-months" | "3-6-months" | "6-9-months" | "9-12-months";

export type PhaseBullet = { label: string; body: string };
export type PhaseQuestion = { q: string; a: string };
export type PhaseGuidance = { title: string; description: string };
export type PhaseRelated = { label: string; href: string };

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
    babyChanges: [
      { label: "Feeding", body: "Feeding patterns settle slowly. Cues, cluster feeds and frequent waking are all normal early on." },
      { label: "Sleep", body: "Short wake windows, irregular naps and night waking are typical. Day and night rhythms only begin to emerge." },
      { label: "Bonding and comfort", body: "Skin to skin, gentle voice and close holding all help your baby feel safe." },
      { label: "Early movement", body: "Reflexes, small head lifts during tummy time and growing eye contact appear in these weeks." },
    ],
    parentRecovery: [
      { label: "Healing and bleeding", body: "Bleeding gradually changes and tenderness eases. Pay attention to anything that feels heavier, more painful or unusual." },
      { label: "Feeding support", body: "Whichever way you feed, this is the time to ask for help early rather than push through pain or worry alone." },
      { label: "Mood and emotions", body: "Tearfulness, overwhelm and shifting feelings are common. Persistent low mood is worth flagging with a midwife, health visitor or GP." },
      { label: "Rest and support", body: "Real rest matters more than a tidy house. Lean on people, and accept the small offers." },
    ],
    commonQuestions: [
      { q: "Is this much waking really normal?", a: "Frequent waking in the early weeks is normal. Patterns shift gradually rather than on a schedule." },
      { q: "How do I know my baby is feeding enough?", a: "Steady weight gain, regular wet and dirty nappies and a settled period after feeds are reassuring signs. Speak to a midwife or health visitor if you are unsure." },
      { q: "When should I ask for help with recovery?", a: "Sooner than you think. Heavy bleeding, severe pain, fever, or feelings that frighten you all deserve a call to your GP, midwife or 111." },
      { q: "Why do I feel so different emotionally?", a: "Hormones, sleep loss and a huge identity shift all stack up. Baby blues usually ease within a couple of weeks. Anything more lasting is worth talking through." },
      { q: "How much should I be doing each day?", a: "Very little. The first weeks are for healing and learning your baby, not for proving anything." },
    ],
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
    babyChanges: [
      { label: "Interaction", body: "Smiles, sounds and clearer responses. Your baby is learning that you respond, which builds trust." },
      { label: "Movement", body: "Rolling signs, stronger neck control and reaching for things. Floor time matters more than gear." },
      { label: "Sleep shifts", body: "Naps may consolidate, then change again. Wake windows lengthen but regressions are common." },
      { label: "First foods nearby", body: "Around six months most babies show readiness signs. There is no need to rush before that." },
    ],
    parentRecovery: [
      { label: "Hormones and energy", body: "Energy can return in waves rather than a straight line. Iron levels, sleep and feeding all play a part." },
      { label: "Body recovery", body: "Core, pelvic floor and posture often need gentle attention now, not just in the early weeks." },
      { label: "Identity and feelings", body: "It is normal to feel both more like yourself and quite different. Both can be true at once." },
      { label: "Support and routines", body: "Routines change as your baby changes. Asking for help is still a sign of strength, not failure." },
    ],
    commonQuestions: [
      { q: "Why has sleep suddenly got harder again?", a: "Sleep often shifts around developmental leaps. Most regressions ease within a few weeks." },
      { q: "Is my baby ready for solids?", a: "Stable head control, sitting with support and showing interest in food are the usual signs. Your health visitor can help you judge readiness." },
      { q: "Why do I still feel so tired months in?", a: "Broken sleep stacks up, hormones are still shifting and the mental load is heavy. This is worth taking seriously, not pushing through alone." },
      { q: "When should I think about pelvic floor or core recovery?", a: "Now is a sensible time to seek a women's health physiotherapist if anything feels off, heavy or uncomfortable." },
      { q: "How do I know my baby is developing well?", a: "Health visitor reviews are designed for this. Trust your instincts and ask when something feels off." },
    ],
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
    babyChanges: [
      { label: "Sitting and crawling signs", body: "Sitting steadily, rolling both ways and early scooting or crawling. Every baby finds their own route." },
      { label: "Feeding confidence", body: "More variety, more mess and clearer preferences. Milk still leads, food is a learning experience." },
      { label: "Separation awareness", body: "Clinginess and stranger awareness often appear. This is a sign of secure attachment, not regression." },
      { label: "Sleep and curiosity", body: "Naps may drop or shift and night waking can change with new skills." },
    ],
    parentRecovery: [
      { label: "Ongoing tiredness", body: "Months of broken sleep are real. Energy dips are not weakness and may need checking, not powering through." },
      { label: "Pelvic floor and core", body: "Lifting a heavier, wrigglier baby asks more of your body. Targeted support helps now." },
      { label: "Mood and identity", body: "Confidence often grows and then gets tested again. New worries are normal as your baby becomes more independent." },
      { label: "Routines and balance", body: "Your baby's day changes quickly. Routines need permission to change with them." },
    ],
    commonQuestions: [
      { q: "Is my baby falling behind if they are not crawling?", a: "Many babies skip crawling or find their own way of moving. Health visitor reviews can reassure you and flag anything worth looking at." },
      { q: "Why is my baby suddenly clingy?", a: "Separation awareness peaks in this phase. Gentle consistency and short, calm goodbyes help." },
      { q: "Is it okay to still be breastfeeding through the night?", a: "Yes. There is no single right answer, only what works for your family and your wellbeing." },
      { q: "Why do I still feel low some days?", a: "Postnatal mood can shift later than people expect. If low mood lingers, please speak to your GP or health visitor." },
      { q: "How do I keep our home safe as they move more?", a: "A simple safety pass at floor level usually shows what needs adjusting first." },
    ],
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
    babyChanges: [
      { label: "Mobility and safety", body: "Cruising, pulling up and early walking signs. Safety at home matters more than ever." },
      { label: "Communication", body: "First sounds, gestures and clear preferences. Personality really starts to show." },
      { label: "Mealtimes", body: "More foods, more textures and stronger opinions. Routine helps, perfection does not." },
      { label: "Toward toddlerhood", body: "Sleep, naps and emotions shift as your baby moves toward toddler life." },
    ],
    parentRecovery: [
      { label: "Longer term recovery", body: "Some things may still feel different a year on. That deserves attention, not dismissal." },
      { label: "Cycles and intimacy", body: "Periods, contraception and intimacy can all feel different. There is no right timeline." },
      { label: "Returning to work or change", body: "Whether you return to work or change shape, this is a real transition for the whole family." },
      { label: "Confidence into year two", body: "You have learned more than you can name. Trust that, and keep asking for support when you need it." },
    ],
    commonQuestions: [
      { q: "When should my baby start walking?", a: "Most babies walk between roughly nine and eighteen months. There is a wide range of normal." },
      { q: "How do I move toward more solid meals?", a: "Offering a calm shared mealtime usually matters more than precise quantities. A health visitor can help if you are worried." },
      { q: "Is it normal that my body still does not feel like mine?", a: "Yes, and it is worth taking seriously. Women's health physios and your GP can help with what is still bothering you." },
      { q: "When is the right time to think about another baby?", a: "There is no universal answer. Your own recovery, energy and life all matter as much as timing." },
      { q: "Should I worry about a 12 month sleep regression?", a: "Sleep often shifts again around big developmental change. Gentle consistency usually carries you through." },
    ],
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
