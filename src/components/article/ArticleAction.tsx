import type { ArticleData } from "@/data/articleData";

interface Props {
  data: ArticleData;
}

const ArticleAction = ({ data }: Props) => {
  if (!data.whatYouCanDo?.length) return null;

  return (
    <section id="what-you-can-do" className="bg-parchment py-10 sm:py-14 md:py-18">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-8 bg-sage-light" />
          <p className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-sage-muted">
            Practical
          </p>
        </div>
        <h2 className="font-serif text-xl sm:text-2xl md:text-[1.75rem] text-foreground leading-snug mb-2">
          What you can do
        </h2>
        <p className="font-sans text-[13px] sm:text-[14px] font-light text-muted-foreground leading-relaxed mb-6 sm:mb-8">
          Simple, realistic steps. Do what works for you right now.
        </p>

        <div className="space-y-0">
          {data.whatYouCanDo.map((item, i) => (
            <div key={i} className="flex gap-4 sm:gap-5 py-4 border-b border-border/15 last:border-0 first:pt-0">
              <span className="font-serif text-lg text-sage/25 tabular-nums leading-none mt-0.5 shrink-0 w-5 text-right">
                {i + 1}
              </span>
              <div className="flex-1">
                <p className="font-sans text-[14px] sm:text-[15px] font-medium text-foreground leading-relaxed mb-0.5">
                  {item.action}
                </p>
                <p className="font-sans text-[13px] sm:text-[14px] font-light text-muted-foreground leading-relaxed">
                  {item.reason}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticleAction;
