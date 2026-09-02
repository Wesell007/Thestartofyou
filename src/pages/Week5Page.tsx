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
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PregnancyWeekSeo from "@/components/seo/PregnancyWeekSeo";
import PublicWeekReflectionAsk from "@/components/pregnancy/PublicWeekReflectionAsk";
import embryoImg from "@/assets/week5-embryo.jpg";
import appleseedImg from "@/assets/week5-appleseed.jpg";
import biologyImg from "@/assets/week5-biology-detail.jpg";
import journalImg from "@/assets/journal-flatlay.jpg";
import botanicalTr from "@/assets/botanical-branch-tr.png";
import botanicalBl from "@/assets/botanical-branch-bl.png";
import botanicalAccent from "@/assets/article-botanical-accent.png";
import implantationImg from "@/assets/article-hero-implantation.jpg";
import implantationBleedImg from "@/assets/article-hero-implantation-bleeding.jpg";
import earlySymptomsImg from "@/assets/article-hero-early-symptoms.jpg";
import emotionalImg from "@/assets/article-hero-emotional-first-tri.jpg";
import testsScansImg from "@/assets/article-hero-tests-scans.jpg";
import fatigueImg from "@/assets/article-hero-fatigue.jpg";
import WeekCommonQuestions from "@/components/week/WeekCommonQuestions";
import WeekSources from "@/components/week/WeekSources";
import { buildWeekQuestions, getWeekSources } from "@/data/weekSupportContent";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

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
        <Breadcrumbs
          tone="section"
          className="flex justify-center mb-6 sm:mb-7 font-sans text-[12px] font-normal text-foreground/65"
          items={[
            { label: "Pregnancy", href: "/pregnancy" },
            { label: "Week by week", href: "/pregnancy/first-trimester" },
            { label: "Week 5", href: "/pregnancy/week/5" },
          ]}
        />

        <p className="font-sans text-[11px] font-semibold tracking-[0.3em] uppercase text-sage mb-5">
          First trimester · The week of the positive test
        </p>
        <h1 className="font-serif text-[2.5rem] sm:text-5xl md:text-[3.75rem] lg:text-[4.25rem] text-foreground leading-[1.04] tracking-tight mb-4 md:mb-5">
          5 Weeks Pregnant
        </h1>
        <p className="font-serif italic text-[1.05rem] sm:text-lg md:text-xl text-foreground/75 max-w-xl mx-auto leading-relaxed">
          Your baby is the size of an apple seed. Hormones are rising fast, the test is positive, and the world has quietly tilted on its axis — even if nothing on the outside has changed.
        </p>
      </div>

      <Link to="/pregnancy/week/4" aria-label="Go to week 4"
        className="absolute left-3 sm:left-6 md:left-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronLeft size={18} />
      </Link>
      <Link to="/pregnancy/week/6" aria-label="Go to week 6"
        className="absolute right-3 sm:right-6 md:right-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronRight size={18} />
      </Link>
    </div>

    <div className="relative -mt-28 sm:-mt-36 md:-mt-40 mb-6">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex items-end justify-center gap-5 sm:gap-10 md:gap-14">
          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-card border-[3px] border-sage/15 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={appleseedImg} alt="Apple seed" loading="lazy" width={512} height={512}
                className="w-full h-full object-cover" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.04]" />
            </div>
            <div className="text-center">
              <p className="font-serif italic text-[12.5px] text-foreground/80 leading-tight">apple seed</p>
              <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/55 mt-1">~2&nbsp;mm</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full bg-card border-[4px] border-sage/25 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={embryoImg}
                alt="Soft editorial illustration of a 5-week embryo, a tiny tadpole-like form curled in the early gestational sac"
                width={1024} height={1024}
                loading="eager" decoding="async"
                className="w-full h-full object-cover scale-[1.02]" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.05]" />
            </div>
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.22em] uppercase text-foreground/65">Your baby this week</p>
          </div>

          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-sage-bg to-sage-bg/40 border-[3px] border-sage/25 flex items-center justify-center shadow-elevated">
              <span className="font-serif text-[1.7rem] sm:text-[1.95rem] text-foreground tracking-tight leading-none">35</span>
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

