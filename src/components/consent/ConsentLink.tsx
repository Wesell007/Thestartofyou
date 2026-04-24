import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  getAnalyticsConsent,
  resetAnalyticsConsent,
  subscribeAnalyticsConsent,
  type ConsentState,
} from "@/lib/consent";

/**
 * Quiet footer affordance: lets users change their analytics decision.
 * Re-opens the consent banner by resetting state to "unknown".
 */
const ConsentLink = () => {
  const [state, setState] = useState<ConsentState>("unknown");

  useEffect(() => {
    setState(getAnalyticsConsent());
    return subscribeAnalyticsConsent(setState);
  }, []);

  const label =
    state === "accepted"
      ? "Manage analytics (accepted)"
      : state === "rejected"
      ? "Manage analytics (rejected)"
      : "Manage analytics";

  const handleClick = () => {
    resetAnalyticsConsent();
    toast("Analytics preference reset. Please choose again.");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="font-sans text-[11px] sm:text-xs font-light text-foreground/40 hover:text-foreground/70 transition-colors duration-200 underline-offset-2 hover:underline"
    >
      {label}
    </button>
  );
};

export default ConsentLink;
