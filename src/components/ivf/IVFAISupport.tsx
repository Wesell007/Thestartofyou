import { MessageCircle } from "lucide-react";
import AISearchBar from "@/components/shared/AISearchBar";

const IVFAISupport = () => {
  return (
    <section className="bg-sage-bg/40 py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <div>
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
              AI Support
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-5">
              Ask anything, whenever you need
            </h2>
            <p className="font-serif italic text-base text-muted-foreground leading-relaxed mb-4">
              "What's been on your mind since your transfer?"
            </p>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-8">
              IVF can bring more questions — especially during waiting periods. You can ask about your stage, what to expect next, or anything that's been on your mind.
            </p>
          </div>

          <div>
            <AISearchBar
              placeholder="What's on your mind?"
              suggestions={[
                "Is this normal at this stage?",
                "Should I be feeling something?",
                "What happens next?",
              ]}
              context="IVF journey"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IVFAISupport;
