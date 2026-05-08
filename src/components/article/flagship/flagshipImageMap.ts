// ─── Flagship image mapping ────────────────────────────────────────────────
// Topic-specific & section-specific imagery for the flagship article system.
// NO decorative fallback flowers. NO generic lifestyle filler.
// Every assignment below is justified by topic — if the heading were hidden,
// the image should still feel obviously about the subject.
//
// The 3 anchor articles (tests-and-scans, heartburn, anterior-placenta) keep
// their hand-curated bespoke imagery. All other flagship-eligible articles
// resolve via (1) explicit section overrides, (2) per-article hero map, and
// (3) a keyword resolver that picks the best matching asset from the existing
// topic-specific library.

import heroTestsScans from "@/assets/article-hero-tests-scans.jpg";
import journalCoupleUltrasound from "@/assets/journal-couple-ultrasound.jpg";
import journalUltrasound from "@/assets/journal-ultrasound.jpg";

// Topic-specific flagship imagery — anchors
import heartburnHero from "@/assets/flagship-heartburn-hero.jpg";
import heartburnAnatomy from "@/assets/flagship-heartburn-anatomy.jpg";
import heartburnPillows from "@/assets/flagship-heartburn-pillows.jpg";
import heartburnCall from "@/assets/flagship-heartburn-call.jpg";
import anteriorHero from "@/assets/flagship-anterior-hero.jpg";
import anteriorPositions from "@/assets/flagship-anterior-positions.jpg";
import anteriorMovement from "@/assets/flagship-anterior-movement.jpg";
import anteriorCall from "@/assets/flagship-anterior-call.jpg";

// Article-specific heroes (existing library)
import heroNausea from "@/assets/article-hero-nausea.jpg";
import heroFatigue from "@/assets/article-hero-fatigue.jpg";
import heroImplantation from "@/assets/article-hero-implantation.jpg";
import heroSymptomsStopping from "@/assets/article-hero-symptoms-stopping.jpg";
import heroEarlySymptoms from "@/assets/article-hero-early-symptoms.jpg";
import heroFoodAversions from "@/assets/article-hero-food-aversions.jpg";
import heroEmotionalFirstTri from "@/assets/article-hero-emotional-first-tri.jpg";
import heroLifestyle from "@/assets/article-hero-lifestyle.jpg";
import heroSecondAnatomyScan from "@/assets/article-hero-second-anatomy-scan.jpg";
import heroSecondAnxiety from "@/assets/article-hero-second-anxiety.jpg";
import heroSecondBody from "@/assets/article-hero-second-body.jpg";
import heroSecondEating from "@/assets/article-hero-second-eating.jpg";
import heroSecondMovement from "@/assets/article-hero-second-movement.jpg";
import heroSecondMovementExercise from "@/assets/article-hero-second-movement-exercise.jpg";
import heroSecondSleep from "@/assets/article-hero-second-sleep.jpg";
import heroThirdEmotional from "@/assets/article-hero-third-emotional.jpg";
import heroThirdHospitalBag from "@/assets/article-hero-third-hospital-bag.jpg";
import heroThirdMovement from "@/assets/article-hero-third-movement.jpg";
import heroThirdNursery from "@/assets/article-hero-third-nursery.jpg";
import heroThirdSignsOfLabour from "@/assets/article-hero-third-signs-of-labour.jpg";
import heroThirdSleep from "@/assets/article-hero-third-sleep.jpg";

// Card-tier topic imagery
import cardTimelines from "@/assets/guidance-card-timelines.jpg";
import cardPractical from "@/assets/guidance-card-practical.jpg";
import cardSymptoms from "@/assets/guidance-card-symptoms.jpg";
import cardNourish from "@/assets/guidance-card-nourish.jpg";
import cardMilestones from "@/assets/guidance-card-milestones.jpg";
import cardQuiet from "@/assets/guidance-card-quiet.jpg";
import cardBody from "@/assets/guidance-card-body.jpg";
import cardBonding from "@/assets/guidance-card-bonding.jpg";
import cardComfort from "@/assets/guidance-card-comfort.jpg";
import cardDevelopment from "@/assets/guidance-card-development.jpg";
import cardEmotional from "@/assets/guidance-card-emotional.jpg";
import cardFresh from "@/assets/guidance-card-fresh.jpg";
import cardJourney from "@/assets/guidance-card-journey.jpg";
import cardMorning from "@/assets/guidance-card-morning.jpg";
import cardNursery from "@/assets/guidance-card-nursery.jpg";
import cardPlanning from "@/assets/guidance-card-planning.jpg";
import cardReflection from "@/assets/guidance-card-reflection.jpg";
import cardRest from "@/assets/guidance-card-rest.jpg";
import cardSafety from "@/assets/guidance-card-safety.jpg";
import cardTextiles from "@/assets/guidance-card-textiles.jpg";
import cardWellness from "@/assets/guidance-card-wellness.jpg";

