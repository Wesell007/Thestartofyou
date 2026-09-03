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
import fetusImg from "@/assets/week21-fetus.jpg";
import pomegranateImg from "@/assets/week21-pomegranate.jpg";
import biologyImg from "@/assets/week21-biology-detail.jpg";
import journalImg from "@/assets/journal-flatlay.jpg";
import botanicalTr from "@/assets/botanical-branch-tr.png";
import botanicalBl from "@/assets/botanical-branch-bl.png";
import botanicalAccent from "@/assets/article-botanical-accent.png";
import bodyImg from "@/assets/article-hero-second-body.jpg";
import anxietyImg from "@/assets/article-hero-second-anxiety.jpg";
import movementImg from "@/assets/article-hero-second-movement.jpg";
import movementExImg from "@/assets/article-hero-second-movement-exercise.jpg";
import sleepImg from "@/assets/article-hero-second-sleep.jpg";
import scanImg from "@/assets/article-hero-second-anatomy-scan.jpg";
import WeekCommonQuestions from "@/components/week/WeekCommonQuestions";
import WeekSources from "@/components/week/WeekSources";
import { buildWeekQuestions, getWeekSources } from "@/data/weekSupportContent";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

const SectionLabel = ({ children, tone = "sage" }: { children: React.ReactNode; tone?: "sage" | "terracotta" | "lavender" }) => {
  const toneCls = tone === "terracotta" ? "text-terracotta" : tone === "lavender" ? "text-lavender-foreground" : "text-sage";
  // Single authoritative crumb array: feeds the visible trail and the schema.
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Pregnancy", href: "/pregnancy" },
    { label: "Second trimester", href: "/pregnancy/second-trimester" },
    { label: "Week 21", href: "/pregnancy/week/21" },
  ];

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
          Second trimester · Past halfway, the exhale begins
        </p>
        <h1 className="font-serif text-[2.5rem] sm:text-5xl md:text-[3.75rem] lg:text-[4.25rem] text-foreground leading-[1.04] tracking-tight mb-4 md:mb-5">
          21 Weeks Pregnant
        </h1>
        <p className="font-serif italic text-[1.05rem] sm:text-lg md:text-xl text-foreground/75 max-w-xl mx-auto leading-relaxed">
          Your baby is the size of a pomegranate — about 27 cm head to heel, 360 grams, swallowing amniotic fluid, eyebrows penciled in, movements becoming a language. Past the scan. Past the halfway line. The first proper exhale of the second trimester begins to settle into your shoulders.
        </p>
      </div>

      <Link to="/pregnancy/week/20" aria-label="Go to week 20" className="absolute left-3 sm:left-6 md:left-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronLeft size={18} />
      </Link>
      <Link to="/pregnancy/week/22" aria-label="Go to week 22" className="absolute right-3 sm:right-6 md:right-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronRight size={18} />
      </Link>
    </div>

    <div className="relative -mt-28 sm:-mt-36 md:-mt-40 mb-6">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex items-end justify-center gap-5 sm:gap-10 md:gap-14">
          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-card border-[3px] border-sage/15 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={pomegranateImg} alt="A whole ripe pomegranate" loading="lazy" width={512} height={512} className="w-full h-full object-cover" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.04]" />
            </div>
            <div className="text-center">
              <p className="font-serif italic text-[12.5px] text-foreground/80 leading-tight">pomegranate</p>
              <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/55 mt-1">~27&nbsp;cm</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full bg-card border-[4px] border-sage/30 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={fetusImg} alt="Soft editorial illustration of a 21-week baby with proportional limbs, eyebrows visible, vernix caseosa coating the skin in patches, fine lanugo hair, hand near the umbilical cord, gently floating in the gestational sac" width={1024} height={1024} loading="eager" decoding="async" className="w-full h-full object-cover scale-[1.02]" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.05]" />
            </div>
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.22em] uppercase text-foreground/65">Your baby this week</p>
          </div>

          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-sage-bg to-stage-pregnancy/40 border-[3px] border-sage/25 flex items-center justify-center shadow-elevated">
              <span className="font-serif text-[1.7rem] sm:text-[1.95rem] text-foreground tracking-tight leading-none">19</span>
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
            <p className="font-sans text-[11.5px] font-normal text-foreground/60 mt-0.5">Updated for 2026 · 13 min read · The first week past halfway</p>
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
  { label: "Baby size", value: "~27 cm — pomegranate" },
  { label: "Baby weight", value: "~360 g" },
  { label: "Trimester", value: "2 of 3 (week 21 of 27)" },
];

