import { useParams, Navigate } from "react-router-dom";
import { getWeekData, getAdjacentWeeks } from "@/data/weekData";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WeekHero from "@/components/week/WeekHero";
import WeekAtAGlance from "@/components/week/WeekAtAGlance";
import WeekWhat from "@/components/week/WeekWhat";
import WeekSymptoms from "@/components/week/WeekSymptoms";
import WeekHumanTruth from "@/components/week/WeekHumanTruth";
import WeekWhatThisMeans from "@/components/week/WeekWhatThisMeans";
import WeekNormal from "@/components/week/WeekNormal";
import WeekFocus from "@/components/week/WeekFocus";
import WeekNormalRightNow from "@/components/week/WeekNormalRightNow";
import WeekGentleReminder from "@/components/week/WeekGentleReminder";
import WeekReflection from "@/components/week/WeekReflection";
import WeekTimeline from "@/components/week/WeekTimeline";
import WeekAISupport from "@/components/week/WeekAISupport";
import WeekCapture from "@/components/week/WeekCapture";
import WeekRelatedGuidance from "@/components/week/WeekRelatedGuidance";
import WeekContinue from "@/components/week/WeekContinue";

const WeekPage = () => {
  const { week } = useParams<{ week: string }>();
  const weekNum = parseInt(week ?? "0", 10);

  if (isNaN(weekNum) || weekNum < 1 || weekNum > 40) {
    return <Navigate to="/pregnancy" replace />;
  }

  const data = getWeekData(weekNum);
  const { prev, next } = getAdjacentWeeks(weekNum);

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />
      <WeekHero data={data} prevWeek={prev} nextWeek={next} />
      <WeekAtAGlance data={data} />
      <WeekWhat data={data} />
      <WeekSymptoms data={data} />
      <WeekHumanTruth data={data} />
      <WeekWhatThisMeans data={data} />
      <WeekNormal data={data} />
      <WeekFocus data={data} />
      <WeekNormalRightNow data={data} />
      <WeekGentleReminder data={data} />
      <WeekReflection data={data} />
      <WeekTimeline data={data} />
      <WeekAISupport data={data} />
      <WeekCapture data={data} />
      <WeekRelatedGuidance data={data} />
      <WeekContinue data={data} prevWeek={prev} nextWeek={next} />
      <Footer />
    </div>
  );
};

export default WeekPage;
