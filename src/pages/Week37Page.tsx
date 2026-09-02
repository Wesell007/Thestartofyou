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
import fetusImg from "@/assets/week37-fetus.jpg";
import chardImg from "@/assets/week37-chard.jpg";
import biologyImg from "@/assets/week37-biology-detail.jpg";
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
            { label: "Pregnancy", href: "/pregnancy" },
            { label: "Week by week", href: "/pregnancy/third-trimester" },
            { label: "Week 37", href: "/pregnancy/week/37" },
          ]}
        />

        <p className="font-sans text-[11px] font-semibold tracking-[0.3em] uppercase text-terracotta mb-5">
          Third Trimester · Early term
        </p>
        <h1 className="font-serif text-[2.5rem] sm:text-5xl md:text-[3.75rem] lg:text-[4.25rem] text-foreground leading-[1.04] tracking-tight mb-4 md:mb-5">
          37 Weeks Pregnant
        </h1>
        <p className="font-serif italic text-[1.05rem] sm:text-lg md:text-xl text-foreground/75 max-w-xl mx-auto leading-relaxed">
          Your baby is the size of a swiss chard leaf and now officially early term. Birth could begin any time — though most likely it won't, just yet.
        </p>
      </div>

      <Link to="/pregnancy/week/36" aria-label="Go to week 36"
        className="absolute left-3 sm:left-6 md:left-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronLeft size={18} />
      </Link>
      <Link to="/pregnancy/week/38" aria-label="Go to week 38"
        className="absolute right-3 sm:right-6 md:right-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronRight size={18} />
      </Link>
    </div>

    <div className="relative -mt-28 sm:-mt-36 md:-mt-40 mb-6">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex items-end justify-center gap-5 sm:gap-10 md:gap-14">
          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-card border-[3px] border-sage/15 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={chardImg} alt="Swiss chard" loading="lazy" width={512} height={512}
                className="w-full h-full object-cover" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.04]" />
            </div>
            <div className="text-center">
              <p className="font-serif italic text-[12.5px] text-foreground/80 leading-tight">swiss chard</p>
              <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/55 mt-1">~48&nbsp;cm</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full bg-card border-[4px] border-terracotta/25 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={fetusImg}
                alt="Soft editorial illustration of a 37-week fetus curled head-down, plump cheeks, soft hair, engaged in the pelvis with very limited room left"
                width={1024} height={1024}
                loading="eager" decoding="async"
                className="w-full h-full object-cover scale-[1.02]" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.05]" />
            </div>
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.22em] uppercase text-foreground/65">Your baby this week</p>
          </div>

          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-stage-pregnancy/85 to-stage-pregnancy/40 border-[3px] border-terracotta/25 flex items-center justify-center shadow-elevated">
              <span className="font-serif text-[1.7rem] sm:text-[1.95rem] text-foreground tracking-tight leading-none">3</span>
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
  { id: "labour-signs", label: "Labour awareness", Icon: Stethoscope },
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
              Updated for 2026 · 12 min read · Early term
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
  { label: "Stage", value: "Early term (from 37+0)" },
  { label: "Baby size", value: "~48 cm — swiss chard" },
  { label: "Baby weight", value: "Around 2.9 kg" },
  { label: "Term in", value: "Already early term — full term at 39" },
];

const AtAGlance = () => (
  <section id="at-a-glance" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl mb-14 md:mb-20">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 relative bg-gradient-to-br from-stage-pregnancy/55 via-parchment to-parchment-dark/50 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-10 overflow-hidden shadow-card-brand">
        <img src={botanicalAccent} alt="" aria-hidden="true"
          className="absolute -left-3 bottom-0 w-28 opacity-35 pointer-events-none select-none" />
        <SectionLabel tone="terracotta">At a glance</SectionLabel>
        <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-5">
          Week 37 is the week 'any time now' becomes true.
        </h2>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8] mb-4">
          You've crossed the early-term threshold. From today, if labour begins your baby is no longer
          considered preterm — and the vast majority of early-term babies do beautifully without
          extra support. Most are head-down, plumping out, and quietly finishing their last few jobs.
        </p>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8]">
          Your body feels close to its limit. Pelvic pressure is heavier, sleep is harder, Braxton
          Hicks may be more insistent. Your appointments are weekly now. Most people don't go
          into labour at 37 weeks — but for the first time, it could happen any day.
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
  { title: "Officially early term", body: "From 37+0, your baby is classed as early term rather than preterm. Lungs are mature in most babies; suck, swallow and breathing rhythms are coordinated. Birth from now is generally considered safe and normal." },
  { title: "Practising breathing and sucking", body: "Your baby is rehearsing the reflexes they'll need outside — drawing amniotic fluid in and out of their lungs, and bringing their hands to their mouth to practise sucking. They'll do both within minutes of being born." },
  { title: "Plump and term-ready", body: "Fat now makes up around 15% of body weight. Cheeks are full, limbs are rounded, and skin is smoother as the last vernix is shed. Most lanugo hair has gone, and head hair may be visible at birth — or barely there." },
  { title: "Final immunity and brain growth", body: "Antibodies are still crossing the placenta, especially against infections you've met. The brain continues growing fast — meaningful development happens in every extra week, particularly in the cortex." },
];

