/**
 * Deterministic meta-description sanitiser.
 *
 * Editorial intro/standfirst copy is written for the page, not for search
 * results: it can carry line breaks, doubled spacing and lengths beyond what
 * search engines display. This normalises whitespace and trims to a whole
 * word within the display budget. It never rewrites the wording.
 */
const MAX_LENGTH = 155;

export const toMetaDescription = (source: string, maxLength = MAX_LENGTH): string => {
  const normalised = source.replace(/\s+/g, " ").trim();
  if (normalised.length <= maxLength) return normalised;

  const clipped = normalised.slice(0, maxLength - 1);
  const lastSpace = clipped.lastIndexOf(" ");
  const trimmed = (lastSpace > 0 ? clipped.slice(0, lastSpace) : clipped).replace(/[,;:.\s]+$/, "");
  return `${trimmed}…`;
};

export default toMetaDescription;
