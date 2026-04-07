import type { ArticleData } from "@/data/articleData";

interface Props {
  data: ArticleData;
}

const ArticleWhatHappening = ({ data }: Props) => {
  return (
    <section id="whats-happening" className="bg-parchment-dark py-16 sm:py-20 md:py-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-8 bg-sage-light" />
          <p className="font-sans text-[10px] font-light tracking-[0.25em] uppercase text-sage-muted">
            Explanation
          </p>
        </div>
        <h2 className="font-serif text-xl sm:text-2xl md:text-[1.75rem] text-foreground leading-snug mb-8 sm:mb-10">
          What's happening
        </h2>

        {/* Primary causes — prose-led with subtle numbering */}
        <div className="space-y-6 sm:space-y-8 mb-10 sm:mb-12">
          {data.whatHappening.commonCauses.map((cause, i) => (
            <div key={i} className="flex gap-4 sm:gap-5">
              <span className="font-serif text-lg sm:text-xl text-sage/30 tabular-nums leading-none mt-1 shrink-0 w-6 text-right">
                {i + 1}
              </span>
              <div className="flex-1">
                <h3 className="font-sans text-[15px] sm:text-base font-medium text-foreground mb-1.5">
                  {cause.heading}
                </h3>
                <p className="font-sans text-[14px] sm:text-[15px] font-light text-foreground/75 leading-[1.8]">
                  {cause.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Less common causes */}
        {data.whatHappening.lessCauses.length > 0 && (
          <div className="mb-10 sm:mb-12">
            <p className="font-sans text-[10px] font-light tracking-[0.2em] uppercase text-sage-muted mb-4 sm:mb-5">
              Less common, but relevant
            </p>
            <div className="space-y-4 sm:space-y-5">
              {data.whatHappening.lessCauses.map((cause, i) => (
                <div key={i} className="border-l-2 border-border/30 pl-5">
                  <p className="font-sans text-[14px] sm:text-[15px] font-medium text-foreground mb-1">
                    {cause.heading}
                  </p>
                  <p className="font-sans text-[13px] sm:text-[14px] font-light text-foreground/70 leading-[1.75]">
                    {cause.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Why it varies */}
        <div className="bg-sage-bg/20 border border-sage-light/25 rounded-xl px-5 py-5 sm:px-7 sm:py-6">
          <p className="font-sans text-[10px] font-light tracking-[0.2em] uppercase text-sage-muted mb-2.5">
            Why it varies
          </p>
          <p className="font-sans text-[14px] sm:text-[15px] font-light text-foreground/80 leading-[1.8]">
            {data.whatHappening.whyItVaries}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ArticleWhatHappening;
