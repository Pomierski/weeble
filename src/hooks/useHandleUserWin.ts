import { useState } from "react";
import { getTomorrowsDate } from "../utils/getTommorowsDate";

type HandleUserWinHook = {
  userWon: boolean;
  setUserWin: () => void;
};

const USER_WIN_COOKIE = "weeble.userWin";

const getCookieValue = (name: string) =>
  Boolean(
    document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop(),
  );

export const useHandleUserWin = (): HandleUserWinHook => {
  const [state, setState] = useState<boolean>(getCookieValue(USER_WIN_COOKIE));

  const setUserWin = () => {
    setTimeout(() => {
      setState(true);
      document.cookie = `${USER_WIN_COOKIE}=yes;expires=${getTomorrowsDate()};`;
    }, 2500);
  };

  return {
    userWon: state,
    setUserWin,
  };
};
