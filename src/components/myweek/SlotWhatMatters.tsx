import type { MyWeekEntry } from "@/data/myWeekContent";

interface Props {
  content: MyWeekEntry;
}

const SlotWhatMatters = ({ content }: Props) => {
  return (
    <section className="pt-6 pb-14 sm:pt-8 sm:pb-18 md:pt-10 md:pb-24">
      <p
        className="font-sans text-[11px] font-light tracking-[0.22em] uppercase mb-6 sm:mb-7"
        style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
      >
        What matters this week
      </p>

      <p className="font-serif italic text-[1.4rem] sm:text-[1.65rem] md:text-[1.85rem] text-foreground leading-snug mb-10 sm:mb-12 max-w-[34ch]">
        {content.lead}
      </p>

      <ul className="space-y-8 sm:space-y-9">
        {content.matters.map((p, i) => (
          <li key={i} className="flex gap-5 sm:gap-6">
            <span
              aria-hidden="true"
              className="mt-[10px] shrink-0 w-[2px] h-5 rounded-full"
              style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.6)" }}
            />
            <div>
              <p className="font-sans text-[12px] sm:text-[13px] font-medium text-foreground/80 mb-2 tracking-[0.06em] uppercase">
                {p.title}
              </p>
              <p className="font-sans text-[15.5px] sm:text-[16px] font-light text-foreground/75 leading-[1.65]">
                {p.body}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SlotWhatMatters;
