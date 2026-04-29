import { Link } from "react-router-dom";
import { ChevronRight, ArrowRight, Check, Heart, Apple, ShieldCheck, Baby, ShoppingBag } from "lucide-react";
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

interface Props {
  config: PregnancyTopicPageConfig;
}

const accent = "hsl(var(--stage-pregnancy-accent))";
const accentSoft = "hsl(var(--stage-pregnancy-accent) / 0.10)";
const accentMid = "hsl(var(--stage-pregnancy-accent) / 0.20)";

// ─── Image resolver ──────────────────────────────────────────────────────
// Map article hrefs to existing curated thumbnails. Falls back gracefully.
const HREF_IMAGE_MAP: Record<string, string> = {
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
  "/articles/how-your-baby-develops-in-pregnancy": imgPregnancyJourney,
  "/articles/baby-movement-in-pregnancy": imgPregnancyBump,
  "/articles/twins-and-multiples-in-pregnancy": imgPregnancyJourney,
};

const HERO_IMAGE_MAP: Partial<Record<PregnancyTopicSlug, string>> = {
  body: topicBodyHero,
};

const resolveImage = (href: string, explicit?: string) =>
  explicit || HREF_IMAGE_MAP[href] || imgPregnancyJourney;

// Sibling icons (for the "Other pregnancy topics" row)
const SIBLING_ICONS: Record<PregnancyTopicSlug, React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>> = {
  body: Heart,
  baby: Baby,
  feelings: Heart,
  "health-and-safety": ShieldCheck,
  "diet-and-exercise": Apple,
  "preparing-for-baby": ShoppingBag,
};

// Botanical sprigs to rotate across the four group headers
const GROUP_SPRIGS = [miniSprig, wildflowerSprig, miniSprig, floralAccent];

// ─── Small UI atoms ──────────────────────────────────────────────────────
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

// Tiny decorative leaf divider
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

// ─── Page ────────────────────────────────────────────────────────────────
const PregnancyTopicPage = ({ config }: Props) => {
  const siblings = PREGNANCY_TOPICS.filter((t) => t.slug !== config.slug);
  const heroImg = config.heroImage || HERO_IMAGE_MAP[config.slug] || topicBodyHero;

  return (
    <div className="min-h-screen font-sans bg-parchment">
      <Navbar />
      <main className="overflow-hidden">

        {/* ─── 1. HERO ──────────────────────────────────────────────── */}
        <section className="relative pt-10 sm:pt-14 md:pt-20 pb-20 md:pb-32">
          {/* Soft top wash */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-48 md:h-72 -z-0"
            style={{
              background:
                "linear-gradient(180deg, hsl(var(--stage-pregnancy) / 0.45) 0%, transparent 100%)",
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

              {/* Right premium visual */}
              <div className="md:col-span-6 lg:col-span-6 order-1 md:order-2 relative">
                <div className="relative mx-auto max-w-[460px] md:max-w-none">
                  {/* Soft circular halo behind */}
                  <div
                    className="absolute inset-0 -m-4 rounded-full opacity-60 blur-2xl"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 45%, hsl(var(--stage-pregnancy) / 0.55) 0%, transparent 65%)",
                    }}
                    aria-hidden
                  />
                  <img
                    src={heroImg}
                    alt=""
                    aria-hidden="true"
                    width={1024}
                    height={1024}
                    className="relative w-full h-auto rounded-[2rem] object-cover"
                    style={{ aspectRatio: "1 / 1" }}
                  />
                  {/* Floating floral accents */}
                  <img
                    src={floralAccent}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="hidden sm:block absolute -left-6 md:-left-10 bottom-6 w-24 md:w-32 opacity-90 pointer-events-none"
                  />
                  <img
                    src={miniSprig}
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
              style={{ borderColor: accentSoft }}
            >
              {/* Decorative floral on left */}
              <img
                src={floralAccent}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="hidden md:block absolute left-2 top-6 w-24 lg:w-28 opacity-80 pointer-events-none"
              />
              <img
                src={miniSprig}
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
                    style={{ borderColor: accentSoft }}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={img}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
              style={{ borderColor: accentSoft }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                {config.groups.map((group, gi) => {
                  const sprig = GROUP_SPRIGS[gi % GROUP_SPRIGS.length];
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
            style={{ background: "hsl(var(--stage-pregnancy) / 0.5)" }}
          >
            <img
              src={wildflowerSprig}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="hidden md:block absolute -left-6 bottom-2 w-32 lg:w-40 opacity-80 pointer-events-none"
            />
            <img
              src={wildflowerSprig}
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
                  const Icon = SIBLING_ICONS[s.slug] || Heart;
                  const inner = (
                    <span className="group flex items-center gap-2.5 rounded-full bg-card border px-4 sm:px-5 py-2.5 sm:py-3 transition-all hover:-translate-y-0.5 hover:shadow-card-brand"
                      style={{ borderColor: accentSoft }}
                    >
                      <span
                        className="w-7 h-7 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: accentSoft }}
                      >
                        <Icon size={13} style={{ color: accent }} />
                      </span>
                      <span className="font-serif italic text-[14px] text-foreground/85">
                        {s.eyebrow}
                      </span>
                      <ChevronRight
                        size={13}
                        className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                        style={{ color: accent }}
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
