import { ArrowDown, ArrowUpRight } from "lucide-react";

const FirstYearHero = () => {
  return (
    <section className="relative min-h-[80vh] bg-parchment overflow-hidden flex flex-col justify-center pt-28 pb-24">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-3xl"
          style={{ backgroundColor: 'hsl(var(--stage-firstyear) / 0.5)' }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-10 max-w-3xl relative z-10 text-center">
        <p
          className="font-sans text-[11px] font-light tracking-[0.3em] uppercase mb-7"
          style={{ color: 'hsl(var(--stage-firstyear-accent))' }}
        >
          First Year
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-[3.5rem] text-foreground mb-8 animate-fade-up leading-[1.1]">
          Your baby's <span className="italic">first year</span>
        </h1>
        <p className="font-sans text-base md:text-lg font-light text-muted-foreground leading-relaxed mb-14 max-w-xl mx-auto animate-fade-up [animation-delay:0.1s]">
          Growth, change, and learning to adapt, one stage at a time.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up [animation-delay:0.2s]">
          <button className="flex items-center gap-2.5 bg-terracotta text-terracotta-foreground rounded-pill px-8 py-4 font-sans text-[13px] font-medium shadow-cta hover:bg-terracotta-hover transition-all duration-300">
            <ArrowUpRight size={15} />
            Start your journey
          </button>
          <button className="flex items-center gap-2.5 border border-foreground/12 text-foreground rounded-pill px-7 py-3.5 font-sans text-[13px] font-light hover:bg-parchment-dark transition-all duration-300">
            <ArrowDown size={15} />
            Jump to your stage
          </button>
        </div>
      </div>

      <div className="section-fade-bottom" />
    </section>
  );
};

export default FirstYearHero;
