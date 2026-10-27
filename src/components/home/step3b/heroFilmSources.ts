/**
 * The founder-approved hero film (27 October 2026): H1 → H2 (real journal footage) → H4 → H5, 14.33 s,
 * first frame identical to the poster. Files are versioned under /media/hero/v1/ so they can be cached as
 * immutable; a new cut ships under a new folder, never over these.
 *
 * Mobile (≤ 720 px) uses the dedicated 608 × 1080 master, which carries the approved per-shot crops.
 */

const BASE = "/media/hero/v1";

export const HERO_MOBILE_QUERY = "(max-width: 720px)";

export type HeroFilmTier = "mobile" | "d1280" | "d1920";

export const HERO_FILM: Record<HeroFilmTier, { webm: string; mp4: string }> = {
  mobile: { webm: `${BASE}/hero-final-mobile.webm`, mp4: `${BASE}/hero-final-mobile.mp4` },
  d1280: { webm: `${BASE}/hero-final-1280.webm`, mp4: `${BASE}/hero-final-1280.mp4` },
  d1920: { webm: `${BASE}/hero-final-1920.webm`, mp4: `${BASE}/hero-final-1920.mp4` },
};

export const HERO_POSTERS = {
  mobile: `${BASE}/hero-final-poster-mobile.jpg`,
  d1280: `${BASE}/hero-final-poster-1280.jpg`,
  d1920: `${BASE}/hero-final-poster-1920.jpg`,
} as const;

export interface HeroViewport {
  width: number;
  height: number;
  dpr: number;
  mobile: boolean;
}

/** Poster tiers match the preload hints: 1920 above 1280 px, 1280 from 721 px, mobile at 720 px and below. */
export function heroPosterFor({ width, mobile }: HeroViewport): string {
  if (mobile) return HERO_POSTERS.mobile;
  return width > 1280 ? HERO_POSTERS.d1920 : HERO_POSTERS.d1280;
}

/**
 * The hero is cover-fitted, so the raster it needs is the larger of the viewport width and its height
 * at 16:9, times pixel density. 1280 is used only when that is genuinely enough.
 */
export function heroFilmTierFor({ width, height, dpr, mobile }: HeroViewport): HeroFilmTier {
  if (mobile) return "mobile";
  return Math.max(width, (height * 16) / 9) * (dpr || 1) > 1400 ? "d1920" : "d1280";
}

/**
 * Poster only, with no video request at all: reduced motion, Save-Data, or a 2G-class connection.
 */
export function heroPrefersPoster(win: Window = window): boolean {
  const reduced = win.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  const conn = (win.navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } })
    .connection;
  const slow = !!conn && (conn.saveData === true || /2g$/.test(conn.effectiveType || ""));
  return reduced || slow;
}

export function readHeroViewport(win: Window = window): HeroViewport {
  return {
    width: win.innerWidth,
    height: win.innerHeight,
    dpr: win.devicePixelRatio || 1,
    mobile: win.matchMedia?.(HERO_MOBILE_QUERY).matches ?? false,
  };
}