const AtAGlance = () => (
  <section id="at-a-glance" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl mb-14 md:mb-20">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 relative bg-gradient-to-br from-sage-bg/55 via-parchment to-stage-pregnancy/40 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-10 overflow-hidden shadow-card-brand">
        <img src={botanicalAccent} alt="" aria-hidden="true" className="absolute -left-3 bottom-0 w-28 opacity-35 pointer-events-none select-none" />
        <SectionLabel tone="sage">At a glance</SectionLabel>
        <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-5">
          Past the halfway line — fully proportioned, swallowing fluid, and finally being felt.
        </h2>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8] mb-4">
          Inside, your baby is around 27 cm from head to heel and weighs roughly 360 grams. From this
          week onwards, length is measured crown-to-heel rather than crown-to-rump — proper baby
          proportions, proper baby measurements. Eyebrows are penciling in. The eyelids are still fused
          but the eye structures beneath are nearly complete. Taste buds are forming on the tongue and
          your baby is swallowing amniotic fluid, which carries the flavours of what you eat.
        </p>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8]">
          Outside, the sharpest of the scan-week nerves has usually passed. The bump is sitting clearly
          above the navel, the fundus is measurable at every appointment, and movement — for many people
          — is becoming clearer, more rhythmic, more recognisable as <em>this baby</em> rather than just
          a feeling. The first proper exhale of the second trimester begins.
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
  { title: "Crown-to-heel measurement begins", body: "From week 21, measurements switch from crown-to-rump (top of head to bottom of spine) to crown-to-heel (top of head to bottom of foot) — a quiet acknowledgement that your baby is now too long, and the legs too straightened, for the old way of measuring. About 27 cm now, growing roughly a centimetre a week. Properly baby-shaped, properly baby-proportioned." },
  { title: "Swallowing amniotic fluid daily", body: "Your baby is now swallowing meaningful amounts of amniotic fluid every day — and the digestive system, lined with developing taste buds, is processing it. The fluid carries the flavours of what you eat (garlic, vanilla, cumin, sweet things) and your baby is being introduced to the foods of your culture in utero. Anything absorbed is filtered through the kidneys and weed back out into the fluid; the cycle repeats." },
  { title: "Eyebrows, eyelids, fingernails", body: "Eyebrows are penciling in as fine, soft hair. The eyelids remain fused — they won't open until around weeks 26 to 28 — but the eye structures beneath are nearly complete: cornea, iris, retina, lens. Fingernails have grown to the tips of the fingers; toenails are following. Lanugo (the fine downy hair) covers the body, vernix caseosa (the creamy waterproof coating) is laid down on top of it." },
  { title: "Sleep cycles emerging in the brain", body: "Your baby is now sleeping in distinct cycles, including the equivalent of REM sleep, with eye movements detectable on detailed ultrasound. Sleep periods last around 12–14 hours a day at this stage, broken into shorter stretches. You'll often notice quieter and more active times across the day — the foundations of a circadian rhythm are being laid down, influenced by your own daily patterns." },
];

