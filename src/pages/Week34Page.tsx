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
import fetusImg from "@/assets/week34-fetus.jpg";
import honeydewImg from "@/assets/week34-honeydew.jpg";
import biologyImg from "@/assets/week34-biology-detail.jpg";
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
          <span className="text-foreground">Week 34</span>
        </nav>

        <p className="font-sans text-[11px] font-semibold tracking-[0.3em] uppercase text-terracotta mb-5">
          Third trimester · Lungs nearing readiness, body asking more
        </p>
        <h1 className="font-serif text-[2.5rem] sm:text-5xl md:text-[3.75rem] lg:text-[4.25rem] text-foreground leading-[1.04] tracking-tight mb-4 md:mb-5">
          34 Weeks Pregnant
        </h1>
        <p className="font-serif italic text-[1.05rem] sm:text-lg md:text-xl text-foreground/75 max-w-xl mx-auto leading-relaxed">
          Your baby is the size of a honeydew melon — about 45 cm head to heel, around 2.1 kg, with lungs nearing readiness, a body laying on fat fast, and just six weeks of waiting left.
        </p>
      </div>

      <Link to="/pregnancy/week/33" aria-label="Go to week 33" className="absolute left-3 sm:left-6 md:left-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronLeft size={18} />
      </Link>
      <Link to="/pregnancy/week/35" aria-label="Go to week 35" className="absolute right-3 sm:right-6 md:right-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronRight size={18} />
      </Link>
    </div>

    <div className="relative -mt-28 sm:-mt-36 md:-mt-40 mb-6">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex items-end justify-center gap-5 sm:gap-10 md:gap-14">
          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-card border-[3px] border-sage/15 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={honeydewImg} alt="A whole honeydew melon on a parchment background" loading="lazy" width={512} height={512} className="w-full h-full object-cover" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.04]" />
            </div>
            <div className="text-center">
              <p className="font-serif italic text-[12.5px] text-foreground/80 leading-tight">honeydew</p>
              <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/55 mt-1">~45&nbsp;cm</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full bg-card border-[4px] border-terracotta/30 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={fetusImg} alt="Soft editorial illustration of a 34-week baby curled head-down, plump cheeks and rounded limbs from accumulating fat, smooth vernix-coated skin, eyes closed, fingernails reaching the fingertips, suspended in luminous amber amniotic fluid" width={1024} height={1024} loading="eager" decoding="async" className="w-full h-full object-cover scale-[1.02]" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.05]" />
            </div>
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.22em] uppercase text-foreground/65">Your baby this week</p>
          </div>

          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-stage-pregnancy/45 to-sage-bg border-[3px] border-terracotta/25 flex items-center justify-center shadow-elevated">
              <span className="font-serif text-[1.7rem] sm:text-[1.95rem] text-foreground tracking-tight leading-none">6</span>
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
            <p className="font-sans text-[11.5px] font-normal text-foreground/60 mt-0.5">Updated for 2026 · 14 min read · Lungs nearing readiness</p>
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
  { label: "Stage", value: "Third trimester · lungs nearing readiness" },
  { label: "Baby size", value: "~45 cm — honeydew melon" },
  { label: "Baby weight", value: "~2.1 kg" },
  { label: "Trimester", value: "3 of 3 (week 34 of 13)" },
];

