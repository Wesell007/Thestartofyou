/**
 * SetupShell — the shared journey setup layout.
 *
 * One editorial presentation for all three saved journeys (TTC, Pregnancy,
 * First Year): a stage-tinted page, a restrained step indicator, a single
 * form column, and an optional static aside used for safe product glimpses.
 *
 * Presentation only. No data reads, no writes, no journey logic.
 */

import type { ReactNode } from "react";

export type SetupStage = "ttc" | "pregnancy" | "firstyear";

const STAGE_TOKENS: Record<SetupStage, { tint: string; accent: string }> = {
  ttc: { tint: "--stage-ttc", accent: "--stage-ttc-accent" },
  pregnancy: { tint: "--stage-pregnancy", accent: "--stage-pregnancy-accent" },
  firstyear: { tint: "--stage-firstyear", accent: "--stage-firstyear-accent" },
};

interface Props {
  stage: SetupStage;
  kicker: string;
  title: string;
  intro?: ReactNode;
  step: number;
  totalSteps: number;
  /** Short label for the current step, announced politely. */
  stepLabel: string;
  /** Static, non-personal supporting panel shown beside the form on desktop. */
  aside?: ReactNode;
  children: ReactNode;
  /** Quiet exit affordance rendered under the card. */
  onCancel?: () => void;
  cancelLabel?: string;
}

const SetupShell = ({
  stage,
  kicker,
  title,
  intro,
  step,
  totalSteps,
  stepLabel,
  aside,
  children,
  onCancel,
  cancelLabel = "Cancel",
}: Props) => {
  const tokens = STAGE_TOKENS[stage];
  return (
    <div
      className="min-h-screen bg-parchment-grain page-vignette relative"
      style={{ backgroundColor: `hsl(var(${tokens.tint}) / 0.35)` }}
    >
      <main className="relative mx-auto w-full max-w-[1080px] px-4 sm:px-8 md:px-10 pt-14 sm:pt-20 pb-20">
        <p
          className="font-sans text-[10.5px] font-medium tracking-[0.3em] uppercase mb-3"
          style={{ color: `hsl(var(${tokens.accent}))` }}
        >
          {kicker}
        </p>
        <h1 className="font-serif text-[1.75rem] sm:text-[2.15rem] leading-tight text-foreground mb-3">
          {title}
        </h1>
        {intro ? (
          <div className="font-sans text-[15px] font-light text-muted-foreground/85 leading-relaxed max-w-[52ch] mb-8">
            {intro}
          </div>
        ) : (
          <div className="mb-8" />
        )}

        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_320px] md:items-start">
          <section
            className="rounded-[22px] keepsake-surface bg-card border px-5 sm:px-8 py-7 sm:py-9"
            style={{ borderColor: `hsl(var(${tokens.accent}) / 0.2)` }}
          >
            <div className="mb-7">
              <p className="font-sans text-[12.5px] text-foreground/55" aria-live="polite">
                Step {step} of {totalSteps} · {stepLabel}
              </p>
              <div className="mt-2.5 flex gap-1.5" aria-hidden="true">
                {Array.from({ length: totalSteps }, (_, index) => (
                  <span
                    key={index}
                    className="h-[3px] w-8 rounded-full transition-colors"
                    style={{
                      backgroundColor:
                        index < step
                          ? `hsl(var(${tokens.accent}) / 0.55)`
                          : `hsl(var(${tokens.accent}) / 0.15)`,
                    }}
                  />
                ))}
              </div>
            </div>

            {children}
          </section>

          {aside ? (
            <aside className="order-first md:order-none">{aside}</aside>
          ) : null}
        </div>

        {onCancel ? (
          <div className="pt-8">
            <button
              type="button"
              onClick={onCancel}
              className="font-sans text-[13px] text-foreground/60 underline underline-offset-4 decoration-foreground/25 hover:text-foreground"
            >
              {cancelLabel}
            </button>
          </div>
        ) : null}
      </main>
    </div>
  );
};

export default SetupShell;
