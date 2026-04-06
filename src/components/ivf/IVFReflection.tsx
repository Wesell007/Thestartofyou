import { PenLine } from "lucide-react";

const IVFReflection = () => {
  return (
    <section className="bg-parchment py-14 md:py-20">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div
          className="rounded-2xl border overflow-hidden shadow-card-brand"
          style={{
            backgroundColor: 'hsl(var(--stage-ivf) / 0.06)',
            borderColor: 'hsl(var(--stage-ivf-accent) / 0.1)',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr]">
            {/* Left panel */}
            <div
              className="p-7 sm:p-8 flex flex-col justify-center"
              style={{ backgroundColor: 'hsl(var(--stage-ivf) / 0.1)' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-6" style={{ backgroundColor: 'hsl(var(--stage-ivf-accent) / 0.3)' }} />
                <span className="font-sans text-[11px] font-light tracking-[0.2em] uppercase" style={{ color: 'hsl(var(--stage-ivf-accent))' }}>
                  Take a Moment
                </span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl text-foreground leading-snug mb-3">
                A moment to pause and reflect
              </h2>
              <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-5">
                IVF can feel fast and slow at the same time. Checking in with yourself is always worthwhile.
              </p>
              <div
                className="pl-4 border-l-2"
                style={{ borderColor: 'hsl(var(--stage-ivf-accent) / 0.25)' }}
              >
                <p className="font-serif italic text-sm text-foreground/45 leading-relaxed">
                  "There is no right way to feel during this."
                </p>
              </div>
            </div>

            {/* Right panel — reflection card */}
            <div className="p-7 sm:p-8">
              <p className="font-serif text-lg text-foreground mb-1.5 leading-snug">
                What has felt most present for you during this stage?
              </p>
              <p className="font-sans text-xs font-light text-muted-foreground/50 mb-4">
                Hope, waiting, uncertainty, or something else entirely.
              </p>

              <textarea
                rows={3}
                placeholder="Write your thoughts here…"
                className="w-full bg-card border border-border/40 rounded-xl px-4 py-3.5 font-sans text-sm font-light text-foreground placeholder:text-muted-foreground/35 resize-none focus:outline-none focus:ring-1 focus:ring-sage focus:border-sage transition-all leading-relaxed"
              />

              <button
                className="mt-4 flex items-center gap-2 border rounded-pill px-6 py-2.5 font-sans text-sm font-light transition-all hover:bg-parchment-dark"
                style={{ borderColor: 'hsl(var(--stage-ivf-accent) / 0.2)' }}
              >
                <PenLine size={13} />
                Capture this thought
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IVFReflection;
