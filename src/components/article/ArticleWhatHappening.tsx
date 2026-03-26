import type { ArticleData } from "@/data/articleData";

interface Props {
  data: ArticleData;
}

const ArticleWhatHappening = ({ data }: Props) => {
  return (
    <section className="bg-parchment py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
          Explanation
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-14">
          What's happening
        </h2>

        {/* Common causes */}
        <div className="mb-12">
          <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-6">
            Common causes
          </p>
          <div className="space-y-5">
            {data.whatHappening.commonCauses.map((cause, i) => (
              <div
                key={i}
                className="bg-card border border-border/50 rounded-lg p-7 shadow-card-brand"
              >
                <div className="flex items-start gap-4">
                  <span className="font-serif text-lg text-sage-muted opacity-40 shrink-0 mt-0.5 select-none w-5">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <p className="font-sans text-sm font-medium text-foreground mb-2">{cause.heading}</p>
                    <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">{cause.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Less common causes */}
        {data.whatHappening.lessCauses.length > 0 && (
          <div className="mb-12">
            <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-6">
              Less common, but relevant
            </p>
            <div className="space-y-4">
              {data.whatHappening.lessCauses.map((cause, i) => (
                <div
                  key={i}
                  className="bg-parchment-dark border border-border/40 rounded-lg p-6"
                >
                  <p className="font-sans text-sm font-medium text-foreground mb-2">{cause.heading}</p>
                  <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">{cause.body}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Why it varies */}
        <div className="bg-sage-bg/30 border border-sage-light/40 rounded-lg px-7 py-6">
          <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-3">
            Why it varies
          </p>
          <p className="font-sans text-sm font-light text-foreground leading-relaxed">
            {data.whatHappening.whyItVaries}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ArticleWhatHappening;
