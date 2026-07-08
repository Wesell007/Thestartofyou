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
  Wind,
  ShieldCheck,
  Stethoscope,
  Brain,
  Eye,
  Footprints,
  Hand,
  Briefcase,
  Phone,
  Clock,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PregnancyWeekSeo from "@/components/seo/PregnancyWeekSeo";
import fetusImg from "@/assets/week42-fetus.jpg";
import squashImg from "@/assets/week42-squash.jpg";
import biologyImg from "@/assets/week42-biology-detail.jpg";
import journalImg from "@/assets/journal-flatlay.jpg";
import botanicalTr from "@/assets/botanical-branch-tr.png";
import botanicalBl from "@/assets/botanical-branch-bl.png";
import botanicalAccent from "@/assets/article-botanical-accent.png";
import thirdMovementImg from "@/assets/article-hero-third-movement.jpg";
import thirdEmotionalImg from "@/assets/article-hero-third-emotional.jpg";
import thirdHospitalBagImg from "@/assets/article-hero-third-hospital-bag.jpg";
import thirdSignsImg from "@/assets/article-hero-third-signs-of-labour.jpg";
import thirdSleepImg from "@/assets/article-hero-third-sleep.jpg";
import thirdNurseryImg from "@/assets/article-hero-third-nursery.jpg";

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
    <div className="relative bg-gradient-to-br from-stage-pregnancy/60 via-parchment to-parchment-dark/45 pt-20 pb-36 sm:pt-24 sm:pb-44 md:pt-32 md:pb-52">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[820px] h-[420px] rounded-full bg-terracotta/12 blur-3xl" />
        <div className="absolute -top-10 right-1/4 w-[260px] h-[260px] rounded-full bg-sage-light/30 blur-3xl" />
      </div>
      <img src={botanicalBl} alt="" aria-hidden="true"
        className="pointer-events-none absolute top-20 left-0 w-[150px] lg:w-[210px] opacity-25 select-none hidden md:block" />
      <img src={botanicalTr} alt="" aria-hidden="true"
        className="pointer-events-none absolute top-20 right-0 w-[150px] lg:w-[210px] opacity-25 select-none hidden md:block" />

      <div className="container mx-auto px-14 sm:px-16 md:px-10 max-w-5xl relative z-10 text-center">
        <nav aria-label="breadcrumb" className="flex items-center justify-center gap-2 mb-6 sm:mb-7 font-sans text-[12px] font-normal text-foreground/65">
          <Link to="/pregnancy" className="hover:text-foreground transition-colors">Pregnancy</Link>
          <span className="text-foreground/30">›</span>
          <Link to="/pregnancy/third-trimester" className="hover:text-foreground transition-colors">Week by week</Link>
          <span className="text-foreground/30">›</span>
          <span className="text-foreground">Week 42</span>
        </nav>

        <p className="font-sans text-[11px] font-semibold tracking-[0.3em] uppercase text-terracotta mb-5">
          Third Trimester · Post-term · The outer edge of waiting
        </p>
        <h1 className="font-serif text-[2.5rem] sm:text-5xl md:text-[3.75rem] lg:text-[4.25rem] text-foreground leading-[1.04] tracking-tight mb-4 md:mb-5">
          42 Weeks Pregnant
        </h1>
        <p className="font-serif italic text-[1.05rem] sm:text-lg md:text-xl text-foreground/75 max-w-xl mx-auto leading-relaxed">
          Your baby is the size of a winter squash and you are now post-term. Almost everyone here is being induced, monitored daily, or already on their way. You are very nearly at the end.
        </p>
      </div>

      <Link to="/pregnancy/week/41" aria-label="Go to week 41"
        className="absolute left-3 sm:left-6 md:left-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronLeft size={18} />
      </Link>
      <Link to="/pregnancy/third-trimester" aria-label="Back to third trimester"
        className="absolute right-3 sm:right-6 md:right-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronRight size={18} />
      </Link>
    </div>

    <div className="relative -mt-28 sm:-mt-36 md:-mt-40 mb-6">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex items-end justify-center gap-5 sm:gap-10 md:gap-14">
          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-card border-[3px] border-sage/15 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={squashImg} alt="Winter squash" loading="lazy" width={512} height={512}
                className="w-full h-full object-cover" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.04]" />
            </div>
            <div className="text-center">
              <p className="font-serif italic text-[12.5px] text-foreground/80 leading-tight">winter squash</p>
              <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/55 mt-1">~53&nbsp;cm</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full bg-card border-[4px] border-terracotta/30 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={fetusImg}
                alt="Soft editorial illustration of a post-term 42-week fetus, fully mature and deeply engaged in the pelvis with slightly drier peeling skin"
                width={1024} height={1024}
                loading="eager" decoding="async"
                className="w-full h-full object-cover scale-[1.02]" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.05]" />
            </div>
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.22em] uppercase text-foreground/65">Your baby this week</p>
          </div>

          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-stage-pregnancy/90 to-stage-pregnancy/45 border-[3px] border-terracotta/30 flex items-center justify-center shadow-elevated">
              <span className="font-serif text-[1.5rem] sm:text-[1.7rem] text-foreground tracking-tight leading-none">+2</span>
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-terracotta/15" />
            </div>
            <div className="text-center">
              <p className="font-serif italic text-[12.5px] text-foreground/80 leading-tight">post-term</p>
              <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/55 mt-1">weeks</p>
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
  { id: "biology", label: "Baby this week", Icon: Sprout },
  { id: "post-term", label: "Post-term context", Icon: Clock },
  { id: "monitoring", label: "Daily monitoring", Icon: Stethoscope },
  { id: "induction", label: "If still waiting", Icon: ShieldCheck },
  { id: "body", label: "Body changes", Icon: Activity },
  { id: "symptoms", label: "Symptoms", Icon: HeartPulse },
  { id: "emotional", label: "Emotionally", Icon: Heart },
  { id: "focus", label: "Focus this week", Icon: Calendar },
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
              Updated for 2026 · 12 min read · Post-term, the outer edge
            </p>
          </div>
        </div>
        <nav aria-label="On this page" className="flex-1 pt-4 lg:pt-0">
          <div className="flex gap-x-1 gap-y-2 overflow-x-auto lg:flex-wrap scrollbar-hide -mx-1 px-1">
            {anchors.map(({ id, label, Icon }) => (
              <a key={id} href={`#${id}`}
                className="group shrink-0 flex items-center gap-2 px-3 py-2 rounded-full hover:bg-sage-bg/60 transition-colors">
                <span className="w-7 h-7 rounded-full bg-parchment-dark/80 border border-border/30 flex items-center justify-center group-hover:border-sage/30 transition-colors">
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
  { label: "Stage", value: "Post-term · 42+0 onwards" },
  { label: "Baby size", value: "~53 cm — winter squash" },
  { label: "Baby weight", value: "Around 3.7 kg" },
  { label: "How common", value: "~1 in 25 pregnancies" },
];

const AtAGlance = () => (
  <section id="at-a-glance" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl mb-14 md:mb-20">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 relative bg-gradient-to-br from-stage-pregnancy/60 via-parchment to-parchment-dark/55 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-10 overflow-hidden shadow-card-brand">
        <img src={botanicalAccent} alt="" aria-hidden="true"
          className="absolute -left-3 bottom-0 w-28 opacity-35 pointer-events-none select-none" />
        <SectionLabel tone="terracotta">At a glance</SectionLabel>
        <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-5">
          Week 42 is rare, recognised, and fully held by your team.
        </h2>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8] mb-4">
          Only around 4 in 100 pregnancies reach 42 weeks. By now, almost everyone has been
          offered or is in the middle of induction, with daily or near-daily monitoring of your
          baby. Your baby is fully mature, with longer nails, drier or peeling skin, and very
          little vernix left. They are ready in every way that matters.
        </p>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8]">
          For you, the texture of these days is different. The waiting feels final. Decisions are
          closer. Appointments are more frequent. The emotional load is heavy in a way that's
          hard to put into words — and so is the strange relief of knowing it really is almost
          over now.
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
  { title: "Fully mature, every system finished", body: "There is nothing left to grow. Every organ is complete and functioning. Your baby would breathe, feed, regulate temperature and digest milk from the moment they arrive — exactly as they would have done two weeks ago." },
  { title: "A 'post-mature' look is normal", body: "Some post-term babies arrive with drier, slightly peeling skin (especially on hands and feet), longer fingernails, and almost no vernix left. Their hair may be a little longer. They are alert, often wide-eyed, and entirely well." },
  { title: "Still gathering small amounts of weight", body: "Many post-term babies are a touch bigger than their 40-week siblings — though not always. Estimated weight from late scans can be wrong by 10–15% in either direction. Size alone is rarely the deciding factor." },
  { title: "Placenta gently being watched", body: "Most placentas continue to do their job past 42 weeks. The reason monitoring steps up now is to spot the small minority where function quietly tapers — a precaution, not an expectation. Most checks are reassuring." },
];

