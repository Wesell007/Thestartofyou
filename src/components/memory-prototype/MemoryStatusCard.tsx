/**
 * Phase 29I — memory status card. Display only, driven by local prototype
 * state passed down from the page. No persistence, no network.
 */

import { MEMORY_BODY, MEMORY_CARD, MEMORY_HEADING } from "./memoryPrototypeStyles";

export interface MemoryStatusRow {
  label: string;
  value: string;
}

interface Props {
  rows: MemoryStatusRow[];
}

const MemoryStatusCard = ({ rows }: Props) => (
  <section className={MEMORY_CARD} aria-labelledby="memory-status-heading">
    <h2 id="memory-status-heading" className={MEMORY_HEADING}>
      Where things stand
    </h2>
    <p className={`${MEMORY_BODY} mt-2`}>
      A plain summary of the prototype state you are looking at right now.
    </p>
    <dl className="mt-5 divide-y divide-[hsl(var(--stage-ttc-edge)/0.6)]">
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex min-h-11 flex-wrap items-center justify-between gap-x-4 gap-y-1 py-3"
        >
          <dt className="font-sans text-[15px] font-light text-[hsl(var(--stage-ttc-text))]">
            {row.label}
          </dt>
          <dd className="font-sans text-[14px] font-normal text-[hsl(var(--stage-ttc-olive))]">
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  </section>
);

export default MemoryStatusCard;
