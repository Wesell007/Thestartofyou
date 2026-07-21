import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ChevronLeft, ChevronRight, Sprout, HeartPulse, Activity, Sparkles, Calendar, BookOpen,
  ArrowRight, Check, AlertTriangle, Plus, Minus, Heart, MessageCircle, Leaf, Moon,
  ShieldCheck, Stethoscope, Wind, Brain, Eye, Hand, Apple, Footprints, Baby,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PregnancyWeekSeo from "@/components/seo/PregnancyWeekSeo";
import PublicWeekReflectionAsk from "@/components/pregnancy/PublicWeekReflectionAsk";
import fetusImg from "@/assets/week29-fetus.jpg";
import butternutImg from "@/assets/week29-butternut.jpg";
import biologyImg from "@/assets/week29-biology-detail.jpg";
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

const SectionLabel = ({ children, tone = "terracotta" }: { children: React.ReactNode; tone?: "sage" | "terracotta" | "lavender" }) => {
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
    <div className="relative bg-gradient-to-br from-stage-pregnancy/45 via-parchment to-sage-bg/55 pt-20 pb-36 sm:pt-24 sm:pb-44 md:pt-32 md:pb-52">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[820px] h-[420px] rounded-full bg-terracotta/8 blur-3xl" />
        <div className="absolute -top-10 right-1/4 w-[260px] h-[260px] rounded-full bg-sage-light/30 blur-3xl" />
      </div>
      <img src={botanicalBl} alt="" aria-hidden="true" className="pointer-events-none absolute top-20 left-0 w-[150px] lg:w-[210px] opacity-25 select-none hidden md:block" />
      <img src={botanicalTr} alt="" aria-hidden="true" className="pointer-events-none absolute top-20 right-0 w-[150px] lg:w-[210px] opacity-25 select-none hidden md:block" />

      <div className="container mx-auto px-14 sm:px-16 md:px-10 max-w-5xl relative z-10 text-center">
        <nav aria-label="breadcrumb" className="flex items-center justify-center gap-2 mb-6 sm:mb-7 font-sans text-[12px] font-normal text-foreground/65">
          <Link to="/pregnancy" className="hover:text-foreground transition-colors">Pregnancy</Link>
          <span className="text-foreground/30">›</span>
          <Link to="/pregnancy/third-trimester" className="hover:text-foreground transition-colors">Week by week</Link>
          <span className="text-foreground/30">›</span>
          <span className="text-foreground">Week 29</span>
        </nav>

        <p className="font-sans text-[11px] font-semibold tracking-[0.3em] uppercase text-terracotta mb-5">
          Third trimester · Settling into the long stretch
        </p>
        <h1 className="font-serif text-[2.5rem] sm:text-5xl md:text-[3.75rem] lg:text-[4.25rem] text-foreground leading-[1.04] tracking-tight mb-4 md:mb-5">
          29 Weeks Pregnant
        </h1>
        <p className="font-serif italic text-[1.05rem] sm:text-lg md:text-xl text-foreground/75 max-w-xl mx-auto leading-relaxed">
          Your baby is the size of a butternut squash — about 38.5 cm head to heel, around 1.15 kg, fat smoothing the skin, movement strong and rhythmic, and the daily weight of carrying becoming real.
        </p>
      </div>

      <Link to="/pregnancy/week/28" aria-label="Go to week 28" className="absolute left-3 sm:left-6 md:left-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronLeft size={18} />
      </Link>
      <Link to="/pregnancy/week/30" aria-label="Go to week 30" className="absolute right-3 sm:right-6 md:right-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronRight size={18} />
      </Link>
    </div>

    <div className="relative -mt-28 sm:-mt-36 md:-mt-40 mb-6">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex items-end justify-center gap-5 sm:gap-10 md:gap-14">
          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-card border-[3px] border-sage/15 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={butternutImg} alt="A butternut squash on a parchment background" loading="lazy" width={512} height={512} className="w-full h-full object-cover" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.04]" />
            </div>
            <div className="text-center">
              <p className="font-serif italic text-[12.5px] text-foreground/80 leading-tight">butternut squash</p>
              <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/55 mt-1">~38.5&nbsp;cm</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full bg-card border-[4px] border-terracotta/30 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={fetusImg} alt="Soft editorial illustration of a 29-week baby with substantial subcutaneous fat smoothing the skin, alert open eyes with full eyelashes, full rounded cheeks, longer rounded limbs in a more curled tucked position reflecting tighter womb space, fine lanugo beginning to thin, ears well-defined, hand near the face, suspended in luminous amber amniotic fluid" width={1024} height={1024} loading="eager" decoding="async" className="w-full h-full object-cover scale-[1.02]" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.05]" />
            </div>
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.22em] uppercase text-foreground/65">Your baby this week</p>
          </div>

          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-stage-pregnancy/45 to-sage-bg border-[3px] border-terracotta/25 flex items-center justify-center shadow-elevated">
              <span className="font-serif text-[1.7rem] sm:text-[1.95rem] text-foreground tracking-tight leading-none">11</span>
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
            <p className="font-sans text-[11.5px] font-normal text-foreground/60 mt-0.5">Updated for 2026 · 14 min read · Settling into the long stretch</p>
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
  { label: "Stage", value: "Early third trimester" },
  { label: "Baby size", value: "~38.5 cm — butternut squash" },
  { label: "Baby weight", value: "~1.15 kg" },
  { label: "Trimester", value: "3 of 3 (week 29 of 13)" },
];

