import { Calculator, Sparkles } from "lucide-react";
import AISearchBar from "@/components/shared/AISearchBar";

const explorePrompts = [
  "Is this normal?",
  "When should I test?",
  "What should I expect this week?",
  "What do I need to prepare?",
];

const ExploreHero = () => {
  return (
    <section className="relative overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-36 md:pb-32" style={{ background: `linear-gradient(180deg, hsl(var(--parchment)) 0%, hsl(var(--parchment-dark)) 100%)` }}>
      {/* Radial glows */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] glow-sage" />
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[300px] glow-lavender" />

      {/* Decorative stage colour dots */}
      <div className="absolute top-20 right-[15%] hidden md:flex gap-2 opacity-40">
        {['--stage-ttc', '--stage-ivf', '--stage-pregnancy', '--stage-postpartum', '--stage-firstyear'].map((c) => (
          <div key={c} className="w-2 h-2 rounded-full" style={{ background: `hsl(var(${c}))` }} />
        ))}
      </div>

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl relative z-10 text-center">
        {/* Micro-label */}
        <div className="inline-flex items-center gap-2 mb-6 md:mb-8 animate-fade-up">
          <Sparkles size={13} className="text-sage" />
          <span className="stage-label">Your journey, guided</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl md:text-[3.25rem] text-foreground mb-5 md:mb-7 animate-fade-up [animation-delay:0.05s] leading-tight">
          Explore guidance for
          <br className="hidden sm:block" />
          <span className="italic font-normal"> every stage</span>
        </h1>

        <p className="font-sans text-[15px] sm:text-base md:text-lg font-light text-muted-foreground mb-10 md:mb-14 max-w-lg mx-auto leading-relaxed animate-fade-up [animation-delay:0.1s]">
          From trying to conceive through your baby's first year — answers, support, and tools designed for where you are right now.
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

      {/* Bottom gradient blend into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none" style={{ background: `linear-gradient(to top, hsl(var(--parchment)) 0%, transparent 100%)` }} />
    </section>
  );
};

export default ExploreHero;
