import { useState, useEffect, useRef } from "react";
import {
  format,
  addDays,
  differenceInDays,
  isAfter,
  isBefore,
} from "date-fns";
import {
  CalendarIcon,
  ArrowRight,
  MessageCircle,
  BookOpen,
  ArrowUpRight,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// ─── Types ──────────────────────────────────────────────────────────────────

type Method = "lmp" | "conception" | "ivf" | "ultrasound";
type IVFType = "3day" | "5day";

interface Milestone {
  week: number;
  label: string;
  detail: string;
}

interface WeekInsight {
  whatThisMeans: string[];
  whatToExpect: string[];
  weekSummary: string;
}

interface CalcResult {
  currentWeek: number;
  currentDay: number;
  daysRemaining: number;
  weeksRemaining: number;
  dueDate: Date;
  trimester: string;
  trimesterLabel: string;
  trimesterPath: string;
  upcomingMilestones: Milestone[];
  insight: WeekInsight;
}

// ─── Content data ────────────────────────────────────────────────────────────

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

const getInsight = (week: number): WeekInsight => {
  if (week <= 4) return {
    weekSummary: "The very earliest days. Most changes are invisible right now.",
    whatThisMeans: [
      "You're in the very earliest stage of pregnancy — changes are happening at a cellular level.",
      "Your body hasn't yet had time to react hormonally, which is why symptoms are rare this early.",
    ],
    whatToExpect: [
      "Little to no noticeable symptoms at this stage",
      "Implantation may have just occurred",
      "Your first scan is still several weeks away",
      "Your body is beginning to produce pregnancy hormones",
    ],
  };
  if (week <= 6) return {
    weekSummary: "Hormone levels are rising rapidly. Your body is beginning to respond.",
    whatThisMeans: [
      "You're in the early stages of pregnancy, where hormone levels are rising and your body is beginning to adjust.",
      "Some people begin to notice symptoms around this time, while others feel relatively normal — both are common.",
    ],
    whatToExpect: [
      "Fatigue that arrives without warning",
      "Breast tenderness or increased sensitivity",
      "Nausea may be beginning or building",
      "Heightened sense of smell",
      "You may start thinking about your first scan",
    ],
  };
  if (week <= 9) return {
    weekSummary: "Symptoms are often at their most intense right now. This is temporary.",
    whatThisMeans: [
      "You're in the middle of the first trimester — a phase of rapid change for both you and your baby.",
      "Symptoms can feel very present during this period. This often begins to ease as the trimester progresses.",
    ],
    whatToExpect: [
      "Nausea and morning sickness often peak in this window",
      "Deep fatigue and a strong need for rest",
      "Emotional sensitivity and mood changes",
      "Your first scan is approaching",
    ],
  };
  if (week <= 12) return {
    weekSummary: "You're approaching the end of the first trimester. The 12-week scan is near.",
    whatThisMeans: [
      "You're nearing the end of the first trimester — a significant milestone for many people.",
      "Your baby's major organs are formed. The focus now shifts to growth and development.",
    ],
    whatToExpect: [
      "Many people begin to share their news after the 12-week scan",
      "Nausea may begin to ease in the coming weeks",
      "Your bump may not be visible yet, but changes are happening",
      "The 12-week scan gives your first clear picture",
    ],
  };
  if (week <= 20) return {
    weekSummary: "The second trimester. Energy often improves and nausea eases for many.",
    whatThisMeans: [
      "You're in the second trimester — often described as the most comfortable phase of pregnancy.",
      "Your bump will become visible, and you may feel more like yourself again.",
    ],
    whatToExpect: [
      "Nausea often improves significantly in this phase",
      "Energy levels tend to return",
      "Your bump will begin to show",
      "Baby movement (quickening) may be felt for the first time",
    ],
  };
  if (week <= 27) return {
    weekSummary: "Growing steadily. Your baby is becoming increasingly active.",
    whatThisMeans: [
      "You're in the second trimester, and your baby is developing quickly.",
      "Movement becomes more noticeable, and appointments increase as you approach the third trimester.",
    ],
    whatToExpect: [
      "Regular baby movement becoming more familiar",
      "Round ligament discomfort as your bump grows",
      "The 20-week anatomy scan (if not already done)",
      "Glucose tolerance testing may be offered",
    ],
  };
  if (week <= 32) return {
    weekSummary: "Third trimester. Your baby is gaining weight and preparing for birth.",
    whatThisMeans: [
      "You're in the third trimester — the final stage before birth.",
      "Your baby is growing rapidly now, and your body is doing significant work to support this.",
    ],
    whatToExpect: [
      "Back pressure and discomfort increasing",
      "Braxton Hicks contractions",
      "Sleep becoming more difficult to manage",
      "Shortness of breath as your baby grows",
    ],
  };
  return {
    weekSummary: "The final weeks. Each day brings you closer.",
    whatThisMeans: [
      "You're in the final weeks of pregnancy. Your baby is fully formed and preparing for birth.",
      "This is often a mix of anticipation, physical discomfort, and emotional readiness.",
    ],
    whatToExpect: [
      "Pelvic pressure as your baby descends",
      "Nesting instinct may increase",
      "Frequent Braxton Hicks",
      "Weekly appointments with your care team",
    ],
  };
};

const getTrimesterInfo = (week: number) => {
  if (week <= 12) return { label: "early", display: "First Trimester", path: "/pregnancy/first-trimester" };
  if (week <= 27) return { label: "mid", display: "Second Trimester", path: "/pregnancy/second-trimester" };
  return { label: "late", display: "Third Trimester", path: "/pregnancy/third-trimester" };
};

// ─── Calculation ─────────────────────────────────────────────────────────────

const computeResult = (lmp: Date): CalcResult => {
  const dueDate = addDays(lmp, 280);
  const today = new Date();
  const daysSinceLMP = differenceInDays(today, lmp);
  const currentWeek = Math.min(Math.max(Math.floor(daysSinceLMP / 7) + 1, 1), 40);
  const currentDay = Math.max(daysSinceLMP % 7, 0);
  const daysRemaining = Math.max(differenceInDays(dueDate, today), 0);
  const weeksRemaining = Math.floor(daysRemaining / 7);
  const tri = getTrimesterInfo(currentWeek);
  const upcomingMilestones = MILESTONES.filter((m) => m.week >= currentWeek).slice(0, 3);
  return {
    currentWeek, currentDay, daysRemaining, weeksRemaining,
    dueDate, trimester: tri.display, trimesterLabel: tri.label,
    trimesterPath: tri.path, upcomingMilestones, insight: getInsight(currentWeek),
  };
};

// ─── Sub-components ──────────────────────────────────────────────────────────

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
      <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-3">{label}</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button className={cn(
            "w-full flex items-center justify-between bg-parchment border border-border/60 rounded-xl px-5 py-4 font-sans text-sm font-light transition-all hover:border-sage/40 focus:outline-none focus:border-sage/50",
            value ? "text-foreground" : "text-muted-foreground"
          )}>
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