const AtAGlance = () => (
  <section id="at-a-glance" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl mb-14 md:mb-20">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 relative bg-gradient-to-br from-stage-pregnancy/45 via-parchment to-sage-bg/55 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-10 overflow-hidden shadow-card-brand">
        <img src={botanicalAccent} alt="" aria-hidden="true" className="absolute -left-3 bottom-0 w-28 opacity-35 pointer-events-none select-none" />
        <SectionLabel tone="terracotta">At a glance</SectionLabel>
        <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-5">
          Fat smoothing the skin, brain growing fast, movement strong and rhythmic — the first real stretch past the third-trimester threshold.
        </h2>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8] mb-4">
          Inside, your baby is around 38.5 cm head to heel and weighs roughly 1.15 kg — already past the
          one-kilo mark. Subcutaneous fat is laying down faster now, smoothing out the skin and giving the
          body more rounded, baby-like proportions. The brain is growing rapidly, with the cortex continuing
          to fold. Lungs scale up surfactant week by week. Movement is strong, often visibly rolling across
          the bump, and the daily pattern is well established.
        </p>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8]">
          Outside, this is the week pregnancy starts to feel daily. The bump is heavier. Sleep is harder.
          Heartburn, breathlessness, pelvic ache, back ache — most weeks bring at least one. Movement
          awareness is now a quiet daily habit. Side-sleep is non-negotiable. The next antenatal
          appointment is closer than the last one. Eleven weeks left, and they will neither rush nor drag
          in any predictable way.
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
  { title: "Fat laying down faster — skin smoothing, body rounding", body: "Subcutaneous fat is laying down rapidly now. The wrinkled, slightly translucent look of earlier weeks is being replaced by smoother, plumper skin and rounder limbs. By 29 weeks, your baby is starting to look much more like the baby you'll meet at birth — only smaller. This fat does two important jobs: it cushions and insulates the body, and it'll be the energy reserve that helps regulate temperature in the first hours after birth." },
  { title: "Brain growing fast — billions of neurons wiring up", body: "The brain is in one of its fastest growth phases. Cortical folding continues; the gyri and sulci that began forming around week 27 are deepening and multiplying. Billions of neurons are wiring into circuits. Sleep–wake cycles are clear and include long stretches of REM sleep. The fetal nervous system can now regulate body temperature to some extent — a real mark of maturity, even though the placenta is still doing most of the work." },
  { title: "Lungs continuing to mature — alveoli multiplying", body: "Surfactant production from type II pneumocytes continues to scale. The alveolar buds — the future air sacs — keep multiplying and refining their structure. Babies born at 29 weeks have substantially better outcomes than even two weeks earlier; with neonatal care, the survival rate is very high and most go on to thrive. The lungs are still not fully ready for unsupported breathing, but every week from here adds important reserve." },
  { title: "Stronger, more rhythmic movement — and tighter quarters", body: "Movement is strong and reliable now. Many parents see kicks visibly roll across the bump, and partners can usually feel them with a hand resting on the belly. As your baby gets bigger, the womb gets relatively tighter — so big rolling movements become slightly less common, and individual jabs and pokes from a foot, knee or elbow more common. The pattern of when this baby moves is what you watch for change in." },
];

