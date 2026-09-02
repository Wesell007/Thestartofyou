import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ChevronLeft, ChevronRight, Sprout, HeartPulse, Activity, Sparkles, Calendar, BookOpen,
  ArrowRight, Check, AlertTriangle, Plus, Minus, Heart, MessageCircle, Leaf, Moon,
  Coffee, ShieldCheck, Stethoscope, Phone, Wind, Soup, Brain, Eye, Footprints, Cloud,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PregnancyWeekSeo from "@/components/seo/PregnancyWeekSeo";
import PublicWeekReflectionAsk from "@/components/pregnancy/PublicWeekReflectionAsk";
import embryoImg from "@/assets/week9-embryo.jpg";
import grapeImg from "@/assets/week9-grape.jpg";
import biologyImg from "@/assets/week9-biology-detail.jpg";
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
    <div className="relative bg-gradient-to-br from-stage-pregnancy/55 via-parchment to-sage-bg/40 pt-20 pb-36 sm:pt-24 sm:pb-44 md:pt-32 md:pb-52">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[820px] h-[420px] rounded-full bg-stage-pregnancy/30 blur-3xl" />
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
            { label: "First trimester", href: "/pregnancy/first-trimester" },
            { label: "Week 9", href: "/pregnancy/week/9" },
          ]}
        />

        <p className="font-sans text-[11px] font-semibold tracking-[0.3em] uppercase text-terracotta mb-5">
          First trimester · The hardest stretch for many
        </p>
        <h1 className="font-serif text-[2.5rem] sm:text-5xl md:text-[3.75rem] lg:text-[4.25rem] text-foreground leading-[1.04] tracking-tight mb-4 md:mb-5">
          9 Weeks Pregnant
        </h1>
        <p className="font-serif italic text-[1.05rem] sm:text-lg md:text-xl text-foreground/75 max-w-xl mx-auto leading-relaxed">
          Your baby is the size of a grape — and this is often the peak of first-trimester intensity. Hormones, nausea and fatigue can all crest this week, while the embryo inside is changing faster than at almost any other point.
        </p>
      </div>

      <Link to="/pregnancy/week/8" aria-label="Go to week 8" className="absolute left-3 sm:left-6 md:left-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronLeft size={18} />
      </Link>
      <Link to="/pregnancy/week/10" aria-label="Go to week 10" className="absolute right-3 sm:right-6 md:right-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronRight size={18} />
      </Link>
    </div>

    <div className="relative -mt-28 sm:-mt-36 md:-mt-40 mb-6">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex items-end justify-center gap-5 sm:gap-10 md:gap-14">
          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-card border-[3px] border-sage/15 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={grapeImg} alt="A single green grape" loading="lazy" width={512} height={512} className="w-full h-full object-cover" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.04]" />
            </div>
            <div className="text-center">
              <p className="font-serif italic text-[12.5px] text-foreground/80 leading-tight">grape</p>
              <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/55 mt-1">~2.3&nbsp;cm</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full bg-card border-[4px] border-terracotta/30 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={embryoImg} alt="Soft editorial illustration of a 9-week embryo: large rounded head, paddle hands with finger ridges separating, eyelids forming, a tiny tail beginning to disappear" width={1024} height={1024} loading="eager" decoding="async" className="w-full h-full object-cover scale-[1.02]" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.05]" />
            </div>
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.22em] uppercase text-foreground/65">Your baby this week</p>
          </div>

          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-stage-pregnancy/70 to-stage-pregnancy/30 border-[3px] border-terracotta/25 flex items-center justify-center shadow-elevated">
              <span className="font-serif text-[1.7rem] sm:text-[1.95rem] text-foreground tracking-tight leading-none">31</span>
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
  { id: "peak", label: "Why now is hardest", Icon: Cloud },
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
            <p className="font-sans text-[11.5px] font-normal text-foreground/60 mt-0.5">Updated for 2026 · 12 min read · The peak-symptom week</p>
          </div>
        </div>
        <nav aria-label="On this page" className="flex-1 pt-4 lg:pt-0">
          <div className="flex gap-x-1 gap-y-2 overflow-x-auto lg:flex-wrap scrollbar-hide -mx-1 px-1">
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
  { label: "Stage", value: "Mid-late first trimester" },
  { label: "Baby size", value: "~2.3 cm — grape" },
  { label: "Baby form", value: "Embryo, last week with the tail" },
  { label: "Trimester", value: "1 of 3 (week 9 of 13)" },
];

