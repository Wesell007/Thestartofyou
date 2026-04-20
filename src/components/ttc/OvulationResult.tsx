import { format, addDays, differenceInCalendarDays, isAfter, isBefore } from "date-fns";
import { ArrowRight, Bell, BellRing, Bookmark, Check, MessageCircle, Sparkles, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import botanicalSrc from "@/assets/botanical-corner.png";

/* ── Restrained botanical accent ───────────────────────────────────── */
const BotanicalAccent = ({
  className,
  flip = false,
  opacity = "opacity-[0.18]",
}: {
  className?: string;
  flip?: boolean;
  opacity?: string;
}) => (
  <img
    src={botanicalSrc}
    alt=""
    aria-hidden="true"
    className={cn(
      "pointer-events-none absolute select-none w-[180px] md:w-[260px] h-auto",
      opacity,
      flip && "-scale-x-100",
      className
    )}
  />
);

/* ── Soft sprig (small, single leaf-like mark) ─────────────────────── */
const Sprig = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 64 64"
    aria-hidden="true"
    className={cn("pointer-events-none select-none text-sage/40", className)}
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
  >
    <path d="M32 60 C 32 40, 32 24, 32 6" />
    <path d="M32 46 C 24 44, 18 40, 16 32" />
    <path d="M32 36 C 40 34, 46 30, 48 22" />
    <path d="M32 26 C 26 24, 22 20, 21 14" />
    <path d="M32 18 C 38 16, 42 12, 43 8" />
  </svg>
);

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

