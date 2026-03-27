const categories = [
  {
    tag: "Sleeping",
    title: "A safe and simple sleep space",
  },
  {
    tag: "Feeding",
    title: "A way to feed your baby that works for you",
  },
  {
    tag: "Clothing",
    title: "Comfortable, practical clothing",
  },
  {
    tag: "Changing",
    title: "Basic hygiene and care essentials",
  },
  {
    tag: "Going out",
    title: "A simple way to leave the house with your baby",
  },
];

const PreparingCategories = () => {
  return (
    <section className="bg-parchment-dark py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="mb-14">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
            Essentials
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight max-w-lg">
            What to prepare
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((c, i) => (
            <div
              key={i}
              className="bg-card border border-border/50 rounded-lg p-7 shadow-card-brand flex flex-col gap-3"
            >
              <span className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted">
                {c.tag}
              </span>
              <p className="font-serif text-lg text-foreground leading-snug">
                {c.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PreparingCategories;