const Biology = () => (
  <section id="biology" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="relative rounded-3xl overflow-hidden border border-border/40 shadow-card-brand">
            <div className="aspect-[4/5]">
              <img src={biologyImg} alt="Soft editorial anatomical illustration showing a third-trimester pregnant abdomen at 29 weeks: uterus risen high above the navel pressing on the diaphragm and stomach, baby in a curled position with limbs tucked, placenta visible, surrounded by botanical motifs" loading="lazy" width={1024} height={1280} className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-foreground/60 to-transparent">
              <p className="font-serif italic text-[13px] text-background/95 leading-snug">
                A heavier bump, a fuller baby, a rhythm that's now daily — the long stretch begins.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <SectionLabel tone="terracotta">What's underway biologically</SectionLabel>
          <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-5">
            A baby past one kilo — fat smoothing the skin, brain wiring fast, movement rhythmic and recognisable.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8] mb-8 max-w-2xl">
            Week 29 is the week the baby starts to look much more like the baby you'll meet at birth — only
            smaller. Fat lays down faster. The cortex keeps folding. Lungs keep scaling. Movement is strong
            and rhythmic, with the womb getting relatively tighter as the baby grows. The body inside the
            bump is becoming a person whose patterns you already know.
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
  { Icon: Hand, title: "Pattern, not numbers — your baby's individual rhythm", body: "Current UK guidance (NHS, Tommy's, RCOG) is explicit: no specific number of kicks per day matters. What matters is your baby's individual pattern — when they're active, when they're quiet, what kind of movement is normal for them. By 29 weeks you should know that pattern well. The thing you're watching for is a real, sustained change from it. A daily quiet check-in — same-ish time, somewhere quiet, hand on the bump — is the practice that builds the awareness." },
  { Icon: AlertTriangle, title: "Reduced movement — phone today, not tomorrow", body: "A clear, sustained reduction or change in your baby's normal pattern of movement always needs a phone call to maternity triage today, not tomorrow. Don't try cold drinks, ice on the bump or sugary snacks to wake the baby — current UK guidance is explicit that those methods aren't reliable and they delay the call. Phoning early is always allowed and you will never be made to feel silly for it. Save the maternity triage number in your phone now if you haven't." },
  { Icon: Activity, title: "What strong movement actually feels like at 29 weeks", body: "Often: a foot or knee that visibly pushes out the side of the bump. Hiccups several times a day. Big stretches across the whole bump that change the shape of it briefly. Sharp kicks under the ribs, especially in the evening. Quieter periods (often when you're walking or busy) followed by very active ones (often when you sit down or lie in bed). All of that is normal. The 'rule' is the change-from-pattern rule." },
  { Icon: Sprout, title: "Tighter quarters — what changes from now", body: "As your baby grows and the womb stays roughly the same size, big rolling movements become slightly less common and discrete jabs more common. This is normal — the type of movement may change, but the overall pattern shouldn't. Reduced frequency, reduced strength, or movements that genuinely feel different from your baby's normal still need a phone call. Don't talk yourself out of it — phoning early always allowed." },
];

const Movement = () => (
  <section id="movement" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel tone="terracotta">Movement & rhythm this week</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        Movement is your daily check-in now — pattern awareness, not magic numbers.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        Movement at 29 weeks is strong, recognisable, often visible from the outside. The womb is getting
        relatively tighter as the baby grows, so the kind of movement may shift — but the overall pattern
        shouldn't. A clear, sustained change from your baby's normal pattern always needs a phone call.
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
        Strong movement at 29 weeks doesn't change the rule. Phoning early is always allowed.
      </p>
    </div>
  </section>
);

