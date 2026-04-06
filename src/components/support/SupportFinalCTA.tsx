import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const SupportFinalCTA = () => {
  return (
    <section className="bg-parchment py-24 md:py-32 frame-corner">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center">
        <div className="editorial-rule mb-8" />
        <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-[hsl(var(--stage-support-accent))] mb-5">
          Continue
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-5 leading-tight">
          Wherever you are, there's a next step.
        </h2>
        <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-10 max-w-md mx-auto">
          You don't have to take it alone.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href="#ai-support"
            className="flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-8 py-4 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
          >
            Ask what's been feeling off
            <ArrowUpRight size={16} />
          </a>
          <Link
            to="/explore"
            className="flex items-center gap-2 border border-foreground/12 text-foreground rounded-pill px-7 py-3.5 font-sans text-sm font-light hover:bg-parchment-dark transition-all"
          >
            Explore your journey
          </Link>
        </div>

        {/* Stage colour trail */}
        <div className="flex items-center justify-center gap-1.5 mb-10">
          {[
            "bg-[hsl(var(--stage-ttc))]",
            "bg-[hsl(var(--stage-ivf))]",
            "bg-[hsl(var(--stage-pregnancy))]",
            "bg-[hsl(var(--stage-postpartum))]",
            "bg-[hsl(var(--stage-firstyear))]",
            "bg-[hsl(var(--stage-support))]",
          ].map((bg, i) => (
            <div key={i} className={`w-6 h-1 rounded-full ${bg} ${i === 5 ? 'opacity-100' : 'opacity-40'}`} />
          ))}
        </div>

        <p className="font-sans text-xs font-light text-muted-foreground/60">
          ✔ Medically reviewed by Jenny Joines
        </p>
      </div>
    </section>
  );
};

export default SupportFinalCTA;
