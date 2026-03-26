const sections = [
  {
    tag: "Your baby",
    title: "Your baby will change quickly throughout this year.",
    bullets: [
      "New skills appearing suddenly",
      "Periods of rapid development followed by quieter phases",
      "Behaviour changing as awareness increases",
    ],
    meaning: "Development is not linear. Progress often happens in bursts, not steady steps.",
  },
  {
    tag: "Daily life",
    title: "Life may begin to feel more structured — but not consistently.",
    bullets: [
      "Routines starting to form, then changing again",
      "Better days followed by more difficult ones",
      "Ongoing adjustment as new phases begin",
    ],
    meaning: "This stage is about building rhythm — not achieving perfect consistency.",
  },
  {
    tag: "Emotionally",
    title: "This stage can feel more stable than the early weeks, but still complex.",
    bullets: [
      "More confident at times",
      "Still unsure in new situations",
      "A mix of enjoyment and exhaustion",
      "Pressure to feel like things should be \"settled\"",
    ],
    meaning: "Confidence builds gradually — but it's not constant.",
  },
  {
    tag: "Ongoing change",
    title: "Nothing stays the same for long during the first year.",
    bullets: [
      "Just as something starts to feel easier, it changes again",
      "New challenges replacing old ones",
      "Phases that feel temporary, even when they matter a lot",
    ],
    meaning: "This stage isn't about reaching a fixed point — it's about adapting as things evolve.",
  },
  {
    tag: "When things change again",
    title: "Progress often comes in phases, not permanent solutions.",
    bullets: [
      "Sleep improving, then becoming disrupted again",
      "Routines working, then suddenly not",
      "Feeling like you've figured something out — then needing to adjust again",
    ],
    meaning: "Progress often comes in phases, not permanent solutions.",
  },
  {
    tag: "Comparison",
    title: "Comparing your baby's journey can create more pressure than clarity.",
    bullets: [
      "Comparing your baby's development to others",
      "Questioning whether things are \"on track\"",
      "Feeling unsure what is normal",
    ],
    meaning: "Every baby develops differently. Comparison often creates more pressure than clarity.",
  },
];

const FirstYearWhatToExpect = () => {
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

export default FirstYearWhatToExpect;
