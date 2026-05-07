import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Egg,
  Heart,
  Sprout,
  RefreshCw,
  TestTube2,
  Hourglass,
  FlaskConical,
  Mars,
  CalendarHeart,
  Stethoscope,
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

/* ----------------------------------------------------------- */
/* 1. HERO                                                     */
/* ----------------------------------------------------------- */

const Hero = () => (
  <section className="relative bg-parchment overflow-hidden pt-[88px] pb-12 sm:pt-[104px] sm:pb-16 md:pt-[120px] md:pb-20 lg:pt-[140px] lg:pb-24">
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
              alt="A calm moment with tea by a window"
              className="w-full h-64 sm:h-80 md:h-[420px] object-cover"
              style={{ objectPosition: "50% 40%" }}
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ----------------------------------------------------------- */
/* 2. WHAT THIS HUB COVERS                                     */
/* ----------------------------------------------------------- */

const hubBullets = [
  "How ovulation works and how to find your fertile window",
  "What to know before you start trying for a baby",
  "How to track your cycle with tools, tests, and apps",
  "What can affect fertility, including age, health, and lifestyle",
  "When to take a pregnancy test and what early signs can mean",
  "When to seek extra support or explore fertility treatment",
];

const WhatThisCovers = () => (
  <section className="pb-14 md:pb-20 bg-parchment">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div
        className="relative rounded-[2rem] bg-card border p-8 sm:p-10 md:p-14 overflow-hidden"
        style={{
          borderColor: `hsl(var(${STAGE_ACCENT}) / 0.18)`,
          boxShadow: `0 1px 0 hsl(var(--parchment) / 0.9) inset, 0 22px 50px -30px hsl(var(${STAGE_ACCENT}) / 0.28)`,
        }}
      >
        <Eyebrow>Our starting point</Eyebrow>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-[2rem] text-foreground leading-tight mb-4">
          What this hub <span className="italic font-normal">covers</span>
        </h2>
        <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed max-w-2xl mb-8">
          Trying to conceive can bring practical questions, emotional ups and
          downs, and a lot of waiting. This hub brings the key topics together
          so you can understand what matters most and what to do next.
        </p>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
          {hubBullets.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full shrink-0"
                style={{
                  background: `hsl(var(${STAGE_BG}) / 0.9)`,
                  color: `hsl(var(${STAGE_ACCENT}))`,
                }}
              >
                <Check size={12} strokeWidth={2.4} />
              </span>
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
/* 3. TOPIC LIBRARY                                            */
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
  <section id="ttc-topics" className="relative py-14 md:py-20 bg-parchment overflow-hidden">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl relative">
      <div className="mb-8 md:mb-10">
        <Eyebrow>The TTC library</Eyebrow>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-[2rem] text-foreground mb-3 leading-tight">
          Explore trying to <span className="italic font-normal">conceive topics</span>
        </h2>
        <p className="font-sans text-sm font-light text-muted-foreground max-w-md">
          Start with the area that feels most relevant today, or browse the
          full TTC library below.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
        {ttcTopics.map((topic) => {
          const Icon = topicIcons[topic.slug];
          return (
            <Link
              key={topic.slug}
              to={topic.mainHref}
              className="group relative bg-card rounded-[1.25rem] border p-5 sm:p-6 flex flex-col transition-all duration-500 hover:-translate-y-0.5 min-h-[160px]"
              style={{
                borderColor: `hsl(var(${STAGE_ACCENT}) / 0.14)`,
                boxShadow: `0 1px 0 hsl(0 0% 100% / 0.9) inset, 0 14px 36px -24px hsl(var(${STAGE_ACCENT}) / 0.22)`,
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center mb-4"
                style={{
                  background: `hsl(var(${STAGE_BG}) / 0.85)`,
                }}
              >
                <Icon size={16} strokeWidth={1.6} style={{ color: `hsl(var(${STAGE_ACCENT}))` }} />
              </div>
              <h3 className="font-serif text-[1.05rem] sm:text-[1.1rem] text-foreground leading-tight mb-1.5">
                {topic.label}
              </h3>
              <p className="font-sans text-[12.5px] font-light text-muted-foreground leading-relaxed">
                {topic.description}
              </p>
            </Link>
          );
        })}
      </div>

      <div className="text-center mt-10">
        <a
          href="#ttc-topics"
          className="inline-flex items-center gap-1.5 font-sans text-[13px] font-medium tracking-wide"
          style={{ color: `hsl(var(${STAGE_ACCENT}))` }}
        >
          View all topics
          <ArrowRight size={14} />
        </a>
      </div>
    </div>
  </section>
);

/* ----------------------------------------------------------- */
/* 4. JOURNEY TIMELINE                                         */
/* ----------------------------------------------------------- */

const stages = [
  { label: "Cycle", desc: "Understand your dates, symptoms, and usual rhythm." },
  {
    label: "Ovulation",
    desc: "Find your fertile window and learn the signs your body may show.",
    here: true,
  },
  { label: "Waiting", desc: "Move through the two-week wait with calm support and less pressure." },
  { label: "Test", desc: "Know when to test and what your next step could be." },
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
/* 5. FERTILE WINDOW TOOL CTA                                  */
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
            <Eyebrow>A helpful tool</Eyebrow>
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
/* 6. AI SUPPORT                                               */
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
/* 7. REASSURANCE                                              */
/* ----------------------------------------------------------- */

const Reassurance = () => (
  <section className="py-16 md:py-24 bg-parchment relative overflow-hidden">
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
/* PAGE                                                        */
/* ----------------------------------------------------------- */

const TTCHub = () => {
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
        <TopicLibrary />
        <JourneyTimeline />
        <ToolCTA />
        <AISupport />
        <Reassurance />
      </main>
      <Footer />
    </div>
  );
};

export default TTCHub;
