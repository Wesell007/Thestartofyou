import { addDays, isAfter, isBefore, isValid, startOfDay } from "date-fns";

export const adjustLmpForCycle = (lmp: Date, cycleLength: number): Date => {
  if (!isValid(lmp) || !Number.isInteger(cycleLength) || cycleLength < 21 || cycleLength > 45) {
    throw new RangeError("Cycle length must be a whole number from 21 to 45 days");
  }
  return addDays(lmp, cycleLength - 28);
};

export const isPlausiblePregnancyStart = (date: Date, now = new Date()): boolean => {
  if (!isValid(date)) return false;
  const today = startOfDay(now);
  return !isAfter(date, today) && !isBefore(date, addDays(today, -300));
};

export const estimatedLmpFromUltrasound = (
  scanDate: Date,
  weeks: number,
  days: number,
): Date => {
  if (!isValid(scanDate) || !Number.isInteger(weeks) || weeks < 4 || weeks > 40) {
    throw new RangeError("Ultrasound weeks must be a whole number from 4 to 40");
  }
  if (!Number.isInteger(days) || days < 0 || days > 6) {
    throw new RangeError("Ultrasound days must be a whole number from 0 to 6");
  }
  return addDays(scanDate, -(weeks * 7 + days));
};
