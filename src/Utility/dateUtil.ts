import { DateTime } from 'luxon';

export const date2ymd = (date: Date) => {
  const dateTime = DateTime.fromJSDate(date);
  return dateTime.toISODate();
};

export const ymd2Date = (stringDate: string) => {
  if (stringDate) {
    const dateTime = DateTime.fromISO(stringDate);
    return dateTime.toJSDate();
  } else {
    return undefined;
  }
};
