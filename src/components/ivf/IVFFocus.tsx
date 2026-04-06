const focusItems = [
  { text: "Following your care plan step by step", emphasis: true },
  { text: "Focusing on the current stage, rather than jumping ahead", emphasis: false },
  { text: "Managing expectations during waiting periods", emphasis: false },
  { text: "Allowing space for both hope and uncertainty", emphasis: false },
];

const IVFFocus = () => {
  return (
    <section
      className="py-20 md:py-28"
      style={{ backgroundColor: 'hsl(var(--stage-ivf) / 0.12)' }}
    >
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-14 items-start">
          {/* Left — 2/5 */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-6" style={{ backgroundColor: 'hsl(var(--stage-ivf-accent) / 0.3)' }} />
              <span
                className="font-sans text-[11px] font-light tracking-[0.2em] uppercase"
                style={{ color: 'hsl(var(--stage-ivf-accent))' }}
              >
                Right Now
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground leading-tight mb-4">
              What to focus on right now
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-6">
              Each stage has its own rhythm. Start with what matters most in this moment.
            </p>

            {/* Stat anchors */}
            <div className="flex items-center gap-5">
              {[
                { n: "1", label: "stage at a time" },
                { n: "3", label: "key phases" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex items-baseline gap-2 rounded-xl px-4 py-2.5"
                  style={{ backgroundColor: 'hsl(var(--stage-ivf) / 0.25)' }}
                >
                  <span className="font-serif text-xl text-foreground">{s.n}</span>
                  <span className="font-sans text-[10px] font-light text-muted-foreground/70 uppercase tracking-wide">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — 3/5 */}
          <div className="md:col-span-3">
            <div
              className="rounded-2xl p-6 sm:p-8 border"
              style={{
                backgroundColor: 'hsl(var(--stage-ivf) / 0.2)',
                borderColor: 'hsl(var(--stage-ivf-accent) / 0.1)',
              }}
            >
              <div className="space-y-5">
                {focusItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div
                      className="mt-2.5 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{
                        backgroundColor: item.emphasis
                          ? 'hsl(var(--stage-ivf-accent) / 0.8)'
                          : 'hsl(var(--stage-ivf-accent) / 0.35)',
                      }}
                    />
                    <p
                      className={`font-serif text-base sm:text-lg leading-snug ${
                        item.emphasis ? 'text-foreground' : 'italic text-foreground/70'
                      }`}
                    >
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <div
                className="mt-7 pt-5 border-t"
                style={{ borderColor: 'hsl(var(--stage-ivf-accent) / 0.12)' }}
              >
                <p className="font-serif italic text-sm text-foreground/55 leading-relaxed">
                  "You don't need to have all the answers at once. One stage at a time is enough."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IVFFocus;
