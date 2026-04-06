const disorientingItems = [
  "Not knowing what day or time it is",
  "Losing your usual routine completely",
  "Feeling like time moves both quickly and slowly",
  "Difficulty separating one day from the next",
];

const mentalLoadItems = [
  "Constant decision-making",
  "Thinking about feeding, sleep, recovery, and routines simultaneously",
  "Feeling like you're always on",
];

const PostpartumDisorienting = () => {
  return (
    <section className="bg-parchment-dark py-16 md:py-24">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-14 items-start">
          {/* Left — editorial */}
          <div className="md:col-span-2">
            <p
              className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
              style={{ color: 'hsl(var(--stage-postpartum-accent))' }}
            >
              Reality Check
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground leading-tight mb-5">
              What can feel disorienting
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-6">
              This stage often lacks structure, and that can make everything feel more overwhelming, even when things are going well.
            </p>

            {/* Stat chip */}
            <div
              className="inline-flex items-baseline gap-2 rounded-xl px-5 py-3 mb-6"
              style={{ backgroundColor: 'hsl(var(--stage-postpartum) / 0.25)' }}
            >
              <span className="font-serif text-2xl text-foreground">24/7</span>
              <span className="font-sans text-[10px] font-light text-muted-foreground/60 uppercase tracking-wide">mental load</span>
            </div>

            {/* Editorial quote */}
            <div
              className="pl-5 border-l-2"
              style={{ borderColor: 'hsl(var(--stage-postpartum-accent) / 0.3)' }}
            >
              <p className="font-serif italic text-base text-foreground/65 leading-relaxed">
                "The mental load can be just as tiring as the physical demands."
              </p>
            </div>
          </div>

          {/* Right — cards */}
          <div className="md:col-span-3 space-y-4">
            {/* Disorientation card */}
            <div
              className="rounded-xl p-5 sm:p-6 border border-border/30"
              style={{ backgroundColor: 'hsl(var(--stage-postpartum) / 0.1)' }}
            >
              <p
                className="font-sans text-[11px] font-light tracking-[0.15em] uppercase mb-4"
                style={{ color: 'hsl(var(--stage-postpartum-accent))' }}
              >
                Disorientation
              </p>
              <ul className="space-y-3">
                {disorientingItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div
                      className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: 'hsl(var(--stage-postpartum-accent) / 0.4)' }}
                    />
                    <p className="font-sans text-sm font-light text-foreground leading-relaxed">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mental load card */}
            <div
              className="rounded-xl p-5 sm:p-6 border border-border/30"
              style={{ backgroundColor: 'hsl(var(--stage-postpartum) / 0.15)' }}
            >
              <p
                className="font-sans text-[11px] font-light tracking-[0.15em] uppercase mb-4"
                style={{ color: 'hsl(var(--stage-postpartum-accent))' }}
              >
                Mental Load
              </p>
              <ul className="space-y-3">
                {mentalLoadItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div
                      className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: 'hsl(var(--stage-postpartum-accent) / 0.4)' }}
                    />
                    <p className="font-sans text-sm font-light text-foreground leading-relaxed">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
              <div
                className="mt-4 pt-4 border-t"
                style={{ borderColor: 'hsl(var(--stage-postpartum-accent) / 0.1)' }}
              >
                <p className="font-serif italic text-sm text-foreground/60 leading-relaxed">
                  The mental load continues, even as things begin to feel more familiar.
                </p>
              </div>
            </div>

            {/* Identity shift card */}
            <div
              className="rounded-xl p-5 sm:p-6 border border-border/30"
              style={{ backgroundColor: 'hsl(var(--stage-postpartum) / 0.08)' }}
            >
              <p
                className="font-sans text-[11px] font-light tracking-[0.15em] uppercase mb-4"
                style={{ color: 'hsl(var(--stage-postpartum-accent))' }}
              >
                Identity
              </p>
              <p className="font-sans text-sm font-light text-foreground leading-relaxed">
                Adjusting to a new version of yourself, while still recovering, while caring for a baby. All of this is happening at once, and naming it can help.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostpartumDisorienting;
