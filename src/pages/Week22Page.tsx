import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ChevronLeft, ChevronRight, Sprout, HeartPulse, Activity, Sparkles, Calendar, BookOpen,
  ArrowRight, Check, AlertTriangle, Plus, Minus, Heart, MessageCircle, Leaf, Moon,
  ShieldCheck, Stethoscope, Wind, Soup, Brain, Eye, Sun, Hand, Apple, Droplet, Footprints,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PregnancyWeekSeo from "@/components/seo/PregnancyWeekSeo";
import PublicWeekReflectionAsk from "@/components/pregnancy/PublicWeekReflectionAsk";
import fetusImg from "@/assets/week22-fetus.jpg";
import squashImg from "@/assets/week22-spaghettisquash.jpg";
import biologyImg from "@/assets/week22-biology-detail.jpg";
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
import WeekCommonQuestions from "@/components/week/WeekCommonQuestions";
import WeekSources from "@/components/week/WeekSources";
import { buildWeekQuestions, getWeekSources } from "@/data/weekSupportContent";

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

      <div className="container mx-auto px-14 sm:px-16 md:px-10 max-w-5xl relative z-10 text-center">
        <nav aria-label="breadcrumb" className="flex items-center justify-center gap-2 mb-6 sm:mb-7 font-sans text-[12px] font-normal text-foreground/65">
          <Link to="/pregnancy" className="hover:text-foreground transition-colors">Pregnancy</Link>
          <span className="text-foreground/30">›</span>
          <Link to="/pregnancy/second-trimester" className="hover:text-foreground transition-colors">Week by week</Link>
          <span className="text-foreground/30">›</span>
          <span className="text-foreground">Week 22</span>
        </nav>

        <p className="font-sans text-[11px] font-semibold tracking-[0.3em] uppercase text-sage mb-5">
          Second trimester · The middle stretch begins
        </p>
        <h1 className="font-serif text-[2.5rem] sm:text-5xl md:text-[3.75rem] lg:text-[4.25rem] text-foreground leading-[1.04] tracking-tight mb-4 md:mb-5">
          22 Weeks Pregnant
        </h1>
        <p className="font-serif italic text-[1.05rem] sm:text-lg md:text-xl text-foreground/75 max-w-xl mx-auto leading-relaxed">
          Your baby is the size of a spaghetti squash — about 28 cm head to heel, 430 grams, kicks beginning to be visible from the outside, eyelashes appearing, the world hearing your voice as the most familiar sound. The middle stretch of pregnancy starts to feel like an ongoing rhythm rather than a series of landmarks.
        </p>
      </div>

      <Link to="/pregnancy/week/21" aria-label="Go to week 21" className="absolute left-3 sm:left-6 md:left-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronLeft size={18} />
      </Link>
      <Link to="/pregnancy/week/23" aria-label="Go to week 23" className="absolute right-3 sm:right-6 md:right-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronRight size={18} />
      </Link>
    </div>

    <div className="relative -mt-28 sm:-mt-36 md:-mt-40 mb-6">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex items-end justify-center gap-5 sm:gap-10 md:gap-14">
          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-card border-[3px] border-sage/15 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={squashImg} alt="A pale yellow spaghetti squash" loading="lazy" width={512} height={512} className="w-full h-full object-cover" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.04]" />
            </div>
            <div className="text-center">
              <p className="font-serif italic text-[12.5px] text-foreground/80 leading-tight">spaghetti squash</p>
              <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/55 mt-1">~28&nbsp;cm</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full bg-card border-[4px] border-sage/30 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={fetusImg} alt="Soft editorial illustration of a 22-week baby with proportional limbs, eyebrows and eyelashes visible, vernix coating the skin, fine lanugo hair, hand near the face, fingernails defined, gently floating in the gestational sac" width={1024} height={1024} loading="eager" decoding="async" className="w-full h-full object-cover scale-[1.02]" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.05]" />
            </div>
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.22em] uppercase text-foreground/65">Your baby this week</p>
          </div>

          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-sage-bg to-stage-pregnancy/40 border-[3px] border-sage/25 flex items-center justify-center shadow-elevated">
              <span className="font-serif text-[1.7rem] sm:text-[1.95rem] text-foreground tracking-tight leading-none">18</span>
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
  { id: "movement", label: "Movement & senses", Icon: Hand },
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
            <p className="font-sans text-[11.5px] font-normal text-foreground/60 mt-0.5">Updated for 2026 · 13 min read · The middle stretch of pregnancy</p>
          </div>
        </div>
        <nav aria-label="On this page" className="flex-1 pt-4 lg:pt-0">
          <div className="flex gap-x-1 gap-y-2 overflow-x-auto lg:flex-wrap scrollbar-hide -mx-1 px-1">
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
  { label: "Baby size", value: "~28 cm — spaghetti squash" },
  { label: "Baby weight", value: "~430 g" },
  { label: "Trimester", value: "2 of 3 (week 22 of 27)" },
];

