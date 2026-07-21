import { useParams, Navigate, Link } from "react-router-dom";
import { useState } from "react";
import {
  ChevronLeft, ChevronRight, Sprout, HeartPulse, Activity, Apple, Sparkles, Calendar,
  BookOpen, ArrowRight, Check, AlertTriangle, Plus, Minus, Heart, MessageCircle, Leaf,
  Droplet, Moon, Wind, Coffee, ShieldCheck, Stethoscope,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PregnancyWeekSeo from "@/components/seo/PregnancyWeekSeo";
import PublicWeekReflectionAsk from "@/components/pregnancy/PublicWeekReflectionAsk";
import { getWeekData, getAdjacentWeeks, type WeekData } from "@/data/weekData";

// ── Visual assets ─────────────────────────────────────────────────────
import journalImg from "@/assets/journal-flatlay.jpg";
import botanicalTr from "@/assets/botanical-branch-tr.png";
import botanicalBl from "@/assets/botanical-branch-bl.png";
import botanicalAccent from "@/assets/article-botanical-accent.png";

// First trimester article heroes
import implantationImg from "@/assets/article-hero-implantation.jpg";
import earlySymptomsImg from "@/assets/article-hero-early-symptoms.jpg";
import emotionalImg from "@/assets/article-hero-emotional-first-tri.jpg";
import testsScansImg from "@/assets/article-hero-tests-scans.jpg";
import symptomsStoppingImg from "@/assets/article-hero-symptoms-stopping.jpg";
import fatigueImg from "@/assets/article-hero-fatigue.jpg";
import nauseaImg from "@/assets/article-hero-nausea.jpg";
import foodAversionsImg from "@/assets/article-hero-food-aversions.jpg";
import lifestyleImg from "@/assets/article-hero-lifestyle.jpg";

// Second trimester article heroes
import secondAnatomyImg from "@/assets/article-hero-second-anatomy-scan.jpg";
import secondAnxietyImg from "@/assets/article-hero-second-anxiety.jpg";
import secondBodyImg from "@/assets/article-hero-second-body.jpg";
import secondEatingImg from "@/assets/article-hero-second-eating.jpg";
import secondMovementImg from "@/assets/article-hero-second-movement.jpg";
import secondMovementExImg from "@/assets/article-hero-second-movement-exercise.jpg";
import secondSleepImg from "@/assets/article-hero-second-sleep.jpg";

// Third trimester article heroes
import thirdEmotionalImg from "@/assets/article-hero-third-emotional.jpg";
import thirdHospitalBagImg from "@/assets/article-hero-third-hospital-bag.jpg";
import thirdMovementImg from "@/assets/article-hero-third-movement.jpg";
import thirdNurseryImg from "@/assets/article-hero-third-nursery.jpg";
import thirdSignsLabourImg from "@/assets/article-hero-third-signs-of-labour.jpg";
import thirdSleepImg from "@/assets/article-hero-third-sleep.jpg";

// Per-week developmental medallion (already weekly-accurate set)
const babyImages = import.meta.glob(
  "../assets/myweek-weekly-babies/myweek-baby-week-*.png",
  { eager: true, import: "default" },
) as Record<string, string>;
const getBabyImage = (week: number) => {
  const w = Math.min(Math.max(Math.round(week), 1), 42);
  const suffix = String(w).padStart(2, "0");
  return babyImages[`../assets/myweek-weekly-babies/myweek-baby-week-${suffix}.png`];
};

/* ─────────────────────────────────────────────────────────────────────
   Shared premium primitives (mirrors Week 4)
   ───────────────────────────────────────────────────────────────────── */
const SectionLabel = ({
  children,
  tone = "sage",
}: { children: React.ReactNode; tone?: "sage" | "terracotta" | "lavender" }) => {
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

/* ─────────────────────────────────────────────────────────────────────
   Trimester-aware helpers
   ───────────────────────────────────────────────────────────────────── */
const trimesterAccent = (t: 1 | 2 | 3) =>
  t === 1 ? "First trimester · Early formation"
    : t === 2 ? "Second trimester · Growing and settling"
      : "Third trimester · Preparation and closeness";

// Parse "Poppy seed (~0.2mm)" or "~16mm" from data.what.baby.size
const parseSize = (raw: string): { item: string; measure: string } => {
  if (!raw) return { item: "", measure: "" };
  // Pattern: "Lentil (~4-5mm)" → item "Lentil", measure "~4-5 mm"
  const m = raw.match(/^([^(]+?)\s*\(~?([^)]+)\)\s*$/);
  if (m) return { item: m[1].trim(), measure: m[2].replace(/mm/i, " mm").trim() };
  // Pattern: "Sesame seed (~1.5mm)" handled above. Fallback:
  return { item: raw, measure: "" };
};

// Symptom icon mapping (heuristic, falls back to HeartPulse)
const symptomIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes("naus") || n.includes("morning") || n.includes("sick")) return HeartPulse;
  if (n.includes("fatig") || n.includes("tired") || n.includes("sleep")) return Moon;
  if (n.includes("breast")) return Heart;
  if (n.includes("spot") || n.includes("bleed") || n.includes("discharge") || n.includes("mucus")) return Droplet;
  if (n.includes("cramp") || n.includes("pain") || n.includes("ache") || n.includes("ligament") || n.includes("back")) return Activity;
  if (n.includes("bloat") || n.includes("constipa") || n.includes("digest") || n.includes("heartburn")) return Wind;
  if (n.includes("urin") || n.includes("toilet") || n.includes("blad")) return Coffee;
  if (n.includes("food") || n.includes("smell") || n.includes("aversion") || n.includes("crav") || n.includes("appetite")) return Apple;
  if (n.includes("mood") || n.includes("emotion") || n.includes("anxi") || n.includes("tear")) return Sparkles;
  if (n.includes("contraction") || n.includes("braxton") || n.includes("labour")) return Activity;
  if (n.includes("movement") || n.includes("kick") || n.includes("flutter") || n.includes("quicken")) return Sparkles;
  if (n.includes("breath") || n.includes("wind") || n.includes("congest")) return Wind;
  if (n.includes("swell") || n.includes("oedem") || n.includes("edema")) return Droplet;
  if (n.includes("pelvic") || n.includes("pressure") || n.includes("nesting")) return ShieldCheck;
  if (n.includes("skin") || n.includes("nail") || n.includes("hair") || n.includes("vernix")) return Sparkles;
  return HeartPulse;
};

