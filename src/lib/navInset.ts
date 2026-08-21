/**
 * Shared bottom-nav inset contract.
 *
 * While a fixed mobile journey bar is visible, the active shell publishes this
 * custom property on the document element. Anything else pinned to the bottom
 * of the viewport (the analytics consent banner) reads it and lifts itself
 * clear of the bar instead of covering it.
 *
 * It is published only while a bar is actually on screen, and removed as soon
 * as the bar is hidden or the route leaves the signed-in shell.
 */
export const NAV_INSET_VAR = "--app-bottom-nav-inset";
export const NAV_INSET_VALUE = "calc(3.75rem + env(safe-area-inset-bottom))";