const AtAGlance = () => (
  <section id="at-a-glance" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl mb-14 md:mb-20">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 relative bg-gradient-to-br from-stage-pregnancy/55 via-parchment to-parchment-dark/50 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-10 overflow-hidden shadow-card-brand">
        <img src={botanicalAccent} alt="" aria-hidden="true" className="absolute -left-3 bottom-0 w-28 opacity-35 pointer-events-none select-none" />
        <SectionLabel tone="terracotta">At a glance</SectionLabel>
        <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-5">
          The week of peak intensity — for many, the hardest of the lot.
        </h2>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8] mb-4">
          Inside, your baby is around 2.3 cm long. The tail that was visible last week is almost gone. Finger ridges
          are separating into distinct fingers. Eyelids are forming. The face is starting to look genuinely human.
          Movement has begun, though far too small to feel.
        </p>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8]">
          Outside, hCG is at or near its lifetime peak. Many people describe week 9 as the worst week — the most
          nauseous, the most exhausted, the most overwhelmed. The 12-week landmark is still three weeks away.
          You are doing something extraordinary while feeling rougher than you've ever felt.
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
  { title: "The tail is nearly gone", body: "The small embryonic tail visible at week 7–8 has now almost completely been reabsorbed. Your baby's body is starting to straighten, although the head is still disproportionately large — about half of the entire body length. By the end of this week the tail will be a memory." },
  { title: "Fingers and toes separating", body: "What were paddle-shaped hands a fortnight ago now have visible ridges where individual fingers will be. The webbing between them is breaking down. The same is happening in the feet. By the end of week 9, fingers and toes are usually distinct, though still short and stubby." },
  { title: "A face taking shape", body: "Eyelids are forming and beginning to cover the eyes (they will fuse closed next week and stay shut until around week 26). The upper lip is forming. Tiny tooth buds for milk teeth are appearing inside the gums. The outer ears are taking on their familiar shape on the sides of the head." },
  { title: "Heart, brain & first movements", body: "The four-chambered heart is now well established and beating around 170 bpm — fast enough to whoosh on a Doppler in skilled hands, though most midwives wait until 12+ weeks. The brain is producing tiny movements: arm and leg twitches, head turns. None of it is feelable yet, but it is happening." },
];

const Biology = () => (
  <section id="biology" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="relative rounded-3xl overflow-hidden border border-border/40 shadow-card-brand">
            <div className="aspect-[4/5]">
              <img src={biologyImg} alt="Soft editorial close-up of a 9-week embryo: forming face with eyelids, separating fingers, four-chambered heart visible in chest, tail almost gone, suspended in the gestational sac" loading="lazy" width={1024} height={1280} className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-foreground/60 to-transparent">
              <p className="font-serif italic text-[13px] text-background/95 leading-snug">
                Two centimetres. A face beginning to form. The fastest week of change.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <SectionLabel>What's underway biologically</SectionLabel>
          <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-5">
            One of the fastest weeks of change your baby will ever go through.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8] mb-8 max-w-2xl">
            Week 9 is the last full week your baby is officially called an embryo. Almost every external feature
            you can think of — face, fingers, toes, ears, eyelids — is being shaped right now. Internally, the
            heart is fully four-chambered, the brain is producing first movements, and the basic plan of every
            major organ is in place.
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

