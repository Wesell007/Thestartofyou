import type { ArticleData } from "@/data/articleData";

interface Props {
  data: ArticleData;
}

const ArticleTiming = ({ data }: Props) => {
  if (!data.timing?.whenStarts) return null;

  const phases = [
    { label: "Starts", value: data.timing.whenStarts, color: "bg-sage" },
    ...(data.timing.whenPeaks ? [{ label: "Peaks", value: data.timing.whenPeaks, color: "bg-terracotta" }] : []),
    { label: "Eases", value: data.timing.whenEases, color: "bg-lavender" },
  ];

  return (
    <section id="timing" className="bg-parchment py-10 sm:py-14 md:py-18">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-8 bg-sage-light" />
          <p className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-sage-muted">
            Timing
          </p>
        </div>
        <h2 className="font-serif text-xl sm:text-2xl md:text-[1.75rem] text-foreground leading-snug mb-6 sm:mb-8">
          When this typically happens
        </h2>

        {/* Horizontal timeline cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {phases.map((phase, i) => (
            <div key={i} className="bg-card border border-border/25 rounded-xl p-5 relative overflow-hidden">
              <div className={`absolute top-0 left-0 right-0 h-[3px] ${phase.color} opacity-30`} />
              <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-2">
                {phase.label}
              </p>
              <p className="font-sans text-[14px] sm:text-[15px] font-light text-foreground/80 leading-relaxed">
                {phase.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticleTiming;
