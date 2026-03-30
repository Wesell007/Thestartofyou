import { Link } from "react-router-dom";
import { Shield, Clock } from "lucide-react";
import type { ArticleData } from "@/data/articleData";
import heroNausea from "@/assets/article-hero-nausea.jpg";
import heroFatigue from "@/assets/article-hero-fatigue.jpg";
import heroImplantation from "@/assets/article-hero-implantation.jpg";
import heroSymptomsStopping from "@/assets/article-hero-symptoms-stopping.jpg";

const heroImageMap: Record<string, string> = {
  "nausea-in-early-pregnancy": heroNausea,
  "complete-guide-morning-sickness": heroNausea,
  "fatigue-in-early-pregnancy": heroFatigue,
  "implantation-bleeding": heroImplantation,
  "symptoms-stopping-early-pregnancy": heroSymptomsStopping,
};

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
  data: ArticleData;
}

const ArticleHero = ({ data }: Props) => {
  const heroImage = heroImageMap[data.slug] || heroFatigue;
  const isDeep = data.isCornerstone;
  const hasReview = data.reviewedBy;
  const hasDate = data.lastUpdated;

  return (
    <section className="relative bg-parchment pt-28 pb-0 md:pt-36 overflow-hidden">
      {/* Background lifestyle image */}
      <div className="absolute top-0 right-0 w-[55%] h-full hidden md:block pointer-events-none select-none">
        <img
          src={heroImage}
          alt=""
          aria-hidden="true"
          width={768}
          height={896}
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-parchment via-parchment/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-parchment to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-parchment/60 to-transparent" />
      </div>

      {/* Soft radial glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-sage-bg/20 rounded-full blur-[100px] pointer-events-none -translate-y-1/4 translate-x-1/4" />

      <div className="container mx-auto px-6 md:px-10 max-w-5xl relative z-10">
        <div className={`${isDeep ? 'max-w-2xl' : 'max-w-xl'} pb-12 md:pb-20`}>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-8 font-sans text-[11px] font-light text-muted-foreground tracking-wide flex-wrap">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <span className="opacity-40">/</span>
            <Link to="/guidance" className="hover:text-foreground transition-colors">Guidance</Link>
            <span className="opacity-40">/</span>
            <span className="text-foreground line-clamp-1">{isDeep ? 'Complete guide' : 'Article'}</span>
          </nav>

          {/* Deep article badges */}
          {isDeep && (
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="px-3 py-1 rounded-full bg-sage/10 text-sage text-[10px] font-sans tracking-[0.15em] uppercase font-medium">
                Complete guide
              </span>
              {data.journey?.slice(0, 2).map((j) => (
                <span key={j} className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-[10px] font-sans tracking-[0.15em] uppercase">
                  {journeyLabels[j] ?? j}
                </span>
              ))}
            </div>
          )}

          {/* Stage label for short articles */}
          {!isDeep && (
            <div className="flex flex-wrap items-center gap-3 mb-5">
              {data.trimester?.map(t => (
                <span key={t} className="px-3 py-1 rounded-full bg-sage-bg/60 text-sage text-[10px] font-sans tracking-[0.15em] uppercase font-medium">
                  Trimester {t}
                </span>
              ))}
              {data.journey?.slice(0, 1).map((j) => (
                <span key={j} className="px-3 py-1 rounded-full bg-muted/60 text-muted-foreground text-[10px] font-sans tracking-[0.15em] uppercase">
                  {journeyLabels[j] ?? j}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className={`font-serif text-foreground leading-[1.15] tracking-tight mb-5 ${
            isDeep
              ? 'text-3xl sm:text-4xl md:text-[2.8rem] lg:text-[3.2rem]'
              : 'text-3xl sm:text-4xl md:text-[2.75rem]'
          }`}>
            {data.title}
          </h1>

          {/* Deep article intro paragraph */}
          {isDeep && (
            <p className="font-sans text-base md:text-lg font-light text-muted-foreground leading-relaxed mb-8 max-w-xl">
              {data.metaDescription}
            </p>
          )}

          {/* Trust signals (both formats) */}
          {(hasReview || hasDate) && (
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-8 font-sans text-[11px] font-light text-muted-foreground">
              {hasReview && (
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-sage/70" />
                  Reviewed by {data.reviewedBy}
                </span>
              )}
              {hasDate && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-muted-foreground/50" />
                  Updated {data.lastUpdated}
                </span>
              )}
            </div>
          )}

          {/* Week chips */}
          {data.relatedWeeks && data.relatedWeeks.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              {data.relatedWeeks.slice(0, isDeep ? 8 : 5).map((week) => (
                <Link
                  key={week}
                  to={`/pregnancy/week/${week}`}
                  className="font-sans text-[11px] font-light text-sage-muted border border-sage-light/60 rounded-full px-3.5 py-1.5 hover:border-sage hover:text-sage hover:bg-sage-bg/30 transition-all"
                >
                  Week {week}
                </Link>
              ))}
            </div>
          )}

          {/* Quick Answer card */}
          <div className={`border rounded-2xl shadow-elevated ${
            isDeep
              ? 'bg-card/95 backdrop-blur-sm border-sage/15 px-8 py-8 md:px-10 md:py-10'
              : 'bg-card/90 backdrop-blur-sm border-border/40 px-7 py-7 md:px-9 md:py-8'
          }`}>
            <p className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-sage mb-4">
              {isDeep ? 'At a glance' : 'Quick answer'}
            </p>
            <p className={`font-sans font-light text-foreground leading-[1.8] ${
              isDeep ? 'text-base' : 'text-[15px]'
            }`}>
              {data.quickAnswer}
            </p>

            {/* Disclaimer for short articles with medical content */}
            {!isDeep && data.disclaimer && (
              <div className="mt-5 pt-4 border-t border-border/20">
                <p className="font-sans text-[11px] font-light text-muted-foreground/60 leading-relaxed">
                  {data.disclaimer}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-parchment to-transparent pointer-events-none z-20" />
    </section>
  );
};

export default ArticleHero;
