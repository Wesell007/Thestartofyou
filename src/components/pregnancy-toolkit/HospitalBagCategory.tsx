import { FormEvent, useId, useRef, useState } from "react";
import { Check, ChevronDown, Plus, X } from "lucide-react";
import {
  HospitalBagCategoryMeta,
  HospitalBagItemRow,
  sortItemsForDisplay,
} from "@/lib/hospitalBagSchema";

interface Props {
  category: HospitalBagCategoryMeta;
  items: HospitalBagItemRow[];
  disabled?: boolean;
  onToggle: (id: string) => void;
  onAdd: (label: string) => void;
  onDelete: (id: string) => void;
}

const accent = "hsl(var(--stage-pregnancy-accent))";
const softBorder = "hsl(var(--stage-pregnancy-accent) / 0.16)";

const HospitalBagCategoryCard = ({
  category,
  items,
  disabled,
  onToggle,
  onAdd,
  onDelete,
}: Props) => {
  const [draft, setDraft] = useState("");
  const panelId = useId();
  const packed = items.filter((i) => Boolean(i.packed_at)).length;
  const total = items.length;
  const complete = total > 0 && packed === total;

  // Fully packed categories start collapsed; after that the user is in control.
  const initialOpen = useRef(!complete);
  const [open, setOpen] = useState(initialOpen.current);

  const percent = total === 0 ? 0 : Math.round((packed / total) * 100);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const value = draft.trim();
    if (!value) return;
    onAdd(value);
    setDraft("");
  };

  const ordered = sortItemsForDisplay(items);

  return (
    <section
      className="rounded-[20px] keepsake-surface px-6 py-5"
      style={{ borderColor: softBorder }}
      aria-label={category.label}
    >
      <h2>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="w-full text-left flex items-start gap-3 py-1 rounded-[12px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[hsl(var(--stage-pregnancy-accent)/0.6)]"
        >
          <span className="flex-1 min-w-0">
            <span className="flex items-center gap-2.5 flex-wrap">
              <span className="font-serif text-[1.15rem] sm:text-[1.2rem] text-foreground/88 leading-[1.25]">
                {category.label}
              </span>
              {complete && (
                <span
                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-sans text-[10px] font-medium tracking-[0.18em] uppercase"
                  style={{
                    background: "hsl(var(--stage-pregnancy) / 0.6)",
                    color: accent,
                  }}
                >
                  <Check size={10} strokeWidth={2.4} aria-hidden="true" />
                  Packed
                </span>
              )}
            </span>
            <span className="block font-serif italic text-foreground/60 text-[13.5px] leading-[1.55] mt-1 max-w-[46ch]">
              {category.intro}
            </span>
            <span className="mt-3 flex items-center gap-3">
              <span
                className="h-1 flex-1 rounded-full overflow-hidden"
                style={{ background: "hsl(var(--stage-pregnancy) / 0.5)" }}
                role="progressbar"
                aria-valuenow={packed}
                aria-valuemin={0}
                aria-valuemax={total}
                aria-valuetext={`${packed} of ${total} packed`}
                aria-label={`${category.label} packing progress`}
              >
                <span
                  className="block h-full rounded-full transition-[width] duration-500"
                  style={{ width: `${percent}%`, background: accent }}
                />
              </span>
              <span className="font-sans text-[11px] text-foreground/55 whitespace-nowrap">
                {packed} of {total} packed
              </span>
            </span>
          </span>
          <ChevronDown
            size={16}
            strokeWidth={1.7}
            aria-hidden="true"
            className={`mt-1 shrink-0 text-foreground/45 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>
      </h2>

      <div id={panelId} hidden={!open} className="pt-4">
        <ul className="space-y-1.5">
          {ordered.map((item) => {
            const isPacked = Boolean(item.packed_at);
            return (
              <li
                key={item.id}
                className="flex items-center gap-3 rounded-[12px] px-2 py-2 transition-colors"
                style={{
                  background: isPacked ? "hsl(var(--stage-pregnancy) / 0.35)" : "transparent",
                }}
              >
                <button
                  type="button"
                  aria-pressed={isPacked}
                  aria-label={isPacked ? `Mark ${item.label} as not packed` : `Mark ${item.label} as packed`}
                  onClick={() => onToggle(item.id)}
                  disabled={disabled}
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-colors"
                  style={{
                    background: isPacked ? accent : "transparent",
                    borderColor: isPacked ? accent : "hsl(var(--stage-pregnancy-accent) / 0.35)",
                  }}
                >
                  {isPacked ? (
                    <Check size={13} strokeWidth={2.2} color="white" />
                  ) : null}
                </button>
                <span
                  className={`flex-1 font-sans text-[14px] leading-[1.5] ${
                    isPacked ? "text-foreground/55 line-through decoration-1" : "text-foreground/85"
                  }`}
                >
                  {item.label}
                </span>
                {item.is_custom && (
                  <button
                    type="button"
                    onClick={() => onDelete(item.id)}
                    disabled={disabled}
                    className="text-foreground/40 hover:text-foreground/70 transition-colors"
                    aria-label={`Remove ${item.label}`}
                  >
                    <X size={14} strokeWidth={1.6} />
                  </button>
                )}
              </li>
            );
          })}
        </ul>

        <form
          onSubmit={handleSubmit}
          className="mt-4 flex items-center gap-2 rounded-[12px] border px-3 py-2"
          style={{
            borderColor: softBorder,
            background: "hsl(var(--stage-pregnancy) / 0.25)",
          }}
        >
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Add your own"
            maxLength={80}
            disabled={disabled}
            className="flex-1 bg-transparent outline-none font-sans text-[13.5px] text-foreground/85 placeholder:text-foreground/40"
            aria-label={`Add a custom item to ${category.label}`}
          />
          <button
            type="submit"
            disabled={disabled || draft.trim().length === 0}
            className="inline-flex items-center gap-1 rounded-full px-3 py-1 font-sans text-[10.5px] font-medium tracking-[0.2em] uppercase transition-opacity disabled:opacity-40"
            style={{ background: accent, color: "white" }}
          >
            <Plus size={11} strokeWidth={2} /> Add
          </button>
        </form>
      </div>
    </section>
  );
};

export default HospitalBagCategoryCard;
