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
    <section className="relative bg-parchment overflow-hidden pt-32 pb-28 md:pt-40 md:pb-36">
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] glow-sage" />

      {/* Illustration accent */}
      <img
        src={exploreIllustration}
        alt=""
        aria-hidden="true"
        className="absolute -bottom-12 -right-12 w-48 md:w-64 opacity-[0.08] pointer-events-none select-none"
        width={512}
        height={640}
      />

      <div className="container mx-auto px-6 md:px-10 max-w-3xl relative z-10 text-center">
        <p className="stage-label mb-6 animate-fade-up">Explore</p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-[3.5rem] text-foreground mb-7 animate-fade-up [animation-delay:0.05s]">
          Start with a question or thought
        </h1>
        <p className="font-sans text-base md:text-lg font-light text-muted-foreground mb-14 max-w-lg mx-auto leading-relaxed animate-fade-up [animation-delay:0.1s]">
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
        <div className="mt-12 animate-fade-up [animation-delay:0.3s]">
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
