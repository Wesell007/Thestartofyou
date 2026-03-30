import type { ArticleData } from "@/data/articleData";

interface Props {
  data: ArticleData;
}

const ArticleWhatNext = ({ data }: Props) => {
  if (!data.whatHappensNext) return null;

  return (
    <section className="bg-parchment-dark py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <div className="bg-card border border-border/30 rounded-2xl px-8 py-9 md:px-10 md:py-10 shadow-soft relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl pointer-events-none translate-x-1/3 translate-y-1/3" />
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-5">
              <div className="h-px w-8 bg-sage-light" />
              <p className="font-sans text-[10px] font-light tracking-[0.25em] uppercase text-sage-muted">
                Looking ahead
              </p>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl text-foreground leading-snug mb-4">
              What happens next
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-[1.75]">
              {data.whatHappensNext}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleWhatNext;
