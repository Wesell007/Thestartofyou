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
  TestTube,
  ScanLine,
  Hand,
  Baby,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PregnancyWeekSeo from "@/components/seo/PregnancyWeekSeo";
import PublicWeekReflectionAsk from "@/components/pregnancy/PublicWeekReflectionAsk";
import fetusImg from "@/assets/week28-fetus.jpg";
import aubergineImg from "@/assets/week28-aubergine.jpg";
import biologyImg from "@/assets/week28-biology-detail.jpg";
import journalImg from "@/assets/journal-flatlay.jpg";
import botanicalTr from "@/assets/botanical-branch-tr.png";
import botanicalBl from "@/assets/botanical-branch-bl.png";
import botanicalAccent from "@/assets/article-botanical-accent.png";
import thirdMovementImg from "@/assets/article-hero-third-movement.jpg";
import thirdSleepImg from "@/assets/article-hero-third-sleep.jpg";
import thirdEmotionalImg from "@/assets/article-hero-third-emotional.jpg";
import thirdHospitalBagImg from "@/assets/article-hero-third-hospital-bag.jpg";
import thirdNurseryImg from "@/assets/article-hero-third-nursery.jpg";
import thirdSignsImg from "@/assets/article-hero-third-signs-of-labour.jpg";
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
    <div className="relative bg-gradient-to-br from-stage-pregnancy/45 via-parchment to-sage-bg/55 pt-20 pb-36 sm:pt-24 sm:pb-44 md:pt-32 md:pb-52">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[820px] h-[420px] rounded-full bg-terracotta/8 blur-3xl" />
        <div className="absolute -top-10 right-1/4 w-[260px] h-[260px] rounded-full bg-sage-light/30 blur-3xl" />
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
            { label: "Home", href: "/" },
            { label: "Pregnancy", href: "/pregnancy" },
            { label: "Third trimester", href: "/pregnancy/third-trimester" },
            { label: "Week 28", href: "/pregnancy/week/28" },
          ]}
        />

        <p className="font-sans text-[11px] font-semibold tracking-[0.3em] uppercase text-terracotta mb-5">
          Third Trimester · The final stretch begins
        </p>
        <h1 className="font-serif text-[2.5rem] sm:text-5xl md:text-[3.75rem] lg:text-[4.25rem] text-foreground leading-[1.04] tracking-tight mb-4 md:mb-5">
          28 Weeks Pregnant
        </h1>
        <p className="font-serif italic text-[1.05rem] sm:text-lg md:text-xl text-foreground/75 max-w-xl mx-auto leading-relaxed">
          You've crossed into the third trimester. Your baby is the size of an aubergine, the appointments quietly step up, and the work shifts towards bringing them safely home.
        </p>
      </div>

      <Link to="/pregnancy/week/27" aria-label="Go to week 27"
        className="absolute left-3 sm:left-6 md:left-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronLeft size={18} />
      </Link>
      <Link to="/pregnancy/week/29" aria-label="Go to week 29"
        className="absolute right-3 sm:right-6 md:right-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronRight size={18} />
      </Link>
    </div>

    <div className="relative -mt-28 sm:-mt-36 md:-mt-40 mb-6">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex items-end justify-center gap-5 sm:gap-10 md:gap-14">
          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-card border-[3px] border-sage/15 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={aubergineImg} alt="Aubergine" loading="lazy" width={512} height={512}
                className="w-full h-full object-cover" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.04]" />
            </div>
            <div className="text-center">
              <p className="font-serif italic text-[12.5px] text-foreground/80 leading-tight">aubergine</p>
              <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/55 mt-1">~37&nbsp;cm</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full bg-card border-[4px] border-terracotta/20 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={fetusImg}
                alt="Soft editorial illustration of a 28-week fetus curled head-down in the womb, with rounded cheeks, fine hair and visible eyelashes"
                width={1024} height={1024}
                loading="eager" decoding="async"
                className="w-full h-full object-cover scale-[1.02]" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.05]" />
            </div>
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.22em] uppercase text-foreground/65">Your baby this week</p>
          </div>

          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-stage-pregnancy/85 to-stage-pregnancy/40 border-[3px] border-terracotta/25 flex items-center justify-center shadow-elevated">
              <span className="font-serif text-[1.7rem] sm:text-[1.95rem] text-foreground tracking-tight leading-none">12</span>
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
  { id: "movement", label: "Movements", Icon: Hand },
  { id: "body", label: "Body changes", Icon: Activity },
  { id: "symptoms", label: "Symptoms", Icon: HeartPulse },
  { id: "appointments", label: "Appointments", Icon: Stethoscope },
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
              Updated for 2026 · 11 min read · Start of third trimester
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
  { label: "Stage", value: "Start of third trimester" },
  { label: "Baby size", value: "~37 cm — aubergine" },
  { label: "Baby weight", value: "Around 1 kg" },
  { label: "Appointments", value: "Stepping up — 28, 31, 34, 36, 38…" },
];

