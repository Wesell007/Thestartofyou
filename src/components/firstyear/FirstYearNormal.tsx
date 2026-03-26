const normal = [
  "Development happening at different speeds",
  "Sleep patterns changing frequently",
  "Periods of progress and regression",
  "Feeling unsure or comparing",
  "Confidence going up and down",
];

const seekSupport = [
  "Concerns about development",
  "Persistent feeding or sleep issues",
  "Anything that feels worrying to you",
];

const FirstYearNormal = () => {
  return (
    <section className="bg-parchment-dark py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="mb-14">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
            Guidance
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight max-w-xl">
            What's normal — and when to seek support
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-card border border-border/50 rounded-lg p-8 shadow-card-brand">
            <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-6">
              What's normal
            </p>
            <ul className="space-y-4">
              {normal.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sage shrink-0" />
                  <p className="font-sans text-sm font-light text-foreground leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-card border border-border/50 rounded-lg p-8 shadow-card-brand">
            <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-6">
              When to seek support
            </p>
            <ul className="space-y-4">
              {seekSupport.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-terracotta shrink-0" />
                  <p className="font-sans text-sm font-light text-foreground leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-8 font-sans text-xs font-light text-muted-foreground flex items-center gap-2">
          <span className="text-sage">✔</span> Medically reviewed by Jenny Joines
        </p>
      </div>
    </section>
  );
};

export default FirstYearNormal;
