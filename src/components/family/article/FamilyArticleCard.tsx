import { Link } from "react-router-dom";
import { ChevronRight, ShieldCheck, Clock } from "lucide-react";
import type { FamilyArticle } from "@/data/familyArticleData";

interface Props {
  article: FamilyArticle;
}

const FamilyArticleCard = ({ article }: Props) => {
  const accent = "hsl(var(--stage-family-accent))";
  const accentSoft = "hsl(var(--stage-family-accent) / 0.10)";
  const accentBorder = "hsl(var(--stage-family-accent) / 0.24)";
  const accentBorderStrong = "hsl(var(--stage-family-accent) / 0.34)";
  const deep = "hsl(var(--stage-family-deep))";
  const deepSoft = "hsl(var(--stage-family-deep) / 0.72)";
  const deepMuted = "hsl(var(--stage-family-deep) / 0.55)";

  const isReady = article.status === "ready";

  const cardStyle: React.CSSProperties = {
    borderColor: accentBorderStrong,
    background:
      "linear-gradient(160deg, hsl(var(--stage-family) / 0.55) 0%, hsl(var(--stage-family-soft) / 0.9) 100%)",
    boxShadow:
      "0 16px 36px -30px rgba(70,50,20,0.28), inset 0 1px 0 hsl(0 0% 100% / 0.7)",
  };

  const baseClass =
    "group relative flex h-full flex-col justify-between gap-6 rounded-2xl border px-6 py-6 overflow-hidden transition-all duration-300";

  const readyClass =
    "hover:-translate-y-[2px] hover:shadow-[0_22px_50px_-30px_rgba(70,50,20,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-parchment focus-visible:ring-[hsl(var(--stage-family-accent)/0.5)]";

  const draftClass = "cursor-default opacity-95";

  const inner = (
    <>
      <span
        className="pointer-events-none absolute -top-10 -left-10 h-32 w-32 rounded-full blur-2xl opacity-60"
        style={{ background: "hsl(var(--stage-family-accent) / 0.16)" }}
        aria-hidden
      />
      <div className="relative flex flex-col gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          {!isReady && (
            <span
              className="inline-flex items-center rounded-full px-2.5 py-0.5 font-sans text-[10px] font-medium tracking-[0.18em] uppercase"
              style={{
                backgroundColor: "hsl(var(--stage-family-soft) / 0.9)",
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
          style={{
            borderColor: accentBorderStrong,
            backgroundColor: accentSoft,
          }}
          aria-hidden
        >
          <ChevronRight size={15} strokeWidth={1.8} style={{ color: accent }} />
        </span>
      </div>
    </>
  );

  if (isReady) {
    return (
      <Link
        to={`/family/${article.topic}/${article.slug}`}
        className={`${baseClass} ${readyClass}`}
        style={cardStyle}
      >
        {inner}
      </Link>
    );
  }

  return (
    <div
      className={`${baseClass} ${draftClass}`}
      style={cardStyle}
      aria-disabled="true"
    >
      {inner}
    </div>
  );
};

export default FamilyArticleCard;
