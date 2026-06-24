import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Check, ShieldCheck } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HubAISupport from "@/components/shared/HubAISupport";
import {
  FirstYearTopicConfig,
  FirstYearTopicSlug,
  FIRST_YEAR_TOPIC_INDEX,
  firstYearTopicConfigs,
} from "@/data/firstYearTopicData";

interface Props {
  config: FirstYearTopicConfig;
}

// ─── Per-side theme ──────────────────────────────────────────────────────
// Baby pages express the soft First Year family; Recovery pages express the
// muted mauve-plum Recovery family. Same template, two felt-different sides
// of one ecosystem. Tokens come from src/index.css — no hardcoded colours.
type SideTheme = {
  softToken: string;
  accentToken: string;
  deepToken: string;
  aiBg: string;
  aiAccent: string;
};

const THEMES: Record<"baby" | "recovery", SideTheme> = {
  baby: {
    softToken: "--stage-firstyear-soft",
    accentToken: "--stage-firstyear-accent",
    deepToken: "--stage-firstyear-deep",
    aiBg: "--stage-firstyear",
    aiAccent: "--stage-firstyear-accent",
  },
  recovery: {
    softToken: "--stage-recovery-soft",
    accentToken: "--stage-recovery-accent",
    deepToken: "--stage-recovery-deep",
    aiBg: "--stage-recovery",
    aiAccent: "--stage-recovery-accent",
  },
};

const slugToPath = (s: FirstYearTopicSlug) => `/first-year/${s}`;
const askHref = (title: string) => `/ask?q=${encodeURIComponent(title)}`;

