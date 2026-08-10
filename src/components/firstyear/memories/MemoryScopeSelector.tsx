import type { BabyRecord } from "@/lib/firstYearJourney";
import type { MemoryScope } from "@/lib/firstYearMemoriesSchema";

export const babyDisplayName = (baby: BabyRecord, index: number): string =>
  baby.name?.trim() ? baby.name.trim() : `Baby ${baby.birth_order ?? index + 1}`;

export const ALL_BABIES_VALUE = "__all_babies__";
export const FAMILY_VALUE = "__family__";

/** One selector value covers both the scope and the baby it points at. */
export type ScopeValue = string;

export const scopeValueToDraft = (
  value: ScopeValue,
): { scope: MemoryScope; babyId: string | null } => {
  if (value === FAMILY_VALUE) return { scope: "family", babyId: null };
  if (value === ALL_BABIES_VALUE) return { scope: "all_babies", babyId: null };
  return { scope: "baby", babyId: value };
};

export const draftToScopeValue = (scope: MemoryScope, babyId: string | null): ScopeValue => {
  if (scope === "family") return FAMILY_VALUE;
  if (scope === "all_babies") return ALL_BABIES_VALUE;
  return babyId ?? FAMILY_VALUE;
};

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
      <legend className="font-sans text-[13px] font-medium text-foreground/80 mb-2">
        Who is this moment about?
      </legend>
      <div role="radiogroup" aria-label="Who is this moment about?" className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <label
              key={option.value}
              className={`flex min-h-11 cursor-pointer items-center rounded-pill border px-5 py-2 font-sans text-[13px] transition-colors focus-within:ring-2 focus-within:ring-sage focus-within:ring-offset-2 focus-within:ring-offset-background ${
                selected
                  ? "border-sage bg-sage/12 text-foreground"
                  : "border-border/60 bg-parchment text-foreground/70 hover:border-foreground/25"
              }`}
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
