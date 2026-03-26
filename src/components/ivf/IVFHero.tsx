import { ArrowDown, HeartHandshake } from "lucide-react";

const IVFHero = () => {
  return (
    <section className="relative min-h-[80vh] bg-parchment overflow-hidden flex flex-col justify-center pt-24 pb-16">
      {/* Soft radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-lavender-section/40 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 md:px-10 max-w-4xl relative z-10 text-center">
        {/* Stage label */}
        <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-6">
          IVF Journey
        </p>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-foreground leading-[1.1] mb-6 animate-fade-up">
          Your <span className="italic">IVF journey</span>
        </h1>

        <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-12 max-w-2xl mx-auto animate-fade-up [animation-delay:0.1s]">
          A more structured path into pregnancy — with its own pace, stages, and emotional experience.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up [animation-delay:0.2s]">
          <button className="flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all">
            <HeartHandshake size={15} />
            Understand your stage
          </button>
          <button className="flex items-center gap-2 border border-foreground/20 text-foreground rounded-pill px-7 py-3.5 font-sans text-sm font-light hover:bg-parchment-dark transition-all">
            <ArrowDown size={15} />
            Start your journey
          </button>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-parchment to-transparent pointer-events-none" />
    </section>
  );
};

export default IVFHero;
