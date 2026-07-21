import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Sprout,
  HeartPulse,
  Activity,
  Sparkles,
  Calendar,
  BookOpen,
  ArrowRight,
  Check,
  AlertTriangle,
  Plus,
  Minus,
  Heart,
  MessageCircle,
  Leaf,
  Droplet,
  Moon,
  Coffee,
  ShieldCheck,
  Stethoscope,
  TestTube,
  Phone,
  Hourglass,
  Compass,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PregnancyWeekSeo from "@/components/seo/PregnancyWeekSeo";
import fertilisationImg from "@/assets/week3-fertilisation.jpg";
import grainImg from "@/assets/week3-grain.jpg";
import biologyImg from "@/assets/week3-biology-detail.jpg";
import journalImg from "@/assets/journal-flatlay.jpg";
import botanicalTr from "@/assets/botanical-branch-tr.png";
import botanicalBl from "@/assets/botanical-branch-bl.png";
import botanicalAccent from "@/assets/article-botanical-accent.png";
import implantationImg from "@/assets/article-hero-implantation.jpg";
import implantationBleedImg from "@/assets/article-hero-implantation-bleeding.jpg";
import earlySymptomsImg from "@/assets/article-hero-early-symptoms.jpg";
import emotionalImg from "@/assets/article-hero-emotional-first-tri.jpg";
import testsScansImg from "@/assets/article-hero-tests-scans.jpg";
import lifestyleImg from "@/assets/article-hero-lifestyle.jpg";

/* Shared label */
const SectionLabel = ({ children, tone = "sage" }: { children: React.ReactNode; tone?: "sage" | "terracotta" | "lavender" }) => {
  const toneCls =
    tone === "terracotta" ? "text-terracotta"
    : tone === "lavender" ? "text-lavender-foreground"
    : "text-sage";
  return (
    <div className="flex items-center gap-3 mb-3.5">
      <span className={`h-px w-7 bg-current opacity-50 ${toneCls}`} />
      <p className={`font-sans text-[11px] font-semibold tracking-[0.26em] uppercase ${toneCls}`}>{children}</p>
    </div>
  );
};

/* 1. HERO */
const Hero = () => (
  <section className="relative overflow-hidden">
    <div className="relative bg-gradient-to-br from-lavender-bg/60 via-parchment to-sage-bg/40 pt-20 pb-36 sm:pt-24 sm:pb-44 md:pt-32 md:pb-52">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[820px] h-[420px] rounded-full bg-lavender-bg/40 blur-3xl" />
        <div className="absolute -top-10 right-1/4 w-[260px] h-[260px] rounded-full bg-sage/5 blur-3xl" />
      </div>
      <img src={botanicalBl} alt="" aria-hidden="true"
        className="pointer-events-none absolute top-20 left-0 w-[150px] lg:w-[210px] opacity-25 select-none hidden md:block" />
      <img src={botanicalTr} alt="" aria-hidden="true"
        className="pointer-events-none absolute top-20 right-0 w-[150px] lg:w-[210px] opacity-25 select-none hidden md:block" />

      <div className="container mx-auto px-14 sm:px-16 md:px-10 max-w-5xl relative z-10 text-center">
        <nav aria-label="breadcrumb" className="flex items-center justify-center gap-2 mb-6 sm:mb-7 font-sans text-[12px] font-normal text-foreground/65">
          <Link to="/pregnancy" className="hover:text-foreground transition-colors">Pregnancy</Link>
          <span className="text-foreground/30">›</span>
          <Link to="/pregnancy/first-trimester" className="hover:text-foreground transition-colors">Week by week</Link>
          <span className="text-foreground/30">›</span>
          <span className="text-foreground">Week 3</span>
        </nav>

        <p className="font-sans text-[11px] font-semibold tracking-[0.3em] uppercase text-lavender-foreground mb-5">
          First trimester · The week conception may happen
        </p>
        <h1 className="font-serif text-[2.5rem] sm:text-5xl md:text-[3.75rem] lg:text-[4.25rem] text-foreground leading-[1.04] tracking-tight mb-4 md:mb-5">
          3 Weeks Pregnant
        </h1>
        <p className="font-serif italic text-[1.05rem] sm:text-lg md:text-xl text-foreground/75 max-w-xl mx-auto leading-relaxed">
          Smaller than a grain of sand. Possibility, becoming biology — quietly, microscopically, and far too early to test.
        </p>
      </div>

      <Link to="/pregnancy/week/2" aria-label="Go to week 2"
        className="absolute left-3 sm:left-6 md:left-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronLeft size={18} />
      </Link>
      <Link to="/pregnancy/week/4" aria-label="Go to week 4"
        className="absolute right-3 sm:right-6 md:right-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronRight size={18} />
      </Link>
    </div>

    <div className="relative -mt-28 sm:-mt-36 md:-mt-40 mb-6">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex items-end justify-center gap-5 sm:gap-10 md:gap-14">
          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-card border-[3px] border-lavender/20 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={grainImg} alt="A grain of sand" loading="lazy" width={512} height={512}
                className="w-full h-full object-cover" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.04]" />
            </div>
            <div className="text-center">
              <p className="font-serif italic text-[12.5px] text-foreground/80 leading-tight">grain of sand</p>
              <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/55 mt-1">~0.1&nbsp;mm</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full bg-card border-[4px] border-lavender/30 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={fertilisationImg}
                alt="Soft editorial illustration of fertilisation: sperm meeting a single egg cell, the moment biology may begin"
                width={1024} height={1024}
                loading="eager" decoding="async"
                className="w-full h-full object-cover scale-[1.02]" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.05]" />
            </div>
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.22em] uppercase text-foreground/65">What may be happening</p>
          </div>

          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-lavender-bg to-lavender-bg/40 border-[3px] border-lavender/30 flex items-center justify-center shadow-elevated">
              <span className="font-serif text-[1.7rem] sm:text-[1.95rem] text-foreground tracking-tight leading-none">37</span>
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-lavender/15" />
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

