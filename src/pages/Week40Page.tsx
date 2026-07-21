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
  Baby,
  Phone,
  Hand,
  Hourglass,
  Clock,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PregnancyWeekSeo from "@/components/seo/PregnancyWeekSeo";
import PublicWeekReflectionAsk from "@/components/pregnancy/PublicWeekReflectionAsk";
import fetusImg from "@/assets/week40-fetus.jpg";
import pumpkinImg from "@/assets/week40-pumpkin.jpg";
import biologyImg from "@/assets/week40-biology-detail.jpg";
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
    <div className="relative bg-gradient-to-br from-stage-pregnancy/65 via-parchment to-parchment-dark/40 pt-20 pb-36 sm:pt-24 sm:pb-44 md:pt-32 md:pb-52">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[820px] h-[420px] rounded-full bg-terracotta/12 blur-3xl" />
        <div className="absolute -top-10 right-1/4 w-[260px] h-[260px] rounded-full bg-sage-light/30 blur-3xl" />
      </div>
      <img src={botanicalBl} alt="" aria-hidden="true"
        className="pointer-events-none absolute top-20 left-0 w-[150px] lg:w-[210px] opacity-25 select-none hidden md:block" />
      <img src={botanicalTr} alt="" aria-hidden="true"
        className="pointer-events-none absolute top-20 right-0 w-[150px] lg:w-[210px] opacity-25 select-none hidden md:block" />

      <div className="container mx-auto px-14 sm:px-16 md:px-10 max-w-5xl relative z-10 text-center">
        <nav aria-label="breadcrumb" className="flex items-center justify-center gap-2 mb-6 sm:mb-7 font-sans text-[12px] font-normal text-foreground/65">
          <Link to="/pregnancy" className="hover:text-foreground transition-colors">Pregnancy</Link>
          <span className="text-foreground/30">›</span>
          <Link to="/pregnancy/third-trimester" className="hover:text-foreground transition-colors">Week by week</Link>
          <span className="text-foreground/30">›</span>
          <span className="text-foreground">Week 40</span>
        </nav>

        <p className="font-sans text-[11px] font-semibold tracking-[0.3em] uppercase text-terracotta mb-5">
          Third trimester · Due-date week
        </p>
        <h1 className="font-serif text-[2.5rem] sm:text-5xl md:text-[3.75rem] lg:text-[4.25rem] text-foreground leading-[1.04] tracking-tight mb-4 md:mb-5">
          40 Weeks Pregnant
        </h1>
        <p className="font-serif italic text-[1.05rem] sm:text-lg md:text-xl text-foreground/75 max-w-xl mx-auto leading-relaxed">
          Your baby is the size of a small pumpkin, fully ready to meet the world. Your due date has arrived — and only about 1 in 20 babies actually arrive on it. The waiting is the work.
        </p>
      </div>

      <Link to="/pregnancy/week/39" aria-label="Go to week 39"
        className="absolute left-3 sm:left-6 md:left-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronLeft size={18} />
      </Link>
      <Link to="/pregnancy/week/41" aria-label="Go to week 41"
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
              <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/55 mt-1">~51&nbsp;cm</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full bg-card border-[4px] border-terracotta/30 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={fetusImg}
                alt="Soft editorial illustration of a full-term 40-week baby curled head-down, plump and ready, sleeping peacefully"
                width={1024} height={1024}
                loading="eager" decoding="async"
                className="w-full h-full object-cover scale-[1.02]" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.05]" />
            </div>
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.22em] uppercase text-foreground/65">Your baby this week</p>
          </div>

          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-stage-pregnancy/85 to-stage-pregnancy/40 border-[3px] border-terracotta/30 flex items-center justify-center shadow-elevated">
              <Hourglass size={26} className="text-terracotta" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-terracotta/10" />
            </div>
            <div className="text-center">
              <p className="font-serif italic text-[12.5px] text-foreground/80 leading-tight">due now</p>
              <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/55 mt-1">+/- 2 wks</p>
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
  { id: "biology", label: "Your baby now", Icon: Sprout },
  { id: "post-dates", label: "If labour hasn't started", Icon: Clock },
  { id: "body", label: "Body changes", Icon: Activity },
  { id: "symptoms", label: "Symptoms", Icon: HeartPulse },
  { id: "labour-signs", label: "Labour signs", Icon: Stethoscope },
  { id: "movements", label: "Movements", Icon: Hand },
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
              Updated for 2026 · 13 min read · Due-date week
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
  { label: "Stage", value: "Full term · due-date week" },
  { label: "Baby size", value: "~51 cm — small pumpkin" },
  { label: "Baby weight", value: "Around 3.4–3.6 kg" },
  { label: "Born today?", value: "Only about 1 in 20" },
];

