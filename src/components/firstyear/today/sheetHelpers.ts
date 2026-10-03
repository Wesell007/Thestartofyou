import type { BabyRecord } from "@/lib/firstYearJourney";

/**
 * Non-component pieces shared by the logging sheets. Kept apart from
 * `sheetControls.tsx` so that file exports components and string constants
 * only, and React Fast Refresh can keep sheet state while editing.
 */

export const SHEET_PRIMARY_STYLE = {
  backgroundColor: "hsl(var(--stage-firstyear-accent))",
  color: "hsl(var(--background))",
} as const;

export const timeValue = (date: Date): string => {
  const pad = (part: number) => String(part).padStart(2, "0");
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

export const withTime = (base: Date, value: string): Date | null => {
  const [hours, minutes] = value.split(":").map(Number);
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return null;
  const next = new Date(base);
  next.setHours(hours, minutes, 0, 0);
  return next;
};

export const babyLabel = (baby: BabyRecord, index: number): string =>
  baby.name?.trim() ? baby.name.trim() : `Baby ${baby.birth_order ?? index + 1}`;
