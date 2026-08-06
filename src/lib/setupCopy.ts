import type { NavLifecycle } from "@/lib/navLifecycle";

/**
 * Copy and destination for the /setup profile screen.
 *
 * The screen is reachable from pregnancy, First Year and TTC surfaces, so the
 * greeting promise, the call to action and where we send someone next all have
 * to follow their lifecycle. A null lifecycle stays deliberately neutral rather
 * than assuming pregnancy.
 */
export type SetupCopy = {
  helper: string;
  cta: string;
  destination: string;
};

export const resolveSetupCopy = (lifecycle: NavLifecycle | null): SetupCopy => {
  if (lifecycle === "first_year") {
    return {
      helper: "Just your first name. We'll use it to greet you in your First Year space.",
      cta: "Continue to my First Year",
      destination: "/my-first-year",
    };
  }
  if (lifecycle === "ttc") {
    return {
      helper: "Just your first name. We'll use it to greet you in your journey.",
      cta: "Continue to my journey",
      destination: "/my-ttc-journey",
    };
  }
  if (lifecycle === "pregnancy") {
    return {
      helper: "Just your first name. We'll use it to greet you each week.",
      cta: "Continue to my week",
      destination: "/my-week",
    };
  }
  return {
    helper: "Just your first name. We'll use it to greet you.",
    cta: "Continue",
    destination: "/due-date-calculator",
  };
};
