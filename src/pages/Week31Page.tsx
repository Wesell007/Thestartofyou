import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ChevronLeft, ChevronRight, Sprout, HeartPulse, Activity, Sparkles, Calendar, BookOpen,
  ArrowRight, Check, AlertTriangle, Plus, Minus, Heart, MessageCircle, Leaf, Moon,
  ShieldCheck, Wind, Brain, Hand, Apple, Footprints, Baby,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PregnancyWeekSeo from "@/components/seo/PregnancyWeekSeo";
import PublicWeekReflectionAsk from "@/components/pregnancy/PublicWeekReflectionAsk";
import fetusImg from "@/assets/week31-fetus.jpg";
import coconutImg from "@/assets/week31-coconut.jpg";
import biologyImg from "@/assets/week31-biology-detail.jpg";
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

const SectionLabel = ({ children, tone = "terracotta" }: { children: React.ReactNode; tone?: "sage" | "terracotta" | "lavender" }) => {
  const toneCls = tone === "terracotta" ? "text-terracotta" : tone === "lavender" ? "text-lavender-foreground" : "text-sage";
  // Single authoritative crumb array: feeds the visible trail and the schema.
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Pregnancy", href: "/pregnancy" },
    { label: "Third trimester", href: "/pregnancy/third-trimester" },
    { label: "Week 31", href: "/pregnancy/week/31" },
  ];

  return (
    <div className="flex items-center gap-3 mb-3.5">
      <span className={`h-px w-7 bg-current opacity-50 ${toneCls}`} />
      <p className={`font-sans text-[11px] font-semibold tracking-[0.26em] uppercase ${toneCls}`}>{children}</p>
    </div>
  );
};

const Hero = () => (
  <section className="relative overflow-hidden">
    <div className="relative bg-gradient-to-br from-stage-pregnancy/45 via-parchment to-sage-bg/55 pt-20 pb-36 sm:pt-24 sm:pb-44 md:pt-32 md:pb-52">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[820px] h-[420px] rounded-full bg-terracotta/8 blur-3xl" />
        <div className="absolute -top-10 right-1/4 w-[260px] h-[260px] rounded-full bg-sage-light/30 blur-3xl" />
      </div>
      <img src={botanicalBl} alt="" aria-hidden="true" className="pointer-events-none absolute top-20 left-0 w-[150px] lg:w-[210px] opacity-25 select-none hidden md:block" />
      <img src={botanicalTr} alt="" aria-hidden="true" className="pointer-events-none absolute top-20 right-0 w-[150px] lg:w-[210px] opacity-25 select-none hidden md:block" />

      <div className="container mx-auto px-14 sm:px-16 md:px-10 max-w-5xl relative z-10 text-center">
        <BreadcrumbJsonLd items={breadcrumbItems} />
        <Breadcrumbs
          tone="section"
          className="flex justify-center mb-6 sm:mb-7 font-sans text-[12px] font-normal text-foreground/65"

          items={breadcrumbItems}
        />

        <p className="font-sans text-[11px] font-semibold tracking-[0.3em] uppercase text-terracotta mb-5">
          Third trimester · Curled in, settling deeper
        </p>
        <h1 className="font-serif text-[2.5rem] sm:text-5xl md:text-[3.75rem] lg:text-[4.25rem] text-foreground leading-[1.04] tracking-tight mb-4 md:mb-5">
          31 Weeks Pregnant
        </h1>
        <p className="font-serif italic text-[1.05rem] sm:text-lg md:text-xl text-foreground/75 max-w-xl mx-auto leading-relaxed">
          Your baby is the size of a coconut — about 41.1 cm head to heel, around 1.5 kg, more curled inward as space tightens, and the body settling deeper into the long final stretch.
        </p>
      </div>

      <Link to="/pregnancy/week/30" aria-label="Go to week 30" className="absolute left-3 sm:left-6 md:left-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronLeft size={18} />
      </Link>
      <Link to="/pregnancy/week/32" aria-label="Go to week 32" className="absolute right-3 sm:right-6 md:right-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronRight size={18} />
      </Link>
    </div>

    <div className="relative -mt-28 sm:-mt-36 md:-mt-40 mb-6">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex items-end justify-center gap-5 sm:gap-10 md:gap-14">
          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-card border-[3px] border-sage/15 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={coconutImg} alt="A whole coconut on a parchment background" loading="lazy" width={512} height={512} className="w-full h-full object-cover" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.04]" />
            </div>
            <div className="text-center">
              <p className="font-serif italic text-[12.5px] text-foreground/80 leading-tight">coconut</p>
              <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/55 mt-1">~41.1&nbsp;cm</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full bg-card border-[4px] border-terracotta/30 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={fetusImg} alt="Soft editorial illustration of a 31-week baby curled tightly inward with knees drawn up and arms folded close, fuller subcutaneous fat smoothing the skin, full rounded cheeks, alert open eyes with eyelashes, soft fine hair on head, very little lanugo remaining, fingernails reaching the tips of fingers, suspended in luminous amber amniotic fluid in tighter womb space" width={1024} height={1024} loading="eager" decoding="async" className="w-full h-full object-cover scale-[1.02]" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.05]" />
            </div>
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.22em] uppercase text-foreground/65">Your baby this week</p>
          </div>

          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-stage-pregnancy/45 to-sage-bg border-[3px] border-terracotta/25 flex items-center justify-center shadow-elevated">
              <span className="font-serif text-[1.7rem] sm:text-[1.95rem] text-foreground tracking-tight leading-none">9</span>
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-terracotta/20" />
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
  { id: "movement", label: "Movement & rhythm", Icon: Hand },
  { id: "body", label: "Body changes", Icon: Activity },
  { id: "symptoms", label: "Symptoms", Icon: HeartPulse },
  { id: "emotional", label: "Emotionally", Icon: Heart },
  { id: "focus", label: "Focus this week", Icon: Sparkles },
  { id: "support", label: "Seek support", Icon: ShieldCheck },
  { id: "guidance", label: "Read next", Icon: BookOpen },
];

