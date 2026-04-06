import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const PregnancyFinalCTA = () => {
  return (
    <section className="relative bg-parchment py-16 sm:py-20 md:py-28 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-3xl"
        style={{ backgroundColor: 'hsl(var(--stage-pregnancy) / 0.3)' }}
      />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl text-center relative z-10">
        {/* Stage colour trail */}
        <div className="flex items-center justify-center gap-1.5 mb-8">
          {['--stage-ttc', '--stage-pregnancy', '--stage-ivf'].map((v, i) => (
            <div
              key={v}
              className="h-1 rounded-full"
              style={{
                width: i === 1 ? '2rem' : '1rem',
                backgroundColor: `hsl(var(${v}-accent) / ${i === 1 ? '0.5' : '0.2'})`,
              }}
            />
          ))}
        </div>

        <p
          className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
          style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}
        >
          Begin
        </p>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-4 leading-tight">
          Start your pregnancy journey
        </h2>
        <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed mb-8 max-w-md mx-auto">
          Your week-by-week guide is ready. Enter your due date and begin.
        </p>
        <Link
          to="/due-date-calculator"
          className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-8 py-4 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
        >
          Calculate your due date
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  );
};

export default PregnancyFinalCTA;
