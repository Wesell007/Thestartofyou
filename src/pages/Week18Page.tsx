import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ChevronLeft, ChevronRight, Sprout, HeartPulse, Activity, Sparkles, Calendar, BookOpen,
  ArrowRight, Check, AlertTriangle, Plus, Minus, Heart, MessageCircle, Leaf, Moon,
  ShieldCheck, Stethoscope, Wind, Soup, Brain, Eye, Sun, Hand, Apple, Ear,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PregnancyWeekSeo from "@/components/seo/PregnancyWeekSeo";
import PublicWeekReflectionAsk from "@/components/pregnancy/PublicWeekReflectionAsk";
import fetusImg from "@/assets/week18-fetus.jpg";
import bellpepperImg from "@/assets/week18-bellpepper.jpg";
import biologyImg from "@/assets/week18-biology-detail.jpg";
import journalImg from "@/assets/journal-flatlay.jpg";
import botanicalTr from "@/assets/botanical-branch-tr.png";
import botanicalBl from "@/assets/botanical-branch-bl.png";
import botanicalAccent from "@/assets/article-botanical-accent.png";
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
            { label: "Home", href: "/" },
            { label: "Pregnancy", href: "/pregnancy" },
            { label: "Second trimester", href: "/pregnancy/second-trimester" },
            { label: "Week 18", href: "/pregnancy/week/18" },
          ]}
        />

        <p className="font-sans text-[11px] font-semibold tracking-[0.3em] uppercase text-sage mb-5">
          Second trimester · The week the bump becomes the body
        </p>
        <h1 className="font-serif text-[2.5rem] sm:text-5xl md:text-[3.75rem] lg:text-[4.25rem] text-foreground leading-[1.04] tracking-tight mb-4 md:mb-5">
          18 Weeks Pregnant
        </h1>
        <p className="font-serif italic text-[1.05rem] sm:text-lg md:text-xl text-foreground/75 max-w-xl mx-auto leading-relaxed">
          Your baby is the size of a red bell pepper — about 14 cm, 200 grams, ears now in their final position, hearing your voice from the inside. Movement is gathering force. The bump is rising past the navel. The 20-week scan is no longer in the distance — it's a date you can almost read.
        </p>
      </div>

      <Link to="/pregnancy/week/17" aria-label="Go to week 17" className="absolute left-3 sm:left-6 md:left-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronLeft size={18} />
      </Link>
      <Link to="/pregnancy/week/19" aria-label="Go to week 19" className="absolute right-3 sm:right-6 md:right-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronRight size={18} />
      </Link>
    </div>

    <div className="relative -mt-28 sm:-mt-36 md:-mt-40 mb-6">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex items-end justify-center gap-5 sm:gap-10 md:gap-14">
          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-card border-[3px] border-sage/15 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={bellpepperImg} alt="A fresh red bell pepper" loading="lazy" width={512} height={512} className="w-full h-full object-cover" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.04]" />
            </div>
            <div className="text-center">
              <p className="font-serif italic text-[12.5px] text-foreground/80 leading-tight">bell pepper</p>
              <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/55 mt-1">~14&nbsp;cm</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full bg-card border-[4px] border-sage/30 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={fetusImg} alt="Soft editorial illustration of an 18-week baby with proportional limbs, fingers and toes separated, ears in final position, hands near the face, gently floating in the gestational sac" width={1024} height={1024} loading="eager" decoding="async" className="w-full h-full object-cover scale-[1.02]" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.05]" />
            </div>
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.22em] uppercase text-foreground/65">Your baby this week</p>
          </div>

          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-sage-bg to-stage-pregnancy/40 border-[3px] border-sage/25 flex items-center justify-center shadow-elevated">
              <span className="font-serif text-[1.7rem] sm:text-[1.95rem] text-foreground tracking-tight leading-none">22</span>
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
  { id: "movement", label: "Movement now", Icon: Hand },
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
            <p className="font-sans text-[11.5px] font-normal text-foreground/60 mt-0.5">Updated for 2026 · 13 min read · Inside the anomaly-scan window</p>
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
  { label: "Baby size", value: "~14 cm — bell pepper" },
  { label: "Baby weight", value: "~200 g" },
  { label: "Trimester", value: "2 of 3 (week 18 of 27)" },
];

