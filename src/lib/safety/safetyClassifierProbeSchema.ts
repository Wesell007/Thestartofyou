/**
 * AIC-5B — pure strict validator for the structured-output feasibility probe.
 *
 * This is probe tooling and future-reuse scaffolding only. It has zero
 * production imports in AIC-5B: no classifier ships, no route calls it, and
 * nothing in `ai-search` or any surface references it.
 *
 * The contract it validates is the smallest one representative of a future
 * ambiguous-middle decision. RED and CRISIS are deliberately absent: the
 * deterministic AIC-5A router owns them and runs first, so no model path may
 * ever produce them.
 *
 * Provider-side schema enforcement never replaces this check. Even a provider
 * that enforces the schema server-side must be re-validated here before any
 * future code trusts the value.
 */

export const PROBE_STATES = ["green", "amber"] as const;
export type ProbeSafetyState = (typeof PROBE_STATES)[number];

export type SafetyClassifierProbeResult =
  | { valid: true; state: ProbeSafetyState }
  | { valid: false; reason: string };

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/**
 * Accepts exactly `{ state: "green" }` or `{ state: "amber" }`. Everything
 * else — extra keys, other states, arrays, strings, markdown-fenced JSON,
 * malformed JSON, null — is INVALID. No coercion, no repair, no parsing of
 * prose.
 */
export const parseSafetyClassifierProbeResult = (
  value: unknown,
): SafetyClassifierProbeResult => {
  if (!isPlainObject(value)) return { valid: false, reason: "not-an-object" };

  const keys = Object.keys(value);
  if (keys.length !== 1) return { valid: false, reason: "unexpected-keys" };
  if (keys[0] !== "state") return { valid: false, reason: "missing-state" };

  const state = value.state;
  if (typeof state !== "string") return { valid: false, reason: "state-not-a-string" };
  if (!(PROBE_STATES as readonly string[]).includes(state)) {
    return { valid: false, reason: "state-not-allowed" };
  }

  return { valid: true, state: state as ProbeSafetyState };
};

/**
 * Convenience for raw provider text. A response body is only valid when it is
 * bare JSON matching the contract: a markdown fence, leading prose or trailing
 * prose all fail here rather than being stripped.
 */
export const parseSafetyClassifierProbeText = (
  text: unknown,
): SafetyClassifierProbeResult => {
  if (typeof text !== "string") return { valid: false, reason: "not-a-string" };
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return { valid: false, reason: "malformed-json" };
  }
  return parseSafetyClassifierProbeResult(parsed);
};
