import { Link } from "react-router-dom";
import type { WeekData } from "@/data/weekData";

interface Props {
  data: WeekData;
}

const WeekTimeline = ({ data }: Props) => {
  const currentWeek = data.week;

  // Show a window of 5 weeks centred on current week
  const start = Math.max(1, Math.min(currentWeek - 2, 36));
  const end = Math.min(40, start + 4);
  const weeks = Array.from({ length: end - start + 1 }, (_, i) => i + start);

  return (
    <section className="bg-parchment-dark py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
          Your journey
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-14">
          Your journey so far
        </h2>

        {/* Timeline row */}
        <div className="flex items-stretch gap-3 overflow-x-auto pb-2">
          {weeks.map((week) => {
            const isCurrent = week === currentWeek;
            const isPast = week < currentWeek;

            return (
              <Link
                key={week}
                to={`/pregnancy/week/${week}`}
                className={`
                  flex-1 min-w-[72px] flex flex-col items-center justify-center
                  rounded-lg border px-3 py-5 transition-all text-center
                  ${
                    isCurrent
                      ? "bg-foreground border-foreground text-primary-foreground shadow-card-brand"
                      : isPast
                      ? "bg-card border-sage/40 hover:border-sage hover:shadow-card-brand"
                      : "bg-card/70 border-border/40 hover:border-foreground/20 hover:bg-card"
                  }
                `}
              >
                <span className={`font-sans text-[10px] font-light tracking-[0.1em] uppercase mb-1 ${isCurrent ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  Wk
                </span>
                <span className={`font-serif text-xl leading-tight ${isCurrent ? "text-primary-foreground" : isPast ? "text-sage" : "text-foreground"}`}>
                  {week}
                </span>
                {isCurrent && (
                  <span className="mt-2 font-sans text-[9px] font-light tracking-wider uppercase text-primary-foreground/60">
                    Now
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* View all link */}
        <div className="mt-8 text-center">
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

export default WeekTimeline;
