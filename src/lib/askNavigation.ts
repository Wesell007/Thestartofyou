import type { NavigateFunction, To } from "react-router-dom";

export interface AskRouteOptions {
  stage?: string;
  journey?: string;
  topic?: string;
  context?: string;
}

export interface AskRouteState {
  question: string;
  context?: string;
}

export const askDestination = ({ stage, journey, topic }: AskRouteOptions = {}): To => {
  const params = new URLSearchParams();
  if (stage) params.set("stage", stage);
  if (journey) params.set("journey", journey);
  if (topic) params.set("topic", topic);
  const search = params.toString();
  return { pathname: "/ask", search: search ? `?${search}` : "" };
};

export const askRouteState = (question: string, context?: string): AskRouteState => ({
  question: question.trim(),
  context,
});

export const navigateToAsk = (
  navigate: NavigateFunction,
  question: string,
  options: AskRouteOptions = {},
) => {
  const trimmed = question.trim();
  if (!trimmed) return;
  navigate(askDestination(options), {
    state: askRouteState(trimmed, options.context),
  });
};
