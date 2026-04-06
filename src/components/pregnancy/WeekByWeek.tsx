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
  },
  {
    label: "Second Trimester",
    sub: "Growth & Increasing Awareness",
    range: "Weeks 13-27",
    weeks: Array.from({ length: 15 }, (_, i) => i + 13),
    stageVar: "--stage-pregnancy",
    accentVar: "--stage-pregnancy-accent",
  },
  {
    label: "Third Trimester",
    sub: "Preparation & Arrival",
    range: "Weeks 28-40",
    weeks: Array.from({ length: 13 }, (_, i) => i + 28),
    stageVar: "--stage-ivf",
    accentVar: "--stage-ivf-accent",
  },
];

const WeekByWeek = () => {
  return (
    <section id="week-by-week" className="bg-parchment-dark py-20 md:py-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-14">
          <p
            className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
            style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}
          >
            Week by Week
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-4 leading-tight">
            Follow your journey week by week
          </h2>
          <p className="font-sans text-[15px] font-light text-muted-foreground max-w-lg mx-auto leading-relaxed">
            From the very first week through to week 40, each week is a step
            forward.
          </p>
        </div>

        {/* Trimester groups */}
        <div className="space-y-6 sm:space-y-8">
          {trimesterGroups.map((group) => (
            <div
              key={group.label}
              className="rounded-2xl p-5 sm:p-7 md:p-9"
              style={{ backgroundColor: `hsl(var(${group.stageVar}) / 0.35)` }}
            >
              {/* Group header */}
              <div className="flex flex-col sm:flex-row sm:items-end gap-2 mb-6 sm:mb-7">
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
                </div>
                <p className="font-serif italic text-sm text-muted-foreground sm:ml-4 sm:mb-0.5">
                  {group.sub}
                </p>
              </div>

              {/* Week grid */}
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                {group.weeks.map((week) => (
                  <Link
                    key={week}
                    to={`/pregnancy/week/${week}`}
                    className="relative flex flex-col items-center justify-center aspect-square rounded-xl
                      border bg-card/80 transition-all text-center gap-0.5 p-1
                      hover:bg-card hover:shadow-card-brand"
                    style={{
                      borderColor: earlyWeeks.includes(week)
                        ? `hsl(var(${group.accentVar}) / 0.35)`
                        : 'hsl(var(--border) / 0.4)',
                    }}
                  >
                    <WeekIllustration week={week} className="w-7 h-7 sm:w-8 sm:h-8" />
                    <span className="font-sans text-[10px] font-light text-muted-foreground leading-none">
                      Week {week}
                    </span>
                    {earlyWeeks.includes(week) && (
                      <span
                        className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full opacity-60"
                        style={{ backgroundColor: `hsl(var(${group.accentVar}))` }}
                      />
                    )}
                  </Link>
                ))}
              </div>

              {/* Early weeks note */}
              {group.label === "First Trimester" && (
                <p className="mt-5 font-sans text-xs font-light flex items-center gap-2" style={{ color: `hsl(var(${group.accentVar}))` }}>
                  <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: `hsl(var(${group.accentVar}) / 0.5)` }} />
                  Weeks 1-3 mark the very beginning, before many people know
                  they're pregnant.
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeekByWeek;