const AtAGlance = () => (
  <section id="at-a-glance" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl mb-14 md:mb-20">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 relative bg-gradient-to-br from-sage-bg/55 via-parchment to-stage-pregnancy/40 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-10 overflow-hidden shadow-card-brand">
        <img src={botanicalAccent} alt="" aria-hidden="true" className="absolute -left-3 bottom-0 w-28 opacity-35 pointer-events-none select-none" />
        <SectionLabel tone="sage">At a glance</SectionLabel>
        <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-5">
          The week the bump becomes the body, and movement gathers force.
        </h2>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8] mb-4">
          Inside, your baby is around 14 cm long and weighs roughly 200 grams. Ears have moved into their
          final position on the side of the head and are now picking up your voice from inside the body.
          The nervous system is laying down the protective myelin coating around nerves. Movements are
          stronger, more coordinated, and — for many people now — beginning to be unmistakable.
        </p>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8]">
          Outside, the uterus has risen above the navel for many. Most people are visibly pregnant in
          everyday clothes. The 20-week anomaly scan is now firmly inside its window — many people will
          have it this week or in the next two. Pregnancy starts to feel less like a private event and
          more like something the world is already responding to.
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
  { title: "Ears in final position, hearing your voice", body: "The tiny ears, which started lower on the neck, have now migrated to their final position on the sides of the head and are standing slightly out. The bones of the inner ear and the auditory pathways to the brain are mature enough that your baby is now picking up sound — first your heartbeat, your breathing and the deep rhythm of your voice from inside the body. Sudden loud noises outside can produce a startle response that some people feel a few seconds later as a flurry of movement." },
  { title: "Movements stronger, more coordinated", body: "Muscles are stronger, joints fully formed, and the nervous system is laying down myelin — the fatty coating that lets nerve signals travel quickly and smoothly. The result is movement that's no longer just twitches: rolls, stretches, gentle kicks, hands moving to the face, fingers gripping the umbilical cord. Most movement is still too cushioned to feel reliably, but the threshold of what reaches you is dropping noticeably this week." },
  { title: "Sex organs visible on scan", body: "If your baby is female, the uterus and fallopian tubes are now formed and the vagina is hollowing out. If male, the genitals are visible on ultrasound and the testes are still inside the abdomen. The 20-week anomaly scan can usually identify sex if your baby is in a cooperative position — and you can choose to know or not know. Sex assigned at scan is right around 95–99% of the time." },
  { title: "Yawning, swallowing, sucking", body: "Your baby practises the reflexes needed for life outside: yawning, swallowing amniotic fluid, sucking on fingers or thumb, even hiccuping. The diaphragm is now strong enough that hiccup spasms happen — though you usually won't feel them as the rhythmic taps for several weeks yet. Swallowed amniotic fluid is filtered through the kidneys and weed back out, exercising the urinary system." },
];