const AtAGlance = () => (
  <section id="at-a-glance" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl mb-14 md:mb-20">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 relative bg-gradient-to-br from-stage-pregnancy/45 via-parchment to-sage-bg/55 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-10 overflow-hidden shadow-card-brand">
        <img src={botanicalAccent} alt="" aria-hidden="true" className="absolute -left-3 bottom-0 w-28 opacity-35 pointer-events-none select-none" />
        <SectionLabel tone="terracotta">At a glance</SectionLabel>
        <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-5">
          A 2.1 kg baby with lungs nearing readiness, a body laying on fat fast, and just six weeks until the meeting.
        </h2>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8] mb-4">
          Inside, your baby is around 45 cm head to heel and weighs roughly 2.1 kg. The lungs are
          producing surfactant in earnest now — the slippery substance that keeps the tiny alveoli open
          for a first breath. The central nervous system is fully maturing; reflexes that will be needed
          at birth (sucking, rooting, grasping) are sharper. The skin is smoother as fat continues to lay
          on at around 200 g a week. Most babies are firmly head-down and the room they have is genuinely tight.
        </p>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8]">
          Outside, the body asks more again. The bump is leading everywhere; standing for long is hard;
          turning over in bed takes effort. Reflux is often nightly, swelling is more visible by evening,
          pelvic and rib pressure stack into most days. Antenatal appointments are still every two weeks.
          Side-sleep is the default. Movement awareness is daily habit. The hospital bag is being packed.
          Six weeks left — close enough to plan around, still far enough to keep going gently.
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
  { title: "Lungs nearing readiness — surfactant in earnest", body: "By 34 weeks, type II pneumocytes in the alveoli are producing surfactant at full pace. Surfactant is the slippery substance that keeps the tiny air sacs open between breaths and stops them collapsing. Most babies born from 34 weeks breathe well on their own or with minimal support, and the risk of serious respiratory problems drops sharply from this point. The lungs aren't quite finished — they keep maturing right up to and past full term — but the runway is now short." },
  { title: "Central nervous system maturing — reflexes sharpening", body: "The brain continues its rapid late-term growth, with cortical folding well advanced and white matter laying down myelin. The reflexes your baby will need at birth — sucking, rooting, grasping, the startle reflex — are sharper and more coordinated. Sleep–wake cycles are now well established and many babies have clear quiet and active periods most days. By 34 weeks the central nervous system is doing the work of getting ready for life outside." },
  { title: "Fat laying on — about 200 g a week", body: "Subcutaneous fat continues to deposit at roughly 200 g a week, smoothing the skin and rounding the cheeks, arms and thighs. Brown fat — particularly around the neck, chest and back — will help your baby regulate temperature in the first days outside. The vernix caseosa, the white waxy coating, is still protecting the skin from the amniotic fluid; some of it will still be there at birth, especially in the creases." },
  { title: "Fingernails to fingertips, hair settling", body: "Fingernails have grown out to reach the fingertips by 34 weeks (some babies are born already needing a tiny nail trim). Lanugo — the fine downy hair that covered the body — is mostly shed now, much of it swallowed and held in the gut to form the first meconium stool. Head hair, where it's growing, is settling into a clearer pattern. Eyes are working: pupils contract and dilate to changes in light filtering through the abdominal wall." },
];

const Biology = () => (
  <section id="biology" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="relative rounded-3xl overflow-hidden border border-border/40 shadow-card-brand">
            <div className="aspect-[4/5]">
              <img src={biologyImg} alt="Soft editorial anatomical illustration showing fetal lungs at 34 weeks, with alveolar sacs being coated in surfactant — the substance that keeps the airways open for a first breath" loading="lazy" width={1024} height={1280} className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-foreground/60 to-transparent">
              <p className="font-serif italic text-[13px] text-background/95 leading-snug">
                Lungs producing surfactant in earnest, fat laying on at 200 g a week, and a body asking more of you.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <SectionLabel tone="terracotta">What's underway biologically</SectionLabel>
          <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-5">
            2.1 kg, surfactant in earnest, sharper reflexes, fingernails to the fingertips.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8] mb-8 max-w-2xl">
            Week 34 is the week the lungs near the line of being ready and the nervous system gets sharper.
            Fat continues to lay on. Reflexes for feeding and grasping are more coordinated. Most babies born
            from now do well, often with little or no breathing support. The body is genuinely close to
            being ready — and your body is asking more of you each day.
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
  { Icon: Hand, title: "Pattern, not numbers — what your baby does", body: "Current UK guidance (NHS, Tommy's, RCOG) is unchanged at 34 weeks: no specific number of kicks per day matters. What matters is your baby's individual pattern — when they're active, when they're quiet, what kind of movement is normal for them. By 34 weeks you know that pattern intimately. The thing you're watching for is a real, sustained change. A daily quiet check-in — same-ish time, somewhere quiet, hand on the bump — is the practice that builds the awareness." },
  { Icon: AlertTriangle, title: "Reduced movement — phone today, not tomorrow", body: "A clear, sustained reduction or change in your baby's normal pattern of movement always needs a phone call to maternity triage today, not tomorrow. Don't try cold drinks, ice on the bump or sugary snacks to wake the baby — current UK guidance is explicit that those methods aren't reliable and they delay the call. Phoning early is always allowed and you will never be made to feel silly for it." },
  { Icon: Sprout, title: "What 34-week movement actually feels like", body: "The texture is firmer and more pronounced, but the room is genuinely tight. A foot pushing out the side of the bump in a way you can sometimes see and even photograph. A bottom briefly visible as a hard lump under the skin. A foot lodged under one rib for hours. Hiccups still daily for many. Big rolling movements are largely gone. Discrete jabs, pokes and stretches dominate. The pattern stays the pattern." },
  { Icon: Activity, title: "Why movement feels stronger and more visible", body: "Your baby has gained around 1.2 kg in the last six weeks; the womb has stretched but not at the same rate. Each kick now meets the boundary harder. You'll often see and feel limbs distinctly. This intensity is normal. The shift in texture isn't a reason to phone; a clear, sustained reduction or change in the overall pattern is. Don't talk yourself out of phoning if something feels different. Phoning early is always allowed." },
];

