import { useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GuidanceHero from "@/components/guidance/GuidanceHero";
import GuidanceAIBridge from "@/components/guidance/GuidanceAIBridge";
import { getArticlesByJourney, type ArticleData } from "@/data/articleData";

import imgSymptoms from "@/assets/guidance-card-symptoms.jpg";
import imgDevelopment from "@/assets/guidance-card-development.jpg";
import imgBody from "@/assets/guidance-card-body.jpg";
import imgEmotional from "@/assets/guidance-card-emotional.jpg";
import imgPractical from "@/assets/guidance-card-practical.jpg";
import imgTimelines from "@/assets/guidance-card-timelines.jpg";
import imgSafety from "@/assets/guidance-card-safety.jpg";

/* ── Topic → image map ──────────────────────────── */

const topicImages: Record<string, string> = {
  symptoms: imgSymptoms,
  development: imgDevelopment,
  "body-changes": imgBody,
  "emotional-wellbeing": imgEmotional,
  "practical-preparation": imgPractical,
  timelines: imgTimelines,
  "safety-and-support": imgSafety,
};

function getCardImage(article: ArticleData): string {
  const topic = article.topics?.[0];
  if (topic && topicImages[topic]) return topicImages[topic];
  return imgSymptoms; // fallback
}

/* ── Stage config ───────────────────────────────────── */

const stages = [
  { key: "ttc", title: "Trying to conceive", filter: "trying-to-conceive", href: "/trying-to-conceive",
    accent: "var(--stage-ttc-accent)",
    chips: ["symptoms", "timelines", "emotional-wellbeing", "body-changes"] },
  { key: "ivf", title: "IVF & fertility", filter: "ivf", href: "/ivf",
    accent: "var(--stage-ivf-accent)",
    chips: ["timelines", "emotional-wellbeing", "safety-and-support"] },
  { key: "pregnancy", title: "Pregnancy", filter: "pregnancy", href: "/pregnancy",
    accent: "var(--stage-pregnancy-accent)",
    chips: ["symptoms", "development", "body-changes", "safety-and-support", "practical-preparation", "emotional-wellbeing"] },
  { key: "postpartum", title: "Postpartum", filter: "postpartum", href: "/postpartum",
    accent: "var(--stage-postpartum-accent)",
    chips: ["body-changes", "emotional-wellbeing", "timelines", "practical-preparation"] },
  { key: "firstyear", title: "First year", filter: "first-year", href: "/first-year",
    accent: "var(--stage-firstyear-accent)",
    chips: ["development", "timelines", "practical-preparation"] },
];

/* ── Card ───────────────────────────────────────────── */

function Card({ article, accent }: { article: ArticleData; accent: string }) {
  const img = getCardImage(article);
  return (
    <Link
      to={`/articles/${article.slug}`}
      className="group block min-w-[260px] sm:min-w-[280px] md:min-w-0 w-[280px] sm:w-[300px] md:w-auto rounded-2xl bg-card border border-border/30 hover:border-sage/20 hover:shadow-card-hover transition-all duration-300 overflow-hidden flex-shrink-0 snap-start"
    >
      {/* Image */}
      <div className="relative h-36 sm:h-40 overflow-hidden">
        <img
          src={img}
          alt={article.title}
          loading="lazy"
          width={768}
          height={512}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
        {/* Stage accent line */}
        <div className="absolute bottom-0 left-0 w-full h-[3px]" style={{ background: `hsl(${accent})` }} />
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex flex-wrap gap-1.5 mb-2.5">
          {article.topics?.slice(0, 2).map((t) => (
            <span key={t} className="px-2 py-0.5 rounded-full bg-muted/60 text-muted-foreground text-[9px] font-sans tracking-[0.1em] uppercase">
              {t.replace(/-/g, " ")}
            </span>
          ))}
        </div>
        <h3 className="font-serif text-[14px] sm:text-[15px] text-foreground leading-snug mb-2 group-hover:text-sage transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="font-sans text-xs font-light text-muted-foreground leading-relaxed line-clamp-2 mb-3">
          {article.metaDescription}
        </p>
        {article.reviewedBy && (
          <p className="font-sans text-[10px] text-muted-foreground/50 mb-2">✔ Reviewed by {article.reviewedBy}</p>
        )}
        <span className="inline-flex items-center gap-1.5 text-muted-foreground/40 group-hover:text-sage group-hover:gap-2 transition-all font-sans text-xs">
          Read more <span className="font-serif text-base">→</span>
        </span>
      </div>
    </Link>
  );
}

/* ── Carousel with scroll arrows ────────────────────── */

function CarouselRow({ articles, accent }: { articles: ArticleData[]; accent: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <div className="relative group/carousel">
      {/* Left arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 hidden md:flex w-9 h-9 items-center justify-center rounded-full bg-card border border-border/40 shadow-soft text-muted-foreground hover:text-foreground opacity-0 group-hover/carousel:opacity-100 transition-opacity"
        aria-label="Scroll left"
      >
        ←
      </button>
      {/* Right arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 hidden md:flex w-9 h-9 items-center justify-center rounded-full bg-card border border-border/40 shadow-soft text-muted-foreground hover:text-foreground opacity-0 group-hover/carousel:opacity-100 transition-opacity"
        aria-label="Scroll right"
      >
        →
      </button>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2 md:grid md:grid-cols-3 md:overflow-visible md:snap-none"
      >
        {articles.map((a) => (
          <Card key={a.slug} article={a} accent={accent} />
        ))}
      </div>
    </div>
  );
}

/* ── Stage section ──────────────────────────────────── */

function StageSection({ stage }: { stage: typeof stages[0] }) {
  const [active, setActive] = useState<string | null>(null);
  const all = useMemo(() => getArticlesByJourney(stage.filter), [stage.filter]);
  const filtered = useMemo(() => {
    if (!active) return all;
    return all.filter((a) => a.topics?.includes(active));
  }, [active, all]);
  const validChips = stage.chips.filter((c) => all.some((a) => a.topics?.includes(c)));

  if (all.length === 0) return null;

  return (
    <div className="py-10 sm:py-12 md:py-14">
      {/* Section header */}
      <div className="flex items-end justify-between mb-4 sm:mb-5">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 rounded-full" style={{ background: `hsl(${stage.accent})` }} />
          <h2 className="font-serif text-xl sm:text-2xl md:text-[1.7rem] text-foreground leading-tight">{stage.title}</h2>
        </div>
        <Link to={stage.href} className="hidden sm:inline-flex items-center gap-1.5 font-sans text-xs text-sage hover:text-sage-dark transition-colors">
          View all <span>→</span>
        </Link>
      </div>

      {/* Topic chips */}
      {validChips.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5 sm:mb-6">
          <button onClick={() => setActive(null)} className={`px-3.5 py-1.5 rounded-full text-xs font-sans transition-all duration-200 ${!active ? "bg-sage text-white shadow-sm" : "bg-card text-muted-foreground hover:text-foreground border border-border/40"}`}>All</button>
          {validChips.map((c) => (
            <button key={c} onClick={() => setActive(active === c ? null : c)} className={`px-3.5 py-1.5 rounded-full text-xs font-sans transition-all duration-200 ${active === c ? "bg-sage text-white shadow-sm" : "bg-card text-muted-foreground hover:text-foreground border border-border/40"}`}>
              {c.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </button>
          ))}
        </div>
      )}

      {/* Cards */}
      {filtered.length > 0 ? (
        <CarouselRow articles={filtered.slice(0, 6)} accent={stage.accent} />
      ) : (
        <p className="font-sans text-sm text-muted-foreground/60 py-8">No articles match this topic yet.</p>
      )}

      <Link to={stage.href} className="sm:hidden inline-flex items-center gap-1.5 font-sans text-xs text-sage hover:text-sage-dark transition-colors mt-3">
        View all {stage.title.toLowerCase()} guidance <span>→</span>
      </Link>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────── */

const GuidanceLibrary = () => {
  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />
      <main>
        <GuidanceHero />

        <section className="bg-parchment pt-10 sm:pt-14 md:pt-16 pb-16 sm:pb-20 md:pb-28">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
            <div className="mb-6 sm:mb-8">
              <div className="editorial-rule-left mb-4" />
              <p className="stage-label mb-2">Browse by stage</p>
              <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground leading-tight max-w-md">
                Guidance for every part of your journey
              </h2>
              <p className="font-sans text-sm font-light text-muted-foreground mt-2.5 max-w-lg leading-relaxed">
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

        <GuidanceAIBridge />
      </main>
      <Footer />
    </div>
  );
};

export default GuidanceLibrary;
