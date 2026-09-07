/**
 * AIC-JA2 — the one transparency line, shared by both answer surfaces.
 *
 * It belongs to a single completed assistant answer. It is never shown while
 * streaming, never on an aborted, failed or controlled answer, and it never
 * describes what the journal contained.
 */

export const JOURNAL_CONTEXT_NOTE =
  "Your recent journal was included as context.";

export function CompanionJournalNote({ used }: { used?: boolean }) {
  if (!used) return null;
  return (
    <p className="mt-3 font-sans text-[11px] font-light text-muted-foreground/70">
      {JOURNAL_CONTEXT_NOTE}
    </p>
  );
}

export default CompanionJournalNote;
