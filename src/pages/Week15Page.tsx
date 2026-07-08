import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ChevronLeft, ChevronRight, Sprout, HeartPulse, Activity, Sparkles, Calendar, BookOpen,
  ArrowRight, Check, AlertTriangle, Plus, Minus, Heart, MessageCircle, Leaf, Moon,
  ShieldCheck, Stethoscope, Wind, Soup, Brain, Eye, Sun, Hand, Smile, Apple, Ear, Bone,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PregnancyWeekSeo from "@/components/seo/PregnancyWeekSeo";
import fetusImg from "@/assets/week15-fetus.jpg";
import orangeImg from "@/assets/week15-orange.jpg";
import biologyImg from "@/assets/week15-biology-detail.jpg";
import journalImg from "@/assets/journal-flatlay.jpg";
import botanicalTr from "@/assets/botanical-branch-tr.png";
import botanicalBl from "@/assets/botanical-branch-bl.png";
import botanicalAccent from "@/assets/article-botanical-accent.png";
import emotionalImg from "@/assets/article-hero-emotional-first-tri.jpg";
import secondBodyImg from "@/assets/article-hero-second-body.jpg";
import secondEatingImg from "@/assets/article-hero-second-eating.jpg";
import secondAnxietyImg from "@/assets/article-hero-second-anxiety.jpg";
import secondMovementImg from "@/assets/article-hero-second-movement-exercise.jpg";
import secondSleepImg from "@/assets/article-hero-second-sleep.jpg";

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
          <span className="text-foreground">Week 15</span>
        </nav>

        <p className="font-sans text-[11px] font-semibold tracking-[0.3em] uppercase text-sage mb-5">
          Second trimester · The week the bump becomes real
        </p>
        <h1 className="font-serif text-[2.5rem] sm:text-5xl md:text-[3.75rem] lg:text-[4.25rem] text-foreground leading-[1.04] tracking-tight mb-4 md:mb-5">
          15 Weeks Pregnant
        </h1>
        <p className="font-serif italic text-[1.05rem] sm:text-lg md:text-xl text-foreground/75 max-w-xl mx-auto leading-relaxed">
          Your baby is the size of a navel orange — bones starting to harden, ears settled into their final position, the first proper hint of a bump rising for many. The pregnancy is becoming something you can put a hand on. Less theoretical. A little more visible. A little more yours.
        </p>
      </div>

      <Link to="/pregnancy/week/14" aria-label="Go to week 14" className="absolute left-3 sm:left-6 md:left-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronLeft size={18} />
      </Link>
      <Link to="/pregnancy/week/16" aria-label="Go to week 16" className="absolute right-3 sm:right-6 md:right-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
        <ChevronRight size={18} />
      </Link>
    </div>

    <div className="relative -mt-28 sm:-mt-36 md:-mt-40 mb-6">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex items-end justify-center gap-5 sm:gap-10 md:gap-14">
          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-card border-[3px] border-sage/15 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={orangeImg} alt="A fresh navel orange with a small green leaf" loading="lazy" width={512} height={512} className="w-full h-full object-cover" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.04]" />
            </div>
            <div className="text-center">
              <p className="font-serif italic text-[12.5px] text-foreground/80 leading-tight">orange</p>
              <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/55 mt-1">~10&nbsp;cm</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full bg-card border-[4px] border-sage/30 flex items-center justify-center shadow-elevated overflow-hidden">
              <img src={fetusImg} alt="Soft editorial illustration of a 15-week baby: refined proportions, hands curled near the face, calm posture in the gestational sac" width={1024} height={1024} loading="eager" decoding="async" className="w-full h-full object-cover scale-[1.02]" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.05]" />
            </div>
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.22em] uppercase text-foreground/65">Your baby this week</p>
          </div>

          <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
            <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-sage-bg to-stage-pregnancy/40 border-[3px] border-sage/25 flex items-center justify-center shadow-elevated">
              <span className="font-serif text-[1.7rem] sm:text-[1.95rem] text-foreground tracking-tight leading-none">25</span>
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
  { id: "visible", label: "Becoming visible", Icon: Smile },
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
            <p className="font-sans text-[11.5px] font-normal text-foreground/60 mt-0.5">Updated for 2026 · 12 min read · The bump becoming real</p>
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
  { label: "Stage", value: "Early second trimester" },
  { label: "Baby size", value: "~10 cm — orange" },
  { label: "Baby weight", value: "~70 g" },
  { label: "Trimester", value: "2 of 3 (week 15 of 27)" },
];

