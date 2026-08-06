import { useId } from "react";
import { NOTE_MAX_LENGTH } from "@/lib/firstYearEntriesSchema";

type Props = {
  label: string;
  hint?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

/**
 * One optional note field. Always labelled, never required, never scored.
 */
const NoteField = ({ label, hint, placeholder, value, onChange, disabled }: Props) => {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;

  return (
    <div className="mb-5">
      <label
        htmlFor={id}
        className="block font-sans text-[13px] font-medium text-foreground/80 mb-1.5"
      >
        {label}
      </label>
      {hint && (
        <p id={hintId} className="font-sans text-[12.5px] leading-[1.6] text-foreground/55 mb-2">
          {hint}
        </p>
      )}
      <textarea
        id={id}
        rows={3}
        value={value}
        disabled={disabled}
        maxLength={NOTE_MAX_LENGTH}
        aria-describedby={hintId}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-[14px] border border-border/60 bg-background px-4 py-3 font-sans text-[14.5px] leading-[1.7] text-foreground placeholder:text-muted-foreground/50 resize-none transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:border-sage disabled:opacity-60"
      />
    </div>
  );
};

export default NoteField;
