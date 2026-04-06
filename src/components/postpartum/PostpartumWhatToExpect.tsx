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
    featured: true,
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
    featured: false,
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
    featured: false,
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
    featured: false,
  },
  {
    tag: "Identity shift",
    title: "You may notice a shift in how you see yourself.",
    bullets: [
      "Adjusting to a new version of yourself",
      "Feeling unsure how you fit into your previous life",
      "Balancing who you were with who you are now",
    ],
    meaning: "This stage isn't just about caring for your baby. It's also about adjusting to a new identity, which takes time.",
    featured: false,
  },
  {
    tag: "Uncertainty",
    title: "Not always knowing if you're doing things right is part of this stage.",
    bullets: [
      "Questioning decisions",
      "Comparing yourself to others",
      "Wanting reassurance frequently",
    ],
    meaning: "Uncertainty is part of learning and adjusting, not a sign you're doing something wrong.",
    featured: false,
  },
];

const PostpartumWhatToExpect = () => {
  const featured = sections[0];
  const rest = sections.slice(1);

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
              Postpartum touches every part of your life, your body, your baby, your emotions, your identity. Here's what that can actually look like.
            </p>
          </div>
        </div>

        {/* Featured card — Your body */}
        <div
          className="rounded-2xl p-6 sm:p-8 mb-6 border border-border/30"
          style={{ backgroundColor: 'hsl(var(--stage-postpartum) / 0.12)' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p
                className="font-sans text-[11px] font-light tracking-[0.15em] uppercase mb-3"
                style={{ color: 'hsl(var(--stage-postpartum-accent))' }}
              >
                {featured.tag}
              </p>
              <h3 className="font-serif text-xl sm:text-2xl text-foreground leading-snug mb-4">
                {featured.title}
              </h3>
              <ul className="space-y-3">
                {featured.bullets.map((b, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span
                      className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: 'hsl(var(--stage-postpartum-accent) / 0.4)' }}
                    />
                    <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">{b}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-end">
              <div
                className="rounded-xl px-5 py-4 border border-border/20 w-full"
                style={{ backgroundColor: 'hsl(var(--stage-postpartum) / 0.2)' }}
              >
                <p
                  className="font-sans text-[10px] font-light tracking-[0.12em] uppercase mb-1.5"
                  style={{ color: 'hsl(var(--stage-postpartum-accent))' }}
                >
                  What this means
                </p>
                <p className="font-serif italic text-base text-foreground/70 leading-relaxed">
                  {featured.meaning}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Remaining sections as compact rows */}
        <div className="space-y-0">
          {rest.map((s, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 md:gap-14 py-8 border-t first:border-0"
              style={{ borderColor: 'hsl(var(--stage-postpartum) / 0.2)' }}
            >
              <div className="flex flex-col gap-2 pt-1">
                <p
                  className="font-sans text-[11px] font-light tracking-[0.15em] uppercase"
                  style={{ color: 'hsl(var(--stage-postpartum-accent))' }}
                >
                  {s.tag}
                </p>
                <p className="font-serif text-lg text-foreground leading-snug">
                  {s.title}
                </p>
              </div>

              <div>
                <ul className="space-y-2.5 mb-5">
                  {s.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span
                        className="mt-2 w-1 h-1 rounded-full shrink-0"
                        style={{ backgroundColor: 'hsl(var(--stage-postpartum-accent) / 0.3)' }}
                      />
                      <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">{b}</p>
                    </li>
                  ))}
                </ul>
                <div
                  className="rounded-md px-5 py-3.5 border border-border/20"
                  style={{ backgroundColor: 'hsl(var(--stage-postpartum) / 0.12)' }}
                >
                  <p
                    className="font-sans text-[10px] font-light tracking-[0.12em] uppercase mb-1"
                    style={{ color: 'hsl(var(--stage-postpartum-accent))' }}
                  >
                    What this means
                  </p>
                  <p className="font-serif italic text-sm text-foreground/70 leading-relaxed">
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
