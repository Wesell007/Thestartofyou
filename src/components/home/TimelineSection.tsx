const TimelineSection = () => {
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
    { label: "FIRST TRIMESTER", sub: "FOUNDATION & FORMATION", start: 1, end: 13 },
    { label: "SECOND TRIMESTER", sub: "GROWTH & AWARENESS", start: 14, end: 26 },
    { label: "THIRD TRIMESTER", sub: "PREPARATION & ARRIVAL", start: 27, end: 40 },
  ];

  const getWeekPercent = (week: number) => ((week - 1) / 39) * 100;

  return (
    <section className="bg-parchment section-spacing">
      <div className="container mx-auto px-6 md:px-10 max-w-5xl">
        <div className="text-center mb-20">
          <div className="editorial-rule mb-8" />
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-7">
            Your Complete Pregnancy Timeline
          </h2>
          <p className="font-sans text-base font-light text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Every pregnancy follows a structured 40-week journey. See where you are, what's coming next, and the key milestones that mark each stage.
          </p>
        </div>

        {/* Trimester labels */}
        <div className="grid grid-cols-3 gap-1 mb-6 text-center">
          {trimesterBoundaries.map((t) => (
            <p key={t.label} className="font-sans text-[10px] font-light tracking-[0.2em] text-muted-foreground/70 uppercase">
              {t.label}
            </p>
          ))}
        </div>

        {/* Timeline track */}
        <div className="relative h-32 select-none">
          {/* Trimester background zones */}
          <div className="absolute inset-y-0 left-0 right-0 flex rounded-2xl overflow-hidden" style={{ top: "40%", bottom: "20%" }}>
            <div className="flex-1 bg-sage-bg/50" />
            <div className="flex-1 bg-parchment-dark" />
            <div className="flex-1 bg-parchment-deeper/60" />
          </div>

          {/* Connector line */}
          <div
            className="absolute top-1/2 left-0 right-0 h-px bg-muted-foreground/15"
            style={{ transform: "translateY(-50%)" }}
          />

          {/* Progress fill */}
          <div
            className="absolute top-1/2 left-0 h-px bg-sage"
            style={{
              transform: "translateY(-50%)",
              width: `${getWeekPercent(currentWeek)}%`,
            }}
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
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-terracotta text-terracotta-foreground font-sans text-[11px] font-medium px-3.5 py-1.5 rounded-pill whitespace-nowrap shadow-cta">
                    You are here — Week {currentWeek}
                  </div>
                  <div className="w-4 h-4 rounded-full border-2 border-terracotta bg-terracotta-foreground shadow-cta" />
                </>
              ) : (
                <div className="w-2.5 h-2.5 rounded-full border border-foreground/20 bg-card" />
              )}
              {m.label && (
                <p className="absolute top-7 left-1/2 -translate-x-1/2 font-sans text-[10px] font-light text-muted-foreground/60 whitespace-nowrap">
                  {m.label}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Trimester sub labels */}
        <div className="grid grid-cols-3 gap-1 mt-8 text-center">
          {trimesterBoundaries.map((t) => (
            <p key={t.sub} className="font-serif italic text-sm text-muted-foreground/70">
              {t.sub}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
