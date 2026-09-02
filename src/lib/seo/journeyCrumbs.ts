import type { BreadcrumbItem } from "@/lib/seo/breadcrumbs";

/**
 * Canonical breadcrumb roots (WC-3c).
 *
 * A deliberately narrow set of stable journey roots so every visible
 * breadcrumb trail starts from the same authoritative labels and hrefs.
 * This is NOT a navigation registry: it holds no route-specific data and
 * no content ownership mapping.
 */
export const HOME_CRUMB: BreadcrumbItem = { label: "Home", href: "/" };
export const PREGNANCY_CRUMB: BreadcrumbItem = { label: "Pregnancy", href: "/pregnancy" };
export const TTC_CRUMB: BreadcrumbItem = { label: "Trying to conceive", href: "/trying-to-conceive" };
export const IVF_CRUMB: BreadcrumbItem = { label: "IVF", href: "/ivf" };
export const FIRST_YEAR_CRUMB: BreadcrumbItem = { label: "First year", href: "/first-year" };
export const TODDLER_CRUMB: BreadcrumbItem = { label: "Toddler", href: "/toddler" };
export const FAMILY_CRUMB: BreadcrumbItem = { label: "Family", href: "/family" };
