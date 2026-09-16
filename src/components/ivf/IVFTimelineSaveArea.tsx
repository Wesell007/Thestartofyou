import { useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import { buildAuthUrl } from "@/lib/authIntent";
import { parseIVFTransferDate, type IVFTransferType } from "@/lib/ivfTimeline";
import type { IVFWriteState } from "@/hooks/useIVFTimelineSave";

/**
 * Phase 34H.1 — the visible save area.
 *
 * Presentation only: every decision about which state to show is made by the
 * feature controller. No treatment value is ever written to the address bar,
 * browser storage, analytics or a log from here.
 */

export type IVFTimelineSaveAreaProps = {
  mode: "signed_out" | "save" | "update" | "saved" | "historical" | "no_journey";
  savedDate?: string | null;
  savedType?: IVFTransferType | null;
  /** Show the remove control (a saved context exists). */
  canRemove?: boolean;
  /** Offer the existing TTC setup route (no conflicting active lifecycle). */
  canStartTTC?: boolean;
  writeState: IVFWriteState;
  status: string | null;
  error: string | null;
  onSave: () => void;
  onRemove: () => void;
};

const TRANSFER_TYPE_LABEL: Record<IVFTransferType, string> = {
  "3day": "3-day transfer (cleavage)",
  "5day": "5-day transfer (blastocyst)",
};

const Panel = ({ children }: { children: React.ReactNode }) => (
  <section
    aria-label="Saved IVF timeline"
    className="w-full rounded-2xl border p-5 sm:p-6 space-y-3"
    style={{
      backgroundColor: "hsl(var(--stage-ivf) / 0.12)",
      borderColor: "hsl(var(--stage-ivf-accent) / 0.18)",
    }}
  >
    {children}
  </section>
);

const Heading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-serif text-xl text-foreground">{children}</h2>
);

const Body = ({ children }: { children: React.ReactNode }) => (
  <p className="font-sans text-[13.5px] font-light text-muted-foreground leading-relaxed">
    {children}
  </p>
);

const IVFTimelineSaveArea = ({
  mode,
  savedDate,
  savedType,
  canRemove = false,
  canStartTTC = false,
  writeState,
  status,
  error,
  onSave,
  onRemove,
}: IVFTimelineSaveAreaProps) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const busy = writeState !== "idle";

  const savedDateObject = savedDate ? parseIVFTransferDate(savedDate) : null;

  const savedSummary =
    savedDateObject && savedType ? (
      <Body>
        {`Transfer date ${format(savedDateObject, "d MMMM yyyy")}. ${TRANSFER_TYPE_LABEL[savedType]}.`}
      </Body>
    ) : null;

  const removeButton = canRemove ? (
    <button
      type="button"
      onClick={() => setConfirmOpen(true)}
      disabled={busy}
      className="font-sans text-[13px] font-light text-muted-foreground underline underline-offset-4 hover:text-foreground disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/40 rounded-sm"
    >
      {writeState === "removing" ? "Removing…" : "Remove saved timeline"}
    </button>
  ) : null;

  return (
    <div className="space-y-3">
      <Panel>
        {mode === "signed_out" && (
          <>
            <Heading>Want to keep this timeline?</Heading>
            <Body>
              Sign in to save your IVF timeline to your Trying to Conceive journey. You'll return
              here after signing in and can re-enter your transfer details to save them.
            </Body>
            <Button asChild className="rounded-pill bg-terracotta text-terracotta-foreground hover:bg-terracotta-hover font-sans text-sm font-medium">
              <Link to={buildAuthUrl("return_to_route", "/ivf-timeline")}>Sign in to save</Link>
            </Button>
          </>
        )}

        {mode === "save" && (
          <>
            <Heading>Want to keep this timeline?</Heading>
            <Body>
              Save your embryo transfer date and transfer type to your Trying to Conceive journey so
              you can return to this timeline later.
            </Body>
            <Body>Calculated milestones are not stored.</Body>
            <Button
              onClick={onSave}
              disabled={busy}
              className="rounded-pill bg-terracotta text-terracotta-foreground hover:bg-terracotta-hover font-sans text-sm font-medium"
            >
              {writeState === "saving" ? "Saving…" : "Save my timeline"}
            </Button>
          </>
        )}

        {mode === "update" && (
          <>
            <Heading>Update saved timeline</Heading>
            <Body>This will replace the transfer details currently saved to your TTC journey.</Body>
            <Button
              onClick={onSave}
              disabled={busy}
              className="rounded-pill bg-terracotta text-terracotta-foreground hover:bg-terracotta-hover font-sans text-sm font-medium"
            >
              {writeState === "updating" ? "Updating…" : "Update saved timeline"}
            </Button>
            {removeButton}
          </>
        )}

        {mode === "saved" && (
          <>
            <Heading>Timeline saved</Heading>
            <Body>
              Your embryo transfer date and transfer type are saved to your Trying to Conceive
              journey. Calculated milestones are not stored.
            </Body>
            {removeButton}
          </>
        )}

        {mode === "historical" && (
          <>
            <Heading>Saved IVF timeline</Heading>
            {savedSummary}
            <Body>
              This is treatment information you saved earlier. It is kept as history rather than an
              active timeline.
            </Body>
            {removeButton}
          </>
        )}

        {mode === "no_journey" && (
          <>
            <Heading>Saving is connected to a Trying to Conceive journey.</Heading>
            <Body>
              You can keep using this timeline without saving it. Saving becomes available once you
              have a Trying to Conceive journey.
            </Body>
            {canStartTTC && (
              <Button
                asChild
                variant="outline"
                className="rounded-pill font-sans text-sm font-light"
              >
                <Link to="/setup/trying-to-conceive">Start your TTC journey</Link>
              </Button>
            )}
          </>
        )}

        <p role="status" aria-live="polite" className="sr-only">
          {status ?? ""}
        </p>
        {error && (
          <p className="font-sans text-[13px] font-light text-destructive" role="alert">
            {error}
          </p>
        )}
      </Panel>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Remove your saved IVF timeline?"
        description="This removes your saved embryo transfer date and transfer type from your Trying to Conceive journey. It won't delete your TTC journey or your other answers."
        confirmLabel="Remove saved timeline"
        cancelLabel="Cancel"
        busy={writeState === "removing"}
        onConfirm={() => {
          setConfirmOpen(false);
          onRemove();
        }}
      />
    </div>
  );
};

export default IVFTimelineSaveArea;
