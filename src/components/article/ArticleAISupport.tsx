import { Sparkles } from "lucide-react";
import AISearchBar from "@/components/shared/AISearchBar";
import type { ArticleData } from "@/data/articleData";

interface Props {
  data: ArticleData;
}

const ArticleAISupport = ({ data }: Props) => {
  return (
    <section className="bg-parchment py-10 sm:py-14 md:py-18">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="bg-card border border-border/30 rounded-xl sm:rounded-2xl px-6 py-7 sm:px-8 sm:py-9 md:px-10 md:py-10 shadow-soft">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 bg-sage-bg/40 rounded-full px-3.5 py-1.5 mb-3">
              <Sparkles size={12} className="text-sage" />
              <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-sage">
                AI guidance
              </p>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl text-foreground leading-snug mb-2">
              Still unsure about something?
            </h2>
            <p className="font-sans text-[13px] sm:text-[14px] font-light text-muted-foreground leading-relaxed max-w-md mx-auto">
              Ask anything about this topic and get general guidance on what you are reading.
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
