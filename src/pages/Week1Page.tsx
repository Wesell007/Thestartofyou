import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ChevronLeft, ChevronRight, Sprout, HeartPulse, Activity, Sparkles, Calendar,
  BookOpen, ArrowRight, Check, AlertTriangle, Plus, Minus, Heart, MessageCircle,
  Leaf, Droplet, Moon, Coffee, ShieldCheck, Stethoscope, Phone,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PregnancyWeekSeo from "@/components/seo/PregnancyWeekSeo";
import cycleImg from "@/assets/week1-cycle.jpg";
import calendarImg from "@/assets/week1-calendar.jpg";
import biologyImg from "@/assets/week1-biology-detail.jpg";
import journalImg from "@/assets/journal-flatlay.jpg";
import botanicalTr from "@/assets/botanical-branch-tr.png";
import botanicalBl from "@/assets/botanical-branch-bl.png";
import botanicalAccent from "@/assets/article-botanical-accent.png";
import implantationImg from "@/assets/article-hero-implantation.jpg";
import earlySymptomsImg from "@/assets/article-hero-early-symptoms.jpg";
import emotionalImg from "@/assets/article-hero-emotional-first-tri.jpg";
import testsScansImg from "@/assets/article-hero-tests-scans.jpg";
import lifestyleImg from "@/assets/article-hero-lifestyle.jpg";
import fatigueImg from "@/assets/article-hero-fatigue.jpg";

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
          <span className="text-foreground">Week 1</span>
        </nav>
        <p className="font-sans text-[11px] font-semibold tracking-[0.3em] uppercase text-sage mb-5">
          First trimester · The week before everything
        </p>
        <h1 className="font-serif text-[2.5rem] sm:text-5xl md:text-[3.75rem] lg:text-[4.25rem] text-foreground leading-[1.04] tracking-tight mb-4 md:mb-5">
          1 Week Pregnant
        </h1>
        <p className="font-serif italic text-[1.05rem] sm:text-lg md:text-xl text-foreground/75 max-w-xl mx-auto leading-relaxed">
          Counted as week one, but in truth — the start of a cycle. Conception has not happened yet. This is the quiet groundwork your body does before any of it begins.
        </p>
      </div>

      <Link to="/pregnancy/first-trimester" aria-label="Back to first trimester" className="absolute left-3 sm:left-6 md:left-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronLeft size={18} />
      </Link>
      <Link to="/pregnancy/week/2" aria-label="Go to week 2" className="absolute right-3 sm:right-6 md:right-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronRight size={18} />
      </Link>
    </div>

    <div className="relative -mt-28 sm:-mt-36 md:-mt-40 mb-6">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex items-end justify-center gap-5 sm:gap-10 md:gap-14">
          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-card border-[3px] border-sage/15 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={calendarImg} alt="A quiet calendar page" loading="lazy" width={512} height={512} className="w-full h-full object-cover" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.04]" />
            </div>
            <div className="text-center">
              <p className="font-serif italic text-[12.5px] text-foreground/80 leading-tight">a calendar page</p>
              <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/55 mt-1">day 1 of cycle</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full bg-card border-[4px] border-sage/25 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={cycleImg} alt="Soft editorial illustration of the womb at the start of a new menstrual cycle" width={1024} height={1024} loading="eager" decoding="async" className="w-full h-full object-cover scale-[1.02]" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.05]" />
            </div>
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.22em] uppercase text-foreground/65">Your body this week</p>
          </div>

          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-sage-bg to-sage-bg/40 border-[3px] border-sage/25 flex items-center justify-center shadow-elevated">
              <span className="font-serif text-[1.7rem] sm:text-[1.95rem] text-foreground tracking-tight leading-none">39</span>
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
  { id: "dating", label: "How dating works", Icon: Calendar },
  { id: "biology", label: "What's underway", Icon: Sprout },
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
          <div className="w-11 h-11 rounded-full bg-sage-bg border border-sage/20 flex items-center justify-center shrink-0">
            <Leaf size={16} className="text-sage" />
          </div>
          <div className="min-w-0">
            <p className="font-sans text-[13px] font-medium text-foreground leading-snug">✔ Medically reviewed by Jenny Joines</p>
            <p className="font-sans text-[11.5px] font-normal text-foreground/60 mt-0.5">Updated for 2026 · 10 min read · Pre-conception · Cycle day 1</p>
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
  { label: "Stage", value: "Pre-conception · cycle day 1" },
  { label: "Baby", value: "Not yet conceived" },
  { label: "Body", value: "Period · cycle resetting" },
  { label: "Trimester", value: "1 of 3 (by dating)" },
];

