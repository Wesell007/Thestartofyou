import type { ArticleData } from "@/data/articleData";

interface Props {
  data: ArticleData;
}

const ArticleRealExperience = ({ data }: Props) => {
  if (!data.whatItFeelsLike?.length) return null;

  return (
    <section id="real-experience" className="bg-parchment-dark py-16 sm:py-20 md:py-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-8 bg-sage-light" />
          <p className="font-sans text-[10px] font-light tracking-[0.25em] uppercase text-sage-muted">
            The real experience
          </p>
        </div>
        <h2 className="font-serif text-xl sm:text-2xl md:text-[1.75rem] text-foreground leading-snug mb-8 sm:mb-10">
          What this can actually feel like
        </h2>

        <div className="columns-1 sm:columns-2 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
          {data.whatItFeelsLike.map((experience, i) => (
            <div
              key={i}
              className="break-inside-avoid bg-card/50 border border-border/25 rounded-lg px-5 py-4 sm:px-6 sm:py-5"
            >
              <p className="font-serif text-[14px] sm:text-[15px] italic text-foreground/70 leading-relaxed">
                "{experience}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticleRealExperience;
