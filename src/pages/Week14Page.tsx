import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ChevronLeft, ChevronRight, Sprout, HeartPulse, Activity, Sparkles, Calendar, BookOpen,
  ArrowRight, Check, AlertTriangle, Plus, Minus, Heart, MessageCircle, Leaf, Moon,
  Coffee, ShieldCheck, Stethoscope, Wind, Soup, Brain, Eye, Users, Sun, Hand, Smile, Apple,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import fetusImg from "@/assets/week14-fetus.jpg";
import lemonImg from "@/assets/week14-lemon.jpg";
import biologyImg from "@/assets/week14-biology-detail.jpg";
import journalImg from "@/assets/journal-flatlay.jpg";
import botanicalTr from "@/assets/botanical-branch-tr.png";
import botanicalBl from "@/assets/botanical-branch-bl.png";
import botanicalAccent from "@/assets/article-botanical-accent.png";
import emotionalImg from "@/assets/article-hero-emotional-first-tri.jpg";
import secondBodyImg from "@/assets/article-hero-second-body.jpg";
import secondEatingImg from "@/assets/article-hero-second-eating.jpg";
import secondAnxietyImg from "@/assets/article-hero-second-anxiety.jpg";
import secondMovementImg from "@/assets/article-hero-second-movement-exercise.jpg";
import secondSleepImg from "@/assets/article-hero-second-sleep.jpg";

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
    <div className="relative bg-gradient-to-br from-sage-bg/55 via-parchment to-stage-pregnancy/45 pt-20 pb-36 sm:pt-24 sm:pb-44 md:pt-32 md:pb-52">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[820px] h-[420px] rounded-full bg-sage-bg/40 blur-3xl" />
        <div className="absolute -top-10 right-1/4 w-[260px] h-[260px] rounded-full bg-terracotta/8 blur-3xl" />
      </div>
      <img src={botanicalBl} alt="" aria-hidden="true" className="pointer-events-none absolute top-20 left-0 w-[150px] lg:w-[210px] opacity-25 select-none hidden md:block" />
      <img src={botanicalTr} alt="" aria-hidden="true" className="pointer-events-none absolute top-20 right-0 w-[150px] lg:w-[210px] opacity-25 select-none hidden md:block" />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl relative z-10 text-center">
        <nav aria-label="breadcrumb" className="flex items-center justify-center gap-2 mb-6 sm:mb-7 font-sans text-[12px] font-normal text-foreground/65">
          <Link to="/pregnancy" className="hover:text-foreground transition-colors">Pregnancy</Link>
          <span className="text-foreground/30">›</span>
          <Link to="/pregnancy/second-trimester" className="hover:text-foreground transition-colors">Week by week</Link>
          <span className="text-foreground/30">›</span>
          <span className="text-foreground">Week 14</span>
        </nav>

        <p className="font-sans text-[11px] font-semibold tracking-[0.3em] uppercase text-sage mb-5">
          Second trimester · The settling-in week
        </p>
        <h1 className="font-serif text-[2.5rem] sm:text-5xl md:text-[3.75rem] lg:text-[4.25rem] text-foreground leading-[1.04] tracking-tight mb-4 md:mb-5">
          14 Weeks Pregnant
        </h1>
        <p className="font-serif italic text-[1.05rem] sm:text-lg md:text-xl text-foreground/75 max-w-xl mx-auto leading-relaxed">
          Your baby is the size of a lemon — making facial expressions, growing fine downy hair, and starting to look properly settled in. Outside, the second trimester is beginning to feel like its own season. Energy is finding its way back. Appetite is too. The body, slowly, becomes recognisable again.
        </p>
      </div>

      <Link to="/pregnancy/week/13" aria-label="Go to week 13" className="absolute left-3 sm:left-6 md:left-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronLeft size={18} />
      </Link>
      <Link to="/pregnancy/week/15" aria-label="Go to week 15" className="absolute right-3 sm:right-6 md:right-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronRight size={18} />
      </Link>
    </div>

    <div className="relative -mt-28 sm:-mt-36 md:-mt-40 mb-6">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex items-end justify-center gap-5 sm:gap-10 md:gap-14">
          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-card border-[3px] border-sage/15 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={lemonImg} alt="A fresh lemon with a single green leaf" loading="lazy" width={512} height={512} className="w-full h-full object-cover" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.04]" />
            </div>
            <div className="text-center">
              <p className="font-serif italic text-[12.5px] text-foreground/80 leading-tight">lemon</p>
              <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/55 mt-1">~8.7&nbsp;cm</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full bg-card border-[4px] border-sage/30 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={fetusImg} alt="Soft editorial illustration of a 14-week fetus: more balanced proportions, defined neck, fine lanugo hair beginning, hands at the face, gently curled in the gestational sac" width={1024} height={1024} loading="eager" decoding="async" className="w-full h-full object-cover scale-[1.02]" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.05]" />
            </div>
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.22em] uppercase text-foreground/65">Your baby this week</p>
          </div>

          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-sage-bg to-stage-pregnancy/40 border-[3px] border-sage/25 flex items-center justify-center shadow-elevated">
              <span className="font-serif text-[1.7rem] sm:text-[1.95rem] text-foreground tracking-tight leading-none">26</span>
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-sage/20" />
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
  { id: "biology", label: "Inside this week", Icon: Sprout },
  { id: "settling", label: "Settling in", Icon: Sun },
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
            <p className="font-sans text-[13px] font-medium text-foreground leading-snug">✔ Medically reviewed by Jenny Joines</p>
            <p className="font-sans text-[11.5px] font-normal text-foreground/60 mt-0.5">Updated for 2026 · 12 min read · Settling into the second trimester</p>
          </div>
        </div>
        <nav aria-label="On this page" className="flex-1 pt-4 lg:pt-0">
          <div className="flex gap-x-1 gap-y-2 overflow-x-auto lg:flex-wrap scrollbar-none -mx-1 px-1">
            {anchors.map(({ id, label, Icon }) => (
              <a key={id} href={`#${id}`} className="group shrink-0 flex items-center gap-2 px-3 py-2 rounded-full hover:bg-sage-bg/50 transition-colors">
                <span className="w-7 h-7 rounded-full bg-parchment-dark/80 border border-border/30 flex items-center justify-center group-hover:border-sage/40 transition-colors">
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
  { label: "Stage", value: "Early second trimester" },
  { label: "Baby size", value: "~8.7 cm — lemon" },
  { label: "Baby weight", value: "~43 g" },
  { label: "Trimester", value: "2 of 3 (week 14 of 27)" },
];

const AtAGlance = () => (
  <section id="at-a-glance" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl mb-14 md:mb-20">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 relative bg-gradient-to-br from-sage-bg/55 via-parchment to-stage-pregnancy/40 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-10 overflow-hidden shadow-card-brand">
        <img src={botanicalAccent} alt="" aria-hidden="true" className="absolute -left-3 bottom-0 w-28 opacity-35 pointer-events-none select-none" />
        <SectionLabel tone="sage">At a glance</SectionLabel>
        <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-5">
          The week pregnancy starts to feel like its own quiet season.
        </h2>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8] mb-4">
          Inside, your baby is around 8.7 cm long and weighs roughly 43 grams. Facial muscles are practising
          expressions — squinting, frowning, smiling, sucking. Fine downy lanugo hair is starting to appear on
          the skin. Hands open and close. The thyroid is producing its own hormones for the first time.
        </p>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8]">
          Outside, energy is properly returning for many. Appetite often comes back, sometimes with surprise.
          Some people see the first hint of a real bump. None of that is universal — and not everyone feels
          better at week 14. The settling, when it comes, comes gently.
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

const biologyPoints = [
  { title: "Facial expressions practising in private", body: "The tiny muscles of the face are now connected enough to make expressions. Your baby may squint, frown, grimace, smile, and even practise sucking and swallowing. None of these are reactions to anything yet — they're rehearsals. By the time you meet your baby, every one of these expressions will already have been used a thousand times." },
  { title: "Fine lanugo hair beginning", body: "Downy, ultra-fine hair called lanugo starts to grow on the skin this week. It helps regulate temperature and holds the protective vernix in place later. Most lanugo sheds before birth, though some babies — especially earlier ones — are still covered in it at delivery. It tends to be most visible on the back, shoulders and forehead." },
  { title: "Thyroid switching on", body: "Your baby's thyroid is now functional and starting to produce its own hormones — the same hormones that regulate growth and development for the rest of life. Iodine in your diet (or your pregnancy multivitamin) directly supports this. Around now is also when the kidneys start producing more urine that becomes part of the amniotic fluid." },
  { title: "Movement no one feels yet", body: "Your baby is moving constantly — kicking, stretching, turning, hands exploring the face — but at 14 weeks the movements are still far too small for you to feel from the outside. First flutters (sometimes called 'quickening') tend to come between weeks 16 and 22 in a first pregnancy, and earlier in second pregnancies." },
];

const Biology = () => (
  <section id="biology" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="relative rounded-3xl overflow-hidden border border-border/40 shadow-card-brand">
            <div className="aspect-[4/5]">
              <img src={biologyImg} alt="Soft editorial close-up of a 14-week fetus: more balanced proportions, defined neck, refined facial features, hands exploring near the face, fine lanugo hair appearing on the skin, suspended in the gestational sac" loading="lazy" width={1024} height={1280} className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-foreground/60 to-transparent">
              <p className="font-serif italic text-[13px] text-background/95 leading-snug">
                Eight and a half centimetres. Faces practising. The week the body becomes a body.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <SectionLabel>What's underway biologically</SectionLabel>
          <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-5">
            The big build is done — now your baby is rehearsing being a baby.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8] mb-8 max-w-2xl">
            Week 14 is one of the gentlest weeks of pregnancy biologically. The frantic build of the first
            trimester is behind you. Every essential structure is in place. The work now is refinement: faces
            learning to move, hair beginning to grow, organs starting to function on their own, and the body
            settling into a longer, calmer rhythm of growth.
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

const settlingPoints = [
  { Icon: Sun, title: "Energy returning, sometimes startlingly", body: "Many people notice a meaningful, sustained lift in energy this week or next. The first afternoon you don't have to lie down. The first evening you genuinely want to do something. It often comes in waves rather than as a single switch — a clear day, then a tired one — but the trend line is real for most people between weeks 14 and 16." },
  { Icon: Apple, title: "Appetite returning, often with surprise", body: "Foods that have been impossible for months may suddenly become tolerable, or even craved. Many people notice a real, deep hunger return — sometimes startlingly so. Eating little and often is still wise (the uterus is rising and digestion is still slow), but you're allowed to enjoy food again, in whatever shape that takes." },
  { Icon: Activity, title: "The first real hint of a bump", body: "Your uterus is now sitting just above the pubic bone, and the lower belly often starts to feel firmer and slightly rounded. First-time pregnancies usually don't show clearly yet, but you may feel it before anyone else can see it. Second and later pregnancies often start to show this week or earlier — the abdominal muscles have stretched before." },
  { Icon: Smile, title: "A more visible pregnancy, slowly", body: "If you've shared the news, this is often the week other people start to ask, comment, and notice. For some that feels lovely. For others it feels exposing, especially after months of holding the news privately. Both responses are valid. You get to set the terms of how visible the pregnancy is, even now." },
];

const Settling = () => (
  <section id="settling" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel tone="sage">Settling in</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        The week the second trimester starts to feel like its own thing.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        Week 14 is when many people first notice the second trimester actually feels different from the first —
        not just biologically, but in the texture of daily life. Energy, appetite, body shape, social visibility:
        the whole shape of the pregnancy starts to shift.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {settlingPoints.map(({ Icon, title, body }) => (
        <div key={title} className="relative bg-card rounded-2xl border border-border/40 p-6 md:p-7 shadow-card-brand overflow-hidden">
          <span className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sage/40 to-transparent" />
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

    <div className="mt-6 bg-stage-pregnancy/40 border border-terracotta/15 rounded-2xl p-6 md:p-7 flex flex-col sm:flex-row sm:items-start gap-4">
      <span className="w-10 h-10 rounded-full bg-card border border-terracotta/20 flex items-center justify-center shrink-0">
        <Heart size={15} className="text-terracotta" />
      </span>
      <p className="font-sans text-[14px] text-foreground/85 leading-[1.7]">
        <span className="font-semibold">Not everyone feels better at week 14.</span>{" "}
        Around 1 in 5 people still have ongoing nausea here. Some don't feel a real lift until weeks 16–18,
        and a small number have symptoms much longer. None of that is a sign anything is wrong. Your timeline
        is allowed to be its own.
      </p>
    </div>
  </section>
);

const bodyNotes = [
  { Icon: Activity, title: "Lower belly rounder, firmer, rising", body: "Your uterus has now risen clearly above the pubic bone, and your midwife may feel the top of it (the fundus) several centimetres up. The lower belly often feels firmer and rounder. For many first-time pregnancies, this is the week the bump starts to feel real to you, even if it isn't yet obvious to others." },
  { Icon: Soup, title: "Appetite back — sometimes very back", body: "Many people notice a real, deep hunger this week. Foods that had been impossible may become tolerable or actively wanted. Eating little and often still helps — the uterus is rising, the bowel is being pressed on, and digestion is still slow. Protein, iron-rich foods, fruit, vegetables and whole grains do most of the work." },
  { Icon: Hand, title: "Round ligament pulling, more often", body: "The supporting ligaments around the uterus are stretching more visibly now, especially when you change position quickly. You may feel a sharp pulling low in the pelvis or groin when you sneeze, stand up, or roll over in bed. Common, harmless, and usually settles within a few seconds." },
];

const Body = () => (
  <section id="body" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="max-w-2xl mb-10">
        <SectionLabel tone="terracotta">Your body this week</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
          The body that survived the hardest weeks is reorganising — visibly now.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
          Week 14 brings real, observable changes for many people: a firmer lower belly, a steadier appetite,
          slightly more energy. The pace is calmer than the first trimester, but the shifts are clearer. The
          body is settling into being a longer-term host.
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
  {
    Icon: Sun, name: "Energy properly returning",
    feels: "An afternoon you don't have to lie down. The first evening in months you actively want to do something. Often uneven — a clear day, then a tired one — before settling.",
    why: "The placenta is fully producing hormones in a steadier rhythm, oxygen-carrying capacity is up, and the body has adapted to higher blood volume.",
    normal: "Very common. If you stay flattened, please mention it — anaemia, low iron and thyroid changes are common in the second trimester and easily checked.",
  },
  {
    Icon: Apple, name: "Appetite returning — sometimes intensely",
    feels: "A real, deep hunger you haven't felt in months. Specific cravings, sometimes for things you didn't expect. A surprising joy in eating again.",
    why: "Nausea-causing hormones have peaked and fallen. Your baby is growing rapidly and your blood volume is still climbing — your body actually needs more food now.",
    normal: "Very common. Aim for steady, small, frequent meals rather than grazing, and prioritise protein, iron-rich foods, fruit and veg. Cravings for non-food items (ice, chalk, soil) need a GP check — they can signal iron deficiency.",
  },
  {
    Icon: Activity, name: "Round ligament pulling & stretching",
    feels: "Sharp, brief pulling sensations low in the pelvis when you change position quickly, sneeze, or roll over in bed. Sometimes a dull ache low in the groin.",
    why: "The ligaments supporting the uterus are stretching more obviously as it rises and grows. The weight of the uterus is also tipping forward.",
    normal: "Very common, brief, and reassuring. Move slowly, support yourself with a pillow when sleeping, and warm baths can help. Persistent or severe one-sided pain needs a phone call to your midwife.",
  },
  {
    Icon: Wind, name: "Sluggish digestion & constipation",
    feels: "Going to the loo less often. Trapped wind. Heartburn after meals. A 'pregnant by bedtime' kind of swelling some evenings.",
    why: "Progesterone slows the digestive tract. The uterus is now pressing on the bowel from above the pelvis. Iron in pregnancy multivitamins worsens constipation for many.",
    normal: "Very common. Drink water, eat fibre, walk daily, and ask your GP about a different multivitamin if iron is the issue. Lactulose is safe in pregnancy.",
  },
  {
    Icon: Eye, name: "Pigmentation, melasma & linea nigra",
    feels: "A faint dark line down the centre of the belly (linea nigra) starting to appear or darken. Patches of darker pigment on the cheeks or forehead (melasma). Darker nipples and areolas.",
    why: "Pregnancy hormones increase melanin production. UV exposure amplifies it. Most pigmentation changes are most pronounced in the second and third trimesters.",
    normal: "Very common. Wear high SPF on the face daily — sun exposure is the biggest accelerator. Most pigmentation changes fade in the year after birth.",
  },
  {
    Icon: Brain, name: "Pregnancy brain & forgetfulness",
    feels: "Walking into a room and forgetting why. Losing words mid-sentence. Forgetting appointments. A sense of being more easily distracted than usual.",
    why: "Hormonal shifts, sleep changes, and the cognitive load of carrying a pregnancy all play a part. Some research suggests structural changes in the brain in pregnancy that support bonding later.",
    normal: "Very common, often mocked, very real. Lists, phone reminders and saying things out loud genuinely help. Most people feel it lifts in the months after birth.",
  },
  {
    Icon: Hand, name: "Nasal congestion & nosebleeds",
    feels: "A blocked-feeling nose. Occasional nosebleeds. A slightly croaky morning voice. Snoring more than usual.",
    why: "Higher blood volume swells nasal vessels, and oestrogen swells the mucosa. This is 'pregnancy rhinitis' and is very common from the late first trimester onwards.",
    normal: "Very common. Saline sprays, a humidifier at night, and gentle steam help. Heavy or prolonged nosebleeds, or breathing problems, should be checked.",
  },
  {
    Icon: Stethoscope, name: "Increased vaginal discharge",
    feels: "More white, milky, mild-smelling discharge than usual. Often noticeable enough to warrant a panty liner.",
    why: "Higher oestrogen levels and increased blood flow to the cervix and vaginal walls. It's part of the body's protective barrier in pregnancy.",
    normal: "Very common and reassuring. Itching, burning, a strong smell, green/yellow colour, or any blood needs a GP or midwife check — thrush and bacterial infections are easily treated.",
  },
];

const Symptoms = () => (
  <section id="symptoms" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel>Common symptoms</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        What's likely to show up at week 14 — and what each one really means.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        Week 14 is mostly the easing of old symptoms and the appearance of slower, longer-running ones. The
        pace is gentler than the first trimester, but new things still show up — and not feeling instantly
        better is also common.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
      {symptoms.map(({ Icon, name, feels, why, normal }) => (
        <article key={name} className="group relative bg-card rounded-2xl border border-border/40 p-6 md:p-7 shadow-card-brand hover:shadow-soft transition-all duration-500">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border/40">
            <span className="w-10 h-10 rounded-full bg-sage-bg flex items-center justify-center">
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
      <Link to="/articles/second-trimester-body" className="inline-flex items-center gap-2 font-sans text-[13.5px] font-medium text-sage hover:gap-3 transition-all">
        Read: how the body shifts as the second trimester begins <ArrowRight size={13} />
      </Link>
    </div>
  </section>
);

const emotionalTruths = [
  "Feeling more like yourself, and not quite recognising the version that's coming back.",
  "Realising you've been holding the secret in your shoulders for months.",
  "Letting yourself imagine a name. Then a room. Then a future.",
  "Strangers starting to look at the bump before they look at you.",
  "Wanting to be excited and being startled when something fierce shows up instead.",
  "Catching yourself talking to your baby for the first time.",
  "A different kind of tiredness — softer, less defensive, but still real.",
];

const Emotional = () => (
  <section id="emotional" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 relative bg-gradient-to-br from-lavender-bg via-parchment to-lavender-bg/40 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-9 shadow-card-brand overflow-hidden">
          <img src={botanicalAccent} alt="" aria-hidden="true" className="absolute right-0 top-0 w-24 opacity-35 pointer-events-none select-none" />
          <SectionLabel tone="lavender">Emotionally this week</SectionLabel>
          <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-4">
            More embodied — and not necessarily more calm.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/80 leading-[1.8] mb-4">
            Week 14 is a softer week for many, but settling in isn't the same as being settled. Energy returns
            before the worry does. The body becomes more visibly pregnant before the mind quite catches up.
            Naming a baby and bracing for what could go wrong can sit beside each other, sometimes in the
            same minute.
          </p>
          <p className="font-sans text-[14px] text-foreground/70 leading-[1.75]">
            The second trimester is often described as the easiest stretch of pregnancy. For many people that
            is true. For others it's just less hard than the first. Whichever it is for you, you're allowed
            to settle in slowly.
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
  { Icon: Apple, title: "Eat well, properly, again", note: "If your appetite is back, lean into proper meals — protein at every one, plenty of iron-rich foods (red meat, beans, leafy greens, fortified cereals), fruit, vegetables, whole grains, dairy or fortified alternatives. Aim for around 300 extra calories a day in the second trimester. The food rules from the first trimester still hold." },
  { Icon: Activity, title: "Move gently most days", note: "If you've been too tired to move, this is often the week to start again. Walking, swimming, prenatal yoga, low-impact strength work, gentle cycling — most things you did before pregnancy are usually fine to continue. The general rule: be able to hold a conversation while moving. Avoid contact sports, real fall risks, and lying flat on your back for long periods later." },
  { Icon: Stethoscope, title: "Plan your maternity leave & employer rights", note: "Now is a good time to look at your statutory maternity pay, employer top-up if any, your right to paid time off for antenatal appointments, and a workplace risk assessment. Many people use weeks 14–20 to map their leave dates and any handover. It doesn't have to be decided yet — just thought about." },
  { Icon: Moon, title: "Start sleeping with a pillow between your legs", note: "Sleeping on your side with a pillow between your legs takes pressure off the lower back and pelvis as the bump grows. From around week 28, official UK advice is to fall asleep on your side because back-sleeping in late pregnancy is linked to a small increased stillbirth risk. Building the habit now makes it easier later." },
  { Icon: Sprout, title: "Keep the basics ticking over", note: "10 micrograms of vitamin D daily through pregnancy and breastfeeding. Folic acid is no longer needed (the neural tube has formed). A pregnancy multivitamin covers most essentials. If iron is causing constipation, ask your GP about a gentler alternative — Spatone is well-tolerated by many." },
  { Icon: Heart, title: "Let yourself enjoy this stretch", note: "If you have it, the energy lift in the second trimester is precious — it tends to be the easiest stretch of pregnancy for many people. Take the trip, see the friend, do the thing you've been too tired for. You're allowed to enjoy being pregnant in whatever shape that takes." },
];

const Focus = () => (
  <section id="focus" className="bg-sage-bg/35 py-16 md:py-24 border-y border-border/30">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <SectionLabel tone="sage">Focus this week</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.2rem] text-foreground leading-tight mb-4">
            Eating, moving, planning — gently.
          </h2>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8]">
            Week 14 is one of the easiest stretches of pregnancy for many people. Use it. Eat properly, move
            gently, plan the practical stuff with a clearer head, and let yourself begin to enjoy this.
          </p>
        </div>
        <div className="lg:col-span-8">
          <ol className="bg-card rounded-3xl border border-border/40 shadow-card-brand divide-y divide-border/40 overflow-hidden">
            {focusList.map(({ Icon, title, note }, i) => (
              <li key={title} className="group flex items-start gap-5 p-5 sm:p-6 md:p-7 hover:bg-sage-bg/25 transition-colors">
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

const seekSupport = [
  "Heavy bright red bleeding, especially soaking a pad",
  "Severe one-sided or persistent abdominal pain",
  "Shoulder-tip pain, dizziness or feeling faint",
  "Sudden severe headache, vision changes or upper-belly pain",
  "Burning, pain or blood when you wee (possible UTI)",
  "Itching that wakes you, especially on hands and feet",
  "Reduced or no appetite for fluids, vomiting that won't settle",
  "Persistent low mood, hopelessness, or intrusive anxiety",
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
            Your midwife is now your first point of contact. Your GP, NHS 111, your local hospital triage, or
            antenatal day unit are also good calls. In an emergency dial 999 or go straight to A&E.
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
        Settling in is not the same as feeling settled. The energy comes back before the worry does. The body becomes more visibly pregnant before the mind quite catches up. You are allowed to take all of it slowly.
      </p>
      <Heart size={14} className="text-sage/60 mx-auto mt-5" />
    </div>
  </section>
);

const reflectionPrompts = ["What feels easier this week", "What still feels hard or unfamiliar", "Something I'd like to remember from this stretch", "A small kindness I could give myself"];
const askChips = ["When will I feel my baby move?", "Is it normal to still feel sick at 14 weeks?", "How much weight should I be gaining?", "Can I exercise more in the second trimester?", "When should I tell my employer?"];

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
          <span className="w-9 h-9 rounded-full bg-lavender-bg flex items-center justify-center shrink-0">
            <MessageCircle size={14} className="text-lavender-foreground" />
          </span>
          <div className="min-w-0">
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.24em] uppercase text-sage">Ask about week 14</p>
            <h3 className="font-serif text-[1.3rem] sm:text-[1.35rem] text-foreground mt-0.5 leading-snug">A question on your mind?</h3>
          </div>
        </div>
        <p className="font-sans text-[13px] text-foreground/70 leading-relaxed mb-4">Get a calm, evidence-led answer tailored to where you are right now.</p>
        <input type="text" placeholder="e.g. When will I feel my baby move?" className="w-full bg-parchment/80 border border-border/40 rounded-full px-5 py-3.5 font-sans text-[13.5px] text-foreground placeholder:text-foreground/45 focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/30 transition-all" />
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
            The week the body comes back to you deserves to be remembered.
          </h3>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8] mb-6">
            The first proper meal you wanted in months. The first stranger to notice. The first time you let
            yourself imagine a name. The journal holds the small, ordinary, invisible turning points of
            becoming a parent.
          </p>
          <ul className="space-y-2.5 mb-7">
            {["A page for the start of the second trimester", "Letters to your baby through every week", "Guided pages all the way to birth"].map((line) => (
              <li key={line} className="flex items-start gap-2.5">
                <Check size={13} className="text-sage mt-1 shrink-0" />
                <span className="font-sans text-[13.5px] text-foreground/80">{line}</span>
              </li>
            ))}
          </ul>
          <Link to="/product" className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-6 py-3 font-sans text-[13.5px] font-medium shadow-cta hover:bg-terracotta-hover transition-colors w-fit">
            Discover the journal <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const related = [
  { slug: "second-trimester-body", img: secondBodyImg, tag: "Body",
    title: "The early second-trimester body shift",
    desc: "Rising uterus, the first real bump, energy returning, appetite back — what to expect physically as the second trimester properly begins." },
  { slug: "second-trimester-eating", img: secondEatingImg, tag: "Nutrition",
    title: "Eating well in the second trimester",
    desc: "What your body actually needs now — protein, iron, calcium, calories — and how to bring real meals back without overthinking it." },
  { slug: "second-trimester-movement-exercise", img: secondMovementImg, tag: "Movement",
    title: "Moving your body in the second trimester",
    desc: "What's safe, what helps, and how to use the energy lift while it's here. The simple rules for walking, yoga, swimming and strength." },
  { slug: "second-trimester-anxiety", img: secondAnxietyImg, tag: "Mind",
    title: "When the worry doesn't lift with the calendar",
    desc: "Why pregnancy anxiety can carry on past the first trimester, and how to stay grounded as the pregnancy becomes more visible." },
  { slug: "first-trimester-emotional", img: emotionalImg, tag: "Emotions",
    title: "Settling into being publicly pregnant",
    desc: "How it feels when the news widens, when strangers start to notice, and when bodies become more visibly part of the conversation." },
  { slug: "second-trimester-sleep", img: secondSleepImg, tag: "Sleep",
    title: "Setting up your sleep for the months ahead",
    desc: "Why side-sleeping matters, when to start, and the small set-up tweaks that make pregnancy sleep easier from week 14 onwards." },
];

const Related = () => (
  <section id="guidance" className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div className="max-w-xl">
          <SectionLabel>Read next, because of week 14</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.4rem] text-foreground leading-tight">
            Curated guidance for what's likely on your mind right now.
          </h2>
        </div>
        <Link to="/guidance" className="inline-flex items-center gap-1.5 font-sans text-[13.5px] font-medium text-sage hover:gap-2.5 transition-all whitespace-nowrap">
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
  { q: "When will I feel my baby move?",
    a: "First flutters — sometimes called 'quickening' — usually arrive between weeks 16 and 22 in a first pregnancy, and earlier (often weeks 13–16) in second and later pregnancies, because you know what to look for and the abdominal muscles have stretched before. At 14 weeks your baby is moving constantly, but the movements are still much too small for you to feel from the outside. Early flutters are easy to miss — they often feel like bubbles, butterflies, popcorn or a passing twitch rather than recognisable kicks." },
  { q: "Is it normal to still feel sick at 14 weeks?",
    a: "Yes — around 1 in 5 people still have meaningful nausea at week 14. For most it eases over the next 2–4 weeks. Around 10% have nausea that lasts much longer, sometimes through pregnancy. If you can keep food and fluids down, you're tolerating things, and your weight is steady, ongoing nausea is uncomfortable but not dangerous. If you can't keep fluids down, are losing weight, or are exhausted from the sickness, please contact your midwife or GP — there are treatments that help, including in the second trimester." },
  { q: "How much weight should I be gaining?",
    a: "There's no single right answer. UK guidance focuses less on a target number and more on overall health and steady, gradual gain. Most people will gain around 1–2 kg in the first trimester and then around 0.5 kg per week through the second and third trimesters, but that varies hugely. Some people lose weight in the first trimester from sickness and only start gaining now. As long as you're eating well, your bump is growing on schedule, and your midwife is happy, the number on the scale is not the most important thing." },
  { q: "Can I exercise more now I'm in the second trimester?",
    a: "Often yes, especially if energy is genuinely back. Walking, swimming, prenatal yoga, low-impact strength work, gentle cycling, jogging at a comfortable pace are all usually fine. The general rules: be able to hold a conversation while moving, avoid contact sports and real fall risks, don't lie flat on your back for long periods later in pregnancy, and stop and seek advice if you have bleeding, pain, dizziness or contractions. If you're new to exercise, start gently and build slowly." },
  { q: "Is sleeping on my back at 14 weeks safe?",
    a: "Yes. At 14 weeks the uterus is not yet large enough to compress the major blood vessels behind it (the inferior vena cava), so back-sleeping is fine. From around week 28, official UK guidance is to fall asleep on your side because back-sleeping in late pregnancy is linked to a small increased stillbirth risk. Building the habit of sleeping on your side now (with a pillow between your knees and one supporting the bump) makes it much easier to maintain in the third trimester." },
  { q: "When should I tell my employer I'm pregnant?",
    a: "Legally in the UK you have to tell your employer at least 15 weeks before your due date — by around week 25. Most people tell sooner. Telling earlier means you can access pregnancy-related rights: paid time off for antenatal appointments, a workplace risk assessment, and protection from pregnancy-related dismissal. Many people tell after the dating scan or once a real bump becomes harder to hide. There's no perfect time — pick what feels manageable for you and your role." },
  { q: "Will people be able to see I'm pregnant?",
    a: "Probably not yet, in most clothes. Your uterus has just risen above the pubic bone and the lower belly is starting to feel firmer and slightly fuller, but a clear bump usually takes another few weeks in a first pregnancy. Second and later pregnancies often show clearly by now. What you may notice is that close-fitting clothes feel different around the lower belly and waistband — many people start swapping into looser trousers or maternity bands around now for comfort, not visibility." },
  { q: "What's the next big appointment after the dating scan?",
    a: "The next major appointment is the anomaly scan (also called the 20-week scan), usually offered between 18 and 21 weeks. This is a much more detailed scan that checks your baby's anatomy from head to toe — heart, brain, spine, kidneys, limbs and the placenta. You'll also have a midwife appointment around 16 weeks to review any blood test results from booking-in, check blood pressure and urine, and listen to the heartbeat with a doppler. Between then and now is mostly settling-in time." },
];

const FAQRow = ({ faq, defaultOpen = false }: { faq: { q: string; a: string }; defaultOpen?: boolean }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border/40 last:border-b-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-start gap-4 py-5 text-left group">
        <span className="flex-1 font-serif text-[1.05rem] md:text-[1.15rem] text-foreground group-hover:text-sage transition-colors leading-snug">{faq.q}</span>
        <span className="w-7 h-7 rounded-full bg-sage-bg flex items-center justify-center text-sage shrink-0 mt-1">
          {open ? <Minus size={13} /> : <Plus size={13} />}
        </span>
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
        <h2 className="font-serif text-[1.85rem] sm:text-[1.95rem] md:text-[2.4rem] text-foreground leading-tight">Common questions at 14 weeks</h2>
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
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.5rem] text-foreground leading-tight mb-3">Ready for week 15?</h2>
        <p className="font-sans text-[14.5px] text-foreground/75 max-w-lg mx-auto mb-8 leading-[1.8]">
          Week 15 brings steadier energy, sharper appetite and the bump quietly making itself known. The
          second-trimester rhythm continues to settle.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
          <Link to="/pregnancy/week/15" className="inline-flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium shadow-cta hover:bg-terracotta-hover transition-colors">
            Continue to week 15 <ArrowRight size={14} />
          </Link>
          <Link to="/pregnancy/second-trimester" className="inline-flex items-center justify-center gap-2 border border-foreground/25 text-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium hover:bg-parchment-dark transition-colors">
            Explore the second trimester
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const Week14Page = () => (
  <div className="min-h-screen bg-parchment">
    <Navbar />
    <Hero />
    <MetaBar />
    <AtAGlance />
    <Biology />
    <Settling />
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

export default Week14Page;
