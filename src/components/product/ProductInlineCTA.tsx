import { ExternalLink, BookOpen, Star } from "lucide-react";

const ProductInlineCTA = () => {
  return (
    <section className="relative bg-card py-14 md:py-20 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] glow-sage opacity-60" />
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl relative z-10 text-center">
        <div className="flex gap-0.5 justify-center mb-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} size={13} className="text-terracotta fill-terracotta" />
          ))}
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-[2.25rem] text-foreground mb-3 leading-snug">
          A keepsake worth starting{" "}
          <span className="italic">today.</span>
        </h2>
        <p className="font-sans text-sm sm:text-base font-light text-muted-foreground leading-relaxed max-w-md mx-auto mb-7">
          The thoughts and firsts you will want to remember are already here. Begin the journal you will read back for years.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-5">
          <a
            href="https://www.amazon.co.uk/dp/B0FMJTJGQR"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-terracotta text-terracotta-foreground rounded-pill px-9 py-4 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
          >
            Get the journal on Amazon
            <ExternalLink size={14} />
          </a>
          <span className="inline-flex items-center gap-1.5 font-sans text-xs font-light text-muted-foreground">
            <BookOpen size={12} className="text-sage" />
            Hardback · A5 · 144 pages
          </span>
        </div>

        <p className="font-serif text-xs italic text-muted-foreground">
          For yourself, or for someone whose journey deserves somewhere to live.
        </p>
      </div>
    </section>
  );
};

export default ProductInlineCTA;
