import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ChevronLeft, ChevronRight, Sprout, HeartPulse, Activity, Sparkles, Calendar, BookOpen,
  ArrowRight, Check, AlertTriangle, Plus, Minus, Heart, MessageCircle, Leaf, Moon,
  ShieldCheck, Stethoscope, Wind, Soup, Brain, Eye, Sun, Hand, Smile, Apple, Ear,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PregnancyWeekSeo from "@/components/seo/PregnancyWeekSeo";
import PublicWeekReflectionAsk from "@/components/pregnancy/PublicWeekReflectionAsk";
import fetusImg from "@/assets/week17-fetus.jpg";
import pomegranateImg from "@/assets/week17-pomegranate.jpg";
import biologyImg from "@/assets/week17-biology-detail.jpg";
import journalImg from "@/assets/journal-flatlay.jpg";
import botanicalTr from "@/assets/botanical-branch-tr.png";
import botanicalBl from "@/assets/botanical-branch-bl.png";
import botanicalAccent from "@/assets/article-botanical-accent.png";
import emotionalImg from "@/assets/article-hero-emotional-first-tri.jpg";
import secondBodyImg from "@/assets/article-hero-second-body.jpg";
import secondAnxietyImg from "@/assets/article-hero-second-anxiety.jpg";
import secondMovementImg from "@/assets/article-hero-second-movement.jpg";
import secondMovementExImg from "@/assets/article-hero-second-movement-exercise.jpg";
import secondSleepImg from "@/assets/article-hero-second-sleep.jpg";
import anatomyScanImg from "@/assets/article-hero-second-anatomy-scan.jpg";
import WeekCommonQuestions from "@/components/week/WeekCommonQuestions";
import WeekSources from "@/components/week/WeekSources";
import { buildWeekQuestions, getWeekSources } from "@/data/weekSupportContent";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

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
        <Breadcrumbs
          tone="section"
          className="flex justify-center mb-6 sm:mb-7 font-sans text-[12px] font-normal text-foreground/65"
          items={[
            { label: "Pregnancy", href: "/pregnancy" },
            { label: "Week by week", href: "/pregnancy/second-trimester" },
            { label: "Week 17", href: "/pregnancy/week/17" },
          ]}
        />

        <p className="font-sans text-[11px] font-semibold tracking-[0.3em] uppercase text-sage mb-5">
          Second trimester · The week of first flutters
        </p>
        <h1 className="font-serif text-[2.5rem] sm:text-5xl md:text-[3.75rem] lg:text-[4.25rem] text-foreground leading-[1.04] tracking-tight mb-4 md:mb-5">
          17 Weeks Pregnant
        </h1>
        <p className="font-serif italic text-[1.05rem] sm:text-lg md:text-xl text-foreground/75 max-w-xl mx-auto leading-relaxed">
          Your baby is the size of a pomegranate — recognisably a small baby now, joints fully formed, heart beating around 150 times a minute, eyes still closed but starting to detect light. Outside, the first faint flutters of movement may arrive — or they may not, yet. Both are normal. The pregnancy is becoming something that quietly answers back.
        </p>
      </div>

      <Link to="/pregnancy/week/16" aria-label="Go to week 16" className="absolute left-3 sm:left-6 md:left-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronLeft size={18} />
      </Link>
      <Link to="/pregnancy/week/18" aria-label="Go to week 18" className="absolute right-3 sm:right-6 md:right-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronRight size={18} />
      </Link>
    </div>

    <div className="relative -mt-28 sm:-mt-36 md:-mt-40 mb-6">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex items-end justify-center gap-5 sm:gap-10 md:gap-14">
          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-card border-[3px] border-sage/15 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={pomegranateImg} alt="A fresh whole pomegranate" loading="lazy" width={512} height={512} className="w-full h-full object-cover" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.04]" />
            </div>
            <div className="text-center">
              <p className="font-serif italic text-[12.5px] text-foreground/80 leading-tight">pomegranate</p>
              <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/55 mt-1">~13&nbsp;cm</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full bg-card border-[4px] border-sage/30 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={fetusImg} alt="Soft editorial illustration of a 17-week baby with recognisable infant proportions, separate fingers and toes, hands near the face, gently floating in the gestational sac" width={1024} height={1024} loading="eager" decoding="async" className="w-full h-full object-cover scale-[1.02]" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.05]" />
            </div>
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.22em] uppercase text-foreground/65">Your baby this week</p>
          </div>

          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-sage-bg to-stage-pregnancy/40 border-[3px] border-sage/25 flex items-center justify-center shadow-elevated">
              <span className="font-serif text-[1.7rem] sm:text-[1.95rem] text-foreground tracking-tight leading-none">23</span>
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
  { id: "movement", label: "First movement", Icon: Hand },
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
            <p className="font-sans text-[11.5px] font-normal text-foreground/60 mt-0.5">Updated for 2026 · 13 min read · The bridge into the anomaly scan</p>
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
  { label: "Baby size", value: "~13 cm — pomegranate" },
  { label: "Baby weight", value: "~140 g" },
  { label: "Trimester", value: "2 of 3 (week 17 of 27)" },
];

