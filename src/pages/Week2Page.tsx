import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ChevronLeft, ChevronRight, Sprout, HeartPulse, Activity, Sparkles, Calendar,
  BookOpen, ArrowRight, Check, AlertTriangle, Plus, Minus, Heart, MessageCircle,
  Leaf, Droplet, Moon, Coffee, ShieldCheck, TestTube, Phone,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PregnancyWeekSeo from "@/components/seo/PregnancyWeekSeo";
import ovulationImg from "@/assets/week2-ovulation.jpg";
import pearlImg from "@/assets/week2-pearl.jpg";
import biologyImg from "@/assets/week2-biology-detail.jpg";
import journalImg from "@/assets/journal-flatlay.jpg";
import botanicalTr from "@/assets/botanical-branch-tr.png";
import botanicalBl from "@/assets/botanical-branch-bl.png";
import botanicalAccent from "@/assets/article-botanical-accent.png";
import implantationImg from "@/assets/article-hero-implantation.jpg";
import earlySymptomsImg from "@/assets/article-hero-early-symptoms.jpg";
import emotionalImg from "@/assets/article-hero-emotional-first-tri.jpg";
import testsScansImg from "@/assets/article-hero-tests-scans.jpg";
import lifestyleImg from "@/assets/article-hero-lifestyle.jpg";
import implantationBleedImg from "@/assets/article-hero-implantation-bleeding.jpg";
import WeekReflectionAsk from "@/components/week/WeekReflectionAsk";
import WeekCommonQuestions from "@/components/week/WeekCommonQuestions";
import WeekSources from "@/components/week/WeekSources";
import { buildWeekQuestions, getWeekSources } from "@/data/weekSupportContent";

const SectionLabel = ({ children, tone = "sage" }: { children: React.ReactNode; tone?: "sage" | "terracotta" | "lavender" }) => {
  const toneCls = tone === "terracotta" ? "text-terracotta" : tone === "lavender" ? "text-lavender-foreground" : "text-sage";
  return (
    <div className="flex items-center gap-3 mb-3.5">
      <span className={`h-px w-7 bg-current opacity-50 ${toneCls}`} />
      <p className={`font-sans text-[11px] font-semibold tracking-[0.26em] uppercase ${toneCls}`}>{children}</p>
    </div>
  );
};

const Hero = () => (
  <section className="relative overflow-hidden">
    <div className="relative bg-gradient-to-br from-sage-bg/70 via-parchment to-sage-bg/40 pt-20 pb-36 sm:pt-24 sm:pb-44 md:pt-32 md:pb-52">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[820px] h-[420px] rounded-full bg-sage-light/25 blur-3xl" />
        <div className="absolute -top-10 right-1/4 w-[260px] h-[260px] rounded-full bg-terracotta/5 blur-3xl" />
      </div>
      <img src={botanicalBl} alt="" aria-hidden="true" className="pointer-events-none absolute top-20 left-0 w-[150px] lg:w-[210px] opacity-25 select-none hidden md:block" />
      <img src={botanicalTr} alt="" aria-hidden="true" className="pointer-events-none absolute top-20 right-0 w-[150px] lg:w-[210px] opacity-25 select-none hidden md:block" />

      <div className="container mx-auto px-14 sm:px-16 md:px-10 max-w-5xl relative z-10 text-center">
        <nav aria-label="breadcrumb" className="flex items-center justify-center gap-2 mb-6 sm:mb-7 font-sans text-[12px] font-normal text-foreground/65">
          <Link to="/pregnancy" className="hover:text-foreground transition-colors">Pregnancy</Link>
          <span className="text-foreground/30">›</span>
          <Link to="/pregnancy/first-trimester" className="hover:text-foreground transition-colors">Week by week</Link>
          <span className="text-foreground/30">›</span>
          <span className="text-foreground">Week 2</span>
        </nav>
        <p className="font-sans text-[11px] font-semibold tracking-[0.3em] uppercase text-sage mb-5">
          First trimester · The week of the egg
        </p>
        <h1 className="font-serif text-[2.5rem] sm:text-5xl md:text-[3.75rem] lg:text-[4.25rem] text-foreground leading-[1.04] tracking-tight mb-4 md:mb-5">
          2 Weeks Pregnant
        </h1>
        <p className="font-serif italic text-[1.05rem] sm:text-lg md:text-xl text-foreground/75 max-w-xl mx-auto leading-relaxed">
          The fertile window opens. A single mature egg is released — barely the size of a grain of sand — and conception, if it happens at all, will happen this week.
        </p>
      </div>

      <Link to="/pregnancy/week/1" aria-label="Go to week 1" className="absolute left-3 sm:left-6 md:left-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronLeft size={18} />
      </Link>
      <Link to="/pregnancy/week/3" aria-label="Go to week 3" className="absolute right-3 sm:right-6 md:right-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronRight size={18} />
      </Link>
    </div>

    <div className="relative -mt-28 sm:-mt-36 md:-mt-40 mb-6">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex items-end justify-center gap-5 sm:gap-10 md:gap-14">
          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-card border-[3px] border-sage/15 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={pearlImg} alt="A single tiny pearl on linen" loading="lazy" width={512} height={512} className="w-full h-full object-cover" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.04]" />
            </div>
            <div className="text-center">
              <p className="font-serif italic text-[12.5px] text-foreground/80 leading-tight">a grain of sand</p>
              <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/55 mt-1">~0.1 mm</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full bg-card border-[4px] border-sage/25 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={ovulationImg} alt="Soft editorial illustration of an ovary releasing a single mature egg into the fallopian tube" width={1024} height={1024} loading="eager" decoding="async" className="w-full h-full object-cover scale-[1.02]" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.05]" />
            </div>
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.22em] uppercase text-foreground/65">Your body this week</p>
          </div>

          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-sage-bg to-sage-bg/40 border-[3px] border-sage/25 flex items-center justify-center shadow-elevated">
              <span className="font-serif text-[1.7rem] sm:text-[1.95rem] text-foreground tracking-tight leading-none">38</span>
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-sage/10" />
            </div>
            <div className="text-center">
              <p className="font-serif italic text-[12.5px] text-foreground/80 leading-tight">weeks to go</p>
              <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/55 mt-1">approx.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const anchors = [
  { id: "at-a-glance", label: "At a glance", Icon: Sparkles },
  { id: "ovulation", label: "Ovulation", Icon: Sprout },
  { id: "biology", label: "What's underway", Icon: TestTube },
  { id: "body", label: "Your body", Icon: Activity },
  { id: "symptoms", label: "What you may feel", Icon: HeartPulse },
  { id: "emotional", label: "Emotionally", Icon: Heart },
  { id: "focus", label: "Focus this week", Icon: Calendar },
  { id: "support", label: "Seek support", Icon: ShieldCheck },
  { id: "guidance", label: "Read next", Icon: BookOpen },
];

