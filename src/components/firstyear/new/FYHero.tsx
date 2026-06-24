import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const FYHero = () => {
  return (
    <section
      id="first-year-top"
      className="relative overflow-hidden flex flex-col justify-center pt-28 pb-16 md:pb-24 min-h-[auto] md:min-h-[78vh]"
      style={{ backgroundColor: 'hsl(var(--stage-firstyear) / 0.45)' }}
    >
      {/* Dual-tone ambient — blue-grey (baby) + mauve-plum (recovery) */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[12%] left-[8%] w-[460px] h-[460px] rounded-full blur-3xl"
          style={{ backgroundColor: 'hsl(var(--stage-firstyear-soft) / 0.55)' }}
        />
        <div
          className="absolute bottom-[10%] right-[6%] w-[420px] h-[420px] rounded-full blur-3xl"
          style={{ backgroundColor: 'hsl(var(--stage-recovery-soft) / 0.45)' }}
        />
      </div>

      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-5xl relative z-10">
        {/* Dual-track colour trail */}
        <div className="flex items-center gap-1.5 mb-6">
          <div className="h-0.5 w-14 rounded-full" style={{ backgroundColor: 'hsl(var(--stage-firstyear-accent) / 0.6)' }} />
          <div className="h-0.5 w-14 rounded-full" style={{ backgroundColor: 'hsl(var(--stage-recovery-accent) / 0.6)' }} />
          <span
            className="font-sans text-[11px] font-light tracking-[0.3em] uppercase ml-2"
            style={{ color: 'hsl(var(--stage-firstyear-deep))' }}
          >
            First Year
          </span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-[3.5rem] text-foreground mb-5 leading-[1.06] max-w-3xl">
          Their first year. <span className="italic" style={{ color: 'hsl(var(--stage-recovery-deep))' }}>Your recovery.</span> One journey.
        </h1>
        <p className="font-sans text-base md:text-lg font-light text-muted-foreground leading-relaxed mb-5 max-w-2xl">
          Twelve months of development for your baby, and a real, ongoing recovery for you. This hub holds both, with equal care, so you don't have to choose which one to learn about first.
        </p>
        <p
          className="font-serif italic text-sm md:text-base text-foreground/55 mb-9 max-w-xl"
        >
          You are not just keeping up with them. You are still healing too.
        </p>

        <div className="flex flex-col sm:flex-row items-start gap-3.5">
          <Link
            to="#two-track"
            className="inline-flex items-center gap-2.5 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[13px] font-medium shadow-cta hover:bg-terracotta-hover transition-all duration-300"
          >
            <ArrowUpRight size={15} />
            Start your first year
          </Link>
          <Link
            to="#phases"
            className="inline-flex items-center gap-2.5 border border-foreground/15 text-foreground rounded-pill px-6 py-3 font-sans text-[13px] font-light hover:bg-card transition-all duration-300"
          >
            <ArrowDown size={15} />
            Jump to your phase
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FYHero;
