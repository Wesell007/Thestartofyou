import type { MyWeekEntry } from "@/data/myWeekContent";

interface Props {
  content: MyWeekEntry;
}

const SlotOneFocus = ({ content }: Props) => {
  return (
    <section className="py-14 sm:py-18 md:py-24 border-t border-border/30">
      <p
        className="font-sans text-[11px] font-light tracking-[0.22em] uppercase mb-7 sm:mb-8"
        style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
      >
        One focus
      </p>

      <h2 className="font-serif text-[1.7rem] sm:text-[2rem] md:text-[2.25rem] text-foreground leading-[1.18] mb-6 sm:mb-7 max-w-[22ch]">
        {content.focus.headline}
      </h2>

      <p className="font-sans text-[15.5px] sm:text-[16px] font-light text-foreground/70 leading-[1.7] max-w-[52ch]">
        {content.focus.body}
      </p>
    </section>
  );
};

export default SlotOneFocus;
