const points = [
  {
    title: "Unique to you",
    desc: "Each experience varies significantly from person to person",
  },
  {
    title: "No fixed pattern",
    desc: "Symptoms do not follow a set trajectory or timeline",
  },
  {
    title: "Shifting emotions",
    desc: "Emotional responses can change week to week, day to day",
  },
  {
    title: "Interpretation over certainty",
    desc: "Much of the journey involves making sense of what's unfolding, not ticking boxes",
  },
];

const WhatMakesDifferent = () => {
  return (
    <section className="bg-parchment-dark py-20 md:py-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-14">
          <p
            className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
            style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}
          >
            A Different Kind of Guide
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground leading-tight mb-4 max-w-lg mx-auto">
            What makes this journey different
          </h2>
          <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed max-w-md mx-auto">
            This isn't a fixed checklist. It's a space that acknowledges the
            real experience of pregnancy, including the parts that feel unclear.
          </p>
        </div>

        {/* Points grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {points.map((point, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 sm:p-7 border border-border/40 bg-card"
            >
              <div className="flex items-start gap-4">
                <span
                  className="font-serif text-2xl leading-none select-none"
                  style={{ color: 'hsl(var(--stage-pregnancy-accent) / 0.4)' }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-serif text-base text-foreground mb-1.5">{point.title}</p>
                  <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                    {point.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatMakesDifferent;
