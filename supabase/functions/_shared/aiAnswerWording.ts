/**
 * Phase 29E — single source of truth for shared AI answer wording.
 *
 * Pure TypeScript: no Deno APIs, no browser APIs, no environment reads, no
 * runtime-only imports and no side effects, so the Supabase edge function, the
 * Vite frontend and the Vitest suite all import exactly the same literals.
 */

/** The only approved wording for a genuine inability to answer. */
export const SAFE_FALLBACK_ANSWER =
  "I do not have enough detail to answer that safely here. It would be best to speak with your midwife, GP, health visitor or urgent care service, depending on what is happening.";

/**
 * Controlled recap-only fallback used when a day digest contains urgent
 * wording. The Today surface stays recap-only, so the fixed page footer and
 * the wider product carry professional-help messaging instead.
 */
export const DAY_RECAP_UNAVAILABLE_ANSWER =
  "Cindy cannot turn this entry into a simple day recap. What you logged is saved just as you wrote it.";
