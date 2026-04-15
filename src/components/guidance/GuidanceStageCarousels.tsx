import { useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { getArticlesByJourney, type ArticleData } from "@/data/articleData";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TopicChip { label: string; topic: string; }
interface StageConfig { key: string; title: string; journeyFilter: string; hubHref: string; chips: TopicChip[]; }

const stages: StageConfig[] = [
  { key: "ttc", title: "Trying to conceive", journeyFilter: "trying-to-conceive", hubHref: "/trying-to-conceive",
    chips: [{ label: "Symptoms", topic: "symptoms" }, { label: "Timelines", topic: "timelines" }, { label: "Emotional wellbeing", topic: "emotional-wellbeing" }, { label: "Body changes", topic: "body-changes" }] },
  { key: "ivf", title: "IVF & fertility", journeyFilter: "ivf", hubHref: "/ivf",
    chips: [{ label: "Timelines", topic: "timelines" }, { label: "Emotional wellbeing", topic: "emotional-wellbeing" }, { label: "Safety & support", topic: "safety-and-support" }] },
  { key: "pregnancy", title: "Pregnancy", journeyFilter: "pregnancy", hubHref: "/pregnancy",
    chips: [{ label: "Symptoms", topic: "symptoms" }, { label: "Development", topic: "development" }, { label: "Body changes", topic: "body-changes" }, { label: "Safety & support", topic: "safety-and-support" }, { label: "Practical preparation", topic: "practical-preparation" }, { label: "Emotional wellbeing", topic: "emotional-wellbeing" }] },
  { key: "postpartum", title: "Postpartum", journeyFilter: "postpartum", hubHref: "/postpartum",
    chips: [{ label: "Body changes", topic: "body-changes" }, { label: "Emotional wellbeing", topic: "emotional-wellbeing" }, { label: "Timelines", topic: "timelines" }, { label: "Practical preparation", topic: "practical-preparation" }] },
  { key: "firstyear", title: "First year", journeyFilter: "first-year", hubHref: "/first-year",
    chips: [{ label: "Development", topic: "development" }, { label: "Timelines", topic: "timelines" }, { label: "Practical preparation", topic: "practical-preparation" }] },
];

const ArticleCard = ({ article }: { article: ArticleData }) => (
  <Link
    to={`/articles/${article.slug}`}
    className="group block rounded-2xl bg-card border border-border/30 hover:border-sage/20 hover:shadow-card-hover transition-all duration-300 overflow-hidden"
  >
    <div className="h-1 bg-gradient-to-r from-sage/40 to-sage/10" />
    <div className="p-5">
      <div className="flex flex-wrap gap-1.5 mb-3">
        {article.topics?.slice(0, 2).map((t) => (
          <span key={t} className="px-2 py-0.5 rounded-full bg-muted/60 text-muted-foreground text-[9px] font-sans tracking-[0.1em] uppercase">
            {t.replace(/-/g, " ")}
          </span>
        ))}
      </div>
      <h3 className="font-serif text-[14px] sm:text-[15px] text-foreground leading-snug mb-2 group-hover:text-sage transition-colors line-clamp-2">
        {article.title}
      </h3>
      <p className="font-sans text-xs font-light text-muted-foreground leading-relaxed line-clamp-2 mb-4">
        {article.metaDescription}
      </p>
      {article.reviewedBy && (
        <p className="font-sans text-[10px] text-muted-foreground/50 mb-3">✔ Reviewed by {article.reviewedBy}</p>
      )}
      <span className="inline-flex items-center gap-1.5 text-muted-foreground/40 group-hover:text-sage group-hover:gap-2 transition-all font-sans text-xs">
        Read more <span className="font-serif text-base">→</span>
      </span>
    </div>
  </Link>
);

const ScrollCarousel = ({ articles }: { articles: ArticleData[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: "left" | "right") => {
    ref.current?.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  return (
    <div className="relative group/carousel">
      <div
        ref={ref}
        className="flex gap-4 pb-2 overflow-x-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
      >
        {articles.map((a) => (
          <div key={a.slug} className="w-[260px] sm:w-[280px] md:w-[300px] flex-none">
            <ArticleCard article={a} />
          </div>
        ))}
      </div>
      {articles.length > 3 && (
        <>
          <button onClick={() => scroll("left")} className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-card border border-border/40 shadow-sm items-center justify-center text-muted-foreground hover:text-foreground transition-all opacity-0 group-hover/carousel:opacity-100" aria-label="Scroll left">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={() => scroll("right")} className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-card border border-border/40 shadow-sm items-center justify-center text-muted-foreground hover:text-foreground transition-all opacity-0 group-hover/carousel:opacity-100" aria-label="Scroll right">
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}
    </div>
  );
};

const StageSection = ({ stage }: { stage: StageConfig }) => {
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const allArticles = useMemo(() => getArticlesByJourney(stage.journeyFilter), [stage.journeyFilter]);
  const filtered = useMemo(() => {
    if (!activeTopic) return allArticles;
    return allArticles.filter((a) => a.topics?.includes(activeTopic));
  }, [activeTopic, allArticles]);

  if (allArticles.length === 0) return null;

  const activeChips = stage.chips.filter((chip) => allArticles.some((a) => a.topics?.includes(chip.topic)));

  return (
    <div className="py-12 sm:py-14 md:py-16">
      <div className="flex items-end justify-between mb-5 sm:mb-6">
        <h2 className="font-serif text-xl sm:text-2xl md:text-[1.7rem] text-foreground leading-tight">{stage.title}</h2>
        <Link to={stage.hubHref} className="hidden sm:inline-flex items-center gap-1.5 font-sans text-xs text-sage hover:text-sage-dark transition-colors shrink-0 ml-6">
          View all <span>→</span>
        </Link>
      </div>

      {activeChips.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6 sm:mb-7">
          <button onClick={() => setActiveTopic(null)} className={`px-3.5 py-1.5 rounded-full text-xs font-sans transition-all duration-200 ${!activeTopic ? "bg-sage text-white shadow-sm" : "bg-card text-muted-foreground hover:text-foreground border border-border/40 hover:border-border/60"}`}>All</button>
          {activeChips.map((chip) => (
            <button key={chip.topic} onClick={() => setActiveTopic(activeTopic === chip.topic ? null : chip.topic)} className={`px-3.5 py-1.5 rounded-full text-xs font-sans transition-all duration-200 ${activeTopic === chip.topic ? "bg-sage text-white shadow-sm" : "bg-card text-muted-foreground hover:text-foreground border border-border/40 hover:border-border/60"}`}>{chip.label}</button>
          ))}
        </div>
      )}

      {filtered.length > 0 ? (
        <ScrollCarousel articles={filtered} />
      ) : (
        <p className="font-sans text-sm text-muted-foreground/60 py-8">No articles match this topic yet.</p>
      )}

      <Link to={stage.hubHref} className="sm:hidden inline-flex items-center gap-1.5 font-sans text-xs text-sage hover:text-sage-dark transition-colors mt-4">
        View all {stage.title.toLowerCase()} guidance <span>→</span>
      </Link>
    </div>
  );
};

const GuidanceStageCarousels = () => (
  <section className="bg-parchment py-16 sm:py-20 md:py-28">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="mb-8">
        <div className="editorial-rule-left mb-5" />
        <p className="stage-label mb-3">Browse by stage</p>
        <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground leading-tight max-w-md">
          Guidance for every part of your journey
        </h2>
        <p className="font-sans text-sm font-light text-muted-foreground mt-3 max-w-lg leading-relaxed">
          Find trusted answers organised around the stage you're in right now.
        </p>
      </div>

      {stages.map((stage, i) => (
        <div key={stage.key}>
          {i > 0 && <div className="border-t border-border/20" />}
          <StageSection stage={stage} />
        </div>
      ))}
    </div>
  </section>
);

export default GuidanceStageCarousels;
