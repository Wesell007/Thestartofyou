import { ArrowUpRight } from "lucide-react";

const quotes = [
  '"I didn\'t know it was okay to feel this way."',
  '"I just needed someone to say it\'s normal."',
  '"Writing it down helped me understand."',
];

const SupportCapture = () => {
  return (
    <section className="bg-parchment py-16 md:py-22">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <div className="flex items-start gap-8 md:gap-12 flex-col md:flex-row">
          <div className="md:w-2/5 flex-shrink-0">
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-3">
              Your space
            </p>
            <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-4 leading-tight">
              Capture what this feels like
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-5">
              Moments like this can be hard to process. Some people find it helpful to write things down.
            </p>
            <a
              href="/product"
              className="inline-flex items-center gap-2 border border-foreground/20 text-foreground rounded-pill px-5 py-2.5 font-sans text-xs font-light hover:bg-parchment-dark transition-all"
            >
              Explore the journal
              <ArrowUpRight size={13} />
            </a>
          </div>
          <div className="md:w-3/5 space-y-2.5">
            {quotes.map((q, i) => (
              <div key={i} className="bg-card border border-border/40 rounded-lg px-5 py-4 shadow-card-brand flex items-start gap-3">
                <span className="font-serif text-sm text-[hsl(var(--stage-support-accent))] mt-0.5 flex-shrink-0">❝</span>
                <p className="font-serif italic text-sm text-foreground/65 leading-relaxed">{q}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportCapture;
