import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Sprout,
  HeartPulse,
  Activity,
  Apple,
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
  Utensils,
  Brain,
  Smile,
  Users,
  Camera,
  ScanLine,
  Hand,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import fetusImg from "@/assets/week12-fetus.jpg";
import plumImg from "@/assets/week12-plum.jpg";
import biologyImg from "@/assets/week12-biology-detail.jpg";
import journalImg from "@/assets/journal-flatlay.jpg";
import botanicalTr from "@/assets/botanical-branch-tr.png";
import botanicalBl from "@/assets/botanical-branch-bl.png";
import botanicalAccent from "@/assets/article-botanical-accent.png";
import nauseaImg from "@/assets/article-hero-nausea.jpg";
import emotionalImg from "@/assets/article-hero-emotional-first-tri.jpg";
import testsScansImg from "@/assets/article-hero-tests-scans.jpg";
import symptomsStoppingImg from "@/assets/article-hero-symptoms-stopping.jpg";
import secondBodyImg from "@/assets/article-hero-second-body.jpg";
import lifestyleImg from "@/assets/article-hero-lifestyle.jpg";

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
    <div className="relative bg-gradient-to-br from-sage-bg/70 via-parchment to-lavender-bg/40 pt-20 pb-36 sm:pt-24 sm:pb-44 md:pt-32 md:pb-52">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[820px] h-[420px] rounded-full bg-sage-light/25 blur-3xl" />
        <div className="absolute -top-10 right-1/4 w-[260px] h-[260px] rounded-full bg-lavender/8 blur-3xl" />
      </div>
      <img src={botanicalBl} alt="" aria-hidden="true"
        className="pointer-events-none absolute top-20 left-0 w-[150px] lg:w-[210px] opacity-25 select-none hidden md:block" />
      <img src={botanicalTr} alt="" aria-hidden="true"
        className="pointer-events-none absolute top-20 right-0 w-[150px] lg:w-[210px] opacity-25 select-none hidden md:block" />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl relative z-10 text-center">
        <nav aria-label="breadcrumb" className="flex items-center justify-center gap-2 mb-6 sm:mb-7 font-sans text-[12px] font-normal text-foreground/65">
          <Link to="/pregnancy" className="hover:text-foreground transition-colors">Pregnancy</Link>
          <span className="text-foreground/30">›</span>
          <Link to="/pregnancy/first-trimester" className="hover:text-foreground transition-colors">Week by week</Link>
          <span className="text-foreground/30">›</span>
          <span className="text-foreground">Week 12</span>
        </nav>

        <p className="font-sans text-[11px] font-semibold tracking-[0.3em] uppercase text-sage mb-5">
          First Trimester · The threshold week
        </p>
        <h1 className="font-serif text-[2.5rem] sm:text-5xl md:text-[3.75rem] lg:text-[4.25rem] text-foreground leading-[1.04] tracking-tight mb-4 md:mb-5">
          12 Weeks Pregnant
        </h1>
        <p className="font-serif italic text-[1.05rem] sm:text-lg md:text-xl text-foreground/75 max-w-xl mx-auto leading-relaxed">
          The end of the first trimester is in sight. Around now your dating scan happens, the news often becomes real, and many people start to share it.
        </p>
      </div>

      <Link to="/pregnancy/week/11" aria-label="Go to week 11"
        className="absolute left-3 sm:left-6 md:left-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronLeft size={18} />
      </Link>
      <Link to="/pregnancy/week/13" aria-label="Go to week 13"
        className="absolute right-3 sm:right-6 md:right-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronRight size={18} />
      </Link>
    </div>

    <div className="relative -mt-28 sm:-mt-36 md:-mt-40 mb-6">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex items-end justify-center gap-5 sm:gap-10 md:gap-14">
          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-card border-[3px] border-sage/15 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={plumImg} alt="Plum" loading="lazy" width={512} height={512}
                className="w-full h-full object-cover" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.04]" />
            </div>
            <div className="text-center">
              <p className="font-serif italic text-[12.5px] text-foreground/80 leading-tight">plum</p>
              <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/55 mt-1">~5.4&nbsp;cm</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full bg-card border-[4px] border-sage/20 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={fetusImg}
                alt="Soft editorial illustration of a 12-week fetus curled in the gestational sac, with formed head, closed eyes, hands, feet and umbilical cord"
                width={1024} height={1024}
                loading="eager" decoding="async"
                className="w-full h-full object-cover scale-[1.02]" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.05]" />
            </div>
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.22em] uppercase text-foreground/65">Your baby this week</p>
          </div>

          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-stage-pregnancy/85 to-stage-pregnancy/40 border-[3px] border-terracotta/25 flex items-center justify-center shadow-elevated">
              <span className="font-serif text-[1.7rem] sm:text-[1.95rem] text-foreground tracking-tight leading-none">28</span>
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
  { id: "scan", label: "Dating scan", Icon: ScanLine },
  { id: "body", label: "Body changes", Icon: Activity },
  { id: "symptoms", label: "Symptoms", Icon: HeartPulse },
  { id: "emotional", label: "Emotionally", Icon: Heart },
  { id: "telling", label: "Telling people", Icon: Users },
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
              Updated for 2026 · 10 min read · End of first trimester
            </p>
          </div>
        </div>
        <nav aria-label="On this page" className="flex-1 pt-4 lg:pt-0">
          <div className="flex gap-x-1 gap-y-2 overflow-x-auto lg:flex-wrap scrollbar-none -mx-1 px-1">
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
  { label: "Stage", value: "End of first trimester" },
  { label: "Baby size", value: "~5.4 cm — plum" },
  { label: "Heartbeat", value: "Around 140–170 bpm" },
  { label: "Dating scan", value: "Usually weeks 11–14" },
];

