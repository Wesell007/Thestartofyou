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
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-14 items-start">
          {/* Left — editorial statement */}
          <div className="md:col-span-2">
            <p
              className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
              style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}
            >
              A Different Kind of Guide
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground leading-tight mb-5">
              What makes this journey different
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-6">
              This isn't a fixed checklist. It's a space that acknowledges the
              real experience of pregnancy, including the parts that feel unclear.
            </p>
            {/* Editorial quote */}
            <div
              className="pl-5 border-l-2"
              style={{ borderColor: 'hsl(var(--stage-pregnancy-accent) / 0.25)' }}
            >
              <p className="font-serif italic text-base text-foreground/65 leading-relaxed">
                "Pregnancy doesn't follow a script. The guide shouldn't either."
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
                  style={{ color: 'hsl(var(--stage-pregnancy-accent) / 0.3)' }}
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

export default WhatMakesDifferent;
