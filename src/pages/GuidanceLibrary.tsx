import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  getAllArticles,
  getCornerstoneArticles,
  getArticlesByJourney,
  getArticlesByTopic,
  getAllJourneys,
  getAllTopics,
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

const topicLabels: Record<string, string> = {
  symptoms: "Symptoms",
  "body-changes": "Body changes",
  timelines: "Timelines",
  development: "Development",
  "emotional-wellbeing": "Emotional wellbeing",
  "practical-preparation": "Practical preparation",
  "safety-and-support": "Safety and support",
};

// Curated topic sections for the library
const topicSections = [
  {
    id: "early-pregnancy",
    label: "Early pregnancy",
    description: "Symptoms, changes, and what to expect in the first weeks",
    journeyFilter: "pregnancy",
  },
  {
    id: "fertility",
    label: "Fertility and conception",
    description: "Understanding your cycle, timing, and the path to pregnancy",
    journeyFilter: "trying-to-conceive",
  },
  {
    id: "ivf-treatment",
    label: "IVF and fertility treatment",
    description: "What to expect, timelines, and emotional support through treatment",
    journeyFilter: "ivf",
  },
  {
    id: "postpartum-firstyear",
    label: "Postpartum and first year",
    description: "Recovery, adjustment, baby development, and finding your rhythm",
    journeyFilter: "postpartum",
  },
];