const AtAGlance = () => (
  <section id="at-a-glance" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl mb-14 md:mb-20">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 relative bg-gradient-to-br from-sage-bg/55 via-parchment to-stage-pregnancy/40 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-10 overflow-hidden shadow-card-brand">
        <img src={botanicalAccent} alt="" aria-hidden="true" className="absolute -left-3 bottom-0 w-28 opacity-35 pointer-events-none select-none" />
        <SectionLabel tone="sage">At a glance</SectionLabel>
        <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-5">
          The week pregnancy starts answering back, in flutters or in glances.
        </h2>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8] mb-4">
          Inside, your baby is around 13 cm long and weighs roughly 140 grams. The body is more proportioned,
          all joints work, the heart is fully muscular and beating around 150 times a minute, and the
          umbilical cord is thicker and stronger. Eyes are still closed but can detect light through
          translucent eyelids. The bones in the inner ear are hardening — your baby is starting to hear.
        </p>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8]">
          Outside, the bump is more obviously visible. Many people feel the first faint flutters of
          movement around now — sometimes called quickening — though many others won't until weeks 19–22.
          The 20-week anomaly scan is on the horizon. Pregnancy is becoming a conversation, not a secret.
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
  { title: "All the joints work", body: "Your baby's skeleton is rapidly hardening from cartilage into bone, and every joint — shoulders, elbows, wrists, hips, knees, ankles, fingers, toes — is now fully formed and moving. Your baby spends most of the day in motion: stretching, kicking, rolling, hands exploring the face, fingers curling and uncurling. The skull plates stay deliberately soft and overlapping so the head can mould through the birth canal months from now." },
  { title: "A heart with all four chambers, beating fast", body: "The heart is now fully muscular, with all four chambers and valves working. It beats around 140–160 times a minute — roughly twice the rate of yours — and at the 20-week anomaly scan you'll often hear it loudly and see it on screen. The umbilical cord is thicker and stronger, carrying around 300 ml of blood between you and your baby every single minute." },
  { title: "Eyes closed, light getting through", body: "Your baby's eyes are still fused closed and won't open until around week 26, but the retinas are now developed enough to detect light through the translucent eyelids. Bright sunlight on a bare belly can register as a soft red glow inside. The eyes are also moving slowly behind the lids in a kind of early rapid eye movement — the beginnings of sleep cycles." },
  { title: "Hearing starting to come online", body: "The tiny bones inside the inner ear are hardening from cartilage into bone, and the auditory pathways to the brain are becoming functional. Your baby is starting to detect sound — initially the deep, constant rhythm of your heartbeat, the whoosh of blood through the placenta, and the muffled drum of your voice. By week 24 hearing will be much sharper, and by birth your baby will recognise your voice." },
];

