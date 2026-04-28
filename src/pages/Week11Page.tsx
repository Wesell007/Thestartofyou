import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ChevronLeft, ChevronRight, Sprout, HeartPulse, Activity, Sparkles, Calendar, BookOpen,
  ArrowRight, Check, AlertTriangle, Plus, Minus, Heart, MessageCircle, Leaf, Moon,
  Coffee, ShieldCheck, Stethoscope, Phone, Wind, Scan, Soup, Brain, Eye, Footprints, Users,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import fetusImg from "@/assets/week11-fetus.jpg";
import figImg from "@/assets/week11-fig.jpg";
import biologyImg from "@/assets/week11-biology-detail.jpg";
import journalImg from "@/assets/journal-flatlay.jpg";
import botanicalTr from "@/assets/botanical-branch-tr.png";
import botanicalBl from "@/assets/botanical-branch-bl.png";
import botanicalAccent from "@/assets/article-botanical-accent.png";
import nauseaImg from "@/assets/article-hero-nausea.jpg";
import fatigueImg from "@/assets/article-hero-fatigue.jpg";
import emotionalImg from "@/assets/article-hero-emotional-first-tri.jpg";
import testsScansImg from "@/assets/article-hero-tests-scans.jpg";
import symptomsStoppingImg from "@/assets/article-hero-symptoms-stopping.jpg";
import lifestyleImg from "@/assets/article-hero-lifestyle.jpg";

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
    <div className="relative bg-gradient-to-br from-stage-pregnancy/55 via-parchment to-sage-bg/40 pt-20 pb-36 sm:pt-24 sm:pb-44 md:pt-32 md:pb-52">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[820px] h-[420px] rounded-full bg-stage-pregnancy/30 blur-3xl" />
        <div className="absolute -top-10 right-1/4 w-[260px] h-[260px] rounded-full bg-terracotta/8 blur-3xl" />
      </div>
      <img src={botanicalBl} alt="" aria-hidden="true" className="pointer-events-none absolute top-20 left-0 w-[150px] lg:w-[210px] opacity-25 select-none hidden md:block" />
      <img src={botanicalTr} alt="" aria-hidden="true" className="pointer-events-none absolute top-20 right-0 w-[150px] lg:w-[210px] opacity-25 select-none hidden md:block" />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl relative z-10 text-center">
        <nav aria-label="breadcrumb" className="flex items-center justify-center gap-2 mb-6 sm:mb-7 font-sans text-[12px] font-normal text-foreground/65">
          <Link to="/pregnancy" className="hover:text-foreground transition-colors">Pregnancy</Link>
          <span className="text-foreground/30">›</span>
          <Link to="/pregnancy/first-trimester" className="hover:text-foreground transition-colors">Week by week</Link>
          <span className="text-foreground/30">›</span>
          <span className="text-foreground">Week 11</span>
        </nav>

        <p className="font-sans text-[11px] font-semibold tracking-[0.3em] uppercase text-terracotta mb-5">
          First trimester · The run-up to the dating scan
        </p>
        <h1 className="font-serif text-[2.5rem] sm:text-5xl md:text-[3.75rem] lg:text-[4.25rem] text-foreground leading-[1.04] tracking-tight mb-4 md:mb-5">
          11 Weeks Pregnant
        </h1>
        <p className="font-serif italic text-[1.05rem] sm:text-lg md:text-xl text-foreground/75 max-w-xl mx-auto leading-relaxed">
          Your baby is the size of a fig — and now recognisably human, with separated fingers and toes and a clear profile. The dating scan moves into clear sight, and the long quiet of the first trimester finally has a date attached.
        </p>
      </div>

      <Link to="/pregnancy/week/10" aria-label="Go to week 10" className="absolute left-3 sm:left-6 md:left-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronLeft size={18} />
      </Link>
      <Link to="/pregnancy/week/12" aria-label="Go to week 12" className="absolute right-3 sm:right-6 md:right-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronRight size={18} />
      </Link>
    </div>

    <div className="relative -mt-28 sm:-mt-36 md:-mt-40 mb-6">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex items-end justify-center gap-5 sm:gap-10 md:gap-14">
          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-card border-[3px] border-sage/15 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={figImg} alt="A single fresh fig" loading="lazy" width={512} height={512} className="w-full h-full object-cover" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.04]" />
            </div>
            <div className="text-center">
              <p className="font-serif italic text-[12.5px] text-foreground/80 leading-tight">fig</p>
              <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/55 mt-1">~4.1&nbsp;cm</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full bg-card border-[4px] border-terracotta/30 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={fetusImg} alt="Soft editorial illustration of an 11-week fetus: recognisably human profile, separated fingers and toes, formed external ears, hands near the face, suspended in the gestational sac" width={1024} height={1024} loading="eager" decoding="async" className="w-full h-full object-cover scale-[1.02]" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.05]" />
            </div>
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.22em] uppercase text-foreground/65">Your baby this week</p>
          </div>

          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-stage-pregnancy/70 to-stage-pregnancy/30 border-[3px] border-terracotta/25 flex items-center justify-center shadow-elevated">
              <span className="font-serif text-[1.7rem] sm:text-[1.95rem] text-foreground tracking-tight leading-none">29</span>
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-terracotta/15" />
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
  { id: "scan", label: "The dating scan", Icon: Scan },
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
            <p className="font-sans text-[11.5px] font-normal text-foreground/60 mt-0.5">Updated for 2026 · 12 min read · The pre-scan week</p>
          </div>
        </div>
        <nav aria-label="On this page" className="flex-1 pt-4 lg:pt-0">
          <div className="flex gap-x-1 gap-y-2 overflow-x-auto lg:flex-wrap scrollbar-none -mx-1 px-1">
            {anchors.map(({ id, label, Icon }) => (
              <a key={id} href={`#${id}`} className="group shrink-0 flex items-center gap-2 px-3 py-2 rounded-full hover:bg-stage-pregnancy/40 transition-colors">
                <span className="w-7 h-7 rounded-full bg-parchment-dark/80 border border-border/30 flex items-center justify-center group-hover:border-terracotta/30 transition-colors">
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
  { label: "Stage", value: "Late first trimester" },
  { label: "Baby size", value: "~4.1 cm — fig" },
  { label: "Baby form", value: "Recognisably human, hands at face" },
  { label: "Trimester", value: "1 of 3 (week 11 of 13)" },
];

const AtAGlance = () => (
  <section id="at-a-glance" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl mb-14 md:mb-20">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 relative bg-gradient-to-br from-stage-pregnancy/55 via-parchment to-parchment-dark/50 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-10 overflow-hidden shadow-card-brand">
        <img src={botanicalAccent} alt="" aria-hidden="true" className="absolute -left-3 bottom-0 w-28 opacity-35 pointer-events-none select-none" />
        <SectionLabel tone="terracotta">At a glance</SectionLabel>
        <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-5">
          The week the dating scan finally moves into clear sight.
        </h2>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8] mb-4">
          Inside, your baby is now around 4 cm long — almost double the size of a fortnight ago. Fingers and toes
          are fully separated, tooth buds are forming, the diaphragm is in place, and movements are becoming
          more deliberate. On a scan now, your baby looks unmistakably human.
        </p>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8]">
          Outside, you may finally be feeling the worst of nausea and fatigue starting to lift. The dating scan
          is now within 1–3 weeks for most people. The decisions about who to tell, and when, become real this
          week — even as the hope still feels too fragile to set down.
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
  { title: "Recognisably human, head to toe", body: "The proportions are still head-heavy — the head is around half the body length — but the body is straightening, the neck is forming, and your baby's profile is now distinctly human. On a scan, the rounded forehead, button nose and tucked chin are all visible. The 'tail' of earlier weeks is completely gone." },
  { title: "Separated fingers, tiny nail beds", body: "Fingers and toes are fully separated. Tiny nail beds are starting to form, although nails themselves come later. Bones in the arms and legs are beginning to harden. The hands often sit near the face on scan — your baby may look like they're touching their cheek or covering their eyes." },
  { title: "Tooth buds & forming face", body: "Tiny tooth buds for milk teeth are forming inside the gums. The outer ears have moved up to their final position on the sides of the head. Eyelids stay fused closed and won't open until around week 26. Hair follicles are beginning to form on the scalp." },
  { title: "Diaphragm, hiccups & first 'breathing'", body: "The diaphragm — the sheet of muscle that will one day power breathing — is now in place. From around this week, your baby may start practising small hiccupping movements. Real breathing won't happen for many weeks, but the rhythm of it is being rehearsed already. Kidneys are also producing urine, which is becoming part of the amniotic fluid." },
];