const Biology = () => (
  <section id="biology" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="relative rounded-3xl overflow-hidden border border-border/40 shadow-card-brand">
            <div className="aspect-[4/5]">
              <img src={biologyImg} alt="Soft editorial close-up of a 37-week fetus's plump face and tiny hand with full fingernails"
                loading="lazy" width={1024} height={1280}
                className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-foreground/60 to-transparent">
              <p className="font-serif italic text-[13px] text-background/95 leading-snug">
                Early term. Whole. Almost ready in every quiet way.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <SectionLabel>What's underway biologically</SectionLabel>
          <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-5">
            From 37 weeks, your baby is fundamentally finished — and still finishing.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8] mb-8 max-w-2xl">
            'Early term' means the major systems are mature enough for life outside. Lungs are usually
            ready. Reflexes are in place. The work of these final weeks is mostly fine-tuning — fat,
            brain, immunity, and the slow descent into the pelvis ready for birth.
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

/* 5. POSITION & ENGAGEMENT */
const positionPoints = [
  { Icon: Baby, title: "Most babies are firmly head-down", body: "By 37 weeks, around 96–97% of babies are settled head-down (cephalic). Your midwife will check the position by feeling your bump at every appointment from now — and may write it as cephalic, longitudinal lie, or note 'head down, fixed'." },
  { Icon: Footprints, title: "Engagement and 'fifths palpable'", body: "Engagement is described in fifths — how much of your baby's head can still be felt above your pubic bone. '3/5' means three-fifths palpable (two-fifths inside the pelvis); '0/5' means fully engaged. First babies often engage from now; later babies often engage in labour itself." },
  { Icon: AlertTriangle, title: "If your baby is still breech", body: "Around 3% of babies remain breech at 37 weeks. ECV (external cephalic version) is usually offered at 36–37+ weeks. If your baby stays breech, your team will discuss the safest birth route — often a planned caesarean, sometimes a vaginal breech birth in the right circumstances." },
  { Icon: Wind, title: "What 'lightening' feels like", body: "When your baby drops lower, you may suddenly find it easier to breathe and eat — and harder to walk, with new pelvic pressure, more frequent weeing, sharper pubic-bone twinges, and a visibly lower bump." },
];

const Position = () => (
  <section id="position" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel tone="terracotta">Position & engagement</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        Your baby's position matters more this week — and you'll feel it.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        At 37 weeks, position and engagement become a real focus of every appointment. Both shape what
        the next few weeks feel like — and often the early shape of your labour.
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
        <span className="font-semibold">Movements should still feel strong and regular at 37 weeks.</span>{" "}
        Less room means more rolling, stretching and pressure than big kicks — but the strength and
        pattern should be there. Any change — phone your maternity assessment unit straight away.
        Day or night.
      </p>
    </div>
  </section>
);

/* 6. BODY */
const bodyNotes = [
  { Icon: Wind, title: "Heavier pelvic pressure", body: "Your baby's head sits low against the pelvic floor, the bladder, and the cervix. Pressure can feel constant — a sense of fullness when sitting, sharp pubic-bone twinges when walking, the feeling that something is 'about to drop'." },
  { Icon: Moon, title: "Sleep at its most broken", body: "Bump weight, hip ache, restless legs, vivid dreams, frequent weeing and a busy mind all gang up. Side-sleeping with pillows everywhere is the answer most close to working. Day naps are not lazy — they're labour preparation." },
  { Icon: Footprints, title: "Walking, slowing, swelling", body: "Stairs are work. Walks are short. Ankles puff by evening, and shoes feel tighter. Your body is supporting around 5kg of baby, placenta and fluid — slow is correct, not weakness." },
];

