import { PenLine } from "lucide-react";

const SupportReflection = () => {
  return (
    <section className="bg-parchment py-14 sm:py-20 md:py-36">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="bg-card border border-border/50 rounded-xl sm:rounded-lg p-7 sm:p-10 md:p-14 shadow-card-brand text-center">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5 md:mb-6">
            Take a moment
          </p>
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground mb-4 md:mb-5 leading-snug max-w-md mx-auto">
            What feels most unclear or difficult right now?
          </h2>

          <textarea
            rows={4}
            placeholder="Write your thoughts here…"
            className="w-full mt-4 bg-background border border-border rounded-md px-4 sm:px-5 py-3.5 sm:py-4 font-sans text-sm font-light text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none focus:ring-1 focus:ring-sage focus:border-sage transition-all leading-relaxed"
          />

          <button className="mt-5 sm:mt-6 flex items-center gap-2 mx-auto border border-foreground/20 text-foreground rounded-pill px-6 sm:px-7 py-3 sm:py-3.5 font-sans text-sm font-light hover:bg-parchment-dark transition-all">
            <PenLine size={14} />
            Capture this thought
          </button>
        </div>
      </div>
    </section>
  );
};

export default SupportReflection;