const MetaBar = () => (
  <section className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl -mt-2 mb-12 relative z-10">
    <div className="bg-card rounded-2xl border border-border/40 shadow-card-brand p-5 sm:p-6 md:p-7">
      <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8">
        <div className="flex items-center gap-4 pb-5 lg:pb-0 lg:pr-7 lg:border-r border-b lg:border-b-0 border-border/30">
          <div className="w-11 h-11 rounded-full bg-stage-pregnancy/40 border border-terracotta/20 flex items-center justify-center shrink-0">
            <Leaf size={16} className="text-terracotta" />
          </div>
          <div className="min-w-0">
            <p className="font-sans text-[13px] font-medium text-foreground leading-snug">✔ Medically reviewed by Jenny Joines</p>
            <p className="font-sans text-[11.5px] font-normal text-foreground/60 mt-0.5">Updated for 2026 · 14 min read · Curled in, settling deeper</p>
          </div>
        </div>
        <nav aria-label="On this page" className="flex-1 pt-4 lg:pt-0">
          <div className="flex gap-x-1 gap-y-2 overflow-x-auto lg:flex-wrap scrollbar-hide -mx-1 px-1">
            {anchors.map(({ id, label, Icon }) => (
              <a key={id} href={`#${id}`} className="group shrink-0 flex items-center gap-2 px-3 py-2 rounded-full hover:bg-stage-pregnancy/30 transition-colors">
                <span className="w-7 h-7 rounded-full bg-parchment-dark/80 border border-border/30 flex items-center justify-center group-hover:border-terracotta/40 transition-colors">
                  <Icon size={12} className="text-terracotta" />
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
  { label: "Stage", value: "Third trimester · settling deeper" },
  { label: "Baby size", value: "~41.1 cm — coconut" },
  { label: "Baby weight", value: "~1.5 kg" },
  { label: "Trimester", value: "3 of 3 (week 31 of 13)" },
];

const AtAGlance = () => (
  <section id="at-a-glance" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl mb-14 md:mb-20">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 relative bg-gradient-to-br from-stage-pregnancy/45 via-parchment to-sage-bg/55 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-10 overflow-hidden shadow-card-brand">
        <img src={botanicalAccent} alt="" aria-hidden="true" className="absolute -left-3 bottom-0 w-28 opacity-35 pointer-events-none select-none" />
        <SectionLabel tone="terracotta">At a glance</SectionLabel>
        <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-5">
          A 1.5 kg baby curling tighter inward, the womb visibly fuller, and the body settling deep into the long final stretch.
        </h2>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8] mb-4">
          Inside, your baby is around 41.1 cm head to heel and weighs roughly 1.5 kg. Subcutaneous fat is
          continuing to fill out the body — cheeks, limbs, the soft creases at the wrists. Lanugo, the
          fine downy hair, is mostly shedding now. Fingernails have reached the tips of the fingers.
          The five senses are all working: taste, hearing, touch, smell, and now genuine sight, with eyes
          that focus and pupils that respond to light. The baby is more curled inward as the womb gets
          relatively tighter — and the kind of movement you feel is starting to shift accordingly.
        </p>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8]">
          Outside, this is the week the body settles deep into the long final stretch. The bump is fuller and
          firmer. Sleep is broken and uncomfortable. Heartburn, breathlessness, pelvic strain, rib pressure,
          swelling and fatigue stack into most days. Antenatal appointments are now usually every two
          weeks. Nine weeks left to wait, and most of them will be felt in the body. Side-sleep is the
          default, pattern awareness on movement the daily habit, and small acts of practical preparation
          start to feel less optional.
        </p>
      </div>

      <div className="lg:col-span-2 bg-card rounded-3xl border border-border/40 p-7 md:p-8 shadow-card-brand">
        <SectionLabel tone="sage">The week in numbers</SectionLabel>
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
  { title: "Curled tighter — the womb visibly fuller", body: "By 31 weeks the baby has run out of the easy room of even three weeks ago. Movement is now from a more curled-in posture: knees drawn up, arms folded close, head often tucked. The womb is visibly fuller on a scan; on the outside, the bump is firmer and feels more solid. Big rolling movements give way to discrete jabs, pokes and stretches. The pattern stays the same; the texture of the movement changes." },
  { title: "Lanugo shedding — skin smoothing", body: "Lanugo, the fine downy hair that has covered the body since the second trimester, is mostly shedding now into the amniotic fluid. The baby swallows some of it; it makes up part of the meconium — the first dark, sticky stool — that you'll see in the first nappies. Some lanugo may remain at birth, especially on the shoulders and back, and it falls out over the first couple of weeks. Skin is smoother, fuller and less translucent than even a fortnight ago." },
  { title: "All five senses working — including real sight", body: "Taste, hearing, touch and smell have been online for some weeks. By 31 weeks, vision has caught up: the eyes can focus on close objects, the pupils respond to light by dilating and constricting. In the womb, of course, the world is dim — but bright light shone on the bump can be perceived, and your baby may turn towards or away from it. Hearing is well-developed: your voice, your partner's voice, regular music, household sounds are all familiar." },
  { title: "Lungs continuing to mature, brain folding", body: "Surfactant production from type II pneumocytes scales further. Alveolar buds keep multiplying. Babies born at 31 weeks have very high survival rates with neonatal care, and most go on to thrive without long-term issues, although a NICU stay is expected. The brain continues a fast growth phase: cortical folding is well advanced, sleep–wake cycles are clear, REM sleep dominates. The fetal nervous system can now regulate body temperature to some extent on its own." },
];

const Biology = () => (
  <section id="biology" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="relative rounded-3xl overflow-hidden border border-border/40 shadow-card-brand">
            <div className="aspect-[4/5]">
              <img src={biologyImg} alt="Soft editorial anatomical illustration showing a third-trimester pregnant abdomen at 31 weeks: high-risen uterus filling the abdomen pressing on the diaphragm and stomach upward, baby curled tightly inward with knees drawn up and arms folded across chest in restricted womb space, placenta visible, surrounded by botanical motifs" loading="lazy" width={1024} height={1280} className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-foreground/60 to-transparent">
              <p className="font-serif italic text-[13px] text-background/95 leading-snug">
                A baby curling tighter, a body settling deeper, and the long final stretch becoming a fact you live in.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <SectionLabel tone="terracotta">What's underway biologically</SectionLabel>
          <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-5">
            1.5 kg, more curled, lanugo shedding, all five senses online — including real sight.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8] mb-8 max-w-2xl">
            Week 31 is the week the womb starts to feel visibly tighter. The baby curls inward, lanugo
            mostly sheds, and skin smooths. The five senses are all working — taste, touch, hearing, smell,
            and now real sight, with focusing eyes and light-responsive pupils. Lungs and brain keep maturing.
            And on the outside, the body knows it is carrying nearly all the time.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {biologyPoints.map((p, i) => (
              <div key={p.title} className="relative bg-card rounded-2xl border border-border/40 p-6 md:p-7 shadow-card-brand">
                <span className="absolute top-5 right-5 font-serif italic text-[12px] text-terracotta/70">0{i + 1}</span>
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

const movementPoints = [
  { Icon: Hand, title: "Pattern, not numbers — what your baby does", body: "Current UK guidance (NHS, Tommy's, RCOG) is explicit: no specific number of kicks per day matters. What matters is your baby's individual pattern — when they're active, when they're quiet, what kind of movement is normal for them. By 31 weeks you know that pattern well. The thing you're watching for is a real, sustained change. A daily quiet check-in — same-ish time, somewhere quiet, hand on the bump — is the practice that builds the awareness." },
  { Icon: AlertTriangle, title: "Reduced movement — phone today, not tomorrow", body: "A clear, sustained reduction or change in your baby's normal pattern of movement always needs a phone call to maternity triage today, not tomorrow. Don't try cold drinks, ice on the bump or sugary snacks to wake the baby — current UK guidance is explicit that those methods aren't reliable and they delay the call. Phoning early is always allowed and you will never be made to feel silly for it." },
  { Icon: Sprout, title: "What 31-week movement actually feels like", body: "More discrete jabs and pokes, fewer big rolling somersaults — a foot pushing out the side of the bump, a knee under the rib, a bottom briefly lodged against the bladder. Hiccups still daily for many. Sharp kicks, especially in the evening, especially when you sit down. Quieter periods (often when you're walking or busy) followed by very active ones (often when you sit or lie down). The texture of movement shifts; the pattern shouldn't." },
  { Icon: Activity, title: "Why the type of movement is changing now", body: "As your baby grows and the womb stays roughly the same size, big rolling movements become less common and discrete jabs more common — there simply isn't room for the somersaults of week 24 anymore. This is normal. The shift in texture isn't a reason to phone; a clear, sustained reduction or change in the overall pattern is. Don't talk yourself out of phoning if something feels different. Phoning early is always allowed." },
];

const Movement = () => (
  <section id="movement" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel tone="terracotta">Movement & rhythm this week</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        Movement texture is changing — discrete jabs, fewer somersaults, the pattern still constant.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        Movement at 31 weeks is strong, recognisable, often visible from the outside. Because the womb is
        relatively tighter, big rolling movements give way to more discrete jabs and pokes. The pattern
        shouldn't change. A clear, sustained change from your baby's normal pattern always needs a phone call.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {movementPoints.map(({ Icon, title, body }) => (
        <div key={title} className="relative bg-card rounded-2xl border border-border/40 p-6 md:p-7 shadow-card-brand overflow-hidden">
          <span className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-terracotta/40 to-transparent" />
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-10 rounded-full bg-stage-pregnancy/40 border border-terracotta/15 flex items-center justify-center">
              <Icon size={15} className="text-terracotta" />
            </span>
            <h3 className="font-serif text-[1.15rem] text-foreground leading-snug">{title}</h3>
          </div>
          <p className="font-sans text-[13.5px] text-foreground/70 leading-[1.75]">{body}</p>
        </div>
      ))}
    </div>

    <div className="mt-6 bg-stage-pregnancy/40 border border-terracotta/15 rounded-2xl p-6 md:p-7 flex flex-col sm:flex-row sm:items-start gap-4">
      <span className="w-10 h-10 rounded-full bg-card border border-terracotta/20 flex items-center justify-center shrink-0">
        <AlertTriangle size={15} className="text-terracotta" />
      </span>
      <p className="font-sans text-[14px] text-foreground/85 leading-[1.7]">
        <span className="font-semibold">A clear, sustained reduction or change in your baby's normal pattern of movement always needs a phone call to maternity triage — today, not tomorrow.</span>{" "}
        Tighter quarters change the texture of movement, not the rule. Phoning early is always allowed.
      </p>
    </div>
  </section>
);

const bodyNotes = [
  { Icon: Activity, title: "Fundus around 31 cm — bump fuller, firmer, heavier", body: "Fundal height tracks closely with weeks; by 31 weeks the bump sits well above the navel, feels firm and full, and noticeably leads you forward. Posture has shifted further; the lower back and pelvis carry more load every day. Pelvic-girdle pain (PGP / SPD), lower-back ache and rib pressure are common — specialist physiotherapy genuinely helps. Asking for a referral is allowed and worth doing if you haven't already." },
  { Icon: Wind, title: "Heartburn and breathlessness, both worse now", body: "The uterus is pressing harder on both the stomach (heartburn) and the diaphragm (breathlessness). Smaller, more frequent meals, eating slowly, not lying flat for an hour after eating, and sleeping slightly propped up. Gaviscon is safe; stronger options on prescription if needed. Mild breathlessness on stairs is normal — sudden severe breathlessness, or breathlessness with chest pain or rapid heartbeat, needs same-day assessment." },
  { Icon: Moon, title: "Sleep is harder — and side-sleep stays the default", body: "From week 28 onwards, official UK advice is to fall asleep on your side, not your back, to reduce stillbirth risk. This is now your default. Sleep itself becomes harder: positions are awkward, you wake to wee, hips ache, the mind runs ahead. Pillow set-up genuinely helps. Naps in the day, when possible, are reasonable. Persistent insomnia or low mood deserves a midwife conversation." },
  { Icon: Brain, title: "Braxton-Hicks regular, often daily", body: "Braxton-Hicks (practice contractions) are often clearly noticeable several times a day at 31 weeks — a painless tightening across the whole bump for 30 to 60 seconds, then releasing. Often after activity, sex or a full bladder. Drink water, lie down on your side, change position. Regular, painful or rhythmic tightenings, especially with bleeding, fluid loss, or lower-back pain, need urgent assessment for preterm labour." },
  { Icon: Footprints, title: "Swelling, leg cramps, varicose veins, haemorrhoids", body: "Mild swelling in feet, ankles and hands by the end of the day is common — heat and standing make it worse. Night-time leg cramps wake many people. Varicose veins and haemorrhoids may appear or worsen. Hydration, walking when you can, putting your feet up, support tights for legs, fibre and stool softeners for haemorrhoids. Sudden swelling in the face or hands, or one-sided leg swelling with pain, needs urgent assessment for pre-eclampsia or DVT." },
  { Icon: Heart, title: "Rib pressure, hand tingling, colostrum, posture shifts", body: "A foot under one rib for hours is a particular feature of late pregnancy. Carpal tunnel symptoms (hand tingling and numbness, especially overnight) are common — a wrist splint helps. Some people leak small amounts of colostrum from now; some don't until much later, or at all before birth. Posture shifts further forward to compensate for the bump weight — gentle pelvic-floor and core work, and short rests through the day, genuinely help." },
];

const Body = () => (
  <section id="body" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="max-w-2xl mb-10">
        <SectionLabel tone="terracotta">Your body this week</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
          Fuller, firmer, heavier — the body settling deep into the long final stretch.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
          Week 31 is the week the body really settles into late-pregnancy reality. Heartburn worsens.
          Breathlessness shows up earlier on the stairs. Sleep is harder. The pelvis and back complain.
          A foot finds a rib. Side-sleep is non-negotiable. Most of it is normal. A few signs are worth
          knowing and acting on quickly.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {bodyNotes.map(({ Icon, title, body }) => (
          <div key={title} className="relative bg-card rounded-2xl border border-border/40 p-6 md:p-7 shadow-card-brand overflow-hidden">
            <span className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-terracotta/30 to-transparent" />
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 rounded-full bg-stage-pregnancy/40 border border-terracotta/15 flex items-center justify-center">
                <Icon size={15} className="text-terracotta" />
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
    Icon: Hand, name: "Discrete jabs, fewer somersaults",
    feels: "More distinct kicks, pokes and pressure points than rolling movements. A foot or knee that pushes out the side of the bump. A bottom briefly lodged against the bladder. Hiccups several times a day.",
    why: "The womb is relatively tighter as the baby grows; there's less room for big rolling movement, more for discrete pressure from a single limb.",
    normal: "Pattern awareness, not magic numbers. The texture of movement may shift, but the overall pattern shouldn't. A clear, sustained reduction or change in your baby's normal pattern always needs a phone call to maternity triage today, not tomorrow.",
  },
  {
    Icon: Wind, name: "Heartburn — often nightly",
    feels: "Burning behind the breastbone or in the throat after meals or lying down. Acid taste. A 'too full' feeling after small portions. Often worst at night.",
    why: "Progesterone relaxes the valve at the top of the stomach. The rising uterus presses the stomach upwards and squeezes its capacity.",
    normal: "Very common. Smaller, more frequent meals, eating slowly, not lying flat for an hour after eating, sleeping slightly propped up. Gaviscon is safe. Stronger options on prescription if needed.",
  },
  {
    Icon: Activity, name: "Pelvic-girdle pain (PGP / SPD)",
    feels: "Sharp pain in the pubic bone or around the back of the pelvis. Worse with walking, climbing stairs, getting in and out of the car, rolling over in bed. Sometimes a clicking or grinding sensation.",
    why: "Pelvic joints softening under pregnancy hormones (especially relaxin) plus the asymmetric loading of a heavier bump.",
    normal: "Common. Specialist physiotherapy genuinely helps — ask your midwife for a referral. Avoid wide-leg movements, get dressed sitting down, sleep with a pillow between the knees, support belt for some.",
  },
  {
    Icon: Moon, name: "Broken sleep, vivid dreams",
    feels: "Strange, vivid, often baby-related dreams. Waking to wee. Difficulty getting comfortable on either side. Tiredness creeping back in.",
    why: "Hormonal changes affect sleep architecture. The growing bump makes positions awkward. Higher blood volume means kidneys process more fluid overnight.",
    normal: "Very common. Pillow set-up helps. Worsening insomnia or persistent low mood needs a midwife conversation.",
  },
  {
    Icon: Wind, name: "Breathlessness on stairs",
    feels: "A noticeable need to pause on the stairs. Breath that catches when you carry something. A general sense the lungs have less room.",
    why: "The rising uterus presses on the diaphragm, reducing the space the lungs can expand into. Breathing becomes shallower and more frequent.",
    normal: "Mild breathlessness on exertion is normal in late pregnancy. Sudden severe breathlessness, breathlessness with chest pain or rapid heartbeat, or difficulty breathing at rest needs same-day assessment.",
  },
  {
    Icon: Brain, name: "Braxton-Hicks, several times a day",
    feels: "Painless tightening across the whole bump that lasts 30 to 60 seconds, then releases. Often after activity, sex, or a full bladder.",
    why: "Practice contractions — the uterus tightening and releasing as it tones up for the eventual work of labour.",
    normal: "Very common. Drink water, lie down, change position. Regular, painful or rhythmic tightenings, or any with bleeding or fluid, need urgent assessment for preterm labour.",
  },
  {
    Icon: Footprints, name: "Swelling, varicose veins, haemorrhoids",
    feels: "Puffy feet and ankles by evening. Visible blue-ish veins on legs. Itchy or painful lumps around the back passage. All worse standing or after long sitting.",
    why: "Higher blood volume, slower circulation, the weight of the uterus pressing on pelvic veins.",
    normal: "Common. Hydration, walking, putting feet up, support tights, fibre and stool softeners for haemorrhoids. Sudden swelling in face or hands, or one-sided painful leg swelling, needs urgent assessment.",
  },
  {
    Icon: Heart, name: "Rib pressure and carpal tunnel",
    feels: "A foot or knee tucked under one rib for hours. Hand tingling, numbness or weakness, especially overnight or first thing in the morning.",
    why: "A bigger baby in tighter space presses against the rib cage. Mild fluid retention compresses the median nerve at the wrist (carpal tunnel).",
    normal: "Both common in late pregnancy. Change position and rock on hands and knees for rib pressure; a wrist splint helps carpal tunnel. Severe or persistent symptoms — flag at your next appointment.",
  },
];

const Symptoms = () => (
  <section id="symptoms" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel tone="terracotta">Common symptoms</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        What's likely to show up at week 31 — and what each one really means.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        Week 31 brings discrete movement (more jabs, fewer somersaults), often-nightly heartburn, broken
        sleep, breathlessness on stairs, Braxton-Hicks several times a day, swelling, rib pressure and a
        fair amount of carpal tunnel. Most are normal. A few are worth flagging.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
      {symptoms.map(({ Icon, name, feels, why, normal }) => (
        <article key={name} className="group relative bg-card rounded-2xl border border-border/40 p-6 md:p-7 shadow-card-brand hover:shadow-soft transition-all duration-500">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border/40">
            <span className="w-10 h-10 rounded-full bg-stage-pregnancy/40 flex items-center justify-center">
              <Icon size={15} className="text-terracotta" />
            </span>
            <h3 className="font-serif text-[1.2rem] text-foreground leading-snug">{name}</h3>
          </div>
          <dl className="space-y-3.5">
            <div>
              <dt className="font-sans text-[10.5px] font-semibold tracking-[0.2em] uppercase text-terracotta mb-1">What it feels like</dt>
              <dd className="font-sans text-[13.5px] text-foreground/80 leading-[1.7]">{feels}</dd>
            </div>
            <div>
              <dt className="font-sans text-[10.5px] font-semibold tracking-[0.2em] uppercase text-terracotta mb-1">Why it happens</dt>
              <dd className="font-sans text-[13.5px] text-foreground/75 leading-[1.7]">{why}</dd>
            </div>
            <div>
              <dt className="font-sans text-[10.5px] font-semibold tracking-[0.2em] uppercase text-terracotta mb-1">Is it normal?</dt>
              <dd className="font-sans text-[13.5px] text-foreground/75 leading-[1.7]">{normal}</dd>
            </div>
          </dl>
        </article>
      ))}
    </div>

    <div className="mt-8 text-center">
      <Link to="/articles/sleep-in-pregnancy" className="inline-flex items-center gap-2 font-sans text-[13.5px] font-medium text-terracotta hover:gap-3 transition-all">
        Read: sleeping through the third trimester <ArrowRight size={13} />
      </Link>
    </div>
  </section>
);

const emotionalTruths = [
  "A constant, embodied sense of being pregnant — there is no forgetting.",
  "Anticipation and weariness alternating in the same hour.",
  "An inward turn deepening — the world narrowing to what matters.",
  "Tenderness for the baby and frustration with the body, often together.",
  "Practical decisions starting to feel real, not theoretical.",
  "Tearfulness arriving at the strangest moments, then passing.",
  "Nine more weeks. Both impossibly long and impossibly close.",
];

const Emotional = () => (
  <section id="emotional" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 relative bg-gradient-to-br from-lavender-bg via-parchment to-stage-pregnancy/40 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-9 shadow-card-brand overflow-hidden">
          <img src={botanicalAccent} alt="" aria-hidden="true" className="absolute right-0 top-0 w-24 opacity-35 pointer-events-none select-none" />
          <SectionLabel tone="lavender">Emotionally this week</SectionLabel>
          <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-4">
            Settling deeper — anticipation, weariness, and the world quietly narrowing.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/80 leading-[1.8] mb-4">
            Week 31 has a particular emotional flavour. Pregnancy is now constant in the body — there's no
            forgetting it. The baby inside the bump is real, recognisable, kicks while you try to sleep.
            Birth feels closer; nine weeks is not far. There's often a healthy nervousness about what's
            still to come — and a deepening tenderness for what's already here.
          </p>
          <p className="font-sans text-[14px] text-foreground/70 leading-[1.75]">
            The inward turn deepens. Smaller world, fewer demands, more rest, more attention to what
            matters. You don't have to push through it. Listening to it is part of the work — and the
            decisions starting to land (where to give birth, who's around for the early days, what to ask
            for) feel less abstract by the day.
          </p>
        </div>

        <div className="lg:col-span-3 bg-card rounded-3xl border border-border/40 p-7 sm:p-8 md:p-9 shadow-card-brand">
          <p className="font-sans text-[11px] font-semibold tracking-[0.24em] uppercase text-terracotta mb-4">What this week often looks like</p>
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
  { Icon: Hand, title: "Pattern-aware movement check-ins, daily", note: "Same-ish time of day, somewhere quiet, hand on the bump, paying attention. The texture of movement is shifting — more discrete jabs, fewer rolling somersaults — but the overall pattern shouldn't. A clear, sustained reduction or change in that pattern always needs a phone call to maternity triage today, not tomorrow. Don't try ice or sugary drinks to wake the baby — they aren't reliable and they delay the call." },
  { Icon: Calendar, title: "Antenatal appointments now usually every two weeks", note: "From around 31 weeks, antenatal appointments typically move to every two weeks (and to weekly from 36). The 31-week appointment usually checks blood pressure, urine, fundal height, and listens to the heartbeat. Bring up anything bothering you, however small. Appointments are not exams; they're conversations. If something feels off between appointments, don't wait — phone the midwife or maternity triage." },
  { Icon: Baby, title: "Hospital bag — from list to half-packed", note: "Most guidance suggests fully packed by around 35 to 36 weeks. Week 31 is the week to actually pack what you've already listed, rather than leaving it for week 36 panic. Two bags is normal: one for labour and the first day, one for the rest of the stay. For you: nightie, slippers, snacks, phone charger, toiletries, postpartum pads. For baby: vests, sleepsuits, nappies, blanket, going-home outfit. For partner: snacks, change of clothes, charger." },
  { Icon: Sprout, title: "Birth preferences — start drafting, not finalising", note: "A birth preferences sheet (sometimes called a birth plan) is a one-page summary of what matters to you in labour: pain relief preferences, who's there, what to do if plans change. It isn't a contract — it's a conversation starter with the midwife who'll care for you. Drafting it now, not in week 38, gives time to read, ask and adjust. Antenatal classes often include a session on this." },
  { Icon: Apple, title: "Iron, calcium, hydration, protein — keep going", note: "Iron at most meals (red meat, beans, lentils, leafy greens, fortified cereals) paired with vitamin C for absorption. Calcium daily. Protein at every meal. Hydrate well. About 300 extra calories a day for the second and third trimesters. If you feel persistently flat, mention it — late-pregnancy anaemia is common and easily checked with the bloods around now or at your 36-week appointment." },
  { Icon: BookOpen, title: "Where the baby will sleep — UK safer-sleep set-up", note: "UK safer-sleep advice (Lullaby Trust, NHS) is for the baby to sleep in the same room as you, in their own clear flat firm sleep space (cot, Moses basket, bedside crib), on their back, with feet to the foot of the cot, for at least the first six months — including daytime naps. Setting it up calmly now is much easier than trying to figure it out in week 1. No bumpers, no cot toys, no loose bedding." },
];

const Focus = () => (
  <section id="focus" className="bg-stage-pregnancy/35 py-16 md:py-24 border-y border-border/30">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <SectionLabel tone="terracotta">Focus this week</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.2rem] text-foreground leading-tight mb-4">
            Movement check-ins, hospital bag actually packed, birth preferences drafted, sleep space set up.
          </h2>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8]">
            Week 31 is the week practical preparation gets harder to put off. Movement awareness is daily
            habit. The hospital bag turns from list to half-packed bag. A birth preferences sheet starts to
            take shape. The baby's sleep space gets set up, calmly and ahead of time.
          </p>
        </div>
        <div className="lg:col-span-8">
          <ol className="bg-card rounded-3xl border border-border/40 shadow-card-brand divide-y divide-border/40 overflow-hidden">
            {focusList.map(({ Icon, title, note }, i) => (
              <li key={title} className="group flex items-start gap-5 p-5 sm:p-6 md:p-7 hover:bg-stage-pregnancy/25 transition-colors">
                <span className="w-10 h-10 rounded-full bg-stage-pregnancy/40 border border-border/40 flex items-center justify-center shrink-0">
                  <Icon size={15} className="text-terracotta" />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 mb-1.5">
                    <span className="font-serif italic text-[12px] text-terracotta/70">0{i + 1}</span>
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
  "A clear, sustained reduction or change in your baby's normal movement pattern",
  "Heavy bright red bleeding, especially soaking a pad",
  "Severe one-sided or persistent abdominal pain",
  "Regular, painful or rhythmic tightenings (possible preterm labour)",
  "Sudden severe headache, vision changes or upper-belly pain (possible pre-eclampsia)",
  "Sudden swelling in the face, hands or feet",
  "Burning, pain or blood when you wee (possible UTI)",
  "Whole-body itching, especially hands and feet at night (possible obstetric cholestasis)",
  "Persistent fluid leaking from the vagina (possible waters)",
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
            Nine weeks to go — the threshold for phoning is gentler, not stricter.
          </h3>
          <p className="font-sans text-[13.5px] text-foreground/70 leading-[1.75] mt-3">
            Maternity triage is your first call for anything urgent. Your midwife, GP, NHS 111 or antenatal
            day unit are also good calls. In an emergency dial 999 or go straight to A&amp;E. You will never
            be made to feel silly for phoning.
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
    <div className="relative bg-stage-pregnancy/45 rounded-3xl border border-border/30 p-8 sm:p-10 md:p-14 text-center overflow-hidden">
      <span className="absolute left-7 top-6 font-serif text-4xl text-terracotta/40 leading-none">“</span>
      <span className="absolute right-7 bottom-4 font-serif text-4xl text-terracotta/40 leading-none">”</span>
      <p className="font-serif italic text-[1.2rem] sm:text-[1.35rem] md:text-[1.6rem] text-foreground/90 leading-snug max-w-3xl mx-auto">
        A 1.5 kg baby curled tight inside, the world quietly narrowing around you, and nine weeks of waiting that feels both impossibly long and impossibly close. Week 31 is the week the body settles deep into the long final stretch.
      </p>
      <Heart size={14} className="text-terracotta/60 mx-auto mt-5" />
    </div>
  </section>
);

const reflectionPrompts = ["What this week feels like in my body", "What I notice about my baby's pattern", "Something I want to say to the baby", "A small kindness for myself"];
const askChips = ["Why do I feel jabs more than rolls now?", "How do I write a birth preferences sheet?", "When should the hospital bag be packed?", "Is hand tingling normal in pregnancy?", "How do I set up safer sleep at home?"];

const ReflectionAsk = () => (
  <PublicWeekReflectionAsk
    week={31}
    reflectionPrompts={reflectionPrompts}
    askChips={askChips}
  />
);

const Journal = () => (
  <section className="bg-stage-pregnancy/40 py-16 md:py-24 border-y border-border/30">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="bg-card rounded-3xl border border-border/30 overflow-hidden shadow-elevated grid grid-cols-1 md:grid-cols-2">
        <div className="aspect-[4/3] md:aspect-auto md:min-h-[420px] relative overflow-hidden">
          <img src={journalImg} alt="The Start of You journal flatlay" loading="lazy" width={1200} height={900} className="w-full h-full object-cover object-[50%_45%]" />
        </div>
        <div className="p-7 sm:p-9 md:p-12 flex flex-col justify-center">
          <SectionLabel tone="terracotta">The Start of You journal</SectionLabel>
          <h3 className="font-serif text-[1.65rem] sm:text-[1.8rem] md:text-[2.1rem] text-foreground leading-tight mb-4">
            The week of settling deeper deserves more than a passing line.
          </h3>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8] mb-6">
            The midnight foot in your ribs. The way the bump leads you into a room now. The slow, real sense
            of becoming someone's parent. The journal holds the small, invisible turning points of becoming
            a parent — the ones nobody warns you matter.
          </p>
          <ul className="space-y-2.5 mb-7">
            {["A page for every week of the third trimester", "Letters to your baby through every week", "Guided pages all the way to birth"].map((line) => (
              <li key={line} className="flex items-start gap-2.5">
                <Check size={13} className="text-terracotta mt-1 shrink-0" />
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
  { slug: "baby-movement-in-pregnancy", img: thirdMovementImg, tag: "Movement",
    title: "Pattern awareness through the third trimester",
    desc: "How movement texture changes as the womb gets relatively tighter, what counts as a real change, and exactly when to phone — without overthinking it." },
  { slug: "hospital-bag-and-what-to-pack", img: thirdHospitalBagImg, tag: "Practical",
    title: "Hospital bag — what actually goes in it",
    desc: "Two bags, calm lists, and what most people end up wishing they had — without buying half a shop you don't need." },
  { slug: "the-space-your-baby-will-come-home-to", img: thirdNurseryImg, tag: "Practical",
    title: "Where the baby will sleep — UK safer-sleep advice",
    desc: "In your room, in a cot or Moses basket, for the first six months. How to set it up calmly, ahead of time, without overthinking." },
  { slug: "sleep-in-pregnancy", img: thirdSleepImg, tag: "Sleep",
    title: "Sleeping through the third trimester",
    desc: "Side-sleep, the pillow set-up most people end up with, and how to make broken sleep more livable through the long stretch." },
  { slug: "emotional-wellbeing-pregnancy", img: thirdEmotionalImg, tag: "Mind",
    title: "The inward turn of the third trimester",
    desc: "Why your world quietly gets smaller, why anticipation and weariness alternate, and why none of it is wrong." },
  { slug: "signs-of-labour", img: thirdSignsImg, tag: "Birth",
    title: "Signs of labour — what they actually feel like",
    desc: "Reading ahead is a kindness. The early signs, the real signs, and when to phone the unit at 31 weeks if anything is unsure." },
];

const Related = () => (
  <section id="guidance" className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div className="max-w-xl">
          <SectionLabel tone="terracotta">Read next, because of week 31</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.4rem] text-foreground leading-tight">
            Curated guidance for the week the body settles deep.
          </h2>
        </div>
        <Link to="/pregnancy/third-trimester" className="inline-flex items-center gap-1.5 font-sans text-[13.5px] font-medium text-terracotta hover:gap-2.5 transition-all whitespace-nowrap">
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
              <span className="font-sans text-[10.5px] font-semibold tracking-[0.22em] uppercase text-sage mb-3">{a.tag}</span>
              <h3 className="font-serif text-[1.15rem] text-foreground leading-snug mb-3 group-hover:text-terracotta transition-colors">{a.title}</h3>
              <p className="font-sans text-[13px] text-foreground/70 leading-[1.7] flex-1 mb-4">{a.desc}</p>
              <span className="inline-flex items-center gap-1.5 font-sans text-[12.5px] font-medium text-terracotta group-hover:gap-2.5 transition-all">Read guide <ArrowRight size={11} /></span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

const faqs = [
  { q: "Why does my baby seem to move differently — more jabs, fewer rolls?",
    a: "Because the womb is now relatively tighter as the baby grows. By 31 weeks there simply isn't room for the big rolling somersaults of week 24. Movement instead becomes more discrete: a foot pushing out the side of the bump, a knee under the rib, a bottom pressing the bladder. The texture of movement changes — and that's normal — but the overall pattern of when your baby is active and quiet shouldn't. A clear, sustained change in that pattern always needs a phone call to maternity triage today, not tomorrow." },
  { q: "How big is the baby at 31 weeks?",
    a: "Around 41.1 cm head to heel and roughly 1.5 kg — about the size of a coconut. Babies can vary by a couple of hundred grams either side and still be perfectly on track. Your midwife is now measuring fundal height (the top of the uterus to the pubic bone, in cm) at every appointment. Small variations are normal; significant under- or over-measuring sometimes prompts a growth scan." },
  { q: "What goes in a birth preferences sheet?",
    a: "A birth preferences sheet (sometimes called a birth plan) is a one-page summary of what matters to you in labour: where you'd like to give birth (hospital, midwife-led unit, home), pain relief preferences (gas and air, water, epidural, hypnobirthing techniques), who's there with you, what you'd like for the third stage (active management with the injection vs physiological), and what to do if plans change. It isn't a contract — it's a conversation starter with the midwife caring for you. Drafting it now, not in week 38, gives time to read, ask questions and adjust. Antenatal classes often include a session on this." },
  { q: "How do I set up the baby's sleep space safely?",
    a: "UK safer-sleep advice (Lullaby Trust, NHS) is for the baby to sleep in the same room as you, in their own clear flat firm sleep space (cot, Moses basket, bedside crib), on their back, with feet to the foot of the cot, for at least the first six months — including daytime naps. No bumpers, no cot toys, no loose bedding, no sleep positioners. A fitted sheet on a firm flat mattress, plus a baby sleeping bag (around 1 to 2.5 tog depending on room temperature). Setting it up calmly now is much easier than trying to figure it out in the first week after birth." },
  { q: "When does my hospital bag actually need to be packed?",
    a: "Most guidance suggests fully packed by around 35 to 36 weeks — although a fair number of people end up needing it earlier than expected, so 35 is a kinder target. Week 31 is the week to actually pack what you've already listed, rather than leaving it for week 36 panic. Two bags is normal: one for labour and the first day, one for the rest of the stay. For you: nightie, slippers, snacks, phone charger, toiletries, postpartum pads. For baby: vests, sleepsuits, nappies, blanket, going-home outfit. For partner: snacks, change of clothes, charger." },
  { q: "Is hand tingling and numbness normal at 31 weeks?",
    a: "Yes — carpal tunnel syndrome is common in late pregnancy. Mild fluid retention compresses the median nerve at the wrist, causing tingling, numbness, sometimes weakness in the thumb and first three fingers, and it's often worst overnight or first thing in the morning. A wrist splint worn at night helps most people. It almost always resolves in the weeks after birth as the fluid reduces. Severe or persistent symptoms — flag at your next appointment." },
  { q: "What does 'reduced movement' actually mean at 31 weeks?",
    a: "It means a clear, sustained reduction or change in your baby's normal pattern of movement — not a quiet hour, not a slow morning, and not the natural shift from rolls to jabs as the womb gets tighter. By 31 weeks you should know your baby's particular pattern of when they're active and what kind of movement is normal for them. The thing you're watching for is a real change from that. If you notice one, phone maternity triage today, not tomorrow. Don't try cold drinks, ice on the bump or sugary snacks to wake the baby — UK guidance is explicit that those methods aren't reliable and they delay the call. Phoning early is always allowed." },
  { q: "What if my baby is born this week?",
    a: "Babies born at 31 weeks have very high survival rates with neonatal care, and most go on to thrive without long-term issues — although a NICU stay is expected and lung maturity is the main concern. None of this changes what you do this week: pattern-aware movement check-ins, phoning early about anything that worries you, side-sleep, reasonable rest, eating well, confirming the next appointment is in the diary. The rest is held by your team, not by you." },
];

const Next = () => (
  <section className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
      <div className="bg-gradient-to-br from-stage-pregnancy/30 via-parchment to-sage-bg rounded-3xl border border-border/30 p-8 sm:p-10 md:p-14 text-center shadow-card-brand">
        <SectionLabel tone="terracotta">Up next</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.5rem] text-foreground leading-tight mb-3">Ready for week 32?</h2>
        <p className="font-sans text-[14.5px] text-foreground/75 max-w-lg mx-auto mb-8 leading-[1.8]">
          Week 32 is often the growth-scan moment — a check on the baby's size, position, and the placenta —
          and the start of more frequent appointments through the run-in to birth.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
          <Link to="/pregnancy/week/32" className="inline-flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium shadow-cta hover:bg-terracotta-hover transition-colors">
            Continue to week 32 <ArrowRight size={14} />
          </Link>
          <Link to="/pregnancy/third-trimester" className="inline-flex items-center justify-center gap-2 border border-foreground/25 text-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium hover:bg-parchment-dark transition-colors">
            Explore the third trimester
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const Week31Page = () => (
  <div className="min-h-screen bg-parchment">
    <PregnancyWeekSeo weekNumber={31} />
    <Navbar />
    <Hero />
    <MetaBar />
    <AtAGlance />
    <Biology />
    <Movement />
    <Body />
    <Symptoms />
    <Emotional />
    <Focus />
    <SeekSupport />
    <Quote />
    <ReflectionAsk />
    <Journal />
    <Related />
    <WeekCommonQuestions week={31} questions={buildWeekQuestions(31, faqs)} />
    <WeekSources week={31} sources={getWeekSources(31)} />
    <Next />
    <Footer />
  </div>
);

export default Week31Page;
