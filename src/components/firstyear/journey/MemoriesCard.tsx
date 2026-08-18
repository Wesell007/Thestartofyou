import { Link } from "react-router-dom";
import { format } from "date-fns";
import { parseDateOnly } from "@/lib/dateOnly";
import type { FirstYearMemory } from "@/lib/firstYearMemories";
import {
  FY_CARD_RADIUS,
  FY_CTA_SOFT,
  FY_KICKER,
  FY_SHADOW_SOFT,
} from "./firstYearStyles";

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

/** The slight tilt that gives the kept moments their paper-card feel. */
const TILTS = ["-rotate-2", "rotate-1"];

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
        className={`${FY_CARD_RADIUS} border px-5 sm:px-8 py-7 sm:py-9`}
        style={{
          borderColor: "hsl(var(--stage-firstyear-peach-accent) / 0.24)",
          background:
            "linear-gradient(152deg, hsl(var(--stage-firstyear-peach)) 0%, hsl(var(--stage-firstyear-hero) / 0.75) 52%, hsl(var(--stage-firstyear-cream)) 100%)",
          boxShadow: FY_SHADOW_SOFT,
        }}
      >
        <span
          className={`${FY_KICKER} mb-3`}
          style={{
            color: "hsl(var(--parchment))",
            backgroundColor: "hsl(var(--stage-firstyear-peach-accent))",
          }}
        >
          Keepsakes
        </span>
        <h2
          id="memories-card"
          className="font-serif text-[1.6rem] sm:text-[1.85rem] leading-[1.14] text-foreground mb-2"
        >
          Memories
        </h2>
        <p className="font-sans text-[14.5px] leading-[1.72] text-foreground/80 max-w-[46ch]">
          A place to keep the small things you want to remember, in your own words.
        </p>

        {lines.length > 0 ? (
          <ul className="mt-6 flex flex-wrap gap-4 list-none p-0 m-0">
            {lines.map((line, index) => (
              <li
                key={line.key}
                className={`w-full sm:w-[calc(50%-0.5rem)] rounded-[14px] px-4 pt-4 pb-6 transition-transform ${TILTS[index % TILTS.length]}`}
                style={{
                  backgroundColor: "hsl(var(--parchment))",
                  border: "1px solid hsl(var(--stage-firstyear-peach-accent) / 0.18)",
                  boxShadow: "0 16px 34px -26px hsl(var(--stage-firstyear-peach-accent) / 0.7)",
                }}
              >
                {line.date && (
                  <span
                    className="mb-2 inline-flex rounded-full px-2.5 py-0.5 font-sans text-[10.5px] font-semibold tracking-[0.14em] uppercase"
                    style={{
                      color: "hsl(var(--stage-firstyear-peach-accent))",
                      backgroundColor: "hsl(var(--stage-firstyear-peach) / 0.65)",
                    }}
                  >
                    {line.date}
                  </span>
                )}
                <span className="block font-serif text-[15.5px] leading-[1.55] text-foreground/90 break-words">
                  {line.label}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div
            className="mt-6 rounded-[14px] -rotate-1 px-4 py-6"
            style={{
              backgroundColor: "hsl(var(--parchment))",
              border: "1px dashed hsl(var(--stage-firstyear-peach-accent) / 0.3)",
            }}
          >
            <p className="font-serif text-[15px] leading-[1.6] text-foreground/70">
              Your first kept moment will sit here.
            </p>
          </div>
        )}

        <div className="mt-7">
          <Link
            to="/my-first-year/memories"
            className={FY_CTA_SOFT}
            style={{
              backgroundColor: "hsl(var(--stage-firstyear-peach-accent))",
              color: "hsl(var(--parchment))",
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
