import type { ArticleData } from "@/data/articleData";
import { resolveArticleHero } from "@/lib/articleHeroImage";

interface Props {
  data: ArticleData;
}

const ArticleHeroImage = ({ data }: Props) => {
  const hero = resolveArticleHero(data);

  return (
    <div className="bg-parchment">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl mt-10 sm:mt-12 md:mt-14 mb-4 sm:mb-5 md:mb-6">
        <figure className="m-0">
          <div className="relative overflow-hidden rounded-xl bg-parchment-dark/30 shadow-soft">
            <img
              src={hero.src}
              alt={hero.alt}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-full h-auto aspect-[4/3] md:aspect-[16/9] object-cover"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-parchment/30 to-transparent"
            />
          </div>
          {hero.credit && (
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
