import { Link } from "react-router-dom";
import { ChevronRight, ArrowRight, Check, Heart, Apple, ShieldCheck, Baby, ShoppingBag, type LucideIcon } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  PregnancyTopicPageConfig,
  PREGNANCY_TOPICS,
  LIVE_TOPIC_SLUGS,
  PregnancyTopicSlug,
} from "@/data/pregnancyTopicData";

// Hero & decorative
import topicBodyHero from "@/assets/topic-body-hero.jpg";
import topicBabyHero from "@/assets/topic-baby-hero.jpg";
import topicFeelingsHero from "@/assets/topic-feelings-hero.jpg";
import topicHealthHero from "@/assets/topic-health-hero.jpg";
import topicDietHero from "@/assets/topic-diet-hero.jpg";
import topicPreparingHero from "@/assets/topic-preparing-hero.jpg";
import floralAccent from "@/assets/topic-floral-accent.png";
import miniSprig from "@/assets/topic-mini-sprig.png";
import wildflowerSprig from "@/assets/topic-wildflower-sprig.png";

// Article thumbnails — reuse existing curated photography
import imgEarlySymptoms from "@/assets/article-hero-early-symptoms.jpg";
import imgNausea from "@/assets/article-hero-nausea.jpg";
import imgFatigue from "@/assets/article-hero-fatigue.jpg";
import imgImplantation from "@/assets/article-hero-implantation-bleeding.jpg";
import imgSymptomsStop from "@/assets/article-hero-symptoms-stopping.jpg";
import imgSleep from "@/assets/article-hero-second-sleep.jpg";
import imgBodyShifts from "@/assets/article-hero-second-body.jpg";
import imgFirstTri from "@/assets/trimester-first.jpg";
import imgSecondTri from "@/assets/trimester-second.jpg";
import imgThirdTri from "@/assets/trimester-third.jpg";
import imgSignsLabour from "@/assets/article-hero-third-signs-of-labour.jpg";
import imgPregnancyJourney from "@/assets/pregnancy-journey.jpg";
import imgPregnancyBump from "@/assets/pregnancy-bump.jpg";
import imgEmotionalFirstTri from "@/assets/article-hero-emotional-first-tri.jpg";
import imgSecondAnxiety from "@/assets/article-hero-second-anxiety.jpg";
import imgThirdEmotional from "@/assets/article-hero-third-emotional.jpg";
import imgTestsScans from "@/assets/article-hero-tests-scans.jpg";
import imgAnatomyScan from "@/assets/article-hero-second-anatomy-scan.jpg";
import imgLifestyle from "@/assets/article-hero-lifestyle.jpg";
import imgSecondEating from "@/assets/article-hero-second-eating.jpg";
import imgFoodAversions from "@/assets/article-hero-food-aversions.jpg";
import imgMovementExercise from "@/assets/article-hero-second-movement-exercise.jpg";
import imgSecondMovement from "@/assets/article-hero-second-movement.jpg";
import imgThirdMovement from "@/assets/article-hero-third-movement.jpg";
import imgHospitalBag from "@/assets/article-hero-third-hospital-bag.jpg";
import imgNursery from "@/assets/article-hero-third-nursery.jpg";
import imgThirdSleep from "@/assets/article-hero-third-sleep.jpg";
import imgBooties from "@/assets/pregnancy-hero-booties.jpg";

interface Props {
  config: PregnancyTopicPageConfig;
}

// ─── Per-topic theme system ──────────────────────────────────────────────
// Each topic shares the same premium template but expresses its own colour,
// botanical motif, and hero. Differences are subtle — same family, distinct
// character.
type TopicTheme = {
  /** Accent colour as raw HSL (without `hsl(...)`). */
  accentHsl: string;
  /** A soft tint colour for washes (raw HSL). */
  tintHsl: string;
  /** Hero image for this topic. */
  hero: string;
  /** Three sprigs used across hero, what-this-covers, and group headers. */
  sprigA: string;
  sprigB: string;
  sprigC: string;
  /** Sibling-row icon. */
  icon: LucideIcon;
};

