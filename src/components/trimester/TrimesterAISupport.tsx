import { MessageCircle } from "lucide-react";
import AISearchBar from "@/components/shared/AISearchBar";
import type { TrimesterData } from "@/data/trimesterData";

interface Props {
  data: TrimesterData;
  bg?: string;
}

const TrimesterAISupport = ({ data, bg = "bg-sage-bg/30" }: Props) => {
  return (
    <section className={`${bg} py-24 md:py-32`}>
      <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center">
        <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-6">
          Support
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-5 leading-tight">
          Ask anything, whenever you need
        </h2>
        <p className="font-sans text-base font-light text-muted-foreground leading-relaxed max-w-lg mx-auto mb-10">
          If something feels unclear or unexpected during the {data.shortLabel.toLowerCase()} trimester,
          you can ask a question and get guidance that helps you understand what's happening at your stage.
        </p>
        <AISearchBar
          placeholder="What's on your mind?"
          suggestions={[
            "Is this normal right now?",
            "What should I expect next?",
            "Something feels different",
          ]}
          context={`${data.shortLabel} trimester of pregnancy`}
        />
      </div>
    </section>
  );
};

export default TrimesterAISupport;
