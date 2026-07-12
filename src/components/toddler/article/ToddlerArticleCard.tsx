import { Link } from "react-router-dom";
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
  const accentBorder = "hsl(var(--stage-toddler-accent) / 0.22)";
  const accentBorderStrong = "hsl(var(--stage-toddler-accent) / 0.32)";
  const deep = "hsl(var(--stage-toddler-deep))";
  const deepSoft = "hsl(var(--stage-toddler-deep) / 0.72)";
  const deepMuted = "hsl(var(--stage-toddler-deep) / 0.55)";

  const isReady = article.status === "ready";
  const hero = getToddlerArticleImages(article.slug)?.hero
    ?? TOPIC_FALLBACK[article.topic as ToddlerArticleTopic];

  const cardStyle: React.CSSProperties = {
    borderColor: accentBorderStrong,
    background:
      "linear-gradient(160deg, hsl(var(--stage-toddler) / 0.55) 0%, hsl(var(--stage-toddler-soft) / 0.9) 100%)",
    boxShadow:
      "0 16px 36px -30px rgba(60,50,40,0.26), inset 0 1px 0 hsl(0 0% 100% / 0.7)",
  };

  const baseClass =
    "group relative flex h-full flex-col rounded-2xl border overflow-hidden transition-all duration-300";
  const readyClass =
    "hover:-translate-y-[2px] hover:shadow-[0_22px_50px_-30px_rgba(60,50,40,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-parchment focus-visible:ring-[hsl(var(--stage-toddler-accent)/0.5)]";
  const draftClass = "cursor-default opacity-95";

  const inner = (
    <>
      {hero && (
        <div
          className="relative aspect-[16/10] overflow-hidden"
          style={{ borderBottom: `1px solid ${accentBorder}` }}
        >
          <img
            src={hero.src}
            alt={hero.alt}
            loading="lazy"
            className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ${
              isReady ? "group-hover:scale-[1.04]" : ""
            }`}
          />
          <span
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, hsl(var(--parchment) / 0) 55%, hsl(var(--parchment) / 0.45) 100%)",
            }}
            aria-hidden
          />
        </div>
      )}
      <div className="relative flex flex-1 flex-col justify-between gap-6 px-6 py-6">
        <span
          className="pointer-events-none absolute -top-10 -left-10 h-32 w-32 rounded-full blur-2xl opacity-60"
          style={{ background: "hsl(var(--stage-toddler-accent) / 0.16)" }}
          aria-hidden
        />
        <div className="relative flex flex-col gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            {!isReady && (
              <span
                className="inline-flex items-center rounded-full px-2.5 py-0.5 font-sans text-[10px] font-medium tracking-[0.18em] uppercase"
                style={{
                  backgroundColor: "hsl(var(--stage-toddler-soft) / 0.9)",
                  color: deep,
                  border: `1px solid ${accentBorder}`,
                }}
              >
                Coming soon
              </span>
            )}
            {article.medicallyReviewed && (
              <span
                className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-sans text-[10.5px] font-medium"
                style={{
                  backgroundColor: accentSoft,
                  color: deep,
                  border: `1px solid ${accentBorder}`,
                }}
              >
                <ShieldCheck size={11} strokeWidth={1.9} style={{ color: accent }} />
                Medically reviewed
              </span>
            )}
          </div>
          <h3 className="font-serif text-[17px] md:text-[18px] leading-snug" style={{ color: deep }}>
            {article.title}
          </h3>
          <p className="font-sans text-[13.5px] font-light leading-[1.65]" style={{ color: deepSoft }}>
            {article.description}
          </p>
        </div>
        <div className="relative flex items-center justify-between">
          <span
            className="inline-flex items-center gap-1.5 font-sans text-[12px] font-light"
            style={{ color: deepMuted }}
          >
            <Clock size={12} strokeWidth={1.8} aria-hidden />
            {article.readTime}
          </span>
          <span
            className={`inline-flex items-center justify-center h-8 w-8 rounded-full border transition-transform ${
              isReady ? "group-hover:translate-x-1" : ""
            }`}
            style={{ borderColor: accentBorderStrong, backgroundColor: accentSoft }}
            aria-hidden
          >
            <ChevronRight size={15} strokeWidth={1.8} style={{ color: accent }} />
          </span>
        </div>
      </div>
    </>
  );

  if (isReady) {
    return (
      <Link
        to={`/toddler/${article.topic}/${article.slug}`}
        className={`${baseClass} ${readyClass}`}
        style={cardStyle}
      >
        {inner}
      </Link>
    );
  }

  return (
    <div className={`${baseClass} ${draftClass}`} style={cardStyle} aria-disabled="true">
      {inner}
    </div>
  );
};

export default ToddlerArticleCard;
