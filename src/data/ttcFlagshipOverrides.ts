import type { ArticleData } from "@/data/articleData";

import ttcStageCycle from "@/assets/ttc-stage-cycle.jpg";
import ttcStageTiming from "@/assets/ttc-stage-timing.jpg";
import ttcStageWaiting from "@/assets/ttc-stage-waiting.jpg";
import guidanceTTC from "@/assets/guidance-ttc.jpg";
import week2Ovulation from "@/assets/week2-ovulation.jpg";
import week2BiologyDetail from "@/assets/week2-biology-detail.jpg";
import heroImplantation from "@/assets/article-hero-implantation.jpg";
import heroImplantationBleeding from "@/assets/article-hero-implantation-bleeding.jpg";
import heroEarlySymptoms from "@/assets/article-hero-early-symptoms.jpg";
import heroSymptomsStopping from "@/assets/article-hero-symptoms-stopping.jpg";
import heroSecondAnxiety from "@/assets/article-hero-second-anxiety.jpg";
import heroThirdEmotional from "@/assets/article-hero-third-emotional.jpg";
import cardBody from "@/assets/guidance-card-body.jpg";
import cardComfort from "@/assets/guidance-card-comfort.jpg";
import cardEmotional from "@/assets/guidance-card-emotional.jpg";
import cardMilestones from "@/assets/guidance-card-milestones.jpg";
import cardPlanning from "@/assets/guidance-card-planning.jpg";
import cardPractical from "@/assets/guidance-card-practical.jpg";
import cardQuiet from "@/assets/guidance-card-quiet.jpg";
import cardRest from "@/assets/guidance-card-rest.jpg";
import cardSafety from "@/assets/guidance-card-safety.jpg";
import cardTimelines from "@/assets/guidance-card-timelines.jpg";
import cardWellness from "@/assets/guidance-card-wellness.jpg";

type TTCOverride = Partial<
  Pick<
    ArticleData,
    | "journey"
    | "standfirst"
    | "keyTakeaways"
    | "editorialSections"
    | "faq"
    | "sources"
    | "lastUpdated"
    | "relatedSlugs"
    | "reviewedBy"
    | "hero"
    | "relatedStage"
  >
>;

const MAY_2026 = "May 2026";
const REVIEWER = "Jenny Joines";

