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
    "The beginning of pregnancy is often invisible, to others, and sometimes even to you. This stage covers weeks 1 through 12, a period of quiet but significant change.",
  sectionBg: "bg-parchment",
  weekBg: "bg-sage-bg/40",
  accentColor: "text-sage",

  about: {
    title: "What the first trimester is",
    paragraphs: [
      "The first trimester begins before many people even know they're pregnant. Weeks 1 and 2 technically precede conception, your body is preparing, hormones are shifting, and implantation is just beginning.",
      "By week 4 or 5, the pregnancy becomes real in many senses, a positive test, early symptoms, and the start of a new kind of awareness. But the experience isn't always dramatic. For many people, the first trimester feels more like an internal shift than a visible one.",
      "This is a period of enormous biological work happening quietly beneath the surface. Your body is building the foundational structures that will support the entire pregnancy, and that can be exhausting, disorienting, and sometimes nothing like what you expected.",
    ],
  },

  expect: [
    {
      id: "body",
      label: "Your body",
      intro:
        "Symptoms in the first trimester often begin earlier than expected, and can feel inconsistent. You might notice:",
      points: [
        "Nausea, which can happen at any time of day, not just mornings",
        "Fatigue that feels deeper than tiredness",
        "Sore or tender breasts",
        "Bloating and digestive changes",
        "Symptoms that come and go, sometimes disappearing for days",
      ],
      meaning:
        "The absence of symptoms doesn't mean something is wrong. Many people have very few symptoms throughout the first trimester. Variation is normal, even when it feels confusing.",
    },
    {
      id: "baby",
      label: "Your baby",
      intro:
        "Development in the first trimester is rapid and largely invisible. You likely won't feel it yet, but a great deal is happening:",
      points: [
        "The neural tube, heart, and early organ structures form in the first few weeks",
        "By week 10, the embryo becomes a foetus",
        "By week 12, most major body structures are in place",
        "Movement is happening but far too early to feel",
      ],
      meaning:
        "A lot is being built in silence. The quiet nature of this stage doesn't reflect the scale of what's happening, it's one of the most developmentally significant periods of the entire pregnancy.",
    },
    {
      id: "emotional",
      label: "Emotionally",
      intro:
        "The emotional experience of the first trimester is often complex and rarely simple. You might feel:",
      points: [
        "Excitement mixed with anxiety, sometimes at the same time",
        "Unreal, as though it hasn't fully landed yet",
        "Protective about sharing news, especially before 12 weeks",
        "Guilt about not feeling more positive, if symptoms feel hard",
        "Unsure what 'normal' is supposed to feel like",
      ],
      meaning:
        "There is no single correct emotional response to pregnancy. Some people feel profound joy immediately; others feel numb, anxious, or somewhere in between. All of these are valid.",
    },
    {
      id: "uncertainty",
      label: "Uncertainty",
      intro:
        "Many people describe the first trimester as the most uncertain phase. Common experiences include:",
      points: [
        "Worrying about miscarriage before the 12-week mark",
        "Waiting for scans that confirm the pregnancy is progressing",
        "Searching for reassurance after every symptom change",
        "Feeling like you can't fully relax or celebrate yet",
      ],
      meaning:
        "This uncertainty is not a sign of something being wrong, it's a natural response to a situation where you have limited information and limited control. It tends to ease as the pregnancy progresses.",
    },
  ],

  difficulties: {
    title: "What can feel difficult in this stage",
    intro:
      "The first trimester has its own particular challenges, many of which are rarely talked about.",
    items: [
      {
        label: "Keeping a secret when you feel ill",
        body: "Most people wait until after the 12-week scan to share the news, but nausea, exhaustion, and early symptoms can be hard to explain without disclosing the reason.",
      },
      {
        label: "Not knowing if things are progressing normally",
        body: "Between a positive test and the first scan, there may be several weeks of uncertainty. Without visible change or scans, many people find this waiting period hard.",
      },
      {
        label: "Exhaustion that goes unexplained",
        body: "First trimester fatigue can be extreme. Because you may not be sharing your news yet, it can feel isolating to be this tired without a reason you can share.",
      },
      {
        label: "The gap between expectation and experience",
        body: "Pregnancy can feel very different from what you imagined. This is normal, but the mismatch can be disorienting.",
      },
    ],
    closing:
      "These experiences are part of the first trimester for many people. You don't need to minimise them.",
  },

  normal: {
    normalItems: [
      "Nausea at any time of day, or no nausea at all",
      "Extreme tiredness, especially in weeks 6-10",
      "Symptoms that come and go unpredictably",
      "Mild cramping as the uterus begins to grow",
      "Feeling emotional without a clear reason",
      "Bloating, food aversions, or heightened smell sensitivity",
    ],
    seekSupport: [
      "Severe vomiting that prevents you from keeping fluids down",
      "Heavy bleeding or severe cramping",
      "Sharp or intense one-sided pain",
      "Any significant concern that isn't settled by your midwife or GP",
    ],
    disclaimer:
      "This is not medical advice. If you have any concerns about your pregnancy, always consult your midwife, doctor, or healthcare provider.",
  },

  focus: [
    "Booking your first midwife appointment if you haven't already",
    "Taking folic acid, ideally 400mcg daily until week 12",
    "Giving yourself permission to rest",
    "Not trying to read too far ahead",
    "Attending your 12-week scan when the time comes",
    "Being kind to yourself if symptoms are hard",
  ],
  focusClosing: "You don't need to optimise pregnancy. One week at a time is enough.",

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
      q: "When do symptoms start in pregnancy?",
      sub: "Understanding early pregnancy signals",
    },
    {
      q: "Is it normal to feel no symptoms at all?",
      sub: "On the absence of early signs",
    },
    {
      q: "What happens at the 12-week scan?",
      sub: "What to expect at your first scan",
    },
    {
      q: "Why do symptoms appear and disappear?",
      sub: "Variation in early pregnancy",
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
  tagline: "Growth & Increasing Awareness",
  heroSubtitle:
    "Often described as the 'easier' trimester, the second stage brings a shift, physically, emotionally, and in how real the pregnancy begins to feel. Weeks 13 through 27.",
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
  range: "Weeks 28-40",
  weekStart: 28,
  weekEnd: 40,
  tagline: "Preparation & Arrival",
  heroSubtitle:
    "The final stretch of pregnancy, physically demanding, emotionally complex, and full of preparation for what comes next. Weeks 28 through 40.",
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
