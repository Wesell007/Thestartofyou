import { useEffect, useState, useCallback } from "react";
import { format, parseISO } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import {
  getActivePregnancyJourney,
  updatePregnancyJourneyStatus,
  STATUS_LABELS,
  type PregnancyJourneyStatus,
} from "@/lib/savedJourney";
import {
  CONFIRM_COPY,
  RETURN_TO_ACTIVE_COPY,
  JOURNEY_SUPPORT_HREF,
  JOURNEY_SUPPORT_LINK_LABEL,
  type ChangeableStatus,
} from "@/lib/journeyStatusCopy";
import { Link } from "react-router-dom";
import { isSupportStatus } from "@/data/journeySupportArticles";
import { toast } from "@/hooks/use-toast";
import ChangeStatusDialog from "./ChangeStatusDialog";
import LossConfirmDialog from "./LossConfirmDialog";
import StatusConfirmDialog from "./StatusConfirmDialog";

/**
 * Mounted from Account Settings when the user has a pregnancy journey.
 * Owns the two-step confirmation flow. Never writes reason/free-text.
 * Return-to-active is a single-step confirmation.
 */
const JourneyStatusSection = ({ userId }: { userId: string }) => {
  const [status, setStatus] = useState<PregnancyJourneyStatus | null>(null);
  const [statusChangedAt, setStatusChangedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  const [changeOpen, setChangeOpen] = useState(false);
  const [pending, setPending] = useState<
    | { status: ChangeableStatus; outcomeDate: string | null }
    | null
  >(null);
  const [lossOpen, setLossOpen] = useState(false);
  const [returnOpen, setReturnOpen] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    const journey = await getActivePregnancyJourney(userId);
    setStatus(journey?.status ?? null);
    setStatusChangedAt(journey?.status_changed_at ?? null);
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const commit = async (
    next: PregnancyJourneyStatus,
    outcomeDate: string | null,
  ) => {
    setBusy(true);
    try {
      await updatePregnancyJourneyStatus(userId, {
        status: next,
        outcome_date: outcomeDate,
      });
      setStatus(next);
      toast({ title: "Journey status updated." });
    } catch {
      toast({
        title: "Couldn't update your status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setBusy(false);
      setChangeOpen(false);
      setPending(null);
      setLossOpen(false);
      setReturnOpen(false);
    }
  };

  const handleSelected = (
    next: ChangeableStatus,
    outcomeDate: string | null,
  ) => {
    setChangeOpen(false);
    if (next === "pregnancy_loss") {
      setPending({ status: next, outcomeDate: null });
      setLossOpen(true);
      return;
    }
    setPending({ status: next, outcomeDate });
    // For non-loss changes, still ask one calm confirmation.
    // Reuse the StatusConfirmDialog via same open flag path.
  };

  if (loading) return null;
  if (!status) return null;

  const isActive = status === "active";
  const nonLossPending =
    pending && pending.status !== "pregnancy_loss" && !changeOpen && !lossOpen;

  return (
    <section className="rounded-2xl border border-border/50 bg-card p-6">
      <h2 className="font-serif text-xl mb-2">Journey status</h2>
      <p className="text-sm text-muted-foreground mb-5">
        You can change your journey status at any time. Nothing you've saved
        will be removed.
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
        <span className="inline-flex items-center rounded-pill border border-border/60 bg-parchment px-3.5 py-1.5 font-sans text-[12.5px] text-foreground/80">
          {STATUS_LABELS[status]}
        </span>
        <UpdatedAtLine changedAt={statusChangedAt} />
        {isActive ? (
          <button
            type="button"
            onClick={() => setChangeOpen(true)}
            disabled={busy}
            className="text-sm text-foreground/85 underline underline-offset-4 decoration-foreground/25 hover:text-foreground disabled:opacity-50"
          >
            Change status
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setReturnOpen(true)}
              disabled={busy}
              className="inline-flex items-center rounded-pill bg-terracotta text-terracotta-foreground px-4 py-2 text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all disabled:opacity-50"
            >
              Return to active pregnancy
            </button>
            <button
              type="button"
              onClick={() => setChangeOpen(true)}
              disabled={busy}
              className="text-sm text-foreground/70 underline underline-offset-4 decoration-foreground/25 hover:text-foreground disabled:opacity-50"
            >
              Change status
            </button>
          </>
        )}
      </div>

      {isSupportStatus(status) && (
        <p className="mt-4 font-sans text-[12.5px] text-foreground/70">
          <Link
            to={JOURNEY_SUPPORT_HREF}
            className="underline underline-offset-4 decoration-foreground/25 hover:text-foreground"
          >
            {JOURNEY_SUPPORT_LINK_LABEL}
          </Link>
        </p>
      )}


      <ChangeStatusDialog
        open={changeOpen}
        onCancel={() => setChangeOpen(false)}
        onSelect={handleSelected}
      />

      <LossConfirmDialog
        open={lossOpen}
        busy={busy}
        onCancel={() => {
          setLossOpen(false);
          setPending(null);
        }}
        onConfirm={() => commit("pregnancy_loss", null)}
      />

      {nonLossPending && pending && (
        <StatusConfirmDialog
          open
          busy={busy}
          copy={CONFIRM_COPY[pending.status]}
          onCancel={() => setPending(null)}
          onConfirm={() => commit(pending.status, pending.outcomeDate)}
        />
      )}

      <StatusConfirmDialog
        open={returnOpen}
        busy={busy}
        copy={RETURN_TO_ACTIVE_COPY}
        onCancel={() => setReturnOpen(false)}
        onConfirm={() => commit("active", null)}
      />
    </section>
  );
};

const UpdatedAtLine = ({ changedAt }: { changedAt: string | null }) => {
  if (!changedAt) return null;
  let label: string | null = null;
  try {
    const d = parseISO(changedAt);
    if (isNaN(d.getTime())) return null;
    label = format(d, "d MMM yyyy");
  } catch {
    return null;
  }
  return (
    <span className="font-sans text-[12px] text-foreground/55">
      Updated {label}
    </span>
  );
};

export default JourneyStatusSection;