const Biology = () => (
  <section id="biology" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="relative rounded-3xl overflow-hidden border border-border/40 shadow-card-brand">
            <div className="aspect-[4/5]">
              <img src={biologyImg} alt="Soft editorial close-up of an 11-week fetus: separated fingers and toes, forming external ears, tooth buds in tiny jaw, diaphragm in place, suspended in the gestational sac" loading="lazy" width={1024} height={1280} className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-foreground/60 to-transparent">
              <p className="font-serif italic text-[13px] text-background/95 leading-snug">
                Four centimetres. Hands at the face. The week your baby looks like a baby.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <SectionLabel>What's underway biologically</SectionLabel>
          <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-5">
            Refining and growing — not building from scratch any more.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8] mb-8 max-w-2xl">
            The week-10 transition from embryo to fetus is now firmly behind you. Every essential organ is in
            place. The work of week 11 is refinement: faces become more defined, bones begin to harden, the
            diaphragm rehearses its first movements, and your baby practises being a body.
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

const scanPoints = [
  { Icon: Calendar, title: "When it usually happens", body: "Your NHS dating scan happens between 11 weeks and 13 weeks 6 days. Many people are scanned this week or next. If you haven't had your appointment letter yet, follow up with your midwife or GP — booking-in usually happens at 8–10 weeks and the scan invitation usually follows soon after." },
  { Icon: Scan, title: "What the sonographer measures", body: "The sonographer uses an abdominal scan (with a full bladder) to measure crown-to-rump length, which confirms or revises your due date. They check the heartbeat, look at the placenta and the gestational sac, and confirm whether you're carrying one baby or more. Most scans take 20–30 minutes." },
  { Icon: Sparkles, title: "Combined screening for chromosomal conditions", body: "You'll be offered the optional combined screening test for Down's, Edwards' and Patau's syndromes. It uses a nuchal translucency measurement (the back of your baby's neck) plus a blood test, combined with your age. It's a screening test, not diagnostic — meaning it gives a probability, not a yes/no. NIPT is a more accurate private alternative; some areas offer NHS NIPT after a higher-risk combined result." },
  { Icon: Heart, title: "What it tends to feel like in the room", body: "Many people describe a strange disconnection between the scan picture (which looks unmistakably like a baby) and how the pregnancy still feels (still a secret, still fragile). Tears are common in the room — relief, fear, recognition. Some partners go very quiet. There is no right way to react to seeing your baby on screen for the first time." },
];

