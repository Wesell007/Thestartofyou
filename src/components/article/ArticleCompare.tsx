import type { ArticleData } from "@/data/articleData";
import { Shield } from "lucide-react";

interface Props {
  data: ArticleData;
}

const ArticleCompare = ({ data }: Props) => {
  if (!data.compare) return null;

  const { compare } = data;

  return (
    <section className="bg-parchment-dark/30 py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        {/* Header */}
        <div className="mb-14">
          <p className="stage-label mb-5">Understanding the difference</p>
          <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight max-w-xl">
            {compare.heading}
          </h2>
          <p className="font-sans text-base font-light text-muted-foreground mt-4 max-w-2xl leading-relaxed">
            {compare.description}
          </p>
        </div>

        {/* Comparison cards */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {compare.items.map((item, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-8 md:p-10 ${
                idx === 0
                  ? "bg-white/60 border border-border/30"
                  : "bg-terracotta/5 border border-terracotta/15"
              }`}
            >
              <h3 className="font-serif text-xl text-foreground mb-6">
                {item.label}
              </h3>
              <ul className="space-y-4">
                {item.points.map((point, pi) => (
                  <li key={pi} className="flex items-start gap-3">
                    <span
                      className={`mt-2 w-1.5 h-1.5 rounded-full shrink-0 ${
                        idx === 0 ? "bg-sage/60" : "bg-terracotta/60"
                      }`}
                    />
                    <span className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
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
          <div className="mt-10 bg-white/40 rounded-xl p-6 md:p-8 border border-border/20">
            <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-3">
              What people often confuse
            </p>
            <p className="font-sans text-base font-light text-muted-foreground leading-relaxed">
              {compare.commonConfusion}
            </p>
          </div>
        )}

        {/* When to seek help */}
        {compare.whenToSeekHelp && (
          <div className="mt-6 flex items-start gap-3 bg-terracotta/5 rounded-xl p-6 md:p-8 border border-terracotta/10">
            <Shield className="w-5 h-5 text-terracotta/70 shrink-0 mt-0.5" />
            <p className="font-sans text-sm font-light text-foreground/80 leading-relaxed">
              {compare.whenToSeekHelp}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ArticleCompare;
