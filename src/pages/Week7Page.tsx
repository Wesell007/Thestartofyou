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
  Coffee,
  ShieldCheck,
  Stethoscope,
  Phone,
  Wind,
  Scan,
  Soup,
  Brain,
  Eye,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PregnancyWeekSeo from "@/components/seo/PregnancyWeekSeo";
import PublicWeekReflectionAsk from "@/components/pregnancy/PublicWeekReflectionAsk";
import embryoImg from "@/assets/week7-embryo.jpg";
import blueberryImg from "@/assets/week7-blueberry.jpg";
import biologyImg from "@/assets/week7-biology-detail.jpg";
import journalImg from "@/assets/journal-flatlay.jpg";
import botanicalTr from "@/assets/botanical-branch-tr.png";
import botanicalBl from "@/assets/botanical-branch-bl.png";
import botanicalAccent from "@/assets/article-botanical-accent.png";
import nauseaImg from "@/assets/article-hero-nausea.jpg";
import fatigueImg from "@/assets/article-hero-fatigue.jpg";
import foodAversionsImg from "@/assets/article-hero-food-aversions.jpg";
import emotionalImg from "@/assets/article-hero-emotional-first-tri.jpg";
import testsScansImg from "@/assets/article-hero-tests-scans.jpg";
import symptomsStoppingImg from "@/assets/article-hero-symptoms-stopping.jpg";
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
  // Single authoritative crumb array: feeds the visible trail and the schema.
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Pregnancy", href: "/pregnancy" },
    { label: "First trimester", href: "/pregnancy/first-trimester" },
    { label: "Week 7", href: "/pregnancy/week/7" },
  ];

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
    <div className="relative bg-gradient-to-br from-stage-pregnancy/55 via-parchment to-sage-bg/40 pt-20 pb-36 sm:pt-24 sm:pb-44 md:pt-32 md:pb-52">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[820px] h-[420px] rounded-full bg-stage-pregnancy/30 blur-3xl" />
        <div className="absolute -top-10 right-1/4 w-[260px] h-[260px] rounded-full bg-terracotta/8 blur-3xl" />
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

        <p className="font-sans text-[11px] font-semibold tracking-[0.3em] uppercase text-terracotta mb-5">
          First trimester · The hardest stretch of early symptoms
        </p>
        <h1 className="font-serif text-[2.5rem] sm:text-5xl md:text-[3.75rem] lg:text-[4.25rem] text-foreground leading-[1.04] tracking-tight mb-4 md:mb-5">
          7 Weeks Pregnant
        </h1>
        <p className="font-serif italic text-[1.05rem] sm:text-lg md:text-xl text-foreground/75 max-w-xl mx-auto leading-relaxed">
          Your baby is the size of a blueberry — and inside, the most rapid month of human development is in full motion. On the outside, this is often the queasiest, most exhausted, most quietly anxious week so far.
        </p>
      </div>

      <Link to="/pregnancy/week/6" aria-label="Go to week 6"
        className="absolute left-3 sm:left-6 md:left-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronLeft size={18} />
      </Link>
      <Link to="/pregnancy/week/8" aria-label="Go to week 8"
        className="absolute right-3 sm:right-6 md:right-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronRight size={18} />
      </Link>
    </div>

    <div className="relative -mt-28 sm:-mt-36 md:-mt-40 mb-6">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex items-end justify-center gap-5 sm:gap-10 md:gap-14">
          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-card border-[3px] border-sage/15 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={blueberryImg} alt="A single blueberry" loading="lazy" width={512} height={512}
                className="w-full h-full object-cover" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.04]" />
            </div>
            <div className="text-center">
              <p className="font-serif italic text-[12.5px] text-foreground/80 leading-tight">blueberry</p>
              <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/55 mt-1">~10&nbsp;mm</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full bg-card border-[4px] border-terracotta/30 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={embryoImg}
                alt="Soft editorial illustration of a 7-week embryo: curled C-shape, large head, dark eye spots beginning to pigment, paddle-shaped arm and leg buds lengthening, visible heart bulge, tail still present"
                width={1024} height={1024}
                loading="eager" decoding="async"
                className="w-full h-full object-cover scale-[1.02]" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.05]" />
            </div>
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.22em] uppercase text-foreground/65">Your baby this week</p>
          </div>

          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-stage-pregnancy/70 to-stage-pregnancy/30 border-[3px] border-terracotta/25 flex items-center justify-center shadow-elevated">
              <span className="font-serif text-[1.7rem] sm:text-[1.95rem] text-foreground tracking-tight leading-none">33</span>
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-terracotta/15" />
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
  { id: "biology", label: "Baby this week", Icon: Sprout },
  { id: "scan", label: "Scans & reassurance", Icon: Scan },
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
              Updated for 2026 · 12 min read · Peak first-trimester symptoms
            </p>
          </div>
        </div>
        <nav aria-label="On this page" className="flex-1 pt-4 lg:pt-0">
          <div className="flex gap-x-1 gap-y-2 overflow-x-auto lg:flex-wrap scrollbar-hide -mx-1 px-1">
            {anchors.map(({ id, label, Icon }) => (
              <a key={id} href={`#${id}`}
                className="group shrink-0 flex items-center gap-2 px-3 py-2 rounded-full hover:bg-stage-pregnancy/40 transition-colors">
                <span className="w-7 h-7 rounded-full bg-parchment-dark/80 border border-border/30 flex items-center justify-center group-hover:border-terracotta/30 transition-colors">
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
  { label: "Stage", value: "Mid first trimester" },
  { label: "Baby size", value: "~10 mm — blueberry" },
  { label: "Baby form", value: "Embryo with paddle limbs & strong heartbeat" },
  { label: "Trimester", value: "1 of 3" },
];

const AtAGlance = () => (
  <section id="at-a-glance" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl mb-14 md:mb-20">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 relative bg-gradient-to-br from-stage-pregnancy/55 via-parchment to-parchment-dark/50 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-10 overflow-hidden shadow-card-brand">
        <img src={botanicalAccent} alt="" aria-hidden="true"
          className="absolute -left-3 bottom-0 w-28 opacity-35 pointer-events-none select-none" />
        <SectionLabel tone="terracotta">At a glance</SectionLabel>
        <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-5">
          The week the embryo doubles — and so does the symptom load.
        </h2>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8] mb-4">
          Inside, your embryo has roughly doubled in size from week 6 to around 10 mm long. Eye pigmentation is appearing,
          arm and leg paddles are lengthening, the heart now beats around 150 times a minute, and the brain is
          forming so fast it's growing roughly 100 new cells every minute.
        </p>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8]">
          Outside, week 7 is often the heaviest stretch of early symptoms. Nausea is usually well established,
          fatigue is bone-deep, smells are intolerable, and a quiet anxiety hums underneath everything. Many people
          describe this as the week pregnancy stops feeling exciting and starts feeling like surviving the day.
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
  { title: "A face beginning to map itself", body: "The dark spots that will become eyes are starting to pigment. Tiny indentations mark where the nostrils will be. The lower jaw is forming. The first faint outlines of ears are appearing on the side of the head — though for now the head is still disproportionately huge." },
  { title: "Limb buds lengthening into paddles", body: "Last week's tiny stumps have grown into clearly visible flipper-like paddles. By the end of week 7 the elbow and shoulder regions begin to differentiate. Fingers and toes are still webbed but the hand and foot plates are forming." },
  { title: "A heart beating around 150 bpm", body: "The heart now has four primitive chambers and is beating at roughly 150 times a minute — almost twice your own resting rate. On a transvaginal scan from 7 weeks the heartbeat is almost always clearly visible as a strong, rapid flicker." },
  { title: "A brain growing 100 cells a minute", body: "The brain is in its most rapid growth phase of the entire pregnancy — adding roughly 100 new neurons every minute. The neural tube has fully closed and the three primary brain divisions (forebrain, midbrain, hindbrain) are now forming." },
];