const Biology = () => (
  <section id="biology" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="relative rounded-3xl overflow-hidden border border-border/40 shadow-card-brand">
            <div className="aspect-[4/5]">
              <img src={biologyImg} alt="Soft editorial close-up of an 18-week baby curled in the gestational sac, recognisable infant profile, hand near the face, ears in final position, eyes still closed, slightly translucent skin showing faint vessels, suspended in soft luminous fluid" loading="lazy" width={1024} height={1280} className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-foreground/60 to-transparent">
              <p className="font-serif italic text-[13px] text-background/95 leading-snug">
                Fourteen centimetres. Ears in place. The week your voice starts reaching them.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <SectionLabel>What's underway biologically</SectionLabel>
          <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-5">
            A small baby practising the body — listening, moving, swallowing, becoming whole.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8] mb-8 max-w-2xl">
            Week 18 is when your baby crosses from being mostly built to being practised. Ears in place
            and listening. Muscles strong enough that movement becomes coordinated. Reflexes — yawning,
            swallowing, sucking — running quietly in the background. The anomaly scan is on the doorstep,
            and your baby's body is in the right state to be looked at carefully.
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
  { Icon: Hand, title: "What movement is starting to feel like now", body: "For people already feeling something, week 18 often brings movement that's a little harder to mistake: a definite poke, a gentle nudge, a soft thump rather than just a flutter. Most still happens low in the abdomen, often in the evening when you're settled. Movements are coming from a stronger, more coordinated baby — but they're still inconsistent, easily missed in a busy day, and not yet on a schedule." },
  { Icon: Calendar, title: "Where this week sits in the timeline", body: "Week 18 is the most common week for first-time parents to feel the first definite movement, with weeks 19–22 close behind. Second and later pregnancies have usually felt something noticeably earlier — from around week 14 or 15 — because the pattern is familiar. If you're 18 weeks and feeling small, increasing somethings, that's right on time. If you're 18 weeks and still feeling nothing, that's also still well within normal." },
  { Icon: ShieldCheck, title: "If you still haven't felt anything", body: "Several entirely normal reasons. An anterior placenta — sitting at the front of the uterus — cushions almost everything until around weeks 22–24. A first pregnancy, more abdominal muscle, body composition, or a baby positioned facing your spine all delay it. The anomaly scan in the next couple of weeks will show you a baby who has been moving constantly the whole time. The lack of feeling isn't the same as a lack of movement." },
  { Icon: HeartPulse, title: "Counting movements — not yet", body: "Formal kick-counting isn't recommended before around week 24–28, because patterns aren't established and movements are still too cushioned to count reliably. From week 24 you'll be asked to learn your baby's normal pattern and to phone if you notice a clear reduction. For now: notice gently in stillness, especially after eating or in the evening, and trust the system you're inside." },
];

const Movement = () => (
  <section id="movement" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel tone="sage">Movement now</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        Movement gathering force — what's normal at 18, and what to do if you're still waiting.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        Week 18 is one of the most common weeks for first-time parents to feel something definite. For
        many, it's a soft, repeated poke they finally trust. For others, it's still nothing — and that's
        also normal. Both pictures need different reassurance.
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
        <span className="font-semibold">Silence at 18 weeks is not silence inside.</span>{" "}
        Your baby is moving — constantly — whether you can feel it yet or not. Anterior placentas in
        particular routinely delay first noticeable movement until week 22 or later. Use the upcoming
        anomaly scan as the next checkpoint and try not to load the silence with meaning until then.
      </p>
    </div>
  </section>
);

const bodyNotes = [
  { Icon: Activity, title: "Bump rising past the navel", body: "Your uterus is now sitting at or just above the level of the navel — your midwife will start measuring the height of the fundus from this point onwards. The lower belly is firmer and visibly rounder, and most people now look pregnant in normal clothes, not just fitted ones. Many move into maternity wear properly this week if they haven't already." },
  { Icon: Hand, title: "Round ligament pain & pelvic stretching", body: "Sharp, brief pulling sensations low in the pelvis or groin — when you sneeze, stand up quickly, cough or roll over — are the round ligaments stretching to support the heavier uterus. They're harmless. A duller, deeper ache in the lower back, hips or pubic bone shows up too, as posture and the pelvic joints adjust to the rising weight." },
  { Icon: Moon, title: "Side-sleeping habit becoming useful", body: "From around week 28, official UK advice is to fall asleep on your side. Building the habit now is much easier than scrambling for it later. A pillow between the knees, one supporting the bump and one behind the back makes side-sleeping genuinely comfortable. A proper pregnancy pillow is worth the spend for many people from this stage." },
  { Icon: Wind, title: "Heartburn, breathlessness, fuller meals", body: "The rising uterus is starting to push up on the stomach and diaphragm. Smaller, more frequent meals, eating slowly, not lying flat for an hour after eating, and sleeping slightly propped up all help. A short walk after meals settles things. Gaviscon is safe in pregnancy and works well — ask your midwife or pharmacist." },
  { Icon: Eye, title: "Pigmentation, puffiness, fuller hair", body: "Linea nigra darkening down the centre of the belly. Possible patches of melasma on the cheeks, forehead or upper lip, especially after sun. Mild ankle and finger puffiness in warm weather. Hair often feels thicker because more is staying in the growth phase, and nails grow faster too. SPF on the face daily makes a real difference to pigmentation." },
  { Icon: Sun, title: "Mostly steady energy with afternoon dips", body: "For most people this is one of the more reliable-energy stretches of pregnancy, with a fairly predictable afternoon dip and the occasional flat day. Eat little and often, drink properly, say yes to a 20-minute lie down, walk in daylight when you can. If energy is consistently flat, mention it — second-trimester anaemia is very common and easily checked with a blood test." },
];

