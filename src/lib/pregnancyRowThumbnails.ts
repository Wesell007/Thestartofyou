/**
 * WC-2A.5 — Article hero thumbnail source selection.
 *
 * The grouped article rows on the Pregnancy topic pages render images in a
 * 44px (w-11/h-11) slot but previously reused the full-size article hero
 * assets. This module maps a full-size hero URL to a dedicated 256px-wide
 * thumbnail generated from the same source image.
 *
 * Scope: grouped 44px rows only. Start here cards and article hero routes
 * continue to use the original full-size assets.
 */

const thumbModules = import.meta.glob("../assets/article-thumbnails/*.jpg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

// filename stem (without the "-thumb" suffix) -> bundled thumbnail URL
const THUMB_BY_STEM: Record<string, string> = {};
for (const [path, url] of Object.entries(thumbModules)) {
  const file = path.split("/").pop() ?? "";
  const stem = file.replace(/-thumb\.jpg$/i, "");
  if (stem) THUMB_BY_STEM[stem] = url;
}

/** Extract the original asset stem from a bundled asset URL. */
const stemFromUrl = (url: string): string => {
  const file = url.split("/").pop() ?? "";
  // Vite appends a content hash: name-<hash>.<ext>
  return file.replace(/\.[a-z0-9]+$/i, "").replace(/-[A-Za-z0-9_-]{8}$/, "");
};

/**
 * Returns the dedicated small thumbnail for a full-size source image URL,
 * or the original URL when no thumbnail exists (graceful fallback).
 */
export const resolveRowThumb = (fullSizeUrl: string): string => {
  if (!fullSizeUrl) return fullSizeUrl;
  return THUMB_BY_STEM[stemFromUrl(fullSizeUrl)] ?? fullSizeUrl;
};

/** Test/diagnostic helper: number of thumbnails available. */
export const rowThumbnailCount = () => Object.keys(THUMB_BY_STEM).length;