const Biology = () => (
  <section id="biology" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="relative rounded-3xl overflow-hidden border border-border/40 shadow-card-brand">
            <div className="aspect-[4/5]">
              <img src={biologyImg} alt="Soft editorial close-up of a 17-week baby curled in the gestational sac, recognisable infant profile, hands near the face, eyes still closed, suspended in soft luminous fluid" loading="lazy" width={1024} height={1280} className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-foreground/60 to-transparent">
              <p className="font-serif italic text-[13px] text-background/95 leading-snug">
                Thirteen centimetres. A heart at 150. The week your baby starts to hear you.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <SectionLabel>What's underway biologically</SectionLabel>
          <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-5">
            A small, recognisable baby — joints working, heart strong, beginning to listen.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8] mb-8 max-w-2xl">
            Week 17 is when your baby crosses a quiet but profound line. The body is no longer being
            assembled — it's a small, recognisable baby that's growing, refining, practising. Joints move,
            the heart works, eyes detect light, ears are starting to hear. The next major milestone — the
            anomaly scan — is just a few weeks away.
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
  { Icon: Hand, title: "What first movement actually feels like", body: "Early flutters are notoriously easy to miss. Most people describe them as bubbles, popcorn, butterflies, gas, a brushing-from-inside, or a faint twitch — not yet anything like a recognisable kick. They're often felt low in the abdomen, sometimes off to one side. They tend to come and go, and are easier to notice when you're sitting or lying still and not eating." },
  { Icon: Calendar, title: "When most people first feel it", body: "First-time pregnancies usually feel something between weeks 18 and 22, with a wide range. Second and later pregnancies often feel things noticeably earlier — from around week 14 or 15 — because you know what to look for and the abdominal muscles have stretched before. Feeling something at 17 weeks is very normal. Feeling nothing yet at 17 weeks is also very normal." },
  { Icon: ShieldCheck, title: "Why nothing yet at 17 weeks is fine", body: "There are several entirely normal reasons not to feel movement yet. The placenta sitting at the front of the uterus (an anterior placenta) cushions movement and delays first flutters by weeks. A first pregnancy, more abdominal muscle, more cushioning, or just busier days all delay it too. At 17 weeks, the baby is still small — many movements simply aren't strong enough to be noticed." },
  { Icon: HeartPulse, title: "When to count, and when not to yet", body: "Formal kick-counting is not advised before around week 24–28 because patterns aren't established yet. From around week 24 you'll be told to learn your baby's normal pattern of movement and contact your maternity unit if you notice a clear reduction. For now: notice gently, but don't worry about quotas. The anomaly scan in a few weeks confirms a great deal." },
];

const Movement = () => (
  <section id="movement" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel tone="sage">First movement</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        First flutters — what they feel like, and what it means if you haven't felt anything yet.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        Week 17 is one of the classic first-movement weeks for some — but not for many others. Both are
        normal. The earliest movements are subtle, easy to miss, and often only noticed in retrospect.
        The wait is its own quiet emotional landscape.
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
        <span className="font-semibold">Not feeling movement at 17 weeks is not a worrying sign.</span>{" "}
        Most first-time pregnancies don't feel definite movement until around week 20. An anterior placenta,
        more abdominal muscle, body shape and how busy your days are all change when first flutters arrive.
        The anomaly scan is the next big checkpoint — try not to use silence between now and then as evidence
        of anything.
      </p>
    </div>
  </section>
);

