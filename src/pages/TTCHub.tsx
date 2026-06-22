import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import {
  ArrowRight,
  ArrowUpRight,
  ArrowDown,
  Check,
  Egg,
  Heart,
  Sprout,
  RefreshCw,
  TestTube2,
  Hourglass,
  FlaskConical,
  User,
  CalendarHeart,
  Stethoscope,
  Calendar as CalendarIcon,
  Target,
  Clock,
  Leaf,
  type LucideIcon,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AISearchBar from "@/components/shared/AISearchBar";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ttcTopics, type TTCTopicSlug } from "@/data/ttcTopicData";
import sprigImg from "@/assets/topic-mini-sprig.png";
import heroImg from "@/assets/ttc-hero-lifestyle.jpg";

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
/* 1. HERO — tool-first (calculator + common questions)        */
/* ----------------------------------------------------------- */

const commonQuestions = [
  { text: "When am I most fertile?", sub: "Understanding your fertile window", icon: Target },
  { text: "When should I test?", sub: "Timing and accuracy", icon: Clock },
  { text: "Am I ovulating yet?", sub: "Signs and tracking", icon: Heart },
];

const cycleLengths = Array.from({ length: 16 }, (_, i) => i + 21);

const Hero = () => {
  const navigate = useNavigate();
  const [lmpDate, setLmpDate] = useState<Date>();
  const [cycleLength, setCycleLength] = useState(28);
  const [open, setOpen] = useState(false);

  const handleShowDates = () => {
    if (lmpDate) {
      const lmpStr = format(lmpDate, "yyyy-MM-dd");
      navigate(`/trying-to-conceive/ovulation-calculator?lmp=${lmpStr}&cycle=${cycleLength}`);
    }
  };

  return (
    <section className="relative bg-parchment overflow-hidden pt-[88px] pb-12 sm:pt-[104px] sm:pb-16 md:pt-[120px] md:pb-24 lg:pt-[140px]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 md:h-64 -z-0"
        style={{
          background: `linear-gradient(180deg, hsl(var(${STAGE_BG}) / 0.45) 0%, transparent 100%)`,
        }}
      />

      {/* Left-edge lifestyle photo — desktop only, narrower than Pregnancy for breathing room */}
      <div className="hidden md:block absolute top-0 left-0 h-full w-[22%] z-0">
        <img
          src={heroImg}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-r from-transparent to-parchment" />
      </div>

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl relative z-10">
        {/* MOBILE image strip */}
        <div className="md:hidden mb-6">
          <div
            className="relative rounded-3xl overflow-hidden border shadow-card-brand"
            style={{ borderColor: `hsl(var(${STAGE_ACCENT}) / 0.18)` }}
          >
            <img
              src={heroImg}
              alt=""
              aria-hidden="true"
              className="w-full h-44 sm:h-56 object-cover"
              style={{ objectPosition: "50% 45%" }}
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, transparent 55%, hsl(var(--parchment) / 0.7) 100%)",
              }}
            />
            <div className="absolute left-4 top-4">
              <span
                className="inline-block rounded-full px-3 py-1 font-sans text-[10px] font-light tracking-[0.22em] uppercase backdrop-blur-sm"
                style={{
                  backgroundColor: "hsl(var(--parchment) / 0.85)",
                  color: `hsl(var(${STAGE_ACCENT}))`,
                }}
              >
                Trying to Conceive
              </span>
            </div>
          </div>
        </div>

        <div className="md:pl-[18%] lg:pl-[16%]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start">
            {/* Left editorial */}
            <div className="text-left pt-2 md:pt-4">
              <p
                className="hidden md:block font-sans text-[11px] font-light tracking-[0.22em] uppercase mb-5"
                style={{ color: `hsl(var(${STAGE_ACCENT}))` }}
              >
                Trying to Conceive
              </p>

              <h1 className="font-serif text-[1.85rem] sm:text-4xl md:text-[2.75rem] lg:text-[3rem] text-foreground leading-[1.08] mb-4 sm:mb-5">
                Understand your cycle.{" "}
                <span className="italic font-normal">Find your window.</span>
              </h1>

              <p className="font-sans text-[14.5px] sm:text-base font-light text-muted-foreground leading-relaxed mb-6 sm:mb-7 max-w-md">
                A calm, practical guide through every stage of trying to
                conceive — from cycle awareness to the two-week wait.
              </p>

              <div className="flex items-stretch gap-4 sm:gap-8 mb-7">
                {[
                  { label: "3 stages", sub: "of the journey" },
                  { label: "5–6 days", sub: "fertile window" },
                  { label: "~85%", sub: "within a year" },
                ].map((item, i) => (
                  <div
                    key={item.label}
                    className={`flex flex-col ${i > 0 ? "pl-4 sm:pl-8 border-l" : ""}`}
                    style={i > 0 ? { borderColor: `hsl(var(${STAGE_ACCENT}) / 0.18)` } : undefined}
                  >
                    <span className="font-serif text-base sm:text-xl text-foreground leading-tight">
                      {item.label}
                    </span>
                    <span className="font-sans text-[10.5px] sm:text-[11px] font-light text-muted-foreground/70 mt-0.5">
                      {item.sub}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="rounded-xl p-5 max-w-md"
                style={{ backgroundColor: `hsl(var(${STAGE_BG}) / 0.18)` }}
              >
                <p className="font-serif italic text-[14.5px] text-foreground/65 leading-relaxed mb-2">
                  "The hardest part isn't the timing. It's the waiting."
                </p>
                <p className="font-sans text-[11px] font-light text-muted-foreground/60">
                  A space that understands what this journey really feels like.
                </p>
              </div>
            </div>

            {/* Right — calculator + common questions */}
            <div className="relative">
              <img
                src={sprigImg}
                alt=""
                aria-hidden="true"
                className="hidden md:block absolute -top-8 -right-2 lg:-right-6 w-16 lg:w-20 opacity-45 pointer-events-none select-none rotate-12"
              />
              <div
                className="bg-card border rounded-[1.25rem] p-6 sm:p-7 relative"
                style={{
                  borderColor: `hsl(var(${STAGE_ACCENT}) / 0.2)`,
                  boxShadow: `0 1px 0 hsl(var(--parchment) / 0.9) inset, 0 22px 50px -28px hsl(var(${STAGE_ACCENT}) / 0.35)`,
                }}
              >
                <div
                  aria-hidden="true"
                  className="absolute top-0 left-7 right-7 h-px"
                  style={{
                    background: `linear-gradient(90deg, transparent, hsl(var(${STAGE_ACCENT}) / 0.4), transparent)`,
                  }}
                />
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `hsl(var(${STAGE_ACCENT}) / 0.14)` }}
                  >
                    <CalendarIcon size={13} style={{ color: `hsl(var(${STAGE_ACCENT}))` }} />
                  </div>
                  <p
                    className="font-sans text-[11px] font-light tracking-[0.22em] uppercase"
                    style={{ color: `hsl(var(${STAGE_ACCENT}))` }}
                  >
                    Ovulation calculator
                  </p>
                </div>
                <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-5">
                  See your fertile window for this cycle.
                </p>

                <div className="space-y-4">
                  <div>
                    <p className="font-sans text-[10px] font-light tracking-[0.12em] uppercase text-muted-foreground/60 mb-2">
                      First day of your last period
                    </p>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <button
                          className={cn(
                            "w-full flex items-center justify-between bg-card border border-border/50 rounded-xl px-5 py-3.5 font-sans text-sm font-light transition-all hover:border-sage/40 focus:outline-none focus:border-sage/50",
                            lmpDate ? "text-foreground" : "text-muted-foreground"
                          )}
                        >
                          <span>{lmpDate ? format(lmpDate, "d MMMM yyyy") : "Select date"}</span>
                          <CalendarIcon size={14} className="text-sage-muted" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 border border-border/60 shadow-soft rounded-xl" align="start">
                        <Calendar
                          mode="single"
                          selected={lmpDate}
                          onSelect={(d) => { setLmpDate(d); setOpen(false); }}
                          disabled={(date) => date > new Date()}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <p className="font-sans text-[10px] font-light tracking-[0.12em] uppercase text-muted-foreground/60 mb-2">
                      Cycle length
                    </p>
                    <div className="relative">
                      <select
                        value={cycleLength}
                        onChange={(e) => setCycleLength(Number(e.target.value))}
                        className="w-full appearance-none bg-card border border-border/50 rounded-xl px-5 py-3.5 font-sans text-sm font-light text-foreground focus:outline-none focus:border-sage/50 hover:border-sage/40 transition-all pr-10"
                      >
                        {cycleLengths.map((len) => (
                          <option key={len} value={len}>
                            {len} days{len === 28 ? " (average)" : ""}
                          </option>
                        ))}
                      </select>
                      <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-sage-muted pointer-events-none w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  <button
                    onClick={handleShowDates}
                    disabled={!lmpDate}
                    className={cn(
                      "w-full flex items-center justify-center gap-2 rounded-pill px-7 py-3.5 font-sans text-sm font-medium transition-all",
                      lmpDate
                        ? "bg-terracotta text-terracotta-foreground shadow-cta hover:bg-terracotta-hover"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    )}
                  >
                    <ArrowRight size={15} />
                    Show fertility dates
                  </button>
                </div>

                <p className="mt-4 font-sans text-[11px] font-light text-muted-foreground/70 leading-relaxed">
                  An estimate based on your typical cycle. Ovulation can vary
                  month to month.
                </p>
              </div>

              {/* Common questions panel — breathable, kept under the calculator */}
              <div className="mt-8">
                <p
                  className="font-sans text-[11px] font-light tracking-[0.22em] uppercase mb-4"
                  style={{ color: `hsl(var(${STAGE_ACCENT}))` }}
                >
                  Common questions
                </p>
                <div className="space-y-2.5">
                  {commonQuestions.map((prompt, i) => {
                    const Icon = prompt.icon;
                    return (
                      <Link
                        key={i}
                        to={`/ask?q=${encodeURIComponent(prompt.text)}`}
                        className="group flex items-start gap-3 w-full text-left py-3 px-4 rounded-xl border bg-card/60 hover:bg-card transition-all"
                        style={{ borderColor: `hsl(var(${STAGE_BG}) / 0.3)` }}
                      >
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                          style={{ backgroundColor: `hsl(var(${STAGE_BG}) / 0.3)` }}
                        >
                          <Icon size={11} style={{ color: `hsl(var(${STAGE_ACCENT}))` }} />
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="font-sans text-[13.5px] font-light text-foreground/85 group-hover:text-foreground transition-colors leading-snug">
                            {prompt.text}
                          </span>
                          <span className="font-sans text-[11px] font-light text-muted-foreground/55">
                            {prompt.sub}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                <a
                  href="#ttc-topics"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("ttc-topics")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="mt-4 flex items-center gap-2 border text-foreground rounded-pill px-5 py-2.5 font-sans text-[13px] font-light hover:bg-parchment-dark transition-all w-full justify-center"
                  style={{ borderColor: `hsl(var(${STAGE_ACCENT}) / 0.25)` }}
                >
                  <ArrowDown size={13} />
                  Explore the full guide
                </a>
              </div>
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
};

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
  <section className="pt-12 md:pt-16 pb-16 md:pb-24 bg-parchment">
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
/* 3. AI SUPPORT                                               */
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
  <section className="py-16 md:py-24 bg-parchment">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
      <div className="text-center mb-12 md:mb-14 max-w-2xl mx-auto">
        <Eyebrow>Your TTC journey</Eyebrow>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-[2rem] text-foreground leading-tight mb-3">
          How TTC <span className="italic font-normal">often unfolds</span>
        </h2>
        <p className="font-sans text-[14.5px] font-light text-muted-foreground leading-relaxed">
          A quiet, repeating rhythm. Wherever you are in the cycle today,
          there is a gentle next step.
        </p>
      </div>

      <div
        className="relative rounded-[2rem] border px-6 sm:px-10 md:px-16 py-12 md:py-20 overflow-hidden"
        style={{
          borderColor: `hsl(var(${STAGE_ACCENT}) / 0.16)`,
          background: `
            radial-gradient(140% 90% at 50% 0%, hsl(var(${STAGE_BG}) / 0.45) 0%, transparent 60%),
            linear-gradient(180deg, hsl(var(--card)) 0%, hsl(var(--parchment) / 0.85) 100%)
          `,
          boxShadow: `0 1px 0 hsl(0 0% 100% / 0.95) inset, 0 26px 70px -38px hsl(var(${STAGE_ACCENT}) / 0.32)`,
        }}
      >
        {/* hairline top accent */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-16 right-16 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, hsl(var(${STAGE_ACCENT}) / 0.35), transparent)`,
          }}
        />

        {/* desktop dotted connecting line */}
        <div
          aria-hidden="true"
          className="hidden md:block absolute left-[14%] right-[14%] top-[8.5rem] h-px"
          style={{
            backgroundImage: `linear-gradient(90deg, hsl(var(${STAGE_ACCENT}) / 0.45) 50%, transparent 0)`,
            backgroundSize: "8px 1px",
            backgroundRepeat: "repeat-x",
          }}
        />

        <ol className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-y-0 md:gap-x-6">
          {stages.map((s, i) => (
            <li key={s.label} className="relative text-center md:px-3">
              <div className="relative inline-flex items-center justify-center mb-5">
                {s.here && (
                  <>
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full animate-pulse"
                      style={{
                        background: `hsl(var(${STAGE_ACCENT}) / 0.12)`,
                        transform: "scale(2)",
                      }}
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `hsl(var(${STAGE_ACCENT}) / 0.16)`,
                        transform: "scale(1.55)",
                      }}
                    />
                  </>
                )}
                <span
                  className="relative inline-flex w-14 h-14 rounded-full items-center justify-center font-serif text-[15px] tracking-wide"
                  style={{
                    background: s.here
                      ? `hsl(var(--terracotta))`
                      : `radial-gradient(circle at 30% 28%, hsl(var(--card)), hsl(var(${STAGE_BG}) / 0.55))`,
                    color: s.here
                      ? `hsl(var(--terracotta-foreground))`
                      : `hsl(var(${STAGE_ACCENT}))`,
                    border: s.here
                      ? "none"
                      : `1px solid hsl(var(${STAGE_ACCENT}) / 0.32)`,
                    boxShadow: s.here
                      ? `0 12px 28px -12px hsl(var(--terracotta) / 0.55)`
                      : `0 1px 0 hsl(0 0% 100% / 0.95) inset, 0 8px 22px -14px hsl(var(${STAGE_ACCENT}) / 0.35)`,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {s.here && (
                <p
                  className="font-sans text-[10px] font-medium tracking-[0.22em] uppercase mb-1.5"
                  style={{ color: `hsl(var(--terracotta))` }}
                >
                  You are here
                </p>
              )}
              <h3 className="font-serif text-[1.2rem] text-foreground leading-tight mb-2">
                {s.label}
              </h3>
              <p className="font-sans text-[13px] font-light text-muted-foreground leading-relaxed max-w-[17rem] mx-auto">
                {s.desc}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  </section>
);

/* ----------------------------------------------------------- */
/* 5. TOPIC LIBRARY — premium core topics + curated guides     */
/* ----------------------------------------------------------- */

const topicIcons: Record<TTCTopicSlug, LucideIcon> = {
  ovulation: Egg,
  "preconception-health": Heart,
  fertility: Sprout,
  "cycle-tracking": RefreshCw,
  "pregnancy-tests": TestTube2,
  "two-week-wait": Hourglass,
  "ivf-and-treatment": FlaskConical,
  "male-fertility": User,
  "age-and-fertility": CalendarHeart,
  conditions: Stethoscope,
};

// Per-pillar accent palette — gentle variation across the TTC green family.
type PillarTheme = {
  tintHsl: string;
  inkHsl: string;
  borderHsl: string;
  sprigRotate: number;
};

const pillarTheme: Record<string, PillarTheme> = {
  ovulation: {
    tintHsl: "120 24% 86%", // fresh light sage
    inkHsl: "130 28% 36%",
    borderHsl: "130 24% 44%",
    sprigRotate: -12,
  },
  "preconception-health": {
    tintHsl: "90 26% 84%", // warmer olive sage
    inkHsl: "95 30% 32%",
    borderHsl: "95 26% 40%",
    sprigRotate: 16,
  },
  fertility: {
    tintHsl: "150 22% 82%", // deeper moss
    inkHsl: "155 28% 30%",
    borderHsl: "155 24% 38%",
    sprigRotate: -8,
  },
};

// Child links shown inline on each pillar card.
const pillarChildren: Record<string, { label: string; href: string }[]> = {
  ovulation: [
    { label: "Cycle tracking", href: "/trying-to-conceive/cycle-tracking" },
    { label: "Age & fertility", href: "/trying-to-conceive/age-and-fertility" },
  ],
  "preconception-health": [
    { label: "Preparing for a baby", href: "/preparing-for-baby" },
    { label: "Trying to conceive, explained", href: "/articles/trying-to-conceive-explained" },
  ],
  fertility: [
    { label: "IVF & fertility treatment", href: "/trying-to-conceive/ivf-and-treatment" },
    { label: "Conditions that can affect TTC", href: "/trying-to-conceive/conditions" },
  ],
};

const TopicLibrary = () => {
  const pillars = ttcTopics.filter((t) => t.kind === "pillar");
  const subs = ttcTopics.filter((t) => t.kind === "subtopic");
  return (
    <section id="ttc-topics" className="relative py-16 md:py-24 bg-parchment overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl relative">
        {/* Header */}
        <div className="mb-10 md:mb-12">
          <Eyebrow>The TTC library</Eyebrow>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-[2rem] text-foreground mb-3 leading-tight">
            Core <span className="italic font-normal">TTC topics</span>
          </h2>
          <p className="font-sans text-sm font-light text-muted-foreground max-w-md">
            Three pillar topics that hold the heart of the TTC guide.
          </p>
          <div
            aria-hidden="true"
            className="mt-6 h-px w-16"
            style={{
              background: `linear-gradient(90deg, hsl(var(${STAGE_ACCENT}) / 0.5), transparent)`,
            }}
          />
        </div>

        {/* PILLAR CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          {pillars.map((topic) => {
            const Icon = topicIcons[topic.slug];
            const theme = pillarTheme[topic.slug];
            const children = pillarChildren[topic.slug] ?? [];
            return (
              <article
                key={topic.slug}
                className="group relative bg-card flex flex-col p-6 sm:p-7 md:p-8 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
                style={{
                  borderRadius: "1.75rem 1.25rem 1.75rem 1.25rem",
                  border: `1px solid hsl(${theme.borderHsl} / 0.18)`,
                  background: `
                    radial-gradient(120% 80% at 100% 0%, hsl(${theme.tintHsl} / 0.4) 0%, transparent 55%),
                    linear-gradient(180deg, hsl(var(--card)) 0%, hsl(var(--parchment) / 0.65) 100%)
                  `,
                  boxShadow: `
                    0 1px 0 hsl(0 0% 100% / 0.95) inset,
                    0 0 0 1px hsl(${theme.borderHsl} / 0.04) inset,
                    0 20px 48px -28px hsl(${theme.inkHsl} / 0.32)
                  `,
                }}
              >
                {/* top hairline */}
                <div
                  aria-hidden="true"
                  className="absolute top-0 left-8 right-8 h-px"
                  style={{
                    background: `linear-gradient(90deg, transparent, hsl(${theme.borderHsl} / 0.38), transparent)`,
                  }}
                />

                {/* single restrained sprig */}
                <img
                  src={sprigImg}
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none select-none absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-16 sm:w-20 md:w-24 opacity-[0.22] group-hover:opacity-[0.38] transition-opacity duration-700"
                  style={{
                    transform: `rotate(${theme.sprigRotate}deg)`,
                    filter: "saturate(0.7)",
                  }}
                />

                {/* corner wash */}
                <div
                  aria-hidden="true"
                  className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full pointer-events-none opacity-60"
                  style={{
                    background: `radial-gradient(circle, hsl(${theme.tintHsl} / 0.2) 0%, transparent 70%)`,
                  }}
                />

                {/* Medallion + title */}
                <div className="relative flex items-start gap-4 mb-3.5">
                  <div className="relative shrink-0">
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full transition-transform duration-700 group-hover:scale-110"
                      style={{
                        background: `conic-gradient(from 210deg, hsl(${theme.tintHsl} / 0.55), transparent 35%, hsl(${theme.tintHsl} / 0.4) 70%, transparent)`,
                        padding: 1.5,
                      }}
                    />
                    <div
                      className="relative w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:-rotate-3"
                      style={{
                        background: `radial-gradient(circle at 30% 28%, hsl(${theme.tintHsl} / 0.95), hsl(${theme.tintHsl} / 0.5))`,
                        boxShadow: `
                          0 1px 0 hsl(0 0% 100% / 0.95) inset,
                          0 -1px 1px hsl(${theme.inkHsl} / 0.08) inset,
                          0 4px 14px -6px hsl(${theme.inkHsl} / 0.42)
                        `,
                      }}
                    >
                      <Icon size={18} strokeWidth={1.6} style={{ color: `hsl(${theme.inkHsl})` }} />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 pt-1.5">
                    <h3 className="font-serif text-[1.2rem] sm:text-[1.25rem] text-foreground leading-tight tracking-tight">
                      {topic.label}
                    </h3>
                  </div>
                </div>

                {/* Support description */}
                <p className="font-sans text-[13px] font-light text-muted-foreground leading-relaxed mb-5 max-w-[30ch]">
                  {topic.description}
                </p>

                {/* Ornamental divider */}
                <div
                  aria-hidden="true"
                  className="h-px w-10 mb-1"
                  style={{
                    background: `linear-gradient(90deg, hsl(${theme.borderHsl} / 0.55), transparent)`,
                  }}
                />

                {/* Inline child links */}
                <ul className="flex flex-col mb-5">
                  {children.map((c, i) => (
                    <li
                      key={c.href + i}
                      className="border-t"
                      style={{ borderColor: `hsl(${theme.borderHsl} / 0.12)` }}
                    >
                      <Link
                        to={c.href}
                        className="group/link flex items-center justify-between gap-3 py-2.5"
                      >
                        <span className="font-sans text-[13px] font-light text-foreground/75 leading-snug group-hover/link:text-foreground transition-colors">
                          {c.label}
                        </span>
                        <ArrowUpRight
                          size={13}
                          className="shrink-0 opacity-50 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all"
                          style={{ color: `hsl(${theme.inkHsl})` }}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Premium CTA */}
                <div className="pt-2 mt-auto">
                  <Link
                    to={topic.mainHref}
                    className="group/cta inline-flex items-center gap-1.5 font-sans text-[13px] font-medium tracking-wide transition-colors"
                    style={{ color: "hsl(var(--terracotta))" }}
                  >
                    <span className="relative">
                      Explore {topic.label.toLowerCase()}
                      <span
                        aria-hidden="true"
                        className="absolute left-0 right-0 -bottom-0.5 h-px scale-x-0 group-hover/cta:scale-x-100 origin-left transition-transform duration-500"
                        style={{ background: "hsl(var(--terracotta) / 0.5)" }}
                      />
                    </span>
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

        {/* SUPPORTING GUIDES — curated support library */}
        <div className="mt-20 md:mt-24">
          <div className="mb-8 md:mb-10 flex items-end justify-between gap-6 flex-wrap">
            <div>
              <Eyebrow>Supporting guides</Eyebrow>
              <h3 className="font-serif text-xl sm:text-2xl text-foreground leading-tight">
                A curated <span className="italic font-normal">support library</span>
              </h3>
            </div>
            <p className="font-sans text-[13.5px] font-light text-muted-foreground max-w-sm leading-relaxed">
              More specific TTC routes for timing, testing, and fertility
              questions — secondary reading when you want to go deeper.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {subs.map((topic) => {
              const Icon = topicIcons[topic.slug];
              return (
                <Link
                  key={topic.slug}
                  to={topic.mainHref}
                  className="group relative flex flex-col bg-card/70 rounded-2xl border p-5 sm:p-6 transition-all duration-300 hover:bg-card hover:-translate-y-0.5 overflow-hidden"
                  style={{
                    borderColor: `hsl(var(${STAGE_ACCENT}) / 0.14)`,
                    boxShadow: `0 1px 0 hsl(0 0% 100% / 0.7) inset, 0 10px 26px -22px hsl(var(${STAGE_ACCENT}) / 0.3)`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `hsl(var(${STAGE_ACCENT}) / 0.32)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `hsl(var(${STAGE_ACCENT}) / 0.14)`;
                  }}
                >
                  {/* faint corner tint */}
                  <div
                    aria-hidden="true"
                    className="absolute -top-12 -right-12 w-32 h-32 rounded-full pointer-events-none opacity-50 group-hover:opacity-80 transition-opacity"
                    style={{
                      background: `radial-gradient(circle, hsl(var(${STAGE_BG}) / 0.55) 0%, transparent 70%)`,
                    }}
                  />

                  <div className="relative flex items-center gap-2.5 mb-3">
                    <span
                      className="inline-flex w-7 h-7 rounded-full items-center justify-center"
                      style={{
                        background: `hsl(var(${STAGE_BG}) / 0.55)`,
                      }}
                    >
                      <Icon
                        size={13}
                        strokeWidth={1.7}
                        style={{ color: `hsl(var(${STAGE_ACCENT}))` }}
                      />
                    </span>
                    <span
                      className="font-sans text-[10px] font-medium tracking-[0.22em] uppercase"
                      style={{ color: `hsl(var(${STAGE_ACCENT}) / 0.95)` }}
                    >
                      Guide
                    </span>
                  </div>

                  <h4 className="relative font-serif text-[1.05rem] sm:text-[1.1rem] text-foreground leading-snug mb-2">
                    {topic.label}
                  </h4>
                  <p className="relative font-sans text-[12.5px] font-light text-muted-foreground leading-relaxed mb-5 line-clamp-3 flex-1">
                    {topic.description}
                  </p>

                  <div
                    className="relative pt-3 border-t flex items-center justify-between"
                    style={{ borderColor: `hsl(var(${STAGE_ACCENT}) / 0.12)` }}
                  >
                    <span
                      className="font-sans text-[11.5px] font-medium tracking-[0.05em]"
                      style={{ color: `hsl(var(${STAGE_ACCENT}))` }}
                    >
                      Read guide
                    </span>
                    <ArrowRight
                      size={12}
                      className="transition-transform group-hover:translate-x-0.5"
                      style={{ color: `hsl(var(${STAGE_ACCENT}))` }}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};


/* ----------------------------------------------------------- */
/* 6. REASSURANCE                                              */
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
        <AISupport />
        <JourneyTimeline />
        <TopicLibrary />
        <Reassurance />
      </main>
      <Footer />
    </div>
  );
};

export default TTCHub;
