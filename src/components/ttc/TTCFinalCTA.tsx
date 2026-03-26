import { ArrowUpRight } from "lucide-react";

const TTCFinalCTA = () => {
  return (
    <section className="bg-parchment py-24 md:py-32 frame-corner">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center">
        <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-6">
          Begin
        </p>
        <h2 className="font-serif text-4xl sm:text-5xl text-foreground mb-5 leading-tight">
          Start your journey
        </h2>
        <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-10 max-w-md mx-auto">
          Understand your cycle, track your timing, and get guidance that moves with you.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-8 py-4 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all">
            Start my journey
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TTCFinalCTA;
