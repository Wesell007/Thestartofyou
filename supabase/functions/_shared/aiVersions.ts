/**
 * Phase 29E — explicit AI version constants.
 *
 * Every behaviour-bearing part of the AI system carries a version string so a
 * change is traceable in logs, tests and documentation. Pure TypeScript: no
 * Deno APIs, no browser APIs, no environment reads and no side effects.
 *
 * None of these values may ever appear in a user-facing answer. They exist for
 * internal logging, tests and release notes only.
 */

/** The model the shared `ai-search` endpoint calls. */
export const AI_MODEL_ID = "google/gemini-2.5-flash";

/** Bumped whenever a system prompt block or mode composition changes. */
export const AI_PROMPT_VERSION = "29E-prompt-v1";

/** Bumped whenever hard escalation patterns or the kill switch change. */
export const AI_SAFETY_RULESET_VERSION = "29D-safety-v1";

/** Bumped whenever approved-source routing changes. */
export const AI_SOURCE_ROUTING_VERSION = "29B1-source-routing-v1";

/** The evaluation dataset the deterministic harness runs against. */
export const AI_EVAL_DATASET_VERSION = "eval-dataset-v1";

/**
 * Bumped whenever the allowlist of fields a client may send as context
 * changes. Phase 29F introduced the pregnancy context contract.
 */
export const AI_CONTEXT_CONTRACT_VERSION = "29F-context-v1";

/** The phase these versions were last reviewed in. */
export const AI_PHASE = "29F";

/** Bundled summary, logged once per cold start. Never returned to a browser. */
export const AI_VERSION_SUMMARY = {
  model: AI_MODEL_ID,
  prompt: AI_PROMPT_VERSION,
  safety: AI_SAFETY_RULESET_VERSION,
  sourceRouting: AI_SOURCE_ROUTING_VERSION,
  evalDataset: AI_EVAL_DATASET_VERSION,
  contextContract: AI_CONTEXT_CONTRACT_VERSION,
  phase: AI_PHASE,
} as const;


export type AiVersionSummary = typeof AI_VERSION_SUMMARY;
