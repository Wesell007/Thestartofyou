const accent = "hsl(var(--stage-pregnancy-accent))";

const JourneySupportIntro = () => {
  return (
    <section className="mb-12 sm:mb-14">
      <div className="flex items-center gap-3 mb-5">
        <span
          aria-hidden="true"
          className="block w-6 h-px"
          style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.6)" }}
        />
        <p
          className="font-sans text-[10.5px] font-medium tracking-[0.28em] uppercase"
          style={{ color: accent }}
        >
          Journey support
        </p>
      </div>
      <h1 className="font-serif text-[1.9rem] sm:text-[2.25rem] leading-[1.15] text-foreground/90 mb-4">
        Something to lean on, when you're ready.
      </h1>
      <p className="font-serif text-foreground/80 text-[15.5px] sm:text-[16px] leading-[1.7] max-w-[52ch]">
        These are a few pieces from The Start of You that some people find
        helpful. Nothing here is required. Open what feels useful, close what
        doesn't.
      </p>
    </section>
  );
};

export default JourneySupportIntro;
