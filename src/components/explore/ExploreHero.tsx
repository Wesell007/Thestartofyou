import { Calculator } from "lucide-react";
import AISearchBar from "@/components/shared/AISearchBar";
import exploreIllustration from "@/assets/explore-illustration.png";

const explorePrompts = [
  "Is this normal?",
  "When should I test?",
  "What should I expect this week?",
  "What do I need to prepare?",
];

const ExploreHero = () => {
  return (
    <section className="relative bg-parchment overflow-hidden pt-28 pb-24 md:pt-36 md:pb-32">
      {/* Soft radial glow behind hero */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, hsl(var(--sage-bg) / 0.5) 0%, transparent 70%)" }}
      />

      {/* Subtle illustration accent */}
      <img
        src={exploreIllustration}
        alt=""
        aria-hidden="true"
        className="absolute -bottom-10 -right-10 w-48 md:w-64 opacity-[0.12] pointer-events-none select-none"
        width={512}
        height={640}
      />

      <div className="container mx-auto px-6 md:px-10 max-w-3xl relative z-10 text-center">
        <p className="font-sans text-xs font-light tracking-[0.25em] uppercase text-sage mb-5">
          Explore
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-foreground leading-[1.1] mb-6 animate-fade-up">
          Start with a question or thought
        </h1>
        <p className="font-sans text-base md:text-lg font-light text-muted-foreground mb-12 max-w-lg mx-auto leading-relaxed animate-fade-up [animation-delay:0.1s]">
          Guidance, support, and answers — tailored to where you are.
        </p>

        <div className="animate-fade-up [animation-delay:0.2s] max-w-xl mx-auto">
          <AISearchBar
            variant="hero"
            placeholder="What's on your mind today?"
            suggestions={explorePrompts}
          />
        </div>

        {/* Secondary CTA */}
        <div className="mt-10 animate-fade-up [animation-delay:0.3s]">
          <a
            href="/due-date-calculator"
            className="inline-flex items-center gap-2 font-sans text-sm font-light text-muted-foreground border-b border-border hover:text-foreground hover:border-foreground transition-all pb-0.5"
          >
            <Calculator size={14} className="text-sage" />
            Calculate your due date
          </a>
        </div>
      </div>
    </section>
  );
};

export default ExploreHero;