const AtAGlance = () => (
  <section id="at-a-glance" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl mb-14 md:mb-20">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 relative bg-gradient-to-br from-sage-bg/55 via-parchment to-stage-pregnancy/40 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-10 overflow-hidden shadow-card-brand">
        <img src={botanicalAccent} alt="" aria-hidden="true" className="absolute -left-3 bottom-0 w-28 opacity-35 pointer-events-none select-none" />
        <SectionLabel tone="sage">At a glance</SectionLabel>
        <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-5">
          The week pregnancy stops being theoretical and starts being something you can put a hand on.
        </h2>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8] mb-4">
          Inside, your baby is around 10 cm long from crown to rump and weighs roughly 70 grams. The bones
          are starting to harden, the ears have moved into their final position on the sides of the head, and
          legs are now longer than arms. Skin is still translucent, but downy lanugo hair is appearing across
          it. Your baby is moving constantly — though the movements are still too small for you to feel.
        </p>
        <p className="font-sans text-[15px] text-foreground/85 leading-[1.8]">
          Outside, the lower belly is firmer and rising. For many people, this is the week the bump becomes
          obvious to you, even if no one else has noticed. Energy is steadier. Appetite is back. Strangers
          may start to look twice. Pregnancy is becoming a more visible, more public thing — slowly.
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
  { title: "Bones starting to harden", body: "Up until now your baby's skeleton has been mostly cartilage — the same flexible tissue that's in your nose and ears. From around week 15, calcium begins to deposit into the cartilage in a process called ossification. The long bones in the arms and legs harden first. The skull plates stay deliberately soft and separate so the head can mould through the birth canal months from now." },
  { title: "Ears in their final position", body: "Until last week, your baby's ears were sitting low on the side of the neck. By week 15 they have migrated up to their final position on the sides of the head. The structures inside the ear are forming too — and although hearing isn't fully functional yet, your baby is beginning to detect vibrations and the rhythm of your heartbeat from inside." },
  { title: "Legs longer than arms — finally", body: "For most of the first trimester, the arms developed faster than the legs. From around week 15, the legs catch up and overtake — your baby is now in its more recognisable, leggier proportions. The body is also straightening out, with less of the tight curl of earlier weeks. Movements are more coordinated: stretching, rolling, kicking, hands exploring the face." },
  { title: "Skin still translucent, lanugo growing", body: "The skin is so thin that blood vessels are visible through it. A fine downy hair called lanugo continues to spread across the body — it helps regulate temperature and holds the protective vernix in place later. Underneath, the first hints of fat are starting to be laid down, though most weight gain comes much later in pregnancy." },
];

const Biology = () => (
  <section id="biology" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="relative rounded-3xl overflow-hidden border border-border/40 shadow-card-brand">
            <div className="aspect-[4/5]">
              <img src={biologyImg} alt="Soft editorial close-up of a 15-week baby curled in the gestational sac, refined facial profile, hands near the face, ears in their final position, lanugo hair appearing on translucent skin" loading="lazy" width={1024} height={1280} className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-foreground/60 to-transparent">
              <p className="font-serif italic text-[13px] text-background/95 leading-snug">
                Ten centimetres. Bones beginning to harden. The week the body becomes a body.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <SectionLabel>What's underway biologically</SectionLabel>
          <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-5">
            The structure laid down in the first trimester is starting to harden into a baby.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8] mb-8 max-w-2xl">
            Week 15 is when the soft, delicate scaffolding of the early weeks begins to firm up. Cartilage
            turns into bone. Ears settle into place. Limbs stretch into more recognisable proportions. None
            of it dramatic, but all of it real — this is the week where the work moves from creating
            structures to refining the baby that will use them.
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