const bodyNotes = [
  { Icon: Activity, title: "Bump rising past the navel level", body: "Your uterus is now sitting just below the navel — many midwives can feel the top of it (the fundus) at this height. The lower belly feels firmer and visibly rounder, and most people now look obviously pregnant in fitted clothes, even if not yet in loose ones." },
  { Icon: Hand, title: "Round ligament & pelvic stretching", body: "The supporting ligaments around the uterus continue to stretch as it grows. Sharp pulling sensations low in the pelvis or groin when you sneeze, stand up quickly or roll over are common and harmless. Some people also notice a duller, deeper ache in the lower back or hips as posture shifts." },
  { Icon: Moon, title: "Sleep getting trickier", body: "Falling asleep on your side becomes more important from now (especially after week 28). A pillow between the knees, one supporting the bump and one behind the back makes side-sleeping much more comfortable. Vivid pregnancy dreams, more frequent nighttime weeing and occasional restless legs all show up around now too." },
  { Icon: Wind, title: "Heartburn & breathlessness creeping in", body: "The uterus is starting to push up on the diaphragm and stomach. Many people notice heartburn after meals, a slight breathlessness when climbing stairs, and a need to eat more slowly. Smaller, more frequent meals help. Sleeping slightly propped up settles night reflux." },
  { Icon: Eye, title: "Skin & hair changes more visible", body: "Linea nigra darkening down the centre of the belly. Possible patches of melasma on the cheeks. Hair often feels thicker and shinier because more is staying in the growth phase, and nails grow faster too. SPF on the face daily makes a real difference to pigmentation." },
  { Icon: Sun, title: "Energy good, with afternoon dips", body: "For most people this is a steadier-energy stretch of pregnancy, with a fairly reliable afternoon dip. Eating little and often, hydrating properly, and saying yes to a 20-minute lie down when needed all genuinely help. If energy is consistently flat, mention it — anaemia is very common in the second trimester and easily checked." },
];

const Body = () => (
  <section id="body" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="max-w-2xl mb-10">
        <SectionLabel tone="terracotta">Your body this week</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
          A clearly pregnant body, settling into its new shape.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
          Week 17 brings a more obviously pregnant body for most: a real bump rising toward the navel,
          posture shifting, sleep changing, the first hints of heartburn and breathlessness as the uterus
          starts to take more space.
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
    Icon: Hand, name: "First flutters (or not yet)",
    feels: "Bubbles, popcorn, gas, a brushing-from-inside, a faint twitch low in the belly. Easy to miss. Often only noticed in stillness. Or — nothing at all yet. Both are normal.",
    why: "Your baby is moving constantly, but at 17 weeks the movements are still small and easily cushioned. Anterior placenta, body composition, and a first pregnancy all delay the first noticeable flutter.",
    normal: "Common to feel something between 16 and 22 weeks. Not feeling anything yet at 17 weeks is fine. From around week 24, you'll be asked to track patterns; for now, just notice gently.",
  },
  {
    Icon: Activity, name: "Round ligament & pelvic pulling",
    feels: "Sharp, brief pulling low in the pelvis or groin when you sneeze, stand up quickly, cough or roll over in bed. Sometimes a duller, deeper stretching ache.",
    why: "The ligaments supporting the growing uterus are stretching more visibly. The weight of the uterus is also tipping forward. Posture shifts as the centre of gravity changes.",
    normal: "Very common, brief, and reassuring. Move slowly between positions. Persistent or severe one-sided pain, pain with bleeding, or pain with fever needs a phone call to your midwife.",
  },
  {
    Icon: Wind, name: "Heartburn & indigestion",
    feels: "A burning sensation behind the breastbone or in the throat, especially after meals or when lying down. Acid taste in the mouth. A 'too full' feeling after small portions.",
    why: "Progesterone relaxes the valve at the top of the stomach, and the rising uterus pushes the stomach upward. Both let acid travel back up the oesophagus more easily.",
    normal: "Very common from now to the end of pregnancy. Smaller meals, eating slowly, not lying flat for an hour after meals, and sleeping slightly propped up help. Gaviscon is safe in pregnancy; ask your midwife or pharmacist.",
  },
  {
    Icon: Moon, name: "Vivid dreams & restless sleep",
    feels: "Strange, intense, often baby-related dreams you remember in detail. Waking more often. Difficulty getting comfortable. More frequent nighttime weeing.",
    why: "Hormonal changes affect sleep architecture. The growing bump makes positions awkward. Higher blood volume means kidneys process more fluid overnight.",
    normal: "Very common. A pillow between the knees, one supporting the bump, and going to the loo just before bed all help. Worsening insomnia or persistent low mood needs a midwife conversation.",
  },
  {
    Icon: Brain, name: "Pregnancy brain & forgetfulness",
    feels: "Walking into a room and forgetting why. Losing words mid-sentence. Forgetting appointments. A sense of being more easily distracted than usual.",
    why: "Hormonal shifts, sleep changes, and the cognitive load of carrying a pregnancy all play a part. Some research suggests structural brain changes that support bonding later.",
    normal: "Very common, often mocked, very real. Lists, phone reminders and saying things out loud genuinely help. It tends to lift in the months after birth.",
  },
  {
    Icon: Stethoscope, name: "Increased vaginal discharge",
    feels: "More white, milky, mild-smelling discharge than usual. Often noticeable enough to warrant a panty liner.",
    why: "Higher oestrogen levels and increased blood flow to the cervix and vaginal walls. It's part of the body's protective barrier in pregnancy.",
    normal: "Very common. Itching, burning, a strong smell, green/yellow colour, or any blood needs a GP or midwife check — thrush and bacterial vaginosis are easily treated.",
  },
  {
    Icon: Eye, name: "Pigmentation: linea nigra & melasma",
    feels: "A faint dark line down the centre of the belly darkening. Patches of darker pigment on the cheeks, forehead or upper lip, especially after sun. Darker nipples and areolas.",
    why: "Pregnancy hormones increase melanin production. UV exposure amplifies it considerably.",
    normal: "Very common. Wear high SPF on the face daily. Most pigmentation changes fade in the year after birth.",
  },
  {
    Icon: Soup, name: "Stronger appetite, occasional cravings",
    feels: "Real, sustained hunger. Specific cravings, sometimes for things you didn't expect. A surprising pleasure in certain foods you'd previously taken or left.",
    why: "Your baby is growing rapidly and your blood volume continues to climb. Around 300 extra calories a day is the rough guide for the second trimester.",
    normal: "Very common. Aim for protein at every meal, iron-rich foods, fruit, vegetables, dairy and whole grains. Cravings for non-food items (ice, chalk, soil) need a GP check — they can signal iron deficiency.",
  },
];

