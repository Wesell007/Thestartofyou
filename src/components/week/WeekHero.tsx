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
      <div className="bg-gradient-to-br from-sage/18 via-sage-light/25 to-lavender/15 pt-24 pb-28 md:pt-32 md:pb-36">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl text-center">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 mb-6 font-sans text-xs font-light text-muted-foreground tracking-wide">
            <Link to="/pregnancy" className="hover:text-foreground transition-colors">Pregnancy</Link>
            <span className="text-muted-foreground/40">›</span>
            <Link to={data.trimesterPath} className="hover:text-foreground transition-colors">{data.trimesterLabel}</Link>
            <span className="text-muted-foreground/40">›</span>
            <span className="text-foreground font-normal">Week {data.week}</span>
          </nav>

          {/* Title */}
          <h1 className="font-serif text-[2.25rem] sm:text-5xl md:text-6xl text-foreground leading-tight mb-4 tracking-tight">
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
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/80 border border-border/40 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-card transition-all shadow-card-brand"
              aria-label={`Go to week ${prevWeek}`}
            >
              <ChevronLeft size={18} />
            </Link>
          )}
          {nextWeek && (
            <Link
              to={`/pregnancy/week/${nextWeek}`}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/80 border border-border/40 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-card transition-all shadow-card-brand"
              aria-label={`Go to week ${nextWeek}`}
            >
              <ChevronRight size={18} />
            </Link>
          )}
        </div>
      </div>

      {/* Stat circles, overlapping the banner/content boundary */}
      <div className="relative -mt-14 mb-12">
        <div className="flex items-end justify-center gap-5 sm:gap-8">
          {/* Baby size illustration */}
          <div className="flex flex-col items-center gap-2.5">
            <div className="w-22 h-22 sm:w-26 sm:h-26 rounded-full bg-card border-[3px] border-sage/20 flex items-center justify-center shadow-elevated">
              <WeekIllustration week={data.week} className="w-12 h-12 sm:w-14 sm:h-14" />
            </div>
            <p className="font-sans text-[11px] font-light text-muted-foreground text-center leading-snug max-w-[130px]">
              {data.what.baby.size}
            </p>
          </div>

          {/* Weeks to go */}
          <div className="flex flex-col items-center gap-2.5">
            <div className="w-22 h-22 sm:w-26 sm:h-26 rounded-full bg-gradient-to-br from-accent/40 to-accent/20 border-[3px] border-accent/30 flex items-center justify-center shadow-elevated">
              <span className="font-serif text-[1.75rem] sm:text-[2rem] text-foreground tracking-tight">
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
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl pb-12">
        <div className="text-center">
          <p className="stage-label mb-3">
            {data.trimesterLabel} · Week {data.week} of 40 · {data.keyFocus}
          </p>
          <p className="font-serif italic text-sm text-muted-foreground max-w-md mx-auto">
            {data.reassurance}
          </p>
        </div>
      </div>
    </section>
  );
};

export default WeekHero;