const peakPoints = [
  { Icon: HeartPulse, title: "hCG is at or near its lifetime peak", body: "Human Chorionic Gonadotropin (hCG) — the hormone that makes pregnancy tests positive — typically peaks between weeks 8 and 11. For most people, week 9 sits right inside that peak. It is the single biggest driver of nausea, food aversions, smell sensitivity, and the bone-deep tiredness that defines this stretch." },
  { Icon: Cloud, title: "The placenta hasn't taken over yet", body: "Your corpus luteum (a small structure on the ovary) is still doing most of the hormonal work. The placenta is forming and growing, but the handover doesn't fully happen until weeks 10–12. Until then, your body is producing hormones the hard way — and you feel every bit of it." },
  { Icon: Moon, title: "Your blood volume has surged early", body: "By week 9, your blood volume has already risen by around 10–15% from baseline and your heart is beating faster to circulate it all. This early cardiovascular work is exhausting — and is a major reason fatigue is at its worst now, well before any visible sign of pregnancy." },
  { Icon: Calendar, title: "And you're still three weeks from the scan", body: "Week 9 is the long part of the wait. The 12-week dating scan, which is the cultural milestone where pregnancy starts to feel 'real' to the outside world, is still 2–3 weeks away. Holding on through this stretch is one of the quietly hardest things in pregnancy." },
];

