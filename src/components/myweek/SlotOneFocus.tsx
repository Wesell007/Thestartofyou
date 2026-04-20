import type { MyWeekEntry } from "@/data/myWeekContent";

interface Props {
  content: MyWeekEntry;
}

const SlotOneFocus = ({ content }: Props) => {
  return (
    <section className="relative py-16 sm:py-20 md:py-26 border-t border-border/30">
      {/* Quiet stage-coded wash, anchoring the focus moment */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[-32px] sm:inset-x-[-64px] inset-y-0 -z-10"
        style={{
          background:
            "radial-gradient(110% 70% at 50% 30%, hsl(var(--stage-pregnancy) / 0.18), transparent 70%)",
        }}
      />

      <div className="flex items-center gap-3 mb-7 sm:mb-8">
        <span
          aria-hidden="true"
          className="block w-6 h-px"
          style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.55)" }}
        />
        <p
          className="font-sans text-[10.5px] sm:text-[11px] font-light tracking-[0.24em] uppercase"
          style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
        >
          One focus this week
        </p>
      </div>

      <h2 className="font-serif text-[1.7rem] sm:text-[2rem] md:text-[2.25rem] text-foreground leading-[1.18] mb-7 sm:mb-8 max-w-[22ch]">
        {content.focus.headline}
      </h2>

      <div className="relative pl-5 sm:pl-6">
        <span
          aria-hidden="true"
          className="absolute left-0 top-1 bottom-1 w-[2px] rounded-full"
          style={{
            background:
              "linear-gradient(to bottom, hsl(var(--stage-pregnancy-accent) / 0.55), hsl(var(--stage-pregnancy-accent) / 0.05))",
          }}
        />
        <p className="font-sans text-[15.5px] sm:text-[16.5px] font-light text-foreground/72 leading-[1.75] max-w-[52ch]">
          {content.focus.body}
        </p>
      </div>
    </section>
  );
};

export default SlotOneFocus;
