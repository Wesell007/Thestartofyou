import { BirthPlanStatus, statusLabel } from "@/lib/birthPlanSchema";

interface Props {
  completion: number;
  status: BirthPlanStatus;
  updatedAt: string | null;
}

const BirthPlanProgress = ({ completion, status, updatedAt }: Props) => {
  const accent = "hsl(var(--stage-pregnancy-accent))";
  const softBorder = "hsl(var(--stage-pregnancy-accent) / 0.16)";
  const label = statusLabel(status);
  const updated = updatedAt
    ? new Date(updatedAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div
      className="rounded-[20px] keepsake-surface px-6 py-6"
      style={{ borderColor: softBorder }}
    >
      <div className="flex items-baseline justify-between gap-4 mb-3">
        <p
          className="font-sans text-[10.5px] font-medium tracking-[0.26em] uppercase"
          style={{ color: accent }}
        >
          Your progress
        </p>
        <span
          className="font-serif text-[15px] text-foreground/75"
          aria-live="polite"
        >
          {completion}%
        </span>
      </div>
      <div
        className="h-1.5 w-full rounded-full overflow-hidden mb-3"
        style={{ background: "hsl(var(--stage-pregnancy) / 0.5)" }}
      >
        <div
          className="h-full rounded-full transition-[width] duration-500"
          style={{ width: `${completion}%`, background: accent }}
        />
      </div>
      <div className="flex items-center justify-between gap-3">
        <p className="font-serif italic text-foreground/70 text-[14px]">
          {label}
        </p>
        {updated && (
          <p className="font-sans text-[11px] text-foreground/50">
            Last saved {updated}
          </p>
        )}
      </div>
    </div>
  );
};

export default BirthPlanProgress;
