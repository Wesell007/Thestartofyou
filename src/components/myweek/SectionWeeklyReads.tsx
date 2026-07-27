import { Link } from "react-router-dom";
import { getArticle } from "@/data/articleData";
import { getWeeklySuggestions } from "@/data/weeklyArticleSuggestions";
import { resolveArticleHeroBySlug } from "@/lib/articleHeroImage";

interface Props {
  week: number;
}

const accent = "hsl(var(--stage-pregnancy-accent))";
const softBorder = "hsl(var(--stage-pregnancy-accent) / 0.14)";

const SectionWeeklyReads = ({ week }: Props) => {
  const items = getWeeklySuggestions(week);
  if (items.length === 0) return null;

  const cards = items
    .map((item) => {
      const article = getArticle(item.slug);
      if (!article) return null;
      const hero = resolveArticleHeroBySlug(item.slug);
      return {
        slug: item.slug,
        reason: item.reason,
        title: article.title,
        image: hero?.src ?? null,
      };
    })
    .filter(
      (c): c is { slug: string; reason: string; title: string; image: string | null } =>
        c !== null,
    );

  if (cards.length === 0) return null;

  return (
    <section className="relative pt-4 pb-12">
      <div className="mb-6">
        <p
          className="font-sans text-[10.5px] font-medium tracking-[0.22em] uppercase mb-2"
          style={{ color: accent }}
        >
          A little more for this week
        </p>
        <h2 className="font-serif text-2xl text-foreground/90 leading-snug">
          A little more for this week
        </h2>
        <p className="font-sans text-[13px] font-light text-foreground/65 mt-1.5">
          Optional reading, if it feels useful.
        </p>
      </div>

      <div className={`grid gap-4 ${cards.length > 1 ? "sm:grid-cols-2" : ""}`}>
        {cards.map((card) => (
          <Link
            key={card.slug}
            to={`/articles/${card.slug}`}
            className="group block h-full transition-shadow hover:shadow-[0_18px_44px_-24px_hsl(var(--stage-pregnancy-accent)/0.22)]"
          >
            <article
              className="h-full rounded-[20px] keepsake-surface overflow-hidden flex flex-col"
              style={{ borderColor: softBorder }}
            >
              {card.image && (
                <div className="w-full aspect-[16/9] max-h-[140px] overflow-hidden bg-parchment-dark/20">
                  <img
                    src={card.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>
              )}
              <div className="px-5 py-6 flex flex-col flex-1">
                <h3 className="font-serif text-[1.05rem] text-foreground/88 leading-[1.3] mb-2">
                  {card.title}
                </h3>
                <p className="font-sans text-[13px] font-light text-foreground/65 leading-[1.65] flex-1">
                  {card.reason}
                </p>
                <span
                  className="mt-5 inline-flex font-sans text-[10.5px] font-medium tracking-[0.22em] uppercase"
                  style={{ color: accent }}
                >
                  Read
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SectionWeeklyReads;
