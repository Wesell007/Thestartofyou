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
import fetusImg from "@/assets/week38-fetus.jpg";
import leekImg from "@/assets/week38-leek.jpg";
import biologyImg from "@/assets/week38-biology-detail.jpg";
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

const SectionLabel = ({ children, tone = "sage" }: { children: React.ReactNode; tone?: "sage" | "terracotta" | "lavender" }) => {
  const toneCls =
    tone === "terracotta" ? "text-terracotta"
    : tone === "lavender" ? "text-lavender-foreground"
    : "text-sage";
  // Single authoritative crumb array: feeds the visible trail and the schema.
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Pregnancy", href: "/pregnancy" },
    { label: "Third trimester", href: "/pregnancy/third-trimester" },
    { label: "Week 38", href: "/pregnancy/week/38" },
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
          Third Trimester · The waiting weeks
        </p>
        <h1 className="font-serif text-[2.5rem] sm:text-5xl md:text-[3.75rem] lg:text-[4.25rem] text-foreground leading-[1.04] tracking-tight mb-4 md:mb-5">
          38 Weeks Pregnant
        </h1>
        <p className="font-serif italic text-[1.05rem] sm:text-lg md:text-xl text-foreground/75 max-w-xl mx-auto leading-relaxed">
          Your baby is the size of a leek and almost full term. The waiting becomes its own kind of work — heavier, watchful, and very nearly here.
        </p>
      </div>

      <Link to="/pregnancy/week/37" aria-label="Go to week 37"
        className="absolute left-3 sm:left-6 md:left-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronLeft size={18} />
      </Link>
      <Link to="/pregnancy/week/39" aria-label="Go to week 39"
        className="absolute right-3 sm:right-6 md:right-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronRight size={18} />
      </Link>
    </div>

    <div className="relative -mt-28 sm:-mt-36 md:-mt-40 mb-6">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex items-end justify-center gap-5 sm:gap-10 md:gap-14">
          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-card border-[3px] border-sage/15 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={leekImg} alt="Leek" loading="lazy" width={512} height={512}
                className="w-full h-full object-cover" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.04]" />
            </div>
            <div className="text-center">
              <p className="font-serif italic text-[12.5px] text-foreground/80 leading-tight">leek</p>
              <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/55 mt-1">~49.5&nbsp;cm</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full bg-card border-[4px] border-terracotta/25 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={fetusImg}
                alt="Soft editorial illustration of a 38-week fetus tightly curled head-down and deeply engaged in the pelvis, plump and term-ready"
                width={1024} height={1024}
                loading="eager" decoding="async"
                className="w-full h-full object-cover scale-[1.02]" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.05]" />
            </div>
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.22em] uppercase text-foreground/65">Your baby this week</p>
          </div>

          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-stage-pregnancy/85 to-stage-pregnancy/40 border-[3px] border-terracotta/25 flex items-center justify-center shadow-elevated">
              <span className="font-serif text-[1.7rem] sm:text-[1.95rem] text-foreground tracking-tight leading-none">2</span>
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
  { id: "is-this-it", label: "Is this it?", Icon: Stethoscope },
  { id: "body", label: "Body changes", Icon: Activity },
  { id: "symptoms", label: "Symptoms", Icon: HeartPulse },
  { id: "labour-signs", label: "Labour signs", Icon: Baby },
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
              Updated for 2026 · 12 min read · The waiting weeks
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
  { label: "Stage", value: "Early term · 1 week from full" },
  { label: "Baby size", value: "~49.5 cm — leek" },
  { label: "Baby weight", value: "Around 3.1 kg" },
  { label: "Term in", value: "Full term at 39+0" },
];