const Biology = () => (
  <section id="biology" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="relative rounded-3xl overflow-hidden border border-border/40 shadow-card-brand">
            <div className="aspect-[4/5]">
              <img src={biologyImg} alt="Soft editorial close-up of a 21-week baby curled in the gestational sac, recognisable infant profile, eyebrows visible, vernix caseosa coating the skin in patches, fine lanugo hair, hand near the face, eyes closed, suspended in luminous fluid" loading="lazy" width={1024} height={1280} className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-foreground/60 to-transparent">
              <p className="font-serif italic text-[13px] text-background/95 leading-snug">
                Twenty-seven centimetres. Eyebrows penciling in. The week measurements switch to crown-to-heel.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <SectionLabel>What's underway biologically</SectionLabel>
          <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-5">
            A baby being refined, rehearsed, and quietly introduced to the flavours of your week.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8] mb-8 max-w-2xl">
            Week 21 is the start of a long stretch where the heavy structural building is mostly done
            and the work shifts to refinement, rehearsal and growth. Tasting, swallowing, sleeping,
            stretching — your baby is practising being a baby.
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
  { Icon: Hand, title: "What movement is starting to feel like", body: "By week 21, many people who'd been feeling 'maybe' flutters are starting to feel something more definite — a soft poke, a roll, a flurry that arrives at roughly the same time of day. For others (especially first pregnancies, or those with an anterior placenta) it's still light and intermittent, and that's still within normal up to about 24 weeks. Movement at this stage is for noticing, not yet for tracking." },
  { Icon: Moon, title: "Quieter and more active times", body: "Your baby is now sleeping in cycles of 20–40 minutes, broken across the day. You'll often notice movement is quieter when you're up and walking (the gentle motion lulls the baby) and more active when you sit down or lie still — especially after meals and in the evening. This is normal, expected, and one of the first ways you start to learn this particular baby's pattern." },
  { Icon: Sparkles, title: "Why an anterior placenta cushions everything", body: "If your placenta is sitting at the front of the uterus (anterior), it sits between the baby and your abdominal wall and cushions movement — sometimes for weeks longer than usual. You may not feel definite movement until weeks 22–24, sometimes a little later. The baby is moving constantly. Your scan and your midwife will reassure you. Be patient with the timeline; it will come." },
  { Icon: Heart, title: "Movement as a relationship beginning", body: "This is often the week movement starts to feel less like a strange physical fact and more like a small relationship — a nudge after the same song, a stretch when you've been still too long, a flurry when your partner puts a hand on the bump. You don't have to feel it as profound. You don't have to feel it as anything at all. But many people, quietly, do." },
];

const Movement = () => (
  <section id="movement" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel tone="sage">Movement now</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        The week movement starts becoming a language — soft, intermittent, slowly familiar.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        Week 21 sits in the middle of the window most first pregnancies start to feel something
        properly. It's still soft, still inconsistent, still easy to miss when you're moving. From
        week 24 you'll be asked to track patterns; for now, the work is just to notice.
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
        <span className="font-semibold">Formal kick-counting starts at week 24, not now.</span>{" "}
        Before week 24 the pattern isn't established enough to be reliable. If you've previously felt
        regular movement and then notice a clear, sustained reduction, contact your midwife or maternity
        triage straight away — at any stage of pregnancy. Never wait until tomorrow.
      </p>
    </div>
  </section>
);

