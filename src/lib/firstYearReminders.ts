/**
 * Reads and writes for parent-set First Year reminders.
 *
 * Every write goes through the table so the validation trigger and row level
 * security always apply. Queries also filter on the signed-in user id, so the
 * result is predictable even before policies are considered. Reminders are
 * private to the parent and are never sent to the AI companion.
 */

import { supabase } from "@/integrations/supabase/client";
import type {
  Reminder,
  ReminderPayload,
  ReminderStatus,
  ReminderType,
} from "@/lib/firstYearRemindersSchema";

const COLUMNS = "id, baby_id, reminder_type, label, due_at, status, updated_at";

const toReminder = (row: Record<string, unknown>): Reminder => ({
  id: row.id as string,
  baby_id: (row.baby_id as string | null) ?? null,
  reminder_type: row.reminder_type as ReminderType,
  label: (row.label as string | null) ?? null,
  due_at: row.due_at as string,
  status: row.status as ReminderStatus,
  updated_at: row.updated_at as string,
});

/**
 * Reminders worth showing: everything still active, plus anything marked done
 * recently so the parent can see what they have already handled today.
 */
export const getReminders = async (userId: string, now: Date = new Date()): Promise<Reminder[]> => {
  const since = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
  const { data, error } = await supabase
    .from("first_year_reminders")
    .select(COLUMNS)
    .eq("user_id", userId)
    .or(`status.eq.active,due_at.gte.${since.toISOString()}`)
    .order("due_at", { ascending: true });
  if (error) throw error;
  return (data ?? []).map(toReminder);
};

export const createReminder = async (
  userId: string,
  payload: ReminderPayload,
): Promise<Reminder> => {
  const { data, error } = await supabase
    .from("first_year_reminders")
    .insert({
      user_id: userId,
      baby_id: payload.babyId,
      reminder_type: payload.reminderType,
      label: payload.label,
      due_at: payload.dueAt,
      status: "active",
    })
    .select(COLUMNS)
    .single();
  if (error) throw error;
  return toReminder(data as Record<string, unknown>);
};

export const updateReminder = async (
  userId: string,
  reminderId: string,
  payload: ReminderPayload,
): Promise<Reminder> => {
  const { data, error } = await supabase
    .from("first_year_reminders")
    .update({
      baby_id: payload.babyId,
      reminder_type: payload.reminderType,
      label: payload.label,
      due_at: payload.dueAt,
    })
    .eq("id", reminderId)
    .eq("user_id", userId)
    .select(COLUMNS)
    .single();
  if (error) throw error;
  return toReminder(data as Record<string, unknown>);
};

export const setReminderStatus = async (
  userId: string,
  reminderId: string,
  status: ReminderStatus,
): Promise<Reminder> => {
  const { data, error } = await supabase
    .from("first_year_reminders")
    .update({ status })
    .eq("id", reminderId)
    .eq("user_id", userId)
    .select(COLUMNS)
    .single();
  if (error) throw error;
  return toReminder(data as Record<string, unknown>);
};

export const deleteReminder = async (userId: string, reminderId: string): Promise<void> => {
  const { error } = await supabase
    .from("first_year_reminders")
    .delete()
    .eq("id", reminderId)
    .eq("user_id", userId);
  if (error) throw error;
};