const Movement = () => (
  <section id="movement" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel tone="terracotta">Movement & rhythm this week</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        Movement is firmer and more visible — the room genuinely tight, the pattern still constant.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        Movement at 34 weeks is strong, distinct, often visible from the outside. The room is tight enough
        that each kick meets a boundary. The pattern of when your baby is active and quiet shouldn't
        change. A clear, sustained change always needs a phone call.
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
  { Icon: Activity, title: "Fundus around 34 cm — bump heavy and leading", body: "Fundal height is roughly 34 cm now. The bump leads everywhere you go and changes how you stand, walk and turn over in bed. Posture has shifted further forward; the lower back and pelvis carry more load every day. Pelvic-girdle pain (PGP / SPD), lower-back ache, sciatica and rib pressure are all common — specialist physiotherapy genuinely helps. Asking for a referral is allowed and worth doing if you haven't already." },
  { Icon: Footprints, title: "Swelling more obvious — especially by evening", body: "Mild swelling in feet, ankles and hands by the end of the day is very common at 34 weeks — heat and standing make it worse. Hydration, walking when you can, putting your feet up, and support tights for legs all genuinely help. Sudden swelling in the face or hands, or one-sided leg swelling with pain or warmth, needs urgent assessment for pre-eclampsia or DVT. So does swelling that arrives with a headache, vision changes or upper-belly pain." },
  { Icon: Wind, title: "Reflux, breathlessness, less room to breathe", body: "The uterus is pressing harder on both the stomach (reflux) and the diaphragm (breathlessness). Smaller, more frequent meals, eating slowly, not lying flat for an hour after eating, and sleeping slightly propped up. Gaviscon is safe; stronger options on prescription if needed. Mild breathlessness on stairs is normal — sudden severe breathlessness, or breathlessness with chest pain or rapid heartbeat, needs same-day assessment." },
  { Icon: Moon, title: "Sleep is harder — and side-sleep stays the default", body: "From week 28 onwards, official UK advice is to fall asleep on your side, not your back, to reduce stillbirth risk. Sleep itself is broken: positions are awkward, hips ache, you wake to wee at least once or twice. Pillow set-up genuinely helps — between knees, behind the back, under the bump. Naps in the day, when possible, are reasonable. Persistent insomnia or low mood deserves a midwife conversation." },
  { Icon: Brain, title: "Braxton-Hicks regular — and the urge to check", body: "Braxton-Hicks are often clearly noticeable many times a day at 34 weeks — a painless tightening across the whole bump for 30 to 60 seconds, then releasing. Drink water, lie down on your side, change position. Regular, painful, rhythmic tightenings — especially with bleeding, fluid loss, or lower-back pain — need urgent assessment for preterm labour. The threshold for phoning is gentler in the late third trimester, not stricter." },
  { Icon: Heart, title: "Colostrum, carpal tunnel, posture shifts", body: "More people are leaking small amounts of colostrum (a thick yellowish fluid) by 34 weeks; many still aren't, which is also normal. Carpal tunnel symptoms (hand tingling and numbness, especially overnight) are common — a wrist splint helps. Posture shifts further forward to compensate for the bump weight — gentle pelvic-floor and core work, and short rests through the day, genuinely help." },
];