const bodyNotes = [
  { Icon: Activity, title: "Bump rising, fundus measured each appointment", body: "Your fundus (top of the uterus) is now sitting roughly 21 cm above your pubic bone — a useful, rough rule of thumb that the height in cm equals the week of pregnancy. Your midwife will measure it at every appointment from now on with a tape measure: a small, low-tech, surprisingly informative check that your baby is growing well." },
  { Icon: Hand, title: "Round-ligament & hip pain", body: "Sharp pulling sensations low in the pelvis or groin when you stand quickly, sneeze or roll over — round-ligament pain — are common and brief. A duller ache in the hips, lower back or pubic bone is the pelvic joints softening to make room. Warm baths, slow position changes, supportive shoes and (for some) a pregnancy support belt all help." },
  { Icon: Moon, title: "Sleep getting more interrupted", body: "Side-sleep is the default now. Falling asleep on your back is harder anyway, and from week 28 it's officially advised against. A pillow between the knees, one supporting the bump, one behind the back. Vivid dreams are common. So is waking to wee twice a night. So is restless legs. None of it means anything is wrong." },
  { Icon: Wind, title: "Heartburn, fuller meals, breathlessness", body: "The rising uterus is pressing on the stomach and the diaphragm. Eat slowly, in smaller portions, and don't lie flat for an hour after eating. Sleep slightly propped up. Gaviscon is safe in pregnancy and works well; ask your midwife or pharmacist. Brief breathlessness on stairs is normal; sudden severe breathlessness is not." },
  { Icon: Eye, title: "Visible pigmentation changes", body: "Linea nigra deepening down the centre of the belly. Possible patches of melasma (chloasma — the so-called mask of pregnancy) on the cheeks, forehead or upper lip. Darker areolas, darker freckles, darker scars. Sun cream and a hat help reduce melasma; most pigmentation changes fade in the months after birth." },
  { Icon: Sun, title: "Steady-ish energy with afternoon dips", body: "For most people this is one of the steadier-energy stretches of pregnancy, but the afternoon dip is real and predictable. Eat little and often, drink properly, get daylight when you can, say yes to a 20-minute lie down. If energy is consistently flat, mention it — second-trimester anaemia is common and easily checked." },
];

const Body = () => (
  <section id="body" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="max-w-2xl mb-10">
        <SectionLabel tone="terracotta">Your body this week</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
          Visibly past halfway — bump rising, posture shifting, sleep needing proper set-up.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
          Week 21 brings a clearly pregnant body, a fundus your midwife measures at every appointment,
          more pull on the ligaments, sleep that needs deliberate set-up, and the first hints of late
          pregnancy comforts and discomforts settling into a new daily rhythm.
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
    Icon: Hand, name: "Movement becoming more recognisable",
    feels: "A definite poke from the same spot. A soft roll after eating. A flurry when you've sat still for an hour. For others, still light and intermittent, especially with an anterior placenta — also normal at 21 weeks.",
    why: "Stronger muscles, more coordinated nerves, a baby big enough that some movements reach the abdominal wall hard enough to feel. Anterior placenta cushions things for weeks longer.",
    normal: "Most first pregnancies feel something definite between weeks 18 and 22. From week 24 you'll track patterns. Before then, just notice. A clear sustained reduction in previously felt movement always needs a phone call.",
  },
  {
    Icon: Activity, name: "Round-ligament & lower-back pain",
    feels: "Sharp brief pulling low in the pelvis or groin when you sneeze, stand quickly or roll over. A duller stretching ache in the lower back, hips or pubic bone as posture changes.",
    why: "Ligaments supporting the growing uterus are stretching, your centre of gravity is shifting forward, and the pelvic joints are softening under pregnancy hormones.",
    normal: "Very common, brief, reassuring. Move slowly between positions, support the bump, warm baths help. Severe one-sided pain, pain with bleeding, or pain with fever needs a midwife call.",
  },
  {
    Icon: Wind, name: "Heartburn & indigestion",
    feels: "Burning behind the breastbone or in the throat after meals or lying down. Acid taste in the mouth. A 'too full' feeling after small portions. Worse in the evening and at night.",
    why: "Progesterone relaxes the valve at the top of the stomach. The rising uterus presses the stomach upwards. Both let acid travel back up the oesophagus more easily.",
    normal: "Very common from now to the end. Smaller meals, eating slowly, not lying flat for an hour after meals, sleeping slightly propped up. Gaviscon is safe; ask your midwife or pharmacist.",
  },
  {
    Icon: Moon, name: "Vivid dreams & broken sleep",
    feels: "Strange, intense, often baby-related dreams you remember in detail. Waking more often. Difficulty getting comfortable. Frequent nighttime weeing. Restless legs in some.",
    why: "Hormonal changes affect sleep architecture. The growing bump makes positions awkward. Higher blood volume means kidneys process more fluid overnight. Iron levels affect restless legs.",
    normal: "Very common. Pillow between the knees, one supporting the bump, loo just before bed. Worsening insomnia or persistent low mood needs a midwife conversation.",
  },
  {
    Icon: Brain, name: "Post-scan emotional recalibration",
    feels: "A fragile relief. A bit of an emotional crash after the build-up. Surprise that the worry hasn't simply disappeared. Or — a softer, steadier confidence beginning to take its place.",
    why: "After a major reassurance, the nervous system takes time to drop the brace. Adrenalin from anticipation washes out and lower mood, tearfulness or flatness can follow before the new equilibrium settles.",
    normal: "Very common. The soft exhale of week 21 can take a few days to actually arrive. Persistent low mood, hopelessness or intrusive anxiety always needs a midwife or GP conversation.",
  },
  {
    Icon: Stethoscope, name: "Increased vaginal discharge",
    feels: "More white, milky, mild-smelling discharge than usual. Often noticeable enough to warrant a panty liner.",
    why: "Higher oestrogen and increased blood flow to the cervix and vaginal walls. It's part of the body's protective barrier in pregnancy.",
    normal: "Very common. Itching, burning, a strong smell, green/yellow colour, or any blood needs a GP or midwife check — thrush and bacterial vaginosis are easily treated.",
  },
  {
    Icon: Droplet, name: "Stretch marks beginning",
    feels: "Soft pink, red or purple lines appearing on the bump, breasts, hips, thighs or bottom. Sometimes mildly itchy as they form. Often more visible in the evening or after a warm shower.",
    why: "The skin is being stretched faster than its elastin can fully keep up with. Genetics is the strongest predictor — moisturisers don't really prevent them, but they soothe.",
    normal: "Very common. They fade to silvery lines in the months after birth. Sudden whole-body itching (especially hands and feet, especially at night) is different and needs a same-day midwife or GP check for cholestasis.",
  },
  {
    Icon: Soup, name: "Stronger appetite & specific cravings",
    feels: "Real, sustained hunger between meals. Specific cravings, sometimes for things you didn't expect. Pleasure in foods you previously left.",
    why: "Your baby is growing fast, your blood volume continues to climb. About 300 extra calories a day is the rough guide for the second trimester.",
    normal: "Very common. Aim for protein at every meal, iron-rich foods, fruit, vegetables, dairy, whole grains. Cravings for non-food items (ice, chalk, soil) need a GP check — they can signal iron deficiency.",
  },
];

