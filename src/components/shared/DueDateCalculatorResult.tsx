/**
 * DueDateCalculatorResult — v6.
 * The conversion gateway into The Start of You.
 * Ceremonial result → Conversion bridge → Interpretation → Right Now →
 * Journey arc → Milestones → Ask → Journal → Onward → Final Trust CTA
 */

import { useEffect, useState } from "react";
import { addDays, differenceInDays, format } from "date-fns";
import {
  ArrowRight, MessageCircle, BookOpen, Calendar, Baby, Heart,
  Shield, Sparkles, ChevronRight, Check, Eye, Activity, Target, Star,
} from "lucide-react";
import journalFlatlay from "@/assets/journal-flatlay.jpg";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { BotanicalAccent, Sprig, SprigDivider, StageGlow } from "@/components/shared/StageBotanical";
import { stashPendingJourney, saveActivePregnancyJourney, getActivePregnancyJourney } from "@/lib/savedJourney";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/lib/analytics";
import { EVENTS } from "@/lib/analyticsEvents";
import AskLink from "@/components/shared/AskLink";
import { navigateToAsk } from "@/lib/askNavigation";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Milestone { week: number; label: string; detail: string }

interface StageInsight {
  reassurance: string;
  bodyText: string;
  noticeText: string;
  focusText: string;
  dontWorry: string;
  weekSummary: string;
  interpretationTitle: string;
  interpretation: string;
  emotionalTruth: string;
  heroInterpretation: string;
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
    dontWorry: "You do not need to tell anyone yet. You do not need to book every appointment today. You do not need symptoms to confirm what is real. This stage asks very little of you except patience.",
    weekSummary: "The very earliest days. Most changes are invisible right now.",
    interpretationTitle: "What this really means at this stage",
    interpretation: "You may not feel pregnant yet. That is not unusual. Pregnancy at this stage is measured from the first day of your last period, which means your body is only just beginning the process. There is no rush to plan, announce, or prepare. The most helpful thing right now is to take things slowly and trust that your body knows what it is doing.",
    emotionalTruth: "It is okay if this does not feel real yet. For many people, it takes weeks before it does.",
    heroInterpretation: "You are at the very beginning. Most of what is happening right now is invisible, and that is completely normal. There is no rush to do anything except take this in.",
  };
  if (week <= 6) return {
    reassurance: "You are in the early weeks. Hormone levels are rising rapidly and your body is beginning to respond. It is normal if things still feel uncertain or not quite real.",
    bodyText: "HCG levels are climbing quickly. Your body is adjusting to support the pregnancy. Internally, the embryo is forming its earliest structures, including the foundations of the heart and nervous system.",
    noticeText: "Fatigue that arrives without warning. Breast tenderness. Nausea may be beginning or building. A heightened sense of smell. Some people feel very little at this stage, and that is also normal.",
    focusText: "Rest when your body asks for it. Think about booking your first midwife appointment. You do not need to plan everything right now. One thing at a time is enough.",
    dontWorry: "You do not need to have chosen a hospital. You do not need to feel different every day. Symptoms that come and go are normal, not a warning sign. Give yourself permission to wait.",
    weekSummary: "Hormone levels are rising rapidly. Your body is beginning to respond.",
    interpretationTitle: "What this really means right now",
    interpretation: "This is the stage where pregnancy begins to become physical, but it may still feel abstract. Symptoms can arrive unevenly, some days more intense than others. There is no right way to feel at this point. Whether you are excited, anxious, or unsure, that is a normal part of early pregnancy. Your first scan is still a few weeks away, and that waiting period is one of the hardest parts.",
    emotionalTruth: "Feeling excited and scared at the same time is not contradictory. It is honest.",
    heroInterpretation: "You are in the early weeks. Your body is beginning to change, even if you cannot always feel it. Things may still feel uncertain, and that is a normal part of this stage.",
  };
  if (week <= 9) return {
    reassurance: "Symptoms are often at their most intense around now. This phase is temporary, and what you are feeling is your body doing exactly what it needs to do.",
    bodyText: "Rapid development is happening. Your baby's major organs are beginning to form. Your body is working hard to support this, which is why symptoms can feel so present and sometimes overwhelming.",
    noticeText: "Nausea and morning sickness often peak during this window. Deep fatigue. Emotional sensitivity and mood changes. Your first scan is approaching, which can bring both relief and nervousness.",
    focusText: "Managing nausea and rest are priorities right now. Your first scan is near. Focus on getting through each day without expecting too much of yourself. This intensity does not last.",
    dontWorry: "You do not need to be productive right now. You do not need to feel happy every day. The intensity of this stage does not mean something is wrong. Your body is doing enormous work and it is okay to slow down.",
    weekSummary: "Symptoms are often at their most intense right now. This is temporary.",
    interpretationTitle: "What this stage actually feels like",
    interpretation: "This is often the most physically demanding part of the first trimester. It can be hard to function normally while feeling this level of fatigue and nausea. Many people find it difficult to talk about because the pregnancy is often not yet shared. You are not being dramatic. What you are experiencing is significant, even if others cannot see it yet. Your first scan is close, and that can help things feel more real.",
    emotionalTruth: "You do not need to feel grateful every moment to be grateful overall. Hard days are part of this.",
    heroInterpretation: "You are in one of the most physically intense stretches of early pregnancy. Your first scan is approaching, and this intensity is temporary. You are doing more than you think.",
  };
  if (week <= 12) return {
    reassurance: "You are approaching the end of the first trimester. This is a significant milestone. Many people begin to feel a shift in energy and confidence around this time.",
    bodyText: "Your baby's major organs are formed. The focus now shifts to growth and development. Your body is preparing for the second trimester, which often brings relief from early symptoms.",
    noticeText: "Nausea may begin to ease. Energy levels often start to improve. Your bump may not be visible yet, but internal changes are significant. The 12-week scan is near.",
    focusText: "Your 12-week scan is the major upcoming event. After that, many people begin to share their news. Focus on what feels right for you, there is no correct timeline for telling people.",
    dontWorry: "You do not need to have told anyone yet. You do not need a visible bump to be properly pregnant. You do not need to have everything planned. The 12-week scan will bring more clarity.",
    weekSummary: "Approaching the end of the first trimester. The 12-week scan is near.",
    interpretationTitle: "Why this milestone matters",
    interpretation: "The 12-week mark carries weight for many people. It often represents the first moment the pregnancy begins to feel more certain. After the scan, symptoms typically begin to ease, energy returns, and there is often a shift from surviving to settling in. This is also when many people start to share their news. Whatever pace feels right for you is the right one.",
    emotionalTruth: "Reaching this point is significant. You have already been through a lot, even if it does not feel that way.",
    heroInterpretation: "You are approaching a meaningful milestone. The first trimester is nearly behind you, and the 12-week scan will mark a shift in how this pregnancy feels. Energy often returns from here.",
  };
  if (week <= 20) return {
    reassurance: "You are in the second trimester. Energy often returns, nausea eases, and the pregnancy begins to feel more tangible. This is often a more comfortable phase.",
    bodyText: "Your baby is growing steadily. Organs are maturing and movement is increasing. Your bump is becoming visible. Internally, blood volume has increased significantly to support the pregnancy.",
    noticeText: "More energy. Less nausea. Your bump showing. You may feel baby movement for the first time. Round ligament discomfort as your body adjusts to accommodate growth.",
    focusText: "The 20-week anatomy scan is a key milestone ahead. Allow yourself to settle into this stage. Many people find this the most enjoyable phase of pregnancy.",
    dontWorry: "You do not need to have bought anything yet. You do not need to have chosen a name. Not feeling movement every day at this stage is normal. Focus on settling in, not getting ahead.",
    weekSummary: "The second trimester. Energy often improves and nausea eases.",
    interpretationTitle: "What this stage feels like for most people",
    interpretation: "The second trimester is often described as the settling-in period. The intensity of the first trimester begins to lift, and things start to feel more manageable. Your bump becomes visible, movement may begin, and the pregnancy starts to feel more present in daily life. This is often a good time to plan, prepare, and enjoy the process before the third trimester brings a new set of physical demands.",
    emotionalTruth: "If the first trimester felt like surviving, this stage often feels like arriving.",
    heroInterpretation: "You are in the second trimester now. Things may begin to feel more real, more present, and a little easier to hold. This is often the stage where pregnancy starts to feel like something you can settle into.",
  };
  if (week <= 27) return {
    reassurance: "You are well into the second trimester now. Your baby is becoming increasingly active and your body is adapting to support continued growth.",
    bodyText: "Your baby is developing rapidly. Movement becomes more noticeable and predictable. Your body is managing increased demands on circulation, digestion, and energy.",
    noticeText: "Regular baby movement becoming more familiar. Round ligament discomfort. Glucose tolerance testing may be offered soon. You may notice Braxton Hicks contractions beginning.",
    focusText: "Pay attention to movement patterns. Continue routine appointments. Begin thinking about birth preferences and the transition into the third trimester.",
    dontWorry: "You do not need a finished nursery. You do not need a birth plan written yet. Braxton Hicks at this stage are normal practice contractions. There is time to prepare without pressure.",
    weekSummary: "Growing steadily. Your baby is becoming increasingly active.",
    interpretationTitle: "What to understand at this point",
    interpretation: "By now, the pregnancy is an established part of daily life. Movement patterns are becoming familiar, and the relationship with your baby is deepening. The third trimester is approaching, which brings more frequent appointments and a shift toward preparation. This is a good time to begin thinking about birth preferences, hospital bags, and practical arrangements without rushing.",
    emotionalTruth: "The middle of any journey can feel quiet. That does not mean nothing important is happening.",
    heroInterpretation: "You are well into the second trimester. Your baby is increasingly active and the third trimester is approaching. This is a good time to begin thinking ahead, gently, without rushing.",
  };
  if (week <= 32) return {
    reassurance: "You are in the third trimester. Your baby is gaining weight and preparing for birth. The final stretch can feel both exciting and physically demanding.",
    bodyText: "Your baby is growing rapidly and laying down fat stores. Lungs are maturing. Your body is doing significant work, which is why discomfort often increases during this phase.",
    noticeText: "Back pressure and general discomfort increasing. Braxton Hicks contractions becoming more noticeable. Sleep becoming more difficult. Shortness of breath as your baby takes up more space.",
    focusText: "Begin finalising birth preparation and hospital bags. Rest when you can. Attend routine appointments and speak to your midwife about any concerns or questions.",
    dontWorry: "You do not need to have everything ready right now. You do not need to know exactly what birth will look like. Discomfort at this stage is normal, not a sign that something is wrong. Your care team will guide the final steps.",
    weekSummary: "Third trimester. Your baby is gaining weight and preparing for birth.",
    interpretationTitle: "What to expect in the final stretch",
    interpretation: "The third trimester is physically demanding in a different way. Your body is carrying significant weight, sleep becomes harder, and daily tasks require more effort. This is normal and temporary. Many people feel a mix of readiness and anxiety as birth approaches. Focus on practical preparation without over-planning, and trust that your care team will guide you through the final stages.",
    emotionalTruth: "Feeling ready and not ready at the same time is not confusion. It is honesty.",
    heroInterpretation: "You are in the third trimester. Your body is doing significant work and your baby is preparing for arrival. The final stretch can feel both exciting and heavy, and both of those feelings are valid.",
  };
  return {
    reassurance: "You are in the final weeks. Each day brings you closer. It is normal to feel a mix of anticipation, impatience, and readiness.",
    bodyText: "Your baby is fully formed and preparing for birth. They are gaining final weight and their lungs are completing maturation. Your body is preparing for labour.",
    noticeText: "Pelvic pressure as your baby descends. Nesting instinct may increase. Frequent Braxton Hicks. Weekly appointments with your care team to monitor progress.",
    focusText: "Focus on rest, preparation, and being ready without rushing. Your body and baby will set the pace. Trust your instincts and your care team.",
    dontWorry: "You do not need to know exactly when it will happen. You do not need to feel completely ready. Very few people do. Your care team is monitoring you, and your body knows what to do when the time comes.",
    weekSummary: "The final weeks. Each day brings you closer.",
    interpretationTitle: "What this waiting period is really like",
    interpretation: "The final weeks are often a strange mix of urgency and stillness. You may feel completely ready one day and overwhelmed the next. Time can feel like it has slowed down. This is one of the most emotionally complex parts of the journey, and it is okay to feel all of it. Your baby will arrive, and you are more prepared than you think.",
    emotionalTruth: "The waiting is hard. But you have already done so much to get here.",
    heroInterpretation: "You are in the final weeks of pregnancy. Each day brings you closer to meeting your baby. The waiting can feel long, but you are more prepared than you think.",
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
  const [celebrate, setCelebrate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setCelebrate(true), 200);
    const off = setTimeout(() => setCelebrate(false), 4200);
    return () => { clearTimeout(t); clearTimeout(off); };
  }, []);

  // Tasteful long-form: "9 weeks 6 days" / "9 weeks" / "1 week 1 day"
  const formatWeeksDays = (w: number, d: number) => {
    const wk = `${w} ${w === 1 ? "week" : "weeks"}`;
    if (d <= 0) return wk;
    const dy = `${d} ${d === 1 ? "day" : "days"}`;
    return `${wk} ${dy}`;
  };

  const handleAskNow = () => {
    const q = aiQuestion.trim();
    navigateToAsk(navigate, q, { context: `Pregnancy week ${result.currentWeek}`, stage: "pregnancy" });
  };

  // Phase 15.1 · Fix 5: recognise auth + existing-journey state so the
  // signed-in path doesn't push through /auth/setup again.
  const [userId, setUserId] = useState<string | null>(null);
  const [hasJourney, setHasJourney] = useState<boolean>(false);
  const [savingJourney, setSavingJourney] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase.auth.getSession();
      const uid = data.session?.user?.id ?? null;
      if (cancelled) return;
      setUserId(uid);
      if (uid) {
        const existing = await getActivePregnancyJourney(uid);
        if (!cancelled) setHasJourney(Boolean(existing));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSaveJourney = async () => {
    trackEvent(EVENTS.SAVE_JOURNEY_STARTED);
    // Not signed in → keep the original stash + auth path.
    if (!userId) {
      stashPendingJourney(lmp);
      navigate("/auth");
      return;
    }
    // Signed in, already has a saved journey → this result is exploratory;
    // send the person back to their live weekly experience.
    if (hasJourney) {
      navigate("/my-week");
      return;
    }
    // Signed in, no active journey yet → commit directly, no re-onboarding.
    setSavingJourney(true);
    try {
      await saveActivePregnancyJourney(userId, lmp);
    } finally {
      setSavingJourney(false);
    }
    navigate("/my-week");
  };

  // Phase 15.1 · Fix 5: derived CTA copy so all three save buttons reflect
  // the true action for signed-in users with an already-saved journey.
  const isExploratory = Boolean(userId && hasJourney);
  const saveCtaLabel = savingJourney
    ? "Saving…"
    : isExploratory
    ? "Open my week"
    : "Save your journey";
  const saveCtaHelp = isExploratory
    ? "You already have a saved journey. This result is exploratory."
    : null;

  const trimesterZones = [
    { label: "1st", start: 1, end: 12, pct: 30 },
    { label: "2nd", start: 13, end: 27, pct: 37.5 },
    { label: "3rd", start: 28, end: 40, pct: 32.5 },
  ];

  return (
    <div>

      {/* ═══════════════════════════════════════════════════════════════════
          S1: THE REVEAL — ceremonial, grounding, the moment of orientation
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-parchment-dark pt-10 pb-20 md:pt-14 md:pb-28 overflow-hidden">
        {/* Layered ambient glow */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[700px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, hsl(var(--stage-pregnancy) / 0.18) 0%, transparent 60%)' }}
        />
        <StageGlow tone="pregnancy" className="inset-x-0 top-0 h-[500px]" opacity={0.85} />
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to top, hsl(var(--parchment)), transparent)' }}
        />

        {/* Botanical corner accents — pregnancy colour family */}
        <BotanicalAccent
          className="top-4 -left-10 md:top-8 md:-left-2"
          opacity="opacity-[0.48]"
          size="w-[240px] md:w-[360px]"
        />
        <BotanicalAccent
          flip
          className="top-2 -right-10 md:top-6 md:-right-2"
          opacity="opacity-[0.4]"
          size="w-[220px] md:w-[320px]"
        />

        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl relative z-10">
          {/* Breadcrumb */}
          <Fade delay={0}>
            <div className="flex items-center gap-2 font-sans text-[11px] font-light text-sage-muted mb-12 md:mb-16">
              <Link to="/due-date-calculator" className="hover:text-sage transition-colors">Due date calculator</Link>
              <ChevronRight size={10} />
              <span className="text-foreground/60">Your results</span>
            </div>
          </Fade>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
            {/* Left — the date, the meaning */}
            <div className="md:col-span-7 relative">
              {/* Soft sparkle reveal — premium, brief, fades away */}
              {celebrate && (
                <div className="pointer-events-none absolute -top-6 -left-2 right-0 h-40 overflow-visible z-0" aria-hidden="true">
                  {[
                    { l: "8%",  t: "30%", d: "0ms",   s: 8 },
                    { l: "22%", t: "10%", d: "120ms", s: 6 },
                    { l: "38%", t: "55%", d: "260ms", s: 5 },
                    { l: "54%", t: "20%", d: "180ms", s: 7 },
                    { l: "68%", t: "60%", d: "340ms", s: 5 },
                    { l: "82%", t: "35%", d: "420ms", s: 6 },
                  ].map((p, i) => (
                    <Sparkles
                      key={i}
                      size={p.s}
                      className="absolute animate-sparkle-fade"
                      style={{
                        left: p.l,
                        top: p.t,
                        color: 'hsl(var(--stage-pregnancy-accent))',
                        opacity: 0,
                        animationDelay: p.d,
                      }}
                    />
                  ))}
                </div>
              )}

              <Fade delay={60}>
                <div className="flex items-center gap-2 mb-5">
                  <span
                    className="h-px w-6"
                    style={{ backgroundColor: 'hsl(var(--stage-pregnancy-accent) / 0.45)' }}
                  />
                  <p
                    className="font-serif italic text-[13px] sm:text-sm"
                    style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}
                  >
                    Congratulations
                  </p>
                </div>
                <p
                  className="font-sans text-[10px] font-light tracking-[0.35em] uppercase mb-5 text-foreground/55"
                >
                  Your estimated due date
                </p>
              </Fade>

              <Fade delay={120}>
                <h1 className="font-serif text-[2.5rem] sm:text-[3.25rem] md:text-[4rem] text-foreground leading-[1.02] mb-1.5 relative">
                  <span className={cn("inline-block", celebrate && "animate-result-shimmer")}>
                    {format(result.dueDate, "d MMMM yyyy")}
                  </span>
                </h1>
                <p className="font-sans text-sm font-light text-muted-foreground/55 mb-8">
                  {format(result.dueDate, "EEEE")}
                </p>
              </Fade>

              <Fade delay={180}>
                <p className="font-sans text-[15px] font-light text-foreground/55 leading-[1.8] mb-6 max-w-md">
                  {result.insight.heroInterpretation}
                </p>
              </Fade>

              <Fade delay={220}>
                <p className="font-serif italic text-sm text-foreground/30 leading-relaxed mb-10 max-w-sm">
                  {result.insight.emotionalTruth}
                </p>
              </Fade>

              {/* CTA — dominant */}
              <Fade delay={280}>
                {saveCtaHelp && (
                  <p
                    className="font-sans text-[11px] font-medium tracking-[0.18em] uppercase mb-3"
                    style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
                    role="status"
                  >
                    {saveCtaHelp}
                  </p>
                )}
                <div className="flex flex-col sm:flex-row items-start gap-4 mb-3">
                  <button
                    type="button"
                    onClick={handleSaveJourney}
                    disabled={savingJourney}
                    className="inline-flex items-center gap-2.5 bg-terracotta text-terracotta-foreground rounded-pill px-10 py-4 font-sans text-[15px] font-medium shadow-cta hover:bg-terracotta-hover hover:shadow-lg transition-all disabled:opacity-70"
                  >
                    {saveCtaLabel}
                    <ArrowRight size={16} />
                  </button>
                  <AskLink
                    question={`What should I know at ${result.currentWeek} weeks pregnant?`}
                    context={`Pregnancy week ${result.currentWeek}`}
                    stage="pregnancy"
                    className="inline-flex items-center gap-2 font-sans text-sm font-light text-muted-foreground hover:text-sage transition-colors py-4"
                  >
                    <MessageCircle size={13} className="text-sage/60" />
                    Ask about this stage
                  </AskLink>
                </div>
                <p className="font-sans text-[11px] font-light text-muted-foreground/30 leading-relaxed max-w-sm">
                  Save your stage and begin personalised guidance from week {result.currentWeek}
                </p>
              </Fade>
            </div>

            {/* Right — orientation card */}
            <div className="md:col-span-5">
              <Fade delay={200}>
                <div
                  className="rounded-2xl border overflow-hidden"
                  style={{
                    borderColor: 'hsl(var(--stage-pregnancy-accent) / 0.1)',
                    boxShadow: '0 4px 24px -6px hsl(var(--stage-pregnancy-accent) / 0.06)',
                  }}
                >
                  {/* Week number — large, anchoring */}
                  <div
                    className="py-10 flex flex-col items-center text-center"
                    style={{ backgroundColor: 'hsl(var(--stage-pregnancy) / 0.07)' }}
                  >
                    <p
                      className="font-sans text-[9px] font-light tracking-[0.3em] uppercase mb-3"
                      style={{ color: 'hsl(var(--stage-pregnancy-accent) / 0.5)' }}
                    >
                      You are here
                    </p>
                    <p
                      className="font-serif text-6xl sm:text-7xl leading-none mb-1.5"
                      style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}
                    >
                      {result.currentWeek}
                    </p>
                    <p className="font-sans text-[11px] font-light text-muted-foreground/45">
                      of your pregnancy
                    </p>
                  </div>

                  {/* Long-form current progress — clarity over shorthand */}
                  <div className="bg-card px-5 pt-4 pb-3 text-center">
                    <p className="font-sans text-[8px] font-light text-sage-muted tracking-wider uppercase mb-1">
                      You are currently
                    </p>
                    <p className="font-serif text-base text-foreground leading-snug">
                      {formatWeeksDays(result.currentWeek, result.currentDay)}
                    </p>
                  </div>

                  {/* Stats row */}
                  <div className="bg-card px-5 py-4 grid grid-cols-2 divide-x divide-border/30 border-t border-border/20">
                    {[
                      { val: `${result.weeksRemaining}`, lab: "weeks left" },
                      { val: `T${result.trimesterNumber}`, lab: "trimester" },
                    ].map((s, i) => (
                      <div key={i} className="text-center px-2">
                        <p className="font-serif text-lg text-foreground leading-none mb-0.5">{s.val}</p>
                        <p className="font-sans text-[8px] font-light text-sage-muted tracking-wider uppercase">{s.lab}</p>
                      </div>
                    ))}
                  </div>

                  {/* Week guide link */}
                  <Link
                    to={`/pregnancy/week/${result.currentWeek}`}
                    className="group flex items-center justify-between bg-card px-5 py-4 border-t border-border/20 hover:bg-parchment transition-colors"
                  >
                    <div>
                      <p className="font-sans text-[10px] font-light tracking-[0.15em] uppercase text-sage-muted mb-0.5">
                        Week {result.currentWeek} guide
                      </p>
                      <p className="font-serif text-sm text-foreground leading-snug">
                        {result.insight.weekSummary}
                      </p>
                    </div>
                    <ArrowRight size={13} className="text-muted-foreground/30 group-hover:text-sage group-hover:translate-x-1 transition-all shrink-0 ml-3" />
                  </Link>
                </div>
              </Fade>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          S2: THE CONVERSION BRIDGE — why starting matters
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-parchment py-16 md:py-20 overflow-hidden">
        <StageGlow tone="pregnancy" className="-top-10 left-[-100px] w-[420px] h-[420px]" opacity={0.6} />
        <BotanicalAccent
          className="bottom-2 -right-12 md:bottom-6 md:-right-4"
          opacity="opacity-[0.3]"
          size="w-[200px] md:w-[280px]"
        />
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl relative z-10 mb-10">
          <SprigDivider tone="pregnancy" />
        </div>
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl relative z-10">
          <Fade delay={0}>
            <div
              className="rounded-2xl border overflow-hidden"
              style={{
                borderColor: 'hsl(var(--stage-pregnancy-accent) / 0.1)',
                boxShadow: '0 8px 40px -12px hsl(var(--stage-pregnancy-accent) / 0.08)',
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left — emotional framing */}
                <div
                  className="p-8 sm:p-10 md:p-12 flex flex-col justify-center"
                  style={{ backgroundColor: 'hsl(var(--stage-pregnancy) / 0.06)' }}
                >
                  <p
                    className="font-sans text-[10px] font-light tracking-[0.25em] uppercase mb-5"
                    style={{ color: 'hsl(var(--stage-pregnancy-accent) / 0.7)' }}
                  >
                    What happens when you start
                  </p>
                  <h2 className="font-serif text-2xl sm:text-[1.7rem] text-foreground leading-snug mb-5">
                    Turn this date into
                    <br />
                    <span className="italic">a guided journey</span>
                  </h2>
                  <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-3">
                    Right now you are at week {result.currentWeek}. Starting your journey saves this,
                    personalises your guidance, and gives you a place to return to whenever you need support.
                  </p>
                  <p className="font-serif italic text-[13px] text-foreground/30 leading-relaxed">
                    You do not need to figure out everything at once.
                  </p>
                </div>

                {/* Right — benefits + CTA */}
                <div className="bg-card p-8 sm:p-10 md:p-12 flex flex-col justify-center">
                  <div className="space-y-5 mb-8">
                    {[
                      { text: "Save your place in the journey", sub: "Your current week, stage, and progress" },
                      { text: "Unlock week-by-week guidance", sub: "Tailored to where you are right now" },
                      { text: "See what is happening and what is ahead", sub: "Milestones, scans, and key moments" },
                      { text: "Return to support that remembers you", sub: "Ask questions relevant to your stage" },
                    ].map((b, i) => (
                      <div key={i} className="flex items-start gap-3.5">
                        <div
                          className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                          style={{ backgroundColor: 'hsl(var(--stage-pregnancy) / 0.12)' }}
                        >
                          <Check size={11} style={{ color: 'hsl(var(--stage-pregnancy-accent))' }} />
                        </div>
                        <div>
                          <p className="font-sans text-sm text-foreground leading-snug">{b.text}</p>
                          <p className="font-sans text-xs font-light text-muted-foreground/55 mt-0.5">{b.sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={handleSaveJourney}
                    disabled={savingJourney}
                    className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-8 py-3.5 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all self-start disabled:opacity-70"
                  >
                    {saveCtaLabel}
                    <ArrowRight size={14} />
                  </button>
                  <p className="font-sans text-[11px] font-light text-muted-foreground/35 mt-3">
                    {saveCtaHelp ?? "Takes a minute to save"}
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
      <section className="bg-parchment-dark py-20 md:py-28">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
          <Fade delay={0}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
              {/* Left — editorial interpretation */}
              <div className="md:col-span-7">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-1 h-6 rounded-full"
                    style={{ backgroundColor: 'hsl(var(--stage-pregnancy-accent) / 0.25)' }}
                  />
                  <p
                    className="font-sans text-[10px] font-light tracking-[0.25em] uppercase"
                    style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}
                  >
                    {result.insight.interpretationTitle}
                  </p>
                </div>
                <p className="font-serif text-lg sm:text-xl text-foreground/80 leading-[1.85] mb-8">
                  {result.insight.interpretation}
                </p>
                <div
                  className="border-l-2 pl-5 mb-8"
                  style={{ borderColor: 'hsl(var(--stage-pregnancy-accent) / 0.15)' }}
                >
                  <p className="font-serif italic text-sm text-foreground/35 leading-relaxed">
                    {result.insight.reassurance}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Shield size={12} className="text-sage" />
                  <p className="font-sans text-[11px] font-light text-muted-foreground/50">
                    Medically reviewed by Jenny Joines
                  </p>
                </div>
              </div>

              {/* Right — trimester context card */}
              <div className="md:col-span-5">
                <Link
                  to={result.trimesterPath}
                  className="group block rounded-2xl overflow-hidden border hover:shadow-soft transition-all"
                  style={{ borderColor: 'hsl(var(--stage-pregnancy-accent) / 0.08)' }}
                >
                  <div
                    className="p-6 sm:p-7"
                    style={{ backgroundColor: 'hsl(var(--stage-pregnancy) / 0.05)' }}
                  >
                    <p className="font-sans text-[9px] font-light tracking-[0.2em] uppercase text-sage-muted mb-3">
                      Your current trimester
                    </p>
                    <h3 className="font-serif text-xl sm:text-2xl text-foreground leading-snug mb-3">
                      {result.trimester}
                    </h3>
                    <p className="font-sans text-sm font-light text-muted-foreground/60 leading-relaxed mb-4">
                      {result.trimesterNumber === 1
                        ? "Weeks 1 to 12. The foundation stage. Everything is beginning."
                        : result.trimesterNumber === 2
                          ? "Weeks 13 to 27. The settling-in stage. Energy often returns."
                          : "Weeks 28 to 40. The final stage. Preparation and anticipation."}
                    </p>
                    <span className="inline-flex items-center gap-2 font-sans text-sm text-sage group-hover:text-sage-muted transition-colors">
                      Read your trimester guide
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          S4: RIGHT NOW — three authored knowledge blocks + anxiety killer
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-parchment py-20 md:py-24">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
          <Fade delay={0}>
            <div className="mb-10">
              <p
                className="font-sans text-[10px] font-light tracking-[0.25em] uppercase mb-3"
                style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}
              >
                Right now at week {result.currentWeek}
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight max-w-sm">
                What you need to know
              </h2>
            </div>
          </Fade>

          {/* Three blocks — varied layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            {[
              { icon: Activity, label: "What is happening", text: result.insight.bodyText, accent: true },
              { icon: Eye, label: "What you may notice", text: result.insight.noticeText, accent: false },
              { icon: Target, label: "What to focus on", text: result.insight.focusText, accent: false },
            ].map((block, i) => (
              <Fade key={i} delay={i * 60}>
                <div
                  className={cn(
                    "rounded-2xl p-6 sm:p-7 border h-full flex flex-col",
                    block.accent ? "" : ""
                  )}
                  style={{
                    backgroundColor: block.accent
                      ? 'hsl(var(--stage-pregnancy) / 0.05)'
                      : 'hsl(var(--card) / 0.7)',
                    borderColor: block.accent
                      ? 'hsl(var(--stage-pregnancy-accent) / 0.1)'
                      : 'hsl(var(--border) / 0.3)',
                  }}
                >
                  <div className="flex items-center gap-2.5 mb-4">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: block.accent
                          ? 'hsl(var(--stage-pregnancy-accent) / 0.1)'
                          : 'hsl(var(--sage-bg))',
                      }}
                    >
                      <block.icon
                        size={13}
                        style={{
                          color: block.accent
                            ? 'hsl(var(--stage-pregnancy-accent))'
                            : 'hsl(var(--sage))',
                        }}
                      />
                    </div>
                    <p className="font-sans text-xs font-light tracking-[0.1em] uppercase text-sage-muted">
                      {block.label}
                    </p>
                  </div>
                  <p className="font-sans text-sm font-light text-muted-foreground leading-[1.8] flex-1">
                    {block.text}
                  </p>
                </div>
              </Fade>
            ))}
          </div>

          {/* Anxiety killer — full width, distinct */}
          <Fade delay={200}>
            <div
              className="rounded-2xl p-6 sm:p-7 border"
              style={{
                backgroundColor: 'hsl(var(--sage-bg) / 0.4)',
                borderColor: 'hsl(var(--sage-light) / 0.3)',
              }}
            >
              <div className="flex items-center gap-2.5 mb-3">
                <Shield size={14} className="text-sage" />
                <p className="font-sans text-xs font-light tracking-[0.1em] uppercase text-sage-muted">
                  What you do not need to worry about yet
                </p>
              </div>
              <p className="font-sans text-sm font-light text-muted-foreground leading-[1.8] max-w-2xl">
                {result.insight.dontWorry}
              </p>
            </div>
          </Fade>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          S5: YOUR PREGNANCY FROM HERE — journey arc
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        className="py-20 md:py-24"
        style={{ backgroundColor: 'hsl(var(--stage-pregnancy) / 0.04)' }}
      >
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
          <Fade delay={0}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-start">
              {/* Left — copy + stats */}
              <div className="md:col-span-5">
                <p className="font-sans text-[10px] font-light tracking-[0.25em] uppercase text-sage-muted mb-3">
                  Your pregnancy from here
                </p>
                <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-4">
                  One journey,
                  <br />
                  <span className="italic">one stage at a time</span>
                </h2>
                <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-8">
                  From where you are now, guidance moves forward with you. Forty weeks. Three trimesters. One continuous, supported arc.
                </p>

                <div className="flex gap-8 mb-6">
                  <div>
                    <p className="font-serif text-3xl text-foreground">{result.currentWeek - 1}</p>
                    <p className="font-sans text-[10px] font-light text-sage-muted tracking-wider uppercase">completed</p>
                  </div>
                  <div
                    className="w-px self-stretch"
                    style={{ backgroundColor: 'hsl(var(--stage-pregnancy-accent) / 0.1)' }}
                  />
                  <div>
                    <p className="font-serif text-3xl text-foreground">{result.weeksRemaining}</p>
                    <p className="font-sans text-[10px] font-light text-sage-muted tracking-wider uppercase">remaining</p>
                  </div>
                </div>
                <p
                  className="font-sans text-xs font-light"
                  style={{ color: 'hsl(var(--stage-pregnancy-accent) / 0.5)' }}
                >
                  {Math.round(progressPct)}% of the way through
                </p>
              </div>

              {/* Right — progress + next milestone */}
              <div className="md:col-span-7">
                <div className="bg-card border border-border/40 rounded-2xl p-6 sm:p-8 shadow-card-brand">
                  {/* Bar */}
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

                  <div className="flex justify-between mb-6">
                    {trimesterZones.map((z, i) => (
                      <div key={i} className={cn("text-center", result.trimesterNumber === i + 1 ? "opacity-100" : "opacity-35")}>
                        <p className="font-sans text-[10px] font-light tracking-wider uppercase text-sage-muted">{z.label} trimester</p>
                        <p className="font-sans text-[9px] font-light text-muted-foreground/40">Wk {z.start}–{z.end}</p>
                      </div>
                    ))}
                  </div>

                  {/* You are here */}
                  <div className="border-t border-border/25 pt-4 flex items-center gap-3 mb-5">
                    <div className="w-2 h-2 rounded-full bg-terracotta shrink-0" />
                    <p className="font-sans text-xs font-light text-foreground/70">
                      You are at week {result.currentWeek} of 40+ · {result.trimester}
                    </p>
                  </div>

                  {/* Next milestone inline */}
                  {result.upcomingMilestones[0] && (
                    <div
                      className="rounded-xl p-4 border"
                      style={{
                        backgroundColor: 'hsl(var(--stage-pregnancy) / 0.04)',
                        borderColor: 'hsl(var(--stage-pregnancy-accent) / 0.06)',
                      }}
                    >
                      <p className="font-sans text-[9px] font-light tracking-wider uppercase text-sage-muted mb-1.5">Next milestone</p>
                      <p className="font-sans text-sm text-foreground mb-0.5">{result.upcomingMilestones[0].label}</p>
                      <p className="font-sans text-xs font-light text-muted-foreground/55">
                        Week {result.upcomingMilestones[0].week} · {format(addDays(lmp, result.upcomingMilestones[0].week * 7), "d MMM")}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          S6: MILESTONES — clean, forward-looking rail
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-parchment-dark py-20 md:py-24">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
          <Fade delay={0}>
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-1 h-6 rounded-full"
                style={{ backgroundColor: 'hsl(var(--stage-pregnancy-accent) / 0.2)' }}
              />
              <p className="font-sans text-[10px] font-light tracking-[0.25em] uppercase text-sage-muted">
                Looking ahead
              </p>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-snug mb-3">
              Your next milestones
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground mb-10 max-w-md">
              Key moments ahead, personalised to where you are now.
            </p>
          </Fade>

          <div className="relative">
            <div
              className="absolute left-[18px] top-5 bottom-5 w-px hidden sm:block"
              style={{ backgroundColor: 'hsl(var(--stage-pregnancy-accent) / 0.08)' }}
            />
            <div className="space-y-3">
              {result.upcomingMilestones.map((m, idx) => {
                const milestoneDate = addDays(lmp, m.week * 7);
                const daysAway = differenceInDays(milestoneDate, today);
                const isFirst = idx === 0;
                return (
                  <Fade key={m.week} delay={idx * 50}>
                    <div className="flex items-start gap-5">
                      <div
                        className="relative z-10 shrink-0 w-9 h-9 rounded-full flex items-center justify-center border"
                        style={{
                          backgroundColor: isFirst ? 'hsl(var(--stage-pregnancy) / 0.1)' : 'hsl(var(--parchment-dark))',
                          borderColor: isFirst ? 'hsl(var(--stage-pregnancy-accent) / 0.2)' : 'hsl(var(--border) / 0.4)',
                        }}
                      >
                        <span
                          className="font-serif text-xs"
                          style={{ color: isFirst ? 'hsl(var(--stage-pregnancy-accent))' : undefined }}
                        >
                          {m.week}
                        </span>
                      </div>
                      <div
                        className="flex-1 rounded-xl px-5 py-4 flex items-center justify-between gap-3 border"
                        style={{
                          backgroundColor: isFirst ? 'hsl(var(--card))' : 'hsl(var(--card) / 0.5)',
                          borderColor: isFirst ? 'hsl(var(--stage-pregnancy-accent) / 0.1)' : 'hsl(var(--border) / 0.25)',
                          boxShadow: isFirst ? '0 2px 12px -4px hsl(var(--stage-pregnancy-accent) / 0.06)' : 'none',
                        }}
                      >
                        <div>
                          <p className={cn("font-sans text-sm mb-0.5", isFirst ? "text-foreground" : "font-light text-foreground/80")}>{m.label}</p>
                          <p className="font-sans text-[11px] font-light text-muted-foreground/55">{m.detail}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-sans text-sm font-light text-foreground">{format(milestoneDate, "d MMM")}</p>
                          <p className="font-sans text-[10px] font-light text-sage-muted">
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
          S7: ASK — warm, human, stage-aware
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-parchment py-20 md:py-24">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-14 items-start">
            <Fade delay={0} className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={13} style={{ color: 'hsl(var(--stage-pregnancy-accent) / 0.7)' }} />
                <p
                  className="font-sans text-[10px] font-light tracking-[0.2em] uppercase"
                  style={{ color: 'hsl(var(--stage-pregnancy-accent) / 0.7)' }}
                >
                  Ask about this stage
                </p>
              </div>
              <h2 className="font-serif text-2xl sm:text-[1.7rem] text-foreground leading-tight mb-4">
                Something on
                <br />your mind?
              </h2>
              <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-6">
                Whatever you are noticing, wondering, or unsure about. Your answer will be tailored to week {result.currentWeek}.
              </p>
              <div className="relative mb-4">
                <input
                  type="text"
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAskNow()}
                  placeholder="What is on your mind?"
                  className="w-full bg-card border border-border/50 rounded-xl px-5 py-3.5 font-sans text-sm font-light text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-sage/40 transition-all"
                />
              </div>
              <button
                onClick={handleAskNow}
                className="flex items-center gap-2 border rounded-pill px-6 py-2.5 font-sans text-sm font-light text-foreground hover:shadow-card-brand transition-all"
                style={{ borderColor: 'hsl(var(--border) / 0.6)' }}
              >
                <MessageCircle size={13} className="text-sage/70" />
                Ask now
              </button>
            </Fade>

            <Fade delay={80} className="md:col-span-3">
              <div
                className="rounded-2xl p-6 sm:p-7 border"
                style={{
                  backgroundColor: 'hsl(var(--stage-pregnancy) / 0.03)',
                  borderColor: 'hsl(var(--border) / 0.4)',
                }}
              >
                <p className="font-sans text-[10px] font-light tracking-[0.15em] uppercase text-sage-muted mb-5">
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
                    className="group w-full flex items-start gap-3 py-3.5 border-b border-border/20 last:border-0 text-left hover:pl-1 transition-all"
                  >
                    <MessageCircle size={11} className="text-sage/50 mt-1 shrink-0" />
                    <p className="font-sans text-sm font-light text-foreground/80 leading-relaxed group-hover:text-sage transition-colors">{q}</p>
                  </button>
                ))}
              </div>
            </Fade>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          S8: JOURNAL — tactile, intimate, premium companion
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-parchment">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
          <Fade delay={0}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
              {/* Left — journal image with badge */}
              <div className="flex justify-center md:justify-start relative">
                <div
                  className="absolute -bottom-8 -left-8 w-44 h-44 rounded-full opacity-15 blur-3xl pointer-events-none"
                  style={{ backgroundColor: 'hsl(var(--stage-pregnancy))' }}
                />
                <div className="relative">
                  <img
                    src={journalFlatlay}
                    alt="The Start of You pregnancy journal"
                    width={400}
                    height={400}
                    loading="lazy"
                    className="w-60 md:w-72 rounded-2xl shadow-elevated relative z-10"
                  />
                  {/* Star rating badge */}
                  <div className="absolute top-4 right-4 z-20 bg-terracotta/90 backdrop-blur-sm text-terracotta-foreground rounded-lg px-3 py-1.5 shadow-sm">
                    <div className="flex items-center gap-0.5 mb-0.5">
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} size={10} fill="currentColor" strokeWidth={0} />
                      ))}
                    </div>
                    <p className="font-sans text-[9px] font-light leading-none">Available on Amazon</p>
                  </div>
                </div>
              </div>

              {/* Right — editorial content */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <p
                    className="font-sans text-[10px] font-light tracking-[0.22em] uppercase"
                    style={{ color: 'hsl(var(--stage-pregnancy-accent) / 0.6)' }}
                  >
                    Physical · Digital
                  </p>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-foreground leading-snug mb-4">
                  A physical companion to
                  <br />
                  your digital journey
                </h3>
                <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-7">
                  Capture your experiences alongside your weekly guidance. Keep a thoughtful,
                  private record of your journey with The Start of You Journal.
                </p>

                {/* Benefit chips — 2x2 grid */}
                <div className="grid grid-cols-2 gap-2.5 mb-8">
                  {[
                    "Weekly reflection prompts",
                    "Free-form entry space",
                    "Private and personal",
                    "A keepsake for life",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2.5 rounded-xl border px-4 py-3"
                      style={{ borderColor: 'hsl(var(--border) / 0.5)' }}
                    >
                      <Check
                        size={13}
                        className="shrink-0"
                        style={{ color: 'hsl(var(--sage))' }}
                      />
                      <p className="font-sans text-[12px] font-light text-foreground/80 leading-snug">{item}</p>
                    </div>
                  ))}
                </div>

                <Link
                  to="/journal"
                  className="inline-flex items-center gap-2.5 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[13px] font-medium shadow-cta hover:bg-terracotta-hover transition-all duration-300"
                >
                  Explore the journal
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          S9: CONTINUE — slim, intentional onward paths
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-parchment py-14 md:py-18">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
          <Fade delay={0}>
            <p className="font-sans text-[10px] font-light tracking-[0.25em] uppercase text-sage-muted mb-6">
              Continue from here
            </p>
          </Fade>
          <div className="divide-y divide-border/30">
            {[
              {
                label: `${result.trimester} guide`,
                sub: `Guidance for weeks ${result.trimesterNumber === 1 ? "1 to 12" : result.trimesterNumber === 2 ? "13 to 27" : "28 to 42"}`,
                href: result.trimesterPath,
              },
              {
                label: "Your full pregnancy journey",
                sub: "Your complete pregnancy journey with week-by-week guidance",
                href: "/pregnancy",
              },
              {
                label: "Guidance library",
                sub: "Explore what matters next, at your stage",
                href: "/pregnancy",
              },
            ].map((link, i) => (
              <Fade key={i} delay={i * 40}>
                <Link to={link.href} className="group flex items-center justify-between py-4.5 hover:pl-1 transition-all">
                  <div>
                    <p className="font-serif text-base sm:text-lg text-foreground group-hover:text-sage transition-colors leading-snug">{link.label}</p>
                    <p className="font-sans text-xs font-light text-muted-foreground/60 mt-0.5">{link.sub}</p>
                  </div>
                  <ArrowRight size={13} className="text-muted-foreground/30 group-hover:text-sage transition-colors ml-4 shrink-0" />
                </Link>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          S10: FINAL TRUST CTA — conviction close
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-parchment-dark py-20 md:py-28 relative overflow-hidden">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, hsl(var(--stage-pregnancy) / 0.14) 0%, transparent 70%)' }}
        />
        <StageGlow tone="pregnancy" className="inset-x-0 top-0 h-[360px]" opacity={0.6} />
        <BotanicalAccent
          className="top-6 -left-10 md:top-10 md:-left-4"
          opacity="opacity-[0.36]"
          size="w-[200px] md:w-[300px]"
        />
        <BotanicalAccent
          flip
          className="bottom-6 -right-10 md:bottom-10 md:-right-4"
          opacity="opacity-[0.36]"
          size="w-[200px] md:w-[300px]"
        />
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl relative z-10 mb-10">
          <SprigDivider tone="pregnancy" />
        </div>
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl relative z-10">
          <Fade delay={0}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
              {/* Left — closing statement */}
              <div className="md:col-span-7">
                <p
                  className="font-sans text-[10px] font-light tracking-[0.35em] uppercase mb-5"
                  style={{ color: 'hsl(var(--stage-pregnancy-accent) / 0.45)' }}
                >
                  Week {result.currentWeek} · {result.trimester}
                </p>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-[2.25rem] text-foreground leading-snug mb-5">
                  You have your date.
                  <br />
                  <span className="italic text-foreground/45">Now your journey can begin.</span>
                </h2>
                <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-4 max-w-sm">
                  You do not need to figure everything out at once. Begin with guidance that moves with you,
                  one week at a time, from where you are now.
                </p>
                <p className="font-sans text-xs font-light text-muted-foreground/35 mb-8 max-w-xs">
                  {saveCtaHelp ?? "Saving your journey keeps your stage, personalises your guidance, and gives you somewhere to come back to."}
                </p>

                <button
                  type="button"
                  onClick={handleSaveJourney}
                  disabled={savingJourney}
                  className="inline-flex items-center gap-2.5 bg-terracotta text-terracotta-foreground rounded-pill px-10 py-4 font-sans text-[15px] font-medium shadow-cta hover:bg-terracotta-hover hover:shadow-lg transition-all disabled:opacity-70"
                >
                  {saveCtaLabel}
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* Right — trust cues */}
              <div className="md:col-span-5">
                <div className="space-y-4">
                  {[
                    { icon: Shield, text: "Medically reviewed guidance" },
                    { icon: Calendar, text: "Personalised by your stage" },
                    { icon: Heart, text: "Save your place and return anytime" },
                  ].map((cue, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                        style={{ backgroundColor: 'hsl(var(--sage-bg) / 0.5)' }}
                      >
                        <cue.icon size={13} className="text-sage/70" />
                      </div>
                      <p className="font-sans text-sm font-light text-muted-foreground/70">{cue.text}</p>
                    </div>
                  ))}
                </div>

                <div
                  className="border-t mt-8 pt-5"
                  style={{ borderColor: 'hsl(var(--border) / 0.15)' }}
                >
                  <p className="font-sans text-[10px] font-light text-muted-foreground/30 leading-relaxed">
                    Pregnancy timelines are estimates. Always consult your healthcare provider for personalised medical advice.
                  </p>
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </section>

    </div>
  );
};

export default DueDateCalculatorResult;
