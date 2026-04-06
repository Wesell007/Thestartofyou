import { Calculator, Sparkles } from "lucide-react";
import AISearchBar from "@/components/shared/AISearchBar";

const explorePrompts = [
  "Is this normal?",
  "When should I test?",
  "What should I expect this week?",
  "What do I need to prepare?",
];

/* Journey stage mini-pills in the hero */
const stages = [
  { label: "TTC", color: "--stage-ttc-accent" },
  { label: "IVF", color: "--stage-ivf-accent" },
  { label: "Pregnancy", color: "--stage-pregnancy-accent" },
  { label: "Postpartum", color: "--stage-postpartum-accent" },
  { label: "First year", color: "--stage-firstyear-accent" },
];

const ExploreHero = () => {
  return (
    <section
      className="relative overflow-hidden pt-24 pb-14 sm:pt-28 sm:pb-18 md:pt-36 md:pb-28"
      style={{
        background: `linear-gradient(180deg, hsl(var(--parchment)) 0%, hsl(var(--parchment-dark)) 100%)`,
      }}
    >
      {/* Ambient glows */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] glow-sage" />
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[300px] glow-lavender" />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl relative z-10 text-center">
        {/* Micro-label */}
        <div className="inline-flex items-center gap-2 mb-5 md:mb-6 animate-fade-up">
          <Sparkles size={13} className="text-sage" />
          <span className="stage-label">Explore</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl md:text-[3.25rem] text-foreground mb-5 md:mb-6 animate-fade-up [animation-delay:0.05s] leading-tight">
          Guidance for
          <span className="italic font-normal"> every stage</span>
        </h1>

        <p className="font-sans text-[15px] sm:text-base md:text-lg font-light text-muted-foreground mb-8 md:mb-10 max-w-lg mx-auto leading-relaxed animate-fade-up [animation-delay:0.1s]">
          Answers, support, and tools — designed for where you are right now.
        </p>

        {/* Stage pill trail */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-10 md:mb-12 animate-fade-up [animation-delay:0.15s]">
          {stages.map((s, i) => (
            <div key={s.label} className="flex items-center gap-1.5 sm:gap-2">
              <span
                className="font-sans text-[10px] sm:text-[11px] font-light tracking-wide px-2.5 py-1 rounded-pill border"
                style={{
                  color: `hsl(var(${s.color}))`,
                  borderColor: `hsl(var(${s.color}) / 0.3)`,
                  backgroundColor: `hsl(var(${s.color}) / 0.06)`,
                }}
              >
                {s.label}
              </span>
              {i < stages.length - 1 && (
                <div className="w-3 sm:w-4 h-px" style={{ backgroundColor: `hsl(var(--sage-light) / 0.4)` }} />
              )}
            </div>
          ))}
        </div>

        <div className="animate-fade-up [animation-delay:0.2s] max-w-xl mx-auto">
          <AISearchBar
            variant="hero"
            placeholder="What's on your mind today?"
            suggestions={explorePrompts}
          />
        </div>

        {/* Secondary CTA */}
        <div className="mt-8 md:mt-10 animate-fade-up [animation-delay:0.3s]">
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
