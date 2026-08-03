import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SeoHead from "@/components/seo/SeoHead";
import MyWeekHeader from "@/components/myweek/MyWeekHeader";
import PageStatusNotice from "@/components/journey-status/PageStatusNotice";
import MyWeekFooter from "@/components/myweek/MyWeekFooter";
import PageLoadState from "@/components/shared/PageLoadState";
import BirthPlanProgress from "@/components/pregnancy-toolkit/BirthPlanProgress";
import BirthPlanSectionCard from "@/components/pregnancy-toolkit/BirthPlanSection";
import BirthPlanSummary from "@/components/pregnancy-toolkit/BirthPlanSummary";
import BirthPlanActions from "@/components/pregnancy-toolkit/BirthPlanActions";
import BirthPlanPrintable from "@/components/pregnancy-toolkit/BirthPlanPrintable";
import { useBirthPlan } from "@/hooks/useBirthPlan";
import { supabase } from "@/integrations/supabase/client";
import { getActivePregnancyJourney } from "@/lib/savedJourney";
import {
  BIRTH_PLAN_SECTIONS,
  BirthPlanSectionAnswer,
  BirthPlanSectionKey,
  calculateCompletion,
  isSectionAnswered,
  statusFromCompletion,
} from "@/lib/birthPlanSchema";

const accent = "hsl(var(--stage-pregnancy-accent))";
const softBorder = "hsl(var(--stage-pregnancy-accent) / 0.16)";

const SaveStatePill = ({ state }: { state: "idle" | "saving" | "saved" | "error" }) => {
  if (state === "idle") return null;
  const label =
    state === "saving" ? "Saving…" : state === "saved" ? "Saved" : "Save failed";
  return (
    <span
      aria-live="polite"
      className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom))] md:bottom-5 right-5 rounded-full px-4 py-1.5 font-sans text-[11.5px] font-medium tracking-[0.18em] uppercase shadow-md"
      style={{
        background:
          state === "error"
            ? "hsl(0 65% 55%)"
            : state === "saving"
              ? "hsl(var(--stage-pregnancy) / 0.9)"
              : accent,
        color: state === "saving" ? "hsl(var(--foreground) / 0.75)" : "white",
      }}
    >
      {label}
    </span>
  );
};

