import { CheckCircle, AlertCircle, Shield } from "lucide-react";
import type { ArticleData } from "@/data/articleData";

interface Props {
  data: ArticleData;
}

const ArticleNormal = ({ data }: Props) => {
  return (
    <section id="normal-vs-support" className="bg-parchment-dark py-16 sm:py-20 md:py-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-8 bg-sage-light" />
          <p className="font-sans text-[10px] font-light tracking-[0.25em] uppercase text-sage-muted">
            Safety and reassurance
          </p>
        </div>
        <h2 className="font-serif text-xl sm:text-2xl md:text-[1.75rem] text-foreground leading-snug mb-8 sm:mb-10">
          What's normal and when to seek support
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {/* Normal */}
          <div className="bg-card border border-border/30 rounded-xl p-5 sm:p-7">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-6 h-6 rounded-full bg-sage/10 flex items-center justify-center">
                <CheckCircle size={12} className="text-sage" />
              </div>
              <p className="font-sans text-[11px] font-medium tracking-[0.15em] uppercase text-sage">
                What's normal
              </p>
            </div>
            <ul className="space-y-3">
              {data.normal.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-1 h-1 rounded-full bg-sage/40 shrink-0 mt-2" />
                  <p className="font-sans text-[13px] sm:text-[14px] font-light text-foreground/80 leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Seek support */}
          <div className="bg-terracotta/[0.03] border border-terracotta/10 rounded-xl p-5 sm:p-7">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-6 h-6 rounded-full bg-terracotta/10 flex items-center justify-center">
                <AlertCircle size={12} className="text-terracotta" />
              </div>
              <p className="font-sans text-[11px] font-medium tracking-[0.15em] uppercase text-terracotta/70">
                When to seek help
              </p>
            </div>
            <ul className="space-y-3">
              {data.seekSupport.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-1 h-1 rounded-full bg-terracotta/40 shrink-0 mt-2" />
                  <p className="font-sans text-[13px] sm:text-[14px] font-light text-foreground/80 leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust signal */}
        <div className="mt-4 flex items-center gap-1.5 font-sans text-[11px] font-light text-sage-muted">
          <Shield className="w-3 h-3 text-sage/50" />
          Medically reviewed by Jenny Joines
        </div>
      </div>
    </section>
  );
};

export default ArticleNormal;