const Symptoms = () => (
  <section id="symptoms" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel>Common symptoms</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        What's likely to show up at week 21 — and what each one really means.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        Week 21 brings a particular cluster: clearer movement (or not yet), heartburn and broken sleep,
        the first stretch marks, and a quiet emotional recalibration as the post-scan relief settles in.
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
        Read: what first baby movements really feel like <ArrowRight size={13} />
      </Link>
    </div>
  </section>
);

const emotionalTruths = [
  "A first proper exhale, days after the scan rather than the day of it.",
  "A surprising flatness once the build-up has washed out.",
  "Hand on the bump in the evening, recognising a pattern for the first time.",
  "Speaking to the baby out loud, and being slightly devastated by your own voice.",
  "A quiet, steadying confidence — for moments at a time, then back to wondering.",
  "Realising people on the street are clocking the bump now, and feeling exposed.",
  "Past halfway. Nineteen more weeks. Both feel impossibly long and impossibly short.",
];

const Emotional = () => (
  <section id="emotional" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 relative bg-gradient-to-br from-lavender-bg via-parchment to-lavender-bg/40 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-9 shadow-card-brand overflow-hidden">
          <img src={botanicalAccent} alt="" aria-hidden="true" className="absolute right-0 top-0 w-24 opacity-35 pointer-events-none select-none" />
          <SectionLabel tone="lavender">Emotionally this week</SectionLabel>
          <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-4">
            The first proper exhale — quieter, more embodied, gently more confident.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/80 leading-[1.8] mb-4">
            Week 21 sits in a particular emotional place — past the scan, past the halfway line, more
            visibly pregnant, with movement starting to become familiar. The brace eases. The shoulders
            drop a little. A quieter, steadier confidence often begins to take root.
          </p>
          <p className="font-sans text-[14px] text-foreground/70 leading-[1.75]">
            The relief isn't always tidy. Some people feel a small flatness as the adrenalin of the
            anticipation washes out. Some feel a fresh wave of disbelief that this is really happening.
            All of it is part of the recalibration. None of it means something is wrong.
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
  { Icon: Hand, title: "Notice movement gently — don't track yet", note: "From week 24 you'll be asked to track movement patterns formally. Before then, just notice. When does the baby tend to be active? After meals? In the evening? When you sit down? A clear, sustained reduction in previously felt movement always warrants a phone call to maternity triage — at any stage. But day-to-day, this week is for getting to know the rhythm, not measuring it." },
  { Icon: Moon, title: "Build the side-sleep habit now", note: "From around week 28, official UK advice is to fall asleep on your side. The set-up that makes it comfortable: a pillow between the knees, one supporting the bump, one behind the back. A proper pregnancy pillow is worth the spend for many people from this stage. Build the habit at week 21, not 30 — it's much easier than scrambling for it later." },
  { Icon: Apple, title: "Iron, calcium, hydration — the second-trimester triangle", note: "Iron at most meals (red meat, beans, lentils, leafy greens, fortified cereals) paired with vitamin C for absorption. Calcium daily (dairy or fortified alternatives, tinned fish with bones, leafy greens). Hydrate properly — heartburn and constipation both worsen with dehydration. About 300 extra calories a day for the second trimester." },
  { Icon: Activity, title: "Pelvic floor exercises, daily, properly", note: "Daily pelvic floor exercises from now genuinely help with bladder control later in pregnancy and recovery after birth. Squeeze (as if stopping a wee), hold for a few seconds, release. Aim for around 10 long holds and 10 quick squeezes, twice a day. The NHS Squeezy app or a daily reminder makes it actually happen." },
  { Icon: Calendar, title: "Antenatal classes & maternity-leave conversations", note: "Week 21 is a sensible time to think about antenatal classes (NHS, NCT or community-based — they often book up months ahead) and to start the maternity-leave conversation with HR if you're employed. You don't have to commit to dates yet, but knowing the options early takes pressure off the middle of the third trimester." },
  { Icon: Sprout, title: "Quietly start the practical list", note: "Not buying everything — just thinking. The pram or carrier conversation. The car seat (legally required to leave hospital). Where the baby will sleep for the first six months (in your room, in a cot or Moses basket). One sticky note in your phone helps the next twenty weeks feel less ambushed by the practical questions." },
];

