import { ArrowUpRight } from "lucide-react";

const SupportCapture = () => {
  return (
    <section className="bg-parchment-dark py-28 md:py-36">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center">
        <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
          Your space
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-5 leading-tight max-w-md mx-auto">
          Capture what this feels like
        </h2>
        <p className="font-sans text-base font-light text-muted-foreground leading-relaxed max-w-md mx-auto mb-4">
          Moments like this can be hard to process, and easy to move past without fully understanding them.
        </p>
        <p className="font-sans text-base font-light text-muted-foreground leading-relaxed max-w-md mx-auto mb-10">
          Some people find it helpful to write things down as they go, what they're feeling, thinking, and working through.
        </p>
        <a
          href="#"
          className="inline-flex items-center gap-2 border border-foreground/20 text-foreground rounded-pill px-7 py-3.5 font-sans text-sm font-light hover:bg-parchment transition-all"
        >
          Explore the journal
          <ArrowUpRight size={14} />
        </a>
      </div>
    </section>
  );
};

export default SupportCapture;
