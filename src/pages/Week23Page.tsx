import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ChevronLeft, ChevronRight, Sprout, HeartPulse, Activity, Sparkles, Calendar, BookOpen,
  ArrowRight, Check, AlertTriangle, Plus, Minus, Heart, MessageCircle, Leaf, Moon,
  ShieldCheck, Stethoscope, Wind, Soup, Brain, Eye, Sun, Hand, Apple, Droplet, Footprints,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import fetusImg from "@/assets/week23-fetus.jpg";
import mangoImg from "@/assets/week23-mango.jpg";
import biologyImg from "@/assets/week23-biology-detail.jpg";
import journalImg from "@/assets/journal-flatlay.jpg";
import botanicalTr from "@/assets/botanical-branch-tr.png";
import botanicalBl from "@/assets/botanical-branch-bl.png";
import botanicalAccent from "@/assets/article-botanical-accent.png";
import bodyImg from "@/assets/article-hero-second-body.jpg";
import movementImg from "@/assets/article-hero-second-movement.jpg";
import movementExImg from "@/assets/article-hero-second-movement-exercise.jpg";
import sleepImg from "@/assets/article-hero-second-sleep.jpg";
import anxietyImg from "@/assets/article-hero-second-anxiety.jpg";
import eatingImg from "@/assets/article-hero-second-eating.jpg";

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
          <span className="text-foreground">Week 23</span>
        </nav>

        <p className="font-sans text-[11px] font-semibold tracking-[0.3em] uppercase text-sage mb-5">
          Second trimester · Approaching the threshold
        </p>
        <h1 className="font-serif text-[2.5rem] sm:text-5xl md:text-[3.75rem] lg:text-[4.25rem] text-foreground leading-[1.04] tracking-tight mb-4 md:mb-5">
          23 Weeks Pregnant
        </h1>
        <p className="font-serif italic text-[1.05rem] sm:text-lg md:text-xl text-foreground/75 max-w-xl mx-auto leading-relaxed">
          Your baby is the size of a mango — about 29 cm head to heel, around 500 grams, the lungs beginning the long, quiet work of becoming ready to breathe air, your bump unmistakably yours and a quiet shift sitting just one week ahead.
        </p>
      </div>

      <Link to="/pregnancy/week/22" aria-label="Go to week 22" className="absolute left-3 sm:left-6 md:left-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronLeft size={18} />
      </Link>
      <Link to="/pregnancy/week/24" aria-label="Go to week 24" className="absolute right-3 sm:right-6 md:right-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronRight size={18} />
      </Link>
    </div>

    <div className="relative -mt-28 sm:-mt-36 md:-mt-40 mb-6">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex items-end justify-center gap-5 sm:gap-10 md:gap-14">
          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-card border-[3px] border-sage/15 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={mangoImg} alt="A ripe golden mango" loading="lazy" width={512} height={512} className="w-full h-full object-cover" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.04]" />
            </div>
            <div className="text-center">
              <p className="font-serif italic text-[12.5px] text-foreground/80 leading-tight">large mango</p>
              <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/55 mt-1">~29&nbsp;cm</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full bg-card border-[4px] border-sage/30 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={fetusImg} alt="Soft editorial illustration of a 23-week baby with proportional limbs, eyebrows and short eyelashes, lungs developing the surfactant-producing cells, vernix coating the skin in patches, fine lanugo hair, hand near the face, suspended in luminous amniotic fluid" width={1024} height={1024} loading="eager" decoding="async" className="w-full h-full object-cover scale-[1.02]" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.05]" />
            </div>
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.22em] uppercase text-foreground/65">Your baby this week</p>
          </div>

          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-sage-bg to-stage-pregnancy/40 border-[3px] border-sage/25 flex items-center justify-center shadow-elevated">
              <span className="font-serif text-[1.7rem] sm:text-[1.95rem] text-foreground tracking-tight leading-none">17</span>
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
  { id: "lungs", label: "Lungs & viability", Icon: Wind },
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
          <div className="w-11 h-11 rounded-full bg-sage-bg border border-sage/20 flex items-center justify-center shrink-0">
            <Leaf size={16} className="text-sage" />
          </div>
          <div className="min-w-0">
            <p className="font-sans text-[13px] font-medium text-foreground leading-snug">✔ Medically reviewed by Jenny Joines</p>
            <p className="font-sans text-[11.5px] font-normal text-foreground/60 mt-0.5">Updated for 2026 · 13 min read · Approaching the viability threshold</p>
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
  { label: "Stage", value: "Mid second trimester" },
  { label: "Baby size", value: "~29 cm — large mango" },
  { label: "Baby weight", value: "~500 g" },
  { label: "Trimester", value: "2 of 3 (week 23 of 27)" },
];

