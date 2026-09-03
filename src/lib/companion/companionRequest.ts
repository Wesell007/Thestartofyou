/**
 * AIC-1 — the single companion request boundary.
 *
 * Both companion surfaces (the site-wide panel and the full `/ask` page)
 * construct their backend request here, then hand execution to `useAISearch`.
 * This module owns request *shape* only: it performs no fetch, touches no
 * Supabase client, parses no SSE, and does no sanitisation. Those remain in
 * `useAISearch` and `sanitiseAnswerForDisplay`.
 *
 * The backend contract is unchanged: `{ query, context?, mode? }`. Structured
 * journey context (AIC-2), session history (AIC-4) and permissioned memory
 * (AIC-3) attach here in later phases, as separate layers — never merged into
 * one unstructured context string.
 */

import { resolveCompanionMode, type CompanionMode } from "./companionMode";

export type { CompanionMode };

/** Exactly the fields `ai-search` accepts today. */
export interface CompanionRequest {
  query: string;
  context?: string;
  mode: CompanionMode;
}

/**
 * Authoritative `/ask` stage keys that map to a journey mode. Every other
 * stage key (toddler, family, support, recovery, postpartum, preparing) has no
 * dedicated mode and correctly resolves to `general`.
 */
const STAGE_MODES: Record<string, CompanionMode> = {
  ttc: "ttc_companion",
  pregnancy: "pregnancy_week_companion",
  "first-year": "first_year_companion",
};

export interface AskModeInput {
  /** `?stage=` on /ask. Written by `askDestination`, never by free text. */
  stage?: string | null;
  /** `?journey=` on /ask. No IVF-specific mode exists, so it stays general. */
  journey?: string | null;
}

/**
 * Resolve the mode for the `/ask` page from authoritative query parameters
 * only. Question text, answer text, article titles, companion names and prior
 * conversation strings are never inspected. No authoritative input means
 * `general`, which is the correct fallback rather than a guess.
 */
export function resolveAskMode({ stage }: AskModeInput = {}): CompanionMode {
  const key = (stage ?? "").trim().toLowerCase();
  return STAGE_MODES[key] ?? "general";
}

/** Resolve the mode for the site-wide panel from the current route. */
export const resolvePanelMode = (pathname: string): CompanionMode =>
  resolveCompanionMode(pathname);

/**
 * Pure construction of the request both surfaces send. Empty or
 * whitespace-only context is dropped so the backend never receives a blank
 * `journey_context` block.
 */
export function buildCompanionRequest({
  query,
  context,
  mode,
}: {
  query: string;
  context?: string | null;
  mode: CompanionMode;
}): CompanionRequest {
  const trimmedContext = context?.trim();
  return {
    query: query.trim(),
    ...(trimmedContext ? { context: trimmedContext } : {}),
    mode,
  };
}
