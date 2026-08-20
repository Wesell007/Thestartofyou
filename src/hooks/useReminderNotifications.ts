import { useCallback, useEffect, useRef, useState } from "react";
import {
  dueForNotification,
  hasDelivered,
  notificationSupport,
  readDelivered,
  readNotificationPreference,
  requestNotificationPermission,
  showReminderNotification,
  writeDelivered,
  writeNotificationPreference,
  type DeliveredOccurrence,
  type ReminderNotificationState,
} from "@/lib/firstYearReminderNotifications";
import type { Reminder } from "@/lib/firstYearRemindersSchema";

const CHECK_INTERVAL_MS = 60000;

/**
 * App-open reminder notifications for reminders the parent set themselves.
 *
 * Permission is never requested on render: `enable` is the only caller of
 * `Notification.requestPermission`, and it runs from a click. There is no
 * service worker, no push subscription and no background scheduling here.
 */
export const useReminderNotifications = (userId: string | null, reminders: Reminder[]) => {
  const [state, setState] = useState<ReminderNotificationState>("off");
  const remindersRef = useRef(reminders);
  const deliveredRef = useRef<DeliveredOccurrence[]>([]);
  /** Set once the browser refuses to create a notification, so we stop trying. */
  const halted = useRef(false);

  remindersRef.current = reminders;

  /** The browser is the source of truth; the stored preference only gates attempts. */
  const resolveState = useCallback((id: string): ReminderNotificationState => {
    const support = notificationSupport();
    if (support === "unsupported") return "unsupported";
    if (support === "denied") return "blocked";
    if (support === "granted" && readNotificationPreference(id)) return "on";
    return "off";
  }, []);

  useEffect(() => {
    if (!userId) return;
    deliveredRef.current = readDelivered(userId);
    halted.current = false;
    setState(resolveState(userId));
  }, [userId, resolveState]);

  const enable = useCallback(async () => {
    if (!userId) return;
    if (notificationSupport() === "unsupported") {
      setState("unsupported");
      return;
    }
    setState("requesting");
    const result = await requestNotificationPermission();
    if (result === "granted") {
      halted.current = false;
      writeNotificationPreference(userId, true);
      setState("on");
      return;
    }
    if (result === "denied") {
      writeNotificationPreference(userId, false);
      setState("blocked");
      return;
    }
    if (result === "unsupported") {
      setState("unsupported");
      return;
    }
    setState("off");
  }, [userId]);

  /** Only turns off this app's attempts on this device. Permission is unchanged. */
  const disable = useCallback(() => {
    if (!userId) return;
    writeNotificationPreference(userId, false);
    setState("off");
  }, [userId]);

  useEffect(() => {
    if (!userId || state !== "on") return;

    const check = () => {
      const support = notificationSupport();
      if (support === "unsupported") {
        setState("unsupported");
        return;
      }
      if (support !== "granted") {
        setState("blocked");
        return;
      }
      if (halted.current) return;

      const due = dueForNotification(remindersRef.current, new Date(), deliveredRef.current);
      for (const reminder of due) {
        if (hasDelivered(deliveredRef.current, reminder)) continue;
        // Mark first, so a refusal can never loop on the same occurrence.
        deliveredRef.current = [
          ...deliveredRef.current,
          { id: reminder.id, dueAt: reminder.due_at },
        ];
        writeDelivered(userId, deliveredRef.current);
        if (!showReminderNotification()) {
          halted.current = true;
          break;
        }
      }
    };

    check();
    const timer = window.setInterval(check, CHECK_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [userId, state]);

  return { state, enable, disable };
};
