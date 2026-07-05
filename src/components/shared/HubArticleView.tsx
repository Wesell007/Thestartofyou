import { Link } from "react-router-dom";
import { ArrowLeft, ChevronRight, Clock, Home, ShieldCheck } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import type { ReactNode } from "react";

export interface HubArticleViewArticle {
  slug: string;
  topic: string;
  title: string;
  description: string;
  readTime: string;
  medicallyReviewed?: boolean;
  status: "draft" | "ready";
  lastUpdated?: string;
  reviewedBy?: string;
  intro?: string;
  sections?: { heading: string; body: string[] }[];
  keyTakeaways?: string[];
}

export interface HubArticleTokens {
  /** e.g. "--stage-family" */
  base: string;
  soft: string;
  accent: string;
  deep: string;
}

interface Props {
  article: HubArticleViewArticle;
  tokens: HubArticleTokens;
  hubLabel: string;
  hubHref: string;
  topicLabel: string;
  topicHref: string;
  topicEyebrow?: string;
  /** Rendered inside "Related guidance" section, if any. */
  relatedSlot?: ReactNode;
}

const HubArticleView = ({
  article,
  tokens,
  hubLabel,
  hubHref,
  topicLabel,
  topicHref,
  topicEyebrow,
  relatedSlot,
}: Props) => {
  const accent = `hsl(var(${tokens.accent}))`;
  const accentSoft = `hsl(var(${tokens.accent}) / 0.10)`;
  const accentBorder = `hsl(var(${tokens.accent}) / 0.22)`;
  const accentBorderStrong = `hsl(var(${tokens.accent}) / 0.32)`;
  const accentMid = `hsl(var(${tokens.accent}) / 0.22)`;
  const tintWash = `hsl(var(${tokens.base}) / 0.55)`;
  const softWash = `hsl(var(${tokens.soft}) / 0.6)`;
  const deep = `hsl(var(${tokens.deep}))`;
  const deepSoft = `hsl(var(${tokens.deep}) / 0.72)`;
  const deepMuted = `hsl(var(${tokens.deep}) / 0.55)`;

  const isDraft = article.status === "draft";

  const SectionLabel = ({ children }: { children: ReactNode }) => (
    <div className="flex items-center gap-3">
      <span className="h-px w-8" style={{ background: accentMid }} aria-hidden />
      <span
        className="font-sans text-[11px] font-light tracking-[0.28em] uppercase"
        style={{ color: accent }}
      >
        {children}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen font-sans bg-parchment">
      <Navbar />
      <main className="overflow-hidden">
        {/* ─── HERO ────────────────────────────────────────────────── */}
        <section className="relative pt-8 sm:pt-12 md:pt-16 pb-14 md:pb-20">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[380px] md:h-[520px] -z-0"
            style={{
              background: `linear-gradient(180deg, ${tintWash} 0%, ${softWash} 55%, transparent 100%)`,
            }}
            aria-hidden
          />
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl relative z-10">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="mb-10 md:mb-12 font-sans text-[12.5px] font-light"
            >
              <ol
                className="flex items-center gap-1.5 flex-wrap"
                style={{ color: deepSoft }}
              >
                <li>
                  <Link
                    to={hubHref}
                    className="inline-flex items-center gap-1.5 hover:underline underline-offset-4 transition-colors"
                    style={{ color: accent }}
                  >
                    <Home size={12} strokeWidth={1.8} aria-hidden />
                    {hubLabel}
                  </Link>
                </li>
                <li aria-hidden>
                  <ChevronRight size={13} strokeWidth={1.6} />
                </li>
                <li>
                  <Link
                    to={topicHref}
                    className="hover:underline underline-offset-4 transition-colors"
                    style={{ color: accent }}
                  >
                    {topicLabel}
                  </Link>
                </li>
                <li aria-hidden>
                  <ChevronRight size={13} strokeWidth={1.6} />
                </li>
                <li aria-current="page" style={{ color: deep }}>
                  {article.title}
                </li>
              </ol>
            </nav>

            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-5">
              <span
                className="h-px w-8"
                style={{ background: accentMid }}
                aria-hidden
              />
              <span
                className="font-sans text-[11px] font-light tracking-[0.3em] uppercase"
                style={{ color: accent }}
              >
                {topicEyebrow ?? topicLabel}
              </span>
            </div>

            <h1
              className="font-serif text-[2rem] sm:text-[2.4rem] md:text-[2.7rem] leading-[1.08] tracking-[-0.005em]"
              style={{ color: deep }}
            >
              {article.title}
            </h1>

            {article.intro && (
              <p
                className="mt-6 font-serif italic text-[16.5px] md:text-[17px] leading-[1.7] max-w-[36rem]"
                style={{ color: deepSoft }}
              >
                {article.intro}
              </p>
            )}

            {/* Meta row */}
            <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 font-sans text-[12.5px] font-light" style={{ color: deepMuted }}>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={12} strokeWidth={1.8} aria-hidden />
                {article.readTime}
              </span>
              {article.lastUpdated && (
                <>
                  <span aria-hidden>·</span>
                  <span>Last updated {article.lastUpdated}</span>
                </>
              )}
              {article.medicallyReviewed && article.reviewedBy && (
                <>
                  <span aria-hidden>·</span>
                  <span className="inline-flex items-center gap-1.5" style={{ color: deep }}>
                    <ShieldCheck size={12} strokeWidth={1.9} style={{ color: accent }} />
                    Medically reviewed by {article.reviewedBy}
                  </span>
                </>
              )}
              {isDraft && (
                <>
                  <span aria-hidden>·</span>
                  <span
                    className="inline-flex items-center rounded-full px-2.5 py-0.5 font-sans text-[10px] font-medium tracking-[0.18em] uppercase"
                    style={{
                      backgroundColor: `hsl(var(${tokens.soft}) / 0.9)`,
                      color: deep,
                      border: `1px solid ${accentBorder}`,
                    }}
                  >
                    Draft preview
                  </span>
                </>
              )}
            </div>
          </div>
        </section>

        {/* ─── KEY TAKEAWAYS ─────────────────────────────────────── */}
        {article.keyTakeaways && article.keyTakeaways.length > 0 && (
          <section className="pb-14 md:pb-16">
            <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
              <div
                className="rounded-[22px] border p-7 md:p-9"
                style={{
                  borderColor: accentBorderStrong,
                  background: `linear-gradient(160deg, hsl(var(${tokens.base}) / 0.35) 0%, hsl(var(${tokens.soft}) / 0.7) 100%)`,
                  boxShadow:
                    "0 20px 48px -32px rgba(60,50,40,0.28), inset 0 1px 0 hsl(0 0% 100% / 0.7)",
                }}
              >
                <SectionLabel>Key takeaways</SectionLabel>
                <ul className="mt-6 space-y-3.5">
                  {article.keyTakeaways.map((t, i) => (
                    <li key={i} className="flex items-start gap-3.5">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0"
                        style={{ background: accent }}
                        aria-hidden
                      />
                      <span
                        className="font-sans text-[14.75px] font-light leading-[1.65]"
                        style={{ color: deepSoft }}
                      >
                        {t}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* ─── BODY ──────────────────────────────────────────────── */}
        <section className="pb-16 md:pb-20">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
            {article.sections && article.sections.length > 0 ? (
              <div className="space-y-10 md:space-y-12">
                {article.sections.map((s, i) => (
                  <div key={i}>
                    <h2
                      className="font-serif text-[1.55rem] md:text-[1.75rem] leading-tight"
                      style={{ color: deep }}
                    >
                      {s.heading}
                    </h2>
                    <div className="mt-4 space-y-4">
                      {s.body.map((p, j) => (
                        <p
                          key={j}
                          className="font-sans text-[15.5px] font-light leading-[1.75]"
                          style={{ color: deepSoft }}
                        >
                          {p}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p
                className="font-serif italic text-[15px] leading-[1.7]"
                style={{ color: deepSoft }}
              >
                This article is being prepared.
              </p>
            )}

            {article.medicallyReviewed && article.reviewedBy && (
              <div
                className="mt-12 rounded-2xl border px-6 py-5 flex items-start gap-3"
                style={{
                  borderColor: accentBorder,
                  backgroundColor: accentSoft,
                }}
              >
                <ShieldCheck
                  size={16}
                  strokeWidth={1.9}
                  style={{ color: accent }}
                  className="mt-0.5 shrink-0"
                  aria-hidden
                />
                <p
                  className="font-sans text-[13.5px] font-light leading-[1.6]"
                  style={{ color: deepSoft }}
                >
                  ✔ Medically reviewed by {article.reviewedBy}. Guidance is
                  informational and not a substitute for advice from your GP,
                  midwife or health visitor.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ─── RELATED GUIDANCE ──────────────────────────────────── */}
        {relatedSlot && (
          <section
            className="relative py-16 md:py-20"
            style={{
              background: `linear-gradient(to bottom, hsl(var(--parchment)) 0%, hsl(var(${tokens.base}) / 0.24) 100%)`,
            }}
          >
            <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
              <div className="mb-9 md:mb-11 flex flex-col items-start gap-3">
                <SectionLabel>Guidance</SectionLabel>
                <h2
                  className="font-serif text-[1.6rem] md:text-[1.85rem] leading-tight"
                  style={{ color: deep }}
                >
                  Related guidance
                </h2>
              </div>
              {relatedSlot}
            </div>
          </section>
        )}

        {/* ─── BACK TO TOPIC CTA ─────────────────────────────────── */}
        <section className="pb-24 md:pb-32">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-2xl">
            <div
              className="relative rounded-[24px] border px-7 py-9 md:px-10 md:py-10 text-center"
              style={{
                borderColor: accentBorderStrong,
                background: `linear-gradient(170deg, hsl(var(--parchment)) 0%, hsl(var(${tokens.base}) / 0.5) 100%)`,
                boxShadow:
                  "0 24px 56px -36px rgba(60,50,40,0.3), inset 0 1px 0 hsl(0 0% 100% / 0.72)",
              }}
            >
              <p
                className="font-serif italic text-[15px] mb-6 max-w-md mx-auto leading-relaxed"
                style={{ color: deepSoft }}
              >
                Back to {topicLabel.toLowerCase()} when you're ready.
              </p>
              <Link
                to={topicHref}
                className="inline-flex items-center gap-2 rounded-full border px-6 py-2.5 font-sans text-[13px] font-medium tracking-wide transition-all hover:-translate-y-0.5"
                style={{
                  borderColor: accentBorderStrong,
                  backgroundColor: accentSoft,
                  color: deep,
                }}
              >
                <ArrowLeft size={14} strokeWidth={1.8} style={{ color: accent }} />
                Return to {topicLabel}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HubArticleView;
