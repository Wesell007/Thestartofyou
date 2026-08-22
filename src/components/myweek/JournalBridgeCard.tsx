import { Link } from "react-router-dom";
import { BookMarked } from "lucide-react";
import {
  PG_CARD_PAD,
  PG_CARD_RADIUS,
  PG_HELPER,
  PG_ICON_BUBBLE,
  PG_QUIET_LINK,
} from "./pregnancyStyles";
import { JournalCornerMark, SmallSprig, WatercolourWash } from "./PregnancyDecor";

export type JournalBridgeVariant = "owner" | "discovery";
export type JournalBridgeContext = "week" | "journey" | "toolkit";
export type JournalBridgeTone = "card" | "inline";

interface Props {
  /** Where the card sits, which decides the copy. */
  context?: JournalBridgeContext;
  /**
   * "owner" speaks to someone who already has the physical journal.
   * "discovery" is the quiet cue for everyone else.
   * Presentation only: no ownership state is read or written.
   */
  variant?: JournalBridgeVariant;
  /** "inline" is the compact toolkit cue. */
  tone?: JournalBridgeTone;
  className?: string;
}

const LINK_LABEL = "See the journal";

type BridgeCopy = { title: string; body: string };

/**
 * Owner copy speaks to a journal that is already on the shelf. Discovery copy
 * stays neutral and never assumes anyone owns one. Presentation only.
 */
const COPY: Record<JournalBridgeVariant, Record<JournalBridgeContext, BridgeCopy>> = {
  owner: {
    week: {
      title: "This week also has space in your journal.",
      body: "Keep the quick moments here, and the longer story by hand.",
    },
    journey: {
      title: "Your journal holds the longer version of this.",
      body: "Keep the quick moments here, and the fuller story by hand.",
    },
    toolkit: {
      title: "There is space for this in your journal too.",
      body: "Use the app for quick edits, and your journal for the keepsake version.",
    },
  },
  discovery: {
    week: {
      title: "There is a paper version of this week too.",
      body: "Some people like to keep the longer story by hand.",
    },
    journey: {
      title: "Some things are nicer written by hand.",
      body: "The physical journal gives you a place to keep this story offline too.",
    },
    toolkit: {
      title: "There is space for this in the journal too.",
      body: "Use the app for quick edits, and paper for the keepsake version.",
    },
  },
};

/**
 * Phase 27E — quiet bridge between the app and the physical journal.
 * One shared component, contextual copy, no hard sell and no purchase flow.
 */
const JournalBridgeCard = ({
  context = "journey",
  variant = "discovery",
  tone = "card",
  className = "",
}: Props) => {
  const copy = COPY[context];

  if (tone === "inline") {
    return (
      <aside
        data-journal-bridge={variant}
        className={`pregnancy-paper relative overflow-hidden rounded-[18px] px-5 py-4 sm:px-6 sm:py-5 ${className}`}
      >
        <SmallSprig className="-right-5 -bottom-6 w-[86px] rotate-12" opacity={0.28} />
        <div className="relative flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p className={`${PG_HELPER} max-w-[46ch]`}>
            {copy.title} {copy.body}
          </p>
          <Link to="/journal" className={`${PG_QUIET_LINK} shrink-0`}>
            {LINK_LABEL}
          </Link>
        </div>
      </aside>
    );
  }

  return (
    <aside
      data-journal-bridge={variant}
      className={`pregnancy-paper relative overflow-hidden ${PG_CARD_RADIUS} ${PG_CARD_PAD} ${className}`}
    >
      <WatercolourWash tone="sage" opacity={0.34} className="!absolute" />
      <JournalCornerMark className="right-7 -top-1 w-[26px]" opacity={0.85} />
      <SmallSprig className="-left-4 -bottom-5 w-[104px] -rotate-12" opacity={0.34} />
      <div className="relative">
        <span aria-hidden="true" className={`${PG_ICON_BUBBLE} mb-4`}>
          <BookMarked
            size={15}
            strokeWidth={1.6}
            className="text-[hsl(var(--stage-pregnancy-accent))]"
          />
        </span>
        <p className="font-serif text-[1.2rem] sm:text-[1.34rem] font-medium leading-[1.32] text-foreground max-w-[26ch]">
          {copy.title}
        </p>
        <p className={`${PG_HELPER} mt-2.5 max-w-[42ch]`}>{copy.body}</p>
        <Link to="/journal" className={`${PG_QUIET_LINK} mt-2`}>
          {LINK_LABEL}
        </Link>
      </div>
    </aside>
  );
};

export default JournalBridgeCard;
