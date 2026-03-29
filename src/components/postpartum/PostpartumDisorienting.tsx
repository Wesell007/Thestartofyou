const disorientingItems = [
  "Not knowing what day or time it is",
  "Losing your usual routine completely",
  "Feeling like time moves both quickly and slowly",
  "Difficulty separating one day from the next",
];

const mentalLoadItems = [
  "Constant decision-making",
  "Thinking about feeding, sleep, recovery, and routines",
  "Feeling like you're always \"on\"",
];

const PostpartumDisorienting = () => {
  return (
    <section className="bg-parchment-dark py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* What can feel disorienting */}
          <div className="bg-card border border-border/50 rounded-lg p-8 shadow-card-brand flex flex-col gap-6">
            <div>
              <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-4">
                Disorientation
              </p>
              <h3 className="font-serif text-2xl text-foreground leading-snug mb-5">
                What can feel disorienting
              </h3>
            </div>

            <ul className="space-y-4 flex-1">
              {disorientingItems.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sage shrink-0" />
                  <p className="font-sans text-sm font-light text-foreground leading-relaxed">
                    {item}
                  </p>
                </li>
              ))}
            </ul>

            <div className="bg-sage-bg/40 border border-sage-light/30 rounded-md px-5 py-4 mt-2">
              <p className="font-sans text-xs font-light tracking-[0.12em] uppercase text-sage-muted mb-1.5">
                What this means
              </p>
              <p className="font-serif italic text-sm text-foreground/70 leading-relaxed">
                This stage often lacks structure, and that can make everything feel more overwhelming, even when things are going well.
              </p>
            </div>
          </div>

          {/* The mental load */}
          <div className="bg-card border border-border/50 rounded-lg p-8 shadow-card-brand flex flex-col gap-6">
            <div>
              <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-4">
                Mental Load
              </p>
              <h3 className="font-serif text-2xl text-foreground leading-snug mb-5">
                The mental load
              </h3>
            </div>

            <ul className="space-y-4 flex-1">
              {mentalLoadItems.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sage shrink-0" />
                  <p className="font-sans text-sm font-light text-foreground leading-relaxed">
                    {item}
                  </p>
                </li>
              ))}
            </ul>

            <div className="bg-sage-bg/40 border border-sage-light/30 rounded-md px-5 py-4 mt-2">
              <p className="font-sans text-xs font-light tracking-[0.12em] uppercase text-sage-muted mb-1.5">
                What this means
              </p>
              <p className="font-serif italic text-sm text-foreground/70 leading-relaxed">
                The mental load can be just as tiring as the physical demands.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PostpartumDisorienting;
