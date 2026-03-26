import type { TrimesterData } from "@/data/trimesterData";

interface Props {
  data: TrimesterData;
  bg?: string;
}

const TrimesterDifficulties = ({ data, bg = "bg-parchment" }: Props) => {
  const { difficulties } = data;

  return (
    <section className={`${bg} py-24 md:py-32`}>
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        {/* Header */}
        <div className="mb-14">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
            Honest Reflection
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight max-w-lg mb-4">
            {difficulties.title}
          </h2>
          <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed max-w-xl">
            {difficulties.intro}
          </p>
        </div>

        {/* Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {difficulties.items.map((item, i) => (
            <div
              key={i}
              className="bg-card border border-border/50 rounded-lg p-7 shadow-card-brand flex flex-col gap-3"
            >
              <div className="flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sage shrink-0" />
                <p className="font-serif text-lg text-foreground leading-snug">
                  {item.label}
                </p>
              </div>
              <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed pl-4">
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
