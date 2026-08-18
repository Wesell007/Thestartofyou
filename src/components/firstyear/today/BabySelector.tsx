import type { BabyRecord } from "@/lib/firstYearJourney";
import { describeBabies } from "@/lib/firstYearCopy";

export const ALL_BABIES = "__all__";

type Props = {
  babies: BabyRecord[];
  value: string;
  onChange: (value: string) => void;
  /** Override when the chooser scopes a whole day rather than one note. */
  legend?: string;
  hint?: string;
};

const babyLabel = (baby: BabyRecord, index: number): string =>
  baby.name?.trim() ? baby.name.trim() : `Baby ${baby.birth_order ?? index + 1}`;

/**
 * Baby chooser for multiples. A real radio group, so keyboard and screen
 * reader users get arrow-key selection and a single tab stop. Never shown for
 * a single baby: that note simply saves to them.
 */
const BabySelector = ({ babies, value, onChange, legend, hint }: Props) => {
  if (babies.length < 2) return null;

  const options = [
    { value: ALL_BABIES, label: "All babies" },
    ...babies.map((baby, index) => ({ value: baby.id, label: babyLabel(baby, index) })),
  ];

  const legendText = legend ?? "Who is this note for?";

  return (
    <fieldset className="mb-5">
      <legend className="font-sans text-[13px] font-medium text-foreground/80 mb-2">
        {legendText}
      </legend>
      <p className="font-sans text-[12.5px] leading-[1.6] text-foreground/55 mb-3">
        {hint ??
          `Choose one, or save the same note for ${describeBabies(babies)} at once. You never have to write a note for each of them.`}
      </p>
      <div role="radiogroup" aria-label={legendText} className="flex flex-wrap gap-2">

        {options.map((option) => {
          const selected = option.value === value;
          return (
            <label
              key={option.value}
              className={`flex min-h-11 cursor-pointer items-center rounded-pill border px-5 py-2 font-sans text-[13px] transition-colors focus-within:ring-2 focus-within:ring-sage focus-within:ring-offset-2 focus-within:ring-offset-background ${
                selected
                  ? "border-sage bg-sage/12 text-foreground"
                  : "border-border/60 bg-parchment text-foreground/70 hover:border-foreground/25"
              }`}
            >
              <input
                type="radio"
                name="first-year-baby-target"
                className="sr-only"
                value={option.value}
                checked={selected}
                onChange={() => onChange(option.value)}
              />
              {option.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
};

export default BabySelector;
