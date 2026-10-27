import { Fragment } from "react";

const CHAPTERS = [
  { label: "Trying", colour: "var(--ttc-mid)" },
  { label: "Pregnancy", colour: "var(--preg-mid)" },
  { label: "First year", colour: "var(--fy-mid)" },
  { label: "Toddler", colour: "var(--tod-mid)" },
  { label: "Family", colour: "var(--fam-mid)" },
];

interface ChapterDotsProps {
  /** Accessible name; omit to hide the row from assistive technology (it repeats visible content). */
  label?: string;
  /** Closing words shown at the end of the row. */
  closing?: string;
}

/** The five chapter colours in story order, as in the hero and the closing spread. */
export default function ChapterDots({ label, closing }: ChapterDotsProps) {
  return (
    <p className="chapters-row" aria-label={label} aria-hidden={label ? undefined : true}>
      {CHAPTERS.map(({ label: chapter, colour }) => (
        <Fragment key={chapter}>
          <i style={{ background: colour }} />
          {chapter}{" "}
        </Fragment>
      ))}
      {closing ? <span>{closing}</span> : null}
    </p>
  );
}
