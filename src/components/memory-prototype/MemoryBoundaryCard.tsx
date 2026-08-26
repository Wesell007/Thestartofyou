/**
 * Phase 29I — a boundary card.
 *
 * Used for the journal boundary and the sensitive information boundary. There
 * is no toggle in either case, by design: neither is something the person can
 * switch on in this version.
 */

import type { ReactNode } from "react";
import { MEMORY_BODY, MEMORY_CARD_QUIET, MEMORY_HEADING } from "./memoryPrototypeStyles";

interface Props {
  id: string;
  title: string;
  status: string;
  children: ReactNode;
}

const MemoryBoundaryCard = ({ id, title, status, children }: Props) => (
  <section className={`${MEMORY_CARD_QUIET} space-y-3`} aria-labelledby={`${id}-heading`}>
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <h2 id={`${id}-heading`} className={MEMORY_HEADING}>
        {title}
      </h2>
      <span className="inline-flex min-h-7 items-center rounded-pill border border-[hsl(var(--stage-ttc-edge))] bg-[hsl(var(--stage-ttc-peach))] px-3 font-sans text-[12.5px] text-[hsl(var(--stage-ttc-sand))]">
        {status}
      </span>
    </div>
    <div className={MEMORY_BODY}>{children}</div>
  </section>
);

export default MemoryBoundaryCard;
