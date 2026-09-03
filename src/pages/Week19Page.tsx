import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ChevronLeft, ChevronRight, Sprout, HeartPulse, Activity, Sparkles, Calendar, BookOpen,
  ArrowRight, Check, AlertTriangle, Plus, Minus, Heart, MessageCircle, Leaf, Moon,
  ShieldCheck, Stethoscope, Wind, Soup, Brain, Eye, Sun, Hand, Apple, Droplet,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PregnancyWeekSeo from "@/components/seo/PregnancyWeekSeo";
import PublicWeekReflectionAsk from "@/components/pregnancy/PublicWeekReflectionAsk";
import fetusImg from "@/assets/week19-fetus.jpg";
import tomatoImg from "@/assets/week19-heirloomtomato.jpg";
import biologyImg from "@/assets/week19-biology-detail.jpg";
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
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import type { BreadcrumbItem } from "@/lib/seo/breadcrumbs";

// Single authoritative crumb array: feeds the visible trail and the schema.
const breadcrumbItems: BreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "Pregnancy", href: "/pregnancy" },
  { label: "Second trimester", href: "/pregnancy/second-trimester" },
  { label: "Week 19", href: "/pregnancy/week/19" },
];

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
        <BreadcrumbJsonLd items={breadcrumbItems} />
        <Breadcrumbs
          tone="section"
          className="flex justify-center mb-6 sm:mb-7 font-sans text-[12px] font-normal text-foreground/65"
          items={breadcrumbItems}
        />

        <p className="font-sans text-[11px] font-semibold tracking-[0.3em] uppercase text-sage mb-5">
          Second trimester · The week before the scan
        </p>
        <h1 className="font-serif text-[2.5rem] sm:text-5xl md:text-[3.75rem] lg:text-[4.25rem] text-foreground leading-[1.04] tracking-tight mb-4 md:mb-5">
          19 Weeks Pregnant
        </h1>
        <p className="font-serif italic text-[1.05rem] sm:text-lg md:text-xl text-foreground/75 max-w-xl mx-auto leading-relaxed">
          Your baby is the size of an heirloom tomato — about 15 cm, 240 grams, vernix beginning to coat the skin like a soft white cream, the brain mapping the senses one by one. Almost halfway. Almost at the scan. A week of quiet weight, gentle movement, and the kind of waiting that lives in the chest.
        </p>
      </div>

      <Link to="/pregnancy/week/18" aria-label="Go to week 18" className="absolute left-3 sm:left-6 md:left-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronLeft size={18} />
      </Link>
      <Link to="/pregnancy/week/20" aria-label="Go to week 20" className="absolute right-3 sm:right-6 md:right-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronRight size={18} />
      </Link>
    </div>

    <div className="relative -mt-28 sm:-mt-36 md:-mt-40 mb-6">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex items-end justify-center gap-5 sm:gap-10 md:gap-14">
          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-card border-[3px] border-sage/15 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={tomatoImg} alt="A ripe heirloom tomato" loading="lazy" width={512} height={512} className="w-full h-full object-cover" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.04]" />
            </div>
            <div className="text-center">
              <p className="font-serif italic text-[12.5px] text-foreground/80 leading-tight">heirloom tomato</p>
              <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/55 mt-1">~15&nbsp;cm</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full bg-card border-[4px] border-sage/30 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={fetusImg} alt="Soft editorial illustration of a 19-week baby with refined limbs, vernix beginning to appear in patches on the skin, fine lanugo hair, hand near the face, gently floating in the gestational sac" width={1024} height={1024} loading="eager" decoding="async" className="w-full h-full object-cover scale-[1.02]" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.05]" />
            </div>
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.22em] uppercase text-foreground/65">Your baby this week</p>
          </div>

          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-sage-bg to-stage-pregnancy/40 border-[3px] border-sage/25 flex items-center justify-center shadow-elevated">
              <span className="font-serif text-[1.7rem] sm:text-[1.95rem] text-foreground tracking-tight leading-none">21</span>
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
  { id: "scan", label: "The scan ahead", Icon: Calendar },
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
            <p className="font-sans text-[11.5px] font-normal text-foreground/60 mt-0.5">Updated for 2026 · 13 min read · The last week before the anomaly scan</p>
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
  { label: "Baby size", value: "~15 cm — heirloom tomato" },
  { label: "Baby weight", value: "~240 g" },
  { label: "Trimester", value: "2 of 3 (week 19 of 27)" },
];

