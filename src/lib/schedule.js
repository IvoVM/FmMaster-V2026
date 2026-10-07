const DAY_INDEX = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

export function toMinutes(hhmm) {
  const [hours, minutes] = hhmm.split(":").map(Number);
  return hours * 60 + minutes;
}

export function prettyTime(hhmm) {
  const [hours, minutes] = hhmm.split(":");
  return `${Number(hours)}:${minutes}`;
}

/** Hora y día en Miramar, para marcar el programa que está al aire. */
export function buenosAiresNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Argentina/Buenos_Aires",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(date);

  const read = (type) => parts.find((part) => part.type === type)?.value ?? "";
  const hour = Number(read("hour"));
  const minute = Number(read("minute"));

  return {
    day: DAY_INDEX[read("weekday")] ?? 1,
    minutes: hour * 60 + minute,
  };
}

export function isOnAir(from, to, minutes) {
  return minutes >= toMinutes(from) && minutes < toMinutes(to);
}
