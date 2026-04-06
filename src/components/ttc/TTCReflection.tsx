import { PenLine } from "lucide-react";

const TTCReflection = () => {
  return (
    <section className="bg-parchment py-20 md:py-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div
          className="relative rounded-2xl p-8 sm:p-10 md:p-14 border text-center"
          style={{
            backgroundColor: 'hsl(var(--stage-ttc) / 0.1)',
            borderColor: 'hsl(var(--stage-ttc-accent) / 0.15)',
          }}
        >
          {/* Decorative corner */}
          <div
            className="absolute top-0 right-0 w-16 h-16 rounded-bl-[2rem] hidden md:block"
            style={{ backgroundColor: 'hsl(var(--stage-ttc) / 0.15)' }}
          />

          <p
            className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-5"
            style={{ color: 'hsl(var(--stage-ttc-accent))' }}
          >
            Take a moment
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-4 leading-snug max-w-md mx-auto">
            What has felt most present for you this cycle?
          </h2>
          <p className="font-sans text-sm font-light text-muted-foreground mb-6 max-w-sm mx-auto">
            Hope, waiting, uncertainty, or something else entirely. There's no wrong answer.
          </p>

          <textarea
            rows={4}
            placeholder="Write your thoughts here…"
            className="w-full bg-card border border-border/40 rounded-xl px-5 py-4 font-sans text-sm font-light text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none focus:ring-1 focus:border-sage/50 transition-all leading-relaxed"
            style={{ focusRingColor: 'hsl(var(--stage-ttc-accent) / 0.3)' } as React.CSSProperties}
          />

          <button
            className="mt-5 flex items-center gap-2 mx-auto rounded-pill px-7 py-3.5 font-sans text-sm font-light transition-all"
            style={{
              backgroundColor: 'hsl(var(--stage-ttc) / 0.3)',
              color: 'hsl(var(--foreground))',
            }}
          >
            <PenLine size={14} />
            Capture this thought
          </button>

          <p className="mt-5 font-sans text-[10px] font-light text-muted-foreground/50">
            Your reflections are private and not shared.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TTCReflection;