const AtAGlance = () => (
  <section id="at-a-glance" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl mb-14 md:mb-20">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 relative bg-gradient-to-br from-sage-bg/55 via-parchment to-stage-pregnancy/40 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-10 overflow-hidden shadow-card-brand">
        <img src={botanicalAccent} alt="" aria-hidden="true" className="absolute -left-3 bottom-0 w-28 opacity-35 pointer-events-none select-none" />
        <SectionLabel tone="sage">At a glance</SectionLabel>
        <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-5">
          One week from the scan, vernix beginning to form, and a body almost halfway.
        </h2>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8] mb-4">
          Inside, your baby is around 15 cm long and weighs roughly 240 grams. The skin is starting to be
          coated in vernix caseosa — a soft, creamy white substance that protects the skin from being
          waterlogged in the amniotic fluid for the next twenty weeks. Brown fat is being laid down.
          Specialised regions of the brain are developing for each of the senses: hearing, smell, taste,
          sight, touch.
        </p>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8]">
          Outside, you're a week away from the halfway point and, for many, a week away from the anomaly
          scan. The bump is sitting above the navel. Movement is clearer for many. The week tends to
          carry a particular emotional weight — gratitude, anticipation, nerves, gentle disbelief that
          you're already here.
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
  { title: "Vernix caseosa beginning to form", body: "A soft, creamy white substance — vernix caseosa — is starting to coat your baby's skin in patches. It's made of shed skin cells, lanugo hair and oils from the developing skin glands, and it acts like a waterproof barrier, stopping the skin from being macerated by twenty more weeks of soaking in amniotic fluid. By later pregnancy it covers the whole body; some of it is still on the skin at birth, especially in the folds." },
  { title: "Brain mapping the senses, one by one", body: "Specialised regions of your baby's developing brain are now laying down the dedicated areas for each of the senses: hearing, sight, smell, taste, touch. Millions of new neurons are being made and wired together every minute. Your baby is starting to taste the amniotic fluid (which carries the flavours of what you eat), to feel pressure on the skin, and to hear sound clearly enough to startle to a slammed door." },
  { title: "Brown fat being laid down", body: "Brown adipose tissue — brown fat — is being deposited on the back, chest and around vital organs. It's a very different tissue from white fat: instead of storing energy, it generates heat by burning energy. After birth, brown fat is what helps your baby maintain body temperature in the first weeks before they can shiver." },
  { title: "Limbs in proportion, movement coordinated", body: "By week 19 your baby's limbs are in their final relative proportions to the body — no longer the head-heavy look of the first trimester. Movements are coordinated rather than reflexive: rolls, stretches, somersaults, hands moving deliberately to the face, fingers gripping the umbilical cord. Most of it still doesn't reach the abdominal wall hard enough to be felt every time, but it's constant." },
];

