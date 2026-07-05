import { Sparkles } from "lucide-react";
import AISearchBar from "@/components/shared/AISearchBar";

const ProductJournalAI = () => {
  return (
    <section className="bg-parchment py-14 md:py-20">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div
          className="bg-gradient-to-br from-white via-[#FBF8F1] to-[#F4EFE4] border border-border/30 rounded-2xl px-6 py-8 sm:px-10 sm:py-11 shadow-soft"
          style={{ borderTopColor: "hsl(var(--sage))", borderTopWidth: "2px" }}
        >
          <div className="text-center mb-7">
            <div className="inline-flex items-center gap-1.5 bg-sage-bg/40 rounded-full px-3.5 py-1.5 mb-3">
              <Sparkles size={12} className="text-sage" />
              <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-sage">
                Journalling support
              </p>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-snug mb-3">
              Not sure what to write? Start here.
            </h2>
            <p className="font-sans text-[14px] sm:text-[15px] font-light text-muted-foreground leading-relaxed max-w-lg mx-auto">
              Ask The Start of You for gentle journalling prompts, reflection ideas or ways to use your pregnancy journal when you do not know where to begin.
            </p>
          </div>

          <AISearchBar
            placeholder="Ask for a journalling prompt…"
            suggestions={[
              "Give me a gentle pregnancy journal prompt for this week",
              "What should I write if I feel overwhelmed?",
              "How can I use my journal without making it feel like homework?",
              "Give me a memory prompt for my baby",
              "Help me write a letter to my baby",
            ]}
            context="Pregnancy journalling"
            stage="pregnancy"
          />

          <p className="font-sans text-xs italic text-muted-foreground/80 text-center mt-5">
            Use these as a starting point, then write in your own words.
          </p>

        </div>
      </div>
    </section>
  );
};

export default ProductJournalAI;
