import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { WeekData } from "@/data/weekData";

interface Props {
  data: WeekData;
  prevWeek: number | null;
  nextWeek: number | null;
}

const WeekContinue = ({ data, prevWeek, nextWeek }: Props) => {
  return (
    <section className="bg-parchment-dark py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="text-center mb-14">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
            Continue
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-5">
            Continue your journey
          </h2>
          <p className="font-sans text-base font-light text-muted-foreground leading-relaxed max-w-md mx-auto mb-10">
            Follow your pregnancy week by week with guidance tailored to your stage.
          </p>
          <Link
            to="/pregnancy"
            className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-8 py-4 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
          >
            Start my journey
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Prev / Next week links */}
        <div className="flex items-center justify-between pt-10 border-t border-border/40">
          {prevWeek ? (
            <Link
              to={`/pregnancy/week/${prevWeek}`}
              className="flex items-center gap-2 bg-card border border-border/50 rounded-lg px-6 py-4 font-sans text-sm font-light text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all shadow-card-brand"
            >
              <ChevronLeft size={14} />
              <div>
                <span className="block text-[10px] tracking-[0.15em] uppercase text-sage-muted mb-0.5">Previous</span>
                Week {prevWeek}
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextWeek && (
            <Link
              to={`/pregnancy/week/${nextWeek}`}
              className="flex items-center gap-2 bg-card border border-border/50 rounded-lg px-6 py-4 font-sans text-sm font-light text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all shadow-card-brand text-right"
            >
              <div>
                <span className="block text-[10px] tracking-[0.15em] uppercase text-sage-muted mb-0.5">Next</span>
                Week {nextWeek}
              </div>
              <ChevronRight size={14} />
            </Link>
          )}
        </div>

        {/* Trimester hub link */}
        <div className="mt-8 text-center">
          <Link
            to={data.trimesterPath}
            className="font-sans text-sm font-light text-sage-muted hover:text-sage transition-colors underline underline-offset-4"
          >
            Return to {data.trimesterLabel} →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WeekContinue;