const Biology = () => (
  <section id="biology" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="relative rounded-3xl overflow-hidden border border-border/40 shadow-card-brand">
            <div className="aspect-[4/5]">
              <img src={biologyImg} alt="Soft editorial close-up of a 19-week baby curled in the gestational sac, recognisable infant profile, vernix beginning to coat the skin in patches, hand near the face, eyes closed, suspended in soft luminous fluid" loading="lazy" width={1024} height={1280} className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-foreground/60 to-transparent">
              <p className="font-serif italic text-[13px] text-background/95 leading-snug">
                Fifteen centimetres. Vernix forming. The week the brain begins to listen properly.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <SectionLabel>What's underway biologically</SectionLabel>
          <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-5">
            A small baby being protected, refined, and quietly mapped onto the world.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8] mb-8 max-w-2xl">
            Week 19 is when your baby's body starts being prepared for the long second half of pregnancy
            — a waterproof skin coating, the first brown fat for warmth, the brain laying down separate
            rooms for each of the senses. The work is no longer building from nothing; it's refining,
            protecting, rehearsing.
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
  { Icon: Calendar, title: "Where week 19 sits in the scan window", body: "The 20-week anomaly scan is usually offered between weeks 18 and 21, with most happening at 19 or 20 weeks. If you're at 19 weeks now, your scan may be this week, next week or the week after. If you don't have a date confirmed, contact your midwifery team this week — there's still room to slot in." },
  { Icon: Sparkles, title: "What the sonographer is actually looking for", body: "A detailed, head-to-toe check of your baby's anatomy: brain and skull, face and lip, spine, heart (all four chambers, valves, blood flow), lungs, stomach, kidneys, bladder, abdominal wall, arms, legs, hands and feet (often counting fingers and toes), the placenta's position, the umbilical cord, and the amount of amniotic fluid. Most major structural conditions can be seen; some are not visible on ultrasound at all." },
  { Icon: Eye, title: "Whether you'll find out the sex", body: "In most UK NHS trusts, if you want to know, the sonographer will tell you, provided your baby is in a position they can see clearly. A few trusts have policies of not telling, especially in earlier years; check at your dating scan or with your midwife. Sex assigned at scan is right around 95–99% of the time. Many people find out, many wait. Both are valid; you can change your mind right up to the moment." },
  { Icon: Heart, title: "How to manage the run-up emotionally", body: "Anticipation is heavy this week. Name the worry beforehand if you have one — not as catastrophising, but so it doesn't ambush you in the room. Bring someone with you. Plan something gentle for after, especially if it's a working day. Most scans are deeply reassuring; a small number find something that needs follow-up, and the team will guide you through what's next, calmly, slowly, fully." },
];

