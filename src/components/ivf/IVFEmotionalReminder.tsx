const IVFEmotionalReminder = () => {
  return (
    <section
      className="relative py-16 md:py-24 overflow-hidden"
      style={{ backgroundColor: 'hsl(var(--stage-ivf) / 0.15)' }}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] rounded-full blur-3xl"
        style={{ backgroundColor: 'hsl(var(--stage-ivf) / 0.15)' }}
      />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
          {/* Left — statement */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-6" style={{ backgroundColor: 'hsl(var(--stage-ivf-accent) / 0.2)' }} />
              <span
                className="font-sans text-[11px] font-light tracking-[0.2em] uppercase"
                style={{ color: 'hsl(var(--stage-ivf-accent))' }}
              >
                A small reminder
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-[2.2rem] text-foreground mb-5 leading-[1.15] max-w-md">
              It's common to feel both hopeful and cautious during IVF.
            </h2>

            <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed max-w-sm">
              You don't need to feel certain to keep moving forward. Taking things one step at a time is enough.
            </p>
          </div>

          {/* Right — emotional cards */}
          <div className="space-y-4">
            {[
              { feeling: "Hopeful", note: "Even small moments of hope matter." },
              { feeling: "Uncertain", note: "Not knowing is part of this process." },
              { feeling: "Exhausted", note: "This takes more energy than people realise." },
            ].map((card, i) => (
              <div
                key={i}
                className="rounded-xl px-6 py-4 border"
                style={{
                  backgroundColor: 'hsl(var(--stage-ivf) / 0.15)',
                  borderColor: 'hsl(var(--stage-ivf-accent) / 0.1)',
                }}
              >
                <p className="font-serif text-base text-foreground mb-1">{card.feeling}</p>
                <p className="font-sans text-sm font-light text-muted-foreground/70 leading-relaxed italic">
                  {card.note}
                </p>
              </div>
            ))}

            <div className="pt-2">
              <p className="font-serif italic text-sm text-foreground/50">
                Your experience is yours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IVFEmotionalReminder;