const Biology = () => (
  <section id="biology" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="relative rounded-3xl overflow-hidden border border-border/40 shadow-card-brand">
            <div className="aspect-[4/5]">
              <img src={biologyImg} alt="Soft editorial illustration of a 42-week placenta with a fetal heart-rate trace and gentle ultrasound monitoring"
                loading="lazy" width={1024} height={1280}
                className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-foreground/60 to-transparent">
              <p className="font-serif italic text-[13px] text-background/95 leading-snug">
                Watched closely. Still working. Still keeping watch with you.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <SectionLabel>What's underway biologically</SectionLabel>
          <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-5">
            By 42 weeks, the developmental work is long done — and the placenta becomes the watch-point.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8] mb-8 max-w-2xl">
            Your baby is not 'overcooked' or 'past their best'. They are simply fully ready, on a
            slightly longer timeline than the calendar predicted. The careful monitoring you're
            offered now is a precaution against rare changes — not a sign anything is wrong.
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

/* 5. POST-TERM CONTEXT — Week 42 unique */
const postTermPoints = [
  { Icon: Clock, title: "Why 42 weeks is the outer edge", body: "Most maternity guidelines (UK NICE, RCOG and most international bodies) define post-term as 42+0 onwards. By this point, induction has been offered or is already in progress for the vast majority of pregnancies. Reaching 42 weeks unaided is uncommon, but recognised and supported." },
  { Icon: Sprout, title: "Why some babies are still here", body: "First-time pregnancies, longer cycles, family history, and an estimated due date that may be a few days early can all play a part. Some bodies and babies simply ripen on their own quiet schedule. Reaching 42 weeks does not reflect anything you have or haven't done." },
  { Icon: ShieldCheck, title: "What changes from 42+0", body: "If you're not already in the induction process, the conversation now is much more active. You'll be offered induction, daily or near-daily monitoring, or in rare cases continued expectant management with very close surveillance — depending on your team and your wishes." },
  { Icon: Heart, title: "What stays exactly the same", body: "Movements still matter — strong and regular, every day. Phoning your unit at the first sign of any change, day or night. Your right to ask questions, take time, and make informed choices. Your team is still on your side, all the way to the end." },
];

