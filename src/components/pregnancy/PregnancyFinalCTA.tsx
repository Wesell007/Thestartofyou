import { Link } from "react-router-dom";
import { ArrowUpRight, Calendar } from "lucide-react";

const PregnancyFinalCTA = () => {
  return (
    <section
      className="relative overflow-hidden py-20 sm:py-24 md:py-28"
      style={{ backgroundColor: 'hsl(var(--stage-pregnancy) / 0.15)' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-3xl"
        style={{ backgroundColor: 'hsl(var(--stage-pregnancy) / 0.25)' }}
      />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-2xl text-center relative z-10">
        <p
          className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
          style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}
        >
          Begin
        </p>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-[2.5rem] text-foreground mb-4 leading-tight">
          Enter your due date to begin.
        </h2>
        <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed mb-8 max-w-md mx-auto">
          We'll place you in the right week and trimester, and your guide will
          follow you from there.
        </p>

        <Link
          to="/due-date-calculator"
          className="inline-flex items-center gap-2.5 bg-terracotta text-terracotta-foreground rounded-pill px-8 py-4 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
        >
          <Calendar size={15} />
          Enter your due date
          <ArrowUpRight size={15} />
        </Link>

        <div className="mt-5">
          <a
            href="#trimesters"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('[data-section="trimesters"]')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="font-sans text-xs font-light text-muted-foreground hover:text-foreground transition-colors"
          >
            Or browse by trimester
          </a>
        </div>
      </div>
    </section>
  );
};

export default PregnancyFinalCTA;