const Symptoms = () => (
  <section id="symptoms" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel>Common symptoms</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        What's likely to show up at week 17 — and what each one really means.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        Week 17 brings a wider mix: the appearance (or not) of first flutters, the start of heartburn and
        sleep changes, more visible pigmentation, and a steadier-energy stretch with reliable afternoon dips.
        Most are normal. Some are worth flagging.
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
      <Link to="/articles/baby-movement-in-pregnancy" className="inline-flex items-center gap-2 font-sans text-[13.5px] font-medium text-sage hover:gap-3 transition-all">
        Read: what early movement really feels like <ArrowRight size={13} />
      </Link>
    </div>
  </section>
);

const emotionalTruths = [
  "Lying still in the evening, hand on the belly, listening for something.",
  "Telling yourself you'll feel it any day, and trying not to count.",
  "Strangers smiling at the bump, and not quite knowing what your face is doing back.",
  "The pregnancy starting to show in photographs.",
  "A small grief for the easy lightness of pre-pregnancy mornings.",
  "Imagining the room. The cot. The first night home. Then closing the daydream quickly.",
  "Feeling the anomaly scan in your chest, weeks before it's booked.",
];

const Emotional = () => (
  <section id="emotional" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 relative bg-gradient-to-br from-lavender-bg via-parchment to-lavender-bg/40 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-9 shadow-card-brand overflow-hidden">
          <img src={botanicalAccent} alt="" aria-hidden="true" className="absolute right-0 top-0 w-24 opacity-35 pointer-events-none select-none" />
          <SectionLabel tone="lavender">Emotionally this week</SectionLabel>
          <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-4">
            More connected — and quietly braced for the next scan.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/80 leading-[1.8] mb-4">
            Week 17 is where many people stop describing pregnancy as something happening to them and start
            describing it as something they're with. A hand on the belly. A pause in the evening to listen.
            A quiet, half-spoken conversation with a baby who's starting to be able to hear it.
          </p>
          <p className="font-sans text-[14px] text-foreground/70 leading-[1.75]">
            Underneath the connection, the 20-week scan starts to take up emotional space. Wanting it. Dreading
            it. Wishing it was tomorrow. Wishing it was further away. All of that is normal in the run-up.
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
  { Icon: Calendar, title: "Confirm the anomaly scan is booked", note: "The 20-week scan (anomaly scan) is usually offered between weeks 18 and 21. If you don't have a date yet, contact your midwifery team this week to make sure it's booked. It's a more detailed scan than the dating scan — it checks the baby's anatomy from head to toe. Many people bring a partner, friend or family member; many trusts limit numbers, so ask in advance." },
  { Icon: Moon, title: "Start sleeping on your side, with proper pillow set-up", note: "From around week 28, official UK advice is to fall asleep on your side, because back-sleeping in late pregnancy is linked to a small increased stillbirth risk. Building the habit now makes it much easier to maintain later. A pillow between the knees, one supporting the bump and one behind the back makes side-sleeping comfortable. A proper pregnancy pillow is worth the money for many people." },
  { Icon: Hand, title: "Notice movement gently, don't count yet", note: "If you've felt first flutters, gently notice when and where — but don't worry about quotas yet. If you haven't felt anything yet at 17 weeks, that's normal. Formal kick-counting starts from around week 24–28. For now: pay attention in stillness, especially in the evening, and trust the system." },
  { Icon: Apple, title: "Eat for the second trimester, properly", note: "Around 300 extra calories a day. Iron at most meals (red meat, beans, lentils, leafy greens, fortified cereals) paired with vitamin C for absorption. Calcium daily (dairy or fortified alternatives, tinned fish with bones, leafy greens). Stay hydrated — heartburn is often worse with dehydration. Smaller, more frequent meals help with rising-uterus reflux." },
  { Icon: Activity, title: "Pelvic floor exercises, daily", note: "Daily pelvic floor exercises from now genuinely help with bladder control later in pregnancy and recovery after birth. Squeeze (as if stopping a wee), hold for a few seconds, release. Aim for around 10 long holds and 10 quick squeezes, twice a day. The NHS Squeezy app or daily reminders make it actually happen." },
  { Icon: Sprout, title: "Keep the basics ticking over", note: "10 micrograms of vitamin D daily through pregnancy and breastfeeding. A pregnancy multivitamin covers most essentials. If iron is causing constipation, ask your GP about a gentler alternative — Spatone is well-tolerated by many. Book the dental check-up if you haven't — NHS dental care is free in pregnancy and the year after birth." },
];

