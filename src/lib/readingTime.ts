const WORDS_PER_MINUTE = 220;

const countWords = (text: string) =>
  text.trim() ? text.trim().split(/\s+/).length : 0;

/** Recursively count words in any nested structure of strings. */
export const countWordsDeep = (value: unknown): number => {
  if (typeof value === "string") return countWords(value);
  if (Array.isArray(value)) return value.reduce<number>((sum, v) => sum + countWordsDeep(v), 0);
  if (value && typeof value === "object") {
    return Object.values(value).reduce<number>((sum, v) => sum + countWordsDeep(v), 0);
  }
  return 0;
};

/** Estimate reading time in whole minutes (minimum 1). */
export const estimateReadMinutes = (value: unknown): number =>
  Math.max(1, Math.round(countWordsDeep(value) / WORDS_PER_MINUTE));

/** Human-readable label, e.g. "6 min read". */
export const estimateReadTime = (value: unknown): string =>
  `${estimateReadMinutes(value)} min read`;
