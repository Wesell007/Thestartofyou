import { useEffect, useRef } from "react";
import type { BabyRecord } from "@/lib/firstYearJourney";
import MemoryScopeSelector from "./MemoryScopeSelector";
import type { ScopeValue } from "./memoryScope";
import MemoryPhotoField, { type MemoryPhotoFieldProps } from "./MemoryPhotoField";
import {
  MEMORY_NOTE_MAX_LENGTH,
  MEMORY_TITLE_MAX_LENGTH,
} from "@/lib/firstYearMemoriesSchema";
import {
  FY_SHEET_FIELD,
  FY_SHEET_FIELD_STYLE,
  FY_SHEET_LEGEND,
  FY_SHEET_LINK,
  FY_KEEPSAKE_PRIMARY_STYLE,
  FY_SHEET_PRIMARY,
  FY_SHEET_TEXTAREA,
} from "@/components/firstyear/journey/firstYearStyles";

const NOTE_COUNTER_THRESHOLD = 1800;

export type MemoryFormValues = {
  title: string;
  note: string;
  memoryDate: string;
  scopeValue: ScopeValue;
};

export type MemoryFormProps = {
  babies: BabyRecord[];
  values: MemoryFormValues;
  onChange: (values: MemoryFormValues) => void;
  onSubmit: () => void;
  onCancel: () => void;
  editing: boolean;
  saving: boolean;
  /** Latest date a moment can be kept: today, as a local calendar date. */
  maxDate: string;
  minDate?: string | null;
  /** Focus the note field once, when a moment is copied forward or edited. */
  focusSignal?: string | null;
  /** Optional single photo. Omitted entirely when photos are not offered. */
  photo?: MemoryPhotoFieldProps;
};

/**
 * The words, and everything optional around them. Nothing here is measured or
 * compared: it is only what a parent wanted to keep.
 */
const MemoryForm = ({
  babies,
  values,
  onChange,
  onSubmit,
  onCancel,
  editing,
  saving,
  maxDate,
  minDate,
  focusSignal,
  photo,
}: MemoryFormProps) => {
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
      <MemoryScopeSelector
        babies={babies}
        value={values.scopeValue}
        onChange={(scopeValue) => set({ scopeValue })}
      />

      <div className="mb-5">
        <label htmlFor="memory-note" className={`block ${FY_SHEET_LEGEND}`}>
          The moment
        </label>
        <textarea
          id="memory-note"
          ref={noteRef}
          rows={5}
          value={values.note}
          disabled={saving}
          required
          maxLength={MEMORY_NOTE_MAX_LENGTH}
          aria-describedby="memory-note-hint"
          placeholder="She fell asleep on my shoulder halfway through a song…"
          onChange={(event) => set({ note: event.target.value })}
          className={FY_SHEET_TEXTAREA}
          style={FY_SHEET_FIELD_STYLE}
        />
        <p
          id="memory-note-hint"
          className="mt-1.5 font-sans text-[12.5px] leading-[1.6] text-[hsl(var(--stage-firstyear-text-soft))]"
        >
          Only you will ever see this.
        </p>
        {showCounter && (
          <p className="mt-1 font-sans text-[12px] text-[hsl(var(--stage-firstyear-text-soft))]">
            {values.note.length} of {MEMORY_NOTE_MAX_LENGTH} characters
          </p>
        )}
      </div>

      <div className="mb-5">
        <label htmlFor="memory-title" className={`block ${FY_SHEET_LEGEND}`}>
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
          className={`${FY_SHEET_FIELD} w-full`}
          style={FY_SHEET_FIELD_STYLE}
        />
      </div>

      <div className="mb-5">
        <label htmlFor="memory-date" className={`block ${FY_SHEET_LEGEND}`}>
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
          className={`${FY_SHEET_FIELD} max-w-[220px]`}
          style={FY_SHEET_FIELD_STYLE}
        />
      </div>

      {photo && <MemoryPhotoField {...photo} disabled={saving || photo.disabled} />}

      <div className="flex flex-col items-center gap-2 pt-2">
        <button
          type="submit"
          disabled={saving}
          className={FY_SHEET_PRIMARY}
          style={FY_KEEPSAKE_PRIMARY_STYLE}
        >
          {saving ? "Saving…" : editing ? "Save changes" : "Keep this memory"}
        </button>
        <button type="button" onClick={onCancel} disabled={saving} className={FY_SHEET_LINK}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default MemoryForm;
