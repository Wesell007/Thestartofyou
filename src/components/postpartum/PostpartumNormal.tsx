const normal = [
  "Feeling tired most of the time",
  "Emotional ups and downs",
  "Feeling unsure or overwhelmed",
  "Recovery taking longer than expected",
  "Days feeling inconsistent",
];

const seekSupport = [
  "Persistent low mood or anxiety lasting more than two weeks",
  "Feeling unable to cope or disconnected from your baby",
  "Severe pain or physical concerns that aren't improving",
  "Anything that feels worrying, even if you're not sure why",
];

const PostpartumNormal = () => {
  return (
    <section className="bg-parchment-dark py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-14 mb-10">
          <div className="md:col-span-2">
            <p
              className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
              style={{ color: 'hsl(var(--stage-postpartum-accent))' }}
            >
              Guidance
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground leading-tight">
              What's normal, and when to seek support
            </h2>
          </div>
          <div className="md:col-span-3">
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
              Most of what you're experiencing is part of normal adjustment. But some things deserve professional attention, and asking for help is always valid.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div
            className="border rounded-xl p-7 sm:p-8 shadow-card-brand"
            style={{
              backgroundColor: 'hsl(var(--stage-postpartum) / 0.08)',
              borderColor: 'hsl(var(--stage-postpartum) / 0.2)',
            }}
          >
            <p
              className="font-sans text-[11px] font-light tracking-[0.15em] uppercase mb-6"
              style={{ color: 'hsl(var(--stage-postpartum-accent))' }}
            >
              What's normal
            </p>
            <ul className="space-y-4">
              {normal.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: 'hsl(var(--stage-postpartum-accent) / 0.5)' }}
                  />
                  <p className="font-sans text-sm font-light text-foreground leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-card border border-border/50 rounded-xl p-7 sm:p-8 shadow-card-brand">
            <p className="font-sans text-[11px] font-light tracking-[0.15em] uppercase text-terracotta/80 mb-6">
              When to seek support
            </p>
            <ul className="space-y-4">
              {seekSupport.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-terracotta/60 shrink-0" />
                  <p className="font-sans text-sm font-light text-foreground leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostpartumNormal;
