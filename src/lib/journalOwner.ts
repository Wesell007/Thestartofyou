/**
 * Phase 27F — lightweight journal-owner preference.
 *
 * Device-level only. This is a presentation tone hint, set when someone
 * arrives from an insert card inside the physical journal. It is never proof
 * of purchase and it never gates access: the whole app stays available to
 * everyone whether this is set or not.
 */

const STORAGE_KEY = "theStartOfYou:pregnancyJournalOwner";

const isBrowser = (): boolean => typeof window !== "undefined";

/** Defaults to false, including when storage is unavailable. */
export const isJournalOwner = (): boolean => {
  if (!isBrowser()) return false;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
};

export const setJournalOwner = (): void => {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, "true");
  } catch {
    // Storage may be unavailable. Tone simply stays in its default state.
  }
};

export const clearJournalOwner = (): void => {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nothing to do: absence of the key is already the default.
  }
};

/** Tone for JournalBridgeCard, derived from the stored preference. */
export const journalBridgeVariant = (): "owner" | "discovery" =>
  isJournalOwner() ? "owner" : "discovery";
