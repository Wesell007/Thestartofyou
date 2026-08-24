/**
 * Phase 29B.1 — external source links never reach the reader.
 *
 * AI answers are grounded against approved UK health sources, but the reader
 * is shown a plain trust line instead of link lists. This module removes any
 * trailing sources block, renders markdown link text as plain text and drops
 * bare external URLs, so no clickable external link and no raw URL survives.
 *
 * Internal navigation elsewhere in the app is untouched: this only rewrites
 * the model's markdown before it is rendered.
 */

/** The non-clickable line shown in place of source links. */
export const APPROVED_SOURCES_TRUST_LINE =
  "Guidance is checked against approved UK health sources.";

const SOURCE_HEADING = /^\s{0,3}(?:#{1,6}\s*|\*\*\s*)?(sources?|references?|further reading|useful links?)\b\s*:?\s*\*{0,2}\s*$/i;

/** Remove a trailing "Sources" / "References" style section and all it holds. */
export const stripSourceBlocks = (markdown: string): string => {
  const lines = markdown.split("\n");
  const kept: string[] = [];
  let skipping = false;

  for (const line of lines) {
    if (SOURCE_HEADING.test(line)) {
      skipping = true;
      continue;
    }
    // A new heading ends the skipped block.
    if (skipping && /^\s{0,3}#{1,6}\s+\S/.test(line)) skipping = false;
    if (!skipping) kept.push(line);
  }

  return kept.join("\n");
};

const MARKDOWN_LINK = /\[([^\]]*)\]\((?:[^)\s]+)(?:\s+"[^"]*")?\)/g;
const ANGLE_URL = /<((?:https?:\/\/|www\.)[^>\s]+)>/gi;
const BARE_URL = /(?:https?:\/\/|www\.)[^\s)<>\]]+/gi;
const INLINE_SOURCE_SENTENCE =
  /^\s{0,3}[-*]?\s*(?:source|sources|reference|references)\s*:.*$/gim;

/**
 * Strip every external link and raw URL from an answer, keeping the readable
 * link text so sentences still make sense.
 */
export const stripExternalSourceLinks = (markdown: string): string => {
  if (!markdown) return "";

  let text = stripSourceBlocks(markdown);
  text = text.replace(INLINE_SOURCE_SENTENCE, "");
  text = text.replace(MARKDOWN_LINK, (_match, label: string) => label.trim());
  text = text.replace(ANGLE_URL, "");
  text = text.replace(BARE_URL, "");

  return text
    // Tidy list items and sentences left empty by a removed URL.
    .replace(/^\s{0,3}[-*]\s*$/gm, "")
    .replace(/[ \t]+$/gm, "")
    .replace(/\(\s*\)/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};
