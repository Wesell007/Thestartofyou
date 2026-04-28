import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ChevronLeft, ChevronRight, Sprout, HeartPulse, Activity, Sparkles, Calendar, BookOpen,
  ArrowRight, Check, AlertTriangle, Plus, Minus, Heart, MessageCircle, Leaf, Moon,
  Coffee, ShieldCheck, Stethoscope, Wind, Soup, Brain, Eye, Users, Sun, Hand, Smile,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import fetusImg from "@/assets/week13-fetus.jpg";
import peapodImg from "@/assets/week13-peapod.jpg";
import biologyImg from "@/assets/week13-biology-detail.jpg";
import journalImg from "@/assets/journal-flatlay.jpg";
import botanicalTr from "@/assets/botanical-branch-tr.png";
import botanicalBl from "@/assets/botanical-branch-bl.png";
import botanicalAccent from "@/assets/article-botanical-accent.png";
import emotionalImg from "@/assets/article-hero-emotional-first-tri.jpg";
import testsScansImg from "@/assets/article-hero-tests-scans.jpg";
import symptomsStoppingImg from "@/assets/article-hero-symptoms-stopping.jpg";
import secondBodyImg from "@/assets/article-hero-second-body.jpg";
import secondAnxietyImg from "@/assets/article-hero-second-anxiety.jpg";
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
    <div className="relative bg-gradient-to-br from-stage-pregnancy/55 via-parchment to-sage-bg/45 pt-20 pb-36 sm:pt-24 sm:pb-44 md:pt-32 md:pb-52">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[820px] h-[420px] rounded-full bg-stage-pregnancy/30 blur-3xl" />
        <div className="absolute -top-10 right-1/4 w-[260px] h-[260px] rounded-full bg-sage/10 blur-3xl" />
      </div>
      <img src={botanicalBl} alt="" aria-hidden="true" className="pointer-events-none absolute top-20 left-0 w-[150px] lg:w-[210px] opacity-25 select-none hidden md:block" />
      <img src={botanicalTr} alt="" aria-hidden="true" className="pointer-events-none absolute top-20 right-0 w-[150px] lg:w-[210px] opacity-25 select-none hidden md:block" />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl relative z-10 text-center">
        <nav aria-label="breadcrumb" className="flex items-center justify-center gap-2 mb-6 sm:mb-7 font-sans text-[12px] font-normal text-foreground/65">
          <Link to="/pregnancy" className="hover:text-foreground transition-colors">Pregnancy</Link>
          <span className="text-foreground/30">›</span>
          <Link to="/pregnancy/second-trimester" className="hover:text-foreground transition-colors">Week by week</Link>
          <span className="text-foreground/30">›</span>
          <span className="text-foreground">Week 13</span>
        </nav>

        <p className="font-sans text-[11px] font-semibold tracking-[0.3em] uppercase text-terracotta mb-5">
          The threshold week · First → second trimester
        </p>
        <h1 className="font-serif text-[2.5rem] sm:text-5xl md:text-[3.75rem] lg:text-[4.25rem] text-foreground leading-[1.04] tracking-tight mb-4 md:mb-5">
          13 Weeks Pregnant
        </h1>
        <p className="font-serif italic text-[1.05rem] sm:text-lg md:text-xl text-foreground/75 max-w-xl mx-auto leading-relaxed">
          Your baby is the size of a peapod — and the placenta is now firmly running the show. The first trimester is closing, the worst of it may be lifting, and the next stage is just beginning to come into focus. Quietly, cautiously, things are shifting.
        </p>
      </div>

      <Link to="/pregnancy/week/12" aria-label="Go to week 12" className="absolute left-3 sm:left-6 md:left-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronLeft size={18} />
      </Link>
      <Link to="/pregnancy/week/14" aria-label="Go to week 14" className="absolute right-3 sm:right-6 md:right-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronRight size={18} />
      </Link>
    </div>

    <div className="relative -mt-28 sm:-mt-36 md:-mt-40 mb-6">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex items-end justify-center gap-5 sm:gap-10 md:gap-14">
          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-card border-[3px] border-sage/15 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={peapodImg} alt="A fresh peapod opened to show three peas" loading="lazy" width={512} height={512} className="w-full h-full object-cover" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.04]" />
            </div>
            <div className="text-center">
              <p className="font-serif italic text-[12.5px] text-foreground/80 leading-tight">peapod</p>
              <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/55 mt-1">~7.4&nbsp;cm</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full bg-card border-[4px] border-sage/30 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={fetusImg} alt="Soft editorial illustration of a 13-week fetus: recognisable human profile, hands at the face, intestines moving from the cord into the abdomen, gently curled in the gestational sac" width={1024} height={1024} loading="eager" decoding="async" className="w-full h-full object-cover scale-[1.02]" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.05]" />
            </div>
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.22em] uppercase text-foreground/65">Your baby this week</p>
          </div>

          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-sage-bg to-stage-pregnancy/40 border-[3px] border-sage/25 flex items-center justify-center shadow-elevated">
              <span className="font-serif text-[1.7rem] sm:text-[1.95rem] text-foreground tracking-tight leading-none">27</span>
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
  { id: "threshold", label: "The threshold", Icon: Sun },
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
            <p className="font-sans text-[11.5px] font-normal text-foreground/60 mt-0.5">Updated for 2026 · 12 min read · The threshold week</p>
          </div>
        </div>
        <nav aria-label="On this page" className="flex-1 pt-4 lg:pt-0">
          <div className="flex gap-x-1 gap-y-2 overflow-x-auto lg:flex-wrap scrollbar-none -mx-1 px-1">
            {anchors.map(({ id, label, Icon }) => (
              <a key={id} href={`#${id}`} className="group shrink-0 flex items-center gap-2 px-3 py-2 rounded-full hover:bg-stage-pregnancy/40 transition-colors">
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
  { label: "Stage", value: "Threshold of second trimester" },
  { label: "Baby size", value: "~7.4 cm — peapod" },
  { label: "Baby weight", value: "~23 g" },
  { label: "Trimester", value: "1 closing → 2 beginning" },
];

const AtAGlance = () => (
  <section id="at-a-glance" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl mb-14 md:mb-20">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 relative bg-gradient-to-br from-stage-pregnancy/55 via-parchment to-sage-bg/55 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-10 overflow-hidden shadow-card-brand">
        <img src={botanicalAccent} alt="" aria-hidden="true" className="absolute -left-3 bottom-0 w-28 opacity-35 pointer-events-none select-none" />
        <SectionLabel tone="terracotta">At a glance</SectionLabel>
        <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-5">
          The week the first trimester quietly closes its door.
        </h2>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8] mb-4">
          Inside, your baby has nearly doubled in size in a fortnight. Vocal cords are starting to form, the
          intestines are moving from the umbilical cord into the abdomen where they belong, and tiny
          fingerprints are appearing on fully separated fingers. The placenta is now fully in charge of
          hormones — the corpus luteum's work is done.
        </p>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8]">
          Outside, many people feel the worst of nausea and fatigue genuinely beginning to lift. The miscarriage
          risk has dropped sharply. None of that always feels like permission to relax. Week 13 is a threshold,
          not a finish line — and it is allowed to feel both like progress and like a strange, vulnerable in-between.
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
  { title: "Body lengthening, head finally catching down", body: "Your baby is around 7.4 cm crown-to-rump now — almost double the size of a fortnight ago. The body is lengthening faster than the head, so proportions are gradually evening out. The neck is more defined, allowing the head to lift slightly, and arms have grown to roughly proportional length while legs are still catching up." },
  { title: "Intestines moving home", body: "Until around week 12, your baby's intestines have been growing inside the umbilical cord because there isn't yet room in the tiny abdomen. This week, they finish migrating into the abdominal cavity, where they'll keep developing. It's one of the quietest, most important transitions of the first trimester." },
  { title: "Vocal cords, fingerprints & milk teeth", body: "Vocal cords are beginning to form — the structures that will one day produce the first cry. Tiny unique fingerprints are appearing on fully separated fingers and toes. All twenty milk-tooth buds are now in place inside the gums. None of this is visible yet on a scan, but it's all happening underneath." },
  { title: "Placenta firmly in charge", body: "The placenta is now fully running the show. It's making the hormones, delivering oxygen and nutrients, and removing waste through the umbilical cord. The corpus luteum that supported the pregnancy until now is gently retired. This handover is a big part of why symptoms shift around weeks 11–14." },
];

