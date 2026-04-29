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

  // ─── HOW YOUR BABY DEVELOPS IN PREGNANCY ──────────────────────────────────
  {
    slug: "how-your-baby-develops-in-pregnancy",
    title: "How your baby develops in pregnancy: a calm, complete guide",
    metaDescription: "How your baby develops across pregnancy — from the first weeks through to birth. A grounded, wonder-filled guide to the bigger picture of growth.",
    quickAnswer:
      "Your baby develops in three broad arcs: the first trimester lays down every major system from a few cells of tissue; the second trimester is mostly about growth, movement, and the senses coming online; the third trimester is finishing — putting on weight, maturing the lungs and brain, and getting ready for life outside. Most pregnancies follow this shape, with small variations that are completely normal.",
    howThisFeels: [
      "Wanting to picture what's actually happening, without the weekly anxiety",
      "Reading milestone after milestone and losing the bigger thread",
      "Looking for wonder, not just a checklist",
      "Quietly worrying when you don't feel a 'milestone' at the expected week",
    ],
    whatHappening: {
      commonCauses: [
        { heading: "A staged unfolding", body: "Pregnancy isn't a straight line of growth. The first trimester builds; the second grows and refines; the third matures and prepares. Each phase has its own job." },
        { heading: "Hormonal choreography", body: "The same hormones that change how you feel are quietly directing your baby's growth — building the placenta, supporting the uterus, and signalling the next stage of development." },
      ],
      lessCauses: [
        { heading: "Individual variation", body: "Babies develop within ranges, not on exact dates. Movement, growth, and timing all vary, and most variations are within healthy norms." },
      ],
      whyItVaries:
        "Two healthy pregnancies can look quite different week by week. Genetics, the placenta, and your own body all shape the pace. The bigger arc is more reliable than any single weekly milestone.",
    },
    timing: {
      whenStarts: "Development begins from implantation, well before most people know they're pregnant.",
      whenEases: "The major structural building is largely complete by the end of the first trimester; the rest of pregnancy is growth, refinement, and maturation.",
    },
    whatItFeelsLike: [
      "Quiet, invisible change in the first trimester",
      "First flutters and clearer movement in the middle months",
      "Bigger, more rhythmic movement and visible shape later on",
    ],
    whatThisMeans:
      "Your baby's development is one of the most extraordinary things a body does, and it doesn't need a milestone tracker to be unfolding properly. Knowing the broad arc is usually more useful — and more grounding — than chasing the week-by-week.",
    normal: [
      "Different paces of growth between pregnancies",
      "Movement starting anywhere from around 16–24 weeks",
      "Quiet weeks followed by noticeably more movement",
      "Scans showing measurements within a wide healthy range",
    ],
    seekSupport: [
      "A clear change in pattern of movement in the third trimester",
      "Bleeding or severe pain at any point",
      "Anything from a scan or test you'd like more clarity on",
    ],
    disclaimer: "This is general information about the broad arc of pregnancy development, not a substitute for individual care. Your midwife and maternity team are your best source for anything specific.",
    whatYouCanDo: [
      { action: "Read in arcs, not weeks", reason: "The bigger picture is more reliable than weekly snapshots and far less anxious." },
      { action: "Keep your appointments", reason: "Routine antenatal care is how anything that needs attention is most likely to be picked up." },
      { action: "Trust your sense of movement later on", reason: "From around 24–28 weeks, your felt sense of your baby's pattern is genuinely useful information." },
    ],
    whatHappensNext: "Each trimester hands over to the next — building, growing, and finishing — until birth.",
    relatedStage: {
      intro: "Development sits inside the wider Baby topic:",
      links: [
        { label: "Your baby in pregnancy", href: "/pregnancy/baby", context: "The wider topic this article belongs to." },
        { label: "First trimester: complete guide", href: "/articles/first-trimester-complete-guide", context: "Where the foundations are laid." },
        { label: "Second trimester: complete guide", href: "/articles/second-trimester-complete-guide", context: "Movement, growth, and the senses." },
      ],
    },
    aiPrompts: [
      "What develops in the first trimester?",
      "When will I start feeling movement?",
      "What's happening in the third trimester?",
    ],
    captureIntro: "How your baby is developing is one of the quieter wonders of pregnancy. Worth pausing to notice.",
    trimester: [1, 2, 3],
    relatedSlugs: ["first-trimester-complete-guide", "second-trimester-complete-guide", "third-trimester-complete-guide"],
    journey: ["pregnancy"],
    topics: ["baby", "development"],
    isCornerstone: true,
    reviewedBy: "Jenny Joines",
    lastUpdated: "April 2026",
    keyTakeaways: [
      "Pregnancy unfolds in three broad arcs: building, growing, and finishing",
      "Most major systems are formed in the first trimester from a small cluster of cells",
      "The second trimester is largely about growth, movement, and the senses coming online",
      "The third trimester matures the lungs and brain and gets your baby ready for life outside",
      "Variation between pregnancies is normal — the bigger arc is more reliable than any single week",
    ],
    sources: [
      "NHS — You and your baby at 1 to 3 weeks of pregnancy (and through-pregnancy series)",
      "NICE — Antenatal care guidance",
      "Tommy's — How your baby develops",
      "RCOG — Pregnancy and birth information",
    ],
    faq: [
      { question: "When does my baby start to look like a baby?", answer: "Recognisably human features — head, limbs, fingers, toes — are forming through weeks 8–12, even though your baby is still very small. By the second trimester scan around 20 weeks, the proportions and features are clearly baby-like." },
      { question: "When will I feel my baby move?", answer: "Most people feel first movement between 16 and 24 weeks. It can come earlier in second pregnancies, and later if your placenta is at the front. By around 28 weeks, you'll usually have a sense of your baby's own pattern." },
      { question: "Are weekly milestones reliable?", answer: "They're useful as a rough guide but not as an exact schedule. Your baby is on their own timeline within healthy ranges. Routine scans and appointments are how anything outside those ranges is checked." },
      { question: "What develops last?", answer: "The lungs and brain do significant maturing in the final weeks, which is one of the reasons full-term pregnancies (37+ weeks) are encouraged where possible." },
    ],

    // ── Deep template fields ──
    topic: "baby",
    standfirst:
      "From a cluster of cells to a small person who turns toward your voice, your baby's growth across pregnancy is more astonishing — and less weekly — than most milestone trackers let on.",
    editorialSections: [
      {
        id: "how-your-baby-develops-in-pregnancy",
        heading: "How your baby develops in pregnancy",
        lead: "Pregnancy unfolds in three broad arcs: a building phase, a growing phase, and a finishing phase. Almost everything else is detail.",
        paragraphs: [
          "In the first trimester, every major organ system is laid down from a small amount of tissue. By the end of week 12, your baby has a beating heart, the beginnings of every organ, recognisable limbs, fingers, and a face — at a length of around six to seven centimetres.",
          "The second trimester is when growth, movement, and the senses come into focus. By the third trimester, the work shifts to maturing — putting on weight, finishing the lungs and brain, and getting ready for life outside.",
        ],
      },
      {
        id: "first-trimester",
        heading: "What happens in the first trimester",
        lead: "The first 12 weeks are the most structurally significant of the entire pregnancy. They're also the quietest from your side.",
        paragraphs: [
          "From implantation onward, a small mass of cells organises itself into the early embryo and the placenta. Within weeks, the neural tube — which becomes the brain and spine — has formed. The heart begins beating around six weeks. Limb buds appear, then fingers and toes. By week 10, your baby is officially a fetus rather than an embryo, and the major organs are in place.",
          "All of this is happening before there's much to feel. Most early-pregnancy symptoms are about your body adjusting to pregnancy, not about anything missing if symptoms feel mild.",
        ],
        callout: {
          tone: "reassurance",
          text: "It's normal to feel disconnected from a pregnancy you can't yet feel. Development is happening regardless of how aware of it you are.",
        },
      },
      {
        id: "second-trimester",
        heading: "What changes in the second trimester",
        lead: "The middle months are often the easiest physically and the most noticeable in terms of your baby.",
        paragraphs: [
          "Your baby grows rapidly through the second trimester, from around the size of a lemon at 14 weeks to a substantial baby of around 35cm by 28 weeks. The senses come online: hearing develops, the eyes open and close, taste buds form, and reflexes like sucking and grasping appear.",
          "Movement, which has been happening for weeks, becomes something you can actually feel — first as flutters, then as clearer kicks. The 20-week scan offers the most detailed look at how your baby is growing and how the major systems are forming.",
        ],
      },
      {
        id: "third-trimester",
        heading: "What develops in the third trimester",
        lead: "The last 12 weeks are about maturing rather than building. Your baby is largely formed — the work now is finishing.",
        paragraphs: [
          "Weight gain accelerates. Fat is laid down, which helps with temperature regulation after birth. The lungs go through their final stages of maturation, producing the surfactant needed to breathe air. The brain develops rapidly, with significant growth in the final weeks of pregnancy.",
          "Your baby's pattern of movement, sleep, and wakefulness becomes more established. Most babies settle into a head-down position by around 36 weeks, ready for birth.",
        ],
      },
      {
        id: "movement-and-growth",
        heading: "How movement and growth change over time",
        lead: "Both movement and growth follow rhythms rather than straight lines. Knowing the rhythms makes them less anxious.",
        paragraphs: [
          "Early in pregnancy, growth is mostly invisible. From around 16–24 weeks, you'll feel first movement — a fluttering that quickly becomes more distinct. By the third trimester, your baby has their own pattern of active and quiet times, and getting to know it matters more than counting individual kicks.",
          "Growth is checked at routine appointments through measurement of your bump and, where indicated, additional scans. Wide variation is normal; consistent patterns matter more than single readings.",
        ],
      },
      {
        id: "every-pregnancy-different",
        heading: "Why every pregnancy develops a little differently",
        lead: "Two healthy pregnancies can look quite different week by week. Variation is built in.",
        paragraphs: [
          "Genetics, the placenta, your own height and build, and hormonal patterns all shape pace. A baby who measures slightly larger or smaller at one scan, or who moves more than a friend's, isn't doing anything wrong — they're following their own pattern within healthy ranges.",
          "The job of antenatal care is to spot the patterns that genuinely fall outside those ranges. That's why the routine scans, blood pressure checks, and growth measurements exist.",
        ],
      },
      {
        id: "when-to-raise-concerns",
        heading: "When to raise concerns or questions",
        lead: "There's no such thing as a wasted phone call to a midwife about your baby's movements or growth.",
        paragraphs: [
          "Specific things to call about: a clear change in your baby's usual pattern of movement from the third trimester onward; bleeding or severe pain at any stage; signs of waters breaking before term; or anything from a scan or appointment that you'd like more clarity on.",
          "Trust your instinct as well. If something feels different and you can't quite name why, that's still worth a call.",
        ],
      },
      {
        id: "week-by-week-without-overwhelm",
        heading: "How to use week-by-week guidance without getting overwhelmed",
        lead: "The week-by-week format is useful as a window, not a verdict. Most weeks don't need a milestone moment.",
        paragraphs: [
          "Week-by-week reading works well when it adds to a sense of the bigger arc and stops working when it becomes a list to measure yourself against. If a particular week feels heavy, it's completely fine to read less, not more.",
          "The Start of You's week-by-week view is designed to sit alongside this article rather than replace it — a window into the current week, not a chase.",
        ],
        callout: {
          tone: "reassurance",
          text: "Your baby is developing whether you're following the weeks closely or hardly at all. The development isn't dependent on your attention to it.",
        },
      },
    ],
  },

  // ─── TWINS AND MULTIPLES IN PREGNANCY ─────────────────────────────────────
  {
    slug: "twins-and-multiples-in-pregnancy",
    title: "Twins and multiples in pregnancy: a calm, grounded guide",
    metaDescription: "Twins and multiples in pregnancy — what's different, how care often changes, and what to expect. A calm orientation guide, not a specialist text.",
    quickAnswer:
      "A twin or multiple pregnancy is broadly the same as any other pregnancy — but with extra monitoring and slightly different care. You'll usually have more scans, closer growth checks, and earlier conversations about birth. Most twin and triplet pregnancies are well, and the main thing that changes is the amount of professional support around you.",
    howThisFeels: [
      "Reading scary headlines and trying to find a calmer source",
      "Wondering whether normal pregnancy advice still applies",
      "Quietly working out how on earth you'll manage two (or three)",
      "Wanting clear information without being made to feel high-risk by default",
    ],
    whatHappening: {
      commonCauses: [
        { heading: "Two placentas, or one shared", body: "Twins can have one placenta (monochorionic) or two (dichorionic). This — more than the type of twin — shapes how care is offered." },
        { heading: "Identical or non-identical", body: "Identical twins come from one egg; non-identical from two. Non-identical twins are more common, and they each have their own placenta." },
      ],
      lessCauses: [
        { heading: "Triplets and more", body: "Higher-order multiples are less common and almost always involve specialist care from early pregnancy." },
      ],
      whyItVaries:
        "Multiple pregnancies vary a lot depending on whether the babies share a placenta, how growth is unfolding, and individual circumstances. The care plan is built around your specific situation.",
    },
    timing: {
      whenStarts: "Multiples are usually identified at the dating scan around 11–14 weeks.",
      whenEases: "Care continues throughout pregnancy, with more frequent scans than singleton pregnancies.",
    },
    whatItFeelsLike: ["Symptoms can be more pronounced earlier on", "More appointments than friends with singleton pregnancies", "A bigger bump earlier, often with more discomfort later"],
    whatThisMeans:
      "A twin or multiple pregnancy isn't a single condition — it's a pregnancy with extra moving parts. The increased monitoring is a feature of good care, not a sign that something is wrong.",
    normal: [
      "More frequent scans through pregnancy",
      "Earlier conversations about birth and timing",
      "Slightly more pronounced early symptoms for some",
      "A bigger bump earlier, with more visible growth later",
    ],
    seekSupport: [
      "Bleeding, severe pain, or reduced movement of either baby",
      "Sudden swelling, headaches, or vision changes",
      "Anything that feels different from your usual pattern",
    ],
    disclaimer: "This article is general orientation, not a substitute for the specialist team caring for your multiple pregnancy. Your maternity unit will have specific advice for your situation.",
    whatYouCanDo: [
      { action: "Lean into your specialist team", reason: "Multiple pregnancies usually have a dedicated team — they're your best source of tailored advice." },
      { action: "Pace yourself earlier than you'd think", reason: "Tiredness and discomfort tend to arrive earlier; rest is part of the work." },
      { action: "Ask specifically about birth options early", reason: "Conversations about timing and mode of birth typically start earlier with multiples — bring your questions." },
    ],
    whatHappensNext: "Your specialist team will set out a plan for monitoring, scans, and birth that suits your specific pregnancy.",
    relatedStage: {
      intro: "Twins and multiples sit inside the wider Baby topic:",
      links: [
        { label: "Your baby in pregnancy", href: "/pregnancy/baby", context: "The wider topic this article belongs to." },
        { label: "How your baby develops in pregnancy", href: "/articles/how-your-baby-develops-in-pregnancy", context: "The broader arc, which still applies to multiples." },
      ],
    },
    aiPrompts: [
      "What's different about a twin pregnancy?",
      "How often will I have scans with twins?",
      "Can I have a vaginal birth with twins?",
    ],
    captureIntro: "A multiple pregnancy carries its own quiet weight. Worth noting how it's actually feeling, not just how it's going.",
    trimester: [1, 2, 3],
    relatedSlugs: ["how-your-baby-develops-in-pregnancy", "third-trimester-complete-guide", "tests-and-scans-in-pregnancy"],
    journey: ["pregnancy"],
    topics: ["baby", "multiples"],
    reviewedBy: "Jenny Joines",
    lastUpdated: "April 2026",
    keyTakeaways: [
      "A twin or multiple pregnancy is broadly the same — with extra monitoring built in",
      "Whether babies share a placenta matters more than identical vs non-identical for care",
      "More scans, earlier birth conversations, and a specialist team are normal features of multiple care",
      "Most twin and triplet pregnancies are well; the extra attention is part of how that's protected",
    ],
    sources: [
      "NHS — Pregnant with twins",
      "NICE — Multiple pregnancy guidance (NG137)",
      "Twins Trust — Pregnancy information",
      "RCOG — Multiple pregnancy",
    ],
    faq: [
      { question: "When will I find out if I'm having twins?", answer: "Usually at the dating scan, around 11–14 weeks. Occasionally it's picked up earlier if a scan is done for another reason." },
      { question: "Is a twin pregnancy automatically high-risk?", answer: "It's higher-monitored, which isn't quite the same. Most twin pregnancies go well; the additional monitoring is what helps keep them that way." },
      { question: "How often will I have scans?", answer: "Typically every two to four weeks from around 16 weeks, depending on whether the babies share a placenta. Your team will set out the exact schedule." },
      { question: "Will I need a caesarean?", answer: "Not necessarily. Many people have vaginal births with twins, especially when the first baby is head-down. Your team will discuss options based on your specific pregnancy." },
      { question: "When are twins usually born?", answer: "Twins are often born earlier than singletons — typically around 36–37 weeks for non-identical twins, and earlier for identical twins sharing a placenta." },
    ],

    // ── Deep template fields ──
    topic: "baby",
    standfirst:
      "A twin or multiple pregnancy is broadly the same as any other — with a little more monitoring, a little more support, and a few more scans. A calm orientation, not a specialist text.",
    editorialSections: [
      {
        id: "twins-and-multiples-in-pregnancy",
        heading: "Twins and multiples in pregnancy",
        lead: "Carrying more than one baby changes some details of pregnancy and care, but the bigger picture is reassuringly familiar.",
        paragraphs: [
          "Most multiple pregnancies are well. The main practical difference is that you'll have a specialist team around you and more frequent monitoring built in. That extra attention is part of how good outcomes are protected, not a sign that something is wrong.",
          "Twins can be identical (one egg splitting) or non-identical (two eggs fertilised at the same time). Non-identical is more common. Triplets and higher-order multiples are rarer and almost always involve specialist care from early on.",
        ],
      },
      {
        id: "what-is-different",
        heading: "What's different about twins and multiples",
        lead: "Some early-pregnancy symptoms can feel more pronounced, and the practical shape of pregnancy shifts.",
        paragraphs: [
          "Higher hormone levels can mean nausea or fatigue arrive earlier or feel stronger. Your bump usually shows earlier and grows more, and you may feel discomfort sooner — back ache, breathlessness, or trouble sleeping in later pregnancy.",
          "What also changes is the rhythm of care. You'll have more appointments, more scans, and earlier conversations about birth than someone with a singleton pregnancy.",
        ],
      },
      {
        id: "how-care-may-differ",
        heading: "How care and monitoring may differ",
        lead: "Multiple pregnancies usually have a dedicated team — and a clearer schedule of scans through pregnancy.",
        paragraphs: [
          "The biggest factor in your care plan is whether the babies share a placenta. Babies with their own placentas (dichorionic) are typically scanned every four weeks from around 20 weeks. Babies sharing a placenta (monochorionic) need closer monitoring — usually every two weeks from 16 weeks — to watch for complications that are specific to a shared placenta.",
          "You'll also usually meet your team earlier and more often, and have earlier conversations about timing and mode of birth.",
        ],
      },
      {
        id: "symptoms-and-growth",
        heading: "How symptoms and growth may differ",
        lead: "Pregnancy with twins is more pronounced rather than fundamentally different.",
        paragraphs: [
          "More common: stronger nausea early on, earlier bump growth, more fatigue, and more discomfort later — particularly in the last trimester. Sleep often becomes harder earlier.",
          "Movement is felt in much the same way, though it can be harder to tell which baby is which until later in pregnancy. Routine measurements and scans are how growth is followed.",
        ],
      },
      {
        id: "when-extra-support-is-common",
        heading: "When extra support is common",
        lead: "Multiple pregnancies are more likely to involve some form of additional support — and that's planned for, not a surprise.",
        paragraphs: [
          "Twins are more likely to be born early, often around 36–37 weeks for non-identical twins and earlier for identical twins sharing a placenta. Some babies spend time on a neonatal unit after birth, particularly if born early.",
          "Practical support — financial, emotional, and logistical — is also more often needed. Charities like Twins Trust offer information and community that can be quietly invaluable.",
        ],
      },
      {
        id: "birth",
        heading: "Birth with twins or multiples",
        lead: "Birth options depend on your specific pregnancy — but vaginal birth is genuinely possible for many people.",
        paragraphs: [
          "If the first baby is head-down at term, vaginal birth is often offered. If the first baby is breech, or if there are concerns about the placenta or growth, a planned caesarean may be recommended.",
          "Your team will talk through options well in advance. Bring questions, including the ones you feel slightly silly asking — they're the most useful kind.",
        ],
        callout: {
          tone: "reassurance",
          text: "A twin pregnancy isn't a more anxious version of a normal pregnancy. It's a pregnancy with more support around it — which is how good outcomes are looked after.",
        },
      },
      {
        id: "looking-after-yourself",
        heading: "Looking after yourself with twins or more",
        lead: "Pacing matters earlier than it would in a singleton pregnancy.",
        paragraphs: [
          "Eating well, drinking plenty, resting where you can, and accepting help are more important rather than less. The work your body is doing is significant; treating tiredness as information rather than a failing makes a real difference.",
          "If you can find a community of others doing the same thing — in person or online — many people with multiples find it some of the most useful support of all.",
        ],
      },
    ],
  },

  // ─── THE SPACE YOUR BABY WILL COME HOME TO ────────────────────────────────
  {
    slug: "the-space-your-baby-will-come-home-to",
    title: "The space your baby will come home to: a calm, simple guide",
    metaDescription: "What your baby actually needs at home in the early days — kept simple. A calm alternative to nursery checklists, focused on what matters and what doesn't.",
    quickAnswer:
      "Newborns need very little space and very few things. A safe place to sleep, somewhere to feed, somewhere to change them, warm clothes, and you. The rest is comfort, taste, or convenience, and it can almost all wait. Preparing well usually means buying less, not more.",
    howThisFeels: [
      "Scrolling lists of nursery essentials and feeling slightly overwhelmed",
      "Wondering if you're underprepared because your house doesn't look ready",
      "Trying to separate genuine needs from social-media wants",
      "Wanting calm, not aesthetic pressure",
    ],
    whatHappening: {
      commonCauses: [
        { heading: "A small list of real needs", body: "Newborns need warmth, safe sleep, regular feeding, clean nappies, and attentive adults. Almost everything else is optional." },
        { heading: "A big industry of suggested wants", body: "Most baby products solve mild convenience problems rather than essential ones. They aren't bad — they're just not necessary." },
      ],
      lessCauses: [
        { heading: "Personal preferences", body: "Some things matter more depending on your home, your baby, or how you'll feed. There isn't one universal kit." },
      ],
      whyItVaries: "What you need depends a lot on your space, your support network, and your baby. Buying everything before they arrive often means buying things you'd have skipped after a week.",
    },
    timing: {
      whenStarts: "Most people start thinking about home setup in the second trimester.",
      whenEases: "By around 36 weeks, the genuine basics are usually enough. The rest can be ordered after birth or borrowed.",
    },
    whatItFeelsLike: ["Quiet pressure to make a 'nursery'", "A steady stream of recommendations from everyone", "Wanting to nest and not knowing where to start"],
    whatThisMeans:
      "Preparing your home for a newborn is more about clearing space than filling it. Almost any home can be made ready with very little.",
    normal: [
      "Co-sleeping in your room for the first six months (recommended in the UK)",
      "A small set of basics rather than a fully fitted nursery",
      "Buying less than the lists suggest",
      "Adding things after birth, once you know what you actually need",
    ],
    seekSupport: [
      "Worry about safe sleep guidance — your midwife or health visitor can talk it through",
      "Significant financial pressure around baby items — local groups, Sure Start, and councils often have schemes",
      "Anything around your home that feels unsafe and you're not sure how to address",
    ],
    disclaimer: "This is general guidance, not safety-critical advice. For sleep safety specifically, follow current Lullaby Trust and NHS guidance.",
    whatYouCanDo: [
      { action: "Start with safe sleep, then build outward", reason: "A safe sleep space is the only non-negotiable; everything else is optional." },
      { action: "Borrow before you buy", reason: "Most baby items are used briefly. Friends, family, and local buy-nothing groups usually have what you need." },
      { action: "Wait on big nursery purchases", reason: "Your baby won't sleep in a separate room for months. There's time to decide." },
      { action: "Resist the urge to perfect it", reason: "Calm, soft, and good enough is everything a newborn needs." },
    ],
    whatHappensNext: "After birth, you'll quickly learn what you actually use — and most homes adapt naturally around the baby.",
    relatedStage: {
      intro: "Setting up at home sits inside the wider Preparing for baby topic:",
      links: [
        { label: "Preparing for baby", href: "/pregnancy/preparing-for-baby", context: "The wider topic this article belongs to." },
        { label: "Preparing for baby: complete guide", href: "/preparing-for-baby", context: "A calmer orientation to getting ready." },
      ],
    },
    aiPrompts: [
      "What does my baby actually need in the first weeks?",
      "Do I need a nursery before the baby arrives?",
      "What's the safe sleep guidance in the UK?",
    ],
    captureIntro: "Setting up the space your baby will come home to is one of the quieter rituals of late pregnancy. Worth noting how it actually feels.",
    trimester: [3],
    relatedSlugs: ["third-trimester-complete-guide"],
    journey: ["pregnancy"],
    topics: ["preparing", "home"],
    reviewedBy: "Jenny Joines",
    lastUpdated: "April 2026",
    keyTakeaways: [
      "Newborns need very little space and very few things",
      "Safe sleep is the one genuine non-negotiable; the rest is optional or can wait",
      "UK guidance is for babies to sleep in your room for the first six months",
      "Buying less, borrowing more, and adding after birth usually works better than a full pre-baby kit",
    ],
    sources: [
      "Lullaby Trust — Safer sleep advice",
      "NHS — Reduce the risk of sudden infant death syndrome (SIDS)",
      "NHS — How to prepare for a new baby",
      "Unicef Baby Friendly — Caring for your baby at night",
    ],
    faq: [
      { question: "Do I need a nursery ready before birth?", answer: "No. UK guidance is for babies to sleep in your room — in their own safe sleep space — for the first six months. A separate nursery isn't needed early on, and many people set theirs up gradually." },
      { question: "What's actually essential?", answer: "A safe sleep space (a flat, firm, clear surface — Moses basket, crib, or cot), nappies and a way to change them, warm clothes and blankets, a way to feed (bottles or a comfortable feeding setup), and a car seat if you'll drive home from hospital." },
      { question: "What can wait?", answer: "Most things — a fully fitted nursery, a baby bath, a changing table, a baby monitor in a small home, lots of toys, and most clothes beyond the basics." },
      { question: "Is co-sleeping safe?", answer: "There's specific UK guidance on safer co-sleeping from the Lullaby Trust. The recommendation is for your baby to sleep in your room in their own sleep space for the first six months; if you choose to bed-share, follow the safer co-sleeping advice." },
    ],

    // ── Deep template fields ──
    topic: "preparing-for-baby",
    standfirst:
      "Newborns need very little space and very few things. A calm alternative to the nursery-checklist version of getting ready — focused on what genuinely matters and what really doesn't.",
    editorialSections: [
      {
        id: "the-space-your-baby-will-come-home-to",
        heading: "The space your baby will come home to",
        lead: "The first weeks at home are quieter than the build-up suggests. Most of what your baby needs is you, warmth, and a safe place to sleep.",
        paragraphs: [
          "If you stripped most baby checklists back to what's actually used in the first six weeks, you'd be left with a small list — and a lot of room to breathe. Knowing the difference between need and noise is most of the work of getting ready at home.",
          "This article is a calm alternative to the nursery-blog version of preparation. It assumes you'd rather have less, well-chosen, than more, half-used.",
        ],
      },
      {
        id: "what-newborns-actually-need",
        heading: "What your baby actually needs in the early days",
        lead: "Five categories cover almost everything. The rest is preference.",
        paragraphs: [
          "A safe place to sleep — a flat, firm, clear sleep surface like a Moses basket, crib, or cot, with no pillows, bumpers, or loose bedding. UK guidance is for your baby to sleep in your room for the first six months.",
          "Somewhere to feed — a comfortable seat for breastfeeding or bottle-feeding, the bottles and steriliser if you're using them, and water and snacks within reach. Feeding takes much longer than people expect.",
          "Somewhere to change them — a changing mat on a bed or floor is plenty. A dedicated changing table is convenient but optional. Nappies, wipes, and a few muslin cloths cover the rest.",
          "Warmth — a small set of vests, sleepsuits, a couple of cardigans, and a few cellular blankets. Most other clothing can wait or be borrowed.",
          "A car seat — if you're being driven home from hospital, this is the one thing you genuinely need before birth.",
        ],
        callout: {
          tone: "info",
          text: "If you have a safe sleep space, a way to feed, a way to change, warm clothes, and a car seat, you have everything you need on day one.",
        },
      },
      {
        id: "thinking-about-space-simply",
        heading: "How to think about space simply",
        lead: "Newborns take up less physical space than the equipment suggests. Clearing room is often more useful than filling it.",
        paragraphs: [
          "A corner of your bedroom for the sleep space, a comfortable chair for feeding, a bag of nappies and a changing mat, and a drawer of clothes is genuinely enough for the first weeks. A separate nursery is for later, when your baby moves out of your room.",
          "If you're tight on space, the priority is the sleep space and somewhere comfortable to feed. Almost everything else can be improvised.",
        ],
      },
      {
        id: "what-matters-more-than-buying",
        heading: "What matters more than buying everything",
        lead: "Most of what helps in the first weeks isn't a product.",
        paragraphs: [
          "Help — practical, hands-on help with food, washing, and rest — matters more than gear. So does soft lighting at night, a bedside water bottle, snacks within reach, a phone charger by the bed, and clean enough laundry. Small comforts repeat themselves over and over.",
          "If you're choosing where to spend, a comfortable feeding chair, a good carrier or sling, and a decent buggy you'll use every day are usually better investments than expensive nursery furniture.",
        ],
      },
      {
        id: "sleep-safety",
        heading: "Sleep safety, kept simple",
        lead: "This is the one area where the guidance is precise — and the precision is worth following.",
        paragraphs: [
          "UK guidance is: baby on their back, on a flat, firm, clear surface, in their own sleep space, in your room for the first six months. No pillows, duvets, bumpers, or sleep positioners under six months. Keep the room around 16–20°C.",
          "If you choose to bed-share, follow the Lullaby Trust's safer co-sleeping guidance — it's specific and practical. Avoid bed-sharing if either parent has been drinking, smoking, or taking medication that causes drowsiness, or if your baby was premature or low birth weight.",
        ],
      },
      {
        id: "preparing-gently",
        heading: "How to prepare gently without pressure",
        lead: "Preparation works best when it's spread across pregnancy rather than crammed into the last weeks.",
        paragraphs: [
          "A loose plan: in the second trimester, decide where the baby will sleep and start gathering basics; in early third trimester, sort the car seat, hospital bag, and any big items; in the final weeks, focus on rest, food in the freezer, and a clean enough home rather than a perfect one.",
          "Whatever you don't have on the day, you can buy or borrow within a week of birth. Almost nothing about home setup is one-shot.",
        ],
        callout: {
          tone: "reassurance",
          text: "A calm, lived-in home is what most newborns experience and most thrive in. It doesn't have to look like a nursery photo to be ready.",
        },
      },
      {
        id: "buying-less-borrowing-more",
        heading: "Buying less, borrowing more",
        lead: "Most baby items are used briefly. Borrowed and second-hand often makes more sense.",
        paragraphs: [
          "Friends and family, local buy-nothing groups, and second-hand shops are full of nearly-new baby items. Cots, baby baths, slings, and clothes are all good candidates. The two things to buy new are the mattress and the car seat — for safety reasons.",
          "If you're under financial pressure, your midwife or health visitor can point you toward local schemes; many areas have grants, free starter packs, or charity-led support that isn't widely advertised.",
        ],
      },
    ],
  },

  // ─── SLEEP IN PREGNANCY ───────────────────────────────────────────────────
  {
    slug: "sleep-in-pregnancy",
    title: "Sleep in pregnancy: why it changes and what helps",
    metaDescription: "Why sleep changes in pregnancy, why it can become harder even when you're more tired, what may help, and when sleep problems are worth raising.",
    quickAnswer:
      "Sleep changes in pregnancy because hormones, body shape, and breathing patterns all shift. Many people feel more tired but find it harder to sleep deeply — particularly in the first and third trimesters. Most sleep changes are normal, and there are things that genuinely help: side-sleeping (especially the left side from the second trimester), pillows for support, a steady wind-down, and managing the things that wake you. If sleep problems are persistent or paired with anxiety, low mood, or breathing issues, it's worth raising with your midwife or GP.",
    howThisFeels: [
      "Exhausted by 8pm but wide awake at 3am",
      "Waking constantly to wee, then unable to fall back to sleep",
      "Aching, restless, and unable to find a comfortable position",
      "Worrying that bad sleep now means worse sleep later",
    ],
    whatHappening: {
      commonCauses: [
        { heading: "Hormonal shifts", body: "Progesterone makes you feel sleepy in the day but disrupts deep sleep at night, particularly in the first trimester." },
        { heading: "Physical changes", body: "A growing bump, a heavier uterus, and shifts in your centre of gravity make it harder to find a comfortable position, especially later on." },
        { heading: "More frequent waking", body: "Needing the loo, heartburn, leg cramps, vivid dreams, and a more sensitive sleep system all break up the night." },
      ],
      lessCauses: [
        { heading: "Breathing changes", body: "Pregnancy can cause snoring or mild sleep-disordered breathing, particularly later on. Most cases are harmless but some warrant a check." },
        { heading: "Restless legs", body: "Uncomfortable sensations in the legs at night affect a meaningful minority of pregnant people, often eased by addressing iron and hydration." },
      ],
      whyItVaries: "Sleep changes vary hugely. Some people sleep more than usual; others sleep far less. Both are within normal — neither predicts how birth or the early weeks will go.",
    },
    timing: {
      whenStarts: "Sleep changes can begin in the first weeks of pregnancy as progesterone climbs.",
      whenPeaks: "Often most disrupted in the first trimester (deep sleep changes) and again in the third trimester (physical comfort and waking).",
      whenEases: "The middle months are often the easiest. Sleep typically settles after birth — though the early weeks of newborn life are a separate story.",
    },
    whatItFeelsLike: [
      "Falling asleep easily but waking unrefreshed",
      "Waking three or four times a night and accepting it as normal",
      "Vivid, sometimes strange dreams",
      "A daytime tiredness that no amount of sleep seems to fully fix",
    ],
    whatThisMeans:
      "Disrupted sleep in pregnancy isn't a sign of doing anything wrong. It's one of the most common parts of pregnancy — and most of it is well within normal.",
    normal: [
      "Feeling much more tired in the daytime, especially in the first trimester",
      "Waking multiple times during the night",
      "Vivid or strange dreams",
      "Needing pillows or a different position to feel comfortable",
    ],
    seekSupport: [
      "Persistent insomnia paired with anxiety or low mood",
      "Loud snoring with daytime exhaustion or pauses in breathing (worth checking for sleep apnoea)",
      "Restless legs that are severe or affecting your day",
      "Sleep that's so disrupted it's affecting your ability to function",
    ],
    disclaimer: "This is general information about sleep in pregnancy. If sleep problems are severe or affecting your wellbeing, talk to your midwife or GP — sleep is part of antenatal care, not a side issue.",
    whatYouCanDo: [
      { action: "Sleep on your side from the second trimester onward", reason: "Side-sleeping (especially the left side) supports blood flow to the placenta. It's the position most strongly recommended later in pregnancy." },
      { action: "Use pillows for support", reason: "A pillow between the knees, under the bump, and behind the back can transform comfort. A long pregnancy pillow works well for some." },
      { action: "Have a steady wind-down", reason: "A predictable hour before bed — dim light, no scrolling, something calming — helps the body recognise sleep cues." },
      { action: "Manage the wakers", reason: "Reduce fluids in the last hour before bed, eat earlier to ease heartburn, and stretch calves before sleep to reduce cramps." },
      { action: "Treat daytime tiredness as information", reason: "If you can rest in the day — even briefly — it makes the night easier rather than harder." },
    ],
    whatHappensNext: "Sleep tends to settle in the middle months and become harder again later on. Things ease after birth, though newborn nights are their own thing.",
    relatedStage: {
      intro: "Sleep sits alongside the rest of how your body changes:",
      links: [
        { label: "Your body in pregnancy", href: "/pregnancy/body", context: "The wider topic this article belongs to." },
        { label: "Fatigue in early pregnancy", href: "/articles/fatigue-in-early-pregnancy", context: "The deep tiredness that often arrives first." },
        { label: "Complete guide to morning sickness", href: "/articles/complete-guide-morning-sickness", context: "Often disrupting nights as well as days." },
      ],
    },
    aiPrompts: [
      "Why am I so exhausted but can't sleep?",
      "Is it true I have to sleep on my left side?",
      "What helps with restless legs in pregnancy?",
    ],
    captureIntro: "Sleep is one of the parts of pregnancy that quietly shapes everything else. Worth noting how it really is, not just how it should be.",
    trimester: [1, 2, 3],
    relatedSlugs: ["fatigue-in-early-pregnancy", "complete-guide-morning-sickness", "early-pregnancy-symptoms-explained"],
    journey: ["pregnancy"],
    topics: ["body", "sleep"],
    reviewedBy: "Jenny Joines",
    lastUpdated: "April 2026",
    keyTakeaways: [
      "Sleep changes in pregnancy are common and almost always normal",
      "The first trimester (hormones) and the third trimester (comfort) are usually the hardest",
      "Side-sleeping — especially the left side from the second trimester — is the position most recommended",
      "Pillows, a steady wind-down, and managing the wakers (fluids, heartburn, cramps) genuinely help",
      "Persistent insomnia, severe restless legs, or loud snoring with daytime exhaustion are worth raising with a midwife or GP",
    ],
    sources: [
      "NHS — Tiredness and sleep problems in pregnancy",
      "Tommy's — Sleeping position in pregnancy",
      "Royal College of Midwives — Sleep in pregnancy",
      "NICE — Antenatal care",
    ],
    faq: [
      { question: "Why am I so tired but can't sleep?", answer: "Progesterone makes you feel sleepy in the day but disrupts the deeper stages of night-time sleep, particularly in the first trimester. The mismatch between exhaustion and broken sleep is one of the most common — and disorientating — features of early pregnancy." },
      { question: "Do I really have to sleep on my left side?", answer: "From the second trimester onward, side-sleeping is recommended over sleeping flat on your back, because the weight of the uterus can press on a major blood vessel. The left side is preferred for blood flow, but the right side is also fine. If you wake up on your back, just turn back onto your side — there's no harm done." },
      { question: "What can I do about waking up to wee constantly?", answer: "Reduce fluids in the last hour or two before bed (while keeping well-hydrated through the day). Empty your bladder fully before sleep. Some people find leaning forward when emptying helps. The frequency usually eases in the middle months and returns later as the baby presses on the bladder." },
      { question: "Are vivid pregnancy dreams normal?", answer: "Yes — vivid, strange, or emotionally intense dreams are very common in pregnancy. They're thought to be linked to hormonal changes and more frequent waking, which means you remember dreams more often. They aren't predictive of anything." },
      { question: "When should I worry about sleep problems?", answer: "Talk to your midwife or GP if sleep problems are persistent and paired with anxiety or low mood, if you have loud snoring with daytime exhaustion (worth ruling out sleep apnoea), or if restless legs are severe. Sleep is part of antenatal care, not a side issue." },
    ],

    // ── Deep template fields ──
    topic: "body",
    standfirst:
      "Pregnancy changes sleep — sometimes long before the bump does. A calm look at why it gets harder, what genuinely helps, and when broken nights are worth raising.",
    editorialSections: [
      {
        id: "sleep-in-pregnancy",
        heading: "Sleep in pregnancy",
        lead: "Sleep is one of the first parts of pregnancy to shift, and one of the last to settle. Most of what happens is normal — and a lot of it is workable.",
        paragraphs: [
          "Sleep changes in pregnancy don't usually mean anything is wrong. Hormonal shifts, a body that's literally changing shape, and a more sensitive sleep system all play a part. Most people sleep differently in pregnancy — sometimes more, often less, almost always more lightly.",
          "Knowing the patterns makes them less anxious. A bad night is rarely the start of a downward spiral; it's usually one of the rhythms that pregnancy moves through.",
        ],
      },
      {
        id: "why-sleep-changes",
        heading: "Why sleep changes in pregnancy",
        lead: "Three things shift at once: hormones, body shape, and breathing.",
        paragraphs: [
          "Progesterone — high through pregnancy — makes you sleepy in the day but disrupts the deeper stages of night-time sleep. That's why the first trimester so often pairs daytime exhaustion with broken nights.",
          "Body changes affect comfort, particularly later on. A heavier uterus, a shifting centre of gravity, and pressure on the bladder all wake you. Breathing changes — including more snoring — can also fragment sleep, even if you don't notice them yourself.",
        ],
      },
      {
        id: "why-its-harder-when-tired",
        heading: "Why it can be harder even when you're more tired",
        lead: "The mismatch between exhaustion and broken sleep is one of the most disorientating parts of early pregnancy.",
        paragraphs: [
          "Daytime tiredness in pregnancy is often hormonal rather than sleep-debt-driven. You may feel as tired after eight hours of sleep as after five — because the deep, restorative stages are reduced, even when you're horizontal for plenty of hours.",
          "It tends to ease in the middle months as hormones stabilise, then return in a different form in the third trimester — when physical comfort, not hormones, is the main driver.",
        ],
        callout: {
          tone: "reassurance",
          text: "Feeling exhausted but unable to sleep deeply isn't a sign of bad sleep habits — it's one of the most common rhythms of early pregnancy.",
        },
      },
      {
        id: "what-may-help",
        heading: "What may help",
        lead: "A handful of small things consistently make pregnancy sleep more workable. None are magic, but together they make a real difference.",
        paragraphs: [
          "Sleep on your side from the second trimester onward — preferably the left, but either side is fine. Use pillows: between the knees, under the bump, behind the back. A long pregnancy pillow works for some; a couple of regular pillows works for others.",
          "Reduce fluids in the last hour before bed (while staying hydrated through the day). Eat earlier to ease heartburn. Stretch your calves before bed if cramps are an issue. Keep the bedroom cool and dark.",
          "A steady wind-down — dim light, no scrolling, something calming — helps the body recognise sleep cues. If you wake at 3am and can't fall back, a low-light, low-stimulation activity (a podcast, a boring book) is usually better than lying frustrated in the dark.",
        ],
      },
      {
        id: "how-sleep-changes-across-pregnancy",
        heading: "How sleep changes across pregnancy",
        lead: "Sleep tends to follow a recognisable arc — and knowing the arc helps.",
        paragraphs: [
          "The first trimester is often the hardest in terms of unrefreshing sleep, even when you sleep long hours. Daytime tiredness can be profound.",
          "The second trimester is, for many people, the easiest. Energy returns, comfort holds, and sleep is often deeper.",
          "The third trimester is hard in a different way — comfort, frequent waking, vivid dreams, and an increasingly busy mind. Sleep tends to fragment more, often without long stretches.",
        ],
      },
      {
        id: "side-sleeping-explained",
        heading: "What 'sleep on your side' actually means",
        lead: "The advice is real, but the worry around it is often heavier than the evidence requires.",
        paragraphs: [
          "From around 28 weeks, going to sleep flat on your back is associated with a slightly higher risk of stillbirth. The recommendation is to settle to sleep on your side — left or right — using pillows to stay comfortable.",
          "If you wake up on your back, just roll back onto your side. There's no harm in having shifted position; the recommendation is about how you go to sleep, not policing your every movement at night.",
        ],
      },
      {
        id: "when-to-raise-it",
        heading: "When sleep problems may need raising",
        lead: "Most pregnancy sleep changes are normal. A few are worth bringing up with your midwife or GP.",
        paragraphs: [
          "Persistent insomnia paired with anxiety or low mood is worth a conversation — sleep and mental health are tightly linked, and treating one usually helps the other. Loud snoring with daytime exhaustion or pauses in breathing should be checked for sleep apnoea, which is more common in pregnancy. Severe restless legs are also worth raising — sometimes iron levels are involved.",
          "Sleep is part of antenatal care, not a side issue. If broken nights are quietly affecting how you're coping, that's enough reason to mention it.",
        ],
        callout: {
          tone: "info",
          text: "Saying 'I'm not sleeping well' to a midwife is a complete sentence. They'll know what to ask next.",
        },
      },
    ],
  },

  // ─── SIGNS OF LABOUR ──────────────────────────────────────────────────────
  {
    slug: "signs-of-labour",
    title: "Signs of labour: what to look for, and what they really mean",
    metaDescription: "The common signs labour may be starting — contractions, waters breaking, a show — how labour can begin differently for different people, and when it's time to call.",
    quickAnswer:
      "Labour usually announces itself in one of a few ways: regular contractions that build in strength, waters breaking, or a show (a small mucus discharge). Many people notice subtler shifts first — backache, period-like cramps, or a sense that something is different. Labour can begin differently for different people, and early signs can come and go for hours or even days. As a general rule, call your midwife or maternity unit when contractions are strong, regular, and lasting around a minute, if your waters break, if you have any bleeding beyond a light show, or any time something feels wrong.",
    howThisFeels: [
      "Wondering whether this is it, or another false alarm",
      "Trying to time twinges that don't quite settle into a pattern",
      "Excited and nervous in the same breath",
      "Not wanting to call too early — or too late",
    ],
    whatHappening: {
      commonCauses: [
        { heading: "Contractions building", body: "Tightenings that grow longer, stronger, and closer together over time are the clearest sign labour is establishing." },
        { heading: "Waters breaking", body: "A gush or a slow trickle of clear fluid. Sometimes obvious, sometimes easy to mistake for a small leak of urine." },
        { heading: "A show", body: "The plug of mucus that has sealed the cervix coming away — often pinkish or lightly streaked with blood. It can happen days before labour, or right alongside it." },
      ],
      lessCauses: [
        { heading: "Backache and cramping", body: "Period-like cramps or a deep, dull backache can be early labour, especially if they come in waves." },
        { heading: "An upset stomach", body: "Loose stools or feeling unsettled in the gut can precede labour by a day or two for some people." },
      ],
      whyItVaries: "Labour doesn't follow one script. Some people start with waters breaking, others with hours of mild backache, others with contractions that arrive already strong. None of these is more 'right' than the others.",
    },
    timing: {
      whenStarts: "Most people go into labour between 37 and 42 weeks. Early signs can begin hours or days before active labour.",
      whenPeaks: "Active labour — when contractions are strong, regular, and progressing — is when most people go in.",
      whenEases: "Once labour establishes, the early-sign uncertainty usually settles into a clearer pattern.",
    },
    whatItFeelsLike: [
      "Tightenings that feel like strong period cramps",
      "A backache that wraps around to the front",
      "A sudden gush, or a slow ongoing trickle",
      "A heavy, downward pressure that wasn't there yesterday",
    ],
    whatThisMeans:
      "Early signs of labour are your body beginning a process that has its own pace. Most early labour is safe to be at home for — but trusting your instincts to call is part of the process too.",
    normal: [
      "Hours, sometimes days, of on-and-off tightenings before labour establishes",
      "A show that appears in the days before labour, or right alongside it",
      "A slow, intermittent trickle of waters rather than a single dramatic gush",
      "Wondering more than once whether this is really it",
    ],
    seekSupport: [
      "Waters breaking — call your midwife or maternity unit even if contractions haven't started",
      "Any bleeding beyond a light, mucus-streaked show",
      "A noticeable change or reduction in your baby's movements",
      "Contractions strong, regular, and lasting around a minute (often described as 3 in 10 minutes)",
      "Anything that feels wrong, even if you can't name what",
    ],
    disclaimer: "This is general guidance about the signs of labour. Your maternity unit is the right first call whenever you're unsure — they would always rather hear from you.",
    whatYouCanDo: [
      { action: "Time contractions when they feel regular", reason: "Note when each starts and how long it lasts. A pattern that holds for an hour gives a much clearer picture than a single ten-minute window." },
      { action: "Eat, drink, and rest in early labour", reason: "Early labour can be long. Staying nourished and resting between waves makes the rest of labour easier to meet." },
      { action: "Stay home until contractions establish, unless told otherwise", reason: "Most people are advised to stay home in early labour. Familiar surroundings often help labour move forward." },
      { action: "Call your maternity unit if you're unsure", reason: "Midwives expect calls from people who aren't sure. Talking it through is part of the care, not an interruption to it." },
    ],
    whatHappensNext: "Once labour establishes, you'll usually be advised to come in. From there, the stages of labour begin to unfold.",
    relatedStage: {
      intro: "Signs of labour sit alongside the wider labour and birth picture:",
      links: [
        { label: "Your body in pregnancy", href: "/pregnancy/body", context: "The wider topic this article belongs to." },
        { label: "Stages of labour", href: "/articles/stages-of-labour", context: "What tends to happen once labour establishes." },
        { label: "When to go in for labour", href: "/articles/when-to-go-in-for-labour", context: "How to think about the moment to call or set off." },
      ],
    },
    aiPrompts: [
      "How do I know if I'm really in labour?",
      "What does a show actually look like?",
      "Should I go in if my waters break but I'm not contracting?",
    ],
    captureIntro: "The early signs of labour are easy to miss in the moment and easy to remember in detail later. Worth keeping a quiet note of how it actually felt.",
    trimester: [3],
    relatedSlugs: ["stages-of-labour", "when-to-go-in-for-labour", "third-trimester-complete-guide"],
    journey: ["pregnancy"],
    topics: ["body", "labour"],
    reviewedBy: "Jenny Joines",
    lastUpdated: "April 2026",
    keyTakeaways: [
      "Labour usually begins with contractions, waters breaking, or a show — sometimes all three, often not at once",
      "Early signs can come and go for hours or days before labour establishes",
      "Backache, cramping, and an unsettled stomach can all be early labour for some people",
      "Call your maternity unit if waters break, contractions are strong and regular, you have any bleeding beyond a light show, or movements change",
      "Trust your instinct to call — midwives expect it, and would rather hear from you twice than not at all",
    ],
    sources: [
      "NHS — Signs that labour has begun",
      "NICE — Intrapartum care for healthy women and babies",
      "Royal College of Midwives — Latent phase of labour",
      "Tommy's — Signs of labour",
    ],
    faq: [
      { question: "How do I know I'm really in labour and not having Braxton Hicks?", answer: "Braxton Hicks tightenings tend to be irregular, ease when you change position or rest, and don't get longer or stronger over time. True labour contractions usually become more regular, build in intensity, and continue regardless of what you do. If you're unsure, that itself is reason enough to ring your maternity unit." },
      { question: "What does a show look like?", answer: "A show is a small amount of thick, jelly-like mucus, often tinted pink, brown, or lightly streaked with blood. It can come away as one piece or in smaller amounts over a few days. A show on its own isn't a sign labour is imminent — it can happen days or even a week or so before active labour." },
      { question: "Should I go in if my waters have broken but contractions haven't started?", answer: "Always call your midwife or maternity unit when your waters break, even if contractions haven't started. They'll talk you through what to do — usually it involves staying at home for a period of time and going in if labour hasn't started within a window they'll specify, or sooner if anything changes." },
      { question: "Can labour stop and start again?", answer: "Yes. The early phase of labour, sometimes called latent or prodromal labour, can stretch over hours or days, with contractions that come and go. As long as your baby is moving normally and you have no warning signs, this is usually a normal — if frustrating — part of the process." },
      { question: "Is it normal to have backache rather than belly pain?", answer: "Yes. Some labours are felt mostly in the lower back rather than the front of the bump, often when the baby is in a particular position. Back labour is common enough that it's not by itself a sign anything is wrong." },
    ],

    // ── Deep template fields ──
    topic: "body",
    standfirst:
      "Labour rarely begins the way films suggest. A calm look at the common signs, the subtler ones, and how to know when it's time to call.",
    editorialSections: [
      {
        id: "signs-of-labour",
        heading: "Signs of labour",
        lead: "Labour can announce itself loudly or arrive quietly. Knowing the common signals — and the ones that are easier to miss — makes the lead-up feel less like a guessing game.",
        paragraphs: [
          "Most labours begin with one or more of three things: contractions that build over time, waters breaking, or a small mucus discharge known as a show. Beneath those, a lot of people notice quieter shifts first — backache, period-like cramps, an unsettled stomach, or simply a sense that something is different.",
          "None of these signs is a failure if it doesn't appear, and none is a guarantee on its own. Labour follows its own arc, and the early signs are an opening, not a starter pistol.",
        ],
      },
      {
        id: "what-often-happens-first",
        heading: "What often happens first",
        lead: "For many people, the earliest sign is something low-grade and ordinary — easy to dismiss until it keeps coming back.",
        paragraphs: [
          "Period-like cramps or a dull backache that arrives in waves is one of the most common openings. Some people feel a sudden burst of energy and an urge to organise — sometimes called nesting — in the day or two before. Others notice loose stools, an unsettled gut, or a heavier downward pressure than they've had before.",
          "These signs don't always lead straight into labour. They can come and go for a day or longer, then settle, then return. That stop-and-start pattern is part of how early labour often works.",
        ],
      },
      {
        id: "waters-contractions-and-show",
        heading: "Waters breaking, contractions, and a show",
        lead: "These are the three signs most people are watching for — and each can look different from what's expected.",
        paragraphs: [
          "Waters breaking can be a single noticeable gush of clear fluid, or a slow trickle that keeps coming when you stand or move. It's sometimes mistaken for a small bladder leak. Whether dramatic or subtle, it's always worth a call to your maternity unit.",
          "Contractions are tightenings of the uterus that, in true labour, become longer, stronger, and closer together. A pattern that holds steady or grows over an hour is more telling than one ten-minute stretch.",
          "A show is the plug of mucus that has sealed the cervix coming away. It tends to be jelly-like and may be pink, brown, or streaked with a little blood. A show on its own doesn't mean labour is imminent — it can appear days before active labour begins.",
        ],
      },
      {
        id: "how-early-labour-can-feel",
        heading: "How early labour can feel",
        lead: "Early labour — sometimes called the latent phase — is often longer and more uncertain than the textbook version suggests.",
        paragraphs: [
          "Early labour can feel like an extended evening of strong period pain, an aching back, and tightenings that don't quite establish. It can stretch across a single afternoon or across two or three nights. Many people sleep through parts of it, or only realise in hindsight that it had begun.",
          "Eating, resting, taking a bath, walking gently, watching something distracting — all are reasonable. Early labour doesn't usually need anything dramatic. What it needs most is permission to take its time.",
        ],
        callout: {
          tone: "reassurance",
          text: "An early labour that takes its time isn't a labour going wrong. It's one of the most common patterns there is.",
        },
      },
      {
        id: "how-labour-can-begin-differently",
        heading: "How labour can begin differently",
        lead: "There's no single right opening. Some labours start with waters breaking and quiet — others with strong contractions and no warning at all.",
        paragraphs: [
          "Some people have hours of mild backache before anything else. Some have a show days in advance and a slow build-up. Some go to bed feeling normal and wake up at 3am in established labour. All of these are within normal.",
          "If you've had a baby before, labour can sometimes begin and progress more quickly. If this is your first, the early phase is more likely to be long. Neither pattern is a guarantee.",
        ],
      },
      {
        id: "what-can-still-be-normal",
        heading: "What can still be normal before active labour",
        lead: "Not every twinge is the start of something. A lot of late-pregnancy sensations sit in the in-between.",
        paragraphs: [
          "Braxton Hicks tightenings that come and go, a heavy feeling low in the pelvis, mild cramps that ease with rest, and an upset stomach without any other signs are all common in the last weeks. They can show up alongside genuine early labour, or on their own with no labour following for days.",
          "The clearest distinction is direction of travel. Sensations that grow longer, stronger, and closer together over time are more likely to be labour than ones that ease when you change position, eat, or rest.",
        ],
      },
      {
        id: "when-to-call",
        heading: "When to call your midwife or maternity unit",
        lead: "There's no prize for waiting. Calling early is part of the care, not an interruption to it.",
        paragraphs: [
          "Call when contractions are strong, regular, and lasting around a minute (often described as 3 in 10 minutes), or sooner if your maternity unit has given you specific guidance. Always call when your waters break, even if contractions haven't started. Always call for any bleeding that's more than a light, mucus-streaked show, or for any change in your baby's movements.",
          "And always call if something feels wrong — even if you can't name what. Trusting that instinct is one of the most important parts of late pregnancy.",
        ],
        callout: {
          tone: "info",
          text: "Midwives would always rather hear from you twice than not at all. Calling is the right thing to do whenever you're unsure.",
        },
      },
    ],
  },

  // ─── STAGES OF LABOUR ─────────────────────────────────────────────────────
  {
    slug: "stages-of-labour",
    title: "Stages of labour: what each one is, and what tends to happen",
    metaDescription: "A calm guide to the stages of labour — early labour, established labour, transition, the birth of your baby, and the birth of the placenta — with realistic timing and what support may look like.",
    quickAnswer:
      "Labour is usually described in three stages. The first stage is the longest: it begins with early labour, moves into established labour, and ends with transition — when your cervix has opened fully. The second stage is the birth of your baby. The third stage is the birth of the placenta. Each stage can vary widely in length and intensity, and labour rarely follows a textbook timeline. Knowing the shape of each stage tends to make labour feel less unpredictable, even when it's intense.",
    howThisFeels: [
      "Wanting to know what's coming, but not in a clinical way",
      "Trying to picture how labour might unfold",
      "Worried about transition without quite knowing why",
      "Wondering how long it might take, and whether that matters",
    ],
    whatHappening: {
      commonCauses: [
        { heading: "Early labour", body: "The cervix begins to soften, thin, and open. Contractions are usually mild to moderate and irregular. This phase can be long." },
        { heading: "Established labour", body: "Contractions become regular, stronger, and longer. The cervix opens from around 4cm to fully dilated (10cm)." },
        { heading: "Transition", body: "The final part of the first stage. Often the most intense, often the shortest. Many people feel they can't go on right before they do." },
      ],
      lessCauses: [
        { heading: "Second stage — the birth", body: "Once the cervix is fully open, contractions help move your baby down and out. May involve active pushing or breathing the baby down." },
        { heading: "Third stage — the placenta", body: "After your baby is born, the placenta is delivered. This is usually quick and gentle, with or without a small injection to help." },
      ],
      whyItVaries: "Stage lengths vary enormously between people, and between pregnancies. A first labour is usually longer than a second. Some labours move steadily; others stop and start. None of these patterns is a sign of failure.",
    },
    timing: {
      whenStarts: "Labour begins when contractions become regular, or when waters break.",
      whenPeaks: "Established labour and transition are usually the most intense parts.",
      whenEases: "After your baby is born, contractions ease quickly. The placenta usually follows within an hour.",
    },
    whatItFeelsLike: [
      "Long stretches of waiting between waves of intensity",
      "A loss of sense of time once established labour takes over",
      "A moment in transition where it feels too much, just before it isn't",
      "A different, deeper kind of focus during the second stage",
    ],
    whatThisMeans:
      "The stages of labour are a map, not a schedule. Knowing the shape helps — but your labour will move at its own pace, and that's still labour working.",
    normal: [
      "An early phase that lasts much longer than the other stages combined",
      "Contractions that pause for a while and then return",
      "A short, intense transition before the urge to push arrives",
      "Pushing that takes anywhere from a few minutes to a couple of hours",
    ],
    seekSupport: [
      "Anything that feels wrong, at any stage of labour",
      "A change in your baby's movements before active labour",
      "Heavy bleeding at any point",
      "Severe pain between contractions, rather than during them",
    ],
    disclaimer: "This is general guidance about how labour stages tend to unfold. Your midwife is the right person to talk to about how your labour is progressing on the day.",
    whatYouCanDo: [
      { action: "Stay home and rest in early labour if advised", reason: "Familiar surroundings, food, and rest help your body do the long, quiet work of opening." },
      { action: "Lean into rhythm during established labour", reason: "Movement, breathing, sound, and water can all help you stay with the intensity rather than fight it." },
      { action: "Trust the moment of 'I can't' in transition", reason: "Many people feel they can't carry on right before they do. Recognising it as a sign of progress can help." },
      { action: "Listen to your body in the second stage", reason: "The urge to push is one of the strongest sensations there is. Following it — guided by your midwife — usually works better than counting." },
      { action: "Keep your birth partner in the loop", reason: "Telling them what helps and what doesn't, even briefly, makes their support easier to accept in the moment." },
    ],
    whatHappensNext: "After the placenta is delivered, the immediate postnatal period begins — skin-to-skin, the first feed, and the slow, settling shock of meeting your baby.",
    relatedStage: {
      intro: "Stages of labour sit alongside the wider labour and birth picture:",
      links: [
        { label: "Your body in pregnancy", href: "/pregnancy/body", context: "The wider topic this article belongs to." },
        { label: "Signs of labour", href: "/articles/signs-of-labour", context: "How labour usually begins." },
        { label: "When to go in for labour", href: "/articles/when-to-go-in-for-labour", context: "Knowing when to call or set off." },
      ],
    },
    aiPrompts: [
      "What actually happens in transition?",
      "How long does the second stage of labour usually take?",
      "What is the third stage of labour?",
    ],
    captureIntro: "The stages of labour can blur in the moment and sharpen in memory afterwards. A quiet space to note what each part felt like, in your own words.",
    trimester: [3],
    relatedSlugs: ["signs-of-labour", "when-to-go-in-for-labour", "third-trimester-complete-guide"],
    journey: ["pregnancy"],
    topics: ["body", "labour"],
    reviewedBy: "Jenny Joines",
    lastUpdated: "April 2026",
    keyTakeaways: [
      "Labour has three stages: opening (the first stage), birth of your baby (the second stage), and birth of the placenta (the third stage)",
      "The first stage is usually by far the longest, and includes early labour, established labour, and transition",
      "Transition is often the most intense part, and often the shortest",
      "Stage lengths vary widely — a first labour is usually longer than a second",
      "Knowing the shape helps, but your labour will move at its own pace, and that's still labour working",
    ],
    sources: [
      "NHS — The stages of labour and birth",
      "NICE — Intrapartum care for healthy women and babies",
      "Royal College of Midwives — Care in labour",
      "Tommy's — The stages of labour",
    ],
    faq: [
      { question: "How long does each stage of labour usually take?", answer: "There's a wide range. Early labour can last hours or even a couple of days. Established labour and transition together commonly last around 6 to 12 hours in a first labour, and often less in subsequent labours. The second stage (pushing) can be anything from a few minutes to a couple of hours. The third stage is usually 5 to 30 minutes. Your midwife will guide you through your specific labour." },
      { question: "What is transition?", answer: "Transition is the final part of the first stage of labour, when the cervix opens from around 8cm to fully dilated (10cm). It's often the most intense and most disorientating part, and frequently the shortest. Many people feel a strong sense of 'I can't do this' right at the moment they're closest to meeting their baby. Recognising it as a sign of progress can help in the moment." },
      { question: "What if my labour doesn't progress in the expected way?", answer: "Labours that pause, slow down, or move in less linear ways are common and not by themselves a sign anything is wrong. Your midwife will monitor progress and discuss options if things aren't moving as expected — including rest, position changes, water, or, if needed, support to help labour along. Decisions are made with you, not just told to you." },
      { question: "Is the third stage of labour something I have to do?", answer: "The third stage — the birth of the placenta — usually happens with very little active effort once your baby is born. You'll be offered a choice between an actively managed third stage (with a small injection to help the placenta come more quickly) and a physiological third stage (without). Your midwife will talk you through both options." },
      { question: "What support is available during labour?", answer: "Your midwife is with you throughout. You can also have a birth partner (or two, depending on your unit). Pain relief options range from breathing, movement, water, and TENS at one end to gas and air, opioids, and an epidural at the other. None is more 'right' than another — what works depends on you, the labour, and the moment." },
    ],

    // ── Deep template fields ──
    topic: "body",
    standfirst:
      "Labour follows a recognisable shape, even when it doesn't follow a schedule. A calm guide to each stage — what it is, what tends to happen, and what support may look like.",
    editorialSections: [
      {
        id: "the-stages-of-labour",
        heading: "The stages of labour",
        lead: "Labour is usually described in three stages. Understanding the shape of each one tends to make labour feel less unpredictable, even when the timing isn't.",
        paragraphs: [
          "The first stage is the opening — the cervix softens, thins, and dilates from closed to fully open. It contains early labour, established labour, and transition. It's usually by far the longest stage.",
          "The second stage is the birth of your baby. The third stage is the birth of the placenta. Each stage has its own rhythm, and each can vary widely in how long it takes and how it feels.",
        ],
      },
      {
        id: "early-labour",
        heading: "Early labour",
        lead: "The opening phase. Usually long, often manageable, sometimes barely noticeable.",
        paragraphs: [
          "In early labour, the cervix begins to soften, thin, and open in the early centimetres. Contractions are usually mild to moderate and irregular — coming and going, sometimes for hours, sometimes across more than one day.",
          "Most people are advised to stay home in early labour, eating, resting, taking baths, and moving when it helps. Familiar surroundings tend to support labour better than a hospital corridor at this stage.",
        ],
      },
      {
        id: "established-labour",
        heading: "Established labour",
        lead: "Labour finds its rhythm. Contractions become regular, longer, and stronger.",
        paragraphs: [
          "Established labour is usually defined as regular, painful contractions paired with the cervix opening from around 4cm onward. By this point, most people are no longer wondering whether this is labour.",
          "It's the stage most people associate with the word 'labour'. Movement, breathing, water, sound, and steady support from a midwife and birth partner all become important. Time often loses its usual shape.",
        ],
      },
      {
        id: "transition",
        heading: "Transition and the final part of labour",
        lead: "Often the most intense part of labour, and often the shortest.",
        paragraphs: [
          "Transition is the final stretch of the first stage, as the cervix opens from around 8cm to fully dilated. Contractions tend to be very strong and close together. Many people feel shaky, hot or cold, suddenly tearful, or convinced they can't carry on.",
          "That sense of 'I can't' is often a sign of how close you are. Transition rarely lasts long, and the second stage usually follows soon after.",
        ],
        callout: {
          tone: "reassurance",
          text: "Feeling like you can't go on, just before you do, is one of the most common moments of labour. It is often the sign that meeting your baby is close.",
        },
      },
      {
        id: "birth-of-the-baby",
        heading: "Birth of the baby",
        lead: "The second stage. The cervix is fully open, and contractions help bring your baby down and out.",
        paragraphs: [
          "Many people feel a strong, involuntary urge to push. Some labours involve active pushing; others involve breathing the baby down with the contractions. Your midwife will guide you with what's happening in your body.",
          "The second stage can be anywhere from a few minutes to a couple of hours. It often feels different from the first stage — more focused, more physical, sometimes more grounded.",
        ],
      },
      {
        id: "birth-of-the-placenta",
        heading: "Birth of the placenta",
        lead: "The third stage — usually quick, usually quiet.",
        paragraphs: [
          "After your baby is born, the placenta separates from the wall of the uterus and is delivered. This usually happens within 5 to 30 minutes and involves very little active effort on your part.",
          "You'll be offered a choice between an actively managed third stage (with a small injection to help the placenta come more quickly) and a physiological third stage (without). Both are reasonable; your midwife will talk you through them.",
        ],
      },
      {
        id: "how-long-labour-may-take",
        heading: "How long labour may take",
        lead: "There's no single answer. The honest one is: longer than you'd like, often, and shorter than you'd think, sometimes.",
        paragraphs: [
          "First labours are usually longer than subsequent ones. Established labour and transition together commonly last around 6 to 12 hours in a first labour, often less in a second or third. Early labour can stretch across far longer than that and is harder to pin down.",
          "Stage lengths are averages, not promises. A labour that takes its time isn't a labour going wrong — it's a labour finding its own pace.",
        ],
      },
      {
        id: "when-progress-isnt-textbook",
        heading: "When progress doesn't look textbook",
        lead: "Labours pause, slow down, or move in less linear ways. Most are not signs anything is wrong.",
        paragraphs: [
          "If your labour slows, your midwife may suggest changes of position, water, rest, or — if needed — gentle ways to support labour along. None of this means your body has failed. Sometimes it means your baby's position needs to shift; sometimes it means your body needs a quieter moment.",
          "If support or intervention is discussed, your midwife will explain what's being suggested and why. Decisions are made with you, not just told to you. Asking questions is part of the process, not an interruption to it.",
        ],
      },
    ],
  },

  // ─── WHEN TO GO IN FOR LABOUR ─────────────────────────────────────────────
  {
    slug: "when-to-go-in-for-labour",
    title: "When to go in for labour: how to know it's time",
    metaDescription: "When to call your midwife or maternity unit in labour, how the advice can differ for second babies, what your unit may ask, and the signs not to wait with.",
    quickAnswer:
      "As a general rule, call your midwife or maternity unit when contractions are strong, regular, and lasting around a minute (often three in ten minutes), if your waters break, if you have any bleeding beyond a light show, or if your baby's movements change. Call sooner if this is not your first baby, as labour can move more quickly. Always call if something feels wrong, even if you can't name what — your maternity unit would always rather hear from you twice than not at all.",
    howThisFeels: [
      "Wanting to call but worried about being sent home",
      "Trying to time contractions while they're happening to you",
      "Wondering whether something is enough to ring about",
      "Trusting your instinct, then second-guessing it",
    ],
    whatHappening: {
      commonCauses: [
        { heading: "Established contractions", body: "Strong, regular contractions lasting around a minute and coming roughly every 3 to 4 minutes are usually the moment most maternity units want to know." },
        { heading: "Waters breaking", body: "Always worth a call, even before contractions start. Your unit will guide you on what happens next." },
        { heading: "Bleeding", body: "More than a small show — even a moderate bleed — is a reason to call straight away rather than wait." },
      ],
      lessCauses: [
        { heading: "Changes in movement", body: "Any noticeable change or reduction in your baby's movements should be called in, day or night, in or out of labour." },
        { heading: "Something that feels wrong", body: "An instinct that something isn't right — even without a clear sign — is reason enough to ring." },
      ],
      whyItVaries: "Maternity units often have slightly different guidance, and your midwife may have given you specific advice based on your pregnancy. When their advice differs from general rules, follow theirs.",
    },
    timing: {
      whenStarts: "Most labours establish gradually — calling early in the latent phase isn't usually advised unless something specific is happening.",
      whenPeaks: "The most common time to be advised in is once contractions are regular, strong, and lasting around a minute.",
      whenEases: "Once you're in the right place — at home, on the way, or in your unit — the uncertainty about timing usually eases.",
    },
    whatItFeelsLike: [
      "A clear shift from 'maybe' to 'this is it'",
      "Difficulty talking through contractions",
      "An inward turn, when you stop being interested in anything else",
      "A pull to be where you've planned to give birth",
    ],
    whatThisMeans:
      "Knowing when to go in is part instinct, part guidance from your maternity unit. The right answer is usually the one that lets you feel safe.",
    normal: [
      "Calling more than once during the lead-up to labour",
      "Being advised to stay home a little longer in early labour",
      "Being told to come in straight away once labour establishes",
      "Trusting an instinct that turned out to be right",
    ],
    seekSupport: [
      "Waters breaking — always call",
      "Any bleeding that's more than a light, mucus-streaked show",
      "Reduced or changed baby movements at any time",
      "Severe constant pain, rather than pain that comes and goes with contractions",
      "A strong sense that something is wrong, even without a clear reason",
    ],
    disclaimer: "This is general guidance about when to call or go in. Your maternity unit's advice for you, and on the day, takes priority over any general rule.",
    whatYouCanDo: [
      { action: "Save your maternity unit's number where it's easy to find", reason: "Knowing exactly who to call removes one decision in a moment when decisions are harder." },
      { action: "Time a contraction pattern over an hour", reason: "A pattern that holds for an hour is much more telling than one ten-minute window." },
      { action: "Call earlier if this isn't your first baby", reason: "Second and later labours often move more quickly. Most units would prefer a slightly early call than a roadside birth." },
      { action: "Have your bag ready by the door", reason: "Practical readiness reduces the mental load when you'd rather be focused on labour itself." },
      { action: "Follow your instinct as well as the rules", reason: "An instinct that something is wrong, or that it's time, is information your maternity unit takes seriously." },
    ],
    whatHappensNext: "Once you call, your unit will either advise staying home for a bit longer, ask you to come in for a check, or invite you in to stay. From there, the stages of labour begin to unfold.",
    relatedStage: {
      intro: "Knowing when to go in sits alongside the wider labour and birth picture:",
      links: [
        { label: "Your body in pregnancy", href: "/pregnancy/body", context: "The wider topic this article belongs to." },
        { label: "Signs of labour", href: "/articles/signs-of-labour", context: "How labour usually begins." },
        { label: "Stages of labour", href: "/articles/stages-of-labour", context: "What tends to happen once labour establishes." },
      ],
    },
    aiPrompts: [
      "When should I call the hospital in labour?",
      "Should I go in earlier with a second baby?",
      "What will the maternity unit ask me on the phone?",
    ],
    captureIntro: "The moment you knew it was time tends to stay with you. A quiet space to note what made it feel like time, in your own words.",
    trimester: [3],
    relatedSlugs: ["signs-of-labour", "stages-of-labour", "third-trimester-complete-guide"],
    journey: ["pregnancy"],
    topics: ["body", "labour"],
    reviewedBy: "Jenny Joines",
    lastUpdated: "April 2026",
    keyTakeaways: [
      "Call when contractions are strong, regular, and lasting around a minute — or sooner if your unit has given different advice",
      "Always call when your waters break, even if contractions haven't started",
      "Always call for bleeding beyond a light show, or for any change in your baby's movements",
      "Call earlier if this is not your first baby — labour often moves more quickly",
      "Trust your instinct that something is wrong, or that it's time — your maternity unit takes that seriously",
    ],
    sources: [
      "NHS — Signs that labour has begun",
      "NICE — Intrapartum care for healthy women and babies",
      "Royal College of Midwives — Care in labour",
      "Tommy's — When to go to hospital in labour",
    ],
    faq: [
      { question: "What will my maternity unit ask me when I ring?", answer: "Usually how often contractions are coming, how long they're lasting, how strong they feel (often gauged by whether you can talk through them), whether your waters have broken, whether you have any bleeding, and whether your baby's movements feel normal. They may also ask about your previous births and your pregnancy. Their questions are how they decide what to advise — they're not a test." },
      { question: "Should I go in earlier if this isn't my first baby?", answer: "Often, yes. Second and later labours can move more quickly, sometimes much more quickly. Many maternity units advise calling earlier and setting off sooner if you've given birth before. Your midwife will usually have talked this through with you in late pregnancy — if not, it's worth asking." },
      { question: "What if I think I'm in labour but I'm not sure?", answer: "Ring anyway. Maternity units expect calls from people who aren't sure. They'll ask a few questions and either reassure you and advise you to stay home, ask you to come in for a check, or invite you to come in to stay. None of those outcomes is a failure — they're all part of the care." },
      { question: "When are bleeding or reduced movements an emergency?", answer: "Any bleeding that's more than a small, mucus-streaked show should be called in straight away. Any change or reduction in your baby's movements should be called in straight away — day or night, in or out of labour. Your unit will tell you what to do; usually it means coming in promptly for a check." },
      { question: "What if I've been told I should be sent home but I don't feel safe leaving?", answer: "Tell your midwife. Decisions about going home in early labour are made with you, not at you. If something doesn't feel right, or you're worried about how quickly things might progress, say so. Your instinct is part of what they'll factor in." },
    ],

    // ── Deep template fields ──
    topic: "body",
    standfirst:
      "Knowing when to call or set off can feel like one of the harder calls of late pregnancy. A calm, practical guide to the moment it's time.",
    editorialSections: [
      {
        id: "when-to-go-in-for-labour",
        heading: "When to go in for labour",
        lead: "There's no single right moment to ring or to set off. The clearer rules sit alongside instinct — and both matter.",
        paragraphs: [
          "Maternity units have general guidance for when they want to hear from you, and your midwife may have given you specific advice based on your pregnancy. Together, they form a starting point. Your own sense of what's happening matters as much as the rules.",
          "Calling early isn't a failure. It's part of how labour care works. Most units would much rather hear from you twice than not at all.",
        ],
      },
      {
        id: "when-to-call-first",
        heading: "When to call first",
        lead: "A phone call is usually the first step before going in.",
        paragraphs: [
          "Save your maternity unit's number where it's easy to find. Most units have a 24-hour line specifically for people in late pregnancy and labour. They'll ask a series of questions to help work out where you are in labour and what to do next.",
          "They may advise you to stay home a little longer, to come in for a check, or to come in to stay. Any of those is a normal outcome, and the right one for the moment.",
        ],
      },
      {
        id: "contractions-and-timing",
        heading: "Contractions and timing",
        lead: "A pattern is more telling than a single contraction.",
        paragraphs: [
          "The most common signal that it's time to call is contractions that are strong, regular, lasting around a minute, and coming roughly every three to four minutes (often described as 3 in 10). Many people find they can no longer talk through them.",
          "Time them across an hour, not a single ten-minute window. A pattern that holds — or grows — over an hour gives a much clearer picture than one short stretch.",
        ],
      },
      {
        id: "waters-bleeding-and-movements",
        heading: "Waters, bleeding, and movements",
        lead: "Three signs that warrant a call straight away, regardless of contractions.",
        paragraphs: [
          "Always call when your waters break, even if contractions haven't started. Your unit will guide you on what happens next — usually a window at home before coming in, or a check sooner depending on the colour of the fluid and other factors.",
          "Always call for any bleeding that's more than a light, mucus-streaked show. And always call for any change or reduction in your baby's movements, day or night, in or out of labour.",
        ],
      },
      {
        id: "if-not-your-first-baby",
        heading: "If this is not your first baby",
        lead: "Second and later labours can move more quickly. The advice usually shifts a little earlier.",
        paragraphs: [
          "If you've given birth before, your maternity unit may advise you to call sooner and set off earlier than you would have first time. Some second labours are dramatically quicker; others aren't. Most units would prefer a slightly early arrival to a roadside birth.",
          "If your midwife hasn't already talked through what to do this time around, it's worth asking. The plan often looks a little different.",
        ],
      },
      {
        id: "what-your-unit-may-ask",
        heading: "What your maternity unit may ask you",
        lead: "Their questions are how they decide what to advise — not a test you can fail.",
        paragraphs: [
          "Expect to be asked how often contractions are coming, how long they're lasting, how strong they feel, whether your waters have broken (and if so, the colour of the fluid), whether you have any bleeding, and how your baby's movements have been. They may also ask about your previous births and how your pregnancy has been.",
          "If your birth partner is with you, it can help to have them on the phone or beside you while you talk — sometimes another set of ears, or someone to time a contraction live, makes it easier to give a clear picture.",
        ],
      },
      {
        id: "signs-not-to-wait-with",
        heading: "Signs not to wait with",
        lead: "A short list of things that mean call now — not in an hour, not after another contraction.",
        paragraphs: [
          "Heavy bleeding, severe pain that doesn't ease between contractions, a sudden change in your baby's movements, waters that look green or brown rather than clear, or anything that feels seriously wrong are all reasons to call straight away rather than wait.",
          "If you can't reach your maternity unit, call the next number they've given you — or, if it feels urgent, 999. Trusting that judgement is part of the care.",
        ],
        callout: {
          tone: "gentle-warning",
          text: "If something feels seriously wrong, call straight away — even if it doesn't fit any of the rules. Your instinct is information your unit takes seriously.",
        },
      },
      {
        id: "trusting-your-instincts",
        heading: "Trusting your instincts when something feels different",
        lead: "Instinct doesn't replace the guidance, but it sits next to it.",
        paragraphs: [
          "A lot of people, looking back, knew the moment it was time before any of the textbook signs were clearly there. An inward turn, a pull to be where you've planned to give birth, an inability to focus on anything else — all of these are signals worth listening to.",
          "If your instinct says it's time, ring. The right answer is usually the one that lets you feel safe.",
        ],
      },
    ],
  },

  // ─── ANXIETY IN PREGNANCY ─────────────────────────────────────────────────
  {
    slug: "anxiety-in-pregnancy",
    title: "Anxiety in pregnancy: what's normal, what's not, and what helps",
    metaDescription: "What anxiety in pregnancy can feel like, the worries that come up most, where the line between worry and overwhelm tends to sit, and the kinds of support that genuinely help.",
    quickAnswer:
      "Anxiety is one of the most common emotional experiences in pregnancy. Worry about the baby, the birth, your body, or the future is normal — and often comes in waves. It usually becomes a reason to ask for more support when it stops easing between waves, when it gets in the way of sleep or daily life, or when it brings physical symptoms like a racing heart, breathlessness, or constant tension. Help can come from your midwife, your GP, perinatal mental health services, or talking therapies — and asking earlier is almost always easier than asking later.",
    howThisFeels: [
      "A worry that keeps circling, even after you've talked it through",
      "Lying awake reading symptoms instead of sleeping",
      "Feeling tense in your body without quite knowing why",
      "Wondering whether what you're feeling is normal or a sign something's wrong",
    ],
    whatHappening: {
      commonCauses: [
        { heading: "Hormonal shifts", body: "Pregnancy hormones affect mood, sleep, and emotional sensitivity. Anxiety often rides alongside these changes, especially in the first and third trimesters." },
        { heading: "Uncertainty", body: "Pregnancy holds a lot of unknowns — about the baby, your body, the birth, your life afterwards. The mind tends to fill uncertainty with worry." },
        { heading: "Tiredness and physical strain", body: "Poor sleep, nausea, and discomfort all reduce emotional resilience. Worry often feels louder when the body is depleted." },
      ],
      lessCauses: [
        { heading: "Antenatal anxiety as a clinical experience", body: "When worry is persistent, hard to settle, and starts interfering with daily life, it may have crossed from ordinary anxiety into antenatal anxiety — which is treatable and worth naming." },
        { heading: "Previous loss or trauma", body: "If you've had a previous loss, a difficult birth, or a history of anxiety or trauma, pregnancy can reactivate those experiences. This deserves specific support, not general reassurance." },
      ],
      whyItVaries: "How anxiety lands in pregnancy depends on your history, your support, your physical health, and the season of pregnancy you're in. Two pregnancies in the same person can feel very different.",
    },
    timing: {
      whenStarts: "Anxiety often surfaces in the first trimester, when so much is invisible and uncertain.",
      whenPeaks: "It can peak in the early weeks and again in late pregnancy as birth approaches.",
      whenEases: "Many people find the second trimester quieter, though anxiety can return at any point.",
    },
    whatItFeelsLike: [
      "A loop of what-ifs that's hard to step out of",
      "Catastrophic thoughts that feel real even when you know they're unlikely",
      "Physical tension — tight chest, jaw, shoulders, shallow breathing",
      "Reassurance that helps for an hour, then wears off",
    ],
    whatThisMeans:
      "Anxiety in pregnancy is common, treatable, and not a sign that something is wrong with you. The point at which it's worth more support is usually the point at which it stops easing — not the point at which it first appears.",
    normal: [
      "Worrying about the baby, especially after a scan or appointment",
      "Anxious phases in early pregnancy and again near birth",
      "Feeling more sensitive to news, stories, or other people's experiences",
      "Needing more reassurance than usual from people around you",
    ],
    seekSupport: [
      "Worry that doesn't ease between waves, day after day",
      "Anxiety that's getting in the way of sleep, eating, work, or relationships",
      "Physical anxiety symptoms — racing heart, breathlessness, panic — that are happening regularly",
      "Intrusive thoughts you can't put down",
      "A sense that you're not coping",
    ],
    disclaimer: "This article is general guidance and not a substitute for medical or mental health care. If you're struggling, please speak to your midwife, GP, or a perinatal mental health service.",
    whatYouCanDo: [
      { action: "Tell your midwife or GP early", reason: "Naming anxiety opens the door to support — including talking therapies and, where helpful, medication that's safe in pregnancy." },
      { action: "Notice the loop without trying to win the argument", reason: "Worry rarely loses by being argued with. Acknowledging the loop is often more useful than trying to disprove it." },
      { action: "Slow your breath when you notice tension", reason: "Lengthening your out-breath quiets the body's stress response. It doesn't fix anxiety, but it gives you a foothold." },
      { action: "Limit reading symptoms or stories late at night", reason: "Anxiety feeds on tiredness and search results. A boundary around when you read is often more helpful than what you read." },
      { action: "Tell one safe person what's actually going on", reason: "Saying it out loud — to a partner, friend, or midwife — almost always shrinks it a little." },
    ],
    whatHappensNext: "Most people who ask for support in pregnancy find that things ease — not always quickly, but reliably. Perinatal mental health teams exist precisely for this season, and your midwife can refer you in.",
    relatedStage: {
      intro: "Anxiety sits inside the wider emotional picture of pregnancy:",
      links: [
        { label: "Your feelings in pregnancy", href: "/pregnancy/feelings", context: "The wider topic this article belongs to." },
        { label: "Emotional wellbeing in pregnancy", href: "/articles/emotional-wellbeing-pregnancy", context: "The broader orientation, including depression as well as anxiety." },
        { label: "When the joy doesn't arrive yet", href: "/articles/when-the-joy-doesnt-arrive-yet", context: "When the feelings you expected aren't quite there." },
      ],
    },
    aiPrompts: [
      "Is it normal to feel anxious all the time in pregnancy?",
      "How do I know if my pregnancy anxiety needs support?",
      "What therapies are safe for anxiety in pregnancy?",
    ],
    captureIntro: "Anxiety often sits in places you don't quite say aloud. A quiet space to name what's been circling, in your own words.",
    trimester: [1, 2, 3],
    relatedSlugs: ["emotional-wellbeing-pregnancy", "when-the-joy-doesnt-arrive-yet", "the-first-trimester-emotionally"],
    journey: ["pregnancy", "support"],
    topics: ["feelings", "emotional-wellbeing"],
    reviewedBy: "Jenny Joines",
    lastUpdated: "April 2026",
    keyTakeaways: [
      "Worry in pregnancy is extremely common and not a sign something is wrong with you",
      "Anxiety usually warrants more support when it stops easing, not when it first appears",
      "Sleep, body, and relationships are often the clearest signals that worry has tipped into overwhelm",
      "Treatment in pregnancy — talking therapies and, where helpful, medication — is safe and effective",
      "Asking your midwife or GP earlier is almost always easier than asking later",
    ],
    sources: [
      "NHS — Mental health in pregnancy",
      "NICE — Antenatal and postnatal mental health",
      "Mind — Perinatal anxiety",
      "Tommy's — Anxiety in pregnancy",
      "Maternal Mental Health Alliance",
    ],
    faq: [
      { question: "Is anxiety in pregnancy harmful to my baby?", answer: "Ordinary worry is part of pregnancy and isn't harmful. Persistent, untreated anxiety is worth supporting — not because of guilt, but because you deserve the support, and because looking after your mental health in pregnancy is one of the best things you can do for both of you." },
      { question: "Can I take anxiety medication in pregnancy?", answer: "Some medications are considered safe in pregnancy, and a perinatal mental health team or your GP can help you weigh the options. The right answer depends on your history, your symptoms, and what's likely to help most. Stopping medication suddenly without advice isn't usually recommended." },
      { question: "When is worry no longer normal?", answer: "It's less about a single threshold and more about whether worry is easing between waves. If it doesn't, if it's affecting sleep, eating, or daily life, or if you're having physical anxiety symptoms regularly, it's worth a conversation — sooner rather than later." },
      { question: "Will I get anxiety again in another pregnancy?", answer: "Possibly, but not inevitably. People who've experienced antenatal anxiety often have a clearer sense of what helps and a faster path to support second time around. Telling your midwife at booking helps them put that support in place earlier." },
    ],

    // ── Deep template fields ──
    topic: "feelings",
    standfirst:
      "A grounded look at worry in pregnancy — what tends to be normal, where the line into overwhelm sits, and the kinds of support that genuinely help.",
    editorialSections: [
      {
        id: "anxiety-in-pregnancy",
        heading: "Anxiety in pregnancy",
        lead: "Worry in pregnancy is one of the most common emotional experiences there is — and one of the least talked about honestly.",
        paragraphs: [
          "Pregnancy holds a lot of unknowns. The body is changing, the future is reshaping, and almost everything that matters is, for a long time, invisible. The mind tends to fill that uncertainty with worry — and for most people, some level of anxiety is part of the season.",
          "What follows is a calm picture of what anxiety in pregnancy can look like, where it tends to sit within normal, and the points at which more support is usually worth asking for.",
        ],
      },
      {
        id: "what-anxiety-can-feel-like",
        heading: "What anxiety can feel like",
        lead: "Pregnancy anxiety has a recognisable texture, even when the worries themselves vary.",
        paragraphs: [
          "It often shows up as a loop — a thought that keeps circling, even after you've talked it through. It can sit in the body as tension in the chest, jaw, or shoulders, a held breath, or a sleep that won't quite come.",
          "Some people experience anxiety as a steady hum in the background. Others have it in waves — quiet days, then a few harder days, often without an obvious trigger. Both are common.",
        ],
      },
      {
        id: "what-people-often-worry-about",
        heading: "What people often worry about",
        lead: "Some worries are almost universal in pregnancy. Naming them often takes some of their weight.",
        paragraphs: [
          "The most common worries tend to gather around the baby (movements, growth, scans), the body (whether something feels right), the birth (how it will go, what it will be like), and the future (becoming a parent, finances, relationships, work).",
          "If you've had a previous loss, fertility difficulties, a traumatic birth, or anxiety before pregnancy, those experiences usually shape what your worries look like now. That isn't a failing — it's information about what kind of support might help.",
        ],
      },
      {
        id: "when-worry-starts-to-take-over",
        heading: "When worry starts to take over",
        lead: "The line between ordinary worry and something heavier is rarely about content — it's about pattern.",
        paragraphs: [
          "It's often less about which thoughts you're having and more about whether they ease. Ordinary worry rises, peaks, and settles. Anxiety that's worth more support tends to stop settling — the loop doesn't close, the reassurance wears off in an hour, the thoughts come back.",
          "Other signals: sleep getting harder over time, eating becoming difficult, withdrawing from people, regular physical anxiety symptoms (racing heart, breathlessness, panic), or a sense that you're spending more time managing the worry than living the day.",
        ],
        callout: {
          tone: "info",
          text: "If you're not sure whether what you're feeling is enough to mention, it's almost always enough to mention. A conversation rarely makes things worse and often shifts them.",
        },
      },
      {
        id: "what-can-help-in-the-moment",
        heading: "What can help in the moment",
        lead: "Small, repeatable practices won't fix anxiety, but they give you a foothold when a wave arrives.",
        paragraphs: [
          "Lengthening your out-breath quiets the body's stress response — even a slow count of four in, six out, repeated for a minute, can take the edge off. Putting your feet on the floor and naming five things you can see can pull you out of the loop.",
          "Saying the worry out loud to one safe person — a partner, a friend, your midwife — almost always shrinks it a little. So does writing it down somewhere it doesn't have to live in your head all night.",
        ],
      },
      {
        id: "when-extra-support-is-worth-seeking",
        heading: "When extra support is worth seeking",
        lead: "Asking earlier is almost always easier than asking later.",
        paragraphs: [
          "If anxiety is persistent, getting in the way of sleep or daily life, bringing physical symptoms regularly, or making you feel like you're not coping, that's a clear reason to talk to your midwife or GP.",
          "Naming it doesn't commit you to anything — it just opens the door. The earlier the door is open, the wider the range of support available.",
        ],
      },
      {
        id: "what-support-may-look-like",
        heading: "What support may look like",
        lead: "Support in pregnancy is more than 'see how you go.' There's a real system behind it.",
        paragraphs: [
          "Your midwife or GP can refer you to perinatal mental health services where they're available, or to talking therapies through services like NHS Talking Therapies. These services exist specifically for the perinatal season and understand it.",
          "Where helpful, some medications are considered safe in pregnancy and can be discussed with a specialist team. Treatment is decided with you, not at you, and you don't have to weigh it on your own.",
        ],
      },
    ],
  },

  // ─── PREGNANCY AFTER LOSS ─────────────────────────────────────────────────
  {
    slug: "pregnancy-after-loss",
    title: "Pregnancy after loss: what it can feel like, and what can help",
    metaDescription: "Being pregnant after a previous loss is its own emotional experience. What it can feel like, why ordinary reassurance often doesn't land, and the kinds of support that actually help.",
    quickAnswer:
      "Pregnancy after loss is its own experience — not the same as a first pregnancy, and not something to be hurried through. It often holds grief and hope at the same time, and ordinary reassurance can land oddly, because the worst has already happened once. What helps tends to be specific, not general: care that knows your history, people who don't try to fix it, milestones taken one at a time, and permission to feel whatever this pregnancy actually feels like — including the days that don't feel like joy.",
    howThisFeels: [
      "Holding your breath at every scan, every appointment, every quiet day",
      "Not wanting to bond yet, and feeling guilty about that",
      "Hearing 'this one will be fine' and not knowing what to do with it",
      "Living from milestone to milestone instead of week to week",
    ],
    whatHappening: {
      commonCauses: [
        { heading: "A different emotional landscape", body: "After loss, hope and fear often live in the same breath. The body remembers, even when the mind tries to move on." },
        { heading: "Reassurance that doesn't land", body: "General reassurance assumes the worst hasn't happened. When it has, the maths feels different — and people around you may struggle to know what to say." },
        { heading: "Vigilance about symptoms and movements", body: "Watching closely for signs is usually a form of self-protection, not anxiety run wild. It's how some people stay in the pregnancy at all." },
      ],
      lessCauses: [
        { heading: "Layered grief", body: "Grief from a previous loss can resurface around milestones, anniversaries, scans, or the dates the previous pregnancy ended. This isn't going backwards — it's grief moving with you." },
        { heading: "Birth trauma in the background", body: "If a previous loss involved a traumatic experience of care, this pregnancy may carry that weight too. Naming it changes what kind of support is offered." },
      ],
      whyItVaries: "Every loss is different, and so is every pregnancy after loss. How it feels depends on the kind of loss, how recent it was, the support around you, and how this pregnancy is unfolding.",
    },
    timing: {
      whenStarts: "Many people describe the hardest weeks as the ones leading up to — and just past — the point at which the previous loss happened.",
      whenPeaks: "Scans, appointments, anniversaries, and the gestation of the previous loss often bring the strongest waves.",
      whenEases: "Some people find easing comes in stages — after a particular scan, after passing the previous loss point, after movements become reliable. For others, it doesn't fully ease until the baby is here.",
    },
    whatItFeelsLike: [
      "Numbness as protection, not absence of love",
      "Reluctance to plan, buy, or announce",
      "Tearfulness around dates and reminders",
      "A guarded kind of hope",
    ],
    whatThisMeans:
      "Pregnancy after loss isn't a failure of joy or a problem to be talked out of. It's a different kind of pregnancy that needs a different kind of care.",
    normal: [
      "Not bonding in the way you expected to",
      "Holding your breath until each scan or milestone",
      "Not wanting to plan, announce, or prepare yet",
      "Tearfulness or grief around anniversaries and dates",
      "A long stretch before this pregnancy feels real or safe",
    ],
    seekSupport: [
      "Persistent low mood that doesn't lift between milestones",
      "Anxiety that's making it hard to sleep, eat, or function",
      "Flashbacks, intrusive memories, or nightmares about the previous loss",
      "A sense of detachment from yourself or the pregnancy that's distressing",
      "Any thoughts of harming yourself",
    ],
    disclaimer: "This is general guidance and not a substitute for specialist support. Pregnancy after loss often needs care that's tailored to you — please speak to your midwife, GP, or a perinatal mental health service.",
    whatYouCanDo: [
      { action: "Tell your midwife about your previous loss at booking", reason: "It changes the kind of care you're offered — including, in many places, more frequent scans and continuity of midwife." },
      { action: "Ask for a named midwife or continuity team where it exists", reason: "Telling your story repeatedly can be exhausting. Continuity reduces that and tends to make support feel safer." },
      { action: "Take the pregnancy a milestone at a time", reason: "Trying to feel safe about the whole pregnancy at once can be impossible. Smaller stretches are often more bearable." },
      { action: "Find one or two people who don't try to fix it", reason: "Not everyone needs to know. The right support is often a small circle of people who can hold the weight without minimising it." },
      { action: "Consider specialist support — counselling, peer groups, charities", reason: "Organisations like Tommy's, Sands, and the Miscarriage Association exist for exactly this. Specialist help reaches places general support can't." },
    ],
    whatHappensNext: "Many people find that pregnancy after loss continues to be its own experience all the way through — and often into early parenthood. Support that knows your history can carry forward.",
    relatedStage: {
      intro: "Pregnancy after loss sits inside the wider emotional picture of pregnancy:",
      links: [
        { label: "Your feelings in pregnancy", href: "/pregnancy/feelings", context: "The wider topic this article belongs to." },
        { label: "Emotional wellbeing in pregnancy", href: "/articles/emotional-wellbeing-pregnancy", context: "The broader orientation around mental health in pregnancy." },
        { label: "Anxiety in pregnancy", href: "/articles/anxiety-in-pregnancy", context: "On worry and when to ask for more support." },
      ],
    },
    aiPrompts: [
      "How do I cope with pregnancy after a miscarriage?",
      "What support exists for pregnancy after loss?",
      "Why don't I feel excited in this pregnancy?",
    ],
    captureIntro: "Pregnancy after loss often holds things you can't quite say to anyone else. A quiet space for the truth of where you are, in your own words.",
    trimester: [1, 2, 3],
    relatedSlugs: ["emotional-wellbeing-pregnancy", "anxiety-in-pregnancy", "when-the-joy-doesnt-arrive-yet"],
    journey: ["pregnancy", "support"],
    topics: ["feelings", "emotional-wellbeing"],
    reviewedBy: "Jenny Joines",
    lastUpdated: "April 2026",
    keyTakeaways: [
      "Pregnancy after loss is its own experience — not the same as a first pregnancy",
      "Hope and fear often coexist, and reassurance that doesn't acknowledge that can land oddly",
      "Telling your midwife at booking changes the kind of care you're offered",
      "Living milestone by milestone is often more bearable than trying to feel safe about the whole pregnancy",
      "Specialist support exists — through perinatal mental health services and charities like Tommy's, Sands, and the Miscarriage Association",
    ],
    sources: [
      "NHS — Pregnancy after loss",
      "Tommy's — Pregnancy after loss",
      "Sands — Pregnancy after the death of a baby",
      "Miscarriage Association — Pregnancy after loss",
      "NICE — Antenatal and postnatal mental health",
    ],
    faq: [
      { question: "Why don't I feel excited about this pregnancy?", answer: "After loss, many people describe a guarded, careful kind of feeling rather than excitement. That's almost always self-protection, not absence of love. Excitement may come — sometimes only after the baby is here — and that timing isn't a measure of how much you'll love them." },
      { question: "Should I tell my midwife about my previous loss?", answer: "Yes, ideally at the booking appointment. It usually changes the kind of care you're offered — including, in many places, additional scans, more frequent contact, and continuity of carer. It's information that helps them support you, not something to manage alone." },
      { question: "Will extra scans help me feel safer?", answer: "For some people they help significantly; for others, they bring relief that fades quickly. Both are common. Many specialist clinics for pregnancy after loss offer reassurance scans alongside other support, recognising that the relief alone isn't usually enough on its own." },
      { question: "Is it normal not to want to plan or announce?", answer: "Yes. Many people delay buying things, decorating, or telling others — sometimes until very late, sometimes until after the baby arrives. There's no right time. Doing what feels bearable, on your timescale, isn't superstition — it's care for yourself." },
      { question: "Where can I find specialist support?", answer: "Tommy's, Sands, and the Miscarriage Association all run support specifically for pregnancy after loss, including helplines, online communities, and peer support. Your midwife or GP can also refer you to perinatal mental health services where they're available in your area." },
    ],

    // ── Deep template fields ──
    topic: "feelings",
    standfirst:
      "Pregnancy after loss is its own experience. A careful, humane look at what it can feel like, why ordinary reassurance often doesn't land, and where real support tends to come from.",
    editorialSections: [
      {
        id: "pregnancy-after-loss",
        heading: "Pregnancy after loss",
        lead: "This pregnancy is happening alongside a loss that hasn't gone anywhere — even if the calendar has moved on.",
        paragraphs: [
          "Being pregnant after a miscarriage, stillbirth, neonatal death, or termination for medical reasons is a particular kind of pregnancy. It carries hope and grief in the same breath, and most of the things people are usually told about pregnancy don't quite fit it.",
          "What follows isn't a guide for fixing how this feels. It's a calm acknowledgement of what it tends to be like, and a steady look at the kinds of support that actually help.",
        ],
      },
      {
        id: "what-it-can-feel-like",
        heading: "What pregnancy after loss can feel like",
        lead: "Recognisable patterns come up across many people's experiences. Naming them is often a relief.",
        paragraphs: [
          "It often feels like holding your breath — at every scan, every appointment, every quiet day. Many people describe a kind of guarded, careful relationship with the pregnancy: not wanting to bond yet, not wanting to plan, not wanting to announce.",
          "There can be numbness, tearfulness, vigilance about symptoms or movements, and grief that resurfaces around the dates and milestones of the previous loss. None of these are failures of love. Most are forms of self-protection.",
        ],
      },
      {
        id: "why-reassurance-often-doesnt-land",
        heading: "Why reassurance often doesn't land",
        lead: "When the worst has happened once, the maths around 'most pregnancies are fine' feels different.",
        paragraphs: [
          "Phrases like 'try not to worry' or 'this one will be fine' usually come from love, but they assume a starting point that no longer applies. Reassurance can land flat — or even sting — because it often skips past the fact that something real has already happened.",
          "What tends to help more is acknowledgement: people who can sit with where you are, who don't try to talk you out of how you feel, and who can hold both the loss and this pregnancy at the same time without flattening either.",
        ],
        callout: {
          tone: "reassurance",
          text: "Whatever you're feeling about this pregnancy is allowed — including the parts you don't quite say out loud. None of it is a sign you'll love this baby less.",
        },
      },
      {
        id: "what-can-help",
        heading: "What can help",
        lead: "Help tends to be specific and small rather than sweeping.",
        paragraphs: [
          "Taking the pregnancy a milestone at a time — the next scan, the next appointment, the next week — is often more bearable than trying to feel safe about the whole of it. Permission to do that, rather than push through, matters.",
          "A small circle of people who can hold the weight without minimising it tends to do more than a wider one that doesn't quite know how. So does honesty with your midwife about how you're feeling, even if the words come slowly.",
        ],
      },
      {
        id: "how-support-may-need-to-be-different",
        heading: "How support may need to be different",
        lead: "Pregnancy after loss often needs care that knows your history.",
        paragraphs: [
          "Telling your midwife about a previous loss at booking changes what's available. In many places it means continuity of carer, additional scans, and a more attentive plan. If continuity isn't offered automatically, it's worth asking.",
          "Specialist services and charities — Tommy's, Sands, the Miscarriage Association — exist precisely for this experience. They offer counselling, peer support, and helplines, and they understand that pregnancy after loss isn't simply 'pregnancy with extra worry.'",
        ],
      },
      {
        id: "milestones-anniversaries-and-the-dates-that-matter",
        heading: "Milestones, anniversaries, and the dates that matter",
        lead: "Some weeks will be harder than others, and the harder ones often have a pattern.",
        paragraphs: [
          "Approaching — and passing — the gestation of the previous loss is often a particularly heavy stretch. Anniversaries, due dates from the previous pregnancy, and certain scans can all bring strong waves.",
          "Some people find it helps to mark these dates gently — a walk, a candle, a quiet hour — rather than try to ignore them. Others would rather move through them quietly. There isn't a right way; there's only what helps you.",
        ],
      },
      {
        id: "when-to-ask-for-more-care",
        heading: "When to ask for more care",
        lead: "Some signs are clearer reasons to reach out, and earlier is almost always easier.",
        paragraphs: [
          "Persistent low mood that doesn't lift between milestones, anxiety that's making it hard to sleep or eat, flashbacks or intrusive memories of the previous loss, or a sense of detachment that's distressing are all reasons to talk to your midwife or GP.",
          "Any thoughts of harming yourself need to be talked about straight away. Specialist perinatal mental health teams exist for exactly these kinds of conversations, and your midwife or GP can refer you in.",
        ],
      },
    ],
  },

  // ─── THE FIRST TRIMESTER EMOTIONALLY ──────────────────────────────────────
  {
    slug: "the-first-trimester-emotionally",
    title: "The first trimester emotionally: the strange, in-between weeks",
    metaDescription: "What the first trimester can feel like emotionally — the mix of hope, fear, unreality, and waiting — and why so many people feel ambivalent rather than excited.",
    quickAnswer:
      "The first trimester is often emotionally stranger than people warn you about. It's a season of hope, fear, unreality, waiting, and physical symptoms that can flatten everything else. Many people don't feel joyful, bonded, or even quite real about the pregnancy yet — and that doesn't mean anything is wrong. The first trimester is a long, mostly invisible stretch where almost nothing shows on the outside and everything is shifting on the inside.",
    howThisFeels: [
      "Knowing you're pregnant but it not feeling real",
      "Holding the news and not knowing who to tell",
      "Feeling sick and exhausted and emotional all at once",
      "Counting down to a scan that feels very far away",
    ],
    whatHappening: {
      commonCauses: [
        { heading: "Hormonal change", body: "Pregnancy hormones rise sharply in the first trimester, directly affecting mood, sleep, and emotional sensitivity." },
        { heading: "Physical symptoms", body: "Nausea, exhaustion, and disrupted sleep all reduce emotional resilience. It's hard to feel anything calmly when the body is this loud." },
        { heading: "Living in private", body: "Most people don't tell others widely in the first trimester. Holding something this big without much external company is its own emotional weight." },
      ],
      lessCauses: [
        { heading: "Anxiety from a previous loss", body: "If you've had a previous loss, the first trimester often carries grief and vigilance alongside the new pregnancy." },
        { heading: "Ambivalence about pregnancy", body: "Mixed feelings — including not feeling ready, or wondering if you really wanted this — are common and don't predict how you'll feel later." },
      ],
      whyItVaries: "How the first trimester feels emotionally depends on hormones, history, support, physical symptoms, and how planned or expected the pregnancy was. Two pregnancies in the same person can feel very different.",
    },
    timing: {
      whenStarts: "Emotional shifts often begin within the first few weeks, sometimes before symptoms.",
      whenPeaks: "Many people describe weeks 6 to 10 as the heaviest — the height of nausea, fatigue, and the longest stretch before the first scan.",
      whenEases: "For many, the second trimester brings a noticeable lift — though not for everyone, and not always on schedule.",
    },
    whatItFeelsLike: [
      "Unreality, like nothing has changed and everything has",
      "Tearfulness without an obvious trigger",
      "Wanting it and being scared of it in the same hour",
      "Feeling distant from the pregnancy until something makes it feel real",
    ],
    whatThisMeans:
      "The first trimester is an unusual emotional season. Feeling strange, ambivalent, or quietly overwhelmed is part of the experience for most people — not a sign that anything is wrong with you or your bond with this baby.",
    normal: [
      "Not feeling joyful or excited yet",
      "Feeling like the pregnancy isn't real until the first scan",
      "Crying at small things",
      "Wanting to hide and wanting to tell everyone in the same day",
      "Feeling distant or numb at times",
    ],
    seekSupport: [
      "Persistent low mood that lasts more than two weeks",
      "Anxiety that's getting in the way of sleep, eating, or daily life",
      "Severe nausea or vomiting affecting your ability to keep food and fluids down (this may be hyperemesis gravidarum)",
      "A sense of dread or hopelessness that doesn't lift",
      "Any thoughts of harming yourself",
    ],
    disclaimer: "This article is general guidance about the emotional experience of the first trimester. If you're struggling, please speak to your midwife or GP — emotional support in pregnancy is real and accessible.",
    whatYouCanDo: [
      { action: "Lower the bar for what counts as a good day", reason: "First-trimester capacity is usually smaller than usual. Survival isn't underachievement." },
      { action: "Tell at least one person who can hold it gently", reason: "Carrying this in private is heavy. One safe person changes what you can bear." },
      { action: "Don't expect bonding yet", reason: "Bonding often arrives much later — sometimes not until movements, sometimes not until birth. That isn't a failure of love." },
      { action: "Notice what helps and protect it", reason: "Sleep, food you can keep down, low-stakes evenings, fresh air — small things matter more than usual right now." },
      { action: "Tell your midwife how you're actually feeling at booking", reason: "Mental health support in pregnancy starts at booking. Honesty there opens the door earlier." },
    ],
    whatHappensNext: "Many people find that something shifts in the second trimester — symptoms ease, scans come, the pregnancy starts to feel more real. For some it shifts later. Either way, the first trimester isn't the whole picture.",
    relatedStage: {
      intro: "The first trimester emotionally sits alongside the wider feelings topic:",
      links: [
        { label: "Your feelings in pregnancy", href: "/pregnancy/feelings", context: "The wider topic this article belongs to." },
        { label: "Emotional wellbeing in pregnancy", href: "/articles/emotional-wellbeing-pregnancy", context: "The broader orientation around mental health in pregnancy." },
        { label: "When the joy doesn't arrive yet", href: "/articles/when-the-joy-doesnt-arrive-yet", context: "When the feelings you expected aren't quite there." },
      ],
    },
    aiPrompts: [
      "Why doesn't the first trimester feel real?",
      "Is it normal not to feel excited in early pregnancy?",
      "When does the first trimester start to ease emotionally?",
    ],
    captureIntro: "The first trimester often holds more than it shows. A quiet space for what these strange, in-between weeks have actually felt like — in your own words.",
    trimester: [1],
    relatedSlugs: ["emotional-wellbeing-pregnancy", "when-the-joy-doesnt-arrive-yet", "anxiety-in-pregnancy"],
    journey: ["pregnancy", "support"],
    topics: ["feelings", "emotional-wellbeing"],
    reviewedBy: "Jenny Joines",
    lastUpdated: "April 2026",
    keyTakeaways: [
      "The first trimester is emotionally unusual for most people, not just you",
      "Not feeling joyful, bonded, or even real about the pregnancy yet is common",
      "Hormones, symptoms, and living in private all add to the weight",
      "Lowering the bar and telling one safe person are usually the most useful first steps",
      "Persistent low mood, severe anxiety, or any thoughts of harm are reasons to talk to your midwife or GP",
    ],
    sources: [
      "NHS — Mental health in pregnancy",
      "NHS — Your first antenatal appointment",
      "Tommy's — Mental wellbeing in pregnancy",
      "Mind — Perinatal mental health",
      "NICE — Antenatal and postnatal mental health",
    ],
    faq: [
      { question: "Why doesn't the first trimester feel real?", answer: "For most of the first trimester, almost nothing shows on the outside. There's no bump, often no movements, and most people aren't telling anyone widely. The mind doesn't have much external evidence to anchor onto, so it's very common for the pregnancy to feel abstract — sometimes right up until the first scan or beyond." },
      { question: "Is it normal not to feel excited in the first trimester?", answer: "Extremely. Many people don't feel excited, bonded, or even particularly happy in the first trimester — and that doesn't predict how you'll feel later. Hormones, exhaustion, nausea, and the long wait before things feel real all play a part." },
      { question: "When does it start to ease?", answer: "For many people, the second trimester brings a noticeable lift — energy returns, nausea eases for most, and the first scan often makes things feel more real. That's an average, not a rule. For some it shifts later, and for some the lift isn't dramatic. Both are common." },
      { question: "What if I'm really struggling?", answer: "Speak to your midwife or GP — even if you're not sure whether what you're feeling is 'enough' to mention. Mental health support in pregnancy starts as soon as you ask for it, and the earlier the door is open, the more options you have." },
    ],

    // ── Deep template fields ──
    topic: "feelings",
    standfirst:
      "The emotional texture of the earliest weeks — quieter than people warn you about, and stranger than most week-by-week summaries let on.",
    editorialSections: [
      {
        id: "the-first-trimester-emotionally",
        heading: "The first trimester emotionally",
        lead: "The first trimester is an unusual emotional season — and one most pregnancy advice skips past in a sentence.",
        paragraphs: [
          "On the outside, very little is happening. On the inside, almost everything is shifting. Hormones rise sharply, the body is loud, the future is reshaping, and most people are holding all of it without telling many others yet.",
          "What follows is a calm look at what these weeks tend to feel like emotionally — and a reassurance that the strangeness, ambivalence, and unreality so many people describe is part of the experience, not a sign something is wrong.",
        ],
      },
      {
        id: "why-it-can-feel-strange",
        heading: "Why the first trimester can feel emotionally strange",
        lead: "There's a particular shape to these weeks that's worth naming.",
        paragraphs: [
          "It's a long stretch of mostly invisible change. There's no bump, often no movements, and usually no one outside a small circle who knows. The mind doesn't have much external evidence to anchor onto, so the pregnancy can feel abstract — even unreal — for weeks.",
          "Hormones rise faster in the first trimester than at almost any other point in pregnancy. They affect mood, sleep, and emotional sensitivity directly. Combine that with nausea, exhaustion, and the wait before the first scan, and a strange emotional weather is almost guaranteed.",
        ],
      },
      {
        id: "the-mix-of-feelings",
        heading: "The mix of hope, fear, unreality, and waiting",
        lead: "Most people experience all of these at different points — sometimes within the same hour.",
        paragraphs: [
          "Hope and fear often co-exist, especially around scans, milestones, and any change in symptoms. Unreality — the feeling that none of it is quite happening — is one of the most commonly described first-trimester experiences. So is the slow, strange weight of waiting for things to feel more solid.",
          "If you've had a previous loss, fertility difficulties, or anxiety before pregnancy, those experiences usually shape how this season lands. That isn't a failing — it's information about what kind of support might help.",
        ],
      },
      {
        id: "why-people-may-not-feel-joyful-yet",
        heading: "Why people may not feel joyful yet",
        lead: "Joy is one possible feeling. It isn't the required one.",
        paragraphs: [
          "Many people don't feel joyful in the first trimester — and almost no one tells them that's normal. Ambivalence, dread, numbness, exhaustion, even regret are all feelings that come up in this season for some people, including people who very much wanted this pregnancy.",
          "Bonding tends to arrive much later for most people — often with movements, sometimes not until birth, sometimes not for some weeks after. The absence of strong feelings now doesn't predict the strength of love later.",
        ],
        callout: {
          tone: "reassurance",
          text: "Not feeling excited or bonded in the first trimester is one of the most common — and least talked about — experiences in pregnancy. It isn't a sign that something is wrong with you or with this baby.",
        },
      },
      {
        id: "what-can-still-be-normal",
        heading: "What can still be normal emotionally",
        lead: "A lot of what feels concerning in the first trimester is, for most people, part of the season.",
        paragraphs: [
          "Tearfulness without an obvious trigger, mood swings, anxious phases, vivid or unsettling dreams, wanting to hide and wanting to tell everyone in the same day, distance from the pregnancy until something makes it feel real — all of these are familiar first-trimester territory.",
          "What tends to be worth more attention is when feelings stop moving — persistent low mood that doesn't lift for more than two weeks, anxiety that's getting in the way of sleep or eating, a sense of dread or hopelessness that settles in. Those are reasons to talk to your midwife or GP.",
        ],
      },
      {
        id: "what-can-help-now",
        heading: "What can help now",
        lead: "Small, achievable things tend to matter more than big plans.",
        paragraphs: [
          "Lowering the bar for what counts as a good day is often the single most useful shift. First-trimester capacity is smaller than usual — survival isn't underachievement.",
          "Telling at least one person who can hold the news gently makes a real difference. So does protecting whatever helps — sleep, food you can keep down, low-stakes evenings, fresh air — even when it feels like you should be doing more.",
        ],
      },
      {
        id: "when-to-talk-to-your-midwife",
        heading: "When to talk to your midwife or GP",
        lead: "Mental health support in pregnancy starts as soon as you ask for it.",
        paragraphs: [
          "If low mood is lasting more than two weeks, if anxiety is interfering with daily life, if you're not coping, or if you're having any thoughts of harming yourself, please talk to someone — your midwife, your GP, or NHS 111 if you need help sooner.",
          "Telling your midwife how you're actually feeling at booking — not just how you think you should be — opens the door to more support, earlier. Mental health is part of antenatal care.",
        ],
      },
    ],
  },

  // ─── WHEN THE JOY DOESN'T ARRIVE YET ──────────────────────────────────────
  {
    slug: "when-the-joy-doesnt-arrive-yet",
    title: "When the joy doesn't arrive yet: on absent, delayed, or mixed feelings in pregnancy",
    metaDescription: "When the joy you expected to feel about pregnancy isn't there — or is mixed, delayed, or replaced by numbness or dread. What this often means, and when extra support is worth seeking.",
    quickAnswer:
      "When the joy you expected to feel about pregnancy doesn't arrive — or arrives in a quieter, more complicated form — it doesn't usually mean anything is wrong with you, your love for this baby, or this pregnancy. Joy in pregnancy is often delayed, mixed with other feelings, or absent for stretches at a time. Numbness, ambivalence, dread, and grief can all sit alongside love. Where it tips into needing more support is usually when low mood is persistent, when nothing eases it, or when daily life is becoming hard — not when the feelings simply aren't what you expected.",
    howThisFeels: [
      "Wondering why everyone else seems happier about your pregnancy than you are",
      "Smiling on the outside and feeling flat on the inside",
      "Loving your baby and dreading parts of pregnancy in the same breath",
      "Carrying a quiet, unspoken sense that something is missing",
    ],
    whatHappening: {
      commonCauses: [
        { heading: "Hormonal and physical load", body: "First-trimester nausea, exhaustion, third-trimester discomfort, and broken sleep all flatten emotion. Joy struggles to land in a depleted body." },
        { heading: "Mismatch with the story you were told", body: "Cultural expectations of pregnancy as joyful create a real loneliness when your experience doesn't match. The mismatch is often the hardest part." },
        { heading: "Bonding takes its own time", body: "Many people don't feel deeply bonded with their baby until much later — sometimes not until movements, sometimes not until birth. The pace of bonding doesn't predict the depth of love." },
      ],
      lessCauses: [
        { heading: "Antenatal depression", body: "Persistent low mood, hopelessness, loss of interest, or numbness that lasts more than two weeks may be antenatal depression — which is real, common, and treatable." },
        { heading: "Unprocessed loss, fertility difficulty, or trauma", body: "If you've reached this pregnancy through loss, fertility treatment, or difficult experiences, the absence of straightforward joy often makes complete sense." },
      ],
      whyItVaries: "How joy lands in pregnancy depends on hormones, physical health, how the pregnancy came about, your history, and the support around you. Mixed and delayed feelings are common across all of these.",
    },
    timing: {
      whenStarts: "Many people describe the absence of expected joy from very early in pregnancy.",
      whenPeaks: "It often feels heaviest in the first trimester and again in late pregnancy when the reality of birth and parenthood becomes closer.",
      whenEases: "Joy often arrives in pieces — a scan, a movement, a moment after birth — rather than all at once. For some, the strongest feelings only arrive in the early weeks of parenthood.",
    },
    whatItFeelsLike: [
      "Numbness rather than excitement",
      "Performing happiness for other people",
      "Guilt that you don't feel grateful enough",
      "Hope and dread at the same time",
    ],
    whatThisMeans:
      "The absence of joy isn't an absence of love. Pregnancy holds a wider emotional range than most people are told to expect — and your feelings being quieter, mixed, or delayed is part of that range, not a problem to fix.",
    normal: [
      "Numbness, ambivalence, or feeling flat for stretches",
      "Joy arriving in flashes rather than a steady state",
      "Loving your baby and not loving pregnancy",
      "Grief or sadness alongside hope",
      "Bonding that comes slowly, or arrives mostly after birth",
    ],
    seekSupport: [
      "Low mood that's persistent and not lifting between days",
      "A sense of dread or hopelessness that doesn't ease",
      "Loss of interest in things you usually care about",
      "Feeling unable to function or cope with daily life",
      "Any thoughts of harming yourself",
    ],
    disclaimer: "This is general guidance, not a substitute for professional care. If something in your feelings is worrying you, please speak to your midwife, your GP, or — if you need help sooner — call 111 or, in a crisis, 999.",
    whatYouCanDo: [
      { action: "Stop measuring your pregnancy against the joy you expected", reason: "The expectation is often the heaviest part. Letting it go opens space for whatever is actually here." },
      { action: "Tell one safe person what's really going on", reason: "Saying 'I don't feel how I thought I would' to someone who can hold it almost always brings relief." },
      { action: "Notice the small moments that do land", reason: "Joy in pregnancy is often a flicker, not a flood. Naming the small moments — without forcing them — can help them grow." },
      { action: "Look at sleep, food, and rest first", reason: "Depleted bodies don't feel much joy. Practical care often shifts more emotionally than people expect." },
      { action: "Be honest with your midwife", reason: "Mental health is part of antenatal care. The earlier the door is open, the more support is available." },
    ],
    whatHappensNext: "For many people, joy arrives more clearly in the early weeks of parenthood — sometimes even after a hard pregnancy. For some, it stays quieter, and that's also a real way to love a baby. Either way, support continues to be available.",
    relatedStage: {
      intro: "When the joy doesn't arrive yet sits inside the wider feelings topic:",
      links: [
        { label: "Your feelings in pregnancy", href: "/pregnancy/feelings", context: "The wider topic this article belongs to." },
        { label: "Emotional wellbeing in pregnancy", href: "/articles/emotional-wellbeing-pregnancy", context: "The broader orientation around mental health in pregnancy." },
        { label: "Anxiety in pregnancy", href: "/articles/anxiety-in-pregnancy", context: "On worry, and where the line into overwhelm tends to sit." },
      ],
    },
    aiPrompts: [
      "Why don't I feel happy about my pregnancy?",
      "Is it normal to feel numb in pregnancy?",
      "How do I know if I'm depressed in pregnancy?",
    ],
    captureIntro: "The feelings you didn't expect are often the ones you can't quite say out loud. A quiet space for what this pregnancy has actually felt like — in your own words.",
    trimester: [1, 2, 3],
    relatedSlugs: ["emotional-wellbeing-pregnancy", "anxiety-in-pregnancy", "the-first-trimester-emotionally"],
    journey: ["pregnancy", "support"],
    topics: ["feelings", "emotional-wellbeing"],
    reviewedBy: "Jenny Joines",
    lastUpdated: "April 2026",
    keyTakeaways: [
      "The absence of joy in pregnancy doesn't usually mean anything is wrong",
      "Joy is often delayed, mixed, or arrives in flashes rather than a steady state",
      "Numbness, ambivalence, and dread can all sit alongside real love",
      "What's worth more attention is persistent low mood, hopelessness, or struggling to function",
      "Mental health support in pregnancy is real, accessible, and starts as soon as you ask",
    ],
    sources: [
      "NHS — Mental health in pregnancy",
      "Mind — Perinatal depression",
      "Tommy's — Mental wellbeing in pregnancy",
      "Maternal Mental Health Alliance",
      "NICE — Antenatal and postnatal mental health",
    ],
    faq: [
      { question: "Why don't I feel happy about being pregnant?", answer: "There are lots of possible reasons — hormones, exhaustion, physical symptoms, the gap between expectation and experience, previous losses, life circumstances. For most people, the absence of joy doesn't mean anything is wrong with the pregnancy or with their love for the baby. It's worth noticing, and worth being gentle with." },
      { question: "Is feeling numb in pregnancy normal?", answer: "Yes, particularly in the first trimester and at points of overwhelm. Numbness is often a form of self-protection — a way the mind manages too much at once. If numbness is constant, lasting weeks, and accompanied by other low-mood signs, it's worth a conversation with your midwife or GP." },
      { question: "How do I know if this is antenatal depression?", answer: "If low mood, hopelessness, or loss of interest in things you usually care about lasts more than two weeks and is affecting daily life — sleep, eating, work, relationships — please speak to your midwife or GP. There are screening tools that can help, and treatment is real and effective. Asking earlier is almost always easier than asking later." },
      { question: "Will I bond with my baby if I don't feel joyful now?", answer: "Almost certainly. Bonding for many people doesn't really begin in pregnancy at all, or only arrives slowly through movements, scans, or meeting the baby. The lack of strong feelings now doesn't predict the depth of love later." },
      { question: "Where can I get help if I'm struggling?", answer: "Start with your midwife or GP — they can refer you to perinatal mental health services where they're available, or to talking therapies. Charities like Mind, the Maternal Mental Health Alliance, and Tommy's also offer information and support. If you need help sooner, call NHS 111. If you're in crisis or thinking of harming yourself, call 999 or go to A&E." },
    ],

    // ── Deep template fields ──
    topic: "feelings",
    standfirst:
      "When the joy you expected to feel doesn't arrive — or arrives in a quieter, more complicated form. A gentle, shame-reducing look at one of the most common, least talked about parts of pregnancy.",
    editorialSections: [
      {
        id: "when-the-joy-doesnt-arrive-yet",
        heading: "When the joy doesn't arrive yet",
        lead: "The cultural script of pregnancy says joy. Real pregnancy holds a much wider emotional range.",
        paragraphs: [
          "A lot of people quietly carry the experience of not feeling how they thought they would about being pregnant — and quietly carry the worry that this means something. For most, it doesn't.",
          "What follows is a calm, careful look at the absence, delay, or mixedness of joy in pregnancy: what it can feel like, what it usually means, and where it tips into something worth more support.",
        ],
      },
      {
        id: "what-it-can-feel-like",
        heading: "What it can feel like when joy is absent, delayed, or mixed",
        lead: "There's a particular texture to this experience that's worth naming.",
        paragraphs: [
          "It can feel like numbness rather than excitement. Like performing happiness for the people around you. Like loving your baby and dreading parts of pregnancy in the same breath. Like joy arriving in flashes — at a scan, at a movement, at a passing moment — rather than as a steady state.",
          "For some people it feels like a flat background hum; for others, like a more uncomfortable sense of dread, guilt, or grief. Mixed is the most common shape — feelings that don't sort into one neat emotion.",
        ],
      },
      {
        id: "why-it-doesnt-mean-something-is-wrong",
        heading: "Why this doesn't mean something is wrong",
        lead: "The absence of joy isn't the absence of love.",
        paragraphs: [
          "Pregnancy is a major physical, hormonal, and identity shift. Joy, like any complex feeling, doesn't reliably arrive on demand in seasons of upheaval. Many people don't feel deeply bonded with their baby until much later — sometimes not until movements, sometimes not until birth, sometimes only in the early weeks of parenthood.",
          "How you feel in pregnancy is not a measure of how much you'll love your baby, how good a parent you'll be, or how much you wanted this. It's a reflection of where you are right now — physically, hormonally, emotionally — and that picture changes.",
        ],
        callout: {
          tone: "reassurance",
          text: "Quiet, mixed, or delayed feelings about pregnancy are extremely common. They aren't a sign that something is wrong with you or with this baby.",
        },
      },
      {
        id: "the-emotional-reality-is-complicated",
        heading: "How emotional reality in pregnancy can be complicated",
        lead: "Real pregnancy holds room for things the brochures don't mention.",
        paragraphs: [
          "Hope and grief can sit together — especially after loss, fertility difficulty, or a complicated road to this pregnancy. Love and ambivalence can coexist. Wanting this baby and not enjoying pregnancy are not contradictions.",
          "Cultural expectations of pregnancy as a glow-and-gratitude experience add a particular kind of loneliness when reality doesn't match. The mismatch — between how you're 'supposed' to feel and how you actually feel — is often the heaviest part of this experience, not the feelings themselves.",
        ],
      },
      {
        id: "what-can-help",
        heading: "What can quietly help",
        lead: "Small, gentle shifts — not big emotional projects.",
        paragraphs: [
          "Letting go of the measuring stick — comparing your feelings to the joy you expected — usually lifts more weight than anything else. So does telling at least one safe person what's really going on, in plain words, without softening it.",
          "Looking at sleep, food, and rest first is more useful than people expect. Depleted bodies don't feel much joy. Noticing the small moments that do land — without forcing them — can help them grow.",
        ],
      },
      {
        id: "when-extra-support-is-worth-seeking",
        heading: "When numbness, dread, or low mood may need more support",
        lead: "There's a clearer line where it's worth bringing someone else in.",
        paragraphs: [
          "If low mood is persistent and isn't lifting between days, if there's a sense of dread or hopelessness that doesn't ease, if you've lost interest in things you usually care about, or if daily life is becoming hard, that's a clear reason to talk to your midwife or GP.",
          "Antenatal depression is real, common, and treatable. So is antenatal anxiety. Naming what you're feeling doesn't lock you into anything — it opens the door to more support.",
        ],
      },
      {
        id: "what-support-may-look-like",
        heading: "What support may look like",
        lead: "There's more than 'wait and see' available — and it starts with one conversation.",
        paragraphs: [
          "Your midwife or GP can refer you to perinatal mental health services where they're available, or to talking therapies through services like NHS Talking Therapies. These services exist specifically for the perinatal season and understand it.",
          "Where helpful, some medications are considered safe in pregnancy and can be discussed with a specialist team. Charities like Mind, Tommy's, and the Maternal Mental Health Alliance also offer information and peer support. You don't have to weigh any of this on your own.",
        ],
      },
      {
        id: "if-youre-in-crisis",
        heading: "If you're in crisis",
        lead: "Some feelings need help sooner than a routine appointment.",
        paragraphs: [
          "If you're having thoughts of harming yourself, or you don't feel safe, please reach out now — call NHS 111, your GP, or your maternity unit. In an emergency, call 999 or go to A&E. The Samaritans (116 123) are available day and night.",
          "Asking for help in a crisis isn't a failure of pregnancy. It's the most important kind of care for you and your baby.",
        ],
        callout: {
          tone: "gentle-warning",
          text: "If you're thinking of harming yourself, please tell someone now — your midwife, GP, NHS 111, or 999 in an emergency. The Samaritans are also available day and night on 116 123.",
        },
      },
    ],
  },

  // ─── WEIGHT CHANGES IN PREGNANCY (Phase F) ────────────────────────────────
  {
    slug: "weight-changes-in-pregnancy",
    title: "Weight changes in pregnancy: a calm look at how bodies shift",
    metaDescription: "Why weight changes differently in pregnancy, what variation is normal, and when changes are worth raising — without diet-culture pressure or numbers-on-a-chart anxiety.",
    quickAnswer:
      "Bodies change in pregnancy in ways that are far less uniform than charts suggest. Weight may shift quickly, slowly, in spurts, or barely at all — and most of that variation is normal. Genuine concern usually isn't about a number, but about a pattern: weight loss that doesn't ease, very rapid gain alongside swelling, or other symptoms your midwife will want to know about. The healthier focus throughout pregnancy is steady eating, gentle movement, and honest check-ins — not weighing or comparison.",
    howThisFeels: [
      "Wondering whether you're 'gaining the right amount'",
      "Feeling caught between old body habits and a body that's changing on its own",
      "Reading conflicting advice and not knowing what's actually relevant",
      "Wanting honest information without the diet-culture pressure",
    ],
    whatHappening: {
      commonCauses: [
        { heading: "Your body is doing new physical work", body: "Blood volume rises, fluid increases, the placenta develops, breasts change, and your baby grows. Weight shifts are a side-effect of that work, not a project to manage." },
        { heading: "Hormones change appetite and storage", body: "Pregnancy hormones change hunger, fullness cues, and how the body stores energy. None of this is a sign of doing something wrong." },
        { heading: "Variation between bodies is enormous", body: "Two people in the same week of pregnancy can look and weigh very differently and both be entirely well." },
      ],
      lessCauses: [
        { heading: "Conditions that need monitoring", body: "Sudden, rapid weight gain alongside swelling, headaches, or visual changes can sometimes signal pre-eclampsia. Significant ongoing weight loss can sometimes signal hyperemesis or other concerns. These are reasons to call, not to weigh." },
      ],
      whyItVaries: "Genetics, starting body, pregnancy symptoms, multiples, hydration, and how much fluid you're carrying all change the picture week to week.",
    },
    timing: {
      whenStarts: "Some people notice changes in the first weeks; others not until the second trimester.",
      whenPeaks: "Most visible body change tends to happen in the second and third trimesters.",
      whenEases: "Body change after birth is its own slow, non-linear process — not a return to a previous version.",
    },
    whatItFeelsLike: [
      "A body that feels less predictable than usual",
      "Clothes fitting differently in unexpected places",
      "Days where the change feels welcome and days where it doesn't",
    ],
    whatThisMeans:
      "Weight in pregnancy isn't a performance metric. It's one piece of information your midwife may glance at, in the context of everything else.",
    normal: [
      "Slow, fast, or uneven weight change across pregnancy",
      "Some weeks of no visible change",
      "Body shape changing in places you didn't expect",
      "Carrying differently from someone else at the same stage",
    ],
    seekSupport: [
      "Sudden, rapid weight gain with swelling, headaches, or visual changes",
      "Significant ongoing weight loss, especially with persistent vomiting",
      "Any changes that come with new symptoms you're worried about",
    ],
    disclaimer: "This is general guidance, not a substitute for professional care. If something about how your body is changing is worrying you, please speak to your midwife or GP.",
    whatYouCanDo: [
      { action: "Step away from the scales unless your care team has asked you to weigh", reason: "Routine self-weighing in pregnancy rarely helps and often increases anxiety." },
      { action: "Eat regularly and well, without rules", reason: "Steady eating supports both you and your baby far more reliably than tracking numbers." },
      { action: "Move in ways your body can manage", reason: "Gentle movement helps energy, sleep, and mood — not weight control." },
      { action: "Talk to your midwife about anything that worries you", reason: "They can put any change into the context of your wider pregnancy." },
    ],
    whatHappensNext: "Bodies continue to change after birth, slowly and not always in the directions people expect. The healthiest approach is the same one as in pregnancy: steady eating, gentle care, and not measuring yourself against a chart.",
    relatedStage: {
      intro: "Weight changes sit inside the wider Health & safety topic:",
      links: [
        { label: "Health and safety in pregnancy", href: "/pregnancy/health-and-safety", context: "The wider topic this article belongs to." },
        { label: "Eating well in pregnancy", href: "/articles/eating-well-in-pregnancy", context: "The food side, calmly." },
        { label: "Moving your body in pregnancy", href: "/articles/moving-your-body-in-pregnancy", context: "Realistic movement guidance." },
      ],
    },
    aiPrompts: [
      "How much weight should I gain in pregnancy?",
      "Is it normal to lose weight in early pregnancy?",
      "When should I worry about weight gain in pregnancy?",
    ],
    captureIntro: "How your body is actually feeling in this season — without judgement, charts, or comparison.",
    trimester: [1, 2, 3],
    relatedSlugs: ["eating-well-in-pregnancy", "moving-your-body-in-pregnancy", "when-you-cant-face-food-in-pregnancy"],
    journey: ["pregnancy"],
    topics: ["health-and-safety"],
    reviewedBy: "Jenny Joines",
    lastUpdated: "April 2026",
    keyTakeaways: [
      "Bodies change in pregnancy at very different paces — variation is normal",
      "A number on the scales is rarely the most useful piece of information",
      "Steady eating and gentle movement matter more than tracking weight",
      "Sudden gain with swelling, or significant loss with vomiting, is worth raising",
      "Comparison to other pregnancies usually creates worry, not insight",
    ],
    sources: [
      "NHS — Have a healthy diet in pregnancy",
      "NHS — Weight gain in pregnancy",
      "Royal College of Obstetricians and Gynaecologists — Healthy eating and exercise",
      "Tommy's — Weight management in pregnancy",
      "NICE — Antenatal care",
    ],
    faq: [
      { question: "How much weight should I gain in pregnancy?", answer: "There isn't a single right answer for everyone. UK midwifery care doesn't routinely weigh people throughout pregnancy because a number on the scales tells you very little on its own. Your midwife will look at the wider picture — how you're feeling, how your baby is growing, and any other signs — rather than focusing on weight." },
      { question: "Is it normal to lose weight in early pregnancy?", answer: "Yes — particularly if you're experiencing nausea, vomiting, or food aversions. Mild weight loss in the first trimester is common and not usually a concern. If you're losing weight rapidly, can't keep food or fluid down, or are feeling very unwell, please speak to your midwife or GP." },
      { question: "Should I be weighing myself at home?", answer: "Most pregnancies don't need this, and for many people it adds anxiety without adding useful information. Unless your care team has specifically asked you to track weight, it's usually kinder to step away from the scales." },
      { question: "What if I'm worried about gaining too much weight?", answer: "It's worth talking to your midwife rather than restricting food. Restriction in pregnancy carries its own risks for you and your baby. Your midwife can support you with steady, sustainable approaches to eating and movement that aren't about diet culture." },
      { question: "When is weight gain in pregnancy worth raising?", answer: "Sudden, rapid weight gain — especially alongside swelling in the face or hands, headaches, or visual changes — should be raised promptly, as it can sometimes be a sign of pre-eclampsia. Otherwise, the pattern of change tends to matter more than the amount." },
    ],

    // ── Deep template fields ──
    topic: "health-and-safety",
    standfirst:
      "A calm look at how bodies change in pregnancy — without diet-culture pressure, charts, or comparison. What's normal, what isn't, and where to put your attention instead.",
    editorialSections: [
      {
        id: "weight-changes-in-pregnancy",
        heading: "Weight changes in pregnancy",
        lead: "Bodies in pregnancy change in ways that don't fit neatly onto a chart.",
        paragraphs: [
          "Weight in pregnancy is one of the areas where people are most likely to be handed conflicting messages, often soaked in the language of diet culture. The honest picture is calmer than that — and more useful.",
          "This is a steady look at why bodies change in pregnancy, what kinds of change tend to be normal, and the small number of moments where weight is genuinely worth raising with your midwife.",
        ],
      },
      {
        id: "why-bodies-change-differently",
        heading: "Why bodies change differently",
        lead: "Pregnancy adds physical work to your body in a lot of directions at once.",
        paragraphs: [
          "Blood volume increases substantially. Fluid rises. The placenta develops. Your breasts change. Your baby grows. None of these happen at the same rate in every body, and none of them happen on a fixed timetable.",
          "On top of that, hormones change appetite, fullness cues, and how energy is stored. Two people the same height in the same week of pregnancy can look and weigh very differently, and both be entirely well.",
        ],
      },
      {
        id: "what-kinds-of-change-are-normal",
        heading: "What kinds of change are normal",
        lead: "Almost any pattern, within reason, sits inside normal.",
        paragraphs: [
          "Some people gain steadily from early on. Some don't notice much until the second trimester. Some lose a little in the first weeks because of nausea and aversions. Some carry their weight low, others high, others mostly out, others mostly around. All of this can be normal.",
          "Body shape can also change in places you weren't expecting — face, arms, hips, breasts. None of that is a sign of doing pregnancy 'right' or 'wrong'.",
        ],
      },
      {
        id: "why-comparison-doesnt-help",
        heading: "Why comparison usually doesn't help",
        lead: "The body next to you isn't a reference point.",
        paragraphs: [
          "Comparing yourself to other pregnant people — in real life or online — almost always tells you less than it makes you feel. Pregnancies look different because bodies are different, not because anyone's doing it correctly or incorrectly.",
          "The same is true of comparison to your own past pregnancies. Each one tends to look and feel a little different.",
        ],
        callout: {
          tone: "reassurance",
          text: "Carrying differently from someone else at the same week is one of the most common, least concerning things in pregnancy.",
        },
      },
      {
        id: "when-weight-changes-are-worth-raising",
        heading: "When weight changes are worth raising",
        lead: "There are a small number of patterns that midwives genuinely want to hear about.",
        paragraphs: [
          "Sudden, rapid weight gain — especially when it comes alongside swelling in the face or hands, headaches, or changes in your vision — should be raised promptly. It can sometimes be a sign of pre-eclampsia.",
          "Significant, ongoing weight loss — especially with persistent vomiting, dehydration, or feeling very unwell — is also worth raising. It can sometimes signal hyperemesis or another concern that needs more support.",
        ],
      },
      {
        id: "how-midwives-and-doctors-think-about-it",
        heading: "How midwives and doctors think about it",
        lead: "The picture they care about is wider than the scales.",
        paragraphs: [
          "UK antenatal care doesn't routinely weigh people throughout pregnancy. Weight on its own tells your care team very little. What they're paying attention to is the wider picture: how you're feeling, how your baby is growing, your blood pressure, and any specific symptoms.",
          "If weight does come up at an appointment, it's usually because something else has prompted the conversation. It's a piece of information, not a verdict.",
        ],
      },
      {
        id: "keeping-the-focus-on-health",
        heading: "Keeping the focus on health, not numbers",
        lead: "There's a quieter, more sustainable place to put your attention.",
        paragraphs: [
          "Eating regularly and reasonably well — without rules or restriction — supports you and your baby far more reliably than tracking numbers. So does moving in ways your body can actually manage on the day, sleeping when you can, and asking for support when something feels off.",
          "Pregnancy is a hard season to undertake a project on your body. The kinder, more useful approach is usually to let the body do its work and to focus your attention elsewhere.",
        ],
      },
    ],
  },

  // ─── HOSPITAL BAG AND WHAT TO PACK (Phase F) ──────────────────────────────
  {
    slug: "hospital-bag-and-what-to-pack",
    title: "Hospital bag and what to pack: a calm, anti-overpacking guide",
    metaDescription: "What you actually need in a hospital bag, what's nice but optional, and what often gets overpacked. A calm, practical guide for labour, after birth, and your baby.",
    quickAnswer:
      "A hospital bag for birth doesn't need to be huge. The genuine essentials are documents, comfortable clothing for labour and after, basic toiletries, snacks and drink, phone charger, going-home outfits for you and your baby, nappies, and a car seat for the journey home. Most other things are nice but optional. Pack by around 36 weeks, keep it accessible, and resist the urge to bring your whole bathroom — hospitals generally aren't short of the things you'd assume to bring.",
    howThisFeels: [
      "Looking at long checklists and feeling instantly overwhelmed",
      "Wondering whether you're under-packing or over-packing",
      "Wanting a calm, real list rather than a commercial one",
      "Trying to make your bag feel like a small, manageable project",
    ],
    whatHappening: {
      commonCauses: [
        { heading: "Lists online lean towards over-packing", body: "A lot of hospital bag content is checklist-heavy, often shaped by product sales rather than what people actually use." },
        { heading: "Hospitals provide more than people expect", body: "Most UK maternity units provide pads, basic pain relief, food and drink, and nappies during your stay. You don't need to replicate that." },
        { heading: "Stays vary in length", body: "Some people are home within hours of birth; some stay several days. Packing for the middle of that range is usually about right." },
      ],
      lessCauses: [],
      whyItVaries: "Different hospitals, different birth plans, and different personal preferences all change what's worth bringing.",
    },
    timing: {
      whenStarts: "Most people pack their bag from around 34–36 weeks.",
      whenEases: "Once it's by the door, you can usually stop thinking about it.",
    },
    whatItFeelsLike: [
      "A small, satisfying job among many bigger ones",
      "An occasional tug to add 'just one more thing'",
      "Quiet reassurance once it's sitting ready",
    ],
    whatThisMeans:
      "Packing a hospital bag is best done as a calm, practical task — not a comprehensive emergency kit.",
    normal: [
      "Packing in stages, adding things as you think of them",
      "Forgetting something and not really minding",
      "Realising you've barely opened most of it after the birth",
    ],
    seekSupport: [
      "Anxiety around birth that the packing isn't easing — your midwife can help here, not the bag",
    ],
    disclaimer: "Always check what your specific maternity unit asks you to bring or not bring. Lists vary slightly between hospitals.",
    whatYouCanDo: [
      { action: "Pack by around 36 weeks", reason: "Late enough to feel real, early enough not to be a panic." },
      { action: "Keep it accessible", reason: "By the door, in the car, or somewhere a partner or friend can grab quickly." },
      { action: "Pack a smaller 'labour bag' inside the main one", reason: "So the things you need most aren't buried." },
      { action: "Remember nappies and a car seat", reason: "These are the two things you genuinely cannot leave without." },
    ],
    whatHappensNext: "After birth, most people use far less of their bag than they expected — and remember almost nothing about most of what they packed.",
    relatedStage: {
      intro: "Hospital bag sits inside the wider Preparing for baby topic:",
      links: [
        { label: "Preparing for baby", href: "/pregnancy/preparing-for-baby", context: "The wider topic this article belongs to." },
        { label: "Writing a birth plan", href: "/articles/writing-a-birth-plan", context: "Birth preferences, kept flexible." },
        { label: "The space your baby will come home to", href: "/articles/the-space-your-baby-will-come-home-to", context: "What home actually needs." },
      ],
    },
    aiPrompts: [
      "What do I really need in a hospital bag?",
      "When should I pack my hospital bag?",
      "What gets overpacked for hospital?",
    ],
    captureIntro: "What you're packing, what you've decided to leave, and how you're feeling about going in.",
    trimester: [3],
    relatedSlugs: ["writing-a-birth-plan", "the-space-your-baby-will-come-home-to", "signs-of-labour"],
    journey: ["pregnancy"],
    topics: ["preparing-for-baby"],
    reviewedBy: "Jenny Joines",
    lastUpdated: "April 2026",
    keyTakeaways: [
      "Hospitals provide more than people assume — you don't need to bring everything",
      "Pack by around 36 weeks and keep the bag accessible",
      "Documents, basic clothing, snacks, charger, nappies, and car seat are the real essentials",
      "Nice-but-optional things are exactly that — nice, optional",
      "Most people barely open most of their bag during the stay",
    ],
    sources: [
      "NHS — What to pack for your hospital bag",
      "Tommy's — Hospital bag for labour",
      "Royal College of Midwives",
      "NCT — Preparing for birth",
    ],
    faq: [
      { question: "When should I pack my hospital bag?", answer: "Most people pack between 34 and 36 weeks. That's late enough that it feels real, and early enough that it isn't a last-minute scramble. Keep it somewhere accessible once it's packed." },
      { question: "What's the most overpacked thing?", answer: "Clothes — for both labour and after. Most people use one or two outfits for labour, one for after, and one to go home in. Bringing a small wardrobe rarely helps. Toiletries are a close second." },
      { question: "Do I need to bring nappies and baby clothes?", answer: "Most UK hospitals provide nappies during your stay, but you'll want a few for the journey home and a couple of going-home outfits in different sizes — newborns vary. Always check your specific hospital's guidance." },
      { question: "What about food and drink?", answer: "A bottle of water, a few snacks, and something for a partner if they're staying. Hospitals provide meals but they don't always line up with when labour leaves you hungry. Snacks you actually like are a small comfort." },
      { question: "What can I leave at home?", answer: "Most heavy electronics, big toiletry hauls, candles or oils unless you've checked they're allowed, and anything you'd be upset to lose. Keep it simple." },
    ],

    // ── Deep template fields ──
    topic: "preparing-for-baby",
    standfirst:
      "A calm, anti-overpacking guide to your hospital bag — what you'll actually use, what your baby actually needs, and what almost always gets brought home untouched.",
    editorialSections: [
      {
        id: "hospital-bag-and-what-to-pack",
        heading: "Hospital bag and what to pack",
        lead: "A small, sensible bag is almost always better than a large, exhaustive one.",
        paragraphs: [
          "There is a long tradition of hospital bag lists that read more like packing for a fortnight away than a short hospital stay around the birth of a baby. The honest version is calmer.",
          "What follows is a grounded guide to what you'll genuinely want for labour, after birth, and for your baby — and a clear word on what tends to be overpacked.",
        ],
      },
      {
        id: "what-youll-want-for-labour",
        heading: "What you'll want for labour",
        lead: "A short list of things that actually help.",
        paragraphs: [
          "A loose, comfortable outfit you don't mind getting messy — an old nightshirt or oversized T-shirt works well. A hair tie if you have long hair. A water bottle, ideally one you can drink from while lying down. Lip balm, because hospital air dries you out.",
          "Snacks for energy — nothing too heavy. Phone and a long charger cable. Slippers or grippy socks. Anything small that brings comfort: a familiar pillow, a soft blanket, music or an audiobook downloaded ready to use.",
        ],
      },
      {
        id: "what-youll-want-after-birth",
        heading: "What you'll want after birth",
        lead: "Practical, comfortable, and not too much.",
        paragraphs: [
          "Big, comfortable knickers — several pairs. Maternity pads. A loose, button-front nightshirt or T-shirts if you're planning to breastfeed. A nursing bra or two. Dark, soft loungewear for the day or two after.",
          "Basic toiletries: toothbrush, toothpaste, a flannel, a small towel if you'd prefer your own. Anything you find genuinely soothing — your own shampoo, hand cream, a familiar face wash. You don't need a full bathroom shelf.",
        ],
      },
      {
        id: "what-your-baby-actually-needs",
        heading: "What your baby actually needs",
        lead: "Less than the lists suggest.",
        paragraphs: [
          "A few vests and babygros in different sizes — newborns vary in size more than people expect. A hat. A blanket or two. A coat or snowsuit if it's cold (not in the car seat — over the top of the straps).",
          "A small pack of newborn nappies for the journey home, even if your hospital provides some during the stay. Cotton wool and water, or fragrance-free wipes — check what your hospital prefers. A car seat, properly fitted, for the journey home. That last one is the only baby item you genuinely cannot leave the hospital without.",
        ],
        callout: {
          tone: "info",
          text: "Most UK maternity units provide nappies during your stay. You don't need to bring a full pack — just enough for the journey home and the first few hours.",
        },
      },
      {
        id: "what-is-nice-but-not-essential",
        heading: "What is nice but not essential",
        lead: "Bring some of these if they bring you comfort. Don't feel obliged.",
        paragraphs: [
          "A pillow from home. A speaker or earbuds. A reusable water bottle for a partner. A small notebook. Eye mask and earplugs for sleeping in a busy ward. A few coins for vending machines or hospital car parks.",
          "Anything that signals 'home' to you in a small way — a familiar scent, a particular tea, a cardigan you love — is often worth more than another change of clothes.",
        ],
      },
      {
        id: "what-often-gets-overpacked",
        heading: "What often gets overpacked",
        lead: "The honest list of what comes home untouched.",
        paragraphs: [
          "Multiple outfits for labour. Several pairs of pyjamas. Heavy makeup or full skincare routines. Big toiletry hauls. A wardrobe of baby outfits. Extra books and magazines. Heavy electronics. Anything fragile or expensive.",
          "If a hospital bag is heavy enough to be hard to carry, it's almost certainly too much. A small, neat bag plus a separate baby bag is a perfectly reasonable shape.",
        ],
      },
      {
        id: "when-to-pack-your-bag",
        heading: "When to pack your bag",
        lead: "Late enough to feel real, early enough not to be a panic.",
        paragraphs: [
          "Around 34–36 weeks is the usual timing. By 37 weeks it's worth having it accessible — by the door, in the car, or somewhere a partner or friend can grab without searching.",
          "Pack a smaller 'labour bag' inside the main one — the things you'll want during labour itself, kept easy to find. The rest can stay in the larger bag for the after-birth part of the stay.",
        ],
      },
    ],
  },

  // ─── PREPARING EMOTIONALLY FOR BIRTH (Phase F) ────────────────────────────
  {
    slug: "preparing-emotionally-for-birth",
    title: "Preparing emotionally for birth: a steady, honest look at how to feel readier",
    metaDescription: "What it really means to prepare emotionally for birth — how fear, curiosity, and readiness can coexist, what helps you feel steadier, and when fear may need more support.",
    quickAnswer:
      "Emotional preparation for birth isn't about feeling no fear. It's about being able to hold fear, uncertainty, hope, and readiness in the same hands. The most useful preparation tends to combine the practical (knowing what's likely to happen) with the emotional (naming what you're afraid of, who you want around you, what you want to feel held by). Where fear becomes dread that doesn't ease, or where birth feels too frightening to think about at all, that's a clear reason to talk to your midwife or GP.",
    howThisFeels: [
      "Wanting to feel calmer about birth without pretending you're not scared",
      "Reading birth stories and not knowing which to trust",
      "Hope and dread arriving in the same hour",
      "Wondering whether 'preparation' is even the right word for an unknown",
    ],
    whatHappening: {
      commonCauses: [
        { heading: "Birth is a big unknown", body: "Even with all the information in the world, no one can tell you exactly how your birth will unfold. The brain doesn't love that, and that's a normal response, not a failure." },
        { heading: "Cultural messages about birth are loud and mixed", body: "From hypnobirthing optimism to dramatic TV portrayals, the stories around birth pull people in different directions. Most are partly true and partly not." },
        { heading: "The body remembers", body: "Past medical experiences, previous births, or earlier loss can shape how birth feels emotionally now." },
      ],
      lessCauses: [
        { heading: "Tokophobia or severe birth fear", body: "Some people experience an intense fear of birth that goes beyond ordinary worry. This is recognised, real, and worth talking to your midwife or GP about — there are specific routes of support." },
      ],
      whyItVaries: "Personal history, current support, and how birth is being talked about around you all change how it lands emotionally.",
    },
    timing: {
      whenStarts: "Some people start thinking about birth from early pregnancy; for others it only becomes real in the third trimester.",
      whenPeaks: "Often in the last few weeks, as birth feels closer.",
      whenEases: "For many, the days of active labour itself feel surprisingly focused. The anticipation is often heavier than the moment.",
    },
    whatItFeelsLike: [
      "A pull between wanting to know everything and not wanting to think about it",
      "Days of curiosity, days of dread",
      "Wanting reassurance without being patronised",
    ],
    whatThisMeans:
      "Emotional preparation for birth is something you build slowly — not a single workshop or technique, but a quiet collection of conversations, decisions, and small reassurances.",
    normal: [
      "Feeling scared, uncertain, hopeful, and ready in the same week",
      "Avoiding birth content for stretches",
      "Wanting more information sometimes and less other times",
      "Crying about birth without knowing exactly why",
    ],
    seekSupport: [
      "Persistent dread or panic that doesn't ease",
      "Avoidance of all birth conversations because they're too overwhelming",
      "A history of birth trauma or medical trauma that's resurfacing",
      "Severe fear of birth (tokophobia) — your midwife or GP can refer you for specific support",
    ],
    disclaimer: "This is general guidance, not a substitute for professional care. If birth is feeling unmanageably frightening, please speak to your midwife or GP — there are specific perinatal services for this.",
    whatYouCanDo: [
      { action: "Name what you're actually afraid of", reason: "Vague fear is heavier than specific fear. Naming it usually makes it more workable." },
      { action: "Choose carefully who you talk to about birth", reason: "Some birth stories help, some don't. You can step away from the ones that don't." },
      { action: "Think about who you want with you, and how", reason: "Knowing who is in the room — and what role you want them to play — is one of the most settling forms of preparation." },
      { action: "Talk to your midwife about your fears", reason: "They've heard them all. They're the right place to bring this." },
      { action: "Consider an antenatal class if it suits you", reason: "Knowing what's likely to happen during labour reduces the unknown for many people." },
    ],
    whatHappensNext: "Birth itself, for most people, ends up being its own experience — sometimes harder than they hoped, sometimes easier, almost always not exactly what they planned. Preparing emotionally is about meeting it as steadily as you can, not predicting it.",
    relatedStage: {
      intro: "Preparing emotionally for birth sits between Feelings and Labour & birth:",
      links: [
        { label: "Your feelings in pregnancy", href: "/pregnancy/feelings", context: "The wider topic this article belongs to." },
        { label: "Anxiety in pregnancy", href: "/articles/anxiety-in-pregnancy", context: "On worry, more broadly." },
        { label: "Signs of labour", href: "/articles/signs-of-labour", context: "What labour can look like as it begins." },
      ],
    },
    aiPrompts: [
      "How do I prepare emotionally for birth?",
      "Is it normal to be scared of giving birth?",
      "What helps with fear of birth?",
    ],
    captureIntro: "What you're hoping for, what you're scared of, and what you want to feel held by when birth comes.",
    trimester: [2, 3],
    relatedSlugs: ["anxiety-in-pregnancy", "signs-of-labour", "writing-a-birth-plan"],
    journey: ["pregnancy"],
    topics: ["feelings"],
    reviewedBy: "Jenny Joines",
    lastUpdated: "April 2026",
    keyTakeaways: [
      "Emotional preparation isn't about feeling no fear — it's about being able to hold it",
      "Fear, hope, curiosity, and dread can all coexist and still be normal",
      "Naming specific fears tends to make them more workable than vague worry",
      "Choosing who's with you and how is one of the most grounding forms of preparation",
      "Persistent dread or severe fear of birth deserves specific support — talk to your midwife",
    ],
    sources: [
      "NHS — Preparing for birth",
      "Tommy's — Tokophobia",
      "Birth Trauma Association",
      "Maternal Mental Health Alliance",
      "NICE — Antenatal and postnatal mental health",
    ],
    faq: [
      { question: "Is it normal to be scared of giving birth?", answer: "Yes — extremely. Birth is a big, unknown event, and almost everyone approaches it with some fear. Naming the fear, choosing who you talk to about it, and bringing it to your midwife are all healthier than trying to suppress it." },
      { question: "What's the difference between normal birth fear and tokophobia?", answer: "Normal fear comes and goes, tends to be specific, and doesn't stop you engaging with pregnancy. Tokophobia is a more intense, persistent fear of birth that can include avoidance, panic, or difficulty thinking about birth at all. It's recognised, real, and worth raising with your midwife or GP — there are specific perinatal mental health services that can help." },
      { question: "Will hypnobirthing or antenatal classes help?", answer: "They help some people a lot and aren't right for everyone. The honest answer is that no single method guarantees a particular birth experience. What classes can usefully offer is information, language for what's happening, and a sense of preparedness — which often eases anxiety even if birth itself doesn't go as planned." },
      { question: "How do I deal with scary birth stories?", answer: "You're allowed to step away from them. You can ask people not to share their birth story, change the subject in conversations, or unfollow content that's leaving you more anxious. Curating what you take in isn't avoidance — it's care." },
      { question: "What if I've had birth trauma before?", answer: "Please tell your midwife early. Many areas have a Birth Afterthoughts service or specialist midwives who support people through subsequent births after trauma. Specific trauma-focused therapy can also be very effective. You don't have to carry this into another birth alone." },
    ],

    // ── Deep template fields ──
    topic: "feelings",
    standfirst:
      "Emotional preparation for birth isn't about feeling no fear. It's about being able to hold fear, hope, and readiness in the same hands — and knowing where to put your attention when fear feels too big.",
    editorialSections: [
      {
        id: "preparing-emotionally-for-birth",
        heading: "Preparing emotionally for birth",
        lead: "A different kind of preparation from packing a bag or writing a plan.",
        paragraphs: [
          "Practical preparation for birth — bag packed, plan written, route to hospital known — only goes so far. Most of what makes birth feel manageable is emotional, and that takes a quieter, slower kind of work.",
          "This is a steady look at what emotional preparation for birth can actually mean, what tends to help, and where fear is worth bringing to someone else.",
        ],
      },
      {
        id: "what-people-often-feel",
        heading: "What people often feel as birth gets closer",
        lead: "The feelings rarely sort themselves into one shape.",
        paragraphs: [
          "As birth approaches, most people feel some combination of fear, curiosity, hope, dread, readiness, impatience, and disbelief — sometimes all in the same day. None of this is unusual, and none of it is a sign of doing pregnancy badly.",
          "Some people feel calmer the closer birth gets. Some feel more frightened. Some swing between the two. There isn't a correct emotional progression.",
        ],
      },
      {
        id: "fear-uncertainty-not-knowing",
        heading: "Fear, uncertainty, and not knowing",
        lead: "Birth is genuinely an unknown, and the brain notices.",
        paragraphs: [
          "Even with every piece of information available, no one can tell you exactly how your birth will unfold. That's the honest part. The brain doesn't love uncertainty, and so it tries to fill in the gap — sometimes with reasonable preparation, sometimes with worst-case thinking.",
          "Naming a specific fear — 'I'm afraid I won't be listened to', 'I'm afraid of losing control', 'I'm afraid of pain I can't manage' — almost always makes it more workable than carrying a vague, heavy sense of dread.",
        ],
      },
      {
        id: "what-can-help-feel-steadier",
        heading: "What can help you feel steadier",
        lead: "Small things, done consistently, more than big single interventions.",
        paragraphs: [
          "Knowing who's going to be with you, and what role you want them to play, is one of the most settling forms of preparation. So is knowing what's likely to happen in labour — not in detail, but in shape — so the experience itself isn't entirely unfamiliar.",
          "Talking to your midwife about your fears, choosing what kinds of birth content you take in (and stepping away from the rest), and rehearsing one or two phrases you'd want to use during labour ('I need a break', 'I want more information') can all help.",
        ],
      },
      {
        id: "preparation-that-is-emotional",
        heading: "Preparation that is emotional, not just practical",
        lead: "There's a quieter side to readiness.",
        paragraphs: [
          "Emotional preparation can include processing previous birth experiences, talking through any medical history that might come up, writing down what you'd want someone to remind you of in labour, or simply spending time imagining yourself in the hours and days after birth — not just during it.",
          "Some people find antenatal classes, hypnobirthing, or therapy useful. Some find quieter, more private preparation works better. There's no single right way, and no preparation method guarantees a particular birth.",
        ],
        callout: {
          tone: "reassurance",
          text: "Feeling 'ready' for birth doesn't mean feeling fearless. It usually means knowing where you stand, who's with you, and that you can ask for what you need.",
        },
      },
      {
        id: "when-fear-takes-over",
        heading: "When fear starts to take over",
        lead: "There's a clearer line where extra support is worth seeking.",
        paragraphs: [
          "If fear of birth is constant and not easing, if you find yourself unable to think about birth at all without panic, or if dread is interfering with sleep, daily life, or your wider feelings about pregnancy, that's worth bringing to your midwife or GP.",
          "Severe fear of birth — sometimes called tokophobia — is recognised, common, and supported. So is the resurfacing of past birth trauma or medical trauma. There are specific perinatal mental health services for this, and asking earlier is almost always easier than asking later.",
        ],
      },
      {
        id: "what-support-may-help",
        heading: "What support may help",
        lead: "More options than people often realise.",
        paragraphs: [
          "Your midwife can talk through your fears, refer you to perinatal mental health services where they're available, or — in many areas — to a Birth Afterthoughts or birth reflections service if a previous birth is part of what's coming up.",
          "Specialist midwives, talking therapies, and trauma-focused therapy are all real options. Charities like the Birth Trauma Association, Tommy's, and the Maternal Mental Health Alliance also offer information and support. You don't have to do this part of the preparation alone.",
        ],
      },
    ],
  },

  // ─── BABY MOVEMENT IN PREGNANCY (Phase F) ─────────────────────────────────
  {
    slug: "baby-movement-in-pregnancy",
    title: "Baby movement in pregnancy: when it starts, how it changes, and when to call",
    metaDescription: "When baby movement is usually first felt, how it changes through pregnancy, what variation is normal, and when reduced or changed movement is worth raising urgently.",
    quickAnswer:
      "Most people first feel their baby move between around 16 and 24 weeks, with later first pregnancies tending to feel it later. Movement gradually becomes more distinct and patterned through the second and third trimesters. There is no set number of movements you should feel a day — what matters is your baby's own pattern. If movements feel reduced, slower, or different from what's usual for you, contact your maternity unit straight away, day or night. This is one of the few moments in pregnancy where waiting isn't the right approach.",
    howThisFeels: [
      "Wondering whether what you felt was movement or wind",
      "Loving the feeling and finding it strange in the same moment",
      "Counting kicks anxiously and not knowing if you're doing it right",
      "Worrying when a quiet day arrives",
    ],
    whatHappening: {
      commonCauses: [
        { heading: "Movement starts earlier than you can feel it", body: "Your baby is moving from very early in pregnancy. You only start to feel it once they're large enough — and once your placenta and your own body let those movements through." },
        { heading: "Patterns become more individual over time", body: "By the third trimester, most babies have their own rhythm — busier or quieter at certain times, more active in particular positions." },
        { heading: "Movements change as space changes", body: "Late in pregnancy, kicks tend to give way to rolls, stretches, and pressure rather than disappearing." },
      ],
      lessCauses: [
        { heading: "Reduced movement", body: "A real change in your baby's usual pattern of movement is one of the few signs that warrants immediate contact with your maternity unit." },
      ],
      whyItVaries: "Where the placenta sits, your body shape, your baby's position, and your own activity all change how much movement you feel.",
    },
    timing: {
      whenStarts: "First-time pregnancies usually feel movement around 18–24 weeks. Later pregnancies often feel it earlier — sometimes from 16 weeks.",
      whenPeaks: "Movement is usually strongest and most regular between around 28 and 36 weeks.",
      whenEases: "Movements don't ease before birth — they may feel different (less room) but should not become fewer.",
    },
    whatItFeelsLike: [
      "Bubbles, flutters, or popcorn at first",
      "Clearer kicks and nudges by mid-pregnancy",
      "Rolls, stretches, and pressure in the third trimester",
    ],
    whatThisMeans:
      "Your baby's movement pattern is a quiet, ongoing form of communication. Your job isn't to count perfectly — it's to know what's normal for them and to act if that changes.",
    normal: [
      "Feeling first movements anywhere from around 16 to 24 weeks",
      "Quiet stretches followed by busy ones",
      "Movements that feel different at different times of day",
      "More active when you're resting; quieter when you're moving",
    ],
    seekSupport: [
      "Reduced movements compared with what's normal for your baby",
      "Movements that feel weaker, slower, or different in pattern",
      "No movements felt for a stretch you'd usually expect to feel some",
      "Any sense that 'something feels off' about how your baby is moving",
    ],
    disclaimer: "If you're worried about your baby's movements, contact your maternity unit straight away — day or night. Do not wait until the next day, and do not wait to see if it changes. This is one of the clearest 'call now' moments in pregnancy.",
    whatYouCanDo: [
      { action: "Get to know your baby's pattern", reason: "There's no universal number — your baby's own rhythm is the reference point." },
      { action: "Don't rely on apps or counting alone", reason: "UK guidance has moved away from kick counts towards knowing your baby's pattern." },
      { action: "Call your maternity unit if anything feels different", reason: "Reduced or changed movement is taken seriously and assessed quickly." },
      { action: "Don't try to provoke movement and then go to bed reassured", reason: "If something felt off, ring even if movements then resume — your unit would rather hear from you." },
    ],
    whatHappensNext: "Most reduced-movement calls turn out to be reassuring. The reason midwives ask you to call is precisely because it's one of the few signs that, when acted on quickly, can make a real difference.",
    relatedStage: {
      intro: "Baby movement sits inside the wider Baby topic:",
      links: [
        { label: "Your baby in pregnancy", href: "/pregnancy/baby", context: "The wider topic this article belongs to." },
        { label: "How your baby develops in pregnancy", href: "/articles/how-your-baby-develops-in-pregnancy", context: "The wider arc of growth." },
        { label: "Third trimester: complete guide", href: "/articles/third-trimester-complete-guide", context: "The window where movement is most established." },
      ],
    },
    aiPrompts: [
      "When will I first feel my baby move?",
      "What does reduced movement mean?",
      "Should I count my baby's kicks?",
    ],
    captureIntro: "What movements are starting to feel like, and the small patterns you're noticing.",
    trimester: [2, 3],
    relatedSlugs: ["how-your-baby-develops-in-pregnancy", "third-trimester-complete-guide", "signs-of-labour"],
    journey: ["pregnancy"],
    topics: ["baby"],
    reviewedBy: "Jenny Joines",
    lastUpdated: "April 2026",
    keyTakeaways: [
      "Most people first feel movement between 16 and 24 weeks",
      "Movements should not reduce or stop at the end of pregnancy",
      "There's no set number — knowing your baby's own pattern is what matters",
      "Reduced or changed movement is one of the few 'call straight away' moments",
      "Maternity units would always rather you ring than wait",
    ],
    sources: [
      "NHS — Your baby's movements",
      "Tommy's — Baby's movements in pregnancy",
      "Royal College of Obstetricians and Gynaecologists — Your baby's movements",
      "Kicks Count",
      "NICE — Antenatal care",
    ],
    faq: [
      { question: "When will I first feel my baby move?", answer: "Most first-time pregnancies feel movement between around 18 and 24 weeks. If you've been pregnant before, you'll often recognise it earlier — sometimes from around 16 weeks. Where your placenta sits and your body shape can both delay or muffle the first feelings." },
      { question: "How many movements should I feel a day?", answer: "There isn't a set number. UK guidance has deliberately moved away from kick counts because babies are individual, and chasing a number can be misleading. What matters is knowing what's usual for your baby — when they tend to be busy, when they tend to be quiet — and acting if that changes." },
      { question: "Do babies move less towards the end of pregnancy?", answer: "No. This is a very common myth, and an important one to put down. Movements may feel different in late pregnancy because there's less room — more rolls and stretches, fewer big kicks — but they should not become fewer. Reduced movement at any stage of late pregnancy needs to be checked." },
      { question: "What should I do if I think movements have reduced?", answer: "Contact your maternity unit straight away — day or night. Don't wait, and don't try to wake the baby up first and then go to bed reassured. If you noticed a change, ring. Your unit would much rather assess you and find everything well than have you wait." },
      { question: "Will my unit mind me ringing?", answer: "No. Maternity units are very clear that they want to hear from you about reduced or changed movement, every time. Ringing repeatedly during pregnancy if something feels off is exactly what the system is set up for." },
    ],

    // ── Deep template fields ──
    topic: "baby",
    standfirst:
      "When movement is usually first felt, how it changes as pregnancy goes on, and the one moment where waiting isn't the right approach. A grounded, trustworthy guide.",
    editorialSections: [
      {
        id: "baby-movement-in-pregnancy",
        heading: "Baby movement in pregnancy",
        lead: "One of the most important, and most misunderstood, parts of pregnancy.",
        paragraphs: [
          "Feeling your baby move is one of the quiet milestones of pregnancy — and also one of the only ongoing signs you have of how they're doing between appointments.",
          "What follows is a calm, careful guide to when movement usually starts, how it changes through pregnancy, what variation is normal, and the one moment where waiting genuinely isn't the right approach.",
        ],
      },
      {
        id: "when-movement-is-first-felt",
        heading: "When movement is usually first felt",
        lead: "Earlier than people expect for some, later for others.",
        paragraphs: [
          "Most first-time pregnancies feel movement somewhere between 18 and 24 weeks. If you've been pregnant before, you'll often recognise the feeling earlier — sometimes from around 16 weeks — because you know what you're looking for.",
          "Where your placenta sits matters too. An anterior placenta (one at the front of your uterus) can muffle early movements and delay the first feeling. This isn't a sign of anything being wrong, just of the cushion sitting between you and your baby.",
        ],
      },
      {
        id: "how-movement-changes-over-time",
        heading: "How movement changes over time",
        lead: "From flutters to a recognisable rhythm.",
        paragraphs: [
          "Early movements are often described as bubbles, flutters, or popcorn. Through the second trimester these become clearer — kicks, nudges, the shift of a small body. By the third trimester, most babies have their own pattern: busier at certain times of day, quieter at others.",
          "As space gets tighter in late pregnancy, the type of movement changes. There are usually fewer large kicks and more rolls, stretches, and steady pressure. The frequency, however, should not reduce.",
        ],
      },
      {
        id: "what-variation-is-normal",
        heading: "What variation is normal",
        lead: "Babies are individual. Patterns are individual.",
        paragraphs: [
          "Some babies are most active in the evening; some early in the morning. Most are quieter when you're moving (you're rocking them) and busier when you're sitting or lying still. Some have long sleep stretches; some don't.",
          "What matters is your baby's own usual pattern — not anyone else's, not a number on an app. Get to know what's normal for them, and the moments that fall outside that become the ones to act on.",
        ],
      },
      {
        id: "why-movements-may-feel-different",
        heading: "Why movements may feel different on different days",
        lead: "Lots of small factors change what you feel — without changing what's happening.",
        paragraphs: [
          "Your baby's position can muffle movements. Your own activity, posture, hydration, and how much you're paying attention all change what you notice. A busy day at work may genuinely mean you've felt less because you've been distracted, not because there was less to feel.",
          "That said, the test isn't 'have I been busy enough to miss movements?' It's 'does this feel different from what's usual for my baby?' If the honest answer is yes, that's enough reason to ring.",
        ],
      },
      {
        id: "when-reduced-or-changed-movement",
        heading: "When reduced or changed movement is worth raising",
        lead: "This is one of the clearest 'call now' moments in pregnancy.",
        paragraphs: [
          "If your baby's movements feel reduced, slower, or different in pattern from what you'd usually expect — at any point in pregnancy from around 24 weeks onward — contact your maternity unit straight away, day or night.",
          "Do not wait to see if it changes. Do not try to wake the baby up and then go to bed reassured. The rule of thumb most UK maternity services share is simple: if you're not sure, ring. Even if movements resume after you noticed the change, ring.",
        ],
        callout: {
          tone: "gentle-warning",
          text: "Reduced or changed baby movement at any point in late pregnancy needs urgent assessment. Contact your maternity unit straight away, day or night. They would always rather hear from you.",
        },
      },
      {
        id: "what-to-do-if-youre-worried",
        heading: "What to do if you are worried",
        lead: "A clear, simple sequence — not a wait-and-see.",
        paragraphs: [
          "Ring your maternity assessment unit on the number in your maternity notes. They will usually ask you to come in to be checked, often with monitoring. Most of the time, this assessment is reassuring — and the reason midwives ask you to ring is precisely because acting quickly when something is off can make a real difference.",
          "Try not to use apps, kick counts, cold drinks, or sugary snacks as the test. None of these are reliable substitutes for assessment. The instinct that something feels off is itself enough.",
        ],
      },
    ],
  },

  // ─── PELVIC PAIN IN PREGNANCY ─────────────────────────────────────────────
  {
    slug: "pelvic-pain-in-pregnancy",
    title: "Pelvic pain in pregnancy: what's normal, what helps, and when to ask for support",
    metaDescription: "Pelvic pain in pregnancy explained — why it happens, what tends to be normal, what may help, and when to ask your midwife about pelvic girdle pain (PGP).",
    quickAnswer:
      "Some pelvic discomfort is very common in pregnancy as ligaments soften and the pelvis adjusts to the growing baby. Sharper, persistent or one-sided pain — especially around the pubic bone, lower back or hips, or pain that makes walking, turning in bed or climbing stairs difficult — may be pelvic girdle pain (PGP). PGP is common, treatable, and worth raising with your midwife or GP early. They can refer you to a women's health physiotherapist.",
    howThisFeels: [
      "Wincing turning over in bed",
      "A sharp twinge in the pubic bone climbing stairs",
      "Worrying that something is wrong because nobody warned you",
      "Pushing through pain because it feels small to mention",
    ],
    whatHappening: {
      commonCauses: [
        { heading: "Relaxin and softening ligaments", body: "The hormone relaxin loosens the ligaments around the pelvis to prepare for birth. This can leave the pelvis less stable and the joints more sensitive to movement." },
        { heading: "A growing, heavier uterus", body: "As the baby grows, the centre of gravity shifts and the pelvis carries more load. Posture, gait and pressure on the pelvic joints all change." },
        { heading: "Pelvic girdle pain (PGP)", body: "PGP — sometimes called SPD — affects up to 1 in 5 pregnant people. It's pain in the pelvic joints (front, back, or both) that can range from mild to genuinely limiting." },
      ],
      lessCauses: [
        { heading: "Round ligament pain", body: "Sharp, brief twinges low down or to the side, especially with sudden movement, are usually round ligament pain rather than true pelvic pain." },
        { heading: "Urinary tract infection", body: "Lower pelvic ache with stinging on weeing, needing to wee often, or cloudy urine can point to a UTI, which is more common in pregnancy and worth a quick check." },
      ],
      whyItVaries: "Some people sail through with only mild twinges. Others develop significant pelvic girdle pain. Severity isn't a measure of how well your pregnancy is going — it reflects how your particular body responds to the hormonal and mechanical changes.",
    },
    timing: {
      whenStarts: "Mild pelvic discomfort can begin in the second trimester. PGP often shows up from around 14–20 weeks, though it can start earlier or later.",
      whenPeaks: "Symptoms tend to feel most intense in the third trimester as the baby grows and the pelvis carries more weight.",
      whenEases: "Most pelvic pain eases significantly in the days and weeks after birth as hormones settle and load reduces. A small number of people need physio support for longer — that's normal and treatable.",
    },
    whatItFeelsLike: [
      "A grinding or clicking feeling in the pubic bone",
      "Pain in the lower back, hips, or perineum",
      "Difficulty turning in bed, getting in and out of the car, or climbing stairs",
      "Pain that's worse on one side than the other",
    ],
    whatThisMeans:
      "Pelvic pain doesn't mean you're doing pregnancy wrong, and it doesn't mean anything is wrong with the baby. It's a sign your pelvis is adapting — and if it crosses into PGP, it's a sign you'd benefit from physio input.",
    normal: [
      "Mild aching around the pelvis as pregnancy progresses",
      "Occasional twinges with sudden movement",
      "Discomfort that improves with rest and position changes",
    ],
    seekSupport: [
      "Pain that limits walking, climbing stairs, or turning in bed",
      "Pain that's getting steadily worse rather than easing with rest",
      "Pain with fever, unusual discharge, or stinging on weeing",
      "Severe one-sided pain, especially in early pregnancy (to rule out other causes)",
    ],
    disclaimer: "This is general guidance. Pelvic pain is well-recognised in pregnancy and your midwife will take it seriously — please raise it rather than wait. Severe or worsening pain, bleeding, or pain with fever needs same-day medical assessment.",
    whatYouCanDo: [
      { action: "Ask your midwife for a women's health physio referral", reason: "PGP responds well to physio — exercises, advice, and sometimes a support belt can make a real difference." },
      { action: "Move little and often", reason: "Avoid long periods of standing and avoid pushing through pain. Sit to put on trousers, keep knees together when turning in bed." },
      { action: "Use pillows for support at night", reason: "A pillow between the knees keeps the pelvis aligned and reduces pain on turning." },
      { action: "Pace activity", reason: "Identify what makes pain worse (often stairs, asymmetric movements, lifting toddlers) and reduce it where you can." },
    ],
    whatHappensNext: "With physio input, many people manage pelvic pain well through pregnancy and recover fully after birth. Raising it early gives you the best chance of staying mobile and comfortable.",
    relatedStage: {
      intro: "Pelvic pain sits alongside the broader story of how your body changes:",
      links: [
        { label: "Your body in pregnancy", href: "/pregnancy/body", context: "The wider topic this article belongs to." },
        { label: "Back pain in pregnancy", href: "/articles/back-pain-in-pregnancy", context: "Often travels with pelvic pain — same advice applies." },
        { label: "Round ligament pain", href: "/articles/round-ligament-pain", context: "Sharper, briefer twinges that aren't the same as PGP." },
        { label: "Sleep in pregnancy", href: "/articles/sleep-in-pregnancy", context: "Position and pillows make a real difference." },
      ],
    },
    aiPrompts: [
      "Could this pelvic pain be PGP?",
      "What can a physio actually do for pelvic pain in pregnancy?",
      "When is pelvic pain something to ring the midwife about?",
    ],
    captureIntro: "Pelvic pain is one of the parts of pregnancy that can quietly limit a lot. Worth noting how it really is — it helps when you're talking to your midwife.",
    trimester: [2, 3],
    relatedSlugs: ["back-pain-in-pregnancy", "round-ligament-pain", "sleep-in-pregnancy"],
    journey: ["pregnancy"],
    topics: ["body", "symptoms"],
    reviewedBy: "Jenny Joines",
    lastUpdated: "April 2026",
    keyTakeaways: [
      "Some pelvic discomfort is very common as ligaments soften and the pelvis adjusts",
      "Pelvic girdle pain (PGP) affects up to 1 in 5 pregnant people and is treatable",
      "A women's health physio is the most useful referral — ask early",
      "Side-sleeping with a pillow between the knees and avoiding asymmetric movement helps",
      "Severe, worsening, or one-sided pain — or pain with fever or bleeding — needs medical assessment",
    ],
    sources: [
      "NHS — Pelvic pain in pregnancy",
      "Pelvic Obstetric & Gynaecological Physiotherapy (POGP) — Pregnancy-related PGP",
      "Royal College of Obstetricians and Gynaecologists — Pelvic girdle pain",
      "NICE — Antenatal care",
    ],
    faq: [
      { question: "Is pelvic pain in pregnancy normal?", answer: "Mild discomfort is very common. Pain that limits walking, turning in bed, or climbing stairs isn't something to push through — it's usually pelvic girdle pain (PGP) and responds well to physiotherapy." },
      { question: "What is PGP or SPD?", answer: "Pelvic girdle pain (sometimes called symphysis pubis dysfunction) is pain in the joints of the pelvis caused by hormonal softening and changing load. It affects up to 1 in 5 pregnancies and is well-recognised, with established treatment." },
      { question: "Can I still exercise with pelvic pain?", answer: "Often yes, but with adjustments. A women's health physio can guide you toward movement that supports the pelvis (gentle, symmetrical) and away from movement that aggravates it (deep squats, asymmetric loading)." },
      { question: "Will pelvic pain affect my birth?", answer: "PGP doesn't usually prevent a vaginal birth, but it's worth discussing comfortable positions for labour with your midwife. A note in your maternity notes can help the team support you." },
      { question: "Will it go after birth?", answer: "For most people, yes — significantly within days to weeks. A small number need ongoing physio. Recovery is the rule, not the exception." },
    ],
    topic: "body",
    standfirst: "Pelvic pain in pregnancy is common, often misunderstood, and almost always worth mentioning. A calm look at what's normal, what may be PGP, and what genuinely helps.",
    editorialSections: [
      {
        id: "what-pelvic-pain-is",
        heading: "What pelvic pain in pregnancy actually is",
        lead: "From a mild ache to something that makes turning in bed difficult — pelvic pain has a wide range, and most of it is well understood.",
        paragraphs: [
          "The pelvis is built to carry weight and absorb movement. In pregnancy, the hormone relaxin softens the ligaments that hold the pelvic joints together, so the pelvis can open during birth. That softening is doing exactly what it's meant to — but it can leave the joints more sensitive and less stable in the meantime.",
          "Add to that a baby growing, a uterus getting heavier, and a centre of gravity that's quietly shifting, and it's no surprise that the pelvis sometimes complains. Most of what people describe as 'pelvic pain' in pregnancy belongs to one of two stories: general pregnancy aches, or pelvic girdle pain (PGP).",
        ],
      },
      {
        id: "pgp",
        heading: "Pelvic girdle pain (PGP), explained",
        lead: "PGP is common, recognised, and treatable. It's not a sign anything is wrong with the pregnancy.",
        paragraphs: [
          "PGP affects up to 1 in 5 pregnant people. It's pain in one or more of the pelvic joints — the pubic bone at the front, the sacroiliac joints at the back, or both. It can be mild and intermittent, or significant enough to affect walking, sleeping, and getting through the day.",
          "Tell-tale signs: pain on climbing stairs, turning in bed, getting in and out of a car, or standing on one leg (putting on trousers). A grinding or clicking in the pubic bone. Pain that's worse on one side. None of these mean anything is wrong with your baby — they mean your pelvis would benefit from physio support.",
        ],
        callout: { tone: "info", text: "If walking, stairs, or turning in bed is difficult, ask your midwife to refer you to a women's health physiotherapist. The earlier, the better." },
      },
      {
        id: "what-helps",
        heading: "What genuinely helps",
        lead: "Small changes in how you move can make a real difference.",
        paragraphs: [
          "Move little and often. Avoid long periods of standing or sitting. When turning in bed, keep your knees together. When getting out of the car, swing both legs round together rather than one at a time. Sit to put on trousers and shoes.",
          "At night, a pillow between the knees keeps the pelvis aligned and reduces pain on turning. A pregnancy support belt can help some people; a physio is the right person to recommend whether it's worth trying.",
          "Avoid pushing through pain. PGP responds badly to 'just getting on with it' and well to pacing.",
        ],
      },
      {
        id: "when-to-raise-it",
        heading: "When to raise it",
        paragraphs: [
          "Tell your midwife if pelvic pain is limiting walking, turning in bed, or climbing stairs — or if it's getting steadily worse. They can refer you to physiotherapy and add a note to your maternity record so the team supporting you in labour know.",
          "Pain with fever, unusual discharge, stinging on weeing, or bleeding is different and needs same-day assessment — it usually points to something other than PGP.",
        ],
      },
    ],
  },

  // ─── ROUND LIGAMENT PAIN ──────────────────────────────────────────────────
  {
    slug: "round-ligament-pain",
    title: "Round ligament pain in pregnancy: sharp twinges explained",
    metaDescription: "Round ligament pain explained — why those sharp, brief twinges happen in pregnancy, when they tend to start, and when to mention them to your midwife.",
    quickAnswer:
      "Round ligament pain is a sharp, brief twinge — usually low down on one side of the bump — caused by the ligaments that support the uterus stretching as the baby grows. It's most common in the second trimester, often triggered by sudden movements like coughing, sneezing or standing up quickly. It's harmless, though it can feel alarming the first few times. Persistent, severe, or one-sided pain that doesn't ease — especially with bleeding or fever — should always be checked.",
    howThisFeels: [
      "A sudden sharp pull when you sneeze",
      "Worrying for a moment, then realising it's gone",
      "Wondering whether to ring the midwife about something so brief",
    ],
    whatHappening: {
      commonCauses: [
        { heading: "Stretching ligaments", body: "Two thick bands of tissue (the round ligaments) hold the uterus in place. As the uterus grows, they stretch — and a sudden movement can pull them sharply." },
        { heading: "Sudden movement", body: "Coughing, sneezing, laughing, standing up quickly, or rolling over in bed are common triggers." },
      ],
      lessCauses: [
        { heading: "Pelvic girdle pain", body: "Persistent or load-related pain in the pubic bone, lower back, or hips is more likely PGP than round ligament pain." },
        { heading: "Other causes of one-sided pain", body: "In early pregnancy, severe one-sided pain — especially with bleeding or shoulder-tip pain — can occasionally point to other causes and needs assessment." },
      ],
      whyItVaries: "Some people barely notice round ligament pain. Others find it striking. Both are normal — the experience isn't a measure of how the pregnancy is going.",
    },
    timing: {
      whenStarts: "Most often noticed from around 14–20 weeks, as the uterus rises out of the pelvis.",
      whenPeaks: "Tends to be most noticeable in the second trimester.",
      whenEases: "Often becomes less common in the third trimester as the uterus settles into a more stable position.",
    },
    whatItFeelsLike: [
      "A sharp pull or stab low down on one side",
      "A pain that lasts seconds rather than minutes",
      "Triggered by movement, then quickly gone",
    ],
    whatThisMeans: "Round ligament pain is a sign of growth, not of anything going wrong. The sharpness can be alarming, but the briefness is reassuring — it's the muscle equivalent of a quick stretch.",
    normal: [
      "A brief sharp twinge with sudden movement",
      "Pain that eases within seconds and doesn't return immediately",
      "Pain that responds to changing position or moving slowly",
    ],
    seekSupport: [
      "Pain that's persistent, severe, or doesn't ease",
      "Pain with bleeding, fever, or unusual discharge",
      "Pain that builds and tightens (could be contractions)",
      "Pain with shoulder-tip pain, dizziness, or fainting (early pregnancy)",
    ],
    disclaimer: "This is general guidance. Any pain that worries you is worth raising with your midwife — they'd far rather hear about it than not.",
    whatYouCanDo: [
      { action: "Move slowly", reason: "Standing up gradually, rolling rather than jerking out of bed, and bracing for sneezes can reduce twinges." },
      { action: "Change position", reason: "If a twinge happens, gently shift position — often the pain settles within seconds." },
      { action: "Support the bump when needed", reason: "A hand under the bump when sneezing or coughing can reduce the pull." },
    ],
    whatHappensNext: "Round ligament pain usually fades into the background as pregnancy progresses. If pain is changing in character — becoming persistent, tightening, or paired with other symptoms — that's worth a check.",
    relatedStage: {
      intro: "Round ligament pain sits within the wider picture of how your body adapts:",
      links: [
        { label: "Your body in pregnancy", href: "/pregnancy/body", context: "The wider topic this article belongs to." },
        { label: "Pelvic pain in pregnancy", href: "/articles/pelvic-pain-in-pregnancy", context: "When pain is more sustained or load-related." },
        { label: "Braxton Hicks contractions", href: "/articles/braxton-hicks-contractions", context: "How tightening compares to a sharp twinge." },
      ],
    },
    aiPrompts: [
      "Is this twinge round ligament pain?",
      "Why does it hurt sharply when I sneeze?",
      "When is one-sided pain something to ring about?",
    ],
    captureIntro: "The first time round ligament pain happens, it can feel like something's wrong. Worth noting how it actually goes — it's reassuring to look back on.",
    trimester: [2],
    relatedSlugs: ["pelvic-pain-in-pregnancy", "braxton-hicks-contractions", "back-pain-in-pregnancy"],
    journey: ["pregnancy"],
    topics: ["body", "symptoms"],
    reviewedBy: "Jenny Joines",
    lastUpdated: "April 2026",
    keyTakeaways: [
      "Round ligament pain is a sharp, brief twinge from stretching ligaments — usually harmless",
      "It's most common in the second trimester and often triggered by sudden movement",
      "Moving slowly and supporting the bump when sneezing or coughing can help",
      "Persistent, severe, or one-sided pain — especially with bleeding or fever — needs checking",
    ],
    sources: [
      "NHS — Common health problems in pregnancy",
      "Royal College of Obstetricians and Gynaecologists — Pregnancy-related pain",
      "NICE — Antenatal care",
    ],
    faq: [
      { question: "What does round ligament pain feel like?", answer: "A sharp, brief twinge — usually low down on one side of the bump. It's typically triggered by sudden movement and eases within seconds." },
      { question: "Is round ligament pain dangerous?", answer: "No — it's a normal part of growth. The sharpness can be alarming, but the briefness is reassuring. If pain is persistent, severe, or paired with bleeding or fever, that's different and needs checking." },
      { question: "Can I do anything to prevent it?", answer: "Move slowly, brace gently for sneezes and coughs, and shift position when you feel it coming. It tends to ease as the uterus stabilises in the third trimester." },
      { question: "How is it different from contractions?", answer: "Round ligament pain is sharp and brief, triggered by movement. Contractions tighten the whole bump, last longer, and come in a rhythm. If you're unsure, ring your maternity unit." },
    ],
    topic: "body",
    standfirst: "Round ligament pain is one of those pregnancy symptoms that can be alarming the first time — and ordinary the moment you understand what it is.",
    editorialSections: [
      {
        id: "what-it-is",
        heading: "What round ligament pain is",
        paragraphs: [
          "Two thick bands of tissue called the round ligaments hold the uterus in place. As the uterus grows, those ligaments stretch. A sudden movement — a sneeze, a cough, getting out of a chair too fast — can pull them sharply, and that's what you feel.",
          "It's most often described as a brief, sharp pull low down on one side of the bump. It lasts seconds, not minutes, and usually eases the moment you change position.",
        ],
      },
      {
        id: "when-it-happens",
        heading: "When it tends to happen",
        paragraphs: [
          "Round ligament pain is most often noticed from around 14–20 weeks, as the uterus rises out of the pelvis and the ligaments are doing more work. It tends to fade into the background later in pregnancy.",
          "Some people get it often, others almost never. Both are normal.",
        ],
      },
      {
        id: "what-helps",
        heading: "What helps",
        paragraphs: [
          "Move more slowly. Stand up gradually rather than jumping. Roll onto your side and use your arms to push up out of bed, rather than sitting straight up. When a sneeze or cough is coming, brace your bump gently with a hand.",
          "If a twinge happens, change position — bend forward slightly, or shift your weight to the opposite side. The pain almost always eases within seconds.",
        ],
      },
      {
        id: "when-to-mention-it",
        heading: "When to mention it",
        paragraphs: [
          "Round ligament pain itself doesn't usually need raising. But pain that's persistent, severe, or one-sided — especially with bleeding, fever, dizziness, or shoulder-tip pain — is different and needs same-day assessment.",
          "If you're ever unsure whether what you're feeling is round ligament pain or something else, ring your midwife or maternity assessment unit. That's exactly what they're there for.",
        ],
      },
    ],
  },

  // ─── BRAXTON HICKS CONTRACTIONS ───────────────────────────────────────────
  {
    slug: "braxton-hicks-contractions",
    title: "Braxton Hicks contractions: what they feel like and how to tell them apart from labour",
    metaDescription: "Braxton Hicks contractions explained — what they feel like, when they start, how to tell them apart from real labour, and when to ring your maternity unit.",
    quickAnswer:
      "Braxton Hicks contractions are 'practice' tightenings of the uterus. They're irregular, usually painless or mildly uncomfortable, don't get stronger or closer together, and tend to ease with rest, hydration, or changing position. Real labour contractions, by contrast, become more regular, longer, stronger, and don't ease with rest. If you're unsure — especially before 37 weeks, or with any bleeding, reduced movements, or waters breaking — ring your maternity unit.",
    howThisFeels: [
      "The bump going hard for a moment, then softening",
      "Wondering 'was that one?'",
      "Counting and timing, just in case",
      "The constant background question of whether labour is starting",
    ],
    whatHappening: {
      commonCauses: [
        { heading: "Uterine practice", body: "The uterus is a muscle. Throughout pregnancy, it tightens and releases — sometimes you feel it, sometimes you don't. These are Braxton Hicks." },
        { heading: "Activity, dehydration, or a full bladder", body: "Braxton Hicks often follow a busy day, not enough fluids, or a stretched bladder. The body is asking for a pause." },
        { heading: "Movement of baby or you", body: "Position changes — yours or the baby's — can trigger a tightening." },
      ],
      lessCauses: [
        { heading: "Early labour", body: "Some 'practice' contractions later in pregnancy quietly turn into early labour. The change is usually gradual and recognisable: more regular, longer, stronger." },
        { heading: "Premature labour", body: "Before 37 weeks, regular tightenings — especially with pressure, backache, or any bleeding — should be checked promptly." },
      ],
      whyItVaries: "Some people feel Braxton Hicks from around 20 weeks. Others barely notice them until the very end. Both are normal — and how often you feel them isn't a sign of how labour will go.",
    },
    timing: {
      whenStarts: "Often felt from around the second trimester onward, sometimes earlier in second pregnancies.",
      whenPeaks: "Usually most noticeable in the third trimester, especially the final weeks.",
      whenEases: "Braxton Hicks themselves don't 'end' — they merge into the lead-up to labour or quietly continue until birth.",
    },
    whatItFeelsLike: [
      "A tightening across the whole bump that lasts 30–60 seconds",
      "Irregular and unpredictable",
      "Uncomfortable rather than painful for most people",
      "Easing with rest, water, or a position change",
    ],
    whatThisMeans: "Braxton Hicks aren't a warning. They're the uterus doing what it does — tightening and releasing. They don't cause harm and they don't predict when labour will start.",
    normal: [
      "Irregular tightenings that don't follow a pattern",
      "Tightenings that ease with rest or hydration",
      "More frequent tightenings after activity or in the evening",
    ],
    seekSupport: [
      "Regular tightenings before 37 weeks",
      "Tightenings with any bleeding, fluid leaking, or reduced movements",
      "Pain that doesn't ease and is becoming stronger or more frequent",
      "Any contractions that worry you — ring your maternity unit",
    ],
    disclaimer: "This is general guidance. If you're ever unsure whether what you're feeling is Braxton Hicks or labour, ring your maternity assessment unit. That's what they're there for.",
    whatYouCanDo: [
      { action: "Drink water", reason: "Mild dehydration is one of the most common triggers — a glass of water often calms things down." },
      { action: "Change position or rest", reason: "If you've been on your feet, sit or lie down. If you've been still, gentle movement can help." },
      { action: "Empty your bladder", reason: "A full bladder can trigger tightenings — emptying it sometimes settles them." },
      { action: "Time them if you're unsure", reason: "Note when each one starts, how long it lasts, and how strong it feels. Real labour gets longer, stronger, and closer together. Braxton Hicks don't." },
    ],
    whatHappensNext: "Braxton Hicks themselves don't lead anywhere — but in the final weeks, they often merge into the body's lead-up to labour. Knowing the difference helps you trust what you're feeling.",
    relatedStage: {
      intro: "Tightenings sit within the wider picture of late pregnancy:",
      links: [
        { label: "Signs of labour", href: "/articles/signs-of-labour", context: "How real labour starts and what it feels like." },
        { label: "When to go in for labour", href: "/articles/when-to-go-in-for-labour", context: "When tightenings mean it's time to ring." },
        { label: "Third trimester: complete guide", href: "/articles/third-trimester-complete-guide", context: "The wider arc of the final weeks." },
      ],
    },
    aiPrompts: [
      "How do I tell Braxton Hicks from labour?",
      "Are Braxton Hicks supposed to hurt?",
      "When should I ring about tightenings?",
    ],
    captureIntro: "The 'is this it?' moments of late pregnancy are worth noting, even if they turn out to be nothing. They're part of how the body prepares.",
    trimester: [2, 3],
    relatedSlugs: ["signs-of-labour", "when-to-go-in-for-labour", "stages-of-labour"],
    journey: ["pregnancy"],
    topics: ["body", "symptoms", "labour"],
    reviewedBy: "Jenny Joines",
    lastUpdated: "April 2026",
    keyTakeaways: [
      "Braxton Hicks are irregular practice tightenings — usually painless and harmless",
      "They don't get longer, stronger, or closer together; real labour does",
      "Hydration, rest, and emptying your bladder often settle them",
      "Regular tightenings before 37 weeks, or with bleeding, fluid, or reduced movements, need urgent assessment",
      "If you're ever unsure, ring your maternity unit — it's exactly what they're there for",
    ],
    sources: [
      "NHS — Signs that labour has begun",
      "Royal College of Midwives — Care in labour",
      "NICE — Intrapartum care for healthy women",
      "Tommy's — Braxton Hicks contractions",
    ],
    faq: [
      { question: "What do Braxton Hicks feel like?", answer: "Most people describe a tightening across the whole bump that lasts 30–60 seconds. It's usually uncomfortable rather than painful, and it eases with rest, water, or a change in position." },
      { question: "When do Braxton Hicks start?", answer: "Many people start noticing them in the second trimester, though they can be present from earlier. They tend to become more obvious in the third trimester." },
      { question: "How are Braxton Hicks different from labour?", answer: "Braxton Hicks are irregular and don't get stronger over time. Real labour contractions become more regular, longer, stronger, and don't ease with rest, hydration, or a position change." },
      { question: "Should I worry if I never feel Braxton Hicks?", answer: "No. Some people barely notice them. Others feel them often. Neither is a sign of how labour will go." },
      { question: "When should I ring about tightenings?", answer: "Before 37 weeks, any regular tightenings should be checked. At any stage, ring if you have bleeding, fluid leaking, reduced baby movements, or pain that's getting steadily worse." },
    ],
    topic: "body",
    standfirst: "Practice contractions confuse a lot of people in the third trimester — and the difference between them and real labour is genuinely useful to know.",
    editorialSections: [
      {
        id: "what-they-are",
        heading: "What Braxton Hicks are",
        paragraphs: [
          "The uterus is a muscle, and like any muscle, it contracts and relaxes throughout pregnancy. Most of these contractions you'll never feel. Some you will — and those are what we call Braxton Hicks.",
          "They're often described as a tightening across the whole bump that lasts 30–60 seconds. The bump goes firm, then softens. Most people find them uncomfortable rather than painful.",
        ],
      },
      {
        id: "telling-them-apart",
        heading: "How to tell them apart from labour",
        lead: "There's a recognisable difference, and once you know it, the 'is this it?' moments get easier.",
        paragraphs: [
          "Braxton Hicks are irregular. They don't follow a pattern, and they don't get longer, stronger, or closer together. They often ease with rest, water, or a change in position.",
          "Real labour contractions do the opposite. They become more regular, longer (often building from 30 seconds toward a minute or more), stronger, and closer together. They don't stop when you change position or hydrate.",
          "If you're timing them and they're staying irregular and not intensifying, they're almost certainly Braxton Hicks. If they're settling into a rhythm and getting more intense, that's labour finding its feet.",
        ],
        callout: { tone: "info", text: "If you're ever unsure — especially before 37 weeks or with any bleeding, fluid, or reduced movements — ring your maternity unit. That's exactly what they're for." },
      },
      {
        id: "what-helps",
        heading: "What helps when they're frequent",
        paragraphs: [
          "Drink water. Mild dehydration is one of the most common triggers, and a glass of water often calms things. Empty your bladder. Sit or lie down if you've been on your feet, or move gently if you've been still. Most Braxton Hicks settle within minutes once you've changed something.",
        ],
      },
      {
        id: "when-to-ring",
        heading: "When to ring",
        paragraphs: [
          "Before 37 weeks, regular tightenings should always be checked — they can be a sign of premature labour. At any stage, contractions paired with bleeding, fluid leaking, reduced baby movements, or pain that won't ease need urgent assessment.",
          "Trust your instincts. If something feels off, ring. The maternity team would much rather hear from you about something that turns out to be nothing than the other way around.",
        ],
      },
    ],
  },

  // ─── SHORTNESS OF BREATH IN PREGNANCY ─────────────────────────────────────
  {
    slug: "shortness-of-breath-in-pregnancy",
    title: "Shortness of breath in pregnancy: why it happens and when to mention it",
    metaDescription: "Why pregnancy makes you breathless, when it tends to start, what helps, and the signs that mean breathlessness needs urgent medical attention.",
    quickAnswer:
      "Mild breathlessness is very common in pregnancy. Hormones (especially progesterone) change how you breathe, and later on the growing uterus reduces space for the lungs to expand. Most pregnancy breathlessness is gentle and worse with effort or lying flat. Sudden severe breathlessness, breathlessness with chest pain, fast heartbeat, coughing up blood, or one-sided leg swelling and pain is different — and needs urgent medical assessment.",
    howThisFeels: [
      "Out of breath walking up familiar stairs",
      "Sighing more than usual without realising",
      "Worrying that something's wrong with your heart",
      "Trying to talk on the phone and running out of air",
    ],
    whatHappening: {
      commonCauses: [
        { heading: "Progesterone", body: "Progesterone increases your breathing rate and the depth of each breath, even from very early pregnancy. The result can be a feeling of breathlessness even when oxygen levels are fine." },
        { heading: "A growing uterus", body: "From the second half of pregnancy, the uterus pushes upward against the diaphragm, reducing the space the lungs have to expand." },
        { heading: "Higher demand", body: "Your blood volume increases by around 50% in pregnancy. Your heart and lungs are doing more work — breathlessness on stairs or hills is normal." },
      ],
      lessCauses: [
        { heading: "Anaemia", body: "Low iron is common in pregnancy and can make breathlessness more pronounced. A simple blood test checks for it." },
        { heading: "Asthma flare", body: "Pregnancy can change how asthma behaves — for some better, for some worse. Worth raising if symptoms are changing." },
        { heading: "Less common but serious causes", body: "Pulmonary embolism (a blood clot in the lung) is rare but more likely in pregnancy. Sudden severe breathlessness, chest pain, or leg swelling needs immediate assessment." },
      ],
      whyItVaries: "Breathlessness varies with fitness, body shape, baby position, iron levels, and how much progesterone you're particularly sensitive to. Some people barely notice it; others find it striking.",
    },
    timing: {
      whenStarts: "Some breathlessness can begin early in the first trimester due to progesterone, before the bump shows.",
      whenPeaks: "Often most noticeable in the third trimester, when the uterus presses on the diaphragm.",
      whenEases: "Many people notice an easing in the final weeks as the baby drops into the pelvis. It usually settles quickly after birth.",
    },
    whatItFeelsLike: [
      "Needing to take a bigger breath partway through a sentence",
      "Getting puffed on familiar stairs",
      "Feeling slightly short of breath even at rest",
      "Difficulty lying flat — needing pillows to prop up",
    ],
    whatThisMeans: "Mild, gradual breathlessness is part of how the body adapts. It isn't a sign your heart or lungs aren't coping — it's a sign hormones and physical changes are doing their job.",
    normal: [
      "Mild breathlessness that comes on with effort and eases with rest",
      "Needing to sit up rather than lie flat",
      "Slight breathlessness while talking, especially later on",
    ],
    seekSupport: [
      "Sudden, severe breathlessness — call 999 or go to A&E",
      "Breathlessness with chest pain, palpitations, or fainting",
      "Breathlessness with one-sided leg swelling, redness, or pain",
      "Coughing up blood",
      "Worsening breathlessness at rest, or that wakes you at night",
      "Breathlessness with a known asthma flare or chest infection",
    ],
    disclaimer: "Pregnancy increases the risk of blood clots, including in the lungs. Sudden or severe breathlessness must always be treated as urgent. Don't wait — call 999 or go straight to A&E.",
    whatYouCanDo: [
      { action: "Slow down", reason: "Take stairs more slowly, pause partway, and don't rush. Your body is doing more work than usual." },
      { action: "Sit upright", reason: "Sitting tall — and using pillows to prop up at night — gives the lungs more room to expand." },
      { action: "Sleep on your side with extra pillows", reason: "Side-sleeping with the upper body slightly raised can ease night-time breathlessness." },
      { action: "Mention it at your antenatal appointments", reason: "Your midwife may check your iron levels — anaemia is common and treatable." },
    ],
    whatHappensNext: "Breathlessness usually eases significantly within the first days after birth. If it persists, or returns suddenly after birth, that's worth raising urgently — postnatal blood clots are also more likely than at other times.",
    relatedStage: {
      intro: "Breathlessness sits within the wider picture of how the body adapts:",
      links: [
        { label: "Your body in pregnancy", href: "/pregnancy/body", context: "The wider topic this article belongs to." },
        { label: "Sleep in pregnancy", href: "/articles/sleep-in-pregnancy", context: "Position and propping up can ease night breathlessness." },
        { label: "Anxiety in pregnancy", href: "/articles/anxiety-in-pregnancy", context: "Breathlessness can trigger anxiety, and anxiety can heighten it." },
      ],
    },
    aiPrompts: [
      "Why am I so breathless going up stairs?",
      "Is breathlessness in pregnancy a sign of something serious?",
      "What can I do to ease breathlessness at night?",
    ],
    captureIntro: "The way the body works harder in pregnancy — including just to breathe — is worth noticing. Quietly extraordinary.",
    trimester: [1, 2, 3],
    relatedSlugs: ["sleep-in-pregnancy", "fatigue-in-early-pregnancy", "anxiety-in-pregnancy"],
    journey: ["pregnancy"],
    topics: ["body", "symptoms"],
    reviewedBy: "Jenny Joines",
    lastUpdated: "April 2026",
    keyTakeaways: [
      "Mild breathlessness is very common in pregnancy and usually starts in the first trimester",
      "Progesterone changes how you breathe; the growing uterus later reduces lung space",
      "Slowing down, sitting upright, and propping up at night all help",
      "Sudden severe breathlessness, chest pain, or one-sided leg swelling is an emergency — call 999",
      "Anaemia is common and treatable; mention persistent breathlessness at antenatal appointments",
    ],
    sources: [
      "NHS — Common health problems in pregnancy",
      "Royal College of Obstetricians and Gynaecologists — Reducing the risk of venous thromboembolism in pregnancy",
      "NICE — Antenatal care",
      "Tommy's — Breathlessness in pregnancy",
    ],
    faq: [
      { question: "Is it normal to be breathless in early pregnancy?", answer: "Yes. Progesterone changes your breathing pattern from very early on, before there's any bump. Mild breathlessness in the first trimester is common." },
      { question: "When should breathlessness be a worry?", answer: "Sudden severe breathlessness, breathlessness with chest pain or palpitations, coughing up blood, or breathlessness with one-sided leg swelling needs immediate medical attention — call 999 or go to A&E." },
      { question: "Can anaemia cause breathlessness?", answer: "Yes. Iron levels often dip in pregnancy and can intensify breathlessness. A simple blood test at your antenatal appointment checks for it." },
      { question: "Why is it worse at night?", answer: "Lying flat reduces the space your lungs have to expand. Side-sleeping with extra pillows under your upper body usually helps." },
      { question: "Will it ease at the end?", answer: "Often yes — when the baby drops into the pelvis in the final weeks, there can be more room to breathe. It usually settles quickly after birth." },
    ],
    topic: "body",
    standfirst: "Breathlessness in pregnancy is one of those symptoms that can quietly worry people. A clear look at why it happens — and the few signs that mean it needs more than reassurance.",
    editorialSections: [
      {
        id: "why",
        heading: "Why pregnancy makes you breathless",
        paragraphs: [
          "Progesterone, the hormone that climbs through pregnancy, changes the way you breathe. It increases both the rate and depth of each breath, almost without you noticing. The result is that even early on — before there's any bump — many people feel a little breathless.",
          "Later, the growing uterus pushes upward against the diaphragm, the muscle the lungs sit on. There's less room for the lungs to expand fully, and breathlessness becomes more obvious, especially on stairs, hills, or lying flat.",
          "Add to that a 50% increase in blood volume and a heart that's working harder, and breathlessness in pregnancy makes physical sense. It usually isn't a sign anything is wrong.",
        ],
      },
      {
        id: "what-helps",
        heading: "What helps",
        paragraphs: [
          "Slow down. Take stairs in stages and pause partway if you need. Sit upright when you can — slumping presses on the diaphragm. At night, prop yourself up with extra pillows and sleep on your side; lying flat is often the worst position.",
          "Mention breathlessness at antenatal appointments. Your midwife may check your iron — anaemia is common in pregnancy and can intensify symptoms, and it's easy to treat.",
        ],
      },
      {
        id: "when-it-needs-urgent-care",
        heading: "When breathlessness needs urgent care",
        lead: "Most pregnancy breathlessness is harmless. A small set of signs are not — and knowing them matters.",
        paragraphs: [
          "Pregnancy raises the risk of blood clots, including pulmonary embolism (a clot in the lung). Sudden severe breathlessness, breathlessness with chest pain or palpitations, coughing up blood, or breathlessness with one-sided leg swelling, redness, or pain needs immediate medical attention. Call 999 or go straight to A&E.",
          "Worsening breathlessness at rest, breathlessness that wakes you at night, or breathlessness with an asthma flare or chest infection is also worth contacting your midwife or GP about same-day.",
        ],
        callout: { tone: "gentle-warning", text: "Sudden severe breathlessness in pregnancy is a 999 call — not a 'wait and see'. The risk of blood clots is small but real, and acting quickly matters." },
      },
    ],
  },

  // ─── SWELLING IN PREGNANCY ────────────────────────────────────────────────
  {
    slug: "swelling-in-pregnancy",
    title: "Swelling in pregnancy: ankles, feet, hands, and when to ring your midwife",
    metaDescription: "Why swelling happens in pregnancy, what's usually normal, what helps, and the signs of swelling that mean urgent assessment for pre-eclampsia.",
    quickAnswer:
      "Some swelling — especially in the ankles, feet and hands — is very common from the second half of pregnancy. It's caused by extra fluid, increased blood volume, and the weight of the uterus slowing return flow from the legs. Mild swelling that's worse at the end of the day and eases overnight is usually normal. Sudden swelling of the face, around the eyes, or rapid swelling of the hands — especially with headache, vision changes, or upper-tummy pain — can be a sign of pre-eclampsia and needs urgent assessment.",
    howThisFeels: [
      "Rings that suddenly won't come off",
      "Shoes that don't fit by the evening",
      "Worrying every time you check your ankles",
      "Wondering whether to mention something so 'normal'",
    ],
    whatHappening: {
      commonCauses: [
        { heading: "Increased fluid", body: "Pregnancy increases the amount of fluid in the body by about 50%. Some of that fluid sits in the tissues, particularly in the lower body where gravity pulls it." },
        { heading: "Pressure from the uterus", body: "The growing uterus presses on the large veins that return blood from the legs, slowing the flow back up. Fluid pools more easily in the ankles and feet." },
        { heading: "Hormones and tissue softening", body: "Pregnancy hormones soften tissues, which makes it easier for fluid to move into them and harder to move back out." },
      ],
      lessCauses: [
        { heading: "Pre-eclampsia", body: "Sudden swelling of the face, around the eyes, or rapid swelling of the hands — especially with headache, vision changes, or upper-tummy pain — can be a sign of pre-eclampsia. It needs urgent assessment." },
        { heading: "Blood clot (DVT)", body: "One-sided leg swelling, redness, warmth, or calf pain — different from the gentle even swelling of both legs — needs same-day medical attention." },
      ],
      whyItVaries: "Swelling depends on the weather, how much you've been on your feet, how much salt you've had, your particular circulation, and how late in pregnancy you are. Hot weather and long days standing make it worse for nearly everyone.",
    },
    timing: {
      whenStarts: "Often noticed from around 22–28 weeks, sometimes earlier in second pregnancies.",
      whenPeaks: "Usually most pronounced in the final weeks of pregnancy.",
      whenEases: "Most swelling settles within days to a couple of weeks after birth as the body sheds the extra fluid.",
    },
    whatItFeelsLike: [
      "Tight rings or shoes",
      "Puffy ankles by the end of the day",
      "Indentations from socks that take a while to fade",
      "Feet that feel heavy and ache after standing",
    ],
    whatThisMeans: "Most pregnancy swelling is the body managing extra fluid in a body that's also under more physical pressure. It's not a sign of damage.",
    normal: [
      "Mild swelling of feet, ankles, and lower legs",
      "Swelling that's worse by the evening and eases overnight",
      "Swelling that responds to elevation and rest",
    ],
    seekSupport: [
      "Sudden swelling of the face, around the eyes, or hands",
      "Swelling with severe headache, vision changes, or upper-tummy pain",
      "One-sided leg swelling — especially with redness, warmth, or pain",
      "Swelling that's getting rapidly worse",
    ],
    disclaimer: "Pre-eclampsia and DVT are uncommon but serious. The patterns above are not subtle, and ringing the maternity assessment unit or calling 999 is exactly right. Trust changes that feel sudden or severe.",
    whatYouCanDo: [
      { action: "Elevate your feet whenever you can", reason: "Putting your feet up — even on a footstool while sitting — helps fluid drain back from the legs." },
      { action: "Move regularly", reason: "Standing still or sitting still for long periods makes swelling worse. Short, frequent walks help the calves pump fluid back up." },
      { action: "Stay well hydrated", reason: "Counterintuitively, dehydration makes the body hold on to more fluid. Drinking enough actually reduces swelling." },
      { action: "Wear comfortable shoes and avoid tight bands", reason: "Tight straps or socks restrict return flow. Soft, supportive shoes make a real difference late in pregnancy." },
      { action: "Sleep on your left side", reason: "Side-sleeping reduces pressure on the large vein that returns blood from the legs." },
    ],
    whatHappensNext: "Swelling usually settles quickly after birth — often dramatically so in the first days, as the body releases the extra fluid. Don't be surprised by extra trips to the loo and lots of sweating in the early postnatal week.",
    relatedStage: {
      intro: "Swelling sits within the picture of late-pregnancy physical changes:",
      links: [
        { label: "Your body in pregnancy", href: "/pregnancy/body", context: "The wider topic this article belongs to." },
        { label: "Third trimester: complete guide", href: "/articles/third-trimester-complete-guide", context: "The wider arc of the final weeks." },
        { label: "Sleep in pregnancy", href: "/articles/sleep-in-pregnancy", context: "Side-sleeping helps swelling as well as comfort." },
      ],
    },
    aiPrompts: [
      "Is this much ankle swelling normal?",
      "What are the warning signs of pre-eclampsia?",
      "What can I do to reduce swelling in my feet?",
    ],
    captureIntro: "The body in late pregnancy carries a remarkable amount. Worth noting how it really feels — not just the milestones.",
    trimester: [2, 3],
    relatedSlugs: ["third-trimester-complete-guide", "sleep-in-pregnancy", "back-pain-in-pregnancy"],
    journey: ["pregnancy"],
    topics: ["body", "symptoms"],
    reviewedBy: "Jenny Joines",
    lastUpdated: "April 2026",
    keyTakeaways: [
      "Mild swelling of feet, ankles and hands is very common from the second half of pregnancy",
      "Elevating feet, moving regularly, hydrating, and side-sleeping all help",
      "Swelling that's worse by the evening and eases overnight is usually normal",
      "Sudden facial or hand swelling — especially with headache, vision changes, or upper-tummy pain — needs urgent assessment for pre-eclampsia",
      "One-sided leg swelling with redness, warmth or calf pain needs same-day medical attention",
    ],
    sources: [
      "NHS — Swollen ankles, feet and fingers in pregnancy",
      "Royal College of Obstetricians and Gynaecologists — Pre-eclampsia",
      "NICE — Hypertension in pregnancy",
      "Tommy's — Pre-eclampsia: signs and symptoms",
    ],
    faq: [
      { question: "How much swelling is normal in pregnancy?", answer: "Mild swelling of feet, ankles, and sometimes hands is very common, especially later in the day and in hot weather. It usually eases overnight." },
      { question: "What are the signs of pre-eclampsia?", answer: "Sudden swelling of the face, around the eyes, or hands — especially with severe headache, vision changes (flashing lights, blurring), or upper-tummy pain. It usually comes with raised blood pressure, picked up at antenatal checks." },
      { question: "Can swelling mean a blood clot?", answer: "Even, gentle swelling of both legs is usually not a clot. One-sided leg swelling — with redness, warmth, or calf pain — needs same-day assessment." },
      { question: "Does drinking less water help?", answer: "No — the opposite. Dehydration makes the body hold on to more fluid. Drinking enough actually reduces swelling." },
      { question: "Will it go away after birth?", answer: "Yes — usually within days to a couple of weeks. The body releases the extra fluid quickly through frequent weeing and sweating in the first postnatal week." },
    ],
    topic: "body",
    standfirst: "Most pregnancy swelling is ordinary. A few patterns aren't — and knowing the difference is one of the most useful things to carry into the third trimester.",
    editorialSections: [
      {
        id: "why",
        heading: "Why swelling happens",
        paragraphs: [
          "Pregnancy increases the amount of fluid in your body by around 50%, and some of that fluid sits in the tissues. Gravity pulls it downward, which is why feet and ankles tend to puff up by the evening. The growing uterus also presses on the large veins that carry blood back up from the legs, slowing return flow.",
          "Add hormones that soften tissues, hot weather, long days on your feet, and salt — and gentle swelling becomes very common in the second half of pregnancy. It's not a sign of damage.",
        ],
      },
      {
        id: "what-helps",
        heading: "What helps",
        paragraphs: [
          "Elevate your feet when you can — even on a footstool. Move regularly: standing still or sitting still for long stretches makes swelling worse. Stay well hydrated; dehydration makes the body hold on to more fluid, not less.",
          "Avoid tight bands — socks, watches, rings — that can restrict flow. Side-sleeping (especially the left side) reduces pressure on the large vein returning blood from the legs and often helps overnight.",
        ],
      },
      {
        id: "warning-signs",
        heading: "The patterns that need urgent attention",
        lead: "Most swelling is harmless. Two patterns aren't.",
        paragraphs: [
          "Pre-eclampsia: sudden swelling of the face, around the eyes, or rapid swelling of the hands — especially with severe headache, vision changes (flashing lights, blurring), or pain just below the ribs on the right side. It usually comes with raised blood pressure picked up at antenatal checks. Ring your maternity assessment unit straight away.",
          "Blood clot (DVT): one-sided leg swelling, with redness, warmth, or calf pain. Different from the gentle even swelling of both ankles. Same-day medical attention is needed.",
        ],
        callout: { tone: "gentle-warning", text: "If swelling is sudden, one-sided, or paired with headache, vision changes, or upper-tummy pain — ring your maternity assessment unit, don't wait until your next appointment." },
      },
    ],
  },

  // ─── HEARTBURN IN PREGNANCY ───────────────────────────────────────────────
  {
    slug: "heartburn-in-pregnancy",
    title: "Heartburn in pregnancy: why it happens and what really helps",
    metaDescription: "Why heartburn is so common in pregnancy, when it tends to peak, what genuinely helps, and which treatments are safe to use during pregnancy.",
    quickAnswer:
      "Heartburn in pregnancy is caused by hormones relaxing the valve at the top of the stomach, and later by the growing uterus pressing upward. It's very common — affecting around half of pregnant people, often more in the third trimester. Eating smaller meals, avoiding late eating, propping up at night, and using pregnancy-safe antacids (your pharmacist can advise) all help. If heartburn is severe, persistent, or paired with vomiting, weight loss, or upper-tummy pain, talk to your midwife or GP.",
    howThisFeels: [
      "Lying down and immediately regretting that last meal",
      "Burning that wakes you in the night",
      "Avoiding favourite foods because of what they do later",
      "Sleeping propped up on a pile of pillows",
    ],
    whatHappening: {
      commonCauses: [
        { heading: "Progesterone relaxes the stomach valve", body: "Progesterone softens smooth muscle throughout the body, including the valve (the lower oesophageal sphincter) that normally keeps stomach acid where it belongs. When that valve relaxes, acid rises." },
        { heading: "Slower digestion", body: "Pregnancy slows the whole digestive system, so the stomach empties more slowly and there's more chance for acid to back up." },
        { heading: "A growing uterus", body: "From the second half of pregnancy, the uterus pushes upward against the stomach, increasing the pressure that pushes acid up." },
      ],
      lessCauses: [
        { heading: "Trigger foods", body: "Spicy, fatty, very acidic, or very large meals tend to trigger heartburn for many people. So do caffeine, fizzy drinks, and chocolate." },
        { heading: "Lying flat soon after eating", body: "Gravity is one of the few things keeping acid down. Lying flat — especially soon after a meal — removes that help." },
      ],
      whyItVaries: "Some people barely notice heartburn in pregnancy. Others find it one of the hardest symptoms. Severity isn't a sign of how the pregnancy is going — it reflects how your body responds to those hormonal and mechanical changes.",
    },
    timing: {
      whenStarts: "Often appears or worsens from around the second trimester onward.",
      whenPeaks: "Usually most pronounced in the third trimester, especially the final weeks.",
      whenEases: "Heartburn typically eases significantly within hours to days after birth, as the uterus shrinks and hormones shift.",
    },
    whatItFeelsLike: [
      "A burning sensation behind the breastbone, especially after eating or lying down",
      "An acidic or bitter taste at the back of the throat",
      "Bloating and a feeling of fullness",
      "Disturbed sleep from acid rising at night",
    ],
    whatThisMeans: "Heartburn isn't a sign of damage. It's a sign of a digestive system temporarily reorganised by hormones and a growing baby — and there's a lot you can do to make it more bearable.",
    normal: [
      "Burning after meals, especially larger or richer ones",
      "Worse symptoms when lying flat",
      "Worse symptoms in the third trimester",
    ],
    seekSupport: [
      "Severe pain, especially in the upper right tummy",
      "Vomiting blood, or what looks like coffee grounds",
      "Difficulty swallowing",
      "Weight loss or persistent vomiting",
      "Heartburn that isn't responding to anything you try",
    ],
    disclaimer: "Several common heartburn medicines are safe in pregnancy, but always check with your pharmacist, midwife, or GP before taking anything. Severe upper-tummy pain in pregnancy is sometimes a sign of pre-eclampsia and needs prompt assessment.",
    whatYouCanDo: [
      { action: "Eat smaller, more frequent meals", reason: "A less full stomach is less likely to push acid upward — and the digestion has less work to do at any one time." },
      { action: "Avoid eating late at night", reason: "Try to leave 2–3 hours between your last meal and lying down. Gravity is one of the most useful tools you have." },
      { action: "Prop up at night", reason: "Sleeping with your upper body slightly raised — extra pillows, or a wedge — keeps acid down." },
      { action: "Identify your triggers", reason: "Common ones are spicy, fatty, or very acidic foods, fizzy drinks, caffeine, and chocolate. You'll quickly learn yours." },
      { action: "Use pregnancy-safe antacids when you need them", reason: "Many antacids are safe in pregnancy. Your pharmacist or midwife can recommend specific ones." },
    ],
    whatHappensNext: "Heartburn almost always settles within days of birth. The valve at the top of the stomach tightens up again, the uterus shrinks back, and you can usually go back to eating whatever you fancy.",
    relatedStage: {
      intro: "Heartburn sits within the wider picture of how digestion changes in pregnancy:",
      links: [
        { label: "Your body in pregnancy", href: "/pregnancy/body", context: "The wider topic this article belongs to." },
        { label: "Constipation in pregnancy", href: "/articles/constipation-in-pregnancy", context: "Slower digestion shows up here too." },
        { label: "Sleep in pregnancy", href: "/articles/sleep-in-pregnancy", context: "Heartburn at night often disrupts sleep — managing one helps the other." },
      ],
    },
    aiPrompts: [
      "What antacids are safe in pregnancy?",
      "Why is heartburn so much worse at night?",
      "When is heartburn something to mention to my midwife?",
    ],
    captureIntro: "The strange ordinary discomforts of pregnancy are part of the story too — worth noting alongside the bigger moments.",
    trimester: [2, 3],
    relatedSlugs: ["constipation-in-pregnancy", "sleep-in-pregnancy", "eating-well-in-pregnancy"],
    journey: ["pregnancy"],
    topics: ["body", "symptoms", "diet"],
    reviewedBy: "Jenny Joines",
    lastUpdated: "April 2026",
    keyTakeaways: [
      "Heartburn affects around half of pregnant people, often peaking in the third trimester",
      "It's caused by hormones relaxing the stomach valve and the growing uterus pressing up",
      "Smaller meals, no late eating, and propping up at night make a real difference",
      "Many antacids are safe in pregnancy — your pharmacist can advise",
      "Severe pain, vomiting blood, or upper-right-tummy pain needs prompt medical assessment",
    ],
    sources: [
      "NHS — Indigestion and heartburn in pregnancy",
      "Royal College of Obstetricians and Gynaecologists — Heartburn",
      "NICE — Antenatal care",
      "BNF — Antacids in pregnancy",
    ],
    faq: [
      { question: "Why is heartburn so much worse in pregnancy?", answer: "Progesterone relaxes the valve at the top of the stomach, slowing digestion and letting acid rise more easily. Later, the growing uterus adds physical pressure. Both add up." },
      { question: "What antacids are safe in pregnancy?", answer: "Several common antacids are safe — calcium-based ones in particular. Your pharmacist or midwife can recommend specific brands. Check before taking any new medicine, including over-the-counter ones." },
      { question: "What if antacids aren't enough?", answer: "Talk to your GP. There are stronger medicines (such as ranitidine alternatives or PPIs) that can be prescribed safely if heartburn is severely affecting sleep or eating." },
      { question: "Does spicy food really make it worse?", answer: "For many people, yes — though the triggers are personal. Common ones are spicy, fatty, or very acidic foods, fizzy drinks, caffeine, and chocolate. A short food diary often makes the pattern clear." },
      { question: "Will heartburn affect the baby?", answer: "No. Heartburn is uncomfortable but doesn't harm the baby. There's also no truth to the old belief that heartburn means the baby will have lots of hair." },
    ],
    topic: "body",
    standfirst: "Heartburn is one of the most universal — and most treatable — discomforts of pregnancy. A clear look at why it happens and what genuinely helps.",
    editorialSections: [
      {
        id: "why",
        heading: "Why pregnancy makes heartburn so common",
        paragraphs: [
          "Pregnancy hormones — particularly progesterone — soften the smooth muscle throughout the body. That includes the valve at the top of the stomach (the lower oesophageal sphincter), which normally keeps stomach acid where it belongs. When that valve relaxes, acid rises more easily.",
          "Digestion also slows in pregnancy, so the stomach empties more slowly and acid has more time to back up. Later on, the growing uterus pushes upward against the stomach itself, adding physical pressure. By the third trimester, all three forces are at work.",
        ],
      },
      {
        id: "what-helps",
        heading: "What genuinely helps",
        paragraphs: [
          "Eat smaller, more frequent meals — a fuller stomach is more likely to push acid upward. Try to leave 2–3 hours between your last meal and lying down: gravity is one of the most useful tools you have. Prop up with extra pillows or a wedge at night.",
          "Identify your triggers. The usual suspects are spicy, fatty, very acidic, or very large meals — plus caffeine, fizzy drinks, and chocolate. A short food diary usually makes the pattern clear within days.",
          "Use pregnancy-safe antacids when you need them. Several over-the-counter options are safe; your pharmacist or midwife can point you to the right ones. If antacids aren't enough, your GP can prescribe stronger medicines that are also safe in pregnancy.",
        ],
        callout: { tone: "info", text: "Always check with a pharmacist, midwife, or GP before taking any new medicine in pregnancy — even over-the-counter ones." },
      },
      {
        id: "when-to-raise-it",
        heading: "When heartburn is more than heartburn",
        paragraphs: [
          "Severe pain in the upper tummy — especially on the right side, just below the ribs — can be a sign of pre-eclampsia and needs prompt assessment, particularly if paired with headache or vision changes. Vomiting blood, difficulty swallowing, weight loss, or persistent vomiting also need a doctor's input.",
          "And if heartburn isn't responding to anything you try, that's worth raising. There are options — there's no need to white-knuckle it through the third trimester.",
        ],
      },
    ],
  },

  // ─── CONSTIPATION IN PREGNANCY ────────────────────────────────────────────
  {
    slug: "constipation-in-pregnancy",
    title: "Constipation in pregnancy: why it happens and what gently helps",
    metaDescription: "Why constipation is so common in pregnancy, what genuinely helps, which laxatives are safe, and when to mention it to your midwife or GP.",
    quickAnswer:
      "Constipation is one of the most common pregnancy symptoms, affecting up to two thirds of pregnant people. Hormones slow digestion, iron supplements often make it worse, and the growing uterus presses on the bowel later on. Drinking enough fluid, eating fibre, gentle movement, and pregnancy-safe laxatives (your pharmacist can advise) all help. Talk to your midwife or GP if constipation is severe, painful, or paired with bleeding.",
    howThisFeels: [
      "Days going by without anything happening",
      "Feeling bloated and uncomfortable on top of everything else",
      "Worrying that pushing might cause damage",
      "Quietly hoping iron supplements aren't to blame",
    ],
    whatHappening: {
      commonCauses: [
        { heading: "Progesterone slows digestion", body: "Pregnancy hormones relax smooth muscle, including the muscle of the bowel. Things move through more slowly, and more water is absorbed along the way — so stools become harder." },
        { heading: "Iron supplements", body: "Iron tablets, often prescribed if iron levels are low, are a well-known cause of constipation. Sometimes a different formulation helps." },
        { heading: "A growing uterus", body: "Later in pregnancy, the uterus presses on the bowel, slowing things down further." },
        { heading: "Less movement", body: "Many people are less physically active in pregnancy — and movement is one of the things that keeps the bowel working." },
      ],
      lessCauses: [
        { heading: "Dehydration", body: "If fluid intake drops, stools harden quickly. Pregnancy needs more water than usual." },
        { heading: "Pelvic floor changes", body: "Pelvic floor changes in pregnancy can occasionally make emptying the bowel more difficult, even when the stool itself is soft." },
      ],
      whyItVaries: "Some people sail through. Others find constipation one of the most uncomfortable parts of pregnancy. It often gets worse with iron tablets and in the third trimester.",
    },
    timing: {
      whenStarts: "Often noticed from the first trimester as hormones start to affect digestion.",
      whenPeaks: "Tends to be worse in the first and third trimesters, and around iron supplementation.",
      whenEases: "Many people see things improve within the first weeks after birth — though this can take longer if iron is still being supplemented or if there's a perineal tear.",
    },
    whatItFeelsLike: [
      "Hard, infrequent stools",
      "Bloating and abdominal discomfort",
      "Straining or feeling unable to fully empty",
      "Discomfort or small streaks of blood from the strain (often piles)",
    ],
    whatThisMeans: "Constipation isn't a sign anything is wrong. It's a sign of a slower digestive system in a more crowded body — and there's a lot that helps.",
    normal: [
      "Less frequent bowel movements than before pregnancy",
      "Stools that are firmer, especially when iron is being taken",
      "Mild bloating and discomfort",
      "Occasional small bright-red spots from straining (often piles)",
    ],
    seekSupport: [
      "Severe abdominal pain",
      "Significant bleeding from the bottom",
      "No bowel movement for a week or more, despite trying everything",
      "Constipation severe enough to affect eating or sleep",
    ],
    disclaimer: "Some laxatives are safe in pregnancy and others aren't. Always check with your pharmacist, midwife, or GP before taking anything. Severe abdominal pain in pregnancy needs prompt assessment.",
    whatYouCanDo: [
      { action: "Drink plenty of water", reason: "Hydration is one of the most reliable ways to soften stools." },
      { action: "Increase fibre — gradually", reason: "Wholegrains, fruit, vegetables, and pulses help. Adding too much too fast can cause bloating, so build up over a few days." },
      { action: "Move every day", reason: "Even a short walk helps the bowel work. Gentle movement is one of the most underrated treatments." },
      { action: "Talk to your GP if iron is the trigger", reason: "Different iron formulations affect people differently. Sometimes a switch makes a real difference." },
      { action: "Use pregnancy-safe laxatives if needed", reason: "Bulk-forming laxatives (like ispaghula) and stool softeners are usually first-line in pregnancy. Stimulant laxatives are sometimes used short-term — your pharmacist or GP can guide you." },
    ],
    whatHappensNext: "Constipation usually eases gradually in the weeks after birth, especially once any iron supplementation has finished. The same gentle measures help in the postnatal period too — when straining is something to actively avoid.",
    relatedStage: {
      intro: "Constipation sits within the wider picture of how digestion changes:",
      links: [
        { label: "Your body in pregnancy", href: "/pregnancy/body", context: "The wider topic this article belongs to." },
        { label: "Heartburn in pregnancy", href: "/articles/heartburn-in-pregnancy", context: "Both are part of the same slowed-digestion story." },
        { label: "Eating well in pregnancy", href: "/articles/eating-well-in-pregnancy", context: "Fibre, fluid, and steady eating all help." },
      ],
    },
    aiPrompts: [
      "Why is iron making me so constipated?",
      "What laxatives are safe in pregnancy?",
      "When should I worry about constipation?",
    ],
    captureIntro: "The unglamorous parts of pregnancy are part of it too — and the practical things that help are worth remembering.",
    trimester: [1, 2, 3],
    relatedSlugs: ["heartburn-in-pregnancy", "eating-well-in-pregnancy", "key-nutrients-in-pregnancy"],
    journey: ["pregnancy"],
    topics: ["body", "symptoms", "diet"],
    reviewedBy: "Jenny Joines",
    lastUpdated: "April 2026",
    keyTakeaways: [
      "Constipation affects up to two thirds of pregnant people — usually due to hormones, iron, and pressure from the uterus",
      "Water, fibre, and daily movement are the foundations of relief",
      "Iron supplements are a common trigger — different formulations may help",
      "Pregnancy-safe laxatives exist; ask a pharmacist or GP before starting",
      "Severe pain, significant bleeding, or no bowel movement for a week needs medical input",
    ],
    sources: [
      "NHS — Constipation in pregnancy",
      "NICE — Constipation in pregnancy",
      "BNF — Laxatives in pregnancy",
      "Royal College of Obstetricians and Gynaecologists — Common pregnancy concerns",
    ],
    faq: [
      { question: "Why does iron cause constipation?", answer: "Iron supplements slow the bowel and harden stools — it's one of the most common side effects. If iron is making things significantly worse, talk to your GP about alternative formulations." },
      { question: "Is straining harmful?", answer: "Straining can worsen piles (haemorrhoids), which are common in pregnancy. Softening the stool — with water, fibre, and pregnancy-safe laxatives if needed — is more useful than pushing harder." },
      { question: "What laxatives are safe in pregnancy?", answer: "Bulk-forming laxatives (such as ispaghula) and stool softeners are usually first-line. Stimulant laxatives may be used short-term under guidance. Always check with a pharmacist, midwife, or GP." },
      { question: "Are piles in pregnancy normal?", answer: "Yes — they're very common, both from constipation and from the pressure of pregnancy on the veins around the bottom. Most settle after birth. Soothing creams and softer stools help." },
      { question: "When should I see a GP about constipation?", answer: "If constipation is severe, painful, or paired with significant bleeding — or if nothing has worked after a week of trying — talk to your GP. There are safe and effective options." },
    ],
    topic: "body",
    standfirst: "Constipation is one of the most common — and most quietly miserable — parts of pregnancy. A grounded look at why it happens and what genuinely helps.",
    editorialSections: [
      {
        id: "why",
        heading: "Why pregnancy makes constipation so common",
        paragraphs: [
          "Pregnancy hormones, particularly progesterone, relax the smooth muscle of the bowel. Things move through more slowly, and more water is absorbed along the way, so stools become harder and less frequent. Iron supplements — often prescribed if iron levels are low — slow the bowel further. And later in pregnancy, the growing uterus presses on the bowel, adding physical pressure.",
          "All of this together explains why constipation affects up to two thirds of pregnant people at some point.",
        ],
      },
      {
        id: "what-helps",
        heading: "What genuinely helps",
        paragraphs: [
          "Drink plenty of water. Increase fibre gradually — wholegrains, fruit, vegetables, and pulses — over a few days rather than all at once, because too much fibre too fast can cause bloating. Move every day, even briefly: walking is one of the most underrated treatments.",
          "If iron supplements are the main trigger, talk to your GP about switching to a different formulation — some are gentler on the bowel.",
          "If diet, fluid, and movement aren't enough, pregnancy-safe laxatives are an option. Bulk-forming laxatives (such as ispaghula) and stool softeners are usually first-line. A pharmacist or GP can advise.",
        ],
        callout: { tone: "info", text: "Always check with a pharmacist, midwife, or GP before taking any new medicine in pregnancy — including over-the-counter laxatives." },
      },
      {
        id: "piles",
        heading: "A note on piles",
        paragraphs: [
          "Piles (haemorrhoids) are very common in pregnancy — partly from constipation and straining, and partly from the pressure of pregnancy on the veins around the bottom. Streaks of bright red blood after straining are usually piles rather than anything more serious. Softening the stool, soothing creams, and avoiding sitting on the toilet for long periods all help. They usually settle after birth.",
        ],
      },
      {
        id: "when-to-raise-it",
        heading: "When to ask for more help",
        paragraphs: [
          "Severe abdominal pain, significant bleeding from the bottom, or no bowel movement for a week despite trying — all need medical input. Constipation severe enough to affect eating, sleep, or daily life is also worth raising rather than tolerating.",
        ],
      },
    ],
  },

  // ─── BACK PAIN IN PREGNANCY ───────────────────────────────────────────────
  {
    slug: "back-pain-in-pregnancy",
    title: "Back pain in pregnancy: why it happens and what genuinely helps",
    metaDescription: "Back pain in pregnancy explained — why it's so common, what helps, when to mention it to your midwife, and the warning signs that need urgent assessment.",
    quickAnswer:
      "Back pain affects up to two thirds of pregnant people. Softer ligaments, a shifting centre of gravity, a heavier uterus, and changes in posture all play a part. Most back pain is mechanical, eases with rest, position changes, and gentle movement, and responds well to a women's health physio. Severe pain, pain with fever, pain with stinging on weeing, or sudden lower-back pain in a regular pattern (especially before 37 weeks) needs prompt assessment.",
    howThisFeels: [
      "Aching by mid-afternoon every day",
      "Stiffening up after sitting still",
      "Wondering whether to push through it or rest",
      "Carrying a toddler when your own back is already complaining",
    ],
    whatHappening: {
      commonCauses: [
        { heading: "Softer ligaments", body: "The hormone relaxin softens the ligaments around the pelvis and lower back to prepare for birth. Joints become more mobile and less stable." },
        { heading: "A shifting centre of gravity", body: "As the bump grows, your centre of gravity moves forward. Most people compensate by leaning back slightly, which puts extra strain on the lower back." },
        { heading: "Weaker abdominal support", body: "The abdominal muscles stretch as the uterus grows and lose some of their ability to support the spine." },
        { heading: "Posture and load", body: "Sitting for long periods, standing for long periods, lifting toddlers, and uneven loading all add up." },
      ],
      lessCauses: [
        { heading: "Pelvic girdle pain (PGP)", body: "Pain in the lower back that's also in the pelvic joints — front, side, or sacroiliac — may be PGP and benefits from women's health physiotherapy." },
        { heading: "Urinary tract infection", body: "Lower back ache with stinging on weeing, needing to wee often, fever, or feeling unwell can point to a UTI, which is more common in pregnancy." },
        { heading: "Premature labour", body: "Sudden, regular lower-back pain — especially before 37 weeks, with tightening, pressure, or any bleeding — needs urgent assessment." },
      ],
      whyItVaries: "Pre-pregnancy back history, posture, fitness, the size and position of the baby, and how your body responds to relaxin all affect how back pain shows up. Some people barely notice it; others find it one of the hardest physical parts of pregnancy.",
    },
    timing: {
      whenStarts: "Mild back ache can begin in the first trimester. Significant back pain often shows up from around 14–20 weeks as the bump grows.",
      whenPeaks: "Usually most pronounced in the third trimester.",
      whenEases: "Most pregnancy back pain eases significantly within weeks of birth. A small number of people benefit from postnatal physio support.",
    },
    whatItFeelsLike: [
      "A dull ache across the lower back",
      "Stiffness after sitting, standing, or sleeping in one position",
      "Pain that's worse by the end of the day",
      "Sometimes a shooting pain down a leg (sciatica)",
    ],
    whatThisMeans: "Back pain in pregnancy is mostly a mechanical story — softer joints, more weight, and a body adapting fast. It's manageable, and there's a lot you can do.",
    normal: [
      "Aching across the lower back, especially by the end of the day",
      "Stiffness after sitting or standing for long periods",
      "Pain that eases with rest and gentle movement",
    ],
    seekSupport: [
      "Severe pain that limits daily life",
      "Pain with fever, stinging on weeing, or feeling unwell",
      "Sudden, regular lower-back pain (especially before 37 weeks)",
      "Pain with any bleeding or fluid leaking",
      "Sciatica that's severe or causing weakness in the leg",
    ],
    disclaimer: "This is general guidance. Severe or unusual pain in pregnancy is always worth raising. Sudden regular back pain — especially before 37 weeks — should be treated as possible premature labour and assessed urgently.",
    whatYouCanDo: [
      { action: "Ask your midwife about a women's health physio", reason: "Physio is the most effective treatment for pregnancy back pain — and the earlier the better." },
      { action: "Move regularly and gently", reason: "Sitting still and standing still both make things worse. Short, frequent walks and gentle stretches help." },
      { action: "Watch your posture", reason: "Avoid leaning back. Sit with feet flat and lower back supported. Stand tall — imagine the crown of your head lifting upward." },
      { action: "Sleep on your side with a pillow between your knees", reason: "Side-sleeping with pillow support keeps the spine and pelvis aligned and is often the most comfortable position." },
      { action: "Lift carefully — or not at all", reason: "Bend at the knees, keep loads close to your body, and ask for help with heavy lifting. This is also true for older children: get them to climb up to you rather than lifting them." },
      { action: "Try a warm bath or warm pack", reason: "Warmth often eases muscular back pain. (Avoid very hot baths.)" },
    ],
    whatHappensNext: "Most pregnancy back pain eases significantly within the first weeks after birth as hormones settle and the load reduces. Postnatal recovery is gradual — taking time to rebuild core and pelvic floor strength helps long-term recovery.",
    relatedStage: {
      intro: "Back pain sits within the wider story of how your body changes:",
      links: [
        { label: "Your body in pregnancy", href: "/pregnancy/body", context: "The wider topic this article belongs to." },
        { label: "Pelvic pain in pregnancy", href: "/articles/pelvic-pain-in-pregnancy", context: "Often travels with back pain — same physio referral helps." },
        { label: "Sleep in pregnancy", href: "/articles/sleep-in-pregnancy", context: "Side-sleeping with pillow support helps both back pain and sleep." },
        { label: "Moving your body in pregnancy", href: "/articles/moving-your-body-in-pregnancy", context: "Gentle, regular movement is one of the most effective things." },
      ],
    },
    aiPrompts: [
      "What can I do about lower back pain in pregnancy?",
      "When is back pain in pregnancy something to worry about?",
      "Is sciatica in pregnancy normal?",
    ],
    captureIntro: "The body's daily work in pregnancy goes mostly unseen. Worth noting how it really feels — including the aches.",
    trimester: [2, 3],
    relatedSlugs: ["pelvic-pain-in-pregnancy", "sleep-in-pregnancy", "moving-your-body-in-pregnancy"],
    journey: ["pregnancy"],
    topics: ["body", "symptoms"],
    reviewedBy: "Jenny Joines",
    lastUpdated: "April 2026",
    keyTakeaways: [
      "Back pain affects up to two thirds of pregnant people — mostly mechanical, almost always manageable",
      "A women's health physio is the most effective treatment — ask your midwife to refer early",
      "Posture, side-sleeping, gentle movement, and careful lifting all genuinely help",
      "Sudden regular lower-back pain — especially before 37 weeks — needs urgent assessment for possible premature labour",
      "Back pain with fever or stinging on weeing may be a UTI and needs same-day GP review",
    ],
    sources: [
      "NHS — Back pain in pregnancy",
      "Pelvic Obstetric & Gynaecological Physiotherapy (POGP) — Back pain in pregnancy",
      "NICE — Antenatal care",
      "Royal College of Obstetricians and Gynaecologists — Common pregnancy concerns",
    ],
    faq: [
      { question: "Is back pain in pregnancy normal?", answer: "Yes — it affects up to two thirds of pregnant people. Most of it is mechanical, caused by softer ligaments, a shifting centre of gravity, and a growing uterus. It's almost always manageable." },
      { question: "Can I see a physio for back pain in pregnancy?", answer: "Yes — a women's health physiotherapist is the most effective treatment. Ask your midwife for a referral. The earlier, the better." },
      { question: "Is sciatica in pregnancy serious?", answer: "Mild sciatica — shooting pain down the back of one leg — is fairly common and usually eases with physio input. Severe sciatica, weakness in the leg, or loss of bladder/bowel control needs urgent assessment." },
      { question: "Are painkillers safe for back pain in pregnancy?", answer: "Paracetamol is generally safe at the lowest effective dose for the shortest time. Ibuprofen and other NSAIDs are usually avoided, especially after 30 weeks. Always check with your pharmacist or GP." },
      { question: "When should I worry about back pain?", answer: "Sudden regular lower-back pain — especially before 37 weeks, or with tightening or pressure — needs urgent assessment. Back pain with fever, stinging on weeing, or feeling unwell may be a UTI and needs same-day review." },
    ],
    topic: "body",
    standfirst: "Pregnancy back pain is common, mostly mechanical, and almost always manageable. A grounded look at what helps — and the few signs that need more than reassurance.",
    editorialSections: [
      {
        id: "why",
        heading: "Why back pain is so common in pregnancy",
        paragraphs: [
          "Pregnancy puts the back through a lot. The hormone relaxin softens ligaments throughout the body, including those around the pelvis and lower back. The bump shifts your centre of gravity forward, and most people compensate by leaning back slightly — which loads the lower spine. The abdominal muscles stretch and lose some of their ability to support you. Add in long days on your feet, sitting at desks, and lifting toddlers, and back pain is no surprise.",
          "Up to two thirds of pregnant people get it. The good news is that most of it is mechanical, manageable, and treatable.",
        ],
      },
      {
        id: "what-helps",
        heading: "What genuinely helps",
        paragraphs: [
          "Move regularly and gently. Sitting still and standing still both stiffen things up. Short, frequent walks and gentle stretches keep things moving. Watch your posture — sit with your feet flat and your lower back supported, and stand tall.",
          "At night, sleep on your side with a pillow between your knees. This keeps the spine and pelvis aligned and is often the most comfortable position. A pregnancy pillow works for some; a couple of regular pillows works for others.",
          "Lift carefully — or not at all. Bend at the knees rather than the waist, keep loads close to your body, and ask for help with anything heavy. Get older children to climb up to you rather than lifting them.",
          "Warmth eases muscular back pain — a warm bath or warm pack often helps. (Avoid very hot baths in pregnancy.)",
        ],
        callout: { tone: "info", text: "Ask your midwife to refer you to a women's health physiotherapist. It's the single most effective treatment for pregnancy back pain — and the earlier the better." },
      },
      {
        id: "warning-signs",
        heading: "When back pain needs more than physio",
        paragraphs: [
          "Sudden, regular lower-back pain — especially before 37 weeks, or paired with tightening, pressure, or bleeding — needs urgent assessment for possible premature labour. Ring your maternity assessment unit straight away.",
          "Back pain with fever, stinging on weeing, needing to wee often, or feeling unwell may be a urinary tract or kidney infection. Both are more common in pregnancy and need same-day GP or maternity review.",
          "Severe sciatica — shooting pain down the leg with weakness, numbness, or loss of bladder or bowel control — needs urgent assessment. It's rare, but it matters.",
        ],
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