const AtAGlance = () => (
  <section id="at-a-glance" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl mb-14 md:mb-20">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 relative bg-gradient-to-br from-sage-bg/55 via-parchment to-stage-pregnancy/40 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-10 overflow-hidden shadow-card-brand">
        <img src={botanicalAccent} alt="" aria-hidden="true" className="absolute -left-3 bottom-0 w-28 opacity-35 pointer-events-none select-none" />
        <SectionLabel tone="sage">At a glance</SectionLabel>
        <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-5">
          Lungs starting to lay down surfactant, half a kilo of baby, and the threshold of viability sitting just one week away.
        </h2>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8] mb-4">
          Inside, your baby is around 29 cm head to heel and weighs roughly 500 grams — half a kilogram of small person.
          The lungs are entering a critical new phase: cells called type II pneumocytes are beginning to produce
          surfactant, the slippery substance that will let the air sacs hold open after birth. Skin is still wrinkled
          and pink, with vernix caseosa thickening in patches, and the face has refined further — eyebrows clearly
          drawn, eyelashes appearing, lips defined.
        </p>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8]">
          Outside, the bump sits a couple of finger-widths above the belly button. Movement is becoming more
          predictable and often visible from the outside. Week 23 has a particular quality — past halfway, past the
          anomaly scan, but with the symbolic threshold of viability (24 weeks in UK practice) still just ahead. The
          week before is its own kind of quiet count-down.
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
  { title: "Surfactant production begins in the lungs", body: "This is week 23's quiet headline. Specialised cells in the developing alveoli, called type II pneumocytes, are beginning to produce surfactant — a slippery, fat-and-protein mixture that coats the air sacs and stops them collapsing on themselves between breaths. It's the single most important physiological development of late pregnancy. There won't be enough of it to breathe air comfortably for many weeks yet, but the work has started." },
  { title: "Half a kilogram, lengthening proportions", body: "At around 500 g and 29 cm head to heel, your baby has crossed an important weight landmark. The legs are catching up to the torso in proportion. The face is filling out very slightly. There's almost no fat under the skin yet — that's the work of the next ten weeks — so the limbs still look slim and the skin still slightly translucent and wrinkly, with vernix collecting in patches across the back, joints and folds." },
  { title: "Inner ear, hearing, response to sound", body: "The inner ear is fully formed and functional. Your baby reliably hears your heartbeat, the rush of blood, your voice resonating through your chest, and louder sounds from the outside world — doors closing, music, traffic. Studies show babies of this age startle to sudden loud sounds and respond to familiar voices. Your voice is the most consistently present, and the developing brain is laying down the early traces of recognising it." },
  { title: "Sleep cycles, dreaming brain, daily rhythm", body: "Brain development is racing. The cerebral cortex is folding into its characteristic gyri and sulci. REM-like sleep cycles are now well established — 20 to 40 minute cycles of activity and quiet. Some research suggests this is when the foundations of dreaming begin. You'll start to notice your baby has busier and quieter stretches across the day, often most active in the evening when you finally sit still." },
];

