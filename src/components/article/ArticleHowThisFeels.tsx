import type { ArticleData } from "@/data/articleData";
import botanicalAccent from "@/assets/article-botanical-accent.png";

interface Props {
  data: ArticleData;
}

const ArticleHowThisFeels = ({ data }: Props) => {
  return (
    <section className="relative bg-parchment py-24 md:py-32 overflow-hidden">
      {/* Subtle botanical accent */}
      <img
        src={botanicalAccent}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={200}
        height={200}
        className="absolute bottom-0 left-0 w-36 md:w-48 opacity-[0.08] pointer-events-none translate-y-1/4 -translate-x-1/4"
      />

      <div className="container mx-auto px-6 md:px-10 max-w-3xl relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px w-10 bg-sage-light" />
          <p className="font-sans text-[10px] font-light tracking-[0.25em] uppercase text-sage-muted">
            If you're feeling this
          </p>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-snug mb-10">
          How this can feel
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {data.howThisFeels.map((truth, i) => (
            <div
              key={i}
              className="bg-card/70 border border-border/30 rounded-xl px-6 py-5 hover:border-sage-light/50 hover:shadow-soft transition-all duration-300"
            >
              <p className="font-sans text-sm font-light text-foreground leading-relaxed">
                {truth}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticleHowThisFeels;
