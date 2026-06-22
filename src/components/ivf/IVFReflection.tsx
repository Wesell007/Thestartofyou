const IVFReflection = () => {
  return (
    <section className="bg-parchment py-14 md:py-20">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-2xl text-center">
        <div
          className="h-px max-w-32 mx-auto mb-10"
          style={{ backgroundColor: 'hsl(var(--stage-ivf-accent) / 0.20)' }}
        />

        <p
          className="font-sans text-[11px] font-light tracking-[0.22em] uppercase mb-5"
          style={{ color: 'hsl(var(--stage-ivf-accent))' }}
        >
          A quiet moment
        </p>
        <p className="font-serif italic text-xl sm:text-2xl text-foreground/75 leading-snug mb-5">
          "There is no right way to feel during this."
        </p>
        <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed max-w-md mx-auto">
          IVF can feel fast and slow at the same time. Whatever this stage is asking of you, you are not moving through it alone.
        </p>

        <div
          className="h-px max-w-32 mx-auto mt-10"
          style={{ backgroundColor: 'hsl(var(--stage-ivf-accent) / 0.20)' }}
        />
      </div>
    </section>
  );
};

export default IVFReflection;
