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
      <div
        className="rounded-[16px] px-5 py-5 keepsake-surface"
        style={{ borderColor: "hsl(var(--stage-ttc-accent) / 0.16)" }}
      >
        <p className="font-serif italic text-foreground/68 text-[15px] leading-[1.6]">
          Any notes you add will appear here so you can look back gently.
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-[16px] keepsake-surface overflow-hidden"
      style={{ borderColor: "hsl(var(--stage-ttc-accent) / 0.16)" }}
    >
      <ul className="divide-y" style={{ borderColor: "hsl(var(--stage-ttc-accent) / 0.12)" }}>
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
                  <span className="font-sans text-[13px] font-medium text-foreground/85">
                    {LOG_TYPE_NOTED_LABEL[log.log_type]}
                  </span>
                  {valueLabel && (
                    <span
                      className="font-sans text-[10.5px] rounded px-1.5 py-[1px] uppercase tracking-[0.05em]"
                      style={{
                        background: "hsl(var(--stage-ttc-accent) / 0.12)",
                        color: "hsl(var(--stage-ttc-accent))",
                      }}
                    >
                      {valueLabel}
                    </span>
                  )}
                  <span className="font-sans text-[12px] text-muted-foreground">
                    {dateLabel}
                  </span>
                </div>
                {log.notes && (
                  <p className="font-serif italic text-[14px] text-foreground/70 leading-[1.55] mt-1">
                    {log.notes}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => onEdit(log)}
                  aria-label="Edit log"
                  className="w-8 h-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors flex items-center justify-center"
                >
                  <Pencil size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => setPendingDelete(log)}
                  aria-label="Delete log"
                  className="w-8 h-8 rounded-full text-muted-foreground hover:text-destructive hover:bg-muted/50 transition-colors flex items-center justify-center"
                >
                  <Trash2 size={13} />
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