const AtAGlance = () => (
  <section id="at-a-glance" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl mb-14 md:mb-20">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 relative bg-gradient-to-br from-sage-bg/55 via-parchment to-stage-pregnancy/40 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-10 overflow-hidden shadow-card-brand">
        <img src={botanicalAccent} alt="" aria-hidden="true" className="absolute -left-3 bottom-0 w-28 opacity-35 pointer-events-none select-none" />
        <SectionLabel tone="sage">At a glance</SectionLabel>
        <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-5">
          The middle stretch — kicks visible from outside, eyelashes appearing, the bump unmistakably yours.
        </h2>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8] mb-4">
          Inside, your baby is around 28 cm head to heel and weighs roughly 430 grams. Eyelashes and
          eyebrows are filling in. The lips are well-defined. Tiny tooth buds are forming under the gums.
          Pancreatic cells are starting to produce insulin. The inner ear is now mature enough for proper
          balance — your baby can sense which way is up. Your voice is the most consistent sound in their
          world, and they are starting to recognise it.
        </p>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8]">
          Outside, the bump is unmistakably visible. Movement is becoming stronger and, for many, visible
          on the surface of the abdomen — a soft poke through fabric, a partner finally feeling something
          for the first time. People on the street and at work begin to notice. The middle stretch of
          pregnancy starts to feel like an ongoing rhythm rather than a series of milestones.
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
  { title: "Eyelashes, eyebrows, defined lips", body: "By week 22 the face is unmistakably a baby's face: eyebrows penciled in, eyelashes appearing along the still-fused eyelids, a defined Cupid's bow on the upper lip, distinct nostrils, ears in their final position on the head. The features look more proportionally human and less alien than even a few weeks ago. On 4D scans from now, faces are recognisably faces." },
  { title: "Tooth buds & the start of insulin", body: "Tiny tooth buds for both the milk teeth (now) and adult teeth (deeper, slowly forming) are present under the gums. The pancreas is starting to produce insulin — a quiet but important shift, the beginnings of independent blood-sugar regulation. Bone marrow is now the main producer of red blood cells, taking over from the liver and spleen which had been doing the job earlier." },
  { title: "Inner ear mature, balance and hearing improving", body: "The inner ear has reached the point where it can sense gravity properly — your baby now has a sense of which way is up, which way is down, and reacts when you change position. Hearing is more refined: heartbeats, blood flow, voices muffled through tissue and fluid. Your voice is the most consistently present sound, and your baby's developing brain is beginning to recognise it." },
  { title: "Stronger, more visible movement", body: "Muscles are stronger, coordination better, and your baby is bigger relative to the available space — so kicks, punches, rolls and somersaults reach the abdominal wall hard enough to be felt much more reliably. From this week onwards, many people start to see the bump twitch from the outside, and partners can often feel a kick with a hand placed firmly on the bump for a minute or two." },
];

