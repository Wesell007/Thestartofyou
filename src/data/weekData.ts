// ─── Pregnancy Week Data ───────────────────────────────────────────────────
// Structured content for each week of pregnancy.
// Used by the WeekPage template at /pregnancy/week/:week

export interface WeekSymptom {
  name: string;
  why: string;
  when?: string;
}

export interface WeekSection {
  baby: {
    summary: string;
    detail: string;
    size: string;
  };
  body: {
    summary: string;
    why: string;
  };
  emotional: {
    summary: string;
  };
}

export interface WeekData {
  week: number;
  trimester: 1 | 2 | 3;
  trimesterLabel: string;
  trimesterPath: string;
  title: string;
  heroSubtitle: string;
  reassurance: string;
  keyFocus: string;
  atAGlance: string;
  what: WeekSection;
  symptoms: WeekSymptom[];
  normal: string[];
  seekSupport: string[];
  disclaimer: string;
  focusPoints: string[];
  normalRightNow: string[];
  gentleReminder: string;
  reflectionPrompt: string;
  aiPrompts: string[];
  captureIntro: string;
}

// ─── Helper to get trimester info ─────────────────────────────────────────
export const getTrimesterForWeek = (
  week: number
): { trimester: 1 | 2 | 3; label: string; path: string } => {
  if (week <= 12) return { trimester: 1, label: "First Trimester", path: "/pregnancy/first-trimester" };
  if (week <= 27) return { trimester: 2, label: "Second Trimester", path: "/pregnancy/second-trimester" };
  return { trimester: 3, label: "Third Trimester", path: "/pregnancy/third-trimester" };
};

// ─── Week-specific data ────────────────────────────────────────────────────

