import type { WeekData } from "@/data/weekData";

interface Props {
  data: WeekData;
}

const WeekFocus = ({ data }: Props) => {
  return (
    <section className="bg-parchment-dark py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
          {/* Left */}
          <div>
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
              Priorities
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-5">
              What to focus on this week
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
              A short, realistic set of things that actually matter this week, with the reason behind each one.
            </p>
          </div>

          {/* Right, focus list */}
          <div className="space-y-4">
            {data.focusPoints.map((point, i) => (
              <div
                key={i}
                className="bg-card border border-border/50 rounded-lg px-6 py-5 shadow-card-brand"
              >
                <div className="flex items-start gap-4">
                  <span className="font-serif text-lg text-sage-muted opacity-40 shrink-0 mt-0.5 select-none w-5">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <p className="font-sans text-sm font-light text-foreground leading-relaxed mb-1.5">
                      {point.action}
                    </p>
                    <p className="font-sans text-xs font-light text-muted-foreground leading-relaxed">
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
