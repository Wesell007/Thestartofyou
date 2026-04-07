import type { ArticleData } from "@/data/articleData";

interface Props {
  data: ArticleData;
}

const ArticleInterpretation = ({ data }: Props) => {
  if (!data.whatThisMeans) return null;

  return (
    <section id="what-this-means" className="bg-parchment py-16 sm:py-20 md:py-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="relative bg-sage-bg/25 border border-sage-light/25 rounded-xl sm:rounded-2xl px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-6 bg-sage/40" />
            <p className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-sage">
              What this means
            </p>
          </div>
          <p className="font-serif text-base sm:text-lg md:text-xl text-foreground leading-[1.75] italic max-w-2xl">
            {data.whatThisMeans}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ArticleInterpretation;
