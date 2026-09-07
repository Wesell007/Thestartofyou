/**
 * AIC-J5 — the shared journey next-action layer.
 *
 * One component for both companion surfaces (the global panel and `/ask`), so
 * the same saved journey produces the same actions, in the same order, with
 * the same labels. It renders under the latest completed answer only.
 *
 * It is navigation and nothing else: no request, no mutation, no persistence,
 * no analytics, no safety judgement and no medical claim.
 */

import { Link } from "react-router-dom";
import type { JourneyNextAction } from "@/lib/companion/journeyNextActions";

interface CompanionNextActionsProps {
  actions: readonly JourneyNextAction[];
  /** Distinguishes the two surfaces for assistive technology only. */
  surface?: "companion" | "ask";
}

export function CompanionNextActions({ actions, surface = "companion" }: CompanionNextActionsProps) {
  if (actions.length === 0) return null;

  return (
    <nav
      aria-label="Next steps in your journey"
      data-testid={`companion-next-actions-${surface}`}
      className="mt-4 border-t border-border/60 pt-3"
    >
      <p className="mb-2 font-sans text-xs uppercase tracking-wide text-muted-foreground">
        Next steps
      </p>
      <ul className="flex flex-wrap gap-2">
        {actions.map((action) => (
          <li key={action.id}>
            <Link
              to={action.to}
              data-action-id={action.id}
              className="inline-flex min-h-[44px] items-center rounded-full border border-border bg-background px-4 font-sans text-sm text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {action.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default CompanionNextActions;