const AtAGlance = () => (
  <section id="at-a-glance" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl mb-14 md:mb-20">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 relative bg-gradient-to-br from-stage-pregnancy/55 via-parchment to-parchment-dark/50 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-10 overflow-hidden shadow-card-brand">
        <img src={botanicalAccent} alt="" aria-hidden="true"
          className="absolute -left-3 bottom-0 w-28 opacity-35 pointer-events-none select-none" />
        <SectionLabel tone="terracotta">At a glance</SectionLabel>
        <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-5">
          Week 38 is the week the waiting becomes the work.
        </h2>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8] mb-4">
          Your baby is around 3.1 kg now, fully formed and almost finished. Vernix is mostly gone,
          lanugo has shed, head hair may be thick or barely there, and lungs are coordinated and
          mature in the vast majority of babies. Most are settled head-down and many are deeply engaged.
        </p>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8]">
          You may feel heavier than you ever have, slower than you'd like, and unusually tuned to
          every twinge. Braxton Hicks may now feel insistent. Sleep is broken. The 'is this it?'
          moments multiply. None of it means today is the day — but for the first time, it could be.
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
  { title: "Practically term-ready", body: "Lungs, suck-swallow-breathe coordination, and immune transfer are essentially done. Most 38-week babies need no extra support if born today. From 39 weeks they'll be considered 'full term'." },
  { title: "Adding the last fat", body: "Around 200 grams a week of new growth now is mostly fat — under the skin, around organs, and in the cheeks. This fat helps your baby regulate temperature and fuel the early hungry days." },
  { title: "Skin smoothing, vernix thinning", body: "Most of the cheesy white vernix has come off and been swallowed, along with most of the fine lanugo hair. Skin is smoother, pinker, and looks much more newborn-like than wrinkly." },
  { title: "Brain still busy", body: "The brain continues to grow and form fine connections quickly — meaningful development happens in every extra week, particularly in the cortex. Babies born now miss none of the headline milestones, but every week still adds to the foundation." },
];

const Biology = () => (
  <section id="biology" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="relative rounded-3xl overflow-hidden border border-border/40 shadow-card-brand">
            <div className="aspect-[4/5]">
              <img src={biologyImg} alt="Soft editorial close-up of a peaceful sleeping near-newborn baby's face and tiny hand"
                loading="lazy" width={1024} height={1280}
                className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-foreground/60 to-transparent">
              <p className="font-serif italic text-[13px] text-background/95 leading-snug">
                Almost finished. Almost here. Already entirely themselves.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <SectionLabel>What's underway biologically</SectionLabel>
          <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-5">
            By 38 weeks, your baby is essentially finished — and the last touches are mostly fat and brain.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8] mb-8 max-w-2xl">
            Almost every developmental headline has happened. The work of these last weeks is fine
            quantity rather than new quality: more fat, more brain connections, a little more
            antibody transfer, the slow descent into the pelvis. Your baby is already, in every
            real sense, themselves.
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

/* 5. IS THIS IT? — Week 38 unique section */
const isThisItPoints = [
  { Icon: HeartPulse, title: "Tightenings that come and go", body: "Strong, irregular tightenings that ease when you walk around, lie down, or change position — and don't get progressively longer or stronger — are almost always Braxton Hicks. Real labour contractions don't ease when you change activity." },
  { Icon: Eye, title: "Pinkish or jelly-like discharge", body: "A 'show' is the mucus plug coming away as the cervix softens. It can be one piece or several over days. It often happens before labour, but can also happen weeks before — or not noticeably at all. On its own, not a reason to rush in." },
  { Icon: Droplet, title: "A small leak — or a gush", body: "Waters can break dramatically (sudden gush) or subtly (a slow trickle that doesn't stop). If you're unsure, put on a pad and check after lying down for half an hour. Either way, phone your unit." },
  { Icon: Footprints, title: "Backache and 'period pain'", body: "Some labours start in the back, with deep period-like aching that builds. Some start with diarrhoea or nausea as the body clears out. None of this means it's definitely labour today — but it's worth noting." },
  { Icon: Wind, title: "Sudden bursts of energy or stillness", body: "A surge of urgent nesting, or an unusual quiet, can sometimes precede labour starting. Sometimes it precedes nothing. Either is normal in the final weeks." },
  { Icon: Phone, title: "When in doubt — phone first", body: "Your maternity assessment unit would always rather you call. They can listen to your contractions, talk you through what to look for, and tell you whether to come in, monitor at home, or wait it out." },
];

