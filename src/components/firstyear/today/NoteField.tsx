import { NOTE_MAX_LENGTH } from "@/lib/firstYearEntriesSchema";

/** Counter stays hidden until a note is genuinely long. */
const COUNTER_THRESHOLD = 1800;

type Props = {
  /** Stable id so an Edit action elsewhere on the page can focus this field. */
  fieldId: string;
  label: string;
  hint?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  /** A note is already saved for this field, date and target. */
  saved?: boolean;
};

/**
 * One optional note field. Always labelled, never required, never scored.
 */
const NoteField = ({
  fieldId,
  label,
  hint,
  placeholder,
  value,
  onChange,
  disabled,
  saved,
}: Props) => {
  const hintId = hint ? `${fieldId}-hint` : undefined;
  const showCounter = value.length > COUNTER_THRESHOLD;

  return (
    <div className="mb-5">
      <div className="flex flex-wrap items-center gap-2 mb-1.5">
        <label
          htmlFor={fieldId}
          className="block font-sans text-[13px] font-medium text-foreground/80"
        >
          {label}
        </label>
        {saved && (
          <span className="inline-flex items-center rounded-pill border border-sage/40 bg-sage/10 px-2 py-0.5 font-sans text-[11px] text-foreground/70">
            Saved
          </span>
        )}
      </div>
      {hint && (
        <p id={hintId} className="font-sans text-[12.5px] leading-[1.6] text-foreground/55 mb-2">
          {hint}
        </p>
      )}
      <textarea
        id={fieldId}
        rows={3}
        value={value}
        disabled={disabled}
        maxLength={NOTE_MAX_LENGTH}
        aria-describedby={hintId}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-[14px] border border-border/60 bg-background px-4 py-3 font-sans text-[14.5px] leading-[1.7] text-foreground placeholder:text-muted-foreground/50 resize-none transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:border-sage disabled:opacity-60"
      />
      {showCounter && (
        <p className="mt-1 font-sans text-[12px] text-foreground/55">
          {value.length} of {NOTE_MAX_LENGTH} characters
        </p>
      )}
    </div>
  );
};

export default NoteField;
