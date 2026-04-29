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
    range: "Weeks 28-42",
    weeks: Array.from({ length: 15 }, (_, i) => i + 28),
    stageVar: "--stage-ivf",
    accentVar: "--stage-ivf-accent",
    stat: "15 weeks",
    statLabel: "until arrival",
  },
];

const WeekByWeek = () => {
  return (
    <section id="week-by-week" className="bg-parchment py-16 md:py-24">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-14">
          <p
            className="font-sans text-[11px] font-light tracking-[0.24em] uppercase mb-3"
            style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}
          >
            Your Trimester Pathway
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-[2rem] text-foreground mb-3 leading-tight">
            Your week-by-week <span className="italic font-normal">pregnancy map</span>
          </h2>
          <p className="font-sans text-sm font-light text-muted-foreground max-w-md mx-auto leading-relaxed">
            Select any week to explore what's happening, what's normal, and
            what to focus on.
          </p>
          <div
            aria-hidden="true"
            className="mx-auto mt-6 h-px w-16"
            style={{
              background:
                'linear-gradient(90deg, transparent, hsl(var(--stage-pregnancy-accent) / 0.5), transparent)',
            }}
          />
        </div>

        {/* Trimester groups */}
        <div className="space-y-6 sm:space-y-7">
          {trimesterGroups.map((group) => (
            <div
              key={group.label}
              className="relative rounded-[1.5rem] overflow-hidden border"
              style={{
                background: `linear-gradient(180deg, hsl(var(${group.stageVar}) / 0.45) 0%, hsl(var(${group.stageVar}) / 0.18) 70%, hsl(var(--parchment) / 0.6) 100%)`,
                borderColor: `hsl(var(${group.accentVar}) / 0.18)`,
                boxShadow:
                  '0 1px 0 hsl(var(--parchment) / 0.9) inset, 0 18px 50px -32px hsl(var(--stage-pregnancy-accent) / 0.28)',
              }}
            >
              {/* Accent top edge */}
              <div
                className="h-[3px]"
                style={{ background: `linear-gradient(90deg, hsl(var(${group.accentVar}) / 0.6), hsl(var(${group.accentVar}) / 0.1))` }}
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

                {/* Week grid — premium fruit cards */}
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 sm:gap-2.5">
                  {group.weeks.map((week) => (
                    <Link
                      key={week}
                      to={`/pregnancy/week/${week}`}
                      aria-label={`Week ${week}`}
                      className="group relative flex flex-col items-center justify-between aspect-square rounded-2xl
                        border transition-all duration-500 text-center px-1 py-2 sm:py-2.5
                        hover:-translate-y-0.5"
                      style={{
                        background:
                          'linear-gradient(180deg, hsl(var(--card)) 0%, hsl(var(--parchment) / 0.7) 100%)',
                        borderColor: earlyWeeks.includes(week)
                          ? `hsl(var(${group.accentVar}) / 0.4)`
                          : `hsl(var(${group.accentVar}) / 0.14)`,
                        boxShadow:
                          '0 1px 0 hsl(var(--parchment) / 0.9) inset, 0 6px 16px -10px hsl(var(--stage-pregnancy-accent) / 0.22)',
                      }}
                    >
                      {/* Soft circular wash behind fruit */}
                      <div
                        className="relative flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full transition-transform duration-300 group-hover:scale-105"
                        style={{
                          background: `radial-gradient(circle at 50% 45%, hsl(var(${group.stageVar}) / 0.85) 0%, hsl(var(${group.stageVar}) / 0.35) 70%, transparent 100%)`,
                        }}
                      >
                        <WeekIllustration
                          week={week}
                          className="w-7 h-7 sm:w-9 sm:h-9 drop-shadow-[0_1px_1px_rgba(0,0,0,0.06)]"
                        />
                      </div>

                      <span
                        className="mt-1 font-serif text-[10px] sm:text-[11px] leading-none tracking-wide"
                        style={{ color: `hsl(var(${group.accentVar}) / 0.85)` }}
                      >
                        Wk {week}
                      </span>

                      {/* Early-weeks dot */}
                      {earlyWeeks.includes(week) && (
                        <span
                          className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: `hsl(var(${group.accentVar}) / 0.6)` }}
                        />
                      )}

                      {/* Subtle botanical leaf accent on hover */}
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -bottom-0.5 -left-0.5 w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                        style={{
                          background: `radial-gradient(circle at 30% 70%, hsl(var(${group.accentVar}) / 0.35), transparent 70%)`,
                        }}
                      />
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