const Body = () => (
  <section id="body" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="max-w-2xl mb-10">
        <SectionLabel tone="terracotta">Your body this week</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
          Visibly pregnant, settling into the shape of the months ahead.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
          Week 18 brings a body most people read at a glance: a real bump rising above the navel, posture
          shifting forward, sleep adjusting, and the first proper hints of late-pregnancy comforts and
          discomforts arriving in low-key form.
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
    Icon: Hand, name: "Movement starting to be unmistakable",
    feels: "Repeated soft pokes from the same spot. A definite nudge after eating. A fluttery flurry in the evening when you've finally sat down. For others, still nothing — and that's still normal at 18 weeks.",
    why: "Stronger muscles, more coordinated nerves, and a baby big enough that movements occasionally reach the abdominal wall hard enough to be felt. An anterior placenta cushions all of it for weeks longer.",
    normal: "Most first pregnancies feel something definite between weeks 18 and 22. Not feeling anything yet is fine. From week 24 you'll be asked to track patterns; for now, just notice gently.",
  },
  {
    Icon: Activity, name: "Round ligament & lower-back pain",
    feels: "Sharp, brief pulling low in the pelvis or groin when you sneeze, stand quickly, cough or roll over. A duller stretching ache in the lower back, hips or pubic bone as posture changes.",
    why: "The ligaments supporting the growing uterus are stretching more visibly, and your centre of gravity is shifting forward. The pelvic joints are also softening under pregnancy hormones.",
    normal: "Very common, brief, and reassuring. Move slowly between positions, support your bump with hands or a band, and warm baths help. Persistent severe one-sided pain, pain with bleeding, or pain with fever needs a midwife call.",
  },
  {
    Icon: Wind, name: "Heartburn & indigestion",
    feels: "Burning behind the breastbone or in the throat, especially after meals or lying down. Acid taste in the mouth. A 'too full' feeling after small portions. Worse in the evening.",
    why: "Progesterone relaxes the valve at the top of the stomach, and the rising uterus presses the stomach upwards. Both let acid travel back up the oesophagus more easily.",
    normal: "Very common from now to the end of pregnancy. Smaller meals, eating slowly, not lying flat for an hour after meals, sleeping slightly propped up. Gaviscon is safe; ask your midwife or pharmacist.",
  },
  {
    Icon: Moon, name: "Vivid dreams & broken sleep",
    feels: "Strange, intense, often baby-related dreams you remember in detail. Waking more often. Difficulty getting comfortable. More frequent nighttime weeing. Restless legs in some.",
    why: "Hormonal changes affect sleep architecture. The growing bump makes positions awkward. Higher blood volume means kidneys process more fluid overnight. Iron levels affect restless legs.",
    normal: "Very common. Pillow between the knees, one supporting the bump, loo just before bed. Worsening insomnia or persistent low mood needs a midwife conversation.",
  },
  {
    Icon: Brain, name: "Pregnancy brain & forgetfulness",
    feels: "Walking into a room and forgetting why. Losing words mid-sentence. Forgetting appointments. A sense of being more easily distracted than usual.",
    why: "Hormonal shifts, sleep changes, and the cognitive load of carrying a pregnancy. Some research suggests structural brain changes that support bonding later.",
    normal: "Very common, often mocked, very real. Lists, phone reminders and saying things out loud genuinely help. It tends to lift in the months after birth.",
  },
  {
    Icon: Stethoscope, name: "Increased vaginal discharge",
    feels: "More white, milky, mild-smelling discharge than usual. Often noticeable enough to warrant a panty liner.",
    why: "Higher oestrogen levels and increased blood flow to the cervix and vaginal walls. It's part of the body's protective barrier in pregnancy.",
    normal: "Very common. Itching, burning, a strong smell, green/yellow colour, or any blood needs a GP or midwife check — thrush and bacterial vaginosis are easily treated.",
  },
  {
    Icon: Eye, name: "Linea nigra, melasma, swollen extremities",
    feels: "Faint dark line down the centre of the belly darkening. Patches of darker pigment on the cheeks, forehead or upper lip, especially after sun. Mild puffy fingers, ankles or face in warm weather.",
    why: "Pregnancy hormones increase melanin production; UV amplifies it. Higher blood volume and fluid retention cause low-level swelling, especially in heat or after standing.",
    normal: "Very common. Daily SPF on the face. Most pigmentation fades in the year after birth. Sudden severe swelling in the face or hands, especially with headache or vision changes, needs urgent contact — pre-eclampsia.",
  },
  {
    Icon: Soup, name: "Stronger appetite & specific cravings",
    feels: "Real, sustained hunger between meals. Specific cravings, sometimes for things you didn't expect. A surprising pleasure in foods you previously left.",
    why: "Your baby is growing fast and your blood volume continues to climb. Around 300 extra calories a day is the rough guide for the second trimester.",
    normal: "Very common. Aim for protein at every meal, iron-rich foods, fruit, vegetables, dairy, whole grains. Cravings for non-food items (ice, chalk, soil) need a GP check — they can signal iron deficiency.",
  },
];

