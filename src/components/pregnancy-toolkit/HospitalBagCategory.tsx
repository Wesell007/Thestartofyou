import { FormEvent, useState } from "react";
import { Check, Plus, X } from "lucide-react";
import {
  HospitalBagCategoryMeta,
  HospitalBagItemRow,
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const value = draft.trim();
    if (!value) return;
    onAdd(value);
    setDraft("");
  };

  const packed = items.filter((i) => Boolean(i.packed_at)).length;

  return (
    <section
      className="rounded-[20px] keepsake-surface px-6 py-6"
      style={{ borderColor: softBorder }}
      aria-label={category.label}
    >
      <header className="mb-4 flex items-baseline justify-between gap-3">
        <div>
          <h2 className="font-serif text-[1.15rem] sm:text-[1.2rem] text-foreground/88 leading-[1.25]">
            {category.label}
          </h2>
          <p className="font-serif italic text-foreground/60 text-[13.5px] leading-[1.55] mt-1 max-w-[46ch]">
            {category.intro}
          </p>
        </div>
        <span className="font-sans text-[11px] text-foreground/55 whitespace-nowrap">
          {packed} of {items.length}
        </span>
      </header>

      <ul className="space-y-1.5">
        {items.map((item) => {
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
    </section>
  );
};

export default HospitalBagCategoryCard;
