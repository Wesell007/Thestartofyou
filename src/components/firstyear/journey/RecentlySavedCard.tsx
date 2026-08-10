import { Link } from "react-router-dom";
import { format } from "date-fns";
import { parseDateOnly } from "@/lib/dateOnly";
import { KIND_LABELS, localDateKey } from "@/lib/firstYearEntriesSchema";
import type { FirstYearEntry } from "@/lib/firstYearEntries";

type Props = {
  /** Recent entries, newest day first, exactly as `getRecentEntries` returns them. */
  entries: FirstYearEntry[];
};

const truncate = (text: string, max = 90): string =>
  text.length <= max ? text : `${text.slice(0, max).trimEnd()}…`;

/**
 * A very light glance at what has already been written: three lines at most,
 * from one day only. Not a feed, not a timeline, no counts and no streaks.
 * Renders nothing when there is nothing saved, so the home stays quiet for a
 * parent who has not written yet.
 */
const RecentlySavedCard = ({ entries }: Props) => {
  const withNotes = entries.filter((entry) => (entry.note ?? "").trim().length > 0);
  if (withNotes.length === 0) return null;

  const today = localDateKey();
  const day = withNotes.some((entry) => entry.entry_date === today)
    ? today
    : withNotes[0].entry_date;
  const lines = withNotes.filter((entry) => entry.entry_date === day).slice(0, 3);
  if (lines.length === 0) return null;

  const parsed = parseDateOnly(day);
  const label =
    day === today
      ? "Saved today"
      : parsed
        ? `Saved on ${format(parsed, "EEEE d MMMM")}`
        : "Saved recently";

  return (
    <section className="pb-8">
      <div
        className="rounded-[20px] border px-5 sm:px-7 py-5 sm:py-6"
        style={{
          borderColor: "hsl(var(--stage-firstyear-accent) / 0.14)",
          backgroundColor: "hsl(var(--stage-firstyear) / 0.35)",
        }}
      >
        <p
          className="font-sans text-[10.5px] font-medium tracking-[0.3em] uppercase mb-3"
          style={{ color: "hsl(var(--stage-firstyear-accent))" }}
        >
          {label}
        </p>
        <ul className="space-y-2.5">
          {lines.map((entry) => (
            <li
              key={entry.id}
              className="font-sans text-[13.5px] leading-[1.65] text-foreground/75"
            >
              <span className="text-foreground/55">{KIND_LABELS[entry.kind]}: </span>
              {truncate((entry.note ?? "").trim())}
            </li>
          ))}
        </ul>
        <div className="mt-3">
          <Link
            to="/my-first-year/today"
            className="inline-flex min-h-11 items-center rounded-sm font-sans text-[13.5px] text-foreground/70 underline underline-offset-4 decoration-border transition-colors hover:decoration-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            Open your notes
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentlySavedCard;
