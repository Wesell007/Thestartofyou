// ─── Article Data ──────────────────────────────────────────────────────────
// Structured content for answer-first article pages.
// Route: /articles/:slug

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
    relatedSlugs: ["nausea-in-early-pregnancy", "first-trimester-symptoms"],
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
    inThisArticle: ["Why morning sickness happens", "When it starts and ends", "What helps", "Morning sickness vs hyperemesis", "When to seek support", "Common questions"],
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
      "Symptoms are caused by hormonal changes, primarily hCG and progesterone",
      "Every pregnancy is different, and fewer symptoms does not indicate a problem",
      "Most symptoms peak between weeks 6-10 and ease by weeks 12-14",
      "Having no symptoms can be completely normal",
    ],
    inThisArticle: ["What causes early symptoms", "Common symptoms list", "When symptoms start", "When to seek support", "Common questions"],
    sources: ["NHS: Signs and symptoms of pregnancy", "Tommy's: Early pregnancy symptoms"],
    lastUpdated: "March 2026",
    reviewedBy: "Jenny Joines",
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
];

// ─── Public API ────────────────────────────────────────────────────────────

export const getArticle = (slug: string): ArticleData | null =>
  articleDatabase.find((a) => a.slug === slug) ?? null;

export const getAllArticles = (): ArticleData[] => articleDatabase;

export const getRelatedArticles = (slug: string, limit = 3): ArticleData[] =>
  articleDatabase.filter((a) => a.slug !== slug).slice(0, limit);

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
