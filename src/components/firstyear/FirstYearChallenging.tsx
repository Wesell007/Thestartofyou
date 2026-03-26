const challenges = [
  "Lack of consistent routine",
  "Sleep changes and disruptions",
  "Constant adjustment to new phases",
  "Balancing your needs with your baby's",
  "Feeling like nothing stays solved",
];

const mentalLoad = [
  "Constant decision-making",
  "Thinking about sleep, feeding, development, and routines",
  "Feeling like you're always adapting to something new",
];

const FirstYearChallenging = () => {
  return (
    <section className="bg-parchment-dark py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* What can feel challenging */}
          <div>
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
              Reality Check
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-8">
              What can feel challenging
            </h2>
            <ul className="space-y-4">
              {challenges.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="mt-2 w-1 h-1 rounded-full bg-sage-muted shrink-0" />
                  <p className="font-sans text-base font-light text-muted-foreground leading-relaxed">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* The mental load */}
          <div className="bg-card border border-border/50 rounded-lg p-8 shadow-card-brand flex flex-col gap-5">
            <div>
              <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-3">
                Mental Load
              </p>
              <h3 className="font-serif text-2xl text-foreground leading-snug">
                The mental load
              </h3>
            </div>
            <ul className="space-y-4">
              {mentalLoad.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-2 w-1 h-1 rounded-full bg-sage-muted shrink-0" />
                  <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
            <div className="bg-sage-bg/40 border border-sage-light/30 rounded-md px-5 py-4 mt-auto">
              <p className="font-sans text-xs font-light tracking-[0.12em] uppercase text-sage-muted mb-1.5">
                What this means
              </p>
              <p className="font-serif italic text-sm text-foreground/70 leading-relaxed">
                The mental load continues, even as things begin to feel more familiar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FirstYearChallenging;
