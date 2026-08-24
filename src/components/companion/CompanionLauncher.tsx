/**
 * Phase 29B — floating companion launcher.
 *
 * Mobile: sits above the journey bottom nav and respects the safe-area inset,
 * so it never covers the nav or the consent banner. Desktop: bottom-right.
 * Hidden on excluded routes and when the kill switch is off.
 */

import { Sparkles } from "lucide-react";
import { useCompanion } from "./CompanionProvider";
import { companionStyles } from "./companionStyles";
import { companionLauncherLabel } from "@/lib/companion/companionName";

export default function CompanionLauncher() {
  const { visible, open, setOpen, companionName } = useCompanion();
  if (!visible || open) return null;

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
