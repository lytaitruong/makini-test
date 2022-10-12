import {
  startOfDay,
  addDays,
  startOfWeek,
  addWeeks,
  startOfYear,
  addYears,
  startOfMonth,
  addMonths,
  startOfHour,
  addHours,
} from 'date-fns';

export const rangeTime = (
  range: 'hour' | 'day' | 'week' | 'month' | 'year',
  start: Date,
  time: number,
  toISO = true,
) => {
  const result = {
    day: startOfDay(addDays(start, time)),
    hour: startOfHour(addHours(start, time)),
    week: startOfWeek(addWeeks(start, time)),
    year: startOfYear(addYears(start, time)),
    month: startOfMonth(addMonths(start, time)),
  }[range];
  return toISO ? result.toISOString() : result;
};