/* 2. META BAR */
const anchors = [
  { id: "at-a-glance", label: "At a glance", Icon: Sparkles },
  { id: "biology", label: "What's underway", Icon: Sprout },
  { id: "test", label: "The positive test", Icon: TestTube },
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
            <p className="font-sans text-[13px] font-medium text-foreground leading-snug">
              ✔ Medically reviewed by Jenny Joines
            </p>
            <p className="font-sans text-[11.5px] font-normal text-foreground/60 mt-0.5">
              Updated for 2026 · 11 min read · Very early first trimester
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
  { label: "Stage", value: "Very early first trimester" },
  { label: "Baby size", value: "~2 mm — apple seed" },
  { label: "Baby form", value: "Embryo with early heart" },
  { label: "Trimester", value: "1 of 3" },
];

const AtAGlance = () => (
  <section id="at-a-glance" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl mb-14 md:mb-20">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 relative bg-gradient-to-br from-sage-bg/55 via-parchment to-parchment-dark/50 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-10 overflow-hidden shadow-card-brand">
        <img src={botanicalAccent} alt="" aria-hidden="true"
          className="absolute -left-3 bottom-0 w-28 opacity-35 pointer-events-none select-none" />
        <SectionLabel>At a glance</SectionLabel>
        <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-5">
          Week 5 is the week most people find out.
        </h2>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8] mb-4">
          Your period is officially late, hCG is now high enough for a home test to show two clear lines,
          and inside, an embryo about the size of an apple seed is curled in a tiny gestational sac. The
          earliest beats of a heart are starting to flutter.
        </p>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8]">
          Outside, almost nothing has changed. Inside, everything has. It is one of the strangest,
          most fragile and most charged weeks of pregnancy — known, but not yet showing; real, but not
          yet feeling real.
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
  { title: "An embryo, not yet a fetus", body: "Until 10 weeks your baby is technically called an embryo. At 5 weeks it is a tiny curved tube around 2 mm long, suspended in the gestational sac that may be visible on a very early scan." },
  { title: "The first beats of a heart", body: "The heart tube has folded and is starting to twitch — the very earliest beating, though it is too small and quiet to hear yet. By 6–7 weeks a flicker may be visible on an early scan." },
  { title: "Neural tube forming", body: "The neural tube — which becomes the brain and spinal cord — is forming and starting to close. This is exactly why folic acid matters so much in these first weeks. If you haven't started, start today." },
  { title: "Placenta finding its footing", body: "Tiny finger-like villi are burrowing into the lining of your womb, building what will become the placenta. hCG from these cells is what your test is detecting and what is causing the first symptoms." },
];

const Biology = () => (
  <section id="biology" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="relative rounded-3xl overflow-hidden border border-border/40 shadow-card-brand">
            <div className="aspect-[4/5]">
              <img src={biologyImg} alt="Soft editorial close-up of a 5-week embryo, curved tube-like form with the early heart bulge and forming neural tube"
                loading="lazy" width={1024} height={1280}
                className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-foreground/60 to-transparent">
              <p className="font-serif italic text-[13px] text-background/95 leading-snug">
                Two millimetres of beginning. Already more than you can quite take in.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <SectionLabel>What's underway biologically</SectionLabel>
          <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-5">
            Almost nothing on the outside, everything on the inside.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8] mb-8 max-w-2xl">
            Week 5 is one of the most active weeks of human development. The embryo has just three layers
            — ectoderm, mesoderm and endoderm — and from those, every organ, bone, vessel and nerve will
            be built. The very first quiet versions of a heart, brain and spine are taking shape now.
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

/* 5. THE POSITIVE TEST — Week 5 unique section */
const testPoints = [
  { Icon: TestTube, title: "What two lines actually mean", body: "Home pregnancy tests detect hCG, the hormone made by the developing placenta. By 5 weeks levels are usually high enough to give a clear positive — even on cheaper tests. A faint line still counts as a line." },
  { Icon: HeartPulse, title: "Why hCG doubles every 48–72 hours", body: "In healthy early pregnancy, hCG rises sharply in the first weeks — that's why a test you took yesterday may look much darker today. By around 8–11 weeks it peaks, then settles down." },
  { Icon: Sparkles, title: "Testing again (and again)", body: "Almost everyone retests. Different brand, different time of day, just-to-be-sure. That's not anxiety — it's a brain trying to make a very abstract piece of news real. Once is enough; ten times is human too." },
  { Icon: AlertTriangle, title: "If a line gets lighter", body: "Lines can vary depending on how diluted your urine is, so a slightly fainter line in the afternoon doesn't usually mean anything. A clearly fading test or one that turns negative, especially with bleeding or cramping, is worth speaking to your GP about." },
];

