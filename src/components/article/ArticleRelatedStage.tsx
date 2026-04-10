import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { ArticleData } from "@/data/articleData";

interface Props {
  data: ArticleData;
}

const ArticleRelatedStage = ({ data }: Props) => {
  return (
    <section className="bg-parchment-dark py-16 sm:py-20 md:py-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-8 bg-sage-light" />
          <p className="font-sans text-[10px] font-light tracking-[0.25em] uppercase text-sage-muted">
            Related to your stage
          </p>
        </div>
        <h2 className="font-serif text-xl sm:text-2xl text-foreground leading-snug mb-2">
          Find your stage
        </h2>
        <p className="font-sans text-[13px] sm:text-[14px] font-light text-muted-foreground leading-relaxed mb-8 sm:mb-10 max-w-lg">
          {data.relatedStage.intro}
        </p>

        {/* Anti-drift: max 4 stage links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
          {data.relatedStage.links.slice(0, 4).map((link, i) => (
            <Link
              key={i}
              to={link.href}
              className="group flex items-start justify-between gap-3 bg-card border border-border/25 rounded-lg px-5 py-4 hover:border-sage/20 transition-all"
            >
              <div className="flex-1">
                <p className="font-sans text-[14px] font-medium text-foreground mb-1 group-hover:text-sage transition-colors">
                  {link.label}
                </p>
                {link.context && (
                  <p className="font-sans text-[12px] font-light text-muted-foreground leading-relaxed">
                    {link.context}
                  </p>
                )}
              </div>
              <ArrowRight size={13} className="text-muted-foreground/30 group-hover:text-sage transition-colors mt-1 shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticleRelatedStage;