const bodyNotes = [
  { Icon: Activity, title: "Fundus around 29 cm — bump heavier and fuller", body: "Fundal height tracks closely with weeks. By week 29 the bump sits well above the navel and is heavier than it has been. Posture has shifted further forward; the lower back works harder; the pelvis carries more load. Pelvic-girdle pain, lower-back ache and SPD (symphysis pubis dysfunction) are common — specialist physiotherapy genuinely helps. Asking for a referral is allowed and worth doing." },
  { Icon: Wind, title: "Heartburn and breathlessness, both worse now", body: "The uterus is pressing harder on both the stomach (heartburn) and the diaphragm (breathlessness). Smaller, more frequent meals, eating slowly, not lying flat for an hour after eating, sleeping slightly propped up. Gaviscon is safe. Mild breathlessness on stairs and when climbing is normal — sudden severe breathlessness, breathlessness with chest pain or rapid heartbeat is not, and needs same-day assessment." },
  { Icon: Moon, title: "Sleep is harder — and side-sleep is non-negotiable", body: "From week 28, official UK advice (Tommy's, NHS) is to fall asleep on your side, not on your back, to reduce stillbirth risk. This is now your default. Sleep itself becomes harder: positions are awkward, you wake to wee, hips ache, the mind runs ahead. Pillow set-up genuinely helps. Naps when possible are not weak; they're reasonable. Persistent insomnia or low mood deserves a midwife conversation." },
  { Icon: Brain, title: "Braxton-Hicks regular, sometimes daily", body: "Braxton-Hicks (practice contractions) are often clearly noticeable several times a day at 29 weeks — a painless tightening across the whole bump for 30 to 60 seconds, then releasing. Often after activity, sex, or a full bladder. Drink water, lie down on your side, change position. Regular, painful or rhythmic tightenings, especially with bleeding, fluid loss, or lower-back pain, need urgent assessment for preterm labour." },
  { Icon: Footprints, title: "Swelling, leg cramps, varicose veins, haemorrhoids", body: "Mild swelling in feet, ankles and hands by the end of the day is common — heat and standing make it worse. Night-time leg cramps wake many people. Varicose veins and haemorrhoids may appear or worsen. Hydration, walking when you can, putting your feet up, support tights for legs all help. Sudden swelling in the face or hands, or one-sided leg swelling with pain, needs urgent assessment for pre-eclampsia or DVT." },
  { Icon: Heart, title: "Colostrum may start to leak, nipples darker", body: "Some people start to leak small amounts of colostrum — a thick, golden-yellow first milk — from around 29 weeks. Some don't until much later, or at all before birth. Both are normal and tell you nothing about how breastfeeding will go. Nipples and the area around them often become darker and more pronounced; the body is sending visual cues for the baby to find the breast at birth." },
];

