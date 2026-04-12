import type { ArticleData } from "@/data/articleData";
import { Shield } from "lucide-react";

interface Props {
  data: ArticleData;
}

const ArticleCompare = ({ data }: Props) => {
  if (!data.compare) return null;

  const { compare } = data;

  return (
    <section id="compare" className="bg-parchment-dark py-10 sm:py-14 md:py-18">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-8 bg-sage-light" />
          <p className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-sage-muted">
            Understanding the difference
          </p>
        </div>
        <h2 className="font-serif text-xl sm:text-2xl md:text-[1.75rem] text-foreground leading-snug mb-2">
          {compare.heading}
        </h2>
        <p className="font-sans text-[13px] sm:text-[14px] font-light text-muted-foreground leading-relaxed mb-6 sm:mb-8 max-w-xl">
          {compare.description}
        </p>

        {/* Side-by-side comparison */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {compare.items.map((item, idx) => (
            <div
              key={idx}
              className={`rounded-xl p-5 sm:p-6 ${
                idx === 0
                  ? "bg-card border border-border/30"
                  : "bg-terracotta/[0.04] border border-terracotta/12"
              }`}
            >
              <div className={`w-6 h-[2px] rounded-full mb-3 ${idx === 0 ? "bg-sage/40" : "bg-terracotta/40"}`} />
              <h3 className="font-serif text-base sm:text-lg text-foreground mb-3">
                {item.label}
              </h3>
              <ul className="space-y-2">
                {item.points.map((point, pi) => (
                  <li key={pi} className="flex items-start gap-2.5">
                    <span className={`mt-[7px] w-1 h-1 rounded-full shrink-0 ${idx === 0 ? "bg-sage/50" : "bg-terracotta/50"}`} />
                    <span className="font-sans text-[13px] sm:text-[14px] font-light text-foreground/75 leading-relaxed">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Common confusion */}
        {compare.commonConfusion && (
          <div className="mt-4 bg-card/60 rounded-xl px-5 py-4 sm:px-6 sm:py-5 border border-border/20">
            <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-sage/60 mb-2">
              What people often confuse
            </p>
            <p className="font-sans text-[13px] sm:text-[14px] font-light text-foreground/75 leading-[1.8]">
              {compare.commonConfusion}
            </p>
          </div>
        )}

        {/* When to seek support */}
        {compare.whenToSeekHelp && (
          <div className="mt-3 flex items-start gap-3 bg-terracotta/[0.03] rounded-xl px-5 py-4 sm:px-6 sm:py-5 border border-terracotta/8">
            <Shield className="w-4 h-4 text-terracotta/50 shrink-0 mt-0.5" />
            <p className="font-sans text-[13px] sm:text-[14px] font-light text-foreground/75 leading-relaxed">
              {compare.whenToSeekHelp}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ArticleCompare;