const Biology = () => (
  <section id="biology" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="relative rounded-3xl overflow-hidden border border-border/40 shadow-card-brand">
            <div className="aspect-[4/5]">
              <img src={biologyImg} alt="Soft editorial close-up of a 7-week embryo: curled form with pigmented eye spots, paddle-shaped limb buds beginning to differentiate, prominent four-chambered heart bulge, suspended in the gestational sac"
                loading="lazy" width={1024} height={1280}
                className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-foreground/60 to-transparent">
              <p className="font-serif italic text-[13px] text-background/95 leading-snug">
                Ten millimetres. A face beginning. A brain adding 100 cells every minute.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <SectionLabel>What's underway biologically</SectionLabel>
          <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-5">
            The most rapid month of human development — happening right now.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8] mb-8 max-w-2xl">
            Week 7 sits inside the busiest fortnight your baby will ever have. Almost every organ system is being
            laid down at once: the brain doubling in size, the heart settling into rhythm, eyes beginning to
            pigment, limbs lengthening, the gut and lungs branching out. The embryo doesn't just grow this week —
            it transforms.
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

/* 5. SCANS & REASSURANCE */
const scanPoints = [
  { Icon: Scan, title: "What a 7-week scan typically shows", body: "On a transvaginal scan at 7 weeks, the gestational sac, yolk sac and a small embryo are almost always clearly visible. A strong, rapid heartbeat — around 120–160 bpm — is usually seen and can sometimes be heard. The embryo measures around 8–11 mm crown-to-rump." },
  { Icon: HeartPulse, title: "Why the heartbeat matters this week", body: "Once a heartbeat is confirmed at 7 weeks with the embryo measuring on track for dates, the chance of ongoing pregnancy improves significantly. This is one of the reassurances people often carry through the harder weeks ahead, even when symptoms wobble." },
  { Icon: AlertTriangle, title: "How NHS early scans work", body: "Routine NHS dating scans happen at 11–14 weeks. An earlier scan at 7 weeks is usually only offered if you have bleeding, severe pain, previous miscarriage, ectopic pregnancy, or fertility treatment. Your GP, midwife, or NHS 111 can refer you to the local Early Pregnancy Unit (EPU)." },
  { Icon: Sparkles, title: "Choosing a private reassurance scan", body: "Many people pay privately for a reassurance scan at 7–9 weeks, especially after previous loss or fertility treatment. It is not medically necessary if everything feels fine — but if the wait to 12 weeks feels unbearable, it is a perfectly valid reason to book one." },
];

