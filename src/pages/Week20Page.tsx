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
  Moon,
  Wind,
  ShieldCheck,
  Stethoscope,
  Baby,
  Eye,
  Bone,
  Footprints,
  Scan,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PregnancyWeekSeo from "@/components/seo/PregnancyWeekSeo";
import PublicWeekReflectionAsk from "@/components/pregnancy/PublicWeekReflectionAsk";
import fetusImg from "@/assets/week20-fetus.jpg";
import bananaImg from "@/assets/week20-banana.jpg";
import biologyImg from "@/assets/week20-biology-detail.jpg";
import journalImg from "@/assets/journal-flatlay.jpg";
import botanicalTr from "@/assets/botanical-branch-tr.png";
import botanicalBl from "@/assets/botanical-branch-bl.png";
import botanicalAccent from "@/assets/article-botanical-accent.png";
import scanImg from "@/assets/article-hero-second-anatomy-scan.jpg";
import movementImg from "@/assets/article-hero-second-movement.jpg";
import bodyImg from "@/assets/article-hero-second-body.jpg";
import sleepImg from "@/assets/article-hero-second-sleep.jpg";
import eatingImg from "@/assets/article-hero-second-eating.jpg";
import anxietyImg from "@/assets/article-hero-second-anxiety.jpg";
import WeekCommonQuestions from "@/components/week/WeekCommonQuestions";
import WeekSources from "@/components/week/WeekSources";
import { buildWeekQuestions, getWeekSources } from "@/data/weekSupportContent";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import type { BreadcrumbItem } from "@/lib/seo/breadcrumbs";

// Single authoritative crumb array: feeds the visible trail and the schema.
const breadcrumbItems: BreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "Pregnancy", href: "/pregnancy" },
  { label: "Second trimester", href: "/pregnancy/second-trimester" },
  { label: "Week 20", href: "/pregnancy/week/20" },
];

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
    <div className="relative bg-gradient-to-br from-sage-bg/70 via-parchment to-sage-bg/40 pt-20 pb-36 sm:pt-24 sm:pb-44 md:pt-32 md:pb-52">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[820px] h-[420px] rounded-full bg-sage-light/25 blur-3xl" />
        <div className="absolute -top-10 right-1/4 w-[260px] h-[260px] rounded-full bg-terracotta/5 blur-3xl" />
      </div>
      <img src={botanicalBl} alt="" aria-hidden="true"
        className="pointer-events-none absolute top-20 left-0 w-[150px] lg:w-[210px] opacity-25 select-none hidden md:block" />
      <img src={botanicalTr} alt="" aria-hidden="true"
        className="pointer-events-none absolute top-20 right-0 w-[150px] lg:w-[210px] opacity-25 select-none hidden md:block" />

      <div className="container mx-auto px-14 sm:px-16 md:px-10 max-w-5xl relative z-10 text-center">
        <BreadcrumbJsonLd items={breadcrumbItems} />
        <Breadcrumbs
          tone="section"
          className="flex justify-center mb-6 sm:mb-7 font-sans text-[12px] font-normal text-foreground/65"
          items={breadcrumbItems}
        />

        <p className="font-sans text-[11px] font-semibold tracking-[0.3em] uppercase text-sage mb-5">
          Second Trimester · Halfway, anomaly scan
        </p>
        <h1 className="font-serif text-[2.5rem] sm:text-5xl md:text-[3.75rem] lg:text-[4.25rem] text-foreground leading-[1.04] tracking-tight mb-4 md:mb-5">
          20 Weeks Pregnant
        </h1>
        <p className="font-serif italic text-[1.05rem] sm:text-lg md:text-xl text-foreground/75 max-w-xl mx-auto leading-relaxed">
          Halfway. Your baby is the length of a banana, with a developed face, fingerprints and the first hints of personality on the screen.
        </p>
      </div>

      <Link to="/pregnancy/week/19" aria-label="Go to week 19"
        className="absolute left-3 sm:left-6 md:left-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronLeft size={18} />
      </Link>
      <Link to="/pregnancy/week/21" aria-label="Go to week 21"
        className="absolute right-3 sm:right-6 md:right-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronRight size={18} />
      </Link>
    </div>

    <div className="relative -mt-28 sm:-mt-36 md:-mt-40 mb-6">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex items-end justify-center gap-5 sm:gap-10 md:gap-14">
          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-card border-[3px] border-sage/15 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={bananaImg} alt="Banana" loading="lazy" width={512} height={512}
                className="w-full h-full object-cover" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.04]" />
            </div>
            <div className="text-center">
              <p className="font-serif italic text-[12.5px] text-foreground/80 leading-tight">banana</p>
              <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/55 mt-1">~25&nbsp;cm</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full bg-card border-[4px] border-sage/20 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={fetusImg}
                alt="Soft editorial illustration of a 20-week fetus in profile in the womb, hand near face, umbilical cord curling, anatomically honest"
                width={1024} height={1024}
                loading="eager" decoding="async"
                className="w-full h-full object-cover scale-[1.02]" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.05]" />
            </div>
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.22em] uppercase text-foreground/65">Your baby this week</p>
          </div>

          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-stage-pregnancy/85 to-stage-pregnancy/40 border-[3px] border-terracotta/25 flex items-center justify-center shadow-elevated">
              <span className="font-serif text-[1.7rem] sm:text-[1.95rem] text-foreground tracking-tight leading-none">20</span>
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

