/**
 * Weekly Article Suggestions — /my-week active pregnancy path only.
 *
 * Small, curated map from pregnancy week to 1 or 2 internal articles.
 * Never auto-surface sensitive or condition-specific pieces. Anything
 * in EXCLUDED_FROM_WEEKLY stays pull-based on public pages only.
 *
 * If a slug is missing at runtime it is silently skipped. If a week has
 * no match, callers receive an empty array and hide the section.
 */

import { getArticle } from "@/data/articleData";

export interface WeeklySuggestion {
  slug: string;
  reason: string;
}

/** Sensitive or condition-specific slugs that must never be auto-surfaced. */
export const EXCLUDED_FROM_WEEKLY: readonly string[] = [
  "pregnancy-after-loss",
  "when-the-joy-doesnt-arrive-yet",
  "perinatal-anxiety",
  "anxiety-in-pregnancy",
  "emotional-wellbeing-pregnancy",
  "symptoms-stopping-early-pregnancy",
  "anti-d-injection-in-pregnancy",
  "bleeding-in-early-pregnancy",
  "spotting-in-pregnancy",
  "chemical-pregnancy",
  "reduced-movements-in-pregnancy",
  "when-to-worry-about-cramps-in-pregnancy",
  "leaking-fluid-in-pregnancy",
  "cord-around-the-neck-in-pregnancy",
  "breech-baby",
  "low-lying-placenta-in-pregnancy",
  "measuring-big-or-small-in-pregnancy",
  "growth-scans-in-pregnancy",
  "what-if-a-scan-shows-something-unexpected",
  "group-b-strep-in-pregnancy",
  "twins-and-multiples-in-pregnancy",
  "external-cephalic-version",
];

interface WeekRange {
  from: number;
  to: number;
  items: WeeklySuggestion[];
}

const REASONS = {
  nausea: "A gentle look at what many people feel around now.",
  fatigue: "Written for the tiredness of early pregnancy.",
  firstTriEmotions: "For the quieter feelings of the first trimester.",
  nipt: "Written for the weeks around early screening.",
  combined: "Written for the weeks around combined screening.",
  dating: "Written for the weeks around the dating scan.",
  sleep: "Small ideas for resting a little easier.",
  roundLigament: "For the twinges that often show up around now.",
  anomaly: "Written for the weeks around the 20 week scan.",
  movements: "For first flutters and getting to know a pattern.",
  backPain: "For the aches that often begin around now.",
  gtt: "Written for the weeks around the glucose test.",
  heartburn: "For the burn that often arrives in the middle weeks.",
  breath: "For the breathlessness of later pregnancy.",
  bag: "A calm run through of what to pack.",
  birthPlan: "A gentle way to think through preferences.",
  emotionally: "For the feelings the last stretch can bring.",
  swelling: "For the puffiness of later pregnancy.",
  thirtySix: "Written for the 36 week appointment.",
  labour: "The signs to look out for as your body gets ready.",
  colostrum: "Optional practice, if it feels right for you.",
  whenToGo: "A calm guide to knowing when to head in.",
  sweep: "For the questions around a membrane sweep.",
  induction: "A gentle explainer for induction of labour.",
  overdue: "For the days after your due date.",
} as const;

const RANGES: WeekRange[] = [
  { from: 5, to: 7, items: [
    { slug: "nausea-in-early-pregnancy", reason: REASONS.nausea },
    { slug: "fatigue-in-early-pregnancy", reason: REASONS.fatigue },
  ]},
  { from: 8, to: 9, items: [
    { slug: "nausea-in-early-pregnancy", reason: REASONS.nausea },
    { slug: "the-first-trimester-emotionally", reason: REASONS.firstTriEmotions },
  ]},
  { from: 10, to: 10, items: [
    { slug: "nipt-in-pregnancy", reason: REASONS.nipt },
  ]},
  { from: 11, to: 11, items: [
    { slug: "combined-screening-test", reason: REASONS.combined },
  ]},
  { from: 12, to: 12, items: [
    { slug: "dating-scan", reason: REASONS.dating },
  ]},
  { from: 13, to: 13, items: [
    { slug: "the-first-trimester-emotionally", reason: REASONS.firstTriEmotions },
  ]},
  { from: 14, to: 15, items: [
    { slug: "sleep-in-pregnancy", reason: REASONS.sleep },
  ]},
  { from: 16, to: 17, items: [
    { slug: "round-ligament-pain", reason: REASONS.roundLigament },
  ]},
  { from: 18, to: 21, items: [
    { slug: "20-week-anomaly-scan", reason: REASONS.anomaly },
    { slug: "baby-movement-in-pregnancy", reason: REASONS.movements },
  ]},
  { from: 22, to: 23, items: [
    { slug: "back-pain-in-pregnancy", reason: REASONS.backPain },
  ]},
  { from: 24, to: 25, items: [
    { slug: "baby-movement-in-pregnancy", reason: REASONS.movements },
    { slug: "glucose-tolerance-test", reason: REASONS.gtt },
  ]},
  { from: 26, to: 27, items: [
    { slug: "heartburn-in-pregnancy", reason: REASONS.heartburn },
  ]},
  { from: 28, to: 29, items: [
    { slug: "shortness-of-breath-in-pregnancy", reason: REASONS.breath },
  ]},
  { from: 30, to: 31, items: [
    { slug: "hospital-bag-and-what-to-pack", reason: REASONS.bag },
    { slug: "writing-a-birth-plan", reason: REASONS.birthPlan },
  ]},
  { from: 32, to: 33, items: [
    { slug: "preparing-emotionally-for-birth", reason: REASONS.emotionally },
    { slug: "swelling-in-pregnancy", reason: REASONS.swelling },
  ]},
  { from: 34, to: 34, items: [
    { slug: "writing-a-birth-plan", reason: REASONS.birthPlan },
    { slug: "sleep-in-pregnancy", reason: REASONS.sleep },
  ]},
  { from: 35, to: 36, items: [
    { slug: "the-36-week-appointment", reason: REASONS.thirtySix },
    { slug: "hospital-bag-and-what-to-pack", reason: REASONS.bag },
  ]},
  { from: 37, to: 37, items: [
    { slug: "signs-of-labour", reason: REASONS.labour },
    { slug: "hand-expressing-colostrum", reason: REASONS.colostrum },
  ]},
  { from: 38, to: 39, items: [
    { slug: "signs-of-labour", reason: REASONS.labour },
    { slug: "when-to-go-in-for-labour", reason: REASONS.whenToGo },
  ]},
  { from: 40, to: 40, items: [
    { slug: "membrane-sweep", reason: REASONS.sweep },
    { slug: "what-happens-if-labour-doesnt-start", reason: REASONS.overdue },
  ]},
  { from: 41, to: 42, items: [
    { slug: "induction-of-labour", reason: REASONS.induction },
    { slug: "what-happens-if-labour-doesnt-start", reason: REASONS.overdue },
  ]},
];

/**
 * Returns 0-2 suggestions for the given week. Silently drops any slug
 * that is not present in article data or that is on the excluded list.
 */
export const getWeeklySuggestions = (week: number): WeeklySuggestion[] => {
  const range = RANGES.find((r) => week >= r.from && week <= r.to);
  if (!range) return [];
  const seen = new Set<string>();
  const out: WeeklySuggestion[] = [];
  for (const item of range.items) {
    if (seen.has(item.slug)) continue;
    if (EXCLUDED_FROM_WEEKLY.includes(item.slug)) continue;
    if (!getArticle(item.slug)) continue;
    seen.add(item.slug);
    out.push(item);
    if (out.length >= 2) break;
  }
  return out;
};
