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
}

const ArticleRelatedReads = ({ articles }: Props) => {
  if (articles.length === 0) return null;

  return (
    <section className="bg-white/40 py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-10 max-w-5xl">
        <div className="mb-12">
          <p className="stage-label mb-4">Related guidance</p>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight">
            You may also find helpful
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              to={`/articles/${article.slug}`}
              className="group block rounded-2xl p-6 md:p-7 bg-parchment border border-border/30 hover:border-sage/30 hover:shadow-md transition-all"
            >
              <div className="flex flex-wrap gap-2 mb-3">
                {article.isCornerstone && (
                  <span className="px-2 py-0.5 rounded-full bg-sage/10 text-sage text-[10px] font-sans tracking-wide uppercase">
                    Guide
                  </span>
                )}
                {article.journey?.slice(0, 1).map((j) => (
                  <span key={j} className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-[10px] font-sans tracking-wide uppercase">
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
            </Link>
          ))}
        </div>

        {/* Link to library */}
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
