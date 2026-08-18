import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import MemoryForm, { type MemoryFormProps } from "./MemoryForm";
import { FY_SHADOW_STRONG } from "@/components/firstyear/journey/firstYearStyles";

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
    <DialogContent
      className="max-w-[520px] max-h-[86vh] overflow-y-auto rounded-[26px] border px-6 py-7 sm:px-8"
      style={{
        backgroundColor: "hsl(var(--stage-firstyear-cream))",
        borderColor: "hsl(var(--stage-firstyear-peach-soft) / 0.8)",
        boxShadow: FY_SHADOW_STRONG,
      }}
    >
      <DialogHeader className="mb-1 text-left">
        <DialogTitle className="font-serif text-[1.5rem] leading-[1.2] text-foreground">
          {form.editing ? "Edit this memory" : "Keep a memory"}
        </DialogTitle>
        <DialogDescription className="font-sans text-[13.5px] leading-[1.7] text-[hsl(var(--stage-firstyear-text))]">
          A sentence is plenty. Write it however you would say it out loud.
        </DialogDescription>
      </DialogHeader>
      <MemoryForm {...form} />
    </DialogContent>
  </Dialog>
);

export default MemorySheet;
