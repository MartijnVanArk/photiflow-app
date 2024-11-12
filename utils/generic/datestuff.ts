import { getSysLocale } from "../system/system";

export type DateInputType = Date | string;

export const formatDate = (aDate: DateInputType): string => {
  const locale = getSysLocale();

  const refDate = typeof aDate === "string" ? new Date(aDate) : aDate;

  const datePart = refDate.toLocaleDateString(locale, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const timePart = refDate.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });

  return datePart + " " + timePart;
};
