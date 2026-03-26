import { ArrowUpRight } from "lucide-react";
import type { TrimesterData } from "@/data/trimesterData";

interface Props {
  data: TrimesterData;
  bg?: string;
}

const TrimesterCapture = ({ data, bg = "bg-parchment" }: Props) => {
  return (
    <section className={`${bg} py-24 md:py-32`}>
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
          {/* Left — title */}
          <div>
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
              Capture this journey
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-5">
              Take a moment
            </h2>
            <p className="font-serif italic text-base text-muted-foreground leading-relaxed">
              {data.capture.prompt}
            </p>
          </div>

          {/* Right — reflection textarea + CTA */}
          <div className="flex flex-col gap-5">
            <textarea
              rows={4}
              placeholder="Write anything — a feeling, a question, a moment worth keeping..."
              className="w-full bg-card border border-border/60 rounded-lg px-5 py-4 font-sans text-sm font-light text-foreground placeholder:text-muted-foreground/50 leading-relaxed resize-none focus:outline-none focus:border-sage/40 transition-colors shadow-card-brand"
            />
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-6 py-3 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all">
                Capture this thought
              </button>
              <button className="flex items-center gap-2 border border-foreground/20 text-foreground rounded-pill px-6 py-3 font-sans text-sm font-light hover:bg-parchment-dark transition-all">
                Explore The Start of You
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrimesterCapture;
