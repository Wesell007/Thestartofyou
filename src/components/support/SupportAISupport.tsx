import { ArrowUpRight, MessageCircle } from "lucide-react";
import AISearchBar from "@/components/shared/AISearchBar";

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

          <AISearchBar
            placeholder="Tell me what's been feeling off…"
            suggestions={[
              "Is this normal?",
              "Should I be worried?",
              "What should I do next?",
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default SupportAISupport;
