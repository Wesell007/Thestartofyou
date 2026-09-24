const FamilySupportNote = () => {
  return (
    <section
      className="relative py-14 md:py-16"
      style={{
        background:
          "linear-gradient(to bottom, hsl(var(--parchment)) 0%, hsl(var(--stage-family) / 0.5) 50%, hsl(var(--parchment)) 100%)",
      }}
    >
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-2xl text-center">
        <div
          className="relative border-y bg-parchment/70 px-6 py-9 md:px-10 md:py-10 overflow-hidden"
          style={{ borderColor: "hsl(var(--stage-family-accent) / 0.22)" }}
        >
          <span
            className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 h-40 w-72 rounded-full blur-3xl opacity-70"
            style={{ background: "hsl(var(--stage-family-soft) / 0.7)" }}
            aria-hidden
          />
          <span
            className="relative mx-auto block h-px w-10 mb-6"
            style={{ backgroundColor: "hsl(var(--stage-family-accent) / 0.5)" }}
          />
          <p
            className="relative font-sans text-[11px] font-light tracking-[0.34em] uppercase mb-5"
            style={{ color: "hsl(var(--stage-family-accent))" }}
          >
            A quiet note
          </p>
          <p
            className="relative font-serif italic text-[1.35rem] md:text-[1.6rem] leading-[1.5]"
            style={{ color: "hsl(var(--stage-family-deep))" }}
          >
            Family life can be full, funny, messy and tender all at once. You
            do not have to hold every piece perfectly to be building something good.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FamilySupportNote;
