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
  Ear,
  Smile,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import fetusImg from "@/assets/week16-fetus.jpg";
import avocadoImg from "@/assets/week16-avocado.jpg";
import biologyImg from "@/assets/week16-biology-detail.jpg";
import journalImg from "@/assets/journal-flatlay.jpg";
import botanicalTr from "@/assets/botanical-branch-tr.png";
import botanicalBl from "@/assets/botanical-branch-bl.png";
import botanicalAccent from "@/assets/article-botanical-accent.png";
import secondMovementImg from "@/assets/article-hero-second-movement.jpg";
import secondBodyImg from "@/assets/article-hero-second-body.jpg";
import secondAnatomyImg from "@/assets/article-hero-second-anatomy-scan.jpg";
import secondAnxietyImg from "@/assets/article-hero-second-anxiety.jpg";
import secondEatingImg from "@/assets/article-hero-second-eating.jpg";
import secondSleepImg from "@/assets/article-hero-second-sleep.jpg";

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
    <div className="relative bg-gradient-to-br from-sage-bg/55 via-parchment to-stage-pregnancy/35 pt-20 pb-36 sm:pt-24 sm:pb-44 md:pt-32 md:pb-52">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[820px] h-[420px] rounded-full bg-sage/8 blur-3xl" />
        <div className="absolute -top-10 right-1/4 w-[260px] h-[260px] rounded-full bg-lavender-bg/40 blur-3xl" />
      </div>
      <img src={botanicalBl} alt="" aria-hidden="true"
        className="pointer-events-none absolute top-20 left-0 w-[150px] lg:w-[210px] opacity-25 select-none hidden md:block" />
      <img src={botanicalTr} alt="" aria-hidden="true"
        className="pointer-events-none absolute top-20 right-0 w-[150px] lg:w-[210px] opacity-25 select-none hidden md:block" />

      <div className="container mx-auto px-14 sm:px-16 md:px-10 max-w-5xl relative z-10 text-center">
        <nav aria-label="breadcrumb" className="flex items-center justify-center gap-2 mb-6 sm:mb-7 font-sans text-[12px] font-normal text-foreground/65">
          <Link to="/pregnancy" className="hover:text-foreground transition-colors">Pregnancy</Link>
          <span className="text-foreground/30">›</span>
          <Link to="/pregnancy/second-trimester" className="hover:text-foreground transition-colors">Week by week</Link>
          <span className="text-foreground/30">›</span>
          <span className="text-foreground">Week 16</span>
        </nav>

        <p className="font-sans text-[11px] font-semibold tracking-[0.3em] uppercase text-sage mb-5">
          Second Trimester · Settling in
        </p>
        <h1 className="font-serif text-[2.5rem] sm:text-5xl md:text-[3.75rem] lg:text-[4.25rem] text-foreground leading-[1.04] tracking-tight mb-4 md:mb-5">
          16 Weeks Pregnant
        </h1>
        <p className="font-serif italic text-[1.05rem] sm:text-lg md:text-xl text-foreground/75 max-w-xl mx-auto leading-relaxed">
          Your baby is the size of an avocado. Your bump is becoming visible, the second-trimester ease is settling in, and the very first flutters may begin to find you.
        </p>
      </div>

      <Link to="/pregnancy/week/15" aria-label="Go to week 15"
        className="absolute left-3 sm:left-6 md:left-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronLeft size={18} />
      </Link>
      <Link to="/pregnancy/week/17" aria-label="Go to week 17"
        className="absolute right-3 sm:right-6 md:right-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronRight size={18} />
      </Link>
    </div>

    <div className="relative -mt-28 sm:-mt-36 md:-mt-40 mb-6">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex items-end justify-center gap-5 sm:gap-10 md:gap-14">
          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-card border-[3px] border-sage/15 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={avocadoImg} alt="Avocado" loading="lazy" width={512} height={512}
                className="w-full h-full object-cover" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.04]" />
            </div>
            <div className="text-center">
              <p className="font-serif italic text-[12.5px] text-foreground/80 leading-tight">avocado</p>
              <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/55 mt-1">~12&nbsp;cm</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full bg-card border-[4px] border-sage/25 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={fetusImg}
                alt="Soft editorial illustration of a 16-week fetus curled gently in the womb, with delicate translucent skin, fine forming features and tiny hands"
                width={1024} height={1024}
                loading="eager" decoding="async"
                className="w-full h-full object-cover scale-[1.02]" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.05]" />
            </div>
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.22em] uppercase text-foreground/65">Your baby this week</p>
          </div>

          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-sage-bg to-sage-bg/40 border-[3px] border-sage/25 flex items-center justify-center shadow-elevated">
              <span className="font-serif text-[1.7rem] sm:text-[1.95rem] text-foreground tracking-tight leading-none">24</span>
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
  { id: "quickening", label: "First flutters", Icon: Hand },
  { id: "body", label: "Body changes", Icon: Activity },
  { id: "symptoms", label: "Symptoms", Icon: HeartPulse },
  { id: "anatomy-scan", label: "Anatomy scan ahead", Icon: Stethoscope },
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
              Updated for 2026 · 10 min read · Mid second trimester
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
  { label: "Stage", value: "Mid second trimester" },
  { label: "Baby size", value: "~12 cm — avocado" },
  { label: "Baby weight", value: "Around 100 g" },
  { label: "Coming up", value: "20-week anatomy scan" },
];