const focusIcon = (action: string) => {
  const a = action.toLowerCase();
  if (a.includes("folic") || a.includes("vitamin") || a.includes("nutri")) return Apple;
  if (a.includes("alcohol") || a.includes("smoking") || a.includes("avoid") || a.includes("limit")) return ShieldCheck;
  if (a.includes("midwife") || a.includes("gp") || a.includes("appointment") || a.includes("scan")) return Stethoscope;
  if (a.includes("rest") || a.includes("sleep")) return Moon;
  if (a.includes("hydrat") || a.includes("water")) return Droplet;
  if (a.includes("eat") || a.includes("food") || a.includes("meal")) return Apple;
  if (a.includes("movement") || a.includes("active") || a.includes("walk") || a.includes("exercise")) return Activity;
  if (a.includes("plan") || a.includes("bag") || a.includes("prepare")) return Calendar;
  if (a.includes("share") || a.includes("support") || a.includes("help") || a.includes("trust") || a.includes("emotional")) return Heart;
  if (a.includes("monitor")) return ShieldCheck;
  return Sparkles;
};

/* ─────────────────────────────────────────────────────────────────────
   Curated related guidance per week (real article slugs + heroes)
   ───────────────────────────────────────────────────────────────────── */
type Related = { slug: string; img: string; tag: string; title: string; desc: string };

