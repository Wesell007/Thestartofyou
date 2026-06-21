const focusItems = [
  { text: "Understanding your cycle, not trying to control everything", emphasis: true },
  { text: "Focusing on timing rather than perfection", emphasis: false },
  { text: "Keeping expectations realistic", emphasis: false },
  { text: "Taking things one step at a time", emphasis: false },
  { text: "Allowing your experience to unfold without comparison", emphasis: false },
];

const TTCFocus = () => {
  return (
    <section
      className="py-16 md:py-24"
      style={{ backgroundColor: 'hsl(var(--stage-ttc) / 0.10)' }}
    >
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start">
          <div>
            <p
              className="font-sans text-[11px] font-light tracking-[0.24em] uppercase mb-4"
              style={{ color: 'hsl(var(--stage-ttc-accent))' }}
            >
              Right now
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-[2rem] text-foreground leading-tight mb-4">
              What to focus on{" "}
              <span className="italic font-normal">right now</span>
            </h2>
            <p className="font-sans text-[14.5px] font-light text-muted-foreground leading-relaxed mb-6 max-w-md">
              You don't need to understand everything at once. Start here.
            </p>

            <div
              className="inline-flex items-baseline gap-2 rounded-xl px-5 py-3"
              style={{ backgroundColor: 'hsl(var(--stage-ttc) / 0.3)' }}
            >
              <span className="font-serif text-2xl text-foreground">1</span>
              <span className="font-sans text-xs font-light text-muted-foreground">
                cycle at a time
              </span>
            </div>

            <div
              className="mt-6 pl-5 border-l-2 max-w-md"
              style={{ borderColor: 'hsl(var(--stage-ttc-accent) / 0.22)' }}
            >
              <p className="font-serif italic text-[14.5px] text-foreground/60 leading-relaxed">
                "You don't need to have it figured out. You just need to start
                where you are."
              </p>
            </div>
          </div>

          <div
            className="rounded-2xl p-6 sm:p-8 border"
            style={{
              backgroundColor: 'hsl(var(--stage-ttc) / 0.22)',
              borderColor: 'hsl(var(--stage-ttc-accent) / 0.14)',
            }}
          >
            <div className="space-y-4">
              {focusItems.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div
                    className="mt-2.5 w-1.5 h-1.5 rounded-full shrink-0"
                    style={{
                      backgroundColor: item.emphasis
                        ? 'hsl(var(--stage-ttc-accent) / 0.75)'
                        : 'hsl(var(--stage-ttc-accent) / 0.35)',
                    }}
                  />
                  <p
                    className={`font-serif text-[15px] sm:text-base leading-snug ${
                      item.emphasis ? 'text-foreground' : 'italic text-foreground/75'
                    }`}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            <div
              className="mt-6 pt-4 border-t"
              style={{ borderColor: 'hsl(var(--stage-ttc-accent) / 0.12)' }}
            >
              <p
                className="font-sans text-xs font-light italic"
                style={{ color: 'hsl(var(--stage-ttc-accent) / 0.85)' }}
              >
                "One cycle at a time is enough."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TTCFocus;
