import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ChevronLeft, ChevronRight, Sprout, HeartPulse, Activity, Sparkles, Calendar, BookOpen,
  ArrowRight, Check, AlertTriangle, Plus, Minus, Heart, MessageCircle, Leaf, Moon,
  ShieldCheck, Stethoscope, Wind, Soup, Brain, Eye, Sun, Hand, Apple, Footprints,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PregnancyWeekSeo from "@/components/seo/PregnancyWeekSeo";
import fetusImg from "@/assets/week26-fetus.jpg";
import lettuceImg from "@/assets/week26-lettuce.jpg";
import biologyImg from "@/assets/week26-biology-detail.jpg";
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

      <div className="container mx-auto px-14 sm:px-16 md:px-10 max-w-5xl relative z-10 text-center">
        <nav aria-label="breadcrumb" className="flex items-center justify-center gap-2 mb-6 sm:mb-7 font-sans text-[12px] font-normal text-foreground/65">
          <Link to="/pregnancy" className="hover:text-foreground transition-colors">Pregnancy</Link>
          <span className="text-foreground/30">›</span>
          <Link to="/pregnancy/second-trimester" className="hover:text-foreground transition-colors">Week by week</Link>
          <span className="text-foreground/30">›</span>
          <span className="text-foreground">Week 26</span>
        </nav>

        <p className="font-sans text-[11px] font-semibold tracking-[0.3em] uppercase text-sage mb-5">
          Second trimester · The week the eyes begin to open
        </p>
        <h1 className="font-serif text-[2.5rem] sm:text-5xl md:text-[3.75rem] lg:text-[4.25rem] text-foreground leading-[1.04] tracking-tight mb-4 md:mb-5">
          26 Weeks Pregnant
        </h1>
        <p className="font-serif italic text-[1.05rem] sm:text-lg md:text-xl text-foreground/75 max-w-xl mx-auto leading-relaxed">
          Your baby is the size of a head of romaine lettuce — about 35.5 cm head to heel, around 760 grams, eyelids beginning to unfuse, movement stronger and more responsive by the day.
        </p>
      </div>

      <Link to="/pregnancy/week/25" aria-label="Go to week 25" className="absolute left-3 sm:left-6 md:left-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronLeft size={18} />
      </Link>
      <Link to="/pregnancy/week/27" aria-label="Go to week 27" className="absolute right-3 sm:right-6 md:right-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronRight size={18} />
      </Link>
    </div>

    <div className="relative -mt-28 sm:-mt-36 md:-mt-40 mb-6">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex items-end justify-center gap-5 sm:gap-10 md:gap-14">
          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-card border-[3px] border-sage/15 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={lettuceImg} alt="A leaf of romaine lettuce on a parchment background" loading="lazy" width={512} height={512} className="w-full h-full object-cover" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.04]" />
            </div>
            <div className="text-center">
              <p className="font-serif italic text-[12.5px] text-foreground/80 leading-tight">romaine lettuce</p>
              <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/55 mt-1">~35.5&nbsp;cm</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full bg-card border-[4px] border-sage/30 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={fetusImg} alt="Soft editorial illustration of a 26-week baby with eyelids beginning to unfuse, defined eyelashes, fuller rounder cheeks, thicker vernix and lanugo, longer limbs with more rounded skin from increasing fat, hand near the face, ear in detailed anatomical position, suspended in luminous amniotic fluid" width={1024} height={1024} loading="eager" decoding="async" className="w-full h-full object-cover scale-[1.02]" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.05]" />
            </div>
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.22em] uppercase text-foreground/65">Your baby this week</p>
          </div>

          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-sage-bg to-stage-pregnancy/40 border-[3px] border-sage/25 flex items-center justify-center shadow-elevated">
              <span className="font-serif text-[1.7rem] sm:text-[1.95rem] text-foreground tracking-tight leading-none">14</span>
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
  { id: "eyes", label: "Eyes & response", Icon: Eye },
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
            <p className="font-sans text-[11.5px] font-normal text-foreground/60 mt-0.5">Updated for 2026 · 14 min read · The week the eyes begin to open</p>
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
  { label: "Stage", value: "Late second trimester" },
  { label: "Baby size", value: "~35.5 cm — romaine" },
  { label: "Baby weight", value: "~760 g" },
  { label: "Trimester", value: "2 of 3 (week 26 of 27)" },
];

