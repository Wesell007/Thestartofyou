// ─── Article Data ──────────────────────────────────────────────────────────
// Structured content for answer-first article pages.
// Route: /articles/:slug

import type { PregnancyTopicSlug } from "@/data/pregnancyTopicData";

export interface ArticleRelatedLink {
  label: string;
  href: string;
  context?: string;
}

export interface ArticleWhatSection {
  heading: string;
  body: string;
}

export interface ArticleFAQItem {
  question: string;
  answer: string;
}

export interface ArticleCompareItem {
  label: string;
  points: string[];
}

export interface ArticleCompare {
  heading: string;
  description: string;
  items: [ArticleCompareItem, ArticleCompareItem];
  commonConfusion?: string;
  whenToSeekHelp?: string;
}

export interface EditorialSubsection {
  subheading: string;
  paragraphs: string[];
}

export interface EditorialSection {
  id: string;
  heading: string;
  lead?: string;
  paragraphs?: string[];
  subsections?: EditorialSubsection[];
  callout?: { tone: "reassurance" | "info" | "gentle-warning"; text: string };
}

export type ProductPromotionLevel = "strong" | "light" | "minimal" | "none";

export interface ArticleData {
  slug: string;
  title: string;
  metaDescription: string;

  // Quick answer, featured-snippet style
  quickAnswer: string;

  // How this can feel, emotional bridge
  howThisFeels: string[];

  // Core explanation, what's happening
  whatHappening: {
    commonCauses: ArticleWhatSection[];
    lessCauses: ArticleWhatSection[];
    whyItVaries: string;
  };

  // Timing layer
  timing: {
    whenStarts: string;
    whenPeaks?: string;
    whenEases: string;
  };

  // Real experience
  whatItFeelsLike: string[];

  // Interpretation
  whatThisMeans: string;

  // Normal vs seek support
  normal: string[];
  seekSupport: string[];
  disclaimer: string;

  // Action
  whatYouCanDo: Array<{ action: string; reason: string }>;

  // What happens next
  whatHappensNext: string;

  // Related stage links
  relatedStage: {
    intro: string;
    links: ArticleRelatedLink[];
  };

  // AI prompts
  aiPrompts: string[];

  // Product capture copy
  captureIntro: string;

  // Tags for cross-linking
  trimester?: (1 | 2 | 3)[];
  relatedWeeks?: number[];
  relatedSlugs?: string[];

  // FAQ for AEO
  faq?: ArticleFAQItem[];

  // Compare section for GEO
  compare?: ArticleCompare;

  // Cornerstone / pillar article link
  cornerstoneSlug?: string;

  // Is this a cornerstone article?
  isCornerstone?: boolean;

  // Journey tags for library
  journey?: string[];
  topics?: string[];

  // Deep article features
  keyTakeaways?: string[];
  inThisArticle?: string[];
  sources?: string[];
  lastUpdated?: string;
  reviewedBy?: string;

  // Editorial prose sections for deep articles
  editorialSections?: EditorialSection[];

  // Product promotion level
  productPromotion?: ProductPromotionLevel;

  // ── New unified deep article template fields (additive) ──
  // Parent topic page (drives breadcrumb + topic return on the new template)
  topic?: PregnancyTopicSlug;
  // One-line italic dek under the H1
  standfirst?: string;
  // Contained hero image — alt is REQUIRED for real photographs.
  hero?: { src: string; alt: string; credit?: string };
}

// ─── Article database ──────────────────────────────────────────────────────

