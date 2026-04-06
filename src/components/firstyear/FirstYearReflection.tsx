import { PenLine } from "lucide-react";

const FirstYearReflection = () => {
  return (
    <section className="bg-parchment py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-10 max-w-5xl">
        <div
          className="rounded-2xl overflow-hidden border border-border/30 grid grid-cols-1 md:grid-cols-2"
          style={{ backgroundColor: 'hsl(var(--stage-firstyear) / 0.06)' }}
        >
          {/* Left — editorial */}
          <div className="p-8 sm:p-10 flex flex-col justify-center">
            <p
              className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
              style={{ color: 'hsl(var(--stage-firstyear-accent))' }}
            >
              Take a moment
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-4 leading-snug">
              What has felt most noticeable in this stage?
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-5">
              Change, growth, challenge, or something else entirely. There's no right answer.
            </p>

            {/* Prompt chips */}
            <div className="flex flex-wrap gap-2 mb-6">
              {["Growth", "Change", "Exhaustion", "Wonder"].map((chip) => (
                <span
                  key={chip}
                  className="font-sans text-[11px] font-light px-3 py-1.5 rounded-full border"
                  style={{
                    borderColor: 'hsl(var(--stage-firstyear-accent) / 0.15)',
                    color: 'hsl(var(--stage-firstyear-accent))',
                  }}
                >
                  {chip}
                </span>
              ))}
            </div>

            <div
              className="pl-5 border-l-2"
              style={{ borderColor: 'hsl(var(--stage-firstyear-accent) / 0.25)' }}
            >
              <p className="font-serif italic text-sm text-foreground/55 leading-relaxed">
                Writing things down can help capture what this year really felt like.
              </p>
            </div>
          </div>

          {/* Right — input */}
          <div
            className="p-8 sm:p-10 flex flex-col justify-center"
            style={{ backgroundColor: 'hsl(var(--stage-firstyear) / 0.12)' }}
          >
            <textarea
              rows={5}
              placeholder="Write your thoughts here…"
              className="w-full bg-background border border-border rounded-lg px-5 py-4 font-sans text-sm font-light text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none focus:ring-1 transition-all leading-relaxed"
              style={{ '--tw-ring-color': 'hsl(var(--stage-firstyear-accent) / 0.3)' } as React.CSSProperties}
            />
            <button
              className="mt-4 flex items-center gap-2 border rounded-pill px-6 py-3 font-sans text-sm font-light transition-all hover:bg-background/60"
              style={{ borderColor: 'hsl(var(--stage-firstyear-accent) / 0.3)', color: 'hsl(var(--stage-firstyear-accent))' }}
            >
              <PenLine size={14} />
              Capture this thought
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FirstYearReflection;