const visiblePoints = [
  { Icon: Activity, title: "The bump beginning to feel obvious — to you, first", body: "Your uterus is now sitting halfway between the pubic bone and the navel. The lower belly often feels distinctly firmer and rounder, especially first thing in the morning. In a first pregnancy you may feel it well before anyone else can see it; in second and later pregnancies it's often visibly showing now. Either way, this is often the week the bump becomes part of how you feel in your own body." },
  { Icon: Smile, title: "Strangers starting to wonder", body: "Some people start to notice this week — not always overtly, but with a glance, a slight pause, a 'are they?' look. Whether you find that lovely or exposing depends on the day, the stranger, the relationship to the pregnancy. Both responses are valid. You don't owe anyone visibility before you're ready. You also don't have to hide once you don't want to." },
  { Icon: Hand, title: "Clothes starting to make decisions for you", body: "Trousers and jeans that fit two weeks ago may feel suddenly tight at the waistband. Shirts and dresses pull a little differently. Many people swap into looser trousers, maternity bands, stretchy waistbands or one size up around now — for comfort, well before they need actual maternity wear. There's no urgency to look obviously pregnant." },
  { Icon: Sun, title: "A pregnancy that feels less private", body: "After months of holding the news in your shoulders — first as a secret, then as a conversation with close people — the body starting to tell its own story can feel like a relief, an exposure, or both. The shift from a private pregnancy to a more visible one is its own quiet emotional milestone. It often takes longer to feel ready for than you'd expect." },
];

