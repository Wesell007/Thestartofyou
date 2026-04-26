import type { ArticleData } from "@/data/articleData";

interface Props {
  data: ArticleData;
}

const ArticleTakeaways = ({ data }: Props) => {
  const items = data.keyTakeaways;
  if (!items || items.length === 0) return null;

  return (
    <section className="bg-parchment py-10 sm:py-12 md:py-14">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex items-center gap-3 mb-5 sm:mb-6">
          <div className="h-px w-8 bg-sage-light" />
          <p className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-sage-muted">
            Key takeaways
          </p>
        </div>

        <ul className="space-y-4 sm:space-y-5">
          {items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-4 border-l border-sage/25 pl-4 sm:pl-5"
            >
              <span className="font-sans text-[11px] text-sage/50 tabular-nums pt-1 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-sans text-[14px] sm:text-[15px] font-light text-foreground/85 leading-[1.75]">
                {item}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ArticleTakeaways;
