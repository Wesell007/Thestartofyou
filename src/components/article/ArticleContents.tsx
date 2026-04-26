import type { ArticleData } from "@/data/articleData";

interface Props {
  data: ArticleData;
}

const HEADER_OFFSET = 80;

const handleAnchorClick = (
  e: React.MouseEvent<HTMLAnchorElement>,
  id: string,
) => {
  const el = document.getElementById(id);
  if (!el) return;
  e.preventDefault();
  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
  history.replaceState(null, "", `#${id}`);
};

const ArticleContents = ({ data }: Props) => {
  // Prefer deterministic anchors derived from the explicit `id` field on
  // editorial sections. Fall back to a non-anchored list when the article
  // has no editorial sections (legacy data shape).
  const sections = data.editorialSections ?? [];
  const hasAnchors = sections.length >= 3;
  const fallbackLabels = hasAnchors ? [] : data.inThisArticle ?? [];
  const showFallback = !hasAnchors && fallbackLabels.length >= 3;

  if (!hasAnchors && !showFallback) return null;

  const items = hasAnchors
    ? sections.map((s) => ({ id: s.id, label: s.heading }))
    : fallbackLabels.map((label) => ({ id: null as string | null, label }));

  return (
    <section className="bg-parchment py-6 sm:py-8 md:py-10">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="rounded-xl border border-border/30 bg-parchment-dark/30 px-5 py-5 sm:px-7 sm:py-6 md:px-8 md:py-7">
          <div className="flex items-center gap-3 mb-4 sm:mb-5">
            <div className="h-px w-8 bg-sage-light" />
            <p className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-sage-muted">
              In this article
            </p>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 sm:gap-y-3.5">
            {items.map((item, i) => {
              const numeral = String(i + 1).padStart(2, "0");
              const content = (
                <span className="flex items-baseline gap-3">
                  <span className="font-sans text-[11px] text-sage/50 tabular-nums shrink-0">
                    {numeral}
                  </span>
                  <span className="font-serif text-[14px] sm:text-[15px] text-foreground/85 leading-snug">
                    {item.label}
                  </span>
                </span>
              );
              return (
                <li key={`${i}-${item.label}`}>
                  {item.id ? (
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleAnchorClick(e, item.id!)}
                      className="block group hover:text-sage transition-colors"
                    >
                      <span className="block group-hover:[&_span:last-child]:underline group-hover:[&_span:last-child]:decoration-sage/40">
                        {content}
                      </span>
                    </a>
                  ) : (
                    <span className="block text-foreground/70">{content}</span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default ArticleContents;
