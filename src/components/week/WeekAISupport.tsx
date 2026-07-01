import { MessageCircle } from "lucide-react";
import AISearchBar from "@/components/shared/AISearchBar";
import type { WeekData } from "@/data/weekData";

interface Props {
  data: WeekData;
}

const WeekAISupport = ({ data }: Props) => {
  return (
    <section className="bg-sage-bg/40 py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <div>
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
              AI Support
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-5">
              Ask about this week
            </h2>
            <p className="font-serif italic text-base text-muted-foreground leading-relaxed mb-6">
              "{data.aiContextPrompt}"
            </p>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-8">
              If something feels unclear or you want to understand more about this stage, you can ask and get guidance tailored to you.
            </p>
          </div>

          {/* Right, search bar with stage-aware prompts */}
          <div>
            <AISearchBar
              placeholder="What's on your mind this week?"
              suggestions={data.aiPrompts.slice(0, 3)}
              context={`Week ${data.week} of pregnancy`}
              stage="pregnancy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeekAISupport;
