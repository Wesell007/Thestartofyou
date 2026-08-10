import { format } from "date-fns";
import { parseDateOnly } from "@/lib/dateOnly";
import type { BabyRecord } from "@/lib/firstYearJourney";
import type { FirstYearMemory } from "@/lib/firstYearMemories";
import { memoryMonthKey, memoryMonthLabel } from "@/lib/firstYearMemoriesSchema";
import { babyDisplayName } from "./MemoryScopeSelector";

const INLINE_ACTION_CLASS =
  "inline-flex min-h-11 items-center font-sans text-[12.5px] text-foreground/60 underline underline-offset-4 hover:text-foreground/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-background";

type Props = {
  memories: FirstYearMemory[];
  babies: BabyRecord[];
  onEdit: (memory: FirstYearMemory) => void;
  onRemove: (memory: FirstYearMemory) => void;
};

/** Who a kept moment is about, in plain words. */
export const memoryScopeLabel = (memory: FirstYearMemory, babies: BabyRecord[]): string => {
  if (memory.memory_scope === "family") return "Your family";
  if (memory.memory_scope === "all_babies") return "All babies";
  const index = babies.findIndex((baby) => baby.id === memory.baby_id);
  const baby = babies[index];
  return baby ? babyDisplayName(baby, index) : "Your baby";
};

/**
 * Kept moments, newest first, gathered under the month they belong to.
 * No counts, no streaks, no scoring: just what was saved.
 */
const MemoryList = ({ memories, babies, onEdit, onRemove }: Props) => {
  const months: { key: string; label: string; items: FirstYearMemory[] }[] = [];
  memories.forEach((memory) => {
    const key = memoryMonthKey(memory.memory_date);
    const existing = months.find((month) => month.key === key);
    if (existing) existing.items.push(memory);
    else months.push({ key, label: memoryMonthLabel(memory.memory_date), items: [memory] });
  });

  return (
    <div className="space-y-8">
      {months.map((month) => (
        <div key={month.key}>
          <h3 className="font-sans text-[12px] tracking-[0.14em] uppercase text-foreground/55 mb-3">
            {month.label}
          </h3>
          <ul className="space-y-5">
            {month.items.map((memory) => {
              const parsed = parseDateOnly(memory.memory_date);
              return (
                <li
                  key={memory.id}
                  className="border-b border-border/40 pb-5 last:border-0 last:pb-0"
                >
                  <p className="font-sans text-[12px] tracking-[0.12em] uppercase text-foreground/50 mb-1">
                    {parsed ? format(parsed, "EEEE d MMMM") : memory.memory_date} ·{" "}
                    {memoryScopeLabel(memory, babies)}
                  </p>
                  {memory.title && (
                    <p className="font-serif text-[16.5px] leading-[1.5] text-foreground/90 mb-1">
                      {memory.title}
                    </p>
                  )}
                  <p className="font-serif text-[15px] leading-[1.7] text-foreground/85 whitespace-pre-wrap">
                    {memory.note}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() => onEdit(memory)}
                      className={INLINE_ACTION_CLASS}
                    >
                      Edit this memory
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemove(memory)}
                      className={INLINE_ACTION_CLASS}
                    >
                      Remove this memory
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MemoryList;
