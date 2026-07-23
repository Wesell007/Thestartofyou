import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import SeoHead from "@/components/seo/SeoHead";
import MyWeekHeader from "@/components/myweek/MyWeekHeader";
import MyWeekFooter from "@/components/myweek/MyWeekFooter";
import ContractionTimerControls from "@/components/pregnancy-toolkit/ContractionTimerControls";
import ContractionEventList from "@/components/pregnancy-toolkit/ContractionEventList";
import ContractionSessionSummary from "@/components/pregnancy-toolkit/ContractionSessionSummary";
import { useContractionTimer } from "@/hooks/useContractionTimer";
import { summariseDraft } from "@/lib/contractionTimerSchema";

const accent = "hsl(var(--stage-pregnancy-accent))";
const softBorder = "hsl(var(--stage-pregnancy-accent) / 0.16)";
const signpostBg = "hsl(var(--stage-pregnancy) / 0.4)";

const PregnancyToolkitContractionTimer = () => {
  const {
    draft,
    saveState,
    errorMessage,
    startContraction,
    stopContraction,
    resetSession,
    updateNotes,
    saveSession,
  } = useContractionTimer();

  const isActive = draft.activeStartedAt !== null;
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!isActive) return;
    const id = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(id);
  }, [isActive]);

  const activeElapsedMs = useMemo(() => {
    if (!draft.activeStartedAt) return 0;
    return now - new Date(draft.activeStartedAt).getTime();
  }, [draft.activeStartedAt, now]);

  const summary = useMemo(() => summariseDraft(draft), [draft]);
  const completedCount = summary.completedCount;
  const saving = saveState === "saving";

  return (
    <div className="min-h-screen bg-parchment-grain page-vignette relative">
      <SeoHead
        title="Contraction timer | Pregnancy toolkit"
        description="A calm way to time contractions and keep notes."
        canonical="https://thestartofyou.com/pregnancy-toolkit/contraction-timer"
        noindex
      />
      <MyWeekHeader />
      <main className="relative mx-auto w-full max-w-[820px] px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 lg:pt-28 pb-20 sm:pb-24">
        {/* Hero */}
        <section className="mb-8 sm:mb-10">
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
            Contraction timer
          </h1>
          <p className="font-serif italic text-foreground/70 text-[15.5px] sm:text-[16px] leading-[1.65] max-w-[54ch]">
            A simple way to time contractions and keep notes.
          </p>
        </section>

        {/* Safety signpost */}
        <section
          className="mb-8 rounded-[20px] px-6 py-5 flex items-start gap-4 border"
          style={{ background: signpostBg, borderColor: softBorder }}
          aria-label="Important safety information"
        >
          <span
            aria-hidden="true"
            className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border"
            style={{ background: "hsl(var(--background) / 0.6)", borderColor: softBorder }}
          >
            <Info size={14} strokeWidth={1.8} style={{ color: accent }} />
          </span>
          <p className="font-serif text-[14.5px] leading-[1.6] text-foreground/80">
            If you think labour may be starting, if contractions are becoming regular, or if you are worried about anything, contact your midwife or maternity unit for guidance. This tool times contractions and holds your notes. It does not tell you whether you are in labour or when to go in.
          </p>
        </section>

        {/* Timer controls */}
        <section className="mb-8" aria-label="Timer">
          <ContractionTimerControls
            isActive={isActive}
            activeElapsedMs={activeElapsedMs}
            hasEvents={completedCount > 0}
            saving={saving}
            onStart={startContraction}
            onStop={stopContraction}
            onReset={resetSession}
            onSave={saveSession}
          />
          {saveState === "saved" ? (
            <p
              className="mt-4 font-serif italic text-[14px] text-foreground/70 text-center"
              role="status"
            >
              Session saved.
            </p>
          ) : null}
          {saveState === "error" && errorMessage ? (
            <p
              className="mt-4 font-serif italic text-[14px] text-foreground/75 text-center"
              role="alert"
            >
              {errorMessage}
            </p>
          ) : null}
        </section>

        {/* Session summary */}
        {(completedCount > 0 || isActive) && (
          <section className="mb-8" aria-label="Session so far">
            <ContractionSessionSummary summary={summary} />
          </section>
        )}

        {/* Recent contractions */}
        <section className="mb-10" aria-label="Recent contractions">
          <div className="flex items-center gap-3 mb-4">
            <span
              aria-hidden="true"
              className="block w-5 h-px"
              style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.55)" }}
            />
            <p
              className="font-sans text-[10.5px] font-medium tracking-[0.26em] uppercase"
              style={{ color: accent }}
            >
              Recent contractions
            </p>
          </div>
          <ContractionEventList events={draft.events} />
        </section>

        {/* Notes */}
        <section className="mb-10" aria-label="Session notes">
          <label
            htmlFor="contraction-notes"
            className="block font-sans text-[10.5px] font-medium tracking-[0.26em] uppercase text-foreground/55 mb-3"
          >
            Notes
          </label>
          <textarea
            id="contraction-notes"
            value={draft.notes}
            onChange={(e) => updateNotes(e.target.value)}
            placeholder="Anything you want to remember from this timing session"
            rows={4}
            className="w-full rounded-[16px] keepsake-surface border px-4 py-3 font-serif text-[14.5px] text-foreground/85 leading-[1.6] placeholder:text-foreground/40 placeholder:italic focus:outline-none focus:ring-2 focus:ring-[hsl(var(--stage-pregnancy-accent)/0.35)]"
            style={{ borderColor: softBorder, background: "hsl(var(--card) / 0.6)" }}
          />
        </section>

        {/* Return links */}
        <section
          className="rounded-[20px] keepsake-surface px-6 py-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between border"
          style={{ borderColor: softBorder }}
          aria-label="Return links"
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
            to="/my-week"
            className="group inline-flex items-center gap-2 font-sans text-[12px] font-medium tracking-[0.22em] uppercase"
            style={{ color: accent }}
          >
            Open my week
            <ArrowRight
              size={12}
              strokeWidth={1.8}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </section>
      </main>
      <MyWeekFooter contextual={null} />
    </div>
  );
};

export default PregnancyToolkitContractionTimer;