const AtAGlance = () => (
  <section id="at-a-glance" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl mb-14 md:mb-20">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 relative bg-gradient-to-br from-stage-pregnancy/45 via-parchment to-parchment-dark/50 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-10 overflow-hidden shadow-card-brand">
        <img src={botanicalAccent} alt="" aria-hidden="true"
          className="absolute -left-3 bottom-0 w-28 opacity-35 pointer-events-none select-none" />
        <SectionLabel tone="terracotta">At a glance</SectionLabel>
        <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-5">
          Week 28 is the door into the third trimester.
        </h2>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8] mb-4">
          Your baby is now a kilo or so, with eyelashes, fine hair and skin starting to plump out as fat
          builds beneath. Their lungs are practising breathing movements, and they can hear and respond
          to your voice.
        </p>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8]">
          For you, this week often brings a noticeable physical shift — heavier, slower, fuller — and a
          quiet step-up in care. Your 28-week appointment usually includes blood tests, the start of the
          glucose tolerance test for some, and an Anti-D injection if your blood type is rhesus negative.
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
  { title: "Lungs practising breathing", body: "Your baby is making rhythmic breathing movements with amniotic fluid, training the diaphragm and chest muscles for the first breaths after birth." },
  { title: "Eyes that can open", body: "The eyelids, fused since around week 9, have now opened. Your baby can blink, sense light through the abdominal wall, and is developing early sleep–wake cycles." },
  { title: "A working sense of hearing", body: "Your voice, your partner's voice, your heartbeat and the muffled sounds of the world outside are now part of your baby's daily experience." },
  { title: "Plumping out", body: "A layer of fat is being laid down under the skin. Cheeks are rounding, the wrinkled look is softening, and your baby is starting to look more like a newborn than a tiny fetus." },
];

const Biology = () => (
  <section id="biology" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="relative rounded-3xl overflow-hidden border border-border/40 shadow-card-brand">
            <div className="aspect-[4/5]">
              <img src={biologyImg} alt="Soft editorial close-up of a 28-week fetus with rounded cheeks, fine eyelashes, and gently curled limbs"
                loading="lazy" width={1024} height={1280}
                className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-foreground/60 to-transparent">
              <p className="font-serif italic text-[13px] text-background/95 leading-snug">
                Eyes opening to muted light, ears listening, lungs quietly rehearsing.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <SectionLabel>What's underway biologically</SectionLabel>
          <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-5">
            Week 28 is the week your baby starts looking like a newborn.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8] mb-8 max-w-2xl">
            Babies born from now on are increasingly likely to do well with neonatal support — survival
            rates around 28 weeks are above 90% in well-resourced settings. Your baby is still safest
            inside, but the milestones being passed each week now are quietly significant.
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

