/**
 * Pure builder for the small, non-identifying context string sent to the
 * shared `ai-search` function from the First Year home companion card.
 *
 * Deliberately excluded: baby names, parent names, exact dates of birth,
 * Daily Check-in note text, memory text, photo data and anything from the
 * kept pregnancy chapter. Only coarse stage facts are included.
 */

import type { CompanionTone } from "@/lib/companion";
import { getFirstYearAge } from "@/lib/firstYearDates";
import { resolveFirstYearStage } from "@/lib/firstYearStage";

export const FIRST_YEAR_CONTEXT_MAX_LENGTH = 500;

export interface FirstYearCompanionContextInput {
  /** First baby's date of birth. Used only to derive a coarse age band. */
  dateOfBirth?: string | null;
  /** How many babies are on the journey. Never names. */
  babyCount?: number;
  /** Saved companion tone, if the person set one. */
  tone?: CompanionTone | null;
  /** Optional short page hint, defaults to the First Year home hint. */
  pageHint?: string;
}

const DEFAULT_PAGE_HINT =
  "The person is on their personal First Year home page, signed in.";

const PRODUCT_HINT =
  "Give short, calm, general guidance and suggest speaking to a midwife, GP or health visitor when it matters.";

const toneHint = (tone: CompanionTone): string => {
  if (tone === "practical") return "Prefers clear, practical wording.";
  if (tone === "warm") return "Prefers warm, gentle wording.";
  return "Prefers calm, steady wording.";
};

/** Coarse age band. Never a date, never a day count. */
export function firstYearAgeBand(
  dateOfBirth?: string | null,
  reference: Date = new Date(),
): string | null {
  const age = getFirstYearAge(dateOfBirth, reference);
  if (!age) return null;
  if (age.ageInDays <= 27) return "Baby is in the first few weeks.";
  if (age.ageInMonths < 3) return "Baby is around one to three months old.";
  if (age.ageInMonths < 6) return "Baby is around three to six months old.";
  if (age.ageInMonths < 9) return "Baby is around six to nine months old.";
  if (age.ageInMonths < 12) return "Baby is around nine to twelve months old.";
  return "The child is past twelve months.";
}

export function buildFirstYearCompanionContext({
  dateOfBirth,
  babyCount,
  tone,
  pageHint,
}: FirstYearCompanionContextInput): string {
  const parts: string[] = ["First year after birth."];

  const band = firstYearAgeBand(dateOfBirth);
  if (band) parts.push(band);

  const stage = resolveFirstYearStage(dateOfBirth);
  if (stage) parts.push(`Stage: ${stage.label}.`);

  if (typeof babyCount === "number" && babyCount > 1) {
    parts.push("More than one baby on this journey.");
  }

  if (tone) parts.push(toneHint(tone));

  parts.push(pageHint?.trim() || DEFAULT_PAGE_HINT);
  parts.push(PRODUCT_HINT);

  const context = parts.join(" ");
  return context.length > FIRST_YEAR_CONTEXT_MAX_LENGTH
    ? context.slice(0, FIRST_YEAR_CONTEXT_MAX_LENGTH).trimEnd()
    : context;
}