const PostTerm = () => (
  <section id="post-term" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel tone="terracotta">Post-term context</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        42 weeks is rare. It is not lost. It is closely held.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        The language around post-term pregnancy can sound clinical. The reality is gentler:
        a small group of pregnancies, watched carefully, supported every day, and almost
        always meeting their baby very soon.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {postTermPoints.map(({ Icon, title, body }) => (
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
  </section>
);

/* 6. DAILY MONITORING — Week 42 unique */
const monitoringPoints = [
  { Icon: Stethoscope, title: "Heart rate monitoring (CTG), often daily", body: "From 42 weeks, you may be asked to come in every day or every other day for a 20–40 minute trace of baby's heart rate. A reactive trace is reassuring. It doesn't predict when labour will start — only that today, your baby is doing well." },
  { Icon: Eye, title: "Ultrasound for fluid and growth", body: "A scan to check the amount of amniotic fluid (AFI or deepest pool), baby's estimated weight, and a quick wellbeing assessment. A normal scan is reassuring. A low-fluid result usually leads to a more active conversation about induction or birth today." },
  { Icon: Hand, title: "Movements: count and call, every day", body: "Movements should still feel strong and regular at 42 weeks, even with no room left. Pattern matters more than number. Any change at all — phone your maternity assessment unit straight away. This is the single most important thing you can do this week." },
  { Icon: Phone, title: "A direct line to your unit", body: "By now you should know the number for maternity triage by heart. They expect calls from post-term pregnancies — frequent, sometimes daily. They will not be put out, irritated, or think you're overreacting. Phone first, every time." },
];

const Monitoring = () => (
  <section id="monitoring" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="max-w-2xl mb-10">
        <SectionLabel>Daily monitoring</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
          What 'closer monitoring' actually looks like at 42 weeks.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
          Post-term monitoring is mostly reassurance, repeated. Knowing what each appointment
          involves makes it easier to walk in calmly, and easier to ask the questions you need
          answers to.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {monitoringPoints.map(({ Icon, title, body }) => (
          <div key={title}
            className="relative bg-card rounded-2xl border border-border/40 p-6 md:p-7 shadow-card-brand overflow-hidden">
            <span className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sage/30 to-transparent" />
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
    </div>
  </section>
);

/* 7. IF STILL WAITING — Week 42 unique */
const stillWaitingPoints = [
  { Icon: Sprout, title: "If induction has been declined", body: "Some people choose continued expectant management with daily monitoring. This is a valid, supported choice and your team will care for you fully — but the conversation about why and when becomes more frequent at this stage. Ask for the numbers. Ask for time. Ask again if you need to." },
  { Icon: HeartPulse, title: "If induction is already in progress", body: "Many week-42 pregnancies are mid-induction by now: a pessary, gel, balloon, broken waters, or a hormone drip. Stages can take hours, sometimes more than a day. Bring your bag, your charger, your snacks, your person. Pain relief options remain fully open." },
  { Icon: ShieldCheck, title: "If a Caesarean is now the plan", body: "A small number of post-term pregnancies move toward a planned or recommended Caesarean — for baby's wellbeing, your wellbeing, or because induction has not progressed. It is still a birth. It is still your baby's beginning. Your team will walk you through every step." },
  { Icon: Heart, title: "Whatever the route, you are nearly there", body: "Spontaneous, induced, instrumental or surgical — the route does not change the meeting. By the end of this week, the vast majority of post-term pregnancies have been resolved into a baby in arms. You are very, very close." },
];

const StillWaiting = () => (
  <section id="induction" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel tone="lavender">If you're still waiting</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        Whichever way the next days go — there is a plan, and you are in it.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        At 42 weeks, the question is rarely 'will my baby come?' but 'how, exactly?'. Knowing
        the four shapes the next days might take makes the appointments feel collaborative
        rather than overwhelming.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {stillWaitingPoints.map(({ Icon, title, body }) => (
        <div key={title}
          className="relative bg-card rounded-2xl border border-border/40 p-6 md:p-7 shadow-card-brand overflow-hidden">
          <span className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-lavender/30 to-transparent" />
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-10 rounded-full bg-lavender-bg border border-lavender/15 flex items-center justify-center">
              <Icon size={15} className="text-lavender-foreground" />
            </span>
            <h3 className="font-serif text-[1.15rem] text-foreground leading-snug">{title}</h3>
          </div>
          <p className="font-sans text-[13.5px] text-foreground/70 leading-[1.75]">{body}</p>
        </div>
      ))}
    </div>

    <div className="mt-6 bg-stage-pregnancy/40 border border-terracotta/20 rounded-2xl p-6 md:p-7 flex flex-col sm:flex-row sm:items-start gap-4">
      <span className="w-10 h-10 rounded-full bg-card border border-terracotta/20 flex items-center justify-center shrink-0">
        <HeartPulse size={15} className="text-terracotta" />
      </span>
      <p className="font-sans text-[14px] text-foreground/85 leading-[1.7]">
        <span className="font-semibold">Movements should still feel strong and regular at 42 weeks,</span>{" "}
        even post-term and even with no room left. Any change in pattern or strength —
        phone your unit straight away. Day or night. Don't wait for tomorrow's appointment.
      </p>
    </div>
  </section>
);

/* 8. BODY */
const bodyNotes = [
  { Icon: Wind, title: "Carrying the heaviest weight you've carried", body: "Your bump is barely bigger than two weeks ago, but every kilogram has been lifted, lowered, walked with and slept on for longer. Hips ache. Pubic bone twinges. Pelvic pressure is constant. The body is tired in a way that is entirely earned." },
  { Icon: Moon, title: "Sleep is genuinely scarce", body: "Hours of broken nights, vivid dreams, restless legs, the mental hum of waiting and the practical strain of so many appointments. Lie down whenever you can. Side-sleep with pillows. Daytime rest counts as much as night-time. Your body is still doing real work." },
  { Icon: Footprints, title: "Quiet pre-labour signs may persist", body: "Looser stools, more discharge, more 'show' colour, soft cramping, occasional warm flushes. None of it guarantees labour today. All of it is your body still preparing — quietly, unhurriedly, on its own clock." },
];

const Body = () => (
  <section id="body" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="max-w-2xl mb-10">
        <SectionLabel tone="terracotta">Your body this week</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
          The heaviest week of all — and the closest to the end.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
          Your body is not 'failing to go into labour'. It is doing its work on its own quiet
          timeline, and it is being supported every day to do that safely.
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

/* 9. SYMPTOMS */
const symptoms = [
  {
    Icon: HeartPulse, name: "Long, repetitive Braxton Hicks",
    feels: "Tightenings that come for hours, sometimes overnight, sometimes painful — and still, often, not yet labour.",
    why: "Your uterus has been rehearsing for weeks. Post-term, it can do so almost continuously without quite tipping over.",
    normal: "Very common. Painful, regular, longer-and-stronger tightenings that don't ease — phone your unit, even if you've called before.",
  },
  {
    Icon: Wind, name: "Constant low pressure",
    feels: "A heavy, weighted fullness deep in the pelvis, sharp pubic-bone shoots, lightning sensations in the cervix.",
    why: "Your baby's head is engaged as deeply as it will go, pressing on every nerve and ligament.",
    normal: "Very common. Sharp but harmless, unless paired with bleeding, leaking or persistent regular tightenings.",
  },
  {
    Icon: Eye, name: "More 'show', more sweep-related spotting",
    feels: "Pinkish, brown or jelly-like discharge, sometimes streaked with blood — particularly after sweeps or vaginal exams.",
    why: "The cervix continues to soften and may have been examined more than once this week.",
    normal: "Common. Heavy fresh red bleeding, or a sudden gush of fluid that's pink/red, is not a show — phone straight away.",
  },
  {
    Icon: Moon, name: "Bone-deep exhaustion",
    feels: "A flat, weighted tiredness that doesn't lift with sleep, sometimes worse in the late afternoon.",
    why: "Late-pregnancy hormones, broken sleep, frequent appointments, and the cumulative emotional load of being post-term.",
    normal: "Universal. Rest is the work now. Sleep where you can. Naps count. Cancel anything that isn't an appointment.",
  },
  {
    Icon: Footprints, name: "Bowel changes",
    feels: "Looser stools or frequent bowel movements, sometimes for a day or two before things shift.",
    why: "Rising prostaglandins as your body keeps preparing — sometimes a quiet pre-labour sign, sometimes not.",
    normal: "Common in the days before induction or labour. Severe diarrhoea with vomiting or fever still needs a call.",
  },
  {
    Icon: Brain, name: "A heavy emotional weather",
    feels: "Tearful, short-tempered, fierce, raw, defensive of your timeline. Sometimes flat, sometimes furious. Sometimes oddly calm.",
    why: "Hormones, sleep deprivation, social pressure, the looming weight of decisions, and the sheer length of the wait.",
    normal: "Universal at 42 weeks. Persistent low mood, hopelessness or thoughts of harming yourself need a same-day conversation with your midwife or GP.",
  },
];

const Symptoms = () => (
  <section id="symptoms" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel>Common symptoms</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        What's likely to show up at 42 weeks — and what each one really means.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        Most of what your body is doing now is the same as at 41 weeks — just a little
        longer-running, a little more relentless, and a lot more emotionally loaded.
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
  </section>
);

/* 10. EMOTIONAL */
const emotionalTruths = [
  "The exhaustion of being asked, again, if you've had the baby yet.",
  "Wanting it to be over — and being scared of how it ends.",
  "Quiet grief that the birth you imagined isn't shaping up that way.",
  "Crying in the carpark before another monitoring appointment.",
  "Loving them and being slightly furious at them, both at once.",
  "The relief of decisions being made for you, and the loss of that, too.",
  "Underneath everything: the very real knowing that this is almost over.",
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
            Tired in a way the calendar can't capture.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/80 leading-[1.8] mb-4">
            Being post-term is one of the most under-discussed stretches of pregnancy. The
            world has politely run out of things to say. The body has politely run out of room.
            And somewhere underneath, you are very close to meeting them.
          </p>
          <p className="font-sans text-[14px] text-foreground/70 leading-[1.75]">
            None of how you feel right now predicts your birth, your baby, or the kind of
            mother you'll be. Be tender. Mute the chats. Let yourself be quietly post-term.
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

/* 11. FOCUS */
const focusList = [
  { Icon: Hand, title: "Movements above everything else", note: "Strong and regular, even now. Any change at all — phone your unit. Day or night. Don't wait for the next monitoring slot. This is the single most important thing you can do." },
  { Icon: Stethoscope, title: "Show up to every monitoring appointment", note: "Daily or near-daily CTGs, scans, and reviews. They exist to keep an eye on a small set of things. Most are reassuring. They are also, quietly, where decisions about today get made." },
  { Icon: Briefcase, title: "Bag in the car, not by the door", note: "Long charging cables, soft layers, real snacks, your pillow, going-home outfit, baby's first outfit. If you're being induced, assume an overnight stay and bring more than you think." },
  { Icon: MessageCircle, title: "Mute the group chats, all of them", note: "You don't owe daily updates. A short auto-reply ('Still here, will let you know — please don't ask') is allowed, kind to yourself, and very widely understood." },
  { Icon: Phone, title: "Numbers everywhere", note: "Maternity triage, day assessment unit, labour ward, partner, key family. On your phone, on paper in your bag, and stuck to the fridge." },
  { Icon: Moon, title: "Rest is the only job", note: "Lying down, side-sleeping, slow walks, warm baths, daft television. No projects, no productivity. Your body is still doing the most important thing it has ever done." },
];

const Focus = () => (
  <section id="focus" className="bg-sage-bg/35 py-16 md:py-24 border-y border-border/30">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <SectionLabel tone="terracotta">Focus this week</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.2rem] text-foreground leading-tight mb-4">
            Soft things, kindly. Then rest some more.
          </h2>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8]">
            Week 42 is not a week for projects or 'productive' anything. It is for the small
            confirmations, the quiet protections, and the very real work of waiting.
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

/* 12. SEEK SUPPORT */
const seekSupport = [
  "Any change in your baby's movements — pattern, strength or character",
  "Regular painful tightenings that don't ease with rest or movement",
  "Waters breaking, especially if the fluid is green, brown or bloody",
  "Bleeding heavier than a small show — fresh red blood",
  "Severe headache, vision changes or pain in your upper tummy",
  "Sudden swelling in your face or hands",
  "Severe itching, especially on palms and soles or worse at night",
  "Persistent low mood, hopelessness or thoughts of harming yourself",
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
            Post-term is not a reason to wait it out at home. Phone first, every time.
          </h3>
          <p className="font-sans text-[13.5px] text-foreground/70 leading-[1.75] mt-3">
            Your maternity assessment unit is open 24 hours, every day — including for post-term
            pregnancies. They will not be put out, irritated, or think you're overreacting. Even
            if you called yesterday. In an emergency, dial 999.
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

/* 13. QUOTE */
const Quote = () => (
  <section className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl pb-16 md:pb-24">
    <div className="relative bg-stage-pregnancy/35 rounded-3xl border border-border/30 p-8 sm:p-10 md:p-14 text-center overflow-hidden">
      <span className="absolute left-7 top-6 font-serif text-4xl text-terracotta/40 leading-none">“</span>
      <span className="absolute right-7 bottom-4 font-serif text-4xl text-terracotta/40 leading-none">”</span>
      <p className="font-serif italic text-[1.2rem] sm:text-[1.35rem] md:text-[1.6rem] text-foreground/90 leading-snug max-w-3xl mx-auto">
        You did not run out of time. You ran the whole length of it — and you are about to meet the person it was always for.
      </p>
      <Heart size={14} className="text-terracotta/60 mx-auto mt-5" />
    </div>
  </section>
);

/* 14. REFLECTION + ASK */
const reflectionPrompts = ["What I want to remember about this week", "What I'm afraid of", "What I want from my team", "Letter to my baby"];
const askChips = ["What is post-term pregnancy?", "Risks at 42 weeks", "What if induction doesn't work?", "How to count movements", "Caesarean at 42 weeks"];

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
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.24em] uppercase text-sage">Ask about week 42</p>
            <h3 className="font-serif text-[1.3rem] sm:text-[1.35rem] text-foreground mt-0.5 leading-snug">A question on your mind?</h3>
          </div>
        </div>
        <p className="font-sans text-[13px] text-foreground/70 leading-relaxed mb-4">
          Get a calm, evidence-led answer tailored to where you are right now.
        </p>
        <input type="text" placeholder="e.g. What happens if I'm still pregnant past 42 weeks?"
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

/* 15. JOURNAL */
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
            The post-term days deserve to be remembered too.
          </h3>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8] mb-6">
            The waiting that goes on past the calendar — past your due date, past your guess
            date, past the date you privately thought it would be — is its own quiet kind of
            work. The journal holds room for the specific tenderness of being still here, and
            for the letters you'll want to read back later.
          </p>
          <ul className="space-y-2.5 mb-7">
            {[
              "Pages for birth preferences and induction questions",
              "Space for letters to your baby before they arrive",
              "Guided prompts through every week to birth — and beyond",
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

/* 16. RELATED */
const related = [
  { slug: "early-signs-of-labour", img: thirdSignsImg, tag: "Looking ahead",
    title: "The early signs of labour, post-term",
    desc: "What to watch for, what to ignore, and exactly when to call — even if you've called many times this week." },
  { slug: "baby-movements-in-pregnancy", img: thirdMovementImg, tag: "Movement",
    title: "Movements at 42 weeks",
    desc: "Strong and regular, even now. Pattern matters more than number — and any change needs a phone call." },
  { slug: "hospital-bag-essentials", img: thirdHospitalBagImg, tag: "Practical",
    title: "Bag for an induction stay",
    desc: "What helps when an induction may run long — long charging cables, soft layers, snacks, your own pillow." },
  { slug: "the-third-trimester-emotionally", img: thirdEmotionalImg, tag: "Emotions",
    title: "Post-term, emotionally",
    desc: "The unique exhaustion of going past your date by more than a week — and how to be tender with yourself." },
  { slug: "sleep-in-the-third-trimester", img: thirdSleepImg, tag: "Body",
    title: "Sleep when sleep is rare",
    desc: "Side-sleeping, pillows, restless legs, and the broken nights of the longest weeks of all." },
  { slug: "preparing-the-nursery", img: thirdNurseryImg, tag: "At home",
    title: "Coming home, whenever it is",
    desc: "What's actually needed at home for your first day with baby — even if that day arrives later than expected." },
];

const Related = () => (
  <section id="guidance" className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div className="max-w-xl">
          <SectionLabel>Read next, because of week 42</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.4rem] text-foreground leading-tight">
            Curated guidance for post-term pregnancies.
          </h2>
        </div>
        <Link to="/pregnancy/third-trimester"
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

/* 17. FAQ */
const faqs = [
  { q: "Is being 42 weeks pregnant safe?",
    a: "It is closely watched, supported, and well within the experience of NHS and international maternity care — but it is the outer edge. From 42+0 the (small) risk of stillbirth and complications begins to rise more noticeably than it did at 41 weeks, which is why almost everyone is offered induction by this point. With daily monitoring and active care, the vast majority of post-term pregnancies end safely with a healthy baby and a healthy birthing parent." },
  { q: "Why have I not been induced yet?",
    a: "Induction is offered, not imposed. Some people decline or delay it after a careful conversation about the risks and benefits. Some inductions are scheduled for this week and just haven't happened yet. Some units have waiting lists. If you don't have a clear plan in place by 42+0, ask for one today — your team should be able to tell you exactly what's being recommended and when." },
  { q: "Can I still decline induction at 42 weeks?",
    a: "Yes. Your team will probably encourage induction strongly at this point and explain the rising risks honestly, but the choice remains yours. If you decline, you'll be offered continued expectant management with very close monitoring — typically daily CTGs, regular scans, and clear safety-net advice. Your team will keep caring for you fully whichever choice you make." },
  { q: "Will my baby look 'overdue'?",
    a: "Some post-term babies arrive with drier or peeling skin (especially on hands and feet), longer fingernails and almost no vernix. Their hair may be a little longer. Many post-term babies look entirely typical. None of these features are a problem — they fade in days and often become quietly fond memories of their very first weeks." },
  { q: "Should my baby's movements feel different at 42 weeks?",
    a: "Movements may feel different — more rolling, stretching and pressure rather than big kicks — because there is no room left. But the strength and pattern should still be there. Movements do not slow down before labour. Any reduction or change in movement at 42 weeks needs you to phone your maternity assessment unit straight away. Day or night. Don't wait for tomorrow's monitoring slot." },
  { q: "Is there really nothing I can do to bring labour on?",
    a: "Not reliably. There is no good evidence that walking, curries, pineapple, sex, raspberry leaf tea, nipple stimulation or anything else will start labour before your body is ready. A membrane sweep is the only intervention with reasonable evidence — and induction is the only intervention with strong evidence. Rest is rarely wasted; experimental remedies usually are." },
  { q: "What if induction doesn't work?",
    a: "It does happen. Sometimes a first attempt at induction doesn't lead to labour and is paused, repeated, or moved on to a different stage. Sometimes a Caesarean becomes the recommended next step — for baby's wellbeing, your wellbeing, or simply because the plan needs to change. Your team will explain every step, every offer, and every alternative. There is no version of this you face alone." },
  { q: "Is it normal to feel completely depleted?",
    a: "Yes. Reaching 42 weeks is a long, heavy stretch — physically, emotionally, socially. Tearful afternoons, short tempers, defensive answers, quiet grief that 'this isn't going to plan', and a strange flatness can all sit together in the same day. Be tender. Mute the chats. Cancel anything that isn't an appointment. You are very nearly there." },
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
          Common questions at 42 weeks
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

/* 18. NEXT */
const Next = () => (
  <section className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
      <div className="bg-gradient-to-br from-sage-bg via-parchment to-stage-pregnancy/30 rounded-3xl border border-border/30 p-8 sm:p-10 md:p-14 text-center shadow-card-brand">
        <SectionLabel>Up next</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.5rem] text-foreground leading-tight mb-3">
          Whatever comes next — you are about to meet them.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 max-w-lg mx-auto mb-8 leading-[1.8]">
          Spontaneous, induced, instrumental or surgical — the route never changes the meeting.
          Read forward to the early days of life with your baby.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
          <Link to="/postpartum"
            className="inline-flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium shadow-cta hover:bg-terracotta-hover transition-colors">
            Explore the early days <ArrowRight size={14} />
          </Link>
          <Link to="/pregnancy/third-trimester"
            className="inline-flex items-center justify-center gap-2 border border-foreground/25 text-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium hover:bg-parchment-dark transition-colors">
            Back to the third trimester
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const Week42Page = () => (
  <div className="min-h-screen bg-parchment">
    <PregnancyWeekSeo weekNumber={42} />
    <Navbar />
    <Hero />
    <MetaBar />
    <AtAGlance />
    <Biology />
    <PostTerm />
    <Monitoring />
    <StillWaiting />
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

export default Week42Page;
