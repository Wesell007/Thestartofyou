const points = [
  {
    title: "Timing is procedure-based",
    desc: "Timing is based on procedures, not natural cycles. Every step is planned and monitored.",
  },
  {
    title: "Monitoring is frequent",
    desc: "Regular scans and blood work create a structured but intense rhythm throughout the process.",
  },
  {
    title: "Waiting periods feel different",
    desc: "The two-week wait after transfer can feel more emotionally loaded than any other wait.",
  },
  {
    title: "Emotional responses are layered",
    desc: "Hope, anxiety, grief, and resilience can all coexist in the same day, sometimes in the same hour.",
  },
];

const IVFWhatMakesDifferent = () => {
  return (
    <section className="bg-parchment-dark py-20 md:py-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-14 items-start">
          {/* Left — editorial */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-6" style={{ backgroundColor: 'hsl(var(--stage-ivf-accent) / 0.3)' }} />
              <span
                className="font-sans text-[11px] font-light tracking-[0.2em] uppercase"
                style={{ color: 'hsl(var(--stage-ivf-accent))' }}
              >
                A Different Kind of Journey
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground leading-tight mb-5">
              What makes this journey different
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-6">
              IVF follows a structured medical process, but the emotional experience often has its own rhythm, one that doesn't always align with the clinical steps.
            </p>

            {/* Pull-quote */}
            <div
              className="pl-5 border-l-2"
              style={{ borderColor: 'hsl(var(--stage-ivf-accent) / 0.4)' }}
            >
              <p className="font-serif italic text-base text-foreground/65 leading-relaxed">
                "The process has structure. The feelings don't always follow it."
              </p>
            </div>

            {/* Stat */}
            <div className="mt-6 flex items-center gap-5">
              {[
                { n: "4", label: "key differences" },
                { n: "Unique", label: "emotional path" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="font-serif text-lg text-foreground">{s.n}</span>
                  <span className="font-sans text-[10px] font-light text-muted-foreground/60 uppercase tracking-wide">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — numbered points */}
          <div className="md:col-span-3 space-y-4">
            {points.map((point, i) => (
              <div
                key={i}
                className="rounded-xl p-5 sm:p-6 border flex items-start gap-5 hover:shadow-card-brand transition-shadow"
                style={{
                  backgroundColor: i === 0 ? 'hsl(var(--stage-ivf) / 0.12)' : undefined,
                  borderColor: i === 0 ? 'hsl(var(--stage-ivf-accent) / 0.15)' : 'hsl(var(--border) / 0.4)',
                }}
                className={`rounded-xl p-5 sm:p-6 border flex items-start gap-5 hover:shadow-card-brand transition-shadow ${i !== 0 ? 'bg-card border-border/40' : ''}`}
              >
                <span
                  className="font-serif text-3xl leading-none select-none shrink-0"
                  style={{ color: 'hsl(var(--stage-ivf-accent) / 0.35)' }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="pt-1">
                  <p className="font-serif text-base text-foreground mb-1.5">{point.title}</p>
                  <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                    {point.desc}
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

export default IVFWhatMakesDifferent;
