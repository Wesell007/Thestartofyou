/**
 * Light bridging strip — orients, does not re-introduce.
 * One short calm paragraph; no second paired-intro block.
 */
const FYWhatThisCovers = () => {
  return (
    <section className="bg-parchment py-8 md:py-10">
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-3xl">
        <p className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-3 text-foreground/55">
          What you'll find here
        </p>
        <p className="font-sans text-[15px] md:text-[15.5px] font-light text-muted-foreground leading-relaxed">
          Month-by-month guidance for your baby, from feeding and sleep to development and care. Alongside it, equal space for your recovery, including healing, hormones, mood and the check-ups that matter.
        </p>
      </div>
    </section>
  );
};

export default FYWhatThisCovers;
