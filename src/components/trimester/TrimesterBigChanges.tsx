import type { TrimesterData } from "@/data/trimesterData";

interface Props {
  data: TrimesterData;
  bg?: string;
}

const TrimesterBigChanges = ({ data, bg = "bg-parchment" }: Props) => {
  const big = data.bigChanges;
  if (!big) return null;

  return (
    <section className={`${bg} section-spacing`}>
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
        {/* Header */}
        <div className="mb-10 md:mb-12 max-w-2xl">
          <p className="stage-label mb-3">{big.eyebrow}</p>
          <h2 className="font-serif text-[1.75rem] sm:text-3xl md:text-[2.25rem] text-foreground leading-tight mb-4">
            {big.title}
          </h2>
          <p className="font-sans text-[15px] sm:text-base font-light text-muted-foreground leading-relaxed">
            {big.intro}
          </p>
        </div>

        {/* Items, two-column editorial list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 md:gap-y-10">
          {big.items.map((item, i) => (
            <div key={i} className="flex flex-col gap-2.5">
              <div className="flex items-baseline gap-3">
                <span className="font-serif italic text-sm text-sage tabular-nums shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif text-lg sm:text-[1.35rem] text-foreground leading-snug">
                  {item.label}
                </h3>
              </div>
              <p className="font-sans text-[15px] font-light text-muted-foreground leading-[1.75] pl-8">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        {big.closing && (
          <p className="mt-12 md:mt-14 font-serif italic text-base sm:text-lg text-sage text-center max-w-xl mx-auto leading-relaxed">
            {big.closing}
          </p>
        )}
      </div>
    </section>
  );
};

export default TrimesterBigChanges;