const AtAGlance = () => (
  <section id="at-a-glance" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl mb-14 md:mb-20">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 relative bg-gradient-to-br from-sage-bg/55 via-parchment to-parchment-dark/50 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-10 overflow-hidden shadow-card-brand">
        <img src={botanicalAccent} alt="" aria-hidden="true"
          className="absolute -left-3 bottom-0 w-28 opacity-35 pointer-events-none select-none" />
        <SectionLabel>At a glance</SectionLabel>
        <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-5">
          Week 16 is the week pregnancy starts to feel real to your body.
        </h2>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8] mb-4">
          Your baby is now the size of an avocado, with delicate fingernails forming, ears settled into
          their final position, and tiny limbs that are flexing and stretching all day long. Their
          movements are real — most just aren't strong enough to feel yet.
        </p>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8]">
          For you, the bump is becoming more obvious, energy is often returning, and many people describe
          a quiet shift this week: from "pregnant but uncertain" to "carrying a baby". The 20-week
          anatomy scan begins to sit on the horizon.
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
  { title: "Tiny, recognisable features", body: "Your baby's face is now properly forming. Eyebrows and eyelashes are sketching in, the eyes can move beneath sealed lids, and the mouth can purse, swallow and even smile reflexively." },
  { title: "Working ears, listening in", body: "The bones of the inner ear are hardening and the ears have moved to their final position on the head. Your baby can begin to hear the muffled sounds of your body — heartbeat, blood flow, your voice." },
  { title: "Active limbs, real movement", body: "Arms and legs are in proportion. Tiny fingernails and toenails are forming. Your baby is kicking, stretching, somersaulting and grasping the umbilical cord — even if you can't feel it yet." },
  { title: "A working circulation", body: "The heart is pumping around 25 litres of blood a day. The umbilical cord is fully formed and carrying everything they need from your placenta straight to them." },
];

const Biology = () => (
  <section id="biology" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="relative rounded-3xl overflow-hidden border border-border/40 shadow-card-brand">
            <div className="aspect-[4/5]">
              <img src={biologyImg} alt="Soft editorial close-up of a 16-week fetus with delicate hands near the face, fine translucent skin and forming features"
                loading="lazy" width={1024} height={1280}
                className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-foreground/60 to-transparent">
              <p className="font-serif italic text-[13px] text-background/95 leading-snug">
                Tiny hands exploring, ears beginning to listen, a face becoming a face.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <SectionLabel>What's underway biologically</SectionLabel>
          <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-5">
            Week 16 is when your baby starts to look unmistakably like a baby.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8] mb-8 max-w-2xl">
            The features that will one day be your baby's face are sketching into place. The internal
            scaffolding — bones, muscles, nerves — is connecting into something that can move, hear,
            swallow and respond. There is a small, deliberate person inside you now.
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

/* 5. QUICKENING — Week 16 unique section */
const quickeningPoints = [
  { Icon: Hand, title: "What 'quickening' actually means", body: "Quickening is the medical word for the first time you feel your baby move. For most people, it happens between 16 and 22 weeks. Earlier for some, much later for others — both are normal." },
  { Icon: Sparkles, title: "What it tends to feel like", body: "A flutter. A bubble. A trapped wind that isn't quite trapped wind. A gentle, brushing tap from inside. Many people only realise what it was hours or days later." },
  { Icon: Eye, title: "Why you might not feel anything yet", body: "First pregnancies, an anterior placenta (sitting at the front of your uterus), or simply a calm baby can all delay first flutters. None of it means anything is wrong." },
  { Icon: Moon, title: "When you're most likely to notice", body: "Lying still, in bed, or after eating. Movements are easier to feel when you're not moving yourself, and your baby often becomes more active when you finally settle." },
];

