/**
 * Phase 29B.1 — answer post-processing safety net.
 *
 * The real fixes live in the edge function (wider approved-source routing and
 * prompts that ban retrieval wording). This module is the last line of
 * defence on the client: it removes any internal retrieval phrasing that
 * still slips through, strips external source links and raw URLs, and swaps a
 * pure retrieval refusal for the single approved fallback line.
 *
 * It never adds clinical content, never softens urgent-care or
 * professional-care wording, and never touches internal navigation.
 */

import { stripExternalSourceLinks } from "@/lib/answerSourceLinks";
import { SAFE_FALLBACK_ANSWER } from "../../supabase/functions/_shared/aiAnswerWording";

export { APPROVED_SOURCES_TRUST_LINE } from "@/lib/answerSourceLinks";

/**
 * The only approved wording for a genuine inability to answer. Re-exported
 * from the shared edge-function module so the client and the prompt can never
 * drift apart.
 */
export { SAFE_FALLBACK_ANSWER };

/**
 * Wording that exposes the retrieval mechanism. Any sentence containing one
 * of these is removed from the visible answer.
 */
const RETRIEVAL_WORDING = [
  /provided nhs evidence/i,
  /provided evidence/i,
  /supplied evidence/i,
  /retrieved evidence/i,
  /the evidence (?:provided|supplied|given|available)/i,
  /not covered (?:in|by) the (?:evidence|provided|supplied|source)/i,
  /not covered in the provided/i,
  /context provided/i,
  /provided context/i,
  /(?:source|reference) material/i,
  /(?:the )?(?:provided|supplied|approved) sources?\b/i,
  /based on the (?:sources?|evidence|documents?|material)/i,
  /(?:documents?|snippets?|excerpts?|passages?) (?:provided|supplied|given)/i,
  /i cannot provide specific information on this topic because/i,
  /according to the (?:provided|supplied|available) (?:information|evidence|sources?)/i,
];

const containsRetrievalWording = (text: string): boolean =>
  RETRIEVAL_WORDING.some((pattern) => pattern.test(text));

/** Split a paragraph into sentences, keeping their punctuation. */
const toSentences = (paragraph: string): string[] =>
  paragraph.match(/[^.!?]+[.!?]*\s*/g)?.filter((part) => part.trim().length > 0) ?? [paragraph];

const cleanLine = (line: string): string => {
  if (!containsRetrievalWording(line)) return line;
  // Headings and list markers are dropped whole when they carry the wording.
  if (/^\s{0,3}(?:#{1,6}\s|[-*]\s)/.test(line)) return "";
  const kept = toSentences(line).filter((sentence) => !containsRetrievalWording(sentence));
  return kept.join("").trim();
};

/** Rough measure of whether anything useful survived the clean-up. */
const hasSubstance = (text: string): boolean =>
  text.replace(/[#*_>\-\s]/g, "").length >= 60;

/**
 * Make a raw model answer safe to display. Returns the approved fallback line
 * when nothing usable is left, so the reader never sees an internal refusal.
 */
export const sanitiseAiAnswer = (markdown: string): string => {
  if (!markdown?.trim()) return "";

  const withoutLinks = stripExternalSourceLinks(markdown);
  const cleaned = withoutLinks
    .split("\n")
    .map(cleanLine)
    .join("\n")
    .replace(/[ \t]+$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  if (!hasSubstance(cleaned)) return SAFE_FALLBACK_ANSWER;
  return cleaned;
};

/**
 * Streaming-safe variant: while an answer is still arriving, an empty result
 * should stay empty rather than flash the fallback line.
 */
export const sanitiseStreamingAiAnswer = (markdown: string): string => {
  if (!markdown?.trim()) return "";
  const withoutLinks = stripExternalSourceLinks(markdown);
  return withoutLinks
    .split("\n")
    .map(cleanLine)
    .join("\n")
    .replace(/\n{3,}/g, "\n\n");
};

/**
 * Phase 29D — verdict-ban checker, promoted in Phase 29E to a development-time
 * console warning. It still never changes what a reader sees, because
 * stripping these mid-answer risks damaging otherwise good guidance.
 */
export const BANNED_VERDICT_PATTERNS: { label: string; pattern: RegExp }[] = [
  { label: "your baby is fine", pattern: /your baby (?:is|will be) (?:fine|okay|ok)\b/i },
  { label: "everything is okay", pattern: /everything (?:is|will be) (?:okay|ok|fine|alright)\b/i },
  { label: "no need to call", pattern: /no need to (?:call|contact|worry|be checked)\b/i },
  { label: "risk score", pattern: /\brisk score\b/i },
  { label: "fertility score", pattern: /\bfertility score\b/i },
  { label: "confirmed ovulation", pattern: /\bconfirm(?:s|ed|ing)? (?:that )?(?:you )?ovulat/i },
  { label: "confirmed pregnancy", pattern: /\bconfirm(?:s|ed|ing)? (?:that )?(?:you are |your )?pregnan/i },
  { label: "diagnosis", pattern: /\b(?:your|the) diagnosis is\b|\bi can diagnose\b/i },
  { label: "symptom checker", pattern: /\bsymptom checker\b/i },
];

/** Returns the labels of any banned verdict wording found in an answer. */
export const findBannedVerdicts = (text: string): string[] =>
  BANNED_VERDICT_PATTERNS.filter(({ pattern }) => pattern.test(text ?? "")).map(({ label }) => label);

/** Development-only, non-blocking. Never runs in a production build. */
const warnOnBannedVerdicts = (answer: string): void => {
  if (!import.meta.env?.DEV) return;
  const found = findBannedVerdicts(answer);
  if (found.length > 0) {
    console.warn("[ai-safety] banned verdict wording in answer:", found.join(", "));
  }
};

/**
 * Phase 29E — the single entry point every AI surface renders through.
 *
 * Pure helper, not a React hook. While an answer is still streaming it keeps
 * partial text intact; once the answer is complete it applies the full clean-up
 * and swaps a pure retrieval refusal for the approved fallback line.
 *
 * `allowFallback: false` is for recap-only surfaces, which must never show the
 * fallback line because it carries professional-help wording.
 */
export const sanitiseAnswerForDisplay = (
  answer: string,
  options: { isStreaming?: boolean; allowFallback?: boolean } = {},
): string => {
  if (!answer?.trim()) return "";
  if (options.isStreaming) return sanitiseStreamingAiAnswer(answer);
  const safe =
    options.allowFallback === false
      ? sanitiseStreamingAiAnswer(answer).replace(/[ \t]+$/gm, "").trim()
      : sanitiseAiAnswer(answer);
  warnOnBannedVerdicts(safe);
  return safe;
};

