import { useEffect, useRef, useState } from "react";
import { differenceInDays, addDays, format } from "date-fns";
import { ArrowRight, MessageCircle } from "lucide-react";
import JournalPromotion from "@/components/shared/JournalPromotion";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

// ─── Types & data ─────────────────────────────────────────────────────────────

interface DptInsight {
  stage: string;
  stageDetail: string;
  whatHappening: string[];
  whatThisMeans: string;
  whatToExpect: string[];
  testDay: number;
}

const getDptInsight = (dpt: number, transferType: "5day" | "3day" = "5day"): DptInsight => {
  // For 5-day (blastocyst) transfer
  if (dpt <= 1) return {
    stage: "Day of / day after transfer",
    stageDetail: "The embryo has just been placed",
    whatHappening: [
      "The embryo is settling in the uterine environment",
      "No implantation has occurred yet — this is completely normal",
      "Hormonal support (progesterone) is doing its work",
    ],
    whatThisMeans: "There is nothing yet to feel or interpret. The embryo is exactly where it needs to be.",
    whatToExpect: ["Rest and gentle activity are appropriate", "Implantation typically begins 1–3 days post transfer", "Symptoms at this stage are not meaningful indicators"],
    testDay: 10,
  };
  if (dpt <= 3) return {
    stage: "Implantation window",
    stageDetail: "The embryo may be beginning to implant",
    whatHappening: [
      "For a 5-day transfer, implantation typically occurs around days 1–3",
      "The blastocyst is hatching from its shell and beginning to attach",
      "hCG production begins once implantation starts",
    ],
    whatThisMeans: "The implantation window is one of the most significant — and invisible — moments of IVF. What you feel (or don't feel) is not a reliable indicator of whether implantation is happening.",
    whatToExpect: ["Mild cramping or pelvic sensation can occur — but absence of this is equally normal", "Very light spotting (implantation bleeding) is possible", "Most people feel nothing notable during this window"],
    testDay: 10,
  };
  if (dpt <= 6) return {
    stage: "Early post-implantation",
    stageDetail: "hCG levels are beginning to rise",
    whatHappening: [
      "If implantation has occurred, hCG is now rising",
      "The embryo is developing rapidly at a cellular level",
      "Your body is adjusting to rising hormone levels",
    ],
    whatThisMeans: "Symptoms — or lack of symptoms — at this stage are not a reliable indicator of outcome. hCG levels are still too low to be detectable by home tests for a few more days.",
    whatToExpect: ["Breast tenderness or sensitivity may begin", "Fatigue is common and can be hard to separate from progesterone effects", "Some people experience mild nausea", "Testing too early will likely show a negative, even if pregnancy has occurred"],
    testDay: 10,
  };
  if (dpt <= 9) return {
    stage: "Pre-test window",
    stageDetail: "hCG is rising — testing is approaching",
    whatHappening: [
      "If implantation has occurred, hCG is now doubling roughly every 48 hours",
      "Progesterone support continues",
      "Your body may begin showing early pregnancy signals",
    ],
    whatThisMeans: "You are close to your test date. This is often the most emotionally intense part of the IVF process. Whatever you're feeling — or not feeling — is valid.",
    whatToExpect: ["Testing before your official test date may give inaccurate results", "Symptom intensity does not correlate with outcome", "Your clinic will confirm your beta hCG date — this is the most accurate measure"],
    testDay: 10,
  };
  if (dpt <= 12) return {
    stage: "Test window",
    stageDetail: "Official testing is typically done at this stage",
    whatHappening: [
      "Your clinic's official test day (OTD) is typically around day 10–12",
      "Blood hCG testing is the most accurate measure at this stage",
      "Home pregnancy tests may now be more reliable",
    ],
    whatThisMeans: "This is your test window. A blood test from your clinic measures hCG with much greater accuracy than home tests. Both positive and negative results need time to process.",
    whatToExpect: ["Your clinic will guide next steps based on results", "If positive: an early scan will typically be arranged for 6–7 weeks", "If results are uncertain: repeat testing may be advised"],
    testDay: 10,
  };
  return {
    stage: "Post-test / early pregnancy monitoring",
    stageDetail: "Monitoring and early scan stage",
    whatHappening: [
      "If your test was positive, your clinic will be monitoring hCG levels",
      "An early viability scan is typically arranged around 6–7 weeks",
      "This is a period of medical monitoring and emotional adjustment",
    ],
    whatThisMeans: "This stage involves both medical monitoring and significant emotional adjustment. Uncertainty doesn't necessarily mean something is wrong.",
    whatToExpect: ["Continued progesterone support in many cases", "Early scan to confirm heartbeat and location", "Gradual transition to standard pregnancy care if all is progressing"],
    testDay: 10,
  };
};