const Visible = () => (
  <section id="visible" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel tone="sage">Becoming visible</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        The week pregnancy starts to be a thing other people might see.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        Week 15 is often when pregnancy stops being something only you and the people you've told know
        about. The bump becomes more obvious — sometimes only to you, sometimes to the world. Different
        bodies show at very different times. None of them are wrong.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {visiblePoints.map(({ Icon, title, body }) => (
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
        <span className="font-semibold">Not everyone shows at the same time.</span>{" "}
        Height, build, abdominal muscle tone, where the uterus is positioned and whether this is a first or
        later pregnancy all change when a bump becomes obvious. Some people don't visibly show until weeks
        20–24. None of that is a sign of anything wrong. Your bump has its own timeline.
      </p>
    </div>
  </section>
);

const bodyNotes = [
  { Icon: Activity, title: "Lower belly firmer, rising past the pubic bone", body: "Your uterus has now risen well above the pubic bone and is approaching the level halfway up to the navel. The lower belly often feels distinctly firmer and slightly rounded, especially first thing in the morning before food and movement soften everything." },
  { Icon: Hand, title: "Round ligament tugs becoming familiar", body: "The supporting ligaments around the uterus stretch more obviously as it grows. Sharp, brief pulling sensations low in the pelvis or groin when you sneeze, stand up quickly or roll over in bed are common, harmless and usually settle within seconds. Moving more slowly between positions helps." },
  { Icon: Apple, title: "Hunger up, gain more steady", body: "Most people now find their appetite is back and weight is starting to gain more steadily — around half a kilogram a week through much of the second trimester. Protein at every meal, iron-rich foods, calcium, fruit, vegetables, and whole grains do most of the real work. Around 300 extra calories a day is the rough guide." },
  { Icon: Eye, title: "Linea nigra & melasma starting to show", body: "A faint dark line down the centre of the belly (linea nigra) may start to appear or darken. Patches of darker pigment on the cheeks or forehead (melasma, sometimes called the 'mask of pregnancy') can appear too, especially with sun exposure. Both are pigmentation changes driven by hormones and almost always fade after birth." },
  { Icon: Wind, title: "Nasal congestion & nosebleeds", body: "Higher blood volume and oestrogen swell the lining of the nose, leaving many people feeling permanently a bit blocked. Occasional nosebleeds, snoring more than usual, and a slightly croaky morning voice are all normal. Saline sprays, a humidifier at night and gentle steam help most people." },
  { Icon: Stethoscope, title: "More vaginal discharge", body: "More white, milky, mild-smelling discharge than usual is normal — it's part of the body's protective barrier. Itching, burning, a strong smell, green/yellow colour, or any blood needs a GP or midwife check; thrush and bacterial vaginosis are both common in pregnancy and easily treated." },
];

const Body = () => (
  <section id="body" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="max-w-2xl mb-10">
        <SectionLabel tone="terracotta">Your body this week</SectionLabel>
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
          More embodied, more visibly pregnant, more your own again.
        </h2>
        <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
          Week 15 brings a clearer set of physical changes than the gentler ones of week 14. The bump is
          firming. Pigmentation shifts. New small symptoms — congestion, ligament pulls, more discharge —
          tend to settle in alongside the better stuff.
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
    Icon: Activity, name: "Round ligament pulling & stretching",
    feels: "Sharp, brief pulling sensations low in the pelvis or groin when you change position quickly, sneeze, cough, or roll over in bed. Sometimes a dull stretching ache low down.",
    why: "The ligaments supporting the uterus are stretching more obviously as it rises. The weight of the uterus is also tipping forward.",
    normal: "Very common, brief, and reassuring. Move slowly between positions, support yourself with a pillow when sleeping. Persistent or severe one-sided pain needs a phone call to your midwife.",
  },
  {
    Icon: Sun, name: "Energy steadier — but not unlimited",
    feels: "Most days feeling more like yourself. The first proper afternoon you don't have to lie down. Still tired by evening — pregnancy tired is a different kind of tired, and it doesn't fully go.",
    why: "The placenta is in steadier hormone production. Blood volume has stabilised. The body has adapted — but it's also still building a baby around the clock.",
    normal: "Very common. If energy is consistently flat, please mention it — anaemia, low iron and thyroid issues are common in the second trimester and easily checked with a blood test.",
  },
  {
    Icon: Wind, name: "Nasal congestion & nosebleeds",
    feels: "A blocked-feeling nose most of the time. Occasional nosebleeds, especially in dry environments. Snoring more than usual. A croaky morning voice.",
    why: "Higher blood volume swells nasal blood vessels, and oestrogen swells the mucosa. This is 'pregnancy rhinitis' and is very common.",
    normal: "Very common. Saline sprays, a humidifier at night, and gentle steam help. Heavy or prolonged nosebleeds, or breathing difficulty, should be checked.",
  },
  {
    Icon: Soup, name: "Appetite back — sometimes intensely",
    feels: "Real, deep hunger you haven't felt in months. Specific cravings, often for things you didn't expect. A surprising joy in eating again.",
    why: "Nausea-causing hormones have peaked and fallen. Your baby is growing rapidly and your blood volume is still climbing — your body needs more food now.",
    normal: "Very common. Aim for steady, small, frequent meals, and prioritise protein, iron-rich foods, fruit and veg. Cravings for non-food items (ice, chalk, soil) need a GP check — they can signal iron deficiency.",
  },
  {
    Icon: Eye, name: "Pigmentation, melasma & linea nigra",
    feels: "A faint dark line down the middle of the belly starting to appear. Darker nipples and areolas. Patches of darker pigment on the cheeks or forehead, especially after sun.",
    why: "Pregnancy hormones increase melanin production. UV exposure amplifies it. Most pigmentation changes are most pronounced in the second and third trimesters.",
    normal: "Very common. Wear high SPF on the face daily — sun exposure is the biggest accelerator. Most pigmentation changes fade in the year after birth.",
  },
  {
    Icon: Brain, name: "Pregnancy brain & forgetfulness",
    feels: "Walking into a room and forgetting why. Losing words mid-sentence. Forgetting appointments. A sense of being more easily distracted than usual.",
    why: "Hormonal shifts, sleep changes, and the cognitive load of carrying a pregnancy all play a part. Some research suggests structural changes in the brain that support bonding later.",
    normal: "Very common, often mocked, very real. Lists, phone reminders and saying things out loud genuinely help.",
  },
  {
    Icon: Wind, name: "Sluggish digestion & constipation",
    feels: "Going to the loo less often. Trapped wind. Heartburn after meals. A 'pregnant by bedtime' kind of swelling some evenings.",
    why: "Progesterone slows the digestive tract. The uterus is now pressing on the bowel from above the pelvis. Iron in pregnancy multivitamins worsens constipation for many.",
    normal: "Very common. Drink water, eat fibre, walk daily, and ask your GP about a different multivitamin if iron is the issue. Lactulose is safe in pregnancy.",
  },
  {
    Icon: Hand, name: "Bleeding gums & sensitive mouth",
    feels: "Toothbrush coming away with a little blood. Gums looking more pink and feeling tender. Occasional metallic taste.",
    why: "Higher blood volume and pregnancy hormones make gums more reactive to plaque — 'pregnancy gingivitis'. It's very common in the second trimester.",
    normal: "Common and reversible. Use a soft toothbrush, brush gently twice a day, floss, and book a dental check — NHS dental care is free in pregnancy and the year after birth in the UK.",
  },
];

const Symptoms = () => (
  <section id="symptoms" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
    <div className="max-w-2xl mb-10">
      <SectionLabel>Common symptoms</SectionLabel>
      <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
        What's likely to show up at week 15 — and what each one really means.
      </h2>
      <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
        Week 15 is mostly the easing of the worst first-trimester symptoms and the appearance of slower,
        longer-running second-trimester ones. New small things show up. Most are normal. Some are worth
        flagging.
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
        Read: how the body shifts as the second trimester begins <ArrowRight size={13} />
      </Link>
    </div>
  </section>
);

const emotionalTruths = [
  "The first morning you put a hand on your belly without thinking.",
  "Realising the bump is real to you well before anyone else has noticed.",
  "Catching yourself talking to the baby and then feeling slightly embarrassed about it.",
  "Wanting strangers to know — and not wanting strangers to know — at the same time.",
  "Trying on a top that fit a fortnight ago and feeling something quietly shift.",
  "The first time you actively want to plan something for after the baby comes.",
  "A small grief for the version of yourself that's quietly being left behind.",
];

const Emotional = () => (
  <section id="emotional" className="bg-parchment-dark/40 py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 relative bg-gradient-to-br from-lavender-bg via-parchment to-lavender-bg/40 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-9 shadow-card-brand overflow-hidden">
          <img src={botanicalAccent} alt="" aria-hidden="true" className="absolute right-0 top-0 w-24 opacity-35 pointer-events-none select-none" />
          <SectionLabel tone="lavender">Emotionally this week</SectionLabel>
          <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-4">
            More embodied — and not always more sure.
          </h2>
          <p className="font-sans text-[14.5px] text-foreground/80 leading-[1.8] mb-4">
            Week 15 is the week the body starts to make pregnancy real in a way the mind has been catching
            up with for months. Hands rest on the belly without thinking. The pregnancy stops being an
            internal secret and starts becoming something you can feel and other people can see.
          </p>
          <p className="font-sans text-[14px] text-foreground/70 leading-[1.75]">
            That visibility is its own emotional milestone. Being seen as pregnant by strangers is a
            different experience to being known to be pregnant by close people. Some days that feels
            wonderful. Some days it feels exposing. Both responses are valid.
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
  { Icon: Apple, title: "Eat properly, with iron and calcium in the mix", note: "Iron-rich foods (red meat, beans, lentils, leafy greens, fortified cereals) and calcium (dairy or fortified alternatives, tinned fish with bones, leafy greens) take real priority now — your blood volume is still climbing and the baby's bones are starting to harden. Aim for protein at every meal and around 300 extra calories a day. Pair iron with vitamin C (a glass of orange juice, peppers, tomatoes) for better absorption." },
  { Icon: Activity, title: "Move gently most days", note: "If energy allows, daily movement matters more from here. Walking, swimming, prenatal yoga, low-impact strength work and gentle cycling are all usually fine. The general rule is to be able to hold a conversation while moving. Avoid contact sports and real fall risks. Pelvic floor exercises started now genuinely help in the third trimester and after birth." },
  { Icon: Hand, title: "Switch into clothes that fit the body you have now", note: "You almost certainly don't need maternity wear yet, but waistbands that are pinching are not earning their keep. A belly band, soft-waist trousers, looser shirts or one size up makes a real difference to comfort and mood. Buy gently — your shape will keep changing — but don't keep yourself in clothes that hurt." },
  { Icon: Moon, title: "Start sleeping with a pillow between your legs", note: "Sleeping on your side with a pillow between your legs takes pressure off the lower back and pelvis as the bump grows. From around week 28, official UK advice is to fall asleep on your side because back-sleeping in late pregnancy is linked to a small increased stillbirth risk. Building the habit now makes it much easier later." },
  { Icon: Stethoscope, title: "Book your dental check-up", note: "Pregnancy gingivitis is very common, and NHS dental care is free in pregnancy and the year after birth in the UK. Now is a good time to book a check-up and a hygienist appointment if you haven't recently. Healthy gums genuinely matter — gum disease is linked to preterm birth, so this is real care." },
  { Icon: Sprout, title: "Keep the basics ticking over", note: "10 micrograms of vitamin D daily through pregnancy and breastfeeding. A pregnancy multivitamin covers most essentials. If iron is causing constipation, ask your GP about a gentler alternative — Spatone is well-tolerated by many. Folic acid is no longer needed (the neural tube has formed) but if you're still taking it as part of a multivitamin that's completely fine." },
];

const Focus = () => (
  <section id="focus" className="bg-sage-bg/35 py-16 md:py-24 border-y border-border/30">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <SectionLabel tone="sage">Focus this week</SectionLabel>
          <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.2rem] text-foreground leading-tight mb-4">
            Eating, moving, dressing — for the body you have now.
          </h2>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8]">
            Week 15 is a settled, useful stretch of pregnancy. Use the energy if it's there. Eat properly,
            move gently, and let the small comforts of clothes that fit and a sleep set-up that supports the
            bump quietly do real work.
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
  "Burning, pain or blood when you wee (possible UTI)",
  "Itching that wakes you, especially on hands and feet",
  "Vomiting that won't settle, no fluids staying down",
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
            Your midwife is now your first point of contact. Your GP, NHS 111, your local hospital triage, or
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
        The bump becomes real to you weeks before it becomes real to anyone else. That quiet stretch — between knowing and being seen — is its own private chapter of becoming a parent.
      </p>
      <Heart size={14} className="text-sage/60 mx-auto mt-5" />
    </div>
  </section>
);

