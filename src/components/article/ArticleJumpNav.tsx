import { useState, useEffect, useRef } from "react";
import type { ArticleData } from "@/data/articleData";

interface Props {
  data: ArticleData;
}

const ArticleJumpNav = ({ data }: Props) => {
  const [isSticky, setIsSticky] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const hasItems = data.inThisArticle && data.inThisArticle.length > 0;

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
        if (!entry.isIntersecting) setIsCollapsed(true);
      },
      { threshold: 0, rootMargin: "-80px 0px 0px 0px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasItems]);

  if (!hasItems) return null;

  return (
    <>
      {/* Sentinel element */}
      <div ref={sentinelRef} className="h-0" />

      {/* Inline version */}
      <section className="bg-parchment py-8 sm:py-10 md:py-14">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
          <div className="border border-border/30 rounded-xl sm:rounded-2xl px-5 py-5 sm:px-7 sm:py-6 md:px-9 md:py-8 bg-card/50">
            <p className="font-sans text-[10px] font-light tracking-[0.25em] uppercase text-sage-muted mb-4 sm:mb-5">
              In this guide
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 sm:gap-y-2.5">
              {data.inThisArticle.map((section, i) => (
                <div key={i} className="flex items-baseline gap-3">
                  <span className="font-sans text-[11px] text-sage/50 tabular-nums shrink-0 w-5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-sans text-[13px] sm:text-sm font-light text-foreground/80 leading-snug">
                    {section}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sticky compact version (desktop only) */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 bg-parchment/95 backdrop-blur-sm border-b border-border/20 transition-all duration-300 hidden md:block ${
          isSticky ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="container mx-auto px-6 md:px-10 max-w-5xl">
          <div className="flex items-center gap-6 py-3">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="font-sans text-[10px] font-light tracking-[0.2em] uppercase text-sage-muted hover:text-sage transition-colors shrink-0"
            >
              {isCollapsed ? "In this guide ↓" : "In this guide ↑"}
            </button>

            {isCollapsed && (
              <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
                {data.inThisArticle.slice(0, 6).map((section, i) => (
                  <span
                    key={i}
                    className="font-sans text-xs font-light text-muted-foreground whitespace-nowrap"
                  >
                    {section}
                  </span>
                ))}
              </div>
            )}
          </div>

          {!isCollapsed && (
            <div className="pb-4 grid grid-cols-3 gap-x-8 gap-y-1.5">
              {data.inThisArticle.map((section, i) => (
                <span key={i} className="font-sans text-xs font-light text-muted-foreground leading-snug">
                  <span className="text-sage/40 mr-2">{String(i + 1).padStart(2, "0")}</span>
                  {section}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ArticleJumpNav;
