// ─── Pregnancy Topic Landing Data ─────────────────────────────────────────
// Per-topic config for the reusable PregnancyTopicPage template.
// Each topic sits between /pregnancy and individual /articles/* pages.

export type PregnancyTopicSlug =
  | "body"
  | "baby"
  | "feelings"
  | "health-and-safety"
  | "diet-and-exercise"
  | "preparing-for-baby";

export interface TopicLink {
  label: string;
  href: string;
  image?: string;
}

export interface TopicGroup {
  label: string;
  description?: string;
  links: TopicLink[];
}

export interface TopicStartHere {
  title: string;
  href: string;
  why: string;
  image?: string;
}

export interface PregnancyTopicPageConfig {
  slug: PregnancyTopicSlug;
  eyebrow: string;
  title: string;
  intro: string;
  heroImage?: string;

  whatThisCovers: {
    lead: string;
    bullets: string[];
  };

  startHere: TopicStartHere[];
  groups: TopicGroup[];

  weekBridge?: {
    line: string;
    href: string;
    label: string;
  };

  showSiblings?: boolean;
  showAI?: boolean;
  aiPrompts?: string[];
}

// All sibling routes — used for the lateral siblings row.
// Routes that don't yet exist render as quiet, non-link labels.
export const PREGNANCY_TOPICS: { slug: PregnancyTopicSlug; eyebrow: string }[] = [
  { slug: "body", eyebrow: "Your body" },
  { slug: "baby", eyebrow: "Your baby" },
  { slug: "feelings", eyebrow: "Your feelings" },
  { slug: "health-and-safety", eyebrow: "Health & safety" },
  { slug: "diet-and-exercise", eyebrow: "Diet & exercise" },
  { slug: "preparing-for-baby", eyebrow: "Preparing for baby" },
];

// Slugs that already have a built landing page. Keeps siblings honest.
export const LIVE_TOPIC_SLUGS: PregnancyTopicSlug[] = ["body", "baby", "feelings", "health-and-safety", "diet-and-exercise", "preparing-for-baby"];

