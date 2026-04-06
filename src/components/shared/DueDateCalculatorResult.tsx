/**
 * DueDateCalculatorResult — v4.
 * Not a calculator output. The beginning of a guided journey.
 * Reveal → Start Journey → Interpretation → Right Now → Timeline → Milestones → Ask → Journal → Explore → Final CTA
 */

import { useEffect, useState } from "react";
import { addDays, differenceInDays, format } from "date-fns";
import {
  ArrowRight, MessageCircle, BookOpen, Calendar, Baby, Heart,
  Shield, Sparkles, ChevronRight, Clock, Check,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Milestone { week: number; label: string; detail: string }

interface StageInsight {
  reassurance: string;
  bodyText: string;
  noticeText: string;
  focusText: string;
  weekSummary: string;
  interpretationTitle: string;
  interpretation: string;
  emotionalTruth: string;
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
  { week: 8,  label: "First scan window",      detail: "Typically offered between 8 and 10 weeks" },
  { week: 12, label: "12-week scan",            detail: "Nuchal translucency screening and dating confirmation" },
  { week: 16, label: "Midwife appointment",     detail: "Routine antenatal check and blood pressure review" },
  { week: 20, label: "20-week anatomy scan",    detail: "Detailed anatomy and anomaly screening" },
  { week: 24, label: "Glucose tolerance test",  detail: "Usually offered between 24 and 28 weeks" },
  { week: 28, label: "Third trimester begins",  detail: "Final stage of pregnancy, more frequent checks begin" },
  { week: 32, label: "Growth scan",             detail: "Monitoring baby's size and position" },
  { week: 36, label: "Antenatal check",         detail: "Birth planning discussion and positioning check" },
  { week: 38, label: "Weekly midwife checks",   detail: "Regular monitoring as birth approaches" },
  { week: 40, label: "Estimated due date",      detail: "Your baby is considered full term" },
];

const getInsight = (week: number): StageInsight => {
  if (week <= 4) return {
    reassurance: "You are in the very earliest days. A lot is happening that you cannot see or feel yet, and that is completely normal.",
    bodyText: "Your body is beginning to produce pregnancy hormones at a cellular level. Implantation may have just occurred. Physical changes are almost entirely invisible at this stage.",
    noticeText: "Very little at this point. Some people notice mild cramping or spotting, but most feel no different from usual. Symptoms typically begin in the coming weeks.",
    focusText: "There is nothing urgent to do right now. Start prenatal vitamins if you have not already, and give yourself time to absorb the news at your own pace.",
    weekSummary: "The very earliest days. Most changes are invisible right now.",
    interpretationTitle: "What this really means at this stage",
    interpretation: "You may not feel pregnant yet. That is not unusual. Pregnancy at this stage is measured from the first day of your last period, which means your body is only just beginning the process. There is no rush to plan, announce, or prepare. The most helpful thing right now is to take things slowly and trust that your body knows what it is doing.",
    emotionalTruth: "It is okay if this does not feel real yet. For many people, it takes weeks before it does.",
  };
  if (week <= 6) return {
    reassurance: "You are in the early weeks. Hormone levels are rising rapidly and your body is beginning to respond. It is normal if things still feel uncertain or not quite real.",
    bodyText: "HCG levels are climbing quickly. Your body is adjusting to support the pregnancy. Internally, the embryo is forming its earliest structures, including the foundations of the heart and nervous system.",
    noticeText: "Fatigue that arrives without warning. Breast tenderness. Nausea may be beginning or building. A heightened sense of smell. Some people feel very little at this stage, and that is also normal.",
    focusText: "Rest when your body asks for it. Think about booking your first midwife appointment. You do not need to plan everything right now. One thing at a time is enough.",
    weekSummary: "Hormone levels are rising rapidly. Your body is beginning to respond.",
    interpretationTitle: "What this really means right now",
    interpretation: "This is the stage where pregnancy begins to become physical, but it may still feel abstract. Symptoms can arrive unevenly, some days more intense than others. There is no right way to feel at this point. Whether you are excited, anxious, or unsure, that is a normal part of early pregnancy. Your first scan is still a few weeks away, and that waiting period is one of the hardest parts.",
    emotionalTruth: "Feeling excited and scared at the same time is not contradictory. It is honest.",
  };
  if (week <= 9) return {
    reassurance: "Symptoms are often at their most intense around now. This phase is temporary, and what you are feeling is your body doing exactly what it needs to do.",
    bodyText: "Rapid development is happening. Your baby's major organs are beginning to form. Your body is working hard to support this, which is why symptoms can feel so present and sometimes overwhelming.",
    noticeText: "Nausea and morning sickness often peak during this window. Deep fatigue. Emotional sensitivity and mood changes. Your first scan is approaching, which can bring both relief and nervousness.",
    focusText: "Managing nausea and rest are priorities right now. Your first scan is near. Focus on getting through each day without expecting too much of yourself. This intensity does not last.",
    weekSummary: "Symptoms are often at their most intense right now. This is temporary.",
    interpretationTitle: "What this stage actually feels like",
    interpretation: "This is often the most physically demanding part of the first trimester. It can be hard to function normally while feeling this level of fatigue and nausea. Many people find it difficult to talk about because the pregnancy is often not yet shared. You are not being dramatic. What you are experiencing is significant, even if others cannot see it yet. Your first scan is close, and that can help things feel more real.",
    emotionalTruth: "You do not need to feel grateful every moment to be grateful overall. Hard days are part of this.",
  };
  if (week <= 12) return {
    reassurance: "You are approaching the end of the first trimester. This is a significant milestone. Many people begin to feel a shift in energy and confidence around this time.",
    bodyText: "Your baby's major organs are formed. The focus now shifts to growth and development. Your body is preparing for the second trimester, which often brings relief from early symptoms.",
    noticeText: "Nausea may begin to ease. Energy levels often start to improve. Your bump may not be visible yet, but internal changes are significant. The 12-week scan is near.",
    focusText: "Your 12-week scan is the major upcoming event. After that, many people begin to share their news. Focus on what feels right for you, there is no correct timeline for telling people.",
    weekSummary: "Approaching the end of the first trimester. The 12-week scan is near.",
    interpretationTitle: "Why this milestone matters",
    interpretation: "The 12-week mark carries weight for many people. It often represents the first moment the pregnancy begins to feel more certain. After the scan, symptoms typically begin to ease, energy returns, and there is often a shift from surviving to settling in. This is also when many people start to share their news. Whatever pace feels right for you is the right one.",
    emotionalTruth: "Reaching this point is significant. You have already been through a lot, even if it does not feel that way.",
  };
  if (week <= 20) return {
    reassurance: "You are in the second trimester. Energy often returns, nausea eases, and the pregnancy begins to feel more tangible. This is often a more comfortable phase.",
    bodyText: "Your baby is growing steadily. Organs are maturing and movement is increasing. Your bump is becoming visible. Internally, blood volume has increased significantly to support the pregnancy.",
    noticeText: "More energy. Less nausea. Your bump showing. You may feel baby movement for the first time. Round ligament discomfort as your body adjusts to accommodate growth.",
    focusText: "The 20-week anatomy scan is a key milestone ahead. Allow yourself to settle into this stage. Many people find this the most enjoyable phase of pregnancy.",
    weekSummary: "The second trimester. Energy often improves and nausea eases.",
    interpretationTitle: "What this stage feels like for most people",
    interpretation: "The second trimester is often described as the settling-in period. The intensity of the first trimester begins to lift, and things start to feel more manageable. Your bump becomes visible, movement may begin, and the pregnancy starts to feel more present in daily life. This is often a good time to plan, prepare, and enjoy the process before the third trimester brings a new set of physical demands.",
    emotionalTruth: "If the first trimester felt like surviving, this stage often feels like arriving.",
  };
  if (week <= 27) return {
    reassurance: "You are well into the second trimester now. Your baby is becoming increasingly active and your body is adapting to support continued growth.",
    bodyText: "Your baby is developing rapidly. Movement becomes more noticeable and predictable. Your body is managing increased demands on circulation, digestion, and energy.",
    noticeText: "Regular baby movement becoming more familiar. Round ligament discomfort. Glucose tolerance testing may be offered soon. You may notice Braxton Hicks contractions beginning.",
    focusText: "Pay attention to movement patterns. Continue routine appointments. Begin thinking about birth preferences and the transition into the third trimester.",
    weekSummary: "Growing steadily. Your baby is becoming increasingly active.",
    interpretationTitle: "What to understand at this point",
    interpretation: "By now, the pregnancy is an established part of daily life. Movement patterns are becoming familiar, and the relationship with your baby is deepening. The third trimester is approaching, which brings more frequent appointments and a shift toward preparation. This is a good time to begin thinking about birth preferences, hospital bags, and practical arrangements without rushing.",
    emotionalTruth: "The middle of any journey can feel quiet. That does not mean nothing important is happening.",
  };
  if (week <= 32) return {
    reassurance: "You are in the third trimester. Your baby is gaining weight and preparing for birth. The final stretch can feel both exciting and physically demanding.",
    bodyText: "Your baby is growing rapidly and laying down fat stores. Lungs are maturing. Your body is doing significant work, which is why discomfort often increases during this phase.",
    noticeText: "Back pressure and general discomfort increasing. Braxton Hicks contractions becoming more noticeable. Sleep becoming more difficult. Shortness of breath as your baby takes up more space.",
    focusText: "Begin finalising birth preparation and hospital bags. Rest when you can. Attend routine appointments and speak to your midwife about any concerns or questions.",
    weekSummary: "Third trimester. Your baby is gaining weight and preparing for birth.",
    interpretationTitle: "What to expect in the final stretch",
    interpretation: "The third trimester is physically demanding in a different way. Your body is carrying significant weight, sleep becomes harder, and daily tasks require more effort. This is normal and temporary. Many people feel a mix of readiness and anxiety as birth approaches. Focus on practical preparation without over-planning, and trust that your care team will guide you through the final stages.",
    emotionalTruth: "Feeling ready and not ready at the same time is not confusion. It is honesty.",
  };
  return {
    reassurance: "You are in the final weeks. Each day brings you closer. It is normal to feel a mix of anticipation, impatience, and readiness.",
    bodyText: "Your baby is fully formed and preparing for birth. They are gaining final weight and their lungs are completing maturation. Your body is preparing for labour.",
    noticeText: "Pelvic pressure as your baby descends. Nesting instinct may increase. Frequent Braxton Hicks. Weekly appointments with your care team to monitor progress.",
    focusText: "Focus on rest, preparation, and being ready without rushing. Your body and baby will set the pace. Trust your instincts and your care team.",
    weekSummary: "The final weeks. Each day brings you closer.",
    interpretationTitle: "What this waiting period is really like",
    interpretation: "The final weeks are often a strange mix of urgency and stillness. You may feel completely ready one day and overwhelmed the next. Time can feel like it has slowed down. This is one of the most emotionally complex parts of the journey, and it is okay to feel all of it. Your baby will arrive, and you are more prepared than you think.",
    emotionalTruth: "The waiting is hard. But you have already done so much to get here.",
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
  const upcomingMilestones = MILESTONES.filter((m) => m.week >= currentWeek).slice(0, 5);
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
    <div className={cn("transition-all duration-700", visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4", className)}>
      {children}
    </div>
  );
};

// ─── Component ────────────────────────────────────────────────────────────────

interface Props { lmp: Date }

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
    { label: "1st", start: 1, end: 12, pct: 30 },
    { label: "2nd", start: 13, end: 27, pct: 37.5 },
    { label: "3rd", start: 28, end: 40, pct: 32.5 },
  ];

  return (
    <div>

      {/* ═══════════════════════════════════════════════════════════════════
          S1: THE REVEAL — ceremonial, personal, grounding
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-parchment-dark pt-14 pb-20 md:pt-20 md:pb-28 overflow-hidden">
        {/* Ambient glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, hsl(var(--stage-pregnancy) / 0.12) 0%, transparent 70%)' }}
        />

        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl relative z-10">
          {/* Breadcrumb */}
          <Fade delay={0}>
            <div className="flex items-center gap-2 font-sans text-[11px] font-light text-sage-muted mb-14 md:mb-20">
              <Link to="/due-date-calculator" className="hover:text-sage transition-colors">Due date calculator</Link>
              <ChevronRight size={10} />
              <span className="text-foreground/60">Your results</span>
            </div>
          </Fade>

          {/* Due date — large, confident, centred */}
          <Fade delay={100}>
            <div className="text-center mb-10 md:mb-12">
              <p
                className="font-sans text-[11px] font-light tracking-[0.3em] uppercase mb-6"
                style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}
              >
                Your estimated due date
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-[4rem] text-foreground leading-[1.05] mb-3">
                {format(result.dueDate, "d MMMM yyyy")}
              </h1>
              <p className="font-sans text-sm font-light text-muted-foreground/50 mb-10">
                {format(result.dueDate, "EEEE")}
              </p>

              {/* Orientation chips */}
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
                <div
                  className="rounded-xl px-5 py-3 border text-center"
                  style={{
                    backgroundColor: 'hsl(var(--stage-pregnancy) / 0.06)',
                    borderColor: 'hsl(var(--stage-pregnancy-accent) / 0.08)',
                  }}
                >
                  <p className="font-serif text-2xl text-foreground leading-none mb-0.5">{result.currentWeek}</p>
                  <p className="font-sans text-[10px] font-light text-sage-muted tracking-wider uppercase">
                    week{result.currentDay > 0 ? ` + ${result.currentDay}d` : ""}
                  </p>
                </div>
                <div
                  className="rounded-xl px-5 py-3 border text-center"
                  style={{
                    backgroundColor: 'hsl(var(--stage-pregnancy) / 0.06)',
                    borderColor: 'hsl(var(--stage-pregnancy-accent) / 0.08)',
                  }}
                >
                  <p className="font-serif text-2xl text-foreground leading-none mb-0.5">{result.weeksRemaining}</p>
                  <p className="font-sans text-[10px] font-light text-sage-muted tracking-wider uppercase">remaining</p>
                </div>
                <Link
                  to={result.trimesterPath}
                  className="group rounded-xl px-5 py-3 border text-center hover:shadow-card-brand transition-all"
                  style={{
                    backgroundColor: 'hsl(var(--stage-pregnancy) / 0.06)',
                    borderColor: 'hsl(var(--stage-pregnancy-accent) / 0.08)',
                  }}
                >
                  <p
                    className="font-serif text-base leading-tight mb-0.5"
                    style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}
                  >
                    {result.trimester}
                  </p>
                  <p className="font-sans text-[10px] font-light text-sage-muted tracking-wider uppercase group-hover:text-sage transition-colors">
                    View guide
                  </p>
                </Link>
              </div>

              {/* Emotional truth */}
              <p className="font-serif italic text-base sm:text-lg text-foreground/55 leading-relaxed max-w-xl mx-auto mb-12">
                {result.insight.emotionalTruth}
              </p>

              {/* Primary CTA — dominant */}
              <div className="flex flex-col items-center gap-3">
                <Link
                  to="/pregnancy"
                  className="inline-flex items-center gap-2.5 bg-terracotta text-terracotta-foreground rounded-pill px-10 py-4.5 font-sans text-base font-medium shadow-cta hover:bg-terracotta-hover hover:shadow-lg transition-all"
                >
                  Start your journey
                  <ArrowRight size={16} />
                </Link>
                <p className="font-sans text-xs font-light text-muted-foreground/50">
                  Save your stage and begin personalised guidance from week {result.currentWeek}
                </p>
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          S2: START YOUR JOURNEY — the conversion bridge
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-parchment py-0">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl -mt-8 relative z-20">
          <Fade delay={0}>
            <div
              className="rounded-2xl border shadow-soft overflow-hidden"
              style={{
                backgroundColor: 'hsl(var(--card))',
                borderColor: 'hsl(var(--stage-pregnancy-accent) / 0.1)',
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left — emotional framing */}
                <div
                  className="p-8 sm:p-10 md:p-12 flex flex-col justify-center"
                  style={{ backgroundColor: 'hsl(var(--stage-pregnancy) / 0.06)' }}
                >
                  <p
                    className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
                    style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}
                  >
                    More than a due date
                  </p>
                  <h2 className="font-serif text-xl sm:text-2xl text-foreground leading-snug mb-4">
                    Your result is a starting point.
                    <br />
                    <span className="font-serif italic text-foreground/60">
                      Your journey is what comes next.
                    </span>
                  </h2>
                  <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                    You do not need to figure out everything at once. Starting your journey means the guidance moves with you,
                    week by week, from where you are now.
                  </p>
                </div>

                {/* Right — benefits + CTA */}
                <div className="p-8 sm:p-10 md:p-12 flex flex-col justify-center">
                  <div className="space-y-4 mb-8">
                    {[
                      { text: "Save your place in the journey", sub: "Your current week, stage, and progress" },
                      { text: "Unlock week-by-week guidance", sub: "Tailored to where you are right now" },
                      { text: "Track what is happening and what is ahead", sub: "Milestones, scans, and key moments" },
                      { text: "Come back to personalised support", sub: "Ask questions relevant to your stage" },
                    ].map((b, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div
                          className="mt-1 w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                          style={{ backgroundColor: 'hsl(var(--stage-pregnancy) / 0.15)' }}
                        >
                          <Check size={11} style={{ color: 'hsl(var(--stage-pregnancy-accent))' }} />
                        </div>
                        <div>
                          <p className="font-sans text-sm font-light text-foreground leading-snug">{b.text}</p>
                          <p className="font-sans text-xs font-light text-muted-foreground/60">{b.sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link
                    to="/pregnancy"
                    className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-8 py-3.5 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all self-start"
                  >
                    Start your journey
                    <ArrowRight size={14} />
                  </Link>
                  <p className="font-sans text-[11px] font-light text-muted-foreground/40 mt-3">
                    Takes a minute to begin
                  </p>
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          S3: WHAT THIS MEANS — editorial interpretation
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-parchment pt-20 pb-20 md:pt-28 md:pb-24">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
          <Fade delay={0}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-start">
              <div className="md:col-span-7">
                <p
                  className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-5"
                  style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}
                >
                  {result.insight.interpretationTitle}
                </p>
                <p className="font-serif text-lg sm:text-xl text-foreground/85 leading-[1.8] mb-8">
                  {result.insight.interpretation}
                </p>
                <p className="font-serif italic text-sm text-foreground/50 leading-relaxed mb-8">
                  {result.insight.reassurance}
                </p>
                <div className="flex items-center gap-2">
                  <Shield size={13} className="text-sage" />
                  <p className="font-sans text-xs font-light text-muted-foreground">
                    Medically reviewed by Jenny Joines
                  </p>
                </div>
              </div>

              {/* Week anchor — the bridge to guidance */}
              <div className="md:col-span-5">
                <Link
                  to={`/pregnancy/week/${result.currentWeek}`}
                  className="group block rounded-2xl overflow-hidden border shadow-card-brand hover:shadow-soft transition-all"
                  style={{ borderColor: 'hsl(var(--stage-pregnancy-accent) / 0.12)' }}
                >
                  <div
                    className="p-7 sm:p-8 flex flex-col items-center text-center"
                    style={{ backgroundColor: 'hsl(var(--stage-pregnancy) / 0.08)' }}
                  >
                    <p
                      className="font-sans text-[10px] font-light tracking-[0.2em] uppercase mb-3"
                      style={{ color: 'hsl(var(--stage-pregnancy-accent) / 0.6)' }}
                    >
                      You are here
                    </p>
                    <p
                      className="font-serif text-6xl sm:text-7xl leading-none mb-1"
                      style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}
                    >
                      {result.currentWeek}
                    </p>
                    <p className="font-sans text-xs font-light text-muted-foreground">
                      of 40 weeks
                    </p>
                  </div>
                  <div className="bg-card p-6 sm:p-7">
                    <p className="font-sans text-[11px] font-light tracking-[0.15em] uppercase text-sage-muted mb-2">
                      Your week {result.currentWeek} guide
                    </p>
                    <h3 className="font-serif text-lg text-foreground leading-snug mb-2">
                      {result.insight.weekSummary}
                    </h3>
                    <p className="font-sans text-xs font-light text-muted-foreground leading-relaxed mb-4">
                      What is happening, how it can feel, and what to focus on right now.
                    </p>
                    <span className="inline-flex items-center gap-2 font-sans text-sm text-sage group-hover:text-sage-muted transition-colors">
                      Read your week guide
                      <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          S4: RIGHT NOW — practical, stage-specific
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-parchment-dark py-20 md:py-24">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
          <Fade delay={0}>
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-1.5 h-8 rounded-full"
                style={{ backgroundColor: 'hsl(var(--stage-pregnancy-accent) / 0.3)' }}
              />
              <p
                className="font-sans text-[11px] font-light tracking-[0.2em] uppercase"
                style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}
              >
                Right now at week {result.currentWeek}
              </p>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-3">
              What you need to know
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground mb-10 max-w-lg">
              Three things that matter most at your stage right now.
            </p>
          </Fade>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: Baby, label: "Your body", text: result.insight.bodyText, num: "01" },
              { icon: Heart, label: "What you may notice", text: result.insight.noticeText, num: "02" },
              { icon: Calendar, label: "What to focus on", text: result.insight.focusText, num: "03" },
            ].map((block, i) => (
              <Fade key={i} delay={i * 80}>
                <div className="bg-card border border-border/50 rounded-2xl shadow-card-brand h-full flex flex-col overflow-hidden">
                  <div
                    className="h-0.5"
                    style={{ backgroundColor: `hsl(var(--stage-pregnancy-accent) / ${0.15 + i * 0.12})` }}
                  />
                  <div className="p-6 sm:p-7 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: 'hsl(var(--stage-pregnancy) / 0.15)' }}
                        >
                          <block.icon size={15} style={{ color: 'hsl(var(--stage-pregnancy-accent))' }} />
                        </div>
                        <p className="font-sans text-[11px] font-light tracking-[0.1em] uppercase text-sage-muted">
                          {block.label}
                        </p>
                      </div>
                      <span
                        className="font-serif text-lg select-none"
                        style={{ color: 'hsl(var(--stage-pregnancy-accent) / 0.12)' }}
                      >
                        {block.num}
                      </span>
                    </div>
                    <p className="font-sans text-sm font-light text-muted-foreground leading-[1.8] flex-1">
                      {block.text}
                    </p>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          S5: JOURNEY TIMELINE — system map, alive, navigational
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        className="py-20 md:py-24"
        style={{ backgroundColor: 'hsl(var(--stage-pregnancy) / 0.04)' }}
      >
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
          <Fade delay={0}>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-start">
              <div className="md:col-span-2">
                <p className="font-sans text-[11px] font-light tracking-[0.2em] uppercase text-sage-muted mb-3">
                  Your journey
                </p>
                <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-4">
                  What happens from here
                </h2>
                <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-8">
                  Forty weeks. Three trimesters. One continuous, supported journey that moves with you.
                </p>

                <div className="flex gap-6 mb-6">
                  <div>
                    <p className="font-serif text-3xl text-foreground">{result.currentWeek - 1}</p>
                    <p className="font-sans text-[10px] font-light text-sage-muted tracking-wider uppercase">completed</p>
                  </div>
                  <div
                    className="w-px"
                    style={{ backgroundColor: 'hsl(var(--stage-pregnancy-accent) / 0.1)' }}
                  />
                  <div>
                    <p className="font-serif text-3xl text-foreground">{result.weeksRemaining}</p>
                    <p className="font-sans text-[10px] font-light text-sage-muted tracking-wider uppercase">remaining</p>
                  </div>
                </div>

                <p
                  className="font-sans text-xs font-light"
                  style={{ color: 'hsl(var(--stage-pregnancy-accent) / 0.6)' }}
                >
                  {Math.round(progressPct)}% of the way through
                </p>
              </div>

              <div className="md:col-span-3">
                <div className="bg-card border border-border/50 rounded-2xl p-6 sm:p-8 shadow-card-brand">
                  {/* Progress bar */}
                  <div className="relative mb-3">
                    <div className="flex rounded-full overflow-hidden h-3 bg-parchment-dark">
                      {trimesterZones.map((z, i) => {
                        const isCompleted = result.trimesterNumber > i + 1;
                        const isCurrent = result.trimesterNumber === i + 1;
                        return (
                          <div key={i} className="relative" style={{ width: `${z.pct}%` }}>
                            <div
                              className="h-full transition-all duration-700"
                              style={{
                                backgroundColor: isCompleted
                                  ? 'hsl(var(--sage) / 0.45)'
                                  : isCurrent
                                    ? 'hsl(var(--stage-pregnancy-accent) / 0.35)'
                                    : 'transparent',
                              }}
                            />
                            {i < 2 && <div className="absolute right-0 top-0 bottom-0 w-px bg-parchment-dark/60" />}
                          </div>
                        );
                      })}
                    </div>
                    <div
                      className="absolute -top-0.5 transition-all duration-1000"
                      style={{ left: `calc(${progressPct}% - 7px)` }}
                    >
                      <div className="w-4 h-4 rounded-full bg-terracotta border-[2.5px] border-card shadow-md" />
                    </div>
                  </div>

                  <div className="flex justify-between mb-7">
                    {trimesterZones.map((z, i) => (
                      <div key={i} className={cn("text-center", result.trimesterNumber === i + 1 ? "opacity-100" : "opacity-40")}>
                        <p className="font-sans text-[10px] font-light tracking-wider uppercase text-sage-muted">{z.label} trimester</p>
                        <p className="font-sans text-[9px] font-light text-muted-foreground/50">Wk {z.start}–{z.end}</p>
                      </div>
                    ))}
                  </div>

                  {/* Next milestones preview */}
                  <div className="border-t border-border/30 pt-5 space-y-4">
                    <p className="font-sans text-[10px] font-light tracking-wider uppercase text-sage-muted mb-1">Coming up</p>
                    {result.upcomingMilestones.slice(0, 2).map((m, i) => {
                      const milestoneDate = addDays(lmp, m.week * 7);
                      const daysAway = differenceInDays(milestoneDate, today);
                      return (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-full bg-parchment-dark flex items-center justify-center shrink-0">
                              <span className="font-serif text-[11px] text-foreground/70">{m.week}</span>
                            </div>
                            <div>
                              <p className="font-sans text-sm font-light text-foreground">{m.label}</p>
                              <p className="font-sans text-[11px] font-light text-muted-foreground/60">{m.detail}</p>
                            </div>
                          </div>
                          <div className="text-right shrink-0 ml-3">
                            <p className="font-sans text-sm font-light text-foreground">{format(milestoneDate, "d MMM")}</p>
                            <p className="font-sans text-[10px] font-light text-sage-muted">
                              {daysAway > 0 ? `${daysAway}d away` : daysAway === 0 ? "today" : "passed"}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          S6: MILESTONES — forward-looking, structured, useful
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-parchment py-20 md:py-24">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
          <Fade delay={0}>
            <p className="font-sans text-[11px] font-light tracking-[0.2em] uppercase text-sage-muted mb-3">
              Looking ahead
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-snug mb-3">
              Your next milestones
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground mb-10 max-w-md">
              Key checkpoints personalised to where you are now. Each one brings you closer.
            </p>
          </Fade>

          <div className="relative">
            <div
              className="absolute left-[19px] top-5 bottom-5 w-px hidden sm:block"
              style={{ backgroundColor: 'hsl(var(--stage-pregnancy-accent) / 0.1)' }}
            />
            <div className="space-y-4">
              {result.upcomingMilestones.map((m, idx) => {
                const milestoneDate = addDays(lmp, m.week * 7);
                const daysAway = differenceInDays(milestoneDate, today);
                const isFirst = idx === 0;
                return (
                  <Fade key={m.week} delay={idx * 60}>
                    <div className="flex items-start gap-5 sm:gap-6">
                      <div
                        className="relative z-10 shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-sm border"
                        style={{
                          backgroundColor: isFirst ? 'hsl(var(--stage-pregnancy) / 0.12)' : 'hsl(var(--card))',
                          borderColor: isFirst ? 'hsl(var(--stage-pregnancy-accent) / 0.2)' : 'hsl(var(--border) / 0.5)',
                        }}
                      >
                        <span
                          className="font-serif text-sm"
                          style={{ color: isFirst ? 'hsl(var(--stage-pregnancy-accent))' : undefined }}
                        >
                          {m.week}
                        </span>
                      </div>
                      <div
                        className="flex-1 rounded-2xl px-6 py-5 flex items-center justify-between gap-4 border"
                        style={{
                          backgroundColor: isFirst ? 'hsl(var(--card))' : 'hsl(var(--card) / 0.6)',
                          borderColor: isFirst ? 'hsl(var(--stage-pregnancy-accent) / 0.12)' : 'hsl(var(--border) / 0.3)',
                          boxShadow: isFirst ? '0 2px 12px -4px hsl(var(--stage-pregnancy-accent) / 0.08)' : 'none',
                        }}
                      >
                        <div>
                          <p className={cn("font-sans text-sm mb-0.5", isFirst ? "font-normal text-foreground" : "font-light text-foreground")}>{m.label}</p>
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
          S7: ASK — warm, stage-tied, supportive
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-parchment-dark py-20 md:py-24">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-14 items-start">
            <Fade delay={0} className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={14} style={{ color: 'hsl(var(--stage-pregnancy-accent))' }} />
                <p
                  className="font-sans text-[11px] font-light tracking-[0.2em] uppercase"
                  style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}
                >
                  AI support for week {result.currentWeek}
                </p>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-4">
                Something on your mind?
              </h2>
              <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-6">
                Ask anything about where you are right now. Your answer will be tailored to week {result.currentWeek} of pregnancy.
              </p>
              <div className="relative mb-4">
                <input
                  type="text"
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAskNow()}
                  placeholder="What is on your mind?"
                  className="w-full bg-card border border-border/60 rounded-xl px-5 py-4 font-sans text-sm font-light text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-sage/50 transition-all"
                />
              </div>
              <button
                onClick={handleAskNow}
                className="flex items-center gap-2 border rounded-pill px-7 py-3 font-sans text-sm font-light text-foreground hover:shadow-card-brand transition-all"
                style={{ borderColor: 'hsl(var(--stage-pregnancy-accent) / 0.2)' }}
              >
                <MessageCircle size={14} className="text-sage" />
                Ask now
              </button>
            </Fade>

            <Fade delay={100} className="md:col-span-3">
              <div className="bg-card border border-border/50 rounded-2xl p-7 shadow-card-brand">
                <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-5">
                  Common at week {result.currentWeek}
                </p>
                {[
                  `Is this normal at ${result.currentWeek} weeks?`,
                  "What should I expect in the next few weeks?",
                  "Why do I feel like this?",
                  result.currentWeek <= 10
                    ? "When should I book my first scan?"
                    : result.currentWeek <= 20
                      ? "What happens at the 20-week scan?"
                      : "How should I start preparing for birth?",
                ].map((q, i) => (
                  <button
                    key={i}
                    onClick={() => setAiQuestion(q)}
                    className="group w-full flex items-start gap-3 py-4 border-b border-border/30 last:border-0 text-left hover:pl-1 transition-all"
                  >
                    <MessageCircle size={12} className="text-sage mt-1 shrink-0" />
                    <p className="font-sans text-sm font-light text-foreground leading-relaxed group-hover:text-sage transition-colors">{q}</p>
                  </button>
                ))}
              </div>
            </Fade>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          S8: JOURNAL — tangible, premium, emotionally meaningful
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        className="py-20 md:py-24"
        style={{ backgroundColor: 'hsl(var(--stage-pregnancy) / 0.04)' }}
      >
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
          <Fade delay={0}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
              {/* Left — emotional framing */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <BookOpen size={16} style={{ color: 'hsl(var(--stage-pregnancy-accent))' }} />
                  <p
                    className="font-sans text-[11px] font-light tracking-[0.2em] uppercase"
                    style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}
                  >
                    A companion to this journey
                  </p>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-foreground leading-snug mb-4">
                  Some moments deserve
                  <br />
                  to be held onto
                </h3>
                <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-3">
                  Week {result.currentWeek} will pass quickly. The feelings, questions, and quiet discoveries
                  of this stage are worth recording.
                </p>
                <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-8">
                  The Start of You Journal gives you a calm, private space to keep a record
                  of how this journey unfolds. Alongside your digital guidance, a place to return to.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    to="/journal"
                    className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
                  >
                    Explore the journal
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>

              {/* Right — product card */}
              <div
                className="rounded-2xl p-7 sm:p-8 border"
                style={{
                  backgroundColor: 'hsl(var(--stage-pregnancy) / 0.06)',
                  borderColor: 'hsl(var(--stage-pregnancy-accent) / 0.08)',
                }}
              >
                <p className="font-sans text-[10px] font-light tracking-wider uppercase text-sage-muted mb-5">
                  The Start of You Journal
                </p>
                <div className="space-y-3 mb-6">
                  {[
                    "Guided prompts for each stage of pregnancy",
                    "Space for thoughts, feelings, and quiet moments",
                    "A private record to return to, long after",
                    "Works alongside your weekly digital guidance",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div
                        className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: 'hsl(var(--stage-pregnancy-accent) / 0.35)' }}
                      />
                      <p className="font-sans text-sm font-light text-foreground/80 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
                <div
                  className="border-t pt-5"
                  style={{ borderColor: 'hsl(var(--stage-pregnancy-accent) / 0.08)' }}
                >
                  <p className="font-serif italic text-sm text-foreground/50">
                    "A quiet place to keep this part of your story."
                  </p>
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          S9: EXPLORE — intentional onward paths
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-parchment py-16 md:py-20">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
          <Fade delay={0}>
            <p className="font-sans text-[11px] font-light tracking-[0.2em] uppercase text-sage-muted mb-6">
              Explore your journey from here
            </p>
          </Fade>
          <div className="divide-y divide-border/40">
            {[
              {
                label: `Week ${result.currentWeek} guide`,
                sub: "Your most relevant guidance right now",
                href: `/pregnancy/week/${result.currentWeek}`,
              },
              {
                label: `${result.trimester} guide`,
                sub: `Guidance for weeks ${result.trimesterNumber === 1 ? "1 to 12" : result.trimesterNumber === 2 ? "13 to 27" : "28 to 40"}`,
                href: result.trimesterPath,
              },
              {
                label: "Your full pregnancy journey",
                sub: "An overview of all 40 weeks with stage-by-stage guidance",
                href: "/pregnancy",
              },
              {
                label: "Guidance library",
                sub: "Articles, guides, and answers for every stage",
                href: "/guidance",
              },
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
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          S10: FINAL CTA — trust-led closing with conviction
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-parchment-dark py-20 md:py-28">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-2xl text-center">
          <Fade delay={0}>
            <p
              className="font-sans text-[11px] font-light tracking-[0.3em] uppercase mb-6"
              style={{ color: 'hsl(var(--stage-pregnancy-accent) / 0.6)' }}
            >
              Your starting point
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground leading-snug mb-5">
              You have your date.
              <br />
              <span className="font-serif italic text-foreground/60">Now your journey can begin.</span>
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed max-w-md mx-auto mb-10">
              You do not need to figure everything out today. You have your starting point.
              We will help you take it one stage at a time, with guidance that moves with you.
            </p>

            <Link
              to="/pregnancy"
              className="inline-flex items-center gap-2.5 bg-terracotta text-terracotta-foreground rounded-pill px-10 py-4.5 font-sans text-base font-medium shadow-cta hover:bg-terracotta-hover hover:shadow-lg transition-all mb-10"
            >
              Start your journey
              <ArrowRight size={16} />
            </Link>

            {/* Trust cues */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-8">
              {[
                { icon: Shield, text: "Medically reviewed" },
                { icon: Calendar, text: "Personalised by stage" },
                { icon: Clock, text: "Week-by-week support" },
                { icon: Heart, text: "Save and return anytime" },
              ].map((cue, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <cue.icon size={11} className="text-sage" />
                  <p className="font-sans text-[11px] font-light text-muted-foreground">{cue.text}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-border/30 pt-6 mx-auto max-w-sm">
              <p className="font-sans text-[11px] font-light text-muted-foreground/50 leading-relaxed">
                Pregnancy timelines are estimates. Always consult your healthcare provider for personalised medical advice.
              </p>
            </div>
          </Fade>
        </div>
      </section>

    </div>
  );
};

export default DueDateCalculatorResult;
