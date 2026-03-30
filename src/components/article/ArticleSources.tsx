import type { ArticleData } from "@/data/articleData";

interface Props {
  data: ArticleData;
}

const ArticleSources = ({ data }: Props) => {
  if (!data.sources || data.sources.length === 0) return null;

  return (
    <section className="bg-parchment py-14 md:py-18">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <div className="border-t border-border/30 pt-8">
          <p className="font-sans text-[10px] font-light tracking-[0.25em] uppercase text-muted-foreground/60 mb-5">
            Sources
          </p>
          <ul className="space-y-2">
            {data.sources.map((source, i) => (
              <li key={i} className="font-sans text-xs font-light text-muted-foreground/70 leading-relaxed">
                {source}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ArticleSources;
