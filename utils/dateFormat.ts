import moment from "moment";

export const dateFormat = (
  date: Date | string | number | undefined,
  format: string
): string => {
  let dateInstance = moment(date);

  if (typeof date === "number") {
    dateInstance = moment.unix(date);
  }

  return dateInstance.format(format);
};

export const getDayName = (date: number | undefined): string => {
  const dayNames = [
    "Niedziela",
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
  ];
  if (date === undefined) {
    date = moment().unix();
  }

  const currentDate = moment();
  const tomorrowDate = moment().add(1, "day");

  const dateInstance = moment.unix(date).startOf("day");
  const currentDateDateOnly = currentDate.startOf("day");
  const tomorrowDateDateOnly = tomorrowDate.startOf("day");

  if (dateInstance.isSame(currentDateDateOnly, "day")) {
    return "Dziś";
  } else if (dateInstance.isSame(tomorrowDateDateOnly, "day")) {
    return "Jutro";
  } else {
    const dayIndex = dateInstance.day();
    return dayNames[dayIndex];
  }
};

export const isEvening = () => {
  const currentTime = moment();
  const currentHour = currentTime.hour();

  return currentHour >= 18 || currentHour < 6;
};
