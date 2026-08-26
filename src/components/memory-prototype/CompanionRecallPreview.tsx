/**
 * Phase 29I — "What does my companion remember?" preview.
 *
 * A small viewer so all three states can be reviewed side by side: memory off,
 * memory on with nothing kept, and memory on with the synthetic examples. Pure
 * local state; no companion call, no AI request, no data.
 */

import {
  MEMORY_BODY,
  MEMORY_CARD,
  MEMORY_FOCUS_RING,
  MEMORY_HEADING,
  MEMORY_TAP,
} from "./memoryPrototypeStyles";
import type { PrototypeMemoryItem } from "./memoryPrototypeData";

export type RecallState = "off" | "empty" | "items";

const STATES: Array<{ id: RecallState; label: string }> = [
  { id: "off", label: "Memory off" },
  { id: "empty", label: "Nothing kept yet" },
  { id: "items", label: "Example items" },
];

interface Props {
  state: RecallState;
  onStateChange: (next: RecallState) => void;
  items: PrototypeMemoryItem[];
}

const CompanionRecallPreview = ({ state, onStateChange, items }: Props) => (
  <section className={MEMORY_CARD} aria-labelledby="recall-heading">
    <h2 id="recall-heading" className={MEMORY_HEADING}>
      What does my companion remember?
    </h2>
    <p className={`${MEMORY_BODY} mt-2`}>
      A preview of the answer someone would see if they asked. Switch between the states to review
      the wording.
    </p>

    <div
      className="mt-5 flex flex-wrap gap-2"
      role="group"
      aria-label="Preview state (prototype only)"
    >
      {STATES.map((option) => {
        const active = option.id === state;
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={active}
            onClick={() => onStateChange(option.id)}
            className={`${MEMORY_TAP} border ${MEMORY_FOCUS_RING} ${
              active
                ? "border-transparent bg-[hsl(var(--stage-ttc-olive))] text-[hsl(var(--stage-ttc-cream))]"
                : "border-[hsl(var(--stage-ttc-edge))] text-[hsl(var(--stage-ttc-text-soft))] hover:bg-[hsl(var(--stage-ttc-sage-tint))]"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>

    <div
      className="mt-5 rounded-[18px] border border-[hsl(var(--stage-ttc-edge)/0.8)] bg-[hsl(var(--stage-ttc-sage-tint)/0.55)] p-5"
      aria-live="polite"
    >
      {state === "off" && (
        <p className={MEMORY_BODY}>
          Memory is off for now, so there is nothing kept. Your companion starts fresh each time you
          come back.
        </p>
      )}
      {state === "empty" && (
        <p className={MEMORY_BODY}>
          Nothing has been kept yet. When you choose to save something, it will be listed here in
          plain words.
        </p>
      )}
      {state === "items" && (
        <>
          <p className={MEMORY_BODY}>Here is everything kept at the moment:</p>
          <ul className="mt-3 space-y-2">
            {items.map((item) => (
              <li
                key={item.id}
                className="font-sans text-[15px] font-light text-[hsl(var(--stage-ttc-text))]"
              >
                {item.label}
              </li>
            ))}
          </ul>
          <p className={`${MEMORY_BODY} mt-3`}>
            You can change or remove any of these whenever you like.
          </p>
        </>
      )}
    </div>
  </section>
);

export default CompanionRecallPreview;
