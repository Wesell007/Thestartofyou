import type { ArticleData } from "@/data/articleData";

interface Props {
  data: ArticleData;
}

const ArticleAction = ({ data }: Props) => {
  if (!data.whatYouCanDo?.length) return null;

  return (
    <section id="what-you-can-do" className="bg-parchment py-16 sm:py-20 md:py-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-8 bg-sage-light" />
          <p className="font-sans text-[10px] font-light tracking-[0.25em] uppercase text-sage-muted">
            Practical
          </p>
        </div>
        <h2 className="font-serif text-xl sm:text-2xl md:text-[1.75rem] text-foreground leading-snug mb-2">
          What you can do
        </h2>
        <p className="font-sans text-[13px] sm:text-[14px] font-light text-muted-foreground leading-relaxed mb-8 sm:mb-10">
          Simple, realistic steps. Do what works for you right now.
        </p>

        <div className="space-y-3 sm:space-y-4">
          {data.whatYouCanDo.map((item, i) => (
            <div key={i} className="flex gap-4 sm:gap-5">
              <span className="font-serif text-lg text-sage/25 tabular-nums leading-none mt-1 shrink-0 w-5 text-right">
                {i + 1}
              </span>
              <div className="flex-1 pb-4 border-b border-border/20 last:border-0">
                <p className="font-sans text-[14px] sm:text-[15px] font-medium text-foreground leading-relaxed mb-1">
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
