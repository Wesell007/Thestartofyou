import SupportArticleCard from "./SupportArticleCard";
import type { SupportArticle } from "@/data/journeySupportArticles";

const accent = "hsl(var(--stage-pregnancy-accent))";

interface Props {
  heading: string;
  articles: SupportArticle[];
}

const SupportArticleGroup = ({ heading, articles }: Props) => {
  if (articles.length === 0) return null;
  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-5">
        <span
          aria-hidden="true"
          className="block w-5 h-px"
          style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.55)" }}
        />
        <h2
          className="font-sans text-[10.5px] font-medium tracking-[0.26em] uppercase"
          style={{ color: accent }}
        >
          {heading}
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {articles.map((a) => (
          <SupportArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </section>
  );
};

export default SupportArticleGroup;
