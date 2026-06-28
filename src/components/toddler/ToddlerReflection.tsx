const ToddlerReflection = () => {
  return (
    <section
      className="relative py-24 md:py-28"
      style={{
        background:
          "linear-gradient(to bottom, hsl(var(--parchment)) 0%, hsl(var(--stage-toddler) / 0.5) 50%, hsl(var(--parchment)) 100%)",
      }}
    >
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-2xl text-center">
        <div
          className="rounded-[28px] border bg-parchment/85 backdrop-blur-sm px-8 py-12 md:px-12 md:py-14 shadow-[0_24px_64px_-36px_rgba(60,40,20,0.3)]"
          style={{ borderColor: "hsl(var(--stage-toddler-accent) / 0.18)" }}
        >
          <span className="mx-auto block h-px w-10 mb-6" style={{ backgroundColor: "hsl(var(--stage-toddler-accent) / 0.5)" }} />
          <p className="font-sans text-[11px] font-light tracking-[0.34em] uppercase mb-5" style={{ color: "hsl(var(--stage-toddler-accent))" }}>
            A quiet note
          </p>
          <p className="font-serif italic text-[1.35rem] md:text-[1.6rem] leading-[1.5]" style={{ color: "hsl(var(--stage-toddler-deep))" }}>
            The toddler years are intense, funny, exhausting and tender — sometimes inside a single afternoon. You're allowed to find it hard. You're also doing better than you think.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ToddlerReflection;
