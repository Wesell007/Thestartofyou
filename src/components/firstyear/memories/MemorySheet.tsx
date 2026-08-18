import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import MemoryForm, { type MemoryFormProps } from "./MemoryForm";

type Props = MemoryFormProps & {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

/**
 * The shell around keeping a memory. Adding becomes a deliberate act rather
 * than a form sitting open on the page, so the shelf of kept moments is what
 * a parent sees first.
 */
const MemorySheet = ({ open, onOpenChange, ...form }: Props) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-[520px] max-h-[86vh] overflow-y-auto rounded-[26px]">
      <DialogHeader>
        <DialogTitle className="font-serif text-[1.35rem] leading-[1.25]">
          {form.editing ? "Edit this memory" : "Keep a memory"}
        </DialogTitle>
        <DialogDescription className="font-sans text-[13px] leading-[1.6]">
          A sentence is plenty. Write it however you would say it out loud.
        </DialogDescription>
      </DialogHeader>
      <MemoryForm {...form} />
    </DialogContent>
  </Dialog>
);

export default MemorySheet;