const Scan = () => (
  <section id="scan" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel tone="sage">The scan ahead</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        The 20-week anomaly scan — what it checks, and how to walk into it well.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        For many people, the anomaly scan is this week or the week after. It's the most detailed scan of
        the pregnancy. Knowing what it looks for, what it can and can't see, and what tends to come up
        emotionally in the run-up makes the day itself feel less like an ambush.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {scanPoints.map(({ Icon, title, body }) => (
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
        <span className="font-semibold">It's normal to feel more, not less, the closer the scan gets.</span>{" "}
        Anticipation is its own emotional weather. Even people who felt calm through the early second
        trimester often find the run-up to the anomaly scan brings a fresh layer of nerves. Talk to
        someone. Don't fill the day around the scan with hard things if you can help it.
      </p>
    </div>
  </section>
);

const bodyNotes = [
  { Icon: Activity, title: "Bump rising, fundus measurable", body: "Your uterus is now sitting above the navel, and from this point your midwife will measure the height of the fundus (the top of the uterus) at most appointments — a quick way to check baby is growing well. Most people now look pregnant in everyday clothes, and most have moved into proper maternity pieces." },
  { Icon: Hand, title: "Round-ligament & lower-back pain", body: "Sharp pulling sensations low in the pelvis or groin when you sneeze, stand quickly or roll over are the round ligaments stretching to support the heavier uterus. A duller, deeper ache in the lower back, hips or pubic bone shows up too, as posture shifts forward and pelvic joints soften. Warm baths and slow movement help." },
  { Icon: Moon, title: "Side-sleep getting essential", body: "Sleeping on your side is becoming the default now — falling asleep on your back is harder anyway, and from week 28 it's officially advised against. A pillow between the knees, one supporting the bump, one behind the back. A proper pregnancy pillow is genuinely worth it for many people from this point." },
  { Icon: Wind, title: "Heartburn, breathlessness, fuller meals", body: "The rising uterus is pushing on the stomach and the diaphragm. Smaller, more frequent meals, eating slowly, not lying flat for an hour after eating, and sleeping slightly propped up help. A short walk after meals settles things. Gaviscon is safe in pregnancy and works well; ask your midwife or pharmacist." },
  { Icon: Eye, title: "Pigmentation & swelling at low level", body: "Linea nigra deepening down the centre of the belly. Possible patches of melasma on the cheeks, forehead or upper lip. Mild puffiness in fingers, ankles or face in warm weather. All very common. Sudden severe swelling — especially in the face and hands with headache or vision changes — is different and needs urgent contact." },
  { Icon: Sun, title: "Mostly steady energy with afternoon dips", body: "For most people this is one of the steadier-energy stretches of pregnancy, with a fairly predictable afternoon dip. Eat little and often, drink properly, walk in daylight when you can, and say yes to a 20-minute lie down. If energy is consistently flat, mention it — second-trimester anaemia is very common and easily checked." },
];

const Body = () => (
  <section id="body" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="max-w-2xl mb-10">
        <SectionLabel tone="terracotta">Your body this week</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
          Almost halfway — visibly pregnant, settling into a new posture, asking for more rest.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
          Week 19 brings a clearly pregnant body, a fundus your midwife can now measure, more pull on the
          ligaments, sleep that needs proper set-up, and the first proper hints of late-pregnancy
          comforts and discomforts arriving in low-key form.
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
    Icon: Hand, name: "Movement clearer for many",
    feels: "Repeated soft pokes from the same spot. A definite nudge after eating. A fluttery flurry in the evening when you've finally sat down. For others, still nothing — and at 19 weeks that's still within normal, especially with an anterior placenta.",
    why: "Stronger muscles, more coordinated nerves, and a baby big enough that movements occasionally reach the abdominal wall hard enough to be felt. Anterior placenta cushions everything for weeks longer.",
    normal: "Most first pregnancies feel something definite between weeks 18 and 22. Not feeling anything yet at 19 is fine. From week 24 you'll be asked to track patterns; for now, just notice gently.",
  },
  {
    Icon: Activity, name: "Round-ligament & lower-back pain",
    feels: "Sharp, brief pulling low in the pelvis or groin when you sneeze, stand quickly, cough or roll over. A duller stretching ache in the lower back, hips or pubic bone as posture changes.",
    why: "Ligaments supporting the growing uterus are stretching more visibly, your centre of gravity is shifting forward, and the pelvic joints are softening under pregnancy hormones.",
    normal: "Very common, brief, and reassuring. Move slowly between positions, support the bump with hands or a band, warm baths help. Severe one-sided pain, pain with bleeding, or pain with fever needs a midwife call.",
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
    Icon: Brain, name: "Anticipation, scan-nerves, projection",
    feels: "Counting days. Imagining the room. Imagining best- and worst-case versions of the same five minutes. Difficulty focusing on work. Disrupted sleep the night before. A sense of being one week away from something big.",
    why: "The anomaly scan is a more detailed scan than the dating scan, and your nervous system knows it. Anticipation is its own emotional weather. Most scans are reassuring, but the body braces anyway.",
    normal: "Very common, even in calm pregnancies. Talk to your partner or a friend. Plan something gentle for after the scan day. If anxiety is interfering with sleep or daily life, speak to your midwife or GP.",
  },
  {
    Icon: Stethoscope, name: "Increased vaginal discharge",
    feels: "More white, milky, mild-smelling discharge than usual. Often noticeable enough to warrant a panty liner.",
    why: "Higher oestrogen levels and increased blood flow to the cervix and vaginal walls. It's part of the body's protective barrier in pregnancy.",
    normal: "Very common. Itching, burning, a strong smell, green/yellow colour, or any blood needs a GP or midwife check — thrush and bacterial vaginosis are easily treated.",
  },
  {
    Icon: Droplet, name: "Stuffy nose & nosebleeds",
    feels: "Persistent stuffiness with no cold. The occasional nosebleed when you blow your nose. Snoring you didn't used to do. Drier-feeling sinuses.",
    why: "Higher blood volume and higher oestrogen swell the lining of the nose. The blood vessels are also more fragile and can bleed with normal blowing.",
    normal: "Very common (rhinitis of pregnancy). Saline nasal spray, a humidifier, hydration and gentle blowing all help. Frequent bleeding or any difficulty breathing needs a GP check.",
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
        What's likely to show up at week 19 — and what each one really means.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        Week 19 brings a particular cluster: clearer movement (or not yet), heartburn and broken sleep,
        the stuffy nose of pregnancy rhinitis, and the emotional weight of being one week from a major
        scan. Most are normal. Some are worth flagging.
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
      <Link to="/articles/anxiety-in-pregnancy" className="inline-flex items-center gap-2 font-sans text-[13.5px] font-medium text-sage hover:gap-3 transition-all">
        Read: when the worry doesn't lift with the calendar <ArrowRight size={13} />
      </Link>
    </div>
  </section>
);

const emotionalTruths = [
  "Counting the days to the scan without meaning to.",
  "Imagining the best version of the next appointment, then quickly the worst.",
  "Hand on the bump in the evening, half-listening, half-talking.",
  "A small, surprising sadness about what pregnancy has changed in you already.",
  "Speaking to the baby out loud, and being slightly devastated by your own voice.",
  "Wishing the scan were tomorrow. Wishing it were further away. Both at once.",
  "A quiet thrill at being almost halfway. A quiet terror at being only halfway.",
];

const Emotional = () => (
  <section id="emotional" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 relative bg-gradient-to-br from-lavender-bg via-parchment to-lavender-bg/40 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-9 shadow-card-brand overflow-hidden">
          <img src={botanicalAccent} alt="" aria-hidden="true" className="absolute right-0 top-0 w-24 opacity-35 pointer-events-none select-none" />
          <SectionLabel tone="lavender">Emotionally this week</SectionLabel>
          <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-4">
            One week out — gentle, anticipatory, slightly braced.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/80 leading-[1.8] mb-4">
            Week 19 sits in a particular emotional place — almost halfway, almost at the scan, more
            visibly pregnant, more obviously real. The anticipation builds. The body grows quieter and
            heavier. The mind moves between best- and worst-case daydreams more than you'd choose.
          </p>
          <p className="font-sans text-[14px] text-foreground/70 leading-[1.75]">
            Wanting the scan and dreading it can sit in the same hour. So can quiet love and quiet fear.
            None of it is a sign that something is wrong — it's a sign that this matters.
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
  { Icon: Calendar, title: "Confirm the scan date and prepare for it well", note: "If you don't have your anomaly scan booked yet, contact your midwifery team this week. Drink water in the hour before so the bladder helps push the uterus into a good position. Wear something easy to lift up. Check how many people the trust allows in the room — many limit to one. Bring a partner, friend or family member if you can. Plan something gentle for after." },
  { Icon: Heart, title: "Decide ahead of time about finding out the sex", note: "If you want to know, tell the sonographer at the start. If you want to wait, tell them not to mention it (and to write it on the report sealed if relevant). It's much easier to have decided as a couple before the appointment than to have the conversation across a quiet exam room. You can change your mind right up to the moment." },
  { Icon: Moon, title: "Side-sleeping is becoming the default", note: "From around week 28, official UK advice is to fall asleep on your side. The set-up that makes it comfortable: a pillow between the knees, one supporting the bump, one behind the back. A proper pregnancy pillow is worth the spend for many people from this stage. Build the habit now — it's much easier than scrambling for it at 30 weeks." },
  { Icon: Apple, title: "Eat for the second trimester, properly", note: "Around 300 extra calories a day. Iron at most meals (red meat, beans, lentils, leafy greens, fortified cereals) paired with vitamin C for absorption. Calcium daily (dairy or fortified alternatives, tinned fish with bones, leafy greens). Hydrate properly — heartburn and constipation both worsen with dehydration." },
  { Icon: Activity, title: "Pelvic floor exercises, daily, properly", note: "Daily pelvic floor exercises from now genuinely help with bladder control later in pregnancy and recovery after birth. Squeeze (as if stopping a wee), hold for a few seconds, release. Aim for around 10 long holds and 10 quick squeezes, twice a day. The NHS Squeezy app or a daily reminder makes it actually happen." },
  { Icon: Sprout, title: "Quietly start thinking practical", note: "Not buying everything — just starting to think. Maternity-leave dates with HR. Antenatal classes (NHS, NCT or community-based). The first conversation about names. Even a single sticky note in your phone helps the next few weeks feel less ambushed by the practical questions that arrive once the scan is behind you." },
];

const Focus = () => (
  <section id="focus" className="bg-sage-bg/35 py-16 md:py-24 border-y border-border/30">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <SectionLabel tone="sage">Focus this week</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.2rem] text-foreground leading-tight mb-4">
            Scan ready, side-sleep, eat well, gentle planning.
          </h2>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8]">
            Week 19 is a preparation week. Confirm the scan, decide how you want it to go, build the
            sleeping habits that make the next twenty weeks easier, and quietly start thinking about the
            practical decisions waiting on the other side.
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
        Almost halfway. Almost at the scan. The vernix is forming, the brain is mapping the senses, the bump is rising past the navel. The waiting this week is its own kind of work — gentle, anticipatory, holding more than the calendar shows.
      </p>
      <Heart size={14} className="text-sage/60 mx-auto mt-5" />
    </div>
  </section>
);

const reflectionPrompts = ["What I'm hoping for from the scan", "What I'd like to remember about being almost halfway", "Something I want to say to the baby", "A small kindness I could give myself"];
const askChips = ["What does the 20-week scan check?", "Will they tell me the sex?", "How should I prepare for the scan?", "Is it normal to feel anxious before the scan?", "What is vernix?"];

const ReflectionAsk = () => (
  <PublicWeekReflectionAsk
    week={19}
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
            The week before the scan deserves a page.
          </h3>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8] mb-6">
            What you wanted from the scan. What you didn't say out loud. The note you left yourself the
            night before. The journal holds the small, invisible turning points of becoming a parent —
            the ones nobody warns you matter.
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
  { slug: "anxiety-in-pregnancy", img: secondAnxietyImg, tag: "Mind",
    title: "When the worry doesn't lift with the calendar",
    desc: "Why pregnancy anxiety can rise again before a major scan, and how to stay grounded in the days before." },
  { slug: "baby-movement-in-pregnancy", img: secondMovementImg, tag: "Movement",
    title: "What first baby movements really feel like",
    desc: "Bubbles, pops, butterflies, gas — the surprisingly subtle reality of early flutters, and what to do if you haven't felt anything yet." },
  { slug: "second-trimester-complete-guide", img: secondBodyImg, tag: "Body",
    title: "The mid second-trimester body shift",
    desc: "Bump rising past the navel, posture changing, heartburn arriving — what to expect physically as the body settles into being clearly pregnant." },
  { slug: "sleep-in-pregnancy", img: secondSleepImg, tag: "Sleep",
    title: "Setting up your sleep for the months ahead",
    desc: "Why side-sleeping matters, when to start, and the small set-up tweaks that make pregnancy sleep easier from week 19 onwards." },
  { slug: "moving-your-body-in-pregnancy", img: secondMovementExImg, tag: "Movement",
    title: "Moving your body in the second trimester",
    desc: "What's safe, what helps, and how to use the energy lift while it's here. The simple rules for walking, yoga, swimming and strength." },
];

