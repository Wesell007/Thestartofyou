import { ArrowDown, ArrowUpRight } from "lucide-react";

const FirstYearHero = () => {
  return (
    <section className="relative min-h-[85vh] bg-parchment overflow-hidden flex flex-col justify-center pt-28 pb-20">
      {/* Triple ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ backgroundColor: 'hsl(var(--stage-firstyear) / 0.4)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-3xl"
          style={{ backgroundColor: 'hsl(var(--stage-firstyear) / 0.25)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-3xl"
          style={{ backgroundColor: 'hsl(var(--stage-firstyear) / 0.15)' }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-10 max-w-5xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left — headline */}
          <div>
            <p
              className="font-sans text-[11px] font-light tracking-[0.3em] uppercase mb-6"
              style={{ color: 'hsl(var(--stage-firstyear-accent))' }}
            >
              First Year
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-[3.5rem] text-foreground mb-5 animate-fade-up leading-[1.08]">
              Everything changes. And then it{" "}
              <span className="italic">changes again</span>.
            </h1>
            <p className="font-sans text-base md:text-lg font-light text-muted-foreground leading-relaxed mb-8 max-w-md animate-fade-up [animation-delay:0.1s]">
              Twelve months of growth, development, and shifting patterns. This guide helps you understand each phase as it arrives.
            </p>

            {/* Stat anchors */}
            <div className="flex items-center gap-5 mb-10 animate-fade-up [animation-delay:0.15s]">
              {[
                { n: "4", label: "phases" },
                { n: "12", label: "months" },
                { n: "∞", label: "small shifts" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center rounded-xl px-4 py-2.5"
                  style={{ backgroundColor: 'hsl(var(--stage-firstyear) / 0.2)' }}
                >
                  <span className="font-serif text-xl text-foreground">{s.n}</span>
                  <span className="font-sans text-[10px] font-light text-muted-foreground/60 uppercase tracking-wide">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-3.5 animate-fade-up [animation-delay:0.2s]">
              <button className="flex items-center gap-2.5 bg-terracotta text-terracotta-foreground rounded-pill px-8 py-4 font-sans text-[13px] font-medium shadow-cta hover:bg-terracotta-hover transition-all duration-300">
                <ArrowUpRight size={15} />
                Start your first year journey
              </button>
              <button className="flex items-center gap-2.5 border border-foreground/12 text-foreground rounded-pill px-7 py-3.5 font-sans text-[13px] font-light hover:bg-parchment-dark transition-all duration-300">
                <ArrowDown size={15} />
                Jump to your stage
              </button>
            </div>
          </div>

          {/* Right — developmental truth card */}
          <div className="animate-fade-up [animation-delay:0.25s]">
            <div
              className="rounded-2xl p-7 sm:p-8 border border-border/30"
              style={{ backgroundColor: 'hsl(var(--stage-firstyear) / 0.25)' }}
            >
              <div className="flex items-center justify-between mb-5">
                <p
                  className="font-sans text-[11px] font-light tracking-[0.2em] uppercase"
                  style={{ color: 'hsl(var(--stage-firstyear-accent))' }}
                >
                  What this year is really like
                </p>
                <div className="flex items-center gap-1.5">
                  {[0.5, 0.35, 0.2, 0.1].map((o, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `hsl(var(--stage-firstyear-accent) / ${o})` }} />
                  ))}
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {[
                  { t: "Your baby will change faster than you can keep up with", strong: true },
                  { t: "Patterns form, then shift again. This is normal development.", strong: false },
                  { t: "What works this week may not work next week", strong: false },
                  { t: "You're not falling behind. You're adapting to constant change.", strong: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: `hsl(var(--stage-firstyear-accent) / ${item.strong ? '0.7' : '0.3'})` }}
                    />
                    <p className={`font-sans text-sm leading-relaxed ${item.strong ? 'text-foreground font-normal' : 'font-light text-muted-foreground'}`}>
                      {item.t}
                    </p>
                  </div>
                ))}
              </div>

              <div
                className="pt-5 border-t"
                style={{ borderColor: 'hsl(var(--stage-firstyear-accent) / 0.12)' }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: 'hsl(var(--stage-firstyear) / 0.3)' }}
                  >
                    <span className="font-serif text-xs" style={{ color: 'hsl(var(--stage-firstyear-accent))' }}>✦</span>
                  </div>
                  <p className="font-serif italic text-base text-foreground/60 leading-relaxed">
                    "You're growing too, even when it doesn't feel like it."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-fade-bottom" />
    </section>
  );
};

export default FirstYearHero;
