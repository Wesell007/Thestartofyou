const challenges = [
  {
    title: "Lack of consistent routine",
    desc: "Patterns start to form, then shift again as new phases arrive",
  },
  {
    title: "Sleep changes and disruptions",
    desc: "Progress isn't linear, regressions are a normal part of development",
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
  "Constant decision-making",
  "Thinking about sleep, feeding, development, and routines",
  "Feeling like you're always adapting to something new",
];

const FirstYearChallenging = () => {
  return (
    <section className="bg-parchment-dark py-20 md:py-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-14 items-start">
          {/* Left — editorial statement */}
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
              The first year rarely feels settled. Just as one phase starts to feel familiar, another arrives.
            </p>
            {/* Editorial quote */}
            <div
              className="pl-5 border-l-2"
              style={{ borderColor: 'hsl(var(--stage-firstyear-accent) / 0.25)' }}
            >
              <p className="font-serif italic text-base text-foreground/65 leading-relaxed">
                "The mental load continues, even as things begin to feel more familiar."
              </p>
            </div>
          </div>

          {/* Right — numbered points + mental load */}
          <div className="md:col-span-3 space-y-4">
            {challenges.map((point, i) => (
              <div
                key={i}
                className="rounded-xl p-5 sm:p-6 bg-card border border-border/40 flex items-start gap-5 hover:shadow-card-brand transition-shadow"
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
              className="rounded-xl p-5 sm:p-6 border border-border/40"
              style={{ backgroundColor: 'hsl(var(--stage-firstyear) / 0.2)' }}
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FirstYearChallenging;
