import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ChevronLeft, ChevronRight, Sprout, HeartPulse, Activity, Sparkles, Calendar, BookOpen,
  ArrowRight, Check, AlertTriangle, Plus, Minus, Heart, MessageCircle, Leaf, Moon,
  ShieldCheck, Stethoscope, Wind, Soup, Brain, Eye, Sun, Hand, Apple, Droplet, Footprints,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import fetusImg from "@/assets/week24-fetus.jpg";
import sweetcornImg from "@/assets/week24-sweetcorn.jpg";
import biologyImg from "@/assets/week24-biology-detail.jpg";
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
          <span className="text-foreground">Week 24</span>
        </nav>

        <p className="font-sans text-[11px] font-semibold tracking-[0.3em] uppercase text-sage mb-5">
          Second trimester · The threshold of viability
        </p>
        <h1 className="font-serif text-[2.5rem] sm:text-5xl md:text-[3.75rem] lg:text-[4.25rem] text-foreground leading-[1.04] tracking-tight mb-4 md:mb-5">
          24 Weeks Pregnant
        </h1>
        <p className="font-serif italic text-[1.05rem] sm:text-lg md:text-xl text-foreground/75 max-w-xl mx-auto leading-relaxed">
          Your baby is the size of an ear of sweetcorn — about 30 cm head to heel, around 600 grams, the threshold of viability quietly crossed in UK practice, and the week formal kick-counting begins.
        </p>
      </div>

      <Link to="/pregnancy/week/23" aria-label="Go to week 23" className="absolute left-3 sm:left-6 md:left-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronLeft size={18} />
      </Link>
      <Link to="/pregnancy/week/25" aria-label="Go to week 25" className="absolute right-3 sm:right-6 md:right-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronRight size={18} />
      </Link>
    </div>

    <div className="relative -mt-28 sm:-mt-36 md:-mt-40 mb-6">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex items-end justify-center gap-5 sm:gap-10 md:gap-14">
          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-card border-[3px] border-sage/15 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={sweetcornImg} alt="An ear of sweetcorn with husk pulled back" loading="lazy" width={512} height={512} className="w-full h-full object-cover" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.04]" />
            </div>
            <div className="text-center">
              <p className="font-serif italic text-[12.5px] text-foreground/80 leading-tight">ear of sweetcorn</p>
              <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/55 mt-1">~30&nbsp;cm</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full bg-card border-[4px] border-sage/30 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={fetusImg} alt="Soft editorial illustration of a 24-week baby with proportional limbs, eyebrows and longer eyelashes (eyelids fused but ready to open), thicker creamy vernix coating the skin, fine lanugo hair, plump cheeks, hand near the face, fingernails defined, suspended in luminous amniotic fluid" width={1024} height={1024} loading="eager" decoding="async" className="w-full h-full object-cover scale-[1.02]" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.05]" />
            </div>
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.22em] uppercase text-foreground/65">Your baby this week</p>
          </div>

          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-sage-bg to-stage-pregnancy/40 border-[3px] border-sage/25 flex items-center justify-center shadow-elevated">
              <span className="font-serif text-[1.7rem] sm:text-[1.95rem] text-foreground tracking-tight leading-none">16</span>
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
  { id: "kicks", label: "Kick-counting starts", Icon: Hand },
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
            <p className="font-sans text-[11.5px] font-normal text-foreground/60 mt-0.5">Updated for 2026 · 14 min read · The threshold of viability</p>
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
  { label: "Baby size", value: "~30 cm — sweetcorn" },
  { label: "Baby weight", value: "~600 g" },
  { label: "Trimester", value: "2 of 3 (week 24 of 27)" },
];

