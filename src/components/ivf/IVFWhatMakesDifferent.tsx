const points = [
  {
    title: "Timing is procedure-based",
    desc: "Timing is based on procedures, not natural cycles",
  },
  {
    title: "Monitoring is frequent",
    desc: "Regular scans and blood work create a structured but intense rhythm",
  },
  {
    title: "Waiting periods feel different",
    desc: "The two-week wait after transfer can feel more loaded than any other wait",
  },
  {
    title: "Emotional responses are layered",
    desc: "Hope, anxiety, grief, and resilience can all coexist in the same day",
  },
];

const IVFWhatMakesDifferent = () => {
  return (
    <section className="bg-parchment-dark py-20 md:py-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-14 items-start">
          {/* Left — editorial statement */}
          <div className="md:col-span-2">
            <p
              className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
              style={{ color: 'hsl(var(--stage-ivf-accent))' }}
            >
              A Different Kind of Journey
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground leading-tight mb-5">
              What makes this journey different
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-6">
              IVF follows a structured medical process, but the emotional experience often has its own rhythm, one that doesn't always align with the clinical steps.
            </p>
            {/* Editorial quote */}
            <div
              className="pl-5 border-l-2"
              style={{ borderColor: 'hsl(var(--stage-ivf-accent) / 0.25)' }}
            >
              <p className="font-serif italic text-base text-foreground/65 leading-relaxed">
                "The process has structure. The feelings don't always follow it."
              </p>
            </div>
          </div>

          {/* Right — numbered points */}
          <div className="md:col-span-3 space-y-4">
            {points.map((point, i) => (
              <div
                key={i}
                className="rounded-xl p-5 sm:p-6 bg-card border border-border/40 flex items-start gap-5 hover:shadow-card-brand transition-shadow"
              >
                <span
                  className="font-serif text-3xl leading-none select-none shrink-0"
                  style={{ color: 'hsl(var(--stage-ivf-accent) / 0.3)' }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="pt-1">
                  <p className="font-serif text-base text-foreground mb-1">{point.title}</p>
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
