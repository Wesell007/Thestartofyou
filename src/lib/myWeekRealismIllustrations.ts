/**
 * Phase 14.3 foundation: resolver for the neutral / default 42-week symbolic
 * pregnancy realism illustrations. Phase 14.9 extends this with tone-aware
 * resolution for Light, Medium, and Deep variants (Weeks 9–42 only). Weeks
 * 1–8 always return the default (neutral) illustration regardless of tone.
 * Not wired into any page yet — future phases will decide integration.
 */

type AssetPointer = { url?: unknown };

const defaultPointerModules = import.meta.glob<AssetPointer>(
  "../assets/myweek-weekly-realism/*.png.asset.json",
  { eager: true, import: "default" },
);

const lightPointerModules = import.meta.glob<AssetPointer>(
  "../assets/myweek-weekly-realism-light/*.png.asset.json",
  { eager: true, import: "default" },
);

const mediumPointerModules = import.meta.glob<AssetPointer>(
  "../assets/myweek-weekly-realism-medium/*.png.asset.json",
  { eager: true, import: "default" },
);

const deepPointerModules = import.meta.glob<AssetPointer>(
  "../assets/myweek-weekly-realism-deep/*.png.asset.json",
  { eager: true, import: "default" },
);

const MIN_WEEK = 1;
const MAX_WEEK = 42;
const TONE_MIN_WEEK = 9;

export type RealismTone = "default" | "light" | "medium" | "deep";

const buildWeekMap = (
  pointerModules: Record<string, AssetPointer>,
): Map<number, string> => {
  const map = new Map<number, string>();
  for (const [path, pointer] of Object.entries(pointerModules)) {
    const match = path.match(/week-(\d{2})\.png\.asset\.json$/);
    if (!match) continue;
    const weekNum = Number(match[1]);
    if (!Number.isFinite(weekNum)) continue;
    const url = pointer && typeof pointer === "object" ? pointer.url : undefined;
    if (typeof url === "string" && url.length > 0) {
      map.set(weekNum, url);
    }
  }
  return map;
};

const weekToUrl = buildWeekMap(defaultPointerModules);
const lightWeekToUrl = buildWeekMap(lightPointerModules);
const mediumWeekToUrl = buildWeekMap(mediumPointerModules);
const deepWeekToUrl = buildWeekMap(deepPointerModules);

const clampWeek = (week: number): number => {
  if (!Number.isFinite(week)) return MIN_WEEK;
  const rounded = Math.round(week);
  if (rounded < MIN_WEEK) return MIN_WEEK;
  if (rounded > MAX_WEEK) return MAX_WEEK;
  return rounded;
};

const findNearestUrl = (target: number): string => {
  if (weekToUrl.size === 0) return "";
  let best = "";
  let bestDistance = Number.POSITIVE_INFINITY;
  for (const [week, url] of weekToUrl) {
    const distance = Math.abs(week - target);
    if (distance < bestDistance) {
      best = url;
      bestDistance = distance;
    }
  }
  return best;
};

export interface DefaultRealismResolution {
  src: string;
  week: number;
}

/**
 * Resolve the default (neutral) symbolic realism illustration for a pregnancy
 * week. Clamps input to weeks 1–42, tolerates non-finite input, and falls back
 * to the nearest available week if a pointer is missing. Never throws.
 */
export function resolveDefaultRealismForWeek(
  week: number,
): DefaultRealismResolution {
  const resolvedWeek = clampWeek(week);
  const direct = weekToUrl.get(resolvedWeek);
  const src = direct ?? findNearestUrl(resolvedWeek);
  return { src, week: resolvedWeek };
}

const toneMapFor = (tone: RealismTone): Map<number, string> | null => {
  switch (tone) {
    case "light":
      return lightWeekToUrl;
    case "medium":
      return mediumWeekToUrl;
    case "deep":
      return deepWeekToUrl;
    default:
      return null;
  }
};

/**
 * Phase 14.9: Resolve a symbolic realism illustration for a given week and
 * skin-tone preference. Weeks 1–8 always return the default (no visible baby
 * form). Missing tone assets silently fall back to the default resolver so
 * this function never throws and never returns an empty src.
 */
export function resolveRealismForWeek(
  week: number,
  tone: RealismTone,
): DefaultRealismResolution {
  const defaultResolution = resolveDefaultRealismForWeek(week);
  if (tone === "default") return defaultResolution;
  if (defaultResolution.week < TONE_MIN_WEEK) return defaultResolution;
  const toneMap = toneMapFor(tone);
  const toneUrl = toneMap?.get(defaultResolution.week);
  if (typeof toneUrl === "string" && toneUrl.length > 0) {
    return { src: toneUrl, week: defaultResolution.week };
  }
  return defaultResolution;
}

/**
 * Normalise arbitrary input into a supported RealismTone. Unknown, null, or
 * undefined values fall back to "default" so future wiring stays safe.
 */
export function normaliseRealismTone(value: unknown): RealismTone {
  if (value === "light" || value === "medium" || value === "deep") {
    return value;
  }
  return "default";
}

/**
 * Cautious alt copy. Deliberately avoids claiming exact appearance, medical
 * accuracy, or what a baby looks like at a given week. Tone-agnostic by design.
 */
export function defaultRealismAltForWeek(week: number): string {
  const w = clampWeek(week);
  if (w <= 2) {
    return `Symbolic pregnancy illustration for week ${w}, before conception.`;
  }
  if (w >= 41) {
    return `Symbolic pregnancy illustration for week ${w}, gentle transition toward birth.`;
  }
  return `Symbolic pregnancy illustration for week ${w}.`;
}
