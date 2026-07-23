import { Link } from "react-router-dom";
import { Shield, Clock, BookOpen } from "lucide-react";
import type { ArticleData } from "@/data/articleData";
import { estimateReadTime } from "@/lib/readingTime";

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
  const isIVF = data.journey?.includes("ivf");
  const topicLabel = data.topic ? TOPIC_LABELS[data.topic] : null;
  const topicHref = data.topic ? `/pregnancy/${data.topic}` : null;

  const readTime = estimateReadTime([
    data.standfirst,
    data.quickAnswer,
    data.howThisFeels,
    data.whatHappening,
    data.whatItFeelsLike,
    data.whatThisMeans,
    data.normal,
    data.seekSupport,
    data.whatYouCanDo,
    data.whatHappensNext,
    data.keyTakeaways,
    data.editorialSections,
    data.faq,
  ]);

  // For IVF articles the orientation is handled by ArticleIVFContext above
  // the header — suppress the default Pregnancy breadcrumb so we don't show
  // a misleading "The Pregnancy Map" root.
  const headerTopPad = isIVF
    ? "pt-2 sm:pt-3 md:pt-4"
    : "pt-24 sm:pt-28 md:pt-32";

  return (
    <header className={`bg-parchment ${headerTopPad} pb-2 sm:pb-3 md:pb-4`}>
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        {/* Breadcrumb — hidden for IVF (handled by ArticleIVFContext above) */}
        {!isIVF && (
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 mb-5 sm:mb-6 font-sans text-[11px] font-light tracking-[0.12em] uppercase text-muted-foreground/70 flex-wrap"
          >
            <Link to="/pregnancy" className="hover:text-sage transition-colors">
              The Pregnancy Map
            </Link>
            {topicLabel && topicHref && (
              <>
                <span className="opacity-50" aria-hidden="true">·</span>
                <Link to={topicHref} className="hover:text-sage transition-colors">
                  {topicLabel}
                </Link>
              </>
            )}
          </nav>
        )}

        {/* Topic eyebrow — small editorial label tying the page to its topic */}
        {topicLabel && (
          <div className="flex items-center gap-3 mb-4 sm:mb-5">
            <div className="h-px w-8 bg-sage-light" />
            <p className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-sage-muted">
              {topicLabel}
            </p>
          </div>
        )}

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

        {/* Editorial trust meta row */}
        <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 pb-1">
            <span className="inline-flex items-center gap-1.5 font-sans text-[11px] font-light text-foreground/55">
              <BookOpen className="w-3 h-3 text-foreground/40" />
              {readTime}
            </span>
            {data.reviewedBy && (
              <span className="inline-flex items-center gap-1.5 font-sans text-[11px] font-light text-foreground/65">
                <Shield className="w-3 h-3 text-sage/70" />
                Medically reviewed by {data.reviewedBy}
              </span>
            )}
            {data.lastUpdated && (
              <span className="inline-flex items-center gap-1.5 font-sans text-[11px] font-light text-foreground/55">
                <Clock className="w-3 h-3 text-foreground/40" />
                Updated {data.lastUpdated}
              </span>
            )}
        </div>
      </div>
    </header>
  );
};

export default ArticleHeader;
