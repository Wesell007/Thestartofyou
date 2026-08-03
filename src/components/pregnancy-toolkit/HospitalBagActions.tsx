import { Printer, FileDown } from "lucide-react";
import { toast } from "sonner";

interface HospitalBagActionsProps {
  hasContent: boolean;
}

const accent = "hsl(var(--stage-pregnancy-accent))";
const softBorder = "hsl(var(--stage-pregnancy-accent) / 0.22)";

const HospitalBagActions = ({ hasContent }: HospitalBagActionsProps) => {
  const disabled = !hasContent;

  const handlePrint = () => {
    if (disabled) return;
    window.print();
  };

  const handleSaveAsPdf = () => {
    if (disabled) return;
    toast("Choose Save as PDF as the destination in the print dialog.");
    window.print();
  };

  return (
    <div className="rounded-[16px] keepsake-surface px-5 py-4 flex flex-col gap-3 print:hidden">
      <div className="flex flex-col sm:flex-row gap-2.5">
        <button
          type="button"
          onClick={handlePrint}
          disabled={disabled}
          aria-disabled={disabled}
          className="inline-flex items-center justify-center gap-2 rounded-full border px-5 py-2.5 font-sans text-[12px] font-medium tracking-[0.2em] uppercase transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:bg-[hsl(var(--stage-pregnancy)/0.35)]"
          style={{ color: accent, borderColor: softBorder }}
        >
          <Printer size={13} strokeWidth={1.8} aria-hidden="true" />
          Print checklist
        </button>
        <button
          type="button"
          onClick={handleSaveAsPdf}
          disabled={disabled}
          aria-disabled={disabled}
          className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 font-sans text-[12px] font-medium tracking-[0.2em] uppercase text-white transition-opacity disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:opacity-90"
          style={{ background: accent }}
        >
          <FileDown size={13} strokeWidth={1.8} aria-hidden="true" />
          Save as PDF
        </button>
      </div>
      {disabled && (
        <p className="font-sans text-[12px] text-foreground/70 leading-[1.55]">
          Your checklist will be ready to print once your items have loaded.
        </p>
      )}
    </div>
  );
};

export default HospitalBagActions;
