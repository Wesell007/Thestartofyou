/**
 * Slim quiet beat between Common Questions and Pathways.
 * Reads as a hub pause, not a chapter break.
 */
const FYReflection = () => {
  return (
    <section className="bg-parchment py-8 md:py-10">
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-2xl">
        <div className="flex items-center gap-3">
          <span className="h-px w-10" style={{ backgroundColor: 'hsl(var(--stage-firstyear-accent) / 0.4)' }} />
          <span className="h-px w-10" style={{ backgroundColor: 'hsl(var(--stage-recovery-accent) / 0.4)' }} />
          <p className="font-serif italic text-base sm:text-lg text-foreground/70 leading-snug">
            You are not behind. You are inside it.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FYReflection;
