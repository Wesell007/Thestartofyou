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
} as const;

type Family = "pregnancy" | "baby" | "ttc" | "safety";

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
    pattern: /suicid|self[- ]?harm|mental health|panic attack|depress|anxious|anxiety/,
    family: "safety",
    urls: [APPROVED_SOURCES.mentalHealth],
  },
  {
    pattern: /\bivf\b|embryo|egg collection|fertility treatment|frozen transfer/,
    family: "ttc",
    urls: [APPROVED_SOURCES.ivf, APPROVED_SOURCES.infertility],
  },
  {
    pattern: /\bmov(?:e|es|ed|ing|ement|ements)\b|kick|flutter|wriggl|quicken/,
    family: "pregnancy",
    urls: [APPROVED_SOURCES.movements, APPROVED_SOURCES.keepingWell],
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
    pattern: /baby|newborn|infant|toddler|napp|weaning|temperature|unwell|poorly/,
    family: "baby",
    urls: [APPROVED_SOURCES.babyHub, APPROVED_SOURCES.babyUnwell],
  },
];

/** Broad pages used when nothing specific matches. */
const DEFAULT_URLS = [APPROVED_SOURCES.pregnancySymptoms, APPROVED_SOURCES.pregnancyHub];

const HUB_FOR_FAMILY: Record<Exclude<Family, "safety">, string> = {
  pregnancy: APPROVED_SOURCES.pregnancyHub,
  baby: APPROVED_SOURCES.babyHub,
  ttc: APPROVED_SOURCES.fertility,
};

/**
 * Choose up to three approved pages for a question. A relevant hub page is
 * always included so a question never lands on narrow pages alone.
 */
export const selectSources = (query: string, context?: string): string[] => {
  const text = `${query} ${context ?? ""}`.toLowerCase();
  const topic = TOPICS.find((entry) => entry.pattern.test(text));
  if (!topic) return [...DEFAULT_URLS];
  if (topic.family === "safety") return [...topic.urls];

  const urls = [...topic.urls];
  const hub = HUB_FOR_FAMILY[topic.family];
  if (!urls.includes(hub)) urls.push(hub);
  return urls.slice(0, 3);
};
