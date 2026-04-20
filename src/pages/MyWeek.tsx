import { useMemo } from "react";
import { getWeekData, MAX_PREGNANCY_WEEK } from "@/data/weekData";
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
  const data = useMemo(() => getWeekData(currentWeek), [currentWeek]);
  const nextWeek = currentWeek < MAX_PREGNANCY_WEEK ? currentWeek + 1 : null;
  const weeksToGo = Math.max(0, 40 - currentWeek);

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
      <main>
        <MyWeekHero
          greeting={getGreeting()}
          firstName={firstName}
          week={currentWeek}
          dueDateLabel={formatDueDate(dueDate)}
        />
        <SlotWhatMatters data={data} />
        <SlotOneFocus data={data} />
        <SlotReflection data={data} />
        <SlotWhatsNext data={data} nextWeek={nextWeek} weeksToGo={weeksToGo} />
      </main>
      <MyWeekFooter contextual={contextual} />
    </div>
  );
};

export default MyWeek;
