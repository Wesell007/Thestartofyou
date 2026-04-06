const missionValues = ["clear", "calm", "human"];

const AboutMission = () => {
  return (
    <section className="relative bg-parchment-dark py-16 md:py-24 overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[300px] rounded-full bg-sage/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[200px] rounded-full bg-lavender/5 blur-[100px] pointer-events-none" />
      <div className="container mx-auto px-6 md:px-10 max-w-2xl text-center relative z-10">
        <div className="editorial-rule mb-6" />
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-6 leading-snug">
          Why this exists
        </h2>
        <p className="font-sans text-base font-light text-muted-foreground leading-relaxed max-w-md mx-auto mb-4">
          Because this journey is not only about milestones and information. It is also about uncertainty, shifting identity, difficult decisions, and needing support that feels genuinely human.
        </p>
        <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed max-w-sm mx-auto mb-10">
          We built The Start of You because we believe everyone deserves guidance that respects the complexity of what they're going through.
        </p>

        <p className="font-sans text-xs font-light text-muted-foreground tracking-wider uppercase mb-3">
          Support should feel
        </p>
        <div className="flanking-lines mb-4">
          <div className="flex gap-6">
            {missionValues.map((v) => (
              <span key={v} className="font-serif text-xl italic text-foreground/80">
                {v}
              </span>
            ))}
          </div>
        </div>
        <p className="font-sans text-xs font-light text-muted-foreground mt-4">
          At every stage.
        </p>
      </div>
    </section>
  );
};

export default AboutMission;