const Scans = () => (
  <section id="scan" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel tone="terracotta">Scans & reassurance at 7 weeks</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        The week a heartbeat is almost always there to see.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        If a scan was inconclusive at 6 weeks, a follow-up at 7 weeks is usually the moment everything becomes
        clear. For most pregnancies a strong, rapid heartbeat is now visible — and that single image often
        carries people through the fortnight ahead.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {scanPoints.map(({ Icon, title, body }) => (
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
        <span className="font-semibold">Wanting reassurance is not weakness.</span>{" "}
        The first trimester is a long, quiet wait. If a private scan would help you breathe, that's a valid
        reason in itself — there's no medal for white-knuckling through.
      </p>
    </div>
  </section>
);

/* 6. BODY */
const bodyNotes = [
  { Icon: Soup, title: "Nausea at full intensity", body: "Often at its worst between weeks 7 and 10. Can be all-day, not just morning. Some people are nauseous, some vomit, some can't bear smells, some can't bear an empty stomach. All-day grazing is usually more help than three meals." },
  { Icon: Moon, title: "A new kind of tired", body: "Many people describe week 7 fatigue as the most extreme tiredness of their lives — falling asleep on the sofa at 8pm, struggling to function past mid-afternoon. Your body is finishing the placenta this fortnight. That's the work behind the exhaustion." },
  { Icon: Heart, title: "Fuller, heavier, sore breasts", body: "Often noticeably bigger by week 7. Veins more visible, nipples darker, areolas wider. Even a soft bra can hurt. This usually peaks in the first trimester and eases as you move into the second." },
];

const Body = () => (
  <section id="body" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="max-w-2xl mb-10">
        <SectionLabel tone="terracotta">Your body this week</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
          The week your body stops asking nicely.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
          hCG, oestrogen and progesterone are all climbing steeply. For many people, week 7 is when symptoms
          stop feeling like 'something is happening' and start feeling like a daily condition. For others,
          it's still very quiet — and that is also normal.
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
    Icon: Soup, name: "All-day nausea, often peaking now",
    feels: "A constant low-grade queasiness with sharp waves. Often worst on an empty stomach but sometimes worst right after eating. Mornings are not always the worst part of the day.",
    why: "hCG and oestrogen are at their highest rate of climb. Your gut is also slowed by progesterone, so food sits longer than usual. Why some people get it badly and others not at all is genuinely not yet understood.",
    normal: "Affects up to 80% of pregnancies and tends to peak between weeks 8 and 10. If you cannot keep fluids down, are losing weight, or feel dizzy and unwell, this may be hyperemesis gravidarum (HG) — please don't try to push through. Your GP can prescribe safe medications.",
  },
  {
    Icon: Coffee, name: "Smell sensitivity & food aversions",
    feels: "Sudden hatred of foods you used to love. Strong, almost violent reactions to fridges, bins, perfume, toothpaste, coffee, cooking meat, your partner's deodorant. Brushing your teeth can trigger gagging.",
    why: "Hormonal changes alter your sense of smell and taste — likely an ancient protective mechanism in early pregnancy when the embryo is most vulnerable to anything toxic.",
    normal: "Almost universal at week 7. Eat what you can stomach, even if it is a beige toast-and-crackers diet for a few weeks. Your prenatal vitamin covers the gaps. Cold food smells less, which often helps.",
  },
  {
    Icon: Moon, name: "Bone-deep, chemical-feeling fatigue",
    feels: "Asleep on the sofa at 8pm. Hard to function past mid-afternoon. Brain fog. The kind of tired where standing up feels expensive. It feels chemical, not physical.",
    why: "Progesterone is sedating, your blood volume and metabolic rate are climbing, and your body is finishing building a placenta — the most expensive organ it ever makes.",
    normal: "Almost universal in the first trimester and often at its very worst around weeks 7–10. Sleep when you can. Eat little and often. Drop the optional things. This usually lifts in the second trimester.",
  },
  {
    Icon: Heart, name: "Sore, heavier, veiny breasts",
    feels: "Heavy, tender, sometimes burning or tingly. Nipples darker and wider. Veins more visible. Painful even brushing against fabric or in the shower.",
    why: "Oestrogen and progesterone are preparing the milk-making tissue, and blood flow to the breasts has increased dramatically.",
    normal: "Very common from week 5 onwards and often most intense at week 7–10. A soft, supportive bralette (often a size up) usually helps more than anything else.",
  },
  {
    Icon: HeartPulse, name: "Mild cramping, pulling or twinges",
    feels: "A dull achy feeling low in the pelvis, sometimes one-sided, often very like period cramps. Sometimes sharp, brief twinges. Can wake you at night.",
    why: "Your uterus is now roughly the size of a lemon and is beginning to stretch the round ligaments that hold it in place. Increased blood flow also adds pressure.",
    normal: "Common and usually reassuring. Sharp, persistent one-sided pain — especially with shoulder-tip pain, dizziness or feeling faint — needs urgent assessment to rule out ectopic pregnancy.",
  },
  {
    Icon: Wind, name: "Bloating, wind & constipation",
    feels: "Trousers tighter at the waist already (long before any actual bump). A fuller-stomach feeling. More burping or wind. Going to the loo less often, or having to strain.",
    why: "Progesterone slows your digestive tract significantly so food and waste move more slowly. This is also why bloating can feel uncomfortable by week 7.",
    normal: "Very common in early pregnancy. Drinking water, gentle walks, fibre where you can stomach it, and smaller meals tend to help more than cutting out specific foods.",
  },
  {
    Icon: Eye, name: "Dizziness or light-headedness",
    feels: "A wave of feeling faint when standing up too quickly, in a hot shower, or after going too long without eating. Sometimes a need to sit down suddenly.",
    why: "Your blood vessels are dilating to make room for a 50% rise in blood volume over pregnancy. Blood pressure can dip slightly in the first trimester. Low blood sugar from nausea makes it worse.",
    normal: "Common, especially with nausea. Stand up slowly, eat small frequent snacks, sip water through the day. Persistent dizziness, fainting or palpitations should be checked by your GP.",
  },
  {
    Icon: Brain, name: "Anxiety, intrusive worry, scan-checking",
    feels: "Symptom-checking the moment you wake. Googling 'symptoms gone at 7 weeks' even though you know the answer. Imagining the worst at 3am. Feeling unable to settle even when nothing is wrong.",
    why: "Early pregnancy is a long, quiet wait with very little external information. Your brain looks for control by checking and rechecking. Hormonal shifts also genuinely amplify anxiety in this trimester.",
    normal: "Extremely common. Talking to one trusted person, reducing time in pregnancy forums, and naming the worry out loud all help. If anxiety is intrusive or stopping you functioning, please mention it to your GP or midwife — perinatal mental health support can start now.",
  },
];

const Symptoms = () => (
  <section id="symptoms" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel>Common symptoms</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        What's likely to show up at week 7 — and what each one really means.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        Symptoms are unpredictable and personal. Some people feel almost everything on this list at once.
        Others feel surprisingly little. Symptoms — and their absence — are not a measure of how the pregnancy
        is going.
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
  "Symptom-checking the moment you wake — and feeling unsettled if you suddenly feel okay.",
  "Googling 'symptoms gone at 7 weeks' even though you know the answer is mostly 'normal'.",
  "Counting down the days to the dating scan as if they will go faster if you watch them.",
  "Wanting a private scan, just for proof, and feeling slightly foolish for needing one.",
  "Being a bit short with people who don't know — and then feeling guilty afterwards.",
  "Carrying queasy, exhausted, scared and excited all at once through ordinary daily life.",
  "Feeling protective of a body you suddenly cannot push around the way you used to.",
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
            Hyper-aware, exhausted and quietly afraid.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/80 leading-[1.8] mb-4">
            Week 7 is often the emotional low point of the first trimester. The pregnancy is real but invisible,
            symptoms are loud but private, and the dating scan still feels far away. Many people describe a
            steady, low-level dread alongside the excitement.
          </p>
          <p className="font-sans text-[14px] text-foreground/70 leading-[1.75]">
            None of that is a failure of love. It is love arriving early, before the world has caught up. Be
            very, very gentle with yourself this week.
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
  { Icon: Soup, title: "Eat tiny, often, and whatever stays down", note: "An empty stomach makes nausea worse. A plain biscuit before sitting up, then small snacks every couple of hours: toast, crackers, plain pasta, fruit, ice lollies, cold beige food. Cold tends to smell less. Surviving the day comes first; balanced nutrition catches up later." },
  { Icon: Moon, title: "Treat fatigue as a symptom, not a character flaw", note: "Pregnancy tiredness at week 7 is not laziness — your body is finishing a placenta and adding cells to a brain at extraordinary speed. Move bedtime earlier. Nap if you can. Drop the optional things this fortnight. The first trimester is often the most tiring of the whole pregnancy." },
  { Icon: Sprout, title: "Keep the basics ticking over", note: "400 micrograms of folic acid daily until 12 weeks (5 mg if your GP advised the higher dose), 10 micrograms of vitamin D daily through pregnancy. A single pregnancy multivitamin covers most of this. Take it at night with a snack if it makes you queasy in the morning." },
  { Icon: Phone, title: "Self-refer to your midwife if you haven't already", note: "In most parts of the UK you can self-refer online — search 'self refer midwife' plus your area. Booking-in usually happens at 8–10 weeks, so getting the form in this week is good timing. You don't need to wait for a GP appointment." },
  { Icon: Coffee, title: "Lower the bar on food rules — don't perfect them", note: "Caffeine under 200 mg a day (about two mugs of tea or one strong coffee). No alcohol. Skip pâté, soft mould-ripened cheeses, undercooked meat and fish high in mercury. Cooked, washed, fresh — that's the rule of thumb. If all you can eat is toast for a fortnight, that is not a failure." },
  { Icon: Heart, title: "Tell one person, even if you're not telling the world", note: "Carrying queasy, exhausted, scared and excited alone is a lot. One trusted person — partner, parent, friend, sibling — who can know, ask, and hold the worry with you, makes a real difference. You don't owe a wider announcement until you're ready." },
];

const Focus = () => (
  <section id="focus" className="bg-sage-bg/35 py-16 md:py-24 border-y border-border/30">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <SectionLabel tone="terracotta">Focus this week</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.2rem] text-foreground leading-tight mb-4">
            Survival kit for the queasiest weeks.
          </h2>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8]">
            Week 7 doesn't ask for a plan. It asks for permission to be tired, to eat strangely, to lower
            standards, and to trust that this stage passes — usually by the start of the second trimester.
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
  "Vomiting that stops you keeping any fluids down (possible HG)",
  "Losing weight in the first trimester from sickness",
  "A high temperature with chills, especially with pelvic pain",
  "Burning, pain or blood when you wee (possible UTI)",
  "If anxiety is intrusive or stopping you functioning, please mention it",
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
            Trust what you're feeling. Phoning early is always allowed.
          </h3>
          <p className="font-sans text-[13.5px] text-foreground/70 leading-[1.75] mt-3">
            Your GP, NHS 111, your local Early Pregnancy Unit (EPU), or — once booked — your midwife are
            all good first calls. In an emergency dial 999 or go straight to A&E.
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
        Week 7 is the secret heaviest week. Real but invisible, loud but private, full of love and full of fear. You're not coping badly. You're carrying something extraordinary in ordinary clothes.
      </p>
      <Heart size={14} className="text-sage/60 mx-auto mt-5" />
    </div>
  </section>
);

