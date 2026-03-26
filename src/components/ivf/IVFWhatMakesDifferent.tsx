const points = [
  "Timing is based on procedures, not natural cycles",
  "Monitoring is more frequent and structured",
  "Waiting periods can feel more intense",
  "Emotional responses are often more layered",
];

const IVFWhatMakesDifferent = () => {
  return (
    <section className="bg-parchment-dark py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <div>
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
              A Different Kind of Journey
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-6">
              What makes this journey different
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
              IVF follows a structured medical process, but the emotional experience often has its own rhythm — one that doesn't always align with the clinical steps.
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

export default IVFWhatMakesDifferent;
