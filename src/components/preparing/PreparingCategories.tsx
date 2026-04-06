const categories = [
  {
    tag: "Sleeping",
    title: "A safe and simple sleep space",
    detail: "Moses basket, cot, or co-sleeper — keep it minimal and safe",
  },
  {
    tag: "Feeding",
    title: "A way to feed that works for you",
    detail: "Breast or bottle — the essentials are simpler than they seem",
  },
  {
    tag: "Clothing",
    title: "Comfortable, practical clothing",
    detail: "Bodysuits, sleepsuits, layers — nothing fancy needed",
  },
  {
    tag: "Changing",
    title: "Basic hygiene and care",
    detail: "Nappies, wipes, a changing mat — that's the core",
  },
  {
    tag: "Going out",
    title: "A simple way to leave the house",
    detail: "Pram or sling — one option is enough to start",
  },
];

const PreparingCategories = () => {
  return (
    <section className="bg-parchment-dark py-20 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-12 md:gap-14 items-start mb-10">
          <div>
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase mb-5"
              style={{ color: "hsl(var(--stage-preparing-accent))" }}>
              Essentials
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-5">
              What to prepare
            </h2>
            <p className="font-sans text-base font-light text-muted-foreground leading-relaxed">
              Five categories. That's really it. Everything else can come later.
            </p>
          </div>
          <div className="hidden md:flex items-end justify-end">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/40"
              style={{ backgroundColor: "hsl(var(--stage-preparing) / 0.7)" }}>
              <span className="font-serif text-xl font-medium" style={{ color: "hsl(var(--stage-preparing-accent))" }}>5</span>
              <span className="font-sans text-[10px] font-light tracking-widest uppercase text-muted-foreground">categories</span>
            </div>
          </div>
        </div>

        {/* Featured first card */}
        <div className="mb-5 bg-card border border-border/40 rounded-2xl p-7 md:p-8 shadow-elevated"
          style={{ borderLeftWidth: "3px", borderLeftColor: "hsl(var(--stage-preparing-accent))" }}>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 items-start">
            <div>
              <span className="font-sans text-[10px] font-light tracking-[0.2em] uppercase"
                style={{ color: "hsl(var(--stage-preparing-accent))" }}>{categories[0].tag}</span>
              <h3 className="font-serif text-xl text-foreground mt-2 leading-snug">{categories[0].title}</h3>
            </div>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">{categories[0].detail}</p>
          </div>
        </div>

        {/* Remaining cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.slice(1).map((c, i) => (
            <div
              key={i}
              className="bg-card border border-border/40 rounded-xl p-6 shadow-card-brand flex flex-col gap-3"
            >
              <span className="font-sans text-[10px] font-light tracking-[0.2em] uppercase"
                style={{ color: "hsl(var(--stage-preparing-accent))" }}>
                {c.tag}
              </span>
              <h3 className="font-serif text-lg text-foreground leading-snug">{c.title}</h3>
              <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">{c.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PreparingCategories;
