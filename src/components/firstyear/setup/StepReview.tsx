import { forwardRef } from "react";
import { format } from "date-fns";
import { parseDateOnly } from "@/lib/dateOnly";
import { FIRST_YEAR_SETUP_COPY, type FirstYearSetupMode } from "@/lib/firstYearEntry";
import { toneLabel, type CompanionTone } from "@/lib/companion";
import type { FirstYearStageInfo } from "@/lib/firstYearStage";
import { babyCountLabel, BABY_ROW_LABELS } from "./firstYearSetupConstants";
import type { FirstYearSetupDraft } from "./firstYearSetupSchema";

type Props = {
  mode: FirstYearSetupMode;
  draft: FirstYearSetupDraft;
  stage: FirstYearStageInfo | null;
  companionName: string;
  companionTone: CompanionTone;
  saving: boolean;
  saveError: string | null;
  onEditBabies: () => void;
  onEditCompanion: () => void;
  onBack: () => void;
  onSubmit: () => void;
};

const rowClass = "flex flex-wrap items-baseline gap-x-3 gap-y-1 py-2.5 border-b border-border/45";
const labelClass = "font-sans text-[12.5px] tracking-[0.08em] uppercase text-foreground/55 min-w-[130px]";
const valueClass = "font-serif text-[15px] text-foreground/85";

/** Step 6. Quiet read-only summary, then save. */
const StepReview = forwardRef<HTMLHeadingElement, Props>(
  (
    {
      mode,
      draft,
      stage,
      companionName,
      companionTone,
      saving,
      saveError,
      onEditBabies,
      onEditCompanion,
      onBack,
      onSubmit,
    },
    ref,
  ) => {
    const parsedDob = parseDateOnly(draft.dateOfBirth);
    const countLabel = babyCountLabel(draft.babyCount);
    const names = draft.babies
      .slice(0, draft.babyCount)
      .map((baby, index) => ({ label: BABY_ROW_LABELS[index], name: baby.name.trim() }))
      .filter((entry) => entry.name.length > 0);

    return (
      <div>
        <h2
          ref={ref}
          tabIndex={-1}
          className="font-serif text-[1.7rem] sm:text-[2rem] leading-[1.15] mb-4 outline-none"
          style={{ color: "hsl(var(--stage-firstyear-deep))" }}
        >
          {FIRST_YEAR_SETUP_COPY[mode].review.heading}
        </h2>
        <p className="font-serif text-[15px] leading-[1.7] text-foreground/80 max-w-[52ch] mb-8">
          {FIRST_YEAR_SETUP_COPY[mode].review.intro}
        </p>

        <div
          className="rounded-[18px] px-5 py-4 mb-4"
          style={{ backgroundColor: "hsl(var(--stage-firstyear-soft) / 0.4)" }}
        >
          <div className="flex items-center justify-between mb-1">
            <p
              className="font-sans text-[10.5px] font-medium tracking-[0.28em] uppercase"
              style={{ color: "hsl(var(--stage-firstyear-accent))" }}
            >
              Your baby
            </p>
            <button
              type="button"
              onClick={onEditBabies}
              className="font-sans text-[13px] text-foreground/70 underline underline-offset-4 decoration-foreground/25 hover:text-foreground"
            >
              Edit
            </button>
          </div>
          <div className={rowClass}>
            <span className={labelClass}>How many</span>
            <span className={valueClass}>{countLabel}</span>
          </div>
          <div className={rowClass}>
            <span className={labelClass}>Date of birth</span>
            <span className={valueClass}>
              {parsedDob ? format(parsedDob, "d MMMM yyyy") : draft.dateOfBirth}
            </span>
          </div>
          <div className={rowClass}>
            <span className={labelClass}>Stage</span>
            <span className={valueClass}>{stage ? stage.label : "Added once we have a date"}</span>
          </div>
          {names.length > 0 ? (
            names.map((entry) => (
              <div key={entry.label} className={rowClass}>
                <span className={labelClass}>{entry.label}</span>
                <span className={valueClass}>{entry.name}</span>
              </div>
            ))
          ) : (
            <div className={rowClass}>
              <span className={labelClass}>Names</span>
              <span className={valueClass}>Not added yet</span>
            </div>
          )}
        </div>

        <div
          className="rounded-[18px] px-5 py-4 mb-8"
          style={{ backgroundColor: "hsl(var(--stage-recovery-soft) / 0.4)" }}
        >
          <div className="flex items-center justify-between mb-1">
            <p
              className="font-sans text-[10.5px] font-medium tracking-[0.28em] uppercase"
              style={{ color: "hsl(var(--stage-recovery-accent))" }}
            >
              For you
            </p>
            <button
              type="button"
              onClick={onEditCompanion}
              className="font-sans text-[13px] text-foreground/70 underline underline-offset-4 decoration-foreground/25 hover:text-foreground"
            >
              Edit
            </button>
          </div>
          <div className={rowClass}>
            <span className={labelClass}>Companion</span>
            <span className={valueClass}>
              {companionName.trim().length > 0 ? companionName.trim() : "No name for now"}
            </span>
          </div>
          <div className={rowClass}>
            <span className={labelClass}>Tone</span>
            <span className={valueClass}>{toneLabel(companionTone)}</span>
          </div>
          <p className="font-serif text-[14px] leading-[1.6] text-foreground/70 pt-3">
            {FIRST_YEAR_SETUP_COPY[mode].review.companionNote}
          </p>
        </div>

        {saveError ? (
          <p role="alert" className="mb-5 font-sans text-[13.5px] text-destructive">
            {saveError}
          </p>
        ) : null}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={onSubmit}
            disabled={saving}
            className="inline-flex items-center justify-center rounded-pill bg-terracotta text-terracotta-foreground px-6 py-3 text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all disabled:opacity-60"
          >
            {saving ? "Saving…" : "Start my First Year journey"}
          </button>
          <button
            type="button"
            onClick={onBack}
            disabled={saving}
            className="inline-flex items-center justify-center rounded-pill border border-border/60 bg-parchment px-5 py-3 text-sm text-foreground/85 hover:border-foreground/25 transition-colors disabled:opacity-60"
          >
            Back
          </button>
        </div>
      </div>
    );
  },
);

StepReview.displayName = "StepReview";

export default StepReview;
