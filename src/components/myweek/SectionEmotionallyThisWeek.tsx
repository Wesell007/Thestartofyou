import SectionLabel from "./SectionLabel";
import { WatercolourWash } from "./PregnancyDecor";

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
    <section className="relative pt-2 pb-9 sm:pb-11">
      <SectionLabel className="mb-5">Emotionally this week</SectionLabel>

      <div className="pregnancy-paper relative overflow-hidden rounded-[22px] px-6 sm:px-8 py-7 sm:py-8">
        <WatercolourWash tone="sage" opacity={0.3} className="!absolute" />
        <p className="relative font-serif text-[1.05rem] sm:text-[1.12rem] text-[hsl(var(--stage-pregnancy-text))] leading-[1.75] max-w-[52ch] mb-5">
          {emotionalText}
        </p>
        <p
          className="relative font-serif italic text-[14.5px] sm:text-[15px] text-foreground/58 leading-[1.65] pl-4 border-l-2"
          style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.4)" }}
        >
          {reflectionPrompt}
        </p>
      </div>
    </section>
  );
};

export default SectionEmotionallyThisWeek;
