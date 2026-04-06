import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const PregnancyFinalCTA = () => {
  return (
    <section className="relative bg-parchment py-16 sm:py-24 md:py-36 frame-corner overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-3xl opacity-30"
        style={{ backgroundColor: 'hsl(var(--stage-pregnancy-accent) / 0.2)' }}
      />
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl text-center relative z-10">
        <div className="editorial-rule mb-8 md:mb-10" />
        <p
          className="font-sans text-xs font-light tracking-[0.2em] uppercase mb-5 md:mb-6"
          style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}
        >
          Begin
        </p>
        <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-foreground mb-4 md:mb-5 leading-tight">
          Start your journey
        </h2>
        <p className="font-sans text-[15px] sm:text-base font-light text-muted-foreground leading-relaxed mb-8 md:mb-10 max-w-md mx-auto">
          Your week-by-week guide is ready. Enter your due date and begin.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/due-date-calculator"
            className="flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-8 py-4 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all w-full sm:w-auto justify-center"
          >
            Calculate your due date
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PregnancyFinalCTA;
