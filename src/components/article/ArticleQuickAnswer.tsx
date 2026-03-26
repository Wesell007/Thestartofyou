import type { ArticleData } from "@/data/articleData";

interface Props {
  data: ArticleData;
}

const ArticleQuickAnswer = ({ data }: Props) => {
  return (
    <section className="bg-sage-bg/40 py-16 md:py-20">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <div className="bg-card border border-border/50 rounded-lg px-8 py-9 md:px-12 md:py-11 shadow-card-brand">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
            Quick answer
          </p>
          <p className="font-sans text-base font-light text-foreground leading-relaxed">
            {data.quickAnswer}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ArticleQuickAnswer;
