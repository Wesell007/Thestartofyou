import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const TTCFinalCTA = () => {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24 md:py-32" style={{ backgroundColor: 'hsl(var(--stage-ttc) / 0.18)' }}>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-3xl"
        style={{ backgroundColor: 'hsl(var(--stage-ttc) / 0.25)' }}
      />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl text-center relative z-10">
        {/* Colour trail */}
        <div className="flex items-center justify-center gap-1.5 mb-6">
          {[
            { var: '--stage-ttc-accent', w: 'w-10' },
            { var: '--stage-pregnancy-accent', w: 'w-4' },
            { var: '--stage-ivf-accent', w: 'w-4' },
          ].map((t, i) => (
            <div
              key={i}
              className={`h-0.5 rounded-full ${t.w}`}
              style={{ backgroundColor: `hsl(var(${t.var}) / ${i === 0 ? '0.6' : '0.2'})` }}
            />
          ))}
        </div>

        <p
          className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
          style={{ color: 'hsl(var(--stage-ttc-accent))' }}
        >
          Begin Your Journey
        </p>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 leading-tight">
          Your TTC guide is ready
        </h2>
        <p className="font-sans text-[15px] sm:text-base font-light text-muted-foreground leading-relaxed mb-5 max-w-md mx-auto">
          Understand your cycle, track your timing, and get guidance that moves with you.
        </p>

        {/* Stat chips */}
        <div className="flex items-center justify-center gap-6 mb-8">
          {[
            { n: "3", label: "stages" },
            { n: "6", label: "fertile days" },
            { n: "1", label: "cycle at a time" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center">
              <span className="font-serif text-xl text-foreground">{s.n}</span>
              <span className="font-sans text-[10px] font-light text-muted-foreground/60 uppercase tracking-wide">{s.label}</span>
            </div>
          ))}
        </div>

        <Link
          to="/trying-to-conceive/understanding-your-cycle"
          className="inline-flex items-center gap-2.5 bg-terracotta text-terracotta-foreground rounded-pill px-8 py-4 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
        >
          Start your journey
          <ArrowUpRight size={15} />
        </Link>

        <p className="mt-10 font-serif italic text-sm text-muted-foreground/50">
          One cycle at a time, from the very beginning.
        </p>
      </div>
    </section>
  );
};

export default TTCFinalCTA;
