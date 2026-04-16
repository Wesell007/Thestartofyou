import { useState, useMemo, useRef, useCallback } from "react";
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
import imgWellness from "@/assets/guidance-card-wellness.jpg";
import imgNursery from "@/assets/guidance-card-nursery.jpg";
import imgJourney from "@/assets/guidance-card-journey.jpg";
import imgReflection from "@/assets/guidance-card-reflection.jpg";
import imgMilestones from "@/assets/guidance-card-milestones.jpg";
import imgBonding from "@/assets/guidance-card-bonding.jpg";

const imagePool = [
  imgSymptoms, imgDevelopment, imgBody, imgEmotional,
  imgPractical, imgTimelines, imgSafety, imgWellness,
  imgNursery, imgJourney, imgReflection, imgMilestones, imgBonding,
];

const topicImageMap: Record<string, string> = {
  symptoms: imgSymptoms,
  development: imgDevelopment,
  "body-changes": imgBody,
  "emotional-wellbeing": imgEmotional,
  "practical-preparation": imgPractical,
  timelines: imgTimelines,
  "safety-and-support": imgSafety,
};

function getCardImage(article: ArticleData, index: number): string {
  const topic = article.topics?.[0];
  if (topic && topicImageMap[topic]) return topicImageMap[topic];
  return imagePool[index % imagePool.length];
}

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

function ArticleCard({ article, accent, index }: { article: ArticleData; accent: string; index: number }) {
  const img = getCardImage(article, index);
  return (
    <Link
      to={`/articles/${article.slug}`}
      className="group flex-shrink-0 w-[280px] sm:w-[300px] md:w-[320px] rounded-2xl bg-card border border-border/30 hover:border-sage/20 hover:shadow-card-hover transition-all duration-300 overflow-hidden snap-start"
      style={{ display: 'block' }}
    >
      <div className="relative" style={{ height: '160px' }}>
        <img
          src={img}
          alt={article.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
        <div
          className="absolute bottom-0 left-0 w-full"
          style={{ height: '3px', background: `hsl(${accent})` }}
        />
      </div>
      <div className="p-4 sm:p-5">
        <div className="flex flex-wrap gap-1.5 mb-2.5">
          {article.topics?.slice(0, 2).map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded-full bg-muted/60 text-muted-foreground"
              style={{ fontSize: '9px', fontFamily: 'var(--font-sans)', letterSpacing: '0.1em', textTransform: 'uppercase' }}
            >
              {t.replace(/-/g, " ")}
            </span>
          ))}
        </div>
        <h3 className="font-serif text-foreground leading-snug mb-2 group-hover:text-sage transition-colors line-clamp-2" style={{ fontSize: '15px' }}>
          {article.title}
        </h3>
        <p className="font-sans text-muted-foreground leading-relaxed line-clamp-2 mb-3" style={{ fontSize: '12px', fontWeight: 300 }}>
          {article.metaDescription}
        </p>
        {article.reviewedBy && (
          <p className="font-sans text-muted-foreground/50 mb-2" style={{ fontSize: '10px' }}>
            ✔ Reviewed by {article.reviewedBy}
          </p>
        )}
        <span className="inline-flex items-center gap-1.5 text-muted-foreground/40 group-hover:text-sage group-hover:gap-2 transition-all font-sans" style={{ fontSize: '12px' }}>
          Read more <span className="font-serif" style={{ fontSize: '16px' }}>→</span>
        </span>
      </div>
    </Link>
  );
}

