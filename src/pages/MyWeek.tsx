import { useMemo } from "react";
import { MAX_PREGNANCY_WEEK } from "@/data/weekData";
import { getMyWeekContent } from "@/data/myWeekContent";
import MyWeekHeader from "@/components/myweek/MyWeekHeader";
import MyWeekHero from "@/components/myweek/MyWeekHero";
import SlotWhatMatters from "@/components/myweek/SlotWhatMatters";
import SlotOneFocus from "@/components/myweek/SlotOneFocus";
import SlotReflection from "@/components/myweek/SlotReflection";
import SlotWhatsNext from "@/components/myweek/SlotWhatsNext";
import MyWeekFooter from "@/components/myweek/MyWeekFooter";

// Mock saved-journey state. Replace with real auth/journey data later.
const MOCK_USER = {
  firstName: "Sarah",
  currentWeek: 18,
  dueDate: new Date(2025, 7, 14), // 14 August 2025
};

const getGreeting = (d = new Date()) => {
  const h = d.getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
};

const formatDueDate = (d: Date) =>
  d.toLocaleDateString("en-GB", { day: "numeric", month: "long" });

const MyWeek = () => {
  const { firstName, currentWeek, dueDate } = MOCK_USER;
  const content = useMemo(() => getMyWeekContent(currentWeek), [currentWeek]);
  const nextWeek = currentWeek < MAX_PREGNANCY_WEEK ? currentWeek + 1 : null;

  // Contextual support surfacing per spec
  const contextual =
    currentWeek <= 12
      ? "If something doesn't feel right, our Support hub is here."
      : currentWeek >= 37
      ? "Whatever you're feeling right now, support is here."
      : null;

  return (
    <div className="min-h-screen bg-parchment">
      <MyWeekHeader />
      {/* Centred, narrow product column. Whitespace is the frame. */}
      <main className="mx-auto w-full max-w-[640px] px-5 sm:px-8 md:px-10">
        <MyWeekHero
          greeting={getGreeting()}
          firstName={firstName}
          week={currentWeek}
          dueDateLabel={formatDueDate(dueDate)}
        />
        <SlotWhatMatters content={content} />
        <SlotOneFocus content={content} />
        <SlotReflection content={content} />
        <SlotWhatsNext content={content} nextWeek={nextWeek} />
      </main>
      <MyWeekFooter contextual={contextual} />
    </div>
  );
};

export default MyWeek;
