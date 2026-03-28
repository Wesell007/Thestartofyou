import type { ArticleData } from "@/data/articleData";

interface Props {
  data: ArticleData;
}

const ArticleTiming = ({ data }: Props) => {
  const rows = [
    { label: "When it typically starts", value: data.timing.whenStarts, accent: "bg-sage/10 border-sage/20" },
    ...(data.timing.whenPeaks ? [{ label: "When it may peak", value: data.timing.whenPeaks, accent: "bg-accent/10 border-accent/20" }] : []),
    { label: "When it often eases", value: data.timing.whenEases, accent: "bg-lavender/10 border-lavender/20" },
  ];

  return (
    <section className="bg-parchment py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px w-10 bg-sage-light" />
          <p className="font-sans text-[10px] font-light tracking-[0.25em] uppercase text-sage-muted">
            Timing
          </p>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-10">
          When this typically happens
        </h2>

        <div className="space-y-3">
          {rows.map((row, i) => (
            <div
              key={i}
              className={`rounded-xl border overflow-hidden ${row.accent}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start">
                <div className="sm:w-52 shrink-0 px-6 py-5">
                  <p className="font-sans text-xs font-medium text-foreground/70 tracking-wide">
                    {row.label}
                  </p>
                </div>
                <div className="flex-1 px-6 py-5 sm:border-l border-inherit">
                  <p className="font-sans text-sm font-light text-foreground leading-[1.75]">
                    {row.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticleTiming;
