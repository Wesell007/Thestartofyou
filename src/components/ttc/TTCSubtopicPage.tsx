import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronRight,
  Check,
  Sun,
  Leaf,
  Heart,
  ShieldCheck,
  Users,
  Clock,
  Calendar,
  Hourglass,
  Activity,
  TestTube,
  type LucideIcon,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AISearchBar from "@/components/shared/AISearchBar";
import {
  TTCPageConfig,
  TTC_SUBTOPIC_ORDER,
  TTCTopicSlug,
  ttcPageConfigs,
} from "@/data/ttcTopicData";

import sprigImg from "@/assets/topic-mini-sprig.png";
import wildflowerImg from "@/assets/topic-wildflower-sprig.png";

// ─── TTC thumbnails (existing assets only) ────────────────────────────────
import imgCycle from "@/assets/ttc-stage-cycle.jpg";
import imgTiming from "@/assets/ttc-stage-timing.jpg";
import imgWaiting from "@/assets/ttc-stage-waiting.jpg";
import imgPregTests from "@/assets/ttc-pregnancy-tests.jpg";
import imgFaint from "@/assets/ttc-faint-positive.jpg";
import imgChemical from "@/assets/ttc-chemical-pregnancy.jpg";
import imgTryingAgain from "@/assets/ttc-trying-again.jpg";
import imgPreconception from "@/assets/ttc-preconception-health.jpg";
import imgFertility from "@/assets/ttc-fertility-hero.jpg";
import imgIVF from "@/assets/ttc-ivf-treatment.jpg";
import imgMale from "@/assets/ttc-male-fertility.jpg";
import imgAge from "@/assets/ttc-age-and-fertility.jpg";
import imgConditions from "@/assets/ttc-conditions.jpg";
import imgLifestyle from "@/assets/ttc-hero-lifestyle.jpg";
import imgJourney from "@/assets/ttc-journey.jpg";
import imgTestsWomen from "@/assets/ttc-fertility-tests-women.jpg";
import imgTestsMen from "@/assets/ttc-fertility-tests-men.jpg";
import imgAppointment from "@/assets/ttc-fertility-appointment.jpg";
import imgOvulation from "@/assets/week2-ovulation.jpg";
import imgWeek1 from "@/assets/week1-cycle.jpg";
import imgFertilisation from "@/assets/week3-fertilisation.jpg";

// Phase 9.16 (TTC pregnancy tests + two week wait expansion)
import imgTestingTooEarly from "@/assets/ttc-testing-too-early.jpg";
import imgNegativeTestNoPeriod from "@/assets/ttc-negative-test-no-period.jpg";
import imgEvaporationLine from "@/assets/ttc-evaporation-line.jpg";
import imgTwoWeekWaitSymptoms from "@/assets/ttc-two-week-wait-symptoms.jpg";
import imgSpottingTwoWeekWait from "@/assets/ttc-spotting-two-week-wait.jpg";
import imgCopingTwoWeekWait from "@/assets/ttc-coping-two-week-wait.jpg";

// Phase 9.20 (final TTC article gap batch)
import imgTrackingWithoutOverthinking from "@/assets/ttc-tracking-without-overthinking.jpg";
import imgThyroidAndFertility from "@/assets/ttc-thyroid-and-fertility.jpg";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

interface Props {
  config: TTCPageConfig;
  heroImage: string;
}

type TTCTheme = {
  accentHsl: string;
  tintHsl: string;
  sprigA: string;
  sprigB: string;
  icon: LucideIcon;
};

