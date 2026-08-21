import { Link } from "react-router-dom";
import { BookMarked } from "lucide-react";
import {
  PG_CARD_PAD,
  PG_CARD_RADIUS,
  PG_HELPER,
  PG_ICON_BUBBLE,
  PG_QUIET_LINK,
} from "./pregnancyStyles";

export type JournalBridgeVariant = "owner" | "discovery";

interface Props {
  /**
   * "owner" speaks to someone who already has the physical journal.
   * "discovery" is the quiet, non-selling cue for everyone else.
   * Presentation only: no ownership state is read or written in this phase.
   */
  variant?: JournalBridgeVariant;
  className?: string;
}

const COPY: Record<
  JournalBridgeVariant,
  { title: string; body: string; linkLabel?: string }
> = {
  owner: {
    title: "This week also has space in your journal.",
    body: "Keep the quick moments here, and the longer story by hand.",
  },
  discovery: {
    title: "Some things are nicer written by hand.",
    body: "The physical journal gives you a place to keep this story offline too.",
    linkLabel: "See the journal",
  },
};

/**
 * Phase 27B — quiet bridge between the app and the physical journal.
 * One card, two tones of voice, no hard sell and no purchase flow.
 */
const JournalBridgeCard = ({ variant = "discovery", className = "" }: Props) => {
  const copy = COPY[variant];

  return (
    <aside
      className={`pregnancy-paper pregnancy-wash ${PG_CARD_RADIUS} ${PG_CARD_PAD} ${className}`}
    >
      <span aria-hidden="true" className={`${PG_ICON_BUBBLE} mb-4`}>
        <BookMarked
          size={15}
          strokeWidth={1.6}
          className="text-[hsl(var(--stage-pregnancy-accent))]"
        />
      </span>
      <p className="font-serif text-[1.15rem] sm:text-[1.24rem] font-medium leading-[1.35] text-foreground max-w-[30ch]">
        {copy.title}
      </p>
      <p className={`${PG_HELPER} mt-2.5 max-w-[46ch]`}>{copy.body}</p>
      {copy.linkLabel && (
        <Link to="/journal" className={`${PG_QUIET_LINK} mt-2`}>
          {copy.linkLabel}
        </Link>
      )}
    </aside>
  );
};

export default JournalBridgeCard;