const IsThisIt = () => (
  <section id="is-this-it" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel tone="terracotta">Is this it?</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        From 38 weeks, almost every twinge becomes a question.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        The 'is this it?' loop is one of the most exhausting parts of late pregnancy. Knowing what
        early labour signs actually look like — and what's just a body in its final weeks — makes
        the waiting calmer.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {isThisItPoints.map(({ Icon, title, body }) => (
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
        <span className="font-semibold">Movements should still feel strong and regular at 38 weeks,</span>{" "}
        even with very little room left. Different patterns of feeling (more rolling, more pressure,
        less kick) are normal — a real reduction in strength or pattern is not. Phone your unit
        straight away. Day or night.
      </p>
    </div>
  </section>
);

/* 6. BODY */
const bodyNotes = [
  { Icon: Wind, title: "Heaviness at its peak", body: "Your bump is at its biggest, your body is supporting around 5–6 kg of baby, placenta and fluid, and gravity is doing its slow work. Standing for any length of time is hard. Sitting, after a while, is hard. Both are normal." },
  { Icon: Moon, title: "Sleep that isn't really sleep", body: "Vivid dreams, hip ache, restless legs, frequent weeing, and a body that can't get truly comfortable. Most people get fragmented sleep at 38 weeks. Naps, eyes-shut rest, and lying down with a podcast all count." },
  { Icon: Footprints, title: "Pelvic pressure and bowel changes", body: "As your baby presses lower, you may feel constant downward pressure, sharp pubic-bone twinges, and changes in your bowels — including episodes of looser stools, sometimes a sign that labour hormones are rising." },
];

const Body = () => (
  <section id="body" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="max-w-2xl mb-10">
        <SectionLabel tone="terracotta">Your body this week</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
          The heaviest week so far — and quietly, the most expectant.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
          Most of what your body is doing is normal end-of-pregnancy work. Some of it is the very
          first orchestra-tuning of labour.
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
    Icon: HeartPulse, name: "More insistent Braxton Hicks",
    feels: "Tightenings across the bump that may now feel firm, sometimes uncomfortable. They can come several an hour, then settle for hours.",
    why: "Your uterus is rehearsing for labour and softening the cervix.",
    normal: "Very common. Painful, regular, longer-and-stronger tightenings that don't ease — phone your unit.",
  },
  {
    Icon: Wind, name: "Deep pelvic pressure",
    feels: "A constant heavy fullness low down, with sharp pubic-bone twinges, lightning-style shoots in the cervix or vagina.",
    why: "Your baby's head pressing into nerves and engaging deeper into the pelvis.",
    normal: "Common. Sharp but harmless, unless paired with bleeding, leaking or persistent regular tightenings.",
  },
  {
    Icon: Moon, name: "Broken sleep",
    feels: "Waking three or four times a night to wee, turn over, or just because. Vivid dreams. Difficulty getting comfortable in any position.",
    why: "Heavy bump, hormonal sleep changes, hip pressure, restless legs, busy mind.",
    normal: "Universal. Pillow between knees, pillow under bump, side-sleep (left preferred). Day naps count.",
  },
  {
    Icon: Droplet, name: "Swelling, including hands and face",
    feels: "Tighter shoes, puffier ankles, sometimes swollen fingers or face by evening.",
    why: "Higher fluid volume, gravity, pressure on the veins returning blood from the legs.",
    normal: "Mild and gradual is normal. Sudden swelling in face or hands, especially with headache, vision changes or upper-tummy pain — same-day call. Sign of pre-eclampsia.",
  },
  {
    Icon: Footprints, name: "Bowel changes",
    feels: "Looser stools or more frequent bowel movements over a few days.",
    why: "Rising prostaglandins as the body prepares for labour can soften and quicken the bowels — sometimes a quiet pre-labour sign.",
    normal: "Common in the final weeks. Severe diarrhoea with vomiting or fever still needs to be checked.",
  },
  {
    Icon: Heart, name: "More colostrum leaking",
    feels: "Damp patches on your bra, drops of clear or yellow-tinged fluid.",
    why: "Your breasts are producing colostrum — the first concentrated milk — ready for your baby.",
    normal: "Normal. Some people leak a lot, some not at all. Neither predicts feeding success. Hand-expressing colostrum from 37 weeks is sometimes advised.",
  },
  {
    Icon: Eye, name: "A 'show'",
    feels: "Pink, brown or jelly-like discharge — sometimes streaked with a little blood.",
    why: "The mucus plug that has sealed your cervix is starting to come away as the cervix softens.",
    normal: "Can happen days before labour, or weeks, or not noticeably at all. Heavy fresh red bleeding is not a show — phone your maternity unit.",
  },
  {
    Icon: Brain, name: "Emotional intensity",
    feels: "Tearful one moment, fierce and impatient the next. Tender and short-tempered. Vivid dreams about the baby.",
    why: "Late-pregnancy hormones, sleep deprivation, the threshold of one of life's biggest transitions.",
    normal: "Universal. Persistent low mood, hopelessness or thoughts of harming yourself need a same-day conversation with your midwife or GP.",
  },
];

const Symptoms = () => (
  <section id="symptoms" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel>Common symptoms</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        What's likely to show up at week 38 — and what each one really means.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        Symptoms now can feel relentless. Most are normal end-of-term tuning. A few are worth knowing
        about so you can recognise what to call about and what to ride out.
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

/* 8. LABOUR SIGNS */
const labourSigns = [
  { Icon: HeartPulse, title: "Real contractions vs Braxton Hicks", body: "Real contractions get longer (30–60 seconds), stronger, and closer together — and don't ease with movement, rest, food or a warm bath. Braxton Hicks settle when you change what you're doing." },
  { Icon: Droplet, title: "Waters breaking — gush or trickle", body: "Note the time and colour. Clear or straw is normal. Pink-tinged can be normal. Green, brown or heavily bloodstained needs urgent attention. Pad on. Phone your maternity unit straight away." },
  { Icon: Eye, title: "A 'show' or mucus plug", body: "Pink, brown or jelly-like discharge, sometimes lightly streaked with blood. Can come days or weeks before labour, or not noticeably at all. Heavy bright red bleeding is not a show — call." },
  { Icon: Footprints, title: "Backache, period pain, looser bowels", body: "Some labours start in the back. Some start with deep, low, period-like aching that builds. Looser bowels for a day or two can be a quiet pre-labour sign as prostaglandins rise." },
  { Icon: AlertTriangle, title: "When to call straight away", body: "Bleeding more than a small show. Waters breaking. Reduced or changed baby movements. Severe headache, vision changes, swelling in face/hands. Severe one-sided abdominal pain. Persistent regular painful tightenings." },
  { Icon: Phone, title: "Phone first, every time", body: "Your maternity assessment unit is open 24 hours, every day. They will guide you on whether to come in, monitor at home, or wait. You will not be a nuisance. Ever." },
];

const LabourSigns = () => (
  <section id="labour-signs" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="max-w-2xl mb-10">
        <SectionLabel tone="lavender">Labour signs in detail</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
          From 38 weeks, knowing the real signs makes the false ones bearable.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
          Labour rarely starts with one dramatic moment. It usually builds — quietly, then more
          definitely. Here's what to actually watch for, and what each one means.
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
  "Wanting it over and not wanting it to start.",
  "Refreshing your own body for clues every twenty minutes.",
  "Being asked 'still here?' for the twentieth time today.",
  "Sudden tears at almost anything — sometimes nothing.",
  "Quiet birth fear that surfaces at 3am.",
  "Fierce love for the person you haven't met yet.",
  "Soft grief, sometimes, for the version of life about to change.",
];

const Emotional = () => (
  <section id="emotional" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-2 relative bg-gradient-to-br from-lavender-bg via-parchment to-lavender-bg/40 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-9 shadow-card-brand overflow-hidden">
        <img src={botanicalAccent} alt="" aria-hidden="true"
          className="absolute right-0 top-0 w-24 opacity-35 pointer-events-none select-none" />
        <SectionLabel tone="lavender">Emotionally this week</SectionLabel>
        <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-4">
          Watchful, tender, and quietly worn out.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/80 leading-[1.8] mb-4">
          Week 38 has its own emotional weather. The waiting begins to take a real toll. The
          'is this it?' loop is exhausting. The body that's been carrying you for nine months wants
          out — and also doesn't quite know how.
        </p>
        <p className="font-sans text-[14px] text-foreground/70 leading-[1.75]">
          All of this is normal. None of it predicts how labour will go, how birth will feel, or
          who you'll be on the other side. Let it all be there. Be patient with yourself.
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
  { Icon: Briefcase, title: "Bag by the door, keys in a known place", note: "All bags packed and findable. Notes, ID, charger, snacks, going-home outfit (still maternity-sized) and a soft layer for baby." },
  { Icon: Phone, title: "All numbers ready", note: "Maternity triage, day assessment, labour ward, your partner, key family. Stored in your phone, your partner's phone, and on paper somewhere visible." },
  { Icon: Hand, title: "Stay tuned to baby's movements", note: "Movements should still feel strong and regular. Any change — phone your unit. Day or night. Don't wait." },
  { Icon: Stethoscope, title: "38-week appointment", note: "BP, urine, fundal height, baby's position, conversation about the next two weeks, possibly a sweep offer from 40 weeks." },
  { Icon: Baby, title: "Soft-finalise birth preferences", note: "A calm one-page document for your team — pain relief, who's with you, what matters most, what matters if plans change." },
  { Icon: Moon, title: "Rest is the work now", note: "Late-pregnancy rest is preparation for labour. Lie down. Nap. Watch a film with your feet up. Sleep where you can. The list will wait." },
];

const Focus = () => (
  <section id="focus" className="bg-sage-bg/35 py-16 md:py-24 border-y border-border/30">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <SectionLabel tone="terracotta">Focus this week</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.2rem] text-foreground leading-tight mb-4">
            Small things, kindly. Then rest.
          </h2>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8]">
            Week 38 isn't for big projects. It's for the last small completions, the quiet
            confirmations, and the slow, deliberate refilling of your own energy.
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
            Trust your instincts. Always. Phone first, every time.
          </h3>
          <p className="font-sans text-[13.5px] text-foreground/70 leading-[1.75] mt-3">
            Your maternity assessment unit is open 24 hours, every day. They will not be put out,
            irritated, or think you're overreacting. In an emergency, dial 999.
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
        The waiting is not wasted time. It is the last quiet room of a life you will remember being held in, before the door opens.
      </p>
      <Heart size={14} className="text-terracotta/60 mx-auto mt-5" />
    </div>
  </section>
);

/* 13. REFLECTION + ASK */
const reflectionPrompts = ["What I'm hoping for", "What I'm afraid of", "What I'm proud of carrying", "What I want them to know"];
const askChips = ["Is this Braxton Hicks or labour?", "When my waters break", "How to time contractions", "If I go past my date", "What a 'show' looks like"];

const ReflectionAsk = () => (
  <PublicWeekReflectionAsk
    week={38}
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
            The almost-here weeks deserve more than a checklist.
          </h3>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8] mb-6">
            What you're carrying right now — the heaviness, the hope, the fear, the love that's
            already there — is worth keeping. The journal makes room for the soft, almost-here
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
    title: "Your baby's movements at 38 weeks",
    desc: "Movements should still feel strong and regular. What to notice, and when to call straight away." },
  { slug: "sleep-in-pregnancy", img: thirdSleepImg, tag: "Body",
    title: "Sleeping in the late third trimester",
    desc: "Side-sleeping, pillows, restless legs and the strange dreams of the final weeks." },
  { slug: "emotional-wellbeing-pregnancy", img: thirdEmotionalImg, tag: "Emotions",
    title: "The third trimester, emotionally",
    desc: "Birth fear, fierce love, the impatience of the wait, and the soft grief of a life about to change." },
  { slug: "the-space-your-baby-will-come-home-to", img: thirdNurseryImg, tag: "At home",
    title: "Preparing your space",
    desc: "What you actually need before baby arrives, what can wait, and what nesting is best spent on." },
];