/* 2. META BAR */
const anchors = [
  { id: "at-a-glance", label: "At a glance", Icon: Sparkles },
  { id: "biology", label: "What may be happening", Icon: Sprout },
  { id: "timeline", label: "The week's timeline", Icon: Hourglass },
  { id: "body", label: "Your body", Icon: Activity },
  { id: "symptoms", label: "Symptoms or silence", Icon: HeartPulse },
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
          <div className="w-11 h-11 rounded-full bg-sage-bg border border-sage/20 flex items-center justify-center shrink-0">
            <Leaf size={16} className="text-sage" />
          </div>
          <div className="min-w-0">
            <p className="font-sans text-[13px] font-medium text-foreground leading-snug">
              ✔ Medically reviewed by Jenny Joines
            </p>
            <p className="font-sans text-[11.5px] font-normal text-foreground/60 mt-0.5">
              Updated for 2026 · 10 min read · The fertilisation window
            </p>
          </div>
        </div>
        <nav aria-label="On this page" className="flex-1 pt-4 lg:pt-0">
          <div className="flex gap-x-1 gap-y-2 overflow-x-auto lg:flex-wrap scrollbar-hide -mx-1 px-1">
            {anchors.map(({ id, label, Icon }) => (
              <a key={id} href={`#${id}`}
                className="group shrink-0 flex items-center gap-2 px-3 py-2 rounded-full hover:bg-lavender-bg/50 transition-colors">
                <span className="w-7 h-7 rounded-full bg-parchment-dark/80 border border-border/30 flex items-center justify-center group-hover:border-lavender/40 transition-colors">
                  <Icon size={12} className="text-sage" />
                </span>
                <span className="font-sans text-[12px] font-medium text-foreground/80 group-hover:text-foreground whitespace-nowrap">
                  {label}
                </span>
              </a>
            ))}
          </div>
        </nav>
      </div>
    </div>
  </section>
);

/* 3. AT A GLANCE */
const glanceFacts = [
  { label: "Stage", value: "Conception window" },
  { label: "Size", value: "~0.1 mm — grain of sand" },
  { label: "Form", value: "Single cell → cluster of cells" },
  { label: "Trimester", value: "1 of 3" },
];

const AtAGlance = () => (
  <section id="at-a-glance" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl mb-14 md:mb-20">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 relative bg-gradient-to-br from-lavender-bg/55 via-parchment to-parchment-dark/50 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-10 overflow-hidden shadow-card-brand">
        <img src={botanicalAccent} alt="" aria-hidden="true"
          className="absolute -left-3 bottom-0 w-28 opacity-35 pointer-events-none select-none" />
        <SectionLabel tone="lavender">At a glance</SectionLabel>
        <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-5">
          The week conception may happen.
        </h2>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8] mb-4">
          By the way pregnancy is dated, week 3 is the week your body releases (or has just released) an egg
          and, if a sperm reaches it, fertilisation happens. From a single fertilised cell, a cluster of
          cells begins to divide, dividing again every twelve hours or so, drifting slowly down the
          fallopian tube toward your uterus.
        </p>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8]">
          You won't feel any of it. A test would still be negative. But this is the week where, for many
          people, biology begins — long before anyone knows.
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

/* 4. BIOLOGY */
const biologyPoints = [
  { title: "Fertilisation, if it happens", body: "An egg is only fertilisable for about 12–24 hours after ovulation. Sperm can survive in the body for up to five days. If a single sperm reaches and enters the egg, the membrane locks shut against any other — and a brand-new genetic blueprint forms in seconds." },
  { title: "Cell division begins fast", body: "About 24 hours after fertilisation the cell divides into two. Then four. Then eight. Within three days it's a tiny mulberry-shaped cluster called a morula, still smaller than a full stop on this page." },
  { title: "The journey to the uterus", body: "While dividing, the cluster drifts slowly down the fallopian tube — a journey of roughly 5 to 7 days. By the end of week 3 it has usually become a hollow ball of cells called a blastocyst, ready to start looking for a place to settle." },
  { title: "Implantation hasn't happened yet", body: "For most people, implantation — when the blastocyst burrows into the lining of the womb — happens at the very end of week 3 or in week 4. Until then, no hCG is being made, which is why a test would still be negative." },
];

