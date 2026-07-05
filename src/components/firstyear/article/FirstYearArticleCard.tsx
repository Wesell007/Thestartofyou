import { Link } from "react-router-dom";
import { ChevronRight, ShieldCheck, Clock } from "lucide-react";
import type { FirstYearArticle } from "@/data/firstYearArticleData";

interface Props {
  article: FirstYearArticle;
  tone?: "baby" | "recovery";
}

const FirstYearArticleCard = ({ article, tone = "baby" }: Props) => {
  const base = tone === "recovery" ? "--stage-recovery" : "--stage-firstyear";
  const soft = `${base}-soft`;
  const accentTok = `${base}-accent`;
  const deepTok = `${base}-deep`;

  const accent = `hsl(var(${accentTok}))`;
  const accentSoft = `hsl(var(${accentTok}) / 0.10)`;
  const accentBorder = `hsl(var(${accentTok}) / 0.22)`;
  const accentBorderStrong = `hsl(var(${accentTok}) / 0.32)`;
  const deep = `hsl(var(${deepTok}))`;
  const deepSoft = `hsl(var(${deepTok}) / 0.72)`;
  const deepMuted = `hsl(var(${deepTok}) / 0.55)`;

  const isReady = article.status === "ready";

  const cardStyle: React.CSSProperties = {
    borderColor: accentBorderStrong,
    background: `linear-gradient(160deg, hsl(var(${base}) / 0.55) 0%, hsl(var(${soft}) / 0.9) 100%)`,
    boxShadow:
      "0 16px 36px -30px rgba(50,50,70,0.24), inset 0 1px 0 hsl(0 0% 100% / 0.7)",
  };

  const baseClass =
    "group relative flex h-full flex-col justify-between gap-6 rounded-2xl border px-6 py-6 overflow-hidden transition-all duration-300";
  const readyClass = `hover:-translate-y-[2px] hover:shadow-[0_22px_50px_-30px_rgba(50,50,70,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-parchment focus-visible:ring-[hsl(var(${accentTok})/0.5)]`;
  const draftClass = "cursor-default opacity-95";

  const inner = (
    <>
      <span
        className="pointer-events-none absolute -top-10 -left-10 h-32 w-32 rounded-full blur-2xl opacity-60"
        style={{ background: `hsl(var(${accentTok}) / 0.16)` }}
        aria-hidden
      />
      <div className="relative flex flex-col gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          {!isReady && (
            <span
              className="inline-flex items-center rounded-full px-2.5 py-0.5 font-sans text-[10px] font-medium tracking-[0.18em] uppercase"
              style={{
                backgroundColor: `hsl(var(${soft}) / 0.9)`,
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
    </>
  );

  if (isReady) {
    return (
      <Link
        to={`/first-year/${article.topic}/${article.slug}`}
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

export default FirstYearArticleCard;
