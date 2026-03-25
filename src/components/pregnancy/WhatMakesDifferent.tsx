const points = [
  "Each experience varies significantly from person to person",
  "Symptoms do not follow a fixed pattern",
  "Emotional responses can shift week to week",
  "Much of the journey involves interpretation, not certainty",
];

const WhatMakesDifferent = () => {
  return (
    <section className="bg-parchment-dark py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <div>
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
              A Different Kind of Guide
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-6">
              What makes this journey different
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
              This isn't a fixed checklist. It's a space that acknowledges the
              real experience of pregnancy — including the parts that feel
              unclear.
            </p>
          </div>

          {/* Right */}
          <div className="space-y-6">
            {points.map((point, i) => (
              <div key={i} className="flex items-start gap-5">
                <span className="font-serif text-2xl text-sage-light leading-none mt-0.5 select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-sans text-sm font-light text-foreground leading-relaxed pt-1">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatMakesDifferent;
