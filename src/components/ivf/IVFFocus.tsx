const focusItems = [
  { text: "Following your care plan step by step", emphasis: true },
  { text: "Focusing on the current stage, rather than jumping ahead", emphasis: false },
  { text: "Managing expectations during waiting periods", emphasis: false },
  { text: "Allowing space for both hope and uncertainty", emphasis: false },
];

const IVFFocus = () => {
  return (
    <section className="bg-parchment py-20 md:py-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start">
          {/* Left */}
          <div>
            <p
              className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
              style={{ color: 'hsl(var(--stage-ivf-accent))' }}
            >
              Right Now
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground leading-tight mb-4">
              What to focus on right now
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-6">
              Each stage has its own rhythm. Start with what matters now.
            </p>

            {/* Anchoring stat */}
            <div
              className="inline-flex items-baseline gap-2 rounded-xl px-5 py-3"
              style={{ backgroundColor: 'hsl(var(--stage-ivf) / 0.3)' }}
            >
              <span className="font-serif text-2xl text-foreground">1</span>
              <span className="font-sans text-xs font-light text-muted-foreground">stage at a time</span>
            </div>
          </div>

          {/* Right */}
          <div
            className="rounded-2xl p-6 sm:p-8"
            style={{ backgroundColor: 'hsl(var(--stage-ivf) / 0.3)' }}
          >
            <div className="space-y-4">
              {focusItems.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div
                    className="mt-2.5 w-1.5 h-1.5 rounded-full shrink-0"
                    style={{
                      backgroundColor: item.emphasis
                        ? 'hsl(var(--stage-ivf-accent) / 0.7)'
                        : 'hsl(var(--stage-ivf-accent) / 0.35)',
                    }}
                  />
                  <p
                    className={`font-serif text-base sm:text-lg leading-snug ${
                      item.emphasis ? 'text-foreground' : 'italic text-foreground/75'
                    }`}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            <div
              className="mt-6 pt-4 border-t"
              style={{ borderColor: 'hsl(var(--stage-ivf-accent) / 0.1)' }}
            >
              <p
                className="font-sans text-xs font-light italic"
                style={{ color: 'hsl(var(--stage-ivf-accent) / 0.8)' }}
              >
                "One stage at a time is enough."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IVFFocus;
