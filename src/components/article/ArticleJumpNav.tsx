import type { ArticleData } from "@/data/articleData";

interface Props {
  data: ArticleData;
}

const ArticleJumpNav = ({ data }: Props) => {
  if (!data.inThisArticle || data.inThisArticle.length === 0) return null;

  return (
    <section className="bg-parchment py-10 md:py-14">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <div className="border border-border/30 rounded-2xl px-7 py-6 md:px-9 md:py-8 bg-white/40">
          <p className="font-sans text-[10px] font-light tracking-[0.25em] uppercase text-sage-muted mb-5">
            In this article
          </p>
          <ol className="space-y-2.5">
            {data.inThisArticle.map((section, i) => (
              <li key={i} className="flex items-baseline gap-3">
                <span className="font-sans text-[11px] text-muted-foreground/50 tabular-nums shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-sans text-sm font-light text-foreground/80 leading-snug">
                  {section}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default ArticleJumpNav;