const Biology = () => (
  <section id="biology" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="relative rounded-3xl overflow-hidden border border-border/40 shadow-card-brand">
            <div className="aspect-[4/5]">
              <img src={biologyImg} alt="Soft editorial close-up of a 22-week baby curled in the gestational sac, refined infant profile, eyebrows and eyelashes visible, vernix coating the skin in patches, fine lanugo hair, hand near the face holding the umbilical cord, suspended in luminous fluid" loading="lazy" width={1024} height={1280} className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-foreground/60 to-transparent">
              <p className="font-serif italic text-[13px] text-background/95 leading-snug">
                Twenty-eight centimetres. Eyelashes appearing. The week kicks become visible from the outside.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <SectionLabel>What's underway biologically</SectionLabel>
          <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-5">
            A baby being refined, listening, and pressing on the abdominal wall hard enough to be seen.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8] mb-8 max-w-2xl">
            Week 22 is when the small details arrive — eyelashes, tooth buds, insulin, balance — and
            when movement crosses a quiet threshold from felt-sometimes to felt-often, and starts to
            be visible from the outside for the first time.
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

const movementPoints = [
  { Icon: Hand, title: "Kicks visible from the outside", body: "From around week 22, many people see the bump visibly twitch when the baby kicks — a soft poke through clothing, a small ripple under the skin while you're sitting still. It often happens in the evening or after eating, when you're quiet and the baby is active. Partners can often feel a kick for the first time this week, with a hand placed firmly on the lower bump for a minute or two." },
  { Icon: Brain, title: "Your voice as the most familiar sound", body: "Hearing has been developing for weeks, but at 22 weeks the sounds your baby hears most consistently are those that come from inside your body — your heartbeat, the rush of blood, your voice resonating through your chest. Your voice is the single most familiar sound in their world, and the developing brain is beginning to recognise it. Talking, reading, singing — all of it lands." },
  { Icon: Footprints, title: "Sleep cycles, active windows, daily rhythm", body: "Your baby is now sleeping in distinct cycles of around 20–40 minutes, with active windows between. You'll notice quieter stretches and busier ones across the day, often more active in the evening when you finally sit down. This is normal and one of the first ways you start to learn this particular baby's pattern — a foundation for the formal kick-counting that begins at week 24." },
  { Icon: Heart, title: "When to phone, even now", body: "Formal kick-counting starts at week 24, not yet — the pattern at 22 weeks isn't established enough to be reliable. But the rule that always applies, at any week of pregnancy: if you've been feeling regular movement and notice a clear, sustained reduction, phone maternity triage straight away. Don't wait, don't drink cold water and hope, don't see if it picks up tomorrow. Phone today." },
];