function ScrollRow({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  const scroll = useCallback((dir: "left" | "right") => {
    const el = ref.current;
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
    setTimeout(checkScroll, 350);
  }, [checkScroll]);

  return (
    <div style={{ position: 'relative' }}>
      {canLeft && (
        <button
          onClick={() => scroll("left")}
          aria-label="Scroll left"
          style={{ position: 'absolute', left: '-16px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
        >
          ‹
        </button>
      )}
      {canRight && (
        <button
          onClick={() => scroll("right")}
          aria-label="Scroll right"
          style={{ position: 'absolute', right: '-16px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
        >
          ›
        </button>
      )}

      <div
        ref={ref}
        onScroll={checkScroll}
        style={{ display: 'flex', gap: '16px', overflowX: 'auto', scrollSnapType: 'x mandatory', paddingBottom: '8px' }}
        className="scrollbar-hide"
      >
        {children}
      </div>
    </div>
  );
}

function StageSection({ stage }: { stage: (typeof stages)[0] }) {
  const [active, setActive] = useState<string | null>(null);
  const all = useMemo(() => getArticlesByJourney(stage.filter), [stage.filter]);
  const filtered = useMemo(() => {
    if (!active) return all;
    return all.filter((a) => a.topics?.includes(active));
  }, [active, all]);
  const validChips = stage.chips.filter((c) => all.some((a) => a.topics?.includes(c)));

  if (all.length === 0) return null;

  return (
    <div style={{ paddingTop: '40px', paddingBottom: '40px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '4px', height: '24px', borderRadius: '4px', background: `hsl(${stage.accent})` }} />
          <h2 className="font-serif text-foreground" style={{ fontSize: '1.7rem', lineHeight: 1.2 }}>
            {stage.title}
          </h2>
        </div>
        <Link to={stage.href} className="hidden sm:inline-flex items-center gap-1.5 font-sans text-sage hover:text-sage-dark transition-colors" style={{ fontSize: '12px' }}>
          View all <span>→</span>
        </Link>
      </div>

      {validChips.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
          <button
            onClick={() => setActive(null)}
            className="font-sans transition-all duration-200"
            style={{ padding: '6px 14px', borderRadius: '9999px', fontSize: '12px', background: !active ? 'hsl(var(--sage))' : 'hsl(var(--card))', color: !active ? 'white' : 'hsl(var(--muted-foreground))', border: active ? '1px solid hsl(var(--border) / 0.4)' : 'none', cursor: 'pointer' }}
          >
            All
          </button>
          {validChips.map((c) => (
            <button
              key={c}
              onClick={() => setActive(active === c ? null : c)}
              className="font-sans transition-all duration-200"
              style={{ padding: '6px 14px', borderRadius: '9999px', fontSize: '12px', background: active === c ? 'hsl(var(--sage))' : 'hsl(var(--card))', color: active === c ? 'white' : 'hsl(var(--muted-foreground))', border: active !== c ? '1px solid hsl(var(--border) / 0.4)' : 'none', cursor: 'pointer' }}
            >
              {c.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </button>
          ))}
        </div>
      )}

      {filtered.length > 0 ? (
        <ScrollRow>
          {filtered.map((a, i) => (
            <ArticleCard key={a.slug} article={a} accent={stage.accent} index={i} />
          ))}
        </ScrollRow>
      ) : (
        <p className="font-sans text-muted-foreground/60" style={{ padding: '32px 0', fontSize: '14px' }}>
          No articles match this topic yet.
        </p>
      )}

      <Link to={stage.href} className="sm:hidden inline-flex items-center gap-1.5 font-sans text-sage hover:text-sage-dark transition-colors" style={{ fontSize: '12px', marginTop: '12px' }}>
        View all {stage.title.toLowerCase()} guidance <span>→</span>
      </Link>
    </div>
  );
}

const GuidanceLibrary = () => {
  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />
      <main>
        <GuidanceHero />

        <section className="bg-parchment" style={{ position: 'relative', zIndex: 10 }}>
          <div className="container mx-auto" style={{ maxWidth: '64rem', paddingLeft: '20px', paddingRight: '20px', paddingTop: '40px', paddingBottom: '64px' }}>
            <div style={{ marginBottom: '32px' }}>
              <div className="editorial-rule-left" style={{ marginBottom: '16px' }} />
              <p className="stage-label" style={{ marginBottom: '8px' }}>Browse by stage</p>
              <h2 className="font-serif text-foreground" style={{ fontSize: '1.875rem', lineHeight: 1.2, maxWidth: '28rem' }}>
                Guidance for every part of your journey
              </h2>
              <p className="font-sans text-muted-foreground" style={{ fontSize: '14px', fontWeight: 300, marginTop: '10px', maxWidth: '32rem', lineHeight: 1.6 }}>
                Find trusted answers organised around the stage you're in right now.
              </p>
            </div>
            {stages.map((stage, i) => (
              <div key={stage.key}>
                {i > 0 && <div style={{ borderTop: '1px solid hsl(var(--border) / 0.2)' }} />}
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
