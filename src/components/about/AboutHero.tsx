const AboutHero = () => {
  const stats = [
    { num: "7", label: "journey stages", sub: "trying to conceive through to family life" },
    { num: "50+", label: "structured guides", sub: "practical and emotional together" },
    { num: "1", label: "connected system", sub: "not scattered content" },
    { num: "1", label: "guided journal", sub: "for the moments worth keeping" },
  ];

  return (
    <section className="relative bg-parchment pt-28 pb-14 md:pt-36 md:pb-20 overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[500px] h-[400px] rounded-full bg-sage/5 blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-6 md:px-10 max-w-4xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-14 items-start">
          <div className="md:col-span-3 animate-fade-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-border" />
              <p className="stage-label">Our story</p>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-[3.5rem] text-foreground leading-[1.08] mb-5">
              Most guidance during this<br />
              journey is <span className="italic font-normal">noise</span>
            </h1>

            <p className="font-sans text-base md:text-lg font-light text-muted-foreground leading-relaxed max-w-lg mb-8">
              The Start of You was built to make the journey into parenthood feel clearer, calmer and easier to navigate. Across each stage, it brings together guidance, tools, reflection and support in one connected place.
            </p>

            <p className="font-serif text-sm italic text-foreground/70">
              Not more information. Better support, in the moments you actually need it.
            </p>
          </div>

          <div className="md:col-span-2 animate-fade-up [animation-delay:0.1s]">
            <div className="rounded-2xl border border-border/30 shadow-card-brand p-6 md:p-7 space-y-5 bg-gradient-to-br from-white via-[#FBF8F1] to-[#F4EFE4]">
              <p className="font-sans text-[10px] font-light tracking-[0.2em] uppercase text-muted-foreground">What we built</p>
              {stats.map((s) => (
                <div key={s.label + s.sub} className="flex items-start gap-3">
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
