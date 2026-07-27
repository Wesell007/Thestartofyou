import SlotPhotoMemory from "@/components/myweek/SlotPhotoMemory";
import SlotVideoMemory from "@/components/myweek/SlotVideoMemory";

interface Props {
  userId: string;
  week: number;
  chapterTitle: string;
}

/**
 * SectionKeepThisWeek — groups the existing photo memory slot and the new
 * video memory slot under one calm header. Only mounted on active pregnancy
 * weeks. Photo memory internals are untouched.
 */
const SectionKeepThisWeek = ({ userId, week, chapterTitle }: Props) => (
  <section className="relative pt-14 pb-2">
    <div className="flex items-center gap-3 mb-3">
      <span
        aria-hidden="true"
        className="block w-6 h-px"
        style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.6)" }}
      />
      <p
        className="font-sans text-[10.5px] font-light tracking-[0.28em] uppercase"
        style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
      >
        Keep this week
      </p>
    </div>
    <h2 className="font-serif text-[1.55rem] sm:text-[1.75rem] text-foreground leading-[1.15] mb-2 max-w-[26ch]">
      A little to hold onto.
    </h2>
    <p className="font-sans text-[13.5px] font-normal text-foreground/70 mb-4 max-w-[46ch] leading-[1.6]">
      A photo, and if you want, a short video. Both stay private to you.
    </p>

    <SlotPhotoMemory userId={userId} week={week} chapterTitle={chapterTitle} />
    <SlotVideoMemory userId={userId} week={week} />
  </section>
);

export default SectionKeepThisWeek;
