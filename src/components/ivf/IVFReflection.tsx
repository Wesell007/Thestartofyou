const IVFReflection = () => {
  return (
    <section
      className="pt-14 md:pt-20 pb-10 md:pb-14"
      style={{ backgroundColor: 'hsl(var(--stage-ivf) / 0.05)' }}
    >
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-2xl text-center">
        <div
          className="h-px max-w-32 mx-auto mb-9"
          style={{ backgroundColor: 'hsl(var(--stage-ivf-accent) / 0.22)' }}
        />

        <p
          className="font-sans text-[11px] font-light tracking-[0.24em] uppercase mb-5"
          style={{ color: 'hsl(var(--stage-ivf-accent))' }}
        >
          A quiet moment
        </p>
        <p className="font-serif italic text-xl sm:text-[1.65rem] text-foreground/80 leading-snug mb-5">
          "There is no right way to feel during this."
        </p>
        <p className="font-sans text-[14px] font-light text-muted-foreground leading-relaxed max-w-md mx-auto">
          IVF can feel fast and slow at the same time. Whatever this stage is asking of you, you are not moving through it alone.
        </p>
      </div>
    </section>
  );
};

export default IVFReflection;
