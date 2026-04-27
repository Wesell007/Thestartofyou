import trimesterFirstImg from "@/assets/trimester-first.jpg";
import trimesterSecondImg from "@/assets/trimester-second.jpg";
import trimesterThirdImg from "@/assets/trimester-third.jpg";

const images: Record<number, string> = {
  1: trimesterFirstImg,
  2: trimesterSecondImg,
  3: trimesterThirdImg,
};

interface Props {
  number: 1 | 2 | 3;
  quote: string;
  caption?: string;
  alt?: string;
  bg?: string;
}

/**
 * Editorial hero-image block with overlaid quote card.
 * Sits between the trimester hero and the "About this stage" section,
 * giving the page a stronger sense of occasion.
 */
const TrimesterHeroImage = ({
  number,
  quote,
  caption = "You are not alone.",
  alt = "",
  bg = "bg-parchment",
}: Props) => {
  return (
    <section className={`${bg} pt-2 pb-10 sm:pb-14`}>
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-border/30 shadow-card-brand">
          <img
            src={images[number]}
            alt={alt}
            loading="lazy"
            width={1280}
            height={640}
            className="w-full h-[260px] sm:h-[360px] md:h-[440px] object-cover"
          />

          {/* Soft overlay for legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/20 via-foreground/5 to-transparent pointer-events-none" />

          {/* Overlay quote card — bottom-left on tablet+, full-width on mobile */}
          <div className="absolute left-4 right-4 bottom-4 sm:left-8 sm:right-auto sm:bottom-8 sm:max-w-xs md:max-w-sm">
            <div className="bg-card/95 backdrop-blur-sm rounded-xl p-5 sm:p-6 shadow-card-brand border border-border/30">
              <blockquote className="font-serif italic text-[16px] sm:text-[18px] md:text-[19px] text-foreground leading-snug">
                &ldquo;{quote}&rdquo;
              </blockquote>
              <p className="mt-3 font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-sage-muted">
                {caption}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrimesterHeroImage;
