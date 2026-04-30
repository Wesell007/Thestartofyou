import { Check, AlertCircle } from "lucide-react";
import type { ArticleData } from "@/data/articleData";

interface Props {
  data: ArticleData;
}

// Single bordered card panel containing two columns: "Usually normal" and
// "Worth a check". Reference layout for the flagship template.
const FlagshipNormalCheckPanel = ({ data }: Props) => {
  const normal = data.normal ?? [];
  const watch = data.seekSupport ?? [];
  if (normal.length === 0 && watch.length === 0) return null;

  return (
    <section className="bg-parchment py-14 sm:py-18 md:py-24">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-8 bg-sage-light" />
          <p className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-sage-muted">
            Normal signals
          </p>
        </div>
        <h2 className="font-serif text-foreground leading-snug mb-8 sm:mb-10 text-[1.5rem] sm:text-[1.75rem] md:text-[2rem] max-w-2xl">
          Usually normal, and worth a check
        </h2>

        <div className="bg-card border border-border/40 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x divide-border/40">
            {/* Usually normal */}
            <div className="px-6 py-7 sm:px-8 sm:py-9 md:px-10 md:py-10">
              <div className="flex items-center gap-2.5 mb-5">
                <span className="w-7 h-7 rounded-full bg-sage-bg/50 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-sage" strokeWidth={2} />
                </span>
                <p className="font-sans text-[11px] font-medium tracking-[0.18em] uppercase text-foreground/70">
                  Usually normal
                </p>
              </div>
              <ul className="space-y-3.5">
                {normal.map((item, i) => (
                  <li
                    key={i}
                    className="font-sans text-[14.5px] sm:text-[15px] font-light text-foreground/80 leading-[1.8] pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[0.7em] before:w-2 before:h-px before:bg-sage/40"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Worth a check */}
            <div className="px-6 py-7 sm:px-8 sm:py-9 md:px-10 md:py-10 bg-parchment-dark/30 md:bg-transparent border-t md:border-t-0 border-border/40">
              <div className="flex items-center gap-2.5 mb-5">
                <span className="w-7 h-7 rounded-full bg-terracotta/10 flex items-center justify-center">
                  <AlertCircle className="w-3.5 h-3.5 text-terracotta/80" strokeWidth={2} />
                </span>
                <p className="font-sans text-[11px] font-medium tracking-[0.18em] uppercase text-foreground/70">
                  Worth a check
                </p>
              </div>
              <ul className="space-y-3.5">
                {watch.map((item, i) => (
                  <li
                    key={i}
                    className="font-sans text-[14.5px] sm:text-[15px] font-light text-foreground/80 leading-[1.8] pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[0.7em] before:w-2 before:h-px before:bg-terracotta/40"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {data.disclaimer && (
          <p className="mt-8 font-serif italic text-[13px] sm:text-[14px] text-foreground/55 leading-relaxed max-w-2xl">
            {data.disclaimer}
          </p>
        )}
      </div>
    </section>
  );
};

export default FlagshipNormalCheckPanel;
