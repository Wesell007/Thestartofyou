import { Link } from "react-router-dom";
import { Calendar, ArrowDown, ChevronRight } from "lucide-react";
import type { TrimesterData } from "@/data/trimesterData";

interface Props {
  data: TrimesterData;
}

const getWeekPercent = (week: number, start: number, end: number) =>
  ((week - start) / (end - start)) * 100;

const TrimesterHero = ({ data }: Props) => {
  const totalWeeks = data.weekEnd - data.weekStart + 1;
  const markerWeeks = [
    data.weekStart,
    Math.round(data.weekStart + totalWeeks * 0.33),
    Math.round(data.weekStart + totalWeeks * 0.66),
    data.weekEnd,
  ];

  return (
    <section className="relative min-h-[75vh] bg-parchment overflow-hidden flex flex-col justify-center pt-28 pb-16">
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-sage-bg/25 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 md:px-10 max-w-4xl relative z-10 text-center">
        {/* Breadcrumb */}
        <nav className="flex items-center justify-center gap-2 mb-8" aria-label="breadcrumb">
          <Link
            to="/pregnancy"
            className="font-sans text-xs font-light text-muted-foreground hover:text-foreground transition-colors tracking-wide"
          >
            Pregnancy
          </Link>
          <ChevronRight size={12} className="text-muted-foreground/50" />
          <span className="font-sans text-xs font-light text-sage-muted tracking-wide">
            {data.label}
          </span>
        </nav>

        {/* Trimester label */}
        <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
          {data.range} · {data.tagline}
        </p>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-foreground leading-[1.1] mb-6 animate-fade-up">
          {data.label}
        </h1>

        <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-14 max-w-2xl mx-auto animate-fade-up [animation-delay:0.1s]">
          {data.heroSubtitle}
        </p>

        {/* Inline mini-timeline */}
        <div
          className="relative h-10 max-w-xl mx-auto mb-14 animate-fade-up [animation-delay:0.15s]"
          aria-hidden="true"
        >
          {/* Track */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-border/60 -translate-y-1/2" />
          {/* Fill */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-sage/40 -translate-y-1/2" />
          {/* Markers */}
          {markerWeeks.map((week) => (
            <div
              key={week}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
              style={{ left: `${getWeekPercent(week, data.weekStart, data.weekEnd)}%` }}
            >
              <div className="w-2.5 h-2.5 rounded-full border border-sage/60 bg-card" />
              <span className="font-sans text-[10px] font-light text-muted-foreground whitespace-nowrap mt-2">
                Wk {week}
              </span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up [animation-delay:0.2s]">
          <button className="flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all">
            <Calendar size={15} />
            Calculate your due date
          </button>
          <a
            href="#week-by-week"
            className="flex items-center gap-2 border border-foreground/20 text-foreground rounded-pill px-7 py-3.5 font-sans text-sm font-light hover:bg-parchment-dark transition-all"
          >
            <ArrowDown size={15} />
            Jump to week-by-week
          </a>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-parchment to-transparent pointer-events-none" />
    </section>
  );
};

export default TrimesterHero;
