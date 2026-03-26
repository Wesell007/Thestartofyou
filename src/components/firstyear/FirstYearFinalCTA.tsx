import { ArrowUpRight } from "lucide-react";

const FirstYearFinalCTA = () => {
  return (
    <section className="bg-parchment-dark py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center">
        <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-6">
          Your Journey
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground leading-[1.15] mb-8">
          Continue your journey
        </h2>
        <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-10 max-w-lg mx-auto">
          Every stage brings something new. You don't have to figure it all out at once.
        </p>
        <button className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-8 py-4 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all">
          <ArrowUpRight size={15} />
          Start my journey
        </button>
      </div>
    </section>
  );
};

export default FirstYearFinalCTA;
