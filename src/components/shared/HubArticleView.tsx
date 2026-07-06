import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ChevronRight,
  Clock,
  Home,
  ShieldCheck,
  Sparkles,
  BookOpen,
} from "lucide-react";
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
  heroImage?: { src: string; alt: string };
  bodyImages?: { afterSectionIndex: number; src: string; alt: string; caption?: string }[];
  /** Rendered inside "Related guidance" section, if any. */
  relatedSlot?: ReactNode;
}

const sectionAnchorId = (i: number) => `section-${i + 1}`;
const two = (n: number) => String(n).padStart(2, "0");

const HubArticleView = ({
  article,
  tokens,
  hubLabel,
  hubHref,
  topicLabel,
  topicHref,
  topicEyebrow,
  heroImage,
  bodyImages,
  relatedSlot,
}: Props) => {
  const accent = `hsl(var(${tokens.accent}))`;
  const accentSoft = `hsl(var(${tokens.accent}) / 0.10)`;
  const accentSofter = `hsl(var(${tokens.accent}) / 0.05)`;
  const accentBorder = `hsl(var(${tokens.accent}) / 0.22)`;
  const accentBorderStrong = `hsl(var(${tokens.accent}) / 0.32)`;
  const accentMid = `hsl(var(${tokens.accent}) / 0.22)`;
  const tintWash = `hsl(var(${tokens.base}) / 0.55)`;
  const softWash = `hsl(var(${tokens.soft}) / 0.6)`;
  const deep = `hsl(var(${tokens.deep}))`;
  const deepSoft = `hsl(var(${tokens.deep}) / 0.72)`;
  const deepMuted = `hsl(var(${tokens.deep}) / 0.55)`;

  const isDraft = article.status === "draft";
  const sections = article.sections ?? [];
  const hasSections = sections.length > 0;
  const showInThisArticle = sections.length >= 2;
  const summaryText = article.intro ?? article.description;
  const hasSummary = Boolean(summaryText);
  const takeaways = article.keyTakeaways ?? [];
  const hasTakeaways = takeaways.length > 0;

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
        <section className="relative pt-8 sm:pt-12 md:pt-16 pb-14 md:pb-16">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[380px] md:h-[540px] -z-0"
            style={{
              background: `linear-gradient(180deg, ${tintWash} 0%, ${softWash} 55%, transparent 100%)`,
            }}
            aria-hidden
          />
          <div className={`container mx-auto px-5 sm:px-6 md:px-10 relative z-10 ${heroImage ? "max-w-6xl" : "max-w-3xl"}`}>
            <div className={heroImage ? "grid gap-10 md:gap-12 lg:gap-16 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] md:items-center" : ""}>
              <div className={heroImage ? "max-w-[36rem]" : ""}>
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
              className="font-serif text-[2rem] sm:text-[2.4rem] md:text-[2.8rem] leading-[1.06] tracking-[-0.005em]"
              style={{ color: deep }}
            >
              {article.title}
            </h1>

            {article.intro && (
              <p
                className="mt-6 font-serif italic text-[16.5px] md:text-[17.5px] leading-[1.7] max-w-[36rem]"
                style={{ color: deepSoft }}
              >
                {article.intro}
              </p>
            )}

            {/* Meta row */}
            <div
              className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 font-sans text-[12.5px] font-light"
              style={{ color: deepMuted }}
            >
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
                  <span
                    className="inline-flex items-center gap-1.5"
                    style={{ color: deep }}
                  >
                    <ShieldCheck
                      size={12}
                      strokeWidth={1.9}
                      style={{ color: accent }}
                    />
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
              {heroImage && (
                <div className="md:order-2">
                  <div
                    className="relative overflow-hidden rounded-2xl md:rounded-3xl border"
                    style={{
                      borderColor: accentBorder,
                      boxShadow: `0 40px 80px -50px hsl(var(${tokens.accent}) / 0.35), 0 20px 50px -30px rgba(60,50,40,0.25), inset 0 1px 0 hsl(0 0% 100% / 0.6)`,
                    }}
                  >
                    <img
                      src={heroImage.src}
                      alt={heroImage.alt}
                      loading="eager"
                      decoding="async"
                      className="w-full h-auto aspect-[4/5] sm:aspect-[4/3] md:aspect-[5/6] lg:aspect-[4/5] object-cover"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background: `linear-gradient(180deg, transparent 55%, hsl(var(${tokens.base}) / 0.18) 100%)`,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>


        {/* ─── AT A GLANCE + IN THIS ARTICLE ─────────────────────── */}
        {(hasSummary || showInThisArticle) && (
          <section className="pb-12 md:pb-16">
            <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
              <div
                className={`grid gap-4 md:gap-5 ${
                  hasSummary && showInThisArticle
                    ? "grid-cols-1 md:grid-cols-2"
                    : "grid-cols-1"
                }`}
              >
                {hasSummary && (
                  <div
                    className="rounded-2xl border p-6 md:p-7"
                    style={{
                      borderColor: accentBorder,
                      background: `linear-gradient(160deg, hsl(0 0% 100% / 0.9) 0%, hsl(var(${tokens.soft}) / 0.55) 100%)`,
                      boxShadow:
                        "0 14px 40px -30px rgba(60,50,40,0.22), inset 0 1px 0 hsl(0 0% 100% / 0.75)",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles
                        size={12}
                        strokeWidth={1.8}
                        style={{ color: accent }}
                        aria-hidden
                      />
                      <span
                        className="font-sans text-[10.5px] font-light tracking-[0.28em] uppercase"
                        style={{ color: accent }}
                      >
                        At a glance
                      </span>
                    </div>
                    <p
                      className="mt-4 font-sans text-[14.5px] font-light leading-[1.7]"
                      style={{ color: deepSoft }}
                    >
                      {summaryText}
                    </p>
                  </div>
                )}

                {showInThisArticle && (
                  <div
                    className="rounded-2xl border p-6 md:p-7"
                    style={{
                      borderColor: accentBorder,
                      background: `linear-gradient(160deg, hsl(0 0% 100% / 0.9) 0%, hsl(var(${tokens.base}) / 0.45) 100%)`,
                      boxShadow:
                        "0 14px 40px -30px rgba(60,50,40,0.22), inset 0 1px 0 hsl(0 0% 100% / 0.75)",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <BookOpen
                        size={12}
                        strokeWidth={1.8}
                        style={{ color: accent }}
                        aria-hidden
                      />
                      <span
                        className="font-sans text-[10.5px] font-light tracking-[0.28em] uppercase"
                        style={{ color: accent }}
                      >
                        In this article
                      </span>
                    </div>
                    <ol className="mt-4 space-y-2.5">
                      {sections.map((s, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span
                            className="font-sans text-[11px] font-light tracking-[0.14em] pt-1 shrink-0 w-6"
                            style={{ color: accent }}
                          >
                            {two(i + 1)}
                          </span>
                          <a
                            href={`#${sectionAnchorId(i)}`}
                            className="font-sans text-[13.75px] font-light leading-[1.55] hover:underline underline-offset-4 transition-colors"
                            style={{ color: deep }}
                          >
                            {s.heading}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ─── KEY TAKEAWAYS ─────────────────────────────────────── */}
        {hasTakeaways && (
          <section className="pb-14 md:pb-16">
            <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
              <div className="mb-6 md:mb-8 flex flex-col gap-3">
                <SectionLabel>Key takeaways</SectionLabel>
                <h2
                  className="font-serif text-[1.5rem] md:text-[1.75rem] leading-tight"
                  style={{ color: deep }}
                >
                  The essentials, at a glance
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 md:gap-4">
                {takeaways.map((t, i) => (
                  <div
                    key={i}
                    className="rounded-xl border p-5 flex items-start gap-3.5"
                    style={{
                      borderColor: accentBorder,
                      background: `linear-gradient(150deg, hsl(0 0% 100% / 0.9) 0%, hsl(var(${tokens.soft}) / 0.55) 100%)`,
                      boxShadow:
                        "0 10px 28px -22px rgba(60,50,40,0.2), inset 0 1px 0 hsl(0 0% 100% / 0.7)",
                    }}
                  >
                    <span
                      className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                      style={{
                        background: accentSoft,
                        border: `1px solid ${accentBorder}`,
                      }}
                      aria-hidden
                    >
                      <Sparkles
                        size={11}
                        strokeWidth={1.9}
                        style={{ color: accent }}
                      />
                    </span>
                    <span
                      className="font-sans text-[14.25px] font-light leading-[1.65]"
                      style={{ color: deepSoft }}
                    >
                      {t}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── BODY ──────────────────────────────────────────────── */}
        <section className="pb-16 md:pb-20">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
            {hasSections ? (
              <div className="space-y-14 md:space-y-16">
                {sections.map((s, i) => {
                  const img = bodyImages?.find((b) => b.afterSectionIndex === i);
                  return (
                    <div key={i} className="space-y-14 md:space-y-16">
                      <article id={sectionAnchorId(i)} className="scroll-mt-24">
                        <div className="flex items-center gap-3 mb-3">
                          <span
                            className="font-sans text-[11px] font-light tracking-[0.28em]"
                            style={{ color: accent }}
                          >
                            {two(i + 1)}
                          </span>
                          <span
                            className="h-px flex-1 max-w-[64px]"
                            style={{ background: accentMid }}
                            aria-hidden
                          />
                        </div>
                        <h2
                          className="font-serif text-[1.6rem] md:text-[1.9rem] leading-[1.15] tracking-[-0.005em]"
                          style={{ color: deep }}
                        >
                          {s.heading}
                        </h2>
                        <div className="mt-5 space-y-5">
                          {s.body.map((p, j) => (
                            <p
                              key={j}
                              className="font-sans text-[15.75px] font-light leading-[1.8]"
                              style={{ color: deepSoft }}
                            >
                              {p}
                            </p>
                          ))}
                        </div>
                      </article>
                      {img && (
                        <figure className="md:-mx-16 lg:-mx-24 my-2">
                          <div
                            className="relative overflow-hidden rounded-2xl md:rounded-3xl border"
                            style={{
                              borderColor: accentBorder,
                              boxShadow: `0 30px 70px -45px hsl(var(${tokens.accent}) / 0.3), 0 18px 40px -28px rgba(60,50,40,0.22), inset 0 1px 0 hsl(0 0% 100% / 0.6)`,
                            }}
                          >
                            <img
                              src={img.src}
                              alt={img.alt}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-auto aspect-[4/3] md:aspect-[16/10] object-cover"
                            />
                          </div>
                          {img.caption && (
                            <figcaption
                              className="mt-4 text-center font-serif italic text-[14px] md:text-[14.5px] leading-[1.6]"
                              style={{ color: deepMuted }}
                            >
                              {img.caption}
                            </figcaption>
                          )}
                        </figure>
                      )}
                    </div>
                  );
                })}

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
                className="mt-14 rounded-2xl border px-6 py-5 flex items-start gap-3"
                style={{
                  borderColor: accentBorder,
                  backgroundColor: accentSofter,
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
                <SectionLabel>Continue reading</SectionLabel>
                <h2
                  className="font-serif text-[1.6rem] md:text-[1.9rem] leading-tight"
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
        <section className="pb-24 md:pb-32 pt-14 md:pt-16">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-2xl">
            <div
              className="relative rounded-[24px] border px-7 py-10 md:px-10 md:py-12 text-center"
              style={{
                borderColor: accentBorderStrong,
                background: `linear-gradient(170deg, hsl(var(--parchment)) 0%, hsl(var(${tokens.base}) / 0.5) 100%)`,
                boxShadow:
                  "0 24px 56px -36px rgba(60,50,40,0.3), inset 0 1px 0 hsl(0 0% 100% / 0.72)",
              }}
            >
              <SectionLabel>{hubLabel}</SectionLabel>
              <p
                className="mt-4 font-serif italic text-[15.5px] mb-7 max-w-md mx-auto leading-relaxed"
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
                <ArrowLeft
                  size={14}
                  strokeWidth={1.8}
                  style={{ color: accent }}
                />
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
