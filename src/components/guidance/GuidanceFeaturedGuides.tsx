import { Link } from "react-router-dom";
import { type ArticleData } from "@/data/articleData";

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

const GuidanceFeaturedGuides = ({ articles }: Props) => {
  if (articles.length === 0) return null;

  const [featured, ...rest] = articles;

  return (
    <section className="bg-card/60 py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-5xl">
        <div className="mb-16">
          <p className="stage-label mb-4">In-depth guides</p>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight max-w-lg">
            Comprehensive guides for the topics that matter most
          </h2>
        </div>

        {/* Hero featured card */}
        <Link
          to={`/articles/${featured.slug}`}
          className="group block rounded-2xl bg-gradient-to-br from-sage/[0.06] via-sage/[0.03] to-transparent border border-sage/12 hover:border-sage/25 hover:shadow-lg transition-all duration-300 mb-8"
        >
          <div className="p-8 md:p-12 md:flex md:gap-12 md:items-start">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="px-3 py-1 rounded-full bg-sage/10 text-sage text-[10px] font-sans tracking-[0.15em] uppercase font-medium">
                  Complete guide
                </span>
                {featured.journey?.slice(0, 1).map((j) => (
                  <span key={j} className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-[10px] font-sans tracking-[0.15em] uppercase">
                    {journeyLabels[j] ?? j}
                  </span>
                ))}
              </div>

              <h3 className="font-serif text-2xl md:text-3xl text-foreground leading-[1.15] mb-4 group-hover:text-sage transition-colors">
                {featured.title}
              </h3>

              <p className="font-sans text-base font-light text-muted-foreground leading-relaxed max-w-lg mb-6">
                {featured.metaDescription}
              </p>

              <span className="inline-flex items-center gap-2 font-sans text-sm text-sage group-hover:gap-3 transition-all">
                Read the full guide <span className="text-lg">→</span>
              </span>
            </div>

            {/* Key takeaways sidebar */}
            {featured.keyTakeaways && (
              <div className="mt-8 md:mt-0 md:w-72 shrink-0 border-t md:border-t-0 md:border-l border-sage/10 pt-6 md:pt-0 md:pl-10">
                <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-sage-muted mb-4">Key points</p>
                <ul className="space-y-3">
                  {featured.keyTakeaways.slice(0, 4).map((t, i) => (
                    <li key={i} className="font-sans text-sm font-light text-muted-foreground leading-relaxed flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-sage/30 shrink-0 mt-1.5" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Link>

        {/* Secondary cornerstone cards */}
        {rest.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6">
            {rest.map((article) => (
              <Link
                key={article.slug}
                to={`/articles/${article.slug}`}
                className="group block rounded-2xl p-7 md:p-9 bg-sage/[0.04] border border-sage/10 hover:border-sage/20 hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <span className="px-2.5 py-1 rounded-full bg-sage/10 text-sage text-[10px] font-sans tracking-[0.12em] uppercase">
                    Complete guide
                  </span>
                  {article.journey?.slice(0, 1).map((j) => (
                    <span key={j} className="px-2.5 py-1 rounded-full bg-muted text-muted-foreground text-[10px] font-sans tracking-[0.12em] uppercase">
                      {journeyLabels[j] ?? j}
                    </span>
                  ))}
                </div>

                <h3 className="font-serif text-lg md:text-xl text-foreground leading-snug mb-3 group-hover:text-sage transition-colors">
                  {article.title}
                </h3>

                <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                  {article.metaDescription}
                </p>

                {article.keyTakeaways && (
                  <div className="border-t border-sage/8 pt-4">
                    <ul className="space-y-1.5">
                      {article.keyTakeaways.slice(0, 2).map((t, i) => (
                        <li key={i} className="font-sans text-xs font-light text-muted-foreground leading-relaxed flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-sage/30 shrink-0 mt-1.5" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default GuidanceFeaturedGuides;
