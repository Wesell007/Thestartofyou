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
  Wind,
  ShieldCheck,
  Stethoscope,
  Brain,
  Eye,
  Footprints,
  Hand,
  Baby,
  Briefcase,
  Phone,
  Clock,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PregnancyWeekSeo from "@/components/seo/PregnancyWeekSeo";
import PublicWeekReflectionAsk from "@/components/pregnancy/PublicWeekReflectionAsk";
import fetusImg from "@/assets/week41-fetus.jpg";
import pumpkinImg from "@/assets/week41-pumpkin.jpg";
import biologyImg from "@/assets/week41-biology-detail.jpg";
import journalImg from "@/assets/journal-flatlay.jpg";
import botanicalTr from "@/assets/botanical-branch-tr.png";
import botanicalBl from "@/assets/botanical-branch-bl.png";
import botanicalAccent from "@/assets/article-botanical-accent.png";
import thirdMovementImg from "@/assets/article-hero-third-movement.jpg";
import thirdEmotionalImg from "@/assets/article-hero-third-emotional.jpg";
import thirdHospitalBagImg from "@/assets/article-hero-third-hospital-bag.jpg";
import thirdSignsImg from "@/assets/article-hero-third-signs-of-labour.jpg";
import thirdSleepImg from "@/assets/article-hero-third-sleep.jpg";
import thirdNurseryImg from "@/assets/article-hero-third-nursery.jpg";
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
  { label: "Third trimester", href: "/pregnancy/third-trimester" },
  { label: "Week 41", href: "/pregnancy/week/41" },
];

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
    <div className="relative bg-gradient-to-br from-stage-pregnancy/55 via-parchment to-parchment-dark/40 pt-20 pb-36 sm:pt-24 sm:pb-44 md:pt-32 md:pb-52">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[820px] h-[420px] rounded-full bg-terracotta/10 blur-3xl" />
        <div className="absolute -top-10 right-1/4 w-[260px] h-[260px] rounded-full bg-sage-light/30 blur-3xl" />
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
          Third Trimester · Late term · Past your date
        </p>
        <h1 className="font-serif text-[2.5rem] sm:text-5xl md:text-[3.75rem] lg:text-[4.25rem] text-foreground leading-[1.04] tracking-tight mb-4 md:mb-5">
          41 Weeks Pregnant
        </h1>
        <p className="font-serif italic text-[1.05rem] sm:text-lg md:text-xl text-foreground/75 max-w-xl mx-auto leading-relaxed">
          Your baby is the size of a small pumpkin and you are now past your due date. The waiting is harder than the calendar suggested — and you are far from alone in being still here.
        </p>
      </div>

      <Link to="/pregnancy/week/40" aria-label="Go to week 40"
        className="absolute left-3 sm:left-6 md:left-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronLeft size={18} />
      </Link>
      <Link to="/pregnancy/week/42" aria-label="Go to week 42"
        className="absolute right-3 sm:right-6 md:right-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronRight size={18} />
      </Link>
    </div>

    <div className="relative -mt-28 sm:-mt-36 md:-mt-40 mb-6">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex items-end justify-center gap-5 sm:gap-10 md:gap-14">
          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-card border-[3px] border-sage/15 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={pumpkinImg} alt="Small pumpkin" loading="lazy" width={512} height={512}
                className="w-full h-full object-cover" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.04]" />
            </div>
            <div className="text-center">
              <p className="font-serif italic text-[12.5px] text-foreground/80 leading-tight">small pumpkin</p>
              <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/55 mt-1">~52&nbsp;cm</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full bg-card border-[4px] border-terracotta/25 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={fetusImg}
                alt="Soft editorial illustration of a post-dates 41-week fetus, fully mature and tightly engaged in the pelvis"
                width={1024} height={1024}
                loading="eager" decoding="async"
                className="w-full h-full object-cover scale-[1.02]" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.05]" />
            </div>
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.22em] uppercase text-foreground/65">Your baby this week</p>
          </div>

          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-stage-pregnancy/85 to-stage-pregnancy/40 border-[3px] border-terracotta/25 flex items-center justify-center shadow-elevated">
              <span className="font-serif text-[1.5rem] sm:text-[1.7rem] text-foreground tracking-tight leading-none">+1</span>
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-terracotta/10" />
            </div>
            <div className="text-center">
              <p className="font-serif italic text-[12.5px] text-foreground/80 leading-tight">past due</p>
              <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/55 mt-1">week</p>
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
  { id: "post-dates", label: "Past your date", Icon: Clock },
  { id: "monitoring", label: "Sweeps & monitoring", Icon: Stethoscope },
  { id: "induction", label: "Induction talk", Icon: ShieldCheck },
  { id: "body", label: "Body changes", Icon: Activity },
  { id: "symptoms", label: "Symptoms", Icon: HeartPulse },
  { id: "emotional", label: "Emotionally", Icon: Heart },
  { id: "focus", label: "Focus this week", Icon: Calendar },
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
              Updated for 2026 · 12 min read · Late term, past your date
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
  { label: "Stage", value: "Late term · 41+0 to 41+6" },
  { label: "Baby size", value: "~52 cm — small pumpkin" },
  { label: "Baby weight", value: "Around 3.6 kg" },
  { label: "How common", value: "~1 in 5 first pregnancies" },
];

