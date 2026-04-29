import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Sprout,
  HeartPulse,
  Activity,
  Sparkles,
  Calendar,
  BookOpen,
  ArrowRight,
  Check,
  AlertTriangle,
  Plus,
  Minus,
  Heart,
  MessageCircle,
  Leaf,
  Moon,
  Coffee,
  ShieldCheck,
  Stethoscope,
  Phone,
  Wind,
  Scan,
  Soup,
  Brain,
  Eye,
  Footprints,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import fetusImg from "@/assets/week10-fetus.jpg";
import strawberryImg from "@/assets/week10-strawberry.jpg";
import biologyImg from "@/assets/week10-biology-detail.jpg";
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

/* Shared label */
const SectionLabel = ({ children, tone = "sage" }: { children: React.ReactNode; tone?: "sage" | "terracotta" | "lavender" }) => {
  const toneCls =
    tone === "terracotta" ? "text-terracotta"
    : tone === "lavender" ? "text-lavender-foreground"
    : "text-sage";
  return (
    <div className="flex items-center gap-3 mb-3.5">
      <span className={`h-px w-7 bg-current opacity-50 ${toneCls}`} />
      <p className={`font-sans text-[11px] font-semibold tracking-[0.26em] uppercase ${toneCls}`}>{children}</p>
    </div>
  );
};

/* 1. HERO */
const Hero = () => (
  <section className="relative overflow-hidden">
    <div className="relative bg-gradient-to-br from-stage-pregnancy/55 via-parchment to-sage-bg/40 pt-20 pb-36 sm:pt-24 sm:pb-44 md:pt-32 md:pb-52">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[820px] h-[420px] rounded-full bg-stage-pregnancy/30 blur-3xl" />
        <div className="absolute -top-10 right-1/4 w-[260px] h-[260px] rounded-full bg-terracotta/8 blur-3xl" />
      </div>
      <img src={botanicalBl} alt="" aria-hidden="true"
        className="pointer-events-none absolute top-20 left-0 w-[150px] lg:w-[210px] opacity-25 select-none hidden md:block" />
      <img src={botanicalTr} alt="" aria-hidden="true"
        className="pointer-events-none absolute top-20 right-0 w-[150px] lg:w-[210px] opacity-25 select-none hidden md:block" />

      <div className="container mx-auto px-14 sm:px-16 md:px-10 max-w-5xl relative z-10 text-center">
        <nav aria-label="breadcrumb" className="flex items-center justify-center gap-2 mb-6 sm:mb-7 font-sans text-[12px] font-normal text-foreground/65">
          <Link to="/pregnancy" className="hover:text-foreground transition-colors">Pregnancy</Link>
          <span className="text-foreground/30">›</span>
          <Link to="/pregnancy/first-trimester" className="hover:text-foreground transition-colors">Week by week</Link>
          <span className="text-foreground/30">›</span>
          <span className="text-foreground">Week 10</span>
        </nav>

        <p className="font-sans text-[11px] font-semibold tracking-[0.3em] uppercase text-terracotta mb-5">
          First trimester · The embryo becomes a fetus
        </p>
        <h1 className="font-serif text-[2.5rem] sm:text-5xl md:text-[3.75rem] lg:text-[4.25rem] text-foreground leading-[1.04] tracking-tight mb-4 md:mb-5">
          10 Weeks Pregnant
        </h1>
        <p className="font-serif italic text-[1.05rem] sm:text-lg md:text-xl text-foreground/75 max-w-xl mx-auto leading-relaxed">
          Your baby is the size of a strawberry — and this week is a quiet milestone: the embryo officially becomes a fetus. Every essential organ is now in place. From here on, the work is mostly growing and refining.
        </p>
      </div>

      <Link to="/pregnancy/week/9" aria-label="Go to week 9"
        className="absolute left-3 sm:left-6 md:left-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronLeft size={18} />
      </Link>
      <Link to="/pregnancy/week/11" aria-label="Go to week 11"
        className="absolute right-3 sm:right-6 md:right-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronRight size={18} />
      </Link>
    </div>

    <div className="relative -mt-28 sm:-mt-36 md:-mt-40 mb-6">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex items-end justify-center gap-5 sm:gap-10 md:gap-14">
          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-card border-[3px] border-sage/15 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={strawberryImg} alt="A single strawberry" loading="lazy" width={512} height={512}
                className="w-full h-full object-cover" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.04]" />
            </div>
            <div className="text-center">
              <p className="font-serif italic text-[12.5px] text-foreground/80 leading-tight">strawberry</p>
              <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/55 mt-1">~3.1&nbsp;cm</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full bg-card border-[4px] border-terracotta/30 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={fetusImg}
                alt="Soft editorial illustration of a 10-week fetus: distinct human form with large head, eyelids fused closed, separated fingers and toes, arms bent at the elbow, suspended in the gestational sac"
                width={1024} height={1024}
                loading="eager" decoding="async"
                className="w-full h-full object-cover scale-[1.02]" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.05]" />
            </div>
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.22em] uppercase text-foreground/65">Your baby this week</p>
          </div>

          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-stage-pregnancy/70 to-stage-pregnancy/30 border-[3px] border-terracotta/25 flex items-center justify-center shadow-elevated">
              <span className="font-serif text-[1.7rem] sm:text-[1.95rem] text-foreground tracking-tight leading-none">30</span>
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

