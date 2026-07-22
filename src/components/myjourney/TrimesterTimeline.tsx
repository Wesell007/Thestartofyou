import { ReactNode } from "react";
import JourneyGroup from "./JourneyGroup";

interface WeekGroup {
  title: string;
  framing: string;
  min: number;
  max: number;
}

const GROUPS: WeekGroup[] = [
  { title: "Beginning", framing: "Where the story quietly began.", min: 1, max: 4 },
  { title: "First trimester", framing: "The earliest weeks, mostly held in private.", min: 5, max: 13 },
  { title: "Second trimester", framing: "Steadier weeks, finding rhythm.", min: 14, max: 27 },
  { title: "Third trimester", framing: "The final stretch, drawing near.", min: 28, max: 42 },
];

interface Props {
  keptWeeks: number[];
  renderRow: (week: number) => ReactNode;
}

const TrimesterTimeline = ({ keptWeeks, renderRow }: Props) => {
  const filled = GROUPS.map((g) => ({
    ...g,
    weeks: keptWeeks.filter((w) => w >= g.min && w <= g.max),
  })).filter((g) => g.weeks.length > 0);

  if (filled.length === 0) return null;

  return (
    <div>
      {filled.map((g) => (
        <JourneyGroup key={g.title} title={g.title} framing={g.framing}>
          {g.weeks.map(renderRow)}
        </JourneyGroup>
      ))}
    </div>
  );
};

export default TrimesterTimeline;
