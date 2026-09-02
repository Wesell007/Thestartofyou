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
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PregnancyWeekSeo from "@/components/seo/PregnancyWeekSeo";
import PublicWeekReflectionAsk from "@/components/pregnancy/PublicWeekReflectionAsk";
import fetusImg from "@/assets/week36-fetus.jpg";
import romaineImg from "@/assets/week36-romaine.jpg";
import biologyImg from "@/assets/week36-biology-detail.jpg";
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
        <Breadcrumbs
          tone="section"
          className="flex justify-center mb-6 sm:mb-7 font-sans text-[12px] font-normal text-foreground/65"
          items={[
            { label: "Home", href: "/" },
            { label: "Pregnancy", href: "/pregnancy" },
            { label: "Third trimester", href: "/pregnancy/third-trimester" },
            { label: "Week 36", href: "/pregnancy/week/36" },
          ]}
        />

        <p className="font-sans text-[11px] font-semibold tracking-[0.3em] uppercase text-terracotta mb-5">
          Third Trimester · Almost term
        </p>
        <h1 className="font-serif text-[2.5rem] sm:text-5xl md:text-[3.75rem] lg:text-[4.25rem] text-foreground leading-[1.04] tracking-tight mb-4 md:mb-5">
          36 Weeks Pregnant
        </h1>
        <p className="font-serif italic text-[1.05rem] sm:text-lg md:text-xl text-foreground/75 max-w-xl mx-auto leading-relaxed">
          Your baby is the size of a romaine lettuce, considered late preterm and very nearly term. Your body is heavier, slower, and quietly making everything ready.
        </p>
      </div>

      <Link to="/pregnancy/week/35" aria-label="Go to week 35"
        className="absolute left-3 sm:left-6 md:left-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronLeft size={18} />
      </Link>
      <Link to="/pregnancy/week/37" aria-label="Go to week 37"
        className="absolute right-3 sm:right-6 md:right-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronRight size={18} />
      </Link>
    </div>

    <div className="relative -mt-28 sm:-mt-36 md:-mt-40 mb-6">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex items-end justify-center gap-5 sm:gap-10 md:gap-14">
          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-card border-[3px] border-sage/15 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={romaineImg} alt="Romaine lettuce" loading="lazy" width={512} height={512}
                className="w-full h-full object-cover" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.04]" />
            </div>
            <div className="text-center">
              <p className="font-serif italic text-[12.5px] text-foreground/80 leading-tight">romaine</p>
              <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/55 mt-1">~47&nbsp;cm</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full bg-card border-[4px] border-terracotta/25 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={fetusImg}
                alt="Soft editorial illustration of a 36-week fetus curled head-down in the womb, plump cheeks, fine hair and engaged low in the pelvis"
                width={1024} height={1024}
                loading="eager" decoding="async"
                className="w-full h-full object-cover scale-[1.02]" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.05]" />
            </div>
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.22em] uppercase text-foreground/65">Your baby this week</p>
          </div>

          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-stage-pregnancy/85 to-stage-pregnancy/40 border-[3px] border-terracotta/25 flex items-center justify-center shadow-elevated">
              <span className="font-serif text-[1.7rem] sm:text-[1.95rem] text-foreground tracking-tight leading-none">4</span>
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
  { id: "position", label: "Position & engagement", Icon: Baby },
  { id: "body", label: "Body changes", Icon: Activity },
  { id: "symptoms", label: "Symptoms", Icon: HeartPulse },
  { id: "labour-signs", label: "Labour signs", Icon: Stethoscope },
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
              Updated for 2026 · 12 min read · Late third trimester
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
  { label: "Stage", value: "Late third trimester" },
  { label: "Baby size", value: "~47 cm — romaine lettuce" },
  { label: "Baby weight", value: "Around 2.6 kg" },
  { label: "Term in", value: "1 week (37 weeks = early term)" },
];

