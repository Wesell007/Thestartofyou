import { Link } from "react-router-dom";

const clusters = [
  {
    title: "Development & milestones",
    body: "Movement, fine motor, social skills and the wide range of normal.",
    chips: ["Walking & running", "Fine motor", "Social play", "Cognitive leaps"],
  },
  {
    title: "Behaviour & emotions",
    body: "Tantrums, defiance, big feelings and gentle boundaries.",
    chips: ["Tantrums", "Boundaries", "Hitting & biting", "Sharing"],
  },
  {
    title: "Speech & language",
    body: "Vocabulary, sentences, late talkers and bilingual homes.",
    chips: ["First words", "Two-word phrases", "Late talkers", "Bilingual"],
  },
  {
    title: "Sleep",
    body: "Nap transitions, bedtime resistance, night waking and early mornings.",
    chips: ["Nap drop", "Bedtime battles", "Night waking", "Cot to bed"],
  },
  {
    title: "Food & feeding",
    body: "Picky eating, refusal, snacks, mealtimes and family meals.",
    chips: ["Picky eating", "Refusal", "Snacks", "Family meals"],
  },
  {
    title: "Potty learning",
    body: "Readiness, the first weeks, accidents and night dryness.",
    chips: ["Readiness", "Starting out", "Accidents", "Night dryness"],
  },
  {
    title: "Health & safety",
    body: "Common illnesses, fevers, accidents and the home environment.",
    chips: ["Fevers", "Common bugs", "Childproofing", "When to see a GP"],
  },
  {
    title: "Play & connection",
    body: "Independent play, screen time, reading and quiet rituals.",
    chips: ["Independent play", "Screen time", "Books", "Outdoor"],
  },
];

const ToddlerTopicClusters = () => {
  return (
    <section id="toddler-topics" className="py-20 md:py-24">
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-6xl">
        <div className="text-center mb-12 md:mb-14">
          <p
            className="font-sans text-[11px] font-light tracking-[0.3em] uppercase mb-3"
            style={{ color: "hsl(var(--stage-toddler-accent))" }}
          >
            Toddler topics
          </p>
          <h2
            className="font-serif text-3xl md:text-4xl mb-4"
            style={{ color: "hsl(var(--stage-toddler-deep))" }}
          >
            Explore by topic
          </h2>
          <p className="font-sans text-[15px] font-light text-foreground/65 max-w-xl mx-auto leading-relaxed">
            Eight steady clusters. Tap a card to ask a question inside that area.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {clusters.map(({ title, body, chips }) => (
            <Link
              key={title}
              to={`/ask?q=${encodeURIComponent(title + " toddler")}`}
              className="group block rounded-2xl border bg-parchment p-7 md:p-8 transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_18px_40px_-24px_rgba(60,40,20,0.3)]"
              style={{ borderColor: "hsl(var(--stage-toddler-accent) / 0.2)" }}
            >
              <h3
                className="font-serif text-xl md:text-2xl mb-2"
                style={{ color: "hsl(var(--stage-toddler-deep))" }}
              >
                {title}
              </h3>
              <p className="font-sans text-[14.5px] font-light text-foreground/65 leading-relaxed mb-5">
                {body}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {chips.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center rounded-pill px-3 py-1 font-sans text-[11.5px] tracking-wide"
                    style={{
                      backgroundColor: "hsl(var(--stage-toddler-soft) / 0.7)",
                      color: "hsl(var(--stage-toddler-deep) / 0.85)",
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToddlerTopicClusters;
