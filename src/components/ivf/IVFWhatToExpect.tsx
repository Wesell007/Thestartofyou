const sections = [
  {
    tag: "Your body",
    title: "Your body may be responding to medication, procedures, and early changes at the same time.",
    stat: { n: "Daily", label: "medications" },
    bullets: [
      "Hormonal side effects from stimulation or progesterone",
      "Symptoms that feel similar to early pregnancy",
      "Physical sensations that are hard to interpret",
      "Changes that don't follow a clear or predictable pattern",
    ],
    meaning: "Not every symptom has a clear meaning. That uncertainty is part of this stage.",
    featured: true,
  },
  {
    tag: "Your care",
    title: "IVF involves more frequent appointments and structured clinical checkpoints.",
    stat: { n: "Regular", label: "monitoring" },
    bullets: [
      "Scans and blood tests at specific intervals",
      "Timing that is precise and procedure-driven",
      "Clear next steps, interspersed with waiting",
    ],
    meaning: "The medical structure is reassuring, but the gaps between appointments can feel uncertain.",
    featured: false,
  },
  {
    tag: "Emotionally",
    title: "This stage can feel different from any other experience.",
    stat: { n: "Both", label: "hope and caution" },
    bullets: [
      "Hopeful, but not wanting to get ahead of yourself",
      "Anxious during the gaps between milestones",
      "Reluctant to feel fully reassured by any single sign",
      "Mentally focused on outcomes, even when trying not to be",
    ],
    meaning: "Feeling both hopeful and guarded is completely normal in IVF.",
    featured: false,
  },
  {
    tag: "The wait",
    title: "A defining part of IVF is the two-week wait.",
    stat: { n: "14", label: "days" },
    bullets: [
      "The time between transfer and testing can feel impossibly long",
      "Every sensation can feel loaded with significance",
      "Staying present becomes the hardest part of the process",
    ],
    meaning: "Less action and more patience. Often the most emotionally demanding stage.",
    featured: false,
  },
];

const IVFWhatToExpect = () => {
  return (
    <section className="bg-parchment-dark pt-2 pb-14 md:pb-20">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        {/* Lead-in only — heading lives in IVFWhatThisIs above */}
        <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed max-w-2xl mb-10">
          IVF brings a unique combination of medical structure and emotional unpredictability. Here is what many people experience across the body, care, emotions, and the wait.
        </p>


        {/* Featured first card */}
        <div
          className="rounded-2xl p-6 sm:p-8 border shadow-card-brand mb-5"
          style={{
            backgroundColor: 'hsl(var(--stage-ivf) / 0.08)',
            borderColor: 'hsl(var(--stage-ivf-accent) / 0.15)',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6 md:gap-8">
            <div className="flex flex-col gap-3">
              <span className="font-sans text-[11px] font-light tracking-[0.15em] uppercase" style={{ color: 'hsl(var(--stage-ivf-accent))' }}>
                {sections[0].tag}
              </span>
              <div className="rounded-lg px-4 py-3 text-center" style={{ backgroundColor: 'hsl(var(--stage-ivf) / 0.2)' }}>
                <span className="font-serif text-lg text-foreground block">{sections[0].stat.n}</span>
                <span className="font-sans text-[10px] font-light text-muted-foreground/60 uppercase tracking-wide">{sections[0].stat.label}</span>
              </div>
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl text-foreground leading-snug mb-4">{sections[0].title}</h3>
              <ul className="space-y-2.5 mb-5">
                {sections[0].bullets.map((b, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: 'hsl(var(--stage-ivf-accent) / 0.5)' }} />
                    <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">{b}</p>
                  </li>
                ))}
              </ul>
              <div className="rounded-lg px-5 py-4 border" style={{ backgroundColor: 'hsl(var(--stage-ivf) / 0.1)', borderColor: 'hsl(var(--stage-ivf-accent) / 0.1)' }}>
                <p className="font-sans text-[10px] font-light tracking-[0.15em] uppercase mb-1" style={{ color: 'hsl(var(--stage-ivf-accent) / 0.7)' }}>What this means</p>
                <p className="font-serif italic text-[15px] text-foreground/60 leading-relaxed">{sections[0].meaning}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Remaining cards in a tighter grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sections.slice(1).map((s, i) => (
            <div key={i} className="rounded-2xl p-5 sm:p-6 bg-card border border-border/40 shadow-card-brand flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="font-sans text-[11px] font-light tracking-[0.15em] uppercase" style={{ color: 'hsl(var(--stage-ivf-accent))' }}>
                  {s.tag}
                </span>
                <div className="flex items-baseline gap-1.5 rounded-lg px-2.5 py-1.5" style={{ backgroundColor: 'hsl(var(--stage-ivf) / 0.15)' }}>
                  <span className="font-serif text-sm text-foreground">{s.stat.n}</span>
                  <span className="font-sans text-[9px] font-light text-muted-foreground/55 uppercase tracking-wide">{s.stat.label}</span>
                </div>
              </div>
              <h3 className="font-serif text-base text-foreground leading-snug mb-3">{s.title}</h3>
              <ul className="space-y-2 mb-4 flex-1">
                {s.bullets.map((b, j) => (
                  <li key={j} className="flex items-start gap-2.5">
                    <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: 'hsl(var(--stage-ivf-accent) / 0.4)' }} />
                    <p className="font-sans text-[13px] font-light text-muted-foreground leading-relaxed">{b}</p>
                  </li>
                ))}
              </ul>
              <div className="rounded-lg px-4 py-3 border mt-auto" style={{ backgroundColor: 'hsl(var(--stage-ivf) / 0.08)', borderColor: 'hsl(var(--stage-ivf-accent) / 0.08)' }}>
                <p className="font-serif italic text-[13px] text-foreground/55 leading-relaxed">{s.meaning}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IVFWhatToExpect;
