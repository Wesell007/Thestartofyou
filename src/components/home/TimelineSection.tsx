import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const currentWeek = 12;

const milestones = [
  { week: 1, label: "Week 1" },
  { week: 6, label: "" },
  { week: 10, label: "Week 10" },
  { week: 12, label: "", current: true },
  { week: 16, label: "" },
  { week: 20, label: "Week 20" },
  { week: 24, label: "" },
  { week: 28, label: "" },
  { week: 30, label: "Week 30" },
  { week: 34, label: "" },
  { week: 37, label: "" },
  { week: 40, label: "Week 40" },
];

const trimesterBoundaries = [
  { label: "First Trimester", sub: "Weeks 1–13", start: 1, end: 13, color: "bg-sage-bg/60", accent: "border-sage/25" },
  { label: "Second Trimester", sub: "Weeks 14–26", start: 14, end: 26, color: "bg-lavender-bg/60", accent: "border-lavender/25" },
  { label: "Third Trimester", sub: "Weeks 27–40", start: 27, end: 40, color: "bg-parchment-deeper/60", accent: "border-terracotta/15" },
];

const getWeekPercent = (week: number) => ((week - 1) / 39) * 100;

const TimelineSection = () => {
  return (
    <section className="bg-parchment section-spacing">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div className="text-center mb-8 sm:mb-10 md:mb-14">
          <div className="editorial-rule mb-5 md:mb-6" />
          <p className="stage-label mb-3">40-Week Journey</p>
          <h2 className="font-serif text-[1.75rem] sm:text-3xl md:text-[2.75rem] text-foreground mb-3 md:mb-4">
            Your complete pregnancy timeline
          </h2>
          <p className="font-sans text-[15px] sm:text-base font-light text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Every pregnancy follows a structured 40-week journey. See where you are, what is ahead, and the milestones that mark each stage.
          </p>
        </div>

        {/* Trimester cards */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 md:mb-8">
          {trimesterBoundaries.map((t) => (
            <div key={t.label} className={`${t.color} rounded-xl sm:rounded-2xl py-3.5 sm:py-4 px-3 sm:px-5 text-center border ${t.accent}`}>
              <p className="font-sans text-[10px] sm:text-[11px] font-medium tracking-[0.12em] uppercase text-foreground/65 mb-0.5">
                {t.label}
              </p>
              <p className="font-sans text-[10px] sm:text-xs font-light text-muted-foreground/50">
                {t.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Timeline track */}
        <div className="relative h-20 sm:h-24 select-none overflow-hidden px-3 sm:px-0">
          {/* Trimester background zones */}
          <div className="absolute inset-y-0 left-0 right-0 flex rounded-xl overflow-hidden" style={{ top: "38%", bottom: "22%" }}>
            <div className="flex-1 bg-sage-bg/40" />
            <div className="flex-1 bg-lavender-bg/40" />
            <div className="flex-1 bg-parchment-deeper/40" />
          </div>

          {/* Connector line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-muted-foreground/12" style={{ transform: "translateY(-50%)" }} />

          {/* Progress fill */}
          <div
            className="absolute top-1/2 left-0 h-0.5 rounded-full bg-sage"
            style={{ transform: "translateY(-50%)", width: `${getWeekPercent(currentWeek)}%` }}
          />

          {/* Milestone dots */}
          {milestones.map((m) => (
            <div
              key={m.week}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
              style={{ left: `${getWeekPercent(m.week)}%` }}
            >
              {m.current ? (
                <>
                  <div className="absolute -top-8 sm:-top-9 left-1/2 -translate-x-1/2 bg-terracotta text-terracotta-foreground font-sans text-[10px] sm:text-[11px] font-medium px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-pill whitespace-nowrap shadow-cta">
                    Week {currentWeek}
                  </div>
                  <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border-2 border-terracotta bg-terracotta-foreground shadow-cta animate-pulse" />
                </>
              ) : (
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full border border-foreground/15 bg-card hover:bg-sage/20 transition-colors" />
              )}
              {m.label && (
                <p className="absolute top-5 sm:top-6 left-1/2 -translate-x-1/2 font-sans text-[9px] sm:text-[10px] font-light text-muted-foreground/50 whitespace-nowrap">
                  {m.label}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* CTA below timeline */}
        <div className="text-center mt-8 md:mt-10">
          <Link
            to="/pregnancy"
            className="inline-flex items-center gap-2.5 bg-parchment-dark border border-border/40 rounded-pill px-7 py-3.5 font-sans text-sm font-medium text-foreground hover:bg-parchment-deeper hover:shadow-soft transition-all duration-300"
          >
            Explore the full pregnancy journey
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
