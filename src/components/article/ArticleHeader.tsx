import { Link } from "react-router-dom";
import type { ArticleData } from "@/data/articleData";

const TOPIC_LABELS: Record<string, string> = {
  body: "Your body",
  baby: "Your baby",
  feelings: "Your feelings",
  "health-and-safety": "Health and safety",
  "diet-and-exercise": "Diet and exercise",
  "preparing-for-baby": "Preparing for baby",
};

interface Props {
  data: ArticleData;
}

const ArticleHeader = ({ data }: Props) => {
  const topicLabel = data.topic ? TOPIC_LABELS[data.topic] : null;
  const topicHref = data.topic ? `/pregnancy/${data.topic}` : null;

  return (
    <header className="bg-parchment pt-24 sm:pt-28 md:pt-32 pb-2 sm:pb-3 md:pb-4">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 mb-6 sm:mb-8 font-sans text-[11px] font-light tracking-[0.12em] uppercase text-muted-foreground/70 flex-wrap"
        >
          <Link
            to="/pregnancy"
            className="hover:text-sage transition-colors"
          >
            The Pregnancy Map
          </Link>
          {topicLabel && topicHref && (
            <>
              <span className="opacity-50" aria-hidden="true">
                ·
              </span>
              <Link
                to={topicHref}
                className="hover:text-sage transition-colors"
              >
                {topicLabel}
              </Link>
            </>
          )}
        </nav>

        {/* Title */}
        <h1 className="font-serif text-foreground leading-[1.12] tracking-tight mb-5 sm:mb-6 text-[1.875rem] sm:text-[2.25rem] md:text-[2.75rem] lg:text-[3rem]">
          {data.title}
        </h1>

        {/* Standfirst */}
        {data.standfirst && (
          <p className="font-serif italic text-foreground/70 leading-relaxed text-base sm:text-lg md:text-[1.25rem] max-w-2xl">
            {data.standfirst}
          </p>
        )}
      </div>
    </header>
  );
};

export default ArticleHeader;
