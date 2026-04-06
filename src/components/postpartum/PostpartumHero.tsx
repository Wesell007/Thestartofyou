import { ArrowDown, ArrowUpRight } from "lucide-react";

const PostpartumHero = () => {
  return (
    <section className="relative min-h-[85vh] bg-parchment overflow-hidden flex flex-col justify-center pt-28 pb-20">
      {/* Triple ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ backgroundColor: 'hsl(var(--stage-postpartum) / 0.4)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-3xl"
          style={{ backgroundColor: 'hsl(var(--stage-postpartum) / 0.25)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-3xl"
          style={{ backgroundColor: 'hsl(var(--stage-postpartum) / 0.15)' }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-10 max-w-5xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left — headline */}
          <div>
            <p
              className="font-sans text-[11px] font-light tracking-[0.3em] uppercase mb-6"
              style={{ color: 'hsl(var(--stage-postpartum-accent))' }}
            >
              Postpartum
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-[3.5rem] text-foreground mb-6 animate-fade-up leading-[1.08]">
              Recovery, adjustment, and the{" "}
              <span className="italic">early days</span> together.
            </h1>
            <p className="font-sans text-base md:text-lg font-light text-muted-foreground leading-relaxed mb-8 max-w-md animate-fade-up [animation-delay:0.1s]">
              Calm, practical guidance for your body, your baby, and the emotional reality of this stage.
            </p>

            {/* Stat anchors */}
            <div className="flex items-center gap-6 mb-10 animate-fade-up [animation-delay:0.15s]">
              {[
                { n: "3", label: "phases" },
                { n: "12", label: "weeks" },
                { n: "1", label: "day at a time" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col items-center">
                  <span className="font-serif text-2xl text-foreground">{s.n}</span>
                  <span className="font-sans text-[10px] font-light text-muted-foreground/60 uppercase tracking-wide">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-3.5 animate-fade-up [animation-delay:0.2s]">
              <button className="flex items-center gap-2.5 bg-terracotta text-terracotta-foreground rounded-pill px-8 py-4 font-sans text-[13px] font-medium shadow-cta hover:bg-terracotta-hover transition-all duration-300">
                <ArrowUpRight size={15} />
                Start your postpartum journey
              </button>
              <button className="flex items-center gap-2.5 border border-foreground/12 text-foreground rounded-pill px-7 py-3.5 font-sans text-[13px] font-light hover:bg-parchment-dark transition-all duration-300">
                <ArrowDown size={15} />
                Jump to your week
              </button>
            </div>
          </div>

          {/* Right — emotional truth card */}
          <div className="animate-fade-up [animation-delay:0.25s]">
            <div
              className="rounded-2xl p-7 sm:p-8 border border-border/30"
              style={{ backgroundColor: 'hsl(var(--stage-postpartum) / 0.25)' }}
            >
              <p
                className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-5"
                style={{ color: 'hsl(var(--stage-postpartum-accent))' }}
              >
                What this stage is really like
              </p>

              <div className="space-y-4 mb-6">
                {[
                  "Your body is recovering while learning something completely new",
                  "Days can blur together, and that's part of the adjustment",
                  "Feeling overwhelmed doesn't mean you're doing it wrong",
                  "Small moments of connection matter more than getting everything right",
                ].map((t, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: `hsl(var(--stage-postpartum-accent) / ${i === 0 ? '0.7' : '0.35'})` }}
                    />
                    <p className={`font-sans text-sm font-light leading-relaxed ${i === 0 ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {t}
                    </p>
                  </div>
                ))}
              </div>

              <div
                className="pt-5 border-t"
                style={{ borderColor: 'hsl(var(--stage-postpartum-accent) / 0.12)' }}
              >
                <p className="font-serif italic text-base text-foreground/60 leading-relaxed">
                  "You're doing more than you realise, even on the days that feel hardest."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-fade-bottom" />
    </section>
  );
};

export default PostpartumHero;
