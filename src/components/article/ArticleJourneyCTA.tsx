import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { ArticleData, ArticleData as AD } from "@/data/articleData";
import { getRelatedArticles } from "@/data/articleData";

interface Props {
  data: ArticleData;
}

const ArticleJourneyCTA = ({ data }: Props) => {
  const related: AD[] = getRelatedArticles(data.slug, 2);

  return (
    <section className="bg-parchment-dark py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        {/* Journey CTA */}
        <div className="text-center mb-16">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
            Continue
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-5">
            Continue your journey
          </h2>
          <p className="font-sans text-base font-light text-muted-foreground leading-relaxed max-w-md mx-auto mb-10">
            Get week-by-week guidance tailored to your stage of pregnancy.
          </p>
          <Link
            to="/pregnancy"
            className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-8 py-4 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
          >
            Start your journey
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <div className="pt-10 border-t border-border/40">
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-6">
              Related guidance
            </p>
            <div className="space-y-4">
              {related.map((article) => (
                <Link
                  key={article.slug}
                  to={`/articles/${article.slug}`}
                  className="group flex items-start gap-5 bg-card border border-border/50 rounded-lg px-6 py-5 shadow-card-brand hover:border-foreground/20 transition-all"
                >
                  <div className="flex-1">
                    <p className="font-sans text-sm font-light text-foreground group-hover:text-sage transition-colors leading-relaxed">
                      {article.title}
                    </p>
                  </div>
                  <ArrowRight size={14} className="text-muted-foreground group-hover:text-sage transition-colors mt-0.5 shrink-0" />
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