const FirstYearTopicPage = ({ config }: Props) => {
  const theme = THEMES[config.side];
  const accent = `hsl(var(${theme.accentToken}))`;
  const accentSoft = `hsl(var(${theme.accentToken}) / 0.10)`;
  const accentBorder = `hsl(var(${theme.accentToken}) / 0.16)`;
  const tintWash = `hsl(var(${theme.softToken}) / 0.55)`;
  const deep = `hsl(var(${theme.deepToken}))`;

  const sameSide = config.related.sameSide.map((s) => ({
    slug: s,
    ...FIRST_YEAR_TOPIC_INDEX[s],
  }));
  const crossSide = config.related.crossSide.map((s) => ({
    slug: s,
    ...FIRST_YEAR_TOPIC_INDEX[s],
  }));

  const ownSideLabel =
    config.side === "baby"
      ? "More in baby's first year"
      : "More in postpartum recovery";
  const crossSideHubAnchor =
    config.side === "baby" ? "/first-year#recovery-topics" : "/first-year#baby-topics";

  const otherAccentToken =
    config.side === "baby" ? "--stage-recovery-accent" : "--stage-firstyear-accent";
  const otherDeepToken =
    config.side === "baby" ? "--stage-recovery-deep" : "--stage-firstyear-deep";

  const MedicallyReviewed = () => (
    <div
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11.5px] font-light"
      style={{
        borderColor: accentBorder,
        backgroundColor: accentSoft,
        color: deep,
      }}
    >
      <ShieldCheck size={13} strokeWidth={1.8} />
      Medically reviewed by Jenny Joines
    </div>
  );

  return (
    <div className="min-h-screen font-sans bg-parchment">
      <Navbar />
      <main className="overflow-hidden">
        {/* ─── 1. HERO ───────────────────────────────────────────────── */}
        <section className="relative pt-10 sm:pt-14 md:pt-20 pb-16 md:pb-24">
          {/* Soft tinted top wash in the side's colour family. */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-40 md:h-64 -z-0"
            style={{
              background: `linear-gradient(180deg, ${tintWash} 0%, transparent 100%)`,
            }}
            aria-hidden
          />
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-14 items-center">
              {/* Copy */}
              <div className="md:col-span-7 lg:col-span-7 order-2 md:order-1">
                <p
                  className="font-sans text-[11px] font-light tracking-[0.22em] uppercase"
                  style={{ color: accent }}
                >
                  First Year · {config.eyebrow}
                </p>
                <h1 className="mt-5 font-serif text-[2rem] sm:text-[2.4rem] md:text-[2.7rem] lg:text-[3.1rem] text-foreground leading-[1.08]">
                  {config.title}
                </h1>
                <p className="mt-5 font-sans text-[15px] md:text-base font-light text-muted-foreground leading-relaxed max-w-xl">
                  {config.intro}
                </p>
                {config.medicallyReviewed && (
                  <div className="mt-6">
                    <MedicallyReviewed />
                  </div>
                )}
              </div>

              {/* Photo with tinted halo */}
              <div className="md:col-span-5 lg:col-span-5 order-1 md:order-2 relative">
                <div className="relative mx-auto max-w-[360px] sm:max-w-[420px] md:max-w-none">
                  <div
                    className="absolute inset-0 -m-6 rounded-full opacity-70 blur-3xl"
                    style={{
                      background: `radial-gradient(circle at 50% 45%, hsl(var(${theme.softToken}) / 0.85) 0%, transparent 65%)`,
                    }}
                    aria-hidden
                  />
                  <img
                    src={config.heroImage}
                    alt=""
                    aria-hidden="true"
                    loading="eager"
                    className="relative w-full h-auto rounded-[2rem] object-cover shadow-[0_30px_80px_-40px_rgba(0,0,0,0.28)]"
                    style={{ aspectRatio: "4 / 5" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. WHAT THIS TOPIC COVERS ─────────────────────────────── */}
        {/* Softly lifted card sitting just under the hero, premium rhythm. */}
        <section className="relative -mt-8 md:-mt-16 pb-16 md:pb-24">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl relative z-10">
            <div
              className="relative bg-card rounded-[2rem] border shadow-[0_30px_80px_-40px_rgba(0,0,0,0.18)] p-6 sm:p-10 md:p-12"
              style={{ borderColor: accentBorder }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="w-1.5 h-6 rounded-full"
                  style={{ backgroundColor: accent }}
                />
                <h2 className="font-serif text-2xl md:text-[1.7rem] text-foreground leading-tight">
                  What this topic covers
                </h2>
              </div>
              <p className="font-serif italic text-[14.5px] text-muted-foreground/85 mb-6 max-w-2xl">
                {config.whatThisCovers.lead}
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                {config.whatThisCovers.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="mt-1 shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: accentSoft }}
                    >
                      <Check
                        size={11}
                        style={{ color: accent }}
                        strokeWidth={2.5}
                      />
                    </span>
                    <span className="font-sans text-[14.5px] font-light text-foreground/80 leading-relaxed">
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ─── 3. FEATURED GUIDANCE ──────────────────────────────────── */}
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
            <div className="mb-8 md:mb-10">
              <p
                className="font-sans text-[11px] font-light tracking-[0.22em] uppercase mb-2"
                style={{ color: accent }}
              >
                Featured guidance
              </p>
              <h2 className="font-serif text-2xl md:text-[1.7rem] text-foreground leading-tight">
                Where parents tend to start
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
              {config.featured.map((item) => (
                <Link
                  key={item.title}
                  to={askHref(item.title)}
                  className="group block bg-card rounded-2xl overflow-hidden border transition-all hover:-translate-y-1 hover:shadow-[0_20px_50px_-30px_rgba(0,0,0,0.25)]"
                  style={{ borderColor: accentBorder }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={item.image}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        background: `linear-gradient(180deg, transparent 55%, hsl(var(${theme.deepToken}) / 0.35) 100%)`,
                      }}
                    />
                  </div>
                  <div className="p-5 sm:p-6">
                    <h3 className="font-serif text-[1.05rem] sm:text-[1.1rem] text-foreground leading-snug mb-2">
                      {item.title}
                    </h3>
                    <p className="font-sans text-[13px] font-light text-muted-foreground leading-relaxed mb-4">
                      {item.why}
                    </p>
                    <span
                      className="inline-flex items-center gap-1.5 font-sans text-[12px] font-light tracking-wide"
                      style={{ color: accent }}
                    >
                      Read guidance
                      <ArrowRight
                        size={13}
                        strokeWidth={1.8}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 4. AI SUPPORT ─────────────────────────────────────────── */}
        <HubAISupport
          heading={
            config.side === "baby"
              ? "Ask about your baby, any time"
              : "Ask about your recovery, any time"
          }
          description={
            config.side === "baby"
              ? `If something about ${config.title.toLowerCase()} feels unclear, you can ask and get calm, stage-aware guidance.`
              : `If something about ${config.title.toLowerCase()} feels uncertain, you can ask and get gentle, honest guidance.`
          }
          suggestions={config.aiPrompts}
          context={config.title}
          stageBg={theme.aiBg}
          stageAccent={theme.aiAccent}
        />

        {/* ─── 5. RELATED TOPICS ─────────────────────────────────────── */}
        <section className="py-16 md:py-20 bg-parchment">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
            {/* Same side */}
            <div className="mb-12">
              <p
                className="font-sans text-[11px] font-light tracking-[0.22em] uppercase mb-5"
                style={{ color: accent }}
              >
                {ownSideLabel}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {sameSide.map((r) => (
                  <Link
                    key={r.slug}
                    to={slugToPath(r.slug)}
                    className="group flex items-center justify-between gap-4 bg-card rounded-2xl border px-5 py-4 transition-colors hover:bg-card/80"
                    style={{ borderColor: accentBorder }}
                  >
                    <span className="font-serif text-[1rem] text-foreground leading-snug">
                      {r.title}
                    </span>
                    <ArrowRight
                      size={15}
                      strokeWidth={1.8}
                      style={{ color: accent }}
                      className="shrink-0 transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                ))}
              </div>
            </div>

            {/* Cross side — uses the other side's accent so pairing is visible. */}
            <div>
              <p
                className="font-sans text-[11px] font-light tracking-[0.22em] uppercase mb-5"
                style={{ color: `hsl(var(${otherAccentToken}))` }}
              >
                From the other side
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                {crossSide.map((r) => {
                  const crossBorder = `hsl(var(${otherAccentToken}) / 0.16)`;
                  const crossAccent = `hsl(var(${otherAccentToken}))`;
                  return (
                    <Link
                      key={r.slug}
                      to={slugToPath(r.slug)}
                      className="group flex items-center justify-between gap-4 bg-card rounded-2xl border px-5 py-4 transition-colors hover:bg-card/80"
                      style={{ borderColor: crossBorder }}
                    >
                      <span className="font-serif text-[1rem] text-foreground leading-snug">
                        {r.title}
                      </span>
                      <ArrowRight
                        size={15}
                        strokeWidth={1.8}
                        style={{ color: crossAccent }}
                        className="shrink-0 transition-transform group-hover:translate-x-0.5"
                      />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ─── 6. GENTLE ENDCAP ──────────────────────────────────────── */}
        <section
          className="py-14 md:py-20"
          style={{ backgroundColor: `hsl(var(${theme.softToken}) / 0.35)` }}
        >
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl text-center">
            <p className="font-serif italic text-[15px] md:text-base text-foreground/80 leading-relaxed mb-7 max-w-xl mx-auto">
              {config.side === "baby"
                ? "You don't have to read it all today. Take what's useful, leave the rest for when you need it."
                : "Your recovery has its own pace. Come back to anything here when it feels right."}
            </p>
            {config.medicallyReviewed && (
              <div className="mb-7">
                <MedicallyReviewed />
              </div>
            )}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5">
              <Link
                to="/first-year"
                className="group inline-flex items-center gap-2 font-sans text-[13px] font-light tracking-wide px-5 py-2.5 rounded-full border bg-card"
                style={{ borderColor: accentBorder, color: deep }}
              >
                <ArrowLeft
                  size={14}
                  strokeWidth={1.8}
                  className="transition-transform group-hover:-translate-x-0.5"
                />
                Back to First Year
              </Link>
              <Link
                to={crossSideHubAnchor}
                className="group inline-flex items-center gap-2 font-sans text-[13px] font-light tracking-wide px-5 py-2.5 rounded-full border bg-card"
                style={{
                  borderColor: `hsl(var(${otherAccentToken}) / 0.18)`,
                  color: `hsl(var(${otherDeepToken}))`,
                }}
              >
                {config.side === "baby" ? "See recovery topics" : "See baby topics"}
                <ArrowRight
                  size={14}
                  strokeWidth={1.8}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

// Convenience: thin wrapper used by route pages.
export const renderFirstYearTopic = (slug: FirstYearTopicSlug) => (
  <FirstYearTopicPage config={firstYearTopicConfigs[slug]} />
);

export default FirstYearTopicPage;
