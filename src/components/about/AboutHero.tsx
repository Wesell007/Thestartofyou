const AboutHero = () => {
  return (
    <section className="relative bg-parchment pt-28 pb-14 md:pt-36 md:pb-20 overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[500px] h-[400px] rounded-full bg-sage/5 blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-6 md:px-10 max-w-4xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-14 items-start">
          {/* Left: headline */}
          <div className="md:col-span-3 animate-fade-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-border" />
              <p className="stage-label">About</p>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-[3.5rem] text-foreground leading-[1.08] mb-5">
              Most guidance during this<br />
              journey is <span className="italic font-normal">noise</span>
            </h1>

            <p className="font-sans text-base md:text-lg font-light text-muted-foreground leading-relaxed max-w-lg mb-8">
              Hundreds of apps, articles, and opinions. But very little that meets you where you are, reduces the overwhelm, and actually helps. That is the problem we set out to solve.
            </p>

            <p className="font-serif text-sm italic text-foreground/70">
              The Start of You is a guided support system for the journey to parenthood.
            </p>
          </div>

          {/* Right: proof anchors */}
          <div className="md:col-span-2 animate-fade-up [animation-delay:0.1s]">
            <div className="card-elevated p-6 md:p-7 space-y-5">
              <p className="font-sans text-[10px] font-light tracking-[0.2em] uppercase text-muted-foreground">What we built</p>
              {[
                { num: "7", label: "journey stages", sub: "from trying to conceive to first year" },
                { num: "50+", label: "structured guides", sub: "practical and emotional" },
                { num: "1", label: "connected system", sub: "not scattered content" },
              ].map((s) => (
                <div key={s.label} className="flex items-start gap-3">
                  <span className="font-serif text-2xl text-sage leading-none mt-0.5">{s.num}</span>
                  <div>
                    <span className="font-sans text-sm text-foreground">{s.label}</span>
                    <p className="font-sans text-xs font-light text-muted-foreground">{s.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
