const points = [
  {
    title: "Timing is procedure-based",
    desc: "Every step is planned, monitored, and held to a clinical rhythm rather than a natural cycle.",
  },
  {
    title: "Monitoring is frequent",
    desc: "Scans and blood work create a structured but intense cadence throughout treatment.",
  },
  {
    title: "Waiting periods feel different",
    desc: "The two-week wait after transfer can carry more emotional weight than any other wait.",
  },
];

const IVFWhatMakesDifferent = () => {
  return (
    <section className="bg-parchment py-14 md:py-20">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div
          className="h-px max-w-32 mx-auto mb-12"
          style={{ backgroundColor: 'hsl(var(--stage-ivf-accent) / 0.20)' }}
        />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-14 items-start">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-6" style={{ backgroundColor: 'hsl(var(--stage-ivf-accent) / 0.3)' }} />
              <span
                className="font-sans text-[11px] font-light tracking-[0.2em] uppercase"
                style={{ color: 'hsl(var(--stage-ivf-accent))' }}
              >
                A different kind of journey
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-[2rem] text-foreground leading-tight mb-5">
              What makes IVF different
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-6">
              IVF follows a structured medical process, but the emotional experience often has its own rhythm — one that doesn&rsquo;t always align with the clinical steps.
            </p>

            <div
              className="pl-5 border-l-2"
              style={{ borderColor: 'hsl(var(--stage-ivf-accent) / 0.4)' }}
            >
              <p className="font-serif italic text-base text-foreground/65 leading-relaxed">
                "The process has structure. The feelings don&rsquo;t always follow it."
              </p>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3.5">
            {points.map((point, i) => (
              <div
                key={i}
                className="rounded-xl p-5 sm:p-6 border bg-card/70 flex items-start gap-5 transition-shadow hover:shadow-card-brand"
                style={{ borderColor: 'hsl(var(--stage-ivf-accent) / 0.14)' }}
              >
                <span
                  className="font-serif text-2xl leading-none select-none shrink-0"
                  style={{ color: 'hsl(var(--stage-ivf-accent) / 0.4)' }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="pt-0.5">
                  <p className="font-serif text-base text-foreground mb-1">{point.title}</p>
                  <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                    {point.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="h-px max-w-32 mx-auto mt-14"
          style={{ backgroundColor: 'hsl(var(--stage-ivf-accent) / 0.20)' }}
        />
      </div>
    </section>
  );
};

export default IVFWhatMakesDifferent;
