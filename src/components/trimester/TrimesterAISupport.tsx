import { MessageCircle } from "lucide-react";
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
        <button className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all">
          <MessageCircle size={15} />
          Ask now
        </button>
      </div>
    </section>
  );
};

export default TrimesterAISupport;
