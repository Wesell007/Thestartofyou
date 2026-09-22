import { Link } from "react-router-dom";
import { hasReviewClaim, reviewSurfaceKey } from "@/lib/reviewClaims";
import type { CSSProperties } from "react";
import { ChevronRight, ShieldCheck, Clock } from "lucide-react";
import type { FirstYearArticle } from "@/data/firstYearArticleData";
import { getFirstYearArticleImages } from "@/components/firstyear/article/firstYearArticleImages";

interface Props {
  article: FirstYearArticle;
  tone?: "baby" | "recovery";
}

const FirstYearArticleCard = ({ article, tone = "baby" }: Props) => {
  const base = tone === "recovery" ? "--stage-recovery" : "--stage-firstyear";
  const accentTok = `${base}-accent`;
  const deepTok = `${base}-deep`;

  const accent = `hsl(var(${accentTok}))`;
  const accentSoft = `hsl(var(${accentTok}) / 0.10)`;
  const accentBorder = `hsl(var(${accentTok}) / 0.28)`;
  const accentBorderStrong = `hsl(var(${accentTok}) / 0.36)`;
  const deep = `hsl(var(${deepTok}))`;
  const deepSoft = `hsl(var(${deepTok}) / 0.72)`;
  const deepMuted = `hsl(var(${deepTok}) / 0.55)`;

  const isReady = article.status === "ready";
  const mappedHero = getFirstYearArticleImages(article.slug)?.hero;
  const hero = article.suppressHeroImage ? undefined : mappedHero;

  const cardClass =
    "group relative flex h-full flex-col overflow-hidden rounded-[22px] border bg-parchment transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_28px_60px_-32px_rgba(50,50,70,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-parchment focus-visible:ring-[var(--card-ring)]";

  const cardStyle = {
    borderColor: accentBorder,
    "--card-ring": `hsl(var(${accentTok}) / 0.5)`,
  } as CSSProperties;

  const overlayGradient = `linear-gradient(160deg, hsl(var(${base}) / 0.14) 0%, transparent 50%, hsl(var(${deepTok}) / 0.22) 100%)`;

  const inner = (
    <>
      {hero && (
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <img
            src={hero.src}
            alt={hero.alt}
            loading="lazy"
            width={1264}
            height={848}
            className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 ${
              isReady ? "group-hover:scale-[1.03]" : ""
            }`}
          />
          <span
            className="pointer-events-none absolute inset-0"
            style={{ background: overlayGradient }}
            aria-hidden
          />
        </div>
      )}
      <div
        className={`flex flex-1 flex-col gap-3 p-6 ${article.suppressHeroImage ? "min-h-[18rem] justify-center sm:min-h-[20rem]" : ""}`}
        data-image-treatment={article.suppressHeroImage ? "text-led" : undefined}
      >
        <div className="flex flex-wrap items-center gap-2">
          {!isReady && (
            <span
              className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-sans text-[10px] font-medium tracking-[0.18em] uppercase"
              style={{
                backgroundColor: `hsl(var(${base}-soft) / 0.9)`,
                color: deep,
                borderColor: accentBorder,
              }}
            >
              Coming soon
            </span>
          )}
          {hasReviewClaim(reviewSurfaceKey("article", article.slug)) && (
            <span
              className="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-sans text-[10.5px] font-medium"
              style={{
                backgroundColor: accentSoft,
                color: deep,
                borderColor: accentBorder,
              }}
            >
              <ShieldCheck size={11} strokeWidth={1.9} style={{ color: accent }} />
              Medically reviewed
            </span>
          )}
        </div>
        <h3
          className="font-serif text-[17px] md:text-[18px] leading-snug"
          style={{ color: deep }}
        >
          {article.title}
        </h3>
        <p
          className="font-sans text-[13.5px] font-light leading-[1.65]"
          style={{ color: deepSoft }}
        >
          {article.description}
        </p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span
            className="inline-flex items-center gap-1.5 font-sans text-[12px] font-light"
            style={{ color: deepMuted }}
          >
            <Clock size={12} strokeWidth={1.8} aria-hidden />
            {article.readTime}
          </span>
          <span
            className={`inline-flex h-8 w-8 items-center justify-center rounded-full border transition-transform ${
              isReady ? "group-hover:translate-x-1" : ""
            }`}
            style={{
              borderColor: accentBorderStrong,
              backgroundColor: accentSoft,
            }}
            aria-hidden
          >
            <ChevronRight size={15} strokeWidth={1.8} style={{ color: accent }} />
          </span>
        </div>
      </div>
    </>
  );

  if (!isReady) {
    return (
      <div
        className={`${cardClass} cursor-default opacity-95`}
        style={cardStyle}
        aria-disabled="true"
      >
        {inner}
      </div>
    );
  }

  return (
    <Link
      to={`/first-year/${article.topic}/${article.slug}`}
      className={cardClass}
      style={cardStyle}
    >
      {inner}
    </Link>
  );
};

export default FirstYearArticleCard;