export const ttcFlagshipOverrides: Record<string, TTCOverride> = {
  "ovulation-signs": {
    journey: ["trying-to-conceive"],
    reviewedBy: REVIEWER,
    lastUpdated: MAY_2026,
    hero: {
      src: week2Ovulation,
      alt: "A calm close view of hands resting low over the abdomen, reflecting attention to the ovulation window.",
    },
    keyTakeaways: [
      "The most useful ovulation clues are fertile cervical mucus, a positive LH test, and a temperature rise that confirms ovulation afterwards.",
      "No single sign is perfect on its own, and some people ovulate without noticing much at all.",
      "The days before ovulation matter more than the day after it, because sperm can wait for the egg but the egg cannot wait for sperm.",
      "If tracking is making you more anxious rather than more informed, scaling it back is a sensible TTC decision.",
    ],
    sources: [
      "NHS — Trying for a baby",
      "NICE — Fertility problems: assessment and treatment (CG156)",
      "Tommy's — Ovulation, fertile days and getting pregnant",
      "HFEA — Understanding ovulation and fertility",
    ],
    relatedSlugs: ["fertile-window", "signs-of-ovulation", "two-week-wait"],
    relatedStage: {
      intro: "Related TTC guidance:",
      links: [
        { label: "Fertile window", href: "/articles/fertile-window" },
        { label: "Ovulation calculator", href: "/trying-to-conceive/ovulation-calculator" },
        { label: "TTC Hub", href: "/trying-to-conceive" },
      ],
    },
    faq: [
      {
        question: "What is the most reliable sign of ovulation at home?",
        answer: "Fertile cervical mucus before ovulation and a positive ovulation predictor kit are the best signs that ovulation is close. A basal body temperature rise confirms it happened afterwards.",
      },
      {
        question: "Can I ovulate without any obvious signs?",
        answer: "Yes. Many people ovulate regularly without noticeable pain, discharge changes, or mood shifts. A lack of obvious signs is not the same as a lack of ovulation.",
      },
      {
        question: "Does ovulation pain mean the egg has definitely been released?",
        answer: "Not definitively. Mid-cycle pain can line up with ovulation, but it is a soft signal rather than proof. It is more useful when it appears alongside mucus or LH changes.",
      },
    ],
    editorialSections: [
      {
        id: "which-signs-matter-most",
        heading: "Which ovulation signs matter most",
        lead: "Ovulation signs are most useful when they help you narrow the fertile window, not when they tempt you into constant interpretation.",
        paragraphs: [
          "The clearest at-home signs are changes in cervical mucus, a positive ovulation predictor kit, and a basal body temperature rise that appears after ovulation. Each one tells you something slightly different, which is why using more than one often feels calmer than relying on just one.",
          "Fertile cervical mucus and LH tests tell you ovulation is likely approaching. Temperature tells you it has already happened. Taken together, they create a more honest picture of timing than symptom-spotting alone.",
        ],
        image: { src: ttcStageCycle, alt: "A TTC journal and cycle notes laid out neatly, representing careful but calm cycle tracking." },
      },
      {
        id: "cervical-mucus-and-lh",
        heading: "Cervical mucus and LH tests are the best predictors",
        lead: "If you only track one or two things, make them mucus and LH. They are the most practical indicators that your fertile days are opening.",
        paragraphs: [
          "As oestrogen rises before ovulation, cervical mucus becomes wetter, clearer, and stretchier. That slippery, egg-white style mucus helps sperm survive and travel, which is why it is such a meaningful fertility sign.",
          "LH tests add timing precision. A positive test usually means ovulation is likely within the next 24 to 36 hours. That makes the day of the positive, and the day after, good moments for intercourse if you're trying to conceive.",
        ],
        image: { src: ttcStageTiming, alt: "A close editorial view of cycle planning tools and simple timing notes used for TTC." },
      },
      {
        id: "temperature-pain-and-soft-signals",
        heading: "Temperature, pain, and the softer signals",
        lead: "Some signs are real but less precise. They can support the bigger picture without needing to carry all the weight.",
        paragraphs: [
          "A basal body temperature rise happens because progesterone increases after ovulation. It is useful for confirming that ovulation likely occurred, especially if you are looking back over a full cycle rather than trying to predict one day in advance.",
          "Ovulation pain, libido shifts, or slight spotting can happen too, but they are inconsistent. They can be part of your pattern without being universal or definitive, which is why they are better treated as supporting information rather than hard proof.",
        ],
        image: { src: week2BiologyDetail, alt: "A biological close-up style image reflecting the hormonal and ovarian changes around ovulation." },
      },
      {
        id: "what-if-signs-are-unclear",
        heading: "What if your signs are unclear or absent",
        lead: "Plenty of people ovulate without dramatic signs. A quiet cycle is not automatically a problematic one.",
        paragraphs: [
          "Some bodies simply do not produce obvious discharge changes, noticeable mid-cycle pain, or a strong sense of timing. That can be frustrating when TTC content makes it sound as though ovulation should announce itself loudly every month.",
          "If your periods are broadly regular, ovulation is still likely to be happening. If cycles are very irregular, very long, or you rarely bleed at all, that is the point where a GP conversation becomes more useful than more home guessing.",
        ],
        image: { src: cardQuiet, alt: "A quiet, reflective interior scene that reflects uncertainty during TTC." },
        callout: {
          tone: "reassurance",
          text: "Noticing less than other people describe does not mean you are doing TTC badly. Many ovulatory cycles are surprisingly quiet.",
        },
      },
      {
        id: "using-signs-without-spiralling",
        heading: "How to use ovulation signs without spiralling",
        lead: "The aim is not to become a full-time observer of your body. The aim is to know enough to time things kindly and then step back.",
        paragraphs: [
          "For many people, one or two cycles of closer tracking can teach a lot. After that, it often helps to simplify: notice mucus, use LH tests around the expected window, and let the rest be background rather than the main event of the month.",
          "If tracking is fuelling tension, conflict, or dread, it is worth loosening it. TTC is not more effective just because it feels more intense.",
        ],
        image: { src: guidanceTTC, alt: "A calm TTC guidance visual suggesting a grounded and supportive approach rather than obsessive tracking." },
      },
    ],
  },

  "fertile-window": {
    journey: ["trying-to-conceive"],
    reviewedBy: REVIEWER,
    lastUpdated: MAY_2026,
    hero: {
      src: ttcStageTiming,
      alt: "A premium editorial scene of a calendar and gentle TTC planning notes, representing fertile-window timing.",
    },
    keyTakeaways: [
      "The fertile window is about six days long, but the highest-conception days are usually the two days before ovulation and ovulation day itself.",
      "You do not need perfect timing to conceive. Regular intercourse across the window is usually more realistic and just as effective.",
      "Apps that assume day 14 ovulation are often wrong for real cycles.",
      "Tracking one ovulation signal is usually enough to move from guessing to informed timing.",
    ],
    sources: [
      "NHS — Trying for a baby",
      "NICE — Fertility problems: assessment and treatment (CG156)",
      "Tommy's — When am I most fertile?",
      "HFEA — Fertility and timing intercourse",
    ],
    relatedSlugs: ["ovulation-signs", "can-you-get-pregnant-on-your-period", "two-week-wait"],
    faq: [
      {
        question: "How many days before ovulation can you conceive?",
        answer: "Up to about five days before ovulation, because sperm can survive in fertile cervical mucus. The best chances are usually in the two days before ovulation.",
      },
      {
        question: "Do I need to have sex on the exact day of ovulation?",
        answer: "No. In fact, conception often happens from intercourse in the day or two before ovulation rather than after the egg is released.",
      },
      {
        question: "What if my cycle length changes month to month?",
        answer: "Then calendar counting becomes less reliable, and using mucus, LH tests, or temperature can give a better sense of where the fertile window really is.",
      },
    ],
    editorialSections: [
      {
        id: "what-the-window-actually-is",
        heading: "What the fertile window actually is",
        lead: "The fertile window is not one magical day. It is a short run of days where sperm and egg timing can realistically overlap.",
        paragraphs: [
          "Sperm can survive in the reproductive tract for up to five days when cervical mucus is supportive. The egg, by contrast, only remains fertilisable for about 12 to 24 hours after ovulation. That is why the window begins before ovulation, not after it.",
          "This matters because TTC advice often overfocuses on one exact date. In real life, the window is a range, and conception is more forgiving than many people fear.",
        ],
        image: { src: cardTimelines, alt: "A timeline-style editorial image representing the sequence of fertile days in a cycle." },
      },
      {
        id: "best-days-for-conception",
        heading: "Which days are actually best for conception",
        lead: "The best conception days are usually the one to two days before ovulation, plus ovulation day itself.",
        paragraphs: [
          "Intercourse in the run-up to ovulation works well because sperm are already waiting when the egg is released. If intercourse only happens after ovulation, the window may already be closing.",
          "For most couples, aiming for every one to two days across the fertile stretch is enough. It keeps sperm available without making TTC feel like a performance schedule.",
        ],
        image: { src: week2Ovulation, alt: "A gentle ovulation-focused image representing the peak fertility days just before egg release." },
      },
      {
        id: "how-to-estimate-it",
        heading: "How to estimate your fertile window more accurately",
        lead: "If your cycle is regular, date counting gives a starting point. If it is not, ovulation signals matter much more.",
        paragraphs: [
          "In a typical cycle, ovulation usually happens about 12 to 16 days before the next period, not always on day 14. That means the fertile window can shift earlier or later depending on the total cycle length and on month-to-month variation.",
          "An ovulation calculator can give a helpful estimate, but it works best when it is combined with what your body is showing: wetter mucus, a positive LH test, or the temperature rise that confirms ovulation afterwards.",
        ],
        image: { src: ttcStageCycle, alt: "A TTC cycle-tracking scene showing notes and gentle cycle observation." },
      },
      {
        id: "why-timing-isnt-everything",
        heading: "Why timing matters, but isn't everything",
        lead: "Good timing improves the odds, but it does not guarantee conception that cycle.",
        paragraphs: [
          "Even with well-timed intercourse and no obvious fertility issues, conception is still a month-by-month probability rather than a certainty. That is why many healthy couples take several cycles to get pregnant.",
          "Knowing this can soften the emotional blow of a period arriving. A well-timed cycle that does not result in pregnancy is disappointing, but it is not automatically evidence that something is wrong.",
        ],
        image: { src: ttcStageWaiting, alt: "A calm waiting-focused TTC image representing the uncertainty after good timing." },
      },
      {
        id: "when-to-get-help",
        heading: "When the timing picture is worth checking with a clinician",
        lead: "Irregular, very short, or very long cycles can make the fertile window harder to spot and are worth discussing if TTC is not progressing.",
        paragraphs: [
          "If you have cycles shorter than 21 days, longer than 35 days, or highly unpredictable gaps between periods, the fertile window may be shifting in a way that makes home prediction difficult. A GP can help look at whether ovulation is happening consistently.",
          "The same applies if you have been trying for 12 months without success, or 6 months if you are 35 or over. That is standard fertility guidance, not a sign that you have somehow failed.",
        ],
        image: { src: cardPractical, alt: "A practical clinical image representing a calm fertility conversation with a doctor." },
      },
    ],
  },

  "how-long-implantation-takes": {
    journey: ["trying-to-conceive"],
    reviewedBy: REVIEWER,
    lastUpdated: MAY_2026,
    hero: {
      src: heroImplantation,
      alt: "A calm bedside scene in soft morning light, representing the quiet uncertainty of implantation timing.",
    },
    keyTakeaways: [
      "Implantation usually happens around 6 to 12 days after ovulation, most often around days 8 to 10.",
      "The process takes time, which is why testing too early often gives a false negative.",
      "Most people do not feel implantation happening.",
      "Light spotting can happen, but no spotting at all is more common than TTC forums often suggest.",
    ],
    sources: [
      "NHS — Pregnancy tests",
      "NICE — Ectopic pregnancy and miscarriage (NG126)",
      "Tommy's — Implantation bleeding and early pregnancy signs",
      "Human Reproduction Update — Implantation timing and early hCG rise",
    ],
    faq: [
      {
        question: "How many days after ovulation does implantation usually happen?",
        answer: "Usually between 6 and 12 days after ovulation, with day 8 to 10 being a common range.",
      },
      {
        question: "Can you feel implantation happening?",
        answer: "Usually not. Most people feel nothing specific at all, which is why sensations in the two-week wait are hard to interpret.",
      },
      {
        question: "Why does implantation timing matter for testing?",
        answer: "Because hCG only starts rising once implantation is complete. If implantation happened late, a test will also turn positive later.",
      },
    ],
    editorialSections: [
      {
        id: "timeline-after-fertilisation",
        heading: "What happens between fertilisation and implantation",
        lead: "Implantation is not immediate. The embryo needs several days to travel, divide, and reach the uterus before it can embed in the lining.",
        paragraphs: [
          "After fertilisation in the fallopian tube, the embryo keeps dividing as it moves towards the uterus. That journey typically takes a few days. Only once it reaches the uterine lining can implantation begin.",
          "This is why there is always a gap between ovulation and any possible positive test. Even if conception happened right away, the pregnancy is not yet connected to the uterine lining in those first days.",
        ],
        image: { src: week2BiologyDetail, alt: "A biological-detail image representing embryo travel and the early implantation timeline." },
      },
      {
        id: "when-implantation-most-often-happens",
        heading: "When implantation most often happens",
        lead: "The usual range is 6 to 12 days after ovulation, with most implantations clustering in the middle of that window.",
        paragraphs: [
          "Many TTC charts and forums talk as though implantation should happen on one exact day. Real biology is looser than that. Some embryos implant earlier, some later, and the window is broad enough that a single negative test at 9 or 10 DPO tells you very little.",
          "Late implantation can mean later hCG rise and later positive testing, but it is not automatically a sign of a problem. It is one reason patience is genuinely part of accurate testing.",
        ],
        image: { src: ttcStageTiming, alt: "A timing-focused TTC image representing the implantation window after ovulation." },
      },
      {
        id: "what-you-might-notice",
        heading: "What you might notice, and what you probably won't",
        lead: "Most people do not feel implantation. When something is noticed, it is usually light spotting or mild cramping, not a dramatic event.",
        paragraphs: [
          "The body sensations of the luteal phase are mostly driven by progesterone. That means cramps, breast tenderness, bloating, fatigue, and mood changes can all happen whether or not implantation has occurred.",
          "Light pink or brown spotting can happen for some people, but it is far from universal. No spotting, no twinge, and no distinct feeling is still a completely ordinary implantation story.",
        ],
        image: { src: heroImplantationBleeding, alt: "A soft editorial still life representing very light spotting and early uncertainty." },
      },
      {
        id: "why-testing-too-early-confuses-things",
        heading: "Why testing too early confuses things",
        lead: "Testing before implantation is complete will always be negative. Testing very soon after implantation can also be negative because hCG is still too low.",
        paragraphs: [
          "That is why 8, 9, or 10 DPO tests can be so emotionally misleading. They feel definitive in the moment but are often just too early to say anything meaningful.",
          "For most people, waiting until the day of the expected period gives a much truer answer. If you do test earlier, it helps to treat a negative as 'not yet known' rather than 'definitely no'.",
        ],
        image: { src: ttcStageWaiting, alt: "A waiting-focused TTC image representing the days between implantation and reliable testing." },
      },
      {
        id: "when-to-seek-help-after-spotting-or-pain",
        heading: "When spotting or pain needs checking",
        lead: "Most two-week-wait sensations are ordinary. A small number of patterns do warrant a medical conversation.",
        paragraphs: [
          "Bleeding that becomes period-like before you have tested positive may simply mean the cycle is ending. Heavy bleeding, severe pain, shoulder-tip pain, or faintness are different and should not be brushed off as implantation.",
          "Once you do have a positive test, heavier bleeding or one-sided pain needs prompt review because ectopic pregnancy and early miscarriage are time-sensitive to assess.",
        ],
        image: { src: cardSafety, alt: "A safety-focused image representing the point where early bleeding or pain should be checked." },
      },
    ],
  },

  "when-to-take-a-pregnancy-test": {
    journey: ["trying-to-conceive"],
    reviewedBy: REVIEWER,
    lastUpdated: MAY_2026,
    hero: {
      src: guidanceTTC,
      alt: "A premium TTC guidance image representing the decision of when to take a pregnancy test.",
    },
    keyTakeaways: [
      "The day of your expected period is the most reliable moment for home testing.",
      "Early-detection tests can work earlier, but a negative result before the expected period is not conclusive.",
      "First morning urine gives the clearest reading.",
      "Retesting after 48 hours is more informative than staring at the same uncertain result all day.",
    ],
    sources: [
      "NHS — Pregnancy tests",
      "NICE — Fertility problems: assessment and treatment (CG156)",
      "Tommy's — Pregnancy tests and early testing",
      "MHRA guidance on in vitro diagnostic test accuracy",
    ],
    faq: [
      {
        question: "What is the best day to take a pregnancy test?",
        answer: "Usually the day your period is due or later. That gives hCG the best chance of being high enough to detect reliably.",
      },
      {
        question: "Can I trust a negative test at 10 DPO?",
        answer: "Not fully. Ten DPO is often still too early, especially if implantation happened at the later end of the normal range.",
      },
      {
        question: "Should I use a digital or line test?",
        answer: "Line tests are often slightly more sensitive. Digital tests are easier to read once hCG is a bit higher. Either can be useful depending on what part of the process feels hardest.",
      },
    ],
    editorialSections: [
      {
        id: "why-test-timing-matters",
        heading: "Why test timing matters so much",
        lead: "Pregnancy tests are not wrong as often as they are simply used too early.",
        paragraphs: [
          "Home tests look for hCG in urine. That hormone does not begin rising until after implantation, and it starts low. If you test before enough hCG has built up, the result will be negative even if conception has happened.",
          "That is why timing changes everything. The same pregnancy can give a negative on one day and a clear positive two days later.",
        ],
        image: { src: cardTimelines, alt: "A timeline-led image representing hCG rise and the point where testing becomes reliable." },
      },
      {
        id: "expected-period-versus-early-testing",
        heading: "Testing on your expected period versus testing early",
        lead: "Early testing buys speed, but it also buys more uncertainty.",
        paragraphs: [
          "Most tests are designed to be reliable from the day the period is due. Earlier than that, accuracy drops because hCG may not yet be high enough to detect. Sensitive tests can sometimes pick it up, but they cannot make biology happen sooner.",
          "If testing early protects you emotionally, that is understandable. It just helps to know that an early negative is a maybe, not a no.",
        ],
        image: { src: ttcStageWaiting, alt: "A calm waiting image capturing the emotional gap between early testing and reliable testing." },
      },
      {
        id: "how-to-get-the-clearest-result",
        heading: "How to get the clearest possible result",
        lead: "A few practical details make a noticeable difference when you test.",
        paragraphs: [
          "First morning urine is usually the most concentrated, especially in the early days when hCG is still low. Testing after drinking a lot can dilute the hormone enough to make a faint line vanish or a real positive look negative.",
          "It also helps to follow the test instructions exactly, use the correct timing window, and compare like with like if you are retesting. Different brands can look surprisingly different at the same hCG level.",
        ],
        image: { src: cardPractical, alt: "A practical image representing a calm, careful home-testing routine." },
      },
      {
        id: "what-to-do-with-unclear-results",
        heading: "What to do with negative, faint, or unclear results",
        lead: "Most confusing results become clearer with time rather than with more interpretation.",
        paragraphs: [
          "If a test is negative before your expected period, the most useful next step is usually to wait 48 hours and test again. If the line is faint, compare it to a repeat test after two days rather than to internet photos or imagined averages.",
          "If your period still has not arrived a week later, and tests are still negative, it is reasonable to speak to your GP about late ovulation, cycle disruption, or whether another check is needed.",
        ],
        image: { src: cardQuiet, alt: "A quiet reflective image representing the emotional ambiguity of unclear test results." },
      },
      {
        id: "when-a-result-needs-medical-input",
        heading: "When a test result needs medical input",
        lead: "Most positives and negatives do not need urgent clinical review. A few combinations of symptoms do.",
        paragraphs: [
          "A positive test with heavy bleeding, severe cramping, one-sided pain, shoulder-tip pain, or faintness needs prompt medical attention. Those patterns can point to miscarriage or ectopic pregnancy and should not be left to guesswork.",
          "Equally, no period with repeated negatives for weeks on end can be worth checking, particularly if your cycles are usually regular. The aim is not alarm, just clarity.",
        ],
        image: { src: cardSafety, alt: "A safety-oriented image representing the point where pregnancy test results should be medically reviewed." },
      },
    ],
  },

  "faint-positive-pregnancy-test": {
    journey: ["trying-to-conceive"],
    reviewedBy: REVIEWER,
    lastUpdated: MAY_2026,
    hero: {
      src: cardQuiet,
      alt: "A soft editorial scene representing the uncertainty of seeing a faint positive pregnancy test.",
    },
    keyTakeaways: [
      "A faint coloured line inside the test's reading window is usually a real positive.",
      "Testing early and diluted urine are the commonest reasons lines look faint.",
      "Progression over 48 hours matters more than the exact darkness of one line.",
      "A line that fades with bleeding can point to a chemical pregnancy, which is common and not your fault.",
    ],
    sources: [
      "NHS — Pregnancy tests",
      "Tommy's — Early pregnancy tests and faint lines",
      "NICE — Ectopic pregnancy and miscarriage (NG126)",
      "Manufacturer guidance on home pregnancy test reading windows",
    ],
    faq: [
      {
        question: "Is a very faint line still positive?",
        answer: "If it is pink or coloured and appeared within the correct reading window, yes, it is usually a true positive.",
      },
      {
        question: "How do I tell a faint line from an evaporation line?",
        answer: "Evaporation lines usually appear after the reading window and are often grey or colourless. True faint positives appear in time and usually have some dye colour.",
      },
      {
        question: "How quickly should a faint line get darker?",
        answer: "Usually over about 48 hours, because hCG rises quickly in early pregnancy. Same-day comparisons are much less useful.",
      },
    ],
    editorialSections: [
      {
        id: "what-a-faint-line-usually-means",
        heading: "What a faint line usually means",
        lead: "A faint line most often means the test is catching a real pregnancy very early, when hCG is still low.",
        paragraphs: [
          "Pregnancy tests do not need a dark line to be positive. They only need enough hormone to trigger the dye. In the first days after implantation, that amount can be small, which is why the line can look lighter than people expect.",
          "It is very common for the emotional reaction to be bigger than the line itself. Tiny signs can carry a huge amount of hope.",
        ],
        image: { src: guidanceTTC, alt: "A TTC guidance image representing early positive testing and cautious hope." },
      },
      {
        id: "why-lines-look-faint",
        heading: "Why some true positives look so faint",
        lead: "Timing, test sensitivity, and urine concentration all influence how dark a line looks.",
        paragraphs: [
          "Testing before your missed period is the most common reason. Even in a progressing pregnancy, hCG may only just be high enough to trigger the test, especially if implantation happened at the later end of normal.",
          "Different brands also behave differently. A faint line on one test can look clearer on another, which is why progression is easier to interpret when you stick to the same brand for retesting.",
        ],
        image: { src: ttcStageTiming, alt: "A timing-focused TTC image representing early hCG levels and faint test lines." },
      },
      {
        id: "evaporation-lines-and-reading-windows",
        heading: "Evaporation lines and the importance of the reading window",
        lead: "The moment the line appeared matters as much as the line itself.",
        paragraphs: [
          "A true positive should appear inside the test's stated reading window. A line that appears much later, once the urine has dried, can be an evaporation line. Those are usually greyish or colourless and are not pregnancy positives.",
          "Because of that, checking the test repeatedly over hours rarely helps. Read it once in time, note what you saw, and then move to the next sensible step.",
        ],
        image: { src: cardPractical, alt: "A practical testing image emphasising correct reading-window timing." },
      },
      {
        id: "what-to-do-next",
        heading: "What to do next after a faint positive",
        lead: "Most of the time, the next step is simple: wait 48 hours and test again.",
        paragraphs: [
          "Using first morning urine and the same brand gives the cleanest comparison. If the line darkens, that is reassuring. If it stays the same, fades, or disappears, that can suggest the pregnancy is not progressing, and a chemical pregnancy becomes more likely.",
          "Some people prefer to move to a digital test after a couple of days. It is not necessarily more sensitive, but it can reduce the emotional strain of reading lines.",
        ],
        image: { src: ttcStageWaiting, alt: "A waiting-focused TTC image representing the 48-hour gap before retesting." },
      },
      {
        id: "when-faint-lines-need-checking",
        heading: "When a faint positive needs urgent checking",
        lead: "A faint line itself is not dangerous. Symptoms around it sometimes need attention.",
        paragraphs: [
          "Heavy bleeding, severe cramping, one-sided pain, shoulder-tip pain, or feeling faint after any positive test should be checked promptly. Those symptoms can point to miscarriage or ectopic pregnancy.",
          "If you are mainly dealing with uncertainty rather than urgent symptoms, it is still okay to ask for support. TTC rarely feels calm in moments like this, even when the answer turns out to be reassuring.",
        ],
        image: { src: cardSafety, alt: "A safety-focused image representing when faint positive tests need urgent medical review." },
      },
    ],
  },

  "chemical-pregnancy": {
    journey: ["trying-to-conceive", "support"],
    reviewedBy: REVIEWER,
    lastUpdated: MAY_2026,
    hero: {
      src: heroThirdEmotional,
      alt: "A soft, reflective emotional image representing the grief and tenderness around a chemical pregnancy.",
    },
    keyTakeaways: [
      "A chemical pregnancy is a real very early pregnancy loss, usually noticed through an early positive test followed by bleeding.",
      "It is common and is most often caused by chromosomal differences, not by anything you did or did not do.",
      "Physical recovery is usually straightforward, but the emotional impact can be much bigger than the timelines suggest.",
      "Repeated chemical pregnancies are worth discussing with a GP or fertility clinician.",
    ],
    sources: [
      "NHS — Miscarriage",
      "Tommy's — Chemical pregnancy",
      "NICE — Ectopic pregnancy and miscarriage (NG126)",
      "Miscarriage Association — Early loss information and support",
    ],
    faq: [
      {
        question: "Is a chemical pregnancy the same as a miscarriage?",
        answer: "Yes. It is a miscarriage that happens very early, usually before five weeks, often before anything could be seen on a scan.",
      },
      {
        question: "Did I do something to cause it?",
        answer: "Almost certainly not. Most chemical pregnancies happen because the embryo was never going to develop normally.",
      },
      {
        question: "When should I ask for investigations?",
        answer: "If you have repeated chemical pregnancies, especially more than one or two in a row, it is reasonable to ask your GP about whether any further checks are appropriate.",
      },
    ],
    editorialSections: [
      {
        id: "what-a-chemical-pregnancy-is",
        heading: "What a chemical pregnancy is",
        lead: "A chemical pregnancy means implantation happened, hCG began to rise, and then the pregnancy stopped developing very early.",
        paragraphs: [
          "It is usually only recognised because home tests are now sensitive enough to pick up pregnancies that older generations would never have known about. Without a test, it may simply have looked like a slightly late or heavier period.",
          "That does not make it unreal. If you had a positive test, however faint, a pregnancy had begun.",
        ],
        image: { src: cardMilestones, alt: "A soft milestone image representing the very early recognition of pregnancy and loss." },
      },
      {
        id: "why-it-happens",
        heading: "Why chemical pregnancies happen",
        lead: "Most are thought to happen because the embryo had chromosomal differences that meant it could not keep developing.",
        paragraphs: [
          "In most cases, there is nothing to prevent and nothing useful to blame. It is one of the ways conception can end very early, often before a pregnancy would have been clinically visible.",
          "Because TTC is so effortful, people often search for a behaviour, supplement, workout, or stress level that 'caused' it. That search is understandable, but it is rarely accurate or kind.",
        ],
        image: { src: week2BiologyDetail, alt: "A biological-detail image representing the early development stage where a chemical pregnancy can occur." },
      },
      {
        id: "what-bleeding-and-testing-can-look-like",
        heading: "What bleeding and testing can look like",
        lead: "The most common pattern is faint positives that do not progress, followed by bleeding that arrives a few days later.",
        paragraphs: [
          "The bleed may feel like a late period, a heavier period, or a crampier one. Some people notice line progression slow, stop, or reverse before bleeding begins. Others only know because a line that was there is gone when they retest.",
          "If bleeding becomes very heavy, pain is severe, or symptoms feel outside a normal period experience, it is worth getting medical advice rather than assuming all early loss looks the same.",
        ],
        image: { src: heroImplantationBleeding, alt: "A soft early-bleeding editorial image representing spotting and loss in the earliest days." },
      },
      {
        id: "emotional-weight",
        heading: "Why it can feel emotionally enormous",
        lead: "Chemical pregnancies are early in calendar terms, but they can still carry real attachment, hope, and grief.",
        paragraphs: [
          "Sometimes the grief is about the pregnancy itself. Sometimes it is about what it represented: finally getting a positive, finally feeling your body had done what you hoped, finally letting yourself imagine what came next.",
          "Because the loss is so early, people are often not sure whether they are 'allowed' to feel devastated. You are. There is no threshold at which a loss becomes valid.",
        ],
        image: { src: cardEmotional, alt: "An emotional editorial image representing grief after an early loss." },
      },
      {
        id: "trying-again-after-a-chemical",
        heading: "Trying again after a chemical pregnancy",
        lead: "Physically, it is often safe to try again the next cycle. Emotionally, readiness can take a different shape.",
        paragraphs: [
          "Many clinicians will say there is no need to wait after an uncomplicated chemical pregnancy. Ovulation often returns quickly and many people go on to conceive soon afterwards.",
          "But emotional readiness matters too. Some people want to keep moving immediately, while others need a cycle or two where TTC is not the centre of the month. Both responses make sense.",
        ],
        image: { src: cardPlanning, alt: "A planning-focused image representing the decision of whether and when to try again." },
      },
    ],
  },

  "trying-again-after-miscarriage": {
    journey: ["trying-to-conceive", "support"],
    reviewedBy: REVIEWER,
    lastUpdated: MAY_2026,
    hero: {
      src: heroSecondAnxiety,
      alt: "A calm reflective portrait-style image representing the mixed hope and fear of trying again after miscarriage.",
    },
    keyTakeaways: [
      "After an uncomplicated early miscarriage, there is usually no medical need to delay trying again.",
      "Physical readiness and emotional readiness are separate, and both matter.",
      "Trying again can intensify hope and anxiety at the same time.",
      "If you have had recurrent losses, later losses, or complications, personal medical advice is important.",
    ],
    sources: [
      "NHS — Miscarriage",
      "NICE — Ectopic pregnancy and miscarriage (NG126)",
      "Tommy's — Trying again after miscarriage",
      "Miscarriage Association — Emotional recovery and trying again",
    ],
    faq: [
      {
        question: "Is it medically safe to try again straight away?",
        answer: "After an uncomplicated early miscarriage, often yes. If there were complications, later loss, infection, or surgical treatment, you may need tailored advice.",
      },
      {
        question: "What if my partner and I feel differently about trying again?",
        answer: "That is extremely common. Grief and readiness do not move at the same speed for everyone, and it helps to talk about those timelines separately rather than assuming they will match.",
      },
      {
        question: "Will TTC after loss always feel more anxious?",
        answer: "Often yes, at least for a while. Even when you want to try again deeply, hope can feel much less carefree after loss.",
      },
    ],
    editorialSections: [
      {
        id: "medical-readiness",
        heading: "When it is medically safe to try again",
        lead: "For many early miscarriages, the medical answer is simpler than people expect: once bleeding has settled and you feel physically recovered, trying again is often fine.",
        paragraphs: [
          "Older advice often recommended waiting several cycles, but newer evidence has not shown a clear benefit to delaying after an uncomplicated early loss. In many cases, ovulation returns within a few weeks and conception can happen again in the next cycle.",
          "That said, later miscarriages, infection, retained tissue, surgery, or specific underlying conditions change the picture. Those situations deserve personalised advice rather than generic TTC timelines.",
        ],
        image: { src: cardPractical, alt: "A practical image representing a calm conversation about medical readiness after miscarriage." },
      },
      {
        id: "emotional-readiness",
        heading: "Emotional readiness is a different question",
        lead: "You can be physically ready and emotionally nowhere near it. Or emotionally desperate to try again while still feeling frightened. Both states are normal.",
        paragraphs: [
          "Trying again after loss often asks you to hold conflicting truths at once. You may long for another chance and also feel deeply resistant to stepping back into uncertainty.",
          "There is no emotionally correct time to restart TTC. The better question is whether you have enough support, steadiness, and permission to feel whatever the next cycle brings.",
        ],
        image: { src: cardEmotional, alt: "An emotional support image representing grief and readiness after miscarriage." },
      },
      {
        id: "how-ttc-feels-after-loss",
        heading: "Why TTC after loss often feels different",
        lead: "Cycles can stop feeling neutral. Ovulation, testing, and the two-week wait can all pick up more meaning than they carried before.",
        paragraphs: [
          "A positive test may no longer feel purely joyful. You may find yourself bracing rather than celebrating, or avoiding hopes you used to let yourself have. That does not mean you are doing the next pregnancy wrong. It means your history comes with you.",
          "Many people also become more alert to bodily sensations, spotting, dates, and scan milestones. Knowing that this is common can make it feel less like a personal failure of coping.",
        ],
        image: { src: ttcStageWaiting, alt: "A waiting-focused TTC image representing the emotional vigilance of trying again after loss." },
      },
      {
        id: "supporting-yourself-and-your-relationship",
        heading: "Supporting yourself and your relationship through trying again",
        lead: "It helps to make the support plan before the next hard moment rather than inside it.",
        paragraphs: [
          "That may mean agreeing how much you want to track, when you will test, who you will tell, or what will help if the cycle ends in a period. It may also mean naming that you and your partner could need different things, including different amounts of talking.",
          "Specialist support through Tommy's, the Miscarriage Association, a counsellor, or your GP can be useful long before a new pregnancy begins. You do not have to wait until you are falling apart to deserve support.",
        ],
        image: { src: guidanceTTC, alt: "A supportive TTC guidance image representing a steadier approach to trying again after loss." },
      },
      {
        id: "when-to-ask-for-more-help",
        heading: "When to ask for more help",
        lead: "Some patterns warrant more than ordinary TTC reassurance.",
        paragraphs: [
          "If low mood, intrusive thoughts, panic, or hopelessness are affecting daily life, ask for mental health support. This is not a minor issue just because it is tied to fertility or pregnancy.",
          "If you have had recurrent miscarriages, a later miscarriage, or symptoms that suggest a physical complication, ask for a medical review. There is a real difference between being patient and being left unsupported.",
        ],
        image: { src: cardSafety, alt: "A calm clinical-support image representing the point where extra help after miscarriage should be sought." },
      },
    ],
  },

  "can-you-get-pregnant-on-your-period": {
    journey: ["trying-to-conceive"],
    reviewedBy: REVIEWER,
    lastUpdated: MAY_2026,
    hero: {
      src: ttcStageCycle,
      alt: "A TTC cycle visual representing questions about bleeding, cycle length, and fertility timing.",
    },
    keyTakeaways: [
      "Getting pregnant during a period is uncommon, but not impossible.",
      "The main reason is sperm survival combined with early ovulation in shorter or irregular cycles.",
      "Bleeding is not always a true period, which can make the timing feel more confusing than it is.",
      "If you are trying to conceive or trying to avoid pregnancy, the important question is not just bleeding but where ovulation is likely to fall.",
    ],
    sources: [
      "NHS — Trying for a baby",
      "NICE — Fertility problems: assessment and treatment (CG156)",
      "Tommy's — Ovulation and fertile timing",
      "FSRH guidance on fertility awareness and conception risk",
    ],
    faq: [
      {
        question: "Can you actually get pregnant while bleeding?",
        answer: "Yes, occasionally. The risk is usually low in regular cycles but higher if cycles are short or ovulation happens soon after bleeding ends.",
      },
      {
        question: "Why does a short cycle change the answer?",
        answer: "Because ovulation arrives sooner. If sperm are still alive from sex during the period, they can still meet the egg a few days later.",
      },
      {
        question: "Does this mean period sex is good TTC timing?",
        answer: "Not usually in regular cycles, but in shorter cycles it can overlap with the start of the fertile window. Tracking your cycle gives a clearer answer than guessing from bleeding alone.",
      },
    ],
    editorialSections: [
      {
        id: "why-the-answer-is-sometimes-yes",
        heading: "Why the answer is sometimes yes",
        lead: "The short version is sperm survival. The more complete version is sperm survival plus cycle timing.",
        paragraphs: [
          "Sperm can survive for up to five days inside the reproductive tract when cervical conditions are supportive. So sex that happens during bleeding can still matter if ovulation arrives soon after the period ends.",
          "That is why the honest answer is not a simple no. The biology allows pregnancy in some cycles, even if it is unlikely in many others.",
        ],
        image: { src: week2BiologyDetail, alt: "A biological-detail image representing sperm survival and cycle timing." },
      },
      {
        id: "cycle-length-is-the-key",
        heading: "Cycle length is the key part of the maths",
        lead: "A textbook 28-day cycle gives a different answer from a 21-day cycle.",
        paragraphs: [
          "If ovulation happens around day 14 and bleeding lasts 4 to 5 days, sex during the period is far away from the fertile window. But if cycles are short and ovulation happens on day 8, day 9, or day 10, the gap is much smaller.",
          "That is why shorter or irregular cycles are where 'period sex can lead to pregnancy' becomes much more realistic rather than merely theoretical.",
        ],
        image: { src: cardTimelines, alt: "A timeline image showing how short cycles move ovulation closer to the end of a period." },
      },
      {
        id: "not-all-bleeding-is-a-period",
        heading: "Not all bleeding is a true period",
        lead: "Part of the confusion comes from the fact that not every bleed is menstrual bleeding.",
        paragraphs: [
          "Breakthrough bleeding, ovulation spotting, withdrawal bleeds, and irregular hormonal bleeding can all look period-like. If the bleed is not a true period, your fertility timing may be completely different from what you assumed.",
          "That matters both for TTC and for contraception. The label you put on the bleeding changes how you interpret the risk.",
        ],
        image: { src: cardBody, alt: "A body-focused image representing the ambiguity of different kinds of bleeding across a cycle." },
      },
      {
        id: "what-this-means-for-ttc",
        heading: "What this means if you're trying to conceive",
        lead: "For most people, period sex is not the central TTC strategy. But in shorter cycles, it can sit closer to the fertile days than expected.",
        paragraphs: [
          "If you are TTC with shorter cycles, paying attention to cervical mucus and using LH tests can help you see whether the fertile window is opening almost immediately after bleeding ends.",
          "If your cycles are regular and longer, intercourse later in the cycle is usually much more relevant. The goal is not to make every bleed feel strategic, just to understand the pattern your body actually follows.",
        ],
        image: { src: guidanceTTC, alt: "A grounded TTC guidance image representing using cycle information calmly and practically." },
      },
      {
        id: "when-to-raise-cycle-concerns",
        heading: "When short or unusual cycles are worth raising",
        lead: "Very short cycles, very irregular cycles, or bleeding between periods can all make fertility timing harder to interpret.",
        paragraphs: [
          "If cycles are consistently shorter than 21 days, or if you are bleeding unpredictably between periods, a GP review is worth it. Sometimes it is still normal variation. Sometimes it is a clue that ovulation or hormones need a closer look.",
          "That conversation is about clarity, not catastrophe. Many cycle concerns turn out to be manageable once they are named properly.",
        ],
        image: { src: cardPractical, alt: "A practical healthcare image representing when unusual cycle timing should be checked." },
      },
    ],
  },

  "implantation-bleeding": {
    journey: ["trying-to-conceive", "pregnancy"],
    reviewedBy: REVIEWER,
    lastUpdated: MAY_2026,
    relatedSlugs: ["how-long-implantation-takes", "when-to-take-a-pregnancy-test", "faint-positive-pregnancy-test"],
    relatedStage: {
      intro: "Related TTC guidance:",
      links: [
        { label: "How long implantation takes", href: "/articles/how-long-implantation-takes" },
        { label: "When to take a pregnancy test", href: "/articles/when-to-take-a-pregnancy-test" },
        { label: "Two-week wait", href: "/articles/two-week-wait" },
      ],
    },
  },

  "early-pregnancy-symptoms-explained": {
    journey: ["trying-to-conceive", "pregnancy"],
    reviewedBy: REVIEWER,
    lastUpdated: MAY_2026,
    hero: {
      src: heroEarlySymptoms,
      alt: "An early home pregnancy test and a softly lit calendar, representing the first signs after TTC.",
    },
    relatedSlugs: ["implantation-bleeding", "when-to-take-a-pregnancy-test", "symptoms-stopping-early-pregnancy"],
    relatedStage: {
      intro: "Related TTC guidance:",
      links: [
        { label: "Implantation bleeding", href: "/articles/implantation-bleeding" },
        { label: "When to take a pregnancy test", href: "/articles/when-to-take-a-pregnancy-test" },
        { label: "TTC Hub", href: "/trying-to-conceive" },
      ],
    },
  },

  "symptoms-stopping-early-pregnancy": {
    journey: ["trying-to-conceive", "pregnancy"],
    reviewedBy: REVIEWER,
    lastUpdated: MAY_2026,
    hero: {
      src: heroSymptomsStopping,
      alt: "A calm early-pregnancy scene representing the anxiety that follows symptom changes after TTC.",
    },
    keyTakeaways: [
      "Symptoms often fluctuate in early pregnancy and that fluctuation alone does not mean something is wrong.",
      "A day with less nausea or breast tenderness is usually hormonal variation, not evidence of loss.",
      "Heavy bleeding, strong pain, or feeling markedly unwell changes the picture and needs review.",
      "If anxiety about symptoms is taking over, reassurance from a clinician is a legitimate next step.",
    ],
    sources: [
      "NHS — Common symptoms in pregnancy",
      "Tommy's — Changes in early pregnancy symptoms",
      "NICE — Antenatal care (NG201)",
      "RCOG — Information for women in early pregnancy",
    ],
    relatedSlugs: ["early-pregnancy-symptoms-explained", "implantation-bleeding", "when-to-take-a-pregnancy-test"],
    faq: [
      {
        question: "Is it normal for nausea or sore breasts to disappear for a day?",
        answer: "Yes. Early pregnancy symptoms can come and go, and a brief improvement is usually part of normal hormonal variation.",
      },
      {
        question: "Does symptom loss always mean miscarriage?",
        answer: "No. Symptoms are not a reliable real-time measure of pregnancy health. Bleeding, strong pain, or feeling significantly unwell are more important signs to assess.",
      },
      {
        question: "When should I ask for reassurance?",
        answer: "If symptom changes are accompanied by heavy bleeding or pain, or if anxiety is becoming hard to carry, contact your midwife, early pregnancy unit, or GP.",
      },
    ],
    editorialSections: [
      {
        id: "why-symptoms-fluctuate",
        heading: "Why early-pregnancy symptoms fluctuate",
        lead: "Hormones do not rise in a perfectly neat line, and symptoms rarely behave neatly either.",
        paragraphs: [
          "Nausea, breast tenderness, fatigue, bloating, and smell sensitivity can all shift from day to day. Some of that is due to real hormonal variation. Some of it is your body's changing sensitivity to the same hormone levels.",
          "That is why one easier day is so often misread as bad news. In most cases, it is just a different day rather than a different outcome.",
        ],
        image: { src: heroSymptomsStopping, alt: "A calm early-pregnancy image representing symptom changes from one day to the next." },
      },
      {
        id: "which-symptoms-commonly-come-and-go",
        heading: "Which symptoms most commonly come and go",
        lead: "Nausea and breast tenderness are the two that most often trigger alarm when they ease.",
        paragraphs: [
          "Nausea can fade for hours or even a day, especially if you have rested more, eaten differently, or are entering the weeks when symptoms naturally start shifting. Breast tenderness can also soften and then return later.",
          "Because these symptoms are so emotionally loaded, their absence can feel louder than their presence. That emotional reaction is understandable, especially after TTC or previous loss.",
        ],
        image: { src: cardBody, alt: "A body-focused editorial image reflecting common early-pregnancy symptoms and their variation." },
      },
      {
        id: "what-actually-matters-more-than-symptoms",
        heading: "What matters more than symptom watching",
        lead: "Symptoms are not a reliable pregnancy monitor. Pattern and associated signs matter more.",
        paragraphs: [
          "Heavy bleeding, significant cramping, one-sided pain, fever, or feeling distinctly unwell are more important to assess than whether nausea is present that morning. A symptom dip without those signs is usually not clinically meaningful.",
          "This is part of what makes early pregnancy emotionally hard. Your body feels full of information, but much of that information is noisy rather than clear.",
        ],
        image: { src: cardSafety, alt: "A safety-focused image representing the signs that matter more than everyday symptom shifts." },
      },
      {
        id: "when-anxiety-takes-over",
        heading: "When the anxiety around symptoms becomes the real issue",
        lead: "Sometimes the hardest part is not the symptom itself but the loop it creates.",
        paragraphs: [
          "Checking for nausea, pressing on your breasts, googling every change, or repeatedly testing can all become attempts to force certainty from something that does not offer it. That often leaves people more distressed rather than more reassured.",
          "If that is where you are, support matters. A clinician can offer reassurance where appropriate, and emotional support is as valid here as physical reassurance.",
        ],
        image: { src: heroSecondAnxiety, alt: "An anxiety-focused editorial image representing the mental load of symptom monitoring." },
      },
      {
        id: "when-to-call",
        heading: "When to call your midwife, GP, or early pregnancy unit",
        lead: "Trust the patterns that change the whole picture, not just one symptom dropping away.",
        paragraphs: [
          "Call for heavy bleeding, clots, persistent or severe abdominal pain, one-sided pain, shoulder-tip pain, fever, fainting, or if you simply feel something is not right. Those are the moments where assessment is useful rather than optional.",
          "You are also allowed to ask for help if the worry itself is overwhelming you. Reassurance is part of care, not an inconvenience to it.",
        ],
        image: { src: cardPractical, alt: "A practical healthcare image representing the moment to call for early-pregnancy support." },
      },
    ],
  },

  "signs-of-ovulation": {
    journey: ["trying-to-conceive"],
    reviewedBy: REVIEWER,
    lastUpdated: MAY_2026,
    hero: {
      src: ttcStageCycle,
      alt: "A premium TTC cycle image representing the practical side of reading ovulation signs.",
    },
    keyTakeaways: [
      "Ovulation signs can help narrow your fertile days, but many are soft clues rather than hard proof.",
      "Cervical mucus and LH tests are the strongest predictors before ovulation.",
      "Basal body temperature confirms ovulation afterwards rather than predicting it.",
      "Irregular periods plus unclear signs are worth discussing with a GP if TTC is not progressing.",
    ],
    sources: [
      "NHS — Trying for a baby",
      "Tommy's — Ovulation signs",
      "NICE — Fertility problems: assessment and treatment (CG156)",
      "HFEA — Understanding ovulation",
    ],
    relatedSlugs: ["ovulation-signs", "fertile-window", "two-week-wait"],
    relatedStage: {
      intro: "Related TTC guidance:",
      links: [
        { label: "Ovulation signs", href: "/articles/ovulation-signs" },
        { label: "Ovulation calculator", href: "/trying-to-conceive/ovulation-calculator" },
        { label: "TTC Hub", href: "/trying-to-conceive" },
      ],
    },
    faq: [
      {
        question: "What discharge means ovulation is close?",
        answer: "Clear, slippery, stretchy cervical mucus is the classic fertile pattern and usually signals the days leading up to ovulation.",
      },
      {
        question: "Can an app tell me ovulation without tracking symptoms?",
        answer: "It can estimate based on dates, but it cannot know exactly when you will ovulate that month unless you add real cycle signs too.",
      },
      {
        question: "What if my ovulation signs are different every month?",
        answer: "That can still be normal. The useful question is whether there is some broad pattern, not whether every cycle looks identical.",
      },
    ],
    editorialSections: [
      {
        id: "quiet-body-clues",
        heading: "The quiet body clues around ovulation",
        lead: "Ovulation is often more subtle than the internet makes it sound.",
        paragraphs: [
          "For some people the fertile window is obvious. For others, it is a softer combination of discharge changes, a vague sense of timing, a positive LH test, and not much else. Both experiences are common.",
          "The value of ovulation signs is not in being dramatic. It is in helping you identify a short stretch of days where trying is most likely to line up with the egg.",
        ],
        image: { src: week2Ovulation, alt: "An ovulation-focused image representing the body's quieter mid-cycle changes." },
      },
      {
        id: "best-signs-to-watch",
        heading: "The best signs to watch if you want practical accuracy",
        lead: "Some ovulation signs are much more actionable than others.",
        paragraphs: [
          "Fertile cervical mucus and LH tests are usually the most useful because they help you act before ovulation passes. Temperature is valuable too, but more for confirmation than prediction.",
          "One-sided pain, libido changes, or feeling 'different' can be real parts of your pattern, but they are less dependable as stand-alone tools.",
        ],
        image: { src: ttcStageTiming, alt: "A timing-focused TTC image representing practical ovulation tracking signs." },
      },
      {
        id: "what-signs-cannot-tell-you",
        heading: "What signs cannot tell you with certainty",
        lead: "Ovulation signs can guide timing. They cannot promise that the egg was definitely released, that sperm met it, or that pregnancy will follow.",
        paragraphs: [
          "This matters because TTC pressure can turn ordinary signs into loaded verdicts. A positive LH test does not mean conception is guaranteed. A cycle with quiet signs does not mean you missed your chance.",
          "The most useful mindset is often probabilistic rather than absolute: these signs improve timing, not certainty.",
        ],
        image: { src: cardQuiet, alt: "A quiet editorial image representing the limits of what body signs can really tell you." },
      },
      {
        id: "when-signs-point-to-a-pattern-worth-raising",
        heading: "When the sign pattern is worth raising with a GP",
        lead: "It is not about having perfect signs. It is about whether the wider cycle picture suggests ovulation may be irregular or absent.",
        paragraphs: [
          "Very irregular periods, cycles that are consistently long, very little bleeding, or month after month with no sign of ovulation at all can all justify a fertility conversation.",
          "That conversation is especially appropriate if you have been trying for the usual timeframe for your age group and nothing has happened. It is standard care, not an overreaction.",
        ],
        image: { src: cardPractical, alt: "A practical image representing when ovulation concerns should be raised with a GP." },
      },
    ],
  },

  "two-week-wait": {
    journey: ["trying-to-conceive"],
    reviewedBy: REVIEWER,
    lastUpdated: MAY_2026,
    hero: {
      src: ttcStageWaiting,
      alt: "A calm waiting-focused TTC hero image representing the emotional weight of the two-week wait.",
    },
    keyTakeaways: [
      "The two-week wait is the time between ovulation and a reliable pregnancy test, and it is full of progesterone-driven symptoms that can mimic pregnancy.",
      "Most symptoms in the two-week wait are not reliable signs one way or the other.",
      "Testing too early usually creates more uncertainty, not more clarity.",
      "The hardest part of the two-week wait is often emotional, not biological.",
    ],
    sources: [
      "NHS — Pregnancy tests",
      "Tommy's — Two-week wait and early pregnancy signs",
      "NICE — Fertility problems: assessment and treatment (CG156)",
      "HFEA — Emotional impact of fertility treatment and waiting",
    ],
    relatedSlugs: ["how-long-implantation-takes", "when-to-take-a-pregnancy-test", "implantation-bleeding"],
    relatedStage: {
      intro: "Related TTC guidance:",
      links: [
        { label: "How long implantation takes", href: "/articles/how-long-implantation-takes" },
        { label: "When to take a pregnancy test", href: "/articles/when-to-take-a-pregnancy-test" },
        { label: "TTC Hub", href: "/trying-to-conceive" },
      ],
    },
    faq: [
      {
        question: "Can you tell you're pregnant during the two-week wait?",
        answer: "Not reliably. Progesterone causes many of the same symptoms whether or not conception happened.",
      },
      {
        question: "What day of the two-week wait should I test?",
        answer: "Usually the day your period is due is the most reliable time. Earlier tests are more likely to confuse than clarify.",
      },
      {
        question: "Is it normal to feel completely consumed by the wait?",
        answer: "Yes. The two-week wait is one of the most emotionally intense parts of TTC because it combines uncertainty, hope, and a complete lack of control.",
      },
    ],
    editorialSections: [
      {
        id: "what-is-happening-biologically",
        heading: "What is happening biologically in the two-week wait",
        lead: "After ovulation, progesterone rises and the uterine lining enters its waiting phase. If fertilisation occurred, implantation still has to happen before pregnancy hormones meaningfully rise.",
        paragraphs: [
          "That means the first part of the two-week wait is always too early for a pregnancy test to tell you anything. Even in a successful cycle, the body is still in the pre-implantation phase for several days.",
          "Progesterone is the dominant hormone through this window, which is why symptoms can feel so loaded while revealing very little.",
        ],
        image: { src: week2BiologyDetail, alt: "A biological-detail TTC image representing what happens in the luteal phase after ovulation." },
      },
      {
        id: "why-symptoms-are-so-confusing",
        heading: "Why symptoms are so confusing in the two-week wait",
        lead: "The same hormones that support implantation can also create sensations that look exactly like early pregnancy.",
        paragraphs: [
          "Breast tenderness, mild cramping, bloating, fatigue, vivid emotions, and even nausea can all happen in a non-pregnant luteal phase. That is why symptom-spotting becomes such a trap: the body is genuinely doing things, but those things are not specific enough to interpret reliably.",
          "A symptomless two-week wait is equally uninformative. Plenty of pregnant cycles feel like nothing at all in the early days.",
        ],
        image: { src: cardBody, alt: "A body-focused editorial image representing luteal-phase sensations that can mimic pregnancy." },
      },
      {
        id: "testing-without-making-it-worse",
        heading: "How to handle testing without making the wait harder",
        lead: "Testing early can feel like action, but it often becomes another layer of uncertainty rather than relief.",
        paragraphs: [
          "If you know early testing sends you into repeated line-checking or serial disappointment, waiting until the expected period can be a form of self-protection rather than avoidance.",
          "If you do test early, it helps to go in with a rule: a negative before the expected period does not count as a final answer. That small reframe can save a lot of unnecessary heartbreak.",
        ],
        image: { src: guidanceTTC, alt: "A grounded TTC guidance image representing calmer choices around testing during the wait." },
      },
      {
        id: "coping-with-the-emotional-part",
        heading: "Coping with the emotional part of the wait",
        lead: "The two-week wait is often hardest because there is nothing left to do.",
        paragraphs: [
          "Some people feel constant vigilance. Others feel detached, irritable, or quietly afraid. Many swing between optimism and dread within the same day. None of that means you are handling TTC badly.",
          "It can help to reduce inputs that intensify the wait: endless forum searching, repeated testing, and treating every bodily sensation like a clue. The goal is not emotional perfection, only a slightly kinder fortnight.",
        ],
        image: { src: heroSecondAnxiety, alt: "An anxiety-focused image representing the emotional intensity of the two-week wait." },
      },
      {
        id: "when-the-wait-is-more-than-ordinary",
        heading: "When the wait is becoming more than ordinary TTC stress",
        lead: "If each two-week wait is leaving you unable to function, it is worth naming that rather than normalising it away.",
        paragraphs: [
          "There is a difference between ordinary anticipation and anxiety that affects sleep, work, relationships, or appetite every month. If you are in the latter category, support is appropriate.",
          "That support might be a partner conversation, a TTC boundary around testing, a therapist, or your GP. You do not need to wait until you have conceived to deserve care.",
        ],
        image: { src: cardWellness, alt: "A wellbeing-oriented image representing support for the emotional impact of the two-week wait." },
      },
    ],
  },

  "trying-to-conceive-explained": {
    journey: ["trying-to-conceive"],
    reviewedBy: REVIEWER,
    lastUpdated: MAY_2026,
    standfirst: "A calm, premium orientation to TTC: how conception works, what matters most, and how to keep the process grounded when every cycle starts to carry weight.",
    hero: {
      src: guidanceTTC,
      alt: "A premium TTC guidance hero image representing the overall trying-to-conceive journey.",
    },
    keyTakeaways: [
      "Most couples conceive within 12 months of regular unprotected intercourse, but month one is never the only normal timeline.",
      "Ovulation timing matters more than trying to optimise every other detail.",
      "Fertility is shaped by both partners and by many factors beyond effort or willpower.",
      "Support is appropriate when cycles are irregular, when timeframes stretch out, or when TTC is becoming emotionally hard to carry.",
    ],
    sources: [
      "NHS — Trying for a baby",
      "NICE — Fertility problems: assessment and treatment (CG156)",
      "Tommy's — Trying to conceive",
      "HFEA — Fertility, age and getting help",
    ],
    relatedSlugs: ["ovulation-signs", "fertile-window", "when-to-take-a-pregnancy-test"],
    relatedStage: {
      intro: "Explore TTC from here:",
      links: [
        { label: "Ovulation calculator", href: "/trying-to-conceive/ovulation-calculator" },
        { label: "Ovulation signs", href: "/articles/ovulation-signs" },
        { label: "TTC Hub", href: "/trying-to-conceive" },
      ],
    },
    faq: [
      {
        question: "How long does it usually take to get pregnant?",
        answer: "Most couples conceive within 12 months of regular unprotected intercourse. That still leaves plenty of completely healthy couples who do not conceive in the first few cycles.",
      },
      {
        question: "What matters most when trying to conceive?",
        answer: "Knowing roughly when ovulation happens, having intercourse through the fertile window, and approaching the process with steady rather than frantic consistency.",
      },
      {
        question: "When should I ask for fertility support?",
        answer: "Usually after 12 months of trying, or after 6 months if you are 35 or over, or sooner if periods are very irregular, absent, or there are known fertility factors.",
      },
    ],
    editorialSections: [
      {
        id: "how-conception-actually-works",
        heading: "How conception actually works",
        lead: "At the centre of TTC is one ordinary biological fact: conception can only happen when sperm and egg overlap in a very short window each cycle.",
        paragraphs: [
          "Ovulation usually happens once per cycle. The egg then survives for only about 12 to 24 hours, while sperm can survive for several days in fertile cervical mucus. That is why intercourse in the days before ovulation matters so much.",
          "This can sound clinical, but it is often reassuring. TTC is not about getting everything perfect. It is about understanding a small window and giving yourself enough chances within it.",
        ],
        image: { src: week2Ovulation, alt: "An ovulation-focused image representing the central biological event of TTC." },
      },
      {
        id: "what-most-people-need-to-track",
        heading: "What most people actually need to track",
        lead: "Most TTC journeys improve with a little more information, not with maximal surveillance.",
        paragraphs: [
          "A sense of cycle length, some awareness of cervical mucus, and optionally a few cycles of LH testing are enough for many people. Those tools help turn TTC from vague guessing into informed timing without making every day feel medicalised.",
          "More tracking is not always better. When data starts producing more anxiety than clarity, it is worth simplifying rather than pushing harder.",
        ],
        image: { src: ttcStageCycle, alt: "A TTC tracking image representing the kind of simple cycle information that is genuinely useful." },
      },
      {
        id: "what-else-affects-fertility",
        heading: "What else affects fertility beyond timing",
        lead: "Age, ovulation regularity, sperm health, general health, and plain luck all play a role.",
        paragraphs: [
          "This matters because TTC culture can become very individualised, as though enough discipline should guarantee pregnancy. In reality, fertility is shared, biological, and only partly controllable.",
          "Taking folic acid, reducing smoking and heavy alcohol use, and managing known medical conditions are sensible preconception steps. Beyond that, many cycles still depend on factors outside your direct control.",
        ],
        image: { src: guidanceTTC, alt: "A premium TTC guidance image representing the wider factors that shape fertility." },
      },
      {
        id: "what-the-month-to-month-experience-feels-like",
        heading: "What the month-to-month TTC experience often feels like",
        lead: "TTC is not just biology. It is also hope, waiting, interpretation, disappointment, and trying not to let one cycle define the next.",
        paragraphs: [
          "For many people, ovulation brings optimism, the two-week wait brings vigilance, and a period brings grief out of proportion to what others expect. That rhythm can become exhausting long before there is any medical reason to be worried.",
          "Naming that emotional pattern matters because it helps explain why TTC can feel consuming even while technically remaining within the normal timeframe.",
        ],
        image: { src: ttcStageWaiting, alt: "A waiting-focused TTC image representing the emotional rhythm of month-to-month trying." },
      },
      {
        id: "when-to-get-help",
        heading: "When getting help is the right next step",
        lead: "Support is part of TTC, not a sign that TTC has failed.",
        paragraphs: [
          "If you are under 35 and have been trying for 12 months, or 35 and over and have been trying for 6 months, a GP appointment is the standard next step. The same applies sooner if periods are absent or highly irregular, if there is a known fertility issue, or if loss has complicated the picture.",
          "Emotional support matters too. If TTC is reshaping your month, your sense of self, or your relationship, that is real enough to deserve care even before any fertility diagnosis exists.",
        ],
        image: { src: cardPractical, alt: "A practical support image representing the point where fertility guidance and extra help become appropriate." },
      },
    ],
  },
};