const Biology = () => (
  <section id="biology" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="relative rounded-3xl overflow-hidden border border-border/40 shadow-card-brand">
            <div className="aspect-[4/5]">
              <img src={biologyImg} alt="Soft editorial close-up of a morula and early blastocyst — a tiny cluster of dividing cells travelling through a fallopian tube"
                loading="lazy" width={1024} height={1280}
                className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-foreground/60 to-transparent">
              <p className="font-serif italic text-[13px] text-background/95 leading-snug">
                A cluster of cells, smaller than a full stop. Already moving toward home.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <SectionLabel tone="lavender">What may be happening biologically</SectionLabel>
          <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-5">
            One cell, then two, then four — and quietly, the start of someone.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8] mb-8 max-w-2xl">
            Week 3 is mostly invisible — to you, to a test, to anyone. But if conception happens this week,
            an enormous amount is unfolding: a single fertilised cell, a tiny dividing cluster, and a slow
            drift toward the uterus. None of it has settled yet. None of it is guaranteed. But it has
            begun.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {biologyPoints.map((p, i) => (
              <div key={p.title}
                className="relative bg-card rounded-2xl border border-border/40 p-6 md:p-7 shadow-card-brand">
                <span className="absolute top-5 right-5 font-serif italic text-[12px] text-lavender-foreground/70">0{i + 1}</span>
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

/* 5. THE WEEK'S TIMELINE — Week 3 unique section */
const timelinePoints = [
  { day: "Day 14–15", Icon: Sparkles, title: "Ovulation", body: "A mature egg is released from the ovary into the fallopian tube. It will only stay fertilisable for around 12–24 hours. Sperm already in the tract from the days before may meet it within hours." },
  { day: "Day 15–16", Icon: HeartPulse, title: "Fertilisation may happen", body: "If a sperm enters the egg, fertilisation is complete within minutes. The two sets of genetic material combine into one — the instructions for an entirely new human being." },
  { day: "Day 16–18", Icon: Sprout, title: "Cell division begins", body: "The fertilised egg, now called a zygote, divides into 2, then 4, then 8 cells. By 72 hours it's a 16-cell morula, still travelling down the fallopian tube." },
  { day: "Day 18–21", Icon: Compass, title: "Becoming a blastocyst", body: "By around day 5–6 after fertilisation the cluster has hollowed into a blastocyst of about 100 cells. It reaches the uterus and starts to look for somewhere to attach. Implantation usually happens late this week or early in week 4." },
];

const Timeline = () => (
  <section id="timeline" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel tone="terracotta">The week's timeline</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        Roughly what may be unfolding, day by day.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        The exact timing varies by cycle and by person. These are typical windows for a 28-day cycle. If
        you're on a longer or shorter cycle, the same sequence simply shifts.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {timelinePoints.map(({ day, Icon, title, body }) => (
        <div key={title}
          className="relative bg-card rounded-2xl border border-border/40 p-6 md:p-7 shadow-card-brand overflow-hidden">
          <span className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-terracotta/40 to-transparent" />
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-10 rounded-full bg-stage-pregnancy/60 border border-terracotta/15 flex items-center justify-center">
              <Icon size={15} className="text-terracotta" />
            </span>
            <div className="min-w-0">
              <p className="font-sans text-[10.5px] font-semibold tracking-[0.22em] uppercase text-terracotta">{day}</p>
              <h3 className="font-serif text-[1.15rem] text-foreground leading-snug mt-0.5">{title}</h3>
            </div>
          </div>
          <p className="font-sans text-[13.5px] text-foreground/70 leading-[1.75]">{body}</p>
        </div>
      ))}
    </div>

    <div className="mt-6 bg-lavender-bg/50 border border-lavender/25 rounded-2xl p-6 md:p-7 flex flex-col sm:flex-row sm:items-start gap-4">
      <span className="w-10 h-10 rounded-full bg-card border border-lavender/25 flex items-center justify-center shrink-0">
        <TestTube size={15} className="text-lavender-foreground" />
      </span>
      <p className="font-sans text-[14px] text-foreground/85 leading-[1.7]">
        <span className="font-semibold">Testing this week is almost always too early.</span>{" "}
        hCG isn't released until implantation completes, which usually happens at the end of week 3 or
        during week 4. Most home tests can't pick it up reliably until your period is actually late —
        usually some time in week 4.
      </p>
    </div>
  </section>
);

/* 6. BODY */
const bodyNotes = [
  { Icon: Activity, title: "Possible ovulation signs", body: "Slippery, stretchy clear discharge (like raw egg white). A small temperature rise the day after ovulating. Mild one-sided pelvic twinge — sometimes called mittelschmerz. These are signs the egg has just been released." },
  { Icon: Heart, title: "Mild breast tenderness from progesterone", body: "After ovulation, progesterone rises whether or not you conceive. Some people notice slightly fuller, more tender breasts in the second half of the cycle. At this stage, this is not yet a pregnancy sign — it's a luteal-phase sign." },
  { Icon: Droplet, title: "Possibly nothing at all", body: "For many people, week 3 feels exactly like any other premenstrual week — or like nothing in particular. The earliest pregnancy is genuinely silent. Your body has not yet been told." },
];

