import { Link } from "react-router-dom";
import { type ArticleData } from "@/data/articleData";
import featuredImg from "@/assets/guidance-featured-pregnancy.jpg";

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
    <section className="bg-card/60 py-20 md:py-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div className="mb-12 md:mb-16">
          <div className="editorial-rule-left mb-5" />
          <p className="stage-label mb-3">In-depth guides</p>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight max-w-lg">
            Comprehensive guides for the topics that matter most
          </h2>
        </div>

        {/* Hero featured card with image */}
        <Link
          to={`/articles/${featured.slug}`}
          className="group block rounded-2xl bg-gradient-to-br from-sage/[0.06] via-sage/[0.03] to-transparent border border-sage/12 hover:border-sage/25 hover:shadow-lg transition-all duration-300 mb-8 overflow-hidden"
        >
          <div className="md:flex">
            {/* Image column */}
            <div className="md:w-[40%] lg:w-[35%] shrink-0">
              <div className="aspect-[4/3] md:aspect-auto md:h-full overflow-hidden">
                <img
                  src={featuredImg}
                  alt={featured.title}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Content column */}
            <div className="flex-1 p-7 sm:p-8 md:p-10 lg:p-12">
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className="px-3 py-1 rounded-full bg-sage/10 text-sage text-[10px] font-sans tracking-[0.15em] uppercase font-medium">
                  Complete guide
                </span>
                {featured.journey?.slice(0, 1).map((j) => (
                  <span key={j} className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-[10px] font-sans tracking-[0.15em] uppercase">
                    {journeyLabels[j] ?? j}
                  </span>
                ))}
              </div>

              <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground leading-[1.15] mb-4 group-hover:text-sage transition-colors">
                {featured.title}
              </h3>

              <p className="font-sans text-sm sm:text-base font-light text-muted-foreground leading-relaxed max-w-lg mb-6">
                {featured.metaDescription}
              </p>

              {/* Key takeaways inline */}
              {featured.keyTakeaways && (
                <div className="border-t border-sage/10 pt-5 mb-6">
                  <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-sage/60 mb-3">Key points</p>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {featured.keyTakeaways.slice(0, 4).map((t, i) => (
                      <li key={i} className="font-sans text-xs font-light text-muted-foreground leading-relaxed flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-sage/30 shrink-0 mt-1.5" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <span className="inline-flex items-center gap-2 font-sans text-sm text-sage group-hover:gap-3 transition-all">
                Read the full guide <span className="text-lg">→</span>
              </span>
            </div>
          </div>
        </Link>

        {/* Secondary cornerstone cards */}
        {rest.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((article) => (
              <Link
                key={article.slug}
                to={`/articles/${article.slug}`}
                className="group block rounded-2xl bg-parchment border border-border/30 hover:border-sage/20 hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <div className="p-6 md:p-7">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-sage/10 text-sage text-[10px] font-sans tracking-[0.12em] uppercase">
                      Complete guide
                    </span>
                    {article.journey?.slice(0, 1).map((j) => (
                      <span key={j} className="px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground text-[10px] font-sans tracking-[0.12em] uppercase">
                        {journeyLabels[j] ?? j}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-serif text-base md:text-lg text-foreground leading-snug mb-2.5 group-hover:text-sage transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="font-sans text-xs font-light text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                    {article.metaDescription}
                  </p>

                  {article.keyTakeaways && (
                    <div className="border-t border-border/20 pt-3.5">
                      <ul className="space-y-1.5">
                        {article.keyTakeaways.slice(0, 2).map((t, i) => (
                          <li key={i} className="font-sans text-[11px] font-light text-muted-foreground leading-relaxed flex items-start gap-2">
                            <span className="w-1 h-1 rounded-full bg-sage/30 shrink-0 mt-1.5" />
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default GuidanceFeaturedGuides;
