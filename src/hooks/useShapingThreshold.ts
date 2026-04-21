import { useEffect, useState } from "react";

/**
 * Shaping availability threshold.
 *
 * Shaping only offers itself when there is genuinely something to shape:
 *   - at least 40 characters of non-whitespace text
 *   - at least 8 words
 *   - content has settled (user idle for at least 2 seconds)
 *
 * Below the threshold the action is hidden, not disabled. No instructional copy.
 */
export const useShapingThreshold = (text: string, idleMs = 2000) => {
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    setSettled(false);
    const t = window.setTimeout(() => setSettled(true), idleMs);
    return () => window.clearTimeout(t);
  }, [text, idleMs]);

  const trimmed = text.trim();
  const charsOk = trimmed.length >= 40;
  const wordCount = trimmed.length === 0 ? 0 : trimmed.split(/\s+/).length;
  const wordsOk = wordCount >= 8;

  const meetsContent = charsOk && wordsOk;
  const available = meetsContent && settled;

  return { available, meetsContent, settled, wordCount, charCount: trimmed.length };
};