const Symptoms = () => (
  <section id="symptoms" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel>Common symptoms</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        What's likely to show up at week 18 — and what each one really means.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        Week 18 brings a wider mix: clearer or still-absent movement, the start of heartburn and broken
        sleep, more visible pigmentation, a stretch of mostly steady energy with reliable afternoon dips.
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
      <Link to="/articles/second-trimester-complete-guide" className="inline-flex items-center gap-2 font-sans text-[13.5px] font-medium text-sage hover:gap-3 transition-all">
        Read: the mid second-trimester body shift <ArrowRight size={13} />
      </Link>
    </div>
  </section>
);

const emotionalTruths = [
  "Hand on the bump in the evening, half-listening, half-talking.",
  "Strangers reading the bump before you've said a word, and not always loving it.",
  "Counting the days to the anomaly scan without meaning to.",
  "A small grief for the easy lightness of pre-pregnancy mornings.",
  "Imagining the room. The cot. The first night home. Then closing the daydream quickly.",
  "Speaking to the baby out loud for the first time and feeling slightly silly and slightly devastated.",
  "Wishing the scan were tomorrow. Wishing it were further away. Both at once.",
];

const Emotional = () => (
  <section id="emotional" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 relative bg-gradient-to-br from-lavender-bg via-parchment to-lavender-bg/40 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-9 shadow-card-brand overflow-hidden">
          <img src={botanicalAccent} alt="" aria-hidden="true" className="absolute right-0 top-0 w-24 opacity-35 pointer-events-none select-none" />
          <SectionLabel tone="lavender">Emotionally this week</SectionLabel>
          <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-4">
            Visibly pregnant, quietly braced, gently in love.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/80 leading-[1.8] mb-4">
            Week 18 is when many people stop carrying pregnancy as a private thought and start carrying
            it as a publicly visible body. That brings real warmth — and a surprising amount of
            sensitivity. The bump invites comments, glances, opinions. Most are kind. Not all are.
          </p>
          <p className="font-sans text-[14px] text-foreground/70 leading-[1.75]">
            Underneath, the anomaly scan starts to take up emotional space. Wanting it. Dreading it.
            Wishing it was tomorrow. Wishing it was further away. All of that is normal in the run-up,
            and feeling more rather than less is normal too.
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
  { Icon: Calendar, title: "Confirm your anomaly-scan date and prepare for it", note: "The 20-week anomaly scan is usually offered between weeks 18 and 21. If you don't have a date, contact your midwifery team this week. It's a more detailed scan than the dating scan — the sonographer checks the baby's anatomy from head to toe. Many trusts limit how many people can come; ask in advance. Drink water before so the bladder helps push the uterus into a good position." },
  { Icon: Moon, title: "Build the side-sleeping habit, properly", note: "From around week 28, official UK advice is to fall asleep on your side because back-sleeping in late pregnancy is linked to a small increased stillbirth risk. Building the habit now makes it much easier to maintain later. A pillow between the knees, one supporting the bump and one behind the back. A proper pregnancy pillow is worth the spend for many from around now." },
  { Icon: Hand, title: "Notice movement gently, don't count yet", note: "If you're feeling something, gently notice when and where — but don't count or worry about quotas yet. If you haven't felt anything at 18 weeks, that's still within normal, especially with a first pregnancy or anterior placenta. Formal kick-counting starts from around week 24–28. For now: pay attention in stillness, especially in the evening." },
  { Icon: Apple, title: "Eat for the second trimester, properly", note: "Around 300 extra calories a day. Iron at most meals (red meat, beans, lentils, leafy greens, fortified cereals) paired with vitamin C for absorption. Calcium daily (dairy or fortified alternatives, tinned fish with bones, leafy greens). Hydrate properly — heartburn and constipation both worsen with dehydration. Smaller, more frequent meals help with reflux." },
  { Icon: Activity, title: "Pelvic floor exercises, daily", note: "Daily pelvic floor exercises from now genuinely help with bladder control later in pregnancy and recovery after birth. Squeeze (as if stopping a wee), hold for a few seconds, release. Aim for around 10 long holds and 10 quick squeezes, twice a day. The NHS Squeezy app or a daily reminder makes it actually happen." },
  { Icon: Sprout, title: "Quietly start thinking practical", note: "Not buying everything — just starting to think. Maternity-leave dates with HR. Whether you'll find out the sex at the scan. Who'll come with you. The first conversation about names. Even a single sticky note tucked in your phone helps the next few weeks feel less ambushed by big questions." },
];

