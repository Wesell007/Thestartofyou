// ─── Trimester Hub Data ────────────────────────────────────────────────────
// Each trimester has rich, emotionally aware content following the
// "What this means" logic established throughout the pregnancy hub.

export interface ExpectSubsection {
  id: string;
  label: string;
  intro: string;
  points: string[];
  meaning: string;
}

export interface TrimesterQuestion {
  q: string;
  sub: string;
}

export interface TrimesterDifficulty {
  label: string;
  body: string;
}

export interface TrimesterBigChange {
  label: string;
  body: string;
}

export interface TrimesterBigChanges {
  eyebrow: string;
  title: string;
  intro: string;
  items: TrimesterBigChange[];
  closing?: string;
}

export interface TrimesterData {
  number: 1 | 2 | 3;
  label: string;
  shortLabel: string;
  range: string;
  weekStart: number;
  weekEnd: number;
  tagline: string;
  heroSubtitle: string;
  sectionBg: string;
  weekBg: string;
  accentColor: string;
  about: {
    title: string;
    paragraphs: string[];
  };
  expect: ExpectSubsection[];
  bigChanges?: TrimesterBigChanges;
  difficulties: {
    title: string;
    intro: string;
    items: TrimesterDifficulty[];
    closing: string;
  };
  normal: {
    normalItems: string[];
    seekSupport: string[];
    disclaimer: string;
  };
  focus: string[];
  focusClosing: string;
  weekBridgeIntro?: string;
  weekGroups?: {
    label: string;
    weeks: number[];
  }[];
  questions: TrimesterQuestion[];
  emotional: {
    title: string;
    body: string;
    quote: string;
  };
  capture: {
    intro: string;
    prompt: string;
  };
}

// ─── First Trimester ───────────────────────────────────────────────────────

