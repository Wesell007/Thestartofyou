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

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm: () => void;
  busy?: boolean;
}

/**
 * Calm, accessible confirmation for destructive actions.
 *
 * Replaces window.confirm() so the highest-stakes moments in the product stay
 * inside the app's own visual language. Keyboard and screen-reader behaviour
 * come from the underlying Radix alert dialog.
 */
const ConfirmDialog = ({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel,
  cancelLabel = "Cancel",
  onConfirm,
  busy = false,
}: ConfirmDialogProps) => (
  <AlertDialog open={open} onOpenChange={onOpenChange}>
    <AlertDialogContent className="max-w-[440px] rounded-[20px] bg-card border-border/60">
      <AlertDialogHeader>
        <AlertDialogTitle className="font-serif text-xl text-foreground">{title}</AlertDialogTitle>
        <AlertDialogDescription className="font-sans text-[13.5px] font-light leading-relaxed text-muted-foreground">
          {description}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter className="gap-2 sm:gap-2">
        <AlertDialogCancel
          disabled={busy}
          className="rounded-pill font-sans text-[13.5px] font-light mt-0"
        >
          {cancelLabel}
        </AlertDialogCancel>
        <AlertDialogAction
          disabled={busy}
          onClick={(event) => {
            event.preventDefault();
            onConfirm();
          }}
          className="rounded-pill bg-destructive text-destructive-foreground hover:bg-destructive/90 font-sans text-[13.5px]"
        >
          {confirmLabel}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

export default ConfirmDialog;
