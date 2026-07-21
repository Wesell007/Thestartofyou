import { askDestination, askRouteState } from "@/lib/askNavigation";

export const weekReflectionDraftKey = (week: number) => `tsoy:public-week-${week}:reflection-draft`;

export const buildWeekQuestionNavigation = (week: number, question: string) => ({
  to: askDestination({ stage: "pregnancy" }),
  state: askRouteState(question, `Pregnancy week ${week}`),
});
