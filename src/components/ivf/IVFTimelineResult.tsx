import { useEffect, useState } from "react";
import { differenceInDays, addDays, format } from "date-fns";
import { ArrowRight, MessageCircle, Shield, Check, Star, Heart, Clock, Activity, BookOpen, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import homeJournalFlatlay from "@/assets/home-journal-flatlay.jpg";

// ─── Types & data ─────────────────────────────────────────────────────────────

interface DptInsight {
  stage: string;
  stageDetail: string;
  testStatus: string;
  heroInterpretation: string;
  heroReassurance: string;
  whatHappeningMedically: string[];
  whatThisFeelsLike: string;
  whatMattersNow: string;
  dontWorryYet: string;
  whatToExpect: { step: string; timing: string; why: string }[];
  testDay: number;
}

const getDptInsight = (dpt: number): DptInsight => {
  if (dpt <= 1) return {
    stage: "Day of transfer",
    stageDetail: "The embryo has just been placed",
    testStatus: "Test window opens around day 10",
    heroInterpretation: "There is nothing to feel or interpret yet. The embryo is exactly where it needs to be, and your body is doing the rest.",
    heroReassurance: "Feeling nothing is the most common experience right now. That is completely expected.",
    whatHappeningMedically: [
      "The embryo is settling into the uterine environment",
      "No implantation has occurred yet — this is completely normal",
      "Hormonal support (progesterone) is doing its work in the background",
    ],
    whatThisFeelsLike: "Many people feel surprisingly calm, or surprisingly anxious, right after transfer. Both are normal. The gap between 'something important just happened' and 'I can't feel anything' can feel strange.",
    whatMattersNow: "Rest, gentle routine, and trusting the process. There is nothing you need to do differently today.",
    dontWorryYet: "No symptoms at this stage are meaningful. Feeling nothing is the most common and completely expected experience right now.",
    whatToExpect: [
      { step: "Continued progesterone support", timing: "As prescribed by your clinic", why: "Supports the uterine lining during early implantation" },
      { step: "Implantation typically begins", timing: "Within the next 1 to 3 days", why: "The embryo begins attaching to the uterine wall" },
      { step: "Official test date confirmed", timing: "Your clinic will advise", why: "The most reliable measure of outcome" },
    ],
    testDay: 10,
  };
  if (dpt <= 3) return {
    stage: "Implantation window",
    stageDetail: "The embryo may be beginning to implant",
    testStatus: "Test window opens around day 10",
    heroInterpretation: "The implantation window is one of the most significant, and invisible, moments of IVF. What you feel or do not feel is not a reliable signal.",
    heroReassurance: "Most implantation happens without any noticeable sensation at all. Absence of symptoms is normal.",
    whatHappeningMedically: [
      "For a 5-day transfer, implantation typically occurs around days 1 to 3",
      "The blastocyst is hatching from its shell and beginning to attach",
      "hCG production begins once implantation starts, but levels are far too low to detect",
    ],
    whatThisFeelsLike: "This is often when symptom-watching begins. The temptation to interpret every twinge is strong, but the truth is that most implantation happens without any noticeable sensation at all.",
    whatMattersNow: "Staying with your medication schedule, maintaining gentle routines, and being kind to yourself during a stage that offers no feedback.",
    dontWorryYet: "Absence of symptoms is the most common experience during implantation. Mild cramping, spotting, or nothing at all are all within the range of normal.",
    whatToExpect: [
      { step: "Mild cramping or spotting possible", timing: "Days 1 to 4", why: "Can occur during implantation but is not required" },
      { step: "Continue medication as prescribed", timing: "Daily", why: "Progesterone supports implantation regardless of symptoms" },
      { step: "Testing remains too early", timing: "Before day 10", why: "hCG levels are not yet detectable by home tests" },
    ],
    testDay: 10,
  };
  if (dpt <= 6) return {
    stage: "Early post-implantation",
    stageDetail: "hCG levels may be beginning to rise",
    testStatus: "Test window in a few days",
    heroInterpretation: "If implantation has occurred, your body is beginning to respond — but levels are still too low for home tests to detect. This in-between stage is often the hardest to sit with.",
    heroReassurance: "Symptom variation, including no symptoms at all, is not an indicator of outcome at this stage.",
    whatHappeningMedically: [
      "hCG is now rising if implantation has occurred",
      "The embryo is developing rapidly at a cellular level",
      "Your body is adjusting to changing hormone levels alongside progesterone support",
    ],
    whatThisFeelsLike: "The waiting can feel heavier now. You may feel hyper-aware of your body, or frustrated by not knowing. This is one of the most emotionally loaded stages of IVF.",
    whatMattersNow: "Continue your prescribed support. Limit repetitive searching and comparison. Protect your bandwidth for the days ahead.",
    dontWorryYet: "Symptom variation, including no symptoms at all, is not an indicator of outcome. Testing too early may show a negative even if pregnancy has occurred.",
    whatToExpect: [
      { step: "Breast tenderness or fatigue may begin", timing: "Days 4 to 7", why: "Can be progesterone effects rather than pregnancy signs" },
      { step: "Home tests remain unreliable", timing: "Before day 9", why: "hCG levels are still building and may not trigger a positive" },
      { step: "Wait for your official test date", timing: "Your clinic will confirm", why: "Blood tests are significantly more accurate at this stage" },
    ],
    testDay: 10,
  };
  if (dpt <= 9) return {
    stage: "Pre-test window",
    stageDetail: "hCG is rising, testing is approaching",
    testStatus: "Test day is very close",
    heroInterpretation: "You are close to your test date. This is often the most emotionally intense part of the IVF process. Whatever you are feeling, or not feeling, is valid.",
    heroReassurance: "Symptom intensity does not correlate with outcome. Many successful IVF pregnancies had no symptoms before test day.",
    whatHappeningMedically: [
      "If implantation has occurred, hCG is now doubling roughly every 48 hours",
      "Progesterone support continues as prescribed",
      "Your body may begin showing early pregnancy signals, or none at all",
    ],
    whatThisFeelsLike: "The final days before testing can feel enormous. Time often slows down. You may feel hopeful, terrified, numb, or all of these at once. None of this reflects the outcome.",
    whatMattersNow: "Have a plan for test day. Know when and how you will test. Arrange support around you. Stay with what you can control.",
    dontWorryYet: "Symptom intensity does not correlate with outcome. Many successful IVF pregnancies had no symptoms at all before test day.",
    whatToExpect: [
      { step: "Beta hCG blood test", timing: "Around day 10 to 12", why: "The most accurate measure of whether implantation occurred" },
      { step: "Home tests may now be more reliable", timing: "Day 9 onwards", why: "But blood tests remain definitive" },
      { step: "Emotional intensity is expected", timing: "These final days", why: "This is one of the most loaded moments in IVF" },
    ],
    testDay: 10,
  };
  if (dpt <= 12) return {
    stage: "Test window",
    stageDetail: "Official testing is typically done now",
    testStatus: "You are in the test window",
    heroInterpretation: "This is your test window. A blood test from your clinic measures hCG with much greater accuracy than home tests. Both positive and uncertain results need time to process.",
    heroReassurance: "A faint positive is still a positive. Your clinic will guide interpretation and next steps.",
    whatHappeningMedically: [
      "Your clinic's official test day is typically around day 10 to 12",
      "Blood hCG testing is the most accurate measure at this stage",
      "Home pregnancy tests may now be reliable, but blood tests are definitive",
    ],
    whatThisFeelsLike: "Test day can feel like the most important day of your life. Whatever the result, give yourself space. This moment deserves gentleness, not pressure.",
    whatMattersNow: "Follow your clinic's guidance on testing. If you have tested at home, your blood test will confirm. Whatever happens next, you are supported.",
    dontWorryYet: "A faint positive is still a positive. Your clinic will guide interpretation and next steps based on your specific hCG levels.",
    whatToExpect: [
      { step: "Your clinic guides next steps", timing: "Based on blood test results", why: "hCG levels determine the path forward" },
      { step: "Early scan arranged if positive", timing: "Typically 6 to 7 weeks", why: "To confirm viability and location" },
      { step: "Repeat testing if uncertain", timing: "48 hours later", why: "To check hCG doubling pattern" },
    ],
    testDay: 10,
  };
  return {
    stage: "Post-test monitoring",
    stageDetail: "Early pregnancy monitoring and care",
    testStatus: "Monitoring stage",
    heroInterpretation: "This stage involves both medical monitoring and significant emotional adjustment. Cautious hope is a completely normal response after IVF. You do not need to feel certain to move forward.",
    heroReassurance: "Anxiety between appointments is one of the most common experiences in early IVF pregnancy.",
    whatHappeningMedically: [
      "Your clinic is monitoring hCG levels to confirm progression",
      "An early viability scan is typically arranged around 6 to 7 weeks",
      "Progesterone support often continues through early pregnancy",
    ],
    whatThisFeelsLike: "Many people expect to feel relieved after a positive test, but find that anxiety continues. After everything it took to get here, it can be hard to trust that it is real. This is deeply normal.",
    whatMattersNow: "Take one appointment at a time. Stay connected with your clinic. Allow yourself to feel whatever comes without judgement.",
    dontWorryYet: "Anxiety between appointments is one of the most common experiences in early IVF pregnancy. Needing continued reassurance does not mean something is wrong.",
    whatToExpect: [
      { step: "Continued progesterone support", timing: "Often through first trimester", why: "Standard protocol for IVF pregnancies" },
      { step: "Early scan to confirm heartbeat", timing: "Around 6 to 7 weeks", why: "The first major viability milestone" },
      { step: "Gradual transition to standard care", timing: "If all is progressing", why: "IVF monitoring gives way to routine pregnancy care" },
    ],
    testDay: 10,
  };
};

interface TimelineNode {
  dpt: number;
  label: string;
  detail: string;
}

const TIMELINE_NODES: TimelineNode[] = [
  { dpt: 0,  label: "Transfer",            detail: "Day of transfer" },
  { dpt: 2,  label: "Implantation window",  detail: "Typical implantation period" },
  { dpt: 5,  label: "hCG rising",          detail: "Hormone levels increasing" },
  { dpt: 10, label: "Test day",            detail: "Beta hCG blood test" },
  { dpt: 14, label: "Early scan",          detail: "Viability confirmed" },
];

// ─── Fade-in wrapper ──────────────────────────────────────────────────────────

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

// ─── Main component ───────────────────────────────────────────────────────────

interface IVFTimelineResultProps {
  transferDate: Date;
  transferType?: "5day" | "3day";
}

const IVFTimelineResult = ({ transferDate, transferType = "5day" }: IVFTimelineResultProps) => {
  const today = new Date();
  const dpt = differenceInDays(today, transferDate);
  const clampedDpt = Math.max(0, dpt);
  const insight = getDptInsight(clampedDpt);
  const [aiQuestion, setAiQuestion] = useState("");

  const progressPct = Math.min((clampedDpt / 14) * 100, 100);

  const testDate = addDays(transferDate, insight.testDay);
  const daysToTest = Math.max(differenceInDays(testDate, today), 0);

  return (
    <div>

      {/* ══════════════════════════════════════════════════════════════════
          S1: IVF RESULT HERO
          Cinematic — the emotional anchor of the page
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(var(--stage-ivf)) 0%, hsl(var(--stage-ivf) / 0.3) 70%, hsl(var(--parchment)) 100%)" }}>
        {/* Ambient layers */}
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "radial-gradient(circle at 15% 40%, hsl(var(--stage-ivf-accent)), transparent 45%), radial-gradient(circle at 85% 60%, hsl(var(--lavender)), transparent 45%)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: "linear-gradient(to top, hsl(var(--parchment)), transparent)" }} />

        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl pt-32 md:pt-40 pb-24 md:pb-32 relative z-10">

          {/* Eyebrow */}
          <Fade delay={0}>
            <div className="flex items-center gap-3 mb-14">
              <div className="h-px w-10" style={{ background: "hsl(var(--stage-ivf-accent) / 0.3)" }} />
              <p className="font-sans text-[11px] font-light tracking-[0.3em] uppercase" style={{ color: "hsl(var(--stage-ivf-accent))" }}>
                Your IVF timeline
              </p>
            </div>
          </Fade>

          {/* Primary result — dramatic scale */}
          <Fade delay={100}>
            <p className="font-sans text-sm font-light text-foreground/40 mb-4 tracking-wide">You are currently</p>
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-5 mb-4">
              <span className="font-serif text-[4.5rem] sm:text-[6rem] md:text-[8rem] text-foreground leading-[0.85] tracking-tight">{clampedDpt}</span>
              <span className="font-serif text-xl sm:text-2xl md:text-3xl font-light text-foreground/50 italic">
                {clampedDpt === 1 ? "day" : "days"} post transfer
              </span>
            </div>
          </Fade>

          {/* Stage chips — compact, precise */}
          <Fade delay={180}>
            <div className="flex flex-wrap items-center gap-2.5 mb-12">
              <span className="inline-flex items-center gap-2 font-sans text-[11px] font-medium px-4 py-2 rounded-full" style={{ color: "hsl(var(--stage-ivf-accent))", background: "hsl(var(--stage-ivf-accent) / 0.1)", border: "1px solid hsl(var(--stage-ivf-accent) / 0.15)" }}>
                <Activity size={10} />
                {insight.stage}
              </span>
              <span className="inline-flex items-center gap-1.5 font-sans text-[11px] font-light px-3 py-2 rounded-full text-foreground/40 bg-card/40 border border-border/20">
                {transferType === "5day" ? "5-day blastocyst" : "3-day"} · {format(transferDate, "d MMM yyyy")}
              </span>
              {daysToTest > 0 && (
                <span className="inline-flex items-center gap-1.5 font-sans text-[11px] font-light px-3 py-2 rounded-full text-foreground/40 bg-card/40 border border-border/20">
                  <Clock size={9} />
                  {daysToTest} {daysToTest === 1 ? "day" : "days"} to test window
                </span>
              )}
            </div>
          </Fade>

          {/* Two-column: interpretation + orientation card */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
            {/* Left: Interpretation + dominant CTA */}
            <div className="lg:col-span-3">
              <Fade delay={250}>
                <p className="font-sans text-[15px] font-light text-foreground/60 leading-[1.85] max-w-lg mb-5">
                  {insight.heroInterpretation}
                </p>
                <div className="flex items-start gap-2.5 mb-12">
                  <Shield size={13} className="shrink-0 mt-1" style={{ color: "hsl(var(--stage-ivf-accent) / 0.5)" }} />
                  <p className="font-sans text-[13px] font-light text-foreground/40 leading-relaxed italic">
                    {insight.heroReassurance}
                  </p>
                </div>
              </Fade>

              {/* CTA cluster — high intent */}
              <Fade delay={350}>
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    to="/ivf"
                    className="group inline-flex items-center gap-3 bg-terracotta text-terracotta-foreground rounded-pill px-10 py-5 font-sans text-[15px] font-medium shadow-cta hover:bg-terracotta-hover hover:shadow-lg transition-all"
                  >
                    Start your journey
                    <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <Link
                    to="/ask"
                    className="inline-flex items-center gap-2.5 rounded-pill px-7 py-4.5 font-sans text-sm font-light text-foreground/60 hover:text-foreground border border-border/25 hover:border-border/40 bg-card/40 backdrop-blur-sm transition-all"
                  >
                    <MessageCircle size={13} style={{ color: "hsl(var(--stage-ivf-accent))" }} />
                    Ask about this stage
                  </Link>
                </div>
              </Fade>
            </div>

            {/* Right: Orientation card — medical precision */}
            <div className="lg:col-span-2">
              <Fade delay={280}>
                <div className="bg-card/80 backdrop-blur-md border border-border/25 rounded-2xl shadow-elevated overflow-hidden">
                  <div className="px-7 pt-7 pb-5 border-b border-border/15">
                    <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase mb-3" style={{ color: "hsl(var(--stage-ivf-accent))" }}>Current stage</p>
                    <p className="font-serif text-xl text-foreground leading-snug mb-1">{insight.stage}</p>
                    <p className="font-sans text-[13px] font-light text-muted-foreground/60">{insight.stageDetail}</p>
                  </div>

                  <div className="px-7 py-5 border-b border-border/15">
                    <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase mb-3" style={{ color: "hsl(var(--stage-ivf-accent))" }}>
                      {daysToTest > 0 ? "Test day" : "Test window"}
                    </p>
                    {daysToTest > 0 ? (
                      <div className="flex items-end gap-2">
                        <span className="font-serif text-3xl text-foreground">{daysToTest}</span>
                        <span className="font-sans text-[13px] font-light text-muted-foreground/50 pb-0.5">
                          {daysToTest === 1 ? "day" : "days"} away · {format(testDate, "d MMM")}
                        </span>
                      </div>
                    ) : (
                      <p className="font-serif text-lg text-foreground">{insight.testStatus}</p>
                    )}
                  </div>

                  <Link to="/ivf/after-transfer" className="group flex items-center justify-between px-7 py-5 hover:bg-parchment/50 transition-colors">
                    <div>
                      <p className="font-sans text-sm font-light text-foreground group-hover:text-foreground/80 transition-colors">After transfer guide</p>
                      <p className="font-sans text-[11px] font-light text-muted-foreground/40">Stage-specific guidance →</p>
                    </div>
                    <ArrowRight size={13} className="text-muted-foreground/20 group-hover:text-foreground/40 transition-colors" />
                  </Link>
                </div>
              </Fade>
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════
          S2: CONVERSION BRIDGE
          The strategic pivot — result becomes relationship
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 overflow-hidden" style={{ background: "hsl(var(--parchment-dark))" }}>
        <div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, transparent 10%, hsl(var(--stage-ivf-accent) / 0.15), transparent 90%)" }} />

        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* Left: Editorial conviction */}
            <Fade delay={0}>
              <div>
                <p className="font-sans text-[11px] font-light tracking-[0.25em] uppercase mb-6" style={{ color: "hsl(var(--stage-ivf-accent))" }}>
                  Your next step
                </p>
                <h2 className="font-serif text-3xl sm:text-[2.2rem] md:text-[2.5rem] text-foreground leading-[1.15] mb-6">
                  This is where your IVF journey <span className="italic">becomes personal</span>
                </h2>
                <p className="font-sans text-[15px] font-light text-muted-foreground leading-[1.8] mb-10 max-w-md">
                  Starting saves your stage, personalises your guidance, and gives you a clear, supported path through IVF and beyond. No more guessing what comes next.
                </p>
                <Link
                  to="/ivf"
                  className="group inline-flex items-center gap-3 bg-terracotta text-terracotta-foreground rounded-pill px-10 py-5 font-sans text-[15px] font-medium shadow-cta hover:bg-terracotta-hover hover:shadow-lg transition-all"
                >
                  Start your journey
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <p className="mt-5 font-sans text-xs font-light text-muted-foreground/45">Takes a minute to begin.</p>
              </div>
            </Fade>

            {/* Right: Benefits — structured, not card-heavy */}
            <Fade delay={120}>
              <div className="space-y-5">
                {[
                  { icon: Clock, title: "Save where you are", body: "Your IVF timeline is remembered so you can return exactly where you left off." },
                  { icon: Activity, title: "Stage-based guidance", body: "Support that reflects IVF timing and milestones — not generic pregnancy advice." },
                  { icon: Shield, title: "Know what to expect", body: "Medically grounded next steps, both practical and emotional, for your specific stage." },
                  { icon: Heart, title: "Return anytime", body: "Your place is saved. Come back whenever you need guidance or reassurance." },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-5 py-5 border-b border-border/20 last:border-0">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: "hsl(var(--stage-ivf) / 0.5)" }}>
                      <item.icon size={16} style={{ color: "hsl(var(--stage-ivf-accent))" }} />
                    </div>
                    <div>
                      <p className="font-sans text-sm font-medium text-foreground mb-1.5">{item.title}</p>
                      <p className="font-sans text-[13px] font-light text-muted-foreground/70 leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Fade>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════
          S3: WHAT THIS STAGE MEANS IN IVF
          Editorial interpretation — the intelligence layer
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-parchment py-24 md:py-32">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
          <Fade delay={0}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10" style={{ background: "hsl(var(--stage-ivf-accent) / 0.3)" }} />
              <p className="font-sans text-[11px] font-light tracking-[0.25em] uppercase" style={{ color: "hsl(var(--stage-ivf-accent))" }}>
                Understanding your stage
              </p>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-[2.2rem] text-foreground leading-tight mb-5 max-w-lg">
              What this stage means in IVF
            </h2>
            <p className="font-sans text-[15px] font-light text-muted-foreground leading-[1.8] mb-16 max-w-lg">
              IVF care is more structured than typical pregnancy. Your clinic is monitoring specific milestones, and the timeline is measured in days. That precision can feel both reassuring and pressurising.
            </p>
          </Fade>

          {/* Two-column editorial + cards */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-14">
            {/* Left: What's happening — editorial narrative */}
            <div className="lg:col-span-3">
              <Fade delay={60}>
                <div className="bg-card border border-border/25 rounded-2xl p-8 md:p-10 h-full">
                  <div className="flex items-center gap-2.5 mb-6">
                    <Activity size={14} style={{ color: "hsl(var(--stage-ivf-accent))" }} />
                    <p className="font-sans text-xs font-medium tracking-[0.1em] uppercase" style={{ color: "hsl(var(--stage-ivf-accent))" }}>
                      What's happening medically
                    </p>
                  </div>
                  <ul className="space-y-5">
                    {insight.whatHappeningMedically.map((item, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <span className="mt-2.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "hsl(var(--stage-ivf-accent))" }} />
                        <p className="font-sans text-[15px] font-light text-foreground/70 leading-[1.75]">{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Fade>
            </div>

            {/* Right: Emotional + priority stack */}
            <div className="lg:col-span-2 space-y-5">
              <Fade delay={120}>
                <div className="bg-card border border-border/25 rounded-2xl p-7">
                  <div className="flex items-center gap-2.5 mb-5">
                    <Heart size={13} style={{ color: "hsl(var(--stage-ivf-accent))" }} />
                    <p className="font-sans text-xs font-medium tracking-[0.1em] uppercase" style={{ color: "hsl(var(--stage-ivf-accent))" }}>
                      What this can feel like
                    </p>
                  </div>
                  <p className="font-sans text-[14px] font-light text-muted-foreground leading-[1.8]">
                    {insight.whatThisFeelsLike}
                  </p>
                </div>
              </Fade>

              <Fade delay={180}>
                <div className="rounded-2xl p-7 border" style={{ background: "hsl(var(--stage-ivf) / 0.35)", borderColor: "hsl(var(--stage-ivf-accent) / 0.1)" }}>
                  <div className="flex items-center gap-2.5 mb-5">
                    <Sparkles size={13} style={{ color: "hsl(var(--stage-ivf-accent))" }} />
                    <p className="font-sans text-xs font-medium tracking-[0.1em] uppercase" style={{ color: "hsl(var(--stage-ivf-accent))" }}>
                      What matters now
                    </p>
                  </div>
                  <p className="font-serif italic text-[15px] text-foreground/70 leading-[1.85]">
                    {insight.whatMattersNow}
                  </p>
                </div>
              </Fade>
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════
          S4: YOUR IVF TIMELINE
          Journey map — emotional architecture, not a progress widget
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32" style={{ background: "hsl(var(--parchment-dark))" }}>
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
          <Fade delay={0}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10" style={{ background: "hsl(var(--stage-ivf-accent) / 0.3)" }} />
              <p className="font-sans text-[11px] font-light tracking-[0.25em] uppercase" style={{ color: "hsl(var(--stage-ivf-accent))" }}>
                Your IVF timeline
              </p>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-3">
              Where you are now
            </h2>
            <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed mb-14 max-w-lg">
              A clearer view of what has happened, where you are, and what comes next.
            </p>
          </Fade>

          <Fade delay={80}>
            <div className="bg-card border border-border/25 rounded-2xl p-8 md:p-10 shadow-elevated">
              {/* Progress bar */}
              <div className="relative mb-12">
                <div className="w-full rounded-full h-1" style={{ background: "hsl(var(--stage-ivf) / 0.35)" }}>
                  <div
                    className="rounded-full h-1 transition-all duration-1000"
                    style={{ width: `${progressPct}%`, background: "hsl(var(--stage-ivf-accent))" }}
                  />
                </div>
                <div
                  className="absolute -top-2 transition-all duration-1000"
                  style={{ left: `calc(${Math.max(progressPct, 2)}% - 10px)` }}
                >
                  <div className="w-5 h-5 rounded-full border-[3px] border-card shadow-md" style={{ background: "hsl(var(--stage-ivf-accent))" }} />
                </div>
              </div>

              {/* Nodes */}
              <div className="space-y-0">
                {TIMELINE_NODES.map((node, i) => {
                  const isPast = clampedDpt > node.dpt;
                  const isCurrent = clampedDpt === node.dpt || (i < TIMELINE_NODES.length - 1 && clampedDpt > node.dpt && clampedDpt < TIMELINE_NODES[i + 1].dpt);
                  const isFuture = !isPast && !isCurrent;
                  const nodeDate = addDays(transferDate, node.dpt);
                  return (
                    <div key={node.dpt} className={cn(
                      "flex items-center gap-5 py-5 rounded-xl px-5 -mx-5 transition-all",
                      isCurrent && "bg-parchment/60"
                    )}>
                      <div className={cn(
                        "w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0 font-serif text-xs transition-all",
                        isPast && !isCurrent && "border-border/20 text-muted-foreground/30 bg-transparent",
                        isFuture && "border-border/15 text-muted-foreground/20 bg-transparent"
                      )}
                      style={isCurrent ? { background: "hsl(var(--stage-ivf-accent))", borderColor: "hsl(var(--stage-ivf-accent))", color: "hsl(var(--card))" } : {}}
                      >
                        {node.dpt}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2.5">
                          <p className={cn(
                            "font-sans text-[15px] leading-snug",
                            isCurrent ? "font-medium text-foreground" : isPast ? "font-light text-muted-foreground/40 line-through decoration-border/30" : "font-light text-muted-foreground/30"
                          )}>
                            {node.label}
                          </p>
                          {isCurrent && (
                            <span className="font-sans text-[9px] font-medium tracking-[0.2em] uppercase px-3 py-1 rounded-full" style={{ color: "hsl(var(--stage-ivf-accent))", background: "hsl(var(--stage-ivf) / 0.5)" }}>
                              You are here
                            </span>
                          )}
                        </div>
                        <p className={cn(
                          "font-sans text-xs font-light mt-1",
                          isCurrent ? "text-muted-foreground/60" : "text-muted-foreground/25"
                        )}>{node.detail}</p>
                      </div>
                      <p className={cn(
                        "font-sans text-xs font-light shrink-0 tabular-nums",
                        isCurrent ? "text-muted-foreground/60" : "text-muted-foreground/25"
                      )}>
                        {format(nodeDate, "d MMM")}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Fade>

          {/* Anxiety-killer */}
          <Fade delay={160}>
            <div className="mt-6 rounded-2xl px-7 py-6 border" style={{ background: "hsl(var(--stage-ivf) / 0.2)", borderColor: "hsl(var(--stage-ivf-accent) / 0.08)" }}>
              <div className="flex items-start gap-4">
                <Shield size={16} className="shrink-0 mt-0.5" style={{ color: "hsl(var(--stage-ivf-accent) / 0.7)" }} />
                <div>
                  <p className="font-sans text-xs font-medium text-foreground/50 mb-1.5 tracking-wide">What not to worry about yet</p>
                  <p className="font-sans text-[14px] font-light text-foreground/55 leading-[1.75]">
                    {insight.dontWorryYet}
                  </p>
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════
          S5: WHAT TO EXPECT NEXT
          Structured milestones — guided, not overwhelming
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-parchment py-24 md:py-32">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
          <Fade delay={0}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10" style={{ background: "hsl(var(--stage-ivf-accent) / 0.3)" }} />
              <p className="font-sans text-[11px] font-light tracking-[0.25em] uppercase" style={{ color: "hsl(var(--stage-ivf-accent))" }}>
                Looking ahead
              </p>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-4">
              What to expect next
            </h2>
            <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed mb-14 max-w-lg">
              The next likely steps from where you are now, held clearly so you can follow what matters.
            </p>
          </Fade>

          <div className="space-y-0">
            {insight.whatToExpect.map((item, i) => (
              <Fade key={i} delay={i * 80}>
                <div className={cn(
                  "grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-7 border-b border-border/20",
                  i === 0 && "border-t border-border/20"
                )}>
                  {/* Step number + content */}
                  <div className="md:col-span-5 flex items-start gap-5">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: "hsl(var(--stage-ivf) / 0.3)", border: "1px solid hsl(var(--stage-ivf-accent) / 0.1)" }}>
                      <span className="font-serif text-sm" style={{ color: "hsl(var(--stage-ivf-accent))" }}>{i + 1}</span>
                    </div>
                    <div>
                      <p className="font-sans text-[15px] font-medium text-foreground leading-snug mb-1">{item.step}</p>
                      <p className="font-sans text-xs font-light text-muted-foreground/50">{item.timing}</p>
                    </div>
                  </div>
                  {/* Why */}
                  <div className="md:col-span-7 md:flex md:items-center">
                    <p className="font-sans text-[14px] font-light text-muted-foreground/65 leading-relaxed md:pl-2">{item.why}</p>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════
          S6: ASK ABOUT THIS STAGE
          IVF-contextualised support — warm, specific, integrated
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32" style={{ background: "hsl(var(--stage-ivf) / 0.2)" }}>
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-14 lg:gap-20 items-start">
            {/* Left: Prompt + input */}
            <div className="lg:col-span-2">
              <Fade delay={0}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-8" style={{ background: "hsl(var(--stage-ivf-accent) / 0.3)" }} />
                  <p className="font-sans text-[11px] font-light tracking-[0.25em] uppercase" style={{ color: "hsl(var(--stage-ivf-accent))" }}>
                    IVF support
                  </p>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-5">
                  Ask about this stage
                </h2>
                <p className="font-sans text-[15px] font-light text-muted-foreground leading-[1.8] mb-8 max-w-sm">
                  Whatever has been on your mind — symptoms, the wait, what is normal, what happens next — you can ask from where you are right now.
                </p>
                <div className="relative mb-5">
                  <input
                    type="text"
                    value={aiQuestion}
                    onChange={(e) => setAiQuestion(e.target.value)}
                    placeholder="What's been on your mind?"
                    className="w-full bg-card border border-border/30 rounded-xl px-5 py-4 font-sans text-sm font-light text-foreground placeholder:text-muted-foreground/35 focus:outline-none focus:ring-1 transition-all"
                    style={{ "--tw-ring-color": "hsl(var(--stage-ivf-accent) / 0.3)" } as React.CSSProperties}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && aiQuestion.trim()) {
                        window.location.href = `/ask?q=${encodeURIComponent(aiQuestion)}`;
                      }
                    }}
                  />
                </div>
                <Link
                  to={`/ask?q=${encodeURIComponent(aiQuestion || "What should I know at this stage of IVF?")}`}
                  className="inline-flex items-center gap-2.5 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
                >
                  <MessageCircle size={14} />
                  Ask now
                </Link>
              </Fade>
            </div>

            {/* Right: Suggested questions */}
            <div className="lg:col-span-3">
              <Fade delay={120}>
                <div className="bg-card/80 backdrop-blur-sm border border-border/25 rounded-2xl p-8 shadow-soft">
                  <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase mb-7" style={{ color: "hsl(var(--stage-ivf-accent))" }}>
                    Common questions at this stage
                  </p>
                  {[
                    `Is this normal at ${clampedDpt} days after transfer?`,
                    "Should I be feeling something by now?",
                    daysToTest > 0 ? "When should I test?" : "What happens after the test?",
                    "What does this stage usually feel like?",
                    "Is no symptom still okay?",
                    "When is the next important milestone?",
                  ].map((q, i) => (
                    <button
                      key={i}
                      onClick={() => setAiQuestion(q)}
                      className="group w-full flex items-start gap-3.5 py-4 border-b border-border/15 last:border-0 text-left hover:pl-1 transition-all"
                    >
                      <MessageCircle size={12} className="mt-1 shrink-0 opacity-40 group-hover:opacity-70 transition-opacity" style={{ color: "hsl(var(--stage-ivf-accent))" }} />
                      <p className="font-sans text-[14px] font-light text-foreground/60 leading-relaxed group-hover:text-foreground transition-colors">{q}</p>
                    </button>
                  ))}
                </div>
              </Fade>
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════
          S7: JOURNAL COMPANION
          Emotionally integrated — not product-dropped
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-parchment py-24 md:py-32 overflow-hidden">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Image — tactile, real */}
            <Fade delay={0}>
              <div className="flex justify-center md:justify-start relative">
                <div className="relative group">
                  <img
                    src={homeJournalFlatlay}
                    alt="The Start of You Journal — a physical companion to the IVF journey"
                    width={1200}
                    height={800}
                    loading="lazy"
                    className="w-full max-w-sm sm:max-w-md rounded-2xl shadow-elevated object-cover group-hover:shadow-card-hover transition-shadow duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-xl px-3.5 py-2.5 border border-border/15 shadow-soft">
                    <div className="flex gap-0.5 mb-1">
                      {[1,2,3,4,5].map(i => <Star key={i} size={10} className="text-terracotta fill-terracotta" />)}
                    </div>
                    <p className="font-sans text-[9px] font-light text-muted-foreground/50">Available on Amazon</p>
                  </div>
                </div>
              </div>
            </Fade>

            {/* Content — emotionally connected */}
            <Fade delay={120}>
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px w-10" style={{ background: "hsl(var(--stage-ivf-accent) / 0.3)" }} />
                  <p className="font-sans text-[11px] font-light tracking-[0.25em] uppercase" style={{ color: "hsl(var(--stage-ivf-accent))" }}>
                    Physical · Digital
                  </p>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-5">
                  A place to hold<br />this stage
                </h2>
                <p className="font-sans text-[15px] font-light text-muted-foreground leading-[1.8] mb-10 max-w-md">
                  The IVF journey can hold a lot — appointments, waiting, questions, quiet hope, and uncertainty. The journal gives you a calm, private space to keep what this stage actually feels like.
                </p>

                <div className="grid grid-cols-2 gap-3 mb-10">
                  {[
                    { icon: BookOpen, label: "Weekly reflection prompts" },
                    { icon: Heart, label: "Free-form entry space" },
                    { icon: Shield, label: "Private and personal" },
                    { icon: Star, label: "A keepsake for life" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-2.5 rounded-xl p-3.5" style={{ background: "hsl(var(--stage-ivf) / 0.25)" }}>
                      <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "hsl(var(--stage-ivf-accent) / 0.1)" }}>
                        <item.icon size={10} style={{ color: "hsl(var(--stage-ivf-accent))" }} />
                      </span>
                      <span className="font-sans text-xs font-light text-foreground leading-snug">{item.label}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/product"
                  className="inline-flex items-center gap-3 bg-terracotta text-terracotta-foreground rounded-pill px-8 py-4 font-sans text-[13px] font-medium shadow-cta hover:bg-terracotta-hover transition-all"
                >
                  Explore the journal
                  <ArrowRight size={15} />
                </Link>
              </div>
            </Fade>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════
          S8: EXPLORE YOUR IVF JOURNEY
          Curated directional links — editorial, not nav-like
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-24" style={{ background: "hsl(var(--parchment-dark))" }}>
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
          <Fade delay={0}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10" style={{ background: "hsl(var(--stage-ivf-accent) / 0.3)" }} />
              <p className="font-sans text-[11px] font-light tracking-[0.25em] uppercase" style={{ color: "hsl(var(--stage-ivf-accent))" }}>
                Explore your journey
              </p>
            </div>
            <p className="font-sans text-[15px] font-light text-muted-foreground mb-10 max-w-sm">
              Guidance for what matters most from where you are now.
            </p>
          </Fade>
          <div className="divide-y divide-border/20">
            {[
              { label: "After transfer guidance", sub: "What to expect in the days following transfer", href: "/ivf/after-transfer" },
              { label: "Early IVF pregnancy", sub: "What happens if your test is positive", href: "/ivf/early-pregnancy" },
              { label: "Common concerns at this stage", sub: "What is normal, and when to contact your clinic", href: "/support" },
            ].map((link, i) => (
              <Fade key={i} delay={i * 60}>
                <Link
                  to={link.href}
                  className="group flex items-center justify-between py-7 hover:pl-1 transition-all"
                >
                  <div>
                    <p className="font-serif text-lg text-foreground group-hover:text-foreground/70 transition-colors leading-snug">
                      {link.label}
                    </p>
                    <p className="font-sans text-[13px] font-light text-muted-foreground/50 mt-1.5">{link.sub}</p>
                  </div>
                  <ArrowRight size={14} className="text-muted-foreground/20 group-hover:text-foreground/40 transition-colors ml-4 shrink-0" />
                </Link>
              </Fade>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════
          S9: FINAL TRUST CTA
          Decisive, warm, system-level close
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(var(--stage-ivf) / 0.2) 0%, hsl(var(--parchment)) 100%)" }}>
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "radial-gradient(circle at 50% 40%, hsl(var(--stage-ivf-accent)), transparent 55%)" }} />

        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-2xl text-center relative z-10">
          <Fade delay={0}>
            <p className="font-sans text-[11px] font-light tracking-[0.25em] uppercase mb-8" style={{ color: "hsl(var(--stage-ivf-accent))" }}>
              Day {clampedDpt} post transfer · {insight.stage}
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-[2.8rem] text-foreground leading-[1.15] mb-6">
              Begin with guidance that<br />understands <span className="italic">IVF</span>
            </h2>
            <p className="font-sans text-[15px] font-light text-muted-foreground leading-[1.8] max-w-md mx-auto mb-12">
              Get guidance tailored to your stage — what is happening, what is normal, and what to expect next.
            </p>
            <Link
              to="/ivf"
              className="group inline-flex items-center gap-3 bg-terracotta text-terracotta-foreground rounded-pill px-10 py-5 font-sans text-[15px] font-medium shadow-cta hover:bg-terracotta-hover hover:shadow-lg transition-all"
            >
              Start your journey
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>

            {/* Trust cues */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8 mt-10">
              {[
                "Personalised to your stage",
                "Built for IVF-specific timing",
                "Save your place and return anytime",
              ].map((cue, i) => (
                <p key={i} className="font-sans text-xs font-light text-muted-foreground/45 flex items-center gap-2">
                  <Check size={11} style={{ color: "hsl(var(--stage-ivf-accent))" }} />
                  {cue}
                </p>
              ))}
            </div>

            {/* Medical trust */}
            <p className="mt-12 font-sans text-[11px] font-light text-muted-foreground/35 flex items-center justify-center gap-2">
              <Shield size={11} style={{ color: "hsl(var(--stage-ivf-accent) / 0.4)" }} />
              Medically reviewed by Jenny Joines
            </p>
          </Fade>
        </div>
      </section>

    </div>
  );
};

export default IVFTimelineResult;