const AtAGlance = () => (
  <section id="at-a-glance" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl mb-14 md:mb-20">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 relative bg-gradient-to-br from-stage-pregnancy/60 via-parchment to-parchment-dark/50 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-10 overflow-hidden shadow-card-brand">
        <img src={botanicalAccent} alt="" aria-hidden="true"
          className="absolute -left-3 bottom-0 w-28 opacity-35 pointer-events-none select-none" />
        <SectionLabel tone="terracotta">At a glance</SectionLabel>
        <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-5">
          The week of your due date — and the week of waiting.
        </h2>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8] mb-4">
          Your baby is fully grown, fully ready, and somewhere between your ribs and your pelvis right
          now. Around 3.4 kg, fingernails over fingertips, a head of hair (or none), and a pair of lungs
          waiting for their first proper breath of air.
        </p>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8]">
          Only about 1 in 20 babies arrive exactly on their due date. Most come in the two weeks either
          side. If you're still pregnant today, that is completely normal — and the next conversations
          will be about sweeps, monitoring, and what happens if labour hasn't started by 41 or 42 weeks.
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
  { title: "Fully grown and finished", body: "Lungs are mature. Brain and nervous system are working. Digestive system is primed. Your baby has spent the last few weeks mostly putting on the last layers of fat — they are about as ready as a baby gets to be born." },
  { title: "Vernix mostly gone", body: "The waxy coating that protected their skin in the fluid is largely shed and swallowed by now. It builds up in the bowel as meconium — the dark, sticky first nappy you'll see in the first day or two." },
  { title: "Hair, nails and skin", body: "Many babies are born with a full head of hair; many are born with almost none. Both are normal. Fingernails often need cutting in the first week. Skin can be peeling, blotchy, mottled — it settles quickly." },
  { title: "Their own clock for arrival", body: "Birth is triggered by a chemical conversation between your baby's lungs and your hormones. Each baby reaches that moment on their own timing. The due date is a midpoint, not a deadline." },
];

const Biology = () => (
  <section id="biology" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="relative rounded-3xl overflow-hidden border border-border/40 shadow-card-brand">
            <div className="aspect-[4/5]">
              <img src={biologyImg} alt="Soft editorial close-up of a full-term 40-week baby curled head-down low in the pelvis, plump cheeks, peaceful sleeping features"
                loading="lazy" width={1024} height={1280}
                className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-foreground/60 to-transparent">
              <p className="font-serif italic text-[13px] text-background/95 leading-snug">
                Whole, finished, waiting on a moment of their own choosing.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <SectionLabel>Your baby this week</SectionLabel>
          <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-5">
            There is nothing left to grow. Only the moment to arrive.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8] mb-8 max-w-2xl">
            By 40 weeks your baby is finished — every system that matters for life outside the womb is
            ready to switch on. They're curled head-down (almost always), tucked low in your pelvis,
            and quietly running down the last clock of being inside you.
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

