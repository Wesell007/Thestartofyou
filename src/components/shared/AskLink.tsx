import type { ComponentProps } from "react";
import { Link } from "react-router-dom";
import { askDestination, askRouteState, type AskRouteOptions } from "@/lib/askNavigation";

type Props = Omit<ComponentProps<typeof Link>, "to" | "state"> &
  AskRouteOptions & {
    question: string;
  };

const AskLink = ({ question, context, stage, journey, topic, ...props }: Props) => (
  <Link
    {...props}
    to={askDestination({ stage, journey, topic })}
    state={askRouteState(question, context)}
  />
);

export default AskLink;
