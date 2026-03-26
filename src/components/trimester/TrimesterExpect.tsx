import type { TrimesterData } from "@/data/trimesterData";

interface Props {
  data: TrimesterData;
  bg?: string;
}

const TrimesterExpect = ({ data, bg = "bg-lavender-section" }: Props) => {
  return (
    <section className={`${bg} py-24 md:py-32`}>
      <div className="container mx-auto px-6 md:px-10 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
            The Full Picture
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-5 leading-tight max-w-2xl mx-auto">
            What to expect during the {data.shortLabel.toLowerCase()} trimester
          </h2>
          <p className="font-sans text-base font-light text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Across your body, your emotions, and the space in between.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.expect.map((card) => (
            <div
              key={card.id}
              className="bg-card rounded-lg p-8 shadow-card-brand border border-border/50 flex flex-col gap-5"
            >
              <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted">
                {card.label}
              </p>
              <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                {card.intro}
              </p>
              <ul className="space-y-2.5">
                {card.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-2 w-1 h-1 rounded-full bg-foreground/30 shrink-0" />
                    <span className="font-sans text-sm font-light text-foreground leading-relaxed">
                      {pt}
                    </span>
                  </li>
                ))}
              </ul>
              {/* What this means */}
              <div className="pt-4 border-t border-border/50">
                <p className="font-sans text-xs font-light tracking-[0.1em] uppercase text-sage-muted mb-2">
                  What this means
                </p>
                <p className="font-serif italic text-base text-foreground leading-relaxed">
                  {card.meaning}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrimesterExpect;