export const firstTrimester: TrimesterData = {
  number: 1,
  label: "First Trimester",
  shortLabel: "First",
  range: "Weeks 1-12",
  weekStart: 1,
  weekEnd: 12,
  tagline: "Foundation & Early Development",
  heroSubtitle:
    "The first trimester is the quietest, busiest stage of pregnancy. From weeks 1 to 12, almost everything that defines the pregnancy begins, the foundations of your baby, the hormonal shifts that drive early symptoms, and a new kind of awareness in you. Very little of it shows on the outside, which is part of why this stage can feel so significant and so strange at the same time.",
  sectionBg: "bg-parchment",
  weekBg: "bg-sage-bg/40",
  accentColor: "text-sage",

  about: {
    title: "What the first trimester is",
    paragraphs: [
      "The first trimester runs from week 1 to the end of week 12. By convention, it is counted from the first day of your last period, which means weeks 1 and 2 happen before conception itself, your body is preparing, and the pregnancy as it will be known later hasn't quite begun.",
      "From around week 3, after fertilisation and implantation, hormones rise sharply. hCG, progesterone, and oestrogen all climb fast, and it is largely these hormonal shifts, not the size of the embryo, that drive the early symptoms many people feel: nausea, exhaustion, sore breasts, food aversions, and a wave of emotional change that can be hard to place.",
      "Beneath all of that, an enormous amount of development is happening in a very small space. The neural tube forms, the heart begins to beat, and the foundations of every major organ are laid down before week 12. By the end of the trimester, the embryo has become a foetus with most of the basic structures of a body in place.",
      "It is one of the most intense stages of pregnancy biologically, and one of the most invisible socially. That gap, between how much is changing inside you and how little anyone else can see, is what gives the first trimester so much of its particular character.",
    ],
  },

  expect: [
    {
      id: "body",
      label: "Your body",
      intro:
        "Symptoms in the first trimester are largely driven by rising pregnancy hormones, and they often arrive earlier and more unevenly than expected:",
      points: [
        "Nausea or queasiness, which can happen at any time of day, not only mornings",
        "Fatigue that feels deeper than ordinary tiredness, especially in weeks 6 to 10",
        "Sore, heavy, or unusually sensitive breasts",
        "Bloating, food aversions, and heightened sense of smell",
        "Mild cramping or pulling sensations as the uterus begins to grow",
        "Symptoms that come and go, sometimes disappearing for a day or two",
      ],
      meaning:
        "The intensity, and absence, of symptoms varies enormously. Strong symptoms aren't a sign something is wrong, and quieter symptoms aren't a sign something is missing. Both can sit inside a healthy first trimester.",
    },
    {
      id: "baby",
      label: "Your baby",
      intro:
        "Development in the first trimester is rapid and almost entirely invisible from the outside, but the timeline is remarkable:",
      points: [
        "By week 5, the heart begins to form and a tiny heartbeat is often visible on early scans by week 6 or 7",
        "By week 8, the neural tube has closed and limb buds, eyes, and early facial features are forming",
        "By week 10, the embryo is officially a foetus and most major organs are in place, though still maturing",
        "By week 12, the baby is roughly the size of a lime, can move its limbs, and has fingers, toes, and recognisable features",
      ],
      meaning:
        "Almost every major structure your baby will rely on is being built in this trimester. The quietness of the stage doesn't reflect the scale of what's happening inside it.",
    },
    {
      id: "emotional",
      label: "Emotionally",
      intro:
        "The emotional experience of the first trimester is rarely tidy. Hormones, uncertainty, and a new sense of responsibility often overlap:",
      points: [
        "Excitement and anxiety in the same hour, sometimes the same minute",
        "A feeling of unreality, especially before the first scan",
        "Protectiveness about who knows, and when they know",
        "Guilt about not feeling more positive when symptoms are heavy",
        "Vivid dreams, mood shifts, or tearfulness that catches you off guard",
        "A quiet uncertainty about what you're \"supposed\" to feel",
      ],
      meaning:
        "There is no single correct emotional response to early pregnancy. Joy, numbness, anxiety, ambivalence, and relief can all sit alongside each other and still belong to a healthy beginning.",
    },
    {
      id: "uncertainty",
      label: "Uncertainty & waiting",
      intro:
        "More than any other trimester, the first stage is shaped by waiting, for symptoms, for appointments, for the first scan that confirms what you already know:",
      points: [
        "Awareness of miscarriage risk, especially in the first 12 weeks",
        "Long gaps between appointments, with limited information in between",
        "Watching every twinge for meaning, then trying not to",
        "Feeling unable to fully relax into the pregnancy yet",
        "Holding the news privately while life continues as normal around you",
      ],
      meaning:
        "This uncertainty isn't a sign something is wrong. It is a natural response to a stage where so much is happening internally and so little can be confirmed externally. It tends to ease as the pregnancy moves on.",
    },
  ],

  bigChanges: {
    eyebrow: "Defining the stage",
    title: "The big changes in this trimester",
    intro:
      "Across all the symptoms, scans, and emotions, a few defining shifts shape the first trimester more than any others. These are the realities most people are quietly contending with, even when nothing is visible from the outside.",
    items: [
      {
        label: "A hormonal surge that drives almost everything",
        body: "hCG roughly doubles every couple of days in early pregnancy, while progesterone and oestrogen climb steadily. This single shift is responsible for most early symptoms, the nausea, the exhaustion, the tender breasts, the emotional intensity. It usually peaks somewhere between weeks 8 and 11, which is why the worst symptoms often soften as you approach the end of the trimester.",
      },
      {
        label: "Tiredness and nausea that aren't proportional to anything",
        body: "First trimester fatigue can feel disproportionate to what's visible, you may be running a full day on what feels like half a battery. Nausea can arrive in waves, attach to specific smells or foods, and shift from week to week. Neither is a sign you're not coping. They are the body's response to enormous internal work.",
      },
      {
        label: "Rapid, hidden development",
        body: "By the time many people see their first scan, the embryo has already grown a heartbeat, started forming a brain, and laid down the early structures of every major organ. This stage carries an unusual weight, very little is visible, but very little is more developmentally important.",
      },
      {
        label: "Living with uncertainty",
        body: "The first trimester is the part of pregnancy where awareness of miscarriage is highest and reassurance is rarest. Most people hold the news privately, manage symptoms quietly, and wait for the first scan before letting themselves fully arrive in the pregnancy. That holding pattern is exhausting in its own way.",
      },
      {
        label: "First appointments and the first scan",
        body: "Booking your midwife appointment (usually between weeks 8 and 10) and attending the dating scan around week 12 are the two big anchors of this trimester. They mark the shift from a private, internal experience to one with structure, dates, and confirmation.",
      },
      {
        label: "An identity shift that hasn't quite landed",
        body: "Pregnancy starts to change how you think about your body, your future, and yourself, but most of that shift happens internally and slowly. It is normal for the idea of becoming a parent to feel abstract, distant, or unsteady in these early weeks. The connection often deepens later.",
      },
    ],
    closing:
      "Holding all of this at once, especially before anyone else knows, is part of why the first trimester can feel so much heavier than it looks.",
  },

  difficulties: {
    title: "What can feel difficult in this stage",
    intro:
      "The first trimester has its own particular challenges, many of which sit just beneath the surface of everyday life and rarely get talked about openly.",
    items: [
      {
        label: "Holding the news while feeling unwell",
        body: "Most people wait until after the 12-week scan to share. Doing that while managing nausea, exhaustion, and missed meals, often around colleagues, friends, or family who don't yet know, can be quietly exhausting in a way that's hard to explain.",
      },
      {
        label: "Not knowing if everything is progressing",
        body: "Between a positive test and the first scan, there are usually several weeks with very few signposts. Symptoms ease and return, days feel uneventful, and it can be hard not to read into every change. That waiting is one of the most universal experiences of early pregnancy.",
      },
      {
        label: "Exhaustion that has no public explanation",
        body: "First trimester tiredness can be unlike anything you've felt before, full days flattened by a fatigue you can't justify out loud. Pretending to be fine while running on so little can take a real toll, especially in workplaces or social settings where you can't share why.",
      },
      {
        label: "The gap between expectation and experience",
        body: "Pregnancy can feel very different from the version you imagined, more physical, more uncertain, less euphoric, or simply quieter. Many people are surprised by how unsentimental the early weeks can feel, and worry that something is wrong with their reaction. Usually, nothing is.",
      },
      {
        label: "Worry that won't fully settle",
        body: "Awareness of miscarriage can sit in the background of every symptom change. This isn't a personal failing, it is a reasonable response to a stage with high uncertainty and limited reassurance. Naming it often helps more than trying to push it away.",
      },
      {
        label: "Feeling alone in something huge",
        body: "Even with a partner, family, or close friends around, the first trimester can feel lonely, because so much of it is happening inside you, before the world catches up. That loneliness is one of the most common, and least talked about, parts of this stage.",
      },
    ],
    closing:
      "These experiences are part of the first trimester for many people. You don't need to minimise them to be doing this well.",
  },

  normal: {
    normalItems: [
      "Nausea at any time of day, or no nausea at all",
      "Extreme tiredness, especially in weeks 6 to 10",
      "Symptoms that come and go from one day to the next",
      "Mild cramping or pulling sensations as the uterus grows",
      "Light spotting around the time of an expected period, particularly in the early weeks",
      "Feeling emotional, tearful, or unusually sensitive without a clear reason",
      "Bloating, food aversions, vivid dreams, or heightened sense of smell",
      "A reduction in symptoms as you approach the end of the first trimester",
    ],
    seekSupport: [
      "Severe vomiting that prevents you from keeping fluids down (possible hyperemesis)",
      "Heavy bleeding, especially with cramping or clots",
      "Sharp, persistent, or one-sided pain in your lower abdomen or shoulder tip",
      "Sudden disappearance of strong symptoms accompanied by bleeding or pain",
      "Pain or burning when you wee, or signs of a possible infection",
      "Feelings of low mood, hopelessness, or anxiety that don't ease, your midwife or GP can help",
      "Any concern that doesn't settle, even if you can't quite name it",
    ],
    disclaimer:
      "This is not medical advice. If you have any concerns about your pregnancy, always contact your midwife, GP, or maternity unit. In the UK, NHS 111 is available out of hours.",
  },

  focus: [
    "Booking your first midwife appointment, usually between weeks 8 and 10",
    "Taking 400mcg folic acid daily until the end of week 12, and 10mcg vitamin D throughout pregnancy",
    "Eating little and often if nausea is hard, and keeping fluids up where you can",
    "Resting without negotiating with yourself about whether you've earned it",
    "Letting go of any pressure to plan, decide, or prepare beyond this stage",
    "Attending your dating scan around week 12, and writing down anything you want to ask",
    "Noticing what feels different, and being honest with someone you trust about it",
  ],
  focusClosing:
    "You don't need to optimise pregnancy. Looking after yourself this week is enough.",

  weekBridgeIntro:
    "The trimester overview gives you the shape of this stage. The week-by-week view is where it becomes specific, what tends to happen when, what your baby is doing, and what's worth noticing in your own body. Use it as a gentle companion, not a checklist.",

  weekGroups: [
    {
      label: "Before you know (Weeks 1-3)",
      weeks: [1, 2, 3],
    },
    {
      label: "Early signals (Weeks 4-7)",
      weeks: [4, 5, 6, 7],
    },
    {
      label: "Building (Weeks 8-12)",
      weeks: [8, 9, 10, 11, 12],
    },
  ],

  questions: [
    {
      q: "When do pregnancy symptoms usually start?",
      sub: "What's typical, and why timing varies",
    },
    {
      q: "Is it normal to feel almost no symptoms?",
      sub: "On the absence of early signs",
    },
    {
      q: "What happens at the 12-week dating scan?",
      sub: "What to expect at your first scan",
    },
    {
      q: "Why do my symptoms come and go?",
      sub: "Variation in the first trimester",
    },
    {
      q: "When should I tell people I'm pregnant?",
      sub: "There is no single right answer",
    },
    {
      q: "What appointments happen in the first trimester?",
      sub: "Booking, screening, and the dating scan",
    },
    {
      q: "What can I do about first trimester nausea?",
      sub: "Practical, gentle ways to manage it",
    },
    {
      q: "Is some bleeding in early pregnancy normal?",
      sub: "When to reassure, when to call your midwife",
    },
  ],

  emotional: {
    title: "A moment in the first trimester",
    body: "Many people describe the first trimester as quietly hard. Not dramatic, but heavy in its own way. The secrecy, the uncertainty, the exhaustion that nobody else can see.",
    quote:
      "You are carrying something significant before anyone else knows it exists.",
  },

  capture: {
    intro: "This stage can feel intense and invisible all at once, full of internal change that nobody else can see yet.",
    prompt:
      "What has this first stage felt like for you, in ways you might not have expected?",
  },
};

