/**
 * Slim quiet beat between Common Questions and Pathways.
 * Reads as a hub pause, not a chapter break.
 */
const FYReflection = () => {
  return (
    <section className="bg-parchment py-10 md:py-14">
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-2xl">
        <div className="flex items-center gap-3">
          <span className="h-px w-8" style={{ backgroundColor: 'hsl(var(--stage-firstyear-accent) / 0.5)' }} />
          <span className="h-px w-8" style={{ backgroundColor: 'hsl(var(--stage-recovery-accent) / 0.5)' }} />
          <p className="font-serif italic text-[17px] sm:text-lg md:text-xl text-foreground/70 leading-snug ml-1">
            You are not behind. You are inside it.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FYReflection;
