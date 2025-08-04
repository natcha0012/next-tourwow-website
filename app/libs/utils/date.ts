import {
  dayOfWeekInThaiAbbreviation,
  thaiMonths,
  thaiMonthsAbbreviation,
} from "@/constants/months";

export function thaiDatePeriod(
  dateStart: Date | string | null | undefined,
  dateEnd: Date | string | null | undefined,
  useAbbr: boolean = false,
  showDay: boolean = false
): string {
  if (typeof dateStart === "string") {
    dateStart = new Date(dateStart) || undefined;
  }

  if (typeof dateEnd === "string") {
    dateEnd = new Date(dateEnd) || undefined;
  }

  if (!dateStart) {
    return "-";
  }

  if (!dateEnd) {
    return "-";
  }

  let result = "-";
  const dateStartDayString = dateStart.getDate();
  const dateEndDayString = dateEnd.getDate();
  let dateStartMonthString = useAbbr
    ? thaiMonthsAbbreviation[dateStart.getMonth()]
    : thaiMonths[dateStart.getMonth()];
  const dateEndMonthString = useAbbr
    ? thaiMonthsAbbreviation[dateEnd.getMonth()]
    : thaiMonths[dateEnd.getMonth()];
  let dateStartYearString = convertToBuddhistYear(dateStart.getFullYear())
    .toString()
    .slice(2);
  const dateEndYearString = convertToBuddhistYear(dateEnd.getFullYear())
    .toString()
    .slice(2);
  const startDayString = showDay
    ? dayOfWeekInThaiAbbreviation[dateStart.getDay()]
    : ``;
  const endDayString = showDay
    ? dayOfWeekInThaiAbbreviation[dateEnd.getDay()]
    : ``;

  if (dateStartYearString === dateEndYearString) {
    dateStartYearString = "";
    if (dateStartMonthString === dateEndMonthString) {
      dateStartMonthString = "";
    }
  }
  result = `${startDayString} ${dateStartDayString} ${dateStartMonthString} ${dateStartYearString} - ${endDayString} ${dateEndDayString} ${dateEndMonthString} ${dateEndYearString}`;
  return result;
}

function convertToBuddhistYear(year: number): number {
  return year + 543;
}
