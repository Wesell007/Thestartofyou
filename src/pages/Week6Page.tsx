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
  Phone,
  Wind,
  Scan,
  Soup,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PregnancyWeekSeo from "@/components/seo/PregnancyWeekSeo";
import PublicWeekReflectionAsk from "@/components/pregnancy/PublicWeekReflectionAsk";
import embryoImg from "@/assets/week6-embryo.jpg";
import sweetpeaImg from "@/assets/week6-sweetpea.jpg";
import biologyImg from "@/assets/week6-biology-detail.jpg";
import journalImg from "@/assets/journal-flatlay.jpg";
import botanicalTr from "@/assets/botanical-branch-tr.png";
import botanicalBl from "@/assets/botanical-branch-bl.png";
import botanicalAccent from "@/assets/article-botanical-accent.png";
import nauseaImg from "@/assets/article-hero-nausea.jpg";
import fatigueImg from "@/assets/article-hero-fatigue.jpg";
import foodAversionsImg from "@/assets/article-hero-food-aversions.jpg";
import emotionalImg from "@/assets/article-hero-emotional-first-tri.jpg";
import testsScansImg from "@/assets/article-hero-tests-scans.jpg";
import implantationBleedImg from "@/assets/article-hero-implantation-bleeding.jpg";
import symptomsStoppingImg from "@/assets/article-hero-symptoms-stopping.jpg";
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
  { label: "First trimester", href: "/pregnancy/first-trimester" },
  { label: "Week 6", href: "/pregnancy/week/6" },
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
          First trimester · The week of the first heartbeat
        </p>
        <h1 className="font-serif text-[2.5rem] sm:text-5xl md:text-[3.75rem] lg:text-[4.25rem] text-foreground leading-[1.04] tracking-tight mb-4 md:mb-5">
          6 Weeks Pregnant
        </h1>
        <p className="font-serif italic text-[1.05rem] sm:text-lg md:text-xl text-foreground/75 max-w-xl mx-auto leading-relaxed">
          Your baby is the size of a sweet pea — and the very first heartbeat is starting to flicker. On the outside, symptoms often step up a gear and the pregnancy can suddenly feel very real.
        </p>
      </div>

      <Link to="/pregnancy/week/5" aria-label="Go to week 5"
        className="absolute left-3 sm:left-6 md:left-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronLeft size={18} />
      </Link>
      <Link to="/pregnancy/week/7" aria-label="Go to week 7"
        className="absolute right-3 sm:right-6 md:right-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronRight size={18} />
      </Link>
    </div>

    <div className="relative -mt-28 sm:-mt-36 md:-mt-40 mb-6">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex items-end justify-center gap-5 sm:gap-10 md:gap-14">
          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-card border-[3px] border-sage/15 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={sweetpeaImg} alt="A sweet pea pod" loading="lazy" width={512} height={512}
                className="w-full h-full object-cover" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.04]" />
            </div>
            <div className="text-center">
              <p className="font-serif italic text-[12.5px] text-foreground/80 leading-tight">sweet pea</p>
              <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/55 mt-1">~5&nbsp;mm</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full bg-card border-[4px] border-terracotta/30 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={embryoImg}
                alt="Soft editorial illustration of a 6-week embryo: a curled C-shaped form with large dark eye spots, paddle-like limb buds and a visible heart bulge, suspended in the gestational sac"
                width={1024} height={1024}
                loading="eager" decoding="async"
                className="w-full h-full object-cover scale-[1.02]" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.05]" />
            </div>
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.22em] uppercase text-foreground/65">Your baby this week</p>
          </div>

          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-stage-pregnancy/70 to-stage-pregnancy/30 border-[3px] border-terracotta/25 flex items-center justify-center shadow-elevated">
              <span className="font-serif text-[1.7rem] sm:text-[1.95rem] text-foreground tracking-tight leading-none">34</span>
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
  { id: "biology", label: "Baby's first heartbeat", Icon: Sprout },
  { id: "scan", label: "Early scans", Icon: Scan },
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
              Updated for 2026 · 12 min read · Symptoms ramp-up week
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
  { label: "Stage", value: "Early first trimester" },
  { label: "Baby size", value: "~5 mm — sweet pea" },
  { label: "Baby form", value: "Curved embryo with first heartbeat" },
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
          The week pregnancy often starts to feel real.
        </h2>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8] mb-4">
          Inside, your embryo is around 5 mm long — a curled, comma-shaped form with large dark eye spots,
          tiny paddle-like limb buds, and a heart that has just started to beat. On a transvaginal scan,
          a faint flicker may be visible from around 6 weeks.
        </p>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8]">
          Outside, symptoms often step up a gear. Nausea, fatigue, breast tenderness and smell sensitivity
          can suddenly intensify. Many people describe week 6 as the week the pregnancy stopped feeling
          like a piece of news and started feeling like a thing happening in their body.
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
  { title: "The first heartbeat", body: "The heart tube has folded into a primitive looped chamber and is starting to beat — around 100–110 times a minute by the end of week 6, faster than yours. From 6 weeks a flicker may be visible on a transvaginal scan, though it isn't always seen yet." },
  { title: "A face beginning, just barely", body: "The largest features so far are two big dark eye spots on either side of the head. There's no real face yet — only the suggestion of where the eyes, nose and ears will form. The head looks disproportionately huge compared to the body." },
  { title: "Limb buds appearing", body: "Tiny paddles are starting to push out where arms and legs will eventually grow. They look more like small flippers than limbs at this stage. Fingers and toes are still weeks away." },
  { title: "Neural tube closing", body: "The brain and spinal cord are forming as the neural tube closes along the back. This is exactly why folic acid matters so much in these first weeks — and why most national guidance recommends taking it from before conception until at least 12 weeks." },
];

