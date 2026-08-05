import { forwardRef } from "react";
import { COMPANION_OPTIONS, type CompanionChoice } from "./firstYearSetupConstants";

type Props = {
  value: CompanionChoice | null;
  onChange: (value: CompanionChoice) => void;
  onBack: () => void;
  onContinue: () => void;
};

/**
 * Step 3. Same companion, new chapter. This choice is session-only: nothing is
 * stored, no AI context or prompt changes, and no pregnancy memories are read.
 */
const StepCompanion = forwardRef<HTMLHeadingElement, Props>(
  ({ value, onChange, onBack, onContinue }, ref) => (
    <div>
      <h2
        ref={ref}
        tabIndex={-1}
        className="font-serif text-[1.7rem] sm:text-[2rem] leading-[1.15] mb-4 outline-none"
        style={{ color: "hsl(var(--stage-recovery-deep))" }}
      >
        Cindy is still here. Same companion, new chapter.
      </h2>
      <p className="font-serif text-[15px] leading-[1.7] text-foreground/80 max-w-[52ch] mb-8">
        Nothing you have written is shared with her. You choose what she can use,
        and you can change your mind whenever you like.
      </p>

      <fieldset className="mb-9">
        <legend className="sr-only">How would you like Cindy to continue?</legend>
        <div
          role="radiogroup"
          aria-label="How would you like Cindy to continue?"
          className="flex flex-col gap-3"
        >
          {COMPANION_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="flex gap-3 rounded-[16px] border px-4 py-4 cursor-pointer transition-colors"
              style={{
                borderColor:
                  value === option.value
                    ? "hsl(var(--stage-recovery-accent) / 0.5)"
                    : "hsl(var(--border) / 0.6)",
                backgroundColor:
                  value === option.value
                    ? "hsl(var(--stage-recovery-soft) / 0.45)"
                    : "transparent",
              }}
            >
              <input
                type="radio"
                name="companion-choice"
                value={option.value}
                checked={value === option.value}
                onChange={() => onChange(option.value)}
                className="mt-1 h-4 w-4 accent-terracotta shrink-0"
              />
              <span>
                <span className="block font-sans text-[15px] text-foreground/90 mb-1">
                  {option.label}
                </span>
                <span className="block font-serif text-[14px] leading-[1.6] text-foreground/70">
                  {option.detail}
                </span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

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

StepCompanion.displayName = "StepCompanion";

export default StepCompanion;
