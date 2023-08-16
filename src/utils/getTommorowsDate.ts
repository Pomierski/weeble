export const getTomorrowsDate = (): string => {
  const secondUntilEndOfTheDay =
    86400 - (Math.floor(new Date().getTime() / 1000) % 86400);
  const today = new Date();

  const nextDay = today.setSeconds(today.getSeconds() + secondUntilEndOfTheDay);

  return new Date(nextDay).toUTCString();
};
