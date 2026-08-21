interface Props {
  emotionalText: string;
  reflectionPrompt: string;
}

/**
 * Emotionally this week — a normalising paragraph plus a soft prompt line.
 * The actual reflection save happens further down in SlotReflection.
 */
const SectionEmotionallyThisWeek = ({ emotionalText, reflectionPrompt }: Props) => {
  return (
    <section className="relative pt-4 pb-12">
      <div className="flex items-center gap-3 mb-5">
        <span
          aria-hidden="true"
          className="block w-5 h-px"
          style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.55)" }}
        />
        <p
          className="font-sans text-[10.5px] font-medium tracking-[0.26em] uppercase"
          style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
        >
          Emotionally this week
        </p>
      </div>

      <div
        className="pregnancy-paper rounded-[22px] px-6 sm:px-8 py-7 sm:py-8"
      >
        <p className="font-serif text-[1.05rem] sm:text-[1.12rem] text-[hsl(var(--stage-pregnancy-text))] leading-[1.75] max-w-[52ch] mb-5">
          {emotionalText}
        </p>
        <p
          className="font-serif italic text-[14.5px] sm:text-[15px] text-foreground/58 leading-[1.65] pl-4 border-l-2"
          style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.4)" }}
        >
          {reflectionPrompt}
        </p>
      </div>
    </section>
  );
};

export default SectionEmotionallyThisWeek;