/* 5. POST-DATES — Week 40 unique section */
const postDatesPoints = [
  { Icon: Hourglass, title: "Most people don't give birth on their due date", body: "Around 5% of babies arrive exactly on the date predicted. Around half are born by 40+5. By 41 weeks roughly three-quarters have arrived. Anything between 37 and 42 weeks is full-term and considered normal." },
  { Icon: Hand, title: "Membrane sweeps from 40 weeks", body: "Your midwife may offer a 'stretch and sweep' — a vaginal examination where they sweep a finger around the cervix to release prostaglandins and encourage labour. They can be uncomfortable, may bring on a bloody show or cramping, and work best if your body is already close to labour. You can decline." },
  { Icon: Stethoscope, title: "The induction conversation", body: "If labour hasn't started by around 41 weeks, you'll usually be offered induction — most often booked between 41+0 and 42+0. The reason is that risks to baby slowly increase past 42 weeks. Induction is your decision; ask about the alternative of expectant management with extra monitoring." },
  { Icon: Activity, title: "Extra monitoring past your dates", body: "If you wait, you'll be offered regular checks — a CTG (heart rate trace) and sometimes a scan to check fluid levels and blood flow. These help your team make sure baby is still happy on the inside while you wait." },
];

const PostDates = () => (
  <section id="post-dates" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel tone="terracotta">If labour hasn't started yet</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        Still pregnant on your due date is the most common kind of due date.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        From this week, the conversations gently change shape. Sweeps may be offered, induction is on
        the table, and the team around you starts thinking about how — not just when — your baby
        arrives. Here's what's likely to come up.
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

    <div className="mt-6 bg-stage-pregnancy/40 border border-terracotta/20 rounded-2xl p-6 md:p-7 flex flex-col sm:flex-row sm:items-start gap-4">
      <span className="w-10 h-10 rounded-full bg-card border border-terracotta/20 flex items-center justify-center shrink-0">
        <ShieldCheck size={15} className="text-terracotta" />
      </span>
      <p className="font-sans text-[14px] text-foreground/85 leading-[1.7]">
        <span className="font-semibold">All of these are conversations, not orders.</span>{" "}
        You can ask why, ask what the alternative looks like, ask for time to think. A calm
        question is never a problem to your team — and you are the person making the decision.
      </p>
    </div>
  </section>
);

/* 6. BODY */
const bodyNotes = [
  { Icon: Wind, title: "Heaviness, pressure, slowness", body: "Your baby is pressing low in the pelvis. Walking is uncomfortable. Stairs feel impossible. You may waddle. Pelvic pressure can be intense — it does not mean labour is imminent, but it does mean your body is doing extraordinary work." },
  { Icon: Moon, title: "Sleep is broken and vivid", body: "Most people sleep poorly in the last week. The bump is huge. The bladder is squashed. The dreams are intense. Side-sleep with pillows everywhere — left preferred. Day naps absolutely count." },
  { Icon: Droplet, title: "Discharge, show and leaks", body: "More mucus, sometimes streaked with pink or brown — the 'show' as the cervix softens and the plug comes away. Small dribbles of urine are common; a steady trickle that won't stop may be your waters. Always phone if you're not sure." },
];

const Body = () => (
  <section id="body" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="max-w-2xl mb-10">
        <SectionLabel tone="terracotta">Your body this week</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
          Full, heavy, achy — and quietly tuning up for the most extraordinary thing it's ever done.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
          The last week of pregnancy asks a lot. Most of what you're feeling is normal late-pregnancy
          tuning. A handful of signs are worth recognising as the very first signals of labour.
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
    Icon: HeartPulse, name: "Strong, frequent Braxton Hicks",
    feels: "Tightenings across the bump that may now feel firm and properly uncomfortable, sometimes coming several times an hour, then easing.",
    why: "Your uterus is rehearsing for labour and quietly ripening the cervix.",
    normal: "Very common. The tell-tale of early labour rather than Braxton Hicks: tightenings that get longer, stronger, and closer together over an hour or more, and don't ease when you change activity.",
  },
  {
    Icon: Wind, name: "Lightning crotch and pelvic pressure",
    feels: "Sharp, electric jolts low in the cervix or vagina. Heavy weight pressing down. Feeling like baby might fall out.",
    why: "Baby's head is engaged deep in the pelvis pressing on nerves and ligaments.",
    normal: "Very common in the last weeks. Sharp but not dangerous unless paired with bleeding, leaking or strong regular tightenings.",
  },
  {
    Icon: Droplet, name: "A 'show' and increased discharge",
    feels: "A blob or streak of jelly-like discharge — sometimes clear, sometimes pink or brown-tinged.",
    why: "The mucus plug that has sealed your cervix is starting to come away as the cervix softens.",
    normal: "Can come away days or even weeks before labour, in pieces or all at once. Heavy fresh red bleeding is not a show — phone your maternity unit.",
  },
  {
    Icon: Moon, name: "Exhaustion you can't sleep off",
    feels: "Heavy, bone-deep tired. Naps don't fix it. Even short walks feel huge.",
    why: "You're carrying around 5 extra kilos of baby, fluid and placenta, sleeping badly, and your body is preparing for labour.",
    normal: "Universal. Rest is not laziness — it is preparation. Lie down. Watch a film. Cancel things.",
  },
  {
    Icon: Heart, name: "Loose stools or sudden 'clearing out'",
    feels: "Suddenly needing the loo more often, looser bowels.",
    why: "Prostaglandins released as your body gears up for labour can speed up the gut.",
    normal: "A common pre-labour sign in the day or two before things start. Not a guarantee — but a useful clue.",
  },
  {
    Icon: Sparkles, name: "Bursts of nesting energy",
    feels: "Sudden, intense need to clean, organise, finish a list — sometimes wakeful at night with a cleaning urge.",
    why: "Hormonal shifts and a quiet biological pull towards making the space ready.",
    normal: "Very common in the final days. Ride it gently — don't end up exhausted just before labour starts.",
  },
];

