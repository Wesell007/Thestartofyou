import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const TTCFinalCTA = () => {
  return (
    <section className="relative bg-parchment py-28 md:py-36 frame-corner overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-3xl opacity-30"
        style={{ backgroundColor: 'hsl(var(--stage-ttc-accent) / 0.2)' }}
      />
      <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center relative z-10">
        <div className="editorial-rule mb-10" />
        <p
          className="font-sans text-xs font-light tracking-[0.2em] uppercase mb-6"
          style={{ color: 'hsl(var(--stage-ttc-accent))' }}
        >
          Begin
        </p>
        <h2 className="font-serif text-4xl sm:text-5xl text-foreground mb-5 leading-tight">
          Start your journey
        </h2>
        <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-10 max-w-md mx-auto">
          Understand your cycle, track your timing, and get guidance that moves with you.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/trying-to-conceive/understanding-your-cycle"
            className="flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-8 py-4 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
          >
            Start your journey
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TTCFinalCTA;