const Body = () => (
  <section id="body" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="max-w-2xl mb-10">
        <SectionLabel tone="terracotta">Your body this week</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
          Heavier, fuller, more demanding — the body asking more of you each day.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
          Week 34 is the week the body genuinely asks more. Reflux is daily. Breathlessness shows up
          earlier. Sleep is broken. Swelling is more obvious. The pelvis and back complain. Side-sleep
          is non-negotiable. Most of it is normal. A few signs are worth knowing and acting on quickly.
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
    Icon: Hand, name: "Strong, visible movement",
    feels: "Distinct kicks and pushes you can sometimes see and photograph from the outside. A foot lodged under one rib for hours. Hiccups several times a day. The whole bump shifting at times.",
    why: "The baby has gained around 1.2 kg in six weeks; the womb has stretched but not at the same rate. Each kick now meets the boundary harder, often visibly.",
    normal: "Pattern awareness, not magic numbers. The texture may shift, but the overall pattern shouldn't. A clear, sustained reduction or change always needs a phone call to maternity triage today, not tomorrow.",
  },
  {
    Icon: Footprints, name: "Swelling — feet, ankles, sometimes hands",
    feels: "Puffy feet and ankles by evening. Shoes feeling tight. Rings tighter on fingers. Mild puffiness round the face on waking. All worse standing or after long sitting.",
    why: "Higher blood volume, slower circulation, the weight of the uterus pressing on pelvic veins, and gravity over the day.",
    normal: "Common. Hydration, walking, putting feet up, support tights. Sudden swelling in face or hands, or one-sided painful or warm leg swelling, needs urgent assessment for pre-eclampsia or DVT.",
  },
  {
    Icon: Wind, name: "Reflux — often nightly",
    feels: "Burning behind the breastbone or in the throat after meals or lying down. Acid taste. A 'too full' feeling after small portions. Often worst at night.",
    why: "Progesterone relaxes the valve at the top of the stomach. The rising uterus presses the stomach upwards and squeezes its capacity.",
    normal: "Very common. Smaller, more frequent meals, eating slowly, not lying flat for an hour after eating, sleeping slightly propped up. Gaviscon is safe. Stronger options on prescription if needed.",
  },
  {
    Icon: Activity, name: "Pelvic-girdle pain and sciatica",
    feels: "Sharp pain in the pubic bone, around the back of the pelvis, or shooting down one leg. Worse with walking, climbing stairs, getting in and out of the car, rolling over in bed.",
    why: "Pelvic joints softening under pregnancy hormones (especially relaxin), the asymmetric loading of a heavier bump, and sometimes the baby's position pressing on the sciatic nerve.",
    normal: "Common. Specialist physiotherapy genuinely helps — ask your midwife for a referral. Avoid wide-leg movements, get dressed sitting down, sleep with a pillow between the knees, support belt for some.",
  },
  {
    Icon: Moon, name: "Broken sleep, vivid dreams",
    feels: "Strange, vivid, often baby-related dreams. Waking to wee at least once or twice. Difficulty getting comfortable on either side. Daytime tiredness that's hard to shake.",
    why: "Hormonal changes affect sleep architecture. The growing bump makes positions awkward. Higher blood volume means kidneys process more fluid overnight.",
    normal: "Very common. Pillow set-up helps. Worsening insomnia or persistent low mood needs a midwife conversation.",
  },
  {
    Icon: Wind, name: "Breathlessness on stairs",
    feels: "A noticeable need to pause on the stairs. Breath that catches when you carry something. A general sense the lungs have less room.",
    why: "The rising uterus presses on the diaphragm, reducing the space the lungs can expand into. Breathing becomes shallower and more frequent.",
    normal: "Mild breathlessness on exertion is normal. Sudden severe breathlessness, breathlessness with chest pain or rapid heartbeat, or difficulty breathing at rest needs same-day assessment.",
  },
  {
    Icon: Brain, name: "Braxton-Hicks, many times a day",
    feels: "Painless tightening across the whole bump that lasts 30 to 60 seconds, then releases. Often after activity, sex, or a full bladder. Sometimes uncomfortable but not painful.",
    why: "Practice contractions — the uterus tightening and releasing as it tones up for the eventual work of labour.",
    normal: "Very common. Drink water, lie down, change position. Regular, painful or rhythmic tightenings, or any with bleeding or fluid, need urgent assessment for preterm labour.",
  },
  {
    Icon: Heart, name: "Colostrum, carpal tunnel, rib pressure",
    feels: "Small yellow stains on a bra. Hand tingling, numbness or weakness, especially overnight. A foot tucked under one rib for hours.",
    why: "Hormonal preparation for breastfeeding (colostrum). Mild fluid retention compressing the median nerve at the wrist (carpal tunnel). A bigger baby in tighter space (rib pressure).",
    normal: "All common in late pregnancy. A wrist splint helps carpal tunnel; cat-cow, leaning forward and warm baths help rib pressure. Severe or persistent symptoms — flag at your next appointment.",
  },
];

