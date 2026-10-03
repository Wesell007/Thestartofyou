import type { BabyRecord } from "@/lib/firstYearJourney";
import type { MemoryScope } from "@/lib/firstYearMemoriesSchema";
import {
  FY_CHIP_BASE,
  FY_CHIP_IDLE,
  FY_CHIP_SELECTED,
  FY_SHEET_LEGEND,
} from "@/components/firstyear/journey/firstYearStyles";
import { ALL_BABIES_VALUE, FAMILY_VALUE, babyDisplayName, type ScopeValue } from "./memoryScope";

type Props = {
  babies: BabyRecord[];
  value: ScopeValue;
  onChange: (value: ScopeValue) => void;
};

/**
 * Who a kept moment is for. Only shown for multiples: with one baby the moment
 * simply belongs to them. A real radio group, so keyboard and screen reader
 * users get arrow-key selection and a single tab stop.
 */
const MemoryScopeSelector = ({ babies, value, onChange }: Props) => {
  if (babies.length < 2) return null;

  const options = [
    { value: FAMILY_VALUE, label: "Your family" },
    { value: ALL_BABIES_VALUE, label: "All babies" },
    ...babies.map((baby, index) => ({ value: baby.id, label: babyDisplayName(baby, index) })),
  ];

  return (
    <fieldset className="mb-5">
      <legend className={FY_SHEET_LEGEND}>Who is this moment about?</legend>
      <div role="radiogroup" aria-label="Who is this moment about?" className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <label
              key={option.value}
              className={`${FY_CHIP_BASE} ${selected ? FY_CHIP_SELECTED : FY_CHIP_IDLE}`}
            >
              <input
                type="radio"
                name="first-year-memory-scope"
                className="sr-only"
                value={option.value}
                checked={selected}
                onChange={() => onChange(option.value)}
              />
              {option.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
};

export default MemoryScopeSelector;
