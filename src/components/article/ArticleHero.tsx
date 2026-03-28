import { Link } from "react-router-dom";
import type { ArticleData } from "@/data/articleData";
import articleHeroImage from "@/assets/article-hero-lifestyle.jpg";

interface Props {
  data: ArticleData;
}

const ArticleHero = ({ data }: Props) => {
  return (
    <section className="relative bg-gradient-to-b from-sage-bg/30 via-parchment to-parchment pt-28 pb-0 md:pt-36 overflow-hidden">
      {/* Soft radial glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-sage-bg/20 rounded-full blur-[100px] pointer-events-none -translate-y-1/4 translate-x-1/4" />

      <div className="container mx-auto px-6 md:px-10 max-w-5xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] lg:grid-cols-[1fr_380px] gap-10 md:gap-14 items-start">
          {/* Left column — content */}
          <div className="pb-12 md:pb-20">
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

          {/* Right column — lifestyle image */}
          <div className="hidden md:block relative">
            <div className="sticky top-32">
              <div className="rounded-2xl overflow-hidden shadow-elevated">
                <img
                  src={articleHeroImage}
                  alt="Calm pregnancy guidance"
                  width={380}
                  height={456}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-parchment to-transparent pointer-events-none" />
    </section>
  );
};

export default ArticleHero;
