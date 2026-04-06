import { useMemo } from "react";
import { Link } from "react-router-dom";
import { getAllArticles } from "@/data/articleData";

const GuidanceCompareGuides = () => {
  const compareArticles = useMemo(
    () => getAllArticles().filter((a) => a.compare),
    []
  );

  if (compareArticles.length === 0) return null;

  return (
    <section className="bg-card/60 py-16 sm:py-20 md:py-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div className="text-center mb-10 md:mb-14">
          <p className="stage-label mb-3">Compare guides</p>
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground leading-tight">
            Understand the differences that matter
          </h2>
          <p className="font-sans text-sm font-light text-muted-foreground mt-3 max-w-lg mx-auto leading-relaxed">
            Structured, clear comparisons for confusing topics.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {compareArticles.map((article) => (
            <Link
              key={article.slug}
              to={`/articles/${article.slug}`}
              className="group block rounded-2xl bg-parchment border border-border/30 hover:border-terracotta/20 hover:shadow-card-hover transition-all duration-300 overflow-hidden"
            >
              {/* Top accent */}
              <div className="h-[3px] bg-gradient-to-r from-terracotta/15 via-terracotta/35 to-terracotta/15" />

              <div className="p-6 sm:p-7">
                <span className="inline-block px-2.5 py-1 rounded-full bg-terracotta/8 text-terracotta/80 text-[10px] font-sans tracking-[0.12em] uppercase mb-4">
                  Compare
                </span>
                <h3 className="font-serif text-[15px] md:text-lg text-foreground leading-snug mb-2.5 group-hover:text-sage transition-colors">
                  {article.compare!.heading}
                </h3>
                <p className="font-sans text-xs font-light text-muted-foreground leading-relaxed line-clamp-2 mb-5">
                  {article.compare!.description}
                </p>

                {/* vs labels */}
                <div className="flex items-center gap-3 text-[11px] font-sans">
                  <span className="px-3 py-1.5 rounded-full bg-muted/60 text-muted-foreground truncate">
                    {article.compare!.items[0].label}
                  </span>
                  <span className="text-terracotta/50 font-medium text-xs">vs</span>
                  <span className="px-3 py-1.5 rounded-full bg-muted/60 text-muted-foreground truncate">
                    {article.compare!.items[1].label}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuidanceCompareGuides;
