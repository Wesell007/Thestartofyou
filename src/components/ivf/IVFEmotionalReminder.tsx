const IVFEmotionalReminder = () => {
  return (
    <section
      className="relative py-16 md:py-20 overflow-hidden"
      style={{ backgroundColor: 'hsl(var(--stage-ivf) / 0.12)' }}
    >
      <div
        className="absolute top-0 left-1/3 w-[400px] h-[200px] rounded-full blur-3xl"
        style={{ backgroundColor: 'hsl(var(--stage-ivf) / 0.12)' }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[300px] h-[200px] rounded-full blur-3xl"
        style={{ backgroundColor: 'hsl(var(--stage-ivf-accent) / 0.05)' }}
      />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-8 md:gap-14 items-center">
          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ backgroundColor: 'hsl(var(--stage-ivf-accent) / 0.25)' }} />
              <span className="font-sans text-[11px] font-light tracking-[0.2em] uppercase" style={{ color: 'hsl(var(--stage-ivf-accent))' }}>
                A small reminder
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-[2.2rem] text-foreground mb-4 leading-[1.12]">
              It's common to feel both hopeful and cautious during IVF.
            </h2>

            <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed mb-5 max-w-sm">
              You don't need to feel certain to keep moving forward. Taking things one step at a time is enough.
            </p>

            <div
              className="pl-5 border-l-2"
              style={{ borderColor: 'hsl(var(--stage-ivf-accent) / 0.3)' }}
            >
              <p className="font-serif italic text-sm text-foreground/50 leading-relaxed">
                Your experience is yours. There is no right way to feel.
              </p>
            </div>
          </div>

          {/* Right — emotional cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { feeling: "Hopeful", note: "Even small moments of hope matter during this process.", accent: "0.15" },
              { feeling: "Uncertain", note: "Not knowing what comes next is part of IVF. You're not alone in that.", accent: "0.12" },
              { feeling: "Exhausted", note: "This takes more energy than people realise. Rest is not giving up.", accent: "0.1" },
            ].map((card, i) => (
              <div
                key={i}
                className="rounded-xl px-5 py-5 border flex flex-col"
                style={{
                  backgroundColor: `hsl(var(--stage-ivf) / ${card.accent})`,
                  borderColor: 'hsl(var(--stage-ivf-accent) / 0.1)',
                }}
              >
                <span
                  className="font-sans text-[10px] font-light tracking-[0.15em] uppercase mb-2"
                  style={{ color: 'hsl(var(--stage-ivf-accent) / 0.7)' }}
                >
                  {card.feeling}
                </span>
                <p className="font-serif italic text-sm text-foreground/55 leading-relaxed flex-1">
                  {card.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IVFEmotionalReminder;