/* 2. META */
const anchors = [
  { id: "at-a-glance", label: "At a glance", Icon: Sparkles },
  { id: "biology", label: "What's underway", Icon: Sprout },
  { id: "scan", label: "Anomaly scan", Icon: Scan },
  { id: "body", label: "Body changes", Icon: Activity },
  { id: "symptoms", label: "Symptoms", Icon: HeartPulse },
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
            <p className="font-sans text-[11.5px] font-normal text-foreground/60">
              Updated for 2026 · 10 min read · Mid-pregnancy
            </p>
          </div>
        </div>
        <nav aria-label="On this page" className="flex-1 pt-4 lg:pt-0">
          <div className="flex gap-x-1 gap-y-2 overflow-x-auto lg:flex-wrap scrollbar-hide -mx-1 px-1">
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

/* 3. AT A GLANCE */
const glanceFacts = [
  { label: "Stage", value: "Second trimester" },
  { label: "Baby length", value: "~25 cm — banana" },
  { label: "Weight", value: "Around 300 g" },
  { label: "Key event", value: "20-week anomaly scan" },
];

const AtAGlance = () => (
  <section id="at-a-glance" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl mb-14 md:mb-20">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 relative bg-gradient-to-br from-stage-pregnancy/45 via-parchment to-parchment-dark/50 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-10 overflow-hidden shadow-card-brand">
        <img src={botanicalAccent} alt="" aria-hidden="true"
          className="absolute -left-3 bottom-0 w-28 opacity-35 pointer-events-none select-none" />
        <SectionLabel tone="terracotta">At a glance</SectionLabel>
        <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-5">
          Halfway through. The biggest scan of pregnancy is here.
        </h2>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8] mb-4">
          Week 20 is a milestone in almost every direction. Your baby's organs and limbs are fully formed and being
          checked in detail. Many people feel their first clear movements this week. Bumps are usually showing.
        </p>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8]">
          It's also one of the most emotionally loaded weeks of pregnancy, because the anomaly scan brings both relief
          and anxiety in the same hour.
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
  { title: "Fully formed face", body: "Eyebrows, eyelashes and the bridge of the nose are all in place. Facial features are detailed enough to be recognised on the scan." },
  { title: "A protective coating", body: "A waxy white substance called vernix caseosa covers the skin to protect it in the amniotic fluid. Lanugo — fine hair — helps hold it in place." },
  { title: "Senses switching on", body: "The ears now work well enough to hear muffled sounds from outside. Taste buds are forming. Your baby may already react to your voice." },
  { title: "Muscles and movement", body: "Movements are stronger and more coordinated. Many people feel their first definite kicks (quickening) sometime between weeks 16 and 22." },
];