const Focus = () => (
  <section id="focus" className="bg-sage-bg/35 py-16 md:py-24 border-y border-border/30">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <SectionLabel tone="sage">Focus this week</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.2rem] text-foreground leading-tight mb-4">
            Gentle preparation, real eating, the side-sleep habit.
          </h2>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8]">
            Week 17 is a useful preparation week. The anomaly scan is on the horizon. Side-sleeping starts
            to matter. Eating well actually moves the needle now. Most of it is small, ordinary, daily.
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
        First flutters arrive on their own time. Some people feel something this week. Many don't until weeks later. The pregnancy is real either way — listening, growing, becoming — even when the body is still too small to be heard.
      </p>
      <Heart size={14} className="text-sage/60 mx-auto mt-5" />
    </div>
  </section>
);

const reflectionPrompts = ["What I'm noticing in stillness", "What the anomaly scan brings up for me", "Something I'd want to remember", "A small kindness I could give myself"];
const askChips = ["What does early movement feel like?", "I haven't felt anything yet — is that normal?", "What does the anomaly scan check?", "Is heartburn normal at 17 weeks?", "Should I sleep on my side already?"];

const ReflectionAsk = () => (
  <PublicWeekReflectionAsk
    week={17}
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
            The week pregnancy starts to answer back deserves a page.
          </h3>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8] mb-6">
            The first flutter you weren't sure was a flutter. The hand on the belly in the evening. The way
            your voice changes when you talk to the baby for the first time. The journal holds the small,
            invisible turning points of becoming a parent.
          </p>
          <ul className="space-y-2.5 mb-7">
            {["A page for the week of first flutters", "Letters to your baby through every week", "Guided pages all the way to birth"].map((line) => (
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
  { slug: "baby-movement-in-pregnancy", img: secondMovementImg, tag: "Movement",
    title: "What first baby movements really feel like",
    desc: "Bubbles, pops, butterflies, gas — the surprisingly subtle reality of early flutters, and what to do if you haven't felt anything yet." },
  { slug: "20-week-anomaly-scan", img: anatomyScanImg, tag: "Scans",
    title: "What the 20-week anomaly scan actually checks",
    desc: "What the sonographer is looking for, what they can and can't see, what the results mean — and how to manage the run-up emotionally." },
  { slug: "anxiety-in-pregnancy", img: secondAnxietyImg, tag: "Mind",
    title: "When the worry doesn't lift with the calendar",
    desc: "Why pregnancy anxiety can carry on past the first trimester, and how to stay grounded as the next scan approaches." },
  { slug: "sleep-in-pregnancy", img: secondSleepImg, tag: "Sleep",
    title: "Setting up your sleep for the months ahead",
    desc: "Why side-sleeping matters, when to start, and the small set-up tweaks that make pregnancy sleep easier from week 17 onwards." },
  { slug: "second-trimester-complete-guide", img: secondBodyImg, tag: "Body",
    title: "The mid second-trimester body shift",
    desc: "Bump rising, posture changing, heartburn appearing — what to expect physically as the body settles into being clearly pregnant." },
  { slug: "moving-your-body-in-pregnancy", img: secondMovementExImg, tag: "Movement",
    title: "Moving your body in the second trimester",
    desc: "What's safe, what helps, and how to use the energy lift while it's here. The simple rules for walking, yoga, swimming and strength." },
];

const Related = () => (
  <section id="guidance" className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div className="max-w-xl">
          <SectionLabel>Read next, because of week 17</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.4rem] text-foreground leading-tight">
            Curated guidance for what's likely on your mind right now.
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
  { q: "What do first baby movements actually feel like?",
    a: "Surprisingly subtle. Most people describe early flutters as bubbles, popcorn, butterflies, gas, a brushing-from-inside, or a faint twitch — not yet anything like recognisable kicks. They're often felt low in the abdomen, sometimes off to one side, and are easier to notice when you're sitting or lying still and not eating. Many people aren't sure if what they're feeling is the baby until it happens repeatedly in the same spot. Definite, unmistakable kicks usually arrive weeks later." },
  { q: "I haven't felt anything yet at 17 weeks — should I be worried?",
    a: "No, not yet. Most first-time pregnancies don't feel definite movement until somewhere between weeks 18 and 22, and a wide range either side is normal. An anterior placenta (a placenta sitting at the front of the uterus) cushions movement and delays first flutters by weeks. Body shape, abdominal muscle tone, and how busy your days are also affect when you notice things. The 20-week anomaly scan is the next big checkpoint — try not to use silence between now and then as evidence of anything." },
  { q: "What does the 20-week anomaly scan check?",
    a: "It's a detailed scan of your baby's anatomy from head to toe — usually between 18 and 21 weeks. The sonographer checks the head, brain, face, spine, heart (all four chambers, valves, blood flow), lungs, stomach, kidneys, bladder, abdominal wall, arms, legs, hands and feet (including counting fingers and toes), the placenta's position, the umbilical cord and the volume of amniotic fluid. Most major structural conditions can be detected, though some are not visible on ultrasound. You can choose to find out the baby's sex at this scan if you want." },
  { q: "Is heartburn normal at 17 weeks? What helps?",
    a: "Yes, very. Progesterone relaxes the valve at the top of the stomach, and the rising uterus pushes the stomach upwards — both let acid travel back up the oesophagus more easily. Smaller, more frequent meals; eating slowly; not lying flat for an hour after meals; sleeping slightly propped up on extra pillows; and avoiding personal trigger foods (often spicy, fatty, fizzy or very acidic) all help. Gaviscon is safe in pregnancy and works well; ranitidine and omeprazole are also safe if needed. Ask your midwife or pharmacist." },
  { q: "Should I be sleeping on my side already?",
    a: "From around week 28, official UK advice is to fall asleep on your side because back-sleeping in late pregnancy is linked to a small increased stillbirth risk. At 17 weeks, the uterus isn't yet large enough for back-sleeping to compress the major blood vessels behind it, so back-sleeping is technically still safe. But building the side-sleep habit now (with a pillow between the knees, one supporting the bump and one behind the back) makes it much easier to maintain in the third trimester. Many people find a proper pregnancy pillow worth the money from around now." },
  { q: "Can I find out the baby's sex at the anomaly scan?",
    a: "In most UK NHS trusts, yes — if you want to know, the sonographer will usually tell you at the 20-week scan, provided your baby is in a position that lets them see clearly. Some trusts have policies of not telling, especially in early years; check at your dating scan. Sex assigned at the scan is based on visible anatomy and is correct in around 95–99% of cases. Many people find out at the scan; many wait. Both are completely valid choices." },
  { q: "Is it normal to feel anxious in the run-up to the 20-week scan?",
    a: "Very. The anomaly scan is a much more detailed scan than the dating scan and looks for a wider range of conditions, so it's very normal for the run-up to bring fresh anxiety — even (and sometimes especially) for people who felt calmer through the early second trimester. Talking to your midwife, partner or a friend who's been through it, planning the day around the scan, and bringing someone with you on the day all genuinely help. If anxiety is interfering with sleep or daily life, please mention it to your midwife or GP." },
  { q: "What should I be doing about exercise and pelvic floor now?",
    a: "Most of what you did before pregnancy is usually fine to continue: walking, swimming, prenatal yoga, gentle cycling, low-impact strength work, jogging at a comfortable pace. Avoid contact sports, real fall risks and lying flat on your back for long periods later. Daily pelvic floor exercises from now genuinely help with bladder control later in pregnancy and recovery after birth — squeeze (as if stopping a wee), hold for a few seconds, release; aim for around 10 long holds and 10 quick squeezes, twice a day." },
];

const Next = () => (
  <section className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
      <div className="bg-gradient-to-br from-sage-bg via-parchment to-stage-pregnancy/30 rounded-3xl border border-border/30 p-8 sm:p-10 md:p-14 text-center shadow-card-brand">
        <SectionLabel>Up next</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.5rem] text-foreground leading-tight mb-3">Ready for week 18?</h2>
        <p className="font-sans text-[14.5px] text-foreground/75 max-w-lg mx-auto mb-8 leading-[1.8]">
          Week 18 brings the start of the anomaly-scan window for many people, more obvious flutters of
          movement, and a body that's clearly settled into the second trimester.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
          <Link to="/pregnancy/week/18" className="inline-flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium shadow-cta hover:bg-terracotta-hover transition-colors">
            Continue to week 18 <ArrowRight size={14} />
          </Link>
          <Link to="/pregnancy/second-trimester" className="inline-flex items-center justify-center gap-2 border border-foreground/25 text-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium hover:bg-parchment-dark transition-colors">
            Explore the second trimester
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const Week17Page = () => (
  <div className="min-h-screen bg-parchment">
    <PregnancyWeekSeo weekNumber={17} />
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
    <WeekCommonQuestions week={17} questions={buildWeekQuestions(17, faqs)} />
    <WeekSources week={17} sources={getWeekSources(17)} />
    <Next />
    <Footer />
  </div>
);

export default Week17Page;
