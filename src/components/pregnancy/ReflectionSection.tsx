import { PenLine } from "lucide-react";

const ReflectionSection = () => {
  return (
    <section className="bg-parchment py-16 md:py-24">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div
          className="relative border rounded-2xl p-7 sm:p-10 md:p-12 shadow-card-brand overflow-hidden"
          style={{
            backgroundColor: 'hsl(var(--stage-pregnancy) / 0.12)',
            borderColor: 'hsl(var(--stage-pregnancy-accent) / 0.08)',
          }}
        >
          {/* Corner accent */}
          <div
            className="absolute top-0 right-0 w-24 h-24 rounded-bl-[4rem] opacity-40"
            style={{ backgroundColor: 'hsl(var(--stage-pregnancy) / 0.3)' }}
          />

          <div className="relative z-10 text-center">
            <p
              className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
              style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}
            >
              Take a moment
            </p>
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground mb-2 leading-snug max-w-md mx-auto">
              What has felt most surprising, reassuring, or uncertain so far?
            </h2>
            <p className="font-sans text-xs font-light text-muted-foreground/60 mb-5">
              Your reflections are private and stay with you.
            </p>

            <textarea
              rows={3}
              placeholder="Write your thoughts here…"
              className="w-full bg-card border border-border/40 rounded-xl px-5 py-4 font-sans text-sm font-light text-foreground placeholder:text-muted-foreground/35 resize-none focus:outline-none focus:ring-1 focus:ring-sage focus:border-sage transition-all leading-relaxed"
            />

            <button
              className="mt-5 inline-flex items-center gap-2 border rounded-pill px-7 py-3 font-sans text-sm font-light transition-all hover:shadow-card-brand"
              style={{
                borderColor: 'hsl(var(--stage-pregnancy-accent) / 0.2)',
                color: 'hsl(var(--foreground))',
              }}
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

export default ReflectionSection;
