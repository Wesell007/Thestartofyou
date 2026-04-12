import type { ArticleData } from "@/data/articleData";

interface Props {
  data: ArticleData;
}

const ArticleInterpretation = ({ data }: Props) => {
  if (!data.whatThisMeans) return null;

  return (
    <section id="what-this-means" className="bg-parchment py-10 sm:py-14 md:py-18">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="relative bg-gradient-to-br from-sage-bg/30 to-sage-bg/10 border border-sage/15 rounded-xl sm:rounded-2xl px-6 py-7 sm:px-8 sm:py-9 md:px-10 md:py-10">
          {/* Top accent */}
          <div className="absolute top-0 left-6 right-6 sm:left-8 sm:right-8 h-[2px] bg-gradient-to-r from-transparent via-sage/30 to-transparent" />
          
          <div className="flex items-center gap-3 mb-4">
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