const AtAGlance = () => (
  <section id="at-a-glance" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl mb-14 md:mb-20">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 relative bg-gradient-to-br from-sage-bg/55 via-parchment to-stage-pregnancy/40 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-10 overflow-hidden shadow-card-brand">
        <img src={botanicalAccent} alt="" aria-hidden="true" className="absolute -left-3 bottom-0 w-28 opacity-35 pointer-events-none select-none" />
        <SectionLabel tone="sage">At a glance</SectionLabel>
        <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-5">
          The threshold of viability — surfactant building, kick-counting starting, the count-down quietly turning into a count-up.
        </h2>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8] mb-4">
          Inside, your baby is around 30 cm head to heel and weighs roughly 600 grams. The lungs continue to
          lay down surfactant. The face is fuller — eyebrows clear, longer eyelashes ready to be revealed when
          the eyelids unfuse in the next few weeks. Skin is pink with thicker creamy vernix in patches. The
          inner ear is fully formed and your baby reliably hears your voice through fluid and tissue.
        </p>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8]">
          Outside, this is the week the medical world treats as the threshold of viability — the gestational
          age from which active resuscitation and intensive neonatal care are usually offered in the UK if a
          baby were born now. It's also the week formal kick-counting begins. The count-down to viability
          quietly turns into a count-up of weeks lived this side of it.
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
  { title: "Surfactant production continuing in the lungs", body: "The work that started last week continues. Type II pneumocyte cells are producing more surfactant — the slippery mixture that will let air sacs hold open after birth. There still isn't enough for breathing air comfortably (that builds gradually all the way to about week 36), but the foundation is being laid every day. Branching of the smaller airways is also continuing, increasing the surface area available for eventual gas exchange." },
  { title: "Eyelashes longer, eyelids ready to unfuse", body: "Eyelashes are now clearly there along the still-fused eyelids, which will start to thin and separate over the next few weeks. By around week 26–28, the eyes will open for the first time, blink, react to light filtering through your skin. The face is fuller and more proportionally human. On 4D scans now, faces look genuinely like baby faces." },
  { title: "Inner ear and balance, brain folding fast", body: "The inner ear is fully formed and functional — your baby can sense which way is up and reacts to changes in your position. The cerebral cortex is folding rapidly into its characteristic gyri and sulci, creating the surface area the brain needs. Reflexes — startle, suck, grasp — are getting stronger. REM-like sleep cycles of 20 to 40 minutes are well established." },
  { title: "Skin colour, vernix and lanugo thickening", body: "Skin is still pink and slightly translucent — fat won't really start padding it out for another few weeks — but the creamy white vernix caseosa is now thicker, especially across the back, in skin folds, and around joints. Fine downy lanugo hair covers most of the body. Both will gradually shed as pregnancy continues, with most vernix gone by 40 weeks (though some babies are born with patches of it still in place)." },
];

const Biology = () => (
  <section id="biology" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="relative rounded-3xl overflow-hidden border border-border/40 shadow-card-brand">
            <div className="aspect-[4/5]">
              <img src={biologyImg} alt="Soft editorial close-up of a 24-week baby curled in the gestational sac, refined infant profile, eyebrows and longer eyelashes visible, thicker creamy vernix patches across the back and limbs, fine lanugo hair, plump cheeks, hand near the face, suspended in luminous amniotic fluid — the viability threshold week" loading="lazy" width={1024} height={1280} className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-foreground/60 to-transparent">
              <p className="font-serif italic text-[13px] text-background/95 leading-snug">
                Thirty centimetres. Surfactant building. The threshold of viability quietly crossed.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <SectionLabel>What's underway biologically</SectionLabel>
          <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-5">
            A baby crossing the threshold week — lungs building, eyelashes lengthening, vernix thickening into the protective coat.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8] mb-8 max-w-2xl">
            Week 24 is the week paediatric medicine treats as the threshold of viability in the UK. Inside,
            development continues at the same steady pace as last week — the threshold is symbolic and clinical,
            not biological. But the small refinements continue: more surfactant, longer eyelashes, thicker vernix.
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

