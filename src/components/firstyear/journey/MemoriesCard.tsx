import { Link } from "react-router-dom";
import { format } from "date-fns";
import { parseDateOnly } from "@/lib/dateOnly";
import type { FirstYearMemory } from "@/lib/firstYearMemories";
import { FY_FOCUS_RING } from "./firstYearStyles";

type Props = {
  /** The one or two most recently kept moments, or an empty list. */
  memories: FirstYearMemory[];
};

const truncate = (text: string, max = 70): string =>
  text.length <= max ? text : `${text.slice(0, max).trimEnd()}…`;

const dateRibbon = (value: string | null | undefined): string | null => {
  const parsed = value ? parseDateOnly(value) : null;
  return parsed ? format(parsed, "d MMM") : null;
};

/**
 * A keepsake doorway, warmer than the guidance sections and lighter than the
 * Today card. Shows the last kept moments only: no counts, no gallery and no
 * extra photo loading.
 */
const MemoriesCard = ({ memories }: Props) => {
  const lines = memories
    .slice(0, 2)
    .map((memory) => ({
      key: memory.id,
      label: memory.title?.trim() ? memory.title.trim() : truncate(memory.note.trim()),
      date: dateRibbon(memory.memory_date),
    }))
    .filter((line) => line.label.length > 0);

  return (
    <section className="pb-10" aria-labelledby="memories-card">
      <div
        className="rounded-[22px] border px-5 sm:px-7 py-6 sm:py-7"
        style={{
          borderColor: "hsl(var(--stage-firstyear-peach-soft) / 0.7)",
          background: "var(--gradient-firstyear-memories)",
        }}
      >
        <p
          className="font-sans text-[10.5px] font-medium tracking-[0.3em] uppercase mb-2.5"
          style={{ color: "hsl(var(--stage-firstyear-peach-accent))" }}
        >
          Keepsakes
        </p>
        <h2
          id="memories-card"
          className="font-serif text-[1.3rem] sm:text-[1.45rem] leading-[1.25] text-foreground/90 mb-1.5"
        >
          Memories
        </h2>
        <p className="font-sans text-[14px] leading-[1.7] text-foreground/70 max-w-[46ch]">
          A place to keep the small things you want to remember, in your own words.
        </p>

        {lines.length > 0 && (
          <ul className="mt-4 space-y-2.5 list-none p-0 m-0">
            {lines.map((line) => (
              <li key={line.key} className="flex items-start gap-3">
                {line.date && (
                  <span
                    className="mt-0.5 shrink-0 rounded-full px-2.5 py-0.5 font-sans text-[10.5px] tracking-[0.08em] uppercase"
                    style={{
                      color: "hsl(var(--stage-firstyear-peach-accent))",
                      backgroundColor: "hsl(var(--stage-firstyear-cream))",
                      border: "1px solid hsl(var(--stage-firstyear-peach-soft) / 0.8)",
                    }}
                  >
                    {line.date}
                  </span>
                )}
                <span className="font-serif text-[14.5px] leading-[1.6] text-foreground/80">
                  {line.label}
                </span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5">
          <Link
            to="/my-first-year/memories"
            className={`inline-flex min-h-11 items-center justify-center rounded-pill px-6 py-2.5 font-sans text-sm font-medium transition-colors ${FY_FOCUS_RING}`}
            style={{
              backgroundColor: "hsl(var(--stage-firstyear-cream))",
              color: "hsl(var(--stage-firstyear-peach-accent))",
              border: "1px solid hsl(var(--stage-firstyear-peach-soft))",
            }}
          >
            {lines.length > 0 ? "Look back at your memories" : "Keep your first moment"}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MemoriesCard;
