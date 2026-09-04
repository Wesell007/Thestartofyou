/**
 * AIC-5D — deterministic AMBER *eligibility* gate.
 *
 * This module answers exactly one question:
 *
 *   is this ordinary-path request worth spending an optional structured
 *   safety assessment on?
 *
 * It never answers "is this AMBER". Eligibility is not a safety state, is not
 * persisted, is not exposed to the client and creates no clinical threshold.
 * A deterministic RED/CRISIS decision (AIC-5A) and a clarify/unsupported
 * decision (AIC-5C) have already terminated the request before this runs.
 *
 * Three approved signals, all "assess further" only:
 *   A — explicit concern wording (reused verbatim from AIC-5C)
 *   B — narrow first-person symptom/experience framing
 *   C — urgent-family symptom vocabulary present without a deterministic RED
 *       match. Signal C may only invoke the classifier: it must never be read
 *       as "the RED qualifier was missing, therefore AMBER".
 */

import { hasConcernWording } from "./clarificationRules.ts";

export type AmberEligibilitySignal = "concern_wording" | "first_person_symptom" | "urgent_family_vocabulary";

export interface AmberEligibility {
  /** Whether the optional structured assessment call is justified. */
  eligibleForAmberAssessment: boolean;
  /** Which signals fired. Runtime only, never persisted or returned to a client. */
  signals: AmberEligibilitySignal[];
  /**
   * Whether the current wording deterministically depends on an earlier turn,
   * so the classifier may receive the minimum prior USER-authored turn(s).
   */
  needsPriorUserTurn: boolean;
}

const normalise = (query: string): string =>
  (query ?? "").toLowerCase().replace(/[’']/g, "'").replace(/\s+/g, " ").trim();

/** Signal B — who the experience belongs to. */
const FIRST_PERSON_SUBJECT =
  /\b(i|i'm|im|i've|ive|my|me|myself|our|we|us)\b|\b(my|our|the) (baby|son|daughter|child|toddler|little one|newborn)\b/;

/**
 * Signal B — bodily/experience vocabulary. Deliberately ordinary words: this
 * decides only whether to assess, never how serious anything is.
 */
const SYMPTOM_OR_EXPERIENCE =
  /\b(pain|painful|ache|aching|cramp|cramps|cramping|bleed|bleeding|blood|spotting|discharge|headache|dizzy|dizziness|faint|nausea|nauseous|sick|vomit|vomiting|being sick|fever|temperature|hot|rash|itch|itching|itchy|swelling|swollen|breathless|breathing|cough|lump|sore|burning|stinging|leaking|contraction|contractions|movement|movements|kicks|kicking|not feeding|refusing|reflux|constipated|diarrhoea|wet nappies|weight|bruise|infection|wound|stitches|mastitis|symptom|symptoms|hurts|hurting|unwell|poorly)\b/;

/** Signal B — the person is reporting an experience rather than asking generally. */
const EXPERIENCE_FRAMING =
  /\b(i|we) (have|has|had|am|'m|m|feel|felt|am feeling|keep|kept|get|got|getting|noticed|notice|been|seem|think i)\b|\bi'?ve\b|\bmy \w+ (is|are|has|have|feels?|hurts?|keeps?)\b|\b(my|our|the) (baby|son|daughter|child|toddler|little one|newborn) (is|has|keeps|seems|will not|won't|isn't|is not)\b/;

/**
 * Signal C — the symptom families the deterministic urgent corpus covers,
 * expressed as bare vocabulary. Presence alone justifies assessment; it is
 * never evidence of severity, and no qualifier list is consulted here.
 */
const URGENT_FAMILY_VOCABULARY =
  /\b(bleed|bleeding|blood|movement|movements|kicks|kicking|contraction|contractions|waters|headache|vision|blurred|swelling|swollen|fever|temperature|rash|breathing|breathless|floppy|unresponsive|feeding|nappies|pain|cramp|cramping|discharge|itching|calf|wound|stitches|caesarean|c-section|jaundice|seizure)\b/;

/**
 * Deterministic continuation trigger. Only wording that cannot be understood
 * on its own may pull a prior USER turn into the assessment.
 */
const CONTINUATION_TRIGGER =
  /\b(getting worse|got worse|worse now|is worse|feels worse|worsening|getting more|happening more|more often now|still happening|still going on|still there|has changed|changed since|not improving|no better|not any better|it started again|came back|again today)\b|^(it|that|this|they|he|she)\b.{0,40}\b(worse|more|still|again|changed)\b/;

export const hasContinuationWording = (query: string): boolean =>
  CONTINUATION_TRIGGER.test(normalise(query));

const hasFirstPersonSymptomFraming = (text: string): boolean =>
  FIRST_PERSON_SUBJECT.test(text) &&
  SYMPTOM_OR_EXPERIENCE.test(text) &&
  EXPERIENCE_FRAMING.test(text);

/**
 * The single deterministic eligibility decision. Favours recall modestly,
 * because the only consequence of a false positive is one additional internal
 * assessment call — never a different answer by itself.
 */
export const decideAmberEligibility = (query: string): AmberEligibility => {
  const text = normalise(query);
  if (!text) {
    return { eligibleForAmberAssessment: false, signals: [], needsPriorUserTurn: false };
  }

  const signals: AmberEligibilitySignal[] = [];
  if (hasConcernWording(text)) signals.push("concern_wording");
  if (hasFirstPersonSymptomFraming(text)) signals.push("first_person_symptom");
  if (URGENT_FAMILY_VOCABULARY.test(text) && FIRST_PERSON_SUBJECT.test(text)) {
    signals.push("urgent_family_vocabulary");
  }

  const needsPriorUserTurn = CONTINUATION_TRIGGER.test(text);
  const eligibleForAmberAssessment = signals.length > 0 || (needsPriorUserTurn && SYMPTOM_OR_EXPERIENCE.test(text));

  return { eligibleForAmberAssessment, signals, needsPriorUserTurn };
};