/* 12. REFLECTION + ASK */
const reflectionPrompts = ["How my body feels today", "What I most need this week", "What I'm scared to say out loud", "A small kindness I could give myself"];
const askChips = ["Is it normal to feel this exhausted at 7 weeks?", "Should I see a heartbeat on a 7 week scan?", "How bad does sickness need to be to get help?", "Why has my anxiety gotten worse this week?", "Is light spotting at 7 weeks okay?"];

const ReflectionAsk = () => (
  <PublicWeekReflectionAsk
    week={7}
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
            The queasiest, most secret weeks deserve to be remembered too.
          </h3>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8] mb-6">
            What you ate when you couldn't face anything else. The smell that turned your stomach. The night
            you cried for no reason. The first scan, the first heartbeat. The journal holds the small,
            ordinary, invisible parts of becoming a parent.
          </p>
          <ul className="space-y-2.5 mb-7">
            {[
              "A page for the first scan",
              "Letters to your baby through the first trimester",
              "Guided pages through every week, all the way to birth",
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
    title: "Nausea in early pregnancy — what helps",
    desc: "Why sickness peaks at weeks 7–10, what genuinely eases it, and the line where it becomes hyperemesis." },
  { slug: "fatigue-in-early-pregnancy", img: fatigueImg, tag: "Body",
    title: "Why early pregnancy is so exhausting",
    desc: "The biology behind first-trimester tiredness, and small things that genuinely help in week 7." },
  { slug: "when-you-cant-face-food-in-pregnancy", img: foodAversionsImg, tag: "Food",
    title: "Food aversions, weird cravings & smell sensitivity",
    desc: "Why your favourite foods may suddenly turn your stomach — and what to eat when nothing appeals." },
  { slug: "tests-and-scans-in-pregnancy", img: testsScansImg, tag: "Care",
    title: "Early scans: what they show and don't",
    desc: "What a 7-week scan can reveal, why a heartbeat now is so reassuring, and how the EPU works." },
  { slug: "the-first-trimester-emotionally", img: emotionalImg, tag: "Emotions",
    title: "The quiet anxiety of the first trimester",
    desc: "Why week 7 often feels like the emotional low point — and small things that help carry the weight." },
  { slug: "symptoms-stopping-early-pregnancy", img: symptomsStoppingImg, tag: "Reassurance",
    title: "When pregnancy symptoms suddenly stop",
    desc: "Why symptoms ebb and flow at 7–10 weeks, what's normal, and when to seek reassurance." },
];

