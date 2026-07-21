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
  Utensils,
  Brain,
  Eye,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PregnancyWeekSeo from "@/components/seo/PregnancyWeekSeo";
import embryoImg from "@/assets/week8-embryo.jpg";
import raspberryImg from "@/assets/week8-raspberry.jpg";
import biologyImg from "@/assets/week8-biology-detail.jpg";
import journalImg from "@/assets/journal-flatlay.jpg";
import botanicalTr from "@/assets/botanical-branch-tr.png";
import botanicalBl from "@/assets/botanical-branch-bl.png";
import botanicalAccent from "@/assets/article-botanical-accent.png";
import nauseaImg from "@/assets/article-hero-nausea.jpg";
import fatigueImg from "@/assets/article-hero-fatigue.jpg";
import emotionalImg from "@/assets/article-hero-emotional-first-tri.jpg";
import testsScansImg from "@/assets/article-hero-tests-scans.jpg";
import foodAversionsImg from "@/assets/article-hero-food-aversions.jpg";
import symptomsStoppingImg from "@/assets/article-hero-symptoms-stopping.jpg";
import WeekReflectionAsk from "@/components/week/WeekReflectionAsk";
import WeekCommonQuestions from "@/components/week/WeekCommonQuestions";
import WeekSources from "@/components/week/WeekSources";
import { buildWeekQuestions, getWeekSources } from "@/data/weekSupportContent";

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
        <nav aria-label="breadcrumb" className="flex items-center justify-center gap-2 mb-6 sm:mb-7 font-sans text-[12px] font-normal text-foreground/65">
          <Link to="/pregnancy" className="hover:text-foreground transition-colors">Pregnancy</Link>
          <span className="text-foreground/30">›</span>
          <Link to="/pregnancy/first-trimester" className="hover:text-foreground transition-colors">Week by week</Link>
          <span className="text-foreground/30">›</span>
          <span className="text-foreground">Week 8</span>
        </nav>

        <p className="font-sans text-[11px] font-semibold tracking-[0.3em] uppercase text-sage mb-5">
          First Trimester · The hidden middle
        </p>
        <h1 className="font-serif text-[2.5rem] sm:text-5xl md:text-[3.75rem] lg:text-[4.25rem] text-foreground leading-[1.04] tracking-tight mb-4 md:mb-5">
          8 Weeks Pregnant
        </h1>
        <p className="font-serif italic text-[1.05rem] sm:text-lg md:text-xl text-foreground/75 max-w-xl mx-auto leading-relaxed">
          Symptoms often peak this week, even though almost no one around you knows. Your embryo is the size of a raspberry, with a beating heart.
        </p>
      </div>

      <Link to="/pregnancy/week/7" aria-label="Go to week 7"
        className="absolute left-3 sm:left-6 md:left-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronLeft size={18} />
      </Link>
      <Link to="/pregnancy/week/9" aria-label="Go to week 9"
        className="absolute right-3 sm:right-6 md:right-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronRight size={18} />
      </Link>
    </div>

    <div className="relative -mt-28 sm:-mt-36 md:-mt-40 mb-6">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex items-end justify-center gap-5 sm:gap-10 md:gap-14">
          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-card border-[3px] border-sage/15 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={raspberryImg} alt="Raspberry" loading="lazy" width={512} height={512}
                className="w-full h-full object-cover" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.04]" />
            </div>
            <div className="text-center">
              <p className="font-serif italic text-[12.5px] text-foreground/80 leading-tight">raspberry</p>
              <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/55 mt-1">~16&nbsp;mm</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full bg-card border-[4px] border-sage/20 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={embryoImg}
                alt="Soft editorial illustration of an 8-week embryo curled inside the gestational sac, with visible head, eye spot, limb buds and umbilical stalk"
                width={1024} height={1024}
                loading="eager" decoding="async"
                className="w-full h-full object-cover scale-[1.02]" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.05]" />
            </div>
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.22em] uppercase text-foreground/65">Your baby this week</p>
          </div>

          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-stage-pregnancy/85 to-stage-pregnancy/40 border-[3px] border-terracotta/25 flex items-center justify-center shadow-elevated">
              <span className="font-serif text-[1.7rem] sm:text-[1.95rem] text-foreground tracking-tight leading-none">32</span>
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

