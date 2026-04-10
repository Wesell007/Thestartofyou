import { useParams, Navigate } from "react-router-dom";
import { getWeekData, getAdjacentWeeks } from "@/data/weekData";
import StageGuidanceWeek from "@/components/guidance/templates/StageGuidanceWeek";

const WeekPage = () => {
  const { week } = useParams<{ week: string }>();
  const weekNum = parseInt(week ?? "0", 10);

  if (isNaN(weekNum) || weekNum < 1 || weekNum > 40) {
    return <Navigate to="/pregnancy" replace />;
  }

  const data = getWeekData(weekNum);
  const { prev, next } = getAdjacentWeeks(weekNum);

  return <StageGuidanceWeek data={data} prevWeek={prev} nextWeek={next} />;
};

export default WeekPage;