const Biology = () => (
  <section id="biology" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="relative rounded-3xl overflow-hidden border border-border/40 shadow-card-brand">
            <div className="aspect-[4/5]">
              <img src={biologyImg} alt="Soft editorial close-up of a 13-week fetus: lengthening body, intestines retracting from the cord, separated fingers with forming prints, eyelids fused, formed external ears, suspended in the gestational sac" loading="lazy" width={1024} height={1280} className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-foreground/60 to-transparent">
              <p className="font-serif italic text-[13px] text-background/95 leading-snug">
                Seven centimetres. The intestines coming home. The week the first trimester lets go.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <SectionLabel>What's underway biologically</SectionLabel>
          <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-5">
            Refining, lengthening, taking up residence properly.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8] mb-8 max-w-2xl">
            The frantic build of the first trimester is largely done. Every essential organ is in place. The
            work of week 13 is settling in: stretching the body, finishing the placental handover, moving
            the intestines into their final home, and laying down the structures — vocal cords, fingerprints,
            tooth buds — that make this baby unmistakably theirs.
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

const thresholdPoints = [
  { Icon: Sun, title: "The risk profile genuinely shifts", body: "By week 13, the chance of miscarriage has dropped to around 1–2% from this point onwards, compared with 10–15% earlier in the first trimester. That's a real, measurable change. It doesn't make every fear go away, and it isn't zero — but the shape of the worry is allowed to shift, even if the worry itself doesn't disappear overnight." },
  { Icon: Sprout, title: "The placenta is now the engine", body: "The corpus luteum on your ovary has handed over hormone production to the placenta. The placenta will now grow with your baby, deliver everything they need, and produce the hormones that maintain the pregnancy. This is a huge biological transition — and is part of why nausea and fatigue often start to lift this week or next." },
  { Icon: Calendar, title: "Most people are just past the dating scan", body: "If your scan was at 11 or 12 weeks, you may now be holding a scan picture and a confirmed due date for the first time. Some people feel a wave of relief; others feel a strange flatness. Both are normal. The dating scan changes the public reality of the pregnancy — it doesn't always change the private one straight away." },
  { Icon: Users, title: "Telling people is genuinely on the table", body: "Many people choose this week to widen the circle — close family, close friends, sometimes work. Others wait until the anomaly scan around week 20. There's no right time. A useful frame: who would you want around you if anything went wrong, not just who do you want to celebrate with? The two answers can be different." },
];

