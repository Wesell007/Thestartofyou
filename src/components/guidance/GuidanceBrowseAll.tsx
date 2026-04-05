import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  getAllArticles,
  getArticlesByJourney,
  getAllJourneys,
  type ArticleData,
} from "@/data/articleData";

const journeyLabels: Record<string, string> = {
  "trying-to-conceive": "Trying to conceive",
  pregnancy: "Pregnancy",
  ivf: "IVF",
  postpartum: "Postpartum",
  "first-year": "First year",
  "preparing-for-baby": "Preparing for baby",
  support: "Support",
};

const GuidanceBrowseAll = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const allArticles = useMemo(() => getAllArticles(), []);
  const journeys = useMemo(() => getAllJourneys(), []);

  const filtered = useMemo(() => {
    const base = activeFilter ? getArticlesByJourney(activeFilter) : allArticles;
    return base.filter((a) => !a.isCornerstone);
  }, [activeFilter, allArticles]);

  return (
    <section className="bg-card/60 py-20 md:py-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div className="mb-8 md:mb-10">
          <div className="editorial-rule-left mb-5" />
          <p className="stage-label mb-3">All guidance</p>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight">
            Browse all articles
          </h2>
          <p className="font-sans text-sm font-light text-muted-foreground mt-2 max-w-lg leading-relaxed">
            Every article in our guidance library, filterable by stage.
          </p>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2 mb-10 md:mb-12">
          <button
            onClick={() => setActiveFilter(null)}
            className={`px-4 py-2 rounded-full text-sm font-sans transition-all duration-200 ${
              !activeFilter
                ? "bg-foreground text-white shadow-sm"
                : "bg-card text-muted-foreground hover:text-foreground border border-border/40 hover:border-border/60"
            }`}
          >
            All
          </button>
          {journeys.map((j) => (
            <button
              key={j}
              onClick={() => setActiveFilter(j)}
              className={`px-4 py-2 rounded-full text-sm font-sans transition-all duration-200 ${
                activeFilter === j
                  ? "bg-foreground text-white shadow-sm"
                  : "bg-card text-muted-foreground hover:text-foreground border border-border/40 hover:border-border/60"
              }`}
            >
              {journeyLabels[j] ?? j}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="font-sans text-muted-foreground text-sm">
              No guidance articles found for this stage yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

const ArticleCard = ({ article }: { article: ArticleData }) => (
  <Link
    to={`/articles/${article.slug}`}
    className="group block rounded-2xl bg-parchment border border-border/30 hover:border-sage/20 hover:shadow-md transition-all duration-300 overflow-hidden"
  >
    <div className="p-6 md:p-7">
      <div className="flex flex-wrap gap-1.5 mb-3.5">
        {article.journey?.slice(0, 2).map((j) => (
          <span key={j} className="px-2 py-0.5 rounded-full bg-muted/60 text-muted-foreground text-[9px] font-sans tracking-[0.12em] uppercase">
            {journeyLabels[j] ?? j}
          </span>
        ))}
        {article.compare && (
          <span className="px-2 py-0.5 rounded-full bg-terracotta/8 text-terracotta/70 text-[9px] font-sans tracking-[0.12em] uppercase">
            Compare
          </span>
        )}
      </div>

      <h3 className="font-serif text-base md:text-lg text-foreground leading-snug mb-2 group-hover:text-sage transition-colors line-clamp-2">
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

      <span className="inline-flex items-center gap-1.5 text-muted-foreground/40 group-hover:text-sage group-hover:gap-2 transition-all font-sans text-xs">
        Read more <span className="font-serif text-base">→</span>
      </span>
    </div>
  </Link>
);

export default GuidanceBrowseAll;
