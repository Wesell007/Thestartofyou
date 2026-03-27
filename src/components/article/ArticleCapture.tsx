import { ArrowUpRight } from "lucide-react";
import type { ArticleData } from "@/data/articleData";

interface Props {
  data: ArticleData;
}

const ArticleCapture = ({ data }: Props) => {
  return (
    <section className="bg-parchment py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-14 text-center">
          Capture what this feels like
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
          {/* Left */}
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-6">
              Moments like this are worth keeping.
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-5">
              {data.captureIntro}
            </p>
            <button className="flex items-center gap-2 border border-foreground/20 text-foreground rounded-pill px-6 py-3 font-sans text-sm font-light hover:bg-parchment-dark transition-all">
              Explore the journal
              <ArrowUpRight size={14} />
            </button>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-5">
            <p className="font-serif italic text-base text-muted-foreground leading-relaxed">
              What do you want to remember about how this felt?
            </p>
            <textarea
              rows={5}
              placeholder="Write anything — a worry, a question, a feeling worth keeping..."
              className="w-full bg-card border border-border/60 rounded-lg px-5 py-4 font-sans text-sm font-light text-foreground placeholder:text-muted-foreground/50 leading-relaxed resize-none focus:outline-none focus:border-sage/40 transition-colors shadow-card-brand"
            />
            <button className="self-start flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-6 py-3 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all">
              Capture this thought
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleCapture;