/* 2. META BAR */
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
              Updated for 2026 · 9 min read · Early pregnancy
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
  { label: "Stage", value: "First trimester" },
  { label: "Baby size", value: "~16 mm — raspberry" },
  { label: "Heartbeat", value: "Around 150–170 bpm" },
  { label: "Booking", value: "Scheduled around 8–10 weeks" },
];

const AtAGlance = () => (
  <section id="at-a-glance" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl mb-14 md:mb-20">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 relative bg-gradient-to-br from-stage-pregnancy/45 via-parchment to-parchment-dark/50 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-10 overflow-hidden shadow-card-brand">
        <img src={botanicalAccent} alt="" aria-hidden="true"
          className="absolute -left-3 bottom-0 w-28 opacity-35 pointer-events-none select-none" />
        <SectionLabel tone="terracotta">At a glance</SectionLabel>
        <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-5">
          Week 8 is busy inside, hidden outside.
        </h2>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8] mb-4">
          Your embryo now looks unmistakably like a tiny human in the making. The heart is beating steadily, eyes
          and ears are forming, fingers and toes are starting to separate, and the brain is developing at a pace it
          never will again.
        </p>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8]">
          From the outside, almost nothing shows. From the inside, this is often the heaviest week of the trimester:
          nausea, exhaustion and emotional upheaval can all peak now, while you may still be holding the news in private.
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
  { title: "A beating heart", body: "The heart now has four chambers and beats around 150–170 times a minute — fast enough to be picked up on an early scan if your booking is brought forward." },
  { title: "Brain at full speed", body: "Around 100,000 new nerve cells form every minute this week. The brain is the most actively developing organ in the entire pregnancy right now." },
  { title: "Face, eyes and ears forming", body: "Eyelids, the upper lip, the tip of the nose and the early structures of the inner ear are taking shape. The face is starting to look recognisable." },
  { title: "Fingers and toes separating", body: "Webbed paddles are becoming distinct fingers and toes. Tiny elbows and knees can already bend, even though you can't feel any movement yet." },
];

const Biology = () => (
  <section id="biology" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="relative rounded-3xl overflow-hidden border border-border/40 shadow-card-brand">
            <div className="aspect-[4/5]">
              <img src={biologyImg} alt="Soft editorial close-up of an 8-week embryo with visible head, eye, limb buds and umbilical stalk"
                loading="lazy" width={1024} height={1280}
                className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-foreground/60 to-transparent">
              <p className="font-serif italic text-[13px] text-background/95 leading-snug">
                Tiny, unmistakably forming, already alive with movement you can't yet feel.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <SectionLabel>What's underway biologically</SectionLabel>
          <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-5">
            Week 8 is the week your embryo starts to look like a baby.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8] mb-8 max-w-2xl">
            By the end of this week, your embryo is officially called a fetus. The major organs are all in place,
            even if some are still very simple. From here, the work shifts from <em>building</em> to <em>refining</em>.
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

/* 5. BODY */
const hormoneNotes = [
  { Icon: Sparkles, title: "hCG at peak", body: "hCG roughly doubles every 48–72 hours in early pregnancy and tends to peak around weeks 8–11. This is one big reason nausea is often at its worst right now." },
  { Icon: Droplet, title: "Progesterone climbing", body: "Progesterone keeps the uterine lining stable and quietens the immune system so the pregnancy can establish. It's also behind the bone-deep tiredness many feel." },
  { Icon: Wind, title: "Increased blood volume", body: "Your blood volume has already begun rising to support the growing pregnancy. This can leave you feeling lightheaded, breathless on stairs or warmer than usual." },
];

