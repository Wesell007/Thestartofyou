import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Sprout,
  HeartPulse,
  Activity,
  Apple,
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
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import embryoImg from "@/assets/week4-embryo.jpg";
import poppyImg from "@/assets/week4-poppy-seed.jpg";
import journalImg from "@/assets/journal-flatlay.jpg";
import botanicalTr from "@/assets/botanical-branch-tr.png";
import botanicalBl from "@/assets/botanical-branch-bl.png";
import botanicalAccent from "@/assets/article-botanical-accent.png";
import implantationImg from "@/assets/article-hero-implantation.jpg";
import nauseaImg from "@/assets/article-hero-nausea.jpg";
import earlySymptomsImg from "@/assets/article-hero-early-symptoms.jpg";
import fatigueImg from "@/assets/article-hero-fatigue.jpg";

/* ─────────────────────────────────────────────────────────────────────
   1. HERO — Week identity, baby-size + embryo + weeks-to-go cluster
   ───────────────────────────────────────────────────────────────────── */
const Week4Hero = () => (
  <section className="relative overflow-hidden">
    <div className="relative bg-gradient-to-br from-sage-bg/70 via-parchment to-sage-bg/40 pt-24 pb-44 md:pt-32 md:pb-52">
      {/* ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[820px] h-[420px] rounded-full bg-sage-light/25 blur-3xl" />
        <div className="absolute -top-10 right-1/4 w-[260px] h-[260px] rounded-full bg-terracotta/5 blur-3xl" />
      </div>
      {/* botanical corner accents */}
      <img src={botanicalBl} alt="" aria-hidden="true"
        className="pointer-events-none absolute top-20 left-0 w-[150px] lg:w-[210px] opacity-25 select-none hidden md:block" />
      <img src={botanicalTr} alt="" aria-hidden="true"
        className="pointer-events-none absolute top-20 right-0 w-[150px] lg:w-[210px] opacity-25 select-none hidden md:block" />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl relative z-10 text-center">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="flex items-center justify-center gap-2 mb-7 font-sans text-xs font-light text-muted-foreground">
          <Link to="/pregnancy" className="hover:text-foreground transition-colors">Pregnancy</Link>
          <span className="text-muted-foreground/40">›</span>
          <Link to="/pregnancy/first-trimester" className="hover:text-foreground transition-colors">Week by week</Link>
        </nav>

        <h1 className="font-serif text-[2.4rem] sm:text-5xl md:text-[3.75rem] lg:text-[4.25rem] text-foreground leading-[1.04] tracking-tight mb-4 md:mb-5">
          4 Weeks Pregnant
        </h1>
        <p className="font-serif italic text-base sm:text-lg md:text-xl text-muted-foreground/80 max-w-md mx-auto leading-relaxed">
          Your baby is as big as a poppy seed.
        </p>
      </div>

      {/* arrows */}
      <Link
        to="/pregnancy/week/3"
        aria-label="Go to week 3"
        className="absolute left-3 sm:left-6 md:left-12 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20"
      >
        <ChevronLeft size={18} />
      </Link>
      <Link
        to="/pregnancy/week/5"
        aria-label="Go to week 5"
        className="absolute right-3 sm:right-6 md:right-12 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20"
      >
        <ChevronRight size={18} />
      </Link>
    </div>

    {/* Floating cluster — overlaps banner/page seam */}
    <div className="relative -mt-36 md:-mt-40 mb-6">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex items-end justify-center gap-4 sm:gap-8 md:gap-12">
          {/* Poppy seed */}
          <div className="flex flex-col items-center gap-3 pb-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-card border-[3px] border-sage/15 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={poppyImg} alt="Poppy seed" loading="lazy" width={512} height={512}
                className="w-full h-full object-cover" />
            </div>
            <p className="font-sans text-[10.5px] tracking-wider uppercase text-muted-foreground text-center">
              Baby's super tiny
            </p>
          </div>

          {/* Embryo medallion (centerpiece) */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full bg-card border-[4px] border-sage/20 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={embryoImg} alt="Editorial illustration of a 4-week embryo"
                width={1024} height={1024}
                className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Weeks to go */}
          <div className="flex flex-col items-center gap-3 pb-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-stage-pregnancy/80 to-stage-pregnancy/40 border-[3px] border-terracotta/20 flex items-center justify-center shadow-elevated">
              <span className="font-serif text-[1.7rem] sm:text-[1.95rem] text-foreground tracking-tight leading-none">36</span>
            </div>
            <p className="font-sans text-[10.5px] tracking-wider uppercase text-muted-foreground text-center">
              Weeks to go
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────────────
   2. META BAR — Author / reviewed / quick anchors
   ───────────────────────────────────────────────────────────────────── */
const anchors = [
  { id: "baby", label: "Baby development", Icon: Sprout },
  { id: "body", label: "Body changes", Icon: Activity },
  { id: "symptoms", label: "Common symptoms", Icon: HeartPulse },
  { id: "what-this-means", label: "What this means", Icon: Sparkles },
  { id: "support", label: "Support", Icon: Heart },
  { id: "focus", label: "Focus this week", Icon: Calendar },
  { id: "guidance", label: "Related guidance", Icon: BookOpen },
];

const Week4MetaBar = () => (
  <section className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl -mt-2 mb-12 relative z-10">
    <div className="bg-card rounded-2xl border border-border/40 shadow-card-brand p-5 sm:p-6 md:p-7">
      <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8">
        {/* Reviewer */}
        <div className="flex items-center gap-4 pb-5 lg:pb-0 lg:pr-7 lg:border-r border-b lg:border-b-0 border-border/30">
          <div className="w-11 h-11 rounded-full bg-sage-bg border border-sage/20 flex items-center justify-center shrink-0">
            <Leaf size={16} className="text-sage" />
          </div>
          <div className="min-w-0">
            <p className="font-sans text-[12.5px] text-foreground/85 leading-snug">
              ✔ Medically reviewed by Jenny Joines
            </p>
            <p className="font-sans text-[11px] font-light text-muted-foreground/80 mt-0.5">
              Updated for 2026 · Early pregnancy
            </p>
          </div>
        </div>

        {/* Anchor links */}
        <nav aria-label="On this page" className="flex-1 pt-4 lg:pt-0">
          <div className="flex gap-x-1 gap-y-2 overflow-x-auto lg:flex-wrap scrollbar-none -mx-1 px-1">
            {anchors.map(({ id, label, Icon }) => (
              <a
                key={id}
                href={`#${id}`}
                className="group shrink-0 flex items-center gap-2 px-3 py-2 rounded-full hover:bg-sage-bg/60 transition-colors"
              >
                <span className="w-7 h-7 rounded-full bg-parchment-dark/80 border border-border/30 flex items-center justify-center group-hover:border-sage/30 transition-colors">
                  <Icon size={12} className="text-sage-muted" />
                </span>
                <span className="font-sans text-[11.5px] font-medium text-foreground/70 group-hover:text-foreground whitespace-nowrap">
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

/* ─────────────────────────────────────────────────────────────────────
   3. AT A GLANCE  +  COMMON SYMPTOMS  (top split)
   ───────────────────────────────────────────────────────────────────── */
const symptoms = [
  { name: "Light spotting", note: "Implantation bleeding", Icon: Sprout },
  { name: "Mild cramping", note: "Similar to period-like cramps", Icon: HeartPulse },
  { name: "Breast tenderness", note: "May start now", Icon: Heart },
  { name: "Bloating", note: "Hormones may cause bloating", Icon: Activity },
  { name: "Fatigue", note: "Hormones are starting to rise", Icon: Sparkles },
  { name: "Frequent urination", note: "May begin", Icon: Apple },
];

const Week4TopSplit = () => (
  <section className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl mb-14 md:mb-20">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* At a glance */}
      <div className="lg:col-span-2 relative bg-gradient-to-br from-stage-pregnancy/40 to-parchment-dark/60 rounded-2xl border border-border/40 p-7 md:p-8 overflow-hidden">
        <img src={botanicalAccent} alt="" aria-hidden="true"
          className="absolute -left-3 bottom-0 w-24 opacity-40 pointer-events-none select-none" />
        <h2 className="font-serif text-[1.65rem] md:text-[1.85rem] text-foreground mb-4">At a glance</h2>
        <p className="font-sans text-[14.5px] font-light text-foreground/75 leading-[1.75]">
          <span className="underline underline-offset-4 decoration-sage/40">Implantation</span> has likely
          occurred and your body is just beginning to produce pregnancy hormones. You may not feel much of
          anything yet — and that's completely normal. Everything is still tiny but exactly as it should be.
        </p>
      </div>

      {/* Common symptoms */}
      <div id="symptoms" className="lg:col-span-3 bg-card rounded-2xl border border-border/40 p-7 md:p-8 shadow-card-brand">
        <h2 className="font-serif text-[1.5rem] md:text-[1.75rem] text-foreground mb-5">Common symptoms this week</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-7 gap-y-4">
          {symptoms.map(({ name, note, Icon }) => (
            <div key={name} className="flex items-start gap-3">
              <span className="w-9 h-9 rounded-full bg-stage-pregnancy/60 flex items-center justify-center shrink-0 mt-0.5">
                <Icon size={14} className="text-terracotta/80" />
              </span>
              <div className="min-w-0">
                <p className="font-sans text-[13.5px] font-medium text-foreground leading-snug">{name}</p>
                <p className="font-sans text-[12px] font-light text-muted-foreground leading-snug mt-0.5">{note}</p>
              </div>
            </div>
          ))}
        </div>
        <Link to="/articles/early-pregnancy-symptoms"
          className="inline-flex items-center gap-1.5 mt-6 pt-5 border-t border-border/30 font-sans text-[12.5px] text-sage hover:gap-2.5 transition-all">
          See all early pregnancy symptoms <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────────────
   4. WHAT'S HAPPENING THIS WEEK — 3 cards (Baby / Body / Emotionally)
       + WHAT THIS MEANS card on the right
   ───────────────────────────────────────────────────────────────────── */
const happening = [
  {
    id: "baby",
    n: "1",
    Icon: Sprout,
    accent: "bg-sage/15 text-sage",
    title: "Your baby",
    body: "Your embryo is no more than a tiny cluster of cells implanting in your uterus. The foundation of your placenta is beginning to form, and the layers that will become organs are quietly being laid down.",
  },
  {
    id: "body",
    n: "2",
    Icon: Activity,
    accent: "bg-stage-pregnancy text-terracotta/80",
    title: "Your body",
    body: "Hormones like hCG are on the rise to support your pregnancy. You may experience spotting, mild bloating, or tenderness — or you may feel almost nothing at all. Both are within normal.",
  },
  {
    id: "emotional",
    n: "3",
    Icon: Heart,
    accent: "bg-lavender-bg text-lavender-foreground/80",
    title: "Emotionally",
    body: "Excitement, worry and tenderness are normal. Be gentle with yourself — this is all new, and that's okay. The 'is this real yet?' feeling can sit alongside everything else.",
  },
];

const Week4Happening = () => (
  <section className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="mb-10">
        <p className="font-sans text-[11px] font-medium tracking-[0.25em] uppercase text-sage-muted mb-3">This week</p>
        <h2 className="font-serif text-[2rem] md:text-[2.5rem] text-foreground leading-tight max-w-2xl">
          What's happening this week
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* 3 cards */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {happening.map(({ id, n, Icon, accent, title, body }) => (
            <div key={id} id={id}
              className="bg-card rounded-2xl border border-border/40 p-6 shadow-card-brand flex flex-col">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-7 h-7 rounded-full bg-foreground/85 text-background flex items-center justify-center font-sans text-[11px] font-medium">{n}</span>
                <span className={`w-9 h-9 rounded-full ${accent} flex items-center justify-center ml-auto`}>
                  <Icon size={15} />
                </span>
              </div>
              <h3 className="font-serif text-[1.15rem] text-foreground mb-3">{title}</h3>
              <p className="font-sans text-[13px] font-light text-muted-foreground leading-[1.7] flex-1">{body}</p>
            </div>
          ))}
        </div>

        {/* What this means */}
        <div id="what-this-means" className="lg:col-span-2 relative bg-gradient-to-br from-sage-bg to-parchment rounded-2xl border border-sage/20 p-7 md:p-8 overflow-hidden">
          <img src={botanicalAccent} alt="" aria-hidden="true"
            className="absolute right-0 top-0 w-20 opacity-40 pointer-events-none select-none" />
          <div className="flex items-center gap-2 mb-3">
            <Leaf size={14} className="text-sage" />
            <span className="font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-sage-muted">Reassurance</span>
          </div>
          <h3 className="font-serif text-[1.5rem] text-foreground mb-3">What this means</h3>
          <p className="font-sans text-[13.5px] font-light text-foreground/75 leading-[1.75]">
            The absence of strong symptoms does not mean anything is wrong. Most pregnancies are healthy,
            even in the very early weeks when very little feels different. Your baby is growing exactly
            where it needs to be.
          </p>
        </div>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────────────
   5. THE REAL EXPERIENCE  +  WHAT'S NORMAL  +  FOCUS THIS WEEK (split)
   ───────────────────────────────────────────────────────────────────── */
const realExperience = [
  "Feelings come in waves",
  "Cravings or aversions may show up",
  "Symptoms vary from person to person",
  "Checking the test again is normal",
  "Rest is productive",
  "The unknowns are normal",
];

const normalList = [
  "Fatigue",
  "Light spotting or mild cramping",
  "Breast tenderness or swelling",
  "Bloating or gassiness",
  "Frequent urination",
  "Emotions that feel all over the place",
];

const focusList = [
  { Icon: Calendar, title: "Book your GP or midwife appointment", note: "Get early care and answers" },
  { Icon: Apple, title: "Begin folic acid", note: "400–800mcg daily to support neural tube development" },
  { Icon: Heart, title: "Rest when you can", note: "Your body is working hard behind the scenes" },
  { Icon: Sprout, title: "Eat well, hydrate often", note: "Small, nourishing meals and hydrating foods" },
];

const Week4ExperienceRow = () => (
  <section className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-14 md:py-20">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Real experience */}
      <div className="relative bg-lavender-bg/60 rounded-2xl border border-border/30 p-7 overflow-hidden">
        <img src={botanicalAccent} alt="" aria-hidden="true"
          className="absolute left-0 top-0 w-20 opacity-30 pointer-events-none select-none" />
        <h3 className="font-serif text-[1.4rem] text-foreground mb-5 relative">The real experience</h3>
        <ul className="space-y-3 relative">
          {realExperience.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <Check size={13} className="text-sage mt-1 shrink-0" />
              <span className="font-sans text-[13px] font-light text-foreground/80 leading-snug">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* What's normal */}
      <div className="bg-stage-pregnancy/40 rounded-2xl border border-border/30 p-7">
        <h3 className="font-serif text-[1.4rem] text-foreground mb-5">What's normal</h3>
        <ul className="space-y-3">
          {normalList.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <Check size={13} className="text-sage mt-1 shrink-0" />
              <span className="font-sans text-[13px] font-light text-foreground/80 leading-snug">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Focus this week */}
      <div id="focus" className="bg-card rounded-2xl border border-border/40 p-7 shadow-card-brand">
        <h3 className="font-serif text-[1.4rem] text-foreground mb-5">What to focus on this week</h3>
        <div className="space-y-3">
          {focusList.map(({ Icon, title, note }) => (
            <div key={title} className="flex items-start gap-3 p-3 rounded-xl border border-border/30 hover:border-sage/30 hover:bg-sage-bg/30 transition-colors">
              <span className="w-9 h-9 rounded-full bg-stage-pregnancy/60 flex items-center justify-center shrink-0">
                <Icon size={14} className="text-terracotta/80" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-sans text-[12.5px] font-medium text-foreground leading-snug">{title}</p>
                <p className="font-sans text-[11.5px] font-light text-muted-foreground leading-snug mt-0.5">{note}</p>
              </div>
              <ChevronRight size={13} className="text-muted-foreground/50 mt-3 shrink-0" />
            </div>
          ))}
        </div>
        <Link to="/pregnancy/first-trimester"
          className="inline-flex items-center gap-1.5 mt-5 font-sans text-[12.5px] text-sage hover:gap-2.5 transition-all">
          View all next steps <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────────────
   6. WHEN TO SEEK SUPPORT (warm warning card, full width)
   ───────────────────────────────────────────────────────────────────── */
const seekSupport = [
  "Heavy bleeding significantly different from a period",
  "Severe one-sided pain",
  "Fever or feeling very unwell",
  "Severe vomiting or signs of dehydration",
  "Anything that just doesn't feel right",
];

const Week4SeekSupport = () => (
  <section id="support" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl pb-14 md:pb-20">
    <div className="bg-gradient-to-br from-stage-pregnancy/50 to-parchment-dark/40 rounded-2xl border border-terracotta/20 p-7 md:p-9">
      <div className="flex flex-col md:flex-row md:items-start md:gap-8">
        <div className="flex items-center gap-3 mb-4 md:mb-0 md:flex-col md:items-start md:w-44 shrink-0">
          <span className="w-11 h-11 rounded-full bg-terracotta/15 flex items-center justify-center">
            <AlertTriangle size={17} className="text-terracotta" />
          </span>
          <div>
            <p className="font-sans text-[10.5px] font-medium tracking-[0.22em] uppercase text-terracotta/80 md:mt-3">Care</p>
            <h3 className="font-serif text-[1.35rem] md:text-[1.5rem] text-foreground md:mt-1">When to seek support</h3>
          </div>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 flex-1">
          {seekSupport.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-terracotta/70 mt-2 shrink-0" />
              <span className="font-sans text-[13px] font-light text-foreground/80 leading-snug">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────────────
   7. NORMAL RIGHT NOW — soft chip strip
   ───────────────────────────────────────────────────────────────────── */
const chips = [
  "Feeling very tired (and needing rest)",
  "Feeling emotional or teary",
  "Bloating or gassiness",
  "Helping your mind stay calm",
  "Not knowing what to feel yet",
];

const Week4NormalChips = () => (
  <section className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl pb-14 md:pb-16">
    <div className="bg-card rounded-2xl border border-border/40 p-5 sm:p-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
      <p className="font-serif text-[1.05rem] text-foreground shrink-0 md:pr-5 md:border-r border-border/30">
        What's normal right now
      </p>
      <div className="flex flex-wrap gap-2">
        {chips.map((c) => (
          <span key={c} className="font-sans text-[12px] font-light text-foreground/75 bg-parchment-dark/60 border border-border/30 px-3.5 py-1.5 rounded-full">
            {c}
          </span>
        ))}
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────────────
   8. QUOTE BAND
   ───────────────────────────────────────────────────────────────────── */
const Week4Quote = () => (
  <section className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl pb-14 md:pb-20">
    <div className="bg-stage-pregnancy/35 rounded-2xl border border-border/30 p-9 md:p-12 text-center relative">
      <span className="absolute left-6 top-5 font-serif text-3xl text-terracotta/40 leading-none">“</span>
      <span className="absolute right-6 bottom-3 font-serif text-3xl text-terracotta/40 leading-none">”</span>
      <p className="font-serif italic text-[1.25rem] md:text-[1.55rem] text-foreground/85 leading-snug max-w-3xl mx-auto">
        It's okay if it doesn't feel real yet. Small steps, deep breaths, and grace are enough.
      </p>
      <Heart size={14} className="text-terracotta/50 mx-auto mt-4" />
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────────────
   9. REFLECTION + ASK
   ───────────────────────────────────────────────────────────────────── */
const askChips = ["Implantation", "Spotting", "Cramping", "Testing", "Emotions"];

const Week4ReflectionAsk = () => (
  <section className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl pb-16 md:pb-24">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Reflection */}
      <div className="bg-card rounded-2xl border border-border/40 p-7 md:p-8 shadow-card-brand">
        <div className="flex items-center gap-2.5 mb-4">
          <span className="w-8 h-8 rounded-full bg-sage-bg flex items-center justify-center">
            <Leaf size={13} className="text-sage" />
          </span>
          <h3 className="font-serif text-[1.3rem] text-foreground">A moment for reflection</h3>
        </div>
        <p className="font-sans text-[12.5px] font-light text-muted-foreground leading-relaxed mb-4">
          What has this week felt like for you, in ways you might not have expected?
        </p>
        <textarea
          rows={3}
          placeholder="Write your thoughts…"
          className="w-full bg-parchment-dark/40 border border-border/40 rounded-xl px-4 py-3 font-sans text-[13px] text-foreground placeholder:text-muted-foreground/60 resize-none focus:outline-none focus:border-sage/50 transition-colors"
        />
        <Link
          to="/auth"
          className="inline-flex items-center gap-2 mt-4 bg-terracotta text-terracotta-foreground rounded-pill px-5 py-2.5 font-sans text-[12.5px] font-medium hover:bg-terracotta-hover transition-colors"
        >
          Save reflection to your journal
        </Link>
      </div>

      {/* Ask */}
      <div className="bg-card rounded-2xl border border-border/40 p-7 md:p-8 shadow-card-brand">
        <div className="flex items-center gap-2.5 mb-4">
          <span className="w-8 h-8 rounded-full bg-lavender-bg flex items-center justify-center">
            <MessageCircle size={13} className="text-lavender-foreground" />
          </span>
          <h3 className="font-serif text-[1.3rem] text-foreground">Ask about this week</h3>
        </div>
        <p className="font-sans text-[12.5px] font-light text-muted-foreground leading-relaxed mb-4">
          Have a question or wondering on your mind?
        </p>
        <input
          type="text"
          placeholder="Ask your question…"
          className="w-full bg-parchment-dark/40 border border-border/40 rounded-full px-5 py-3 font-sans text-[13px] text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-sage/50 transition-colors"
        />
        <p className="font-sans text-[10.5px] tracking-wider uppercase text-muted-foreground/70 mt-5 mb-2.5">
          Popular topics
        </p>
        <div className="flex flex-wrap gap-2">
          {askChips.map((c) => (
            <Link
              key={c}
              to="/ask"
              className="font-sans text-[11.5px] text-foreground/75 bg-parchment-dark/50 border border-border/40 hover:border-sage/40 hover:text-foreground px-3.5 py-1.5 rounded-full transition-colors"
            >
              {c}
            </Link>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────────────
   10. JOURNAL BAND — Real Start of You journal
   ───────────────────────────────────────────────────────────────────── */
const Week4Journal = () => (
  <section className="bg-sage-bg/40 py-16 md:py-20 border-y border-border/30">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="bg-card rounded-3xl border border-border/30 overflow-hidden shadow-card-brand grid grid-cols-1 md:grid-cols-2">
        <div className="aspect-[4/3] md:aspect-auto md:min-h-[360px] relative overflow-hidden">
          <img src={journalImg} alt="The Start of You journal flatlay"
            loading="lazy" width={1200} height={900}
            className="w-full h-full object-cover object-[50%_45%]" />
        </div>
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <p className="font-sans text-[10.5px] font-medium tracking-[0.25em] uppercase text-sage-muted mb-3">
            The Start of You journal
          </p>
          <h3 className="font-serif text-[1.7rem] md:text-[2rem] text-foreground leading-tight mb-4">
            Your story, beautifully remembered
          </h3>
          <p className="font-sans text-[13.5px] font-light text-muted-foreground leading-relaxed mb-5">
            The Start of You Journal helps you capture every feeling, milestone and memory through
            pregnancy and beyond.
          </p>
          <ul className="space-y-2 mb-7">
            {[
              "Guided prompts for every stage",
              "Space for reflections, scans and keepsakes",
              "A lasting keepsake for you and your baby",
            ].map((line) => (
              <li key={line} className="flex items-start gap-2.5">
                <Check size={13} className="text-sage mt-1 shrink-0" />
                <span className="font-sans text-[13px] font-light text-foreground/80">{line}</span>
              </li>
            ))}
          </ul>
          <Link
            to="/pregnancy/week/5"
            className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-5 py-2.5 font-sans text-[13px] font-medium shadow-cta hover:bg-terracotta-hover transition-colors w-fit"
          >
            Explore week 5 <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────────────
   11. RELATED GUIDANCE
   ───────────────────────────────────────────────────────────────────── */
const related = [
  { slug: "implantation-bleeding", img: implantationImg, tag: "Early pregnancy",
    title: "Implantation bleeding: what it is and what's normal",
    desc: "How to tell the difference and when to reach out." },
  { slug: "nausea-in-early-pregnancy", img: nauseaImg, tag: "Nutrition",
    title: "Nausea in early pregnancy: tips that actually help",
    desc: "Simple, gentle ideas to feel more comfortable." },
  { slug: "early-pregnancy-symptoms", img: earlySymptomsImg, tag: "Self-care",
    title: "Early pregnancy symptoms explained",
    desc: "What's common, what's normal and what to do." },
  { slug: "fatigue-in-early-pregnancy", img: fatigueImg, tag: "Wellness",
    title: "Rest and your early pregnancy",
    desc: "Why rest matters and how to make space for it." },
];

const Week4Related = () => (
  <section id="guidance" className="bg-parchment py-16 md:py-20">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
      <div className="flex items-end justify-between mb-8">
        <h2 className="font-serif text-[1.85rem] md:text-[2.25rem] text-foreground leading-tight">
          Related guidance for this week
        </h2>
        <Link to="/guidance" className="hidden sm:inline-flex items-center gap-1.5 font-sans text-[12.5px] text-sage hover:gap-2.5 transition-all">
          View all articles <ArrowRight size={12} />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {related.map((a) => (
          <Link key={a.slug} to={`/articles/${a.slug}`}
            className="group flex flex-col bg-card rounded-2xl overflow-hidden border border-border/30 shadow-card-brand hover:shadow-soft hover:-translate-y-1 transition-all duration-500">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={a.img} alt={a.title} loading="lazy" width={640} height={480}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="p-5 flex flex-col flex-1">
              <span className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-terracotta/80 mb-2">
                {a.tag}
              </span>
              <h3 className="font-serif text-[1rem] text-foreground leading-snug mb-2 group-hover:text-sage transition-colors">
                {a.title}
              </h3>
              <p className="font-sans text-[12px] font-light text-muted-foreground leading-relaxed">
                {a.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────────────
   12. FAQ — search-intent depth
   ───────────────────────────────────────────────────────────────────── */
const faqs = [
  { q: "Is 4 weeks very early?",
    a: "Yes — 4 weeks is one of the earliest moments a pregnancy can be confirmed. Implantation has only just occurred, and hormone levels are only beginning to rise. There is still very little to see, but a lot is quietly underway." },
  { q: "Should I already have symptoms?",
    a: "Not necessarily. Many people feel little or nothing at 4 weeks, and that is entirely normal. Symptoms tend to build between weeks 5 and 9 as hCG rises more sharply." },
  { q: "Can I have no symptoms and still be pregnant?",
    a: "Yes. The presence or absence of early symptoms is not a reliable sign of how the pregnancy is progressing. Many healthy pregnancies have very quiet first few weeks." },
  { q: "Is cramping normal at 4 weeks?",
    a: "Mild cramping similar to period cramps is common as your uterus begins to adjust. Severe, sharp or one-sided pain — or pain with heavy bleeding — should always be checked." },
  { q: "Can implantation bleeding happen at 4 weeks?",
    a: "Yes. Light pink or brown spotting around the time of your expected period can be implantation bleeding. It is usually much lighter than a period and only lasts a day or two." },
  { q: "When should I book my first appointment?",
    a: "As soon as you have a positive test. Booking with your GP or midwife early in the UK ensures you're in the system for your first booking appointment, usually held between weeks 8 and 10." },
];

const FAQRow = ({ faq, defaultOpen = false }: { faq: { q: string; a: string }; defaultOpen?: boolean }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border/40">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-start gap-4 py-5 text-left group">
        <span className="flex-1 font-serif text-[1.05rem] md:text-[1.15rem] text-foreground group-hover:text-sage transition-colors">
          {faq.q}
        </span>
        <span className="w-7 h-7 rounded-full bg-sage-bg flex items-center justify-center text-sage shrink-0 mt-1">
          {open ? <Minus size={13} /> : <Plus size={13} />}
        </span>
      </button>
      {open && (
        <p className="font-sans text-[13.5px] font-light text-muted-foreground leading-[1.75] pb-6 pr-12">
          {faq.a}
        </p>
      )}
    </div>
  );
};

const Week4FAQ = () => (
  <section className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
      <div className="mb-8 text-center">
        <p className="font-sans text-[11px] font-medium tracking-[0.25em] uppercase text-sage-muted mb-3">FAQs</p>
        <h2 className="font-serif text-[1.85rem] md:text-[2.25rem] text-foreground leading-tight">
          Common questions at 4 weeks
        </h2>
      </div>
      <div>
        {faqs.map((f, i) => (
          <FAQRow key={f.q} faq={f} defaultOpen={i === 0} />
        ))}
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────────────
   13. NEXT WEEK CTA
   ───────────────────────────────────────────────────────────────────── */
const Week4Next = () => (
  <section className="bg-parchment py-16 md:py-20">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
      <div className="bg-gradient-to-br from-sage-bg via-parchment to-stage-pregnancy/30 rounded-3xl border border-border/30 p-9 md:p-12 text-center">
        <p className="font-sans text-[11px] font-medium tracking-[0.25em] uppercase text-sage-muted mb-3">Up next</p>
        <h2 className="font-serif text-[1.85rem] md:text-[2.4rem] text-foreground leading-tight mb-3">
          Ready for week 5?
        </h2>
        <p className="font-sans text-[14px] font-light text-muted-foreground max-w-lg mx-auto mb-7 leading-relaxed">
          Hormones rise more sharply from week 5. The first signs of nausea or stronger fatigue often
          begin to appear.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
          <Link to="/pregnancy/week/5"
            className="inline-flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[13.5px] font-medium shadow-cta hover:bg-terracotta-hover transition-colors">
            Continue to week 5 <ArrowRight size={14} />
          </Link>
          <Link to="/pregnancy/first-trimester"
            className="inline-flex items-center justify-center gap-2 border border-foreground/20 text-foreground rounded-pill px-7 py-3.5 font-sans text-[13.5px] font-light hover:bg-parchment-dark transition-colors">
            Back to First Trimester
          </Link>
        </div>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────────────────────────────── */
const Week4Page = () => (
  <div className="min-h-screen bg-parchment">
    <Navbar />
    <Week4Hero />
    <Week4MetaBar />
    <Week4TopSplit />
    <Week4Happening />
    <Week4ExperienceRow />
    <Week4SeekSupport />
    <Week4NormalChips />
    <Week4Quote />
    <Week4ReflectionAsk />
    <Week4Journal />
    <Week4Related />
    <Week4FAQ />
    <Week4Next />
    <Footer />
  </div>
);

export default Week4Page;
