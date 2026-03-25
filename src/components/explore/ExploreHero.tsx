import { useState } from "react";
import { Search, ArrowUpRight, Calculator } from "lucide-react";

const prompts = [
  "Is this normal?",
  "When should I test?",
  "What should I expect this week?",
  "What do I need to prepare?",
];

const ExploreHero = () => {
  const [query, setQuery] = useState("");

  return (
    <section className="relative bg-parchment overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      {/* Soft radial glow behind hero */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, hsl(var(--sage-bg) / 0.5) 0%, transparent 70%)" }}
      />

      <div className="container mx-auto px-6 md:px-10 max-w-3xl relative z-10 text-center">
        <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage mb-4">
          Explore
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-foreground leading-[1.1] mb-5 animate-fade-up">
          Explore your journey
        </h1>
        <p className="font-sans text-base md:text-lg font-light text-muted-foreground mb-10 max-w-lg mx-auto leading-relaxed animate-fade-up [animation-delay:0.1s]">
          Guidance, support, and answers — tailored to where you are.
        </p>

        {/* Search bar */}
        <div className="animate-fade-up [animation-delay:0.2s]">
          <div className="relative bg-card border border-border rounded-pill px-5 py-4 flex items-center gap-3 shadow-card-brand focus-within:border-sage focus-within:shadow-soft transition-all max-w-xl mx-auto">
            <Search size={18} className="text-sage-muted shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What's on your mind today?"
              className="flex-1 bg-transparent font-sans text-sm font-light text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              className="bg-terracotta text-terracotta-foreground rounded-pill px-5 py-2 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all shrink-0"
              aria-label="Ask now"
            >
              Ask now
            </button>
          </div>

          {/* Suggested prompts */}
          <div className="flex flex-wrap gap-2 justify-center mt-4">
            {prompts.map((p) => (
              <button
                key={p}
                onClick={() => setQuery(p)}
                className="font-sans text-xs font-light text-muted-foreground border border-border rounded-pill px-3.5 py-1.5 hover:border-sage hover:text-foreground transition-all bg-card"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary CTA */}
        <div className="mt-8 animate-fade-up [animation-delay:0.3s]">
          <a
            href="#"
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