const AtAGlance = () => (
  <section id="at-a-glance" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl mb-14 md:mb-20">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 relative bg-gradient-to-br from-stage-pregnancy/45 via-parchment to-parchment-dark/50 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-10 overflow-hidden shadow-card-brand">
        <img src={botanicalAccent} alt="" aria-hidden="true"
          className="absolute -left-3 bottom-0 w-28 opacity-35 pointer-events-none select-none" />
        <SectionLabel tone="terracotta">At a glance</SectionLabel>
        <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-5">
          Week 12 is a quiet threshold week.
        </h2>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8] mb-4">
          Your baby is now fully formed in miniature: every organ is in place, fingers and toes are
          separated, and tiny reflexes are starting to appear. From here, it's mostly growth and refinement.
        </p>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8]">
          For you, this is often the week of the dating scan, the first photograph, and the first
          conversation with people outside your closest circle. It can feel real in a way it didn't a
          fortnight ago — and that realness can bring relief, fear and joy all at once.
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
  { title: "Fully formed in miniature", body: "Every major organ and structure is now in place. Week 12 marks the transition from building to refining: from now until birth, the work is mostly about growth, maturity and rehearsal." },
  { title: "Tiny reflexes appear", body: "Your baby can curl fingers and toes, make sucking motions, and respond to gentle pressure on the womb. You won't feel any of it yet — they're far too small — but it's happening." },
  { title: "A face that's recognisably theirs", body: "Eyes have moved to the front of the face, ears are in their final position, and the early features that will one day look like them are quietly settling into place." },
  { title: "External genitals beginning", body: "The structures that will later identify the baby as boy or girl are forming, but it's almost always too early to tell at the dating scan. Most anatomy scans (~20 weeks) can." },
];

const Biology = () => (
  <section id="biology" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="relative rounded-3xl overflow-hidden border border-border/40 shadow-card-brand">
            <div className="aspect-[4/5]">
              <img src={biologyImg} alt="Soft editorial close-up of a 12-week fetus curled in the womb, with formed face, hands and feet"
                loading="lazy" width={1024} height={1280}
                className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-foreground/60 to-transparent">
              <p className="font-serif italic text-[13px] text-background/95 leading-snug">
                Tiny, fully formed, already practising the small movements they'll do for the rest of pregnancy.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <SectionLabel>What's underway biologically</SectionLabel>
          <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-5">
            Week 12 is when the building work quietly finishes.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8] mb-8 max-w-2xl">
            By the end of this week, the most fragile stretch of development is behind you. The placenta
            is taking over hormone production from your ovaries, which is one reason many people start to
            feel a real shift around now.
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