const Peak = () => (
  <section id="peak" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel tone="terracotta">Why this week is the hardest</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        There are real biological reasons week 9 floors so many people.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        If you feel rougher this week than at any other point in pregnancy so far, you are not imagining it. Four
        things are happening at once — and they all peak around now.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {peakPoints.map(({ Icon, title, body }) => (
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
        <span className="font-semibold">Feeling worse than you expected isn't a warning sign.</span>{" "}
        It is, for many people, exactly what week 9 feels like. The relief usually starts to come somewhere
        between weeks 11 and 14, as the placenta takes over and hCG falls.
      </p>
    </div>
  </section>
);

const bodyNotes = [
  { Icon: Activity, title: "A uterus around the size of an orange", body: "Your uterus has roughly doubled in size since the start of pregnancy and is now around the size of a large orange. It still sits below the pelvic bone, so most people don't have a visible bump yet — but trousers feel tight, and bloating can make you look weeks further on by the evening." },
  { Icon: Soup, title: "Nausea often at its worst", body: "For many people, week 9 is when sickness is at its peak. Some have all-day queasiness, some have evening bouts, some can't keep anything down for hours at a time. About 1–3% develop hyperemesis gravidarum (HG), which is genuinely treatable — please don't push through it." },
  { Icon: Heart, title: "Breasts heavy, veined and very tender", body: "Breast changes are often at their most uncomfortable around now. The blood supply has increased dramatically, milk-making tissue is growing, and the nipples and areolas may be visibly darker and more sensitive. A soft, supportive non-wired bra in your new size usually helps." },
];

const Body = () => (
  <section id="body" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="max-w-2xl mb-10">
        <SectionLabel tone="terracotta">Your body this week</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
          Working harder than at almost any other point — and showing nothing for it.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
          Week 9 is the strange contradiction of pregnancy: your body is doing more cardiovascular and hormonal
          work than usual, yet you may not look pregnant at all. Most of the change is invisible to everyone but you.
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
    Icon: Soup, name: "Nausea — often at its absolute peak",
    feels: "All-day queasiness, sometimes vomiting, often triggered by smells, sometimes by an empty stomach. Some people have specific foods they can manage — toast, crackers, ice lollies, plain pasta — and the rest of the world tastes wrong.",
    why: "hCG is at or near its lifetime peak this week. It is the single biggest hormonal driver of nausea. Oestrogen and changes to the gut all add to it.",
    normal: "Extremely common. Eat little and often, sip slowly, sleep when you can. If you can't keep fluids down for 12+ hours, are losing weight, or feel faint, please see your GP — HG is treatable and you don't have to suffer through it.",
  },
  {
    Icon: Moon, name: "Bone-deep, almost unrecognisable fatigue",
    feels: "A flatness that's deeper than tiredness — hard to think, hard to talk, sometimes tearful by 3pm. Some people fall asleep in their chair after work. Functioning at all takes effort.",
    why: "Progesterone is highly sedating, your blood volume has surged, your heart is doing 10–15% more work, and you're growing a placenta from scratch. It is a genuinely huge metabolic load.",
    normal: "Very common in week 9. Most people see meaningful energy return between weeks 12 and 16. Rest as much as you possibly can. If you're completely flattened, ask your GP about checking iron and thyroid levels.",
  },
  {
    Icon: Wind, name: "Smell sensitivity & food aversions",
    feels: "Cooking smells, perfume, coffee, the inside of the fridge — anything can suddenly turn your stomach. Foods you used to love taste wrong. The world feels like it's been turned up too loud at the nose.",
    why: "Pregnancy heightens olfactory sensitivity dramatically — likely an evolutionary protection against eating something risky. hCG and oestrogen both contribute.",
    normal: "Very common, often peaking around weeks 8–10 alongside hCG. Eat what you can stomach, even if it's beige and the same thing for days. Variety can wait.",
  },
  {
    Icon: HeartPulse, name: "Cramping, pulling & round-ligament twinges",
    feels: "A pulling or stretching sensation low in the pelvis, often when you change position quickly, sneeze, or stand up. Sometimes brief sharp twinges. More noticeable than at week 7.",
    why: "Your uterus is now around orange-size, and the round ligaments that support it are stretching. Increased blood flow and pelvic pressure add to it.",
    normal: "Usually reassuring. Sharp, persistent one-sided pain — especially with shoulder-tip pain, dizziness or feeling faint — needs urgent assessment to rule out ectopic pregnancy.",
  },
  {
    Icon: Wind, name: "Bloating, wind & constipation",
    feels: "Trousers tight at the waist before any real bump. Sluggish digestion, going to the loo less often, sometimes wind that surprises you. Often worse later in the day.",
    why: "Progesterone significantly slows the digestive tract. Iron in pregnancy multivitamins can also worsen constipation. By week 9 your uterus is starting to press on the bowel too.",
    normal: "Very common. Drink water, eat fibre when you can, walk daily. Ask your GP about a different multivitamin if iron is making things worse — lactulose is safe in pregnancy if needed.",
  },
  {
    Icon: Brain, name: "Mood fragility & weepiness",
    feels: "Crying at adverts. Sudden irritation. Big surges of love, then big surges of fear, sometimes inside the same hour. A sense of being slightly outside yourself, watching it happen.",
    why: "Hormone levels are at extreme highs. Add disturbed sleep, ongoing nausea, fatigue and the private weight of not telling people, and emotional regulation gets very hard.",
    normal: "Extremely common. If low mood is persistent, you feel hopeless, or anxiety is intrusive, please tell your GP or midwife. Perinatal mental health support can start now and is genuinely effective.",
  },
  {
    Icon: Eye, name: "Dizziness or light-headedness",
    feels: "A wave of feeling faint when you stand up too quickly, in a hot shower, or after going too long without eating.",
    why: "Your blood vessels are dilating to accommodate rising blood volume. Blood pressure dips slightly in the first trimester. Low blood sugar from poor eating makes it much worse.",
    normal: "Common. Stand slowly, eat small frequent snacks, sip water through the day. Persistent dizziness, fainting, palpitations, or visual changes should be checked.",
  },
  {
    Icon: Coffee, name: "Headaches",
    feels: "A dull, persistent ache, often forehead or behind the eyes. Worse when tired, dehydrated, or hungry. Sometimes triggered by a sudden cut in caffeine.",
    why: "Hormonal shifts, increased blood volume, dehydration, missed meals and caffeine reduction all contribute.",
    normal: "Common. Water, regular small meals, rest and paracetamol (per the pack) are usually enough. Sudden severe headache, headache with visual changes, or one that doesn't respond to paracetamol needs to be checked.",
  },
];

const Symptoms = () => (
  <section id="symptoms" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel>Common symptoms</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        What's likely to show up at week 9 — and why each one is biting harder now.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        Week 9 isn't a gentle week for many people. It's the week the body's hormonal load is at its peak, and
        every symptom can feel turned up to its loudest setting. None of that intensity is a sign anything is wrong.
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
      <Link to="/articles/nausea-in-early-pregnancy" className="inline-flex items-center gap-2 font-sans text-[13.5px] font-medium text-sage hover:gap-3 transition-all">
        Read: surviving the peak of first-trimester sickness <ArrowRight size={13} />
      </Link>
    </div>
  </section>
);

const emotionalTruths = [
  "Feeling worse than you ever expected and wondering if that's allowed.",
  "Carrying on with work, with a smile, while feeling absolutely flattened.",
  "Counting down the days to the 12-week scan as if they will go faster if you watch them.",
  "Quietly grieving the easier version of you who could just live a normal day.",
  "Feeling guilty for not enjoying it — and grateful and frightened in the same breath.",
  "Holding the secret around colleagues, friends and family who keep asking small things.",
  "Wondering, on the worst days, whether it's really still in there — and not daring to say so.",
];

const Emotional = () => (
  <section id="emotional" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 relative bg-gradient-to-br from-lavender-bg via-parchment to-lavender-bg/40 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-9 shadow-card-brand overflow-hidden">
          <img src={botanicalAccent} alt="" aria-hidden="true" className="absolute right-0 top-0 w-24 opacity-35 pointer-events-none select-none" />
          <SectionLabel tone="lavender">Emotionally this week</SectionLabel>
          <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-4">
            The private, exhausting middle of the long quiet.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/80 leading-[1.8] mb-4">
            Week 9 is the part nobody photographs. You feel rough, you can't tell people why, the scan is still
            weeks away, and the early excitement has often given way to a flat, watchful endurance.
          </p>
          <p className="font-sans text-[14px] text-foreground/70 leading-[1.75]">
            That feeling isn't ingratitude. It's biology meeting privacy. You don't have to feel the right things
            to be doing this beautifully.
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
  { Icon: Soup, title: "Whatever stays down, wins", note: "This is not the week to eat well. It's the week to eat at all. Cold foods, plain foods, salty foods often work better than warm and rich. Small, frequent. Don't let yourself get truly empty — empty stomach makes nausea worse." },
  { Icon: Moon, title: "Drop everything you can drop", note: "Cancel the optional. Outsource what you can. Go to bed at 8pm if it helps. Week 9 is not the week to power through — it is the week to genuinely rest. The work your body is doing is invisible but enormous." },
  { Icon: Phone, title: "Make sure your booking-in is in the diary", note: "Booking-in with the midwife usually happens between 8 and 10 weeks. If you haven't been contacted, follow up with your GP surgery. The booking covers blood tests, blood pressure, your medical history and starts your maternity care." },
  { Icon: Sprout, title: "Keep the daily basics ticking over", note: "400 mcg of folic acid daily until 12 weeks (5 mg if your GP advised the higher dose), 10 mcg of vitamin D daily through pregnancy. A single pregnancy multivitamin covers most of this. Take it with a snack to lessen nausea, or move it to evenings if morning is impossible." },
  { Icon: Coffee, title: "Hold the line on caffeine, alcohol & food rules", note: "Caffeine under 200 mg a day (about two mugs of tea or one strong coffee). No alcohol. Skip pâté, soft mould-ripened cheeses, undercooked meat and fish high in mercury. The bar lowers; the basics don't change." },
  { Icon: ShieldCheck, title: "Talk to your GP if symptoms are crossing a line", note: "Persistent vomiting that stops you keeping fluids down, severe headaches, intrusive low mood or anxiety — these are not things to push through. There is real help available, and the earlier it starts, the better the outcomes for you and the pregnancy." },
];

const Focus = () => (
  <section id="focus" className="bg-sage-bg/35 py-16 md:py-24 border-y border-border/30">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <SectionLabel tone="terracotta">Focus this week</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.2rem] text-foreground leading-tight mb-4">
            Survival over strategy.
          </h2>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8]">
            Week 9 doesn't ask anything heroic. It asks you to keep yourself fed, hydrated, rested, and to ask
            for help if symptoms are pushing past what you can manage on your own.
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
            Your GP, NHS 111, your local Early Pregnancy Unit (EPU), or — once booked — your midwife are all
            good first calls. In an emergency dial 999 or go straight to A&E.
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
        You can be doing it well and feel like you're barely holding on. Week 9 is the week your body proves how much love is invisible work. Let it be hard. Let it be enough to just get through today.
      </p>
      <Heart size={14} className="text-sage/60 mx-auto mt-5" />
    </div>
  </section>
);

