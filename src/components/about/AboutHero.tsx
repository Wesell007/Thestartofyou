const AboutHero = () => {
  return (
    <section className="relative bg-parchment pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[500px] h-[400px] rounded-full bg-sage/5 blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-6 md:px-10 max-w-3xl relative z-10">
        <div className="flex items-center justify-center gap-3 mb-8 animate-fade-up">
          <div className="h-px w-8 bg-border" />
          <p className="stage-label">About</p>
          <div className="h-px w-8 bg-border" />
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-[3.5rem] text-foreground leading-[1.08] mb-4 text-center animate-fade-up [animation-delay:0.05s]">
          The journey deserves<br />
          <span className="italic font-normal">better guidance</span>
        </h1>

        <p className="font-sans text-base md:text-lg font-light text-muted-foreground leading-relaxed max-w-xl mx-auto text-center mb-10 animate-fade-up [animation-delay:0.1s]">
          The Start of You exists because one of life's most important transitions shouldn't feel overwhelming, fragmented, or lonely.
        </p>

        {/* Stat anchors */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 animate-fade-up [animation-delay:0.15s]">
          {[
            { num: "7", label: "journey stages" },
            { num: "50+", label: "guides" },
            { num: "1", label: "connected system" },
          ].map((s) => (
            <div key={s.label} className="flex items-baseline gap-2">
              <span className="font-serif text-2xl md:text-3xl text-sage">{s.num}</span>
              <span className="font-sans text-xs font-light text-muted-foreground tracking-wide">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