const AtAGlance = () => (
  <section id="at-a-glance" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl mb-14 md:mb-20">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 relative bg-gradient-to-br from-sage-bg/55 via-parchment to-parchment-dark/50 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-10 overflow-hidden shadow-card-brand">
        <img src={botanicalAccent} alt="" aria-hidden="true" className="absolute -left-3 bottom-0 w-28 opacity-35 pointer-events-none select-none" />
        <SectionLabel>At a glance</SectionLabel>
        <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-5">
          Week 1 is the week before pregnancy actually begins.
        </h2>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8] mb-4">
          Pregnancy is dated from the first day of your last period — not from conception. So in week 1
          you are not yet pregnant in the biological sense. Your body is shedding the lining of your
          womb and starting a new cycle that may, this month, lead to pregnancy.
        </p>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8]">
          It feels strange to count it. But it matters: this is how your due date will be calculated
          and how every scan from now on will measure your baby. Honest, gentle, and worth understanding.
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

const datingPoints = [
  { Icon: Calendar, title: "Counted from your last period", body: "By medical convention, week 1 of pregnancy is the week of your last menstrual period (LMP). It's the cleanest reference point — most people remember roughly when their period started, but few know the exact day of ovulation." },
  { Icon: Sprout, title: "Conception happens in week 2 or 3", body: "In a typical 28-day cycle, ovulation falls around day 14. Sperm can survive 3–5 days, and the egg about 24 hours, so conception usually lands in week 2 or early week 3 of the count." },
  { Icon: HeartPulse, title: "Why your due date is 40 weeks from LMP", body: "From your LMP, full term is 40 weeks. That's about 38 weeks from conception, plus the two-week head start built into the count. Your dating scan will fine-tune it." },
  { Icon: Sparkles, title: "If your cycles are irregular", body: "Long, short or unpredictable cycles can shift everything. The 11–14 week dating scan is what will set your true due date, regardless of how week 1 was counted." },
];

