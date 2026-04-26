import type { ArticleData } from "@/data/articleData";

interface Props {
  data: ArticleData;
}

const ArticleNormalSignals = ({ data }: Props) => {
  const normal = data.normal ?? [];
  const watch = data.seekSupport ?? [];
  if (normal.length === 0 && watch.length === 0) return null;

  return (
    <section
      id="normal-signals"
      className="bg-parchment-dark py-12 sm:py-16 md:py-20"
    >
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-8 bg-sage-light" />
          <p className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-sage-muted">
            Normal signals
          </p>
        </div>
        <h2 className="font-serif text-xl sm:text-2xl md:text-[1.75rem] text-foreground leading-snug mb-8 sm:mb-10">
          Usually normal, and worth a check
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
          {/* Usually normal */}
          {normal.length > 0 && (
            <div>
              <p className="font-sans text-[11px] font-medium tracking-[0.18em] uppercase text-foreground/60 mb-4">
                Usually normal
              </p>
              <ul className="space-y-3">
                {normal.map((item, i) => (
                  <li
                    key={i}
                    className="border-l border-sage/25 pl-4 font-sans text-[14px] sm:text-[15px] font-light text-foreground/80 leading-[1.75]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Worth a check */}
          {watch.length > 0 && (
            <div>
              <p className="font-sans text-[11px] font-medium tracking-[0.18em] uppercase text-foreground/60 mb-4">
                Worth a check
              </p>
              <ul className="space-y-3">
                {watch.map((item, i) => (
                  <li
                    key={i}
                    className="border-l border-foreground/20 pl-4 font-sans text-[14px] sm:text-[15px] font-light text-foreground/80 leading-[1.75]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {data.disclaimer && (
          <p className="mt-10 font-serif italic text-[13px] sm:text-[14px] text-foreground/55 leading-relaxed max-w-2xl">
            {data.disclaimer}
          </p>
        )}
      </div>
    </section>
  );
};

export default ArticleNormalSignals;