/* 5. DATING SCAN — Week 12 unique section */
const scanChecks = [
  { Icon: ScanLine, title: "Confirming the pregnancy is in the womb", body: "The sonographer locates the pregnancy and checks it's growing where it should be." },
  { Icon: HeartPulse, title: "Looking for a heartbeat", body: "Most parents see and hear it for the first time on this scan. It's often the moment that makes things feel real." },
  { Icon: Calendar, title: "Setting your due date", body: "Measurements of the baby's length give the most accurate due date you'll have. This is what your antenatal care is then planned around." },
  { Icon: Users, title: "Counting the babies", body: "Twins or more are confirmed at this scan. If you're carrying more than one, you'll be referred for specialist care." },
  { Icon: Brain, title: "Nuchal translucency (NT)", body: "A measurement at the back of the baby's neck, used as part of the combined screening test for Down's, Edwards' and Patau's syndromes." },
  { Icon: Camera, title: "Your first photo", body: "Most NHS units will print a scan photo for a small fee. Some parents bring change just for this." },
];

const Scan = () => (
  <section id="scan" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel tone="lavender">Your dating scan</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        The 12-week scan: what they actually look at.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        In the UK, the dating scan usually happens between weeks 11 and 14. It's typically the first time
        you'll see your baby on a screen — and the appointment that anchors the rest of your antenatal care.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {scanChecks.map(({ Icon, title, body }) => (
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

    <div className="mt-6 bg-lavender-bg/40 border border-border/30 rounded-2xl p-6 md:p-7 flex flex-col sm:flex-row sm:items-start gap-4">
      <span className="w-10 h-10 rounded-full bg-card border border-border/40 flex items-center justify-center shrink-0">
        <ShieldCheck size={15} className="text-lavender-foreground" />
      </span>
      <p className="font-sans text-[14px] text-foreground/80 leading-[1.7]">
        Screening tests are a choice, not an obligation. You can accept all of them, some of them, or none —
        and the team will support you either way. There's no pressure to decide everything before you arrive.
      </p>
    </div>
  </section>
);

/* 6. BODY */
const hormoneNotes = [
  { Icon: Sparkles, title: "Placenta takes over", body: "Around now, the placenta becomes the main source of pregnancy hormones. The hCG roller-coaster begins to settle, which is one of the biggest reasons nausea often eases." },
  { Icon: Activity, title: "Uterus rising into the abdomen", body: "Your uterus has now grown large enough to lift out of the pelvis. A small bump may be visible, especially in the evenings or after eating." },
  { Icon: Wind, title: "Blood volume noticeably higher", body: "Your circulation is working harder than ever. Some people feel warmer, slightly breathless on stairs, or notice a clearer complexion (the famous 'glow' is partly this)." },
];