const relatedFor = (week: number, t: 1 | 2 | 3): Related[] => {
  // Pre-positive window (1–3): trying-to-conceive shape, no implantation yet
  if (week <= 3) return [
    { slug: "early-pregnancy-symptoms-explained", img: earlySymptomsImg, tag: "Symptoms", title: "Early pregnancy symptoms explained", desc: "What's actually possible in the very first weeks, and what's almost certainly cycle-related." },
    { slug: "the-first-trimester-emotionally", img: emotionalImg, tag: "Emotions", title: "The two-week wait, emotionally", desc: "How the wait between ovulation and a possible test can feel — and ways to soften it." },
    { slug: "tests-and-scans-in-pregnancy", img: testsScansImg, tag: "Care path", title: "When to test and what happens next", desc: "Why testing too early misleads, and what falls into place after a positive." },
    { slug: "fatigue-in-early-pregnancy", img: fatigueImg, tag: "Body", title: "Tiredness before a positive test", desc: "Why progesterone makes the second half of every cycle heavier, even without pregnancy." },
    { slug: "eating-well-in-pregnancy", img: lifestyleImg, tag: "Lifestyle", title: "Folic acid and pre-pregnancy basics", desc: "The handful of things genuinely worth doing before a positive test." },
    { slug: "implantation-bleeding", img: implantationImg, tag: "Reassurance", title: "What implantation actually is", desc: "What happens at the end of week 3 if conception has occurred — and how to read it." },
  ];

  // Early first trimester (4)
  if (week <= 4) return [
    { slug: "early-pregnancy-symptoms-explained", img: earlySymptomsImg, tag: "Symptoms", title: "Early pregnancy symptoms explained", desc: "What's common, what's normal and what to keep an eye on across the first few weeks." },
    { slug: "implantation-bleeding", img: implantationImg, tag: "Reassurance", title: "Implantation bleeding: what's normal", desc: "How to tell it apart from a period, and when light spotting is worth a call." },
    { slug: "the-first-trimester-emotionally", img: emotionalImg, tag: "Emotions", title: "The first trimester, emotionally", desc: "The mix of excitement, fear, numbness and tenderness that often shows up early." },
    { slug: "tests-and-scans-in-pregnancy", img: testsScansImg, tag: "Care path", title: "Tests and scans in early pregnancy", desc: "What happens after a positive test, and when your first appointments tend to fall." },
    { slug: "fatigue-in-early-pregnancy", img: fatigueImg, tag: "Body", title: "Fatigue in early pregnancy", desc: "Why these weeks can feel so heavy — and small ways to support yourself." },
    { slug: "symptoms-stopping-early-pregnancy", img: symptomsStoppingImg, tag: "Reassurance", title: "When pregnancy symptoms stop", desc: "Why symptoms come and go, and what's usually behind a quieter day or two." },
  ];

  // Symptom-heavy first tri (5–9)
  if (week <= 9) return [
    { slug: "nausea-in-early-pregnancy", img: nauseaImg, tag: "Symptoms", title: "Nausea in early pregnancy", desc: "Why hCG triggers it, when it usually peaks, and what genuinely helps." },
    { slug: "fatigue-in-early-pregnancy", img: fatigueImg, tag: "Body", title: "Fatigue in early pregnancy", desc: "The biological reasons week 5–9 can feel so heavy — and how to soften it." },
    { slug: "when-you-cant-face-food-in-pregnancy", img: foodAversionsImg, tag: "Eating", title: "When you can't face food", desc: "Aversions, smell sensitivity and how to eat enough on the hard days." },
    { slug: "the-first-trimester-emotionally", img: emotionalImg, tag: "Emotions", title: "The first trimester, emotionally", desc: "Holding the early weeks privately while symptoms reshape your daily life." },
    { slug: "tests-and-scans-in-pregnancy", img: testsScansImg, tag: "Care path", title: "Tests and scans in early pregnancy", desc: "What's coming up between booking and the dating scan." },
    { slug: "symptoms-stopping-early-pregnancy", img: symptomsStoppingImg, tag: "Reassurance", title: "When pregnancy symptoms stop", desc: "How to read a quieter day or two without spiralling." },
  ];

  // Late first tri (10–12) — scan & transition
  if (week <= 12) return [
    { slug: "tests-and-scans-in-pregnancy", img: testsScansImg, tag: "Care path", title: "Tests and scans in early pregnancy", desc: "What the 12-week scan checks for and what to expect on the day." },
    { slug: "first-trimester-complete-guide", img: earlySymptomsImg, tag: "Guide", title: "The first trimester: a complete guide", desc: "Everything the first 13 weeks ask of you, in one calm reference." },
    { slug: "symptoms-stopping-early-pregnancy", img: symptomsStoppingImg, tag: "Reassurance", title: "When pregnancy symptoms stop", desc: "Symptoms easing toward the second trimester is common — here's why." },
    { slug: "the-first-trimester-emotionally", img: emotionalImg, tag: "Emotions", title: "The first trimester, emotionally", desc: "How the run-up to the dating scan often feels." },
    { slug: "eating-well-in-pregnancy", img: lifestyleImg, tag: "Lifestyle", title: "Eating well in pregnancy", desc: "Settling into a sustainable way of eating as nausea begins to lift." },
    { slug: "anxiety-in-pregnancy", img: secondAnxietyImg, tag: "Mind", title: "Anxiety in pregnancy", desc: "Why scan weeks can feel especially loud — and how to steady yourself." },
  ];

  // Early–mid second tri (13–19)
  if (week <= 19) return [
    { slug: "second-trimester-complete-guide", img: secondBodyImg, tag: "Guide", title: "The second trimester: a complete guide", desc: "What changes physically, emotionally and practically as you settle in." },
    { slug: "baby-movement-in-pregnancy", img: secondMovementImg, tag: "Baby", title: "Baby movement in pregnancy", desc: "When first movements usually arrive, and how to learn your baby's pattern." },
    { slug: "moving-your-body-in-pregnancy", img: secondMovementExImg, tag: "Body", title: "Moving your body in pregnancy", desc: "Gentle ways to stay active as energy returns." },
    { slug: "sleep-in-pregnancy", img: secondSleepImg, tag: "Rest", title: "Sleep in pregnancy", desc: "How to sleep more comfortably as your body changes." },
    { slug: "eating-well-in-pregnancy", img: secondEatingImg, tag: "Eating", title: "Eating well in pregnancy", desc: "What matters in the middle months — and what really doesn't." },
    { slug: "emotional-wellbeing-pregnancy", img: secondAnxietyImg, tag: "Mind", title: "Emotional wellbeing in pregnancy", desc: "Looking after the inner weather of the second trimester." },
  ];

  // Anatomy scan + late mid (20–27)
  if (week <= 27) return [
    { slug: "tests-and-scans-in-pregnancy", img: secondAnatomyImg, tag: "Care path", title: "Tests and scans in pregnancy", desc: "What the 20-week anatomy scan checks for, and what to expect afterwards." },
    { slug: "baby-movement-in-pregnancy", img: secondMovementImg, tag: "Baby", title: "Baby movement in pregnancy", desc: "Building a sense of your baby's pattern — and what changes mean." },
    { slug: "second-trimester-complete-guide", img: secondBodyImg, tag: "Guide", title: "The second trimester: a complete guide", desc: "All the threads of the middle months in one reference." },
    { slug: "anxiety-in-pregnancy", img: secondAnxietyImg, tag: "Mind", title: "Anxiety in pregnancy", desc: "Holding scan weeks and the pressure of 'halfway' without it taking over." },
    { slug: "sleep-in-pregnancy", img: secondSleepImg, tag: "Rest", title: "Sleep in pregnancy", desc: "Adjustments that make late-second-tri nights more comfortable." },
    { slug: "moving-your-body-in-pregnancy", img: secondMovementExImg, tag: "Body", title: "Moving your body in pregnancy", desc: "How activity often shifts as the bump grows." },
  ];

  // Early third tri (28–35)
  if (week <= 35) return [
    { slug: "third-trimester-complete-guide", img: thirdEmotionalImg, tag: "Guide", title: "The third trimester: a complete guide", desc: "What the final stretch genuinely feels like, and how to navigate it." },
    { slug: "baby-movement-in-pregnancy", img: thirdMovementImg, tag: "Baby", title: "Movement in the third trimester", desc: "How patterns change as the baby grows, and when to call." },
    { slug: "sleep-in-pregnancy", img: thirdSleepImg, tag: "Rest", title: "Sleep in the third trimester", desc: "Why sleep gets harder, and small things that help." },
    { slug: "preparing-emotionally-for-birth", img: thirdEmotionalImg, tag: "Mind", title: "Preparing emotionally for birth", desc: "Holding excitement and fear as labour starts to feel real." },
    { slug: "the-space-your-baby-will-come-home-to", img: thirdNurseryImg, tag: "Preparation", title: "The space your baby will come home to", desc: "A calm guide to what genuinely needs to be ready, and what doesn't." },
    { slug: "writing-a-birth-plan", img: thirdHospitalBagImg, tag: "Birth", title: "Writing a birth plan", desc: "A flexible set of preferences, not a script — how to put yours together." },
  ];

  // Term / final stretch (36–42)
  return [
    { slug: "signs-of-labour", img: thirdSignsLabourImg, tag: "Birth", title: "Signs of labour", desc: "Early signs, how to read them, and when to pick up the phone." },
    { slug: "hospital-bag-and-what-to-pack", img: thirdHospitalBagImg, tag: "Preparation", title: "Hospital bag and what to pack", desc: "A genuinely useful list — not a panic list — for the final weeks." },
    { slug: "stages-of-labour", img: thirdSignsLabourImg, tag: "Birth", title: "The stages of labour", desc: "What unfolds from early labour through to meeting your baby." },
    { slug: "when-to-go-in-for-labour", img: thirdSignsLabourImg, tag: "Birth", title: "When to go in for labour", desc: "How to read contractions, waters and the right moment to leave." },
    { slug: "preparing-emotionally-for-birth", img: thirdEmotionalImg, tag: "Mind", title: "Preparing emotionally for birth", desc: "Holding the wait, the unknown and the closeness of meeting your baby." },
    { slug: "third-trimester-complete-guide", img: thirdEmotionalImg, tag: "Guide", title: "The third trimester: a complete guide", desc: "Everything the final stage asks of you, in one calm reference." },
  ];
};