const Movement = () => (
  <section id="movement" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel tone="sage">Movement & senses</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        The week movement becomes visible — and your voice becomes the most familiar sound in the world.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        Week 22 is when many people first see the bump twitch from the outside, when partners often
        feel a kick for the first time, and when a daily rhythm of active and quiet stretches starts
        to emerge. Formal kick-counting begins at week 24; this week is for noticing.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {movementPoints.map(({ Icon, title, body }) => (
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
        <span className="font-semibold">Even before formal kick-counting starts at 24 weeks: a clear, sustained reduction in previously felt movement always needs a phone call.</span>{" "}
        At any stage of pregnancy. To maternity triage, not to a pregnancy app. Don't wait until tomorrow,
        don't try to wake the baby with cold drinks. Phone today.
      </p>
    </div>
  </section>
);

const bodyNotes = [
  { Icon: Activity, title: "Bump fully visible, fundus around 22 cm", body: "The bump is now unmistakably a pregnancy bump rather than a softer middle, and the fundus (top of the uterus) is sitting roughly 22 cm above your pubic bone — fundal height in cm tends to track with weeks of pregnancy through the middle stretch. Your midwife measures this at every appointment from week 24 onwards, sometimes earlier." },
  { Icon: Hand, title: "Posture shift & lower-back pressure", body: "The growing uterus shifts your centre of gravity forward, which makes the lower back work harder to keep you upright. Mild aching in the lower back, hips and pubic bone is very common from now. Sensible shoes, gentle stretching, walking, prenatal yoga, warm baths and (for some) a pregnancy support belt all help. Sharp, severe or one-sided pain is different and needs a midwife conversation." },
  { Icon: Moon, title: "Sleep getting properly disrupted", body: "Side-sleep is the default. From week 28 it's officially advised against falling asleep on your back. A pillow between the knees, one supporting the bump, one behind the back — or a proper pregnancy pillow. Vivid dreams. Frequent night-time weeing. Restless legs. Mild snoring. None of it means anything is wrong." },
  { Icon: Wind, title: "Heartburn established, breathlessness on stairs", body: "The rising uterus is pressing on the stomach and the diaphragm. Smaller meals, eating slowly, not lying flat for an hour after eating, sleeping slightly propped up. Gaviscon is safe. Mild breathlessness on stairs or hills is normal — sudden severe breathlessness, or breathlessness with chest pain or rapid heartbeat, is not." },
  { Icon: Eye, title: "Pigmentation, melasma, stretch marks", body: "Linea nigra deepening down the centre of the belly. Possible patches of melasma (chloasma) on the cheeks, forehead or upper lip — sun cream and a hat reduce it. Darker areolas, darker freckles, darker scars. Stretch marks beginning on the bump, breasts, hips, thighs or bottom — soft pink, red or purple lines, fading to silvery in the months after birth." },
  { Icon: Sun, title: "Energy more even, but stamina shorter", body: "For most, energy is reasonably steady at 22 weeks but the available stamina is shorter — you'll be fine for the first stretch of the day and then suddenly very ready to sit down. Eat little and often, drink properly, get daylight, say yes to a 20-minute lie down. If energy is consistently flat, mention it — second-trimester anaemia is very common and easily checked." },
];

const Body = () => (
  <section id="body" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="max-w-2xl mb-10">
        <SectionLabel tone="terracotta">Your body this week</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
          Visibly pregnant, posture shifting, sleep needing proper kit — and a body the world starts to notice.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
          Week 22 brings a fully visible bump, posture changes, sleep that needs serious set-up, and
          the social shift of being unmistakably pregnant — which can be lovely, exposing, awkward,
          tender, or all four in the same day.
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
    feels: "A definite kick from the same spot. A roll across the bump after eating. A flurry in the evening when you've sat still for an hour. The bump twitching visibly under your hand. A partner feeling something for the first time.",
    why: "Stronger muscles, better coordination, a baby big enough that movements consistently reach the abdominal wall hard enough to feel — and to be visible from the outside.",
    normal: "Most people feel reliable movement by 22 weeks; anterior placentas can delay it to 22–24. Formal kick-counting starts at week 24. A clear sustained reduction in previously felt movement always needs a phone call to maternity triage.",
  },
  {
    Icon: Activity, name: "Lower-back pain & pelvic pressure",
    feels: "A duller stretching ache in the lower back, hips or pubic bone, especially after standing or walking. Sometimes a sharper twinge when you stand quickly or roll over. Pressure low in the pelvis when you've been on your feet.",
    why: "Your centre of gravity is shifting forward, the lower back is working harder, and the pelvic joints are softening under pregnancy hormones to make room for birth.",
    normal: "Very common. Sensible shoes, gentle stretching, prenatal yoga, warm baths help. Severe pain, one-sided pain, pain with bleeding or fever needs a midwife call.",
  },
  {
    Icon: Wind, name: "Heartburn — established now",
    feels: "Burning behind the breastbone or in the throat after meals or lying down. Acid taste. A 'too full' feeling after small portions. Worse in the evening and at night.",
    why: "Progesterone relaxes the valve at the top of the stomach. The rising uterus presses the stomach upwards. Both let acid travel back up the oesophagus more easily.",
    normal: "Very common from now to the end of pregnancy. Smaller meals, eating slowly, not lying flat for an hour after eating, sleeping slightly propped up. Gaviscon is safe; ask your midwife or pharmacist.",
  },
  {
    Icon: Moon, name: "Vivid dreams & broken sleep",
    feels: "Strange, vivid, often baby-related dreams you remember in detail. Waking more often. Difficulty getting comfortable. Frequent nighttime weeing. Restless legs in some.",
    why: "Hormonal changes affect sleep architecture. The growing bump makes positions awkward. Higher blood volume means kidneys process more fluid overnight. Iron levels affect restless legs.",
    normal: "Very common. Pillow between the knees, one supporting the bump, loo just before bed. Worsening insomnia or persistent low mood needs a midwife conversation.",
  },
  {
    Icon: Brain, name: "Visible-pregnancy social weather",
    feels: "Strangers smiling at the bump on the street. Comments at work. Hands reaching out to touch without asking. Awkward small talk about due dates and names. Surprise at how exposed it feels — or how lovely.",
    why: "The bump has crossed the threshold from softer middle to obvious pregnancy, and other people respond to it. Some of that response is warm; some of it is intrusive; you don't owe any of it.",
    normal: "Very common, mixed reactions, all valid. You're allowed to ask people not to touch the bump. You're allowed not to want to talk about names. The pregnancy is yours.",
  },
  {
    Icon: Stethoscope, name: "Increased vaginal discharge",
    feels: "More white, milky, mild-smelling discharge than usual. Often noticeable enough to warrant a panty liner.",
    why: "Higher oestrogen and increased blood flow to the cervix and vaginal walls. Part of the body's protective barrier in pregnancy.",
    normal: "Very common. Itching, burning, a strong smell, green/yellow colour, or any blood needs a GP or midwife check — thrush and bacterial vaginosis are easily treated.",
  },
  {
    Icon: Droplet, name: "Stretch marks appearing or spreading",
    feels: "Soft pink, red or purple lines on the bump, breasts, hips, thighs or bottom. Sometimes mildly itchy as they form. More visible in the evening or after a warm shower.",
    why: "Skin being stretched faster than its elastin can fully keep up with. Genetics is the strongest predictor.",
    normal: "Very common. Moisturisers soothe but don't really prevent. They fade to silvery lines after birth. Sudden whole-body itching, especially hands and feet at night, is different and needs a same-day midwife or GP check for cholestasis.",
  },
  {
    Icon: Soup, name: "Real, sustained appetite & cravings",
    feels: "Genuine hunger between meals. Specific cravings, sometimes for things you didn't expect. Pleasure in foods you previously left.",
    why: "Your baby is growing fast, your blood volume continues to climb, and your body is working harder. About 300 extra calories a day is the rough guide for the second trimester.",
    normal: "Very common. Aim for protein at every meal, iron-rich foods, fruit, vegetables, dairy, whole grains. Cravings for non-food items (ice, chalk, soil) need a GP check — they can signal iron deficiency.",
  },
];

const Symptoms = () => (
  <section id="symptoms" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel>Common symptoms</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        What's likely to show up at week 22 — and what each one really means.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        Week 22 brings a particular cluster: stronger and more visible movement, established heartburn,
        broken sleep, the first real stretch marks, and the social weather of being unmistakably
        pregnant. Most are normal. Some are worth flagging.
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
      <Link to="/articles/second-trimester-complete-guide" className="inline-flex items-center gap-2 font-sans text-[13.5px] font-medium text-sage hover:gap-3 transition-all">
        Read: the mid second-trimester body shift <ArrowRight size={13} />
      </Link>
    </div>
  </section>
);

const emotionalTruths = [
  "A new awareness of being looked at, in good and complicated ways.",
  "The first time a partner feels a kick — and the small, surprising tenderness of that.",
  "A growing sense that this is really, undeniably happening.",
  "Speaking to the baby out loud, and being slightly devastated by your own voice.",
  "A quieter confidence than the early weeks — less euphoric, more rooted.",
  "Body-image weather that arrives without warning, then passes.",
  "Eighteen more weeks. Both impossibly long and impossibly close.",
];

const Emotional = () => (
  <section id="emotional" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 relative bg-gradient-to-br from-lavender-bg via-parchment to-lavender-bg/40 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-9 shadow-card-brand overflow-hidden">
          <img src={botanicalAccent} alt="" aria-hidden="true" className="absolute right-0 top-0 w-24 opacity-35 pointer-events-none select-none" />
          <SectionLabel tone="lavender">Emotionally this week</SectionLabel>
          <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-4">
            More embodied, more visible, more rooted — and more socially exposed.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/80 leading-[1.8] mb-4">
            Week 22 sits in a particular emotional place — past the scan, past the halfway line, with
            a body the world clearly sees as pregnant and a baby that's becoming a felt presence rather
            than an abstract one. There's a quieter confidence than the early weeks; less euphoric,
            more rooted.
          </p>
          <p className="font-sans text-[14px] text-foreground/70 leading-[1.75]">
            Body-image weather can arrive without warning. So can a wave of unexpected tenderness when
            a partner feels a kick. So can mild irritation at strangers commenting on the bump. All of
            it is normal middle-pregnancy weather. None of it is a sign that something is wrong.
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
  { Icon: Hand, title: "Notice movement, share it gently", note: "Use this week to learn this baby's pattern — when active, how it feels, how often. Don't track yet (formal kick-counting starts at week 24). If you have a partner, see if they can feel a kick by placing a firm hand on the lower bump for a minute or two while you're sitting still in the evening. Visible kicks through clothing often start this week. A clear sustained reduction in previously felt movement always needs a phone call to maternity triage." },
  { Icon: Moon, title: "Get the side-sleep set-up sorted properly", note: "From around week 28, official UK advice is to fall asleep on your side. The set-up that makes it actually comfortable: a pillow between the knees, one supporting the bump, one behind the back — or a proper pregnancy pillow (genuinely worth the spend for many people). Build the habit at week 22, not 30 — it's much easier than scrambling for it later, when you're bigger and more uncomfortable." },
  { Icon: Apple, title: "Iron, calcium, hydration — the second-trimester triangle", note: "Iron at most meals (red meat, beans, lentils, leafy greens, fortified cereals) paired with vitamin C for absorption. Calcium daily (dairy or fortified alternatives, tinned fish with bones, leafy greens). Hydrate properly — heartburn, constipation, headaches and stretch marks all worsen with dehydration. About 300 extra calories a day for the second trimester." },
  { Icon: Activity, title: "Pelvic floor exercises, daily, properly", note: "Daily pelvic floor exercises from now genuinely help with bladder control later in pregnancy and recovery after birth. Squeeze (as if stopping a wee), hold for a few seconds, release. Aim for around 10 long holds and 10 quick squeezes, twice a day. The NHS Squeezy app or a daily reminder makes it actually happen — without one, almost nobody does." },
  { Icon: Calendar, title: "Antenatal classes & maternity-leave plans", note: "Week 22 is a sensible time to commit to antenatal classes (NHS, NCT or community-based — they often book up months ahead, especially for popular dates) and to have the maternity-leave conversation with HR if you're employed. You don't have to commit to dates yet, but knowing the options early takes pressure off the middle of the third trimester." },
  { Icon: Sprout, title: "Start the practical conversations", note: "The pram or carrier conversation. The car seat (legally required to leave hospital). Where the baby will sleep for the first six months (in your room, in a cot or Moses basket — official UK guidance, for safer sleep). Names, even if just a starting list. None of this needs deciding now, but the conversations are easier started in week 22 than in week 36." },
];

const Focus = () => (
  <section id="focus" className="bg-sage-bg/35 py-16 md:py-24 border-y border-border/30">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <SectionLabel tone="sage">Focus this week</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.2rem] text-foreground leading-tight mb-4">
            Notice movement, set up sleep, eat well, start the practical conversations.
          </h2>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8]">
            Week 22 is a settling-in week. Notice the pattern of movement and let a partner feel a kick.
            Get the sleep set-up sorted before you need it. Eat for the second trimester. Start the
            practical conversations that take pressure off the months ahead.
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
        Twenty-eight centimetres of small person, kicking hard enough to be seen, listening for your voice through fluid and tissue and time. The middle stretch of pregnancy starts to feel less like a series of milestones and more like a daily, ordinary, undeniable rhythm.
      </p>
      <Heart size={14} className="text-sage/60 mx-auto mt-5" />
    </div>
  </section>
);

