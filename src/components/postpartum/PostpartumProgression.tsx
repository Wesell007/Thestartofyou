const steps = [
  {
    label: "Early days",
    desc: "Can feel intense and unfamiliar",
    meaning: null,
  },
  {
    label: "Small patterns",
    desc: "Begin to form, often without you noticing",
    meaning: null,
  },
  {
    label: "Confidence builds",
    desc: "Gradually, through repetition and experience",
    meaning: null,
  },
];

const PostpartumProgression = () => {
  return (
    <section className="bg-parchment py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
          <div>
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
              Over Time
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-6">
              How this stage changes
            </h2>
            <div className="bg-sage-bg/40 border border-sage-light/30 rounded-md px-5 py-4">
              <p className="font-sans text-xs font-light tracking-[0.12em] uppercase text-sage-muted mb-1.5">
                What this means
              </p>
              <p className="font-serif italic text-base text-foreground/70 leading-relaxed">
                Things don't suddenly become easier, they become more familiar over time.
              </p>
            </div>
          </div>

          <div className="space-y-0">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-5 pb-8 last:pb-0">
                <div className="flex flex-col items-center">
                  <div className="w-2.5 h-2.5 rounded-full border-2 border-sage bg-card mt-1 shrink-0" />
                  {i < steps.length - 1 && (
                    <div className="w-px flex-1 bg-sage-light/50 mt-2" />
                  )}
                </div>
                <div className="pb-2">
                  <p className="font-serif text-lg text-foreground leading-snug mb-1.5">
                    {step.label}
                  </p>
                  <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostpartumProgression;
