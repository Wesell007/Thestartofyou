/**
 * Phase 29B — floating companion launcher.
 *
 * Mobile: sits above the journey bottom nav and respects the safe-area inset,
 * so it never covers the nav. While the analytics consent banner is on screen
 * the launcher stays out of the way entirely, so the two never overlap.
 * Desktop: bottom-right. Hidden on excluded routes and when the kill switch
 * is off.
 */

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { useCompanion } from "./useCompanion";
import { companionStyles } from "./companionStyles";
import { companionLauncherLabel } from "@/lib/companion/companionName";
import {
  getAnalyticsConsent,
  subscribeAnalyticsConsent,
  type ConsentState,
} from "@/lib/consent";

export default function CompanionLauncher() {
  const { visible, open, setOpen, companionName } = useCompanion();
  const [consent, setConsent] = useState<ConsentState>("unknown");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setConsent(getAnalyticsConsent());
    setMounted(true);
    return subscribeAnalyticsConsent(setConsent);
  }, []);

  if (!visible || open) return null;
  if (mounted && consent === "unknown") return null;


  const label = companionLauncherLabel(companionName);

  return (
    <div
      className="fixed right-4 z-40 md:right-6"
      style={{
        bottom:
          "calc(var(--app-bottom-nav-inset, 0px) + env(safe-area-inset-bottom) + 5.75rem)",
      }}
    >
      <button
        type="button"
        aria-label={label}
        onClick={() => setOpen(true)}
        className={companionStyles.launcher}
      >
        <Sparkles className="h-4 w-4" aria-hidden="true" />
        <span className="text-[13px] font-medium">Ask</span>
      </button>
    </div>
  );
}