const Biology = () => (
  <section id="biology" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="relative rounded-3xl overflow-hidden border border-border/40 shadow-card-brand">
            <div className="aspect-[4/5]">
              <img src={biologyImg} alt="Soft editorial close-up of a 23-week baby curled in the gestational sac, refined infant profile, eyebrows and short eyelashes visible, vernix coating the skin in patches, fine lanugo hair, hand holding the umbilical cord, suspended in luminous amniotic fluid" loading="lazy" width={1024} height={1280} className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-foreground/60 to-transparent">
              <p className="font-serif italic text-[13px] text-background/95 leading-snug">
                Twenty-nine centimetres. Lungs beginning to lay down surfactant. The week before the threshold.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <SectionLabel>What's underway biologically</SectionLabel>
          <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-5">
            A baby crossing the half-kilogram mark, with lungs quietly starting the work that makes breathing possible.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8] mb-8 max-w-2xl">
            Week 23 is the week the lungs start producing the substance that will, eventually, let air sacs hold
            open after birth. It isn't visible from the outside, but it's the most important developmental story
            sitting beneath this week.
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

const lungPoints = [
  { Icon: Wind, title: "What surfactant actually is", body: "Surfactant is a slippery mixture of phospholipids and proteins produced by type II pneumocyte cells lining the air sacs (alveoli) of the lungs. Its job is to lower the surface tension inside each tiny air sac so they don't collapse on themselves between breaths. Without enough surfactant, breathing air takes huge muscular effort and the lungs cannot efficiently exchange oxygen — which is why prematurity before adequate surfactant is so high-risk." },
  { Icon: Sprout, title: "Why week 24 is called the threshold", body: "In UK practice, 24 weeks is widely accepted as the threshold of viability — the gestational age from which active resuscitation and intensive neonatal care are usually offered. It isn't a magic switch (outcomes improve week by week from there), and there are now occasional survivors at 22 and 23 weeks with extraordinary intensive care. But 24 weeks is the standard line in UK guidance, and crossing it next week is, for many people, a quiet emotional milestone." },
  { Icon: Heart, title: "What this week feels like before that", body: "Sitting at 23 weeks, just before the threshold, has its own emotional weather. It can bring a quiet, almost superstitious holding of breath. Some people count down the days. Others find themselves more tearful, more aware. The wish to 'just get to 24 weeks' is incredibly common and entirely valid. It doesn't mean something is going wrong; it means you are paying attention to a real medical milestone." },
  { Icon: ShieldCheck, title: "What it doesn't change about your care", body: "Crossing 24 weeks doesn't suddenly change what your midwife asks you to watch for, or how to respond to bleeding, severe pain or reduced movement (always: phone). It does change how doctors would respond if you went into very early labour after that point. For now, your job is exactly the same as last week: keep going, eat well, sleep on your side, notice movement, and phone if anything feels wrong." },
];

const Lungs = () => (
  <section id="lungs" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel tone="sage">Lungs &amp; viability</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        The week the lungs start the work that makes air-breathing possible — and the threshold sits just ahead.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        Week 23 carries a particular quiet weight. Surfactant production is starting inside the lungs. The
        symbolic threshold of viability (24 weeks in UK practice) is one week away. Most people feel something
        shift, even if they can't name it.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {lungPoints.map(({ Icon, title, body }) => (
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
        <span className="font-semibold">A clear, sustained reduction in previously felt movement always needs a phone call to maternity triage</span>{" "}
        — at any stage of pregnancy, including this week, before formal kick-counting begins next week. Don't
        wait until tomorrow.
      </p>
    </div>
  </section>
);

