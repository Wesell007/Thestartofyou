// First Year month guide data — Phase 11.8a.
// Only Newborn to 3 months are published. 4 to 12 months intentionally omitted
// so no dead links or placeholder pages leak into navigation, prev/next or sitemap.

export type MonthSlug = "newborn" | "1-month" | "2-months" | "3-months";

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

export interface AtAGlanceRow {
  label: string;
  value: string;
}

export interface MonthGuide {
  slug: MonthSlug;
  label: string;
  title: string;
  standfirst: string;
  phase: { label: string; href: string };
  atAGlance: AtAGlanceRow[];
  baby: { title: string; body: string }[];
  you: { title: string; body: string }[];
  feelsHard: string[];
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
    title: "Newborn: the first days and weeks",
    standfirst:
      "The newborn window is small, blurry and huge all at once. Feeding, sleeping and healing take up most of the day, and that is exactly what should be happening now.",
    phase: PHASE_0_3,
    atAGlance: [
      { label: "Your baby", value: "Sleepy, hungry, close to your body most of the time." },
      { label: "Feeding", value: "Little and often, day and night. Cluster feeds are common." },
      { label: "Sleep", value: "Short stretches, no rhythm yet. Always on the back on a flat surface." },
      { label: "You", value: "Healing, bleeding, sore. Big feelings can arrive in waves." },
      { label: "When to ask", value: "Feeding worries, low mood, heavy bleeding, or a baby who is very hard to rouse." },
    ],
    baby: [
      {
        title: "Very sleepy, very new",
        body: "Newborns often sleep in short bursts around the clock and can be hard to keep awake for feeds in the first days. Skin to skin, a gentle change of nappy or unwrapping can help rouse them.",
      },
      {
        title: "Feeding is learning",
        body: "Whether you are breast, bottle or mixed feeding, the first week or two is mostly practice. Frequent feeds, some awkward latches and cluster feeding in the evenings are all normal.",
      },
      {
        title: "Nappies tell a story",
        body: "Wet and dirty nappies are one of the clearest signs feeding is going well. Your midwife or health visitor can talk you through what to expect in the first days.",
      },
      {
        title: "Crying without a reason",
        body: "Newborns often cry when nothing obvious is wrong. Holding, movement, feeding and quiet can all help. You are not spoiling them by responding.",
      },
      {
        title: "Startles and jerks",
        body: "Tiny arm flings, hiccups and noisy breathing patterns are usually normal in a settled newborn. Persistent fast breathing, grunting or a blue tinge is not, and needs review.",
      },
    ],
    you: [
      {
        title: "Your body is healing",
        body: "Bleeding, cramping and soreness are normal after any birth. Rest when you can, keep fluids close by, and take pain relief as advised.",
      },
      {
        title: "Emotions in waves",
        body: "Tearfulness in the first days is common as hormones shift. Low mood that does not lift, or thoughts that frighten you, are worth naming out loud to your midwife, GP or health visitor.",
      },
      {
        title: "Rest is not optional",
        body: "Sleep when you can, in whatever shape it comes. Lower the bar on everything that is not feeding, healing and holding your baby.",
      },
      {
        title: "Support looks like small things",
        body: "Food dropped at the door, a walk with the pram, someone holding the baby while you shower. Say yes to help early, before you run out of reserves.",
      },
    ],
    feelsHard: [
      "The hours blur into each other and you lose track of time and days.",
      "Feeding takes longer than you expected and never quite feels finished.",
      "Well meaning advice from lots of people can leave you second guessing yourself.",
      "The night feels very long, even when the baby is calm.",
    ],
    whatHelps: [
      "One trusted person you can text at 3am, even just to say you are awake.",
      "Keeping a simple note of feeds, wet nappies and any worries to share at check-ins.",
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
        body: "Your baby is very hard to wake for feeds, is feeding much less than usual, or has fewer wet nappies than expected.",
      },
      {
        when: "Urgent",
        body: "Fast breathing, grunting, a blue or grey tinge, a very high or low temperature, or heavy bleeding for you that soaks a pad in an hour.",
      },
    ],
    questions: [
      {
        question: "Is it normal that my newborn feeds constantly?",
        answer:
          "Yes, in the early weeks feeding little and often is expected, and cluster feeding in the evenings is very common. Frequent feeds help build supply if you are breastfeeding and are usually not a sign anything is wrong.",
        readMore: {
          label: "Read: newborn feeding rhythms",
          href: "/first-year/feeding/newborn-feeding-rhythms",
        },
        askTopic: "newborn-feeding",
      },
      {
        question: "How much sleep should a newborn get?",
        answer:
          "Newborn sleep is scattered across day and night, in short stretches. There is no expected rhythm yet, and trying to force one this early usually is not helpful. Follow their cues.",
        readMore: {
          label: "Read: newborn sleep expectations",
          href: "/first-year/sleep/newborn-sleep-expectations",
        },
        askTopic: "newborn-sleep",
      },
      {
        question: "What are safe sleep basics?",
        answer:
          "Always on the back, on a firm flat surface, in a clear space with no loose bedding, in the same room as you for the first six months. It does not need to be complicated.",
        readMore: {
          label: "Read: safe sleep and home safety",
          href: "/first-year/care-and-safety/safe-sleep-and-home-safety",
        },
        askTopic: "safe-sleep",
      },
      {
        question: "How do I know feeding is going well?",
        answer:
          "Regular wet and dirty nappies, calm periods between feeds, and weight tracking that your midwife or health visitor is happy with are all reassuring signs. If anything worries you, ask early.",
        readMore: {
          label: "Read: bottle and breastfeeding questions",
          href: "/first-year/feeding/bottle-and-breastfeeding-questions",
        },
        askTopic: "feeding-going-well",
      },
      {
        question: "When should I ask for help for how I feel?",
        answer:
          "If low mood, anxiety or intrusive thoughts are getting in the way of the day, or you feel not yourself in a way that is not lifting, it is early enough to ask now. Your midwife, health visitor or GP can help.",
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
    title: "1 month: finding a rough rhythm",
    standfirst:
      "The very newest days start to soften. Feeds may still be frequent, evenings can be unsettled, and you are living somewhere between exhaustion and quiet moments of noticing your baby.",
    phase: PHASE_0_3,
    atAGlance: [
      { label: "Your baby", value: "More alert in short windows. Still no fixed routine." },
      { label: "Feeding", value: "Frequent, often clustered in the evening." },
      { label: "Sleep", value: "Short stretches, occasional longer ones by chance." },
      { label: "You", value: "Very tired. Emotions can still swing widely." },
      { label: "When to ask", value: "Feeding worries, weight concerns, low mood, or pain that is worsening." },
    ],
    baby: [
      {
        title: "Alert windows begin",
        body: "You may see brief spells where your baby is quietly awake and watching. These often last only minutes and are enough. There is no need to entertain them beyond gentle talking and eye contact.",
      },
      {
        title: "Feeding starts to feel more familiar",
        body: "Latching, positioning or bottle rhythm may be easier than it was in week one. Cluster feeding in the evenings is still very common and is not a supply problem on its own.",
      },
      {
        title: "Unsettled evenings",
        body: "Many babies get fussier from late afternoon into the evening. Movement, holding, feeding on demand and low light can help. It usually passes over the next few weeks.",
      },
      {
        title: "Weight checks",
        body: "Health visitors will weigh your baby at the routine checks. Steady growth along their own line matters more than being on a particular centile.",
      },
      {
        title: "Sleep is still irregular",
        body: "By chance you may get one longer stretch, then several short ones. Try not to read too much into any single night either way.",
      },
    ],
    you: [
      {
        title: "Exhaustion is real",
        body: "Fragmented sleep for weeks changes how you feel in your body and mind. This is not you being dramatic. It is a well documented physiological load.",
      },
      {
        title: "Body still healing",
        body: "Bleeding may be tailing off. Perineal or caesarean discomfort can still be there. If pain is getting worse rather than better, ask.",
      },
      {
        title: "Emotional weather",
        body: "Confidence can arrive one hour and leave the next. Big feelings in the first weeks are common. Persistent low mood or anxiety is worth naming to your GP or health visitor.",
      },
      {
        title: "Reconnecting slowly",
        body: "Short walks, a favourite drink, a message to a friend. Small things count as you start to feel more like yourself.",
      },
    ],
    feelsHard: [
      "You have not slept properly in weeks and everyone keeps asking how you are.",
      "Evenings feel long, unsettled and lonely, even when you are not alone.",
      "You feel unsure whether feeding is going well and cannot always tell.",
      "It is hard to know what is a problem and what is normal newborn stuff.",
    ],
    whatHelps: [
      "Trusting your instincts on when something feels off and asking early.",
      "Sharing night wake ups where possible, or a rest window in the day.",
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
        body: "A baby who seems very sleepy, is feeding much less than usual, or is not doing regular wet or dirty nappies.",
      },
      {
        when: "Urgent",
        body: "A high or very low temperature, fast breathing, a very unwell looking baby, or heavy bleeding for you that is getting worse.",
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
          "Evening fussiness is very common in the first couple of months. Holding, feeding, gentle movement and low stimulation can help. It usually eases with time.",
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
    title: "2 months: more of them, more of you",
    standfirst:
      "Somewhere in this month, tiny things shift. Slightly longer awake windows, early smiles, and a first sense that you and your baby are starting to know each other.",
    phase: PHASE_0_3,
    atAGlance: [
      { label: "Your baby", value: "Longer alert windows. Early social smiles may appear." },
      { label: "Feeding", value: "Feeds may space out slightly, or change shape again." },
      { label: "Sleep", value: "Still fragmented. Some babies find a longer night stretch." },
      { label: "You", value: "Postnatal check window. Confidence starts to build unevenly." },
      { label: "When to ask", value: "Ongoing pain, low mood, worry about feeding or a very unhappy baby." },
    ],
    baby: [
      {
        title: "More alert, more of the time",
        body: "Awake windows may lengthen a little. Babies at this age often enjoy quiet, close interaction more than lots of stimulation.",
      },
      {
        title: "First real smiles",
        body: "Many babies start social smiling around now. If you have not seen one yet, it is still an ordinary range. Every baby is on their own line.",
      },
      {
        title: "Feeding may change shape",
        body: "Feeds can become faster, more efficient, or briefly more frequent again during growth spurts. That does not usually mean there is a supply problem.",
      },
      {
        title: "Sleep is still doing its own thing",
        body: "Some babies fall into a slightly longer night stretch, others do not. Both are within a wide range at this age.",
      },
      {
        title: "Vaccinations",
        body: "The first set of routine vaccinations happens around 8 weeks. Some babies are unsettled or sleepy for a day or two after. Your health visitor or GP can advise on comfort measures.",
      },
    ],
    you: [
      {
        title: "The postnatal check",
        body: "Around 6 to 8 weeks you should be offered a check for you. It is a chance to talk about mood, pain, bleeding, contraception, and how you actually are.",
      },
      {
        title: "Confidence in patches",
        body: "You may notice you can read your baby's cues more easily. That does not mean every day feels good, and it does not need to.",
      },
      {
        title: "Body still adjusting",
        body: "Aches, pelvic floor changes and tiredness are all normal at this stage. Persistent pain or symptoms that worry you should be raised at your postnatal check.",
      },
      {
        title: "Emotional shifts",
        body: "For some, this is when postnatal mood changes become clearer. If low mood, anxiety or feeling disconnected is present most days, it is worth talking to your GP.",
      },
    ],
    feelsHard: [
      "You feel like you should be enjoying it more than you are.",
      "You are not sure whether what you feel is normal tiredness or something more.",
      "Everyone else's baby seems to have a routine and yours does not.",
      "You still do not feel like your old self, and you are not sure who your new self is yet.",
    ],
    whatHelps: [
      "Using your postnatal check honestly, not just saying you are fine.",
      "Short predictable moments, like a morning walk, rather than a full routine.",
      "Talking to one person who really listens, in person or online.",
      "Naming the good moments, even quietly, when they happen.",
    ],
    support: [
      {
        when: "At your postnatal check",
        body: "Ongoing pain, heavy bleeding, incontinence, feeding worries, or low mood. This appointment is for you as much as for your baby.",
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
    title: "3 months: quieter ground",
    standfirst:
      "By three months, many families feel a little more solid. Your baby may be more interactive, and you may have a rough sense of your own days, even if nothing is fixed.",
    phase: PHASE_0_3,
    atAGlance: [
      { label: "Your baby", value: "More social and interactive. Head control is stronger." },
      { label: "Feeding", value: "Often faster, sometimes briefly disorganised again." },
      { label: "Sleep", value: "Some patterns emerge, though nights can still surprise you." },
      { label: "You", value: "Confidence building unevenly. Some feelings only surface now." },
      { label: "When to ask", value: "Ongoing pain, mood changes that are not lifting, or feeding worries." },
    ],
    baby: [
      {
        title: "Real interaction",
        body: "Smiles, coos, watching your face, being interested in what you are doing. This is early relationship building and it does not need any structured activity.",
      },
      {
        title: "Stronger head control",
        body: "Many babies can hold their head steady for longer when upright and enjoy short spells of tummy time. Little and often is fine.",
      },
      {
        title: "Feeding may look easier",
        body: "Feeds are often quicker and more efficient. Some babies briefly become distracted or fussy at the breast or bottle. That is usually a phase.",
      },
      {
        title: "Sleep starts to shift",
        body: "Some babies begin longer night stretches, some do not. Neither is a sign of doing something right or wrong. Continue with safe sleep basics.",
      },
      {
        title: "First routines by accident",
        body: "You may notice a loose shape to your days that works. Building on what already happens naturally is often easier than imposing a strict plan.",
      },
    ],
    you: [
      {
        title: "Feeling more capable",
        body: "You have learned an enormous amount in three months. It is fine to acknowledge that, even quietly.",
      },
      {
        title: "Delayed feelings",
        body: "For some parents, birth or newborn feelings only really land now, once the immediate intensity has passed. Talking about it can help.",
      },
      {
        title: "Body in progress",
        body: "Recovery is not linear. Pelvic floor, core, sleep debt and hormones all continue to settle over the next few months.",
      },
      {
        title: "Thinking beyond the next feed",
        body: "You may start to have thoughts about work, relationships or your own identity again. Those thoughts are not selfish. They are part of coming back to yourself.",
      },
    ],
    feelsHard: [
      "You feel like you should be enjoying this more now that things are calmer.",
      "Sleep changes can shake your confidence just as it was building.",
      "Feeding questions can feel confusing when everyone gives different advice.",
      "Big feelings about the birth or early weeks can arrive now.",
    ],
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
        body: "A baby who is much less interested in feeding, is unusually sleepy, or seems very unwell.",
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
