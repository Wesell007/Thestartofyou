const FYWhatThisCovers = () => {
  return (
    <section className="bg-parchment py-14 md:py-20">
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-3xl">
        <p
          className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
          style={{ color: 'hsl(var(--stage-firstyear-accent))' }}
        >
          What this hub covers
        </p>
        <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-snug mb-5">
          Two parallel tracks, held in one place.
        </h2>
        <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed max-w-2xl">
          <span className="text-foreground font-normal">Baby's first year</span> covers feeding, sleep, development and care across twelve months of change. <span className="text-foreground font-normal">Your postpartum recovery</span> covers physical healing, emotional wellbeing, hormones, and the check-ups that matter. Both move at their own pace, and both belong here.
        </p>
      </div>
    </section>
  );
};

export default FYWhatThisCovers;
