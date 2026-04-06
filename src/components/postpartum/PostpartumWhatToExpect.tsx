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
    meaning: "Recovery is not linear. Some days may feel easier, others more difficult, and both are normal.",
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
    meaning: "Your baby's needs may feel unpredictable at first. This is part of early development.",
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
    meaning: "Adjustment takes time. There is no fixed timeline for feeling settled.",
  },
];

const emotionalSections = [
  {
    tag: "Emotionally",
    insight: "Emotional highs and lows, overwhelm, overstimulation, and a new weight of responsibility.",
    meaning: "Emotional variation is a natural part of postpartum adjustment.",
  },
  {
    tag: "Identity shift",
    insight: "Adjusting to a new version of yourself while balancing who you were with who you are now.",
    meaning: "This isn't just about your baby. It's about adjusting to a new identity.",
  },
  {
    tag: "Uncertainty",
    insight: "Questioning decisions, comparing yourself to others, and wanting reassurance frequently.",
    meaning: "Uncertainty is part of learning, not a sign you're doing something wrong.",
  },
];

const PostpartumWhatToExpect = () => {
  return (
    <section className="bg-parchment py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-14 mb-12">
          <div className="md:col-span-2">
            <p
              className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
              style={{ color: 'hsl(var(--stage-postpartum-accent))' }}
            >
              What to Expect
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight">
              What to expect during this stage
            </h2>
          </div>
          <div className="md:col-span-3">
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
              Postpartum touches every part of your life. Here's what that can actually look like, practically and emotionally.
            </p>
          </div>
        </div>

        {/* Top 3: horizontal cards with sidebar insight */}
        <div className="space-y-5 mb-10">
          {sections.map((s, i) => (
            <div
              key={i}
              className="rounded-xl border border-border/30 grid grid-cols-1 md:grid-cols-[2fr_1fr] overflow-hidden"
              style={{ backgroundColor: i === 0 ? 'hsl(var(--stage-postpartum) / 0.12)' : 'transparent' }}
            >
              <div className="p-6 sm:p-7">
                <p
                  className="font-sans text-[11px] font-light tracking-[0.15em] uppercase mb-3"
                  style={{ color: 'hsl(var(--stage-postpartum-accent))' }}
                >
                  {s.tag}
                </p>
                <h3 className="font-serif text-lg sm:text-xl text-foreground leading-snug mb-4">
                  {s.title}
                </h3>
                <ul className="space-y-2.5">
                  {s.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span
                        className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: `hsl(var(--stage-postpartum-accent) / ${i === 0 ? '0.5' : '0.3'})` }}
                      />
                      <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">{b}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="p-6 sm:p-7 flex flex-col justify-center border-t md:border-t-0 md:border-l"
                style={{
                  backgroundColor: 'hsl(var(--stage-postpartum) / 0.1)',
                  borderColor: 'hsl(var(--stage-postpartum) / 0.15)',
                }}
              >
                <p
                  className="font-sans text-[10px] font-light tracking-[0.12em] uppercase mb-2"
                  style={{ color: 'hsl(var(--stage-postpartum-accent))' }}
                >
                  What this means
                </p>
                <p className="font-serif italic text-base text-foreground/70 leading-relaxed">
                  {s.meaning}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom 3: emotional/inner sections as a 3-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {emotionalSections.map((s, i) => (
            <div
              key={i}
              className="rounded-xl p-6 border border-border/20"
              style={{ backgroundColor: `hsl(var(--stage-postpartum) / ${0.12 - i * 0.02})` }}
            >
              <p
                className="font-sans text-[11px] font-light tracking-[0.15em] uppercase mb-3"
                style={{ color: 'hsl(var(--stage-postpartum-accent))' }}
              >
                {s.tag}
              </p>
              <p className="font-sans text-sm font-light text-foreground leading-relaxed mb-4">
                {s.insight}
              </p>
              <div
                className="pt-3 border-t"
                style={{ borderColor: 'hsl(var(--stage-postpartum-accent) / 0.1)' }}
              >
                <p className="font-serif italic text-sm text-foreground/55 leading-relaxed">
                  {s.meaning}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PostpartumWhatToExpect;