const kickPoints = [
  { Icon: Hand, title: "What kick-counting actually means in 2026", body: "UK guidance has moved away from rigid 'count to ten' rules in favour of pattern awareness. The current advice (NHS, Tommy's, RCOG): from 24 weeks, learn your baby's individual pattern of movement — when active, when quiet, what kind of movement (rolls, kicks, hiccups), and how often. Then, every day, notice whether today's pattern matches what's normal for this baby. There is no single 'right' number of movements per hour. The number that matters is the change from your baby's normal." },
  { Icon: Sprout, title: "How to actually do it (practical version)", body: "Sit or lie down somewhere quiet at the same time most days — many people choose the evening, after a meal, when the baby tends to be most active. Put your hand on the bump and just notice. Movements include rolls, pokes, jabs, flutters, and rhythmic hiccups (which usually don't 'count' as movements but are reassuring). You don't need an app, a chart or a stopwatch. You need to learn what's normal for this particular baby." },
  { Icon: AlertTriangle, title: "When to phone — the rule that always applies", body: "If you've been feeling regular movement and you notice a clear, sustained reduction or change in your baby's normal pattern, phone maternity triage straight away. Don't wait until tomorrow. Don't try cold drinks, ice on the bump, or sugary snacks to wake the baby — current guidance is explicit that these methods are not reliable and should not delay you phoning. The number is in your maternity notes. Phoning early is always better than phoning late, and you will never be made to feel silly for it." },
  { Icon: Heart, title: "Hiccups, quiet windows, and other normal things", body: "Babies hiccup in the womb — rhythmic, often repetitive twitching, sometimes for several minutes at a time. Completely normal and reassuring. Babies also have quiet windows of 20 to 40 minutes where they're sleeping and don't move much. A quiet hour at the wrong time isn't necessarily a reduction. The thing you're watching for is a clear, sustained change from your baby's particular pattern. If in doubt, phone." },
];

const Kicks = () => (
  <section id="kicks" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel tone="sage">Kick-counting starts this week</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        Pattern awareness, not counting to a magic number — and the rule that always applies.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        From week 24, UK guidance asks you to learn your baby's particular pattern of movement and to notice
        any clear, sustained change. There is no specific number. There is one rule: a sustained reduction or
        change in your baby's normal pattern always needs a phone call. Today, not tomorrow.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {kickPoints.map(({ Icon, title, body }) => (
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
        Don't try cold drinks or ice on the bump to wake the baby. Current UK guidance is clear: those methods
        aren't reliable, and they delay the call you should be making. Phoning early is always allowed.
      </p>
    </div>
  </section>
);

const bodyNotes = [
  { Icon: Activity, title: "Fundus around 24 cm — measured from now", body: "By week 24 the top of the uterus (the fundus) is sitting roughly 24 cm above your pubic bone — fundal height in cm tracks closely with weeks of pregnancy through the middle stretch. From this week onwards, your midwife will measure it routinely at every appointment using a tape measure, plotting it on your growth chart. Small variations are normal; significant under- or over-measuring sometimes triggers a growth scan." },
  { Icon: Calendar, title: "The glucose tolerance test conversation", body: "If you have risk factors for gestational diabetes (raised BMI, family history, previous large baby, certain ethnicities, previous gestational diabetes), you'll be offered an oral glucose tolerance test (OGTT) somewhere between weeks 24 and 28. Fasting overnight, drinking a sweet glucose drink at the hospital, blood tests at intervals. Usually a few hours total. A diagnosis of gestational diabetes is very manageable and the team will support you closely from there." },
  { Icon: Hand, title: "Posture, lower-back & pelvic-girdle pain", body: "The growing bump continues to shift your centre of gravity forward. Lower-back ache, hip discomfort and pubic-bone tenderness are very common. Pelvic-girdle pain (PGP, sometimes called SPD) — sharp pain in the pubic bone or around the back of the pelvis, especially when walking, climbing stairs or rolling over in bed — is common enough to ask about specifically. Specialist physiotherapy genuinely helps." },
  { Icon: Moon, title: "Side-sleep officially advised from week 28", body: "Official UK advice (Tommy's, NHS) is to fall asleep on your side from week 28 — not on your back — to reduce stillbirth risk. Build the habit at week 24, not week 30. The set-up that works: a pillow between the knees, one supporting the bump, one behind the back — or a proper pregnancy pillow. If you wake on your back, just turn back onto your side. Don't worry; do." },
  { Icon: Wind, title: "Heartburn established, mild breathlessness", body: "The rising uterus presses on the stomach and the diaphragm. Smaller meals, eating slowly, not lying flat for an hour after eating, sleeping slightly propped up. Gaviscon is safe. Mild breathlessness on stairs is normal — sudden severe breathlessness, breathlessness with chest pain or rapid heartbeat is not." },
  { Icon: Eye, title: "Skin: pigmentation, stretch marks, itching", body: "Linea nigra deepening down the centre of the belly. Possible melasma patches on the face — sun cream and a hat reduce it. Stretch marks beginning on the bump, breasts, hips, thighs or bottom. Sudden whole-body itching, especially hands and feet at night, is different and needs a same-day check for cholestasis." },
];

