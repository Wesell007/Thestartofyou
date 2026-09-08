/**
 * AIC-JA2 — the one transparency line, shared by both answer surfaces.
 *
 * It belongs to a single completed assistant answer. It is never shown while
 * streaming, never on an aborted, failed or controlled answer, and it never
 * describes what the journal contained.
 */

export const JOURNAL_CONTEXT_NOTE =
  "Your recent journal was included as context.";

/** AIC-JA3 — the entry the person chose, and nothing else. */
export const JOURNAL_ENTRY_NOTE =
  "The journal entry you selected was included as context.";

/** AIC-JA3 — both, said once. */
export const JOURNAL_ENTRY_AND_CONTEXT_NOTE =
  "The journal entry you selected, and your recent journal, were included as context.";

export function CompanionJournalNote({
  used,
  entryUsed,
}: {
  used?: boolean;
  entryUsed?: boolean;
}) {
  if (!used && !entryUsed) return null;
  const note = entryUsed
    ? used
      ? JOURNAL_ENTRY_AND_CONTEXT_NOTE
      : JOURNAL_ENTRY_NOTE
    : JOURNAL_CONTEXT_NOTE;
  return (
    <p className="mt-3 font-sans text-[11px] font-light text-muted-foreground/70">
      {note}
    </p>
  );
}

export default CompanionJournalNote;
