import type { ArticleData } from "@/data/articleData";

interface Props {
  data: ArticleData;
}

const ArticleRealExperience = ({ data }: Props) => {
  return (
    <section className="bg-parchment py-20 md:py-24">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
          The real experience
        </p>
        <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-10">
          What this can feel like
        </h2>

        <div className="space-y-3">
          {data.whatItFeelsLike.map((experience, i) => (
            <div
              key={i}
              className="flex items-start gap-5 bg-card border border-border/50 rounded-lg px-6 py-5 shadow-card-brand"
            >
              <span className="font-serif text-base text-sage-muted opacity-40 shrink-0 mt-0.5 select-none">
                {i + 1}
              </span>
              <p className="font-serif italic text-sm text-foreground leading-relaxed">
                {experience}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticleRealExperience;