const SelectInput = ({
  label, value, onChange, options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) => (
  <div>
    <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-3">{label}</p>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-parchment border border-border/60 rounded-xl px-5 py-4 font-sans text-sm font-light text-foreground focus:outline-none focus:border-sage/50 hover:border-sage/40 transition-all pr-10"
      >
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-sage-muted pointer-events-none" />
    </div>
  </div>
);

// ─── Animated fade-in section wrapper ────────────────────────────────────────

const FadeSection = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        className
      )}
    >
      {children}
    </div>
  );
};

// ─── Main ────────────────────────────────────────────────────────────────────

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
  const [aiQuestion, setAiQuestion] = useState("");
  const resultsRef = useRef<HTMLDivElement>(null);

  const today = new Date();

  const canCalculate = () => {
    if (method === "lmp") return !!lmpDate;
    if (method === "conception") return !!conceptionDate;
    if (method === "ivf") return !!ivfDate;
    if (method === "ultrasound") return !!usDate && !!usWeeks && !isNaN(parseFloat(usWeeks));
    return false;
  };

  const handleCalculate = () => {
    let lmp: Date | undefined;
    if (method === "lmp" && lmpDate) {
      lmp = addDays(lmpDate, -(cycleLength - 28));
    } else if (method === "conception" && conceptionDate) {
      lmp = addDays(conceptionDate, -14);
    } else if (method === "ivf" && ivfDate) {
      lmp = addDays(ivfDate, -(ivfType === "5day" ? 19 : 17));
    } else if (method === "ultrasound" && usDate && usWeeks) {
      const w = parseFloat(usWeeks);
      if (!isNaN(w)) lmp = addDays(usDate, -(w * 7));
    }
    if (lmp && isBefore(lmp, today) && isAfter(lmp, addDays(today, -300))) {
      setLmpRef(lmp);
      setResult(computeResult(lmp));
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    }
  };

  const progressPct = result ? Math.min((result.currentWeek / 40) * 100, 100) : 0;

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">Tools</p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-foreground leading-tight mb-6 animate-fade-up">
            Pregnancy due date <span className="italic">calculator</span>
          </h1>
          <p className="font-sans text-base font-light text-muted-foreground leading-relaxed max-w-xl mx-auto animate-fade-up [animation-delay:0.1s]">
            Find your due date and understand what stage you're in — with guidance tailored to you.
          </p>
        </div>
      </section>

      {/* ── Calculator input ─────────────────────────────────────────────── */}
      <section className="pb-20 md:pb-24">
        <div className="container mx-auto px-6 md:px-10 max-w-xl">
          <div className="bg-card border border-border/60 rounded-2xl p-8 md:p-10 shadow-card-brand space-y-7">

            <SelectInput
              label="Calculation method"
              value={method}
              onChange={(v) => { setMethod(v as Method); setResult(null); }}
              options={[
                { value: "lmp",        label: "Last period" },
                { value: "conception", label: "Conception date" },
                { value: "ivf",        label: "IVF transfer date" },
                { value: "ultrasound", label: "Ultrasound date" },
              ]}
            />

            {method === "lmp" && (
              <>
                <DatePickerInput label="First day of your last period" value={lmpDate} onChange={setLmpDate} disabledAfter={today} disabledBefore={addDays(today, -300)} />
                <div>
                  <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-3">Average cycle length</p>
                  <div className="flex items-center gap-4">
                    <input type="number" min={21} max={45} value={cycleLength} onChange={(e) => setCycleLength(Number(e.target.value))}
                      className="w-24 bg-parchment border border-border/60 rounded-xl px-4 py-3.5 font-sans text-sm font-light text-foreground focus:outline-none focus:border-sage/50 text-center" />
                    <p className="font-sans text-sm font-light text-muted-foreground">days (default 28)</p>
                  </div>
                </div>
              </>
            )}
            {method === "conception" && (
              <DatePickerInput label="Conception date" value={conceptionDate} onChange={setConceptionDate} disabledAfter={today} disabledBefore={addDays(today, -300)} />
            )}
            {method === "ivf" && (
              <>
                <DatePickerInput label="Embryo transfer date" value={ivfDate} onChange={setIvfDate} disabledAfter={today} disabledBefore={addDays(today, -300)} />
                <SelectInput label="Transfer type" value={ivfType} onChange={(v) => setIvfType(v as IVFType)}
                  options={[{ value: "5day", label: "5-day transfer (blastocyst)" }, { value: "3day", label: "3-day transfer (cleavage)" }]} />
              </>
            )}
            {method === "ultrasound" && (
              <>
                <DatePickerInput label="Ultrasound date" value={usDate} onChange={setUsDate} disabledAfter={today} disabledBefore={addDays(today, -300)} />
                <div>
                  <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-3">Weeks pregnant at scan</p>
                  <input type="number" min={4} max={40} placeholder="e.g. 12" value={usWeeks} onChange={(e) => setUsWeeks(e.target.value)}
                    className="w-full bg-parchment border border-border/60 rounded-xl px-5 py-4 font-sans text-sm font-light text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-sage/50" />
                </div>
              </>
            )}

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
              <p className="font-sans text-[11px] font-light text-muted-foreground/60 text-center mt-3 leading-relaxed">
                This gives an estimate — your healthcare provider may adjust your due date based on scans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* RESULTS SCREEN                                                    */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      {result && (
        <div ref={resultsRef}>

          {/* ── S1: Primary result ─────────────────────────────────────── */}
          <section className="bg-parchment-dark py-20 md:py-28">
            <div className="container mx-auto px-6 md:px-10 max-w-3xl">
              <FadeSection delay={0}>
                <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-8">
                  Your results
                </p>
              </FadeSection>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Due date — hero stat */}
                <FadeSection delay={80} className="md:col-span-2">
                  <div className="bg-card border border-border/50 rounded-2xl px-8 py-9 shadow-card-brand">
                    <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-3">
                      Your due date
                    </p>
                    <p className="font-serif text-4xl sm:text-5xl text-foreground leading-tight mb-1">
                      {format(result.dueDate, "EEEE, d MMMM yyyy")}
                    </p>
                  </div>
                </FadeSection>

                {/* Currently */}
                <FadeSection delay={160}>
                  <div className="bg-card border border-border/50 rounded-2xl px-7 py-8 shadow-card-brand h-full">
                    <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-4">
                      You are currently
                    </p>
                    <div className="flex items-end gap-3 mb-1">
                      <span className="font-serif text-6xl text-foreground leading-none">{result.currentWeek}</span>
                      <span className="font-sans text-base font-light text-muted-foreground pb-1.5">weeks pregnant</span>
                    </div>
                    {result.currentDay > 0 && (
                      <p className="font-sans text-xs font-light text-sage-muted">
                        + {result.currentDay} day{result.currentDay !== 1 ? "s" : ""}
                      </p>
                    )}
                  </div>
                </FadeSection>

                {/* Trimester + days */}
                <FadeSection delay={220}>
                  <div className="bg-card border border-border/50 rounded-2xl px-7 py-8 shadow-card-brand h-full flex flex-col gap-5">
                    <div>
                      <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-2">Stage</p>
                      <p className="font-serif text-2xl text-foreground">{result.trimester}</p>
                      <Link to={result.trimesterPath} className="font-sans text-xs font-light text-sage mt-1 inline-block hover:text-sage-muted transition-colors">
                        View trimester guide →
                      </Link>
                    </div>
                    <div className="border-t border-border/30 pt-4">
                      <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-1">Weeks remaining</p>
                      <p className="font-serif text-2xl text-foreground">{result.weeksRemaining} <span className="font-sans text-sm font-light text-muted-foreground">weeks</span></p>
                    </div>
                  </div>
                </FadeSection>
              </div>

              {/* Reassurance line */}
              <FadeSection delay={300}>
                <p className="font-serif italic text-base text-foreground/60 leading-relaxed text-center max-w-md mx-auto">
                  Pregnancy timelines can vary — this gives a helpful estimate of where you are.
                </p>
              </FadeSection>
            </div>
          </section>

          {/* ── S2: Visual timeline ────────────────────────────────────── */}
          <section className="bg-parchment py-20 md:py-24">
            <div className="container mx-auto px-6 md:px-10 max-w-3xl">
              <FadeSection delay={0}>
                <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-6">
                  Your journey
                </p>
              </FadeSection>

              <FadeSection delay={80}>
                <div className="bg-card border border-border/50 rounded-2xl p-8 md:p-10 shadow-card-brand">
                  {/* Progress bar */}
                  <div className="relative mb-6">
                    <div className="w-full bg-parchment-dark rounded-full h-1.5 mb-1">
                      <div
                        className="bg-sage rounded-full h-1.5 transition-all duration-1000"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                    {/* Marker */}
                    <div
                      className="absolute -top-2 transition-all duration-1000"
                      style={{ left: `calc(${progressPct}% - 10px)` }}
                    >
                      <div className="w-5 h-5 rounded-full bg-terracotta border-2 border-card shadow-sm flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-terracotta-foreground" />
                      </div>
                    </div>
                  </div>

                  {/* Labels */}
                  <div className="flex justify-between mb-2">
                    <span className="font-sans text-[10px] font-light text-sage-muted">Week 1</span>
                    <span className="font-sans text-[10px] font-light text-terracotta font-medium">
                      You are here — week {result.currentWeek}
                    </span>
                    <span className="font-sans text-[10px] font-light text-sage-muted">Week 40</span>
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border/30">
                    <div>
                      <p className="font-sans text-[10px] font-light tracking-widest uppercase text-sage-muted mb-1">Weeks completed</p>
                      <p className="font-serif text-2xl text-foreground">{result.currentWeek - 1}</p>
                    </div>
                    <div>
                      <p className="font-sans text-[10px] font-light tracking-widest uppercase text-sage-muted mb-1">Weeks remaining</p>
                      <p className="font-serif text-2xl text-foreground">{result.weeksRemaining}</p>
                    </div>
                  </div>

                  {/* Trimester bands */}
                  <div className="flex text-[10px] font-sans font-light text-muted-foreground/50 mt-5 pt-5 border-t border-border/20 gap-px">
                    <div className="flex-none w-[30%]">1st trimester<br />1–12</div>
                    <div className="flex-1 text-center">2nd trimester<br />13–27</div>
                    <div className="flex-none w-[33%] text-right">3rd trimester<br />28–40</div>
                  </div>
                </div>
              </FadeSection>
            </div>
          </section>

          {/* ── S3+S4: What this means + What to expect ────────────────── */}
          <section className="bg-parchment-dark py-20 md:py-24">
            <div className="container mx-auto px-6 md:px-10 max-w-3xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* What this means */}
                <FadeSection delay={0}>
                  <div className="bg-card border border-border/50 rounded-2xl p-8 shadow-card-brand h-full">
                    <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-4">
                      What this means
                    </p>
                    <p className="font-serif italic text-base text-sage-muted mb-5 leading-snug">
                      {result.insight.weekSummary}
                    </p>
                    <div className="space-y-4">
                      {result.insight.whatThisMeans.map((line, i) => (
                        <p key={i} className="font-sans text-sm font-light text-muted-foreground leading-relaxed">{line}</p>
                      ))}
                    </div>
                  </div>
                </FadeSection>

                {/* What to expect next */}
                <FadeSection delay={100}>
                  <div className="bg-card border border-border/50 rounded-2xl p-8 shadow-card-brand h-full">
                    <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-4">
                      What to expect next
                    </p>
                    <ul className="space-y-4">
                      {result.insight.whatToExpect.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="mt-2 w-1 h-1 rounded-full bg-sage-muted shrink-0" />
                          <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeSection>
              </div>
            </div>
          </section>

          {/* ── S5: This week — core product entry ─────────────────────── */}
          <section className="bg-parchment py-20 md:py-24">
            <div className="container mx-auto px-6 md:px-10 max-w-3xl">
              <FadeSection delay={0}>
                <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
                  Your current week
                </p>
                <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-snug mb-8">
                  Week {result.currentWeek}
                </h2>
              </FadeSection>

              <FadeSection delay={80}>
                <Link
                  to={`/pregnancy/week/${result.currentWeek}`}
                  className="group block bg-card border border-border/50 rounded-2xl p-8 md:p-10 shadow-card-brand hover:border-sage/40 hover:shadow-soft transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-sage-bg/50 border border-sage-light/30 flex items-center justify-center shrink-0">
                          <span className="font-serif text-sm text-sage">{result.currentWeek}</span>
                        </div>
                        <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted">
                          Week {result.currentWeek} guide
                        </p>
                      </div>
                      <p className="font-serif text-xl text-foreground leading-snug mb-3">
                        {result.insight.weekSummary}
                      </p>
                      <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                        What's happening this week, how it can feel, and what to focus on right now.
                      </p>
                    </div>
                    <ArrowRight size={18} className="text-sage-muted group-hover:text-sage group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                  </div>

                  <div className="mt-7 pt-6 border-t border-border/30 flex items-center gap-2">
                    <span className="font-sans text-sm font-light text-sage group-hover:gap-3 transition-all">
                      View week {result.currentWeek} →
                    </span>
                  </div>
                </Link>
              </FadeSection>
            </div>
          </section>

          {/* ── S6: Follow week by week — conversion ───────────────────── */}
          <section className="bg-parchment-dark py-24 md:py-28">
            <div className="container mx-auto px-6 md:px-10 max-w-2xl text-center">
              <FadeSection delay={0}>
                <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
                  Your journey
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-5">
                  Follow your pregnancy week by week
                </h2>
                <p className="font-sans text-base font-light text-muted-foreground leading-relaxed max-w-md mx-auto mb-8">
                  Get guidance tailored to your stage — what's happening, what's normal, and what to focus on.
                </p>
                <Link
                  to={`/pregnancy/week/${result.currentWeek}`}
                  className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-8 py-4 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all mb-4"
                >
                  Start my journey
                  <ArrowRight size={15} />
                </Link>
                <p className="font-sans text-xs font-light text-muted-foreground/60">
                  Free to start · Updates weekly · Saved to your profile
                </p>
              </FadeSection>
            </div>
          </section>

          {/* ── S7: AI support ─────────────────────────────────────────── */}
          <section className="bg-sage-bg/40 py-24 md:py-28">
            <div className="container mx-auto px-6 md:px-10 max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
                <FadeSection delay={0}>
                  <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
                    AI Support
                  </p>
                  <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-6">
                    Ask about your stage
                  </h2>
                  <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-6">
                    Whatever's on your mind about week {result.currentWeek} — symptoms, what to expect, or what's normal — you can ask and get guidance tailored to where you are.
                  </p>

                  <div className="relative mb-5">
                    <input
                      type="text"
                      value={aiQuestion}
                      onChange={(e) => setAiQuestion(e.target.value)}
                      placeholder="What's on your mind today?"
                      className="w-full bg-background border border-border/60 rounded-xl px-5 py-4 font-sans text-sm font-light text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-sage/50 transition-all pr-12"
                    />
                  </div>

                  <button className="flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all">
                    <MessageCircle size={15} />
                    Ask now
                  </button>
                </FadeSection>

                <FadeSection delay={120}>
                  <div className="bg-card border border-border/50 rounded-2xl p-7 shadow-card-brand">
                    <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-5">
                      Suggested questions
                    </p>
                    {[
                      `Is this normal at ${result.currentWeek} weeks?`,
                      "What should I expect next?",
                      "Why do I feel like this?",
                    ].map((q, i) => (
                      <button
                        key={i}
                        onClick={() => setAiQuestion(q)}
                        className="group w-full flex items-start gap-3 py-4 border-b border-border/40 last:border-0 text-left hover:pl-1 transition-all"
                      >
                        <MessageCircle size={13} className="text-sage mt-0.5 shrink-0" />
                        <p className="font-sans text-sm font-light text-foreground leading-relaxed group-hover:text-sage transition-colors">{q}</p>
                      </button>
                    ))}
                  </div>
                </FadeSection>
              </div>
            </div>
          </section>

          {/* ── S8: Upcoming milestones ────────────────────────────────── */}
          <section className="bg-parchment py-20 md:py-24">
            <div className="container mx-auto px-6 md:px-10 max-w-3xl">
              <FadeSection delay={0}>
                <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-4">
                  What's ahead
                </p>
                <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-snug mb-8">
                  Your next milestones
                </h2>
              </FadeSection>

              <div className="space-y-4 mb-6">
                {result.upcomingMilestones.map((m, idx) => {
                  const milestoneDate = addDays(lmpRef!, m.week * 7);
                  const daysAway = differenceInDays(milestoneDate, today);
                  return (
                    <FadeSection key={m.week} delay={idx * 80}>
                      <div className="flex items-center gap-5 bg-card border border-border/60 rounded-2xl px-6 py-5 shadow-card-brand">
                        <div className="shrink-0 w-10 h-10 rounded-full bg-sage-bg/40 border border-sage-light/30 flex items-center justify-center">
                          <span className="font-serif text-sm text-sage">{m.week}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-sans text-sm font-light text-foreground mb-0.5">{m.label}</p>
                          <p className="font-sans text-xs font-light text-muted-foreground">{m.detail}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-sans text-sm font-light text-foreground">{format(milestoneDate, "d MMM")}</p>
                          <p className="font-sans text-[10px] font-light text-sage-muted mt-0.5">
                            {daysAway > 0 ? `in ${daysAway} days` : daysAway === 0 ? "today" : "passed"}
                          </p>
                        </div>
                      </div>
                    </FadeSection>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ── S9: Product integration ────────────────────────────────── */}
          <section className="bg-lavender-section py-24 md:py-28">
            <div className="container mx-auto px-6 md:px-10 max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
                <FadeSection delay={0}>
                  <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
                    Your Story
                  </p>
                  <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-6">
                    Capture this moment
                  </h2>
                  <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-4">
                    The early weeks can feel new, uncertain, and easy to forget later on.
                  </p>
                  <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-8">
                    Many parents choose to write things down as they go — thoughts, changes, and how this experience really feels.
                  </p>
                  <a href="/" className="inline-flex items-center gap-2 border border-foreground/20 text-foreground rounded-pill px-7 py-3.5 font-sans text-sm font-light hover:bg-parchment-dark transition-all">
                    Explore The Start of You
                    <ArrowUpRight size={14} />
                  </a>
                </FadeSection>

                <FadeSection delay={120}>
                  <div className="flex flex-col gap-4">
                    {[
                      `Week ${result.currentWeek} — The moment I found out. Things start to feel very real.`,
                      "Week 12 — The first scan. I want to remember how this felt.",
                      "Week 20 — Halfway there. Something has shifted.",
                    ].map((entry, i) => (
                      <div key={i} className="bg-card border border-border/40 rounded-xl px-6 py-4 shadow-card-brand">
                        <div className="flex items-start gap-3">
                          <BookOpen size={14} className="text-sage mt-0.5 shrink-0" />
                          <p className="font-serif italic text-base text-foreground/70 leading-relaxed">{entry}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </FadeSection>
              </div>
            </div>
          </section>

          {/* ── S10: Quick links ───────────────────────────────────────── */}
          <section className="bg-parchment py-20 md:py-24">
            <div className="container mx-auto px-6 md:px-10 max-w-3xl">
              <FadeSection delay={0}>
                <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
                  Explore your journey
                </p>
              </FadeSection>
              <div className="divide-y divide-border/50">
                {[
                  { label: "First trimester guide", sub: "What to expect in the first 12 weeks", href: "/pregnancy/first-trimester" },
                  { label: "Early pregnancy symptoms", sub: "What's common, what's normal, what to watch for", href: "/articles/early-pregnancy-symptoms" },
                  { label: "What happens in pregnancy", sub: "An overview of the full 40-week journey", href: "/pregnancy" },
                ].map((link, i) => (
                  <FadeSection key={i} delay={i * 60}>
                    <Link
                      to={link.href}
                      className="group flex items-center justify-between py-5 hover:pl-1 transition-all"
                    >
                      <div>
                        <p className="font-serif text-lg text-foreground group-hover:text-sage transition-colors leading-snug">
                          {link.label}
                        </p>
                        <p className="font-sans text-sm font-light text-muted-foreground mt-0.5">{link.sub}</p>
                      </div>
                      <ArrowRight size={14} className="text-muted-foreground/40 group-hover:text-sage transition-colors ml-4 shrink-0" />
                    </Link>
                  </FadeSection>
                ))}
              </div>

              {/* Trust marker */}
              <FadeSection delay={200}>
                <p className="mt-10 font-sans text-xs font-light text-muted-foreground flex items-center gap-2">
                  <span className="text-sage">✔</span> Medically reviewed by Jenny Joines
                </p>
              </FadeSection>
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
