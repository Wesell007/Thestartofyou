import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { WeekData } from "@/data/weekData";

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

        {/* Week label */}
        <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
          {data.trimesterLabel} · {data.keyFocus}
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
        <p className="font-serif italic text-sm text-sage-muted max-w-xl mb-10">
          {data.reassurance}
        </p>

        {/* Stat cards */}
        <div className="flex flex-wrap gap-4 mb-12">
          <div className="bg-card border border-border/50 rounded-lg px-5 py-4 shadow-card-brand">
            <p className="font-sans text-[10px] font-light tracking-[0.15em] uppercase text-sage-muted mb-1">Baby size</p>
            <p className="font-serif text-base text-foreground">{data.what.baby.size}</p>
          </div>
          <div className="bg-card border border-border/50 rounded-lg px-5 py-4 shadow-card-brand">
            <p className="font-sans text-[10px] font-light tracking-[0.15em] uppercase text-sage-muted mb-1">Trimester</p>
            <p className="font-serif text-base text-foreground">{data.trimesterLabel}</p>
          </div>
          <div className="bg-card border border-border/50 rounded-lg px-5 py-4 shadow-card-brand">
            <p className="font-sans text-[10px] font-light tracking-[0.15em] uppercase text-sage-muted mb-1">Week</p>
            <p className="font-serif text-base text-foreground">{data.week} of 40</p>
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
