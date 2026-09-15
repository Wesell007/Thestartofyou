/**
 * Phase 34G — neutral IVF timeline domain module.
 *
 * Owns the single stable transfer-type representation and the validation rules
 * shared by the calculator UI and the persistence layer. Keeping it here means
 * persistence never imports a React component, and there is exactly one
 * definition of what a transfer type is.
 */

export type IVFTransferType = "3day" | "5day";

export const IVF_TRANSFER_TYPES: readonly IVFTransferType[] = ["3day", "5day"] as const;

/** Calculator entry window, in days, for a NEW transfer date. */
export const IVF_TRANSFER_DATE_MAX_AGE_DAYS = 300;

export const isIVFTransferType = (value: unknown): value is IVFTransferType =>
  value === "3day" || value === "5day";

const DATE_ONLY_RE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Parse a stored calendar date safely, with no timezone shift: we build the
 * date at local noon so day boundaries can never move it.
 *
 * Used on LOAD. It intentionally applies no age limit — historical treatment
 * context must stay readable however long ago it happened.
 */
export const parseIVFTransferDate = (value: unknown): Date | null => {
  if (typeof value !== "string" || !DATE_ONLY_RE.test(value)) return null;
  const [y, m, d] = value.split("-").map(Number);
  const date = new Date(y, m - 1, d, 12, 0, 0, 0);
  if (Number.isNaN(date.getTime())) return null;
  if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) return null;
  return date;
};

export const formatIVFTransferDate = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

/**
 * SAVE-time rule only: mirrors the calculator's own entry rules — a real
 * calendar date, not in the future, and within the entry window.
 */
export const isValidNewIVFTransferDate = (value: unknown, now: Date = new Date()): boolean => {
  const parsed = parseIVFTransferDate(value);
  if (!parsed) return false;
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0, 0);
  if (parsed.getTime() > today.getTime()) return false;
  const earliest = new Date(today);
  earliest.setDate(earliest.getDate() - IVF_TRANSFER_DATE_MAX_AGE_DAYS);
  return parsed.getTime() >= earliest.getTime();
};
