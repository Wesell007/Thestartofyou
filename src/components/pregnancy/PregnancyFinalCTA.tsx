import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const PregnancyFinalCTA = () => {
  return (
    <section className="bg-parchment py-16 sm:py-24 md:py-36 frame-corner">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl text-center">
        <div className="editorial-rule mb-8 md:mb-10" />
        <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5 md:mb-6">
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