const Focus = () => (
  <section id="focus" className="bg-sage-bg/35 py-16 md:py-24 border-y border-border/30">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <SectionLabel tone="sage">Focus this week</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.2rem] text-foreground leading-tight mb-4">
            Gentle attention — to movement, to sleep, to a few quiet practical lists.
          </h2>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8]">
            Week 21 is a settling-in week. Notice the pattern of movement without measuring it. Build
            the side-sleep habit before you need it. Eat for the second trimester. Begin the quietly
            practical lists that take pressure off the months ahead.
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
        Past halfway. Past the scan. Twenty-seven centimetres of small person, swallowing the flavours of your week, sleeping in cycles, beginning to feel like someone you know. The first proper exhale of the second trimester finally lands in the shoulders.
      </p>
      <Heart size={14} className="text-sage/60 mx-auto mt-5" />
    </div>
  </section>
);

const reflectionPrompts = ["What changed for me after the scan", "How movement is starting to feel", "Something I want to say to the baby", "A small kindness I could give myself"];
const askChips = ["When should I feel definite movement?", "What is an anterior placenta?", "Is heartburn really this bad now?", "When do I start kick-counting?", "Are stretch marks preventable?"];

const ReflectionAsk = () => (
  <PublicWeekReflectionAsk
    week={21}
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
            The first week past halfway deserves a page.
          </h3>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8] mb-6">
            The exhale you didn't know you were holding. The first time you knew the movement was a
            kick. The note you wrote to your baby on a Tuesday for no particular reason. The journal
            holds the small, invisible turning points of becoming a parent — the ones nobody warns you
            matter.
          </p>
          <ul className="space-y-2.5 mb-7">
            {["A page for the week past halfway", "Letters to your baby through every week", "Guided pages all the way to birth"].map((line) => (
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
    title: "What first baby movements really feel like",
    desc: "Bubbles, pops, butterflies, gas — the surprisingly subtle reality of early flutters, and what to do if you haven't felt anything yet at 21 weeks." },
  { slug: "second-trimester-complete-guide", img: bodyImg, tag: "Body",
    title: "The mid second-trimester body shift",
    desc: "Bump rising past the navel, posture changing, fundus measurable — what to expect physically as the body settles into being clearly pregnant." },
  { slug: "sleep-in-pregnancy", img: sleepImg, tag: "Sleep",
    title: "Setting up your sleep for the months ahead",
    desc: "Why side-sleeping matters, when to start, and the small set-up tweaks that make pregnancy sleep easier from week 21 onwards." },
  { slug: "anxiety-in-pregnancy", img: anxietyImg, tag: "Mind",
    title: "When the worry doesn't lift after the scan",
    desc: "Why post-scan calm can feel less tidy than expected, and how to let the second trimester actually settle into the shoulders." },
  { slug: "moving-your-body-in-pregnancy", img: movementExImg, tag: "Movement",
    title: "Moving your body in the second trimester",
    desc: "What's safe, what helps, and how to use the energy lift while it's here. The simple rules for walking, yoga, swimming and strength." },
  { slug: "20-week-anomaly-scan", img: scanImg, tag: "Scans",
    title: "What the 20-week anomaly scan actually checks",
    desc: "The reference for the scan you've just had — what was looked at, what the results mean, and how to read the report." },
];

const Related = () => (
  <section id="guidance" className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div className="max-w-xl">
          <SectionLabel>Read next, because of week 21</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.4rem] text-foreground leading-tight">
            Curated guidance for the first week past halfway.
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
  { q: "I'm 21 weeks and still haven't felt definite movement — should I be worried?",
    a: "Not yet. Most first-time pregnancies feel something definite somewhere between weeks 18 and 22, with up to about 24 weeks still being within normal range — especially with an anterior placenta (sitting at the front of the uterus, cushioning the movement). Your anomaly scan will have shown you a baby who has been moving constantly the whole time. The lack of feeling isn't the same as a lack of movement. If you've been feeling regular movement and then notice a clear sustained reduction, that's different — phone maternity triage straight away. But for first flutters that are still soft and intermittent at 21 weeks, the answer is patience." },
  { q: "When should I start counting kicks?",
    a: "Formal kick-counting starts at week 24, not earlier. Before then, the pattern isn't established enough to be reliable — movements are too soft, too intermittent, too easily missed. From week 24 onwards, the advice is to learn this baby's particular pattern (when active, how often, what it feels like) rather than counting to a magic number. The single most important rule is this: at any stage of pregnancy, a clear sustained reduction in previously felt movement always needs a phone call to maternity triage. Never wait until tomorrow." },
  { q: "What is an anterior placenta and why does it matter for movement?",
    a: "Your placenta can attach anywhere on the inside of your uterus. If it's attached to the front wall (anterior), it sits between your baby and your abdominal wall — and it cushions movement, sometimes for weeks longer than usual. People with an anterior placenta often don't feel definite movement until weeks 22, 23 or even 24. Your baby is moving constantly. Your anomaly scan (or your midwife) will have told you whether the placenta is anterior. Once you start feeling movement, the cushioning eases as the baby grows; the difference becomes much smaller by the third trimester." },
  { q: "Why is heartburn so much worse now?",
    a: "Two things are happening at once. Progesterone (one of the main pregnancy hormones) relaxes the valve at the top of the stomach that normally stops acid rising into the oesophagus. And the uterus, now sitting well above the navel, is pressing the stomach upwards. Both let acid travel back up more easily. The combination tends to get noticeably worse from around week 20–22 and stays present until birth. Smaller meals, eating slowly, not lying flat for an hour after eating, sleeping slightly propped up. Gaviscon is safe in pregnancy and works well — ask your midwife or pharmacist." },
  { q: "Are stretch marks preventable?",
    a: "Honestly: not really. Genetics is by far the strongest predictor of who gets them, where, and how much — if your mother had stretch marks, you're more likely to. Moisturisers (cocoa butter, bio-oil, coconut oil, plain emollient) feel lovely, soothe the tight, slightly itchy skin as it stretches, and are a good idea for comfort — but the evidence that they actually prevent stretch marks is genuinely weak. Most stretch marks fade dramatically in the months after birth, going from pink, red or purple to soft silvery lines. They are not a cosmetic problem to be solved." },
  { q: "I feel weirdly flat after the scan instead of euphoric — is that normal?",
    a: "Very. The build-up to a major scan is its own emotional weather, and when the relief lands the adrenalin washes out — and a few days of flatness, tearfulness, or strange anti-climax can follow before the new equilibrium settles. It doesn't mean you're not happy. It doesn't mean you're not bonded. It usually settles within a week or two. If low mood, hopelessness or intrusive anxiety persists or interferes with sleep or daily life, please mention it to your midwife or GP. Antenatal mental health is taken seriously and there is real support." },
  { q: "Is it safe to keep exercising at 21 weeks?",
    a: "Yes — for most people, regular moderate exercise is genuinely good for you and the baby across the second trimester. Walking, swimming, prenatal yoga, prenatal pilates, gentle strength work, and stationary cycling are all generally safe. From around week 16, avoid exercises that have you flat on your back for long periods, and stop anything that hurts. Avoid contact sports, anything with a high risk of falling (skiing, horse riding), and scuba diving entirely. If you weren't exercising before pregnancy, this is a good time to start gently, with a class designed for pregnancy. If anything's uncertain, ask your midwife." },
  { q: "When does the bump usually 'pop' or become obvious to other people?",
    a: "Somewhere between weeks 18 and 24 for most first pregnancies — earlier for second and subsequent ones, where the abdominal muscles have stretched before. Many people find the bump becomes clearly recognisable as a pregnancy bump (rather than a softer middle) at around weeks 20–22, and then visibly grows week to week. This can be lovely. It can also feel exposing — strangers begin to clock it, comment on it, occasionally touch it. You're allowed to ask people not to. You're allowed not to want to talk about it. The bump is yours." },
];

