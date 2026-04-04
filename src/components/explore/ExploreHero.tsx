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
    <section className="relative bg-parchment overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-40 md:pb-36">
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[700px] h-[400px] md:h-[500px] glow-sage" />

      {/* Illustration accent */}
      <img
        src={exploreIllustration}
        alt=""
        aria-hidden="true"
        className="absolute -bottom-12 -right-12 w-32 sm:w-48 md:w-64 opacity-[0.08] pointer-events-none select-none"
        width={512}
        height={640}
      />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl relative z-10 text-center">
        <p className="stage-label mb-5 md:mb-6 animate-fade-up">Explore</p>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-[3.5rem] text-foreground mb-5 md:mb-7 animate-fade-up [animation-delay:0.05s]">
          Start with a question or thought
        </h1>
        <p className="font-sans text-[15px] sm:text-base md:text-lg font-light text-muted-foreground mb-10 md:mb-14 max-w-lg mx-auto leading-relaxed animate-fade-up [animation-delay:0.1s]">
          Guidance, support, and answers, tailored to where you are.
        </p>

        <div className="animate-fade-up [animation-delay:0.2s] max-w-xl mx-auto">
          <AISearchBar
            variant="hero"
            placeholder="What's on your mind today?"
            suggestions={explorePrompts}
          />
        </div>

        {/* Secondary CTA */}
        <div className="mt-10 md:mt-12 animate-fade-up [animation-delay:0.3s]">
          <a
            href="/due-date-calculator"
            className="inline-flex items-center gap-2.5 font-sans text-[13px] font-light text-muted-foreground hover:text-foreground transition-all duration-200 group"
          >
            <Calculator size={14} className="text-sage" />
            <span className="border-b border-transparent group-hover:border-foreground/30 pb-0.5 transition-all">
              Calculate your due date
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ExploreHero;