export const pregnancyTopicConfigs: Record<PregnancyTopicSlug, PregnancyTopicPageConfig | null> = {
  body: {
    slug: "body",
    eyebrow: "Your body",
    title: "Your body in pregnancy",
    intro:
      "Pregnancy reshapes your body in stages — sometimes loudly, sometimes so quietly you almost miss it. This is a steady place to understand what's changing, what's usually normal, and what's worth a closer look.",

    whatThisCovers: {
      lead: "What this topic covers:",
      bullets: [
        "The earliest signs, from the days before a missed period through the first weeks.",
        "Morning sickness, nausea, and the symptoms most people meet at some point.",
        "How energy, sleep, and stamina shift as pregnancy settles in.",
        "The way your body changes across the first, second, and third trimesters.",
        "Signs that are common — and signs worth checking — without overstating either.",
      ],
    },

    startHere: [
      {
        title: "Early pregnancy symptoms explained",
        href: "/articles/early-pregnancy-symptoms-explained",
        why: "A grounded overview of what tends to appear first, and what those early signals usually mean.",
      },
      {
        title: "Complete guide to morning sickness",
        href: "/articles/complete-guide-morning-sickness",
        why: "The fullest picture of nausea in pregnancy — why it happens, when it eases, and what helps.",
      },
    ],

    groups: [
      {
        label: "Nausea, fatigue and the early weeks",
        description: "The symptoms that tend to define the first trimester.",
        links: [
          { label: "Complete guide to morning sickness", href: "/articles/complete-guide-morning-sickness" },
          { label: "Fatigue in early pregnancy", href: "/articles/fatigue-in-early-pregnancy" },
          { label: "Sleep in pregnancy", href: "/articles/sleep-in-pregnancy" },
        ],
      },
      {
        label: "Across the trimesters",
        description: "How your body tends to shift as pregnancy moves on.",
        links: [
          { label: "The first trimester: a complete guide", href: "/articles/first-trimester-complete-guide" },
          { label: "The second trimester: a complete guide", href: "/articles/second-trimester-complete-guide" },
          { label: "The third trimester: a complete guide", href: "/articles/third-trimester-complete-guide" },
        ],
      },
      {
        label: "Aches, pains and physical symptoms",
        description: "The everyday physical symptoms of pregnancy — what tends to be normal, what helps, and when to ask for support.",
        links: [
          { label: "Back pain in pregnancy", href: "/articles/back-pain-in-pregnancy" },
          { label: "Pelvic pain in pregnancy", href: "/articles/pelvic-pain-in-pregnancy" },
          { label: "Round ligament pain", href: "/articles/round-ligament-pain" },
          { label: "Braxton Hicks contractions", href: "/articles/braxton-hicks-contractions" },
          { label: "Swelling in pregnancy", href: "/articles/swelling-in-pregnancy" },
          { label: "Itching in pregnancy", href: "/articles/itching-in-pregnancy" },
          { label: "Leg cramps in pregnancy", href: "/articles/leg-cramps-in-pregnancy" },
          { label: "Dizziness and feeling faint in pregnancy", href: "/articles/dizziness-and-feeling-faint-in-pregnancy" },
        ],
      },
      {
        label: "Digestion and comfort",
        description: "How digestion shifts in pregnancy, and what gently helps.",
        links: [
          { label: "Heartburn in pregnancy", href: "/articles/heartburn-in-pregnancy" },
          { label: "Constipation in pregnancy", href: "/articles/constipation-in-pregnancy" },
        ],
      },
      {
        label: "Bleeding, cramps and discharge",
        description: "The reassurance cluster — what's usually normal, what's worth a call, held calmly.",
        links: [
          { label: "Bleeding in early pregnancy", href: "/articles/bleeding-in-early-pregnancy" },
          { label: "Spotting in pregnancy", href: "/articles/spotting-in-pregnancy" },
          { label: "When to worry about cramps in pregnancy", href: "/articles/when-to-worry-about-cramps-in-pregnancy" },
          { label: "Discharge in pregnancy", href: "/articles/discharge-in-pregnancy" },
          { label: "Watery discharge in pregnancy", href: "/articles/watery-discharge-in-pregnancy" },
          { label: "Leaking fluid in pregnancy", href: "/articles/leaking-fluid-in-pregnancy" },
        ],
      },
      {
        label: "Late pregnancy and early labour signs",
        description: "The body shifts that tend to arrive as labour gets closer.",
        links: [
          { label: "Mucus plug", href: "/articles/mucus-plug" },
          { label: "The show in pregnancy", href: "/articles/show-in-pregnancy" },
          { label: "Signs of labour", href: "/articles/signs-of-labour" },
          { label: "Stages of labour", href: "/articles/stages-of-labour" },
          { label: "When to go in for labour", href: "/articles/when-to-go-in-for-labour" },
        ],
      },
    ],


    weekBridge: {
      line: "Your body shifts week by week.",
      href: "/pregnancy#week-by-week",
      label: "See the week-by-week view",
    },

    showSiblings: true,
    showAI: false,
  },

  // Other topics not yet built.
  baby: {
    slug: "baby",
    eyebrow: "Your baby",
    title: "Your baby in pregnancy",
    intro:
      "From a cluster of cells to a small person who turns toward your voice — your baby's growth across pregnancy is quieter and more astonishing than most week-by-week summaries let on. This is a steady place to follow what's developing, when the big shifts happen, and what you might start to feel along the way.",

    whatThisCovers: {
      lead: "What this topic covers:",
      bullets: [
        "How your baby develops from the earliest weeks onward.",
        "The major shifts that tend to define each trimester.",
        "When movement begins, and how it changes as pregnancy goes on.",
        "The broader picture of growth, rather than a chase of weekly milestones.",
      ],
    },

    startHere: [
      {
        title: "How your baby develops in pregnancy",
        href: "/articles/how-your-baby-develops-in-pregnancy",
        why: "The cornerstone view — how growth unfolds across the whole pregnancy, without turning into a weekly chase.",
      },
    ],

    groups: [
      {
        label: "Movement",
        description: "When movement begins, how it changes, and the moments worth raising.",
        links: [
          { label: "Baby movement in pregnancy", href: "/articles/baby-movement-in-pregnancy" },
          { label: "Reduced movements in pregnancy", href: "/articles/reduced-movements-in-pregnancy" },
          { label: "Baby hiccups in the womb", href: "/articles/baby-hiccups-in-the-womb" },
        ],
      },
      {
        label: "Position and the placenta",
        description: "Common scan findings about how baby is lying and where the placenta sits.",
        links: [
          { label: "Anterior placenta", href: "/articles/anterior-placenta" },
          { label: "Breech baby", href: "/articles/breech-baby" },
          { label: "Cord around the neck in pregnancy", href: "/articles/cord-around-the-neck-in-pregnancy" },
        ],
      },
      {
        label: "Growth, scans and multiples",
        description: "How your baby's growth is monitored, what scan findings mean, and what's a little different with more than one baby.",
        links: [
          { label: "Measuring big or small in pregnancy", href: "/articles/measuring-big-or-small-in-pregnancy" },
          { label: "Growth scans in pregnancy", href: "/articles/growth-scans-in-pregnancy" },
          { label: "Tests and scans in pregnancy", href: "/articles/tests-and-scans-in-pregnancy" },
          { label: "Twins and multiples in pregnancy", href: "/articles/twins-and-multiples-in-pregnancy" },
        ],
      },
    ],


    weekBridge: {
      line: "Your baby grows in steady, sometimes startling jumps.",
      href: "/pregnancy#week-by-week",
      label: "See the week-by-week view",
    },

    showSiblings: true,
    showAI: false,
  },
  feelings: {
    slug: "feelings",
    eyebrow: "Your feelings",
    title: "Your feelings in pregnancy",
    intro:
      "Pregnancy is an emotional season as much as a physical one — and the feelings rarely arrive in the order, or the shape, you expect. This is a steady place to make sense of what's moving inside you: the hope and the unease, the days that feel ordinary, the days that don't. Not therapy, not performance. Just honest, humane company for the inner side of pregnancy.",

    whatThisCovers: {
      lead: "What this topic covers:",
      bullets: [
        "How pregnancy can feel emotionally — the texture, not just the headlines.",
        "Anxiety and uncertainty, and where the line between worry and overwhelm tends to sit.",
        "The first trimester emotionally — the strange, in-between weeks before much shows.",
        "When joy is delayed, mixed, or absent — and what that often does, and doesn't, mean.",
        "Pregnancy after loss as a distinct emotional experience that needs its own care.",
      ],
    },

    startHere: [
      {
        title: "Anxiety in pregnancy",
        href: "/articles/anxiety-in-pregnancy",
        why: "A grounded look at worry in pregnancy, where it sits within normal, and when extra support tends to help.",
      },
      {
        title: "The first trimester emotionally",
        href: "/articles/the-first-trimester-emotionally",
        why: "The emotional texture of the earliest weeks — quieter than people warn you about, stranger than they tell you.",
      },
    ],

    groups: [
      {
        label: "Emotional wellbeing",
        description: "The wider picture, and the emotionally specific weeks of the first trimester.",
        links: [
          { label: "Emotional wellbeing in pregnancy", href: "/articles/emotional-wellbeing-pregnancy" },
          { label: "The first trimester emotionally", href: "/articles/the-first-trimester-emotionally" },
        ],
      },
      {
        label: "Anxiety and uncertainty",
        description: "Worry, unease, and the days when the joy doesn't quite arrive.",
        links: [
          { label: "Anxiety in pregnancy", href: "/articles/anxiety-in-pregnancy" },
          { label: "When the joy doesn't arrive yet", href: "/articles/when-the-joy-doesnt-arrive-yet" },
        ],
      },
      {
        label: "Preparing for what comes next",
        description: "Holding fear, hope, and the harder chapters as birth gets closer.",
        links: [
          { label: "Preparing emotionally for birth", href: "/articles/preparing-emotionally-for-birth" },
          { label: "Pregnancy after loss", href: "/articles/pregnancy-after-loss" },
        ],
      },
    ],


    showSiblings: true,
    showAI: false,
  },
  "health-and-safety": {
    slug: "health-and-safety",
    eyebrow: "Health and safety",
    title: "Health and safety in pregnancy",
    intro:
      "Pregnancy brings a steady stream of small questions — about scans, vaccinations, medicines, and the moments that feel worth checking. This is a calm place to find clear, honest answers, the kind that help you feel steadier rather than more wary, and that support the conversations you'll have with your midwife or doctor.",

    whatThisCovers: {
      lead: "What this topic covers:",
      bullets: [
        "The tests and scans usually offered through pregnancy, and what they're for.",
        "Vaccinations recommended in pregnancy and the thinking behind them.",
        "Medicines in pregnancy, and how to make safer decisions about them.",
        "Staying well day to day — body changes, energy, and small habits that help.",
        "When something is worth raising with your midwife, GP, or maternity unit.",
      ],
    },

    startHere: [
      {
        title: "Tests and scans in pregnancy",
        href: "/articles/tests-and-scans-in-pregnancy",
        why: "A grounded overview of the appointments, screenings, and scans you're likely to be offered.",
      },
      {
        title: "Vaccinations in pregnancy",
        href: "/articles/vaccinations-in-pregnancy",
        why: "Why certain vaccinations are recommended, when they're given, and what to expect.",
      },
      {
        title: "Medicines in pregnancy",
        href: "/articles/medicines-in-pregnancy",
        why: "How to think about everyday medicines, and who to ask when you're not sure.",
      },
    ],

    groups: [
      {
        label: "Appointments, scans and screening",
        description: "What's offered through pregnancy — the appointments, the scans, the screening tests, and what each one is looking for.",
        links: [
          { label: "Tests and scans in pregnancy", href: "/articles/tests-and-scans-in-pregnancy" },
          { label: "What happens at the booking appointment", href: "/articles/what-happens-at-booking-appointment" },
          { label: "Dating scan", href: "/articles/dating-scan" },
          { label: "Combined screening test", href: "/articles/combined-screening-test" },
          { label: "NIPT in pregnancy", href: "/articles/nipt-in-pregnancy" },
          { label: "20-week anomaly scan", href: "/articles/20-week-anomaly-scan" },
          { label: "Glucose tolerance test", href: "/articles/glucose-tolerance-test" },
          { label: "Gestational diabetes", href: "/articles/gestational-diabetes" },
          { label: "hCG levels explained", href: "/articles/hcg-levels-explained" },
          { label: "Anti-D injection in pregnancy", href: "/articles/anti-d-injection-in-pregnancy" },
          { label: "What if a scan shows something unexpected", href: "/articles/what-if-a-scan-shows-something-unexpected" },
        ],
      },
      {
        label: "Medicines and vaccinations",
        description: "The everyday questions — what's safe, what to avoid, and what helps when you're unwell.",
        links: [
          { label: "Medicines in pregnancy", href: "/articles/medicines-in-pregnancy" },
          { label: "Vaccinations in pregnancy", href: "/articles/vaccinations-in-pregnancy" },
          { label: "Paracetamol in pregnancy", href: "/articles/paracetamol-in-pregnancy" },
          { label: "Antibiotics in pregnancy", href: "/articles/antibiotics-in-pregnancy" },
          { label: "Antacids in pregnancy", href: "/articles/antacids-in-pregnancy" },
          { label: "Laxatives in pregnancy", href: "/articles/laxatives-in-pregnancy" },
          { label: "Hay fever in pregnancy", href: "/articles/hay-fever-in-pregnancy" },
          { label: "Cold and flu in pregnancy", href: "/articles/cold-and-flu-in-pregnancy" },
          { label: "UTI in pregnancy", href: "/articles/uti-in-pregnancy" },
          { label: "Thrush in pregnancy", href: "/articles/thrush-in-pregnancy" },
          { label: "Diarrhoea and tummy bugs in pregnancy", href: "/articles/diarrhoea-and-tummy-bugs-in-pregnancy" },
        ],
      },
      {
        label: "Bleeding and reassurance",
        description: "The symptoms that prompt the most worry — held calmly, with clear guidance on when to call.",
        links: [
          { label: "Bleeding in early pregnancy", href: "/articles/bleeding-in-early-pregnancy" },
          { label: "When to worry about cramps in pregnancy", href: "/articles/when-to-worry-about-cramps-in-pregnancy" },
          { label: "Leaking fluid in pregnancy", href: "/articles/leaking-fluid-in-pregnancy" },
        ],
      },
      {
        label: "Staying well day to day",
        description: "The wider, in-between guidance for ordinary pregnancy days.",
        links: [
          { label: "Weight changes in pregnancy", href: "/articles/weight-changes-in-pregnancy" },
          { label: "Hair dye and beauty treatments in pregnancy", href: "/articles/hair-dye-and-beauty-treatments-in-pregnancy" },
          { label: "Sex during pregnancy", href: "/articles/sex-during-pregnancy" },
        ],
      },
    ],


    showSiblings: true,
    showAI: false,
  },
  "diet-and-exercise": {
    slug: "diet-and-exercise",
    eyebrow: "Diet and exercise",
    title: "Diet and exercise in pregnancy",
    intro:
      "Eating, moving, and looking after your energy in pregnancy doesn't need to become another set of rules. This is a calm place to think about food and movement as part of daily care — useful, grounded, and shaped around the realities of how pregnancy actually feels rather than how it's often presented.",

    whatThisCovers: {
      lead: "What this topic covers:",
      bullets: [
        "Eating well in pregnancy without overcomplicating it.",
        "The nutrients that genuinely matter most, and where they come from.",
        "Moving your body in ways that feel realistic and supportive.",
        "Foods that are best avoided, and the much longer list that's still fine.",
        "The days when nausea, aversions, or low appetite make eating harder.",
      ],
    },

    startHere: [
      {
        title: "Foods to avoid in pregnancy",
        href: "/articles/foods-to-avoid-in-pregnancy",
        why: "The shorter-than-it-feels list, and what's still completely fine to eat.",
      },
      {
        title: "Eating well in pregnancy",
        href: "/articles/eating-well-in-pregnancy",
        why: "What good eating in pregnancy actually looks like — without rules, plans, or guilt.",
      },
      {
        title: "Moving your body in pregnancy",
        href: "/articles/moving-your-body-in-pregnancy",
        why: "Realistic, encouraging guidance on movement, with a clear word on what to adapt.",
      },
    ],

    groups: [
      {
        label: "Eating well",
        description: "Steady, practical food guidance for ordinary days.",
        links: [
          { label: "Eating well in pregnancy", href: "/articles/eating-well-in-pregnancy" },
          { label: "Foods to avoid in pregnancy", href: "/articles/foods-to-avoid-in-pregnancy" },
          { label: "Key nutrients in pregnancy", href: "/articles/key-nutrients-in-pregnancy" },
          { label: "Caffeine in pregnancy", href: "/articles/caffeine-in-pregnancy" },
          { label: "Hydration in pregnancy", href: "/articles/hydration-in-pregnancy" },
        ],
      },
      {
        label: "Movement and exercise",
        description: "What's usually safe, what to adapt, and what to leave for now.",
        links: [
          { label: "Moving your body in pregnancy", href: "/articles/moving-your-body-in-pregnancy" },
          { label: "Exercise safety by trimester", href: "/articles/exercise-safety-by-trimester" },
          { label: "Pelvic floor exercises in pregnancy", href: "/articles/pelvic-floor-exercises-in-pregnancy" },
        ],
      },
      {
        label: "When food feels hard",
        description: "For the days nausea, aversions, or low appetite get in the way.",
        links: [
          { label: "Cravings and aversions in pregnancy", href: "/articles/cravings-and-aversions-in-pregnancy" },
          { label: "When you can't face food in pregnancy", href: "/articles/when-you-cant-face-food-in-pregnancy" },
          { label: "Complete guide to morning sickness", href: "/articles/complete-guide-morning-sickness" },
        ],
      },
    ],

    showSiblings: true,
    showAI: false,
  },
  "preparing-for-baby": {
    slug: "preparing-for-baby",
    eyebrow: "Preparing for baby",
    title: "Preparing for baby",
    intro:
      "Getting ready for a baby doesn't need to become another long list. This is a calm place to think about birth, the home you'll bring your baby into, and the early days ahead — practical where it helps, gentle where it matters more, and clear about what can wait.",

    whatThisCovers: {
      lead: "What this topic covers:",
      bullets: [
        "Getting ready in practical ways, without turning preparation into pressure.",
        "Birth planning as a conversation, not a contract.",
        "What your baby actually needs in the first weeks — and what they really don't.",
        "The space your baby will come home to, kept simple.",
        "The early days after birth as something you can prepare for gently.",
      ],
    },

    startHere: [
      {
        title: "Preparing for baby: complete guide",
        href: "/preparing-for-baby",
        why: "The wider orientation hub — what to think about, when, and what can wait.",
      },
      {
        title: "Birth preferences: how to make a plan that helps rather than disappoints",
        href: "/articles/birth-preferences",
        why: "How to think through preferences for birth without locking yourself in.",
      },
      {
        title: "The space your baby will come home to",
        href: "/articles/the-space-your-baby-will-come-home-to",
        why: "What actually matters about your home setup — and what doesn't.",
      },
    ],

    groups: [
      {
        label: "Getting ready for baby",
        description: "The wider orientation, the home you'll bring your baby into, and the emotional side of the run-up to birth.",
        links: [
          { label: "Preparing for baby: complete guide", href: "/preparing-for-baby" },
          { label: "The space your baby will come home to", href: "/articles/the-space-your-baby-will-come-home-to" },
          { label: "Preparing emotionally for birth", href: "/articles/preparing-emotionally-for-birth" },
          { label: "Baby clothes and newborn essentials", href: "/articles/baby-clothes-and-newborn-essentials" },
          { label: "Preparing siblings for a new baby", href: "/articles/preparing-siblings-for-a-new-baby" },
          { label: "What to buy for a new baby", href: "/articles/what-to-buy-for-a-new-baby" },
          { label: "Preparing for baby: a calm, complete guide", href: "/articles/preparing-for-baby-complete-guide" },
        ],
      },
      {
        label: "Birth planning",
        description: "Thinking through preferences without overplanning.",
        links: [
          { label: "Birth preferences: how to make a plan that helps rather than disappoints", href: "/articles/birth-preferences" },
          { label: "Hospital bag and what to pack", href: "/articles/hospital-bag-and-what-to-pack" },
          { label: "Caesarean birth", href: "/articles/caesarean-birth" },
        ],
      },
      {
        label: "Late-pregnancy decisions",
        description: "The practical choices and conversations that tend to arrive in the final weeks.",
        links: [
          { label: "The 36-week appointment", href: "/articles/the-36-week-appointment" },
          { label: "Group B Strep in pregnancy", href: "/articles/group-b-strep-in-pregnancy" },
          { label: "External cephalic version (ECV)", href: "/articles/external-cephalic-version" },
          { label: "Membrane sweep", href: "/articles/membrane-sweep" },
          { label: "Induction of labour", href: "/articles/induction-of-labour" },
          { label: "What happens if labour doesn't start", href: "/articles/what-happens-if-labour-doesnt-start" },
          { label: "Hand expressing colostrum", href: "/articles/hand-expressing-colostrum" },
        ],
      },
      {
        label: "Practical safety and planning",
        description: "The practical decisions that quietly matter around bringing your baby home.",
        links: [
          { label: "Safe sleep basics", href: "/articles/safe-sleep-basics" },
          { label: "Car seat basics", href: "/articles/car-seat-basics" },
          { label: "Maternity leave planning", href: "/articles/maternity-leave-planning" },
        ],
      },
    ],


    showSiblings: true,
    showAI: false,
  },
};

