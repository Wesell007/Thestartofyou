const focusItems = [
  "Taking things one week at a time",
  "Not trying to understand everything at once",
  "Focusing on what matters at your stage",
  "Allowing your experience to unfold without comparison",
  "Giving yourself space to adjust",
];

const FocusRightNow = () => {
  return (
    <section className="bg-parchment py-20 md:py-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start">
          {/* Left */}
          <div>
            <p
              className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
              style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}
            >
              Right Now
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground leading-tight mb-4">
              What to focus on right now
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
              You don't need to understand everything at once. Start here.
            </p>
          </div>

          {/* Right */}
          <div
            className="rounded-2xl p-6 sm:p-8 space-y-5"
            style={{ backgroundColor: 'hsl(var(--stage-pregnancy) / 0.35)' }}
          >
            {focusItems.map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <span
                  className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: 'hsl(var(--stage-pregnancy-accent) / 0.5)' }}
                />
                <p className="font-serif italic text-base sm:text-lg text-foreground leading-snug">
                  {item}
                </p>
              </div>
            ))}

            <div className="pt-4 border-t" style={{ borderColor: 'hsl(var(--stage-pregnancy-accent) / 0.12)' }}>
              <p
                className="font-sans text-xs font-light"
                style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}
              >
                One week at a time is enough.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FocusRightNow;
