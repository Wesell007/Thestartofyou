import { Link } from "react-router-dom";
import { hasReviewClaim, reviewSurfaceKey } from "@/lib/reviewClaims";
import { ChevronRight, ShieldCheck, Clock } from "lucide-react";
import type { ToddlerArticle, ToddlerArticleTopic } from "@/data/toddlerArticleData";
import { getToddlerArticleImages } from "@/components/toddler/article/toddlerArticleImages";
import topicBehaviour from "@/assets/toddler-topic-behaviour.jpg.asset.json";
import topicDevelopment from "@/assets/toddler-topic-development.jpg.asset.json";
import topicFood from "@/assets/toddler-topic-food.jpg.asset.json";
import topicHealth from "@/assets/toddler-topic-health.jpg.asset.json";
import topicPlay from "@/assets/toddler-topic-play.jpg.asset.json";
import topicPotty from "@/assets/toddler-topic-potty.jpg.asset.json";
import topicSleep from "@/assets/toddler-topic-sleep.jpg.asset.json";
import topicSpeech from "@/assets/toddler-topic-speech.jpg.asset.json";

const TOPIC_FALLBACK: Record<ToddlerArticleTopic, { src: string; alt: string }> = {
  "development-milestones": { src: topicDevelopment.url, alt: "Toddler development scene" },
  "behaviour-emotions": { src: topicBehaviour.url, alt: "Toddler emotions scene" },
  "speech-language": { src: topicSpeech.url, alt: "Toddler speech and language scene" },
  "sleep": { src: topicSleep.url, alt: "Toddler sleep scene" },
  "food-feeding": { src: topicFood.url, alt: "Toddler mealtime scene" },
  "potty-learning": { src: topicPotty.url, alt: "Toddler potty learning scene" },
  "health-safety": { src: topicHealth.url, alt: "Toddler home health and safety scene" },
  "play-connection": { src: topicPlay.url, alt: "Toddler play and connection scene" },
};

interface Props {
  article: ToddlerArticle;
}

const ToddlerArticleCard = ({ article }: Props) => {
  const accent = "hsl(var(--stage-toddler-accent))";
  const accentSoft = "hsl(var(--stage-toddler-accent) / 0.10)";
  const accentBorder = "hsl(var(--stage-toddler-accent) / 0.28)";
  const accentBorderStrong = "hsl(var(--stage-toddler-accent) / 0.36)";
  const deep = "hsl(var(--stage-toddler-deep))";
  const deepSoft = "hsl(var(--stage-toddler-deep) / 0.72)";
  const deepMuted = "hsl(var(--stage-toddler-deep) / 0.55)";

  const isReady = article.status === "ready";
  const hero = getToddlerArticleImages(article.slug)?.hero
    ?? TOPIC_FALLBACK[article.topic as ToddlerArticleTopic];

  const cardClass =
    "group relative flex h-full flex-col overflow-hidden rounded-[22px] border bg-parchment transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_28px_60px_-32px_rgba(70,50,20,0.38)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-parchment focus-visible:ring-[hsl(var(--stage-toddler-accent)/0.5)]";

  const inner = (
    <>
      {hero && (
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <img
            src={hero.src}
            alt={hero.alt}
            loading="lazy"
            className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 ${
              isReady ? "group-hover:scale-[1.03]" : ""
            }`}
          />
          <span
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, hsl(var(--stage-toddler) / 0.14) 0%, transparent 50%, hsl(var(--stage-toddler-deep) / 0.22) 100%)",
            }}
            aria-hidden
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-wrap items-center gap-2">
          {!isReady && (
            <span
              className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-sans text-[10px] font-medium tracking-[0.18em] uppercase"
              style={{
                backgroundColor: "hsl(var(--stage-toddler-soft) / 0.9)",
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
        style={{ borderColor: accentBorder }}
        aria-disabled="true"
      >
        {inner}
      </div>
    );
  }

  return (
    <Link
      to={`/toddler/${article.topic}/${article.slug}`}
      className={cardClass}
      style={{ borderColor: accentBorder }}
    >
      {inner}
    </Link>
  );
};

export default ToddlerArticleCard;
