/**
 * Phase 29I — design prototype routes.
 *
 * Prototype routes are fully isolated surfaces: no persistence, no storage,
 * no network, no Supabase, no companion and no analytics. This module is the
 * single source of truth for recognising them, mirroring the companion
 * suppression predicate in `companionSurface.ts`.
 */

export const PROTOTYPE_ROUTE_PREFIX = "/prototype";

/** True for `/prototype`, `/prototype/…` and their trailing-slash forms. */
export function isPrototypeRoute(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  const path = pathname.replace(/\/+$/, "") || "/";
  return (
    path === PROTOTYPE_ROUTE_PREFIX ||
    path.startsWith(`${PROTOTYPE_ROUTE_PREFIX}/`)
  );
}
