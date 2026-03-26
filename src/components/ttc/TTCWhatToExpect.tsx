const sections = [
  {
    tag: "Your body",
    title: "Your body follows a cycle, but it may not always feel predictable.",
    bullets: [
      "Variations in cycle length",
      "Subtle signs of ovulation",
      "Changes that are easy to miss or misinterpret",
    ],
    meaning:
      "Cycles don't always behave exactly the same each month, even when everything is functioning normally.",
  },
  {
    tag: "Timing and patterns",
    title: "You may become more aware of timing.",
    bullets: [
      "Fertile windows",
      "Ovulation timing",
      "Tracking methods",
    ],
    meaning:
      "Timing can help, but it doesn't guarantee outcomes.",
  },
  {
    tag: "Emotionally",
    title: "This stage can feel more uncertain than expected.",
    bullets: [
      "Hopeful at the start of a cycle",
      "Anxious during the waiting period",
      "Disappointed if things don't happen immediately",
      "Unsure how long it might take",
    ],
    meaning:
      "This stage often involves cycles of expectation and waiting.",
  },
  {
    tag: "Waiting",
    title: "A large part of trying to conceive is waiting.",
    bullets: [
      "The time between ovulation and testing feeling longer than expected",
      "Focusing on symptoms or signs",
      "Difficulty staying present",
    ],
    meaning:
      "This stage is often less about action and more about patience — which can be the hardest part.",
  },
];

const TTCWhatToExpect = () => {
  return (
    <section className="bg-parchment py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        {/* Header */}
        <div className="mb-16">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
            What to Expect
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight max-w-2xl">
            What to expect during this journey
          </h2>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {sections.map((s, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-14 py-10 border-t border-border/40 first:border-0 first:pt-0"
            >
              {/* Left label */}
              <div className="flex flex-col gap-2 pt-1">
                <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted">
                  {s.tag}
                </p>
                <p className="font-serif text-lg text-foreground leading-snug">
                  {s.title}
                </p>
              </div>

              {/* Right */}
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

export default TTCWhatToExpect;
