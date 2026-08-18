import { Link } from "react-router-dom";
import { format } from "date-fns";
import { parseDateOnly } from "@/lib/dateOnly";
import type { FirstYearMemory } from "@/lib/firstYearMemories";
import { FY_CTA_SOFT, FY_KICKER } from "./firstYearStyles";

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
        className="rounded-[24px] border px-5 sm:px-8 py-7 sm:py-8"
        style={{
          borderColor: "hsl(var(--stage-firstyear-peach-accent) / 0.28)",
          background:
            "linear-gradient(150deg, hsl(var(--stage-firstyear-peach-soft) / 0.85) 0%, hsl(var(--stage-firstyear-peach) / 0.9) 40%, hsl(var(--stage-firstyear-cream)) 100%)",
          boxShadow: "0 24px 56px -38px hsl(var(--stage-firstyear-peach-accent) / 0.6)",
        }}
      >
        <span
          className={`${FY_KICKER} mb-3`}
          style={{
            color: "hsl(var(--stage-firstyear-peach-accent))",
            backgroundColor: "hsl(var(--stage-firstyear-cream))",
            border: "1px solid hsl(var(--stage-firstyear-peach-accent) / 0.25)",
          }}
        >
          Keepsakes
        </span>
        <h2
          id="memories-card"
          className="font-serif text-[1.45rem] sm:text-[1.6rem] leading-[1.2] text-foreground mb-2"
        >
          Memories
        </h2>
        <p className="font-sans text-[14.5px] leading-[1.72] text-foreground/80 max-w-[46ch]">
          A place to keep the small things you want to remember, in your own words.
        </p>

        {lines.length > 0 && (
          <ul className="mt-5 space-y-3 list-none p-0 m-0">
            {lines.map((line) => (
              <li key={line.key} className="flex items-start gap-3">
                {line.date && (
                  <span
                    className="mt-0.5 shrink-0 rounded-full px-2.5 py-1 font-sans text-[10.5px] font-semibold tracking-[0.1em] uppercase"
                    style={{
                      color: "hsl(var(--stage-firstyear-peach-accent))",
                      backgroundColor: "hsl(var(--stage-firstyear-cream))",
                      border: "1px solid hsl(var(--stage-firstyear-peach-accent) / 0.25)",
                    }}
                  >
                    {line.date}
                  </span>
                )}
                <span className="font-serif text-[15px] leading-[1.6] text-foreground/90">
                  {line.label}
                </span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6">
          <Link
            to="/my-first-year/memories"
            className={FY_CTA_SOFT}
            style={{
              backgroundColor: "hsl(var(--stage-firstyear-cream))",
              color: "hsl(var(--stage-firstyear-peach-accent))",
              border: "1px solid hsl(var(--stage-firstyear-peach-accent) / 0.35)",
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
