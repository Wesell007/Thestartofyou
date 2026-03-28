import { Sparkles } from "lucide-react";
import AISearchBar from "@/components/shared/AISearchBar";
import type { ArticleData } from "@/data/articleData";

interface Props {
  data: ArticleData;
}

const ArticleAISupport = ({ data }: Props) => {
  return (
    <section className="relative bg-gradient-to-b from-sage-bg/30 to-parchment py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-sage/5 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-6 md:px-10 max-w-3xl relative z-10">
        <div className="bg-card/90 backdrop-blur-sm border border-border/30 rounded-2xl px-8 py-10 md:px-10 md:py-12 shadow-elevated">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-sage-bg/50 rounded-full px-4 py-1.5 mb-5">
              <Sparkles size={13} className="text-sage" />
              <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-sage">
                AI Support
              </p>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-3">
              Still unsure about something?
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed max-w-md mx-auto">
              Ask anything about this topic and get guidance tailored to your stage.
            </p>
          </div>

          <AISearchBar
            placeholder="Ask about this topic…"
            suggestions={data.aiPrompts.slice(0, 3)}
            context={data.title}
          />
        </div>
      </div>
    </section>
  );
};

export default ArticleAISupport;