// ─── Second Trimester ──────────────────────────────────────────────────────

export const secondTrimester: TrimesterData = {
  number: 2,
  label: "Second Trimester",
  shortLabel: "Second",
  range: "Weeks 13-27",
  weekStart: 13,
  weekEnd: 27,
  tagline: "Growth, Movement & Emerging Visibility",
  heroSubtitle:
    "The second trimester is the middle stage of pregnancy. From weeks 13 to 27, many people begin to feel more physically themselves again, the bump becomes more visible, the baby grows rapidly, first movements may begin, and the anatomy scan becomes a major emotional and practical milestone. The pregnancy starts to feel more real, both inside you and to the world around you.",
  sectionBg: "bg-parchment-dark",
  weekBg: "bg-parchment-dark",
  accentColor: "text-sage",

  about: {
    title: "What the second trimester is",
    paragraphs: [
      "The second trimester is often when pregnancy becomes more visible, both to you and to others. Many of the most intense symptoms of the first trimester tend to ease, and energy often returns.",
      "This is also when the pregnancy starts to feel more real. You may begin to feel movement for the first time, see a more defined shape at your 20-week scan, and find that the pregnancy starts to occupy more of your daily thoughts and plans.",
      "For many people, this stage brings a kind of settling, a shift from uncertainty to a growing (if still tentative) sense of connection. But it isn't always straightforward. Changes in your body, identity, and relationships can all surface here.",
    ],
  },

  expect: [
    {
      id: "body",
      label: "Your body",
      intro:
        "Physical changes in the second trimester are often more visible and varied. You might notice:",
      points: [
        "A growing bump becoming visible, usually from around 16-20 weeks",
        "Reduced nausea for many people, though not everyone",
        "Increased energy compared to the first trimester",
        "Skin changes, stretching, darkening, or increased sensitivity",
        "Round ligament pain or pelvic discomfort as the uterus grows",
        "First baby movements, often between weeks 16-22",
      ],
      meaning:
        "Physical changes in this trimester tend to be more visible and more varied. The body is adapting significantly, not all of it is comfortable, even as energy improves.",
    },
    {
      id: "baby",
      label: "Your baby",
      intro:
        "Development accelerates rapidly in the second trimester. Milestones you may become aware of:",
      points: [
        "The 20-week anatomy scan, which checks major structures",
        "Baby begins to move in ways you can feel, often fluttery at first",
        "Fingerprints, hair, and facial features develop",
        "Baby starts responding to sound from around week 18-20",
        "By week 24, the baby is considered viable",
      ],
      meaning:
        "This stage brings a new kind of reality to the pregnancy. Feeling movement, seeing detail at the scan, these can be profound, but they can also bring new things to process.",
    },
    {
      id: "emotional",
      label: "Emotionally",
      intro:
        "The emotional landscape of the second trimester is often different from the first, and more complex than the 'easier trimester' label suggests:",
      points: [
        "Feeling more connected to the pregnancy, though this varies widely",
        "Identity questions starting to surface, who am I becoming?",
        "Relationship dynamics beginning to shift",
        "Anxiety about the 20-week scan and what it might reveal",
        "A mix of excitement and quiet worry that can be hard to articulate",
      ],
      meaning:
        "Emotional shifts are not purely hormonal. You are adjusting to a change that will affect your entire life, and that's a significant thing to sit with, even when the symptoms have settled.",
    },
    {
      id: "identity",
      label: "Identity & daily life",
      intro:
        "The second trimester often brings the first real awareness of how much is changing beyond the physical:",
      points: [
        "Your body looking and feeling different to others as well as yourself",
        "Navigating other people's responses to your pregnancy",
        "Work, plans, and relationships beginning to shift",
        "Finding a new rhythm that accommodates how you feel",
      ],
      meaning:
        "Pregnancy changes things beyond the physical, and some of that adjustment takes time. It's okay if the second trimester brings as many questions as the first, just different ones.",
    },
  ],

  difficulties: {
    title: "What can feel difficult in this stage",
    intro:
      "Despite being described as the 'easy' trimester, the second stage has its own less-discussed challenges.",
    items: [
      {
        label: "The pressure to enjoy it",
        body: "Many people feel pressure to feel good in the second trimester, because 'it should be the best part.' If it doesn't feel that way, that contrast can add another layer of difficulty.",
      },
      {
        label: "The 20-week scan",
        body: "The anatomy scan is often anticipated with significant anxiety. Waiting for results, understanding what is and isn't included in the scan, and processing the information, all of this can be harder than expected.",
      },
      {
        label: "Changing relationships and dynamics",
        body: "Partners, families, and friendships can all shift once the pregnancy becomes visible. Not all of these shifts feel positive.",
      },
      {
        label: "Questions about identity",
        body: "As the pregnancy becomes more visible, it becomes harder to separate yourself from it. Questions about who you are and who you're becoming can feel unsettling.",
      },
    ],
    closing:
      "The second trimester can bring clarity, but it can also bring new things to carry. Both are real.",
  },

  normal: {
    normalItems: [
      "Reduced nausea, or nausea continuing, both are possible",
      "Increased energy, though this varies significantly",
      "Round ligament pain, sharp, brief pains on the sides of the abdomen",
      "First movements, often felt as fluttering or bubbles",
      "Back pain and pelvic discomfort as posture changes",
      "Emotional complexity, including anxiety, even if symptoms are mild",
    ],
    seekSupport: [
      "Reduced movement after week 20, once you've established a pattern",
      "Sudden swelling, headaches, or visual disturbances",
      "Fever or signs of infection",
      "Bleeding or significant cramping at any point",
      "Any concern that doesn't settle, always worth raising",
    ],
    disclaimer:
      "This is not medical advice. If you have any concerns about your pregnancy, always consult your midwife, doctor, or healthcare provider.",
  },

  focus: [
    "Attending your 20-week anatomy scan",
    "Beginning to think about birth preferences, without pressure",
    "Staying informed without overpreparing",
    "Noticing and tracking fetal movements once they start",
    "Allowing yourself to begin planning, but without needing certainty",
    "Staying connected to how you're actually feeling, not how you think you should feel",
  ],
  focusClosing: "Feeling movement for the first time is one of the most quietly profound moments of pregnancy. Let it land.",

  weekGroups: [
    {
      label: "The shift (Weeks 13-16)",
      weeks: [13, 14, 15, 16],
    },
    {
      label: "Growing awareness (Weeks 17-22)",
      weeks: [17, 18, 19, 20, 21, 22],
    },
    {
      label: "Entering the third trimester (Weeks 23-27)",
      weeks: [23, 24, 25, 26, 27],
    },
  ],

  questions: [
    {
      q: "When will I feel my baby move?",
      sub: "Understanding first movements",
    },
    {
      q: "What does the 20-week scan check for?",
      sub: "The anatomy scan explained",
    },
    {
      q: "Is round ligament pain normal?",
      sub: "Second trimester discomfort",
    },
    {
      q: "Why do I still feel anxious when things seem fine?",
      sub: "Emotional complexity in mid-pregnancy",
    },
  ],

  emotional: {
    title: "A moment in the second trimester",
    body: "Feeling your baby move for the first time is often described as one of the most unexpected moments of pregnancy, quiet, strange, profound. It arrives before you're quite ready for it.",
    quote:
      "Some things in pregnancy don't need to be understood. They just need to be felt.",
  },

  capture: {
    intro: "This stage can feel surprisingly complex, a mix of relief as symptoms ease, and new questions arriving as the pregnancy becomes more real.",
    prompt:
      "What has shifted for you in this stage, in your body, your thinking, or the way this pregnancy feels?",
  },
};

