import { Link } from "react-router-dom";
import {
  ScrollText,
  Briefcase,
  ClipboardList,
  Footprints,
  Timer,
  Activity,
  MessageCircleQuestion,
  ArrowRight,
  ArrowLeft,
  Calculator,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useBirthPlanSummary } from "@/hooks/useBirthPlan";
import { statusFromCompletion, statusLabel } from "@/lib/birthPlanSchema";
import { useHospitalBagSummary } from "@/hooks/useHospitalBag";
import {
  statusLabel as hbStatusLabel,
} from "@/lib/hospitalBagSchema";
import { useAppointmentsSummary } from "@/hooks/usePregnancyAppointments";
import { useBabyMovementNotesSummary } from "@/hooks/useBabyMovementNotes";

import SeoHead from "@/components/seo/SeoHead";
import MyWeekHeader from "@/components/myweek/MyWeekHeader";
import MyWeekFooter from "@/components/myweek/MyWeekFooter";

type ToolCard = {
  key: string;
  title: string;
  hint: string;
  icon: LucideIcon;
};

const MVP_TOOLS: ToolCard[] = [
  {
    key: "birth-plan",
    title: "Birth plan",
    hint: "Your preferences for labour and birth, held in one calm place.",
    icon: ScrollText,
  },
  {
    key: "hospital-bag",
    title: "Hospital bag",
    hint: "A quiet checklist for the essentials, ready when you are.",
    icon: Briefcase,
  },
  {
    key: "appointment-notes",
    title: "Appointment notes",
    hint: "Keep dates, questions and what was said in one thread.",
    icon: ClipboardList,
  },
  {
    key: "baby-movements",
    title: "Baby movement notes",
    hint: "A calm place to notice your baby's usual pattern.",
    icon: Footprints,
  },
];

const FUTURE_TOOLS: ToolCard[] = [
  {
    key: "contraction-counter",
    title: "Contraction timer",
    hint: "A simple way to time contractions and keep notes.",
    icon: Timer,
  },
  {
    key: "symptoms",
    title: "Symptoms tracker",
    hint: "Notice how you feel over the weeks, without pressure.",
    icon: Activity,
  },
  {
    key: "midwife-questions",
    title: "Questions for midwife",
    hint: "A place to gather things you want to ask.",
    icon: MessageCircleQuestion,
  },
];

const accent = "hsl(var(--stage-pregnancy-accent))";
const softBorder = "hsl(var(--stage-pregnancy-accent) / 0.16)";
const iconBg = "hsl(var(--stage-pregnancy) / 0.5)";

const MvpCard = ({ tool, statusText, to }: { tool: ToolCard; statusText: string; to?: string }) => {
  const Icon = tool.icon;
  const isLive = Boolean(to);
  const body = (
    <div
      className="h-full rounded-[20px] keepsake-surface px-5 py-6 flex flex-col"
      style={{ borderColor: softBorder }}
      aria-disabled={isLive ? undefined : "true"}
    >
      <span
        aria-hidden="true"
        className="flex h-9 w-9 items-center justify-center rounded-full border mb-4"
        style={{ background: iconBg, borderColor: softBorder }}
      >
        <Icon size={15} strokeWidth={1.6} style={{ color: accent }} />
      </span>
      <h3 className="font-serif text-[1.05rem] sm:text-[1.1rem] text-foreground/88 leading-[1.25] mb-2">
        {tool.title}
      </h3>
      <p className="font-sans text-[13px] font-light text-foreground/60 leading-[1.6] flex-1">
        {tool.hint}
      </p>
      <span
        className="mt-4 inline-flex items-center gap-1.5 font-sans text-[10.5px] font-medium tracking-[0.22em] uppercase"
        style={isLive ? { color: accent } : { color: "hsl(var(--foreground) / 0.45)" }}
      >
        {isLive ? (
          <>
            {statusText}
            <ArrowRight size={11} strokeWidth={1.6} />
          </>
        ) : (
          statusText
        )}
      </span>
    </div>
  );
  if (isLive && to) {
    return (
      <Link
        to={to}
        className="group block h-full transition-shadow hover:shadow-[0_18px_44px_-24px_hsl(var(--stage-pregnancy-accent)/0.28)]"
      >
        {body}
      </Link>
    );
  }
  return body;
};

const FutureCard = ({ tool }: { tool: ToolCard }) => {
  const Icon = tool.icon;
  return (
    <div
      className="h-full rounded-[18px] px-5 py-5 flex flex-col opacity-80"
      style={{
        background: "hsl(var(--card) / 0.55)",
        border: "1px dashed hsl(var(--stage-pregnancy-accent) / 0.24)",
      }}
      aria-disabled="true"
    >
      <span
        aria-hidden="true"
        className="flex h-8 w-8 items-center justify-center rounded-full mb-3"
        style={{ background: iconBg }}
      >
        <Icon size={13} strokeWidth={1.6} style={{ color: accent }} />
      </span>
      <h3 className="font-serif text-[15px] text-foreground/80 leading-[1.3] mb-1.5">
        {tool.title}
      </h3>
      <p className="font-serif italic text-[13px] text-foreground/55 leading-[1.55] flex-1">
        {tool.hint}
      </p>
      <span className="mt-3 font-sans text-[10px] font-medium tracking-[0.28em] uppercase text-foreground/40">
        Coming later
      </span>
    </div>
  );
};

