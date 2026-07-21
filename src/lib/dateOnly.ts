import { format, isValid, parseISO } from "date-fns";

/** Parse a yyyy-MM-dd value as a local calendar date, never as UTC midnight. */
export const parseDateOnly = (value: string | null | undefined): Date | null => {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const parsed = parseISO(value);
  if (!isValid(parsed) || format(parsed, "yyyy-MM-dd") !== value) return null;
  return parsed;
};

export const isFutureDateOnly = (value: string, today = new Date()): boolean => {
  const parsed = parseDateOnly(value);
  if (!parsed) return false;
  return value > format(today, "yyyy-MM-dd");
};
