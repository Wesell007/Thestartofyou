import { ArrowUpRight } from "lucide-react";
import supportIllustration from "@/assets/support-illustration.png";

const SupportHero = () => {
  return (
    <section className="relative bg-parchment pt-32 pb-28 md:pt-40 md:pb-36 overflow-hidden">
      {/* Subtle illustration */}
      <img
        src={supportIllustration}
        alt=""
        aria-hidden="true"
        className="absolute -bottom-8 -left-8 w-44 md:w-56 opacity-[0.1] pointer-events-none select-none"
        width={512}
        height={640}
      />

      <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center relative z-10">
        <p className="font-sans text-xs font-light tracking-[0.25em] uppercase text-sage-muted mb-6">
          Support
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-foreground leading-[1.15] mb-7">
          Support, when you need it
        </h1>
        <p className="font-sans text-base md:text-lg font-light text-muted-foreground leading-relaxed max-w-xl mx-auto mb-12">
          If something feels uncertain, overwhelming, or different, you're not alone — this space is here to help you understand what's going on.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#ai-support"
            className="flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-8 py-4 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
          >
            Ask what's been feeling off
            <ArrowUpRight size={16} />
          </a>
          <a
            href="#start-here"
            className="flex items-center gap-2 border border-foreground/15 text-foreground rounded-pill px-7 py-3.5 font-sans text-sm font-light hover:bg-parchment-dark transition-all"
          >
            Explore support
          </a>
        </div>
      </div>
    </section>
  );
};

export default SupportHero;
