import type { ArticleData } from "@/data/articleData";

interface Props {
  data: ArticleData;
}

const ArticleWhatNext = ({ data }: Props) => {
  return (
    <section className="bg-parchment py-20 md:py-24">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <div className="bg-card border border-border/50 rounded-lg px-8 py-9 md:px-12 md:py-11 shadow-card-brand">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
            Looking ahead
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-snug mb-5">
            What happens next
          </h2>
          <p className="font-sans text-base font-light text-muted-foreground leading-relaxed">
            {data.whatHappensNext}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ArticleWhatNext;
