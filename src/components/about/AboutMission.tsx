const missionValues = ["clear", "calm", "human"];

const AboutMission = () => {
  return (
    <section className="relative bg-card py-16 md:py-24 overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[300px] rounded-full bg-sage/5 blur-[100px] pointer-events-none" />
      <div className="container mx-auto px-6 md:px-10 max-w-4xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-14 items-start">
          <div className="md:col-span-2">
            <div className="editorial-rule mb-6" />
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-snug mb-4">
              Why this exists
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-4">
              Because this journey is not only about milestones and medical information. It is also about uncertainty, identity, decisions, memories and the quiet moments that can be easy to miss.
            </p>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
              The Start of You exists to make those moments feel easier to understand, easier to hold and easier to move through.
            </p>
          </div>

          <div className="md:col-span-3 flex flex-col justify-center">
            <p className="font-sans text-[10px] font-light tracking-[0.2em] uppercase text-muted-foreground mb-4">
              Support should feel
            </p>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 mb-6">
              {missionValues.map((v, i) => (
                <span key={v} className="flex items-baseline gap-4">
                  <span className="font-serif text-3xl md:text-4xl italic text-foreground/80">{v}</span>
                  {i < missionValues.length - 1 && (
                    <span className="font-serif text-2xl text-sage/40">·</span>
                  )}
                </span>
              ))}
            </div>
            <div className="h-px w-16 bg-sage/30 mb-6" />
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed max-w-sm">
              At every stage. In every interaction. Whether you are tracking your cycle, navigating a first trimester, adjusting to life after birth, or simply looking for reassurance at 2am.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMission;