const AtAGlance = () => (
  <section id="at-a-glance" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl mb-14 md:mb-20">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 relative bg-gradient-to-br from-stage-pregnancy/55 via-parchment to-parchment-dark/50 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-10 overflow-hidden shadow-card-brand">
        <img src={botanicalAccent} alt="" aria-hidden="true"
          className="absolute -left-3 bottom-0 w-28 opacity-35 pointer-events-none select-none" />
        <SectionLabel tone="terracotta">At a glance</SectionLabel>
        <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-5">
          Week 41 is the week the calendar finally feels wrong.
        </h2>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8] mb-4">
          You are now past your due date. Around 1 in 5 first-time pregnancies and 1 in 7 later
          pregnancies arrive at week 41. Your baby is fully mature, deeply engaged, and gathering
          a little more weight each day. Their nails may be longer, their skin a little drier or
          slightly peeling — small signs of being a 'few days over'.
        </p>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8]">
          For you, this is a different kind of week. Sweeps and induction conversations move to
          the centre. Monitoring may step up. The waiting is heavier — emotionally, physically and
          socially. None of that is a sign anything is wrong. It is the experience millions of
          parents share, and it deserves more than a shrug.
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
  { title: "Fully, finally mature", body: "Every system is complete. Your baby would breathe, feed, regulate temperature and digest milk from day one. Being 41 weeks doesn't mean 'overdone' — it means a fully-cooked baby, biding their time." },
  { title: "Still gathering weight", body: "Your baby may add another 30–40 grams a day this week. Many post-dates babies are noticeably bigger and chubbier than 39-week babies, with deeper creases at wrists and ankles." },
  { title: "Longer nails, drier skin", body: "Fingernails often reach past the fingertips and may need cutting in the first days. Vernix is mostly gone, so skin can look drier or peel a little — particularly on hands and feet — in the first week of life." },
  { title: "Placenta still doing its job", body: "Most placentas continue to work well past 40 weeks. Routine post-dates monitoring exists because, in a small minority of pregnancies, function quietly tapers — and your team wants to catch any change early. Most won't find one." },
];

const Biology = () => (
  <section id="biology" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="relative rounded-3xl overflow-hidden border border-border/40 shadow-card-brand">
            <div className="aspect-[4/5]">
              <img src={biologyImg} alt="Soft editorial illustration of a placenta at 41 weeks with subtle signs of post-maturity"
                loading="lazy" width={1024} height={1280}
                className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-foreground/60 to-transparent">
              <p className="font-serif italic text-[13px] text-background/95 leading-snug">
                Still working. Still feeding. Still keeping watch.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <SectionLabel>What's underway biologically</SectionLabel>
          <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-5">
            By 41 weeks, your baby is fully ready — and quietly, the placenta becomes the watch-point.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8] mb-8 max-w-2xl">
            There is no developmental work left to do. Every system is finished, every milestone
            passed. The reason post-dates pregnancies are watched a little more carefully isn't
            about your baby's growth — it's about making sure the placenta is still doing what it
            has done beautifully for nine months.
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

