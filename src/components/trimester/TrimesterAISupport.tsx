import AISearchBar from "@/components/shared/AISearchBar";
import type { TrimesterData } from "@/data/trimesterData";

interface Props {
  data: TrimesterData;
  bg?: string;
}

const TrimesterAISupport = ({ data, bg = "bg-sage-bg/30" }: Props) => {
  return (
    <section className={`${bg} section-spacing`}>
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl text-center">
        <p className="stage-label mb-3">
          Support
        </p>
        <h2 className="font-serif text-[1.75rem] sm:text-3xl md:text-[2.25rem] text-foreground mb-3 leading-tight">
          Ask anything, whenever you need
        </h2>
        <p className="font-sans text-[15px] sm:text-base font-light text-muted-foreground leading-relaxed max-w-lg mx-auto mb-8">
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
