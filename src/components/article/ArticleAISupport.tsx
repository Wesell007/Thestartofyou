import { MessageCircle } from "lucide-react";
import AISearchBar from "@/components/shared/AISearchBar";
import type { ArticleData } from "@/data/articleData";

interface Props {
  data: ArticleData;
}

const ArticleAISupport = ({ data }: Props) => {
  return (
    <section className="bg-sage-bg/40 py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <div>
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
              AI Support
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-5">
              Still unsure?
            </h2>
            <p className="font-serif italic text-base text-muted-foreground leading-relaxed mb-6">
              "What's been on your mind?"
            </p>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-8">
              If something still feels unclear, you can ask and get guidance that's relevant to your stage.
            </p>
          </div>

          {/* Right — search bar with article-aware prompts */}
          <div>
            <AISearchBar
              placeholder="Ask about this topic…"
              suggestions={data.aiPrompts.slice(0, 3)}
              context={data.title}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleAISupport;