const Body = () => (
  <section id="body" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="max-w-2xl mb-10">
        <SectionLabel tone="terracotta">Your body this week</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
          Fundal height measured from now, GTT conversation, and the official switch to side-sleep coming.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
          Week 24 brings routine fundal-height measurement, the glucose tolerance test conversation for those
          with risk factors, and the official side-sleep transition coming up at week 28. Build the habit now.
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
    Icon: Hand, name: "Movement reliable, pattern emerging",
    feels: "Definite kicks from particular spots. Rolls across the bump. A flurry in the evening. Visible twitches under clothing. Hiccups — rhythmic, repetitive, sometimes for several minutes.",
    why: "Stronger muscles, better coordination, a baby big enough that movements consistently reach the abdominal wall. Hiccups happen as the diaphragm practices.",
    normal: "Pattern awareness starts this week. There's no specific number. A clear sustained reduction or change in your baby's normal pattern always needs a phone call to maternity triage today, not tomorrow.",
  },
  {
    Icon: Activity, name: "Pelvic-girdle pain (PGP)",
    feels: "Sharp pain in the pubic bone or around the back of the pelvis. Worse with walking, climbing stairs, getting in and out of the car, rolling over in bed. Sometimes a clicking or grinding sensation.",
    why: "Pelvic joints softening under pregnancy hormones (especially relaxin) plus the asymmetric loading of a growing bump. Some pelvises tolerate it easily; others don't.",
    normal: "Common. Specialist physiotherapy genuinely helps — ask your midwife for a referral. Avoid wide-leg movements, get dressed sitting down, sleep with a pillow between the knees.",
  },
  {
    Icon: Wind, name: "Heartburn — established",
    feels: "Burning behind the breastbone or in the throat after meals or lying down. Acid taste. A 'too full' feeling after small portions. Worse in the evening and at night.",
    why: "Progesterone relaxes the valve at the top of the stomach. The rising uterus presses the stomach upwards. Both let acid travel back up.",
    normal: "Very common from now. Smaller meals, eating slowly, not lying flat for an hour after eating, sleeping slightly propped up. Gaviscon is safe.",
  },
  {
    Icon: Footprints, name: "Mild swelling in feet & ankles",
    feels: "Mild puffiness in the feet, ankles or hands by the end of the day. Shoes feeling tighter in the evening than in the morning. Rings starting to feel snug.",
    why: "Higher blood volume, hormonal effects on fluid retention, and gravity. Worse in heat, after long standing, late in the day.",
    normal: "Mild gradual swelling is normal. Sudden swelling in the face or hands, or one-sided leg swelling with pain, needs urgent assessment — pre-eclampsia or DVT.",
  },
  {
    Icon: Moon, name: "Vivid dreams & broken sleep",
    feels: "Strange, vivid, often baby-related dreams you remember in detail. Waking more often. Difficulty getting comfortable. Frequent night-time weeing.",
    why: "Hormonal changes affect sleep architecture. The growing bump makes positions awkward. Higher blood volume means kidneys process more fluid overnight.",
    normal: "Very common. Pillow set-up genuinely helps. Worsening insomnia or persistent low mood needs a midwife conversation.",
  },
  {
    Icon: Brain, name: "Braxton-Hicks, sometimes noticeable now",
    feels: "Painless tightening across the bump that lasts 30 to 60 seconds, then releases. Often after activity, sex, or a full bladder. Sometimes barely noticeable, sometimes clearly there.",
    why: "Practice contractions of the uterus. The muscle tightening and releasing as it tones up for the eventual work of labour.",
    normal: "Very common from week 24 onwards. Drink water, lie down, change position. Regular, painful or rhythmic tightenings, or any with bleeding or fluid, need urgent assessment for preterm labour.",
  },
  {
    Icon: Stethoscope, name: "Increased vaginal discharge",
    feels: "More white, milky, mild-smelling discharge than usual. Often noticeable enough to warrant a panty liner.",
    why: "Higher oestrogen and increased blood flow to the cervix and vaginal walls. Part of the body's protective barrier in pregnancy.",
    normal: "Very common. Itching, burning, a strong smell, green/yellow colour, or any blood needs a GP or midwife check. Persistent watery leaking needs urgent check for waters.",
  },
  {
    Icon: Soup, name: "Real, sustained appetite & cravings",
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
        What's likely to show up at week 24 — and what each one really means.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        Week 24 brings reliable movement, established heartburn, broken sleep, mild swelling, sometimes pelvic-girdle
        pain, and the first noticeable Braxton-Hicks for some. Most are normal. A few are worth flagging.
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
        Read: the mid second-trimester body shift <ArrowRight size={13} />
      </Link>
    </div>
  </section>
);

