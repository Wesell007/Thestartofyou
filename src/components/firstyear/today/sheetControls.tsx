import { CARE_NOTE_MAX_LENGTH } from "@/lib/firstYearCareEventsSchema";
import {
  FY_CTA,
  FY_FIELD_FOCUS_RING,
  FY_FOCUS_RING,
} from "@/components/firstyear/journey/firstYearStyles";

/** Shared pieces used by each logging sheet, so every step looks the same. */

export const CHIP_BASE =
  "flex min-h-11 cursor-pointer items-center rounded-pill border px-4 py-2 font-sans text-[13px] transition-colors focus-within:ring-2 focus-within:ring-sage focus-within:ring-offset-2 focus-within:ring-offset-background";

export const CHIP_SELECTED = "border-sage bg-sage/12 text-foreground";
export const CHIP_IDLE =
  "border-border/60 bg-parchment text-foreground/70 hover:border-foreground/25";

export const SHEET_FIELD_CLASS = `min-h-11 rounded-[14px] border border-border/60 bg-background px-4 py-2 font-sans text-[14.5px] text-foreground ${FY_FIELD_FOCUS_RING}`;

export const SHEET_LINK_CLASS = `${FY_FOCUS_RING} inline-flex min-h-11 items-center rounded-sm font-sans text-[13.5px] text-foreground/65 underline underline-offset-4 hover:text-foreground`;

export const SHEET_PRIMARY_CLASS = `${FY_CTA} disabled:opacity-60`;

export const SHEET_PRIMARY_STYLE = {
  backgroundColor: "hsl(var(--stage-firstyear-accent))",
  color: "hsl(var(--background))",
} as const;

export const SHEET_SECONDARY_CLASS = `${FY_FOCUS_RING} inline-flex min-h-11 items-center rounded-pill border border-border/60 bg-parchment px-5 py-2 font-sans text-[13.5px] text-foreground/85 transition-colors hover:border-foreground/25 disabled:opacity-60`;

type ChipGroupProps<T extends string> = {
  legend: string;
  name: string;
  options: { value: T; label: string }[];
  value: T | null;
  onChange: (value: T | null) => void;
  allowClear?: boolean;
};

export const ChipGroup = <T extends string>({
  legend,
  name,
  options,
  value,
  onChange,
  allowClear,
}: ChipGroupProps<T>) => (
  <fieldset className="mb-4">
    <legend className="font-sans text-[13px] font-medium text-foreground/80 mb-2">{legend}</legend>
    <div role="radiogroup" aria-label={legend} className="flex flex-wrap gap-2">
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <label
            key={option.value}
            className={`${CHIP_BASE} ${selected ? CHIP_SELECTED : CHIP_IDLE}`}
          >
            <input
              type="radio"
              name={name}
              className="sr-only"
              checked={selected}
              onChange={() => onChange(allowClear && selected ? null : option.value)}
              onClick={() => {
                if (allowClear && selected) onChange(null);
              }}
            />
            {option.label}
          </label>
        );
      })}
    </div>
  </fieldset>
);

type TimeFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export const TimeField = ({ id, label, value, onChange }: TimeFieldProps) => (
  <div>
    <label
      htmlFor={id}
      className="block font-sans text-[13px] font-medium text-foreground/80 mb-1.5"
    >
      {label}
    </label>
    <input
      id={id}
      type="time"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={SHEET_FIELD_CLASS}
    />
  </div>
);

type NoteAreaProps = {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

export const NoteArea = ({ id, label, placeholder, value, onChange }: NoteAreaProps) => (
  <div className="mb-5">
    <label
      htmlFor={id}
      className="block font-sans text-[13px] font-medium text-foreground/80 mb-1.5"
    >
      {label}
    </label>
    <textarea
      id={id}
      rows={3}
      value={value}
      maxLength={CARE_NOTE_MAX_LENGTH}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className={`w-full resize-none rounded-[14px] border border-border/60 bg-background px-4 py-3 font-sans text-[14.5px] leading-[1.7] text-foreground placeholder:text-muted-foreground/50 ${FY_FIELD_FOCUS_RING}`}
    />
  </div>
);

type SheetActionsProps = {
  saving: boolean;
  editing: boolean;
  onCancel: () => void;
  extra?: React.ReactNode;
};

export const SheetActions = ({ saving, editing, onCancel, extra }: SheetActionsProps) => (
  <div className="flex flex-wrap items-center gap-3">
    <button
      type="submit"
      disabled={saving}
      className={SHEET_PRIMARY_CLASS}
      style={SHEET_PRIMARY_STYLE}
    >
      {saving ? "Saving…" : editing ? "Save changes" : "Save"}
    </button>
    <button type="button" onClick={onCancel} className={SHEET_LINK_CLASS}>
      Cancel
    </button>
    {extra}
  </div>
);
