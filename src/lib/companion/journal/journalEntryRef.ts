/**
 * AIC-JA3 — the client-side mirror of the journal entry reference.
 *
 * Deliberately minimal, and construction-only. The authoritative strict parser
 * lives in `supabase/functions/_shared/journalEntryRefContract.ts` and
 * re-validates everything, so nothing here can widen what is accepted. A
 * parity test proves the two agree on the version, the exact source list and
 * the id requirement.
 *
 * There is no text field, no user id, no baby id and no journey id, by design.
 */

export const JOURNAL_ENTRY_SOURCES = [
  "pregnancy_reflection",
  "first_year_entry",
  "first_year_memory",
  "ttc_note",
] as const;

export type JournalEntrySource = (typeof JOURNAL_ENTRY_SOURCES)[number];

export interface JournalEntryRef {
  version: 1;
  source: JournalEntrySource;
  id: string;
}

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Build a reference, or `null` when the caller has nothing valid to send. */
export const buildJournalEntryRef = (
  source: JournalEntrySource,
  id: string | null | undefined,
): JournalEntryRef | null => {
  const trimmed = (id ?? "").trim();
  if (!trimmed || !UUID_PATTERN.test(trimmed)) return null;
  if (!(JOURNAL_ENTRY_SOURCES as readonly string[]).includes(source)) return null;
  return { version: 1, source, id: trimmed };
};

/** Generic, non-identifying label for the pending-context indicator. */
export const JOURNAL_ENTRY_SOURCE_LABEL: Record<JournalEntrySource, string> = {
  pregnancy_reflection: "Pregnancy reflection",
  first_year_entry: "First Year note",
  first_year_memory: "Memory",
  ttc_note: "TTC note",
};

/** Which journey a selection belongs to, for clearing a stale hand-off. */
export const JOURNAL_ENTRY_SOURCE_JOURNEY: Record<
  JournalEntrySource,
  "pregnancy" | "first-year" | "trying-to-conceive"
> = {
  pregnancy_reflection: "pregnancy",
  first_year_entry: "first-year",
  first_year_memory: "first-year",
  ttc_note: "trying-to-conceive",
};
