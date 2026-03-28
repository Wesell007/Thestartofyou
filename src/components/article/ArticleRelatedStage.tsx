import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { ArticleData } from "@/data/articleData";

interface Props {
  data: ArticleData;
}

const ArticleRelatedStage = ({ data }: Props) => {
  return (
    <section className="bg-parchment py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px w-10 bg-sage-light" />
          <p className="font-sans text-[10px] font-light tracking-[0.25em] uppercase text-sage-muted">
            Related to your stage
          </p>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-3">
          Find your stage
        </h2>
        <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-10 max-w-xl">
          {data.relatedStage.intro}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {data.relatedStage.links.map((link, i) => (
            <Link
              key={i}
              to={link.href}
              className="group bg-card border border-border/30 rounded-xl px-6 py-5 hover:border-sage-light/50 hover:shadow-soft transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <p className="font-sans text-sm font-medium text-foreground mb-1.5 group-hover:text-sage transition-colors">
                    {link.label}
                  </p>
                  {link.context && (
                    <p className="font-sans text-[12px] font-light text-muted-foreground leading-relaxed">
                      {link.context}
                    </p>
                  )}
                </div>
                <ArrowRight size={14} className="text-muted-foreground/40 group-hover:text-sage transition-colors mt-1 shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticleRelatedStage;
