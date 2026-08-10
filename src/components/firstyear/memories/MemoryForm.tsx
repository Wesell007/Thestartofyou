import { useEffect, useRef } from "react";
import type { BabyRecord } from "@/lib/firstYearJourney";
import MemoryScopeSelector, { type ScopeValue } from "./MemoryScopeSelector";
import {
  MEMORY_NOTE_MAX_LENGTH,
  MEMORY_TITLE_MAX_LENGTH,
} from "@/lib/firstYearMemoriesSchema";

const NOTE_COUNTER_THRESHOLD = 1800;

const FIELD_CLASS =
  "w-full rounded-[14px] border border-border/60 bg-background px-4 py-3 font-sans text-[14.5px] leading-[1.7] text-foreground placeholder:text-muted-foreground/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:border-sage disabled:opacity-60";

export type MemoryFormValues = {
  title: string;
  note: string;
  memoryDate: string;
  scopeValue: ScopeValue;
};

type Props = {
  babies: BabyRecord[];
  values: MemoryFormValues;
  onChange: (values: MemoryFormValues) => void;
  onSubmit: () => void;
  onCancelEdit?: () => void;
  editing: boolean;
  saving: boolean;
  /** Latest date a moment can be kept: today, as a local calendar date. */
  maxDate: string;
  minDate?: string | null;
  /** Focus the note field once, when a moment is copied forward or edited. */
  focusSignal?: string | null;
};

/**
 * The "Save a moment" form. Everything except the note is optional, and
 * nothing here is measured, scored or compared.
 */
const MemoryForm = ({
  babies,
  values,
  onChange,
  onSubmit,
  onCancelEdit,
  editing,
  saving,
  maxDate,
  minDate,
  focusSignal,
}: Props) => {
  const noteRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (!focusSignal) return;
    const element = noteRef.current;
    if (!element) return;
    element.scrollIntoView({ behavior: "smooth", block: "center" });
    element.focus({ preventScroll: true });
  }, [focusSignal]);

  const set = (patch: Partial<MemoryFormValues>) => onChange({ ...values, ...patch });
  const showCounter = values.note.length > NOTE_COUNTER_THRESHOLD;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <h2 className="font-serif text-[1.4rem] leading-[1.25] text-foreground/90 mb-2">
        {editing ? "Edit this memory" : "Save a moment"}
      </h2>
      <p className="font-sans text-[13px] leading-[1.65] text-foreground/60 mb-6 max-w-[52ch]">
        A sentence is plenty. Write it however you would say it out loud.
      </p>

      <MemoryScopeSelector
        babies={babies}
        value={values.scopeValue}
        onChange={(scopeValue) => set({ scopeValue })}
      />

      <div className="mb-5">
        <label
          htmlFor="memory-title"
          className="block font-sans text-[13px] font-medium text-foreground/80 mb-1.5"
        >
          Title (optional)
        </label>
        <input
          id="memory-title"
          type="text"
          value={values.title}
          disabled={saving}
          maxLength={MEMORY_TITLE_MAX_LENGTH}
          placeholder="First proper giggle"
          onChange={(event) => set({ title: event.target.value })}
          className={FIELD_CLASS}
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="memory-note"
          className="block font-sans text-[13px] font-medium text-foreground/80 mb-1.5"
        >
          The moment
        </label>
        <textarea
          id="memory-note"
          ref={noteRef}
          rows={4}
          value={values.note}
          disabled={saving}
          required
          maxLength={MEMORY_NOTE_MAX_LENGTH}
          aria-describedby="memory-note-hint"
          placeholder="She fell asleep on my shoulder halfway through a song…"
          onChange={(event) => set({ note: event.target.value })}
          className={`${FIELD_CLASS} resize-none`}
        />
        <p id="memory-note-hint" className="mt-1.5 font-sans text-[12.5px] leading-[1.6] text-foreground/55">
          Only you will ever see this.
        </p>
        {showCounter && (
          <p className="mt-1 font-sans text-[12px] text-foreground/55">
            {values.note.length} of {MEMORY_NOTE_MAX_LENGTH} characters
          </p>
        )}
      </div>

      <div className="mb-6">
        <label
          htmlFor="memory-date"
          className="block font-sans text-[13px] font-medium text-foreground/80 mb-1.5"
        >
          When it happened
        </label>
        <input
          id="memory-date"
          type="date"
          value={values.memoryDate}
          disabled={saving}
          max={maxDate}
          min={minDate ?? undefined}
          onChange={(event) => set({ memoryDate: event.target.value })}
          className={`${FIELD_CLASS} max-w-[220px]`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex min-h-11 items-center rounded-pill border border-border/60 bg-parchment px-5 py-2 font-sans text-[13px] text-foreground/85 transition-colors hover:border-foreground/25 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {saving ? "Saving…" : editing ? "Update this memory" : "Save this memory"}
        </button>
        {editing && onCancelEdit && (
          <button
            type="button"
            onClick={onCancelEdit}
            disabled={saving}
            className="inline-flex min-h-11 items-center font-sans text-[12.5px] text-foreground/60 underline underline-offset-4 hover:text-foreground/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default MemoryForm;
