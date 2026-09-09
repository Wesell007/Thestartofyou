/**
 * First Year pre-authentication setup state.
 *
 * Deliberately minimal. This may hold ONLY:
 *   - baby count
 *   - the shared date of birth
 *   - any baby names actually typed
 *   - a creation timestamp
 *
 * Never a companion name or tone, notes, memories, care events, feeding,
 * sleep, development or journal content. It is never written to an account
 * before an authorised save, and never placed in URLs, analytics or logs.
 *
 * It expires after exactly 24 hours: reading an older record clears it and
 * reports no pending setup, and reading never extends the expiry.
 */

const KEY = "pendingFirstYearSetup";

/** Exactly 24 hours. */
export const FIRST_YEAR_PENDING_TTL_MS = 24 * 60 * 60 * 1000;

export type PendingFirstYearSetup = {
  babyCount: number;
  dateOfBirth: string; // yyyy-MM-dd
  names: string[];
  savedAt: number;
};

type StoredInput = {
  babyCount: number;
  dateOfBirth: string;
  names: string[];
};

const isValidShape = (value: unknown): value is PendingFirstYearSetup => {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  if (!Number.isInteger(v.babyCount)) return false;
  const count = v.babyCount as number;
  if (count < 1 || count > 4) return false;
  if (typeof v.dateOfBirth !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(v.dateOfBirth)) {
    return false;
  }
  if (!Array.isArray(v.names) || v.names.some((n) => typeof n !== "string")) return false;
  if (typeof v.savedAt !== "number" || !Number.isFinite(v.savedAt)) return false;
  return true;
};

export const stashPendingFirstYearSetup = (
  input: StoredInput,
  now: number = Date.now(),
): void => {
  const payload: PendingFirstYearSetup = {
    babyCount: input.babyCount,
    dateOfBirth: input.dateOfBirth,
    names: input.names.slice(0, input.babyCount).map((n) => n.trim()),
    savedAt: now,
  };
  try {
    localStorage.setItem(KEY, JSON.stringify(payload));
  } catch {
    // Storage unavailable: the person simply re-enters after signing in.
  }
};

export const clearPendingFirstYearSetup = (): void => {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // Nothing to do.
  }
};

/**
 * Read the pending setup. Anything invalid or older than 24 hours is cleared
 * and reported as absent. Reading never rewrites the record.
 */
export const readPendingFirstYearSetup = (
  now: number = Date.now(),
): PendingFirstYearSetup | null => {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {
    return null;
  }
  if (!raw) return null;
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    clearPendingFirstYearSetup();
    return null;
  }
  if (!isValidShape(parsed)) {
    clearPendingFirstYearSetup();
    return null;
  }
  if (now - parsed.savedAt >= FIRST_YEAR_PENDING_TTL_MS) {
    clearPendingFirstYearSetup();
    return null;
  }
  return parsed;
};
