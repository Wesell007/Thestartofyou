import type { ArticleData } from "@/data/articleData";

interface Props {
  data: ArticleData;
}

const ArticleAction = ({ data }: Props) => {
  return (
    <section className="bg-parchment-dark py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
          {/* Left */}
          <div>
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
              Practical
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-5">
              What you can do
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
              Simple, realistic steps — not a rigid plan. Do what works for you right now.
            </p>
          </div>

          {/* Right */}
          <div className="space-y-4">
            {data.whatYouCanDo.map((item, i) => (
              <div
                key={i}
                className="bg-card border border-border/50 rounded-lg px-6 py-5 shadow-card-brand"
              >
                <div className="flex items-start gap-4">
                  <span className="font-serif text-base text-sage-muted opacity-40 shrink-0 mt-0.5 select-none w-5">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <p className="font-sans text-sm font-light text-foreground leading-relaxed mb-1.5">
                      {item.action}
                    </p>
                    <p className="font-sans text-xs font-light text-muted-foreground leading-relaxed">
                      → {item.reason}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleAction;
