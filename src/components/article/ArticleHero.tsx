import { Link } from "react-router-dom";
import type { ArticleData } from "@/data/articleData";
import articleHeroImage from "@/assets/article-hero-lifestyle.jpg";

interface Props {
  data: ArticleData;
}

const ArticleHero = ({ data }: Props) => {
  return (
    <section className="relative bg-parchment pt-28 pb-0 md:pt-36 overflow-hidden">
      {/* Background lifestyle image — fades naturally into the page */}
      <div className="absolute top-0 right-0 w-[55%] h-full hidden md:block pointer-events-none select-none">
        <img
          src={articleHeroImage}
          alt=""
          aria-hidden="true"
          width={768}
          height={896}
          className="w-full h-full object-cover object-top"
        />
        {/* Left fade into parchment */}
        <div className="absolute inset-0 bg-gradient-to-r from-parchment via-parchment/80 to-transparent" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-parchment to-transparent" />
        {/* Top fade */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-parchment/60 to-transparent" />
      </div>

      {/* Soft radial glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-sage-bg/20 rounded-full blur-[100px] pointer-events-none -translate-y-1/4 translate-x-1/4" />

      <div className="container mx-auto px-6 md:px-10 max-w-5xl relative z-10">
        <div className="max-w-xl pb-12 md:pb-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-8 font-sans text-[11px] font-light text-muted-foreground tracking-wide flex-wrap">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <span className="opacity-40">/</span>
            <Link to="/explore" className="hover:text-foreground transition-colors">Explore</Link>
            <span className="opacity-40">/</span>
            <span className="text-foreground">Guidance</span>
          </nav>

          {/* Stage label */}
          <p className="font-sans text-[10px] font-light tracking-[0.25em] uppercase text-sage-muted mb-4">
            {data.trimester?.map(t => `Trimester ${t}`).join(' · ')} · Guidance
          </p>

          {/* Title */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-[2.75rem] text-foreground leading-[1.15] tracking-tight mb-7">
            {data.title}
          </h1>

          {/* Week chips */}
          {data.relatedWeeks && data.relatedWeeks.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              {data.relatedWeeks.slice(0, 5).map((week) => (
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

          {/* Quick Answer — elevated into hero */}
          <div className="bg-card/90 backdrop-blur-sm border border-border/40 rounded-2xl px-7 py-7 md:px-9 md:py-8 shadow-elevated">
            <p className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-sage mb-4">
              Quick Answer
            </p>
            <p className="font-sans text-[15px] font-light text-foreground leading-[1.8]">
              {data.quickAnswer}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-parchment to-transparent pointer-events-none z-20" />
    </section>
  );
};

export default ArticleHero;
