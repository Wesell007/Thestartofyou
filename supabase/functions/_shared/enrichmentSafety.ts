/**
 * AIC-JA-S1 — the shared deterministic pre-flight for enrichment text.
 *
 * This module adds NO safety authority. It is a thin, pure policy layer over
 * the existing AIC-5A router (`decideSafety`), and it exists so that any future
 * enrichment layer — journal background context first — has exactly one place
 * to ask "is this text usable as background material?".
 *
 * Two classes of context, two different answers:
 *
 *   BACKGROUND (passively retrieved, e.g. recent journal entries)
 *     The only permitted outcomes are USABLE or DROPPED. Old written material
 *     must never become a surprise terminal crisis response: the entry may be
 *     historical, the situation may have resolved, and the person did not ask
 *     about it in this turn. Anything the existing router does not return GREEN
 *     for is dropped, and the ordinary request continues without it.
 *
 *   EXPLICIT (the person deliberately asks the companion to process content)
 *     Unchanged and not handled here. Explicit content travels inside `query`,
 *     so `decideSafety` classifies it first and a terminal RED/CRISIS answer —
 *     with the existing wording and the existing `X-Companion-Next-Actions:
 *     suppress` header — still wins. Nothing in this module may relax that.
 *
 * Hard constraints: no model call, no second classifier, no new safety state,
 * no new taxonomy, no logging of text, excerpts, matched patterns or decisions,
 * and no value that could be surfaced to a browser as a safety label.
 */

import { decideSafety } from "./safetyRouter.ts";

/** Upper bound on a single piece of enrichment text before assessment. */
export const ENRICHMENT_TEXT_MAX_LENGTH = 2_000;

/**
 * The only two outcomes. Deliberately not a safety state: callers may act on
 * "usable" and nothing else, so no classification can leak outwards.
 */
export type EnrichmentAssessment = { usable: boolean };

const UNUSABLE: EnrichmentAssessment = { usable: false };
const USABLE: EnrichmentAssessment = { usable: true };

/**
 * Fail-closed assessment of one piece of background enrichment text.
 *
 * Usable only when the existing deterministic router returns GREEN. Empty
 * text, non-string input, over-long text and any unexpected throw all resolve
 * to unusable, because "we could not be sure" must behave like "do not use".
 */
export const assessEnrichmentText = (text: unknown): EnrichmentAssessment => {
  if (typeof text !== "string") return UNUSABLE;
  const trimmed = text.trim();
  if (!trimmed) return UNUSABLE;
  if (trimmed.length > ENRICHMENT_TEXT_MAX_LENGTH) return UNUSABLE;
  try {
    return decideSafety(trimmed).state === "green" ? USABLE : UNUSABLE;
  } catch {
    return UNUSABLE;
  }
};

/** Minimum shape a background entry must have to be assessed. */
export interface BackgroundEntryLike {
  text: string;
}

/**
 * Keep only the background entries the existing safety authority is content to
 * treat as ordinary material. Per-entry fail-closed: one risky entry removes
 * itself, not the whole block, and an entirely dropped block simply means the
 * request proceeds with no enrichment at all.
 *
 * This function never returns a reason, never escalates and never signals that
 * anything was removed.
 */
export const filterBackgroundEntries = <T extends BackgroundEntryLike>(
  entries: readonly T[] | null | undefined,
): T[] => {
  if (!Array.isArray(entries)) return [];
  return entries.filter((entry) => assessEnrichmentText(entry?.text).usable);
};