const Symptoms = () => (
  <section id="symptoms" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel tone="terracotta">Common symptoms</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        What's likely to show up at week 34 — and what each one really means.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        Week 34 brings strong visible movement, evening swelling, often-nightly reflux, broken sleep,
        breathlessness on stairs, Braxton-Hicks many times a day, pelvic and back pain, and possibly
        more colostrum. Most are normal. A few are worth flagging quickly.
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
      <Link to="/articles/third-trimester-sleep" className="inline-flex items-center gap-2 font-sans text-[13.5px] font-medium text-terracotta hover:gap-3 transition-all">
        Read: sleeping through the third trimester <ArrowRight size={13} />
      </Link>
    </div>
  </section>
);

const emotionalTruths = [
  "A constant, embodied sense of being pregnant — heavy, full, all-day.",
  "Tiredness that isn't tiredness — more like 'carrying' for hours.",
  "An inward turn deepening — the world quietly narrowing to what matters.",
  "Tenderness for the baby and frustration with the body, often together.",
  "A real need for support — practical, emotional, both.",
  "Tearfulness arriving at the strangest moments, then passing.",
  "Six more weeks. Both impossibly long and impossibly close.",
];

const Emotional = () => (
  <section id="emotional" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 relative bg-gradient-to-br from-lavender-bg via-parchment to-stage-pregnancy/40 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-9 shadow-card-brand overflow-hidden">
          <img src={botanicalAccent} alt="" aria-hidden="true" className="absolute right-0 top-0 w-24 opacity-35 pointer-events-none select-none" />
          <SectionLabel tone="lavender">Emotionally this week</SectionLabel>
          <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-4">
            Asking more — and quietly asking for more in return.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/80 leading-[1.8] mb-4">
            Week 34 has a particular emotional shape. The body is genuinely demanding by now. There's no
            forgetting it for an hour. The 'not long now, but still not yet' feeling becomes a daily
            companion — a strange mix of waiting, weariness and tenderness that arrives without warning.
            Letting people help is part of the work this week.
          </p>
          <p className="font-sans text-[14px] text-foreground/70 leading-[1.75]">
            The inward turn deepens. Smaller world, fewer demands, more rest, more attention to what
            matters. You don't have to push through it. Listening to it is part of the work — and the
            decisions starting to land (where to give birth, who's around, what to ask for) feel much
            less abstract by the day.
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
  { Icon: Hand, title: "Pattern-aware movement check-ins, daily", note: "Same-ish time of day, somewhere quiet, hand on the bump, paying attention. The texture of movement is firmer and more visible — but the overall pattern shouldn't change. A clear, sustained reduction or change always needs a phone call to maternity triage today, not tomorrow. Don't try ice or sugary drinks to wake the baby — they aren't reliable and they delay the call." },
  { Icon: Calendar, title: "Antenatal appointments — every two weeks now", note: "From 31–32 weeks appointments are typically every two weeks (and weekly from 36). The 34-week appointment usually checks blood pressure, urine, fundal height, position, and listens to the heartbeat. It's also a good appointment to talk through your birth preferences. Bring up anything bothering you, however small. If something feels off between appointments, don't wait — phone the midwife or maternity triage." },
  { Icon: Baby, title: "Hospital bag — actually packed and accessible", note: "Most guidance suggests fully packed by around 35 to 36 weeks. Week 34 is a kind week to do the actual packing — somewhere accessible, by the front door or in the car. Two bags is normal: one for labour and the first day, one for the rest of the stay. For you: nightie, slippers, snacks, phone charger, toiletries, postpartum pads. For baby: vests, sleepsuits, nappies, blanket, going-home outfit. For partner: snacks, change of clothes, charger." },
  { Icon: ShieldCheck, title: "Birth preferences — not a script, a conversation", note: "Week 34 is a sensible week to start drafting your birth preferences (sometimes called a birth plan). Not a rigid script — births rarely follow one — but a clear sense of what matters to you: pain relief options you'd like to try, the environment you want, who you'd like with you, what to do in different scenarios. Bring it to your 36-week appointment to talk through with your midwife. Flexibility is the point, not the prescription." },
  { Icon: Apple, title: "Iron, calcium, hydration, protein — keep going", note: "Iron at most meals (red meat, beans, lentils, leafy greens, fortified cereals) paired with vitamin C for absorption. Calcium daily. Protein at every meal. Hydrate well. About 300 extra calories a day for the second and third trimesters. If you feel persistently flat, mention it — late-pregnancy anaemia is common and easily checked with the bloods around your 36-week appointment." },
  { Icon: BookOpen, title: "Signs of labour — read ahead, not in panic", note: "Reading ahead about the early signs of labour (waters going, regular tightening contractions that grow longer, stronger and closer, a bloody show) is a kindness, not a jinx. So is knowing when to phone the unit (regular painful contractions, waters going, any bleeding, any reduced movement, any concern at all). The reading is much easier now than at 3am in week 39." },
];

const Focus = () => (
  <section id="focus" className="bg-stage-pregnancy/35 py-16 md:py-24 border-y border-border/30">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <SectionLabel tone="terracotta">Focus this week</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.2rem] text-foreground leading-tight mb-4">
            Movement check-ins, hospital bag actually packed, birth preferences drafted, signs of labour read ahead.
          </h2>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8]">
            Week 34 is the week to lean into practical preparation. Movement awareness is daily habit. The
            hospital bag is actually packed. The birth preferences are drafted, not perfected. The signs of
            labour are read ahead, calmly. The body is allowed to ask for what it needs.
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
            Six weeks to go — the threshold for phoning is gentler, not stricter.
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
        A 2.1 kg baby with lungs nearing the line of being ready, a body asking more of you each day, and six weeks of waiting that feel both impossibly long and impossibly close. Week 34 is the week to pack the bag and ask for what you need.
      </p>
      <Heart size={14} className="text-terracotta/60 mx-auto mt-5" />
    </div>
  </section>
);

