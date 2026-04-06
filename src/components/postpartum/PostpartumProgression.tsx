const steps = [
  {
    label: "Early days",
    desc: "Intense, unfamiliar, everything at once",
    detail: "Recovery, feeding, sleep disruption, hormonal shifts. The world narrows to the immediate.",
    stat: { n: "1–2", label: "weeks" },
  },
  {
    label: "Small patterns",
    desc: "Rhythms begin to form, often without you noticing",
    detail: "Not a routine yet, but something more recognisable. You start to know what to expect, some of the time.",
    stat: { n: "3–6", label: "weeks" },
  },
  {
    label: "Confidence builds",
    desc: "Gradually, through repetition and experience",
    detail: "You begin to trust your own instincts. Not because things are easy, but because they're more familiar.",
    stat: { n: "7–12", label: "weeks" },
  },
];

const PostpartumProgression = () => {
  return (
    <section className="bg-parchment py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-14 items-start mb-10">
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
              className="pl-5 border-l-2"
              style={{ borderColor: 'hsl(var(--stage-postpartum-accent) / 0.3)' }}
            >
              <p className="font-serif italic text-base text-foreground/65 leading-relaxed">
                "Things don't suddenly become easier. They become more familiar."
              </p>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="relative">
              {/* Connecting line */}
              <div
                className="absolute left-[19px] top-[20px] bottom-[20px] w-px hidden md:block"
                style={{ backgroundColor: 'hsl(var(--stage-postpartum-accent) / 0.12)' }}
              />

              <div className="space-y-4">
                {steps.map((step, i) => (
                  <div
                    key={i}
                    className="relative rounded-xl border border-border/20 p-6 flex gap-5"
                    style={{ backgroundColor: `hsl(var(--stage-postpartum) / ${0.12 - i * 0.03})` }}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-serif text-sm border relative z-10"
                      style={{
                        backgroundColor: 'hsl(var(--stage-postpartum) / 0.25)',
                        borderColor: 'hsl(var(--stage-postpartum-accent) / 0.2)',
                        color: 'hsl(var(--stage-postpartum-accent))',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-serif text-lg text-foreground leading-snug">
                          {step.label}
                        </p>
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-serif text-base text-foreground">{step.stat.n}</span>
                          <span className="font-sans text-[10px] font-light text-muted-foreground/50 uppercase tracking-wide">{step.stat.label}</span>
                        </div>
                      </div>
                      <p className="font-sans text-sm font-light text-foreground/80 leading-relaxed mb-1.5">
                        {step.desc}
                      </p>
                      <p className="font-sans text-xs font-light text-muted-foreground/60 leading-relaxed italic">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostpartumProgression;
