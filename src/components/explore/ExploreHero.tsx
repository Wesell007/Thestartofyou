import { Link } from "react-router-dom";
import { Calculator, Sparkles } from "lucide-react";
import AISearchBar from "@/components/shared/AISearchBar";

const explorePrompts = [
  "What's normal at 8 weeks pregnant?",
  "When is the best time to take a pregnancy test?",
  "I'm feeling anxious about my first trimester",
  "What should I prepare before baby arrives?",
];

const stages = [
  { label: "TTC", color: "--stage-ttc-accent", href: "/trying-to-conceive" },
  { label: "IVF", color: "--stage-ivf-accent", href: "/ivf" },
  { label: "Pregnancy", color: "--stage-pregnancy-accent", href: "/pregnancy" },
  { label: "Postpartum", color: "--stage-postpartum-accent", href: "/postpartum" },
  { label: "First year", color: "--stage-firstyear-accent", href: "/first-year" },
];

const ExploreHero = () => {
  return (
    <section
      className="relative overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-36 md:pb-28"
      style={{
        background: `linear-gradient(180deg, hsl(var(--parchment)) 0%, hsl(var(--parchment-dark)) 100%)`,
      }}
    >
      {/* Ambient glows */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] glow-sage" />
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[300px] glow-lavender" />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl relative z-10 text-center">
        {/* Micro-label */}
        <div className="inline-flex items-center gap-2 mb-4 md:mb-5 animate-fade-up">
          <Sparkles size={13} className="text-sage" />
          <span className="stage-label">Explore</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl md:text-[3.25rem] text-foreground mb-4 md:mb-5 animate-fade-up [animation-delay:0.05s] leading-tight">
          Guidance for
          <span className="italic font-normal"> every stage</span>
        </h1>

        <p className="font-sans text-[15px] sm:text-base md:text-lg font-light text-muted-foreground mb-8 md:mb-10 max-w-md mx-auto leading-relaxed animate-fade-up [animation-delay:0.1s]">
          Ask anything, explore by stage, or browse trusted guidance — all in one place.
        </p>

        {/* Search area — elevated */}
        <div className="animate-fade-up [animation-delay:0.15s] max-w-xl mx-auto mb-8 md:mb-10">
          <AISearchBar
            variant="hero"
            placeholder="Ask anything about your journey…"
            suggestions={explorePrompts}
          />
        </div>

        {/* Stage pill trail */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-6 animate-fade-up [animation-delay:0.25s]">
          {stages.map((s, i) => (
            <div key={s.label} className="flex items-center gap-1.5 sm:gap-2">
              <Link
                to={s.href}
                className="font-sans text-[10px] sm:text-[11px] font-medium tracking-wide px-3 py-1.5 rounded-pill border hover:opacity-80 transition-opacity duration-200"
                style={{
                  color: `hsl(var(${s.color}))`,
                  borderColor: `hsl(var(${s.color}) / 0.35)`,
                  backgroundColor: `hsl(var(${s.color}) / 0.08)`,
                }}
              >
                {s.label}
              </Link>
              {i < stages.length - 1 && (
                <div className="w-3 sm:w-4 h-px" style={{ backgroundColor: `hsl(var(--sage-light) / 0.4)` }} />
              )}
            </div>
          ))}
        </div>

        {/* Secondary CTA */}
        <div className="animate-fade-up [animation-delay:0.3s]">
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
