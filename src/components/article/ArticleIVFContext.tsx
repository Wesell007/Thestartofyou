import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { ArticleData } from "@/data/articleData";

interface IVFLastStage {
  slug: string;
  title: string;
  href: string;
}

interface Props {
  data: ArticleData;
}

/**
 * Deliberately light orientation strip rendered above the article hero when
 * the article belongs to the IVF journey. Its only job is to keep IVF context
 * visible — it must never compete with the article hero.
 *
 * Reads the last IVF stage the reader was on from sessionStorage
 * (key: `ivf:lastStage`, written by IVFTopicPage). If absent, shows just
 * the IVF hub link.
 */
const ArticleIVFContext = ({ data }: Props) => {
  const isIVF = data.journey?.includes("ivf");
  const [stage, setStage] = useState<IVFLastStage | null>(null);

  useEffect(() => {
    if (!isIVF) return;
    try {
      const raw = sessionStorage.getItem("ivf:lastStage");
      if (raw) {
        const parsed = JSON.parse(raw) as IVFLastStage;
        if (parsed && parsed.slug && parsed.title && parsed.href) {
          setStage(parsed);
        }
      }
    } catch {
      // ignore — strip is enhancement only
    }
  }, [isIVF]);

  if (!isIVF) return null;

  return (
    <div className="bg-parchment pt-24 sm:pt-28 md:pt-32 pb-0">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <nav
          aria-label="IVF journey context"
          className="flex items-center gap-2 font-sans text-[11px] font-light tracking-[0.18em] uppercase text-muted-foreground/70 flex-wrap"
        >
          <span className="text-foreground/55">IVF</span>
          {stage && (
            <>
              <span className="opacity-40" aria-hidden="true">·</span>
              <Link
                to={stage.href}
                className="hover:text-foreground transition-colors"
              >
                ← {stage.title}
              </Link>
            </>
          )}
          <span className="opacity-40" aria-hidden="true">·</span>
          <Link to="/ivf" className="hover:text-foreground transition-colors">
            ← IVF hub
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default ArticleIVFContext;