const PregnancyToolkit = () => {
  const { loading: bpLoading, row: bpRow } = useBirthPlanSummary();
  const birthPlanStatusText = bpLoading
    ? "Open"
    : statusLabel(statusFromCompletion(bpRow?.completion ?? 0, Boolean(bpRow)));
  const { loading: hbLoading, progress: hbProgress, hasRows: hbHasRows } = useHospitalBagSummary();
  const hospitalBagStatusText = hbLoading
    ? "Open"
    : !hbHasRows
      ? "Not started"
      : hbProgress.status === "ready-enough"
        ? hbStatusLabel(hbProgress.status)
        : `${hbProgress.packed} of ${hbProgress.total} packed`;
  const { loading: apLoading, total: apTotal, next: apNext } = useAppointmentsSummary();
  const appointmentsStatusText = apLoading
    ? "Open"
    : apTotal === 0
      ? "Not started"
      : apNext
        ? "Next appointment saved"
        : apTotal === 1
          ? "1 saved"
          : `${apTotal} saved`;
  const { loading: bmLoading, total: bmTotal } = useBabyMovementNotesSummary();
  const babyMovementsStatusText = bmLoading
    ? "Open"
    : bmTotal === 0
      ? "Not started"
      : bmTotal === 1
        ? "1 note saved"
        : `${bmTotal} notes saved`;

  return (
    <div className="min-h-screen bg-parchment-grain page-vignette relative">
      <SeoHead
        title="Pregnancy toolkit | The Start of You"
        description="Your private pregnancy toolkit."
        canonical="https://thestartofyou.com/pregnancy-toolkit"
        noindex
      />
      <MyWeekHeader />
      <main className="relative mx-auto w-full max-w-[760px] px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 lg:pt-28 pb-20 sm:pb-24">
        {/* Hero */}
        <section className="mb-12 sm:mb-14">
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
            Your pregnancy toolkit
          </h1>
          <p className="font-serif italic text-foreground/70 text-[15.5px] sm:text-[16px] leading-[1.65] max-w-[52ch]">
            A calm private space for birth preparation, practical notes and the tools you may want as pregnancy moves forward.
          </p>
        </section>

        {/* MVP cards */}
        <section className="mb-14" aria-label="Toolkit tools">
          <div className="flex items-center gap-3 mb-5">
            <span
              aria-hidden="true"
              className="block w-5 h-px"
              style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.55)" }}
            />
            <p
              className="font-sans text-[10.5px] font-medium tracking-[0.26em] uppercase"
              style={{ color: accent }}
            >
              In preparation
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {MVP_TOOLS.map((t) => {
              if (t.key === "birth-plan") {
                return (
                  <MvpCard
                    key={t.key}
                    tool={t}
                    statusText={birthPlanStatusText}
                    to="/pregnancy-toolkit/birth-plan"
                  />
                );
              }
              if (t.key === "hospital-bag") {
                return (
                  <MvpCard
                    key={t.key}
                    tool={t}
                    statusText={hospitalBagStatusText}
                    to="/pregnancy-toolkit/hospital-bag"
                  />
                );
              }
              if (t.key === "appointment-notes") {
                return (
                  <MvpCard
                    key={t.key}
                    tool={t}
                    statusText={appointmentsStatusText}
                    to="/pregnancy-toolkit/appointments"
                  />
                );
              }
              return <MvpCard key={t.key} tool={t} statusText="Coming soon" />;
            })}

          </div>
        </section>

        {/* Future cards */}
        <section className="mb-14" aria-label="Coming later">
          <div className="flex items-center gap-3 mb-5">
            <span
              aria-hidden="true"
              className="block w-5 h-px"
              style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.4)" }}
            />
            <p className="font-sans text-[10.5px] font-medium tracking-[0.26em] uppercase text-foreground/50">
              Quiet tools for later
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {FUTURE_TOOLS.map((t) => (
              <FutureCard key={t.key} tool={t} />
            ))}
          </div>
        </section>

        {/* Supporting live link: due date calculator */}
        <section className="mb-14">
          <Link
            to="/due-date-calculator"
            className="group inline-flex items-center gap-3 rounded-[16px] keepsake-surface px-5 py-4 transition-shadow hover:shadow-[0_18px_44px_-24px_hsl(var(--stage-pregnancy-accent)/0.28)]"
            style={{ borderColor: softBorder }}
          >
            <span
              aria-hidden="true"
              className="flex h-9 w-9 items-center justify-center rounded-full border"
              style={{ background: iconBg, borderColor: softBorder }}
            >
              <Calculator size={15} strokeWidth={1.6} style={{ color: accent }} />
            </span>
            <span className="flex-1">
              <span className="block font-serif text-[15px] text-foreground/85 leading-[1.3]">
                Due date calculator
              </span>
              <span className="block font-sans text-[12.5px] font-light text-foreground/55 mt-0.5">
                Estimate your due date and weeks to go.
              </span>
            </span>
            <ArrowRight
              size={14}
              strokeWidth={1.6}
              className="transition-transform group-hover:translate-x-0.5"
              style={{ color: accent }}
            />
          </Link>
        </section>

        {/* Return links */}
        <section
          className="rounded-[20px] keepsake-surface px-6 py-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between"
          style={{ borderColor: softBorder }}
          aria-label="Return to your journey"
        >
          <Link
            to="/my-week"
            className="group inline-flex items-center gap-2 font-sans text-[12px] font-medium tracking-[0.22em] uppercase"
            style={{ color: accent }}
          >
            <ArrowLeft
              size={12}
              strokeWidth={1.8}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            Back to my week
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
    </div>
  );
};

export default PregnancyToolkit;
