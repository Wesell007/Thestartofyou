import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const clusters = [
  { slug: "development-milestones", title: "Development & milestones", body: "Movement, fine motor, social skills and the wide range of normal.", chips: ["Walking & running", "Fine motor", "Social play", "Cognitive leaps"] },
  { slug: "behaviour-emotions", title: "Behaviour & emotions", body: "Tantrums, defiance, big feelings and gentle boundaries.", chips: ["Tantrums", "Boundaries", "Hitting & biting", "Sharing"] },
  { slug: "speech-language", title: "Speech & language", body: "Vocabulary, sentences, late talkers and bilingual homes.", chips: ["First words", "Two-word phrases", "Late talkers", "Bilingual"] },
  { slug: "sleep", title: "Sleep", body: "Nap transitions, bedtime resistance, night waking and early mornings.", chips: ["Nap drop", "Bedtime battles", "Night waking", "Cot to bed"] },
  { slug: "food-feeding", title: "Food & feeding", body: "Picky eating, refusal, snacks, mealtimes and family meals.", chips: ["Picky eating", "Refusal", "Snacks", "Family meals"] },
  { slug: "potty-learning", title: "Potty training", body: "Readiness, the first weeks, accidents and night dryness.", chips: ["Readiness", "Starting out", "Accidents", "Night dryness"] },
  { slug: "health-safety", title: "Health & safety", body: "Common illnesses, fevers, accidents and the home environment.", chips: ["Fevers", "Common bugs", "Childproofing", "When to see a GP"] },
  { slug: "play-connection", title: "Play & connection", body: "Independent play, screen time, reading and quiet rituals.", chips: ["Independent play", "Screen time", "Books", "Outdoor"] },
];

const accent = "hsl(var(--stage-toddler-accent))";
const accentSoft = "hsl(var(--stage-toddler-accent) / 0.08)";
const accentMid = "hsl(var(--stage-toddler-accent) / 0.22)";
const accentBorder = "hsl(var(--stage-toddler-accent) / 0.22)";
const accentBorderStrong = "hsl(var(--stage-toddler-accent) / 0.3)";
const deep = "hsl(var(--stage-toddler-deep))";
const deepSoft = "hsl(var(--stage-toddler-deep) / 0.72)";

const ToddlerTopicClusters = () => {
  return (
    <section id="toddler-topics" className="relative py-24 md:py-28 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-48 -z-0"
        style={{
          background:
            "linear-gradient(to bottom, hsl(var(--stage-toddler) / 0.35) 0%, transparent 100%)",
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
            Eight steady clusters across the toddler years. Tap a card to ask a question inside that area.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {clusters.map(({ slug, title, body, chips }, i) => (
            <Link
              key={slug}
              to={`/toddler/${slug}`}
              className="group relative flex h-full flex-col rounded-[22px] border bg-parchment p-8 md:p-9 overflow-hidden transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_22px_50px_-30px_rgba(70,40,20,0.32)]"
              style={{
                borderColor: accentBorder,
                boxShadow:
                  "0 14px 32px -28px rgba(70,40,20,0.22), inset 0 1px 0 hsl(0 0% 100% / 0.6)",
              }}
            >
              <span
                className="pointer-events-none absolute -top-16 -left-16 h-44 w-44 rounded-full blur-2xl opacity-70"
                style={{ background: "hsl(var(--stage-toddler) / 0.35)" }}
                aria-hidden
              />
              <div className="relative flex items-center gap-3 mb-4">
                <span className="h-px w-6" style={{ backgroundColor: accentMid }} />
                <p className="font-sans text-[10.5px] font-light tracking-[0.28em] uppercase" style={{ color: accent }}>
                  Cluster · {String(i + 1).padStart(2, "0")}
                </p>
              </div>
              <h3 className="relative font-serif text-[1.4rem] md:text-[1.55rem] mb-2.5 leading-snug" style={{ color: deep }}>
                {title}
              </h3>
              <p className="relative font-sans text-[14.75px] font-light leading-relaxed mb-6" style={{ color: deepSoft }}>
                {body}
              </p>
              <div className="relative flex flex-wrap gap-1.5 mb-7">
                {chips.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center rounded-pill px-3 py-1 font-sans text-[11.5px] tracking-wide border"
                    style={{
                      backgroundColor: "hsl(var(--stage-toddler-soft) / 0.55)",
                      color: "hsl(var(--stage-toddler-deep) / 0.88)",
                      borderColor: accentBorder,
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
                  className="inline-flex items-center justify-center h-8 w-8 rounded-full border transition-transform duration-300 group-hover:translate-x-1"
                  style={{
                    borderColor: accentBorderStrong,
                    backgroundColor: accentSoft,
                  }}
                  aria-hidden
                >
                  <ArrowRight size={14} strokeWidth={1.8} style={{ color: accent }} />
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
