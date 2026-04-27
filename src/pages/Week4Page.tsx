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
  Droplet,
  Moon,
  Wind,
  Coffee,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import embryoImg from "@/assets/week4-embryo.jpg";
import poppyImg from "@/assets/week4-poppy-seed.jpg";
import biologyImg from "@/assets/week4-biology-detail.jpg";
import journalImg from "@/assets/journal-flatlay.jpg";
import botanicalTr from "@/assets/botanical-branch-tr.png";
import botanicalBl from "@/assets/botanical-branch-bl.png";
import botanicalAccent from "@/assets/article-botanical-accent.png";
import implantationImg from "@/assets/article-hero-implantation.jpg";
import earlySymptomsImg from "@/assets/article-hero-early-symptoms.jpg";
import emotionalImg from "@/assets/article-hero-emotional-first-tri.jpg";
import testsScansImg from "@/assets/article-hero-tests-scans.jpg";
import symptomsStoppingImg from "@/assets/article-hero-symptoms-stopping.jpg";
import fatigueImg from "@/assets/article-hero-fatigue.jpg";

/* ─────────────────────────────────────────────────────────────────────
   Shared premium card primitives
   ───────────────────────────────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────────────────────────────
   1. HERO — Week identity, premium cluster
   ───────────────────────────────────────────────────────────────────── */
const Week4Hero = () => (
  <section className="relative overflow-hidden">
    <div className="relative bg-gradient-to-br from-sage-bg/70 via-parchment to-sage-bg/40 pt-20 pb-36 sm:pt-24 sm:pb-44 md:pt-32 md:pb-52">
      {/* ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[820px] h-[420px] rounded-full bg-sage-light/25 blur-3xl" />
        <div className="absolute -top-10 right-1/4 w-[260px] h-[260px] rounded-full bg-terracotta/5 blur-3xl" />
      </div>
      <img src={botanicalBl} alt="" aria-hidden="true"
        className="pointer-events-none absolute top-20 left-0 w-[150px] lg:w-[210px] opacity-25 select-none hidden md:block" />
      <img src={botanicalTr} alt="" aria-hidden="true"
        className="pointer-events-none absolute top-20 right-0 w-[150px] lg:w-[210px] opacity-25 select-none hidden md:block" />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl relative z-10 text-center">
        <nav aria-label="breadcrumb" className="flex items-center justify-center gap-2 mb-6 sm:mb-7 font-sans text-[12px] font-normal text-foreground/65">
          <Link to="/pregnancy" className="hover:text-foreground transition-colors">Pregnancy</Link>
          <span className="text-foreground/30">›</span>
          <Link to="/pregnancy/first-trimester" className="hover:text-foreground transition-colors">Week by week</Link>
          <span className="text-foreground/30">›</span>
          <span className="text-foreground">Week 4</span>
        </nav>

        <p className="font-sans text-[11px] font-semibold tracking-[0.3em] uppercase text-sage mb-5">
          First Trimester · The very beginning
        </p>
        <h1 className="font-serif text-[2.5rem] sm:text-5xl md:text-[3.75rem] lg:text-[4.25rem] text-foreground leading-[1.04] tracking-tight mb-4 md:mb-5">
          4 Weeks Pregnant
        </h1>
        <p className="font-serif italic text-[1.05rem] sm:text-lg md:text-xl text-foreground/75 max-w-xl mx-auto leading-relaxed">
          A pregnancy test may now be positive — even though almost everything important is still happening too quietly to feel.
        </p>
      </div>

      <Link to="/pregnancy/week/3" aria-label="Go to week 3"
        className="absolute left-3 sm:left-6 md:left-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronLeft size={18} />
      </Link>
      <Link to="/pregnancy/week/5" aria-label="Go to week 5"
        className="absolute right-3 sm:right-6 md:right-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronRight size={18} />
      </Link>
    </div>

    {/* Premium floating cluster */}
    <div className="relative -mt-28 sm:-mt-36 md:-mt-40 mb-6">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex items-end justify-center gap-5 sm:gap-10 md:gap-14">
          {/* Poppy seed — size reference */}
          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-card border-[3px] border-sage/15 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={poppyImg} alt="Poppy seed" loading="lazy" width={512} height={512}
                className="w-full h-full object-cover" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.04]" />
            </div>
            <div className="text-center">
              <p className="font-serif italic text-[12.5px] text-foreground/80 leading-tight">poppy seed</p>
              <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/55 mt-1">~2&nbsp;mm</p>
            </div>
          </div>

          {/* Embryo medallion */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full bg-card border-[4px] border-sage/20 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={embryoImg} alt="Editorial illustration of a 4-week embryo"
                width={1024} height={1024}
                className="w-full h-full object-cover" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.05]" />
            </div>
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.22em] uppercase text-foreground/65">Your baby this week</p>
          </div>

          {/* Weeks to go */}
          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-stage-pregnancy/85 to-stage-pregnancy/40 border-[3px] border-terracotta/25 flex items-center justify-center shadow-elevated">
              <span className="font-serif text-[1.7rem] sm:text-[1.95rem] text-foreground tracking-tight leading-none">36</span>
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-terracotta/10" />
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

