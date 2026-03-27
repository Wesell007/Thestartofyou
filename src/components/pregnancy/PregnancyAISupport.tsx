import { MessageCircle } from "lucide-react";
import AISearchBar from "@/components/shared/AISearchBar";

const PregnancyAISupport = () => {
  return (
    <section className="bg-sage-bg/40 py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <div>
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
              AI Support
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-6">
              Ask anything, whenever you need
            </h2>
            <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-8">
              If something feels unclear or unexpected, you can ask a question
              and get guidance that helps you understand what's happening at
              your stage.
            </p>
          </div>

          {/* Right — search bar */}
          <div>
            <AISearchBar
              placeholder="What's on your mind?"
              suggestions={[
                "Is it normal to feel this tired?",
                "Why have my symptoms changed?",
                "What should I be aware of?",
              ]}
              context="Pregnancy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PregnancyAISupport;