const Threshold = () => (
  <section id="threshold" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel tone="terracotta">The threshold</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        Crossing into the second trimester — quietly, not all at once.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        Week 13 is the threshold week. Some people count it as the last of the first trimester, others as the
        first of the second — both are right. What matters is what's actually changing this week, biologically
        and emotionally, and how rarely those two things move at the same speed.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {thresholdPoints.map(({ Icon, title, body }) => (
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
        <span className="font-semibold">You're allowed to feel cautious.</span>{" "}
        Statistics shifting and bodies easing don't always translate into feeling safe. It can take weeks longer
        to settle inside, especially after a previous loss or a long road to here. Both timings are normal.
      </p>
    </div>
  </section>
);

const bodyNotes = [
  { Icon: Activity, title: "Uterus rising up out of the pelvis", body: "Your uterus has now risen above the pubic bone and your midwife may be able to feel the top of it (the fundus) in your lower abdomen. This is part of why some people start to notice a small, recognisable thickening — the very first hint of bump for some, still mostly bloat for others." },
  { Icon: Soup, title: "Nausea and aversions easing for many", body: "By week 13, the majority of people start to feel the worst of sickness lifting. Foods that had been impossible may suddenly become tolerable again. For the 10–20% of people whose nausea continues, the symptoms are no less real — and worth flagging again to your GP if they're stopping you eating or drinking." },
  { Icon: Moon, title: "Energy returning in waves, not a rush", body: "The placenta has finished its handover and is now producing hormones efficiently. Many people notice their first proper afternoon without needing to lie down. It often comes in patches — a clear day, then a tired day — before settling between weeks 14 and 16. Going gently is still allowed." },
];

const Body = () => (
  <section id="body" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="max-w-2xl mb-10">
        <SectionLabel tone="terracotta">Your body this week</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
          The body that survived the hardest stretch is being given back to you.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
          For many people, week 13 is the first week the body starts to feel slightly recognisable again. The
          shift is usually gradual rather than sudden, and it doesn't always arrive on schedule. Wherever you
          are this week is allowed.
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
    Icon: Soup, name: "Nausea easing — for many, not yet for everyone",
    feels: "More mornings where you don't immediately feel sick. Hunger returning. Some foods becoming possible again that hadn't been for weeks. For some people, the lift is striking. For others, week 13 is just another week of nausea.",
    why: "hCG has peaked and is now falling. The placenta is fully producing hormones in a steadier pattern than the corpus luteum did. The biggest hormonal shock is, biologically, behind you.",
    normal: "Both shapes are normal. If sickness continues much past week 14, mention it to your midwife — for some it lasts well into the second trimester. If you can't keep fluids down, please contact your GP urgently.",
  },
  {
    Icon: Moon, name: "Energy slowly returning",
    feels: "An afternoon you don't have to lie down. A whole hour where you forget you're tired. Then a backslide. The pattern is uneven before it settles around weeks 14–16.",
    why: "The placenta handover is complete and oxygen-carrying capacity is improving. Your body has adapted to higher blood volume. Progesterone is still high, but the rate of change is calmer now.",
    normal: "Common at this stage. If you stay flattened, please mention it — anaemia and thyroid changes are worth checking even when nausea is improving.",
  },
  {
    Icon: HeartPulse, name: "Round ligament pulling & stretching",
    feels: "A pulling sensation low in the pelvis when you move quickly, sneeze, or change position. Sometimes brief, sharp twinges. More noticeable now than at week 9 because the uterus has risen out of the pelvic bone.",
    why: "The round ligaments that hold the uterus in place are stretching as it grows up and forward. The weight of the uterus is shifting too, pulling on supporting structures.",
    normal: "Common and reassuring. Sharp, persistent one-sided pain — especially with shoulder-tip pain or feeling faint — needs urgent assessment. Ectopic pregnancy is unlikely this late, but always worth ruling out.",
  },
  {
    Icon: Wind, name: "Bloating, wind & sluggish digestion",
    feels: "Trousers tight at the waist before any real bump. Slow, sluggish gut. A 'pregnant by bedtime' kind of swelling some evenings. Going to the loo less often or having to strain.",
    why: "Progesterone slows the digestive tract. Iron in pregnancy multivitamins worsens constipation. The growing uterus also presses on the bowel.",
    normal: "Very common. Drink water, eat fibre, walk daily, and ask your GP about a different multivitamin if iron is making things worse. Lactulose is safe in pregnancy.",
  },
  {
    Icon: Heart, name: "Breasts changing shape, less furious",
    feels: "Often less acutely tender now than at week 8. Veins still very visible, nipples and areolas darker. Often 1–2 cup sizes larger by now, with a slightly fuller shape.",
    why: "Oestrogen and progesterone are still rising but the rate of change is slowing. The milk-making tissue is established and the body has adapted.",
    normal: "Very common. A soft, supportive non-wired bra in your new size usually helps. Many people notice colostrum from much later (around 16+ weeks). Earlier is also normal.",
  },
  {
    Icon: Brain, name: "A strange emotional in-between",
    feels: "Calmer one moment, irritable the next. A particular flatness or anticlimax after the dating scan. Tearful at unexpected moments. Big, sudden surges of love followed by big, sudden surges of fear.",
    why: "Hormones are stabilising rather than spiking, but the cumulative weight of three months of holding the secret, plus identity shift, plus the sudden public reality after the scan, is real.",
    normal: "Extremely common. If low mood is persistent, you feel hopeless, or anxiety is intrusive, please tell your GP or midwife. Perinatal mental health support can start now.",
  },
  {
    Icon: Eye, name: "Pregnancy 'glow' or skin pigmentation",
    feels: "Some people notice clearer, more luminous skin. Others see pregnancy acne, oilier skin, or darker patches around the nipples and on the face (melasma). Some notice a faint dark line down the belly (linea nigra) starting to appear.",
    why: "Increased blood flow gives skin more colour. Pregnancy hormones affect oil and pigment cells. Pigmentation changes are amplified by sun exposure.",
    normal: "Both ends are normal. Wear high SPF on the face. Most pregnancy skin changes settle in the months after birth.",
  },
  {
    Icon: Hand, name: "Nasal congestion & nosebleeds",
    feels: "A blocked-feeling nose for no reason. Occasional nosebleeds. A slightly croaky voice in the mornings. More dramatic snoring than usual, sometimes flagged by a partner.",
    why: "Higher blood volume swells the tiny vessels lining the nose. Pregnancy oestrogen also causes some swelling of the nasal mucosa. It's known as 'pregnancy rhinitis' and is very common from the late first trimester.",
    normal: "Very common. Saline sprays and a humidifier at night can help. Heavy or prolonged nosebleeds, or breathing problems, should be checked.",
  },
];

const Symptoms = () => (
  <section id="symptoms" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel>Common symptoms</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        Easing for some, lingering for others — both are normal at week 13.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        Week 13 is a transition. Symptoms can be lifting, lingering, or shifting in shape. Some people feel
        almost themselves again, others feel firmly inside the worst of it. Neither pattern tells you anything
        about how the pregnancy is going.
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
        Read: when symptoms ease around the 12–14 week mark <ArrowRight size={13} />
      </Link>
    </div>
  </section>
);

const emotionalTruths = [
  "Wanting to celebrate and not quite knowing how to let yourself.",
  "A strange anticlimax after the dating scan you'd been counting down to.",
  "Daring to imagine a nursery — and quietly taking it back.",
  "Telling someone, then being surprised at how exposed it feels.",
  "Quietly grieving the people you know who didn't reach this week.",
  "A sense that the secret has been heavy for longer than you realised.",
  "Holding cautious relief and unfinished worry in the same breath.",
];

const Emotional = () => (
  <section id="emotional" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 relative bg-gradient-to-br from-lavender-bg via-parchment to-lavender-bg/40 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-9 shadow-card-brand overflow-hidden">
          <img src={botanicalAccent} alt="" aria-hidden="true" className="absolute right-0 top-0 w-24 opacity-35 pointer-events-none select-none" />
          <SectionLabel tone="lavender">Emotionally this week</SectionLabel>
          <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-4">
            Cautious relief — not yet permission to settle.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/80 leading-[1.8] mb-4">
            Week 13 is the long exhale that doesn't quite arrive. The risk has dropped, the body is easing,
            the pregnancy is becoming public. None of that always feels like safety. The mind takes longer to
            cross the threshold than the calendar does.
          </p>
          <p className="font-sans text-[14px] text-foreground/70 leading-[1.75]">
            You don't have to feel ready for the next stage to be in it. You don't have to feel safe yet to be
            safe. The first trimester has been long. The slow softening that follows is allowed to take its
            own time.
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
  { Icon: Calendar, title: "Make sure your booking & midwife care are set up", note: "If you haven't met your midwife yet (the booking-in appointment usually happens at 8–10 weeks but can run later), now is the time to chase it. Your antenatal schedule, the anomaly scan at 18–21 weeks, and any extra care for high-risk pregnancies all flow from this." },
  { Icon: Users, title: "Decide who you want to tell, and when", note: "Many people widen the circle around now. Family, close friends, sometimes work. Others wait until after the anomaly scan at week 20. There's no right time. A useful question: who would you want around you if anything went wrong, not just who you want to celebrate with?" },
  { Icon: Stethoscope, title: "Tell your employer when it feels right", note: "Legally in the UK you must tell your employer at least 15 weeks before your due date (so by around week 25), but most people choose to tell sooner so they can access pregnancy-related rights — paid time off for antenatal appointments, risk assessment of your role, and protection from pregnancy-related dismissal." },
  { Icon: Sprout, title: "Adjust supplements: drop folic acid, keep vitamin D", note: "From week 12, you can stop the 400 microgram folic acid (the neural tube has fully formed). 10 micrograms of vitamin D continues all the way through pregnancy and breastfeeding. A single pregnancy multivitamin covers most of what you need from here." },
  { Icon: Coffee, title: "Hold the line on caffeine, alcohol & food rules", note: "Caffeine under 200 mg a day. No alcohol. Skip pâté, soft mould-ripened cheeses, undercooked meat and fish high in mercury. The rules don't change as you cross into the second trimester — they just become more familiar." },
  { Icon: Heart, title: "Let the cautious relief in, in your own time", note: "You don't have to celebrate to be allowed to be pregnant. Some people feel a wave of relief in week 13, some feel it gradually over the next month, and some never quite stop bracing. All of those are valid responses to a long, quiet first trimester." },
];

const Focus = () => (
  <section id="focus" className="bg-sage-bg/35 py-16 md:py-24 border-y border-border/30">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <SectionLabel tone="terracotta">Focus this week</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.2rem] text-foreground leading-tight mb-4">
            Small, quiet decisions for the new stage.
          </h2>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8]">
            Week 13 doesn't ask for anything dramatic. It asks you to settle the practicalities — care, who
            knows, work, supplements — so the second trimester has somewhere steady to begin from.
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
  "Vomiting that stops you keeping any fluids down",
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
            Your midwife (now your first port of call), your GP, NHS 111, your local Early Pregnancy Unit, or
            triage at your hospital are all good first calls. In an emergency dial 999 or go straight to A&E.
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
        Crossing into the second trimester does not mean leaving the first behind. Some part of you is still walking through it. That part is allowed to take as long as it needs to catch up.
      </p>
      <Heart size={14} className="text-sage/60 mx-auto mt-5" />
    </div>
  </section>
);

