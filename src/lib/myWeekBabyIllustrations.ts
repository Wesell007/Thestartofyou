import defaultEarly from "@/assets/myweek-baby-styles/default-early.png";
import defaultMid from "@/assets/myweek-baby-styles/default-mid.png";
import defaultLate from "@/assets/myweek-baby-styles/default-late.png";
import lightEarly from "@/assets/myweek-baby-styles/light-early.png";
import lightMid from "@/assets/myweek-baby-styles/light-mid.png";
import lightLate from "@/assets/myweek-baby-styles/light-late.png";
import mediumEarly from "@/assets/myweek-baby-styles/medium-early.png";
import mediumMid from "@/assets/myweek-baby-styles/medium-mid.png";
import mediumLate from "@/assets/myweek-baby-styles/medium-late.png";
import deepEarly from "@/assets/myweek-baby-styles/deep-early.png";
import deepMid from "@/assets/myweek-baby-styles/deep-mid.png";
import deepLate from "@/assets/myweek-baby-styles/deep-late.png";

export type BabyIllustrationStyle = "default" | "light" | "medium" | "deep";
export type BabyIllustrationStage = "early" | "mid" | "late";

export const BABY_ILLUSTRATION_STYLES: readonly BabyIllustrationStyle[] = [
  "default",
  "light",
  "medium",
  "deep",
] as const;

const ILLUSTRATION_MAP: Record<
  BabyIllustrationStyle,
  Record<BabyIllustrationStage, string>
> = {
  default: { early: defaultEarly, mid: defaultMid, late: defaultLate },
  light: { early: lightEarly, mid: lightMid, late: lightLate },
  medium: { early: mediumEarly, mid: mediumMid, late: mediumLate },
  deep: { early: deepEarly, mid: deepMid, late: deepLate },
};

const ALT_TEXT: Record<BabyIllustrationStyle, string> = {
  default: "Symbolic baby illustration.",
  light: "Symbolic baby illustration in a lighter skin tone style.",
  medium: "Symbolic baby illustration in a medium skin tone style.",
  deep: "Symbolic baby illustration in a deeper skin tone style.",
};

export function isBabyIllustrationStyle(
  value: unknown,
): value is BabyIllustrationStyle {
  return (
    typeof value === "string" &&
    (BABY_ILLUSTRATION_STYLES as readonly string[]).includes(value)
  );
}

export function babyIllustrationStageForWeek(
  week: number | null | undefined,
): BabyIllustrationStage {
  if (typeof week !== "number" || !Number.isFinite(week)) return "mid";
  const w = Math.trunc(week);
  if (w >= 1 && w <= 13) return "early";
  if (w >= 14 && w <= 27) return "mid";
  if (w >= 28 && w <= 42) return "late";
  return "mid";
}

export function resolveBabyIllustration(
  style: unknown,
  stage: BabyIllustrationStage,
): string {
  const resolvedStyle: BabyIllustrationStyle = isBabyIllustrationStyle(style)
    ? style
    : "default";
  return ILLUSTRATION_MAP[resolvedStyle][stage];
}

export function resolveBabyIllustrationForWeek(
  style: unknown,
  week: number | null | undefined,
): { src: string; style: BabyIllustrationStyle; stage: BabyIllustrationStage } {
  const resolvedStyle: BabyIllustrationStyle = isBabyIllustrationStyle(style)
    ? style
    : "default";
  const stage = babyIllustrationStageForWeek(week);
  return {
    src: ILLUSTRATION_MAP[resolvedStyle][stage],
    style: resolvedStyle,
    stage,
  };
}

export function babyIllustrationAlt(style: BabyIllustrationStyle): string {
  return ALT_TEXT[style];
}