const PregnancyToolkitBirthPlan = () => {
  const {
    loadState,
    saveState,
    row,
    answers,
    completion,
    updatedAt,
    errorMessage,
    saveAnswers,
    reload,
  } = useBirthPlan();

  const onSectionChange = (key: BirthPlanSectionKey, next: BirthPlanSectionAnswer) => {
    const nextAnswers = { ...answers, [key]: next };
    void saveAnswers(nextAnswers);
  };

  const [parentName, setParentName] = useState<string | null>(null);
  const [dueDate, setDueDate] = useState<Date | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await supabase.auth.getUser();
        const user = data.user;
        if (!user) return;
        const meta = (user.user_metadata ?? {}) as Record<string, unknown>;
        const rawName =
          (typeof meta.full_name === "string" && meta.full_name.trim()) ||
          (typeof meta.name === "string" && meta.name.trim()) ||
          (user.email ? user.email.split("@")[0] : "") ||
          "";
        if (!cancelled && rawName) setParentName(rawName);
        const journey = await getActivePregnancyJourney(user.id);
        if (!cancelled && journey?.due_date) {
          const d = new Date(journey.due_date);
          if (!Number.isNaN(d.getTime())) setDueDate(d);
        }
      } catch {
        // silent — printable simply omits these fields
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const hasAnyAnswered = useMemo(
    () => BIRTH_PLAN_SECTIONS.some((s) => isSectionAnswered(answers[s.key])),
    [answers]
  );

  if (loadState === "loading") {
    return <PageLoadState message="Opening your birth plan…" />;
  }
  if (loadState === "error") {
    return (
      <PageLoadState
        error={errorMessage ?? "We couldn't open your birth plan."}
        onRetry={reload}
      />
    );
  }

  const liveCompletion = row ? completion : calculateCompletion(answers);
  const status = statusFromCompletion(liveCompletion, Boolean(row));

  return (
    <div className="min-h-screen bg-parchment-grain page-vignette relative">
      <SeoHead
        title="Birth plan | The Start of You"
        description="Your private birth plan."
        canonical="https://thestartofyou.com/pregnancy-toolkit/birth-plan"
        noindex
      />
      <MyWeekHeader />
      <main className="relative mx-auto w-full max-w-[760px] px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 lg:pt-28 pb-24">
        <PageStatusNotice />
        {/* Hero */}
        <section className="mb-10 sm:mb-12">
          <div className="flex items-center gap-3 mb-5">
            <span
              aria-hidden="true"
              className="block w-6 h-px"
              style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.6)" }}
            />
            <p
              className="font-sans text-[10.5px] font-medium tracking-[0.28em] uppercase"
              style={{ color: accent }}
            >
              Pregnancy toolkit
            </p>
          </div>
          <h1 className="font-serif text-[1.9rem] sm:text-[2.25rem] leading-[1.15] text-foreground/90 mb-4">
            Birth plan
          </h1>
          <p className="font-serif italic text-foreground/70 text-[15.5px] sm:text-[16px] leading-[1.65] max-w-[54ch]">
            A calm place to collect your preferences and notes before discussing them with your midwife or care team.
          </p>
          <p
            className="mt-4 rounded-[14px] border px-4 py-3 font-serif italic text-foreground/70 text-[13.5px] leading-[1.65] max-w-[58ch]"
            style={{
              background: "hsl(var(--stage-pregnancy) / 0.35)",
              borderColor: softBorder,
            }}
          >
            These are preferences, not guarantees. Your care team can help you understand what is safest for you and your baby, and plans can change on the day.
          </p>
        </section>

        {/* Progress */}
        <div className="mb-10">
          <BirthPlanProgress
            completion={liveCompletion}
            status={status}
            updatedAt={updatedAt}
            onPrint={hasAnyAnswered ? () => window.print() : undefined}
          />
        </div>

        {/* Sections, grouped into bands */}
        <div className="mb-2">
          {BIRTH_PLAN_BANDS.map((band) => (
            <BirthPlanBand key={band.id} band={band}>
              {sectionsForBand(band.id).map((section) => (
                <BirthPlanSectionCard
                  key={section.key}
                  section={section}
                  value={answers[section.key]}
                  onChange={(next) => onSectionChange(section.key, next)}
                  disabled={saveState === "saving"}
                  open={openSections[section.key] ?? true}
                  onToggle={() => toggleSection(section.key)}
                />
              ))}
            </BirthPlanBand>
          ))}
        </div>

        {/* Summary */}
        <div className="mb-6">
          <BirthPlanSummary
            answers={answers}
            completion={liveCompletion}
            updatedAt={updatedAt}
          />
        </div>

        {/* Export actions */}
        <div className="mb-10">
          <BirthPlanActions hasContent={hasAnyAnswered} />
        </div>



        {/* Return links */}
        <section
          className="rounded-[20px] keepsake-surface px-6 py-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between"
          style={{ borderColor: softBorder }}
          aria-label="Return"
        >
          <Link
            to="/pregnancy-toolkit"
            className="group inline-flex items-center gap-2 font-sans text-[12px] font-medium tracking-[0.22em] uppercase"
            style={{ color: accent }}
          >
            <ArrowLeft
              size={12}
              strokeWidth={1.8}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            Back to toolkit
          </Link>
          <Link
            to="/my-journey"
            className="group inline-flex items-center gap-2 font-sans text-[12px] font-medium tracking-[0.22em] uppercase"
            style={{ color: accent }}
          >
            Open my journey
            <ArrowRight
              size={12}
              strokeWidth={1.8}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </section>
      </main>
      <MyWeekFooter contextual={null} />
      <SaveStatePill state={saveState} />
      <BirthPlanPrintable answers={answers} parentName={parentName} dueDate={dueDate} />
    </div>
  );
};

export default PregnancyToolkitBirthPlan;
