/**
 * AIC-7A — voice runtime contracts.
 *
 * Voice is TRANSPORT + PRESENTATION, never intelligence. These types exist so
 * later slices cannot accidentally lose the invariants agreed in AIC-6:
 *
 *   - a partial transcript is display-only and can never be sent as a turn
 *   - only a final transcript is an authoritative user turn
 *   - assistant speech is only ever produced from canonical (sanitised)
 *     assistant text, never from raw model/SSE output
 *   - committed assistant history holds only what was actually surfaced
 *
 * Nothing here captures audio, speaks, or calls a provider.
 */

import { sanitiseAnswerForDisplay } from "@/lib/aiAnswerSafety";

declare const canonicalBrand: unique symbol;
declare const speakableBrand: unique symbol;

/**
 * Speech-to-text in progress. Display only. Structurally distinct from
 * `FinalTranscript`: it carries no `final` discriminant, so it cannot be
 * passed where an authoritative turn is required.
 */
export interface PartialTranscript {
  readonly kind: "partial";
  readonly text: string;
}

/**
 * The authoritative user turn. AIC-7C will hand `text` to the existing
 * `send(question)` of `useCompanionConversation` — the same path typing uses.
 * There is no separate voice send path, voice thread or voice conversation id.
 */
export interface FinalTranscript {
  readonly kind: "final";
  readonly text: string;
}

/** Assistant text after the single approved display sanitisation boundary. */
export type CanonicalAssistantText = string & { readonly [canonicalBrand]: true };

/**
 * A completed, canonicalised, presentation-safe piece of assistant text that
 * a future TTS adapter may speak. A raw SSE delta cannot satisfy this type.
 */
export type SpeakableChunk = string & { readonly [speakableBrand]: true };

/**
 * Assistant content that was actually surfaced and committed to the
 * conversation. Deliberately has no field for a full generated answer,
 * unsurfaced tail, hidden completion or remaining model text: an interrupted
 * turn keeps only what the person actually saw.
 */
export interface CommittedAssistantRecord {
  readonly messageId: string;
  readonly canonicalText: CanonicalAssistantText;
  readonly interrupted: boolean;
}

export const partialTranscript = (text: string): PartialTranscript => ({
  kind: "partial",
  text,
});

export const finalTranscript = (text: string): FinalTranscript => ({
  kind: "final",
  text: text.trim(),
});

export const isFinalTranscript = (
  value: PartialTranscript | FinalTranscript,
): value is FinalTranscript => value.kind === "final";

/**
 * The ONLY authorised way to produce `CanonicalAssistantText`. It runs the
 * same `sanitiseAnswerForDisplay` boundary the visible companion answer uses,
 * so speech and screen can never diverge. There is deliberately no
 * `text as CanonicalAssistantText` helper for future TTS code to reach for.
 */
export const canonicaliseAssistantText = (
  rawAssistantText: string,
  options: { allowFallback?: boolean } = {},
): CanonicalAssistantText =>
  sanitiseAnswerForDisplay(rawAssistantText, {
    isStreaming: false,
    allowFallback: options.allowFallback,
  }) as CanonicalAssistantText;

/**
 * Promote canonical text to a speakable chunk. Only completed canonical text
 * qualifies; empty canonical text yields nothing to speak. Sentence
 * segmentation and actual speech belong to AIC-7D.
 */
export const toSpeakableChunk = (
  canonical: CanonicalAssistantText,
): SpeakableChunk | null => {
  const trimmed = String(canonical).trim();
  return trimmed ? (trimmed as SpeakableChunk) : null;
};

/** Build the committed record from canonical text only. */
export const committedAssistantRecord = (
  messageId: string,
  canonicalText: CanonicalAssistantText,
  interrupted = false,
): CommittedAssistantRecord => ({ messageId, canonicalText, interrupted });