type Img = { src: string; alt: string };

// ─── Anchor reference set (locked) ─────────────────────────────────────────

export const FLAGSHIP_SLUGS = [
  "tests-and-scans-in-pregnancy",
  "heartburn-in-pregnancy",
  "anterior-placenta",
] as const;

export type FlagshipSlug = (typeof FLAGSHIP_SLUGS)[number];

export const isFlagshipSlug = (slug: string): slug is FlagshipSlug =>
  (FLAGSHIP_SLUGS as readonly string[]).includes(slug);

// ─── Hero map: every flagship-eligible article ─────────────────────────────

export const flagshipHeroMap: Record<string, Img> = {
  // Anchors
  "tests-and-scans-in-pregnancy": {
    src: heroTestsScans,
    alt: "A pregnant person at an antenatal scan, the screen and gel just visible at the edge of the frame.",
  },
  "heartburn-in-pregnancy": {
    src: heartburnHero,
    alt: "A pregnant person at home in soft daylight, one hand resting on the upper chest near the sternum, the other supporting the bump — the felt experience of pregnancy reflux.",
  },
  "anterior-placenta": {
    src: anteriorHero,
    alt: "A pregnant person in soft daylight, hands resting on the bump with an ultrasound printout lightly held — quiet attention to placental position.",
  },

  // Early pregnancy & symptoms
  "implantation-bleeding": { src: heroImplantation, alt: "A quiet bedside scene in soft morning light — the calm context of a very early pregnancy spot." },
  "complete-guide-morning-sickness": { src: heroNausea, alt: "A pregnant person resting at home with a glass of water nearby — the everyday reality of morning sickness." },
  "early-pregnancy-symptoms-explained": { src: heroEarlySymptoms, alt: "An early pregnancy test and a calendar in soft daylight — the first weeks of noticing signs." },

  // Food & nutrition
  "foods-to-avoid-in-pregnancy": { src: heroSecondEating, alt: "A plate of fresh, simply prepared food in pregnancy — the reality behind the avoid lists." },
  "eating-well-in-pregnancy": { src: heroSecondEating, alt: "A balanced everyday pregnancy meal on a kitchen counter in daylight." },
  "key-nutrients-in-pregnancy": { src: cardNourish, alt: "Whole foods rich in pregnancy-relevant nutrients arranged on a kitchen surface." },
  "when-you-cant-face-food-in-pregnancy": { src: heroFoodAversions, alt: "A barely-touched plate pushed aside — the felt experience of food aversion in pregnancy." },

  // Health & safety
  "vaccinations-in-pregnancy": { src: cardSafety, alt: "A pregnant person at a routine appointment, sleeve rolled up for a vaccination." },
  "medicines-in-pregnancy": { src: cardSafety, alt: "A pregnant person checking a medicine packet alongside their pregnancy notes." },

  // Movement, body & rest
  "moving-your-body-in-pregnancy": { src: heroSecondMovementExercise, alt: "A pregnant person stretching gently at home — adaptive movement in pregnancy." },
  "sleep-in-pregnancy": { src: heroSecondSleep, alt: "A bed with pillows arranged for side-sleeping in late pregnancy." },
  "weight-changes-in-pregnancy": { src: heroSecondBody, alt: "A pregnant body in soft light — the changing shape of pregnancy." },
  "pelvic-pain-in-pregnancy": { src: heroSecondBody, alt: "A pregnant person resting one hand low on the pelvis — the location of pelvic-girdle pain." },
  "round-ligament-pain": { src: heroSecondBody, alt: "A hand resting on the lower side of a pregnant bump — where round ligament pain is felt." },
  "back-pain-in-pregnancy": { src: heroSecondBody, alt: "A pregnant person with one hand on the lower back — the everyday experience of pregnancy back pain." },
  "shortness-of-breath-in-pregnancy": { src: heroSecondBody, alt: "A pregnant person pausing on the stairs to catch their breath." },
  "swelling-in-pregnancy": { src: heroSecondBody, alt: "Bare feet propped up on a sofa — a simple way to ease pregnancy swelling." },
  "constipation-in-pregnancy": { src: heroSecondEating, alt: "A glass of water and a bowl of fibre-rich food — the everyday levers behind pregnancy constipation." },

  // Baby & development
  "how-your-baby-develops-in-pregnancy": { src: cardDevelopment, alt: "A soft editorial illustration of a baby growing across the trimesters." },
  "twins-and-multiples-in-pregnancy": { src: heroSecondAnatomyScan, alt: "A scan image of twin babies in profile." },
  "baby-movement-in-pregnancy": { src: heroThirdMovement, alt: "A pregnant person's hands cupping the bump, attentive to movement inside." },
  "reduced-movements-in-pregnancy": { src: heroThirdMovement, alt: "A pregnant person paused on a sofa, focused on counting kicks." },
  "baby-hiccups-in-the-womb": { src: heroSecondMovement, alt: "A hand resting on a bump, feeling the rhythmic flutter of baby hiccups." },
  "measuring-big-or-small-in-pregnancy": { src: heroSecondAnatomyScan, alt: "A midwife measuring a pregnant bump with a tape measure at an antenatal check." },
  "growth-scans-in-pregnancy": { src: heroTestsScans, alt: "A growth scan image on the ultrasound screen during a third-trimester check." },
  "cord-around-the-neck-in-pregnancy": { src: heroTestsScans, alt: "A late-pregnancy ultrasound view — the kind of scan that sometimes shows the cord position." },
  "low-lying-placenta-in-pregnancy": { src: anteriorPositions, alt: "A soft editorial diagram of placenta positions, including low-lying." },
  "breech-baby": { src: heroSecondAnatomyScan, alt: "A late-pregnancy scan view, showing the baby's position in the uterus." },

  // Preparing for baby
  "the-space-your-baby-will-come-home-to": { src: cardNursery, alt: "A simple, calm corner of a home prepared for a new baby." },
  "hospital-bag-and-what-to-pack": { src: heroThirdHospitalBag, alt: "A part-packed hospital bag with the essentials laid out." },

  // Labour & birth
  "signs-of-labour": { src: heroThirdSignsOfLabour, alt: "A pregnant person breathing through an early contraction at home." },
  "stages-of-labour": { src: heroThirdSignsOfLabour, alt: "A calm scene in late pregnancy as labour gets underway." },
  "when-to-go-in-for-labour": { src: heroThirdSignsOfLabour, alt: "A hospital bag by the door — the moment of deciding when to go in." },
  "braxton-hicks-contractions": { src: heroThirdSignsOfLabour, alt: "A pregnant person resting a hand on the bump as it tightens — practice contractions." },
  "preparing-emotionally-for-birth": { src: heroThirdEmotional, alt: "A quiet, reflective moment in late pregnancy — the emotional run-up to birth." },

  // Phase H — late-pregnancy practical decisions
  "membrane-sweep": { src: heroThirdSignsOfLabour, alt: "A pregnant person at a late-pregnancy appointment, the moment a sweep is being discussed." },
  "induction-of-labour": { src: cardPractical, alt: "A maternity ward bay set up for induction — drip stand, monitor, and a packed bag." },
  "external-cephalic-version": { src: heroSecondAnatomyScan, alt: "A late-pregnancy scan showing a baby in breech position, the context for an ECV conversation." },
  "group-b-strep-in-pregnancy": { src: cardSafety, alt: "A maternity notes folder open at a late-pregnancy appointment, the context for a GBS conversation." },
  "hand-expressing-colostrum": { src: cardNourish, alt: "A small syringe and a warm flannel on a kitchen surface — the simple set-up for antenatal hand expressing." },
  "the-36-week-appointment": { src: cardPractical, alt: "A midwife taking blood pressure at a 36-week antenatal appointment." },
  "birth-preferences": { src: cardPlanning, alt: "A short, written birth preferences document on a kitchen table alongside maternity notes." },
  "what-happens-if-labour-doesnt-start": { src: heroThirdEmotional, alt: "A pregnant person resting at home past their due date — the quiet emotional weight of waiting." },

  // Phase I — Medicines, treatments, and what's safe in pregnancy
  "paracetamol-in-pregnancy": { src: cardSafety, alt: "A blister pack of paracetamol on a kitchen surface alongside a glass of water — the everyday painkiller question in pregnancy." },
  "antibiotics-in-pregnancy": { src: cardPractical, alt: "A box of antibiotics and a glass of water on a kitchen table — the moment of starting a prescribed course in pregnancy." },
  "antacids-in-pregnancy": { src: heartburnPillows, alt: "A glass of water and antacid tablets on a bedside table — relief for pregnancy reflux." },
  "laxatives-in-pregnancy": { src: cardNourish, alt: "A bowl of fibre-rich foods on a kitchen surface alongside a glass of water — the lifestyle layer of treating constipation in pregnancy." },
  "hay-fever-in-pregnancy": { src: cardWellness, alt: "A pregnant person with a tissue and a saline nasal spray near a sunlit window — managing hay fever symptoms calmly." },
  "cold-and-flu-in-pregnancy": { src: cardComfort, alt: "A mug of hot lemon, a box of tissues, and a thermometer on a bedside table — the everyday cold-and-flu set-up in pregnancy." },
  "uti-in-pregnancy": { src: cardSafety, alt: "A urine sample pot and a glass of water on a clinic table — the simple test that confirms a UTI in pregnancy." },
  "thrush-in-pregnancy": { src: cardBody, alt: "Soft cotton underwear and an unscented wash on a bathroom shelf — the practical layer alongside thrush treatment in pregnancy." },

  // Phase J — Bleeding, discharge, leaking, reassurance
  "bleeding-in-early-pregnancy": { src: heroImplantation, alt: "A quiet bedside scene in soft daylight — the calm context of an early-pregnancy bleeding worry." },
  "spotting-in-pregnancy": { src: cardQuiet, alt: "A soft, still moment at home — the quiet anxiety of noticing spotting in pregnancy." },
  "discharge-in-pregnancy": { src: cardBody, alt: "Folded cotton underwear on a bathroom shelf in soft daylight — the everyday context of pregnancy discharge." },
  "watery-discharge-in-pregnancy": { src: cardComfort, alt: "A pregnant person resting at home with a hand on the bump — the wet-feeling moment of wondering whether to call." },
  "when-to-worry-about-cramps-in-pregnancy": { src: heroSecondBody, alt: "A pregnant person resting one hand low on the bump — the felt experience of pregnancy cramps." },
  "mucus-plug": { src: heroThirdSignsOfLabour, alt: "A late-pregnancy moment at home — the quiet body cues that labour is getting closer." },
  "show-in-pregnancy": { src: heroThirdSignsOfLabour, alt: "A calm late-pregnancy scene — the body's small signals that labour is approaching." },
  "leaking-fluid-in-pregnancy": { src: heroThirdSignsOfLabour, alt: "A packed hospital bag by the door — the moment of wondering whether waters have gone." },

  // Phase K — Appointments, screening, results
  "nipt-in-pregnancy": { src: cardSafety, alt: "A blood-test vial and pregnancy notes on a clinic table — the simple set-up of NIPT in pregnancy." },
  "combined-screening-test": { src: heroTestsScans, alt: "An early-pregnancy ultrasound view alongside a blood-test vial — the two parts of combined screening." },
  "dating-scan": { src: journalCoupleUltrasound, alt: "Expectant parents looking at the screen during their dating scan." },
  "20-week-anomaly-scan": { src: heroSecondAnatomyScan, alt: "A 20-week anomaly scan image of the baby in profile." },
  "glucose-tolerance-test": { src: cardNourish, alt: "A glass of the glucose drink and a blood-test vial on a clinic table — the set-up of the OGTT." },
  "anti-d-injection-in-pregnancy": { src: cardSafety, alt: "A pregnant person at a routine appointment, sleeve rolled up for an anti-D injection." },
  "what-happens-at-booking-appointment": { src: cardPractical, alt: "A midwife taking notes at a long, careful booking appointment." },
  "what-if-a-scan-shows-something-unexpected": { src: cardQuiet, alt: "A quiet, reflective moment after a scan — holding the wait between appointments." },

  // Emotional wellbeing
  "anxiety-in-pregnancy": { src: heroSecondAnxiety, alt: "A pregnant person sitting quietly by a window — the inward weight of pregnancy anxiety." },
  "the-first-trimester-emotionally": { src: heroEmotionalFirstTri, alt: "A pregnant person in soft early-pregnancy light, processing the first weeks." },
  "when-the-joy-doesnt-arrive-yet": { src: cardQuiet, alt: "A still, quiet pregnancy scene — the absence of expected joy." },
  "pregnancy-after-loss": { src: cardQuiet, alt: "A reflective scene in soft daylight — the careful weight of pregnancy after loss." },

  // TTC-primary slugs (flagship-eligible)
  "ovulation-signs": { src: ttcStageCycle, alt: "A calm TTC journal scene reflecting careful ovulation tracking." },
  "signs-of-ovulation": { src: ttcStageCycle, alt: "A close editorial scene of cycle notes and a calendar — recognising ovulation." },
  "fertile-window": { src: ttcStageTiming, alt: "A planning scene with a calendar and TTC notes — the fertile-window timing." },
  "can-you-get-pregnant-on-your-period": { src: ttcStageCycle, alt: "A quiet cycle-tracking scene representing period-week fertility questions." },
  "how-long-implantation-takes": { src: ttcStageWaiting, alt: "A still, daylit interior reflecting the wait around implantation." },
  "two-week-wait": { src: ttcStageWaiting, alt: "A calm TTC scene representing the long fortnight of waiting." },
  "when-to-take-a-pregnancy-test": { src: ttcStageWaiting, alt: "A pregnancy test and a softly lit calendar — choosing when to test." },
  "faint-positive-pregnancy-test": { src: heroImplantation, alt: "An early home pregnancy test in soft daylight — reading a faint line." },
  "chemical-pregnancy": { src: cardQuiet, alt: "A quiet, reflective scene representing very early pregnancy loss." },
  "trying-again-after-miscarriage": { src: cardQuiet, alt: "A reflective TTC scene — the careful return to trying after loss." },
  "trying-to-conceive-explained": { src: ttcJourney, alt: "An editorial TTC journey scene — the start of trying to conceive." },
};