const Focus = () => (
  <section id="focus" className="bg-sage-bg/35 py-16 md:py-24 border-y border-border/30">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <SectionLabel tone="sage">Focus this week</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.2rem] text-foreground leading-tight mb-4">
            Scan ready, side-sleeping, eating properly, gentle planning.
          </h2>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8]">
            Week 18 sits inside the anomaly-scan window. The point now is to be ready for it without
            living for it. Side-sleep, eat well, build pelvic-floor strength, and start thinking — not
            buying — about the practical decisions ahead.
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
  "Sudden swelling in the face, hands or feet",
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
        The bump is in front of you now, in mirrors, in shop windows, in strangers' eyes. Your baby is listening from the inside. The scan is on the calendar. Pregnancy has stopped being something secret and started being something the world is already responding to — and so are you.
      </p>
      <Heart size={14} className="text-sage/60 mx-auto mt-5" />
    </div>
  </section>
);

const reflectionPrompts = ["What I'm noticing in stillness", "What the anomaly scan brings up", "Something I want to say to the baby", "A small kindness I could give myself"];
const askChips = ["What does the 20-week scan check?", "Should I have felt movement by 18 weeks?", "Is it safe to find out the sex?", "How do I prep for the anomaly scan?", "Can the baby hear my voice now?"];

