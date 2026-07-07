export interface HubBodyImage {
  afterSectionIndex: number;
  src: string;
  alt: string;
  caption?: string;
}

export interface ToddlerArticleImages {
  hero: { src: string; alt: string };
  body: HubBodyImage[];
}

// Populated per publishing batch in Phase 8.2b onward.
export const toddlerArticleImageMap: Record<string, ToddlerArticleImages> = {};

export const getToddlerArticleImages = (
  slug: string,
): ToddlerArticleImages | undefined => toddlerArticleImageMap[slug];
