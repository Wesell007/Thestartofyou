const steps = [
  {
    label: "Early days",
    desc: "Can feel intense and unfamiliar",
    detail: "Everything is new. Recovery, feeding, sleep. The world feels different.",
  },
  {
    label: "Small patterns",
    desc: "Begin to form, often without you noticing",
    detail: "Gradual rhythms emerge. Not a routine yet, but something more recognisable.",
  },
  {
    label: "Confidence builds",
    desc: "Gradually, through repetition and experience",
    detail: "You begin to trust your own instincts. Things feel less unfamiliar.",
  },
];

const PostpartumProgression = () => {
  return (
    <section className="bg-parchment py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-14 items-start">
          <div className="md:col-span-2">
            <p
              className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
              style={{ color: 'hsl(var(--stage-postpartum-accent))' }}
            >
              Over Time
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground leading-tight mb-5">
              How this stage changes
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-6">
              Postpartum doesn't follow a straight line. But things do shift, gradually and in their own time.
            </p>
            <div
              className="rounded-xl px-5 py-4 border border-border/20"
              style={{ backgroundColor: 'hsl(var(--stage-postpartum) / 0.15)' }}
            >
              <p
                className="font-sans text-[10px] font-light tracking-[0.12em] uppercase mb-1.5"
                style={{ color: 'hsl(var(--stage-postpartum-accent))' }}
              >
                What this means
              </p>
              <p className="font-serif italic text-base text-foreground/70 leading-relaxed">
                Things don't suddenly become easier. They become more familiar over time.
              </p>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="space-y-0">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-5 pb-8 last:pb-0">
                  <div className="flex flex-col items-center">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-serif shrink-0 border"
                      style={{
                        backgroundColor: 'hsl(var(--stage-postpartum) / 0.2)',
                        borderColor: 'hsl(var(--stage-postpartum-accent) / 0.2)',
                        color: 'hsl(var(--stage-postpartum-accent))',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    {i < steps.length - 1 && (
                      <div
                        className="w-px flex-1 mt-2"
                        style={{ backgroundColor: 'hsl(var(--stage-postpartum-accent) / 0.15)' }}
                      />
                    )}
                  </div>
                  <div className="pb-2 flex-1">
                    <p className="font-serif text-lg text-foreground leading-snug mb-1">
                      {step.label}
                    </p>
                    <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-2">
                      {step.desc}
                    </p>
                    <p className="font-sans text-xs font-light text-muted-foreground/70 leading-relaxed italic">
                      {step.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostpartumProgression;
