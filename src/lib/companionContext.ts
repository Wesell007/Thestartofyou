/**
 * Pure helper that builds the small, non-identifying context string sent to
 * the shared `ai-search` function from the inline My Week companion card.
 *
 * Deliberately excluded: first name, companion name, reflection text, photo,
 * video or voice note data, memory existence flags, media URLs and any
 * journey history. Only coarse stage facts are included.
 */

import type { CompanionTone } from "@/lib/companion";

export const COMPANION_CONTEXT_MAX_LENGTH = 500;

export interface CompanionContextInput {
  /** Current pregnancy week (1-42). */
  week: number;
  /** Due date, used for day and month only (never the year). */
  dueDate?: Date | null;
  /** Saved companion tone, if the user set one. */
  tone?: CompanionTone | null;
  /** Optional short page hint, defaults to the My Week hint. */
  pageHint?: string;
}

const DEFAULT_PAGE_HINT =
  "The person is reading their personal My Week pregnancy page.";

export function trimesterLabel(week: number): string {
  if (week <= 12) return "first trimester";
  if (week <= 27) return "second trimester";
  if (week <= 40) return "third trimester";
  return "past their due date";
}

const toneHint = (tone: CompanionTone): string => {
  if (tone === "practical") return "Prefers clear, practical wording.";
  if (tone === "warm") return "Prefers warm, gentle wording.";
  return "Prefers calm, steady wording.";
};

const dueDayMonth = (date: Date): string | null => {
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long" });
};

export function buildCompanionContext({
  week,
  dueDate,
  tone,
  pageHint,
}: CompanionContextInput): string {
  const safeWeek = Math.min(Math.max(Math.round(week) || 1, 1), 42);
  const parts: string[] = [
    `Pregnancy week ${safeWeek}, ${trimesterLabel(safeWeek)}.`,
  ];

  if (dueDate) {
    const label = dueDayMonth(dueDate);
    if (label) parts.push(`Due date around ${label}.`);
  }

  if (tone) parts.push(toneHint(tone));

  parts.push(pageHint?.trim() || DEFAULT_PAGE_HINT);

  const context = parts.join(" ");
  return context.length > COMPANION_CONTEXT_MAX_LENGTH
    ? context.slice(0, COMPANION_CONTEXT_MAX_LENGTH).trimEnd()
    : context;
}
