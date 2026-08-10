import { Link } from "react-router-dom";
import type { FirstYearMemory } from "@/lib/firstYearMemories";

type Props = {
  /** The one or two most recently kept moments, or an empty list. */
  memories: FirstYearMemory[];
};

const truncate = (text: string, max = 70): string =>
  text.length <= max ? text : `${text.slice(0, max).trimEnd()}…`;

/**
 * A quiet doorway to the keepsake space. Lighter than the Today card by
 * design: it never competes with the daily check-in, shows no counts and is
 * not a feed or a timeline.
 */
const MemoriesCard = ({ memories }: Props) => {
  const lines = memories
    .slice(0, 2)
    .map((memory) => (memory.title?.trim() ? memory.title.trim() : truncate(memory.note.trim())))
    .filter((line) => line.length > 0);

  return (
    <section className="pb-8">
      <div className="rounded-[20px] border border-border/50 bg-background/60 px-5 sm:px-7 py-5 sm:py-6">
        <h2 className="font-serif text-[1.15rem] leading-[1.3] text-foreground/90 mb-1.5">
          Memories
        </h2>
        <p className="font-sans text-[13.5px] leading-[1.65] text-foreground/65 max-w-[46ch]">
          A place to keep the small things you want to remember.
        </p>
        {lines.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {lines.map((line, index) => (
              <li
                key={index}
                className="font-serif text-[14px] leading-[1.6] text-foreground/75"
              >
                {line}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-3">
          <Link
            to="/my-first-year/memories"
            className="inline-flex min-h-11 items-center rounded-sm font-sans text-[13.5px] text-foreground/70 underline underline-offset-4 decoration-border transition-colors hover:decoration-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2"
          >
            {lines.length > 0 ? "Look back at your memories" : "Keep a moment"}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MemoriesCard;