const OvulationResult = ({
  lmp,
  cycleLength,
  ovulationDay,
  fertileStart,
  fertileEnd,
  testDay,
}: OvulationResultProps) => {
  const navigate = useNavigate();
  const [reveal, setReveal] = useState(true);
  const [saved, setSaved] = useState(false);
  const [reminders, setReminders] = useState<Record<ReminderKey, boolean>>({
    fertile: true,
    ovulation: true,
    test: true,
    period: true,
  });
  const [showTransition, setShowTransition] = useState(false);

  // Expected next period
  const nextPeriod = useMemo(() => addDays(lmp, cycleLength), [lmp, cycleLength]);
  const today = useMemo(() => new Date(), []);
  const periodIsLate = isAfter(today, addDays(nextPeriod, 0));
  const daysToOvulation = differenceInCalendarDays(ovulationDay, today);
  const daysToPeriod = differenceInCalendarDays(nextPeriod, today);

  // Best 3 days to try (ovulation -2, -1, ovulation)
  const bestDays = [addDays(ovulationDay, -2), addDays(ovulationDay, -1), ovulationDay];

  useEffect(() => {
    const t = setTimeout(() => setReveal(false), 4200);
    return () => clearTimeout(t);
  }, []);

  // Hydrate saved state
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed: SavedCycle = JSON.parse(raw);
      if (parsed.lmp === lmp.toISOString().slice(0, 10) && parsed.cycleLength === cycleLength) {
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

  const suggestedPrompts = [
    "Am I timing this cycle right?",
    "What does the fertile window actually mean?",
    "When should I test this cycle?",
  ];

  const askLink = (q: string) =>
    `/ask?q=${encodeURIComponent(q)}&ctx=${encodeURIComponent("Trying to conceive — this cycle")}`;

  const supportingDates = [
    { label: "Likely ovulation", value: format(ovulationDay, "d MMMM"), meta: `Around day ${cycleLength - 14} of your cycle` },
    { label: "Best days to try", value: `${format(bestDays[0], "d")} – ${format(bestDays[2], "d MMMM")}`, meta: "The two days before ovulation, and the day itself" },
    { label: "Expected next period", value: format(nextPeriod, "d MMMM"), meta: daysToPeriod >= 0 ? `In ${daysToPeriod} days` : `${Math.abs(daysToPeriod)} days late` },
  ];

  return (
    <div>
      {/* ── Primary result ──────────────────────────────────────────── */}
      <section className="relative bg-parchment-dark pt-28 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* ambient glow */}
        <div className="absolute inset-x-0 top-0 h-[420px] glow-sage opacity-60 pointer-events-none" aria-hidden="true" />
        <div className="relative container mx-auto px-6 md:px-10 max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 mb-7">
            {reveal && (
              <Sparkles size={13} className="text-sage animate-sparkle-fade" aria-hidden="true" />
            )}
            <p className="font-sans text-[11px] font-light tracking-[0.24em] uppercase text-sage">
              Here's where you are this cycle
            </p>
            {reveal && (
              <Sparkles size={13} className="text-sage animate-sparkle-fade" aria-hidden="true" />
            )}
          </div>

          <p className="font-serif text-lg sm:text-xl text-foreground/60 italic leading-snug mb-5">
            Your fertile window opens
          </p>
          <h1
            className={cn(
              "font-serif text-[2.75rem] sm:text-6xl md:text-7xl text-foreground leading-[1.05] tracking-tight mb-6",
              reveal && "animate-result-shimmer"
            )}
          >
            {format(fertileStart, "d MMMM")}
          </h1>
          <div className="flanking-lines mb-6">
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted whitespace-nowrap">
              through {format(fertileEnd, "d MMMM")}
            </p>
          </div>
          <p className="font-sans text-base sm:text-[17px] font-light text-foreground/65 leading-relaxed max-w-lg mx-auto mb-14">
            A quiet map of the days ahead. Hold it gently — bodies don't always follow the calendar, and that's part of this.
          </p>

          {/* Supporting dates — elegant inline rhythm, not a card grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border/40 rounded-2xl overflow-hidden border border-border/40 shadow-card-brand">
            {supportingDates.map((d) => (
              <div key={d.label} className="bg-card/80 backdrop-blur-sm px-6 py-7 text-left">
                <p className="font-sans text-[10px] font-light tracking-[0.22em] uppercase text-sage-muted mb-2.5">
                  {d.label}
                </p>
                <p className="font-serif text-lg text-foreground leading-snug mb-1.5">{d.value}</p>
                <p className="font-sans text-xs font-light text-foreground/55 leading-relaxed">{d.meta}</p>
              </div>
            ))}
          </div>

          <p className="font-serif italic text-[15px] text-foreground/55 leading-relaxed mt-10 max-w-xl mx-auto">
            These dates are a gentle estimate based on a {cycleLength}-day cycle. Ovulation can shift from month to month, and that is completely normal.
          </p>
        </div>
      </section>

      {/* ── What this means ─────────────────────────────────────────── */}
      <section className="bg-parchment py-16 md:py-20">
        <div className="container mx-auto px-6 md:px-10 max-w-3xl">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
            Understanding your results
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-snug mb-8">
            What the fertile window means
          </h2>
          <div className="space-y-0">
            {[
              "These are the days you're most likely to conceive — sperm can survive up to five days inside the body.",
              "The two days before ovulation tend to matter more than ovulation day itself.",
              "These are estimates, not guarantees. Cycles vary, and that doesn't mean anything is wrong.",
            ].map((item, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-start gap-5 py-6",
                  i < 2 && "border-b border-border/30"
                )}
              >
                <div className="w-8 h-8 rounded-full bg-sage-bg/40 border border-sage-light/30 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="font-serif text-xs text-sage">{i + 1}</span>
                </div>
                <p className="font-sans text-[15px] font-light text-foreground/75 leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What to do this cycle ───────────────────────────────────── */}
      <section className="bg-parchment-dark py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-10 max-w-2xl">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
            This cycle
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-snug mb-10">
            What to do now
          </h2>
          <div className="space-y-0">
            {[
              {
                title: "Try on the best days",
                desc: `Aim for ${format(bestDays[0], "d")}, ${format(bestDays[1], "d")} and ${format(bestDays[2], "d MMMM")}. Every other day is usually enough.`,
              },
              {
                title: `Test on or after ${format(testDay, "d MMMM")}`,
                desc: "Earlier tests can show a false negative. First morning urine gives the clearest result.",
              },
              {
                title: "Don't overtrack every signal",
                desc: "Symptom spotting in the two-week wait often adds anxiety without adding clarity.",
              },
              {
                title: "Be kind to yourself if it doesn't happen",
                desc: "Healthy couples can take several cycles. One month is data, not a verdict.",
              },
            ].map((item, i, arr) => (
              <div
                key={item.title}
                className={cn(
                  "py-7",
                  i < arr.length - 1 && "border-b border-border/30"
                )}
              >
                <p className="font-serif text-lg text-foreground leading-snug mb-2">{item.title}</p>
                <p className="font-sans text-[15px] font-light text-foreground/65 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Save this cycle (primary CTA) ───────────────────────────── */}
      <section className="relative bg-parchment py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[520px] glow-sage opacity-50 pointer-events-none" aria-hidden="true" />
        <div className="relative container mx-auto px-6 md:px-10 max-w-2xl">
          {/* Editorial intro, no card frame */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-card border border-sage-light/50 shadow-card-brand mb-6">
              <Bookmark size={16} className="text-sage" />
            </div>
            <p className="font-sans text-[11px] font-light tracking-[0.24em] uppercase text-sage mb-4">
              The start of a calmer monthly rhythm
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-5">
              Save this cycle
            </h2>
            <p className="font-sans text-[16px] font-light text-foreground/65 leading-relaxed max-w-lg mx-auto">
              Keep your fertile window, ovulation day and expected period in one place. We'll quietly check in on the days that matter, so you don't have to hold it all in your head.
            </p>
          </div>

          {/* Reminder list — light dividers, no boxes */}
          <div className="bg-card/70 backdrop-blur-sm border border-border/40 rounded-2xl shadow-card-brand divide-y divide-border/40 mb-8">
            {([
              { key: "fertile" as const, label: "When my fertile window opens", date: format(fertileStart, "d MMMM") },
              { key: "ovulation" as const, label: "Around my likely ovulation day", date: format(ovulationDay, "d MMMM") },
              { key: "test" as const, label: "When testing makes sense", date: format(testDay, "d MMMM") },
              { key: "period" as const, label: "When my next period is due", date: format(nextPeriod, "d MMMM") },
            ]).map(({ key, label, date }) => {
              const on = reminders[key];
              return (
                <button
                  key={key}
                  onClick={() => toggleReminder(key)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-sage-bg/20 transition-colors first:rounded-t-2xl last:rounded-b-2xl"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div
                      className={cn(
                        "w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors",
                        on ? "bg-sage text-sage-foreground" : "bg-parchment-deeper text-muted-foreground"
                      )}
                    >
                      {on ? <Check size={14} /> : <Bell size={13} />}
                    </div>
                    <div className="min-w-0">
                      <p className="font-sans text-[15px] font-light text-foreground leading-tight">{label}</p>
                      <p className="font-sans text-xs font-light text-foreground/55 mt-1">{date}</p>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "font-sans text-[10px] font-light tracking-[0.18em] uppercase shrink-0",
                      on ? "text-sage" : "text-foreground/35"
                    )}
                  >
                    {on ? "On" : "Off"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Primary action, centred and given space */}
          <div className="flex flex-col items-center gap-5">
            <button
              onClick={handleSave}
              disabled={saved}
              className={cn(
                "inline-flex items-center gap-2.5 rounded-pill px-9 py-4 font-sans text-[15px] font-medium transition-all shadow-cta",
                saved
                  ? "bg-sage text-sage-foreground cursor-default"
                  : "bg-terracotta text-terracotta-foreground hover:bg-terracotta-hover hover:scale-[1.02]"
              )}
            >
              {saved ? <Check size={16} /> : <Bookmark size={16} />}
              {saved ? "Cycle saved" : "Save this cycle"}
            </button>

            {saved && (
              <p className="font-sans text-xs font-light text-sage flex items-center gap-1.5 animate-fade-in">
                <BellRing size={12} />
                We'll quietly check in on the dates you've turned on.
              </p>
            )}

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-2">
              <Link
                to={askLink("Help me understand this cycle")}
                className="inline-flex items-center gap-1.5 font-sans text-sm font-light text-foreground/70 hover:text-foreground transition-colors"
              >
                <MessageCircle size={13} />
                Ask about this cycle
              </Link>
              <Link
                to="/trying-to-conceive"
                className="inline-flex items-center gap-1.5 font-sans text-sm font-light text-foreground/70 hover:text-foreground transition-colors"
              >
                Read TTC guidance
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── End-of-cycle transition ─────────────────────────────────── */}
      <section className="bg-parchment-dark py-16 md:py-20">
        <div className="container mx-auto px-6 md:px-10 max-w-3xl">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
            When your period is due
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-snug mb-4">
            What's happening for you?
          </h2>
          <p className="font-sans text-[15px] font-light text-foreground/70 leading-relaxed mb-7 max-w-xl">
            Around {format(nextPeriod, "d MMMM")}, come back and tell us where you are. We'll point you to the right next step — gently, with no assumptions.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => setShowTransition(true)}
              className="group text-left bg-card border border-border/50 rounded-2xl p-6 shadow-card-brand hover:border-sage-light/50 transition-all"
            >
              <p className="font-serif text-lg text-foreground leading-snug mb-2">My period arrived</p>
              <p className="font-sans text-sm font-light text-foreground/65 leading-relaxed">
                Start the next cycle when you're ready.
              </p>
            </button>
            <button
              onClick={() => setShowTransition(true)}
              className="group text-left bg-card border border-border/50 rounded-2xl p-6 shadow-card-brand hover:border-sage-light/50 transition-all"
            >
              <p className="font-serif text-lg text-foreground leading-snug mb-2">My period is late</p>
              <p className="font-sans text-sm font-light text-foreground/65 leading-relaxed">
                A few days late is common. Here's what to do.
              </p>
            </button>
            <button
              onClick={() => setShowTransition(true)}
              className="group text-left bg-card border border-lavender/40 rounded-2xl p-6 shadow-card-brand hover:border-lavender transition-all"
            >
              <p className="font-serif text-lg text-foreground leading-snug mb-2">I got a positive test</p>
              <p className="font-sans text-sm font-light text-foreground/65 leading-relaxed">
                Move into pregnancy tracking when you're ready.
              </p>
            </button>
          </div>
        </div>
      </section>

      {/* ── AI support ──────────────────────────────────────────────── */}
      <section className="bg-parchment py-16 md:py-20">
        <div className="container mx-auto px-6 md:px-10 max-w-3xl">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
            AI support
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-snug mb-4">
            Ask about this cycle
          </h2>
          <p className="font-sans text-[15px] font-light text-foreground/70 leading-relaxed mb-7">
            Anything that feels unclear — timing, signs, the wait — ask here.
          </p>

          <div className="space-y-3 mb-6">
            {suggestedPrompts.map((prompt) => (
              <Link
                key={prompt}
                to={askLink(prompt)}
                className="group flex items-center gap-3 w-full text-left py-4 px-5 rounded-xl border border-border/40 bg-card/60 hover:border-sage/40 hover:bg-card shadow-card-brand transition-all"
              >
                <MessageCircle size={13} className="text-sage shrink-0" />
                <span className="font-sans text-sm font-light text-foreground/85 group-hover:text-foreground transition-colors leading-relaxed">
                  {prompt}
                </span>
              </Link>
            ))}
          </div>

          <Link
            to={askLink("I have a question about my cycle")}
            className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
          >
            <ArrowRight size={15} />
            Ask now
          </Link>
        </div>
      </section>

      {/* ── Continue your journey ───────────────────────────────────── */}
      <section className="bg-parchment-dark py-16 md:py-20">
        <div className="container mx-auto px-6 md:px-10 max-w-3xl">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
            Continue your journey
          </p>
          <div className="space-y-3">
            {[
              { label: "Understanding ovulation", to: "/trying-to-conceive/understanding-your-cycle" },
              { label: "Waiting and testing", to: "/trying-to-conceive/waiting-and-testing" },
              { label: "Timing and tracking", to: "/trying-to-conceive/timing-and-tracking" },
            ].map((p) => (
              <Link
                key={p.to}
                to={p.to}
                className="group flex items-center justify-between py-5 px-6 rounded-xl border border-border/40 bg-card/60 hover:border-sage/40 hover:bg-card shadow-card-brand transition-all"
              >
                <span className="font-sans text-[15px] font-light text-foreground/85 group-hover:text-foreground transition-colors">
                  {p.label}
                </span>
                <ArrowRight size={14} className="text-sage-muted group-hover:text-sage transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Transition modal ────────────────────────────────────────── */}
      {showTransition && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-foreground/30 backdrop-blur-sm"
          onClick={() => setShowTransition(false)}
        >
          <div
            className="bg-card rounded-3xl shadow-soft max-w-lg w-full p-8 md:p-10 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowTransition(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:bg-foreground/5 transition-colors"
              aria-label="Close"
            >
              <X size={16} />
            </button>

            <p className="font-sans text-[11px] font-light tracking-[0.2em] uppercase text-sage-muted mb-3">
              Where are you now?
            </p>
            <h3 className="font-serif text-2xl text-foreground leading-snug mb-4">
              Tell us what happened this cycle
            </h3>
            <p className="font-sans text-sm font-light text-foreground/70 leading-relaxed mb-6">
              No assumptions. Choose what's true for you and we'll take you to the right place — calmly.
            </p>

            <div className="space-y-2.5">
              <button
                onClick={() => {
                  // Reset for next cycle: clear save, send back to inputs
                  localStorage.removeItem(STORAGE_KEY);
                  navigate("/trying-to-conceive#calculator");
                }}
                className="w-full text-left px-5 py-4 rounded-xl border border-border/50 bg-parchment/60 hover:border-sage-light/50 transition-all"
              >
                <p className="font-sans text-sm font-medium text-foreground mb-0.5">My period arrived</p>
                <p className="font-sans text-xs font-light text-muted-foreground">Start a fresh cycle calculation.</p>
              </button>
              <Link
                to={askLink("My period is late — what should I do?")}
                className="block w-full text-left px-5 py-4 rounded-xl border border-border/50 bg-parchment/60 hover:border-sage-light/50 transition-all"
              >
                <p className="font-sans text-sm font-medium text-foreground mb-0.5">My period is late</p>
                <p className="font-sans text-xs font-light text-muted-foreground">Get gentle guidance on what to do next.</p>
              </Link>
              <button
                onClick={() => {
                  // Move to due date flow, prefilling LMP
                  const lmpStr = lmp.toISOString().slice(0, 10);
                  navigate(`/due-date-calculator?lmp=${lmpStr}&from=ttc`);
                }}
                className="w-full text-left px-5 py-4 rounded-xl border border-lavender/40 bg-lavender-bg/30 hover:border-lavender transition-all"
              >
                <p className="font-sans text-sm font-medium text-foreground mb-0.5">I got a positive test</p>
                <p className="font-sans text-xs font-light text-foreground/70">
                  Move into the pregnancy journey — we'll calculate your due date next.
                </p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OvulationResult;