const PositiveTest = () => (
  <section id="test" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel tone="terracotta">The positive test</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        Two lines. And then the brain trying to catch up with them.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        Most people test in week 4 or 5. Whatever you're feeling about those lines — joy, shock, fear,
        numbness, all four — it's allowed. Here's what's actually happening behind the test.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {testPoints.map(({ Icon, title, body }) => (
        <div key={title}
          className="relative bg-card rounded-2xl border border-border/40 p-6 md:p-7 shadow-card-brand overflow-hidden">
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
        <Stethoscope size={15} className="text-sage" />
      </span>
      <p className="font-sans text-[14px] text-foreground/85 leading-[1.7]">
        <span className="font-semibold">Once you're sure, you can self-refer to your local midwifery service</span>{" "}
        in most parts of the UK — you don't have to wait for a GP appointment first. Booking-in usually
        happens between 8 and 10 weeks.
      </p>
    </div>
  </section>
);

/* 6. BODY */
const bodyNotes = [
  { Icon: Moon, title: "Tiredness that doesn't make sense yet", body: "A heavy, sit-down kind of tired by mid-afternoon. Progesterone is climbing fast and your body is quietly building a placenta — the most metabolically expensive thing it has ever done." },
  { Icon: Heart, title: "Tender, fuller breasts", body: "Often the first physical sign anyone notices. Sore, heavy, tingling, with veins more visible. Hormones are preparing the milk-making tissue from very early on." },
  { Icon: Droplet, title: "A late period — and maybe a faint trickle", body: "Your period is now officially missed. Some people see light spotting around when their period would have been due — implantation bleed or a small hormonal dip. Brown or pink, light, brief." },
];

const Body = () => (
  <section id="body" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="max-w-2xl mb-10">
        <SectionLabel tone="terracotta">Your body this week</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
          Your body knows already. It will start telling you in small ways.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
          Some people feel almost nothing at 5 weeks. Others feel a lot. Both are completely normal —
          symptoms are not a measure of how well anything is going.
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
    Icon: HeartPulse, name: "Mild cramping",
    feels: "A pulling or tugging low in the belly, sometimes one-sided, often very like period cramps. Usually mild.",
    why: "Your uterus is already starting to grow and the implanted embryo is settling deeper into the lining.",
    normal: "Common and reassuring. Sharp, persistent one-sided pain — especially with shoulder-tip pain or feeling faint — needs urgent assessment to rule out ectopic pregnancy.",
  },
  {
    Icon: Droplet, name: "Light spotting",
    feels: "Pink or brown discharge for a day or two, sometimes only when you wipe.",
    why: "Implantation, or a small dip in hormones around when your period would have been due.",
    normal: "Up to 1 in 4 people see some spotting in early pregnancy and go on to have a healthy pregnancy. Bright red bleeding, especially with cramps, should be checked the same day.",
  },
  {
    Icon: Heart, name: "Sore, heavy breasts",
    feels: "Tender, fuller, sometimes tingly. Bras feel uncomfortable. Veins more visible.",
    why: "Oestrogen and progesterone are rising fast and milk-making tissue is preparing from very early on.",
    normal: "Universal in early pregnancy. Often one of the first signs.",
  },
  {
    Icon: Moon, name: "Sudden, heavy tiredness",
    feels: "A bone-deep need to lie down, especially mid-afternoon and after meals. Hard to push through.",
    why: "Progesterone is sedating, blood volume is rising, and your body is building a placenta.",
    normal: "Very common from week 5 onwards. Sleep is medicine. Eat little and often. Don't try to power through.",
  },
  {
    Icon: Coffee, name: "Mild nausea or food aversions",
    feels: "Queasy in waves, sudden dislike of foods you used to love, hyper-sensitive nose.",
    why: "Rising hCG and oestrogen are interacting with your gut and brain.",
    normal: "Often starts around 5–6 weeks and peaks 8–10. Severe vomiting that prevents you keeping fluids down (HG) needs medical help — please don't wait.",
  },
  {
    Icon: Sparkles, name: "Frequent weeing",
    feels: "Up in the night again, planning where the toilets are.",
    why: "Increased blood volume means your kidneys are processing more fluid, and your growing uterus is starting to press on your bladder.",
    normal: "Very common. Burning, pain, or blood in urine — check for a UTI; they're more common in pregnancy and worth treating early.",
  },
];