const articleDatabase: ArticleData[] = [

  // ─── NAUSEA IN EARLY PREGNANCY ────────────────────────────────────────────
  {
    slug: "nausea-in-early-pregnancy",
    title: "Nausea in early pregnancy: what it is, why it happens, and when it eases",
    metaDescription: "Why does early pregnancy cause nausea? When does it start, peak, and ease, and what can you do? Clear, reassuring guidance on morning sickness.",
    quickAnswer:
      "Nausea in early pregnancy is caused by rapidly rising levels of hCG, the hormone your body produces after implantation. It is one of the most common symptoms of the first trimester and, while it can feel intense, it is not usually a sign that anything is wrong. Both strong nausea and very mild nausea fall within the range of normal.",
    howThisFeels: [
      "Searching \"is it normal to feel this sick\" at 6am",
      "Wondering whether feeling fine is something to worry about",
      "Managing daily life while feeling significantly unwell",
      "Not knowing how long this will last, or if it will get worse",
      "The strange guilt of not enjoying something you wanted",
    ],
    whatHappening: {
      commonCauses: [
        {
          heading: "Rising hCG levels",
          body: "Human chorionic gonadotropin, the pregnancy hormone, begins increasing rapidly after implantation. hCG directly triggers the nausea centres in the brain, which is why nausea typically starts around week 5-6 when levels are climbing fastest.",
        },
        {
          heading: "Rising progesterone",
          body: "Progesterone slows digestion throughout the body. This slowing can lead to bloating, nausea, and a feeling of fullness, particularly on an empty stomach.",
        },
        {
          heading: "Heightened smell sensitivity",
          body: "Oestrogen amplifies your sense of smell in early pregnancy. Smells that were previously neutral can trigger nausea, sometimes before you've noticed any other symptoms.",
        },
      ],
      lessCauses: [
        {
          heading: "Blood sugar fluctuation",
          body: "Low blood sugar, particularly in the morning after overnight fasting, can intensify nausea. This is why eating small, frequent meals is often the most effective management strategy.",
        },
        {
          heading: "Increased sensitivity to certain foods",
          body: "Food aversions are common in early pregnancy. Certain foods, sometimes ones previously liked, can suddenly trigger nausea due to hormonal changes in taste and smell perception.",
        },
      ],
      whyItVaries:
        "Nausea varies significantly between people and between pregnancies for the same person. Hormone levels, sensitivity to hCG, genetics, and prior health can all affect severity. Some people experience intense nausea; others feel very little. Neither experience is more or less valid, and neither is a reliable indicator of pregnancy health.",
    },
    timing: {
      whenStarts: "Nausea typically begins around weeks 5-6, coinciding with the rapid rise in hCG levels.",
      whenPeaks: "Symptoms often feel most intense between weeks 6-9, when hCG is climbing fastest.",
      whenEases: "For many people, nausea begins to ease from weeks 12-14 as the placenta takes over hormone production and hCG levels stabilise. However, this varies, some people experience it longer, and some feel better earlier.",
    },
    whatItFeelsLike: [
      "A constant, low-level queasiness that doesn't fully go away",
      "Waves of nausea that come unpredictably, not always in the morning",
      "Certain smells triggering sudden, intense nausea",
      "Feeling fine one day and very unwell the next",
      "The strange exhaustion of feeling unwell for days or weeks on end",
    ],
    whatThisMeans:
      "Nausea in early pregnancy is not a sign that something is wrong, for most people, it is a sign that hCG levels are active and rising. The intensity of nausea is not a reliable indicator of pregnancy health. Many people with very mild or no nausea have entirely healthy pregnancies. The absence of nausea is not cause for concern unless other symptoms are present.",
    normal: [
      "Nausea at any time of day, not just the morning",
      "Symptoms that vary significantly from day to day",
      "Feeling fine some days and very unwell others",
      "Nausea that starts, stops, and returns",
      "Very mild nausea, or no nausea at all",
    ],
    seekSupport: [
      "Inability to keep any fluids down for 24 hours or more",
      "Significant weight loss due to vomiting",
      "Dark urine or signs of dehydration",
      "Vomiting blood",
      "Any concern that feels serious or is worsening",
    ],
    disclaimer:
      "This is not medical advice. Always consult your midwife, doctor, or healthcare provider with any concerns. If you're experiencing severe vomiting that prevents hydration, seek medical support, hyperemesis gravidarum is a recognised condition that can be treated.",
    whatYouCanDo: [
      { action: "Eat small, frequent meals", reason: "An empty stomach often makes nausea worse. Small meals help stabilise blood sugar and reduce the intensity of symptoms." },
      { action: "Stay hydrated with small, frequent sips", reason: "Nausea can make drinking difficult, small sips throughout the day are more manageable than large amounts at once." },
      { action: "Identify and avoid known triggers", reason: "Strong smells, certain foods, or specific environments can trigger nausea, reducing exposure where possible can help." },
      { action: "Rest", reason: "Fatigue amplifies nausea. If you can rest more, it may ease the overall intensity." },
      { action: "Try ginger or cold foods if helpful", reason: "Some people find ginger-based foods or cold, bland foods easier to manage. This is personal, find what works for you." },
    ],
    whatHappensNext:
      "For most people, nausea begins to ease between weeks 12-14 as hormone levels stabilise. Some people notice a gradual improvement; others experience a more sudden shift. If you're past 14 weeks and nausea continues, this is less common but still occurs, and is worth discussing with your midwife or doctor.",
    relatedStage: {
      intro: "Nausea is most common in the first trimester. If you're trying to understand where you are in your pregnancy:",
      links: [
        { label: "Week 5", href: "/pregnancy/week/5", context: "Week 5 is often when nausea first appears, hCG levels are beginning their rapid rise." },
        { label: "Week 6", href: "/pregnancy/week/6", context: "Week 6 is often when nausea feels most intense for many people." },
        { label: "Week 8", href: "/pregnancy/week/8", context: "Week 8 is around the peak for many, with gradual easing expected from weeks 9-12." },
        { label: "First Trimester Hub", href: "/pregnancy/first-trimester", context: "A full overview of what the first trimester is really like." },
      ],
    },
    aiPrompts: [
      "Is my nausea level normal for this stage?",
      "When should I expect nausea to ease?",
      "What can I do if nausea is affecting my daily life?",
    ],
    captureIntro: "The early weeks can feel relentless and uncertain. Many parents choose to write down what this stage was really like, not just the milestones, but the difficult days too.",
    trimester: [1],
    relatedWeeks: [5, 6, 7, 8, 9],
    relatedSlugs: ["fatigue-in-early-pregnancy", "implantation-bleeding", "first-trimester-symptoms"],
    cornerstoneSlug: "complete-guide-morning-sickness",
    journey: ["pregnancy"],
    topics: ["symptoms", "body-changes"],
    productPromotion: "strong",
    reviewedBy: "Jenny Joines",
    faq: [
      {
        question: "Is it normal to have nausea all day, not just in the morning?",
        answer: "Yes. Despite the name \"morning sickness,\" nausea can occur at any time of day. Many people experience it more in the afternoon or evening. All-day nausea is common and does not indicate a problem.",
      },
      {
        question: "Does no nausea mean something is wrong?",
        answer: "No. Many healthy pregnancies involve very little or no nausea. The absence of nausea is not a reliable indicator of pregnancy health and is not, on its own, a reason for concern.",
      },
      {
        question: "When should I see a doctor about nausea?",
        answer: "If you cannot keep fluids down for 24 hours or more, are losing weight, have dark urine, or feel that your symptoms are severe, contact your midwife or doctor. Hyperemesis gravidarum is a recognised condition that can be treated.",
      },
      {
        question: "How long does morning sickness last?",
        answer: "For most people, nausea begins around weeks 5-6 and eases between weeks 12-14. Some experience it for longer. Every pregnancy is different.",
      },
    ],
    compare: {
      heading: "Morning sickness vs hyperemesis gravidarum",
      description: "Most nausea in pregnancy is manageable, but severe cases may be hyperemesis gravidarum, a condition that requires medical support.",
      items: [
        {
          label: "Morning sickness",
          points: [
            "Nausea with or without occasional vomiting",
            "Able to keep some food and fluids down",
            "Symptoms ease with rest and small meals",
            "Usually improves by weeks 12-14",
          ],
        },
        {
          label: "Hyperemesis gravidarum",
          points: [
            "Severe, persistent vomiting multiple times a day",
            "Unable to keep fluids down",
            "Weight loss and signs of dehydration",
            "May require medical treatment or hospitalisation",
          ],
        },
      ],
      commonConfusion: "Many people worry their nausea is \"too severe\" when it is still within the normal range. The key distinction is whether you can stay hydrated.",
      whenToSeekHelp: "If you cannot keep fluids down for 24 hours, notice dark urine, feel dizzy when standing, or are losing weight, contact your midwife or doctor.",
    },
  },

  // ─── FATIGUE IN EARLY PREGNANCY ───────────────────────────────────────────
  {
    slug: "fatigue-in-early-pregnancy",
    title: "Fatigue in early pregnancy: why it happens and what to expect",
    metaDescription: "Extreme tiredness in early pregnancy is very common. Understand why it happens, when it peaks, and what you can realistically do.",
    quickAnswer:
      "Fatigue in early pregnancy is caused by a combination of rapidly rising progesterone, increased blood production, and the enormous amount of energy your body is directing toward establishing the pregnancy. It is one of the most common and most underestimated symptoms of the first trimester, and it is entirely normal to feel more exhausted than you ever have.",
    howThisFeels: [
      "Needing to sleep significantly more than usual and still feeling exhausted",
      "Not being able to explain the tiredness to people who haven't experienced it",
      "Feeling like your body isn't your own",
      "Struggling to get through a normal day",
      "Wondering if something is wrong because the tiredness feels so intense",
    ],
    whatHappening: {
      commonCauses: [
        {
          heading: "Rising progesterone",
          body: "Progesterone has a natural sedative effect on the body. Levels rise rapidly in early pregnancy, making you feel significantly more tired, particularly in the afternoon and evening.",
        },
        {
          heading: "Increased blood production",
          body: "Your body begins producing significantly more blood to support the developing pregnancy. This increases the workload on your cardiovascular system and contributes to fatigue.",
        },
        {
          heading: "Energy directed to the pregnancy",
          body: "The first trimester involves enormous biological work, establishing the placenta, developing all major organ systems, and adapting nearly every system in your body. This has a real energy cost.",
        },
      ],
      lessCauses: [
        {
          heading: "Low iron levels",
          body: "Increased blood production can reduce iron levels, contributing to fatigue. Your midwife will typically check for anaemia at your first appointment.",
        },
        {
          heading: "Low blood sugar",
          body: "Nausea and food aversions can make eating difficult, which can cause blood sugar to drop and amplify fatigue.",
        },
      ],
      whyItVaries:
        "Fatigue varies significantly between pregnancies and between people. Factors like fitness, iron levels, sleep quality, nausea severity, and general health all influence how tired you feel. Some people are significantly affected; others less so. Both experiences are normal.",
    },
    timing: {
      whenStarts: "Fatigue typically begins in the first few weeks after conception, often around weeks 4-6.",
      whenPeaks: "It is commonly most intense between weeks 6-10, when progesterone levels are highest and biological work is most intensive.",
      whenEases: "For many people, fatigue begins to improve noticeably in the second trimester, often from around weeks 12-14. However, it can return in the third trimester as physical demands increase again.",
    },
    whatItFeelsLike: [
      "A bone-deep tiredness that doesn't lift with sleep",
      "Needing significantly more sleep than usual, sometimes 10+ hours",
      "Afternoon exhaustion that makes concentrating very difficult",
      "Feeling physically heavy and slow",
      "An exhaustion that's hard to describe to people who haven't experienced it",
    ],
    whatThisMeans:
      "First trimester fatigue is not laziness, it is a physiological response to enormous biological work. Your body is doing more than you can see or feel, and the energy cost is real. Rest during this stage is not optional, it is necessary.",
    normal: [
      "Needing to sleep significantly more than usual",
      "Fatigue that doesn't improve with rest",
      "Afternoon tiredness that makes work or normal tasks very difficult",
      "Fatigue that varies from day to day",
      "Feeling exhausted but not being able to sleep well",
    ],
    seekSupport: [
      "Fatigue accompanied by rapid heartbeat or breathlessness at rest",
      "Extreme pallor or dizziness that doesn't resolve",
      "Fatigue that is worsening significantly into the second trimester",
      "Any concern worth raising with your midwife",
    ],
    disclaimer: "This is not medical advice. Always consult your midwife, doctor, or healthcare provider with any concerns.",
    whatYouCanDo: [
      { action: "Rest without guilt", reason: "First trimester fatigue is biological, rest is not laziness, it is what your body needs" },
      { action: "Prioritise sleep", reason: "Going to bed earlier and sleeping longer is appropriate right now" },
      { action: "Eat iron-rich foods", reason: "Helps support the increase in blood production and can reduce fatigue caused by low iron" },
      { action: "Reduce commitments where possible", reason: "The first trimester is not the time to push through at full capacity" },
      { action: "Accept help", reason: "If people offer support, this is a good time to take it" },
    ],
    whatHappensNext:
      "Fatigue typically improves significantly in the second trimester as progesterone levels stabilise and your body adapts to the demands of pregnancy. Many people describe weeks 13-20 as a period of restored energy. However, fatigue often returns in the third trimester as physical demands increase again.",
    relatedStage: {
      intro: "Fatigue is most intense in the first trimester. If you want to understand where you are:",
      links: [
        { label: "Week 4", href: "/pregnancy/week/4", context: "Fatigue often begins here as progesterone starts to rise." },
        { label: "Week 6", href: "/pregnancy/week/6", context: "Often when fatigue feels most significant alongside nausea." },
        { label: "Week 12", href: "/pregnancy/week/12", context: "When many people begin to notice improvement in energy." },
        { label: "First Trimester Hub", href: "/pregnancy/first-trimester", context: "A full picture of what the first trimester really involves." },
      ],
    },
    aiPrompts: [
      "Is this level of tiredness normal?",
      "When does first trimester fatigue get better?",
      "What can I do to manage fatigue while still working?",
    ],
    captureIntro: "The exhaustion of early pregnancy is real and often invisible to others. Writing down what this stage felt like creates a record of something worth remembering.",
    trimester: [1],
    relatedWeeks: [4, 5, 6, 7, 8],
    relatedSlugs: ["nausea-in-early-pregnancy", "first-trimester-symptoms"],
    cornerstoneSlug: "first-trimester-complete-guide",
    journey: ["pregnancy"],
    topics: ["symptoms", "body-changes", "emotional-wellbeing"],
    faq: [
      {
        question: "Is extreme tiredness normal in early pregnancy?",
        answer: "Yes. First trimester fatigue can be significantly more intense than anything you've experienced before. It is caused by rising progesterone and the enormous energy demands of early pregnancy.",
      },
      {
        question: "When does pregnancy fatigue get better?",
        answer: "Most people notice improvement in the second trimester, typically around weeks 12-14. Energy often returns noticeably between weeks 13-20.",
      },
      {
        question: "Can fatigue be a sign of something wrong?",
        answer: "Fatigue on its own is almost always normal. If it is accompanied by rapid heartbeat, extreme dizziness, or breathlessness at rest, speak with your midwife.",
      },
    ],
    productPromotion: "strong",
    reviewedBy: "Jenny Joines",
  },

  // ─── IMPLANTATION BLEEDING ────────────────────────────────────────────────
  {
    slug: "implantation-bleeding",
    title: "Implantation bleeding: what it is, what it looks like, and whether to worry",
    metaDescription: "What is implantation bleeding? When does it happen, what does it look like, and how does it differ from a period? Clear, reassuring guidance.",
    quickAnswer:
      "Implantation bleeding is light spotting that can occur when a fertilised egg attaches to the uterine lining, typically around 6-12 days after ovulation. It is lighter than a period, usually short-lived, and is not harmful. Not everyone experiences it, and its absence does not mean implantation hasn't occurred.",
    howThisFeels: [
      "Seeing unexpected spotting and not knowing whether it's your period or something else",
      "Searching at length trying to distinguish between implantation bleeding and a period",
      "Feeling anxious that any bleeding means something is wrong",
      "The uncertainty of not knowing whether this is the beginning of something",
      "Watching carefully and overthinking every detail",
    ],
    whatHappening: {
      commonCauses: [
        {
          heading: "Embryo embedding into the uterine lining",
          body: "When the fertilised egg implants into the lining of the uterus, it can disrupt small blood vessels. This disruption causes a small amount of bleeding, lighter and shorter than a period.",
        },
        {
          heading: "Timing in the cycle",
          body: "Implantation typically occurs 6-12 days after ovulation, which can coincide closely with when a period might be expected. This timing is a common source of confusion.",
        },
      ],
      lessCauses: [
        {
          heading: "Cervical sensitivity",
          body: "In early pregnancy, the cervix becomes more sensitive due to increased blood flow. Minor contact, such as internal examination or intercourse, can cause light spotting unrelated to implantation.",
        },
        {
          heading: "Hormonal shifts",
          body: "Early hormonal changes can sometimes cause light spotting that isn't implantation bleeding but is also not a period. This is less well understood but considered normal.",
        },
      ],
      whyItVaries:
        "Not everyone experiences implantation bleeding, estimates suggest it occurs in roughly 25-30% of pregnancies. Its absence is entirely normal and does not indicate a problem with implantation. The amount, colour, and duration can also vary significantly between people.",
    },
    timing: {
      whenStarts: "Implantation typically occurs 6-12 days after ovulation, placing bleeding approximately in the week before an expected period.",
      whenPeaks: "It usually lasts only 1-3 days and does not build in intensity.",
      whenEases: "Implantation bleeding is short-lived. If spotting continues for more than a few days or increases in flow, it is worth contacting your healthcare provider.",
    },
    whatItFeelsLike: [
      "Much lighter than a period, sometimes just a pink or brown tint when wiping",
      "Brownish discharge rather than bright red blood",
      "No progression in flow, it stays light or tails off",
      "Sometimes accompanied by mild cramping",
      "Easy to miss or dismiss as the end of a cycle",
    ],
    whatThisMeans:
      "Implantation bleeding, when it occurs, is a normal part of early pregnancy. It does not indicate a problem. However, early pregnancy bleeding can also have other causes, so any bleeding that feels different, heavier, or more persistent than described above is worth checking with your care team.",
    normal: [
      "Light pink or brown spotting for 1-3 days",
      "Spotting that doesn't increase in flow",
      "Mild cramping alongside light spotting",
      "No implantation bleeding at all",
    ],
    seekSupport: [
      "Heavy bleeding, similar to or heavier than a period",
      "Bright red bleeding that increases",
      "Severe cramping alongside any bleeding",
      "Bleeding accompanied by one-sided pain",
      "Any bleeding that concerns you, always worth raising",
    ],
    disclaimer: "This is not medical advice. Any bleeding in pregnancy is worth discussing with your midwife or doctor. If you experience heavy bleeding or severe pain, seek medical attention promptly.",
    whatYouCanDo: [
      { action: "Wait and observe", reason: "Light spotting that passes quickly and stays light is usually not cause for immediate concern" },
      { action: "Take a pregnancy test if unsure", reason: "If the spotting coincides with a missed period, a test can help clarify the situation" },
      { action: "Note the timing, colour, and flow", reason: "This information is useful if you speak to your midwife or doctor" },
      { action: "Contact your healthcare provider if bleeding increases or doesn't resolve", reason: "Any change in the pattern is worth checking" },
    ],
    whatHappensNext:
      "If implantation has occurred, hCG levels will begin rising within days, and a pregnancy test will typically read positive from around week 4. The spotting itself will pass. The weeks following implantation bring the beginning of hormonal changes that may cause early pregnancy symptoms.",
    relatedStage: {
      intro: "Implantation occurs very early in pregnancy. If you've just had a positive test or are in early pregnancy:",
      links: [
        { label: "Week 4", href: "/pregnancy/week/4", context: "Week 4 is often when a pregnancy test first turns positive, after implantation." },
        { label: "Week 5", href: "/pregnancy/week/5", context: "The first noticeable symptoms often begin around week 5." },
        { label: "First Trimester Hub", href: "/pregnancy/first-trimester", context: "A grounded overview of what the first trimester involves." },
      ],
    },
    aiPrompts: [
      "How do I know if this is implantation bleeding or my period?",
      "Is it normal to have no implantation bleeding?",
      "What should I do if I'm spotting in early pregnancy?",
    ],
    captureIntro: "Early pregnancy is full of uncertainty, questions and moments that feel significant even when small. Writing them down creates a record of how this beginning actually felt.",
    trimester: [1],
    relatedWeeks: [1, 4, 5],
    relatedSlugs: ["early-pregnancy-symptoms-explained", "nausea-in-early-pregnancy", "fatigue-in-early-pregnancy"],
    journey: ["pregnancy", "trying-to-conceive"],
    topics: ["symptoms", "safety-and-support"],
    faq: [
      {
        question: "How can I tell the difference between implantation bleeding and a period?",
        answer: "Implantation bleeding is typically lighter, shorter (1-3 days), and does not increase in flow. It is often pink or brown rather than bright red. A period usually builds in flow and lasts longer.",
      },
      {
        question: "Does everyone get implantation bleeding?",
        answer: "No. Estimates suggest roughly 25-30% of people experience it. Its absence is completely normal and does not mean implantation hasn't occurred.",
      },
      {
        question: "Can implantation bleeding be heavy?",
        answer: "True implantation bleeding is light. If you experience heavy bleeding around the time of your expected period, it may be your period or another cause. Speak with your healthcare provider if you are unsure.",
      },
    ],
    compare: {
      heading: "Implantation bleeding vs period",
      description: "Understanding the difference between implantation bleeding and a period is one of the most common questions in early pregnancy and when trying to conceive.",
      items: [
        {
          label: "Implantation bleeding",
          points: [
            "Light pink or brown spotting",
            "Lasts 1-3 days",
            "Does not increase in flow",
            "May include mild cramping",
            "Occurs 6-12 days after ovulation",
          ],
        },
        {
          label: "Period",
          points: [
            "Usually bright red, builds in flow",
            "Lasts 3-7 days typically",
            "Flow increases before tapering off",
            "Often accompanied by stronger cramping",
            "Occurs on a regular cycle pattern",
          ],
        },
      ],
      commonConfusion: "The timing is the biggest source of confusion. Implantation bleeding can occur around the same time a period is expected, making it difficult to tell the difference without a pregnancy test.",
      whenToSeekHelp: "If you experience heavy bleeding with severe pain, or bleeding that concerns you at any stage, contact your healthcare provider.",
    },
    productPromotion: "light",
    reviewedBy: "Jenny Joines",
    lastUpdated: "March 2026",
    keyTakeaways: [
      "Implantation bleeding is light spotting that can happen when an embryo embeds into the uterine lining, usually 6–12 days after ovulation",
      "It is lighter, shorter, and usually pinker or browner than a period, and does not build in flow",
      "Only around 25–30% of pregnancies involve any visible implantation bleeding — its absence is completely normal",
      "Heavier bleeding, bright red flow, or one-sided pain is a different picture and is worth a same-day call to your midwife or doctor",
    ],
    sources: [
      "NHS — Vaginal bleeding in pregnancy",
      "Tommy's — Bleeding in early pregnancy",
      "NICE — Ectopic pregnancy and miscarriage (NG126)",
      "RCOG — Information for women in early pregnancy",
    ],

    // ── New unified deep article template fields ──
    topic: "body",
    standfirst:
      "Light spotting in early pregnancy is one of the most-searched, most-worried-about signs. Here's what implantation bleeding actually looks like — and when it's worth a call.",
    hero: {
      src: new URL("../assets/article-hero-implantation-bleeding.jpg", import.meta.url).href,
      alt: "A quiet bedside table in soft morning light, with a folded knit blanket, a mug of herbal tea, a closed notebook, and a small sprig of eucalyptus.",
    },
    editorialSections: [
      {
        id: "what-implantation-bleeding-is",
        heading: "What implantation bleeding is",
        lead: "Implantation bleeding is a small amount of light spotting that can happen when a fertilised egg embeds into the lining of the uterus. It is not a period and it is not a sign that something is wrong.",
        paragraphs: [
          "When the embryo attaches to the uterine wall, it can disrupt some of the tiny blood vessels in the lining. That disruption can release a small amount of blood, which may show up days later as a brief, light bleed or a tinted discharge.",
          "It does not happen for everyone. Most estimates put it at roughly one in four to one in three pregnancies, and many people who do experience it only notice it in hindsight.",
        ],
        callout: {
          tone: "reassurance",
          text: "Not seeing any spotting around implantation is completely normal and does not mean implantation hasn't happened.",
        },
      },
      {
        id: "when-implantation-bleeding-happens",
        heading: "When implantation bleeding usually happens",
        lead: "Implantation typically occurs 6 to 12 days after ovulation, which often falls in the week before an expected period. Any bleeding usually shows up in that same window.",
        paragraphs: [
          "Because the timing overlaps with when a period is due, implantation bleeding is often mistaken for an early or unusually light period. The biggest clue is what happens next: a period builds, an implantation bleed doesn't.",
          "If you've been tracking ovulation, the spotting most commonly appears 9–12 days after ovulation. If you haven't been tracking, just before — or instead of — your expected period is the typical timing.",
        ],
      },
      {
        id: "what-it-looks-like",
        heading: "What implantation bleeding looks like",
        lead: "It is usually light pink or brown rather than bright red, often only visible when wiping, and rarely enough to fill a pad or tampon.",
        paragraphs: [
          "Most people describe it as a tint rather than a flow — a streak on tissue, a small amount on underwear, or a brownish discharge that lasts a few hours to a couple of days. It can come and go in that window rather than running continuously.",
          "Bright red bleeding, clots, or anything that fills a pad is not the implantation pattern. That's worth a call to your midwife or doctor, even if it turns out to be nothing serious.",
        ],
      },
      {
        id: "vs-period",
        heading: "How to tell implantation bleeding from a period",
        lead: "The clearest differences are flow, colour, and duration. A period builds and lasts several days. Implantation bleeding stays light, often looks pink or brown, and is usually over within one to three days.",
        paragraphs: [
          "Periods typically start light, become heavier over the first day or two, and then taper. Implantation bleeding doesn't follow that arc — it stays light throughout and either stops or fades into ordinary discharge.",
          "Cramping can happen with both, but implantation cramping tends to be milder and shorter than period cramping. A consistently raised basal body temperature beyond your usual luteal phase, alongside light spotting, can be another supporting clue if you've been tracking.",
          "Only a positive pregnancy test can confirm. If your period is late or noticeably different from usual, testing with first-morning urine a few days after the spotting is the most reliable next step.",
        ],
      },
      {
        id: "cramping-and-other-spotting",
        heading: "Cramping, spotting, and what can still be normal",
        lead: "Light cramping and occasional spotting can both happen in early pregnancy without anything being wrong. The pattern matters more than the presence of either on its own.",
        paragraphs: [
          "Mild, low, period-like cramping is common as the uterus begins to grow and the surrounding ligaments stretch. Light spotting after sex, after a vaginal exam, or for no clear reason can also happen in the first trimester because the cervix becomes more sensitive in early pregnancy.",
          "What matters is whether the picture is light and short-lived, or whether it is escalating. Bleeding that stays light and stops within a couple of days, with at most mild cramping, fits the reassuring pattern. Anything heavier or more painful is a different conversation.",
        ],
      },
      {
        id: "when-to-call",
        heading: "When to speak with a midwife or doctor",
        lead: "Most light spotting in very early pregnancy doesn't need clinical input. A small number of patterns do, and recognising them quickly matters.",
        paragraphs: [
          "Contact your healthcare provider promptly if bleeding becomes as heavy as — or heavier than — a normal period, if it is bright red and increasing, if you pass clots, or if it is paired with one-sided abdominal pain, shoulder-tip pain, dizziness, or fainting. These can be signs of an ectopic pregnancy or early miscarriage and warrant urgent assessment.",
          "Also worth a call: any bleeding that simply doesn't feel right to you, or that is making it hard to function. Early pregnancy units exist precisely for this kind of reassurance — you don't need to wait until something is clearly wrong.",
        ],
        callout: {
          tone: "gentle-warning",
          text: "If bleeding is heavy, paired with severe or one-sided pain, or you feel faint, contact your midwife, GP, or out-of-hours service the same day.",
        },
      },
    ],
  },

  // ─── SYMPTOMS STOPPING IN EARLY PREGNANCY ────────────────────────────────
  {
    slug: "symptoms-stopping-early-pregnancy",
    title: "Symptoms stopping in early pregnancy: is it normal for symptoms to disappear?",
    metaDescription: "Is it normal for pregnancy symptoms to suddenly stop or ease? Understanding why symptoms come and go in early pregnancy, and when to seek reassurance.",
    quickAnswer:
      "Yes, it is common for pregnancy symptoms to ease or temporarily disappear in early pregnancy. Hormone levels fluctuate, and symptoms can vary significantly from day to day. A reduction or absence of symptoms is not, on its own, a reliable indicator that something has changed with your pregnancy.",
    howThisFeels: [
      "Waking up feeling fine and immediately worrying that something is wrong",
      "Spending the day anxiously watching for symptoms to return",
      "Feeling guilty for worrying when you feel better",
      "Searching constantly to find out whether this is normal",
      "The particular anxiety of early pregnancy, where reassurance is hard to find",
    ],
    whatHappening: {
      commonCauses: [
        {
          heading: "Natural hormone fluctuation",
          body: "hCG levels don't rise in a perfectly straight line, they fluctuate, and symptoms fluctuate with them. A day with fewer symptoms often reflects a natural dip in the rise, not a fall in levels.",
        },
        {
          heading: "Body adaptation",
          body: "As your body adjusts to the hormonal environment of pregnancy, the intensity of symptoms can reduce even while the pregnancy continues normally. Adaptation is a biological process, not a warning sign.",
        },
        {
          heading: "Individual variation in sensitivity",
          body: "Some people are more sensitive to hormonal changes than others. Those who are more sensitive may notice fluctuations more acutely, including both the presence and absence of symptoms.",
        },
      ],
      lessCauses: [
        {
          heading: "Placental transition beginning",
          body: "From around weeks 8-12, the placenta begins taking over hormone production from the corpus luteum. This transition can cause a temporary reduction in hCG-driven symptoms, particularly nausea and breast tenderness.",
        },
      ],
      whyItVaries:
        "Symptoms vary between people, between pregnancies, and between days. There is no consistent symptom pattern that indicates a healthy pregnancy, because healthy pregnancies look very different from person to person. The absence of symptoms is not, by itself, meaningful.",
    },
    timing: {
      whenStarts: "Symptom variation can occur at any point in the first trimester, including very early on.",
      whenPeaks: "Day-to-day variation is most common in weeks 5-10 when hCG levels are fluctuating most rapidly.",
      whenEases: "Most people notice more consistent (often reduced) symptoms from around weeks 12-14 as hormones stabilise, not because something is wrong, but because the body has adapted.",
    },
    whatItFeelsLike: [
      "A sudden absence of nausea that felt constant the day before",
      "Breast tenderness that was significant and has now eased",
      "Feeling almost normal, and finding that worrying",
      "A cycle of reassurance and renewed anxiety",
      "The impossibility of knowing what normal feels like when everything is new",
    ],
    whatThisMeans:
      "Symptoms are driven by hormones, and hormones fluctuate. A good day or a few hours of feeling well does not mean your pregnancy has changed. It means your hormone levels naturally varied, as they always do. Symptoms are not a reliable moment-to-moment measure of pregnancy health. The most reliable indicator of pregnancy health is medical assessment, not how you feel.",
    normal: [
      "Symptoms easing or disappearing for a day or two",
      "Nausea being stronger some days and absent others",
      "Breast tenderness coming and going",
      "Feeling significantly better for a period before symptoms return",
      "Symptoms gradually reducing from around week 10-12",
    ],
    seekSupport: [
      "Symptoms stopping alongside heavy bleeding",
      "Symptoms stopping alongside significant cramping or one-sided pain",
      "Any change that feels like more than normal fluctuation",
      "Anxiety that is significantly affecting your daily life, always worth raising",
    ],
    disclaimer: "This is not medical advice. If you have significant concerns about your pregnancy, please contact your midwife or healthcare provider. They will always take your concerns seriously.",
    whatYouCanDo: [
      { action: "Notice the pattern over a few days rather than hours", reason: "Single moments of feeling well are less meaningful than longer patterns" },
      { action: "Avoid repeated testing unless medically indicated", reason: "Repeated tests can increase anxiety without providing useful clinical information" },
      { action: "Contact your midwife if your anxiety is significant", reason: "An early reassurance scan may be available, your midwife will advise" },
      { action: "Try to avoid symptom-tracking as a primary coping mechanism", reason: "Symptoms are not a reliable indicator of health, and tracking them closely can amplify anxiety" },
    ],
    whatHappensNext:
      "In most cases, symptom fluctuation is a normal part of early pregnancy. From around weeks 10-14, many people experience a natural easing of symptoms as hormone levels stabilise, and this is entirely expected. If you are approaching the 12-week scan, this will provide a much more reliable picture of how the pregnancy is progressing.",
    relatedStage: {
      intro: "Symptom variation is most common in the first trimester. Understanding the stage you're in can help:",
      links: [
        { label: "Week 6", href: "/pregnancy/week/6", context: "Often when symptoms feel most intense, and fluctuation most noticeable." },
        { label: "Week 8", href: "/pregnancy/week/8", context: "A common week for anxiety about symptom variation." },
        { label: "Week 12", href: "/pregnancy/week/12", context: "When natural symptom easing often begins." },
        { label: "First Trimester Hub", href: "/pregnancy/first-trimester", context: "A grounded overview of what the first trimester is really like." },
      ],
    },
    aiPrompts: [
      "Is it normal for symptoms to suddenly stop at week 7?",
      "My nausea disappeared, should I be worried?",
      "What does symptom variation mean in early pregnancy?",
    ],
    captureIntro: "The uncertainty of early pregnancy is real, and worth acknowledging. Writing down how this stage felt creates a record of something that was genuinely significant, even when the outcome is happy.",
    trimester: [1],
    relatedWeeks: [5, 6, 7, 8, 9, 10, 12],
    relatedSlugs: ["nausea-in-early-pregnancy", "fatigue-in-early-pregnancy", "first-trimester-symptoms"],
    cornerstoneSlug: "first-trimester-complete-guide",
    journey: ["pregnancy"],
    topics: ["symptoms", "emotional-wellbeing"],
    faq: [
      {
        question: "Is it normal for pregnancy symptoms to come and go?",
        answer: "Yes. Symptoms fluctuate because hormone levels fluctuate. A good day does not mean something has changed with your pregnancy.",
      },
      {
        question: "Should I be worried if my nausea suddenly stops?",
        answer: "A sudden improvement in nausea is usually part of normal variation. If it is accompanied by heavy bleeding or significant pain, contact your healthcare provider.",
      },
      {
        question: "When do pregnancy symptoms usually ease naturally?",
        answer: "Most people notice symptoms easing from around weeks 12-14 as hormone levels stabilise. This is expected, not a warning sign.",
      },
    ],
    productPromotion: "strong",
    reviewedBy: "Jenny Joines",
  },

  // ─── CORNERSTONE: COMPLETE GUIDE TO MORNING SICKNESS ─────────────────────
  {
    slug: "complete-guide-morning-sickness",
    title: "Morning sickness: the complete guide to nausea in pregnancy",
    metaDescription: "Everything you need to know about morning sickness. Why it happens, when it starts and ends, what helps, when to seek support, and what is considered normal.",
    isCornerstone: true,
    quickAnswer:
      "Morning sickness affects up to 80% of pregnant people and is caused primarily by rising hCG and progesterone levels. Despite its name, it can occur at any time of day. For most people it begins around weeks 5-6, peaks between weeks 8-10, and eases by weeks 12-14. While uncomfortable, it is almost always a normal part of pregnancy.",
    howThisFeels: [
      "Feeling profoundly unwell while trying to function normally",
      "Wondering whether this level of sickness is normal",
      "The isolation of an invisible symptom",
      "Not being able to eat foods you usually enjoy",
      "Counting down the weeks until the second trimester",
    ],
    whatHappening: {
      commonCauses: [
        {
          heading: "hCG (human chorionic gonadotropin)",
          body: "This pregnancy hormone rises rapidly in the first trimester and directly stimulates the nausea centre in the brain. The rate of rise, not just the level, appears to influence severity.",
        },
        {
          heading: "Progesterone",
          body: "Progesterone relaxes smooth muscle throughout the body, including the digestive system. This slows digestion, contributing to nausea, bloating, and reflux.",
        },
        {
          heading: "Oestrogen and smell sensitivity",
          body: "Rising oestrogen heightens your sense of smell, sometimes dramatically. Previously neutral smells can become powerful nausea triggers.",
        },
        {
          heading: "Evolutionary protection theory",
          body: "Some researchers believe nausea evolved as a protective mechanism to discourage consumption of potentially harmful foods during the critical early development period.",
        },
      ],
      lessCauses: [
        {
          heading: "Blood sugar instability",
          body: "Metabolic changes in early pregnancy can cause blood sugar to drop more rapidly, particularly overnight. Low blood sugar amplifies nausea.",
        },
        {
          heading: "Stress and fatigue",
          body: "Physical and emotional stress can worsen nausea. The relationship is bidirectional, nausea causes fatigue, and fatigue worsens nausea.",
        },
        {
          heading: "Multiple pregnancies",
          body: "Those carrying multiples often experience more intense nausea due to higher levels of hCG.",
        },
      ],
      whyItVaries:
        "Morning sickness varies enormously. Some people feel mildly queasy; others are severely affected for weeks. Genetics, hCG sensitivity, prior history, and overall health all play a role. There is no \"correct\" level of nausea, and severity is not a reliable measure of pregnancy health.",
    },
    timing: {
      whenStarts: "Most commonly begins between weeks 4-6, when hCG levels start rising rapidly.",
      whenPeaks: "Symptoms are typically most intense between weeks 8-10.",
      whenEases: "The majority of people notice significant improvement between weeks 12-16 as the placenta takes over hormone production. Some experience relief earlier, others later.",
    },
    whatItFeelsLike: [
      "A persistent underlying queasiness that doesn't fully resolve",
      "Waves of nausea triggered by smells, movement, or an empty stomach",
      "Food aversions that change day to day",
      "The exhaustion of feeling unwell continuously",
      "Good hours that give hope, followed by bad hours that take it away",
    ],
    whatThisMeans:
      "Morning sickness is, for the vast majority of people, a sign that pregnancy hormones are active and doing their job. The presence or absence of nausea does not predict pregnancy outcome. This is important to remember on both the difficult days and the good ones.",
    normal: [
      "Nausea at any time of day",
      "Vomiting occasionally without other concerning symptoms",
      "Days that are worse than others",
      "Symptoms that start, stop, and return",
      "Very mild nausea or no nausea at all",
      "Food aversions and changing preferences",
    ],
    seekSupport: [
      "Unable to keep any fluids down for more than 24 hours",
      "Significant unintentional weight loss",
      "Dark, concentrated urine or infrequent urination",
      "Vomiting blood",
      "Feeling faint, dizzy, or confused",
      "Symptoms that are worsening rather than improving after week 14",
    ],
    disclaimer: "This is not medical advice. If nausea is severely affecting your ability to eat, drink, or function, speak with your midwife or doctor. Hyperemesis gravidarum is a recognised medical condition with effective treatments.",
    whatYouCanDo: [
      { action: "Eat small amounts frequently", reason: "An empty stomach makes nausea worse. Small, bland snacks every 1-2 hours can help stabilise blood sugar." },
      { action: "Stay hydrated in small sips", reason: "Sipping water, diluted juice, or ice chips throughout the day is more manageable than large drinks." },
      { action: "Identify and avoid personal triggers", reason: "Common triggers include strong smells, rich foods, and warm environments. Reducing exposure can help." },
      { action: "Try ginger in various forms", reason: "Ginger tea, ginger biscuits, and ginger supplements have evidence supporting mild anti-nausea effects." },
      { action: "Prioritise rest", reason: "Fatigue worsens nausea. Resting when possible can reduce overall severity." },
      { action: "Consider vitamin B6", reason: "Some studies suggest vitamin B6 can reduce nausea. Discuss dosage with your healthcare provider." },
      { action: "Speak to your doctor about medication if needed", reason: "Safe anti-nausea medications are available. There is no need to suffer in silence." },
    ],
    whatHappensNext:
      "For most people, the worst of morning sickness passes by weeks 12-16. The second trimester often brings welcome relief and renewed energy. If symptoms persist beyond week 16, this is less common but not dangerous, and is worth discussing with your care team.",
    relatedStage: {
      intro: "Morning sickness is primarily a first trimester experience. Explore the stages that relate to it:",
      links: [
        { label: "First Trimester Hub", href: "/pregnancy/first-trimester", context: "A comprehensive overview of what the first trimester involves." },
        { label: "Week 6", href: "/pregnancy/week/6", context: "Often when nausea first becomes significant." },
        { label: "Week 9", href: "/pregnancy/week/9", context: "Around the peak of nausea for many people." },
        { label: "Week 13", href: "/pregnancy/week/13", context: "When improvement often begins." },
      ],
    },
    aiPrompts: [
      "What foods help with morning sickness?",
      "Is my nausea normal for this stage of pregnancy?",
      "When will morning sickness stop?",
      "Should I take medication for morning sickness?",
    ],
    captureIntro: "Morning sickness is one of those experiences that is hard to describe until you've lived it. Many parents find it meaningful to write about what this stage was really like.",
    trimester: [1],
    relatedWeeks: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    relatedSlugs: ["nausea-in-early-pregnancy", "fatigue-in-early-pregnancy", "symptoms-stopping-early-pregnancy"],
    journey: ["pregnancy"],
    topics: ["symptoms", "body-changes", "practical-preparation"],
    faq: [
      {
        question: "Does morning sickness only happen in the morning?",
        answer: "No. Despite the name, nausea can occur at any time of day. Many people experience it more in the afternoon or evening. The name is misleading.",
      },
      {
        question: "Is morning sickness a good sign?",
        answer: "Some research suggests nausea may be associated with lower miscarriage risk, but many healthy pregnancies involve little or no nausea. It is not a reliable positive or negative indicator.",
      },
      {
        question: "Can morning sickness harm my baby?",
        answer: "Normal morning sickness does not harm your baby. Your body prioritises the pregnancy even when you are unable to eat normally. However, severe dehydration from hyperemesis gravidarum does need treatment.",
      },
      {
        question: "What is the difference between morning sickness and hyperemesis gravidarum?",
        answer: "Morning sickness involves manageable nausea where you can still keep some food and fluids down. Hyperemesis gravidarum involves severe, persistent vomiting, inability to stay hydrated, and often requires medical treatment.",
      },
      {
        question: "Will morning sickness be the same in every pregnancy?",
        answer: "Not necessarily. Many people experience different levels of nausea in different pregnancies. Previous experience is not a reliable predictor.",
      },
      {
        question: "Are there safe medications for morning sickness?",
        answer: "Yes. Several anti-nausea medications are considered safe in pregnancy. Your doctor or midwife can discuss options if your symptoms are severe enough to affect daily life.",
      },
    ],
    compare: {
      heading: "Morning sickness vs hyperemesis gravidarum",
      description: "Understanding the difference helps you know when to seek medical support.",
      items: [
        {
          label: "Morning sickness",
          points: [
            "Nausea with or without occasional vomiting",
            "Able to keep some food and fluids down",
            "Uncomfortable but manageable",
            "Eases with rest, small meals, and trigger avoidance",
            "Usually resolves by weeks 12-16",
          ],
        },
        {
          label: "Hyperemesis gravidarum",
          points: [
            "Severe, persistent vomiting (often many times daily)",
            "Unable to keep fluids or food down",
            "May cause dehydration, weight loss, and ketosis",
            "May require hospital treatment and IV fluids",
            "Can persist throughout pregnancy",
          ],
        },
      ],
      commonConfusion: "Many people worry that severe nausea automatically means hyperemesis gravidarum. The key distinction is whether you can maintain hydration, not how unpleasant the nausea feels.",
      whenToSeekHelp: "If you cannot keep any fluids down for more than 24 hours, are losing weight, have dark urine, or feel faint, contact your healthcare provider.",
    },
    productPromotion: "strong",
    keyTakeaways: [
      "Morning sickness affects up to 80% of pregnant people",
      "It can occur at any time of day, not just mornings",
      "Nausea typically peaks between weeks 8-10 and eases by 12-16",
      "Both strong nausea and very mild nausea are normal",
      "Safe anti-nausea medications are available if symptoms are severe",
    ],
    inThisArticle: ["Why morning sickness happens", "When it starts and ends", "What variation looks like", "What may help", "Morning sickness vs hyperemesis", "When to seek support", "Common questions"],
    editorialSections: [
      {
        id: "why-it-happens",
        heading: "Why morning sickness happens",
        lead: "Morning sickness is driven by a combination of hormonal shifts that begin almost immediately after implantation. Understanding these changes can help explain why nausea can feel so intense, and why it is almost always a normal part of early pregnancy.",
        paragraphs: [
          "The primary driver is human chorionic gonadotropin (hCG), the hormone your body begins producing shortly after a fertilised egg implants in the uterine lining. hCG levels rise rapidly in the first trimester, roughly doubling every 48 to 72 hours during the early weeks. This hormone directly stimulates the chemoreceptor trigger zone in the brain, which is the area responsible for triggering the nausea response.",
          "At the same time, progesterone levels increase significantly. Progesterone is essential for maintaining the pregnancy, but it also relaxes smooth muscle throughout the body, including the muscles of the digestive tract. This slowing of digestion can lead to bloating, a feeling of fullness, and nausea, particularly when the stomach is empty.",
          "Rising oestrogen plays a role too, especially by heightening the sense of smell. Many pregnant people report that previously neutral or pleasant smells suddenly become overwhelming or nauseating. This heightened sensitivity appears to be one of the earliest and most noticeable changes.",
        ],
        subsections: [
          {
            subheading: "The evolutionary theory",
            paragraphs: [
              "Some researchers believe morning sickness may have evolved as a protective mechanism. The theory suggests that nausea and food aversions during the critical early weeks of organ development may have helped our ancestors avoid potentially harmful or contaminated foods. While this remains a theory, it offers an interesting perspective on why nausea tends to be strongest during the period of most active embryonic development.",
            ],
          },
          {
            subheading: "Why some people are affected more than others",
            paragraphs: [
              "The severity of morning sickness varies enormously from person to person, and even from pregnancy to pregnancy. Genetics appear to play a significant role. If your mother experienced severe nausea in pregnancy, you may be more likely to as well. Individual sensitivity to hCG, baseline hormone levels, stress, fatigue, and even the number of embryos all contribute to the wide variation in experience.",
              "It is important to know that the severity of your nausea is not a reliable indicator of pregnancy health. Some people with very healthy pregnancies experience minimal nausea, while others feel profoundly unwell. Both are normal.",
            ],
          },
        ],
        callout: {
          tone: "reassurance",
          text: "Morning sickness, while deeply uncomfortable, is one of the most common experiences of early pregnancy. It is not a sign that something is wrong. Your body is responding to the enormous hormonal shift required to sustain and support a new pregnancy.",
        },
      },
      {
        id: "when-it-starts-and-ends",
        heading: "When it starts and ends",
        lead: "One of the most common questions about morning sickness is timing. When will it start? When will it peak? And perhaps most importantly, when will it stop? While every pregnancy follows its own pattern, there is a general timeline that most people find helpful.",
        subsections: [
          {
            subheading: "When nausea usually begins",
            paragraphs: [
              "Most people begin to notice nausea somewhere between weeks 5 and 6 of pregnancy, counting from the first day of the last menstrual period. For some, it appears gradually as a mild queasiness. For others, it arrives more abruptly. A smaller number of people notice symptoms as early as week 4, while others do not experience nausea until week 7 or 8.",
              "The onset of nausea closely follows the rise in hCG levels, which is why it tends to appear around the time a pregnancy test first shows positive. If you are feeling nauseous before a missed period, it may be one of the earliest signs of pregnancy.",
            ],
          },
          {
            subheading: "When symptoms typically peak",
            paragraphs: [
              "For many people, the most intense period of nausea falls between weeks 8 and 10. This coincides with the period when hCG levels are rising most rapidly. During this window, nausea may feel constant, food aversions may be at their strongest, and daily functioning can feel significantly harder.",
              "It can be helpful to know that this peak is temporary. The intensity during weeks 8 to 10 does not mean symptoms will continue at this level. For most people, this is the hardest stretch, and it does begin to ease.",
            ],
          },
          {
            subheading: "When it usually begins to ease",
            paragraphs: [
              "The majority of people notice a meaningful improvement somewhere between weeks 12 and 14. This improvement often coincides with the placenta taking over progesterone production from the corpus luteum, which leads to a stabilisation of hormone levels.",
              "The easing is usually gradual rather than sudden. You may find that you have more good hours in a day, then more good days in a week, until the nausea fades into the background. Some people feel noticeably better by week 12. Others continue to experience mild symptoms into weeks 16 to 18. A small number of people experience nausea throughout pregnancy, though this is less common.",
              "If your nausea persists beyond week 16, it is worth mentioning to your midwife or doctor. Persistent nausea is not typically dangerous, but it can affect quality of life and nutrition, and support is available.",
            ],
          },
        ],
        callout: {
          tone: "info",
          text: "There is no exact day or week when morning sickness switches off. The timeline above describes a general pattern, but your experience may differ. Variation is normal and does not mean something is wrong.",
        },
      },
      {
        id: "what-variation-looks-like",
        heading: "What variation looks like",
        lead: "One of the most reassuring things to understand about morning sickness is just how wide the range of normal really is. There is no single 'correct' way to experience nausea in pregnancy.",
        paragraphs: [
          "Some people feel nauseous primarily in the morning, which is where the name comes from. But many experience nausea more intensely in the afternoon or evening. Some feel it as an all-day low-level queasiness, while others experience sudden intense waves that come and go unpredictably.",
          "Food aversions are extremely common. Foods you previously enjoyed may become impossible to tolerate, sometimes just the thought of them is enough to trigger nausea. Smell sensitivity often accompanies this, with cooking smells, perfumes, or even your partner's deodorant becoming overwhelming.",
          "Some people vomit regularly; others feel profoundly nauseous without ever vomiting. Both experiences are considered normal morning sickness. The absence of vomiting does not mean the nausea is less real or less difficult.",
        ],
        subsections: [
          {
            subheading: "Symptoms that come and go",
            paragraphs: [
              "It is very common for nausea to fluctuate. You may have a terrible day followed by a day where you feel almost normal, only for symptoms to return. This pattern can be anxiety-inducing, as many people worry that an improvement in symptoms is a negative sign. In reality, fluctuation is one of the most common patterns of morning sickness.",
              "Similarly, some people notice symptoms that ease for a few days around weeks 9 or 10, then return briefly before finally fading. This is not unusual and does not typically indicate a problem.",
            ],
          },
        ],
        callout: {
          tone: "reassurance",
          text: "If your experience does not match what you have read online or what your friends describe, that does not mean something is wrong. The range of normal in morning sickness is genuinely enormous.",
        },
      },
      {
        id: "what-may-help",
        heading: "What may help",
        lead: "There is no cure for morning sickness, and what works for one person may not work for another. However, there are a number of strategies that many people find helpful in managing symptoms, even if they do not eliminate nausea entirely.",
        subsections: [
          {
            subheading: "Eating patterns",
            paragraphs: [
              "One of the most consistently recommended approaches is eating small, frequent meals and snacks rather than three larger meals. An empty stomach tends to make nausea worse, so keeping something in your stomach, even if it is just a few crackers or a piece of toast, can help take the edge off.",
              "Many people find that bland, carbohydrate-rich foods are the most tolerable. Toast, rice, pasta, crackers, and potatoes are common choices. Cold foods may be easier to manage than hot foods, as they tend to have less smell. Eating what you can manage is more important than eating a perfectly balanced diet during the worst weeks.",
            ],
          },
          {
            subheading: "Hydration",
            paragraphs: [
              "Staying hydrated is important, especially if you are vomiting. Small, frequent sips of water are often more manageable than drinking large amounts at once. Some people find that adding a slice of lemon or drinking slightly chilled water helps. Ice lollies, diluted juice, and herbal teas (particularly ginger or peppermint) can also be good alternatives if plain water is hard to keep down.",
            ],
          },
          {
            subheading: "Ginger and vitamin B6",
            paragraphs: [
              "Ginger has modest evidence supporting its use for pregnancy nausea. Ginger tea, ginger biscuits, ginger ale (with real ginger), and ginger supplements are all options. The effect is usually mild, but many people find it takes the edge off.",
              "Vitamin B6 (pyridoxine) is sometimes recommended by healthcare providers for mild to moderate nausea. Some studies suggest it can reduce nausea severity. If you are considering supplements, it is worth discussing appropriate dosages with your midwife or doctor.",
            ],
          },
          {
            subheading: "Rest and environment",
            paragraphs: [
              "Fatigue makes nausea worse, and nausea makes fatigue worse. This cycle can be hard to break, but resting when you can, even short naps or lying down for 20 minutes, may help reduce symptom intensity. Avoiding strong smells, warm stuffy rooms, and rapid position changes can also make a difference.",
            ],
          },
          {
            subheading: "Medication",
            paragraphs: [
              "If your nausea is significantly affecting your ability to eat, drink, work, or care for yourself, it is worth speaking to your doctor about anti-nausea medication. Several options are considered safe in pregnancy and can make a meaningful difference to quality of life. There is no need to endure severe symptoms without support.",
            ],
          },
        ],
        callout: {
          tone: "info",
          text: "What helps most varies from person to person. Be patient with yourself as you figure out what works. If nothing seems to help, speak to your healthcare provider, as there are additional options available.",
        },
      },
      {
        id: "whats-normal-and-when-to-seek-support",
        heading: "What is normal and when to seek support",
        lead: "Understanding the boundary between uncomfortable-but-normal nausea and symptoms that need medical attention is one of the most important aspects of managing morning sickness.",
        paragraphs: [
          "Normal morning sickness, even when it feels severe, is characterised by nausea and occasional vomiting where you are still able to keep some food and fluids down, you are not losing significant weight, and while you feel unwell, you can broadly manage day-to-day activities even if they feel much harder than usual.",
          "Morning sickness becomes a medical concern when it crosses into territory where your body is not getting the hydration and nutrition it needs. This is a condition called hyperemesis gravidarum, and it affects approximately 1-3% of pregnancies. It is a recognised medical condition with effective treatments, and getting help early makes a significant difference.",
        ],
        callout: {
          tone: "gentle-warning",
          text: "Contact your midwife or doctor if you are unable to keep any fluids down for more than 24 hours, you are producing very little or very dark urine, you have lost weight since becoming pregnant, you feel faint, dizzy, or confused, or you are vomiting blood. These symptoms should always be assessed, and treatment is available.",
        },
      },
    ],
    sources: ["NHS: Vomiting and morning sickness in pregnancy", "RCOG: Management of Nausea and Vomiting in Pregnancy", "NICE Clinical Knowledge Summaries"],
    lastUpdated: "March 2026",
    reviewedBy: "Jenny Joines",
  },

  // ─── CORNERSTONE: FIRST TRIMESTER COMPLETE GUIDE ─────────────────────────
  {
    slug: "first-trimester-complete-guide",
    title: "First trimester: everything you need to know about weeks 1 to 12",
    metaDescription: "A comprehensive guide to the first trimester of pregnancy. What happens week by week, common symptoms, what to expect, and when to seek support.",
    isCornerstone: true,
    quickAnswer:
      "The first trimester covers weeks 1-12 of pregnancy and involves the most significant developmental changes of the entire pregnancy. During this time, all major organs begin forming, symptoms like nausea and fatigue are common, and your body undergoes enormous hormonal shifts. It is also the stage where uncertainty and anxiety are most common.",
    howThisFeels: [
      "A strange mix of excitement and fear",
      "Feeling exhausted in ways you've never experienced",
      "Wanting to tell people but not knowing when it's safe",
      "The weight of a secret you're carrying alone or with a partner",
      "Searching constantly for reassurance about what's normal",
    ],
    whatHappening: {
      commonCauses: [
        {
          heading: "Rapid hormonal changes",
          body: "hCG, progesterone, and oestrogen all rise dramatically in the first trimester. These hormones drive most of the symptoms you experience and are essential for maintaining the pregnancy.",
        },
        {
          heading: "Organ and system development",
          body: "By week 12, all major organ systems have begun forming. The heart starts beating around week 6, the brain is developing rapidly, and the basic body plan is established.",
        },
        {
          heading: "Placenta formation",
          body: "The placenta develops throughout the first trimester, gradually taking over hormone production from the corpus luteum. This transition is why many symptoms ease around weeks 12-14.",
        },
      ],
      lessCauses: [
        {
          heading: "Increased blood volume",
          body: "Your body begins producing significantly more blood to support the pregnancy, contributing to fatigue and sometimes light-headedness.",
        },
        {
          heading: "Immune system adaptation",
          body: "Your immune system adjusts to accommodate the pregnancy, which can make you more susceptible to colds and infections.",
        },
      ],
      whyItVaries:
        "No two first trimesters are alike. Some people experience every symptom intensely; others sail through with minimal disruption. Both experiences are entirely normal.",
    },
    timing: {
      whenStarts: "The first trimester begins from the first day of your last menstrual period and runs through to the end of week 12.",
      whenPeaks: "Symptoms are typically most intense between weeks 6-10.",
      whenEases: "Most symptoms begin to improve from weeks 12-14 as you enter the second trimester.",
    },
    whatItFeelsLike: [
      "Overwhelming fatigue that makes normal days feel impossible",
      "Nausea that can range from mild to all-consuming",
      "Emotional intensity, feeling everything more deeply",
      "Anxiety about the unknown, especially before the first scan",
      "A private, internal experience that the world around you cannot see",
    ],
    whatThisMeans:
      "The first trimester is the most biologically intensive period of pregnancy. The symptoms you experience are directly caused by the enormous work your body is doing. Everything from fatigue to nausea to emotional sensitivity has a physiological basis. You are not being dramatic. Your body is doing something extraordinary.",
    normal: [
      "Intense fatigue",
      "Nausea with or without vomiting",
      "Breast tenderness and changes",
      "Mood swings and emotional sensitivity",
      "Light spotting in early weeks",
      "Food aversions and cravings",
      "Frequent urination",
      "Bloating and digestive changes",
    ],
    seekSupport: [
      "Heavy bleeding or severe cramping",
      "Severe pain, especially on one side",
      "Unable to keep any fluids down",
      "High fever",
      "Significant anxiety or depression affecting daily life",
    ],
    disclaimer: "This is not medical advice. Regular antenatal care is important from early pregnancy. Contact your midwife or doctor with any concerns.",
    whatYouCanDo: [
      { action: "Book your first midwife appointment", reason: "Antenatal care should begin as early as possible, usually around weeks 8-10." },
      { action: "Take folic acid daily", reason: "Folic acid supports neural tube development and should be taken throughout the first trimester." },
      { action: "Rest as much as you need", reason: "First trimester fatigue is biological. Your body needs more rest." },
      { action: "Eat what you can manage", reason: "Food aversions are common. Eating what feels manageable is more important than eating perfectly." },
      { action: "Be gentle with yourself emotionally", reason: "The first trimester is intense. Whatever you are feeling is valid." },
    ],
    whatHappensNext:
      "The second trimester (weeks 13-27) is often described as the most comfortable period of pregnancy. Symptoms typically ease, energy returns, and the pregnancy becomes more visible and tangible. The first scan usually provides welcome reassurance.",
    relatedStage: {
      intro: "Explore the first trimester in more detail:",
      links: [
        { label: "First Trimester Hub", href: "/pregnancy/first-trimester", context: "Your complete guide to the first trimester." },
        { label: "Week 5", href: "/pregnancy/week/5", context: "When most symptoms begin." },
        { label: "Week 8", href: "/pregnancy/week/8", context: "Peak symptom intensity for many people." },
        { label: "Week 12", href: "/pregnancy/week/12", context: "The milestone many people wait for." },
      ],
    },
    aiPrompts: [
      "What should I expect in my first trimester?",
      "What symptoms are normal in early pregnancy?",
      "When should I see a midwife?",
    ],
    captureIntro: "The first trimester is often kept secret, but it deserves to be remembered. Many parents find that writing about this stage helps them process an intense and transformative experience.",
    trimester: [1],
    relatedWeeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    relatedSlugs: ["nausea-in-early-pregnancy", "fatigue-in-early-pregnancy", "implantation-bleeding", "symptoms-stopping-early-pregnancy"],
    journey: ["pregnancy"],
    topics: ["symptoms", "body-changes", "timelines", "emotional-wellbeing", "practical-preparation"],
    faq: [
      {
        question: "What are the most common first trimester symptoms?",
        answer: "Fatigue, nausea, breast tenderness, frequent urination, mood changes, food aversions, and bloating. Not everyone experiences all of these.",
      },
      {
        question: "When is the first scan?",
        answer: "In the UK, the first scan (dating scan) is usually offered between weeks 8-14. Your midwife will arrange this at your booking appointment.",
      },
      {
        question: "Is it safe to exercise in the first trimester?",
        answer: "For most people, gentle to moderate exercise is safe and beneficial. Avoid contact sports and activities with a high fall risk. Speak with your midwife if you have concerns.",
      },
      {
        question: "When should I tell people I'm pregnant?",
        answer: "There is no rule. Many people wait until after the first scan (around week 12), but some choose to share earlier. Do what feels right for you.",
      },
      {
        question: "Is light spotting in the first trimester normal?",
        answer: "Light spotting can be normal, particularly around the time implantation occurs. However, any bleeding is worth mentioning to your midwife or doctor.",
      },
    ],
    productPromotion: "strong",
    keyTakeaways: [
      "All major organs begin forming in weeks 1-12",
      "Nausea, fatigue, and emotional intensity are the most common symptoms",
      "Symptoms typically ease from weeks 12-14",
      "Regular antenatal care should begin early",
      "The first scan provides the most reliable reassurance",
    ],
    inThisArticle: ["What happens in weeks 1-12", "Common symptoms", "What to expect emotionally", "When to seek support", "Common questions"],
    sources: ["NHS: Your pregnancy week by week", "NICE antenatal care guidelines", "Tommy's: First trimester"],
    lastUpdated: "March 2026",
    reviewedBy: "Jenny Joines",
  },

  // ─── CORNERSTONE: EARLY PREGNANCY SYMPTOMS EXPLAINED ─────────────────────
  {
    slug: "early-pregnancy-symptoms-explained",
    title: "Early pregnancy symptoms: what to expect and what is normal",
    metaDescription: "A comprehensive guide to early pregnancy symptoms. What causes them, when they start, what varies, and when to speak with your healthcare provider.",
    isCornerstone: true,
    quickAnswer:
      "Early pregnancy symptoms are caused by hormonal changes, primarily rising hCG and progesterone. Common symptoms include nausea, fatigue, breast tenderness, mood changes, and food aversions. Every pregnancy is different, and having fewer symptoms does not indicate a problem.",
    howThisFeels: [
      "Constantly checking your body for clues",
      "Not knowing what is normal and what isn't",
      "Feeling everything more intensely than usual",
      "The gap between what you expected and how it actually feels",
      "Wanting reassurance you can't easily find",
    ],
    whatHappening: {
      commonCauses: [
        {
          heading: "Hormonal surge",
          body: "hCG, progesterone, and oestrogen all rise rapidly in early pregnancy. These hormones cause most of the symptoms you experience, from nausea to fatigue to breast changes.",
        },
        {
          heading: "Metabolic changes",
          body: "Your metabolism shifts to support the developing pregnancy. This affects blood sugar, digestion, and energy levels.",
        },
      ],
      lessCauses: [
        {
          heading: "Psychological and emotional adaptation",
          body: "The emotional weight of early pregnancy, with its uncertainty and significance, can amplify physical sensations and create new ones.",
        },
      ],
      whyItVaries:
        "No two pregnancies produce the same symptoms. Genetics, hormonal sensitivity, general health, and individual physiology all play a role. Comparing your experience to others' is natural but rarely helpful.",
    },
    timing: {
      whenStarts: "Symptoms can begin as early as weeks 3-4, though most people notice them from weeks 5-6.",
      whenPeaks: "Typically most noticeable between weeks 6-10.",
      whenEases: "Most first trimester symptoms improve between weeks 12-14.",
    },
    whatItFeelsLike: [
      "A combination of symptoms that can feel overwhelming together",
      "Good days and bad days with no clear pattern",
      "Physical discomfort alongside emotional intensity",
      "The strange experience of your body changing before you can see it",
    ],
    whatThisMeans:
      "Early pregnancy symptoms, whether intense or mild, are your body responding to the pregnancy. They are not a measure of how healthy the pregnancy is. Some people with no symptoms have perfectly healthy pregnancies. Some people with intense symptoms do too.",
    normal: [
      "Nausea (at any time of day)",
      "Extreme fatigue",
      "Breast tenderness and swelling",
      "Frequent urination",
      "Mood swings",
      "Food aversions and cravings",
      "Bloating and mild cramping",
      "Heightened sense of smell",
      "Light spotting",
      "Having very few or no symptoms",
    ],
    seekSupport: [
      "Severe vomiting preventing hydration",
      "Heavy bleeding or severe cramping",
      "Pain on one side of the abdomen",
      "High fever",
      "Feeling significantly unwell beyond normal pregnancy symptoms",
    ],
    disclaimer: "This is not medical advice. If you have concerns about any symptom, contact your midwife or doctor.",
    whatYouCanDo: [
      { action: "Track symptoms lightly, not obsessively", reason: "A brief daily note can help you see patterns and share useful information with your midwife." },
      { action: "Eat what you can manage", reason: "Nutrition matters, but survival eating is fine during the first trimester." },
      { action: "Rest", reason: "Your body is working harder than you realise." },
      { action: "Seek reassurance when you need it", reason: "Contact your midwife. That is what they are there for." },
    ],
    whatHappensNext:
      "Symptoms evolve throughout pregnancy. The first trimester is typically the most symptom-heavy period. The second trimester often brings relief, and the third trimester introduces new physical sensations as your baby grows.",
    relatedStage: {
      intro: "Explore early pregnancy in more depth:",
      links: [
        { label: "First Trimester Hub", href: "/pregnancy/first-trimester" },
        { label: "Nausea guide", href: "/articles/nausea-in-early-pregnancy" },
        { label: "Fatigue guide", href: "/articles/fatigue-in-early-pregnancy" },
        { label: "Week 6", href: "/pregnancy/week/6", context: "Peak symptom week for many." },
      ],
    },
    aiPrompts: [
      "What symptoms should I expect this week?",
      "Is it normal to feel this way in early pregnancy?",
      "Which symptoms need medical attention?",
    ],
    captureIntro: "Early pregnancy is full of questions and feelings that are worth recording. Many parents look back and wish they'd written more about how the beginning really felt.",
    trimester: [1],
    relatedWeeks: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    relatedSlugs: ["nausea-in-early-pregnancy", "fatigue-in-early-pregnancy", "implantation-bleeding", "symptoms-stopping-early-pregnancy"],
    journey: ["pregnancy"],
    topics: ["symptoms", "body-changes", "emotional-wellbeing"],
    faq: [
      {
        question: "What are the earliest signs of pregnancy?",
        answer: "The earliest signs include a missed period, breast tenderness, fatigue, nausea, and frequent urination. Some people also notice light spotting or mood changes.",
      },
      {
        question: "Can you have no symptoms and still be pregnant?",
        answer: "Yes. Some people experience very few symptoms, especially in the first few weeks. This is normal and does not indicate a problem.",
      },
      {
        question: "Do symptoms get worse before they get better?",
        answer: "For many people, symptoms intensify between weeks 6-10 before gradually improving. But this pattern varies.",
      },
      {
        question: "Should I worry if my symptoms are different from my last pregnancy?",
        answer: "No. Every pregnancy is different. Symptom variation between pregnancies is completely normal.",
      },
    ],
    productPromotion: "strong",
    keyTakeaways: [
      "Most early symptoms are driven by rising hCG and progesterone, not by anything going wrong",
      "Symptoms can begin before a missed period, but the timing varies widely from person to person",
      "Having very few symptoms — or none at all — does not mean a pregnancy is less healthy",
      "A small number of signs do warrant a call to your midwife or doctor, and they're worth knowing",
    ],
    sources: [
      "NHS — Signs and symptoms of pregnancy",
      "Tommy's — Early pregnancy symptoms and what to expect",
      "NICE — Antenatal care (NG201)",
      "RCOG — Information for women in early pregnancy",
    ],
    lastUpdated: "March 2026",
    reviewedBy: "Jenny Joines",

    // ── New unified deep article template fields ──
    topic: "body",
    standfirst:
      "What's actually happening in the first weeks — and how to tell the strong signals from the noise.",
    hero: {
      src: new URL("../assets/article-hero-implantation.jpg", import.meta.url).href,
      alt: "A person sitting quietly at home in soft natural light, hands resting on their lap.",
    },
    editorialSections: [
      {
        id: "when-symptoms-start",
        heading: "When early pregnancy symptoms usually start",
        lead: "Most people first notice symptoms between weeks five and six, though some feel changes a little earlier and some not for several weeks more. The timing depends on how quickly hCG rises in your body, not on whether the pregnancy is healthy.",
        paragraphs: [
          "After implantation — usually six to twelve days after ovulation — your body begins producing human chorionic gonadotropin (hCG). This is the hormone home pregnancy tests look for, and it is also the hormone responsible for many of the earliest physical changes you might feel.",
          "Some symptoms, like a heightened sense of smell or sudden tiredness, can appear before a missed period. Others, like nausea or breast tenderness, often arrive a week or two later as hormone levels climb. There is no single 'right' moment when symptoms should begin.",
          "If you don't notice anything in the first few weeks, that's also common. Symptom timing varies enormously between people and between pregnancies for the same person.",
        ],
        callout: {
          tone: "reassurance",
          text: "Symptom strength is not a measure of pregnancy health. Strong, mild, and absent symptoms are all within the range of normal in the first weeks.",
        },
      },
      {
        id: "earliest-signs-before-missed-period",
        heading: "The earliest signs before a missed period",
        lead: "The signs that show up earliest are usually subtle: a shift in how things smell, a deeper-than-usual tiredness, slight breast changes, or a small amount of spotting around the time you'd expect implantation.",
        paragraphs: [
          "These early changes are easy to miss or attribute to something else. Many people only recognise them in hindsight, after a positive test.",
          "A raised basal body temperature that stays high beyond the usual luteal phase length is one of the more reliable early signals if you've been tracking. Brief, light spotting one to two weeks after ovulation can also point to implantation, though most people don't have any spotting at all.",
        ],
      },
      {
        id: "most-common-early-symptoms",
        heading: "The most common early symptoms, and what causes them",
        lead: "Nausea, breast tenderness, fatigue, smell sensitivity, frequent urination, mood changes, and food aversions make up most of the early-symptom picture. Each one has a clear hormonal explanation.",
        subsections: [
          {
            subheading: "hCG, progesterone, and why nausea shows up",
            paragraphs: [
              "Rapidly rising hCG is the main trigger for early-pregnancy nausea. Levels roughly double every two to three days in the first weeks, and the speed of that rise is what most people feel.",
              "Progesterone slows digestion across the body. That slowing helps maintain the pregnancy but also contributes to bloating, fullness, constipation, and the queasy feeling that comes with an empty stomach.",
            ],
          },
          {
            subheading: "Heightened sense of smell",
            paragraphs: [
              "Oestrogen amplifies the olfactory system in early pregnancy. Smells you'd normally pass without noticing — coffee, certain foods, perfume, the inside of the fridge — can become overwhelming or trigger nausea on their own.",
              "This is often one of the first symptoms people notice, sometimes before they've even taken a test.",
            ],
          },
          {
            subheading: "Breast and areola changes",
            paragraphs: [
              "Tender, swollen, or unusually heavy breasts are common from very early on, driven by oestrogen and progesterone preparing the milk-producing tissue. The areolas may darken and the small bumps on them (Montgomery's tubercles) can become more visible.",
              "These changes can feel similar to premenstrual breast tenderness but tend to be more pronounced and last longer.",
            ],
          },
          {
            subheading: "Fatigue that feels different",
            paragraphs: [
              "Early pregnancy fatigue is often described as heavier or more sudden than ordinary tiredness. Your body is rapidly building the placenta — an entirely new organ — and that work alone uses significant energy.",
              "Rising progesterone also has a sedating effect. Many people find they need a nap during the day or a much earlier bedtime than usual through the first trimester.",
            ],
          },
        ],
      },
      {
        id: "implantation-bleeding",
        heading: "Implantation bleeding, spotting, and what's normal",
        lead: "Around 15–25% of people notice some light bleeding or spotting in early pregnancy. When it happens around the time you'd expect implantation, it is usually pink or light brown, light, and short.",
        paragraphs: [
          "Implantation bleeding is typically much lighter than a period, doesn't fill a pad, and lasts a few hours to a couple of days. It often appears six to twelve days after ovulation, which can be close to or just before an expected period.",
          "Light spotting later in the first trimester can also happen — sometimes after sex, a vaginal exam, or for no clear reason — and is usually not a sign of a problem. Heavier bleeding, particularly with cramping, is worth a same-day call to your midwife or doctor.",
        ],
        callout: {
          tone: "info",
          text: "If bleeding becomes heavier than a normal period, includes clots, or is accompanied by one-sided pain, contact your healthcare provider promptly.",
        },
      },
      {
        id: "cramping-and-bloating",
        heading: "Cramping and bloating in the first weeks",
        lead: "Mild, period-like cramping is very common in early pregnancy. The uterus is growing and the surrounding ligaments are stretching, both of which can produce a low, dull ache.",
        paragraphs: [
          "Bloating in early pregnancy is usually progesterone-driven. Slower digestion means food spends more time in the gut, which can leave you feeling fuller, more swollen, and more aware of your stomach than usual.",
          "Cramping that is sharp, one-sided, or steadily worsening is different. That kind of pain is worth checking with a clinician, particularly in the first trimester.",
        ],
      },
      {
        id: "vs-pms",
        heading: "How early symptoms differ from PMS",
        lead: "Many early-pregnancy symptoms overlap with PMS — sore breasts, mood changes, bloating, mild cramping. The clearest difference is usually duration and what happens around your expected period.",
        paragraphs: [
          "PMS symptoms typically peak in the days before a period and ease once bleeding starts. Early-pregnancy symptoms tend to continue and often intensify across the days when a period would otherwise be expected.",
          "A consistently raised basal body temperature beyond the usual luteal phase, areolas that look noticeably darker or larger, and a thicker creamy discharge can be more pregnancy-specific signals. None of these are definitive on their own — only a positive test can confirm.",
        ],
      },
      {
        id: "when-to-test",
        heading: "When you can take a home pregnancy test",
        lead: "Most home pregnancy tests are accurate from the day of an expected period. A few sensitive tests can detect hCG four to five days earlier, but a negative early test is not reliable.",
        paragraphs: [
          "hCG roughly doubles every two to three days in early pregnancy. Testing too early — particularly with later-in-the-day urine — is a common cause of false negatives.",
          "If your period is late and an early test was negative, repeating it after two or three days with first-morning urine is the most reliable approach. A blood test ordered by a clinician can detect hCG slightly earlier and more precisely if you need an answer sooner.",
        ],
      },
      {
        id: "when-to-speak-to-a-doctor",
        heading: "When to speak with a midwife or doctor",
        lead: "Most early-pregnancy symptoms don't need clinical input. A small number of signs do, and recognising them early matters more than tracking the rest.",
        paragraphs: [
          "Contact your healthcare provider if you can't keep fluids down for 24 hours or longer, are losing weight quickly, have heavy bleeding or persistent one-sided pain, develop a high fever, or feel something is genuinely wrong even if you can't name it.",
          "Severe nausea and vomiting (hyperemesis gravidarum) is a recognised condition with effective treatment — you don't have to push through it alone. The same is true of early-pregnancy anxiety, which is more common than it's usually talked about.",
        ],
      },
    ],
  },

  // ─── CORNERSTONE: POSTPARTUM RECOVERY TIMELINE ───────────────────────────
  {
    slug: "postpartum-recovery-timeline",
    title: "Postpartum recovery: what to expect in the weeks and months after birth",
    metaDescription: "A comprehensive guide to postpartum recovery. Physical healing, emotional adjustment, and what to expect in the first days, weeks, and months after having a baby.",
    isCornerstone: true,
    quickAnswer:
      "Postpartum recovery is a gradual process that unfolds over weeks and months, not days. Physical healing from birth typically takes 6-8 weeks, but full recovery, including hormonal adjustment, emotional processing, and finding a new rhythm, takes much longer. There is no single timeline that applies to everyone.",
    howThisFeels: [
      "Feeling like your body has been through something enormous",
      "Navigating the gap between what you expected and how you actually feel",
      "The intensity of caring for a newborn while you are still recovering",
      "Not recognising your body or your emotions",
      "Feeling invisible in a moment that everyone else focuses on the baby",
    ],
    whatHappening: {
      commonCauses: [
        {
          heading: "Physical recovery from birth",
          body: "Whether vaginal or caesarean, birth is a major physical event. Your body needs time to heal, manage bleeding (lochia), and recover muscle and tissue integrity.",
        },
        {
          heading: "Hormonal crash",
          body: "Oestrogen and progesterone drop dramatically after birth. This sudden change affects mood, energy, sleep, and physical symptoms. It takes weeks for hormones to stabilise.",
        },
        {
          heading: "Sleep deprivation",
          body: "Newborn feeding patterns mean broken sleep for weeks or months. This affects everything from mood to healing to cognitive function.",
        },
      ],
      lessCauses: [
        {
          heading: "Breastfeeding demands",
          body: "If breastfeeding, your body is producing milk around the clock, which has its own energy and nutritional cost.",
        },
        {
          heading: "Identity and role adjustment",
          body: "Becoming a parent changes how you relate to yourself, your partner, your work, and your life. This psychological adjustment is real and significant.",
        },
      ],
      whyItVaries:
        "Recovery depends on the type of birth, any complications, your physical health, your support system, your baby's temperament, and your emotional state. There is no \"normal\" speed of recovery.",
    },
    timing: {
      whenStarts: "Recovery begins immediately after birth.",
      whenPeaks: "The most intense physical recovery occurs in the first 2-4 weeks.",
      whenEases: "Physical healing is generally well advanced by 6-8 weeks. Emotional and hormonal adjustment continues for months.",
    },
    whatItFeelsLike: [
      "Physical soreness and exhaustion",
      "Emotional highs and lows that can change hour by hour",
      "A deep love alongside moments of overwhelm",
      "Feeling proud and afraid at the same time",
      "The strange loneliness of new parenthood",
    ],
    whatThisMeans:
      "Postpartum recovery is not just about physical healing. It is a full-body, full-mind adjustment to a completely new life. The difficulty of it does not mean you are failing. It means you are going through something genuinely hard.",
    normal: [
      "Bleeding (lochia) for up to 6 weeks",
      "Pain and discomfort at the birth site",
      "Night sweats as hormones adjust",
      "Mood swings and crying",
      "Feeling overwhelmed by the responsibility",
      "Difficulty bonding immediately",
      "Hair loss from around month 3",
      "Body shape and weight changes",
    ],
    seekSupport: [
      "Feelings of despair, emptiness, or detachment lasting more than two weeks",
      "Intrusive thoughts about harming yourself or your baby",
      "Inability to sleep even when the baby is sleeping",
      "Feeling unable to care for your baby",
      "Signs of infection at a wound site",
      "Heavy bleeding returning or worsening after it had reduced",
    ],
    disclaimer: "This is not medical advice. Your midwife, health visitor, and GP are available to support you in the postpartum period. If you are struggling emotionally, please reach out.",
    whatYouCanDo: [
      { action: "Accept that recovery takes time", reason: "Six weeks is a medical milestone, not a finish line. Full recovery takes much longer." },
      { action: "Accept help without guilt", reason: "You do not have to do this alone. Let people support you." },
      { action: "Eat and hydrate regularly", reason: "Your body is healing and, if breastfeeding, producing milk. Nutrition matters." },
      { action: "Move gently when ready", reason: "Short walks and gentle movement support recovery. Don't rush back to exercise." },
      { action: "Talk about how you're feeling", reason: "Emotional processing is part of recovery. Speak to your partner, a friend, or a professional." },
    ],
    whatHappensNext:
      "Recovery is gradual. Most people feel physically more like themselves by 3-4 months, though emotional and hormonal adjustment continues. The first year involves constant adaptation as your baby grows and changes. It does get easier, but it takes longer than most people expect.",
    relatedStage: {
      intro: "Explore the postpartum journey in more detail:",
      links: [
        { label: "Postpartum Hub", href: "/postpartum", context: "Your complete guide to the postpartum period." },
        { label: "First Year Hub", href: "/first-year", context: "What comes next as your baby grows." },
        { label: "Support Hub", href: "/support", context: "If you need emotional or practical support." },
      ],
    },
    aiPrompts: [
      "What is normal postpartum recovery?",
      "When will I feel like myself again?",
      "How do I know if what I'm feeling is baby blues or postnatal depression?",
    ],
    captureIntro: "The postpartum period is one of the most transformative experiences of a lifetime, and also one of the least documented. Recording how you're feeling creates something meaningful for the future.",
    journey: ["postpartum"],
    topics: ["body-changes", "timelines", "emotional-wellbeing", "safety-and-support"],
    faq: [
      {
        question: "How long does postpartum recovery take?",
        answer: "Physical healing from birth typically takes 6-8 weeks, but full recovery, including hormonal, emotional, and lifestyle adjustment, unfolds over months. There is no single timeline.",
      },
      {
        question: "What is the difference between baby blues and postnatal depression?",
        answer: "Baby blues are mild mood swings, tearfulness, and overwhelm in the first two weeks after birth, caused by hormonal changes. Postnatal depression is more persistent, lasting beyond two weeks, and may involve feelings of hopelessness, detachment, or inability to cope. Seek support if symptoms last longer than two weeks.",
      },
      {
        question: "When can I exercise after giving birth?",
        answer: "Gentle walking is usually fine within days. More intensive exercise should wait until after your 6-week check, and longer after a caesarean. Listen to your body and speak with your healthcare provider.",
      },
      {
        question: "Is it normal to not bond with my baby immediately?",
        answer: "Yes. Bonding is a process, not a moment. Many parents take days or weeks to feel a strong connection. This is normal and does not mean anything is wrong.",
      },
    ],
    compare: {
      heading: "Baby blues vs postnatal depression",
      description: "Understanding the difference helps you know when low mood is a temporary adjustment and when it may need additional support.",
      items: [
        {
          label: "Baby blues",
          points: [
            "Mild mood swings and tearfulness",
            "Usually starts within 2-3 days of birth",
            "Resolves within 1-2 weeks",
            "You can still function and care for your baby",
            "Caused by the sudden hormonal drop after birth",
          ],
        },
        {
          label: "Postnatal depression",
          points: [
            "Persistent low mood, hopelessness, or emptiness",
            "Lasts longer than two weeks and may worsen",
            "May affect your ability to care for yourself or your baby",
            "Can include anxiety, intrusive thoughts, or detachment",
            "Requires professional support and is very treatable",
          ],
        },
      ],
      commonConfusion: "Many people dismiss postnatal depression as \"just baby blues\" because they overlap in the early days. The key difference is duration and intensity.",
      whenToSeekHelp: "If low mood, anxiety, or difficulty coping lasts beyond two weeks, or if you have intrusive thoughts, please speak with your midwife, health visitor, or GP.",
    },
    productPromotion: "strong",
    keyTakeaways: [
      "Physical healing from birth typically takes 6-8 weeks",
      "Full recovery, including emotional adjustment, takes months",
      "Baby blues in the first two weeks are normal; lasting low mood may need support",
      "Sleep deprivation affects everything and sharing the load is important",
      "Recovery is not linear, and there is no single timeline",
    ],
    inThisArticle: ["Physical recovery", "Hormonal changes", "Emotional adjustment", "Baby blues vs postnatal depression", "When to seek support", "Common questions"],
    sources: ["NHS: Your body after pregnancy", "NICE postnatal care guidelines", "RCOG: Recovery after birth"],
    lastUpdated: "March 2026",
    reviewedBy: "Jenny Joines",
  },

  // ─── CORNERSTONE: TRYING TO CONCEIVE EXPLAINED ───────────────────────────
  {
    slug: "trying-to-conceive-explained",
    title: "Trying to conceive: everything you need to know about getting pregnant",
    metaDescription: "A comprehensive guide to trying to conceive. Understanding fertility, timing, ovulation, and what to expect on the journey to pregnancy.",
    isCornerstone: true,
    quickAnswer:
      "Getting pregnant requires timing intercourse around ovulation, which typically occurs once per cycle. Most couples conceive within 12 months of trying. Understanding your cycle, recognising ovulation signs, and managing expectations are the most important steps.",
    howThisFeels: [
      "The hope and anxiety of each month",
      "Not knowing if you're doing everything right",
      "The loneliness of a journey that's hard to talk about",
      "Watching for signs and symptoms constantly",
      "The emotional weight of waiting",
    ],
    whatHappening: {
      commonCauses: [
        { heading: "The ovulation window", body: "You can only conceive around ovulation. This window is roughly 12-24 hours, though sperm can survive for up to 5 days." },
        { heading: "Cycle length variation", body: "Not all cycles are 28 days. Ovulation timing varies between people and between cycles." },
        { heading: "Age and fertility", body: "Fertility gradually decreases with age, particularly after 35, but many people conceive naturally into their late 30s and beyond." },
      ],
      lessCauses: [
        { heading: "Lifestyle factors", body: "Nutrition, weight, stress, smoking, and alcohol can all affect fertility for both partners." },
        { heading: "Male fertility factors", body: "Roughly 30-40% of fertility challenges involve male factors." },
      ],
      whyItVaries: "The time it takes to conceive varies enormously. Some couples conceive in the first cycle; others take many months.",
    },
    timing: {
      whenStarts: "Most people begin trying after deciding they want to start a family.",
      whenPeaks: "Fertility is highest in the days around ovulation.",
      whenEases: "If you haven't conceived after 12 months (or 6 months if over 35), speak with your GP.",
    },
    whatItFeelsLike: [
      "A mix of excitement and anxiety each cycle",
      "The two-week wait feeling interminable",
      "Interpreting every sensation as a possible sign",
      "The disappointment when a period arrives",
    ],
    whatThisMeans: "Trying to conceive is a process that takes time for most people. Not conceiving immediately does not mean something is wrong.",
    normal: ["Taking up to 12 months to conceive", "Irregular cycles making timing difficult", "Feeling emotionally drained"],
    seekSupport: ["No conception after 12 months (or 6 months if over 35)", "Very irregular or absent periods", "Significant emotional distress"],
    disclaimer: "This is not medical advice. Speak with your GP or a fertility specialist if you have concerns.",
    whatYouCanDo: [
      { action: "Track your cycle", reason: "Understanding when you ovulate helps you time intercourse effectively." },
      { action: "Take folic acid", reason: "Start at least one month before trying to conceive." },
      { action: "Be patient with the process", reason: "Most couples take several months. This is normal." },
    ],
    whatHappensNext: "If you conceive, early pregnancy symptoms may appear from around weeks 4-6.",
    relatedStage: {
      intro: "Explore the trying to conceive journey:",
      links: [
        { label: "TTC Hub", href: "/trying-to-conceive" },
        { label: "Ovulation Calculator", href: "/ovulation-calculator" },
        { label: "IVF Hub", href: "/ivf" },
      ],
    },
    aiPrompts: ["How can I tell when I'm ovulating?", "How long does it normally take?", "When should I see a doctor?"],
    captureIntro: "The trying to conceive journey is full of hope, uncertainty, and private moments that deserve to be acknowledged.",
    journey: ["trying-to-conceive"],
    topics: ["timelines", "body-changes", "emotional-wellbeing", "practical-preparation"],
    productPromotion: "light",
    keyTakeaways: [
      "Most couples conceive within 12 months",
      "You can only conceive around ovulation",
      "Tracking your cycle helps identify your fertile window",
      "Seek medical advice after 12 months (or 6 months if over 35)",
    ],
    inThisArticle: ["How conception works", "Understanding ovulation", "What affects fertility", "When to seek support", "Common questions"],
    sources: ["NICE guidelines on fertility (2013, updated 2017)", "NHS: How long does it usually take to get pregnant?", "HFEA"],
    lastUpdated: "March 2026",
    reviewedBy: "Jenny Joines",
    faq: [
      { question: "How long does it take to get pregnant?", answer: "Most couples conceive within 12 months of regular unprotected intercourse." },
      { question: "What is the best time to have intercourse?", answer: "The 5 days before ovulation and the day of ovulation itself." },
      { question: "When should I see a fertility specialist?", answer: "After 12 months of trying (or 6 months if over 35)." },
    ],
  },

  // ─── CORNERSTONE: IVF TIMELINE ──────────────────────────────────────────
  {
    slug: "ivf-timeline-what-to-expect",
    title: "IVF timeline: what to expect at every stage of treatment",
    metaDescription: "A complete guide to the IVF process. From consultation through stimulation, egg collection, transfer, and the two-week wait.",
    isCornerstone: true,
    quickAnswer:
      "A typical IVF cycle takes 4-6 weeks from the start of medication to pregnancy test. The process involves ovarian stimulation, egg collection, fertilisation, embryo development, and transfer.",
    howThisFeels: [
      "Navigating medical procedures while managing intense hope",
      "The physical demands of daily injections",
      "Feeling like your body is no longer entirely yours",
      "Trying to stay hopeful while preparing for any outcome",
    ],
    whatHappening: {
      commonCauses: [
        { heading: "Ovarian stimulation", body: "Fertility medications stimulate your ovaries to produce multiple eggs. This phase lasts 10-14 days with regular monitoring." },
        { heading: "Egg collection", body: "A minor procedure under sedation where eggs are retrieved using ultrasound guidance." },
        { heading: "Fertilisation and embryo development", body: "Eggs are fertilised in the laboratory and monitored for 3-5 days." },
        { heading: "Embryo transfer", body: "One or two embryos are placed into the uterus. The procedure is usually quick and painless." },
      ],
      lessCauses: [
        { heading: "The two-week wait", body: "After transfer, you wait approximately two weeks before a pregnancy test. This is often the most emotionally difficult part." },
      ],
      whyItVaries: "Every IVF cycle is different. Response to medication, egg numbers, fertilisation rates, and embryo quality all vary.",
    },
    timing: {
      whenStarts: "A cycle typically begins with medication on day 1-3 of your period.",
      whenPeaks: "Egg collection usually occurs around day 12-14 of stimulation.",
      whenEases: "A pregnancy test is taken approximately 14 days after embryo transfer.",
    },
    whatItFeelsLike: [
      "Physical bloating and discomfort during stimulation",
      "Emotional rollercoaster of hope and fear",
      "Waiting for daily embryo update calls",
      "The intensity of the two-week wait",
    ],
    whatThisMeans: "IVF is a medically intensive process with significant emotional weight. Whatever you are feeling is valid.",
    normal: ["Bloating during stimulation", "Emotional intensity throughout", "Not all eggs fertilising", "Mild cramping after transfer"],
    seekSupport: ["Severe abdominal pain or swelling", "Heavy bleeding after egg collection", "Symptoms of infection", "Emotional distress that feels unmanageable"],
    disclaimer: "This is not medical advice. Your fertility clinic will provide specific guidance.",
    whatYouCanDo: [
      { action: "Follow your medication schedule precisely", reason: "Timing is critical during IVF." },
      { action: "Stay hydrated and eat protein-rich foods", reason: "Supports your body during treatment." },
      { action: "Be gentle with yourself during the two-week wait", reason: "Reduce pressure where you can." },
    ],
    whatHappensNext: "If successful, early pregnancy symptoms may begin within weeks. If not, your clinic will discuss next steps.",
    relatedStage: {
      intro: "Explore the IVF journey:",
      links: [
        { label: "IVF Hub", href: "/ivf" },
        { label: "IVF Timeline Tool", href: "/ivf-timeline" },
        { label: "Support Hub", href: "/support" },
      ],
    },
    aiPrompts: ["What happens during IVF stimulation?", "What to expect after embryo transfer?", "How to cope with the two-week wait?"],
    captureIntro: "The IVF journey is one of the most intense experiences many people go through.",
    journey: ["ivf"],
    topics: ["timelines", "body-changes", "emotional-wellbeing"],
    productPromotion: "minimal",
    keyTakeaways: [
      "A typical IVF cycle takes 4-6 weeks",
      "Stimulation involves daily injections for 10-14 days",
      "Not all eggs will fertilise, and this is normal",
      "The two-week wait is often the hardest part",
      "Every cycle is different",
    ],
    inThisArticle: ["How IVF works", "Stimulation phase", "Egg collection", "Embryo transfer", "The two-week wait", "Common questions"],
    sources: ["HFEA", "NICE guidelines on fertility treatment (CG156)", "NHS: IVF"],
    lastUpdated: "March 2026",
    reviewedBy: "Jenny Joines",
    faq: [
      { question: "What is the success rate of IVF?", answer: "Average live birth rate is approximately 23% per cycle for women under 35, decreasing with age." },
      { question: "How many cycles does it usually take?", answer: "Many people succeed within 1-3 cycles, but this varies significantly." },
      { question: "Is IVF painful?", answer: "Injections can be uncomfortable but manageable. Egg collection is done under sedation. Most find the emotional demands harder than the physical ones." },
    ],
    compare: {
      heading: "IVF symptoms vs early pregnancy symptoms",
      description: "During the two-week wait, it can be difficult to tell whether symptoms are from medication or early pregnancy.",
      items: [
        {
          label: "IVF medication effects",
          points: ["Bloating from stimulation", "Breast tenderness from progesterone", "Fatigue from hormonal changes", "Mood changes from medication"],
        },
        {
          label: "Early pregnancy symptoms",
          points: ["Bloating from rising hCG", "Breast tenderness from hormonal changes", "Fatigue from progesterone", "Mood changes from hormonal shifts"],
        },
      ],
      commonConfusion: "The symptoms are nearly identical because many are caused by progesterone, which IVF medication provides.",
      whenToSeekHelp: "Contact your clinic if you experience severe pain, heavy bleeding, or difficulty breathing.",
    },
  },

  // ─── CORNERSTONE: BABY SLEEP IN THE FIRST YEAR ──────────────────────────
  {
    slug: "baby-sleep-first-year",
    title: "Baby sleep in the first year: what to expect and what is normal",
    metaDescription: "A comprehensive guide to baby sleep in the first year. What is normal, how sleep develops, and what helps.",
    isCornerstone: true,
    quickAnswer:
      "Baby sleep changes dramatically throughout the first year. Newborns sleep in short cycles of 2-4 hours. By 6 months, many babies sleep longer stretches. By 12 months, most consolidate to 1-2 naps. There is enormous variation in what is normal.",
    howThisFeels: [
      "The exhaustion of broken sleep night after night",
      "Comparing your baby's sleep to others",
      "The pressure to have a baby who sleeps through",
      "Not knowing whether to intervene or wait",
    ],
    whatHappening: {
      commonCauses: [
        { heading: "Developing circadian rhythm", body: "Newborns do not have a day-night cycle. This develops gradually over the first 3-4 months." },
        { heading: "Sleep cycle maturation", body: "Baby sleep cycles are shorter than adults' (about 40-50 minutes). Babies naturally wake between cycles." },
        { heading: "Growth and feeding needs", body: "Frequent waking for feeds is normal and necessary, particularly in the early months." },
      ],
      lessCauses: [
        { heading: "Sleep regressions", body: "Disrupted sleep often coincides with developmental leaps (around 4, 8, 12, 18 months). These are temporary." },
        { heading: "Teething and illness", body: "Physical discomfort can temporarily disrupt sleep." },
      ],
      whyItVaries: "Baby sleep varies enormously. Temperament, feeding method, developmental stage, and biology all play a role.",
    },
    timing: {
      whenStarts: "Sleep challenges begin at birth and evolve throughout the first year.",
      whenPeaks: "Most intense sleep deprivation is usually in the first 3-4 months.",
      whenEases: "Many families notice improvement between 4-6 months, with further consolidation by 12 months.",
    },
    whatItFeelsLike: [
      "Bone-deep exhaustion that affects everything",
      "The desperation of 3am wakings",
      "Questioning every decision about sleep",
      "The gradual improvement that is hard to see in the moment",
    ],
    whatThisMeans: "Disrupted sleep in the first year is normal infant development, not a failure of parenting.",
    normal: ["Newborns waking every 2-4 hours", "Sleep patterns changing frequently", "Not sleeping through by 6 or even 12 months"],
    seekSupport: ["Baby seems excessively sleepy or difficult to wake", "Sleep deprivation significantly affecting your mental health", "Breathing difficulties during sleep"],
    disclaimer: "This is not medical advice. Follow NHS and Lullaby Trust safe sleep guidelines.",
    whatYouCanDo: [
      { action: "Follow safe sleep guidelines", reason: "Place baby on their back in a clear, firm sleep space." },
      { action: "Establish a bedtime routine from around 3-4 months", reason: "Consistent cues help signal sleep time." },
      { action: "Share the load where possible", reason: "Sleep deprivation is cumulative." },
    ],
    whatHappensNext: "Sleep gradually consolidates. Most babies move to 1-2 naps and longer overnight stretches by 12-18 months.",
    relatedStage: {
      intro: "Explore the first year:",
      links: [
        { label: "First Year Hub", href: "/first-year" },
        { label: "Postpartum Hub", href: "/postpartum" },
      ],
    },
    aiPrompts: ["Is it normal for my baby to still wake at night?", "What is the 4-month sleep regression?", "How can I help my baby sleep better?"],
    captureIntro: "The sleep-deprived early months are a blur that many parents wish they could remember more clearly.",
    journey: ["first-year", "postpartum"],
    topics: ["development", "timelines", "practical-preparation"],
    productPromotion: "strong",
    keyTakeaways: [
      "Baby sleep varies enormously and most patterns are normal",
      "A circadian rhythm develops around 3-4 months",
      "Sleep regressions coincide with developmental leaps",
      "Following safe sleep guidelines is the most important thing",
    ],
    inThisArticle: ["How baby sleep develops", "Month by month expectations", "Sleep regressions", "Safe sleep", "What helps", "Common questions"],
    sources: ["NHS: Helping your baby to sleep", "The Lullaby Trust", "BASIS, Durham University"],
    lastUpdated: "March 2026",
    reviewedBy: "Jenny Joines",
    faq: [
      { question: "When do babies sleep through the night?", answer: "There is no single answer. Some from 3-4 months; others take much longer. Sleeping through at 12 months or later is normal." },
      { question: "What is the 4-month sleep regression?", answer: "Around 4 months, sleep cycles mature and become more adult-like, temporarily increasing night waking. It is developmental, not a step backwards." },
      { question: "Should I sleep train my baby?", answer: "This is a personal choice. There are many approaches. Choose what feels right for your family." },
    ],
  },

  // ─── SECOND TRIMESTER COMPLETE GUIDE (Cornerstone) ──────────────────────
  {
    slug: "second-trimester-complete-guide",
    title: "Second trimester: everything you need to know about weeks 13 to 27",
    metaDescription: "What happens in the second trimester? A complete guide to symptoms, baby development, body changes, and what to expect from weeks 13 to 27.",
    quickAnswer: "The second trimester often brings relief from early pregnancy symptoms and growing energy. Your baby develops rapidly, and you may start feeling movement. Most people consider this the most comfortable trimester.",
    howThisFeels: [
      "A sense of relief as nausea fades",
      "Excitement mixed with growing awareness of the changes ahead",
      "Starting to feel more connected as your bump grows",
      "Moments of worry between scans and appointments",
    ],
    whatHappening: {
      commonCauses: [
        { heading: "Baby's rapid development", body: "From around 14 weeks, your baby develops facial features, begins to hear, and grows significantly in size. By 27 weeks, they weigh around 900g." },
        { heading: "Physical changes", body: "Your bump becomes more visible. Ligament pain, skin changes, and increased blood volume are common. Many people notice reduced nausea and improved energy." },
        { heading: "Movement begins", body: "Most people feel their first movements (quickening) between 16 and 24 weeks. These may feel like fluttering, bubbling, or gentle taps." },
      ],
      lessCauses: [
        { heading: "Round ligament pain", body: "Sharp or aching pain in the lower abdomen caused by stretching ligaments supporting the uterus." },
        { heading: "Braxton Hicks", body: "Some people begin to notice practice contractions in the second trimester. These are usually painless and irregular." },
      ],
      whyItVaries: "Every pregnancy is different. Some people sail through the second trimester while others experience ongoing discomfort.",
    },
    timing: {
      whenStarts: "The second trimester begins at week 13.",
      whenPeaks: "Weeks 18-22 often feel like the peak of energy and comfort.",
      whenEases: "The second trimester ends at week 27, transitioning into the third trimester.",
    },
    whatItFeelsLike: [
      "Feeling more like yourself again after the fog of the first trimester",
      "The thrill of the anatomy scan",
      "Adjusting to a changing body shape",
      "Starting to plan and prepare",
    ],
    whatThisMeans: "The second trimester is a time of significant growth for your baby and often greater comfort for you. It is a natural midpoint to settle into the journey.",
    normal: ["Occasional round ligament pain", "Skin changes like linea nigra or stretch marks", "Increased appetite and energy", "Mild swelling in hands or feet"],
    seekSupport: ["Severe abdominal pain or cramping", "Heavy bleeding", "No movement felt by 24 weeks", "Persistent headaches with vision changes"],
    disclaimer: "This is general guidance, not medical advice. Contact your midwife or GP with specific concerns.",
    whatYouCanDo: [
      { action: "Attend your mid-pregnancy scan (around 20 weeks)", reason: "This checks your baby's development and can identify any concerns early." },
      { action: "Stay active with gentle exercise", reason: "Walking, swimming, and yoga support energy and wellbeing." },
      { action: "Start thinking about birth preferences", reason: "The second trimester is a calm time to begin considering your options." },
      { action: "Continue taking folic acid and vitamin D", reason: "These support ongoing development." },
    ],
    whatHappensNext: "The third trimester brings the final stage of preparation, with more frequent appointments and your baby gaining weight rapidly.",
    relatedStage: {
      intro: "Continue exploring pregnancy:",
      links: [
        { label: "Pregnancy Hub", href: "/pregnancy" },
        { label: "First Trimester Guide", href: "/articles/complete-guide-first-trimester" },
        { label: "Third Trimester Guide", href: "/articles/third-trimester-complete-guide" },
      ],
    },
    aiPrompts: ["What should I expect in the second trimester?", "When will I feel my baby move?", "Is round ligament pain normal?"],
    captureIntro: "The second trimester often brings moments of joy and connection worth holding onto.",
    trimester: [2],
    journey: ["pregnancy"],
    topics: ["body-changes", "development", "timelines"],
    isCornerstone: true,
    productPromotion: "strong",
    keyTakeaways: [
      "The second trimester runs from week 13 to week 27",
      "Many people feel more energy and less nausea during this stage",
      "First movements are usually felt between 16 and 24 weeks",
      "The anatomy scan at around 20 weeks is a key milestone",
    ],
    inThisArticle: ["What happens in the second trimester", "Baby development", "Body changes", "Common symptoms", "The anatomy scan", "What helps", "Common questions"],
    sources: ["NHS: Your pregnancy week by week", "Tommy's: Second trimester", "RCOG: Pregnancy information"],
    lastUpdated: "March 2026",
    reviewedBy: "Jenny Joines",
    faq: [
      { question: "When will I feel my baby move for the first time?", answer: "Most people feel first movements between 16 and 24 weeks. First-time parents may feel them later, closer to 20-24 weeks." },
      { question: "Is it normal to feel pain in the second trimester?", answer: "Mild round ligament pain and growing pains are common. Severe or persistent pain should be checked by your midwife." },
      { question: "What happens at the 20-week scan?", answer: "The anatomy scan checks your baby's development in detail, including organs, bones, and the placenta. You may also find out the sex if you wish." },
    ],
  },

  // ─── THIRD TRIMESTER COMPLETE GUIDE (Cornerstone) ───────────────────────
  {
    slug: "third-trimester-complete-guide",
    title: "Third trimester: everything you need to know about weeks 28 to birth",
    metaDescription: "What happens in the third trimester? A complete guide to symptoms, preparation, baby position, and what to expect from week 28 to birth.",
    quickAnswer: "The third trimester is the final stretch of pregnancy. Your baby gains weight rapidly, you may feel more tired and uncomfortable, and your body begins preparing for birth. It is a time of anticipation, physical change, and emotional intensity.",
    howThisFeels: [
      "A growing mix of excitement and nervousness",
      "Feeling physically heavier and more tired",
      "Impatience to meet your baby",
      "Emotional waves as the reality of birth approaches",
    ],
    whatHappening: {
      commonCauses: [
        { heading: "Baby's final growth", body: "Your baby gains most of their weight in the third trimester, developing fat stores, maturing lungs, and preparing for life outside the womb." },
        { heading: "Body preparing for birth", body: "Braxton Hicks contractions become more frequent. The baby may engage (move head-down into the pelvis). Your cervix begins to soften." },
        { heading: "Increased discomfort", body: "Pressure on the bladder, breathlessness, backache, and difficulty sleeping are common as your baby takes up more space." },
      ],
      lessCauses: [
        { heading: "Pelvic girdle pain", body: "Hormone changes and the weight of the baby can cause pain in the pelvis, hips, or lower back." },
        { heading: "Swelling", body: "Mild swelling in feet, ankles, and hands is common due to increased fluid retention." },
      ],
      whyItVaries: "The third trimester feels different for everyone depending on baby position, fitness, previous pregnancies, and individual health.",
    },
    timing: {
      whenStarts: "The third trimester begins at week 28.",
      whenPeaks: "Weeks 36-40 are often the most physically intense.",
      whenEases: "It ends at birth, typically between 37 and 42 weeks.",
    },
    whatItFeelsLike: [
      "The physical weight of carrying a full-term baby",
      "Nights of broken sleep and constant bathroom trips",
      "Nesting energy mixed with exhaustion",
      "A deep emotional pull towards meeting your baby",
    ],
    whatThisMeans: "Your body is doing extraordinary work preparing for birth. The discomfort is temporary and purposeful.",
    normal: ["Braxton Hicks contractions", "Difficulty sleeping", "Frequent urination", "Mild swelling", "Increased vaginal discharge"],
    seekSupport: ["Reduced or changed baby movements", "Severe headache with visual disturbances", "Sudden severe swelling in face or hands", "Regular painful contractions before 37 weeks", "Vaginal bleeding"],
    disclaimer: "This is general guidance, not medical advice. Always contact your maternity unit if you are concerned.",
    whatYouCanDo: [
      { action: "Monitor baby movements daily", reason: "Knowing your baby's pattern helps you notice changes early." },
      { action: "Prepare your birth preferences", reason: "Having a flexible plan helps you feel more in control." },
      { action: "Pack your hospital bag from around 36 weeks", reason: "Being prepared reduces last-minute stress." },
      { action: "Rest when you can", reason: "Your body needs energy for birth and recovery." },
    ],
    whatHappensNext: "Birth and the beginning of your postpartum journey. The transition from pregnancy to parenthood is one of the most profound changes you will experience.",
    relatedStage: {
      intro: "Continue exploring:",
      links: [
        { label: "Pregnancy Hub", href: "/pregnancy" },
        { label: "Postpartum Hub", href: "/postpartum" },
        { label: "Preparing for Baby", href: "/preparing-for-baby" },
      ],
    },
    aiPrompts: ["What should I pack in my hospital bag?", "How do I know if contractions are real?", "When should I call the hospital?"],
    captureIntro: "The final weeks of pregnancy are filled with anticipation. These moments are worth capturing before everything changes.",
    trimester: [3],
    journey: ["pregnancy"],
    topics: ["body-changes", "symptoms", "timelines", "practical-preparation"],
    isCornerstone: true,
    productPromotion: "strong",
    keyTakeaways: [
      "The third trimester runs from week 28 to birth",
      "Your baby gains most of their weight during this stage",
      "Monitor baby movements daily and report any changes",
      "Prepare for birth while resting when you can",
    ],
    inThisArticle: ["What happens in the third trimester", "Baby development", "Common symptoms", "Preparing for birth", "When to seek help", "Common questions"],
    sources: ["NHS: Your pregnancy week by week", "Tommy's: Third trimester", "RCOG: Reduced fetal movements"],
    lastUpdated: "March 2026",
    reviewedBy: "Jenny Joines",
    faq: [
      { question: "How do I know if contractions are real or Braxton Hicks?", answer: "Braxton Hicks are usually irregular, painless, and stop with movement or rest. Real contractions become regular, longer, and more intense over time." },
      { question: "When should I go to the hospital?", answer: "Contact your maternity unit if contractions are regular (every 5 minutes), your waters break, you have reduced movements, or you are concerned about anything." },
      { question: "What is the best sleeping position in the third trimester?", answer: "Sleeping on your side (particularly the left) is recommended from 28 weeks as it supports blood flow to your baby." },
    ],
  },

  // ─── PREPARING FOR BABY COMPLETE GUIDE (Cornerstone) ────────────────────
  {
    slug: "preparing-for-baby-complete-guide",
    title: "Preparing for baby: a calm, complete guide to getting ready",
    metaDescription: "How to prepare for a baby without the overwhelm. A calm, structured guide covering essentials, nursery, finances, relationships, and emotional readiness.",
    quickAnswer: "Preparing for a baby can feel overwhelming, but you do not need everything at once. Focus on the essentials first, give yourself time, and trust that you will figure the rest out as you go.",
    howThisFeels: [
      "Excitement mixed with overwhelm at everything there is to do",
      "Pressure from lists, advice, and opinions from everyone around you",
      "Uncertainty about whether you are doing enough",
      "Moments of calm when something clicks into place",
    ],
    whatHappening: {
      commonCauses: [
        { heading: "Physical preparation", body: "Setting up a safe sleep space, gathering feeding supplies, and buying essential clothing and nappies." },
        { heading: "Emotional preparation", body: "Processing the transition to parenthood, managing expectations, and building support systems." },
        { heading: "Practical preparation", body: "Understanding maternity rights, planning finances, meal prepping, and organising your home." },
      ],
      lessCauses: [
        { heading: "Relationship changes", body: "Preparing for how your relationship with your partner, family, and friends may shift after baby arrives." },
        { heading: "Identity shift", body: "The gradual process of adjusting your sense of self as parenthood approaches." },
      ],
      whyItVaries: "What preparation looks like depends on your circumstances, support system, budget, and personal preferences.",
    },
    timing: {
      whenStarts: "Most people begin practical preparation in the second or early third trimester.",
      whenEases: "Preparation is ongoing. The early weeks with a baby involve constant learning and adjusting.",
    },
    whatItFeelsLike: [
      "The satisfaction of ticking things off a list",
      "The anxiety of wondering if you have forgotten something important",
      "The joy of imagining your baby in the space you have created",
      "The quiet realisation that no amount of preparation fully prepares you",
    ],
    whatThisMeans: "Preparation is not about perfection. It is about creating a safe, calm foundation so you can focus on your baby when they arrive.",
    normal: ["Feeling overwhelmed by how much there is to do", "Changing your mind about purchases or plans", "Not feeling ready even close to your due date"],
    seekSupport: ["Anxiety about preparation that affects your daily life", "Financial stress that feels unmanageable", "Relationship difficulties that are worsening"],
    disclaimer: "This is general guidance, not professional advice. Speak to your midwife or a counsellor if you are struggling.",
    whatYouCanDo: [
      { action: "Focus on essentials first", reason: "A safe sleep space, feeding supplies, nappies, and basic clothing are all you truly need at the start." },
      { action: "Accept help and delegate", reason: "You do not need to do everything yourself." },
      { action: "Prepare some meals in advance", reason: "Batch cooking for the freezer saves energy in the early weeks." },
      { action: "Talk about expectations with your partner", reason: "Shared understanding reduces conflict after baby arrives." },
    ],
    whatHappensNext: "Your baby arrives, and the real learning begins. Trust yourself. You will adapt.",
    relatedStage: {
      intro: "Explore more:",
      links: [
        { label: "Preparing for Baby Hub", href: "/preparing-for-baby" },
        { label: "Third Trimester Guide", href: "/articles/third-trimester-complete-guide" },
        { label: "Postpartum Recovery", href: "/articles/postpartum-recovery-timeline" },
      ],
    },
    aiPrompts: ["What do I actually need for a newborn?", "How do I prepare emotionally for a baby?", "What should I buy first?"],
    captureIntro: "The anticipation of preparing for your baby is a chapter worth remembering.",
    journey: ["preparing-for-baby", "pregnancy"],
    topics: ["practical-preparation", "emotional-wellbeing"],
    isCornerstone: true,
    productPromotion: "strong",
    keyTakeaways: [
      "You do not need everything at once. Start with the essentials.",
      "Emotional preparation matters as much as practical preparation",
      "Accept help and lower your expectations of perfection",
      "A safe sleep space, feeding supplies, and nappies are the true essentials",
    ],
    inThisArticle: ["What you actually need", "Nursery and sleep space", "Feeding preparation", "Finances and leave", "Emotional readiness", "Relationships", "Common questions"],
    sources: ["NHS: Getting ready for your baby", "The Lullaby Trust: Safer sleep", "NCT: Preparing for parenthood"],
    lastUpdated: "March 2026",
    reviewedBy: "Jenny Joines",
    faq: [
      { question: "What do I actually need for a newborn?", answer: "A safe sleep space (moses basket or cot), nappies, basic clothing (bodysuits, sleepsuits), feeding supplies, and a car seat if driving from hospital." },
      { question: "When should I start buying baby things?", answer: "Many people start in the second trimester. There is no rush. Focus on essentials first and add as you go." },
      { question: "How do I prepare emotionally for a baby?", answer: "Talk to other parents, discuss expectations with your partner, and give yourself permission to not have all the answers. Emotional readiness is a process, not a destination." },
    ],
  },

  // ─── EMOTIONAL WELLBEING IN PREGNANCY (Cornerstone) ─────────────────────
  {
    slug: "emotional-wellbeing-pregnancy",
    title: "Emotional wellbeing in pregnancy: what is normal and when to seek support",
    metaDescription: "Mood changes, anxiety, and emotional ups and downs in pregnancy. What is normal, what is not, and where to find support when you need it.",
    quickAnswer: "Emotional changes in pregnancy are completely normal. Hormones, physical discomfort, life changes, and uncertainty all affect how you feel. Most mood shifts are a natural part of the journey, but persistent low mood or anxiety should always be taken seriously.",
    howThisFeels: [
      "Crying at things that would not normally affect you",
      "Swinging between excitement and fear",
      "Feeling disconnected or not how you expected to feel",
      "Worrying about everything, even when you know it is unlikely",
    ],
    whatHappening: {
      commonCauses: [
        { heading: "Hormonal changes", body: "Rising levels of oestrogen and progesterone directly affect mood regulation, sleep, and emotional sensitivity." },
        { heading: "Life transition", body: "Pregnancy represents one of the biggest identity and lifestyle shifts a person can experience. Emotional responses to this are healthy." },
        { heading: "Physical discomfort", body: "Nausea, fatigue, pain, and poor sleep all impact emotional resilience." },
      ],
      lessCauses: [
        { heading: "Antenatal anxiety", body: "Persistent, excessive worry about pregnancy, birth, or the baby that interferes with daily life. This affects around 1 in 5 pregnant people." },
        { heading: "Antenatal depression", body: "Low mood, loss of interest, and withdrawal that lasts more than two weeks. This is a medical condition, not a character flaw." },
      ],
      whyItVaries: "Emotional experiences depend on personal history, support systems, physical health, previous pregnancies, and individual brain chemistry.",
    },
    timing: {
      whenStarts: "Emotional changes can begin in early pregnancy and continue throughout.",
      whenPeaks: "The first trimester and the weeks approaching birth are often the most emotionally intense.",
      whenEases: "Many people find the second trimester calmer, though emotional shifts can return in the third trimester.",
    },
    whatItFeelsLike: [
      "Feeling everything more intensely than usual",
      "Guilt about not feeling happy enough",
      "Fear that something is wrong with you",
      "Relief when someone validates that this is normal",
    ],
    whatThisMeans: "Your emotional life in pregnancy is valid and important. Mood changes are expected. Persistent distress deserves support.",
    normal: ["Mood swings", "Crying more easily", "Increased worry about the baby", "Feeling ambivalent about pregnancy sometimes"],
    seekSupport: ["Low mood lasting more than two weeks", "Anxiety that interferes with daily life", "Thoughts of self-harm", "Feeling unable to cope", "Loss of interest in things you usually enjoy"],
    disclaimer: "This is general guidance, not a substitute for professional support. Speak to your midwife, GP, or a perinatal mental health service if you are struggling.",
    whatYouCanDo: [
      { action: "Talk to someone you trust", reason: "Sharing how you feel reduces isolation and often brings relief." },
      { action: "Be honest with your midwife", reason: "They can refer you to specialist perinatal mental health support." },
      { action: "Prioritise rest and gentle movement", reason: "Sleep and exercise both support emotional regulation." },
      { action: "Lower your expectations of yourself", reason: "You do not need to feel happy every day. Give yourself permission to feel what you feel." },
    ],
    whatHappensNext: "Emotional wellbeing continues to matter after birth. Postnatal mental health support is available and important.",
    relatedStage: {
      intro: "Related support:",
      links: [
        { label: "Support Hub", href: "/support" },
        { label: "Pregnancy Hub", href: "/pregnancy" },
        { label: "Postpartum Recovery", href: "/articles/postpartum-recovery-timeline" },
      ],
    },
    aiPrompts: ["Is it normal to feel anxious in pregnancy?", "I do not feel excited about my pregnancy", "How do I know if I have antenatal depression?"],
    captureIntro: "Your emotional journey through pregnancy is as significant as the physical one. These feelings matter.",
    journey: ["pregnancy", "support"],
    topics: ["emotional-wellbeing", "safety-and-support"],
    isCornerstone: true,
    productPromotion: "light",
    keyTakeaways: [
      "Mood changes in pregnancy are normal and expected",
      "Antenatal anxiety and depression affect around 1 in 5 people",
      "Persistent low mood or anxiety should always be discussed with your midwife",
      "Support is available and seeking help is a sign of strength",
    ],
    inThisArticle: ["Why emotions change in pregnancy", "What is normal", "Antenatal anxiety", "Antenatal depression", "When to seek help", "What helps", "Common questions"],
    sources: ["NHS: Mental health in pregnancy", "MIND: Perinatal mental health", "Tommy's: Mental health and pregnancy", "Maternal Mental Health Alliance"],
    lastUpdated: "March 2026",
    reviewedBy: "Jenny Joines",
    faq: [
      { question: "Is it normal to not feel excited about pregnancy?", answer: "Yes. Many people feel ambivalent, anxious, or numb at times. This does not mean anything is wrong with you or that you will not bond with your baby." },
      { question: "How do I know if I have antenatal depression?", answer: "If low mood, hopelessness, or loss of interest lasts more than two weeks and affects your daily life, speak to your midwife or GP. Screening tools can help identify what you are experiencing." },
      { question: "Will my mental health affect my baby?", answer: "Getting support for your mental health is one of the best things you can do for yourself and your baby. Treatment and support are safe and effective." },
    ],
  },

  // ─── BREASTFEEDING AND FEEDING GUIDE (Cornerstone) ──────────────────────
  {
    slug: "feeding-your-baby-complete-guide",
    title: "Feeding your baby: a complete guide to breastfeeding, formula, and combination feeding",
    metaDescription: "Everything you need to know about feeding your newborn. Breastfeeding, formula feeding, combination feeding, and when to seek help.",
    quickAnswer: "There is no single right way to feed your baby. Breastfeeding, formula, and combination feeding are all valid choices. What matters most is that your baby is fed, you are supported, and the method works for your family.",
    howThisFeels: [
      "Pressure to breastfeed and guilt when it is hard",
      "Exhaustion from round-the-clock feeding",
      "Relief when feeding clicks into place",
      "Confusion about conflicting advice",
    ],
    whatHappening: {
      commonCauses: [
        { heading: "Breastfeeding", body: "Breast milk provides complete nutrition and antibodies. It takes time to establish and can be challenging in the early days. Support makes a significant difference." },
        { heading: "Formula feeding", body: "Infant formula is a safe, nutritionally complete alternative. It allows others to share feeding responsibility and gives clear visibility of intake." },
        { heading: "Combination feeding", body: "Many families use a mix of breast and formula. This can offer flexibility while maintaining some breastfeeding benefits." },
      ],
      lessCauses: [
        { heading: "Expressed breast milk", body: "Pumping allows breast milk to be given by bottle, which can help when returning to work or sharing feeds." },
        { heading: "Tongue-tie and latch issues", body: "Physical difficulties like tongue-tie can make breastfeeding painful. These are treatable and common." },
      ],
      whyItVaries: "Feeding experiences vary enormously. Biology, support, circumstances, and personal choice all play a role.",
    },
    timing: {
      whenStarts: "Feeding begins immediately after birth.",
      whenPeaks: "The first 2-6 weeks are often the most intense for establishing feeding patterns.",
      whenEases: "Most families find a rhythm by 6-8 weeks, though this varies.",
    },
    whatItFeelsLike: [
      "The intensity of cluster feeding in the early days",
      "The bond that can develop through feeding",
      "The frustration when it does not go as expected",
      "The gradual confidence that comes with practice",
    ],
    whatThisMeans: "How you feed your baby is a personal decision. All methods can nourish your baby well. What matters is support, not judgement.",
    normal: ["Frequent feeding in the early weeks (8-12 times in 24 hours)", "Cluster feeding in the evenings", "Feeling unsure about whether your baby is getting enough", "Needing help with latch or positioning"],
    seekSupport: ["Baby is not producing wet or dirty nappies as expected", "Severe pain during breastfeeding that does not improve", "Baby seems excessively sleepy or difficult to wake for feeds", "Significant weight loss in the baby"],
    disclaimer: "This is general guidance. Speak to your midwife, health visitor, or a lactation consultant for personalised feeding support.",
    whatYouCanDo: [
      { action: "Ask for help early", reason: "Lactation consultants and infant feeding specialists can resolve most issues." },
      { action: "Feed responsively", reason: "Follow your baby's hunger cues rather than strict schedules in the early weeks." },
      { action: "Look after yourself", reason: "Hydration, nutrition, and rest all support milk production and your own recovery." },
      { action: "Let go of guilt", reason: "The best feeding method is the one that works for you and your baby." },
    ],
    whatHappensNext: "As your baby grows, feeding evolves. Solids are typically introduced around 6 months alongside continued milk feeds.",
    relatedStage: {
      intro: "Related guidance:",
      links: [
        { label: "Postpartum Hub", href: "/postpartum" },
        { label: "First Year Hub", href: "/first-year" },
        { label: "Baby Sleep Guide", href: "/articles/baby-sleep-first-year" },
      ],
    },
    aiPrompts: ["Is my baby getting enough milk?", "How do I know if breastfeeding is going well?", "Is it okay to combination feed?"],
    captureIntro: "The early feeding journey, however it looks, is one of the most intimate chapters of new parenthood.",
    journey: ["postpartum", "first-year"],
    topics: ["practical-preparation", "body-changes", "emotional-wellbeing"],
    isCornerstone: true,
    productPromotion: "light",
    keyTakeaways: [
      "Breastfeeding, formula, and combination feeding are all valid choices",
      "The first 2-6 weeks are the most intense for establishing feeding",
      "Ask for help early if feeding is painful or not going as expected",
      "Responsive feeding follows your baby's cues, not a strict schedule",
    ],
    inThisArticle: ["Breastfeeding basics", "Formula feeding", "Combination feeding", "Common challenges", "When to seek help", "Feeding and mental health", "Common questions"],
    sources: ["NHS: Breastfeeding", "NHS: Bottle feeding", "UNICEF Baby Friendly Initiative", "La Leche League GB"],
    lastUpdated: "March 2026",
    reviewedBy: "Jenny Joines",
    faq: [
      { question: "How do I know if my baby is getting enough milk?", answer: "Key signs include regular wet and dirty nappies, steady weight gain, and your baby seeming content after feeds. Your health visitor will monitor weight at regular check-ups." },
      { question: "Is it okay to mix breastfeeding and formula?", answer: "Yes. Combination feeding is common and can work well. Introducing formula does not mean you have to stop breastfeeding." },
      { question: "Why is breastfeeding so painful?", answer: "Some discomfort in the early days is common, but persistent pain usually indicates a latch issue or tongue-tie. A lactation consultant can help identify and resolve the cause." },
    ],
    compare: {
      heading: "Breastfeeding vs formula feeding",
      description: "Understanding the differences, benefits, and considerations of each feeding method.",
      items: [
        {
          label: "Breastfeeding",
          points: [
            "Provides antibodies and adapts to baby's needs",
            "Free but requires time and physical availability",
            "Can take time to establish and may need support",
            "Recommended by WHO for the first 6 months alongside solids",
          ],
        },
        {
          label: "Formula feeding",
          points: [
            "Nutritionally complete and regulated",
            "Allows others to share feeding responsibility",
            "Easier to measure intake",
            "Costs money and requires preparation and sterilisation",
          ],
        },
      ],
      commonConfusion: "Many people feel pressure to breastfeed exclusively. In reality, combination feeding is common and all methods can nourish your baby well.",
      whenToSeekHelp: "Seek support if feeding is painful, your baby is not gaining weight, or you are struggling emotionally with your feeding experience.",
    },
  },

  // ─── TTC: OVULATION SIGNS ─────────────────────────────────────────────────
  {
    slug: "signs-of-ovulation",
    title: "Signs of ovulation: how to tell when you're most fertile",
    metaDescription: "How to recognise ovulation signs, track your fertile window, and understand what your body is telling you each cycle.",
    quickAnswer: "Common signs of ovulation include changes in cervical mucus (becoming clear and stretchy), a slight rise in basal body temperature, mild pelvic pain, and increased libido. Not everyone notices obvious signs.",
    howThisFeels: ["Analysing every bodily change", "Feeling hopeful when you spot a sign", "Frustration when signs are unclear"],
    whatHappening: {
      commonCauses: [
        { heading: "Hormonal surge", body: "A surge in luteinising hormone (LH) triggers the release of an egg from the ovary." },
        { heading: "Cervical mucus changes", body: "Oestrogen causes cervical mucus to become clear, slippery, and stretchy around ovulation." },
      ],
      lessCauses: [
        { heading: "Mittelschmerz", body: "Some people feel a mild twinge or cramp on one side of the lower abdomen when the egg is released." },
      ],
      whyItVaries: "Not everyone experiences noticeable ovulation signs. Cycle length and hormonal patterns vary.",
    },
    timing: { whenStarts: "Signs typically appear 1-2 days before ovulation.", whenEases: "Signs resolve within 24-48 hours of ovulation." },
    whatItFeelsLike: ["Noticing changes in discharge", "A subtle one-sided twinge", "Feeling more energetic or interested in intimacy"],
    whatThisMeans: "These signs indicate your most fertile time. Timing intercourse around these signs can increase your chances of conceiving.",
    normal: ["No obvious signs at all", "Signs that vary month to month", "Cervical mucus changes being subtle"],
    seekSupport: ["No signs of ovulation and irregular periods", "Trying for more than 12 months without success"],
    disclaimer: "This is general guidance. Speak with your GP if you have concerns about ovulation.",
    whatYouCanDo: [
      { action: "Track cervical mucus daily", reason: "The most accessible and reliable home method." },
      { action: "Use ovulation predictor kits", reason: "These detect the LH surge that precedes ovulation." },
      { action: "Track your basal body temperature", reason: "A sustained rise confirms ovulation has occurred." },
    ],
    whatHappensNext: "After ovulation, the two-week wait begins. A pregnancy test can typically be taken from around the time of your expected period.",
    relatedStage: { intro: "Related:", links: [{ label: "TTC Hub", href: "/trying-to-conceive" }, { label: "Ovulation Calculator", href: "/ovulation-calculator" }] },
    aiPrompts: ["How do I track ovulation?", "What does fertile cervical mucus look like?"],
    captureIntro: "The trying to conceive journey deserves to be documented.",
    journey: ["trying-to-conceive"],
    topics: ["body-changes", "timelines"],
    productPromotion: "light",
    reviewedBy: "Jenny Joines",
    faq: [
      { question: "How do I know when I'm ovulating?", answer: "Look for clear, stretchy cervical mucus, a slight temperature rise, and mild pelvic discomfort. Ovulation predictor kits can also help." },
      { question: "Can you ovulate without signs?", answer: "Yes. Many people ovulate without noticing obvious physical signs. Tracking tools can help identify your pattern." },
    ],
  },

  // ─── TTC: TWO-WEEK WAIT ──────────────────────────────────────────────────
  {
    slug: "two-week-wait",
    title: "The two-week wait: what happens after ovulation and how to cope",
    metaDescription: "What is the two-week wait? What happens in your body, what symptoms to expect, and how to manage the anxiety of waiting.",
    quickAnswer: "The two-week wait (TWW) is the time between ovulation and when you can take a pregnancy test. During this time, if fertilisation occurred, the embryo travels to the uterus and implants. Symptoms during this time are unreliable indicators of pregnancy.",
    howThisFeels: ["Symptom-spotting everything", "Time moving impossibly slowly", "Hope and dread in equal measure", "The loneliness of not being able to talk about it"],
    whatHappening: {
      commonCauses: [
        { heading: "Progesterone rise", body: "After ovulation, progesterone rises to prepare the uterine lining. This causes many symptoms that mimic early pregnancy." },
        { heading: "Possible implantation", body: "If fertilisation occurred, the embryo typically implants 6-12 days after ovulation." },
      ],
      lessCauses: [{ heading: "Anxiety-driven awareness", body: "Heightened attention to your body can make normal sensations feel significant." }],
      whyItVaries: "Symptoms during the TWW are caused by progesterone whether or not you are pregnant.",
    },
    timing: { whenStarts: "The TWW begins the day after ovulation.", whenEases: "It ends around 14 days later when you can take a pregnancy test." },
    whatItFeelsLike: ["Breast tenderness that could mean anything", "Mild cramping that feels like a period or a sign", "Exhaustion from the emotional weight of waiting"],
    whatThisMeans: "Symptoms during the two-week wait are not reliable pregnancy indicators. The only way to know is a pregnancy test.",
    normal: ["Breast tenderness", "Mild cramping", "Mood changes", "Fatigue", "No symptoms at all"],
    seekSupport: ["Severe anxiety affecting daily life", "Significant emotional distress each cycle"],
    disclaimer: "This is general guidance. Speak with your GP or a counsellor if the TWW is significantly affecting your mental health.",
    whatYouCanDo: [
      { action: "Try to avoid daily testing before your period is due", reason: "Early testing increases anxiety and false negatives." },
      { action: "Stay busy with things you enjoy", reason: "Distraction genuinely helps." },
      { action: "Limit symptom-searching online", reason: "Symptoms are unreliable and searching increases anxiety." },
    ],
    whatHappensNext: "If your period arrives, a new cycle begins. If not, take a pregnancy test from the day of your expected period.",
    relatedStage: { intro: "Related:", links: [{ label: "TTC Hub", href: "/trying-to-conceive" }, { label: "Implantation Bleeding", href: "/articles/implantation-bleeding" }] },
    aiPrompts: ["Is cramping during the TWW normal?", "When can I take a pregnancy test?"],
    captureIntro: "Each two-week wait carries its own emotional weight.",
    journey: ["trying-to-conceive"],
    topics: ["emotional-wellbeing", "timelines"],
    productPromotion: "minimal",
    reviewedBy: "Jenny Joines",
    faq: [
      { question: "Can I tell if I'm pregnant during the two-week wait?", answer: "Not reliably. Symptoms caused by progesterone are identical whether or not conception occurred." },
      { question: "When is the earliest I can test?", answer: "Most tests are accurate from the day of your expected period. Some early-detection tests claim accuracy a few days earlier." },
    ],
  },

  // ─── IVF: EMOTIONAL IMPACT ───────────────────────────────────────────────
  {
    slug: "emotional-impact-of-ivf",
    title: "The emotional impact of IVF: what no one prepares you for",
    metaDescription: "The emotional side of IVF treatment — grief, hope, identity, relationships, and how to take care of yourself through it all.",
    quickAnswer: "IVF is one of the most emotionally demanding experiences many people go through. The combination of medical procedures, hormonal changes, financial pressure, and the intensity of hope and disappointment creates a unique emotional challenge.",
    howThisFeels: ["Feeling like your life is on hold", "Grief for the path you thought you'd take", "The isolation of a journey most people don't understand", "Guilt about how it's affecting your relationship"],
    whatHappening: {
      commonCauses: [
        { heading: "Hormonal impact", body: "Fertility medications directly affect mood, energy, and emotional regulation." },
        { heading: "Loss of control", body: "IVF involves handing your body over to a medical process, which can feel disempowering." },
        { heading: "The cycle of hope and disappointment", body: "Each cycle carries enormous emotional weight, and not every cycle is successful." },
      ],
      lessCauses: [{ heading: "Relationship strain", body: "The intensity of IVF can put significant pressure on relationships." }],
      whyItVaries: "Emotional responses depend on personal history, support systems, the number of cycles, and individual coping styles.",
    },
    timing: { whenStarts: "Emotional challenges often begin before treatment starts.", whenEases: "The intensity typically eases between cycles, though cumulative stress builds." },
    whatItFeelsLike: ["A rollercoaster you can't get off", "Grieving something you haven't lost", "Feeling grateful for the option but exhausted by the process"],
    whatThisMeans: "Your emotional response to IVF is valid. This is genuinely hard.",
    normal: ["Anxiety", "Grief", "Mood swings from medication", "Relationship tension", "Isolation"],
    seekSupport: ["Depression or hopelessness lasting more than two weeks", "Relationship breakdown", "Thoughts of self-harm"],
    disclaimer: "This is not a substitute for professional mental health support.",
    whatYouCanDo: [
      { action: "Talk to someone who understands", reason: "Fertility counsellors and support groups can help." },
      { action: "Set boundaries around social media", reason: "Pregnancy announcements can be painful during treatment." },
      { action: "Be honest with your partner", reason: "You don't have to protect each other from how you feel." },
    ],
    whatHappensNext: "Most fertility clinics offer counselling. Taking breaks between cycles is valid and sometimes recommended.",
    relatedStage: { intro: "Related:", links: [{ label: "IVF Hub", href: "/ivf" }, { label: "Support Hub", href: "/support" }] },
    aiPrompts: ["How do I cope with IVF emotionally?", "Is it normal to feel this way during treatment?"],
    captureIntro: "The IVF journey carries emotional weight that deserves acknowledgment.",
    journey: ["ivf", "support"],
    topics: ["emotional-wellbeing"],
    productPromotion: "minimal",
    reviewedBy: "Jenny Joines",
    faq: [
      { question: "Is it normal to feel depressed during IVF?", answer: "Yes. The combination of hormones, uncertainty, and emotional intensity can trigger depression. Seek support if you're struggling." },
    ],
  },

  // ─── POSTPARTUM: BODY AFTER BIRTH ────────────────────────────────────────
  {
    slug: "your-body-after-birth",
    title: "Your body after birth: what changes to expect and what is normal",
    metaDescription: "What happens to your body after giving birth. Physical changes, healing timelines, and what to expect in the weeks and months after delivery.",
    quickAnswer: "After birth, your body goes through significant physical changes as it heals and adjusts. Bleeding, soreness, hormonal shifts, breast changes, and body shape changes are all normal. Recovery takes longer than most people expect.",
    howThisFeels: ["Not recognising your own body", "Feeling like everyone focuses on the baby while you're still healing", "Uncertainty about what's normal"],
    whatHappening: {
      commonCauses: [
        { heading: "Uterine involution", body: "Your uterus shrinks back to its pre-pregnancy size over about 6 weeks, causing afterpains and continued bleeding." },
        { heading: "Hormonal shift", body: "The dramatic drop in oestrogen and progesterone after birth affects mood, skin, hair, and physical recovery." },
        { heading: "Pelvic floor recovery", body: "The pelvic floor muscles stretch significantly during pregnancy and birth and need time and exercise to recover." },
      ],
      lessCauses: [{ heading: "Diastasis recti", body: "Abdominal muscle separation is common and may need specific exercises to resolve." }],
      whyItVaries: "Recovery depends on the type of birth, complications, fitness, nutrition, rest, and support.",
    },
    timing: { whenStarts: "Physical changes begin immediately after birth.", whenPeaks: "The first 2 weeks involve the most intense healing.", whenEases: "Most physical symptoms improve significantly by 6-12 weeks." },
    whatItFeelsLike: ["Soreness and exhaustion", "Surprise at how long recovery takes", "Gradually feeling more like yourself"],
    whatThisMeans: "Your body did something extraordinary. Recovery is not instant, and that is normal.",
    normal: ["Bleeding for up to 6 weeks", "Night sweats", "Hair loss from around 3 months", "Body shape changes", "Breast engorgement"],
    seekSupport: ["Signs of infection", "Heavy bleeding returning", "Severe pain", "Emotional distress"],
    disclaimer: "This is general guidance. Speak with your midwife or GP with any concerns.",
    whatYouCanDo: [
      { action: "Start pelvic floor exercises as soon as comfortable", reason: "Even gentle exercises support recovery." },
      { action: "Rest when you can", reason: "Your body is healing." },
      { action: "Don't rush back to pre-pregnancy exercise", reason: "Your 6-week check is a minimum, not a green light for everything." },
    ],
    whatHappensNext: "Physical recovery continues for months. Be patient with the process.",
    relatedStage: { intro: "Related:", links: [{ label: "Postpartum Hub", href: "/postpartum" }, { label: "Recovery Timeline", href: "/articles/postpartum-recovery-timeline" }] },
    aiPrompts: ["Is my body normal after birth?", "When will bleeding stop after birth?"],
    captureIntro: "Your postpartum body deserves recognition, not comparison.",
    journey: ["postpartum"],
    topics: ["body-changes", "timelines"],
    productPromotion: "light",
    reviewedBy: "Jenny Joines",
    faq: [
      { question: "How long does postpartum bleeding last?", answer: "Lochia typically lasts 4-6 weeks, gradually reducing in flow and changing from red to pink to yellowish." },
      { question: "When will my body go back to normal?", answer: "Physical recovery takes months, not weeks. Many people notice significant improvement by 3-6 months, but some changes are permanent. 'Normal' may look different than before." },
    ],
  },

  // ─── FIRST YEAR: DEVELOPMENTAL MILESTONES ────────────────────────────────
  {
    slug: "baby-milestones-first-year",
    title: "Baby milestones in the first year: what to expect and when to relax",
    metaDescription: "A calm guide to baby milestones in the first year. What's typical, what varies, and when to speak with your health visitor.",
    quickAnswer: "Baby development follows a general pattern but varies enormously in timing. Most milestones have a wide 'normal' window. Comparing your baby to others is natural but rarely helpful.",
    howThisFeels: ["Comparing your baby to others constantly", "Pride mixed with worry", "Not knowing when to be concerned"],
    whatHappening: {
      commonCauses: [
        { heading: "Motor development", body: "Rolling, sitting, crawling, and walking develop in a general sequence but at very different rates." },
        { heading: "Language development", body: "Babbling, first words, and understanding develop gradually throughout the first year." },
        { heading: "Social and emotional development", body: "Smiling, attachment, separation anxiety, and social interaction evolve continuously." },
      ],
      lessCauses: [{ heading: "Individual variation", body: "Premature babies may reach milestones later. Temperament, environment, and opportunity all play a role." }],
      whyItVaries: "Every baby develops at their own pace. The ranges given for milestones are broad because normal is broad.",
    },
    timing: { whenStarts: "Development is continuous from birth.", whenEases: "Milestone anxiety often reduces after the first year as patterns become clearer." },
    whatItFeelsLike: ["Joy at each new development", "Worry when your baby seems behind peers", "The relief of a reassuring health visitor check"],
    whatThisMeans: "Milestones are guidelines, not deadlines. Your baby is developing in their own way.",
    normal: ["Wide variation in timing", "Not crawling (some babies skip it entirely)", "Late walking (up to 18 months is normal)", "Babbling without clear words at 12 months"],
    seekSupport: ["No social smiling by 3 months", "No babbling by 9 months", "Loss of previously acquired skills", "Your instinct tells you something isn't right"],
    disclaimer: "This is general guidance. Your health visitor is there to support you.",
    whatYouCanDo: [
      { action: "Play and interact with your baby", reason: "This is the most important thing you can do for development." },
      { action: "Attend health visitor checks", reason: "These provide structured assessment and reassurance." },
      { action: "Resist comparison", reason: "The range of normal is much wider than social media suggests." },
    ],
    whatHappensNext: "Development continues rapidly in the second year with walking, talking, and increasing independence.",
    relatedStage: { intro: "Related:", links: [{ label: "First Year Hub", href: "/first-year" }, { label: "Baby Sleep Guide", href: "/articles/baby-sleep-first-year" }] },
    aiPrompts: ["When should my baby start crawling?", "Is it normal that my baby isn't walking yet?"],
    captureIntro: "Each milestone, whenever it comes, is worth celebrating and remembering.",
    journey: ["first-year"],
    topics: ["development", "timelines"],
    productPromotion: "light",
    reviewedBy: "Jenny Joines",
    faq: [
      { question: "When should babies start walking?", answer: "Most babies walk between 9 and 18 months. Not walking by 12 months is completely normal." },
      { question: "My baby isn't crawling — should I worry?", answer: "Some babies skip crawling entirely and go straight to pulling up and cruising. This is a normal variation." },
    ],
  },

  // ─── PREPARING: WHAT TO BUY ──────────────────────────────────────────────
  {
    slug: "what-to-buy-for-a-new-baby",
    title: "What to buy for a new baby: the honest essentials list",
    metaDescription: "What do you actually need for a new baby? An honest guide to the essentials — and what you can skip.",
    quickAnswer: "You need far less than the baby industry suggests. The genuine essentials are a safe sleep space, car seat, nappies, basic clothing, and feeding supplies. Everything else can wait until you know what your baby actually needs.",
    howThisFeels: ["Overwhelmed by lists and advertising", "Pressure to have everything ready", "Not knowing what actually matters"],
    whatHappening: {
      commonCauses: [
        { heading: "The essentials", body: "Safe sleep space (cot or Moses basket), car seat, nappies, basic bodysuits and sleepsuits, feeding equipment, and a few blankets." },
        { heading: "The nice-to-haves", body: "A pram/pushchair, baby carrier, changing mat, and basic toiletries." },
      ],
      lessCauses: [{ heading: "What can wait", body: "High chairs, weaning supplies, toys, and most gadgets aren't needed until months later." }],
      whyItVaries: "What you need depends on your living situation, budget, feeding plans, and personal preferences.",
    },
    timing: { whenStarts: "Most people start preparing from the second trimester.", whenEases: "Having the basics ready by 36 weeks gives you a comfortable buffer." },
    whatItFeelsLike: ["Nesting energy mixed with decision fatigue", "Excitement about preparing", "Anxiety about getting it wrong"],
    whatThisMeans: "Your baby needs you, not a perfectly equipped nursery. Start with essentials and add as you go.",
    normal: ["Feeling overwhelmed by choices", "Buying second-hand", "Not having a nursery ready", "Changing your mind about what you want"],
    seekSupport: ["Financial stress about baby costs", "Anxiety about preparation that's affecting your wellbeing"],
    disclaimer: "This is general guidance. Your midwife can advise on specific safety requirements.",
    whatYouCanDo: [
      { action: "Start with the essentials only", reason: "You'll quickly learn what your specific baby needs." },
      { action: "Accept hand-me-downs", reason: "Babies grow incredibly fast. Second-hand is practical and sustainable." },
      { action: "Wait on the extras", reason: "You don't need everything before the baby arrives." },
    ],
    whatHappensNext: "Once your baby arrives, you'll quickly discover their preferences and needs.",
    relatedStage: { intro: "Related:", links: [{ label: "Preparing Hub", href: "/preparing-for-baby" }, { label: "First Year Hub", href: "/first-year" }] },
    aiPrompts: ["What do I actually need for a newborn?", "What can I skip buying?"],
    captureIntro: "The nesting phase is a beautiful mix of practical planning and emotional anticipation.",
    journey: ["preparing-for-baby"],
    topics: ["practical-preparation"],
    productPromotion: "minimal",
    reviewedBy: "Jenny Joines",
    faq: [
      { question: "What are the absolute essentials for a newborn?", answer: "A safe place to sleep, a car seat, nappies, basic clothing (bodysuits and sleepsuits), and feeding supplies." },
      { question: "Do I need a nursery before the baby arrives?", answer: "No. Most newborns sleep in the parents' room for the first 6 months. A full nursery can wait." },
    ],
  },

  // ─── SUPPORT: PERINATAL ANXIETY ──────────────────────────────────────────
  {
    slug: "perinatal-anxiety",
    title: "Perinatal anxiety: when worry becomes more than worry",
    metaDescription: "Understanding perinatal anxiety — what it is, how it differs from normal worry, and where to find support.",
    quickAnswer: "Perinatal anxiety affects around 1 in 5 pregnant or postnatal people. It goes beyond normal worry, causing persistent, excessive anxiety that interferes with daily life, sleep, and enjoyment. It is treatable and support is available.",
    howThisFeels: ["Constant worry that something bad will happen", "Inability to relax or enjoy pregnancy/parenthood", "Physical symptoms like racing heart and tight chest", "Feeling like you're going crazy"],
    whatHappening: {
      commonCauses: [
        { heading: "Hormonal changes", body: "Pregnancy and postnatal hormonal shifts directly affect the brain's anxiety pathways." },
        { heading: "Life transition", body: "The enormity of becoming a parent naturally triggers protective worry, which can become disproportionate." },
        { heading: "Previous mental health history", body: "A history of anxiety or depression increases risk, though perinatal anxiety can affect anyone." },
      ],
      lessCauses: [{ heading: "Birth trauma or pregnancy complications", body: "Difficult experiences can trigger or worsen anxiety." }],
      whyItVaries: "Anxiety severity depends on personal history, support systems, hormones, and circumstances.",
    },
    timing: { whenStarts: "Can begin at any point during pregnancy or the first year after birth.", whenEases: "With support, most people see significant improvement within weeks to months." },
    whatItFeelsLike: ["An inability to stop worst-case thinking", "Checking on the baby constantly", "Physical tension and exhaustion", "Feeling like you're failing"],
    whatThisMeans: "Perinatal anxiety is a medical condition, not a character flaw. It is one of the most common complications of pregnancy and the postnatal period.",
    normal: ["Some worry and anxiety during pregnancy/early parenthood", "Occasional intrusive thoughts", "Heightened vigilance about safety"],
    seekSupport: ["Anxiety that interferes with daily functioning", "Inability to sleep even when the baby is sleeping", "Panic attacks", "Intrusive thoughts that cause significant distress", "Avoiding situations due to fear"],
    disclaimer: "If you think you may have perinatal anxiety, please speak with your midwife, health visitor, or GP. Effective treatment is available.",
    whatYouCanDo: [
      { action: "Name it", reason: "Recognising anxiety as a condition, not a personal failing, is the first step." },
      { action: "Speak to a professional", reason: "Your midwife, health visitor, or GP can assess and refer you." },
      { action: "Consider therapy", reason: "CBT is particularly effective for perinatal anxiety." },
    ],
    whatHappensNext: "With appropriate support, perinatal anxiety is very treatable. Most people see significant improvement.",
    relatedStage: { intro: "Related:", links: [{ label: "Support Hub", href: "/support" }, { label: "Emotional Wellbeing Guide", href: "/articles/emotional-wellbeing-pregnancy" }] },
    aiPrompts: ["Is my anxiety normal?", "How do I know if I have perinatal anxiety?"],
    captureIntro: "Your mental health matters as much as your physical health.",
    journey: ["support", "pregnancy", "postpartum"],
    topics: ["emotional-wellbeing", "safety-and-support"],
    productPromotion: "minimal",
    reviewedBy: "Jenny Joines",
    faq: [
      { question: "How do I know if my worry is normal or perinatal anxiety?", answer: "Normal worry comes and goes and doesn't significantly affect your daily life. Perinatal anxiety is persistent, excessive, and interferes with functioning, sleep, or enjoyment." },
      { question: "Can perinatal anxiety affect my baby?", answer: "Getting support for your mental health is one of the best things you can do for yourself and your baby. Treatment is safe and effective." },
    ],
  },

  // ─── PREPARING: BIRTH PLAN ───────────────────────────────────────────────
  {
    slug: "writing-a-birth-plan",
    title: "Writing a birth plan: what to include and why flexibility matters",
    metaDescription: "How to write a birth plan that supports your preferences while staying flexible. What to consider, what to include, and how to communicate your wishes.",
    quickAnswer: "A birth plan is a way to communicate your preferences to your care team. It should cover pain relief, birth environment, and immediate postnatal wishes. The most important thing is flexibility — birth rarely goes exactly to plan, and that's okay.",
    howThisFeels: ["Wanting control over something unpredictable", "Not knowing what to include", "Fear of being judged for your choices"],
    whatHappening: {
      commonCauses: [
        { heading: "Pain relief preferences", body: "Options include breathing techniques, water, gas and air, pethidine, epidural, and others. Understanding your options helps you make informed choices." },
        { heading: "Birth environment", body: "Preferences about lighting, music, who's present, and where you'd like to give birth." },
        { heading: "After birth", body: "Skin-to-skin contact, delayed cord clamping, feeding preferences, and who cuts the cord." },
      ],
      lessCauses: [{ heading: "Contingency planning", body: "Including preferences for assisted delivery or caesarean helps you feel prepared for any outcome." }],
      whyItVaries: "Every birth is different. A birth plan is a communication tool, not a contract.",
    },
    timing: { whenStarts: "Most people write their birth plan in the third trimester.", whenEases: "Discuss it with your midwife at your 36-week appointment." },
    whatItFeelsLike: ["Empowering to make choices", "Anxiety about the unknown", "Relief in having thought things through"],
    whatThisMeans: "Having a plan helps you feel prepared. Being flexible helps you navigate whatever happens.",
    normal: ["Changing your mind during labour", "Plans not going as expected", "Feeling overwhelmed by options"],
    seekSupport: ["Birth anxiety that's affecting your daily life", "Previous traumatic birth experiences", "Feeling unable to make decisions"],
    disclaimer: "This is general guidance. Discuss your specific options with your midwife.",
    whatYouCanDo: [
      { action: "Keep it simple", reason: "One page of key preferences is more useful than a lengthy document." },
      { action: "Discuss it with your birth partner", reason: "They may need to advocate for you during labour." },
      { action: "Include 'plan B'", reason: "Having contingency preferences reduces stress if things change." },
    ],
    whatHappensNext: "Share your birth plan with your midwife and bring copies to the hospital.",
    relatedStage: { intro: "Related:", links: [{ label: "Preparing Hub", href: "/preparing-for-baby" }, { label: "Third Trimester Guide", href: "/articles/third-trimester-complete-guide" }] },
    aiPrompts: ["What should I include in my birth plan?", "How detailed should my birth plan be?"],
    captureIntro: "However your birth unfolds, your preferences and your voice matter.",
    journey: ["preparing-for-baby", "pregnancy"],
    topics: ["practical-preparation"],
    productPromotion: "minimal",
    reviewedBy: "Jenny Joines",
    faq: [
      { question: "Do I need a birth plan?", answer: "It's not required, but it helps communicate your preferences. Even a simple list of priorities is valuable." },
      { question: "What if my birth doesn't go to plan?", answer: "This is very common. A good birth plan includes flexibility. Your care team's priority is always your safety and your baby's." },
    ],
  },

  // ─── FOODS TO AVOID IN PREGNANCY ──────────────────────────────────────────
  {
    slug: "foods-to-avoid-in-pregnancy",
    title: "Foods to avoid in pregnancy: a calm, practical guide",
    metaDescription: "Which foods are best avoided in pregnancy, which need extra care, and what's still safe to eat. A grounded guide to eating well, without fear.",
    quickAnswer:
      "A small number of foods are best avoided in pregnancy because of a higher risk of food poisoning, listeria, or harmful substances — including unpasteurised dairy, certain soft and mould-ripened cheeses, raw or partially cooked eggs that aren't Lion-stamped, raw or undercooked meat and fish, liver and pâté, high-mercury fish, and alcohol. Most everyday foods are still completely fine. If you've already eaten something on the avoid list, the realistic risk is usually low — speak to your midwife or GP if you have symptoms or specific concerns.",
    howThisFeels: [
      "Realising mid-meal that you're not sure if something is safe",
      "Spending longer than you'd like reading labels in a supermarket",
      "Worrying about something you ate before you knew you were pregnant",
      "Feeling overwhelmed by lists that contradict each other online",
    ],
    whatHappening: {
      commonCauses: [
        { heading: "Higher infection risk", body: "Pregnancy slightly changes how the immune system works, so infections like listeria, toxoplasmosis, and salmonella can hit harder and, in some cases, affect the baby." },
        { heading: "Substances that cross the placenta", body: "A few foods (and alcohol) contain substances — like high levels of vitamin A, mercury, or alcohol itself — that can affect a baby's development." },
      ],
      lessCauses: [
        { heading: "General food hygiene", body: "Most pregnancy food advice is essentially good food hygiene applied a little more carefully — washing, cooking thoroughly, and being mindful of how things are stored." },
      ],
      whyItVaries: "Guidance shifts over time as evidence updates, and small differences exist between countries. UK guidance (NHS) is what most of these recommendations reflect.",
    },
    timing: {
      whenStarts: "These food guidelines apply throughout pregnancy.",
      whenEases: "Most can be relaxed once your baby is born, though a few (like alcohol) remain relevant if you're breastfeeding.",
    },
    whatItFeelsLike: ["A constant low-level mental checklist around food", "Eating out feeling more loaded than usual"],
    whatThisMeans:
      "The list of true 'avoid' foods is shorter than it can feel online. Most of pregnancy eating is just normal eating done with a bit more care.",
    normal: [
      "Avoiding a small list of higher-risk foods",
      "Choosing pasteurised dairy and well-cooked meat, fish, and eggs",
      "Limiting caffeine to around 200mg a day",
      "Eating most everyday foods exactly as you usually would",
    ],
    seekSupport: [
      "Symptoms of food poisoning — vomiting, diarrhoea, fever, or feeling very unwell after eating",
      "Reduced or unusual baby movements after a worrying meal in later pregnancy",
      "Any specific worry about something you've eaten",
    ],
    disclaimer: "This is general information, not medical advice. If you're worried about something you've eaten or feel unwell, contact your midwife, GP, or NHS 111.",
    whatYouCanDo: [
      { action: "Keep a short mental 'avoid' list rather than a long one", reason: "Most foods are fine; a focused list is easier to actually follow." },
      { action: "Cook eggs, meat, and fish thoroughly", reason: "Heat kills most of the bacteria that cause concern in pregnancy." },
      { action: "Choose pasteurised dairy", reason: "Pasteurisation removes the listeria risk that drives most cheese guidance." },
      { action: "Wash fruit, veg, and salads well", reason: "This reduces toxoplasmosis and listeria risk from soil and packaging." },
      { action: "Speak to your midwife if you're unsure", reason: "They've heard every food question before — there's no wrong one to ask." },
    ],
    whatHappensNext: "Most people quickly settle into a rhythm where the avoid list becomes second nature.",
    relatedStage: {
      intro: "Eating well sits alongside the rest of pregnancy care:",
      links: [
        { label: "Health and safety in pregnancy", href: "/pregnancy/health-and-safety", context: "Tests, scans, and the questions worth raising." },
        { label: "Tests and scans in pregnancy", href: "/articles/tests-and-scans-in-pregnancy", context: "What's offered through pregnancy and why." },
      ],
    },
    aiPrompts: [
      "Is this specific food okay in pregnancy?",
      "I ate something on the avoid list — should I worry?",
      "How much caffeine is okay in pregnancy?",
    ],
    captureIntro: "Food in pregnancy is one of those small, daily things that can quietly take up a lot of headspace. Worth noting how it really felt.",
    trimester: [1, 2, 3],
    relatedSlugs: ["tests-and-scans-in-pregnancy", "medicines-in-pregnancy", "vaccinations-in-pregnancy"],
    journey: ["pregnancy"],
    topics: ["safety-and-support", "diet"],
    reviewedBy: "Jenny Joines",
    lastUpdated: "April 2026",
    keyTakeaways: [
      "The true 'avoid' list in pregnancy is shorter than it can feel online — most everyday foods are still fine",
      "The biggest categories are unpasteurised dairy, certain soft and mould-ripened cheeses, raw or undercooked meat, fish, and eggs, liver and pâté, high-mercury fish, and alcohol",
      "Caffeine doesn't need to be cut out — UK guidance is up to about 200mg a day",
      "If you've already eaten something on the list, the real-world risk is usually low; talk to your midwife or GP if you have symptoms or worries",
    ],
    sources: [
      "NHS — Foods to avoid in pregnancy",
      "NHS — Have a healthy diet in pregnancy",
      "Food Standards Agency — Pregnancy advice",
      "BNF — Eating well in pregnancy",
    ],
    faq: [
      { question: "Can I eat soft cheese in pregnancy?", answer: "Pasteurised soft cheeses like mozzarella, halloumi, feta, paneer, ricotta, and cream cheese are fine. The main ones to avoid are mould-ripened soft cheeses (brie, camembert, chèvre) and soft blue cheeses (gorgonzola, roquefort) — unless cooked until steaming hot." },
      { question: "Can I have caffeine in pregnancy?", answer: "Yes, up to around 200mg a day. That's roughly two mugs of instant coffee, or one small mug of brewed coffee plus a couple of cups of tea. Remember chocolate and some soft drinks contain caffeine too." },
      { question: "Are runny eggs safe in pregnancy?", answer: "Eggs with the British Lion stamp can be eaten with runny or even raw yolks. Eggs without the Lion stamp, duck, goose, and quail eggs should be cooked until both white and yolk are solid." },
      { question: "I ate something on the avoid list — what should I do?", answer: "The realistic risk from a single exposure is usually low. Watch out for symptoms of food poisoning — fever, vomiting, diarrhoea, or feeling very unwell — and contact your midwife or GP if you have any of those, or if you're worried." },
      { question: "Can I eat sushi?", answer: "Sushi made with raw fish is okay if the fish has been frozen first to destroy parasites — most UK restaurants do this routinely. Sushi made with cooked fish, vegetables, or fully smoked fish is fine. Avoid raw shellfish." },
    ],

    // ── Deep template fields ──
    topic: "diet-and-exercise",
    standfirst:
      "The real 'avoid' list in pregnancy is shorter than it can feel online. A calm look at what genuinely matters, what doesn't, and what to do if you've already eaten something you're worried about.",
    editorialSections: [
      {
        id: "foods-to-avoid",
        heading: "Foods to avoid in pregnancy",
        lead: "A small, focused list of foods carry enough risk in pregnancy that current UK guidance is to skip them. Knowing what's actually on it makes everything else easier.",
        paragraphs: [
          "The clearest 'avoid' foods are: unpasteurised milk and dairy products; mould-ripened soft cheeses like brie, camembert, and chèvre, and soft blue cheeses like gorgonzola and roquefort, unless thoroughly cooked; raw or undercooked meat, including rare steak, raw cured meats like Parma ham and chorizo unless cooked, and game that may contain lead shot; liver, pâté (including vegetable pâté), and supplements containing cod liver oil or high-dose vitamin A; raw or undercooked eggs that aren't British Lion stamped; raw shellfish; high-mercury fish (shark, swordfish, marlin); and alcohol in any amount.",
          "Some fish should be limited rather than avoided. Tuna is fine in moderation — up to four medium cans or two fresh steaks a week. Oily fish like salmon, mackerel, sardines, and trout is recommended at no more than two portions a week.",
        ],
        callout: {
          tone: "info",
          text: "If a food is hot, thoroughly cooked, and steaming throughout, the listeria risk that drives most of the cheese and cured-meat advice largely disappears.",
        },
      },
      {
        id: "foods-that-need-extra-care",
        heading: "Foods that need extra care, not avoidance",
        lead: "These are foods you can still eat — but with a bit of attention to how they're prepared, stored, or sourced.",
        paragraphs: [
          "Salads, fruit, and vegetables should be washed well to reduce the small risk of toxoplasmosis from soil. Pre-packaged salads and pre-cut fruit are fine, but eat them by their use-by date.",
          "Cured meats like salami and Parma ham carry a small toxoplasmosis risk from the curing process; freezing them for at least four days before eating, or cooking them until steaming, removes most of the concern.",
          "Caffeine is fine in moderation. UK guidance is up to about 200mg a day — roughly two mugs of instant coffee. That includes tea, energy drinks, chocolate, and some cold remedies, so it's worth a rough mental tally rather than an exact count.",
        ],
      },
      {
        id: "why-some-foods-matter-more",
        heading: "Why some foods matter more in pregnancy",
        lead: "Most of the avoid list comes down to two things: a higher risk of certain infections, and a few substances that can cross the placenta.",
        paragraphs: [
          "Pregnancy slightly dampens parts of the immune system, which means infections like listeria, salmonella, and toxoplasmosis can be harder to fight off and can, rarely, affect the baby. That's why unpasteurised dairy, undercooked meat, and unwashed produce are treated more cautiously than they might be otherwise.",
          "A second group of foods are limited because of what's in them rather than what might grow on them. Liver and high-dose vitamin A supplements can deliver levels of vitamin A that are too high for early development. High-mercury fish can affect the developing nervous system. Alcohol crosses the placenta freely and there's no level that's been shown to be reliably safe, which is why current UK advice is to avoid it altogether.",
        ],
      },
      {
        id: "what-is-still-safe",
        heading: "What is still safe to eat",
        lead: "Most of normal eating is still completely fine. It can help to anchor the avoid list against everything that isn't on it.",
        paragraphs: [
          "Pasteurised milk, yoghurt, and cheeses (including hard cheeses like cheddar and parmesan, and soft pasteurised cheeses like mozzarella, halloumi, ricotta, paneer, and cream cheese) are fine. So are well-cooked meat and poultry, fully cooked fish, British Lion-stamped eggs (including with runny yolks), and most takeaways and restaurant food prepared properly.",
          "Spices, herbs, and most cuisines are fine in normal amounts. There's no need to avoid everyday foods on the basis that they 'might' be risky — the actual list is the list.",
        ],
      },
      {
        id: "if-youre-worried",
        heading: "What to do if you're worried about something you've eaten",
        lead: "Most one-off exposures don't cause harm. The realistic question is whether you're feeling unwell, not whether you ate something that wasn't ideal.",
        paragraphs: [
          "If you've eaten something on the avoid list and feel completely fine, the practical advice is usually to stop worrying and not repeat it. Most listeria, salmonella, and toxoplasmosis exposures don't lead to infection, and most infections don't affect the baby.",
          "What does warrant a call is symptoms: a fever, sustained vomiting or diarrhoea, severe abdominal pain, or feeling significantly unwell after eating. In later pregnancy, reduced or unusual baby movements after a worrying meal is also a reason to get checked, even if you feel okay.",
        ],
      },
      {
        id: "when-to-ask",
        heading: "When to ask a midwife or doctor",
        lead: "The answer to almost any specific food question is: ask. Midwives, GPs, and pharmacists hear food questions constantly and would rather you asked than worried.",
        paragraphs: [
          "Speak to your midwife or GP if you have ongoing food poisoning symptoms, if you've been advised to follow a specific diet for a condition like gestational diabetes, or if you're managing pregnancy alongside something else (vegan, vegetarian, coeliac, food allergies) and want to make sure you're getting what you need.",
          "Pharmacists are also a strong first stop for questions about supplements, herbal teas, and over-the-counter remedies that often blur into food.",
        ],
        callout: {
          tone: "reassurance",
          text: "There is no such thing as a silly food question in pregnancy. The list of people who've asked yours before you is long.",
        },
      },
    ],
  },

  // ─── TESTS AND SCANS IN PREGNANCY ─────────────────────────────────────────
  {
    slug: "tests-and-scans-in-pregnancy",
    title: "Tests and scans in pregnancy: a complete, calm guide",
    metaDescription: "What tests and scans happen in pregnancy, when they happen, and what they're for. A clear, reassuring overview of UK pregnancy care.",
    quickAnswer:
      "Through a typical UK pregnancy you're offered a booking appointment around 8–12 weeks, a dating scan around 11–14 weeks (often with combined screening), routine blood and urine tests, an anomaly scan around 18–21 weeks, and ongoing midwife checks of blood pressure, urine, and growth. Some people are offered additional tests — like glucose testing for gestational diabetes, or extra growth scans — based on individual circumstances.",
    howThisFeels: [
      "Trying to remember which appointment is which",
      "Quietly anxious in the days before a scan",
      "Feeling unsure whether to accept every screening offered",
      "Wanting more information without being overwhelmed",
    ],
    whatHappening: {
      commonCauses: [
        { heading: "Routine antenatal care", body: "Most tests and scans are part of standard NHS antenatal care, designed to monitor you and your baby and offer information at key points." },
        { heading: "Personalised additions", body: "Some tests are offered specifically based on your history, BMI, age, ethnicity, or how this pregnancy is unfolding." },
      ],
      lessCauses: [
        { heading: "Reactive checks", body: "Occasionally an extra scan or test is arranged in response to something specific — bleeding, reduced movements, raised blood pressure, or a measurement that needs another look." },
      ],
      whyItVaries: "Care plans differ slightly between trusts and between pregnancies. The broad shape is the same; the exact appointments may not be.",
    },
    timing: {
      whenStarts: "Booking appointment is usually between 8–12 weeks.",
      whenEases: "Appointments space out earlier in pregnancy and become more frequent again from around 28 weeks onwards.",
    },
    whatItFeelsLike: ["A mix of admin, waiting rooms, and intensely meaningful moments", "Long gaps between appointments, then several close together"],
    whatThisMeans:
      "Tests and scans aren't a verdict on your pregnancy; they're tools that give you and your care team useful information at the right moments.",
    normal: [
      "Booking appointment around 8–12 weeks",
      "Dating scan around 11–14 weeks",
      "Routine blood and urine tests early in pregnancy",
      "Anomaly scan around 18–21 weeks",
      "Regular midwife appointments through pregnancy",
    ],
    seekSupport: [
      "Bleeding, severe pain, or reduced baby movements between appointments",
      "Anything you weren't able to ask in the appointment itself",
      "Worry about a result you've been given",
    ],
    disclaimer: "This article describes typical UK NHS antenatal care. Your individual care plan may differ. For advice on your own pregnancy, speak to your midwife or maternity team.",
    whatYouCanDo: [
      { action: "Write your questions down before each appointment", reason: "It's easy to forget them in the room; a phone note works well." },
      { action: "Take someone with you when you can", reason: "A second pair of ears helps, especially at scans and screening appointments." },
      { action: "Ask for things to be repeated or written down", reason: "Midwives expect this — there's a lot of information in each visit." },
      { action: "Know that screening is offered, not required", reason: "You can decline any test or scan, and ask for time to think before deciding." },
    ],
    whatHappensNext: "After your booking appointment, your midwife will give you a personalised plan for the rest of pregnancy.",
    relatedStage: {
      intro: "Tests and scans sit alongside the rest of pregnancy care:",
      links: [
        { label: "Health and safety in pregnancy", href: "/pregnancy/health-and-safety", context: "The wider topic this article belongs to." },
        { label: "Vaccinations in pregnancy", href: "/articles/vaccinations-in-pregnancy", context: "Often discussed at the same appointments." },
      ],
    },
    aiPrompts: [
      "What does the 12-week scan actually check?",
      "Is the gestational diabetes test routine?",
      "Can I decline screening tests?",
    ],
    captureIntro: "Each scan and appointment carries its own quiet weight. Worth noting how they actually felt.",
    trimester: [1, 2, 3],
    relatedSlugs: ["vaccinations-in-pregnancy", "medicines-in-pregnancy", "foods-to-avoid-in-pregnancy"],
    journey: ["pregnancy"],
    topics: ["safety-and-support", "tests-and-scans"],
    reviewedBy: "Jenny Joines",
    lastUpdated: "April 2026",
    isCornerstone: true,
    keyTakeaways: [
      "UK pregnancy care typically includes a booking appointment, dating scan, anomaly scan, and regular midwife checks",
      "Combined screening for Down's, Edwards', and Patau's syndromes is offered around 11–14 weeks alongside the dating scan",
      "The anomaly scan around 18–21 weeks looks at your baby's physical development in detail",
      "Some people are offered extra tests — like glucose testing or growth scans — based on individual circumstances",
      "All screening is offered, not required — you can ask questions, take time, or decline",
    ],
    sources: [
      "NHS — Your antenatal appointments",
      "NHS — Screening tests in pregnancy",
      "NICE NG201 — Antenatal care",
      "RCOG — Information for pregnant women",
      "Public Health England — NHS Fetal Anomaly Screening Programme",
    ],
    faq: [
      { question: "How many scans will I have in pregnancy?", answer: "In an uncomplicated UK pregnancy, two scans are routinely offered: the dating scan (around 11–14 weeks) and the anomaly scan (around 18–21 weeks). Additional scans may be offered based on individual circumstances." },
      { question: "What happens at the booking appointment?", answer: "Your booking appointment is usually 1–2 hours long. The midwife takes a detailed history, gives you information about pregnancy care and screening choices, organises blood tests, and starts your maternity record." },
      { question: "Do I have to have all the screening tests?", answer: "No. All antenatal screening is offered, not required. You can accept some tests and decline others, and you can ask for time to think before deciding." },
      { question: "What is combined screening?", answer: "Combined screening uses a blood test and a measurement from the dating scan (nuchal translucency) to estimate your individual chance of the baby having Down's, Edwards', or Patau's syndromes. It's offered between 11–14 weeks." },
      { question: "When is the gestational diabetes test?", answer: "If you're offered the glucose tolerance test, it's usually between 24–28 weeks. Whether it's offered depends on factors like BMI, family history, ethnicity, and previous pregnancies." },
      { question: "Can I bring someone to my scans?", answer: "Yes, in almost all UK trusts. Specific rules can vary — check with your maternity unit ahead of the appointment." },
    ],

    topic: "health-and-safety",
    standfirst:
      "From the booking appointment to the 20-week scan and beyond — a calm, organised look at the tests and scans you're likely to be offered through a UK pregnancy.",
    editorialSections: [
      {
        id: "what-tests-and-scans-are-for",
        heading: "What tests and scans in pregnancy are for",
        lead: "Antenatal tests and scans are designed to do two things: keep an eye on you and your baby through pregnancy, and offer information at key moments so you can make decisions that feel right for you.",
        paragraphs: [
          "Some appointments are about routine care — blood pressure, urine checks, listening to the baby's heartbeat, measuring growth. Others are screening tests, which estimate the chance of certain conditions. None of them are a verdict on your pregnancy. They're tools.",
          "All screening tests are offered, not required. You can take time to read the information, ask questions, accept some and decline others, and change your mind later.",
        ],
        callout: {
          tone: "reassurance",
          text: "Most pregnancies move through routine care without anything unexpected. The appointments are scaffolding, not warning lights.",
        },
      },
      {
        id: "first-trimester",
        heading: "What happens in the first trimester",
        lead: "The first major appointment is your booking appointment, usually between 8 and 12 weeks. It sets up the rest of your antenatal care.",
        paragraphs: [
          "Your midwife will take a detailed history — your health, your family history, any previous pregnancies, your mental health, your home situation. They'll talk you through screening choices, organise blood tests (blood group, full blood count, infections like HIV, syphilis, hepatitis B, and immunity to rubella), check your blood pressure, and test a urine sample.",
          "You'll also be given information about the screening tests offered later, your maternity notes (paper or digital), and time to ask anything you want to ask.",
        ],
      },
      {
        id: "twelve-week-scan",
        heading: "The 12-week scan and combined screening",
        lead: "The dating scan happens between 11 weeks and 13 weeks 6 days. It confirms your due date, checks how many babies you're carrying, and — if you choose — forms part of combined screening.",
        paragraphs: [
          "The scan itself usually takes around 20–30 minutes. The sonographer measures the baby from crown to rump to date the pregnancy accurately, and checks that visible early development is on track.",
          "Combined screening uses a blood test alongside a specific measurement from the scan called nuchal translucency. Together, these give you an individual estimated chance of Down's syndrome (T21), Edwards' syndrome (T18), and Patau's syndrome (T13). The result isn't a diagnosis — it's a probability that helps you decide whether you want further testing.",
          "If combined screening isn't possible — for example if it's offered after 14 weeks — the quadruple test (a blood test alone) is offered between 14 and 20 weeks for Down's syndrome.",
        ],
      },
      {
        id: "twenty-week-scan",
        heading: "The 20-week scan",
        lead: "The anomaly scan is usually between 18 and 21 weeks. It's a detailed look at your baby's physical development.",
        paragraphs: [
          "The sonographer checks the baby's brain, face, spine, heart, abdomen, kidneys, and limbs, and looks at the position of the placenta and the amount of amniotic fluid. Most scans don't find anything unexpected. When they do, you'll be offered a referral for further checks and information.",
          "The scan is also when many people choose to find out the baby's sex, if it's clear and your trust offers this. It's not the main purpose of the scan, but it's often the part people remember most.",
        ],
      },
      {
        id: "blood-tests-and-routine-checks",
        heading: "Blood tests and other routine checks",
        lead: "Through pregnancy, your midwife will keep an eye on a small set of measurements at almost every appointment — your blood pressure, a urine sample, and from around 24 weeks, your bump.",
        paragraphs: [
          "Blood pressure and urine are checked because rising blood pressure or protein in urine can be early signs of pre-eclampsia. From around 24–28 weeks, your midwife will start measuring your bump (symphysis-fundal height) to track your baby's growth, and listening to the baby's heartbeat.",
          "Some blood tests are repeated later in pregnancy — usually around 28 weeks — to check for anaemia, blood antibodies (especially if you have a Rhesus negative blood group), and to repeat the full blood count.",
        ],
      },
      {
        id: "glucose-testing",
        heading: "Glucose testing and gestational diabetes screening",
        lead: "Gestational diabetes screening isn't offered to everyone. It's offered when there are risk factors that make it more likely.",
        paragraphs: [
          "The most common test is the oral glucose tolerance test (OGTT), usually between 24–28 weeks. You arrive having fasted, have a blood test, drink a sugary drink, and have a second blood test two hours later.",
          "You may be offered the OGTT if your BMI is 30 or above, you've had a large baby (4.5kg or more) before, you've had gestational diabetes before, you have a parent or sibling with diabetes, or you're from a family background with higher risk (South Asian, Black African, African-Caribbean, or Middle Eastern).",
        ],
      },
      {
        id: "personalised-additions",
        heading: "What your midwife or doctor may recommend based on your pregnancy",
        lead: "Some appointments and tests are added in based on what's specific to you, rather than offered to everyone.",
        paragraphs: [
          "Examples include extra growth scans if your bump is measuring smaller or larger than expected, additional appointments if your blood pressure rises, consultant-led care if you have a pre-existing condition like type 1 diabetes or a heart condition, and specialist mental health support if needed.",
          "If something is added in, your midwife should explain why, what the test or appointment involves, and what the possible outcomes are. It's reasonable to ask for that explanation again if it didn't quite land the first time.",
        ],
      },
      {
        id: "asking-questions",
        heading: "When to ask questions or raise worries",
        lead: "Between appointments, things still come up. The right time to call is whenever something feels worth checking — not only when you can prove it is.",
        paragraphs: [
          "Contact your midwife or maternity triage line for: bleeding, severe or persistent abdominal pain, headaches that don't go with paracetamol or come with visual changes, sudden swelling of hands or face, and from around 24 weeks, any change in your baby's pattern of movements.",
          "For non-urgent questions, your midwife is the first contact. For results you've been given, you can always ask for a follow-up conversation — including a longer appointment if a result is significant.",
        ],
        callout: {
          tone: "gentle-warning",
          text: "Reduced or changed baby movements in the third trimester is always a reason to call your maternity unit — at any time of day or night. They'd rather hear from you.",
        },
      },
    ],
  },

  // ─── VACCINATIONS IN PREGNANCY ────────────────────────────────────────────
  {
    slug: "vaccinations-in-pregnancy",
    title: "Vaccinations in pregnancy: what's offered and why",
    metaDescription: "Which vaccinations are recommended in pregnancy in the UK, when they're given, and why. A clear, calm look at whooping cough, flu, and COVID-19 vaccines.",
    quickAnswer:
      "In the UK, three vaccinations are routinely recommended in pregnancy: the whooping cough (pertussis) vaccine, usually from 16 weeks; the flu vaccine each autumn or winter at any stage of pregnancy; and the COVID-19 vaccine, where current guidance applies. They're offered because they protect you and your baby — passing on antibodies before birth, when babies are most vulnerable. Live vaccines (like MMR and yellow fever) are usually avoided in pregnancy.",
    howThisFeels: [
      "Wanting to do the right thing without being talked into it",
      "Reading conflicting things online and feeling less sure",
      "Hoping someone will just explain it calmly",
    ],
    whatHappening: {
      commonCauses: [
        { heading: "Antibody transfer to your baby", body: "Vaccines given in pregnancy prompt your body to make antibodies, which cross the placenta and protect your baby in their early weeks before they can be vaccinated themselves." },
        { heading: "Higher risk in pregnancy", body: "Some infections, like flu, can be more serious in pregnancy. Vaccinating reduces that risk for you as well." },
      ],
      lessCauses: [
        { heading: "Outbreak response", body: "Occasionally, additional vaccines are recommended in response to a specific outbreak or travel context — a midwife or GP can advise." },
      ],
      whyItVaries: "The recommended list updates over time. UK NHS guidance is the steady reference point.",
    },
    timing: {
      whenStarts: "Whooping cough is offered from around 16 weeks; flu and COVID-19 vaccines are offered at any stage in season.",
      whenEases: "Most pregnancy-specific vaccinations are given in the second or third trimester.",
    },
    whatItFeelsLike: ["A short appointment, often a sore arm for a day or two"],
    whatThisMeans:
      "Pregnancy vaccinations are offered because the evidence supporting them is strong. Choosing whether to have them is still yours.",
    normal: [
      "A sore arm for a day or two after the injection",
      "Mild fever or feeling a bit off for 24–48 hours",
      "No reaction at all",
    ],
    seekSupport: [
      "A high fever that doesn't settle",
      "Significant swelling or rash",
      "Any reaction that worries you",
    ],
    disclaimer: "This article describes general UK guidance. For advice on your individual situation, speak to your midwife or GP.",
    whatYouCanDo: [
      { action: "Bring questions to your midwife appointment", reason: "It's the most direct way to get advice tailored to you." },
      { action: "Use NHS sources for the latest guidance", reason: "Recommendations update from time to time." },
      { action: "Take paracetamol if you feel unwell after the jab", reason: "It's safe in pregnancy and helps with mild fever or aches." },
    ],
    whatHappensNext: "Once given, antibodies build up over the following weeks and pass to your baby across the placenta.",
    relatedStage: {
      intro: "Vaccinations are part of the wider Health and Safety topic:",
      links: [
        { label: "Health and safety in pregnancy", href: "/pregnancy/health-and-safety", context: "The full topic this sits within." },
        { label: "Tests and scans in pregnancy", href: "/articles/tests-and-scans-in-pregnancy", context: "Often discussed at the same appointments." },
      ],
    },
    aiPrompts: [
      "Why is the whooping cough jab offered in pregnancy?",
      "Is the flu vaccine safe for the baby?",
      "Can I have other vaccines while pregnant?",
    ],
    captureIntro: "Vaccination decisions in pregnancy can carry more weight than they first seem. Worth noting where you landed.",
    trimester: [2, 3],
    relatedSlugs: ["tests-and-scans-in-pregnancy", "medicines-in-pregnancy", "foods-to-avoid-in-pregnancy"],
    journey: ["pregnancy"],
    topics: ["safety-and-support", "vaccinations"],
    reviewedBy: "Jenny Joines",
    lastUpdated: "April 2026",
    keyTakeaways: [
      "Three vaccines are routinely recommended in UK pregnancy: whooping cough, flu, and COVID-19",
      "Whooping cough is usually offered from 16 weeks; flu and COVID at any stage of pregnancy in season",
      "Pregnancy vaccines work by passing antibodies to your baby before birth, when they're most vulnerable",
      "Live vaccines (like MMR, yellow fever) are usually avoided in pregnancy — but most vaccines aren't live",
      "All vaccines in pregnancy are a choice — your midwife or GP can talk you through the evidence",
    ],
    sources: [
      "NHS — Vaccinations in pregnancy",
      "UK Health Security Agency — Green Book chapters on pertussis, influenza, and COVID-19",
      "RCOG — Coronavirus and pregnancy",
      "NICE NG201 — Antenatal care",
    ],
    faq: [
      { question: "When should I have the whooping cough vaccine?", answer: "Usually from 16 weeks of pregnancy, ideally before 32 weeks. Having it earlier in this window gives more time for antibodies to pass to your baby." },
      { question: "Is the flu vaccine safe in pregnancy?", answer: "Yes. The flu vaccine offered in pregnancy is not a live vaccine and has been used safely in millions of pregnancies. Flu itself is more likely to be serious in pregnancy." },
      { question: "What about the COVID-19 vaccine?", answer: "Current UK guidance recommends the COVID-19 vaccine for pregnant women, including boosters in season. Your midwife or GP can advise on the latest position." },
      { question: "Are there vaccines I shouldn't have in pregnancy?", answer: "Live vaccines — including MMR, BCG, and yellow fever — are usually avoided in pregnancy. If you need one for travel or work, speak to your GP first." },
      { question: "Can I have my flu and whooping cough vaccines at the same time?", answer: "Yes. They're often offered together in one appointment from 16 weeks onwards in flu season." },
    ],

    topic: "health-and-safety",
    standfirst:
      "Three vaccinations are routinely offered in UK pregnancy. Here's a calm, plain-English look at why they're recommended, when they're given, and how to think about the choice.",
    editorialSections: [
      {
        id: "why-vaccines-in-pregnancy",
        heading: "Why vaccinations are offered in pregnancy",
        lead: "Pregnancy vaccinations do two things: they protect you against infections that can be more serious during pregnancy, and they pass antibodies to your baby that protect them in the early weeks of life.",
        paragraphs: [
          "Newborns can't be vaccinated against most things straight away, and some infections — like whooping cough — can be very serious in the first weeks of life. Vaccinating in pregnancy bridges that gap.",
          "The vaccines used in pregnancy aren't 'live' vaccines, which means they can't cause the infection they protect against. They prompt your body to make antibodies, which cross the placenta to your baby.",
        ],
      },
      {
        id: "whooping-cough",
        heading: "The whooping cough vaccine",
        lead: "Whooping cough (pertussis) can be life-threatening in young babies. The vaccine in pregnancy is the most effective protection there is for them in their first weeks.",
        paragraphs: [
          "It's usually offered from 16 weeks, ideally before 32 weeks, but can be given later if needed. The vaccine used in the UK also covers diphtheria, tetanus, and polio — but the whooping cough protection is the reason it's offered.",
          "Antibodies pass across the placenta in the weeks after the jab, giving your baby strong protection from birth until they receive their own first vaccinations at 8 weeks old.",
        ],
        callout: {
          tone: "info",
          text: "If you've had the whooping cough vaccine before — even in a previous pregnancy — it's still recommended each pregnancy, because antibody levels drop over time.",
        },
      },
      {
        id: "flu",
        heading: "The flu vaccine",
        lead: "Flu can be more serious in pregnancy. The flu vaccine is offered free on the NHS to pregnant women each autumn and winter, at any stage of pregnancy.",
        paragraphs: [
          "Pregnancy changes how your immune system, heart, and lungs work, which makes flu more likely to lead to complications like pneumonia. The vaccine reduces that risk for you and also passes some protection to your baby for their first few months.",
          "It's a non-live vaccine and has been given in pregnancy for many years. Side effects are usually mild — a sore arm, sometimes a low-grade fever for a day or two.",
        ],
      },
      {
        id: "covid",
        heading: "COVID-19 vaccination",
        lead: "Current UK guidance recommends COVID-19 vaccination for pregnant women, including seasonal boosters. The picture has been studied in millions of pregnancies worldwide.",
        paragraphs: [
          "COVID-19 in pregnancy carries a higher risk of complications, particularly later in pregnancy. Vaccination reduces that risk and passes antibodies to your baby.",
          "Specific recommendations on which vaccine and when are updated from time to time. Your midwife, GP, or the NHS website will have the current position for your stage of pregnancy.",
        ],
      },
      {
        id: "what-to-expect",
        heading: "What to expect from the appointment",
        lead: "Pregnancy vaccinations are usually given by your GP practice, midwife, or sometimes a community pharmacy.",
        paragraphs: [
          "The appointment itself is short. The vaccine is usually given in your upper arm. Most people feel fine afterwards or have a mildly sore arm for a day or two; some feel a bit run-down or feverish for 24–48 hours, which usually settles with rest and paracetamol.",
          "If you can, plan the appointment when you'll have a quieter day or two afterwards. It's not necessary, but a few people find they feel a bit flat the next day.",
        ],
      },
      {
        id: "common-concerns",
        heading: "Common concerns and questions",
        lead: "Most worries about pregnancy vaccinations come back to safety, timing, and what's actually in them. Asking is the right move.",
        paragraphs: [
          "If you have a specific concern — a previous reaction, a medical condition, a question about a particular ingredient, or about combining vaccines — your GP or midwife can talk it through with you. They've answered every question on this list before.",
          "Choosing whether to have a vaccine is yours. The clearest way to make a decision you feel settled on is usually to bring your questions to a real conversation rather than to scroll through opinions online.",
        ],
        callout: {
          tone: "reassurance",
          text: "Saying 'I'm not sure, can we talk about it?' is a completely valid response to any vaccination offer.",
        },
      },
      {
        id: "vaccines-to-avoid",
        heading: "Vaccines that are usually avoided in pregnancy",
        lead: "Most vaccines aren't live, but a few are — and live vaccines are usually avoided in pregnancy as a precaution.",
        paragraphs: [
          "These include MMR (measles, mumps, rubella), BCG (tuberculosis), yellow fever, and the live nasal flu spray (which is why pregnant women are offered the injected flu vaccine instead).",
          "If you'd usually need one of these for work or travel, speak to your GP. There may be safer alternatives, or a vaccine may be considered if the risk of the infection is significant.",
        ],
      },
    ],
  },

  // ─── MEDICINES IN PREGNANCY ───────────────────────────────────────────────
  {
    slug: "medicines-in-pregnancy",
    title: "Medicines in pregnancy: how to think about what's safe",
    metaDescription: "How to think about medicines in pregnancy — paracetamol, antibiotics, mental health medication, and more. A calm guide to asking the right questions.",
    quickAnswer:
      "Most everyday medicines either have a known safety profile in pregnancy or have a safer alternative. Paracetamol is generally first-line for pain. Many prescription medicines, including some antidepressants and asthma inhalers, can be continued — often with adjustments — because the risks of stopping can outweigh the risks of continuing. Don't stop any prescribed medicine without talking to your prescriber first. For over-the-counter medicines and herbal remedies, ask your pharmacist before taking anything new.",
    howThisFeels: [
      "Wanting a yes or no when the answer is more nuanced",
      "Worrying about a medicine you took before you knew you were pregnant",
      "Feeling unsure who to ask first",
      "Quietly going without something you actually need",
    ],
    whatHappening: {
      commonCauses: [
        { heading: "Different evidence base for different medicines", body: "Some medicines have decades of pregnancy data; some have less. The right answer is medicine-specific, not pregnancy-wide." },
        { heading: "Risks of not treating", body: "For some conditions (like asthma, epilepsy, or significant depression), the risks of leaving them untreated can be greater than the risks of carefully chosen medicine." },
      ],
      lessCauses: [
        { heading: "Personal sensitivities", body: "Tolerance and side effects can shift in pregnancy, so even familiar medicines may feel different." },
      ],
      whyItVaries: "The right answer depends on the specific medicine, the dose, the condition being treated, and where you are in pregnancy. That's why personalised advice matters.",
    },
    timing: {
      whenStarts: "Medicine questions can come up at any point in pregnancy.",
      whenEases: "Conversations often shift again after birth, especially if you're breastfeeding.",
    },
    whatItFeelsLike: ["A small admin task you keep putting off", "Relief when someone gives you a clear answer"],
    whatThisMeans:
      "There's almost always a way through. The aim is not to avoid medicine on principle, but to make informed choices with someone who can help you weigh them.",
    normal: [
      "Continuing a long-term prescribed medicine after a pregnancy review",
      "Switching to a different version of the same medicine for pregnancy",
      "Using paracetamol for ordinary pain",
      "Asking the pharmacist before buying anything over the counter",
    ],
    seekSupport: [
      "Considering stopping a prescribed medicine on your own",
      "Symptoms that aren't being controlled",
      "A new medical issue that needs treating",
    ],
    disclaimer: "This is general information, not medical advice for your specific situation. Always talk to your GP, midwife, prescriber, or pharmacist about your own medicines.",
    whatYouCanDo: [
      { action: "Don't stop a prescribed medicine without speaking to your prescriber", reason: "Sudden stops can be more harmful than the medicine itself, especially for conditions like asthma, epilepsy, and depression." },
      { action: "Ask your pharmacist before buying anything over the counter", reason: "They are a quick, free, expert first stop for medicines, supplements, and herbal remedies." },
      { action: "Tell anyone prescribing for you that you're pregnant", reason: "It changes which medicine and dose they'll consider." },
      { action: "Use bumps (UK Best Use of Medicines in Pregnancy) leaflets", reason: "These are written for the public and cover most common medicines." },
    ],
    whatHappensNext: "Most medicine conversations in pregnancy end with a clear plan — continue, switch, adjust, or use something else.",
    relatedStage: {
      intro: "Medicines sit alongside the rest of pregnancy care:",
      links: [
        { label: "Health and safety in pregnancy", href: "/pregnancy/health-and-safety", context: "The wider topic this article belongs to." },
        { label: "Vaccinations in pregnancy", href: "/articles/vaccinations-in-pregnancy", context: "Another part of pregnancy health decisions." },
      ],
    },
    aiPrompts: [
      "Is paracetamol safe in pregnancy?",
      "Can I continue my antidepressant while pregnant?",
      "I took ibuprofen before I knew I was pregnant — should I worry?",
    ],
    captureIntro: "Medicine decisions in pregnancy carry weight that doesn't always match how routine the medicine itself is.",
    trimester: [1, 2, 3],
    relatedSlugs: ["tests-and-scans-in-pregnancy", "vaccinations-in-pregnancy", "foods-to-avoid-in-pregnancy"],
    journey: ["pregnancy"],
    topics: ["safety-and-support", "medicines"],
    reviewedBy: "Jenny Joines",
    lastUpdated: "April 2026",
    keyTakeaways: [
      "Most everyday medicines either have a clear safety profile in pregnancy or have a safer alternative",
      "Paracetamol is generally first-line for pain in pregnancy; ibuprofen is usually avoided, especially in the third trimester",
      "Don't stop a prescribed medicine on your own — for many conditions, the risks of stopping outweigh the risks of continuing",
      "Pharmacists are a quick first stop for over-the-counter medicines and herbal remedies",
      "UK 'bumps' leaflets cover most common medicines in plain English",
    ],
    sources: [
      "NHS — Medicines in pregnancy",
      "UK Teratology Information Service (UKTIS) — bumps leaflets",
      "BNF — Prescribing in pregnancy",
      "NICE — Antenatal and postnatal mental health (CG192)",
    ],
    faq: [
      { question: "Is paracetamol safe in pregnancy?", answer: "Paracetamol is generally considered the first-choice painkiller in pregnancy. It should be taken at the lowest effective dose, for the shortest time needed. If you're using it often, speak to your midwife or GP." },
      { question: "Can I take ibuprofen in pregnancy?", answer: "Ibuprofen and other NSAIDs are usually avoided in pregnancy, especially after 20 weeks and particularly in the third trimester, when they can affect the baby. Speak to your pharmacist or GP for an alternative." },
      { question: "I took medicine before I knew I was pregnant — should I worry?", answer: "Most medicines taken in very early pregnancy don't cause harm. Tell your midwife or GP what you took and when, and they can check it against current guidance — usually for reassurance rather than action." },
      { question: "Can I keep taking my antidepressant?", answer: "Often yes, sometimes with a switch to a different one. Stopping antidepressants suddenly can be harmful in itself. Have this conversation with your GP, prescriber, or perinatal mental health team — don't stop on your own." },
      { question: "Are herbal remedies safe in pregnancy?", answer: "Not all of them. 'Natural' doesn't mean safe in pregnancy — some herbal remedies and supplements have effects that aren't well studied. Always check with a pharmacist before taking anything new, including teas marketed for pregnancy." },
      { question: "Can I take antibiotics in pregnancy?", answer: "Yes, when needed. Some antibiotics are preferred over others in pregnancy, and your prescriber will choose accordingly. Untreated infections can cause more harm than carefully chosen antibiotics." },
    ],

    topic: "health-and-safety",
    standfirst:
      "Most medicine questions in pregnancy aren't about a flat yes or no — they're about asking the right person and weighing the actual risks. A calm guide to thinking it through.",
    editorialSections: [
      {
        id: "what-safe-means",
        heading: "What people mean by \"safe\" medicines in pregnancy",
        lead: "\"Safe in pregnancy\" rarely means risk-free in an absolute sense. It usually means the medicine has been used widely, studied, and is considered reasonable when the benefit outweighs the small or theoretical risks.",
        paragraphs: [
          "Some medicines have decades of evidence behind them and very clear pregnancy guidance. Others are used less often in pregnancy, so the data is thinner — that doesn't always mean they're risky, just that the conversation needs to be more individual.",
          "The other side of safety is the risk of not treating. Untreated asthma, epilepsy, depression, infections, and many other conditions can cause more harm in pregnancy than the medicines that treat them. That's why most prescribers will help you find a way to keep treating, rather than stop.",
        ],
        callout: {
          tone: "info",
          text: "If a medicine is being changed in pregnancy, it's usually a switch to a more-studied option — not an instruction to go without.",
        },
      },
      {
        id: "why-medicines-need-checking",
        heading: "Why some medicines need checking",
        lead: "A few categories of medicine reliably need extra thought in pregnancy. Knowing which they are makes everything else easier.",
        paragraphs: [
          "These include: NSAIDs like ibuprofen, naproxen, and aspirin (usually avoided especially after 20 weeks); some acne medicines, particularly anything containing isotretinoin or high-dose vitamin A; certain epilepsy medicines (where the conversation is about choosing the right one rather than stopping); some blood pressure medicines (often switched to pregnancy-friendly versions); warfarin (usually changed to an alternative); and a few antibiotics like tetracyclines.",
          "Most other everyday medicines either have a clear safe option, an equivalent safer alternative, or a specific dose adjustment for pregnancy. The right person to ask depends on the medicine — pharmacist for over-the-counter, GP or specialist for prescribed.",
        ],
      },
      {
        id: "paracetamol-and-everyday",
        heading: "Paracetamol and everyday painkillers",
        lead: "Paracetamol is generally the first-choice painkiller in pregnancy. The standard advice is the lowest effective dose, for the shortest time you need.",
        paragraphs: [
          "If you're using paracetamol regularly — for migraines, back pain, pelvic girdle pain — it's worth a conversation with your midwife or GP, both to check the dose and to look at what else might help.",
          "Ibuprofen, naproxen, and other NSAIDs are usually avoided, particularly in the third trimester, where they can affect the baby's heart and kidney function and reduce amniotic fluid. Aspirin is usually avoided too, with one exception: low-dose aspirin is sometimes specifically prescribed in pregnancy for women at higher risk of pre-eclampsia.",
        ],
      },
      {
        id: "long-term-medication",
        heading: "Long-term and prescribed medicines",
        lead: "If you take medicine for a long-term condition, the right move is almost always to keep taking it until you've had a pregnancy review — not to stop on your own.",
        paragraphs: [
          "This applies to mental health medicines (antidepressants, anti-anxiety medicines, mood stabilisers), asthma inhalers, epilepsy medicines, blood pressure medicines, thyroid medicines, and most others. For many of these, sudden stopping causes more harm than the medicine itself.",
          "Ideally, the conversation about medicines in pregnancy starts before pregnancy, but it's just as valid after. If you've found out you're pregnant and are on long-term medicine, contact your prescriber — your GP, specialist, or perinatal mental health team — for a review rather than guessing.",
        ],
      },
      {
        id: "common-medicine-questions",
        heading: "Common medicine questions",
        lead: "A few questions come up over and over again. Here are the short, calm versions.",
        paragraphs: [
          "Antibiotics: yes when needed, with the prescriber choosing one suited to pregnancy. Hayfever: some antihistamines (like loratadine and cetirizine) are generally considered okay in pregnancy; nasal sprays may be preferred. Heartburn: many antacids and a few prescription options are safe; ask your pharmacist first. Cough and cold remedies: most combination products are not recommended; paracetamol plus warm fluids and rest is usually the answer. Sleep aids: most over-the-counter sleep medicines aren't recommended in pregnancy; a GP review is better.",
          "Herbal remedies and supplements: 'natural' isn't the same as safe in pregnancy. Some herbal teas, essential oils, and supplements aren't well studied or are known to be unsuitable. Always check with a pharmacist before adding anything new.",
        ],
      },
      {
        id: "if-you-already-took",
        heading: "If you've already taken something you're worried about",
        lead: "Most medicines taken before you knew you were pregnant don't cause harm. The right step is information, not panic.",
        paragraphs: [
          "Make a note of what you took, the dose, and when. Tell your midwife or GP at your next appointment, or sooner if it's something you're particularly worried about. They can check it against current guidance — most often the answer is reassurance.",
          "The UK Teratology Information Service (UKTIS) publishes plain-English 'bumps' leaflets covering most common medicines, written for the public. These are a good first read while you're waiting to speak to someone.",
        ],
      },
      {
        id: "who-to-ask",
        heading: "Who to ask, and when",
        lead: "Different questions belong with different people. Knowing the order saves time and worry.",
        paragraphs: [
          "Pharmacist — first stop for any over-the-counter medicine, supplement, herbal remedy, or 'is this brand okay' question. Free, walk-in, and quick.",
          "GP — for prescribed medicines, new symptoms that might need treating, and any medicine review. Tell the receptionist you're pregnant when you book.",
          "Midwife — for pregnancy-specific questions, particularly things that are coming up at antenatal appointments.",
          "Specialist team or perinatal mental health team — for long-term conditions or mental health medicines, especially if you already see them.",
        ],
        callout: {
          tone: "reassurance",
          text: "There is no medicine question too small to ask. Pharmacists, midwives, and GPs would much rather you asked.",
        },
      },
    ],
  },

  // ─── EATING WELL IN PREGNANCY ─────────────────────────────────────────────
  {
    slug: "eating-well-in-pregnancy",
    title: "Eating well in pregnancy: a calm, practical guide",
    metaDescription: "What eating well in pregnancy actually means — without rules, plans, or guilt. A grounded guide to meals, snacks, and key nutrients.",
    quickAnswer:
      "Eating well in pregnancy is mostly about eating in a way that's varied, fairly regular, and built around real food — protein, vegetables and fruit, wholegrains, dairy or alternatives, and healthy fats. There's no single perfect diet, and small lapses don't matter. What matters most is steady energy, a few key nutrients (folate, iron, vitamin D, calcium, iodine, and omega-3), and being kind to yourself on the days food feels harder.",
    howThisFeels: [
      "Wondering if you're 'doing it right' at every meal",
      "Feeling pulled between guidance, opinions, and what you actually want",
      "Eating noticeably less or more than usual and not sure if that's okay",
      "Quietly worrying you're not getting enough of something",
    ],
    whatHappening: {
      commonCauses: [
        { heading: "Higher needs for some nutrients", body: "Pregnancy increases what your body needs of certain things — iron, folate, calcium, iodine, and energy from around the second trimester onwards." },
        { heading: "Shifting appetite and tastes", body: "Hormones change appetite, smell, and taste. What used to be easy can suddenly feel impossible, and vice versa." },
      ],
      lessCauses: [
        { heading: "Cultural noise around 'pregnancy diets'", body: "Most online pregnancy food content is either over-restrictive or sales-led. Real-world eating sits somewhere far calmer." },
      ],
      whyItVaries: "Appetite, energy, nausea, and access to food vary hugely. The same advice doesn't fit every pregnancy or every week.",
    },
    timing: {
      whenStarts: "Eating-well guidance applies throughout pregnancy.",
      whenEases: "After birth, the focus often shifts — to recovery, energy, and (if breastfeeding) slightly different needs again.",
    },
    whatItFeelsLike: ["A constant low-level mental load around food", "Relief when something simple is enough"],
    whatThisMeans:
      "Eating well in pregnancy is less about perfection and more about a steady pattern, with kindness on the harder days. The shape of it matters more than any single meal.",
    normal: [
      "Eating roughly three meals and a couple of snacks on most days",
      "Including some protein, some vegetables or fruit, and some carbohydrate at most meals",
      "Taking a daily folic acid supplement (until 12 weeks) and a vitamin D supplement",
      "Some days where appetite is low or food feels difficult",
    ],
    seekSupport: [
      "Significant unintentional weight loss",
      "Persistent inability to keep food or fluids down",
      "Pre-existing eating concerns getting harder in pregnancy",
      "Worry that you're not getting enough of a specific nutrient",
    ],
    disclaimer: "This is general information. For personal nutrition advice — particularly with conditions like gestational diabetes, anaemia, or a restrictive diet — speak to your midwife, GP, or a registered dietitian.",
    whatYouCanDo: [
      { action: "Aim for a steady rhythm of meals and snacks", reason: "Steady eating supports steady energy, especially in the first and third trimesters." },
      { action: "Build plates around protein, veg, and a wholegrain or starch", reason: "This shape covers most nutritional bases without needing rules." },
      { action: "Take pregnancy-recommended supplements", reason: "Folic acid and vitamin D are the two most consistent UK recommendations." },
      { action: "Be flexible on the harder days", reason: "Plain food, small amounts, or whatever you can keep down all count." },
    ],
    whatHappensNext: "Most people settle into an eating pattern that adjusts gently as pregnancy moves through its trimesters.",
    relatedStage: {
      intro: "Eating well sits alongside the rest of pregnancy care:",
      links: [
        { label: "Diet and exercise in pregnancy", href: "/pregnancy/diet-and-exercise", context: "The wider topic this article belongs to." },
        { label: "Foods to avoid in pregnancy", href: "/articles/foods-to-avoid-in-pregnancy", context: "The shorter-than-it-feels avoid list." },
      ],
    },
    aiPrompts: [
      "What should I eat for breakfast in pregnancy?",
      "I'm not eating well this week — does it matter?",
      "How much extra do I need to eat in pregnancy?",
    ],
    captureIntro: "Food in pregnancy can quietly take up a lot of headspace. Worth noting how it really feels for you.",
    trimester: [1, 2, 3],
    relatedSlugs: ["key-nutrients-in-pregnancy", "foods-to-avoid-in-pregnancy", "when-you-cant-face-food-in-pregnancy"],
    journey: ["pregnancy"],
    topics: ["diet"],
    reviewedBy: "Jenny Joines",
    lastUpdated: "April 2026",
    isCornerstone: true,
    keyTakeaways: [
      "There's no single perfect pregnancy diet — variety and steadiness matter more than rules",
      "Build most plates around protein, vegetables or fruit, and a wholegrain or starch",
      "Folic acid (until 12 weeks) and vitamin D are the two consistent UK supplement recommendations",
      "Energy needs only rise slightly — and mostly in the second and third trimesters",
      "Bad days are normal; the overall pattern matters more than any single meal",
    ],
    sources: [
      "NHS — Have a healthy diet in pregnancy",
      "NHS — Vitamins, supplements and nutrition in pregnancy",
      "British Nutrition Foundation — Nutrition during pregnancy",
      "RCOG — Healthy eating and vitamin supplements in pregnancy",
    ],
    faq: [
      { question: "Do I need to 'eat for two' in pregnancy?", answer: "No. Energy needs only rise modestly, mostly in the second and third trimesters — roughly an extra 200 kcal a day in the third trimester. The aim is better quality rather than larger quantity." },
      { question: "What supplements should I take in pregnancy?", answer: "UK guidance is folic acid (400mcg daily) until 12 weeks, and vitamin D (10mcg daily) throughout pregnancy. A pregnancy-specific multivitamin can be useful but isn't essential — avoid anything containing vitamin A (retinol)." },
      { question: "I'm not eating much because of nausea — is my baby okay?", answer: "Yes, almost always. In early pregnancy your baby's needs are very small and your body draws on its reserves. Focus on fluids and small amounts of whatever you can manage." },
      { question: "Is a vegetarian or vegan diet okay in pregnancy?", answer: "Yes, with attention to a few nutrients — particularly iron, B12, omega-3, calcium, and iodine. A registered dietitian or your midwife can help if you want a personalised steer." },
    ],

    topic: "diet-and-exercise",
    standfirst:
      "Eating well in pregnancy isn't about rules or plans. A calm, practical look at what really matters — and what you can let go of.",
    editorialSections: [
      {
        id: "what-eating-well-means",
        heading: "What eating well in pregnancy really means",
        lead: "Eating well in pregnancy is mostly the same shape as eating well at any other time — varied, fairly regular, built around real food — with a small number of pregnancy-specific additions.",
        paragraphs: [
          "Most pregnancy nutrition advice can be summarised in a sentence: eat a varied diet across the food groups, take folic acid (until 12 weeks) and vitamin D, and avoid the short list of foods that genuinely matter. Everything beyond that is detail.",
          "There's no perfect pregnancy diet. The 'right' way to eat in pregnancy is the one you can actually keep up — given your energy, your appetite, your budget, and the realities of nausea, work, and the rest of life.",
        ],
        callout: {
          tone: "reassurance",
          text: "If your eating pattern looks broadly steady across a week, it's almost certainly enough. Single meals don't make or break a pregnancy.",
        },
      },
      {
        id: "what-matters-most",
        heading: "What matters most nutritionally",
        lead: "A few nutrients do extra work in pregnancy. Knowing what they are makes everything else feel less loaded.",
        paragraphs: [
          "Folate (and folic acid as a supplement) supports your baby's neural development, especially in the first 12 weeks. Iron supports the extra blood you're making. Calcium and vitamin D support bone development. Iodine matters for your baby's brain. Omega-3 (especially DHA) supports brain and eye development.",
          "Most of these come from ordinary food: leafy greens, beans, eggs, dairy, oily fish (within the safe limits), nuts and seeds, and a varied mix of fruit and veg. Folic acid and vitamin D are the two that UK guidance recommends as supplements.",
        ],
      },
      {
        id: "meals-and-snacks",
        heading: "How to think about meals and snacks",
        lead: "A simple plate shape covers most of what you need without any planning at all.",
        paragraphs: [
          "Aim for: some protein (eggs, fish, meat, beans, tofu, dairy), some vegetables or fruit, and some carbohydrate (preferably wholegrain — bread, rice, pasta, oats, potatoes). Add a fat source — olive oil, butter, avocado, nuts — and you have a balanced meal without thinking about it.",
          "Snacks can do real work in pregnancy, especially if you're nauseous, low on energy, or starting to feel reflux. A piece of fruit with cheese, a yoghurt, a handful of nuts, hummus and oatcakes, toast and peanut butter — anything that pairs a bit of protein or fat with a carbohydrate tends to land well.",
        ],
      },
      {
        id: "protein-fibre-energy",
        heading: "Protein, fibre, and steady energy",
        lead: "Three things tend to make pregnancy eating feel better: enough protein, enough fibre, and steady blood sugar.",
        paragraphs: [
          "Protein at each meal supports tissue growth and helps you feel full for longer. Fibre — from wholegrains, fruit, veg, and pulses — keeps digestion moving, which matters because pregnancy slows the gut and constipation is common.",
          "Steady eating, rather than long gaps, makes nausea, fatigue, and dizziness less likely. Some people find five or six smaller meals work better than three larger ones, particularly in the first and third trimesters.",
        ],
      },
      {
        id: "key-nutrients-in-detail",
        heading: "Calcium, iron, folate, and other key nutrients",
        lead: "If you want to know where things actually come from, this is the everyday-food version.",
        paragraphs: [
          "Folate: leafy greens, beans, lentils, fortified cereals, oranges. Plus 400mcg folic acid daily until 12 weeks.",
          "Iron: lean red meat, eggs, beans and lentils, fortified cereals, dark green veg. Vitamin C (a glass of orange juice, peppers, tomatoes) helps absorption from plant sources.",
          "Calcium: dairy or fortified plant alternatives, tinned fish with bones, leafy greens, tofu set with calcium.",
          "Vitamin D: oily fish, eggs, fortified spreads — plus 10mcg daily as a supplement throughout pregnancy.",
          "Iodine: dairy, eggs, white fish, seaweed in moderation. Some plant-based diets need a closer look here.",
          "Omega-3 (DHA): oily fish (salmon, mackerel, sardines, trout) up to twice a week, or a vegan algae-based supplement.",
        ],
        callout: {
          tone: "info",
          text: "A pregnancy-specific multivitamin can take the mental load off these — but always check it doesn't contain retinol (vitamin A), which should be avoided in pregnancy.",
        },
      },
      {
        id: "appetite-changes",
        heading: "What if your appetite changes",
        lead: "Appetite in pregnancy is rarely steady. Bigger, smaller, fussier, hungrier, all over the place — all normal.",
        paragraphs: [
          "In the first trimester, nausea, aversions, and exhaustion can shrink eating right down. In the second, appetite often returns and food feels easier. In the third, a smaller stomach (literally — the baby is taking up the room) often pushes people back to smaller, more frequent meals.",
          "If your appetite is genuinely difficult — for days, not just one bad evening — the goal is fluids and whatever you can keep down. Plain carbs, cold food, smoothies, and small frequent bites tend to work better than full meals.",
        ],
      },
      {
        id: "when-it-feels-hard",
        heading: "How to keep eating simple when pregnancy feels hard",
        lead: "Some weeks, eating well looks like \"any food at all\". That's still eating well in pregnancy.",
        paragraphs: [
          "On hard days, lower the bar. Toast and butter is a meal. A smoothie is a meal. A bowl of cereal is a meal. Pregnancy isn't the right time to be strict with yourself about food.",
          "Batch-cooking earlier, having a small list of go-to meals, keeping snacks in your bag and by the bed, and accepting help with food shopping or cooking are all completely reasonable strategies.",
        ],
      },
      {
        id: "extra-support",
        heading: "When to ask for extra support",
        lead: "There's a point at which food in pregnancy stops being a daily-life question and becomes a medical one. Knowing where that line is matters.",
        paragraphs: [
          "Speak to your midwife or GP if: you can't keep food or fluids down for more than a day, you're losing weight unintentionally, you have an existing eating disorder or disordered eating becoming harder in pregnancy, you've been told you have low iron or another deficiency, or you're managing pregnancy alongside coeliac, diabetes, or another condition that affects what you eat.",
          "A referral to a registered dietitian or perinatal mental health team is straightforward and often very useful — far better than trying to manage alone.",
        ],
        callout: {
          tone: "reassurance",
          text: "Asking for help with eating in pregnancy is not an overreaction. It's exactly the right move.",
        },
      },
    ],
  },

  // ─── MOVING YOUR BODY IN PREGNANCY ────────────────────────────────────────
  {
    slug: "moving-your-body-in-pregnancy",
    title: "Moving your body in pregnancy: a calm guide to exercise and movement",
    metaDescription: "What exercise and movement in pregnancy can look like — what's usually safe, what may need adapting, and what to avoid. Encouraging, realistic, and grounded.",
    quickAnswer:
      "Most people can keep moving safely throughout pregnancy. Walking, swimming, low-impact strength work, prenatal yoga and Pilates, and gentle versions of activities you already do are usually fine. As pregnancy progresses, some movements need adapting — particularly anything lying flat on your back from the second trimester, contact sports, high-fall-risk activities, and very high-intensity work without medical guidance. If you're unsure, your midwife or GP can advise.",
    howThisFeels: [
      "Wanting to keep moving but not sure what's still okay",
      "Feeling pulled between 'keep going as normal' and 'be careful'",
      "Body feeling unfamiliar mid-workout",
      "Quiet guilt about doing less than usual",
    ],
    whatHappening: {
      commonCauses: [
        { heading: "Real benefits of movement in pregnancy", body: "Regular movement supports energy, mood, sleep, blood pressure, and often labour and recovery too." },
        { heading: "Real reasons to adapt", body: "Joints loosen, balance shifts, breath gets shorter, and the bump physically changes what's comfortable." },
      ],
      lessCauses: [
        { heading: "Outdated 'rest more' messaging", body: "Older advice often discouraged movement; current UK guidance is the opposite for most pregnancies." },
      ],
      whyItVaries: "Starting fitness, pregnancy specifics, and how each trimester actually feels all shape what movement looks like for you.",
    },
    timing: {
      whenStarts: "Most people can keep moving from the start of pregnancy.",
      whenEases: "Movement often eases naturally in the third trimester, then shifts again into postnatal recovery.",
    },
    whatItFeelsLike: ["A run that suddenly feels twice as hard", "A yoga class that lands more emotionally than usual"],
    whatThisMeans:
      "Movement in pregnancy is supportive, not performative. The aim is to keep your body feeling well-used and looked after — not to hit the same numbers as before.",
    normal: [
      "Doing less than your pre-pregnancy routine",
      "Switching from running to walking or swimming as pregnancy goes on",
      "Needing more rest between sets, sessions, or days",
      "Some new aches, especially in the pelvis, lower back, or hips",
    ],
    seekSupport: [
      "Bleeding, cramping, or fluid loss during or after movement",
      "Chest pain, severe breathlessness, or dizziness",
      "Calf swelling or pain that's new",
      "Reduced baby movements after activity in later pregnancy",
    ],
    disclaimer: "This is general guidance. If you have a medical condition, a high-risk pregnancy, or specific concerns, speak to your midwife or GP before starting or continuing any exercise programme.",
    whatYouCanDo: [
      { action: "Keep moving in some form most days", reason: "Even short walks support energy, mood, and circulation in pregnancy." },
      { action: "Match intensity to how you actually feel", reason: "The 'talk test' — being able to hold a conversation — is a simple, reliable guide." },
      { action: "Adapt as the bump grows", reason: "What worked at 12 weeks often needs adjusting by 28." },
      { action: "Include some pelvic floor work", reason: "It supports bladder control now and recovery later." },
    ],
    whatHappensNext: "Movement in pregnancy usually shifts gradually — less intense, more supportive — as the weeks go on.",
    relatedStage: {
      intro: "Movement sits alongside the rest of daily care:",
      links: [
        { label: "Diet and exercise in pregnancy", href: "/pregnancy/diet-and-exercise", context: "The wider topic this article belongs to." },
        { label: "Eating well in pregnancy", href: "/articles/eating-well-in-pregnancy", context: "Movement and food work together." },
      ],
    },
    aiPrompts: [
      "Can I keep running while pregnant?",
      "What exercises should I avoid in pregnancy?",
      "Is it too late to start exercising in pregnancy?",
    ],
    captureIntro: "How your body feels with movement is its own kind of week-by-week story. Worth noting.",
    trimester: [1, 2, 3],
    relatedSlugs: ["eating-well-in-pregnancy", "key-nutrients-in-pregnancy", "when-you-cant-face-food-in-pregnancy"],
    journey: ["pregnancy"],
    topics: ["exercise"],
    reviewedBy: "Jenny Joines",
    lastUpdated: "April 2026",
    keyTakeaways: [
      "Most people can safely keep moving throughout pregnancy — current UK guidance encourages it",
      "Walking, swimming, prenatal yoga and Pilates, and adapted strength work are usually fine throughout",
      "From the second trimester, avoid lying flat on your back for long periods; from any point, avoid contact sports and high-fall-risk activities",
      "Match intensity to how you feel, not to old numbers — the 'talk test' is a reliable guide",
      "Stop and seek advice for bleeding, severe breathlessness, chest pain, or reduced baby movements after activity",
    ],
    sources: [
      "NHS — Exercise in pregnancy",
      "RCOG — Physical activity and pregnancy",
      "UK Chief Medical Officers' physical activity guidelines (pregnancy)",
      "ACOG — Physical activity and exercise during pregnancy",
    ],
    faq: [
      { question: "Can I keep running in pregnancy?", answer: "If you were running before pregnancy and feel well, you can usually continue, easing intensity as you go. Many people switch to walking or swimming in the second or third trimester as the bump and pelvic pressure increase." },
      { question: "Is it too late to start exercising in pregnancy?", answer: "No. Starting gentle movement at any point in pregnancy is beneficial. Walking, swimming, and prenatal yoga or Pilates are good places to start." },
      { question: "What exercises should I avoid?", answer: "Contact sports, scuba diving, anything with a real fall risk (skiing, horse riding, climbing), exercises lying flat on your back for long periods after about 16 weeks, and very deep abdominal work after the first trimester." },
      { question: "Is it safe to lift weights in pregnancy?", answer: "Yes, with adjustments. Lower weights, more reps, and avoiding very heavy single lifts or breath-holding (the Valsalva manoeuvre) is the usual guidance. A pregnancy-aware coach can help." },
      { question: "How will I know if I'm overdoing it?", answer: "Use the talk test — if you can't hold a conversation, ease off. Stop for any bleeding, dizziness, chest pain, severe breathlessness, calf pain or swelling, or reduced baby movements after exercise." },
    ],

    topic: "diet-and-exercise",
    standfirst:
      "Movement in pregnancy isn't about staying the same. A calm, encouraging look at what's still safe, what to adapt, and what to leave for now.",
    editorialSections: [
      {
        id: "what-it-can-look-like",
        heading: "What moving your body in pregnancy can look like",
        lead: "Movement in pregnancy doesn't have to mean structured exercise. Walking, swimming, gentle yoga, dancing in the kitchen, gardening — all of it counts.",
        paragraphs: [
          "Current UK guidance encourages around 150 minutes of moderate movement a week in pregnancy, plus some strength work twice a week. That can look like 20–30 minutes of walking most days, or two or three swims a week, or a couple of prenatal classes plus everyday activity.",
          "The aim isn't a workout schedule. It's a body that gets used, in some form, on most days.",
        ],
        callout: {
          tone: "reassurance",
          text: "Doing some movement, even briefly, almost always feels better than doing none.",
        },
      },
      {
        id: "why-movement-helps",
        heading: "Why movement can still help in pregnancy",
        lead: "Movement supports almost everything pregnancy puts pressure on — energy, mood, sleep, circulation, blood pressure, and digestion.",
        paragraphs: [
          "Active pregnancies are associated with lower rates of gestational diabetes and high blood pressure, better sleep, and often shorter labours and quicker recovery. The mood lift is real too — even short walks can help with low mood and pregnancy anxiety.",
          "None of this means you have to push hard. Gentle, regular movement does most of the work.",
        ],
      },
      {
        id: "what-is-usually-safe",
        heading: "What kinds of movement are usually safe",
        lead: "Most low-to-moderate-impact movement is safe in pregnancy, especially if you were doing it before.",
        paragraphs: [
          "Walking, swimming, stationary cycling, low-impact aerobics, prenatal yoga and Pilates, and adapted strength work are all generally fine throughout pregnancy. Running, weight training, and many sports are usually safe to continue if you were already doing them — with adjustments as pregnancy progresses.",
          "Pelvic floor exercises are worth doing throughout — they support bladder control now and recovery later.",
        ],
      },
      {
        id: "what-may-need-adapting",
        heading: "What may need adapting as pregnancy changes",
        lead: "As the bump grows and joints loosen, some things start to need adjustment rather than removal.",
        paragraphs: [
          "From around the second trimester, lying flat on your back for long periods (more than a few minutes) can reduce blood flow — so abdominal exercises, some yoga poses, and bench-based gym work usually need adapting or replacing.",
          "Balance work gets harder as the bump shifts your centre of gravity, so single-leg work and high-balance activities benefit from a wall or support. High-intensity intervals usually need to ease off as breath becomes more limited.",
          "Pelvic girdle pain (PGP) is common and may rule out some movements — wide-leg squats, deep lunges, breaststroke kick — for a while. A women's health physiotherapist is the right person to ask.",
        ],
      },
      {
        id: "exercises-to-avoid",
        heading: "Exercises to avoid in pregnancy",
        lead: "A small set of activities are best left for after pregnancy, mainly because of fall risk, contact, or significant physiological strain.",
        paragraphs: [
          "Contact sports (rugby, football, martial arts) — risk of impact to the bump.",
          "Activities with a real fall risk — skiing, horse riding, climbing, mountain biking on technical terrain.",
          "Scuba diving — pressure changes can affect the baby.",
          "Hot yoga, hot Pilates, or exercising in very hot conditions — overheating is a real concern in pregnancy.",
          "Very deep abdominal work (sit-ups, full crunches, intense core compressions) after the first trimester.",
          "Lying flat on your back for prolonged exercises after about 16 weeks.",
          "Holding your breath during heavy lifting (the Valsalva manoeuvre).",
        ],
        callout: {
          tone: "info",
          text: "Most of these are about specific scenarios rather than a blanket 'no'. A pregnancy-aware instructor or physio can help you adapt nearly any activity.",
        },
      },
      {
        id: "when-to-check",
        heading: "When movement may need checking",
        lead: "Some pregnancy situations make a quick conversation with your midwife or GP worthwhile before starting or continuing exercise.",
        paragraphs: [
          "These include: a low-lying placenta or placenta praevia, a history of preterm labour, significant bleeding in this pregnancy, severe anaemia, uncontrolled high blood pressure, or a multiple pregnancy. None of these mean no movement at all — they mean a personalised plan.",
          "Stop exercising and seek advice for: any bleeding, chest pain, severe breathlessness, dizziness, calf pain or swelling, fluid loss, or reduced baby movements after activity in later pregnancy.",
        ],
      },
      {
        id: "gentle-and-realistic",
        heading: "How to keep it gentle and realistic",
        lead: "The most useful pregnancy movement plan is the one that actually fits your real week.",
        paragraphs: [
          "Match intensity to how you feel today, not to last month's plan. Walks count. Stretching counts. A short swim counts. A yoga class you do half of counts.",
          "Build in rest. Pregnancy is genuinely tiring, particularly in the first and third trimesters, and pushing through tiredness rarely pays off.",
        ],
        callout: {
          tone: "reassurance",
          text: "Doing less than you used to is not the same as letting yourself go. It's pregnancy meeting your body where it actually is.",
        },
      },
    ],
  },

  // ─── KEY NUTRIENTS IN PREGNANCY ───────────────────────────────────────────
  {
    slug: "key-nutrients-in-pregnancy",
    title: "Key nutrients in pregnancy: what really matters and where to get it",
    metaDescription: "Folate, iron, vitamin D, calcium, iodine and omega-3 in pregnancy — what each one does, where it comes from, and when supplements help.",
    quickAnswer:
      "The nutrients that matter most in pregnancy are folate (and folic acid), iron, vitamin D, calcium, iodine, and omega-3 (especially DHA). UK guidance is to take 400mcg folic acid daily until 12 weeks and 10mcg vitamin D daily throughout pregnancy. The rest can usually come from a varied diet. Pregnancy-specific multivitamins can simplify things — but always avoid those containing vitamin A (retinol).",
    howThisFeels: [
      "Standing in the supplements aisle feeling overwhelmed",
      "Worrying you're not getting enough of something specific",
      "Feeling tired or run-down and wondering if it's nutritional",
      "Wanting a clear answer in a sea of contradictory advice",
    ],
    whatHappening: {
      commonCauses: [
        { heading: "Higher needs in pregnancy", body: "Some nutrients are needed in larger amounts to support your body and your baby's development." },
        { heading: "Limited storage", body: "A few key nutrients (like folate) aren't stored long-term, so a steady daily supply matters." },
      ],
      lessCauses: [
        { heading: "Marketing noise", body: "Pregnancy supplements are a big industry — much of the messaging exaggerates what's needed." },
      ],
      whyItVaries: "Nutritional needs depend on diet, health, geography, and individual circumstances. Vegan, vegetarian, and restricted diets need a closer look at a few specific nutrients.",
    },
    timing: {
      whenStarts: "Folic acid is most important in the first 12 weeks. Vitamin D matters throughout pregnancy.",
      whenEases: "After birth, needs shift again — particularly if you're breastfeeding.",
    },
    whatItFeelsLike: ["The mental load of remembering supplements", "Quiet relief when something is genuinely simple"],
    whatThisMeans:
      "Most pregnancy nutrition is covered by a varied diet plus two specific supplements. The list of essentials is shorter than the supplement aisle suggests.",
    normal: [
      "Taking folic acid (until 12 weeks) and vitamin D throughout",
      "Eating a varied diet with iron, calcium, and omega-3 sources",
      "Asking the midwife about specific nutrients at appointments",
    ],
    seekSupport: [
      "Symptoms of anaemia — significant fatigue, breathlessness, pale skin",
      "Vegan or restrictive diets where B12 or iodine intake may be low",
      "Concerns about your specific supplement choices",
    ],
    disclaimer: "This is general nutritional guidance. For individual advice, speak to your midwife, GP, or a registered dietitian.",
    whatYouCanDo: [
      { action: "Take folic acid daily until 12 weeks", reason: "It significantly reduces the risk of neural tube defects in early development." },
      { action: "Take vitamin D throughout pregnancy", reason: "Most UK adults are mildly deficient; 10mcg daily covers it." },
      { action: "Build meals around iron and calcium sources", reason: "These two nutrients tend to need the most food-based attention." },
      { action: "Check your multivitamin doesn't contain retinol", reason: "Vitamin A as retinol should be avoided in pregnancy; beta-carotene is fine." },
    ],
    whatHappensNext: "Most people settle into a steady routine of two or three supplements alongside everyday food.",
    relatedStage: {
      intro: "Nutrients sit alongside the wider eating-well picture:",
      links: [
        { label: "Eating well in pregnancy", href: "/articles/eating-well-in-pregnancy", context: "The fuller everyday-eating context." },
        { label: "Diet and exercise in pregnancy", href: "/pregnancy/diet-and-exercise", context: "The wider topic." },
      ],
    },
    aiPrompts: [
      "Which pregnancy multivitamin should I take?",
      "Am I getting enough iron in pregnancy?",
      "Do I need omega-3 supplements in pregnancy?",
    ],
    captureIntro: "Nutrition in pregnancy is rarely loud — but it's a quiet kind of self-care worth noticing.",
    trimester: [1, 2, 3],
    relatedSlugs: ["eating-well-in-pregnancy", "foods-to-avoid-in-pregnancy", "when-you-cant-face-food-in-pregnancy"],
    journey: ["pregnancy"],
    topics: ["diet", "nutrients"],
    reviewedBy: "Jenny Joines",
    lastUpdated: "April 2026",
    keyTakeaways: [
      "The two consistently recommended UK supplements are folic acid (400mcg daily until 12 weeks) and vitamin D (10mcg daily throughout)",
      "Iron, calcium, iodine, and omega-3 mostly come from a varied diet — but vegan and restricted diets may need supplements",
      "Avoid any supplement containing vitamin A as retinol — beta-carotene is fine",
      "A pregnancy-specific multivitamin is convenient but not essential",
      "If you're worried about a specific nutrient, your midwife or GP can check and advise",
    ],
    sources: [
      "NHS — Vitamins, supplements and nutrition in pregnancy",
      "NICE — Maternal and child nutrition (PH11)",
      "British Nutrition Foundation — Nutrition during pregnancy",
      "RCOG — Healthy eating and vitamin supplements in pregnancy",
    ],
    faq: [
      { question: "Do I need a pregnancy multivitamin?", answer: "Not necessarily. UK guidance specifically recommends folic acid (until 12 weeks) and vitamin D throughout. A pregnancy multivitamin can be a convenient way to cover these plus a few extras, but it's not essential if your diet is varied." },
      { question: "How much iron do I need in pregnancy?", answer: "Iron needs roughly double in pregnancy. Most people meet this through diet (lean red meat, eggs, beans, lentils, fortified cereals, leafy greens). If a blood test shows low iron, your midwife or GP may recommend an iron supplement." },
      { question: "Do I need to take omega-3 in pregnancy?", answer: "Omega-3 (DHA) supports brain and eye development. Two portions of oily fish a week (within the safe limits) usually covers it. If you don't eat fish, an algae-based DHA supplement is a good option." },
      { question: "Why should I avoid vitamin A in pregnancy?", answer: "High doses of vitamin A as retinol can affect a baby's development. That's why you should avoid liver, pâté, cod liver oil, and any supplement containing retinol. Beta-carotene (the form in fruit and veg) is completely fine." },
      { question: "Should I take vitamin D if I get sun?", answer: "Yes — UK guidance is 10mcg vitamin D daily throughout pregnancy regardless of season, as most adults don't get enough from sunlight alone, especially between October and March." },
    ],

    topic: "diet-and-exercise",
    standfirst:
      "A short list of nutrients does most of the work in pregnancy. A calm, plain look at what they are, where they come from, and when supplements actually help.",
    editorialSections: [
      {
        id: "which-nutrients-matter",
        heading: "Which nutrients matter most in pregnancy",
        lead: "Pregnancy doesn't dramatically change everything you need — it raises the bar on a small group of specific nutrients.",
        paragraphs: [
          "The main ones are folate (and folic acid), iron, vitamin D, calcium, iodine, and omega-3 fatty acids — particularly DHA. Each does a specific job: supporting your baby's development, your extra blood volume, your bones and theirs, and your energy.",
          "Most other vitamins and minerals are needed at roughly the same levels as before pregnancy, and a varied diet covers them.",
        ],
      },
      {
        id: "folate-folic-acid",
        heading: "Folate and folic acid",
        lead: "Folate supports the formation of your baby's neural tube — the structure that becomes the brain and spinal cord — in the very early weeks of pregnancy.",
        paragraphs: [
          "UK guidance is to take 400mcg of folic acid daily from before conception (where possible) until 12 weeks. Some people are advised to take a higher dose (5mg) — including those with diabetes, on certain medicines, or with a previous neural tube defect.",
          "Food sources include leafy greens, beans and lentils, fortified breakfast cereals, oranges, and asparagus. Folate from food alone is rarely enough in early pregnancy, which is why the supplement is recommended.",
        ],
        callout: {
          tone: "info",
          text: "If you're trying to conceive or could become pregnant, current UK advice is to take folic acid daily even before a positive test.",
        },
      },
      {
        id: "iron",
        heading: "Iron",
        lead: "Iron supports the extra blood your body makes in pregnancy and helps prevent anaemia, which is common.",
        paragraphs: [
          "Iron needs roughly double in pregnancy. Most people get enough from a varied diet — lean red meat, eggs, beans and lentils, tofu, dark green leafy veg, and fortified cereals. Pairing iron-rich plant foods with vitamin C (peppers, tomatoes, citrus, berries) helps absorption.",
          "Mild anaemia is common in pregnancy. If a blood test shows low iron or haemoglobin, your midwife will usually recommend an iron supplement. Some people need a higher dose; some find a gentler form sits better with a sensitive stomach.",
        ],
      },
      {
        id: "vitamin-d",
        heading: "Vitamin D",
        lead: "Vitamin D supports calcium absorption and bone development for both you and your baby.",
        paragraphs: [
          "UK guidance is 10mcg daily throughout pregnancy, regardless of season. Most people in the UK don't make enough vitamin D from sunlight alone, especially between October and March, and food sources are limited.",
          "If you've had a vitamin D deficiency picked up on a blood test, your GP may prescribe a higher dose for a period of time.",
        ],
      },
      {
        id: "calcium-iodine-omega3",
        heading: "Calcium, iodine, and omega-3",
        lead: "Three more nutrients do important specific work — and most of it is covered by ordinary food.",
        paragraphs: [
          "Calcium supports bone development. Dairy, fortified plant alternatives, tinned fish with bones, leafy greens, and tofu set with calcium are all good sources.",
          "Iodine matters for your baby's brain development. Dairy, eggs, white fish, and seaweed (in moderation) are the main food sources. Vegan diets can fall short — a pregnancy multivitamin with iodine, or a small kelp supplement, can help.",
          "Omega-3 (especially DHA) supports brain and eye development. Two portions of oily fish a week covers it; if you don't eat fish, an algae-based DHA supplement is a good option.",
        ],
      },
      {
        id: "food-vs-supplements",
        heading: "When food is enough, and when supplements help",
        lead: "Most pregnancy nutrition can come from food, with two consistent supplement exceptions.",
        paragraphs: [
          "Folic acid (until 12 weeks) and vitamin D (throughout) are the two UK-recommended supplements for everyone. Beyond that, a pregnancy-specific multivitamin can be a convenient way to cover the rest — particularly iodine, omega-3 (in some), and a top-up of iron and B vitamins.",
          "Always check that any supplement you take is pregnancy-specific. The key thing to avoid is vitamin A as retinol — it should not appear in your supplement. Beta-carotene (the plant form) is fine.",
        ],
        callout: {
          tone: "gentle-warning",
          text: "Don't take cod liver oil or any high-dose vitamin A supplement in pregnancy.",
        },
      },
      {
        id: "vegan-vegetarian",
        heading: "Vegan, vegetarian, and restricted diets",
        lead: "Plant-based and restricted diets can be very healthy in pregnancy — they just need a slightly closer look at a few specific nutrients.",
        paragraphs: [
          "The nutrients that need most attention on a plant-based diet are: B12 (always supplement on a vegan diet), iron, omega-3 (DHA from algae), iodine, calcium, and zinc. A pregnancy-specific vegan multivitamin can simplify this.",
          "If you're managing pregnancy alongside coeliac, food allergies, or a restricted diet for any reason, a referral to a registered dietitian is straightforward and often very useful.",
        ],
      },
      {
        id: "when-to-ask",
        heading: "When to ask for professional advice",
        lead: "Most pregnancies don't need specialist nutrition input — but a few situations do, and asking is the right move.",
        paragraphs: [
          "Speak to your midwife or GP if: a blood test has shown low iron or vitamin D, you have a condition affecting nutrition (coeliac, IBD, diabetes), you have a history of an eating disorder, your diet is very restricted, or you're pregnant with twins or more.",
          "Pharmacists are also a good first stop for supplement questions — they can check ingredients and tell you quickly whether something's pregnancy-safe.",
        ],
      },
    ],
  },

  // ─── WHEN YOU CAN'T FACE FOOD IN PREGNANCY ────────────────────────────────
  {
    slug: "when-you-cant-face-food-in-pregnancy",
    title: "When you can't face food in pregnancy: a kind, practical guide",
    metaDescription: "When food feels difficult in pregnancy — nausea, aversions, low appetite. What helps, what's normal, and when to ask for support.",
    quickAnswer:
      "It's very common for food to feel difficult at points in pregnancy, especially in the first trimester. Nausea, smell sensitivity, food aversions, and low appetite are all normal. Small frequent bites, plain or cold foods, fluids in any form (water, ice lollies, broths), and being kind to yourself usually help. Speak to your midwife or GP if you can't keep food or fluids down for more than a day, you're losing weight, or it's affecting your daily life.",
    howThisFeels: [
      "Looking at a plate and feeling nothing but resistance",
      "Foods you used to love suddenly feeling impossible",
      "Worrying you're letting your baby down",
      "Pretending to your family you've eaten when you haven't",
    ],
    whatHappening: {
      commonCauses: [
        { heading: "Pregnancy hormones", body: "Rising hCG and oestrogen affect appetite, taste, and smell — sometimes dramatically." },
        { heading: "Nausea and reflux", body: "Feeling sick or having reflux makes food feel like the last thing you want, even when you're hungry." },
      ],
      lessCauses: [
        { heading: "Stress and exhaustion", body: "Both reduce appetite, and pregnancy is full of both." },
        { heading: "Hyperemesis gravidarum", body: "A more severe form of pregnancy sickness — needs medical support, not soldiering through." },
      ],
      whyItVaries: "Hormone sensitivity, prior history with food, and the realities of each pregnancy all affect how this lands.",
    },
    timing: {
      whenStarts: "Most often in the first trimester, sometimes earlier than you'd expect.",
      whenPeaks: "Around 8–10 weeks for many people.",
      whenEases: "Usually eases through the second trimester for most people, though some carry it longer.",
    },
    whatItFeelsLike: ["A constant low-level revulsion at smells", "Surprising relief at the simplest foods"],
    whatThisMeans:
      "Not being able to face food in pregnancy is a real, common, hormonal experience — not a failure of effort. The goal is fluids, small amounts, and kindness, not full meals.",
    normal: [
      "Strong food aversions, sometimes to foods you used to love",
      "Heightened smell sensitivity making cooking unbearable",
      "Eating only a small range of foods for a while",
      "Some weight loss in the first trimester (usually mild)",
    ],
    seekSupport: [
      "Inability to keep fluids down for 24 hours or more",
      "Vomiting many times a day, every day",
      "Significant weight loss",
      "Dark urine, dizziness, or feeling very unwell",
      "Mental health impact that's getting harder to manage",
    ],
    disclaimer: "If pregnancy sickness is severe — or even close — you do not need to manage it alone. Hyperemesis gravidarum is treatable, and asking for help is exactly the right move.",
    whatYouCanDo: [
      { action: "Lower the bar to small frequent bites", reason: "Tiny amounts often stay down when full meals don't." },
      { action: "Lean on plain, cold, or smell-free foods", reason: "Cold foods give off less smell, which often helps with nausea." },
      { action: "Get fluids in any way you can", reason: "Ice lollies, broths, smoothies, sips through a straw — it all counts." },
      { action: "Ask for help with cooking and shopping", reason: "Kitchen smells are often the hardest part; not being in the kitchen helps." },
      { action: "Ring your midwife or GP if it's getting worse", reason: "There are safe medicines and support — you don't have to soldier through." },
    ],
    whatHappensNext: "For most people, eating gradually feels easier through the second trimester. For some, support and medication make a real difference.",
    relatedStage: {
      intro: "When food is hard, related guidance can help:",
      links: [
        { label: "Complete guide to morning sickness", href: "/articles/complete-guide-morning-sickness", context: "The fuller picture of nausea in pregnancy." },
        { label: "Eating well in pregnancy", href: "/articles/eating-well-in-pregnancy", context: "For when eating is feeling more possible again." },
      ],
    },
    aiPrompts: [
      "What can I eat when I feel sick all day?",
      "Is it bad if I'm not eating much in the first trimester?",
      "How do I know if I have hyperemesis?",
    ],
    captureIntro: "These weeks deserve to be remembered honestly. Food, smells, the strange shape of your appetite — all of it.",
    trimester: [1, 2],
    relatedSlugs: ["complete-guide-morning-sickness", "eating-well-in-pregnancy", "key-nutrients-in-pregnancy"],
    journey: ["pregnancy"],
    topics: ["diet", "symptoms"],
    reviewedBy: "Jenny Joines",
    lastUpdated: "April 2026",
    keyTakeaways: [
      "It's very common for food to feel hard in pregnancy, especially the first trimester",
      "Small frequent bites, plain or cold foods, and fluids in any form usually help most",
      "Some weight loss in early pregnancy is common and usually fine — your baby's needs are very small at this stage",
      "Severe sickness (hyperemesis gravidarum) is treatable and absolutely worth asking about",
      "Reach out to your midwife or GP if you can't keep fluids down, are losing significant weight, or it's affecting your wellbeing",
    ],
    sources: [
      "NHS — Vomiting and morning sickness in pregnancy",
      "RCOG — The management of nausea and vomiting of pregnancy and hyperemesis gravidarum",
      "Pregnancy Sickness Support — Patient information",
      "NICE CKS — Nausea/vomiting in pregnancy",
    ],
    faq: [
      { question: "Will my baby be okay if I'm not eating much?", answer: "Almost always, yes. In the first trimester your baby's needs are very small and your body draws on its reserves. Focus on fluids and whatever small amounts you can manage." },
      { question: "What foods are easiest when I feel sick?", answer: "Plain, cold, or carb-based foods often work best — toast, crackers, plain rice, cold pasta, fruit, yoghurt, ice lollies, smoothies. Strong smells and warm, cooked foods are usually hardest." },
      { question: "Should I take my pregnancy multivitamin if I can't eat much?", answer: "If it's making nausea worse, it's okay to pause it temporarily — folic acid is the most important one to keep going, and a smaller folic acid tablet is often easier to tolerate. Talk to your pharmacist or midwife." },
      { question: "How do I know if it's hyperemesis gravidarum?", answer: "Hyperemesis is more than ordinary morning sickness — it usually means vomiting many times a day, being unable to keep fluids down, weight loss, and feeling very unwell. It needs medical care, including safe anti-sickness medication. Don't wait it out." },
      { question: "I cried over a meal I couldn't eat. Is that normal?", answer: "Yes. Pregnancy nausea and food aversions can be genuinely distressing, on top of being physically draining. You're not overreacting." },
    ],

    topic: "diet-and-exercise",
    standfirst:
      "Some days in pregnancy, food just won't happen — and that doesn't mean anything is going wrong. A kind, practical guide for when eating gets hard.",
    editorialSections: [
      {
        id: "why-food-feels-hard",
        heading: "Why food can suddenly feel difficult in pregnancy",
        lead: "Pregnancy changes hormones, smell, taste, digestion, and energy — often all at once. It's not surprising that food gets caught in the middle.",
        paragraphs: [
          "Rising hCG and oestrogen heighten the sense of smell and shift taste, sometimes dramatically. Slowed digestion makes food sit heavier. Nausea — daily, sometimes constant — turns even thinking about food into a hurdle.",
          "On top of all that, the foods you used to find comforting can suddenly feel impossible, while strange new things (cold fruit, salty crackers, ice lollies) become unexpected lifesavers. None of this means something is wrong.",
        ],
        callout: {
          tone: "reassurance",
          text: "Aversions, sudden disgust at familiar smells, and a much smaller appetite are some of the most common experiences in early pregnancy.",
        },
      },
      {
        id: "what-to-try",
        heading: "What to try when your usual way of eating stops working",
        lead: "When food feels hard, the goal isn't a balanced plate — it's anything in, kindly.",
        paragraphs: [
          "Smaller, more frequent bites. Cold or room-temperature foods (less smell). Plain carbs — toast, crackers, plain pasta, rice, oatcakes. Ginger in any form. Cold fruit. Yoghurt. A spoonful of peanut butter. A few crisps. Whatever lands.",
          "Eating something — anything — before getting out of bed often helps with morning nausea. So does keeping snacks within reach and not letting yourself get to fully empty.",
        ],
      },
      {
        id: "small-things-that-help",
        heading: "Small things that may still help",
        lead: "When meals feel impossible, the rest of the day around food matters more than the food itself.",
        paragraphs: [
          "Get fluids in any form: ice lollies, broth, smoothies, sips through a straw, ice chips, weak squash, oral rehydration sachets if you're really struggling.",
          "Reduce kitchen exposure if you can — ask your partner or a friend to cook, order in, or batch-cook in calmer windows. Ventilate where possible. Keep windows open.",
          "Mints, lemon, ginger, acupressure bands, vitamin B6, and prescribed anti-sickness medication all help different people. Don't be a hero — try things.",
        ],
      },
      {
        id: "about-weight",
        heading: "About weight, calories, and what your baby needs",
        lead: "It's worth saying clearly: a baby's needs in early pregnancy are very small, and your body has reserves it can draw on.",
        paragraphs: [
          "Some weight loss in the first trimester is very common and usually fine. Babies grow well even when their parents are barely eating, especially in the early weeks. The thing your body most needs is fluids, not calories.",
          "Weight gain catches up later in pregnancy when appetite usually returns. The first trimester is rarely the right time to worry about how much or what you're eating — it's the time to focus on fluids, rest, and small kindnesses.",
        ],
      },
      {
        id: "when-to-ask",
        heading: "When poor intake or dehydration is worth raising",
        lead: "There is a point at which not eating well in pregnancy stops being ordinary morning sickness and becomes something to ask about.",
        paragraphs: [
          "Contact your midwife, GP, or NHS 111 if you: can't keep fluids down for more than 24 hours, are vomiting many times a day, are losing significant weight, have very dark urine or aren't passing much urine, feel dizzy or faint, or feel really unwell in general.",
          "Hyperemesis gravidarum is more than ordinary pregnancy sickness — it needs treatment, often including safe anti-sickness medication and sometimes a hospital visit for IV fluids. It is treatable. You do not have to ride it out.",
        ],
        callout: {
          tone: "gentle-warning",
          text: "If you're vomiting persistently, can't keep fluids down, or feel very unwell, please ring your midwife, GP, or NHS 111 today.",
        },
      },
      {
        id: "the-emotional-side",
        heading: "The emotional side of food in early pregnancy",
        lead: "It's easy to underestimate how draining and isolating it can be when food becomes hard.",
        paragraphs: [
          "There can be guilt — about not eating 'properly' for the baby. Frustration — at not being able to enjoy meals you'd looked forward to. Grief — for the easy relationship with food you had before. None of these are an overreaction.",
          "It can also be lonely. Pregnancy sickness is rarely visible to anyone else, and 'have you tried ginger?' wears thin quickly. Talking to your midwife, partner, or a support service like Pregnancy Sickness Support can help.",
        ],
        callout: {
          tone: "reassurance",
          text: "You are not failing your baby by struggling to eat. You're navigating one of the hardest physical parts of early pregnancy — and asking for help is part of looking after both of you.",
        },
      },
    ],
  },
];

