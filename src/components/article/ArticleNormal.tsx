import { CheckCircle, AlertCircle } from "lucide-react";
import type { ArticleData } from "@/data/articleData";

interface Props {
  data: ArticleData;
}

const ArticleNormal = ({ data }: Props) => {
  return (
    <section className="bg-parchment-dark py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <div className="text-center mb-12">
          <p className="font-sans text-[10px] font-light tracking-[0.25em] uppercase text-sage-muted mb-4">
            Safety & Reassurance
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight">
            When to Seek Support
          </h2>
        </div>

        <div className="bg-card border border-border/30 rounded-2xl overflow-hidden shadow-soft">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border/30">
            {/* What's normal */}
            <div className="p-7 md:p-8">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-6 h-6 rounded-full bg-sage/10 flex items-center justify-center">
                  <CheckCircle size={13} className="text-sage" />
                </div>
                <p className="font-sans text-xs font-medium tracking-[0.15em] uppercase text-sage">
                  What's Normal
                </p>
              </div>
              <ul className="space-y-3.5">
                {data.normal.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle size={12} className="text-sage/50 mt-1 shrink-0" />
                    <p className="font-sans text-[13px] font-light text-foreground leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* When to seek support */}
            <div className="p-7 md:p-8">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-6 h-6 rounded-full bg-terracotta/10 flex items-center justify-center">
                  <AlertCircle size={13} className="text-terracotta" />
                </div>
                <p className="font-sans text-xs font-medium tracking-[0.15em] uppercase text-terracotta/80">
                  When to Seek Help
                </p>
              </div>
              <ul className="space-y-3.5">
                {data.seekSupport.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <AlertCircle size={12} className="text-terracotta/40 mt-1 shrink-0" />
                    <p className="font-sans text-[13px] font-light text-foreground leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Medical trust signal */}
          <div className="border-t border-border/20 px-7 py-4 bg-sage-bg/15">
            <p className="font-sans text-[11px] font-light text-sage-muted flex items-center gap-1.5">
              <span className="text-sage">✔</span> Medically reviewed by Jenny Joines
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleNormal;
