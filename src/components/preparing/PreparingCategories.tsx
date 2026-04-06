const categories = [
  {
    num: "01",
    tag: "Sleep",
    title: "A safe, simple sleep space",
    detail: "Moses basket, cot, or co-sleeper — keep it minimal and safe",
    essential: "Firm mattress, fitted sheet, clear space",
  },
  {
    num: "02",
    tag: "Feeding",
    title: "A way to feed that works for you",
    detail: "Breast or bottle — the essentials are simpler than they seem",
    essential: "One feeding method ready to go",
  },
  {
    num: "03",
    tag: "Clothing",
    title: "Comfortable, practical clothing",
    detail: "Bodysuits, sleepsuits, layers — nothing fancy needed",
    essential: "6–8 bodysuits, 4–6 sleepsuits",
  },
  {
    num: "04",
    tag: "Changing",
    title: "Basic hygiene and care",
    detail: "Nappies, wipes, a changing mat — that's the core",
    essential: "Nappies, wipes, cotton wool, mat",
  },
  {
    num: "05",
    tag: "Going out",
    title: "A way to leave the house",
    detail: "Pram or sling — one option is enough to start",
    essential: "One carrier or pram, a changing bag",
  },
];

const PreparingCategories = () => {
  return (
    <section className="bg-parchment-dark py-20 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="mb-12 max-w-2xl">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase mb-5"
            style={{ color: "hsl(var(--stage-preparing-accent))" }}>
            Your checklist
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-5">
            Five categories. That's it.
          </h2>
          <p className="font-sans text-base font-light text-muted-foreground leading-relaxed">
            Everything your baby needs fits into five areas. If these are covered, you're ready.
          </p>
        </div>

        {/* Category cards — varied layout */}
        <div className="space-y-4">
          {categories.map((c, i) => (
            <div key={i} className="bg-card border border-border/40 rounded-xl shadow-card-brand overflow-hidden"
              style={i === 0 ? { borderLeftWidth: "3px", borderLeftColor: "hsl(var(--stage-preparing-accent))" } : undefined}>
              <div className="grid grid-cols-1 md:grid-cols-[auto_1.2fr_1fr_1fr] gap-4 md:gap-0 items-center">
                {/* Number */}
                <div className="px-6 py-5 md:py-0 md:px-5 md:border-r md:border-border/20">
                  <span className="font-serif text-lg font-medium" style={{ color: "hsl(var(--stage-preparing-accent))" }}>{c.num}</span>
                </div>
                {/* Title + tag */}
                <div className="px-6 md:px-5 py-2 md:py-5">
                  <span className="font-sans text-[9px] font-light tracking-[0.2em] uppercase text-muted-foreground block mb-1">{c.tag}</span>
                  <p className="font-serif text-base text-foreground leading-snug">{c.title}</p>
                </div>
                {/* Detail */}
                <div className="px-6 md:px-5 py-2 md:py-5 md:border-l md:border-border/20">
                  <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">{c.detail}</p>
                </div>
                {/* Essential */}
                <div className="px-6 md:px-5 py-4 md:py-5 md:border-l md:border-border/20"
                  style={{ backgroundColor: "hsl(var(--stage-preparing) / 0.25)" }}>
                  <span className="font-sans text-[9px] font-light tracking-[0.15em] uppercase block mb-1"
                    style={{ color: "hsl(var(--stage-preparing-accent))" }}>Minimum</span>
                  <p className="font-sans text-xs font-light text-foreground/70 leading-relaxed">{c.essential}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PreparingCategories;