const TTC_THEME: Record<TTCTopicSlug, TTCTheme> = {
  ovulation: { accentHsl: "140 22% 42%", tintHsl: "145 28% 90%", sprigA: sprigImg, sprigB: wildflowerImg, icon: Sun },
  "preconception-health": { accentHsl: "155 20% 40%", tintHsl: "150 26% 91%", sprigA: wildflowerImg, sprigB: sprigImg, icon: Leaf },
  fertility: { accentHsl: "175 22% 38%", tintHsl: "175 26% 90%", sprigA: sprigImg, sprigB: wildflowerImg, icon: Heart },
  "ivf-and-treatment": { accentHsl: "200 22% 44%", tintHsl: "200 28% 91%", sprigA: sprigImg, sprigB: wildflowerImg, icon: ShieldCheck },
  "male-fertility": { accentHsl: "150 18% 38%", tintHsl: "150 24% 91%", sprigA: wildflowerImg, sprigB: sprigImg, icon: Users },
  "age-and-fertility": { accentHsl: "195 20% 44%", tintHsl: "195 26% 91%", sprigA: sprigImg, sprigB: wildflowerImg, icon: Clock },
  "cycle-tracking": { accentHsl: "140 22% 42%", tintHsl: "145 28% 91%", sprigA: sprigImg, sprigB: wildflowerImg, icon: Calendar },
  "pregnancy-tests": { accentHsl: "180 20% 40%", tintHsl: "180 26% 91%", sprigA: wildflowerImg, sprigB: sprigImg, icon: TestTube },
  "two-week-wait": { accentHsl: "165 20% 40%", tintHsl: "165 26% 91%", sprigA: sprigImg, sprigB: wildflowerImg, icon: Hourglass },
  conditions: { accentHsl: "190 20% 42%", tintHsl: "190 26% 91%", sprigA: wildflowerImg, sprigB: sprigImg, icon: Activity },
};

const HREF_IMAGE_MAP: Record<string, string> = {
  "/trying-to-conceive/cycle-tracking": imgCycle,
  "/trying-to-conceive/two-week-wait": imgWaiting,
  "/trying-to-conceive/pregnancy-tests": imgPregTests,
  "/trying-to-conceive/ovulation": imgOvulation,
  "/trying-to-conceive/preconception-health": imgPreconception,
  "/trying-to-conceive/fertility": imgFertility,
  "/trying-to-conceive/ivf-and-treatment": imgIVF,
  "/trying-to-conceive/male-fertility": imgMale,
  "/trying-to-conceive/age-and-fertility": imgAge,
  "/trying-to-conceive/conditions": imgConditions,
  "/trying-to-conceive/ovulation-calculator": imgTiming,
  "/ivf": imgIVF,
  "/ivf-timeline": imgIVF,
  "/ask": imgLifestyle,
  
  "/articles/ovulation-signs": imgOvulation,
  "/articles/fertile-window": imgTiming,
  "/articles/trying-to-conceive-explained": imgJourney,
  "/articles/two-week-wait": imgWaiting,
  "/articles/when-to-take-a-pregnancy-test": imgPregTests,
  "/articles/faint-positive-pregnancy-test": imgFaint,
  "/articles/chemical-pregnancy": imgChemical,
  "/articles/trying-again-after-miscarriage": imgTryingAgain,
  "/articles/pregnancy-after-loss": imgTryingAgain,
  "/articles/can-you-get-pregnant-on-your-period": imgWeek1,
  "/articles/how-long-implantation-takes": imgFertilisation,
  "/articles/implantation-bleeding": imgFertilisation,
  "/articles/early-pregnancy-symptoms-explained": imgPregTests,
  "/articles/symptoms-stopping-early-pregnancy": imgWaiting,
  "/articles/how-long-to-try-before-getting-help": imgFertility,
  "/articles/pcos-and-trying-to-conceive": imgConditions,
  "/articles/endometriosis-and-trying-to-conceive": imgConditions,
  "/articles/irregular-periods-and-trying-to-conceive": imgCycle,
  "/articles/fertility-tests-for-women": imgTestsWomen,
  "/articles/fertility-tests-for-men": imgTestsMen,
  "/articles/what-happens-at-a-fertility-appointment": imgAppointment,
  "/articles/amh-test-explained": imgTestsWomen,
  "/articles/ivf-timeline-what-to-expect": imgIVF,
  "/articles/emotional-impact-of-ivf": imgIVF,
  "/articles/emotional-wellbeing-pregnancy": imgLifestyle,
  "/articles/perinatal-anxiety": imgLifestyle,

  // Phase 9.16
  "/articles/testing-too-early": imgTestingTooEarly,
  "/articles/negative-test-but-no-period": imgNegativeTestNoPeriod,
  "/articles/evaporation-line-or-faint-positive": imgEvaporationLine,
  "/articles/two-week-wait-symptoms": imgTwoWeekWaitSymptoms,
  "/articles/spotting-during-the-two-week-wait": imgSpottingTwoWeekWait,
  "/articles/coping-with-the-two-week-wait": imgCopingTwoWeekWait,

  // Phase 9.20
  "/articles/tracking-without-overthinking": imgTrackingWithoutOverthinking,
  "/articles/thyroid-and-fertility": imgThyroidAndFertility,
};