/* 2. META BAR */
const anchors = [
  { id: "at-a-glance", label: "At a glance", Icon: Sparkles },
  { id: "biology", label: "Embryo to fetus", Icon: Sprout },
  { id: "milestone", label: "The transition", Icon: Footprints },
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
            <p className="font-sans text-[13px] font-medium text-foreground leading-snug">
              ✔ Medically reviewed by Jenny Joines
            </p>
            <p className="font-sans text-[11.5px] font-normal text-foreground/60 mt-0.5">
              Updated for 2026 · 12 min read · The embryo-to-fetus week
            </p>
          </div>
        </div>
        <nav aria-label="On this page" className="flex-1 pt-4 lg:pt-0">
          <div className="flex gap-x-1 gap-y-2 overflow-x-auto lg:flex-wrap scrollbar-hide -mx-1 px-1">
            {anchors.map(({ id, label, Icon }) => (
              <a key={id} href={`#${id}`}
                className="group shrink-0 flex items-center gap-2 px-3 py-2 rounded-full hover:bg-stage-pregnancy/40 transition-colors">
                <span className="w-7 h-7 rounded-full bg-parchment-dark/80 border border-border/30 flex items-center justify-center group-hover:border-terracotta/30 transition-colors">
                  <Icon size={12} className="text-sage" />
                </span>
                <span className="font-sans text-[12px] font-medium text-foreground/80 group-hover:text-foreground whitespace-nowrap">
                  {label}
                </span>
              </a>
            ))}
          </div>
        </nav>
      </div>
    </div>
  </section>
);

/* 3. AT A GLANCE */
const glanceFacts = [
  { label: "Stage", value: "Late first trimester" },
  { label: "Baby size", value: "~3.1 cm — strawberry" },
  { label: "Baby form", value: "Officially a fetus, recognisably human" },
  { label: "Trimester", value: "1 of 3 (final fortnight)" },
];

const AtAGlance = () => (
  <section id="at-a-glance" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl mb-14 md:mb-20">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 relative bg-gradient-to-br from-stage-pregnancy/55 via-parchment to-parchment-dark/50 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-10 overflow-hidden shadow-card-brand">
        <img src={botanicalAccent} alt="" aria-hidden="true"
          className="absolute -left-3 bottom-0 w-28 opacity-35 pointer-events-none select-none" />
        <SectionLabel tone="terracotta">At a glance</SectionLabel>
        <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-5">
          The week your baby officially becomes a fetus.
        </h2>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8] mb-4">
          Inside, your baby is around 3 cm long and looks recognisably human for the first time. Fingers and toes
          have separated, the tail is gone, eyelids have fused closed and won't open until around week 26. Every
          essential organ is now formed. From here, pregnancy is mostly growth and refinement.
        </p>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8]">
          Outside, you may be just past the worst of nausea and fatigue — or still firmly in it. The dating scan
          is now within sight. Many people describe week 10 as the strange in-between: closer to safety, but
          still carrying private worry, still not telling most people.
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

/* 4. BIOLOGY */
const biologyPoints = [
  { title: "A recognisably human form", body: "The disproportionately large head is still very obvious, but the body is straightening. Arms bend at the elbow, legs are extending, the neck is forming. The 'tail' that was visible in earlier weeks has now disappeared. From the outside (on a scan) your baby looks like a tiny baby for the first time." },
  { title: "Separated fingers & toes", body: "The webbing between fingers and toes is gone. Tiny nail beds are starting to form. Bones in the arms and legs are beginning to harden. Your baby can now make small, twitchy movements — though you won't feel anything for many weeks yet." },
  { title: "A face with features", body: "Eyes are fully formed but the eyelids have fused closed and will stay closed until around week 26. The upper lip and outer ears are taking shape. Tiny tooth buds for milk teeth are forming inside the gums. The head is still around half the total body length." },
  { title: "Every essential organ in place", body: "The heart now has four chambers, beating at around 170 bpm. Kidneys are starting to make urine. The liver makes blood cells. The intestines are still partly developing inside the umbilical cord and will move into the abdomen over the coming weeks. From here, the work is mostly growing and refining." },
];

