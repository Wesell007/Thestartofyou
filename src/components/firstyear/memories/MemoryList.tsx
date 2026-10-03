import AskAboutThisEntry from "@/components/companion/AskAboutThisEntry";
import { format } from "date-fns";
import { parseDateOnly } from "@/lib/dateOnly";
import type { BabyRecord } from "@/lib/firstYearJourney";
import type { FirstYearMemory } from "@/lib/firstYearMemories";
import { memoryMonthKey, memoryMonthLabel } from "@/lib/firstYearMemoriesSchema";
import { memoryScopeLabel } from "./memoryScope";
import {
  FY_CARD_RADIUS,
  FY_CHIP,
  FY_DATE_CHIP_STYLE,
  FY_FOCUS_RING,
  FY_MONTH_HEADING,
  FY_PAPER_CARD_STYLE,
  FY_POLAROID_STYLE,
} from "@/components/firstyear/journey/firstYearStyles";

const QUIET_ACTION_CLASS = `${FY_FOCUS_RING} inline-flex min-h-11 items-center rounded-sm font-sans text-[13px] text-[hsl(var(--stage-firstyear-text-soft))] underline underline-offset-4 transition-colors hover:text-foreground`;

type Props = {
  memories: FirstYearMemory[];
  babies: BabyRecord[];
  onEdit: (memory: FirstYearMemory) => void;
  onRemove: (memory: FirstYearMemory) => void;
  /** Short-lived signed URLs, keyed by stored photo path. */
  photoUrls?: Record<string, string>;
  onOpenPhoto?: (memory: FirstYearMemory) => void;
};

/**
 * Kept moments, newest first, gathered under the month they belong to.
 * Each one is a small paper keepsake: no counts, no streaks, nothing measured.
 */
const MemoryList = ({ memories, babies, onEdit, onRemove, photoUrls, onOpenPhoto }: Props) => {
  const months: { key: string; label: string; items: FirstYearMemory[] }[] = [];
  memories.forEach((memory) => {
    const key = memoryMonthKey(memory.memory_date);
    const existing = months.find((month) => month.key === key);
    if (existing) existing.items.push(memory);
    else months.push({ key, label: memoryMonthLabel(memory.memory_date), items: [memory] });
  });

  const multiples = babies.length > 1;

  return (
    <div className="space-y-11">
      {months.map((month) => (
        <div key={month.key}>
          <div className="mb-5 flex items-center gap-4">
            <h3 className={FY_MONTH_HEADING}>{month.label}</h3>
            <span
              aria-hidden="true"
              className="h-px flex-1"
              style={{ backgroundColor: "hsl(var(--stage-firstyear-peach-soft) / 0.7)" }}
            />
          </div>
          <ul className="space-y-5">
            {month.items.map((memory, index) => {
              const parsed = parseDateOnly(memory.memory_date);
              const photoUrl = memory.photo_path ? photoUrls?.[memory.photo_path] : undefined;
              const tilt = index % 2 === 0 ? "-rotate-1" : "rotate-1";
              return (
                <li
                  key={memory.id}
                  className={`${FY_CARD_RADIUS} border px-5 py-6 sm:px-7 sm:py-7`}
                  style={FY_PAPER_CARD_STYLE}
                >
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span
                      className={FY_CHIP}
                      style={FY_DATE_CHIP_STYLE}
                    >
                      {parsed ? format(parsed, "EEEE d MMMM") : memory.memory_date}
                    </span>
                    {multiples && (
                      <span
                        className={FY_CHIP}
                        style={{
                          backgroundColor: "hsl(var(--stage-firstyear-soft) / 0.7)",
                          color: "hsl(var(--stage-firstyear-deep))",
                        }}
                      >
                        {memoryScopeLabel(memory, babies)}
                      </span>
                    )}
                  </div>

                  {memory.photo_path && onOpenPhoto && (
                    <button
                      type="button"
                      onClick={() => onOpenPhoto(memory)}
                      className={`${FY_FOCUS_RING} mb-5 block rounded-[16px] border p-2.5 pb-5 transition-transform duration-200 hover:rotate-0 focus-visible:rotate-0 ${tilt}`}
                      style={FY_POLAROID_STYLE}
                    >
                      {photoUrl ? (
                        <img
                          src={photoUrl}
                          alt={
                            memory.title?.trim()
                              ? `Photo for memory: ${memory.title.trim()}`
                              : "Photo saved with this memory"
                          }
                          loading="lazy"
                          className="h-[168px] w-[168px] rounded-[12px] object-cover sm:h-[196px] sm:w-[196px]"
                        />
                      ) : (
                        <span className="flex h-[168px] w-[168px] items-center justify-center rounded-[12px] font-sans text-[12.5px] text-[hsl(var(--stage-firstyear-text-soft))] sm:h-[196px] sm:w-[196px]">
                          Opening photo…
                        </span>
                      )}
                      <span className="mt-3 block max-w-[168px] truncate text-center font-serif text-[12.5px] italic text-[hsl(var(--stage-firstyear-text-soft))] sm:max-w-[196px]">
                        {memory.title?.trim() || (parsed ? format(parsed, "d MMM") : "")}
                      </span>
                    </button>
                  )}

                  {memory.title && (
                    <p className="mb-1.5 font-serif text-[1.12rem] leading-[1.4] text-foreground">
                      {memory.title}
                    </p>
                  )}
                  <p className="whitespace-pre-wrap font-serif text-[15.5px] leading-[1.75] text-[hsl(var(--stage-firstyear-text))]">
                    {memory.note}
                  </p>

                  <div
                    className="mt-5 flex flex-wrap items-center gap-5 border-t pt-4"
                    style={{ borderColor: "hsl(var(--stage-firstyear-peach-soft) / 0.7)" }}
                  >
                    <button
                      type="button"
                      onClick={() => onEdit(memory)}
                      className={QUIET_ACTION_CLASS}
                    >
                      Edit
                    </button>
                    {/* AIC-JA3 — only the stored note travels, and only when
                        the person presses this. Photos never do. */}
                    {memory.note?.trim() && (
                      <AskAboutThisEntry source="first_year_memory" entryId={memory.id} />
                    )}
                    <button
                      type="button"
                      onClick={() => onRemove(memory)}
                      className={QUIET_ACTION_CLASS}
                    >
                      Remove
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
