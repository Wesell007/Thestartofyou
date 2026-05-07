export type TTCTopicSlug =
  | "ovulation"
  | "preconception-health"
  | "fertility"
  | "cycle-tracking"
  | "pregnancy-tests"
  | "two-week-wait"
  | "ivf-and-treatment"
  | "male-fertility"
  | "age-and-fertility"
  | "conditions";

export interface TTCArticleLink {
  label: string;
  href: string;
}

export interface TTCTopic {
  slug: TTCTopicSlug;
  label: string;
  description: string;
  articles: TTCArticleLink[];
  viewAllLabel: string;
  mainHref: string;
}

export const ttcTopics: TTCTopic[] = [
  {
    slug: "ovulation",
    label: "Ovulation",
    description: "Understand ovulation signs, timing, and your most fertile days.",
    mainHref: "/trying-to-conceive/ovulation",
    viewAllLabel: "View all ovulation",
    articles: [
      { label: "Ovulation Calculator", href: "/ovulation-calculator" },
      { label: "Ovulation Symptoms", href: "/trying-to-conceive/ovulation/symptoms" },
      { label: "Ovulation Test Strips", href: "/trying-to-conceive/ovulation/test-strips" },
      { label: "Tracking Your Cycle", href: "/trying-to-conceive/cycle-tracking" },
      { label: "Reasons for a Missed Period", href: "/trying-to-conceive/ovulation/missed-period" },
      { label: "Can You Get Pregnant on Your Period?", href: "/trying-to-conceive/ovulation/period-pregnancy" },
    ],
  },
  {
    slug: "preconception-health",
    label: "Preconception Health",
    description: "Small, steady steps to support your body before pregnancy.",
    mainHref: "/trying-to-conceive/preconception-health",
    viewAllLabel: "View all preconception health",
    articles: [
      { label: "Preparing for a Baby Before Conception", href: "/trying-to-conceive/preconception-health/preparing" },
      { label: "When to Get a Preconception Checkup", href: "/trying-to-conceive/preconception-health/checkup" },
      { label: "What to Eat When Trying to Get Pregnant", href: "/trying-to-conceive/preconception-health/diet" },
      { label: "Folic Acid Before Pregnancy", href: "/trying-to-conceive/preconception-health/folic-acid" },
      { label: "Exercising Before Pregnancy", href: "/trying-to-conceive/preconception-health/exercise" },
      { label: "Tips for Quitting Smoking", href: "/trying-to-conceive/preconception-health/quitting-smoking" },
    ],
  },
  {
    slug: "fertility",
    label: "Fertility",
    description: "Understand conception, fertility factors, and when support may be needed.",
    mainHref: "/trying-to-conceive/fertility",
    viewAllLabel: "View all fertility",
    articles: [
      { label: "How Fertilisation Happens", href: "/trying-to-conceive/fertility/fertilisation" },
      { label: "How to Get Pregnant Faster", href: "/trying-to-conceive/fertility/get-pregnant-faster" },
      { label: "What Affects Fertility?", href: "/trying-to-conceive/fertility/what-affects-fertility" },
      { label: "Natural Fertility Treatments", href: "/trying-to-conceive/fertility/natural-treatments" },
      { label: "Fertility After Age 35", href: "/trying-to-conceive/age-and-fertility/after-35" },
      { label: "Top Fertility Treatments", href: "/trying-to-conceive/fertility/treatments" },
    ],
  },
  {
    slug: "cycle-tracking",
    label: "Cycle Tracking",
    description: "Learn how your cycle works and how to track it without feeling overwhelmed.",
    mainHref: "/trying-to-conceive/cycle-tracking",
    viewAllLabel: "View all cycle tracking",
    articles: [
      { label: "How to Track Your Menstrual Cycle", href: "/trying-to-conceive/cycle-tracking/how-to-track" },
      { label: "Understanding Cycle Length", href: "/trying-to-conceive/cycle-tracking/cycle-length" },
      { label: "What Is a Normal Cycle?", href: "/trying-to-conceive/cycle-tracking/normal-cycle" },
      { label: "Irregular Cycles and TTC", href: "/trying-to-conceive/cycle-tracking/irregular-cycles" },
      { label: "Cervical Mucus Tracking", href: "/trying-to-conceive/cycle-tracking/cervical-mucus" },
      { label: "Basal Body Temperature", href: "/trying-to-conceive/cycle-tracking/bbt" },
    ],
  },
  {
    slug: "pregnancy-tests",
    label: "Pregnancy Tests & Early Signs",
    description: "Understand when to test and what early symptoms may or may not mean.",
    mainHref: "/trying-to-conceive/pregnancy-tests",
    viewAllLabel: "View all testing guides",
    articles: [
      { label: "When to Take a Pregnancy Test", href: "/trying-to-conceive/pregnancy-tests/when-to-test" },
      { label: "Early Pregnancy Symptoms Before a Missed Period", href: "/trying-to-conceive/pregnancy-tests/early-symptoms" },
      { label: "Implantation Bleeding", href: "/articles/implantation-bleeding" },
      { label: "PMS vs Pregnancy Symptoms", href: "/trying-to-conceive/pregnancy-tests/pms-vs-pregnancy" },
      { label: "False Negative Pregnancy Test", href: "/trying-to-conceive/pregnancy-tests/false-negative" },
      { label: "What Does a Faint Line Mean?", href: "/trying-to-conceive/pregnancy-tests/faint-line" },
    ],
  },
  {
    slug: "two-week-wait",
    label: "The Two-Week Wait",
    description: "Support for the waiting period between ovulation and testing.",
    mainHref: "/trying-to-conceive/two-week-wait",
    viewAllLabel: "View all two-week wait support",
    articles: [
      { label: "What Is the Two-Week Wait?", href: "/trying-to-conceive/two-week-wait/what-is" },
      { label: "How to Cope During the Two-Week Wait", href: "/trying-to-conceive/two-week-wait/coping" },
      { label: "Symptoms During the Two-Week Wait", href: "/trying-to-conceive/two-week-wait/symptoms" },
      { label: "When to Test After Ovulation", href: "/trying-to-conceive/two-week-wait/when-to-test" },
      { label: "How to Stop Obsessing Over Symptoms", href: "/trying-to-conceive/two-week-wait/symptom-spotting" },
      { label: "What to Do If This Cycle Wasn't the One", href: "/trying-to-conceive/two-week-wait/next-cycle" },
    ],
  },
  {
    slug: "ivf-and-treatment",
    label: "IVF & Fertility Treatment",
    description: "Clear, calm guidance if you are exploring treatment or assisted conception.",
    mainHref: "/ivf",
    viewAllLabel: "View all treatment guides",
    articles: [
      { label: "What Is IVF?", href: "/ivf" },
      { label: "When to Consider IVF", href: "/ivf#when" },
      { label: "IVF Timeline", href: "/ivf-timeline" },
      { label: "IVF Medication", href: "/ivf#medication" },
      { label: "Embryo Transfer", href: "/ivf#transfer" },
      { label: "IUI Explained", href: "/trying-to-conceive/ivf-and-treatment/iui" },
    ],
  },
  {
    slug: "male-fertility",
    label: "Male Fertility",
    description: "Understand sperm health and the male side of conception.",
    mainHref: "/trying-to-conceive/male-fertility",
    viewAllLabel: "View all male fertility",
    articles: [
      { label: "Male Fertility Basics", href: "/trying-to-conceive/male-fertility/basics" },
      { label: "Sperm Health", href: "/trying-to-conceive/male-fertility/sperm-health" },
      { label: "How to Improve Sperm Quality", href: "/trying-to-conceive/male-fertility/improve-sperm" },
      { label: "Male Fertility Tests", href: "/trying-to-conceive/male-fertility/tests" },
      { label: "Lifestyle and Sperm Health", href: "/trying-to-conceive/male-fertility/lifestyle" },
      { label: "Age and Male Fertility", href: "/trying-to-conceive/male-fertility/age" },
    ],
  },
  {
    slug: "age-and-fertility",
    label: "Age & Fertility",
    description: "Sensitive, practical guidance on fertility at different ages.",
    mainHref: "/trying-to-conceive/age-and-fertility",
    viewAllLabel: "View all age and fertility",
    articles: [
      { label: "Fertility in Your 20s", href: "/trying-to-conceive/age-and-fertility/twenties" },
      { label: "Fertility in Your 30s", href: "/trying-to-conceive/age-and-fertility/thirties" },
      { label: "Fertility After 35", href: "/trying-to-conceive/age-and-fertility/after-35" },
      { label: "Fertility After 40", href: "/trying-to-conceive/age-and-fertility/after-40" },
      { label: "Egg Quality Explained", href: "/trying-to-conceive/age-and-fertility/egg-quality" },
      { label: "AMH Testing", href: "/trying-to-conceive/age-and-fertility/amh-testing" },
    ],
  },
  {
    slug: "conditions",
    label: "Conditions That Can Affect TTC",
    description: "Information on common health factors that may affect trying to conceive.",
    mainHref: "/trying-to-conceive/conditions",
    viewAllLabel: "View all health factors",
    articles: [
      { label: "PCOS and Getting Pregnant", href: "/trying-to-conceive/conditions/pcos" },
      { label: "Endometriosis and Fertility", href: "/trying-to-conceive/conditions/endometriosis" },
      { label: "Thyroid Health and TTC", href: "/trying-to-conceive/conditions/thyroid" },
      { label: "Fibroids and Fertility", href: "/trying-to-conceive/conditions/fibroids" },
      { label: "Irregular Periods and TTC", href: "/trying-to-conceive/conditions/irregular-periods" },
      { label: "When to Speak to a Doctor", href: "/trying-to-conceive/conditions/when-to-see-doctor" },
    ],
  },
];
