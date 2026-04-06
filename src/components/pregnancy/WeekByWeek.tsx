import { Link } from "react-router-dom";
import WeekIllustration from "@/components/week/WeekIllustration";

const earlyWeeks = [1, 2, 3];

const trimesterGroups = [
  {
    label: "First Trimester",
    sub: "Foundation & Early Development",
    range: "Weeks 1-12",
    weeks: Array.from({ length: 12 }, (_, i) => i + 1),
    stageVar: "--stage-ttc",
    accentVar: "--stage-ttc-accent",
    stat: "12 weeks",
    statLabel: "of invisible change",
  },
  {
    label: "Second Trimester",
    sub: "Growth & Increasing Awareness",
    range: "Weeks 13-27",
    weeks: Array.from({ length: 15 }, (_, i) => i + 13),
    stageVar: "--stage-pregnancy",
    accentVar: "--stage-pregnancy-accent",
    stat: "15 weeks",
    statLabel: "of visible growth",
  },
  {
    label: "Third Trimester",
    sub: "Preparation & Arrival",
    range: "Weeks 28-40",
    weeks: Array.from({ length: 13 }, (_, i) => i + 28),
    stageVar: "--stage-ivf",
    accentVar: "--stage-ivf-accent",
    stat: "13 weeks",
    statLabel: "until arrival",
  },
];

const WeekByWeek = () => {
  return (
    <section id="week-by-week" className="bg-parchment-dark py-20 md:py-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-14">
          <p
            className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
            style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}
          >
            Week by Week
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-3 leading-tight">
            Follow your journey week by week
          </h2>
          <p className="font-sans text-[15px] font-light text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Every week brings something new. Select any week to explore what's
            happening, what's normal, and what to focus on.
          </p>
        </div>

        {/* Trimester groups */}
        <div className="space-y-5 sm:space-y-6">
          {trimesterGroups.map((group) => (
            <div
              key={group.label}
              className="rounded-2xl overflow-hidden"
              style={{ backgroundColor: `hsl(var(${group.stageVar}) / 0.3)` }}
            >
              {/* Accent top edge */}
              <div
                className="h-0.5"
                style={{ backgroundColor: `hsl(var(${group.accentVar}) / 0.35)` }}
              />

              <div className="p-5 sm:p-7 md:p-8">
                {/* Group header */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-5 sm:mb-6">
                  <div>
                    <p
                      className="font-sans text-[11px] font-light tracking-[0.15em] uppercase mb-1"
                      style={{ color: `hsl(var(${group.accentVar}))` }}
                    >
                      {group.range}
                    </p>
                    <h3 className="font-serif text-xl sm:text-2xl text-foreground">
                      {group.label}
                    </h3>
                    <p className="font-serif italic text-sm text-muted-foreground/70 mt-0.5">
                      {group.sub}
                    </p>
                  </div>
                  {/* Stat chip */}
                  <div
                    className="hidden sm:flex items-baseline gap-2 rounded-lg px-4 py-2"
                    style={{ backgroundColor: `hsl(var(${group.stageVar}) / 0.5)` }}
                  >
                    <span
                      className="font-serif text-lg"
                      style={{ color: `hsl(var(${group.accentVar}))` }}
                    >
                      {group.stat}
                    </span>
                    <span className="font-sans text-[10px] font-light text-muted-foreground">
                      {group.statLabel}
                    </span>
                  </div>
                </div>

                {/* Week grid */}
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-1.5 sm:gap-2">
                  {group.weeks.map((week) => (
                    <Link
                      key={week}
                      to={`/pregnancy/week/${week}`}
                      className="relative flex flex-col items-center justify-center aspect-square rounded-xl
                        border bg-card/85 transition-all text-center gap-0.5 p-1
                        hover:bg-card hover:shadow-card-brand hover:border-transparent hover:scale-[1.04]"
                      style={{
                        borderColor: earlyWeeks.includes(week)
                          ? `hsl(var(${group.accentVar}) / 0.3)`
                          : 'hsl(var(--border) / 0.35)',
                      }}
                    >
                      <WeekIllustration week={week} className="w-6 h-6 sm:w-7 sm:h-7" />
                      <span className="font-sans text-[9px] sm:text-[10px] font-light text-muted-foreground leading-none">
                        Wk {week}
                      </span>
                      {earlyWeeks.includes(week) && (
                        <span
                          className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full"
                          style={{ backgroundColor: `hsl(var(${group.accentVar}) / 0.5)` }}
                        />
                      )}
                    </Link>
                  ))}
                </div>

                {/* Early weeks note */}
                {group.label === "First Trimester" && (
                  <p
                    className="mt-4 font-sans text-xs font-light flex items-center gap-2"
                    style={{ color: `hsl(var(${group.accentVar}) / 0.8)` }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full inline-block"
                      style={{ backgroundColor: `hsl(var(${group.accentVar}) / 0.4)` }}
                    />
                    Weeks 1-3 mark the very beginning, before many people know
                    they're pregnant.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeekByWeek;
