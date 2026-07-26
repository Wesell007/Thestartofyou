import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import SeoHead from "@/components/seo/SeoHead";
import MyWeekHeader from "@/components/myweek/MyWeekHeader";
import PageStatusNotice from "@/components/journey-status/PageStatusNotice";
import MyWeekFooter from "@/components/myweek/MyWeekFooter";
import PageLoadState from "@/components/shared/PageLoadState";
import MidwifeQuestionForm from "@/components/pregnancy-toolkit/MidwifeQuestionForm";
import MidwifeQuestionCard from "@/components/pregnancy-toolkit/MidwifeQuestionCard";
import { useMidwifeQuestions } from "@/hooks/useMidwifeQuestions";

const accent = "hsl(var(--stage-pregnancy-accent))";
const softBorder = "hsl(var(--stage-pregnancy-accent) / 0.16)";
const signpostBg = "hsl(var(--stage-pregnancy) / 0.4)";

type Filter = "all" | "open" | "answered";

const PregnancyToolkitQuestionsForMidwife = () => {
  const {
    loadState,
    rows,
    saveState,
    errorMessage,
    appointments,
    create,
    update,
    remove,
    toggleAnswered,
    toggleFollowUp,
    updateAnswerNotes,
    reload,
  } = useMidwifeQuestions();

  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(() => {
    if (filter === "open") return rows.filter((r) => !r.answered);
    if (filter === "answered") return rows.filter((r) => r.answered);
    return rows;
  }, [rows, filter]);

  if (loadState === "loading") {
    return <PageLoadState message="Opening your questions…" />;
  }
  if (loadState === "error") {
    return (
      <PageLoadState
        error={errorMessage ?? "We couldn't open your questions."}
        onRetry={reload}
      />
    );
  }

  const saving = saveState === "saving";
  const openCount = rows.filter((r) => !r.answered).length;
  const answeredCount = rows.length - openCount;

  const filterButton = (value: Filter, label: string, count: number) => {
    const active = filter === value;
    return (
      <button
        key={value}
        type="button"
        onClick={() => setFilter(value)}
        className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-sans text-[11px] font-medium tracking-[0.2em] uppercase"
        style={{
          borderColor: softBorder,
          background: active ? "hsl(var(--stage-pregnancy) / 0.55)" : "transparent",
          color: active ? accent : "hsl(var(--foreground) / 0.6)",
        }}
      >
        {label}
        <span className="font-sans text-[10px] opacity-70">{count}</span>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-parchment-grain page-vignette relative">
      <SeoHead
        title="Questions for Midwife | Pregnancy toolkit"
        description="Save questions you want to bring to your midwife or care team."
        canonical="https://thestartofyou.com/pregnancy-toolkit/questions-for-midwife"
        noindex
      />
      <MyWeekHeader />
      <main className="relative mx-auto w-full max-w-[820px] px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 lg:pt-28 pb-20 sm:pb-24">
        <PageStatusNotice />
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
            Questions for Midwife
          </h1>
          <p className="font-serif italic text-foreground/70 text-[15.5px] sm:text-[16px] leading-[1.65] max-w-[54ch]">
            A calm place to keep questions you want to bring to your midwife or care team.
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
            style={{
              background: "hsl(var(--background) / 0.6)",
              borderColor: softBorder,
            }}
          >
            <Info size={14} strokeWidth={1.8} style={{ color: accent }} />
          </span>
          <p className="font-serif text-[14.5px] leading-[1.6] text-foreground/80">
            This tool helps you remember questions for your midwife or care team. It does not answer medical questions or replace advice from a healthcare professional.
          </p>
        </section>

        {/* Add question form */}
        <section className="mb-10" aria-label="Add a question">
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
              Add a question
            </p>
          </div>
          <MidwifeQuestionForm
            saving={saving}
            appointments={appointments}
            onSubmit={async (draft) => {
              await create(draft);
            }}
          />
          {saveState === "error" && errorMessage ? (
            <p className="mt-3 font-sans text-[12.5px] text-foreground/70">
              {errorMessage}
            </p>
          ) : null}
        </section>

        {/* Questions list */}
        <section className="mb-10" aria-label="Your questions">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="block w-5 h-px"
                style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.4)" }}
              />
              <p className="font-sans text-[10.5px] font-medium tracking-[0.26em] uppercase text-foreground/55">
                Your questions
              </p>
            </div>
            {rows.length > 0 ? (
              <div className="flex flex-wrap items-center gap-2">
                {filterButton("all", "All", rows.length)}
                {filterButton("open", "Open", openCount)}
                {filterButton("answered", "Answered", answeredCount)}
              </div>
            ) : null}
          </div>
          {rows.length === 0 ? (
            <div
              className="rounded-[20px] keepsake-surface px-6 py-8 text-center"
              style={{ borderColor: softBorder }}
            >
              <p className="font-serif italic text-[14.5px] text-foreground/65 leading-[1.6]">
                Your questions will appear here when you save one.
              </p>
            </div>
          ) : visible.length === 0 ? (
            <div
              className="rounded-[20px] keepsake-surface px-6 py-8 text-center"
              style={{ borderColor: softBorder }}
            >
              <p className="font-serif italic text-[14.5px] text-foreground/65 leading-[1.6]">
                No questions in this view yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {visible.map((q) => (
                <MidwifeQuestionCard
                  key={q.id}
                  question={q}
                  appointments={appointments}
                  saving={saving}
                  onUpdate={update}
                  onDelete={remove}
                  onToggleAnswered={toggleAnswered}
                  onToggleFollowUp={toggleFollowUp}
                  onUpdateAnswerNotes={updateAnswerNotes}
                />
              ))}
            </div>
          )}
        </section>

        {/* Return links */}
        <section
          className="rounded-[20px] keepsake-surface px-6 py-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between"
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

export default PregnancyToolkitQuestionsForMidwife;
