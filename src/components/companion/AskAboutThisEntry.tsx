/**
 * AIC-JA3 — the one affordance for asking about a single journal entry.
 *
 * Pressing it opens the shared companion panel carrying a typed reference to
 * that entry: version, source and id, and nothing else. It sends no message,
 * calls no model, creates no second runtime, and never carries the person's
 * own words. The reference is used for the next question only, and the server
 * re-authorises it before anything is read.
 *
 * It renders nothing unless the journal feature gate is on and a real entry id
 * exists, so it can never be attached to a record it cannot identify.
 */

import { BookOpen } from "lucide-react";
import {
  buildJournalEntryRef,
  JOURNAL_ENTRY_SOURCE_LABEL,
  type JournalEntrySource,
} from "@/lib/companion/journal/journalEntryRef";
import { isCompanionJournalUiEnabled } from "@/lib/companion/journal/journalFlags";
import { useCompanionOptional } from "./useCompanionOptional";

export interface AskAboutThisEntryProps {
  source: JournalEntrySource;
  /** The authoritative stored row id. Never derived from text, week or date. */
  entryId: string | null | undefined;
  /** Visible copy. Describes the action, never the entry's contents. */
  label?: string;
  /** Presentation-only starter chips. */
  suggestions?: string[];
  className?: string;
  buttonClassName?: string;
}

const BASE_CLASS =
  "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-pill px-4 py-2.5 font-sans text-[13px] font-medium border border-border/60 text-foreground transition-colors hover:bg-parchment/60";

const AskAboutThisEntry = ({
  source,
  entryId,
  label = "Ask about this entry",
  suggestions,
  className,
  buttonClassName,
}: AskAboutThisEntryProps) => {
  const companion = useCompanionOptional();
  if (!isCompanionJournalUiEnabled()) return null;

  const ref = buildJournalEntryRef(source, entryId);
  if (!ref || !companion) return null;

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() =>
          companion.openWithJournalEntry({
            ref,
            label: JOURNAL_ENTRY_SOURCE_LABEL[source],
            ...(suggestions ? { suggestions } : {}),
          })
        }
        className={buttonClassName ?? BASE_CLASS}
      >
        <BookOpen size={15} aria-hidden="true" />
        {label}
      </button>
    </div>
  );
};

export default AskAboutThisEntry;
