import type { TrimesterData } from "@/data/trimesterData";

interface Props {
  data: TrimesterData;
  bg?: string;
}

const TrimesterDifficulties = ({ data, bg = "bg-parchment" }: Props) => {
  const { difficulties } = data;

  return (
    <section className={`${bg} section-spacing`}>
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
        {/* Header */}
        <div className="mb-10 md:mb-12">
          <p className="stage-label mb-3">
            Honest Reflection
          </p>
          <h2 className="font-serif text-[1.75rem] sm:text-3xl md:text-[2.25rem] text-foreground leading-tight max-w-lg mb-3">
            {difficulties.title}
          </h2>
          <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed max-w-xl">
            {difficulties.intro}
          </p>
        </div>

        {/* Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {difficulties.items.map((item, i) => (
            <div
              key={i}
              className="bg-card border border-border/40 rounded-xl p-5 sm:p-6 shadow-card-brand flex flex-col gap-2.5"
            >
              <div className="flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sage shrink-0" />
                <p className="font-serif text-lg text-foreground leading-snug">
                  {item.label}
                </p>
              </div>
              <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed pl-4.5">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        {/* Closing note */}
        <p className="font-serif italic text-base text-sage text-center max-w-lg mx-auto leading-relaxed">
          {difficulties.closing}
        </p>
      </div>
    </section>
  );
};

export default TrimesterDifficulties;