const Biology = () => (
  <section id="biology" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="relative rounded-3xl overflow-hidden border border-border/40 shadow-card-brand">
            <div className="aspect-[4/5]">
              <img src={biologyImg} alt="Soft editorial close-up of a 20-week fetus in profile, eyes closed, hand near face, umbilical cord curling"
                loading="lazy" width={1024} height={1280}
                className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-foreground/60 to-transparent">
              <p className="font-serif italic text-[13px] text-background/95 leading-snug">
                Recognisably your baby — listening, moving, growing.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <SectionLabel>What's underway biologically</SectionLabel>
          <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-5">
            By 20 weeks, your baby looks unmistakably like a small person.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8] mb-8 max-w-2xl">
            The major work of organ-building is done. From here, the focus shifts to growing larger, laying down fat,
            developing the senses and rehearsing the patterns — sucking, swallowing, breathing — that will be needed
            after birth.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {biologyPoints.map((p, i) => (
              <div key={p.title}
                className="relative bg-card rounded-2xl border border-border/40 p-6 md:p-7 shadow-card-brand">
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

/* 5. ANOMALY SCAN — special section unique to W20 */
const scanChecks = [
  { Icon: Baby, title: "Head and brain", body: "The size of the head and the structures inside the brain are measured carefully." },
  { Icon: HeartPulse, title: "Heart", body: "All four chambers, the major vessels and rhythm are checked in detail." },
  { Icon: Bone, title: "Spine and skeleton", body: "The spine is followed bone by bone. Limbs, hands and feet are counted and measured." },
  { Icon: Wind, title: "Lungs and abdomen", body: "Stomach, kidneys, bladder, diaphragm and abdominal wall are all imaged." },
  { Icon: Eye, title: "Face and lips", body: "The face is checked for cleft lip and other visible differences." },
  { Icon: Activity, title: "Placenta and fluid", body: "The position of the placenta is recorded — important for later in pregnancy — along with the volume of amniotic fluid." },
];

const Scan20 = () => (
  <section id="scan" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
      <div className="lg:col-span-5">
        <SectionLabel tone="terracotta">The 20-week anomaly scan</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-5">
          What the scan looks for, and how to walk in feeling prepared.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/80 leading-[1.8] mb-4">
          The mid-pregnancy or fetal anomaly scan is offered between 18 and 21 weeks. It usually lasts around 30
          minutes and is performed by a sonographer who takes detailed measurements of your baby's anatomy.
        </p>
        <p className="font-sans text-[14px] text-foreground/70 leading-[1.75] mb-4">
          Most scans are reassuring. A small number find something that needs further investigation — sometimes a
          minor finding, sometimes more significant. You can ask the sonographer to tell you what they're seeing as
          they go, or to keep things quiet until the end.
        </p>
        <p className="font-sans text-[14px] text-foreground/70 leading-[1.75]">
          You can also choose whether to find out the baby's sex. Not all hospitals share this, and it isn't
          always possible to see clearly.
        </p>
      </div>

      <div className="lg:col-span-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {scanChecks.map(({ Icon, title, body }) => (
            <div key={title}
              className="relative bg-card rounded-2xl border border-border/40 p-6 md:p-7 shadow-card-brand overflow-hidden">
              <span className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sage/30 to-transparent" />
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-10 rounded-full bg-sage-bg border border-sage/15 flex items-center justify-center">
                  <Icon size={15} className="text-sage" />
                </span>
                <h3 className="font-serif text-[1.1rem] text-foreground leading-snug">{title}</h3>
              </div>
              <p className="font-sans text-[13px] text-foreground/70 leading-[1.7]">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* 6. BODY */
const bodyNotes = [
  { Icon: Sparkles, title: "Bump showing", body: "Your uterus has now risen to around your belly button. Most people are visibly pregnant by 20 weeks, although bump shape varies enormously." },
  { Icon: Footprints, title: "Centre of gravity shifting", body: "Your posture is changing as the bump grows. Lower back ache and pelvic pressure are common from now onwards." },
  { Icon: Wind, title: "Heavier blood flow", body: "Your blood volume is roughly 40% higher than before pregnancy. This can cause warmth, sweating, mild breathlessness or visible veins." },
];

const Body = () => (
  <section id="body" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="max-w-2xl mb-10">
        <SectionLabel tone="terracotta">Your body this week</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
          Your body is now visibly carrying a pregnancy.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
          The second trimester is often the most physically settled stretch of pregnancy. Energy is usually better than
          in the first trimester, but new sensations begin to appear — most of them normal, a few worth knowing about.
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

      <div className="mt-6 bg-stage-pregnancy/35 border border-border/30 rounded-2xl p-6 md:p-7 flex flex-col sm:flex-row sm:items-center gap-4">
        <span className="w-10 h-10 rounded-full bg-card border border-border/40 flex items-center justify-center shrink-0">
          <Moon size={15} className="text-terracotta" />
        </span>
        <p className="font-sans text-[14px] text-foreground/80 leading-[1.7]">
          From around 16 weeks, current UK guidance is to settle to sleep on your side — either side is fine. Sleeping
          on your back in the second half of pregnancy has been linked to a small increased risk to your baby. If you
          wake on your back, simply roll over.
        </p>
      </div>
    </div>
  </section>
);

/* 7. SYMPTOMS */
const symptoms = [
  {
    Icon: Footprints,
    name: "First clear movements",
    feels: "A flutter, a quick swirl, sometimes mistaken for wind. Later in the week, more like a definite tap or kick.",
    why: "Your baby is large and strong enough now for movements to reach the front wall of the uterus. Placenta position can delay when you feel them.",
    normal: "Very common between 16 and 22 weeks. Once movements are well-established, any reduction or change is worth checking promptly.",
  },
  {
    Icon: Activity,
    name: "Lower back and pelvic ache",
    feels: "A dull ache low down, a pulling feeling around the hips, sometimes a sharp pain when standing up.",
    why: "Your bump is shifting your centre of gravity, and pregnancy hormones are softening ligaments. The pelvis is starting to take more strain.",
    normal: "Common. Severe one-sided pain, difficulty walking or pain that wakes you at night should be assessed for pelvic girdle pain (PGP).",
  },
  {
    Icon: Wind,
    name: "Breathlessness on stairs",
    feels: "Needing a moment at the top of the stairs, feeling slightly out of breath while talking.",
    why: "Your diaphragm has less space to move and your blood volume is higher. Your heart is working harder than usual all day.",
    normal: "Common and not concerning at this stage. Sudden, severe breathlessness, chest pain or coughing blood is not — call 999.",
  },
  {
    Icon: Heart,
    name: "Stretch marks and itching",
    feels: "Pink, red or purple lines appearing on your bump, breasts or hips. Often mildly itchy as skin stretches.",
    why: "Skin is being pulled rapidly to accommodate the bump. Hydration helps a little; genetics matter more than any cream.",
    normal: "Normal. Severe, persistent itching — especially of palms and soles — should always be checked for cholestasis.",
  },
  {
    Icon: Sparkles,
    name: "Braxton Hicks (sometimes)",
    feels: "Your bump going hard for 30 seconds or so, then softening. Usually painless.",
    why: "Your uterus practising for labour. They're more common later but can start in the second trimester.",
    normal: "Normal if irregular and painless. Regular, painful tightenings before 37 weeks need same-day review.",
  },
  {
    Icon: Eye,
    name: "Heartburn and indigestion",
    feels: "Burning behind the breastbone, an acid taste, a full feeling after small meals.",
    why: "Progesterone relaxes the valve at the top of the stomach, and your growing uterus presses upwards.",
    normal: "Common. Smaller meals, sitting upright after eating and pregnancy-safe antacids help. Persistent severe pain needs a check.",
  },
];

const Symptoms = () => (
  <section id="symptoms" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel>Common symptoms</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        What may show up at week 20 — and what each one really means.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        The mid-trimester is generally kinder than the first, but new sensations appear as your bump grows and your
        baby starts to make themselves known.
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
      <Link to="/articles/baby-movement-in-pregnancy"
        className="inline-flex items-center gap-2 font-sans text-[13.5px] font-medium text-sage hover:gap-3 transition-all">
        Read the full guide to baby movement <ArrowRight size={13} />
      </Link>
    </div>
  </section>
);

/* 8. EMOTIONAL */
const emotionalTruths = [
  "Counting down the days until the anomaly scan.",
  "Replaying every silence the sonographer makes.",
  "The relief — or weight — of what the scan shows.",
  "Feeling more attached now movements are real.",
  "Quiet pride at being halfway, mixed with disbelief.",
  "Finding it harder to keep the pregnancy private at this stage.",
  "Sudden waves of feeling for the person your baby is becoming.",
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
            The week your baby starts to feel like a someone, not a something.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/80 leading-[1.8] mb-4">
            Week 20 brings two strong emotional currents at once: the anticipation and stress of the anomaly scan, and
            the slow shift into really beginning to bond with your baby.
          </p>
          <p className="font-sans text-[14px] text-foreground/70 leading-[1.75]">
            Whatever the scan shows, you don't have to feel one set way about it. Tender, terrified, grateful, and
            unsure can all live in the same week.
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

/* 9. WHAT THIS MEANS */
const meaningPoints = [
  { title: "The scan is a screen, not a guarantee.", body: "The anomaly scan looks for specific structural conditions, but cannot detect everything. A reassuring scan is reassurance — not certainty." },
  { title: "Movements aren't a daily test yet.", body: "At 20 weeks, movements are just beginning. There's no need to count them yet. From around 24–28 weeks, becoming familiar with your baby's pattern matters more." },
  { title: "Placenta position can change.", body: "If your placenta is low at 20 weeks, it often moves up as the uterus grows. A repeat scan around 32 weeks usually clarifies things." },
  { title: "Halfway is a real milestone.", body: "Roughly half of pregnancy is behind you. It's a fair moment to slow down, take stock and let yourself feel proud." },
];

const WhatThisMeans = () => (
  <section className="bg-sage-bg/35 py-16 md:py-24 border-y border-border/30">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
      <div className="text-center mb-10 max-w-2xl mx-auto">
        <SectionLabel>What this means</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight">
          How to read week 20 honestly.
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {meaningPoints.map((m, i) => (
          <div key={m.title}
            className="relative bg-card rounded-2xl border border-border/40 p-6 md:p-7 shadow-card-brand">
            <span className="font-serif italic text-[12px] text-sage/80">0{i + 1}</span>
            <h3 className="font-serif text-[1.2rem] text-foreground leading-snug mt-1 mb-3">{m.title}</h3>
            <p className="font-sans text-[13.5px] text-foreground/70 leading-[1.75]">{m.body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* 10. FOCUS */
const focusList = [
  { Icon: Scan, title: "Prepare for your anomaly scan", note: "Drink water, wear something easy to lift, and bring someone if you can. Decide in advance whether you want to know the sex." },
  { Icon: Footprints, title: "Tune in to movements gently", note: "Get to know when your baby seems most active — often evenings or after eating. Don't worry about counting yet." },
  { Icon: Moon, title: "Move to side-sleeping", note: "From around 16 weeks, settle to sleep on your side. A pillow under the bump or between your knees often helps." },
  { Icon: Activity, title: "Look after your back and pelvis", note: "Avoid standing on one leg, lifting awkwardly or sitting for long stretches. Pregnancy yoga or physio can ease pelvic ache." },
  { Icon: Stethoscope, title: "Plan your maternity leave", note: "MatB1 forms can be issued from 20 weeks. It's a useful moment to start the conversation at work, even if you don't decide everything yet." },
  { Icon: Heart, title: "Let yourself bond if you're ready", note: "Talking, music, hands on bump. Bonding can begin slowly and unevenly — that's normal. Don't force it." },
];

const Focus = () => (
  <section id="focus" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-4">
        <SectionLabel tone="terracotta">Focus this week</SectionLabel>
        <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.2rem] text-foreground leading-tight mb-4">
          The handful of things that genuinely matter at 20 weeks.
        </h2>
        <p className="font-sans text-[14px] text-foreground/75 leading-[1.8]">
          Halfway is a turning point. A few small choices now make the second half feel calmer.
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
  </section>
);

/* 11. SEEK SUPPORT */
const seekSupport = [
  "Any vaginal bleeding, however light",
  "Severe headache, blurred vision or sudden swelling of face, hands or feet",
  "Persistent severe itching, especially of palms and soles",
  "Burning or stinging when passing urine, or strong-smelling urine",
  "A high temperature, chills or feeling generally very unwell",
  "Once movements are well-established, any reduction or change in pattern",
];

const SeekSupport = () => (
  <section id="support" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl pb-16 md:pb-24">
    <div className="relative bg-gradient-to-br from-stage-pregnancy/55 via-parchment to-parchment-dark/40 rounded-3xl border border-terracotta/20 p-8 md:p-10 shadow-card-brand overflow-hidden">
      <span className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-terracotta/30 to-transparent" />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
        <div className="md:col-span-4">
          <span className="inline-flex w-12 h-12 rounded-full bg-terracotta/15 items-center justify-center mb-4">
            <AlertTriangle size={18} className="text-terracotta" />
          </span>
          <SectionLabel tone="terracotta">When to seek care</SectionLabel>
          <h3 className="font-serif text-[1.4rem] sm:text-[1.5rem] md:text-[1.7rem] text-foreground leading-snug">
            Most week-20 sensations are normal. A few need a same-day call.
          </h3>
          <p className="font-sans text-[13.5px] text-foreground/70 leading-[1.75] mt-3">
            Trust your instincts. Contact your maternity unit triage line or NHS 111 — and 999 in an emergency.
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

/* 12. QUOTE */
const Quote = () => (
  <section className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl pb-16 md:pb-24">
    <div className="relative bg-stage-pregnancy/35 rounded-3xl border border-border/30 p-8 sm:p-10 md:p-14 text-center overflow-hidden">
      <span className="absolute left-7 top-6 font-serif text-4xl text-terracotta/40 leading-none">“</span>
      <span className="absolute right-7 bottom-4 font-serif text-4xl text-terracotta/40 leading-none">”</span>
      <p className="font-serif italic text-[1.2rem] sm:text-[1.35rem] md:text-[1.6rem] text-foreground/90 leading-snug max-w-3xl mx-auto">
        Halfway is a real thing. Let yourself feel how far you've come, even with everything you don't know yet.
      </p>
      <Heart size={14} className="text-terracotta/60 mx-auto mt-5" />
    </div>
  </section>
);

/* 13. REFLECTION + ASK */
const reflectionPrompts = ["What I felt at the scan", "What movement felt like", "What I'm most hoping for", "Halfway, in one line"];
const askChips = ["Anomaly scan results", "Low-lying placenta", "First movements", "Side-sleeping in pregnancy", "Finding out the sex"];

const ReflectionAsk = () => (
  <PublicWeekReflectionAsk
    week={20}
    reflectionPrompts={reflectionPrompts}
    askChips={askChips}
  />
);

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
            Hold on to halfway, and the photo from the scan.
          </h3>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8] mb-6">
            The 20-week scan often comes with a photo, and a wave of feeling that can be hard to put into words. The
            Start of You journal gives both a place to live — alongside the first movements, the scan you waited for,
            and the version of yourself who is halfway there.
          </p>
          <ul className="space-y-2.5 mb-7">
            {[
              "Guided prompts for every week of pregnancy",
              "Pages for scan photos, first kicks and milestones",
              "A lasting record for you and your baby",
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

/* 15. RELATED */
const related = [
  { slug: "tests-and-scans-in-pregnancy", img: scanImg, tag: "Care path",
    title: "Tests and scans in pregnancy",
    desc: "What the 20-week anomaly scan checks, what's optional, and what happens if something is found." },
  { slug: "baby-movement-in-pregnancy", img: movementImg, tag: "Movement",
    title: "Baby movement in pregnancy",
    desc: "First flutters, building a pattern, and why movement matters more from the third trimester onwards." },
  { slug: "weight-changes-in-pregnancy", img: bodyImg, tag: "Body",
    title: "Your changing body in the second trimester",
    desc: "Bump growth, posture, skin and what feels different now you're visibly pregnant." },
  { slug: "sleep-in-pregnancy", img: sleepImg, tag: "Sleep",
    title: "Sleep in pregnancy",
    desc: "Why side-sleeping matters from now on, and small ways to make rest more comfortable." },
  { slug: "eating-well-in-pregnancy", img: eatingImg, tag: "Eating",
    title: "Eating well in the second trimester",
    desc: "What your body and baby actually need now, and which nutrients become more important." },
  { slug: "anxiety-in-pregnancy", img: anxietyImg, tag: "Emotions",
    title: "Anxiety around scans and results",
    desc: "How to hold the worry of the anomaly scan, and what to do if anxiety lingers afterwards." },
];

const Related = () => (
  <section id="guidance" className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div className="max-w-xl">
          <SectionLabel>Read next, because of week 20</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.4rem] text-foreground leading-tight">
            Curated guidance for what's likely on your mind right now.
          </h2>
        </div>
        <Link to="/pregnancy/second-trimester"
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

/* 16. FAQ */
const faqs = [
  { q: "What does the 20-week scan actually check?",
    a: "The mid-pregnancy or fetal anomaly scan looks at your baby's brain, face, heart, spine, lungs, abdomen, kidneys, bladder, arms, legs, hands and feet, the position of the placenta, and the volume of amniotic fluid. It is a screening scan — it can find many conditions, but cannot detect everything." },
  { q: "Will I find out the sex of my baby at 20 weeks?",
    a: "Often yes, but only if you ask, only if your hospital shares this information, and only if your baby is in a position where the sonographer can see clearly. If you don't want to know, tell the sonographer at the start so they can avoid the area." },
  { q: "What happens if something is found on the scan?",
    a: "You will usually be referred to a fetal medicine specialist for a more detailed scan and a conversation about what the finding means, your options, and any further tests. Many findings turn out to be minor; some are more significant. You'll be supported through whatever decisions follow." },
  { q: "Is it normal not to feel any movement yet at 20 weeks?",
    a: "Yes. First movements (quickening) are usually felt between 16 and 22 weeks. If your placenta is at the front of the uterus (anterior placenta), movements often feel later and quieter. By around 24 weeks most people are feeling regular movement." },
  { q: "What does a low-lying placenta at 20 weeks mean?",
    a: "It means the placenta is sitting close to or over the cervix at this point. As the uterus grows, the placenta usually moves higher. You'll typically be offered a repeat scan around 32 weeks. Only a small proportion of low-lying placentas at 20 weeks remain low (placenta praevia)." },
  { q: "Should I be sleeping on my side now?",
    a: "Yes. From around 16 weeks, current UK guidance is to settle to sleep on your side — either side is fine. Sleeping on your back in the second half of pregnancy has been linked to a small increased risk of stillbirth. If you wake on your back, just roll over." },
  { q: "How big is my baby at 20 weeks?",
    a: "Around 25 centimetres long from head to heel — roughly the length of a banana — and weighing around 300 grams. From this point on, length is measured crown to heel rather than crown to rump." },
  { q: "Is it normal to feel anxious before the anomaly scan?",
    a: "Extremely. The anomaly scan is the most clinically detailed scan of pregnancy, and the wait can stir up anything you've been carrying. Bring someone if you can, plan something gentle afterwards, and be kind to yourself in the days leading up to it." },
];

/* 17. NEXT */
const Next = () => (
  <section className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
      <div className="bg-gradient-to-br from-sage-bg via-parchment to-stage-pregnancy/30 rounded-3xl border border-border/30 p-8 sm:p-10 md:p-14 text-center shadow-card-brand">
        <SectionLabel>Up next</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.5rem] text-foreground leading-tight mb-3">
          Ready for week 21?
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 max-w-lg mx-auto mb-8 leading-[1.8]">
          Movements often become more frequent and recognisable. Your baby's senses keep developing, and the second
          half of pregnancy properly begins.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
          <Link to="/pregnancy/week/21"
            className="inline-flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium shadow-cta hover:bg-terracotta-hover transition-colors">
            Continue to week 21 <ArrowRight size={14} />
          </Link>
          <Link to="/pregnancy/second-trimester"
            className="inline-flex items-center justify-center gap-2 border border-foreground/25 text-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium hover:bg-parchment-dark transition-colors">
            Back to Second Trimester
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const Week20Page = () => (
  <div className="min-h-screen bg-parchment">
    <PregnancyWeekSeo weekNumber={20} />
    <Navbar />
    <Hero />
    <MetaBar />
    <AtAGlance />
    <Biology />
    <Scan20 />
    <Body />
    <Symptoms />
    <Emotional />
    <WhatThisMeans />
    <Focus />
    <SeekSupport />
    <Quote />
    <ReflectionAsk />
    <Journal />
    <Related />
    <WeekCommonQuestions week={20} questions={buildWeekQuestions(20, faqs)} />
    <WeekSources week={20} sources={getWeekSources(20)} />
    <Next />
    <Footer />
  </div>
);

export default Week20Page;
