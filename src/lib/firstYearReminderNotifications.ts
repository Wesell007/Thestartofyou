/**
 * Device-level helpers for parent-set reminder notifications.
 *
 * Pure browser work only: no Supabase, no AI, no service worker, no push, no
 * background scheduling. A notification is only ever raised for a reminder the
 * parent set themselves, at the time they chose, while the page is open.
 *
 * The browser permission state is always the source of truth. The stored
 * preference only records that this app may attempt app-open notifications on
 * this device while permission is granted.
 */

import type { Reminder } from "@/lib/firstYearRemindersSchema";

/** Deliberately generic. Nothing private is ever placed in a notification. */
export const NOTIFICATION_TITLE = "The Start of You reminder";
export const NOTIFICATION_BODY = "A reminder you set is due.";

export type NotificationSupport = "unsupported" | "granted" | "denied" | "default";

export type ReminderNotificationState = "unsupported" | "off" | "requesting" | "on" | "blocked";

/** A single delivered occurrence. Technical fields only, never any content. */
export type DeliveredOccurrence = { id: string; dueAt: string };

const MAX_DELIVERED = 60;

export const preferenceKey = (userId: string) =>
  `firstYearReminderNotifications:${userId}:preference`;
export const deliveredKey = (userId: string) =>
  `firstYearReminderNotifications:${userId}:delivered`;

type MaybeNotification = typeof Notification | undefined;

const notificationApi = (): MaybeNotification => {
  try {
    if (typeof window === "undefined") return undefined;
    const api = (window as Window & { Notification?: typeof Notification }).Notification;
    if (!api || typeof api.requestPermission !== "function") return undefined;
    return api;
  } catch {
    return undefined;
  }
};

/** Read the current browser support and permission, defensively. */
export const notificationSupport = (): NotificationSupport => {
  const api = notificationApi();
  if (!api) return "unsupported";
  try {
    const permission = api.permission;
    if (permission === "granted") return "granted";
    if (permission === "denied") return "denied";
    return "default";
  } catch {
    return "unsupported";
  }
};

/** Ask the browser for permission. Only ever called from a click handler. */
export const requestNotificationPermission = async (): Promise<NotificationSupport> => {
  const api = notificationApi();
  if (!api) return "unsupported";
  try {
    const result = await api.requestPermission();
    if (result === "granted") return "granted";
    if (result === "denied") return "denied";
    return "default";
  } catch {
    return "unsupported";
  }
};

export const readNotificationPreference = (userId: string): boolean => {
  try {
    return window.localStorage.getItem(preferenceKey(userId)) === "on";
  } catch {
    return false;
  }
};

export const writeNotificationPreference = (userId: string, on: boolean): void => {
  try {
    if (on) window.localStorage.setItem(preferenceKey(userId), "on");
    else window.localStorage.removeItem(preferenceKey(userId));
  } catch {
    // A browser refusing storage simply keeps the preference for this page only.
  }
};

export const readDelivered = (userId: string): DeliveredOccurrence[] => {
  try {
    const raw = window.localStorage.getItem(deliveredKey(userId));
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (entry): entry is DeliveredOccurrence =>
          typeof entry === "object" &&
          entry !== null &&
          typeof (entry as DeliveredOccurrence).id === "string" &&
          typeof (entry as DeliveredOccurrence).dueAt === "string",
      )
      .map((entry) => ({ id: entry.id, dueAt: entry.dueAt }));
  } catch {
    return [];
  }
};

export const writeDelivered = (userId: string, entries: DeliveredOccurrence[]): void => {
  try {
    window.localStorage.setItem(
      deliveredKey(userId),
      JSON.stringify(entries.slice(-MAX_DELIVERED)),
    );
  } catch {
    // Nothing to do: duplicate prevention then lasts for this page only.
  }
};

export const hasDelivered = (
  entries: DeliveredOccurrence[],
  reminder: Pick<Reminder, "id" | "due_at">,
): boolean => entries.some((entry) => entry.id === reminder.id && entry.dueAt === reminder.due_at);

/**
 * Active reminders whose chosen time has passed and which have not already
 * been notified on this device for that exact time. An edited time counts as a
 * new occurrence, because the key includes `due_at`.
 */
export const dueForNotification = (
  reminders: Reminder[],
  now: Date,
  delivered: DeliveredOccurrence[],
): Reminder[] =>
  reminders.filter((reminder) => {
    if (reminder.status !== "active") return false;
    const due = new Date(reminder.due_at).getTime();
    if (Number.isNaN(due) || due > now.getTime()) return false;
    return !hasDelivered(delivered, reminder);
  });

/**
 * Show one generic notification. Returns false if the browser refused, so the
 * caller can stop trying rather than fill the console on every interval.
 */
export const showReminderNotification = (): boolean => {
  const api = notificationApi();
  if (!api) return false;
  try {
    if (api.permission !== "granted") return false;
    const notification = new api(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY });
    notification.onclick = () => {
      try {
        window.focus();
      } catch {
        // Focusing is a nicety, never a requirement.
      }
    };
    return true;
  } catch {
    return false;
  }
};
