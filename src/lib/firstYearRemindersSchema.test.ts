import { describe, expect, it } from "vitest";
import {
  describeDue,
  groupReminders,
  localDueDate,
  validateReminderDraft,
  type Reminder,
} from "@/lib/firstYearRemindersSchema";

const reminder = (overrides: Partial<Reminder>): Reminder => ({
  id: "r1",
  baby_id: null,
  reminder_type: "feed",
  label: null,
  due_at: new Date(2026, 4, 10, 12, 0).toISOString(),
  status: "active",
  updated_at: new Date(2026, 4, 10, 8, 0).toISOString(),
  ...overrides,
});

describe("localDueDate", () => {
  it("builds a local date from a date and a time", () => {
    const due = localDueDate("2026-05-10", "07:45");
    expect(due?.getFullYear()).toBe(2026);
    expect(due?.getMonth()).toBe(4);
    expect(due?.getDate()).toBe(10);
    expect(due?.getHours()).toBe(7);
    expect(due?.getMinutes()).toBe(45);
  });

  it("rejects malformed input", () => {
    expect(localDueDate("10/05/2026", "07:45")).toBeNull();
    expect(localDueDate("2026-05-10", "")).toBeNull();
  });
});

describe("validateReminderDraft", () => {
  const base = { babyId: null, date: "2026-05-10", time: "07:45", label: "" };

  it("needs a type", () => {
    const result = validateReminderDraft({ ...base, reminderType: null });
    expect(result.ok).toBe(false);
    if (result.ok === false) expect(result.message).toBe("Choose what this reminder is for.");
  });

  it("needs a usable time", () => {
    const result = validateReminderDraft({ ...base, reminderType: "feed", time: "" });
    expect(result.ok).toBe(false);
    if (result.ok === false) expect(result.message).toBe("Choose a time for this reminder.");
  });

  it("rejects an over-long note", () => {
    const result = validateReminderDraft({
      ...base,
      reminderType: "feed",
      label: "a".repeat(141),
    });
    expect(result.ok).toBe(false);
  });

  it("keeps a null baby for a user-level reminder", () => {
    const result = validateReminderDraft({ ...base, reminderType: "moment", label: "  " });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.payload.babyId).toBeNull();
      expect(result.payload.label).toBeNull();
      expect(result.payload.reminderType).toBe("moment");
    }
  });

  it("keeps a chosen baby and trims the note", () => {
    const result = validateReminderDraft({
      ...base,
      reminderType: "nappy",
      babyId: "baby-1",
      label: "  change bag  ",
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.payload.babyId).toBe("baby-1");
      expect(result.payload.label).toBe("change bag");
    }
  });
});

describe("groupReminders", () => {
  const now = new Date(2026, 4, 10, 12, 0);

  it("splits reminders into due, later today, tomorrow, later and done", () => {
    const groups = groupReminders(
      [
        reminder({ id: "later", due_at: new Date(2026, 4, 15, 9, 0).toISOString() }),
        reminder({ id: "done", status: "done" }),
        reminder({ id: "due", due_at: new Date(2026, 4, 10, 11, 0).toISOString() }),
        reminder({ id: "tomorrow", due_at: new Date(2026, 4, 11, 9, 0).toISOString() }),
        reminder({ id: "today", due_at: new Date(2026, 4, 10, 18, 0).toISOString() }),
      ],
      now,
    );
    expect(groups.map((group) => group.key)).toEqual([
      "due",
      "today",
      "tomorrow",
      "later",
      "done",
    ]);
  });

  it("returns nothing when there are no reminders", () => {
    expect(groupReminders([], now)).toEqual([]);
  });

  it("orders the reminders inside a group by time", () => {
    const groups = groupReminders(
      [
        reminder({ id: "b", due_at: new Date(2026, 4, 10, 20, 0).toISOString() }),
        reminder({ id: "a", due_at: new Date(2026, 4, 10, 15, 0).toISOString() }),
      ],
      now,
    );
    expect(groups[0].reminders.map((item) => item.id)).toEqual(["a", "b"]);
  });
});

describe("describeDue", () => {
  const now = new Date(2026, 4, 10, 12, 0);

  it("describes a reminder that has arrived", () => {
    expect(describeDue(reminder({ due_at: new Date(2026, 4, 10, 11, 59).toISOString() }), now)).toBe(
      "Due now",
    );
  });

  it("describes minutes and hours ahead", () => {
    expect(describeDue(reminder({ due_at: new Date(2026, 4, 10, 12, 30).toISOString() }), now)).toBe(
      "In 30 min",
    );
    expect(describeDue(reminder({ due_at: new Date(2026, 4, 10, 15, 0).toISOString() }), now)).toBe(
      "In about 3 hours",
    );
  });

  it("says when something is already marked done", () => {
    expect(describeDue(reminder({ status: "done" }), now)).toBe("Marked done");
  });
});
