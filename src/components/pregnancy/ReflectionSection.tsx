import { PenLine } from "lucide-react";

const ReflectionSection = () => {
  return (
    <section className="bg-parchment py-16 md:py-24">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div
          className="border rounded-2xl p-8 sm:p-10 md:p-14 shadow-card-brand text-center"
          style={{
            backgroundColor: 'hsl(var(--stage-pregnancy) / 0.15)',
            borderColor: 'hsl(var(--stage-pregnancy-accent) / 0.1)',
          }}
        >
          <p
            className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-5"
            style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}
          >
            Take a moment
          </p>
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground mb-4 leading-snug max-w-md mx-auto">
            What has felt most surprising, reassuring, or uncertain so far?
          </h2>

          <textarea
            rows={3}
            placeholder="Write your thoughts here…"
            className="w-full mt-3 bg-card border border-border/50 rounded-xl px-5 py-4 font-sans text-sm font-light text-foreground placeholder:text-muted-foreground/40 resize-none focus:outline-none focus:ring-1 focus:ring-sage focus:border-sage transition-all leading-relaxed"
          />

          <button className="mt-5 flex items-center gap-2 mx-auto border border-foreground/15 text-foreground rounded-pill px-7 py-3 font-sans text-sm font-light hover:bg-parchment-dark transition-all">
            <PenLine size={14} />
            Capture this thought
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReflectionSection;
