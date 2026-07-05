const steps = [
  {
    title: "Open it when you have a quiet moment",
    desc: "There is no perfect routine. A few honest lines are enough.",
  },
  {
    title: "Follow the prompt, or ignore it",
    desc: "The prompts are there to help, not to make the journal feel like homework.",
  },
  {
    title: "Add the things you want to keep",
    desc: "Scan photos, cards, notes and small memories can live alongside your words.",
  },
  {
    title: "Come back to it later",
    desc: "The journal becomes something you can return to long after pregnancy has passed.",
  },
];

const ProductHowToUse = () => {
  return (
    <section className="bg-card py-14 md:py-20">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
        <div className="text-center mb-10 md:mb-12">
          <div className="editorial-rule mx-auto mb-5" />
          <p className="stage-label mb-3">A gentle rhythm</p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-[2rem] text-foreground leading-snug">
            Use it weekly, or whenever you need somewhere to land.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="bg-parchment/60 border border-border/25 rounded-2xl p-6 sm:p-7"
            >
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-serif text-sm text-sage tracking-widest">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif text-base sm:text-lg text-foreground leading-snug">
                  {s.title}
                </h3>
              </div>
              <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed pl-9">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductHowToUse;