/* ─────────────────────────────────────────────────────────────────────
   2. META BAR — Reviewer + on-this-page anchors
   ───────────────────────────────────────────────────────────────────── */
const anchors = [
  { id: "at-a-glance", label: "At a glance", Icon: Sparkles },
  { id: "biology", label: "What's underway", Icon: Sprout },
  { id: "body", label: "Body changes", Icon: Activity },
  { id: "symptoms", label: "Symptoms", Icon: HeartPulse },
  { id: "emotional", label: "Emotionally", Icon: Heart },
  { id: "what-this-means", label: "What this means", Icon: Leaf },
  { id: "focus", label: "Focus this week", Icon: Calendar },
  { id: "support", label: "Seek support", Icon: ShieldCheck },
  { id: "guidance", label: "Read next", Icon: BookOpen },
];

const Week4MetaBar = () => (
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
              Updated for 2026 · 8 min read · Early pregnancy
            </p>
          </div>
        </div>
        <nav aria-label="On this page" className="flex-1 pt-4 lg:pt-0">
          <div className="flex gap-x-1 gap-y-2 overflow-x-auto lg:flex-wrap scrollbar-none -mx-1 px-1">
            {anchors.map(({ id, label, Icon }) => (
              <a key={id} href={`#${id}`}
                className="group shrink-0 flex items-center gap-2 px-3 py-2 rounded-full hover:bg-sage-bg/60 transition-colors">
                <span className="w-7 h-7 rounded-full bg-parchment-dark/80 border border-border/30 flex items-center justify-center group-hover:border-sage/30 transition-colors">
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

/* ─────────────────────────────────────────────────────────────────────
   3. AT A GLANCE — premium two-column with key facts
   ───────────────────────────────────────────────────────────────────── */
const glanceFacts = [
  { label: "Stage", value: "First trimester" },
  { label: "Baby size", value: "~2 mm — poppy seed" },
  { label: "Hormone", value: "hCG starting to rise" },
  { label: "Test", value: "May now be positive" },
];

const Week4AtAGlance = () => (
  <section id="at-a-glance" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl mb-14 md:mb-20">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 relative bg-gradient-to-br from-stage-pregnancy/45 via-parchment to-parchment-dark/50 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-10 overflow-hidden shadow-card-brand">
        <img src={botanicalAccent} alt="" aria-hidden="true"
          className="absolute -left-3 bottom-0 w-28 opacity-35 pointer-events-none select-none" />
        <SectionLabel tone="terracotta">At a glance</SectionLabel>
        <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-5">
          Week 4 is small, quiet — and quietly enormous.
        </h2>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8] mb-4">
          Implantation has likely just happened, or is happening this week. The embryo is no bigger than a poppy seed,
          but the biological scaffolding for a whole pregnancy — placenta, yolk sac, the earliest layers that become organs —
          is already being laid down.
        </p>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8]">
          You may have just had a positive test, or be about to. Some people feel early signs. Many feel almost nothing.
          Both are entirely normal at week 4.
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

/* ─────────────────────────────────────────────────────────────────────
   4. WHAT'S UNDERWAY BIOLOGICALLY — editorial split with image
   ───────────────────────────────────────────────────────────────────── */
const biologyPoints = [
  { title: "Implantation", body: "The fertilised egg burrows into the lining of the uterus, forming a stable connection with your blood supply. This is what allows the pregnancy to begin in earnest." },
  { title: "Earliest placenta", body: "A structure called the trophoblast begins forming what will become the placenta. It also produces hCG — the hormone a pregnancy test detects." },
  { title: "Three foundational layers", body: "The embryo organises into three layers (ectoderm, mesoderm, endoderm). Every organ, bone, nerve and tissue eventually grows from these." },
  { title: "Yolk sac", body: "A tiny yolk sac forms to nourish the embryo before the placenta is fully ready to take over." },
];

const Week4Biology = () => (
  <section id="biology" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="relative rounded-3xl overflow-hidden border border-border/40 shadow-card-brand">
            <div className="aspect-[4/5]">
              <img src={biologyImg} alt="A poppy seed beside a soft sketch of cell layers"
                loading="lazy" width={1024} height={1280}
                className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-foreground/60 to-transparent">
              <p className="font-serif italic text-[13px] text-background/95 leading-snug">
                Microscopic, but already organising itself.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <SectionLabel>What's underway biologically</SectionLabel>
          <h2 className="font-serif text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-5">
            A lot is happening — even though there is almost nothing to feel.
          </h2>
          <p className="font-sans text-[14px] font-light text-muted-foreground leading-[1.85] mb-8 max-w-2xl">
            Week 4 is one of the most quietly important weeks of pregnancy. The embryo is microscopic, but the
            architecture for everything that follows is being put in place. This is why week 4 can feel uneventful
            and momentous at the same time.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {biologyPoints.map((p, i) => (
              <div key={p.title}
                className="relative bg-card rounded-2xl border border-border/40 p-6 shadow-card-brand">
                <span className="absolute top-5 right-5 font-serif italic text-[12px] text-sage-muted/70">0{i + 1}</span>
                <h3 className="font-serif text-[1.1rem] text-foreground mb-2 pr-7">{p.title}</h3>
                <p className="font-sans text-[12.5px] font-light text-muted-foreground leading-[1.7]">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────────────
   5. BODY THIS WEEK — hormones + signs panel
   ───────────────────────────────────────────────────────────────────── */
const hormoneNotes = [
  { Icon: Sparkles, title: "hCG", body: "Begins to rise quickly after implantation. This is the hormone pregnancy tests detect — and the one most responsible for early symptoms." },
  { Icon: Droplet, title: "Progesterone", body: "Rises to keep the uterine lining stable and pregnancy-supportive. It's also behind a lot of bloating, slowed digestion and tiredness." },
  { Icon: Wind, title: "Oestrogen", body: "Climbs gradually, supporting placental development and increasing blood flow. Some people notice tender breasts or heightened smell sensitivity." },
];

const Week4Body = () => (
  <section id="body" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel tone="terracotta">Your body this week</SectionLabel>
      <h2 className="font-serif text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        Hormones are starting their long, steady climb.
      </h2>
      <p className="font-sans text-[14px] font-light text-muted-foreground leading-[1.85]">
        At week 4 you may not look or feel different — but biochemically, your body has already started shifting.
        Some people feel almost nothing. Others feel a wave of new sensations within days. Both fit inside normal.
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {hormoneNotes.map(({ Icon, title, body }) => (
        <div key={title}
          className="relative bg-card rounded-2xl border border-border/40 p-7 shadow-card-brand overflow-hidden">
          <span className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sage/30 to-transparent" />
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-10 rounded-full bg-sage-bg border border-sage/15 flex items-center justify-center">
              <Icon size={15} className="text-sage" />
            </span>
            <h3 className="font-serif text-[1.2rem] text-foreground">{title}</h3>
          </div>
          <p className="font-sans text-[13px] font-light text-muted-foreground leading-[1.75]">{body}</p>
        </div>
      ))}
    </div>

    <div className="mt-6 bg-stage-pregnancy/35 border border-border/30 rounded-2xl p-6 md:p-7 flex flex-col md:flex-row md:items-center gap-4">
      <span className="w-10 h-10 rounded-full bg-card border border-border/40 flex items-center justify-center shrink-0">
        <HeartPulse size={15} className="text-terracotta" />
      </span>
      <p className="font-sans text-[13.5px] font-light text-foreground/80 leading-[1.7]">
        Many week-4 symptoms overlap with PMS — sore breasts, cramping, bloating, fatigue, mood shifts. That overlap
        is one reason early pregnancy can be hard to read by feel alone.
      </p>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────────────
   6. COMMON SYMPTOMS — premium expanded grid (what / why / normal?)
   ───────────────────────────────────────────────────────────────────── */
const symptoms = [
  {
    Icon: Droplet,
    name: "Light spotting",
    feels: "Pink or brown discharge, far lighter than a period, often only when you wipe.",
    why: "May be implantation bleeding as the embryo settles into the uterine lining.",
    normal: "Usually normal if light and brief. Always check if it's heavy, bright red or with cramping.",
  },
  {
    Icon: HeartPulse,
    name: "Mild cramping",
    feels: "Period-like tugging, dull aching or a small pulling sensation low down.",
    why: "Your uterus is responding to implantation and early hormonal change.",
    normal: "Mild, intermittent cramping is common. Sharp, severe or one-sided pain should be checked.",
  },
  {
    Icon: Heart,
    name: "Breast tenderness",
    feels: "Heavy, sore or tingling breasts; sometimes darker nipples or visible veins.",
    why: "Rising oestrogen and progesterone prepare breast tissue for later milk production.",
    normal: "Very common. Tends to settle and shift across the trimester.",
  },
  {
    Icon: Moon,
    name: "Fatigue",
    feels: "A heavier, deeper tiredness than usual — sometimes mid-afternoon, sometimes all day.",
    why: "Progesterone is sedating, and your body is using significant energy to support implantation.",
    normal: "Very common from week 4 onward. Rest is genuinely doing something.",
  },
  {
    Icon: Wind,
    name: "Bloating",
    feels: "A puffy, slowed-down feeling in your stomach, similar to pre-period bloating.",
    why: "Progesterone slows digestion to give nutrients more time to absorb.",
    normal: "Normal. Severe pain or sudden swelling is not — get checked.",
  },
  {
    Icon: Coffee,
    name: "Frequent urination",
    feels: "Needing the toilet more often, including at night.",
    why: "Hormonal shifts and increased blood flow start affecting the kidneys early.",
    normal: "Common. Burning, urgency or pain when urinating is not — that may be a UTI.",
  },
  {
    Icon: Apple,
    name: "Food and smell shifts",
    feels: "Strong reactions to foods or smells you usually like — or sudden cravings.",
    why: "Heightened oestrogen sharpens the sense of smell, which influences taste.",
    normal: "Normal in early pregnancy and often comes and goes.",
  },
  {
    Icon: Sparkles,
    name: "Almost no symptoms",
    feels: "Feeling much like usual, even after a positive test.",
    why: "Hormone levels are still relatively low. Many people don't feel much until weeks 5–7.",
    normal: "Reassuring, not concerning. Symptom-free weeks are common in healthy pregnancies.",
  },
];

const Week4Symptoms = () => (
  <section id="symptoms" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="max-w-2xl mb-10">
        <SectionLabel>Common symptoms</SectionLabel>
        <h2 className="font-serif text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
          What may show up this week — and what each one really means.
        </h2>
        <p className="font-sans text-[14px] font-light text-muted-foreground leading-[1.85]">
          Symptoms at week 4 vary enormously. Some people feel a clear shift; others feel almost nothing. The
          intensity of your symptoms is not a measure of how the pregnancy is going.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
        {symptoms.map(({ Icon, name, feels, why, normal }) => (
          <article key={name}
            className="group relative bg-card rounded-2xl border border-border/40 p-6 md:p-7 shadow-card-brand hover:shadow-soft transition-all duration-500">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border/40">
              <span className="w-10 h-10 rounded-full bg-stage-pregnancy/60 flex items-center justify-center">
                <Icon size={15} className="text-terracotta/80" />
              </span>
              <h3 className="font-serif text-[1.15rem] text-foreground leading-snug">{name}</h3>
            </div>
            <dl className="space-y-3">
              <div>
                <dt className="font-sans text-[10px] tracking-[0.22em] uppercase text-sage-muted mb-1">What it feels like</dt>
                <dd className="font-sans text-[13px] font-light text-foreground/80 leading-[1.7]">{feels}</dd>
              </div>
              <div>
                <dt className="font-sans text-[10px] tracking-[0.22em] uppercase text-sage-muted mb-1">Why it happens</dt>
                <dd className="font-sans text-[13px] font-light text-muted-foreground leading-[1.7]">{why}</dd>
              </div>
              <div>
                <dt className="font-sans text-[10px] tracking-[0.22em] uppercase text-sage-muted mb-1">Is it normal?</dt>
                <dd className="font-sans text-[13px] font-light text-muted-foreground leading-[1.7]">{normal}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link to="/articles/early-pregnancy-symptoms"
          className="inline-flex items-center gap-2 font-sans text-[13px] text-sage hover:gap-3 transition-all">
          Read the full guide to early pregnancy symptoms <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────────────
   7. EMOTIONAL LANDSCAPE — premium dual card
   ───────────────────────────────────────────────────────────────────── */
const emotionalTruths = [
  "Taking the test more than once just to check.",
  "Feeling excited and afraid at the same time.",
  "Holding back from telling anyone yet.",
  "Not believing it's real until something shifts in your body.",
  "Extra tenderness if you've been trying for a long time, or had a previous loss.",
  "Feeling almost nothing emotionally — and worrying about that, too.",
  "The strange quietness of something huge happening invisibly.",
];

const Week4Emotional = () => (
  <section id="emotional" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-2 relative bg-gradient-to-br from-lavender-bg via-parchment to-lavender-bg/40 rounded-3xl border border-border/40 p-8 md:p-9 shadow-card-brand overflow-hidden">
        <img src={botanicalAccent} alt="" aria-hidden="true"
          className="absolute right-0 top-0 w-24 opacity-35 pointer-events-none select-none" />
        <SectionLabel tone="lavender">Emotionally this week</SectionLabel>
        <h2 className="font-serif text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-4">
          A lot, very quietly, all at once.
        </h2>
        <p className="font-sans text-[14px] font-light text-foreground/80 leading-[1.85] mb-4">
          Week 4 is emotionally specific. The pregnancy is real on paper, but doesn't feel real in your body yet.
          That gap between knowing and feeling can be confusing, joyful, anxious or numb — sometimes all on the same day.
        </p>
        <p className="font-sans text-[13.5px] font-light text-muted-foreground leading-[1.75]">
          Whatever you're feeling, you don't need to perform any particular emotion right now.
        </p>
      </div>

      <div className="lg:col-span-3 bg-card rounded-3xl border border-border/40 p-8 md:p-9 shadow-card-brand">
        <p className="font-sans text-[10.5px] font-medium tracking-[0.25em] uppercase text-sage-muted mb-4">
          What this week often looks like
        </p>
        <ul className="space-y-3.5">
          {emotionalTruths.map((t) => (
            <li key={t} className="flex items-start gap-3">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-lavender shrink-0" />
              <span className="font-serif italic text-[14.5px] text-foreground/85 leading-[1.65]">{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────────────
   8. WHAT THIS MEANS — sharp interpretation block
   ───────────────────────────────────────────────────────────────────── */
const meaningPoints = [
  { title: "It's very early — and already real.", body: "A positive test at week 4 means hCG is rising. The pregnancy has begun, even if everything is still microscopic." },
  { title: "Quiet doesn't mean wrong.", body: "Feeling almost nothing is one of the most common experiences at week 4. Symptom intensity does not predict outcome." },
  { title: "Symptoms can come and go.", body: "Tiredness on Tuesday and not on Wednesday is normal. Hormone levels are climbing in waves, not in a straight line." },
  { title: "This is a week of waiting.", body: "Most of the answers people want at week 4 — scans, strong symptoms, certainty — arrive in the weeks ahead, not now." },
];

const Week4WhatThisMeans = () => (
  <section id="what-this-means" className="bg-sage-bg/35 py-16 md:py-24 border-y border-border/30">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
      <div className="text-center mb-10 max-w-2xl mx-auto">
        <SectionLabel>What this means</SectionLabel>
        <h2 className="font-serif text-[2rem] md:text-[2.4rem] text-foreground leading-tight">
          How to read week 4 honestly.
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {meaningPoints.map((m, i) => (
          <div key={m.title}
            className="relative bg-card rounded-2xl border border-border/40 p-7 shadow-card-brand">
            <span className="font-serif italic text-[12px] text-sage-muted/80">0{i + 1}</span>
            <h3 className="font-serif text-[1.2rem] text-foreground leading-snug mt-1 mb-3">{m.title}</h3>
            <p className="font-sans text-[13px] font-light text-muted-foreground leading-[1.75]">{m.body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────────────
   9. FOCUS THIS WEEK — premium ordered list
   ───────────────────────────────────────────────────────────────────── */
const focusList = [
  { Icon: Apple, title: "Begin or continue folic acid", note: "400–800 mcg daily. It supports neural tube development, which is happening right now." },
  { Icon: ShieldCheck, title: "Stop alcohol, smoking and recreational drugs", note: "If you haven't already. The earliest weeks are when the embryo is most sensitive." },
  { Icon: Stethoscope, title: "Contact your GP or midwife", note: "Your booking appointment usually happens between 8–10 weeks; getting in touch early secures it." },
  { Icon: Coffee, title: "Review caffeine and certain foods", note: "NHS guidance is up to 200 mg of caffeine a day, and avoiding unpasteurised dairy, raw meat/fish, pâté and high-mercury fish." },
  { Icon: Moon, title: "Make space to rest", note: "Tiredness from week 4 is real and biological. Earlier nights and softer evenings genuinely help." },
  { Icon: Heart, title: "Let the news land slowly", note: "You don't need to know how you feel about it yet. There's no deadline on emotion." },
];

const Week4Focus = () => (
  <section id="focus" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-4">
        <SectionLabel tone="terracotta">Focus this week</SectionLabel>
        <h2 className="font-serif text-[1.95rem] md:text-[2.2rem] text-foreground leading-tight mb-4">
          The handful of things that genuinely matter at 4 weeks.
        </h2>
        <p className="font-sans text-[13.5px] font-light text-muted-foreground leading-[1.85]">
          You don't need to do much. A few small, gentle decisions now make the biggest difference.
        </p>
      </div>
      <div className="lg:col-span-8">
        <ol className="bg-card rounded-3xl border border-border/40 shadow-card-brand divide-y divide-border/40 overflow-hidden">
          {focusList.map(({ Icon, title, note }, i) => (
            <li key={title}
              className="group flex items-start gap-5 p-6 md:p-7 hover:bg-sage-bg/25 transition-colors">
              <span className="w-10 h-10 rounded-full bg-stage-pregnancy/60 border border-border/40 flex items-center justify-center shrink-0">
                <Icon size={15} className="text-terracotta/85" />
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-3 mb-1.5">
                  <span className="font-serif italic text-[12px] text-sage-muted/70">0{i + 1}</span>
                  <h3 className="font-sans text-[14px] font-medium text-foreground leading-snug">{title}</h3>
                </div>
                <p className="font-sans text-[12.5px] font-light text-muted-foreground leading-[1.7]">{note}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────────────
   10. WHEN TO SEEK SUPPORT — refined warning card
   ───────────────────────────────────────────────────────────────────── */
const seekSupport = [
  "Heavy bleeding noticeably different from a period",
  "Severe or persistent one-sided pain",
  "Fever, chills or feeling very unwell",
  "Severe vomiting or signs of dehydration",
  "Pain in the shoulder tip, faintness or dizziness",
  "Anything that simply doesn't feel right",
];

const Week4SeekSupport = () => (
  <section id="support" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl pb-16 md:pb-24">
    <div className="relative bg-gradient-to-br from-stage-pregnancy/55 via-parchment to-parchment-dark/40 rounded-3xl border border-terracotta/20 p-8 md:p-10 shadow-card-brand overflow-hidden">
      <span className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-terracotta/30 to-transparent" />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
        <div className="md:col-span-4">
          <span className="inline-flex w-12 h-12 rounded-full bg-terracotta/15 items-center justify-center mb-4">
            <AlertTriangle size={18} className="text-terracotta" />
          </span>
          <SectionLabel tone="terracotta">When to seek care</SectionLabel>
          <h3 className="font-serif text-[1.5rem] md:text-[1.7rem] text-foreground leading-snug">
            Most early symptoms are normal. A few are worth checking quickly.
          </h3>
          <p className="font-sans text-[13px] font-light text-muted-foreground leading-[1.75] mt-3">
            Always trust your instincts. Contact your GP, midwife or NHS 111 — and 999 in an emergency.
          </p>
        </div>
        <ul className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5 self-center">
          {seekSupport.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-terracotta/70 mt-2 shrink-0" />
              <span className="font-sans text-[13px] font-light text-foreground/85 leading-[1.7]">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────────────
   11. QUOTE BAND
   ───────────────────────────────────────────────────────────────────── */
const Week4Quote = () => (
  <section className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl pb-16 md:pb-24">
    <div className="relative bg-stage-pregnancy/35 rounded-3xl border border-border/30 p-10 md:p-14 text-center overflow-hidden">
      <span className="absolute left-7 top-6 font-serif text-4xl text-terracotta/35 leading-none">“</span>
      <span className="absolute right-7 bottom-4 font-serif text-4xl text-terracotta/35 leading-none">”</span>
      <p className="font-serif italic text-[1.3rem] md:text-[1.6rem] text-foreground/85 leading-snug max-w-3xl mx-auto">
        It's okay if it doesn't feel real yet. Small steps, deep breaths, and grace are enough for week 4.
      </p>
      <Heart size={14} className="text-terracotta/50 mx-auto mt-5" />
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────────────
   12. REFLECTION + ASK — premium, integrated
   ───────────────────────────────────────────────────────────────────── */
const reflectionPrompts = ["What surprised me", "What I'm afraid of", "What I want to remember", "Who I might tell first"];
const askChips = ["Implantation bleeding", "Spotting vs. period", "Cramping at 4 weeks", "When to test again", "Telling a partner"];

const Week4ReflectionAsk = () => (
  <section className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl pb-16 md:pb-24">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-card rounded-3xl border border-border/40 border-t-2 border-t-sage/30 p-8 md:p-9 shadow-card-brand">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-9 h-9 rounded-full bg-sage-bg flex items-center justify-center">
            <Leaf size={14} className="text-sage" />
          </span>
          <div>
            <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-sage-muted">A moment for reflection</p>
            <h3 className="font-serif text-[1.35rem] text-foreground mt-0.5">What does this week feel like for you?</h3>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {reflectionPrompts.map((p) => (
            <span key={p} className="font-sans text-[10.5px] font-light bg-sage-bg/70 text-foreground/75 rounded-full px-3 py-1.5 border border-sage/15">
              {p}
            </span>
          ))}
        </div>
        <textarea rows={4} placeholder="Write your thoughts here… this is just for you."
          className="w-full bg-parchment/80 border border-border/40 rounded-xl px-4 py-3.5 font-sans text-[13px] text-foreground placeholder:text-muted-foreground/55 resize-none focus:outline-none focus:border-sage/50 focus:ring-1 focus:ring-sage/20 transition-all leading-relaxed" />
        <Link to="/auth"
          className="inline-flex items-center gap-2 mt-4 bg-terracotta text-terracotta-foreground rounded-pill px-5 py-2.5 font-sans text-[12.5px] font-medium hover:bg-terracotta-hover transition-colors">
          Save reflection to your journal <ArrowRight size={12} />
        </Link>
      </div>

      <div className="bg-card rounded-3xl border border-border/40 border-t-2 border-t-lavender/40 p-8 md:p-9 shadow-card-brand">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-9 h-9 rounded-full bg-lavender-bg flex items-center justify-center">
            <MessageCircle size={14} className="text-lavender-foreground" />
          </span>
          <div>
            <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-sage-muted">Ask about week 4</p>
            <h3 className="font-serif text-[1.35rem] text-foreground mt-0.5">A question on your mind?</h3>
          </div>
        </div>
        <p className="font-sans text-[12.5px] font-light text-muted-foreground leading-relaxed mb-4">
          Get a calm, evidence-led answer tailored to where you are right now.
        </p>
        <input type="text" placeholder="e.g. Is light pink spotting normal at 4 weeks?"
          className="w-full bg-parchment/80 border border-border/40 rounded-full px-5 py-3.5 font-sans text-[13px] text-foreground placeholder:text-muted-foreground/55 focus:outline-none focus:border-sage/50 focus:ring-1 focus:ring-sage/20 transition-all" />
        <p className="font-sans text-[10px] tracking-[0.22em] uppercase text-muted-foreground/75 mt-5 mb-2.5">
          Popular at this stage
        </p>
        <div className="flex flex-wrap gap-2">
          {askChips.map((c) => (
            <Link key={c} to="/ask"
              className="font-sans text-[11.5px] text-foreground/75 bg-parchment-dark/50 border border-border/40 hover:border-sage/40 hover:text-foreground px-3.5 py-1.5 rounded-full transition-colors">
              {c}
            </Link>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────────────
   13. JOURNAL BAND — Real Start of You journal
   ───────────────────────────────────────────────────────────────────── */
const Week4Journal = () => (
  <section className="bg-sage-bg/40 py-16 md:py-24 border-y border-border/30">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="bg-card rounded-3xl border border-border/30 overflow-hidden shadow-elevated grid grid-cols-1 md:grid-cols-2">
        <div className="aspect-[4/3] md:aspect-auto md:min-h-[420px] relative overflow-hidden">
          <img src={journalImg} alt="The Start of You journal flatlay"
            loading="lazy" width={1200} height={900}
            className="w-full h-full object-cover object-[50%_45%]" />
        </div>
        <div className="p-9 md:p-12 flex flex-col justify-center">
          <SectionLabel>The Start of You journal</SectionLabel>
          <h3 className="font-serif text-[1.8rem] md:text-[2.1rem] text-foreground leading-tight mb-4">
            Hold on to how week 4 actually felt.
          </h3>
          <p className="font-sans text-[13.5px] font-light text-muted-foreground leading-[1.85] mb-6">
            Week 4 is the kind of week most pregnancy advice rushes past. The Start of You journal gives it space —
            with prompts, room for the test, and the quiet first thoughts you may want to keep.
          </p>
          <ul className="space-y-2.5 mb-7">
            {[
              "Guided prompts for every week of pregnancy",
              "Space for the first test, scans and keepsakes",
              "A lasting record for you and your baby",
            ].map((line) => (
              <li key={line} className="flex items-start gap-2.5">
                <Check size={13} className="text-sage mt-1 shrink-0" />
                <span className="font-sans text-[13px] font-light text-foreground/80">{line}</span>
              </li>
            ))}
          </ul>
          <Link to="/product"
            className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-6 py-3 font-sans text-[13px] font-medium shadow-cta hover:bg-terracotta-hover transition-colors w-fit">
            Discover the journal <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────────────
   14. RELATED GUIDANCE — curated, premium cards
   ───────────────────────────────────────────────────────────────────── */
const related = [
  { slug: "early-pregnancy-symptoms", img: earlySymptomsImg, tag: "Symptoms",
    title: "Early pregnancy symptoms explained",
    desc: "What's common, what's normal and what to keep an eye on across the first few weeks." },
  { slug: "implantation-bleeding", img: implantationImg, tag: "Reassurance",
    title: "Implantation bleeding: what it is and what's normal",
    desc: "How to tell it apart from a period, and when light spotting is worth a call." },
  { slug: "the-first-trimester-emotionally", img: emotionalImg, tag: "Emotions",
    title: "The first trimester, emotionally",
    desc: "The mix of excitement, fear, numbness and tenderness that often shows up early." },
  { slug: "tests-and-scans-in-pregnancy", img: testsScansImg, tag: "Care path",
    title: "Tests and scans in early pregnancy",
    desc: "What happens after a positive test, and when your first appointments tend to fall." },
  { slug: "fatigue-in-early-pregnancy", img: fatigueImg, tag: "Body",
    title: "Fatigue in early pregnancy",
    desc: "Why week 4 onwards can feel so heavy — and small ways to support yourself." },
  { slug: "pregnancy-symptoms-stopping", img: symptomsStoppingImg, tag: "Reassurance",
    title: "When pregnancy symptoms stop",
    desc: "Why symptoms come and go, and what's usually behind a quieter day or two." },
];

const Week4Related = () => (
  <section id="guidance" className="bg-parchment py-20 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div className="max-w-xl">
          <SectionLabel>Read next, because of week 4</SectionLabel>
          <h2 className="font-serif text-[1.95rem] md:text-[2.4rem] text-foreground leading-tight">
            Curated guidance for what's likely on your mind right now.
          </h2>
        </div>
        <Link to="/guidance"
          className="inline-flex items-center gap-1.5 font-sans text-[13px] text-sage hover:gap-2.5 transition-all whitespace-nowrap">
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
              <span className="font-sans text-[10px] font-medium tracking-[0.22em] uppercase text-terracotta/85 mb-3">
                {a.tag}
              </span>
              <h3 className="font-serif text-[1.1rem] text-foreground leading-snug mb-3 group-hover:text-sage transition-colors">
                {a.title}
              </h3>
              <p className="font-sans text-[12.5px] font-light text-muted-foreground leading-[1.7] flex-1 mb-4">
                {a.desc}
              </p>
              <span className="inline-flex items-center gap-1.5 font-sans text-[12px] text-sage group-hover:gap-2.5 transition-all">
                Read guide <ArrowRight size={11} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────────────
   15. FAQ — search-intent depth
   ───────────────────────────────────────────────────────────────────── */
const faqs = [
  { q: "Is 4 weeks very early?",
    a: "Yes — 4 weeks is one of the earliest moments a pregnancy can be confirmed. Implantation has only just occurred, and hormone levels are only beginning to rise. There is still very little to see, but a lot is quietly underway." },
  { q: "Can I have no symptoms at 4 weeks and still be pregnant?",
    a: "Yes. Many people feel little or nothing at 4 weeks. Hormone levels are still relatively low, and the absence of symptoms is not a reliable sign that anything is wrong. Symptoms tend to build noticeably between weeks 5 and 9." },
  { q: "Is light spotting normal at 4 weeks?",
    a: "Light pink or brown spotting around the time of your expected period can be implantation bleeding. It's usually much lighter than a period and only lasts a day or two. Heavy bleeding, especially with cramping or one-sided pain, should always be checked." },
  { q: "Is cramping normal at 4 weeks?",
    a: "Mild, period-like cramping is very common as the uterus responds to implantation and rising hormones. Severe, sharp, persistent or one-sided pain is not typical and should be reviewed quickly." },
  { q: "How early can a pregnancy test be positive?",
    a: "Many sensitive home tests can detect a pregnancy from around the first day of a missed period — which usually falls around week 4. A faint line is still a positive result. Testing again in two to three days often shows a clearer line." },
  { q: "What should I avoid from now on?",
    a: "Stop alcohol, smoking and recreational drugs. Limit caffeine to around 200 mg a day. Avoid unpasteurised dairy, raw meat or fish, pâté, liver and high-mercury fish. Continue any folic acid your GP has advised." },
  { q: "When should I book my first appointment?",
    a: "As soon as you have a positive test. Contacting your GP or midwife early ensures you're in the system for your booking appointment, which usually takes place between weeks 8 and 10." },
  { q: "How will I feel emotionally at 4 weeks?",
    a: "Anything from quiet disbelief to overwhelming emotion — sometimes both in one day. The pregnancy can feel real and unreal at the same time. There is no correct way to feel at week 4." },
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
        <p className="font-sans text-[13.5px] font-light text-muted-foreground leading-[1.85] pb-6 pr-12">
          {faq.a}
        </p>
      )}
    </div>
  );
};

const Week4FAQ = () => (
  <section className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
      <div className="mb-10 text-center">
        <SectionLabel>Common questions</SectionLabel>
        <h2 className="font-serif text-[1.95rem] md:text-[2.4rem] text-foreground leading-tight">
          Common questions at 4 weeks
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

/* ─────────────────────────────────────────────────────────────────────
   16. NEXT WEEK CTA
   ───────────────────────────────────────────────────────────────────── */
const Week4Next = () => (
  <section className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
      <div className="bg-gradient-to-br from-sage-bg via-parchment to-stage-pregnancy/30 rounded-3xl border border-border/30 p-10 md:p-14 text-center shadow-card-brand">
        <SectionLabel>Up next</SectionLabel>
        <h2 className="font-serif text-[1.95rem] md:text-[2.5rem] text-foreground leading-tight mb-3">
          Ready for week 5?
        </h2>
        <p className="font-sans text-[14px] font-light text-muted-foreground max-w-lg mx-auto mb-8 leading-[1.85]">
          Hormones rise more sharply from week 5. The first signs of nausea, stronger fatigue and breast tenderness
          often begin to appear — and the pregnancy starts to feel a little more present.
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
    <Week4AtAGlance />
    <Week4Biology />
    <Week4Body />
    <Week4Symptoms />
    <Week4Emotional />
    <Week4WhatThisMeans />
    <Week4Focus />
    <Week4SeekSupport />
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