const AtAGlance = () => (
  <section id="at-a-glance" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl mb-14 md:mb-20">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 relative bg-gradient-to-br from-sage-bg/55 via-parchment to-stage-pregnancy/40 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-10 overflow-hidden shadow-card-brand">
        <img src={botanicalAccent} alt="" aria-hidden="true" className="absolute -left-3 bottom-0 w-28 opacity-35 pointer-events-none select-none" />
        <SectionLabel tone="sage">At a glance</SectionLabel>
        <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-5">
          Eyelids beginning to unfuse, blink and light response close, movement stronger and more responsive — the last week of the second trimester's calm middle.
        </h2>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8] mb-4">
          Inside, your baby is around 35.5 cm head to heel and weighs roughly 760 grams. The eyelids — fused
          shut since around week 9 — are now beginning to thin and unfuse, ready to open over the next week or
          two. Eyelashes are clearly defined. The lungs continue to scale up surfactant production. Sleep
          cycles, reflexes and a personal pattern of activity are all well established.
        </p>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8]">
          Outside, this is the last full week of the second trimester's calm middle. Movement is reliable
          and responsive — to your voice, to music, to bright light pressed against the bump. The bump is
          definitely visible. Side-sleep needs to become habit before week 28. The third trimester is now
          two weeks away and starts to feel close, in the best way and the slightly nervous one.
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
  { title: "Eyelids beginning to unfuse — eyes opening soon", body: "The eyelids have been fused shut since around week 9, while the underlying eye structures developed underneath. From around week 26, those eyelids start to thin and the fused edge begins to separate. Most babies open and close their eyes for the first time somewhere between weeks 26 and 28. By 28 weeks, blink reflexes are present and your baby reacts to bright light filtering through the abdominal wall — the inside of the womb is a gentle red-orange glow when sunlight catches the bump." },
  { title: "Lungs continuing to scale, alveolar buds maturing", body: "Surfactant production from type II pneumocytes continues to scale up. The alveolar buds — the future air sacs — keep multiplying and refining their structure. The capillary network around them densifies, ready to one day take over gas exchange from the placenta. None of it is functional yet, but the architecture is being built rapidly. The lungs at 26 weeks are far closer to ready than they were at 24, and that progression continues every week from now." },
  { title: "Stronger movement, recognisable response patterns", body: "Movement at 26 weeks is stronger and more coordinated than at 24. Many babies now respond audibly: jumping at a sudden loud sound, settling when a familiar voice talks softly, becoming active when music plays. The pattern of when this baby moves — and what kind of movement is normal for them — is well established. From here on, that pattern is the thing you watch for change in." },
  { title: "Brain folding, hearing fully tuned, fat laying down", body: "The cerebral cortex continues to fold rapidly into the gyri and sulci that give the brain its surface area. Hearing is fully developed; your baby clearly recognises your voice and reacts to familiar sounds. A thicker layer of subcutaneous fat is laying down, smoothing the wrinkles in the skin further. Limbs look more rounded, less long-and-thin. Faces on 4D scans now look genuinely like baby faces." },
];

const Biology = () => (
  <section id="biology" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="relative rounded-3xl overflow-hidden border border-border/40 shadow-card-brand">
            <div className="aspect-[4/5]">
              <img src={biologyImg} alt="Soft editorial anatomical illustration of a fetal eye at 26 weeks: cross-section showing eyelid beginning to unfuse, retina with developing photoreceptors, optic nerve, surrounded by botanical motifs" loading="lazy" width={1024} height={1280} className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-foreground/60 to-transparent">
              <p className="font-serif italic text-[13px] text-background/95 leading-snug">
                The eyelids beginning to thin — light response coming into reach.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <SectionLabel>What's underway biologically</SectionLabel>
          <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-5">
            A baby visibly more developed — eyelids unfusing, lungs scaling, response patterns settling into the small personality of a known person.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8] mb-8 max-w-2xl">
            Week 26 is the week the visual world starts to come within reach. The eyelids — fused since the
            first trimester — begin to thin and separate. Lungs continue scaling. Movement becomes responsive
            in ways that feel personal: this baby reacts to your voice, settles to music, jumps at sudden
            sound. The body inside the bump is becoming a person you can interact with.
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