// ─── Third Trimester ───────────────────────────────────────────────────────

export const thirdTrimester: TrimesterData = {
  number: 3,
  label: "Third Trimester",
  shortLabel: "Third",
  range: "Weeks 28-42",
  weekStart: 28,
  weekEnd: 42,
  tagline: "Preparation & Arrival",
    heroSubtitle:
    "The final stretch of pregnancy, physically demanding, emotionally complex, and full of preparation for what comes next. Weeks 28 through to birth.",
  sectionBg: "bg-lavender-section",
  weekBg: "bg-lavender-section",
  accentColor: "text-sage",

  about: {
    title: "What the third trimester is",
    paragraphs: [
      "The third trimester is the most physically noticeable stage, your body is preparing for birth, and that preparation is demanding. Growth accelerates, space becomes limited, and sleep is often disrupted.",
      "This is also a time of increasing anticipation. The end of pregnancy is in sight, even when it still feels distant. Birth plans, hospital bags, and names that were abstract in earlier weeks begin to feel real and urgent.",
      "Emotionally, the third trimester can bring a sense of intensity, a mix of readiness and not-readiness that doesn't fully resolve until after the birth. Many people describe feeling both enormous and invisible in this stage.",
    ],
  },

  expect: [
    {
      id: "body",
      label: "Your body",
      intro:
        "Physical demands increase significantly in the third trimester. You may experience:",
      points: [
        "Stronger, more frequent baby movements, and occasional discomfort from them",
        "Difficulty sleeping due to size, discomfort, and frequent toilet trips",
        "Heartburn, shortness of breath, and pelvic pressure",
        "Braxton Hicks contractions, practice tightening of the uterus",
        "Swelling in feet, ankles, and hands",
        "Increasing fatigue, similar to the first trimester",
      ],
      meaning:
        "The third trimester is genuinely demanding. Discomfort is common and real, being exhausted, sore, and uncomfortable does not mean you're doing anything wrong.",
    },
    {
      id: "baby",
      label: "Your baby",
      intro:
        "Your baby is growing rapidly and preparing for birth. Key developments include:",
      points: [
        "Significant weight gain, your baby roughly doubles in weight in this trimester",
        "Lungs maturing, in preparation for breathing after birth",
        "The baby moving into a head-down position (usually by 36 weeks)",
        "Sleep cycles becoming established",
        "A daily pattern of movement you may begin to recognise",
      ],
      meaning:
        "Movement remains one of the most important things to monitor in the third trimester. You'll be asked to notice patterns, not count every kick, but stay aware of what feels normal for your baby.",
    },
    {
      id: "emotional",
      label: "Emotionally",
      intro:
        "The emotional experience of the third trimester is rarely simple. You might feel:",
      points: [
        "A mixture of readiness and fear about the birth",
        "Nesting, a strong drive to prepare your home and environment",
        "Anxiety about labour, parenting, or the unknown",
        "Moments of feeling deeply connected to the pregnancy",
        "Moments of being desperate for it to be over",
        "Complex feelings that are hard to name",
      ],
      meaning:
        "Wanting the pregnancy to end and feeling connected to it can coexist. The third trimester often holds contradictory emotions at once, and that's part of what makes it one of the most intense stages.",
    },
    {
      id: "preparation",
      label: "Preparing for what's next",
      intro:
        "The mental load of the third trimester often involves preparing for birth and early parenthood simultaneously:",
      points: [
        "Building a birth plan or set of preferences",
        "Preparing your home, hospital bag, and practical logistics",
        "Thinking about the transition from pregnancy to parenthood",
        "Navigating other people's birth stories and unsolicited advice",
      ],
      meaning:
        "Preparation is useful, but it can also become a way of managing anxiety. Some things can't be planned, and arriving at birth with flexibility rather than a fixed expectation is often more helpful.",
    },
  ],

  difficulties: {
    title: "What can feel difficult in this stage",
    intro:
      "The third trimester carries a specific kind of weight, the combination of physical demands and anticipatory pressure.",
    items: [
      {
        label: "Physical discomfort that doesn't ease",
        body: "Unlike earlier trimesters, the physical experience of the third trimester often intensifies rather than resolves. There is rarely a comfortable position.",
      },
      {
        label: "Anticipatory anxiety about birth",
        body: "The closer birth becomes, the more present birth anxiety often is. This is a natural response, not something that needs to be solved before going into labour.",
      },
      {
        label: "The pressure to 'enjoy the last weeks'",
        body: "Well-meaning people often tell you to enjoy the final weeks. When you're exhausted and uncomfortable, this can feel tone-deaf rather than reassuring.",
      },
      {
        label: "Not knowing when it will start",
        body: "The unknowability of the birth date is something many people find hard. Due dates are estimates, but the uncertainty they create is real.",
      },
    ],
    closing:
      "The third trimester asks a lot. You don't have to perform readiness, just keep showing up.",
  },

  normal: {
    normalItems: [
      "Difficulty sleeping, almost universal in the third trimester",
      "Braxton Hicks contractions, particularly in the evenings",
      "Shortness of breath and heartburn as the uterus presses upward",
      "Pelvic discomfort, especially when walking",
      "Swelling in hands, feet, and ankles, particularly in warmer weather",
      "Emotional complexity, including fear and readiness at the same time",
    ],
    seekSupport: [
      "Reduced baby movement, or a change in your baby's usual pattern",
      "Sudden severe swelling, especially in the face or hands",
      "A severe headache with visual disturbances (possible preeclampsia signs)",
      "Fever or signs of infection",
      "Bleeding or unusual discharge",
      "Contractions before 37 weeks",
    ],
    disclaimer:
      "This is not medical advice. If you have any concerns about your pregnancy, always consult your midwife, doctor, or healthcare provider.",
  },

  focus: [
    "Attending your regular midwife appointments",
    "Monitoring baby's movement pattern daily",
    "Preparing your birth preferences, with flexibility built in",
    "Getting your hospital bag ready by around 36 weeks",
    "Resting when you can, fatigue in the third trimester is real",
    "Staying connected to your support network",
  ],
  focusClosing: "You don't need to be ready. You need to keep going. The birth will happen, with or without a perfect plan.",

  weekGroups: [
    {
      label: "Final growth (Weeks 28-32)",
      weeks: [28, 29, 30, 31, 32],
    },
    {
      label: "Preparing (Weeks 33-36)",
      weeks: [33, 34, 35, 36],
    },
    {
      label: "The final approach (Weeks 37-40)",
      weeks: [37, 38, 39, 40],
    },
    {
      label: "Beyond due date (Weeks 41-42)",
      weeks: [41, 42],
    },
  ],

  questions: [
    {
      q: "What do Braxton Hicks feel like?",
      sub: "Practice contractions explained",
    },
    {
      q: "How do I monitor my baby's movement?",
      sub: "Understanding kick patterns",
    },
    {
      q: "What does a birth plan actually include?",
      sub: "Preparing for birth with flexibility",
    },
    {
      q: "What happens if I go past my due date?",
      sub: "Overdue, what comes next",
    },
  ],

  emotional: {
    title: "A moment in the third trimester",
    body: "There's a particular feeling in the last weeks of pregnancy that is hard to describe, a strange combination of enormous and invisible, of 'I can't wait' and 'I'm not ready.'",
    quote:
      "You are closer than you think. And you are ready in more ways than you currently believe.",
  },

  capture: {
    intro: "This stage can feel like holding a lot at once, physical demands, anticipation, and the quiet intensity of waiting for something you can't fully prepare for.",
    prompt:
      "What do you want to remember from this final stage, the waiting, the preparing, the feeling of nearly?",
  },
};

export const allTrimesters: TrimesterData[] = [
  firstTrimester,
  secondTrimester,
  thirdTrimester,
];