const TOPIC_THEMES: Record<PregnancyTopicSlug, TopicTheme> = {
  body: {
    accentHsl: "16 38% 52%",       // warm terracotta / blush
    tintHsl:   "20 45% 88%",
    hero: topicBodyHero,
    sprigA: floralAccent,
    sprigB: miniSprig,
    sprigC: wildflowerSprig,
    icon: Heart,
  },
  baby: {
    accentHsl: "140 22% 42%",      // sage / soft green
    tintHsl:   "130 28% 88%",
    hero: topicBabyHero,
    sprigA: miniSprig,
    sprigB: miniSprig,
    sprigC: wildflowerSprig,
    icon: Baby,
  },
  feelings: {
    accentHsl: "342 32% 56%",      // muted rose / mauve
    tintHsl:   "345 40% 90%",
    hero: topicFeelingsHero,
    sprigA: floralAccent,
    sprigB: wildflowerSprig,
    sprigC: floralAccent,
    icon: Heart,
  },
  "health-and-safety": {
    accentHsl: "200 22% 44%",      // soft slate-sage
    tintHsl:   "195 28% 88%",
    hero: topicHealthHero,
    sprigA: miniSprig,
    sprigB: miniSprig,
    sprigC: miniSprig,
    icon: ShieldCheck,
  },
  "diet-and-exercise": {
    accentHsl: "120 28% 38%",      // fresh green
    tintHsl:   "115 35% 88%",
    hero: topicDietHero,
    sprigA: miniSprig,
    sprigB: wildflowerSprig,
    sprigC: miniSprig,
    icon: Apple,
  },
  "preparing-for-baby": {
    accentHsl: "26 48% 48%",       // warm amber / terracotta
    tintHsl:   "30 50% 88%",
    hero: topicPreparingHero,
    sprigA: wildflowerSprig,
    sprigB: floralAccent,
    sprigC: wildflowerSprig,
    icon: ShoppingBag,
  },
};

// ─── Image resolver ──────────────────────────────────────────────────────
// Map article hrefs to existing curated thumbnails. Falls back gracefully.
const HREF_IMAGE_MAP: Record<string, string> = {
  // Body
  "/articles/early-pregnancy-symptoms-explained": imgEarlySymptoms,
  "/articles/complete-guide-morning-sickness": imgNausea,
  "/articles/nausea-in-early-pregnancy": imgNausea,
  "/articles/fatigue-in-early-pregnancy": imgFatigue,
  "/articles/implantation-bleeding": imgImplantation,
  "/articles/symptoms-stopping-early-pregnancy": imgSymptomsStop,
  "/articles/sleep-in-pregnancy": imgSleep,
  "/articles/first-trimester-complete-guide": imgFirstTri,
  "/articles/second-trimester-complete-guide": imgSecondTri,
  "/articles/third-trimester-complete-guide": imgThirdTri,
  "/articles/signs-of-labour": imgSignsLabour,
  "/articles/stages-of-labour": imgSignsLabour,
  "/articles/when-to-go-in-for-labour": imgSignsLabour,
  // Baby
  "/articles/how-your-baby-develops-in-pregnancy": imgPregnancyJourney,
  "/articles/baby-movement-in-pregnancy": imgSecondMovement,
  "/articles/twins-and-multiples-in-pregnancy": imgPregnancyBump,
  // Feelings
  "/articles/emotional-wellbeing-pregnancy": imgEmotionalFirstTri,
  "/articles/anxiety-in-pregnancy": imgSecondAnxiety,
  "/articles/the-first-trimester-emotionally": imgEmotionalFirstTri,
  "/articles/when-the-joy-doesnt-arrive-yet": imgThirdEmotional,
  "/articles/preparing-emotionally-for-birth": imgThirdEmotional,
  "/articles/pregnancy-after-loss": imgEmotionalFirstTri,
  // Health & safety
  "/articles/tests-and-scans-in-pregnancy": imgTestsScans,
  "/articles/vaccinations-in-pregnancy": imgLifestyle,
  "/articles/medicines-in-pregnancy": imgLifestyle,
  "/articles/foods-to-avoid-in-pregnancy": imgSecondEating,
  "/articles/weight-changes-in-pregnancy": imgBodyShifts,
  // Diet & exercise
  "/articles/eating-well-in-pregnancy": imgSecondEating,
  "/articles/key-nutrients-in-pregnancy": imgSecondEating,
  "/articles/moving-your-body-in-pregnancy": imgMovementExercise,
  "/articles/when-you-cant-face-food-in-pregnancy": imgFoodAversions,
  // Preparing
  "/preparing-for-baby": imgBooties,
  "/articles/writing-a-birth-plan": imgHospitalBag,
  "/articles/hospital-bag-and-what-to-pack": imgHospitalBag,
  "/articles/the-space-your-baby-will-come-home-to": imgNursery,
};

