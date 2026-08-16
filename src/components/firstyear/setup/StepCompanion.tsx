import { forwardRef } from "react";
import { SUGGESTED_NAMES, TONE_OPTIONS, type CompanionTone } from "@/lib/companion";
import { COMPANION_INTRO_POINTS } from "./firstYearSetupConstants";

export type CompanionDraft = {
  /** Empty string means "no name for now". */
  name: string;
  tone: CompanionTone;
};

type Props = {
  /** True when the user already had a saved companion name before setup. */
  hasSavedName: boolean;
  value: CompanionDraft;
  nameError: string | null;
  onChange: (next: CompanionDraft) => void;
  onBack: () => void;
  onContinue: () => void;
};

const pillClass = (active: boolean) =>
  `rounded-pill border px-3.5 py-1.5 font-sans text-[12.5px] transition-colors ${
    active
      ? "bg-foreground/[0.06] border-foreground/40 text-foreground"
      : "bg-parchment border-border/50 text-foreground/75 hover:border-foreground/25"
  }`;

/**
 * Step 5. The companion name and tone are stored on the profile, reusing the
 * same fields as pregnancy setup. Nothing about AI behaviour changes here.
 */
const StepCompanion = forwardRef<HTMLHeadingElement, Props>(
  ({ hasSavedName, value, nameError, onChange, onBack, onContinue }, ref) => {
    const isSuggested = SUGGESTED_NAMES.some(
      (name) => name.toLowerCase() === value.name.trim().toLowerCase(),
    );

    return (
      <div>
        <h2
          ref={ref}
          tabIndex={-1}
          className="font-serif text-[1.7rem] sm:text-[2rem] leading-[1.15] mb-4 outline-none"
          style={{ color: "hsl(var(--stage-recovery-deep))" }}
        >
          {hasSavedName ? "Your companion is still here" : "Meet your companion"}
        </h2>
        <p className="font-serif text-[15px] leading-[1.7] text-foreground/80 max-w-[52ch] mb-6">
          {hasSavedName
            ? "You can keep the name you chose, or change it here. Nothing you write is shared with her."
            : "You can keep Cindy, choose another name, or write your own."}
        </p>

        {!hasSavedName ? (
          <ul className="mb-8 space-y-2 max-w-[52ch]">
            {COMPANION_INTRO_POINTS.map((point) => (
              <li
                key={point}
                className="font-serif text-[14.5px] leading-[1.65] text-foreground/75 pl-4 relative"
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-[0.6em] h-1 w-1 rounded-full bg-foreground/35"
                />
                {point}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mb-8">
          <p className="font-sans text-[13px] font-medium text-foreground/85 mb-3">
            A name for your companion
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {SUGGESTED_NAMES.map((name) => (
              <button
                key={name}
                type="button"
                aria-pressed={value.name.trim() === name}
                onClick={() => onChange({ ...value, name })}
                className={pillClass(value.name.trim() === name)}
              >
                {name}
              </button>
            ))}
            <button
              type="button"
              aria-pressed={value.name.trim().length === 0}
              onClick={() => onChange({ ...value, name: "" })}
              className={pillClass(value.name.trim().length === 0)}
            >
              No name for now
            </button>
          </div>

          <label
            htmlFor="companion-name"
            className="block font-sans text-[13px] font-medium text-foreground/85 mb-2"
          >
            Or write your own <span className="text-foreground/55">(optional)</span>
          </label>
          <input
            id="companion-name"
            type="text"
            value={isSuggested ? "" : value.name}
            maxLength={30}
            onChange={(event) => onChange({ ...value, name: event.target.value })}
            aria-invalid={nameError ? true : undefined}
            aria-describedby={nameError ? "companion-name-error" : undefined}
            placeholder="A name for your companion"
            className="w-full rounded-[14px] border border-border/60 bg-parchment px-4 py-3 font-sans text-[15px] text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-sage focus:ring-offset-2 focus:ring-offset-transparent"
          />
          {nameError ? (
            <p
              id="companion-name-error"
              role="alert"
              className="mt-2 font-sans text-[13px] text-destructive"
            >
              {nameError}
            </p>
          ) : null}
        </div>

        <fieldset className="mb-9">
          <legend className="font-sans text-[13px] font-medium text-foreground/85 mb-3">
            How should she sound?
          </legend>
          <div className="flex flex-wrap gap-2">
            {TONE_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                aria-pressed={value.tone === option.value}
                onClick={() => onChange({ ...value, tone: option.value })}
                className={pillClass(value.tone === option.value)}
              >
                {option.label}
                <span className="sr-only"> — {option.hint}</span>
              </button>
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
    );
  },
);

StepCompanion.displayName = "StepCompanion";

export default StepCompanion;