const reflectionPrompts = ["What I'm letting myself feel this week", "Who I want to tell, and who I'm not ready to", "What I'm cautiously hoping for", "A small kindness I could give myself"];
const askChips = ["Am I in the second trimester at week 13?", "Why don't I feel relief after the dating scan?", "When should I tell my employer?", "Why does my belly suddenly feel different?", "Is it normal to still feel sick at 13 weeks?"];

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
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.24em] uppercase text-sage">Ask about week 13</p>
            <h3 className="font-serif text-[1.3rem] sm:text-[1.35rem] text-foreground mt-0.5 leading-snug">A question on your mind?</h3>
          </div>
        </div>
        <p className="font-sans text-[13px] text-foreground/70 leading-relaxed mb-4">Get a calm, evidence-led answer tailored to where you are right now.</p>
        <input type="text" placeholder="e.g. Am I in the second trimester yet?" className="w-full bg-parchment/80 border border-border/40 rounded-full px-5 py-3.5 font-sans text-[13.5px] text-foreground placeholder:text-foreground/45 focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/30 transition-all" />
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
            The week the secret begins to soften deserves a page.
          </h3>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8] mb-6">
            The first time you said it out loud. The relief that didn't quite arrive. The cautious naming of
            things. The journal holds the small, ordinary, invisible turning points of becoming a parent.
          </p>
          <ul className="space-y-2.5 mb-7">
            {["A page for the close of the first trimester", "Letters to your baby through every week", "Guided pages all the way to birth"].map((line) => (
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
    title: "What changes as you cross into the second trimester",
    desc: "From rising uterus and lifting energy to the first real bump — what to expect physically as the second trimester begins." },
  { slug: "first-trimester-emotional", img: emotionalImg, tag: "Emotions",
    title: "When relief doesn't arrive on time",
    desc: "Why crossing the 12-week threshold doesn't always feel like permission to celebrate, and what to do with the lingering caution." },
  { slug: "first-trimester-lifestyle", img: lifestyleImg, tag: "Lifestyle",
    title: "Telling people you're pregnant — when, who, and how",
    desc: "Thinking about who to tell first, when to widen the circle, and how to hold the news on your own terms." },
  { slug: "first-trimester-tests-and-scans", img: testsScansImg, tag: "Care",
    title: "After the dating scan: what comes next",
    desc: "The midwife schedule, the anomaly scan at 20 weeks, and the appointments that shape the rest of pregnancy." },
  { slug: "second-trimester-anxiety", img: secondAnxietyImg, tag: "Mind",
    title: "Anxiety in early second trimester",
    desc: "Why the worry doesn't always disappear with the calendar, and how to stay grounded as the pregnancy becomes more public." },
  { slug: "symptoms-stopping-in-early-pregnancy", img: symptomsStoppingImg, tag: "Reassurance",
    title: "When pregnancy symptoms suddenly ease",
    desc: "What it means, why it usually happens around now, and when an EPU visit is worth it for peace of mind." },
];

const Related = () => (
  <section id="guidance" className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div className="max-w-xl">
          <SectionLabel>Read next, because of week 13</SectionLabel>
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
  { q: "Am I in the first or the second trimester at 13 weeks?",
    a: "It depends who you ask. Some sources count week 13 as the last week of the first trimester (with the second trimester starting at week 14), others count week 13 as the start of the second trimester. Both are common. What matters biologically is that the placenta has now fully taken over hormone production, the chance of miscarriage has dropped sharply, and the worst of the early symptoms is starting to ease for many people. Whichever you call it, week 13 is a real threshold." },
  { q: "Why don't I feel relief after the dating scan?",
    a: "Anticlimax after the dating scan is extremely common, and it doesn't mean you don't love this baby. You've been bracing for weeks. The body and mind don't switch out of survival mode the moment a sonographer says everything looks fine. Cautious relief, flatness, even a wave of exhaustion are all normal. The settling usually happens gradually over the next few weeks, especially as energy returns and a real bump appears." },
  { q: "When should I tell my employer I'm pregnant?",
    a: "Legally in the UK you have to tell your employer at least 15 weeks before your due date — so by around week 25. Most people tell sooner. Telling earlier means you can access pregnancy-related rights: paid time off for antenatal appointments, a workplace risk assessment for your role, and protection from pregnancy-related dismissal. Many people choose to tell after the dating scan or once they have a clear due date. There's no perfect timing — pick what feels manageable for you and your role." },
  { q: "Should I still be worried about miscarriage at 13 weeks?",
    a: "Statistically, the chance of miscarriage from week 13 onwards is around 1–2%, compared with 10–15% earlier in the first trimester. That's a real and meaningful drop. But statistics don't always translate into how you feel, especially after a previous loss or a long wait to here. It is normal for the cautious watchfulness to take longer than the calendar to settle. If you have specific worries, speak to your midwife." },
  { q: "Will I have a real bump now?",
    a: "Probably not yet, but you might be starting to notice a small thickening low in the belly. Your uterus has just risen out of the pelvis and your midwife may now be able to feel the top of it. Most first-time pregnancies don't show a clear bump until weeks 14–20. Second and later pregnancies often show earlier. What you may have is the 'pregnant by bedtime' bloat that looks much bigger by evening — that's progesterone slowing your gut, not the bump itself." },
  { q: "Is it normal to still feel sick at 13 weeks?",
    a: "Yes. Around 10–20% of people still have nausea at week 13. For most, it eases over the next 2–4 weeks. Around 10% have nausea that lasts much longer, sometimes through pregnancy. If you can keep food and fluids down, you're tolerating things, and your weight is steady, ongoing nausea is uncomfortable but not dangerous. If you can't keep fluids down, are losing weight, or are exhausted from the sickness, contact your GP — there are treatments that help." },
  { q: "Can I sleep on my back at 13 weeks?",
    a: "Yes — at 13 weeks, sleeping on your back is generally fine. The uterus isn't yet large enough to compress the major blood vessels behind it (the inferior vena cava), so there's no real concern this early. From around week 28, the official UK guidance is to fall asleep on your side because back-sleeping in late pregnancy is linked to a small increased risk of stillbirth. For now, sleep in whatever position feels comfortable — your body will tell you when it stops working." },
  { q: "Should I be doing pelvic floor exercises now?",
    a: "Yes, and the earlier you start the better. Pelvic floor muscles support the uterus, bladder and bowel, and they take real strain through pregnancy and birth — both vaginal and caesarean. A few minutes a day of slow squeezes (hold for 5–10 seconds) and quick squeezes (a second or two each) builds strength and control. The Squeezy app is recommended by NHS pelvic-health physios. Starting now means an easier recovery later." },
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
        <h2 className="font-serif text-[1.85rem] sm:text-[1.95rem] md:text-[2.4rem] text-foreground leading-tight">Common questions at 13 weeks</h2>
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
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.5rem] text-foreground leading-tight mb-3">Ready for week 14?</h2>
        <p className="font-sans text-[14.5px] text-foreground/75 max-w-lg mx-auto mb-8 leading-[1.8]">
          The second trimester begins to feel real next week. Energy lifts further for many, appetite often
          returns, and the first hint of a real bump sometimes appears.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
          <Link to="/pregnancy/week/14" className="inline-flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium shadow-cta hover:bg-terracotta-hover transition-colors">
            Continue to week 14 <ArrowRight size={14} />
          </Link>
          <Link to="/pregnancy/second-trimester" className="inline-flex items-center justify-center gap-2 border border-foreground/25 text-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium hover:bg-parchment-dark transition-colors">
            Explore the second trimester
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const Week13Page = () => (
  <div className="min-h-screen bg-parchment">
    <Navbar />
    <Hero />
    <MetaBar />
    <AtAGlance />
    <Biology />
    <Threshold />
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

export default Week13Page;
