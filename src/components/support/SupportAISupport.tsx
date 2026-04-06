import { MessageCircle } from "lucide-react";
import AISearchBar from "@/components/shared/AISearchBar";

const SupportAISupport = () => {
  return (
    <section id="ai-support" className="relative bg-parchment-dark py-20 md:py-28 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px]" style={{ background: 'radial-gradient(ellipse, hsl(260 22% 90% / 0.35), transparent 70%)' }} />

      <div className="container mx-auto px-6 md:px-10 max-w-3xl relative z-10">
        <div className="bg-card border border-[hsl(var(--stage-support-accent)/0.2)] rounded-2xl p-8 md:p-12 shadow-card-brand">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-full bg-[hsl(var(--stage-support)/0.5)] flex items-center justify-center">
              <MessageCircle size={16} className="text-[hsl(var(--stage-support-accent))]" />
            </div>
            <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted">Gentle guidance</p>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-3 leading-snug max-w-md">
            Ask what's been feeling off
          </h2>
          <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-4 max-w-md">
            You don't need to have the right words. Just describe what's on your mind and get gentle, personalised guidance.
          </p>

          {/* Prompt chips */}
          <div className="flex flex-wrap gap-2 mb-8">
            {["Is this normal?", "Should I be worried?", "What should I do next?"].map((chip, i) => (
              <span key={i} className="font-sans text-xs font-light bg-[hsl(var(--stage-support)/0.35)] text-foreground/70 rounded-full px-4 py-1.5 border border-[hsl(var(--stage-support-accent)/0.1)]">
                {chip}
              </span>
            ))}
          </div>

          <AISearchBar
            placeholder="Tell me what's been feeling off…"
            suggestions={[]}
          />
        </div>
      </div>
    </section>
  );
};

export default SupportAISupport;
