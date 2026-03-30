import type { ArticleData } from "@/data/articleData";

interface Props {
  data: ArticleData;
}

const ArticleRealExperience = ({ data }: Props) => {
  if (!data.whatItFeelsLike?.length) return null;

  return (
    <section className="bg-parchment-dark py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <div className="text-center mb-10">
          <p className="font-sans text-[10px] font-light tracking-[0.25em] uppercase text-sage-muted mb-4">
            The real experience
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight">
            What this can feel like
          </h2>
        </div>

        <div className="space-y-2.5">
          {data.whatItFeelsLike.map((experience, i) => (
            <div
              key={i}
              className="bg-card/60 border border-border/30 rounded-xl px-6 py-5 hover:bg-card transition-colors duration-300"
            >
              <p className="font-serif italic text-sm text-foreground/85 leading-relaxed pl-4 border-l-2 border-sage-light/40">
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