const reflectionPrompts = ["How my body feels today", "What I needed but couldn't ask for", "Something that helped, even slightly", "A small kindness I could give myself"];
const askChips = ["Why is week 9 so much worse?", "When does nausea peak?", "Do I have HG?", "Why am I so tired at 9 weeks?", "Is it normal to feel detached or numb?"];

const ReflectionAsk = () => (
  <PublicWeekReflectionAsk
    week={9}
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
            The hardest week deserves to be remembered too.
          </h3>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8] mb-6">
            The exhaustion nobody saw. The food that worked when nothing else did. The 3pm cry. The absurd determination
            to keep going. The journal holds the small, ordinary, invisible turning points of becoming a parent.
          </p>
          <ul className="space-y-2.5 mb-7">
            {["A page for the week you couldn't tell anyone", "Letters to your baby through the first trimester", "Guided pages through every week, all the way to birth"].map((line) => (
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
  { slug: "nausea-in-early-pregnancy", img: nauseaImg, tag: "Symptoms",
    title: "Surviving the peak of first-trimester sickness",
    desc: "Why nausea often crests around weeks 8–10, what helps day-to-day, and when to ask about HG treatment." },
  { slug: "fatigue-in-early-pregnancy", img: fatigueImg, tag: "Body",
    title: "The fatigue nobody warns you about",
    desc: "Why energy is at its lowest in early pregnancy, what's biologically going on, and how to give yourself permission to rest." },
  { slug: "the-first-trimester-emotionally", img: emotionalImg, tag: "Emotions",
    title: "The long quiet before 12 weeks",
    desc: "Carrying the secret, holding the worry, and the emotional weight of the wait between booking-in and the dating scan." },
  { slug: "symptoms-stopping-early-pregnancy", img: symptomsStoppingImg, tag: "Reassurance",
    title: "When symptoms suddenly ease — and when they don't",
    desc: "What it means if symptoms shift this week, what's normal, and when an EPU visit is worth it for peace of mind." },
  { slug: "tests-and-scans-in-pregnancy", img: testsScansImg, tag: "Care",
    title: "Booking-in with the midwife: what to expect",
    desc: "What happens at the 8–10 week appointment, what bloods are taken, and what questions to think about beforehand." },
  { slug: "first-trimester-complete-guide", img: lifestyleImg, tag: "Lifestyle",
    title: "Hiding pregnancy at work and with friends",
    desc: "Practical scripts for getting through the long quiet weeks before you're ready to tell people." },
];

const Related = () => (
  <section id="guidance" className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div className="max-w-xl">
          <SectionLabel>Read next, because of week 9</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.4rem] text-foreground leading-tight">
            Curated guidance for what's likely on your mind right now.
          </h2>
        </div>
        <Link to="/pregnancy/first-trimester" className="inline-flex items-center gap-1.5 font-sans text-[13.5px] font-medium text-sage hover:gap-2.5 transition-all whitespace-nowrap">
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
  { q: "Is it normal that week 9 feels worse than the weeks before?",
    a: "Yes — for many people, week 9 is the worst week of the first trimester. There are real biological reasons: hCG (the hormone that drives nausea) typically peaks between weeks 8 and 11; your blood volume has surged early so your heart is working harder; the placenta hasn't taken over hormone production yet, so your corpus luteum is doing it the hard way. None of that intensity is a sign anything is wrong. For most people, things start to ease somewhere between weeks 11 and 14, as hCG falls and the placenta takes over." },
  { q: "When does morning sickness peak?",
    a: "Nausea typically peaks between weeks 8 and 10, plateaus through to about week 12, and then for most people gradually eases through weeks 12–16. Around 70–80% of pregnant people experience nausea in the first trimester. About 1–3% develop hyperemesis gravidarum (HG), which is more severe and longer-lasting and is genuinely treatable — please don't try to push through it." },
  { q: "How do I know if I have hyperemesis gravidarum?",
    a: "HG is more than ordinary morning sickness. The clinical signs are: persistent vomiting more than 3–4 times a day, inability to keep any food or fluids down for 12+ hours, weight loss of more than 5% of your pre-pregnancy weight, signs of dehydration (dizziness, dark urine, racing heart, fainting). If any of that sounds like you, please see your GP or contact NHS 111 — anti-sickness medication, IV fluids, and proper care are all available, and the earlier they start, the better." },
  { q: "Why am I so exhausted at 9 weeks pregnant?",
    a: "Several things are stacked on top of each other this week. Progesterone is highly sedating and is at high levels. Your blood volume has already risen by 10–15% from baseline and your heart is doing more work. You are growing a placenta from scratch, which is a huge metabolic project. Add disturbed sleep from frequent weeing and nausea, and exhaustion is the predictable result. Most people see meaningful energy return between weeks 12 and 16. If you stay completely flattened, ask your GP about checking iron and thyroid levels — early-pregnancy anaemia and thyroid changes are worth excluding." },
  { q: "I haven't had any bleeding — should my symptoms be reassuring?",
    a: "Strong symptoms in early pregnancy are broadly reassuring — they reflect the high hormone levels of a developing placenta and embryo. But it's also true that symptoms naturally come and go from day to day, and easing of symptoms is not the same as loss of symptoms. If you have a sustained, complete loss of all symptoms, especially with bleeding or pain, please contact your local Early Pregnancy Unit (EPU). In many areas you can self-refer. They can offer a scan for reassurance." },
  { q: "Will I feel the baby move at 9 weeks?",
    a: "No. Your baby is making tiny twitchy movements now — arm and leg jerks, head turns — but at around 2.3 cm long, with several centimetres of fluid and uterine wall between you, those movements are far too small to feel. First movements ('quickening') are usually felt between weeks 16 and 22, often later for first pregnancies. What you may feel right now is your uterus stretching, gas, or your own digestion — not the baby." },
  { q: "Can I exercise at 9 weeks pregnant?",
    a: "Yes, gently, if your body has the energy for it. If you were active before pregnancy, you can usually continue most activities — walking, swimming, prenatal yoga, low-impact strength work, gentle cycling, jogging at a comfortable pace. Avoid contact sports, hot yoga, and anything with a real fall risk. The general rule is: be able to hold a conversation while moving. And if all you have today is a slow walk to the kitchen, that's also exercise this week. Kindness over performance." },
  { q: "When will I start to feel better?",
    a: "For most people, the corner starts to turn somewhere between weeks 11 and 14, as hCG falls from its peak and the placenta finishes taking over hormone production. By week 14–16, most people notice meaningful improvements in energy. Nausea often eases on a similar timeline, though for some it lingers another few weeks. About 10% have nausea that lasts much longer. Whatever your shape of recovery is, week 9 is not where you will live forever. The relief, for the vast majority of people, does come." },
];

const Next = () => (
  <section className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
      <div className="bg-gradient-to-br from-sage-bg via-parchment to-stage-pregnancy/30 rounded-3xl border border-border/30 p-8 sm:p-10 md:p-14 text-center shadow-card-brand">
        <SectionLabel>Up next</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.5rem] text-foreground leading-tight mb-3">Ready for week 10?</h2>
        <p className="font-sans text-[14.5px] text-foreground/75 max-w-lg mx-auto mb-8 leading-[1.8]">
          Next week is the quiet milestone where the embryo officially becomes a fetus — and the worst of the first-trimester intensity often starts to ease.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
          <Link to="/pregnancy/week/10" className="inline-flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium shadow-cta hover:bg-terracotta-hover transition-colors">
            Continue to week 10 <ArrowRight size={14} />
          </Link>
          <Link to="/pregnancy/first-trimester" className="inline-flex items-center justify-center gap-2 border border-foreground/25 text-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium hover:bg-parchment-dark transition-colors">
            Explore the first trimester
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const Week9Page = () => (
  <div className="min-h-screen bg-parchment">
    <PregnancyWeekSeo weekNumber={9} />
    <Navbar />
    <Hero />
    <MetaBar />
    <AtAGlance />
    <Biology />
    <Peak />
    <Body />
    <Symptoms />
    <Emotional />
    <Focus />
    <SeekSupport />
    <Quote />
    <ReflectionAsk />
    <Journal />
    <Related />
    <WeekCommonQuestions week={9} questions={buildWeekQuestions(9, faqs)} />
    <WeekSources week={9} sources={getWeekSources(9)} />
    <Next />
    <Footer />
  </div>
);

export default Week9Page;
