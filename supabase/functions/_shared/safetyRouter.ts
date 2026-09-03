/**
 * AIC-5A — the single server-side deterministic safety router.
 *
 * This module wraps the existing Phase 29D urgent machinery
 * (`matchUrgent` / `urgentAnswer`) in an explicit decision contract. It adds no
 * new matching rules, no clinical thresholds and no model call. Every transport
 * (text today, voice later) must route through this one function so safety can
 * never be re-implemented per surface.
 *
 * Hard rule: once this router returns RED or CRISIS, nothing downstream — mode,
 * kill switch, journey context, page context, memory, history, grounding or the
 * model — may downgrade or suppress the decision.
 */
import { crisisSubtype, matchUrgent, urgentAnswer } from "./urgentPatterns.ts";
import type { SafetyDecision } from "./safetyState.ts";

export const decideSafety = (query: string): SafetyDecision => {
  const match = matchUrgent(query);
  if (match === "crisis") {
    return { state: "crisis", route: "deterministic", kind: crisisSubtype(query), answer: urgentAnswer(query) };
  }
  if (match === "clinical") {
    return { state: "red", route: "deterministic", kind: "clinical", answer: urgentAnswer(query) };
  }
  return { state: "green", route: "model" };
};

export type { SafetyDecision } from "./safetyState.ts";
export { isDeterministicSafetyDecision } from "./safetyState.ts";