interface TimelineNode {
  dpt: number;
  label: string;
  detail: string;
  isTest?: boolean;
}

const TIMELINE_NODES: TimelineNode[] = [
  { dpt: 0,  label: "Transfer",         detail: "Day of transfer" },
  { dpt: 2,  label: "Implantation",     detail: "Typical implantation window" },
  { dpt: 5,  label: "hCG rising",       detail: "Hormone levels increasing" },
  { dpt: 10, label: "Test day",         detail: "Beta hCG blood test", isTest: true },
  { dpt: 14, label: "Early scan",       detail: "Viability confirmed" },
];

// ─── Fade-in wrapper ──────────────────────────────────────────────────────────

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
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
  const insight = getDptInsight(clampedDpt, transferType);
  const [aiQuestion, setAiQuestion] = useState("");

  // Progress along the 14-day post-transfer window
  const progressPct = Math.min((clampedDpt / 14) * 100, 100);

  // Days until test
  const testDate = addDays(transferDate, insight.testDay);
  const daysToTest = Math.max(differenceInDays(testDate, today), 0);

  return (
    <div>

      {/* ── S1: Primary result ────────────────────────────────────────── */}
      <section className="bg-parchment-dark py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-10 max-w-3xl">
          <FadeIn delay={0}>
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-8">
              Your timeline
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* DPT hero stat */}
            <FadeIn delay={80} className="md:col-span-2">
              <div className="bg-card border border-border/50 rounded-2xl px-8 py-9 shadow-card-brand">
                <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-3">
                  You are currently
                </p>
                <div className="flex items-end gap-3 mb-3">
                  <span className="font-serif text-6xl text-foreground leading-none">{clampedDpt}</span>
                  <span className="font-sans text-lg font-light text-muted-foreground pb-1.5">
                    {clampedDpt === 1 ? "day" : "days"} post transfer
                  </span>
                </div>
                <p className="font-sans text-sm font-light text-muted-foreground">
                  Transfer date: {format(transferDate, "d MMMM yyyy")}
                </p>
              </div>
            </FadeIn>

            {/* Stage */}
            <FadeIn delay={140}>
              <div className="bg-card border border-border/50 rounded-2xl px-7 py-8 shadow-card-brand h-full">
                <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-3">
                  Stage
                </p>
                <p className="font-serif text-xl text-foreground leading-snug mb-1">
                  {insight.stage}
                </p>
                <p className="font-sans text-sm font-light text-sage-muted">
                  {insight.stageDetail}
                </p>
              </div>
            </FadeIn>

            {/* Days to test */}
            <FadeIn delay={200}>
              <div className="bg-card border border-border/50 rounded-2xl px-7 py-8 shadow-card-brand h-full">
                <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-3">
                  {daysToTest > 0 ? "Test day in" : "Test window"}
                </p>
                {daysToTest > 0 ? (
                  <>
                    <p className="font-serif text-4xl text-foreground mb-1">{daysToTest}</p>
                    <p className="font-sans text-sm font-light text-muted-foreground">
                      {daysToTest === 1 ? "day" : "days"} · {format(testDate, "d MMMM")}
                    </p>
                  </>
                ) : (
                  <p className="font-serif text-xl text-foreground leading-snug">
                    You're in the test window
                  </p>
                )}
              </div>
            </FadeIn>
          </div>

          {/* Reassurance line */}
          <FadeIn delay={280}>
            <div className="bg-sage-bg/30 border border-sage-light/30 rounded-xl px-6 py-5">
              <p className="font-serif italic text-base text-foreground/70 leading-relaxed text-center">
                This stage can feel uncertain. Experiences can vary — both feeling symptoms and feeling nothing can be normal.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── S2: Timeline visual ───────────────────────────────────────── */}
      <section className="bg-parchment py-20 md:py-24">
        <div className="container mx-auto px-6 md:px-10 max-w-3xl">
          <FadeIn delay={0}>
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-6">
              Your IVF timeline
            </p>
          </FadeIn>

          <FadeIn delay={80}>
            <div className="bg-card border border-border/50 rounded-2xl p-8 md:p-10 shadow-card-brand">

              {/* Progress bar */}
              <div className="relative mb-8">
                <div className="w-full bg-parchment-dark rounded-full h-1.5">
                  <div
                    className="bg-sage rounded-full h-1.5 transition-all duration-1000"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
                {/* You are here marker */}
                <div
                  className="absolute -top-2 transition-all duration-1000"
                  style={{ left: `calc(${Math.max(progressPct, 2)}% - 10px)` }}
                >
                  <div className="w-5 h-5 rounded-full bg-terracotta border-2 border-card shadow-sm" />
                </div>
              </div>

              {/* Nodes */}
              <div className="space-y-4">
                {TIMELINE_NODES.map((node, i) => {
                  const isPast = clampedDpt > node.dpt;
                  const isCurrent = clampedDpt === node.dpt || (i < TIMELINE_NODES.length - 1 && clampedDpt > node.dpt && clampedDpt < TIMELINE_NODES[i + 1].dpt);
                  const nodeDate = addDays(transferDate, node.dpt);
                  return (
                    <div key={node.dpt} className={cn(
                      "flex items-center gap-4 py-2",
                      isCurrent && "opacity-100",
                      !isCurrent && isPast && "opacity-50",
                      !isCurrent && !isPast && "opacity-40"
                    )}>
                      <div className={cn(
                        "w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 text-xs font-serif",
                        isCurrent && "bg-terracotta border-terracotta text-terracotta-foreground",
                        isPast && !isCurrent && "bg-sage-bg/60 border-sage text-sage",
                        !isPast && !isCurrent && "bg-transparent border-border/50 text-muted-foreground"
                      )}>
                        {node.dpt}
                      </div>
                      <div className="flex-1">
                        <p className={cn(
                          "font-sans text-sm font-light leading-snug",
                          isCurrent ? "text-foreground font-medium" : "text-muted-foreground"
                        )}>
                          {node.label}
                          {isCurrent && <span className="ml-2 font-sans text-[10px] font-light tracking-widest uppercase text-terracotta">← you are here</span>}
                        </p>
                        <p className="font-sans text-xs font-light text-muted-foreground/70">{node.detail}</p>
                      </div>
                      <p className="font-sans text-xs font-light text-muted-foreground/60 shrink-0">
                        {format(nodeDate, "d MMM")}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── S3+S4: What's happening + What this means ─────────────────── */}
      <section className="bg-parchment-dark py-20 md:py-24">
        <div className="container mx-auto px-6 md:px-10 max-w-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* What's happening right now */}
            <FadeIn delay={0}>
              <div className="bg-card border border-border/50 rounded-2xl p-8 shadow-card-brand h-full">
                <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-4">
                  What's happening right now
                </p>
                <ul className="space-y-4">
                  {insight.whatHappening.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-2 w-1 h-1 rounded-full bg-sage-muted shrink-0" />
                      <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* What this means */}
            <FadeIn delay={100}>
              <div className="bg-card border border-border/50 rounded-2xl p-8 shadow-card-brand h-full flex flex-col">
                <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-4">
                  What this means
                </p>
                <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed flex-1">
                  {insight.whatThisMeans}
                </p>
                {/* Anxiety-reducing callout */}
                <div className="mt-6 bg-sage-bg/30 border border-sage-light/30 rounded-lg px-5 py-4">
                  <p className="font-serif italic text-sm text-foreground/70 leading-relaxed">
                    Symptoms — or lack of symptoms — are not a reliable indicator of outcome at this stage.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── S5: What to expect next ───────────────────────────────────── */}
      <section className="bg-parchment py-20 md:py-24">
        <div className="container mx-auto px-6 md:px-10 max-w-3xl">
          <FadeIn delay={0}>
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
              Looking ahead
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-snug mb-8">
              What to expect next
            </h2>
          </FadeIn>

          <div className="space-y-0">
            {insight.whatToExpect.map((item, i) => (
              <FadeIn key={i} delay={i * 70}>
                <div className={cn(
                  "flex items-start gap-5 py-6",
                  i < insight.whatToExpect.length - 1 && "border-b border-border/30"
                )}>
                  <div className="w-8 h-8 rounded-full bg-sage-bg/40 border border-sage-light/30 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="font-serif text-xs text-sage">{i + 1}</span>
                  </div>
                  <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed pt-1.5">{item}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── S6: Follow your journey ───────────────────────────────────── */}
      <section className="bg-parchment-dark py-24 md:py-28">
        <div className="container mx-auto px-6 md:px-10 max-w-2xl text-center">
          <FadeIn delay={0}>
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
              Your journey
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-5">
              Follow your IVF journey
            </h2>
            <p className="font-sans text-base font-light text-muted-foreground leading-relaxed max-w-md mx-auto mb-8">
              Get guidance tailored to your stage — what's happening, what's normal, and what to expect next.
            </p>
            <Link
              to="/ivf"
              className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-8 py-4 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
            >
              Start your journey
              <ArrowRight size={15} />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── S7: AI support ────────────────────────────────────────────── */}
      <section className="bg-sage-bg/40 py-24 md:py-28">
        <div className="container mx-auto px-6 md:px-10 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
            <FadeIn delay={0}>
              <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
                AI Support
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-6">
                Ask about this stage
              </h2>
              <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-6">
                Whatever's been on your mind — symptoms, the wait, what's normal — you can ask and get guidance tailored to where you are right now.
              </p>
              <div className="relative mb-5">
                <input
                  type="text"
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  placeholder="What's been on your mind?"
                  className="w-full bg-background border border-border/60 rounded-xl px-5 py-4 font-sans text-sm font-light text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-sage/50 transition-all"
                />
              </div>
              <button className="flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all">
                <MessageCircle size={15} />
                Ask now
              </button>
            </FadeIn>

            <FadeIn delay={120}>
              <div className="bg-card border border-border/50 rounded-2xl p-7 shadow-card-brand">
                <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-5">
                  Suggested questions
                </p>
                {[
                  `Is this normal ${clampedDpt} days after transfer?`,
                  "Should I be feeling something?",
                  "What happens next?",
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
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── S8: Journal companion ──────────────────────────────────── */}
      <JournalPromotion contextCopy="Capture your thoughts and reflections as you move through each IVF stage." />

      {/* ── S9: Pathways ──────────────────────────────────────────────── */}
      <section className="bg-parchment py-20 md:py-24">
        <div className="container mx-auto px-6 md:px-10 max-w-3xl">
          <FadeIn delay={0}>
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
              Explore your journey
            </p>
          </FadeIn>
          <div className="divide-y divide-border/50">
            {[
              { label: "After transfer guidance", sub: "What to expect in the days following transfer", href: "/ivf" },
              { label: "Early IVF pregnancy", sub: "What happens if your test is positive", href: "/ivf" },
              { label: "Common concerns at this stage", sub: "What's normal — and when to contact your clinic", href: "/ivf" },
            ].map((link, i) => (
              <FadeIn key={i} delay={i * 60}>
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
              </FadeIn>
            ))}
          </div>

          {/* S10: Trust */}
          <FadeIn delay={200}>
            <p className="mt-10 font-sans text-xs font-light text-muted-foreground flex items-center gap-2">
              <span className="text-sage">✔</span> Medically reviewed by Jenny Joines
            </p>
          </FadeIn>
        </div>
      </section>

    </div>
  );
};

export default IVFTimelineResult;
