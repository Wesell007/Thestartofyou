import { useEffect, useState } from "react";
import { differenceInDays, addDays, format } from "date-fns";
import { ArrowRight, MessageCircle, Shield, Check, Star, Heart, Clock, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import homeJournalFlatlay from "@/assets/home-journal-flatlay.jpg";

// ─── Types & data ─────────────────────────────────────────────────────────────

interface DptInsight {
  stage: string;
  stageDetail: string;
  testStatus: string;
  heroInterpretation: string;
  whatHappeningMedically: string[];
  whatThisFeelsLike: string;
  whatMattersNow: string;
  dontWorryYet: string;
  whatToExpect: string[];
  testDay: number;
}

const getDptInsight = (dpt: number): DptInsight => {
  if (dpt <= 1) return {
    stage: "Day of transfer",
    stageDetail: "The embryo has just been placed",
    testStatus: "Test window opens around day 10",
    heroInterpretation: "There is nothing to feel or interpret yet. The embryo is exactly where it needs to be, and your body is doing the rest.",
    whatHappeningMedically: [
      "The embryo is settling into the uterine environment",
      "No implantation has occurred yet, this is completely normal",
      "Hormonal support (progesterone) is doing its work in the background",
    ],
    whatThisFeelsLike: "Many people feel surprisingly calm, or surprisingly anxious, right after transfer. Both are normal. The gap between 'something important just happened' and 'I can't feel anything' can feel strange.",
    whatMattersNow: "Rest, gentle routine, and trusting the process. There is nothing you need to do differently today.",
    dontWorryYet: "No symptoms at this stage are meaningful. Feeling nothing is the most common and completely expected experience right now.",
    whatToExpect: [
      "Continued progesterone support as prescribed by your clinic",
      "Implantation typically begins within the next 1 to 3 days",
      "Your clinic will confirm your official test date",
    ],
    testDay: 10,
  };
  if (dpt <= 3) return {
    stage: "Implantation window",
    stageDetail: "The embryo may be beginning to implant",
    testStatus: "Test window opens around day 10",
    heroInterpretation: "The implantation window is one of the most significant, and invisible, moments of IVF. What you feel or do not feel is not a reliable signal.",
    whatHappeningMedically: [
      "For a 5-day transfer, implantation typically occurs around days 1 to 3",
      "The blastocyst is hatching from its shell and beginning to attach",
      "hCG production begins once implantation starts, but levels are far too low to detect",
    ],
    whatThisFeelsLike: "This is often when symptom-watching begins. The temptation to interpret every twinge is strong, but the truth is that most implantation happens without any noticeable sensation at all.",
    whatMattersNow: "Staying with your medication schedule, maintaining gentle routines, and being kind to yourself during a stage that offers no feedback.",
    dontWorryYet: "Absence of symptoms is the most common experience during implantation. Mild cramping, spotting, or nothing at all are all within the range of normal.",
    whatToExpect: [
      "Mild cramping or spotting is possible but not required",
      "Most people feel nothing notable during this window",
      "Testing before day 10 will almost certainly be too early",
    ],
    testDay: 10,
  };
  if (dpt <= 6) return {
    stage: "Early post-implantation",
    stageDetail: "hCG levels may be beginning to rise",
    testStatus: "Test window in a few days",
    heroInterpretation: "If implantation has occurred, your body is beginning to respond, but levels are still too low for home tests to detect. This in-between stage is often the hardest to sit with.",
    whatHappeningMedically: [
      "hCG is now rising if implantation has occurred",
      "The embryo is developing rapidly at a cellular level",
      "Your body is adjusting to changing hormone levels alongside progesterone support",
    ],
    whatThisFeelsLike: "The waiting can feel heavier now. You may feel hyper-aware of your body, or frustrated by not knowing. This is one of the most emotionally loaded stages of IVF.",
    whatMattersNow: "Continue your prescribed support. Limit repetitive searching and comparison. Protect your bandwidth for the days ahead.",
    dontWorryYet: "Symptom variation, including no symptoms at all, is not an indicator of outcome. Testing too early may show a negative even if pregnancy has occurred.",
    whatToExpect: [
      "Breast tenderness or fatigue may begin, but can also be progesterone effects",
      "Some people experience mild nausea or heightened sense of smell",
      "Home tests at this stage are unreliable, wait for your official test date",
    ],
    testDay: 10,
  };
  if (dpt <= 9) return {
    stage: "Pre-test window",
    stageDetail: "hCG is rising, testing is approaching",
    testStatus: "Test day is very close",
    heroInterpretation: "You are close to your test date. This is often the most emotionally intense part of the IVF process. Whatever you are feeling, or not feeling, is valid.",
    whatHappeningMedically: [
      "If implantation has occurred, hCG is now doubling roughly every 48 hours",
      "Progesterone support continues as prescribed",
      "Your body may begin showing early pregnancy signals, or none at all",
    ],
    whatThisFeelsLike: "The final days before testing can feel enormous. Time often slows down. You may feel hopeful, terrified, numb, or all of these at once. None of this reflects the outcome.",
    whatMattersNow: "Have a plan for test day. Know when and how you will test. Arrange support around you. Stay with what you can control.",
    dontWorryYet: "Symptom intensity does not correlate with outcome. Many successful IVF pregnancies had no symptoms at all before test day.",
    whatToExpect: [
      "Your clinic will confirm your beta hCG date, this is the most accurate measure",
      "Home tests may now be more reliable but are still not definitive",
      "Emotional intensity is expected and normal at this stage",
    ],
    testDay: 10,
  };
  if (dpt <= 12) return {
    stage: "Test window",
    stageDetail: "Official testing is typically done now",
    testStatus: "You are in the test window",
    heroInterpretation: "This is your test window. A blood test from your clinic measures hCG with much greater accuracy than home tests. Both positive and uncertain results need time to process.",
    whatHappeningMedically: [
      "Your clinic's official test day is typically around day 10 to 12",
      "Blood hCG testing is the most accurate measure at this stage",
      "Home pregnancy tests may now be reliable, but blood tests are definitive",
    ],
    whatThisFeelsLike: "Test day can feel like the most important day of your life. Whatever the result, give yourself space. This moment deserves gentleness, not pressure.",
    whatMattersNow: "Follow your clinic's guidance on testing. If you have tested at home, your blood test will confirm. Whatever happens next, you are supported.",
    dontWorryYet: "A faint positive is still a positive. Your clinic will guide interpretation and next steps based on your specific hCG levels.",
    whatToExpect: [
      "Your clinic will guide next steps based on blood test results",
      "If positive, an early scan will typically be arranged for 6 to 7 weeks",
      "If results are uncertain, repeat testing may be advised",
    ],
    testDay: 10,
  };
  return {
    stage: "Post-test monitoring",
    stageDetail: "Early pregnancy monitoring and care",
    testStatus: "Monitoring stage",
    heroInterpretation: "This stage involves both medical monitoring and significant emotional adjustment. Cautious hope is a completely normal response after IVF. You do not need to feel certain to move forward.",
    whatHappeningMedically: [
      "Your clinic is monitoring hCG levels to confirm progression",
      "An early viability scan is typically arranged around 6 to 7 weeks",
      "Progesterone support often continues through early pregnancy",
    ],
    whatThisFeelsLike: "Many people expect to feel relieved after a positive test, but find that anxiety continues. After everything it took to get here, it can be hard to trust that it is real. This is deeply normal.",
    whatMattersNow: "Take one appointment at a time. Stay connected with your clinic. Allow yourself to feel whatever comes without judgement.",
    dontWorryYet: "Anxiety between appointments is one of the most common experiences in early IVF pregnancy. Needing continued reassurance does not mean something is wrong.",
    whatToExpect: [
      "Continued progesterone support in many cases",
      "Early scan to confirm heartbeat and location",
      "Gradual transition to standard pregnancy care if all is progressing",
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
          Premium split layout with lavender identity
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(var(--stage-ivf)) 0%, hsl(var(--parchment)) 100%)" }}>
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-20" style={{ background: "radial-gradient(circle, hsl(var(--stage-ivf-accent) / 0.15), transparent 70%)" }} />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, hsl(var(--lavender) / 0.2), transparent 70%)" }} />

        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl pt-28 md:pt-36 pb-16 md:pb-24 relative z-10">
          <Fade delay={0}>
            <p className="font-sans text-[11px] font-light tracking-[0.25em] uppercase mb-10" style={{ color: "hsl(var(--stage-ivf-accent))" }}>
              Your IVF timeline
            </p>
          </Fade>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            {/* Left: Primary result */}
            <div className="lg:col-span-3">
              <Fade delay={80}>
                <div className="mb-3">
                  <span className="font-sans text-sm font-light text-muted-foreground">You are currently</span>
                </div>
                <div className="flex items-end gap-3 mb-2">
                  <span className="font-serif text-7xl sm:text-8xl text-foreground leading-none tracking-tight">{clampedDpt}</span>
                  <span className="font-sans text-xl sm:text-2xl font-light text-muted-foreground pb-2">
                    {clampedDpt === 1 ? "day" : "days"} post transfer
                  </span>
                </div>
                <p className="font-sans text-sm font-light text-muted-foreground/70 mb-8">
                  {transferType === "5day" ? "5-day blastocyst" : "3-day"} transfer · {format(transferDate, "d MMMM yyyy")}
                </p>
              </Fade>

              {/* Interpretive note */}
              <Fade delay={200}>
                <p className="font-sans text-base font-light text-foreground/70 leading-relaxed max-w-lg mb-10">
                  {insight.heroInterpretation}
                </p>
              </Fade>

              {/* CTAs */}
              <Fade delay={300}>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/ivf"
                    className="inline-flex items-center gap-2.5 bg-terracotta text-terracotta-foreground rounded-pill px-8 py-4 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
                  >
                    Start your journey
                    <ArrowRight size={15} />
                  </Link>
                  <Link
                    to="/ask"
                    className="inline-flex items-center gap-2.5 bg-card border border-border/50 text-foreground rounded-pill px-7 py-4 font-sans text-sm font-light hover:border-sage/40 transition-all"
                  >
                    <MessageCircle size={14} className="text-sage" />
                    Ask about this stage
                  </Link>
                </div>
              </Fade>
            </div>

            {/* Right: Orientation card */}
            <div className="lg:col-span-2">
              <Fade delay={160}>
                <div className="bg-card/80 backdrop-blur-sm border border-border/40 rounded-2xl shadow-card-brand overflow-hidden">
                  {/* Stage */}
                  <div className="px-7 pt-7 pb-5 border-b border-border/30">
                    <p className="font-sans text-[10px] font-light tracking-[0.2em] uppercase mb-3" style={{ color: "hsl(var(--stage-ivf-accent))" }}>Current stage</p>
                    <p className="font-serif text-xl text-foreground leading-snug mb-1">{insight.stage}</p>
                    <p className="font-sans text-sm font-light text-muted-foreground">{insight.stageDetail}</p>
                  </div>

                  {/* Test window */}
                  <div className="px-7 py-5 border-b border-border/30">
                    <p className="font-sans text-[10px] font-light tracking-[0.2em] uppercase mb-3" style={{ color: "hsl(var(--stage-ivf-accent))" }}>
                      {daysToTest > 0 ? "Test day" : "Test window"}
                    </p>
                    {daysToTest > 0 ? (
                      <div className="flex items-end gap-2">
                        <span className="font-serif text-3xl text-foreground">{daysToTest}</span>
                        <span className="font-sans text-sm font-light text-muted-foreground pb-0.5">
                          {daysToTest === 1 ? "day" : "days"} away · {format(testDate, "d MMM")}
                        </span>
                      </div>
                    ) : (
                      <p className="font-serif text-lg text-foreground">{insight.testStatus}</p>
                    )}
                  </div>

                  {/* Quick link */}
                  <Link to="/ivf/after-transfer" className="group flex items-center justify-between px-7 py-5 hover:bg-parchment/50 transition-colors">
                    <div>
                      <p className="font-sans text-sm font-light text-foreground group-hover:text-sage transition-colors">After transfer guide</p>
                      <p className="font-sans text-xs font-light text-muted-foreground/60">Stage-specific guidance</p>
                    </div>
                    <ArrowRight size={13} className="text-muted-foreground/40 group-hover:text-sage transition-colors" />
                  </Link>
                </div>
              </Fade>
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════
          S2: CONVERSION BRIDGE
          Why starting matters now
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-parchment-dark py-20 md:py-24">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Fade delay={0}>
              <div>
                <div className="editorial-rule-left mb-6" />
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground leading-tight mb-5">
                  From here, your IVF journey becomes personal
                </h2>
                <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-8 max-w-md">
                  Starting your journey saves your stage, personalises your guidance, and helps you follow what happens next with clarity.
                </p>
                <Link
                  to="/ivf"
                  className="inline-flex items-center gap-2.5 bg-terracotta text-terracotta-foreground rounded-pill px-8 py-4 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
                >
                  Start your journey
                  <ArrowRight size={15} />
                </Link>
                <p className="mt-4 font-sans text-xs font-light text-muted-foreground/60">Takes a minute to begin.</p>
              </div>
            </Fade>

            <Fade delay={120}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Clock, title: "Save where you are", body: "Your IVF timeline is remembered so you can pick up where you left off" },
                  { icon: Activity, title: "Stage-based guidance", body: "Unlock support that reflects IVF timing, not generic pregnancy advice" },
                  { icon: Shield, title: "Know what to expect", body: "Medically grounded next steps, both practical and emotional" },
                  { icon: Heart, title: "Return anytime", body: "Your place is saved. Come back when you need guidance or reassurance" },
                ].map((item, i) => (
                  <div key={i} className="bg-card border border-border/40 rounded-2xl p-6">
                    <item.icon size={18} className="mb-3" style={{ color: "hsl(var(--stage-ivf-accent))" }} />
                    <p className="font-sans text-sm font-medium text-foreground mb-1.5">{item.title}</p>
                    <p className="font-sans text-xs font-light text-muted-foreground leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </Fade>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════
          S3: WHAT THIS STAGE MEANS IN IVF
          Split editorial — medical vs emotional
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-parchment py-20 md:py-24">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
          <Fade delay={0}>
            <p className="font-sans text-[11px] font-light tracking-[0.25em] uppercase mb-5" style={{ color: "hsl(var(--stage-ivf-accent))" }}>
              Understanding your stage
            </p>
          </Fade>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
            {/* Left: Editorial explanation */}
            <div className="lg:col-span-2">
              <Fade delay={60}>
                <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-6">
                  What this stage means in IVF
                </h2>
                <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-6">
                  IVF care is usually more structured here than in a typical spontaneous pregnancy. Your clinic is monitoring specific milestones, and the timeline is measured in days, not weeks.
                </p>
                <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                  That precision can feel reassuring and pressurising at the same time. Both responses are valid.
                </p>
              </Fade>
            </div>

            {/* Right: Insight blocks */}
            <div className="lg:col-span-3 space-y-5">
              {/* What's happening medically */}
              <Fade delay={100}>
                <div className="bg-card border border-border/40 rounded-2xl p-7">
                  <div className="flex items-center gap-2.5 mb-4">
                    <Activity size={14} style={{ color: "hsl(var(--stage-ivf-accent))" }} />
                    <p className="font-sans text-xs font-light tracking-[0.15em] uppercase" style={{ color: "hsl(var(--stage-ivf-accent))" }}>
                      What's happening medically
                    </p>
                  </div>
                  <ul className="space-y-3">
                    {insight.whatHappeningMedically.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-2 w-1 h-1 rounded-full shrink-0" style={{ background: "hsl(var(--stage-ivf-accent))" }} />
                        <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Fade>

              {/* What this can feel like */}
              <Fade delay={160}>
                <div className="bg-card border border-border/40 rounded-2xl p-7">
                  <div className="flex items-center gap-2.5 mb-4">
                    <Heart size={14} style={{ color: "hsl(var(--stage-ivf-accent))" }} />
                    <p className="font-sans text-xs font-light tracking-[0.15em] uppercase" style={{ color: "hsl(var(--stage-ivf-accent))" }}>
                      What this can feel like
                    </p>
                  </div>
                  <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                    {insight.whatThisFeelsLike}
                  </p>
                </div>
              </Fade>

              {/* What matters right now */}
              <Fade delay={220}>
                <div className="rounded-2xl p-7 border" style={{ background: "hsl(var(--stage-ivf) / 0.4)", borderColor: "hsl(var(--stage-ivf-accent) / 0.15)" }}>
                  <div className="flex items-center gap-2.5 mb-4">
                    <Shield size={14} style={{ color: "hsl(var(--stage-ivf-accent))" }} />
                    <p className="font-sans text-xs font-light tracking-[0.15em] uppercase" style={{ color: "hsl(var(--stage-ivf-accent))" }}>
                      What matters right now
                    </p>
                  </div>
                  <p className="font-serif italic text-base text-foreground/80 leading-relaxed">
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
          Transfer-based journey map
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-parchment-dark py-20 md:py-24">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
          <Fade delay={0}>
            <p className="font-sans text-[11px] font-light tracking-[0.25em] uppercase mb-3" style={{ color: "hsl(var(--stage-ivf-accent))" }}>
              Your IVF timeline
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-3">
              Where you are now
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-10 max-w-lg">
              A clearer view of where you are, what has happened, and what comes next in your post-transfer timeline.
            </p>
          </Fade>

          <Fade delay={80}>
            <div className="bg-card border border-border/40 rounded-2xl p-7 md:p-10 shadow-card-brand">
              {/* Progress bar */}
              <div className="relative mb-10">
                <div className="w-full rounded-full h-1.5" style={{ background: "hsl(var(--stage-ivf) / 0.5)" }}>
                  <div
                    className="rounded-full h-1.5 transition-all duration-1000"
                    style={{ width: `${progressPct}%`, background: "hsl(var(--stage-ivf-accent))" }}
                  />
                </div>
                <div
                  className="absolute -top-2.5 transition-all duration-1000"
                  style={{ left: `calc(${Math.max(progressPct, 2)}% - 12px)` }}
                >
                  <div className="w-6 h-6 rounded-full border-[3px] border-card shadow-md" style={{ background: "hsl(var(--stage-ivf-accent))" }} />
                </div>
              </div>

              {/* Nodes */}
              <div className="space-y-1">
                {TIMELINE_NODES.map((node, i) => {
                  const isPast = clampedDpt > node.dpt;
                  const isCurrent = clampedDpt === node.dpt || (i < TIMELINE_NODES.length - 1 && clampedDpt > node.dpt && clampedDpt < TIMELINE_NODES[i + 1].dpt);
                  const isFuture = !isPast && !isCurrent;
                  const nodeDate = addDays(transferDate, node.dpt);
                  return (
                    <div key={node.dpt} className={cn(
                      "flex items-center gap-5 py-4 rounded-xl px-4 -mx-4 transition-all",
                      isCurrent && "bg-parchment/60"
                    )}>
                      <div className={cn(
                        "w-9 h-9 rounded-full border-2 flex items-center justify-center shrink-0 font-serif text-xs transition-all",
                        isCurrent && "border-transparent text-card",
                        isPast && !isCurrent && "border-sage-light/40 text-sage-muted bg-sage-bg/30",
                        isFuture && "border-border/40 text-muted-foreground/40 bg-transparent"
                      )}
                      style={isCurrent ? { background: "hsl(var(--stage-ivf-accent))", borderColor: "hsl(var(--stage-ivf-accent))" } : {}}
                      >
                        {node.dpt}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2.5">
                          <p className={cn(
                            "font-sans text-sm leading-snug",
                            isCurrent ? "font-medium text-foreground" : isPast ? "font-light text-muted-foreground/60" : "font-light text-muted-foreground/40"
                          )}>
                            {node.label}
                          </p>
                          {isCurrent && (
                            <span className="font-sans text-[9px] font-light tracking-[0.2em] uppercase px-2.5 py-1 rounded-full" style={{ color: "hsl(var(--stage-ivf-accent))", background: "hsl(var(--stage-ivf) / 0.5)" }}>
                              You are here
                            </span>
                          )}
                        </div>
                        <p className={cn(
                          "font-sans text-xs font-light mt-0.5",
                          isCurrent ? "text-muted-foreground" : "text-muted-foreground/40"
                        )}>{node.detail}</p>
                      </div>
                      <p className={cn(
                        "font-sans text-xs font-light shrink-0",
                        isCurrent ? "text-muted-foreground" : "text-muted-foreground/40"
                      )}>
                        {format(nodeDate, "d MMM")}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Fade>

          {/* Anxiety-killer below timeline */}
          <Fade delay={160}>
            <div className="mt-6 rounded-xl px-6 py-5 border" style={{ background: "hsl(var(--stage-ivf) / 0.3)", borderColor: "hsl(var(--stage-ivf-accent) / 0.12)" }}>
              <div className="flex items-start gap-3">
                <Shield size={15} className="shrink-0 mt-0.5" style={{ color: "hsl(var(--stage-ivf-accent))" }} />
                <p className="font-sans text-sm font-light text-foreground/70 leading-relaxed">
                  {insight.dontWorryYet}
                </p>
              </div>
            </div>
          </Fade>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════
          S5: WHAT TO EXPECT NEXT
          Clean vertical sequence
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-parchment py-20 md:py-24">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
          <Fade delay={0}>
            <p className="font-sans text-[11px] font-light tracking-[0.25em] uppercase mb-3" style={{ color: "hsl(var(--stage-ivf-accent))" }}>
              Looking ahead
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-10">
              What to expect next
            </h2>
          </Fade>

          <div className="space-y-0">
            {insight.whatToExpect.map((item, i) => (
              <Fade key={i} delay={i * 80}>
                <div className={cn(
                  "flex items-start gap-6 py-7",
                  i < insight.whatToExpect.length - 1 && "border-b border-border/30"
                )}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-0.5 border" style={{ background: "hsl(var(--stage-ivf) / 0.3)", borderColor: "hsl(var(--stage-ivf-accent) / 0.15)" }}>
                    <span className="font-serif text-sm" style={{ color: "hsl(var(--stage-ivf-accent))" }}>{i + 1}</span>
                  </div>
                  <p className="font-sans text-base font-light text-muted-foreground leading-relaxed pt-2">{item}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════
          S6: ASK ABOUT THIS STAGE
          IVF-contextualised AI support
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-24" style={{ background: "hsl(var(--stage-ivf) / 0.35)" }}>
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <Fade delay={0}>
              <div>
                <p className="font-sans text-[11px] font-light tracking-[0.25em] uppercase mb-5" style={{ color: "hsl(var(--stage-ivf-accent))" }}>
                  IVF Support
                </p>
                <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-5">
                  Ask about this stage
                </h2>
                <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-8 max-w-md">
                  Whatever has been on your mind, symptoms, the wait, what is normal, what happens next, you can ask from where you are right now.
                </p>
                <div className="relative mb-5">
                  <input
                    type="text"
                    value={aiQuestion}
                    onChange={(e) => setAiQuestion(e.target.value)}
                    placeholder="What's been on your mind?"
                    className="w-full bg-card border border-border/50 rounded-xl px-5 py-4 font-sans text-sm font-light text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 transition-all"
                    style={{ "--tw-ring-color": "hsl(var(--stage-ivf-accent) / 0.3)" } as React.CSSProperties}
                  />
                </div>
                <Link
                  to={`/ask?q=${encodeURIComponent(aiQuestion || "What should I know at this stage of IVF?")}`}
                  className="inline-flex items-center gap-2.5 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
                >
                  <MessageCircle size={14} />
                  Ask now
                </Link>
              </div>
            </Fade>

            <Fade delay={120}>
              <div className="bg-card border border-border/40 rounded-2xl p-7 shadow-card-brand">
                <p className="font-sans text-[10px] font-light tracking-[0.2em] uppercase mb-5" style={{ color: "hsl(var(--stage-ivf-accent))" }}>
                  Suggested questions
                </p>
                {[
                  `Is this normal at ${clampedDpt} days after transfer?`,
                  "Should I be feeling something by now?",
                  daysToTest > 0 ? "When should I test?" : "What happens after the test?",
                  "How do I handle the waiting?",
                  "Is no symptom still okay?",
                ].map((q, i) => (
                  <button
                    key={i}
                    onClick={() => setAiQuestion(q)}
                    className="group w-full flex items-start gap-3 py-3.5 border-b border-border/30 last:border-0 text-left hover:pl-1 transition-all"
                  >
                    <MessageCircle size={12} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--stage-ivf-accent))" }} />
                    <p className="font-sans text-sm font-light text-foreground leading-relaxed group-hover:text-sage transition-colors">{q}</p>
                  </button>
                ))}
              </div>
            </Fade>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════
          S7: JOURNAL COMPANION
          IVF-contextualised, not generic
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-parchment-dark py-20 md:py-24 overflow-hidden">
        <div className="absolute top-8 right-8 w-14 h-14 border-t border-r pointer-events-none hidden md:block" style={{ borderColor: "hsl(var(--stage-ivf-accent) / 0.15)" }} />

        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Image */}
            <Fade delay={0}>
              <div className="flex justify-center md:justify-start relative">
                <div className="relative group">
                  <img
                    src={homeJournalFlatlay}
                    alt="The Start of You pregnancy journal on a linen surface"
                    width={1200}
                    height={800}
                    loading="lazy"
                    className="w-full max-w-sm sm:max-w-md rounded-2xl shadow-elevated object-cover group-hover:shadow-card-hover transition-shadow duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-xl px-3.5 py-2.5 border border-border/30 shadow-soft">
                    <div className="flex gap-0.5 mb-1">
                      {[1,2,3,4,5].map(i => <Star key={i} size={10} className="text-terracotta fill-terracotta" />)}
                    </div>
                    <p className="font-sans text-[9px] font-light text-muted-foreground/70">Available on Amazon</p>
                  </div>
                </div>
              </div>
            </Fade>

            {/* Content */}
            <Fade delay={120}>
              <div>
                <div className="editorial-rule-left mb-6" />
                <p className="font-sans text-[11px] font-light tracking-[0.25em] uppercase mb-3" style={{ color: "hsl(var(--stage-ivf-accent))" }}>
                  Physical + Digital
                </p>
                <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-5">
                  A place to hold this stage
                </h2>
                <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-8 max-w-md">
                  The IVF journey can hold a lot: appointments, waiting, questions, quiet hope, and uncertainty. The journal gives you a calm, private space to keep what this stage actually feels like.
                </p>

                <div className="grid grid-cols-2 gap-3 mb-8">
                  {[
                    "Weekly reflection prompts",
                    "Free-form entry space",
                    "Private and personal",
                    "A keepsake for life",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2.5 bg-parchment/60 rounded-xl p-3.5">
                      <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "hsl(var(--stage-ivf-accent) / 0.1)" }}>
                        <Check size={9} style={{ color: "hsl(var(--stage-ivf-accent))" }} />
                      </span>
                      <span className="font-sans text-xs font-light text-foreground leading-snug">{item}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/product"
                  className="inline-flex items-center gap-3 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-4 font-sans text-[13px] font-medium shadow-cta hover:bg-terracotta-hover transition-all"
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
          Slim directional links
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-parchment py-16 md:py-20">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
          <Fade delay={0}>
            <p className="font-sans text-[11px] font-light tracking-[0.25em] uppercase mb-5" style={{ color: "hsl(var(--stage-ivf-accent))" }}>
              Explore your journey
            </p>
          </Fade>
          <div className="divide-y divide-border/40">
            {[
              { label: "After transfer guidance", sub: "What to expect in the days following transfer", href: "/ivf/after-transfer" },
              { label: "Early IVF pregnancy", sub: "What happens if your test is positive", href: "/ivf/early-pregnancy" },
              { label: "Common concerns at this stage", sub: "What is normal, and when to contact your clinic", href: "/support" },
            ].map((link, i) => (
              <Fade key={i} delay={i * 60}>
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
              </Fade>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════
          S9: FINAL TRUST CTA
          Decisive, warm close
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(var(--stage-ivf) / 0.3) 0%, hsl(var(--parchment)) 100%)" }}>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, hsl(var(--stage-ivf-accent)), transparent 60%)" }} />

        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-2xl text-center relative z-10">
          <Fade delay={0}>
            <p className="font-sans text-[11px] font-light tracking-[0.25em] uppercase mb-5" style={{ color: "hsl(var(--stage-ivf-accent))" }}>
              Day {clampedDpt} post transfer · {insight.stage}
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-[2.75rem] text-foreground leading-tight mb-6">
              Begin with guidance that understands IVF
            </h2>
            <p className="font-sans text-base font-light text-muted-foreground leading-relaxed max-w-md mx-auto mb-10">
              Get guidance tailored to your stage, what is happening, what is normal, and what to expect next.
            </p>
            <Link
              to="/ivf"
              className="inline-flex items-center gap-2.5 bg-terracotta text-terracotta-foreground rounded-pill px-10 py-4.5 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
            >
              Start your journey
              <ArrowRight size={15} />
            </Link>

            {/* Trust cues */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-8">
              {[
                "Personalised to your stage",
                "Built for IVF-specific timing",
                "Save your place and return anytime",
              ].map((cue, i) => (
                <p key={i} className="font-sans text-xs font-light text-muted-foreground/60 flex items-center gap-2">
                  <Check size={11} style={{ color: "hsl(var(--stage-ivf-accent))" }} />
                  {cue}
                </p>
              ))}
            </div>

            {/* Medical trust */}
            <p className="mt-10 font-sans text-xs font-light text-muted-foreground/50 flex items-center justify-center gap-2">
              <Shield size={11} style={{ color: "hsl(var(--stage-ivf-accent))" }} />
              Medically reviewed by Jenny Joines
            </p>
          </Fade>
        </div>
      </section>

    </div>
  );
};

export default IVFTimelineResult;
