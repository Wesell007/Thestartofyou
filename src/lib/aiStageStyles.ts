// Shared stage style helper for stage-aware AI search.
// Single source of truth — only includes stages whose CSS tokens
// already exist in src/index.css. Unknown / missing stages return null
// so the AskPage falls back to its existing default styling.

export type AiStageKey =
  | "toddler"
  | "pregnancy"
  | "first-year"
  | "recovery"
  | "ttc"
  | "ivf"
  | "postpartum"
  | "family"
  | "support"
  | "preparing";

export interface AiStageStyle {
  key: AiStageKey;
  label: string;
  bgVar: string;
  softVar?: string;
  accentVar: string;
  deepVar?: string;
}

export const aiStageStyles: Record<AiStageKey, AiStageStyle> = {
  toddler: {
    key: "toddler",
    label: "Toddler",
    bgVar: "--stage-toddler",
    softVar: "--stage-toddler-soft",
    accentVar: "--stage-toddler-accent",
    deepVar: "--stage-toddler-deep",
  },
  pregnancy: {
    key: "pregnancy",
    label: "Pregnancy",
    bgVar: "--stage-pregnancy",
    accentVar: "--stage-pregnancy-accent",
  },
  "first-year": {
    key: "first-year",
    label: "First Year",
    bgVar: "--stage-firstyear",
    softVar: "--stage-firstyear-soft",
    accentVar: "--stage-firstyear-accent",
    deepVar: "--stage-firstyear-deep",
  },
  recovery: {
    key: "recovery",
    label: "Recovery",
    bgVar: "--stage-recovery",
    softVar: "--stage-recovery-soft",
    accentVar: "--stage-recovery-accent",
    deepVar: "--stage-recovery-deep",
  },
  ttc: {
    key: "ttc",
    label: "Trying to conceive",
    bgVar: "--stage-ttc",
    accentVar: "--stage-ttc-accent",
  },
  ivf: {
    key: "ivf",
    label: "IVF",
    bgVar: "--stage-ivf",
    accentVar: "--stage-ivf-accent",
  },
  postpartum: {
    key: "postpartum",
    label: "Postpartum",
    bgVar: "--stage-postpartum",
    accentVar: "--stage-postpartum-accent",
  },
  family: {
    key: "family",
    label: "Family",
    bgVar: "--stage-family",
    softVar: "--stage-family-soft",
    accentVar: "--stage-family-accent",
    deepVar: "--stage-family-deep",
  },
  support: {
    key: "support",
    label: "Support",
    bgVar: "--stage-support",
    accentVar: "--stage-support-accent",
  },
  preparing: {
    key: "preparing",
    label: "Preparing",
    bgVar: "--stage-preparing",
    accentVar: "--stage-preparing-accent",
  },
};

export const getAiStageStyle = (key?: string | null): AiStageStyle | null => {
  if (!key) return null;
  return (aiStageStyles as Record<string, AiStageStyle>)[key] ?? null;
};

export interface StageColorTokens {
  accent: string;
  accentStrong: string;
  accentSoft: string;
  accentSofter: string;
  accentRing: string;
  accentBorder: string;
  accentBorderStrong: string;
  bgWash: string;
  bgWashSoft: string;
  deep: string;
  deepSoft: string;
}

export const stageColors = (
  style: AiStageStyle | null
): StageColorTokens | null => {
  if (!style) return null;
  const a = style.accentVar;
  const b = style.bgVar;
  const d = style.deepVar ?? style.accentVar;
  return {
    accent: `hsl(var(${a}))`,
    accentStrong: `hsl(var(${a}) / 0.9)`,
    accentSoft: `hsl(var(${a}) / 0.12)`,
    accentSofter: `hsl(var(${a}) / 0.06)`,
    accentRing: `hsl(var(${a}) / 0.18)`,
    accentBorder: `hsl(var(${a}) / 0.22)`,
    accentBorderStrong: `hsl(var(${a}) / 0.35)`,
    bgWash: `hsl(var(${b}) / 0.35)`,
    bgWashSoft: `hsl(var(${b}) / 0.18)`,
    deep: `hsl(var(${d}))`,
    deepSoft: `hsl(var(${d}) / 0.7)`,
  };
};