const eyePoints = [
  { Icon: Eye, title: "Eyelids unfusing — first opening between 26 and 28 weeks", body: "The eyelids have been fused shut since around week 9, while the eye itself developed underneath. From around week 26, the fused edge begins to thin and separate. Most babies open and close their eyes for the first time somewhere between weeks 26 and 28. The eye colour at this stage isn't fixed — pigment in the iris continues to develop until well after birth, which is why some babies' eyes change colour over their first months of life." },
  { Icon: Sun, title: "Light response — what your baby can sense now", body: "By the end of this week or shortly after, your baby can sense light filtering through the abdominal wall. Bright daylight on the bump creates a gentle red-orange glow on the inside. Some babies become more active in response to bright light pressed against the skin; others quieten. There's no need to do anything special with this — your baby's visual system is being calibrated through the ambient light cycle of your day, not through deliberate stimulation." },
  { Icon: Hand, title: "Movement responsive to voice, music and sound", body: "Hearing is fully developed by now. Your baby clearly recognises your voice — the rhythm and tone heard through fluid and tissue every day. Many babies become noticeably more active when a familiar person talks, calmer when soft music plays, and may startle at sudden loud sounds. Talking, reading or singing to the bump is genuinely picked up. Partners often start to feel more connected from this point because the response is more obvious." },
  { Icon: AlertTriangle, title: "Pattern matters — keep phoning if anything changes", body: "Stronger and more responsive movement makes pattern awareness easier — and, sometimes, the contrast more obvious when something changes. The rule from week 24 still applies. A clear, sustained reduction or change in your baby's normal pattern of movement always needs a phone call to maternity triage today, not tomorrow. Don't try cold drinks or ice on the bump to wake the baby — current UK guidance is explicit that those methods aren't reliable and they delay the call." },
];