const Body = () => (
  <section id="body" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel tone="terracotta">Your body this week</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        You may not look pregnant yet. You almost certainly feel pregnant.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        Most week-8 changes are happening on the inside. Your uterus is now around the size of a large orange,
        cervical mucus has thickened to form a protective plug, and your circulation is working harder than ever
        before. Outwardly, you might just look a little tired — and feel a great deal more than that.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {hormoneNotes.map(({ Icon, title, body }) => (
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
        <HeartPulse size={15} className="text-terracotta" />
      </span>
      <p className="font-sans text-[14px] text-foreground/80 leading-[1.7]">
        If sickness is making it hard to keep fluids down, you can't stop being sick, you're losing weight, or your
        urine has turned dark, contact your midwife or GP. Severe sickness (hyperemesis gravidarum) is treatable, and
        early help makes a real difference.
      </p>
    </div>
  </section>
);

/* 6. SYMPTOMS */
const symptoms = [
  {
    Icon: Utensils,
    name: "Nausea, with or without sickness",
    feels: "A wave of queasiness that can hit at any time of day, sometimes triggered by smells, hunger or even brushing your teeth.",
    why: "hCG is at its highest around now, and your sense of smell is heightened. Both are protective in evolutionary terms — and miserable in lived terms.",
    normal: "Very common from week 6 to weeks 12–14. Inability to keep fluids down, weight loss or constant vomiting needs to be checked.",
  },
  {
    Icon: Moon,
    name: "Bone-deep fatigue",
    feels: "Wanting to sleep at 8pm, waking up still tired, finding the smallest task surprisingly hard.",
    why: "Progesterone is sedating, your blood volume is rising, and your body is doing organ-building work behind the scenes.",
    normal: "Almost universal at week 8. Tends to ease in the second trimester. Rest is doing real work.",
  },
  {
    Icon: Heart,
    name: "Sore, swollen breasts",
    feels: "Heaviness, sharp tingling, sensitivity to clothing or touch, sometimes visibly larger than a few weeks ago.",
    why: "Oestrogen and progesterone are preparing milk-producing tissue. Many people go up a bra size in the first trimester.",
    normal: "Very common. A soft, supportive bra often helps more than you'd expect.",
  },
  {
    Icon: Apple,
    name: "Food aversions and cravings",
    feels: "Suddenly hating foods you used to love. Strong, specific cravings. A metallic taste in your mouth.",
    why: "A sharpened sense of smell, hormonal shifts and changes in saliva all alter how things taste.",
    normal: "Very common. Eat what you can keep down — perfect nutrition is not the goal at week 8.",
  },
  {
    Icon: Wind,
    name: "Bloating and constipation",
    feels: "A puffy, slowed-down feeling. Going to the loo less often, and with more effort.",
    why: "Progesterone slows the gut so nutrients absorb more efficiently — a useful trick that can feel uncomfortable.",
    normal: "Normal. Water, fibre and gentle walking help. Persistent severe constipation can be discussed with a pharmacist.",
  },
  {
    Icon: Coffee,
    name: "Frequent urination",
    feels: "Needing the toilet often, including at night. Sometimes only a small amount comes out.",
    why: "Increased blood flow to the kidneys, and your uterus pressing forward as it grows.",
    normal: "Normal. Burning, urgency or pain can mean a UTI and should be checked — they're more common in pregnancy.",
  },
  {
    Icon: Brain,
    name: "Mood swings and weepiness",
    feels: "Crying at adverts. Snapping at someone. Feeling overwhelmed and not knowing why.",
    why: "Hormones, fatigue, anxiety about the pregnancy and the strain of holding a secret all stack up.",
    normal: "Very common. Persistent low mood, hopelessness or panic deserve a conversation with your GP.",
  },
  {
    Icon: Eye,
    name: "Heightened smell",
    feels: "Coffee, cooking smells, perfume or someone's deodorant suddenly feeling unbearable.",
    why: "Oestrogen sensitises the olfactory system. It's one of the earliest pregnancy symptoms many people notice.",
    normal: "Normal and tends to ease in the second trimester. Open windows and milder scents help.",
  },
];

const Symptoms = () => (
  <section id="symptoms" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="max-w-2xl mb-10">
        <SectionLabel>Common symptoms</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
          What may show up at week 8 — and what each one really means.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
          Symptoms are usually at, or close to, their peak this week. Some people feel almost everything on this list.
          Others feel surprisingly little. Both can be signs of an entirely healthy pregnancy.
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
        <Link to="/articles/nausea-in-early-pregnancy"
          className="inline-flex items-center gap-2 font-sans text-[13.5px] font-medium text-sage hover:gap-3 transition-all">
          Read the full guide to nausea in early pregnancy <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  </section>
);

/* 7. EMOTIONAL */
const emotionalTruths = [
  "Holding a huge piece of news while behaving like nothing has changed.",
  "Wanting the booking appointment to come, and dreading it at the same time.",
  "Counting symptoms. Feeling reassured when they're strong, anxious when they ease.",
  "Crying at things that don't usually move you.",
  "Worrying constantly about loss, especially if you've experienced one before.",
  "Feeling guilty for not feeling more excited.",
  "Quietly grieving the version of life you had a few weeks ago, even when this is wanted.",
];

const Emotional = () => (
  <section id="emotional" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-2 relative bg-gradient-to-br from-lavender-bg via-parchment to-lavender-bg/40 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-9 shadow-card-brand overflow-hidden">
        <img src={botanicalAccent} alt="" aria-hidden="true"
          className="absolute right-0 top-0 w-24 opacity-35 pointer-events-none select-none" />
        <SectionLabel tone="lavender">Emotionally this week</SectionLabel>
        <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-4">
          The hidden middle of the first trimester.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/80 leading-[1.8] mb-4">
          Week 8 is a strange emotional space. The pregnancy is real and physically demanding, but most people in
          your life still don't know. You may feel you're carrying everything quietly — including the worry.
        </p>
        <p className="font-sans text-[14px] text-foreground/70 leading-[1.75]">
          You don't need to feel only one thing. Tender, terrified, grateful, exhausted and uncertain can all live
          in the same week.
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
  </section>
);

/* 8. WHAT THIS MEANS */
const meaningPoints = [
  { title: "Symptom intensity is not a verdict.", body: "Strong symptoms do not guarantee a healthy pregnancy. Lighter symptoms do not mean something is wrong. Both ends are within normal at week 8." },
  { title: "Symptoms can flicker.", body: "A quieter day or two — even mid-trimester — is common. Hormones do not climb in a straight line, and your perception of them changes too." },
  { title: "The booking appointment matters.", body: "Most NHS booking appointments fall between weeks 8 and 10. It is the gateway to your scans, blood tests and continuous care. If you haven't been contacted, follow up." },
  { title: "Hidden weeks are heavy weeks.", body: "Holding the news privately while feeling so unwell is genuinely hard. You're allowed to tell one or two people early if you need support." },
];

const WhatThisMeans = () => (
  <section id="what-this-means" className="bg-sage-bg/35 py-16 md:py-24 border-y border-border/30">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
      <div className="text-center mb-10 max-w-2xl mx-auto">
        <SectionLabel>What this means</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight">
          How to read week 8 honestly.
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

/* 9. FOCUS */
const focusList = [
  { Icon: Stethoscope, title: "Confirm your booking appointment", note: "If your midwife or GP hasn't been in touch, chase it. Booking usually falls between 8 and 10 weeks and sets up the rest of your antenatal care." },
  { Icon: Utensils, title: "Eat what you can keep down", note: "Small, frequent, bland is the rule when nausea is bad. Toast, crackers, ginger, cold foods, smooth carbs. Perfect nutrition is not week 8's goal." },
  { Icon: Droplet, title: "Sip fluids constantly", note: "Dehydration makes nausea worse. Try sips of water, weak squash, ice lollies, or rehydration sachets if needed. Watch the colour of your urine." },
  { Icon: Apple, title: "Continue folic acid (and vitamin D)", note: "Folic acid 400 mcg daily up to 12 weeks. Vitamin D 10 mcg daily throughout pregnancy. Pregnancy multivitamins make this simple." },
  { Icon: Moon, title: "Allow yourself to do less", note: "Earlier nights, lighter evenings, fewer commitments. Tiredness this week is biological, not laziness." },
  { Icon: Heart, title: "Tell one safe person if you need to", note: "Even one person knowing makes hidden weeks lighter. You don't have to wait until 12 weeks to share with someone you trust." },
];

const Focus = () => (
  <section id="focus" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-4">
        <SectionLabel tone="terracotta">Focus this week</SectionLabel>
        <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.2rem] text-foreground leading-tight mb-4">
          Small, kind, practical decisions for a heavy week.
        </h2>
        <p className="font-sans text-[14px] text-foreground/75 leading-[1.8]">
          You don't need to do much. The right things are gentle and few.
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

/* 10. SEEK SUPPORT */
const seekSupport = [
  "Vomiting that stops you keeping fluids down for more than a day",
  "Heavy bleeding, especially with cramping or one-sided pain",
  "Severe, persistent abdominal or shoulder-tip pain",
  "Dark, scant urine, dizziness or feeling faint",
  "A high temperature, chills or feeling very unwell",
  "Persistent low mood, hopelessness or thoughts of harming yourself",
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
            Most week-8 symptoms are normal. A few deserve a quick call.
          </h3>
          <p className="font-sans text-[13.5px] text-foreground/70 leading-[1.75] mt-3">
            Trust your instincts. Contact your midwife, GP or NHS 111 — and 999 in an emergency. Severe sickness is
            treatable; you don't have to push through it alone.
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
    <div className="relative bg-stage-pregnancy/35 rounded-3xl border border-border/30 p-8 sm:p-10 md:p-14 text-center overflow-hidden">
      <span className="absolute left-7 top-6 font-serif text-4xl text-terracotta/40 leading-none">“</span>
      <span className="absolute right-7 bottom-4 font-serif text-4xl text-terracotta/40 leading-none">”</span>
      <p className="font-serif italic text-[1.2rem] sm:text-[1.35rem] md:text-[1.6rem] text-foreground/90 leading-snug max-w-3xl mx-auto">
        Holding so much, in such a small body, in such quiet weeks — that is real work. You are doing it.
      </p>
      <Heart size={14} className="text-terracotta/60 mx-auto mt-5" />
    </div>
  </section>
);

/* 12. REFLECTION + ASK */
const reflectionPrompts = ["How my body feels", "What I'm worried about", "Who knows so far", "What I'd want to remember"];
const askChips = ["Morning sickness relief", "Booking appointment", "Telling work", "Symptoms easing at 8 weeks", "When to worry about nausea"];

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
            The hidden weeks deserve a record too.
          </h3>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8] mb-6">
            Most pregnancy advice rushes past these heavy, private weeks. The Start of You journal gives them
            space — for the truth of how you feel, the booking appointment that's coming, and the small, brave moments
            no one else will see.
          </p>
          <ul className="space-y-2.5 mb-7">
            {[
              "Guided prompts for every week of pregnancy",
              "Space for first scans, photos and keepsakes",
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

/* 14. RELATED */
const related = [
  { slug: "nausea-in-early-pregnancy", img: nauseaImg, tag: "Symptoms",
    title: "Nausea in early pregnancy",
    desc: "Why morning sickness peaks now, what genuinely helps, and when to ask for more support." },
  { slug: "fatigue-in-early-pregnancy", img: fatigueImg, tag: "Body",
    title: "Fatigue in early pregnancy",
    desc: "Why week 8 can feel so heavy, and small ways to be kinder to yourself through it." },
  { slug: "tests-and-scans-in-pregnancy", img: testsScansImg, tag: "Care path",
    title: "Tests and scans in pregnancy",
    desc: "What your booking appointment covers, and what's coming at your dating scan around weeks 11–14." },
  { slug: "the-first-trimester-emotionally", img: emotionalImg, tag: "Emotions",
    title: "The first trimester, emotionally",
    desc: "The mix of joy, fear, exhaustion and tenderness that often peaks in the hidden weeks." },
  { slug: "when-you-cant-face-food-in-pregnancy", img: foodAversionsImg, tag: "Eating",
    title: "When you can't face food in pregnancy",
    desc: "Aversions, cravings and how to nourish yourself when almost nothing appeals." },
  { slug: "symptoms-stopping-early-pregnancy", img: symptomsStoppingImg, tag: "Reassurance",
    title: "When pregnancy symptoms ease",
    desc: "Why a quieter day or two at week 8 is usually nothing to worry about." },
];

const Related = () => (
  <section id="guidance" className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div className="max-w-xl">
          <SectionLabel>Read next, because of week 8</SectionLabel>
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
  { q: "Is it normal for morning sickness to be at its worst at 8 weeks?",
    a: "Yes. Nausea is usually most intense between weeks 8 and 11, when hCG is at its highest. It tends to ease noticeably by weeks 12–14, although a small group of people experience sickness for longer. Severe, unrelenting vomiting that stops you keeping fluids down is not normal — that may be hyperemesis gravidarum, and it's treatable." },
  { q: "Is it normal to have almost no symptoms at 8 weeks?",
    a: "It can be. Some people feel surprisingly well at 8 weeks, particularly if hormone sensitivity is lower or symptoms started later. Symptom intensity is not a reliable predictor of how a pregnancy is going. If you're worried, your midwife can usually arrange reassurance." },
  { q: "Is it safe to have a glass of wine in the first trimester?",
    a: "Current UK guidance is that the safest approach in pregnancy is no alcohol at all. There is no known safe level, and the first trimester is the most sensitive window. If you drank before you knew you were pregnant, the risk from low or moderate intake is generally considered very small — speak to your midwife if you're worried." },
  { q: "When is the booking appointment, and what happens?",
    a: "Most NHS booking appointments fall between weeks 8 and 10. It's usually about an hour with a midwife and includes a detailed health history, blood tests, urine sample, blood pressure, weight, and information about scans and screening. Your due date is confirmed at your dating scan, usually between weeks 11 and 14." },
  { q: "Can I get my dating scan earlier if I'm worried?",
    a: "If you have specific concerns — bleeding, severe one-sided pain, a history of ectopic pregnancy or recurrent loss — you may be offered an early viability scan, often through an Early Pregnancy Assessment Unit (EPAU). Speak to your GP or midwife." },
  { q: "Should I tell my employer yet?",
    a: "Legally in the UK you don't have to tell your employer until 15 weeks before your due date, but you can tell them earlier. Telling sooner can unlock pregnancy-related sickness protection, time off for antenatal appointments, and risk assessments at work — useful if sickness is affecting you." },
  { q: "Is light brown spotting normal at 8 weeks?",
    a: "Light brown spotting can happen and is often nothing serious. Bright red bleeding, heavy bleeding or bleeding with cramping or one-sided pain should always be checked the same day, ideally through your maternity unit or EPAU." },
  { q: "What does the embryo actually look like at 8 weeks?",
    a: "Around 1.6 cm long, curled in the gestational sac, with a clearly larger head, dark eye spots, small limb buds becoming arms and legs, a beating heart and an umbilical cord beginning to form. By the end of this week, the embryo is officially called a fetus." },
];

/* 16. NEXT */
const Next = () => (
  <section className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
      <div className="bg-gradient-to-br from-sage-bg via-parchment to-stage-pregnancy/30 rounded-3xl border border-border/30 p-8 sm:p-10 md:p-14 text-center shadow-card-brand">
        <SectionLabel>Up next</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[1.95rem] md:text-[2.5rem] text-foreground leading-tight mb-3">
          Ready for week 9?
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 max-w-lg mx-auto mb-8 leading-[1.8]">
          The embryo officially becomes a fetus this week. Symptoms often stay strong, but you may begin to notice
          tiny shifts — the first sign that the second trimester is, slowly, on its way.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
          <Link to="/pregnancy/week/9"
            className="inline-flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium shadow-cta hover:bg-terracotta-hover transition-colors">
            Continue to week 9 <ArrowRight size={14} />
          </Link>
          <Link to="/pregnancy/first-trimester"
            className="inline-flex items-center justify-center gap-2 border border-foreground/25 text-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium hover:bg-parchment-dark transition-colors">
            Back to First Trimester
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const Week8Page = () => (
  <div className="min-h-screen bg-parchment">
    <PregnancyWeekSeo weekNumber={8} />
    <Navbar />
    <Hero />
    <MetaBar />
    <AtAGlance />
    <Biology />
    <Body />
    <Symptoms />
    <Emotional />
    <WhatThisMeans />
    <Focus />
    <SeekSupport />
    <Quote />
    <WeekReflectionAsk week={8} reflectionPrompts={reflectionPrompts} askChips={askChips} />
    <Journal />
    <Related />
    <WeekCommonQuestions week={8} questions={buildWeekQuestions(8, faqs)} />
    <WeekSources week={8} sources={getWeekSources(8)} />
    <Next />
    <Footer />
  </div>
);

export default Week8Page;
