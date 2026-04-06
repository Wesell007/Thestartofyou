import { Link } from "react-router-dom";
import { type ArticleData } from "@/data/articleData";
import featuredImg from "@/assets/guidance-featured-pregnancy.jpg";
import editorialImg2 from "@/assets/guidance-editorial-2.jpg";
import editorialImg3 from "@/assets/guidance-editorial-3.jpg";
import editorialImg4 from "@/assets/guidance-editorial-4.jpg";

const journeyLabels: Record<string, string> = {
  "trying-to-conceive": "Trying to conceive",
  pregnancy: "Pregnancy",
  ivf: "IVF",
  postpartum: "Postpartum",
  "first-year": "First year",
  "preparing-for-baby": "Preparing for baby",
  support: "Support",
};

// Rotate images for secondary cards
const secondaryImages = [editorialImg2, editorialImg3, editorialImg4];

interface Props {
  articles: ArticleData[];
}

const GuidanceFeaturedGuides = ({ articles }: Props) => {
  if (articles.length === 0) return null;

  const [featured, ...rest] = articles;

  return (
    <section className="bg-parchment py-16 sm:py-20 md:py-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div className="mb-10 md:mb-14">
          <div className="editorial-rule-left mb-5" />
          <p className="stage-label mb-3">In-depth guides</p>
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground leading-tight max-w-lg">
            Comprehensive guides for the topics that matter most
          </h2>
        </div>

        {/* Hero featured card — cinematic image + content */}
        <Link
          to={`/articles/${featured.slug}`}
          className="group block rounded-2xl overflow-hidden border border-border/30 hover:border-sage/20 bg-card shadow-soft hover:shadow-card-hover transition-all duration-400 mb-8"
        >
          <div className="md:flex">
            <div className="md:w-[45%] shrink-0">
              <div className="aspect-[16/10] md:aspect-auto md:h-full overflow-hidden">
                <img
                  src={featuredImg}
                  alt={featured.title}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                />
              </div>
            </div>

            <div className="flex-1 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-sage/10 text-sage text-[10px] font-sans tracking-[0.15em] uppercase font-medium">
                  Complete guide
                </span>
                {featured.journey?.slice(0, 1).map((j) => (
                  <span key={j} className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-[10px] font-sans tracking-[0.15em] uppercase">
                    {journeyLabels[j] ?? j}
                  </span>
                ))}
              </div>

              <h3 className="font-serif text-lg sm:text-xl md:text-2xl lg:text-[1.75rem] text-foreground leading-[1.2] mb-3 group-hover:text-sage transition-colors">
                {featured.title}
              </h3>

              <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed max-w-md mb-5">
                {featured.metaDescription}
              </p>

              {featured.keyTakeaways && (
                <div className="border-t border-border/30 pt-4 mb-5">
                  <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-sage/60 mb-2.5">Key points</p>
                  <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1.5">
                    {featured.keyTakeaways.slice(0, 4).map((t, i) => (
                      <li key={i} className="font-sans text-[11px] font-light text-muted-foreground leading-relaxed flex items-start gap-2">
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

        {/* Secondary cornerstone cards — now with images */}
        {rest.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((article, i) => (
              <Link
                key={article.slug}
                to={`/articles/${article.slug}`}
                className="group block rounded-2xl bg-card border border-border/30 hover:border-sage/20 hover:shadow-card-hover transition-all duration-300 overflow-hidden"
              >
                {/* Image thumbnail */}
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={secondaryImages[i % secondaryImages.length]}
                    alt={article.title}
                    loading="lazy"
                    width={800}
                    height={450}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-sage/10 text-sage text-[10px] font-sans tracking-[0.12em] uppercase">
                      Complete guide
                    </span>
                    {article.journey?.slice(0, 1).map((j) => (
                      <span key={j} className="px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground text-[10px] font-sans tracking-[0.12em] uppercase">
                        {journeyLabels[j] ?? j}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-serif text-[15px] md:text-base text-foreground leading-snug mb-2 group-hover:text-sage transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="font-sans text-xs font-light text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                    {article.metaDescription}
                  </p>

                  {article.reviewedBy && (
                    <p className="font-sans text-[10px] text-muted-foreground/50 mb-3">
                      Reviewed by {article.reviewedBy}
                    </p>
                  )}

                  <span className="inline-flex items-center gap-1.5 text-muted-foreground/40 group-hover:text-sage group-hover:gap-2.5 transition-all font-sans text-xs">
                    Read guide <span className="font-serif text-base">→</span>
                  </span>
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
