import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Sparkles,
  HeartPulse,
  Activity,
  CalendarDays,
  TestTube,
  Hourglass,
  Stethoscope,
  Users,
  Clock,
  ShieldAlert,
  Calendar as CalendarIcon,
  Leaf,
  type LucideIcon,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AISearchBar from "@/components/shared/AISearchBar";
import { ttcTopics, type TTCTopicSlug } from "@/data/ttcTopicData";
import sprigImg from "@/assets/topic-mini-sprig.png";
import wildflowerImg from "@/assets/topic-wildflower-sprig.png";
import heroImg from "@/assets/ttc-journey.jpg";
import featCycleImg from "@/assets/ttc-stage-cycle.jpg";
import featPreconceptionImg from "@/assets/ttc-stage-timing.jpg";
import featTrackImg from "@/assets/ttc-stage-waiting.jpg";
import journalFlatlay from "@/assets/journal-flatlay.jpg";

/* ----------------------------------------------------------- */
/* SHARED                                                      */
/* ----------------------------------------------------------- */

const STAGE_BG = "--stage-ttc";
const STAGE_ACCENT = "--stage-ttc-accent";

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p
    className="font-sans text-[11px] font-light tracking-[0.24em] uppercase mb-3"
    style={{ color: `hsl(var(${STAGE_ACCENT}))` }}
  >
    {children}
  </p>
);

const SoftDivider = () => (
  <div aria-hidden="true" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
    <div
      className="h-px w-full"
      style={{
        background: `linear-gradient(90deg, transparent 0%, hsl(var(${STAGE_ACCENT}) / 0.18) 50%, transparent 100%)`,
      }}
    />
  </div>
);

/* ----------------------------------------------------------- */
/* 1. HERO                                                     */
/* ----------------------------------------------------------- */

const Hero = () => (
  <section className="relative bg-parchment overflow-hidden pt-[88px] pb-12 sm:pt-[104px] sm:pb-16 md:pt-[120px] md:pb-24 lg:pt-[140px]">
    <div
      className="pointer-events-none absolute inset-x-0 top-0 h-40 md:h-64 -z-0"
      style={{
        background: `linear-gradient(180deg, hsl(var(${STAGE_BG}) / 0.55) 0%, transparent 100%)`,
      }}
    />

    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
        {/* Left editorial */}
        <div className="text-left order-2 md:order-1 pt-2 md:pt-0">
          <Eyebrow>The TTC Guide</Eyebrow>
          <h1 className="font-serif text-[2rem] sm:text-4xl md:text-[2.75rem] lg:text-[3rem] text-foreground leading-[1.08] mb-4 sm:mb-5">
            Trying to <span className="italic font-normal">conceive.</span>
          </h1>
          <p className="font-sans text-[14.5px] sm:text-base font-light text-muted-foreground leading-relaxed mb-7 max-w-md">
            A calm, practical guide to understanding your cycle, preparing your
            body, and finding your most fertile days.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <Link
              to="/ovulation-calculator"
              className="inline-flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[13px] font-medium shadow-cta hover:bg-terracotta-hover hover:-translate-y-0.5 transition-all duration-300"
            >
              <CalendarIcon size={15} />
              Calculate your fertile window
            </Link>
            <a
              href="#ttc-topics"
              className="inline-flex items-center justify-center gap-1.5 font-sans text-[13px] font-medium tracking-wide px-3 py-3.5"
              style={{ color: `hsl(var(${STAGE_ACCENT}))` }}
            >
              Explore TTC topics
              <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* Right image */}
        <div className="relative order-1 md:order-2">
          <img
            src={sprigImg}
            alt=""
            aria-hidden="true"
            className="hidden md:block absolute -top-8 -right-4 lg:-right-8 w-16 lg:w-20 opacity-50 pointer-events-none select-none rotate-12"
          />
          <div
            className="relative rounded-[1.75rem] overflow-hidden border"
            style={{
              borderColor: `hsl(var(${STAGE_ACCENT}) / 0.2)`,
              boxShadow: `0 1px 0 hsl(var(--parchment) / 0.9) inset, 0 22px 60px -30px hsl(var(${STAGE_ACCENT}) / 0.4)`,
            }}
          >
            <img
              src={heroImg}
              alt="A calm moment with tea and a journal"
              className="w-full h-64 sm:h-80 md:h-[420px] object-cover"
              style={{ objectPosition: "50% 40%" }}
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: `linear-gradient(180deg, transparent 60%, hsl(var(--parchment) / 0.5) 100%)`,
              }}
            />
          </div>
        </div>
      </div>
    </div>

    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
      style={{ background: `hsl(var(${STAGE_ACCENT}) / 0.12)` }}
    />
  </section>
);