const Body = () => (
  <section id="body" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="max-w-2xl mb-10">
        <SectionLabel tone="terracotta">Your body this week</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
          Heavier, achier, more breathless — the daily weight of carrying becoming real.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
          Week 29 is the week pregnancy starts to feel daily in the body. Heartburn worsens. Breathlessness
          turns up on the stairs. Sleep is harder. The pelvis and back complain. Side-sleep is non-negotiable.
          Most of it is normal. A few signs are worth knowing and acting on quickly.
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
    Icon: Hand, name: "Strong, visible movement and hiccups",
    feels: "Definite kicks, rolls and stretches, often visible from outside. A foot or knee that pushes out the side of the bump. Hiccups several times a day. A pattern that's now familiar — when active, when quiet.",
    why: "Stronger muscles, full-coordination movement, a baby big enough that movement consistently reaches the abdominal wall. Hiccups are the diaphragm practising.",
    normal: "Pattern awareness, not magic numbers. A clear, sustained reduction or change in your baby's normal pattern always needs a phone call to maternity triage today, not tomorrow.",
  },
  {
    Icon: Wind, name: "Heartburn — often nightly",
    feels: "Burning behind the breastbone or in the throat after meals or lying down. Acid taste. A 'too full' feeling after small portions. Often worst at night.",
    why: "Progesterone relaxes the valve at the top of the stomach. The rising uterus presses the stomach upwards and squeezes its capacity.",
    normal: "Very common from now. Smaller, more frequent meals, eating slowly, not lying flat for an hour after eating, sleeping slightly propped up. Gaviscon is safe. Stronger options on prescription if needed.",
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
    Icon: Wind, name: "Mild breathlessness on stairs",
    feels: "A noticeable need to pause on the stairs. Breath that catches when you carry something. A general sense the lungs have less room.",
    why: "The rising uterus presses on the diaphragm, reducing the space the lungs can expand into. Breathing becomes shallower and more frequent.",
    normal: "Mild breathlessness on exertion is normal in late pregnancy. Sudden severe breathlessness, breathlessness with chest pain or rapid heartbeat, or difficulty breathing at rest needs same-day assessment.",
  },
  {
    Icon: Brain, name: "Braxton-Hicks, several times a day",
    feels: "Painless tightening across the whole bump that lasts 30 to 60 seconds, then releases. Often after activity, sex, or a full bladder.",
    why: "Practice contractions of the uterus — the muscle tightening and releasing as it tones up for the eventual work of labour.",
    normal: "Very common. Drink water, lie down, change position. Regular, painful or rhythmic tightenings, or any with bleeding or fluid, need urgent assessment for preterm labour.",
  },
  {
    Icon: Footprints, name: "Swelling, varicose veins, haemorrhoids",
    feels: "Puffy feet and ankles by evening. Visible blue-ish veins on legs. Itchy or painful lumps around the back passage. All worse standing or after long sitting.",
    why: "Higher blood volume, slower circulation, the weight of the uterus pressing on pelvic veins.",
    normal: "Common. Hydration, walking, putting feet up, support tights, fibre and stool softeners for haemorrhoids. Sudden swelling in face or hands, or one-sided painful leg swelling, needs urgent assessment.",
  },
  {
    Icon: Heart, name: "Colostrum leakage, darker nipples",
    feels: "Small wet patches on bras or tops, sometimes a sticky golden-yellow drop. Nipples and the area around them noticeably darker and more pronounced.",
    why: "The body has been making colostrum since the second trimester; some leaks early, some doesn't. Hormonal pigmentation makes the areola visually pronounced for the baby at birth.",
    normal: "Both common and both normal. Breast pads in the bra if leaking bothers you. Leaking — or not leaking — tells you nothing about future breastfeeding.",
  },
];

const Symptoms = () => (
  <section id="symptoms" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel tone="terracotta">Common symptoms</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        What's likely to show up at week 29 — and what each one really means.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        Week 29 brings strong visible movement, often-nightly heartburn, broken sleep, mild breathlessness,
        Braxton-Hicks several times a day, swelling and the first colostrum for some. Most are normal. A few
        are worth flagging.
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
  "A daily, embodied sense of being pregnant — there is no forgetting.",
  "Excitement and quiet nervousness about birth alternating in the same hour.",
  "A growing inward turn — the world feels smaller and more focused.",
  "Tenderness for the baby, frustration with the body, in the same morning.",
  "Sudden tearfulness arriving at the strangest moments.",
  "The gentle pressure of practical decisions still to be made.",
  "Eleven more weeks. Both impossibly long and impossibly close.",
];

