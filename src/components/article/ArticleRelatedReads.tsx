import { Link } from "react-router-dom";
import type { ArticleData } from "@/data/articleData";

const journeyLabels: Record<string, string> = {
  "trying-to-conceive": "Trying to conceive",
  pregnancy: "Pregnancy",
  ivf: "IVF",
  postpartum: "Postpartum",
  "first-year": "First year",
  "preparing-for-baby": "Preparing for baby",
  support: "Support",
};

interface Props {
  articles: ArticleData[];
  isDeep?: boolean;
}

const ArticleRelatedReads = ({ articles, isDeep }: Props) => {
  if (articles.length === 0) return null;

  return (
    <section className="bg-card/60 py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-10 max-w-5xl">
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-10 bg-sage-light" />
            <p className="font-sans text-[10px] font-light tracking-[0.25em] uppercase text-sage-muted">
              Keep reading
            </p>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight">
            {isDeep ? 'Related guides and articles' : 'You may also find helpful'}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {articles.map((article) => (
            <Link
              key={article.slug}
              to={`/articles/${article.slug}`}
              className="group block rounded-2xl bg-parchment border border-border/30 hover:border-sage/25 hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              {/* Accent for cornerstone articles */}
              {article.isCornerstone && (
                <div className="h-0.5 bg-gradient-to-r from-sage/20 via-sage/40 to-sage/20" />
              )}
              <div className="p-6 md:p-7">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {article.isCornerstone && (
                    <span className="px-2 py-0.5 rounded-full bg-sage/10 text-sage text-[9px] font-sans tracking-[0.12em] uppercase">
                      Guide
                    </span>
                  )}
                  {article.journey?.slice(0, 1).map((j) => (
                    <span key={j} className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-[9px] font-sans tracking-[0.12em] uppercase">
                      {journeyLabels[j] ?? j}
                    </span>
                  ))}
                </div>
                <h3 className="font-serif text-base text-foreground leading-snug mb-2 group-hover:text-sage transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="font-sans text-xs font-light text-muted-foreground leading-relaxed line-clamp-2">
                  {article.metaDescription}
                </p>
                <span className="inline-flex items-center gap-1.5 mt-4 text-muted-foreground/30 group-hover:text-sage transition-colors font-sans text-xs">
                  Read more <span className="font-serif text-base">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/guidance"
            className="inline-flex items-center gap-2 font-sans text-sm text-sage hover:text-sage-dark transition-colors"
          >
            Browse all guidance
            <span className="text-lg">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ArticleRelatedReads;
