import { PenLine } from "lucide-react";

const IVFReflection = () => {
  return (
    <section className="bg-parchment py-20 md:py-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-14 items-start">
          {/* Left — editorial */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-6" style={{ backgroundColor: 'hsl(var(--stage-ivf-accent) / 0.3)' }} />
              <span className="font-sans text-[11px] font-light tracking-[0.2em] uppercase" style={{ color: 'hsl(var(--stage-ivf-accent))' }}>
                Take a Moment
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-3">
              A moment to pause and reflect
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
              IVF can feel fast and slow at the same time. Taking a moment to check in with yourself can help.
            </p>
          </div>

          {/* Right — reflection card */}
          <div className="md:col-span-3">
            <div
              className="rounded-2xl p-7 sm:p-10 border shadow-card-brand"
              style={{
                backgroundColor: 'hsl(var(--stage-ivf) / 0.08)',
                borderColor: 'hsl(var(--stage-ivf-accent) / 0.12)',
              }}
            >
              <p className="font-serif text-lg sm:text-xl text-foreground mb-5 leading-snug max-w-md">
                What has felt most present for you during this stage?
              </p>
              <p className="font-sans text-xs font-light text-muted-foreground/60 mb-4">
                Hope, waiting, uncertainty, or something else entirely.
              </p>

              <textarea
                rows={4}
                placeholder="Write your thoughts here…"
                className="w-full bg-card border border-border/50 rounded-xl px-5 py-4 font-sans text-sm font-light text-foreground placeholder:text-muted-foreground/40 resize-none focus:outline-none focus:ring-1 focus:ring-sage focus:border-sage transition-all leading-relaxed"
              />

              <button className="mt-5 flex items-center gap-2 border rounded-pill px-7 py-3 font-sans text-sm font-light transition-all hover:bg-parchment-dark"
                style={{ borderColor: 'hsl(var(--stage-ivf-accent) / 0.2)', color: 'hsl(var(--foreground))' }}
              >
                <PenLine size={14} />
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
