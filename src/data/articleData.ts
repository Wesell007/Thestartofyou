// ─── Article Data ──────────────────────────────────────────────────────────
// Structured content for answer-first article pages.
// Route: /articles/:slug

export interface ArticleRelatedLink {
  label: string;
  href: string;
  context?: string; // e.g. "If you're around week 6, this is often when…"
}

export interface ArticleWhatSection {
  heading: string;
  body: string;
}

export interface ArticleData {
  slug: string;
  title: string;
  metaDescription: string;

  // Quick answer — featured-snippet style
  quickAnswer: string;

  // How this can feel — emotional bridge
  howThisFeels: string[];

  // Core explanation — what's happening
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
}

// ─── Article database ──────────────────────────────────────────────────────

const articleDatabase: ArticleData[] = [

  // ─── NAUSEA IN EARLY PREGNANCY ────────────────────────────────────────────
  {
    slug: "nausea-in-early-pregnancy",
    title: "Nausea in early pregnancy: what it is, why it happens, and when it eases",
    metaDescription: "Why does early pregnancy cause nausea? When does it start, peak, and ease — and what can you do? Clear, reassuring guidance on morning sickness.",
    quickAnswer:
      "Nausea in early pregnancy is caused by rapidly rising levels of hCG — the hormone your body produces after implantation. It is one of the most common symptoms of the first trimester and, while it can feel intense, it is not usually a sign that anything is wrong. Both strong nausea and very mild nausea fall within the range of normal.",
    howThisFeels: [
      "Searching \"is it normal to feel this sick\" at 6am",
      "Wondering whether feeling fine is something to worry about",
      "Managing daily life while feeling significantly unwell",
      "Not knowing how long this will last — or if it will get worse",
      "The strange guilt of not enjoying something you wanted",
    ],
    whatHappening: {
      commonCauses: [
        {
          heading: "Rising hCG levels",
          body: "Human chorionic gonadotropin — the pregnancy hormone — begins increasing rapidly after implantation. hCG directly triggers the nausea centres in the brain, which is why nausea typically starts around week 5–6 when levels are climbing fastest.",
        },
        {
          heading: "Rising progesterone",
          body: "Progesterone slows digestion throughout the body. This slowing can lead to bloating, nausea, and a feeling of fullness — particularly on an empty stomach.",
        },
        {
          heading: "Heightened smell sensitivity",
          body: "Oestrogen amplifies your sense of smell in early pregnancy. Smells that were previously neutral can trigger nausea — sometimes before you've noticed any other symptoms.",
        },
      ],
      lessCauses: [
        {
          heading: "Blood sugar fluctuation",
          body: "Low blood sugar — particularly in the morning after overnight fasting — can intensify nausea. This is why eating small, frequent meals is often the most effective management strategy.",
        },
        {
          heading: "Increased sensitivity to certain foods",
          body: "Food aversions are common in early pregnancy. Certain foods — sometimes ones previously liked — can suddenly trigger nausea due to hormonal changes in taste and smell perception.",
        },
      ],
      whyItVaries:
        "Nausea varies significantly between people and between pregnancies for the same person. Hormone levels, sensitivity to hCG, genetics, and prior health can all affect severity. Some people experience intense nausea; others feel very little. Neither experience is more or less valid — and neither is a reliable indicator of pregnancy health.",
    },
    timing: {
      whenStarts: "Nausea typically begins around weeks 5–6, coinciding with the rapid rise in hCG levels.",
      whenPeaks: "Symptoms often feel most intense between weeks 6–9, when hCG is climbing fastest.",
      whenEases: "For many people, nausea begins to ease from weeks 12–14 as the placenta takes over hormone production and hCG levels stabilise. However, this varies — some people experience it longer, and some feel better earlier.",
    },
    whatItFeelsLike: [
      "A constant, low-level queasiness that doesn't fully go away",
      "Waves of nausea that come unpredictably — not always in the morning",
      "Certain smells triggering sudden, intense nausea",
      "Feeling fine one day and very unwell the next",
      "The strange exhaustion of feeling unwell for days or weeks on end",
    ],
    whatThisMeans:
      "Nausea in early pregnancy is not a sign that something is wrong — for most people, it is a sign that hCG levels are active and rising. The intensity of nausea is not a reliable indicator of pregnancy health. Many people with very mild or no nausea have entirely healthy pregnancies. The absence of nausea is not cause for concern unless other symptoms are present.",
    normal: [
      "Nausea at any time of day — not just the morning",
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
      "This is not medical advice. Always consult your midwife, doctor, or healthcare provider with any concerns. If you're experiencing severe vomiting that prevents hydration, seek medical support — hyperemesis gravidarum is a recognised condition that can be treated.",
    whatYouCanDo: [
      { action: "Eat small, frequent meals", reason: "An empty stomach often makes nausea worse. Small meals help stabilise blood sugar and reduce the intensity of symptoms." },
      { action: "Stay hydrated with small, frequent sips", reason: "Nausea can make drinking difficult — small sips throughout the day are more manageable than large amounts at once." },
      { action: "Identify and avoid known triggers", reason: "Strong smells, certain foods, or specific environments can trigger nausea — reducing exposure where possible can help." },
      { action: "Rest", reason: "Fatigue amplifies nausea. If you can rest more, it may ease the overall intensity." },
      { action: "Try ginger or cold foods if helpful", reason: "Some people find ginger-based foods or cold, bland foods easier to manage. This is personal — find what works for you." },
    ],
    whatHappensNext:
      "For most people, nausea begins to ease between weeks 12–14 as hormone levels stabilise. Some people notice a gradual improvement; others experience a more sudden shift. If you're past 14 weeks and nausea continues, this is less common but still occurs — and is worth discussing with your midwife or doctor.",
    relatedStage: {
      intro: "Nausea is most common in the first trimester. If you're trying to understand where you are in your pregnancy:",
      links: [
        { label: "Week 5", href: "/pregnancy/week/5", context: "Week 5 is often when nausea first appears — hCG levels are beginning their rapid rise." },
        { label: "Week 6", href: "/pregnancy/week/6", context: "Week 6 is often when nausea feels most intense for many people." },
        { label: "Week 8", href: "/pregnancy/week/8", context: "Week 8 is around the peak for many — with gradual easing expected from weeks 9–12." },
        { label: "First Trimester Hub", href: "/pregnancy/first-trimester", context: "A full overview of what the first trimester is really like." },
      ],
    },
    aiPrompts: [
      "Is my nausea level normal for this stage?",
      "When should I expect nausea to ease?",
      "What can I do if nausea is affecting my daily life?",
    ],
    captureIntro: "The early weeks can feel relentless and uncertain. Many parents choose to write down what this stage was really like — not just the milestones, but the difficult days too.",
    trimester: [1],
    relatedWeeks: [5, 6, 7, 8, 9],
    relatedSlugs: ["fatigue-in-early-pregnancy", "implantation-bleeding", "first-trimester-symptoms"],
  },

  // ─── FATIGUE IN EARLY PREGNANCY ───────────────────────────────────────────
  {
    slug: "fatigue-in-early-pregnancy",
    title: "Fatigue in early pregnancy: why it happens and what to expect",
    metaDescription: "Extreme tiredness in early pregnancy is very common. Understand why it happens, when it peaks, and what you can realistically do.",
    quickAnswer:
      "Fatigue in early pregnancy is caused by a combination of rapidly rising progesterone, increased blood production, and the enormous amount of energy your body is directing toward establishing the pregnancy. It is one of the most common and most underestimated symptoms of the first trimester — and it is entirely normal to feel more exhausted than you ever have.",
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
          body: "Progesterone has a natural sedative effect on the body. Levels rise rapidly in early pregnancy, making you feel significantly more tired — particularly in the afternoon and evening.",
        },
        {
          heading: "Increased blood production",
          body: "Your body begins producing significantly more blood to support the developing pregnancy. This increases the workload on your cardiovascular system and contributes to fatigue.",
        },
        {
          heading: "Energy directed to the pregnancy",
          body: "The first trimester involves enormous biological work — establishing the placenta, developing all major organ systems, and adapting nearly every system in your body. This has a real energy cost.",
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
      whenStarts: "Fatigue typically begins in the first few weeks after conception — often around weeks 4–6.",
      whenPeaks: "It is commonly most intense between weeks 6–10, when progesterone levels are highest and biological work is most intensive.",
      whenEases: "For many people, fatigue begins to improve noticeably in the second trimester — often from around weeks 12–14. However, it can return in the third trimester as physical demands increase again.",
    },
    whatItFeelsLike: [
      "A bone-deep tiredness that doesn't lift with sleep",
      "Needing significantly more sleep than usual — sometimes 10+ hours",
      "Afternoon exhaustion that makes concentrating very difficult",
      "Feeling physically heavy and slow",
      "An exhaustion that's hard to describe to people who haven't experienced it",
    ],
    whatThisMeans:
      "First trimester fatigue is not laziness — it is a physiological response to enormous biological work. Your body is doing more than you can see or feel, and the energy cost is real. Rest during this stage is not optional — it is necessary.",
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
      { action: "Rest without guilt", reason: "First trimester fatigue is biological — rest is not laziness, it is what your body needs" },
      { action: "Prioritise sleep", reason: "Going to bed earlier and sleeping longer is appropriate right now" },
      { action: "Eat iron-rich foods", reason: "Helps support the increase in blood production and can reduce fatigue caused by low iron" },
      { action: "Reduce commitments where possible", reason: "The first trimester is not the time to push through at full capacity" },
      { action: "Accept help", reason: "If people offer support, this is a good time to take it" },
    ],
    whatHappensNext:
      "Fatigue typically improves significantly in the second trimester as progesterone levels stabilise and your body adapts to the demands of pregnancy. Many people describe weeks 13–20 as a period of restored energy. However, fatigue often returns in the third trimester as physical demands increase again.",
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
  },

  // ─── IMPLANTATION BLEEDING ────────────────────────────────────────────────
  {
    slug: "implantation-bleeding",
    title: "Implantation bleeding: what it is, what it looks like, and whether to worry",
    metaDescription: "What is implantation bleeding? When does it happen, what does it look like, and how does it differ from a period? Clear, reassuring guidance.",
    quickAnswer:
      "Implantation bleeding is light spotting that can occur when a fertilised egg attaches to the uterine lining — typically around 6–12 days after ovulation. It is lighter than a period, usually short-lived, and is not harmful. Not everyone experiences it — and its absence does not mean implantation hasn't occurred.",
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
          body: "When the fertilised egg implants into the lining of the uterus, it can disrupt small blood vessels. This disruption causes a small amount of bleeding — lighter and shorter than a period.",
        },
        {
          heading: "Timing in the cycle",
          body: "Implantation typically occurs 6–12 days after ovulation — which can coincide closely with when a period might be expected. This timing is a common source of confusion.",
        },
      ],
      lessCauses: [
        {
          heading: "Cervical sensitivity",
          body: "In early pregnancy, the cervix becomes more sensitive due to increased blood flow. Minor contact — such as internal examination or intercourse — can cause light spotting unrelated to implantation.",
        },
        {
          heading: "Hormonal shifts",
          body: "Early hormonal changes can sometimes cause light spotting that isn't implantation bleeding but is also not a period. This is less well understood but considered normal.",
        },
      ],
      whyItVaries:
        "Not everyone experiences implantation bleeding — estimates suggest it occurs in roughly 25–30% of pregnancies. Its absence is entirely normal and does not indicate a problem with implantation. The amount, colour, and duration can also vary significantly between people.",
    },
    timing: {
      whenStarts: "Implantation typically occurs 6–12 days after ovulation, placing bleeding approximately in the week before an expected period.",
      whenPeaks: "It usually lasts only 1–3 days and does not build in intensity.",
      whenEases: "Implantation bleeding is short-lived. If spotting continues for more than a few days or increases in flow, it is worth contacting your healthcare provider.",
    },
    whatItFeelsLike: [
      "Much lighter than a period — sometimes just a pink or brown tint when wiping",
      "Brownish discharge rather than bright red blood",
      "No progression in flow — it stays light or tails off",
      "Sometimes accompanied by mild cramping",
      "Easy to miss or dismiss as the end of a cycle",
    ],
    whatThisMeans:
      "Implantation bleeding, when it occurs, is a normal part of early pregnancy. It does not indicate a problem. However, early pregnancy bleeding can also have other causes — so any bleeding that feels different, heavier, or more persistent than described above is worth checking with your care team.",
    normal: [
      "Light pink or brown spotting for 1–3 days",
      "Spotting that doesn't increase in flow",
      "Mild cramping alongside light spotting",
      "No implantation bleeding at all",
    ],
    seekSupport: [
      "Heavy bleeding — similar to or heavier than a period",
      "Bright red bleeding that increases",
      "Severe cramping alongside any bleeding",
      "Bleeding accompanied by one-sided pain",
      "Any bleeding that concerns you — always worth raising",
    ],
    disclaimer: "This is not medical advice. Any bleeding in pregnancy is worth discussing with your midwife or doctor. If you experience heavy bleeding or severe pain, seek medical attention promptly.",
    whatYouCanDo: [
      { action: "Wait and observe", reason: "Light spotting that passes quickly and stays light is usually not cause for immediate concern" },
      { action: "Take a pregnancy test if unsure", reason: "If the spotting coincides with a missed period, a test can help clarify the situation" },
      { action: "Note the timing, colour, and flow", reason: "This information is useful if you speak to your midwife or doctor" },
      { action: "Contact your healthcare provider if bleeding increases or doesn't resolve", reason: "Any change in the pattern is worth checking" },
    ],
    whatHappensNext:
      "If implantation has occurred, hCG levels will begin rising within days — and a pregnancy test will typically read positive from around week 4. The spotting itself will pass. The weeks following implantation bring the beginning of hormonal changes that may cause early pregnancy symptoms.",
    relatedStage: {
      intro: "Implantation occurs very early in pregnancy. If you've just had a positive test or are in early pregnancy:",
      links: [
        { label: "Week 4", href: "/pregnancy/week/4", context: "Week 4 is often when a pregnancy test first turns positive — after implantation." },
        { label: "Week 5", href: "/pregnancy/week/5", context: "The first noticeable symptoms often begin around week 5." },
        { label: "First Trimester Hub", href: "/pregnancy/first-trimester", context: "A grounded overview of what the first trimester involves." },
      ],
    },
    aiPrompts: [
      "How do I know if this is implantation bleeding or my period?",
      "Is it normal to have no implantation bleeding?",
      "What should I do if I'm spotting in early pregnancy?",
    ],
    captureIntro: "Early pregnancy is full of uncertainty — questions and moments that feel significant even when small. Writing them down creates a record of how this beginning actually felt.",
    trimester: [1],
    relatedWeeks: [1, 4, 5],
    relatedSlugs: ["nausea-in-early-pregnancy", "first-trimester-symptoms"],
  },

  // ─── SYMPTOMS STOPPING IN EARLY PREGNANCY ────────────────────────────────
  {
    slug: "symptoms-stopping-early-pregnancy",
    title: "Symptoms stopping in early pregnancy: is it normal for symptoms to disappear?",
    metaDescription: "Is it normal for pregnancy symptoms to suddenly stop or ease? Understanding why symptoms come and go in early pregnancy — and when to seek reassurance.",
    quickAnswer:
      "Yes — it is common for pregnancy symptoms to ease or temporarily disappear in early pregnancy. Hormone levels fluctuate, and symptoms can vary significantly from day to day. A reduction or absence of symptoms is not, on its own, a reliable indicator that something has changed with your pregnancy.",
    howThisFeels: [
      "Waking up feeling fine and immediately worrying that something is wrong",
      "Spending the day anxiously watching for symptoms to return",
      "Feeling guilty for worrying when you feel better",
      "Searching constantly to find out whether this is normal",
      "The particular anxiety of early pregnancy — where reassurance is hard to find",
    ],
    whatHappening: {
      commonCauses: [
        {
          heading: "Natural hormone fluctuation",
          body: "hCG levels don't rise in a perfectly straight line — they fluctuate, and symptoms fluctuate with them. A day with fewer symptoms often reflects a natural dip in the rise, not a fall in levels.",
        },
        {
          heading: "Body adaptation",
          body: "As your body adjusts to the hormonal environment of pregnancy, the intensity of symptoms can reduce even while the pregnancy continues normally. Adaptation is a biological process, not a warning sign.",
        },
        {
          heading: "Individual variation in sensitivity",
          body: "Some people are more sensitive to hormonal changes than others. Those who are more sensitive may notice fluctuations more acutely — including both the presence and absence of symptoms.",
        },
      ],
      lessCauses: [
        {
          heading: "Placental transition beginning",
          body: "From around weeks 8–12, the placenta begins taking over hormone production from the corpus luteum. This transition can cause a temporary reduction in hCG-driven symptoms — particularly nausea and breast tenderness.",
        },
      ],
      whyItVaries:
        "Symptoms vary between people, between pregnancies, and between days. There is no consistent symptom pattern that indicates a healthy pregnancy — because healthy pregnancies look very different from person to person. The absence of symptoms is not, by itself, meaningful.",
    },
    timing: {
      whenStarts: "Symptom variation can occur at any point in the first trimester — including very early on.",
      whenPeaks: "Day-to-day variation is most common in weeks 5–10 when hCG levels are fluctuating most rapidly.",
      whenEases: "Most people notice more consistent (often reduced) symptoms from around weeks 12–14 as hormones stabilise — not because something is wrong, but because the body has adapted.",
    },
    whatItFeelsLike: [
      "A sudden absence of nausea that felt constant the day before",
      "Breast tenderness that was significant and has now eased",
      "Feeling almost normal — and finding that worrying",
      "A cycle of reassurance and renewed anxiety",
      "The impossibility of knowing what normal feels like when everything is new",
    ],
    whatThisMeans:
      "Symptoms are driven by hormones — and hormones fluctuate. A good day or a few hours of feeling well does not mean your pregnancy has changed. It means your hormone levels naturally varied, as they always do. Symptoms are not a reliable moment-to-moment measure of pregnancy health. The most reliable indicator of pregnancy health is medical assessment — not how you feel.",
    normal: [
      "Symptoms easing or disappearing for a day or two",
      "Nausea being stronger some days and absent others",
      "Breast tenderness coming and going",
      "Feeling significantly better for a period before symptoms return",
      "Symptoms gradually reducing from around week 10–12",
    ],
    seekSupport: [
      "Symptoms stopping alongside heavy bleeding",
      "Symptoms stopping alongside significant cramping or one-sided pain",
      "Any change that feels like more than normal fluctuation",
      "Anxiety that is significantly affecting your daily life — always worth raising",
    ],
    disclaimer: "This is not medical advice. If you have significant concerns about your pregnancy, please contact your midwife or healthcare provider. They will always take your concerns seriously.",
    whatYouCanDo: [
      { action: "Notice the pattern over a few days rather than hours", reason: "Single moments of feeling well are less meaningful than longer patterns" },
      { action: "Avoid repeated testing unless medically indicated", reason: "Repeated tests can increase anxiety without providing useful clinical information" },
      { action: "Contact your midwife if your anxiety is significant", reason: "An early reassurance scan may be available — your midwife will advise" },
      { action: "Try to avoid symptom-tracking as a primary coping mechanism", reason: "Symptoms are not a reliable indicator of health, and tracking them closely can amplify anxiety" },
    ],
    whatHappensNext:
      "In most cases, symptom fluctuation is a normal part of early pregnancy. From around weeks 10–14, many people experience a natural easing of symptoms as hormone levels stabilise — and this is entirely expected. If you are approaching the 12-week scan, this will provide a much more reliable picture of how the pregnancy is progressing.",
    relatedStage: {
      intro: "Symptom variation is most common in the first trimester. Understanding the stage you're in can help:",
      links: [
        { label: "Week 6", href: "/pregnancy/week/6", context: "Often when symptoms feel most intense — and fluctuation most noticeable." },
        { label: "Week 8", href: "/pregnancy/week/8", context: "A common week for anxiety about symptom variation." },
        { label: "Week 12", href: "/pregnancy/week/12", context: "When natural symptom easing often begins." },
        { label: "First Trimester Hub", href: "/pregnancy/first-trimester", context: "A grounded overview of what the first trimester is really like." },
      ],
    },
    aiPrompts: [
      "Is it normal for symptoms to suddenly stop at week 7?",
      "My nausea disappeared — should I be worried?",
      "What does symptom variation mean in early pregnancy?",
    ],
    captureIntro: "The uncertainty of early pregnancy is real — and worth acknowledging. Writing down how this stage felt creates a record of something that was genuinely significant, even when the outcome is happy.",
    trimester: [1],
    relatedWeeks: [5, 6, 7, 8, 9, 10, 12],
    relatedSlugs: ["nausea-in-early-pregnancy", "fatigue-in-early-pregnancy", "first-trimester-symptoms"],
  },
];

// ─── Public API ────────────────────────────────────────────────────────────

export const getArticle = (slug: string): ArticleData | null =>
  articleDatabase.find((a) => a.slug === slug) ?? null;

export const getAllArticles = (): ArticleData[] => articleDatabase;

export const getRelatedArticles = (slug: string, limit = 3): ArticleData[] =>
  articleDatabase.filter((a) => a.slug !== slug).slice(0, limit);
