import { Link } from "react-router-dom";
import trimesterFirstImg from "@/assets/trimester-first.jpg";
import trimesterSecondImg from "@/assets/trimester-second.jpg";
import trimesterThirdImg from "@/assets/trimester-third.jpg";

const trimesters = [
  {
    label: "First Trimester",
    range: "Weeks 1-12",
    sub: "Foundation & Early Development",
    href: "/pregnancy/first-trimester",
    start: 1,
    end: 12,
    image: trimesterFirstImg,
    stageVar: "--stage-ttc",       // sage-ish green for earliest phase
    accentVar: "--stage-ttc-accent",
  },
  {
    label: "Second Trimester",
    range: "Weeks 13-27",
    sub: "Growth & Increasing Awareness",
    href: "/pregnancy/second-trimester",
    start: 13,
    end: 27,
    image: trimesterSecondImg,
    stageVar: "--stage-pregnancy",
    accentVar: "--stage-pregnancy-accent",
  },
  {
    label: "Third Trimester",
    range: "Weeks 28-40",
    sub: "Preparation & Arrival",
    href: "/pregnancy/third-trimester",
    start: 28,
    end: 40,
    image: trimesterThirdImg,
    stageVar: "--stage-ivf",       // lavender for later phase
    accentVar: "--stage-ivf-accent",
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
    <section className="bg-parchment py-20 md:py-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-14">
          <p
            className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
            style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}
          >
            The Full Journey
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-4 leading-tight">
            Your pregnancy timeline
          </h2>
          <p className="font-sans text-[15px] font-light text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Forty weeks, three trimesters, one continuous journey.
          </p>
        </div>

        {/* Trimester labels */}
        <div className="hidden sm:grid grid-cols-3 gap-1 mb-4 text-center">
          {trimesters.map((t) => (
            <p
              key={t.label}
              className="font-sans text-xs font-light tracking-[0.15em] uppercase"
              style={{ color: `hsl(var(${t.accentVar}) / 0.7)` }}
            >
              {t.label}
            </p>
          ))}
        </div>

        {/* Timeline track */}
        <div className="relative h-28 sm:h-32 select-none hidden sm:block">
          {/* Trimester background zones */}
          <div
            className="absolute inset-y-0 left-0 right-0 flex rounded-2xl overflow-hidden"
            style={{ top: "38%", bottom: "20%" }}
          >
            {trimesters.map((t) => (
              <div
                key={t.label}
                style={{
                  width: `${((t.end - t.start + 1) / 40) * 100}%`,
                  backgroundColor: `hsl(var(${t.stageVar}) / 0.6)`,
                }}
              />
            ))}
          </div>

          {/* Connector line */}
          <div
            className="absolute top-1/2 left-0 right-0 h-px bg-muted-foreground/20"
            style={{ transform: "translateY(-50%)" }}
          />

          {/* Milestone dots */}
          {milestones.map((m) => (
            <div
              key={m.week}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
              style={{ left: `${getWeekPercent(m.week)}%` }}
            >
              <div className="w-2.5 h-2.5 rounded-full border border-foreground/25 bg-card" />
              {[1, 12, 27, 40].includes(m.week) && (
                <p className="absolute top-5 left-1/2 -translate-x-1/2 font-sans text-[10px] font-light text-muted-foreground whitespace-nowrap">
                  Wk {m.week}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Trimester sub labels */}
        <div className="hidden sm:grid grid-cols-3 gap-1 mt-5 text-center">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mt-10 sm:mt-14">
          {trimesters.map((t, i) => (
            <Link
              key={t.label}
              to={t.href}
              className="group bg-card border border-border/50 rounded-2xl overflow-hidden shadow-card-brand flex flex-col hover:shadow-soft transition-all duration-300"
              style={{ ['--card-accent' as string]: `hsl(var(${t.accentVar}))` }}
            >
              {/* Accent bar */}
              <div
                className="h-1"
                style={{ backgroundColor: `hsl(var(${t.accentVar}) / 0.4)` }}
              />
              <div className="h-36 sm:h-40 overflow-hidden">
                <img
                  src={t.image}
                  alt={t.label}
                  loading="lazy"
                  width={640}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 sm:p-7 flex flex-col gap-2.5 flex-1">
                <span
                  className="font-sans text-[11px] font-light tracking-[0.15em] uppercase"
                  style={{ color: `hsl(var(${t.accentVar}))` }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif text-xl text-foreground group-hover:text-foreground/80 transition-colors">
                  {t.label}
                </h3>
                <p className="font-sans text-xs font-light text-muted-foreground tracking-wide">
                  {t.range}
                </p>
                <p className="font-serif italic text-sm text-foreground/65 leading-snug mt-1">
                  {t.sub}
                </p>
                <span
                  className="mt-auto pt-3 font-sans text-xs font-light opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: `hsl(var(${t.accentVar}))` }}
                >
                  Explore this stage →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PregnancyTimeline;