const bodyNotes = [
  { Icon: Activity, title: "Fundus a few cm above the belly button", body: "By week 23 the top of the uterus (the fundus) sits roughly 23 cm above your pubic bone — which puts it a couple of finger-widths above the belly button for most people. Fundal height in centimetres tracks closely with weeks of pregnancy through the middle stretch. Your midwife will start measuring it routinely from week 24 onwards." },
  { Icon: Hand, title: "Posture, lower back, pelvic load", body: "The growing bump continues to shift your centre of gravity forward. Lower-back ache, hip discomfort and pubic-bone tenderness are very common. Sensible shoes, gentle stretching, walking, prenatal yoga, warm baths and (for some) a pregnancy support belt all help. Sharp, severe or one-sided pain is different and needs a midwife conversation." },
  { Icon: Moon, title: "Sleep needing proper kit by now", body: "Side-sleep is the default. From week 28 it's officially advised against falling asleep on your back. Build the habit now: a pillow between the knees, one supporting the bump, one behind the back — or a proper pregnancy pillow. Vivid dreams, frequent night-time weeing and restless legs are common and don't mean anything is wrong." },
  { Icon: Wind, title: "Heartburn and shortness of breath", body: "The rising uterus presses on the stomach and the diaphragm. Smaller meals, eating slowly, not lying flat for an hour after eating, sleeping slightly propped up. Gaviscon is safe. Mild breathlessness on stairs is normal — sudden severe breathlessness, or breathlessness with chest pain or rapid heartbeat, is not." },
  { Icon: Eye, title: "Skin: pigmentation, stretch marks, itching", body: "Linea nigra deepening down the centre of the belly. Possible melasma patches on the face — sun cream and a hat reduce it. Stretch marks beginning on the bump, breasts, hips, thighs or bottom. Sudden whole-body itching, especially hands and feet at night, is different and needs a same-day check for cholestasis." },
  { Icon: Sun, title: "Energy steadier, stamina shorter", body: "For most, energy at 23 weeks is reasonably steady but the available stamina is shorter — fine for the first stretch of the day, then a clear wall. Eat little and often, drink properly, get daylight, say yes to a 20-minute lie down. If energy is consistently flat, mention it — second-trimester anaemia is very common and easily checked." },
];

const Body = () => (
  <section id="body" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="max-w-2xl mb-10">
        <SectionLabel tone="terracotta">Your body this week</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
          Visibly pregnant, fundus above the belly button, sleep needing proper set-up.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
          Week 23 brings a fundus a few finger-widths above the belly button, posture changes, sleep that
          needs serious set-up, and the social weather of being unmistakably pregnant.
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
    Icon: Hand, name: "Stronger, more visible movement",
    feels: "Definite kicks from the same spot. Rolls across the bump. A flurry in the evening when you've sat still. The bump twitching visibly. A partner feeling something with a hand placed firmly on the lower bump.",
    why: "Stronger muscles, better coordination, a baby big enough that movements consistently reach the abdominal wall hard enough to feel from the outside.",
    normal: "Most people feel reliable movement by 23 weeks; anterior placentas can delay it slightly. Formal kick-counting begins next week. A clear sustained reduction in previously felt movement always needs a phone call to maternity triage.",
  },
  {
    Icon: Activity, name: "Lower-back & pelvic discomfort",
    feels: "A duller stretching ache in the lower back, hips or pubic bone, especially after standing or walking. Sometimes a sharper twinge when standing quickly or rolling over. Pressure low in the pelvis after being on your feet.",
    why: "Centre of gravity shifting forward and pelvic joints softening under pregnancy hormones, especially relaxin, to make room for birth.",
    normal: "Very common. Sensible shoes, gentle stretching, prenatal yoga and warm baths help. Severe pain, one-sided pain, or pain with bleeding or fever needs a midwife call.",
  },
  {
    Icon: Wind, name: "Heartburn — established",
    feels: "Burning behind the breastbone or in the throat after meals or lying down. Acid taste. A 'too full' feeling after small portions. Worse in the evening and at night.",
    why: "Progesterone relaxes the valve at the top of the stomach. The rising uterus presses the stomach upwards. Both let acid travel back up.",
    normal: "Very common from now to the end of pregnancy. Smaller meals, eating slowly, not lying flat for an hour after eating, sleeping slightly propped up. Gaviscon is safe.",
  },
  {
    Icon: Moon, name: "Vivid dreams & broken sleep",
    feels: "Strange, vivid, often baby-related dreams you remember in detail. Waking more often. Difficulty getting comfortable. Frequent night-time weeing. Restless legs in some.",
    why: "Hormonal changes affect sleep architecture. The growing bump makes positions awkward. Higher blood volume means kidneys process more fluid overnight.",
    normal: "Very common. Pillow between the knees, one supporting the bump, loo just before bed. Worsening insomnia or persistent low mood needs a midwife conversation.",
  },
  {
    Icon: Footprints, name: "Swelling in feet & ankles",
    feels: "Mild puffiness in the feet, ankles or hands by the end of the day. Shoes feeling tighter in the evening than in the morning. Rings starting to feel snug.",
    why: "Higher blood volume, hormonal effects on fluid retention, and gravity. Worse in heat, after long standing, late in the day.",
    normal: "Mild gradual swelling is normal. Sudden swelling in the face or hands, or one-sided leg swelling with pain, needs urgent assessment — pre-eclampsia or DVT.",
  },
  {
    Icon: Stethoscope, name: "Increased vaginal discharge",
    feels: "More white, milky, mild-smelling discharge than usual. Often noticeable enough to warrant a panty liner.",
    why: "Higher oestrogen and increased blood flow to the cervix and vaginal walls. Part of the body's protective barrier in pregnancy.",
    normal: "Very common. Itching, burning, a strong smell, green/yellow colour, or any blood needs a GP or midwife check — thrush and bacterial vaginosis are easily treated.",
  },
  {
    Icon: Droplet, name: "Stretch marks appearing or spreading",
    feels: "Soft pink, red or purple lines on the bump, breasts, hips, thighs or bottom. Sometimes mildly itchy as they form.",
    why: "Skin being stretched faster than its elastin can fully keep up with. Genetics is the strongest predictor.",
    normal: "Very common. Moisturisers soothe but don't really prevent. They fade to silvery lines after birth. Sudden whole-body itching, especially hands and feet at night, is different and needs a same-day midwife check for cholestasis.",
  },
  {
    Icon: Soup, name: "Real, sustained appetite & cravings",
    feels: "Genuine hunger between meals. Specific cravings, sometimes for things you didn't expect. Pleasure in foods you previously left.",
    why: "Your baby is growing fast, your blood volume continues to climb, and your body is working harder. About 300 extra calories a day for the second trimester.",
    normal: "Very common. Aim for protein at every meal, iron-rich foods, fruit, vegetables, dairy, whole grains. Cravings for non-food items (ice, chalk, soil) need a GP check — possible iron deficiency.",
  },
];

