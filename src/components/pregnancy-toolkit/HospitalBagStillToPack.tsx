import { HospitalBagItemRow, unpackedPreview } from "@/lib/hospitalBagSchema";

interface Props {
  rows: HospitalBagItemRow[];
  limit?: number;
}

const accent = "hsl(var(--stage-pregnancy-accent))";
const softBorder = "hsl(var(--stage-pregnancy-accent) / 0.16)";

const HospitalBagStillToPack = ({ rows, limit = 5 }: Props) => {
  const labels = unpackedPreview(rows, limit);
  if (labels.length === 0) return null;

  const remainingTotal = rows.filter((r) => !r.packed_at).length;
  const extra = remainingTotal - labels.length;

  return (
    <section
      className="rounded-[16px] border px-5 py-4"
      style={{
        borderColor: softBorder,
        background: "hsl(var(--stage-pregnancy) / 0.28)",
      }}
      aria-label="Still to pack"
    >
      <p
        className="font-sans text-[10.5px] font-medium tracking-[0.26em] uppercase mb-2.5"
        style={{ color: accent }}
      >
        Still to pack
      </p>
      <ul className="flex flex-wrap gap-x-2 gap-y-1.5">
        {labels.map((label) => (
          <li
            key={label}
            className="rounded-full border px-3 py-1 font-sans text-[12.5px] text-foreground/75"
            style={{ borderColor: softBorder, background: "hsl(var(--background) / 0.6)" }}
          >
            {label}
          </li>
        ))}
      </ul>
      {extra > 0 && (
        <p className="mt-2.5 font-serif italic text-foreground/60 text-[13px]">
          And {extra} more when you are ready.
        </p>
      )}
    </section>
  );
};

export default HospitalBagStillToPack;
