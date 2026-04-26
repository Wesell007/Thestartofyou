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
  variant?: "legacy" | "calm";
}

const truncate = (s: string, n: number) =>
  s.length <= n ? s : s.slice(0, n - 1).trimEnd() + "…";

const ArticleRelatedReads = ({ articles, isDeep, variant = "legacy" }: Props) => {
  if (articles.length === 0) return null;

  // ── calm variant: vertical editorial list, up to 3, no padding, no chrome ──
  if (variant === "calm") {
    return (
      <section className="bg-parchment py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="h-px w-8 bg-sage-light" />
            <p className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-sage-muted">
              Continue reading
            </p>
          </div>

          <ul className="divide-y divide-border/30">
            {articles.slice(0, 3).map((article) => (
              <li key={article.slug} className="py-5 sm:py-6 first:pt-0 last:pb-0">
                <Link
                  to={`/articles/${article.slug}`}
                  className="group block"
                >
                  <h3 className="font-serif text-[17px] sm:text-[19px] md:text-[20px] text-foreground leading-snug group-hover:text-sage transition-colors">
                    {article.title}
                  </h3>
                  <p className="mt-2 font-serif italic text-[13px] sm:text-[14px] text-foreground/60 leading-relaxed max-w-2xl">
                    {truncate(article.metaDescription, 130)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  // ── legacy variant (unchanged) ──
  return (
    <section className="bg-parchment py-10 sm:py-14 md:py-18">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-sage-light" />
            <p className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-sage-muted">
              Keep reading
            </p>
          </div>
          <h2 className="font-serif text-xl sm:text-2xl text-foreground leading-snug">
            {isDeep ? 'Related guides and articles' : 'You may also find helpful'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {articles.map((article) => (
            <Link
              key={article.slug}
              to={`/articles/${article.slug}`}
              className="group block rounded-xl bg-card border border-border/25 hover:border-sage/20 hover:shadow-soft transition-all duration-300 overflow-hidden"
            >
              {article.isCornerstone && (
                <div className="h-0.5 bg-gradient-to-r from-sage/15 via-sage/30 to-sage/15" />
              )}
              <div className="p-5">
                <div className="flex flex-wrap gap-1.5 mb-2.5">
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
                <h3 className="font-serif text-[15px] text-foreground leading-snug mb-1.5 group-hover:text-sage transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="font-sans text-[12px] font-light text-muted-foreground leading-relaxed line-clamp-2">
                  {article.metaDescription}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/guidance"
            className="inline-flex items-center gap-2 font-sans text-[13px] text-sage hover:text-foreground transition-colors"
          >
            Browse all guidance
            <span className="text-base">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ArticleRelatedReads;