const Symptoms = () => (
  <section id="symptoms" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel>Common symptoms</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        What's likely to show up at week 23 — and what each one really means.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        Week 23 brings a familiar second-trimester cluster: stronger and more visible movement, established
        heartburn, broken sleep, mild swelling, stretch marks. Most are normal. A few are worth flagging.
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
        Read: the mid second-trimester body shift <ArrowRight size={13} />
      </Link>
    </div>
  </section>
);

const emotionalTruths = [
  "A quiet count-down to the threshold next week.",
  "Tearfulness arriving without warning, then passing.",
  "An almost superstitious wish to just get to 24 weeks.",
  "A new rooted-ness in the pregnancy that's hard to put into words.",
  "Body-image weather that comes and goes through the same day.",
  "Speaking to the baby out loud, often without meaning to.",
  "Seventeen more weeks. Both impossibly long and impossibly close.",
];

const Emotional = () => (
  <section id="emotional" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 relative bg-gradient-to-br from-lavender-bg via-parchment to-lavender-bg/40 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-9 shadow-card-brand overflow-hidden">
          <img src={botanicalAccent} alt="" aria-hidden="true" className="absolute right-0 top-0 w-24 opacity-35 pointer-events-none select-none" />
          <SectionLabel tone="lavender">Emotionally this week</SectionLabel>
          <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-4">
            A quiet count-down to the threshold — and a deeper rooted-ness in the pregnancy.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/80 leading-[1.8] mb-4">
            Week 23 sits in a particular emotional place. The threshold of viability is one week away. Most
            people feel something shift, even if they can't name it — a quieter, almost superstitious holding
            of breath, a heightened awareness of movement, a wish to just get to 24 weeks.
          </p>
          <p className="font-sans text-[14px] text-foreground/70 leading-[1.75]">
            None of this means something is going wrong. It means you are paying attention. The wish to get
            to next week is one of the most universal feelings of late mid-pregnancy, and it doesn't go away
            because someone tells you the chances are good.
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
  { Icon: Hand, title: "Get fluent with this baby's movement pattern", note: "Formal kick-counting begins at week 24, but use this week to learn this particular baby's pattern — when active, when quiet, what it usually feels like, how often. Sit somewhere quiet after a meal in the evening, hand on the bump, and just notice. The pattern you learn this week is what you'll be comparing against next week. A clear sustained reduction in previously felt movement always needs a phone call to maternity triage." },
  { Icon: Moon, title: "Make side-sleep genuinely comfortable", note: "From week 28 it's officially advised against falling asleep on your back. Build the habit at week 23, not 30 — much easier than scrambling for it later. The set-up that actually works for most: a pillow between the knees, one supporting the bump, one behind the back — or a proper pregnancy pillow (genuinely worth the spend for many people)." },
  { Icon: Apple, title: "Iron, calcium, hydration, protein", note: "Iron at most meals (red meat, beans, lentils, leafy greens, fortified cereals) paired with vitamin C for absorption. Calcium daily (dairy or fortified alternatives, tinned fish with bones, leafy greens). Protein at every meal. Hydrate properly. About 300 extra calories a day for the second trimester. If you feel persistently flat, mention it — second-trimester anaemia is very common and easily checked." },
  { Icon: Activity, title: "Pelvic floor exercises, daily, properly", note: "Daily pelvic floor exercises from now genuinely help with bladder control later in pregnancy and recovery after birth. Squeeze (as if stopping a wee), hold for a few seconds, release. Aim for around 10 long holds and 10 quick squeezes, twice a day. The NHS Squeezy app or a daily reminder makes it actually happen — without one, almost nobody does." },
  { Icon: Calendar, title: "Antenatal classes & maternity-leave plans", note: "Week 23 is a sensible time to commit to antenatal classes (NHS, NCT or community-based — they often book up months ahead, especially for popular dates) and to have the maternity-leave conversation with HR if you're employed. You don't have to commit to dates yet, but knowing the options early takes pressure off the third trimester." },
  { Icon: Sprout, title: "Start the practical short-list", note: "Pram or carrier. Car seat (legally required to leave hospital). Where the baby will sleep for the first six months — in your room, in a cot or Moses basket (official UK guidance, for safer sleep). Names, even just a starting list. None of this needs deciding now, but the conversations are easier started in week 23 than in week 36." },
];

