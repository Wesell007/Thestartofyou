const sections = [
  {
    tag: "Your body",
    title: "Your body follows a cycle, but it may not always feel predictable.",
    bullets: [
      "Variations in cycle length from month to month",
      "Subtle signs of ovulation that are easy to miss",
      "Changes that can be misinterpreted or overlooked",
    ],
    meaning:
      "Cycles don't always behave exactly the same each month, even when everything is functioning normally.",
  },
  {
    tag: "Timing and patterns",
    title: "You may become more aware of timing than ever before.",
    bullets: [
      "Tracking fertile windows and ovulation signs",
      "Learning to read cervical mucus and temperature shifts",
      "Balancing awareness with not over-analysing",
    ],
    meaning:
      "Timing can help, but it doesn't guarantee outcomes. Awareness without obsession is the goal.",
  },
  {
    tag: "Emotionally",
    title: "This stage can feel more uncertain than expected.",
    bullets: [
      "Hopeful at the start of a new cycle",
      "Anxious during the waiting period after ovulation",
      "Disappointed if things don't happen as quickly as expected",
      "Unsure how long the process might take",
    ],
    meaning:
      "This stage often involves cycles of expectation and waiting. Both are completely normal.",
  },
  {
    tag: "The wait",
    title: "A large part of trying to conceive is simply waiting.",
    bullets: [
      "The time between ovulation and testing can feel disproportionately long",
      "Symptom spotting can become consuming",
      "Staying present can feel harder than expected",
    ],
    meaning:
      "This stage is often less about action and more about patience, which can be the hardest part.",
  },
];

const TTCWhatToExpect = () => {
  return (
    <section className="bg-parchment py-20 md:py-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        {/* Header — 2/5 split */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-14 mb-12">
          <div className="md:col-span-2">
            <p
              className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
              style={{ color: 'hsl(var(--stage-ttc-accent))' }}
            >
              What to Expect
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground leading-tight">
              What to expect during this journey
            </h2>
          </div>
          <div className="md:col-span-3 flex items-end">
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
              Every TTC experience is different. These are some of the common realities people encounter across the process.
            </p>
          </div>
        </div>

        {/* Content grid — featured first card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {sections.map((s, i) => (
            <div
              key={i}
              className={`rounded-2xl p-6 sm:p-7 border border-border/40 bg-card hover:shadow-card-brand transition-shadow ${
                i === 0 ? 'md:col-span-2' : ''
              }`}
            >
              <div className={i === 0 ? 'grid grid-cols-1 md:grid-cols-2 gap-8' : ''}>
                <div>
                  <p
                    className="font-sans text-[11px] font-light tracking-[0.15em] uppercase mb-3"
                    style={{ color: 'hsl(var(--stage-ttc-accent))' }}
                  >
                    {s.tag}
                  </p>
                  <h3 className="font-serif text-lg sm:text-xl text-foreground leading-snug mb-4">
                    {s.title}
                  </h3>
                </div>

                <div>
                  <ul className="space-y-2.5 mb-5">
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
                    style={{ backgroundColor: 'hsl(var(--stage-ttc) / 0.2)' }}
                  >
                    <p
                      className="font-sans text-[10px] font-light tracking-[0.12em] uppercase mb-1.5"
                      style={{ color: 'hsl(var(--stage-ttc-accent) / 0.7)' }}
                    >
                      What this means
                    </p>
                    <p className="font-serif italic text-sm text-foreground/65 leading-relaxed">
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