const reflectionPrompts = ["What movement is teaching me", "How being visibly pregnant feels", "Something I want to say to the baby", "A small kindness I could give myself"];
const askChips = ["When can my partner feel a kick?", "How often should the baby move now?", "Is back pain normal at 22 weeks?", "When do I start kick-counting?", "How do I tell people not to touch the bump?"];

const ReflectionAsk = () => (
  <PublicWeekReflectionAsk
    week={22}
    reflectionPrompts={reflectionPrompts}
    askChips={askChips}
  />
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
            The week the kicks become visible deserves a page.
          </h3>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8] mb-6">
            The first time your partner felt a kick. The night you first saw the bump twitch. The thing
            you said to your baby when no one was listening. The journal holds the small, invisible
            turning points of becoming a parent — the ones nobody warns you matter.
          </p>
          <ul className="space-y-2.5 mb-7">
            {["A page for the week kicks become visible", "Letters to your baby through every week", "Guided pages all the way to birth"].map((line) => (
              <li key={line} className="flex items-start gap-2.5">
                <Check size={13} className="text-sage mt-1 shrink-0" />
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
  { slug: "baby-movement-in-pregnancy", img: movementImg, tag: "Movement",
    title: "What baby movements really feel like — and when others can feel them",
    desc: "From first flutters to visible kicks: what changes between weeks 18 and 24, and how to share the bump with a partner." },
  { slug: "second-trimester-complete-guide", img: bodyImg, tag: "Body",
    title: "The mid second-trimester body shift",
    desc: "Bump fully visible, posture changing, fundus measurable — what to expect physically as the body settles into the middle stretch." },
  { slug: "sleep-in-pregnancy", img: sleepImg, tag: "Sleep",
    title: "Setting up your sleep for the months ahead",
    desc: "Why side-sleeping matters, the set-up that makes it comfortable, and how to build the habit before you need it." },
  { slug: "moving-your-body-in-pregnancy", img: movementExImg, tag: "Movement",
    title: "Moving your body in the second trimester",
    desc: "What's safe, what helps, and how to use the energy lift while it's here. The simple rules for walking, yoga, swimming and strength." },
  { slug: "eating-well-in-pregnancy", img: eatingImg, tag: "Nutrition",
    title: "Eating well in the second trimester",
    desc: "Iron, calcium, protein, hydration — the second-trimester triangle, and how to handle real cravings without overthinking." },
  { slug: "anxiety-in-pregnancy", img: anxietyImg, tag: "Mind",
    title: "Body-image weather in middle pregnancy",
    desc: "Why being visibly pregnant brings unexpected feelings — and how to hold the shifts with kindness." },
];

const Related = () => (
  <section id="guidance" className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div className="max-w-xl">
          <SectionLabel>Read next, because of week 22</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.4rem] text-foreground leading-tight">
            Curated guidance for the start of the middle stretch.
          </h2>
        </div>
        <Link to="/pregnancy/second-trimester" className="inline-flex items-center gap-1.5 font-sans text-[13.5px] font-medium text-sage hover:gap-2.5 transition-all whitespace-nowrap">
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
  { q: "When will my partner be able to feel the baby kick?",
    a: "For most pregnancies, partners can feel a definite kick from the outside somewhere between weeks 22 and 26 — though it depends on how your placenta is positioned, your body composition, and how cooperative the baby is on a given day. The best set-up: you sit or lie still in the evening (often the most active time), preferably after eating. Your partner places a firm, flat hand on the lower bump for at least a minute or two without moving. Many people get the first felt kick this way at 22 weeks. If it doesn't happen this week, it almost certainly will in the next two or three." },
  { q: "How often should the baby be moving at 22 weeks?",
    a: "There is no specific number to count to at 22 weeks — formal kick-counting starts at week 24. At 22 weeks, the work is to learn this baby's particular pattern: when they tend to be active (often after meals, in the evening when you sit down), how it feels (rolls, pokes, flurries, sometimes visible twitches), and how it changes across the day. The single rule that always applies, at any week: a clear, sustained reduction in previously felt movement always needs a phone call to maternity triage. Don't wait until tomorrow." },
  { q: "Why does my back hurt so much now?",
    a: "Two things at once. The growing uterus shifts your centre of gravity forward, so the muscles of the lower back have to work harder to keep you upright — they fatigue and ache. And the pelvic joints are softening under the influence of pregnancy hormones (especially relaxin) to make room for birth, which can make the lower back, hips and pubic bone feel less stable. Sensible shoes, gentle stretching, walking, prenatal yoga, warm baths and (for some) a pregnancy support belt all help. Severe pain, sharp one-sided pain, or pain with bleeding or fever needs a midwife conversation." },
  { q: "What is melasma and will it go away?",
    a: "Melasma (sometimes called chloasma, or the 'mask of pregnancy') is darker patches of pigmentation that appear on the cheeks, forehead, upper lip or jaw — caused by pregnancy hormones stimulating extra pigment production in the skin, made worse by sun exposure. It's very common and entirely cosmetic. Sun cream (high SPF, every day, even in winter) and a wide-brimmed hat outdoors reduce how dark the patches get. Most melasma fades significantly in the months after birth, though for some people a faint version remains. There's no need to treat it — but if it's bothering you, dermatology referral postpartum is reasonable." },
  { q: "Strangers keep touching my bump. What can I say?",
    a: "Anything you want. Some people genuinely don't mind; many people very much do, and you have absolutely no obligation to perform comfort with strangers' hands on your body. Polite-but-firm options that work: 'Oh, I'd rather you didn't, thank you.' 'I'm a bit ticklish — but thanks for the kind thought.' Or simply taking a step back. The bump is yours. The pregnancy is yours. You don't owe access to either, no matter how well-meant. Your social comfort matters more than a stranger's curiosity." },
  { q: "Is mild breathlessness on stairs normal at 22 weeks?",
    a: "Yes — mild breathlessness in the second trimester is very common and isn't usually a cause for concern. Two main reasons: progesterone increases your respiratory rate (you're breathing more often, slightly more deeply), and the rising uterus is pressing up on the diaphragm, leaving slightly less room for the lungs to fully expand. The result is that things that didn't used to leave you puffed (a flight of stairs, a slight hill) now do. Sudden severe breathlessness, breathlessness with chest pain, breathlessness with rapid heartbeat, or breathlessness when you're sitting still are all different — and need urgent medical attention." },
  { q: "When should I think about antenatal classes and which kind?",
    a: "Now is a sensible time to think about it. Most antenatal classes run in the third trimester (weeks 28–36) but they often book up months ahead, especially the popular ones. The main options in the UK: NHS antenatal classes (free, group-based, vary in style and depth by trust); NCT classes (paid, often more in-depth, very social, lifelong friendship groups for many); independent classes (hypnobirthing, positive birth, doula-led — vary in price and approach). Most people benefit from at least one. Ask your midwife what's offered locally, and look at NCT, NHS and local mum-and-baby groups to compare." },
  { q: "Is it safe to fly at 22 weeks?",
    a: "Generally yes. Most airlines allow flying without restriction up to about 28 weeks, with a doctor's letter required for many between weeks 28 and 36, and no flying after week 36 for most carriers (sometimes 32 weeks for long-haul). At 22 weeks the risks are low for an uncomplicated pregnancy. Practical tips: stay well hydrated, walk the aisle every hour or so to reduce DVT risk, wear flight socks, request an aisle seat. Check your travel insurance covers pregnancy. Avoid travel to areas with active Zika virus or where medical care would be limited if something happened. Always check with your midwife if you have any pregnancy complications." },
];

const Next = () => (
  <section className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
      <div className="bg-gradient-to-br from-sage-bg via-parchment to-stage-pregnancy/30 rounded-3xl border border-border/30 p-8 sm:p-10 md:p-14 text-center shadow-card-brand">
        <SectionLabel>Up next</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.5rem] text-foreground leading-tight mb-3">Ready for week 23?</h2>
        <p className="font-sans text-[14.5px] text-foreground/75 max-w-lg mx-auto mb-8 leading-[1.8]">
          Week 23 brings the threshold of viability — a quiet, important shift in how the medical world
          thinks about your baby — and a body settling further into the middle stretch.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
          <Link to="/pregnancy/week/23" className="inline-flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium shadow-cta hover:bg-terracotta-hover transition-colors">
            Continue to week 23 <ArrowRight size={14} />
          </Link>
          <Link to="/pregnancy/second-trimester" className="inline-flex items-center justify-center gap-2 border border-foreground/25 text-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium hover:bg-parchment-dark transition-colors">
            Explore the second trimester
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const Week22Page = () => (
  <div className="min-h-screen bg-parchment">
    <PregnancyWeekSeo weekNumber={22} />
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
    <WeekCommonQuestions week={22} questions={buildWeekQuestions(22, faqs)} />
    <WeekSources week={22} sources={getWeekSources(22)} />
    <Next />
    <Footer />
  </div>
);

export default Week22Page;
