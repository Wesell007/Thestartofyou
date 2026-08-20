import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  NOTIFICATION_BODY,
  NOTIFICATION_TITLE,
  dueForNotification,
  hasDelivered,
  notificationSupport,
  readDelivered,
  readNotificationPreference,
  showReminderNotification,
  writeDelivered,
  writeNotificationPreference,
} from "@/lib/firstYearReminderNotifications";
import type { Reminder } from "@/lib/firstYearRemindersSchema";

const reminder = (overrides: Partial<Reminder> = {}): Reminder => ({
  id: "r1",
  baby_id: null,
  reminder_type: "feed",
  label: "Top up the bottles",
  due_at: "2026-08-20T09:00:00.000Z",
  status: "active",
  updated_at: "2026-08-20T08:00:00.000Z",
  ...overrides,
});

const setNotification = (value: unknown) => {
  Object.defineProperty(window, "Notification", {
    configurable: true,
    writable: true,
    value,
  });
};

describe("firstYearReminderNotifications", () => {
  beforeEach(() => {
    window.localStorage.clear();
    // jsdom has no Notification API, so each test states the browser it mimics.
    setNotification(undefined);
  });

  it("reports unsupported when the browser has no Notification API", () => {
    expect(notificationSupport()).toBe("unsupported");
  });

  it("reads the browser permission as the source of truth", () => {
    setNotification({ permission: "denied", requestPermission: vi.fn() });
    expect(notificationSupport()).toBe("denied");
    setNotification({ permission: "granted", requestPermission: vi.fn() });
    expect(notificationSupport()).toBe("granted");
    setNotification({ permission: "default", requestPermission: vi.fn() });
    expect(notificationSupport()).toBe("default");
  });

  it("stores and clears a per user device preference", () => {
    writeNotificationPreference("user-a", true);
    expect(readNotificationPreference("user-a")).toBe(true);
    expect(readNotificationPreference("user-b")).toBe(false);
    writeNotificationPreference("user-a", false);
    expect(readNotificationPreference("user-a")).toBe(false);
  });

  it("stores only reminder id and due time in the delivered list", () => {
    writeDelivered("user-a", [{ id: "r1", dueAt: "2026-08-20T09:00:00.000Z" }]);
    const raw = window.localStorage.getItem("firstYearReminderNotifications:user-a:delivered");
    expect(raw).not.toContain("bottles");
    expect(readDelivered("user-a")).toEqual([{ id: "r1", dueAt: "2026-08-20T09:00:00.000Z" }]);
  });

  it("returns due active reminders only", () => {
    const now = new Date("2026-08-20T09:05:00.000Z");
    const list = [
      reminder(),
      reminder({ id: "r2", due_at: "2026-08-20T11:00:00.000Z" }),
      reminder({ id: "r3", status: "done" }),
    ];
    expect(dueForNotification(list, now, []).map((r) => r.id)).toEqual(["r1"]);
  });

  it("does not repeat the same id and due time, but treats a new time as new", () => {
    const now = new Date("2026-08-20T09:05:00.000Z");
    const delivered = [{ id: "r1", dueAt: "2026-08-20T09:00:00.000Z" }];
    expect(dueForNotification([reminder()], now, delivered)).toHaveLength(0);
    const edited = reminder({ due_at: "2026-08-20T09:02:00.000Z" });
    expect(dueForNotification([edited], now, delivered)).toHaveLength(1);
    expect(hasDelivered(delivered, edited)).toBe(false);
  });

  it("ignores removed reminders, because they are absent from the list", () => {
    const now = new Date("2026-08-20T09:05:00.000Z");
    expect(dueForNotification([], now, [])).toHaveLength(0);
  });

  it("shows a generic notification with no private content", () => {
    const created: Array<[string, NotificationOptions | undefined]> = [];
    class FakeNotification {
      static permission = "granted";
      static requestPermission = vi.fn();
      onclick: (() => void) | null = null;
      constructor(title: string, options?: NotificationOptions) {
        created.push([title, options]);
      }
    }
    setNotification(FakeNotification);
    expect(showReminderNotification()).toBe(true);
    expect(created).toHaveLength(1);
    const [title, options] = created[0];
    expect(title).toBe(NOTIFICATION_TITLE);
    expect(options?.body).toBe(NOTIFICATION_BODY);
    const text = `${title} ${options?.body ?? ""}`;
    for (const secret of ["bottles", "Baby", "nappy", "note"]) {
      expect(text.toLowerCase()).not.toContain(secret.toLowerCase());
    }
  });

  it("returns false rather than throwing when the browser refuses", () => {
    class ThrowingNotification {
      static permission = "granted";
      static requestPermission = vi.fn();
      constructor() {
        throw new Error("refused");
      }
    }
    setNotification(ThrowingNotification);
    expect(showReminderNotification()).toBe(false);
  });

  it("does not create a notification when permission is not granted", () => {
    const constructed = vi.fn();
    class FakeNotification {
      static permission = "denied";
      static requestPermission = vi.fn();
      constructor() {
        constructed();
      }
    }
    setNotification(FakeNotification);
    expect(showReminderNotification()).toBe(false);
    expect(constructed).not.toHaveBeenCalled();
  });
});
