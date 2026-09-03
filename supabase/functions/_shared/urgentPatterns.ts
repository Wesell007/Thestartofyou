/**
 * Phase 29D — hard safety routing for the shared `ai-search` endpoint.
 *
 * These patterns run before the model. Anything matched here never reaches the
 * general answer path: the endpoint streams a short controlled escalation
 * answer instead. Pure module so the Deno edge function and the Vitest suite
 * import exactly the same rules.
 *
 * Wording rules: no verdicts ("safe", "fine", "normal", "low risk"), no
 * diagnosis, no reassurance that removes the option to be checked, and no
 * named helpline numbers beyond the standard UK routes (999, A&E, NHS 111).
 */

/** Mental health crisis, self-harm, harm to the baby, abuse and immediate danger. */
export const CRISIS_PATTERN =
  /(?:want(?:ing)? to die|do not want to be here|don'?t want to be here|kill myself|end my life|suicid|self[- ]?harm|hurt(?:ing)? myself|harm(?:ing)? myself|thinking about hurting|thoughts of (?:hurting|harming)|hurt(?:ing)? (?:my|the) baby|harm(?:ing)? (?:my|the) baby|might hurt (?:my|the) baby|(?:cannot|can'?t|could not|unable to|do not think i can|don'?t think i can) keep (?:myself|me|my baby|us|the baby) safe|not safe at home|someone (?:at home )?(?:is )?(?:hurting|hitting|threatening) me|(?:partner|husband|wife|boyfriend|girlfriend) (?:hurt|hurts|hit|hits|is hurting|is hitting|is threatening) me|afraid of my (?:partner|husband|wife|boyfriend)|domestic abuse|immediate danger|in danger right now)/i;

/**
 * Clinical red flags, grouped by journey for readability. The exported pattern
 * is the union of the groups.
 */
const GENERAL_RED_FLAGS = [
  "can(?:not|'t) breathe",
  "difficulty breathing",
  "trouble breathing",
  "struggling to breathe",
  "cannot catch my breath",
  "chest pain",
  "seizure",
  "unconscious",
  "passed out",
  "collapsed",
];

const PREGNANCY_RED_FLAGS = [
  // Movement
  "baby (?:is )?not moving",
  "not felt (?:my |the )?baby move",
  "baby (?:has not|hasn'?t) moved",
  "reduced (?:baby |fetal |foetal )?movement",
  "mov(?:ing|ement|ements)[^.?!]{0,24}(?:less|fewer|slowed|stopped|reduced)",
  "(?:less|fewer|no) (?:movement|movements|kicks)",
  // Bleeding
  "heavy bleeding",
  "bleeding heavily",
  "soaking (?:a|one|1) pad",
  "severe bleeding",
  "(?:i am|i'?m|im) bleeding",
  "bleeding (?:at|in|during)[^.?!]{0,24}(?:week|weeks|pregnan)",
  "bleeding (?:and|with) (?:pain|cramp)",
  "pregnant and bleeding",
  "pregnan[^?!\\n]{0,30}bleeding",
  "bleeding[^?!\\n]{0,30}pregnan",
  // Pre-eclampsia pattern
  "severe headache",
  "bad headache[^.?!]{0,30}(?:vision|sight|lights|blurred)",
  "flashing lights",
  "blurred vision",
  "vision changes",
  "changes to my vision",
  "(?:hands|face)[^.?!]{0,30}swollen[^.?!]{0,20}sudden",
  "swollen up suddenly",
  // Waters and labour
  "waters (?:have )?(?:broken|broke)",
  "regular (?:and )?painful contractions",
  "having regular[^.?!]{0,20}contractions",
  // Pain and fever
  "severe (?:abdominal |stomach |tummy )?pain",
  "pain that will not ease",
  "pain that won'?t ease",
  "(?:temperature|fever)[^?!\\n]{0,40}(?:pregnan|weeks)",
  "(?:pregnan|weeks)[^?!\\n]{0,40}(?:temperature of|fever)",
  // Ectopic pattern
  "one[- ]sided pain",
  "pain on one side[^.?!]{0,30}(?:bleed|faint|shoulder)",
  "shoulder[- ]tip pain",
  // Obstetric cholestasis
  "itching (?:badly|intensely)",
];

const POSTPARTUM_RED_FLAGS = [
  "bleeding heavily[^.?!]{0,40}(?:after birth|after having|weeks after)",
  "(?:wound|stitches|caesarean|c[- ]?section)[^.?!]{0,30}(?:hot|red|smell|infected|infection|fever|oozing)",
  "(?:fever|temperature)[^.?!]{0,40}(?:after birth|after having a baby|after my caesarean)",
  "one breast is hot",
  "breast[^.?!]{0,20}(?:hot|red)[^.?!]{0,30}fever",
  "calf is swollen",
  "swollen and painful (?:calf|leg)",
];

const BABY_RED_FLAGS = [
  "blue (?:lips|around the lips)",
  "lips (?:looked|look|are|went|turned) blue",
  "\\bfloppy\\b",
  "hard to wake",
  "hard to rouse",
  "will not wake",
  "won'?t wake",
  "difficult to wake",
  "(?:refused|refusing|not taking|will not take|won'?t take)[^.?!]{0,24}(?:feed|feeds|milk|bottle)",
  "baby (?:is )?not feeding",
  "(?:rash|spots)[^.?!]{0,40}(?:does not fade|doesn'?t fade|not fade|non[- ]?blanching)",
  "pauses in breathing",
  "(?:fewer|far fewer|less|no) wet nappies",
  "not had a wet nappy",
  "sunken (?:fontanelle|soft spot)",
  "sleeping much more than usual",
  "unresponsive",
  "not responding",
  "less responsive",
  "reduced responsiveness",
  "blood in (?:my |the |his |her )?baby'?s? nappy",
  "blood in his nappy",
  "(?:face|lips|tongue) swelled",
  // Fever under three months
  "(?:newborn|new born)[^.?!]{0,30}(?:fever|temperature)",
  "\\b(?:[1-9]|1[0-2]) week old[^?!\\n]{0,40}(?:fever|temperature)",
  "\\b[1-2] month old[^?!\\n]{0,40}(?:fever|temperature)",
  "feels very hot",
  "very hot and",
];

const buildUnion = (groups: string[][]) => new RegExp(`(?:${groups.flat().join("|")})`, "i");

export const URGENT_PATTERN = buildUnion([
  GENERAL_RED_FLAGS,
  PREGNANCY_RED_FLAGS,
  POSTPARTUM_RED_FLAGS,
  BABY_RED_FLAGS,
]);

export type UrgentMatch = "crisis" | "clinical" | null;

/** Crisis wins over clinical so distress is never answered as a symptom. */
export const matchUrgent = (query: string): UrgentMatch => {
  if (!query) return null;
  if (CRISIS_PATTERN.test(query)) return "crisis";
  if (URGENT_PATTERN.test(query)) return "clinical";
  return null;
};

const ABUSE_PATTERN =
  /(?:someone (?:at home )?(?:is )?(?:hurting|hitting|threatening) me|(?:partner|husband|wife|boyfriend|girlfriend) (?:hurt|hurts|hit|hits|is hurting|is hitting|is threatening) me|afraid of my (?:partner|husband|wife|boyfriend)|domestic abuse|not safe at home)/i;

/**
 * AIC-5A — the existing abuse/safeguarding discriminator, exposed so the shared
 * safety router can report the crisis subtype. Matching semantics are unchanged:
 * this is the same test `urgentAnswer` already performs internally.
 */
export const crisisSubtype = (query: string): "crisis" | "abuse" =>
  ABUSE_PATTERN.test(query) ? "abuse" : "crisis";


const CRISIS_ANSWER = `## Please get urgent help now

If you may act on these thoughts or you are in immediate danger, call 999 or go to A&E now. If you can, stay with someone you trust and move away from anything you could use to hurt yourself.

For urgent mental health help that is not an immediate emergency, call NHS 111 and select the mental health option. Your midwife, GP or health visitor can also arrange support quickly.`;

const ABUSE_ANSWER = `## Please get help with this now

If you are in immediate danger, call 999. If you cannot speak when the call connects, stay on the line and follow the prompts you are given.

When you are not in immediate danger, your midwife, GP or health visitor can talk with you privately and put you in touch with a domestic abuse support service. NHS 111 can help you find urgent support out of hours.`;

const CLINICAL_ANSWER = `## Please seek urgent clinical help now

What you have described needs prompt assessment rather than waiting. If there is immediate danger, severe breathing difficulty, blue lips, loss of consciousness, a seizure, a rash that does not fade or very heavy bleeding, call 999 or go to A&E now.

For reduced or changed baby movements, contact your maternity unit immediately and do not wait until the next day. For other urgent pregnancy, postnatal or baby concerns, contact your maternity triage unit, GP or NHS 111 now.`;

/** The controlled answer for a hard-matched query. Kept short by design. */
export const urgentAnswer = (query: string): string => {
  if (CRISIS_PATTERN.test(query)) {
    return ABUSE_PATTERN.test(query) ? ABUSE_ANSWER : CRISIS_ANSWER;
  }
  return CLINICAL_ANSWER;
};

/**
 * Phase 29D kill switch. Set `AI_SEARCH_DISABLED=true` (or `1`) to stop every
 * model call without a schema change or a deploy of new code.
 */
export const isAiDisabled = (value: string | undefined | null): boolean =>
  ["true", "1", "yes", "on"].includes((value ?? "").trim().toLowerCase());

/** Calm, non-diagnostic wording shown while the companion is paused. */
export const AI_PAUSED_ANSWER =
  "Your companion is taking a short pause right now. Please try again later. If you are worried about your health, your baby, or your safety, contact your midwife, GP, health visitor, NHS 111 or emergency services depending on what is happening.";
