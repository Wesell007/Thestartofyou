import type { ArticleData } from "@/data/articleData";

interface Props {
  data: ArticleData;
}

const ArticleTiming = ({ data }: Props) => {
  if (!data.timing?.whenStarts) return null;

  const phases = [
    { label: "Starts", value: data.timing.whenStarts, dotColor: "bg-sage/50" },
    ...(data.timing.whenPeaks ? [{ label: "Peaks", value: data.timing.whenPeaks, dotColor: "bg-terracotta/50" }] : []),
    { label: "Eases", value: data.timing.whenEases, dotColor: "bg-lavender/50" },
  ];

  return (
    <section id="timing" className="bg-parchment py-16 sm:py-20 md:py-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-8 bg-sage-light" />
          <p className="font-sans text-[10px] font-light tracking-[0.25em] uppercase text-sage-muted">
            Timing
          </p>
        </div>
        <h2 className="font-serif text-xl sm:text-2xl md:text-[1.75rem] text-foreground leading-snug mb-8 sm:mb-10">
          When this typically happens
        </h2>

        {/* Vertical timeline */}
        <div className="relative pl-6 sm:pl-8">
          {/* Connecting line */}
          <div className="absolute left-[7px] sm:left-[9px] top-2 bottom-2 w-px bg-border/40" />

          <div className="space-y-8 sm:space-y-10">
            {phases.map((phase, i) => (
              <div key={i} className="relative">
                {/* Dot */}
                <div className={`absolute -left-6 sm:-left-8 top-1.5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 border-card ${phase.dotColor}`} />
                <p className="font-sans text-[11px] font-medium tracking-[0.15em] uppercase text-sage-muted mb-1.5">
                  {phase.label}
                </p>
                <p className="font-sans text-[14px] sm:text-[15px] font-light text-foreground/80 leading-[1.8]">
                  {phase.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleTiming;