const Symptoms = () => (
  <section id="symptoms" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel>Common symptoms</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        What's likely to show up at week 5 — and what each one really means.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        Early symptoms are unpredictable. Some people feel everything at once. Others have nothing for
        another week or two. Neither tells you anything about how the pregnancy is going.
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
      <Link to="/articles/early-pregnancy-symptoms-explained"
        className="inline-flex items-center gap-2 font-sans text-[13.5px] font-medium text-sage hover:gap-3 transition-all">
        Read: the earliest pregnancy symptoms, week by week <ArrowRight size={13} />
      </Link>
    </div>
  </section>
);

/* 8. EMOTIONAL */
const emotionalTruths = [
  "Looking at the test for the tenth time as if the lines might disappear.",
  "Wanting to tell everyone, and wanting to tell no one.",
  "Joy and fear sitting in the chest at exactly the same time.",
  "Worrying about every twinge and every absence of a twinge.",
  "Quiet, careful protectiveness over something that doesn't even feel real yet.",
  "Grief or guilt creeping in if you've been here before and lost it.",
  "Holding the secret like glass while smiling through a normal day.",
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
            Real, but not yet feeling real.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/80 leading-[1.8] mb-4">
            Week 5 is one of the most emotionally complicated weeks of pregnancy. You know. You can
            barely tell anyone. You're scared to be too happy. You're scared not to be happy enough.
          </p>
          <p className="font-sans text-[14px] text-foreground/70 leading-[1.75]">
            None of this is a failure of love or of bonding. It is the very early days, asked to feel
            like a finished thing. Your body is ahead of your mind. That's normal.
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
  { Icon: Sprout, title: "Take folic acid every single day", note: "400 micrograms daily until 12 weeks. If you have diabetes, epilepsy, a higher BMI or a family history, your GP may advise the higher 5 mg dose. The neural tube is forming now." },
  { Icon: Phone, title: "Self-refer to your local midwifery service", note: "In most of the UK you can refer yourself online — search for 'self refer midwife' plus your area. Booking-in usually happens at 8–10 weeks. You don't need a GP appointment first." },
  { Icon: Coffee, title: "Soften the things you can soften", note: "Stop drinking. Drop caffeine to under 200 mg a day (about two mugs of tea or one strong coffee). Skip the soft cheeses, pâté and undercooked meat list — your midwife will run through it properly." },
  { Icon: Moon, title: "Treat tiredness as information", note: "If you're suddenly exhausted at 4pm, lie down. Rearrange evenings if you can. The first trimester is often the most tiring of the whole pregnancy — that is your body building a placenta." },
  { Icon: Heart, title: "Decide who you tell — and don't tell", note: "There is no right way. Some people tell one trusted person. Some tell no one until 12 weeks. Some tell the whole world. You are allowed to change your mind every day this week." },
  { Icon: Sparkles, title: "Write the date down", note: "First day of your last period. Roughly when you think you ovulated, if you know. It will help your midwife date the pregnancy and feels grounding to put a number on something so abstract." },
];