// ─── Topic Map Cards ──────────────────────────────────────────────────────
// Single source of truth for the PregnancyTopicMap on /pregnancy.
// Labels match the approved benchmark coverage map. Destinations are honest:
// either a live topic landing page, or — for not-yet-built landings — the
// strongest live cornerstone article. No legacy /guidance?... bridges.

export interface TopicMapArticleLink {
  label: string;
  href: string;
}

export interface TopicMapEntry {
  slug: PregnancyTopicSlug;
  label: string;
  supportLine: string;
  mainHref: string;
  mainLabel: string;
  /** True if mainHref points to a live topic landing page. */
  hasLanding: boolean;
  articles: TopicMapArticleLink[];
}

export const topicMapEntries: TopicMapEntry[] = [
  {
    slug: "body",
    label: "Your body",
    supportLine: "Symptoms, aches, and the reassurance moments — held calmly.",
    mainHref: "/pregnancy/body",
    mainLabel: "Explore your body in pregnancy",
    hasLanding: true,
    articles: [
      { label: "Morning sickness", href: "/articles/complete-guide-morning-sickness" },
      { label: "Pelvic pain in pregnancy", href: "/articles/pelvic-pain-in-pregnancy" },
      { label: "Bleeding in early pregnancy", href: "/articles/bleeding-in-early-pregnancy" },
      { label: "Signs of labour", href: "/articles/signs-of-labour" },
    ],
  },
  {
    slug: "baby",
    label: "Your baby",
    supportLine: "Growth, movement, placenta, and the things scans pick up.",
    mainHref: "/pregnancy/baby",
    mainLabel: "Explore your baby in pregnancy",
    hasLanding: true,
    articles: [
      { label: "How your baby develops in pregnancy", href: "/articles/how-your-baby-develops-in-pregnancy" },
      { label: "Baby movement in pregnancy", href: "/articles/baby-movement-in-pregnancy" },
      { label: "Reduced movements in pregnancy", href: "/articles/reduced-movements-in-pregnancy" },
      { label: "Anterior placenta", href: "/articles/anterior-placenta" },
    ],
  },
  {
    slug: "feelings",
    label: "Your feelings",
    supportLine: "The emotional side of pregnancy, held with care.",
    mainHref: "/pregnancy/feelings",
    mainLabel: "Explore your feelings in pregnancy",
    hasLanding: true,
    articles: [
      { label: "Anxiety in pregnancy", href: "/articles/anxiety-in-pregnancy" },
      { label: "The first trimester emotionally", href: "/articles/the-first-trimester-emotionally" },
      { label: "When the joy doesn't arrive yet", href: "/articles/when-the-joy-doesnt-arrive-yet" },
    ],
  },
  {
    slug: "health-and-safety",
    label: "Health & safety",
    supportLine: "Appointments, scans, medicines, and the questions worth raising.",
    mainHref: "/pregnancy/health-and-safety",
    mainLabel: "Explore health and safety in pregnancy",
    hasLanding: true,
    articles: [
      { label: "What happens at the booking appointment", href: "/articles/what-happens-at-booking-appointment" },
      { label: "20-week anomaly scan", href: "/articles/20-week-anomaly-scan" },
      { label: "Medicines in pregnancy", href: "/articles/medicines-in-pregnancy" },
      { label: "Bleeding in early pregnancy", href: "/articles/bleeding-in-early-pregnancy" },
    ],
  },
  {
    slug: "diet-and-exercise",
    label: "Diet & exercise",
    supportLine: "Eating well, moving safely, and caring for yourself day to day.",
    mainHref: "/pregnancy/diet-and-exercise",
    mainLabel: "Explore diet and exercise in pregnancy",
    hasLanding: true,
    articles: [
      { label: "Eating well in pregnancy", href: "/articles/eating-well-in-pregnancy" },
      { label: "Moving your body in pregnancy", href: "/articles/moving-your-body-in-pregnancy" },
      { label: "Key nutrients in pregnancy", href: "/articles/key-nutrients-in-pregnancy" },
      { label: "When you can't face food in pregnancy", href: "/articles/when-you-cant-face-food-in-pregnancy" },
    ],
  },
  {
    slug: "preparing-for-baby",
    label: "Preparing for baby",
    supportLine: "Birth, late-pregnancy decisions, and getting ready for what comes next.",
    mainHref: "/pregnancy/preparing-for-baby",
    mainLabel: "Explore preparing for baby",
    hasLanding: true,
    articles: [
      { label: "Birth preferences: how to make a plan that helps rather than disappoints", href: "/articles/birth-preferences" },
      { label: "The 36-week appointment", href: "/articles/the-36-week-appointment" },
      { label: "Induction of labour", href: "/articles/induction-of-labour" },
      { label: "Hospital bag and what to pack", href: "/articles/hospital-bag-and-what-to-pack" },
    ],
  },
];

