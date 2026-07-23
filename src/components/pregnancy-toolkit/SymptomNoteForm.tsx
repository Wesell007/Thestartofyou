import { useEffect, useState } from "react";
import {
  PERSONAL_NOTE_LABEL,
  PERSONAL_NOTE_LEVELS,
  PregnancySymptomNoteDraft,
  SYMPTOM_LABEL_SUGGESTIONS,
  emptyDraft,
  fromDatetimeLocalInput,
  isDraftSaveable,
  toDatetimeLocalInput,
} from "@/lib/pregnancySymptomNotesSchema";

const accent = "hsl(var(--stage-pregnancy-accent))";
const softBorder = "hsl(var(--stage-pregnancy-accent) / 0.16)";
const chipBg = "hsl(var(--stage-pregnancy) / 0.55)";

interface Props {
  initial?: PregnancySymptomNoteDraft;
  saving?: boolean;
  submitLabel?: string;
  onSubmit: (draft: PregnancySymptomNoteDraft) => Promise<unknown> | void;
  onCancel?: () => void;
}

const SymptomNoteForm = ({
  initial,
  saving = false,
  submitLabel = "Save note",
  onSubmit,
  onCancel,
}: Props) => {
  const [draft, setDraft] = useState<PregnancySymptomNoteDraft>(
    initial ?? emptyDraft(),
  );
  const initialIsCustom =
    initial != null &&
    initial.symptom_label.length > 0 &&
    !SYMPTOM_LABEL_SUGGESTIONS.includes(initial.symptom_label);
  const [customLabel, setCustomLabel] = useState(
    initialIsCustom ? initial!.symptom_label : "",
  );
  const [otherSelected, setOtherSelected] = useState(initialIsCustom);

  useEffect(() => {
    if (initial) {
      setDraft(initial);
      const isCustom =
        initial.symptom_label.length > 0 &&
        !SYMPTOM_LABEL_SUGGESTIONS.includes(initial.symptom_label);
      setCustomLabel(isCustom ? initial.symptom_label : "");
      setOtherSelected(isCustom);
    }
  }, [initial]);

  const effectiveLabel = otherSelected
    ? customLabel.trim()
    : draft.symptom_label;
  const canSubmit =
    !saving && isDraftSaveable({ ...draft, symptom_label: effectiveLabel });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    await onSubmit({ ...draft, symptom_label: effectiveLabel });
    if (!initial) {
      setDraft(emptyDraft());
      setCustomLabel("");
      setOtherSelected(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[20px] keepsake-surface px-6 py-6 flex flex-col gap-5"
      style={{ borderColor: softBorder }}
    >
      <div className="flex flex-col gap-2">
        <label
          htmlFor="sn-noted-at"
          className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase"
          style={{ color: accent }}
        >
          Date and time
        </label>
        <input
          id="sn-noted-at"
          type="datetime-local"
          value={toDatetimeLocalInput(draft.noted_at)}
          onChange={(e) =>
            setDraft((d) => ({
              ...d,
              noted_at:
                fromDatetimeLocalInput(e.target.value) ??
                new Date().toISOString(),
            }))
          }
          className="w-full rounded-lg border bg-background/60 px-3 py-2 font-sans text-[14px] text-foreground/85 focus:outline-none focus:ring-2"
          style={{ borderColor: softBorder }}
        />
      </div>

      <div className="flex flex-col gap-2">
        <span
          className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase"
          style={{ color: accent }}
        >
          Symptom label
        </span>
        <div className="flex flex-wrap gap-2">
          {SYMPTOM_LABEL_SUGGESTIONS.map((label) => {
            const isOther = label === "Other";
            const active = isOther
              ? otherSelected
              : !otherSelected && draft.symptom_label === label;
            return (
              <button
                key={label}
                type="button"
                onClick={() => {
                  if (isOther) {
                    setOtherSelected(true);
                    setDraft((d) => ({ ...d, symptom_label: "" }));
                  } else {
                    setOtherSelected(false);
                    setCustomLabel("");
                    setDraft((d) => ({ ...d, symptom_label: label }));
                  }
                }}
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
        {otherSelected ? (
          <input
            type="text"
            maxLength={120}
            placeholder="Type your own label"
            value={customLabel}
            onChange={(e) => setCustomLabel(e.target.value)}
            className="mt-1 w-full rounded-lg border bg-background/60 px-3 py-2 font-sans text-[14px] text-foreground/85 focus:outline-none focus:ring-2"
            style={{ borderColor: softBorder }}
          />
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <span
          className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase"
          style={{ color: accent }}
        >
          {PERSONAL_NOTE_LABEL}
        </span>
        <div className="flex flex-wrap gap-2">
          {PERSONAL_NOTE_LEVELS.map((lvl) => {
            const active = draft.personal_severity === lvl.value;
            return (
              <button
                key={lvl.value}
                type="button"
                onClick={() =>
                  setDraft((d) => ({
                    ...d,
                    personal_severity: active ? null : lvl.value,
                  }))
                }
                className="rounded-full px-3.5 py-1.5 font-sans text-[12px] transition"
                style={{
                  background: active ? chipBg : "transparent",
                  color: active ? accent : "hsl(var(--foreground) / 0.7)",
                  border: `1px solid ${softBorder}`,
                }}
              >
                {lvl.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="sn-notes"
          className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase"
          style={{ color: accent }}
        >
          Notes (optional)
        </label>
        <textarea
          id="sn-notes"
          rows={4}
          maxLength={2000}
          placeholder="A short note about what you noticed."
          value={draft.notes ?? ""}
          onChange={(e) => setDraft((d) => ({ ...d, notes: e.target.value }))}
          className="w-full rounded-lg border bg-background/60 px-3 py-2 font-sans text-[14px] text-foreground/85 focus:outline-none focus:ring-2"
          style={{ borderColor: softBorder }}
        />
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={draft.mention_at_appointment}
          onChange={(e) =>
            setDraft((d) => ({
              ...d,
              mention_at_appointment: e.target.checked,
            }))
          }
          className="mt-1 h-4 w-4"
        />
        <span className="font-serif text-[14.5px] text-foreground/80 leading-[1.5]">
          Mention at my next appointment
        </span>
      </label>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="sn-followup"
          className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase"
          style={{ color: accent }}
        >
          Follow-up note (optional)
        </label>
        <textarea
          id="sn-followup"
          rows={2}
          maxLength={1000}
          placeholder="Anything you want to remember about this later."
          value={draft.follow_up ?? ""}
          onChange={(e) =>
            setDraft((d) => ({ ...d, follow_up: e.target.value }))
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

export default SymptomNoteForm;