const Symptoms = () => (
  <section id="symptoms" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel>Common symptoms</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        What's likely at week 40 — and what each one really means.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        Late-pregnancy symptoms can feel intense. Most are normal end-of-pregnancy tuning. A few are the
        very first whispers of labour beginning to start.
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

/* 8. LABOUR SIGNS */
const labourSigns = [
  { Icon: HeartPulse, title: "Real contractions vs Braxton Hicks", body: "Real contractions get longer (around 30–60 seconds), stronger, and closer together (eventually 3–5 minutes apart). They don't ease when you walk, eat or run a bath. Braxton Hicks come and go, ease with rest, and don't progress." },
  { Icon: Droplet, title: "Waters breaking", body: "Sometimes a sudden gush, more often a slow trickle that doesn't stop. Note the time and the colour (clear/straw is normal; pink-tinged can be normal; green, brown or heavily bloodstained needs urgent attention). Phone your maternity unit straight away." },
  { Icon: Sparkles, title: "A show", body: "A pinkish, brownish or jelly-like discharge as the mucus plug comes away. Can happen days or even weeks before labour. Not a reason to call unless it's heavy fresh red bleeding." },
  { Icon: Phone, title: "When to head in", body: "Most maternity units suggest contacting them once contractions are around 5 minutes apart, lasting roughly a minute, for at least an hour — but always phone earlier if you're unsure, your waters have gone, you're bleeding, or movements have changed." },
];

const LabourSigns = () => (
  <section id="labour-signs" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="max-w-2xl mb-10">
        <SectionLabel tone="lavender">Signs labour is starting</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
          Most labours begin slowly, not dramatically.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
          There is rarely a single film-worthy moment. Labour usually builds across hours: tightenings
          becoming more regular, more intense, harder to talk through. Here's what to watch for.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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

/* 9. MOVEMENTS — critical Week 40 callout */
const Movements = () => (
  <section id="movements" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="bg-gradient-to-br from-stage-pregnancy/55 via-parchment to-parchment-dark/40 rounded-3xl border-2 border-terracotta/30 p-8 md:p-10 shadow-card-brand">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center">
        <div className="md:col-span-4">
          <span className="inline-flex w-14 h-14 rounded-full bg-terracotta/15 items-center justify-center mb-4">
            <Hand size={20} className="text-terracotta" />
          </span>
          <SectionLabel tone="terracotta">Baby's movements</SectionLabel>
          <h3 className="font-serif text-[1.5rem] sm:text-[1.65rem] md:text-[1.85rem] text-foreground leading-snug">
            Movements should still feel strong and regular — right up to labour.
          </h3>
        </div>
        <div className="md:col-span-8">
          <p className="font-sans text-[14.5px] text-foreground/85 leading-[1.85] mb-4">
            It is a myth that babies move less near the end. The pattern of movement may change — more
            rolling, stretching and pressure rather than big kicks because there's less room — but the
            strength and regularity should still be there.
          </p>
          <p className="font-sans text-[14.5px] text-foreground/85 leading-[1.85] mb-5">
            <span className="font-semibold">Any change in your baby's movements — at any time — needs you to phone your maternity assessment unit straight away.</span> Day or night. Don't wait. Don't have a bath. Don't drink something cold and 'see what happens'. Phone first.
          </p>
          <p className="font-sans text-[13px] text-foreground/65 leading-[1.7] italic">
            Your maternity assessment unit is open 24 hours, every day. They will not be put out, irritated, or think you're overreacting. Ever.
          </p>
        </div>
      </div>
    </div>
  </section>
);

/* 10. EMOTIONAL */
const emotionalTruths = [
  "Looking at your bump and not believing they'll ever actually come out.",
  "Wishing they'd come, and being terrified of them coming, at exactly the same time.",
  "Resenting the texts that say 'any sign yet?'.",
  "Crying for no reason and every reason.",
  "Quiet birth fear that surfaces in the small hours.",
  "Sudden fierce love for the person you haven't met.",
  "The strange grief of knowing this is the last time it will be just you and your bump.",
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
            'I thought I'd have had the baby by now.'
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/80 leading-[1.8] mb-4">
            The due date arrives charged with meaning — and almost always passes without a baby. The
            emotional whiplash of that, especially when everyone you know starts asking, is real.
          </p>
          <p className="font-sans text-[14px] text-foreground/70 leading-[1.75]">
            Hope, frustration, impatience, fear and tenderness can all live in one afternoon. None of
            them mean anything is wrong. They mean you are at the very edge of one life and the
            beginning of another.
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
  { Icon: Phone, title: "Save your maternity unit number — twice", note: "Triage and labour ward. Add to your phone, write it on the fridge for whoever's with you. Knowing exactly who to call halves the panic of the moment you need to call." },
  { Icon: Hand, title: "Stay tuned to baby's movements", note: "Pattern, strength, character — should all still feel familiar. Any change, any reduction, phone your maternity assessment unit straight away. Day or night. Always. No exceptions." },
  { Icon: Stethoscope, title: "Talk through sweeps and induction with your team", note: "Ask what's offered, when, why, and what the alternatives look like. You're allowed to say yes, no, not yet, or 'let me think'. These are conversations." },
  { Icon: Baby, title: "Reread your birth preferences gently", note: "Not as a rigid script — as a soft document that tells your team what matters to you while leaving room for the day. Print one, share with your partner." },
  { Icon: Moon, title: "Rest as a job, not a luxury", note: "Sleep when you can. Lie down when you can. Cancel what you can. Going into labour rested is one of the kindest things you can give yourself." },
  { Icon: Heart, title: "Let people care for you", note: "If someone offers to cook, drop a meal round, walk the dog, take older kids — say yes. Banking that help now will pay back tenfold in the early days after birth." },
];

const Focus = () => (
  <section id="focus" className="bg-sage-bg/35 py-16 md:py-24 border-y border-border/30">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <SectionLabel tone="terracotta">Focus this week</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.2rem] text-foreground leading-tight mb-4">
            Be ready, be rested, be reachable.
          </h2>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8]">
            Week 40 is for finishing nothing — only for staying close to your body, your team, and the
            people who love you. Everything else can wait, even the laundry.
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
  "Waters breaking, even a slow trickle (note the colour and time)",
  "Heavy bright red bleeding (more than a small show)",
  "Regular painful contractions — phone for advice early",
  "Severe headache, vision changes or pain in your upper tummy",
  "Sudden swelling in face or hands",
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

/* 13. QUOTE */
const Quote = () => (
  <section className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl pb-16 md:pb-24">
    <div className="relative bg-stage-pregnancy/35 rounded-3xl border border-border/30 p-8 sm:p-10 md:p-14 text-center overflow-hidden">
      <span className="absolute left-7 top-6 font-serif text-4xl text-terracotta/40 leading-none">“</span>
      <span className="absolute right-7 bottom-4 font-serif text-4xl text-terracotta/40 leading-none">”</span>
      <p className="font-serif italic text-[1.2rem] sm:text-[1.35rem] md:text-[1.6rem] text-foreground/90 leading-snug max-w-3xl mx-auto">
        The due date is a midpoint, not a deadline. You are not late. Your baby is on time — their own time.
      </p>
      <Heart size={14} className="text-terracotta/60 mx-auto mt-5" />
    </div>
  </section>
);

/* 14. REFLECTION + ASK */
const reflectionPrompts = ["What I'm hoping for in birth", "What I'm afraid of", "A letter to my baby", "What I want to remember about waiting"];
const askChips = ["Will I be induced if labour doesn't start?", "What does a sweep actually feel like?", "Is it true most babies are 'late'?", "How do I know when to head in?", "Reduced movements at 40 weeks"];

const ReflectionAsk = () => (
  <PublicWeekReflectionAsk
    week={40}
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
            The waiting deserves a record, not just a countdown.
          </h3>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8] mb-6">
            The day your due date came and went. The last bath alone with the bump. The letter you
            wrote to them on a Tuesday afternoon, not knowing if you'd meet them on Wednesday or
            Sunday. These last days are worth keeping.
          </p>
          <ul className="space-y-2.5 mb-7">
            {[
              "Pages for birth preferences and the day of arrival",
              "Space for letters to your baby before they meet you",
              "Guided prompts through every week — and into the early days",
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
  { slug: "signs-of-labour", img: thirdSignsImg, tag: "Looking for it",
    title: "The early signs of labour",
    desc: "Real contractions vs Braxton Hicks, what a 'show' looks like, when waters breaking actually means labour, and exactly when to call." },
  { slug: "membrane-sweep", img: thirdSignsImg, tag: "Post-dates",
    title: "Membrane sweeps and induction explained",
    desc: "What's offered from 40 weeks, what each procedure actually involves, and how to think about saying yes, no, or not yet." },
  { slug: "baby-movement-in-pregnancy", img: thirdMovementImg, tag: "Movement",
    title: "Your baby's movements at 40 weeks",
    desc: "Movements should still feel strong and regular right up to labour. What to notice and exactly when to call." },
  { slug: "hospital-bag-and-what-to-pack", img: thirdHospitalBagImg, tag: "Practical",
    title: "What to actually pack in your hospital bag",
    desc: "An honest, kept-list of what helps in labour, after birth, and on the journey home — including the things you'll forget." },
  { slug: "emotional-wellbeing-pregnancy", img: thirdEmotionalImg, tag: "Emotions",
    title: "The third trimester, emotionally",
    desc: "Birth fear, fierce love, the impatience of the wait, and the soft grief of a life about to change." },
  { slug: "sleep-in-pregnancy", img: thirdSleepImg, tag: "Body",
    title: "Sleeping in the last weeks",
    desc: "Side-sleeping, pillows, restless legs, vivid dreams, and how to rest when sleep is hard to find." },
];

const Related = () => (
  <section id="guidance" className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div className="max-w-xl">
          <SectionLabel>Read next, because of week 40</SectionLabel>
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

/* 17. FAQ */
const faqs = [
  { q: "How likely am I to give birth on my actual due date?",
    a: "Only around 1 in 20 — about 5% — of babies are born exactly on their due date. Roughly half of pregnancies have ended in labour by 40 weeks and 5 days, and about three-quarters by 41 weeks. If you're still pregnant on your due date, you are in the most ordinary kind of place to be." },
  { q: "What is a membrane sweep and does it work?",
    a: "A sweep is when your midwife uses a finger to sweep around the inside of your cervix during a vaginal examination, releasing prostaglandins to encourage labour. It's usually offered from 40 weeks. It works best when your body is already getting close to labour. It can be uncomfortable, sometimes painful, and may bring on a bloody show or some cramping. Evidence suggests sweeps reduce the chance of going to formal induction, but you can decline." },
  { q: "What happens if labour hasn't started by 41 or 42 weeks?",
    a: "If labour hasn't started by around 41 weeks, you'll usually be offered induction — most commonly booked between 41+0 and 42+0 weeks. The reason is that risks to baby gradually increase past 42 weeks. Induction usually starts with a pessary or gel containing prostaglandins, sometimes followed by breaking waters and/or a hormone drip. The alternative is expectant management with extra monitoring (a CTG and a scan to check fluid and blood flow) — your team will discuss the options with you, and the choice is yours." },
  { q: "How will I know labour has actually started?",
    a: "Labour usually builds gradually rather than starting with a single dramatic moment. Tightenings become more regular, more intense, and harder to talk through. You may have backache, a 'show', loose bowels, or your waters going. Once contractions are around 5 minutes apart, lasting roughly a minute, for at least an hour, that's the usual signal to phone — but always phone earlier if you're unsure, your waters have gone, you're bleeding, or movements have changed." },
  { q: "Should my baby still be moving as much at 40 weeks?",
    a: "Yes. The character of movement may change — more rolling, stretching and pressure rather than big kicks because there's less room — but the strength and regularity should still be there. It is a myth that babies move less near the end. Any reduction or change in your baby's movements at any time, day or night, needs you to phone your maternity assessment unit straight away. Don't wait. Don't have a bath. Don't drink something cold and 'see what happens'. Phone first." },
  { q: "What should I do if my waters break?",
    a: "Note the time and the colour of the fluid (clear or straw-coloured is normal; pink-tinged can be normal; green, brown or heavily bloodstained needs urgent attention). Put on a pad. Phone your maternity unit — don't wait for contractions to start. They will guide you on whether to come in, monitor at home, or wait. Most people will go into labour within 24 hours of waters going naturally; your team will discuss what to do if they don't." },
  { q: "Does anything actually 'bring on' labour?",
    a: "Most things you'll have heard of — curry, pineapple, raspberry leaf tea, sex, long walks, bouncing on a ball — have very limited or no good evidence that they reliably start labour. They probably don't do harm if you fancy them. The two interventions with real evidence are membrane sweeps and formal induction. Babies mostly come when they come." },
  { q: "Is it normal to feel disappointed or panicky on my due date?",
    a: "Completely normal. The due date is loaded with meaning — by you, by your family, by everyone asking. When it passes without a baby, the emotional whiplash is real. Be kind to yourself. Mute group chats if you need to. Tell people you'll let them know when something happens, not before. This is one of the strangest weeks of your life, and 'I thought I'd have had the baby by now' is one of the most universal sentences in the final week of pregnancy." },
];

/* 18. NEXT */
const Next = () => (
  <section className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
      <div className="bg-gradient-to-br from-sage-bg via-parchment to-stage-pregnancy/30 rounded-3xl border border-border/30 p-8 sm:p-10 md:p-14 text-center shadow-card-brand">
        <SectionLabel>If you're still here next week</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.5rem] text-foreground leading-tight mb-3">
          Week 41 is for the most patient kind of waiting.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 max-w-lg mx-auto mb-8 leading-[1.8]">
          Most people who are still pregnant in week 41 will meet their baby in the next few days —
          either spontaneously, after a sweep, or through induction. We'll walk through what's likely.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
          <Link to="/pregnancy/week/41"
            className="inline-flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium shadow-cta hover:bg-terracotta-hover transition-colors">
            Continue to week 41 <ArrowRight size={14} />
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

const Week40Page = () => (
  <div className="min-h-screen bg-parchment">
    <PregnancyWeekSeo weekNumber={40} />
    <Navbar />
    <Hero />
    <MetaBar />
    <AtAGlance />
    <Biology />
    <PostDates />
    <Body />
    <Symptoms />
    <LabourSigns />
    <Movements />
    <Emotional />
    <Focus />
    <SeekSupport />
    <Quote />
    <ReflectionAsk />
    <Journal />
    <Related />
    <WeekCommonQuestions week={40} questions={buildWeekQuestions(40, faqs)} />
    <WeekSources week={40} sources={getWeekSources(40)} />
    <Next />
    <Footer />
  </div>
);

export default Week40Page;