const Emotional = () => (
  <section id="emotional" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 relative bg-gradient-to-br from-lavender-bg via-parchment to-stage-pregnancy/40 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-9 shadow-card-brand overflow-hidden">
          <img src={botanicalAccent} alt="" aria-hidden="true" className="absolute right-0 top-0 w-24 opacity-35 pointer-events-none select-none" />
          <SectionLabel tone="lavender">Emotionally this week</SectionLabel>
          <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-4">
            The long stretch begins — anticipation, weariness, and a quiet inward turn.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/80 leading-[1.8] mb-4">
            Week 29 has a particular emotional flavour. Pregnancy is now constant in the body — there's no
            forgetting it for an hour. The baby inside the bump is real, recognisable, kicks while you
            try to sleep. Birth feels closer; eleven weeks is not far. There's often a healthy nervousness
            about what's still to come — and a growing tenderness for what's already here.
          </p>
          <p className="font-sans text-[14px] text-foreground/70 leading-[1.75]">
            The inward turn — sometimes called nesting, sometimes just a quieter interior — is normal.
            Smaller world, fewer demands, more rest, more attention to what matters. You don't have to
            push through it. Listening to it is part of the work.
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
  { Icon: Hand, title: "Pattern-aware movement check-ins, daily", note: "Same-ish time of day, somewhere quiet, hand on the bump, paying attention. There's no number to count to — you're tuned to your baby's individual pattern. A clear, sustained reduction or change in that pattern always needs a phone call to maternity triage today, not tomorrow. Don't try ice or sugary drinks to wake the baby — they aren't reliable and they delay the call. Save the maternity triage number in your phone now." },
  { Icon: Calendar, title: "Confirm next antenatal appointment in the diary", note: "Appointments are now more frequent — typically every two to four weeks. The next one usually checks blood pressure, urine, fundal height, and listens to the heartbeat. Bring up anything bothering you, however small. Appointments are not exams; they're conversations. If something feels off between appointments, don't wait — phone the midwife or maternity triage." },
  { Icon: Baby, title: "Hospital bag — start, don't finish", note: "You don't need it ready this week, but starting the list now means it isn't a panic in week 36 or 37. Two bags is normal: one for labour and the first day, one for the rest of the stay. For you: nightie, slippers, snacks, phone charger, toiletries, postpartum pads. For baby: vests, sleepsuits, nappies, blanket, going-home outfit. For partner: snacks, change of clothes, phone charger. Lists exist online — pick one and start." },
  { Icon: Sprout, title: "Sleep set-up — make it as good as it can be", note: "Side-sleep is now your default. Pillow between the knees, one supporting the bump, one behind the back — or a proper pregnancy pillow. Bedroom cool. Light blocked. Wind-down routine that starts an hour before bed. A glass of water on the bedside (you'll need it). Naps in the day, when possible, are reasonable, not weak." },
  { Icon: Apple, title: "Iron, calcium, hydration, protein — keep going", note: "Iron at most meals (red meat, beans, lentils, leafy greens, fortified cereals) paired with vitamin C for absorption. Calcium daily. Protein at every meal — important for the fat being laid down on your baby and for your own tissue. Hydrate well. About 300 extra calories a day for the second and third trimesters. If you feel persistently flat, mention it — late-pregnancy anaemia is common and easily checked." },
  { Icon: BookOpen, title: "Antenatal classes — start them this month if booked", note: "Most antenatal classes (NHS, NCT, hypnobirthing, hospital) run from roughly weeks 28 to 36. If you've booked, the first sessions are usually around now. Show up tired and uncertain — everyone else will be too. Partners almost always invited. The friendships often outlast the classes themselves and become a real source of support in the first year." },
];

const Focus = () => (
  <section id="focus" className="bg-stage-pregnancy/35 py-16 md:py-24 border-y border-border/30">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <SectionLabel tone="terracotta">Focus this week</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.2rem] text-foreground leading-tight mb-4">
            Daily movement check-ins, sleep set-up, hospital-bag list started, antenatal classes underway.
          </h2>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8]">
            Week 29 is the week of settling into the long stretch. Movement awareness becomes daily habit.
            Sleep set-up matters. The hospital bag is a list, not a panic. Antenatal classes are now
            running. Small steady inputs that make the next eleven weeks more livable.
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
            Eleven weeks to go — the threshold for phoning is gentler, not stricter.
          </h3>
          <p className="font-sans text-[13.5px] text-foreground/70 leading-[1.75] mt-3">
            Maternity triage is your first call for anything urgent. Your midwife, GP, NHS 111, or antenatal
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
        One and a half kilos of small person, fat smoothing the skin, a foot in your ribs at midnight, eleven weeks left to wait. Week 29 is the week the work becomes daily — and the baby starts to look much more like the baby you'll meet.
      </p>
      <Heart size={14} className="text-terracotta/60 mx-auto mt-5" />
    </div>
  </section>
);

const reflectionPrompts = ["What this week feels like in my body", "What I notice about my baby's pattern", "Something I want to say to the baby", "A small kindness for myself"];
const askChips = ["Is it normal to feel this breathless?", "How do I sleep more comfortably at 29 weeks?", "When should I phone about reduced movement?", "Should I be leaking colostrum already?", "When do I need to have my hospital bag ready?"];