const Focus = () => (
  <section id="focus" className="bg-sage-bg/35 py-16 md:py-24 border-y border-border/30">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <SectionLabel tone="sage">Focus this week</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.2rem] text-foreground leading-tight mb-4">
            Learn the movement pattern, sort the sleep set-up, eat well, and start the practical short-list.
          </h2>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8]">
            Week 23 is a settling-in week. Get fluent with this baby's pattern of movement before formal
            kick-counting begins next week. Make side-sleep comfortable. Eat for the second trimester. Start
            the practical conversations that take pressure off the months ahead.
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
  "A clear, sustained reduction in previously felt movement",
  "Heavy bright red bleeding, especially soaking a pad",
  "Severe one-sided or persistent abdominal pain",
  "Sudden severe headache, vision changes or upper-belly pain",
  "Sudden swelling in the face, hands or feet",
  "Burning, pain or blood when you wee (possible UTI)",
  "Whole-body itching, especially hands and feet at night",
  "Persistent fluid leaking from the vagina (possible waters)",
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
            Your midwife is your first point of contact. Your GP, NHS 111, your local hospital triage, or
            antenatal day unit are also good calls. In an emergency dial 999 or go straight to A&amp;E.
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
        Half a kilogram of small person, lungs quietly beginning the work that makes air-breathing possible, a threshold one week away. Week 23 has the particular hush of a count-down nobody quite says out loud.
      </p>
      <Heart size={14} className="text-sage/60 mx-auto mt-5" />
    </div>
  </section>
);

