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
    <SlotPhotoMemory userId={userId} week={week} chapterTitle={chapterTitle} />
    <SlotVideoMemory userId={userId} week={week} />
  </section>
);

export default SectionKeepThisWeek;