const Biology = () => (
  <section id="biology" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="relative rounded-3xl overflow-hidden border border-border/40 shadow-card-brand">
            <div className="aspect-[4/5]">
              <img src={biologyImg} alt="Soft editorial close-up of a 6-week embryo: curled C-shape, large dark eye spots, paddle-shaped limb buds, prominent heart bulge with a soft warm glow, suspended in the gestational sac with a small yolk sac visible"
                loading="lazy" width={1024} height={1280}
                className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-foreground/60 to-transparent">
              <p className="font-serif italic text-[13px] text-background/95 leading-snug">
                Five millimetres. A heart already beating. A whole architecture beginning.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <SectionLabel>What's underway biologically</SectionLabel>
          <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-5">
            A flicker on a screen, faster than your own pulse.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8] mb-8 max-w-2xl">
            Week 6 is the week the heart starts. Not a fully chambered heart yet — that takes a few more
            weeks — but a primitive tube already pulsing its way into being. Around it, the rest of the
            architecture is being laid down: a brain and spinal cord, the very first features of a face,
            tiny paddles where arms and legs will grow.
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

/* 5. EARLY SCAN — Week 6 unique section */
const scanPoints = [
  { Icon: Scan, title: "What an early scan can show at 6 weeks", body: "On a transvaginal scan from around 6 weeks, the gestational sac is usually clearly visible inside the uterus, often with a small yolk sac inside it. A tiny embryo and a flickering heartbeat may be seen — but it is genuinely a coin-toss whether they're visible at exactly 6 weeks. By 7 weeks they almost always are." },
  { Icon: HeartPulse, title: "Why the heartbeat may not be seen yet", body: "Pregnancy dating from your last period is approximate. If you ovulated a few days later than the standard textbook day, your 'six-week scan' may biologically be more like 5+3. A repeat scan in 1–2 weeks is the usual next step — and that is much more often reassuring than not." },
  { Icon: AlertTriangle, title: "When an early scan is offered on the NHS", body: "Routine NHS dating scans are at 11–14 weeks. Early scans are usually offered if you have bleeding, severe pain, previous miscarriage, ectopic pregnancy or fertility treatment. Your GP or midwife can refer you to the local Early Pregnancy Unit (EPU)." },
  { Icon: Sparkles, title: "Private reassurance scans", body: "Many people choose to pay privately for an early reassurance scan around 7–9 weeks, especially after loss. There is no medical need if everything feels fine — but if it would help you breathe, that's a valid reason in itself." },
];

