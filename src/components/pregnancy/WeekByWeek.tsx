import { Link } from "react-router-dom";

const earlyWeeks = [1, 2, 3];

const trimesterGroups = [
  {
    label: "First Trimester",
    sub: "Foundation & Early Development",
    range: "Weeks 1–12",
    weeks: Array.from({ length: 12 }, (_, i) => i + 1),
    bg: "bg-sage-bg/40",
  },
  {
    label: "Second Trimester",
    sub: "Growth & Increasing Awareness",
    range: "Weeks 13–27",
    weeks: Array.from({ length: 15 }, (_, i) => i + 13),
    bg: "bg-parchment-dark",
  },
  {
    label: "Third Trimester",
    sub: "Preparation & Arrival",
    range: "Weeks 28–40",
    weeks: Array.from({ length: 13 }, (_, i) => i + 28),
    bg: "bg-lavender-section",
  },
];

const WeekByWeek = () => {
  return (
    <section id="week-by-week" className="bg-parchment-dark py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
            Week by Week
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-5 leading-tight">
            Follow your journey week by week
          </h2>
          <p className="font-sans text-base font-light text-muted-foreground max-w-xl mx-auto leading-relaxed">
            From the very first week through to week 40 — each week is a step
            forward.
          </p>
        </div>

        {/* Trimester groups */}
        <div className="space-y-10">
          {trimesterGroups.map((group) => (
            <div
              key={group.label}
              className={`${group.bg} rounded-lg p-7 md:p-9`}
            >
              {/* Group header */}
              <div className="flex flex-col sm:flex-row sm:items-end gap-2 mb-7">
                <div>
                  <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-1">
                    {group.range}
                  </p>
                  <h3 className="font-serif text-2xl text-foreground">
                    {group.label}
                  </h3>
                </div>
                <p className="font-serif italic text-base text-muted-foreground sm:ml-4 sm:mb-0.5">
                  {group.sub}
                </p>
              </div>

              {/* Week grid */}
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                {group.weeks.map((week) => (
                  <Link
                    key={week}
                    to={`/pregnancy/week/${week}`}
                    className={`
                      relative flex flex-col items-center justify-center aspect-square rounded-md
                      border transition-all text-center
                      ${
                        earlyWeeks.includes(week)
                          ? "border-sage/40 bg-card hover:border-sage hover:shadow-card-brand"
                          : "border-border/40 bg-card/70 hover:border-foreground/20 hover:bg-card hover:shadow-card-brand"
                      }
                    `}
                  >
                    <span className="font-sans text-[11px] font-light text-muted-foreground leading-none">
                      Wk
                    </span>
                    <span
                      className={`font-serif text-lg leading-tight ${
                        earlyWeeks.includes(week)
                          ? "text-sage"
                          : "text-foreground"
                      }`}
                    >
                      {week}
                    </span>
                    {earlyWeeks.includes(week) && (
                      <span className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-sage opacity-70" />
                    )}
                  </Link>
                ))}
              </div>

              {/* Early weeks note */}
              {group.label === "First Trimester" && (
                <p className="mt-5 font-sans text-xs font-light text-sage flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sage inline-block" />
                  Weeks 1–3 mark the very beginning — before many people know
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