const reflectionPrompts = ["What feels different in the body this week", "What I'd want a stranger to understand", "Something I'd like to remember", "A small kindness I could give myself"];
const askChips = ["When will I feel my baby move?", "When will I look obviously pregnant?", "Is round ligament pain normal at 15 weeks?", "How much weight should I be gaining?", "When should I tell my employer?"];

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
            <p className="font-sans text-[10.5px] font-semibold tracking-[0.24em] uppercase text-sage">Ask about week 15</p>
            <h3 className="font-serif text-[1.3rem] sm:text-[1.35rem] text-foreground mt-0.5 leading-snug">A question on your mind?</h3>
          </div>
        </div>
        <p className="font-sans text-[13px] text-foreground/70 leading-relaxed mb-4">Get a calm, evidence-led answer tailored to where you are right now.</p>
        <input type="text" placeholder="e.g. When will I feel my baby move?" className="w-full bg-parchment/80 border border-border/40 rounded-full px-5 py-3.5 font-sans text-[13.5px] text-foreground placeholder:text-foreground/45 focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/30 transition-all" />
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
            The week the bump becomes real deserves to be remembered.
          </h3>
          <p className="font-sans text-[14px] text-foreground/75 leading-[1.8] mb-6">
            The first hand-on-belly moment. The first stranger to glance twice. The first top that no longer
            fits. The journal holds the small, ordinary, invisible turning points of becoming a parent.
          </p>
          <ul className="space-y-2.5 mb-7">
            {["A page for the week the bump becomes real", "Letters to your baby through every week", "Guided pages all the way to birth"].map((line) => (
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
    title: "The early second-trimester body shift",
    desc: "Rising uterus, the first real bump, energy returning, appetite back — what to expect physically as the second trimester properly begins." },
  { slug: "second-trimester-eating", img: secondEatingImg, tag: "Nutrition",
    title: "Eating well in the second trimester",
    desc: "What your body actually needs now — protein, iron, calcium, calories — and how to bring real meals back without overthinking it." },
  { slug: "second-trimester-movement-exercise", img: secondMovementImg, tag: "Movement",
    title: "Moving your body in the second trimester",
    desc: "What's safe, what helps, and how to use the energy lift while it's here. The simple rules for walking, yoga, swimming and strength." },
  { slug: "first-trimester-emotional", img: emotionalImg, tag: "Emotions",
    title: "Settling into being publicly pregnant",
    desc: "How it feels when the news widens, when strangers start to notice, and when bodies become more visibly part of the conversation." },
  { slug: "second-trimester-sleep", img: secondSleepImg, tag: "Sleep",
    title: "Setting up your sleep for the months ahead",
    desc: "Why side-sleeping matters, when to start, and the small set-up tweaks that make pregnancy sleep easier from week 15 onwards." },
  { slug: "second-trimester-anxiety", img: secondAnxietyImg, tag: "Mind",
    title: "When the worry doesn't lift with the calendar",
    desc: "Why pregnancy anxiety can carry on past the first trimester, and how to stay grounded as the pregnancy becomes more visible." },
];

const Related = () => (
  <section id="guidance" className="bg-parchment py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div className="max-w-xl">
          <SectionLabel>Read next, because of week 15</SectionLabel>
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
  { q: "When will I feel my baby move?",
    a: "First flutters — sometimes called 'quickening' — usually arrive between weeks 16 and 22 in a first pregnancy, and earlier (often weeks 13–16) in second and later pregnancies, because you know what to look for and the abdominal muscles have stretched before. At 15 weeks your baby is moving constantly, but the movements are still much too small for you to feel from the outside. Early flutters are easy to miss — they often feel like bubbles, butterflies, popcorn, gas or a passing twitch rather than recognisable kicks." },
  { q: "When will I actually look obviously pregnant?",
    a: "Most first-time pregnancies start to look clearly pregnant in regular clothes between weeks 16 and 22, with a wide range either side. Height, build, abdominal muscle tone, where the uterus is positioned and whether this is a first or later pregnancy all change when the bump becomes obvious. Some people don't visibly show until weeks 20–24. Second and later pregnancies often show clearly several weeks earlier. None of those timelines is wrong." },
  { q: "Is it normal to have sharp pulling pains in my pelvis at 15 weeks?",
    a: "Yes — round ligament pain is very common from around now. It feels like a sharp, brief pulling sensation low in the pelvis or groin (sometimes one side, sometimes both) when you sneeze, cough, stand up quickly or roll over in bed. It usually settles within a few seconds. The ligaments supporting the uterus are stretching as it grows. Move slowly between positions and use a pillow under the bump and between the knees when sleeping. Severe one-sided pain, persistent pain, pain with bleeding, or pain with fever needs a phone call to your midwife." },
  { q: "How much weight should I be gaining at 15 weeks?",
    a: "There's no single right answer. UK guidance focuses less on a target number and more on overall health and steady, gradual gain. Most people gain around 1–2 kg in the first trimester and then around 0.4–0.5 kg per week through the second and third trimesters, but this varies a lot. Some people lose weight in the first trimester from sickness and only start gaining now. As long as you're eating well, your bump is growing on schedule and your midwife is happy, the number on the scale is not the most important thing." },
  { q: "When's my next scan or appointment?",
    a: "The next major appointment is the anomaly scan (also called the 20-week scan), usually offered between 18 and 21 weeks. Many trusts also offer a midwife appointment around 16 weeks to review any blood test results from booking, check blood pressure and urine, and listen to the baby's heartbeat with a doppler. Between now and then is mostly settling-in time — most people don't have anything booked." },
  { q: "Can I sleep on my back at 15 weeks?",
    a: "Yes. At 15 weeks the uterus is not yet large enough to compress the major blood vessels behind it (the inferior vena cava), so back-sleeping is fine. From around week 28, official UK guidance is to fall asleep on your side because back-sleeping in late pregnancy is linked to a small increased stillbirth risk. Building the habit of sleeping on your side now (with a pillow between your knees and one supporting the bump) makes it much easier to maintain in the third trimester." },
  { q: "Is it safe to dye my hair, get my nails done, get a massage?",
    a: "Hair dye is generally considered safe in pregnancy — the small amount absorbed through the scalp isn't thought to cause problems. Many people prefer to wait until after the first trimester (which you have) and choose ammonia-free or highlights/balayage rather than full root colour for ventilation reasons. Standard nail treatments are fine; a well-ventilated salon helps. Pregnancy massage from a therapist trained for it is lovely and safe — mention you're pregnant when booking." },
  { q: "When should I tell my employer I'm pregnant?",
    a: "Legally in the UK you have to tell your employer at least 15 weeks before your due date — by around week 25. Most people tell sooner. Telling earlier means you can access pregnancy-related rights: paid time off for antenatal appointments, a workplace risk assessment, and protection from pregnancy-related dismissal. Many people tell after the dating scan or once a real bump becomes harder to hide. There's no perfect time — pick what feels manageable for you and your role." },
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
        <h2 className="font-serif text-[1.85rem] sm:text-[1.95rem] md:text-[2.4rem] text-foreground leading-tight">Common questions at 15 weeks</h2>
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
        <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.5rem] text-foreground leading-tight mb-3">Ready for week 16?</h2>
        <p className="font-sans text-[14.5px] text-foreground/75 max-w-lg mx-auto mb-8 leading-[1.8]">
          Week 16 is the next milestone — the bump often becomes properly visible to others, the first
          flutters of movement may begin, and the second-trimester rhythm starts to feel like home.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
          <Link to="/pregnancy/week/16" className="inline-flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium shadow-cta hover:bg-terracotta-hover transition-colors">
            Continue to week 16 <ArrowRight size={14} />
          </Link>
          <Link to="/pregnancy/second-trimester" className="inline-flex items-center justify-center gap-2 border border-foreground/25 text-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium hover:bg-parchment-dark transition-colors">
            Explore the second trimester
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const Week15Page = () => (
  <div className="min-h-screen bg-parchment">
    <PregnancyWeekSeo weekNumber={15} />
    <Navbar />
    <Hero />
    <MetaBar />
    <AtAGlance />
    <Biology />
    <Visible />
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

export default Week15Page;
