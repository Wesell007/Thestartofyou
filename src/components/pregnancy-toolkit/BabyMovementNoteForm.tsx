import { useEffect, useState } from "react";
import {
  BabyMovementDraft,
  PATTERN_LABEL_SUGGESTIONS,
  emptyDraft,
  fromDatetimeLocalInput,
  isDraftSaveable,
  toDatetimeLocalInput,
} from "@/lib/babyMovementSchema";

const accent = "hsl(var(--stage-pregnancy-accent))";
const softBorder = "hsl(var(--stage-pregnancy-accent) / 0.16)";
const chipBg = "hsl(var(--stage-pregnancy) / 0.55)";

interface Props {
  initial?: BabyMovementDraft;
  saving?: boolean;
  submitLabel?: string;
  onSubmit: (draft: BabyMovementDraft) => Promise<unknown> | void;
  onCancel?: () => void;
}

const BabyMovementNoteForm = ({
  initial,
  saving = false,
  submitLabel = "Save note",
  onSubmit,
  onCancel,
}: Props) => {
  const [draft, setDraft] = useState<BabyMovementDraft>(initial ?? emptyDraft());

  useEffect(() => {
    if (initial) setDraft(initial);
  }, [initial]);

  const canSubmit = !saving && isDraftSaveable(draft);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    await onSubmit(draft);
    if (!initial) setDraft(emptyDraft());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[20px] keepsake-surface px-6 py-6 flex flex-col gap-5"
      style={{ borderColor: softBorder }}
    >
      <div className="flex flex-col gap-2">
        <label
          htmlFor="noted-at"
          className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase"
          style={{ color: accent }}
        >
          Date and time
        </label>
        <input
          id="noted-at"
          type="datetime-local"
          value={toDatetimeLocalInput(draft.noted_at)}
          onChange={(e) =>
            setDraft((d) => ({
              ...d,
              noted_at: fromDatetimeLocalInput(e.target.value) ?? new Date().toISOString(),
            }))
          }
          className="w-full rounded-lg border bg-background/60 px-3 py-2 font-sans text-[14px] text-foreground/85 focus:outline-none focus:ring-2 focus:ring-offset-0"
          style={{ borderColor: softBorder }}
        />
      </div>

      <div className="flex flex-col gap-2">
        <span
          className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase"
          style={{ color: accent }}
        >
          Pattern label (optional)
        </span>
        <div className="flex flex-wrap gap-2">
          {PATTERN_LABEL_SUGGESTIONS.map((label) => {
            const active = draft.pattern_label === label;
            return (
              <button
                key={label}
                type="button"
                onClick={() =>
                  setDraft((d) => ({
                    ...d,
                    pattern_label: active ? null : label,
                  }))
                }
                className="rounded-full px-3.5 py-1.5 font-sans text-[12px] transition"
                style={{
                  background: active ? chipBg : "transparent",
                  color: active ? accent : "hsl(var(--foreground) / 0.7)",
                  border: `1px solid ${softBorder}`,
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="notes"
          className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase"
          style={{ color: accent }}
        >
          Notes (optional)
        </label>
        <textarea
          id="notes"
          rows={4}
          maxLength={2000}
          placeholder="A short note about what you noticed."
          value={draft.notes ?? ""}
          onChange={(e) =>
            setDraft((d) => ({ ...d, notes: e.target.value }))
          }
          className="w-full rounded-lg border bg-background/60 px-3 py-2 font-sans text-[14px] text-foreground/85 focus:outline-none focus:ring-2"
          style={{ borderColor: softBorder }}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-end">
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full px-4 py-2 font-sans text-[11.5px] font-medium tracking-[0.22em] uppercase text-foreground/60"
          >
            Cancel
          </button>
        ) : null}
        <button
          type="submit"
          disabled={!canSubmit}
          className="rounded-full px-5 py-2 font-sans text-[11.5px] font-medium tracking-[0.22em] uppercase transition-shadow disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            background: "hsl(var(--stage-pregnancy) / 0.7)",
            color: accent,
            border: `1px solid ${softBorder}`,
          }}
        >
          {saving ? "Saving…" : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default BabyMovementNoteForm;
