/**
 * Phase 29I — one permission level.
 *
 * Levels that are available render a prototype switch bound to local state.
 * Sensitive memory renders with no switch at all: it is shown as unavailable,
 * never as something waiting to be turned on.
 */

import { Switch } from "@/components/ui/switch";
import { MEMORY_BODY, MEMORY_CARD, MEMORY_CARD_QUIET } from "./memoryPrototypeStyles";
import type { PrototypeLevel } from "./memoryPrototypeData";

interface Props {
  level: PrototypeLevel;
  checked?: boolean;
  onCheckedChange?: (next: boolean) => void;
}

const MemoryLevelCard = ({ level, checked = false, onCheckedChange }: Props) => {
  const switchId = `memory-level-${level.id}`;

  if (!level.available) {
    return (
      <li className={MEMORY_CARD_QUIET}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h3 className="font-serif text-[18px] leading-snug">{level.title}</h3>
          <span className="inline-flex min-h-7 items-center rounded-pill border border-[hsl(var(--stage-ttc-edge))] bg-[hsl(var(--stage-ttc-blush))] px-3 font-sans text-[12.5px] text-[hsl(var(--stage-ttc-rose))]">
            Not available
          </span>
        </div>
        <p className={`${MEMORY_BODY} mt-2`}>{level.description}</p>
      </li>
    );
  }

  return (
    <li className={MEMORY_CARD}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <label
            htmlFor={switchId}
            className="font-serif text-[18px] leading-snug text-[hsl(var(--stage-ttc-text))]"
          >
            {level.title}
          </label>
          <p className={`${MEMORY_BODY} mt-2`}>{level.description}</p>
        </div>
        <span className="flex min-h-11 min-w-11 shrink-0 items-center justify-center">
          <Switch
            id={switchId}
            checked={checked}
            onCheckedChange={(next) => onCheckedChange?.(next)}
            aria-label={`${level.title} (prototype only)`}
          />
        </span>
      </div>
    </li>
  );
};

export default MemoryLevelCard;
