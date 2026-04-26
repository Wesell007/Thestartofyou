import type { ArticleData } from "@/data/articleData";
import heroNausea from "@/assets/article-hero-nausea.jpg";
import heroFatigue from "@/assets/article-hero-fatigue.jpg";
import heroImplantation from "@/assets/article-hero-implantation.jpg";
import heroSymptomsStopping from "@/assets/article-hero-symptoms-stopping.jpg";
import botanicalFallback from "@/assets/article-botanical-accent.png";

// Legacy slug → asset map (kept intact, used as fallback 2).
const heroImageMap: Record<string, string> = {
  "nausea-in-early-pregnancy": heroNausea,
  "complete-guide-morning-sickness": heroNausea,
  "fatigue-in-early-pregnancy": heroFatigue,
  "implantation-bleeding": heroImplantation,
  "early-pregnancy-symptoms-explained": heroImplantation,
  "symptoms-stopping-early-pregnancy": heroSymptomsStopping,
};

interface Props {
  data: ArticleData;
}

type Resolved =
  | { src: string; alt: string; decorative: false; credit?: string }
  | { src: string; alt: ""; decorative: true }
  | null;

const resolveHero = (data: ArticleData): Resolved => {
  // 1. Explicit per-article hero (alt is required by type).
  if (data.hero?.src) {
    return {
      src: data.hero.src,
      alt: data.hero.alt,
      decorative: false,
      credit: data.hero.credit,
    };
  }

  // 2. Legacy slug → image lookup. Use article title as meaningful alt.
  const legacy = heroImageMap[data.slug];
  if (legacy) {
    return { src: legacy, alt: data.title, decorative: false };
  }

  // 3. Decorative botanical fallback.
  if (botanicalFallback) {
    return { src: botanicalFallback, alt: "", decorative: true };
  }

  // 4. Nothing to render.
  return null;
};

const ArticleHeroImage = ({ data }: Props) => {
  const hero = resolveHero(data);
  if (!hero) {
    return (
      <div className="bg-parchment">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl my-10 sm:my-12 md:my-14">
          <div className="aspect-[4/3] md:aspect-[16/9] rounded-xl bg-parchment-dark/40" />
        </div>
      </div>
    );
  }

  const isBotanical = hero.decorative;

  return (
    <div className="bg-parchment">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl my-10 sm:my-12 md:my-14">
        <figure className="m-0">
          <div
            className={`overflow-hidden rounded-xl ${
              isBotanical ? "bg-parchment-dark/40 flex items-center justify-center" : "bg-parchment-dark/30"
            }`}
          >
            <img
              src={hero.src}
              alt={hero.alt}
              {...(isBotanical ? { "aria-hidden": true } : {})}
              loading="eager"
              decoding="async"
              className={
                isBotanical
                  ? "w-1/3 max-w-[180px] h-auto opacity-60 my-12"
                  : "w-full h-auto aspect-[4/3] md:aspect-[16/9] object-cover"
              }
            />
          </div>
          {!isBotanical && "credit" in hero && hero.credit && (
            <figcaption className="mt-2 text-right font-sans text-[11px] font-light text-muted-foreground/60">
              {hero.credit}
            </figcaption>
          )}
        </figure>
      </div>
    </div>
  );
};

export default ArticleHeroImage;
