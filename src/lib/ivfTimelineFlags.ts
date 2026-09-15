/**
 * Phase 34G — IVF timeline save feature flag.
 *
 * Defaults OFF. Nothing is wired to this flag during Phase 34G: no save,
 * update or clear control renders anywhere. Activation is gated on privacy and
 * legal review plus an approved save experience.
 */
export const IVF_TIMELINE_SAVE_ENABLED =
  String(import.meta.env.VITE_IVF_TIMELINE_SAVE_ENABLED ?? "").toLowerCase() === "true";
