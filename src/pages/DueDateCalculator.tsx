import { useState } from "react";
import { format, addDays, differenceInDays, differenceInWeeks, isAfter, isBefore } from "date-fns";
import { CalendarIcon, ArrowRight, Baby } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// ─── Milestone definitions ─────────────────────────────────────────────────
const MILESTONES = [
  { week: 8,  label: "First scan window",       detail: "Typically 8–10 weeks" },
  { week: 12, label: "12-week scan",             detail: "Nuchal translucency screening" },
  { week: 16, label: "Midwife appointment",      detail: "Routine antenatal check" },
  { week: 20, label: "20-week scan",             detail: "Anatomy and anomaly screening" },
  { week: 24, label: "Glucose tolerance test",   detail: "Usually offered 24–28 weeks" },
  { week: 28, label: "Third trimester begins",   detail: "Final stage of pregnancy" },
  { week: 32, label: "Growth scan (if needed)",  detail: "Monitoring size and position" },
  { week: 36, label: "Antenatal check",          detail: "Positioning and birth planning" },
  { week: 38, label: "Weekly midwife checks",    detail: "Monitoring as birth approaches" },
  { week: 40, label: "Estimated due date",       detail: "Your baby is full term" },
];

const getTrimesterLabel = (week: number) => {
  if (week <= 12) return "First Trimester";
  if (week <= 27) return "Second Trimester";
  return "Third Trimester";
};

const getTrimesterPath = (week: number) => {
  if (week <= 12) return "/pregnancy/first-trimester";
  if (week <= 27) return "/pregnancy/second-trimester";
  return "/pregnancy/third-trimester";
};

interface CalcResult {
  currentWeek: number;
  currentDay: number;
  daysRemaining: number;
  dueDate: Date;
  trimester: string;
  trimesterPath: string;
  upcomingMilestones: typeof MILESTONES;
}

const calculate = (lmp: Date): CalcResult => {
  const dueDate = addDays(lmp, 280); // 40 weeks
  const today = new Date();
  const daysSinceLMP = differenceInDays(today, lmp);
  const currentWeek = Math.min(Math.max(Math.floor(daysSinceLMP / 7) + 1, 1), 40);
  const currentDay = daysSinceLMP % 7;
  const daysRemaining = Math.max(differenceInDays(dueDate, today), 0);
  const trimester = getTrimesterLabel(currentWeek);
  const trimesterPath = getTrimesterPath(currentWeek);

  const upcomingMilestones = MILESTONES.filter(
    (m) => m.week >= currentWeek
  ).slice(0, 3);

  return { currentWeek, currentDay, daysRemaining, dueDate, trimester, trimesterPath, upcomingMilestones };
};

