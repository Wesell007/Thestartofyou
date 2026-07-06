
import type { ArticleData } from "@/data/articleData";

interface Props {
  data: ArticleData;
}

// "At a glance" + "In this article" side-by-side cards directly under the hero.
const FlagshipSummaryRow = ({ data }: Props) => {
  const sections = data.editorialSections ?? [];
  const showInThis = sections.length > 0;

  return (
    <section className="bg-parchment pt-2 pb-10 sm:pb-14 md:pb-16">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
        <div className={`grid grid-cols-1 ${showInThis ? "md:grid-cols-2" : ""} gap-5 md:gap-6`}>
          {/* AT A GLANCE */}
          <article className="bg-card border border-border/40 rounded-2xl px-6 py-6 sm:px-8 sm:py-7 md:px-9 md:py-8">
            <p className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-sage-muted mb-3">
              At a glance
            </p>
            <p className="font-sans text-[15px] sm:text-base font-light text-foreground leading-[1.8]">
              {data.quickAnswer}
            </p>
          </article>

          {/* IN THIS ARTICLE */}
          {showInThis && (
            <article className="bg-card border border-border/40 rounded-2xl px-6 py-6 sm:px-8 sm:py-7 md:px-9 md:py-8">
              <p className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-sage-muted mb-4">
                In this article
              </p>
              <ol className="space-y-2.5">
                {sections.map((s, i) => (
                  <li key={s.id} className="flex gap-3 items-baseline">
                    <span className="font-sans text-[11px] text-sage/50 tabular-nums shrink-0 w-5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <a
                      href={`#${s.id}`}
                      className="font-serif text-[15px] sm:text-[15.5px] text-foreground/85 leading-snug hover:text-sage transition-colors"
                    >
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </article>
          )}
        </div>
      </div>
    </section>
  );
};

export default FlagshipSummaryRow;