const Next = () => (
  <section className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
      <div className="bg-gradient-to-br from-sage-bg via-parchment to-stage-pregnancy/30 rounded-3xl border border-border/30 p-8 sm:p-10 md:p-14 text-center shadow-card-brand">
        <SectionLabel>Up next</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.5rem] text-foreground leading-tight mb-3">Ready for week 22?</h2>
        <p className="font-sans text-[14.5px] text-foreground/75 max-w-lg mx-auto mb-8 leading-[1.8]">
          Week 22 brings stronger, more visible movement — kicks others may finally see, a body the
          world starts to notice, and a pregnancy that begins to feel like an ongoing rhythm rather
          than a series of milestones.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
          <Link to="/pregnancy/week/22" className="inline-flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium shadow-cta hover:bg-terracotta-hover transition-colors">
            Continue to week 22 <ArrowRight size={14} />
          </Link>
          <Link to="/pregnancy/second-trimester" className="inline-flex items-center justify-center gap-2 border border-foreground/25 text-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium hover:bg-parchment-dark transition-colors">
            Explore the second trimester
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const Week21Page = () => (
  <div className="min-h-screen bg-parchment">
    <PregnancyWeekSeo weekNumber={21} />
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
    <WeekCommonQuestions week={21} questions={buildWeekQuestions(21, faqs)} />
    <WeekSources week={21} sources={getWeekSources(21)} />
    <Next />
    <Footer />
  </div>
);

export default Week21Page;
