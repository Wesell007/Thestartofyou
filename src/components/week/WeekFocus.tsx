import type { WeekData } from "@/data/weekData";

interface Props {
  data: WeekData;
}

const WeekFocus = ({ data }: Props) => {
  return (
    <section className="bg-parchment-dark section-spacing">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-start">
          {/* Left */}
          <div>
            <p className="stage-label mb-4">
              Priorities
            </p>
            <h2 className="font-serif text-[1.75rem] sm:text-3xl md:text-[2.25rem] text-foreground leading-tight mb-4">
              What to focus on this week
            </h2>
            <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed">
              A short, realistic set of things that actually matter this week, with the reason behind each one.
            </p>
          </div>

          {/* Right, focus list */}
          <div className="space-y-3.5">
            {data.focusPoints.map((point, i) => (
              <div
                key={i}
                className="bg-card border border-border/40 rounded-xl px-5 py-4 sm:px-6 sm:py-5 shadow-card-brand"
              >
                <div className="flex items-start gap-3.5">
                  <span className="font-serif text-lg text-sage/40 shrink-0 mt-0.5 select-none w-5">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <p className="font-sans text-[15px] font-light text-foreground leading-relaxed mb-1">
                      {point.action}
                    </p>
                    <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                      → {point.reason}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeekFocus;
