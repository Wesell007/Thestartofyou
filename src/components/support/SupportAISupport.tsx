import { MessageCircle } from "lucide-react";
import AISearchBar from "@/components/shared/AISearchBar";
import AskLink from "@/components/shared/AskLink";

const SupportAISupport = () => {
  return (
    <section id="ai-support" className="relative bg-[hsl(var(--stage-support)/0.25)] py-16 md:py-24 overflow-hidden">
      {/* Dual ambient glows */}
      <div className="absolute top-1/3 left-1/3 w-[400px] h-[250px] rounded-full blur-3xl pointer-events-none" style={{ background: 'hsl(260 22% 88% / 0.3)' }} />
      <div className="absolute bottom-1/4 right-1/3 w-[350px] h-[200px] rounded-full blur-3xl pointer-events-none" style={{ background: 'hsl(260 22% 92% / 0.25)' }} />

      <div className="container mx-auto px-6 md:px-10 max-w-3xl relative z-10">
        <div className="bg-card border-t-2 border-t-[hsl(var(--stage-support-accent)/0.5)] border border-[hsl(var(--stage-support-accent)/0.15)] rounded-2xl p-8 md:p-12 shadow-card-brand">
          <div className="text-center mb-8">
            <div className="w-11 h-11 rounded-full bg-[hsl(var(--stage-support)/0.5)] flex items-center justify-center mx-auto mb-4">
              <MessageCircle size={18} className="text-[hsl(var(--stage-support-accent))]" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-[2.2rem] text-foreground mb-3 leading-snug">
              Ask what's been feeling off
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed max-w-md mx-auto">
              You don't need to have the right words. Just describe what's on your mind and get gentle, personalised guidance.
            </p>
          </div>

          {/* Prompt chips */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {["Is this normal?", "Should I be worried?", "What should I do next?", "I don't feel like myself"].map((chip) => (
              <AskLink
                key={chip}
                question={chip}
                context="Support"
                stage="support"
                className="font-sans text-xs font-light bg-[hsl(var(--stage-support)/0.35)] text-foreground/70 rounded-full px-4 py-2 border border-[hsl(var(--stage-support-accent)/0.1)] hover:border-[hsl(var(--stage-support-accent)/0.3)] transition-colors cursor-pointer"
              >
                {chip}
              </AskLink>
            ))}
          </div>

          <AISearchBar
            placeholder="Tell me what's been feeling off…"
            suggestions={[]}
            stage="support"
          />

          <p className="font-sans text-[10px] font-light text-muted-foreground/50 text-center mt-5">
            AI-generated guidance, not individually medically reviewed
          </p>
        </div>
      </div>
    </section>
  );
};

export default SupportAISupport;