/* 5. MOVEMENTS — Week 28 unique section */
const movementPoints = [
  { Icon: Hand, title: "Get to know your baby's pattern", body: "By 28 weeks, most people can sense a recognisable pattern: when their baby tends to be active, and when they rest. There is no set 'normal number' of movements — only your baby's normal." },
  { Icon: Eye, title: "Watch for changes, not counts", body: "Current UK guidance no longer recommends counting kicks. What matters is noticing if the pattern, strength or character of movements changes from what's usual for your baby." },
  { Icon: AlertTriangle, title: "Always call about reduced movements", body: "If you think your baby is moving less, less strongly, or differently from usual — even briefly — phone your maternity unit straight away. Day or night. Every time. Don't wait." },
  { Icon: Moon, title: "It's never wasted to call", body: "Maternity teams would always rather check and reassure you than have you wait. You will not be a nuisance. You're doing exactly what they want you to do." },
];

const Movement = () => (
  <section id="movement" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel tone="terracotta">Movements</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        From here on, your baby's movements are the most important thing you'll track.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        Movement awareness is one of the central themes of the third trimester. Your baby's pattern is
        their language — and any change is information worth acting on.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {movementPoints.map(({ Icon, title, body }) => (
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

    <div className="mt-6 bg-stage-pregnancy/40 border border-terracotta/20 rounded-2xl p-6 md:p-7 flex flex-col sm:flex-row sm:items-start gap-4">
      <span className="w-10 h-10 rounded-full bg-card border border-terracotta/20 flex items-center justify-center shrink-0">
        <HeartPulse size={15} className="text-terracotta" />
      </span>
      <p className="font-sans text-[14px] text-foreground/85 leading-[1.7]">
        <span className="font-semibold">If you ever notice a change in your baby's movements,</span>{" "}
        do not wait until morning, do not have a sugary drink and 'see what happens', do not delay.
        Phone your maternity assessment unit. Anytime, every time.
      </p>
    </div>
  </section>
);

/* 6. BODY */
const hormoneNotes = [
  { Icon: Activity, title: "A noticeably bigger bump", body: "Your uterus is now well above your belly button. The bump is starting to affect how you sit, sleep, climb stairs and even breathe — all completely normal." },
  { Icon: Wind, title: "Breathlessness", body: "Your uterus is pressing up under your diaphragm, leaving less room for your lungs. Climbing one flight of stairs may now feel like it shouldn't." },
  { Icon: Footprints, title: "Pelvic and back ache", body: "Hormones (especially relaxin) are softening ligaments to prepare for birth, while extra weight changes your posture. Both add up to a more achy lower back, hips and pelvis." },
];

const Body = () => (
  <section id="body" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="max-w-2xl mb-10">
        <SectionLabel tone="terracotta">Your body this week</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
          Heavier, fuller, slower — and that's normal.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
          The third trimester arrives in your body before it arrives in your head. Many people describe
          a sudden sense of 'oh, I'm really pregnant now' in the days around week 28.
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
    </div>
  </section>
);

/* 7. SYMPTOMS */
const symptoms = [
  {
    Icon: Moon, name: "Disturbed sleep",
    feels: "Waking three or four times a night to wee, turn over, or just because. Trouble getting comfortable in any position.",
    why: "A heavy bump, hormonal sleep changes, more vivid dreams, and a baby who is often most active when you finally lie still.",
    normal: "Universal. Side-lying with a pillow between your knees, and another supporting the bump, often helps. Sleep on your side from now (left preferred) — it's safer for your baby.",
  },
  {
    Icon: Footprints, name: "Pelvic and lower back pain",
    feels: "An ache around the hips, pubic bone or lower back, especially after walking, standing, or rolling over in bed.",
    why: "Relaxin softens joints; the bump shifts your centre of gravity; pelvic-floor and core muscles are quietly working overtime.",
    normal: "Common. Sharp pubic-bone pain or a 'clicking' feeling can be PGP (pelvic girdle pain) — physiotherapy helps and your midwife can refer you.",
  },
  {
    Icon: Wind, name: "Breathlessness",
    feels: "Out of breath after one flight of stairs, mid-sentence, or just sitting up.",
    why: "Your diaphragm is being pushed up by the uterus, and your blood volume is at its peak — your heart and lungs are working harder.",
    normal: "Normal. Sudden, severe breathlessness with chest pain or coughing blood is not — call 999.",
  },
  {
    Icon: Droplet, name: "Swelling in feet and ankles",
    feels: "Shoes feeling tighter by evening. A puffy look around the ankles, sometimes the hands.",
    why: "Higher fluid volume, gravity, and pressure from the uterus on the veins returning blood from the legs.",
    normal: "Normal in moderation. Sudden swelling in the face or hands, especially with headache or visual changes, must be checked the same day — it can be a sign of pre-eclampsia.",
  },
  {
    Icon: HeartPulse, name: "Braxton Hicks",
    feels: "A tightening across the bump that lasts a minute or two, sometimes uncomfortable, then eases.",
    why: "Practice contractions. Your uterus is tuning up for labour, sometimes weeks or months in advance.",
    normal: "Common from now. Painful, regular tightenings, especially with bleeding, leaking or pressure low down, need to be assessed in case of preterm labour.",
  },
  {
    Icon: Brain, name: "Heartburn and reflux",
    feels: "A burning sensation behind the breastbone, especially after meals or at night when you lie down.",
    why: "Hormones relax the valve at the top of the stomach, and the uterus is pushing up against your stomach.",
    normal: "Very common. Smaller meals, propping up with pillows at night, and pregnancy-safe antacids (ask your pharmacist) usually help.",
  },
  {
    Icon: Eye, name: "Itchy skin",
    feels: "A stretched, itchy bump. Tightness across the breasts and abdomen.",
    why: "Skin is stretching faster than it can keep up; hormones can also make you itchier in general.",
    normal: "Common. Severe itching, especially on palms, soles, or worse at night, must be checked — it can be a sign of obstetric cholestasis, which needs treatment.",
  },
  {
    Icon: Heart, name: "Colostrum leaking",
    feels: "Tiny clear or yellowish drops on your bra, sometimes nothing more than damp patches.",
    why: "Your breasts are starting to produce colostrum — the first concentrated milk — well before your baby arrives.",
    normal: "Normal from now. Bras with breast pads can help. The absence of leaking does not mean you won't make milk.",
  },
];

const Symptoms = () => (
  <section id="symptoms" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel>Common symptoms</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        What's likely to show up at week 28 — and what each one really means.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        The third trimester brings its own collection of symptoms. Most are uncomfortable but normal.
        A handful are worth knowing about because they signal something that needs checking.
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
      <Link to="/articles/sleep-in-pregnancy"
        className="inline-flex items-center gap-2 font-sans text-[13.5px] font-medium text-sage hover:gap-3 transition-all">
        Read: sleeping in the third trimester <ArrowRight size={13} />
      </Link>
    </div>
  </section>
);

/* 8. APPOINTMENTS — Week 28 unique section */
const appointmentChecks = [
  { Icon: Stethoscope, title: "Your 28-week appointment", body: "Blood pressure, urine, fundal height (measuring the bump), listening to the baby's heartbeat, and a conversation about how you're feeling — physically and emotionally." },
  { Icon: TestTube, title: "Bloods to check iron and antibodies", body: "Most people are offered repeat blood tests around 28 weeks to check for anaemia and any antibodies that could affect the baby." },
  { Icon: Droplet, title: "Anti-D injection (if rhesus negative)", body: "If your blood type is RhD negative, you'll be offered Anti-D at 28 weeks (sometimes also at 34) to protect this and any future pregnancies." },
  { Icon: ScanLine, title: "Glucose tolerance test (for some)", body: "Offered if you have risk factors for gestational diabetes. A fasting blood test, a sweet drink, then a second blood test two hours later." },
  { Icon: Hand, title: "Whooping cough vaccine", body: "Offered any time from around 16 weeks, but commonly given at the 28-week appointment if you haven't had it yet. It protects your baby in the first weeks of life." },
  { Icon: Calendar, title: "More frequent appointments from here", body: "After this, your antenatal visits usually happen at weeks 31, 34, 36, 38, 40 — and often weekly past your due date." },
];

const Appointments = () => (
  <section id="appointments" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="max-w-2xl mb-10">
        <SectionLabel tone="lavender">Care this week</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
          The 28-week appointment is one of the busiest of your pregnancy.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
          From here, your team checks in more often. The intent is to catch the few things that benefit
          from early notice — gestational diabetes, anaemia, blood pressure, baby's growth — long before
          they would become a problem.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {appointmentChecks.map(({ Icon, title, body }) => (
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
    </div>
  </section>
);

/* 9. EMOTIONAL */
const emotionalTruths = [
  "Realising the end is closer than the beginning.",
  "Feeling proud of how far your body has carried this — and exhausted by it.",
  "A quiet rise in birth anxiety, especially in the small hours.",
  "Worrying about every change in movement, then worrying about worrying.",
  "Strong nesting urges that don't always make logical sense.",
  "Wanting to stop work soon, even if you'd planned to push on.",
  "Tender, weepy moments at the thought that they'll soon be here.",
];

const Emotional = () => (
  <section id="emotional" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-2 relative bg-gradient-to-br from-lavender-bg via-parchment to-lavender-bg/40 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-9 shadow-card-brand overflow-hidden">
        <img src={botanicalAccent} alt="" aria-hidden="true"
          className="absolute right-0 top-0 w-24 opacity-35 pointer-events-none select-none" />
        <SectionLabel tone="lavender">Emotionally this week</SectionLabel>
        <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-4">
          The shift into 'soon'.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/80 leading-[1.8] mb-4">
          The third trimester changes the maths. Suddenly the time left is shorter than the time you've
          already done. Practical lists get longer. Sleep gets shorter. Feelings get bigger.
        </p>
        <p className="font-sans text-[14px] text-foreground/70 leading-[1.75]">
          Birth anxiety, tender excitement and quiet grief for your pre-baby life can all live in the
          same week. None of them mean anything is wrong.
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
  { Icon: Hand, title: "Get to know your baby's pattern", note: "Pay quiet attention to when they're active and when they rest. Phone your maternity unit straight away if anything changes." },
  { Icon: Stethoscope, title: "Attend your 28-week appointment", note: "Bloods, blood pressure, urine, fundal height, Anti-D if rhesus negative, and a chance to ask anything that's on your mind." },
  { Icon: Moon, title: "Switch to side-sleeping", note: "From 28 weeks, sleeping on your side (left if possible) is safer for your baby. Pillows between knees and under the bump help." },
  { Icon: Footprints, title: "Move gently and often", note: "Short, regular walks; pregnancy yoga; pelvic-floor work. You don't need to go hard — you need to keep moving." },
  { Icon: TestTube, title: "Take iron seriously if levels are low", note: "Iron deficiency in late pregnancy makes everything harder. If you're prescribed iron, take it. Vitamin C alongside helps absorption." },
  { Icon: Baby, title: "Start the slow build to ready", note: "Baby essentials list. Hospital bag thinking. Birth preferences notes. Nothing dramatic — small kind decisions over the coming weeks." },
];

const Focus = () => (
  <section id="focus" className="bg-sage-bg/35 py-16 md:py-24 border-y border-border/30">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <SectionLabel tone="terracotta">Focus this week</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.2rem] text-foreground leading-tight mb-4">
            Begin the gentle pivot from carrying to preparing.
          </h2>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8]">
            Week 28 is not a panic week. It's the start of a longer, calmer arc towards birth.
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

/* 11. SEEK SUPPORT */
const seekSupport = [
  "Any change in your baby's movement pattern — call straight away",
  "Severe headache, vision changes or pain in your upper tummy",
  "Sudden swelling in your face or hands",
  "Severe itching, especially on palms and soles or worse at night",
  "Vaginal bleeding or fluid leaking from the vagina",
  "Regular painful tightenings before 37 weeks",
  "A high temperature, chills or feeling very unwell",
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
            Trust your instincts. Always.
          </h3>
          <p className="font-sans text-[13.5px] text-foreground/70 leading-[1.75] mt-3">
            Your maternity assessment unit is open 24 hours. You will not be a nuisance, ever.
            Phone first; in an emergency, dial 999.
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
        You are heavier this week because you are carrying more — a person, their world, your changing life. Slow is not a failing. Slow is the right pace for what you're doing.
      </p>
      <Heart size={14} className="text-terracotta/60 mx-auto mt-5" />
    </div>
  </section>
);

/* 13. REFLECTION + ASK */
const reflectionPrompts = ["How my body feels", "What I'm hoping for in birth", "What I've already done", "What I'm afraid of"];
const askChips = ["Reduced movements", "Glucose tolerance test", "Sleeping on my side", "Hospital bag", "Birth preferences"];

const ReflectionAsk = () => (
  <PublicWeekReflectionAsk
    week={28}
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
            The third trimester deserves more than a list.
          </h3>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8] mb-6">
            What you're carrying right now — the bump, the appointments, the nights of patterns and
            kicks, the soft fear and the bigger hope — is worth a record. The journal makes room for the
            heaviness and the tenderness, side by side.
          </p>
          <ul className="space-y-2.5 mb-7">
            {[
              "Pages for movement notes and appointment summaries",
              "Space for birth preferences as they evolve",
              "Guided prompts through every week to birth",
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
  { slug: "baby-movement-in-pregnancy", img: thirdMovementImg, tag: "Movement",
    title: "Your baby's movements",
    desc: "What's normal at 28 weeks, why patterns matter more than counts, and exactly when to call." },
  { slug: "sleep-in-pregnancy", img: thirdSleepImg, tag: "Body",
    title: "Sleeping in the third trimester",
    desc: "Side-sleeping, pillows, restless legs and the dreams that come with a heavier bump." },
  { slug: "emotional-wellbeing-pregnancy", img: thirdEmotionalImg, tag: "Emotions",
    title: "The third trimester, emotionally",
    desc: "Birth anxiety, nesting, tender excitement, and the quiet shift into 'soon'." },
  { slug: "hospital-bag-and-what-to-pack", img: thirdHospitalBagImg, tag: "Practical",
    title: "What to actually pack in your hospital bag",
    desc: "An honest, kept-list of what helps in labour, after birth, and for the journey home." },
  { slug: "the-space-your-baby-will-come-home-to", img: thirdNurseryImg, tag: "At home",
    title: "Preparing your space",
    desc: "What you need before baby arrives, what can wait, and what you can buy second-hand without worry." },
  { slug: "signs-of-labour", img: thirdSignsImg, tag: "Looking ahead",
    title: "The early signs of labour",
    desc: "Braxton Hicks vs the real thing, when to call, and what your body might do in the days before." },
];

const Related = () => (
  <section id="guidance" className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div className="max-w-xl">
          <SectionLabel>Read next, because of week 28</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.4rem] text-foreground leading-tight">
            Curated guidance for what's likely on your mind right now.
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

/* 16. FAQ */
const faqs = [
  { q: "How often should my baby move at 28 weeks?",
    a: "There is no set 'normal number' of movements. By 28 weeks most people can sense a recognisable pattern of when their baby is active and resting. What matters is the pattern. If you ever notice that movements are reduced, weaker, or different from usual — even briefly — phone your maternity unit straight away. Anytime, every time. Don't wait, don't try sugary drinks first, don't 'see how it goes overnight'." },
  { q: "Why do I need to sleep on my side now?",
    a: "Research shows that sleeping on your back from the third trimester is linked to a small but real increase in stillbirth risk. The advice from 28 weeks is to settle to sleep on your side — left if possible, but either side is fine. If you wake up on your back, just turn over. You haven't done any harm." },
  { q: "What is the glucose tolerance test (GTT)?",
    a: "It's a test for gestational diabetes. You fast overnight, have a fasting blood test, drink a sugary glucose drink, then have a second blood test two hours later. It's offered to people with risk factors (BMI, family history, previous GD, certain ethnic backgrounds, or previous large baby). If you're diagnosed, the team will support you with diet, monitoring, and sometimes medication." },
  { q: "What is Anti-D and do I need it?",
    a: "Anti-D is an injection given to people who are RhD blood-group negative. It prevents your body making antibodies that could affect this or future pregnancies if your baby is RhD positive. It's offered routinely at 28 weeks (and sometimes also at 34) and after any bleeding episode. It's not needed if you're RhD positive." },
  { q: "Are Braxton Hicks normal at 28 weeks?",
    a: "Yes. Many people start to notice irregular tightenings — the uterus quietly practising — from around now. They're usually painless or mildly uncomfortable, last a minute or two, and ease off. Painful, regular tightenings, or any with bleeding, leaking fluid or pressure low down, need to be checked in case of preterm labour." },
  { q: "Should I have the whooping cough vaccine?",
    a: "It's recommended for every pregnancy, ideally between weeks 16 and 32, because it gives your baby protection in the first weeks of life when they're too young for their own jab. Whooping cough can be very serious in newborns. You can have it at the 28-week appointment if you haven't already." },
  { q: "Is itchy skin always something to worry about?",
    a: "Often it's just stretched skin or pregnancy hormones. But severe itching — especially on the palms of your hands and soles of your feet, often worse at night — can be a sign of obstetric cholestasis, a liver condition that needs treatment to keep your baby safe. Always mention persistent itching to your midwife so they can do a blood test." },
  { q: "Should I start writing a birth plan now?",
    a: "If you'd like to. There's no rush — many people start jotting down preferences from around now and refine them at later appointments. A 'birth preferences' document is more useful than a fixed plan: it tells your team what matters to you while leaving room for what your body and baby decide on the day." },
];

/* 17. NEXT */
const Next = () => (
  <section className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
      <div className="bg-gradient-to-br from-sage-bg via-parchment to-stage-pregnancy/30 rounded-3xl border border-border/30 p-8 sm:p-10 md:p-14 text-center shadow-card-brand">
        <SectionLabel>Up next</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[1.95rem] md:text-[2.5rem] text-foreground leading-tight mb-3">
          Ready for week 29?
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 max-w-lg mx-auto mb-8 leading-[1.8]">
          The third trimester rhythm settles in. Your baby keeps growing, your body keeps adapting, and
          the small kind preparations of these next weeks quietly add up.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
          <Link to="/pregnancy/week/29"
            className="inline-flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium shadow-cta hover:bg-terracotta-hover transition-colors">
            Continue to week 29 <ArrowRight size={14} />
          </Link>
          <Link to="/pregnancy/third-trimester"
            className="inline-flex items-center justify-center gap-2 border border-foreground/25 text-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium hover:bg-parchment-dark transition-colors">
            Explore the third trimester
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const Week28Page = () => (
  <div className="min-h-screen bg-parchment">
    <PregnancyWeekSeo weekNumber={28} />
    <Navbar />
    <Hero />
    <MetaBar />
    <AtAGlance />
    <Biology />
    <Movement />
    <Body />
    <Symptoms />
    <Appointments />
    <Emotional />
    <Focus />
    <SeekSupport />
    <Quote />
    <ReflectionAsk />
    <Journal />
    <Related />
    <WeekCommonQuestions week={28} questions={buildWeekQuestions(28, faqs)} />
    <WeekSources week={28} sources={getWeekSources(28)} />
    <Next />
    <Footer />
  </div>
);

export default Week28Page;