const MetaBar = () => (
  <section className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl -mt-2 mb-12 relative z-10">
    <div className="bg-card rounded-2xl border border-border/40 shadow-card-brand p-5 sm:p-6 md:p-7">
      <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8">
        <div className="flex items-center gap-4 pb-5 lg:pb-0 lg:pr-7 lg:border-r border-b lg:border-b-0 border-border/30">
          <div className="w-11 h-11 rounded-full bg-sage-bg border border-sage/20 flex items-center justify-center shrink-0"><Leaf size={16} className="text-sage" /></div>
          <div className="min-w-0">
            <p className="font-sans text-[13px] font-medium text-foreground leading-snug">✔ Medically reviewed by Jenny Joines</p>
            <p className="font-sans text-[11.5px] font-normal text-foreground/60 mt-0.5">Updated for 2026 · 11 min read · Pre-conception · Ovulation week</p>
          </div>
        </div>
        <nav aria-label="On this page" className="flex-1 pt-4 lg:pt-0">
          <div className="flex gap-x-1 gap-y-2 overflow-x-auto lg:flex-wrap scrollbar-hide -mx-1 px-1">
            {anchors.map(({ id, label, Icon }) => (
              <a key={id} href={`#${id}`} className="group shrink-0 flex items-center gap-2 px-3 py-2 rounded-full hover:bg-sage-bg/60 transition-colors">
                <span className="w-7 h-7 rounded-full bg-parchment-dark/80 border border-border/30 flex items-center justify-center group-hover:border-sage/30 transition-colors">
                  <Icon size={12} className="text-sage" />
                </span>
                <span className="font-sans text-[12px] font-medium text-foreground/80 group-hover:text-foreground whitespace-nowrap">{label}</span>
              </a>
            ))}
          </div>
        </nav>
      </div>
    </div>
  </section>
);

const glanceFacts = [
  { label: "Stage", value: "Pre-conception · ovulation week" },
  { label: "Egg size", value: "~0.1 mm — grain of sand" },
  { label: "Fertile window", value: "5–6 days, peaks now" },
  { label: "Trimester", value: "1 of 3 (by dating)" },
];

