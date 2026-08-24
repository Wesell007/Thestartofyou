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

export { APPROVED_SOURCES_TRUST_LINE } from "@/lib/answerSourceLinks";

/** The only approved wording for a genuine inability to answer. */
export const SAFE_FALLBACK_ANSWER =
  "I do not have enough detail to answer that safely here. It would be best to speak with your midwife, GP, health visitor or urgent care service, depending on what is happening.";

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
