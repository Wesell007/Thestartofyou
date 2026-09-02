import { Link } from "react-router-dom";
import { Shield, Clock, BookOpen } from "lucide-react";
import type { ArticleData } from "@/data/articleData";
import { estimateReadTime } from "@/lib/readingTime";
import { flagshipHeroMap } from "./flagshipImageMap";

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

const FlagshipHero = ({ data }: Props) => {
  const isIVF = data.journey?.includes("ivf");
  const isTTC = !isIVF && data.journey?.includes("trying-to-conceive");
  const hero = data.hero ?? flagshipHeroMap[data.slug];
  const topicLabel = data.topic ? TOPIC_LABELS[data.topic] : null;
  const topicHref = data.topic ? `/pregnancy/${data.topic}` : null;
  const primaryLabel = isIVF ? null : isTTC ? "The TTC Guide" : topicLabel;
  const primaryHref = isIVF ? null : isTTC ? "/trying-to-conceive" : topicHref;

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

  // For IVF articles orientation lives in ArticleIVFContext above the hero;
  // suppress the default breadcrumb here so we don't show a misleading
  // "The Pregnancy Map" root.
  const headerTopPad = isIVF
    ? "pt-4 sm:pt-6 md:pt-8"
    : "pt-24 sm:pt-28 md:pt-32";

  return (
    <header className={`bg-parchment ${headerTopPad} pb-10 sm:pb-14 md:pb-20`}>
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
        {!isIVF && (
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 mb-6 sm:mb-8 font-sans text-[11px] font-light tracking-[0.12em] uppercase text-muted-foreground/70 flex-wrap"
          >
            <Link to={isTTC ? "/trying-to-conceive" : "/pregnancy"} className="hover:text-sage transition-colors">
              {isTTC ? "The TTC Guide" : "The Pregnancy Map"}
            </Link>
            {!isTTC && topicLabel && topicHref && (
              <>
                <span className="opacity-50" aria-hidden="true">·</span>
                <Link to={topicHref} className="hover:text-sage transition-colors">
                  {topicLabel}
                </Link>
              </>
            )}
          </nav>
        )}

        {/* Split: text left, image right (desktop only) — stacked on mobile + tablet */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-14 items-center">
          {/* TEXT */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            {primaryLabel && primaryHref && (
              <div className="flex items-center gap-3 mb-4 sm:mb-5">
                <div className="h-px w-8 bg-sage-light" />
                <p className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-sage-muted">
                  <Link to={primaryHref} className="hover:text-sage transition-colors">
                    {primaryLabel}
                  </Link>
                </p>
              </div>
            )}

            <h1 className="font-serif text-foreground leading-[1.08] tracking-tight mb-5 sm:mb-6 text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem]">
              {data.title}
            </h1>

            {data.standfirst && (
              <p className="font-serif italic text-foreground/70 leading-relaxed text-base sm:text-lg md:text-[1.2rem] max-w-xl">
                {data.standfirst}
              </p>
            )}

            <div className="mt-7 sm:mt-8 flex flex-wrap items-center gap-x-5 gap-y-2">
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

          {/* IMAGE */}
          {hero && (
            <div className="lg:col-span-5 order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-elevated aspect-[4/3] md:aspect-[16/10] lg:aspect-[4/5]">
                <img
                  src={hero.src}
                  alt={hero.alt}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default FlagshipHero;
