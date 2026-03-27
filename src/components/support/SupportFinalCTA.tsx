import { ArrowUpRight } from "lucide-react";

const SupportFinalCTA = () => {
  return (
    <section className="bg-parchment-dark py-28 md:py-36 frame-corner">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center">
        <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-6">
          Begin
        </p>
        <h2 className="font-serif text-4xl sm:text-5xl text-foreground mb-5 leading-tight">
          Continue your journey
        </h2>
        <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-10 max-w-md mx-auto">
          Wherever you are, there's a next step — and you don't have to take it alone.
        </p>
        <button className="flex items-center gap-2 mx-auto bg-terracotta text-terracotta-foreground rounded-pill px-8 py-4 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all">
          Explore support
          <ArrowUpRight size={16} />
        </button>

        <p className="mt-16 font-sans text-xs font-light text-muted-foreground/60">
          ✔ Medically reviewed by Jenny Joines
        </p>
      </div>
    </section>
  );
};

export default SupportFinalCTA;