const Body = () => (
  <section id="body" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="max-w-2xl mb-10">
        <SectionLabel tone="terracotta">Your body this week</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
          The first real shift of the pregnancy.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
          For many people, week 12 is when the worst of the first trimester starts to lift. It often
          isn't dramatic — more a quiet sense that the worst stretch is, slowly, behind you.
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

/* 7. SYMPTOMS — note: easing AND continuing */
const symptoms = [
  {
    Icon: Utensils, name: "Nausea, often easing",
    feels: "Less constant. You may notice a longer gap between waves, or wake up feeling almost normal.",
    why: "hCG is starting to plateau and fall. The placenta has taken over hormone production, which is gentler on your gut.",
    normal: "Very common to start easing this week. For some people, sickness lifts much later — both are normal.",
  },
  {
    Icon: Moon, name: "Energy slowly returning",
    feels: "Wanting to do a little more. Surviving an evening without falling asleep at 8pm.",
    why: "Hormone levels are settling and your body has adapted to the demands of early pregnancy.",
    normal: "Common around weeks 12–14. If exhaustion persists, your iron levels are worth checking.",
  },
  {
    Icon: Heart, name: "Bigger, less sore breasts",
    feels: "Still bigger than before, but the sharp, peeling tenderness often softens.",
    why: "The most rapid changes are behind you. From here it's slow, steady growth into the third trimester.",
    normal: "Very common. A larger, soft bra is often more useful than an underwired one.",
  },
  {
    Icon: Activity, name: "A small visible bump",
    feels: "Trousers tighter at the waistband. A gentle rounding low down, especially in the evening.",
    why: "Your uterus has lifted out of the pelvis and is starting to push forward.",
    normal: "Very common in second pregnancies, often later in first. Bump size at 12 weeks tells you very little.",
  },
  {
    Icon: Brain, name: "Round-ligament twinges",
    feels: "Sharp, brief pulls low down on one or both sides, often when you stand up or turn.",
    why: "The ligaments holding the uterus are stretching as it grows.",
    normal: "Normal. Pain that's persistent, severe, or with bleeding should always be checked.",
  },
  {
    Icon: Droplet, name: "Increased vaginal discharge",
    feels: "More milky or clear discharge than before pregnancy.",
    why: "Higher oestrogen and increased blood flow to the cervix.",
    normal: "Normal. Itching, soreness, a strong smell or yellow/green discharge needs checking — thrush is common in pregnancy.",
  },
  {
    Icon: Hand, name: "Lighter mood (sometimes)",
    feels: "Briefly excited. Less foggy. A small return of yourself.",
    why: "Less nausea and more energy make space for other feelings. The relief of approaching the scan also matters.",
    normal: "Common. Persistent low mood or anxiety still deserves a conversation with your midwife or GP.",
  },
  {
    Icon: Wind, name: "Headaches",
    feels: "Dull, persistent, often in the afternoon.",
    why: "Hormonal shifts, dehydration, low blood sugar and tiredness all stack up.",
    normal: "Common. Severe headache with visual changes or upper-tummy pain after week 20 needs urgent checking.",
  },
];

const Symptoms = () => (
  <section id="symptoms" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel>Common symptoms</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        Symptoms easing, symptoms continuing — both are normal.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        Around now, many people notice the first real shift. Others feel almost no change yet. Symptoms
        that fade earlier than expected do not mean something is wrong — that's a fear worth naming and
        gently letting go of.
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
      <Link to="/articles/symptoms-stopping-early-pregnancy"
        className="inline-flex items-center gap-2 font-sans text-[13.5px] font-medium text-sage hover:gap-3 transition-all">
        Read: when pregnancy symptoms ease <ArrowRight size={13} />
      </Link>
    </div>
  </section>
);

/* 8. EMOTIONAL */
const emotionalTruths = [
  "Counting down to the scan, with the day looped on repeat in your head.",
  "Worrying that quieter symptoms mean something has gone wrong.",
  "Feeling guilty for being relieved that nausea is easing.",
  "Wanting to tell people, and wanting to wait until after the scan.",
  "Crying when you see the heartbeat on screen.",
  "Realising the news is real now, in a way it wasn't before.",
  "Mourning the version of life that's quietly slipping away — even when this is wanted.",
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
            The threshold week.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/80 leading-[1.8] mb-4">
            Week 12 carries an unusual emotional weight. The scan is approaching, the news is becoming
            harder to hide, and the gap between private worry and public joy can feel narrow.
          </p>
          <p className="font-sans text-[14px] text-foreground/70 leading-[1.75]">
            Whatever you're feeling — relieved, terrified, numb, hopeful, all four — it fits this week.
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

/* 9. TELLING PEOPLE — Week 12 unique section */
const tellingPoints = [
  { title: "There is no 'right' time", body: "12 weeks is traditional, but plenty of people share earlier (especially if symptoms are obvious or they need support) and plenty wait longer. It's your news." },
  { title: "Telling work has its own logic", body: "You don't legally have to tell your employer until 15 weeks before your due date, but earlier disclosure unlocks pregnancy-related sickness protection, paid antenatal time and a workplace risk assessment." },
  { title: "If something goes wrong, you'll still need people", body: "One of the kindest reasons to tell a small circle early is so that, if you ever needed support, you wouldn't have to explain a pregnancy and a loss in the same breath." },
  { title: "Children, parents, friends — all different conversations", body: "There's no single way. Some families do a group video call. Some tell one person at a time, in person. Some send a quiet text. All of them are fine." },
];

const Telling = () => (
  <section id="telling" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-4">
        <SectionLabel>Telling people</SectionLabel>
        <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.2rem] text-foreground leading-tight mb-4">
          You don't owe anyone the news on a particular date.
        </h2>
        <p className="font-sans text-[14px] text-foreground/75 leading-[1.8]">
          12 weeks isn't a deadline. It's just the point where many people feel a little safer sharing.
        </p>
      </div>
      <div className="lg:col-span-8">
        <div className="bg-card rounded-3xl border border-border/40 shadow-card-brand divide-y divide-border/40 overflow-hidden">
          {tellingPoints.map((p, i) => (
            <div key={p.title} className="p-6 md:p-7">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-serif italic text-[12px] text-sage/80">0{i + 1}</span>
                <h3 className="font-serif text-[1.2rem] text-foreground leading-snug">{p.title}</h3>
              </div>
              <p className="font-sans text-[13.5px] text-foreground/70 leading-[1.75]">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* 10. FOCUS */
const focusList = [
  { Icon: ScanLine, title: "Confirm and attend your dating scan", note: "If you haven't had a date through, contact your midwife. Bring someone if you can. Bring change for a scan photo." },
  { Icon: Smile, title: "Decide about combined screening", note: "You'll be offered nuchal translucency plus a blood test for Down's, Edwards' and Patau's syndromes. You can say yes, no or 'I'd like more time'." },
  { Icon: Apple, title: "Continue folic acid until end of week 12", note: "Folic acid 400 mcg daily is recommended up to 12 weeks. Vitamin D 10 mcg daily continues throughout pregnancy." },
  { Icon: Users, title: "Decide who to tell, and how", note: "There's no rush, no script and no perfect moment. Tell people in the way that feels safe to you." },
  { Icon: Stethoscope, title: "Tell your employer if it helps", note: "Earlier disclosure often makes pregnancy-related sickness, time off for appointments and risk assessments easier to arrange." },
  { Icon: Camera, title: "Keep the scan photo somewhere safe", note: "Thermal scan paper fades. A photo of the photo on your phone, or scanning it in, is worth ten minutes now." },
];

const Focus = () => (
  <section id="focus" className="bg-sage-bg/35 py-16 md:py-24 border-y border-border/30">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <SectionLabel tone="terracotta">Focus this week</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.2rem] text-foreground leading-tight mb-4">
            A handful of meaningful, gentle decisions.
          </h2>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8]">
            Week 12 is full of small, meaningful choices. None of them need to be made all at once.
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
  "Heavy bleeding, especially with cramping or one-sided pain",
  "Severe, persistent abdominal or shoulder-tip pain",
  "Sudden and complete disappearance of pregnancy symptoms with bleeding",
  "Vomiting that stops you keeping fluids down for more than a day",
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
            Most week-12 changes are gentle. A few deserve a call.
          </h3>
          <p className="font-sans text-[13.5px] text-foreground/70 leading-[1.75] mt-3">
            Trust your instincts. Contact your midwife, GP, EPAU or NHS 111 — and 999 in an emergency.
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
        You crossed the heaviest stretch quietly, mostly on your own. Whatever this scan brings, that took something. Be gentle with yourself today.
      </p>
      <Heart size={14} className="text-terracotta/60 mx-auto mt-5" />
    </div>
  </section>
);

/* 13. REFLECTION + ASK */
const reflectionPrompts = ["How the scan felt", "Who I want to tell", "What I'm hoping for", "What I'm letting go of"];
const askChips = ["Dating scan", "NT screening", "Telling work", "Symptoms easing at 12 weeks", "When can I feel the baby move?"];

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
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.24em] uppercase text-sage">Ask about week 12</p>
            <h3 className="font-serif text-[1.3rem] sm:text-[1.35rem] text-foreground mt-0.5 leading-snug">A question on your mind?</h3>
          </div>
        </div>
        <p className="font-sans text-[13px] text-foreground/70 leading-relaxed mb-4">
          Get a calm, evidence-led answer tailored to where you are right now.
        </p>
        <input type="text" placeholder="e.g. What if my scan date is later than 12 weeks?"
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
            Keep the scan photo. Keep the day around it.
          </h3>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8] mb-6">
            The scan is the moment most parents remember. The journal gives it space — alongside how you
            felt waiting for it, who came with you, and the version of you who walked in not yet knowing.
          </p>
          <ul className="space-y-2.5 mb-7">
            {[
              "A dedicated page for your dating scan",
              "Pockets for your first photo and notes",
              "Guided prompts for every week of pregnancy",
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
  { slug: "tests-and-scans-in-pregnancy", img: testsScansImg, tag: "Care path",
    title: "Tests and scans in pregnancy",
    desc: "What happens at your dating scan, and what's coming at the anomaly scan around week 20." },
  { slug: "symptoms-stopping-early-pregnancy", img: symptomsStoppingImg, tag: "Reassurance",
    title: "When pregnancy symptoms ease",
    desc: "Why a quieter day or two around 12 weeks is usually a sign of a settling pregnancy, not a worrying one." },
  { slug: "the-first-trimester-emotionally", img: emotionalImg, tag: "Emotions",
    title: "The first trimester, emotionally",
    desc: "Holding the hidden weeks, and the threshold feeling of approaching the first scan." },
  { slug: "nausea-in-early-pregnancy", img: nauseaImg, tag: "Symptoms",
    title: "Nausea in early pregnancy",
    desc: "Why sickness often peaks in the weeks before 12, and what to expect as it begins to ease." },
  { slug: "second-trimester-body-changes", img: secondBodyImg, tag: "What's next",
    title: "Second trimester body changes",
    desc: "What to expect from your bump, energy and skin as the second trimester begins." },
  { slug: "lifestyle-in-pregnancy", img: lifestyleImg, tag: "Day to day",
    title: "Living well in pregnancy",
    desc: "Eating, moving, sleeping and working in a way that fits a real pregnant body, not a textbook." },
];

const Related = () => (
  <section id="guidance" className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div className="max-w-xl">
          <SectionLabel>Read next, because of week 12</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.4rem] text-foreground leading-tight">
            Curated guidance for what's likely on your mind right now.
          </h2>
        </div>
        <Link to="/guidance"
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
  { q: "What happens at the 12-week dating scan?",
    a: "The sonographer locates the pregnancy, confirms it's in the womb, looks for a heartbeat, counts the babies, and measures the baby's length to give you the most accurate due date you'll have. If you've consented to combined screening, they'll also measure the nuchal translucency at the back of the baby's neck. The scan usually takes about 20 minutes." },
  { q: "Is 12 weeks really the 'safe' time?",
    a: "There isn't a single magic moment when miscarriage risk drops to zero. The risk does fall steadily through the first trimester, and by the time of a healthy heartbeat at the dating scan, it's significantly lower. Many people describe feeling safer after the scan even if statistics shifted gradually." },
  { q: "Should I have the combined screening test?",
    a: "Combined screening (NT scan plus a blood test) is offered to all pregnant people in the UK and gives a chance figure for Down's, Edwards' and Patau's syndromes. It's optional. You can accept it, decline it, or say you'd like to think about it. If the chance comes back higher than the screening threshold, you'll be offered further tests — also optional." },
  { q: "When can I tell people I'm pregnant?",
    a: "Whenever feels right. 12 weeks is traditional because miscarriage risk is lower by then, but plenty of people share earlier (especially with close family, or if they need support) and plenty wait longer. You're allowed to choose your own moment for each person in your life." },
  { q: "When do I have to tell my employer?",
    a: "Legally in the UK you must tell your employer at least 15 weeks before your due date — so usually by around week 25. Earlier disclosure can be useful: it unlocks pregnancy-related sickness protection, paid time off for antenatal appointments, and a workplace risk assessment." },
  { q: "Is it normal for my bump to suddenly show this week?",
    a: "Yes. Around 12 weeks the uterus rises out of the pelvis, which can make a small bump appear quickly. Bump size at 12 weeks tells you very little about how big you'll get later — second pregnancies often show much earlier than first." },
  { q: "My nausea has stopped — should I be worried?",
    a: "Probably not. Symptoms often start to ease around weeks 12–14 as hCG plateaus and the placenta takes over. Symptom changes are not a reliable sign of miscarriage in isolation. If you're worried, especially with bleeding or pain, contact your midwife or EPAU." },
  { q: "Can I find out the baby's sex at the 12-week scan?",
    a: "Almost never reliably. The external genitals are forming but it's usually too early to tell on a standard 12-week scan. Most people find out (if they want to) at the anomaly scan around 20 weeks, or via NIPT bloods earlier if available privately." },
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
          Common questions at 12 weeks
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
          Ready for week 13?
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 max-w-lg mx-auto mb-8 leading-[1.8]">
          You're stepping into the second trimester. Energy often returns, the bump becomes more obvious,
          and the relentless intensity of early pregnancy quietly softens.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
          <Link to="/pregnancy/week/13"
            className="inline-flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium shadow-cta hover:bg-terracotta-hover transition-colors">
            Continue to week 13 <ArrowRight size={14} />
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

const Week12Page = () => (
  <div className="min-h-screen bg-parchment">
    <Navbar />
    <Hero />
    <MetaBar />
    <AtAGlance />
    <Biology />
    <Scan />
    <Body />
    <Symptoms />
    <Emotional />
    <Telling />
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

export default Week12Page;