const emotionalTruths = [
  "A quiet exhale at having reached the threshold.",
  "A new awareness of movement, sometimes anxious.",
  "Tearfulness arriving without warning at the strangest moments.",
  "A more rooted relationship with the bump as a real future person.",
  "Speaking to the baby out loud, often without meaning to.",
  "Body-image weather that comes and goes through the same day.",
  "Sixteen more weeks. Both impossibly long and impossibly close.",
];

const Emotional = () => (
  <section id="emotional" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 relative bg-gradient-to-br from-lavender-bg via-parchment to-lavender-bg/40 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-9 shadow-card-brand overflow-hidden">
          <img src={botanicalAccent} alt="" aria-hidden="true" className="absolute right-0 top-0 w-24 opacity-35 pointer-events-none select-none" />
          <SectionLabel tone="lavender">Emotionally this week</SectionLabel>
          <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-4">
            A quiet exhale — and a new, more watchful attention to movement.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/80 leading-[1.8] mb-4">
            Week 24 sits in a particular emotional place. The threshold of viability is here. There's often a
            quiet exhale — small, almost private — at having reached it. There's also, for many people, a new
            and slightly anxious watchfulness around movement, especially with kick-counting starting this week.
          </p>
          <p className="font-sans text-[14px] text-foreground/70 leading-[1.75]">
            Both can sit together. The exhale and the new vigilance are both real. Neither is a sign that
            something is wrong. They are the normal emotional weather of having crossed a real medical milestone
            in a body that's working very hard to grow a person.
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
  { Icon: Hand, title: "Start kick-counting properly", note: "From this week, start noticing your baby's individual pattern of movement every day. Same-ish time of day, somewhere quiet, hand on the bump, paying attention. There is no number to count to. The thing you're watching for is a clear, sustained change from this baby's normal. Save the maternity triage number in your phone now. A clear sustained reduction or change in your baby's normal pattern always needs a phone call today, not tomorrow." },
  { Icon: Calendar, title: "GTT — book it if you've been offered one", note: "If you've been offered an oral glucose tolerance test (OGTT) for gestational diabetes risk, this is the window — between weeks 24 and 28. It involves fasting overnight, drinking a sweet glucose solution at the hospital, and blood tests over a few hours. Bring a book, a snack for after, and someone to wait with you if possible. Diagnosis is very manageable. Don't skip it if it's been recommended." },
  { Icon: Moon, title: "Lock in side-sleep before week 28", note: "From week 28, official UK advice is to fall asleep on your side — not on your back — to reduce stillbirth risk. Build the habit at week 24. The set-up that works for most: a pillow between the knees, one supporting the bump, one behind the back — or a proper pregnancy pillow. If you wake on your back, just turn onto your side. Don't worry; do." },
  { Icon: Apple, title: "Iron, calcium, hydration, protein", note: "Iron at most meals (red meat, beans, lentils, leafy greens, fortified cereals) paired with vitamin C for absorption. Calcium daily. Protein at every meal. Hydrate properly. About 300 extra calories a day for the second trimester. If you feel persistently flat, mention it — second-trimester anaemia is very common and easily checked." },
  { Icon: Calendar, title: "Antenatal classes & maternity-leave plans", note: "If you haven't already, book antenatal classes now (NHS, NCT or community-based — they often book up months ahead, especially the popular ones). If you're employed, the maternity-leave conversation with HR can happen any time — many people do it around now. You don't have to commit to dates yet, but knowing the options early takes pressure off the third trimester." },
  { Icon: Sprout, title: "Practical short-list", note: "Pram or carrier. Car seat (legally required to leave hospital). Where the baby will sleep for the first six months — in your room, in a cot or Moses basket (official UK guidance, for safer sleep). Names, even just a starting list. Hospital bag thinking can wait, but the bigger items are easier to research now than in the third trimester." },
];

