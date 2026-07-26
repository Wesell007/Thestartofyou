/**
 * Weekly photo caption helpers.
 *
 * Captions attach to the existing week_photos row. They are optional,
 * capped at 140 characters, trimmed, single-line (newlines collapsed
 * to spaces), and stored as NULL when empty.
 */

export const CAPTION_MAX = 140;
export const CAPTION_PLACEHOLDER = "Add a few words about this memory";

/** Collapse newlines and repeated whitespace to single spaces; trim ends. */
export const normaliseCaption = (raw: string): string =>
  raw.replace(/\s+/g, " ").trim();

/** True when the normalised caption fits within the character cap. */
export const isCaptionWithinLimit = (raw: string): boolean =>
  normaliseCaption(raw).length <= CAPTION_MAX;

/**
 * Prepare a caption for persistence.
 * Empty string → null (so "cleared" and "never set" behave identically).
 * Over limit → throws; callers should validate first.
 */
export const captionForSave = (raw: string): string | null => {
  const value = normaliseCaption(raw);
  if (value.length === 0) return null;
  if (value.length > CAPTION_MAX) {
    throw new Error(`Caption exceeds ${CAPTION_MAX} characters`);
  }
  return value;
};