const Related = () => (
  <section id="guidance" className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div className="max-w-xl">
          <SectionLabel>Read next, because of week 19</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.4rem] text-foreground leading-tight">
            Curated guidance for the week before the anomaly scan.
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
  { q: "How should I actually prepare for the 20-week anomaly scan?",
    a: "Practical: drink water in the hour before so the bladder helps push the uterus into a good position, but don't overdo it. Wear something easy to lift up. Check how many people the trust allows in the room — many limit to one. Bring a partner, friend or family member if you can. Decide ahead of time whether you want to know the baby's sex, and tell the sonographer at the start. Emotional: name the worry beforehand if you have one — not as catastrophising, but so it doesn't ambush you in the room. Plan something gentle for after, especially if it's a working day." },
  { q: "What does the 20-week anomaly scan actually check?",
    a: "It's a detailed scan of your baby's anatomy from head to toe — usually offered between 18 and 21 weeks. The sonographer systematically checks the head and brain, face, spine, heart (all four chambers, valves, blood flow), lungs, stomach, kidneys, bladder, abdominal wall, arms, legs, hands and feet (often counting fingers and toes), the placenta's position, the umbilical cord and the volume of amniotic fluid. Most major structural conditions can be detected, though some are not visible on ultrasound at all." },
  { q: "Is it normal to feel really anxious in the days before the scan?",
    a: "Very. The anomaly scan is a more detailed scan than the dating scan, and the run-up tends to bring fresh nerves — often even (and sometimes especially) in people who felt calmer through the early second trimester. Talking to your midwife, partner, or a friend who's been through it, and bringing someone with you on the day, all genuinely help. If anxiety is interfering with sleep or daily life, please mention it to your midwife or GP. There is no version of this where you have to carry it alone." },
  { q: "What is vernix and why is it forming now?",
    a: "Vernix caseosa is a soft, creamy white substance that starts to coat your baby's skin from around week 19. It's made of shed skin cells, lanugo (the fine downy hair) and oils from developing skin glands. It acts like a waterproof barrier — without it, twenty more weeks of soaking in amniotic fluid would damage the skin. By later pregnancy it covers the whole body; some of it is still on the skin at birth, especially in the folds of the neck, armpits and groin." },
  { q: "Will they tell me the sex at the scan if I want to know?",
    a: "In most UK NHS trusts, yes — if you want to know, the sonographer will usually tell you at the 20-week scan, provided your baby is in a position that lets them see clearly. A few trusts have policies of not telling, especially in earlier years; check at your dating scan or with your midwife. Sex assigned at scan is right around 95–99% of the time. Tell the sonographer at the start whether you want to know or want them not to mention it. Many people find out, many wait — both are valid." },
  { q: "I'm 19 weeks and still haven't felt definite movement — should I be worried?",
    a: "Not yet. Most first-time pregnancies feel something definite somewhere between weeks 18 and 22, and a wide range either side is normal. An anterior placenta (sitting at the front of the uterus) cushions movement and can delay first noticeable movement until weeks 22–24. Body composition, abdominal muscle tone and baby position all change when first flutters arrive. The anomaly scan in the next week or two will show you a baby who has been moving constantly the whole time — the lack of feeling isn't the same as a lack of movement." },
  { q: "What if the scan finds something?",
    a: "Most anomaly scans are deeply reassuring. A small number find something the team wants to look at more carefully — sometimes a soft marker that turns out to mean nothing, sometimes a specific structural finding. If that happens, the sonographer will usually pause the scan, explain calmly what they're seeing, and refer you on to a fetal-medicine specialist for a more detailed scan and a conversation. You'll be supported step by step. You don't have to decide anything in the room. Bring someone with you to the scan if you can." },
  { q: "Is it safe to have a glass of wine at 19 weeks?",
    a: "UK official guidance is to avoid alcohol entirely throughout pregnancy. There's no level of alcohol that's known to be safe at any stage — the safest approach is none. The risks scale with how much, how often and when, and the second-trimester brain is in a vulnerable phase of development. If you're a few weeks into knowing you're pregnant and have had drinks before that point, that's very common and the conversation to have is with your midwife rather than a guilt one alone — they hear it all the time and can reassure you." },
];

