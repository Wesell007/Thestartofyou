/**
 * Phase 29I — remembered items preview.
 *
 * The items are the three approved synthetic examples. Edit, review and delete
 * are prototype-only: edit and review announce that they are not built yet,
 * delete removes the row from local component state and nothing else.
 */

import { Pencil, Clock3, Trash2 } from "lucide-react";
import {
  MEMORY_BODY,
  MEMORY_CARD,
  MEMORY_FOCUS_RING,
  MEMORY_HEADING,
  MEMORY_TAP,
} from "./memoryPrototypeStyles";
import type { PrototypeMemoryItem } from "./memoryPrototypeData";

interface Props {
  items: PrototypeMemoryItem[];
  onEdit: (item: PrototypeMemoryItem) => void;
  onReview: (item: PrototypeMemoryItem) => void;
  onDelete: (item: PrototypeMemoryItem) => void;
}

const actionClass = `${MEMORY_TAP} border border-[hsl(var(--stage-ttc-edge))] text-[hsl(var(--stage-ttc-text-soft))] hover:bg-[hsl(var(--stage-ttc-sage-tint))] ${MEMORY_FOCUS_RING}`;

const RememberedItemsPreview = ({ items, onEdit, onReview, onDelete }: Props) => (
  <section className={MEMORY_CARD} aria-labelledby="remembered-items-heading">
    <h2 id="remembered-items-heading" className={MEMORY_HEADING}>
      What a remembered item would look like
    </h2>
    <p className={`${MEMORY_BODY} mt-2`}>
      These are made-up examples for review. They are not yours, and nothing here is stored.
    </p>

    {items.length === 0 ? (
      <p className={`${MEMORY_BODY} mt-5`}>
        There is nothing in this list. In a future version, this is where anything you chose to save
        would appear.
      </p>
    ) : (
      <ul className="mt-5 space-y-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="rounded-[18px] border border-[hsl(var(--stage-ttc-edge)/0.8)] bg-[hsl(var(--stage-ttc-cream-soft)/0.55)] p-4 sm:p-5"
          >
            <p className="font-sans text-[15px] font-normal text-[hsl(var(--stage-ttc-text))]">
              {item.label}
            </p>
            <p className="mt-1 font-sans text-[13.5px] font-light text-[hsl(var(--stage-ttc-text-soft))]">
              {item.category} · {item.note}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" className={actionClass} onClick={() => onEdit(item)}>
                <Pencil size={14} aria-hidden="true" /> Edit
              </button>
              <button type="button" className={actionClass} onClick={() => onReview(item)}>
                <Clock3 size={14} aria-hidden="true" /> Review
              </button>
              <button
                type="button"
                className={`${actionClass} text-[hsl(var(--stage-ttc-rose))]`}
                onClick={() => onDelete(item)}
              >
                <Trash2 size={14} aria-hidden="true" /> Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    )}
  </section>
);

export default RememberedItemsPreview;
