import { lazy, type ComponentType, type LazyExoticComponent } from "react";
import { Navigate, useParams } from "react-router-dom";

/**
 * Single route entry for /pregnancy/week/:week.
 *
 * Each week's editorial page (Week1Page … Week42Page) remains its own module
 * and its own lazy chunk — this resolver simply replaces the 42 individual
 * lazy imports and route registrations that previously lived in App.tsx.
 * Adding a Week43Page.tsx would register it automatically.
 */
const weekModules = import.meta.glob<{ default: ComponentType }>("./Week*Page.tsx");

const weekComponents = new Map<number, LazyExoticComponent<ComponentType>>();
for (const [path, loader] of Object.entries(weekModules)) {
  const match = path.match(/Week(\d+)Page\.tsx$/);
  if (match) weekComponents.set(Number(match[1]), lazy(loader));
}

const PregnancyWeekRoute = () => {
  const { week } = useParams<{ week: string }>();
  const num = Number(week);
  // Require the canonical form ("7", not "07") so non-canonical URLs redirect
  // instead of rendering duplicate content.
  const WeekComponent =
    week && String(num) === week ? weekComponents.get(num) : undefined;

  if (!WeekComponent) return <Navigate to="/pregnancy" replace />;
  return <WeekComponent />;
};

export default PregnancyWeekRoute;
