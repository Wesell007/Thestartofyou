const focusItems = [
  "Taking things one week at a time",
  "Not trying to understand everything at once",
  "Focusing on what matters at your stage",
  "Allowing your experience to unfold without comparison",
  "Giving yourself space to adjust",
];

const FocusRightNow = () => {
  return (
    <section className="bg-parchment py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
          {/* Left */}
          <div>
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
              Right Now
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight">
              What to focus on right now
            </h2>
          </div>

          {/* Right, list */}
          <div className="space-y-5">
            {focusItems.map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sage shrink-0" />
                <p className="font-serif italic text-lg text-foreground leading-snug">
                  {item}
                </p>
              </div>
            ))}

            <p className="font-sans text-sm font-light text-sage pt-4">
              One week at a time is enough.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FocusRightNow;
