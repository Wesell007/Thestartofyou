import type { WeekData } from "@/data/weekData";

interface Props {
  data: WeekData;
}

const WeekNormalRightNow = ({ data }: Props) => {
  return (
    <section className="bg-parchment py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center">
        <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
          Reassurance
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-5">
          What's normal right now
        </h2>
        <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-12 max-w-md mx-auto">
          If you've found yourself asking "is this okay?" — this section is for you.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          {data.normalRightNow.map((item, i) => (
            <div
              key={i}
              className="bg-card border border-border/50 rounded-lg px-6 py-5 shadow-card-brand"
            >
              <p className="font-sans text-sm font-light text-foreground leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeekNormalRightNow;
