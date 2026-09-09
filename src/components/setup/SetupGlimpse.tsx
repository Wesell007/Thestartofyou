/**
 * SetupGlimpse — a small static illustration of what a saved journey looks
 * like, shown beside the setup form.
 *
 * Illustrative only. It reads nothing, mounts no protected component, and
 * shows no personal or customer data.
 */

import type { SetupStage } from "@/components/setup/SetupShell";

const ACCENT: Record<SetupStage, string> = {
  ttc: "--stage-ttc-accent",
  pregnancy: "--stage-pregnancy-accent",
  firstyear: "--stage-firstyear-accent",
};

interface Props {
  stage: SetupStage;
  kicker: string;
  title: string;
  lines: string[];
  /** Optional live line, derived from what the person just entered. */
  highlight?: string;
}

const SetupGlimpse = ({ stage, kicker, title, lines, highlight }: Props) => {
  const accent = ACCENT[stage];
  return (
    <div
      className="rounded-[20px] border bg-card/80 px-5 py-6 shadow-soft"
      style={{ borderColor: `hsl(var(${accent}) / 0.22)` }}
    >
      <p
        className="font-sans text-[10px] font-medium uppercase tracking-[0.28em]"
        style={{ color: `hsl(var(${accent}))` }}
      >
        {kicker}
      </p>
      <p className="mt-3 font-serif text-[1.3rem] leading-snug text-foreground">{title}</p>
      {highlight ? (
        <p className="mt-2 font-serif italic text-[15px] text-muted-foreground">{highlight}</p>
      ) : null}
      <ul className="mt-4 space-y-2.5">
        {lines.map((line) => (
          <li
            key={line}
            className="font-sans text-[13px] font-light leading-relaxed text-muted-foreground flex gap-2.5"
          >
            <span
              aria-hidden="true"
              className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: `hsl(var(${accent}) / 0.55)` }}
            />
            {line}
          </li>
        ))}
      </ul>
      <p className="mt-5 border-t border-border/40 pt-3 font-sans text-[11.5px] font-light text-muted-foreground/70">
        An illustration of the space, not your saved content.
      </p>
    </div>
  );
};

export default SetupGlimpse;
