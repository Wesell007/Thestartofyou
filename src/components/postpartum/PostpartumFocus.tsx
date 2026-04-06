const focusItems = [
  { text: "Prioritising recovery alongside caring for your baby", emphasis: true },
  { text: "Taking each day as it comes", emphasis: false },
  { text: "Letting routines develop gradually", emphasis: false },
  { text: "Keeping expectations realistic", emphasis: false },
  { text: "Accepting support where possible", emphasis: false },
];

const PostpartumFocus = () => {
  return (
    <section
      className="py-16 md:py-24"
      style={{ backgroundColor: 'hsl(var(--stage-postpartum) / 0.1)' }}
    >
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-14 items-start">
          {/* Left — editorial context */}
          <div className="md:col-span-2">
            <p
              className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
              style={{ color: 'hsl(var(--stage-postpartum-accent))' }}
            >
              Right Now
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground leading-tight mb-4">
              What to focus on right now
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-6">
              Recovery takes time. Start with what matters most today, and let the rest wait.
            </p>

            {/* Stat anchors */}
            <div className="flex items-center gap-5 mb-6">
              <div
                className="flex flex-col items-center rounded-xl px-5 py-3"
                style={{ backgroundColor: 'hsl(var(--stage-postpartum) / 0.25)' }}
              >
                <span className="font-serif text-2xl text-foreground">1</span>
                <span className="font-sans text-[10px] font-light text-muted-foreground/60 uppercase tracking-wide">day at a time</span>
              </div>
              <div
                className="flex flex-col items-center rounded-xl px-5 py-3"
                style={{ backgroundColor: 'hsl(var(--stage-postpartum) / 0.25)' }}
              >
                <span className="font-serif text-2xl text-foreground">5</span>
                <span className="font-sans text-[10px] font-light text-muted-foreground/60 uppercase tracking-wide">priorities</span>
              </div>
            </div>

            {/* Pull quote */}
            <div
              className="pl-5 border-l-2"
              style={{ borderColor: 'hsl(var(--stage-postpartum-accent) / 0.3)' }}
            >
              <p className="font-serif italic text-base text-foreground/65 leading-relaxed">
                "You don't need to do everything. You just need to be here."
              </p>
            </div>
          </div>

          {/* Right — focus list */}
          <div className="md:col-span-3">
            <div
              className="rounded-2xl p-6 sm:p-8 border border-border/30"
              style={{ backgroundColor: 'hsl(var(--stage-postpartum) / 0.2)' }}
            >
              <div className="space-y-4">
                {focusItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div
                      className="mt-2.5 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{
                        backgroundColor: item.emphasis
                          ? 'hsl(var(--stage-postpartum-accent) / 0.7)'
                          : 'hsl(var(--stage-postpartum-accent) / 0.35)',
                      }}
                    />
                    <p
                      className={`font-serif text-base sm:text-lg leading-snug ${
                        item.emphasis ? 'text-foreground' : 'italic text-foreground/75'
                      }`}
                    >
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <div
                className="mt-6 pt-5 border-t"
                style={{ borderColor: 'hsl(var(--stage-postpartum-accent) / 0.1)' }}
              >
                <p
                  className="font-sans text-xs font-light italic"
                  style={{ color: 'hsl(var(--stage-postpartum-accent) / 0.8)' }}
                >
                  "One day at a time is enough."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostpartumFocus;
