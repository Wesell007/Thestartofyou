const sections = [
  {
    tag: "Your body",
    title: "Your body may be responding to medication, procedures, and early changes at the same time.",
    bullets: [
      "Hormonal side effects from medication",
      "Symptoms that feel similar to early pregnancy",
      "Physical sensations that are hard to interpret",
      "Changes that don't follow a clear pattern",
    ],
    meaning:
      "Not every symptom has a clear meaning, and that uncertainty is part of this stage.",
  },
  {
    tag: "Your care and monitoring",
    title: "IVF often involves more frequent appointments and structured checkpoints.",
    bullets: [
      "Regular scans and blood tests",
      "Specific timing for key milestones",
      "Clear next steps, but also periods of waiting",
    ],
    meaning:
      "Your journey may feel medically structured, but emotionally uncertain between milestones.",
  },
  {
    tag: "Emotionally",
    title: "This stage can feel different from a typical pregnancy experience.",
    bullets: [
      "Hopeful, but cautious",
      "Anxious during waiting periods",
      "Reluctant to feel fully reassured",
      "Mentally focused on outcomes",
    ],
    meaning:
      "Feeling both hopeful and guarded is completely normal in IVF.",
  },
  {
    tag: "Waiting",
    title: "A defining part of IVF is waiting.",
    bullets: [
      "The time between transfer and testing feeling long and uncertain",
      "A strong focus on symptoms or lack of them",
      "Difficulty staying present in the moment",
    ],
    meaning:
      "This stage often involves less action and more patience, which can be the hardest part.",
  },
];

const IVFWhatToExpect = () => {
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
        <div className="space-y-0">
          {sections.map((s, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-14 py-10 border-t border-border/40 first:border-0 first:pt-0"
            >
              {/* Left */}
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

export default IVFWhatToExpect;
