/**
 * Approved-source routing for the shared `ai-search` endpoint.
 *
 * Static keyword routing over a fixed NHS allowlist. There is deliberately no
 * RAG, no vector search, no article ingestion and no Start of You grounding
 * here: this module only decides which already-approved public NHS pages are
 * fetched as evidence for a question.
 *
 * Pure, so the same module is imported by the Deno edge function and by the
 * Vitest suite. Every URL below was checked as reachable (HTTP 200, no
 * redirect) and topically relevant before being added.
 */

export const APPROVED_SOURCES = {
  pregnancyHub: "https://www.nhs.uk/pregnancy/",
  pregnancySymptoms: "https://www.nhs.uk/pregnancy/common-symptoms/common-health-problems/",
  bleeding: "https://www.nhs.uk/pregnancy/common-symptoms/vaginal-bleeding/",
  movements: "https://www.nhs.uk/pregnancy/keeping-well/your-babys-movements/",
  keepingWell: "https://www.nhs.uk/pregnancy/keeping-well/",
  appointments:
    "https://www.nhs.uk/pregnancy/your-pregnancy-care/your-antenatal-care-and-appointments/",
  labour: "https://www.nhs.uk/pregnancy/labour-and-birth/signs-that-labour-has-begun/",
  babyHub: "https://www.nhs.uk/baby/",
  babyUnwell:
    "https://www.nhs.uk/baby/health/when-to-get-urgent-medical-help-for-babies-and-children-under-5/",
  feedingHub: "https://www.nhs.uk/baby/breastfeeding-and-bottle-feeding/",
  breastfeeding: "https://www.nhs.uk/baby/breastfeeding-and-bottle-feeding/breastfeeding/",
  babySleep: "https://www.nhs.uk/baby/caring-for-a-newborn/helping-your-baby-to-sleep/",
  fertility: "https://www.nhs.uk/conditions/periods/fertility-in-the-menstrual-cycle/",
  infertility: "https://www.nhs.uk/conditions/infertility/",
  pregnancyTest: "https://www.nhs.uk/pregnancy/trying-for-a-baby/doing-a-pregnancy-test/",
  ivf: "https://www.nhs.uk/tests-and-treatments/ivf/",
  mentalHealth:
    "https://www.nhs.uk/nhs-services/mental-health-services/where-to-get-urgent-help-for-mental-health/",
  // Phase 30B — postpartum recovery, weaning and toddler coverage.
  postpartumBody: "https://www.nhs.uk/conditions/baby/support-and-services/your-post-pregnancy-body/",
  postnatalCheck:
    "https://www.nhs.uk/conditions/baby/support-and-services/your-6-week-postnatal-check/",
  postpartumFitness:
    "https://www.nhs.uk/conditions/baby/support-and-services/keeping-fit-and-healthy-with-a-baby/",
  firstSolidFoods: "https://www.nhs.uk/conditions/baby/weaning-and-feeding/babys-first-solid-foods/",
  youngChildrenFood:
    "https://www.nhs.uk/conditions/baby/weaning-and-feeding/what-to-feed-young-children/",
  foodsToAvoid:
    "https://www.nhs.uk/conditions/baby/weaning-and-feeding/foods-to-avoid-giving-babies-and-young-children/",
  drinksAndCups:
    "https://www.nhs.uk/conditions/baby/weaning-and-feeding/drinks-and-cups-for-babies-and-young-children/",
  learningToTalk:
    "https://www.nhs.uk/conditions/baby/babys-development/play-and-learning/help-your-baby-learn-to-talk/",
  toddlerFirstWords:
    "https://www.nhs.uk/best-start-in-life/toddler/learning-to-talk/first-words-and-little-sentences-1-to-2-years/",
  toddlerActivities: "https://www.nhs.uk/best-start-in-life/toddler/activities-for-toddlers/",
  toddlerHub: "https://www.nhs.uk/best-start-in-life/toddler/",
} as const;

type Family = "pregnancy" | "baby" | "postpartum" | "toddler" | "ttc" | "safety" | "generic";

type Topic = {
  /** Matched against the lowercased question plus bounded page context. */
  pattern: RegExp;
  family: Family;
  urls: string[];
};

/**
 * Ordered: the first match wins. Safety branches sit first, then the routine
 * topics that used to fall through to the two generic pregnancy pages.
 */
