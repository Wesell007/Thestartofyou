import { format, eachDayOfInterval, isSameDay, isWithinInterval, addDays } from "date-fns";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface OvulationResultProps {
  lmp: Date;
  cycleLength: number;
  ovulationDay: Date;
  fertileStart: Date;
  fertileEnd: Date;
  testDay: Date;
}

const OvulationResult = ({ lmp, cycleLength, ovulationDay, fertileStart, fertileEnd, testDay }: OvulationResultProps) => {
  // Build a visual calendar spanning lmp to testDay+2
  const periodEnd = addDays(lmp, 4); // ~5 days of period
  const calendarDays = eachDayOfInterval({ start: lmp, end: addDays(testDay, 2) });

  // Group by week rows for visual
  const weeks: Date[][] = [];
  let currentWeek: Date[] = [];
  calendarDays.forEach((day, i) => {
    currentWeek.push(day);
    if (currentWeek.length === 7 || i === calendarDays.length - 1) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  const getDayType = (day: Date): string => {
    if (isWithinInterval(day, { start: lmp, end: periodEnd })) return "period";
    if (isSameDay(day, ovulationDay)) return "ovulation";
    if (isWithinInterval(day, { start: fertileStart, end: fertileEnd })) return "fertile";
    if (isSameDay(day, testDay)) return "test";
    return "default";
  };

  const suggestedPrompts = [
    "Am I ovulating yet?",
    "When should I test?",
    "Am I overthinking this?",
  ];

  const pathways = [
    { label: "Understanding ovulation", to: "/trying-to-conceive/understanding-your-cycle" },
    { label: "Waiting and testing", to: "/trying-to-conceive/waiting-and-testing" },
    { label: "Timing and tracking", to: "/trying-to-conceive/timing-and-tracking" },
  ];

  return (
    <div>
      {/* ── Primary result ──────────────────────────────────────────── */}
      <section className="bg-parchment-dark pt-28 pb-20 md:pt-36 md:pb-24">
        <div className="container mx-auto px-6 md:px-10 max-w-3xl">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-8">
            Your fertility dates
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            {/* Fertile window */}
            <div className="bg-card border border-border/50 rounded-2xl px-7 py-8 shadow-card-brand">
              <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-3">
                Fertile window
              </p>
              <p className="font-serif text-xl text-foreground leading-snug mb-1">
                {format(fertileStart, "d MMM")} - {format(fertileEnd, "d MMM")}
              </p>
              <p className="font-sans text-xs font-light text-muted-foreground">
                6 days
              </p>
            </div>

            {/* Ovulation day */}
            <div className="bg-card border border-border/50 rounded-2xl px-7 py-8 shadow-card-brand">
              <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-3">
                Likely ovulation
              </p>
              <p className="font-serif text-xl text-foreground leading-snug mb-1">
                {format(ovulationDay, "d MMMM")}
              </p>
              <p className="font-sans text-xs font-light text-muted-foreground">
                Day {cycleLength - 14} of your cycle
              </p>
            </div>

            {/* Test day */}
            <div className="bg-card border border-border/50 rounded-2xl px-7 py-8 shadow-card-brand">
              <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-3">
                Testing window
              </p>
              <p className="font-serif text-xl text-foreground leading-snug mb-1">
                {format(testDay, "d MMMM")}
              </p>
              <p className="font-sans text-xs font-light text-muted-foreground">
                Earliest reliable test
              </p>
            </div>
          </div>

          <div className="bg-sage-bg/30 border border-sage-light/30 rounded-xl px-6 py-5">
            <p className="font-serif italic text-base text-foreground/70 leading-relaxed text-center">
              These dates are estimates based on a {cycleLength}-day cycle. Ovulation can vary from month to month.
            </p>
          </div>
        </div>
      </section>

      {/* ── Visual calendar ─────────────────────────────────────────── */}
      <section className="bg-parchment py-20 md:py-24">
        <div className="container mx-auto px-6 md:px-10 max-w-3xl">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-6">
            Your cycle calendar
          </p>

          <div className="bg-card border border-border/50 rounded-2xl p-6 md:p-8 shadow-card-brand mb-6">
            {/* Legend */}
            <div className="flex flex-wrap gap-5 mb-6">
              {[
                { color: "bg-rose-100", label: "Period" },
                { color: "bg-sage-bg", label: "Fertile window" },
                { color: "bg-terracotta", label: "Ovulation" },
                { color: "bg-lavender-bg", label: "Test day" },
              ].map(({ color, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <span className={cn("w-3 h-3 rounded-full", color)} />
                  <span className="font-sans text-xs font-light text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="space-y-1.5">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex gap-1.5">
                  {week.map((day) => {
                    const type = getDayType(day);
                    return (
                      <div
                        key={day.toISOString()}
                        className={cn(
                          "flex-1 aspect-square rounded-lg flex flex-col items-center justify-center text-center min-w-0",
                          type === "period" && "bg-rose-100 border border-rose-200/60",
                          type === "fertile" && "bg-sage-bg/60 border border-sage-light/40",
                          type === "ovulation" && "bg-terracotta text-terracotta-foreground",
                          type === "test" && "bg-lavender-bg border border-lavender/30",
                          type === "default" && "bg-parchment border border-border/30"
                        )}
                      >
                        <span className={cn(
                          "font-sans text-xs font-light",
                          type === "ovulation" ? "text-terracotta-foreground" : "text-foreground/70"
                        )}>
                          {format(day, "d")}
                        </span>
                        <span className={cn(
                          "font-sans text-[9px] font-light leading-tight",
                          type === "ovulation" ? "text-terracotta-foreground/80" : "text-muted-foreground/60"
                        )}>
                          {format(day, "MMM")}
                        </span>
                      </div>
                    );
                  })}
                  {/* Pad last row */}
                  {week.length < 7 && Array.from({ length: 7 - week.length }).map((_, pi) => (
                    <div key={`pad-${pi}`} className="flex-1" />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── What this means ─────────────────────────────────────────── */}
      <section className="bg-parchment-dark py-20 md:py-24">
        <div className="container mx-auto px-6 md:px-10 max-w-3xl">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
            Understanding your results
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-snug mb-8">
            What this means
          </h2>
          <div className="space-y-0">
            {[
              "These are the days you're most likely to conceive",
              "Focus on the fertile window, not a single perfect day",
              "This is an estimate, not a guarantee, cycles can vary",
            ].map((item, i) => (
              <div key={i} className={cn(
                "flex items-start gap-5 py-6",
                i < 2 && "border-b border-border/30"
              )}>
                <div className="w-8 h-8 rounded-full bg-sage-bg/40 border border-sage-light/30 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="font-serif text-xs text-sage">{i + 1}</span>
                </div>
                <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What to focus on ────────────────────────────────────────── */}
      <section className="bg-parchment py-20 md:py-24">
        <div className="container mx-auto px-6 md:px-10 max-w-3xl">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
            Right now
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-snug mb-8">
            What to focus on
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { title: "Focus on your fertile window", desc: "The days before ovulation are your most fertile, not just ovulation day itself." },
              { title: "Keep timing simple", desc: "Every other day during your fertile window is usually enough." },
              { title: "Avoid overtracking every sign", desc: "Monitoring can be helpful, but obsessing over every symptom adds unnecessary stress." },
              { title: "Consistency matters more than perfection", desc: "There is no single perfect moment, a calm, steady approach works best." },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border/50 rounded-2xl p-7 shadow-card-brand">
                <p className="font-sans text-sm font-medium text-foreground mb-2">{item.title}</p>
                <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── When to test ────────────────────────────────────────────── */}
      <section className="bg-parchment-dark py-20 md:py-24">
        <div className="container mx-auto px-6 md:px-10 max-w-3xl">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
            Testing
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-snug mb-6">
            When to test
          </h2>
          <div className="bg-card border border-border/50 rounded-2xl p-8 shadow-card-brand">
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-4">
              For the most reliable result, wait until at least <strong className="font-medium text-foreground">{format(testDay, "d MMMM")}</strong>, around 15 days after ovulation.
            </p>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-4">
              Testing too early can give a false negative, even if conception has occurred. The pregnancy hormone (hCG) needs time to build to detectable levels.
            </p>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
              A first morning test tends to be most accurate. If the result is negative but your period doesn't arrive, test again in a few days.
            </p>
          </div>
        </div>
      </section>

      {/* ── Your next step ──────────────────────────────────────────── */}
      <section className="bg-parchment py-20 md:py-24">
        <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
            Your next step
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-snug mb-4">
            Continue understanding your journey
          </h2>
          <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-8 max-w-lg mx-auto">
            Your fertile window is just one piece. Explore the full TTC journey for guidance on timing, tracking, and what to expect.
          </p>
          <Link
            to="/trying-to-conceive"
            className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-8 py-4 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
          >
            <ArrowRight size={15} />
            Explore your TTC journey
          </Link>
        </div>
      </section>

      {/* ── AI support ──────────────────────────────────────────────── */}
      <section className="bg-parchment-dark py-20 md:py-24">
        <div className="container mx-auto px-6 md:px-10 max-w-3xl">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
            AI support
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-snug mb-4">
            Ask anything about your cycle
          </h2>
          <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-8">
            Ask anything, whenever you need.
          </p>

          <div className="space-y-3 mb-6">
            {suggestedPrompts.map((prompt, i) => (
              <button
                key={i}
                className="group flex items-center gap-3 w-full text-left py-4 px-5 rounded-xl border border-border/40 bg-card/60 hover:border-sage/40 hover:bg-card shadow-card-brand transition-all"
              >
                <MessageCircle size={13} className="text-sage shrink-0" />
                <span className="font-sans text-sm font-light text-foreground/80 group-hover:text-foreground transition-colors leading-relaxed">
                  {prompt}
                </span>
              </button>
            ))}
          </div>

          <button className="flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all">
            <ArrowRight size={15} />
            Ask now
          </button>
        </div>
      </section>

      {/* ── Pathways ────────────────────────────────────────────────── */}
      <section className="bg-parchment py-20 md:py-24">
        <div className="container mx-auto px-6 md:px-10 max-w-3xl">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
            Continue your journey
          </p>
          <div className="space-y-3">
            {pathways.map((p, i) => (
              <Link
                key={i}
                to={p.to}
                className="group flex items-center justify-between py-5 px-6 rounded-xl border border-border/40 bg-card/60 hover:border-sage/40 hover:bg-card shadow-card-brand transition-all"
              >
                <span className="font-sans text-sm font-light text-foreground/80 group-hover:text-foreground transition-colors">
                  {p.label}
                </span>
                <ArrowRight size={14} className="text-sage-muted group-hover:text-sage transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OvulationResult;
