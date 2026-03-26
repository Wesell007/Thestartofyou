const sections = [
  {
    tag: "Your body",
    title: "Your body is recovering from birth while adjusting hormonally.",
    bullets: [
      "Physical healing that takes time",
      "Fatigue from both recovery and sleep disruption",
      "Changes that don't follow a clear timeline",
      "Sensations that feel unfamiliar or unexpected",
    ],
    meaning: "Recovery is not linear. Some days may feel easier, others more difficult — and both are normal.",
  },
  {
    tag: "Your baby",
    title: "Your baby is adjusting to the world outside the womb.",
    bullets: [
      "Frequent feeding",
      "Irregular sleep patterns",
      "Sensitivity to environment",
      "Constant change in behaviour",
    ],
    meaning: "Your baby's needs may feel unpredictable at first — this is part of early development.",
  },
  {
    tag: "Daily life",
    title: "This stage can feel very different from expectations.",
    bullets: [
      "Days blending together",
      "Difficulty finding structure",
      "Constant interruption",
      "Limited time for yourself",
    ],
    meaning: "Adjustment takes time. There is no fixed timeline for feeling \"settled\".",
  },
  {
    tag: "Emotionally",
    title: "This stage can feel intense and layered.",
    bullets: [
      "Overwhelmed or overstimulated",
      "Emotional highs and lows",
      "A sense of responsibility that feels new or heavy",
      "Moments of doubt alongside moments of connection",
    ],
    meaning: "Emotional variation is a natural part of postpartum adjustment.",
  },
  {
    tag: "Identity shift",
    title: "You may notice a shift in how you see yourself.",
    bullets: [
      "Adjusting to a new version of yourself",
      "Feeling unsure how you fit into your previous life",
      "Balancing who you were with who you are now",
    ],
    meaning: "This stage isn't just about caring for your baby — it's also about adjusting to a new identity, which takes time.",
  },
  {
    tag: "Uncertainty",
    title: "Not always knowing if you're doing things \"right\" is part of this stage.",
    bullets: [
      "Questioning decisions",
      "Comparing yourself to others",
      "Wanting reassurance frequently",
    ],
    meaning: "Uncertainty is part of learning and adjusting — not a sign you're doing something wrong.",
  },
];

const PostpartumWhatToExpect = () => {
  return (
    <section className="bg-parchment py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="mb-16">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
            What to Expect
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight max-w-2xl">
            What to expect during this stage
          </h2>
        </div>

        <div className="space-y-0">
          {sections.map((s, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-14 py-10 border-t border-border/40 first:border-0 first:pt-0"
            >
              <div className="flex flex-col gap-2 pt-1">
                <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted">
                  {s.tag}
                </p>
                <p className="font-serif text-lg text-foreground leading-snug">
                  {s.title}
                </p>
              </div>

              <div>
                <ul className="space-y-3 mb-6">
                  {s.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="mt-2 w-1 h-1 rounded-full bg-sage-muted shrink-0" />
                      <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                        {b}
                      </p>
                    </li>
                  ))}
                </ul>
                <div className="bg-sage-bg/40 border border-sage-light/30 rounded-md px-5 py-4">
                  <p className="font-sans text-xs font-light tracking-[0.12em] uppercase text-sage-muted mb-1.5">
                    What this means
                  </p>
                  <p className="font-serif italic text-base text-foreground/70 leading-relaxed">
                    {s.meaning}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PostpartumWhatToExpect;