const Quickening = () => (
  <section id="quickening" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel tone="lavender">First flutters</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        From around now, your baby's movements may quietly start to find you.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        Few moments in pregnancy carry the emotional weight of feeling your baby move for the first time.
        It can also be one of the most anxiously waited-for milestones — especially after a previous loss
        or a long road to here.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {quickeningPoints.map(({ Icon, title, body }) => (
        <div key={title}
          className="relative bg-card rounded-2xl border border-border/40 p-6 md:p-7 shadow-card-brand overflow-hidden">
          <span className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-lavender/40 to-transparent" />
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

    <div className="mt-6 bg-lavender-bg/60 border border-lavender/20 rounded-2xl p-6 md:p-7 flex flex-col sm:flex-row sm:items-start gap-4">
      <span className="w-10 h-10 rounded-full bg-card border border-lavender/20 flex items-center justify-center shrink-0">
        <Heart size={15} className="text-lavender-foreground" />
      </span>
      <p className="font-sans text-[14px] text-foreground/85 leading-[1.7]">
        <span className="font-semibold">If week 16 comes and goes without flutters,</span>{" "}
        you have done nothing wrong. Many people don't feel a thing until 20, 22, even 24 weeks. Your
        next scan and antenatal appointment will check that everything is exactly as it should be.
      </p>
    </div>
  </section>
);

/* 6. BODY */
const bodyNotes = [
  { Icon: Activity, title: "A visible, rounder bump", body: "Your uterus is now roughly halfway between your pubic bone and belly button. Loose clothes are starting to feel snug. Many people start to look pregnant rather than just bloated this week." },
  { Icon: Sparkles, title: "Returning energy", body: "First-trimester exhaustion has often eased. Many people describe a noticeable rise in energy, appetite and clarity in the second trimester — sometimes called the 'sweet spot' of pregnancy." },
  { Icon: Wind, title: "Stretching and pulling sensations", body: "As your uterus grows it pulls on the round ligaments that hold it in place. Sharp little twinges low down on either side, especially when you stand up or twist, are completely normal." },
];

const Body = () => (
  <section id="body" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="max-w-2xl mb-10">
        <SectionLabel>Your body this week</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
          More visible, more energetic, more obviously pregnant.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
          The middle of the second trimester is often when people stop feeling 'a bit pregnant' and start
          feeling visibly, embodied-ly pregnant. The bump arrives. The energy lifts. Strangers begin to
          notice.
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
    Icon: Hand, name: "Round ligament twinges",
    feels: "A short, sharp pull low down on one or both sides of your bump, especially when you stand up, sneeze, or twist.",
    why: "The ligaments that anchor your uterus to your pelvis are stretching as the uterus grows.",
    normal: "Very common. Worrying if the pain is severe, persistent, one-sided and constant, or comes with bleeding — call your midwife.",
  },
  {
    Icon: Sparkles, name: "Returning appetite and energy",
    feels: "Real hunger again. More mental clarity. More capacity for ordinary days.",
    why: "Hormonal shifts, the placenta now doing most of the heavy lifting, and the worst of nausea easing.",
    normal: "Very common in the mid second trimester. Lean into it gently — this is often the most physically generous part of pregnancy.",
  },
  {
    Icon: Brain, name: "Stuffy nose and nosebleeds",
    feels: "A blocked feeling, congestion, occasional nosebleeds — even without a cold.",
    why: "Higher blood volume and pregnancy hormones swell the lining of your nose. It's called pregnancy rhinitis.",
    normal: "Common. Saline sprays and a humidifier help. Heavy or repeated nosebleeds need a check.",
  },
  {
    Icon: Smile, name: "Bleeding gums",
    feels: "Pink on the toothbrush, gums that feel tender or look puffy.",
    why: "Hormones increase blood flow to the gums and make them more sensitive to plaque.",
    normal: "Very common. Brush gently, floss daily, see a dentist — NHS dental care is free during pregnancy and for a year after birth.",
  },
  {
    Icon: HeartPulse, name: "Mild breathlessness",
    feels: "A slight breathlessness on stairs, or mid-sentence, that wasn't there last month.",
    why: "Pregnancy hormones increase your breathing rate and your growing uterus is starting to take up more room.",
    normal: "Normal. Sudden severe breathlessness, chest pain or coughing blood needs urgent care.",
  },
  {
    Icon: Eye, name: "Skin changes — the 'mask of pregnancy'",
    feels: "Darker patches on your face (melasma), a darker line down your bump (linea nigra), or darker nipples and moles.",
    why: "Pregnancy hormones increase pigment-producing cells. Sun exposure makes it more obvious.",
    normal: "Very common and harmless. Most fades after birth. Sun cream helps now.",
  },
  {
    Icon: Footprints, name: "Mild leg cramps",
    feels: "A sudden tight cramp in your calf, often at night.",
    why: "Changes in circulation, mineral balance and a heavier body finding new posture.",
    normal: "Very common. Stretching the calf (toes towards your nose) usually helps. Ongoing severe pain in one leg, especially with redness or swelling, must be checked.",
  },
  {
    Icon: Brain, name: "Pregnancy 'brain fog'",
    feels: "Walking into rooms and forgetting why. Misplaced keys. Trailing off mid-sentence.",
    why: "Hormones, broken sleep, and a brain quietly reorganising itself for parenthood.",
    normal: "Universal. Frustrating, harmless, and temporary.",
  },
];

const Symptoms = () => (
  <section id="symptoms" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel>Common symptoms</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        What's likely to show up at week 16 — and what each one really means.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        The mid second trimester swaps first-trimester nausea and exhaustion for a softer, more
        embodied set of symptoms. Most are mild and reassuring. A handful are worth flagging.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
      {symptoms.map(({ Icon, name, feels, why, normal }) => (
        <article key={name}
          className="group relative bg-card rounded-2xl border border-border/40 p-6 md:p-7 shadow-card-brand hover:shadow-soft transition-all duration-500">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border/40">
            <span className="w-10 h-10 rounded-full bg-sage-bg/70 flex items-center justify-center">
              <Icon size={15} className="text-sage" />
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
      <Link to="/articles/the-second-trimester-body"
        className="inline-flex items-center gap-2 font-sans text-[13.5px] font-medium text-sage hover:gap-3 transition-all">
        Read: your body in the second trimester <ArrowRight size={13} />
      </Link>
    </div>
  </section>
);

/* 8. ANATOMY SCAN — Week 16 unique section */
const scanChecks = [
  { Icon: Calendar, title: "Usually between 18–21 weeks", body: "Your anatomy scan is normally booked for around 20 weeks. If you haven't had a date yet, it should arrive by post or text in the next week or two." },
  { Icon: Eye, title: "A detailed look at your baby", body: "The sonographer checks the brain, face, spine, heart, lungs, kidneys, abdomen, arms, legs, and the position of the placenta and umbilical cord." },
  { Icon: Stethoscope, title: "Measuring growth", body: "They measure your baby's head circumference, abdominal circumference and femur length to check growth is on track for dates." },
  { Icon: Hand, title: "Finding out the sex (if you'd like to)", body: "If you want to know your baby's sex, the scan is usually the earliest reliable opportunity — though you'll need to ask, and accuracy isn't guaranteed." },
  { Icon: Ear, title: "Most scans are reassuring", body: "The vast majority of anatomy scans show everything is exactly as expected. Try not to spend the next four weeks bracing for bad news." },
  { Icon: AlertTriangle, title: "If something is flagged", body: "Anything noted is followed up calmly with a senior sonographer or fetal medicine team. You will not be left to worry alone — there will always be a next step." },
];

const AnatomyScan = () => (
  <section id="anatomy-scan" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="max-w-2xl mb-10">
        <SectionLabel tone="terracotta">Looking ahead</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
          The 20-week anatomy scan begins to sit on the horizon.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
          For many, week 16 is the start of a quiet four-week wait. The anatomy scan (also called the
          mid-pregnancy or 20-week scan) is the most detailed look you'll get of your baby in the womb.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {scanChecks.map(({ Icon, title, body }) => (
          <div key={title}
            className="relative bg-card rounded-2xl border border-border/40 p-6 md:p-7 shadow-card-brand overflow-hidden">
            <span className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-terracotta/30 to-transparent" />
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
    </div>
  </section>
);

/* 9. EMOTIONAL */
const emotionalTruths = [
  "Quiet pride at how visible the bump is becoming.",
  "Mixed feelings about strangers noticing — comments, hands, advice.",
  "A new tenderness towards your own changing body.",
  "Excitement and anxious anticipation of the anatomy scan.",
  "Wishing you could feel the baby move more, or at all yet.",
  "Sudden weepiness at songs, adverts, your own reflection.",
  "A growing realisation that this is really happening.",
];

const Emotional = () => (
  <section id="emotional" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-2 relative bg-gradient-to-br from-lavender-bg via-parchment to-lavender-bg/40 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-9 shadow-card-brand overflow-hidden">
        <img src={botanicalAccent} alt="" aria-hidden="true"
          className="absolute right-0 top-0 w-24 opacity-35 pointer-events-none select-none" />
        <SectionLabel tone="lavender">Emotionally this week</SectionLabel>
        <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-4">
          The shift into 'visibly carrying'.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/80 leading-[1.8] mb-4">
          Week 16 is often the week your pregnancy starts to belong to the outside world too. Strangers
          notice. Colleagues guess. The bump becomes part of how you move through the day.
        </p>
        <p className="font-sans text-[14px] text-foreground/70 leading-[1.75]">
          Some people love this stage. Others feel watched. Both are valid responses to a body that is
          quietly making itself public.
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

/* 10. FOCUS */
const focusList = [
  { Icon: Hand, title: "Notice without measuring", note: "If you feel something flutter, just notice it. There's no need to count yet — that comes later. Most people don't have a clear pattern until 24–28 weeks." },
  { Icon: Calendar, title: "Confirm your anatomy scan date", note: "If you don't have a date for your 20-week scan yet, your midwife can chase it. You may need a plus-one and ID on the day." },
  { Icon: Hand, title: "Whooping cough vaccine — from now", note: "The whooping cough (pertussis) vaccine is offered any time from 16 weeks. Earlier means more protection passed to your baby for the first weeks of life." },
  { Icon: Activity, title: "Move in the way that feels good", note: "Walking, swimming, pregnancy yoga, gentle strength work. The mid second trimester is often the most physically generous window — use it kindly." },
  { Icon: Smile, title: "Book a dentist check-up", note: "NHS dental care is free during pregnancy and for a year after birth. Pregnancy hormones can make gums more reactive, and dental work is safer now than later." },
  { Icon: Baby, title: "Soft-start the practical thinking", note: "No need to buy yet. But quietly noticing what the next few months might need — clothes, leave, support — gently spreads the load." },
];

const Focus = () => (
  <section id="focus" className="bg-sage-bg/35 py-16 md:py-24 border-y border-border/30">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <SectionLabel>Focus this week</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.2rem] text-foreground leading-tight mb-4">
            Settle into the second trimester. Don't rush ahead of it.
          </h2>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8]">
            Week 16 is for soft attention, not big decisions. Most of what matters this month happens
            quietly inside you, not on a list.
          </p>
        </div>
        <div className="lg:col-span-8">
          <ol className="bg-card rounded-3xl border border-border/40 shadow-card-brand divide-y divide-border/40 overflow-hidden">
            {focusList.map(({ Icon, title, note }, i) => (
              <li key={title}
                className="group flex items-start gap-5 p-5 sm:p-6 md:p-7 hover:bg-sage-bg/25 transition-colors">
                <span className="w-10 h-10 rounded-full bg-sage-bg border border-border/40 flex items-center justify-center shrink-0">
                  <Icon size={15} className="text-sage" />
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

/* 11. SEEK SUPPORT */
const seekSupport = [
  "Heavy or bright red vaginal bleeding",
  "Severe or persistent one-sided lower-tummy pain",
  "Severe headache, vision changes or pain in your upper tummy",
  "Sudden swelling in your face or hands",
  "Fluid leaking from the vagina",
  "A high temperature, chills or feeling very unwell",
  "Severe itching, especially on palms and soles",
  "Persistent low mood, hopelessness, or feeling disconnected from the pregnancy",
];

const SeekSupport = () => (
  <section id="support" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl pt-16 md:pt-24 pb-12">
    <div className="relative bg-gradient-to-br from-stage-pregnancy/45 via-parchment to-parchment-dark/40 rounded-3xl border border-terracotta/20 p-8 md:p-10 shadow-card-brand overflow-hidden">
      <span className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-terracotta/30 to-transparent" />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
        <div className="md:col-span-4">
          <span className="inline-flex w-12 h-12 rounded-full bg-terracotta/15 items-center justify-center mb-4">
            <AlertTriangle size={18} className="text-terracotta" />
          </span>
          <SectionLabel tone="terracotta">When to seek care</SectionLabel>
          <h3 className="font-serif text-[1.4rem] sm:text-[1.5rem] md:text-[1.7rem] text-foreground leading-snug">
            If something feels wrong, it's worth a phone call.
          </h3>
          <p className="font-sans text-[13.5px] text-foreground/70 leading-[1.75] mt-3">
            Your midwife or maternity assessment unit would always rather check and reassure you. You
            will not be wasting their time.
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
    <div className="relative bg-sage-bg/45 rounded-3xl border border-border/30 p-8 sm:p-10 md:p-14 text-center overflow-hidden">
      <span className="absolute left-7 top-6 font-serif text-4xl text-sage/40 leading-none">“</span>
      <span className="absolute right-7 bottom-4 font-serif text-4xl text-sage/40 leading-none">”</span>
      <p className="font-serif italic text-[1.2rem] sm:text-[1.35rem] md:text-[1.6rem] text-foreground/90 leading-snug max-w-3xl mx-auto">
        Your body is doing something quiet and astonishing this week. You don't need to feel it for it to be true.
      </p>
      <Heart size={14} className="text-sage/60 mx-auto mt-5" />
    </div>
  </section>
);

/* 13. REFLECTION + ASK */
const reflectionPrompts = ["How my bump feels", "First flutters (or waiting for them)", "Hopes for the anatomy scan", "What's softening this week"];
const askChips = ["When will I feel my baby move?", "What is an anterior placenta?", "Whooping cough vaccine", "Anatomy scan questions", "Sleeping positions at 16 weeks"];

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
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.24em] uppercase text-sage">Ask about week 16</p>
            <h3 className="font-serif text-[1.3rem] sm:text-[1.35rem] text-foreground mt-0.5 leading-snug">A question on your mind?</h3>
          </div>
        </div>
        <p className="font-sans text-[13px] text-foreground/70 leading-relaxed mb-4">
          Get a calm, evidence-led answer tailored to where you are right now.
        </p>
        <input type="text" placeholder="e.g. Why can't I feel my baby move yet?"
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

/* 14. JOURNAL */
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
            The week before the bump shows up in every photo.
          </h3>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8] mb-6">
            Week 16 is one of those quietly significant weeks: the bump becoming visible, the first
            possible flutters, the slow turn from private to shared. The journal makes space to keep the
            small, ordinary moments before they're gone.
          </p>
          <ul className="space-y-2.5 mb-7">
            {[
              "Pages for first-flutter notes and bump milestones",
              "Space for hopes ahead of the anatomy scan",
              "Guided prompts through every week of pregnancy",
            ].map((line) => (
              <li key={line} className="flex items-start gap-2.5">
                <Check size={13} className="text-sage mt-1 shrink-0" />
                <span className="font-sans text-[13.5px] text-foreground/80">{line}</span>
              </li>
            ))}
          </ul>
          <Link to="/product"
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
  { slug: "baby-movements-in-pregnancy", img: secondMovementImg, tag: "Movement",
    title: "Your baby's first movements",
    desc: "What quickening feels like, when you're likely to feel it, and what to know if you can't yet." },
  { slug: "the-second-trimester-body", img: secondBodyImg, tag: "Body",
    title: "Your body in the second trimester",
    desc: "The bump, the energy, the stretching — what's happening and how to move with it." },
  { slug: "preparing-for-the-anatomy-scan", img: secondAnatomyImg, tag: "Looking ahead",
    title: "The 20-week anatomy scan",
    desc: "What's checked, how to prepare, and what happens if anything is flagged." },
  { slug: "second-trimester-anxiety", img: secondAnxietyImg, tag: "Emotions",
    title: "The quieter anxieties of the second trimester",
    desc: "Waiting for movement, waiting for scans, and the in-between feeling of being properly pregnant." },
  { slug: "eating-well-in-the-second-trimester", img: secondEatingImg, tag: "Nourish",
    title: "Eating well now energy returns",
    desc: "Honest food guidance for the trimester your appetite often comes back." },
  { slug: "second-trimester-sleep", img: secondSleepImg, tag: "Rest",
    title: "Sleep, dreams and rest at this stage",
    desc: "What's normal, what side to settle on, and the vivid dreams almost no one warned you about." },
];

const Related = () => (
  <section id="guidance" className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div className="max-w-xl">
          <SectionLabel>Read next, because of week 16</SectionLabel>
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
  { q: "When will I feel my baby move?",
    a: "Most people feel their first movements (called 'quickening') somewhere between 16 and 22 weeks. First-time mums tend to feel them later, often around 18–22 weeks. People who've been pregnant before may notice them sooner. If you have an anterior placenta — meaning your placenta is sitting at the front of your uterus — it acts as a cushion and you may not feel much until 22–24 weeks. None of these timelines mean anything is wrong." },
  { q: "What does it feel like when the baby first moves?",
    a: "Almost never the unmistakable kicks people imagine. First flutters often feel like bubbles, brushing, popcorn popping gently, or trapped wind that doesn't quite act like wind. Many people only realise hours or days later that what they were feeling was their baby." },
  { q: "Should I be feeling kicks every day at 16 weeks?",
    a: "No. At 16 weeks there is no expectation of a regular pattern, and no need to count anything. You're more likely to start noticing a true daily pattern between 24 and 28 weeks. From around 24 weeks onwards, any change in movement pattern should be reported to your maternity unit straight away." },
  { q: "I have an anterior placenta — does that affect the baby?",
    a: "No, it doesn't affect your baby's growth or wellbeing. It just means the placenta is sitting between your bump and the front of your uterus, which can cushion movements and delay when you start feeling them. Your scans will continue to monitor placental position." },
  { q: "Should I have the whooping cough vaccine?",
    a: "Yes, it's recommended in every pregnancy from 16 weeks onwards (ideally between 16 and 32 weeks). Whooping cough can be very serious in newborns who are too young for their own vaccine. Having it during pregnancy passes protection to your baby for their first weeks of life. Most people have it at the 16- or 28-week appointment." },
  { q: "Is it safe to sleep on my back at 16 weeks?",
    a: "Yes, at 16 weeks the bump isn't yet large enough to cause concern. From 28 weeks onwards, current UK advice is to settle to sleep on your side rather than your back. It's a sensible habit to start nudging into now if you can — but right now, comfort matters more than position." },
  { q: "Can I dye my hair, get my nails done, have a massage?",
    a: "Generally yes. Pregnancy-trained massage therapists are best, especially as the bump grows. Hair dye and nail products are considered safe in normal use; well-ventilated salons help. Avoid hot tubs, very hot baths and saunas — overheating is the actual concern." },
  { q: "When should I tell work I'm pregnant?",
    a: "Legally, you must inform your employer at least 15 weeks before your due date — which for most people falls around now. Many people choose to tell sooner if they need workplace adjustments, or wait a little longer. Telling earlier opens up your right to paid antenatal appointments." },
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
          Common questions at 16 weeks
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

/* 17. NEXT */
const Next = () => (
  <section className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
      <div className="bg-gradient-to-br from-sage-bg via-parchment to-stage-pregnancy/30 rounded-3xl border border-border/30 p-8 sm:p-10 md:p-14 text-center shadow-card-brand">
        <SectionLabel>Up next</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[1.95rem] md:text-[2.5rem] text-foreground leading-tight mb-3">
          Ready for week 17?
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 max-w-lg mx-auto mb-8 leading-[1.8]">
          The bump grows on. Movements may begin to clarify. The wait for the anatomy scan keeps gently
          turning towards real.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
          <Link to="/pregnancy/week/17"
            className="inline-flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium shadow-cta hover:bg-terracotta-hover transition-colors">
            Continue to week 17 <ArrowRight size={14} />
          </Link>
          <Link to="/pregnancy/second-trimester"
            className="inline-flex items-center justify-center gap-2 border border-foreground/25 text-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium hover:bg-parchment-dark transition-colors">
            Explore the second trimester
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const Week16Page = () => (
  <div className="min-h-screen bg-parchment">
    <Navbar />
    <Hero />
    <MetaBar />
    <AtAGlance />
    <Biology />
    <Quickening />
    <Body />
    <Symptoms />
    <AnatomyScan />
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

export default Week16Page;
