import type { ArticleData } from "@/data/articleData";

interface Props {
  data: ArticleData;
}

const ArticleWhatHappening = ({ data }: Props) => {
  return (
    <section className="bg-parchment-dark py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="text-center mb-14">
          <p className="font-sans text-[10px] font-light tracking-[0.25em] uppercase text-sage-muted mb-4">
            Explanation
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight">
            What's Happening
          </h2>
        </div>

        {/* Common causes — numbered horizontal cards */}
        <p className="font-sans text-[10px] font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
          Common causes
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {data.whatHappening.commonCauses.map((cause, i) => (
            <div
              key={i}
              className="bg-card border border-border/40 rounded-xl p-6 shadow-soft hover:shadow-card-hover transition-shadow duration-300"
            >
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-sage-bg text-sage font-sans text-xs font-medium mb-4">
                {i + 1}
              </span>
              <p className="font-sans text-sm font-medium text-foreground mb-2.5">{cause.heading}</p>
              <p className="font-sans text-[13px] font-light text-muted-foreground leading-[1.7]">{cause.body}</p>
            </div>
          ))}
        </div>

        {/* Less common causes */}
        {data.whatHappening.lessCauses.length > 0 && (
          <div className="mb-12">
            <p className="font-sans text-[10px] font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
              Less common, but relevant
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.whatHappening.lessCauses.map((cause, i) => (
                <div
                  key={i}
                  className="bg-parchment border border-border/30 rounded-xl px-6 py-5"
                >
                  <p className="font-sans text-sm font-medium text-foreground mb-2">{cause.heading}</p>
                  <p className="font-sans text-[13px] font-light text-muted-foreground leading-[1.7]">{cause.body}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Why it varies — full-width quiet card */}
        <div className="bg-sage-bg/25 border border-sage-light/30 rounded-xl px-7 py-6">
          <p className="font-sans text-[10px] font-light tracking-[0.2em] uppercase text-sage-muted mb-3">
            Why it varies
          </p>
          <p className="font-sans text-sm font-light text-foreground leading-[1.75]">
            {data.whatHappening.whyItVaries}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ArticleWhatHappening;
