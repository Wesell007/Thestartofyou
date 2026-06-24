/**
 * Intentional bridging beat between hero and the rest of the hub.
 * One short serif heading, one calm paragraph — no second paired-intro.
 */
const FYWhatThisCovers = () => {
  return (
    <section className="bg-parchment py-14 md:py-20">
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-2xl">
        <span className="block h-px w-10 bg-foreground/25 mb-5" />
        <h2 className="font-serif text-2xl md:text-[1.75rem] text-foreground mb-5">
          What you'll find here
        </h2>
        <p className="font-sans text-base md:text-[17px] font-light text-muted-foreground leading-[1.75]">
          Month-by-month guidance for your baby, from feeding and sleep to development and care. Alongside it, equal space for your postpartum recovery — healing, hormones, mood and the check-ups that matter.
        </p>
      </div>
    </section>
  );
};

export default FYWhatThisCovers;
