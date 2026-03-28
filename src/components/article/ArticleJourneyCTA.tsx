import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { ArticleData, ArticleData as AD } from "@/data/articleData";
import { getRelatedArticles } from "@/data/articleData";
import botanicalAccent from "@/assets/article-botanical-accent.png";

interface Props {
  data: ArticleData;
}

const ArticleJourneyCTA = ({ data }: Props) => {
  const related: AD[] = getRelatedArticles(data.slug, 2);

  return (
    <section className="relative bg-parchment-dark py-24 md:py-32 overflow-hidden">
      {/* Botanical accent */}
      <img
        src={botanicalAccent}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={180}
        height={180}
        className="absolute bottom-0 right-0 w-32 md:w-44 opacity-[0.07] pointer-events-none translate-y-1/4 translate-x-1/4 rotate-180"
      />

      <div className="container mx-auto px-6 md:px-10 max-w-3xl relative z-10">
        {/* Journey CTA */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-10 bg-sage-light" />
            <p className="font-sans text-[10px] font-light tracking-[0.25em] uppercase text-sage-muted">
              Continue
            </p>
            <div className="h-px w-10 bg-sage-light" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-4">
            Continue your journey
          </h2>
          <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed max-w-md mx-auto mb-8">
            Get week-by-week guidance tailored to your stage of pregnancy.
          </p>
          <Link
            to="/pregnancy"
            className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
          >
            Start your journey
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <div className="pt-10 border-t border-border/30">
            <p className="font-sans text-[10px] font-light tracking-[0.25em] uppercase text-sage-muted mb-5">
              Related guidance
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {related.map((article) => (
                <Link
                  key={article.slug}
                  to={`/articles/${article.slug}`}
                  className="group bg-card border border-border/30 rounded-xl px-6 py-5 hover:border-sage-light/50 hover:shadow-soft transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-sans text-sm font-light text-foreground group-hover:text-sage transition-colors leading-relaxed flex-1">
                      {article.title}
                    </p>
                    <ArrowRight size={14} className="text-muted-foreground/40 group-hover:text-sage transition-colors mt-0.5 shrink-0" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ArticleJourneyCTA;
