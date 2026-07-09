import { Link } from "react-router-dom";
import { ChevronRight, Clock, ShieldCheck } from "lucide-react";
import type { FamilyArticle } from "@/data/familyArticleData";
import { getFamilyArticleCardImage } from "@/components/family/article/familyArticleImages";

interface Props {
  article: FamilyArticle;
}

const FamilyArticleImageCard = ({ article }: Props) => {
  const accent = "hsl(var(--stage-family-accent))";
  const accentSoft = "hsl(var(--stage-family-accent) / 0.10)";
  const accentBorder = "hsl(var(--stage-family-accent) / 0.28)";
  const accentBorderStrong = "hsl(var(--stage-family-accent) / 0.36)";
  const deep = "hsl(var(--stage-family-deep))";
  const deepSoft = "hsl(var(--stage-family-deep) / 0.72)";
  const deepMuted = "hsl(var(--stage-family-deep) / 0.55)";

  const image = getFamilyArticleCardImage(article);
  const isReady = article.status === "ready";
  const to = `/family/${article.topic}/${article.slug}`;

  const cardClass =
    "group relative flex h-full flex-col overflow-hidden rounded-[22px] border bg-parchment transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_28px_60px_-32px_rgba(70,50,20,0.38)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-parchment focus-visible:ring-[hsl(var(--stage-family-accent)/0.5)]";

  const inner = (
    <>
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, hsl(var(--stage-family) / 0.14) 0%, transparent 50%, hsl(var(--stage-family-deep) / 0.22) 100%)",
          }}
          aria-hidden
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-wrap items-center gap-2">
          {!isReady && (
            <span
              className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-sans text-[10px] font-medium tracking-[0.18em] uppercase"
              style={{
                backgroundColor: "hsl(var(--stage-family-soft) / 0.9)",
                color: deep,
                borderColor: accentBorder,
              }}
            >
              Coming soon
            </span>
          )}
          {article.medicallyReviewed && (
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
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border transition-transform group-hover:translate-x-1"
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
    <Link to={to} className={cardClass} style={{ borderColor: accentBorder }}>
      {inner}
    </Link>
  );
};

export default FamilyArticleImageCard;
