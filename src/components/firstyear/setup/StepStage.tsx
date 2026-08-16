import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { BEYOND_FIRST_YEAR_SETUP_NOTE, type FirstYearStageInfo } from "@/lib/firstYearStage";

type Props = {
  /** Null only when the date of birth could not be read. */
  stage: FirstYearStageInfo | null;
  babyCount: number;
  onBack: () => void;
  onContinue: () => void;
};

/**
 * Step 3. Read-only. The stage is always derived from the date of birth and
 * never stored, so it stays correct as the weeks pass.
 */
const StepStage = forwardRef<HTMLHeadingElement, Props>(
  ({ stage, babyCount, onBack, onContinue }, ref) => (
    <div>
      <h2
        ref={ref}
        tabIndex={-1}
        className="font-serif text-[1.7rem] sm:text-[2rem] leading-[1.15] mb-4 outline-none"
        style={{ color: "hsl(var(--stage-firstyear-deep))" }}
      >
        {babyCount > 1 ? "Where your babies are now" : "Where your baby is now"}
      </h2>

      {stage ? (
        <>
          <div
            className="rounded-[18px] px-5 py-5 mb-6"
            style={{ backgroundColor: "hsl(var(--stage-firstyear-soft) / 0.45)" }}
          >
            <p
              className="font-sans text-[10.5px] font-medium tracking-[0.28em] uppercase mb-2"
              style={{ color: "hsl(var(--stage-firstyear-accent))" }}
            >
              Stage
            </p>
            <p className="font-serif text-[1.35rem] text-foreground/90 mb-2">{stage.label}</p>
            <p className="font-serif text-[15px] leading-[1.7] text-foreground/75 max-w-[52ch]">
              {stage.description}
            </p>
          </div>
          {stage.beyondFirstYear ? (
            <div className="mb-8">
              <p className="font-serif text-[15px] leading-[1.7] text-foreground/75 max-w-[52ch]">
                {BEYOND_FIRST_YEAR_SETUP_NOTE}
              </p>
              <Link
                to="/toddler"
                className="mt-3 inline-flex min-h-11 items-center font-sans text-[13px] text-foreground/65 underline underline-offset-4 decoration-foreground/25 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                Look at toddler guidance
              </Link>
            </div>
          ) : (
            <p className="font-serif text-[15px] leading-[1.7] text-foreground/75 max-w-[52ch] mb-8">
              This is worked out from the date of birth, so it moves along on its own.
            </p>
          )}
        </>
      ) : (
        <p className="font-serif text-[15px] leading-[1.7] text-foreground/75 max-w-[52ch] mb-8">
          Go back a step and add a date of birth so we can shape this around your baby's age.
        </p>
      )}

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

StepStage.displayName = "StepStage";

export default StepStage;
