import type { WeekData } from "@/data/weekData";

interface Props {
  data: WeekData;
}

const WeekHumanTruth = ({ data }: Props) => {
  return (
    <section className="bg-lavender-section py-20 md:py-24">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-lavender-foreground/60 mb-6">
          How this week can feel
        </p>
        <h2 className="font-serif text-2xl sm:text-3xl text-lavender-foreground leading-snug mb-10">
          The real experience
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.humanTruth.map((truth, i) => (
            <div key={i} className="bg-card/60 border border-lavender/30 rounded-lg px-6 py-5">
              <p className="font-sans text-sm font-light text-lavender-foreground leading-relaxed">{truth}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeekHumanTruth;