const EarlyScan = () => (
  <section id="scan" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel tone="terracotta">Early scans at 6 weeks</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        The first time you might see (or hear) a heartbeat.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        For most pregnancies, the first scan is the routine 11–14 week dating scan. But week 6 is the
        earliest a heartbeat can sometimes be detected — and a scan now can be offered or chosen for
        specific reasons.
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
        <span className="font-semibold">Not seeing a heartbeat at exactly 6 weeks is not a diagnosis.</span>{" "}
        Dating is rarely precise to the day. A follow-up scan in 1–2 weeks is the usual next step, and
        for most people that scan brings the reassurance the first one couldn't yet give.
      </p>
    </div>
  </section>
);

/* 6. BODY */
const bodyNotes = [
  { Icon: Soup, title: "Nausea ramping up", body: "Often arrives or worsens around 6 weeks. Can be all-day rather than just morning. Some people get a heavy queasy feeling, others actively vomit. Smell sensitivity often comes with it — fridges, perfume, coffee, cooking meat." },
  { Icon: Moon, title: "Bone-deep tiredness", body: "Many people describe a kind of fatigue they have never felt before — the kind that knocks you out at 8pm and makes mornings feel impossible. Your body is building a placenta and your blood volume is rising. Rest is medicine." },
  { Icon: Heart, title: "Sore, fuller, veiny breasts", body: "Often tender to even gentle touch. Bras feel uncomfortable. Nipples may darken slightly. Veins more visible. This is one of the most universal early-pregnancy signs and tends to peak in the first trimester." },
];

const Body = () => (
  <section id="body" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="max-w-2xl mb-10">
        <SectionLabel tone="terracotta">Your body this week</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
          The week your body stops being subtle.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
          Hormones — especially hCG and progesterone — are climbing fast. For many people, this is the
          week the symptoms become hard to ignore. For others, it's still very quiet. Both are normal,
          and neither tells you how the pregnancy is going.
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
    Icon: Soup, name: "Nausea, with or without vomiting",
    feels: "A heavy queasy wave that comes and goes — or stays. Often worst on an empty stomach, but sometimes worst right after eating. Not always in the morning.",
    why: "Driven by rising hCG and oestrogen, plus a slowing-down of your gut. Nobody fully understands why some people get it badly and others not at all.",
    normal: "Affects up to 80% of pregnancies and usually peaks around 8–10 weeks. If you can't keep fluids down, are losing weight, or feel dizzy and unwell, this may be hyperemesis gravidarum (HG). Please don't try to push through — your GP can help and there are safe medications.",
  },
  {
    Icon: Coffee, name: "Smell sensitivity & food aversions",
    feels: "Suddenly hating foods you used to love. Strong reactions to fridge smells, cooking meat, perfume, coffee, bins, even toothpaste.",
    why: "Hormonal changes alter your sense of smell and taste — likely an ancient protective mechanism in early pregnancy.",
    normal: "Universal. Eat what you can stomach, even if it's a beige toast-and-crackers diet for a few weeks. The full nutrition catches up later. Your prenatal vitamin covers the gaps.",
  },
  {
    Icon: Moon, name: "Crushing fatigue",
    feels: "Asleep at 8pm. Hard to function past mid-afternoon. Brain fog, no motivation, an exhaustion that feels chemical rather than physical.",
    why: "Progesterone is sedating, your blood volume and metabolic rate are rising, and your body is building a placenta — the most expensive organ it ever makes.",
    normal: "Almost universal in the first trimester and often worst at week 6–10. Sleep when you can. Eat little and often. Drop the things you can drop. This usually lifts in the second trimester.",
  },
  {
    Icon: Heart, name: "Sore, swollen breasts",
    feels: "Heavy, tender, sometimes tingly or burning. Nipples darker, veins more visible, often painful even brushing against fabric.",
    why: "Oestrogen and progesterone are preparing the milk-making tissue, and blood flow has increased dramatically.",
    normal: "Very common from week 5 onwards and often most intense in the first trimester. A soft, supportive bra often helps more than anything else.",
  },
  {
    Icon: HeartPulse, name: "Mild cramping or pulling",
    feels: "A dull achy feeling low in the pelvis, sometimes one-sided, often very like period cramps.",
    why: "Your uterus is growing and the embryo is settled in the lining. Round ligaments are starting to soften.",
    normal: "Common and reassuring. Sharp, persistent one-sided pain — especially with shoulder-tip pain or feeling faint — needs urgent assessment to rule out ectopic pregnancy.",
  },
  {
    Icon: Wind, name: "Bloating & wind",
    feels: "Trousers tighter at the waist already (long before any actual bump), a fuller-stomach feeling, more burping or wind than usual.",
    why: "Progesterone slows down your digestive tract, leading to slower transit and more gas.",
    normal: "Very common in early pregnancy. Drinking water, gentle walks and smaller meals tend to help more than cutting out specific foods.",
  },
];