const Eyes = () => (
  <section id="eyes" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel tone="sage">Eyes opening, response settling</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        Eyelids unfusing, light response coming into reach, and movement that now responds to your voice.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        Week 26 is the week the visual and auditory worlds start to come together. The eyelids begin to
        thin and unfuse. Light response and blink reflexes follow. Movement becomes recognisably responsive
        to your voice and to sound. The baby inside the bump becomes someone you can interact with.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {eyePoints.map(({ Icon, title, body }) => (
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
        <AlertTriangle size={15} className="text-terracotta" />
      </span>
      <p className="font-sans text-[14px] text-foreground/85 leading-[1.7]">
        <span className="font-semibold">A clear, sustained reduction or change in your baby's normal pattern of movement always needs a phone call to maternity triage — today, not tomorrow.</span>{" "}
        Stronger movement at 26 weeks doesn't change the rule. Phoning early is always allowed and you will
        never be made to feel silly for it.
      </p>
    </div>
  </section>
);

const bodyNotes = [
  { Icon: Activity, title: "Fundus around 26 cm — bump definitely visible", body: "By week 26, the top of the uterus (the fundus) sits roughly 26 cm above the pubic bone — fundal height in cm continues to track closely with weeks. The bump is definitely visible now under most clothing. Posture continues to shift as your centre of gravity moves forward. Pelvic-girdle pain (PGP), lower-back ache and round-ligament twinges are common; specialist physiotherapy genuinely helps." },
  { Icon: Calendar, title: "GTT done or being done now", body: "If you've been offered an oral glucose tolerance test (OGTT) for gestational diabetes risk, this is the last clear week of the standard 24–28 week window. If it isn't booked, sort it now. Fast overnight, drink a measured glucose drink at the hospital, blood tests over a few hours. A diagnosis of gestational diabetes is very manageable — diet, monitoring, sometimes medication — and your team will support you closely from there." },
  { Icon: Moon, title: "Side-sleep is now non-negotiable from next week", body: "From week 28 — two weeks away — official UK advice (Tommy's, NHS) is to fall asleep on your side, not on your back, to reduce stillbirth risk. By the end of week 26, side-sleep should be your default position. If it isn't yet, this week is the time. Pillow between the knees, one supporting the bump, one behind the back — or a proper pregnancy pillow. If you wake on your back, just turn back onto your side." },
  { Icon: Wind, title: "Heartburn worse, mild breathlessness more common", body: "The rising uterus presses harder on the stomach and the diaphragm now. Smaller meals, eating slowly, not lying flat for an hour after eating, sleeping slightly propped up. Gaviscon is safe. Mild breathlessness on stairs and when climbing is normal — sudden severe breathlessness, breathlessness with chest pain or rapid heartbeat is not, and needs same-day assessment." },
  { Icon: Brain, title: "Braxton-Hicks more obvious for many", body: "Braxton-Hicks (practice contractions) are often clearly noticeable by week 26 — a painless tightening across the bump, lasting 30 to 60 seconds, then releasing. Often after activity, sex, or a full bladder. Drink water, lie down on your side, change position. Regular, painful or rhythmic tightenings, especially with bleeding, fluid loss, or lower-back pain, need urgent assessment for preterm labour." },
  { Icon: Footprints, title: "Mild swelling, leg cramps at night", body: "Mild puffiness in feet, ankles and hands by the end of the day is common. Night-time leg cramps — sudden sharp calf cramps that wake you up — are also common in the second half of pregnancy; flexing the foot upward, gentle calf massage and staying hydrated all help. Sudden swelling in the face or hands, or one-sided leg swelling with pain, needs urgent assessment for pre-eclampsia or DVT." },
];

const Body = () => (
  <section id="body" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="max-w-2xl mb-10">
        <SectionLabel tone="terracotta">Your body this week</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
          Bump definitely visible, GTT window closing, and side-sleep now becoming the default.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
          Week 26 is the week the body asks for a few more concessions. Heartburn worsens. Side-sleep needs
          to be the default by next week. The GTT window is in its last clear stretch. The 28-week
          appointment — first one of the third trimester — is now close.
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
    Icon: Hand, name: "Stronger, more responsive movement",
    feels: "Definite kicks and rolls, often visible from the outside. A baby who clearly responds to your voice, music, sudden loud sounds. A pattern that's now familiar — when active, when quiet, what kind of movement.",
    why: "Stronger muscles, better coordination, fully developed hearing, a baby big enough that movement consistently reaches the abdominal wall. Hearing-driven response settles in this week.",
    normal: "Pattern awareness, not magic numbers. A clear, sustained reduction or change in your baby's normal pattern always needs a phone call to maternity triage today, not tomorrow.",
  },
  {
    Icon: Wind, name: "Heartburn — worsening",
    feels: "Burning behind the breastbone or in the throat after meals or lying down. Acid taste. A 'too full' feeling after small portions. Worse in the evening, at night, and lying flat.",
    why: "Progesterone relaxes the valve at the top of the stomach. The rising uterus presses the stomach upwards and squeezes its capacity.",
    normal: "Very common from now. Smaller meals, eating slowly, not lying flat for an hour after eating, sleeping slightly propped up. Gaviscon is safe.",
  },
  {
    Icon: Activity, name: "Pelvic-girdle pain (PGP)",
    feels: "Sharp pain in the pubic bone or around the back of the pelvis. Worse with walking, climbing stairs, getting in and out of the car, rolling over in bed. Sometimes a clicking or grinding sensation.",
    why: "Pelvic joints softening under pregnancy hormones (especially relaxin) plus the asymmetric loading of a growing bump. Some pelvises tolerate it easily; others don't.",
    normal: "Common. Specialist physiotherapy genuinely helps — ask your midwife for a referral. Avoid wide-leg movements, get dressed sitting down, sleep with a pillow between the knees.",
  },
  {
    Icon: Footprints, name: "Leg cramps at night",
    feels: "Sudden, sharp calf cramps that wake you up — often in the early hours. Sometimes the foot. The muscle visibly tight. Soreness lingering the next day.",
    why: "Not fully understood. Likely a combination of weight, circulation changes, fatigue and possibly minor electrolyte shifts.",
    normal: "Very common in the second half of pregnancy. Flex the foot upward (toes towards your shin), gentle calf massage, stay well hydrated. Persistent severe cramps or one-sided leg pain with swelling needs urgent assessment for DVT.",
  },
  {
    Icon: Moon, name: "Vivid dreams & broken sleep",
    feels: "Strange, vivid, often baby-related dreams you remember in detail. Waking more often. Difficulty getting comfortable. Frequent night-time weeing.",
    why: "Hormonal changes affect sleep architecture. The growing bump makes positions awkward. Higher blood volume means kidneys process more fluid overnight.",
    normal: "Very common. Pillow set-up genuinely helps. Worsening insomnia or persistent low mood needs a midwife conversation.",
  },
  {
    Icon: Brain, name: "Braxton-Hicks, often noticeable now",
    feels: "Painless tightening across the bump that lasts 30 to 60 seconds, then releases. Often after activity, sex, or a full bladder. Sometimes barely noticeable, often clearly there at 26 weeks.",
    why: "Practice contractions of the uterus. The muscle tightening and releasing as it tones up for the eventual work of labour.",
    normal: "Very common. Drink water, lie down, change position. Regular, painful or rhythmic tightenings, or any with bleeding or fluid, need urgent assessment for preterm labour.",
  },
  {
    Icon: Stethoscope, name: "Increased vaginal discharge",
    feels: "More white, milky, mild-smelling discharge than usual. Often noticeable enough to warrant a panty liner.",
    why: "Higher oestrogen and increased blood flow to the cervix and vaginal walls. Part of the body's protective barrier in pregnancy.",
    normal: "Very common. Itching, burning, a strong smell, green/yellow colour, or any blood needs a GP or midwife check. Persistent watery leaking needs urgent check for waters.",
  },
  {
    Icon: Soup, name: "Real, sustained appetite",
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
        What's likely to show up at week 26 — and what each one really means.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        Week 26 brings stronger movement, worsening heartburn, broken sleep, leg cramps at night, Braxton-Hicks
        for many, sometimes pelvic-girdle pain. Most are normal. A few are worth flagging.
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
        Read: the late second-trimester body shift <ArrowRight size={13} />
      </Link>
    </div>
  </section>
);

const emotionalTruths = [
  "A growing sense of the baby as a person who responds.",
  "The third trimester starting to feel close — equal parts excitement and nerves.",
  "A new tenderness when speaking to the bump.",
  "Sudden tearfulness arriving at the strangest moments.",
  "Body-image weather that comes and goes through the same day.",
  "A quiet, settled steadiness running underneath it all.",
  "Fourteen more weeks. Both impossibly long and impossibly close.",
];

const Emotional = () => (
  <section id="emotional" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 relative bg-gradient-to-br from-lavender-bg via-parchment to-lavender-bg/40 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-9 shadow-card-brand overflow-hidden">
          <img src={botanicalAccent} alt="" aria-hidden="true" className="absolute right-0 top-0 w-24 opacity-35 pointer-events-none select-none" />
          <SectionLabel tone="lavender">Emotionally this week</SectionLabel>
          <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-4">
            A baby who responds — and the third trimester moving from idea into proximity.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/80 leading-[1.8] mb-4">
            Week 26 has a particular emotional flavour. The baby inside the bump is now someone who responds —
            to your voice, to music, to a hand resting on the belly. That shift, from the bump as a project
            to the bump as a person who reacts, lands differently for everyone but it lands.
          </p>
          <p className="font-sans text-[14px] text-foreground/70 leading-[1.75]">
            Underneath that, the third trimester is now two weeks away, and starts to feel close. There's
            often a small, healthy nervousness about the practical preparation still to come — and a
            growing tenderness for what's already here. Both are normal weather.
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
  { Icon: Moon, title: "Make side-sleep your default this week", note: "From week 28 — two weeks away — official UK advice is to fall asleep on your side, not on your back, to reduce stillbirth risk. By the end of week 26, side-sleep should be your default position. Pillow between the knees, one supporting the bump, one behind the back — or a proper pregnancy pillow. If you wake on your back, just turn back onto your side. Don't worry; do." },
  { Icon: Hand, title: "Keep up pattern-aware movement check-ins", note: "Same-ish time of day, somewhere quiet, hand on the bump, paying attention. There's no number to count to — you're learning your baby's individual pattern. A clear, sustained reduction or change in that pattern always needs a phone call to maternity triage today, not tomorrow. Save the maternity triage number in your phone now." },
  { Icon: Calendar, title: "GTT — do it now if it hasn't happened yet", note: "If you've been offered the OGTT for gestational diabetes risk and haven't done it, this is the last clear week of the standard 24–28 week window. Fast overnight, bring a book and a snack for after, take someone with you if possible. The drink isn't anyone's favourite, but it's tolerable. Diagnosis is very manageable." },
  { Icon: Calendar, title: "Book the 28-week appointment in your diary", note: "The 28-week appointment is a meaningful one: another full review with your midwife, blood tests (often including a repeat full blood count and antibody check), and the start of more frequent appointments. If it isn't already booked, sort it this week. If you're Rhesus negative, anti-D injection is offered around 28 weeks." },
  { Icon: Apple, title: "Iron, calcium, hydration, protein — keep going", note: "Iron at most meals (red meat, beans, lentils, leafy greens, fortified cereals) paired with vitamin C for absorption. Calcium daily. Protein at every meal. Hydrate properly. About 300 extra calories a day for the second trimester. If you feel persistently flat, mention it — second-trimester anaemia is very common and easily checked." },
  { Icon: Sprout, title: "Practical short-list — start ticking things off", note: "Pram or carrier. Car seat (legally required to leave hospital). Where the baby will sleep for the first six months — in your room, in a cot or Moses basket (official UK guidance, for safer sleep). Names. Antenatal classes booked. The hospital bag can wait, but the bigger items deserve to be researched and decided in week 26 rather than week 36." },
];

const Focus = () => (
  <section id="focus" className="bg-sage-bg/35 py-16 md:py-24 border-y border-border/30">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <SectionLabel tone="sage">Focus this week</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.2rem] text-foreground leading-tight mb-4">
            Lock in side-sleep, finish the GTT, book the 28-week appointment, start ticking off the practical list.
          </h2>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8]">
            Week 26 is the bridge into the third trimester. Side-sleep needs to be habit by next week. The
            GTT window closes. The 28-week appointment is meaningful and worth booking. The practical
            short-list deserves to be moving from research into decisions.
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
  "A clear, sustained reduction or change in your baby's normal movement pattern",
  "Heavy bright red bleeding, especially soaking a pad",
  "Severe one-sided or persistent abdominal pain",
  "Regular, painful or rhythmic tightenings (possible preterm labour)",
  "Sudden severe headache, vision changes or upper-belly pain",
  "Sudden swelling in the face, hands or feet",
  "Burning, pain or blood when you wee (possible UTI)",
  "Whole-body itching, especially hands and feet at night",
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
            Two weeks from the third trimester — the threshold for phoning is gentler, not stricter.
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
    <div className="relative bg-sage-bg/45 rounded-3xl border border-border/30 p-8 sm:p-10 md:p-14 text-center overflow-hidden">
      <span className="absolute left-7 top-6 font-serif text-4xl text-sage/40 leading-none">“</span>
      <span className="absolute right-7 bottom-4 font-serif text-4xl text-sage/40 leading-none">”</span>
      <p className="font-serif italic text-[1.2rem] sm:text-[1.35rem] md:text-[1.6rem] text-foreground/90 leading-snug max-w-3xl mx-auto">
        Seven hundred and sixty grams of small person, eyelids beginning to thin, a kick that lands in answer to your voice. Week 26 is the week the bump becomes someone you can interact with — and the third trimester comes within touching distance.
      </p>
      <Heart size={14} className="text-sage/60 mx-auto mt-5" />
    </div>
  </section>
);

const reflectionPrompts = ["What this week feels like in my body", "How my baby seems to respond", "Something I want to say to the baby", "A small kindness for myself"];
const askChips = ["When will my baby's eyes open?", "Can my baby really hear my voice now?", "How do I sleep on my side comfortably?", "When should I phone about reduced movement?", "What happens at the 28-week appointment?"];

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
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.24em] uppercase text-sage">Ask about week 26</p>
            <h3 className="font-serif text-[1.3rem] sm:text-[1.35rem] text-foreground mt-0.5 leading-snug">A question on your mind?</h3>
          </div>
        </div>
        <p className="font-sans text-[13px] text-foreground/70 leading-relaxed mb-4">Get a calm, evidence-led answer tailored to where you are right now.</p>
        <input type="text" placeholder="e.g. When will my baby's eyes open?" className="w-full bg-parchment/80 border border-border/40 rounded-full px-5 py-3.5 font-sans text-[13.5px] text-foreground placeholder:text-foreground/45 focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/30 transition-all" />
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
            The week the bump becomes someone who answers back deserves a page.
          </h3>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8] mb-6">
            The first kick that lands in response to your voice. The way the baby quietens when a particular
            song plays. The growing sense of a small personality already there. The journal holds the small,
            invisible turning points of becoming a parent — the ones nobody warns you matter.
          </p>
          <ul className="space-y-2.5 mb-7">
            {["A page for the week the bump becomes responsive", "Letters to your baby through every week", "Guided pages all the way to birth"].map((line) => (
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
  { slug: "second-trimester-movement", img: movementImg, tag: "Movement",
    title: "Pattern awareness as your baby gets stronger",
    desc: "How kicks change at 26 weeks, what counts as a real change, and exactly when to phone — without overthinking it." },
  { slug: "second-trimester-sleep", img: sleepImg, tag: "Sleep",
    title: "Side-sleep — the set-up that actually works",
    desc: "Why side-sleeping matters from week 28, the pillow set-up most people end up with, and how to make the transition gentle." },
  { slug: "second-trimester-body", img: bodyImg, tag: "Body",
    title: "The late second-trimester body shift",
    desc: "Bump definitely visible, fundus measurable, posture changing — what to expect physically as the third trimester comes close." },
  { slug: "second-trimester-anxiety", img: anxietyImg, tag: "Mind",
    title: "When the third trimester starts to feel close",
    desc: "Why week 26 brings a particular flavour of nervous excitement — and how to be gentle with it as the practical work begins." },
  { slug: "second-trimester-eating", img: eatingImg, tag: "Nutrition",
    title: "Eating well in the second trimester",
    desc: "Iron, calcium, protein, hydration — the second-trimester triangle, and how to handle real cravings without overthinking." },
  { slug: "second-trimester-movement-exercise", img: movementExImg, tag: "Movement",
    title: "Moving your body at 26 weeks",
    desc: "What still feels good, what's worth easing off, and how to use the energy you have through the last weeks of the second trimester." },
];

const Related = () => (
  <section id="guidance" className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div className="max-w-xl">
          <SectionLabel>Read next, because of week 26</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.4rem] text-foreground leading-tight">
            Curated guidance for the last full week of the second-trimester middle.
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
  { q: "When exactly will my baby's eyes open?",
    a: "The eyelids — fused shut since around week 9 — start to thin and unfuse from around week 26. Most babies open and close their eyes for the first time somewhere between weeks 26 and 28. By 28 weeks, blink reflexes are present and your baby reacts to bright light filtering through the abdominal wall (the inside of the womb is a gentle red-orange glow when sunlight catches the bump). Eye colour at this stage isn't fixed — pigment continues to develop until well after birth, which is why some babies' eye colour changes over their first months." },
  { q: "Can my baby really hear my voice now?",
    a: "Yes — clearly. Hearing is fully developed by week 26. Your baby has been hearing your voice and the rhythm of your day for weeks already, and now responds in obvious ways: becoming more active when a familiar person talks, calming when soft music plays, sometimes startling at sudden loud sounds. Talking, reading or singing to the bump is genuinely picked up. Many partners feel more connected from this point because the response is more visible." },
  { q: "How big is the baby at 26 weeks?",
    a: "Around 35.5 cm head to heel and roughly 760 grams — about the size of a head of romaine lettuce. Babies can vary by a couple of hundred grams either side and still be perfectly on track. Your midwife is now measuring fundal height (the top of the uterus to the pubic bone, in cm) at every appointment. Small variations are normal; significant under- or over-measuring sometimes prompts a growth scan." },
  { q: "Should I really be sleeping on my side already?",
    a: "Yes — it's worth being a habit by the end of week 26. Official UK advice (Tommy's, NHS) is to fall asleep on your side from week 28, not on your back, to reduce stillbirth risk. The two weeks before are the time to build the habit so it isn't a panicked switch. Pillow between the knees, one supporting the bump, one behind the back — or a proper pregnancy pillow. If you wake on your back, just turn back onto your side and go back to sleep. Don't worry; do." },
  { q: "What happens at the 28-week appointment?",
    a: "The 28-week appointment is more thorough than the 25-week one. Expect: blood pressure, urine dip, fundal height measurement, and listening to the baby's heartbeat. There are usually blood tests — typically a repeat full blood count (to check for anaemia) and antibody screen. If you're Rhesus negative, anti-D injection is offered around 28 weeks. From this appointment, you usually move into more frequent appointments, every two to four weeks. It's a meaningful checkpoint — book it now if it isn't already in the diary." },
  { q: "Why is heartburn getting worse?",
    a: "Two reasons stacking together. First, progesterone relaxes the valve at the top of the stomach, letting acid travel back up the oesophagus more easily. Second, the rising uterus presses on the stomach from below, squeezing its capacity and making reflux more likely after meals or lying down. Smaller meals, eating slowly, not lying flat for an hour after eating, and sleeping slightly propped up all help. Gaviscon is safe in pregnancy. If heartburn is severe enough to disrupt sleep or eating, your GP can prescribe stronger medication." },
  { q: "What does 'reduced movement' actually mean at 26 weeks?",
    a: "It means a clear, sustained reduction or change in your baby's normal pattern of movement — not a quiet hour, not a slow morning. By week 26, you should know your baby's particular pattern of when they're active and what kind of movement is normal for them. The thing you're watching for is a real change from that. If you notice one, phone maternity triage today, not tomorrow. Don't try cold drinks, ice on the bump or sugary snacks to wake the baby — UK guidance is explicit that those methods aren't reliable and they delay the call. Phoning early is always allowed." },
  { q: "Are leg cramps at night normal?",
    a: "Yes — very common in the second half of pregnancy. They usually feel like a sudden, sharp calf cramp that wakes you up, often in the early hours, sometimes in the foot. The cause isn't fully understood — likely a combination of weight, circulation changes, fatigue and possibly minor electrolyte shifts. When one strikes, flex the foot upward (toes towards your shin) — it usually releases the cramp within seconds. Gentle calf massage afterwards and staying well hydrated through the day both help. Persistent severe cramps, or one-sided leg pain with swelling, redness or warmth, needs urgent assessment for DVT." },
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
        <h2 className="font-serif text-[1.85rem] sm:text-[1.95rem] md:text-[2.4rem] text-foreground leading-tight">Common questions at 26 weeks</h2>
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
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.5rem] text-foreground leading-tight mb-3">Ready for week 27?</h2>
        <p className="font-sans text-[14.5px] text-foreground/75 max-w-lg mx-auto mb-8 leading-[1.8]">
          Week 27 is the last week of the second trimester — a quiet bridge into the third, with the baby's
          eyes opening, lungs continuing to mature, and the 28-week appointment now in sight.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
          <Link to="/pregnancy/week/27" className="inline-flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium shadow-cta hover:bg-terracotta-hover transition-colors">
            Continue to week 27 <ArrowRight size={14} />
          </Link>
          <Link to="/pregnancy/second-trimester" className="inline-flex items-center justify-center gap-2 border border-foreground/25 text-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium hover:bg-parchment-dark transition-colors">
            Explore the second trimester
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const Week26Page = () => (
  <div className="min-h-screen bg-parchment">
    <PregnancyWeekSeo weekNumber={26} />
    <Navbar />
    <Hero />
    <MetaBar />
    <AtAGlance />
    <Biology />
    <Eyes />
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

export default Week26Page;