const weekDatabase: Record<number, Omit<WeekData, "week" | "trimester" | "trimesterLabel" | "trimesterPath">> = {

  // ─── WEEK 1 ───────────────────────────────────────────────────────────────
  1: {
    title: "1 Week Pregnant",
    heroSubtitle: "Technically, pregnancy week 1 begins on the first day of your last period — before conception has even occurred. Your body is preparing.",
    reassurance: "You may not know you're pregnant yet. This is the very beginning of a remarkable process.",
    keyFocus: "Preparation",
    atAGlance: "Week 1 is counted from the first day of your last menstrual period. Conception hasn't happened yet, but your body is preparing the environment that will support a new life.",
    what: {
      baby: { summary: "No embryo yet", detail: "Conception has not yet occurred this week. Your body is preparing the uterine lining for potential implantation.", size: "Not yet present" },
      body: { summary: "Your body is preparing for ovulation", why: "Hormones are rising to stimulate the development and release of a mature egg — a process that typically peaks around day 14." },
      emotional: { summary: "Many people feel nothing unusual this week. If you're actively trying to conceive, there may be a mix of hope and quiet anticipation." }
    },
    symptoms: [
      { name: "Menstrual period", why: "Week 1 coincides with the end of your previous cycle." },
      { name: "Mild cramping", why: "The uterus sheds its lining. Completely normal and expected.", when: "Days 1–5 of your cycle" },
    ],
    normal: ["Your period arriving as usual", "Mild to moderate cramping", "No pregnancy symptoms yet"],
    seekSupport: ["Unusually heavy bleeding", "Severe pain during your period"],
    disclaimer: "This is not medical advice. Always consult your midwife, doctor, or healthcare provider with any concerns.",
    focusPoints: ["Take folic acid if you haven't already — 400mcg daily is recommended", "Reduce alcohol and smoking if applicable", "No specific action needed this week — rest and wait"],
    normalRightNow: ["Not knowing you're pregnant yet", "Feeling completely normal", "Having your period as usual"],
    gentleReminder: "Every pregnancy begins here — quietly, without fanfare. The process has started even before you know it.",
    reflectionPrompt: "How are you feeling about this stage of your journey?",
    aiPrompts: ["What happens in week 1 of pregnancy?", "When does conception typically occur?", "How should I prepare for pregnancy?"],
    captureIntro: "The beginning of a journey is often quiet. This is week one — before most of it has begun.",
  },

  // ─── WEEK 4 ───────────────────────────────────────────────────────────────
  4: {
    title: "4 Weeks Pregnant",
    heroSubtitle: "Week 4 is often when a pregnancy test first turns positive. Implantation has occurred, and your body has begun producing pregnancy hormones.",
    reassurance: "Symptoms can vary at this stage — both strong and mild experiences are normal.",
    keyFocus: "Early confirmation",
    atAGlance: "This week, hormone levels are beginning to rise and a pregnancy test may now read positive. The embryo is tiny but already implanting and beginning to develop.",
    what: {
      baby: { summary: "Implantation has occurred", detail: "The fertilised egg has implanted into the uterine lining. At roughly the size of a poppy seed, it has already begun the process of dividing and forming layers that will become organs.", size: "Poppy seed (~0.2mm)" },
      body: { summary: "Rising hCG levels are beginning to signal changes throughout your body", why: "Human chorionic gonadotropin (hCG) — the pregnancy hormone — begins increasing rapidly. This triggers progesterone production, which maintains the uterine lining and can cause early symptoms." },
      emotional: { summary: "The moment of a positive test is rarely simple. It can bring joy, disbelief, anxiety, or all three at once. There is no correct response." }
    },
    symptoms: [
      { name: "Light spotting (implantation bleeding)", why: "As the embryo embeds into the uterine lining, some light spotting may occur.", when: "Around days 6–12 after ovulation" },
      { name: "Mild cramping", why: "The uterus is beginning to adjust to implantation.", when: "Often similar in feeling to pre-period cramping" },
      { name: "Breast tenderness", why: "Rising progesterone and oestrogen levels increase blood flow to breast tissue.", when: "Can begin very early and intensify through the first trimester" },
      { name: "Fatigue", why: "Your body is now directing significant energy toward establishing the pregnancy.", when: "Often begins this week and may intensify through weeks 6–9" },
    ],
    normal: ["Experiencing no symptoms at all", "Light spotting or cramping", "A very faint positive test", "Symptoms that come and go"],
    seekSupport: ["Heavy bleeding significantly different from a period", "Severe one-sided pain", "Any concern that doesn't settle"],
    disclaimer: "This is not medical advice. Always consult your midwife, doctor, or healthcare provider with any concerns.",
    focusPoints: ["Book a GP or midwife appointment if you haven't already", "Begin taking folic acid — 400mcg daily", "Rest where possible", "Avoid alcohol, smoking, and high-risk foods", "Try not to over-test or over-analyse symptoms"],
    normalRightNow: ["Feeling not much different yet", "Having very few or no symptoms", "Feeling a mix of excitement and anxiety", "Wondering if the test is really positive"],
    gentleReminder: "A positive test doesn't mean everything becomes clear immediately. It's okay to sit with the uncertainty of this week.",
    reflectionPrompt: "What has this week felt like for you — in ways you might not have expected?",
    aiPrompts: ["Is this normal at week 4?", "Why do I feel so tired already?", "What should I do after a positive test?"],
    captureIntro: "Week 4 is often the first moment of knowing. It can be overwhelming, quiet, joyful, or all of those at once.",
  },

  // ─── WEEK 5 ───────────────────────────────────────────────────────────────
  5: {
    title: "5 Weeks Pregnant",
    heroSubtitle: "Week 5 often marks the beginning of noticeable symptoms. Nausea, fatigue, and heightened senses are common as hormone levels continue to rise rapidly.",
    reassurance: "Symptoms can vary at this stage — both strong and mild experiences are normal.",
    keyFocus: "Symptoms & reassurance",
    atAGlance: "This week, hormone levels are rising quickly, which can make symptoms feel stronger. Some people feel very unwell, while others feel relatively normal — both are common.",
    what: {
      baby: { summary: "The embryo is developing its earliest structures", detail: "This week, the neural tube — which will become the brain and spinal cord — begins to form. The embryo has a basic head-to-tail axis and tiny folds that will become the heart and major organs.", size: "Sesame seed (~1.5mm)" },
      body: { summary: "hCG levels are roughly doubling every 48–72 hours this week", why: "This rapid hormone increase is responsible for most early symptoms. Progesterone is also rising, which slows digestion and can cause bloating, constipation, and nausea." },
      emotional: { summary: "Many people describe week 5 as the week it starts to feel real — in an often uncomfortable way. The mix of uncertainty, physical symptoms, and anticipation can be exhausting." }
    },
    symptoms: [
      { name: "Nausea", why: "Often caused by rising hCG levels. Not limited to mornings — it can occur at any time.", when: "Commonly begins around weeks 5–6 and may ease toward the end of the first trimester" },
      { name: "Fatigue", why: "Your body is using a significant amount of energy to build the foundation of the pregnancy. Progesterone also has a sedative effect.", when: "Often strongest in weeks 5–9" },
      { name: "Breast tenderness", why: "Increased blood flow and hormonal changes cause sensitivity and sometimes swelling.", when: "Can feel similar to pre-period tenderness, but often more pronounced" },
      { name: "Heightened smell sensitivity", why: "Oestrogen amplifies your sense of smell — often before you notice other symptoms.", when: "Can be one of the earliest signs for some people" },
      { name: "Increased urination", why: "Rising hCG increases blood flow to the kidneys, increasing urine production.", when: "Begins in early pregnancy and continues throughout" },
    ],
    normal: ["Nausea at any time of day, or no nausea at all", "Extreme tiredness, especially in the afternoon", "Symptoms that feel stronger or weaker day to day", "Feeling overwhelmed by the reality of being pregnant"],
    seekSupport: ["Severe vomiting preventing you from keeping fluids down", "Heavy bleeding", "Severe cramping or one-sided pain", "Any significant concern that isn't settling"],
    disclaimer: "This is not medical advice. Always consult your midwife, doctor, or healthcare provider with any concerns.",
    focusPoints: ["Eat small, regular meals to manage nausea", "Rest where possible — fatigue at this stage is significant", "Stay hydrated even when nausea is difficult", "Avoid overthinking symptom changes", "Keep things simple — you don't need to do everything this week"],
    normalRightNow: ["Feeling more tired than usual", "Symptoms changing unpredictably from day to day", "Feeling unsure or overwhelmed", "Wondering if everything is progressing normally"],
    gentleReminder: "If this week feels harder than expected, you're not alone. Early pregnancy can feel intense — even when everything is progressing normally.",
    reflectionPrompt: "What has felt most surprising, reassuring, or uncertain so far?",
    aiPrompts: ["Is this normal at week 5?", "Why do I feel so nauseous?", "What should I expect next week?"],
    captureIntro: "Week 5 is often when the reality of pregnancy starts to land. It can be intense, uncertain, and nothing like you expected.",
  },

  // ─── WEEK 6 ───────────────────────────────────────────────────────────────
  6: {
    title: "6 Weeks Pregnant",
    heroSubtitle: "A heartbeat may be detectable via internal scan this week. Symptoms often intensify as hCG levels reach their peak climb.",
    reassurance: "Symptoms can vary at this stage — both strong and mild experiences are normal.",
    keyFocus: "Early development",
    atAGlance: "Week 6 is a significant development milestone — a heartbeat is forming and may be visible on an early scan. Symptoms often peak this week as hormone levels continue their rapid climb.",
    what: {
      baby: { summary: "A heartbeat is forming — one of the earliest signs of life", detail: "The embryo's heart — originally just two tubes — is beginning to beat. The neural tube is closing, and small buds that will become arms and legs are appearing. Eyes and ears are starting to form.", size: "Lentil (~4–5mm)" },
      body: { summary: "Hormone levels are at or near their peak rate of increase", why: "hCG typically reaches its highest rate of increase in weeks 6–8 before levelling off. This correlates with when many people feel their worst — but also signals healthy early pregnancy." },
      emotional: { summary: "Week 6 can bring a mix of anxiety and wonder. If you're having an early scan, it can be a moment of profound relief — or unexpected complexity." }
    },
    symptoms: [
      { name: "Nausea (often peak this week)", why: "hCG levels are climbing fastest now, directly triggering nausea centres in the brain.", when: "Often worst in weeks 6–9" },
      { name: "Fatigue", why: "Progesterone is high, and your body is working hard to maintain and build the pregnancy environment.", when: "May feel stronger than in previous weeks" },
      { name: "Food aversions", why: "Hormonal changes alter taste and smell, making certain foods suddenly unappealing or nauseating." },
      { name: "Heightened emotions", why: "Rapid hormonal changes affect emotional regulation. Mood swings are common and expected." },
      { name: "Bloating", why: "Progesterone slows the digestive system, causing gas and bloating." },
    ],
    normal: ["Very strong nausea, or very little nausea", "Feeling emotionally unstable without a clear trigger", "Extreme fatigue — needing significantly more sleep", "Food aversions to previously liked foods"],
    seekSupport: ["Inability to keep any fluids down for 24+ hours", "Fever", "Heavy bleeding or significant pain", "Any concern that feels serious"],
    disclaimer: "This is not medical advice. Always consult your midwife, doctor, or healthcare provider with any concerns.",
    focusPoints: ["Eat whatever you can manage — nutrition perfection is not the goal right now", "Rest as much as your life allows", "Accept help where it's available", "Remember that peak symptoms often mean healthy hormone levels"],
    normalRightNow: ["Feeling worse than last week", "Not wanting to eat or only managing bland foods", "Feeling tearful or emotionally unpredictable", "Needing to sleep significantly more than usual"],
    gentleReminder: "If week 6 feels like the hardest yet, that's common. The intensity of symptoms often relates directly to hormone activity — which, for many people, is a reassuring sign.",
    reflectionPrompt: "What has surprised you most about how this week has felt?",
    aiPrompts: ["Is strong nausea at week 6 normal?", "When does morning sickness get better?", "What does a 6-week scan show?"],
    captureIntro: "Week 6 can feel relentless. It's worth pausing to acknowledge how much your body is doing — even when it's uncomfortable.",
  },

  // ─── WEEK 8 ───────────────────────────────────────────────────────────────
  8: {
    title: "8 Weeks Pregnant",
    heroSubtitle: "Your baby is now an embryo with distinct human features forming. This is a week of significant development — and often continued intense symptoms.",
    reassurance: "Symptoms can vary at this stage — both strong and mild experiences are normal.",
    keyFocus: "Symptoms & reassurance",
    atAGlance: "At 8 weeks, the embryo has all major organs beginning to form. Symptoms are often at their most intense this week, though many people also experience days where things ease slightly.",
    what: {
      baby: { summary: "All major organ systems are beginning to form", detail: "The embryo's facial features are becoming distinct — eyes, nose, and lips are developing. Fingers and toes are forming. The heart is now fully beating and pumping blood. The embryo moves, though you won't feel it for many weeks.", size: "Raspberry (~16mm)" },
      body: { summary: "Your uterus has roughly doubled in size from pre-pregnancy", why: "Even though the bump isn't visible yet, your uterus is growing significantly. Increased blood volume, heightened hormone levels, and expanding tissue all contribute to how your body is feeling." },
      emotional: { summary: "Week 8 can feel like a long way in — yet still very early. Anxiety and anticipation often coexist as the 12-week scan approaches." }
    },
    symptoms: [
      { name: "Nausea", why: "Still driven by high hCG levels. This is often the peak for many people.", when: "Typically worst weeks 6–10, then gradually easing" },
      { name: "Fatigue", why: "Your body is sustaining intensive development work. Blood volume is increasing. Rest is biologically necessary.", when: "Often intense through weeks 8–10 before improving" },
      { name: "Frequent urination", why: "Your kidneys are processing significantly more blood volume, and the growing uterus is beginning to press on the bladder." },
      { name: "Mood changes", why: "Hormonal fluctuations directly affect emotional regulation. This is physiological, not a sign of weakness." },
      { name: "Constipation", why: "Progesterone slows digestion throughout the body. This is very common in the first trimester." },
    ],
    normal: ["Nausea that varies significantly day to day", "Feeling fine one day and very unwell the next", "No visible bump but feeling physically different", "Anxiety about the 12-week scan"],
    seekSupport: ["Vomiting so severe you can't stay hydrated", "Heavy bleeding", "Severe abdominal pain", "Any concern that feels serious or is getting worse"],
    disclaimer: "This is not medical advice. Always consult your midwife, doctor, or healthcare provider with any concerns.",
    focusPoints: ["Rest is productive — your body is doing enormous work", "Eat small meals frequently to manage nausea", "Stay hydrated with whatever you can manage", "Avoid spending too much time online searching symptoms", "Let people support you where you can"],
    normalRightNow: ["Feeling more tired than you've ever been", "Symptoms appearing, disappearing, then returning", "Feeling anxious about the 12-week scan", "Wondering if everything is okay"],
    gentleReminder: "If this week feels hard, you're not imagining it. Week 8 is often one of the most physically demanding weeks of early pregnancy. You're not behind — you're doing exactly what you need to do.",
    reflectionPrompt: "What has felt most surprising or challenging this week?",
    aiPrompts: ["Is this normal at week 8?", "Why do I feel so unwell?", "What should I expect next?"],
    captureIntro: "Week 8 is often when early pregnancy feels most real — and most intense. These are moments worth holding onto.",
  },

  // ─── WEEK 12 ──────────────────────────────────────────────────────────────
  12: {
    title: "12 Weeks Pregnant",
    heroSubtitle: "The 12-week scan is approaching or has just happened. This milestone often marks a turning point — both physically and emotionally.",
    reassurance: "Reaching 12 weeks is a significant moment. Symptoms may begin to ease for many people from this point.",
    keyFocus: "12-week scan & transition",
    atAGlance: "Week 12 marks the end of the first trimester. The 12-week scan checks for early signs of chromosomal conditions, confirms dates, and — for many — provides significant reassurance.",
    what: {
      baby: { summary: "The baby is fully formed in miniature", detail: "By week 12, all major organs and structures are in place. The baby is now a foetus. Fingernails, genitals, and facial muscles are developing. The baby moves, but you won't feel it yet.", size: "Lime (~55mm)" },
      body: { summary: "The placenta is taking over hormone production from the corpus luteum", why: "This transition often coincides with a reduction in nausea for many people. Your body has also adapted to many of the changes of early pregnancy, and some symptoms ease as a result." },
      emotional: { summary: "The 12-week scan is an emotionally complex event. It can bring relief, wonder, and renewed anxiety — sometimes in the same moment." }
    },
    symptoms: [
      { name: "Reducing nausea (for many)", why: "As the placenta takes over hormone production, the sharp rise in hCG levels that caused nausea begins to stabilise.", when: "Often improves from weeks 12–14, though not for everyone" },
      { name: "Continued fatigue", why: "Still present but often beginning to ease as the body adjusts to sustained pregnancy.", when: "Usually improves significantly in the second trimester" },
      { name: "Mild headaches", why: "Increased blood volume and changes in circulation can cause headaches, especially if hydration is low." },
      { name: "Round ligament discomfort", why: "As the uterus grows beyond the pelvis, the ligaments supporting it stretch and can cause brief sharp pains." },
    ],
    normal: ["Symptoms beginning to ease, or staying the same", "Anxiety before and after the scan", "Feeling emotionally different after seeing the scan", "A sense of things becoming more real"],
    seekSupport: ["Heavy bleeding or significant cramping at any point", "Fever or signs of infection", "Severe headaches that don't ease", "Any concern — always worth raising"],
    disclaimer: "This is not medical advice. Always consult your midwife, doctor, or healthcare provider with any concerns.",
    focusPoints: ["Attend your 12-week scan", "Allow yourself to feel whatever you feel after the scan", "Begin sharing your news if you're ready", "Let the first trimester be behind you"],
    normalRightNow: ["Feeling anxious before the scan", "Feeling tearful or emotional after seeing the scan", "Symptoms improving — or not yet", "Wondering what comes next"],
    gentleReminder: "The 12-week point is significant — and it's okay to let it feel that way. You've navigated a genuinely hard stage of pregnancy.",
    reflectionPrompt: "What do you want to remember about these first 12 weeks?",
    aiPrompts: ["What does the 12-week scan check for?", "Is it normal for symptoms to ease now?", "What happens in the second trimester?"],
    captureIntro: "The first trimester is nearly complete. It's been intense, quiet, and significant all at once — worth capturing before it passes.",
  },

  // ─── WEEK 16 ──────────────────────────────────────────────────────────────
  16: {
    title: "16 Weeks Pregnant",
    heroSubtitle: "You're in the second trimester now. Energy often returns this week, and the baby is growing quickly. First movements may not be far away.",
    reassurance: "Many people feel significantly better in the second trimester. If you still have symptoms, that's also normal.",
    keyFocus: "Growth & settling in",
    atAGlance: "Week 16 often marks a period of increased energy and wellbeing. The baby is actively developing and first movements — if not already felt — may begin in the coming weeks.",
    what: {
      baby: { summary: "The baby is growing rapidly and beginning to develop unique features", detail: "At week 16, the baby's facial muscles allow for expressions. Eyes are sensitive to light. Taste buds are forming. The baby may be making breathing movements with amniotic fluid.", size: "Avocado (~116mm)" },
      body: { summary: "Your bump may be becoming visible for the first time", why: "The uterus has risen out of the pelvis and is now visible above the pubic bone. Skin may begin to stretch, and some people notice the beginning of a pregnancy glow — though this is not universal." },
      emotional: { summary: "For many people, week 16 brings a sense of settling. Anxiety can still be present — particularly the anticipation of the 20-week scan — but many people feel more connected to their pregnancy by this point." }
    },
    symptoms: [
      { name: "Reduced nausea", why: "hCG levels have stabilised and the placenta is now fully in control of hormone production.", when: "For most people, nausea has significantly reduced by week 16" },
      { name: "Back pain", why: "As your uterus grows and your centre of gravity shifts, back muscles begin to compensate.", when: "Can increase throughout the second trimester" },
      { name: "Skin changes", why: "Increased oestrogen affects skin pigmentation and elasticity. Stretch marks may begin to appear.", when: "Varies widely between individuals" },
      { name: "Nasal congestion", why: "Increased blood flow and oestrogen can cause swelling in the nasal passages — pregnancy rhinitis.", when: "Common throughout pregnancy" },
    ],
    normal: ["More energy than in the first trimester", "A visible bump beginning to show", "Back discomfort", "Feeling more emotionally settled (or not yet — both are valid)"],
    seekSupport: ["Severe headaches, swelling, or visual disturbances", "Heavy bleeding", "Reduced or absent movement once you've established a pattern", "Any concern worth raising"],
    disclaimer: "This is not medical advice. Always consult your midwife, doctor, or healthcare provider with any concerns.",
    focusPoints: ["Prepare for the 20-week scan if you haven't already", "Begin noticing movement patterns when they start", "Stay active in a way that feels manageable", "Give yourself credit for reaching this point"],
    normalRightNow: ["More energy returning gradually", "Starting to show more visibly", "Anticipating first movements", "Feeling a new kind of connection to the pregnancy"],
    gentleReminder: "The second trimester often brings a gentler rhythm — but it's okay if it doesn't feel entirely easy yet. Adjustment takes time.",
    reflectionPrompt: "How does pregnancy feel different now compared to the first trimester?",
    aiPrompts: ["When will I feel my baby move?", "What does a 16-week bump look like?", "What should I prepare for the 20-week scan?"],
    captureIntro: "Week 16 often marks a shift. Energy returns, things feel more real — and the journey continues.",
  },

  // ─── WEEK 20 ──────────────────────────────────────────────────────────────
  20: {
    title: "20 Weeks Pregnant",
    heroSubtitle: "Halfway. The 20-week anatomy scan is typically this week — one of the most significant appointments of the pregnancy.",
    reassurance: "The anatomy scan can feel emotionally intense. Feeling anxious about it is entirely normal.",
    keyFocus: "Anatomy scan milestone",
    atAGlance: "Week 20 marks the halfway point. The anatomy scan checks the baby's structure and development in detail — a significant milestone that often brings relief, but can also bring complex feelings.",
    what: {
      baby: { summary: "The baby's anatomy can now be checked in detail", detail: "At 20 weeks, the baby's organs, limbs, spine, and brain can all be assessed. The baby is swallowing amniotic fluid, and movement is regular. If you wish to know the sex, this is often when it can be determined.", size: "Banana (~166mm)" },
      body: { summary: "Your uterus now reaches your navel", why: "The fundal height — the top of the uterus — is approximately at your belly button. Blood volume has increased by around 45%. Most people are visibly pregnant by this point." },
      emotional: { summary: "The 20-week scan is often anticipated with anxiety. It checks for structural conditions, and many people find the wait for results genuinely hard. Feeling unsettled before and after is very common." }
    },
    symptoms: [
      { name: "Fetal movement (quickening)", why: "By week 20, most people have noticed first movements. These may feel like flutters, bubbles, or light taps.", when: "Often felt between weeks 16–22 for first pregnancies, earlier for subsequent ones" },
      { name: "Back and hip pain", why: "The hormone relaxin is loosening joints and ligaments in preparation for birth, which can cause discomfort.", when: "Increases through the second and third trimesters" },
      { name: "Heartburn", why: "The growing uterus pushes stomach acid upward. Progesterone also relaxes the valve between stomach and oesophagus.", when: "Often begins in the second trimester and can intensify in the third" },
      { name: "Swelling in feet and ankles", why: "Increased blood volume and pressure from the growing uterus can cause mild fluid retention." },
    ],
    normal: ["Anxiety about the anatomy scan", "Feeling movement regularly, or just starting to feel it", "Mild swelling in extremities", "Complex emotional reactions to scan results"],
    seekSupport: ["Sudden severe swelling, especially with headaches or visual disturbances", "Reduced or absent movement", "Bleeding or significant pain", "Any concern from scan results you're unsure about"],
    disclaimer: "This is not medical advice. Always consult your midwife, doctor, or healthcare provider with any concerns.",
    focusPoints: ["Prepare questions for the sonographer before your scan", "Allow yourself time to process the scan, whatever the result", "Start noticing movement patterns daily", "Take the rest of this week gently after the scan"],
    normalRightNow: ["Feeling anxious about the scan", "Not yet feeling regular movement", "Feeling overwhelmed by being halfway", "Wondering how your life will change"],
    gentleReminder: "Halfway doesn't mean you need to have everything figured out. It means you've come further than you might have realised.",
    reflectionPrompt: "What feels different now that you're halfway through the pregnancy?",
    aiPrompts: ["What does the 20-week anatomy scan check for?", "Is reduced movement at week 20 normal?", "What happens in the second half of pregnancy?"],
    captureIntro: "Halfway. The scan, the movement, the growing reality — week 20 is worth pausing to mark.",
  },

  // ─── WEEK 28 ──────────────────────────────────────────────────────────────
  28: {
    title: "28 Weeks Pregnant",
    heroSubtitle: "You've entered the third trimester. The final stage brings its own distinct rhythm — preparation, physicality, and quiet anticipation.",
    reassurance: "Third trimester symptoms can be demanding. Taking things one week at a time is enough.",
    keyFocus: "Third trimester begins",
    atAGlance: "Week 28 marks the start of the third trimester. The baby is growing rapidly and preparing for birth. Your body is changing again — and the end, though weeks away, is now on the horizon.",
    what: {
      baby: { summary: "The baby is beginning to practise for life outside the womb", detail: "At 28 weeks, the baby's brain is developing rapidly. Eyes can now open and close. The baby is practising breathing movements with amniotic fluid. Survival outside the womb is now possible with medical support.", size: "Aubergine (~250mm)" },
      body: { summary: "Third trimester physical changes are now significant", why: "Your uterus is large enough to cause compression on the diaphragm, stomach, and bladder. Many second trimester symptoms may return or intensify — heartburn, breathlessness, and pelvic pressure are all common." },
      emotional: { summary: "The third trimester often brings anticipation mixed with a kind of quiet intensity. Birth is real now — close enough to think about, but still far enough to carry uncertainty." }
    },
    symptoms: [
      { name: "Breathlessness", why: "The growing uterus is now pressing against the diaphragm, reducing lung capacity.", when: "Often improves briefly at the end of pregnancy when the baby drops" },
      { name: "Braxton Hicks contractions", why: "Practice contractions that help prepare the uterus for labour. Usually irregular and painless.", when: "Can begin in the second trimester and become more noticeable in the third" },
      { name: "Pelvic pressure and discomfort", why: "The baby's weight is now significant and presses on the pelvic floor.", when: "Increases through the third trimester" },
      { name: "Sleep difficulties", why: "Physical discomfort, frequent urination, and anxiety can all disrupt sleep.", when: "Often worsens through the third trimester" },
      { name: "Heartburn returning", why: "The uterus continues to push stomach contents upward. The stomach has less space.", when: "Often peaks in the third trimester" },
    ],
    normal: ["Feeling more physically limited", "Waking frequently at night", "Braxton Hicks contractions", "Feeling more emotionally focused on birth"],
    seekSupport: ["Regular contractions before 37 weeks", "Reduced fetal movement", "Sudden severe headaches, visual disturbances, or significant swelling", "Any concern that feels urgent"],
    disclaimer: "This is not medical advice. Always consult your midwife, doctor, or healthcare provider with any concerns.",
    focusPoints: ["Begin thinking about a birth plan — not as a rigid plan, but as a set of preferences", "Continue monitoring fetal movement", "Rest where possible — the third trimester is physically demanding", "Connect with your midwife about what to expect in the coming weeks"],
    normalRightNow: ["Feeling more tired again", "Physical discomfort increasing", "Thinking about birth more frequently", "Feeling a mix of readiness and fear"],
    gentleReminder: "The third trimester is a long final stretch. It doesn't need to be powered through — it can be navigated one week at a time.",
    reflectionPrompt: "As the third trimester begins, what feels most present for you right now?",
    aiPrompts: ["What's normal in the third trimester?", "When do I need to worry about contractions?", "What should I prepare before birth?"],
    captureIntro: "The third trimester has a quality all its own — heavy, quiet, and full of waiting. These are weeks worth remembering.",
  },

  // ─── WEEK 36 ──────────────────────────────────────────────────────────────
  36: {
    title: "36 Weeks Pregnant",
    heroSubtitle: "Nearly there. The baby may drop into position this week, and your body is making its final preparations. Birth is close.",
    reassurance: "Physical discomfort at this stage is significant. You are very close to the end.",
    keyFocus: "Final preparation",
    atAGlance: "Week 36 marks the final weeks of pregnancy. The baby is nearly full term, your body is preparing for labour, and the physical and emotional intensity of this stage is at its peak.",
    what: {
      baby: { summary: "The baby is nearly ready for birth", detail: "At 36 weeks, the baby's lungs are nearly mature. The baby may move into a head-down position if not already. Fat layers are building for warmth and energy. The baby is sleeping in cycles and responding to sound.", size: "Honeydew melon (~470mm)" },
      body: { summary: "Your body is preparing for labour in ways you may begin to notice", why: "The cervix may begin to soften and efface. The baby dropping into the pelvis can relieve pressure on the diaphragm but increase pelvic discomfort. Braxton Hicks contractions may become more frequent." },
      emotional: { summary: "Week 36 often brings a particular kind of intensity — anticipation, anxiety about birth, and a growing readiness that sits alongside uncertainty." }
    },
    symptoms: [
      { name: "Increased pelvic pressure", why: "As the baby descends into the pelvis, pressure on the pelvic floor and bladder increases significantly.", when: "Can occur weeks before labour or closer to the date" },
      { name: "Increased Braxton Hicks", why: "Practice contractions increase in frequency as the body prepares for labour.", when: "Irregular and without a building pattern — unlike true labour" },
      { name: "Nesting urge", why: "A burst of energy and motivation to prepare the home. Not universal, but common.", when: "Often most noticeable in the final few weeks" },
      { name: "Difficulty sleeping", why: "Physical discomfort, frequent urination, and heightened anxiety about birth all contribute.", when: "Often peaks in the final weeks of pregnancy" },
    ],
    normal: ["Feeling physically exhausted and ready", "Anxiety about labour and birth", "Increased frequency of Braxton Hicks", "Nesting urges — or feeling too tired to nest"],
    seekSupport: ["Regular contractions (every 5 minutes, lasting 1 minute, for 1 hour)", "Waters breaking", "Heavy bleeding", "Reduced fetal movement — always worth contacting your midwife"],
    disclaimer: "This is not medical advice. Always consult your midwife, doctor, or healthcare provider with any concerns.",
    focusPoints: ["Know the signs of early labour and when to contact your midwife", "Ensure your hospital bag is packed or being packed", "Rest as much as you can", "Trust that your body has been preparing for this"],
    normalRightNow: ["Feeling ready and not ready simultaneously", "Physical discomfort at its most significant", "Thinking about birth every day", "Feeling emotionally close to the surface"],
    gentleReminder: "You are very close. The uncertainty you're feeling is not a sign of unreadiness — it's simply what the end of pregnancy feels like.",
    reflectionPrompt: "What do you want to remember about these final weeks before birth?",
    aiPrompts: ["What are the signs of early labour?", "How do I know if my waters have broken?", "What should I pack in my hospital bag?"],
    captureIntro: "These final weeks before birth have a quality unlike any other. They pass quickly — and are worth capturing.",
  },

  // ─── WEEK 40 ──────────────────────────────────────────────────────────────
  40: {
    title: "40 Weeks Pregnant",
    heroSubtitle: "Your due date. This week marks the end of the full 40-week pregnancy — though many babies arrive in the days or weeks before or after.",
    reassurance: "Only around 5% of babies are born on their due date. Arriving before or after is common and normal.",
    keyFocus: "Due date & waiting",
    atAGlance: "Week 40 is the official due date. The baby is fully ready for birth — and birth can happen any day now. Waiting at this stage is normal, even when it feels hard.",
    what: {
      baby: { summary: "The baby is fully developed and ready for birth", detail: "At week 40, the baby has well-developed lungs, a layer of vernix (protective coating), and fully formed organs. The skull bones are slightly soft to ease passage through the birth canal. The baby is ready.", size: "Small pumpkin (~510mm)" },
      body: { summary: "Your body is fully prepared for labour", why: "The cervix is ripening and the body is producing high levels of oxytocin and prostaglandins. These hormones trigger labour — the exact timing varies and is not fully understood even by medical science." },
      emotional: { summary: "The due date can feel anticlimactic if the baby hasn't arrived. Anxiety, impatience, and a particular kind of suspended anticipation are all very common." }
    },
    symptoms: [
      { name: "Loss of mucus plug", why: "The cervix begins to open, releasing the plug that sealed it during pregnancy.", when: "Can happen days or weeks before labour" },
      { name: "Increased pelvic pressure", why: "The baby is low in the pelvis.", when: "Ongoing and increasing as labour approaches" },
      { name: "Irregular contractions", why: "Braxton Hicks or early labour contractions may increase.", when: "True labour contractions will be regular and increasing in intensity" },
      { name: "Emotional intensity", why: "Anticipation, anxiety about birth, and the approaching change in your life all converge.", when: "This week and in the days surrounding it" },
    ],
    normal: ["The baby not yet being born on the due date", "Feeling anxious or impatient", "Irregular contractions that don't progress", "Mixed emotions as the due date passes"],
    seekSupport: ["Reduced fetal movement — always contact your midwife", "Regular contractions every 5 minutes", "Waters breaking — clear, green, or brown fluid", "Any concern — your midwife will always want to hear from you"],
    disclaimer: "This is not medical advice. Always consult your midwife, doctor, or healthcare provider with any concerns.",
    focusPoints: ["Stay in contact with your midwife about induction options if relevant", "Continue monitoring fetal movement", "Try to rest — labour requires energy", "Let people support you through the waiting"],
    normalRightNow: ["Due date passing without labour beginning", "Feeling a mix of readiness and fear", "Every sensation feeling like 'is this it?'", "Feeling physically and emotionally at capacity"],
    gentleReminder: "Your due date is an estimate, not a deadline. Your baby will arrive. The waiting — as hard as it is — will end.",
    reflectionPrompt: "As you wait for birth, what do you most want to hold onto from this pregnancy?",
    aiPrompts: ["What happens if I go past my due date?", "What are the signs of labour starting?", "What is induction and when is it offered?"],
    captureIntro: "The final days of pregnancy. Suspended, intense, and profoundly significant — even when nothing is happening.",
  },
};

