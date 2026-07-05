import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Check, ShieldCheck, ChevronRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HubAISupport from "@/components/shared/HubAISupport";
import {
  FirstYearTopicConfig,
  FirstYearTopicSlug,
  FIRST_YEAR_TOPIC_INDEX,
  firstYearTopicConfigs,
  FirstYearFeaturedItem,
} from "@/data/firstYearTopicData";

// First Year topic pages are photo-led and calm. No botanical sprigs or
// pregnancy-style decorative motifs — quietness comes from soft tints,
// gentle borders and restrained spacing.

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
// Until per-article URLs exist, every guidance card resolves to the AI search
// pre-seeded with the article title. The data layer can swap `href` for a real
// article URL later without any template changes.
const guidanceHref = (item: FirstYearFeaturedItem, side: "baby" | "recovery") =>
  item.href ?? `/ask?q=${encodeURIComponent(item.title)}&stage=${side === "recovery" ? "recovery" : "first-year"}`;

const TAG_LABEL: Record<NonNullable<FirstYearFeaturedItem["tag"]>, string> = {
  "start-here": "Start here",
  "common": "Common worry",
  "when-to-get-help": "When to get help",
};

const FirstYearTopicPage = ({ config }: Props) => {
  const theme = THEMES[config.side];
  // Recovery side reads as muted stone-mauve, never IVF purple. Quieter
  // opacity scale so the deeper recovery accent stays a fine detail, not a
  // dominant block.
  const isRecovery = config.side === "recovery";
  const accent = `hsl(var(${theme.accentToken}))`;
  const accentSoft = `hsl(var(${theme.accentToken}) / ${isRecovery ? 0.07 : 0.10})`;
  const accentMid = `hsl(var(${theme.accentToken}) / ${isRecovery ? 0.16 : 0.22})`;
  const accentBorder = `hsl(var(${theme.accentToken}) / ${isRecovery ? 0.12 : 0.16})`;
  const tintWash = `hsl(var(${theme.softToken}) / ${isRecovery ? 0.32 : 0.55})`;
  const photoTintOpacity = isRecovery ? 0.04 : 0.07;
  const endcapBgOpacity = isRecovery ? 0.22 : 0.4;
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

  // ─── Editorial atoms ──────────────────────────────────────────────────
  // Calm section label: short hairline + small uppercase text. No flanking
  // rules, no SVG flourishes — quiet First Year rhythm.
  const SectionLabel = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-center gap-3">
      <span className="h-px w-8" style={{ background: accentMid }} />
      <span
        className="font-sans text-[11px] font-light tracking-[0.28em] uppercase"
        style={{ color: accent }}
      >
        {children}
      </span>
    </div>
  );

  // Quiet horizontal rule used under section titles in place of any leaf /
  // sprig divider. Single hairline, no decoration.
  const QuietRule = () => (
    <span
      className="block h-px w-10 my-5"
      style={{ background: accentMid }}
      aria-hidden
    />
  );

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

  // Hero crop tuned per topic so faces / babies stay comfortably inside the
  // frame at every breakpoint. Falls back to a safe upper-centre default.
  const heroObjectPosition = config.heroObjectPosition ?? "center 30%";

  return (
    <div className="min-h-screen font-sans bg-parchment">
      <Navbar />
      <main className="overflow-hidden">
        {/* ─── 1. HERO ───────────────────────────────────────────────── */}
        <section className="relative pt-10 sm:pt-14 md:pt-20 pb-16 md:pb-28">
          {/* Soft tinted top wash in the side's colour family. */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-40 md:h-72 -z-0"
            style={{
              background: `linear-gradient(180deg, ${tintWash} 0%, transparent 100%)`,
            }}
            aria-hidden
          />
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center">
              {/* Copy */}
              <div className="md:col-span-6 lg:col-span-6 order-2 md:order-1">
                <p
                  className="font-sans text-[11px] font-light tracking-[0.22em] uppercase"
                  style={{ color: accent }}
                >
                  First Year · {config.eyebrow}
                </p>
                <h1 className="mt-5 font-serif text-[2.05rem] sm:text-[2.55rem] md:text-[2.9rem] lg:text-[3.3rem] text-foreground leading-[1.06]">
                  {config.title}
                </h1>
                <p className="mt-6 font-sans text-[15px] md:text-[15.5px] font-light text-muted-foreground leading-relaxed max-w-md">
                  {config.intro}
                </p>
                {config.medicallyReviewed && (
                  <div className="mt-6">
                    <MedicallyReviewed />
                  </div>
                )}
              </div>

              {/* Photo with soft tinted halo — no decorative motifs.
                  Responsive aspect: taller on mobile so face/upper body
                  stays in frame; slightly wider on desktop/tablet for
                  editorial breathing room. Width is capped so the photo
                  never balloons on wide screens. */}
              <div className="md:col-span-6 lg:col-span-6 order-1 md:order-2 relative">
                <div className="relative mx-auto max-w-[380px] sm:max-w-[440px] md:max-w-[460px] lg:max-w-[520px]">
                  <div
                    className="absolute inset-0 -m-6 rounded-full opacity-60 blur-3xl"
                    style={{
                      background: `radial-gradient(circle at 50% 45%, hsl(var(${theme.softToken}) / 0.7) 0%, transparent 65%)`,
                    }}
                    aria-hidden
                  />
                  <div className="relative aspect-[4/5] md:aspect-[5/6] w-full overflow-hidden rounded-[2rem] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.28)]">
                    <img
                      src={config.heroImage}
                      alt=""
                      aria-hidden="true"
                      loading="eager"
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ objectPosition: heroObjectPosition }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. WHAT THIS TOPIC COVERS ─────────────────────────────── */}
        {/* Softly lifted card sitting just under the hero, premium rhythm. */}
        <section className="relative -mt-8 md:-mt-20 pb-16 md:pb-24">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl relative z-10">
            <div
              className="relative bg-card rounded-[2rem] border shadow-[0_30px_80px_-40px_rgba(20,30,60,0.22)] p-6 sm:p-10 md:p-12 overflow-hidden"
              style={{ borderColor: accentBorder }}
            >
              {/* Inner highlight */}
              <div
                className="absolute inset-x-0 top-0 h-px pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(to right, transparent, hsl(0 0% 100% / 0.7), transparent)' }}
                aria-hidden
              />
              {/* Side-tinted corner bloom */}
              <div
                className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-55 pointer-events-none"
                style={{ backgroundColor: `hsl(var(${theme.softToken}) / 0.55)` }}
                aria-hidden
              />
              <div className="relative md:max-w-3xl">
                <h2 className="font-serif text-2xl md:text-[1.8rem] text-foreground leading-tight">
                  What this topic covers
                </h2>
                <QuietRule />
                <p className="font-serif italic text-[14.5px] text-muted-foreground/85 mb-7 max-w-2xl">
                  {config.whatThisCovers.lead}
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                  {config.whatThisCovers.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="mt-1 shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: accentSoft }}
                      >
                        <Check size={11} style={{ color: accent }} strokeWidth={2.5} />
                      </span>
                      <span className="font-sans text-[14.5px] font-light text-foreground/80 leading-relaxed">
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. GUIDANCE ───────────────────────────────────────────── */}
        {/* Designed as a real editorial article cluster, even while cards
            temporarily resolve to /ask?q=… behind the scenes. */}
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
            <div className="mb-9 md:mb-12 flex flex-col items-start gap-4">
              <SectionLabel>Guidance</SectionLabel>
              <h2 className="font-serif text-2xl md:text-[1.85rem] text-foreground leading-tight max-w-2xl">
                Where parents tend to start
              </h2>
              <p className="font-serif italic text-[14.5px] text-muted-foreground/85 max-w-2xl">
                {config.guidanceLead}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
              {config.featured.map((item) => (
                <Link
                  key={item.title}
                  to={guidanceHref(item, config.side)}
                  className="group block bg-card rounded-2xl overflow-hidden border transition-all hover:-translate-y-1 hover:shadow-[0_24px_60px_-32px_rgba(0,0,0,0.28)]"
                  style={{ borderColor: accentBorder }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={item.image}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      style={{ objectPosition: "center 35%" }}
                    />
                    {/* Subtle topic tint — harmonises mixed photography */}
                    <div
                      className="absolute inset-0 mix-blend-multiply pointer-events-none"
                      style={{ backgroundColor: accent, opacity: photoTintOpacity }}
                      aria-hidden
                    />
                    {item.tag && (
                      <span
                        className="absolute top-3 left-3 font-sans text-[10.5px] tracking-[0.18em] uppercase font-light px-2.5 py-1 rounded-full backdrop-blur-sm"
                        style={{
                          color: deep,
                          backgroundColor: `hsl(var(${theme.softToken}) / 0.92)`,
                        }}
                      >
                        {TAG_LABEL[item.tag]}
                      </span>
                    )}
                  </div>
                  <div className="p-5 sm:p-6">
                    <h3 className="font-serif text-[1.1rem] sm:text-[1.18rem] text-foreground leading-snug mb-2.5">
                      {item.title}
                    </h3>
                    <p className="font-sans text-[13.5px] font-light text-muted-foreground leading-relaxed mb-4">
                      {item.why}
                    </p>
                    <span
                      className="inline-flex items-center gap-1.5 font-sans text-[12.5px] font-medium tracking-wide"
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
          stage={config.side === "recovery" ? "recovery" : "first-year"}
        />

        {/* ─── 5. RELATED TOPICS ─────────────────────────────────────── */}
        <section className="py-16 md:py-24 bg-parchment">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
            {/* Same side */}
            <div className="mb-14">
              <div className="mb-6">
                <SectionLabel>{ownSideLabel}</SectionLabel>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {sameSide.map((r) => (
                  <Link
                    key={r.slug}
                    to={slugToPath(r.slug)}
                    className="group flex items-center justify-between gap-4 bg-card rounded-2xl border px-5 py-4 transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-30px_rgba(0,0,0,0.25)]"
                    style={{ borderColor: accentBorder }}
                  >
                    <span className="font-serif text-[1rem] text-foreground leading-snug">
                      {r.title}
                    </span>
                    <ChevronRight
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
              <div className="mb-6">
                <div className="flex items-center gap-3">
                  <span
                    className="h-px w-8"
                    style={{ background: `hsl(var(${otherAccentToken}) / 0.22)` }}
                  />
                  <span
                    className="font-sans text-[11px] font-light tracking-[0.28em] uppercase"
                    style={{ color: `hsl(var(${otherAccentToken}))` }}
                  >
                    From the other side
                  </span>
                  <span
                    className="h-px w-8"
                    style={{ background: `hsl(var(${otherAccentToken}) / 0.22)` }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                {crossSide.map((r) => {
                  const crossBorder = `hsl(var(${otherAccentToken}) / 0.16)`;
                  const crossAccent = `hsl(var(${otherAccentToken}))`;
                  return (
                    <Link
                      key={r.slug}
                      to={slugToPath(r.slug)}
                      className="group flex items-center justify-between gap-4 bg-card rounded-2xl border px-5 py-4 transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-30px_rgba(0,0,0,0.25)]"
                      style={{ borderColor: crossBorder }}
                    >
                      <span className="font-serif text-[1rem] text-foreground leading-snug">
                        {r.title}
                      </span>
                      <ChevronRight
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
        {/* Calm tonal wash — no sprigs, no decoration. Recovery side uses
            a quieter opacity so the page doesn't end on a heavy block. */}
        <section
          className="py-16 md:py-24 relative overflow-hidden"
          style={{ backgroundColor: `hsl(var(${theme.softToken}) / ${endcapBgOpacity})` }}
        >
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl text-center relative z-10">
            <p className="font-serif italic text-[16px] md:text-[1.15rem] text-foreground/80 leading-relaxed mb-7 max-w-xl mx-auto">
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
