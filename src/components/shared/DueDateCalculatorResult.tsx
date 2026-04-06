/**
 * DueDateCalculatorResult — redesigned as a guided, personal results experience.
 * Structure: Hero → Right Now → Timeline → Current Week → Ask → What's Next → Journal → Explore
 */

import { useEffect, useState } from "react";
import { addDays, differenceInDays, format } from "date-fns";
import { ArrowRight, MessageCircle, BookOpen, Calendar, Baby, Heart } from "lucide-react";
import JournalPromotion from "@/components/shared/JournalPromotion";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Milestone {
  week: number;
  label: string;
  detail: string;
}

interface StageInsight {
  reassurance: string;
  bodyText: string;
  noticeText: string;
  focusText: string;
  weekSummary: string;
  whatThisMeans: string[];
  whatToExpect: string[];
}

export interface CalcResult {
  currentWeek: number;
  currentDay: number;
  daysRemaining: number;
  weeksRemaining: number;
  dueDate: Date;
  trimester: string;
  trimesterNumber: number;
  trimesterPath: string;
  upcomingMilestones: Milestone[];
  insight: StageInsight;
}

// ─── Content ──────────────────────────────────────────────────────────────────

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

const getInsight = (week: number): StageInsight => {
  if (week <= 4) return {
    reassurance: "You are in the very earliest days of pregnancy. A lot is happening that you cannot see or feel yet, and that is completely normal.",
    bodyText: "Your body is beginning to produce pregnancy hormones at a cellular level. Implantation may have just occurred. Physical changes are almost entirely invisible at this stage.",
    noticeText: "Very little at this point. Some people notice mild cramping or spotting, but most feel no different from usual. Symptoms typically begin in the coming weeks.",
    focusText: "There is nothing urgent to do right now. Start prenatal vitamins if you have not already, and give yourself time to absorb the news at your own pace.",
    weekSummary: "The very earliest days. Most changes are invisible right now.",
    whatThisMeans: [
      "You are in the very earliest stage of pregnancy. Changes are happening at a cellular level.",
      "Your body has not yet had time to react hormonally, which is why symptoms are rare this early.",
    ],
    whatToExpect: [
      "Little to no noticeable symptoms at this stage",
      "Implantation may have just occurred",
      "Your first scan is still several weeks away",
      "Your body is beginning to produce pregnancy hormones",
    ],
  };
  if (week <= 6) return {
    reassurance: "You are in the early weeks. Hormone levels are rising rapidly and your body is beginning to respond. It is normal if things feel uncertain or not quite real yet.",
    bodyText: "HCG levels are climbing quickly. Your body is adjusting to support the pregnancy. Internally, the embryo is forming its earliest structures.",
    noticeText: "Fatigue that arrives without warning. Breast tenderness. Nausea may be beginning or building. A heightened sense of smell. Some people feel very little at this stage.",
    focusText: "Rest when your body asks for it. Think about booking your first midwife appointment. You do not need to plan everything right now.",
    weekSummary: "Hormone levels are rising rapidly. Your body is beginning to respond.",
    whatThisMeans: [
      "You are in the early stages where hormone levels are rising and your body is beginning to adjust.",
      "Some people notice symptoms around now, while others feel relatively normal. Both are common.",
    ],
    whatToExpect: [
      "Fatigue that arrives without warning",
      "Breast tenderness or increased sensitivity",
      "Nausea may be beginning or building",
      "You may start thinking about your first scan",
    ],
  };
  if (week <= 9) return {
    reassurance: "Symptoms are often at their most intense around now. This phase is temporary, and what you are feeling is your body doing exactly what it needs to do.",
    bodyText: "Rapid development is happening. Your baby's major organs are beginning to form. Your body is working hard to support this, which is why symptoms can feel so present.",
    noticeText: "Nausea and morning sickness often peak during this window. Deep fatigue. Emotional sensitivity and mood changes. Your first scan is approaching.",
    focusText: "Managing nausea and rest are priorities right now. Your first scan is near. Focus on getting through each day without expecting too much of yourself.",
    weekSummary: "Symptoms are often at their most intense right now. This is temporary.",
    whatThisMeans: [
      "You are in the middle of the first trimester, a phase of rapid change for both you and your baby.",
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
    reassurance: "You are approaching the end of the first trimester. This is a significant milestone. Many people begin to feel a shift in energy and confidence around this time.",
    bodyText: "Your baby's major organs are formed. The focus now shifts to growth and development. Your body is preparing for the second trimester, which often brings relief from early symptoms.",
    noticeText: "Nausea may begin to ease. Energy levels often start to improve. Your bump may not be visible yet, but internal changes are significant. The 12-week scan is near.",
    focusText: "Your 12-week scan is the major upcoming event. After that, many people begin to share their news. Focus on what feels right for you.",
    weekSummary: "Approaching the end of the first trimester. The 12-week scan is near.",
    whatThisMeans: [
      "You are nearing the end of the first trimester, a significant milestone for many people.",
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
    reassurance: "You are in the second trimester. Energy often returns, nausea eases, and the pregnancy begins to feel more tangible. This is often a more comfortable phase.",
    bodyText: "Your baby is growing steadily. Organs are maturing and movement is increasing. Your bump is becoming visible. Internally, blood volume has increased significantly.",
    noticeText: "More energy. Less nausea. Your bump showing. You may feel baby movement (quickening) for the first time. Round ligament discomfort as your body adjusts.",
    focusText: "The 20-week anatomy scan is a key milestone. Allow yourself to settle into this stage. Many people find this the most enjoyable phase of pregnancy.",
    weekSummary: "The second trimester. Energy often improves and nausea eases for many.",
    whatThisMeans: [
      "You are in the second trimester, often described as the most comfortable phase of pregnancy.",
      "Your bump will become visible, and you may feel more like yourself again.",
    ],
    whatToExpect: [
      "Nausea often improves significantly",
      "Energy levels tend to return",
      "Your bump will begin to show",
      "Baby movement may be felt for the first time",
    ],
  };
  if (week <= 27) return {
    reassurance: "You are well into the second trimester now. Your baby is becoming increasingly active and your body is adapting to support continued growth.",
    bodyText: "Your baby is developing rapidly. Movement becomes more noticeable and predictable. Your body is managing increased demands on circulation, digestion, and energy.",
    noticeText: "Regular baby movement becoming more familiar. Round ligament discomfort. The 20-week scan (if not already done). Glucose tolerance testing may be offered soon.",
    focusText: "Pay attention to movement patterns. Continue routine appointments. Begin thinking about birth preferences and the third trimester.",
    weekSummary: "Growing steadily. Your baby is becoming increasingly active.",
    whatThisMeans: [
      "You are in the second trimester and your baby is developing quickly.",
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
    reassurance: "You are in the third trimester. Your baby is gaining weight and preparing for birth. The final stretch can feel both exciting and physically demanding.",
    bodyText: "Your baby is growing rapidly and laying down fat stores. Lungs are maturing. Your body is doing significant work, which is why discomfort often increases during this phase.",
    noticeText: "Back pressure and general discomfort increasing. Braxton Hicks contractions. Sleep becoming more difficult. Shortness of breath as your baby takes up more space.",
    focusText: "Begin thinking about birth preparation and hospital bags. Rest when you can. Attend routine appointments and speak to your midwife about any concerns.",
    weekSummary: "Third trimester. Your baby is gaining weight and preparing for birth.",
    whatThisMeans: [
      "You are in the third trimester, the final stage before birth.",
      "Your baby is growing rapidly and your body is doing significant work to support this.",
    ],
    whatToExpect: [
      "Back pressure and discomfort increasing",
      "Braxton Hicks contractions",
      "Sleep becoming more difficult to manage",
      "Shortness of breath as your baby grows",
    ],
  };
  return {
    reassurance: "You are in the final weeks. Each day brings you closer. It is normal to feel a mix of anticipation, impatience, and readiness.",
    bodyText: "Your baby is fully formed and preparing for birth. They are gaining final weight and their lungs are completing maturation. Your body is preparing for labour.",
    noticeText: "Pelvic pressure as your baby descends. Nesting instinct may increase. Frequent Braxton Hicks. Weekly appointments with your care team.",
    focusText: "Focus on rest, preparation, and being ready without rushing. Your body and baby will set the pace. Trust your instincts and your care team.",
    weekSummary: "The final weeks. Each day brings you closer.",
    whatThisMeans: [
      "You are in the final weeks of pregnancy. Your baby is fully formed and preparing for birth.",
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
  if (week <= 12) return { display: "First Trimester", number: 1, path: "/pregnancy/first-trimester" };
  if (week <= 27) return { display: "Second Trimester", number: 2, path: "/pregnancy/second-trimester" };
  return { display: "Third Trimester", number: 3, path: "/pregnancy/third-trimester" };
};

export const computeResult = (lmp: Date): CalcResult => {
  const dueDate = addDays(lmp, 280);
  const today = new Date();
  const daysSinceLMP = differenceInDays(today, lmp);
  const currentWeek = Math.min(Math.max(Math.floor(daysSinceLMP / 7) + 1, 1), 40);
  const currentDay = Math.max(daysSinceLMP % 7, 0);
  const daysRemaining = Math.max(differenceInDays(dueDate, today), 0);
  const weeksRemaining = Math.floor(daysRemaining / 7);
  const tri = getTrimesterInfo(currentWeek);
  const upcomingMilestones = MILESTONES.filter((m) => m.week >= currentWeek).slice(0, 4);
  return {
    currentWeek, currentDay, daysRemaining, weeksRemaining,
    dueDate, trimester: tri.display, trimesterNumber: tri.number, trimesterPath: tri.path,
    upcomingMilestones, insight: getInsight(currentWeek),
  };
};

// ─── Fade ─────────────────────────────────────────────────────────────────────

const Fade = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div className={cn(
      "transition-all duration-700",
      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      className
    )}>
      {children}
    </div>
  );
};

// ─── Main ─────────────────────────────────────────────────────────────────────

interface Props {
  lmp: Date;
}

const DueDateCalculatorResult = ({ lmp }: Props) => {
  const result = computeResult(lmp);
  const today = new Date();
  const progressPct = Math.min((result.currentWeek / 40) * 100, 100);
  const [aiQuestion, setAiQuestion] = useState("");
  const navigate = useNavigate();

  const handleAskNow = () => {
    const q = aiQuestion.trim();
    if (q) navigate(`/ask?q=${encodeURIComponent(q)}`);
  };

  const trimesterZones = [
    { label: "1st", start: 1, end: 12, width: (12 / 40) * 100 },
    { label: "2nd", start: 13, end: 27, width: (15 / 40) * 100 },
    { label: "3rd", start: 28, end: 40, width: (13 / 40) * 100 },
  ];

  return (
    <div>

      {/* ═══════════════════════════════════════════════════════════════════
          S1: RESULTS HERO — elevated, personal, emotionally grounded
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-parchment-dark py-20 md:py-28">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
          <Fade delay={0}>
            <p className="font-sans text-[11px] font-light tracking-[0.2em] uppercase text-sage-muted mb-6">
              Your pregnancy timeline
            </p>
          </Fade>

          {/* Due date hero card */}
          <Fade delay={60}>
            <div className="bg-card border border-border/50 rounded-2xl shadow-card-brand overflow-hidden mb-6">
              <div
                className="h-1"
                style={{ backgroundColor: 'hsl(var(--stage-pregnancy-accent) / 0.4)' }}
              />
              <div className="px-7 sm:px-10 py-9 sm:py-11">
                <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-3">
                  Estimated due date
                </p>
                <p className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight mb-6">
                  {format(result.dueDate, "EEEE, d MMMM yyyy")}
                </p>

                {/* Stat row */}
                <div className="flex flex-wrap gap-x-8 gap-y-4 mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-3xl sm:text-4xl text-foreground">{result.currentWeek}</span>
                    <span className="font-sans text-sm font-light text-muted-foreground">
                      weeks{result.currentDay > 0 ? ` + ${result.currentDay}d` : ""}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-3xl sm:text-4xl text-foreground">{result.weeksRemaining}</span>
                    <span className="font-sans text-sm font-light text-muted-foreground">remaining</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span
                      className="font-sans text-sm font-light px-3 py-1 rounded-full"
                      style={{ backgroundColor: 'hsl(var(--stage-pregnancy) / 0.25)', color: 'hsl(var(--stage-pregnancy-accent))' }}
                    >
                      {result.trimester}
                    </span>
                  </div>
                </div>

                {/* Reassurance */}
                <p className="font-serif italic text-base sm:text-lg text-foreground/70 leading-relaxed max-w-xl">
                  {result.insight.reassurance}
                </p>
              </div>
            </div>
          </Fade>

          {/* CTA pair */}
          <Fade delay={140}>
            <div className="flex flex-wrap gap-3">
              <Link
                to={`/pregnancy/week/${result.currentWeek}`}
                className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
              >
                Continue to week {result.currentWeek}
                <ArrowRight size={15} />
              </Link>
              <Link
                to={`/ask?q=What should I know at ${result.currentWeek} weeks pregnant?`}
                className="inline-flex items-center gap-2 border border-border/60 bg-card text-foreground rounded-pill px-7 py-3.5 font-sans text-sm font-light hover:border-sage/40 hover:shadow-card-brand transition-all"
              >
                <MessageCircle size={14} className="text-sage" />
                Ask about this stage
              </Link>
            </div>
          </Fade>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          S2: RIGHT NOW — 3 content blocks, stage-specific
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-parchment py-20 md:py-24">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
          <Fade delay={0}>
            <div className="mb-10">
              <p
                className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-3"
                style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}
              >
                Right now
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight">
                Where you are at week {result.currentWeek}
              </h2>
            </div>
          </Fade>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: Baby,
                label: "What is happening in your body",
                text: result.insight.bodyText,
              },
              {
                icon: Heart,
                label: "What you may notice next",
                text: result.insight.noticeText,
              },
              {
                icon: Calendar,
                label: "What matters most right now",
                text: result.insight.focusText,
              },
            ].map((block, i) => (
              <Fade key={i} delay={i * 80}>
                <div className="bg-card border border-border/50 rounded-2xl p-6 sm:p-7 shadow-card-brand h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: 'hsl(var(--stage-pregnancy) / 0.2)' }}
                    >
                      <block.icon size={16} style={{ color: 'hsl(var(--stage-pregnancy-accent))' }} />
                    </div>
                    <p className="font-sans text-xs font-light tracking-[0.12em] uppercase text-sage-muted">
                      {block.label}
                    </p>
                  </div>
                  <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed flex-1">
                    {block.text}
                  </p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          S3: PREGNANCY JOURNEY — elegant timeline
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-parchment-dark py-20 md:py-24">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
          <Fade delay={0}>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-start">
              {/* Left: context */}
              <div className="md:col-span-2">
                <p className="font-sans text-[11px] font-light tracking-[0.2em] uppercase text-sage-muted mb-3">
                  Your journey
                </p>
                <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-4">
                  What happens from here
                </h2>
                <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-6">
                  Forty weeks, three trimesters, one continuous journey. You are {Math.round(progressPct)}% through.
                </p>

                {/* Compact stats */}
                <div className="flex gap-6">
                  <div>
                    <p className="font-serif text-3xl text-foreground">{result.currentWeek - 1}</p>
                    <p className="font-sans text-[10px] font-light text-sage-muted tracking-wider uppercase">completed</p>
                  </div>
                  <div>
                    <p className="font-serif text-3xl text-foreground">{result.weeksRemaining}</p>
                    <p className="font-sans text-[10px] font-light text-sage-muted tracking-wider uppercase">remaining</p>
                  </div>
                </div>
              </div>

              {/* Right: visual timeline */}
              <div className="md:col-span-3">
                <div className="bg-card border border-border/50 rounded-2xl p-6 sm:p-8 shadow-card-brand">
                  {/* Progress bar */}
                  <div className="relative mb-8">
                    <div className="flex rounded-full overflow-hidden h-2.5 bg-parchment-dark">
                      {trimesterZones.map((z, i) => (
                        <div
                          key={i}
                          className="relative"
                          style={{ width: `${z.width}%` }}
                        >
                          <div
                            className="h-full"
                            style={{
                              backgroundColor: result.trimesterNumber > i + 1
                                ? 'hsl(var(--sage) / 0.5)'
                                : result.trimesterNumber === i + 1
                                  ? 'hsl(var(--stage-pregnancy-accent) / 0.35)'
                                  : 'transparent',
                            }}
                          />
                        </div>
                      ))}
                    </div>
                    {/* Current position marker */}
                    <div
                      className="absolute -top-1 transition-all duration-1000"
                      style={{ left: `calc(${progressPct}% - 8px)` }}
                    >
                      <div className="w-4 h-4 rounded-full bg-terracotta border-2 border-card shadow-sm" />
                    </div>
                  </div>

                  {/* Trimester labels */}
                  <div className="flex justify-between mb-6">
                    {trimesterZones.map((z, i) => (
                      <div key={i} className={cn(
                        "text-center",
                        result.trimesterNumber === i + 1 ? "opacity-100" : "opacity-50"
                      )}>
                        <p className="font-sans text-[10px] font-light tracking-wider uppercase text-sage-muted">
                          {z.label} trimester
                        </p>
                        <p className="font-sans text-[10px] font-light text-muted-foreground/50 mt-0.5">
                          Wk {z.start}–{z.end}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Next milestone preview */}
                  {result.upcomingMilestones[0] && (() => {
                    const next = result.upcomingMilestones[0];
                    const milestoneDate = addDays(lmp, next.week * 7);
                    const daysAway = differenceInDays(milestoneDate, today);
                    return (
                      <div
                        className="border-t pt-5 mt-2"
                        style={{ borderColor: 'hsl(var(--border) / 0.3)' }}
                      >
                        <p className="font-sans text-[10px] font-light tracking-wider uppercase text-sage-muted mb-2">
                          Next milestone
                        </p>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-serif text-base text-foreground">{next.label}</p>
                            <p className="font-sans text-xs font-light text-muted-foreground">{next.detail}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-sans text-sm font-light text-foreground">{format(milestoneDate, "d MMM")}</p>
                            <p className="font-sans text-[10px] font-light text-sage-muted">
                              {daysAway > 0 ? `in ${daysAway} days` : daysAway === 0 ? "today" : "passed"}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          S4: CURRENT WEEK ANCHOR — major next-step card
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-parchment py-20 md:py-24">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
          <Fade delay={0}>
            <Link
              to={`/pregnancy/week/${result.currentWeek}`}
              className="group block bg-card border border-border/50 rounded-2xl overflow-hidden shadow-card-brand hover:border-sage/40 hover:shadow-soft transition-all"
            >
              <div
                className="h-1"
                style={{ backgroundColor: 'hsl(var(--stage-pregnancy-accent) / 0.3)' }}
              />
              <div className="p-7 sm:p-10">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-10 items-start">
                  {/* Week number */}
                  <div className="md:col-span-1 flex md:flex-col items-center md:items-start gap-4 md:gap-2">
                    <div
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: 'hsl(var(--stage-pregnancy) / 0.2)' }}
                    >
                      <span
                        className="font-serif text-3xl sm:text-4xl"
                        style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}
                      >
                        {result.currentWeek}
                      </span>
                    </div>
                    <p className="font-sans text-xs font-light tracking-[0.12em] uppercase text-sage-muted">
                      Your week
                    </p>
                  </div>

                  {/* Content */}
                  <div className="md:col-span-4">
                    <p className="font-sans text-[11px] font-light tracking-[0.15em] uppercase text-sage-muted mb-3">
                      Week {result.currentWeek} guide
                    </p>
                    <h3 className="font-serif text-xl sm:text-2xl text-foreground leading-snug mb-3">
                      {result.insight.weekSummary}
                    </h3>
                    <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-5 max-w-lg">
                      What is happening this week, how it can feel, and what to focus on right now.
                    </p>
                    <span className="inline-flex items-center gap-2 font-sans text-sm font-light text-sage group-hover:text-sage-muted transition-colors">
                      Read your week {result.currentWeek} guide
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </Fade>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          S5: ASK ABOUT THIS STAGE — tightly tied to current week
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        className="py-20 md:py-24"
        style={{ backgroundColor: 'hsl(var(--stage-pregnancy) / 0.08)' }}
      >
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-14 items-start">
            <Fade delay={0} className="md:col-span-2">
              <p
                className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-3"
                style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}
              >
                Ask about week {result.currentWeek}
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-4">
                Something on your mind?
              </h2>
              <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-6">
                Ask anything about this stage. Symptoms, what is normal, what to expect, or what has been worrying you.
              </p>

              <div className="relative mb-4">
                <input
                  type="text"
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAskNow()}
                  placeholder="What is on your mind today?"
                  className="w-full bg-card border border-border/60 rounded-xl px-5 py-4 font-sans text-sm font-light text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-sage/50 transition-all"
                />
              </div>
              <button
                onClick={handleAskNow}
                className="flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
              >
                <MessageCircle size={15} />
                Ask now
              </button>
            </Fade>

            <Fade delay={100} className="md:col-span-3">
              <div className="bg-card border border-border/50 rounded-2xl p-7 shadow-card-brand">
                <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-5">
                  Common questions at this stage
                </p>
                {[
                  `Is this normal at ${result.currentWeek} weeks?`,
                  "What should I expect next?",
                  "Why do I feel like this?",
                  result.currentWeek <= 10
                    ? "When should I book my first scan?"
                    : result.currentWeek <= 20
                      ? "What happens at the 20-week scan?"
                      : "How should I prepare for birth?",
                ].map((q, i) => (
                  <button
                    key={i}
                    onClick={() => { setAiQuestion(q); }}
                    className="group w-full flex items-start gap-3 py-4 border-b border-border/30 last:border-0 text-left hover:pl-1 transition-all"
                  >
                    <MessageCircle size={13} className="text-sage mt-0.5 shrink-0" />
                    <p className="font-sans text-sm font-light text-foreground leading-relaxed group-hover:text-sage transition-colors">
                      {q}
                    </p>
                  </button>
                ))}
              </div>
            </Fade>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          S6: WHAT'S NEXT — focused milestones roadmap
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-parchment py-20 md:py-24">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
          <Fade delay={0}>
            <p className="font-sans text-[11px] font-light tracking-[0.2em] uppercase text-sage-muted mb-3">
              What is ahead
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-snug mb-8">
              Your next milestones
            </h2>
          </Fade>

          <div className="relative">
            {/* Vertical connector line */}
            <div className="absolute left-[19px] top-6 bottom-6 w-px bg-border/30 hidden sm:block" />

            <div className="space-y-4">
              {result.upcomingMilestones.map((m, idx) => {
                const milestoneDate = addDays(lmp, m.week * 7);
                const daysAway = differenceInDays(milestoneDate, today);
                return (
                  <Fade key={m.week} delay={idx * 60}>
                    <div className="flex items-start gap-5 sm:gap-6">
                      {/* Week circle */}
                      <div className="relative z-10 shrink-0 w-10 h-10 rounded-full bg-card border border-border/50 flex items-center justify-center shadow-sm">
                        <span className="font-serif text-sm text-foreground">{m.week}</span>
                      </div>
                      {/* Content */}
                      <div className="flex-1 bg-card border border-border/50 rounded-2xl px-6 py-5 shadow-card-brand flex items-center justify-between gap-4">
                        <div>
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
                    </div>
                  </Fade>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          S7: JOURNAL — positioned as stage companion
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-parchment-dark py-20 md:py-24">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
          <Fade delay={0}>
            <div
              className="border rounded-2xl p-7 sm:p-10 overflow-hidden relative"
              style={{
                backgroundColor: 'hsl(var(--stage-pregnancy) / 0.08)',
                borderColor: 'hsl(var(--stage-pregnancy-accent) / 0.1)',
              }}
            >
              {/* Corner accent */}
              <div
                className="absolute top-0 right-0 w-20 h-20 rounded-bl-[3rem] opacity-30"
                style={{ backgroundColor: 'hsl(var(--stage-pregnancy) / 0.3)' }}
              />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <BookOpen size={18} style={{ color: 'hsl(var(--stage-pregnancy-accent))' }} />
                  <p
                    className="font-sans text-[11px] font-light tracking-[0.2em] uppercase"
                    style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}
                  >
                    Capture this stage
                  </p>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl text-foreground leading-snug mb-3 max-w-md">
                  Some moments deserve to be held onto
                </h3>
                <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-6 max-w-lg">
                  The early weeks move quickly. Keep a private record of how this stage feels, what surprises you,
                  and what you want to remember. The Start of You Journal is designed for exactly this.
                </p>

                <Link
                  to="/journal"
                  className="inline-flex items-center gap-2 border rounded-pill px-6 py-3 font-sans text-sm font-light text-foreground hover:shadow-card-brand transition-all"
                  style={{ borderColor: 'hsl(var(--stage-pregnancy-accent) / 0.2)' }}
                >
                  Explore the journal
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          S8: EXPLORE NEXT — minimal, relevant links
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-parchment py-16 md:py-20">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
          <Fade delay={0}>
            <p className="font-sans text-[11px] font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
              Continue exploring
            </p>
          </Fade>
          <div className="divide-y divide-border/40">
            {[
              { label: result.trimester + " guide", sub: `What to expect during weeks ${result.trimesterNumber === 1 ? "1–12" : result.trimesterNumber === 2 ? "13–27" : "28–40"}`, href: result.trimesterPath },
              { label: "Early pregnancy symptoms", sub: "What is common, what is normal, what to watch for", href: "/articles/early-pregnancy-symptoms" },
              { label: "Your full pregnancy journey", sub: "An overview of all 40 weeks", href: "/pregnancy" },
            ].map((link, i) => (
              <Fade key={i} delay={i * 50}>
                <Link to={link.href} className="group flex items-center justify-between py-5 hover:pl-1 transition-all">
                  <div>
                    <p className="font-serif text-lg text-foreground group-hover:text-sage transition-colors leading-snug">{link.label}</p>
                    <p className="font-sans text-sm font-light text-muted-foreground mt-0.5">{link.sub}</p>
                  </div>
                  <ArrowRight size={14} className="text-muted-foreground/40 group-hover:text-sage transition-colors ml-4 shrink-0" />
                </Link>
              </Fade>
            ))}
          </div>

          <Fade delay={180}>
            <p className="mt-10 font-sans text-xs font-light text-muted-foreground flex items-center gap-2">
              <span className="text-sage">✔</span> Medically reviewed by Jenny Joines
            </p>
          </Fade>
        </div>
      </section>

    </div>
  );
};

export default DueDateCalculatorResult;