const Body = () => (
  <section id="body" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="max-w-2xl mb-10">
        <SectionLabel tone="terracotta">Your body this week</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
          Full, low, watchful — and quietly preparing.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
          Most of what your body is doing right now is normal end-of-pregnancy work. Some of it is the
          very first signs that labour is gathering. Knowing the difference makes this week calmer.
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
    Icon: HeartPulse, name: "Insistent Braxton Hicks",
    feels: "Tightenings across the bump that may now feel firm, and sometimes uncomfortable. They can come several times an hour, then settle.",
    why: "Your uterus is rehearsing for labour and may be quietly softening and ripening the cervix.",
    normal: "Very common from 37 weeks. Painful, increasingly regular tightenings — especially with leaking, pressure or any bleeding — need to be assessed.",
  },
  {
    Icon: Wind, name: "Lightning crotch and pubic pain",
    feels: "Sharp, electric pains low in the cervix, pubic bone or vagina — sometimes one-sided, sometimes shooting down a thigh.",
    why: "Your baby's head pressing into nerves and engaging deeper into the pelvis.",
    normal: "Common in the final weeks. Sharp but harmless, unless paired with bleeding, leaking or persistent regular tightenings.",
  },
  {
    Icon: Moon, name: "Disrupted sleep",
    feels: "Waking three or four times a night to wee, turn over, or just because. Difficulty getting comfortable in any position.",
    why: "Heavy bump, hormonal sleep changes, vivid pregnancy dreams, hip pressure, restless legs.",
    normal: "Universal. Pillow between knees, pillow under bump, lie on your side (left preferred). Day naps count.",
  },
  {
    Icon: Droplet, name: "Swelling and puffiness",
    feels: "Tighter shoes by evening, puffier ankles, sometimes swollen fingers or face.",
    why: "Higher fluid volume, gravity, and pressure on the veins returning blood from the legs.",
    normal: "Mild, gradual swelling is normal. Sudden swelling in the face or hands, especially with headache or vision changes, must be checked the same day — sign of pre-eclampsia.",
  },
  {
    Icon: Footprints, name: "Pelvic girdle pain (PGP)",
    feels: "Sharp pubic-bone pain when walking, getting in and out of cars, or rolling in bed. Sometimes a clicking feeling.",
    why: "Relaxin softens pelvic joints; your baby's weight pushes against them.",
    normal: "Common. Physiotherapy genuinely helps — ask your midwife for a referral. Take stairs one at a time, keep knees together rolling in bed.",
  },
  {
    Icon: Heart, name: "Colostrum leaking",
    feels: "Damp patches on your bra, drops of clear or yellow-tinged fluid.",
    why: "Your breasts are producing colostrum — the first concentrated milk — ready for your baby.",
    normal: "Normal. Some people leak a lot, some not at all — neither predicts feeding success. Some hand-express colostrum from 37 weeks if advised by their midwife.",
  },
  {
    Icon: Brain, name: "Strong nesting urges",
    feels: "Sudden, intense need to clean, sort, organise. Sometimes wakeful in the night with a list.",
    why: "Hormonal shifts and a quiet biological pull towards readying the space.",
    normal: "Very common. Ride it gently — don't end up exhausted before labour.",
  },
  {
    Icon: Eye, name: "Possible 'show'",
    feels: "A small amount of pink, brown or jelly-like discharge — sometimes lightly streaked with blood.",
    why: "The mucus plug that has sealed your cervix is starting to come away as the cervix softens.",
    normal: "Can happen days or weeks before labour, or not noticeably at all. Heavy fresh red bleeding is not a show — phone your maternity unit.",
  },
];