const Related = () => (
  <section id="guidance" className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div className="max-w-xl">
          <SectionLabel>Read next, because of week 7</SectionLabel>
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
  { q: "Is it normal to feel this exhausted at 7 weeks?",
    a: "Yes. Week 7 fatigue is often the most extreme tiredness people have ever felt — falling asleep on the sofa at 8pm, struggling to function past mid-afternoon, brain fog and a chemical kind of exhaustion. Your body is finishing the placenta this fortnight and progesterone is at peak sedating effect. Your blood volume and metabolic rate are also climbing. This usually peaks between weeks 7 and 10 and lifts noticeably in the second trimester. Sleep when you can, eat little and often, and drop the optional things." },
  { q: "Should a heartbeat be visible on a 7-week scan?",
    a: "Almost always, yes. By 7 weeks a transvaginal scan typically shows a clearly visible embryo measuring 8–11 mm crown-to-rump, with a strong rapid heartbeat of around 120–160 beats per minute. If a 7-week scan does not show a heartbeat or the embryo is measuring much smaller than expected, the standard next step is a follow-up scan in 1–2 weeks rather than an immediate diagnosis — because dating from your last period can be a few days out. Your sonographer or EPU will explain what the measurements mean for your specific scan." },
  { q: "How bad does sickness need to be before it's not normal?",
    a: "Pregnancy sickness is normal up to a point — most people have nausea, many vomit occasionally, and it tends to peak between 8 and 10 weeks. The line into hyperemesis gravidarum (HG) is when you can't keep fluids down, are losing weight, feel dizzy or dehydrated, or simply can't function. HG is a medical condition, not a tougher version of normal sickness, and it deserves treatment. Please don't wait or push through — your GP can prescribe safe medications and refer you to a specialist if needed." },
  { q: "Why has my anxiety suddenly got worse this week?",
    a: "Several things converge at week 7. Hormones are at their most rapid climb and genuinely amplify anxiety. The pregnancy is real but invisible, symptoms are private, and the dating scan still feels far away. You may also be acutely aware that miscarriage risk is highest in the first trimester, even if you also know it drops significantly after a heartbeat is seen. Talking to one trusted person, naming the worry out loud, reducing time in pregnancy forums, and gentle daily movement all help. If anxiety is intrusive or stopping you functioning, please mention it to your GP or midwife." },
  { q: "I had spotting at 7 weeks — should I worry?",
    a: "Light pink or brown spotting can happen in early pregnancy and is often not serious — hormonal shifts, a sensitive cervix, or light bleeding after sex can all cause small spots. Up to 1 in 4 people see some bleeding in early pregnancy and go on to have a healthy baby. However, bright red bleeding — especially with cramping, period-like pain or one-sided pain — should be assessed the same day. Call your GP, NHS 111, or your local Early Pregnancy Unit. They can usually offer a scan for reassurance." },
  { q: "Can I exercise at 7 weeks pregnant?",
    a: "Yes, and gentle movement often helps with nausea, fatigue and anxiety. If you were active before pregnancy, you can usually continue most activities — walking, swimming, prenatal yoga, low-impact strength work, gentle cycling, jogging at a comfortable pace. Avoid contact sports, anything with a real fall risk, hot yoga, and lying flat on your back for long periods later in pregnancy. The general rule is: be able to hold a conversation while moving. If you're new to exercise, week 7 is not the moment to start a high-intensity programme — start gently with walking and swimming." },
  { q: "What can I eat to help with nausea?",
    a: "Whatever stays down. The classic strategy is small, frequent snacks rather than big meals — an empty stomach makes nausea worse. Try a plain biscuit before sitting up in the morning, then nibble through the day on toast, crackers, plain pasta, fruit, ice lollies, ginger biscuits or ginger tea, mashed potato, cold cereal — whatever your body accepts. Cold food often smells less, which helps. Sip water in small amounts. If liquids won't stay down, please don't wait — call your GP. Your prenatal vitamin will cover the gaps for now." },
  { q: "When will the worst of this pass?",
    a: "For most people, nausea and fatigue peak between weeks 7 and 10 and ease noticeably as you move into the second trimester (around weeks 12–14). Energy often comes back first; smell sensitivity and aversions tend to fade gradually rather than overnight. About 10% of pregnancies have nausea that lasts longer or recurs in the third trimester. You are very, very likely to feel meaningfully better in 5–7 weeks. Until then: tiny meals, big rest, low standards, and trust that this stage is temporary." },
];