const TOPICS: Topic[] = [
  {
    // Brand, product and account questions must never be dressed in clinical
    // grounding: they fall through to the broad hubs instead.
    pattern:
      /start of you|this (app|site|website|service)|the app\b|my account|subscription|sign[- ]?up|sign[- ]?in|log[- ]?in|password|companion name|journal feature/,
    family: "generic",
    urls: [],
  },
  {
    pattern:
      /suicid|self[- ]?harm|harm myself|mental health|panic attack|depress|can'?t cope|cannot cope|worthless/,
    family: "safety",
    urls: [APPROVED_SOURCES.mentalHealth],
  },
  {
    pattern: /\bivf\b|embryo|egg collection|fertility treatment|frozen transfer/,
    family: "ttc",
    urls: [APPROVED_SOURCES.ivf, APPROVED_SOURCES.infertility],
  },
  {
    pattern:
      /foods? to avoid|avoid giving|\bhoney\b|choking hazard|whole nuts|too much salt|unsafe food/,
    family: "baby",
    urls: [APPROVED_SOURCES.foodsToAvoid, APPROVED_SOURCES.firstSolidFoods],
  },
  {
    pattern: /sippy|beaker|open cup|drinks? and cups|cows'? milk|water for (?:my )?(?:baby|toddler)/,
    family: "baby",
    urls: [APPROVED_SOURCES.drinksAndCups, APPROVED_SOURCES.youngChildrenFood],
  },
  {
    pattern:
      /wean|solid foods?|\bsolids\b|first foods|pur[eé]e|baby[- ]?led|highchair|finger food|what (?:to|should i) feed (?:my )?(?:baby|toddler|young child)/,
    family: "baby",
    urls: [APPROVED_SOURCES.firstSolidFoods, APPROVED_SOURCES.youngChildrenFood],
  },
  {
    pattern: /\bmov(?:e|es|ed|ing|ement|ements)\b|kick|flutter|wriggl|quicken/,
    family: "pregnancy",
    urls: [APPROVED_SOURCES.movements, APPROVED_SOURCES.keepingWell],
  },
  {
    // Anxiety wording that is not attached to a more specific topic. Sits below
    // movements so "anxious about movements" still routes to movements.
    pattern: /anxious|anxiety/,
    family: "safety",
    urls: [APPROVED_SOURCES.mentalHealth],
  },
  {
    pattern:
      /(?:post[- ]?natal|postnatal|6[- ]week|six[- ]week|8[- ]week|eight[- ]week)\s*(?:check|review|appointment)/,
    family: "postpartum",
    urls: [APPROVED_SOURCES.postnatalCheck, APPROVED_SOURCES.postpartumBody],
  },
  {
    pattern:
      /after (?:the )?birth|body after birth|post[- ]?pregnancy body|postpartum|postnatal recovery|stitches|perine|pelvic floor|\bpiles\b|haemorrhoid|lochia|after[- ]?pains|c[- ]?section (?:recovery|scar|wound)|exercis\w* (?:again|after|with a baby)|getting fit|back to running|cramp\w* (?:while|when|during) (?:breast)?feed/,
    family: "postpartum",
    urls: [APPROVED_SOURCES.postpartumBody, APPROVED_SOURCES.postpartumFitness],
  },
  {
    pattern: /midwife|antenatal|appointment|scan\b|booking|check[- ]?up|blood test/,
    family: "pregnancy",
    urls: [APPROVED_SOURCES.appointments],
  },
  {
    pattern: /labour|contraction|waters|giving birth|induction/,
    family: "pregnancy",
    urls: [APPROVED_SOURCES.labour],
  },
  {
    pattern:
      /first words|little sentences|learning to talk|\bspeech\b|talking|babbl|not saying (?:any )?words|words yet|early learning/,
    family: "toddler",
    urls: [APPROVED_SOURCES.learningToTalk, APPROVED_SOURCES.toddlerFirstWords],
  },
  {
    pattern:
      /play idea|activities for|things to do with|toddler play|playing with (?:my )?(?:baby|toddler)|bonding/,
    family: "toddler",
    urls: [APPROVED_SOURCES.toddlerActivities],
  },
  {
    pattern: /feed|latch|breastfe|bottle|milk|winding|colic|hunger|cluster|\bcue/,
    family: "baby",
    urls: [APPROVED_SOURCES.breastfeeding, APPROVED_SOURCES.feedingHub],
  },
  {
    pattern: /sleep|night wak|nap\b|settle|drowsy|bedtime|waking/,
    family: "baby",
    urls: [APPROVED_SOURCES.babySleep],
  },
  {
    pattern: /pregnancy test|testing|test day|two[- ]week wait|2ww|home test/,
    family: "ttc",
    urls: [APPROVED_SOURCES.pregnancyTest],
  },
  {
    pattern: /ovulat|fertil|conceiv|period|cycle|trying for a baby|\bttc\b/,
    family: "ttc",
    urls: [APPROVED_SOURCES.fertility, APPROVED_SOURCES.infertility],
  },
  {
    pattern: /bleed|spotting|cramp|pain/,
    family: "pregnancy",
    urls: [APPROVED_SOURCES.bleeding, APPROVED_SOURCES.pregnancySymptoms],
  },
  {
    pattern: /baby|newborn|infant|toddler|napp|temperature|unwell|poorly/,
    family: "baby",
    urls: [APPROVED_SOURCES.babyHub, APPROVED_SOURCES.babyUnwell],
  },
];

/** Broad pages used when nothing specific matches. */
const DEFAULT_URLS = [APPROVED_SOURCES.pregnancySymptoms, APPROVED_SOURCES.pregnancyHub];

const HUB_FOR_FAMILY: Record<Exclude<Family, "safety" | "generic">, string> = {
  pregnancy: APPROVED_SOURCES.pregnancyHub,
  baby: APPROVED_SOURCES.babyHub,
  postpartum: APPROVED_SOURCES.babyHub,
  toddler: APPROVED_SOURCES.toddlerHub,
  ttc: APPROVED_SOURCES.fertility,
};

/**
 * Choose up to three approved pages for a question. A relevant hub page is
 * always included so a question never lands on narrow pages alone.
 */
export const selectSources = (query: string, context?: string): string[] => {
  const text = `${query} ${context ?? ""}`.toLowerCase();
  const topic = TOPICS.find((entry) => entry.pattern.test(text));
  if (!topic || topic.family === "generic") return [...DEFAULT_URLS];
  if (topic.family === "safety") return [...topic.urls];

  const urls = [...topic.urls];
  const hub = HUB_FOR_FAMILY[topic.family];
  if (!urls.includes(hub)) urls.push(hub);
  return urls.slice(0, 3);
};