const Symptoms = () => (
  <section id="symptoms" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel>Common symptoms</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        What's likely to show up at week 6 — and what each one really means.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        Symptoms are unpredictable and personal. Some people feel almost everything on this list. Others
        feel almost nothing. Symptoms — and their absence — are not a measure of how the pregnancy is
        going.
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
  "Symptom-checking the moment you wake up — and being unsettled if there's nothing to find.",
  "Googling 'symptoms gone at 6 weeks' even though you know the answer is mostly 'normal'.",
  "Feeling more genuinely pregnant than you did a week ago — and more genuinely scared.",
  "Wanting an early scan, just to see for yourself, and feeling foolish for needing one.",
  "Joy and dread arriving in the same breath, especially in quiet moments.",
  "Holding the secret while exhausted and queasy through normal life.",
  "Tender protectiveness over a body you suddenly cannot push around the way you used to.",
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
            Real, hopeful, hyper-aware — sometimes all at once.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/80 leading-[1.8] mb-4">
            Week 6 is often the week the pregnancy starts feeling like it's actually happening — and that
            new realness brings a new layer of fear. The 'what if I lose it' weight is heaviest in this
            stretch.
          </p>
          <p className="font-sans text-[14px] text-foreground/70 leading-[1.75]">
            None of that is a failure of love. It is love arriving early, before the world has caught up.
            Be very, very gentle with yourself this week.
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
  { Icon: Soup, title: "Eat tiny, often, and whatever stays down", note: "An empty stomach makes nausea worse. A plain biscuit before sitting up, then small snacks every couple of hours: toast, crackers, plain pasta, fruit, ice lollies, cold beige food. Nutrition catches up later — surviving the day comes first." },
  { Icon: Moon, title: "Take rest seriously", note: "Pregnancy fatigue at 6 weeks is not laziness — it is your body building an organ from scratch. Drop the optional things this fortnight. Earlier bedtimes. Naps if you can. The first trimester is often the most tiring of the whole pregnancy." },
  { Icon: Sprout, title: "Keep taking folic acid (and vitamin D)", note: "400 micrograms of folic acid daily until 12 weeks (5 mg if your GP advised the higher dose). 10 micrograms of vitamin D daily through the whole pregnancy. A single antenatal multivitamin covers most of this in one tablet." },
  { Icon: Phone, title: "Self-refer to your midwife if you haven't already", note: "In most parts of the UK you can self-refer online — search 'self refer midwife' plus your area. Booking-in usually happens at 8–10 weeks. You don't need to wait for a GP appointment." },
  { Icon: Coffee, title: "Lower the load — don't perfect it", note: "Caffeine under 200 mg a day (about two mugs of tea or one strong coffee). No alcohol. Skip pâté, soft mould-ripened cheeses, undercooked meat and fish high in mercury. Cooked, washed, fresh — that's the rule of thumb." },
  { Icon: Heart, title: "Tell one person, if you can", note: "Carrying queasy, exhausted, scared and excited all alone is a lot. One trusted person — partner, parent, friend, sibling — who can know, ask, hold the worry with you, makes a real difference. You don't owe a wider announcement until you're ready." },
];

const Focus = () => (
  <section id="focus" className="bg-sage-bg/35 py-16 md:py-24 border-y border-border/30">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <SectionLabel tone="terracotta">Focus this week</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.2rem] text-foreground leading-tight mb-4">
            Survival kit for the queasy weeks.
          </h2>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8]">
            Week 6 doesn't ask for a plan. It asks for permission to be tired, to eat strangely, to lower
            standards, and to trust that this stage passes.
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
  "If your symptoms suddenly stop and you feel worried — your EPU can scan to reassure",
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
        It's allowed to feel both more pregnant and more afraid this week. The two arrive together because they're made of the same thing — caring about something you can't yet see.
      </p>
      <Heart size={14} className="text-sage/60 mx-auto mt-5" />
    </div>
  </section>
);

