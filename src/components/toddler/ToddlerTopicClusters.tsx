import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  Heart,
  MessageCircle,
  Moon,
  Utensils,
  Sprout,
  Shield,
  Sun,
  type LucideIcon,
} from "lucide-react";

type Cluster = {
  slug: string;
  eyebrow: string;
  title: string;
  body: string;
  chips: string[];
  Icon: LucideIcon;
};

const clusters: Cluster[] = [
  {
    slug: "development-milestones",
    eyebrow: "Development",
    title: "Development & milestones",
    body: "Movement, fine motor, social skills and the wide range of normal.",
    chips: ["Walking & running", "Fine motor", "Social play", "Cognitive leaps"],
    Icon: Sparkles,
  },
  {
    slug: "behaviour-emotions",
    eyebrow: "Feelings & behaviour",
    title: "Behaviour & emotions",
    body: "Tantrums, defiance, big feelings and gentle boundaries.",
    chips: ["Tantrums", "Boundaries", "Hitting & biting", "Sharing"],
    Icon: Heart,
  },
  {
    slug: "speech-language",
    eyebrow: "Communication",
    title: "Speech & language",
    body: "Vocabulary, sentences, late talkers and bilingual homes.",
    chips: ["First words", "Two-word phrases", "Late talkers", "Bilingual"],
    Icon: MessageCircle,
  },
  {
    slug: "sleep",
    eyebrow: "Rest",
    title: "Sleep",
    body: "Nap transitions, bedtime resistance, night waking and early mornings.",
    chips: ["Nap drop", "Bedtime battles", "Night waking", "Cot to bed"],
    Icon: Moon,
  },
  {
    slug: "food-feeding",
    eyebrow: "Feeding",
    title: "Food & feeding",
    body: "Picky eating, refusal, snacks, mealtimes and family meals.",
    chips: ["Picky eating", "Refusal", "Snacks", "Family meals"],
    Icon: Utensils,
  },
  {
    slug: "potty-learning",
    eyebrow: "Readiness",
    title: "Potty training",
    body: "Readiness, the first weeks, accidents and night dryness.",
    chips: ["Readiness", "Starting out", "Accidents", "Night dryness"],
    Icon: Sprout,
  },
  {
    slug: "health-safety",
    eyebrow: "Care & safety",
    title: "Health & safety",
    body: "Common illnesses, fevers, accidents and the home environment.",
    chips: ["Fevers", "Common bugs", "Childproofing", "When to see a GP"],
    Icon: Shield,
  },
  {
    slug: "play-connection",
    eyebrow: "Play",
    title: "Play & connection",
    body: "Independent play, screen time, reading and quiet rituals.",
    chips: ["Independent play", "Screen time", "Books", "Outdoor"],
    Icon: Sun,
  },
];

const accent = "hsl(var(--stage-toddler-accent))";
const accentSoft = "hsl(var(--stage-toddler-accent) / 0.1)";
const accentMid = "hsl(var(--stage-toddler-accent) / 0.24)";
const accentBorder = "hsl(var(--stage-toddler-accent) / 0.26)";
const accentBorderStrong = "hsl(var(--stage-toddler-accent) / 0.36)";
const deep = "hsl(var(--stage-toddler-deep))";
const deepSoft = "hsl(var(--stage-toddler-deep) / 0.72)";

const ToddlerTopicClusters = () => {
  return (
    <section id="toddler-topics" className="relative py-24 md:py-28 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-48 -z-0"
        style={{
          background:
            "linear-gradient(to bottom, hsl(var(--stage-toddler) / 0.4) 0%, transparent 100%)",
        }}
        aria-hidden
      />
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-6xl relative z-10">
        <div className="text-center mb-14 md:mb-16">
          <span className="mx-auto block h-px w-10 mb-6" style={{ backgroundColor: accentMid }} />
          <p className="font-sans text-[11px] font-light tracking-[0.34em] uppercase mb-3" style={{ color: accent }}>
            Toddler topics
          </p>
          <h2 className="font-serif text-[2rem] md:text-[2.4rem] mb-4 leading-tight" style={{ color: deep }}>
            Explore by topic
          </h2>
          <p className="font-sans text-[15px] font-light leading-relaxed max-w-xl mx-auto" style={{ color: deepSoft }}>
            Eight steady areas across the toddler years. Tap a card to step inside.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {clusters.map(({ slug, eyebrow, title, body, chips, Icon }) => (
            <Link
              key={slug}
              to={`/toddler/${slug}`}
              className="group relative flex h-full flex-col rounded-[22px] border p-9 md:p-10 overflow-hidden transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_28px_60px_-30px_rgba(70,40,20,0.42)]"
              style={{
                borderColor: accentBorder,
                background:
                  "linear-gradient(155deg, hsl(var(--parchment)) 0%, hsl(var(--stage-toddler-soft) / 0.55) 100%)",
                boxShadow:
                  "0 16px 36px -28px rgba(70,40,20,0.26), inset 0 1px 0 hsl(0 0% 100% / 0.65)",
              }}
            >
              <span
                className="pointer-events-none absolute -top-20 -left-20 h-52 w-52 rounded-full blur-3xl opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "hsl(var(--stage-toddler-accent) / 0.22)" }}
                aria-hidden
              />
              <div className="relative flex items-center gap-3.5 mb-5">
                <span
                  className="grid place-items-center h-10 w-10 rounded-full border shrink-0"
                  style={{
                    backgroundColor: "hsl(var(--parchment))",
                    borderColor: accentBorderStrong,
                    boxShadow: "inset 0 1px 0 hsl(0 0% 100% / 0.85)",
                  }}
                  aria-hidden
                >
                  <Icon size={16} strokeWidth={1.6} style={{ color: accent }} />
                </span>
                <p
                  className="font-sans text-[10.5px] font-light tracking-[0.3em] uppercase"
                  style={{ color: accent }}
                >
                  {eyebrow}
                </p>
              </div>
              <h3
                className="relative font-serif text-[1.55rem] md:text-[1.7rem] mb-3 leading-snug"
                style={{ color: deep }}
              >
                {title}
              </h3>
              <p
                className="relative font-sans text-[14.75px] font-light leading-relaxed mb-6"
                style={{ color: deepSoft }}
              >
                {body}
              </p>
              <div className="relative flex flex-wrap gap-1.5 mb-8">
                {chips.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center rounded-pill px-3 py-1 font-sans text-[11.5px] tracking-wide border"
                    style={{
                      backgroundColor: "hsl(var(--stage-toddler) / 0.55)",
                      color: "hsl(var(--stage-toddler-deep) / 0.92)",
                      borderColor: "hsl(var(--stage-toddler-accent) / 0.32)",
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
              <div className="relative mt-auto flex items-center justify-between">
                <span
                  className="font-sans text-[12.5px] font-medium tracking-wide"
                  style={{ color: accent }}
                >
                  Explore this topic
                </span>
                <span
                  className="inline-flex items-center justify-center h-10 w-10 rounded-full border transition-all duration-300 group-hover:translate-x-1 group-hover:shadow-[0_10px_22px_-12px_rgba(70,40,20,0.45)]"
                  style={{
                    borderColor: accentBorderStrong,
                    backgroundColor: accentSoft,
                  }}
                  aria-hidden
                >
                  <ArrowRight size={15} strokeWidth={1.8} style={{ color: accent }} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToddlerTopicClusters;