const Symptoms = () => (
  <section id="symptoms" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel>Common symptoms</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        What's likely to show up at week 37 — and what each one really means.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        Symptoms now can feel more intense than at any point in pregnancy. Most are normal end-of-term
        tuning. A few are worth knowing about so you can recognise what to call about and what to ride out.
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

/* 8. LABOUR AWARENESS */
const labourSigns = [
  { Icon: HeartPulse, title: "Braxton Hicks vs the real thing", body: "Braxton Hicks are usually irregular, ease with movement or rest, and don't get longer or stronger over time. Real contractions get longer (30–60 seconds), stronger, and closer together — and don't stop when you change activity." },
  { Icon: Droplet, title: "Waters breaking", body: "Sometimes a sudden gush, more often a slow trickle that doesn't stop. Note time and colour, put on a pad, and call your maternity unit. From 37 weeks, you'll usually be assessed within 24 hours, often sooner." },
  { Icon: Eye, title: "A 'show'", body: "Pinkish, brownish or jelly-like discharge as the mucus plug comes away. Can happen days or weeks before labour, or not noticeably at all. Not a reason to call unless heavy fresh red bleeding." },
  { Icon: AlertTriangle, title: "When to call straight away", body: "Bleeding more than a small show. Waters breaking. Reduced or changed baby movements. Severe headache, vision changes, swelling in face/hands. Severe one-sided abdominal pain. Persistent regular painful tightenings." },
  { Icon: Phone, title: "Phone first, every time", body: "Your maternity assessment unit is open 24 hours a day, every day of the year. They will help you work out whether to come in, monitor at home, or wait. You will not be a nuisance. Ever." },
  { Icon: Calendar, title: "Group B Strep (GBS) awareness", body: "The UK doesn't routinely test for GBS, but you'll be asked. If you've had GBS in a previous pregnancy or it's been picked up incidentally, antibiotics in labour reduce the small risk of infection to your baby." },
];

const LabourSigns = () => (
  <section id="labour-signs" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="max-w-2xl mb-10">
        <SectionLabel tone="lavender">Labour awareness</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
          From 37 weeks, every twinge gets a second look — and that's reasonable.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
          Most people don't go into labour at 37 weeks — average first labour is around 40+5. But for
          the first time, it's possible. Knowing what to watch for, and what to ignore, makes the
          waiting calmer.
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
  "Wanting it to start, and being terrified of it starting.",
  "Refreshing your own body for signs every twenty minutes.",
  "Being asked 'any sign yet?' for the tenth time today.",
  "Sudden fierce love for the person you haven't met.",
  "Quiet birth fear that surfaces in the small hours.",
  "Soft grief, sometimes, for the version of life about to change.",
  "Wishing the next three weeks would both speed up and slow down.",
];

const Emotional = () => (
  <section id="emotional" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-2 relative bg-gradient-to-br from-lavender-bg via-parchment to-lavender-bg/40 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-9 shadow-card-brand overflow-hidden">
        <img src={botanicalAccent} alt="" aria-hidden="true"
          className="absolute right-0 top-0 w-24 opacity-35 pointer-events-none select-none" />
        <SectionLabel tone="lavender">Emotionally this week</SectionLabel>
        <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-4">
          The 'any time now' feeling is real — and it's exhausting.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/80 leading-[1.8] mb-4">
          Birth could be tonight. It could be in five weeks. The not-knowing is one of the most
          charged emotional spaces in pregnancy.
        </p>
        <p className="font-sans text-[14px] text-foreground/70 leading-[1.75]">
          Excitement, dread, longing, fear, tenderness and impatience can all live in one afternoon.
          Let them all be there. None of them mean anything is wrong with you, or your bond, or your baby.
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
  { Icon: Briefcase, title: "Hospital bag fully packed by the door", note: "Birth bag, baby bag, partner bag. Notes, ID, phone charger, snacks, going-home clothes (still maternity-sized) and something soft for baby." },
  { Icon: Phone, title: "Maternity unit numbers saved", note: "Triage, day assessment, labour ward. In your phone, your partner's phone, and written somewhere visible at home." },
  { Icon: Hand, title: "Stay tuned to baby's movements", note: "Movements should still feel strong and regular. Any change in pattern, strength or character — phone your unit. Day or night." },
  { Icon: Stethoscope, title: "Attend your 37/38-week check", note: "BP, urine, fundal height, baby's position confirmed. Conversation about birth preferences, GBS, and what's next if you go past 41 weeks." },
  { Icon: Baby, title: "Soft-finalise birth preferences", note: "Not a rigid plan — a calm one-page document for your team about pain relief preferences, who's with you, the kind of birth you're hoping for, and what matters if plans change." },
  { Icon: Moon, title: "Rest like it's your job", note: "Late-pregnancy rest is preparation for labour, not laziness. Lie down. Nap. Watch a film with your feet up. The to-do list will wait. Sleep where you can." },
];

const Focus = () => (
  <section id="focus" className="bg-sage-bg/35 py-16 md:py-24 border-y border-border/30">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <SectionLabel tone="terracotta">Focus this week</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.2rem] text-foreground leading-tight mb-4">
            Ready enough — then quietly conserve.
          </h2>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8]">
            Week 37 is for finishing the practical pieces, telling your team what matters, and then
            resting in earnest. Energy spent now is energy borrowed from labour.
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
  "Regular painful tightenings that don't ease with rest",
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
        You don't have to be ready. You only have to be here, in the slow rooms of these last weeks, listening for the body that already knows what to do.
      </p>
      <Heart size={14} className="text-terracotta/60 mx-auto mt-5" />
    </div>
  </section>
);

/* 13. REFLECTION + ASK */
const reflectionPrompts = ["What I'm hoping for in birth", "What I'm afraid of", "What I'm proud of", "What I want them to know"];
const askChips = ["Braxton Hicks vs labour", "What 'engaged' means", "Sleeping at 37 weeks", "If my waters break", "When to phone the unit"];

