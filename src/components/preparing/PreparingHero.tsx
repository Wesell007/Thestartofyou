import { ArrowDown, ArrowUpRight } from "lucide-react";

const PreparingHero = () => {
  return (
    <section className="relative min-h-[85vh] overflow-hidden flex flex-col justify-center pt-28 pb-24"
      style={{ backgroundColor: "hsl(var(--stage-preparing) / 0.5)" }}
    >
      {/* Triple ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-3xl"
          style={{ backgroundColor: "hsl(var(--stage-preparing-accent) / 0.07)" }} />
        <div className="absolute bottom-1/3 right-1/5 w-[400px] h-[400px] rounded-full blur-3xl"
          style={{ backgroundColor: "hsl(var(--sage-bg) / 0.18)" }} />
        <div className="absolute top-2/3 left-1/2 w-[300px] h-[300px] rounded-full blur-3xl"
          style={{ backgroundColor: "hsl(var(--stage-preparing-accent) / 0.04)" }} />
      </div>

      <div className="container mx-auto px-6 md:px-10 max-w-4xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-center">
          {/* Left — headline */}
          <div>
            <p className="font-sans text-[11px] font-light tracking-[0.3em] uppercase mb-6"
              style={{ color: "hsl(var(--stage-preparing-accent))" }}>
              Preparing for your baby
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-[3.6rem] text-foreground mb-6 animate-fade-up leading-[1.06]">
              You don't need <span className="italic">everything</span>.
            </h1>
            <p className="font-serif italic text-lg md:text-xl text-foreground/65 leading-relaxed mb-6 animate-fade-up [animation-delay:0.08s]">
              You need to know what actually matters.
            </p>
            <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-10 max-w-md animate-fade-up [animation-delay:0.12s]">
              A calmer way to prepare — focused on essentials, not excess. Less noise, more clarity, and permission to leave the rest.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4 animate-fade-up [animation-delay:0.2s]">
              <button className="flex items-center gap-2.5 bg-terracotta text-terracotta-foreground rounded-pill px-8 py-4 font-sans text-[13px] font-medium shadow-cta hover:bg-terracotta-hover transition-all duration-300">
                <ArrowUpRight size={15} />
                See what you need
              </button>
              <button className="flex items-center gap-2.5 border border-foreground/12 text-foreground rounded-pill px-7 py-3.5 font-sans text-[13px] font-light hover:bg-parchment-dark transition-all duration-300">
                <ArrowDown size={15} />
                What can wait
              </button>
            </div>
          </div>

          {/* Right — truth card + stat anchors */}
          <div className="animate-fade-up [animation-delay:0.15s]">
            {/* Emotional truth card */}
            <div className="bg-card/80 backdrop-blur-sm border border-border/40 rounded-2xl p-8 shadow-elevated mb-5"
              style={{ borderTopWidth: "3px", borderTopColor: "hsl(var(--stage-preparing-accent))" }}>
              <span className="font-sans text-[10px] font-light tracking-[0.2em] uppercase mb-5 block"
                style={{ color: "hsl(var(--stage-preparing-accent))" }}>
                ✦ An honest starting point
              </span>
              <p className="font-serif text-xl text-foreground/85 leading-relaxed mb-3">
                "Most of what you're told you need, <span className="italic">you don't</span>."
              </p>
              <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                Focus on the basics. Trust yourself with the rest. That's genuinely enough.
              </p>
            </div>

            {/* Stat anchors */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { num: "4", label: "core needs" },
                { num: "80%", label: "can wait" },
                { num: "∞", label: "opinions to ignore" },
              ].map((s, i) => (
                <div key={i} className="text-center rounded-xl px-3 py-4 border border-border/30"
                  style={{ backgroundColor: "hsl(var(--stage-preparing) / 0.65)" }}>
                  <span className="font-serif text-2xl font-medium block mb-0.5"
                    style={{ color: "hsl(var(--stage-preparing-accent))" }}>{s.num}</span>
                  <span className="font-sans text-[9px] font-light tracking-widest uppercase text-muted-foreground">{s.label}</span>
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