// ─── Section image overrides (anchors + curated extras) ────────────────────

export const flagshipSectionImageMap: Record<string, Img> = {
  // Tests and scans (anchor)
  "tests-and-scans-in-pregnancy::what-tests-and-scans-are-for": { src: cardTimelines, alt: "An antenatal notes folder open on a clinic table — the scaffolding of pregnancy care." },
  "tests-and-scans-in-pregnancy::first-trimester": { src: cardPractical, alt: "A midwife taking blood pressure at a booking appointment." },
  "tests-and-scans-in-pregnancy::twelve-week-scan": { src: journalCoupleUltrasound, alt: "A 12-week ultrasound image being shown to expectant parents." },
  "tests-and-scans-in-pregnancy::twenty-week-scan": { src: journalUltrasound, alt: "A 20-week anomaly scan image, the baby in profile." },
  "tests-and-scans-in-pregnancy::blood-tests-and-routine-checks": { src: cardSymptoms, alt: "A blood pressure cuff and urine sample pot at a routine antenatal check." },
  "tests-and-scans-in-pregnancy::glucose-testing": { src: cardNourish, alt: "A glass of the glucose drink used in the oral glucose tolerance test." },
  "tests-and-scans-in-pregnancy::personalised-additions": { src: cardMilestones, alt: "A consultant-led appointment with extra growth scan imagery on screen." },
  "tests-and-scans-in-pregnancy::asking-questions": { src: cardQuiet, alt: "A person writing questions in a notebook before a midwife appointment." },

  // Heartburn (anchor)
  "heartburn-in-pregnancy::why": { src: heartburnAnatomy, alt: "A soft editorial anatomy illustration of the oesophagus, stomach valve, and growing uterus pressing upward — showing why reflux is so common in pregnancy." },
  "heartburn-in-pregnancy::what-helps": { src: heartburnPillows, alt: "A bed with pillows propped against the headboard and a glass of water on the bedside table — the upright resting setup that genuinely helps with reflux." },
  "heartburn-in-pregnancy::when-to-raise-it": { src: heartburnCall, alt: "A pregnant person sitting upright on a sofa, on the phone to a midwife with one hand on the bump — the moment a symptom tips from ordinary to worth raising." },

  // Anterior placenta (anchor)
  "anterior-placenta::what-it-is": { src: anteriorPositions, alt: "A soft editorial diagram showing four placenta positions — anterior, posterior, fundal and lateral — making clear that anterior simply means the placenta sits at the front of the uterus." },
  "anterior-placenta::movement": { src: anteriorMovement, alt: "Both hands resting attentively on a pregnant bump in soft knitwear — quietly waiting to notice movement through an anterior placenta." },
  "anterior-placenta::reduced-movements": { src: anteriorCall, alt: "A hand holding a phone near the bump with pregnancy notes alongside — the rule about calling if movements change does not change with an anterior placenta." },
};

