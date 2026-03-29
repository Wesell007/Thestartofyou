import { MessageCircle } from "lucide-react";
import AISearchBar from "@/components/shared/AISearchBar";

const SupportAISupport = () => {
  return (
    <section id="ai-support" className="relative bg-parchment section-spacing overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] glow-lavender" />

      <div className="container mx-auto px-6 md:px-10 max-w-3xl relative z-10">
        <div className="card-elevated p-10 md:p-14">
          <div className="flex items-center gap-3 mb-6">
            <MessageCircle size={20} className="text-sage" />
            <p className="stage-label">AI Support</p>
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
