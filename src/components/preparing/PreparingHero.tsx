import { ArrowDown, ArrowUpRight } from "lucide-react";

const PreparingHero = () => {
  return (
    <section className="relative min-h-[80vh] overflow-hidden flex flex-col justify-center pt-28 pb-24"
      style={{ backgroundColor: "hsl(var(--stage-preparing) / 0.5)" }}
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ backgroundColor: "hsl(var(--stage-preparing-accent) / 0.08)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-3xl"
          style={{ backgroundColor: "hsl(var(--sage-bg) / 0.2)" }} />
      </div>

      <div className="container mx-auto px-6 md:px-10 max-w-4xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left — headline */}
          <div>
            <p className="font-sans text-[11px] font-light tracking-[0.3em] uppercase text-sage-muted mb-6">
              Preparing
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-[3.4rem] text-foreground mb-7 animate-fade-up leading-[1.08]">
              Less noise. More <span className="italic">clarity</span>.
            </h1>
            <p className="font-sans text-base md:text-lg font-light text-muted-foreground leading-relaxed mb-10 max-w-md animate-fade-up [animation-delay:0.1s]">
              You don't need everything. You need to know what actually matters — and permission to leave the rest.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4 animate-fade-up [animation-delay:0.2s]">
              <button className="flex items-center gap-2.5 bg-terracotta text-terracotta-foreground rounded-pill px-8 py-4 font-sans text-[13px] font-medium shadow-cta hover:bg-terracotta-hover transition-all duration-300">
                <ArrowUpRight size={15} />
                Start preparing
              </button>
              <button className="flex items-center gap-2.5 border border-foreground/12 text-foreground rounded-pill px-7 py-3.5 font-sans text-[13px] font-light hover:bg-parchment-dark transition-all duration-300">
                <ArrowDown size={15} />
                See what matters
              </button>
            </div>
          </div>

          {/* Right — truth card + stat anchors */}
          <div className="animate-fade-up [animation-delay:0.15s]">
            {/* Emotional truth card */}
            <div className="bg-card/80 backdrop-blur-sm border border-border/40 rounded-2xl p-8 shadow-elevated mb-6">
              <span className="font-sans text-[10px] font-light tracking-[0.2em] uppercase mb-4 block"
                style={{ color: "hsl(var(--stage-preparing-accent))" }}>
                ✦ An honest starting point
              </span>
              <p className="font-serif italic text-lg text-foreground/80 leading-relaxed mb-4">
                "Most of what you're told you need, you don't. Focus on the basics, and trust yourself with the rest."
              </p>
              <p className="font-sans text-xs font-light text-muted-foreground">
                — The Start of You editorial guidance
              </p>
            </div>

            {/* Stat anchors */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { num: "5", label: "core categories" },
                { num: "80%", label: "can wait" },
                { num: "∞", label: "opinions online" },
              ].map((s, i) => (
                <div key={i} className="text-center rounded-xl px-3 py-3.5 border border-border/30"
                  style={{ backgroundColor: "hsl(var(--stage-preparing) / 0.6)" }}>
                  <span className="font-serif text-xl font-medium block"
                    style={{ color: "hsl(var(--stage-preparing-accent))" }}>{s.num}</span>
                  <span className="font-sans text-[10px] font-light tracking-wider uppercase text-muted-foreground">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="section-fade-bottom" />
    </section>
  );
};

export default PreparingHero;
