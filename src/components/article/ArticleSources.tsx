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
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 bg-border/20" />
            <p className="font-sans text-[10px] font-light tracking-[0.25em] uppercase text-muted-foreground/50">
              Sources and references
            </p>
            <div className="h-px flex-1 bg-border/20" />
          </div>
          <ul className="space-y-2.5">
            {data.sources.map((source, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="font-sans text-[10px] text-muted-foreground/40 tabular-nums mt-0.5 shrink-0">
                  [{i + 1}]
                </span>
                <span className="font-sans text-xs font-light text-muted-foreground/70 leading-relaxed">
                  {source}
                </span>
              </li>
            ))}
          </ul>

          {/* Editorial trust note */}
          {data.reviewedBy && (
            <div className="mt-8 pt-6 border-t border-border/20">
              <p className="font-sans text-[11px] font-light text-muted-foreground/50 leading-relaxed max-w-lg">
                This article has been reviewed for accuracy by {data.reviewedBy}. Content is updated regularly to reflect the latest evidence and guidance. Last updated {data.lastUpdated || 'recently'}.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ArticleSources;
