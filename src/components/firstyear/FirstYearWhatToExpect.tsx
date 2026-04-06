const topSections = [
  {
    tag: "Your baby",
    title: "Your baby will change quickly throughout this year.",
    bullets: [
      "New skills appearing suddenly",
      "Periods of rapid development followed by quieter phases",
      "Behaviour changing as awareness increases",
    ],
    meaning: "Development is not linear. Progress often happens in bursts, not steady steps.",
  },
  {
    tag: "Daily life",
    title: "Life may begin to feel more structured, but not consistently.",
    bullets: [
      "Routines starting to form, then changing again",
      "Better days followed by more difficult ones",
      "Ongoing adjustment as new phases begin",
    ],
    meaning: "This stage is about building rhythm, not achieving perfect consistency.",
  },
  {
    tag: "Emotionally",
    title: "More stable than the early weeks, but still complex.",
    bullets: [
      "More confident at times, still unsure in new situations",
      "A mix of enjoyment and exhaustion",
      "Pressure to feel like things should be settled",
    ],
    meaning: "Confidence builds gradually, but it's not constant. And that's normal.",
  },
];

const bottomSections = [
  {
    tag: "Ongoing change",
    insight: "Just as something starts to feel easier, it changes again. New challenges replace old ones. Phases feel temporary, even when they matter.",
    meaning: "This stage isn't about reaching a fixed point. It's about adapting as things evolve.",
  },
  {
    tag: "When things shift",
    insight: "Sleep improving, then becoming disrupted again. Routines working, then suddenly not. Feeling like you've figured it out, then needing to adjust.",
    meaning: "Progress comes in phases, not permanent solutions.",
  },
  {
    tag: "Comparison",
    insight: "Comparing your baby's development to others. Questioning whether things are on track. Feeling unsure what is normal.",
    meaning: "Every baby develops differently. Comparison creates more pressure than clarity.",
  },
];

const FirstYearWhatToExpect = () => {
  return (
    <section className="bg-parchment py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-14 mb-12">
          <div className="md:col-span-2">
            <p
              className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
              style={{ color: 'hsl(var(--stage-firstyear-accent))' }}
            >
              What to Expect
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight">
              What to expect during this stage
            </h2>
          </div>
          <div className="md:col-span-3">
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
              The first year touches development, routines, emotions, and identity. Here's what that actually looks like, practically and honestly.
            </p>
          </div>
        </div>

        {/* Top 3: horizontal cards with sidebar insight */}
        <div className="space-y-5 mb-10">
          {topSections.map((s, i) => (
            <div
              key={i}
              className="rounded-xl border border-border/30 grid grid-cols-1 md:grid-cols-[2fr_1fr] overflow-hidden"
              style={{ backgroundColor: i === 0 ? 'hsl(var(--stage-firstyear) / 0.12)' : 'transparent' }}
            >
              <div className="p-6 sm:p-7">
                <p
                  className="font-sans text-[11px] font-light tracking-[0.15em] uppercase mb-3"
                  style={{ color: 'hsl(var(--stage-firstyear-accent))' }}
                >
                  {s.tag}
                </p>
                <h3 className="font-serif text-lg sm:text-xl text-foreground leading-snug mb-4">
                  {s.title}
                </h3>
                <ul className="space-y-2.5">
                  {s.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span
                        className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: `hsl(var(--stage-firstyear-accent) / ${i === 0 ? '0.5' : '0.3'})` }}
                      />
                      <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">{b}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="p-6 sm:p-7 flex flex-col justify-center border-t md:border-t-0 md:border-l"
                style={{
                  backgroundColor: 'hsl(var(--stage-firstyear) / 0.1)',
                  borderColor: 'hsl(var(--stage-firstyear) / 0.15)',
                }}
              >
                <p
                  className="font-sans text-[10px] font-light tracking-[0.12em] uppercase mb-2"
                  style={{ color: 'hsl(var(--stage-firstyear-accent))' }}
                >
                  What this means
                </p>
                <p className="font-serif italic text-base text-foreground/70 leading-relaxed">
                  {s.meaning}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom 3: emotional/shift sections as 3-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {bottomSections.map((s, i) => (
            <div
              key={i}
              className="rounded-xl p-6 border border-border/20"
              style={{ backgroundColor: `hsl(var(--stage-firstyear) / ${0.12 - i * 0.02})` }}
            >
              <p
                className="font-sans text-[11px] font-light tracking-[0.15em] uppercase mb-3"
                style={{ color: 'hsl(var(--stage-firstyear-accent))' }}
              >
                {s.tag}
              </p>
              <p className="font-sans text-sm font-light text-foreground leading-relaxed mb-4">
                {s.insight}
              </p>
              <div className="pt-3 border-t" style={{ borderColor: 'hsl(var(--stage-firstyear-accent) / 0.1)' }}>
                <p className="font-serif italic text-sm text-foreground/55 leading-relaxed">
                  {s.meaning}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FirstYearWhatToExpect;
