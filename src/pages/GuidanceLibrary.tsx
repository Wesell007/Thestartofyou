import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GuidanceHero from "@/components/guidance/GuidanceHero";
import GuidanceAIBridge from "@/components/guidance/GuidanceAIBridge";
import { getArticlesByJourney, type ArticleData } from "@/data/articleData";

/* ── Stage config ───────────────────────────────────── */

const stages = [
  { key: "ttc", title: "Trying to conceive", filter: "trying-to-conceive", href: "/trying-to-conceive",
    chips: ["symptoms", "timelines", "emotional-wellbeing", "body-changes"] },
  { key: "ivf", title: "IVF & fertility", filter: "ivf", href: "/ivf",
    chips: ["timelines", "emotional-wellbeing", "safety-and-support"] },
  { key: "pregnancy", title: "Pregnancy", filter: "pregnancy", href: "/pregnancy",
    chips: ["symptoms", "development", "body-changes", "safety-and-support", "practical-preparation", "emotional-wellbeing"] },
  { key: "postpartum", title: "Postpartum", filter: "postpartum", href: "/postpartum",
    chips: ["body-changes", "emotional-wellbeing", "timelines", "practical-preparation"] },
  { key: "firstyear", title: "First year", filter: "first-year", href: "/first-year",
    chips: ["development", "timelines", "practical-preparation"] },
];

/* ── Card ───────────────────────────────────────────── */

function Card({ article }: { article: ArticleData }) {
  return (
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
    <div className="py-12 sm:py-14 md:py-16">
      <div className="flex items-end justify-between mb-5">
        <h2 className="font-serif text-xl sm:text-2xl md:text-[1.7rem] text-foreground leading-tight">{stage.title}</h2>
        <Link to={stage.href} className="hidden sm:inline-flex items-center gap-1.5 font-sans text-xs text-sage hover:text-sage-dark transition-colors">
          View all <span>→</span>
        </Link>
      </div>
      {validChips.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <button onClick={() => setActive(null)} className={`px-3.5 py-1.5 rounded-full text-xs font-sans transition-all ${!active ? "bg-sage text-white" : "bg-card text-muted-foreground border border-border/40"}`}>All</button>
          {validChips.map((c) => (
            <button key={c} onClick={() => setActive(active === c ? null : c)} className={`px-3.5 py-1.5 rounded-full text-xs font-sans transition-all ${active === c ? "bg-sage text-white" : "bg-card text-muted-foreground border border-border/40"}`}>
              {c.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </button>
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.slice(0, 6).map((a) => <Card key={a.slug} article={a} />)}
      </div>
      {filtered.length === 0 && <p className="font-sans text-sm text-muted-foreground/60 py-8">No articles match this topic yet.</p>}
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

        <GuidanceAIBridge />
      </main>
      <Footer />
    </div>
  );
};

export default GuidanceLibrary;
