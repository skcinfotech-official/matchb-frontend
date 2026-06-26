
const IST_TIMEZONE = "Asia/Kolkata";

/**
 * The backend returns naive datetime strings in UTC (e.g. "2026-06-26 10:30:00")
 * with no timezone marker. Browsers parse such strings as *local* time, which
 * shifts call timings by the local offset (e.g. +5:30 in India).
 * This helper interprets a timestamp-with-time as UTC so it converts to IST correctly.
 */
const parseServerDate = (value: string): Date => {
  if (!value) return new Date(NaN);
  let s = value.trim();

  // Normalize "YYYY-MM-DD HH:MM:SS" -> "YYYY-MM-DDTHH:MM:SS"
  if (s.includes(" ") && !s.includes("T")) {
    s = s.replace(" ", "T");
  }

  const hasTime = s.includes(":");
  const hasTimezone = /[zZ]$|[+-]\d{2}:?\d{2}$/.test(s);

  // A naive timestamp that includes a time component is treated as UTC.
  if (hasTime && !hasTimezone) {
    s = `${s}Z`;
  }

  return new Date(s);
};

/** Date only, in IST. e.g. "26 Jun 2026" */
export const formatDate = (dateString: string): string => {
  try {
    const date = parseServerDate(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: IST_TIMEZONE,
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid Date";
  }
};

/** Date + time, in IST. e.g. "26 Jun 2026, 04:00 pm" */
export const formatDateTime = (dateString: string): string => {
  try {
    const date = parseServerDate(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: IST_TIMEZONE,
    });
  } catch (error) {
    console.error("Error formatting date-time:", error);
    return "Invalid Date";
  }
};