/* ----------------------------------------------------------- */
/* 2. WHAT THIS HUB COVERS                                     */
/* ----------------------------------------------------------- */

const hubBullets = [
  "How ovulation works and how to find your fertile window",
  "What to know before you start trying for a baby",
  "How to track your cycle without feeling overwhelmed",
  "What can affect fertility, including age, health, and lifestyle",
  "When to take a pregnancy test and what early signs can mean",
  "When to seek extra support or explore fertility treatment",
];

const WhatThisCovers = () => (
  <section className="py-14 md:py-20 bg-parchment">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div
        className="relative rounded-[2rem] bg-card border p-8 sm:p-10 md:p-14 overflow-hidden"
        style={{
          borderColor: `hsl(var(${STAGE_ACCENT}) / 0.18)`,
          boxShadow: `0 1px 0 hsl(var(--parchment) / 0.9) inset, 0 22px 50px -30px hsl(var(${STAGE_ACCENT}) / 0.28)`,
        }}
      >
        <img
          src={wildflowerImg}
          alt=""
          aria-hidden="true"
          className="absolute -top-3 -left-3 w-20 sm:w-28 opacity-30 pointer-events-none select-none rotate-12"
        />
        <img
          src={sprigImg}
          alt=""
          aria-hidden="true"
          className="hidden md:block absolute bottom-4 right-6 w-20 opacity-30 pointer-events-none select-none -rotate-12"
        />

        <Eyebrow>Your starting point</Eyebrow>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-[2rem] text-foreground leading-tight mb-4">
          What this hub <span className="italic font-normal">covers</span>
        </h2>
        <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed max-w-2xl mb-8">
          Trying to conceive can bring practical questions, emotional ups and
          downs, and a lot of waiting. This hub brings the key topics together
          so you can understand what matters now and what to do next.
        </p>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3.5">
          {hubBullets.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className="mt-2 inline-block h-1.5 w-1.5 rounded-full shrink-0"
                style={{ background: `hsl(var(${STAGE_ACCENT}))` }}
              />
              <span className="font-sans text-[14.5px] font-light text-foreground/85 leading-relaxed">
                {b}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

/* ----------------------------------------------------------- */
/* 3. START HERE FEATURED CARDS                                */
/* ----------------------------------------------------------- */

const featured = [
  {
    title: "Understand your fertile window",
    copy: "Learn when you are most likely to conceive and how ovulation timing works.",
    href: "/trying-to-conceive/ovulation",
    image: featCycleImg,
  },
  {
    title: "Prepare your body before pregnancy",
    copy: "Small steps you can take before conception, from folic acid to lifestyle changes.",
    href: "/trying-to-conceive/preconception-health",
    image: featPreconceptionImg,
  },
  {
    title: "Track your cycle calmly",
    copy: "How to use cycle signs, apps, ovulation tests, and timing without feeling overwhelmed.",
    href: "/trying-to-conceive/cycle-tracking",
    image: featTrackImg,
  },
];

const StartHere = () => (
  <section className="py-14 md:py-20 bg-parchment">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
      <div className="text-center mb-10 md:mb-12">
        <Eyebrow>Start here</Eyebrow>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-[2rem] text-foreground leading-tight">
          Three calm <span className="italic font-normal">starting points</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
        {featured.map((f) => (
          <article
            key={f.title}
            className="group relative bg-card rounded-[1.5rem] border overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-1"
            style={{
              borderColor: `hsl(var(${STAGE_ACCENT}) / 0.16)`,
              boxShadow: `0 1px 0 hsl(0 0% 100% / 0.9) inset, 0 18px 44px -28px hsl(var(${STAGE_ACCENT}) / 0.3)`,
            }}
          >
            <div className="relative h-48 sm:h-52 overflow-hidden">
              <img
                src={f.image}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(180deg, transparent 60%, hsl(var(--parchment) / 0.35) 100%)`,
                }}
              />
            </div>
            <div className="p-6 sm:p-7 flex flex-col flex-1">
              <h3 className="font-serif text-[1.2rem] sm:text-[1.25rem] text-foreground leading-tight mb-3">
                {f.title}
              </h3>
              <p className="font-sans text-[13.5px] font-light text-muted-foreground leading-relaxed mb-5 flex-1">
                {f.copy}
              </p>
              <Link
                to={f.href}
                className="inline-flex items-center gap-1.5 font-sans text-[13px] font-medium tracking-wide"
                style={{ color: `hsl(var(--terracotta))` }}
              >
                Read the guide
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-500" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

/* ----------------------------------------------------------- */
/* 4. TOPIC LIBRARY                                            */
/* ----------------------------------------------------------- */

const topicIcons: Record<TTCTopicSlug, LucideIcon> = {
  ovulation: Sparkles,
  "preconception-health": HeartPulse,
  fertility: Activity,
  "cycle-tracking": CalendarDays,
  "pregnancy-tests": TestTube,
  "two-week-wait": Hourglass,
  "ivf-and-treatment": Stethoscope,
  "male-fertility": Users,
  "age-and-fertility": Clock,
  conditions: ShieldAlert,
};

const TopicLibrary = () => (
  <section id="ttc-topics" className="relative py-16 md:py-24 bg-parchment overflow-hidden">
    <img
      src={sprigImg}
      alt=""
      aria-hidden="true"
      className="hidden md:block absolute top-10 right-8 lg:right-16 w-16 lg:w-20 opacity-40 pointer-events-none select-none rotate-12"
    />

    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl relative">
      <div className="text-center mb-12 md:mb-14">
        <Eyebrow>The TTC library</Eyebrow>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-[2rem] text-foreground mb-3 leading-tight">
          Explore trying to <span className="italic font-normal">conceive topics</span>
        </h2>
        <p className="font-sans text-sm font-light text-muted-foreground max-w-md mx-auto">
          Start with the area that feels most relevant today, or browse the
          full TTC library below.
        </p>
        <div
          aria-hidden="true"
          className="mx-auto mt-6 h-px w-16"
          style={{
            background: `linear-gradient(90deg, transparent, hsl(var(${STAGE_ACCENT}) / 0.5), transparent)`,
          }}
        />
      </div>

      <div
        className="rounded-[2rem] border p-5 sm:p-8 md:p-10"
        style={{
          borderColor: `hsl(var(${STAGE_ACCENT}) / 0.14)`,
          background: `linear-gradient(180deg, hsl(var(--card)) 0%, hsl(var(--parchment) / 0.7) 100%)`,
          boxShadow: `0 1px 0 hsl(0 0% 100% / 0.9) inset, 0 22px 50px -30px hsl(var(${STAGE_ACCENT}) / 0.22)`,
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 md:gap-6">
          {ttcTopics.map((topic) => {
            const Icon = topicIcons[topic.slug];
            return (
              <article
                key={topic.slug}
                className="group relative bg-card rounded-[1.5rem] border p-6 sm:p-7 overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-0.5"
                style={{
                  borderColor: `hsl(var(${STAGE_ACCENT}) / 0.14)`,
                  boxShadow: `0 1px 0 hsl(0 0% 100% / 0.9) inset, 0 14px 36px -24px hsl(var(${STAGE_ACCENT}) / 0.22)`,
                }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      background: `radial-gradient(circle at 30% 28%, hsl(var(${STAGE_BG}) / 0.95), hsl(var(${STAGE_BG}) / 0.55))`,
                      boxShadow: `0 1px 0 hsl(0 0% 100% / 0.95) inset, 0 4px 12px -6px hsl(var(${STAGE_ACCENT}) / 0.4)`,
                    }}
                  >
                    <Icon size={17} strokeWidth={1.6} style={{ color: `hsl(var(${STAGE_ACCENT}))` }} />
                  </div>
                  <div className="flex-1 min-w-0 pt-0.5">
                    <h3 className="font-serif text-[1.15rem] sm:text-[1.2rem] text-foreground leading-tight">
                      {topic.label}
                    </h3>
                    <p className="font-sans text-[12.5px] font-light text-muted-foreground leading-relaxed mt-1">
                      {topic.description}
                    </p>
                  </div>
                </div>

                <div
                  aria-hidden="true"
                  className="h-px w-10 mb-1"
                  style={{
                    background: `linear-gradient(90deg, hsl(var(${STAGE_ACCENT}) / 0.55), transparent)`,
                  }}
                />

                <ul className="flex flex-col">
                  {topic.articles.map((article, i) => (
                    <li
                      key={article.href + i}
                      className="border-t"
                      style={{ borderColor: `hsl(var(${STAGE_ACCENT}) / 0.1)` }}
                    >
                      <Link
                        to={article.href}
                        className="group/link flex items-center justify-between gap-3 py-2.5 min-h-[44px]"
                      >
                        <span className="font-sans text-[13px] font-light text-foreground/75 leading-snug group-hover/link:text-foreground transition-colors">
                          {article.label}
                        </span>
                        <ChevronRight
                          size={13}
                          className="shrink-0 opacity-50 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 transition-all"
                          style={{ color: `hsl(var(${STAGE_ACCENT}))` }}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="pt-5 mt-auto">
                  <Link
                    to={topic.mainHref}
                    className="group/cta inline-flex items-center gap-1.5 font-sans text-[13px] font-medium tracking-wide"
                    style={{ color: `hsl(var(--terracotta))` }}
                  >
                    {topic.viewAllLabel}
                    <ArrowRight
                      size={13}
                      className="group-hover/cta:translate-x-1 transition-transform duration-500"
                    />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

/* ----------------------------------------------------------- */
/* 5. JOURNEY TIMELINE                                         */
/* ----------------------------------------------------------- */

const stages = [
  {
    label: "Cycle",
    desc: "Understand your dates, symptoms, and usual rhythm.",
  },
  {
    label: "Ovulation",
    desc: "Find your fertile window and learn the signs your body may show.",
    here: true,
  },
  {
    label: "Waiting",
    desc: "Move through the two-week wait with calm support and less pressure.",
  },
  {
    label: "Test",
    desc: "Know when to test and what your next step could be.",
  },
];

const JourneyTimeline = () => (
  <section className="py-14 md:py-20 bg-parchment">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
      <div className="text-center mb-12 md:mb-14">
        <Eyebrow>Your TTC journey</Eyebrow>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-[2rem] text-foreground leading-tight mb-3">
          A gentle <span className="italic font-normal">cycle of steps</span>
        </h2>
        <p className="font-sans text-sm font-light text-muted-foreground max-w-md mx-auto">
          Trying to conceive often moves through small repeating stages.
          Wherever you are today, you can start with the next gentle step.
        </p>
      </div>

      <div className="relative">
        {/* Desktop progress line */}
        <div
          aria-hidden="true"
          className="hidden md:block absolute left-[8%] right-[8%] top-7 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, hsl(var(${STAGE_ACCENT}) / 0.4), transparent)`,
          }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
          {stages.map((s, i) => (
            <div
              key={s.label}
              className="relative bg-card border rounded-[1.25rem] p-6 text-center"
              style={{
                borderColor: `hsl(var(${STAGE_ACCENT}) / 0.16)`,
                boxShadow: `0 1px 0 hsl(0 0% 100% / 0.9) inset, 0 14px 36px -24px hsl(var(${STAGE_ACCENT}) / 0.22)`,
              }}
            >
              {s.here && (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 inline-block rounded-full px-3 py-1 font-sans text-[10px] font-medium tracking-[0.18em] uppercase"
                  style={{
                    background: `hsl(var(--terracotta))`,
                    color: `hsl(var(--terracotta-foreground))`,
                  }}
                >
                  You are here
                </span>
              )}
              <div
                className="mx-auto w-10 h-10 rounded-full flex items-center justify-center mb-4 font-serif text-base"
                style={{
                  background: `hsl(var(${STAGE_BG}) / 0.85)`,
                  color: `hsl(var(${STAGE_ACCENT}))`,
                }}
              >
                {i + 1}
              </div>
              <h3 className="font-serif text-[1.15rem] text-foreground leading-tight mb-2">{s.label}</h3>
              <p className="font-sans text-[13px] font-light text-muted-foreground leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ----------------------------------------------------------- */
/* 6. FERTILE WINDOW TOOL CTA                                  */
/* ----------------------------------------------------------- */

const ToolCTA = () => (
  <section className="py-14 md:py-20 bg-parchment">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div
        className="relative rounded-[2rem] overflow-hidden border p-8 sm:p-10 md:p-14"
        style={{
          background: `radial-gradient(120% 90% at 0% 0%, hsl(var(${STAGE_BG}) / 0.7) 0%, hsl(var(${STAGE_BG}) / 0.35) 55%, hsl(var(--parchment) / 0.95) 100%)`,
          borderColor: `hsl(var(${STAGE_ACCENT}) / 0.18)`,
          boxShadow: `0 1px 0 hsl(var(--parchment) / 0.9) inset, 0 24px 60px -32px hsl(var(${STAGE_ACCENT}) / 0.3)`,
        }}
      >
        <img
          src={wildflowerImg}
          alt=""
          aria-hidden="true"
          className="hidden md:block absolute right-6 top-6 w-20 opacity-40 pointer-events-none select-none rotate-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <Eyebrow>A useful tool</Eyebrow>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-[2rem] text-foreground leading-tight mb-3">
              Find your <span className="italic font-normal">fertile window</span>
            </h2>
            <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed max-w-md mb-7">
              Use your cycle dates to estimate the days you may be most likely
              to conceive.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <Link
                to="/ovulation-calculator"
                className="inline-flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[13px] font-medium shadow-cta hover:bg-terracotta-hover hover:-translate-y-0.5 transition-all duration-300"
              >
                <CalendarIcon size={15} />
                Calculate your fertile window
              </Link>
              <Link
                to="/trying-to-conceive/ovulation"
                className="inline-flex items-center gap-1.5 font-sans text-[13px] font-medium tracking-wide px-3 py-3.5"
                style={{ color: `hsl(var(${STAGE_ACCENT}))` }}
              >
                Learn how ovulation works
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center">
            <div
              className="w-40 h-40 rounded-full flex items-center justify-center"
              style={{
                background: `radial-gradient(circle at 30% 28%, hsl(var(${STAGE_BG}) / 0.95), hsl(var(${STAGE_BG}) / 0.4))`,
                boxShadow: `0 1px 0 hsl(0 0% 100% / 0.95) inset, 0 14px 36px -16px hsl(var(${STAGE_ACCENT}) / 0.4)`,
              }}
            >
              <CalendarIcon size={48} strokeWidth={1.2} style={{ color: `hsl(var(${STAGE_ACCENT}))` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ----------------------------------------------------------- */
/* 7. AI SUPPORT                                               */
/* ----------------------------------------------------------- */

const AISupport = () => (
  <section className="py-14 md:py-20 bg-parchment">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div
        className="relative rounded-[2rem] overflow-hidden border"
        style={{
          background: `radial-gradient(120% 90% at 100% 0%, hsl(var(${STAGE_BG}) / 0.55) 0%, hsl(var(${STAGE_BG}) / 0.25) 55%, hsl(var(--parchment) / 0.95) 100%)`,
          borderColor: `hsl(var(${STAGE_ACCENT}) / 0.18)`,
          boxShadow: `0 1px 0 hsl(var(--parchment) / 0.9) inset, 0 24px 60px -32px hsl(var(${STAGE_ACCENT}) / 0.28)`,
        }}
      >
        <img
          src={sprigImg}
          alt=""
          aria-hidden="true"
          className="hidden md:block absolute left-6 top-6 w-16 opacity-40 pointer-events-none select-none -rotate-12"
        />
        <div className="relative z-10 px-5 sm:px-10 md:px-14 py-12 md:py-16 text-center">
          <Eyebrow>AI Support</Eyebrow>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-[2.125rem] text-foreground leading-[1.15] mb-3.5">
            What's on your mind <span className="italic font-normal">right now?</span>
          </h2>
          <p className="font-sans text-[14.5px] sm:text-[15px] font-light text-muted-foreground max-w-xl mx-auto leading-relaxed mb-8">
            Ask a question about ovulation, cycle tracking, testing, fertility,
            or what to do next.
          </p>

          <div
            className="max-w-2xl mx-auto rounded-2xl p-1 sm:p-1.5"
            style={{
              background: `linear-gradient(180deg, hsl(var(--parchment) / 0.6), hsl(var(--parchment) / 0.2))`,
              border: `1px solid hsl(var(${STAGE_ACCENT}) / 0.12)`,
            }}
          >
            <AISearchBar
              placeholder="Ask anything about trying to conceive…"
              suggestions={[
                "When am I most fertile?",
                "Is late ovulation normal?",
                "When should I take a pregnancy test?",
                "What should I do before trying?",
                "When should I ask for help?",
              ]}
              context="Trying to conceive"
            />
          </div>

          <p className="mt-5 font-sans text-[11.5px] font-light text-muted-foreground/70 max-w-md mx-auto">
            For health concerns or urgent symptoms, speak to a qualified
            healthcare professional.
          </p>
        </div>
      </div>
    </div>
  </section>
);

/* ----------------------------------------------------------- */
/* 8. REASSURANCE                                              */
/* ----------------------------------------------------------- */

const Reassurance = () => (
  <section className="py-16 md:py-24 bg-parchment-dark relative overflow-hidden">
    <img
      src={wildflowerImg}
      alt=""
      aria-hidden="true"
      className="hidden md:block absolute left-10 top-10 w-20 opacity-30 pointer-events-none select-none -rotate-12"
    />
    <img
      src={sprigImg}
      alt=""
      aria-hidden="true"
      className="hidden md:block absolute right-10 bottom-10 w-20 opacity-30 pointer-events-none select-none rotate-12"
    />
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-2xl text-center relative">
      <Leaf
        size={22}
        strokeWidth={1.4}
        className="mx-auto mb-5"
        style={{ color: `hsl(var(${STAGE_ACCENT}))` }}
      />
      <h2 className="font-serif text-2xl sm:text-3xl md:text-[2rem] text-foreground leading-tight mb-5">
        A small <span className="italic font-normal">reminder</span>
      </h2>
      <p className="font-sans text-[15px] sm:text-base font-light text-muted-foreground leading-relaxed">
        Trying to conceive can feel hopeful one day and overwhelming the next.
        You do not need to have everything perfectly figured out. Start with
        understanding your cycle, taking care of your body, and knowing what
        support is available if you need it.
      </p>
    </div>
  </section>
);

/* ----------------------------------------------------------- */
/* 9. REFLECTION                                               */
/* ----------------------------------------------------------- */

const Reflection = () => (
  <section className="py-14 md:py-20 bg-parchment">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
      <div
        className="relative rounded-[1.75rem] bg-card border p-8 sm:p-10 md:p-12 text-center overflow-hidden"
        style={{
          borderColor: `hsl(var(${STAGE_ACCENT}) / 0.18)`,
          boxShadow: `0 1px 0 hsl(var(--parchment) / 0.9) inset, 0 22px 50px -32px hsl(var(${STAGE_ACCENT}) / 0.28)`,
        }}
      >
        <PenLine
          size={20}
          strokeWidth={1.4}
          className="mx-auto mb-4"
          style={{ color: `hsl(var(${STAGE_ACCENT}))` }}
        />
        <Eyebrow>Take a moment</Eyebrow>
        <h2 className="font-serif text-xl sm:text-2xl md:text-[1.75rem] text-foreground leading-snug mb-3">
          What would help you feel calmer or more supported this cycle?
        </h2>
        <p className="font-sans text-[13.5px] font-light text-muted-foreground leading-relaxed mb-7 max-w-md mx-auto">
          A small note today can become something you treasure later.
        </p>
        <Link
          to="/product"
          className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[13px] font-medium shadow-cta hover:bg-terracotta-hover hover:-translate-y-0.5 transition-all duration-300"
        >
          <PenLine size={14} />
          Capture this thought
        </Link>
      </div>
    </div>
  </section>
);

/* ----------------------------------------------------------- */
/* 10. FINAL CTA                                               */
/* ----------------------------------------------------------- */

const FinalCTA = () => (
  <section className="relative bg-parchment-dark overflow-hidden">
    <div
      aria-hidden="true"
      className="absolute inset-x-0 top-0 h-px"
      style={{
        background: `linear-gradient(90deg, transparent, hsl(var(${STAGE_ACCENT}) / 0.25), transparent)`,
      }}
    />
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="relative h-[260px] sm:h-[320px] md:h-auto md:min-h-[440px] overflow-hidden">
        <img
          src={journalFlatlay}
          alt="A calm moment with the journal"
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
        <div className="absolute inset-0 shadow-[inset_-40px_0_60px_-20px_hsl(var(--parchment-dark))] hidden md:block" />
      </div>
      <div className="relative z-10 flex items-center py-14 md:py-20 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-md">
          <Eyebrow>Continue your journey</Eyebrow>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-[2.25rem] text-foreground leading-tight mb-4">
            Start with where <span className="italic font-normal">you are today.</span>
          </h2>
          <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed mb-7">
            We'll help you understand your cycle, your options, and the next
            step that feels right.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/setup"
              className="inline-flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[13px] font-medium shadow-cta hover:bg-terracotta-hover hover:-translate-y-0.5 transition-all duration-300"
            >
              Start my journey
              <ArrowRight size={14} />
            </Link>
            <a
              href="#ttc-topics"
              className="inline-flex items-center justify-center gap-1.5 font-sans text-[13px] font-medium tracking-wide px-3 py-3.5"
              style={{ color: `hsl(var(${STAGE_ACCENT}))` }}
            >
              Explore TTC topics
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ----------------------------------------------------------- */
/* PAGE                                                        */
/* ----------------------------------------------------------- */

const TTCHub = () => {
  // SEO
  if (typeof document !== "undefined") {
    document.title = "Trying to Conceive Guide | Ovulation, Fertility & Preconception Health";
    const desc =
      "A calm, practical guide to trying to conceive, including ovulation, fertile window timing, preconception health, pregnancy tests, fertility support, and IVF guidance.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
  }

  return (
    <div className="min-h-screen font-sans bg-parchment">
      <Navbar />
      <main>
        <Hero />
        <WhatThisCovers />
        <SoftDivider />
        <StartHere />
        <TopicLibrary />
        <SoftDivider />
        <JourneyTimeline />
        <ToolCTA />
        <AISupport />
        <Reassurance />
        <Reflection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default TTCHub;