const Focus = () => (
  <section id="focus" className="bg-sage-bg/35 py-16 md:py-24 border-y border-border/30">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <SectionLabel tone="terracotta">Focus this week</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.2rem] text-foreground leading-tight mb-4">
            A few small, kind things — that's all.
          </h2>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8]">
            Week 5 doesn't ask for a plan. It asks for a few quiet daily acts: folic acid, gentle care,
            a referral, and permission to feel however you actually feel.
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
  "Heavy bright red bleeding, especially soaking a pad",
  "Severe one-sided pain low in the belly",
  "Shoulder-tip pain, dizziness or feeling faint",
  "A test that has clearly faded or turned negative, especially with bleeding",
  "Severe vomiting that stops you keeping fluids down",
  "Burning, pain or blood when you wee (possible UTI)",
  "A high temperature with chills",
  "If you're struggling emotionally — pregnancy news can land in many ways",
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
            Trust what you're feeling. Phoning for advice early is always allowed.
          </h3>
          <p className="font-sans text-[13.5px] text-foreground/70 leading-[1.75] mt-3">
            Your GP, NHS 111, or — once you're booked — your midwifery team are all good first calls. In
            an emergency dial 999 or go to your nearest A&E.
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
    <div className="relative bg-sage-bg/45 rounded-3xl border border-border/30 p-8 sm:p-10 md:p-14 text-center overflow-hidden">
      <span className="absolute left-7 top-6 font-serif text-4xl text-sage/40 leading-none">“</span>
      <span className="absolute right-7 bottom-4 font-serif text-4xl text-sage/40 leading-none">”</span>
      <p className="font-serif italic text-[1.2rem] sm:text-[1.35rem] md:text-[1.6rem] text-foreground/90 leading-snug max-w-3xl mx-auto">
        It's allowed to feel completely real and completely unreal at the same time. That isn't a sign you don't love it. It's the truth of how early this is.
      </p>
      <Heart size={14} className="text-sage/60 mx-auto mt-5" />
    </div>
  </section>
);

/* 12. REFLECTION + ASK */
const reflectionPrompts = ["The moment I saw the lines", "Who I want to tell first", "What I'm scared to hope for", "What I want to remember"];
const askChips = ["Is light spotting normal at 5 weeks?", "When can I have an early scan?", "Is it too early for symptoms?", "How much folic acid do I need?", "Can I still drink coffee?"];