// ─── Keyword resolver ──────────────────────────────────────────────────────
// Last-resort matcher. Ordered most-specific → most-general. If nothing
// matches, the section renders without an image (no decorative fallback).

type Rule = { match: RegExp; img: Img };

const KEYWORD_RULES: Rule[] = [
  // Highly specific clinical / topic keywords first
  { match: /placenta|low-lying|anterior|posterior|fundal/, img: { src: anteriorPositions, alt: "A soft editorial diagram of placenta positions in the uterus." } },
  { match: /scan|ultrasound|anomaly|nuchal|combined-screening|twelve-week|twenty-week|growth-scan/, img: { src: heroTestsScans, alt: "An antenatal scan in progress — the screen and gel just visible." } },
  { match: /test|booking|blood|glucose|urine|sample|gestational-diabetes/, img: { src: cardPractical, alt: "A midwife performing a routine antenatal check." } },
  { match: /vaccin|whooping|flu|covid/, img: { src: cardSafety, alt: "A pregnant person at a routine appointment, ready for a vaccination." } },
  { match: /medic|paracetamol|painkiller|prescribed|drug/, img: { src: cardSafety, alt: "A pregnant person reviewing a medicine packet alongside pregnancy notes." } },

  // Movement & symptoms in late pregnancy
  { match: /reduced-movement|count-the-kicks|monitoring-movement/, img: { src: heroThirdMovement, alt: "A pregnant person paused on a sofa, attentive to baby's movements." } },
  { match: /movement|kick|hiccup|flutter/, img: { src: heroThirdMovement, alt: "A pregnant person's hands cupping the bump, attentive to movement inside." } },

  // Labour & birth
  { match: /labour|contraction|birth-of|established|transition|early-labour|braxton/, img: { src: heroThirdSignsOfLabour, alt: "A late-pregnancy scene as labour gets underway." } },
  { match: /hospital|bag|pack|when-to-go/, img: { src: heroThirdHospitalBag, alt: "A part-packed hospital bag waiting by the door." } },
  { match: /birth-plan|plan-for-birth|preferences/, img: { src: cardPlanning, alt: "Pregnancy notes and a written birth plan on a kitchen table." } },

  // Sleep & rest
  { match: /sleep|night|bedtime|insomnia|side-sleep/, img: { src: heroSecondSleep, alt: "A bed with pillows arranged for side-sleeping in pregnancy." } },
  { match: /rest|tired|fatigue|energy|exhaust/, img: { src: heroFatigue, alt: "A pregnant person resting on a sofa in soft daylight." } },

  // Food & nutrition
  { match: /food-aversion|cant-face-food|appetite|nausea-and-eating|when-it-feels-hard/, img: { src: heroFoodAversions, alt: "A barely-touched plate pushed aside — the reality of food aversion in pregnancy." } },
  { match: /nausea|sick|vomit|morning-sickness|reflux|heartburn/, img: { src: heroNausea, alt: "A pregnant person resting with a glass of water — managing nausea." } },
  { match: /folate|folic|iron|vitamin|calcium|iodine|omega|nutrient|supplement/, img: { src: cardNourish, alt: "Whole foods on a kitchen surface — pregnancy-relevant nutrients in everyday meals." } },
  { match: /eat|food|meal|snack|nutrition|diet|protein|fibre/, img: { src: heroSecondEating, alt: "A balanced everyday pregnancy meal in daylight." } },
  { match: /constipation|bowel|fibre/, img: { src: heroSecondEating, alt: "A glass of water and fibre-rich food — the everyday levers behind pregnancy constipation." } },

  // Body
  { match: /pain|ache|pelvic|round-ligament|back|sciatic|cramp/, img: { src: heroSecondBody, alt: "A pregnant person resting a hand on the area where pregnancy aches are felt." } },
  { match: /breath|breathless|swelling|oedema|weight|body-changes/, img: { src: heroSecondBody, alt: "A pregnant body in soft light — the changing shape of pregnancy." } },

  // Twins & development
  { match: /twin|multiple/, img: { src: heroSecondAnatomyScan, alt: "A scan image showing twin babies in profile." } },
  { match: /develop|growth|first-trimester|second-trimester|third-trimester|trimester|weeks/, img: { src: cardDevelopment, alt: "A soft editorial view of how a baby grows across pregnancy." } },

  // Preparing
  { match: /nursery|cot|space|sleep-safety|home/, img: { src: cardNursery, alt: "A simple, calm corner of a home prepared for a new baby." } },
  { match: /preparing|prepare|checklist|essentials|buying|borrow/, img: { src: cardPlanning, alt: "Notes and a short list on a kitchen surface — preparing simply for baby." } },

  // Emotional / mental health
  { match: /anxiety|worry|panic|fear|spiralling/, img: { src: heroSecondAnxiety, alt: "A pregnant person sitting quietly by a window — the inward weight of anxiety." } },
  { match: /loss|grief|bereave|miscarriage|stillbirth|previous/, img: { src: cardQuiet, alt: "A reflective scene in soft daylight — the careful weight of grief in pregnancy." } },
  { match: /joy|emotion|feel|mood|mental|wellbeing|reality|first-trimester-emotion/, img: { src: heroEmotionalFirstTri, alt: "A pregnant person in soft daylight, processing the emotional weight of early pregnancy." } },
  { match: /reassurance|reflection|quiet|stillness/, img: { src: cardReflection, alt: "A quiet pregnancy moment in soft daylight." } },

  // Care & talking to clinicians
  { match: /when-to-call|when-to-speak|when-to-ask|midwife|doctor|gp|extra-support|raise|ask-for-more/, img: { src: cardPractical, alt: "A pregnant person on the phone to a midwife — the moment of asking for input." } },

  // Implantation / spotting
  { match: /implantation|spotting|cramping-and-other|earliest-signs|when-symptoms-start|when-to-test|vs-pms|vs-period/, img: { src: heroImplantation, alt: "A calm bedside scene in soft morning light — the very early weeks of pregnancy." } },

  // Common symptoms catch-all
  { match: /symptom|sign|common|variation|pattern|how-it-feels|what-it-feels-like|what-it-can-feel/, img: { src: cardSymptoms, alt: "A quiet pregnancy moment that captures the felt experience of a common symptom." } },

  // Generic safety / foods to avoid
  { match: /avoid|safety|safe|risk|extra-care|worried/, img: { src: cardSafety, alt: "A pregnant person checking guidance carefully — the everyday safety questions of pregnancy." } },

  // Looking after yourself / self-care
  { match: /looking-after|self|care|gentle|realistic|simple/, img: { src: cardComfort, alt: "A quiet self-care moment in late pregnancy." } },

  // Why / what / overview-style headings
  { match: /why|what-is|overview|matters|context|the-real|what-people-mean|^[a-z-]+::what-/, img: { src: cardJourney, alt: "A reflective overview moment in pregnancy." } },
];

// Resolve a section image with per-article deduplication.
// `usedSrcs` is mutated: any returned image's src is added to the set so the
// same asset cannot be reused later in the same article. If every candidate is
// already used, returns undefined and the section renders text-only.
export const resolveSectionImage = (
  slug: string,
  sectionId: string,
  heading?: string,
  usedSrcs?: Set<string>,
): Img | undefined => {
  const candidates: Img[] = [];

  const explicit = flagshipSectionImageMap[`${slug}::${sectionId}`];
  if (explicit) candidates.push(explicit);

  const haystack = `${slug}::${sectionId} ${heading ?? ""}`.toLowerCase();
  for (const rule of KEYWORD_RULES) {
    if (rule.match.test(haystack)) candidates.push(rule.img);
  }

  if (!usedSrcs) return candidates[0];

  for (const c of candidates) {
    if (!usedSrcs.has(c.src)) {
      usedSrcs.add(c.src);
      return c;
    }
  }
  // No unique candidate available — render section text-only rather than duplicate.
  return undefined;
};