const ReflectionAsk = () => (
  <PublicWeekReflectionAsk
    week={29}
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
            The week the long stretch begins deserves more than a passing line.
          </h3>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8] mb-6">
            The midnight foot in your ribs. The way the bump leads you into a room now. The slow, real sense
            of becoming someone's parent. The journal holds the small, invisible turning points of becoming
            a parent — the ones nobody warns you matter.
          </p>
          <ul className="space-y-2.5 mb-7">
            {["A page for the long stretch through the third trimester", "Letters to your baby through every week", "Guided pages all the way to birth"].map((line) => (
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
    desc: "How movement changes from 28 weeks onwards, what counts as a real change, and exactly when to phone — without overthinking it." },
  { slug: "sleep-in-pregnancy", img: thirdSleepImg, tag: "Sleep",
    title: "Sleeping through the third trimester",
    desc: "Side-sleep, the pillow set-up most people end up with, and how to make broken sleep more livable through the long stretch." },
  { slug: "emotional-wellbeing-pregnancy", img: thirdEmotionalImg, tag: "Mind",
    title: "The inward turn of the third trimester",
    desc: "Why your world quietly gets smaller, why anticipation and weariness alternate, and why none of it is wrong." },
  { slug: "hospital-bag-and-what-to-pack", img: thirdHospitalBagImg, tag: "Practical",
    title: "Hospital bag — what actually goes in it",
    desc: "Two bags, calm lists, and what most people end up wishing they had — without buying half a shop you don't need." },
  { slug: "the-space-your-baby-will-come-home-to", img: thirdNurseryImg, tag: "Practical",
    title: "Where the baby will sleep — UK safer-sleep advice",
    desc: "In your room, in a cot or Moses basket, for the first six months. How to set it up calmly without overthinking." },
  { slug: "signs-of-labour", img: thirdSignsImg, tag: "Birth",
    title: "Signs of labour — what they actually feel like",
    desc: "Reading ahead is a kindness. The early signs, the real signs, and when to phone the unit at 29 weeks if anything is unsure." },
];

const Related = () => (
  <section id="guidance" className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div className="max-w-xl">
          <SectionLabel tone="terracotta">Read next, because of week 29</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.4rem] text-foreground leading-tight">
            Curated guidance for the first real stretch past the threshold.
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
  { q: "Is it normal to feel this breathless at 29 weeks?",
    a: "Mild breathlessness on the stairs and when carrying things is very common in the third trimester. The rising uterus presses on the diaphragm, reducing the space the lungs can expand into; breathing becomes shallower and more frequent to compensate. It's usually worse in late pregnancy and eases in the last weeks as the baby's head drops lower. What's not normal is sudden severe breathlessness, breathlessness with chest pain or rapid heartbeat, or difficulty breathing at rest — those need same-day assessment, and 999 if severe." },
  { q: "How do I sleep more comfortably at 29 weeks?",
    a: "Side-sleep is now your default — official UK advice is to fall asleep on your side from week 28 onwards to reduce stillbirth risk. The set-up most people end up with: pillow between the knees, one supporting the bump, one behind the back so you don't roll. A proper pregnancy pillow does the same job in one. Bedroom cool, light blocked, a wind-down routine that starts an hour before bed, and a glass of water on the bedside (you'll need it). Naps in the day, when possible, are reasonable. If you wake on your back, just turn back onto your side — the risk is about how you fall asleep, not about momentary back-lying." },
  { q: "How big is the baby at 29 weeks?",
    a: "Around 38.5 cm head to heel and roughly 1.15 kg — about the size of a butternut squash, and already past the one-kilo mark. Babies can vary by a couple of hundred grams either side and still be perfectly on track. Your midwife is now measuring fundal height (the top of the uterus to the pubic bone, in cm) at every appointment. Small variations are normal; significant under- or over-measuring sometimes prompts a growth scan." },
  { q: "Should I be leaking colostrum already?",
    a: "Some people start to leak small amounts of colostrum — a thick, golden-yellow first milk — from around 29 weeks. Some don't until much later. Some don't at all before birth. All of that is normal, and none of it tells you anything about how breastfeeding will go. If leaking bothers you, breast pads in the bra solve it. From around 36 weeks, your midwife may discuss antenatal hand expression — collecting small amounts of colostrum into syringes for the freezer — which can be useful in some situations. They'll guide you if it's relevant." },
  { q: "When does my hospital bag need to be ready?",
    a: "Most guidance suggests having the hospital bag fully packed by around 36 weeks — although a good number of people end up needing it earlier than expected, so 35 weeks is a kinder target. Week 29 is a great week to start the list, not finish the bag. Two bags is normal: one for labour and the first day, one for the rest of the stay. For you: nightie, slippers, snacks, phone charger, toiletries, postpartum pads. For baby: vests, sleepsuits, nappies, blanket, going-home outfit. For partner: snacks, change of clothes, phone charger. Lists exist online — pick one and start." },
  { q: "What does 'reduced movement' actually mean at 29 weeks?",
    a: "It means a clear, sustained reduction or change in your baby's normal pattern of movement — not a quiet hour, not a slow morning. By week 29, you should know your baby's particular pattern of when they're active, when they hiccup, what kind of movement is normal for them. The thing you're watching for is a real change from that. If you notice one, phone maternity triage today, not tomorrow. Don't try cold drinks, ice on the bump or sugary snacks to wake the baby — UK guidance is explicit that those methods aren't reliable and they delay the call. Phoning early is always allowed." },
  { q: "Is heartburn this bad really normal?",
    a: "In late pregnancy, yes — frustratingly often. Two reasons stack together: progesterone relaxes the valve at the top of the stomach (so acid travels back up more easily), and the rising uterus presses on the stomach from below (squeezing its capacity). Smaller, more frequent meals, eating slowly, not lying flat for an hour after eating, and sleeping slightly propped up all help. Gaviscon is safe in pregnancy. If heartburn is severe enough to disrupt sleep or eating, your GP can prescribe stronger medication (usually omeprazole or ranitidine alternatives) — both are well-established in pregnancy and worth asking for." },
  { q: "What if my baby is born this week?",
    a: "Babies born at 29 weeks have substantially better outcomes than even two weeks earlier — survival rates are very high with neonatal care, and most go on to thrive without long-term issues, although a stay in NICU is expected and lung maturity is the main concern. None of this changes what you do this week: the things you can control are the same as for any week of late pregnancy. Pattern-aware movement check-ins. Phoning early about anything that worries you. Side-sleep. Reasonable rest. Eating well. Confirming the next appointment is in the diary. The rest is held by your team, not by you." },
];