const AtAGlance = () => (
  <section id="at-a-glance" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl mb-14 md:mb-20">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 relative bg-gradient-to-br from-stage-pregnancy/55 via-parchment to-parchment-dark/50 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-10 overflow-hidden shadow-card-brand">
        <img src={botanicalAccent} alt="" aria-hidden="true"
          className="absolute -left-3 bottom-0 w-28 opacity-35 pointer-events-none select-none" />
        <SectionLabel tone="terracotta">At a glance</SectionLabel>
        <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-5">
          Week 36 is the doorway to term.
        </h2>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8] mb-4">
          Your baby is around 2.6 kg now, with full features, a thick layer of fat, soft hair on their
          head and almost-complete lungs. The vernix coating their skin is thinning. Most babies are
          settling head-down and beginning to engage in the pelvis.
        </p>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8]">
          Your body is heavier, lower, more uncomfortable — and also remarkably ready. Appointments are
          weekly or fortnightly now. Hospital bags get checked twice. Sleep gets harder. Birth begins to
          feel close enough to think about properly.
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
  { title: "Lungs almost ready", body: "Your baby's lungs are producing surfactant — the substance that lets them inflate properly with the first breath. By 36 weeks, lungs are nearly mature and many babies born now breathe without help." },
  { title: "Plump and full-faced", body: "A thick layer of fat is now under the skin, smoothing out the wrinkled look from earlier weeks. Cheeks are full, limbs are rounded, and your baby looks unmistakably like a newborn." },
  { title: "Vernix and lanugo shedding", body: "The cheesy white vernix that has protected their skin is being shed and swallowed, along with most of the fine lanugo hair. These build up in the bowel as meconium — the first nappy after birth." },
  { title: "A working immune system", body: "Antibodies are crossing the placenta from you in their final weeks of build-up, giving your baby a starter pack of immunity for the early weeks of life outside the womb." },
];

const Biology = () => (
  <section id="biology" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="relative rounded-3xl overflow-hidden border border-border/40 shadow-card-brand">
            <div className="aspect-[4/5]">
              <img src={biologyImg} alt="Soft editorial close-up of a 36-week fetus curled head-down with full cheeks, fine hair and peaceful sleeping features"
                loading="lazy" width={1024} height={1280}
                className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-foreground/60 to-transparent">
              <p className="font-serif italic text-[13px] text-background/95 leading-snug">
                Plump, peaceful, almost finished. Almost ready to meet you.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <SectionLabel>What's underway biologically</SectionLabel>
          <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-5">
            Week 36 is the week your baby finishes the last quiet pieces of being ready.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8] mb-8 max-w-2xl">
            From 37 weeks, your baby is officially 'early term' — meaning if labour begins, it is no
            longer considered preterm. Week 36 is the very last week of the technically-preterm window,
            and the work happening now is mostly fine-tuning: lung surfactant, fat stores, immune
            transfer, brain growth.
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

/* 5. POSITION & ENGAGEMENT — Week 36 unique section */
const positionPoints = [
  { Icon: Baby, title: "Most babies are head-down by now", body: "Around 95% of babies have settled head-down (cephalic) by 36 weeks. Your midwife will check the position by feeling your bump (palpation) at every appointment from now." },
  { Icon: AlertTriangle, title: "If your baby is breech", body: "About 3–4% of babies are still breech at 36 weeks. If yours is, you'll usually be offered a procedure called ECV (external cephalic version) at around 36–37 weeks to try to gently turn them. It's safe, often successful, and you can decline." },
  { Icon: Footprints, title: "What 'engaged' means", body: "Engagement is when your baby's head drops down into the pelvis ready for birth. Midwives describe it in fifths — 'three-fifths palpable' meaning two-fifths are inside the pelvis. First babies often engage from now; second and later babies may not until labour starts." },
  { Icon: Wind, title: "The 'lightening' feeling", body: "When your baby engages, you may suddenly find it easier to breathe and eat — but harder to walk, with new pelvic pressure and more frequent weeing. People often call this 'baby has dropped'." },
];