const Next = () => (
  <section className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
      <div className="bg-gradient-to-br from-sage-bg via-parchment to-stage-pregnancy/30 rounded-3xl border border-border/30 p-8 sm:p-10 md:p-14 text-center shadow-card-brand">
        <SectionLabel>Up next</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.5rem] text-foreground leading-tight mb-3">Ready for week 20?</h2>
        <p className="font-sans text-[14.5px] text-foreground/75 max-w-lg mx-auto mb-8 leading-[1.8]">
          Week 20 is the halfway mark — the anomaly scan, the formal middle of the journey, and the
          quiet recalibration that comes once the most detailed scan of pregnancy is behind you.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
          <Link to="/pregnancy/week/20" className="inline-flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium shadow-cta hover:bg-terracotta-hover transition-colors">
            Continue to week 20 <ArrowRight size={14} />
          </Link>
          <Link to="/pregnancy/second-trimester" className="inline-flex items-center justify-center gap-2 border border-foreground/25 text-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium hover:bg-parchment-dark transition-colors">
            Explore the second trimester
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const Week19Page = () => (
  <div className="min-h-screen bg-parchment">
    <PregnancyWeekSeo weekNumber={19} />
    <Navbar />
    <Hero />
    <MetaBar />
    <AtAGlance />
    <Biology />
    <Scan />
    <Body />
    <Symptoms />
    <Emotional />
    <Focus />
    <SeekSupport />
    <Quote />
    <ReflectionAsk />
    <Journal />
    <Related />
    <WeekCommonQuestions week={19} questions={buildWeekQuestions(19, faqs)} />
    <WeekSources week={19} sources={getWeekSources(19)} />
    <Next />
    <Footer />
  </div>
);

export default Week19Page;
