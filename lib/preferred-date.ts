const BUSINESS_TIME_ZONE = "Europe/Paris";

export const MINIMUM_PREFERRED_DATE_OFFSET_DAYS = 3;

export function getMinimumPreferredDateInputValue(from = new Date()) {
  return getDateInputValueWithOffset(from, MINIMUM_PREFERRED_DATE_OFFSET_DAYS);
}

export function normalizePreferredDate(value: string, minimumDate: string) {
  return value && value < minimumDate ? minimumDate : value;
}

export function isPreferredDateAllowed(value: string, minimumDate: string) {
  return isDateInputValue(value) && value >= minimumDate;
}

function getDateInputValueWithOffset(from: Date, offsetDays: number) {
  const parisDate = getDatePartsInBusinessTimeZone(from);
  const shiftedDate = new Date(
    Date.UTC(parisDate.year, parisDate.month - 1, parisDate.day + offsetDays)
  );
  const shiftedParisDate = getDatePartsInBusinessTimeZone(shiftedDate);

  return [
    String(shiftedParisDate.year),
    String(shiftedParisDate.month).padStart(2, "0"),
    String(shiftedParisDate.day).padStart(2, "0")
  ].join("-");
}

function getDatePartsInBusinessTimeZone(date: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: BUSINESS_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(date);

  return {
    year: Number(getDatePart(parts, "year")),
    month: Number(getDatePart(parts, "month")),
    day: Number(getDatePart(parts, "day"))
  };
}

function getDatePart(parts: Intl.DateTimeFormatPart[], type: string) {
  const part = parts.find((candidate) => candidate.type === type)?.value;

  if (!part) {
    throw new Error(`Unable to format preferred date part: ${type}`);
  }

  return part;
}

function isDateInputValue(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}