const TOPIC_FALLBACK: Record<PregnancyTopicSlug, string> = {
  body: imgBodyShifts,
  baby: imgPregnancyJourney,
  feelings: imgEmotionalFirstTri,
  "health-and-safety": imgTestsScans,
  "diet-and-exercise": imgSecondEating,
  "preparing-for-baby": imgBooties,
};

// ─── Page ────────────────────────────────────────────────────────────────
const PregnancyTopicPage = ({ config }: Props) => {
  const theme = TOPIC_THEMES[config.slug];
  const accent = `hsl(${theme.accentHsl})`;
  const accentSoft = `hsl(${theme.accentHsl} / 0.10)`;
  const accentMid = `hsl(${theme.accentHsl} / 0.20)`;
  const accentBorder = `hsl(${theme.accentHsl} / 0.16)`;
  const tintWash = `hsl(${theme.tintHsl} / 0.45)`;

  const heroImg = config.heroImage || theme.hero;
  const fallbackThumb = TOPIC_FALLBACK[config.slug];
  const resolveImage = (href: string, explicit?: string) =>
    explicit || HREF_IMAGE_MAP[href] || fallbackThumb;

  const siblings = PREGNANCY_TOPICS.filter((t) => t.slug !== config.slug);
  const groupSprigs = [theme.sprigA, theme.sprigB, theme.sprigC, theme.sprigA];

  // ─── Small UI atoms (closure over theme) ──────────────────────────────
  const Eyebrow = ({ children }: { children: React.ReactNode }) => (
    <p
      className="font-sans text-[11px] font-light tracking-[0.22em] uppercase"
      style={{ color: accent }}
    >
      {children}
    </p>
  );

  const SectionLabel = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-center justify-center gap-3">
      <span className="h-px w-10" style={{ background: accentMid }} />
      <span
        className="font-sans text-[11px] font-light tracking-[0.28em] uppercase"
        style={{ color: accent }}
      >
        {children}
      </span>
      <span className="h-px w-10" style={{ background: accentMid }} />
    </div>
  );

  const LeafDivider = () => (
    <div className="flex items-center justify-center gap-2 my-3 opacity-70">
      <span className="h-px w-6" style={{ background: accentMid }} />
      <svg width="22" height="8" viewBox="0 0 22 8" fill="none" aria-hidden>
        <path d="M2 4 Q 6 0 11 4 Q 16 8 20 4" stroke={accent} strokeWidth="0.7" fill="none" opacity="0.6" />
        <circle cx="11" cy="4" r="1.1" fill={accent} opacity="0.5" />
      </svg>
      <span className="h-px w-6" style={{ background: accentMid }} />
    </div>
  );

  return (
    <div className="min-h-screen font-sans bg-parchment">
      <Navbar />
      <main className="overflow-hidden">

        {/* ─── 1. HERO ──────────────────────────────────────────────── */}
        <section className="relative pt-10 sm:pt-14 md:pt-20 pb-20 md:pb-32">
          {/* Soft topic-tinted top wash */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-48 md:h-72 -z-0"
            style={{
              background: `linear-gradient(180deg, ${tintWash} 0%, transparent 100%)`,
            }}
          />

          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center">
              {/* Left text */}
              <div className="md:col-span-6 lg:col-span-6 order-2 md:order-1">
                <Eyebrow>The Pregnancy Map · {config.eyebrow}</Eyebrow>
                <h1 className="mt-5 font-serif text-[2rem] sm:text-[2.6rem] md:text-[3.2rem] lg:text-[3.6rem] text-foreground leading-[1.05]">
                  {config.title}
                </h1>
                <p className="mt-6 font-sans text-[15px] md:text-base font-light text-muted-foreground leading-relaxed max-w-md">
                  {config.intro}
                </p>
              </div>

              {/* Right premium visual — bespoke per topic */}
              <div className="md:col-span-6 lg:col-span-6 order-1 md:order-2 relative">
                <div className="relative mx-auto max-w-[460px] md:max-w-none">
                  {/* Topic-tinted halo behind */}
                  <div
                    className="absolute inset-0 -m-4 rounded-full opacity-60 blur-2xl"
                    style={{
                      background: `radial-gradient(circle at 50% 45%, hsl(${theme.tintHsl} / 0.7) 0%, transparent 65%)`,
                    }}
                    aria-hidden
                  />
                  <img
                    src={heroImg}
                    alt=""
                    aria-hidden="true"
                    width={1024}
                    height={1024}
                    loading="eager"
                    className="relative w-full h-auto rounded-[2rem] object-cover"
                    style={{ aspectRatio: "1 / 1" }}
                  />
                  {/* Floating botanical accents — per-topic motif */}
                  <img
                    src={theme.sprigA}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="hidden sm:block absolute -left-6 md:-left-10 bottom-6 w-24 md:w-32 opacity-90 pointer-events-none"
                  />
                  <img
                    src={theme.sprigB}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="hidden sm:block absolute -right-3 md:-right-6 top-8 w-16 md:w-20 opacity-80 pointer-events-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. WHAT THIS TOPIC COVERS (overlapping card) ──────────── */}
        <section className="relative -mt-12 md:-mt-20 pb-16 md:pb-24">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
            <div
              className="relative bg-card rounded-[2rem] border shadow-[0_30px_80px_-40px_rgba(0,0,0,0.18)] p-6 sm:p-10 md:p-14 overflow-hidden"
              style={{ borderColor: accentBorder }}
            >
              <img
                src={theme.sprigA}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="hidden md:block absolute left-2 top-6 w-24 lg:w-28 opacity-80 pointer-events-none"
              />
              <img
                src={theme.sprigB}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="hidden md:block absolute right-4 bottom-4 w-14 opacity-60 pointer-events-none"
              />

              <div className="md:pl-32 lg:pl-36 text-center md:text-left">
                <h2 className="font-serif text-2xl md:text-3xl text-foreground leading-tight">
                  What this topic covers
                </h2>
                <LeafDivider />
                {config.whatThisCovers.lead && (
                  <p className="font-serif italic text-[14.5px] text-muted-foreground/85 mb-6 max-w-xl mx-auto md:mx-0">
                    {config.whatThisCovers.lead}
                  </p>
                )}

                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 mt-2">
                  {config.whatThisCovers.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-left">
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

        {/* ─── 3. START HERE — featured editorial cards ──────────────── */}
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
            <SectionLabel>Start here</SectionLabel>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
              {config.startHere.map((item) => {
                const img = resolveImage(item.href, item.image);
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="group block bg-card rounded-2xl overflow-hidden border transition-all hover:-translate-y-1 hover:shadow-[0_20px_50px_-30px_rgba(0,0,0,0.25)]"
                    style={{ borderColor: accentBorder }}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={img}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Subtle topic tint to harmonise mixed photography */}
                      <div
                        className="absolute inset-0 mix-blend-multiply opacity-[0.06] pointer-events-none"
                        style={{ background: accent }}
                        aria-hidden
                      />
                    </div>
                    <div className="p-5 sm:p-6">
                      <h3 className="font-serif text-xl md:text-[1.4rem] text-foreground leading-snug">
                        {item.title}
                      </h3>
                      <p className="mt-2.5 font-sans text-[14px] font-light text-muted-foreground leading-relaxed">
                        {item.why}
                      </p>
                      <span
                        className="mt-4 inline-flex items-center gap-1.5 font-sans text-[13px] font-medium"
                        style={{ color: accent }}
                      >
                        Read the guide
                        <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── 4. GROUPED ARTICLE EXPLORATION ────────────────────────── */}
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
            <div
              className="bg-card rounded-[2rem] border p-5 sm:p-8 md:p-12 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.15)]"
              style={{ borderColor: accentBorder }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                {config.groups.map((group, gi) => {
                  const sprig = groupSprigs[gi % groupSprigs.length];
                  const viewAllHref = group.links[0]?.href || "/pregnancy";
                  return (
                    <div key={group.label} className="flex flex-col">
                      <div className="flex items-start gap-3 mb-3">
                        <img
                          src={sprig}
                          alt=""
                          aria-hidden="true"
                          loading="lazy"
                          className="w-8 h-8 object-contain shrink-0 -mt-1"
                        />
                        <h3 className="font-serif text-[1.05rem] md:text-[1.15rem] text-foreground leading-snug">
                          {group.label}
                        </h3>
                      </div>

                      <ul className="flex flex-col mt-1">
                        {group.links.slice(0, 4).map((link) => {
                          const thumb = resolveImage(link.href, link.image);
                          return (
                            <li
                              key={link.href + link.label}
                              className="border-t first:border-t-0"
                              style={{ borderColor: accentSoft }}
                            >
                              <Link
                                to={link.href}
                                className="group flex items-center gap-3 py-2.5"
                              >
                                <div
                                  className="shrink-0 w-11 h-11 rounded-lg overflow-hidden border"
                                  style={{ borderColor: accentSoft }}
                                >
                                  <img
                                    src={thumb}
                                    alt=""
                                    aria-hidden="true"
                                    loading="lazy"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <span className="flex-1 font-sans text-[13px] font-light text-foreground/85 leading-snug group-hover:text-foreground transition-colors">
                                  {link.label}
                                </span>
                                <ChevronRight
                                  size={13}
                                  className="shrink-0 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                                  style={{ color: accent }}
                                />
                              </Link>
                            </li>
                          );
                        })}
                      </ul>

                      <Link
                        to={viewAllHref}
                        className="group mt-4 inline-flex items-center gap-1.5 font-sans text-[12px] font-medium tracking-wide self-start"
                        style={{ color: accent }}
                      >
                        View all
                        <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ─── 5. WEEK-BY-WEEK BAND ──────────────────────────────────── */}
        {config.weekBridge && (
          <section
            className="relative py-14 md:py-20 overflow-hidden"
            style={{ background: `hsl(${theme.tintHsl} / 0.55)` }}
          >
            <img
              src={theme.sprigC}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="hidden md:block absolute -left-6 bottom-2 w-32 lg:w-40 opacity-80 pointer-events-none"
            />
            <img
              src={theme.sprigC}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="hidden md:block absolute -right-6 top-2 w-32 lg:w-40 opacity-80 pointer-events-none scale-x-[-1]"
            />
            <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl text-center relative z-10">
              <p className="font-serif italic text-xl md:text-2xl text-foreground/85 leading-relaxed">
                {config.weekBridge.line}
              </p>
              <LeafDivider />
              <Link
                to={config.weekBridge.href}
                className="mt-2 inline-flex items-center gap-2 rounded-full px-6 py-3 font-sans text-[13.5px] font-medium text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
                style={{ backgroundColor: accent }}
              >
                {config.weekBridge.label}
                <ArrowRight size={14} />
              </Link>
            </div>
          </section>
        )}

        {/* ─── 6. OTHER PREGNANCY TOPICS ─────────────────────────────── */}
        {config.showSiblings !== false && (
          <section className="py-14 md:py-20">
            <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
              <div className="text-center mb-8">
                <SectionLabel>Other pregnancy topics</SectionLabel>
              </div>
              <ul className="flex flex-wrap justify-center gap-3 sm:gap-4">
                {siblings.map((s) => {
                  const isLive = LIVE_TOPIC_SLUGS.includes(s.slug);
                  const sTheme = TOPIC_THEMES[s.slug];
                  const Icon = sTheme?.icon || Heart;
                  const sAccent = sTheme ? `hsl(${sTheme.accentHsl})` : accent;
                  const sAccentSoft = sTheme ? `hsl(${sTheme.accentHsl} / 0.12)` : accentSoft;
                  const inner = (
                    <span className="group flex items-center gap-2.5 rounded-full bg-card border px-4 sm:px-5 py-2.5 sm:py-3 transition-all hover:-translate-y-0.5 hover:shadow-card-brand"
                      style={{ borderColor: sAccentSoft }}
                    >
                      <span
                        className="w-7 h-7 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: sAccentSoft }}
                      >
                        <Icon size={13} style={{ color: sAccent }} />
                      </span>
                      <span className="font-serif italic text-[14px] text-foreground/85">
                        {s.eyebrow}
                      </span>
                      <ChevronRight
                        size={13}
                        className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                        style={{ color: sAccent }}
                      />
                    </span>
                  );
                  return (
                    <li key={s.slug}>
                      {isLive ? (
                        <Link to={`/pregnancy/${s.slug}`}>{inner}</Link>
                      ) : (
                        <span className="opacity-55 cursor-default">{inner}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        )}

        {/* ─── 7. BACK LINK ──────────────────────────────────────────── */}
        <section className="pb-16 md:pb-20 text-center">
          <Link
            to="/pregnancy"
            className="font-sans text-[13.5px] font-light text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to the Pregnancy Map
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PregnancyTopicPage;
