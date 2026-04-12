import type { ArticleData } from "@/data/articleData";

interface Props {
  data: ArticleData;
}

const ArticleHowThisFeels = ({ data }: Props) => {
  if (!data.howThisFeels?.length) return null;

  return (
    <section id="how-this-feels" className="bg-parchment py-10 sm:py-14 md:py-18">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-8 bg-sage-light" />
          <p className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-sage-muted">
            If you're feeling this
          </p>
        </div>
        <h2 className="font-serif text-xl sm:text-2xl md:text-[1.75rem] text-foreground leading-snug mb-6 sm:mb-8">
          How this can feel
        </h2>

        <div className="bg-card border border-border/30 rounded-xl p-5 sm:p-7">
          <div className="border-l-2 border-sage/25 pl-5 sm:pl-6 space-y-4">
            {data.howThisFeels.map((truth, i) => (
              <p
                key={i}
                className="font-serif text-[15px] sm:text-base italic text-foreground/70 leading-relaxed"
              >
                "{truth}"
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleHowThisFeels;
