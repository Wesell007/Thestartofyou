import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, render, screen, waitFor } from "@testing-library/react";
import { useReminderNotifications } from "@/hooks/useReminderNotifications";
import type { Reminder } from "@/lib/firstYearRemindersSchema";

/**
 * jsdom has no Notification API, so the browser is mimicked with a fake class.
 * Real permission prompts and real delivery cannot be asserted here; the
 * limitation is stated in the phase report.
 */

const constructed: string[] = [];
const requestPermission = vi.fn();

const makeNotification = (permission: NotificationPermission) => {
  class FakeNotification {
    static permission = permission;
    static requestPermission = requestPermission;
    onclick: (() => void) | null = null;
    constructor(title: string) {
      constructed.push(title);
    }
  }
  return FakeNotification;
};

const setNotification = (value: unknown) => {
  Object.defineProperty(window, "Notification", {
    configurable: true,
    writable: true,
    value,
  });
};

const reminder = (overrides: Partial<Reminder> = {}): Reminder => ({
  id: "r1",
  baby_id: null,
  reminder_type: "feed",
  label: "Top up the bottles",
  due_at: new Date(Date.now() - 60000).toISOString(),
  status: "active",
  updated_at: new Date().toISOString(),
  ...overrides,
});

const Harness = ({ reminders }: { reminders: Reminder[] }) => {
  const { state, enable, disable } = useReminderNotifications("user-a", reminders);
  return (
    <div>
      <span data-testid="state">{state}</span>
      <button type="button" onClick={() => void enable()}>
        Turn on notifications
      </button>
      <button type="button" onClick={disable}>
        Turn off
      </button>
    </div>
  );
};

describe("useReminderNotifications", () => {
  beforeEach(() => {
    window.localStorage.clear();
    constructed.length = 0;
    requestPermission.mockReset();
    setNotification(makeNotification("default"));
  });

  it("does not request permission on render", () => {
    render(<Harness reminders={[reminder()]} />);
    expect(requestPermission).not.toHaveBeenCalled();
    expect(screen.getByTestId("state")).toHaveTextContent("off");
  });

  it("requests permission only after the button is clicked", async () => {
    requestPermission.mockResolvedValue("granted");
    render(<Harness reminders={[]} />);
    expect(requestPermission).not.toHaveBeenCalled();
    await act(async () => {
      screen.getByText("Turn on notifications").click();
    });
    expect(requestPermission).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.getByTestId("state")).toHaveTextContent("on"));
  });

  it("reports unsupported without offering a request", () => {
    setNotification(undefined);
    render(<Harness reminders={[reminder()]} />);
    expect(screen.getByTestId("state")).toHaveTextContent("unsupported");
    expect(requestPermission).not.toHaveBeenCalled();
  });

  it("reports blocked and does not repeat the request", async () => {
    setNotification(makeNotification("denied"));
    render(<Harness reminders={[reminder()]} />);
    expect(screen.getByTestId("state")).toHaveTextContent("blocked");
    await act(async () => {
      await Promise.resolve();
    });
    expect(requestPermission).not.toHaveBeenCalled();
    expect(constructed).toHaveLength(0);
  });

  it("delivers one notification for a due active reminder once granted", async () => {
    requestPermission.mockImplementation(async () => {
      setNotification(makeNotification("granted"));
      return "granted";
    });
    const { rerender } = render(<Harness reminders={[reminder()]} />);
    await act(async () => {
      screen.getByText("Turn on notifications").click();
    });
    await waitFor(() => expect(constructed).toHaveLength(1));
    rerender(<Harness reminders={[reminder()]} />);
    await act(async () => {
      await Promise.resolve();
    });
    expect(constructed).toHaveLength(1);
  });

  it("does not notify for done reminders", async () => {
    requestPermission.mockImplementation(async () => {
      setNotification(makeNotification("granted"));
      return "granted";
    });
    render(<Harness reminders={[reminder({ status: "done" })]} />);
    await act(async () => {
      screen.getByText("Turn on notifications").click();
    });
    await waitFor(() => expect(screen.getByTestId("state")).toHaveTextContent("on"));
    expect(constructed).toHaveLength(0);
  });

  it("does not notify for removed reminders", async () => {
    requestPermission.mockImplementation(async () => {
      setNotification(makeNotification("granted"));
      return "granted";
    });
    render(<Harness reminders={[]} />);
    await act(async () => {
      screen.getByText("Turn on notifications").click();
    });
    await waitFor(() => expect(screen.getByTestId("state")).toHaveTextContent("on"));
    expect(constructed).toHaveLength(0);
  });

  it("turning off stops app attempts without touching browser permission", async () => {
    requestPermission.mockImplementation(async () => {
      setNotification(makeNotification("granted"));
      return "granted";
    });
    render(<Harness reminders={[reminder()]} />);
    await act(async () => {
      screen.getByText("Turn on notifications").click();
    });
    await waitFor(() => expect(constructed).toHaveLength(1));
    await act(async () => {
      screen.getByText("Turn off").click();
    });
    expect(screen.getByTestId("state")).toHaveTextContent("off");
    expect(
      (window as Window & { Notification?: { permission: string } }).Notification?.permission,
    ).toBe("granted");
  });
});
