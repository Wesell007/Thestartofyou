import { Link } from "react-router-dom";

const clusters = [
  { slug: "development-milestones", title: "Development & milestones", body: "Movement, fine motor, social skills and the wide range of normal.", chips: ["Walking & running", "Fine motor", "Social play", "Cognitive leaps"] },
  { slug: "behaviour-emotions", title: "Behaviour & emotions", body: "Tantrums, defiance, big feelings and gentle boundaries.", chips: ["Tantrums", "Boundaries", "Hitting & biting", "Sharing"] },
  { slug: "speech-language", title: "Speech & language", body: "Vocabulary, sentences, late talkers and bilingual homes.", chips: ["First words", "Two-word phrases", "Late talkers", "Bilingual"] },
  { slug: "sleep", title: "Sleep", body: "Nap transitions, bedtime resistance, night waking and early mornings.", chips: ["Nap drop", "Bedtime battles", "Night waking", "Cot to bed"] },
  { slug: "food-feeding", title: "Food & feeding", body: "Picky eating, refusal, snacks, mealtimes and family meals.", chips: ["Picky eating", "Refusal", "Snacks", "Family meals"] },
  { slug: "potty-learning", title: "Potty learning", body: "Readiness, the first weeks, accidents and night dryness.", chips: ["Readiness", "Starting out", "Accidents", "Night dryness"] },
  { slug: "health-safety", title: "Health & safety", body: "Common illnesses, fevers, accidents and the home environment.", chips: ["Fevers", "Common bugs", "Childproofing", "When to see a GP"] },
  { slug: "play-connection", title: "Play & connection", body: "Independent play, screen time, reading and quiet rituals.", chips: ["Independent play", "Screen time", "Books", "Outdoor"] },
];

const ToddlerTopicClusters = () => {
  return (
    <section id="toddler-topics" className="py-24 md:py-28">
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-6xl">
        <div className="text-center mb-14 md:mb-16">
          <span className="mx-auto block h-px w-10 mb-6" style={{ backgroundColor: "hsl(var(--stage-toddler-accent) / 0.5)" }} />
          <p className="font-sans text-[11px] font-light tracking-[0.34em] uppercase mb-3" style={{ color: "hsl(var(--stage-toddler-accent))" }}>
            Toddler topics
          </p>
          <h2 className="font-serif text-[2rem] md:text-[2.4rem] mb-4 leading-tight" style={{ color: "hsl(var(--stage-toddler-deep))" }}>
            Explore by topic
          </h2>
          <p className="font-sans text-[15px] font-light text-foreground/65 max-w-xl mx-auto leading-relaxed">
            Eight steady clusters across the toddler years. Tap a card to ask a question inside that area.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
          {clusters.map(({ slug, title, body, chips }, i) => (
            <Link
              key={slug}
              to={`/toddler/${slug}`}
              className="group flex h-full flex-col rounded-[22px] border bg-parchment p-8 md:p-9 transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_24px_56px_-28px_rgba(60,40,20,0.35)]"
              style={{
                borderColor: "hsl(var(--stage-toddler-accent) / 0.18)",
                boxShadow: "inset 0 1px 0 hsl(0 0% 100% / 0.7)",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-6" style={{ backgroundColor: "hsl(var(--stage-toddler-accent) / 0.5)" }} />
                <p className="font-sans text-[10.5px] font-light tracking-[0.3em] uppercase" style={{ color: "hsl(var(--stage-toddler-accent) / 0.95)" }}>
                  Cluster · {String(i + 1).padStart(2, "0")}
                </p>
              </div>
              <h3 className="font-serif text-[1.4rem] md:text-[1.55rem] mb-2.5 leading-snug" style={{ color: "hsl(var(--stage-toddler-deep))" }}>
                {title}
              </h3>
              <p className="font-sans text-[14.5px] font-light text-foreground/65 leading-relaxed mb-6">
                {body}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-7">
                {chips.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center rounded-pill px-3 py-1 font-sans text-[11.5px] tracking-wide border"
                    style={{
                      backgroundColor: "hsl(var(--stage-toddler-soft) / 0.5)",
                      color: "hsl(var(--stage-toddler-deep) / 0.88)",
                      borderColor: "hsl(var(--stage-toddler-accent) / 0.18)",
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
              <span
                className="mt-auto inline-flex items-center gap-2 font-sans text-[12.5px] font-medium tracking-wide transition-transform duration-300 group-hover:translate-x-1"
                style={{ color: "hsl(var(--stage-toddler-accent))" }}
              >
                Explore this topic
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToddlerTopicClusters;