const AtAGlance = () => (
  <section id="at-a-glance" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl mb-14 md:mb-20">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 relative bg-gradient-to-br from-sage-bg/55 via-parchment to-parchment-dark/50 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-10 overflow-hidden shadow-card-brand">
        <img src={botanicalAccent} alt="" aria-hidden="true" className="absolute -left-3 bottom-0 w-28 opacity-35 pointer-events-none select-none" />
        <SectionLabel>At a glance</SectionLabel>
        <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-5">
          Week 2 is when the egg is released — pregnancy may begin this week.
        </h2>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8] mb-4">
          By dating, you are "two weeks pregnant", but biologically you are mid-cycle. Around day 14, a
          single mature egg bursts from a follicle in one of your ovaries and is swept into the fallopian
          tube. It will live there for around 24 hours, waiting.
        </p>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8]">
          If sperm reach it in time, fertilisation happens. If not, the egg quietly dissolves and the
          cycle continues. Either way, this is the most important week of the cycle if you're trying.
        </p>
      </div>

      <div className="lg:col-span-2 bg-card rounded-3xl border border-border/40 p-7 md:p-8 shadow-card-brand">
        <SectionLabel>The week in numbers</SectionLabel>
        <ul className="divide-y divide-border/40 -mx-1">
          {glanceFacts.map((f) => (
            <li key={f.label} className="flex items-baseline justify-between gap-4 px-1 py-3.5 first:pt-1 last:pb-1">
              <span className="font-sans text-[11px] font-semibold tracking-[0.18em] uppercase text-foreground/60">{f.label}</span>
              <span className="font-serif text-[15px] text-foreground text-right">{f.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

const ovulationPoints = [
  { Icon: Sprout, title: "One mature egg, once a month", body: "Of the small group of follicles that began maturing in week 1, usually just one becomes dominant. Around day 14 of a 28-day cycle, that follicle ruptures and releases its egg." },
  { Icon: HeartPulse, title: "The fertile window is wider than the egg's life", body: "The egg itself only lives for around 24 hours. But sperm can survive 3–5 days in the right cervical mucus, so the fertile window is roughly the 5 days before and the day of ovulation." },
  { Icon: TestTube, title: "Signs you're ovulating", body: "Stretchy, clear cervical mucus (like raw egg white), a slight rise in basal body temperature the day after, mild one-sided pain (mittelschmerz), heightened libido, and a positive ovulation test (LH surge)." },
  { Icon: Sparkles, title: "If your cycles are irregular", body: "The day-14 rule only holds for textbook 28-day cycles. Longer or shorter cycles shift ovulation. Tracking BBT, mucus or LH strips for two or three cycles is the most honest way to find your own pattern." },
];

const Ovulation = () => (
  <section id="ovulation" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel tone="terracotta">Ovulation, in plain English</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        The single most important moment of the cycle.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        Conception can only happen in the narrow window around ovulation. Knowing roughly when yours
        falls — and not obsessing over the exact day — is usually enough.
      </p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {ovulationPoints.map(({ Icon, title, body }) => (
        <div key={title} className="relative bg-card rounded-2xl border border-border/40 p-6 md:p-7 shadow-card-brand overflow-hidden">
          <span className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-terracotta/40 to-transparent" />
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-10 rounded-full bg-stage-pregnancy/60 border border-terracotta/15 flex items-center justify-center">
              <Icon size={15} className="text-terracotta" />
            </span>
            <h3 className="font-serif text-[1.15rem] text-foreground leading-snug">{title}</h3>
          </div>
          <p className="font-sans text-[13.5px] text-foreground/70 leading-[1.75]">{body}</p>
        </div>
      ))}
    </div>

    <div className="mt-6 bg-sage-bg/45 border border-sage/20 rounded-2xl p-6 md:p-7 flex flex-col sm:flex-row sm:items-start gap-4">
      <span className="w-10 h-10 rounded-full bg-card border border-sage/20 flex items-center justify-center shrink-0">
        <Calendar size={15} className="text-sage" />
      </span>
      <p className="font-sans text-[14px] text-foreground/85 leading-[1.7]">
        <span className="font-semibold">Sex every 2–3 days through your fertile window</span>{" "}
        is the simplest and most evidence-backed approach. It removes the pressure of hitting an exact
        day and consistently gives the highest monthly chance of conception.
      </p>
    </div>
  </section>
);

const biologyPoints = [
  { title: "Oestrogen peaks", body: "In the days before ovulation, oestrogen climbs to its monthly high. It's what triggers the LH surge from your pituitary gland — the chemical signal that tells the dominant follicle to release its egg." },
  { title: "The egg is swept into the tube", body: "When the follicle ruptures, the fimbriae — finger-like fronds at the end of the fallopian tube — gently sweep the egg in. From here it has roughly 24 hours to be fertilised." },
  { title: "Cervical mucus changes", body: "Around ovulation, mucus becomes clearer, stretchier and more slippery — similar to raw egg white. This change isn't cosmetic; it's what allows sperm to survive and travel up through the cervix." },
  { title: "If sperm meet egg", body: "Fertilisation happens in the outer third of the fallopian tube. The newly formed zygote starts dividing immediately and begins a 6–10 day journey down the tube toward the womb, where implantation will happen in week 3 or 4." },
];

const Biology = () => (
  <section id="biology" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="relative rounded-3xl overflow-hidden border border-border/40 shadow-card-brand">
            <div className="aspect-[4/5]">
              <img src={biologyImg} alt="Soft watercolour illustration of an egg in the fallopian tube at the moment of fertilisation" loading="lazy" width={1024} height={1280} className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-foreground/60 to-transparent">
              <p className="font-serif italic text-[13px] text-background/95 leading-snug">
                One egg. Twenty-four hours. The narrowest, most patient doorway of the whole cycle.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <SectionLabel>What's underway biologically</SectionLabel>
          <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-5">
            A cascade of small, perfectly-timed events.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8] mb-8 max-w-2xl">
            Ovulation looks simple from the outside: an egg is released. Underneath, it's an exact
            choreography of hormones, follicles and tissue, all timed to the hour. And if fertilisation
            happens this week, the very first cell of a future baby begins dividing within minutes.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {biologyPoints.map((p, i) => (
              <div key={p.title} className="relative bg-card rounded-2xl border border-border/40 p-6 md:p-7 shadow-card-brand">
                <span className="absolute top-5 right-5 font-serif italic text-[12px] text-sage/70">0{i + 1}</span>
                <h3 className="font-serif text-[1.15rem] text-foreground mb-2 pr-7">{p.title}</h3>
                <p className="font-sans text-[13.5px] text-foreground/70 leading-[1.7]">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const bodyNotes = [
  { Icon: Droplet, title: "Egg-white cervical mucus", body: "Mucus becomes clearer, stretchier and more slippery for two to three days around ovulation. This is the most reliable, free, body-led signal of the fertile window." },
  { Icon: Activity, title: "Mid-cycle twinge (mittelschmerz)", body: "A small one-sided ache or twinge low in the belly as the follicle ruptures. Mild, brief, and a useful pointer to which side ovulated this month." },
  { Icon: HeartPulse, title: "A small temperature shift", body: "The day after ovulation, basal body temperature usually rises by around 0.2–0.5°C and stays raised until your next period. It confirms ovulation has happened, but only after the fact." },
];

const Body = () => (
  <section id="body" className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="max-w-2xl mb-10">
        <SectionLabel tone="terracotta">Your body this week</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
          Subtle signals — if you know where to look.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
          Most of the changes this week are quiet. Some people feel ovulation clearly; others never
          notice it. Both are normal. The body's signals are real even when you don't track them.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {bodyNotes.map(({ Icon, title, body }) => (
          <div key={title} className="relative bg-card rounded-2xl border border-border/40 p-6 md:p-7 shadow-card-brand overflow-hidden">
            <span className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sage/30 to-transparent" />
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 rounded-full bg-sage-bg border border-sage/15 flex items-center justify-center">
                <Icon size={15} className="text-sage" />
              </span>
              <h3 className="font-serif text-[1.2rem] text-foreground">{title}</h3>
            </div>
            <p className="font-sans text-[13.5px] text-foreground/70 leading-[1.75]">{body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const symptoms = [
  { Icon: Droplet, name: "Egg-white cervical mucus", feels: "Slippery, stretchy, clear discharge for 2–3 days. Stretches between fingers like raw egg white.", why: "Rising oestrogen changes the texture of mucus to help sperm survive and travel up through the cervix.", normal: "Universal in ovulating cycles. The clearest free indicator that you're in the fertile window." },
  { Icon: Activity, name: "Mittelschmerz (mid-cycle pain)", feels: "A short, mild ache low on one side of the lower abdomen, sometimes lasting minutes, sometimes a few hours.", why: "The follicle ruptures and releases a small amount of fluid into the pelvic cavity, which is mildly irritating.", normal: "Common and harmless. Severe one-sided pain, especially with dizziness, faintness or shoulder-tip pain, is different and needs urgent assessment." },
  { Icon: HeartPulse, name: "Heightened libido", feels: "Suddenly more interested in sex than usual, often without realising why.", why: "Oestrogen and testosterone both peak around ovulation — your biology is gently nudging you toward conception.", normal: "Universal in textbook cycles, though far from everyone notices." },
  { Icon: Heart, name: "Breast tenderness or fullness", feels: "Slightly swollen, tender or sensitive breasts, especially in the days after ovulation.", why: "Progesterone rises after ovulation and acts on breast tissue.", normal: "Common in the second half of the cycle; not a reliable sign of pregnancy on its own." },
  { Icon: Sparkles, name: "Light spotting", feels: "Very light pink or brown spotting for less than a day around ovulation.", why: "A small drop in oestrogen at ovulation can cause a brief shed.", normal: "Common, harmless. Repeated mid-cycle bleeding deserves a GP appointment." },
];

const Symptoms = () => (
  <section id="symptoms" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel>Common signs this week</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        Ovulation signs, not yet pregnancy signs.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        Anything you feel this week is a sign of ovulation, not pregnancy. Even if conception happens
        today, the earliest pregnancy symptoms can't appear until after implantation — about a week or
        ten days from now.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
      {symptoms.map(({ Icon, name, feels, why, normal }) => (
        <article key={name} className="group relative bg-card rounded-2xl border border-border/40 p-6 md:p-7 shadow-card-brand hover:shadow-soft transition-all duration-500">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border/40">
            <span className="w-10 h-10 rounded-full bg-stage-pregnancy/60 flex items-center justify-center">
              <Icon size={15} className="text-terracotta" />
            </span>
            <h3 className="font-serif text-[1.2rem] text-foreground leading-snug">{name}</h3>
          </div>
          <dl className="space-y-3.5">
            <div><dt className="font-sans text-[10.5px] font-semibold tracking-[0.2em] uppercase text-sage mb-1">What it feels like</dt><dd className="font-sans text-[13.5px] text-foreground/80 leading-[1.7]">{feels}</dd></div>
            <div><dt className="font-sans text-[10.5px] font-semibold tracking-[0.2em] uppercase text-sage mb-1">Why it happens</dt><dd className="font-sans text-[13.5px] text-foreground/75 leading-[1.7]">{why}</dd></div>
            <div><dt className="font-sans text-[10.5px] font-semibold tracking-[0.2em] uppercase text-sage mb-1">Is it normal?</dt><dd className="font-sans text-[13.5px] text-foreground/75 leading-[1.7]">{normal}</dd></div>
          </dl>
        </article>
      ))}
    </div>
  </section>
);

const emotionalTruths = [
  "Excitement and pressure tangled together every day this week.",
  "Sex starting to feel like an appointment.",
  "Watching for every twinge as a possible sign.",
  "Wondering if today is the day, and trying not to ask.",
  "Whispered conversations about whether to test early.",
  "A quiet, private hope you can barely admit out loud.",
];

const Emotional = () => (
  <section id="emotional" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 relative bg-gradient-to-br from-lavender-bg via-parchment to-lavender-bg/40 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-9 shadow-card-brand overflow-hidden">
          <img src={botanicalAccent} alt="" aria-hidden="true" className="absolute right-0 top-0 w-24 opacity-35 pointer-events-none select-none" />
          <SectionLabel tone="lavender">Emotionally this week</SectionLabel>
          <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-4">
            Hopeful, alert, and a little bit braced.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/80 leading-[1.8] mb-4">
            Week 2 carries a particular kind of charged quiet. You can do everything right and still not
            conceive this month — and most months, that's how it goes. Holding hope without letting it
            harden into pressure is its own quiet skill.
          </p>
          <p className="font-sans text-[14px] text-foreground/70 leading-[1.75]">
            Try to keep some of the rest of life louder than the trying.
          </p>
        </div>

        <div className="lg:col-span-3 bg-card rounded-3xl border border-border/40 p-7 sm:p-8 md:p-9 shadow-card-brand">
          <p className="font-sans text-[11px] font-semibold tracking-[0.24em] uppercase text-sage mb-4">What this week often looks like</p>
          <ul className="space-y-3.5">
            {emotionalTruths.map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-lavender shrink-0" />
                <span className="font-serif italic text-[15px] text-foreground/85 leading-[1.65]">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

const focusList = [
  { Icon: Sprout, title: "Keep taking folic acid daily", note: "400 micrograms every day. If conception happens this week, the cell that becomes your baby starts dividing within hours — folate matters from the very first day." },
  { Icon: HeartPulse, title: "Sex every 2–3 days through the fertile window", note: "Trying to hit an exact ovulation day is more stressful and no more effective than a steady 2–3 day rhythm. Frequency beats precision, every time." },
  { Icon: Droplet, title: "Notice cervical mucus", note: "Free, body-led, and more reliable than apps for finding your fertile window. Stretchy egg-white mucus = peak fertility." },
  { Icon: Coffee, title: "Stay below 200 mg of caffeine", note: "About two mugs of tea or one strong coffee. Stop alcohol if you can — if you do conceive, fertilisation is happening this week." },
  { Icon: Moon, title: "Sleep, not effort", note: "Ovulation is hormone-led. Chronic poor sleep, undereating or overtraining can quietly suppress it. Steady, kind routines do more than effort." },
  { Icon: Sparkles, title: "Decide your testing rules in advance", note: "A reliable home test won't show a true positive until at least the day your period is due. Set a date now — it saves you from the spiral of testing too early and reading invisible lines." },
];

const Focus = () => (
  <section id="focus" className="bg-sage-bg/35 py-16 md:py-24 border-y border-border/30">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <SectionLabel tone="terracotta">Focus this week</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.2rem] text-foreground leading-tight mb-4">
            Steady rhythm beats perfect timing.
          </h2>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8]">
            The most fertile thing you can do this week is keep your life calm and your rhythm steady.
            The body does the rest.
          </p>
        </div>
        <div className="lg:col-span-8">
          <ol className="bg-card rounded-3xl border border-border/40 shadow-card-brand divide-y divide-border/40 overflow-hidden">
            {focusList.map(({ Icon, title, note }, i) => (
              <li key={title} className="group flex items-start gap-5 p-5 sm:p-6 md:p-7 hover:bg-sage-bg/25 transition-colors">
                <span className="w-10 h-10 rounded-full bg-stage-pregnancy/60 border border-border/40 flex items-center justify-center shrink-0">
                  <Icon size={15} className="text-terracotta" />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 mb-1.5">
                    <span className="font-serif italic text-[12px] text-sage/70">0{i + 1}</span>
                    <h3 className="font-sans text-[14.5px] font-semibold text-foreground leading-snug">{title}</h3>
                  </div>
                  <p className="font-sans text-[13px] text-foreground/70 leading-[1.7]">{note}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  </section>
);

const seekSupport = [
  "Severe one-sided pain, especially with dizziness or shoulder-tip pain",
  "No sign of ovulation across several tracked cycles",
  "Cycles that are repeatedly very long, very short, or absent",
  "Pain during sex that puts you off trying",
  "12+ months of trying (6+ months if you're 35 or older)",
  "A history of fertility issues, miscarriage or ectopic pregnancy",
  "Heavy or unexplained mid-cycle bleeding",
  "Persistent low mood or anxiety around trying",
];

const SeekSupport = () => (
  <section id="support" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl pt-16 md:pt-24 pb-12">
    <div className="relative bg-gradient-to-br from-stage-pregnancy/55 via-parchment to-parchment-dark/40 rounded-3xl border border-terracotta/20 p-8 md:p-10 shadow-card-brand overflow-hidden">
      <span className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-terracotta/30 to-transparent" />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
        <div className="md:col-span-4">
          <span className="inline-flex w-12 h-12 rounded-full bg-terracotta/15 items-center justify-center mb-4">
            <AlertTriangle size={18} className="text-terracotta" />
          </span>
          <SectionLabel tone="terracotta">When to seek care</SectionLabel>
          <h3 className="font-serif text-[1.4rem] sm:text-[1.5rem] md:text-[1.7rem] text-foreground leading-snug">
            Pre-conception care is real care. You don't have to wait for something to be wrong.
          </h3>
          <p className="font-sans text-[13.5px] text-foreground/70 leading-[1.75] mt-3">
            Your GP can run baseline checks, talk through cycle tracking, and refer onwards. Ask early
            rather than late.
          </p>
        </div>
        <ul className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5 self-center">
          {seekSupport.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-2 shrink-0" />
              <span className="font-sans text-[13.5px] text-foreground/85 leading-[1.7]">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

const Quote = () => (
  <section className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl pb-16 md:pb-24">
    <div className="relative bg-sage-bg/45 rounded-3xl border border-border/30 p-8 sm:p-10 md:p-14 text-center overflow-hidden">
      <span className="absolute left-7 top-6 font-serif text-4xl text-sage/40 leading-none">“</span>
      <span className="absolute right-7 bottom-4 font-serif text-4xl text-sage/40 leading-none">”</span>
      <p className="font-serif italic text-[1.2rem] sm:text-[1.35rem] md:text-[1.6rem] text-foreground/90 leading-snug max-w-3xl mx-auto">
        Hope is allowed to be quiet. It doesn't have to be perfectly calibrated to be real.
      </p>
      <Heart size={14} className="text-sage/60 mx-auto mt-5" />
    </div>
  </section>
);

const reflectionPrompts = ["What I'm hoping for this cycle", "What helped me feel grounded", "What I noticed in my body", "A note for my future self"];
const askChips = ["When in my cycle is the fertile window?", "How do I track ovulation?", "When can I test?", "Is mid-cycle pain normal?", "Does timing really matter?"];

const Journal = () => (
  <section className="bg-sage-bg/40 py-16 md:py-24 border-y border-border/30">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="bg-card rounded-3xl border border-border/30 overflow-hidden shadow-elevated grid grid-cols-1 md:grid-cols-2">
        <div className="aspect-[4/3] md:aspect-auto md:min-h-[420px] relative overflow-hidden">
          <img src={journalImg} alt="The Start of You journal flatlay" loading="lazy" width={1200} height={900} className="w-full h-full object-cover object-[50%_45%]" />
        </div>
        <div className="p-7 sm:p-9 md:p-12 flex flex-col justify-center">
          <SectionLabel>The Start of You journal</SectionLabel>
          <h3 className="font-serif text-[1.65rem] sm:text-[1.8rem] md:text-[2.1rem] text-foreground leading-tight mb-4">
            The week the door opens, briefly.
          </h3>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8] mb-6">
            Write the date you noticed the egg-white mucus. The conversations you had this week. The
            quiet hope you didn't tell anyone about. Months from now, when you look back, the journal
            will hold the moment the cycle that worked actually began.
          </p>
          <ul className="space-y-2.5 mb-7">
            {[
              "A page for noticing your own cycle, gently",
              "Prompts for the trying months, not just the news",
              "All the way through to birth and the first year",
            ].map((line) => (
              <li key={line} className="flex items-start gap-2.5">
                <Check size={13} className="text-sage mt-1 shrink-0" />
                <span className="font-sans text-[13.5px] text-foreground/80">{line}</span>
              </li>
            ))}
          </ul>
          <Link to="/journal" className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-6 py-3 font-sans text-[13.5px] font-medium shadow-cta hover:bg-terracotta-hover transition-colors w-fit">
            Discover the journal <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const related = [
  { slug: "ovulation-and-the-fertile-window", img: implantationImg, tag: "Cycle",
    title: "Ovulation and the fertile window, explained",
    desc: "When ovulation actually happens, the body's signals, and why the 5–6 day window matters more than the exact day." },
  { slug: "tracking-your-cycle", img: testsScansImg, tag: "Tracking",
    title: "BBT, mucus and LH strips: how to track without obsessing",
    desc: "A calm guide to the tracking methods that actually work — and how to stop them taking over your month." },
  { slug: "the-two-week-wait-emotionally", img: emotionalImg, tag: "Emotions",
    title: "The two-week wait, emotionally",
    desc: "What the days between ovulation and a possible test really feel like, and how to be kinder to yourself through them." },
  { slug: "preparing-your-body-for-pregnancy", img: lifestyleImg, tag: "Pre-conception",
    title: "Quietly preparing your body to conceive",
    desc: "Folic acid, alcohol, sleep and weight — the small changes that genuinely matter before a positive test." },
  { slug: "early-pregnancy-symptoms-explained", img: earlySymptomsImg, tag: "Symptoms",
    title: "When pregnancy symptoms can actually start",
    desc: "Why anything you feel in week 2 is ovulation, not pregnancy — and what the very first true signs look like." },
  { slug: "implantation-bleeding-vs-period", img: implantationBleedImg, tag: "Spotting",
    title: "Implantation bleeding or period?",
    desc: "Looking ahead — how to tell the difference if light spotting shows up in a week or two." },
];

const Related = () => (
  <section id="guidance" className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div className="max-w-xl">
          <SectionLabel>Read next, because of week 2</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.4rem] text-foreground leading-tight">
            Curated guidance for the week of the egg.
          </h2>
        </div>
        <Link to="/pregnancy/first-trimester" className="inline-flex items-center gap-1.5 font-sans text-[13.5px] font-medium text-sage hover:gap-2.5 transition-all whitespace-nowrap">
          Browse all guidance <ArrowRight size={12} />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {related.map((a) => (
          <Link key={a.slug} to={`/articles/${a.slug}`} className="group flex flex-col bg-card rounded-2xl overflow-hidden border border-border/30 shadow-card-brand hover:shadow-soft hover:-translate-y-1 transition-all duration-500">
            <div className="aspect-[5/4] overflow-hidden">
              <img src={a.img} alt={a.title} loading="lazy" width={640} height={512} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <span className="font-sans text-[10.5px] font-semibold tracking-[0.22em] uppercase text-terracotta mb-3">{a.tag}</span>
              <h3 className="font-serif text-[1.15rem] text-foreground leading-snug mb-3 group-hover:text-sage transition-colors">{a.title}</h3>
              <p className="font-sans text-[13px] text-foreground/70 leading-[1.7] flex-1 mb-4">{a.desc}</p>
              <span className="inline-flex items-center gap-1.5 font-sans text-[12.5px] font-medium text-sage group-hover:gap-2.5 transition-all">Read guide <ArrowRight size={11} /></span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

const faqs = [
  { q: "Am I actually pregnant in week 2?",
    a: "Almost certainly not yet. By the dating system, week 2 is the week of ovulation — so conception, if it happens this cycle, will happen this week or in the days after. You won't be biologically pregnant until fertilisation, and you won't be detectably pregnant on a test until at least a week or so after that, when implantation has happened and hCG starts to rise." },
  { q: "When exactly is the fertile window?",
    a: "Roughly the 5 days before ovulation and the day of ovulation itself, with peak fertility in the 2–3 days just before. Sperm can survive 3–5 days in the right cervical mucus; the egg lives for about 24 hours. In a 28-day cycle ovulation is usually around day 14, but it can shift by several days from cycle to cycle and from person to person." },
  { q: "Do I have to use ovulation tests?",
    a: "No. They can be helpful — particularly for irregular cycles or when planning around shift work or travel — but they aren't required. For most people, having sex every 2–3 days throughout the cycle achieves a similar conception rate without the pressure or expense of testing." },
  { q: "What does egg-white cervical mucus actually look like?",
    a: "Clear, slippery, stretchy. If you can stretch it between your fingers without it breaking, that's classic egg-white mucus. It usually shows up for 2–3 days in the lead-up to ovulation. After ovulation, mucus typically becomes thicker, stickier or drier as progesterone rises." },
  { q: "Is mid-cycle cramping (mittelschmerz) normal?",
    a: "Yes — a brief, mild, one-sided ache around ovulation is common and harmless. It happens when the follicle ruptures and releases a small amount of fluid that gently irritates the surrounding tissue. Severe one-sided pain, especially with dizziness, faintness, or shoulder-tip pain, is different and should be assessed urgently." },
  { q: "How soon could I take a pregnancy test?",
    a: "A reliable home pregnancy test will only show a true positive from around the day your period would have been due — usually about 14 days after ovulation. Some tests claim to work earlier, but the false-negative (and false-positive) rate is much higher. Testing too early is the most common source of unnecessary distress this cycle." },
  { q: "Can stress stop me ovulating?",
    a: "Significant chronic stress, very intense exercise, undereating or major life upheaval can all delay or suppress ovulation in some people. The everyday stress of trying to conceive itself, while horrible, doesn't usually do this. If your cycles are clearly disrupted, talk to your GP — there are often kind, treatable reasons behind it." },
  { q: "We've been trying a while. When should we ask for help?",
    a: "Standard guidance in the UK is to see your GP after 12 months of regular unprotected sex if you're under 35, or after 6 months if you're 35 or older. If you have known issues — irregular cycles, history of miscarriage, ectopic pregnancy, certain medical conditions — you can ask for an earlier referral. You don't have to wait it out alone." },
];

const Next = () => (
  <section className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
      <div className="bg-gradient-to-br from-sage-bg via-parchment to-stage-pregnancy/30 rounded-3xl border border-border/30 p-8 sm:p-10 md:p-14 text-center shadow-card-brand">
        <SectionLabel>Up next</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.5rem] text-foreground leading-tight mb-3">Ready for week 3?</h2>
        <p className="font-sans text-[14.5px] text-foreground/75 max-w-lg mx-auto mb-8 leading-[1.8]">
          Next week — if conception has happened — a tiny ball of cells travels down your fallopian
          tube and begins to burrow into the lining of your womb. The first quiet days of pregnancy.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
          <Link to="/pregnancy/week/3" className="inline-flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium shadow-cta hover:bg-terracotta-hover transition-colors">
            Continue to week 3 <ArrowRight size={14} />
          </Link>
          <Link to="/pregnancy/first-trimester" className="inline-flex items-center justify-center gap-2 border border-foreground/25 text-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium hover:bg-parchment-dark transition-colors">
            Explore the first trimester
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const Week2Page = () => (
  <div className="min-h-screen bg-parchment">
    <PregnancyWeekSeo weekNumber={2} />
    <Navbar />
    <Hero />
    <MetaBar />
    <AtAGlance />
    <Ovulation />
    <Biology />
    <Body />
    <Symptoms />
    <Emotional />
    <Focus />
    <SeekSupport />
    <Quote />
    <WeekReflectionAsk week={2} reflectionPrompts={reflectionPrompts} askChips={askChips} />
    <Journal />
    <Related />
    <WeekCommonQuestions week={2} questions={buildWeekQuestions(2, faqs)} />
    <WeekSources week={2} sources={getWeekSources(2)} />
    <Next />
    <Footer />
  </div>
);

export default Week2Page;
