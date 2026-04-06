import { ArrowUpRight } from "lucide-react";

const quotes = [
  '"I didn\'t know it was okay to feel this way."',
  '"I just needed someone to say it\'s normal."',
  '"Writing it down helped me understand."',
];

const SupportCapture = () => {
  return (
    <section className="bg-parchment py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-start">
          <div className="md:col-span-2">
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-4">
              Your space
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-5 leading-tight">
              Capture what this feels like
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-6">
              Moments like this can be hard to process. Some people find it helpful to write things down as they go.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 border border-foreground/20 text-foreground rounded-pill px-6 py-3 font-sans text-sm font-light hover:bg-parchment-dark transition-all"
            >
              Explore the journal
              <ArrowUpRight size={14} />
            </a>
          </div>
          <div className="md:col-span-3 space-y-3">
            {quotes.map((q, i) => (
              <div key={i} className="bg-card border border-border/40 rounded-lg p-5 shadow-card-brand">
                <p className="font-serif italic text-sm text-foreground/70 leading-relaxed">{q}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportCapture;
