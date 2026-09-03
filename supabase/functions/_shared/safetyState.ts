/**
 * AIC-5A — shared deterministic safety-state contract.
 *
 * The type reserves the full five-state vocabulary agreed in the AIC-5 audit,
 * but only `green`, `red` and `crisis` are ever emitted at runtime in AIC-5A.
 * `amber` is owned by AIC-5D and `unsupported` by AIC-5C; neither has an
 * implementation, and reserving the name here does not create one.
 *
 * Safety state is request-runtime state only. It is never persisted, never
 * logged against a user, and never shown to a reader as a label.
 */
export type SafetyState = "green" | "amber" | "red" | "crisis" | "unsupported";

/** States AIC-5A is permitted to emit. */
export const EMITTABLE_SAFETY_STATES = ["green", "red", "crisis"] as const;
export type EmittedSafetyState = (typeof EMITTABLE_SAFETY_STATES)[number];

/**
 * GREEN means only: no deterministic high-risk match was identified. It is not
 * a clinical verdict, and must never be surfaced as "safe" or "normal".
 */
export type GreenDecision = { state: "green"; route: "model" };

/** Deterministic clinical red flag. Maps to the established clinical answer. */
export type RedDecision = { state: "red"; route: "deterministic"; kind: "clinical"; answer: string };

/**
 * Crisis severity keeps its two distinguishable deterministic subtypes:
 * self-harm / harm-to-another crisis, and abuse / safeguarding.
 */
export type CrisisDecision = {
  state: "crisis";
  route: "deterministic";
  kind: "crisis" | "abuse";
  answer: string;
};

export type SafetyDecision = GreenDecision | RedDecision | CrisisDecision;

/** True when the decision terminates the normal generative path. */
export const isDeterministicSafetyDecision = (
  decision: SafetyDecision,
): decision is RedDecision | CrisisDecision => decision.route === "deterministic";
