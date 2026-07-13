import { addDays, format } from "date-fns";
import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  Bookmark,
  Check,
  CircleDot,
  Egg,
  Hourglass,
  MessageCircle,
  RefreshCw,
  Sparkles,
  Target,
  TestTube2,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import OvulationResultCalendar from "@/components/tools/OvulationResultCalendar";

interface OvulationResultProps {
  lmp: Date;
  cycleLength: number;
  ovulationDay: Date;
  fertileStart: Date;
  fertileEnd: Date;
  testDay: Date;
}

type ReminderKey = "fertile" | "ovulation" | "test" | "period";

interface SavedCycle {
  lmp: string;
  cycleLength: number;
  savedAt: string;
  reminders: Record<ReminderKey, boolean>;
}

const STORAGE_KEY = "tsoy.ttc.savedCycle";
const STAGE_BG = "--stage-ttc";
const STAGE_ACCENT = "--stage-ttc-accent";

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p
    className="font-sans text-[11px] font-light tracking-[0.24em] uppercase mb-3"
    style={{ color: `hsl(var(${STAGE_ACCENT}))` }}
  >
    {children}
  </p>
);

const OvulationResult = ({
  lmp,
  cycleLength,
  ovulationDay,
  fertileStart,
  fertileEnd,
  testDay,
}: OvulationResultProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const toolPath = location.pathname.includes("/trying-to-conceive/")
    ? "/trying-to-conceive/ovulation-calculator"
    : "/ovulation-calculator";
  const [saved, setSaved] = useState(false);
  const [adjustOpen, setAdjustOpen] = useState(false);
  const [adjustLmp, setAdjustLmp] = useState<string>(lmp.toISOString().slice(0, 10));
  const [adjustCycle, setAdjustCycle] = useState<number>(cycleLength);
  const [reminders, setReminders] = useState<Record<ReminderKey, boolean>>({
    fertile: true,
    ovulation: true,
    test: true,
    period: true,
  });

  const nextPeriod = useMemo(() => addDays(lmp, cycleLength), [lmp, cycleLength]);
  const bestDays = useMemo(
    () => [addDays(ovulationDay, -2), addDays(ovulationDay, -1), ovulationDay],
    [ovulationDay],
  );

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed: SavedCycle = JSON.parse(raw);
      if (
        parsed.lmp === lmp.toISOString().slice(0, 10) &&
        parsed.cycleLength === cycleLength
      ) {
        setSaved(true);
        setReminders(parsed.reminders);
      }
    } catch {
      /* noop */
    }
  }, [lmp, cycleLength]);

  const persist = (next: Partial<SavedCycle>) => {
    const payload: SavedCycle = {
      lmp: lmp.toISOString().slice(0, 10),
      cycleLength,
      savedAt: new Date().toISOString(),
      reminders,
      ...next,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  };

  const handleSave = () => {
    setSaved(true);
    persist({});
  };

  const toggleReminder = (key: ReminderKey) => {
    const next = { ...reminders, [key]: !reminders[key] };
    setReminders(next);
    if (saved) persist({ reminders: next });
  };

  const askLink = (q: string, topic: string) =>
    `/ask?stage=ttc&topic=${topic}&q=${encodeURIComponent(q)}`;

  const askPrompts = [
    { q: "Am I timing this cycle right?", topic: "fertile-window" },
    { q: "What does this fertile window actually mean?", topic: "fertile-window" },
    { q: "When should I test this cycle?", topic: "pregnancy-tests" },
    { q: "What if my cycle length changes?", topic: "cycle-tracking" },
  ];

  const summaryCards: {
    label: string;
    value: string;
    meta: string;
    icon: typeof Egg;
  }[] = [
    {
      label: "Fertile window",
      value: `${format(fertileStart, "d MMM")} – ${format(fertileEnd, "d MMM")}`,
      meta: "The days conception may be more likely.",
      icon: CircleDot,
    },
    {
      label: "Likely ovulation",
      value: format(ovulationDay, "EEE d MMM"),
      meta: `Around day ${cycleLength - 14} of your cycle.`,
      icon: Egg,
    },
    {
      label: "Best days to try",
      value: `${format(bestDays[0], "d")} – ${format(bestDays[2], "d MMM")}`,
      meta: "The two days before ovulation, and the day itself.",
      icon: Target,
    },
    {
      label: "Expected next period",
      value: format(nextPeriod, "EEE d MMM"),
      meta: `Based on a ${cycleLength}-day cycle.`,
      icon: RefreshCw,
    },
    {
      label: "Possible test day",
      value: format(testDay, "EEE d MMM"),
      meta: "Testing may be clearer from around this date.",
      icon: TestTube2,
    },
  ];

  const meaningCards = [
    {
      title: "Your fertile window",
      desc: "These are the days when conception may be more likely, based on your cycle dates.",
    },
    {
      title: "Ovulation can shift",
      desc: "Even with a regular cycle, ovulation can vary from month to month.",
    },
    {
      title: "Use this as a guide",
      desc: "This tool can help with timing, but it cannot confirm ovulation or pregnancy.",
    },
  ];

  const todoRows = [
    {
      title: "Try on the best days",
      desc: `Aim for ${format(bestDays[0], "d")}, ${format(bestDays[1], "d")} and ${format(bestDays[2], "d MMMM")}. Every other day is usually enough.`,
    },
    {
      title: "Notice, but do not overtrack",
      desc: "Signs like discharge, ovulation tests or body temperature can help, but they do not need to take over your day.",
    },
    {
      title: `Test after ${format(nextPeriod, "d MMMM")}`,
      desc: "Testing after your expected period tends to give a clearer result. Earlier tests can show a false negative.",
    },
    {
      title: "Be kind to yourself if it does not happen",
      desc: "One cycle is not a verdict. It can take time, even when timing is right.",
    },
  ];

  const relatedGuidance = [
    {
      label: "Ovulation",
      desc: "Signs, timing and your most fertile days.",
      href: "/trying-to-conceive/ovulation",
      icon: Egg,
    },
    {
      label: "Cycle Tracking",
      desc: "How your cycle works and how to track it without feeling overwhelmed.",
      href: "/trying-to-conceive/cycle-tracking",
      icon: RefreshCw,
    },
    {
      label: "The Two-Week Wait",
      desc: "Support for the wait between ovulation and testing.",
      href: "/trying-to-conceive/two-week-wait",
      icon: Hourglass,
    },
    {
      label: "Pregnancy Tests",
      desc: "When to test and how to read the result calmly.",
      href: "/trying-to-conceive/pregnancy-tests",
      icon: TestTube2,
    },
  ];

  const reminderRows: { key: ReminderKey; label: string; date: string }[] = [
    { key: "fertile", label: "Keep a note for my fertile window", date: format(fertileStart, "d MMMM") },
    { key: "ovulation", label: "Keep a note for likely ovulation", date: format(ovulationDay, "d MMMM") },
    { key: "test", label: "Keep a note for possible test day", date: format(testDay, "d MMMM") },
    { key: "period", label: "Keep a note for expected next period", date: format(nextPeriod, "d MMMM") },
  ];

  return (
    <div>
      {/* ── Result hero summary ────────────────────────────────────── */}
      <section className="relative bg-parchment pt-10 pb-14 md:pt-16 md:pb-20 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-64 -z-0"
          style={{
            background: `linear-gradient(180deg, hsl(var(${STAGE_BG}) / 0.55) 0%, transparent 100%)`,
          }}
        />
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl relative z-10">
          <div className="max-w-2xl mb-10">
            <Eyebrow>Your cycle at a glance</Eyebrow>
            <h2 className="font-serif text-[2rem] sm:text-4xl md:text-[2.75rem] text-foreground leading-[1.08] mb-4">
              Your fertile window <span className="italic font-normal">estimate</span>
            </h2>
            <p className="font-sans text-[15px] sm:text-base font-light text-muted-foreground leading-relaxed">
              A calm view of the days that may matter most this cycle.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {summaryCards.map(({ label, value, meta, icon: Icon }) => (
              <div
                key={label}
                className="relative bg-card rounded-[1.25rem] border p-6 overflow-hidden"
                style={{
                  borderColor: `hsl(var(${STAGE_ACCENT}) / 0.18)`,
                  boxShadow: `0 1px 0 hsl(0 0% 100% / 0.95) inset, 0 12px 30px -22px hsl(var(${STAGE_ACCENT}) / 0.28)`,
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: `linear-gradient(135deg, hsl(var(${STAGE_BG})) 0%, hsl(var(${STAGE_BG}) / 0.55) 100%)`,
                  }}
                >
                  <Icon size={17} strokeWidth={1.5} style={{ color: `hsl(var(${STAGE_ACCENT}))` }} />
                </div>
                <p
                  className="font-sans text-[10.5px] font-light tracking-[0.22em] uppercase mb-2"
                  style={{ color: `hsl(var(${STAGE_ACCENT}))` }}
                >
                  {label}
                </p>
                <p className="font-serif text-[1.35rem] sm:text-[1.5rem] text-foreground leading-snug mb-1.5">
                  {value}
                </p>
                <p className="font-sans text-[13px] text-muted-foreground leading-relaxed">
                  {meta}
                </p>
              </div>
            ))}
          </div>

          <p className="font-serif italic text-[14.5px] text-muted-foreground leading-relaxed mt-8 max-w-2xl">
            These dates are estimates, not a promise. Cycles can vary from month to month.
          </p>

          {/* ── Adjust your dates panel ─────────────────────────── */}
          <div
            className="mt-10 rounded-[1.25rem] border bg-card p-6 sm:p-7"
            style={{
              borderColor: `hsl(var(${STAGE_ACCENT}) / 0.2)`,
              boxShadow: `0 1px 0 hsl(0 0% 100% / 0.95) inset, 0 12px 30px -22px hsl(var(${STAGE_ACCENT}) / 0.24)`,
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="max-w-md">
                <p
                  className="font-sans text-[10.5px] font-medium tracking-[0.22em] uppercase mb-1.5"
                  style={{ color: `hsl(var(${STAGE_ACCENT}))` }}
                >
                  Need to adjust your dates?
                </p>
                <p className="font-sans text-[14px] text-muted-foreground leading-relaxed">
                  Change your last period date or usual cycle length and recalculate your estimate.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAdjustOpen((v) => !v)}
                className="inline-flex items-center justify-center gap-2 rounded-pill border px-5 py-2.5 font-sans text-[13px] font-medium transition-all hover:-translate-y-0.5"
                style={{
                  borderColor: `hsl(var(${STAGE_ACCENT}) / 0.4)`,
                  color: `hsl(var(${STAGE_ACCENT}))`,
                  background: `hsl(var(${STAGE_BG}) / 0.45)`,
                }}
              >
                {adjustOpen ? "Close" : "Adjust my dates"}
              </button>
            </div>

            {adjustOpen && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!adjustLmp) return;
                  const c = Math.max(20, Math.min(45, Number(adjustCycle) || 28));
                  navigate(`${toolPath}?lmp=${adjustLmp}&cycle=${c}`);
                  setAdjustOpen(false);
                  setTimeout(() => {
                    document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
                  }, 50);
                }}
                className="mt-6 grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-4 items-end"
              >
                <label className="block">
                  <span className="font-sans text-[11.5px] font-medium tracking-[0.06em] uppercase text-foreground/75 mb-1.5 block">
                    First day of last period
                  </span>
                  <input
                    type="date"
                    value={adjustLmp}
                    max={format(new Date(), "yyyy-MM-dd")}
                    onChange={(e) => setAdjustLmp(e.target.value)}
                    className="w-full rounded-xl border bg-parchment/60 px-3.5 py-2.5 font-sans text-[14px] text-foreground focus:outline-none focus:ring-2"
                    style={{ borderColor: `hsl(var(${STAGE_ACCENT}) / 0.25)` }}
                  />
                </label>
                <label className="block">
                  <span className="font-sans text-[11.5px] font-medium tracking-[0.06em] uppercase text-foreground/75 mb-1.5 block">
                    Cycle length (days)
                  </span>
                  <input
                    type="number"
                    min={20}
                    max={45}
                    value={adjustCycle}
                    onChange={(e) => setAdjustCycle(Number(e.target.value))}
                    className="w-full rounded-xl border bg-parchment/60 px-3.5 py-2.5 font-sans text-[14px] text-foreground focus:outline-none focus:ring-2"
                    style={{ borderColor: `hsl(var(${STAGE_ACCENT}) / 0.25)` }}
                  />
                </label>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-6 py-3 font-sans text-[13px] font-medium shadow-cta hover:bg-terracotta-hover hover:-translate-y-0.5 transition-all"
                >
                  <RefreshCw size={14} />
                  Recalculate
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── Visual cycle calendar ──────────────────────────────────── */}
      <section className="bg-parchment pb-14 md:pb-20">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
          <div className="mb-6 max-w-xl">
            <Eyebrow>Your cycle calendar</Eyebrow>
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-3">
              A gentle <span className="italic font-normal">month view</span>
            </h2>
            <p className="font-sans text-[14.5px] font-light text-muted-foreground leading-relaxed">
              The days most likely to matter this cycle, mapped onto the month.
            </p>
          </div>
          <OvulationResultCalendar
            lmp={lmp}
            fertileStart={fertileStart}
            fertileEnd={fertileEnd}
            ovulationDay={ovulationDay}
            bestDays={bestDays}
            nextPeriod={nextPeriod}
            testDay={testDay}
          />
        </div>
      </section>

      {/* ── What this estimate means ───────────────────────────────── */}
      <section className="bg-parchment pb-14 md:pb-20">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
          <div className="mb-10 max-w-2xl">
            <Eyebrow>Understanding your results</Eyebrow>
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight">
              What this estimate <span className="italic font-normal">means</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {meaningCards.map(({ title, desc }) => (
              <div
                key={title}
                className="bg-card rounded-[1.5rem] border p-7"
                style={{
                  borderColor: `hsl(var(${STAGE_ACCENT}) / 0.16)`,
                  boxShadow: `0 1px 0 hsl(0 0% 100% / 0.95) inset, 0 14px 36px -24px hsl(var(${STAGE_ACCENT}) / 0.22)`,
                }}
              >
                <h3 className="font-serif text-[1.2rem] text-foreground leading-tight mb-2">
                  {title}
                </h3>
                <p className="font-sans text-[13.5px] font-light text-muted-foreground leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What to do now ─────────────────────────────────────────── */}
      <section className="bg-parchment pb-14 md:pb-20">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
          <div className="mb-8">
            <Eyebrow>This cycle</Eyebrow>
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight">
              What to do <span className="italic font-normal">now</span>
            </h2>
          </div>
          <div
            className="rounded-[1.5rem] border bg-card overflow-hidden"
            style={{ borderColor: `hsl(var(${STAGE_ACCENT}) / 0.16)` }}
          >
            {todoRows.map((r, i, arr) => (
              <div
                key={r.title}
                className={cn("p-6 sm:p-7", i < arr.length - 1 && "border-b")}
                style={
                  i < arr.length - 1
                    ? { borderColor: `hsl(var(${STAGE_ACCENT}) / 0.14)` }
                    : undefined
                }
              >
                <p className="font-serif text-[1.1rem] text-foreground leading-snug mb-1.5">
                  {r.title}
                </p>
                <p className="font-sans text-[14px] font-light text-muted-foreground leading-relaxed">
                  {r.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What's happening for you? ──────────────────────────────── */}
      <section className="bg-parchment pb-14 md:pb-20">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
          <div className="mb-8 max-w-2xl">
            <Eyebrow>Around your expected period</Eyebrow>
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-3">
              What's happening <span className="italic font-normal">for you?</span>
            </h2>
            <p className="font-sans text-[14.5px] font-light text-muted-foreground leading-relaxed">
              Choose the next step that fits where you are now.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <button
              type="button"
              onClick={() => {
                try {
                  localStorage.removeItem(STORAGE_KEY);
                } catch {
                  /* noop */
                }
                navigate(toolPath);
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }, 50);
              }}
              className="group text-left bg-card rounded-[1.5rem] border p-7 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              style={{
                borderColor: `hsl(var(${STAGE_ACCENT}) / 0.18)`,
                boxShadow: `0 1px 0 hsl(0 0% 100% / 0.95) inset, 0 14px 36px -24px hsl(var(${STAGE_ACCENT}) / 0.22)`,
              }}
            >
              <h3 className="font-serif text-[1.2rem] text-foreground leading-tight mb-2">
                My period arrived
              </h3>
              <p className="font-sans text-[13.5px] font-light text-muted-foreground leading-relaxed mb-4">
                Start a new estimate when you are ready.
              </p>
              <span
                className="inline-flex items-center gap-1.5 font-sans text-[12px] font-medium tracking-wide"
                style={{ color: `hsl(var(${STAGE_ACCENT}))` }}
              >
                Start a new cycle
                <ArrowRight size={13} />
              </span>
            </button>

            <Link
              to="/trying-to-conceive/pregnancy-tests"
              className="group text-left bg-card rounded-[1.5rem] border p-7 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              style={{
                borderColor: `hsl(var(${STAGE_ACCENT}) / 0.18)`,
                boxShadow: `0 1px 0 hsl(0 0% 100% / 0.95) inset, 0 14px 36px -24px hsl(var(${STAGE_ACCENT}) / 0.22)`,
              }}
            >
              <h3 className="font-serif text-[1.2rem] text-foreground leading-tight mb-2">
                My period is late
              </h3>
              <p className="font-sans text-[13.5px] font-light text-muted-foreground leading-relaxed mb-4">
                A few days late can feel intense. Learn when testing may be more useful.
              </p>
              <span
                className="inline-flex items-center gap-1.5 font-sans text-[12px] font-medium tracking-wide"
                style={{ color: `hsl(var(${STAGE_ACCENT}))` }}
              >
                Read pregnancy tests guidance
                <ArrowUpRight size={13} />
              </span>
            </Link>

            <div
              className="text-left bg-card rounded-[1.5rem] border p-7"
              style={{
                borderColor: `hsl(var(--lavender) / 0.4)`,
                boxShadow: `0 1px 0 hsl(0 0% 100% / 0.95) inset, 0 14px 36px -24px hsl(var(--lavender) / 0.3)`,
              }}
            >
              <h3 className="font-serif text-[1.2rem] text-foreground leading-tight mb-2">
                I got a positive test
              </h3>
              <p className="font-sans text-[13.5px] font-light text-muted-foreground leading-relaxed mb-4">
                Move into pregnancy guidance when you are ready.
              </p>
              <div className="flex flex-col gap-2">
                <Link
                  to={`/due-date-calculator?lmp=${lmp.toISOString().slice(0, 10)}&from=ttc`}
                  className="inline-flex items-center gap-1.5 font-sans text-[12.5px] font-medium tracking-wide"
                  style={{ color: `hsl(var(--lavender))` }}
                >
                  Calculate my due date
                  <ArrowRight size={13} />
                </Link>
                <Link
                  to="/pregnancy"
                  className="inline-flex items-center gap-1.5 font-sans text-[12px] font-light text-muted-foreground hover:text-foreground transition-colors"
                >
                  Or explore pregnancy guidance
                  <ArrowUpRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Save this cycle ────────────────────────────────────────── */}
      <section
        className="relative py-16 md:py-20 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, hsl(var(${STAGE_BG})) 0%, hsl(var(--sage-bg)) 55%, hsl(var(${STAGE_BG}) / 0.7) 100%)`,
        }}
      >
        <div className="relative container mx-auto px-5 sm:px-6 md:px-10 max-w-2xl">
          <div className="text-center mb-10">
            <div
              className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-card mb-5"
              style={{
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: `hsl(var(${STAGE_ACCENT}) / 0.4)`,
              }}
            >
              <Bookmark size={18} style={{ color: `hsl(var(${STAGE_ACCENT}))` }} />
            </div>
            <Eyebrow>Save to your TTC journey</Eyebrow>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-[2rem] text-foreground leading-tight mb-4">
              Save this <span className="italic font-normal">cycle</span>
            </h2>
            <p className="font-sans text-[15px] text-foreground/85 leading-relaxed max-w-lg mx-auto mb-3">
              Keep this fertile window, likely ovulation day, possible test day and next steps in one place so you can come back when you need to.
            </p>
            <p className="font-sans text-[14px] text-muted-foreground leading-relaxed max-w-lg mx-auto">
              We will help you return to the right guidance for where you are in this cycle, whether you are waiting, testing or starting again.
            </p>
          </div>

          <div
            className="bg-card rounded-2xl mb-7"
            style={{
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: `hsl(var(${STAGE_ACCENT}) / 0.25)`,
            }}
          >
            {reminderRows.map(({ key, label, date }, i, arr) => {
              const on = reminders[key];
              const isLast = i === arr.length - 1;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleReminder(key)}
                  className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 text-left transition-colors first:rounded-t-2xl last:rounded-b-2xl hover:bg-parchment/60"
                  style={
                    isLast
                      ? undefined
                      : { borderBottom: `1px solid hsl(var(${STAGE_ACCENT}) / 0.14)` }
                  }
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors"
                      style={
                        on
                          ? { background: `hsl(var(${STAGE_ACCENT}))`, color: "hsl(0 0% 100%)" }
                          : { background: "hsl(var(--parchment-deeper))", color: "hsl(var(--muted-foreground))" }
                      }
                    >
                      {on ? <Check size={13} /> : <Bell size={12} />}
                    </div>
                    <div className="min-w-0">
                      <p className="font-sans text-[14px] font-light text-foreground leading-tight">
                        {label}
                      </p>
                      <p className="font-sans text-[11.5px] font-light text-muted-foreground mt-0.5">
                        {date}
                      </p>
                    </div>
                  </div>
                  <span
                    className="font-sans text-[10px] font-light tracking-[0.18em] uppercase shrink-0"
                    style={{
                      color: on
                        ? `hsl(var(${STAGE_ACCENT}))`
                        : "hsl(var(--foreground) / 0.35)",
                    }}
                  >
                    {on ? "On" : "Off"}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col items-center gap-4">
            <button
              type="button"
              onClick={handleSave}
              disabled={saved}
              className={cn(
                "inline-flex items-center gap-2 rounded-pill px-8 py-3.5 font-sans text-[13.5px] font-medium transition-all shadow-cta",
                saved
                  ? "bg-sage text-sage-foreground cursor-default"
                  : "bg-terracotta text-terracotta-foreground hover:bg-terracotta-hover hover:-translate-y-0.5",
              )}
            >
              {saved ? <Check size={15} /> : <Bookmark size={15} />}
              {saved ? (
                "Cycle saved"
              ) : (
                <>
                  <span className="hidden sm:inline">Save this cycle to my TTC journey</span>
                  <span className="sm:hidden">Save to my TTC journey</span>
                </>
              )}
            </button>

            {saved && (
              <p className="font-sans text-[13.5px] text-muted-foreground text-center max-w-md leading-relaxed">
                Cycle saved. You can come back to this estimate and your next steps whenever you need them.
              </p>
            )}

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 pt-1">
              <Link
                to="/ask?stage=ttc&topic=fertile-window"
                className="inline-flex items-center gap-1.5 font-sans text-[13px] text-muted-foreground hover:text-foreground transition-colors"
              >
                <MessageCircle size={12} />
                Ask about this cycle
              </Link>
              <Link
                to="/trying-to-conceive"
                className="inline-flex items-center gap-1.5 font-sans text-[13px] text-muted-foreground hover:text-foreground transition-colors"
              >
                Read TTC guidance
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Ask about this cycle ───────────────────────────────────── */}
      <section className="bg-parchment py-14 md:py-20">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
          <div className="mb-8">
            <Eyebrow>AI support</Eyebrow>
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-3">
              Ask about <span className="italic font-normal">this cycle</span>
            </h2>
            <p className="font-sans text-[14.5px] font-light text-muted-foreground leading-relaxed">
              Anything that feels unclear about timing, signs or the wait, ask here.
            </p>
          </div>

          <div className="space-y-3 mb-6">
            {askPrompts.map(({ q, topic }) => (
              <Link
                key={q}
                to={askLink(q, topic)}
                className="group flex items-center gap-3 w-full text-left py-4 px-5 rounded-xl bg-card border transition-all hover:-translate-y-0.5"
                style={{ borderColor: `hsl(var(${STAGE_ACCENT}) / 0.18)` }}
              >
                <Sparkles
                  size={13}
                  className="shrink-0"
                  style={{ color: `hsl(var(${STAGE_ACCENT}))` }}
                />
                <span className="font-sans text-[14px] font-light text-foreground/85 group-hover:text-foreground transition-colors leading-relaxed">
                  {q}
                </span>
              </Link>
            ))}
          </div>

          <Link
            to="/ask?stage=ttc&topic=fertile-window"
            className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[13px] font-medium shadow-cta hover:bg-terracotta-hover transition-all"
          >
            <MessageCircle size={14} />
            Ask now
          </Link>
        </div>
      </section>

      {/* ── Related guidance ───────────────────────────────────────── */}
      <section className="bg-parchment pb-16 md:pb-24">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
          <div className="mb-8">
            <Eyebrow>Keep exploring</Eyebrow>
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight">
              Related <span className="italic font-normal">guidance</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedGuidance.map(({ label, desc, href, icon: Icon }) => (
              <Link
                key={label}
                to={href}
                className="group bg-card rounded-[1.5rem] border p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                style={{
                  borderColor: `hsl(var(${STAGE_ACCENT}) / 0.16)`,
                  boxShadow: `0 1px 0 hsl(0 0% 100% / 0.95) inset, 0 14px 36px -24px hsl(var(${STAGE_ACCENT}) / 0.22)`,
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: `linear-gradient(135deg, hsl(var(${STAGE_BG})) 0%, hsl(var(${STAGE_BG}) / 0.55) 100%)`,
                  }}
                >
                  <Icon size={17} strokeWidth={1.5} style={{ color: `hsl(var(${STAGE_ACCENT}))` }} />
                </div>
                <h3 className="font-serif text-[1.15rem] text-foreground leading-tight mb-1.5">
                  {label}
                </h3>
                <p className="font-sans text-[13px] font-light text-muted-foreground leading-relaxed mb-4">
                  {desc}
                </p>
                <span
                  className="inline-flex items-center gap-1.5 font-sans text-[12px] font-medium tracking-wide"
                  style={{ color: `hsl(var(${STAGE_ACCENT}))` }}
                >
                  Read more
                  <ArrowUpRight size={13} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OvulationResult;
