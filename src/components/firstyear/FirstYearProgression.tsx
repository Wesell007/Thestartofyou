const steps = [
  {
    label: "Early months",
    desc: "Focused on adjustment and survival",
    detail: "Feeding, sleep, recovery. The world narrows to the immediate. Everything is being learned.",
    stat: { n: "0–3", label: "months" },
    keywords: ["Survival", "Bonding"],
  },
  {
    label: "Building rhythm",
    desc: "Small patterns begin to form",
    detail: "Routines start to emerge. Your baby becomes more interactive. Things shift from survival to rhythm.",
    stat: { n: "3–6", label: "months" },
    keywords: ["Interaction", "Pattern"],
  },
  {
    label: "Expanding world",
    desc: "Curiosity and movement increase",
    detail: "Movement, curiosity, engagement with the world. New challenges replace old ones.",
    stat: { n: "6–9", label: "months" },
    keywords: ["Curiosity", "Movement"],
  },
  {
    label: "Approaching one year",
    desc: "Familiarity and personality emerge",
    detail: "Things don't become fixed. They become more manageable. Your baby becomes more themselves.",
    stat: { n: "9–12", label: "months" },
    keywords: ["Independence", "Growth"],
  },
];

const FirstYearProgression = () => {
  return (
    <section className="bg-parchment py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-14 items-start mb-10">
          <div className="md:col-span-2">
            <p
              className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
              style={{ color: 'hsl(var(--stage-firstyear-accent))' }}
            >
              Over Time
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground leading-tight mb-5">
              How this stage changes
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-6">
              The first year doesn't follow a straight line, but it does move forward. Each phase builds on what came before.
            </p>
            <div
              className="pl-5 border-l-2"
              style={{ borderColor: 'hsl(var(--stage-firstyear-accent) / 0.3)' }}
            >
              <p className="font-serif italic text-base text-foreground/65 leading-relaxed">
                "Things don't become fixed. They become more familiar."
              </p>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="relative">
              {/* Connecting line */}
              <div
                className="absolute left-[19px] top-[20px] bottom-[20px] w-px hidden md:block"
                style={{ backgroundColor: 'hsl(var(--stage-firstyear-accent) / 0.12)' }}
              />

              <div className="space-y-4">
                {steps.map((step, i) => (
                  <div
                    key={i}
                    className="relative rounded-xl border border-border/20 p-6 flex gap-5"
                    style={{ backgroundColor: `hsl(var(--stage-firstyear) / ${0.14 - i * 0.02})` }}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-serif text-sm border relative z-10"
                      style={{
                        backgroundColor: 'hsl(var(--stage-firstyear) / 0.3)',
                        borderColor: 'hsl(var(--stage-firstyear-accent) / 0.2)',
                        color: 'hsl(var(--stage-firstyear-accent))',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="font-serif text-lg text-foreground leading-snug">{step.label}</p>
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-serif text-base text-foreground">{step.stat.n}</span>
                          <span className="font-sans text-[10px] font-light text-muted-foreground/50 uppercase tracking-wide">{step.stat.label}</span>
                        </div>
                      </div>
                      <p className="font-sans text-sm font-light text-foreground/80 leading-relaxed mb-2">
                        {step.desc}
                      </p>
                      <p className="font-sans text-xs font-light text-muted-foreground/60 leading-relaxed italic mb-3">
                        {step.detail}
                      </p>
                      {/* Phase keyword chips */}
                      <div className="flex gap-2">
                        {step.keywords.map((kw) => (
                          <span
                            key={kw}
                            className="font-sans text-[9px] font-light uppercase tracking-wide px-2 py-0.5 rounded-full"
                            style={{
                              backgroundColor: 'hsl(var(--stage-firstyear) / 0.15)',
                              color: 'hsl(var(--stage-firstyear-accent) / 0.7)',
                            }}
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
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

export default FirstYearProgression;