const ReflectionAsk = () => (
  <PublicWeekReflectionAsk
    week={37}
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
            The weeks of waiting deserve a record, not just a checklist.
          </h3>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8] mb-6">
            What you're carrying right now — the hope, the dread, the love that's already there, the
            quiet hours — is worth keeping. The journal makes room for the soft, almost-here moments
            before they vanish into the early days of being a parent.
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
    title: "Your baby's movements at 37 weeks",
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
          <SectionLabel>Read next, because of week 37</SectionLabel>
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
  { q: "Am I officially at term at 37 weeks?",
    a: "You're 'early term' from 37+0. From 39+0 you're 'full term', and from 41+0 'late term'. Babies born from 37 weeks generally do beautifully and are not considered preterm — though each extra week from now still adds finishing touches, especially to brain development and fat stores. There's a small benefit, on average, to going to 39 weeks if your pregnancy is straightforward." },
  { q: "Could labour really start this week?",
    a: "Yes — but most likely it won't. The average length of a first pregnancy is around 40+5, and around 80% of babies arrive between 38 and 42 weeks. About 5–8% of babies arrive between 37 and 38 weeks. So labour is possible from now, just not statistically likely yet." },
  { q: "How do I know if it's Braxton Hicks or real labour?",
    a: "Braxton Hicks tend to be irregular, often painless or only mildly uncomfortable, ease with movement or rest, and don't get longer or stronger over time. Real contractions get progressively longer (around 30–60 seconds), stronger, and closer together (eventually every 3–5 minutes). They don't ease when you change activity. If you're unsure, phone your maternity assessment unit." },
  { q: "What should I do if my waters break at 37 weeks?",
    a: "Note the time and the colour of the fluid (clear/straw is normal; pink-tinged can be normal; green, brown or heavily bloodstained needs urgent attention). Put on a pad. Phone your maternity unit straight away — don't wait for contractions to start. They will usually want to see you within 24 hours, often sooner from 37 weeks onwards." },
  { q: "Should I be doing anything to bring labour on?",
    a: "Generally no — there's no strong evidence that walking, curries, pineapple, sex, raspberry leaf tea or anything else reliably starts labour before your body is ready. Some people are offered a 'sweep' from 40 or 41 weeks, which is gentle and evidence-supported. Before then, your job is simply to rest and let your body do the slow work of getting ready." },
  { q: "Should my baby's movements feel different now?",
    a: "Movements may feel different — more rolling, stretching and pressure rather than big kicks — because there's less room. But the strength and pattern should still be there. It is a myth that babies move less near the end. Any reduction or change in movement, at any time, needs you to phone your maternity assessment unit straight away. Day or night. Don't wait." },
  { q: "Is it normal to feel completely unprepared?",
    a: "Yes. Almost everyone feels some version of this in the final weeks, even people on their second or third baby. The 'ready' feeling tends to arrive in the doing of it — when labour starts, when the baby is in your arms — not in a clean to-do list before. The bags packed, the team on call, the people who love you knowing what to do: that's enough." },
  { q: "What if my baby is still breech at 37 weeks?",
    a: "Around 3% of babies remain breech at 37 weeks. ECV (external cephalic version) is usually offered at 36–37+ weeks. If your baby stays breech, your team will discuss the safest birth route — usually a planned caesarean, sometimes a vaginal breech birth in the right circumstances. Either way, your options will be talked through clearly." },
];

/* 17. NEXT */
const Next = () => (
  <section className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
      <div className="bg-gradient-to-br from-sage-bg via-parchment to-stage-pregnancy/30 rounded-3xl border border-border/30 p-8 sm:p-10 md:p-14 text-center shadow-card-brand">
        <SectionLabel>Up next</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.5rem] text-foreground leading-tight mb-3">
          Ready for week 38?
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 max-w-lg mx-auto mb-8 leading-[1.8]">
          The waiting deepens. The body grows heavier. The 'is this it?' moments multiply. Week 38 is
          where the final chapter starts to feel imminent.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
          <Link to="/pregnancy/week/38"
            className="inline-flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium shadow-cta hover:bg-terracotta-hover transition-colors">
            Continue to week 38 <ArrowRight size={14} />
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

const Week37Page = () => (
  <div className="min-h-screen bg-parchment">
    <PregnancyWeekSeo weekNumber={37} />
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
    <WeekCommonQuestions week={37} questions={buildWeekQuestions(37, faqs)} />
    <WeekSources week={37} sources={getWeekSources(37)} />
    <Next />
    <Footer />
  </div>
);

export default Week37Page;
