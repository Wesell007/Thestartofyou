import { useState } from "react";
import { format } from "date-fns";
import { Pencil, Trash2, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";
import { EVENTS } from "@/lib/analyticsEvents";
import {
  deleteTTCLog,
  LOG_TYPE_NOTED_LABEL,
  LOG_VALUE_LABEL,
  type TTCLog,
} from "@/lib/ttcLogs";
import {
  TTC_CHIP,
  TTC_FOCUS_RING,
  TTC_INNER_RADIUS,
  TTC_PAPER_CARD,
} from "@/components/ttc/journey/ttcStyles";

type Props = {
  logs: TTCLog[];
  onEdit: (log: TTCLog) => void;
  onDeleted: () => void;
};

const TTCLogList = ({ logs, onEdit, onDeleted }: Props) => {
  const [pendingDelete, setPendingDelete] = useState<TTCLog | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleConfirmDelete = async () => {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      await deleteTTCLog(pendingDelete.id);
      trackEvent(EVENTS.TTC_LOG_DELETED);
      toast({ title: "Log removed" });
      setPendingDelete(null);
      onDeleted();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      toast({ title: "Could not remove log", description: message, variant: "destructive" });
    } finally {
      setDeleting(false);
    }
  };

  if (logs.length === 0) {
    return (
      <div className={`${TTC_INNER_RADIUS} border border-[hsl(var(--stage-ttc-edge))] bg-[hsl(var(--stage-ttc-cream-soft)/0.6)] px-5 py-5`}>
        <p className="font-serif italic text-[15px] leading-[1.6] text-[hsl(var(--stage-ttc-text-soft))]">
          Any notes you add will appear here so you can look back gently.
        </p>
      </div>
    );
  }

  return (
    <div className={`${TTC_PAPER_CARD} overflow-hidden`}>
      <ul className="divide-y divide-[hsl(var(--stage-ttc-edge)/0.7)]">
        {logs.map((log) => {
          const dateLabel = (() => {
            try {
              return format(new Date(log.log_date + "T00:00:00"), "EEE d MMM");
            } catch {
              return log.log_date;
            }
          })();
          const valueLabel = log.value ? LOG_VALUE_LABEL[log.value] ?? log.value : null;
          return (
            <li key={log.id} className="flex items-start gap-3 px-4 sm:px-5 py-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-sans text-[13px] font-medium text-[hsl(var(--stage-ttc-text))]">
                    {LOG_TYPE_NOTED_LABEL[log.log_type]}
                  </span>
                  {valueLabel && (
                    <span className={TTC_CHIP}>
                      {valueLabel}
                    </span>
                  )}
                  <span className="font-sans text-[12px] text-[hsl(var(--stage-ttc-text-soft))]">
                    {dateLabel}
                  </span>
                </div>
                {log.notes && (
                  <p className="font-serif italic text-[14px] text-[hsl(var(--stage-ttc-text-soft))] leading-[1.55] mt-1">
                    {log.notes}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => onEdit(log)}
                  aria-label="Edit log"
                  className={`flex h-11 w-11 items-center justify-center rounded-full text-[hsl(var(--stage-ttc-text-soft))] transition-colors hover:bg-[hsl(var(--stage-ttc-sage)/0.6)] hover:text-[hsl(var(--stage-ttc-text))] ${TTC_FOCUS_RING}`}
                >
                  <Pencil size={14} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setPendingDelete(log)}
                  aria-label="Delete log"
                  className={`flex h-11 w-11 items-center justify-center rounded-full text-[hsl(var(--stage-ttc-text-soft))] transition-colors hover:bg-[hsl(var(--stage-ttc-sage)/0.6)] hover:text-destructive ${TTC_FOCUS_RING}`}
                >
                  <Trash2 size={14} aria-hidden="true" />
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <AlertDialog open={!!pendingDelete} onOpenChange={(o) => !o && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove this log?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the note from your calendar. You can't undo this.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} disabled={deleting}>
              {deleting && <Loader2 size={13} className="mr-2 animate-spin" />}
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TTCLogList;
