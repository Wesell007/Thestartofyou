import type { ArticleData } from "@/data/articleData";

interface Props {
  data: ArticleData;
}

const ArticleWhatNext = ({ data }: Props) => {
  if (!data.whatHappensNext) return null;

  return (
    <section className="bg-parchment py-10 sm:py-14 md:py-18">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-8 bg-sage-light" />
          <p className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-sage-muted">
            Looking ahead
          </p>
        </div>
        <h2 className="font-serif text-xl sm:text-2xl md:text-[1.75rem] text-foreground leading-snug mb-4">
          What happens next
        </h2>
        <p className="font-sans text-[14px] sm:text-[15px] font-light text-foreground/75 leading-[1.85] max-w-2xl">
          {data.whatHappensNext}
        </p>
      </div>
    </section>
  );
};

export default ArticleWhatNext;
