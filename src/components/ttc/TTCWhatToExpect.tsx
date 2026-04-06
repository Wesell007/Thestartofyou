const sections = [
  {
    tag: "Your body",
    title: "Your body follows a cycle, but it may not always feel predictable.",
    bullets: [
      "Cycle length can vary by several days month to month",
      "Ovulation signs are subtle and easy to miss",
      "What feels normal one cycle may shift the next",
    ],
    meaning:
      "Cycles don't always behave the same way. Variation is the norm, not the exception.",
    stat: { n: "21–35", label: "day range" },
  },
  {
    tag: "Timing",
    title: "Timing helps, but it cannot guarantee outcomes.",
    bullets: [
      "The fertile window is roughly 5–6 days per cycle",
      "Ovulation prediction methods have real limitations",
      "Perfectly timed cycles can still result in waiting",
    ],
    meaning:
      "Timing is useful. But it's not the only factor. The pressure to time everything perfectly can become its own problem.",
    stat: { n: "5–6", label: "day window" },
  },
  {
    tag: "Emotionally",
    title: "This stage can feel more intense than expected.",
    bullets: [
      "Hope at the start, anxiety in the middle, grief if it doesn't work",
      "Symptom spotting becomes consuming for many",
      "Comparison with others can amplify frustration",
      "The emotional toll is often underestimated",
    ],
    meaning:
      "Cycles of expectation and waiting are emotionally demanding. That's not weakness. It's the reality of this experience.",
    stat: { n: "2", label: "week wait" },
  },
  {
    tag: "The wait",
    title: "The two-week wait is where patience is tested most.",
    bullets: [
      "Time between ovulation and testing feels disproportionately long",
      "Every sensation becomes a potential sign",
      "Staying present during this phase is genuinely hard",
    ],
    meaning:
      "This phase is less about action and more about endurance. It's often the hardest part of the entire process.",
    stat: { n: "14", label: "days" },
  },
];

const TTCWhatToExpect = () => {
  return (
    <section className="bg-parchment py-20 md:py-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-14 mb-10">
          <div className="md:col-span-2">
            <p
              className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
              style={{ color: 'hsl(var(--stage-ttc-accent))' }}
            >
              What to Expect
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground leading-tight">
              The real experience of TTC
            </h2>
          </div>
          <div className="md:col-span-3 flex items-end">
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
              Not the simplified version. The actual physical, emotional, and psychological realities of trying to conceive.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="space-y-4">
          {sections.map((s, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border/40 bg-card hover:shadow-card-brand transition-shadow overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
                {/* Left — tag + stat */}
                <div
                  className="md:col-span-1 p-5 sm:p-6 flex flex-col justify-between gap-4 md:border-r"
                  style={{
                    backgroundColor: 'hsl(var(--stage-ttc) / 0.12)',
                    borderColor: 'hsl(var(--stage-ttc) / 0.2)',
                  }}
                >
                  <p
                    className="font-sans text-[10px] font-light tracking-[0.15em] uppercase"
                    style={{ color: 'hsl(var(--stage-ttc-accent))' }}
                  >
                    {s.tag}
                  </p>
                  <div className="flex flex-col">
                    <span className="font-serif text-2xl text-foreground leading-none">{s.stat.n}</span>
                    <span className="font-sans text-[9px] font-light text-muted-foreground/55 uppercase tracking-widest mt-1">{s.stat.label}</span>
                  </div>
                </div>

                {/* Right — content */}
                <div className="md:col-span-4 p-5 sm:p-6">
                  <h3 className="font-serif text-lg text-foreground leading-snug mb-4">
                    {s.title}
                  </h3>
                  <ul className="space-y-2 mb-5">
                    {s.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <div
                          className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: 'hsl(var(--stage-ttc-accent) / 0.4)' }}
                        />
                        <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                          {b}
                        </p>
                      </li>
                    ))}
                  </ul>
                  <div
                    className="rounded-xl px-5 py-4"
                    style={{ backgroundColor: 'hsl(var(--stage-ttc) / 0.15)' }}
                  >
                    <p className="font-serif italic text-sm text-foreground/60 leading-relaxed">
                      {s.meaning}
                    </p>
                  </div>
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