/* ─────────────────────────────────────────────────────────────────────
   Per-week emotional-card prompts (light variation by trimester)
   ───────────────────────────────────────────────────────────────────── */
const reflectionChipsFor = (t: 1 | 2 | 3): string[] =>
  t === 1 ? ["What surprised me", "What I'm afraid of", "What I want to remember", "Who I might tell"]
    : t === 2 ? ["What I noticed today", "First movements", "What's shifting", "What I want to hold on to"]
      : ["How I'm feeling about birth", "What's heavy this week", "What's softening", "What I want to remember"];

const askChipsFor = (week: number, t: 1 | 2 | 3): string[] => {
  if (t === 1 && week <= 3) return ["When can I test", "Two-week wait survival", "Folic acid before a positive", "Tracking ovulation", "Cycle vs early pregnancy"];
  if (t === 1 && week <= 6) return ["Implantation bleeding", "Spotting vs period", "Cramping early on", "When to test again", "Telling a partner"];
  if (t === 1) return ["Nausea that won't ease", "Symptoms coming and going", "When morning sickness peaks", "Booking appointment", "Telling work"];
  if (t === 2 && week < 20) return ["First baby movements", "Bump showing late", "Anatomy scan worries", "Energy returning", "Eating well now"];
  if (t === 2) return ["Reduced movement", "Anatomy scan results", "Sleep getting harder", "Heartburn", "Travel in pregnancy"];
  if (t === 3 && week < 36) return ["Braxton Hicks", "Sleep in third tri", "Nesting urge", "Birth plan basics", "Hospital bag"];
  return ["Signs of labour", "When to go in", "Waters breaking", "Past your due date", "What induction involves"];
};

/* ─────────────────────────────────────────────────────────────────────
   FAQ generator — derived honestly from per-week data
   ───────────────────────────────────────────────────────────────────── */
const buildFaqs = (data: WeekData): { q: string; a: string }[] => {
  const w = data.week;
  const faqs: { q: string; a: string }[] = [];

  faqs.push({
    q: `What's happening in week ${w} of pregnancy?`,
    a: `${data.atAGlance}`,
  });

  if (data.what.baby.size && data.what.baby.size !== "Not yet present" && data.what.baby.size !== "Growing every week") {
    faqs.push({
      q: `How big is the baby at week ${w}?`,
      a: `Around the size of a ${data.what.baby.size.toLowerCase()}. ${data.what.baby.why}`,
    });
  }

  if (data.symptoms.length) {
    const top = data.symptoms.slice(0, 3).map((s) => s.name.toLowerCase()).join(", ");
    faqs.push({
      q: `What symptoms are normal at week ${w}?`,
      a: `Common at this stage: ${top}. ${data.whatThisMeans}`,
    });
  }

  faqs.push({
    q: `Is it normal to feel almost nothing at week ${w}?`,
    a: data.normal.length
      ? `Yes — ${data.normal[0].toLowerCase()} is one of the most common experiences here. Symptom intensity is rarely a reliable signal of how the pregnancy is progressing.`
      : "Yes. Symptom intensity varies widely between people and pregnancies, and is rarely a reliable signal of progress.",
  });

  if (data.seekSupport.length) {
    faqs.push({
      q: `When should I contact my midwife or GP this week?`,
      a: `Get in touch promptly for: ${data.seekSupport.slice(0, 3).map((s) => s.toLowerCase()).join("; ")}. Always trust your instincts — your midwife would rather hear from you.`,
    });
  }

  if (data.focusPoints[0]) {
    faqs.push({
      q: `What should I focus on at week ${w}?`,
      a: `${data.focusPoints[0].action}. ${data.focusPoints[0].reason}.`,
    });
  }

  if (data.nextWeekPreview) {
    faqs.push({
      q: `What changes next week?`,
      a: data.nextWeekPreview,
    });
  }

  faqs.push({
    q: `How might I feel emotionally at week ${w}?`,
    a: `${data.what.emotional.what}. ${data.what.emotional.means}`,
  });

  return faqs;
};

/* ─────────────────────────────────────────────────────────────────────
   On-page anchors
   ───────────────────────────────────────────────────────────────────── */
const anchors = [
  { id: "at-a-glance", label: "At a glance", Icon: Sparkles },
  { id: "biology", label: "What's underway", Icon: Sprout },
  { id: "body", label: "Body changes", Icon: Activity },
  { id: "symptoms", label: "Symptoms", Icon: HeartPulse },
  { id: "emotional", label: "Emotionally", Icon: Heart },
  { id: "what-this-means", label: "What this means", Icon: Leaf },
  { id: "focus", label: "Focus this week", Icon: Calendar },
  { id: "support", label: "Seek support", Icon: ShieldCheck },
  { id: "guidance", label: "Read next", Icon: BookOpen },
];

