/**
 * AIC-5E — fixed trusted tone guidance.
 *
 * Every string here is written by us and fixed at build time. No user wording,
 * no matched phrase and no conversation text is ever interpolated into a
 * trusted instruction: user content stays untrusted DATA in the user message.
 *
 * The guidance concerns tone, acknowledgement and organisation only. It never
 * touches facts, safety classification, escalation routes or grounding, and it
 * is injected on the ordinary model path only — never into a deterministic
 * RED, CRISIS, clarification or unsupported answer.
 */

import type { EmotionalEvidence, EmotionCategory } from "./emotionalEvidence.ts";

const PRECEDENCE = [
  "Tone guidance for this answer (lower authority than every safety rule above):",
  "- This block may change how the answer sounds and how it is organised. It may never change what is factually said, remove or soften required professional-contact guidance, alter urgency, or override any safety instruction.",
  "- The person has said how they feel in their own words. Do not label, diagnose or interpret their emotional state, and do not describe it back to them as a condition.",
];

const CATEGORY_GUIDANCE: Record<EmotionCategory, string[]> = {
  fear: [
    "- Acknowledge the worry briefly and calmly, then answer the actual question.",
    "- Do not catastrophise, do not list frightening possibilities that were not asked about, and do not say \"try not to worry\".",
    "- Give no reassurance the information cannot support. Keep any proportionate next step exactly as it would otherwise be.",
  ],
  overwhelm: [
    "- Lead with one clear first step, then anything else in priority order.",
    "- Offer fewer parallel recommendations and leave out optional detail.",
    "- Never drop required safety information or important caveats to make the answer shorter.",
  ],
  low: [
    "- Acknowledge briefly and warmly. Stay gentle.",
    "- Do not force positivity, do not diagnose, and make no claim about why they feel this way.",
    "- Still answer the question they asked.",
  ],
  self_blame: [
    "- Use neutral, compassionate language. Do not blame, and do not moralise.",
    "- Do not automatically say it is not their fault. Make no claim about responsibility that the information cannot support.",
    "- Answer the substantive question.",
  ],
  frustration: [
    "- Acknowledge the frustration briefly where it is natural, then be clear and direct.",
    "- Do not sound defensive and do not over-soothe. Focus on the useful next action.",
    "- Do not treat frustration as overwhelm: keep the usual level of detail.",
  ],
  positive: [
    "- Reflect the positive feeling lightly where it is natural. Do not over-celebrate.",
    "- A good feeling is not medical evidence. Do not turn it into reassurance, a prediction, an outcome or any verdict about a pregnancy, a test or fertility.",
  ],
};

const CONTINUITY_GUIDANCE = {
  carried: "- They said how they felt a moment ago and this message follows on from it. Keep that in mind, but do not open with another acknowledgement: continue the conversation naturally.",
  continued: "- They have said this feeling is still there. A short acknowledgement of that is fine; do not repeat the same wording you used before.",
  increased: "- They have said the feeling has grown stronger. Acknowledge that change briefly, stay calm, and answer the question.",
  eased: "- They have said the feeling has eased. Acknowledge that lightly without treating it as evidence that anything is resolved.",
  fresh: "- One brief acknowledgement is enough. Do not repeat it later in the answer.",
} as const;

/**
 * The trusted block for this request, or an empty string when there is no
 * explicit emotional evidence (in which case nothing at all is injected and
 * behaviour is exactly as before AIC-5E).
 */
export const renderEmotionalGuidance = (evidence: EmotionalEvidence): string => {
  if (evidence.kind !== "explicit" || evidence.categories.length === 0) return "";

  const lines = [...PRECEDENCE];
  for (const category of evidence.categories) lines.push(...CATEGORY_GUIDANCE[category]);

  if (evidence.source === "recent_user") {
    lines.push(CONTINUITY_GUIDANCE.carried);
  } else if (evidence.direction === "increased") {
    lines.push(CONTINUITY_GUIDANCE.increased);
  } else if (evidence.direction === "eased") {
    lines.push(CONTINUITY_GUIDANCE.eased);
  } else if (evidence.continuity === "continued") {
    lines.push(CONTINUITY_GUIDANCE.continued);
  } else if (evidence.repeatedFromPrevious) {
    lines.push(CONTINUITY_GUIDANCE.carried);
  } else {
    lines.push(CONTINUITY_GUIDANCE.fresh);
  }

  return lines.join("\n");
};