/* 16. NEXT */
const Next = () => (
  <section className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
      <div className="bg-gradient-to-br from-sage-bg via-parchment to-stage-pregnancy/30 rounded-3xl border border-border/30 p-8 sm:p-10 md:p-14 text-center shadow-card-brand">
        <SectionLabel>Up next</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.5rem] text-foreground leading-tight mb-3">
          Ready for week 8?
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 max-w-lg mx-auto mb-8 leading-[1.8]">
          Next week the embryo's tail disappears, fingers and toes start to differentiate, and you usually have your booking-in appointment with the midwife.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
          <Link to="/pregnancy/week/8"
            className="inline-flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium shadow-cta hover:bg-terracotta-hover transition-colors">
            Continue to week 8 <ArrowRight size={14} />
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

const Week7Page = () => (
  <div className="min-h-screen bg-parchment">
    <PregnancyWeekSeo weekNumber={7} />
    <Navbar />
    <Hero />
    <MetaBar />
    <AtAGlance />
    <Biology />
    <Scans />
    <Body />
    <Symptoms />
    <Emotional />
    <Focus />
    <SeekSupport />
    <Quote />
    <ReflectionAsk />
    <Journal />
    <Related />
    <WeekCommonQuestions week={7} questions={buildWeekQuestions(7, faqs)} />
    <WeekSources week={7} sources={getWeekSources(7)} />
    <Next />
    <Footer />
  </div>
);

export default Week7Page;
