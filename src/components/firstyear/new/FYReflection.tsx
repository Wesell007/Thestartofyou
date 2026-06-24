const FYReflection = () => {
  return (
    <section className="bg-parchment py-14 md:py-20">
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-2xl text-center">
        <div className="flex items-center justify-center gap-2 mb-5">
          <span className="w-8 h-px" style={{ backgroundColor: 'hsl(var(--stage-firstyear-accent) / 0.4)' }} />
          <span className="w-8 h-px" style={{ backgroundColor: 'hsl(var(--stage-recovery-accent) / 0.4)' }} />
        </div>
        <p className="font-serif italic text-xl sm:text-2xl text-foreground/70 leading-snug">
          You are not behind. You are inside it.
        </p>
      </div>
    </section>
  );
};

export default FYReflection;
