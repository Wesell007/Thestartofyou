import { PenLine } from "lucide-react";

const TTCReflection = () => {
  return (
    <section className="bg-parchment py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <div className="bg-card border border-border/50 rounded-lg p-10 md:p-14 shadow-card-brand text-center">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-6">
            Take a moment
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-5 leading-snug max-w-md mx-auto">
            What has felt most present for you this cycle, hope, waiting, uncertainty, or something else?
          </h2>

          <textarea
            rows={4}
            placeholder="Write your thoughts here…"
            className="w-full mt-4 bg-background border border-border rounded-md px-5 py-4 font-sans text-sm font-light text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none focus:ring-1 focus:ring-sage focus:border-sage transition-all leading-relaxed"
          />

          <button className="mt-6 flex items-center gap-2 mx-auto border border-foreground/20 text-foreground rounded-pill px-7 py-3.5 font-sans text-sm font-light hover:bg-parchment-dark transition-all">
            <PenLine size={14} />
            Capture this thought
          </button>
        </div>
      </div>
    </section>
  );
};

export default TTCReflection;
