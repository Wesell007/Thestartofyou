import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { STATUS_OPTIONS, type ChangeableStatus } from "@/lib/journeyStatusCopy";

interface Props {
  open: boolean;
  onCancel: () => void;
  onSelect: (status: ChangeableStatus, outcomeDate: string | null) => void;
}

/**
 * Step 1 of the status change flow. Never writes to the DB itself.
 * Emits the chosen status (and optional outcome date for given_birth)
 * to the parent, which owns confirmation flow branching.
 */
const ChangeStatusDialog = ({ open, onCancel, onSelect }: Props) => {
  const [selected, setSelected] = useState<ChangeableStatus | null>(null);
  const [outcomeDate, setOutcomeDate] = useState<string>("");

  const reset = () => {
    setSelected(null);
    setOutcomeDate("");
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  const handleContinue = () => {
    if (!selected) return;
    const date =
      selected === "given_birth" && outcomeDate.trim().length > 0
        ? outcomeDate
        : null;
    reset();
    onSelect(selected, date);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleCancel()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">Change your journey status</DialogTitle>
          <DialogDescription className="font-serif text-foreground/75 text-[14.5px] leading-[1.6] pt-2">
            Choose what fits best. You can change or undo this any time.
          </DialogDescription>
        </DialogHeader>

        <RadioGroup
          value={selected ?? ""}
          onValueChange={(v) => setSelected(v as ChangeableStatus)}
          className="mt-2 space-y-3"
        >
          {STATUS_OPTIONS.map((opt) => (
            <div
              key={opt.value}
              className="flex items-center gap-3 rounded-[14px] border border-border/60 bg-parchment px-4 py-3"
            >
              <RadioGroupItem value={opt.value} id={`status-${opt.value}`} />
              <Label
                htmlFor={`status-${opt.value}`}
                className="font-serif text-[15px] text-foreground/85 cursor-pointer flex-1"
              >
                {opt.label}
              </Label>
            </div>
          ))}
        </RadioGroup>

        {selected === "given_birth" && (
          <div className="mt-4">
            <Label
              htmlFor="outcome-date"
              className="font-sans text-[12px] font-medium tracking-[0.16em] uppercase text-foreground/70"
            >
              Date of birth (optional)
            </Label>
            <input
              id="outcome-date"
              type="date"
              value={outcomeDate}
              onChange={(e) => setOutcomeDate(e.target.value)}
              className="mt-2 w-full rounded-pill border border-border/60 bg-parchment px-4 py-2.5 font-sans text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/10"
            />
          </div>
        )}

        <DialogFooter className="gap-2 sm:gap-3 mt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="inline-flex items-center justify-center rounded-pill border border-border/60 bg-parchment px-5 py-2.5 text-sm text-foreground/85 hover:border-foreground/25 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleContinue}
            disabled={!selected}
            className="inline-flex items-center justify-center rounded-pill bg-terracotta text-terracotta-foreground px-5 py-2.5 text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all disabled:opacity-50"
          >
            Continue
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeStatusDialog;
