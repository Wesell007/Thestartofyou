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
    <section id="week-by-week" className={`${bg} section-spacing`}>
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <p className="stage-label mb-3">
            Continue · Week by week
          </p>
          <h2 className="font-serif text-[1.75rem] sm:text-3xl md:text-[2.5rem] text-foreground mb-3 leading-tight">
            From this stage to the week you're in
          </h2>
          <p className="font-sans text-[15px] sm:text-base font-light text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {data.weekBridgeIntro ?? `${data.range}, each week builds on the last.`}
          </p>
        </div>

        {/* Week groups */}
        <div className="space-y-6">
          {groups.map((group) => (
            <div
              key={group.label}
              className="bg-card border border-border/40 rounded-xl p-5 sm:p-6 md:p-8 shadow-card-brand"
            >
              {/* Group label */}
              <p className="font-serif italic text-base text-muted-foreground mb-5">
                {group.label}
              </p>

              {/* Week grid */}
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                {group.weeks.map((week) => (
                  <Link
                    key={week}
                    to={`/pregnancy/week/${week}`}
                    className="relative flex flex-col items-center justify-center aspect-square rounded-lg border border-border/30 bg-card hover:border-sage/50 hover:bg-sage-bg/30 hover:shadow-card-brand transition-all text-center gap-0.5 p-1"
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
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Link
            to="/pregnancy#week-by-week"
            className="font-sans text-sm font-light text-sage hover:text-sage-muted transition-colors underline underline-offset-4"
          >
            View all weeks →
          </Link>
          <span className="hidden sm:inline text-muted-foreground/30">·</span>
          <Link
            to="/ask"
            className="font-sans text-sm font-light text-muted-foreground hover:text-sage transition-colors"
          >
            Or ask a question about weeks {data.weekStart}–{data.weekEnd}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrimesterWeeks;
