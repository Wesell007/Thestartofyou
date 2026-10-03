/**
 * Phase 29B — companion panel.
 *
 * Mobile: bottom sheet. Desktop: right-side drawer. Built on the existing
 * sheet primitive so focus handling and dismissal behave like the rest of
 * the app.
 */

import { useNavigate } from "react-router-dom";
import { ExternalLink, RotateCcw } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCompanion } from "./useCompanion";
import { companionStyles } from "./companionStyles";
import CompanionMessageList from "./CompanionMessageList";
import CompanionComposer from "./CompanionComposer";
import CompanionMemoryPrompt from "./CompanionMemoryPrompt";
import CompanionHistoryList from "./CompanionHistoryList";
import { companionPanelTitle, companionSafetyLine } from "@/lib/companion/companionName";
import { isCompanionJournalUiEnabled } from "@/lib/companion/journal/journalFlags";
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
    journalEntry,
    clearJournalEntry,
    companionName,
    context,
    lastQuestion,
    send,
    clear,
    memory,
    historyEnabled,
    conversationId,
    restoreConversation,
    newConversation,
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
          <SheetTitle className={companionStyles.panelHeading}>
            {companionPanelTitle(companionName)}
          </SheetTitle>
          <SheetDescription className={`${companionStyles.safetyLine} mt-2`}>
            {companionSafetyLine(companionName, isCompanionJournalUiEnabled())}
          </SheetDescription>
        </div>

        {/* AIC-4 — retained threads are only listed when they actually exist,
            which means signed in with persistent history enabled. */}
        {historyEnabled && (
          <CompanionHistoryList
            activeConversationId={conversationId}
            onRestore={restoreConversation}
          />
        )}

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
          {/* AIC-3 — an explicit memory command is confirmed here, never
              written silently and never handled by the model. */}
          <div className="mb-3 empty:mb-0">
            <CompanionMemoryPrompt
              state={memory.state}
              busy={memory.busy}
              onConfirm={memory.confirm}
              onCancel={memory.cancel}
              onDismiss={memory.dismiss}
            />
          </div>
          {/* AIC-JA3 — a visible, removable reminder of the entry the person
              chose. Only a generic source name is shown, never their words. */}
          {journalEntry && (
            <div className="mb-3 flex items-center justify-between gap-3 rounded-2xl border border-[hsl(var(--stage-ttc-sage-soft))] px-3 py-2">
              <span className="font-sans text-[12.5px] font-light text-muted-foreground">
                Asking about: {journalEntry.label}
              </span>
              <button
                type="button"
                onClick={clearJournalEntry}
                className="min-h-[44px] px-2 font-sans text-[12.5px] font-medium text-foreground underline underline-offset-4"
              >
                Remove
              </button>
            </div>
          )}
          <CompanionComposer />
          {/* Both footer actions keep a 44px clickable height for touch. */}
          <div className="mt-1 flex items-center justify-between">
            <button
              type="button"
              onClick={historyEnabled ? newConversation : clear}
              className={`${companionStyles.quietButton} inline-flex min-h-[44px] items-center gap-1 px-0 py-3`}
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              {historyEnabled ? "New conversation" : "Start again"}
            </button>
            <button
              type="button"
              onClick={openFullAsk}
              className={`${companionStyles.quietButton} inline-flex min-h-[44px] items-center gap-1 px-0 py-3`}
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
