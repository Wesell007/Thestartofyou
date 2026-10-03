import type { BabyRecord } from "@/lib/firstYearJourney";
import type { FirstYearMemory } from "@/lib/firstYearMemories";
import type { MemoryScope } from "@/lib/firstYearMemoriesSchema";

/**
 * Who a kept moment is about: the selector values and their plain-words labels.
 * Kept in a component-free module so the memory components export components
 * only and React Fast Refresh can keep their state.
 */

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

/** Who a kept moment is about, in plain words. */
export const memoryScopeLabel = (memory: FirstYearMemory, babies: BabyRecord[]): string => {
  if (memory.memory_scope === "family") return "Your family";
  if (memory.memory_scope === "all_babies") return "All babies";
  const index = babies.findIndex((baby) => baby.id === memory.baby_id);
  const baby = babies[index];
  return baby ? babyDisplayName(baby, index) : "Your baby";
};
