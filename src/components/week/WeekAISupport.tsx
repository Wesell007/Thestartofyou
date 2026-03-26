import { MessageCircle } from "lucide-react";
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
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-6">
              Ask about this week
            </h2>
            <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-8">
              If something feels unclear, you can ask about this stage and get guidance tailored to you.
            </p>
            <button className="flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all">
              <MessageCircle size={15} />
              Ask now
            </button>
          </div>

          {/* Right — suggested prompts */}
          <div className="bg-card border border-border/50 rounded-lg p-7 shadow-card-brand space-y-4">
            <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted">
              Suggested questions
            </p>
            {data.aiPrompts.map((prompt, i) => (
              <div
                key={i}
                className="flex items-start gap-3 py-3 border-b border-border/40 last:border-0"
              >
                <MessageCircle size={14} className="text-sage mt-0.5 shrink-0" />
                <p className="font-sans text-sm font-light text-foreground leading-relaxed">
                  {prompt}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeekAISupport;
