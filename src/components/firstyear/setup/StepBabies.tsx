import { forwardRef } from "react";
import {
  BABY_COUNT_OPTIONS,
  BABY_LIMIT_NOTE,
  BABY_ROW_LABELS,
  MORE_THAN_THREE,
  MORE_THAN_THREE_LABEL,
} from "./firstYearSetupConstants";

import {
  MAX_BABY_NAME_LENGTH,
  type FirstYearSetupDraft,
  type FirstYearSetupErrors,
} from "./firstYearSetupSchema";

type Props = {
  draft: FirstYearSetupDraft;
  errors: FirstYearSetupErrors;
  onCountChange: (count: number) => void;
  onNameChange: (index: number, name: string) => void;
  onDateChange: (value: string) => void;
  onBack: () => void;
  onContinue: () => void;
};

const fieldClass =
  "w-full rounded-[14px] border border-border/60 bg-parchment px-4 py-3 font-sans text-[15px] text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-sage focus:ring-offset-2 focus:ring-offset-transparent";

/** Step 2. Baby count, one shared date of birth, optional names. */
const StepBabies = forwardRef<HTMLHeadingElement, Props>(
  ({ draft, errors, onCountChange, onNameChange, onDateChange, onBack, onContinue }, ref) => (
    <div>
      <h2
        ref={ref}
        tabIndex={-1}
        className="font-serif text-[1.7rem] sm:text-[2rem] leading-[1.15] mb-4 outline-none"
        style={{ color: "hsl(var(--stage-firstyear-deep))" }}
      >
        Who has arrived?
      </h2>
      <p className="font-serif text-[15px] leading-[1.7] text-foreground/80 max-w-[52ch] mb-8">
        Only the basics. You can add more later, and names are entirely optional.
      </p>

      <fieldset className="mb-8">
        <legend className="font-sans text-[13px] font-medium text-foreground/85 mb-3">
          How many babies?
        </legend>
        <div
          role="radiogroup"
          aria-label="How many babies?"
          aria-describedby={errors.babyCount ? "baby-count-error" : undefined}
          className="flex flex-col gap-2"
        >
          {[
            ...BABY_COUNT_OPTIONS.map((option) => ({
              key: String(option.value),
              label: option.label,
              selected: draft.babyCount === option.value,
              onSelect: () => onCountChange(option.value),
            })),
            {
              key: MORE_THAN_THREE,
              label: MORE_THAN_THREE_LABEL,
              selected: draft.babyCount > 3,
              onSelect: () => onCountChange(4),
            },
          ].map((option) => (
            <label
              key={option.key}
              className="flex items-center gap-3 rounded-[14px] border px-4 py-3 cursor-pointer transition-colors"
              style={{
                borderColor: option.selected
                  ? "hsl(var(--stage-firstyear-accent) / 0.55)"
                  : "hsl(var(--border) / 0.6)",
                backgroundColor: option.selected
                  ? "hsl(var(--stage-firstyear-soft) / 0.5)"
                  : "transparent",
              }}
            >
              <input
                type="radio"
                name="baby-count"
                value={option.key}
                checked={option.selected}
                onChange={option.onSelect}
                className="h-4 w-4 accent-terracotta"
              />
              <span className="font-sans text-[15px] text-foreground/85">{option.label}</span>
            </label>
          ))}
        </div>

        {draft.babyCount > 3 ? (
          <div className="mt-4">
            <label
              htmlFor="baby-count-more"
              className="block font-sans text-[13px] font-medium text-foreground/85 mb-2"
            >
              How many in total?
            </label>
            <select
              id="baby-count-more"
              value={draft.babyCount}
              onChange={(event) => onCountChange(Number(event.target.value))}
              className="w-full max-w-[220px] rounded-[14px] border border-border/60 bg-parchment px-4 py-3 font-sans text-[15px] text-foreground focus:outline-none focus:ring-2 focus:ring-sage focus:ring-offset-2 focus:ring-offset-transparent"
            >
              <option value={4}>Four babies</option>
            </select>
            <p className="mt-2 font-serif text-[14px] leading-[1.6] text-foreground/70 max-w-[52ch]">
              {BABY_LIMIT_NOTE}
            </p>
          </div>
        ) : null}

        {errors.babyCount ? (
          <p id="baby-count-error" role="alert" className="mt-2 font-sans text-[13px] text-destructive">
            {errors.babyCount}
          </p>
        ) : null}
        <button
          type="button"
          onClick={() => onCountChange(1)}
          className="mt-3 font-sans text-[13px] text-foreground/65 underline underline-offset-4 decoration-foreground/25 hover:text-foreground"
        >
          I'll set up one baby for now
        </button>
      </fieldset>


      <div className="mb-8">
        <label
          htmlFor="baby-dob"
          className="block font-sans text-[13px] font-medium text-foreground/85 mb-2"
        >
          Date of birth
        </label>
        <input
          id="baby-dob"
          type="date"
          value={draft.dateOfBirth}
          onChange={(event) => onDateChange(event.target.value)}
          aria-invalid={errors.dateOfBirth ? true : undefined}
          aria-describedby={errors.dateOfBirth ? "baby-dob-error" : "baby-dob-hint"}
          className={fieldClass}
        />
        <p id="baby-dob-hint" className="mt-2 font-sans text-[12.5px] text-foreground/60">
          {draft.babyCount > 1
            ? "This date is used for every baby."
            : "The day your baby was born."}
        </p>
        {errors.dateOfBirth ? (
          <p id="baby-dob-error" role="alert" className="mt-2 font-sans text-[13px] text-destructive">
            {errors.dateOfBirth}
          </p>
        ) : null}
      </div>

      <div className="space-y-4 mb-9">
        {draft.babies.slice(0, draft.babyCount).map((baby, index) => {
          const id = `baby-name-${index}`;
          const error = errors.names?.[index];
          return (
            <div key={index}>
              <label htmlFor={id} className="block font-sans text-[13px] font-medium text-foreground/85 mb-2">
                {BABY_ROW_LABELS[index]} name <span className="text-foreground/55">(optional)</span>
              </label>
              <input
                id={id}
                type="text"
                value={baby.name}
                maxLength={MAX_BABY_NAME_LENGTH + 1}
                onChange={(event) => onNameChange(index, event.target.value)}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${id}-error` : undefined}
                placeholder="Leave blank if you would rather not"
                className={fieldClass}
              />
              {error ? (
                <p id={`${id}-error`} role="alert" className="mt-2 font-sans text-[13px] text-destructive">
                  {error}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={onContinue}
          className="inline-flex items-center justify-center rounded-pill bg-terracotta text-terracotta-foreground px-6 py-3 text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
        >
          Continue
        </button>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center justify-center rounded-pill border border-border/60 bg-parchment px-5 py-3 text-sm text-foreground/85 hover:border-foreground/25 transition-colors"
        >
          Back
        </button>
      </div>
    </div>
  ),
);

StepBabies.displayName = "StepBabies";

export default StepBabies;
