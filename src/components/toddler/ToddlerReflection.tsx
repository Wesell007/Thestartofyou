const ToddlerReflection = () => {
  return (
    <section
      className="py-20 md:py-24"
      style={{ backgroundColor: "hsl(var(--stage-toddler) / 0.45)" }}
    >
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-2xl text-center">
        <p
          className="font-sans text-[11px] font-light tracking-[0.3em] uppercase mb-4"
          style={{ color: "hsl(var(--stage-toddler-accent))" }}
        >
          A gentle note
        </p>
        <p
          className="font-serif italic text-xl md:text-2xl leading-[1.5]"
          style={{ color: "hsl(var(--stage-toddler-deep))" }}
        >
          The toddler years are intense, funny, exhausting and tender — sometimes
          inside a single afternoon. You're allowed to find it hard. You're also
          doing better than you think.
        </p>
      </div>
    </section>
  );
};

export default ToddlerReflection;