const Dating = () => (
  <section id="dating" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel tone="terracotta">How pregnancy dating works</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        Why you're "1 week pregnant" before any pregnancy.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        It's the part that confuses almost everyone. Here's the short, honest version of how the count
        actually works — and why it matters from the very first appointment onwards.
      </p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {datingPoints.map(({ Icon, title, body }) => (
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
  </section>
);

const biologyPoints = [
  { title: "Your period is here", body: "Day 1 is the first day of full menstrual flow. The lining of your womb, built up over the previous cycle, is shedding. This is the clean slate every cycle starts from." },
  { title: "Hormones reset to baseline", body: "Oestrogen and progesterone fall to their lowest point of the month. That hormonal dip is what triggers the period — and what wakes up the next cycle's quiet preparation." },
  { title: "New follicles begin to mature", body: "In your ovaries, a small group of follicles begin to develop. One — usually just one — will go on to release a mature egg in around two weeks' time." },
  { title: "The lining will start rebuilding", body: "By the end of week 1, oestrogen begins to rise again and the lining of your womb starts to thicken — a soft, blood-rich bed waiting in case an embryo implants later this cycle." },
];

const Biology = () => (
  <section id="biology" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="relative rounded-3xl overflow-hidden border border-border/40 shadow-card-brand">
            <div className="aspect-[4/5]">
              <img src={biologyImg} alt="Soft watercolour illustration of the ovaries and uterus at the start of a new cycle, with an early follicle maturing" loading="lazy" width={1024} height={1280} className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-foreground/60 to-transparent">
              <p className="font-serif italic text-[13px] text-background/95 leading-snug">
                The cycle begins again. Quietly, faithfully, without asking for anything.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <SectionLabel>What's underway biologically</SectionLabel>
          <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-5">
            No baby yet — and a great deal of preparation.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8] mb-8 max-w-2xl">
            Week 1 is one of the most overlooked weeks of the whole calendar, because nothing visible is
            happening. But in the background your body is doing something quietly extraordinary: clearing
            out the old lining and starting the long sequence of preparation that ovulation, fertilisation
            and implantation depend on.
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
  { Icon: Droplet, title: "A normal period", body: "This week's bleeding is your usual menstrual flow — lasting roughly 3–7 days, heaviest in the first couple of days, then tapering off. If you're tracking for conception, this is day 1." },
  { Icon: Activity, title: "Cramps and lower-back ache", body: "Prostaglandins cause the womb muscle to contract and shed the lining. Period pain is real pain. Heat, gentle movement and over-the-counter pain relief are all reasonable now." },
  { Icon: Moon, title: "Lower energy and mood dips", body: "Both oestrogen and progesterone are at their lowest. Tiredness, weepiness and brain-fog around the start of a period are biological, not personal failures." },
];

const Body = () => (
  <section id="body" className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="max-w-2xl mb-10">
        <SectionLabel tone="terracotta">Your body this week</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
          You feel like you have a period — because you do.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
          Whatever your period normally feels like, that's what week 1 feels like. There are no
          pregnancy symptoms yet, because there is no pregnancy yet. That is not a failure — it's the
          honest starting line.
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
  { Icon: Droplet, name: "Period bleeding", feels: "A familiar period: heavier in the first two days, then easing into lighter days 3–5.", why: "Falling progesterone triggers the lining built up last cycle to shed.", normal: "Anything that matches your normal period. Soaking through a pad an hour, clots bigger than a 50p coin, or bleeding lasting more than 7 days deserves a GP call." },
  { Icon: Activity, name: "Cramps", feels: "Dragging, low cramps, sometimes radiating to the lower back or thighs.", why: "Prostaglandins make the womb contract to release the lining.", normal: "Manageable with heat, gentle movement and standard painkillers. Pain that stops you functioning is worth flagging — period pain shouldn't be invisible." },
  { Icon: Moon, name: "Low mood, low energy", feels: "Tearful for no clear reason, more tired than usual, less patient with yourself and others.", why: "Oestrogen and progesterone are at their monthly lowest.", normal: "Universal. Within a few days, as oestrogen begins to rise, mood usually steadies again." },
  { Icon: HeartPulse, name: "Headaches", feels: "A dull ache, often around the temples or behind the eyes.", why: "The hormonal drop and changes in fluid balance can both trigger period-time headaches.", normal: "Common. Hydration, rest and standard painkillers help. Sudden severe headaches with vision changes need urgent assessment." },
  { Icon: Coffee, name: "Cravings or appetite shifts", feels: "Wanting something sweet, salty or carb-heavy. Stronger appetite or none at all.", why: "Hormonal shifts and slightly lower blood sugar around your period drive cravings.", normal: "Honour them within reason. Steady meals help mood and energy more than caffeine and sugar." },
];

const Symptoms = () => (
  <section id="symptoms" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel>Common feelings this week</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        These are period feelings, not pregnancy symptoms.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        That distinction matters. If you're trying to conceive, expect this week to feel exactly like
        your normal period — because pregnancy symptoms can't begin until after implantation, two to
        three weeks from now.
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
  "Hopeful and tired in the same breath.",
  "Trying not to count, while quietly counting.",
  "Wanting this cycle to be the one — and bracing in case it isn't.",
  "Feeling silly for tracking a week where nothing has happened yet.",
  "Grief sitting nearby, especially after loss or long trying.",
  "Quiet pride at giving your body folic acid, sleep, and care anyway.",
];

const Emotional = () => (
  <section id="emotional" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 relative bg-gradient-to-br from-lavender-bg via-parchment to-lavender-bg/40 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-9 shadow-card-brand overflow-hidden">
          <img src={botanicalAccent} alt="" aria-hidden="true" className="absolute right-0 top-0 w-24 opacity-35 pointer-events-none select-none" />
          <SectionLabel tone="lavender">Emotionally this week</SectionLabel>
          <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-4">
            A quiet week that can feel surprisingly loud.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/80 leading-[1.8] mb-4">
            For people not actively trying, week 1 is just a period. For people trying — especially
            after months of trying or after loss — it can carry a lot. The bleed itself can feel like
            an answer that you weren't ready for.
          </p>
          <p className="font-sans text-[14px] text-foreground/70 leading-[1.75]">
            Be gentle. The cycle has only just restarted. Hope and grief can sit beside each other.
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
  { Icon: Sprout, title: "Start folic acid today, if you haven't", note: "400 micrograms daily. Folic acid supports neural-tube development from the very earliest weeks of pregnancy — long before most people know they're pregnant. Higher 5 mg dose if you have diabetes, epilepsy, a higher BMI, or a family history." },
  { Icon: Calendar, title: "Note the first day of your period", note: "Day 1 of bleeding is the date your future midwife will ask for. Write it in a calendar, period app or your journal. It will set your due-date estimate before any scan." },
  { Icon: Coffee, title: "Soften lifestyle now, not later", note: "Cut alcohol back, drop caffeine to under 200 mg a day, stop smoking and vaping. Pre-pregnancy choices matter — fertilisation could happen in two weeks." },
  { Icon: Heart, title: "Be tender with yourself through the bleed", note: "Heat, rest, gentle food, less of what depletes you. A period is a real physiological event. You're allowed to slow down for it." },
  { Icon: Moon, title: "Aim for steady sleep", note: "Cycle-long sleep regularity supports ovulation later in the month. Aim for 7–9 hours and a consistent bedtime where you can." },
  { Icon: Sparkles, title: "Decide how much to track", note: "Some people love the data — basal body temperature, ovulation strips, a cycle app. Others find it relentless. Track in the way that calms you, not the way that pressures you." },
];

const Focus = () => (
  <section id="focus" className="bg-sage-bg/35 py-16 md:py-24 border-y border-border/30">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <SectionLabel tone="terracotta">Focus this week</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.2rem] text-foreground leading-tight mb-4">
            Six small, kind things that quietly matter.
          </h2>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8]">
            Nothing dramatic. Nothing performative. Week 1 is the foundations week — and foundations
            don't need to be loud to be strong.
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
  "A period soaking through a pad an hour for several hours",
  "Period pain that stops you functioning, repeatedly",
  "Bleeding lasting more than 7 days, or much heavier than usual",
  "Cycles that keep arriving wildly early, late or not at all",
  "12+ months of trying to conceive (6+ months if you're 35 or older)",
  "A history of miscarriage, ectopic pregnancy or fertility issues",
  "Severe mood crashes around your period that affect daily life",
  "Pain during sex or between periods",
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
            Cycles can tell you a lot. Don't normalise pain or worry alone.
          </h3>
          <p className="font-sans text-[13.5px] text-foreground/70 leading-[1.75] mt-3">
            Your GP is the right first call for any of the below. Pre-conception care is a real and
            valid reason to see them — you don't have to wait until something is wrong.
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
        Week 1 isn't the start of a baby. It's the start of a body preparing — quietly, faithfully — for the possibility of one.
      </p>
      <Heart size={14} className="text-sage/60 mx-auto mt-5" />
    </div>
  </section>
);