const reflectionPrompts = ["What I notice about this week", "How I feel about the threshold", "Something I want to say to the baby", "A small kindness for myself"];
const askChips = ["When does viability begin?", "How often should baby move now?", "Is back pain normal at 23 weeks?", "When do I start kick-counting?", "Is mild swelling normal?"];

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
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.24em] uppercase text-sage">Ask about week 23</p>
            <h3 className="font-serif text-[1.3rem] sm:text-[1.35rem] text-foreground mt-0.5 leading-snug">A question on your mind?</h3>
          </div>
        </div>
        <p className="font-sans text-[13px] text-foreground/70 leading-relaxed mb-4">Get a calm, evidence-led answer tailored to where you are right now.</p>
        <input type="text" placeholder="e.g. What does the threshold of viability really mean?" className="w-full bg-parchment/80 border border-border/40 rounded-full px-5 py-3.5 font-sans text-[13.5px] text-foreground placeholder:text-foreground/45 focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/30 transition-all" />
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
            The week before the threshold deserves a page.
          </h3>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8] mb-6">
            The quiet count-down. The wish to just get to 24 weeks. The specific hope or fear sitting under
            this week. The journal holds the small, invisible turning points of becoming a parent — the ones
            nobody warns you matter.
          </p>
          <ul className="space-y-2.5 mb-7">
            {["A page for the week before the threshold", "Letters to your baby through every week", "Guided pages all the way to birth"].map((line) => (
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
  { slug: "second-trimester-movement", img: movementImg, tag: "Movement",
    title: "What baby movements really feel like — and when others can feel them",
    desc: "From first flutters to visible kicks: what changes between weeks 18 and 24, and how to share the bump with a partner." },
  { slug: "second-trimester-body", img: bodyImg, tag: "Body",
    title: "The mid second-trimester body shift",
    desc: "Bump fully visible, posture changing, fundus measurable — what to expect physically as the body settles into the middle stretch." },
  { slug: "second-trimester-sleep", img: sleepImg, tag: "Sleep",
    title: "Setting up your sleep for the months ahead",
    desc: "Why side-sleeping matters, the set-up that makes it comfortable, and how to build the habit before you need it." },
  { slug: "second-trimester-movement-exercise", img: movementExImg, tag: "Movement",
    title: "Moving your body in the second trimester",
    desc: "What's safe, what helps, and how to use the energy lift while it's here. The simple rules for walking, yoga, swimming and strength." },
  { slug: "second-trimester-eating", img: eatingImg, tag: "Nutrition",
    title: "Eating well in the second trimester",
    desc: "Iron, calcium, protein, hydration — the second-trimester triangle, and how to handle real cravings without overthinking." },
  { slug: "second-trimester-anxiety", img: anxietyImg, tag: "Mind",
    title: "Holding the count-down to viability",
    desc: "Why the week before 24 weeks brings a particular kind of quiet, and how to be gentle with yourself through it." },
];

const Related = () => (
  <section id="guidance" className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div className="max-w-xl">
          <SectionLabel>Read next, because of week 23</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.4rem] text-foreground leading-tight">
            Curated guidance for the week before the threshold.
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
  { q: "What does the threshold of viability actually mean?",
    a: "In UK practice, 24 weeks is widely accepted as the threshold of viability — the gestational age from which active resuscitation and intensive neonatal care are usually offered if a baby were born. It isn't a magic switch. Survival and outcomes improve week by week from there, and there are now occasional survivors at 22 and 23 weeks with extraordinary intensive care. But 24 weeks is the established line in UK guidance, and crossing it next week is, for most people, a quiet emotional milestone rather than a medical one. It doesn't change the day-to-day work of pregnancy — eat well, sleep on your side, notice movement, phone if anything feels wrong." },
  { q: "Why is week 23 such an emotional week for so many people?",
    a: "Because of the threshold sitting one week away. Week 23 has a particular quality — past halfway, past the anomaly scan, with the symbolic line of viability just ahead but not yet crossed. Many people describe it as a quiet count-down, an almost superstitious holding of breath, a wish to just get to 24 weeks. Tearfulness arrives without warning. Movement gets watched more closely. None of this means something is going wrong; it means you are paying attention to a real medical milestone, and your nervous system knows it." },
  { q: "What is surfactant and why does it matter?",
    a: "Surfactant is a slippery mixture of phospholipids and proteins produced by specialised cells (called type II pneumocytes) lining the air sacs (alveoli) of the lungs. Its job is to lower surface tension inside each tiny air sac so they don't collapse on themselves between breaths. Without enough surfactant, breathing air takes huge muscular effort and the lungs cannot exchange oxygen efficiently — which is the central reason early prematurity is so high-risk. Production starts around week 23 and continues, building gradually, all the way to about 36 weeks. It's the single most important developmental story of the rest of pregnancy." },
  { q: "How often should the baby be moving at 23 weeks?",
    a: "There isn't yet a specific number to count to — formal kick-counting starts at week 24. At 23 weeks the work is to learn this baby's particular pattern: when they tend to be active (often after meals, in the evening when you sit down), how it feels (rolls, pokes, flurries, sometimes visible twitches), and how it changes across the day. The single rule that always applies, at any week of pregnancy: a clear, sustained reduction in previously felt movement always needs a phone call to maternity triage. Don't wait until tomorrow." },
  { q: "Is mild swelling in my feet and ankles normal?",
    a: "Yes — gradual mild swelling in the feet, ankles and sometimes the hands is very common from now to the end of pregnancy. It's caused by higher blood volume, hormonal effects on fluid retention, and gravity. It's worse in the heat, after a long day on your feet, and in the evening. Things that help: putting your feet up when you sit, gentle walking, drinking properly (counter-intuitive but true), avoiding standing still for long stretches. Sudden swelling — especially in the face or hands — or sudden one-sided leg swelling with pain is different and needs urgent assessment for pre-eclampsia or DVT respectively." },
  { q: "When will my partner be able to feel the baby kick?",
    a: "For most pregnancies, partners can feel a definite kick from the outside somewhere between weeks 22 and 26 — depending on placenta position, body composition, and how cooperative the baby is on a given day. The best set-up: you sit or lie still in the evening (often the most active time), preferably after eating. Your partner places a firm, flat hand on the lower bump for at least a minute or two without moving. Many people get the first felt kick this way at 22–24 weeks. If it hasn't happened yet, it almost certainly will in the next few weeks." },
  { q: "Should I be doing anything specific to help the lungs develop?",
    a: "There's nothing extra you need to do. Lung development happens on its own internal timeline, driven by your baby's own genetics and physiology. The things that support all of pregnancy — eating well, taking your prenatal vitamin (which contains folic acid and vitamin D), staying hydrated, getting enough rest, not smoking, not drinking, keeping vaccinations up to date (especially flu and whooping cough at the right times), going to your appointments — are also what supports the lungs. There's nothing you can eat or do that will speed surfactant production. Just keep going." },
  { q: "Is it safe to fly at 23 weeks?",
    a: "Generally yes for an uncomplicated pregnancy. Most airlines allow flying without restriction up to about 28 weeks, with a doctor's letter required for many between weeks 28 and 36, and no flying after about week 36 for most carriers (sometimes 32 weeks for long-haul). Practical tips: stay well hydrated, walk the aisle every hour or so to reduce DVT risk, wear flight socks, request an aisle seat. Check your travel insurance covers pregnancy. Avoid travel to areas with active Zika virus or where medical care would be limited if something happened. Always check with your midwife if you have any pregnancy complications." },
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
        <h2 className="font-serif text-[1.85rem] sm:text-[1.95rem] md:text-[2.4rem] text-foreground leading-tight">Common questions at 23 weeks</h2>
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
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.5rem] text-foreground leading-tight mb-3">Ready for week 24?</h2>
        <p className="font-sans text-[14.5px] text-foreground/75 max-w-lg mx-auto mb-8 leading-[1.8]">
          Week 24 brings the threshold of viability in UK practice — a quiet but real shift in how the medical
          world thinks about your baby — and the start of formal kick-counting.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
          <Link to="/pregnancy/week/24" className="inline-flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium shadow-cta hover:bg-terracotta-hover transition-colors">
            Continue to week 24 <ArrowRight size={14} />
          </Link>
          <Link to="/pregnancy/second-trimester" className="inline-flex items-center justify-center gap-2 border border-foreground/25 text-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium hover:bg-parchment-dark transition-colors">
            Explore the second trimester
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const Week23Page = () => (
  <div className="min-h-screen bg-parchment">
    <Navbar />
    <Hero />
    <MetaBar />
    <AtAGlance />
    <Biology />
    <Lungs />
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

export default Week23Page;