const Focus = () => (
  <section id="focus" className="bg-sage-bg/35 py-16 md:py-24 border-y border-border/30">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <SectionLabel tone="sage">Focus this week</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.2rem] text-foreground leading-tight mb-4">
            Start kick-counting, book the GTT if needed, lock in side-sleep, plan the practical list.
          </h2>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8]">
            Week 24 is a doing-week. Kick-counting starts. The GTT window opens. Side-sleep needs to become
            habit before week 28. The practical short-list deserves time before the third trimester arrives.
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
            From week 24, the threshold for phoning gets gentler, not stricter.
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
        Six hundred grams of small person, lungs quietly building the substance that will let air sacs hold open after birth, the threshold of viability quietly crossed. Week 24 isn't a switch — it's the moment a count-down becomes a count-up.
      </p>
      <Heart size={14} className="text-sage/60 mx-auto mt-5" />
    </div>
  </section>
);

const reflectionPrompts = ["What reaching this week feels like", "How I plan to notice movement", "Something I want to say to the baby", "A small kindness for myself"];
const askChips = ["What does kick-counting actually mean?", "What is the glucose tolerance test?", "When should I phone about reduced movement?", "Should I sleep on my side already?", "Are Braxton-Hicks normal at 24 weeks?"];

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
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.24em] uppercase text-sage">Ask about week 24</p>
            <h3 className="font-serif text-[1.3rem] sm:text-[1.35rem] text-foreground mt-0.5 leading-snug">A question on your mind?</h3>
          </div>
        </div>
        <p className="font-sans text-[13px] text-foreground/70 leading-relaxed mb-4">Get a calm, evidence-led answer tailored to where you are right now.</p>
        <input type="text" placeholder="e.g. How do I actually do kick-counting?" className="w-full bg-parchment/80 border border-border/40 rounded-full px-5 py-3.5 font-sans text-[13.5px] text-foreground placeholder:text-foreground/45 focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/30 transition-all" />
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
            The week the count-down becomes a count-up deserves a page.
          </h3>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8] mb-6">
            The quiet exhale at reaching the threshold. The new attention to movement. The moment that
            might one day be told back to your child. The journal holds the small, invisible turning
            points of becoming a parent — the ones nobody warns you matter.
          </p>
          <ul className="space-y-2.5 mb-7">
            {["A page for the threshold week", "Letters to your baby through every week", "Guided pages all the way to birth"].map((line) => (
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
  { slug: "second-trimester-movement", img: movementImg, tag: "Movement",
    title: "Kick-counting from 24 weeks: what it really means now",
    desc: "Pattern awareness, not magic numbers. How to do it properly, what to watch for, and exactly when to phone." },
  { slug: "second-trimester-body", img: bodyImg, tag: "Body",
    title: "The mid second-trimester body shift",
    desc: "Bump fully visible, fundus measurable, posture changing — what to expect physically as the body settles into the middle stretch." },
  { slug: "second-trimester-sleep", img: sleepImg, tag: "Sleep",
    title: "Setting up your sleep for the months ahead",
    desc: "Why side-sleeping matters, the set-up that makes it comfortable, and how to build the habit before week 28." },
  { slug: "second-trimester-movement-exercise", img: movementExImg, tag: "Movement",
    title: "Moving your body in the second trimester",
    desc: "What's safe, what helps, and how to use the energy lift while it's here. The simple rules for walking, yoga, swimming and strength." },
  { slug: "second-trimester-eating", img: eatingImg, tag: "Nutrition",
    title: "Eating well in the second trimester",
    desc: "Iron, calcium, protein, hydration — the second-trimester triangle, and how to handle real cravings without overthinking." },
  { slug: "second-trimester-anxiety", img: anxietyImg, tag: "Mind",
    title: "Holding the threshold of viability",
    desc: "Why crossing 24 weeks brings both relief and a new vigilance — and how to be gentle with both at once." },
];

const Related = () => (
  <section id="guidance" className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div className="max-w-xl">
          <SectionLabel>Read next, because of week 24</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.4rem] text-foreground leading-tight">
            Curated guidance for the threshold week.
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
  { q: "How do I actually do kick-counting from 24 weeks?",
    a: "Current UK guidance (NHS, Tommy's, RCOG) has moved away from rigid 'count to ten' rules in favour of pattern awareness. From week 24, learn your baby's individual pattern of movement: when active, when quiet, what kind of movement, and how often. Then, every day, notice whether today's pattern matches what's normal for this baby. Sit or lie somewhere quiet at roughly the same time each day (many people choose the evening, after eating). Hand on the bump. Pay attention. There's no app required. The thing that matters is the change from your baby's normal — not a specific number." },
  { q: "What should I do if I notice reduced movement?",
    a: "Phone maternity triage straight away. Today, not tomorrow. The number is in your maternity notes — save it in your phone now. Don't try cold drinks, ice on the bump, or sugary snacks to 'wake' the baby — current UK guidance is explicit that those methods aren't reliable and they delay the call you should be making. Phoning early is always better than phoning late, and you will never be made to feel silly for it. The team will likely ask you to come in for monitoring with a CTG (heart-rate trace) and possibly a scan. This is exactly what the system is set up for." },
  { q: "What does the threshold of viability really mean at 24 weeks?",
    a: "In UK practice, 24 weeks is widely accepted as the threshold of viability — the gestational age from which active resuscitation and intensive neonatal care are usually offered if a baby were born. It's not a magic switch. Survival and outcomes improve week by week from there, and there are now occasional survivors at 22 and 23 weeks with extraordinary intensive care. But 24 weeks is the established line in UK guidance. For most people, it's a quiet emotional milestone rather than a medical one — a count-down quietly turning into a count-up. Day-to-day, your job is the same: eat well, sleep on your side, notice movement, phone if anything feels wrong." },
  { q: "What is the glucose tolerance test (GTT) like?",
    a: "If you've been offered an oral glucose tolerance test (OGTT) for gestational diabetes risk — usually because of raised BMI, family history, previous large baby, certain ethnicities, or previous gestational diabetes — it usually happens between weeks 24 and 28. You fast overnight (no food or drink other than water from about midnight). At the hospital you have a fasting blood test, then drink a measured sugary glucose drink, then have one or two further blood tests at intervals (usually one and/or two hours later). Total time is normally a few hours. Bring something to read, a snack to eat afterwards, and someone to wait with you if possible. The drink isn't anyone's favourite, but it's tolerable. Diagnosis is very manageable and your team will support you closely from there." },
  { q: "Is it okay if I sometimes wake up on my back?",
    a: "Yes — current UK advice (Tommy's, NHS) is to fall asleep on your side from week 28, but that doesn't mean you'll harm your baby if you wake up briefly on your back. Bodies move in sleep. If you notice you're on your back, just turn back onto your side and go back to sleep. Don't worry. The advice is about the position you start in, because that's the one you spend most of the night in. Building the habit at week 24 — a pillow between the knees, one supporting the bump, one behind the back — makes the week 28 transition easy rather than panicked." },
  { q: "Are Braxton-Hicks contractions normal at 24 weeks?",
    a: "Yes — Braxton-Hicks (practice contractions) can become noticeable from around 24 weeks for many people. They feel like a painless tightening across the bump, lasting 30 to 60 seconds, then releasing. Often after activity, sex, or when you have a full bladder. They're the uterus toning up for the eventual work of labour. Drinking water, lying down on your side, and changing position usually settles them. What is not Braxton-Hicks: regular, painful, rhythmic tightenings, especially with bleeding, fluid loss, or lower-back pain — those need urgent assessment for preterm labour." },
  { q: "When will my baby's eyes open?",
    a: "The eyelids have been fused shut since around week 9, and they typically begin to thin and unfuse around weeks 26–28. From around week 28 onwards, your baby can open and close their eyes, blink, and react to light filtering through your skin (the inside of the womb is a gentle red-orange glow when bright light shines on the bump). At 24 weeks, the eyelashes are now clearly there but the eyes are still closed. The work of this week is more about the lungs and the brain than about vision." },
  { q: "Should I be feeling hiccups now?",
    a: "Yes — many people start feeling baby hiccups from around week 24 (some earlier, some later). They feel like a rhythmic, repetitive twitch in one spot of the bump, often for several minutes at a time. Sometimes once a day, sometimes more. They're caused by your baby's diaphragm practising — completely normal, and quite reassuring. Hiccups don't 'count' as movements for kick-counting purposes (they're involuntary), but they're a lovely sign of your baby being active and well. Some babies hiccup a lot, some barely at all — both are normal." },
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
        <h2 className="font-serif text-[1.85rem] sm:text-[1.95rem] md:text-[2.4rem] text-foreground leading-tight">Common questions at 24 weeks</h2>
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
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.5rem] text-foreground leading-tight mb-3">Ready for week 25?</h2>
        <p className="font-sans text-[14.5px] text-foreground/75 max-w-lg mx-auto mb-8 leading-[1.8]">
          Week 25 brings the first week clearly past the threshold — the body settling into a steadier middle
          stretch, and the gentle work of carrying on, week by week, this side of viability.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
          <Link to="/pregnancy/week/25" className="inline-flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium shadow-cta hover:bg-terracotta-hover transition-colors">
            Continue to week 25 <ArrowRight size={14} />
          </Link>
          <Link to="/pregnancy/second-trimester" className="inline-flex items-center justify-center gap-2 border border-foreground/25 text-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium hover:bg-parchment-dark transition-colors">
            Explore the second trimester
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const Week24Page = () => (
  <div className="min-h-screen bg-parchment">
    <Navbar />
    <Hero />
    <MetaBar />
    <AtAGlance />
    <Biology />
    <Kicks />
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

export default Week24Page;