const ScanSection = () => (
  <section id="scan" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel tone="terracotta">The dating scan</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        The appointment that's been the invisible date all along.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        Week 11 is when the dating scan becomes the next thing on the calendar — and for many people, the moment
        the pregnancy starts to feel real to the outside world. Knowing what to expect in the room can take some
        of the edge off the wait.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {scanPoints.map(({ Icon, title, body }) => (
        <div key={title} className="relative bg-card rounded-2xl border border-border/40 p-6 md:p-7 shadow-card-brand overflow-hidden">
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

    <div className="mt-6 bg-sage-bg/45 border border-sage/20 rounded-2xl p-6 md:p-7 flex flex-col sm:flex-row sm:items-start gap-4">
      <span className="w-10 h-10 rounded-full bg-card border border-sage/20 flex items-center justify-center shrink-0">
        <Stethoscope size={15} className="text-sage" />
      </span>
      <p className="font-sans text-[14px] text-foreground/85 leading-[1.7]">
        <span className="font-semibold">Bring someone if you can.</span>{" "}
        Even if it's just for the walk in and out. The dating scan is one of the most loaded appointments of
        early pregnancy. Most reactions, however small or however big, are normal.
      </p>
    </div>
  </section>
);

const bodyNotes = [
  { Icon: Activity, title: "A uterus around the size of a large orange", body: "Your uterus has roughly tripled in size since week 6 and is now around the size of a large orange or small grapefruit. It is just starting to rise up out of the pelvic bone — by week 12, your midwife may be able to feel the top of it just above your pubic bone. A bump is still mostly bloat, not baby." },
  { Icon: Soup, title: "Nausea easing for many — but not all", body: "By week 11 a meaningful number of people start to feel the worst of sickness lifting. For others it lingers another 2–4 weeks, and around 10% have nausea that lasts much longer. There is no rule about when relief should arrive — both timings are normal." },
  { Icon: Heart, title: "Energy slowly returning", body: "The placenta is finishing its handover from the corpus luteum. Many people notice the first afternoons in weeks where they don't need to lie down. It often comes and goes — a good day, then a backslide — before properly settling in around weeks 13–16." },
];

const Body = () => (
  <section id="body" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="max-w-2xl mb-10">
        <SectionLabel tone="terracotta">Your body this week</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
          The first signs that the worst of it might be ending.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
          Week 11 is often the first week the body starts to feel slightly more familiar again. The shift can be
          subtle — a clearer afternoon, an evening you don't fall asleep at 8pm — and it doesn't always arrive
          here. Wherever you are this week is allowed.
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
    Icon: Soup, name: "Nausea easing — for some, not yet for others",
    feels: "Better mornings followed by a wobble. A lifting that's easy to mistrust at first. For some, week 11 is a clear turning point. For others, it's just another week of queasiness. A few have a sudden, almost overnight clearing.",
    why: "hCG typically peaks around weeks 8–11 and then begins to plateau or fall. The placenta is taking over hormone production from the corpus luteum, which is part of why symptoms shift around now.",
    normal: "Both shapes are normal. If symptoms ease and you find yourself worried, that worry is normal too — and the dating scan, now within 1–3 weeks, is the natural reassurance point. If you can't keep fluids down, please see your GP.",
  },
  {
    Icon: Moon, name: "Energy starting to flicker back",
    feels: "An afternoon where you don't need to lie down. A surprise hour of feeling like yourself. Then, sometimes, a backslide the next day. The pattern is uneven before it settles.",
    why: "Progesterone is still high, but the placenta handover is mostly done. Your body has adapted to its higher blood volume. Most people see meaningful, sustained energy return between weeks 12 and 16.",
    normal: "Common at this stage. If you stay completely flattened, please mention it — first-trimester anaemia and thyroid changes are worth checking even when nausea is improving.",
  },
  {
    Icon: HeartPulse, name: "Round-ligament twinges & pelvic pulling",
    feels: "Pulling sensations low in the pelvis, often when changing position quickly. Sometimes brief sharp twinges. More noticeable now than at week 8, as the uterus rises up out of the pelvic bone.",
    why: "The uterus is now around orange-size and the round ligaments that support it are stretching more visibly. The growing weight is also starting to shift slightly forward.",
    normal: "Common and usually reassuring. Sharp, persistent one-sided pain — especially with shoulder-tip pain, dizziness or feeling faint — needs urgent assessment to rule out ectopic pregnancy.",
  },
  {
    Icon: Wind, name: "Bloating, wind & constipation",
    feels: "Trousers tight at the waist before any real bump. Slow, sluggish digestion. Going to the loo less often, or having to strain. A 'pregnant by bedtime' kind of swelling some evenings.",
    why: "Progesterone slows the digestive tract. Iron in pregnancy multivitamins can also worsen constipation. By week 11 the uterus is also pressing slightly on the bowel.",
    normal: "Very common. Drink water, eat fibre when you can, walk daily, and ask your GP about a different multivitamin if iron is making things worse. Lactulose is safe in pregnancy if needed.",
  },
  {
    Icon: Heart, name: "Sore but settling breasts",
    feels: "Still tender, but often slightly less furious than at week 8. Veins still very visible, nipples and areolas darker. A noticeable size increase is common — many people are 1–2 cup sizes up by now.",
    why: "Oestrogen and progesterone are still rising, but the rate of change is slowing. The milk-making tissue and blood supply are now well established.",
    normal: "Very common. A soft, supportive non-wired bra in your new size usually helps. Sleeping in a soft bralette can ease overnight tenderness.",
  },
  {
    Icon: Brain, name: "Mood swings & a strange anticipatory anxiety",
    feels: "Calm one minute, suddenly tearful the next. A particular flavour of anxiety building in the days before the scan. Crying at things you'd normally walk past. Big surges of love followed by big surges of fear.",
    why: "Hormones are still high but starting to fluctuate as the placenta takes over. Add the cumulative weight of weeks of holding the secret, and the looming scan, and emotional regulation gets harder.",
    normal: "Extremely common in the run-up to the dating scan. If low mood is persistent, you feel hopeless, or anxiety is intrusive, please tell your GP or midwife. Perinatal mental health support can start now.",
  },
  {
    Icon: Eye, name: "Dizziness & light-headedness",
    feels: "A wave of feeling faint when you stand up too quickly, in a hot shower, or after going too long without eating. Sometimes a brief need to sit down.",
    why: "Your blood vessels are dilating to accommodate rising blood volume. Blood pressure dips slightly in the first trimester. Low blood sugar from poor eating makes it worse.",
    normal: "Common. Stand slowly, eat small frequent snacks, sip water through the day. Persistent dizziness, fainting, palpitations, or visual changes should be checked.",
  },
  {
    Icon: Coffee, name: "Pregnancy 'glow' or skin changes",
    feels: "Some people notice their skin looking clearer or more luminous around now. Others get pregnancy acne, increased oiliness, or darker pigmentation around the nipples and on the face (melasma). Hair often feels thicker.",
    why: "Increased blood flow gives the skin more colour. Hormone levels affect oil production and pigment cells. Hair shedding slows down, which is why hair feels fuller.",
    normal: "Both ends of the spectrum are normal. Use a high SPF on the face — pigmentation changes can be triggered by sun exposure. Most pregnancy skin changes settle in the months after birth.",
  },
];

const Symptoms = () => (
  <section id="symptoms" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel>Common symptoms</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        What's likely to show up at week 11 — and what each one really means.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        Week 11 is a transition week. Symptoms can be lifting, lingering, or shifting in shape. Some people feel
        almost recovered, others feel firmly in the worst of it. None of that pattern tells you how the
        pregnancy is going.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
      {symptoms.map(({ Icon, name, feels, why, normal }) => (
        <article key={name} className="group relative bg-card rounded-2xl border border-border/40 p-6 md:p-7 shadow-card-brand hover:shadow-soft transition-all duration-500">
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
      <Link to="/articles/symptoms-stopping-in-early-pregnancy" className="inline-flex items-center gap-2 font-sans text-[13.5px] font-medium text-sage hover:gap-3 transition-all">
        Read: when symptoms ease in the run-up to 12 weeks <ArrowRight size={13} />
      </Link>
    </div>
  </section>
);

const emotionalTruths = [
  "Counting down the days to the scan as if they will go faster if you watch them.",
  "Daring to think about names — and then immediately taking it back.",
  "Wanting to tell people the second the scan is done, and not wanting to tell anyone yet.",
  "A particular flavour of anxiety building in the 48 hours before the appointment.",
  "Quietly grieving the women you don't know who didn't make it to their scan.",
  "Looking up 'what does an 11-week scan look like' six times a day.",
  "Holding hope and fear in the same hand, sometimes in the same minute.",
];

const Emotional = () => (
  <section id="emotional" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 relative bg-gradient-to-br from-lavender-bg via-parchment to-lavender-bg/40 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-9 shadow-card-brand overflow-hidden">
          <img src={botanicalAccent} alt="" aria-hidden="true" className="absolute right-0 top-0 w-24 opacity-35 pointer-events-none select-none" />
          <SectionLabel tone="lavender">Emotionally this week</SectionLabel>
          <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-4">
            Hope walking just ahead of you. Worry, just behind.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/80 leading-[1.8] mb-4">
            Week 11 is the long inhale before the dating scan. The biological risk has dropped, the body is
            starting to ease, and the appointment that will make this real to other people is finally on the
            calendar. None of that always feels like reassurance yet.
          </p>
          <p className="font-sans text-[14px] text-foreground/70 leading-[1.75]">
            Whatever shape your hope is taking — quiet, fierce, frightened, hidden — it's allowed. You don't
            have to feel safe to be safe. The next two weeks ask you to keep walking, anyway.
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
  { Icon: Scan, title: "Confirm your dating scan is in the diary", note: "Your NHS dating scan is between 11 and 14 weeks. If you haven't received an appointment yet, follow up with your midwife. Ask in advance if you can take a partner or friend, what to wear (something easy to lift), and whether to come with a full bladder (usually yes)." },
  { Icon: Sparkles, title: "Decide about screening before the scan", note: "Combined screening for Down's, Edwards' and Patau's syndromes is offered at the dating scan. Have a quick read about it and the alternative (NIPT, available privately and on the NHS in some areas) so you can make a calm, informed decision in the room." },
  { Icon: Users, title: "Think about who you'll tell — and when", note: "Many people start to widen the circle around the dating scan. Others wait until 16–20 weeks. There's no right time. Think about who you'd want around you if anything went wrong, not just who you want to celebrate with. The two answers can be different." },
  { Icon: Sprout, title: "Keep the daily basics ticking over", note: "400 micrograms of folic acid daily until 12 weeks (5 mg if your GP advised the higher dose), 10 micrograms of vitamin D daily through pregnancy. A single pregnancy multivitamin covers most of this. If iron is worsening constipation, ask your GP about a gentler alternative." },
  { Icon: Coffee, title: "Hold the line on caffeine, alcohol & food rules", note: "Caffeine under 200 mg a day (about two mugs of tea or one strong coffee). No alcohol. Skip pâté, soft mould-ripened cheeses, undercooked meat and fish high in mercury. Cooked, washed, fresh — that's the rule of thumb." },
  { Icon: Heart, title: "Be gentle with yourself in the run-up", note: "The few days before the scan are often the hardest part of the wait. Try not to schedule emotionally heavy things in the 48 hours before. Bring water, a snack, and someone to walk you in if you can. There's no medal for going alone." },
];

const Focus = () => (
  <section id="focus" className="bg-sage-bg/35 py-16 md:py-24 border-y border-border/30">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <SectionLabel tone="terracotta">Focus this week</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.2rem] text-foreground leading-tight mb-4">
            The bridge into the scan room.
          </h2>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8]">
            Week 11 doesn't ask for anything dramatic. It asks you to keep the basics steady, get the scan
            confirmed, and quietly decide who you want around you when the news widens.
          </p>
        </div>
        <div className="lg:col-span-8">
          <ol className="bg-card rounded-3xl border border-border/40 shadow-card-brand divide-y divide-border/40 overflow-hidden">
            {focusList.map(({ Icon, title, note }, i) => (
              <li key={title} className="group flex items-start gap-5 p-5 sm:p-6 md:p-7 hover:bg-sage-bg/25 transition-colors">
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

const seekSupport = [
  "Heavy bright red bleeding, especially soaking a pad",
  "Severe one-sided pain low in the belly",
  "Shoulder-tip pain, dizziness or feeling faint",
  "Vomiting that stops you keeping any fluids down (possible HG)",
  "A sudden, complete loss of all symptoms with bleeding or pain",
  "A high temperature with chills, especially with pelvic pain",
  "Burning, pain or blood when you wee (possible UTI)",
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
            Your GP, NHS 111, your local Early Pregnancy Unit (EPU), or your midwife are all good first calls.
            In an emergency dial 999 or go straight to A&E.
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
        You don't have to feel safe yet to be safe. You don't have to feel ready to be ready. The scan is a moment, not the start. The pregnancy has been quietly real for a long time.
      </p>
      <Heart size={14} className="text-sage/60 mx-auto mt-5" />
    </div>
  </section>
);

const reflectionPrompts = ["What I'm hoping for at the scan", "Who I want with me in the room", "Who I want to tell first, and when", "A small kindness I could give myself"];
const askChips = ["What does an 11-week scan look like?", "Should I have NIPT or combined screening?", "When is the safest time to tell people?", "Why do I feel anxious instead of excited?", "Is it normal for symptoms to ease at 11 weeks?"];

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
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.24em] uppercase text-sage">Ask about week 11</p>
            <h3 className="font-serif text-[1.3rem] sm:text-[1.35rem] text-foreground mt-0.5 leading-snug">A question on your mind?</h3>
          </div>
        </div>
        <p className="font-sans text-[13px] text-foreground/70 leading-relaxed mb-4">Get a calm, evidence-led answer tailored to where you are right now.</p>
        <input type="text" placeholder="e.g. What will the dating scan actually show?" className="w-full bg-parchment/80 border border-border/40 rounded-full px-5 py-3.5 font-sans text-[13.5px] text-foreground placeholder:text-foreground/45 focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/30 transition-all" />
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
            The week before the scan deserves to be remembered too.
          </h3>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8] mb-6">
            The hope you didn't dare say out loud. The list of who you wanted to tell. The 3am scrolling. The
            quiet first naming. The journal holds the small, ordinary, invisible turning points of becoming a
            parent.
          </p>
          <ul className="space-y-2.5 mb-7">
            {["A page for the week before the dating scan", "Letters to your baby through the first trimester", "Guided pages through every week, all the way to birth"].map((line) => (
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
  { slug: "first-trimester-tests-and-scans", img: testsScansImg, tag: "Care",
    title: "The dating scan: what to expect at 11–14 weeks",
    desc: "Exactly what the sonographer measures, what to wear, how to prepare, and what the optional combined screening test actually involves." },
  { slug: "first-trimester-emotional", img: emotionalImg, tag: "Emotions",
    title: "The 48 hours before the dating scan",
    desc: "Why anticipatory anxiety often peaks now, and how to carry it gently through the last few days of the wait." },
  { slug: "first-trimester-lifestyle", img: lifestyleImg, tag: "Lifestyle",
    title: "Telling people you're pregnant — when, who, and how",
    desc: "Thinking about who to tell first, when to widen the circle, and how to hold the news on your own terms." },
  { slug: "symptoms-stopping-in-early-pregnancy", img: symptomsStoppingImg, tag: "Reassurance",
    title: "When pregnancy symptoms suddenly ease",
    desc: "Why symptoms often shift around weeks 10–12, what's normal, and when an EPU visit is worth it for peace of mind." },
  { slug: "first-trimester-fatigue", img: fatigueImg, tag: "Body",
    title: "When does first-trimester tiredness lift?",
    desc: "The biology of why energy starts to return around weeks 11–14 — and what helps in the meantime." },
  { slug: "first-trimester-nausea", img: nauseaImg, tag: "Symptoms",
    title: "Nausea easing — or not — at 11 weeks",
    desc: "Why some people start to feel better around now and others don't, and what to do if sickness lingers." },
];

const Related = () => (
  <section id="guidance" className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div className="max-w-xl">
          <SectionLabel>Read next, because of week 11</SectionLabel>
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
  { q: "When will my dating scan be?",
    a: "Your NHS dating scan happens between 11 weeks and 13 weeks 6 days. For most people it is in the next 1–3 weeks. If you haven't had your appointment letter yet, contact your midwife or GP surgery — booking-in usually happens at 8–10 weeks and the scan letter usually follows soon after. The dating scan confirms how many weeks pregnant you are, checks the heartbeat, looks at the placenta, confirms how many babies you're carrying, and is the appointment where you can opt in to the combined screening test for chromosomal conditions." },
  { q: "What will the dating scan actually show?",
    a: "On screen you'll see a recognisable baby — a head with a clear profile, a tucked body, distinct arms and legs, and small movements. The sonographer will measure crown-to-rump length to confirm dating, check the heartbeat, look at the placenta and amniotic sac, and confirm whether you're carrying one baby or more. If you've opted in to combined screening, they'll also measure the nuchal translucency (the back of your baby's neck), which is paired with a blood test to estimate the chance of Down's, Edwards' and Patau's syndromes." },
  { q: "Should I have NIPT or stick with combined screening?",
    a: "Combined screening is the standard NHS offer at the dating scan and uses a nuchal translucency measurement plus a blood test. NIPT (Non-Invasive Prenatal Testing) is more accurate — it screens for the same conditions from your blood alone, with no risk to the pregnancy. NIPT is available privately from around week 10 and is offered through the NHS in some areas after a higher-risk combined result. Neither is diagnostic; only invasive tests like CVS or amniocentesis are. Worth thinking about now, before the scan, so you can make a calm decision in the room." },
  { q: "When is the safest time to tell people I'm pregnant?",
    a: "There's no single right time. Many people wait until after the dating scan at 11–14 weeks, when the chance of miscarriage has dropped further and they have a scan picture in hand. Others wait longer, until 16–20 weeks. Some tell close family earlier so they have support if anything goes wrong. A useful question is: who would you want around you if anything went wrong, not just who do you want to celebrate with? The two answers can be different. There is no obligation to perform happiness on a particular timeline." },
  { q: "Why do I feel more anxious instead of more excited as the scan gets closer?",
    a: "Anticipatory anxiety in the days before the dating scan is extremely common. The scan is the first 'official' confirmation that the pregnancy is healthy — and even if everything has felt fine, it's natural to brace. There's also a particular tenderness in the run-up because you're often imagining a possible loss in a way you haven't dared to until now. None of that means anything is wrong. Try not to schedule emotionally heavy things in the 48 hours before. Bring someone with you if you can. After the scan, the anxiety usually settles." },
  { q: "Is it normal for my symptoms to be easing at 11 weeks?",
    a: "Yes — and it's also normal if they aren't. hCG typically peaks between weeks 8 and 11 and then begins to plateau or fall, and the placenta is taking over hormone production around now. Many people notice the worst of nausea and fatigue starting to lift this week. Others have several more weeks of symptoms ahead. About 10% have nausea that lasts much longer. Easing of symptoms is generally good news. A sudden, sustained loss of all symptoms — especially with bleeding or pain — is worth getting checked at your local Early Pregnancy Unit." },
  { q: "Will I have a bump at 11 weeks?",
    a: "Probably not a real one yet. Your uterus is now around the size of a large orange and is just starting to rise out of the pelvic bone. Most first-time pregnancies don't show a true bump until somewhere between weeks 14 and 20. Second and later pregnancies often show earlier. What you may have is a 'pregnant by bedtime' bloat that looks much bigger by evening — that's mostly progesterone slowing your gut, and it's completely normal. Real, persistent bump usually settles in next trimester." },
  { q: "Can I exercise at 11 weeks pregnant?",
    a: "Yes, and gentle movement often helps with fatigue, mood and digestion. If you were active before pregnancy, you can usually continue most activities — walking, swimming, prenatal yoga, low-impact strength work, gentle cycling, jogging at a comfortable pace. Avoid contact sports, anything with a real fall risk, hot yoga, and lying flat on your back for long periods later in pregnancy. The general rule is: be able to hold a conversation while moving. If you're new to exercise, start gently with walking and swimming." },
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
        <h2 className="font-serif text-[1.85rem] sm:text-[1.95rem] md:text-[2.4rem] text-foreground leading-tight">Common questions at 11 weeks</h2>
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
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.5rem] text-foreground leading-tight mb-3">Ready for week 12?</h2>
        <p className="font-sans text-[14.5px] text-foreground/75 max-w-lg mx-auto mb-8 leading-[1.8]">
          Next week is the cultural milestone — the dating scan window opens fully, the worst of the first trimester usually fades, and the pregnancy starts to feel real to the world.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
          <Link to="/pregnancy/week/12" className="inline-flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium shadow-cta hover:bg-terracotta-hover transition-colors">
            Continue to week 12 <ArrowRight size={14} />
          </Link>
          <Link to="/pregnancy/first-trimester" className="inline-flex items-center justify-center gap-2 border border-foreground/25 text-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium hover:bg-parchment-dark transition-colors">
            Explore the first trimester
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const Week11Page = () => (
  <div className="min-h-screen bg-parchment">
    <Navbar />
    <Hero />
    <MetaBar />
    <AtAGlance />
    <Biology />
    <ScanSection />
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

export default Week11Page;