const GuidanceLibrary = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const allArticles = useMemo(() => getAllArticles(), []);
  const cornerstones = useMemo(() => getCornerstoneArticles(), []);
  const journeys = useMemo(() => getAllJourneys(), []);

  const filteredArticles = useMemo(() => {
    if (!activeFilter) return allArticles;
    return getArticlesByJourney(activeFilter);
  }, [activeFilter, allArticles]);

  const shortArticles = useMemo(
    () => filteredArticles.filter((a) => !a.isCornerstone),
    [filteredArticles]
  );

  // Popular questions from FAQ data across all articles
  const popularQuestions = useMemo(() => {
    const questions: Array<{ question: string; slug: string }> = [];
    allArticles.forEach((a) => {
      a.faq?.slice(0, 1).forEach((f) => {
        questions.push({ question: f.question, slug: a.slug });
      });
    });
    return questions.slice(0, 6);
  }, [allArticles]);

  // Compare articles
  const compareArticles = useMemo(
    () => allArticles.filter((a) => a.compare),
    [allArticles]
  );

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />

      <main>
        {/* ─── Hero ─── */}
        <section className="bg-parchment pt-32 pb-16 md:pt-40 md:pb-24">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <nav className="flex items-center gap-2 mb-10 font-sans text-[11px] font-light text-muted-foreground tracking-wide">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <span className="opacity-40">/</span>
              <span className="text-foreground">Guidance</span>
            </nav>

            <div className="max-w-2xl">
              <p className="stage-label mb-5">Guidance library</p>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-[3.5rem] text-foreground leading-[1.08] tracking-tight">
                Calm, clear guidance for every stage
              </h1>
              <p className="font-sans text-lg font-light text-muted-foreground mt-6 max-w-xl leading-relaxed">
                Structured answers and in-depth guides across your full journey. Browse by stage, explore popular questions, or find comparison guides.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Cornerstone / In-Depth Guides ─── */}
        {cornerstones.length > 0 && (
          <section className="bg-white/40 py-20 md:py-28">
            <div className="container mx-auto px-6 md:px-10 max-w-5xl">
              <div className="mb-14">
                <p className="stage-label mb-4">In-depth guides</p>
                <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight max-w-lg">
                  Comprehensive guides for the topics that matter most
                </h2>
                <p className="font-sans text-base font-light text-muted-foreground mt-3 max-w-xl leading-relaxed">
                  Deeper, more detailed coverage of the subjects people search for most.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {cornerstones.map((article) => (
                  <CornerstoneCard key={article.slug} article={article} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── Popular Questions ─── */}
        {popularQuestions.length > 0 && (
          <section className="bg-parchment py-20 md:py-28">
            <div className="container mx-auto px-6 md:px-10 max-w-4xl">
              <div className="mb-14">
                <p className="stage-label mb-4">Popular questions</p>
                <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight">
                  Questions people ask most often
                </h2>
              </div>
              <div className="divide-y divide-border/40">
                {popularQuestions.map((q, i) => (
                  <Link
                    key={i}
                    to={`/articles/${q.slug}`}
                    className="group flex items-center justify-between py-5 hover:pl-2 transition-all"
                  >
                    <span className="font-serif text-lg text-foreground leading-snug group-hover:text-sage transition-colors">
                      {q.question}
                    </span>
                    <span className="text-muted-foreground/40 group-hover:text-sage transition-colors ml-6 shrink-0 font-serif text-xl">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── Compare Guides ─── */}
        {compareArticles.length > 0 && (
          <section className="bg-white/40 py-20 md:py-28">
            <div className="container mx-auto px-6 md:px-10 max-w-5xl">
              <div className="mb-14">
                <p className="stage-label mb-4">Compare guides</p>
                <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight max-w-lg">
                  Understand the differences that matter
                </h2>
                <p className="font-sans text-base font-light text-muted-foreground mt-3 max-w-xl leading-relaxed">
                  Clear, structured comparisons for the topics people find most confusing.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {compareArticles.map((article) => (
                  <Link
                    key={article.slug}
                    to={`/articles/${article.slug}`}
                    className="group block rounded-2xl p-6 md:p-7 bg-parchment border border-border/30 hover:border-sage/25 hover:shadow-md transition-all"
                  >
                    <span className="inline-block px-2.5 py-1 rounded-full bg-terracotta/8 text-terracotta/80 text-[10px] font-sans tracking-wide uppercase mb-4">
                      Compare
                    </span>
                    <h3 className="font-serif text-base md:text-lg text-foreground leading-snug mb-2 group-hover:text-sage transition-colors">
                      {article.compare!.heading}
                    </h3>
                    <p className="font-sans text-xs font-light text-muted-foreground leading-relaxed line-clamp-2">
                      {article.compare!.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── Browse by Stage ─── */}
        <section className="bg-parchment py-20 md:py-28">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <div className="mb-10">
              <p className="stage-label mb-4">Browse by stage</p>
              <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight">
                All guidance articles
              </h2>
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
              {journeys.map((j) => (
                <button
                  key={j}
                  onClick={() => setActiveFilter(j)}
                  className={`px-4 py-2 rounded-full text-sm font-sans transition-all ${
                    activeFilter === j
                      ? "bg-foreground text-white"
                      : "bg-white/60 text-muted-foreground hover:bg-white border border-border/30"
                  }`}
                >
                  {journeyLabels[j] ?? j}
                </button>
              ))}
            </div>

            {/* Articles grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shortArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>

            {shortArticles.length === 0 && (
              <div className="text-center py-16">
                <p className="font-sans text-muted-foreground">No guidance articles found for this stage yet.</p>
              </div>
            )}
          </div>
        </section>

        {/* ─── AI Bridge ─── */}
        <section className="bg-white/40 py-20 md:py-28">
          <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center">
            <p className="stage-label mb-5">Can't find what you need?</p>
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-4">
              Ask a question directly
            </h2>
            <p className="font-sans text-base font-light text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
              Our AI support is designed to give you calm, clear, stage-aware answers to whatever you are wondering about.
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

        {/* ─── Journey Pathways ─── */}
        <section className="bg-parchment py-20 md:py-28">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <div className="mb-14 text-center">
              <p className="stage-label mb-4">Continue your journey</p>
              <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight">
                Explore by stage
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { label: "Trying to conceive", href: "/trying-to-conceive" },
                { label: "IVF", href: "/ivf" },
                { label: "Pregnancy", href: "/pregnancy" },
                { label: "Postpartum", href: "/postpartum" },
                { label: "First year", href: "/first-year" },
              ].map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="group block rounded-xl p-5 bg-white/60 border border-border/30 hover:border-sage/25 hover:shadow-sm transition-all text-center"
                >
                  <span className="font-serif text-sm text-foreground group-hover:text-sage transition-colors">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

// ─── Card Components ──────────────────────────────────────────────────────

const CornerstoneCard = ({ article }: { article: ArticleData }) => (
  <Link
    to={`/articles/${article.slug}`}
    className="group block rounded-2xl p-7 md:p-9 bg-sage/5 border border-sage/12 hover:border-sage/25 hover:shadow-md transition-all"
  >
    <div className="flex flex-wrap items-center gap-2 mb-5">
      <span className="px-2.5 py-1 rounded-full bg-sage/10 text-sage text-[10px] font-sans tracking-wide uppercase">
        Complete guide
      </span>
      {article.journey?.slice(0, 1).map((j) => (
        <span key={j} className="px-2.5 py-1 rounded-full bg-muted text-muted-foreground text-[10px] font-sans tracking-wide uppercase">
          {journeyLabels[j] ?? j}
        </span>
      ))}
    </div>

    <h3 className="font-serif text-xl md:text-2xl text-foreground leading-snug mb-3 group-hover:text-sage transition-colors">
      {article.title}
    </h3>

    <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed line-clamp-2 mb-5">
      {article.metaDescription}
    </p>

    {/* Key takeaways preview */}
    {article.keyTakeaways && (
      <div className="border-t border-sage/10 pt-4 mt-1">
        <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-sage-muted mb-2">Key points</p>
        <ul className="space-y-1.5">
          {article.keyTakeaways.slice(0, 3).map((t, i) => (
            <li key={i} className="font-sans text-xs font-light text-muted-foreground leading-relaxed flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-sage/40 shrink-0 mt-1.5" />
              {t}
            </li>
          ))}
        </ul>
      </div>
    )}
  </Link>
);

const ArticleCard = ({ article }: { article: ArticleData }) => (
  <Link
    to={`/articles/${article.slug}`}
    className="group block rounded-2xl p-6 md:p-7 bg-white/60 border border-border/30 hover:border-border/50 hover:shadow-md transition-all"
  >
    <div className="flex flex-wrap gap-2 mb-4">
      {article.journey?.slice(0, 2).map((j) => (
        <span key={j} className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-[10px] font-sans tracking-wide uppercase">
          {journeyLabels[j] ?? j}
        </span>
      ))}
      {article.compare && (
        <span className="px-2 py-0.5 rounded-full bg-terracotta/8 text-terracotta/70 text-[10px] font-sans tracking-wide uppercase">
          Compare
        </span>
      )}
    </div>

    <h3 className="font-serif text-base md:text-lg text-foreground leading-snug mb-2 group-hover:text-sage transition-colors line-clamp-2">
      {article.title}
    </h3>

    <p className="font-sans text-xs font-light text-muted-foreground leading-relaxed line-clamp-2">
      {article.metaDescription}
    </p>

    <span className="inline-block mt-4 text-muted-foreground/40 group-hover:text-sage transition-colors font-serif text-lg">
      →
    </span>
  </Link>
);

export default GuidanceLibrary;
