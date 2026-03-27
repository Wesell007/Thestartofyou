import { ArrowUpRight, MessageCircle } from "lucide-react";

const suggestions = [
  "Is this normal?",
  "Should I be worried?",
  "What should I do next?",
];

const SupportAISupport = () => {
  return (
    <section id="ai-support" className="bg-parchment py-28 md:py-36">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <div className="bg-card border border-border/50 rounded-lg p-10 md:p-14 shadow-card-brand">
          <div className="flex items-center gap-3 mb-6">
            <MessageCircle size={20} className="text-sage" />
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted">
              AI Support
            </p>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-4 leading-snug max-w-md">
            Ask what's been feeling off
          </h2>
          <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-8 max-w-md">
            You don't need to have the right words. Just describe what's on your mind, and get gentle, personalised guidance.
          </p>

          <textarea
            rows={3}
            placeholder="Tell me what's been feeling off…"
            className="w-full bg-background border border-border rounded-md px-5 py-4 font-sans text-sm font-light text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none focus:ring-1 focus:ring-sage focus:border-sage transition-all leading-relaxed"
          />

          <div className="flex flex-wrap gap-2 mt-5">
            {suggestions.map((s, i) => (
              <button
                key={i}
                className="border border-border rounded-pill px-4 py-2 font-sans text-xs font-light text-muted-foreground hover:border-sage/40 hover:text-foreground transition-all"
              >
                {s}
              </button>
            ))}
          </div>

          <button className="mt-8 flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all">
            Ask now
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default SupportAISupport;
