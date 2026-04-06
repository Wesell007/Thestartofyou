const challenges = [
  {
    title: "Lack of consistent routine",
    desc: "Patterns start to form, then shift again as new phases arrive",
  },
  {
    title: "Sleep changes and disruptions",
    desc: "Progress isn't linear. Regressions are a normal part of development.",
  },
  {
    title: "Constant adjustment",
    desc: "Each new phase brings different needs and different rhythms",
  },
  {
    title: "Balancing your needs with your baby's",
    desc: "Finding space for yourself can feel impossible but remains important",
  },
];

const mentalLoad = [
  "Constant decision-making about sleep, feeding, and development",
  "Thinking about routines that keep changing",
  "Feeling like you're always adapting to something new",
];

const FirstYearChallenging = () => {
  return (
    <section className="bg-parchment-dark py-16 md:py-24">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-14 items-start">
          {/* Left — editorial */}
          <div className="md:col-span-2">
            <p
              className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
              style={{ color: 'hsl(var(--stage-firstyear-accent))' }}
            >
              Reality Check
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground leading-tight mb-5">
              What can feel challenging
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-6">
              The first year rarely feels settled. Just as one phase starts to feel familiar, another arrives with different demands.
            </p>

            {/* Stat chip */}
            <div
              className="inline-flex items-baseline gap-2 rounded-xl px-5 py-3 mb-6"
              style={{ backgroundColor: 'hsl(var(--stage-firstyear) / 0.25)' }}
            >
              <span className="font-serif text-2xl text-foreground">4</span>
              <span className="font-sans text-[10px] font-light text-muted-foreground/60 uppercase tracking-wide">phases of change</span>
            </div>

            {/* Editorial quote */}
            <div
              className="pl-5 border-l-2"
              style={{ borderColor: 'hsl(var(--stage-firstyear-accent) / 0.3)' }}
            >
              <p className="font-serif italic text-base text-foreground/65 leading-relaxed">
                "Just when you think you've figured it out, everything shifts again."
              </p>
            </div>
          </div>

          {/* Right — numbered points + mental load */}
          <div className="md:col-span-3 space-y-4">
            {challenges.map((point, i) => (
              <div
                key={i}
                className="rounded-xl p-5 sm:p-6 border border-border/30 flex items-start gap-5"
                style={{ backgroundColor: 'hsl(var(--stage-firstyear) / 0.06)' }}
              >
                <span
                  className="font-serif text-3xl leading-none select-none shrink-0"
                  style={{ color: 'hsl(var(--stage-firstyear-accent) / 0.3)' }}
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

            {/* Mental load card */}
            <div
              className="rounded-xl p-5 sm:p-6 border border-border/30"
              style={{ backgroundColor: 'hsl(var(--stage-firstyear) / 0.15)' }}
            >
              <p
                className="font-sans text-[11px] font-light tracking-[0.15em] uppercase mb-3"
                style={{ color: 'hsl(var(--stage-firstyear-accent))' }}
              >
                Mental Load
              </p>
              <ul className="space-y-2.5">
                {mentalLoad.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div
                      className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: 'hsl(var(--stage-firstyear-accent) / 0.4)' }}
                    />
                    <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t" style={{ borderColor: 'hsl(var(--stage-firstyear-accent) / 0.1)' }}>
                <p className="font-serif italic text-sm text-foreground/60 leading-relaxed">
                  The mental load evolves as your baby grows, but it doesn't disappear.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FirstYearChallenging;
