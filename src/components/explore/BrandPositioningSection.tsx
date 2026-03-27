const BrandPositioningSection = () => {
  return (
    <section className="bg-parchment py-28 md:py-36 border-t border-border/20">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center">
        {/* Decorative leaf */}
        <div className="flex justify-center mb-8" aria-hidden="true">
          <svg width="44" height="32" viewBox="0 0 48 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 32 Q14 10 24 12 Q34 14 44 4" stroke="hsl(var(--sage-muted))" strokeWidth="1" strokeLinecap="round" fill="none"/>
            <path d="M24 12 Q20 4 12 6 Q16 14 24 12Z" stroke="hsl(var(--sage-muted))" strokeWidth="0.8" fill="hsl(var(--sage-bg) / 0.6)" strokeLinejoin="round"/>
            <path d="M24 12 Q28 6 36 10 Q30 16 24 12Z" stroke="hsl(var(--sage-muted))" strokeWidth="0.8" fill="hsl(var(--sage-bg) / 0.6)" strokeLinejoin="round"/>
          </svg>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-7 leading-snug">
          Guidance that grows with you
        </h2>
        <p className="font-sans text-base font-light text-muted-foreground leading-relaxed max-w-xl mx-auto">
          From trying to conceive to your baby's first year, everything here is designed to support you — clearly, calmly, and without overwhelm.
        </p>
      </div>
    </section>
  );
};

export default BrandPositioningSection;
