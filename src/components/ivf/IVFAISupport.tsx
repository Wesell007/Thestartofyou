import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";

const suggestions = [
  "Is this normal at this stage?",
  "Should I be feeling something by now?",
  "What happens next after transfer?",
  "How do I manage the two-week wait?",
];

const IVFAISupport = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleAsk = (q: string) => {
    const question = q || query;
    if (question.trim()) {
      navigate(`/ask?q=${encodeURIComponent(question.trim())}`);
    }
  };

  return (
    <section className="bg-parchment py-20 md:py-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-14 items-start">
          {/* Left — editorial */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-6" style={{ backgroundColor: 'hsl(var(--stage-ivf-accent) / 0.3)' }} />
              <span className="font-sans text-[11px] font-light tracking-[0.2em] uppercase" style={{ color: 'hsl(var(--stage-ivf-accent))' }}>
                IVF Support
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-3">
              Ask anything about your IVF journey
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-6">
              IVF can bring more questions than answers, especially during waiting periods. Ask about your stage, what to expect, or anything that has been on your mind.
            </p>

            {/* Pull-quote */}
            <div
              className="pl-5 border-l-2"
              style={{ borderColor: 'hsl(var(--stage-ivf-accent) / 0.3)' }}
            >
              <p className="font-serif italic text-sm text-foreground/55 leading-relaxed">
                "What's been on your mind since your transfer?"
              </p>
            </div>
          </div>

          {/* Right — search + suggestions */}
          <div className="md:col-span-3">
            <div
              className="rounded-2xl p-6 sm:p-8 border"
              style={{
                backgroundColor: 'hsl(var(--stage-ivf) / 0.1)',
                borderColor: 'hsl(var(--stage-ivf-accent) / 0.12)',
              }}
            >
              {/* Search input */}
              <div className="relative mb-6">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAsk(query)}
                  placeholder="Ask about your IVF journey..."
                  className="w-full pl-11 pr-12 py-4 bg-card border border-border/60 rounded-xl font-sans text-sm font-light text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-sage/50 transition-all"
                />
                <button
                  onClick={() => handleAsk(query)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center transition-colors"
                  style={{ backgroundColor: 'hsl(var(--stage-ivf) / 0.3)' }}
                >
                  <ArrowRight size={13} style={{ color: 'hsl(var(--stage-ivf-accent))' }} />
                </button>
              </div>

              {/* Suggestions */}
              <p className="font-sans text-[10px] font-light tracking-[0.15em] uppercase text-muted-foreground/60 mb-3">
                People also ask
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleAsk(s)}
                    className="text-left px-4 py-3 rounded-lg bg-card border border-border/40 font-sans text-sm font-light text-foreground/70 hover:text-foreground hover:border-border/60 transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IVFAISupport;
