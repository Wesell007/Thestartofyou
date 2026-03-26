import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { ArticleData } from "@/data/articleData";

interface Props {
  data: ArticleData;
}

const ArticleRelatedStage = ({ data }: Props) => {
  return (
    <section className="bg-parchment-dark py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
          Related to your stage
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-5">
          Find your stage
        </h2>
        <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-12 max-w-xl">
          {data.relatedStage.intro}
        </p>

        <div className="space-y-4">
          {data.relatedStage.links.map((link, i) => (
            <Link
              key={i}
              to={link.href}
              className="group flex items-start gap-5 bg-card border border-border/50 rounded-lg px-6 py-5 shadow-card-brand hover:border-foreground/20 hover:shadow-md transition-all"
            >
              <div className="flex-1">
                <p className="font-sans text-sm font-light text-foreground mb-1.5 group-hover:text-sage transition-colors">
                  {link.label}
                </p>
                {link.context && (
                  <p className="font-sans text-xs font-light text-muted-foreground leading-relaxed">
                    {link.context}
                  </p>
                )}
              </div>
              <ArrowRight size={14} className="text-muted-foreground group-hover:text-sage transition-colors mt-0.5 shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticleRelatedStage;
