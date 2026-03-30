import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getAllArticles, getCornerstoneArticles, getArticlesByJourney, getArticlesByTopic, getAllJourneys, getAllTopics, type ArticleData } from "@/data/articleData";

const journeyLabels: Record<string, string> = {
  "trying-to-conceive": "Trying to conceive",
  pregnancy: "Pregnancy",
  ivf: "IVF",
  postpartum: "Postpartum",
  "first-year": "First year",
  "preparing-for-baby": "Preparing for baby",
  support: "Support",
};

const topicLabels: Record<string, string> = {
  symptoms: "Symptoms",
  "body-changes": "Body changes",
  timelines: "Timelines",
  development: "Development",
  "emotional-wellbeing": "Emotional wellbeing",
  "practical-preparation": "Practical preparation",
  "safety-and-support": "Safety and support",
};

const GuidanceLibrary = () => {
  const [filterMode, setFilterMode] = useState<"journey" | "topic">("journey");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const allArticles = useMemo(() => getAllArticles(), []);
  const cornerstones = useMemo(() => getCornerstoneArticles(), []);
  const journeys = useMemo(() => getAllJourneys(), []);
  const topics = useMemo(() => getAllTopics(), []);

  const filteredArticles = useMemo(() => {
    if (!activeFilter) return allArticles;
    if (filterMode === "journey") return getArticlesByJourney(activeFilter);
    return getArticlesByTopic(activeFilter);
  }, [activeFilter, filterMode, allArticles]);

  const filters = filterMode === "journey" ? journeys : topics;
  const labels = filterMode === "journey" ? journeyLabels : topicLabels;

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="bg-parchment pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="container mx-auto px-6 md:px-10 max-w-4xl">
            <p className="stage-label mb-5">Guidance library</p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-foreground leading-[1.1] max-w-2xl">
              Calm, clear guidance for every stage
            </h1>
            <p className="font-sans text-lg font-light text-muted-foreground mt-6 max-w-xl leading-relaxed">
              Structured answers, practical support, and deeper articles across your full journey. Browse by stage or by topic.
            </p>
          </div>
        </section>

        {/* Cornerstone articles */}
        {cornerstones.length > 0 && (
          <section className="bg-white/40 py-20 md:py-28">
            <div className="container mx-auto px-6 md:px-10 max-w-5xl">
              <div className="mb-12">
                <p className="stage-label mb-4">In-depth guides</p>
                <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight">
                  Comprehensive guides for major topics
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {cornerstones.map((article) => (
                  <ArticleCard key={article.slug} article={article} isCornerstone />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Filters */}
        <section className="bg-parchment py-20 md:py-28">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            {/* Mode toggle */}
            <div className="flex items-center gap-6 mb-10">
              <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-muted-foreground">
                Browse by
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => { setFilterMode("journey"); setActiveFilter(null); }}
                  className={`px-4 py-2 rounded-full text-sm font-sans transition-all ${
                    filterMode === "journey"
                      ? "bg-sage text-white"
                      : "bg-white/60 text-muted-foreground hover:bg-white"
                  }`}
                >
                  Stage
                </button>
                <button
                  onClick={() => { setFilterMode("topic"); setActiveFilter(null); }}
                  className={`px-4 py-2 rounded-full text-sm font-sans transition-all ${
                    filterMode === "topic"
                      ? "bg-sage text-white"
                      : "bg-white/60 text-muted-foreground hover:bg-white"
                  }`}
                >
                  Topic
                </button>
              </div>
            </div>

            {/* Filter chips */}
            <div className="flex flex-wrap gap-2 mb-12">
              <button
                onClick={() => setActiveFilter(null)}
                className={`px-4 py-2 rounded-full text-sm font-sans transition-all ${
                  !activeFilter
                    ? "bg-foreground text-white"
                    : "bg-white/60 text-muted-foreground hover:bg-white border border-border/30"
                }`}
              >
                All
              </button>
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-2 rounded-full text-sm font-sans transition-all ${
                    activeFilter === f
                      ? "bg-foreground text-white"
                      : "bg-white/60 text-muted-foreground hover:bg-white border border-border/30"
                  }`}
                >
                  {labels[f] ?? f}
                </button>
              ))}
            </div>

            {/* Articles grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="text-center py-16">
                <p className="font-sans text-muted-foreground">No articles found for this filter.</p>
              </div>
            )}
          </div>
        </section>

        {/* AI bridge */}
        <section className="bg-white/40 py-20 md:py-28">
          <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center">
            <p className="stage-label mb-5">Can't find what you need?</p>
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-4">
              Ask a question directly
            </h2>
            <p className="font-sans text-base font-light text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
              Our AI support is designed to give you calm, clear, stage-aware answers to whatever you're wondering about.
            </p>
            <Link
              to="/ask"
              className="inline-flex items-center gap-2 bg-sage text-white px-8 py-3.5 rounded-full font-sans text-sm hover:bg-sage-dark transition-colors"
            >
              Ask a question
              <span>→</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const ArticleCard = ({ article, isCornerstone = false }: { article: ArticleData; isCornerstone?: boolean }) => (
  <Link
    to={`/articles/${article.slug}`}
    className={`group block rounded-2xl p-6 md:p-8 transition-all hover:shadow-md ${
      isCornerstone
        ? "bg-sage/5 border border-sage/15 hover:border-sage/30"
        : "bg-white/60 border border-border/30 hover:border-border/50"
    }`}
  >
    {/* Tags */}
    <div className="flex flex-wrap gap-2 mb-4">
      {isCornerstone && (
        <span className="px-2.5 py-1 rounded-full bg-sage/10 text-sage text-[11px] font-sans tracking-wide uppercase">
          Complete guide
        </span>
      )}
      {article.journey?.slice(0, 2).map((j) => (
        <span key={j} className="px-2.5 py-1 rounded-full bg-muted text-muted-foreground text-[11px] font-sans tracking-wide uppercase">
          {journeyLabels[j] ?? j}
        </span>
      ))}
    </div>

    {/* Title */}
    <h3 className="font-serif text-lg md:text-xl text-foreground leading-snug mb-3 group-hover:text-sage transition-colors">
      {article.title}
    </h3>

    {/* Description */}
    <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed line-clamp-2">
      {article.metaDescription}
    </p>

    {/* Arrow */}
    <span className="inline-block mt-4 text-muted-foreground/40 group-hover:text-sage transition-colors font-serif text-xl">
      →
    </span>
  </Link>
);

export default GuidanceLibrary;