const ReflectionAsk = () => (
  <PublicWeekReflectionAsk
    week={18}
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
            The week the bump becomes the body deserves a page.
          </h3>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8] mb-6">
            The first time you spoke to the baby out loud. The day the bump felt unmistakable in the
            mirror. The note you wrote to yourself the night before the scan. The journal holds the
            small, invisible turning points of becoming a parent.
          </p>
          <ul className="space-y-2.5 mb-7">
            {["A page for the week before the anomaly scan", "Letters to your baby through every week", "Guided pages all the way to birth"].map((line) => (
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
  { slug: "20-week-anomaly-scan", img: anatomyScanImg, tag: "Scans",
    title: "What the 20-week anomaly scan actually checks",
    desc: "What the sonographer is looking for, what they can and can't see, what the results mean — and how to manage the run-up emotionally." },
  { slug: "baby-movement-in-pregnancy", img: secondMovementImg, tag: "Movement",
    title: "What first baby movements really feel like",
    desc: "Bubbles, pops, butterflies, gas — the surprisingly subtle reality of early flutters, and what to do if you haven't felt anything yet." },
  { slug: "second-trimester-complete-guide", img: secondBodyImg, tag: "Body",
    title: "The mid second-trimester body shift",
    desc: "Bump rising past the navel, posture changing, heartburn arriving — what to expect physically as the body settles into being clearly pregnant." },
  { slug: "anxiety-in-pregnancy", img: secondAnxietyImg, tag: "Mind",
    title: "When the worry doesn't lift with the calendar",
    desc: "Why pregnancy anxiety can carry on past the first trimester, and how to stay grounded as the next big scan approaches." },
  { slug: "sleep-in-pregnancy", img: secondSleepImg, tag: "Sleep",
    title: "Setting up your sleep for the months ahead",
    desc: "Why side-sleeping matters, when to start, and the small set-up tweaks that make pregnancy sleep easier from week 18 onwards." },
  { slug: "moving-your-body-in-pregnancy", img: secondMovementExImg, tag: "Movement",
    title: "Moving your body in the second trimester",
    desc: "What's safe, what helps, and how to use the energy lift while it's here. The simple rules for walking, yoga, swimming and strength." },
];

const Related = () => (
  <section id="guidance" className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div className="max-w-xl">
          <SectionLabel>Read next, because of week 18</SectionLabel>
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
  { q: "What does the 20-week anomaly scan actually check?",
    a: "It's a detailed scan of your baby's anatomy from head to toe — usually offered between 18 and 21 weeks. The sonographer systematically checks the head and brain, face, spine, heart (all four chambers, valves, blood flow), lungs, stomach, kidneys, bladder, abdominal wall, arms, legs, hands and feet (including counting fingers and toes), the placenta's position, the umbilical cord and the volume of amniotic fluid. Most major structural conditions can be detected, though some are not visible on ultrasound. You can choose to find out the baby's sex at this scan if you want." },
  { q: "Should I have felt movement by 18 weeks?",
    a: "Not necessarily. Week 18 is one of the most common weeks for first-time parents to feel something definite, but the normal range is wide — anywhere from week 16 to week 22, sometimes later. An anterior placenta (sitting at the front of the uterus) cushions movement and can delay first noticeable movement until weeks 22–24. Body composition, abdominal muscle tone, baby position and how busy your days are all change when first flutters arrive. The anomaly scan is the next big checkpoint — try not to use silence between now and then as evidence of anything." },
  { q: "Can the baby actually hear my voice now?",
    a: "Yes. The bones of the inner ear and the auditory pathways to the brain are now mature enough that your baby is picking up sound through your body — first your heartbeat, your breathing, the deep rhythm of blood through the placenta, and the muffled sound of your voice. Outside sounds reach them too, but more muffled. By week 24 hearing will be sharper still, and by birth your baby will recognise your voice and prefer it. Talking, reading or singing now is genuinely heard." },
  { q: "How do I actually prepare for the anomaly scan?",
    a: "Practical: drink water in the hour before so the bladder helps push the uterus into a good position, but don't overdo it. Wear something easy to lift up. Check how many people the trust allows in the room — many limit to one. Bring a partner, friend or family member if you can. Emotional: name the worry beforehand if you have one — not as catastrophising, but so it doesn't ambush you in the room. Plan something gentle for after, especially if it's a working day. Most scans are reassuring; a small number find something that needs a follow-up, and the team will guide you through what's next." },
  { q: "Is it safe to find out the baby's sex at the scan?",
    a: "Yes — sex assigned at the anomaly scan is correct in around 95–99% of cases, provided your baby is in a position the sonographer can see clearly. In most UK NHS trusts, if you want to know, the sonographer will tell you. A few trusts have policies of not telling, especially in earlier years; check at your dating scan or with your midwife. Many people find out at the scan; many wait. Both are completely valid choices, and you can change your mind right up to the moment." },
  { q: "I'm 18 weeks and the bump suddenly looks much bigger — is that normal?",
    a: "Yes. Around weeks 17–20 the uterus often takes a visible 'jump' as it rises above the navel, and many people who weren't obviously pregnant the week before suddenly look noticeably so. Your own bump shape depends on your height, your body composition, the position of the baby, the position of the placenta and whether it's a first or later pregnancy. Bumps come in every shape; comparison with other 18-week bumps is rarely useful. Sudden severe abdominal swelling, especially with pain, is different — that needs a midwife call." },
  { q: "Is heartburn normal at 18 weeks? What helps?",
    a: "Yes, very. Progesterone relaxes the valve at the top of the stomach, and the rising uterus pushes the stomach upwards — both let acid travel back up the oesophagus more easily. Smaller, more frequent meals; eating slowly; not lying flat for an hour after meals; sleeping slightly propped up on extra pillows; and avoiding personal trigger foods (often spicy, fatty, fizzy or very acidic) all help. Gaviscon is safe in pregnancy and works well; ranitidine and omeprazole are also safe if needed. Ask your midwife or pharmacist." },
  { q: "Should I be sleeping on my side already at 18 weeks?",
    a: "From around week 28, official UK advice is to fall asleep on your side because back-sleeping in late pregnancy is linked to a small increased stillbirth risk. At 18 weeks, the uterus isn't yet large enough for back-sleeping to compress the major blood vessels behind it, so back-sleeping is technically still safe. But building the side-sleep habit now (with a pillow between the knees, one supporting the bump and one behind the back) makes it much easier to maintain in the third trimester. Many people find a proper pregnancy pillow worth the money from this stage." },
];

const Next = () => (
  <section className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
      <div className="bg-gradient-to-br from-sage-bg via-parchment to-stage-pregnancy/30 rounded-3xl border border-border/30 p-8 sm:p-10 md:p-14 text-center shadow-card-brand">
        <SectionLabel>Up next</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.5rem] text-foreground leading-tight mb-3">Ready for week 19?</h2>
        <p className="font-sans text-[14.5px] text-foreground/75 max-w-lg mx-auto mb-8 leading-[1.8]">
          Week 19 is the final week before the anomaly scan for many. Vernix beginning to coat the skin,
          movement clearer for many, and the emotional weight of standing one week out from a major scan.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
          <Link to="/pregnancy/week/19" className="inline-flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium shadow-cta hover:bg-terracotta-hover transition-colors">
            Continue to week 19 <ArrowRight size={14} />
          </Link>
          <Link to="/pregnancy/second-trimester" className="inline-flex items-center justify-center gap-2 border border-foreground/25 text-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium hover:bg-parchment-dark transition-colors">
            Explore the second trimester
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const Week18Page = () => (
  <div className="min-h-screen bg-parchment">
    <PregnancyWeekSeo weekNumber={18} />
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
    <WeekCommonQuestions week={18} questions={buildWeekQuestions(18, faqs)} />
    <WeekSources week={18} sources={getWeekSources(18)} />
    <Next />
    <Footer />
  </div>
);

export default Week18Page;
