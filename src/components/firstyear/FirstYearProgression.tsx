const steps = [
  {
    phase: "Early months",
    title: "Focused on adjustment",
    detail: "The first weeks feel centred around recovery, feeding, and responding to constant change.",
  },
  {
    phase: "Mid-year",
    title: "Small patterns begin to form",
    detail: "Routines start to emerge, fragile at first, then more reliable over time.",
  },
  {
    phase: "Later months",
    title: "Confidence builds gradually",
    detail: "Understanding your baby's cues becomes more natural, even as new challenges arrive.",
  },
  {
    phase: "Approaching one year",
    title: "Familiarity increases",
    detail: "Things don't become fixed, they become more manageable.",
  },
];

const FirstYearProgression = () => {
  return (
    <section className="bg-parchment py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="mb-16">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
            Over Time
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight max-w-xl">
            How this stage changes
          </h2>
        </div>

        <div className="relative pl-6 md:pl-10">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-border/50" />
          <div className="space-y-10">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-6 md:-left-10 top-1.5 w-2.5 h-2.5 rounded-full bg-sage border-2 border-parchment" />
                <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-1">
                  {step.phase}
                </p>
                <h3 className="font-serif text-xl text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 bg-sage-bg/40 border border-sage-light/30 rounded-md px-6 py-5 max-w-xl">
          <p className="font-sans text-xs font-light tracking-[0.12em] uppercase text-sage-muted mb-1.5">
            What this means
          </p>
          <p className="font-serif italic text-base text-foreground/70 leading-relaxed">
            Things don't become fixed, they become more manageable.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FirstYearProgression;
