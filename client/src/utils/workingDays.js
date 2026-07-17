const weekdays = ["Ne", "Po", "Út", "St", "Čt", "Pá", "So"];

function createWorkingDay(date) {
  const d = new Date(date);

  return {
    date: d,
    timestamp: d.getTime(),
    iso: d.toISOString().split("T")[0],
    weekday: weekdays[d.getDay()],
    day: d.getDate(),
    month: d.getMonth() + 1,
    year: d.getFullYear(),
    label: `${weekdays[d.getDay()]} ${d.getDate()}.${d.getMonth() + 1}.`,
  };
}

export function getWorkingDays(
  centerDate = new Date(),
  daysBack = 3,
  daysForward = 5,
) {
  const result = [];

  let current = new Date(centerDate);

  let found = 0;

  while (found < daysBack) {
    current.setDate(current.getDate() - 1);

    const day = current.getDay();

    if (day !== 0 && day !== 6) {
      found++;
    }
  }

  current = new Date(current);

  while (result.length < daysBack + daysForward + 1) {
    const day = current.getDay();

    if (day !== 0 && day !== 6) {
      result.push(createWorkingDay(current));
    }

    current.setDate(current.getDate() + 1);
  }

  return result;
}
