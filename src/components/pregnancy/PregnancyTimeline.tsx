import { Link } from "react-router-dom";

const trimesters = [
  {
    label: "First Trimester",
    range: "Weeks 1–12",
    sub: "Foundation & Early Development",
    href: "/pregnancy/first-trimester",
    start: 1,
    end: 12,
    color: "bg-sage-bg",
  },
  {
    label: "Second Trimester",
    range: "Weeks 13–27",
    sub: "Growth & Increasing Awareness",
    href: "/pregnancy/second-trimester",
    start: 13,
    end: 27,
    color: "bg-parchment-dark",
  },
  {
    label: "Third Trimester",
    range: "Weeks 28–40",
    sub: "Preparation & Arrival",
    href: "/pregnancy/third-trimester",
    start: 28,
    end: 40,
    color: "bg-lavender-section",
  },
];

const milestones = [
  { week: 1 },
  { week: 6 },
  { week: 12 },
  { week: 16 },
  { week: 20 },
  { week: 27 },
  { week: 28 },
  { week: 32 },
  { week: 36 },
  { week: 40 },
];

const getWeekPercent = (week: number) => ((week - 1) / 39) * 100;

const PregnancyTimeline = () => {
  return (
    <section className="bg-parchment py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
            The Full Journey
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-5 leading-tight">
            Your pregnancy timeline
          </h2>
          <p className="font-sans text-base font-light text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Forty weeks, three trimesters, one continuous journey.
          </p>
        </div>

        {/* Trimester labels */}
        <div className="grid grid-cols-3 gap-1 mb-4 text-center">
          {trimesters.map((t) => (
            <p
              key={t.label}
              className="font-sans text-xs font-light tracking-[0.15em] text-muted-foreground uppercase"
            >
              {t.label}
            </p>
          ))}
        </div>

        {/* Timeline track */}
        <div className="relative h-32 select-none">
          {/* Trimester background zones */}
          <div
            className="absolute inset-y-0 left-0 right-0 flex rounded-2xl overflow-hidden"
            style={{ top: "38%", bottom: "20%" }}
          >
            {trimesters.map((t) => (
              <div
                key={t.label}
                className={`${t.color}`}
                style={{
                  width: `${((t.end - t.start + 1) / 40) * 100}%`,
                }}
              />
            ))}
          </div>

          {/* Connector line */}
          <div
            className="absolute top-1/2 left-0 right-0 h-px bg-muted-foreground/25"
            style={{ transform: "translateY(-50%)" }}
          />

          {/* Milestone dots */}
          {milestones.map((m) => (
            <div
              key={m.week}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
              style={{ left: `${getWeekPercent(m.week)}%` }}
            >
              <div className="w-3 h-3 rounded-full border border-foreground/30 bg-card" />
              {[1, 12, 27, 40].includes(m.week) && (
                <p className="absolute top-6 left-1/2 -translate-x-1/2 font-sans text-[11px] font-light text-muted-foreground whitespace-nowrap">
                  Wk {m.week}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Trimester sub labels */}
        <div className="grid grid-cols-3 gap-1 mt-6 text-center">
          {trimesters.map((t) => (
            <p
              key={t.sub}
              className="font-serif italic text-sm text-muted-foreground"
            >
              {t.sub}
            </p>
          ))}
        </div>

        {/* Trimester cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-14">
          {trimesters.map((t, i) => (
            <div
              key={t.label}
              className="bg-card border border-border/50 rounded-lg p-7 shadow-card-brand flex flex-col gap-3"
            >
              <span className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-serif text-xl text-foreground">{t.label}</h3>
              <p className="font-sans text-xs font-light text-muted-foreground tracking-wide">
                {t.range}
              </p>
              <p className="font-serif italic text-base text-foreground/70 leading-snug mt-1">
                {t.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PregnancyTimeline;
