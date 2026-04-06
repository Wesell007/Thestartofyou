import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const PreparingFinalCTA = () => {
  return (
    <section className="page-ending frame-corner overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: "hsl(var(--stage-preparing-accent) / 0.06)" }} />

      <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center relative z-10">
        <div className="editorial-rule mb-10" />
        <p className="stage-label mb-6">Your Journey</p>
        <h2 className="font-serif text-4xl sm:text-5xl text-foreground mb-5 leading-tight">
          Start with what matters. <br className="hidden sm:block" />Leave the rest.
        </h2>
        <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-10 max-w-md mx-auto">
          You don't need to have everything figured out. Focus on the basics, and trust yourself with what comes next.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            to="/pregnancy"
            className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-8 py-4 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
          >
            Continue your journey
            <ArrowUpRight size={15} />
          </Link>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 border border-foreground/15 text-foreground rounded-pill px-7 py-3.5 font-sans text-sm font-light hover:bg-parchment-dark transition-all"
          >
            Explore all stages
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto">
          {[
            { num: "4", label: "core needs" },
            { num: "5", label: "categories" },
            { num: "80%", label: "can wait" },
            { num: "1", label: "step at a time" },
          ].map((s, i) => (
            <div key={i} className="rounded-xl px-3 py-3 border border-border/30 text-center"
              style={{ backgroundColor: "hsl(var(--stage-preparing) / 0.5)" }}>
              <span className="font-serif text-lg font-medium block" style={{ color: "hsl(var(--stage-preparing-accent))" }}>{s.num}</span>
              <span className="font-sans text-[9px] font-light tracking-widest uppercase text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PreparingFinalCTA;