// ─── Component ─────────────────────────────────────────────────────────────
const DueDateCalculator = () => {
  const [lmp, setLmp] = useState<Date | undefined>();
  const [result, setResult] = useState<CalcResult | null>(null);
  const [open, setOpen] = useState(false);

  const handleSelect = (date: Date | undefined) => {
    setLmp(date);
    setOpen(false);
    if (date) {
      const today = new Date();
      if (isBefore(date, today) && isAfter(date, addDays(today, -300))) {
        setResult(calculate(date));
      } else {
        setResult(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
            Tools
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-foreground leading-tight mb-6">
            Due date calculator
          </h1>
          <p className="font-sans text-base sm:text-lg font-light text-muted-foreground leading-relaxed max-w-lg mx-auto">
            Enter the first day of your last period to see where you are in your pregnancy — and what's ahead.
          </p>
        </div>
      </section>

      {/* ── Input ─────────────────────────────────────────────────────────── */}
      <section className="pb-20 md:pb-24">
        <div className="container mx-auto px-6 md:px-10 max-w-xl">
          <div className="bg-card border border-border/60 rounded-2xl p-8 md:p-10 shadow-card-brand">
            <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-3">
              First day of last period
            </p>
            <p className="font-sans text-sm font-light text-muted-foreground mb-7 leading-relaxed">
              Pregnancy is dated from the first day of your last menstrual period — even before conception occurs.
            </p>

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <button
                  className={cn(
                    "w-full flex items-center justify-between bg-parchment border border-border/60 rounded-xl px-5 py-4 font-sans text-sm font-light transition-all hover:border-sage/40 focus:outline-none focus:border-sage/50",
                    lmp ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  <span>{lmp ? format(lmp, "d MMMM yyyy") : "Select a date"}</span>
                  <CalendarIcon size={15} className="text-sage-muted" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 border border-border/60 shadow-soft rounded-xl" align="center">
                <Calendar
                  mode="single"
                  selected={lmp}
                  onSelect={handleSelect}
                  disabled={(date) =>
                    date > new Date() || date < addDays(new Date(), -300)
                  }
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>

            {lmp && !result && (
              <p className="font-sans text-xs font-light text-terracotta mt-4">
                Please enter a date within the last 280 days.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── Results ───────────────────────────────────────────────────────── */}
      {result && (
        <>
          {/* Key stats */}
          <section className="pb-20 md:pb-24">
            <div className="container mx-auto px-6 md:px-10 max-w-3xl">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {/* Current week */}
                <div className="bg-card border border-border/60 rounded-2xl p-7 shadow-card-brand text-center">
                  <p className="font-sans text-[10px] font-medium tracking-widest uppercase text-sage-muted mb-3">
                    You are
                  </p>
                  <p className="font-serif text-5xl text-foreground mb-1">
                    {result.currentWeek}
                  </p>
                  <p className="font-sans text-sm font-light text-muted-foreground">
                    weeks pregnant
                  </p>
                  {result.currentDay > 0 && (
                    <p className="font-sans text-xs font-light text-sage-muted mt-1">
                      + {result.currentDay} day{result.currentDay !== 1 ? "s" : ""}
                    </p>
                  )}
                </div>

                {/* Trimester */}
                <div className="bg-card border border-border/60 rounded-2xl p-7 shadow-card-brand text-center">
                  <p className="font-sans text-[10px] font-medium tracking-widest uppercase text-sage-muted mb-3">
                    Stage
                  </p>
                  <p className="font-serif text-xl text-foreground leading-snug mb-2">
                    {result.trimester}
                  </p>
                  <Link
                    to={result.trimesterPath}
                    className="font-sans text-xs font-light text-sage hover:text-sage-muted transition-colors underline underline-offset-4"
                  >
                    View guide →
                  </Link>
                </div>

                {/* Days remaining */}
                <div className="bg-card border border-border/60 rounded-2xl p-7 shadow-card-brand text-center">
                  <p className="font-sans text-[10px] font-medium tracking-widest uppercase text-sage-muted mb-3">
                    Days until due date
                  </p>
                  <p className="font-serif text-5xl text-foreground mb-1">
                    {result.daysRemaining}
                  </p>
                  <p className="font-sans text-sm font-light text-muted-foreground">
                    {format(result.dueDate, "d MMMM yyyy")}
                  </p>
                </div>
              </div>

              {/* This week link */}
              <div className="text-center">
                <Link
                  to={`/pregnancy/week/${result.currentWeek}`}
                  className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
                >
                  See week {result.currentWeek} guidance
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </section>

          {/* Progress bar */}
          <section className="pb-20 md:pb-24">
            <div className="container mx-auto px-6 md:px-10 max-w-3xl">
              <div className="bg-card border border-border/60 rounded-2xl p-7 md:p-9 shadow-card-brand">
                <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-6">
                  Your journey so far
                </p>
                <div className="relative">
                  <div className="w-full bg-parchment-dark rounded-full h-1.5">
                    <div
                      className="bg-sage rounded-full h-1.5 transition-all duration-700"
                      style={{ width: `${(result.currentWeek / 40) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-3">
                    <span className="font-sans text-[10px] font-light text-sage-muted">Week 1</span>
                    <span className="font-sans text-[10px] font-light text-sage-muted">Week 40</span>
                  </div>
                </div>
                <p className="font-sans text-xs font-light text-muted-foreground mt-4">
                  Week {result.currentWeek} of 40 — {Math.round((result.currentWeek / 40) * 100)}% of the journey
                </p>
              </div>
            </div>
          </section>

          {/* Upcoming milestones */}
          <section className="pb-24 md:pb-32">
            <div className="container mx-auto px-6 md:px-10 max-w-3xl">
              <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
                What's ahead
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-snug mb-10">
                Your next milestones
              </h2>

              <div className="space-y-4">
                {result.upcomingMilestones.map((m, i) => {
                  const milestoneDate = addDays(lmp!, m.week * 7);
                  const daysAway = differenceInDays(milestoneDate, new Date());
                  return (
                    <div
                      key={m.week}
                      className="flex items-center gap-6 bg-card border border-border/60 rounded-2xl px-7 py-6 shadow-card-brand"
                    >
                      <div className="shrink-0 w-10 h-10 rounded-full bg-sage-bg/40 border border-sage-light/30 flex items-center justify-center">
                        <span className="font-serif text-sm text-sage">{m.week}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-sans text-sm font-medium text-foreground mb-0.5">
                          {m.label}
                        </p>
                        <p className="font-sans text-xs font-light text-muted-foreground">
                          {m.detail}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-sans text-sm font-light text-foreground">
                          {format(milestoneDate, "d MMM")}
                        </p>
                        <p className="font-sans text-[10px] font-light text-sage-muted mt-0.5">
                          {daysAway > 0 ? `in ${daysAway} days` : daysAway === 0 ? "today" : "passed"}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="font-sans text-xs font-light text-muted-foreground mt-8 text-center leading-relaxed">
                ✔ Dates are estimates based on a standard 40-week pregnancy. Your care team will confirm all appointment timing.
              </p>
            </div>
          </section>

          {/* CTA — enter journey */}
          <section className="bg-parchment-dark py-24 md:py-32">
            <div className="container mx-auto px-6 md:px-10 max-w-2xl text-center">
              <div className="w-10 h-10 rounded-full bg-sage-bg/50 border border-sage-light/30 flex items-center justify-center mx-auto mb-8">
                <Baby size={16} className="text-sage" />
              </div>
              <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
                Your journey
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-5">
                Follow your pregnancy week by week
              </h2>
              <p className="font-sans text-base font-light text-muted-foreground leading-relaxed max-w-md mx-auto mb-10">
                Guidance tailored to where you are — every week, from now until birth.
              </p>
              <Link
                to={`/pregnancy/week/${result.currentWeek}`}
                className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-8 py-4 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
              >
                Start at week {result.currentWeek}
                <ArrowRight size={15} />
              </Link>
            </div>
          </section>
        </>
      )}

      {/* Empty state — no date selected yet */}
      {!result && !lmp && (
        <section className="pb-32">
          <div className="container mx-auto px-6 md:px-10 max-w-xl text-center">
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
              Enter a date above to see your results.
            </p>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default DueDateCalculator;