// ─── Fallback generator for weeks without specific data ────────────────────
const generateWeekData = (week: number): Omit<WeekData, "week" | "trimester" | "trimesterLabel" | "trimesterPath"> => {
  const { trimester } = getTrimesterForWeek(week);

  const trimesterContexts = {
    1: {
      heroSubtitle: `Week ${week} is part of the first trimester — a period of significant internal change, often invisible to others.`,
      keyFocus: "Early development",
      symptoms: [
        { name: "Nausea", why: "Rising hCG levels stimulate nausea centres in the brain.", when: "Can occur at any time of day" },
        { name: "Fatigue", why: "Your body is directing significant energy toward establishing the pregnancy." },
        { name: "Breast tenderness", why: "Hormonal changes increase blood flow to breast tissue." },
      ],
      focusPoints: ["Rest where possible", "Take folic acid daily", "Eat small, regular meals", "Avoid over-researching symptoms"],
      gentleReminder: "The first trimester is often harder than it looks from the outside. You're doing more than you know.",
      captureIntro: `Week ${week} of pregnancy — a time of quiet but significant change.`,
    },
    2: {
      heroSubtitle: `Week ${week} sits in the second trimester — often a period of settling and growing awareness.`,
      keyFocus: "Growth & development",
      symptoms: [
        { name: "Back pain", why: "Your centre of gravity is shifting as the baby grows." },
        { name: "Heartburn", why: "The growing uterus pushes stomach acid upward." },
        { name: "Fetal movement", why: "The baby is active and growing — movements are becoming more regular." },
      ],
      focusPoints: ["Monitor fetal movement regularly", "Stay gently active", "Attend any scheduled appointments", "Rest when needed"],
      gentleReminder: "The second trimester is a time of adjustment. It's okay if it doesn't feel like the 'easy' part.",
      captureIntro: `Week ${week} — the pregnancy is becoming more real, more visible, and more present.`,
    },
    3: {
      heroSubtitle: `Week ${week} is part of the third trimester — the final stretch, bringing its own physical demands and quiet intensity.`,
      keyFocus: "Preparation & closeness",
      symptoms: [
        { name: "Pelvic pressure", why: "The baby's weight is pressing on the pelvic floor and bladder." },
        { name: "Sleep difficulties", why: "Physical discomfort and anticipation make sleep harder." },
        { name: "Braxton Hicks contractions", why: "Practice contractions are preparing the uterus for labour." },
      ],
      focusPoints: ["Monitor fetal movement daily", "Rest as much as possible", "Prepare for birth at your own pace", "Stay in contact with your midwife"],
      gentleReminder: "The third trimester is demanding. You are closer than it sometimes feels.",
      captureIntro: `Week ${week} — the end is closer now. These weeks have their own quality worth pausing to notice.`,
    },
  };

  const context = trimesterContexts[trimester];

  return {
    title: `${week} Weeks Pregnant`,
    heroSubtitle: context.heroSubtitle,
    reassurance: "Symptoms can vary at this stage — both strong and mild experiences are normal.",
    keyFocus: context.keyFocus,
    atAGlance: `Week ${week} continues the patterns of this stage. Development is ongoing, and your body is continuing to adapt to the demands of pregnancy.`,
    what: {
      baby: {
        summary: "Development is continuing week by week",
        detail: "Your baby is growing and developing every day. Key milestones vary by week — your midwife or healthcare provider is the best source of specific developmental information.",
        size: "Growing every week",
      },
      body: {
        summary: "Your body is continuing to adapt to the pregnancy",
        why: "Hormonal, physical, and structural changes are ongoing throughout pregnancy. These vary in intensity and type across different weeks and individuals.",
      },
      emotional: {
        summary: "Emotional experience in pregnancy is highly individual and can shift from week to week.",
      },
    },
    symptoms: context.symptoms,
    normal: ["Symptoms varying from week to week", "Some days feeling better than others", "Physical changes continuing", "Emotional complexity alongside physical experience"],
    seekSupport: ["Heavy bleeding", "Severe pain", "Reduced fetal movement (second and third trimesters)", "Any concern that feels serious"],
    disclaimer: "This is not medical advice. Always consult your midwife, doctor, or healthcare provider with any concerns.",
    focusPoints: context.focusPoints,
    normalRightNow: ["Feeling the effects of this stage of pregnancy", "Symptoms varying day to day", "Wondering what's normal", "Taking things one day at a time"],
    gentleReminder: context.gentleReminder,
    reflectionPrompt: "What has this week felt like for you?",
    aiPrompts: [`Is this normal at week ${week}?`, "What should I focus on this week?", "What comes next in my pregnancy?"],
    captureIntro: context.captureIntro,
  };
};

// ─── Public API ────────────────────────────────────────────────────────────
export const getWeekData = (week: number): WeekData => {
  const specific = weekDatabase[week];
  const { trimester, label, path } = getTrimesterForWeek(week);
  const base = specific ?? generateWeekData(week);
  return { week, trimester, trimesterLabel: label, trimesterPath: path, ...base };
};

export const getAdjacentWeeks = (week: number): { prev: number | null; next: number | null } => ({
  prev: week > 1 ? week - 1 : null,
  next: week < 40 ? week + 1 : null,
});
