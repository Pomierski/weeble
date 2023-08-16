import dayjs from "dayjs";
import dayOfYear from "dayjs/plugin/dayOfYear";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(dayOfYear);

export const getTodaysAnimeIndex = () => {
  const today = dayjs().utc();
  const dayIntoYear = today.dayOfYear();

  if (dayIntoYear >= 250) {
    return dayIntoYear - 250;
  }

  return dayIntoYear;
};