const reflectionPrompts = ["What this week feels like in my body", "What I notice about my baby's pattern", "Something I want to say to the baby", "A small kindness for myself"];
const askChips = ["What do my baby's lungs need to be ready?", "Are my Braxton-Hicks normal at 34 weeks?", "What if my baby comes at 34 weeks?", "When should the hospital bag be packed?", "How do I write birth preferences?"];

const ReflectionAsk = () => (
  <section className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl pb-16 md:pb-24">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-card rounded-3xl border border-border/40 border-t-2 border-t-terracotta/40 p-7 sm:p-8 md:p-9 shadow-card-brand">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-9 h-9 rounded-full bg-stage-pregnancy/40 flex items-center justify-center shrink-0">
            <Leaf size={14} className="text-terracotta" />
          </span>
          <div className="min-w-0">
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.24em] uppercase text-terracotta">A moment for reflection</p>
            <h3 className="font-serif text-[1.3rem] sm:text-[1.35rem] text-foreground mt-0.5 leading-snug">What does this week feel like for you?</h3>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {reflectionPrompts.map((p) => (
            <span key={p} className="font-sans text-[11.5px] font-medium bg-stage-pregnancy/50 text-foreground/80 rounded-full px-3 py-1.5 border border-terracotta/20">{p}</span>
          ))}
        </div>
        <textarea rows={4} placeholder="Write your thoughts here… this is just for you." className="w-full bg-parchment/80 border border-border/40 rounded-xl px-4 py-3.5 font-sans text-[13.5px] text-foreground placeholder:text-foreground/45 resize-none focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta/30 transition-all leading-relaxed" />
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
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.24em] uppercase text-terracotta">Ask about week 34</p>
            <h3 className="font-serif text-[1.3rem] sm:text-[1.35rem] text-foreground mt-0.5 leading-snug">A question on your mind?</h3>
          </div>
        </div>
        <p className="font-sans text-[13px] text-foreground/70 leading-relaxed mb-4">Get a calm, evidence-led answer tailored to where you are right now.</p>
        <input type="text" placeholder="e.g. Are my baby's lungs ready at 34 weeks?" className="w-full bg-parchment/80 border border-border/40 rounded-full px-5 py-3.5 font-sans text-[13.5px] text-foreground placeholder:text-foreground/45 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta/30 transition-all" />
        <p className="font-sans text-[10.5px] font-semibold tracking-[0.22em] uppercase text-foreground/55 mt-5 mb-2.5">Popular at this stage</p>
        <div className="flex flex-wrap gap-2">
          {askChips.map((c) => (
            <Link key={c} to="/ask" className="font-sans text-[12px] font-medium text-foreground/80 bg-parchment-dark/60 border border-border/40 hover:border-terracotta/50 hover:text-foreground px-3.5 py-1.5 rounded-full transition-colors">{c}</Link>
          ))}
        </div>
      </div>
    </div>
  </section>
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
            The week the bag gets packed deserves more than a passing line.
          </h3>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8] mb-6">
            The visible push of a foot. The first folded sleepsuit going into the bag. The slow,
            real understanding that you'll soon meet this person. The journal holds the small,
            invisible turning points of becoming a parent — the ones nobody warns you matter.
          </p>
          <ul className="space-y-2.5 mb-7">
            {["A page for every week of the third trimester", "Letters to your baby through every week", "Guided pages all the way to birth"].map((line) => (
              <li key={line} className="flex items-start gap-2.5">
                <Check size={13} className="text-terracotta mt-1 shrink-0" />
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
  { slug: "third-trimester-hospital-bag", img: thirdHospitalBagImg, tag: "Practical",
    title: "Hospital bag — what actually goes in it",
    desc: "Two bags, calm lists, and what most people end up wishing they had — without buying half a shop you don't need." },
  { slug: "third-trimester-signs-of-labour", img: thirdSignsImg, tag: "Birth",
    title: "Signs of labour — what they actually feel like",
    desc: "Reading ahead is a kindness. The early signs, the real signs, and when to phone the unit at 34 weeks if anything is unsure." },
  { slug: "third-trimester-sleep", img: thirdSleepImg, tag: "Sleep",
    title: "Sleeping through the third trimester",
    desc: "Side-sleep, the pillow set-up most people end up with, and how to make broken sleep more livable through the long stretch." },
  { slug: "third-trimester-emotional", img: thirdEmotionalImg, tag: "Mind",
    title: "The inward turn of the third trimester",
    desc: "Why your world quietly gets smaller, why anticipation and weariness alternate, and why none of it is wrong." },
  { slug: "third-trimester-movement", img: thirdMovementImg, tag: "Movement",
    title: "Pattern awareness through the third trimester",
    desc: "How movement texture changes as the womb gets relatively tighter, what counts as a real change, and exactly when to phone — without overthinking it." },
  { slug: "third-trimester-nursery", img: thirdNurseryImg, tag: "Practical",
    title: "Where the baby will sleep — UK safer-sleep advice",
    desc: "In your room, in a cot or Moses basket, for the first six months. How to set it up calmly, ahead of time, without overthinking." },
];

const Related = () => (
  <section id="guidance" className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div className="max-w-xl">
          <SectionLabel tone="terracotta">Read next, because of week 34</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.4rem] text-foreground leading-tight">
            Curated guidance for the week the lungs near readiness.
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
  { q: "Are my baby's lungs ready at 34 weeks?",
    a: "They're nearly there. By 34 weeks, type II pneumocytes in the alveoli are producing surfactant — the slippery substance that keeps the tiny air sacs open between breaths — at full pace. Most babies born from 34 weeks breathe well on their own or with minimal support, and the risk of serious respiratory problems drops sharply from this point. The lungs aren't quite finished — they keep maturing right up to and past full term — but the runway is now genuinely short." },
  { q: "How big is the baby at 34 weeks?",
    a: "Around 45 cm head to heel and roughly 2.1 kg — about the size of a honeydew melon. Babies vary by a couple of hundred grams either side and still be perfectly on track. Your midwife is now measuring fundal height (the top of the uterus to the pubic bone, in cm) at every appointment. Small variations are normal; significant under- or over-measuring sometimes prompts a growth scan." },
  { q: "What if my baby is born at 34 weeks?",
    a: "Babies born at 34 weeks have very high survival rates with neonatal care, and most go on to thrive without long-term issues. A short NICU or special-care stay is common — often for feeding support and temperature regulation more than breathing — but many 34-weekers need only minimal intervention. None of this changes what you do this week: pattern-aware movement check-ins, phoning early about anything that worries you, side-sleep, reasonable rest. The rest is held by your team." },
  { q: "Is it normal for movement to feel really strong and visible now?",
    a: "Yes — strong, visible movement is one of the defining features of week 34. Your baby has gained around 1.2 kg in six weeks; the womb has stretched but not at the same rate, so each kick now meets the boundary harder. Limbs are often distinctly visible from the outside. The texture of movement is firmer and more pronounced; the pattern of when your baby is active and quiet shouldn't change. A clear, sustained change in that pattern always needs a phone call to maternity triage today, not tomorrow." },
  { q: "When does my hospital bag actually need to be packed?",
    a: "Most guidance suggests fully packed by around 35–36 weeks — although a fair number of people need it earlier, so 35 is a kinder target. Week 34 is a sensible week to do the actual packing and have it somewhere accessible (by the front door or in the car). Two bags is normal: one for labour and the first day, one for the rest of the stay. For you: nightie, slippers, snacks, phone charger, toiletries, postpartum pads. For baby: vests, sleepsuits, nappies, blanket, going-home outfit. For partner: snacks, change of clothes, charger." },
  { q: "Should I be writing a birth plan now?",
    a: "Week 34 is a sensible week to draft your birth preferences (sometimes called a birth plan). Not a rigid script — births rarely follow one — but a clear sense of what matters to you: pain relief options you'd like to try, the environment you want, who you'd like with you, what to do in different scenarios. Bring it to your 36-week appointment to talk through with your midwife. Flexibility is the point, not the prescription." },
  { q: "Is leaking colostrum at 34 weeks normal?",
    a: "Yes — many people leak small amounts of colostrum (a thick yellowish 'first milk') by now; some don't until much later, or not at all before birth. Both are normal and neither predicts breastfeeding success. Breast pads can help with stains. If you're planning to breastfeed, hand-expressing and storing colostrum from around 36 weeks is sometimes suggested for specific situations (e.g. gestational diabetes) — your midwife will advise. Don't stimulate the breasts before 36 weeks, as it can trigger contractions." },
  { q: "Why does my baby get hiccups so often?",
    a: "Fetal hiccups are very common at 34 weeks — many people feel them daily. They're a small, rhythmic pulsing in one spot of the bump, usually for a few minutes at a time. They're a sign of a maturing diaphragm and a baby practising for the breathing reflex outside, and they aren't anything to worry about. They are not the same as movement; you should still be aware of your baby's overall movement pattern separately." },
];

const FAQRow = ({ faq, defaultOpen = false }: { faq: { q: string; a: string }; defaultOpen?: boolean }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border/40 last:border-b-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-start gap-4 py-5 text-left group">
        <span className="flex-1 font-serif text-[1.05rem] md:text-[1.15rem] text-foreground group-hover:text-terracotta transition-colors leading-snug">{faq.q}</span>
        <span className="w-7 h-7 rounded-full bg-stage-pregnancy/40 flex items-center justify-center text-terracotta shrink-0 mt-1">
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
        <SectionLabel tone="terracotta">Common questions</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[1.95rem] md:text-[2.4rem] text-foreground leading-tight">Common questions at 34 weeks</h2>
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
      <div className="bg-gradient-to-br from-stage-pregnancy/30 via-parchment to-sage-bg rounded-3xl border border-border/30 p-8 sm:p-10 md:p-14 text-center shadow-card-brand">
        <SectionLabel tone="terracotta">Up next</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.5rem] text-foreground leading-tight mb-3">Ready for week 35?</h2>
        <p className="font-sans text-[14.5px] text-foreground/75 max-w-lg mx-auto mb-8 leading-[1.8]">
          Week 35 is the final stretch before the Week 36 milestone — labour-sign awareness sharpens,
          baby position is checked, and the body asks more every day.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
          <Link to="/pregnancy/week/35" className="inline-flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium shadow-cta hover:bg-terracotta-hover transition-colors">
            Continue to week 35 <ArrowRight size={14} />
          </Link>
          <Link to="/pregnancy/third-trimester" className="inline-flex items-center justify-center gap-2 border border-foreground/25 text-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium hover:bg-parchment-dark transition-colors">
            Explore the third trimester
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const Week34Page = () => (
  <div className="min-h-screen bg-parchment">
    <PregnancyWeekSeo weekNumber={34} />
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
    <FAQ />
    <Next />
    <Footer />
  </div>
);

export default Week34Page;
