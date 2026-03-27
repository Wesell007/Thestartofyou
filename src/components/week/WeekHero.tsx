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
  return (
    <section className="bg-parchment pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-10 font-sans text-xs font-light text-muted-foreground tracking-wide">
          <Link to="/pregnancy" className="hover:text-foreground transition-colors">Pregnancy</Link>
          <span>/</span>
          <Link to={data.trimesterPath} className="hover:text-foreground transition-colors">{data.trimesterLabel}</Link>
          <span>/</span>
          <span className="text-foreground">Week {data.week}</span>
        </nav>

        {/* Stage label */}
        <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
          {data.trimesterLabel} · Week {data.week} of 40 · {data.keyFocus}
        </p>

        {/* Title */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-foreground leading-tight mb-6">
          {data.title}
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-base font-light text-muted-foreground leading-relaxed max-w-2xl mb-5">
          {data.heroSubtitle}
        </p>

        {/* Reassurance line */}
        <p className="font-serif italic text-sm text-sage-muted max-w-xl mb-12">
          {data.reassurance}
        </p>

        {/* Visual stat row */}
        <div className="flex items-center gap-6 sm:gap-10 mb-12">
          {/* Baby size with illustration */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-card border-2 border-sage/30 flex items-center justify-center shadow-card-brand">
              <WeekIllustration week={data.week} className="w-12 h-12 sm:w-14 sm:h-14" />
            </div>
            <p className="font-sans text-xs font-light text-muted-foreground text-center max-w-[120px]">
              {data.what.baby.size}
            </p>
          </div>

          {/* Divider */}
          <div className="w-px h-16 bg-border/60 hidden sm:block" />

          {/* Weeks to go */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-accent/30 border-2 border-accent/50 flex items-center justify-center shadow-card-brand">
              <span className="font-serif text-3xl sm:text-4xl text-foreground">{40 - data.week}</span>
            </div>
            <p className="font-sans text-xs font-light text-muted-foreground text-center">
              {40 - data.week === 0 ? "Due this week!" : `Week${40 - data.week === 1 ? "" : "s"} to go`}
            </p>
          </div>
        </div>

        {/* Prev / Next navigation */}
        <div className="flex items-center gap-6">
          {prevWeek ? (
            <Link
              to={`/pregnancy/week/${prevWeek}`}
              className="flex items-center gap-2 font-sans text-sm font-light text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft size={14} />
              Week {prevWeek}
            </Link>
          ) : (
            <span />
          )}
          {nextWeek && (
            <Link
              to={`/pregnancy/week/${nextWeek}`}
              className="flex items-center gap-2 font-sans text-sm font-light text-muted-foreground hover:text-foreground transition-colors ml-auto"
            >
              Week {nextWeek}
              <ChevronRight size={14} />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default WeekHero;