// ─── Public API ────────────────────────────────────────────────────────────

export const getArticle = (slug: string): ArticleData | null =>
  articleDatabase.find((a) => a.slug === slug) ?? null;

export const getAllArticles = (): ArticleData[] => articleDatabase;

// Curated → same topic → shared cornerstone. Stops rather than padding with weak matches.
export const getRelatedArticles = (slug: string, limit = 3): ArticleData[] => {
  const source = articleDatabase.find((a) => a.slug === slug);
  if (!source) return [];

  const seen = new Set<string>([slug]);
  const out: ArticleData[] = [];

  const push = (a: ArticleData | undefined) => {
    if (!a || seen.has(a.slug) || out.length >= limit) return;
    seen.add(a.slug);
    out.push(a);
  };

  // 1. Curated relatedSlugs in order
  source.relatedSlugs?.forEach((s) => push(articleDatabase.find((a) => a.slug === s)));

  // 2. Same topic
  if (source.topic && out.length < limit) {
    articleDatabase
      .filter((a) => a.topic === source.topic)
      .forEach(push);
  }

  // 3. Shared cornerstone
  if (source.cornerstoneSlug && out.length < limit) {
    articleDatabase
      .filter((a) => a.cornerstoneSlug === source.cornerstoneSlug || a.slug === source.cornerstoneSlug)
      .forEach(push);
  }

  // No padding beyond honest matches.
  return out;
};

export const getCornerstoneArticles = (): ArticleData[] =>
  articleDatabase.filter((a) => a.isCornerstone);

export const getArticlesByJourney = (journey: string): ArticleData[] =>
  articleDatabase.filter((a) => a.journey?.includes(journey));

export const getArticlesByTopic = (topic: string): ArticleData[] =>
  articleDatabase.filter((a) => a.topics?.includes(topic));

export const getAllJourneys = (): string[] =>
  [...new Set(articleDatabase.flatMap((a) => a.journey ?? []))];

export const getAllTopics = (): string[] =>
  [...new Set(articleDatabase.flatMap((a) => a.topics ?? []))];
