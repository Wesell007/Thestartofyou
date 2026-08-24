/**
 * Phase 29B — companion panel.
 *
 * Mobile: bottom sheet. Desktop: right-side drawer. Built on the existing
 * sheet primitive so focus handling and dismissal behave like the rest of
 * the app.
 */

import { useNavigate } from "react-router-dom";
import { ExternalLink, RotateCcw } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCompanion } from "./CompanionProvider";
import { companionStyles } from "./companionStyles";
import CompanionMessageList from "./CompanionMessageList";
import CompanionComposer from "./CompanionComposer";
import { companionPanelTitle, companionSafetyLine } from "@/lib/companion/companionName";
import { companionAskStage } from "@/lib/companion/companionMode";
import { askDestination, askRouteState } from "@/lib/askNavigation";

export default function CompanionPanel() {
  const {
    open,
    setOpen,
    visible,
    mode,
    turns,
    starters,
    companionName,
    context,
    lastQuestion,
    send,
    clear,
  } = useCompanion();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  if (!visible) return null;

  const openFullAsk = () => {
    setOpen(false);
    // Only safe, non-identifying values go in the URL. The question and the
    // bounded context travel through router state.
    navigate(askDestination({ stage: companionAskStage(mode) }), {
      state: askRouteState(lastQuestion ?? "", context),
    });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className={`${companionStyles.panel} ${
          isMobile ? "h-[88vh] rounded-t-3xl" : "w-full sm:max-w-md"
        }`}
        aria-label="Companion"
      >
        <div className="border-b border-[hsl(var(--stage-ttc-sage-soft))] px-5 pb-4 pt-5">
          <h2 className={companionStyles.panelHeading}>{companionPanelTitle(companionName)}</h2>
          <p className={`${companionStyles.safetyLine} mt-2`}>
            {companionSafetyLine(companionName)}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {turns.length === 0 ? (
            <div className={companionStyles.paperCard}>
              <p className="text-[14px] leading-relaxed text-[hsl(var(--stage-ttc-olive))]">
                Ask anything about this page, or start with one of these.
              </p>
              <div className="mt-3 flex flex-col gap-2">
                {starters.map((starter) => (
                  <button
                    key={starter}
                    type="button"
                    onClick={() => send(starter)}
                    className={companionStyles.chip}
                  >
                    {starter}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <CompanionMessageList />
          )}
        </div>

        <div className="border-t border-[hsl(var(--stage-ttc-sage-soft))] px-5 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-4">
          <CompanionComposer />
          <div className="mt-2 flex items-center justify-between">
            <button type="button" onClick={clear} className={`${companionStyles.quietButton} inline-flex items-center gap-1 px-0`}>
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              Start again
            </button>
            <button
              type="button"
              onClick={openFullAsk}
              className={`${companionStyles.quietButton} inline-flex items-center gap-1 px-0`}
            >
              Open full Ask page
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