const Position = () => (
  <section id="position" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel tone="terracotta">Position & engagement</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        Your baby's position becomes a real focus from now.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        From 36 weeks, midwives pay close attention to which way up your baby is and whether their head
        is starting to drop into the pelvis. Both shape what your final weeks — and birth — may look like.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {positionPoints.map(({ Icon, title, body }) => (
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
        <span className="font-semibold">Movements should still feel strong and regular at 36 weeks,</span>{" "}
        even if the kicks feel tighter and more rolling now there's less room. Any change in pattern,
        strength or character — call your maternity assessment unit straight away. Day or night.
      </p>
    </div>
  </section>
);

/* 6. BODY */
const bodyNotes = [
  { Icon: Wind, title: "Pelvic pressure and 'lightning crotch'", body: "As your baby engages, sharp shooting pains in the cervix or pubic area are very common. Pressure on nerves can cause sudden zings down through the vagina or thighs — uncomfortable but not dangerous." },
  { Icon: Moon, title: "Sleep at its hardest", body: "Heaviness, the bump, hip ache, restless legs, frequent weeing and a busy mind all gang up. Side-sleeping with pillows everywhere is the standard answer. Naps in the day are not lazy — they're sensible." },
  { Icon: Footprints, title: "Heaviness, swelling, slowness", body: "Walking feels different. Stairs feel longer. Ankles puff by evening. Your body is doing extraordinary work supporting two skeletons and a placenta — slow is not weakness." },
];

const Body = () => (
  <section id="body" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="max-w-2xl mb-10">
        <SectionLabel tone="terracotta">Your body this week</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
          Heavier, fuller, slower — and quietly remarkable.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
          The last weeks of pregnancy ask a lot of your body. Most of it is normal. Some of it is the
          first whispers of labour beginning to tune up.
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
    Icon: HeartPulse, name: "Stronger Braxton Hicks",
    feels: "Tightenings across the bump that may now feel firm and uncomfortable, sometimes coming several times an hour, then easing.",
    why: "Your uterus is rehearsing for labour and may be quietly ripening the cervix.",
    normal: "Very common. Painful, regular, increasingly intense tightenings — especially with low-down pressure, leaking, or any bleeding — need to be assessed in case labour has started.",
  },
  {
    Icon: Wind, name: "Pelvic pressure and lightning crotch",
    feels: "Sharp, electric pains low down through the cervix, pubic bone or vagina. Sometimes one-sided, sometimes both.",
    why: "Your baby's head pressing into nerves and engaging into the pelvis.",
    normal: "Very common in late pregnancy. Sharp, but not dangerous unless paired with bleeding, leaking or persistent regular tightenings.",
  },
  {
    Icon: Moon, name: "Disturbed sleep",
    feels: "Waking three or four times to wee, turn over, or just because. Trouble getting comfortable in any position.",
    why: "A heavy bump, hormonal sleep changes, vivid dreams, hip pressure, restless legs.",
    normal: "Universal. Pillow between knees, pillow under bump, sleep on your side (left preferred). Day naps count.",
  },
  {
    Icon: Droplet, name: "Swelling and puffiness",
    feels: "Tighter shoes, puffier ankles, sometimes swollen fingers or face by evening.",
    why: "Higher fluid volume, gravity, and pressure on the veins returning blood from the legs.",
    normal: "Normal in moderation. Sudden swelling in the face or hands, especially with headache or vision changes, must be checked the same day — sign of pre-eclampsia.",
  },
  {
    Icon: Footprints, name: "Pelvic girdle pain (PGP)",
    feels: "Sharp pubic-bone pain when walking, getting in and out of cars, or rolling in bed. Sometimes a clicking feeling.",
    why: "Relaxin softens the pelvic joints; your baby's weight pushes against them.",
    normal: "Common. Physiotherapy genuinely helps — ask your midwife for a referral. Support belts and avoiding wide-leg movements (stairs one at a time) ease it.",
  },
  {
    Icon: Heart, name: "Colostrum leaking",
    feels: "Damp patches on your bra, drops of clear or yellowish fluid.",
    why: "Your breasts are producing colostrum — the first concentrated milk — ready for your baby.",
    normal: "Normal from now. Some people leak a lot, some not at all — neither predicts feeding success. Some hand-express colostrum from 36 weeks if advised.",
  },
  {
    Icon: Brain, name: "Strong nesting urges",
    feels: "Sudden, intense need to clean, sort, organise, prepare. Sometimes wakeful in the night with a list.",
    why: "Hormonal shifts and a quiet biological pull towards making the space ready.",
    normal: "Very common in the final weeks. Ride the energy gently — don't end up exhausted before labour.",
  },
  {
    Icon: Eye, name: "A 'show'",
    feels: "A small amount of pink, brown or jelly-like discharge — sometimes streaked with blood.",
    why: "The mucus plug that has sealed your cervix is starting to come away as the cervix softens.",
    normal: "Can happen days or even weeks before labour, or not noticeably at all. Heavy fresh red bleeding is not a show — phone your maternity unit.",
  },
];

const Symptoms = () => (
  <section id="symptoms" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel>Common symptoms</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        What's likely to show up at week 36 — and what each one really means.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        Late pregnancy symptoms can be intense. Most are normal end-of-pregnancy tuning. A few are
        worth knowing about so you can recognise what to call about and what to ride out.
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
      <Link to="/articles/signs-of-labour"
        className="inline-flex items-center gap-2 font-sans text-[13.5px] font-medium text-sage hover:gap-3 transition-all">
        Read: the early signs of labour <ArrowRight size={13} />
      </Link>
    </div>
  </section>
);

/* 8. LABOUR SIGNS — Week 36 unique section */
const labourSigns = [
  { Icon: HeartPulse, title: "Braxton Hicks vs the real thing", body: "Braxton Hicks are usually irregular, ease with movement or rest, and don't get longer or stronger over time. Real contractions get longer, stronger, and closer together — and don't stop when you change activity." },
  { Icon: Droplet, title: "Waters breaking", body: "Sometimes a sudden gush, more often a slow trickle that doesn't stop. Note the colour and time, put on a pad, and call your maternity unit. Don't wait for contractions to start." },
  { Icon: Eye, title: "A 'show'", body: "A pinkish, brownish or jelly-like discharge as the mucus plug comes away. Can happen days, even weeks, before labour. Not a reason to call unless heavy bright red bleeding." },
  { Icon: AlertTriangle, title: "When to call straight away", body: "Regular painful contractions before 37 weeks. Bleeding (more than a show). Waters breaking. Reduced or changed baby movements. Severe headache, vision changes, swelling. Severe one-sided abdominal pain." },
  { Icon: Phone, title: "Phone first, every time", body: "Your maternity assessment unit is open 24 hours, every day. They will guide you on whether to come in, monitor at home, or wait. You will not be a nuisance. Ever." },
  { Icon: Calendar, title: "Group B Strep (GBS) awareness", body: "The UK doesn't routinely test for GBS, but you'll be asked about it. If you've had GBS in a previous pregnancy or it's been picked up incidentally, antibiotics in labour reduce the small risk of infection to your baby." },
];

const LabourSigns = () => (
  <section id="labour-signs" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="max-w-2xl mb-10">
        <SectionLabel tone="lavender">Labour awareness</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
          From now, your body may quietly start sending signals.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
          Most people don't go into labour at 36 weeks — average first labour is around 40+5. But
          knowing what early labour signs look like (and what's not labour) makes the next few weeks
          calmer and clearer.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {labourSigns.map(({ Icon, title, body }) => (
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
  "Wanting it to begin and not feeling ready, both at once.",
  "Looking at your bump and barely believing they'll soon be out.",
  "Quiet birth fear that surfaces in the small hours.",
  "Sudden fierce love for the person you haven't met.",
  "Grief, sometimes, for the version of life that's about to change.",
  "Being asked 'any sign yet?' for the eighth time today.",
  "Wishing the next four weeks would both speed up and slow down.",
];

const Emotional = () => (
  <section id="emotional" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-2 relative bg-gradient-to-br from-lavender-bg via-parchment to-lavender-bg/40 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-9 shadow-card-brand overflow-hidden">
        <img src={botanicalAccent} alt="" aria-hidden="true"
          className="absolute right-0 top-0 w-24 opacity-35 pointer-events-none select-none" />
        <SectionLabel tone="lavender">Emotionally this week</SectionLabel>
        <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-4">
          The countdown that isn't really a countdown.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/80 leading-[1.8] mb-4">
          Birth could be tomorrow. It could be in five weeks. The not-knowing is one of the strangest,
          most charged emotional spaces of pregnancy.
        </p>
        <p className="font-sans text-[14px] text-foreground/70 leading-[1.75]">
          Excitement, dread, longing, fear, tenderness and impatience can all live in one afternoon. Let
          them all be there. None of them mean anything is wrong with you, or your bond, or your baby.
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
  { Icon: Briefcase, title: "Pack — and double-check — the hospital bag", note: "Birth bag, baby bag, partner bag. Notes, ID, phone charger, snacks, comfortable going-home clothes (still maternity-sized)." },
  { Icon: Phone, title: "Save your maternity unit number", note: "Triage, day assessment, labour ward. Add them to your phone today, and write them somewhere visible at home for whoever's with you." },
  { Icon: Hand, title: "Stay tuned to baby's movements", note: "Movements should still feel strong and regular. Any change in pattern, strength or character — phone your unit straight away. Day or night." },
  { Icon: Stethoscope, title: "Attend your 36-week appointment", note: "Blood pressure, urine, fundal height, baby's position checked, conversation about birth preferences and plans for the coming weeks." },
  { Icon: Baby, title: "Soft-read your birth preferences", note: "Not a rigid plan — a calm document that tells your team what matters to you while leaving room for the day. Discuss with your partner." },
  { Icon: Moon, title: "Rest as a job, not a luxury", note: "Late-pregnancy rest is part of your preparation for labour. Lie down. Nap. Watch a film with your feet up. The to-do list will wait." },
];

const Focus = () => (
  <section id="focus" className="bg-sage-bg/35 py-16 md:py-24 border-y border-border/30">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <SectionLabel tone="terracotta">Focus this week</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.2rem] text-foreground leading-tight mb-4">
            Make it as ready as it needs to be — then rest.
          </h2>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8]">
            Week 36 is for finishing the practical pieces, telling your team what matters, and then
            quietly conserving energy for what's coming.
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
  "Any change in your baby's movements — pattern, strength or character",
  "Regular painful tightenings (anything before 37 weeks counts as preterm)",
  "Waters breaking, even a slow trickle",
  "Bleeding heavier than a small show — bright red blood",
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
            Trust your instincts. Always. Phone first, every time.
          </h3>
          <p className="font-sans text-[13.5px] text-foreground/70 leading-[1.75] mt-3">
            Your maternity assessment unit is open 24 hours. They will not be put out, irritated, or
            think you're overreacting. In an emergency, dial 999.
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
        You are not behind for not feeling ready. There is no version of yourself who would be. Ready arrives in the doing of it, not before.
      </p>
      <Heart size={14} className="text-terracotta/60 mx-auto mt-5" />
    </div>
  </section>
);

/* 13. REFLECTION + ASK */
const reflectionPrompts = ["What I'm hoping for in birth", "What I'm afraid of", "What I'm proud of", "What I want them to know"];
const askChips = ["Braxton Hicks vs labour", "Hospital bag essentials", "Sleeping positions at 36 weeks", "If my baby is breech", "When to call the maternity unit"];

const ReflectionAsk = () => (
  <PublicWeekReflectionAsk
    week={36}
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
            The last weeks deserve a record, not just a checklist.
          </h3>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8] mb-6">
            What you're carrying right now — the heaviness, the hope, the fear, the love that's already
            there — is worth keeping. The journal makes room for the small, soft, end-of-pregnancy
            moments before they vanish into the early days of being a parent.
          </p>
          <ul className="space-y-2.5 mb-7">
            {[
              "Pages for birth preferences and hopes",
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

/* 15. RELATED */
const related = [
  { slug: "signs-of-labour", img: thirdSignsImg, tag: "Looking ahead",
    title: "The early signs of labour",
    desc: "Braxton Hicks vs the real thing, what a 'show' looks like, and exactly when to call." },
  { slug: "hospital-bag-and-what-to-pack", img: thirdHospitalBagImg, tag: "Practical",
    title: "What to actually pack in your hospital bag",
    desc: "An honest, kept-list of what helps in labour, after birth, and on the journey home." },
  { slug: "baby-movement-in-pregnancy", img: thirdMovementImg, tag: "Movement",
    title: "Your baby's movements at 36 weeks",
    desc: "Movements should still feel strong and regular. What to notice and when to call straight away." },
  { slug: "sleep-in-pregnancy", img: thirdSleepImg, tag: "Body",
    title: "Sleeping in the late third trimester",
    desc: "Side-sleeping, pillows, restless legs, and the dreams of the final weeks." },
  { slug: "emotional-wellbeing-pregnancy", img: thirdEmotionalImg, tag: "Emotions",
    title: "The third trimester, emotionally",
    desc: "Birth fear, fierce love, the impatience of the wait, and the soft grief of a life about to change." },
  { slug: "the-space-your-baby-will-come-home-to", img: thirdNurseryImg, tag: "At home",
    title: "Preparing your space",
    desc: "What you actually need before baby arrives, what can wait, and what nesting energy is best spent on." },
];

const Related = () => (
  <section id="guidance" className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div className="max-w-xl">
          <SectionLabel>Read next, because of week 36</SectionLabel>
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
  { q: "Am I at term yet at 36 weeks?",
    a: "Not quite. From 37 weeks you're considered 'early term', from 39 weeks 'full term', and from 41 weeks 'late term'. At 36 weeks your baby is technically still preterm — although the vast majority of babies born now do well, often without needing any neonatal support. Each extra week from now adds finishing touches, especially to lung maturity and fat stores." },
  { q: "How do I know if it's Braxton Hicks or real labour?",
    a: "Braxton Hicks tend to be irregular, often painless or only mildly uncomfortable, ease with movement or rest, and don't get longer or stronger over time. Real contractions get progressively longer (around 30–60 seconds), stronger, and closer together (eventually every 3–5 minutes). They don't ease when you change activity. If you're unsure, phone your maternity assessment unit — they will help you work out what's happening." },
  { q: "What should I do if my waters break?",
    a: "Note the time and the colour of the fluid (clear/straw is normal; pink-tinged can be normal; green, brown or heavily bloodstained needs urgent attention). Put on a pad. Phone your maternity unit — don't wait for contractions to start. They will usually want to see you within 24 hours, sometimes much sooner depending on circumstances." },
  { q: "What if my baby is still breech at 36 weeks?",
    a: "Around 3–4% of babies are still bottom-down at 36 weeks. You'll usually be offered a procedure called ECV (external cephalic version) at around 36–37 weeks, where a doctor uses gentle pressure on your bump to try to turn the baby. It works around half the time, is considered safe, and you can decline. If your baby stays breech, your team will discuss the safest birth option for you — often a planned caesarean." },
  { q: "Should my baby's movements feel different now?",
    a: "Movements may feel different — more rolling, stretching and pressure rather than big kicks — because there's less room. But the strength and pattern should still be there. It is a myth that babies move less near the end. Any reduction or change in movement, at any time, needs you to phone your maternity assessment unit straight away. Day or night. Don't wait." },
  { q: "Is it normal to feel completely unprepared?",
    a: "Yes. Almost everyone feels some version of this in the final weeks, even people on their second or third baby. The 'ready' feeling tends to arrive in the doing of it — when labour starts, when the baby is in your arms — not in a clean to-do list before. The bags packed, the team on call, the people who love you knowing what to do: that's enough." },
  { q: "When should I stop work?",
    a: "Whenever you can, if you can. UK statutory maternity leave can start any time from 11 weeks before your due date. Many people aim to stop a couple of weeks before their due date to rest and prepare; others stop earlier if pregnancy is making work difficult. Your last day of work also affects your maternity pay start date — your HR team can talk you through the options." },
  { q: "How will I know labour has actually started?",
    a: "There's rarely a single dramatic moment. Labour usually builds gradually: tightenings becoming more regular, more intense, harder to talk through; lower back ache; sometimes a show; sometimes waters breaking. Once contractions are around five minutes apart, lasting roughly a minute, for at least an hour — that's the usual signal to head in (your maternity team will give you specific guidance). When in doubt, phone first." },
];

/* 17. NEXT */
const Next = () => (
  <section className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
      <div className="bg-gradient-to-br from-sage-bg via-parchment to-stage-pregnancy/30 rounded-3xl border border-border/30 p-8 sm:p-10 md:p-14 text-center shadow-card-brand">
        <SectionLabel>Up next</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.5rem] text-foreground leading-tight mb-3">
          Ready for week 37?
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 max-w-lg mx-auto mb-8 leading-[1.8]">
          From next week, you're officially early term. The waiting becomes the work. The list of things
          to do gives way to the slow, soft listening of being almost ready.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
          <Link to="/pregnancy/week/37"
            className="inline-flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium shadow-cta hover:bg-terracotta-hover transition-colors">
            Continue to week 37 <ArrowRight size={14} />
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

const Week36Page = () => (
  <div className="min-h-screen bg-parchment">
    <PregnancyWeekSeo weekNumber={36} />
    <Navbar />
    <Hero />
    <MetaBar />
    <AtAGlance />
    <Biology />
    <Position />
    <Body />
    <Symptoms />
    <LabourSigns />
    <Emotional />
    <Focus />
    <SeekSupport />
    <Quote />
    <ReflectionAsk />
    <Journal />
    <Related />
    <WeekCommonQuestions week={36} questions={buildWeekQuestions(36, faqs)} />
    <WeekSources week={36} sources={getWeekSources(36)} />
    <Next />
    <Footer />
  </div>
);

export default Week36Page;
