/**
 * Pure copy resolvers for the First Year daily check-in save controls.
 *
 * Kept separate from the page so the wording rules can be tested without
 * rendering Supabase-backed state.
 */

export type SaveState = {
  /** A note already exists for this field, date and target. */
  hasSaved: boolean;
  /** A save is in flight. */
  saving: boolean;
  /** A save finished a moment ago and the quiet state is still showing. */
  justSaved: boolean;
};

/** Label for the per-field save button. */
export const saveButtonLabel = ({ hasSaved, saving, justSaved }: SaveState): string => {
  if (saving) return "Saving…";
  if (justSaved) return hasSaved ? "Updated" : "Saved";
  return hasSaved ? "Update" : "Save";
};

/** Join names the way a person would say them. */
export const joinNames = (names: string[]): string => {
  const clean = names.map((name) => name.trim()).filter(Boolean);
  if (clean.length === 0) return "";
  if (clean.length === 1) return clean[0];
  return `${clean.slice(0, -1).join(", ")} and ${clean[clean.length - 1]}`;
};

/**
 * Confirmation wording after a save. Names the babies when a note was written
 * for more than one of them.
 */
export const saveConfirmation = (options: {
  wasExisting: boolean;
  babyNames?: string[];
}): string => {
  const base = options.wasExisting ? "Updated" : "Saved";
  const names = options.babyNames ?? [];
  if (names.length > 1) return `${base} for ${joinNames(names)}`;
  return base;
};

/** Line shown above the baby fields so the current target is never a guess. */
export const writingForLabel = (options: {
  allBabies: boolean;
  babyName: string | null;
}): string =>
  options.allBabies ? "Writing for all babies" : `Writing for ${options.babyName ?? "your baby"}`;

/** One-line notice after the parent switches which baby they are writing for. */
export const targetChangeNotice = (options: {
  allBabies: boolean;
  babyName: string | null;
}): string =>
  options.allBabies
    ? "These fields now write the same note for all of your babies."
    : `These fields now show ${options.babyName ?? "your baby"}'s notes.`;
