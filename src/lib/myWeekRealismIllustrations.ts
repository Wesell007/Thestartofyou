/**
 * Phase 14.3 foundation: resolver for the neutral / default 42-week symbolic
 * pregnancy realism illustrations. Not wired into any page yet — Phase 14.4
 * will decide integration into /my-week.
 */

type AssetPointer = { url?: unknown };

const pointerModules = import.meta.glob<AssetPointer>(
  "../assets/myweek-weekly-realism/*.png.asset.json",
  { eager: true, import: "default" },
);

const MIN_WEEK = 1;
const MAX_WEEK = 42;

const weekToUrl: Map<number, string> = (() => {
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
})();

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

/**
 * Cautious alt copy. Deliberately avoids claiming exact appearance, medical
 * accuracy, or what a baby looks like at a given week.
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
