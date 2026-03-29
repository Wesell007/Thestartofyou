import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { WeekData } from "@/data/weekData";
import WeekIllustration from "@/components/week/WeekIllustration";

interface Props {
  data: WeekData;
  prevWeek: number | null;
  nextWeek: number | null;
}

const WeekHero = ({ data, prevWeek, nextWeek }: Props) => {
  const weeksToGo = 40 - data.week;

  return (
    <section className="relative overflow-hidden">
      {/* Colored banner top */}
      <div className="bg-gradient-to-br from-sage/20 via-sage-light/30 to-lavender/20 pt-28 pb-32 md:pt-36 md:pb-40">
        <div className="container mx-auto px-6 md:px-10 max-w-4xl text-center">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 mb-8 font-sans text-xs font-light text-sage-muted tracking-wide">
            <Link to="/pregnancy" className="hover:text-foreground transition-colors">Pregnancy</Link>
            <span className="text-sage-muted/50">›</span>
            <Link to={data.trimesterPath} className="hover:text-foreground transition-colors">{data.trimesterLabel}</Link>
            <span className="text-sage-muted/50">›</span>
            <span className="text-foreground font-normal">Week {data.week}</span>
          </nav>

          {/* Title */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-foreground leading-tight mb-5 tracking-tight">
            {data.title}
          </h1>

          {/* Subtitle */}
          <p className="font-serif italic text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto">
            Your baby is as big as a {data.what.baby.size.split("(")[0].trim().toLowerCase()}
          </p>

          {/* Prev / Next arrows on sides */}
          {prevWeek && (
            <Link
              to={`/pregnancy/week/${prevWeek}`}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/80 border border-border/50 flex items-center justify-center text-sage-muted hover:text-foreground hover:bg-card transition-all shadow-card-brand"
              aria-label={`Go to week ${prevWeek}`}
            >
              <ChevronLeft size={18} />
            </Link>
          )}
          {nextWeek && (
            <Link
              to={`/pregnancy/week/${nextWeek}`}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/80 border border-border/50 flex items-center justify-center text-sage-muted hover:text-foreground hover:bg-card transition-all shadow-card-brand"
              aria-label={`Go to week ${nextWeek}`}
            >
              <ChevronRight size={18} />
            </Link>
          )}
        </div>
      </div>

      {/* Stat circles, overlapping the banner/content boundary */}
      <div className="relative -mt-16 mb-16">
        <div className="flex items-end justify-center gap-5 sm:gap-8">
          {/* Baby size illustration */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-card border-[3px] border-sage/25 flex items-center justify-center shadow-elevated">
              <WeekIllustration week={data.week} className="w-14 h-14 sm:w-16 sm:h-16" />
            </div>
            <p className="font-sans text-[11px] font-light text-muted-foreground text-center leading-snug max-w-[130px]">
              {data.what.baby.size}
            </p>
          </div>

          {/* Weeks to go */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-accent/50 to-accent/30 border-[3px] border-accent/40 flex items-center justify-center shadow-elevated">
              <span className="font-serif text-3xl sm:text-4xl text-foreground tracking-tight">
                {weeksToGo}
              </span>
            </div>
            <p className="font-sans text-[11px] font-light text-muted-foreground text-center">
              {weeksToGo === 0 ? "Due this week!" : `Week${weeksToGo === 1 ? "" : "s"} to go!`}
            </p>
          </div>
        </div>
      </div>

      {/* Context info below */}
      <div className="container mx-auto px-6 md:px-10 max-w-4xl pb-16">
        <div className="text-center">
          <p className="font-sans text-[10px] font-light tracking-[0.2em] uppercase text-sage-muted mb-4">
            {data.trimesterLabel} · Week {data.week} of 40 · {data.keyFocus}
          </p>
          <p className="font-serif italic text-sm text-sage-muted max-w-md mx-auto">
            {data.reassurance}
          </p>
        </div>
      </div>
    </section>
  );
};

export default WeekHero;