const Body = () => (
  <section id="body" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="max-w-2xl mb-10">
        <SectionLabel tone="terracotta">Your body this week</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
          Outwardly: an ordinary week. Inwardly: maybe everything.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
          What you may notice now is mostly the work of ovulation and the rising progesterone of your luteal
          phase. These signs happen whether or not conception occurs, and aren't reliable evidence either
          way.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {bodyNotes.map(({ Icon, title, body }) => (
          <div key={title}
            className="relative bg-card rounded-2xl border border-border/40 p-6 md:p-7 shadow-card-brand overflow-hidden">
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

/* 7. SYMPTOMS */
const symptoms = [
  {
    Icon: Sparkles, name: "Egg-white cervical mucus",
    feels: "Clear, slippery, stretchy discharge — much wetter than usual. Often the most reliable sign of approaching or active ovulation.",
    why: "Oestrogen peaks just before ovulation and changes cervical mucus to help sperm travel.",
    normal: "Universal in fertile-window cycles. Lasts a few days around ovulation, then dries up. Not a pregnancy sign — just a fertile-day sign.",
  },
  {
    Icon: HeartPulse, name: "Mittelschmerz (one-sided twinge)",
    feels: "A brief, dull or sharp ache low on one side of the pelvis, lasting minutes to a day or so.",
    why: "The follicle releasing the egg can cause a small pull or a tiny amount of fluid in the pelvis.",
    normal: "Common and harmless. Severe, persistent one-sided pain — especially with feeling faint — needs urgent assessment.",
  },
  {
    Icon: Heart, name: "Tender breasts (luteal phase)",
    feels: "Slightly fuller or sore breasts, often noticed putting on a bra.",
    why: "Progesterone rises after ovulation in every cycle, with or without conception.",
    normal: "Very common in the second half of your cycle. Usually settles when your period arrives — or, if pregnancy continues, often intensifies in week 4–5.",
  },
  {
    Icon: Droplet, name: "Light pinkish spotting (very rare)",
    feels: "A tiny amount of pink or brown when you wipe, usually only once.",
    why: "Some people see ovulation spotting as oestrogen briefly dips at egg release. Implantation bleeding is more typically a week 4 phenomenon.",
    normal: "Rare but normal. If it's heavier than spotting, lasts more than a day, or comes with strong pain, speak to your GP.",
  },
  {
    Icon: Moon, name: "Mild fatigue or moodiness",
    feels: "A bit flat. A bit tired. The kind of tired that could just as easily be a busy week.",
    why: "Progesterone is mildly sedating. PMS and very early pregnancy can feel almost identical at this stage.",
    normal: "Common. Not yet diagnostic of anything. Best read as 'my body is in its luteal phase' rather than 'I am pregnant'.",
  },
  {
    Icon: Compass, name: "A strange sense of awareness",
    feels: "A quiet feeling of 'something's different', often unprovable. Many people later remember having it; many never do.",
    why: "Possibly heightened body awareness because you're paying attention. Possibly genuinely subtle hormonal shifts. Possibly nothing.",
    normal: "Real but unreliable. Trust it as a feeling. Don't trust it as data. The test in a couple of weeks is what will tell you.",
  },
];

const Symptoms = () => (
  <section id="symptoms" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel>Symptoms (or quiet)</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        Most signs this week are about ovulation, not pregnancy.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        It is genuinely too early for the classic pregnancy symptoms. Anything you notice now is mostly the
        choreography of ovulation and the rising progesterone afterwards — and it happens cycle after
        cycle, with or without conception.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
      {symptoms.map(({ Icon, name, feels, why, normal }) => (
        <article key={name}
          className="group relative bg-card rounded-2xl border border-border/40 p-6 md:p-7 shadow-card-brand hover:shadow-soft transition-all duration-500">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border/40">
            <span className="w-10 h-10 rounded-full bg-stage-pregnancy/60 flex items-center justify-center">
              <Icon size={15} className="text-terracotta" />
            </span>
            <h3 className="font-serif text-[1.2rem] text-foreground leading-snug">{name}</h3>
          </div>
          <dl className="space-y-3.5">
            <div>
              <dt className="font-sans text-[10.5px] font-semibold tracking-[0.2em] uppercase text-sage mb-1">What it feels like</dt>
              <dd className="font-sans text-[13.5px] text-foreground/80 leading-[1.7]">{feels}</dd>
            </div>
            <div>
              <dt className="font-sans text-[10.5px] font-semibold tracking-[0.2em] uppercase text-sage mb-1">Why it happens</dt>
              <dd className="font-sans text-[13.5px] text-foreground/75 leading-[1.7]">{why}</dd>
            </div>
            <div>
              <dt className="font-sans text-[10.5px] font-semibold tracking-[0.2em] uppercase text-sage mb-1">Is it normal?</dt>
              <dd className="font-sans text-[13.5px] text-foreground/75 leading-[1.7]">{normal}</dd>
            </div>
          </dl>
        </article>
      ))}
    </div>

    <div className="mt-8 text-center">
      <Link to="/articles/early-pregnancy-symptoms"
        className="inline-flex items-center gap-2 font-sans text-[13.5px] font-medium text-sage hover:gap-3 transition-all">
        Read: the earliest pregnancy symptoms, week by week <ArrowRight size={13} />
      </Link>
    </div>
  </section>
);

/* 8. EMOTIONAL */
const emotionalTruths = [
  "Counting days. Recounting days. Counting them again.",
  "Reading every twinge for meaning that it probably doesn't carry yet.",
  "Hoping carefully — or not letting yourself hope at all.",
  "A strange protectiveness over a body that may be holding something invisible.",
  "Wanting to slow time down, and wanting to fast-forward to the test.",
  "Quiet grief if you've waited this long before, and the test was negative.",
  "Feeling a little ridiculous for caring this much about something microscopic.",
];

const Emotional = () => (
  <section id="emotional" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 relative bg-gradient-to-br from-lavender-bg via-parchment to-lavender-bg/40 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-9 shadow-card-brand overflow-hidden">
          <img src={botanicalAccent} alt="" aria-hidden="true"
            className="absolute right-0 top-0 w-24 opacity-35 pointer-events-none select-none" />
          <SectionLabel tone="lavender">Emotionally this week</SectionLabel>
          <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-4">
            Suspended between not yet and maybe now.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/80 leading-[1.8] mb-4">
            Week 3 is one of the most psychologically intense weeks of the whole journey, even though
            nothing visible is happening. You are waiting on something that may or may not have started.
          </p>
          <p className="font-sans text-[14px] text-foreground/70 leading-[1.75]">
            The hyper-awareness is normal. The looking-for-signs is normal. The trying not to look is
            normal too. Be very gentle with what your mind does this week.
          </p>
        </div>

        <div className="lg:col-span-3 bg-card rounded-3xl border border-border/40 p-7 sm:p-8 md:p-9 shadow-card-brand">
          <p className="font-sans text-[11px] font-semibold tracking-[0.24em] uppercase text-sage mb-4">
            What this week often looks like
          </p>
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

/* 9. FOCUS */
const focusList = [
  { Icon: Sprout, title: "Folic acid, every single day", note: "400 micrograms daily — ideally from before conception, definitely as soon as you suspect a chance. The neural tube starts forming in the next couple of weeks. If you have diabetes, epilepsy, a higher BMI or a family history, your GP may recommend the higher 5 mg dose." },
  { Icon: Coffee, title: "Treat it as if you're already pregnant", note: "Until you know either way, it's kindest to your body to assume you might be: keep alcohol very low or off, drop caffeine to under 200 mg a day, skip the soft cheeses and pâté, and avoid undercooked meat. None of this needs to be perfect, just reasonable." },
  { Icon: Hourglass, title: "Don't test yet", note: "Tests in week 3 are almost always negative even in successful pregnancies, because hCG isn't being made until implantation completes. Wait until your period is at least a day or two late — that's typically some time in week 4." },
  { Icon: Heart, title: "Be careful with what you read into things", note: "Almost any 'symptom' this week can be PMS in disguise. Notice what you notice, but try not to over-interpret. Your body is telling you very little this week, and that is normal." },
  { Icon: Moon, title: "Sleep is quietly doing a lot", note: "Both ovulation and the very early days of pregnancy benefit from boring, ordinary, good sleep. Rest is not passive — it's how your body conserves energy for the most metabolically expensive task it could ever undertake." },
  { Icon: Compass, title: "If you're trying — write the dates down", note: "When your period started, when you think you ovulated, when you had sex around that window. It will help if you do get a positive line, and it gives the brain something concrete to do during a week of pure waiting." },
];

const Focus = () => (
  <section id="focus" className="bg-sage-bg/35 py-16 md:py-24 border-y border-border/30">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <SectionLabel tone="terracotta">Focus this week</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.2rem] text-foreground leading-tight mb-4">
            A small, kind kit for a week of waiting.
          </h2>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8]">
            There is very little to do this week. Folic acid, the basics of self-care, and permission to
            wait without forcing the answer. That's enough.
          </p>
        </div>
        <div className="lg:col-span-8">
          <ol className="bg-card rounded-3xl border border-border/40 shadow-card-brand divide-y divide-border/40 overflow-hidden">
            {focusList.map(({ Icon, title, note }, i) => (
              <li key={title}
                className="group flex items-start gap-5 p-5 sm:p-6 md:p-7 hover:bg-sage-bg/25 transition-colors">
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

/* 10. SEEK SUPPORT */
const seekSupport = [
  "Severe one-sided pelvic pain that doesn't settle in a few hours",
  "Heavy bleeding outside your usual period pattern",
  "A fever or high temperature with pelvic pain",
  "Shoulder-tip pain or feeling faint",
  "If you've been trying for over a year (under 35) or six months (over 35) — your GP can help",
  "If you've had a previous loss and the waiting feels unbearable — support is available",
  "Burning, pain or blood when you wee (possible UTI)",
  "If you're struggling emotionally with the wait — you don't have to do this alone",
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
            Even in a 'nothing yet' week, your concerns are valid.
          </h3>
          <p className="font-sans text-[13.5px] text-foreground/70 leading-[1.75] mt-3">
            Your GP and NHS 111 are good first calls for anything physical. Charities like Tommy's, the
            Miscarriage Association and Fertility Network UK offer real, gentle support if the waiting is
            heavy.
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

/* 11. QUOTE */
const Quote = () => (
  <section className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl pb-16 md:pb-24">
    <div className="relative bg-lavender-bg/55 rounded-3xl border border-border/30 p-8 sm:p-10 md:p-14 text-center overflow-hidden">
      <span className="absolute left-7 top-6 font-serif text-4xl text-lavender-foreground/40 leading-none">“</span>
      <span className="absolute right-7 bottom-4 font-serif text-4xl text-lavender-foreground/40 leading-none">”</span>
      <p className="font-serif italic text-[1.2rem] sm:text-[1.35rem] md:text-[1.6rem] text-foreground/90 leading-snug max-w-3xl mx-auto">
        Hope and uncertainty are allowed to live in the same week. Neither one is wrong. The waiting itself is its own quiet kind of work.
      </p>
      <Heart size={14} className="text-lavender-foreground/60 mx-auto mt-5" />
    </div>
  </section>
);

/* 12. REFLECTION + ASK */
const reflectionPrompts = ["What I'm hoping for", "What I'm scared of", "What this week is asking of me", "How I want to mark this time"];
const askChips = ["When can I take a pregnancy test?", "Is it too early to feel symptoms?", "How does fertilisation actually work?", "How much folic acid do I need?", "What is implantation?"];

const ReflectionAsk = () => (
  <section className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl pb-16 md:pb-24">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-card rounded-3xl border border-border/40 border-t-2 border-t-sage/40 p-7 sm:p-8 md:p-9 shadow-card-brand">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-9 h-9 rounded-full bg-sage-bg flex items-center justify-center shrink-0">
            <Leaf size={14} className="text-sage" />
          </span>
          <div className="min-w-0">
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.24em] uppercase text-sage">A moment for reflection</p>
            <h3 className="font-serif text-[1.3rem] sm:text-[1.35rem] text-foreground mt-0.5 leading-snug">What does this week feel like for you?</h3>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {reflectionPrompts.map((p) => (
            <span key={p} className="font-sans text-[11.5px] font-medium bg-sage-bg/70 text-foreground/80 rounded-full px-3 py-1.5 border border-sage/20">
              {p}
            </span>
          ))}
        </div>
        <textarea rows={4} placeholder="Write your thoughts here… this is just for you."
          className="w-full bg-parchment/80 border border-border/40 rounded-xl px-4 py-3.5 font-sans text-[13.5px] text-foreground placeholder:text-foreground/45 resize-none focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/30 transition-all leading-relaxed" />
        <Link to="/auth"
          className="inline-flex items-center gap-2 mt-4 bg-terracotta text-terracotta-foreground rounded-pill px-5 py-2.5 font-sans text-[13px] font-medium hover:bg-terracotta-hover transition-colors">
          Save reflection to your journal <ArrowRight size={12} />
        </Link>
      </div>

      <div className="bg-card rounded-3xl border border-border/40 border-t-2 border-t-lavender/50 p-7 sm:p-8 md:p-9 shadow-card-brand">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-9 h-9 rounded-full bg-lavender-bg flex items-center justify-center shrink-0">
            <MessageCircle size={14} className="text-lavender-foreground" />
          </span>
          <div className="min-w-0">
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.24em] uppercase text-sage">Ask about week 3</p>
            <h3 className="font-serif text-[1.3rem] sm:text-[1.35rem] text-foreground mt-0.5 leading-snug">A question on your mind?</h3>
          </div>
        </div>
        <p className="font-sans text-[13px] text-foreground/70 leading-relaxed mb-4">
          Get a calm, evidence-led answer tailored to where you are right now.
        </p>
        <input type="text" placeholder="e.g. How soon after sex can fertilisation happen?"
          className="w-full bg-parchment/80 border border-border/40 rounded-full px-5 py-3.5 font-sans text-[13.5px] text-foreground placeholder:text-foreground/45 focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/30 transition-all" />
        <p className="font-sans text-[10.5px] font-semibold tracking-[0.22em] uppercase text-foreground/55 mt-5 mb-2.5">
          Popular at this stage
        </p>
        <div className="flex flex-wrap gap-2">
          {askChips.map((c) => (
            <Link key={c} to="/ask"
              className="font-sans text-[12px] font-medium text-foreground/80 bg-parchment-dark/60 border border-border/40 hover:border-sage/50 hover:text-foreground px-3.5 py-1.5 rounded-full transition-colors">
              {c}
            </Link>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* 13. JOURNAL */
const Journal = () => (
  <section className="bg-sage-bg/40 py-16 md:py-24 border-y border-border/30">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="bg-card rounded-3xl border border-border/30 overflow-hidden shadow-elevated grid grid-cols-1 md:grid-cols-2">
        <div className="aspect-[4/3] md:aspect-auto md:min-h-[420px] relative overflow-hidden">
          <img src={journalImg} alt="The Start of You journal flatlay"
            loading="lazy" width={1200} height={900}
            className="w-full h-full object-cover object-[50%_45%]" />
        </div>
        <div className="p-7 sm:p-9 md:p-12 flex flex-col justify-center">
          <SectionLabel>The Start of You journal</SectionLabel>
          <h3 className="font-serif text-[1.65rem] sm:text-[1.8rem] md:text-[2.1rem] text-foreground leading-tight mb-4">
            Even the waiting is part of the story.
          </h3>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8] mb-6">
            The week before you knew. The hoping, the not-letting-yourself-hope, the small private signs you
            looked for. The journal holds the very beginning — long before there is a heartbeat to write
            home about.
          </p>
          <ul className="space-y-2.5 mb-7">
            {[
              "Pages for the trying-to-conceive months",
              "Prompts that meet you in the wait",
              "Guided pages through every week to birth and beyond",
            ].map((line) => (
              <li key={line} className="flex items-start gap-2.5">
                <Check size={13} className="text-sage mt-1 shrink-0" />
                <span className="font-sans text-[13.5px] text-foreground/80">{line}</span>
              </li>
            ))}
          </ul>
          <Link to="/journal"
            className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-6 py-3 font-sans text-[13.5px] font-medium shadow-cta hover:bg-terracotta-hover transition-colors w-fit">
            Discover the journal <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

/* 14. RELATED */
const related = [
  { slug: "implantation-and-the-positive-test", img: implantationImg, tag: "Biology",
    title: "What's actually happening when conception begins",
    desc: "Fertilisation, the journey down the fallopian tube, and the moment a cluster of cells becomes a blastocyst." },
  { slug: "early-pregnancy-symptoms", img: earlySymptomsImg, tag: "Symptoms",
    title: "The earliest pregnancy symptoms",
    desc: "What can — and can't — be felt in the first weeks, and why most signs this early are about your cycle, not pregnancy." },
  { slug: "implantation-bleeding-vs-period", img: implantationBleedImg, tag: "Spotting",
    title: "Implantation bleeding or your period?",
    desc: "How to tell the difference, when light spotting in the luteal phase is normal, and when to call." },
  { slug: "first-trimester-tests-and-scans", img: testsScansImg, tag: "Tests",
    title: "When can you take a pregnancy test?",
    desc: "Why testing in week 3 is almost always too early, and the gentlest moment to take one." },
  { slug: "first-trimester-emotionally", img: emotionalImg, tag: "Emotions",
    title: "The emotional weight of the wait",
    desc: "Why the days between maybe and definitely are some of the strangest of the whole journey." },
  { slug: "first-trimester-lifestyle", img: lifestyleImg, tag: "Lifestyle",
    title: "What to start (and stop) when you might be pregnant",
    desc: "Folic acid, alcohol, caffeine, food safety: the gentle basics for the just-in-case weeks." },
];

const Related = () => (
  <section id="guidance" className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div className="max-w-xl">
          <SectionLabel>Read next, because of week 3</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.4rem] text-foreground leading-tight">
            Curated guidance for what's likely on your mind right now.
          </h2>
        </div>
        <Link to="/pregnancy/first-trimester"
          className="inline-flex items-center gap-1.5 font-sans text-[13.5px] font-medium text-sage hover:gap-2.5 transition-all whitespace-nowrap">
          Browse all guidance <ArrowRight size={12} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {related.map((a) => (
          <Link key={a.slug} to={`/articles/${a.slug}`}
            className="group flex flex-col bg-card rounded-2xl overflow-hidden border border-border/30 shadow-card-brand hover:shadow-soft hover:-translate-y-1 transition-all duration-500">
            <div className="aspect-[5/4] overflow-hidden">
              <img src={a.img} alt={a.title} loading="lazy" width={640} height={512}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <span className="font-sans text-[10.5px] font-semibold tracking-[0.22em] uppercase text-terracotta mb-3">
                {a.tag}
              </span>
              <h3 className="font-serif text-[1.15rem] text-foreground leading-snug mb-3 group-hover:text-sage transition-colors">
                {a.title}
              </h3>
              <p className="font-sans text-[13px] text-foreground/70 leading-[1.7] flex-1 mb-4">
                {a.desc}
              </p>
              <span className="inline-flex items-center gap-1.5 font-sans text-[12.5px] font-medium text-sage group-hover:gap-2.5 transition-all">
                Read guide <ArrowRight size={11} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

/* 15. FAQ */
const faqs = [
  { q: "How am I 3 weeks pregnant if conception only just happened?",
    a: "Pregnancy is dated from the first day of your last menstrual period (LMP), not from conception. Most people don't know exactly when they ovulated, but they do know when their period started. So when you're 3 weeks pregnant by LMP dating, you're typically only about 1 week from conception — and conception itself usually happens around the middle of week 2 or the start of week 3. Your due date is still calculated as 40 weeks from your LMP." },
  { q: "Can I take a pregnancy test now?",
    a: "Almost certainly too early. Pregnancy tests detect hCG, a hormone made only after the embryo implants into the lining of the womb — usually at the very end of week 3 or during week 4. Most home tests can't pick up enough hCG to give a reliable positive until your period is at least a day or two late, which is typically some time in week 4. Testing earlier risks a false negative and a lot of unnecessary worry. If you can, wait until the day your period is due — and ideally a couple of days after." },
  { q: "Can you feel fertilisation or implantation?",
    a: "No, and almost certainly no. Fertilisation happens at a microscopic level in the fallopian tube and produces no physical sensation. Implantation, when it happens later, is felt by very few people — and even then usually as a faint twinge or light spotting for a day or two. Anything stronger than that this early is much more likely to be ovulation pain, premenstrual cramping, or simply normal cycle sensations you've started paying closer attention to." },
  { q: "If I had sex this week, when does fertilisation happen?",
    a: "Sperm can survive in the fertile cervical mucus for up to 5 days, waiting for an egg. The egg itself is only fertilisable for about 12–24 hours after ovulation. So fertilisation can happen anywhere from a few hours to several days after sex. If it does happen, the fertilised cell then takes around 5–7 days to travel down the fallopian tube and reach the uterus, where implantation can begin." },
  { q: "Is one-sided pelvic pain in week 3 normal?",
    a: "Mild, brief one-sided pelvic pain around the time of ovulation — often called mittelschmerz — is very common and harmless. It usually only lasts minutes to a day or so. However, severe one-sided pain that doesn't settle, especially with shoulder-tip pain, dizziness or feeling faint, can occasionally signal something more serious like an ectopic pregnancy from a previous cycle and needs urgent assessment. When in doubt, call your GP or NHS 111." },
  { q: "I keep checking for symptoms — is something wrong with me?",
    a: "Not at all. The trying-to-conceive window and the two-week wait are well known for sending people into a kind of hyper-aware checking loop — every twinge, every yawn, every wave of moodiness becomes possible evidence. It's a completely human response to waiting on something you can't see. Try to set gentle boundaries: a daily check-in, not an hourly one. And remember: an absence of symptoms in week 3 is normal and means nothing about the outcome." },
  { q: "What can I do that actually helps right now?",
    a: "Three small things. Take 400 micrograms of folic acid daily — the neural tube starts forming in the next couple of weeks and folic acid genuinely matters from this point on. Treat your body kindly, as if you might already be pregnant: low or no alcohol, caffeine under 200 mg a day, and avoid the standard food-safety list (soft cheeses, pâté, undercooked meat). And rest properly. Beyond that, there isn't much to do — and that, frustratingly, is the truth of week 3." },
  { q: "We've been trying for a while. Is there a point to keep waiting?",
    a: "If you're under 35 and have been trying for a year, or over 35 and trying for 6 months, your GP can begin investigations and refer you for fertility tests on the NHS. For some conditions — irregular cycles, known PCOS, endometriosis, previous treatment — it's reasonable to ask for help sooner. You don't need to have 'failed' for a year before you're allowed to ask questions. Help is available." },
];

const FAQRow = ({ faq, defaultOpen = false }: { faq: { q: string; a: string }; defaultOpen?: boolean }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border/40 last:border-b-0">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-start gap-4 py-5 text-left group">
        <span className="flex-1 font-serif text-[1.05rem] md:text-[1.15rem] text-foreground group-hover:text-sage transition-colors leading-snug">
          {faq.q}
        </span>
        <span className="w-7 h-7 rounded-full bg-sage-bg flex items-center justify-center text-sage shrink-0 mt-1">
          {open ? <Minus size={13} /> : <Plus size={13} />}
        </span>
      </button>
      {open && (
        <p className="font-sans text-[14px] text-foreground/75 leading-[1.85] pb-6 pr-12">
          {faq.a}
        </p>
      )}
    </div>
  );
};

const FAQ = () => (
  <section className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
      <div className="mb-10 text-center">
        <SectionLabel>Common questions</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[1.95rem] md:text-[2.4rem] text-foreground leading-tight">
          Common questions at 3 weeks
        </h2>
      </div>
      <div className="bg-card rounded-3xl border border-border/40 shadow-card-brand p-2 md:p-4">
        <div className="px-4 md:px-6">
          {faqs.map((f, i) => (
            <FAQRow key={f.q} faq={f} defaultOpen={i === 0} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* 16. NEXT */
const Next = () => (
  <section className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
      <div className="bg-gradient-to-br from-lavender-bg via-parchment to-stage-pregnancy/30 rounded-3xl border border-border/30 p-8 sm:p-10 md:p-14 text-center shadow-card-brand">
        <SectionLabel tone="lavender">Up next</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.5rem] text-foreground leading-tight mb-3">
          Ready for week 4?
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 max-w-lg mx-auto mb-8 leading-[1.8]">
          Next week the cluster of cells reaches the uterus and begins to settle in. Implantation may happen,
          hCG starts to rise — and a sensitive test may begin to show the very first faint line.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
          <Link to="/pregnancy/week/4"
            className="inline-flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium shadow-cta hover:bg-terracotta-hover transition-colors">
            Continue to week 4 <ArrowRight size={14} />
          </Link>
          <Link to="/pregnancy/first-trimester"
            className="inline-flex items-center justify-center gap-2 border border-foreground/25 text-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium hover:bg-parchment-dark transition-colors">
            Explore the first trimester
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const Week3Page = () => (
  <div className="min-h-screen bg-parchment">
    <PregnancyWeekSeo weekNumber={3} />
    <Navbar />
    <Hero />
    <MetaBar />
    <AtAGlance />
    <Biology />
    <Timeline />
    <Body />
    <Symptoms />
    <Emotional />
    <Focus />
    <SeekSupport />
    <Quote />
    <ReflectionAsk />
    <Journal />
    <Related />
    <FAQ />
    <Next />
    <Footer />
  </div>
);

export default Week3Page;
