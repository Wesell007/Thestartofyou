import type { TrimesterData } from "@/data/trimesterData";

interface Props {
  data: TrimesterData;
  bg?: string;
}

const TrimesterExpect = ({ data, bg = "bg-lavender-section" }: Props) => {
  return (
    <section className={`${bg} section-spacing`}>
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <p className="stage-label mb-3">
            The Full Picture
          </p>
          <h2 className="font-serif text-[1.75rem] sm:text-3xl md:text-[2.75rem] text-foreground mb-3 leading-tight max-w-2xl mx-auto">
            What to expect during the {data.shortLabel.toLowerCase()} trimester
          </h2>
          <p className="font-sans text-[15px] sm:text-base font-light text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Across your body, your emotions, and the space in between.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {data.expect.map((card) => (
            <div
              key={card.id}
              className="bg-card rounded-xl p-6 sm:p-7 shadow-card-brand border border-border/40 flex flex-col gap-4"
            >
              <p className="stage-label">
                {card.label}
              </p>
              <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed">
                {card.intro}
              </p>
              <ul className="space-y-2">
                {card.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-2 w-1 h-1 rounded-full bg-foreground/25 shrink-0" />
                    <span className="font-sans text-[15px] font-light text-foreground leading-relaxed">
                      {pt}
                    </span>
                  </li>
                ))}
              </ul>
              {/* What this means */}
              <div className="pt-4 border-t border-border/30">
                <p className="font-sans text-[10px] font-medium tracking-[0.15em] uppercase text-sage mb-1.5">
                  What this means
                </p>
                <p className="font-serif italic text-base text-foreground/85 leading-relaxed">
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