/* 12. REFLECTION + ASK */
const reflectionPrompts = ["How my body feels today", "What I most need this week", "What I'm scared to admit", "A small kindness I could give myself"];
const askChips = ["Is it normal to have no symptoms at 6 weeks?", "When can I have an early scan?", "How bad is too bad with sickness?", "Is light spotting at 6 weeks okay?", "What does the heartbeat look like on a scan?"];

const ReflectionAsk = () => (
  <PublicWeekReflectionAsk
    week={6}
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
            The queasy, tender, terrified weeks deserve to be remembered too.
          </h3>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8] mb-6">
            What you ate when you couldn't face anything else. Who you finally told. The first scan, the
            first heartbeat, the first night you cried with relief. The journal holds the small, ordinary
            parts of becoming a parent.
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
    desc: "Why sickness ramps up at 6 weeks, what genuinely eases it, and the line where it becomes hyperemesis." },
  { slug: "fatigue-in-early-pregnancy", img: fatigueImg, tag: "Body",
    title: "Why early pregnancy is so exhausting",
    desc: "The biology behind first-trimester tiredness, and small things that genuinely help in week 6." },
  { slug: "when-you-cant-face-food-in-pregnancy", img: foodAversionsImg, tag: "Food",
    title: "Food aversions, weird cravings & smell sensitivity",
    desc: "Why your favourite foods may suddenly turn your stomach — and what to eat when nothing appeals." },
  { slug: "tests-and-scans-in-pregnancy", img: testsScansImg, tag: "Care",
    title: "Early scans: what they show and don't",
    desc: "When an early scan is offered, what to expect, and why not seeing a heartbeat at 6 weeks isn't a diagnosis." },
  { slug: "implantation-bleeding", img: implantationBleedImg, tag: "Spotting",
    title: "Spotting in early pregnancy",
    desc: "When light bleeding can be normal, when it needs to be checked, and how the EPU works." },
  { slug: "symptoms-stopping-early-pregnancy", img: symptomsStoppingImg, tag: "Reassurance",
    title: "When pregnancy symptoms suddenly stop",
    desc: "Why symptoms can ebb and flow at 6–10 weeks, what's normal, and when to seek reassurance." },
];

