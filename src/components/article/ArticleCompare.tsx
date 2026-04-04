import type { ArticleData } from "@/data/articleData";
import { Shield } from "lucide-react";

interface Props {
  data: ArticleData;
}

const ArticleCompare = ({ data }: Props) => {
  if (!data.compare) return null;

  const { compare } = data;

  return (
    <section className="bg-sage-bg/20 py-14 sm:py-20 md:py-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
        {/* Section header */}
        <div className="mb-8 sm:mb-10 md:mb-14">
          <p className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-sage mb-3 sm:mb-4">
            Understanding the difference
          </p>
          <h2 className="font-serif text-xl sm:text-2xl md:text-[2rem] text-foreground leading-tight max-w-xl">
            {compare.heading}
          </h2>
          <p className="font-sans text-[14px] sm:text-[15px] font-light text-muted-foreground mt-3 max-w-2xl leading-relaxed">
            {compare.description}
          </p>
        </div>

        {/* Comparison cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {compare.items.map((item, idx) => (
            <div
              key={idx}
              className={`rounded-xl sm:rounded-2xl p-5 sm:p-7 md:p-9 transition-all ${
                idx === 0
                  ? "bg-card/80 backdrop-blur-sm border border-border/30"
                  : "bg-terracotta/[0.04] border border-terracotta/12"
              }`}
            >
              {/* Card accent bar */}
              <div
                className={`w-8 h-[3px] rounded-full mb-4 sm:mb-5 ${
                  idx === 0 ? "bg-sage/40" : "bg-terracotta/40"
                }`}
              />
              <h3 className="font-serif text-base sm:text-lg md:text-xl text-foreground mb-4 sm:mb-5">
                {item.label}
              </h3>
              <ul className="space-y-3 sm:space-y-3.5">
                {item.points.map((point, pi) => (
                  <li key={pi} className="flex items-start gap-3">
                    <span
                      className={`mt-[7px] w-1.5 h-1.5 rounded-full shrink-0 ${
                        idx === 0 ? "bg-sage/50" : "bg-terracotta/50"
                      }`}
                    />
                    <span className="font-sans text-[13px] sm:text-[14px] font-light text-muted-foreground leading-relaxed">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Common confusion callout */}
        {compare.commonConfusion && (
          <div className="mt-6 sm:mt-8 bg-card/60 backdrop-blur-sm rounded-xl px-5 py-5 sm:px-7 sm:py-6 md:px-8 md:py-7 border border-border/20">
            <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-sage/70 mb-3">
              What people often confuse
            </p>
            <p className="font-sans text-[14px] sm:text-[15px] font-light text-muted-foreground leading-[1.8]">
              {compare.commonConfusion}
            </p>
          </div>
        )}

        {/* When to seek support */}
        {compare.whenToSeekHelp && (
          <div className="mt-4 sm:mt-5 flex items-start gap-3 sm:gap-3.5 bg-terracotta/[0.04] rounded-xl px-5 py-5 sm:px-7 sm:py-6 md:px-8 md:py-7 border border-terracotta/10">
            <Shield className="w-4.5 h-4.5 text-terracotta/60 shrink-0 mt-0.5" />
            <div>
              <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-terracotta/60 mb-2">
                When to seek support
              </p>
              <p className="font-sans text-[13px] sm:text-[14px] font-light text-foreground/75 leading-relaxed">
                {compare.whenToSeekHelp}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ArticleCompare;
