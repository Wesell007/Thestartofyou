const sections = [
  {
    tag: "Your body",
    title: "Your body may be responding to medication, procedures, and early changes at the same time.",
    stat: { n: "Daily", label: "medications" },
    bullets: [
      "Hormonal side effects from medication",
      "Symptoms that feel similar to early pregnancy",
      "Physical sensations that are hard to interpret",
      "Changes that don't follow a clear pattern",
    ],
    meaning: "Not every symptom has a clear meaning, and that uncertainty is part of this stage.",
  },
  {
    tag: "Your care and monitoring",
    title: "IVF often involves more frequent appointments and structured checkpoints.",
    stat: { n: "Regular", label: "check-ins" },
    bullets: [
      "Regular scans and blood tests",
      "Specific timing for key milestones",
      "Clear next steps, but also periods of waiting",
    ],
    meaning: "Your journey may feel medically structured, but emotionally uncertain between milestones.",
  },
  {
    tag: "Emotionally",
    title: "This stage can feel different from a typical pregnancy experience.",
    stat: { n: "Both", label: "hope and caution" },
    bullets: [
      "Hopeful, but cautious",
      "Anxious during waiting periods",
      "Reluctant to feel fully reassured",
      "Mentally focused on outcomes",
    ],
    meaning: "Feeling both hopeful and guarded is completely normal in IVF.",
  },
  {
    tag: "Waiting",
    title: "A defining part of IVF is waiting.",
    stat: { n: "14", label: "day wait" },
    bullets: [
      "The time between transfer and testing feeling long and uncertain",
      "A strong focus on symptoms or lack of them",
      "Difficulty staying present in the moment",
    ],
    meaning: "This stage often involves less action and more patience, which can be the hardest part.",
  },
];

const IVFWhatToExpect = () => {
  return (
    <section className="bg-parchment py-20 md:py-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-14 mb-14">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-6" style={{ backgroundColor: 'hsl(var(--stage-ivf-accent) / 0.3)' }} />
              <span className="font-sans text-[11px] font-light tracking-[0.2em] uppercase" style={{ color: 'hsl(var(--stage-ivf-accent))' }}>
                What to Expect
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground leading-tight">
              What to expect during this journey
            </h2>
          </div>
          <div className="md:col-span-3 flex items-end">
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed max-w-md">
              IVF brings a unique combination of medical structure and emotional unpredictability. Here is what many people experience across the process.
            </p>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-5">
          {sections.map((s, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 md:gap-8 rounded-2xl bg-card border border-border/40 p-6 sm:p-8 shadow-card-brand"
            >
              {/* Left sidebar */}
              <div className="flex flex-col gap-3">
                <span
                  className="font-sans text-[11px] font-light tracking-[0.15em] uppercase"
                  style={{ color: 'hsl(var(--stage-ivf-accent))' }}
                >
                  {s.tag}
                </span>
                <div
                  className="rounded-lg px-4 py-3 text-center"
                  style={{ backgroundColor: 'hsl(var(--stage-ivf) / 0.2)' }}
                >
                  <span className="font-serif text-lg text-foreground block">{s.stat.n}</span>
                  <span className="font-sans text-[10px] font-light text-muted-foreground/60 uppercase tracking-wide">{s.stat.label}</span>
                </div>
              </div>

              {/* Right content */}
              <div>
                <h3 className="font-serif text-lg sm:text-xl text-foreground leading-snug mb-5">
                  {s.title}
                </h3>
                <ul className="space-y-3 mb-6">
                  {s.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span
                        className="mt-2 w-1 h-1 rounded-full shrink-0"
                        style={{ backgroundColor: 'hsl(var(--stage-ivf-accent) / 0.5)' }}
                      />
                      <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">{b}</p>
                    </li>
                  ))}
                </ul>
                <div
                  className="rounded-lg px-5 py-4 border"
                  style={{
                    backgroundColor: 'hsl(var(--stage-ivf) / 0.1)',
                    borderColor: 'hsl(var(--stage-ivf-accent) / 0.1)',
                  }}
                >
                  <p className="font-sans text-[10px] font-light tracking-[0.15em] uppercase mb-1.5" style={{ color: 'hsl(var(--stage-ivf-accent) / 0.7)' }}>
                    What this means
                  </p>
                  <p className="font-serif italic text-base text-foreground/65 leading-relaxed">
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
