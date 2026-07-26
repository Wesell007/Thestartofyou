import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { ConfirmCopy } from "@/lib/journeyStatusCopy";

interface Props {
  open: boolean;
  copy: ConfirmCopy;
  busy?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const StatusConfirmDialog = ({ open, copy, busy, onConfirm, onCancel }: Props) => (
  <Dialog open={open} onOpenChange={(o) => !o && onCancel()}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="font-serif text-xl">{copy.title}</DialogTitle>
        <DialogDescription className="font-serif text-foreground/80 text-[15px] leading-[1.6] pt-2">
          {copy.body}
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="gap-2 sm:gap-3 mt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={busy}
          className="inline-flex items-center justify-center rounded-pill border border-border/60 bg-parchment px-5 py-2.5 text-sm text-foreground/85 hover:border-foreground/25 transition-colors disabled:opacity-50"
        >
          {copy.cancelLabel}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={busy}
          className="inline-flex items-center justify-center rounded-pill bg-terracotta text-terracotta-foreground px-5 py-2.5 text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all disabled:opacity-50"
        >
          {busy ? "Saving…" : copy.confirmLabel}
        </button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default StatusConfirmDialog;
