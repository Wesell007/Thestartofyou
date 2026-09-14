import type { WeekSource } from "@/data/weekSupportContent";

interface Props {
  week: number;
  sources: WeekSource[];
}

/**
 * References section for pregnancy week pages.
 * Styled to match ArticleSources — calm, muted, at the tail of the page.
 */
const WeekSources = ({ week, sources }: Props) => {
  if (!sources || sources.length === 0) return null;

  return (
    <section className="bg-parchment py-14 md:py-18">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <div className="border-t border-border/30 pt-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 bg-border/20" />
            <p className="font-sans text-[10px] font-light tracking-[0.25em] uppercase text-muted-foreground/50">
              References and guidance
            </p>
            <div className="h-px flex-1 bg-border/20" />
          </div>

          <p className="font-sans text-[12px] font-light text-muted-foreground/70 leading-relaxed mb-6 max-w-xl">
            This page is informed by UK pregnancy guidance and reviewed against trusted clinical sources.
          </p>

          <ul className="space-y-2.5">
            {sources.map((source, i) => (
              <li key={`w${week}-src-${i}`} className="flex items-start gap-2.5">
                <span className="font-sans text-[10px] text-muted-foreground/40 tabular-nums mt-0.5 shrink-0">
                  [{i + 1}]
                </span>
                <span className="font-sans text-xs font-light text-muted-foreground/70 leading-relaxed">
                  <span className="text-foreground/80">{source.label}</span>
                  {source.publisher ? (
                    <span className="text-muted-foreground/50">
                      {" · "}
                      {source.publisher}
                    </span>
                  ) : null}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8 pt-6 border-t border-border/20">
            <p className="font-sans text-[11px] font-light text-muted-foreground/50 leading-relaxed max-w-lg">
              This guide is general information. Always speak to your midwife, GP or maternity unit if you are worried about symptoms or your pregnancy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeekSources;