const reflectionPrompts = ["The first day of this cycle", "What I'm hoping for", "What I'm scared to hope for", "How I'll be kinder to my body"];
const askChips = ["When in my cycle is best to try?", "How long until I can test?", "How much folic acid do I need?", "Is it normal to feel low on day 1?", "Should I track ovulation?"];

const ReflectionAsk = () => (
  <section className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl pb-16 md:pb-24">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-card rounded-3xl border border-border/40 border-t-2 border-t-sage/40 p-7 sm:p-8 md:p-9 shadow-card-brand">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-9 h-9 rounded-full bg-sage-bg flex items-center justify-center shrink-0"><Leaf size={14} className="text-sage" /></span>
          <div className="min-w-0">
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.24em] uppercase text-sage">A moment for reflection</p>
            <h3 className="font-serif text-[1.3rem] sm:text-[1.35rem] text-foreground mt-0.5 leading-snug">What does this week feel like for you?</h3>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {reflectionPrompts.map((p) => (
            <span key={p} className="font-sans text-[11.5px] font-medium bg-sage-bg/70 text-foreground/80 rounded-full px-3 py-1.5 border border-sage/20">{p}</span>
          ))}
        </div>
        <textarea rows={4} placeholder="Write your thoughts here… this is just for you." className="w-full bg-parchment/80 border border-border/40 rounded-xl px-4 py-3.5 font-sans text-[13.5px] text-foreground placeholder:text-foreground/45 resize-none focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/30 transition-all leading-relaxed" />
        <Link to="/auth" className="inline-flex items-center gap-2 mt-4 bg-terracotta text-terracotta-foreground rounded-pill px-5 py-2.5 font-sans text-[13px] font-medium hover:bg-terracotta-hover transition-colors">
          Save reflection to your journal <ArrowRight size={12} />
        </Link>
      </div>

      <div className="bg-card rounded-3xl border border-border/40 border-t-2 border-t-lavender/50 p-7 sm:p-8 md:p-9 shadow-card-brand">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-9 h-9 rounded-full bg-lavender-bg flex items-center justify-center shrink-0"><MessageCircle size={14} className="text-lavender-foreground" /></span>
          <div className="min-w-0">
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.24em] uppercase text-sage">Ask about week 1</p>
            <h3 className="font-serif text-[1.3rem] sm:text-[1.35rem] text-foreground mt-0.5 leading-snug">A question on your mind?</h3>
          </div>
        </div>
        <p className="font-sans text-[13px] text-foreground/70 leading-relaxed mb-4">Get a calm, evidence-led answer tailored to where you are right now.</p>
        <input type="text" placeholder="e.g. Am I really pregnant if conception hasn't happened?" className="w-full bg-parchment/80 border border-border/40 rounded-full px-5 py-3.5 font-sans text-[13.5px] text-foreground placeholder:text-foreground/45 focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/30 transition-all" />
        <p className="font-sans text-[10.5px] font-semibold tracking-[0.22em] uppercase text-foreground/55 mt-5 mb-2.5">Popular at this stage</p>
        <div className="flex flex-wrap gap-2">
          {askChips.map((c) => (
            <Link key={c} to="/ask" className="font-sans text-[12px] font-medium text-foreground/80 bg-parchment-dark/60 border border-border/40 hover:border-sage/50 hover:text-foreground px-3.5 py-1.5 rounded-full transition-colors">{c}</Link>
          ))}
        </div>
      </div>
    </div>
  </section>
);

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
            Even the cycle before is part of the story.
          </h3>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8] mb-6">
            The hoping. The bleeding. The folic acid started quietly. The cycles that came and went
            before the one that finally stayed. The journal makes room for all of it — not just the
            news, but the long, patient lead-up to the news.
          </p>
          <ul className="space-y-2.5 mb-7">
            {[
              "A cycle-by-cycle space for the months of trying",
              "Gentle prompts that don't pressure or score you",
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
  { slug: "how-pregnancy-dating-works", img: testsScansImg, tag: "Dating",
    title: "How pregnancy dating actually works",
    desc: "Why your due date is counted from your last period, what the dating scan changes, and what to expect at each milestone." },
  { slug: "preparing-your-body-for-pregnancy", img: lifestyleImg, tag: "Pre-conception",
    title: "Quietly preparing your body to conceive",
    desc: "Folic acid, alcohol, caffeine, sleep and weight — the small changes that genuinely matter before a positive test." },
  { slug: "the-two-week-wait-emotionally", img: emotionalImg, tag: "Emotions",
    title: "The two-week wait, emotionally",
    desc: "What the days between ovulation and a possible test really feel like, and how to be kinder to yourself through them." },
  { slug: "ovulation-and-the-fertile-window", img: implantationImg, tag: "Cycle",
    title: "Ovulation and the fertile window, explained",
    desc: "When it happens, how to recognise it, and why timing matters less than people think." },
  { slug: "early-pregnancy-symptoms-explained", img: earlySymptomsImg, tag: "Symptoms",
    title: "When pregnancy symptoms can actually start",
    desc: "Why nothing pregnancy-related can show up in week 1, and what the very first signs look like when they do arrive." },
  { slug: "first-trimester-fatigue", img: fatigueImg, tag: "Body",
    title: "Tiredness, cycles and pregnancy",
    desc: "How tiredness in your normal cycle differs from the deep fatigue of early pregnancy — once it begins." },
];

const Related = () => (
  <section id="guidance" className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div className="max-w-xl">
          <SectionLabel>Read next, because of week 1</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.4rem] text-foreground leading-tight">
            Curated guidance for the cycle before everything.
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
  { q: "How can I be 1 week pregnant if I'm not pregnant yet?",
    a: "It's a quirk of how pregnancy is dated. By medical convention, the count begins on the first day of your last menstrual period (LMP), not from conception — because the LMP is far easier to remember than the precise moment of ovulation. So in week 1, you have not yet conceived. Conception will happen around week 2 or 3, and your due date is calculated as 40 weeks from your LMP." },
  { q: "When does conception actually happen?",
    a: "In a typical 28-day cycle, ovulation happens around day 14 — so usually in week 2 of the count. Sperm can survive in the body for 3–5 days and the egg for around 24 hours, which gives a fertile window of roughly 5–6 days. If fertilisation happens, implantation usually takes another 6–10 days, landing in late week 3 or early week 4." },
  { q: "Should I take folic acid in week 1?",
    a: "Yes — ideally for at least 1–3 months before you start trying, and certainly from the moment you stop using contraception. Folic acid (400 micrograms daily, or 5 mg if you're advised the higher dose) supports the development of the neural tube, which forms in the very first weeks of pregnancy, often before a test is even positive." },
  { q: "Do period cramps in week 1 mean anything for fertility?",
    a: "Not on their own. Mild to moderate period cramps are normal and don't predict either fertility or pregnancy outcomes. Pain that is severe, regularly stops you functioning, lasts beyond your bleed, or is accompanied by very heavy bleeding deserves a GP appointment to rule out things like endometriosis, fibroids or adenomyosis." },
  { q: "How long should we try before we worry?",
    a: "Standard guidance in the UK is to seek advice from your GP after 12 months of regular unprotected sex if you're under 35, or after 6 months if you're 35 or older. If you have known issues — irregular cycles, history of miscarriage or ectopic, previous fertility treatment, certain medical conditions — you can ask for an earlier referral and shouldn't feel you need to wait." },
  { q: "Can I do anything in week 1 to make conception more likely?",
    a: "Mostly the calm, boring things: take folic acid, don't smoke or vape, keep alcohol low, keep caffeine under 200 mg a day, sleep well, eat steadily. From around day 10 of your cycle, plan for sex every 2–3 days through the fertile window. Anxiety about timing tends to do more harm than good — frequency matters more than precision." },
  { q: "I've been trying for a while. Is this week harder for me?",
    a: "Often, yes. The first day of a period after a month of hoping can feel like grief, even when you're rationally fine. That feeling is real and valid. Tell someone who knows what you're trying for. After several cycles — especially after 6–12 months, or after loss — it is reasonable, not dramatic, to ask your GP for tests and support." },
];