const Biology = () => (
  <section id="biology" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="relative rounded-3xl overflow-hidden border border-border/40 shadow-card-brand">
            <div className="aspect-[4/5]">
              <img src={biologyImg} alt="Soft editorial close-up of a 10-week fetus: recognisable human profile, separated fingers and toes, developing skeleton visible through translucent skin, vital organs in place, suspended in the gestational sac"
                loading="lazy" width={1024} height={1280}
                className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-foreground/60 to-transparent">
              <p className="font-serif italic text-[13px] text-background/95 leading-snug">
                Three centimetres. Every essential organ in place. Officially a fetus.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <SectionLabel>What's underway biologically</SectionLabel>
          <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-5">
            From building from scratch — to growing what's already there.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8] mb-8 max-w-2xl">
            Week 10 is the quiet milestone medical textbooks call the embryonic-fetal transition. The phase of
            building organs from nothing is essentially over. Every essential structure your baby will be born
            with is now in place. The work from here is mostly growing, refining, practising movement, and
            putting on weight.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {biologyPoints.map((p, i) => (
              <div key={p.title}
                className="relative bg-card rounded-2xl border border-border/40 p-6 md:p-7 shadow-card-brand">
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

/* 5. THE TRANSITION — week 10 unique */
const milestonePoints = [
  { Icon: Sprout, title: "Why this week has its own name", body: "Medically, the term 'embryo' refers to the period of organ formation — roughly weeks 5–10. From week 10 onwards, your baby is called a fetus. It's not just a label change: it marks the end of the most vulnerable developmental window. The biggest single risks of major structural malformation are now behind you." },
  { Icon: Scan, title: "What your dating scan will see", body: "Your NHS dating scan happens between 11 and 14 weeks — usually in the next 1–4 weeks. By then your baby will be moving visibly on screen, kicking and turning. The sonographer measures crown-to-rump length to confirm dating, checks the heartbeat, and offers the optional combined screening test for chromosomal conditions." },
  { Icon: HeartPulse, title: "How the risk picture changes from now on", body: "Once a heartbeat is confirmed at 8+ weeks and the pregnancy reaches week 10, the chance of miscarriage drops significantly — to roughly 1–2% of remaining pregnancies. The fear doesn't always shift in step with the statistics. But biologically, you are entering a much more stable phase." },
  { Icon: Sparkles, title: "Optional screening to think about", body: "Around week 10–13 you can choose Non-Invasive Prenatal Testing (NIPT) — a private blood test screening for Down's, Edwards' and Patau's syndromes from your blood alone, with no risk to the pregnancy. It is offered through the NHS in some areas after a higher-risk combined screening result. Worth thinking about now, before the dating scan, if you want it." },
];

const Milestone = () => (
  <section id="milestone" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel tone="terracotta">The embryo-to-fetus transition</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        A quiet medical milestone — and a real shift in the risk picture.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        Week 10 is one of the most under-celebrated milestones in pregnancy. Nothing visibly changes. Nobody
        marks it. But biologically, you've crossed into a much more stable phase — and the dating scan, when
        much of the world finally finds out, is now within sight.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {milestonePoints.map(({ Icon, title, body }) => (
        <div key={title}
          className="relative bg-card rounded-2xl border border-border/40 p-6 md:p-7 shadow-card-brand overflow-hidden">
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
        <span className="font-semibold">Reassurance doesn't always arrive on schedule.</span>{" "}
        You may know rationally that the risk has dropped and still feel afraid. That gap between the statistics
        and the feeling is normal — and it usually narrows after the dating scan, not before.
      </p>
    </div>
  </section>
);

/* 6. BODY */
const bodyNotes = [
  { Icon: Activity, title: "A uterus the size of a grapefruit", body: "Your uterus has roughly doubled in size since week 6 and is now around the size of a large grapefruit. It hasn't yet risen above the pelvic bone, so most people don't have a visible bump yet — but waistbands feel tighter and clothes start to sit differently." },
  { Icon: Soup, title: "Nausea may be easing — or not", body: "For some people, week 10 is when sickness starts to lift. For others, it lingers another 2–4 weeks. About 10% have nausea that lasts much longer. Energy often comes back before food smells stop being a problem. Both timings are completely normal." },
  { Icon: Heart, title: "Skin and hair changes appearing", body: "Some people notice glowing skin, thicker hair, or for the first time in weeks — feeling almost like themselves again. Others get pregnancy acne, increased oil production, or darker pigmentation around the nipples and on the face (melasma). Hormones are rebalancing." },
];

const Body = () => (
  <section id="body" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="max-w-2xl mb-10">
        <SectionLabel tone="terracotta">Your body this week</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
          Almost through the hardest stretch — but not quite.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
          Week 10 is often the threshold week. For some people, energy starts to return and nausea begins to
          fade. For others, it's still firmly the first trimester. Both are completely normal, and neither
          tells you anything about how the pregnancy is progressing.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {bodyNotes.map(({ Icon, title, body }) => (
          <div key={title}
            className="relative bg-card rounded-2xl border border-border/40 p-6 md:p-7 shadow-card-brand overflow-hidden">
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

/* 7. SYMPTOMS */
const symptoms = [
  {
    Icon: Soup, name: "Nausea — easing for some, not yet for others",
    feels: "For many, the all-day queasiness starts to wobble — better some days, then back the next. For others, week 10 still feels firmly in the worst of it. A few have it lift quite suddenly around now.",
    why: "hCG levels typically peak around weeks 8–11 and start to plateau or fall after that. Most people feel the change within a couple of weeks. Why some bodies clear it faster than others is genuinely not understood.",
    normal: "Both 'still terrible' and 'noticeably better' are normal at week 10. If you're suddenly worried about loss of symptoms, that worry itself is normal at this stage. If you can't keep fluids down, please see your GP — HG is treatable.",
  },
  {
    Icon: Moon, name: "Energy starting to flicker back",
    feels: "Some afternoons feel almost normal again. Some days you remember what it was like to want to do something. Other days you're back on the sofa at 7pm. The pattern is uneven rather than a clean recovery.",
    why: "Your placenta is now mostly taking over hormone production from the corpus luteum. This handover usually completes around week 10–12 and is a major reason fatigue starts to lift through the second trimester.",
    normal: "Very common. Most people see meaningful energy return between weeks 12 and 16. If you stay completely flattened, please mention it — first-trimester anaemia and thyroid changes are worth checking.",
  },
  {
    Icon: HeartPulse, name: "Cramping, pulling & round ligament twinges",
    feels: "A pulling or stretching sensation low in the pelvis, often when you change position quickly, sneeze, or stand up. Sometimes sharp brief twinges. More noticeable than in earlier weeks.",
    why: "Your uterus is now around grapefruit-size and the round ligaments that support it are stretching. Increased blood flow also adds pressure. This is the start of round ligament discomfort that often peaks in the second trimester.",
    normal: "Common and usually reassuring. Sharp, persistent one-sided pain — especially with shoulder-tip pain, dizziness or feeling faint — needs urgent assessment to rule out ectopic pregnancy.",
  },
  {
    Icon: Wind, name: "Bloating, wind & constipation",
    feels: "Trousers tight at the waist before any real bump. Slow, sluggish digestion. Going to the loo less often, or having to strain. Sometimes wind that surprises you.",
    why: "Progesterone slows your digestive tract significantly. Iron in pregnancy multivitamins can also worsen constipation. By week 10 your uterus is also pressing slightly more on the bowel.",
    normal: "Very common. Drink water, eat fibre when you can, walk daily, and ask your GP about a different multivitamin if iron is making things worse. A stool softener like lactulose is safe in pregnancy if needed.",
  },
  {
    Icon: Heart, name: "Sore but settling breasts",
    feels: "Still tender for many people, but often slightly less furious than at week 7. Veins still very visible, nipples and areolas darker. A noticeable size increase is common — many people are 1–2 cup sizes up by now.",
    why: "Oestrogen and progesterone are still rising, but the rate of change is slowing. The milk-making tissue and blood supply are now well established.",
    normal: "Very common. A soft, supportive non-wired bra in your new size usually helps. Sleeping in a soft bralette can ease overnight tenderness.",
  },
  {
    Icon: Brain, name: "Mood swings & emotional fragility",
    feels: "Crying at adverts. Sudden irritation with the same things you tolerated yesterday. Big surges of love, then big surges of fear, sometimes inside the same hour. A sense of being slightly outside yourself.",
    why: "Hormone levels are at extreme highs and the placenta handover means they're also fluctuating, not just rising. Add disturbed sleep and persistent symptoms, and emotional regulation gets very hard.",
    normal: "Extremely common in late first trimester. If low mood is persistent, you feel hopeless, or anxiety is intrusive, please tell your GP or midwife. Perinatal mental health support can start now and is genuinely effective.",
  },
  {
    Icon: Eye, name: "Dizziness or light-headedness",
    feels: "A wave of feeling faint when you stand up too quickly, in a hot shower, or after going too long without eating. Sometimes a brief need to sit down.",
    why: "Your blood vessels are dilating to accommodate a 50% rise in blood volume across pregnancy. Blood pressure dips slightly in the first trimester. Low blood sugar from poor eating makes it worse.",
    normal: "Common. Stand slowly, eat small frequent snacks, sip water through the day. Persistent dizziness, fainting, palpitations, or visual changes should be checked by your GP.",
  },
  {
    Icon: Coffee, name: "Headaches",
    feels: "A dull, persistent ache, often forehead or behind the eyes. Worse when tired, dehydrated, or hungry. Sometimes triggered by a sudden cut in caffeine.",
    why: "Hormonal shifts, increased blood volume, dehydration, missed meals and caffeine reduction all contribute. Headaches are very common in the first trimester for these reasons combined.",
    normal: "Common. Water, regular small meals, rest and paracetamol (taken according to the pack) are usually enough. Sudden severe headache, headache with visual changes, or one that doesn't respond to paracetamol needs to be checked.",
  },
];

const Symptoms = () => (
  <section id="symptoms" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel>Common symptoms</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        What's likely to show up at week 10 — and what each one really means.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        Week 10 is a transitional week. Symptoms can be lifting, lingering, or even shifting in shape. Some
        people feel almost recovered, others feel firmly in the worst of it. None of that pattern tells you
        how the pregnancy is going.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
      {symptoms.map(({ Icon, name, feels, why, normal }) => (
        <article key={name}
          className="group relative bg-card rounded-2xl border border-border/40 p-6 md:p-7 shadow-card-brand hover:shadow-soft transition-all duration-500">
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
      <Link to="/articles/symptoms-stopping-in-early-pregnancy"
        className="inline-flex items-center gap-2 font-sans text-[13.5px] font-medium text-sage hover:gap-3 transition-all">
        Read: when symptoms ebb and flow at 10 weeks <ArrowRight size={13} />
      </Link>
    </div>
  </section>
);

/* 8. EMOTIONAL */
const emotionalTruths = [
  "Knowing the risk has dropped — and still bracing every time you go to the loo.",
  "Counting down the days to the dating scan as if they will go faster if you watch them.",
  "Looking up 'embryo to fetus' six times in a week, just to feel the change is real.",
  "Wanting to tell people, then immediately not wanting to tell anyone yet.",
  "Feeling almost normal one afternoon, then back on the sofa by 7pm — and worried about both.",
  "Quietly grieving the easier version of you who could just live a normal day.",
  "Holding both 'this is going to be okay' and 'I daren't say that out loud yet' at the same time.",
];

const Emotional = () => (
  <section id="emotional" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 relative bg-gradient-to-br from-lavender-bg via-parchment to-lavender-bg/40 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-9 shadow-card-brand overflow-hidden">
          <img src={botanicalAccent} alt="" aria-hidden="true"
            className="absolute right-0 top-0 w-24 opacity-35 pointer-events-none select-none" />
          <SectionLabel tone="lavender">Emotionally this week</SectionLabel>
          <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-4">
            Closer to safety, but not yet able to feel it.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/80 leading-[1.8] mb-4">
            Week 10 is a strange in-between. The biological risk has genuinely dropped — but the body and the
            heart don't always catch up at the same speed as the statistics. The dating scan is now the
            invisible date you're walking towards.
          </p>
          <p className="font-sans text-[14px] text-foreground/70 leading-[1.75]">
            Whatever shape your hope is taking right now — quiet, fierce, frightened, hidden — it's allowed.
            You don't have to feel the right things to be doing this beautifully.
          </p>
        </div>

        <div className="lg:col-span-3 bg-card rounded-3xl border border-border/40 p-7 sm:p-8 md:p-9 shadow-card-brand">
          <p className="font-sans text-[11px] font-semibold tracking-[0.24em] uppercase text-sage mb-4">
            What this week often looks like
          </p>
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

/* 9. FOCUS */
const focusList = [
  { Icon: Scan, title: "Get your dating scan booked, if it isn't already", note: "Your NHS dating scan is between 11 and 14 weeks. If you haven't received an appointment yet, follow up with your midwife — booking-in usually happens at 8–10 weeks and the scan letter usually follows. If you'd like NIPT or a private reassurance scan first, this is a good week to think about it." },
  { Icon: Sprout, title: "Keep the daily basics ticking over", note: "400 micrograms of folic acid daily until 12 weeks (5 mg if your GP advised the higher dose), 10 micrograms of vitamin D daily through pregnancy. A single pregnancy multivitamin covers most of this. If iron is worsening constipation, ask your GP about a gentler alternative." },
  { Icon: Soup, title: "Start eating slightly more like usual, if you can", note: "If nausea is easing, this is a good week to gently widen what you eat — protein, vegetables, dairy, whole grains, oily fish twice a week (avoiding the high-mercury ones). No pressure to eat perfectly. Whatever stays down still wins." },
  { Icon: Phone, title: "Make sure your booking-in appointment is done", note: "If you haven't had your booking-in appointment with the midwife yet, this is the week to chase it. The booking covers blood tests, bloods, blood pressure, your medical history, and your maternity plan. It usually takes around an hour and is one of the most important antenatal contacts." },
  { Icon: Coffee, title: "Hold the line on caffeine, alcohol & food rules", note: "Caffeine under 200 mg a day (about two mugs of tea or one strong coffee). No alcohol. Skip pâté, soft mould-ripened cheeses, undercooked meat and fish high in mercury. Cooked, washed, fresh — that's the rule of thumb. The bar lowers; the basics don't change." },
  { Icon: Heart, title: "Decide who you want to tell — and when", note: "Many people start to widen the circle around the dating scan. Others wait until 16–20 weeks. There's no right time. Think about who you'd want around you if anything went wrong, not just who you want to celebrate with. The two answers can be different." },
];

const Focus = () => (
  <section id="focus" className="bg-sage-bg/35 py-16 md:py-24 border-y border-border/30">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <SectionLabel tone="terracotta">Focus this week</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.2rem] text-foreground leading-tight mb-4">
            The bridge into the dating scan.
          </h2>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8]">
            Week 10 doesn't ask for anything dramatic. It asks you to keep the basics steady, get the scan in
            the diary, and make a few quiet decisions about who you want around you when the news widens.
          </p>
        </div>
        <div className="lg:col-span-8">
          <ol className="bg-card rounded-3xl border border-border/40 shadow-card-brand divide-y divide-border/40 overflow-hidden">
            {focusList.map(({ Icon, title, note }, i) => (
              <li key={title}
                className="group flex items-start gap-5 p-5 sm:p-6 md:p-7 hover:bg-sage-bg/25 transition-colors">
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

/* 10. SEEK SUPPORT */
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
            Your GP, NHS 111, your local Early Pregnancy Unit (EPU), or — once booked — your midwife are
            all good first calls. In an emergency dial 999 or go straight to A&E.
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

/* 11. QUOTE */
const Quote = () => (
  <section className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl pb-16 md:pb-24">
    <div className="relative bg-sage-bg/45 rounded-3xl border border-border/30 p-8 sm:p-10 md:p-14 text-center overflow-hidden">
      <span className="absolute left-7 top-6 font-serif text-4xl text-sage/40 leading-none">“</span>
      <span className="absolute right-7 bottom-4 font-serif text-4xl text-sage/40 leading-none">”</span>
      <p className="font-serif italic text-[1.2rem] sm:text-[1.35rem] md:text-[1.6rem] text-foreground/90 leading-snug max-w-3xl mx-auto">
        The risk has dropped. The fear hasn't, not yet. Both things can be true. You're not failing to feel safe — you're just walking the last bit of the long quiet before the world finally finds out.
      </p>
      <Heart size={14} className="text-sage/60 mx-auto mt-5" />
    </div>
  </section>
);

/* 12. REFLECTION + ASK */
const reflectionPrompts = ["How my body feels today", "What I'm hoping for at the dating scan", "Who I want to tell first", "A small kindness I could give myself"];
const askChips = ["What does the embryo-to-fetus transition mean?", "When is my dating scan?", "Should I have NIPT?", "Why am I still so tired at 10 weeks?", "Is it normal for symptoms to suddenly ease?"];

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
            <span key={p} className="font-sans text-[11.5px] font-medium bg-sage-bg/70 text-foreground/80 rounded-full px-3 py-1.5 border border-sage/20">
              {p}
            </span>
          ))}
        </div>
        <textarea rows={4} placeholder="Write your thoughts here… this is just for you."
          className="w-full bg-parchment/80 border border-border/40 rounded-xl px-4 py-3.5 font-sans text-[13.5px] text-foreground placeholder:text-foreground/45 resize-none focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/30 transition-all leading-relaxed" />
        <Link to="/auth"
          className="inline-flex items-center gap-2 mt-4 bg-terracotta text-terracotta-foreground rounded-pill px-5 py-2.5 font-sans text-[13px] font-medium hover:bg-terracotta-hover transition-colors">
          Save reflection to your journal <ArrowRight size={12} />
        </Link>
      </div>

      <div className="bg-card rounded-3xl border border-border/40 border-t-2 border-t-lavender/50 p-7 sm:p-8 md:p-9 shadow-card-brand">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-9 h-9 rounded-full bg-lavender-bg flex items-center justify-center shrink-0">
            <MessageCircle size={14} className="text-lavender-foreground" />
          </span>
          <div className="min-w-0">
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.24em] uppercase text-sage">Ask about week 10</p>
            <h3 className="font-serif text-[1.3rem] sm:text-[1.35rem] text-foreground mt-0.5 leading-snug">A question on your mind?</h3>
          </div>
        </div>
        <p className="font-sans text-[13px] text-foreground/70 leading-relaxed mb-4">
          Get a calm, evidence-led answer tailored to where you are right now.
        </p>
        <input type="text" placeholder="e.g. What will the dating scan actually show?"
          className="w-full bg-parchment/80 border border-border/40 rounded-full px-5 py-3.5 font-sans text-[13.5px] text-foreground placeholder:text-foreground/45 focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/30 transition-all" />
        <p className="font-sans text-[10.5px] font-semibold tracking-[0.22em] uppercase text-foreground/55 mt-5 mb-2.5">
          Popular at this stage
        </p>
        <div className="flex flex-wrap gap-2">
          {askChips.map((c) => (
            <Link key={c} to="/ask"
              className="font-sans text-[12px] font-medium text-foreground/80 bg-parchment-dark/60 border border-border/40 hover:border-sage/50 hover:text-foreground px-3.5 py-1.5 rounded-full transition-colors">
              {c}
            </Link>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* 13. JOURNAL */
const Journal = () => (
  <section className="bg-sage-bg/40 py-16 md:py-24 border-y border-border/30">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="bg-card rounded-3xl border border-border/30 overflow-hidden shadow-elevated grid grid-cols-1 md:grid-cols-2">
        <div className="aspect-[4/3] md:aspect-auto md:min-h-[420px] relative overflow-hidden">
          <img src={journalImg} alt="The Start of You journal flatlay"
            loading="lazy" width={1200} height={900}
            className="w-full h-full object-cover object-[50%_45%]" />
        </div>
        <div className="p-7 sm:p-9 md:p-12 flex flex-col justify-center">
          <SectionLabel>The Start of You journal</SectionLabel>
          <h3 className="font-serif text-[1.65rem] sm:text-[1.8rem] md:text-[2.1rem] text-foreground leading-tight mb-4">
            The week the embryo became a fetus deserves to be remembered.
          </h3>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8] mb-6">
            The quiet milestone nobody tells you about. The strange in-between of nearly-safe and not-quite.
            The list of who you want to tell first. The journal holds the small, ordinary, invisible turning
            points of becoming a parent.
          </p>
          <ul className="space-y-2.5 mb-7">
            {[
              "A page for the dating scan",
              "Letters to your baby through the first trimester",
              "Guided pages through every week, all the way to birth",
            ].map((line) => (
              <li key={line} className="flex items-start gap-2.5">
                <Check size={13} className="text-sage mt-1 shrink-0" />
                <span className="font-sans text-[13.5px] text-foreground/80">{line}</span>
              </li>
            ))}
          </ul>
          <Link to="/product"
            className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-6 py-3 font-sans text-[13.5px] font-medium shadow-cta hover:bg-terracotta-hover transition-colors w-fit">
            Discover the journal <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

/* 14. RELATED */
const related = [
  { slug: "first-trimester-tests-and-scans", img: testsScansImg, tag: "Care",
    title: "The dating scan: what to expect at 11–14 weeks",
    desc: "What your sonographer measures, the optional combined screening test, and how to prepare for the scan." },
  { slug: "symptoms-stopping-in-early-pregnancy", img: symptomsStoppingImg, tag: "Reassurance",
    title: "When pregnancy symptoms suddenly ease",
    desc: "Why symptoms ebb and lift around weeks 10–12, what's normal, and when to seek reassurance." },
  { slug: "first-trimester-fatigue", img: fatigueImg, tag: "Body",
    title: "When does first-trimester tiredness lift?",
    desc: "The biology of why energy starts to return around week 10–14 — and what helps in the meantime." },
  { slug: "first-trimester-nausea", img: nauseaImg, tag: "Symptoms",
    title: "Nausea easing — or not — at week 10",
    desc: "Why some people feel better around now and others don't, and what to do if sickness lingers." },
  { slug: "first-trimester-emotional", img: emotionalImg, tag: "Emotions",
    title: "The strange in-between of late first trimester",
    desc: "Closer to the dating scan, but not quite ready to feel safe yet — and how to carry that gap." },
  { slug: "first-trimester-lifestyle", img: lifestyleImg, tag: "Lifestyle",
    title: "Telling people you're pregnant — when and how",
    desc: "Thinking about who to tell first, when to widen the circle, and how to hold the news on your own terms." },
];

const Related = () => (
  <section id="guidance" className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div className="max-w-xl">
          <SectionLabel>Read next, because of week 10</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.4rem] text-foreground leading-tight">
            Curated guidance for what's likely on your mind right now.
          </h2>
        </div>
        <Link to="/guidance"
          className="inline-flex items-center gap-1.5 font-sans text-[13.5px] font-medium text-sage hover:gap-2.5 transition-all whitespace-nowrap">
          Browse all guidance <ArrowRight size={12} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {related.map((a) => (
          <Link key={a.slug} to={`/articles/${a.slug}`}
            className="group flex flex-col bg-card rounded-2xl overflow-hidden border border-border/30 shadow-card-brand hover:shadow-soft hover:-translate-y-1 transition-all duration-500">
            <div className="aspect-[5/4] overflow-hidden">
              <img src={a.img} alt={a.title} loading="lazy" width={640} height={512}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <span className="font-sans text-[10.5px] font-semibold tracking-[0.22em] uppercase text-terracotta mb-3">
                {a.tag}
              </span>
              <h3 className="font-serif text-[1.15rem] text-foreground leading-snug mb-3 group-hover:text-sage transition-colors">
                {a.title}
              </h3>
              <p className="font-sans text-[13px] text-foreground/70 leading-[1.7] flex-1 mb-4">
                {a.desc}
              </p>
              <span className="inline-flex items-center gap-1.5 font-sans text-[12.5px] font-medium text-sage group-hover:gap-2.5 transition-all">
                Read guide <ArrowRight size={11} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

/* 15. FAQ */
const faqs = [
  { q: "What does it mean that the embryo is now a fetus?",
    a: "Medically, the term 'embryo' refers to the period of organ formation — roughly weeks 5 to 10. From week 10 onwards, your baby is called a fetus. It's not just a label change: it marks the end of the most vulnerable developmental window. Every essential organ is now in place. From here, the work is mostly growing, refining, practising movement, and putting on weight. The biggest single risks of major structural malformation are now behind you. Many people find this transition quietly reassuring even though nothing visibly changes." },
  { q: "When will my dating scan be?",
    a: "Your NHS dating scan happens between 11 and 14 weeks, so usually within the next 1–4 weeks. If you haven't received an appointment yet, follow up with your midwife — booking-in usually happens at 8–10 weeks and the scan letter usually follows. The dating scan confirms how many weeks pregnant you are, checks the heartbeat, and is the appointment where you can opt in to the combined screening test for chromosomal conditions like Down's syndrome." },
  { q: "Should I have NIPT?",
    a: "NIPT (Non-Invasive Prenatal Testing) is a private blood test that screens for Down's, Edwards' and Patau's syndromes from your blood alone, with no risk to the pregnancy. It's available privately from around week 10. The NHS may offer it after a higher-risk combined screening result. Whether to have it is a personal decision: it gives more accurate screening than the standard combined test but isn't diagnostic — only invasive tests like CVS or amniocentesis are diagnostic. Worth thinking about now, before the dating scan, if you want it." },
  { q: "Why am I still so tired at 10 weeks?",
    a: "Several things are still in play. The placenta is finishing its handover from the corpus luteum — that handover usually completes around week 10–12 and is a major reason fatigue starts to lift through the second trimester. Your blood volume is climbing, hormones are still high, and disturbed sleep adds to the load. Most people see meaningful energy return between weeks 12 and 16. If you stay completely flattened, please mention it to your GP — first-trimester anaemia and thyroid changes are worth checking." },
  { q: "My symptoms suddenly eased — should I worry?",
    a: "Symptoms naturally come and go in early pregnancy, especially around weeks 10–12 when the placenta takes over hormone production and hCG levels start to plateau. A day or two of feeling better, or even a clear easing this week, is more likely good news than bad. However, a sudden and sustained loss of all symptoms, especially combined with bleeding or pain, is worth getting checked. Your local Early Pregnancy Unit (EPU) can usually offer a scan for reassurance — you can self-refer in many areas." },
  { q: "Has the risk of miscarriage really dropped now?",
    a: "Yes — once a heartbeat has been confirmed at around 8 weeks and the pregnancy reaches week 10, the chance of miscarriage drops significantly. Population data suggests the risk falls to roughly 1–2% of remaining pregnancies once you reach 10 weeks with a confirmed heartbeat. The fear doesn't always shift in step with the statistics. But biologically, you have crossed into a much more stable phase, and the next major reassurance point is the dating scan." },
  { q: "Can I exercise at 10 weeks pregnant?",
    a: "Yes, and gentle movement often helps with fatigue, mood and digestion. If you were active before pregnancy, you can usually continue most activities — walking, swimming, prenatal yoga, low-impact strength work, gentle cycling, jogging at a comfortable pace. Avoid contact sports, anything with a real fall risk, hot yoga, and lying flat on your back for long periods later in pregnancy. The general rule is: be able to hold a conversation while moving. If you're new to exercise, week 10 is a good moment to start gently with walking and swimming." },
  { q: "When should we tell people we're pregnant?",
    a: "There's no right time. Many people wait until after the dating scan at 11–14 weeks, when the chance of miscarriage has dropped further and they have a scan picture in hand. Others wait longer, until 16–20 weeks. Some tell close family earlier so they have support if anything goes wrong. Think about who you'd want around you if anything went wrong, not just who you want to celebrate with — the two answers can be different. There is no obligation to perform happiness on a particular timeline." },
];

const FAQRow = ({ faq, defaultOpen = false }: { faq: { q: string; a: string }; defaultOpen?: boolean }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border/40 last:border-b-0">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-start gap-4 py-5 text-left group">
        <span className="flex-1 font-serif text-[1.05rem] md:text-[1.15rem] text-foreground group-hover:text-sage transition-colors leading-snug">
          {faq.q}
        </span>
        <span className="w-7 h-7 rounded-full bg-sage-bg flex items-center justify-center text-sage shrink-0 mt-1">
          {open ? <Minus size={13} /> : <Plus size={13} />}
        </span>
      </button>
      {open && (
        <p className="font-sans text-[14px] text-foreground/75 leading-[1.85] pb-6 pr-12">
          {faq.a}
        </p>
      )}
    </div>
  );
};

const FAQ = () => (
  <section className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
      <div className="mb-10 text-center">
        <SectionLabel>Common questions</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[1.95rem] md:text-[2.4rem] text-foreground leading-tight">
          Common questions at 10 weeks
        </h2>
      </div>
      <div className="bg-card rounded-3xl border border-border/40 shadow-card-brand p-2 md:p-4">
        <div className="px-4 md:px-6">
          {faqs.map((f, i) => (
            <FAQRow key={f.q} faq={f} defaultOpen={i === 0} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* 16. NEXT */
const Next = () => (
  <section className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
      <div className="bg-gradient-to-br from-sage-bg via-parchment to-stage-pregnancy/30 rounded-3xl border border-border/30 p-8 sm:p-10 md:p-14 text-center shadow-card-brand">
        <SectionLabel>Up next</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.5rem] text-foreground leading-tight mb-3">
          Ready for week 11?
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 max-w-lg mx-auto mb-8 leading-[1.8]">
          Next week your baby starts moving more visibly, fingernails begin to form, and the dating scan moves into clear sight.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
          <Link to="/pregnancy/week/11"
            className="inline-flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium shadow-cta hover:bg-terracotta-hover transition-colors">
            Continue to week 11 <ArrowRight size={14} />
          </Link>
          <Link to="/pregnancy/first-trimester"
            className="inline-flex items-center justify-center gap-2 border border-foreground/25 text-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium hover:bg-parchment-dark transition-colors">
            Explore the first trimester
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const Week10Page = () => (
  <div className="min-h-screen bg-parchment">
    <Navbar />
    <Hero />
    <MetaBar />
    <AtAGlance />
    <Biology />
    <Milestone />
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

export default Week10Page;
