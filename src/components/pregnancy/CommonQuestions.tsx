const questions = [
  {
    q: "When do symptoms start?",
    sub: "Understanding early pregnancy signals",
  },
  {
    q: "Is it normal to feel nothing?",
    sub: "On the absence of symptoms",
  },
  {
    q: "When does the first trimester end?",
    sub: "Trimester transitions explained",
  },
  {
    q: "Why do symptoms change week to week?",
    sub: "Variation is part of the process",
  },
];

const CommonQuestions = () => {
  return (
    <section className="bg-parchment py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        {/* Header */}
        <div className="mb-14">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
            Guidance
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight max-w-lg">
            Common questions about pregnancy
          </h2>
        </div>

        {/* Questions list */}
        <div className="divide-y divide-border/50">
          {questions.map((item, i) => (
            <div
              key={i}
              className="group flex items-center justify-between py-6 cursor-pointer hover:pl-2 transition-all"
            >
              <div className="flex flex-col gap-1">
                <p className="font-serif text-xl text-foreground leading-snug group-hover:text-sage transition-colors">
                  {item.q}
                </p>
                <p className="font-sans text-sm font-light text-muted-foreground">
                  {item.sub}
                </p>
              </div>
              <span className="text-muted-foreground/40 group-hover:text-sage transition-colors ml-6 shrink-0 font-serif text-2xl leading-none">
                →
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommonQuestions;