const FAQRow = ({ faq, defaultOpen = false }: { faq: { q: string; a: string }; defaultOpen?: boolean }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border/40 last:border-b-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-start gap-4 py-5 text-left group">
        <span className="flex-1 font-serif text-[1.05rem] md:text-[1.15rem] text-foreground group-hover:text-sage transition-colors leading-snug">{faq.q}</span>
        <span className="w-7 h-7 rounded-full bg-sage-bg flex items-center justify-center text-sage shrink-0 mt-1">{open ? <Minus size={13} /> : <Plus size={13} />}</span>
      </button>
      {open && <p className="font-sans text-[14px] text-foreground/75 leading-[1.85] pb-6 pr-12">{faq.a}</p>}
    </div>
  );
};

const FAQ = () => (
  <section className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
      <div className="mb-10 text-center">
        <SectionLabel>Common questions</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[1.95rem] md:text-[2.4rem] text-foreground leading-tight">Common questions at week 1</h2>
      </div>
      <div className="bg-card rounded-3xl border border-border/40 shadow-card-brand p-2 md:p-4">
        <div className="px-4 md:px-6">
          {faqs.map((f, i) => <FAQRow key={f.q} faq={f} defaultOpen={i === 0} />)}
        </div>
      </div>
    </div>
  </section>
);

