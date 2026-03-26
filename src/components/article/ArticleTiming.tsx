import type { ArticleData } from "@/data/articleData";

interface Props {
  data: ArticleData;
}

const ArticleTiming = ({ data }: Props) => {
  const rows = [
    { label: "When it typically starts", value: data.timing.whenStarts },
    ...(data.timing.whenPeaks ? [{ label: "When it may peak", value: data.timing.whenPeaks }] : []),
    { label: "When it may ease", value: data.timing.whenEases },
  ];

  return (
    <section className="bg-parchment-dark py-20 md:py-24">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
          Timing
        </p>
        <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-10">
          When this typically happens
        </h2>

        <div className="space-y-4">
          {rows.map((row, i) => (
            <div
              key={i}
              className="bg-card border border-border/50 rounded-lg overflow-hidden shadow-card-brand"
            >
              <div className="flex flex-col sm:flex-row sm:items-start">
                <div className="sm:w-48 shrink-0 bg-sage-bg/40 px-6 py-5">
                  <p className="font-sans text-xs font-light tracking-[0.1em] uppercase text-sage-muted leading-snug">
                    {row.label}
                  </p>
                </div>
                <div className="flex-1 px-6 py-5">
                  <p className="font-sans text-sm font-light text-foreground leading-relaxed">
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