const ReflectionAsk = () => (
  <PublicWeekReflectionAsk
    week={5}
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
            The very beginning is the part you'll most want to remember.
          </h3>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8] mb-6">
            The morning of the test. Who you told. What you whispered to yourself in the bathroom mirror.
            The first weeks of pregnancy disappear quickly into the rest of the journey — the journal
            keeps them held.
          </p>
          <ul className="space-y-2.5 mb-7">
            {[
              "A page for the day you found out",
              "Letters to your baby from the very first week",
              "Guided prompts through every week, all the way to birth",
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
  { slug: "early-pregnancy-symptoms-explained", img: earlySymptomsImg, tag: "Symptoms",
    title: "The earliest pregnancy symptoms",
    desc: "What's likely in the first weeks, what comes later, and what symptoms (and their absence) actually tell you." },
  { slug: "implantation-bleeding", img: implantationBleedImg, tag: "Spotting",
    title: "Implantation bleeding or period?",
    desc: "How to tell the difference, when light spotting is normal, and when to call about bleeding." },
  { slug: "how-long-implantation-takes", img: implantationImg, tag: "Biology",
    title: "What's actually happening when a test goes positive",
    desc: "The science of hCG, faint lines, and why your test may suddenly look much darker tomorrow." },
  { slug: "tests-and-scans-in-pregnancy", img: testsScansImg, tag: "Care",
    title: "Booking in: tests, scans and your first appointments",
    desc: "What happens after a positive test in the UK, how to self-refer, and what your first midwife visit looks like." },
  { slug: "fatigue-in-early-pregnancy", img: fatigueImg, tag: "Body",
    title: "Why early pregnancy is so exhausting",
    desc: "The biology behind first-trimester tiredness, and small things that genuinely help." },
  { slug: "the-first-trimester-emotionally", img: emotionalImg, tag: "Emotions",
    title: "The first trimester, emotionally",
    desc: "Joy, fear, secrecy, fragility — the very specific emotional weather of the first weeks." },
];

const Related = () => (
  <section id="guidance" className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div className="max-w-xl">
          <SectionLabel>Read next, because of week 5</SectionLabel>
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
  { q: "Why am I 5 weeks pregnant when I only conceived 3 weeks ago?",
    a: "Pregnancy is dated from the first day of your last menstrual period (LMP), not from conception. That's because most people know roughly when their period started, but not exactly when they ovulated. So in week 5, your baby is around 3 weeks since conception. Your due date is calculated as 40 weeks from your LMP." },
  { q: "Is a faint line on a pregnancy test still a positive?",
    a: "Yes. Any visible second line — even a very faint one that appears within the test's reading window — counts as a positive result. Lines can be lighter for lots of reasons (diluted urine, less sensitive test, very early in pregnancy). If you want reassurance, retest in 48 hours with first-morning urine: in a healthy early pregnancy the line usually gets darker as hCG climbs." },
  { q: "Is light bleeding normal at 5 weeks?",
    a: "Some light pink or brown spotting can be normal in early pregnancy and is often just the embryo settling deeper into the lining of the womb, or a small hormonal dip around when your period would have been due. Up to 1 in 4 people see some spotting in the first trimester and go on to have a healthy pregnancy. Bright red bleeding, especially with cramping or pain, should be checked by your GP or local Early Pregnancy Unit the same day." },
  { q: "What should I do as soon as I find out?",
    a: "Three small things: start (or keep taking) 400 micrograms of folic acid daily until 12 weeks; stop drinking alcohol; cut caffeine to under 200 mg a day. Then self-refer to your local midwifery service when you feel ready — in most parts of the UK you can do this online without seeing a GP first. Booking-in usually happens between 8 and 10 weeks." },
  { q: "Do I need an early scan?",
    a: "Not routinely. The standard NHS dating scan is between 11 and 14 weeks. Early scans (from around 6–7 weeks) are usually offered if you've had bleeding, severe pain, previous miscarriage or ectopic pregnancy, or if you've conceived through fertility treatment. You can also pay privately for an early reassurance scan — many people do, especially after loss. There's no medical need for one if everything feels fine." },
  { q: "I have no symptoms — is something wrong?",
    a: "No. Symptoms vary enormously, and at 5 weeks many people genuinely feel almost nothing yet. Symptoms (or the lack of them) are not a reliable measure of how the pregnancy is going. Most early-pregnancy symptoms ramp up between week 6 and week 9. If you have specific worries, your midwife or GP will always listen." },
  { q: "Can I tell people yet?",
    a: "There is no rule. Many people wait until after the 12-week scan, when the risk of early miscarriage drops, before telling more widely. Many tell one or two trusted people much sooner — often it's a relief not to carry the news alone. Some tell straight away. There's no right way; only the way that feels right for you, and you can change your mind." },
  { q: "I'm scared something will go wrong. Is that normal?",
    a: "Completely. The first trimester carries a real, statistically meaningful risk of miscarriage, and most people who know they're pregnant feel some version of fear — especially if they've been here before. The fear isn't a premonition. It's love and care arriving early. Be gentle with yourself. Tell someone who can hold the worry with you. And know that most pregnancies that reach 5 weeks with a clearly positive test do continue." },
];

/* 16. NEXT */
const Next = () => (
  <section className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
      <div className="bg-gradient-to-br from-sage-bg via-parchment to-stage-pregnancy/30 rounded-3xl border border-border/30 p-8 sm:p-10 md:p-14 text-center shadow-card-brand">
        <SectionLabel>Up next</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.5rem] text-foreground leading-tight mb-3">
          Ready for week 6?
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 max-w-lg mx-auto mb-8 leading-[1.8]">
          Next week the heart will become more clearly detectable, symptoms often step up a gear, and
          the secret you're holding may start to feel a little more real.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
          <Link to="/pregnancy/week/6"
            className="inline-flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium shadow-cta hover:bg-terracotta-hover transition-colors">
            Continue to week 6 <ArrowRight size={14} />
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

const Week5Page = () => (
  <div className="min-h-screen bg-parchment">
    <PregnancyWeekSeo weekNumber={5} />
    <Navbar />
    <Hero />
    <MetaBar />
    <AtAGlance />
    <Biology />
    <PositiveTest />
    <Body />
    <Symptoms />
    <Emotional />
    <Focus />
    <SeekSupport />
    <Quote />
    <ReflectionAsk />
    <Journal />
    <Related />
    <WeekCommonQuestions week={5} questions={buildWeekQuestions(5, faqs)} />
    <WeekSources week={5} sources={getWeekSources(5)} />
    <Next />
    <Footer />
  </div>
);

export default Week5Page;
