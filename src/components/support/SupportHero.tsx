import { ArrowUpRight } from "lucide-react";
import supportIllustration from "@/assets/support-illustration.png";

const SupportHero = () => {
  return (
    <section className="relative bg-parchment pt-36 pb-32 md:pt-44 md:pb-40 overflow-hidden">
      {/* Radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-sage-bg/15 blur-3xl pointer-events-none" />

      {/* Illustration accent */}
      <img
        src={supportIllustration}
        alt=""
        aria-hidden="true"
        className="absolute -bottom-10 -left-10 w-44 md:w-56 opacity-[0.07] pointer-events-none select-none"
        width={512}
        height={640}
      />

      <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center relative z-10">
        <p className="font-sans text-[11px] font-light tracking-[0.3em] uppercase text-sage-muted mb-7">
          Support
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-[3.5rem] text-foreground mb-8 animate-fade-up">
          Support, when you need it
        </h1>
        <p className="font-sans text-base md:text-lg font-light text-muted-foreground leading-relaxed max-w-xl mx-auto mb-14 animate-fade-up [animation-delay:0.1s]">
          If something feels uncertain, overwhelming, or different, you're not alone, this space is here to help you understand what's going on.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up [animation-delay:0.2s]">
          <a
            href="#ai-support"
            className="flex items-center gap-2.5 bg-terracotta text-terracotta-foreground rounded-pill px-8 py-4 font-sans text-[13px] font-medium shadow-cta hover:bg-terracotta-hover transition-all duration-300"
          >
            Ask what's been feeling off
            <ArrowUpRight size={16} />
          </a>
          <a
            href="#start-here"
            className="flex items-center gap-2.5 border border-foreground/12 text-foreground rounded-pill px-7 py-3.5 font-sans text-[13px] font-light hover:bg-parchment-dark transition-all duration-300"
          >
            Explore support
          </a>
        </div>
      </div>

      <div className="section-fade-bottom" />
    </section>
  );
};

export default SupportHero;
