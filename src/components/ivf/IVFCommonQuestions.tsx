import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";

const questions = [
  { q: "What happens after embryo transfer?", sub: "The next steps explained" },
  { q: "When should I take a pregnancy test?", sub: "Timing and accuracy" },
  { q: "When is the first scan after IVF?", sub: "Early pregnancy monitoring" },
  { q: "Should I be feeling symptoms by now?", sub: "Understanding what to expect" },
  { q: "What does the two-week wait involve?", sub: "Navigating the hardest wait" },
];

const aiSuggestions = [
  "Is this normal at this stage?",
  "How do I manage the two-week wait?",
  "What happens next after transfer?",
  "Should I be feeling something by now?",
];

const IVFCommonQuestions = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleAsk = (q: string) => {
    const question = q || query;
    if (question.trim()) {
      navigate(`/ask?q=${encodeURIComponent(question.trim())}`);
    }
  };

  return (
    <section
      className="py-16 md:py-24"
      style={{ backgroundColor: 'hsl(var(--stage-ivf) / 0.08)' }}
    >
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        {/* Section header */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-14 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-6" style={{ backgroundColor: 'hsl(var(--stage-ivf-accent) / 0.3)' }} />
              <span className="font-sans text-[11px] font-light tracking-[0.2em] uppercase" style={{ color: 'hsl(var(--stage-ivf-accent))' }}>
                Questions and Support
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground leading-tight mb-3">
              Common questions during IVF
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
              Questions many people ask during IVF, answered clearly and with care.
            </p>
          </div>
          <div className="md:col-span-3 flex items-end">
            <div
              className="pl-5 border-l-2"
              style={{ borderColor: 'hsl(var(--stage-ivf-accent) / 0.3)' }}
            >
              <p className="font-serif italic text-[15px] text-foreground/50 leading-relaxed">
                "There are no silly questions during IVF. Every question deserves a thoughtful answer."
              </p>
            </div>
          </div>
        </div>

        {/* Two-column: questions + AI search */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-6">
          {/* Left — FAQ list */}
          <div className="bg-card border border-border/40 rounded-2xl p-6 sm:p-7 shadow-card-brand">
            <p className="font-sans text-[10px] font-light tracking-[0.15em] uppercase text-muted-foreground/60 mb-4">
              Frequently asked
            </p>
            {questions.map((item, i) => (
              <Link
                key={i}
                to={`/ask?q=${encodeURIComponent(item.q)}`}
                className="group flex items-center justify-between py-3.5 border-b last:border-0 transition-all hover:pl-1"
                style={{ borderColor: 'hsl(var(--stage-ivf) / 0.2)' }}
              >
                <div className="flex flex-col gap-0 min-w-0">
                  <p className="font-serif text-[15px] text-foreground leading-snug group-hover:text-foreground/70 transition-colors">
                    {item.q}
                  </p>
                  <p className="font-sans text-[11px] font-light text-muted-foreground/50">
                    {item.sub}
                  </p>
                </div>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 ml-3 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: 'hsl(var(--stage-ivf) / 0.2)' }}
                >
                  <ChevronRight size={13} style={{ color: 'hsl(var(--stage-ivf-accent) / 0.5)' }} />
                </div>
              </Link>
            ))}
          </div>

          {/* Right — AI search */}
          <div
            className="rounded-2xl p-6 sm:p-7 border flex flex-col"
            style={{
              backgroundColor: 'hsl(var(--stage-ivf) / 0.12)',
              borderColor: 'hsl(var(--stage-ivf-accent) / 0.12)',
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-6" style={{ backgroundColor: 'hsl(var(--stage-ivf-accent) / 0.3)' }} />
              <span className="font-sans text-[11px] font-light tracking-[0.2em] uppercase" style={{ color: 'hsl(var(--stage-ivf-accent))' }}>
                Ask anything
              </span>
            </div>
            <p className="font-serif text-lg text-foreground mb-2 leading-snug">
              Have a different question?
            </p>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-5">
              Ask about your stage, symptoms, timing, or anything that has been on your mind.
            </p>

            {/* Search input */}
            <div className="relative mb-5">
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAsk(query)}
                placeholder="Ask about your IVF journey..."
                className="w-full pl-10 pr-11 py-3.5 bg-card border border-border/60 rounded-xl font-sans text-sm font-light text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-sage/50 transition-all"
              />
              <button
                onClick={() => handleAsk(query)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'hsl(var(--stage-ivf) / 0.3)' }}
              >
                <ArrowRight size={12} style={{ color: 'hsl(var(--stage-ivf-accent))' }} />
              </button>
            </div>

            {/* Suggestions */}
            <div className="space-y-2 flex-1">
              {aiSuggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleAsk(s)}
                  className="text-left w-full px-3.5 py-2.5 rounded-lg bg-card/80 border border-border/30 font-sans text-[13px] font-light text-foreground/65 hover:text-foreground hover:border-border/50 transition-all"
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t" style={{ borderColor: 'hsl(var(--stage-ivf-accent) / 0.08)' }}>
              <p className="font-serif italic text-[13px] text-foreground/40 leading-relaxed">
                "What's been on your mind since your transfer?"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IVFCommonQuestions;
