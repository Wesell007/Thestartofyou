import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const PreparingFinalCTA = () => {
  return (
    <section className="page-ending frame-corner overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: "hsl(var(--stage-preparing-accent) / 0.06)" }} />

      <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center relative z-10">
        <div className="editorial-rule mb-10" />
        <p className="font-sans text-[10px] font-light tracking-[0.25em] uppercase mb-6"
          style={{ color: "hsl(var(--stage-preparing-accent))" }}>Your Journey</p>

        <h2 className="font-serif text-4xl sm:text-5xl md:text-[3.2rem] text-foreground mb-5 leading-[1.08]">
          Start with what matters.<br className="hidden sm:block" />
          <span className="italic">Leave the rest.</span>
        </h2>
        <p className="font-sans text-base md:text-lg font-light text-muted-foreground leading-relaxed mb-10 max-w-lg mx-auto">
          You don't need to have everything figured out. The basics are enough. Trust yourself with what comes next.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
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

        {/* Stage colour trail */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {[
            { color: "--stage-ttc", label: "TTC" },
            { color: "--stage-ivf", label: "IVF" },
            { color: "--stage-pregnancy", label: "Pregnancy" },
            { color: "--stage-preparing", label: "Preparing" },
            { color: "--stage-postpartum", label: "Postpartum" },
            { color: "--stage-firstyear", label: "First Year" },
          ].map((s) => (
            <div key={s.label} className="group relative">
              <div className={`w-3 h-3 rounded-full border border-border/20 transition-transform ${s.color === "--stage-preparing" ? "scale-125 ring-2 ring-offset-1" : ""}`}
                style={{
                  backgroundColor: `hsl(var(${s.color}))`,
                  ...(s.color === "--stage-preparing" ? { ringColor: `hsl(var(${s.color}-accent))` } : {}),
                }} />
            </div>
          ))}
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto">
          {[
            { num: "4", label: "core needs" },
            { num: "5", label: "categories" },
            { num: "80%", label: "can wait" },
            { num: "1", label: "step at a time" },
          ].map((s, i) => (
            <div key={i} className="rounded-xl px-3 py-4 border border-border/30 text-center"
              style={{ backgroundColor: "hsl(var(--stage-preparing) / 0.5)" }}>
              <span className="font-serif text-xl font-medium block mb-0.5" style={{ color: "hsl(var(--stage-preparing-accent))" }}>{s.num}</span>
              <span className="font-sans text-[9px] font-light tracking-widest uppercase text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PreparingFinalCTA;