const Related = () => (
  <section id="guidance" className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div className="max-w-xl">
          <SectionLabel>Read next, because of week 6</SectionLabel>
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
  { q: "Should the heartbeat be visible at 6 weeks?",
    a: "Sometimes yes, sometimes not yet. On a transvaginal scan from around 6 weeks, the gestational sac and yolk sac are usually clearly visible, and a tiny embryo with a flickering heartbeat may be seen — but it is genuinely a coin-toss whether they're visible at exactly 6 weeks. Pregnancy dating from your last period can be a few days out, especially if you ovulated later than the textbook day. By 7 weeks a heartbeat is almost always seen. Not seeing one at exactly 6 weeks is not a diagnosis — a follow-up scan in 1–2 weeks is the usual next step." },
  { q: "Is it normal to have no symptoms at 6 weeks?",
    a: "Yes. Symptoms vary enormously and many people have very few signs at week 6 even in completely healthy pregnancies. Symptoms — and their absence — are not a reliable measure of how the pregnancy is going. Hormone levels rise at very different rates in different people. If symptoms appear, then suddenly disappear, especially with bleeding or pain, that's worth a call to your GP or EPU for reassurance. But quiet, stable, low-symptom weeks are common and reassuring in their own way." },
  { q: "How bad does sickness need to be before it's not normal?",
    a: "Pregnancy sickness is normal up to a point — most people have nausea, many vomit occasionally, and it tends to peak between 8 and 10 weeks. The line into hyperemesis gravidarum (HG) is when you can't keep fluids down, are losing weight, feel dizzy or dehydrated, or simply can't function. HG is a medical condition, not a tougher version of normal sickness, and it deserves treatment. Please don't wait or try to push through — your GP can prescribe safe medications and refer you to a specialist if needed." },
  { q: "I had spotting at 6 weeks — should I worry?",
    a: "Light pink or brown spotting can happen in early pregnancy and is often nothing serious — implantation can sometimes still cause a little discharge, or hormonal shifts and a sensitive cervix can lead to small spots, especially after sex. Up to 1 in 4 people see some bleeding in early pregnancy and go on to have a healthy baby. However, bright red bleeding — especially with cramping, period-like pain, or one-sided pain — should be checked the same day. Call your GP, NHS 111, or your local EPU." },
  { q: "Should I get an early scan?",
    a: "Routine NHS dating scans are between 11 and 14 weeks. Early scans are usually offered if you've had bleeding, severe pain, previous miscarriage, ectopic pregnancy or fertility treatment — your GP or midwife can refer you to your local Early Pregnancy Unit. You can also pay privately for an early reassurance scan, usually from 7–9 weeks. There's no medical need for one if everything feels fine, but if it would help you breathe a little easier, that is a perfectly valid reason in itself." },
  { q: "My symptoms suddenly stopped — does that mean something's wrong?",
    a: "Symptoms can naturally come and go in early pregnancy, especially around weeks 6–10 when hormone levels are rising in waves rather than smoothly. A day or two of feeling 'okay again' is usually nothing to worry about. However, a clear and sustained loss of all symptoms, especially combined with bleeding or pain, is worth getting checked. Your local Early Pregnancy Unit (EPU) can usually offer a scan for reassurance — you can self-refer in many areas. You don't need to wait days in worry." },
  { q: "Can I exercise at 6 weeks pregnant?",
    a: "Yes, and gentle movement is good for you. If you were active before pregnancy, you can usually continue most activities — walking, swimming, yoga, low-impact strength work, gentle cycling, jogging at a comfortable pace. Avoid contact sports, anything with a real fall risk, hot yoga, and lying flat on your back for long periods later in pregnancy. The general rule is: be able to hold a conversation while moving. If you're new to exercise, week 6 is not the moment to start a high-intensity programme — start gently with walking and swimming." },
  { q: "What can I eat to help with nausea?",
    a: "Whatever stays down. The classic strategy is small, frequent snacks rather than big meals — an empty stomach makes nausea worse. Try a plain biscuit before sitting up in the morning, then nibble through the day on toast, crackers, plain pasta, fruit, ice lollies, ginger biscuits or ginger tea, mashed potato, cold cereal — whatever your body accepts. Cold food often smells less, which helps. Sip water in small amounts. If liquids won't stay down, please don't wait — call your GP. Your prenatal vitamin will cover the gaps in nutrition for now; the full balanced diet catches up later." },
];

/* 16. NEXT */
const Next = () => (
  <section className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
      <div className="bg-gradient-to-br from-sage-bg via-parchment to-stage-pregnancy/30 rounded-3xl border border-border/30 p-8 sm:p-10 md:p-14 text-center shadow-card-brand">
        <SectionLabel>Up next</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.5rem] text-foreground leading-tight mb-3">
          Ready for week 7?
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 max-w-lg mx-auto mb-8 leading-[1.8]">
          Next week the embryo doubles in size, the heart becomes more clearly detectable on a scan, and
          symptoms often climb a little further before they start to settle.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
          <Link to="/pregnancy/week/7"
            className="inline-flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium shadow-cta hover:bg-terracotta-hover transition-colors">
            Continue to week 7 <ArrowRight size={14} />
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

const Week6Page = () => (
  <div className="min-h-screen bg-parchment">
    <PregnancyWeekSeo weekNumber={6} />
    <Navbar />
    <Hero />
    <MetaBar />
    <AtAGlance />
    <Biology />
    <EarlyScan />
    <Body />
    <Symptoms />
    <Emotional />
    <Focus />
    <SeekSupport />
    <Quote />
    <ReflectionAsk />
    <Journal />
    <Related />
    <WeekCommonQuestions week={6} questions={buildWeekQuestions(6, faqs)} />
    <WeekSources week={6} sources={getWeekSources(6)} />
    <Next />
    <Footer />
  </div>
);

export default Week6Page;