const TOPIC_FALLBACK: Record<TTCTopicSlug, string> = {
  ovulation: imgOvulation,
  "preconception-health": imgPreconception,
  fertility: imgFertility,
  "ivf-and-treatment": imgIVF,
  "male-fertility": imgMale,
  "age-and-fertility": imgAge,
  "cycle-tracking": imgCycle,
  "pregnancy-tests": imgPregTests,
  "two-week-wait": imgWaiting,
  conditions: imgConditions,
};

const TTCSubtopicPage = ({ config, heroImage }: Props) => {
  const theme = TTC_THEME[config.slug];
  const accent = `hsl(${theme.accentHsl})`;
  const accentSoft = `hsl(${theme.accentHsl} / 0.10)`;
  const accentMid = `hsl(${theme.accentHsl} / 0.20)`;
  const accentBorder = `hsl(${theme.accentHsl} / 0.16)`;
  const tintWash = `hsl(${theme.tintHsl} / 0.35)`;

  const fallbackThumb = TOPIC_FALLBACK[config.slug];
  const resolveImage = (href: string, explicit?: string) =>
    explicit || HREF_IMAGE_MAP[href] || fallbackThumb;

  const startHereHrefs = new Set(config.startHere.map((s) => s.href));

  const parent = config.parent ? ttcPageConfigs[config.parent] : null;
  const otherSubtopics = TTC_SUBTOPIC_ORDER.filter((s) => s !== config.slug).map(
    (s) => ttcPageConfigs[s]
  );

  if (typeof document !== "undefined") {
    document.title = `${config.title} | Trying to Conceive | The Start of You`;
    const desc = config.intro.slice(0, 158);
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
  }

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
    <div className="flex items-center justify-start gap-2 my-3 opacity-70">
      <span className="h-px w-5" style={{ background: accentMid }} />
      <svg width="20" height="8" viewBox="0 0 22 8" fill="none" aria-hidden>
        <path d="M2 4 Q 6 0 11 4 Q 16 8 20 4" stroke={accent} strokeWidth="0.7" fill="none" opacity="0.6" />
        <circle cx="11" cy="4" r="1.1" fill={accent} opacity="0.5" />
      </svg>
      <span className="h-px w-5" style={{ background: accentMid }} />
    </div>
  );

  // Single authoritative crumb array: feeds the visible trail and the schema.
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Trying to conceive", href: "/trying-to-conceive" },
    ...(parent
      ? [{ label: parent.eyebrow, href: `/trying-to-conceive/${parent.slug}` }]
      : []),
    { label: config.eyebrow, href: `/trying-to-conceive/${config.slug}` },
  ];

  return (
    <div className="min-h-screen font-sans bg-parchment">
      <Navbar />
      <main className="overflow-hidden">
        {/* Breadcrumb */}
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl pt-[100px] sm:pt-[116px] md:pt-[128px]">
          <BreadcrumbJsonLd items={breadcrumbItems} />
          <Breadcrumbs
            tone="section"
            className="font-sans tracking-wide"

            items={breadcrumbItems}
          />
        </div>

        {/* 1. HERO (lighter, clearly nested) */}
        <section className="relative pt-6 sm:pt-10 md:pt-14 pb-16 md:pb-24">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-40 md:h-60 -z-0"
            style={{ background: `linear-gradient(180deg, ${tintWash} 0%, transparent 100%)` }}
          />
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center">
              <div className="md:col-span-7 order-2 md:order-1">
                <Eyebrow>TTC{parent ? ` · ${parent.eyebrow}` : ""}</Eyebrow>
                <h1 className="mt-4 font-serif text-[1.85rem] sm:text-[2.25rem] md:text-[2.6rem] text-foreground leading-[1.08]">
                  {config.title}
                </h1>
                <p className="mt-5 font-sans text-[14.5px] md:text-[15px] font-light text-muted-foreground leading-relaxed max-w-md">
                  {config.intro}
                </p>
              </div>
              <div className="md:col-span-5 order-1 md:order-2 relative">
                <div className="relative mx-auto max-w-[400px] md:max-w-none">
                  <div
                    className="absolute inset-0 -m-3 rounded-full opacity-50 blur-2xl"
                    style={{
                      background: `radial-gradient(circle at 50% 45%, hsl(${theme.tintHsl} / 0.55) 0%, transparent 65%)`,
                    }}
                    aria-hidden
                  />
                  <img
                    src={heroImage}
                    alt=""
                    aria-hidden="true"
                    loading="eager"
                    fetchPriority="high"
                    className="relative w-full h-auto rounded-[1.75rem] object-cover border"
                    style={{ aspectRatio: "1 / 1", borderColor: accentBorder }}
                  />
                  <img
                    src={theme.sprigB}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="hidden md:block absolute -right-3 -bottom-4 w-14 lg:w-16 opacity-65 pointer-events-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. WHAT THIS SUBTOPIC COVERS */}
        <section className="pb-14 md:pb-20">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
            <div
              className="relative bg-card rounded-[1.75rem] border shadow-[0_24px_60px_-40px_rgba(0,0,0,0.16)] p-6 sm:p-8 md:p-10 overflow-hidden"
              style={{ borderColor: accentBorder }}
            >
              <img
                src={theme.sprigA}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="hidden md:block absolute right-3 -top-2 w-16 opacity-50 pointer-events-none"
              />
              <h2 className="font-serif text-xl md:text-2xl text-foreground leading-tight">
                What this subtopic covers
              </h2>
              <LeafDivider />
              {config.whatThisCovers.lead && (
                <p className="font-serif italic text-[14px] text-muted-foreground/85 mb-5 max-w-xl">
                  {config.whatThisCovers.lead}
                </p>
              )}
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 mt-3">
                {config.whatThisCovers.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="mt-1 shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: accentSoft }}
                    >
                      <Check size={11} style={{ color: accent }} strokeWidth={2.5} />
                    </span>
                    <span className="font-sans text-[14px] font-light text-foreground/80 leading-relaxed">
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 3. START HERE (editorial cards with photo) */}
        <section className="pb-14 md:pb-20">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
            <div className="text-center mb-8">
              <SectionLabel>Start here</SectionLabel>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {config.startHere.map((item) => {
                const img = resolveImage(item.href, item.image);
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="group block bg-card rounded-2xl overflow-hidden border transition-all hover:-translate-y-1 hover:shadow-[0_18px_44px_-28px_rgba(0,0,0,0.22)]"
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
                      <div
                        className="absolute inset-0 mix-blend-multiply opacity-[0.05] pointer-events-none"
                        style={{ background: accent }}
                        aria-hidden
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-serif text-[1.1rem] text-foreground leading-snug">
                        {item.title}
                      </h3>
                      <p className="mt-2 font-sans text-[13px] font-light text-muted-foreground leading-relaxed">
                        {item.why}
                      </p>
                      <span
                        className="mt-3 inline-flex items-center gap-1.5 font-sans text-[12.5px] font-medium"
                        style={{ color: accent }}
                      >
                        Read the guide
                        <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. GROUPED LINKS (with thumbs) */}
        <section className="pb-14 md:pb-20">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
            <div className="text-center mb-8 md:mb-10">
              <SectionLabel>Explore further</SectionLabel>
              <p className="mt-5 font-serif italic text-[14.5px] md:text-[15px] text-muted-foreground/85 max-w-lg mx-auto leading-relaxed">
                Related guides, grouped by what tends to come up next.
              </p>
            </div>
            <div
              className="relative bg-card rounded-[2rem] border p-6 sm:p-9 md:p-12 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.18)] overflow-hidden"
              style={{ borderColor: accentBorder }}
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-24"
                style={{ background: `linear-gradient(180deg, hsl(${theme.tintHsl} / 0.22) 0%, transparent 100%)` }}
                aria-hidden
              />
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
                {config.groups.map((group, gi) => {
                  const sprig = gi % 2 === 0 ? theme.sprigA : theme.sprigB;
                  const links = group.links
                    .filter((l) => !startHereHrefs.has(l.href))
                    .slice(0, 5);
                  if (links.length === 0) return null;

                  const askMatch = links.some((l) => l.href === "/ask");
                  const topicMatch = links
                    .map((l) => l.href.match(/^\/trying-to-conceive\/([^/]+)$/))
                    .find((m) => m && (!parent || m[1] !== parent.slug));
                  const viewAllHref = askMatch
                    ? "/ask"
                    : topicMatch
                    ? `/trying-to-conceive/${topicMatch[1]}`
                    : null;

                  return (
                    <div key={group.label} className="flex flex-col">
                      <div className="flex items-start gap-3 mb-2">
                        <img
                          src={sprig}
                          alt=""
                          aria-hidden="true"
                          loading="lazy"
                          className="w-6 h-6 object-contain shrink-0 -mt-0.5 opacity-75"
                        />
                        <h3 className="font-serif text-[1.1rem] md:text-[1.2rem] text-foreground leading-snug">
                          {group.label}
                        </h3>
                      </div>
                      {group.description && (
                        <p className="font-sans text-[12.5px] font-light text-muted-foreground/80 mb-4 leading-relaxed pl-9">
                          {group.description}
                        </p>
                      )}
                      <ul className="flex flex-col mt-1">
                        {links.map((link) => {
                          const thumb = resolveImage(link.href, link.image);
                          return (
                            <li
                              key={link.href + link.label}
                              className="border-t first:border-t-0"
                              style={{ borderColor: accentSoft }}
                            >
                              <Link
                                to={link.href}
                                className="group flex items-center gap-3 py-3 px-2 -mx-2 rounded-lg transition-colors"
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = accentSoft)}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                              >
                                <div
                                  className="shrink-0 w-11 h-11 rounded-lg overflow-hidden"
                                  style={{ boxShadow: `inset 0 0 0 1px ${accentBorder}` }}
                                >
                                  <img
                                    src={thumb}
                                    alt=""
                                    aria-hidden="true"
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
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

                      {viewAllHref && (
                        <Link
                          to={viewAllHref}
                          className="group mt-4 inline-flex items-center gap-1.5 font-sans text-[12px] font-medium tracking-wide self-start"
                          style={{ color: accent }}
                        >
                          View all
                          <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
              {config.curationNote && (
                <div className="relative mt-12 max-w-xl mx-auto text-center">
                  <LeafDivider />
                  <p className="font-serif italic text-[13.5px] text-muted-foreground/85 leading-relaxed">
                    {config.curationNote}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 5. AI BRIDGE */}
        {config.aiPrompts && config.aiPrompts.length > 0 && (
          <section
            className="py-16 md:py-24"
            style={{ background: `hsl(${theme.tintHsl} / 0.45)` }}
          >
            <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
              <div
                className="relative bg-card/75 backdrop-blur-sm rounded-[2rem] border p-8 sm:p-10 md:p-12 text-center shadow-[0_24px_60px_-40px_rgba(0,0,0,0.16)]"
                style={{ borderColor: accentBorder }}
              >
                <img
                  src={theme.sprigA}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="mx-auto w-10 md:w-12 opacity-60 mb-4"
                />
                <Eyebrow>AI Support</Eyebrow>
                <h2 className="mt-3 font-serif text-2xl md:text-[1.85rem] text-foreground leading-tight">
                  Ask anything specific
                </h2>
                <p className="mt-3 font-serif italic text-[14px] text-muted-foreground/85 max-w-md mx-auto leading-relaxed">
                  Personal answers, grounded in this guide.
                </p>
                <div className="mt-7">
                  <AISearchBar
                    placeholder={`Ask anything about ${config.eyebrow.toLowerCase()}…`}
                    suggestions={config.aiPrompts}
                    context={`TTC · ${config.eyebrow}`}
                    stage="ttc"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 6. CONTINUE EXPLORING */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
            {parent && (
              <div
                className="mx-auto max-w-2xl bg-card rounded-[1.75rem] border p-8 md:p-10 text-center shadow-[0_18px_50px_-40px_rgba(0,0,0,0.14)]"
                style={{ borderColor: accentBorder }}
              >
                <img
                  src={theme.sprigB}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="mx-auto w-8 opacity-60 mb-3"
                />
                <p className="font-serif italic text-lg md:text-xl text-foreground/85 mb-5">
                  Continue in the wider {parent.eyebrow.toLowerCase()} topic.
                </p>
                <Link
                  to={`/trying-to-conceive/${parent.slug}`}
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-sans text-[13.5px] font-medium text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ backgroundColor: accent }}
                >
                  Open {parent.eyebrow}
                  <ArrowRight size={14} />
                </Link>
              </div>
            )}

            <div className={`text-center ${parent ? "mt-16" : ""} mb-8`}>
              <SectionLabel>Other supporting guides</SectionLabel>
            </div>
            <ul className="flex flex-wrap justify-center gap-4 md:gap-5">
              {otherSubtopics.map((s) => {
                const sTheme = TTC_THEME[s.slug];
                const sAccent = `hsl(${sTheme.accentHsl})`;
                const sSoft = `hsl(${sTheme.accentHsl} / 0.12)`;
                const sBorder = `hsl(${sTheme.accentHsl} / 0.18)`;
                const Icon = sTheme.icon;
                return (
                  <li key={s.slug}>
                    <Link to={`/trying-to-conceive/${s.slug}`}>
                      <span
                        className="group flex items-center gap-3 rounded-full bg-card border px-5 py-3 transition-all hover:-translate-y-0.5"
                        style={{
                          borderColor: sBorder,
                          boxShadow: "0 2px 10px -6px rgba(0,0,0,0.12)",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.boxShadow = "0 10px 28px -18px rgba(0,0,0,0.25)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.boxShadow = "0 2px 10px -6px rgba(0,0,0,0.12)")
                        }
                      >
                        <span
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: sSoft }}
                        >
                          <Icon size={14} style={{ color: sAccent }} />
                        </span>
                        <span className="flex flex-col items-start leading-tight">
                          <span
                            className="font-sans not-italic text-[10px] tracking-[0.18em] uppercase opacity-60"
                            style={{ color: sAccent }}
                          >
                            Subtopic
                          </span>
                          <span className="font-serif italic text-[14px] text-foreground/85">
                            {s.eyebrow}
                          </span>
                        </span>
                        <ChevronRight
                          size={14}
                          className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                          style={{ color: sAccent }}
                        />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* 7. BACK LINK */}
        <section className="pb-16 md:pb-20 text-center">
          <div className="h-px max-w-32 mx-auto mb-8" style={{ background: accentSoft }} />
          <Link
            to="/trying-to-conceive"
            className="font-sans text-[13.5px] font-light text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to the TTC Guide
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TTCSubtopicPage;