/* 5. POST-DATES — Week 41 unique */
const postDatesPoints = [
  { Icon: Clock, title: "Your due date is a midpoint", body: "It was always an estimate, calculated from a 280-day average. Only around 4% of babies actually arrive on their due date. Spontaneous labour anywhere from 37 to 42 weeks is normal. Being still here at 41 weeks is not a failure — yours or theirs." },
  { Icon: Sprout, title: "Why some babies take longer", body: "First-time pregnancies, longer cycles, and family pattern all play a part. Some bodies and babies simply ripen at a slightly different pace. There is rarely a reason — just a quieter timeline." },
  { Icon: ShieldCheck, title: "What changes after 40+0", body: "Routine antenatal care steps up gently: extra monitoring of baby's heart rate, sometimes a scan to check fluid and growth, conversations about sweeps, and from around 41 weeks, conversations about induction." },
  { Icon: Heart, title: "What stays exactly the same", body: "The need to feel any change in baby's movements straight away. The need to phone your unit if anything worries you. Your right to ask questions, take time, and make informed choices about every offer made to you." },
];

const PostDates = () => (
  <section id="post-dates" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel tone="terracotta">Past your date</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        You haven't run out of time. Your due date never owned you.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        Going past your due date is a recognised and well-supported part of pregnancy care.
        Knowing the language — and the gentleness baked into it — makes the wait feel less
        like a problem and more like a chapter.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {postDatesPoints.map(({ Icon, title, body }) => (
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
  </section>
);

/* 6. MONITORING & SWEEPS — Week 41 unique */
const monitoringPoints = [
  { Icon: Hand, title: "What a membrane sweep is", body: "A midwife or doctor inserts a gloved finger through your cervix and runs it around the membranes to release prostaglandins. It can be uncomfortable, sometimes briefly painful, and may cause a little spotting and cramping afterwards. It can help bring on labour in the next 48 hours, especially if your body is already favourable. It is always your choice." },
  { Icon: Stethoscope, title: "Heart rate monitoring (CTG)", body: "From around 41 weeks you may be offered a 20–40 minute trace of baby's heartbeat in the assessment unit. It checks how baby is coping. A reactive trace is reassuring — it doesn't predict when labour will start, only that today, your baby is doing well." },
  { Icon: Eye, title: "An extra ultrasound", body: "Some units offer a scan to check the amount of amniotic fluid around your baby and a quick estimate of baby's wellbeing. A normal scan is reassuring; a low-fluid result usually leads to a more active conversation about induction." },
  { Icon: Phone, title: "Your usual midwife appointments", body: "BP, urine, fundal height, baby's position, and a calm conversation about how you're feeling and what you'd like to do next. Bring a notebook. Bring your partner. Bring the questions you have at 3am." },
];

const Monitoring = () => (
  <section id="monitoring" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="max-w-2xl mb-10">
        <SectionLabel>Sweeps and monitoring</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
          What 'extra checks' actually look like at 41 weeks.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
          Post-dates monitoring is mostly reassurance, not alarm. Knowing what each appointment
          involves makes them easier to walk into — and easier to ask questions in.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {monitoringPoints.map(({ Icon, title, body }) => (
          <div key={title}
            className="relative bg-card rounded-2xl border border-border/40 p-6 md:p-7 shadow-card-brand overflow-hidden">
            <span className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sage/30 to-transparent" />
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 rounded-full bg-sage-bg border border-sage/15 flex items-center justify-center">
                <Icon size={15} className="text-sage" />
              </span>
              <h3 className="font-serif text-[1.15rem] text-foreground leading-snug">{title}</h3>
            </div>
            <p className="font-sans text-[13.5px] text-foreground/70 leading-[1.75]">{body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* 7. INDUCTION TALK — Week 41 unique */
const inductionPoints = [
  { Icon: Sprout, title: "Why it's offered around now", body: "From around 41 weeks, the (small) risk of stillbirth begins to creep up gently — which is why most UK units offer induction between 41+0 and 42+0. The absolute risk remains low, but induction at this point reduces it further. Your team should explain the numbers in plain language." },
  { Icon: HeartPulse, title: "How induction usually goes", body: "Often a stepped process: a pessary or gel to soften the cervix, then sometimes breaking your waters, then sometimes a hormone drip. It can take hours, sometimes more than a day. Many people still have the birth they hoped for. Pain relief options remain open." },
  { Icon: ShieldCheck, title: "Your right to ask questions", body: "Why now? What are the risks for me, and for my baby, of being induced today vs waiting another few days? What happens if I decline today and want to be reviewed again? You can take time to decide. You can change your mind." },
  { Icon: Heart, title: "Whatever you choose is valid", body: "Induction is a kind, evidence-led offer — and so is expectant management with extra monitoring. The 'right' choice is the one made with full information and care for both you and your baby. Your team is on your side either way." },
];

const Induction = () => (
  <section id="induction" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel tone="lavender">Induction conversations</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        Induction is a conversation — not a verdict.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        Knowing what your team is likely to discuss with you this week — and the words to use back
        — helps the appointment feel collaborative rather than overwhelming.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {inductionPoints.map(({ Icon, title, body }) => (
        <div key={title}
          className="relative bg-card rounded-2xl border border-border/40 p-6 md:p-7 shadow-card-brand overflow-hidden">
          <span className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-lavender/30 to-transparent" />
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-10 rounded-full bg-lavender-bg border border-lavender/15 flex items-center justify-center">
              <Icon size={15} className="text-lavender-foreground" />
            </span>
            <h3 className="font-serif text-[1.15rem] text-foreground leading-snug">{title}</h3>
          </div>
          <p className="font-sans text-[13.5px] text-foreground/70 leading-[1.75]">{body}</p>
        </div>
      ))}
    </div>

    <div className="mt-6 bg-stage-pregnancy/40 border border-terracotta/20 rounded-2xl p-6 md:p-7 flex flex-col sm:flex-row sm:items-start gap-4">
      <span className="w-10 h-10 rounded-full bg-card border border-terracotta/20 flex items-center justify-center shrink-0">
        <HeartPulse size={15} className="text-terracotta" />
      </span>
      <p className="font-sans text-[14px] text-foreground/85 leading-[1.7]">
        <span className="font-semibold">Movements should still feel strong and regular at 41 weeks,</span>{" "}
        even with no room left and even past your due date. Any change in pattern or strength —
        phone your unit straight away. Day or night.
      </p>
    </div>
  </section>
);

/* 8. BODY */
const bodyNotes = [
  { Icon: Wind, title: "The peak of physical heaviness", body: "Your bump may not be much bigger than at 39 weeks, but you've been carrying it longer. Standing, walking and sitting all feel weightier. Pelvic pressure is constant. Pubic-bone twinges are common. None of it is a sign labour is closer or further away." },
  { Icon: Moon, title: "Sleep is genuinely hard", body: "Frequent waking, vivid dreams, hip ache, restless legs, and the mental weight of waiting. Lie down whenever you can. Side-sleep with pillows. Daytime rest counts. Your body is still doing real work, even when nothing visible is happening." },
  { Icon: Footprints, title: "Looser bowels and a little more 'show'", body: "Your body may quietly continue ripening even past your due date — softer cervix, more discharge, more 'show' colour, occasional looser stools. None of it guarantees labour today. All of it is your body still preparing." },
];

const Body = () => (
  <section id="body" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="max-w-2xl mb-10">
        <SectionLabel tone="terracotta">Your body this week</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
          Heavier than you've ever been — and still working, quietly, on the inside.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
          Your body has not 'forgotten' how to go into labour. It is simply doing its work on a
          slightly longer timeline than the calendar predicted.
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

/* 9. SYMPTOMS */
const symptoms = [
  {
    Icon: HeartPulse, name: "Insistent Braxton Hicks (still)",
    feels: "Tightenings across the bump, sometimes uncomfortable, sometimes painful — and still, often, not yet labour.",
    why: "Your uterus continues rehearsing and softening the cervix even past your date.",
    normal: "Very common. Painful, regular, longer-and-stronger tightenings that don't ease — phone your unit.",
  },
  {
    Icon: Wind, name: "Constant pelvic pressure",
    feels: "A heavy fullness low down, with sharp pubic-bone twinges and lightning-style shoots in the cervix.",
    why: "Your baby's head pressing into nerves, deeply engaged, often just waiting.",
    normal: "Very common. Sharp but harmless, unless paired with bleeding, leaking or persistent regular tightenings.",
  },
  {
    Icon: Eye, name: "More 'show' or sweep-related spotting",
    feels: "Pinkish, brown or jelly-like discharge, sometimes streaked with blood — particularly after a sweep.",
    why: "The cervix continuing to soften; small surface vessels can spot after a sweep or a vaginal exam.",
    normal: "Common. Heavy fresh red bleeding, soaking pads, is not a show — phone straight away.",
  },
  {
    Icon: Moon, name: "Profound tiredness",
    feels: "Bone-deep exhaustion, sometimes worse in the late afternoon, despite doing very little.",
    why: "Late-pregnancy hormones, broken sleep, and the emotional weight of waiting past your due date.",
    normal: "Universal. Rest is the work now. Sleep where you can. Naps count.",
  },
  {
    Icon: Footprints, name: "Bowel changes",
    feels: "Looser stools or more frequent bowel movements over a day or two.",
    why: "Rising prostaglandins as the body keeps preparing — sometimes a quiet pre-labour sign.",
    normal: "Common in the final week before induction. Severe diarrhoea with vomiting or fever still needs a call.",
  },
  {
    Icon: Brain, name: "Emotional fragility",
    feels: "Tearful, short-tempered, fierce, raw, defensive of your timeline. Sometimes flat. Sometimes furious.",
    why: "Hormones, sleep deprivation, the social pressure of being 'still here', and the weight of decisions ahead.",
    normal: "Universal at 41 weeks. Persistent low mood, hopelessness or thoughts of harming yourself need a same-day conversation with your midwife or GP.",
  },
];

const Symptoms = () => (
  <section id="symptoms" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel>Common symptoms</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        What's likely to show up at 41 weeks — and what each one really means.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        Most of what your body is doing now is the same as it was at 39 weeks — just a little
        longer-running, a little more relentless, and a little more emotionally loaded.
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
  </section>
);

/* 10. EMOTIONAL */
const emotionalTruths = [
  "The hardest part: being asked 'still here?' for the hundredth time.",
  "Wanting your baby out — and being scared of how they'll come.",
  "Refreshing your due date in your head as if it might change.",
  "Crying at the supermarket. Crying at the kettle.",
  "Loving them and being slightly furious at them, both at once.",
  "Quiet grief that this isn't going the way you imagined.",
  "And — somewhere underneath — knowing this is almost over.",
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
            Tired in a way that's hard to explain.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/80 leading-[1.8] mb-4">
            Going past your due date is one of the most under-discussed parts of pregnancy. The
            social expectation that your baby has 'arrived by now' presses against a body that's
            still waiting. It's a uniquely exhausting kind of full.
          </p>
          <p className="font-sans text-[14px] text-foreground/70 leading-[1.75]">
            None of how you feel right now predicts your birth, your baby, or your motherhood.
            Be tender. Mute the group chats. Let yourself be quietly past your date.
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

/* 11. FOCUS */
const focusList = [
  { Icon: Hand, title: "Movements above everything else", note: "Strong and regular, even past your date. Any change at all — phone your unit. Day or night. This is the single most important thing you can do." },
  { Icon: Stethoscope, title: "Go to your monitoring appointments", note: "Sweeps, CTGs, scans, induction discussions. They are designed for this stage and exist to keep an eye on a small set of things — most of which will be reassuring." },
  { Icon: Briefcase, title: "Bag still by the door", note: "Same packed bag, refreshed snacks, charger plugged in, going-home outfit ready. Add a couple of long, comfortable items in case of an induction stay." },
  { Icon: MessageCircle, title: "Mute the group chats if you need to", note: "You don't owe daily updates. A short auto-reply ('Still here, will let you know — please don't ask') is allowed and kind to yourself." },
  { Icon: Phone, title: "Have your numbers easy to find", note: "Maternity triage, day assessment, labour ward, partner, key family. On your phone, on paper, and on the fridge." },
  { Icon: Moon, title: "Rest is still the work", note: "Lying down, side-sleeping, slow walks, warm baths, watching daft television. Your body is still doing the most important thing it has ever done." },
];

const Focus = () => (
  <section id="focus" className="bg-sage-bg/35 py-16 md:py-24 border-y border-border/30">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <SectionLabel tone="terracotta">Focus this week</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.2rem] text-foreground leading-tight mb-4">
            Soft things, kindly. Then rest some more.
          </h2>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8]">
            Week 41 is not for projects, lists or 'productive' nesting. It's for the small
            confirmations, the quiet protections, and the very real work of waiting.
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

/* 12. SEEK SUPPORT */
const seekSupport = [
  "Any change in your baby's movements — pattern, strength or character",
  "Regular painful tightenings that don't ease with rest or movement",
  "Waters breaking, even a slow trickle",
  "Bleeding heavier than a small show — fresh red blood",
  "Severe headache, vision changes or pain in your upper tummy",
  "Sudden swelling in your face or hands",
  "Severe itching, especially on palms and soles or worse at night",
  "Persistent low mood, hopelessness or thoughts of harming yourself",
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
            Past your date is not a reason to wait at home with worry. Phone first, every time.
          </h3>
          <p className="font-sans text-[13.5px] text-foreground/70 leading-[1.75] mt-3">
            Your maternity assessment unit is open 24 hours, every day — including for post-dates
            pregnancies. They will not be put out, irritated, or think you're overreacting. In an
            emergency, dial 999.
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

/* 13. QUOTE */
const Quote = () => (
  <section className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl pb-16 md:pb-24">
    <div className="relative bg-stage-pregnancy/35 rounded-3xl border border-border/30 p-8 sm:p-10 md:p-14 text-center overflow-hidden">
      <span className="absolute left-7 top-6 font-serif text-4xl text-terracotta/40 leading-none">“</span>
      <span className="absolute right-7 bottom-4 font-serif text-4xl text-terracotta/40 leading-none">”</span>
      <p className="font-serif italic text-[1.2rem] sm:text-[1.35rem] md:text-[1.6rem] text-foreground/90 leading-snug max-w-3xl mx-auto">
        Past your date is not late. It is your baby keeping their own quiet time, and you keeping it with them.
      </p>
      <Heart size={14} className="text-terracotta/60 mx-auto mt-5" />
    </div>
  </section>
);

/* 14. REFLECTION + ASK */
const reflectionPrompts = ["What I want to remember about this week", "What I'm afraid of", "What I want from my team", "Letter to my baby"];
const askChips = ["What is a sweep?", "Pros and cons of induction", "Going past 42 weeks", "How to count movements", "When to phone the unit"];

const ReflectionAsk = () => (
  <PublicWeekReflectionAsk
    week={41}
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
            The post-dates days deserve to be remembered too.
          </h3>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8] mb-6">
            The waiting that goes on past the calendar is its own quiet kind of work. The journal
            holds room for the specific tenderness of being still here — and for the letters,
            hopes and small kept thoughts you'll want to look back on.
          </p>
          <ul className="space-y-2.5 mb-7">
            {[
              "Pages for birth preferences and induction questions",
              "Space for letters to your baby before they arrive",
              "Guided prompts through every week to birth — and beyond",
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

/* 16. RELATED */
const related = [
  { slug: "signs-of-labour", img: thirdSignsImg, tag: "Looking ahead",
    title: "The early signs of labour",
    desc: "What to watch for, what to ignore, and exactly when to call — including past your date." },
  { slug: "baby-movement-in-pregnancy", img: thirdMovementImg, tag: "Movement",
    title: "Movements past your due date",
    desc: "Strong and regular, even now. The single most important thing to keep your eye on." },
  { slug: "hospital-bag-and-what-to-pack", img: thirdHospitalBagImg, tag: "Practical",
    title: "Bag for an induction stay",
    desc: "What helps if you're induced — long charging cables, soft layers, snacks, your own pillow." },
  { slug: "emotional-wellbeing-pregnancy", img: thirdEmotionalImg, tag: "Emotions",
    title: "Past your date, emotionally",
    desc: "The unique exhaustion of going over — and how to be tender with yourself this week." },
  { slug: "sleep-in-pregnancy", img: thirdSleepImg, tag: "Body",
    title: "Sleep when sleep is hard",
    desc: "Side-sleeping, pillows, restless legs and the broken nights of the post-dates week." },
  { slug: "the-space-your-baby-will-come-home-to", img: thirdNurseryImg, tag: "At home",
    title: "Coming home, whenever it is",
    desc: "What's actually needed at home for your first day with baby — even if that day is later than expected." },
];

const Related = () => (
  <section id="guidance" className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div className="max-w-xl">
          <SectionLabel>Read next, because of week 41</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.4rem] text-foreground leading-tight">
            Curated guidance for past-your-date pregnancies.
          </h2>
        </div>
        <Link to="/pregnancy/third-trimester"
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

/* 17. FAQ */
const faqs = [
  { q: "Is being 41 weeks pregnant 'overdue'?",
    a: "Technically yes — past your due date. But 'overdue' is a misleading word: from 41+0 you are 'late term', and only from 42+0 'post-term'. Around 1 in 5 first-time pregnancies arrive between 41 and 42 weeks. It is normal, recognised, and well-supported by maternity care." },
  { q: "Why is induction usually offered around 41 weeks?",
    a: "From around 41 weeks, the (small) risk of stillbirth begins to creep up gently — and induction at this point reduces it further. The absolute risk remains low. Most UK units offer induction between 41+0 and 42+0. Your team should explain the numbers in plain language and answer any questions." },
  { q: "Can I decline a sweep or an induction?",
    a: "Yes. Sweeps and induction are always offered, never imposed. You can ask for time to think, request another conversation, or choose expectant management with extra monitoring instead. Your team's job is to give you full information and support whatever decision you make." },
  { q: "Does going past my date mean my baby will be very big?",
    a: "Sometimes a little bigger than at 39 weeks, but not always. Estimated weights from late scans can be wrong by 10–15% in either direction. Big babies are usually born safely — and small late babies are common too. Size alone is rarely a reason to induce." },
  { q: "Should my baby's movements feel different at 41 weeks?",
    a: "Movements may feel different — more rolling, stretching and pressure rather than big kicks — because there's no room left. But the strength and pattern should still be there. Movements do not slow down before labour. Any reduction or change in movement at 41 weeks needs you to phone your maternity assessment unit straight away. Day or night. Don't wait." },
  { q: "Is there anything I can do to bring labour on naturally?",
    a: "There's no strong evidence that walking, curries, pineapple, sex, raspberry leaf tea, nipple stimulation or anything else reliably starts labour before your body is ready. A membrane sweep is the only intervention with reasonable evidence — and even that works best when your body is already favourable. Rest is rarely wasted." },
  { q: "What happens if I go past 42 weeks?",
    a: "Most UK units recommend birth by 42+0, so it's unusual to be left to wait beyond that without active induction or close monitoring (sometimes called 'expectant management with surveillance'). If induction has been declined or hasn't worked, your team will discuss next steps in detail with you." },
  { q: "Is it normal to feel really fed up?",
    a: "Yes. Going past your due date is genuinely hard. The body is heavy, sleep is broken, the social pressure is constant, and your imagination is running ahead of you. Tearful afternoons, short tempers, defensive answers and quiet grief that 'this isn't going as planned' are all normal. Be tender. Mute the chats if you need to. You are very nearly there." },
];

/* 18. NEXT */
const Next = () => (
  <section className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
      <div className="bg-gradient-to-br from-sage-bg via-parchment to-stage-pregnancy/30 rounded-3xl border border-border/30 p-8 sm:p-10 md:p-14 text-center shadow-card-brand">
        <SectionLabel>Up next</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.5rem] text-foreground leading-tight mb-3">
          However your baby comes — you are nearly there.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 max-w-lg mx-auto mb-8 leading-[1.8]">
          Whether labour starts on its own this week, with a sweep, or through induction, the
          waiting is almost over. Read forward to the early days of life with your baby.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-md sm:max-w-none mx-auto">
          <Link to="/pregnancy/week/42"
            className="inline-flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium shadow-cta hover:bg-terracotta-hover transition-colors">
            Continue to week 42 <ArrowRight size={14} />
          </Link>
          <Link to="/first-year#recovery-topics"
            className="inline-flex items-center justify-center gap-2 border border-foreground/25 text-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium hover:bg-parchment-dark transition-colors">
            Explore the early days
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const Week41Page = () => (
  <div className="min-h-screen bg-parchment">
    <PregnancyWeekSeo weekNumber={41} />
    <Navbar />
    <Hero />
    <MetaBar />
    <AtAGlance />
    <Biology />
    <PostDates />
    <Monitoring />
    <Induction />
    <Body />
    <Symptoms />
    <Emotional />
    <Focus />
    <SeekSupport />
    <Quote />
    <ReflectionAsk />
    <Journal />
    <Related />
    <WeekCommonQuestions week={41} questions={buildWeekQuestions(41, faqs)} />
    <WeekSources week={41} sources={getWeekSources(41)} />
    <Next />
    <Footer />
  </div>
);

export default Week41Page;
