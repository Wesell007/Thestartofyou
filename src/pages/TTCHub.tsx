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
import TTCCommonQuestions from "@/components/ttc/TTCCommonQuestions";
import TTCIVFPathway from "@/components/ttc/TTCIVFPathway";
import SeoHead from "@/components/seo/SeoHead";
import { navigateToAsk } from "@/lib/askNavigation";
import TTCHubJourneyAction from "@/components/ttc/TTCHubJourneyAction";

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

              <div className="mt-6">
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

const ttcAIChips = [
  "When am I most fertile?",
  "Is late ovulation normal?",
  "When should I take a pregnancy test?",
  "What should I do before trying?",
  "When should I ask for help?",
];

const AISupport = () => {
  const navigate = useNavigate();
  const askPrompt = (q: string) => {
    navigateToAsk(navigate, q, { context: "Trying to conceive", stage: "ttc" });
  };

  return (
    <section className="py-16 md:py-24 bg-parchment relative overflow-hidden">
      {/* Outer ambient sage wash — seats the inner card */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
        style={{
          background: `radial-gradient(60% 80% at 50% 0%, hsl(var(${STAGE_BG}) / 0.5) 0%, transparent 70%)`,
        }}
      />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl relative z-10">
        <div
          className="relative rounded-[2rem] overflow-hidden border"
          style={{
            background: `linear-gradient(180deg, hsl(var(--card)) 0%, hsl(var(${STAGE_BG}) / 0.22) 100%)`,
            borderColor: `hsl(var(${STAGE_ACCENT}) / 0.22)`,
            boxShadow: `
              0 1px 0 hsl(0 0% 100% / 0.85) inset,
              0 0 0 1px hsl(var(${STAGE_ACCENT}) / 0.04),
              0 30px 80px -40px hsl(var(${STAGE_ACCENT}) / 0.4),
              0 8px 24px -16px hsl(var(${STAGE_ACCENT}) / 0.18)
            `,
          }}
        >
          {/* TTC identity sprig */}
          <img
            src={sprigImg}
            alt=""
            aria-hidden="true"
            className="hidden sm:block absolute top-5 right-5 md:top-6 md:right-7 w-12 md:w-14 opacity-45 pointer-events-none select-none rotate-[14deg]"
          />

          <div className="relative z-10 px-6 sm:px-10 md:px-14 py-12 md:py-14 text-center">
            <Eyebrow>Your companion</Eyebrow>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-[2.125rem] text-foreground leading-[1.15] mb-3.5">
              What's on your mind <span className="italic font-normal">right now?</span>
            </h2>
            <p className="font-sans text-[14.5px] sm:text-[15px] font-light text-muted-foreground max-w-xl mx-auto leading-relaxed mb-8">
              Calm, practical guidance on ovulation, cycle tracking, testing,
              fertility — and what to do next.
            </p>

            {/* Hairline divider — frames input as a distinct action area */}
            <div
              aria-hidden="true"
              className="mx-auto mb-6 h-px w-24"
              style={{
                background: `linear-gradient(90deg, transparent, hsl(var(${STAGE_ACCENT}) / 0.35), transparent)`,
              }}
            />

            <p
              className="font-sans text-[10.5px] font-medium tracking-[0.22em] uppercase mb-4"
              style={{ color: `hsl(var(${STAGE_ACCENT}) / 0.85)` }}
            >
              Ask the guide
            </p>

            <div
              className="max-w-2xl mx-auto rounded-2xl p-1 sm:p-1.5"
              style={{
                background: `linear-gradient(180deg, hsl(var(--parchment) / 0.7), hsl(var(--parchment) / 0.25))`,
                border: `1px solid hsl(var(${STAGE_ACCENT}) / 0.14)`,
                boxShadow: `0 1px 0 hsl(0 0% 100% / 0.6) inset`,
              }}
            >
              <AISearchBar
                placeholder="Ask anything about trying to conceive…"
                suggestions={[]}
                context="Trying to conceive"
                stage="ttc"
                inputLabel="Ask about trying to conceive"
              />
            </div>

            {/* Premium TTC chip row — all 5 prompts, tactile two-tone */}
            <div className="mt-7 flex flex-wrap justify-center gap-2 sm:gap-2.5">
              {ttcAIChips.map((q) => (
                <button
                  key={q}
                  onClick={() => askPrompt(q)}
                  className="group/chip relative inline-flex items-center gap-2 rounded-pill pl-3 pr-4 py-2 sm:py-2.5 font-sans text-[12.5px] sm:text-[13px] font-light text-foreground/85 transition-all duration-300 hover:-translate-y-0.5 min-h-[36px]"
                  style={{
                    background: `linear-gradient(180deg, hsl(var(--card)) 0%, hsl(var(${STAGE_BG}) / 0.3) 100%)`,
                    border: `1px solid hsl(var(${STAGE_ACCENT}) / 0.18)`,
                    boxShadow: `0 1px 0 hsl(0 0% 100% / 0.7) inset, 0 4px 10px -6px hsl(var(${STAGE_ACCENT}) / 0.25)`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `hsl(var(${STAGE_ACCENT}) / 0.4)`;
                    e.currentTarget.style.background = `linear-gradient(180deg, hsl(var(${STAGE_BG}) / 0.4) 0%, hsl(var(${STAGE_BG}) / 0.6) 100%)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `hsl(var(${STAGE_ACCENT}) / 0.18)`;
                    e.currentTarget.style.background = `linear-gradient(180deg, hsl(var(--card)) 0%, hsl(var(${STAGE_BG}) / 0.3) 100%)`;
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: `hsl(var(${STAGE_ACCENT}) / 0.75)` }}
                  />
                  <span>{q}</span>
                </button>
              ))}
            </div>

            <p className="mt-7 font-sans text-[11.5px] font-light text-muted-foreground/70 max-w-md mx-auto">
              For health concerns or urgent symptoms, speak to a qualified
              healthcare professional.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ----------------------------------------------------------- */
/* 4. JOURNEY TIMELINE                                         */
/* ----------------------------------------------------------- */

const stages = [
  { label: "Understanding your cycle", desc: "Understand your dates, symptoms, and usual rhythm." },
  { label: "Timing and tracking", desc: "Find your fertile window and learn the signs your body may show." },
  { label: "Waiting and testing", desc: "Move through the wait, know when to test, and understand possible next steps." },
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

        <ol className="relative grid grid-cols-1 sm:grid-cols-3 gap-y-12 md:gap-y-0 md:gap-x-8">
          {stages.map((s, i) => (
            <li key={s.label} className="relative text-center md:px-3">
              <div className="relative inline-flex items-center justify-center mb-5">
                <span
                  className="relative inline-flex w-14 h-14 rounded-full items-center justify-center font-serif text-[15px] tracking-wide"
                  style={{
                    background: `radial-gradient(circle at 30% 28%, hsl(var(--card)), hsl(var(${STAGE_BG}) / 0.55))`,
                    color: `hsl(var(${STAGE_ACCENT}))`,
                    border: `1px solid hsl(var(${STAGE_ACCENT}) / 0.32)`,
                    boxShadow: `0 1px 0 hsl(0 0% 100% / 0.95) inset, 0 8px 22px -14px hsl(var(${STAGE_ACCENT}) / 0.35)`,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

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
    { label: "IVF & fertility treatment", href: "/ivf" },
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

        {/* BRIDGE — understated link between Core topics and Supporting guides */}
        <div className="mt-16 md:mt-20 text-center">
          <p className="font-serif italic text-[14px] sm:text-[15px] text-foreground/55 leading-relaxed">
            and a wider library to go deeper
          </p>
        </div>

        {/* EXPLORE TTC TOPICS — grouped topic directory (pillars + subtopics) */}
        <div className="mt-8 md:mt-10">
          <div className="mb-10 md:mb-12 max-w-2xl">
            <Eyebrow>Explore</Eyebrow>
            <h3 className="font-serif text-xl sm:text-2xl text-foreground leading-tight mb-3">
              Explore <span className="italic font-normal">TTC topics</span>
            </h3>
            <p className="font-sans text-[14px] font-light text-muted-foreground leading-relaxed">
              Choose the area that matches what you are trying to understand next.
            </p>
          </div>

          {(() => {
            const clusters: { label: string; slugs: TTCTopicSlug[] }[] = [
              { label: "Timing, testing and waiting", slugs: ["cycle-tracking", "two-week-wait", "pregnancy-tests"] },
              { label: "Health and preparation", slugs: ["conditions"] },
              { label: "Fertility support", slugs: ["age-and-fertility", "male-fertility", "ivf-and-treatment"] },
            ];
            const topicsBySlug = new Map(ttcTopics.map((s) => [s.slug, s]));

            return clusters.map((cluster, ci) => (
              <div key={cluster.label} className={ci === 0 ? "" : "mt-12 md:mt-14"}>
                <p className="font-serif italic text-[14px] text-foreground/65 mb-5 md:mb-6">
                  {cluster.label}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                  {cluster.slugs.map((slug) => {
                    const topic = topicsBySlug.get(slug);
                    if (!topic) return null;
                    const Icon = topicIcons[topic.slug];
                    const tag = cluster.label.toUpperCase();
                    return (
                      <Link
                        key={topic.slug}
                        to={topic.mainHref}
                        className="group relative flex flex-col bg-card/70 rounded-2xl border p-6 sm:p-7 transition-all duration-300 hover:bg-card hover:-translate-y-0.5"
                        style={{
                          borderColor: `hsl(var(${STAGE_ACCENT}) / 0.16)`,
                          boxShadow: `0 1px 0 hsl(0 0% 100% / 0.7) inset, 0 8px 22px -18px hsl(var(${STAGE_ACCENT}) / 0.28)`,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = `hsl(var(${STAGE_ACCENT}) / 0.36)`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = `hsl(var(${STAGE_ACCENT}) / 0.16)`;
                        }}
                      >
                        <p
                          className="font-sans text-[10px] font-medium tracking-[0.22em] uppercase mb-3"
                          style={{ color: `hsl(var(${STAGE_ACCENT}) / 0.9)` }}
                        >
                          {tag}
                        </p>

                        <div className="flex items-start gap-2.5 mb-3">
                          <Icon
                            size={14}
                            strokeWidth={1.7}
                            className="mt-1 shrink-0"
                            style={{ color: `hsl(var(${STAGE_ACCENT}))` }}
                          />
                          <h4 className="font-serif text-[1.05rem] sm:text-[1.1rem] text-foreground leading-snug">
                            <span className="relative inline">
                              {topic.label}
                              <span
                                aria-hidden="true"
                                className="absolute left-0 right-0 -bottom-0.5 h-px scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
                                style={{ background: `hsl(var(${STAGE_ACCENT}) / 0.45)` }}
                              />
                            </span>
                          </h4>
                        </div>

                        <p className="font-sans text-[13px] font-light text-muted-foreground leading-[1.7] flex-1">
                          {topic.description}
                        </p>

                        <div className="mt-5 inline-flex items-center gap-1.5">
                          <span
                            className="font-sans text-[11.5px] font-medium tracking-[0.05em]"
                            style={{ color: `hsl(var(${STAGE_ACCENT}))` }}
                          >
                            Explore topic
                          </span>
                          <ArrowRight
                            size={12}
                            className="transition-transform group-hover:translate-x-1"
                            style={{ color: `hsl(var(${STAGE_ACCENT}))` }}
                          />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ));
          })()}
        </div>
      </div>
    </section>
  );
};


/* ----------------------------------------------------------- */
/* 9. FINAL JOURNEY ACTION                                     */
/* ----------------------------------------------------------- */

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
      <SeoHead
        title="Trying to Conceive Guide | Fertility, Ovulation & Support"
        description="Calm, practical guidance for trying to conceive, including ovulation, fertile windows, cycle tracking, fertility health, pregnancy tests and the two-week wait."
        canonical="https://thestartofyou.com/trying-to-conceive"
      />
      <Navbar />
      <main>
        <Hero />
        <WhatThisCovers />
        <JourneyTimeline />
        <TopicLibrary />
        <TTCIVFPathway />
        <TTCCommonQuestions />
        <AISupport />
        <TTCHubJourneyAction />
      </main>
      <Footer />
    </div>
  );
};

export default TTCHub;