const Next = () => (
  <section className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
      <div className="bg-gradient-to-br from-sage-bg via-parchment to-stage-pregnancy/30 rounded-3xl border border-border/30 p-8 sm:p-10 md:p-14 text-center shadow-card-brand">
        <SectionLabel>Up next</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.5rem] text-foreground leading-tight mb-3">Ready for week 2?</h2>
        <p className="font-sans text-[14.5px] text-foreground/75 max-w-lg mx-auto mb-8 leading-[1.8]">
          Next week the lining begins to thicken in earnest, oestrogen climbs, and around day 14 a single
          mature egg will be released. The fertile window opens.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
          <Link to="/pregnancy/week/2" className="inline-flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium shadow-cta hover:bg-terracotta-hover transition-colors">
            Continue to week 2 <ArrowRight size={14} />
          </Link>
          <Link to="/pregnancy/first-trimester" className="inline-flex items-center justify-center gap-2 border border-foreground/25 text-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium hover:bg-parchment-dark transition-colors">
            Explore the first trimester
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const Week1Page = () => (
  <div className="min-h-screen bg-parchment">
    <PregnancyWeekSeo weekNumber={1} />
    <Navbar />
    <Hero />
    <MetaBar />
    <AtAGlance />
    <Dating />
    <Biology />
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

export default Week1Page;
