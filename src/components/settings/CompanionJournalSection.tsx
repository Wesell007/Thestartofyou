/**
 * AIC-JA2 — "Journal-aware companion".
 *
 * One explicit permission, off by default, that someone can turn on or off at
 * any time. It shows no journal content, and it never claims the permission is
 * on when the stored value is not: a failed save reverts to the stored state
 * and says so.
 *
 * Hidden entirely unless the client journal flag is on. The server flag
 * (`AI_JOURNAL_CONTEXT_ENABLED`) separately decides whether anything can reach
 * the companion at all.
 */

import { useCallback, useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { isCompanionJournalUiEnabled } from "@/lib/companion/journal/journalFlags";
import {
  readJournalPermission,
  writeJournalPermission,
} from "@/lib/companion/journal/journalPermission";

export const JOURNAL_SECTION_HEADING = "Journal-aware companion";
export const JOURNAL_TOGGLE_LABEL = "Use my journal to personalise the companion";
export const JOURNAL_SUPPORTING_COPY =
  "Allow the companion to use a small amount of your recent journal text as context when answering.";
export const JOURNAL_REVOCATION_COPY =
  "You can turn this off at any time. Future answers will stop using your journal. Previous answers are not rewritten.";
export const JOURNAL_SAVE_ERROR_COPY =
  "That could not be saved. Your setting has not changed. Please try again.";

export default function CompanionJournalSection() {
  const enabledUi = isCompanionJournalUiEnabled();
  const [permission, setPermission] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const load = useCallback(async () => {
    try {
      setLoadError(false);
      setPermission((await readJournalPermission()) ?? false);
    } catch {
      setLoadError(true);
      setPermission(false);
    }
  }, []);

  useEffect(() => {
    if (!enabledUi) return;
    void load();
  }, [enabledUi, load]);

  if (!enabledUi) return null;

  const toggle = async (next: boolean) => {
    if (busy) return;
    const previous = permission ?? false;
    setBusy(true);
    setSaveError(false);
    setPermission(next);
    try {
      await writeJournalPermission(next);
    } catch {
      // Never leave the switch showing a permission the server does not hold.
      setPermission(previous);
      setSaveError(true);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section aria-labelledby="companion-journal-heading" className="mt-10">
      <h2
        id="companion-journal-heading"
        className="font-serif text-[1.15rem] tracking-[-0.01em] text-foreground"
      >
        {JOURNAL_SECTION_HEADING}
      </h2>
      <p className="mt-2 max-w-[60ch] font-sans text-[13px] font-light leading-relaxed text-muted-foreground">
        {JOURNAL_SUPPORTING_COPY}
      </p>

      <div className="mt-4 flex items-start gap-3">
        <Switch
          id="companion-journal-toggle"
          checked={permission ?? false}
          disabled={busy || permission === null}
          onCheckedChange={(next) => void toggle(next)}
          aria-describedby="companion-journal-revocation"
        />
        <label
          htmlFor="companion-journal-toggle"
          className="font-sans text-[14px] leading-relaxed text-foreground"
        >
          {JOURNAL_TOGGLE_LABEL}
        </label>
      </div>

      <p
        id="companion-journal-revocation"
        className="mt-3 max-w-[60ch] font-sans text-[12px] font-light leading-relaxed text-muted-foreground"
      >
        {JOURNAL_REVOCATION_COPY}
      </p>

      {saveError ? (
        <p role="status" className="mt-3 font-sans text-[12px] text-destructive">
          {JOURNAL_SAVE_ERROR_COPY}
        </p>
      ) : null}
      {loadError ? (
        <p role="status" className="mt-3 font-sans text-[12px] text-muted-foreground">
          This setting could not be loaded just now.
        </p>
      ) : null}
    </section>
  );
}