const Next = () => (
  <section className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
      <div className="bg-gradient-to-br from-stage-pregnancy/30 via-parchment to-sage-bg rounded-3xl border border-border/30 p-8 sm:p-10 md:p-14 text-center shadow-card-brand">
        <SectionLabel tone="terracotta">Up next</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.5rem] text-foreground leading-tight mb-3">Ready for week 30?</h2>
        <p className="font-sans text-[14.5px] text-foreground/75 max-w-lg mx-auto mb-8 leading-[1.8]">
          Week 30 is a quiet milestone — three-quarters of the way through, the baby visibly fuller, and the
          countdown becoming both real and manageable.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
          <Link to="/pregnancy/week/30" className="inline-flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium shadow-cta hover:bg-terracotta-hover transition-colors">
            Continue to week 30 <ArrowRight size={14} />
          </Link>
          <Link to="/pregnancy/third-trimester" className="inline-flex items-center justify-center gap-2 border border-foreground/25 text-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium hover:bg-parchment-dark transition-colors">
            Explore the third trimester
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const Week29Page = () => (
  <div className="min-h-screen bg-parchment">
    <PregnancyWeekSeo weekNumber={29} />
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
    <WeekCommonQuestions week={29} questions={buildWeekQuestions(29, faqs)} />
    <WeekSources week={29} sources={getWeekSources(29)} />
    <Next />
    <Footer />
  </div>
);

export default Week29Page;
