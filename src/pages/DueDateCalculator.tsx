import { useState } from "react";
import {
  format,
  addDays,
  differenceInDays,
  isAfter,
  isBefore,
} from "date-fns";
import { CalendarIcon, ArrowRight, MessageCircle, BookOpen, ArrowUpRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// ─── Types ──────────────────────────────────────────────────────────────────

type Method = "lmp" | "conception" | "ivf" | "ultrasound";
type IVFType = "3day" | "5day";

interface CalcResult {
  currentWeek: number;
  currentDay: number;
  daysRemaining: number;
  dueDate: Date;
  trimester: string;
  trimesterLabel: string;
  trimesterPath: string;
  upcomingMilestones: Milestone[];
  weekInsight: { whatThisMeans: string; whatToExpect: string[] };
}

interface Milestone {
  week: number;
  label: string;
  detail: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const MILESTONES: Milestone[] = [
  { week: 8,  label: "First scan window",      detail: "Typically 8–10 weeks" },
  { week: 12, label: "12-week scan",            detail: "Nuchal translucency screening" },
  { week: 16, label: "Midwife appointment",     detail: "Routine antenatal check" },
  { week: 20, label: "20-week scan",            detail: "Anatomy and anomaly screening" },
  { week: 24, label: "Glucose tolerance test",  detail: "Usually offered 24–28 weeks" },
  { week: 28, label: "Third trimester begins",  detail: "Final stage of pregnancy" },
  { week: 32, label: "Growth scan",             detail: "Monitoring size and position" },
  { week: 36, label: "Antenatal check",         detail: "Positioning and birth planning" },
  { week: 38, label: "Weekly midwife checks",   detail: "Monitoring as birth approaches" },
  { week: 40, label: "Estimated due date",      detail: "Your baby is full term" },
];

const getWeekInsight = (week: number): { whatThisMeans: string; whatToExpect: string[] } => {
  if (week <= 6) return {
    whatThisMeans: "You're in very early pregnancy. Most changes are happening internally — your body is working hard even if it doesn't feel that way yet.",
    whatToExpect: ["Fatigue that arrives without warning", "Breast tenderness or sensitivity", "Nausea may begin around week 6", "Heightened sense of smell"],
  };
  if (week <= 12) return {
    whatThisMeans: "You're in the first trimester. Your baby is developing rapidly, and your body is adjusting to significant hormonal shifts.",
    whatToExpect: ["Morning sickness and nausea", "Fatigue and increased need for rest", "Emotional sensitivity and mood changes", "Bloating and early digestive changes"],
  };
  if (week <= 16) return {
    whatThisMeans: "You're moving through the first trimester transition. Many people begin to feel a shift in energy and nausea as this phase progresses.",
    whatToExpect: ["Nausea beginning to ease for many", "Energy levels starting to improve", "First signs of a visible bump", "Increased appetite"],
  };
  if (week <= 27) return {
    whatThisMeans: "You're in the second trimester — often described as the most manageable phase. Your bump is growing and your baby is becoming increasingly active.",
    whatToExpect: ["Baby movement beginning (quickening)", "More visible bump development", "Round ligament discomfort", "Improved energy compared to the first trimester"],
  };
  if (week <= 32) return {
    whatThisMeans: "You're in the third trimester. Your baby is gaining weight and preparing for birth. Your body is doing significant work to support this.",
    whatToExpect: ["Increased back pressure and discomfort", "Braxton Hicks contractions", "Sleep becoming more difficult", "Shortness of breath as baby grows"],
  };
  return {
    whatThisMeans: "You're in the final weeks of pregnancy. Your baby is fully formed and preparing for birth. Each week brings you closer.",
    whatToExpect: ["Nesting instinct may increase", "Pelvic pressure as baby descends", "Frequent Braxton Hicks", "Increased visits with your care team"],
  };
};

const getTrimesterInfo = (week: number): { label: string; display: string; path: string } => {
  if (week <= 12) return { label: "early", display: "First Trimester", path: "/pregnancy/first-trimester" };
  if (week <= 27) return { label: "mid", display: "Second Trimester", path: "/pregnancy/second-trimester" };
  return { label: "late", display: "Third Trimester", path: "/pregnancy/third-trimester" };
};

// ─── Calculation logic ───────────────────────────────────────────────────────

const calculateFromLMP = (lmp: Date): CalcResult => {
  const dueDate = addDays(lmp, 280);
  const today = new Date();
  const daysSinceLMP = differenceInDays(today, lmp);
  const currentWeek = Math.min(Math.max(Math.floor(daysSinceLMP / 7) + 1, 1), 40);
  const currentDay = Math.max(daysSinceLMP % 7, 0);
  const daysRemaining = Math.max(differenceInDays(dueDate, today), 0);
  const tri = getTrimesterInfo(currentWeek);
  const upcomingMilestones = MILESTONES.filter((m) => m.week >= currentWeek).slice(0, 3);
  return {
    currentWeek,
    currentDay,
    daysRemaining,
    dueDate,
    trimester: tri.display,
    trimesterLabel: tri.label,
    trimesterPath: tri.path,
    upcomingMilestones,
    weekInsight: getWeekInsight(currentWeek),
  };
};

// ─── Date Picker ─────────────────────────────────────────────────────────────

const DatePickerInput = ({
  label,
  value,
  onChange,
  disabledAfter,
  disabledBefore,
}: {
  label: string;
  value: Date | undefined;
  onChange: (d: Date | undefined) => void;
  disabledAfter?: Date;
  disabledBefore?: Date;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-3">
        {label}
      </p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            className={cn(
              "w-full flex items-center justify-between bg-parchment border border-border/60 rounded-xl px-5 py-4 font-sans text-sm font-light transition-all hover:border-sage/40 focus:outline-none focus:border-sage/50",
              value ? "text-foreground" : "text-muted-foreground"
            )}
          >
            <span>{value ? format(value, "d MMMM yyyy") : "Select a date"}</span>
            <CalendarIcon size={15} className="text-sage-muted" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 border border-border/60 shadow-soft rounded-xl" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(d) => { onChange(d); setOpen(false); }}
            disabled={(date) => {
              if (disabledAfter && isAfter(date, disabledAfter)) return true;
              if (disabledBefore && isBefore(date, disabledBefore)) return true;
              return false;
            }}
            initialFocus
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

// ─── Select Input ────────────────────────────────────────────────────────────

const SelectInput = ({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) => (
  <div>
    <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-3">
      {label}
    </p>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-parchment border border-border/60 rounded-xl px-5 py-4 font-sans text-sm font-light text-foreground focus:outline-none focus:border-sage/50 hover:border-sage/40 transition-all pr-10"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-sage-muted pointer-events-none" />
    </div>
  </div>
);

// ─── Main Component ──────────────────────────────────────────────────────────

const DueDateCalculator = () => {
  const [method, setMethod] = useState<Method>("lmp");
  const [lmpDate, setLmpDate] = useState<Date | undefined>();
  const [cycleLength, setCycleLength] = useState(28);
  const [conceptionDate, setConceptionDate] = useState<Date | undefined>();
  const [ivfDate, setIvfDate] = useState<Date | undefined>();
  const [ivfType, setIvfType] = useState<IVFType>("5day");
  const [usDate, setUsDate] = useState<Date | undefined>();
  const [usWeeks, setUsWeeks] = useState("");
  const [result, setResult] = useState<CalcResult | null>(null);
  const [lmpRef, setLmpRef] = useState<Date | undefined>();

  const today = new Date();

  const handleCalculate = () => {
    let lmp: Date | undefined;

    if (method === "lmp" && lmpDate) {
      const offset = cycleLength - 28;
      lmp = addDays(lmpDate, -offset);
    } else if (method === "conception" && conceptionDate) {
      lmp = addDays(conceptionDate, -14);
    } else if (method === "ivf" && ivfDate) {
      const daysBack = ivfType === "5day" ? 19 : 17; // 14 + embryo age
      lmp = addDays(ivfDate, -daysBack);
    } else if (method === "ultrasound" && usDate && usWeeks) {
      const weeksNum = parseFloat(usWeeks);
      if (!isNaN(weeksNum)) {
        lmp = addDays(usDate, -(weeksNum * 7));
      }
    }

    if (lmp && isBefore(lmp, today) && isAfter(lmp, addDays(today, -300))) {
      setLmpRef(lmp);
      setResult(calculateFromLMP(lmp));
      // Smooth scroll to results
      setTimeout(() => {
        document.getElementById("results-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  const canCalculate = () => {
    if (method === "lmp") return !!lmpDate;
    if (method === "conception") return !!conceptionDate;
    if (method === "ivf") return !!ivfDate;
    if (method === "ultrasound") return !!usDate && !!usWeeks && !isNaN(parseFloat(usWeeks));
    return false;
  };

  const progressPct = result ? Math.min((result.currentWeek / 40) * 100, 100) : 0;

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
            Tools
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-foreground leading-tight mb-6">
            Pregnancy due date <span className="italic">calculator</span>
          </h1>
          <p className="font-sans text-base font-light text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Find your due date and understand what stage you're in — with guidance tailored to you.
          </p>
        </div>
      </section>

      {/* ── Calculator ──────────────────────────────────────────────────── */}
      <section className="pb-20 md:pb-24">
        <div className="container mx-auto px-6 md:px-10 max-w-xl">
          <div className="bg-card border border-border/60 rounded-2xl p-8 md:p-10 shadow-card-brand space-y-7">

            {/* Method selector */}
            <SelectInput
              label="Calculation method"
              value={method}
              onChange={(v) => { setMethod(v as Method); setResult(null); }}
              options={[
                { value: "lmp",         label: "Last period" },
                { value: "conception",  label: "Conception date" },
                { value: "ivf",         label: "IVF transfer date" },
                { value: "ultrasound",  label: "Ultrasound date" },
              ]}
            />

            {/* Dynamic inputs */}
            {method === "lmp" && (
              <>
                <DatePickerInput
                  label="First day of your last period"
                  value={lmpDate}
                  onChange={setLmpDate}
                  disabledAfter={today}
                  disabledBefore={addDays(today, -300)}
                />
                <div>
                  <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-3">
                    Average cycle length
                  </p>
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      min={21}
                      max={45}
                      value={cycleLength}
                      onChange={(e) => setCycleLength(Number(e.target.value))}
                      className="w-24 bg-parchment border border-border/60 rounded-xl px-4 py-3.5 font-sans text-sm font-light text-foreground focus:outline-none focus:border-sage/50 text-center"
                    />
                    <p className="font-sans text-sm font-light text-muted-foreground">days (default 28)</p>
                  </div>
                </div>
              </>
            )}

            {method === "conception" && (
              <DatePickerInput
                label="Conception date"
                value={conceptionDate}
                onChange={setConceptionDate}
                disabledAfter={today}
                disabledBefore={addDays(today, -300)}
              />
            )}

            {method === "ivf" && (
              <>
                <DatePickerInput
                  label="Embryo transfer date"
                  value={ivfDate}
                  onChange={setIvfDate}
                  disabledAfter={today}
                  disabledBefore={addDays(today, -300)}
                />
                <SelectInput
                  label="Transfer type"
                  value={ivfType}
                  onChange={(v) => setIvfType(v as IVFType)}
                  options={[
                    { value: "5day", label: "5-day transfer (blastocyst)" },
                    { value: "3day", label: "3-day transfer (cleavage)" },
                  ]}
                />
              </>
            )}

            {method === "ultrasound" && (
              <>
                <DatePickerInput
                  label="Ultrasound date"
                  value={usDate}
                  onChange={setUsDate}
                  disabledAfter={today}
                  disabledBefore={addDays(today, -300)}
                />
                <div>
                  <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-3">
                    Weeks pregnant at scan
                  </p>
                  <input
                    type="number"
                    min={4}
                    max={40}
                    placeholder="e.g. 12"
                    value={usWeeks}
                    onChange={(e) => setUsWeeks(e.target.value)}
                    className="w-full bg-parchment border border-border/60 rounded-xl px-5 py-4 font-sans text-sm font-light text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-sage/50"
                  />
                </div>
              </>
            )}

            {/* CTA */}
            <div className="pt-2">
              <button
                onClick={handleCalculate}
                disabled={!canCalculate()}
                className={cn(
                  "w-full flex items-center justify-center gap-2 rounded-pill px-7 py-4 font-sans text-sm font-medium transition-all",
                  canCalculate()
                    ? "bg-terracotta text-terracotta-foreground shadow-cta hover:bg-terracotta-hover"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                )}
              >
                <ArrowRight size={15} />
                Calculate my due date
              </button>
              <p className="font-sans text-[11px] font-light text-muted-foreground/70 text-center mt-3 leading-relaxed">
                This gives an estimate — your healthcare provider may adjust your due date based on scans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Results ─────────────────────────────────────────────────────── */}
      {result && (
        <div id="results-section">

          {/* Key stats */}
          <section className="pb-12 md:pb-16">
            <div className="container mx-auto px-6 md:px-10 max-w-3xl">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {/* Due date */}
                <div className="sm:col-span-3 bg-card border border-border/60 rounded-2xl p-7 shadow-card-brand flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="font-sans text-[10px] font-light tracking-widest uppercase text-sage-muted mb-2">
                      Your due date
                    </p>
                    <p className="font-serif text-3xl sm:text-4xl text-foreground">
                      {format(result.dueDate, "d MMMM yyyy")}
                    </p>
                  </div>
                  <Link
                    to={`/pregnancy/week/${result.currentWeek}`}
                    className="shrink-0 flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-6 py-3 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
                  >
                    See week {result.currentWeek} guide
                    <ArrowRight size={13} />
                  </Link>
                </div>

                {/* Current week */}
                <div className="bg-card border border-border/60 rounded-2xl p-7 shadow-card-brand text-center">
                  <p className="font-sans text-[10px] font-light tracking-widest uppercase text-sage-muted mb-3">
                    You are currently
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
                  <p className="font-sans text-[10px] font-light tracking-widest uppercase text-sage-muted mb-3">
                    Stage
                  </p>
                  <p className="font-serif text-xl text-foreground leading-snug mb-3">
                    {result.trimester}
                  </p>
                  <Link
                    to={result.trimesterPath}
                    className="font-sans text-xs font-light text-sage hover:text-sage-muted transition-colors"
                  >
                    View guide →
                  </Link>
                </div>

                {/* Days remaining */}
                <div className="bg-card border border-border/60 rounded-2xl p-7 shadow-card-brand text-center">
                  <p className="font-sans text-[10px] font-light tracking-widest uppercase text-sage-muted mb-3">
                    Days remaining
                  </p>
                  <p className="font-serif text-5xl text-foreground mb-1">
                    {result.daysRemaining}
                  </p>
                  <p className="font-sans text-sm font-light text-muted-foreground">
                    until your due date
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Visual progress — 40-week bar */}
          <section className="pb-12 md:pb-16">
            <div className="container mx-auto px-6 md:px-10 max-w-3xl">
              <div className="bg-card border border-border/60 rounded-2xl p-7 md:p-9 shadow-card-brand">
                <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-6">
                  Your journey so far
                </p>

                {/* Bar */}
                <div className="relative mb-4">
                  <div className="w-full bg-parchment-dark rounded-full h-2">
                    <div
                      className="bg-sage rounded-full h-2 transition-all duration-700"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                  {/* You are here marker */}
                  <div
                    className="absolute -top-1 transition-all duration-700"
                    style={{ left: `calc(${progressPct}% - 8px)` }}
                  >
                    <div className="w-4 h-4 rounded-full bg-terracotta border-2 border-card shadow-sm" />
                  </div>
                </div>

                <div className="flex justify-between mb-3">
                  <span className="font-sans text-[10px] font-light text-sage-muted">Week 1</span>
                  <span className="font-sans text-[10px] font-light text-terracotta font-medium">
                    ← You are here (week {result.currentWeek})
                  </span>
                  <span className="font-sans text-[10px] font-light text-sage-muted">Week 40</span>
                </div>

                {/* Trimester markers */}
                <div className="flex text-[10px] font-sans font-light text-muted-foreground/60 mt-4 pt-4 border-t border-border/30">
                  <div className="flex-1">First trimester<br />Weeks 1–12</div>
                  <div className="flex-1 text-center">Second trimester<br />Weeks 13–27</div>
                  <div className="flex-1 text-right">Third trimester<br />Weeks 28–40</div>
                </div>
              </div>
            </div>
          </section>

          {/* What this means */}
          <section className="pb-12 md:pb-16">
            <div className="container mx-auto px-6 md:px-10 max-w-3xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card border border-border/60 rounded-2xl p-7 md:p-9 shadow-card-brand">
                  <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-4">
                    What this means
                  </p>
                  <h2 className="font-serif text-xl text-foreground leading-snug mb-4">
                    You're in {result.trimesterLabel} pregnancy
                  </h2>
                  <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                    {result.weekInsight.whatThisMeans}
                  </p>
                </div>

                <div className="bg-card border border-border/60 rounded-2xl p-7 md:p-9 shadow-card-brand">
                  <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-4">
                    What to expect next
                  </p>
                  <ul className="space-y-3">
                    {result.weekInsight.whatToExpect.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-2 w-1 h-1 rounded-full bg-sage-muted shrink-0" />
                        <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Upcoming milestones */}
          <section className="pb-16 md:pb-20">
            <div className="container mx-auto px-6 md:px-10 max-w-3xl">
              <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-4">
                What's ahead
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-snug mb-8">
                Your next milestones
              </h2>

              <div className="space-y-4">
                {result.upcomingMilestones.map((m) => {
                  const milestoneDate = addDays(lmpRef!, m.week * 7);
                  const daysAway = differenceInDays(milestoneDate, today);
                  return (
                    <div
                      key={m.week}
                      className="flex items-center gap-5 bg-card border border-border/60 rounded-2xl px-6 py-5 shadow-card-brand"
                    >
                      <div className="shrink-0 w-10 h-10 rounded-full bg-sage-bg/40 border border-sage-light/30 flex items-center justify-center">
                        <span className="font-serif text-sm text-sage">{m.week}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-sans text-sm font-light text-foreground mb-0.5">{m.label}</p>
                        <p className="font-sans text-xs font-light text-muted-foreground">{m.detail}</p>
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

              <p className="mt-6 font-sans text-xs font-light text-muted-foreground flex items-center gap-2">
                <span className="text-sage">✔</span> Medically reviewed by Jenny Joines
              </p>
            </div>
          </section>

          {/* Follow week by week */}
          <section className="bg-parchment-dark py-24 md:py-28">
            <div className="container mx-auto px-6 md:px-10 max-w-2xl text-center">
              <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
                Your journey
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-5">
                Follow your pregnancy week by week
              </h2>
              <p className="font-sans text-base font-light text-muted-foreground leading-relaxed max-w-md mx-auto mb-10">
                Get weekly guidance tailored to your stage — what's happening, what's normal, and what to focus on.
              </p>
              <Link
                to={`/pregnancy/week/${result.currentWeek}`}
                className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-8 py-4 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
              >
                Start my journey at week {result.currentWeek}
                <ArrowRight size={15} />
              </Link>
            </div>
          </section>

          {/* AI support */}
          <section className="bg-sage-bg/40 py-24 md:py-28">
            <div className="container mx-auto px-6 md:px-10 max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
                <div>
                  <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
                    AI Support
                  </p>
                  <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-6">
                    Ask about your stage
                  </h2>
                  <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-8">
                    If something feels unclear about week {result.currentWeek} — symptoms, what to expect, or what's normal — you can ask and get guidance tailored to where you are.
                  </p>
                  <button className="flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all">
                    <MessageCircle size={15} />
                    Ask now
                  </button>
                </div>

                <div className="bg-card border border-border/50 rounded-lg p-7 shadow-card-brand space-y-4">
                  <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted">
                    Suggested questions
                  </p>
                  {[
                    `Is this normal at ${result.currentWeek} weeks?`,
                    "What should I expect next?",
                    "What symptoms should I have right now?",
                  ].map((q, i) => (
                    <div key={i} className="flex items-start gap-3 py-3 border-b border-border/40 last:border-0">
                      <MessageCircle size={14} className="text-sage mt-0.5 shrink-0" />
                      <p className="font-sans text-sm font-light text-foreground leading-relaxed">{q}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Product integration */}
          <section className="bg-lavender-section py-24 md:py-28">
            <div className="container mx-auto px-6 md:px-10 max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
                <div>
                  <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
                    Your Story
                  </p>
                  <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-6">
                    Capture this moment
                  </h2>
                  <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-4">
                    This stage can feel new and sometimes uncertain.
                  </p>
                  <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-8">
                    Many parents choose to write things down as they go — thoughts, milestones, and how this experience really feels.
                  </p>
                  <a
                    href="/"
                    className="inline-flex items-center gap-2 border border-foreground/20 text-foreground rounded-pill px-7 py-3.5 font-sans text-sm font-light hover:bg-parchment-dark transition-all"
                  >
                    Explore The Start of You
                    <ArrowUpRight size={14} />
                  </a>
                </div>

                <div className="flex flex-col gap-4">
                  {[
                    `Week ${result.currentWeek} — Finding out your due date feels significant. Things start to feel real.`,
                    "Week 12 — The first scan. A moment I want to remember clearly.",
                    "Week 20 — Halfway there. More certain now.",
                  ].map((entry, i) => (
                    <div key={i} className="bg-card border border-border/40 rounded-md px-6 py-4 shadow-card-brand">
                      <div className="flex items-start gap-3">
                        <BookOpen size={14} className="text-sage mt-0.5 shrink-0" />
                        <p className="font-serif italic text-base text-foreground/70 leading-relaxed">{entry}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

        </div>
      )}

      {/* Empty state */}
      {!result && (
        <section className="pb-32">
          <div className="container mx-auto px-6 md:px-10 max-w-xl text-center">
            <p className="font-sans text-sm font-light text-muted-foreground/60 leading-relaxed">
              Select your method and enter a date above to see your results.
            </p>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default DueDateCalculator;