/* ─────────────────────────────────────────────────────────────────────
   FAQ row
   ───────────────────────────────────────────────────────────────────── */
const FAQRow = ({ faq, defaultOpen = false }: { faq: { q: string; a: string }; defaultOpen?: boolean }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border/40 last:border-b-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-start gap-4 py-5 text-left group">
        <span className="flex-1 font-serif text-[1.05rem] md:text-[1.15rem] text-foreground group-hover:text-sage transition-colors leading-snug">
          {faq.q}
        </span>
        <span className="w-7 h-7 rounded-full bg-sage-bg flex items-center justify-center text-sage shrink-0 mt-1">
          {open ? <Minus size={13} /> : <Plus size={13} />}
        </span>
      </button>
      {open && (
        <p className="font-sans text-[14px] text-foreground/75 leading-[1.85] pb-6 pr-12">{faq.a}</p>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════════════ */
const WeekPage = () => {
  const { week } = useParams<{ week: string }>();
  if (!week || !/^(?:[1-9]|[1-3][0-9]|4[0-2])$/.test(week)) return <Navigate to="/pregnancy" replace />;
  const weekNum = Number(week);

  const data = getWeekData(weekNum);
  const { prev, next } = getAdjacentWeeks(weekNum);
  const t = data.trimester;
  const weeksToGo = Math.max(0, 40 - data.week);
  const sizeParts = parseSize(data.what.baby.size);
  const babyImg = getBabyImage(data.week);
  const related = relatedFor(data.week, t);
  const reflectionChips = reflectionChipsFor(t);
  const askChips = askChipsFor(data.week, t);
  const faqs = buildFaqs(data);

  const glanceFacts = [
    { label: "Stage", value: data.trimesterLabel },
    { label: "Baby size", value: sizeParts.measure ? `${sizeParts.measure} — ${sizeParts.item.toLowerCase()}` : sizeParts.item || "—" },
    { label: "Focus", value: data.keyFocus },
    { label: "Weeks to go", value: data.week >= 40 ? "Past due date" : `~${weeksToGo}` },
  ];

  return (
    <div className="min-h-screen bg-parchment">
      <PregnancyWeekSeo weekNumber={weekNum} />
      <Navbar />

      {/* ───────────────────────────────────────────────────────── 1. HERO */}
      <section className="relative overflow-hidden">
        <div className="relative bg-gradient-to-br from-sage-bg/70 via-parchment to-sage-bg/40 pt-20 pb-36 sm:pt-24 sm:pb-44 md:pt-32 md:pb-52">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[820px] h-[420px] rounded-full bg-sage-light/25 blur-3xl" />
            <div className="absolute -top-10 right-1/4 w-[260px] h-[260px] rounded-full bg-terracotta/5 blur-3xl" />
          </div>
          <img src={botanicalBl} alt="" aria-hidden="true"
            className="pointer-events-none absolute top-20 left-0 w-[150px] lg:w-[210px] opacity-25 select-none hidden md:block" />
          <img src={botanicalTr} alt="" aria-hidden="true"
            className="pointer-events-none absolute top-20 right-0 w-[150px] lg:w-[210px] opacity-25 select-none hidden md:block" />

          <div className="container mx-auto px-14 sm:px-16 md:px-10 max-w-5xl relative z-10 text-center">
            <nav aria-label="breadcrumb" className="flex items-center justify-center gap-2 mb-6 sm:mb-7 font-sans text-[12px] font-normal text-foreground/65">
              <Link to="/pregnancy" className="hover:text-foreground transition-colors">Pregnancy</Link>
              <span className="text-foreground/30">›</span>
              <Link to={data.trimesterPath} className="hover:text-foreground transition-colors">Week by week</Link>
              <span className="text-foreground/30">›</span>
              <span className="text-foreground">Week {data.week}</span>
            </nav>

            <p className="font-sans text-[11px] font-semibold tracking-[0.3em] uppercase text-sage mb-5">
              {trimesterAccent(t)}
            </p>
            <h1 className="font-serif text-[2.5rem] sm:text-5xl md:text-[3.75rem] lg:text-[4.25rem] text-foreground leading-[1.04] tracking-tight mb-4 md:mb-5">
              {data.title}
            </h1>
            <p className="font-serif italic text-[1.05rem] sm:text-lg md:text-xl text-foreground/75 max-w-xl mx-auto leading-relaxed">
              {data.reassurance}
            </p>
          </div>

          {prev && (
            <Link to={`/pregnancy/week/${prev}`} aria-label={`Go to week ${prev}`}
              className="absolute left-3 sm:left-6 md:left-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
              <ChevronLeft size={18} />
            </Link>
          )}
          {next && (
            <Link to={`/pregnancy/week/${next}`} aria-label={`Go to week ${next}`}
              className="absolute right-3 sm:right-6 md:right-12 top-[42%] sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur border border-border/40 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all shadow-card-brand z-20">
              <ChevronRight size={18} />
            </Link>
          )}
        </div>

        {/* Premium floating cluster */}
        <div className="relative -mt-28 sm:-mt-36 md:-mt-40 mb-6">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
            <div className="flex items-end justify-center gap-5 sm:gap-10 md:gap-14">
              {/* Size reference */}
              <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
                <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-card border-[3px] border-sage/15 flex items-center justify-center shadow-elevated overflow-hidden">
                  <span className="font-serif text-[12px] sm:text-[13px] italic text-foreground/70 text-center px-2 leading-tight">
                    {sizeParts.item || "—"}
                  </span>
                  <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.04]" />
                </div>
                <div className="text-center">
                  <p className="font-serif italic text-[12.5px] text-foreground/80 leading-tight">like a {sizeParts.item.toLowerCase() || "tiny seed"}</p>
                  {sizeParts.measure && (
                    <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/55 mt-1">{sizeParts.measure}</p>
                  )}
                </div>
              </div>

              {/* Per-week medallion */}
              <div className="flex flex-col items-center gap-3">
                <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full bg-card border-[4px] border-sage/20 flex items-center justify-center shadow-elevated overflow-hidden">
                  {babyImg ? (
                    <img src={babyImg}
                      alt={`Soft editorial illustration of pregnancy at week ${data.week}`}
                      width={1024} height={1024} loading="eager" decoding="async"
                      className="w-full h-full object-cover scale-[1.02]" />
                  ) : (
                    <Sprout size={48} className="text-sage/60" />
                  )}
                  <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/[0.05]" />
                </div>
                <p className="font-sans text-[10.5px] font-semibold tracking-[0.22em] uppercase text-foreground/65">Your baby this week</p>
              </div>

              {/* Weeks to go */}
              <div className="flex flex-col items-center gap-3 pb-3 sm:pb-4">
                <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-stage-pregnancy/85 to-stage-pregnancy/40 border-[3px] border-terracotta/25 flex items-center justify-center shadow-elevated">
                  <span className="font-serif text-[1.7rem] sm:text-[1.95rem] text-foreground tracking-tight leading-none">
                    {data.week >= 40 ? "—" : weeksToGo}
                  </span>
                  <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-terracotta/10" />
                </div>
                <div className="text-center">
                  <p className="font-serif italic text-[12.5px] text-foreground/80 leading-tight">
                    {data.week >= 40 ? "past due date" : "weeks to go"}
                  </p>
                  <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/55 mt-1">approx.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────── 2. META BAR */}
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
                  Updated for 2026 · 7–9 min read · {data.trimesterLabel}
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

      {/* ───────────────────────────────────────────────────────── 3. AT A GLANCE */}
      <section id="at-a-glance" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl mb-14 md:mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 relative bg-gradient-to-br from-stage-pregnancy/45 via-parchment to-parchment-dark/50 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-10 overflow-hidden shadow-card-brand">
            <img src={botanicalAccent} alt="" aria-hidden="true"
              className="absolute -left-3 bottom-0 w-28 opacity-35 pointer-events-none select-none" />
            <SectionLabel tone="terracotta">At a glance</SectionLabel>
            <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-5">
              Week {data.week}, in one calm read.
            </h2>
            <p className="font-sans text-[15px] text-foreground/85 leading-[1.8]">
              {data.atAGlance}
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

      {/* ───────────────────────────────────────────────────────── 4. WHAT'S UNDERWAY (BABY) */}
      <section id="biology" className="bg-parchment-dark/40 py-16 md:py-24">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-24">
              <div className="relative rounded-3xl overflow-hidden border border-border/40 shadow-card-brand bg-gradient-to-br from-sage-bg/40 to-parchment">
                <div className="aspect-[4/5] flex items-center justify-center p-8">
                  {babyImg ? (
                    <img src={babyImg} alt={`Pregnancy development at week ${data.week}`}
                      loading="lazy" width={1024} height={1280}
                      className="w-full h-full object-contain" />
                  ) : (
                    <Sprout size={96} className="text-sage/50" />
                  )}
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-foreground/60 to-transparent">
                  <p className="font-serif italic text-[13px] text-background/95 leading-snug">
                    Week {data.week} · {sizeParts.item ? `about a ${sizeParts.item.toLowerCase()}` : "growing every day"}.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <SectionLabel>What's underway with the baby</SectionLabel>
              <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-5">
                {data.what.baby.what}.
              </h2>
              <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8] mb-8 max-w-2xl">
                {data.what.baby.why}
              </p>

              <div className="bg-card rounded-2xl border border-border/40 p-6 md:p-7 shadow-card-brand">
                <p className="font-sans text-[10.5px] font-semibold tracking-[0.22em] uppercase text-sage mb-2">What this means</p>
                <p className="font-sans text-[14px] text-foreground/80 leading-[1.8]">{data.what.baby.means}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────── 5. BODY THIS WEEK */}
      <section id="body" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
          <div className="lg:col-span-5">
            <SectionLabel tone="terracotta">Your body this week</SectionLabel>
            <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
              {data.what.body.what}.
            </h2>
            <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
              {data.what.body.why}
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="relative bg-card rounded-2xl border border-border/40 p-6 md:p-8 shadow-card-brand overflow-hidden">
              <span className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sage/30 to-transparent" />
              <p className="font-sans text-[10.5px] font-semibold tracking-[0.22em] uppercase text-sage mb-2">What this means</p>
              <p className="font-sans text-[14.5px] text-foreground/80 leading-[1.8] mb-6">{data.what.body.means}</p>

              <div className="bg-stage-pregnancy/35 border border-border/30 rounded-xl p-5 flex items-start gap-3">
                <span className="w-9 h-9 rounded-full bg-card border border-border/40 flex items-center justify-center shrink-0 mt-0.5">
                  <HeartPulse size={14} className="text-terracotta" />
                </span>
                <p className="font-sans text-[13.5px] text-foreground/80 leading-[1.7]">
                  Variation between people, and from day to day, is normal at week {data.week}. Symptom intensity is rarely a reliable signal of how things are going.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────── 6. SYMPTOMS */}
      <section id="symptoms" className="bg-parchment-dark/40 py-16 md:py-24">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
          <div className="max-w-2xl mb-10">
            <SectionLabel>Common symptoms this week</SectionLabel>
            <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight mb-4">
              What may show up at week {data.week} — and what each one really means.
            </h2>
            <p className="font-sans text-[14.5px] text-foreground/75 leading-[1.8]">
              Symptoms vary widely. Some people feel a clear shift; others feel almost nothing. Both can be entirely normal here.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {data.symptoms.map((s) => {
              const Icon = symptomIcon(s.name);
              return (
                <article key={s.name}
                  className="group relative bg-card rounded-2xl border border-border/40 p-6 md:p-7 shadow-card-brand hover:shadow-soft transition-all duration-500">
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border/40">
                    <span className="w-10 h-10 rounded-full bg-stage-pregnancy/60 flex items-center justify-center">
                      <Icon size={15} className="text-terracotta" />
                    </span>
                    <h3 className="font-serif text-[1.2rem] text-foreground leading-snug">{s.name}</h3>
                  </div>
                  <dl className="space-y-3.5">
                    {s.feelLike && (
                      <div>
                        <dt className="font-sans text-[10.5px] font-semibold tracking-[0.2em] uppercase text-sage mb-1">What it feels like</dt>
                        <dd className="font-sans text-[13.5px] text-foreground/80 leading-[1.7]">{s.feelLike}</dd>
                      </div>
                    )}
                    <div>
                      <dt className="font-sans text-[10.5px] font-semibold tracking-[0.2em] uppercase text-sage mb-1">Why it happens</dt>
                      <dd className="font-sans text-[13.5px] text-foreground/75 leading-[1.7]">{s.why}</dd>
                    </div>
                    {s.when && (
                      <div>
                        <dt className="font-sans text-[10.5px] font-semibold tracking-[0.2em] uppercase text-sage mb-1">When it tends to appear</dt>
                        <dd className="font-sans text-[13.5px] text-foreground/75 leading-[1.7]">{s.when}</dd>
                      </div>
                    )}
                  </dl>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────── 7. EMOTIONAL */}
      <section id="emotional" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 relative bg-gradient-to-br from-lavender-bg via-parchment to-lavender-bg/40 rounded-3xl border border-border/40 p-7 sm:p-8 md:p-9 shadow-card-brand overflow-hidden">
            <img src={botanicalAccent} alt="" aria-hidden="true"
              className="absolute right-0 top-0 w-24 opacity-35 pointer-events-none select-none" />
            <SectionLabel tone="lavender">Emotionally this week</SectionLabel>
            <h2 className="font-serif text-[1.7rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-snug mb-4">
              {data.what.emotional.what}.
            </h2>
            <p className="font-sans text-[14.5px] text-foreground/80 leading-[1.8] mb-4">
              {data.what.emotional.why}
            </p>
            <p className="font-sans text-[14px] text-foreground/70 leading-[1.75]">
              {data.what.emotional.means}
            </p>
          </div>

          <div className="lg:col-span-3 bg-card rounded-3xl border border-border/40 p-7 sm:p-8 md:p-9 shadow-card-brand">
            <p className="font-sans text-[11px] font-semibold tracking-[0.24em] uppercase text-sage mb-4">
              What this week often looks like
            </p>
            <ul className="space-y-3.5">
              {data.humanTruth.map((tline) => (
                <li key={tline} className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-lavender shrink-0" />
                  <span className="font-serif italic text-[15px] text-foreground/85 leading-[1.65]">{tline}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────── 8. WHAT THIS MEANS */}
      <section id="what-this-means" className="bg-sage-bg/35 py-16 md:py-24 border-y border-border/30">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <SectionLabel>What this means</SectionLabel>
            <h2 className="font-serif text-[1.85rem] sm:text-[2rem] md:text-[2.4rem] text-foreground leading-tight">
              How to read week {data.week} honestly.
            </h2>
          </div>

          <div className="bg-card rounded-3xl border border-border/40 p-7 md:p-9 shadow-card-brand mb-6">
            <p className="font-sans text-[15px] text-foreground/85 leading-[1.85]">
              {data.whatThisMeans}
            </p>
          </div>

          {data.normal.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {data.normal.slice(0, 4).map((line, i) => (
                <div key={line} className="relative bg-card rounded-2xl border border-border/40 p-6 shadow-card-brand">
                  <span className="font-serif italic text-[12px] text-sage/80">0{i + 1}</span>
                  <p className="font-sans text-[14px] text-foreground/80 leading-[1.7] mt-1">{line}.</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────── 9. FOCUS THIS WEEK */}
      <section id="focus" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <SectionLabel tone="terracotta">Focus this week</SectionLabel>
            <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.2rem] text-foreground leading-tight mb-4">
              The handful of things that genuinely matter at week {data.week}.
            </h2>
            <p className="font-sans text-[14px] text-foreground/75 leading-[1.8]">
              You don't need to do everything. A few small, intentional choices now do more than a long list ever will.
            </p>
          </div>
          <div className="lg:col-span-8">
            <ol className="bg-card rounded-3xl border border-border/40 shadow-card-brand divide-y divide-border/40 overflow-hidden">
              {data.focusPoints.map((f, i) => {
                const Icon = focusIcon(f.action);
                return (
                  <li key={f.action} className="group flex items-start gap-5 p-5 sm:p-6 md:p-7 hover:bg-sage-bg/25 transition-colors">
                    <span className="w-10 h-10 rounded-full bg-stage-pregnancy/60 border border-border/40 flex items-center justify-center shrink-0">
                      <Icon size={15} className="text-terracotta" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-3 mb-1.5">
                        <span className="font-serif italic text-[12px] text-sage/70">0{i + 1}</span>
                        <h3 className="font-sans text-[14.5px] font-semibold text-foreground leading-snug">{f.action}</h3>
                      </div>
                      <p className="font-sans text-[13px] text-foreground/70 leading-[1.7]">{f.reason}.</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────── 10. WHEN TO SEEK SUPPORT */}
      <section id="support" className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl pb-16 md:pb-24">
        <div className="relative bg-gradient-to-br from-stage-pregnancy/55 via-parchment to-parchment-dark/40 rounded-3xl border border-terracotta/20 p-8 md:p-10 shadow-card-brand overflow-hidden">
          <span className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-terracotta/30 to-transparent" />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
            <div className="md:col-span-4">
              <span className="inline-flex w-12 h-12 rounded-full bg-terracotta/15 items-center justify-center mb-4">
                <AlertTriangle size={18} className="text-terracotta" />
              </span>
              <SectionLabel tone="terracotta">When to seek care</SectionLabel>
              <h3 className="font-serif text-[1.4rem] sm:text-[1.5rem] md:text-[1.7rem] text-foreground leading-snug">
                Most experiences this week are normal. A few are worth checking quickly.
              </h3>
              <p className="font-sans text-[13.5px] text-foreground/70 leading-[1.75] mt-3">
                Always trust your instincts. Contact your GP, midwife or NHS 111 — and 999 in an emergency.
              </p>
            </div>
            <ul className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5 self-center">
              {data.seekSupport.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-2 shrink-0" />
                  <span className="font-sans text-[13.5px] text-foreground/85 leading-[1.7]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────── 11. QUOTE BAND */}
      <section className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl pb-16 md:pb-24">
        <div className="relative bg-stage-pregnancy/35 rounded-3xl border border-border/30 p-8 sm:p-10 md:p-14 text-center overflow-hidden">
          <span className="absolute left-7 top-6 font-serif text-4xl text-terracotta/40 leading-none">“</span>
          <span className="absolute right-7 bottom-4 font-serif text-4xl text-terracotta/40 leading-none">”</span>
          <p className="font-serif italic text-[1.2rem] sm:text-[1.35rem] md:text-[1.6rem] text-foreground/90 leading-snug max-w-3xl mx-auto">
            {data.gentleReminder}
          </p>
          <Heart size={14} className="text-terracotta/60 mx-auto mt-5" />
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────── 12. REFLECTION + ASK */}
      <PublicWeekReflectionAsk
        week={data.week}
        reflectionPrompt={data.reflectionPrompt}
        reflectionPrompts={reflectionChips}
        askChips={askChips}
        askPlaceholder={data.aiPrompts[0]}
        askHeading={data.aiContextPrompt}
      />

      {/* ───────────────────────────────────────────────────────── 13. JOURNAL BAND */}
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
                Hold on to how week {data.week} actually felt.
              </h3>
              <p className="font-sans text-[14px] text-foreground/75 leading-[1.8] mb-6">
                {data.captureIntro}
              </p>
              <ul className="space-y-2.5 mb-7">
                {[
                  "Guided prompts for every week of pregnancy",
                  "Space for scans, photos and small keepsakes",
                  "A lasting record for you and your baby",
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

      {/* ───────────────────────────────────────────────────────── 14. RELATED GUIDANCE */}
      <section id="guidance" className="bg-parchment py-16 md:py-24">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div className="max-w-xl">
              <SectionLabel>Read next, because of week {data.week}</SectionLabel>
              <h2 className="font-serif text-[1.8rem] sm:text-[1.95rem] md:text-[2.4rem] text-foreground leading-tight">
                Curated guidance for what's likely on your mind right now.
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
                  <p className="font-sans text-[13px] text-foreground/70 leading-[1.7] flex-1 mb-4">{a.desc}</p>
                  <span className="inline-flex items-center gap-1.5 font-sans text-[12.5px] font-medium text-sage group-hover:gap-2.5 transition-all">
                    Read guide <ArrowRight size={11} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────── 15. FAQ */}
      <section className="bg-parchment-dark/40 py-16 md:py-24">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
          <div className="mb-10 text-center">
            <SectionLabel>Common questions</SectionLabel>
            <h2 className="font-serif text-[1.85rem] sm:text-[1.95rem] md:text-[2.4rem] text-foreground leading-tight">
              Common questions at week {data.week}
            </h2>
          </div>
          <div className="bg-card rounded-3xl border border-border/40 shadow-card-brand p-2 md:p-4">
            <div className="px-4 md:px-6">
              {faqs.map((f, i) => (
                <FAQRow key={f.q} faq={f} defaultOpen={i === 0} />
              ))}
            </div>
          </div>
          <p className="font-sans text-[12px] text-foreground/55 text-center mt-6 leading-relaxed">
            {data.disclaimer}
          </p>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────── 16. NEXT WEEK CTA */}
      <section className="bg-parchment py-16 md:py-24">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
          <div className="bg-gradient-to-br from-sage-bg via-parchment to-stage-pregnancy/30 rounded-3xl border border-border/30 p-8 sm:p-10 md:p-14 text-center shadow-card-brand">
            <SectionLabel>Up next</SectionLabel>
            <h2 className="font-serif text-[1.85rem] sm:text-[1.95rem] md:text-[2.5rem] text-foreground leading-tight mb-3">
              {next ? `Ready for week ${next}?` : "You've reached the end of the week-by-week journey"}
            </h2>
            {data.nextWeekPreview && (
              <p className="font-sans text-[14.5px] text-foreground/75 max-w-lg mx-auto mb-8 leading-[1.8]">
                {data.nextWeekPreview}
              </p>
            )}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
              {next && (
                <Link to={`/pregnancy/week/${next}`}
                  className="inline-flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium shadow-cta hover:bg-terracotta-hover transition-colors">
                  Continue to week {next} <ArrowRight size={14} />
                </Link>
              )}
              <Link to={weekNum === 42 ? "/first-year#recovery-topics" : data.trimesterPath}
                className="inline-flex items-center justify-center gap-2 border border-foreground/25 text-foreground rounded-pill px-7 py-3.5 font-sans text-[14px] font-medium hover:bg-parchment-dark transition-colors">
                {weekNum === 42 ? "Continue to postpartum recovery" : `Back to ${data.trimesterLabel}`}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WeekPage;
