import { Link } from "react-router-dom";
import type { TrimesterData } from "@/data/trimesterData";
import WeekIllustration from "@/components/week/WeekIllustration";

interface Props {
  data: TrimesterData;
  bg?: string;
}

const TrimesterWeeks = ({ data, bg = "bg-parchment-dark" }: Props) => {
  const groups = data.weekGroups ?? [
    {
      label: `${data.label} Weeks`,
      weeks: Array.from(
        { length: data.weekEnd - data.weekStart + 1 },
        (_, i) => i + data.weekStart
      ),
    },
  ];

  return (
    <section id="week-by-week" className={`${bg} py-24 md:py-32`}>
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
            {data.range}, each week builds on the last.
          </p>
        </div>

        {/* Week groups */}
        <div className="space-y-10">
          {groups.map((group) => (
            <div
              key={group.label}
              className="bg-card border border-border/50 rounded-lg p-7 md:p-9 shadow-card-brand"
            >
              {/* Group label */}
              <p className="font-serif italic text-base text-muted-foreground mb-6">
                {group.label}
              </p>

              {/* Week grid */}
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                {group.weeks.map((week) => (
                  <Link
                    key={week}
                    to={`/pregnancy/week/${week}`}
                    className="relative flex flex-col items-center justify-center aspect-square rounded-md border border-border/40 bg-card/70 hover:border-sage/60 hover:bg-card hover:shadow-card-brand transition-all text-center gap-0.5 p-1"
                  >
                    <WeekIllustration week={week} className="w-7 h-7 sm:w-8 sm:h-8" />
                    <span className="font-sans text-[10px] font-light text-muted-foreground leading-none">
                      Week {week}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Back to full grid */}
        <div className="mt-10 text-center">
          <Link
            to="/pregnancy#week-by-week"
            className="font-sans text-sm font-light text-sage-muted hover:text-sage transition-colors underline underline-offset-4"
          >
            View all 40 weeks →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrimesterWeeks;