const Related = () => (
  <section id="guidance" className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div className="max-w-xl">
          <SectionLabel>Read next, because of week 38</SectionLabel>
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
  { q: "Is 38 weeks full term?",
    a: "Not quite. From 37+0 you're 'early term', from 39+0 'full term', from 41+0 'late term', and from 42+0 'post-term'. Babies born at 38 weeks generally do beautifully and need no extra support. There's a small benefit, on average, to going to 39 weeks — particularly for fat stores and brain development — but birth from 38 weeks is considered safe and normal." },
  { q: "How will I know if I'm in real labour?",
    a: "Real labour usually builds: contractions become longer (around 30–60 seconds), stronger, and closer together (eventually every 3–5 minutes). They don't ease when you change activity. You may also have backache, period-like aching, looser bowels, a show, or waters breaking. Once contractions are around five minutes apart, lasting roughly a minute, for at least an hour — that's the usual signal to head in (your team will give you specific guidance). When in doubt, phone first." },
  { q: "How are Braxton Hicks different?",
    a: "Braxton Hicks tend to be irregular, often painless or only mildly uncomfortable, ease with movement or rest, and don't get longer or stronger over time. They can come several an hour for a while, then stop completely. They're your uterus rehearsing — not labour starting." },
  { q: "What should I do if my waters break?",
    a: "Note the time and the colour of the fluid (clear/straw is normal; pink-tinged can be normal; green, brown or heavily bloodstained needs urgent attention). Put on a pad. Phone your maternity unit straight away — don't wait for contractions to start. From 38 weeks they will usually want to see you the same day, often within a few hours." },
  { q: "Can I do anything to bring labour on?",
    a: "Generally no — there's no strong evidence that walking, curries, pineapple, sex, raspberry leaf tea or anything else reliably starts labour before your body is ready. From 40 or 41 weeks you may be offered a 'sweep', which is gentle and evidence-supported. Before then, your best preparation is rest." },
  { q: "Should my baby's movements feel different now?",
    a: "Movements may feel different — more rolling, stretching and pressure rather than big kicks — because there's almost no room left. But the strength and pattern should still be there. It is a myth that babies move less near the end. Any reduction or change in movement, at any time, needs you to phone your maternity assessment unit straight away. Day or night. Don't wait." },
  { q: "Is it normal to feel completely undone by the waiting?",
    a: "Yes. The end of pregnancy is genuinely hard. The body is heavy, sleep is broken, hormones are loud, and everyone keeps asking. The not-knowing is exhausting. Almost everyone has at least one tearful afternoon at 38 weeks. None of it predicts birth or motherhood. Be tender with yourself." },
  { q: "What if I go past my due date?",
    a: "Around 1 in 5 first-time pregnancies go past 41 weeks. Your team will usually offer membrane sweeps from around 40 weeks and discuss induction from around 41 weeks. There's time to talk through your options, and induction itself can take many forms. Going 'over' is normal — your due date is a midpoint estimate, not a deadline." },
];

/* 17. NEXT */
const Next = () => (
  <section className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
      <div className="bg-gradient-to-br from-sage-bg via-parchment to-stage-pregnancy/30 rounded-3xl border border-border/30 p-8 sm:p-10 md:p-14 text-center shadow-card-brand">
        <SectionLabel>Up next</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.5rem] text-foreground leading-tight mb-3">
          Ready for week 39?
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 max-w-lg mx-auto mb-8 leading-[1.8]">
          From next week you're full term. The waiting deepens again — and so does the quiet
          knowledge that any day now, the door will open.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
          <Link to="/pregnancy/week/39"
            className="inline-flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium shadow-cta hover:bg-terracotta-hover transition-colors">
            Continue to week 39 <ArrowRight size={14} />
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

const Week38Page = () => (
  <div className="min-h-screen bg-parchment">
    <PregnancyWeekSeo weekNumber={38} />
    <Navbar />
    <Hero />
    <MetaBar />
    <AtAGlance />
    <Biology />
    <IsThisIt />
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
    <WeekCommonQuestions week={38} questions={buildWeekQuestions(38, faqs)} />
    <WeekSources week={38} sources={getWeekSources(38)} />
    <Next />
    <Footer />
  </div>
);

export default Week38Page;
