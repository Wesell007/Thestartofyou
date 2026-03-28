import type { ArticleData } from "@/data/articleData";

interface Props {
  data: ArticleData;
}

const ArticleAction = ({ data }: Props) => {
  return (
    <section className="bg-parchment py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-10 bg-sage-light" />
            <p className="font-sans text-[10px] font-light tracking-[0.25em] uppercase text-sage-muted">
              Practical
            </p>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-3">
            What you can do
          </h2>
          <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed max-w-md">
            Simple, realistic steps — not a rigid plan. Do what works for you right now.
          </p>
        </div>

        <div className="space-y-3">
          {data.whatYouCanDo.map((item, i) => (
            <div
              key={i}
              className="group bg-card border border-border/30 rounded-xl px-6 py-5 hover:border-sage-light/50 hover:shadow-soft transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-sage-bg text-sage font-sans text-[11px] font-medium shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <p className="font-sans text-sm font-medium text-foreground leading-relaxed mb-1">
                    {item.action}
                  </p>
                  <p className="font-sans text-[13px] font-light text-muted-foreground leading-relaxed">
                    {item.reason}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticleAction;
